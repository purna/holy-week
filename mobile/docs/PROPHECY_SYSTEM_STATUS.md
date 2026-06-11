# Prophecy Collection System - Implementation Status

## ✅ Completed Implementation

### Core System Files
| File | Changes | Status |
|------|---------|--------|
| `evidenceSystem.js` | Added `PROPHECY` type, `getProphecyPool()`, `getPropheciesWithStatus()` | ✅ Complete |
| `caseManager.js` | Added `propheciesFound[]` tracking, `recordProphecyFound()` method, prophecy scoring (10 pts) | ✅ Complete |
| `npcSystem.js` | Added prophecy triggers in `showEvidence()` and `challenge()` methods | ✅ Complete |
| `UIManager.js` | Added `renderCodex()` and `showProphecyDetail()` methods | ✅ Complete |
| `index.html` | Added codex.css link, codex tab panel | ✅ Complete |
| `css/codex.css` | Created styling for prophecy cards | ✅ Complete |

### Case Files - Prophecy Metadata
All case files have prophecy entries with `id` and `icon` fields added:

| Case File | Prophecy Count | Status |
|-----------|---------------|--------|
| `act1_case.js` | 6 (actually 4 in prophecies array) | ✅ IDs added |
| `act2_case.js` | 2 cases with prophecies | ✅ IDs added |
| `act3_case.js` | 4 cases with prophecies | ✅ IDs added |
| `act4_case.js` | 3 cases with prophecies | ✅ IDs added |

## ⏳ Remaining Changes

### 1. Chat UI Prophecy Announcement (chatUI.js)

**Add prophecy badge in `_renderMsg()` (line ~58):**
```javascript
${m.extra?.revealedProphecy ? `<span class="prophecy-badge" aria-label="Prophecy discovered">🔮 Prophecy unlocked</span>` : ""}
```

**Add prophecy system message in confirm-show-btn handler (after line ~258):**
```javascript
if (result.revealedProphecy) {
  this.addSystem(`📜 Prophecy unlocked: ${result.revealedProphecy}`, npcId);
}
```

**Pass prophecy in challenge result (line ~307):**
```javascript
{ breakthrough: result.breakthrough, revealedProphecy: result.revealedProphecy || null }
```

### 2. CSS Prophecy Badge Style
Add to `css/codex.css` or `css/npc-chat.css`:
```css
.prophecy-badge {
  display: inline-block;
  padding: 2px 8px;
  background: var(--gold);
  color: var(--bg);
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}
```

### 3. NPC Reactions with Prophecy Triggers
Add `revealsProphecy` to NPC reactions in case files:

**act1_case.js examples:**
- Peter reactions → reveal `zechariah_9_9`
- Owner reactions → reveal `genesis_49_10_11`

**act4_case.js examples:**
- Mary Magdalene → reveal `psalm_16_10`
- Marcus → reveal `hosea_6_2`
- Joseph → reveal `isaiah_53_10_11`

## 🎮 How to Test

1. Run: `python -m http.server 8000`
2. Open: `http://localhost:8000/index.html`
3. Start any case
4. Click the "🔮 Codex" tab
5. Show evidence to NPCs - prophecies should unlock and appear in the Codex

## 📝 Missing Character Files (Pre-existing Issue)

These files are missing but unrelated to prophecy system:
- `characters/pontius_pilate.json`
- `characters/upper_room_prep.json`
- `characters/secret_visit.json`
- `characters/simon_cyrene.json`

Create simple JSON files with basic profile data or remove from PROFILE_ID_MAP.
