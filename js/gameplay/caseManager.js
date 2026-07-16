// ============================================================
// CASE MANAGER — Unified logic for Case Progress & Scoring
// ============================================================

export class CaseManager {
  constructor() {
    this.cases = {};
    this.activeCaseId = null;
    this.progress = this._loadProgress();
    // Refresh HUD values on load if DOM is ready
    if (typeof document !== 'undefined') {
      setTimeout(() => this._refreshMetricsUI(), 100);
    }
  }

  registerCase(caseData) {
    this.cases[caseData.id] = caseData;
  }

  getCase(id) {
    return this.cases[id] || null;
  }

  getAllCases() {
    return Object.values(this.cases);
  }

  getActiveCase() {
    return this.activeCaseId ? this.cases[this.activeCaseId] : null;
  }

  startCase(id) {
    if (!this.cases[id]) return false;
    this.activeCaseId = id;
    if (!this.progress.cases[id]) {
      this.progress.cases[id] = {
        started: true,
        solved: false,
        sceneViewed: false,
        evidenceFound: [],
        propheciesFound: [],
        labDeductions: {}, // Stores evidence->suspect->result mappings
        breakthroughs: [],
        failedChallenges: 0,
        suspects: this._initializeSuspects(this.cases[id]),
        accusation: null,
        score: null,
      };
      this._saveProgress();
    }
    return true;
  }

  _initializeSuspects(caseData) {
    const suspects = {};
    // All characters in a case start as potential suspects with a 'Neutral' status
    (caseData.suspects || []).forEach(s => {
      suspects[s.id] = { status: 'Neutral', notes: '' };
    });
    return suspects;
  }

  getCaseProgress(id) {
    return this.progress.cases[id] || null;
  }

  recordEvidenceFound(evidenceId) {
    const p = this.progress.cases[this.activeCaseId];
    if (p && !p.evidenceFound.includes(evidenceId)) {
      p.evidenceFound.push(evidenceId);
      // The old "revealsSuspect" logic is now handled by the Lab.
      this._saveProgress();
    }
  }

  recordProphecyFound(prophecyId) {
    const p = this.progress.cases[this.activeCaseId];
    const c = this.getActiveCase();
    if (p && c && !p.propheciesFound.includes(prophecyId)) {
      p.propheciesFound.push(prophecyId);
      this.progress.totalScore = (this.progress.totalScore || 0) + 10;

      // Check if all prophecies are found to unlock final accusation
      if (p.propheciesFound.length === (c.prophecies || []).length) {
        // This is where you could trigger a UI event to unlock the final accusation
        console.log(`All prophecies for case ${this.activeCaseId} found!`);
      }

      this._saveProgress();
      this._refreshMetricsUI();
    }
  }

