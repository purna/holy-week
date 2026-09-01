import { MobileApp } from "./mobileApp.js";
import { CaseManager } from "./../js/gameplay/caseManager.js";
import { EvidenceSystem } from './../js/gameplay/evidenceSystem.js';
import { NPCSystem } from './npcSystem.js';
import { PROFILE_ID_MAP } from './npcSystem.js';
import { DeductionEngine } from './../js/gameplay/deductionEngine.js';
import { LocationSystem } from './../js/gameplay/locationSystem.js';
import { AccessibilityManager } from "../js/ui/AccessibilityManager.js";
import { LabWorkspaceUI } from "../js/ui/LabWorkspaceUI.js";
import { AudioManager } from "./audioManager.js"; // Mobile uses its own AudioManager
import { DialogueManager } from "./dialogueManager.js";

import { UIManager } from "./UIManager.js";
import { GameManager } from "./GameManager.js";
import { ChainManager } from "./../js/gameplay/chainManager.js";

// Case Data Imports
import { act1CaseA, act1CaseB, act1CaseC } from "./../js/act1_case.js";
import { act2CaseA, act2CaseB, act2CaseC, act2CaseD } from "./../js/act2_case.js";
import { act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE } from "./../js/act3_case.js";
import { act4CaseA, act4CaseB, act4CaseC, act4CaseD } from "./../js/act4_case.js";

export class GameEngine {
  constructor(config = {}) {
    this.config = config;

    // Core Systems
    this.cm = new CaseManager(this.config);
    this.app = new MobileApp({
      tabs: [
        { id: 'scene', label: 'Scene', icon: '../assets/gfx/search.svg' },
        { id: 'evidence', label: 'Evidence', icon: '../assets/gfx/backpack-duotone.svg' },
        { id: 'people', label: 'People', icon: '../assets/gfx/chat-duotone.svg' },
        { id: 'lab', label: 'Lab', icon: '../assets/gfx/microscope-duotone.svg' },
         { id: 'codex', label: 'Codex', icon: '../assets/gfx/scroll-duotone.svg' },
         { id: 'casefile', label: 'Case File', icon: '../assets/gfx/balance-scale-duotone.svg' }
      ],
      views: ['scene', 'evidence', 'people', 'lab', 'codex', 'casefile']
    });

    this.a11y = new AccessibilityManager({ app: this.app });
    this.es = new EvidenceSystem(this.cm, this.config);
    this.ns = new NPCSystem(this.cm, this.es, this.config);
    this.de = new DeductionEngine(this.cm, this.es);
    this.ls = new LocationSystem(this.cm);
    this.audio = new AudioManager();

    this.dm = new DialogueManager();
    if (window.inkjs) this.dm.setInkLib(window.inkjs);

    this.labUI = new LabWorkspaceUI(this.de, this.es, this.a11y);

    this.chainManager = new ChainManager(this.cm);
    this.chainManager.onChainCompleted = (chain) => {
      this.ui.showChainComplete?.(chain);
    };

    this.ui = new UIManager(this.cm, this.es, this.ns, this.de, this.ls, this.a11y, this.audio, this.dm, this.app, this.labUI, this.chainManager);
    const introData = document.getElementById('prophecy-people-intro-data');
    if (introData) this.ui.peopleUI.peopleIntroHtml = introData.innerHTML;
    this.gm = new GameManager(this.cm, this.ui, this.es, this.ns, this.de, this.chainManager, this);
    this.ui.gameManager = this.gm;

    this.registerCases();
    this._initDebugPanel();
  }

  _initDebugPanel() {
    const panel = document.getElementById('debug-panel');
    if (!panel) return;
    const cfg = this.config || {};
    if (!cfg.DEBUG?.enabled) return;
    panel.classList.add('active');

    panel.querySelectorAll('.debug-btn').forEach(btn => {
      const action = btn.dataset.debug;
      const isActive = !!cfg.DEBUG[action];
      btn.classList.toggle('active', isActive);
      btn.addEventListener('click', () => {
        const next = !btn.classList.contains('active');
        btn.classList.toggle('active', next);
        this._applyDebugToggle(action, next);
      });
    });
  }

  _applyDebugToggle(action, enabled) {
    switch (action) {
      case 'unlockAllCaseEvidence':
        if (enabled) {
          const c = this.cm.getActiveCase();
          if (c) {
            (c.evidencePool || []).forEach(ev => this.cm.recordEvidenceFound(ev.id));
            this.cm.unlockEvidenceForScene(c.id, (c.evidencePool || []).map(ev => ev.id));
          }
        }
        break;
      case 'solveAllLabCases':
        if (enabled) {
          const c = this.cm.getActiveCase();
          if (c) {
            (c.lab || []).forEach(entry => {
              if (entry.evidence && entry.result) {
                this.cm.recordLabDeduction(entry.evidence, entry.suspect, entry.result);
              }
            });
            (c.prophecies || []).forEach(p => {
              this.cm.setCodexStatus(p.id, 'found_scripture');
              this.cm.setCodexStatus(p.id, 'complete');
              this.cm.recordProphecyFound(p.id);
            });
            this.cm.checkAndAutoConclude();
          }
        }
        break;
      case 'unlockAllProphecies':
        if (enabled) {
          const c = this.cm.getActiveCase();
          if (c) {
            (c.prophecies || []).forEach(p => {
              this.cm.setCodexStatus(p.id, 'found_scripture');
              this.cm.setCodexStatus(p.id, 'complete');
              this.cm.recordProphecyFound(p.id);
            });
          }
        }
        break;
      case 'unlockAllPeople':
        if (enabled) {
          const c = this.cm.getActiveCase();
          if (c) {
            (c.npcs || []).forEach(npc => this.cm.discoverSuspect(npc.id));
            (c.suspects || []).forEach(s => this.cm.discoverSuspect(s.id));
          }
        }
        break;
      case 'unlockAllCases':
        this.cm.config.DEBUG.unlockAllCases = enabled;
        if (enabled) {
          this.cm.getAllCases().forEach(caseItem => {
            if (caseItem.requires) {
              const req = this.cm.getCaseProgress(caseItem.requires);
              if (req) { req.solved = true; req.concluded = true; }
            }
          });
        }
        this.cm._saveProgress();
        this.ui.renderMap();
        break;
    }
  }

