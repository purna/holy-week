# Example 01 → 02: Feature Comparison & Porting Guide

## Executive Summary

**Example 01** is the narrative foundation — a 2D tabbed interface with deep Ink-driven dialogue, rich NPC psychology, and comprehensive accusation/analysis systems.

**Example 02** is the visual evolution — a 3D spatial environment with proximity-based interaction, day/night cycles, and modular architecture. However, it has **regressed** in several gameplay systems.

**Critical Finding:** 02 is NOT missing evidence items. Both versions share identical `evidencePool` data in their case files (consolidated in `/js/act1_case.js`, etc.). The regression is in **how** evidence is unlocked, how dialogues work, and how the accusation/challenge systems function.

---

## Feature Comparison Matrix

| Feature | 01 Status | 02 Status | Gap |
|---|---|---|---|
| **Dialogue Depth** | ✅ Full Ink narratives (37 stories, 5-10 branches each) | ❌ Severely truncated (1-2 branches, JSON only) | **CRITICAL** |
| **Evidence Unlocks from Dialogue** | ✅ `unlocksEvidence` array triggers on talk | ❌ Not implemented | **CRITICAL** |
| **Evidence Revealed Clues** | ✅ `reactions[].revealedClue` | ⚠️ Code exists but data missing | **HIGH** |
| **NPC Contradictions** | ✅ Full `contradictions{}` per NPC | ❌ Not in case data | **HIGH** |
| **Challenge Responses** | ✅ Case-specific exposed text | ❌ Generic fallback only | **HIGH** |
| **Pressure/Mood Sync** | ✅ Single source of truth (`npcStates`) | ❌ Dual state (broken sync) | **MEDIUM** |
| **Accusation Scoring** | ✅ Full breakdown (evidence/deduction/accusation) | ❌ Simple correct/wrong | **MEDIUM** |
| **Rank Progression** | ✅ Rookie → Master Detective | ❌ Not displayed | **MEDIUM** |
| **Truth Reveal** | ✅ Motive, method, lesson on wrong answer | ❌ Only culprit name | **MEDIUM** |
| **Evidence Detail Modal** | ✅ Bible refs, prophecy, investigator notes | ⚠️ Simplified popup only | **MEDIUM** |
| **Ink Story Loading** | ✅ All 37 stories preloaded | ❌ Stories not loaded/used | **HIGH** |
| **Quest Progression** | ✅ Tracked via dialogue unlocks | ⚠️ Manual `advanceQuest(1)` | **LOW** |
| **3D World Movement** | ❌ N/A | ✅ WASD + Jump | 02 only |
| **Proximity Interaction** | ❌ N/A | ✅ Walk to NPC/evidence | 02 only |
| **Day/Night Cycle** | ❌ N/A | ✅ Dynamic lighting | 02 only |
| **Bible Translation** | ❌ Static WEB only | ✅ Multi-translation | 02 only |
| **3D Case Map** | ❌ N/A | ✅ Orbital rotating core | 02 only |
| **Modular CSS** | ❌ Single styles.css | ✅ 4-file architecture | 02 only |
| **Minimap/Radar** | ❌ N/A | ✅ 2D radar blips | 02 only |

---

## System-by-System Porting Requirements

### 1. DIALOGUE SYSTEM — RESTORE FULL INK NARRATIVES

**Current State in 02:**
- `story/*.json` files contain only 1-2 nodes
- Example `peter_defense.json` is a single Ink-compiled blob with 2 choices both going to "closing"
- `DialogueManager` exists but isn't actively used in the game loop
- No `hasDialogue` or `storyFile` fields in 02's NPC definitions

**What 01 Has:**
- 37 full branching Ink stories
- Each story has 5-15 nodes with meaningful choices
- Choices unlock evidence, reveal clues, change NPC mood
- `generate_ink.py` / `generate_json2.py` generate the JSON from `.ink` source

**Port Actions Required:**
1. **Add `hasDialogue` and `storyFile` to all NPCs in 02's act files**
   ```javascript
   // In act1-4_case_improved.js, each NPC needs:
   hasDialogue: true,
   storyFile: "./story/peter_defense.json",
   ```
