const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const CATEGORIES = require('./public/categories');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// In-Memory Storage
const rooms = new Map(); // roomCode => Room Object
const sessions = new Map(); // sessionToken => { roomCode, playerName, socketId, connectedAt }

// Helper function to generate 6-character room code
function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  do {
    code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  } while (rooms.has(code));
  return code;
}

// Helper to sanitize room state for client consumption
function getSanitizedRoomState(room, requestorSessionToken) {
  const isHost = room.hostSessionToken === requestorSessionToken;
  const me = room.players.find(p => p.sessionToken === requestorSessionToken);

  return {
    code: room.code,
    mode: room.mode,
    category: room.category,
    phase: room.phase, // 'lobby', 'writing', 'voting', 'results'
    hostSessionToken: room.hostSessionToken,
    isHost,
    minPlayers: room.minPlayers,
    timerSeconds: room.timerSeconds,
    currentRound: room.currentRound,
    imposterSessionToken: (room.phase === 'results' || room.phase === 'voting') ? room.imposterSessionToken : null,
    secretWord: (room.phase === 'results' || (me && me.role !== 'imposter' && room.mode === 'word')) ? room.secretWord : (room.phase === 'voting' ? room.secretWord : null),
    categoryName: CATEGORIES[room.category]?.name || room.category,
    questionA: (room.phase === 'results' || room.phase === 'voting' || (me && me.role !== 'imposter' && room.mode === 'sentence')) ? room.questionA : null,
    questionB: (room.phase === 'results' || (me && me.role === 'imposter' && room.mode === 'sentence')) ? room.questionB : null,
    myRole: me ? me.role : null,
    myQuestion: me ? (me.role === 'imposter' ? room.questionB : room.questionA) : null,
    myHintOrAnswer: me ? me.hintOrAnswer : '',
    myHasSubmitted: me ? me.hasSubmitted : false,
    myHasVoted: me ? me.hasVoted : false,
    imposterPeekedHint: me && me.role === 'imposter' ? me.peekedHint : null,
    players: room.players.map(p => {
      // Determine what content to reveal based on phase
      let showSubmission = false;
      let displaySubmission = '';

      if (room.phase === 'voting' || room.phase === 'results') {
        showSubmission = true;
        displaySubmission = p.hintOrAnswer || '(No submission)';
      }

      return {
        sessionToken: p.sessionToken,
        name: p.name,
        score: p.score,
        connected: p.connected,
        isHost: p.sessionToken === room.hostSessionToken,
        hasSubmitted: p.hasSubmitted,
        hasVoted: p.hasVoted,
        submission: showSubmission ? displaySubmission : null,
        votedForToken: room.phase === 'results' ? p.votedForToken : null,
        role: room.phase === 'results' ? p.role : null
      };
    }),
    resultsData: room.phase === 'results' ? room.lastResults : null
  };
}

// Broadcast room update to all connected sockets in a room
function broadcastRoomUpdate(roomCode) {
  const room = rooms.get(roomCode);
  if (!room) return;

  room.players.forEach(player => {
    if (player.connected && player.socketId) {
      const state = getSanitizedRoomState(room, player.sessionToken);
      io.to(player.socketId).emit('room_state_update', state);
    }
  });
}

// Host Migration Helper
function reassignHostIfNeeded(room) {
  const activePlayers = room.players.filter(p => p.connected);
  const currentHost = room.players.find(p => p.sessionToken === room.hostSessionToken);

  if (!currentHost || !currentHost.connected) {
    if (activePlayers.length > 0) {
      // Reassign host to the first connected player
      room.hostSessionToken = activePlayers[0].sessionToken;
      io.to(room.code).emit('toast_notification', {
        type: 'info',
        message: `Host left. ${activePlayers[0].name} is now the new Host!`
      });
    }
  }
}

// Clear Timer Helper
function clearRoomTimer(room) {
  if (room.timerInterval) {
    clearInterval(room.timerInterval);
    room.timerInterval = null;
  }
}

