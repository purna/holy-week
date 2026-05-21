/**
 * LevelManager.js
 *
 * Drives the 10-phase Jerusalem gameplay loop without separate HTML files.
 * Each phase maps to a level data file (level01.js … level10.js).
 *
 * Phase map:
 *  1  – Explore Jerusalem          (level01)
 *  2  – Hear rumours / pick quests (level02)
 *  3  – Talk to witnesses          (level03)
 *  4  – Complete tasks / actions   (level04)
 *  5  – Collect evidence items     (level05)
 *  6  – Unlock deeper convos       (level06)
 *  7  – Attend public teachings    (level07)
 *  8  – Learn parables             (level08)
 *  9  – Build investigation board  (level09)
 * 10  – Reach conclusion / Trial   (level10)
 *
 * Each level module exports a default object matching the LevelData schema
 * defined at the bottom of this file.
 */

export class LevelManager {
    /**
     * @param {object} deps  — runtime dependencies injected from main.js
     * @param {SceneManager}   deps.sceneMgr
     * @param {WorldManager}   deps.worldMgr
     * @param {ModelManager}   deps.modelMgr
     * @param {NPCSystem}      deps.npcSystem
     * @param {DialogueManager} deps.dialogueMgr
     * @param {AudioManager}   deps.audio
     * @param {Function}       deps.updateUI   — main.js updateUI()
     * @param {Function}       deps.onWin      — called when ALL levels complete
     */
    constructor(deps) {
        this.scene       = deps.sceneMgr.scene;
        this.worldMgr    = deps.worldMgr;
        this.modelMgr    = deps.modelMgr;
        this.npcSystem   = deps.npcSystem;
        this.dialogueMgr = deps.dialogueMgr;
        this.audio       = deps.audio;
        this.updateUI    = deps.updateUI;
        this.onWin       = deps.onWin || (() => {});

        this.currentPhase   = 0;   // 1-indexed; 0 = not started
        this.currentData    = null; // active LevelData object
        this._spawnedMeshes = [];   // meshes added for this level (cleaned up on exit)

        // Evidence collected across all phases
        this.evidence = [];        // { id, label, category, phaseCollected }

        // Phase completion flags (index = phase number, 1-based)
        this._phaseComplete = new Array(11).fill(false);

        // Event listeners registered for the current level (cleaned up on exit)
        this._listeners = [];

        // Expose to rest of game via event bus
        this._bindGlobalListeners();
    }

    // ── Public API ───────────────────────────────────────────────────────────

    /** Start the game from phase 1 */
    async start() {
        await this.loadPhase(1);
    }

    /**
     * Load (or reload) a phase by number.
     * Unloads current phase first.
     */
    async loadPhase(phaseNumber) {
        if (phaseNumber < 1 || phaseNumber > 10) {
            console.warn('[LevelManager] Invalid phase:', phaseNumber);
            return;
        }

        // Tear down current phase
        if (this.currentPhase > 0) {
            this._unloadCurrent();
        }

        this.currentPhase = phaseNumber;

        // Dynamic import — only loads the file when needed
        const padded = String(phaseNumber).padStart(2, '0');
        const module = await import(`./level${padded}.js`);
        this.currentData = module.default;

        console.log(`[LevelManager] Loaded phase ${phaseNumber}: ${this.currentData.title}`);

        await this._setupPhase(this.currentData);
        this._emitPhaseEvent('phaseStart', { phase: phaseNumber, data: this.currentData });
    }

    /** Move to the next phase (called when current phase objectives complete) */
    async nextPhase() {
        const next = this.currentPhase + 1;
        if (next > 10) {
            // All phases done — trigger win / trial
            this._emitPhaseEvent('gameComplete', { evidence: this.evidence });
            this.onWin();
            return;
        }
        await this.loadPhase(next);
    }

    /** Mark the current phase complete and advance */
    completeCurrentPhase() {
        if (this._phaseComplete[this.currentPhase]) return;
        this._phaseComplete[this.currentPhase] = true;
        console.log(`[LevelManager] Phase ${this.currentPhase} complete`);
        this._emitPhaseEvent('phaseComplete', {
            phase: this.currentPhase,
            title: this.currentData?.title
        });
        // Small delay so UI can react before swap
        setTimeout(() => this.nextPhase(), 1800);
    }

    /**
     * Add an evidence token to the player's board.
     * @param {string} evidenceId   — matches an id in currentData.evidence[]
     */
    collectEvidence(evidenceId) {
        const def = this.currentData?.evidence?.find(e => e.id === evidenceId);
        if (!def) {
            console.warn('[LevelManager] Unknown evidence id:', evidenceId);
            return;
        }
        if (this.evidence.find(e => e.id === evidenceId)) return; // already collected

        const token = { ...def, phaseCollected: this.currentPhase };
        this.evidence.push(token);
        console.log('[LevelManager] Evidence collected:', token.label);
        this._emitPhaseEvent('evidenceCollected', { token });
        this.updateUI();
        this._checkPhaseObjectives();
    }

    /** Return all evidence collected so far */
    getEvidence() { return this.evidence; }

    /** Return evidence grouped by category */
    getEvidenceBoard() {
        const board = {};
        for (const token of this.evidence) {
            if (!board[token.category]) board[token.category] = [];
            board[token.category].push(token);
        }
        return board;
    }

    /** Return the active phase data */
    getCurrentData() { return this.currentData; }

    // ── Setup / teardown ─────────────────────────────────────────────────────

