/**
 * Miracle Maker 3D- Main Entry Point
 * Modular architecture preserving all functionality from inline code
 *
 * DIALOGUE SYSTEM: WhatsApp-style chat bubbles (whatsapp2.html)
 *   - NPC lines appended as .msg-bubble.npc-msg into #bubble-text-container
 *   - Player choices echoed as .msg-bubble.player-msg before advancing story
 *   - Ambient "filler" messages shown while NPC types next line
 *   - Old flat #bubble-text element removed; scrollable container used instead
 */

import * as THREE from 'three';
import * as CANNON from 'cannon';
import { SceneManager } from './core/sceneManager.js';
import { WorldManager } from './core/worldManager.js';
import { Player } from './core/player.js';
import { NPCSystem } from './gameplay/NPCSystem.js';
import { DialogueManager } from './gameplay/dialogueManager.js';
import { CameraController } from './core/CameraController.js';
import { ToonShader } from './core/ToonShader.js';
import { IconManager } from './core/IconManager.js';
import { AudioManager } from './core/audioManager.js';
import { DayNight } from './core/DayNight.js';
import { ActionManager } from './gameplay/actionManager.js';
import { ModelManager } from './core/modelManager.js';
import { GameLevelManager } from './GameLevelManager.js';
import { VFXSystem } from './core/VFXSystem.js';
import { investigationManager } from './InvestigationManager.js';
import { evidenceSystem } from './EvidenceSystem.js';
import { locations, ICON_SYSTEM } from './config.js';

// Global state — centralized via appState single-point-of-truth
let started = false;
let activeNpc = null;
let visitedNpcs = new Set();
let lastNearNpcId = null;
window.mouseTarget = null;
let activeLoc = null;
let locTimeout = null;
let locCooldownUntil = 0;
let locNameTypewriter = null;
window.gameKeys = window.gameKeys || {};
const keys = window.gameKeys;

// Systems
let sceneMgr = null;
let worldMgr = null;
let player = null;
let npcSystem = null;
let audio = null;
let actionMgr = null;
let dialogueMgr = null;
let cameraCtrl = null;
let iconMgr = null;
let modelMgr = null;
let vfx = null;
let toonShader = null;
let dayNight = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Inventory
let inventory = [];

// DOM elements
const elStartScreen = document.getElementById('start-screen');
const elWinScreen = document.getElementById('win-screen');
const elWorldPrompt = document.getElementById('world-prompt');
const elLocalDialogueBox = document.getElementById('local-dialogue-box');
const elBubbleContainer = document.getElementById('bub-scroll'); // matches index.html #bub-scroll
const elBubbleChoices = document.getElementById('bar-choices');  // matches index.html #bar-choices
const elNpcNameDisplay = document.getElementById('npc-name-display');
const elNpcBubble = document.getElementById('npc-bubble');
const elLocName = document.getElementById('loc-name');
const elLocBox = document.getElementById('loc-box');

console.log('[init] DOM elements loaded:', {
    elBubbleContainer: !!elBubbleContainer,
    elBubbleChoices: !!elBubbleChoices,
    elLocalDialogueBox: !!elLocalDialogueBox,
    elWorldPrompt: !!elWorldPrompt
});

// ── Central State Authority (single-point-of-truth) ───────────────────────────
export let activeQuests = [];
export let activeNpcsData = [];

export const appState = {
    isDialogueOpen: false,
    hasWon: false,
    currentLevelIndex: 0,

    updateActiveLevelData(quests, npcs) {
        activeQuests = [...quests];
        activeNpcsData = [...npcs];
        console.log("State synchronized safely for active module arrays.");
        if (actionMgr) actionMgr.setQuests(activeQuests);
    }
};

export function updateActiveLevelData(newQuests, newNpcs) {
    activeQuests = newQuests;
    activeNpcsData = newNpcs;
    if (actionMgr) actionMgr.setQuests(activeQuests);
}
const panelInv = document.getElementById('panel-inv');
const panelActions = document.getElementById('panel-actions');
const panelQuest = document.getElementById('panel-quest');
const btnQuest = document.getElementById('btn-quest-toggle');
const btnInv = document.getElementById('btn-inv-toggle');
const btnActions = document.getElementById('btn-actions-toggle');
const btnSound = document.getElementById('btn-sound-toggle');
const btnCycleToggle = document.getElementById('btn-cycle-toggle');
const btnStart = document.getElementById('btn-start');
const btnReplay = document.getElementById('btn-replay');
const elQuestList = document.getElementById('quest-list');
const elInvList = document.getElementById('inv-list');
const elActionsList = document.getElementById('actions-list');

// LEVEL MANAGEMENT
const levelManager = new GameLevelManager({
    get worldMgr() { return worldMgr; },
    get player() { return player; },
    get npcSystem() { return npcSystem; },
    get dialogueMgr() { return dialogueMgr; },
    get world() { return worldMgr ? worldMgr.world : null; },
    get scene() { return sceneMgr ? sceneMgr.scene : null; },
    get camera() { return sceneMgr ? sceneMgr.camera : null; },
    get modelMgr() { return modelMgr; },
    get toonShader() { return toonShader; },
    get planetR() { return worldMgr ? worldMgr.planetR : 50; },
    get updateActiveLevelData() { return updateActiveLevelData; },
    get updateUI() { return updateUI; }
});

// Audio Context for jump beep
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playBeep(f, t = "sine", d = 0.1) {
    if (audioCtx.state === 'suspended') return;
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = t;
    osc.frequency.setValueAtTime(f, audioCtx.currentTime);
    g.gain.setValueAtTime(0.05, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + d);
    osc.connect(g);
    g.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + d);
}

