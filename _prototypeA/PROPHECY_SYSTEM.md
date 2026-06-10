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
