import * as THREE from 'three';
import { CaseManager } from "./caseManager.js";
import { EvidenceSystem } from "./evidenceSystem.js";
import { NPCSystem } from "./NPCSystem.js";
import { DeductionEngine } from "./deductionEngine.js";
import { LocationSystem } from "./locationSystem.js";
import { AccessibilityManager } from "./accessibility.js";
import { AudioManager } from "./audioManager.js";
import { DialogueManager } from "./dialogueManager.js";
import { ControlsManager } from "./controls.js";
import { EnvironmentManager } from "./environment.js";
import { OrbitalSelectMatrixModal } from "./mapModal.js";
import { GLTFLoader } from 'three/loaders/GLTFLoader';

import { act1CaseA, act1CaseB, act1CaseC } from "./act1_case.js";
import { act2CaseA, act2CaseB, act2CaseC } from "./act2_case.js";
import { act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE } from "./act3_case.js";
import { act4CaseA, act4CaseB, act4CaseC } from "./act4_case.js";

const CONFIG = { unlockAllCases: false };

export class GameEngine {
  constructor() {
    this.cm = new CaseManager();
    this.a11y = new AccessibilityManager();
    this.a11y.restorePreferences();
    this.es = new EvidenceSystem(this.cm);
    this.ns = new NPCSystem(this.cm, this.es);
    this.de = new DeductionEngine(this.cm, this.es);
    this.ls = new LocationSystem(this.cm);
    this.audio = new AudioManager();
    this.dm = new DialogueManager(this.audio);

    this.registerAllCases();

    this.activeCaseId = null;

    // --- WORLD DIMENSIONS ---
    this.planetRadius = 500; 
    this.surfaceRadius = 500; // Sync with planet radius to prevent objects being buried
    
    this.pPos = new THREE.Vector3(0, this.surfaceRadius + 1.2, 0); 
    this.pVelocity = new THREE.Vector3();
    this.camHeading = new THREE.Vector3(0, 0, -1); // Player looks towards the "north pole" where NPCs are clustered
    this.isGrounded = true;
    this.nearestNPC = null;
    this.inDialogue = false;
    this.collectedEvidence = [];
    this.npcMeshes = [];
    this.evidenceMeshes = [];
    this.audioActive = true;
    this.currentDisplayPreference = 'emojis';
    this.uiVisibility = { minimap: true, controls: true };
    this.lockedEvidence = {};
    this.controls = new ControlsManager(this);
    this.worldEarth = null;

    // Effects & World Objects
    this.trailParticles = [];
    this.worldObjects = [];
    this.ambientParticles = null;
  }

registerAllCases() {
    const cases = [act1CaseA, act1CaseB, act1CaseC, act2CaseA, act2CaseB, act2CaseC, act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE, act4CaseA, act4CaseB, act4CaseC];
    cases.forEach(c => {
      if (CONFIG.unlockAllCases) c.requires = null;
      this.cm.registerCase(c);
    });
    if (typeof inkjs !== 'undefined') this.dm.setInkLib(inkjs);
  }

