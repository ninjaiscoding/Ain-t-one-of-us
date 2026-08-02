// App State & Elements Initialization
document.addEventListener('DOMContentLoaded', () => {
  
  // Audio Synthesizer Engine (Web Audio API)
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playClick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    }

    playTimerTick() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    }

    playSuccess() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.12, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.2);
      });
    }

    playAlert() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.setValueAtTime(150, now + 0.1);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  }

  const sound = new SoundEngine();

  // Local Storage Session Persistence
  function getSessionToken() {
    let token = localStorage.getItem('imposter_session_token');
    if (!token) {
      token = 'token_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      localStorage.setItem('imposter_session_token', token);
    }
    return token;
  }

  const sessionToken = getSessionToken();
  let currentRoomCode = null;
  let currentRoomState = null;
  let selectedCategoryKey = 'animals';
  let selectedGameMode = 'word'; // 'word' or 'sentence'
  let selectedVoteTargetToken = null;

  // Dual Socket Engine (Socket.io for Node server.js OR WebSocket for Python server.py)
  class GameSocket {
    constructor() {
      this.socket = null;
      this.ws = null;
      this.callbacks = new Map();
      this.listeners = new Map();
      this.msgId = 0;
      this.type = null;

      this.init();
    }

    init() {
      // 1. Try Socket.io if io script is active
      if (typeof io !== 'undefined') {
        try {
          this.socket = io({ reconnectionAttempts: 2, timeout: 2000 });
          this.type = 'socketio';

          this.socket.on('connect', () => {
            console.log('Connected via Socket.io');
            this.emitEvent('connect');
          });

          ['room_state_update', 'timer_tick', 'toast_notification', 'kicked_from_room'].forEach(evt => {
            this.socket.on(evt, (data) => this.emitEvent(evt, data));
          });
          return;
        } catch (e) {
          console.warn('Socket.io connection failed, falling back to Native WebSockets.');
        }
      }

      // 2. Native WebSocket Fallback (Python FastAPI server.py)
      this.type = 'websocket';
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${wsProtocol}//${window.location.host}/ws`;
      
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('Connected via Native WebSockets');
        this.emitEvent('connect');
      };

      this.ws.onmessage = (msg) => {
        try {
          const res = JSON.parse(msg.data);

          if (res.msgId && this.callbacks.has(res.msgId)) {
            const cb = this.callbacks.get(res.msgId);
            this.callbacks.delete(res.msgId);
            cb(res);
          } else if (res.event) {
            this.emitEvent(res.event, res.data);
          }
        } catch (e) {
          console.error('WS Parse Error:', e);
        }
      };

      this.ws.onclose = () => {
        console.log('WS Connection closed. Retrying in 3s...');
        setTimeout(() => this.init(), 3000);
      };
    }

    on(event, handler) {
      if (!this.listeners.has(event)) this.listeners.set(event, []);
      this.listeners.get(event).push(handler);
    }

    emitEvent(event, data) {
      const handlers = this.listeners.get(event) || [];
      handlers.forEach(fn => fn(data));
    }

    emit(action, payload, callback) {
      if (this.type === 'socketio' && this.socket) {
        this.socket.emit(action, payload, callback);
      } else if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.msgId += 1;
        if (callback) this.callbacks.set(this.msgId, callback);
        this.ws.send(JSON.stringify({
          action,
          payload,
          msgId: this.msgId
        }));
      }
    }
  }

  const socket = new GameSocket();

  // UI Element References
  const landingScreen = document.getElementById('landing-screen');
  const lobbyScreen = document.getElementById('lobby-screen');
  const writingScreen = document.getElementById('writing-screen');
  const votingScreen = document.getElementById('voting-screen');
  const resultsScreen = document.getElementById('results-screen');

  const playerNameInput = document.getElementById('player-name-input');
  const categoriesGrid = document.getElementById('categories-grid');
  const selectedCategoryBadge = document.getElementById('selected-category-badge');

  const headerRoomBadge = document.getElementById('header-room-badge');
  const headerRoomCode = document.getElementById('header-room-code');

  // Load Persisted Player Name
  const savedName = localStorage.getItem('imposter_player_name');
  if (savedName) playerNameInput.value = savedName;

  playerNameInput.addEventListener('input', (e) => {
    localStorage.setItem('imposter_player_name', e.target.value.trim());
  });

  // Sound & Theme Controls
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  soundToggleBtn.addEventListener('click', () => {
    sound.enabled = !sound.enabled;
    soundToggleBtn.textContent = sound.enabled ? '🔊' : '🔇';
    sound.playClick();
  });

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    document.documentElement.classList.toggle('light', !isDark);
    themeToggleBtn.textContent = isDark ? '🌙' : '☀️';
    sound.playClick();
  });

  // Toast Notification Helper
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `animate-toast pointer-events-auto p-4 rounded-2xl border text-sm font-bold shadow-xl flex items-center justify-between gap-3 ${
      type === 'error' ? 'bg-red-950/90 border-red-800 text-red-200' :
      type === 'warning' ? 'bg-amber-950/90 border-amber-800 text-amber-200' :
      type === 'success' ? 'bg-emerald-950/90 border-emerald-800 text-emerald-200' :
      'bg-slate-900/90 border-slate-700 text-slate-200'
    }`;

    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <span>${type === 'error' ? '🚫' : type === 'warning' ? '⚠️' : type === 'success' ? '🎉' : 'ℹ️'}</span>
        <span>${message}</span>
      </div>
      <button class="text-xs opacity-60 hover:opacity-100">✕</button>
    `;

    toast.querySelector('button').addEventListener('click', () => toast.remove());
    container.appendChild(toast);

    if (type === 'error' || type === 'warning') sound.playAlert();

    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 4500);
  }

  // Screen Switching Helper
  function showScreen(screen) {
    [landingScreen, lobbyScreen, writingScreen, votingScreen, resultsScreen].forEach(s => s.classList.add('hidden'));
    screen.classList.remove('hidden');

    if (screen === landingScreen) {
      headerRoomBadge.classList.add('hidden');
      headerRoomBadge.classList.remove('flex');
    } else {
      headerRoomBadge.classList.remove('hidden');
      headerRoomBadge.classList.add('flex');
    }
  }

  // Render Categories Grid
  function renderCategories() {
    categoriesGrid.innerHTML = '';
    const cats = window.CATEGORIES || {};

    Object.keys(cats).forEach(key => {
      const cat = cats[key];
      const card = document.createElement('div');
      const isSelected = key === selectedCategoryKey;

      card.className = `category-card cursor-pointer p-3 rounded-2xl border text-left flex items-center gap-2.5 transition ${
        isSelected 
          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold shadow-lg shadow-cyan-500/10' 
          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
      }`;

      card.innerHTML = `
        <span class="text-xl">${cat.icon}</span>
        <div class="truncate">
          <p class="text-xs font-bold truncate">${cat.name}</p>
          <p class="text-[10px] text-slate-400">${cat.words.length} words</p>
        </div>
      `;

      card.addEventListener('click', () => {
        selectedCategoryKey = key;
        selectedCategoryBadge.innerHTML = `${cat.name} ${cat.icon}`;
        sound.playClick();
        renderCategories();
      });

      categoriesGrid.appendChild(card);
    });
  }

  renderCategories();

  // Mode Cards Selector
  const modeWordCard = document.getElementById('mode-word-card');
  const modeSentenceCard = document.getElementById('mode-sentence-card');

  modeWordCard.addEventListener('click', () => {
    selectedGameMode = 'word';
    modeWordCard.className = 'mode-card cursor-pointer bg-slate-950/80 border-2 border-cyan-500/80 p-4 rounded-2xl transition hover:border-cyan-400';
    modeSentenceCard.className = 'mode-card cursor-pointer bg-slate-950/40 border-2 border-slate-800 p-4 rounded-2xl transition hover:border-slate-700';
    sound.playClick();
  });

  modeSentenceCard.addEventListener('click', () => {
    selectedGameMode = 'sentence';
    modeSentenceCard.className = 'mode-card cursor-pointer bg-slate-950/80 border-2 border-purple-500/80 p-4 rounded-2xl transition hover:border-purple-400';
    modeWordCard.className = 'mode-card cursor-pointer bg-slate-950/40 border-2 border-slate-800 p-4 rounded-2xl transition hover:border-slate-700';
    sound.playClick();
  });

  // Create vs Join Tab Switching
  const tabCreateBtn = document.getElementById('tab-create-btn');
  const tabJoinBtn = document.getElementById('tab-join-btn');
  const panelCreate = document.getElementById('panel-create-room');
  const panelJoin = document.getElementById('panel-join-room');

  tabCreateBtn.addEventListener('click', () => {
    panelCreate.classList.remove('hidden');
    panelJoin.classList.add('hidden');
    tabCreateBtn.className = 'py-3 text-sm font-bold rounded-xl transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25';
    tabJoinBtn.className = 'py-3 text-sm font-bold rounded-xl transition-all duration-200 text-slate-400 hover:text-slate-200';
    sound.playClick();
  });

  tabJoinBtn.addEventListener('click', () => {
    panelJoin.classList.remove('hidden');
    panelCreate.classList.add('hidden');
    tabJoinBtn.className = 'py-3 text-sm font-bold rounded-xl transition-all duration-200 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25';
    tabCreateBtn.className = 'py-3 text-sm font-bold rounded-xl transition-all duration-200 text-slate-400 hover:text-slate-200';
    sound.playClick();
  });

  // Room Creation Action
  const createRoomSubmitBtn = document.getElementById('create-room-submit-btn');
  createRoomSubmitBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    if (!name) {
      return showToast('Please enter your player name first!', 'warning');
    }

    sound.playClick();
    socket.emit('create_room', {
      playerName: name,
      sessionToken,
      mode: selectedGameMode,
      category: selectedCategoryKey
    }, (res) => {
      if (res.success) {
        currentRoomCode = res.roomCode;
        headerRoomCode.textContent = res.roomCode;
        showToast(`Room ${res.roomCode} created successfully!`, 'success');
      } else {
        showToast(res.message || 'Failed to create room.', 'error');
      }
    });
  });

  // Room Join Action
  const joinRoomCodeInput = document.getElementById('join-room-code-input');
  const joinRoomSubmitBtn = document.getElementById('join-room-submit-btn');

  joinRoomSubmitBtn.addEventListener('click', () => {
    const name = playerNameInput.value.trim();
    const code = joinRoomCodeInput.value.trim().toUpperCase();

    if (!name) return showToast('Please enter your player name!', 'warning');
    if (!code || code.length !== 6) return showToast('Enter a valid 6-character room code.', 'warning');

    sound.playClick();
    socket.emit('join_room', {
      roomCode: code,
      playerName: name,
      sessionToken
    }, (res) => {
      if (res.success) {
        currentRoomCode = res.roomCode;
        headerRoomCode.textContent = res.roomCode;
        showToast(`Joined room ${res.roomCode}!`, 'success');
      } else {
        showToast(res.message || 'Failed to join room.', 'error');
      }
    });
  });

  // Copy Room Code Buttons
  const copyRoomBtn = document.getElementById('copy-room-btn');
  const lobbyCopyCodeBtn = document.getElementById('lobby-copy-code-btn');

  function copyCode() {
    if (currentRoomCode) {
      navigator.clipboard.writeText(currentRoomCode);
      showToast('Room code copied to clipboard!', 'success');
      sound.playClick();
    }
  }

  copyRoomBtn.addEventListener('click', copyCode);
  lobbyCopyCodeBtn.addEventListener('click', copyCode);

  // Host Start Game
  const lobbyStartGameBtn = document.getElementById('lobby-start-game-btn');
  lobbyStartGameBtn.addEventListener('click', () => {
    sound.playClick();
    socket.emit('start_game', { roomCode: currentRoomCode, sessionToken }, (res) => {
      if (res && !res.success) {
        showToast(res.message, 'warning');
      }
    });
  });

  // Host Return to Lobby
  function triggerReturnToLobby() {
    sound.playClick();
    socket.emit('return_to_lobby', { roomCode: currentRoomCode, sessionToken });
  }

  document.getElementById('writing-host-lobby-btn').addEventListener('click', triggerReturnToLobby);
  document.getElementById('voting-host-lobby-btn').addEventListener('click', triggerReturnToLobby);
  document.getElementById('results-lobby-btn').addEventListener('click', triggerReturnToLobby);

  // Next Round Button
  document.getElementById('results-next-round-btn').addEventListener('click', () => {
    sound.playClick();
    socket.emit('start_game', { roomCode: currentRoomCode, sessionToken });
  });

  // Leave Room
  document.getElementById('lobby-leave-room-btn').addEventListener('click', () => {
    sound.playClick();
    socket.emit('leave_room', { roomCode: currentRoomCode, sessionToken });
    currentRoomCode = null;
    showScreen(landingScreen);
    showToast('Left the room.', 'info');
  });

  // Submit Hint / Answer
  const writingInput = document.getElementById('writing-input');
  const submitHintBtn = document.getElementById('submit-hint-btn');
  const writingStatusMsg = document.getElementById('writing-status-msg');

  submitHintBtn.addEventListener('click', () => {
    const val = writingInput.value.trim();
    if (!val) return showToast('Please type a hint or answer before submitting!', 'warning');

    sound.playClick();
    socket.emit('submit_hint', {
      roomCode: currentRoomCode,
      sessionToken,
      hintOrAnswer: val
    });

    writingStatusMsg.textContent = '✅ Hint submitted! You can edit until everyone finishes.';
    writingStatusMsg.className = 'text-xs font-bold text-emerald-400 text-center';
  });

  // Imposter Peek Perk (Word Mode)
  const imposterPeekBtn = document.getElementById('imposter-peek-btn');
  const imposterPeekResult = document.getElementById('imposter-peek-result');

  imposterPeekBtn.addEventListener('click', () => {
    sound.playClick();
    socket.emit('imposter_peek_hint', { roomCode: currentRoomCode, sessionToken }, (res) => {
      if (res.success) {
        imposterPeekResult.textContent = `👁️ Peeked Clue: ${res.hint}`;
        imposterPeekResult.classList.remove('hidden');
        imposterPeekBtn.classList.add('hidden');
        sound.playSuccess();
      } else {
        showToast(res.message, 'warning');
      }
    });
  });

  // Confirm Vote
  const confirmVoteBtn = document.getElementById('confirm-vote-btn');
  confirmVoteBtn.addEventListener('click', () => {
    if (!selectedVoteTargetToken) return showToast('Click a player card to select your vote first!', 'warning');

    sound.playClick();
    socket.emit('submit_vote', {
      roomCode: currentRoomCode,
      sessionToken,
      targetToken: selectedVoteTargetToken
    });

    confirmVoteBtn.disabled = true;
    confirmVoteBtn.textContent = '✅ Vote Cast';
    showToast('Vote submitted!', 'success');
  });

  // Automatic Session Reconnection on Load / Socket Connect
  socket.on('connect', () => {
    console.log('Connected to server via WebSocket.');
    if (currentRoomCode || localStorage.getItem('imposter_last_room')) {
      socket.emit('reconnect_session', { sessionToken }, (res) => {
        if (res.success) {
          currentRoomCode = res.roomCode;
          headerRoomCode.textContent = res.roomCode;
        }
      });
    }
  });

  // Timer Tick Event
  socket.on('timer_tick', ({ seconds }) => {
    const writingTimer = document.getElementById('writing-timer-count');
    const votingTimer = document.getElementById('voting-timer-count');

    if (writingTimer) writingTimer.textContent = `${seconds}s`;
    if (votingTimer) votingTimer.textContent = `${seconds}s`;

    if (seconds <= 5 && seconds > 0) {
      sound.playTimerTick();
    }
  });

  // Toast Event from Server
  socket.on('toast_notification', ({ type, message }) => {
    showToast(message, type);
  });

  // Kicked from room event
  socket.on('kicked_from_room', ({ message }) => {
    currentRoomCode = null;
    showScreen(landingScreen);
    showToast(message || 'You were kicked from the room.', 'error');
  });

  // Main Room State Sync Engine
  socket.on('room_state_update', (state) => {
    currentRoomState = state;
    currentRoomCode = state.code;
    headerRoomCode.textContent = state.code;
    localStorage.setItem('imposter_last_room', state.code);

    // Sync Header / Badges
    document.getElementById('lobby-room-code').textContent = state.code;
    document.getElementById('lobby-mode-badge').textContent = state.mode === 'word' ? 'Word Imposter' : 'Sentence Imposter';
    document.getElementById('lobby-category-badge').textContent = `${state.categoryName}`;

    const isHost = state.isHost;

    // Phase Routing
    if (state.phase === 'lobby') {
      showScreen(lobbyScreen);
      renderLobbyScreen(state, isHost);
    } else if (state.phase === 'writing') {
      showScreen(writingScreen);
      renderWritingScreen(state, isHost);
    } else if (state.phase === 'voting') {
      showScreen(votingScreen);
      renderVotingScreen(state, isHost);
    } else if (state.phase === 'results') {
      showScreen(resultsScreen);
      renderResultsScreen(state, isHost);
    }
  });

  // Render Lobby Screen
  function renderLobbyScreen(state, isHost) {
    const playersList = document.getElementById('lobby-players-list');
    const leaderboardList = document.getElementById('lobby-leaderboard-list');
    const playerCountBadge = document.getElementById('lobby-player-count-badge');
    const minPlayersAlert = document.getElementById('lobby-min-players-alert');
    const startBtn = document.getElementById('lobby-start-game-btn');
    const waitingText = document.getElementById('lobby-waiting-host-text');

    const connectedPlayers = state.players.filter(p => p.connected);
    playerCountBadge.textContent = `${connectedPlayers.length} / 12`;

    if (connectedPlayers.length >= state.minPlayers) {
      minPlayersAlert.classList.add('hidden');
    } else {
      minPlayersAlert.classList.remove('hidden');
    }

    // Host Controls
    if (isHost) {
      startBtn.classList.remove('hidden');
      waitingText.classList.add('hidden');
    } else {
      startBtn.classList.add('hidden');
      waitingText.classList.remove('hidden');
    }

    // Render Players
    playersList.innerHTML = '';
    state.players.forEach(p => {
      const card = document.createElement('div');
      card.className = `p-3 rounded-2xl border flex items-center justify-between gap-2 ${
        p.connected ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-950/30 border-slate-900 opacity-50'
      }`;

      const isMe = p.sessionToken === sessionToken;

      card.innerHTML = `
        <div class="flex items-center gap-2.5 overflow-hidden">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs">
            ${p.name.charAt(0).toUpperCase()}
          </div>
          <div class="truncate">
            <p class="text-xs font-bold truncate flex items-center gap-1">
              <span>${p.name}</span>
              ${isMe ? '<span class="text-[10px] text-cyan-400">(You)</span>' : ''}
            </p>
            <div class="flex items-center gap-1.5 mt-0.5">
              ${p.isHost ? '<span class="text-[9px] bg-amber-500/20 text-amber-300 font-extrabold px-1.5 py-0.2 rounded">HOST</span>' : ''}
              <span class="text-[9px] text-slate-400">${p.connected ? '🟢 Connected' : '🔴 Offline'}</span>
            </div>
          </div>
        </div>

        ${isHost && !isMe ? `
          <button class="kick-btn text-xs px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl transition" data-token="${p.sessionToken}">
            Kick
          </button>
        ` : ''}
      `;

      if (isHost && !isMe) {
        card.querySelector('.kick-btn')?.addEventListener('click', () => {
          sound.playClick();
          socket.emit('kick_player', {
            roomCode: state.code,
            sessionToken,
            targetToken: p.sessionToken
          });
        });
      }

      playersList.appendChild(card);
    });

    // Render Cumulative Leaderboard
    leaderboardList.innerHTML = '';
    const sorted = [...state.players].sort((a, b) => b.score - a.score);
    sorted.forEach((p, idx) => {
      const item = document.createElement('div');
      item.className = 'flex items-center justify-between text-xs py-1.5 px-3 rounded-xl bg-slate-950/40 border border-slate-800/60';
      item.innerHTML = `
        <span class="font-bold truncate flex items-center gap-2">
          <span class="text-slate-500 font-mono w-4">#${idx + 1}</span>
          <span>${p.name}</span>
        </span>
        <span class="font-mono font-extrabold text-cyan-400">${p.score} pts</span>
      `;
      leaderboardList.appendChild(item);
    });
  }

  // Render Writing Screen
  function renderWritingScreen(state, isHost) {
    const roleBadge = document.getElementById('role-badge');
    const roleSubtitle = document.getElementById('role-subtitle');
    const roleMainText = document.getElementById('role-main-text');
    const roleInstruction = document.getElementById('role-hint-instruction');

    const imposterPerkContainer = document.getElementById('imposter-perk-container');
    const imposterPeekResult = document.getElementById('imposter-peek-result');
    const hostLobbyBtn = document.getElementById('writing-host-lobby-btn');

    if (isHost) hostLobbyBtn.classList.remove('hidden');
    else hostLobbyBtn.classList.add('hidden');

    const isImposter = state.myRole === 'imposter';

    if (isImposter) {
      roleBadge.textContent = 'YOU ARE THE IMPOSTER 🕵️‍♂️';
      roleBadge.className = 'inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-rose-500/20 text-rose-300 border border-rose-500/30';

      if (state.mode === 'word') {
        roleSubtitle.textContent = `CATEGORY: ${state.categoryName}`;
        roleMainText.textContent = '???';
        roleInstruction.textContent = 'You DO NOT know the secret word! Blend in by writing a vague hint matching the category.';

        imposterPerkContainer.classList.remove('hidden');
        if (state.imposterPeekedHint) {
          imposterPeekResult.textContent = `👁️ Peeked Clue: ${state.imposterPeekedHint}`;
          imposterPeekResult.classList.remove('hidden');
          imposterPeekBtn.classList.add('hidden');
        }
      } else {
        roleSubtitle.textContent = `IMPOSTER QUESTION B`;
        roleMainText.textContent = `"${state.myQuestion || '???'}"`;
        roleInstruction.textContent = 'Answer your variation of the question carefully without revealing you received a different question!';
        imposterPerkContainer.classList.add('hidden');
      }
    } else {
      roleBadge.textContent = 'YOU ARE INNOCENT 🛡️';
      roleBadge.className = 'inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-cyan-500/20 text-cyan-300 border border-cyan-500/30';
      imposterPerkContainer.classList.add('hidden');

      if (state.mode === 'word') {
        roleSubtitle.textContent = 'SECRET WORD';
        roleMainText.textContent = state.secretWord || '---';
        roleInstruction.textContent = 'Write a clever, subtle hint so innocent players know you are safe, without giving away the word to the Imposter!';
      } else {
        roleSubtitle.textContent = 'QUESTION A';
        roleMainText.textContent = `"${state.myQuestion || '???'}"`;
        roleInstruction.textContent = 'Answer the question naturally. The Imposter has a slightly different question!';
      }
    }

    // Input state
    if (state.myHasSubmitted) {
      writingStatusMsg.textContent = '✅ Submitted! Waiting for other players...';
      writingStatusMsg.className = 'text-xs font-bold text-emerald-400 text-center';
    }
  }

  // Render Voting Screen
  function renderVotingScreen(state, isHost) {
    const revealedTitle = document.getElementById('voting-revealed-title');
    const submittedBadge = document.getElementById('voting-submitted-badge');
    const grid = document.getElementById('voting-cards-grid');
    const hostLobbyBtn = document.getElementById('voting-host-lobby-btn');

    if (isHost) hostLobbyBtn.classList.remove('hidden');
    else hostLobbyBtn.classList.add('hidden');

    if (state.mode === 'word') {
      revealedTitle.textContent = `SECRET WORD: "${state.secretWord}"`;
    } else {
      revealedTitle.textContent = `QUESTION A: "${state.questionA}"`;
    }

    const votedCount = state.players.filter(p => p.hasVoted).length;
    submittedBadge.textContent = `${votedCount} / ${state.players.length} Voted`;

    grid.innerHTML = '';
    selectedVoteTargetToken = null;
    confirmVoteBtn.disabled = true;

    state.players.forEach(p => {
      const card = document.createElement('div');
      const isMe = p.sessionToken === sessionToken;

      card.className = `vote-card cursor-pointer p-4 rounded-2xl border flex flex-col justify-between gap-3 bg-slate-900/80 border-slate-800 ${
        isMe ? 'opacity-60 cursor-not-allowed' : 'hover:border-purple-500/80'
      }`;

      card.innerHTML = `
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span class="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-[10px]">
                ${p.name.charAt(0).toUpperCase()}
              </span>
              <span>${p.name}</span>
            </span>
            ${p.hasSubmitted ? '<span class="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">Submitted</span>' : ''}
          </div>
          <div class="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 italic">
            "${p.submission || 'No clue submitted'}"
          </div>
        </div>

        <div class="flex items-center justify-between text-[10px] text-slate-400 font-bold pt-1 border-t border-slate-800/80">
          <span>${isMe ? '(Your Clue)' : 'Click to Vote'}</span>
          ${p.hasVoted ? '<span>✅ Voted</span>' : ''}
        </div>
      `;

      if (!isMe) {
        card.addEventListener('click', () => {
          document.querySelectorAll('.vote-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
          selectedVoteTargetToken = p.sessionToken;
          confirmVoteBtn.disabled = state.myHasVoted;
          sound.playClick();
        });
      }

      grid.appendChild(card);
    });

    if (state.myHasVoted) {
      confirmVoteBtn.disabled = true;
      confirmVoteBtn.textContent = '✅ Vote Cast';
    } else {
      confirmVoteBtn.textContent = 'Confirm Vote';
    }
  }

  // Render Results Screen
  function renderResultsScreen(state, isHost) {
    const res = state.resultsData;
    if (!res) return;

    const verdictBadge = document.getElementById('results-verdict-badge');
    const verdictTitle = document.getElementById('results-verdict-title');
    const imposterName = document.getElementById('results-imposter-name');
    const secretLabel = document.getElementById('results-secret-label');
    const secretValue = document.getElementById('results-secret-value');
    const questionsBreakdown = document.getElementById('results-questions-breakdown');
    const qaText = document.getElementById('results-qa-text');
    const qbText = document.getElementById('results-qb-text');

    const votesList = document.getElementById('results-votes-list');
    const leaderboardList = document.getElementById('results-leaderboard-list');

    const nextRoundBtn = document.getElementById('results-next-round-btn');
    if (isHost) nextRoundBtn.classList.remove('hidden');
    else nextRoundBtn.classList.add('hidden');

    imposterName.textContent = res.imposterName;

    if (state.mode === 'word') {
      secretLabel.textContent = 'SECRET WORD';
      secretValue.textContent = res.secretWord || '---';
      questionsBreakdown.classList.add('hidden');
    } else {
      secretLabel.textContent = 'CATEGORY';
      secretValue.textContent = state.categoryName;
      questionsBreakdown.classList.remove('hidden');
      qaText.textContent = res.questionA || '---';
      qbText.textContent = res.questionB || '---';
    }

    if (res.imposterCaught) {
      verdictBadge.textContent = 'IMPOSTER CAUGHT! 🎯';
      verdictBadge.className = 'inline-block px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      verdictTitle.textContent = 'Innocents Win The Round!';
      sound.playSuccess();
    } else {
      verdictBadge.textContent = 'IMPOSTER ESCAPED! 🥷';
      verdictBadge.className = 'inline-block px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-rose-500/20 text-rose-300 border border-rose-500/30';
      verdictTitle.textContent = `${res.imposterName} Fooled Everyone!`;
      sound.playAlert();
    }

    // Votes breakdown
    votesList.innerHTML = '';
    res.voteCounts.forEach(item => {
      const isImposter = item.token === state.imposterSessionToken;
      const el = document.createElement('div');
      el.className = `p-3 rounded-2xl border flex items-center justify-between text-xs ${
        isImposter ? 'bg-rose-950/40 border-rose-800' : 'bg-slate-950/60 border-slate-800'
      }`;
      el.innerHTML = `
        <span class="font-bold flex items-center gap-2">
          <span>${item.name}</span>
          ${isImposter ? '<span class="text-[9px] bg-rose-500/20 text-rose-300 font-extrabold px-1.5 py-0.2 rounded">IMPOSTER</span>' : ''}
        </span>
        <span class="font-mono font-bold text-purple-300">${item.count} votes</span>
      `;
      votesList.appendChild(el);
    });

    // Standings & Round Points
    leaderboardList.innerHTML = '';
    const sorted = [...state.players].sort((a, b) => b.score - a.score);
    sorted.forEach((p, idx) => {
      const roundPtsObj = res.roundPoints.find(r => r.token === p.sessionToken);
      const addedPts = roundPtsObj ? roundPtsObj.pts : 0;

      const el = document.createElement('div');
      el.className = 'p-3 rounded-2xl border flex items-center justify-between text-xs bg-slate-950/60 border-slate-800';
      el.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="text-slate-500 font-mono w-4">#${idx + 1}</span>
          <span class="font-bold">${p.name}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-emerald-400 font-bold">+${addedPts} pts</span>
          <span class="font-mono font-extrabold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/20">
            ${p.score} total
          </span>
        </div>
      `;
      leaderboardList.appendChild(el);
    });
  }

});
