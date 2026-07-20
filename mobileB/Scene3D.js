/**
 * Scene3D - Manages the embedded 3D scene in the Scene tab
 * Uses doubled world size (planet radius 100) and toon shader styling
 */
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { SceneManager } from '../js/core/sceneManager.js';
import { WorldManager } from '../js/core/worldManager.js';
import { Player } from '../js/core/player.js';
import { CameraController } from '../js/core/CameraController.js';
import { ToonShader } from '../js/core/ToonShader.js';
import { ModelManager } from '../js/core/modelManager.js';
import { VFXSystem } from '../js/core/VFXSystem.js';
import { DayNight } from '../js/core/DayNight.js';
import { NPC } from '../js/NPC.js';
import { locations as locationConfig } from '../js/config.js';

// Toon shader styling constants (matching toonshader.html)
const TOON_COLORS = {
    bg: 0x010105,
    planet: 0x1a251a,
    player: 0xff3333,
    npc: 0x00f2ff,
    pickup: 0xffaa00
};

// Grid scene data cache
const gridSceneCache = {};

export class Scene3D {
    constructor(ui) {
        this.ui = ui;
        this.sceneMgr = null;
        this.worldMgr = null;
        this.player = null;
        this.npcSystem = null;
        this.cameraCtrl = null;
        this.modelMgr = null;
        this.toonShader = null;
        this.dayNight = null;
        this.vfx = null;
        this.running = false;
        this.gameKeys = window.gameKeys || {};
        this.mouseTarget = null;
        this.npcMeshes = [];
        this.evidencePickups = [];
        this.gridData = null;
        this.container = null;
        this.introOverlay = null;
        this.locOverlay = null;
    }

    async init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.showLoading();

        // Initialize Three.js scene with container
        this.sceneMgr = new SceneManager(this.container);

        this.modelMgr = new ModelManager();
        await this.modelMgr.init();

        this.toonShader = new ToonShader();
        
        this.worldMgr = new WorldManager(this.sceneMgr.scene, this.sceneMgr.world, this.modelMgr, this.toonShader);
        this.sceneMgr.setPlanetRadius(this.worldMgr.planetR);
        
        this.player = new Player(this.worldMgr.world, this.sceneMgr.scene, this.modelMgr, this.toonShader);
        window.player = this.player;
        
        // Setup resize handler for container
        this.setupResizeHandler();
        
        this.cameraCtrl = new CameraController(this.sceneMgr.camera);
        
        this.dayNight = new DayNight(this.sceneMgr.scene, this.sceneMgr.renderer);
        
        this.vfx = new VFXSystem(this.sceneMgr.scene, this.worldMgr.planet, this.worldMgr.planetR, this.worldMgr.planetMesh);
        this.dayNight.registerPlayerEffects(this.player.torch, this.player.bodyMaterial);

        this.dayNight.onModeChange = (isNight) => {
            this.vfx.setNightMode(isNight);
        };

        // Setup event listeners
        this.setupInteractions();
        
        // Setup UI overlays
        this.setupSceneIntro();
        this.setupLocOverlay();
        this.setupMobileControls();
        this.setupKeyboardControls();
        
        // Load NPCs and evidence after scene is initialized
        const caseId = this.ui.cm.getActiveCase()?.id;
        this.gridData = await this.loadGridScene(caseId);
        
        // Apply environment from grid or case defaults
        const c = this.ui.cm.getActiveCase();
        const timeOfDay = this.gridData?.timeOfDay || c?.timeOfDay || 'day';
        
        // Set day/night mode based on timeOfDay
        if (timeOfDay === 'night') {
            this.dayNight.setMode(false);
        } else {
            this.dayNight.setMode(true);
        }
        
        if (this.gridData) {
            this.loadPrimitives(this.gridData.primitives || []);
            // Show location title from grid data on init
            if (this.gridData.locationTitle) {
                this.showLocation(this.gridData.locationTitle);
            }
        }
        this.loadNPCs();
        this.loadEvidence();
        
