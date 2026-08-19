# Holy Week -- Claude Code Instructions

You are an AI software engineering assistant for **Holy Week** (Miracle Maker), a browser-based investigation game set during the events of Holy Week.

## Project Summary

Holy Week is a narrative investigation game with multiple platform versions:
- **Desktop**: 3D globe/exploration via Three.js, orbital navigation, HUD sidebars
- **Mobile 2D/3D**: Touch-optimized tabbed interfaces with evidence collection, NPC interviews, prophecy matching, and case conclusion
- **Shared core**: Case management, evidence systems, prophecy/lab deduction, dialogue

The game has no build step — direct HTML/CSS/JS served via local HTTP server.

## Directory Layout

```
/ (project root)
├── index.html              # Landing/entry page
├── README.md              # Project documentation
├── AGENTS.md              # Shared agent directives
├── CLAUDE.md              # This file
├── GEMINI.md              # Gemini-specific instructions
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
│   └── styles/
├── mobile2D/              # Mobile 2D Version
│   ├── index.html
│   ├── gameEngine.js
│   └── styles/
└── mobile3D/              # Mobile 3D Version
    ├── index.html
    ├── gameEngine.js
    └── styles/
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+ modules)
- **3D**: Three.js (desktop/mobile3D)
- **Dialogue**: Ink.js for narrative conversations
- **No build step**: Direct browser execution via local HTTP server
- **Dependencies**: CDN for common libraries (Font Awesome, etc.)

## Development Workflow

1. **Start local server**:
   ```bash
   python -m http.server 8000
   # Open http://localhost:8000/desktop/index.html
   # or http://localhost:8000/mobile2D/index.html
   ```

2. **Make changes** to the relevant platform files

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

- Desktop uses Three.js with orbital camera controls
- Mobile versions use tabbed UI (`switchInvTab`) for Scene/People/Lab/Codex/Case File
- Case data shared via `js/gameplay/caseManager.js`
- Evidence/prophecy systems in `js/gameplay/evidenceSystem.js`
- UI components in `js/ui/` shared across platforms
- Modals use `.overlay-mask` with `.modal-panel` structure

## Tools to Use

- **Read/Glob/Grep** - Navigate and understand codebase
- **Browser DevTools** - Primary debugging (console, debugger, performance)
- **Web research** - For Three.js, Ink.js, or general web API questions
- **Bash** - Run local server

## Quality Gates

Every change must pass:
- ✅ No JavaScript errors in console
- ✅ Visual output renders correctly
- ✅ Responsive at 320px, 768px, 1024px, 1440px widths
- ✅ Smooth animation (≥55 fps on modern hardware)
- ✅ No regression in other platform versions
- ✅ Keyboard navigation and accessibility checks pass

## Platform-Specific Notes

### Desktop
- Uses ES modules (`import`/`export`)
- Three.js scene with orbital navigation
- Sidebar panels toggle via footer nav buttons
- Modals: Map, Settings, Codex, Instructions, Reset, Conclusion, Bible Reader

### Mobile2D / Mobile3D
- Tab-based navigation: Scene, People, Lab, Codex, Case File
- Shared `GameManager.js` handles game flow
- `UIManager.js` manages tab switching and rendering
- `switchInvTab('casefile')` renders the AccuseUI prophecy checklist

## Adding a New Feature

1. Determine which platform(s) need the change
2. Update shared `js/` code if applicable to all platforms
3. Apply platform-specific changes in `desktop/`, `mobile2D/`, or `mobile3D/`
4. Update `index.html` (desktop) or the relevant platform `index.html`
5. Update styles in platform `styles/` directories
6. Test in browser at all affected viewports
