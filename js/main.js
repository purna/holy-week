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
import { SceneManager } from './scene.js';
import { WorldManager } from './world.js';
import { Player } from './player.js';
import { NPCSystem } from './NPCSystem.js';
import { AudioManager } from './audio.js';
import { ActionManager } from './actions.js';
import { DialogueManager } from './dialogue.js';
import { CameraController } from './CameraController.js';
import { VFXSystem } from './vfx.js';
import { ToonShader } from './ToonShader.js';
import { DayNight } from './DayNight.js';
import { npcs, quests, locations, ICON_SYSTEM, MODEL_SYSTEM, DIALOGUE } from './config.js';
import { IconManager } from './IconManager.js';
import { ModelManager } from './ModelManager.js';

// Global state
let started = false;
let isDialogueOpen = false;
let hasWon = false;
let activeNpc = null;
let visitedNpcs = new Set();
let lastNearNpcId = null;
let mouseTarget = null;
let activeLoc = null;
let locTimeout = null;
let locCooldownUntil = 0;
let locNameTypewriter = null;
const keys = {};

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

// Inventory
let inventory = [];

// DOM elements
const elStartScreen       = document.getElementById('start-screen');
const elWinScreen         = document.getElementById('win-screen');
const elWorldPrompt       = document.getElementById('world-prompt');
const elLocalDialogueBox  = document.getElementById('local-dialogue-box');
const elBubbleContainer   = document.getElementById('bubble-text-container'); // NEW: chat history
const elBubbleChoices     = document.getElementById('bubble-choices');
const elNpcNameDisplay    = document.getElementById('npc-name-display');
const elNpcBubble         = document.getElementById('npc-bubble');
const elLocName           = document.getElementById('loc-name');
const elLocBox            = document.getElementById('loc-box');

console.log('[init] DOM elements loaded:', {
    elBubbleContainer: !!elBubbleContainer,
    elBubbleChoices: !!elBubbleChoices,
    elLocalDialogueBox: !!elLocalDialogueBox,
    elWorldPrompt: !!elWorldPrompt
});

const panelQuest   = document.getElementById('panel-quest');
const panelInv     = document.getElementById('panel-inv');
const panelActions = document.getElementById('panel-actions');
const btnQuest     = document.getElementById('btn-quest-toggle');
const btnInv       = document.getElementById('btn-inv-toggle');
const btnActions   = document.getElementById('btn-actions-toggle');
const btnSound     = document.getElementById('btn-sound-toggle');
const btnCycleToggle = document.getElementById('btn-cycle-toggle');
const btnStart     = document.getElementById('btn-start');
const btnReplay    = document.getElementById('btn-replay');
const elQuestList  = document.getElementById('quest-list');
const elInvList    = document.getElementById('inv-list');
const elActionsList = document.getElementById('actions-list');

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

            // After typingDelay, replace with actual filler message
            setTimeout(() => {
                elBubbleContainer.removeChild(typingBubble);
                appendMessage(FILLER_LINES[i % FILLER_LINES.length], 'npc');
            }, DIALOGUE.typingDelay);
        }, typingStartDelay);
    }
}

// UI update
function updateUI() {
    // Inventory list
    elInvList.innerHTML = inventory.length ? inventory.map(i => {
        let iconType = 'circle';
        if (i.includes('CELL')) iconType = 'memory';
        else if (i.includes('SHARD')) iconType = 'gem';

        if (ICON_SYSTEM === 'svg') {
            const iconEl = iconMgr.createIconElement(iconType, { size: '1em' });
            const div = document.createElement('div');
            div.className = 'item';
            div.appendChild(iconEl);
            const span = document.createElement('span');
            span.textContent = i;
            div.appendChild(span);
            return div.outerHTML;
        } else {
            return `<div class="item"><i class="fas fa-${iconType}"></i> ${i}</div>`;
        }
    }).join('') : "0_CELLS";

    // Actions list
    const actions = actionMgr.getActions();
    elActionsList.innerHTML = actions.length ?
        actions.map(a => {
            const iconEl = iconMgr.createIconElement(a.iconType || a.icon, { size: '1.2em' });
            const div = document.createElement('div');
            div.className = 'item';
            div.appendChild(iconEl);
            const span = document.createElement('span');
            span.textContent = a.name;
            div.appendChild(span);
            if (a.uses !== undefined) {
                const usesEl = document.createElement('small');
                usesEl.style.marginLeft = '0.5em';
                usesEl.textContent = a.uses === -1 ? '∞' : `(${a.uses})`;
                div.appendChild(usesEl);
            }
            return div.outerHTML;
        }).join('') : "NO_ACTIONS";

    // Quest list
    elQuestList.innerHTML = quests.map(q => {
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

    quests.forEach(q => {
        if (!q.completed && q.cur >= q.tar) {
            q.completed = true;
            audio.playQuestComplete();
        }
    });

    checkWinCondition();
}

// Win condition check
function checkWinCondition() {
    if (hasWon) return;
    const allDone = quests.every(q => q.cur >= q.tar);
    if (allDone) {
        hasWon = true;
        setTimeout(triggerWinSequence, 1500);
    }
}

// Win sequence
function triggerWinSequence() {
    isDialogueOpen = true;
    player.sleep();
    mouseTarget = null;
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

        // Render choices after: messageDelay + (fillerCount * fillerDelay) + buffer
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
                    // Small delay before NPC responds, feels more natural
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
                    elBubbleContainer.innerHTML = "";
                    elLocalDialogueBox.style.display = 'none';
                    isDialogueOpen = false;
                    player.wakeUp();
                    player.resetTarget();
                    if (activeNpc) audio.playNpcSound(activeNpc.data.id, 'onExit');
                };
                elBubbleChoices.appendChild(b);
            }
        }, renderDelay);
    } else {
        // Edge case: no text but there are choices (immediate choice)
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
    mouseTarget = null;

    if (activeNpc.data.questId !== undefined && !visitedNpcs.has(activeNpc.data.id)) {
        visitedNpcs.add(activeNpc.data.id);
        quests[activeNpc.data.questId].cur = 1;
        updateUI();
    }

    isDialogueOpen = true;
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
            const q = quests[activeNpc.data.questId];
            const status = q.cur >= q.tar ? '✓ COMPLETED' : `QUEST [${q.cur}/${q.tar}]`;
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
                    isDialogueOpen = false;
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
    setButtonIcon(btnActions, 'actions');
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
    npcSystem = new NPCSystem(npcs, worldMgr.planetR, sceneMgr.scene, modelMgr, toonShader);
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

    gameLoop();
}