2. **Port full story JSON files from 01's `story/` to 02's `story/`**
   - Copy all `.json` files (not the truncated ones)
   - Or re-run `generate_json2.py` from 01
3. **Enable DialogueManager in 02's index.html game loop**
   ```javascript
   const dm = new DialogueManager();
   dm.setInkLib(window.inkjs);
   // Preload all stories on case start
   ```
4. **Update `startDialogue()` to use Ink when available**
   ```javascript
   if (this.dm && npcConfig.hasDialogue && npcConfig.storyFile) {
     const story = this.dm.createStory(npcConfig.id);
     if (story) {
       this.dm.openDialogue(npcConfig, story, onComplete);
       return;
     }
   }
   // Fallback to simple dialogue
   ```

**Priority: CRITICAL** — This is the biggest gameplay regression.

---

### 2. EVIDENCE UNLOCKS FROM DIALOGUE

**Current State in 02:**
- Evidence is only unlocked by walking near spawned spheres
- `advanceQuest(1)` is called on collection, not on dialogue
- No `unlocksEvidence` field in NPC definitions

**What 01 Has:**
```javascript
// In NPC definition
unlocksEvidence: ["cloaks", "rope_fibers"]

// In ChatUI.bindNPCEvents (talk handler)
if (npc.unlocksEvidence && npc.unlocksEvidence.length > 0) {
  npc.unlocksEvidence.forEach(id => {
    const unlocked = this.es.discover(id);
    if (unlocked) {
      this.addSystem(`🔓 New clue: ${unlocked.name}`, npcId);
    }
  });
}
```

**Port Actions Required:**
1. **Add `unlocksEvidence` array to all NPCs in the `/js/` act files**
2. **In `_playerChoosesDialogue()` or `_closeDialogue()`, trigger unlocks:**
   ```javascript
   if (npcConfig.unlocksEvidence) {
     npcConfig.unlocksEvidence.forEach(id => {
       const ev = this.es.unlock(id);
       if (ev) {
         this._addMsg(`🔓 EVIDENCE REVEALED: ${ev.icon} ${ev.name}`, 'evidence-unlock');
         this._unlockEvidence(id); // Spawn 3D sphere too
       }
     });
   }
   ```
3. **Update quest progress to count unlocked (not just collected) evidence**

**Priority: CRITICAL** — Without this, 02's dialogue doesn't advance the investigation.

---

### 3. EVIDENCE REVEALED CLUES FROM REACTIONS

**Current State in 02:**
- `npc.reactions` may have `revealedClue` in data but nothing triggers it
- `_playerShowsEvidence()` doesn't call `es.unlock()` for revealed clues

**What 01 Has:**
```javascript
// In showEvidence handler
const result = this.npcs.showEvidence(npcId, evId);
if (result && result.revealedClue) {
  this.es.discover(result.revealedClue);
  this.addSystem(`New evidence found: ${...}`, npcId);
}
```

**Port Actions Required:**
1. **In `_playerShowsEvidence()`, after NPC responds, check for `revealedClue`:**
   ```javascript
   const reaction = npcConfig.reactions?.[evidenceId];
   if (reaction?.revealedClue && !this.es.isCollected(reaction.revealedClue)) {
     const revealed = this.es.unlock(reaction.revealedClue);
     if (revealed) {
       this._addMsg(`🔍 Evidence revealed: ${reveved.icon} ${revealed.name}`, 'evidence-unlock');
       this._unlockEvidence(reaction.revealedClue);
     }
   }
   ```

**Priority: HIGH** — This is core to the investigation loop.

---

### 4. NPC CONTRADICTIONS DATA

**Current State in 02:**
- `npcSystem.challenge()` exists but case files lack `contradictions` data
- Falls back to generic "You can't prove anything"
- No case-specific breakthrough text

**What 01 Has:**
```javascript
// In NPC definition
contradictions: {
  "rope_fibers+donkey_tracks": {
    exposed: "The tracks go toward Jerusalem, but the rope was cut at the post — you couldn't have both!",
    isKey: true
  }
}

// In case file deductions (for Lab analysis)
deductions: {
  "rope_fibers+donkey_tracks": {
    contradict: {
      text: "The clean cut rope and the hoofprints tell different stories...",
      insight: "Someone is lying about the timeline",
      isKey: true
    }
  }
}
```

