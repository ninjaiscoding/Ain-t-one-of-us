# 🕵️‍♂️ IMPOSTER - Real-Time Multiplayer Party Game

A production-ready, highly polished, real-time web party game with two game modes: **Word Imposter** and **Sentence Imposter**.

Built using Node.js, Express, Socket.io, HTML5, Vanilla JavaScript, and Tailwind CSS.

---

## 🌟 Key Features

1. **Two Distinct Game Modes**:
   - **Mode 1: Word Imposter**: Innocent players receive a secret word from a chosen category. The Imposter receives NO word (only category name) and can use a 1-time **Peek Perk** to view a random clue submitted by another player.
   - **Mode 2: Sentence Imposter**: Innocent players receive Question A. The Imposter receives a slightly altered Question B. Both try to blend in during answer submission!
2. **20 Rich Categories**:
   - Animals (100 entries), Sports, Sportsmen, Famous Movies, Famous YouTubers, Space & Cosmos, Objects, Famous People, History, Video Games, Emotions, Vehicles, Tech Objects, Famous Countries, Famous Cities, Famous Apps, School Things, Relationships, Food & Dishes, and **Random (All Combined)**.
3. **Session Persistence & Reconnection**:
   - Disconnect resilience using `localStorage` session tokens.
   - Players can refresh their browser, switch tabs, or lose Wi-Fi and reconnect seamlessly without interrupting the game round.
4. **Dynamic Host System & Control**:
   - Host has **Start Game** and **Return to Lobby** controls actionable at ANY phase.
   - Host has a **Kick Player** button actionable at ANY time.
   - Automatic **Host Migration** when the current host leaves or disconnects.
5. **Real-Time Leaderboard & Scoring Engine**:
   - Tracks cumulative scores across multiple rounds in the same room.
   - **Scoring Rules**:
     - If Majority catches the Imposter: Correct voters get 1 point. Imposter gets 0.
     - If Imposter survives / ties: Imposter gets 2 points, correct voters get 1 point, incorrect voters get 0.
6. **Polished UI/UX**:
   - Glassmorphic dark/light theme switch.
   - Web Audio API synthesized sound effects (button clicks, phase changes, timer ticks, victory chimes).
   - Floating toast notifications for room actions.

---

## 📁 Repository Structure

```
imposter-game-multiplayer/
├── public/
│   ├── index.html       # Single Page Application HTML markup
│   ├── styles.css       # Custom CSS & Tailwind overrides
│   ├── app.js           # Client-side Socket.io logic & Web Audio API
│   └── categories.js    # 20 rich categories & question pairs
├── server.js            # Node.js Express + Socket.io Server logic
├── package.json         # Dependencies & start scripts
├── render.yaml          # Render 1-click deployment configuration
├── .gitignore           # Ignored files
└── README.md            # Setup and deployment documentation
```

---

## 🚀 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` (comes with Node.js)

### Steps

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/imposter-multiplayer-game.git
   cd imposter-multiplayer-game
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
   *(Open multiple browser tabs or incognito windows to test multiplayer functionality locally!)*

---

## 🛠️ Deployment Instructions

### Option 1: Render Deployment (Recommended)

1. Push your project to a new repository on [GitHub](https://github.com).
2. Log into your [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** and select **Web Service**.
4. Connect your GitHub repository.
5. Configure the service settings:
   - **Name**: `imposter-game`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Click **Create Web Service**. Render will automatically build and launch your real-time WebSocket game!

### Option 2: Render Blueprint (1-Click Deployment)
If using Render Blueprints:
1. Connect repository to Render.
2. Select **Blueprint** deployment using `render.yaml`. Render will automatically pick up the configuration.

---

## 🎮 How to Play

1. **Host Setup**: Enter your name, select **Game Mode** (Word or Sentence), choose a **Category**, and click **Create Room**.
2. **Invite Friends**: Copy the 6-character room code from the top right and share it with 3+ friends.
3. **Writing Phase**:
   - Innocent players: Receive the secret word or Question A and write a subtle hint/answer.
   - Imposter: Blend in! In Word Mode, click **Peek 1 Random Hint** to get a clue.
4. **Voting Phase**: Discuss everyone's hints, reveal the secret word/question, and vote for who you think is the Imposter.
5. **Results**: Reveal the Imposter, see who voted correctly, and inspect the updated leaderboard standings!