// Start Phase Timer
function startPhaseTimer(roomCode, seconds, onExpire) {
  const room = rooms.get(roomCode);
  if (!room) return;

  clearRoomTimer(room);
  room.timerSeconds = seconds;

  room.timerInterval = setInterval(() => {
    room.timerSeconds -= 1;
    if (room.timerSeconds <= 0) {
      clearRoomTimer(room);
      onExpire();
    } else {
      io.to(roomCode).emit('timer_tick', { seconds: room.timerSeconds });
    }
  }, 1000);
}

// Execute Voting & Calculate Results
function processVotingResults(roomCode) {
  const room = rooms.get(roomCode);
  if (!room || room.phase !== 'voting') return;

  clearRoomTimer(room);
  room.phase = 'results';

  // Count votes
  const voteCounts = new Map(); // sessionToken => count
  room.players.forEach(p => voteCounts.set(p.sessionToken, 0));

  room.players.forEach(p => {
    if (p.votedForToken && voteCounts.has(p.votedForToken)) {
      voteCounts.set(p.votedForToken, voteCounts.get(p.votedForToken) + 1);
    }
  });

  // Find max vote count
  let maxVotes = -1;
  voteCounts.forEach((count) => {
    if (count > maxVotes) maxVotes = count;
  });

  // Find players with max votes
  const mostVotedTokens = [];
  voteCounts.forEach((count, token) => {
    if (count === maxVotes && maxVotes > 0) {
      mostVotedTokens.push(token);
    }
  });

  const imposterToken = room.imposterSessionToken;
  const imposterCaught = mostVotedTokens.length === 1 && mostVotedTokens[0] === imposterToken;

  // Scoring Logic:
  // - If Majority votes catch Imposter: Correct voters get 1 pt. Imposter gets 0.
  // - If Majority does NOT catch Imposter (or tie): Imposter gets 2 pts. Voted for imposter gets 1 pt. Incorrect voters get 0.
  const roundPointsMap = new Map();

  room.players.forEach(p => {
    let pts = 0;
    const votedForImposter = p.votedForToken === imposterToken;

    if (imposterCaught) {
      if (votedForImposter && p.sessionToken !== imposterToken) {
        pts = 1;
      } else {
        pts = 0;
      }
    } else {
      if (p.sessionToken === imposterToken) {
        pts = 2; // Imposter survived / tied!
      } else if (votedForImposter) {
        pts = 1; // Non-imposter voted correctly even though imposter escaped
      } else {
        pts = 0;
      }
    }

    p.score += pts;
    roundPointsMap.set(p.sessionToken, pts);
  });

  const imposterPlayer = room.players.find(p => p.sessionToken === imposterToken);

  room.lastResults = {
    imposterCaught,
    imposterName: imposterPlayer ? imposterPlayer.name : 'Unknown',
    secretWord: room.secretWord,
    questionA: room.questionA,
    questionB: room.questionB,
    mostVotedNames: mostVotedTokens.map(t => room.players.find(p => p.sessionToken === t)?.name || 'Unknown'),
    voteCounts: Array.from(voteCounts.entries()).map(([token, count]) => ({
      name: room.players.find(p => p.sessionToken === token)?.name || 'Unknown',
      token,
      count
    })),
    roundPoints: Array.from(roundPointsMap.entries()).map(([token, pts]) => ({
      name: room.players.find(p => p.sessionToken === token)?.name || 'Unknown',
      token,
      pts
    }))
  };

  broadcastRoomUpdate(roomCode);
}

