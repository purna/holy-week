# Meta App Review Instructions — Holy Week

## App Overview

Holy Week is an educational browser-based investigation game set during the events of Holy Week in Jerusalem. Players explore locations, collect evidence, interview witnesses, and solve mysteries across 4 Acts and 16 Cases. The game has no social features, no user accounts, and no data sharing with Meta or any third party.

## Accessing the App

### Facebook Instant Games Build
The Facebook-specific build is located in the `/facebook/` directory of this repository. To deploy and test:

1. **Host the `/facebook/` folder** on any static HTTPS web server (e.g., GitHub Pages, Netlify, Vercel, or your own server).
2. **Configure the Facebook Instant Games app** in the Meta Developer Dashboard:
   - Set the **Bundle URL** to your hosted `index.html` (e.g., `https://your-domain.com/facebook/index.html`)
   - Ensure the server serves the directory with correct MIME types for `.js`, `.css`, `.svg`, and `.json` files
3. **Upload the build** through the Meta Developer Dashboard or use the Facebook Hosting API to upload the `/facebook/` directory contents.

### Alternative Testing (Web Build)
For testing without Facebook Instant Games, serve the `/mobile/` or `/desktop/` directories via any HTTPS server and open in a browser. The game functions identically to the Facebook build but without FBInstant integration.

## Navigation & Testing Instructions

### Starting the Game
1. Open the app URL in a browser or via Facebook Instant Games
2. Wait for the loading screen to complete (assets and dialogue data are preloaded)
3. The **"How to Play"** modal appears automatically on first launch — tap **Start Investigation** to begin
4. On subsequent launches, the main map screen appears immediately

### Core Gameplay Flow
1. **Select an Act** from the world map (e.g., "Act I: The Triumphal Entry")
2. **Choose a Case** from the list (e.g., "The Missing Donkey")
3. **Investigate** using the tabbed interface:
   - **Scene** — Explore the 3D/2D scene, find evidence
   - **People** — Interview witnesses, show evidence, challenge contradictions
   - **Lab** — Analyze evidence with deduction tools
   - **Codex** — Match evidence to biblical prophecies
   - **Case File** — Review progress and make final accusation
4. **Complete the case** by collecting all evidence and researching all prophecies
5. **Return to map** to unlock new acts and cases

### Key Features to Test
- Loading screen with progress bar
- Case selection and case opening
- Evidence collection and detail modals
- NPC dialogue and evidence reactions
- Lab deduction puzzles
- Prophecy matching in Codex
- Accessibility settings (bottom navbar gear icon)
- Reset progress functionality
- Offline play via service worker

## Meta API Usage

### Facebook Login
**We do not use Facebook Login or any Meta authentication APIs.** The game does not request, store, or process any Facebook user data. Players interact with the game as an anonymous guest — no login is required.

### Facebook Instant Games SDK
The app loads the **FBInstant SDK** (`fbinstant.6.3.js`) for platform integration. The SDK is used only for:

- **Initialization** — `FBInstant.initializeAsync()` to prepare the Instant Games environment
- **Starting the game** — `FBInstant.startGameAsync()` to signal readiness
- **Loading progress** — `FBInstant.setLoadingProgress(pct)` to update the native loading indicator
- **Pause handling** — `FBInstant.onPause()` to pause audio when the game is backgrounded

All FBInstant calls are wrapped in try/catch blocks and gracefully no-op if the SDK is unavailable (e.g., when testing outside the Facebook app).

### Other Meta APIs
**We do not use any other Meta APIs**, including but not limited to:
- Graph API
- Facebook Login / OAuth
- Share API
- Game Requests
- App Events
- Analytics for Apps
- Any endpoints requiring user permissions (user_friends, user_gender, user_birthday, email, etc.)

## Data Collection & Privacy

- **No personal data** is collected or transmitted to Meta or any server
- **No cookies** are used
- **Local storage** is used only for game progress (case completion, scores, accessibility settings) — all data stays on the device
- **No analytics, tracking, or advertising** of any kind

## Testing Without Meta Integration

To test the game without Facebook Instant Games:

1. Serve the `/mobile/` directory via HTTPS
2. Open in any modern browser (Chrome, Safari, Edge, Firefox)
3. The game detects that `FBInstant` is undefined and runs in standalone mode
4. All gameplay features work identically — the only difference is the absence of the native Facebook loading overlay

## Contact

For questions or additional information, please contact: privacy@pixelagent.co.uk
