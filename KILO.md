# Holy Week -- Kilo Instructions

You are Kilo, a skilled software engineering assistant for **Holy Week** (Miracle Maker), a browser-based investigation game set during the events of Holy Week.

## Project Overview

Holy Week is a narrative investigation game where players explore locations, collect evidence, interview witnesses, analyze clues in a Lab, and conclude cases. Multiple platform versions exist:
- 🌍 **Desktop** — 3D globe exploration via Three.js, orbital navigation, HUD sidebars
- 📱 **Mobile 2D** — Touch-optimized 2D tilemap with tabbed interface
- 📱 **Mobile 3D** — 3D scene with touch controls and tabbed UI

## Project Structure

```
/ (project root)
├── index.html              # Landing/entry page
├── README.md              # Project documentation
├── AGENTS.md              # Shared agent directives
├── CLAUDE.md              # Claude-specific instructions
├── GEMINI.md              # Gemini-specific instructions
├── KILO.md                # This file
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
│   ├── UIManager.js
│   └── styles/
└── mobile3D/              # Mobile 3D Version
    ├── index.html
    ├── gameEngine.js
    ├── UIManager.js
    └── styles/
```

## Technology Stack

- **HTML5/CSS3/JavaScript (ES6+)** — Core web platform
- **Three.js** — 3D globe and scene rendering (desktop, mobile3D)
- **Ink.js** — Narrative dialogue system
- **No build step** — Direct browser execution via local HTTP server
- **CDN dependencies** — Font Awesome and common libraries where needed

## Workflow Guidelines

1. **Browser-based testing**: All versions run directly in the browser. Test changes by opening the HTML files locally or via a simple HTTP server:
   ```bash
   python -m http.server 8000
   # Open http://localhost:8000/desktop/index.html
   # or http://localhost:8000/mobile2D/index.html
   ```

2. **Platform awareness**: Changes may need to be applied to one or all platform versions. Check `desktop/`, `mobile2D/`, and `mobile3D/` for platform-specific code. Shared logic lives in `js/`.

3. **Visual verification**: Open the relevant platform page, verify visual output, and check DevTools console for errors.

4. **Cross-platform regression**: If changing shared `js/` code, verify all platform versions still work.

5. **Performance**: Animations and 3D rendering should maintain 60fps. Use `requestAnimationFrame` for smooth animations.

6. **Code conventions**: Follow existing patterns in the file being modified. Desktop uses ES modules with Three.js; mobile versions use similar modular structure.

## Available Tools & Priorities

1. **Read/Glob/Grep** for local codebase exploration (primary tools)
2. **Browser dev tools** for debugging visual output and performance
3. **Web research tools** (Web Search, Web Fetch) for Three.js, Ink.js, or general web API documentation
4. **Visual analysis tools** only when analyzing screenshots of rendered output
5. **Bash** - Run local server for testing

## Quality Checklist

Before considering changes complete:
- ✅ All platform pages load without console errors
- ✅ Visual output renders correctly
- ✅ Responsive layout works at common viewport sizes (320px, 768px, 1024px, 1440px)
- ✅ No performance regressions (check FPS in dev tools)
- ✅ Code follows existing style in the file being modified
- ✅ Accessibility: keyboard navigation, focus management, screen reader labels
- ✅ No regression in other platform versions

## Common Tasks

### Updating game logic
1. Locate relevant system in `js/gameplay/` (caseManager, evidenceSystem, deductionEngine, etc.)
2. Update shared logic
3. Verify in browser across all affected platforms

### Updating a UI component
1. Check if the component is shared (`js/ui/`) or platform-specific
2. Update HTML in platform `index.html` and styles in platform `styles/`
3. Verify responsive behavior at multiple viewport widths

### Adding a new platform feature
1. Determine target platform(s)
2. Update platform-specific files or add shared components
3. Wire up UI interactions in `gameEngine.js` or `UIManager.js`
4. Test on all affected platforms

### Styling updates
1. Check if styles are shared (`css/`) or platform-specific (`desktop/styles/`, `mobile2D/styles/`, etc.)
2. Maintain consistency with existing design system
3. Test responsive breakpoints

## Notes

- This is a client-side game — no server-side code
- No build system — changes are reflected immediately on page reload
- Dependencies (if any) should be loaded via CDN or local `plugins/` directory
- Keep changes focused and minimal
- Performance matters — optimize canvas/WebGL drawing and avoid layout thrashing