// ── Typewriter utility ──────────────────────────────────────────────
class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.speed = options.speed || 30;
        this.onComplete = options.onComplete || null;
        this._tw = null;
    }
    type(text) {
        if (this._tw) clearTimeout(this._tw);
        this.element.textContent = '';
        this.element.classList.remove('typewriter-done');
        this.element.classList.add('typewriter-cursor');
        const chars = text.split('');
        let i = 0;
        const tick = () => {
            if (i < chars.length) {
                this.element.textContent += chars[i++];
                this._tw = setTimeout(tick, this.speed + Math.random() * 12 - 6);
            } else {
                this.element.classList.add('typewriter-done');
                if (this.onComplete) this.onComplete();
            }
        };
        tick();
    }
}

// Ink text processing
function stripInkMarkers(s) {
    if (!s) return '';
    const rawLines = s.split(/\r?\n/);
    const out = [];
    for (let line of rawLines) {
        let l = (line || '').trim();
        if (l === '#' || l === '/#') continue;
        if (l.startsWith('^')) l = l.slice(1).trim();
        if (l.startsWith('#')) l = l.slice(1).trim();
        if (l) out.push(l);
    }
    return out.join('\n');
}

// ── Chat bubble helpers ─────────────────────────────────────────────────────

/**
 * Append a single chat bubble to #bubble-text-container.
 * @param {string} text  - message text
 * @param {'npc'|'player'} type - controls left/right alignment and colour
 */
function appendMessage(text, type = 'npc') {
    console.log('[appendMessage]', type, text.substring(0, 50));
    if (!elBubbleContainer) {
        console.error('[appendMessage] elBubbleContainer is null!');
        return;
    }
    const msg = document.createElement('div');
    msg.className = `msg-bubble ${type}-msg`;
    msg.innerText = text;
    elBubbleContainer.appendChild(msg);

    // Highlight new message briefly
    msg.animate([
        { opacity: 0.7, transform: 'translateY(4px)' },
        { opacity: 1, transform: 'translateY(0)' }
    ], {
        duration: 150,
        easing: 'ease-out'
    });

    // Force scroll to bottom immediately
    elBubbleContainer.scrollTop = elBubbleContainer.scrollHeight;
    // Also requestAnimationFrame for smooth scroll behavior
    requestAnimationFrame(() => {
        elBubbleContainer.scrollTop = elBubbleContainer.scrollHeight;
    });
}

/**
 * Ambient filler messages shown while the NPC "types" its next response.
 * Gives the impression of a live, busy connection.
 */
const FILLER_LINES = [
    "Awaiting decryption...",
    "Verifying local coordinates...",
    "Establishing secure handshake...",
    "Background tasks synchronized.",
    "No interference detected.",
    "Signal strength: 88%.",
    "Parsing metadata...",
    "Updating local cache...",
    "Redirecting signal packets..."
];

// UI update
function updateUI() {
    // Evidence / Inventory list
    elInvList.innerHTML = inventory.length ? inventory.map(i => {
        // Map Act 1 Case 1 evidence to specific investigation icons
        let iconType = 'file-shield';
        if (i.includes('ZECHARIAH') || i.includes('SCROLL')) iconType = 'scroll';
        else if (i.includes('TESTIMONY') || i.includes('ACCOUNT')) iconType = 'comments';
        else if (i.includes('DONKEY') || i.includes('COLT')) iconType = 'horse';

        if (ICON_SYSTEM === 'svg') {
            const iconEl = iconMgr.createIconElement(iconType, { size: '1em' });
            const div = document.createElement('div');
            div.className = 'item';
            div.appendChild(iconEl);
            const span = document.createElement('span');
            span.textContent = i.replace(/_/g, ' ');
            div.appendChild(span);
            return div.outerHTML;
        } else {
            return `<div class="item"><i class="fas fa-${iconType}"></i> ${i.replace(/_/g, ' ')}</div>`;
        }
    }).join('') : "NO EVIDENCE COLLECTED";

    // Actions list: merge actionManager actions with current NPC investigation modes
    let availableActions = [...actionMgr.getActions()];
    
    if (activeNpc) {
        const currentLevel = levelManager.getCurrentLevel();
        const actMatch = currentLevel?.name?.match(/ACT (\d+)/);
        const currentAct = actMatch ? parseInt(actMatch[1]) : 1;

        const modes = investigationManager.getModes(activeNpc.data.id, currentAct);
        const invActions = modes.map(m => ({
            name: m.label.includes('] ') ? m.label.split('] ')[1] : m.label, // "TALK", "ACCUSE"
            id: m.id, 
            iconType: m.id === 'talk' ? 'comments' : (m.id === 'accuse' ? 'gavel' : 'bolt'),
            isInvestigation: true
        }));
        availableActions = [...invActions, ...availableActions];
    }

    elActionsList.innerHTML = availableActions.length ?
        availableActions.map(a => {
            const iconEl = iconMgr.createIconElement(a.iconType || a.icon, { size: '1.4em' });
            const div = document.createElement('div');
            div.className = 'action-item-btn';
            div.dataset.actionId = a.id; // Use ID for reliable lookup
            div.title = a.name; // Show name on hover
            div.appendChild(iconEl);

            // Restore 'uses' indicator as a badge if applicable
            if (a.uses !== undefined && a.uses !== -1) {
                const badge = document.createElement('div');
                badge.className = 'action-badge';
                badge.textContent = a.uses;
                badge.style.position = 'absolute';
                badge.style.bottom = '-4px';
                badge.style.right = '-4px';
                badge.style.fontSize = '10px';
                badge.style.background = 'var(--accent-primary)';
                badge.style.color = '#000';
                badge.style.padding = '2px 4px';
                badge.style.borderRadius = '4px';
                badge.style.fontWeight = 'bold';
                div.appendChild(badge);
            }

            return div.outerHTML;
        }).join('') : "";

    // Quest list
    elQuestList.innerHTML = activeQuests.map(q => {
        const isComplete = q.cur >= q.tar;
        const iconType = isComplete ? 'checkFull' : 'checkEmpty';
        const iconEl = iconMgr.createIconElement(iconType, { size: '1.8em' });
        const div = document.createElement('div');
        div.className = `q-item ${isComplete ? 'q-done' : ''}`;
        div.appendChild(iconEl);
        const b = document.createElement('b');
        b.textContent = q.name;
        const small = document.createElement('small');
        small.textContent = `${q.task} [${q.cur}/${q.tar}]`;
        div.appendChild(b);
        div.appendChild(small);
        return div.outerHTML;
    }).join('');

    activeQuests.forEach(q => {
        if (!q.completed && q.cur >= q.tar) {
            q.completed = true;
            audio.playQuestComplete();
        }
    });

    checkWinCondition();
}

