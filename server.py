import asyncio
import json
import random
import string
from typing import Dict, List, Optional
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import os

app = FastAPI()

# Load Categories Data
categories_path = os.path.join(os.path.dirname(__file__), 'public', 'categories.js')

# Basic fallback category dataset for server logic
FALLBACK_CATEGORIES = {
    "animals": {
        "name": "Animals",
        "words": [
            "Lion", "Tiger", "Cheetah", "Leopard", "Wolf", "Grizzly Bear", "Polar Bear", "Gorilla", "Chimpanzee",
            "Kangaroo", "Giraffe", "Zebra", "Hippopotamus", "Rhinoceros", "Eagle", "Falcon", "Owl", "Penguin",
            "Great White Shark", "Dolphin", "Killer Whale (Orca)", "Octopus", "King Cobra", "Crocodile"
        ],
        "questions": [
            {"normal": "How dangerous would this animal be if met in wild?", "imposter": "How cute is this animal to keep as a pet?"},
            {"normal": "What habitat does this animal prefer?", "imposter": "What color or skin pattern is iconic for this animal?"}
        ]
    },
    "sports": {
        "name": "Sports",
        "words": ["Soccer", "Basketball", "Tennis", "Cricket", "Baseball", "Golf", "Formula 1", "Boxing", "Swimming", "Skiing"],
        "questions": [
            {"normal": "What equipment is essential for this sport?", "imposter": "How many players are per team?"}
        ]
    }
}

# In-Memory Storage
rooms: Dict[str, dict] = {}
sessions: Dict[str, dict] = {}

def generate_room_code() -> str:
    chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    while True:
        code = ''.join(random.choices(chars, k=6))
        if code not in rooms:
            return code

def get_sanitized_room_state(room: dict, session_token: str) -> dict:
    is_host = room['hostSessionToken'] == session_token
    me = next((p for p in room['players'] if p['sessionToken'] == session_token), None)

    return {
        "code": room['code'],
        "mode": room['mode'],
        "category": room['category'],
        "phase": room['phase'],
        "hostSessionToken": room['hostSessionToken'],
        "isHost": is_host,
        "minPlayers": room['minPlayers'],
        "timerSeconds": room['timerSeconds'],
        "currentRound": room['currentRound'],
        "imposterSessionToken": room['imposterSessionToken'] if room['phase'] in ['results', 'voting'] else None,
        "secretWord": room['secretWord'] if (room['phase'] == 'results' or room['phase'] == 'voting' or (me and me['role'] != 'imposter' and room['mode'] == 'word')) else None,
        "categoryName": room.get('categoryName', room['category'].capitalize()),
        "questionA": room['questionA'] if (room['phase'] in ['results', 'voting'] or (me and me['role'] != 'imposter' and room['mode'] == 'sentence')) else None,
        "questionB": room['questionB'] if (room['phase'] == 'results' or (me and me['role'] == 'imposter' and room['mode'] == 'sentence')) else None,
        "myRole": me['role'] if me else None,
        "myQuestion": room['questionB'] if (me and me['role'] == 'imposter') else room['questionA'] if me else None,
        "myHintOrAnswer": me['hintOrAnswer'] if me else '',
        "myHasSubmitted": me['hasSubmitted'] if me else False,
        "myHasVoted": me['hasVoted'] if me else False,
        "imposterPeekedHint": me.get('peekedHint') if (me and me['role'] == 'imposter') else None,
        "players": [
            {
                "sessionToken": p['sessionToken'],
                "name": p['name'],
                "score": p['score'],
                "connected": p['connected'],
                "isHost": p['sessionToken'] == room['hostSessionToken'],
                "hasSubmitted": p['hasSubmitted'],
                "hasVoted": p['hasVoted'],
                "submission": p['hintOrAnswer'] if room['phase'] in ['voting', 'results'] else None,
                "votedForToken": p['votedForToken'] if room['phase'] == 'results' else None,
                "role": p['role'] if room['phase'] == 'results' else None
            } for p in room['players']
        ],
        "resultsData": room['lastResults'] if room['phase'] == 'results' else None
    }

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {} # socket_id => websocket

    async def connect(self, websocket: WebSocket, socket_id: str):
        await websocket.accept()
        self.active_connections[socket_id] = websocket

    def disconnect(self, socket_id: str):
        if socket_id in self.active_connections:
            del self.active_connections[socket_id]

    async def send_json(self, socket_id: str, data: dict):
        if socket_id in self.active_connections:
            try:
                await self.active_connections[socket_id].send_json(data)
            except Exception:
                pass

