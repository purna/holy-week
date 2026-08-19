# Holy Week -- Gemini (Jarvis) Instructions

You are an AI engineering assistant for **Holy Week** (Miracle Maker), a browser-based investigation game set during the events of Holy Week.

## Project Summary

Holy Week is a narrative investigation game where players explore a 3D world (desktop) or tabbed interface (mobile) to:
- Explore locations and select cases
- Collect evidence at crime scenes
- Interview witnesses and challenge contradictions
- Analyze evidence in the Lab to unlock prophecies
- Research prophecies in the Codex
- Conclude cases once all prophecies are researched

Multiple platform versions exist:
- **Desktop**: 3D globe with Three.js, orbital navigation, HUD sidebars
- **Mobile 2D**: Touch-optimized 2D tilemap scene
- **Mobile 3D**: 3D scene with touch controls

No build process — open directly in browser or via local HTTP server.

## Directory Layout

```
/ (project root)
├── index.html              # Landing/entry page
├── README.md              # Project description & links
├── AGENTS.md              # Shared agent directives
├── CLAUDE.md              # Claude-specific instructions
├── GEMINI.md              # This file
├── KILO.md                # Kilo-specific instructions
├── css/                   # Shared stylesheets
├── js/                    # Shared JavaScript modules
│   ├── gameplay/          # Case, evidence, deduction, prophecy systems
│   └── ui/                # Shared UI components (AccuseUI, LabWorkspaceUI, etc.)
├── assets/                # Images, fonts, gfx, story data
│   └── story/             # Ink dialogue files and case content
├── artwork/               # Design assets, concept art, graphics
├── fonts/                 # Custom web fonts
├── __docs/                # Documentation and metadata
├── scripts/               # Content generation and tooling scripts
├── tools/                 # Editors (Grid Editor, Case Editor)
├── prototypes/            # Interactive demo pages
├── desktop/               # Desktop Version (Three.js 3D)
│   ├── index.html
│   ├── gameEngine.js
│   ├── main.js
│   ├── styles/
│   ├── styles/components.css
│   └── ...
├── mobile2D/              # Mobile 2D Version
│   ├── index.html
│   ├── gameEngine.js
│   ├── UIManager.js
│   └── styles/
└── mobile3D/              # Mobile 3D Version
    ├── index.html
    ├── gameEngine.js
    ├── UIManager.js
    └── styles/
```

## Tech Stack

- **HTML5** - Structure and modals
- **CSS3** - Styling, responsive design, animations
- **JavaScript (ES6+)** - Game logic, UI management, rendering
- **Three.js** - 3D globe rendering (desktop/mobile3D)
- **Ink.js** - Narrative dialogue system
- Optional: lightweight libraries via CDN (Font Awesome, etc.)

## Development Workflow

1. **Start local server**:
   ```bash
   python -m http.server 8000
   # Access at http://localhost:8000/desktop/index.html
   # or http://localhost:8000/mobile2D/index.html
   ```

2. **Make changes** to the relevant HTML/CSS/JS file

3. **Verify in browser**:
   - Open the platform page
   - Check visual output matches expectations
   - Open DevTools (F12) → Console for errors
   - Check Performance tab for frame rate (aim 60fps)

4. **Test across**:
   - Viewport sizes (mobile 320px, tablet 768px, desktop 1024px+)
   - Browsers (Chrome, Firefox, Safari, Edge)
   - All platform versions to prevent regression

## Common Patterns Observed

- Desktop: Three.js scene with orbital camera, raycasting for interaction
- Mobile: Tab-based UI with `switchInvTab` for navigation
- Modals: `.overlay-mask` with `.modal-panel` structure (CSS in `styles/components.css`)
- Case data: Shared via `js/gameplay/caseManager.js`
- Evidence/prophecy: `js/gameplay/evidenceSystem.js`
- UI components: `js/ui/AccuseUI.js`, `js/ui/LabWorkspaceUI.js`, `js/ui/ChatUI.js`
- No build step — ES modules loaded directly in browser

## Tools to Use

- **Read/Glob/Grep** - Navigate and understand codebase
- **Browser DevTools** - Primary debugging (console, debugger, performance)
- **Web research** (Web Search, Web Fetch) - For Three.js, Ink.js, or general web API questions
- **Bash** - Run local server

## Quality Gates

Every change must pass:
- ✅ No JavaScript errors in console
- ✅ Visual effect renders correctly at multiple resolutions
- ✅ Smooth animation (≥55 fps on modern hardware)
- ✅ Mobile-responsive layout (no overflow, readable on small screens)
- ✅ No regression in other platform versions
- ✅ Accessibility: keyboard navigation, focus management, screen reader labels

## Adding a New Platform Feature

1. Determine target platform (`desktop/`, `mobile2D/`, or `mobile3D/`)
2. Update platform-specific `gameEngine.js` and UI files
3. Add/reuse shared components from `js/ui/` when possible
4. Update `index.html` for the target platform
5. Add styles to platform `styles/` directory
6. Test on all platforms if the change affects shared code

## Notes

- This is a game with narrative content — be careful with spoilers in test data
- No server-side code — all client-side
- Dependencies loaded via CDN or local `plugins/` directory
- Keep changes focused and minimal
- Performance matters — optimize canvas/WebGL drawing and avoid layout thrashing