// Win condition check
function checkWinCondition() {
    // Verify if all current milestones/quests for this loop level are completed
    const levelComplete = activeQuests.every(q => q.cur >= q.tar);

    if (levelComplete) {
        console.log("Stage objectives achieved! Advancing loop...");
        levelManager.nextLevel(); // Automatically fades, clears, and sets up the next loop!
    }
}

// Win sequence
function triggerWinSequence() {
    appState.isDialogueOpen = true;
    player.sleep();
    window.mouseTarget = null;
    elLocalDialogueBox.style.display = 'none';
    panelInv.classList.remove('open');
    panelQuest.classList.remove('open');
    audio.pauseMusic();
    audio.playVictory();

    const wipe = document.getElementById('wipe-overlay');
    wipe.classList.add('active');

    setTimeout(() => {
        elWinScreen.style.display = 'flex';
    }, 500);
}

// ── Dialogue timing constants ────────────────────────────────────────────

/** Millisecond timings used by showFillerMessages and continueStory. */
const DIALOGUE = Object.freeze({
    messageDelay: 200,   // base delay before main NPC message appears after typing indicator
    fillerDelay: 350,   // gap between each filler "ambient" line
    typingDelay: 700,   // how long the "..." indicator shows before filler replaces it
});

// ── WhatsApp-style Ink dialogue helpers ────────────────────────────────────

/**
 * Ambient filler messages shown while the NPC "types" its next response.
 * Gives the impression of a live, busy connection.
 */
function showFillerMessages(count = 3) {
    for (let i = 0; i < count; i++) {
        const originalDelay = (i + 1) * DIALOGUE.fillerDelay;
        const typingStartDelay = Math.max(0, originalDelay - DIALOGUE.typingDelay);

        setTimeout(() => {
            // Show typing indicator
            const typingBubble = document.createElement('div');
            typingBubble.className = 'msg-bubble npc-msg typing-indicator';
            typingBubble.innerText = '...';
            typingBubble.style.fontStyle = 'italic';
            typingBubble.style.opacity = '0.6';
            elBubbleContainer.appendChild(typingBubble);
            requestAnimationFrame(() => elBubbleContainer.scrollTop = elBubbleContainer.scrollHeight);

            // After DIALOGUE.typingDelay, replace with actual filler line
            setTimeout(() => {
                elBubbleContainer.removeChild(typingBubble);
                appendMessage(FILLER_LINES[i % FILLER_LINES.length], 'npc');
            }, DIALOGUE.typingDelay);
        }, typingStartDelay);
    }
}

// ── WhatsApp-style Ink dialogue continuation ────────────────────────────────

/**
 * Reads the next Ink passage and appends it as an NPC bubble,
 * then renders choice buttons as pill-shaped elements.
 * Player choices are echoed back as player-msg bubbles before advancing.
 */
function continueStory() {
    console.log('[continueStory] called, canContinue:', dialogueMgr.inkStory.canContinue);

    let txt = "";
    // Collect all available narrative text until we hit a choice point
    while (dialogueMgr.inkStory.canContinue && dialogueMgr.inkStory.currentChoices.length === 0) {
        const chunk = dialogueMgr.inkStory.Continue();
        console.log('[continueStory] collected chunk:', JSON.stringify(chunk.substring(0, 50)));
        txt += chunk;
    }
    console.log('[continueStory] total collected txt length:', txt.length, 'choices now:', dialogueMgr.inkStory.currentChoices.length);

    const cleaned = stripInkMarkers(txt);
    console.log('[continueStory] cleaned:', cleaned.substring(0, 100));

    elBubbleChoices.innerHTML = "";

    if (!cleaned.trim()) {
        // No narrative text available; check if story simply ended
        if (!dialogueMgr.inkStory.canContinue && dialogueMgr.inkStory.currentChoices.length === 0) {
            console.log('[continueStory] Story ended with no choices');
            return;
        }
    }

    if (cleaned.trim()) {
        // Show typing indicator immediately
        const typingBubble = document.createElement('div');
        typingBubble.className = 'msg-bubble npc-msg typing-indicator';
        typingBubble.innerText = '...';
        elBubbleContainer.appendChild(typingBubble);
        requestAnimationFrame(() => elBubbleContainer.scrollTop = elBubbleContainer.scrollHeight);

        // Delay before showing main NPC message (simulates typing/thinking time)
        setTimeout(() => {
            // Remove typing indicator
            elBubbleContainer.removeChild(typingBubble);
            appendMessage(cleaned.trim(), 'npc');
            // Show filler messages after main message appears, staggered
            showFillerMessages(3);
        }, DIALOGUE.messageDelay);

        // Render choice buttons after main message + filler complete
        const renderDelay = DIALOGUE.messageDelay + (3 * DIALOGUE.fillerDelay) + 100;
        setTimeout(() => {
            elBubbleChoices.innerHTML = "";
            dialogueMgr.inkStory.currentChoices.forEach(c => {
                const b = document.createElement('button');
                b.className = "choice-btn";
                b.innerText = c.text;
                b.onclick = () => {
                    appendMessage(c.text, 'player');
                    dialogueMgr.inkStory.ChooseChoiceIndex(c.index);
                    setTimeout(continueStory, 400);
                };
                elBubbleChoices.appendChild(b);
            });

            // End of story: show disconnect button
            if (dialogueMgr.inkStory.currentChoices.length === 0 && !dialogueMgr.inkStory.canContinue) {
                const b = document.createElement('button');
                b.className = "choice-btn";
                b.innerText = "[CLOSE CONNECTION]";
                b.onclick = () => {
                    elBubbleContainer.innerHTML = '';
                    elLocalDialogueBox.style.display = 'none';
                    appState.isDialogueOpen = false;
                    player.wakeUp();
                    player.resetTarget();
                    if (activeNpc) audio.playNpcSound(activeNpc.data.id, 'onExit');
                };
                elBubbleChoices.appendChild(b);
            }
        }, renderDelay);
    } else {
        // Handle choice-only segments
        const renderDelay = DIALOGUE.messageDelay + (3 * DIALOGUE.fillerDelay) + 100;
        setTimeout(() => {
            elBubbleChoices.innerHTML = "";
            dialogueMgr.inkStory.currentChoices.forEach(c => {
                const b = document.createElement('button');
                b.className = "choice-btn";
                b.innerText = c.text;
                b.onclick = () => {
                    appendMessage(c.text, 'player');
                    dialogueMgr.inkStory.ChooseChoiceIndex(c.index);
                    setTimeout(continueStory, 400);
                };
                elBubbleChoices.appendChild(b);
            });
        }, renderDelay);
    }
}

