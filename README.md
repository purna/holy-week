# Holy Week

A browser-based educational detective game set during Holy Week in Jerusalem. Investigate mysterious events across **4 Acts** and **16 Cases**, gather evidence, interview witnesses, and connect biblical prophecies to their fulfillments.

> **Four Acts. Sixteen Cases. One truth.**

---

## Game Versions

| Version | Description |
|---------|-------------|
| [`/desktop/`](desktop/) | Full 3D desktop experience with globe map, HUD panels, and keyboard/mouse controls |
| [`/mobile/`](mobile/) | Mobile-first interface with touch controls and streamlined panels |
| [`/mobile2D/`](mobile2D/) | 2D mobile variant |
| [`/mobile3D/`](mobile3D/) | 3D mobile variant with deduction engine |

---

## Core Gameplay

**Explore** scenes in Jerusalem → **Interview** NPCs → **Collect** evidence → **Solve** Lab puzzles → **Link** prophecies in the Codex → **Conclude** the case.

### Investigation Loop

1. **Select a Case** from the Act Map
2. **Explore the Scene** — move through 3D/2D environments to find clues and witnesses
3. **Talk to NPCs** — WhatsApp-style dialogue reveals evidence, testimonies, and prophecy rumors
4. **Collect Evidence** — items, documents, and objects are logged in your Evidence Archive
5. **Analyze in the Lab** — compare, categorize, build timelines, and spot contradictions
6. **Research Prophecies** — match Scripture evidence to Fulfillment evidence in the Codex
7. **Conclude the Case** — close the case file once all prophecies are researched and all evidence collected

### Scoring & Progression

| Track | How It Works |
|-------|-------------|
| **Investigation Score** | Earned per case: evidence (+5), Lab deductions (+15), successful challenges (+10), prophecy links (+10/+20), case closure (+50) |
| **Research Score** | Persistent game-wide track: +20 RP per completed prophecy, +25 RP per hidden chain |
| **Doubt** | Global penalty: failed challenges (+10), incorrect Lab pairings (+5), incorrect prophecy links (+5). Final score reduced by Doubt × 2 |
| **Honor (Reputation)** | Standing with 4 factions (scribes, temple, roman, local). Successful challenges +5, failed challenges -15. Honor 0 or Doubt 99 = Game Over |

### Hidden Detective Chains

Cross-case discovery patterns that unlock bonus Codex entries when related evidence is linked across multiple cases:

- **Psalm 22** — Crucifixion prophecy chain
- **Passover Lamb** — Jesus follows the Exodus 12 sequence
- **Day of Atonement** — Christ as sacrificial lamb and scapegoat
- **New Covenant** — Jeremiah's prophecy inaugurated
- **Resurrection** — Death defeated, Jonah's sign fulfilled

---

## Technical Stack

- **Three.js** — 3D rendering and scene management
- **Cannon-es** — Physics simulation
- **Ink** — Narrative scripting for NPC dialogue
- **Howler.js** — Spatialized audio engine
- **Fireworks.js** — Celebration effects

---

## Running Locally

No build system required — this is a collection of standalone HTML/CSS/JS pages.

```bash
# Serve the project root with any static server
python -m http.server 8000
# Then open http://localhost:8000/
```

Or open `index.html` directly in a modern browser.

---

## Documentation

- [`__docs/Holy_Week.md`](__docs/Holy_Week.md) — Concise game and design overview
- [`js/act1_case.js`](js/act1_case.js)–[`js/act4_case.js`](js/act4_case.js) — Canonical runtime case data
- [`__docs/holy_week_chronology.md`](__docs/holy_week_chronology.md) — Biblical and historical chronology
- [`__docs/LAB_SYSTEM.md`](__docs/LAB_SYSTEM.md) — Lab mechanics, UI, difficulty, and state
- [`__docs/GENERATED_PROPHECY_REFERENCE.md`](__docs/GENERATED_PROPHECY_REFERENCE.md) — Generated combined prophecy, typology, and evidence reference
- [`__docs/ScoringSystem.md`](__docs/ScoringSystem.md) — Comprehensive scoring, doubt, and reputation mechanics
- [`__docs/CONFIG.md`](__docs/CONFIG.md) — System architecture and configuration
- [`__docs/DOCUMENTATION_RETIREMENT.md`](__docs/DOCUMENTATION_RETIREMENT.md) — Documentation removal and archival list

---

## Support

If you enjoy this project, consider supporting its development:

<a href="https://www.patreon.com/c/pixelagent" target="_blank">☕ Buy me a coffee on Patreon</a>

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
