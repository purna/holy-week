# LevelManager — Integration Guide for main.js
## What to add, where, and why

---

## 1. Import LevelManager at the top of main.js

```js
import { LevelManager } from './LevelManager.js';
```

Add this with the other imports.

---

## 2. Add a `levelMgr` variable in the global state block

```js
let levelMgr = null;
```

Add alongside `let sceneMgr = null;` etc.

---

## 3. Update the DOM element references

The new chat panel uses `#bub-scroll` and `#bar-choices`.
Replace the old references:

```js
// OLD — remove these two lines:
const elBubbleContainer = document.getElementById('bubble-text-container');
const elBubbleChoices   = document.getElementById('bubble-choices');

// NEW — add these:
const elBubScroll   = document.getElementById('bub-scroll');
const elBarChoices  = document.getElementById('bar-choices');
```

---

## 4. Instantiate LevelManager inside `startGame()` (after all systems are ready)

Find the `startGame()` function (where `sceneMgr`, `worldMgr`, `modelMgr`,
`npcSystem`, `dialogueMgr`, `audio` are all initialised) and add:

```js
// — After all systems are ready —

levelMgr = new LevelManager({
    sceneMgr,
    worldMgr,
    modelMgr,
    npcSystem,
    dialogueMgr,
    audio,
    updateUI,
    onWin: triggerWinSequence,   // reuse existing win function
});

// Wire level events to existing UI
document.addEventListener('level:locationChange', (e) => {
    if (locNameTypewriter) locNameTypewriter.type(e.detail.name);
    elLocBox.classList.add('visible');
});

document.addEventListener('level:questRegistered', (e) => {
    // Push quest into the live quests array (or replace — design choice)
    const q = e.detail.quest;
    const existing = quests.findIndex(x => x.id === q.id);
    if (existing >= 0) {
        quests[existing] = { ...q, completed: false };
    } else {
        quests.push({ ...q, completed: false });
    }
    updateUI();
});

document.addEventListener('level:phaseIntro', (e) => {
    showPhaseIntroCard(e.detail);
});

document.addEventListener('level:evidenceCollected', (e) => {
    showEvidenceToast(e.detail.token);
    updateUI();
});

document.addEventListener('level:phaseComplete', (e) => {
    showPhaseCompleteCard(e.detail);
});

document.addEventListener('level:gameComplete', () => {
    // level 10 fires this after conclusion chosen
    triggerWinSequence();
});

// Start from phase 1
await levelMgr.start();
```

---

## 5. Wire NPC dialogue to evidence collection

In the existing NPC interaction handler (where `dialogueMgr.openDialogue()` is called),
after dialogue closes, check for pending evidence from that NPC:

```js
function openNpcDialogue(npc) {
    const inkStory = dialogueMgr.createStory(npc.id);

    dialogueMgr.openDialogue(npc, inkStory, () => {
        // On close: collect any evidence this NPC unlocks
        if (npc.dialogueEvidence) {
            npc.dialogueEvidence.forEach(id => {
                document.dispatchEvent(
                    new CustomEvent('dialogueEvidence', { detail: { evidenceId: id } })
                );
            });
        }
        isDialogueOpen = false;
        activeNpc = null;
    });
}
```

---

## 6. Wire collectable pickups to evidence collection

In the pickup handler (where inventory items are collected), add after the
inventory push:

```js
// Existing pickup logic...
inventory.push(item.name);

// NEW: if this collectable maps to evidence, dispatch event
if (item.evidenceId) {
    document.dispatchEvent(
        new CustomEvent('evidencePickup', { detail: { evidenceId: item.evidenceId } })
    );
}
```

---

## 7. Add three new UI helper functions

These can live at the bottom of main.js:

```js
/**
 * Full-screen intro card shown at the start of each phase.
 * Fades out after 3 seconds or on click.
 */
function showPhaseIntroCard({ phase, actLabel, title, subtitle, location }) {
    const card = document.createElement('div');
    card.className = 'phase-intro-card';
    card.innerHTML = `
        <div class="phase-intro-inner">
            <p class="act-label">${actLabel ?? ''}</p>
            <h1 class="phase-title">${title}</h1>
            <p class="phase-subtitle">${subtitle ?? ''}</p>
            <p class="phase-location">📍 ${location}</p>
            <small>Click to continue</small>
        </div>`;
    document.body.appendChild(card);
    requestAnimationFrame(() => card.classList.add('visible'));
    const dismiss = () => {
        card.classList.remove('visible');
        setTimeout(() => card.remove(), 600);
    };
    card.addEventListener('click', dismiss);
    setTimeout(dismiss, 4000);
}

/**
 * Brief phase-complete banner.
 */
function showPhaseCompleteCard({ phase, title }) {
    const banner = document.createElement('div');
    banner.className = 'phase-complete-banner';
    banner.textContent = `✓ ${title} — Complete`;
    document.body.appendChild(banner);
    requestAnimationFrame(() => banner.classList.add('visible'));
    setTimeout(() => {
        banner.classList.remove('visible');
        setTimeout(() => banner.remove(), 600);
    }, 2500);
}

/**
 * Small toast shown when evidence is collected.
 */
function showEvidenceToast(token) {
    const toast = document.createElement('div');
    toast.className = 'evidence-toast';
    toast.innerHTML = `
        <span class="evidence-tag">${token.category}</span>
        <strong>${token.label}</strong>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}