function setupInputs() {
    window.addEventListener('keydown', e => {
        keys[e.code] = true;
        if (e.code === 'Space' && started && !isDialogueOpen) {
            e.preventDefault();
            e.stopPropagation();
            if (player.jump()) playBeep(300, "sine", 0.05);
        }
    });

    window.addEventListener('keyup', e => {
        keys[e.code] = false;
    });

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener('mousedown', e => {
        if (!started || isDialogueOpen) return;
        if (e.target.closest('.ui-toggle') || e.target.closest('.panel') ||
            e.target.closest('.overlay') || e.target.closest('#wipe-overlay')) return;

        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, sceneMgr.camera);
        const hits = raycaster.intersectObject(worldMgr.planet);
        if (hits.length) mouseTarget = hits[0].point;
    });

    window.addEventListener('resize', () => {
        sceneMgr.handleResize();
    });
}

function setupUIHandlers() {
    btnStart.onclick = () => {
        const wipe = document.getElementById('wipe-overlay');
        wipe.classList.add('active');
        audio.resumeAudioContext(audioCtx);
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

    elActionsList.addEventListener('click', (e) => {
        const actionDiv = e.target.closest('.item');
        if (!actionDiv) return;
        const actions = actionMgr.getActions();
        const actionName = actionDiv.querySelector('span')?.textContent?.trim();
        const action = actions.find(a => a.name === actionName);
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

    elWorldPrompt.onclick = startDialogue;
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

    // Update trail particles (fade and remove)
    for (let i = vfx.trailParticles.length - 1; i >= 0; i--) {
        const p = vfx.trailParticles[i];
        p.life -= 0.015; // Slow fade rate
        const scale = Math.max(0.1, p.life);
        p.mesh.scale.setScalar(scale);
        p.mesh.material.opacity = Math.max(0, p.life);
        if (p.life <= 0) {
            sceneMgr.scene.remove(p.mesh);
            if (p.mesh.geometry) p.mesh.geometry.dispose();
            if (p.mesh.material) p.mesh.material.dispose();
            vfx.trailParticles.splice(i, 1);
        }
    }

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
    activeNpc = nearestNpc;

    // NPC interaction prompt
    if (activeNpc && !isDialogueOpen && activeNpc.data.hasDialogue) {
        elWorldPrompt.style.display = 'block';
        elWorldPrompt.innerText = `CONNECT_TO_${activeNpc.data.name}`;
        if (activeNpc.data.questId !== undefined && quests[activeNpc.data.questId].cur < quests[activeNpc.data.questId].tar) {
            elWorldPrompt.innerHTML = `CONNECT_TO_${activeNpc.data.name} <span style="color:var(--accent-success)"> [QUEST]</span>`;
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
        if (lastNearNpcId !== null && !isDialogueOpen) {
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

        if (curLoc.questId !== undefined && quests[curLoc.questId].cur < quests[curLoc.questId].tar) {
            quests[curLoc.questId].cur = 1;
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
        if (itemName.startsWith('CELL') && quests[1].cur < quests[1].tar) {
            quests[1].cur++;
            if (quests[1].cur === quests[1].tar) audio.playQuestComplete();
        }
        if (itemName.startsWith('SHARD') && quests[2].cur < quests[2].tar) {
            quests[2].cur++;
            if (quests[2].cur === quests[2].tar) audio.playQuestComplete();
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
        if (nonDialogueNpc.data.questId !== undefined && quests[nonDialogueNpc.data.questId].completed) {
            txt = nonDialogueNpc.data.bubbleMsgComplete || txt;
        }
        elNpcBubble.innerHTML = `<b>${txt}</b>`;
        elNpcBubble.style.display = 'block';
    } else {
        elNpcBubble.style.display = 'none';
    }

    // Movement (head-based pivot)
    let moveDir = new THREE.Vector3(0, 0, 0);

    if (!isDialogueOpen) {
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

        if (mouseTarget) {
            const toMouse = mouseTarget.clone().sub(pPos).projectOnPlane(up);
            if (toMouse.length() > 2) moveDir.add(toMouse.normalize());
            else mouseTarget = null;
        }
    }

    player.applyMovement(moveDir);

    cameraCtrl.follow(pPos, player.camHeading, up);

    actionMgr.renderFloatingIcon(sceneMgr.camera, pPos);

    sceneMgr.render();
}

// Start
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('start-screen').style.display = 'flex';
    }, 1500);
});

window.addEventListener('DOMContentLoaded', init);