// Start dialogue (click on world prompt)
function startDialogue() {
    console.log('[startDialogue] called', { activeNpc, hasStory: dialogueMgr.getStory(activeNpc?.data?.id) });
    const inkLib = (() => {
        if (typeof window.inkjs !== 'undefined' && window.inkjs.Story) return window.inkjs;
        if (typeof window.ink !== 'undefined' && window.ink.Story) return window.ink;
        return null;
    })();

    if (!inkLib || !activeNpc || !dialogueMgr.getStory(activeNpc.data.id)) {
        console.error("Cannot start dialogue", { activeNpc, hasStory: !!dialogueMgr.getStory(activeNpc?.data?.id) });
        return;
    }

    player.sleep();
    window.mouseTarget = null;

    if (activeNpc.data.questId !== undefined && !visitedNpcs.has(activeNpc.data.id)) {
        visitedNpcs.add(activeNpc.data.id);
        const q = activeQuests.find(q => q.id === activeNpc.data.questId);
        if (q) q.cur = Math.min(q.cur + 1, q.tar);
        updateUI();
    }

    appState.isDialogueOpen = true;
    elWorldPrompt.style.display = 'none';

    // Clear previous chat history before opening a fresh conversation
    elBubbleContainer.innerHTML = "";
    elBubbleChoices.innerHTML = "";
    console.log('[startDialogue] cleared containers, bubbleContainer exists:', !!elBubbleContainer);

    // Show dialogue box as flex (required by CSS layout)
    elLocalDialogueBox.style.display = 'flex';
    console.log('[startDialogue] dialogue box display set to flex');

    audio.playNpcSound(activeNpc.data.id, 'onEnter');

    try {
        const storyData = dialogueMgr.getStory(activeNpc.data.id);
        if (!storyData) {
            console.error('[startDialogue] No story data for NPC', activeNpc.data.id);
            alert('No dialogue story found for this NPC');
            return;
        }
        dialogueMgr.inkStory = new inkLib.Story(storyData);
        console.log('[startDialogue] Story created, canContinue:', dialogueMgr.inkStory.canContinue);

        // Try to get text directly; if empty, jump to known content knots
        let txt = "";
        if (dialogueMgr.inkStory.canContinue) {
            txt = dialogueMgr.inkStory.Continue();
            console.log('[startDialogue] First Continue returned:', JSON.stringify(txt));
        }

        if (!txt || !txt.trim()) {
            // This story uses divert-glue at start; jump directly to first content knot
            const contentKnots = ['morning', 'fear', 'hide', 'basket', 'start'];
            let found = false;
            for (const knot of contentKnots) {
                try {
                    dialogueMgr.inkStory.ChoosePathString(knot);
                    if (dialogueMgr.inkStory.canContinue) {
                        txt = dialogueMgr.inkStory.Continue();
                        console.log(`[startDialogue] Knot "${knot}" yielded:`, txt.substring(0, 80));
                        if (txt && txt.trim()) {
                            found = true;
                            break;
                        }
                    }
                } catch (e) {
                    console.log(`[startDialogue] Knot "${knot}" failed:`, e.message);
                }
            }
            if (!found) {
                console.error('[startDialogue] Could not extract dialogue from any known knot');
                alert('This dialogue appears to be empty or cannot be read.');
                return;
            }
        }

        const cleaned = stripInkMarkers(txt);
        console.log('[startDialogue] Final cleaned text:', cleaned.substring(0, 100));

        // Set NPC name
        if (activeNpc.data.questId !== undefined) {
            const _q = activeQuests.find(q => q.id === activeNpc.data.questId);
            const status = _q ? (_q.cur >= _q.tar ? '✓ COMPLETED' : `QUEST [${_q.cur}/${_q.tar}]`) : 'IN PROGRESS';
            elNpcNameDisplay.innerHTML = `${activeNpc.data.name} <span style="color:var(--accent-success);font-size:0.7em">- ${status}</span>`;
        } else {
            elNpcNameDisplay.innerText = activeNpc.data.name;
        }

        // Clear and show the dialogue box
        elBubbleContainer.innerHTML = "";
        elBubbleChoices.innerHTML = "";
        elLocalDialogueBox.style.display = 'flex';

        // Show the pre-fetched message with typing effect
        if (cleaned.trim()) {
            const typingBubble = document.createElement('div');
            typingBubble.className = 'msg-bubble npc-msg typing-indicator';
            typingBubble.innerText = '...';
            elBubbleContainer.appendChild(typingBubble);

            setTimeout(() => {
                elBubbleContainer.removeChild(typingBubble);
                appendMessage(cleaned.trim(), 'npc');
                showFillerMessages(3);
            }, DIALOGUE.messageDelay);
        }

        // Schedule choice rendering after main message + filler complete
        const renderDelay = DIALOGUE.messageDelay + (3 * DIALOGUE.fillerDelay) + 100;
        setTimeout(() => {
            console.log('[startDialogue] Rendering choices, canContinue:', dialogueMgr.inkStory.canContinue, 'currentChoices:', dialogueMgr.inkStory.currentChoices.length);

            elBubbleChoices.innerHTML = "";

            // If story can continue but no choices yet, advance until choices appear
            if (dialogueMgr.inkStory.canContinue && dialogueMgr.inkStory.currentChoices.length === 0) {
                console.log('[startDialogue] Advancing to reach choice point...');
                let advanceCount = 0;
                while (dialogueMgr.inkStory.canContinue && dialogueMgr.inkStory.currentChoices.length === 0 && advanceCount < 20) {
                    const moreText = dialogueMgr.inkStory.Continue();
                    console.log(`[startDialogue] advance ${advanceCount}: "${moreText.substring(0, 50)}"`);
                    advanceCount++;
                }
                console.log('[startDialogue] After advance - canContinue:', dialogueMgr.inkStory.canContinue, 'choices:', dialogueMgr.inkStory.currentChoices.length);
            }

            dialogueMgr.inkStory.currentChoices.forEach(c => {
                const b = document.createElement('button');
                b.className = 'choice-btn';
                b.innerText = c.text;
                b.onclick = () => {
                    appendMessage(c.text, 'player');
                    dialogueMgr.inkStory.ChooseChoiceIndex(c.index);
                    setTimeout(continueStory, 400);
                };
                elBubbleChoices.appendChild(b);
            });

            if (dialogueMgr.inkStory.currentChoices.length === 0 && !dialogueMgr.inkStory.canContinue) {
                const b = document.createElement('button');
                b.className = 'choice-btn';
                b.innerText = '[CLOSE CONNECTION]';
                b.onclick = () => {
                    elBubbleContainer.innerHTML = '';
                    elLocalDialogueBox.style.display = 'none';
                    appState.isDialogueOpen = false;
                    player.wakeUp();
                    player.resetTarget();
                    if (activeNpc) audio.playNpcSound(activeNpc.data.id, 'onExit');
                };
                elBubbleChoices.appendChild(b);
            }
        }, renderDelay);
    } catch (e) {
        console.error("STORY_INIT_ERROR", e);
        alert(`Failed to load dialogue: ${e.message}`);
    }
}

