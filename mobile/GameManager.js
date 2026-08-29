/**
 * GameManager orchestrates high-level game flow, including case progression,
 * act milestones, and overall completion logic.
 */
export class GameManager {
  constructor(cm, ui, es, ns, de, chainManager, ge) {
    this.cm = cm;
    this.ui = ui;
    this.es = es;
    this.ns = ns;
    this.de = de;
    this.chainManager = chainManager;
    this.ge = ge;

    // Prevent repeated taps while a case is opening.
    this._startingCase = false;
  }

  /** Creates or returns the lightweight case-loading overlay. */
  _getCaseLoader() {
    let overlay = document.getElementById('case-loading-overlay');
    if (overlay) return overlay;

    overlay = document.createElement('div');
    overlay.id = 'case-loading-overlay';
    overlay.setAttribute('role', 'status');
    overlay.setAttribute('aria-live', 'polite');
    overlay.setAttribute('aria-atomic', 'true');

    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      zIndex: '99999',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'rgba(10, 12, 18, 0.82)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)'
    });

    const panel = document.createElement('div');
    Object.assign(panel.style, {
      width: 'min(420px, 100%)',
      padding: '24px',
      borderRadius: '18px',
      background: 'rgba(24, 27, 36, 0.98)',
      border: '1px solid rgba(255,255,255,0.14)',
      boxShadow: '0 18px 55px rgba(0,0,0,0.42)',
      color: '#fff',
      textAlign: 'center'
    });

    const title = document.createElement('div');
    title.id = 'case-loading-title';
    title.textContent = 'Preparing case…';
    Object.assign(title.style, {
      marginBottom: '8px',
      fontFamily: '"Syne", sans-serif',
      fontSize: '1.2rem',
      fontWeight: '700'
    });

    const message = document.createElement('div');
    message.id = 'case-loading-message';
    message.textContent = 'Opening case file…';
    Object.assign(message.style, {
      minHeight: '1.5em',
      marginBottom: '16px',
      opacity: '0.82',
      fontFamily: '"Space Mono", monospace',
      fontSize: '0.85rem'
    });

    const track = document.createElement('div');
    track.id = 'case-loading-track';
    track.setAttribute('role', 'progressbar');
    track.setAttribute('aria-valuemin', '0');
    track.setAttribute('aria-valuemax', '100');
    track.setAttribute('aria-valuenow', '0');
    Object.assign(track.style, {
      width: '100%',
      height: '8px',
      overflow: 'hidden',
      borderRadius: '999px',
      background: 'rgba(255,255,255,0.13)'
    });

    const fill = document.createElement('div');
    fill.id = 'case-loading-fill';
    Object.assign(fill.style, {
      width: '0%',
      height: '100%',
      borderRadius: 'inherit',
      background: 'currentColor',
      transition: 'width 220ms ease'
    });

    track.appendChild(fill);
    panel.appendChild(title);
    panel.appendChild(message);
    panel.appendChild(track);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    return overlay;
  }

  /** Shows the loading overlay. */
  _showCaseLoader(caseTitle = '', percent = 5, message = 'Opening case file…') {
    const overlay = this._getCaseLoader();
    const title = document.getElementById('case-loading-title');

    if (title) {
      title.textContent = caseTitle ? `Opening: ${caseTitle}` : 'Preparing case…';
    }

    this._setCaseLoadProgress(percent, message);
    overlay.style.display = 'flex';

    if (this.ui?.a11y?.announce && message) {
      this.ui.a11y.announce(message);
    }
  }

  /** Updates the loading progress. */
  _setCaseLoadProgress(percent, message) {
    const fill = document.getElementById('case-loading-fill');
    const track = document.getElementById('case-loading-track');
    const text = document.getElementById('case-loading-message');
    const value = Math.max(0, Math.min(100, Number(percent) || 0));

    if (fill) fill.style.width = `${value}%`;
    if (track) track.setAttribute('aria-valuenow', String(value));
    if (text && message) text.textContent = message;
  }

  /** Hides and resets the loading overlay. */
  _hideCaseLoader() {
    const overlay = document.getElementById('case-loading-overlay');
    if (!overlay) return;

    overlay.style.display = 'none';
    this._setCaseLoadProgress(0, 'Opening case file…');
  }

  /** Starts a specific case and prepares all sub-systems. */
  async startCase(caseId) {
    if (this._startingCase) return;
    this._startingCase = true;

    try {
      const started = this.cm.startCase(caseId);
      const c = this.cm.getCase(caseId);

      if (!started || !c) {
        this._showCaseLoader(c?.title, 100, 'The case could not be opened. Please try again.');
        if (this.ui?.a11y?.announce) {
          this.ui.a11y.announce('The case could not be opened. Please try again.', true);
        }
        window.setTimeout(() => this._hideCaseLoader(), 1800);
        console.error(`[GameManager] Unable to start case: ${caseId}`);
        return;
      }

      this._showCaseLoader(c.title, 15, 'Loading case — please wait…');
      await new Promise((resolve) => requestAnimationFrame(resolve));

      this.ge.resetDebugToggles(['unlockAllCaseEvidence', 'solveAllLabCases', 'unlockAllProphecies', 'unlockAllPeople']);
      this.es.loadCase(c);
      this.de.loadCase();

      this._setCaseLoadProgress(35, 'Opening investigation…');
      this.ui.setupInvestigation(c);

      await new Promise((resolve) => requestAnimationFrame(resolve));

      this._setCaseLoadProgress(55, 'Loading witnesses…');

      if (this.ui.audio && c.actLabel) {
        try {
          this.ui.audio.fadeToAct(c.actLabel);
          if (c.timeOfDay) {
            this.ui.audio.playTimeAmbience(c.timeOfDay);
          }
        } catch (audioErr) {
          console.warn('[GameManager] Audio setup failed:', audioErr);
        }
      }

      let finalMessage = 'Finalising witnesses…';

      try {
        await this.ns.loadCase(c);
      } catch (npcErr) {
        console.error(`[GameManager] NPC setup failed for ${caseId}:`, npcErr);
        finalMessage = 'Case opened — some witness data may be unavailable.';
      }

      this._setCaseLoadProgress(75, 'Preparing scene…');

      try {
        if (window.scene3d && window.scene3d.loadCase) {
          await window.scene3d.loadCase(c.id);
        }
      } catch (sceneErr) {
        console.error(`[GameManager] Scene setup failed for ${caseId}:`, sceneErr);
      }

      this._setCaseLoadProgress(90, finalMessage);

      if (this.ui.renderPeople) {
        this.ui.renderPeople();
      }

      this._setCaseLoadProgress(100, 'Ready');
      window.setTimeout(() => this._hideCaseLoader(), 180);
    } catch (err) {
      console.error(`[GameManager] Failed to start case ${caseId}:`, err);
      this._setCaseLoadProgress(100, 'The case could not be opened. Please try again.');

      if (this.ui?.a11y?.announce) {
        this.ui.a11y.announce('The case could not be opened. Please try again.', true);
      }

      window.setTimeout(() => this._hideCaseLoader(), 1800);
    } finally {
      this._startingCase = false;
    }
  }

  /** Processes a case conclusion when all evidence, prophecies, and deductions are complete. */
  conclude() {
    const result = this.cm.submitConclusion();
    if (!result) return;

    this.ui.renderResult(result);
    this.ui.showConclusionModal(result);
    this.ui.showScreen("result");

    this.ui.audio.playComplete();
    this.ui._startFireworks();
    const currentCase = this.cm.getActiveCase();
    if (currentCase) this.checkActComplete(currentCase);
    this.checkGameComplete();
    this.checkChains();
    this.checkGameOver();
  }

  /** Shows the stored conclusion result for an already-concluded case. */
  showConclusionResult() {
    console.log("showConclusionResult called");
    const result = this.cm.submitConclusion();
    if (!result) {
      console.warn("submitConclusion returned no result");
      return;
    }
    this.ui.renderResult(result);
    this.ui.showConclusionModal(result);
    this.ui.showScreen("result");
    this.ui.audio.playComplete();
    this.ui._startFireworks();
  }

  /** Checks all active detective chains and notifies UI of any completions. */
  checkChains() {
    if (!this.chainManager) return;
    const completed = this.chainManager.checkAllChains();
    completed.forEach(chain => {
      this.ui.a11y.announce(`Hidden chain completed: ${chain.name}.`, true);
    });
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

  /** Checks if the player has lost due to excessive doubt or zero reputation. */
  checkGameOver() {
    const progress = this.cm.getProgress();
    if (!progress) return false;

    const doubt = progress.doubt || 0;
    if (doubt >= 50) {
      this.ui.showGameOver('doubt');
      return true;
    }

    if (progress.reputations) {
      const reps = Object.values(progress.reputations);
      if (reps.some(r => r <= 0)) {
        this.ui.showGameOver('reputation');
        return true;
      }
    }

    return false;
  }

  /** Wipes all progress and returns the player to the start of Act I - The Triumphal Entry. */
  resetGame() {
    this.cm.resetProgress();
    this.ui.closeResetModal();
    document.getElementById("game-complete-modal")?.classList.remove("active");
    this.ui.renderMap();
    this.ui.a11y.announce("Game reset. All progress cleared. Choose a location to begin.");
  }
}