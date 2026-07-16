import { MobileApp } from "./mobileApp.js";
import { CaseManager } from "./../js/gameplay/caseManager.js";
import { EvidenceSystem } from './../js/gameplay/evidenceSystem.js';
import { NPCSystem } from './npcSystem.js';
import { DeductionEngine } from './../js/gameplay/deductionEngine.js';
import { LocationSystem } from './../js/gameplay/locationSystem.js';
import { AccessibilityManager } from "../js/ui/AccessibilityManager.js";
import { LabUI } from "../js/ui/LabUI.js";
import { ChatUI } from "../js/ui/ChatUI.js";
import { AudioManager } from "./audioManager.js"; // Mobile uses its own AudioManager
import { DialogueManager } from "./dialogueManager.js";

import { UIManager } from "./UIManager.js";
import { GameManager } from "./GameManager.js";
import { PROFILE_ID_MAP } from './npcSystem.js';

// Case Data Imports
import { act1CaseA, act1CaseB, act1CaseC } from "./../js/act1_case.js";
import { act2CaseA, act2CaseB, act2CaseC } from "./../js/act2_case.js";
import { act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE } from "./../js/act3_case.js";
import { act4CaseA, act4CaseB, act4CaseC } from "./../js/act4_case.js";

export class GameEngine {
  constructor(config = {}) {
    this.config = config;
    
    // Core Systems
    this.cm = new CaseManager();
    this.app = new MobileApp({
      tabs: [
        { id: 'scene', label: 'Scene', icon: '🔎' },
        { id: 'people', label: 'People', icon: '🗣' },
        { id: 'lab', label: 'Lab', icon: '🧪' },
        { id: 'codex', label: 'Codex', icon: '📜' },
        { id: 'accuse', label: 'Accuse', icon: '⚖️' }
      ],
      views: ['scene', 'people', 'lab', 'codex', 'accuse']
    });

    this.a11y = new AccessibilityManager({ app: this.app });
    this.es = new EvidenceSystem(this.cm);
    this.ns = new NPCSystem(this.cm, this.es);
    this.de = new DeductionEngine(this.cm, this.es);
    this.ls = new LocationSystem(this.cm);
    this.audio = new AudioManager();
    
    this.dm = new DialogueManager();
    if (window.inkjs) this.dm.setInkLib(window.inkjs);

    this.labUI = new LabUI(this.de, this.es, this.a11y);
    this.chatUI = new ChatUI(this.ns, this.es, this.a11y, null, this.audio, this.dm);

    this.ui = new UIManager(this.cm, this.es, this.ns, this.de, this.ls, this.a11y, this.audio, this.dm, this.app, this.labUI, this.chatUI);
    this.gm = new GameManager(this.cm, this.ui, this.es, this.ns, this.de);

    this.registerCases();
  }

  registerCases() {
    const cases = [
      act1CaseA, act1CaseB, act1CaseC,
      act2CaseA, act2CaseB, act2CaseC,
      act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE,
      act4CaseA, act4CaseB, act4CaseC
    ];

    cases.forEach(c => {
      if (this.config.unlockAllCases) c.requires = null;
      this.cm.registerCase(c);
    });
  }

  async init() {
    this.a11y.restorePreferences();
    
    // Global exports for HTML event handlers
    window.cm = this.cm;
    window.ui = this.ui;
    window.audio = this.audio;
    window.showScreen = this.ui.showScreen.bind(this.ui);
    window.switchInvTab = this.ui.switchInvTab.bind(this.ui);
    window.openLocation = this.ui.openLocation.bind(this.ui);
    window.startCase = this.gm.startCase.bind(this.gm);
    window.accuse = this.gm.accuse.bind(this.gm);
    window.openEvidenceDetail = this.ui.openEvidenceDetail.bind(this.ui);
    window.closeEvidenceDetail = this.ui.closeEvidenceDetail.bind(this.ui);
    window.showInstructionsModal = this.ui.showInstructionsModal.bind(this.ui);
    window.closeInstructionsModal = this.ui.closeInstructionsModal.bind(this.ui);
    window.showResetModal = this.ui.showResetModal.bind(this.ui);
    window.closeResetModal = this.ui.closeResetModal.bind(this.ui);
    window.playAgain = this.gm.resetGame.bind(this.gm);
    window.attemptProphecyMatch = this.ui.attemptProphecyMatch.bind(this.ui);
    window.closeGameComplete = this.ui.closeGameComplete.bind(this.ui);
    window.showProphecyDetail = this.ui.showProphecyDetail.bind(this.ui);

    this.ui.renderMap();
    this.audio.setEnabled(this.a11y.getAll().sound);
    this.audio.playMorningAmbience();

    this.preloadAssets();

    setTimeout(() => {
      this.ui.showInstructionsModal(true);
      this.gm.checkGameComplete();
    }, 800);
  }

  async preloadAssets() {
    const profileUrls = new Set();
    const storyNpcs = [];
    this.cm.getAllCases().forEach(c => {
      (c.npcs || []).forEach(npc => {
        if (npc.profileFile) profileUrls.add(PROFILE_ID_MAP[npc.profileFile] || npc.profileFile);
        if (npc.hasDialogue) storyNpcs.push(npc);
      });
    });
    const storyLoads = storyNpcs.map(n => this.dm.loadStoryForNPC(n));
    const profileLoads = Array.from(profileUrls).map(url => this.ns.loader.loadProfile(url));
    await Promise.all([...storyLoads, ...profileLoads]);
  }
}