    async _setupPhase(data) {
        // 1. Load 3D environment model (if specified)
        if (data.modelKey) {
            const mesh = this.modelMgr.getModel(data.modelKey);
            if (mesh) {
                if (data.modelPosition) mesh.position.set(...data.modelPosition);
                if (data.modelScale)    mesh.scale.setScalar(data.modelScale);
                this.scene.add(mesh);
                this._spawnedMeshes.push(mesh);
            }
        }

        // 2. Spawn NPCs defined by this level
        if (data.npcs && data.npcs.length > 0) {
            for (const npcDef of data.npcs) {
                this.npcSystem.spawnNPC(npcDef);
            }
        }

        // 3. Load Ink dialogue stories for this level's NPCs
        if (data.npcs) {
            await Promise.all(
                data.npcs
                    .filter(n => n.hasDialogue && n.storyFile)
                    .map(n => this.dialogueMgr.loadStoryForNPC(n))
            );
        }

        // 4. Spawn collectables (evidence pickups)
        if (data.collectables && data.collectables.length > 0) {
            this.worldMgr.spawnCollectables(data.collectables);
        }

        // 5. Register phase-specific quest
        if (data.quest) {
            this._registerQuest(data.quest);
        }

        // 6. Update HUD with phase title / location
        this._emitPhaseEvent('locationChange', { name: data.location });

        // 7. Play ambient audio cue if defined
        if (data.ambientSound && this.audio) {
            this.audio.playAmbient?.(data.ambientSound);
        }

        // 8. Show phase intro card
        this._showPhaseIntro(data);
    }

    _unloadCurrent() {
        // Remove spawned meshes
        for (const mesh of this._spawnedMeshes) {
            this.scene.remove(mesh);
            mesh.traverse?.(child => {
                child.geometry?.dispose();
                if (Array.isArray(child.material)) {
                    child.material.forEach(m => m.dispose());
                } else {
                    child.material?.dispose();
                }
            });
        }
        this._spawnedMeshes = [];

        // Remove this level's NPCs
        if (this.currentData?.npcs) {
            for (const npcDef of this.currentData.npcs) {
                this.npcSystem.removeNPC?.(npcDef.id);
            }
        }

        // Remove level-specific collectables
        this.worldMgr.clearLevelCollectables?.();

        // Remove event listeners registered during this level
        for (const { type, fn } of this._listeners) {
            document.removeEventListener(type, fn);
        }
        this._listeners = [];
    }

    // ── Quest helpers ────────────────────────────────────────────────────────

    _registerQuest(quest) {
        // Emit so main.js quest panel can pick it up
        this._emitPhaseEvent('questRegistered', { quest });
    }

    _checkPhaseObjectives() {
        if (!this.currentData) return;
        const required = this.currentData.evidence?.filter(e => e.required) ?? [];
        const collected = required.filter(e => this.evidence.find(t => t.id === e.id));
        if (required.length > 0 && collected.length >= required.length) {
            this.completeCurrentPhase();
        }
    }

    // ── UI helpers ───────────────────────────────────────────────────────────

    _showPhaseIntro(data) {
        this._emitPhaseEvent('phaseIntro', {
            phase:       this.currentPhase,
            title:       data.title,
            subtitle:    data.subtitle,
            location:    data.location,
            actLabel:    data.actLabel
        });
    }

    // ── Event bus ────────────────────────────────────────────────────────────

    _emitPhaseEvent(name, detail = {}) {
        document.dispatchEvent(new CustomEvent(`level:${name}`, { detail }));
    }

    /** Register a listener that is automatically cleaned up on phase exit */
    _onPhase(type, fn) {
        document.addEventListener(type, fn);
        this._listeners.push({ type, fn });
    }

    /** Bind listeners that persist for the full game session */
    _bindGlobalListeners() {
        // main.js or world.js dispatches this when a collectable is picked up
        document.addEventListener('evidencePickup', (e) => {
            this.collectEvidence(e.detail.evidenceId);
        });

        // NPC dialogue end can trigger evidence collection
        document.addEventListener('dialogueEvidence', (e) => {
            this.collectEvidence(e.detail.evidenceId);
        });
    }
}

/**
 * ── LevelData schema ─────────────────────────────────────────────────────────
 *
 * Each level file (level01.js … level10.js) exports a default object
 * matching this shape.  Optional fields can be omitted.
 *
 * {
 *   // Metadata
 *   phase:       number,           // 1–10
 *   actLabel:    string,           // e.g. "ACT 1 – THE ARRIVAL"
 *   title:       string,           // e.g. "The Donkey King"
 *   subtitle:    string,           // brief description shown on intro card
 *   location:    string,           // displayed in #loc-name
 *
 *   // 3D environment
 *   modelKey:    string|null,      // key in ModelManager (matches MODELS in config)
 *   modelPosition: [x,y,z]|null,
 *   modelScale:  number|null,
 *
 *   // Audio
 *   ambientSound: string|null,     // key in AudioManager
 *
 *   // Quest (shown in #panel-quest)
 *   quest: {
 *     id:    string,
 *     name:  string,
 *     task:  string,
 *     cur:   number,
 *     tar:   number,
 *   }|null,
 *
 *   // NPCs to spawn (same shape as config.js npcs[])
 *   npcs: NpcDef[],
 *
 *   // Collectable pickups (same shape as config.js collectables[])
 *   collectables: CollectableDef[],
 *
 *   // Evidence definitions for this level
 *   evidence: [
 *     {
 *       id:       string,          // unique token id
 *       label:    string,          // display name on board
 *       category: string,          // 'Miracles'|'Teachings'|'Prophecies'|'Public Reaction'|'Opposition'|'Questions'
 *       description: string,       // flavour text shown in journal
 *       required: boolean,         // must collect to complete phase?
 *     }
 *   ],
 *
 *   // Optional explanation card (shown after evidence collected)
 *   explanation: {
 *     title:   string,
 *     body:    string,
 *   }|null,
 * }
 */
