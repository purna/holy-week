# Example 01 — Detailed System Review

## Overview

**Location:** `tests/example_01/`
**Architecture:** Single-page tabbed 2D interface (no build system)
**Core Files:**
- `index.html` — Main UI shell with tabs: Map → Cases → Investigation (Scene / People / Lab / Accuse)
- `styles.css` — All styling (single file)
- `caseManager.js` — Case registry, progress, scoring
- `evidenceSystem.js` — Evidence types, collection, selection
- `npcSystem.js` — NPC state machines, dialogue, contradiction tracking
- `deductionEngine.js` — Evidence analysis operations
- `chatUI.js` — NPC conversation panel rendering
- `labUI.js` — Analysis lab interface
- `locationSystem.js` — World map, location cards
- `accessibility.js` — TTS, high contrast, simple language
- `audioManager.js` — Sound effects / ambience
- `dialogueManager.js` — Ink narrative engine wrapper
- `ink-dialogue.js` — Ink.js library
- `act1-4_case_improved.js` — Case data definitions
- `story/` — 37 `.json` Ink story files + `.ink` source files
- `generate_json.py` / `generate_json2.py` — Ink-to-JSON converters
- `biblical_verse_reference_guide.md` — Static scripture reference list

---

## System 1: Dialogue System

### How It Works
The dialogue system has **two layers**:

**Layer A — Tabbed NPC Panel (2D UI)**
- Player clicks "People" tab to see NPC list
- Each NPC card shows avatar, name, role, mood indicator, pressure bar
- Three action buttons per NPC: **Talk**, **Show Evidence**, **Challenge**
- "Talk" triggers either:
  - An Ink narrative dialogue (if `npc.hasDialogue && npc.storyFile`), OR
  - A simple one-line `npc.dialogue[npc.mood]` response
- Conversation feed appears in the NPC card itself (scrollable log)

**Layer B — Ink Narrative Engine**
- 37 story files in `story/` directory (both `.json` and `.ink` formats)
- Each NPC with `hasDialogue: true` has a branching narrative
- The `DialogueManager` loads Ink stories asynchronously on case start
- Stories have branching choices that reveal evidence via `unlocksEvidence`
- Player choices affect NPC mood state (pressured → exposed)

### Dialogue Flow
```
Player clicks "Talk" on NPC
  → ChatUI checks if NPC has Ink dialogue
    → YES: DialogueManager opens Ink story, shows choices
      → Choices may trigger unlocksEvidence (reveals evidence in Scene tab)
    → NO: npcSystem.talk() returns simple mood-based line
  → Message added to NPC's feed
  → Pressure/mood updated if contradictions found
```

### Key Data Structures
```javascript
// Per-NPC in actX_case_improved.js
{
  id: "peter",
  name: "Peter",
  hasDialogue: true,
  storyFile: "./story/peter_defense.json",
  unlocksEvidence: ["cloaks", "rope_fibers"],
  dialogue: {
    neutral: "...",
    cautious: "...",
    pressured: "...",
    exposed: "...",
    repeat: "..."
  },
  reactions: {
    evidenceId: { text: "...", isLie: true/false, revealedClue: "someId" }
  },
  contradictions: {
    "evidenceA+evidenceB": { exposed: "...", isKey: true }
  }
}
```

### Strengths
- Rich branching narratives for 16+ characters
- Evidence unlocks tied to conversation choices
- Memory system prevents repeat dialogue
- TTS integration via accessibility manager
- Per-NPC evidence picker for showing items

### Weaknesses
- No proximity-based interaction (must find NPC in list)
- Ink stories are simple (often only 2-3 branches in JSON)
- No dynamic in-world NPC tags or spatial awareness
- Conversation happens in sidebar, not immersive

---

## System 2: Accuse System

### How It Works
- "Accuse" tab appears in Investigation view
- Shows all suspects as styled buttons (avatar + name + role)
- Player clicks suspect → `cm.submitAccusation(suspectId)`
- CaseManager compares suspect ID to `c.truth.culprit`
- Result displayed in full-screen "result" screen with:
  - Verdict (🏆 Case Solved / ❌ Wrong)
  - Truth summary (motive, method, lesson)
  - Score breakdown (evidence points, deduction points, total)
  - Rank display

### Scoring Formula
```javascript
evidenceScore = collectedItems.length * 5;             // 5 pts per clue
deductionScore = successfulDeductions.length * 15;     // 15 pts per key connection
challengeScore = successfulBreakthroughs.length * 10;  // 10 pts per exposed lie

penaltyFalseAccusation = -25;                          // Flat penalty
doubtPenalty = currentDoubt * 2;                       // Doubt reduces total score

total = (evidenceScore + deductionScore + challengeScore + (correct ? 50 : penaltyFalseAccusation)) - doubtPenalty;
```

**Doubt System:** Failed challenges increment `doubt` by 10. Failed accusations increment `doubt` by 25.