**Port Actions Required:**
1. **Add full `contradictions{}` objects to all NPCs in `/js/act1_case.js`, etc.**
2. **Add full `deductions{}` objects to all cases in the `/js/` act files**
3. **Verify `npcSystem.challenge()` reads contradictions correctly** (already implemented, just needs data)

**Priority: HIGH** — Without contradictions, the Challenge system is meaningless.

---

### 5. PRESSURE/MOOD STATE SYNC

**Current State in 02:**
- Challenge updates: `this.nearestNPC.userData.npcState.pressureLevel += 40`
- NPC system reads: `this.npcStates[npcId].pressureLevel`
- These are **two different objects** — updates don't propagate!

**What 01 Has:**
```javascript
// Single source of truth
this.npcStates[npcId] = { mood, pressureLevel, contradictions, memory }

// Update mood based on pressure
_updateMood(npcId, state) {
  if (state.pressureLevel >= 80) state.mood = "exposed";
  else if (state.pressureLevel >= 50) state.mood = "pressured";
  else if (state.pressureLevel >= 25) state.mood = "cautious";
}
```

**Port Actions Required:**
1. **In 02's `_playerChallengedNPC()` and `_playerShowsEvidence()`, update via `npcSystem`:**
   ```javascript
   // Instead of: this.nearestNPC.userData.npcState.pressureLevel += 40
   // Do: this.ns.updatePressure(npcConfig.id, 40)
   ```
2. **Add `updatePressure()` method to NPCSystem:**
   ```javascript
   updatePressure(npcId, amount) {
     const state = this.npcStates[npcId];
     if (!state) return;
     state.pressureLevel = Math.min(100, state.pressureLevel + amount);
     this._updateMood(npcId, state);
   }
   ```
3. **Add `getMood(npcId)` method to NPCSystem for UI queries**

**Priority: MEDIUM** — Currently broken but gameplay can continue.

---

### 6. ACCUSATION SCORING & RANKS

**Current State in 02:**
```javascript
endInvestigation(correct, accusedName) {
  const message = correct
    ? `Correct! ${accusedName} was guilty.`
    : `${accusedName} was innocent. The real culprit was ${caseData.truth.culprit}.`;
  // No score, no rank, no breakdown
}
```

**What 01 Has:**
- Full scoring: deduction + evidence + accusation = total
- Rank calculation: Rookie → Investigator → Analyst → Master Detective
- Persistent total score across all cases
- Detailed result screen with score grid

**Port Actions Required:**
1. **Port `submitAccusation()` scoring logic to 02's `endInvestigation()`:**
   ```javascript
   const p = this.cm.getCaseProgress(this.activeCaseId);
   const c = this.cm.cases[this.activeCaseId];
   const totalEvidence = c.evidencePool.length;
   const foundEvidence = this.es.getCollected().length;
   const deductionScore = Math.min(p.deductionsMade.length * 10, 40);
   const evidenceScore = Math.round((foundEvidence / totalEvidence) * 40);
   const accusationScore = correct ? 20 : 0;
   const total = deductionScore + evidenceScore + accusationScore;
   ```
2. **Display score in accusation modal**
3. **Update rank in HUD**
4. **Add truth reveal (motive, method, lesson) on wrong answer**

**Priority: MEDIUM** — Important for player feedback and progression feel.

---

### 7. EVIDENCE DETAIL MODAL

**Current State in 02:**
- Simple popup card: title + description only
- No bible refs, prophecy links, investigator notes

**What 01 Has:**
- Full modal with: icon, name, type, description, location
- Bible reference section with inline fetch
- Prophecy & Fulfillment section
- Investigator Notes
- "Read Full Verse" buttons

**Port Actions Required:**
1. **Enhance `showEvidencePopup()` to include all fields:**
   ```javascript
   showEvidencePopup(evidence) {
     const typeInfo = this.es.getTypeInfo(evidence.type);
     // Build full detail HTML like 01's openEvidenceDetail()
   }
   ```
2. **Add BibleReader integration for evidence bibleRef and prophecyLink**
3. **Add "Read Full Verse" buttons**

