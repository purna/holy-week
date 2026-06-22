/**
 * GameManager orchestrates high-level game flow, including case progression,
 * act milestones, and overall completion logic.
 */
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export class GameManager {
  constructor(cm, ui, es, ns, de) {
    this.cm = cm;
    this.ui = ui;
    this.es = es;
    this.ns = ns;
    this.de = de;
  }

  /** Starts a specific case and prepares all sub-systems. */
  async startCase(caseId) {
    this.cm.startCase(caseId);
    const c = this.cm.getCase(caseId);
    if (!c) return;

    // Initialize sub-system states for the new case
    this.es.loadCase(c);
    await this.ns.loadCase(c);
    this.de.loadCase();

    // Play act-specific background music with fade
    if (this.ui.audio && c.actLabel) {
      this.ui.audio.fadeToAct(c.actLabel);
      // Play day/night ambient based on case timeOfDay
      if (c.timeOfDay) {
        this.ui.audio.playTimeAmbience(c.timeOfDay);
      }
    }

    // Direct UI to prepare the investigation environment
    this.ui.setupInvestigation(c);
    this.loadWorldModel(c);
  }

  /** Loads the 3D model for the current case. */
  loadWorldModel(caseData) {
    if (!window.scene3d || !caseData.worldModel) return;

    const scene = window.scene3d.sceneMgr.scene;
    const loader = new GLTFLoader();

    // Clear existing model
    if (window.scene3d.worldModel) {
      scene.remove(window.scene3d.worldModel);
    }

    loader.load(caseData.worldModel, (gltf) => {
      const model = gltf.scene;
      window.scene3d.worldModel = model;

      // Optional: Apply case-specific properties like city layer visibility
      const showCityLayer = caseData.showCityLayer !== false;
      const cityLayer = model.getObjectByName('cities');
      if (cityLayer) {
        cityLayer.visible = showCityLayer;
      }

      scene.add(model);
    });
  }

  /** Processes a suspect accusation and handles the win/loss flow. */
  accuse(suspectId) {
    const result = this.cm.submitAccusation(suspectId);
    if (!result) return;

    this.ui.renderResult(result);
    this.ui.showScreen("result");

    if (result.correct) {
      this.ui.audio.playComplete();
      const currentCase = this.cm.getActiveCase();
      if (currentCase) this.checkActComplete(currentCase);
      this.checkGameComplete();
    } else {
      this.ui.audio.playError();
    }
  }

  /** Checks if all cases in the current act are solved and handles the transition. */
  checkActComplete(caseData) {
    const act = caseData.actLabel;
    if (!act) return;

    const allCases = this.cm.getAllCases();
    const actCases = allCases.filter(c => c.actLabel === act);
    const allSolved = actCases.every(c => this.cm.getCaseProgress(c.id)?.solved);

    if (allSolved) {
      this.nextAct(act);
    }
  }

  /** Handles the narrative transition between Acts. */
  nextAct(completedAct) {
    if (this.ui.audio) this.ui.audio.playHighStakes();
    this.ui.a11y.announce(`${completedAct} complete! New areas of Jerusalem are now accessible on the map.`, true);
    this.ui.renderMap();
  }

  /** Evaluates if the entire Holy Week narrative has been resolved. */
  checkGameComplete() {
    const allCases = this.cm.getAllCases();
    const solvedCount = allCases.filter(c => this.cm.getCaseProgress(c.id)?.solved).length;
    
    if (solvedCount > 0 && solvedCount === allCases.length) {
      const progress = this.cm.getProgress();
      this.ui.showGameComplete(progress.totalScore, progress.rank);
      return true;
    }
    return false;
  }

  /** Wipes all progress and returns the player to the start of Act I. */
  resetGame() {
    this.cm.resetProgress();
    this.ui.closeResetModal();
    document.getElementById("game-complete-modal")?.classList.remove("active");
    this.ui.renderMap();
    this.ui.a11y.announce("Game reset. All progress cleared. Choose a location to begin.");
  }
}