  recordBreakthrough(npcId, evidenceKey) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      if (!p.breakthroughs) p.breakthroughs = [];
      if (!p.breakthroughs.includes(evidenceKey)) {
        p.breakthroughs.push(evidenceKey);
        this._saveProgress();
        if (window.audio && typeof window.audio.playClue === 'function') window.audio.playClue();
      }
    }
  }

  /**
   * Records a deduction made in the Lab, updating a suspect's status.
   * @param {string} evidenceId - The ID of the evidence used.
   * @param {string} suspectId - The ID of the suspect affected.
   * @param {string} result - The deductive outcome (e.g., "Implicated", "Cleared").
   */
  recordLabDeduction(evidenceId, suspectId, result) {
    const p = this.progress.cases[this.activeCaseId];
    if (!p || !p.suspects[suspectId]) return;

    p.suspects[suspectId].status = result;
    p.labDeductions[evidenceId] = { suspect: suspectId, result };
    this._saveProgress();
  }

  getSuspectStatus(suspectId) {
    const p = this.progress.cases[this.activeCaseId];
    return p?.suspects[suspectId] || { status: 'Unknown', notes: '' };
  }

  updateDoubt(amount) {
    this.progress.doubt = Math.max(0, (this.progress.doubt || 0) + amount);
    this._saveProgress();
    this._refreshMetricsUI();
  }

  updateReputation(faction, amount) {
    if (!this.progress.reputations) {
      this.progress.reputations = { scribes: 100, temple: 100, roman: 100, local: 100 };
    }
    const current = this.progress.reputations[faction] !== undefined ? this.progress.reputations[faction] : 100;
    this.progress.reputations[faction] = Math.max(0, Math.min(100, current + amount));
    this._saveProgress();
    this._refreshMetricsUI();
  }

  _refreshMetricsUI() {
    if (typeof document === 'undefined') return;
    const doubtEls = document.querySelectorAll('.val-doubt');
    const repEls = document.querySelectorAll('.val-reputation');
    const scoreValEls = document.querySelectorAll('.val-score');

    const newDoubt = this.progress.doubt || 0;
    doubtEls.forEach(el => el.textContent = newDoubt);

    const newScoreNum = this.progress.totalScore || 0;
    scoreValEls.forEach(el => el.textContent = newScoreNum);

    if (this.progress.reputations) {
      const reps = Object.values(this.progress.reputations);
      const avg = Math.round(reps.reduce((a, b) => a + b, 0) / reps.length);
      repEls.forEach(el => el.textContent = avg);
    }
  }

  submitAccusation(suspectId) {
    const c = this.getActiveCase();
    const p = this.progress.cases[this.activeCaseId];
    if (!c || !p) return null;
    const correct = suspectId === c.truth.culprit;
    const evidenceScore = (p.evidenceFound || []).length * 5;
    const deductionScore = Object.keys(p.labDeductions || {}).length * 15;
    const challengeScore = (p.breakthroughs || []).length * 10;
    const prophecyScore = (p.propheciesFound || []).length * 10;
    const baseAccusationScore = correct ? 50 : -25;
    const doubtPenalty = (this.progress.doubt || 0) * 2;
    const perfectBonus = (correct && (p.failedChallenges || 0) === 0) ? 25 : 0;
    const total = Math.max(0, (evidenceScore + deductionScore + challengeScore + prophecyScore + baseAccusationScore + perfectBonus) - doubtPenalty);

    const result = {
      correct, suspectId, truth: c.truth,
      score: { evidence: evidenceScore, deduction: deductionScore, challenge: challengeScore, prophecy: prophecyScore, accusation: baseAccusationScore, perfectBonus, doubtPenalty, total },
    };

    p.accusation = suspectId;
    p.solved = correct;
    p.score = result.score;
    this.progress.totalScore = Math.max(0, (this.progress.totalScore || 0) + total);
    if (correct) this.progress.rank = this._calcRank(total);
    else this.updateDoubt(25);

    this._refreshMetricsUI();
    this._saveProgress();
    return result;
  }

  _calcRank(score) {
    if (score >= 90) return "Master Detective";
    if (score >= 70) return "Analyst";
    if (score >= 50) return "Investigator";
    return "Rookie";
  }

  getUnlockedCases() {
    return this.getAllCases().filter(c => !c.requires || this.progress.cases[c.requires]?.solved);
  }

  getProgress() {
    const cases = Object.values(this.cases);
    if (cases.length === 0) return 0;
    const solved = Object.values(this.progress.cases).filter(c => c.solved).length;
    return Math.floor((solved / cases.length) * 100);
  }

  _loadProgress() {
    const raw = localStorage.getItem("detective_progress");
    return raw ? JSON.parse(raw) : { cases: {}, totalScore: 0, rank: "Rookie", doubt: 0, reputations: { scribes: 100, temple: 100, roman: 100, local: 100 } };
  }

  _saveProgress() { localStorage.setItem("detective_progress", JSON.stringify(this.progress)); }
  resetProgress() { localStorage.removeItem("detective_progress"); location.reload(); }
}