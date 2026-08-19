# Holy Week Agent Directives

These repo-level rules apply to all agents working on the Holy Week codebase.

## Project Context

Holy Week (Miracle Maker) is a browser-based investigation game set during the events of Holy Week:
- Desktop 3D version (`desktop/`) — Three.js globe, orbital navigation, sidebars
- Mobile versions (`mobile/`, `mobile2D/`, `mobile3D/`) — touch-optimized tabbed UI
- Shared systems in `js/`, `css/`, and `assets/`
- Prototypes and tools in `prototypes/` and `tools/`
- No build system — direct HTML/CSS/JS, run via local HTTP server

## Before Making Changes

1. **Read README.md** — Understand project scope, current platforms, and featured features
2. **Check the relevant platform directory** — `desktop/`, `mobile2D/`, or `mobile3D/`
3. **Verify locally** — Run a simple HTTP server and test in browser:
   ```bash
   python -m http.server 8000
   # Open http://localhost:8000/desktop/index.html
   # or http://localhost:8000/mobile2D/index.html
   ```

## Code Standards

- Follow existing code style in each file (indentation, naming, patterns)
- Keep changes scoped to the specific platform or feature being modified
- CSS should be responsive and work on mobile viewports
- JavaScript should use `requestAnimationFrame` for smooth animations
- No external dependencies unless absolutely necessary; prefer CDN for common libraries
- Desktop uses ES modules with Three.js; mobile uses similar modular structure

## Testing & Verification

- Always open modified pages in browser to verify visual output
- Check browser console (F12) for errors or warnings
- Test at multiple viewport widths (mobile, tablet, desktop)
- Ensure performance is smooth (60fps target for animations)
- Verify no regression in other platform versions

## Project Structure

```
/ (project root)
├── index.html              # Landing/entry page
├── README.md              # Project documentation
├── *.md                   # Agent instruction files
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
├── mobile/                # Mobile Version (legacy)
├── mobile2D/              # Mobile 2D Version
├── mobile3D/              # Mobile 3D Version
```

## Platform Notes

- **desktop/**: Three.js-based 3D globe, orbital map, HUD sidebars, investigation board modal
- **mobile2D/**: 2D tilemap scene, tabbed inventory (Scene/People/Lab/Codex/Case File)
- **mobile3D/**: 3D scene with touch controls, same tabbed UI as mobile2D
- Shared `js/ui/AccuseUI.js` renders the Case File panel (prophecy checklist + conclude button)

## Commit Guidelines

- Make focused, single-purpose changes per commit
- Update README.md if adding a new featured platform or demo
- Test all affected platform pages before considering work complete
