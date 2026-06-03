/**
 * GameManager orchestrates high-level game flow, including case progression,
 * act milestones, and overall completion logic.
 */
export class GameManager {
  constructor(cm, ui, es, ns, de) {
    this.cm = cm;
    this.ui = ui;
    this.es = es;
    this.ns = ns;
    this.de = de;
  }

  /** Starts a specific case and prepares all sub-systems. */
  startCase(caseId) {
    this.cm.startCase(caseId);
    const c = this.cm.getCase(caseId);
    if (!c) return;

    // Initialize sub-system states for the new case
    this.es.loadCase(c);
    this.ns.loadCase(c);
    this.de.loadCase();

    // Direct UI to prepare the investigation environment
    this.ui.setupInvestigation(c);
  }

  /** Processes a suspect accusation and handles the win/loss flow. */
  accuse(suspectId) {
    const result = this.cm.submitAccusation(suspectId);
    if (!result) return;

    this.ui.renderResult(result);
    this.ui.showScreen("result");

    if (result.correct) {
      this.ui.audio.playComplete();
      this.checkGameComplete();
    } else {
      this.ui.audio.playError();
    }
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