// Toggle panel helper
function togglePanel(panel, btn, otherBtn1, otherBtn2, otherPanel1, otherPanel2) {
    const isOpen = panel.classList.contains('open');
    panel.classList.toggle('open', !isOpen);
    btn.classList.toggle('active', !isOpen);
    if (!isOpen) {
        otherBtn1.classList.remove('active');
        otherBtn2.classList.remove('active');
        otherPanel1.classList.remove('open');
        otherPanel2.classList.remove('open');
    }
    audio.playUI(isOpen ? 'close' : 'open');
}

function applyUIIcons() {
    setButtonIcon(btnQuest, 'quest');
    setButtonIcon(btnInv, 'inventory');
    setButtonIcon(btnActions, 'bolt'); // Changed from 'actions' to 'bolt'
    updateSoundIcon();
    updateCycleIcon();
}

function updateCycleIcon() {
    if (btnCycleToggle && dayNight) {
        btnCycleToggle.innerHTML = '';
        const iconType = dayNight.isDayMode() ? 'day' : 'night';
        const iconEl = iconMgr.createIconElement(iconType, { size: '1.2em' });
        btnCycleToggle.appendChild(iconEl);
    }
}

function setButtonIcon(btn, iconType) {
    btn.innerHTML = '';
    const iconEl = iconMgr.createIconElement(iconType, { size: '1.2em' });
    btn.appendChild(iconEl);
}

function updateSoundIcon(enabled) {
    if (enabled === undefined) enabled = audio.soundEnabled;
    btnSound.innerHTML = '';
    const iconType = enabled ? 'soundOn' : 'soundOff';
    const iconEl = iconMgr.createIconElement(iconType, { size: '1.2em' });
    btnSound.appendChild(iconEl);
}

// ── Minimap tracker ─────────────────────────────────────────────────────────
const mapScaleFactor = 2.0; // normalises ~50-unit planet to minimap space

function updateMinimapTracker() {
    if (!player || !player.playerMesh) return;

    const playerPos = new THREE.Vector3();
    player.playerMesh.getWorldPosition(playerPos);

    const uiTrackerDot = document.getElementById('minimap-player-indicator');
    if (uiTrackerDot) {
        uiTrackerDot.style.transform = `translate(${playerPos.x * mapScaleFactor}px, ${playerPos.z * mapScaleFactor}px)`;
    }
}