### Ranks
- ≥90: Master Detective
- ≥70: Analyst
- ≥50: Investigator
- <50: Rookie

### Strengths
- Clear risk/reward (correct = bonus points)
- Educational "truth" reveal on wrong answer
- Persistent rank progression across cases
- Score breakdown transparency

### Weaknesses
- Accusation only available after manually opening tab
- No "accuse anywhere" flow — must navigate to specific tab
- No visual accusation scene or dramatic presentation
- No partial credit for narrowing suspects

---

## System 3: Challenge System

### How It Works
- Available in "People" tab for each NPC
- Requires selecting two evidence items in "Lab" tab first
- When Challenge button clicked:
  1. `npcSystem.challenge(npcId, evidenceA, evidenceB)` is called
  2. System looks for case-specific contradiction in `npc.contradictions[key]`
  3. If found: breakthrough! NPC pressure +40, mood updates, exposed text shown
  4. If not found: generic "no contradiction" message, pressure +5
- Results shown in per-NPC `challenge-result` panel within the card
- Breakthroughs show ⚡ badge and increase pressure bar

**Reputation & Doubt Impact:**
- If a Challenge fails, the player's Reputation with that NPC's faction (Temple/Scribes) drops by 15.
- High Doubt (>40) triggers "Hostile Environment" modifiers in the final trial, making NPCs less truthful.

### Key Data
```javascript
contradictions: {
  "rope_fibers+wnot_tracks": {
    exposed: "You cut the rope yourself — not the owner!",
    isKey: true
  }
}
```

### Strengths
- Clear "select two → challenge → reveal" loop
- Pressure system creates escalating tension
- Key deductions marked with `isKey: true` for extra points
- Breakthrough visual feedback (badge, sound effect)

### Weaknesses
- Must switch between Lab and People tabs (context switching)
- No guidance on which evidence pairs to challenge
- Challenge results are buried in NPC card, not prominent
- No "suggest contradictions" hint system

---

## System 4: Evidence Collection System

### How It Works
- **Scene tab** shows all evidence as cards in a grid
- Evidence starts "locked" (greyed out, non-interactive)
- Evidence unlocks when:
  1. Player talks to NPC and NPC `unlocksEvidence` array fires
  2. Player shows evidence to NPC and `revealedClue` triggers
- Once unlocked, card becomes clickable
- Clicking opens `evidence-detail-modal` with:
  - Icon, name, type badge
  - Description
  - Location found
  - Bible reference (with inline fetch from bible-api.com)
  - Prophecy & Fulfillment section
  - Investigator notes
- "Read Full Verse" buttons fetch WEB translation inline

### Evidence Types
```javascript
PHYSICAL:      { icon: "🧤", color: "#f59e0b" }
TESTIMONIAL:   { icon: "💬", color: "#60a5fa" }
DIGITAL:       { icon: "💻", color: "#34d399" }
ENVIRONMENTAL: { icon: "🌿", color: "#a78bfa" }
ANALYTICAL:    { icon: "🔬", color: "#f472b6" }
```

### Strengths
- Biblical verse integration with live API fetch
- Detailed investigator notes for each item
- Type-based color coding and icons
- Progress counter ("Clues found: X / Y")
- Prophecy linkage in detail modal

### Weaknesses
- Evidence is static — just appears in grid after unlock
- No spatial placement or world interaction
- No "collect by walking to it" mechanic
- Locked evidence shows "Talk to witnesses to unlock" but no hint which witness

---

## System 5: Analysis System (Lab)

### How It Works
- "Lab" tab shows selected evidence + analysis buttons
- Player selects evidence from their collection (checkboxes/toggle)
- Two evidence items must be selected to enable operations
- Four operations: Compare, Link, Timeline, Contradict
- Each operation checks for case-specific deduction in `c.deductions[key][op]`
- Case-specific results score 15 (key) or 8 points
- Generic fallback templates score 4 points
- Deduction history displayed below with key deduction highlighting

### LabUI Features
- Tap-to-select evidence pairing (A + B visual indicators)
- Disabled state when < 2 selected
- Operation buttons with icons and descriptions
- Deduction history list
- Key deduction badges

### Strengths
- Clean operation selection UI
- Case-specific insights with high scores
- Generic fallback for unscripted pairs
- History of all deductions made

### Weaknesses
- No visual connection between evidence items (no diagram)
- Generic deductions are repetitive templates
- No "suggest best pairing" guidance
- No synergy with Challenge system (separate UIs)

---

## System 6: NPC System

### How It Works
- NPCs defined in `actX_case_improved.js` with full data objects
- Each NPC has:
  - `id`, `name`, `role`, `avatar`, `color`, `pos` (3D coords for future use)
  - `truthfulness` (0.0–1.0, though currently only used for lie flag)
  - `hasDialogue`, `storyFile`
  - `unlocksEvidence`, `background`
  - `dialogue` object (5 mood states)
  - `reactions` (evidence-specific responses)
  - `contradictions` (evidence pair → exposed text)