**Priority: MEDIUM** — Nice to have for educational value.

---

### 8. QUEST PROGRESSION FROM DIALOGUE

**Current State in 02:**
- Quest only advances when evidence is physically collected (`collectEvidence()`)
- Talking to NPCs doesn't contribute to quest progress

**What 01 Has:**
- Quest tracked in case data (`quest: { cur, tar }`)
- Evidence discovery increments quest
- NPC dialogue completion can also contribute

**Port Actions Required:**
1. **In `_playerChoosesDialogue()` completion, call `advanceQuest(0.5)` or similar**
2. **In `_playerShowsEvidence()` if breakthrough, `advanceQuest(1)`**
3. **Ensure quest `tar` value accounts for both dialogue and collection milestones**

**Priority: LOW** — Current system works but feels sparse.

---

## Detailed Port Checklist

### Files to Modify in example_02

| File | Changes Needed |
|---|---|
| `js/act1_case.js` | Add `hasDialogue`, `storyFile`, `unlocksEvidence` to all NPCs; add full `contradictions`; add full `deductions` |
| `js/act2_case.js` | Same as above |
| `js/act3_case.js` | Same as above |
| `js/act4_case.js` | Same as above |
| `index.html` | Enable DialogueManager preloading; add score/rank display in accusation; enhance evidence popup |
| `npcSystem.js` | Add `updatePressure()`, `getMood()`, `getState()` enhancements |
| `evidenceSystem.js` | Verify `unlock()` properly syncs with 3D spawning |
| `chatUI.js` | Add per-NPC message history; add `onAction` callback pattern |
| `BibleReader2.js` | Expose more methods for evidence integration |

### Files to Copy from example_01

| File/Directory | Destination |
|---|---|
| `story/*.json` (full versions) | `example_02/story/` (replace truncated ones) |
| `story/*.ink` | `example_02/story/` (for regeneration) |
| `generate_json2.py` | `example_02/story/` |
| `dialogueManager.js` | Already present, needs wiring |
| `ink-dialogue.js` | Already present in `plugins/` |

---

## Implementation Order (Recommended)

### Phase 1: Core Gameplay Restoration
1. Port `contradictions` data to all NPCs in all act files
2. Port `deductions` data to all cases
3. Add `hasDialogue` / `storyFile` / `unlocksEvidence` to all NPCs
4. Copy full story JSON files from 01 to 02
5. Wire up DialogueManager preloading
6. Fix pressure/mood sync

### Phase 2: Loop Completion
7. Implement evidence unlock triggers from dialogue
8. Implement revealedClue triggers from showing evidence
9. Add full accusation scoring and rank display
10. Add truth reveal on wrong accusation

### Phase 3: Polish
11. Enhance evidence detail modal
12. Improve quest progression from dialogue
13. Add contradiction suggestions in Lab
14. Unify BibleReader with evidence modals

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Ink stories too large for JSON | Medium | High | Use lazy loading, load on NPC proximity |
| 3D + Ink overlay performance | Low | Medium | Test on target devices, add loading states |
| State sync bugs (02's dual state) | High | High | Phase 1 fix before other work |
| Evidence unlock race conditions | Medium | Medium | Centralize through `evidenceSystem.unlock()` |
| Case data merge conflicts | High | High | Use 01's act files as source of truth, diff carefully |

---

## Testing Checklist

After porting, verify:
- [ ] All 37 Ink stories load without errors
- [ ] Talking to NPC advances quest progress
- [ ] NPC dialogue reveals new evidence items
- [ ] Evidence items appear as 3D spheres after unlock
- [ ] Walking near sphere collects it
- [ ] Showing evidence to NPC triggers `revealedClue`
- [ ] Challenging with correct pair gives case-specific response
- [ ] Challenging with wrong pair gives generic response
- [ ] NPC mood changes (neutral → cautious → pressured → exposed)
- [ ] Pressure bar updates correctly in UI
- [ ] Accusation shows score breakdown
- [ ] Wrong accusation shows truth (motive, method, lesson)
- [ ] Rank updates after correct accusation
- [ ] Bible verses fetch correctly in evidence modal
- [ ] Game complete modal shows final score
