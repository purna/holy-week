/**
 * Messenger 3D - Main Entry Point
 * Modular architecture preserving all functionality from inline code
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
import { npcs, quests, locations } from './config.js';

// Global state
let started = false;
let isDialogueOpen = false;
let hasWon = false;
let activeNpc = null;
let visitedNpcs = new Set();
let lastNearNpcId = null;
let mouseTarget = null;
let activeLoc = null;
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

// Inventory
let inventory = [];

// DOM elements
const elStartScreen = document.getElementById('start-screen');
const elWinScreen = document.getElementById('win-screen');
const elWorldPrompt = document.getElementById('world-prompt');
const elLocalDialogueBox = document.getElementById('local-dialogue-box');
const elBubbleText = document.getElementById('bubble-text');
const elBubbleChoices = document.getElementById('bubble-choices');
const elNpcNameDisplay = document.getElementById('npc-name-display');
const elNpcBubble = document.getElementById('npc-bubble');
const elLocName = document.getElementById('loc-name');
const elLocBox = document.getElementById('loc-box');

const panelQuest = document.getElementById('panel-quest');
const panelInv = document.getElementById('panel-inv');
const panelActions = document.getElementById('panel-actions');
const btnQuest = document.getElementById('btn-quest-toggle');
const btnInv = document.getElementById('btn-inv-toggle');
const btnActions = document.getElementById('btn-actions-toggle');
const btnSound = document.getElementById('btn-sound-toggle');
const btnStart = document.getElementById('btn-start');
const btnReplay = document.getElementById('btn-replay');
const elQuestList = document.getElementById('quest-list');
const elInvList = document.getElementById('inv-list');
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

// UI update
function updateUI() {
    elInvList.innerHTML = inventory.length ? inventory.map(i => {
        let icon = 'fa-circle';
        if (i.includes('CELL')) icon = 'fa-memory';
        else if (i.includes('SHARD')) icon = 'fa-gem';
        return `<div class="item"><i class="fas ${icon}"></i> ${i}</div>`;
    }).join('') : "0_CELLS";

    elActionsList.innerHTML = actionMgr.getActions().length ?
        actionMgr.getActions().map(a => `<div class="item"><i class="${a.icon}"></i> ${a.name}</div>`).join('') :
        "NO_ACTIONS";

    elQuestList.innerHTML = quests.map(q => {
        const iconClass = q.cur >= q.tar ? 'fa-solid fa-square-check' : 'fa-regular fa-square-check';
        return `<div class="q-item ${q.cur >= q.tar ? 'q-done' : ''}"><i class="${iconClass}"></i> <b>${q.name}</b><small>${q.task} [${q.cur}/${q.tar}]</small></div>`;
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

// Ink dialogue continuation
function continueStory() {
    let txt = "";
    while (dialogueMgr.inkStory.canContinue) {
        txt += dialogueMgr.inkStory.Continue();
    }

    const cleaned = stripInkMarkers(txt);
    elBubbleText.innerHTML = cleaned;
    elBubbleChoices.innerHTML = "";

    dialogueMgr.inkStory.currentChoices.forEach(c => {
        const b = document.createElement('button');
        b.className = "choice-btn";
        b.innerText = c.text;
        b.onclick = () => {
            dialogueMgr.inkStory.ChooseChoiceIndex(c.index);
            continueStory();
        };
        elBubbleChoices.appendChild(b);
    });

    if (dialogueMgr.inkStory.currentChoices.length === 0 && !dialogueMgr.inkStory.canContinue) {
        const b = document.createElement('button');
        b.className = "choice-btn";
        b.innerText = "[CLOSE CONNECTION]";
        b.onclick = () => {
            elLocalDialogueBox.style.display = 'none';
            isDialogueOpen = false;
            player.wakeUp();
            player.resetTarget();
            if (activeNpc) audio.playNpcSound(activeNpc.data.id, 'onExit');
        };
        elBubbleChoices.appendChild(b);
    }
}

// Start dialogue (click on world prompt)
function startDialogue() {
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
    elLocalDialogueBox.style.display = 'block';

    audio.playNpcSound(activeNpc.data.id, 'onEnter');

    try {
        const storyData = dialogueMgr.getStory(activeNpc.data.id);
        dialogueMgr.inkStory = new inkLib.Story(storyData);

        if (activeNpc.data.questId !== undefined) {
            const q = quests[activeNpc.data.questId];
            const status = q.cur >= q.tar ? '✓ COMPLETED' : `QUEST [${q.cur}/${q.tar}]`;
            elNpcNameDisplay.innerHTML = `${activeNpc.data.name} <span style="color:var(--accent-success);font-size:0.7em">- ${status}</span>`;
        } else {
            elNpcNameDisplay.innerText = activeNpc.data.name;
        }

        continueStory();
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
  // Close other panels when opening this one
  if (!isOpen) {
    otherBtn1.classList.remove('active');
    otherBtn2.classList.remove('active');
    otherPanel1.classList.remove('open');
    otherPanel2.classList.remove('open');
  }
  audio.playUI(isOpen ? 'close' : 'open');
}

// Initialize all systems
async function init() {
    sceneMgr = new SceneManager();
    worldMgr = new WorldManager(sceneMgr.scene, sceneMgr.world);
    player = new Player(worldMgr.world, sceneMgr.scene);
    npcSystem = new NPCSystem(npcs, worldMgr.planetR, sceneMgr.scene);
    actionMgr = new ActionManager();
    dialogueMgr = new DialogueManager();
    audio = new AudioManager();
    cameraCtrl = new CameraController(sceneMgr.camera);

    // Initialize typewriter for location names
    locNameTypewriter = new Typewriter(document.getElementById('loc-name'), { speed: 45 });

    await dialogueMgr.loadAllStories();
    dialogueMgr.setInkLib(window.inkjs || window.ink);

    setupInputs();
    setupUIHandlers();

    gameLoop();
}

function setupInputs() {
    // Keyboard
    window.addEventListener('keydown', e => {
        keys[e.code] = true;
        if (e.code === 'Space' && started && !isDialogueOpen) {
            if (player.jump()) playBeep(300, "sine", 0.05);
        }
    });

    window.addEventListener('keyup', e => {
        keys[e.code] = false;
    });

    // Mouse click for movement
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
    // Start button
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

    // Replay button
    btnReplay.onclick = () => {
        audio.playUI('click');
        location.reload();
    };

    // Sound toggle
    btnSound.onclick = (e) => {
        e.stopPropagation();
        audio.playUI('click');
        const enabled = audio.toggleMusic();
        btnSound.innerHTML = enabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-off"></i>';
    };

    // Panel toggles
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

    // Actions click
    elActionsList.addEventListener('click', (e) => {
        const actionDiv = e.target.closest('.item');
        if (!actionDiv) return;
        const actionIndex = Array.from(actionDiv.parentNode.children).indexOf(actionDiv);
        const action = actionMgr.getActions()[actionIndex];
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

    if (!started) {
        sceneMgr.render();
        return;
    }

    // Find nearest NPC
    let nearestNpc = null;
    let nearestDist = Infinity;

    for (const npcObj of npcSystem.npcMeshes) {
        // Bobbing animation
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
    if (curLoc && activeLoc !== curLoc) {
        activeLoc = curLoc;
        const displayName = curLoc.name.replace('LOC_', '').replace(/_/g, ' ');
        elLocBox.style.display = 'block';
        locNameTypewriter.type(displayName);
        if (curLoc.questId !== undefined && quests[curLoc.questId].cur < quests[curLoc.questId].tar) {
            quests[curLoc.questId].cur = 1;
            updateUI();
        }
    } else if (!curLoc) {
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
        const txt = nonDialogueNpc.data.bubbleMsg || nonDialogueNpc.data.name.replace('_', ' ');
        elNpcBubble.innerHTML = `<b>${txt}</b>`;
        elNpcBubble.style.display = 'block';
    } else {
        elNpcBubble.style.display = 'none';
    }

     // Movement (head-based pivot)
     let moveDir = new THREE.Vector3(0, 0, 0);

     if (!isDialogueOpen) {
         // A/D rotates camHeading (player orientation)
         const viewRight = new THREE.Vector3().crossVectors(up, player.camHeading).normalize();
         if (keys['KeyA'] || keys['ArrowLeft']) {
             player.camHeading.add(viewRight.clone().multiplyScalar(0.045)).normalize();
         }
         if (keys['KeyD'] || keys['ArrowRight']) {
             player.camHeading.sub(viewRight.clone().multiplyScalar(0.045)).normalize();
         }

         // Re-flatten camHeading onto planet surface to prevent tilting
         player.camHeading.copy(player.camHeading.projectOnPlane(up).normalize());

         // W/S moves along horizontal camHeading
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

    // Camera follow
    cameraCtrl.follow(pPos, player.camHeading, up);

    // Floating action icons
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