// Initialize all systems
async function init() {
    sceneMgr = new SceneManager();

    modelMgr = new ModelManager();
    await modelMgr.init();

    // Initialize toon shader for stylized rendering
    toonShader = new ToonShader();

    worldMgr = new WorldManager(sceneMgr.scene, sceneMgr.world, modelMgr, toonShader);

    iconMgr = new IconManager();
    await iconMgr.init();

    player = new Player(worldMgr.world, sceneMgr.scene, modelMgr, toonShader);
    window.player = player; // Expose for mobile controls
    worldMgr._playerBody = player.pBody; // protect player body from level clears
    npcSystem = new NPCSystem(activeNpcsData, worldMgr.planetR, sceneMgr.scene, modelMgr, toonShader);
    actionMgr = new ActionManager(iconMgr);
    dialogueMgr = new DialogueManager();
    audio = new AudioManager();
    cameraCtrl = new CameraController(sceneMgr.camera);

    // Initialize day/night cycle system
    dayNight = new DayNight(sceneMgr.scene, sceneMgr.renderer);

    // Initialize VFX system for landing decals and trails
    vfx = new VFXSystem(sceneMgr.scene, worldMgr.planet, worldMgr.planetR, worldMgr.planetMesh);

    // Register player torch and material with DayNight system
    dayNight.registerPlayerEffects(player.torch, player.bodyMaterial);

    // Connect day/night system to VFX
    dayNight.onModeChange = (isNight) => {
        vfx.setNightMode(isNight);
    };

    applyUIIcons();

    locNameTypewriter = new Typewriter(document.getElementById('loc-name'), { speed: 45 });

    await dialogueMgr.loadAllStories();
    dialogueMgr.setInkLib(window.inkjs || window.ink);

    setupInputs();
    setupUIHandlers();

    // Listen for player landing events to spawn decals
    window.addEventListener('playerLand', (e) => {
        vfx.emitLandingDecal(e.detail.position, e.detail.up);
    });

    // Load Level 1 quests and NPCs so updateUI / gameLoop have data immediately
    levelManager.loadLevel(levelManager.getCurrentLevel()); 
    
    // Initialize Evidence System with Act 1: The Donkey King
    evidenceSystem.loadCase?.('triumphal_entry');

    gameLoop();
}

function setupInputs() {
    window.addEventListener('keydown', e => {
        keys[e.code] = true;
        if (started && !appState.isDialogueOpen) {
            if (e.code === 'Space') {
                e.preventDefault();
                e.stopPropagation();
                if (player.jump()) playBeep(300, "sine", 0.05);
            }

            // Contextual NPC Actions (E, Q, R)
            if (activeNpc) {
                if (e.code === 'KeyE') handleNpcInteraction('talk');
                if (e.code === 'KeyQ') handleNpcInteraction('challenge');
                if (e.code === 'KeyR') handleNpcInteraction('accuse');
            }
        }
    });

    window.addEventListener('keyup', e => {
        keys[e.code] = false;
    });

    // Raycaster and mouse for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Listen for custom mobile/interaction events
    window.addEventListener('world-click', e => {
        if (!started || appState.isDialogueOpen) return;
        const { x, y } = e.detail;
        mouse.x = (x / window.innerWidth) * 2 - 1;
        mouse.y = -(y / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, sceneMgr.camera);
        const hits = raycaster.intersectObject(worldMgr.planet);
        if (hits.length) window.mouseTarget = hits[0].point;
    });

    window.addEventListener('game-jump', () => {
        if (started && !appState.isDialogueOpen && player) {
            if (player.jump()) playBeep(300, "sine", 0.05);
        }
    });

    // Mouse-drag orbit camera (left-click and drag to look around)
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    window.addEventListener('mousedown', e => {
        if (!started || appState.isDialogueOpen) return;
        if (e.target.closest('.ui-toggle') || e.target.closest('.panel') ||
            e.target.closest('.overlay') || e.target.closest('#wipe-overlay')) return;

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        if (e.button === 0) {
            // Left button: begin drag-rotation of camera angle
            isDragging = true;
        } else {
            // Right button: set movement click-target
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, sceneMgr.camera);
            const hits = raycaster.intersectObject(worldMgr.planet);
            if (hits.length) window.mouseTarget = hits[0].point;
        }
    });

    window.addEventListener('mousemove', e => {
        if (!isDragging) return;

        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;

        const pPos = player.getPosition();
        const up = pPos.clone().normalize();

        // Horizontal drag → yaw (rotate around planet up axis)
        const yawRate = -dx * 0.007;
        const qYaw = new THREE.Quaternion();
        qYaw.setFromAxisAngle(up, yawRate);
        player.camHeading.applyQuaternion(qYaw);

        // Vertical drag → pitch (rotated right-vector)
        const viewRight = new THREE.Vector3().crossVectors(up, player.camHeading).normalize();
        const pitchRate = -dy * 0.007;
        player.camHeading.applyAxisAngle(viewRight, pitchRate);

        // Clamp vertical to avoid going over the poles
        const projected = player.camHeading.clone().projectOnPlane(up);
        if (projected.lengthSq() > 0.0001) {
            player.camHeading.copy(projected.normalize());
        }
    });

    window.addEventListener('mouseup', e => {
        if (e.button === 0) isDragging = false;
    });

    window.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    window.addEventListener('contextmenu', e => e.preventDefault()); // Suppress right-click context menu

    window.addEventListener('resize', () => {
        sceneMgr.handleResize();
    });
}