### State Tracking
```javascript
npcStates[npcId] = {
  mood: "neutral",           // neutral → cautious → pressured → exposed
  pressureLevel: 0,          // 0–100
  contradictions: [],        // keys of contradictions found
  memory: []                 // evidence IDs shown
}
```

### Mood Progression
- 0–24: neutral
- 25–49: cautious
- 50–79: pressured
- 80+: exposed

### Strengths
- Rich per-NPC data (reactions, contradictions, unlocks)
- Pressure system creates interrogation feel
- Memory prevents showing same evidence twice
- Lie detection via `isLie` flag
- Color-coded mood indicators

### Weaknesses
- No spatial awareness (NPCs don't exist in world, only in list)
- `truthfulness` field defined but not actively used in logic
- No patrol behavior or world presence
- NPCs are all always available (no gating)

---

## System 7: Story / Case System

### Case Structure
Each case (`actX_case_improved.js`) exports objects with:
- `id`, `title`, `subtitle`, `location`, `difficulty`, `requires` (prereq)
- `actLabel`, `color`, `quest` (name, task, cur, tar)
- `biblicalContext` (summary, significance, historicalNote)
- `prophecies` (reference, text, written date, fulfilledBy, insight)
- `intro` (narrative setup text)
- `suspects` (id, name, role, avatar, bibleRef)
- `evidencePool` (7+ items per case with full metadata)
- `npcs` (6+ characters per case)
- `truth` (culprit, motive, method, lesson)
- `deductions` (key insight pairs)

### Case Flow
```
Map → Location → Cases List → Start Case
  → Investigation (Scene / People / Lab / Accuse)
    → Collect all evidence
    → Interview all NPCs
    → Make deductions in Lab
    → Challenge NPCs with contradictions
    → Accuse suspect
      → Result screen → Back to Map
```

### Available Cases
| ID | Title | Act | Location | Difficulty |
|---|---|---|---|---|
| triumphal_entry | The Missing Donkey | I | Jerusalem | 1 |
| authority_challenge | The Authority Challenge | I | Jerusalem | 2 |
| clement_reward | The Widow's Offering | II | Temple | 2 |
| bethany_lazarus | The Lazarus Conspiracy | II | Bethany | 3 |

---

## System 8: Ink Story Format

### File Structure
Both `.ink` (source) and `.json` (compiled) formats exist in `story/`

### JSON Format (what the game loads)
```json
{
  "start": {
    "content": "NPC opening line.",
    "choices": [
      { "text": "Player option", "destination": "node_name" }
    ]
  },
  "node_name": {
    "content": "NPC response.",
    "choices": [...]
  }
}
```

### Available Stories (37 files)
anna_patriarch, barabbas_insurgent, board_debate, board_review, caiaphas_priest, execution_soldier, galilean_pilgrim, guard_report, informant_bribe, jerusalem_local, john_disciple, joseph_arimathea, judas_iscariot, market_rumors, martha_bethany, mary_magdalene, money_changer, parable_meaning, parable_vineyard, peter_defense, peter_defense_simple, peter_denial, pharisseecritique, pilates_secretary, pontius_pilate, priest_objection, roman_assessment, rumor_whisper, scribe_intro, secret_visit, simon_cyrene, teaching_mount, temple_spy, trial_rumors, upper_room_prep, witness_healed

---

## Suggested Improvements for Example 01

### High Priority
1. **Spatial Evidence Collection:** Replace static grid with proximity-based collection. Add `pos` field to evidence and let player "walk" to collect.
2. **Proximity NPC Interaction:** Add in-world NPC presence. Player approaches NPC → interaction prompt appears → opens chat.
3. **Unified Challenge Flow:** Merge Lab "select two" and People "Challenge" into a single coherent flow. Currently requires tab switching.
4. **Evidence Hint System:** When evidence is locked, indicate which NPC unlocks it (add `unlockedBy` display on card).
5. **Deeper Ink Stories:** Expand JSON stories beyond 2-3 choices. Add more branches that reveal multiple clues.

### Medium Priority
6. **Visual Evidence Board:** Create a drag-and-drop board where players can arrange evidence cards and draw connections.
7. **Contradiction Suggestions:** When player selects two evidence in Lab, highlight if a known contradiction exists for any NPC.
8. **Accuse Anywhere:** Allow accusation from any tab, not just the dedicated Accuse tab.
9. **NPC Patrol/Wander:** Give NPCs basic movement patterns in a 2D scene view.
10. **Better Ink Generator:** Update `generate_ink.py` to produce more varied, longer stories with multiple clue reveals.

### Low Priority
11. **Voice Profiles:** Add `tone` field to NPCs (arrogant, fearful, scientific) for varied dialogue generation.
12. **Evidence Combination Visuals:** Show visual "link" between paired evidence in Lab.
13. **Dynamic Weather/Time:** Add environmental changes that affect visibility of evidence.