```

---

## 8. Add the Investigation Board UI toggle

The board reads from `levelMgr.getEvidenceBoard()`.
Add a button in `index.html` and wire it here:

```js
// In the button setup block:
document.getElementById('btn-board-toggle')?.addEventListener('click', () => {
    openInvestigationBoard(levelMgr.getEvidenceBoard());
});

function openInvestigationBoard(board) {
    let html = '<div id="inv-board"><h2>INVESTIGATION BOARD</h2>';
    for (const [category, tokens] of Object.entries(board)) {
        html += `<div class="board-category"><h3>${category}</h3><ul>`;
        tokens.forEach(t => {
            html += `<li><strong>${t.label}</strong><p>${t.description}</p></li>`;
        });
        html += '</ul></div>';
    }
    html += '<button id="btn-board-close">CLOSE</button></div>';
    const overlay = document.createElement('div');
    overlay.className = 'board-overlay';
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
    document.getElementById('btn-board-close').onclick = () => overlay.remove();
}
```

---

## 9. CSS additions needed (add to styles.css or a new levels.css)

```css
/* Phase intro card */
.phase-intro-card {
    position: fixed; inset: 0; background: rgba(0,0,0,0.92);
    display: flex; align-items: center; justify-content: center;
    z-index: 2000; opacity: 0; transition: opacity 0.6s;
    cursor: pointer;
}
.phase-intro-card.visible { opacity: 1; }
.phase-intro-inner { text-align: center; color: #e9edef; max-width: 600px; padding: 2rem; }
.act-label { color: #64ffda; font-size: .8rem; letter-spacing: 3px; text-transform: uppercase; }
.phase-title { font-size: 2.4rem; margin: 0.5rem 0; }
.phase-subtitle { color: #8696a0; font-size: 1rem; }
.phase-location { color: #64ffda; font-size: .85rem; margin-top: 1rem; }

/* Phase complete banner */
.phase-complete-banner {
    position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%) translateY(20px);
    background: #005c4b; color: #fff; padding: 12px 28px; border-radius: 30px;
    font-size: .9rem; z-index: 1500; opacity: 0; transition: all 0.4s;
}
.phase-complete-banner.visible { opacity: 1; transform: translateX(-50%) translateY(0); }

/* Evidence toast */
.evidence-toast {
    position: fixed; top: 80px; right: 20px;
    background: #111b21; border: 1px solid #00a884;
    color: #e9edef; padding: 12px 18px; border-radius: 10px;
    font-size: .85rem; z-index: 1500; opacity: 0;
    transform: translateX(20px); transition: all 0.4s;
    max-width: 260px;
}
.evidence-toast.visible { opacity: 1; transform: none; }
.evidence-tag {
    display: block; font-size: .65rem; color: #64ffda;
    text-transform: uppercase; letter-spacing: 2px; margin-bottom: 4px;
}

/* Investigation Board overlay */
.board-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.9);
    z-index: 2000; overflow-y: auto; padding: 2rem;
}
#inv-board { max-width: 800px; margin: 0 auto; color: #e9edef; }
#inv-board h2 { color: #64ffda; letter-spacing: 3px; margin-bottom: 2rem; }
.board-category { margin-bottom: 2rem; }
.board-category h3 {
    color: #00a884; font-size: .8rem; text-transform: uppercase;
    letter-spacing: 2px; border-bottom: 1px solid #2a3942; padding-bottom: 6px;
}
.board-category ul { list-style: none; padding: 0; }
.board-category li { padding: 10px 0; border-bottom: 1px solid #1a2a30; }
.board-category li strong { display: block; margin-bottom: 4px; }
.board-category li p { color: #8696a0; font-size: .85rem; margin: 0; }
#btn-board-close {
    background: #005c4b; border: none; color: #fff;
    padding: 12px 30px; border-radius: 24px; cursor: pointer;
    margin-top: 2rem; font-size: .9rem;
}
```

---

## Summary of file responsibilities

| File            | Responsibility |
|-----------------|----------------|
| `LevelManager.js` | Phase lifecycle: load, setup, unload, evidence tracking |
| `level01.js` … `level10.js` | Pure data: NPCs, quests, evidence defs, model keys |
| `main.js`       | Wires LevelManager events to existing UI / audio / win screen |
| `dialogue.js`   | Unchanged — openDialogue() called per NPC as before |
| `config.js`     | Unchanged — generic actions remain here; level overrides in level0X.js |

The key rule: **level files are data only**. No game logic lives in them.
All logic stays in LevelManager.js and main.js.