  resetDebugToggles(buttons = []) {
    const panel = document.getElementById('debug-panel');
    if (!panel) return;
    buttons.forEach(action => {
      this.cm.config.DEBUG[action] = false;
      const btn = panel.querySelector(`[data-debug="${action}"]`);
      if (btn) {
        btn.classList.remove('active');
        this._applyDebugToggle(action, false);
      }
    });
  }

  registerCases() {
    const cases = [
      act1CaseA, act1CaseB, act1CaseC,
      act2CaseA, act2CaseB, act2CaseC, act2CaseD,
      act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE,
      act4CaseA, act4CaseB, act4CaseC, act4CaseD
    ];

    cases.forEach(c => {
      if (this.config.DEBUG?.unlockAllCases) c.requires = null;
      this.cm.registerCase(c);
    });
  }

  async init() {
    this.a11y.restorePreferences();
    if (this.ui.bindUICallbacks) this.ui.bindUICallbacks();

    // Global exports for HTML event handlers
    window.cm = this.cm;
    window.ui = this.ui;
    window.audio = this.audio;
    window.showScreen = this.ui.showScreen.bind(this.ui);
    window.switchInvTab = this.ui.switchInvTab.bind(this.ui);
    window.openAct = this.ui.openAct.bind(this.ui);
    window.openLocation = this.ui.openLocation.bind(this.ui);
    window.startCase = this.gm.startCase.bind(this.gm);
    window.conclude = this.gm.conclude.bind(this.gm);
    window.showConclusionResult = this.gm.showConclusionResult.bind(this.gm);
    window.toggleSuspect = function (btn) {
      const accordion = btn.closest('.suspect-accordion');
      if (!accordion) return;
      const isExpanded = accordion.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    };
    window.goBack = () => this.ui.goBack();
    window.openEvidenceDetail = this.ui.openEvidenceDetail.bind(this.ui);
    window.closeEvidenceDetail = this.ui.closeEvidenceDetail.bind(this.ui);
    window.openInventory = this.ui.openInventory.bind(this.ui);
    window.closeInventory = this.ui.closeInventory.bind(this.ui);
    window.showInstructionsModal = this.ui.showInstructionsModal.bind(this.ui);
    window.closeInstructionsModal = this.ui.closeInstructionsModal.bind(this.ui);
    window.showResetModal = this.ui.showResetModal.bind(this.ui);
    window.closeResetModal = this.ui.closeResetModal.bind(this.ui);
    window.playAgain = this.gm.resetGame.bind(this.gm);
    window.attemptProphecyMatch = this.ui.codexUI.attemptProphecyMatch.bind(this.ui.codexUI);
    window.closeGameComplete = this.ui.closeGameComplete.bind(this.ui);
    window.showProphecyDetail = this.ui.showProphecyDetail.bind(this.ui);

    this.ui.renderMap();
    this.audio.setEnabled(this.a11y.getAll().sound);
    this.audio.playMorningAmbience();

    // Gate interaction behind the loading screen so a Case tap never appears unresponsive while content fetches
    const loadStart = performance.now();
    await this.preloadAssets();
    // Keep the loader visible for at least a second so fast connections still see it complete
    const remaining = 1000 - (performance.now() - loadStart);
    if (remaining > 0) await new Promise(r => setTimeout(r, remaining));
    this._hideLoadingScreen();

    setTimeout(() => {
      this.ui.showInstructionsModal(true);
      this.gm.checkGameComplete();
      this.gm.checkChains();
    }, 800);
  }

  _hideLoadingScreen() {
    const screen = document.getElementById('loading-screen');
    if (!screen) return;
    screen.classList.add('loading-hidden');
    setTimeout(() => screen.remove(), 500);
  }

  async preloadAssets() {
    const profileUrls = new Set();
    const storyNpcs = [];
    this.cm.getAllCases().forEach(c => {
      (c.npcs || []).forEach(npc => {
        if (npc.profileFile) profileUrls.add(PROFILE_ID_MAP[npc.profileFile] || npc.profileFile);
        if (npc.hasDialogue) storyNpcs.push({ caseId: c.id, npc });
      });
    });

    const statusEl = document.getElementById('loading-status');
    const barEl = document.getElementById('loading-bar-fill');
    const total = storyNpcs.length + profileUrls.size;
    let loaded = 0;
    const tick = () => {
      loaded++;
      const pct = total ? Math.round((loaded / total) * 100) : 100;
      if (statusEl) statusEl.textContent = `Loading investigation archives\u2026 ${pct}%`;
      if (barEl) barEl.style.width = `${pct}%`;
    };

    const storyLoads = storyNpcs.map(({ caseId, npc }) => this.dm.loadStoryForNPC(npc, caseId).then(tick, tick));
    const profileLoads = Array.from(profileUrls).map(url => this.ns.loader.loadProfile(url).then(tick, tick));
    await Promise.all([...storyLoads, ...profileLoads]);
  }
}