function setupUIHandlers() {
    btnStart.onclick = () => {
        const wipe = document.getElementById('wipe-overlay');
        wipe.classList.add('active');
        if (audioCtx.state === 'suspended') audioCtx.resume();
        audio.playUI('click');
        setTimeout(() => elStartScreen.style.display = 'none', 500);
        setTimeout(() => {
            started = true;
            updateUI();
            audio.startMusic();
            audio.startAmbient();
        }, 1000);
    };

    btnReplay.onclick = () => {
        audio.playUI('click');
        location.reload();
    };

    btnSound.onclick = (e) => {
        e.stopPropagation();
        audio.playUI('click');
        const enabled = audio.toggleMusic();
        updateSoundIcon(enabled);
    };

    btnQuest.onclick = (e) => {
        e.stopPropagation();
        audio.playUI('click');
        togglePanel(panelQuest, btnQuest, btnInv, btnActions, panelInv, panelActions);
    };

    btnInv.onclick = (e) => {
        e.stopPropagation();
        audio.playUI('click');
        togglePanel(panelInv, btnInv, btnQuest, btnActions, panelQuest, panelActions);
    };

    btnActions.onclick = (e) => {
        e.stopPropagation();
        audio.playUI('click');
        togglePanel(panelActions, btnActions, btnQuest, btnInv, panelQuest, panelInv);
    };

    btnCycleToggle.onclick = (e) => {
        e.stopPropagation();
        audio.playUI('click');
        const isDay = dayNight.toggleMode();
        updateCycleIcon();
    };

    // Mobile Jump Button (Center Button)
    const btnMobileJump = document.getElementById('ctrl-jump');
    if (btnMobileJump) {
        btnMobileJump.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            if (started && !appState.isDialogueOpen && player) {
                if (player.jump()) playBeep(300, "sine", 0.05);
            }
        });
    }

    elActionsList.addEventListener('click', (e) => {
        const actionBtn = e.target.closest('.action-item-btn');
        if (!actionBtn) return;
        const actionId = actionBtn.dataset.actionId;

        // Try investigation interaction first
        if (activeNpc) {
            const currentAct = Math.ceil((levelManager.currentLevelIndex + 1) / 2);
            const modes = investigationManager.getModes(activeNpc.data.id, currentAct);
            const mode = modes.find(m => m.id === actionId);
            if (mode) {
                handleNpcInteraction(mode.id);
                return;
            }
        }

        const action = actionMgr.getActions().find(a => a.id === actionId || a.name === actionId);
        if (action) {
            audio.playUI('click');
            const questCompleted = actionMgr.executeAction(
                action,
                activeNpc,
                updateUI,
                () => audio.playUI('click'),
                () => audio.playQuestComplete()
            );
            if (questCompleted && activeNpc) {
                visitedNpcs.add(activeNpc.data.id);
            }
        }
    });

    elWorldPrompt.onclick = null;
}

/**
 * Handles contextual interaction with NPCs (Talk, Challenge, Accuse)
 */
function handleNpcInteraction(mode) {
    if (!activeNpc) return;
    const currentLevel = levelManager.getCurrentLevel();
    const actMatch = currentLevel?.name?.match(/ACT (\d+)/);
    const currentAct = actMatch ? parseInt(actMatch[1]) : 1;

    const modes = investigationManager.getModes(activeNpc.data.id, currentAct);

    if (modes.some(m => m.id === mode)) {
        // Tag the interaction type so DialogueManager can jump to correct knot
        activeNpc.data._interactionType = mode;
        startDialogue();
    }
}