        this.hideLoading();
        this.running = true;
        this.gameLoop();
    }

    async loadGridScene(caseId) {
        if (!caseId) return null;
        if (gridSceneCache[caseId]) {
            return gridSceneCache[caseId];
        }
        try {
            const response = await fetch(`../assets/grids/${caseId}.json`);
            if (!response.ok) {
                console.warn(`Could not load grid scene for ${caseId}: HTTP ${response.status}`);
                return null;
            }
            const data = await response.json();
            gridSceneCache[caseId] = data;
            return data;
        } catch (e) {
            console.warn(`Could not load grid scene for ${caseId}:`, e);
            return null;
        }
    }

    setupResizeHandler() {
        const resizeObserver = new ResizeObserver(() => {
            this.sceneMgr.handleResize();
        });
        if (this.container) {
            resizeObserver.observe(this.container);
        }
    }

    showLoading() {
        const loading = document.createElement('div');
        loading.id = 'scene-loading';
        loading.innerHTML = `
            <div class="spinner"></div>
            <p>Initializing 3D Scene...</p>
        `;
        this.container.appendChild(loading);
    }

    hideLoading() {
        const loading = document.getElementById('scene-loading');
        if (loading) loading.remove();
    }

    setupSceneIntro() {
        const intro = document.createElement('div');
        intro.id = 'scene-intro';
        intro.className = 'scene-intro hidden';
        intro.innerHTML = `
            <button class="scene-intro-close" onclick="window.scene3d.closeIntro()" aria-label="Close intro">✕</button>
            <div class="scene-intro-content">
                <h2>Investigate the Scene</h2>
                <p>Navigate the 3D world to find clues and talk to witnesses.</p>
                <button class="lets-investigate-btn" onclick="window.scene3d.closeIntro()">Let's Investigate</button>
            </div>
        `;
        this.container.appendChild(intro);
        this.introOverlay = intro;
    }

    showIntro() {
        if (this.introOverlay) {
            this.introOverlay.classList.remove('hidden');
        }
    }

    closeIntro() {
        if (this.introOverlay) {
            this.introOverlay.classList.add('hidden');
        }
        // Mark scene as viewed
        const c = this.ui.cm.getActiveCase();
        if (c) {
            const prog = this.ui.cm.getCaseProgress(c.id);
            if (prog) prog.sceneViewed = true;
        }
    }

    setupLocOverlay() {
        // Location box (shows current location name)
        const loc = document.createElement('div');
        loc.id = 'scene-loc-overlay';
        loc.className = 'scene-loc-overlay';
        loc.innerHTML = `
            <div class="scene-loc-content">
                <h2 id="scene-loc-name">LOCATION_NAME</h2>
            </div>
        `;
        this.container.appendChild(loc);
        this.locOverlay = loc;

        // World prompt (shows NPC name when near)
        const prompt = document.createElement('div');
        prompt.id = 'scene-world-prompt';
        prompt.className = 'interact-prompt';
        prompt.style.display = 'none';
        prompt.textContent = 'CONNECT_TO_UNIT';
        this.container.appendChild(prompt);
        this.worldPrompt = prompt;
    }

    showLocation(name) {
        if (this.locOverlay) {
            const nameEl = document.getElementById('scene-loc-name');
            if (nameEl) {
                // Use grid locationTitle if available, otherwise clean up the location name
                const displayName = this.gridData?.locationTitle || name.replace('LOC_', '').replace(/_/g, ' ');
                nameEl.textContent = displayName;
            }
            this.locOverlay.classList.add('visible');
            clearTimeout(this._locTimeout);
            this._locTimeout = setTimeout(() => {
                this.locOverlay.classList.remove('visible');
            }, 3000);
        }
    }

    setupMobileControls() {
        const ctrl = document.createElement('div');
        ctrl.id = 'scene-mobile-ctrl';
        ctrl.className = 'visible'; // Show by default on mobile
        ctrl.innerHTML = `
            <button id="scene-ctrl-up" class="ui-toggle" aria-label="Move Forward"><i class="fas fa-chevron-up"></i></button>
            <button id="scene-ctrl-left" class="ui-toggle" aria-label="Turn Left"><i class="fas fa-chevron-left"></i></button>
            <button id="scene-ctrl-jump" class="ui-toggle" aria-label="Jump"><i class="fas fa-circle"></i></button>
            <button id="scene-ctrl-right" class="ui-toggle" aria-label="Turn Right"><i class="fas fa-chevron-right"></i></button>
            <button id="scene-ctrl-down" class="ui-toggle" aria-label="Move Backward"><i class="fas fa-chevron-down"></i></button>
        `;
        this.container.appendChild(ctrl);
        this.mobileCtrl = ctrl;

        // Bind mobile controls
        this.bindMobileControls();
    }

    bindMobileControls() {
        const bindBtn = (id, key) => {
            const btn = document.getElementById(id);
            if (!btn) return;
            let active = false;
            const start = (e) => {
                e.preventDefault();
                this.gameKeys[key] = true;
                btn.classList.add('active');
            };
            const end = (e) => {
                e.preventDefault();
                delete this.gameKeys[key];
                btn.classList.remove('active');
                this.mouseTarget = null;
            };
            btn.addEventListener('touchstart', start);
            btn.addEventListener('touchend', end);
            btn.addEventListener('mousedown', start);
            btn.addEventListener('mouseup', end);
            btn.addEventListener('mouseleave', end);
        };

        bindBtn('scene-ctrl-up', 'KeyW');
        bindBtn('scene-ctrl-down', 'KeyS');
        bindBtn('scene-ctrl-left', 'KeyA');
        bindBtn('scene-ctrl-right', 'KeyD');

        // Bind jump button
        const jumpBtn = document.getElementById('scene-ctrl-jump');
        if (jumpBtn) {
            const jumpStart = (e) => {
                e.preventDefault();
                this.gameKeys['Space'] = true;
                jumpBtn.classList.add('active');
                this.player.jump();
            };
            const jumpEnd = (e) => {
                e.preventDefault();
                delete this.gameKeys['Space'];
                jumpBtn.classList.remove('active');
            };
            jumpBtn.addEventListener('touchstart', jumpStart);
            jumpBtn.addEventListener('touchend', jumpEnd);
            jumpBtn.addEventListener('mousedown', jumpStart);
            jumpBtn.addEventListener('mouseup', jumpEnd);
            jumpBtn.addEventListener('mouseleave', jumpEnd);
        }
    }

    setupKeyboardControls() {
        const movementKeys = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        
        const onKeyDown = (e) => {
            if (e.repeat) return;
            const code = e.code;
            if (code === 'Space') {
                e.preventDefault();
                this.gameKeys['Space'] = true;
                if (this.player) this.player.jump();
            } else if (movementKeys.includes(code)) {
                e.preventDefault();
                this.gameKeys[code] = true;
            }
        };
        
        const onKeyUp = (e) => {
            const code = e.code;
            if (code === 'Space') {
                delete this.gameKeys['Space'];
            } else if (movementKeys.includes(code)) {
                delete this.gameKeys[code];
                this.mouseTarget = null;
            }
        };
        
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
    }

    setupInteractions() {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handleClick = (x, y, target) => {
            if (target.closest('button, .ui-toggle, .scene-intro, .scene-intro-close')) return;
            
            mouse.x = (x / window.innerWidth) * 2 - 1;
            mouse.y = -(y / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouse, this.sceneMgr.camera);
            const hits = raycaster.intersectObject(this.worldMgr.planet);
            if (hits.length) this.mouseTarget = hits[0].point;
        };

        window.addEventListener('mousedown', e => handleClick(e.clientX, e.clientY, e.target));
        window.addEventListener('touchstart', e => {
            if (e.touches.length > 0) handleClick(e.touches[0].clientX, e.touches[0].clientY, e.target);
        });
    }

    loadNPCs() {
        const c = this.ui.cm.getActiveCase();
        if (!c) return;

        const gridNPCs = this.gridData?.npcs || [];

        // The People tab lists case npcs — make the Scene match it exactly so
        // every witness you can interview also appears in the world. Skip
        // non-people entries (e.g. the "none / No One" suspect) and NPCs that
        // explicitly opt out of dialogue.
        const caseNPCs = (c.npcs || []).filter(n =>
            n && n.id && n.id !== 'none' && n.hasDialogue !== false
        );

        // Build a scene NPC list: prefer explicit grid positions/colors, otherwise
        // auto-place in a ring so every people-tab NPC gets a spot in the world.
        const placedPositions = [];
        const npcs = caseNPCs.map((npc, i) => {
            const gridMatch = gridNPCs.find(g => g.id === npc.id);
            let pos = gridMatch?.pos;
            let color = gridMatch?.color || npc.color;
            if (!pos) {
                // Ring layout around origin (flat scene, y = 0 ground)
                const angle = (i / Math.max(1, caseNPCs.length)) * Math.PI * 2;
                const radius = 8 + (i % 3) * 2;
                pos = [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
                placedPositions.push(pos);
            }
            return { ...npc, pos, color, hasDialogue: npc.hasDialogue !== false, isGridNPC: true };
        });
        if (!npcs.length) return;

        // Clear existing NPCs
        this.npcMeshes.forEach(n => {
            if (n && n.mesh && n.mesh.parent) this.sceneMgr.scene.remove(n.mesh);
        });
        this.npcMeshes = [];

        // Create NPCs for this case with proper positioning
        npcs.forEach(npc => {
            if (npc) {
                const mesh = new NPC(npc, this.worldMgr.planetR, this.sceneMgr.scene, this.modelMgr, this.toonShader);
                this.npcMeshes.push(mesh);
                this.addNPCButton(npc, mesh.mesh);
            }
        });

        // Store on window for UIManager to access
        window.sceneNPCs = this.npcMeshes;
    }

    loadPrimitives(primitives) {
        primitives.forEach(p => {
            let geo;
            const color = p.color || 0x888888;
            const pos = p.pos || [0, 0, 0];
            const scale = p.scale || [1, 1, 1];
            
            if (p.type === 'box') {
                geo = new THREE.BoxGeometry(scale[0], scale[1], scale[2]);
            } else if (p.type === 'cylinder') {
                geo = new THREE.CylinderGeometry(scale[0], scale[0], scale[1], 16);
            } else {
                geo = new THREE.BoxGeometry(1, 1, 1);
            }
            
            const mat = this.toonShader.createToonMaterial(color);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(pos[0], pos[1], pos[2]);
            mesh.receiveShadow = true;
            mesh.castShadow = true;
            mesh.name = p.name || p.type;
            this.sceneMgr.scene.add(mesh);
        });
    }

    loadEvidence() {
        const c = this.ui.cm.getActiveCase();
        if (!c) return;
        
        // Use grid data evidence if available, otherwise fall back to case evidencePool
        const evidence = this.gridData?.evidence || c.evidencePool;
        if (!evidence) return;

        // Clear existing evidence pickups
        this.evidencePickups = [];

        const prog = this.ui.cm.getCaseProgress(c.id);
        const unlocked = prog?.unlockedEvidence || [];
        const collected = prog?.collectedEvidence || [];
        
        evidence.forEach(ev => {
            // Spawn evidence that is unlocked but not yet collected
            if (unlocked.includes(ev.id) && !collected.includes(ev.id)) {
                // Position evidence using Cartesian coordinates from grid
                const surfacePos = new THREE.Vector3(ev.pos[0], ev.pos[1], ev.pos[2]);
                const evMesh = this.createEvidenceMesh(ev, surfacePos);
                this.evidencePickups.push({ id: ev.id, mesh: evMesh, data: ev });
            }
        });
    }

    createEvidenceMesh(ev, pos) {
        const evToon = this.toonShader.createToonGroup(
            new THREE.BoxGeometry(1.2, 1.2, 1.2),
            TOON_COLORS.pickup,
            0.08
        );
        evToon.group.position.copy(pos);
        // No orientation needed for flat scene - evidence sits on ground
        evToon.group.name = ev.id;
        this.sceneMgr.scene.add(evToon.group);
        return evToon.group;
    }

    addNPCButton(npc, mesh) {
        // Create name tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'scene-npc-name-tooltip';
        tooltip.dataset.npcName = npc.id;
        tooltip.textContent = npc.name || npc.id;
        this.container.appendChild(tooltip);

        // Create talk button
        const btn = document.createElement('button');
        btn.className = 'scene-npc-talk-btn';
        btn.dataset.npcId = npc.id;
        btn.innerHTML = `<i class="fas fa-comment"></i> Talk`;
        btn.onclick = () => {
            const npcObj = this.npcMeshes.find(n => n.data && n.data.id === npc.id);
            if (npcObj) {
                // Discover the NPC so it unlocks in the People tab
                if (this.ui && this.ui.discoverNPC) this.ui.discoverNPC(npc.id);

                // Handle evidence unlocks from grid NPC dialogue
                const unlocks = npc.unlocksEvidence || [];
                if (unlocks.length > 0) {
                    unlocks.forEach(id => {
                        this.ui.es.discover(id);
                        // Add to unlocked evidence for scene spawning
                        const prog = this.ui.cm.getCaseProgress(this.ui.cm.getActiveCase()?.id);
                        if (prog) {
                            if (!prog.unlockedEvidence) prog.unlockedEvidence = [];
                            if (!prog.unlockedEvidence.includes(id)) {
                                prog.unlockedEvidence.push(id);
                            }
                            this.ui.cm._saveProgress();
                        }
                    });
                    this.ui.renderLab();
                    this.spawnUnlockedEvidence();
                }
                this.ui.handleNpcInteraction('talk', npc.id);
            }
        };
        this.container.appendChild(btn);
    }

    gameLoop() {
        if (!this.running) return;
        
        requestAnimationFrame(() => this.gameLoop());

        this.worldMgr.world.step(1 / 60);
        
        const pPos = this.player.getPosition();
        const up = pPos.clone().normalize();
        
        this.player.update();
        this.dayNight.update(1 / 60);
        this.vfx.update(1 / 60, pPos, new THREE.Vector3(), pPos.length() < this.worldMgr.planetR + 1.6);
        
        // Update NPC bobbing
        this.npcMeshes.forEach(npc => {
            if (npc && npc.updateBobbing) npc.updateBobbing();
        });
        
        // Movement
        let moveDir = new THREE.Vector3(0, 0, 0);
        const viewRight = new THREE.Vector3().crossVectors(up, this.player.camHeading).normalize();
        
        if (this.gameKeys['KeyA'] || this.gameKeys['ArrowLeft']) {
            this.player.camHeading.add(viewRight.clone().multiplyScalar(0.045)).normalize();
        }
        if (this.gameKeys['KeyD'] || this.gameKeys['ArrowRight']) {
            this.player.camHeading.sub(viewRight.clone().multiplyScalar(0.045)).normalize();
        }
        
        const headingFlat = this.player.camHeading.clone().projectOnPlane(up).normalize();
        if (this.gameKeys['KeyW'] || this.gameKeys['ArrowUp']) moveDir.add(headingFlat);
        if (this.gameKeys['KeyS'] || this.gameKeys['ArrowDown']) moveDir.sub(headingFlat);
        
        if (moveDir.lengthSq() > 0) this.mouseTarget = null;
        
        if (this.mouseTarget) {
            const toMouse = this.mouseTarget.clone().sub(pPos).projectOnPlane(up);
            if (toMouse.length() > 2) moveDir.add(toMouse.normalize());
            else this.mouseTarget = null;
        }
        
        this.player.applyMovement(moveDir);
        this.cameraCtrl.follow(pPos, this.player.camHeading, up);
        
        // Check for nearby NPCs and show talk button
        this.updateNPCPrompt(pPos, up);

        // Check for evidence pickup
        this.checkEvidencePickup(pPos);
        
        // Check for location proximity
        this.checkLocationProximity(pPos);
        
        this.sceneMgr.render();
    }

    updateNPCPrompt(pPos, up) {
        let nearestNpc = null;
        let nearestDist = Infinity;

        for (const npc of this.npcMeshes) {
            if (!npc || !npc.mesh) continue;
            const dist = pPos.distanceTo(npc.mesh.position);
            if (dist < 16 && dist < nearestDist) {
                nearestDist = dist;
                nearestNpc = npc;
            }
        }

        // Show talk button for nearest NPC when player is within range
        this.container.querySelectorAll('.scene-npc-talk-btn').forEach(btn => btn.style.display = 'none');
        if (nearestNpc) {
            this.npcMeshes.forEach(n => {
                if (!n || !n.data || !n.mesh) return;
                // For grid NPCs on flat scene, just add Y offset; for planet NPCs use normalized vector
                const npcPos = this.gridData?.npcs 
                    ? n.mesh.position.clone().add(new THREE.Vector3(0, 5, 0))
                    : n.mesh.position.clone().add(up.clone().multiplyScalar(4));
                const screenPos = npcPos.project(this.sceneMgr.camera);
                const btn = this.container.querySelector(`[data-npc-id="${n.data.id}"]`);
                if (btn) {
                    const isNearest = n.data.id === nearestNpc.data.id;
                    btn.style.left = (screenPos.x * 0.5 + 0.5) * window.innerWidth + 'px';
                    btn.style.top = (screenPos.y * -0.5 + 0.5) * window.innerHeight + 'px';
                    btn.style.display = isNearest ? 'block' : 'none';
                }
                // Update name tooltip position
                const nameTooltip = this.container.querySelector(`[data-npc-name="${n.data.id}"]`);
                if (nameTooltip) {
                    nameTooltip.style.left = (screenPos.x * 0.5 + 0.5) * window.innerWidth + 'px';
                    nameTooltip.style.top = (screenPos.y * -0.5 + 0.5) * window.innerHeight - 60 + 'px';
                    nameTooltip.style.display = n.data.hasDialogue !== false ? 'block' : 'none';
                }
            });
        }
    }

    checkLocationProximity(pPos) {
        const c = this.ui.cm.getActiveCase();
        if (!c || !c.eventLocation) return;

        // Check if we're at the case location
        const loc = locationConfig.find(l => l.name.toLowerCase().includes(c.eventLocation?.toLowerCase() || ''));
        if (loc) {
            const locPos = new THREE.Vector3().setFromSphericalCoords(
                this.worldMgr.planetR, 
                loc.pos[0] * Math.PI, 
                loc.pos[1] * Math.PI * 2
            );
            if (pPos.distanceTo(locPos) < loc.r) {
                this.showLocation(loc.name);
            }
        }
    }

    checkEvidencePickup(pPos) {
        // Use grid data evidence if available
        const evidence = this.gridData?.evidence || this.ui.cm.getActiveCase()?.evidencePool;
        if (!evidence) return;

        this.evidencePickups.forEach(pickup => {
            if (!pickup.mesh) return;
            const dist = pPos.distanceTo(pickup.mesh.position);
            if (dist < 3) {
                this.sceneMgr.scene.remove(pickup.mesh);
                const idx = this.evidencePickups.findIndex(p => p.id === pickup.id);
                if (idx !== -1) this.evidencePickups.splice(idx, 1);
                
                // Add evidence to player's collection and award points
                const c = this.ui.cm.getActiveCase();
                const prog = this.ui.cm.getCaseProgress(c?.id);
                if (prog) {
                    const isNewSceneCollect = this.ui.cm.recordSceneCollectedEvidence
                        ? this.ui.cm.recordSceneCollectedEvidence(pickup.id, c?.id)
                        : (() => {
                            if (!prog.collectedEvidence) prog.collectedEvidence = [];
                            if (prog.collectedEvidence.includes(pickup.id)) return false;
                            prog.collectedEvidence.push(pickup.id);
                            if (typeof this.ui.cm._saveProgress === "function") this.ui.cm._saveProgress();
                            return true;
                        })();

                    if (isNewSceneCollect) {
                        // Award 5 points per evidence collected (persisted)
                        if (typeof this.ui.cm.addScore === "function") {
                            this.ui.cm.addScore(5);
                        } else {
                            this.ui.cm.progress.totalScore = (this.ui.cm.progress.totalScore || 0) + 5;
                            if (typeof this.ui.cm._saveProgress === "function") this.ui.cm._saveProgress();
                            if (typeof this.ui.cm._refreshMetricsUI === "function") this.ui.cm._refreshMetricsUI();
                        }
                        if (typeof this.ui.es.collect === "function") this.ui.es.collect(pickup.id);
                        else if (typeof this.ui.es.discover === "function") this.ui.es.discover(pickup.id);
                        this.ui.renderLab();
                        this.ui.renderPeople();
                    }
                }
            }
        });
    }

    spawnUnlockedEvidence() {
        const c = this.ui.cm.getActiveCase();
        if (!c) return;
        
        // Use grid data evidence if available
        const evidence = this.gridData?.evidence || c.evidencePool;
        if (!evidence) return;

        const prog = this.ui.cm.getCaseProgress(c.id);
        const collected = prog?.collectedEvidence || [];
        const discovered = this.ui.es.getCollected();
        
        evidence.forEach(ev => {
            // Check if evidence is now unlocked (talked to NPC) or discovered but not spawned
            const unlocked = prog?.unlockedEvidence || [];
            const isAvailable = unlocked.includes(ev.id) || discovered.map(d => d.id).includes(ev.id);
            if (isAvailable && !collected.includes(ev.id)) {
                const alreadySpawned = this.evidencePickups.some(p => p.id === ev.id);
                if (!alreadySpawned) {
                    // Grid uses Cartesian coordinates
                    const surfacePos = new THREE.Vector3(ev.pos[0], ev.pos[1], ev.pos[2]);
                    const evMesh = this.createEvidenceMesh(ev, surfacePos);
                    this.evidencePickups.push({ id: ev.id, mesh: evMesh, data: ev });
                }
            }
        });
    }

    stop() {
        this.running = false;
    }
}