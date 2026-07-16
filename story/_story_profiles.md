# Prophecy Collection System

## Overview

The prophecy collection system allows players to discover and track biblical prophecies that are fulfilled throughout their investigation. Prophecies work similarly to evidence but are categorized separately and displayed in a dedicated Codex tab.

## Architecture

### Evidence Type Addition
- PROPHECY is added to EVIDENCE_TYPES in evidenceSystem.js
- Prophecies have id, type, icon, location, desc fields
- Evidence can reference related prophecies via `relatedProphecy` field
- NPC reactions can reveal prophecies via `revealsProphecy` field

### Case Manager Tracking
- `propheciesFound` array tracks discovered prophecy IDs per case
- `recordProphecyFound(prophecyId)` method records discoveries
- Progress saved to localStorage under `cases[id].propheciesFound`

### NPC System Integration
- `showEvidence()` checks for `revealsProphecy` in reactions
- `challenge()` checks for `revealsProphecy` in contradictions
- Prophecies unlocked through investigation and deduction

### UI Changes
- Accuse tab renamed to "Codex"
- Codex shows discovered prophecies grouped by case
- Prophecy detail view shows full reference, text, and fulfillment info
- Completion percentage shown for each case's prophecy collection

## Implementation Pattern

Prophecies follow the same discovery pattern as evidence:
1. Player shows evidence to NPC
2. NPC reaction may include `revealsProphecy: "prophecy_id"`
3. System marks prophecy as discovered
4. Prophecy appears in Codex tab

## Prophecy Data Structure

```javascript
{
  id: "zechariah_9_9",
  reference: "Zechariah 9:9",
  text: "Rejoice greatly, O daughter of Zion!...",
  written: "~520 BC",
  fulfilledBy: "Jesus riding a donkey colt into Jerusalem",
  gospelLink: "Matthew 21:4-5; John 12:14-15",
  insight: "The donkey was not a practical choice...",
  icon: "🔮",
  location: "Bethphage, Mount of Olives",
  type: "PROPHECY"
}
```

---

# 🔍 Cross-Reference: Story Files vs. `js/act*_case.js`

Generated audit of dialogue story files (`story/extras/*.ink` + `story/system/*.ink`) against `storyFile` references in `js/act1_case.js`, `js/act2_case.js`, `js/act3_case.js`, and `js/act4_case.js`.

* **Story files present:** 79
* **Distinct `storyFile` references used:** 62
* **Story files NOT referenced by any act case (unused):** 18
* **`storyFile` references with NO matching file (orphans / broken links):** 1 — `chief_priest`

## ⚠️ Broken Reference (fixed)
* `js/act2_case.js` referenced `storyFile: "chief_priest"` (NPC id `chief_priest` = Caiaphas), but no `chief_priest.ink`/`.json` exists. The correct file is `caiaphas_priest`. **Corrected** in `js/act2_case.js:213` to `storyFile: "caiaphas_priest"` (act3 already used the correct name).

## Unused Story Files (present in `/story/` but not referenced in `act*_case.js`)

| Story File | Identity | Notes |
|---|---|---|
| `board_debate` | Board Debate (Senior Scribe) | System overlay / case-review interface |
| `board_review` | Board Review (Senior Scribe) | System overlay / case-review interface |
| `centurion_witness` | Centurion Longinus Witness | Crucifixion spear-thrust account |
| `excited_child_donkey` | Excited Child (Donkey) | Triumphal entry flavor |
| `guard_entry` | Guard — Entry | Antonia gate duty |
| `guard_report_crucifixion` | Guard — Crucifixion | Roman watch report variant |
| `guard_report_gethsemane` | Guard — Gethsemane | Arrest watch report variant |
| `guard_report_temple` | Guard — Temple | Cleansing watch report variant |
| `jesus_reinstatement` | Jesus Reinstatement (Peter) | John 21 restoration |
| `peter_reinstated` | Peter Reinstated | John 21 restoration variant |
| `pilate_interrogation` | Pilate Interrogation | Trial dialogue variant |
| `pontius_pilate_barabbas` | Pilate — Barabbas | Barabbas exchange variant |
| `pontius_pilate_temple` | Pilate — Temple | Temple-cleansing variant |
| `priest_objection_crucifixion` | Priest Objection — Crucifixion | Crucifixion variant |
| `priest_objection_temple` | Priest Objection — Temple | Temple variant |
| `rich_young_ruler` | Rich Young Ruler | Extra encounter |
| `roman_council` | Roman Council | Extra encounter |
| `roman_soldier` | Roman Soldier | Extra encounter |

## Notes
* Several unused files are **variant** dialogue trees (`*_crucifixion`, `*_temple`, `*_gethsemane`, `*_barabbas`, `pilate_interrogation`, `priest_objection_*`) that branch the same NPC but are not currently wired into the linear act cases.
* `board_debate` / `board_review` belong to the persistent investigation-board overlay rather than an act case, which is expected.
* The `chief_priest` → `caiaphas_priest` mismatch was the only broken link; it has been resolved.