// Main game loop
function gameLoop() {
    requestAnimationFrame(gameLoop);

    worldMgr.world.step(1 / 60);

    const pPos = player.getPosition();
    const up = pPos.clone().normalize();

    player.update();

    // Update day/night cycle
    dayNight.update(1 / 60);

    // Update VFX system (particles, decals, birds)
    vfx.update(1 / 60, pPos, player.getVelocity ? player.getVelocity() : new THREE.Vector3(), pPos.length() < worldMgr.planetR + 1.6);

    if (!started) {
        sceneMgr.render();
        return;
    }

    // Find nearest NPC
    let nearestNpc = null;
    let nearestDist = Infinity;

    for (const npcObj of npcSystem.npcMeshes) {
        npcObj.bodyMesh.position.y = 1.5 + Math.sin(Date.now() * 0.002 + npcObj.data.id) * 0.2;
        const dist = pPos.distanceTo(npcObj.mesh.position);
        if (dist < 8 && dist < nearestDist) {
            nearestDist = dist;
            nearestNpc = npcObj;
        }
    }
    npcSystem.setActiveNPC(nearestNpc);

    if (activeNpc !== nearestNpc) {
        activeNpc = nearestNpc;
        updateUI();
    }
    activeNpc = nearestNpc;

    // NPC interaction prompt (Multi-modal: Talk, Challenge, Accuse)
    // This now evaluates available modes every frame to support dynamic evidence discovery
    if (activeNpc && !appState.isDialogueOpen && activeNpc.data.hasDialogue) {
        const currentAct = Math.ceil((levelManager.currentLevelIndex + 1) / 2);
        const modes = investigationManager.getModes(activeNpc.data.id, currentAct);

        // Logic Signature: Only rebuild the UI elements if the set of available actions changes
        const modesSignature = modes.map(m => m.id).sort().join('|');
        if (activeNpc._lastModesSignature !== modesSignature) {
            activeNpc._lastModesSignature = modesSignature;

            elWorldPrompt.style.display = 'flex';
            elWorldPrompt.style.flexDirection = 'row';
            elWorldPrompt.style.gap = '10px';
            elWorldPrompt.style.pointerEvents = 'auto';
            elWorldPrompt.innerHTML = ''; 

            modes.forEach(mode => {
                const pill = document.createElement('div');
                pill.className = 'interaction-pill';
                pill.style.width = '38px';
                pill.style.height = '38px';
                pill.style.display = 'flex';
                pill.style.alignItems = 'center';
                pill.style.justifyContent = 'center';
                pill.style.background = 'rgba(0, 0, 0, 0.85)';
                
                let iconType = 'comments';
                let color = '#00f2ff';
                if (mode.id === 'accuse') { iconType = 'gavel'; color = '#ff4444'; }
                if (mode.id === 'challenge') { iconType = 'bolt'; color = '#ffaa00'; }

                pill.style.border = `1px solid ${color}`;
                pill.style.borderRadius = '50%';
                pill.style.cursor = 'pointer';
                pill.style.color = color;
                pill.title = mode.label;

                const iconEl = iconMgr.createIconElement(iconType, { size: '1.2em' });
                pill.appendChild(iconEl);

                pill.onclick = (e) => {
                    e.stopPropagation();
                    handleNpcInteraction(mode.id);
                };
                elWorldPrompt.appendChild(pill);
            });
        }

        const sPos = activeNpc.getScreenPosition(sceneMgr.camera, worldMgr.planetR);
        elWorldPrompt.style.left = (sPos.x * 0.5 + 0.5) * window.innerWidth + 'px';
        elWorldPrompt.style.top = (sPos.y * -0.5 + 0.5) * window.innerHeight + 'px';

        if (lastNearNpcId !== activeNpc.data.id) {
            audio.playNpcSound(activeNpc.data.id, 'enter');
            lastNearNpcId = activeNpc.data.id;
        }
    } else {
        elWorldPrompt.style.display = 'none';
        if (activeNpc) activeNpc._lastModesSignature = null; // Reset cache when moving away
        if (lastNearNpcId !== null && !appState.isDialogueOpen) {
            audio.playNpcSound(lastNearNpcId, 'exit');
            lastNearNpcId = null;
        }
    }

    // Location detection
    let curLoc = null;
    for (const loc of locations) {
        const lp = new THREE.Vector3().setFromSphericalCoords(worldMgr.planetR, loc.pos[0] * Math.PI, loc.pos[1] * Math.PI * 2);
        if (pPos.distanceTo(lp) < loc.r) curLoc = loc;
    }

    if (curLoc) {
        const locationChanged = activeLoc !== curLoc;
        activeLoc = curLoc;

        if (locationChanged && locTimeout) {
            clearTimeout(locTimeout);
            locTimeout = null;
        }

        if (locationChanged) {
            const now = Date.now();
            if (now >= locCooldownUntil) {
                elLocBox.classList.remove('fade-out');
                elLocBox.style.display = 'block';
                const displayName = curLoc.name.replace('LOC_', '').replace(/_/g, ' ');
                locNameTypewriter.type(displayName);
                locCooldownUntil = now + 6000;
                locTimeout = setTimeout(() => {
                    elLocBox.classList.add('fade-out');
                    setTimeout(() => { elLocBox.style.display = 'none'; }, 500);
                }, 3000);
            }
        }

        const qEntry = activeQuests[curLoc.questId];
        if (curLoc.questId !== undefined && qEntry && qEntry.cur < qEntry.tar) {
            qEntry.cur = 1;
            updateUI();
        }
    } else {
        if (locTimeout) { clearTimeout(locTimeout); locTimeout = null; }
        elLocBox.style.display = 'none';
        activeLoc = null;
    }

    // Pickup collection
    worldMgr.updatePickupCollection(pPos, (itemName) => {
        inventory.push(itemName);

        // Dynamic Investigation Update: Register the pickup in the narrative evidence system
        evidenceSystem.collect(itemName);

        if (itemName.startsWith('CELL') && activeQuests[1]?.cur < (activeQuests[1]?.tar ?? 0)) {
            activeQuests[1].cur++;
            if (activeQuests[1].cur === activeQuests[1].tar) audio.playQuestComplete();
        }
        if (itemName.startsWith('SHARD') && activeQuests[2]?.cur < (activeQuests[2]?.tar ?? 0)) {
            activeQuests[2].cur++;
            if (activeQuests[2].cur === activeQuests[2].tar) audio.playQuestComplete();
        }
        audio.playPickup();
        updateUI();
    });

    // Non-dialogue NPC bubble
    const nonDialogueNpc = npcSystem.getClosestNonDialogueNPC(pPos);
    if (nonDialogueNpc) {
        const sPos = nonDialogueNpc.mesh.position.clone().add(up.clone().multiplyScalar(4)).project(sceneMgr.camera);
        elNpcBubble.style.left = (sPos.x * 0.5 + 0.5) * window.innerWidth + 'px';
        elNpcBubble.style.top = (sPos.y * -0.5 + 0.5) * window.innerHeight + 'px';
        let txt = nonDialogueNpc.data.bubbleMsg || nonDialogueNpc.data.name.replace('_', ' ');
        if (nonDialogueNpc.data.questId !== undefined) {
            const _ndQuest = activeQuests.find(q => q.id === nonDialogueNpc.data.questId);
            if (_ndQuest && _ndQuest.completed) {
                txt = nonDialogueNpc.data.bubbleMsgComplete || txt;
            }
        }
        elNpcBubble.innerHTML = `<b>${txt}</b>`;
        elNpcBubble.style.display = 'block';
    } else {
        elNpcBubble.style.display = 'none';
    }

    // Movement (head-based pivot)
    let moveDir = new THREE.Vector3(0, 0, 0);

    if (!appState.isDialogueOpen) {
        const viewRight = new THREE.Vector3().crossVectors(up, player.camHeading).normalize();
        if (keys['KeyA'] || keys['ArrowLeft']) {
            player.camHeading.add(viewRight.clone().multiplyScalar(0.045)).normalize();
        }
        if (keys['KeyD'] || keys['ArrowRight']) {
            player.camHeading.sub(viewRight.clone().multiplyScalar(0.045)).normalize();
        }

        player.camHeading.copy(player.camHeading.projectOnPlane(up).normalize());

        const headingFlat = player.camHeading.clone();
        if (keys['KeyW'] || keys['ArrowUp']) moveDir.add(headingFlat);
        if (keys['KeyS'] || keys['ArrowDown']) moveDir.sub(headingFlat);

        // Override point-and-click target if manual movement keys are pressed
        if (moveDir.lengthSq() > 0) window.mouseTarget = null;

        if (window.mouseTarget) {
            const toMouse = window.mouseTarget.clone().sub(pPos).projectOnPlane(up);
            if (toMouse.length() > 2) moveDir.add(toMouse.normalize());
            else window.mouseTarget = null;
        }
    }

    player.applyMovement(moveDir);

    cameraCtrl.follow(pPos, player.camHeading, up);

    actionMgr.renderFloatingIcon(sceneMgr.camera, pPos);

    // Update minimap radar blip
    updateMinimapTracker();

    sceneMgr.render();
}


// Start
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        if (elStartScreen) elStartScreen.style.display = 'flex';
        init();
    }, 1000);
});