manager = ConnectionManager()

async def broadcast_room_update(room_code: str):
    if room_code not in rooms:
        return
    room = rooms[room_code]
    for p in room['players']:
        if p['connected'] and p['socketId'] in manager.active_connections:
            state = get_sanitized_room_state(room, p['sessionToken'])
            await manager.send_json(p['socketId'], {"event": "room_state_update", "data": state})

async def broadcast_toast(room_code: str, type_str: str, message: str):
    if room_code not in rooms:
        return
    room = rooms[room_code]
    for p in room['players']:
        if p['connected'] and p['socketId'] in manager.active_connections:
            await manager.send_json(p['socketId'], {"event": "toast_notification", "data": {"type": type_str, "message": message}})

def reassign_host_if_needed(room: dict):
    active_players = [p for p in room['players'] if p['connected']]
    current_host = next((p for p in room['players'] if p['sessionToken'] == room['hostSessionToken']), None)

    if not current_host or not current_host['connected']:
        if len(active_players) > 0:
            room['hostSessionToken'] = active_players[0]['sessionToken']

async def room_timer_task(room_code: str, seconds: int, on_expire_coro):
    if room_code not in rooms:
        return
    room = rooms[room_code]
    room['timerSeconds'] = seconds

    while room['timerSeconds'] > 0:
        await asyncio.sleep(1)
        if room_code not in rooms:
            return
        room = rooms[room_code]
        if room.get('cancelTimer', False):
            room['cancelTimer'] = False
            return
        room['timerSeconds'] -= 1
        
        # Broadcast tick
        for p in room['players']:
            if p['connected'] and p['socketId'] in manager.active_connections:
                await manager.send_json(p['socketId'], {"event": "timer_tick", "data": {"seconds": room['timerSeconds']}})

    if room_code in rooms:
        await on_expire_coro(room_code)