// Socket.io Event Handling
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Create Room
  socket.on('create_room', ({ playerName, sessionToken, mode, category }, callback) => {
    try {
      if (!playerName || !sessionToken) {
        return callback({ success: false, message: 'Invalid name or session.' });
      }

      const roomCode = generateRoomCode();
      const validCategory = CATEGORIES[category] ? category : 'animals';
      const validMode = (mode === 'sentence') ? 'sentence' : 'word';

      const player = {
        sessionToken,
        socketId: socket.id,
        name: playerName.trim(),
        score: 0,
        connected: true,
        role: 'player',
        hintOrAnswer: '',
        hasSubmitted: false,
        hasVoted: false,
        votedForToken: null,
        peekedHint: null
      };

      const room = {
        code: roomCode,
        mode: validMode,
        category: validCategory,
        phase: 'lobby',
        hostSessionToken: sessionToken,
        minPlayers: 3,
        currentRound: 0,
        players: [player],
        imposterSessionToken: null,
        secretWord: null,
        questionA: null,
        questionB: null,
        timerSeconds: 0,
        timerInterval: null,
        lastResults: null
      };

      rooms.set(roomCode, room);
      sessions.set(sessionToken, { roomCode, playerName, socketId: socket.id });

      socket.join(roomCode);
      callback({ success: true, roomCode });
      broadcastRoomUpdate(roomCode);
    } catch (err) {
      console.error('Create room error:', err);
      callback({ success: false, message: 'Server error creating room.' });
    }
  });

  // Join Room
  socket.on('join_room', ({ roomCode, playerName, sessionToken }, callback) => {
    try {
      const code = roomCode?.toUpperCase().trim();
      const room = rooms.get(code);

      if (!room) {
        return callback({ success: false, message: 'Room not found. Check room code.' });
      }

      let player = room.players.find(p => p.sessionToken === sessionToken);

      if (player) {
        // Re-joining existing player in room
        player.socketId = socket.id;
        player.connected = true;
        player.name = playerName.trim() || player.name;
      } else {
        if (room.phase !== 'lobby') {
          return callback({ success: false, message: 'Game already in progress in this room.' });
        }
        if (room.players.length >= 12) {
          return callback({ success: false, message: 'Room is full (max 12 players).' });
        }

        player = {
          sessionToken,
          socketId: socket.id,
          name: playerName.trim(),
          score: 0,
          connected: true,
          role: 'player',
          hintOrAnswer: '',
          hasSubmitted: false,
          hasVoted: false,
          votedForToken: null,
          peekedHint: null
        };
        room.players.push(player);
      }

      sessions.set(sessionToken, { roomCode: code, playerName: player.name, socketId: socket.id });
      socket.join(code);

      callback({ success: true, roomCode: code });
      broadcastRoomUpdate(code);
      io.to(code).emit('toast_notification', {
        type: 'info',
        message: `${player.name} joined the room!`
      });
    } catch (err) {
      console.error('Join room error:', err);
      callback({ success: false, message: 'Failed to join room.' });
    }
  });

  // Reconnect Session
  socket.on('reconnect_session', ({ sessionToken }, callback) => {
    const session = sessions.get(sessionToken);
    if (!session) return callback({ success: false });

    const room = rooms.get(session.roomCode);
    if (!room) return callback({ success: false });

    const player = room.players.find(p => p.sessionToken === sessionToken);
    if (!player) return callback({ success: false });

    player.socketId = socket.id;
    player.connected = true;
    session.socketId = socket.id;

    socket.join(room.code);
    callback({ success: true, roomCode: room.code });
    broadcastRoomUpdate(room.code);
  });

  // Start Game (Host Only)
  socket.on('start_game', ({ roomCode, sessionToken }, callback) => {
    const room = rooms.get(roomCode);
    if (!room) return callback?.({ success: false, message: 'Room not found.' });

    if (room.hostSessionToken !== sessionToken) {
      return callback?.({ success: false, message: 'Only host can start the game.' });
    }

    const connectedPlayers = room.players.filter(p => p.connected);
    if (connectedPlayers.length < room.minPlayers) {
      return callback?.({ success: false, message: `Minimum ${room.minPlayers} players required to start!` });
    }

    // Reset round states
    room.currentRound += 1;
    room.phase = 'writing';

    // Pick random category dataset
    const catData = CATEGORIES[room.category] || CATEGORIES.animals;
    const randomWord = catData.words[Math.floor(Math.random() * catData.words.length)];
    const randomQuestionPair = catData.questions[Math.floor(Math.random() * catData.questions.length)] || {
      normal: "Describe something iconic about this subject.",
      imposter: "Describe something tricky or unusual about this subject."
    };

    room.secretWord = randomWord;
    room.questionA = randomQuestionPair.normal;
    room.questionB = randomQuestionPair.imposter;

    // Pick random imposter among connected players
    const imposterIndex = Math.floor(Math.random() * connectedPlayers.length);
    const imposterToken = connectedPlayers[imposterIndex].sessionToken;
    room.imposterSessionToken = imposterToken;

    room.players.forEach(p => {
      p.role = (p.sessionToken === imposterToken) ? 'imposter' : 'player';
      p.hintOrAnswer = '';
      p.hasSubmitted = false;
      p.hasVoted = false;
      p.votedForToken = null;
      p.peekedHint = null;
    });

    // Start 120-second writing timer
    startPhaseTimer(roomCode, 120, () => {
      // On timer expire, move automatically to voting phase
      room.phase = 'voting';
      startPhaseTimer(roomCode, 240, () => processVotingResults(roomCode));
      broadcastRoomUpdate(roomCode);
    });

    callback?.({ success: true });
    broadcastRoomUpdate(roomCode);
  });

  // Host Option: Return to Lobby at ANY point
  socket.on('return_to_lobby', ({ roomCode, sessionToken }) => {
    const room = rooms.get(roomCode);
    if (!room) return;
    if (room.hostSessionToken !== sessionToken) return;

    clearRoomTimer(room);
    room.phase = 'lobby';
    room.players.forEach(p => {
      p.hintOrAnswer = '';
      p.hasSubmitted = false;
      p.hasVoted = false;
      p.votedForToken = null;
      p.peekedHint = null;
    });

    io.to(roomCode).emit('toast_notification', {
      type: 'warning',
      message: 'Host returned everyone to the Lobby.'
    });
    broadcastRoomUpdate(roomCode);
  });

  // Host Option: Kick Player AT ANY TIME
  socket.on('kick_player', ({ roomCode, sessionToken, targetToken }) => {
    const room = rooms.get(roomCode);
    if (!room) return;
    if (room.hostSessionToken !== sessionToken) return;
    if (targetToken === sessionToken) return; // Cannot kick self

    const targetIndex = room.players.findIndex(p => p.sessionToken === targetToken);
    if (targetIndex !== -1) {
      const kickedPlayer = room.players[targetIndex];
      room.players.splice(targetIndex, 1);

      // Notify kicked socket
      if (kickedPlayer.socketId) {
        io.to(kickedPlayer.socketId).emit('kicked_from_room', {
          message: 'You were kicked from the room by the host.'
        });
      }

      sessions.delete(targetToken);

      io.to(roomCode).emit('toast_notification', {
        type: 'error',
        message: `${kickedPlayer.name} was kicked from the room.`
      });

      // If active game falls below 3 connected players or imposter was kicked, return to lobby safely
      const activeCount = room.players.filter(p => p.connected).length;
      if (room.phase !== 'lobby' && (activeCount < 3 || targetToken === room.imposterSessionToken)) {
        clearRoomTimer(room);
        room.phase = 'lobby';
        io.to(roomCode).emit('toast_notification', {
          type: 'info',
          message: 'Returned to Lobby due to player changes.'
        });
      }

      broadcastRoomUpdate(roomCode);
    }
  });

  // Submit Hint / Answer
  socket.on('submit_hint', ({ roomCode, sessionToken, hintOrAnswer }) => {
    const room = rooms.get(roomCode);
    if (!room || room.phase !== 'writing') return;

    const player = room.players.find(p => p.sessionToken === sessionToken);
    if (!player) return;

    player.hintOrAnswer = (hintOrAnswer || '').trim();
    player.hasSubmitted = true;

    // Check if all connected players submitted
    const connectedPlayers = room.players.filter(p => p.connected);
    const allSubmitted = connectedPlayers.every(p => p.hasSubmitted);

    if (allSubmitted) {
      clearRoomTimer(room);
      room.phase = 'voting';
      startPhaseTimer(roomCode, 60, () => processVotingResults(roomCode));
    }

    broadcastRoomUpdate(roomCode);
  });

  // Imposter Perk: Peek 1 random submitted hint (Word Mode)
  socket.on('imposter_peek_hint', ({ roomCode, sessionToken }, callback) => {
    const room = rooms.get(roomCode);
    if (!room || room.phase !== 'writing' || room.mode !== 'word') {
      return callback?.({ success: false, message: 'Hint peek unavailable.' });
    }

    const player = room.players.find(p => p.sessionToken === sessionToken);
    if (!player || player.role !== 'imposter') {
      return callback?.({ success: false, message: 'Only Imposter can use this perk.' });
    }

    if (player.peekedHint) {
      return callback?.({ success: true, hint: player.peekedHint });
    }

    // Find non-imposter players who submitted
    const submittedOthers = room.players.filter(p => p.role !== 'imposter' && p.hasSubmitted && p.hintOrAnswer);
    if (submittedOthers.length === 0) {
      return callback?.({ success: false, message: 'No players have submitted a hint yet! Try again in a few seconds.' });
    }

    const randomPick = submittedOthers[Math.floor(Math.random() * submittedOthers.length)];
    player.peekedHint = `${randomPick.name}: "${randomPick.hintOrAnswer}"`;

    callback?.({ success: true, hint: player.peekedHint });
    broadcastRoomUpdate(roomCode);
  });

  // Submit Vote
  socket.on('submit_vote', ({ roomCode, sessionToken, targetToken }) => {
    const room = rooms.get(roomCode);
    if (!room || room.phase !== 'voting') return;

    const player = room.players.find(p => p.sessionToken === sessionToken);
    if (!player || player.hasVoted) return;

    player.hasVoted = true;
    player.votedForToken = targetToken;

    // Check if all connected players voted
    const connectedPlayers = room.players.filter(p => p.connected);
    const allVoted = connectedPlayers.every(p => p.hasVoted);

    if (allVoted) {
      processVotingResults(roomCode);
    } else {
      broadcastRoomUpdate(roomCode);
    }
  });

  // Explicit Leave Room
  socket.on('leave_room', ({ roomCode, sessionToken }) => {
    const room = rooms.get(roomCode);
    if (!room) return;

    const index = room.players.findIndex(p => p.sessionToken === sessionToken);
    if (index !== -1) {
      const leavingPlayer = room.players[index];
      room.players.splice(index, 1);
      sessions.delete(sessionToken);

      socket.leave(roomCode);

      if (room.players.length === 0) {
        clearRoomTimer(room);
        rooms.delete(roomCode);
      } else {
        reassignHostIfNeeded(room);
        io.to(roomCode).emit('toast_notification', {
          type: 'info',
          message: `${leavingPlayer.name} left the room.`
        });
        broadcastRoomUpdate(roomCode);
      }
    }
  });

  // Disconnect Handling
  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
    rooms.forEach((room, roomCode) => {
      const player = room.players.find(p => p.socketId === socket.id);
      if (player) {
        player.connected = false;
        reassignHostIfNeeded(room);

        io.to(roomCode).emit('toast_notification', {
          type: 'warning',
          message: `${player.name} lost connection...`
        });

        broadcastRoomUpdate(roomCode);

        // Disconnect grace timer (90 seconds before purge)
        setTimeout(() => {
          const freshRoom = rooms.get(roomCode);
          if (freshRoom) {
            const freshPlayer = freshRoom.players.find(p => p.sessionToken === player.sessionToken);
            if (freshPlayer && !freshPlayer.connected) {
              const pIndex = freshRoom.players.findIndex(p => p.sessionToken === player.sessionToken);
              if (pIndex !== -1) {
                freshRoom.players.splice(pIndex, 1);
                sessions.delete(player.sessionToken);
                if (freshRoom.players.length === 0) {
                  clearRoomTimer(freshRoom);
                  rooms.delete(roomCode);
                } else {
                  reassignHostIfNeeded(freshRoom);
                  broadcastRoomUpdate(roomCode);
                }
              }
            }
          }
        }, 90000);
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Imposter Web Game Server running on port ${PORT}`);
});