  init() {
    const container = document.getElementById('canvas-container');
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xADD8E6); // Light Blue
    this.scene.fog = new THREE.FogExp2(0xADD8E6, 0.0015);

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);

    this._initMobileUI();

    const ambient = new THREE.AmbientLight(0xffffff, 0.5); // Increased ambient light
    this.scene.add(ambient);

    // HemisphereLight provides a natural sky/ground fill, essential for seeing detail on a spherical world
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x888888, 0.8); // Increased intensity
    this.scene.add(this.hemiLight);

    this.sunLight = new THREE.DirectionalLight(0xffffff, 1.5); // Increased sun intensity
    this.sunLight.castShadow = true;
    this.scene.add(this.sunLight);

    this.moonLight = new THREE.DirectionalLight(0x5588ff, 0.8); // Increased moon intensity
    this.scene.add(this.moonLight);

    // Physical Ground Sphere (The surface the player "loads" on)
    const groundGeo = new THREE.SphereGeometry(this.surfaceRadius, 128, 128);
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: 0x556655, // Visible forest green/grey ground
      roughness: 0.9, 
      metalness: 0 
    });
    this.groundSphere = new THREE.Mesh(groundGeo, groundMat);
    this.groundSphere.receiveShadow = true;
    this.scene.add(this.groundSphere);

    const geo = (typeof THREE.CapsuleGeometry !== 'undefined') ? new THREE.CapsuleGeometry(0.5, 1.2, 4, 8) : new THREE.CylinderGeometry(0.5, 0.5, 2.2, 16);
    this.playerMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x00a884, roughness: 0.5 }));
    this.playerMesh.castShadow = true;
    this.playerMesh.position.copy(this.pPos);
    this.scene.add(this.playerMesh);

    this.torchLight = new THREE.PointLight(0x00f2ff, 0, 25, 1.5);
    this.playerMesh.add(this.torchLight);

    this._initAmbientParticles();

    this.envManager = new EnvironmentManager(this.scene, this.sunLight, this.moonLight, this.torchLight, this.audio);

    // Sync audio state with a11y preferences
    const currentSound = this.a11y.soundEnabled;
    this.audio.setEnabled(currentSound);

    this.bindGlobalUIEvents();
    
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  _initMobileUI() {
    const leftSidebar = document.getElementById('left-sidebar');
    const rightSidebar = document.getElementById('right-sidebar');
    const sidebarPanels = document.querySelectorAll('aside .hud-panel');
    const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');

    const closeAllSidebars = () => {
      leftSidebar?.classList.remove('active');
      rightSidebar?.classList.remove('active');
      sidebarPanels.forEach(p => p.classList.add('mobile-hidden'));
      mobileNavBtns.forEach(b => b.classList.remove('active'));
    };

    const togglePanel = (sidebarId, panelClass, btnId) => {
      const sidebar = document.getElementById(sidebarId);
      const targetPanel = sidebar?.querySelector('.' + panelClass);
      if (!sidebar || !targetPanel) return;

      const wasActive = sidebar.classList.contains('active') && !targetPanel.classList.contains('mobile-hidden');

      closeAllSidebars();

      if (!wasActive) {
        sidebar.classList.add('active');
        targetPanel.classList.remove('mobile-hidden');
        document.getElementById(btnId)?.classList.add('active');
      }
    };

    document.getElementById('btn-mobile-quest').onclick = () => { closeAllSidebars(); this.openPeopleModal(); };
    document.getElementById('btn-mobile-evidence').onclick = () => togglePanel('left-sidebar', 'evidence-panel', 'btn-mobile-evidence');
    document.getElementById('btn-mobile-actions').onclick = () => togglePanel('right-sidebar', 'actions-panel', 'btn-mobile-actions');
    document.getElementById('btn-mobile-keys').onclick = () => togglePanel('right-sidebar', 'prophecies-panel', 'btn-mobile-keys');

    document.getElementById('btn-mobile-codex').onclick = () => {
      closeAllSidebars();
      this.audio.playUI();
      this.showEvidenceCodex();
      document.getElementById('btn-mobile-codex')?.classList.add('active');
    };

    document.getElementById('btn-mobile-analysis').onclick = () => {
      closeAllSidebars();
      if (window.openAnalysis) window.openAnalysis();
      document.getElementById('btn-mobile-analysis')?.classList.add('active');
    };

    // Bind close buttons inside sidebars
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.onclick = closeAllSidebars;
    });

    const updateUIState = (prop, targetId, settingsBtnId) => {
      const isVisible = this.uiVisibility[prop];
      const target = document.getElementById(targetId);
      if (target) target.classList.toggle('ui-visibility-hidden', !isVisible);
      const sBtn = document.getElementById(settingsBtnId);
      if (sBtn) {
        sBtn.classList.toggle('active', isVisible);
        sBtn.setAttribute('aria-checked', isVisible);
      }
    };

    const bindToggle = (btnId, prop, targetId, settingsBtnId, title) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        if (title) btn.title = title;
        btn.onclick = () => {
          this.uiVisibility[prop] = !this.uiVisibility[prop];
          updateUIState(prop, targetId, settingsBtnId);
          this.audio.playUI();
        };
      }
    };

    // Bind settings menu switches
    bindToggle('toggle-ui-minimap', 'minimap', 'minimap', 'toggle-ui-minimap');
    bindToggle('toggle-ui-controls', 'controls', 'mobile-ctrl', 'toggle-ui-controls');
    // Bind chevron buttons
    bindToggle('toggle-left-btn', 'controls', 'mobile-ctrl', 'toggle-ui-controls', "Toggle Mobile Controls");
    bindToggle('toggle-right-btn', 'minimap', 'minimap', 'toggle-ui-minimap', "Toggle Minimap");

    // Initial sync
    updateUIState('minimap', 'minimap', 'toggle-ui-minimap');
    updateUIState('controls', 'mobile-ctrl', 'toggle-ui-controls');

    // D-Pad and Action Button Logic
    const bindControl = (id, key) => {
      const btn = document.getElementById(id);
      if (!btn) return;
      btn.oncontextmenu = (e) => e.preventDefault(); // Prevent long-press menu

      const press = (e) => { e.preventDefault(); this.controls.keys[key] = true; };
      const release = (e) => { if (e.cancelable) e.preventDefault(); this.controls.keys[key] = false; };

      btn.addEventListener('pointerdown', press, { passive: false });
      btn.addEventListener('pointerup', release, { passive: false });
      btn.addEventListener('pointercancel', release, { passive: false });
      btn.addEventListener('pointerleave', release, { passive: false });
    };

    bindControl('ctrl-up', 'KeyW');
    bindControl('ctrl-down', 'KeyS');
    bindControl('ctrl-left', 'KeyA');
    bindControl('ctrl-right', 'KeyD');
    bindControl('ctrl-jump', 'Space');

    document.getElementById('ctrl-interact').onclick = (e) => {
      e.preventDefault();
      if (this.nearestNPC) this.startDialogue(this.nearestNPC.userData.config);
    };
  }

  bindGlobalUIEvents() {
    document.getElementById('btn-open-map').onclick = () => {
      this.audio.playUI();
      this._openMapModal();
    };

    document.getElementById('btn-start').onclick = () => {
      this.audio.playUI();
      document.getElementById('wipe-overlay').classList.add('active');
      setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        this._openMapModal();
        this.animate();
      }, 1000);
    };
  }

  _openMapModal() {
    if (!this.mapModal) {
      // You can pass a custom globeScale value here (e.g., 15)
      this.mapModal = new OrbitalSelectMatrixModal(this.cm, this.ls, (id) => this.loadCase(id), 11);
    }
    this.mapModal.open();
  }

  loadCase(caseId) {
    const caseData = this.cm.cases[caseId];
    if (!caseData) return;
    this.activeCaseId = caseId;
    this.audio.updateActMusic(caseData.actLabel);
    this.nearestNPC = null;
    this.inDialogue = false;

    // 1. Reset player and camera state for the new level
    this.pVelocity.set(0, 0, 0);
    this.pPos.set(0, this.surfaceRadius + 1.2, 0); // Player starts at the "north pole"
    this.camHeading.set(0, 0, -1);

    // 2. Map level time to environmental progress (as seen in mobile.html)
    const timeMap = { 'day': 0.25, 'morning': 0.18, 'afternoon': 0.35, 'night': 0.6, 'dawn': 0.15 };
    const startTime = timeMap[caseData.timeOfDay] || 0.25;

    if (this.envManager) {
      this.envManager.timeProgress = startTime;
      this.envManager.wasDay = null; 
      this.envManager.update(false);
    }

    this.cm.startCase(caseId);
    this.es.loadCase(caseData);
    this.ns.loadCase(caseData);

    // Pre-load Ink stories
    if (caseData.npcs) {
      caseData.npcs.forEach(npc => {
        if (npc.dialogueId || npc.storyFile) this.dm.loadStoryForNPC(npc);
      });
    }

    // Clean and rebuild world meshes
    this.npcMeshes.forEach(m => (m.parent ? m.parent.remove(m) : this.scene.remove(m)));
    this.npcMeshes = [];
    this.evidenceMeshes.forEach(m => (m.parent ? m.parent.remove(m) : this.scene.remove(m)));
    this.evidenceMeshes = [];
    this.worldObjects.forEach(m => (m.parent ? m.parent.remove(m) : this.scene.remove(m)));
    this.worldObjects = [];

    if (this.worldEarth) {
      this.scene.remove(this.worldEarth); 
      // Memory cleanup for mobile performance optimization
      this.worldEarth.traverse(node => {
        if (node.isMesh) {
          node.geometry.dispose();
          if (node.material.map) node.material.map.dispose();
          node.material.dispose();
        }
      });
    }

    // 3. Load the specific environment model for this location
    const loader = new GLTFLoader();
    let modelPath = caseData.worldModel;

    if (!modelPath) {
      const loc = (caseData.location || '').toLowerCase();
      const assetsPath = '../assets/models/'; 
      if (loc.includes('jerusalem')) modelPath = assetsPath + 'jerusalem.glb';
      else if (loc.includes('garden')) modelPath = assetsPath + 'garden.glb';
      else if (loc.includes('temple')) modelPath = assetsPath + 'temple.glb';
      else if (loc.includes('upperroom')) modelPath = assetsPath + 'upper_room.glb';
      else if (loc.includes('galilee')) modelPath = assetsPath + 'galilee.glb';
      else modelPath = assetsPath + 'earth.glb'; // Fallback to earth.glb if specific model missing
    }

    // Transition UI for loading state
    const wipeOverlay = document.getElementById('wipe-overlay');
    if (wipeOverlay) wipeOverlay.classList.add('active');
    
    loader.load(modelPath, (gltf) => {
        this.worldEarth = gltf.scene;
        
        const box = new THREE.Box3().setFromObject(this.worldEarth);
        const size = box.getSize(new THREE.Vector3());
        const scaleFactor = (this.planetRadius * 2) / Math.max(size.x, size.y, size.z);
        this.worldEarth.scale.set(scaleFactor, scaleFactor, scaleFactor);

        // Center the geometry to ensure the surface projection matches the visual mesh
        const center = box.getCenter(new THREE.Vector3());
        this.worldEarth.traverse(node => { if (node.isMesh) node.position.sub(center); });

        // Center the sphere at (0,0,0) for easier spherical gravity math
        this.worldEarth.position.set(0, 0, 0);

        this.worldEarth.traverse(node => {
            if (node.isMesh) {
                node.receiveShadow = true;
                if (node.material) {
                  node.material.roughness = 0.8;
                  node.material.metalness = 0.1;
                }
            }
        });
        this.scene.add(this.worldEarth);

        // Populate level details ONLY after the terrain is ready to prevent occlusion
        this._populateWorldPrimitives();
        this._addLocationMarkers();
        this._placeNPCs(caseData);

        if (wipeOverlay) setTimeout(() => wipeOverlay.classList.remove('active'), 500);
    });

    this.collectedEvidence = [];
    this.lockedEvidence = {};

    caseData.evidencePool.forEach(item => {
      this.lockedEvidence[item.id] = item;
    });

    this.updateHUD(caseData);
    this.controls.displayAlert(`Case: ${caseData.title}`);

    // Auto-open instructions for the case
    setTimeout(() => { if (window.showInstructionsModal) window.showInstructionsModal(); }, 1500);
  }

  _placeNPCs(caseData) {
    (caseData.npcs || []).forEach(npc => {
      if (!Array.isArray(npc.pos) || npc.pos.length < 3) return;
      const npcGeo = new THREE.BoxGeometry(1.2, 2.2, 1.2);
      const npcMat = new THREE.MeshStandardMaterial({ 
        color: npc.color || 0x444444, 
        emissive: npc.color, 
        emissiveIntensity: 0.2 
      });
      const box = new THREE.Mesh(npcGeo, npcMat);
      
      const pos = this._projectToSurface(npc.pos[0], npc.pos[2], 1.1);
      box.position.copy(pos);
      box.castShadow = true;
      box.receiveShadow = true;
      this._alignToSurface(box);
      box.userData = { config: npc, type: 'npc', state: 'neutral' };
      this.npcMeshes.push(box);
    });
  }

  // Helper to project local case coordinates onto the global spherical surface
  _projectToSurface(x, z, surfaceOffset = 0) { // Renamed heightOffset to surfaceOffset for clarity
    const pos = new THREE.Vector3(x, this.surfaceRadius, z); 
    pos.normalize().multiplyScalar(this.surfaceRadius + surfaceOffset);
    return pos;
  }

  // Helper to orient an object vertically relative to the planet's center
  _alignToSurface(mesh) {
    // Get world-space direction for 'up'
    const up = mesh.position.clone().normalize(); 
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);

    if (this.worldEarth) {
      // Parent to the world model so it is "inside" the sphere object
      mesh.position.divide(this.worldEarth.scale);
      this.worldEarth.add(mesh);
    } else {
      this.scene.add(mesh);
    }
  }

  _initAmbientParticles() {
    const geo = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 1500; i++) {
      vertices.push((Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400, (Math.random() - 0.5) * 400);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    this.ambientParticles = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.4, transparent: true, opacity: 0.3 }));
    this.scene.add(this.ambientParticles);
  }

  _populateWorldPrimitives() {
    const gltfLoader = new GLTFLoader();

    // --- Custom GLB Models from assets folder ---
    // Assuming the 'assets' folder is at the same level as '_prototypeB'
    const customModels = [
        { path: '../assets/models/building_tall.glb', scale: 5, count: 5 },
        { path: '../assets/models/building_short.glb', scale: 3, count: 10 },
        { path: '../assets/models/tree_palm.glb', scale: 2, count: 15 },
        { path: '../assets/models/archway.glb', scale: 4, count: 3 }
    ];

    customModels.forEach(modelDef => {
        for (let i = 0; i < modelDef.count; i++) {
            const x = (Math.random() - 0.5) * 180; // Wider spread for models
            const z = (Math.random() - 0.5) * 180;
            // Ensure we don't spawn directly on the center
            if (Math.abs(x) < 10 && Math.abs(z) < 10) continue; // Avoid spawning too close to origin

            gltfLoader.load(modelDef.path, (gltf) => {
                const model = gltf.scene;
                // Calculate height offset based on model's bounding box
                const bbox = new THREE.Box3().setFromObject(model);
                const height = bbox.max.y - bbox.min.y;
                // Place the base of the model on the surface
                const worldHeight = height * modelDef.scale;
                const pos = this._projectToSurface(x, z, worldHeight / 2);
                model.position.copy(pos);
                this._alignToSurface(model); 
                // Account for parent scale
                const localScale = modelDef.scale / (this.worldEarth ? this.worldEarth.scale.x : 1);
                model.scale.setScalar(localScale);
                model.castShadow = true;
                model.receiveShadow = true;
                this.worldObjects.push(model);
            }, undefined, (error) => {
                console.warn(`Failed to load custom model ${modelDef.path}:`, error);
                // Fallback to a primitive if GLB fails
                const fallbackGeo = new THREE.BoxGeometry(modelDef.scale, modelDef.scale * 2, modelDef.scale);
                const fallbackMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
                const fallbackMesh = new THREE.Mesh(fallbackGeo, fallbackMat);
                const fallbackPos = this._projectToSurface(x, z, (modelDef.scale * 2) / 2);
                fallbackMesh.position.copy(fallbackPos);
                const localScale = 1 / (this.worldEarth ? this.worldEarth.scale.x : 1);
                fallbackMesh.scale.setScalar(localScale);
                this._alignToSurface(fallbackMesh);
                fallbackMesh.castShadow = true;
                fallbackMesh.receiveShadow = true;
                this.worldObjects.push(fallbackMesh);
            });
        }
    });

    // --- Primitive Boxes/Cylinders for additional variety ---
    const mat = new THREE.MeshStandardMaterial({ color: 0x333333 });
    const boxGeo = new THREE.BoxGeometry(2, 2, 2);
    const cylGeo = new THREE.CylinderGeometry(1, 1, 4, 12);

    for (let i = 0; i < 30; i++) { // Fewer primitives now that custom models are added
        const h = 5 + Math.random() * 10;
        const w = 3 + Math.random() * 5;
        const m = new THREE.Mesh(Math.random() > 0.5 ? new THREE.BoxGeometry(w, h, w) : new THREE.CylinderGeometry(w/2, w/2, h, 12), mat);
        
        const x = (Math.random() - 0.5) * 200; // Wider spread
        const z = (Math.random() - 0.5) * 200;
        if (Math.abs(x) < 10 && Math.abs(z) < 10) continue;

        const pos = this._projectToSurface(x, z, h / 2);
        m.position.copy(pos);
        this._alignToSurface(m);
        m.castShadow = true; m.receiveShadow = true;
        this.worldObjects.push(m);
    }

    // --- Global golden collectibles (unchanged) ---
    const collectGeo = new THREE.OctahedronGeometry(0.7);
    const collectMat = new THREE.MeshStandardMaterial({ color: 0xffd700, emissive: 0xffaa00, emissiveIntensity: 0.5 });
    for (let i = 0; i < 20; i++) {
      const item = new THREE.Mesh(collectGeo, collectMat);
      const pos = new THREE.Vector3().setFromSphericalCoords(this.surfaceRadius + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
      item.position.copy(pos);
      item.userData = { type: 'collectable' };
      this.scene.add(item);
      this.worldObjects.push(item);
    }
  }

  _addLocationMarkers() {
    this.ls.getAllLocations().forEach(loc => {
      const canvas = document.createElement('canvas');
      canvas.width = 128; canvas.height = 32;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(0,0,128,32);
      ctx.fillStyle = 'cyan'; ctx.font = '16px monospace'; ctx.textAlign = 'center';
      ctx.fillText(loc.id.toUpperCase(), 64, 22);
      
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true }));
      sprite.scale.set(12, 3, 1);
      const hash = loc.id.length * 7;
      sprite.position.setFromSphericalCoords(this.surfaceRadius + 30, (hash % 10)/10 * Math.PI, (hash % 20)/20 * Math.PI * 2);
      this.scene.add(sprite);
      this.worldObjects.push(sprite);
    });
  }

  _clearWorldObjects() {
    this.worldObjects.forEach(o => this.scene.remove(o));
    this.worldObjects = [];
  }

  _updateEffects() {
    // Trail effect
    if (this.pVelocity.length() > 2 && this.isGrounded) {
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.15, 4, 4), new THREE.MeshBasicMaterial({ color: 0x443322, transparent: true, opacity: 0.5 }));
      p.position.copy(this.pPos).add(new THREE.Vector3(0, -0.8, 0).applyQuaternion(this.playerMesh.quaternion));
      this.scene.add(p);
      this.trailParticles.push({ mesh: p, life: 1.0 });
    }
    for (let i = this.trailParticles.length - 1; i >= 0; i--) {
      const t = this.trailParticles[i]; t.life -= 0.03;
      t.mesh.scale.setScalar(t.life); t.mesh.material.opacity = t.life;
      if (t.life <= 0) { this.scene.remove(t.mesh); this.trailParticles.splice(i, 1); }
    }

    if (this.ambientParticles) this.ambientParticles.position.copy(this.pPos);

    this.worldObjects.forEach(obj => {
      if (obj.userData?.type === 'collectable') {
        obj.rotation.y += 0.03; obj.rotation.z += 0.01;
      }
    });

    // Collect primitives
    for (let i = this.worldObjects.length - 1; i >= 0; i--) {
      const obj = this.worldObjects[i];
      if (obj.userData?.type === 'collectable' && this.pPos.distanceTo(obj.position) < 2) {
        this.scene.remove(obj); this.worldObjects.splice(i, 1);
        this.audio.playCollect();
      }
    }
  }

  updateHUD(caseData) {
    document.getElementById('loc-name').innerText = caseData.location;
    document.getElementById('act-name').innerText = caseData.actLabel;
    const levelTitle = document.getElementById('level-title');
    levelTitle.innerText = caseData.title;

    const q = caseData.quest;
    document.getElementById('quest-title').innerText = q.name;
    document.getElementById('quest-task').innerText = `${q.task} (${q.cur}/${q.tar})`;
    document.getElementById('quest-progress').style.width = `${(q.cur / q.tar) * 100}%`;

    const propWrap = document.getElementById('prophecies-container');
    if (propWrap) {
      propWrap.innerHTML = '';
      caseData.prophecies.forEach(p => {
        const div = document.createElement('div');
        div.className = 'prophecy-item';
        div.innerHTML = `<p><strong>${p.reference}</strong>: ${p.text}</p>`;
        propWrap.appendChild(div);
      });
    }

    this.updateMetrics();
    this.updateActions(caseData);
    this.updateEvidenceGrid();
    this.updateChallengeButton();
  }

  updateMetrics() {
    const p = this.cm.getProgress();
    document.querySelectorAll('.val-reputation').forEach(el => el.innerText = p.reputation ?? 100);
    document.querySelectorAll('.val-doubt').forEach(el => el.innerText = p.doubt ?? 0);
    document.querySelectorAll('.val-score').forEach(el => el.innerText = p.totalScore ?? 0);
  }

  updateActions(caseData) {
    const actWrap = document.getElementById('actions-container');
    if (!actWrap) return;
    actWrap.innerHTML = '';

    const canChallenge = this.es.selectedA && this.es.selectedB;
    const challengeBtn = document.createElement('button');
    challengeBtn.className = 'action-btn challenge-action-btn';
    challengeBtn.innerHTML = `<span><i class="fa-solid fa-bolt"></i> Challenge</span> <small>[${this.es.selectedA?.name || 'A'}+${this.es.selectedB?.name || 'B'}]</small>`;
    challengeBtn.disabled = !canChallenge;
    challengeBtn.onclick = () => {
      if (this.nearestNPC) this._playerChallengedNPC(this.nearestNPC.userData.config, this.es.selectedA?.id, this.es.selectedB?.id);
    };
    actWrap.appendChild(challengeBtn);

    const accuseBtn = document.createElement('button');
    accuseBtn.className = 'action-btn accuse-action-btn';
    accuseBtn.style.borderLeft = '3px solid var(--accent-error)';
    accuseBtn.innerHTML = `<span><i class="fa-solid fa-scale-balanced"></i> Accuse</span> <small>[Verdict]</small>`;
    accuseBtn.onclick = () => {
      this.audio.playUI();
      this.openAccuseModal();
    };
    actWrap.appendChild(accuseBtn);

    if (this.nearestNPC && !this.inDialogue) {
      const n = this.nearestNPC.userData.config;
      const talkBtn = document.createElement('button');
      talkBtn.className = 'action-btn talk-prompt-highlight';
      talkBtn.innerHTML = `<span><i class="fa-solid fa-comments"></i> Talk to ${n.name}</span> <small>[E]</small>`;
      talkBtn.onclick = () => this.startDialogue(n);
      actWrap.appendChild(talkBtn);
    }
  }

  openAccuseModal() {
    const caseData = this.cm.getActiveCase();
    if (!caseData) return;

    const list = document.getElementById('accuse-suspect-list');
    list.innerHTML = '';

    caseData.suspects.forEach(s => {
      const card = document.createElement('div');
      card.className = 'picker-card';
      card.innerHTML = `
        <span class="picker-icon">${s.avatar || '👤'}</span>
        <span class="picker-name">${s.name}</span>
        <small style="display:block; font-size:0.6rem; opacity:0.7; margin-bottom:8px;">${s.role}</small>
        <button class="terminal-btn" style="width:100%; margin:0;">Accuse</button>
      `;
      card.querySelector('button').onclick = () => {
        this.handleAccusation(s);
      };
      list.appendChild(card);
    });

    document.getElementById('accuse-modal').classList.add('active');
  }

  handleAccusation(suspect) {
    const result = this.cm.submitAccusation(suspect.id);
    document.getElementById('accuse-modal').classList.remove('active');

    if (result.correct) {
      this.audio.playComplete();
      this.controls.displayAlert(`CORRECT: ${suspect.name} identified.`, 5000);
      document.getElementById('end-screen').style.display = 'flex';
      setTimeout(() => document.getElementById('end-screen').style.opacity = '1', 10);
    } else {
      this.audio.playError();
      this.controls.displayAlert(`INCORRECT: ${suspect.name} was not the culprit. (+25 Doubt)`, 4000);
      this.updateHUD(this.cm.getActiveCase());
    }
  }

  updateChallengeButton() {
    const challengeBtn = document.querySelector('.challenge-action-btn');
    if (challengeBtn) {
      challengeBtn.disabled = !(this.es.selectedA && this.es.selectedB);
      challengeBtn.querySelector('small').textContent = `[${this.es.selectedA?.name || 'A'}+${this.es.selectedB?.name || 'B'}]`;
    }
  }

  _playerChallengedNPC(npcConfig, idA, idB) {
    const result = this.ns.challenge(npcConfig.id, idA, idB);
    if (result) {
      if (result.breakthrough) {
        this.cm.recordDeduction(result);
        this.updateHUD(this.cm.getActiveCase());
      }
      this.controls.displayAlert(result.breakthrough ? "Breakthrough!" : "No contradiction found.");
    }
  }

  updateEvidenceGrid() {
    const grid = document.getElementById('evidence-slots-grid');
    grid.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const ev = this.collectedEvidence[i];
      const slot = document.createElement('div');
      slot.className = 'evidence-slot-btn' + (ev ? ' filled' : '');
      if (ev) {
        slot.textContent = ev.emoji || '🛡️';
        if (this.es.selectedA?.id === ev.id) slot.classList.add('sel-a');
        if (this.es.selectedB?.id === ev.id) slot.classList.add('sel-b');
        slot.onclick = () => {
          this.openEvidenceDetail(ev.id);
          this.es.selectEvidence(ev.id);
          this.updateEvidenceGrid();
          this.updateChallengeButton();
        };
      } else {
        slot.innerHTML = '<i class="fa-solid fa-folder"></i>';
      }
      grid.appendChild(slot);
    }
  }

  openPeopleModal() {
    const caseData = this.cm.getActiveCase();
    if (!caseData) return;

    const modal = document.getElementById('people-modal');
    const body = document.getElementById('people-modal-body');
    
    const npcs = caseData.npcs || [];
    
    body.innerHTML = `
        <div class="people-list-sidebar">
            ${npcs.map(n => `
                <button class="person-nav-btn" data-npc-id="${n.id}">
                    <span>${n.avatar || '👤'}</span> ${n.name}
                </button>
            `).join('')}
        </div>
        <div class="person-detail-view" id="person-detail-content">
            <div class="picker-empty">Select a person to review testimony</div>
        </div>
    `;

    body.querySelectorAll('.person-nav-btn').forEach(btn => {
        btn.onclick = () => {
            body.querySelectorAll('.person-nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            this._renderPersonDetailInModal(btn.dataset.npcId);
        };
    });

    this.audio.playUI();
    modal.classList.add('active');
  }

  _renderPersonDetailInModal(npcId) {
    const content = document.getElementById('person-detail-content');
    const npc = this.ns.getNPC(npcId);
    const state = this.ns.getState(npcId);
    
    if (!npc || !state) return;

    const relatedEvidence = this.collectedEvidence.filter(ev => 
        ev.revealsSuspect === npcId || (npc.unlocksEvidence && npc.unlocksEvidence.includes(ev.id))
    );

    content.innerHTML = `
        <h3 class="modal-title-settings">${npc.avatar || '👤'} ${npc.name}</h3>
        <p class="modal-subtitle-custom">${npc.role}</p>
        <div class="evidence-detail-label" style="margin-top:15px;">Related Evidence</div>
        <div class="picker-grid">
            ${relatedEvidence.map(ev => `<div class="picker-card"><span class="picker-icon">${ev.emoji}</span><span class="picker-name">${ev.name}</span></div>`).join('') || '<small>No evidence linked yet.</small>'}
        </div>
        <div class="evidence-detail-label" style="margin-top:20px;">Conversation Record</div>
        <div class="convo-history-feed">
            ${state.memory.filter(m => m.type === 'talk' || m.type === 'shown_evidence').map(m => `
                <div class="sidebar-chat-entry">
                    <small>${m.type === 'talk' ? 'Dialog' : 'Clue Review'}</small>
                    <p>${m.reaction || (npc.dialogue[m.mood] || '...')}</p>
                </div>
            `).join('') || '<p class="picker-empty">No conversation recorded.</p>'}
        </div>
    `;
  }

  openEvidenceDetail(evidenceId) {
    const ev = this.es.getById(evidenceId);
    if (!ev) return;

    const modal = document.getElementById('evidence-detail-modal');
    
    // Header & Basic Info
    modal.querySelector('.evidence-detail-icon').textContent = ev.emoji || ev.icon || '🛡️';
    modal.querySelector('.evidence-detail-name').textContent = ev.name;
    modal.querySelector('.evidence-detail-type').textContent = ev.type || 'Physical';
    modal.querySelector('.evidence-detail-desc').textContent = ev.desc || ev.description || 'No description available.';
    modal.querySelector('.evidence-detail-location').textContent = ev.location || 'Unknown';
    modal.querySelector('.evidence-detail-investigator-note').textContent = ev.investigatorNote || ev.notes || 'No notes available.';

    // Prophecy Section
    const propArea = document.getElementById('detail-prophecy-area');
    if (ev.bibleRef || ev.propheticLink) {
      propArea.hidden = false;
      modal.querySelector('.evidence-detail-bible-ref').textContent = ev.bibleRef || '---';
      modal.querySelector('.evidence-detail-prophetic-link').textContent = ev.propheticLink || '---';
      
      // Reset verse content visibility
      modal.querySelectorAll('.verse-content').forEach(c => c.hidden = true);
      
      // Bind read more buttons
      modal.querySelectorAll('.read-more-btn').forEach(btn => {
        const targetId = btn.dataset.target;
        const refText = targetId === 'bible-verse-content' ? ev.bibleRef : ev.propheticLink;
        btn.onclick = (e) => {
          e.preventDefault();
          this.toggleVerseView(targetId, refText);
        };
      });
    } else {
      propArea.hidden = true;
    }

    document.getElementById('btn-open-codex-from-detail').onclick = () => {
      modal.classList.remove('active');
      this.showEvidenceCodex(ev.id);
    };

    this.audio.playUI();
    modal.classList.add('active');
  }

  toggleVerseView(targetId, refText) {
    const container = document.getElementById(targetId);
    if (!container || !refText) return;

    if (container.hidden) {
      container.hidden = false;
      container.innerHTML = `<span style="font-size:0.8rem; opacity:0.7;">Fetching verse...</span>`;
      
      // Clean reference (extract part before the description dash)
      const cleanRef = refText.split(/[—–-]/)[0].trim();
      
      window.BibleReader.fetchVerse(window.BibleReader.formatRef(cleanRef))
        .then(v => {
          container.innerHTML = `<div style="margin-bottom:8px;">"${v.content}"</div>
            <button class="read-more-btn" style="width:100%" onclick="window.BibleReader.displayPassage('${v.id}')">📖 Read Full Passage</button>`;
        })
        .catch(() => {
          container.textContent = "Could not load verse.";
        });
    } else {
      container.hidden = true;
    }
  }

  showEvidenceCodex(evidenceId = null) {
    const modal = document.getElementById('codex-modal');
    if (evidenceId) this.es.selectedCodexEvidenceId = evidenceId;
    this.renderCodexMatcherContent();
    this.audio.playUI();
    modal.classList.add('active');
  }

  renderCodexMatcherContent() {
    this.renderCodexEvidenceGrid();
    this.renderCodexProphecyGrid();
    this.renderCodexDiscoveredGrid();
    this.updateCodexMatchUI();
    this.updateCodexFeedback();

    const matchBtn = document.getElementById('btn-match-prophecy');
    if (matchBtn) {
      matchBtn.onclick = () => {
        this.audio.playUI();
        const result = this.es.attemptProphecyMatch();
        if (result) {
          this.controls.displayAlert(result.message);
          if (result.success) {
            this.es.selectedCodexEvidenceId = null;
            this.es.selectedCodexProphecyId = null;
            this.renderCodexMatcherContent();
          }
        }
      };
    }
  }

  renderCodexEvidenceGrid() {
    const grid = document.getElementById('codex-evidence-grid');
    const collected = this.es.getCollected();
    grid.innerHTML = collected.map(e => `
      <button class="picker-card ${this.es.selectedCodexEvidenceId === e.id ? 'selected-a' : ''}" 
              onclick="window.gameEngine.es.selectedCodexEvidenceId='${e.id}'; window.gameEngine.renderCodexMatcherContent();">
        ${e.emoji || '🛡️'} ${e.name}
      </button>`).join("");
  }

  renderCodexProphecyGrid() {
    const grid = document.getElementById('codex-prophecy-grid');
    if (!grid) return;
    const props = this.es.getPropheciesWithStatus();
    grid.innerHTML = props.map(p => `
      <button class="picker-card ${p.discovered ? 'discovered' : (this.es.selectedCodexProphecyId === p.id ? 'selected-b' : '')}"
              ${p.discovered ? 'disabled' : ''}
              onclick="window.gameEngine.es.selectedCodexProphecyId='${p.id}'; window.gameEngine.renderCodexMatcherContent();">
        <i class="fa-solid ${p.discovered ? 'fa-circle-check' : 'fa-lock'}"></i> ${p.reference}
      </button>`).join("");
  }

  renderCodexDiscoveredGrid() {
    const grid = document.getElementById('codex-discovered-grid');
    if (!grid) return;
    const discovered = this.es.getPropheciesWithStatus().filter(p => p.discovered);
    
    grid.innerHTML = discovered.length === 0
      ? `<p class="picker-empty">No prophecies linked yet. Match evidence to find truths.</p>`
      : discovered.map(p => `
          <div class="prophecy-card discovered">
            <div class="prophecy-card-icon">📜</div>
            <div class="prophecy-card-reference">${p.reference}</div>
            <div class="prophecy-card-desc">${p.text.substring(0, 60)}...</div>
          </div>
        `).join("");
  }

  updateCodexFeedback() {
    const fbEl = document.getElementById('codex-feedback');
    if (!fbEl) return;
    // If your EvidenceSystem supports match feedback, render it here
    if (this.es.lastMatchResult) {
      const fb = this.es.lastMatchResult;
      fbEl.innerHTML = `<div class="codex-feedback-msg ${fb.success ? 'success' : 'error'}">${fb.message}</div>`;
    } else {
      fbEl.innerHTML = '';
    }
  }

  updateCodexMatchUI() {
    const selectedEv = this.es.selectedCodexEvidenceId ? this.es.getById(this.es.selectedCodexEvidenceId) : null;
    const selectedProp = this.es.selectedCodexProphecyId ? this.es.getProphecyById(this.es.selectedCodexProphecyId) : null;

    const evSlot = document.getElementById('codex-evidence-slot');
    const propSlot = document.getElementById('codex-prophecy-slot');
    const matchBtn = document.getElementById('btn-match-prophecy');

    if (evSlot) {
      evSlot.className = 'selection-slot' + (selectedEv ? ' active' : '');
      evSlot.innerHTML = selectedEv ? `<span>${selectedEv.emoji || '🛡️'} ${selectedEv.name}</span>` : '<span>Select Evidence...</span>';
    }
    if (propSlot) {
      propSlot.className = 'selection-slot' + (selectedProp ? ' active' : '');
      propSlot.innerHTML = selectedProp ? `<span>📜 ${selectedProp.reference}</span>` : '<span>Select Prophecy...</span>';
    }
    if (matchBtn) {
      matchBtn.disabled = !(selectedEv && selectedProp);
    }

    const previewEl = document.getElementById('codex-evidence-preview');
    if (selectedEv) {
      previewEl.hidden = false;
      document.getElementById('codex-preview-name').textContent = `${selectedEv.emoji || '🛡️'} ${selectedEv.name}`;
      document.getElementById('codex-preview-desc').textContent = selectedEv.desc || selectedEv.description || 'No notes available.';
    } else {
      previewEl.hidden = true;
    }
  }

  startDialogue(npcConfig) {
    const sidebar = document.getElementById('prophecies-container');
    const storyData = this.dm.getStory(npcConfig.id);
    
    if (storyData) {
      const story = this.dm.createStory(npcConfig.id);
      this.inDialogue = true;
      this.pVelocity.set(0, 0, 0);

      // Hook into DialogueManager to mirror messages to Key Discoveries sidebar
      const originalAddMsg = this.dm.addMsg.bind(this.dm);
      this.dm.addMsg = (text, type) => {
        originalAddMsg(text, type);
        if (type !== 'system' && sidebar) {
          const entry = document.createElement('div');
          entry.className = 'sidebar-chat-entry';
          entry.innerHTML = `<small>${type === 'npc' ? npcConfig.name : 'You'}:</small><p>${text}</p>`;
          sidebar.appendChild(entry);
          sidebar.scrollTop = sidebar.scrollHeight;
        }
      };

      this.dm.openDialogue(npcConfig, story, () => {
        if (npcConfig.unlocksEvidence) npcConfig.unlocksEvidence.forEach(id => this._unlockEvidence(id));
        this.inDialogue = false;
        this.updateActions(this.cm.getActiveCase());
      }, (tag) => {
        if (tag.startsWith('reveal:')) this._unlockEvidence(tag.split(':')[1]);
      });
    }
  }

  _unlockEvidence(evidenceId) {
    const id = (typeof evidenceId === 'object') ? evidenceId.clueId : evidenceId;
    const ev = this.lockedEvidence[id];
    if (!ev || this.es.isCollected(id)) return;

    delete this.lockedEvidence[id];
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x00ffaa, emissive: 0x00ffaa, emissiveIntensity: 0.8 })
    );
    
    const pos = this._projectToSurface(ev.pos[0], ev.pos[2], 1);
    sphere.position.copy(pos);
    this._alignToSurface(sphere);
    
    sphere.userData = { dataRef: ev, newlyUnlocked: true };
    this.evidenceMeshes.push(sphere);
    this.controls.displayAlert(`Evidence revealed: ${ev.name}`);
  }

  collectEvidence() {
    for (let i = this.evidenceMeshes.length - 1; i >= 0; i--) {
      const item = this.evidenceMeshes[i];
      if (this.pPos.distanceTo(item.position) < 2) {
        const data = item.userData.dataRef;
        const unlocked = this.es.unlock(data.id);
        if (unlocked) {
          this.collectedEvidence.push(unlocked);
          this.showEvidencePopup(unlocked.name, unlocked.desc || '', unlocked.emoji);
          this.advanceQuest(1);

          // Unlock suspect if associated with this evidence
          if (unlocked.revealsSuspect) {
            this.cm.unlockSuspect(unlocked.revealsSuspect);
          }
        }
        this.scene.remove(item);
        this.evidenceMeshes.splice(i, 1);
        this.audio.playCollect();
        this.updateEvidenceGrid();
      }
    }
  }

  advanceQuest(amount) {
    const caseData = this.cm.getActiveCase();
    caseData.quest.cur = Math.min(caseData.quest.tar, caseData.quest.cur + amount);
    this.updateHUD(caseData);
  }

  showEvidencePopup(title, desc, emoji) {
    document.getElementById('popup-evidence-title').innerHTML = `<i class="fa-solid fa-file-shield"></i> ${emoji || ''} ${title}`;
    document.getElementById('popup-evidence-body').innerText = desc;
    document.getElementById('evidence-popup-card').style.display = 'block';
  }

  movePlayer() {
    // 1. Calculate the 'Up' vector (surface normal)
    const up = this.pPos.clone().normalize();
    
    const move = new THREE.Vector3();
    
    // 2. Calculate movement directions relative to the sphere's surface
    // Forward is the projection of camera forward onto the tangent plane
    const camFwd = new THREE.Vector3(0, 0, -1).applyQuaternion(this.camera.quaternion);
    const dot = camFwd.dot(up);
    const moveFwd = camFwd.clone().sub(up.clone().multiplyScalar(dot)).normalize();
    const moveRgt = new THREE.Vector3().crossVectors(up, moveFwd);

    const keys = this.controls.keys;
    if (keys['KeyW'] || keys['ArrowUp']) move.add(moveFwd);
    if (keys['KeyS'] || keys['ArrowDown']) move.sub(moveFwd);
    if (keys['KeyA'] || keys['ArrowLeft']) move.sub(moveRgt);
    if (keys['KeyD'] || keys['ArrowRight']) move.add(moveRgt);

    if (move.length() > 0) {
      move.normalize();
      this.camHeading.lerp(move, 0.1).normalize();
      // Tangential velocity
      const speed = 18;
      const targetVel = move.multiplyScalar(speed);
      this.pVelocity.copy(targetVel);
    }
    else {
      // Apply friction damping when no keys are pressed
      const friction = this.isGrounded ? 0.75 : 0.98;
      this.pVelocity.multiplyScalar(friction);
      
      if (this.isGrounded) {
          // Kill tangential drift faster when standing
          const tangentVel = this.pVelocity.clone().sub(up.clone().multiplyScalar(this.pVelocity.dot(up)));
          if (tangentVel.length() < 0.5) {
              this.pVelocity.set(0, 0, 0);
          }
      }
    }

    // 3. Spherical Gravity & Grounding
    const gravityStrength = 42;
    // Apply gravity force towards center (0,0,0)
    this.pVelocity.addScaledVector(up, -gravityStrength * (1 / 60));
    
    // Integrator
    this.pPos.addScaledVector(this.pVelocity, 1 / 60);

    const currentDist = this.pPos.length();
    if (currentDist <= this.surfaceRadius + 1.1) {
        this.pPos.setLength(this.surfaceRadius + 1.1);
        this.isGrounded = true;
        // Zero out velocity components pointing into the planet
        const normalVelocity = this.pVelocity.dot(up);
        if (normalVelocity < 0) this.pVelocity.sub(up.clone().multiplyScalar(normalVelocity));
    } else {
        this.isGrounded = false;
    }

    // 4. Update Mesh Orientation
    this.playerMesh.position.copy(this.pPos);
    this.playerMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), up);

    // 5. Update Camera
    const camOffset = up.clone().multiplyScalar(12).add(this.camHeading.clone().multiplyScalar(-25));
    const camPos = this.pPos.clone().add(camOffset);
    this.camera.up.copy(up); // Crucial: camera stays upright relative to planet
    this.camera.position.lerp(camPos, 0.05);
    this.camera.lookAt(this.pPos);
  }

  findNPC() {
    let closest = null, minDist = 6.5;
    this.npcMeshes.forEach(npc => {
      const d = this.pPos.distanceTo(npc.position);
      if (d < minDist) { minDist = d; closest = npc; }
    });
    if (closest !== this.nearestNPC) {
      this.nearestNPC = closest;
      this.updateActions(this.cm.getActiveCase());
    }
    if (this.nearestNPC && minDist < 2) this.pPos.addScaledVector(this.pVelocity, -2 / 60);
  }

  updateInWorldTags() {
    const npcPrompt = document.getElementById('inworld-npc-prompt');
    if (this.nearestNPC && !this.inDialogue) {
      const screenPos = this.nearestNPC.position.clone().project(this.camera);
      const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
      const y = (screenPos.y * -0.5 + 0.5) * window.innerHeight;
      npcPrompt.style.left = `${x}px`;
      npcPrompt.style.top = `${y}px`;
      npcPrompt.style.display = 'flex';

      const npcBtn = document.getElementById('inworld-npc-btn');
      const npcName = this.nearestNPC.userData.config?.name || 'NPC';
      npcBtn.innerHTML = `<i class="fa-solid fa-comments"></i> Talk to <strong>${npcName}</strong> <small>[E]</small>`;
      npcBtn.onclick = () => this.startDialogue(this.nearestNPC.userData.config);
    } else {
      npcPrompt.style.display = 'none';
    }

    const collPrompt = document.getElementById('inworld-collectable-prompt');
    let nearestItem = null;
    let minDist = 6.5;
    this.evidenceMeshes.forEach(item => {
      const d = this.pPos.distanceTo(item.position);
      if (d < minDist) { minDist = d; nearestItem = item; }
    });

    if (nearestItem && minDist > 2) {
      const screenPos = nearestItem.position.clone().project(this.camera);
      const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
      const y = (screenPos.y * -0.5 + 0.5) * window.innerHeight;
      collPrompt.style.left = `${x}px`;
      collPrompt.style.top = `${y}px`;
      collPrompt.style.display = 'flex';
      const data = nearestItem.userData.dataRef;
      document.getElementById('inworld-collectable-msg').textContent = (nearestItem.userData.newlyUnlocked ? '✨ NEW — ' : '') + (data.name || 'NEARBY COLLECTABLE');
    } else {
      collPrompt.style.display = 'none';
    }
  }

  updateMinimap() {
    const container = document.getElementById('minimap-blips-container');
    if (!container) return;
    container.innerHTML = '';
    const offset = 55, scale = 0.55;
    
    const up = this.pPos.clone().normalize();
    const fwd = this.camHeading.clone().normalize();
    const rgt = new THREE.Vector3().crossVectors(up, fwd);

    this.npcMeshes.forEach(npc => {
      const rel = npc.position.clone().sub(this.pPos);
      const dist = rel.length();
      if (dist > 100) return;

      const dx = rel.dot(rgt);
      const dz = -rel.dot(fwd);

      const blip = document.createElement('div');
      blip.className = 'minimap-blip npc';
      blip.style.left = (offset + dx * scale) + 'px';
      blip.style.top = (offset + dz * scale) + 'px';
      container.appendChild(blip);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (!this.inDialogue) {
      this.movePlayer();
      this.findNPC();
      this.collectEvidence();
      this.updateMinimap();
      this.updateInWorldTags();
      this._updateEffects();
    }
    if (this.envManager) this.envManager.update(this.controls.autoCycle);
    this.renderer.render(this.scene, this.camera);
  }
}