async def process_voting_results(room_code: str):
    if room_code not in rooms:
        return
    room = rooms[room_code]
    if room['phase'] != 'voting':
        return

    room['phase'] = 'results'

    vote_counts = {p['sessionToken']: 0 for p in room['players']}
    for p in room['players']:
        if p['votedForToken'] and p['votedForToken'] in vote_counts:
            vote_counts[p['votedForToken']] += 1

    max_votes = max(vote_counts.values()) if vote_counts else 0
    most_voted_tokens = [token for token, count in vote_counts.items() if count == max_votes and max_votes > 0]

    imposter_token = room['imposterSessionToken']
    imposter_caught = (len(most_voted_tokens) == 1 and most_voted_tokens[0] == imposter_token)

    round_pts_map = {}
    for p in room['players']:
        pts = 0
        voted_imposter = (p['votedForToken'] == imposter_token)

        if imposter_caught:
            if voted_imposter and p['sessionToken'] != imposter_token:
                pts = 1
            else:
                pts = 0
        else:
            if p['sessionToken'] == imposter_token:
                pts = 2
            elif voted_imposter:
                pts = 1
            else:
                pts = 0

        p['score'] += pts
        round_pts_map[p['sessionToken']] = pts

    imposter_player = next((p for p in room['players'] if p['sessionToken'] == imposter_token), None)

    room['lastResults'] = {
        "imposterCaught": imposter_caught,
        "imposterName": imposter_player['name'] if imposter_player else 'Unknown',
        "secretWord": room['secretWord'],
        "questionA": room['questionA'],
        "questionB": room['questionB'],
        "mostVotedNames": [next((p['name'] for p in room['players'] if p['sessionToken'] == t), 'Unknown') for t in most_voted_tokens],
        "voteCounts": [{"name": next((p['name'] for p in room['players'] if p['sessionToken'] == t), 'Unknown'), "token": t, "count": c} for t, c in vote_counts.items()],
        "roundPoints": [{"name": next((p['name'] for p in room['players'] if p['sessionToken'] == t), 'Unknown'), "token": t, "pts": pts} for t, pts in round_pts_map.items()]
    }

    await broadcast_room_update(room_code)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    socket_id = f"sock_{random.randint(100000, 999999)}"
    await manager.connect(websocket, socket_id)

    try:
        while True:
            raw_msg = await websocket.receive_text()
            data = json.loads(raw_msg)
            action = data.get("action")
            payload = data.get("payload", {})
            msg_id = data.get("msgId")

            if action == "create_room":
                player_name = payload.get("playerName", "").strip()
                session_token = payload.get("sessionToken")
                mode = payload.get("mode", "word")
                category = payload.get("category", "animals")

                if not player_name or not session_token:
                    await manager.send_json(socket_id, {"msgId": msg_id, "success": False, "message": "Invalid input"})
                    continue

                code = generate_room_code()
                player = {
                    "sessionToken": session_token,
                    "socketId": socket_id,
                    "name": player_name,
                    "score": 0,
                    "connected": True,
                    "role": "player",
                    "hintOrAnswer": "",
                    "hasSubmitted": False,
                    "hasVoted": False,
                    "votedForToken": None,
                    "peekedHint": None
                }

                room = {
                    "code": code,
                    "mode": mode if mode == 'sentence' else 'word',
                    "category": category,
                    "categoryName": category.capitalize(),
                    "phase": "lobby",
                    "hostSessionToken": session_token,
                    "minPlayers": 3,
                    "currentRound": 0,
                    "players": [player],
                    "imposterSessionToken": None,
                    "secretWord": None,
                    "questionA": None,
                    "questionB": None,
                    "timerSeconds": 0,
                    "lastResults": None,
                    "cancelTimer": False
                }

                rooms[code] = room
                sessions[session_token] = {"roomCode": code, "playerName": player_name, "socketId": socket_id}

                await manager.send_json(socket_id, {"msgId": msg_id, "success": True, "roomCode": code})
                await broadcast_room_update(code)

            elif action == "join_room":
                code = payload.get("roomCode", "").strip().upper()
                player_name = payload.get("playerName", "").strip()
                session_token = payload.get("sessionToken")

                if code not in rooms:
                    await manager.send_json(socket_id, {"msgId": msg_id, "success": False, "message": "Room not found."})
                    continue

                room = rooms[code]
                player = next((p for p in room['players'] if p['sessionToken'] == session_token), None)

                if player:
                    player['socketId'] = socket_id
                    player['connected'] = True
                    player['name'] = player_name or player['name']
                else:
                    if room['phase'] != 'lobby':
                        await manager.send_json(socket_id, {"msgId": msg_id, "success": False, "message": "Game already in progress."})
                        continue
                    player = {
                        "sessionToken": session_token,
                        "socketId": socket_id,
                        "name": player_name,
                        "score": 0,
                        "connected": True,
                        "role": "player",
                        "hintOrAnswer": "",
                        "hasSubmitted": False,
                        "hasVoted": False,
                        "votedForToken": None,
                        "peekedHint": None
                    }
                    room['players'].append(player)

                sessions[session_token] = {"roomCode": code, "playerName": player['name'], "socketId": socket_id}
                await manager.send_json(socket_id, {"msgId": msg_id, "success": True, "roomCode": code})
                await broadcast_room_update(code)
                await broadcast_toast(code, "info", f"{player['name']} joined the room!")

            elif action == "reconnect_session":
                session_token = payload.get("sessionToken")
                session = sessions.get(session_token)

                if not session or session['roomCode'] not in rooms:
                    await manager.send_json(socket_id, {"msgId": msg_id, "success": False})
                    continue

                room = rooms[session['roomCode']]
                player = next((p for p in room['players'] if p['sessionToken'] == session_token), None)

                if not player:
                    await manager.send_json(socket_id, {"msgId": msg_id, "success": False})
                    continue

                player['socketId'] = socket_id
                player['connected'] = True
                session['socketId'] = socket_id

                await manager.send_json(socket_id, {"msgId": msg_id, "success": True, "roomCode": room['code']})
                await broadcast_room_update(room['code'])

            elif action == "start_game":
                code = payload.get("roomCode")
                session_token = payload.get("sessionToken")
                if code not in rooms:
                    continue
                room = rooms[code]
                if room['hostSessionToken'] != session_token:
                    await manager.send_json(socket_id, {"msgId": msg_id, "success": False, "message": "Only host can start."})
                    continue

                connected_players = [p for p in room['players'] if p['connected']]
                if len(connected_players) < room['minPlayers']:
                    await manager.send_json(socket_id, {"msgId": msg_id, "success": False, "message": f"Minimum {room['minPlayers']} players required!"})
                    continue

                room['currentRound'] += 1
                room['phase'] = 'writing'

                cat_data = FALLBACK_CATEGORIES.get(room['category'], FALLBACK_CATEGORIES['animals'])
                word = random.choice(cat_data['words'])
                q_pair = random.choice(cat_data['questions'])

                room['secretWord'] = word
                room['questionA'] = q_pair['normal']
                room['questionB'] = q_pair['imposter']

                imposter_player = random.choice(connected_players)
                room['imposterSessionToken'] = imposter_player['sessionToken']

                for p in room['players']:
                    p['role'] = 'imposter' if p['sessionToken'] == room['imposterSessionToken'] else 'player'
                    p['hintOrAnswer'] = ''
                    p['hasSubmitted'] = False
                    p['hasVoted'] = False
                    p['votedForToken'] = None
                    p['peekedHint'] = None

                await manager.send_json(socket_id, {"msgId": msg_id, "success": True})
                await broadcast_room_update(code)

                # Start 75s timer
                asyncio.create_task(room_timer_task(code, 75, lambda r_code: on_writing_timer_expire(r_code)))

            elif action == "return_to_lobby":
                code = payload.get("roomCode")
                session_token = payload.get("sessionToken")
                if code not in rooms:
                    continue
                room = rooms[code]
                if room['hostSessionToken'] != session_token:
                    continue

                room['cancelTimer'] = True
                room['phase'] = 'lobby'
                for p in room['players']:
                    p['hintOrAnswer'] = ''
                    p['hasSubmitted'] = False
                    p['hasVoted'] = False
                    p['votedForToken'] = None
                    p['peekedHint'] = None

                await broadcast_toast(code, "warning", "Host returned everyone to Lobby.")
                await broadcast_room_update(code)

            elif action == "kick_player":
                code = payload.get("roomCode")
                session_token = payload.get("sessionToken")
                target_token = payload.get("targetToken")
                if code not in rooms:
                    continue
                room = rooms[code]
                if room['hostSessionToken'] != session_token or target_token == session_token:
                    continue

                target_player = next((p for p in room['players'] if p['sessionToken'] == target_token), None)
                if target_player:
                    room['players'].remove(target_player)
                    if target_token in sessions:
                        del sessions[target_token]

                    if target_player['socketId'] in manager.active_connections:
                        await manager.send_json(target_player['socketId'], {"event": "kicked_from_room", "data": {"message": "You were kicked by the host."}})

                    await broadcast_toast(code, "error", f"{target_player['name']} was kicked.")

                    active_count = len([p for p in room['players'] if p['connected']])
                    if room['phase'] != 'lobby' and (active_count < 3 or target_token == room['imposterSessionToken']):
                        room['cancelTimer'] = True
                        room['phase'] = 'lobby'
                        await broadcast_toast(code, "info", "Returned to Lobby due to player changes.")

                    await broadcast_room_update(code)

            elif action == "submit_hint":
                code = payload.get("roomCode")
                session_token = payload.get("sessionToken")
                hint = payload.get("hintOrAnswer", "").strip()

                if code not in rooms:
                    continue
                room = rooms[code]
                if room['phase'] != 'writing':
                    continue

                player = next((p for p in room['players'] if p['sessionToken'] == session_token), None)
                if player:
                    player['hintOrAnswer'] = hint
                    player['hasSubmitted'] = True

                    connected = [p for p in room['players'] if p['connected']]
                    if all(p['hasSubmitted'] for p in connected):
                        room['cancelTimer'] = True
                        room['phase'] = 'voting'
                        asyncio.create_task(room_timer_task(code, 60, lambda r_code: process_voting_results(r_code)))

                    await broadcast_room_update(code)

            elif action == "imposter_peek_hint":
                code = payload.get("roomCode")
                session_token = payload.get("sessionToken")
                if code not in rooms:
                    continue
                room = rooms[code]
                player = next((p for p in room['players'] if p['sessionToken'] == session_token), None)

                if not player or player['role'] != 'imposter':
                    await manager.send_json(socket_id, {"msgId": msg_id, "success": False, "message": "Only Imposter can peek."})
                    continue

                if player.get('peekedHint'):
                    await manager.send_json(socket_id, {"msgId": msg_id, "success": True, "hint": player['peekedHint']})
                    continue

                submitted_others = [p for p in room['players'] if p['role'] != 'imposter' and p['hasSubmitted'] and p['hintOrAnswer']]
                if not submitted_others:
                    await manager.send_json(socket_id, {"msgId": msg_id, "success": False, "message": "No submitted hints yet! Try again in a few seconds."})
                    continue

                pick = random.choice(submitted_others)
                player['peekedHint'] = f"{pick['name']}: \"{pick['hintOrAnswer']}\""

                await manager.send_json(socket_id, {"msgId": msg_id, "success": True, "hint": player['peekedHint']})
                await broadcast_room_update(code)

            elif action == "submit_vote":
                code = payload.get("roomCode")
                session_token = payload.get("sessionToken")
                target_token = payload.get("targetToken")
                if code not in rooms:
                    continue
                room = rooms[code]
                if room['phase'] != 'voting':
                    continue

                player = next((p for p in room['players'] if p['sessionToken'] == session_token), None)
                if player and not player['hasVoted']:
                    player['hasVoted'] = True
                    player['votedForToken'] = target_token

                    connected = [p for p in room['players'] if p['connected']]
                    if all(p['hasVoted'] for p in connected):
                        room['cancelTimer'] = True
                        await process_voting_results(code)
                    else:
                        await broadcast_room_update(code)

            elif action == "leave_room":
                code = payload.get("roomCode")
                session_token = payload.get("sessionToken")
                if code in rooms:
                    room = rooms[code]
                    player = next((p for p in room['players'] if p['sessionToken'] == session_token), None)
                    if player:
                        room['players'].remove(player)
                        if session_token in sessions:
                            del sessions[session_token]

                        if len(room['players']) == 0:
                            room['cancelTimer'] = True
                            del rooms[code]
                        else:
                            reassign_host_if_needed(room)
                            await broadcast_toast(code, "info", f"{player['name']} left the room.")
                            await broadcast_room_update(code)

    except WebSocketDisconnect:
        manager.disconnect(socket_id)
        # Handle disconnect grace
        for code, room in list(rooms.items()):
            player = next((p for p in room['players'] if p['socketId'] == socket_id), None)
            if player:
                player['connected'] = False
                reassign_host_if_needed(room)
                asyncio.create_task(broadcast_toast(code, "warning", f"{player['name']} lost connection..."))
                asyncio.create_task(broadcast_room_update(code))

async def on_writing_timer_expire(room_code: str):
    if room_code in rooms:
        room = rooms[room_code]
        if room['phase'] == 'writing':
            room['phase'] = 'voting'
            await broadcast_room_update(room_code)
            asyncio.create_task(room_timer_task(room_code, 60, lambda r_code: process_voting_results(r_code)))

# Serve Static Files
app.mount("/", StaticFiles(directory="public", html=True), name="public")

if __name__ == "__main__":
    print("[SERVER] Imposter Game Server (Python FastAPI) starting on http://localhost:3000")
    uvicorn.run(app, host="0.0.0.0", port=3000)
