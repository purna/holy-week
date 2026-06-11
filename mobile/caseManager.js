// ============================================================
// CASE MANAGER — loads cases, tracks progress, scores reasoning
// ============================================================

export class CaseManager {
  constructor() {
    this.cases = {};
    this.activeCaseId = null;
    this.progress = this._loadProgress();
    // Refresh HUD values on load
    setTimeout(() => this._refreshMetricsUI(), 100);
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
        deductionsMade: [],
        breakthroughs: [],
        failedChallenges: 0,
        discoveredSuspects: [], 
        accusation: null,
        score: null,
      };
      this._saveProgress();
    }
    return true;
  }

  getCaseProgress(id) {
    return this.progress.cases[id] || null;
  }

  recordEvidenceFound(evidenceId) {
    const p = this.progress.cases[this.activeCaseId];
    const c = this.getActiveCase();
    if (p && c && !p.evidenceFound.includes(evidenceId)) {
      p.evidenceFound.push(evidenceId);
      
      // Auto-unlock suspects identified by physical evidence
      const ev = c.evidencePool.find(e => e.id === evidenceId);
      if (ev && ev.revealsSuspect) {
        this.discoverSuspect(ev.revealsSuspect);
      }
      this._saveProgress();
    }
  }

  recordProphecyFound(prophecyId) {
    const p = this.progress.cases[this.activeCaseId];
    if (p && !p.propheciesFound.includes(prophecyId)) {
      p.propheciesFound.push(prophecyId);
      this.updateScore(10); // Prophecy discovery also adds to score
      this._saveProgress();
    }
  }

  recordDeduction(deduction) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      p.deductionsMade.push(deduction);
      this._saveProgress();
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

  discoverSuspect(suspectId) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      if (!p.discoveredSuspects) p.discoveredSuspects = [];
      if (!p.discoveredSuspects.includes(suspectId)) {
        p.discoveredSuspects.push(suspectId);
        this._saveProgress();
        this._refreshMetricsUI();
      }
    }
  }

  hasDeduction(deductionId) {
    const p = this.progress.cases[this.activeCaseId];
    if (!p || !p.deductionsMade) return false;
    return p.deductionsMade.some(d => d.deductionId === deductionId);
  }

  recordFailedChallenge() {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      p.failedChallenges = (p.failedChallenges || 0) + 1;
      this._saveProgress();
    }
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

    // Play distinct bonus sound if reputation is awarded
    if (amount > 0 && window.audio && typeof window.audio.playBonus === 'function') {
      window.audio.playBonus();
    }
  }

  _refreshMetricsUI() {
    if (typeof document === 'undefined') return;
    
    const doubtEls = document.querySelectorAll('.val-doubt');
    const repEls = document.querySelectorAll('.val-reputation');
    const scoreValEls = document.querySelectorAll('.val-score');
    
    // Handle Doubt
    const newDoubt = this.progress.doubt || 0;
    doubtEls.forEach(el => {
      const oldVal = parseInt(el.textContent) || 0;
      if (oldVal !== newDoubt) {
        el.textContent = newDoubt;
        if (newDoubt > oldVal) {
          el.classList.remove('bump');
          void el.offsetWidth;
          el.classList.add('bump');
          if (window.audio && typeof window.audio.playRumble === 'function') window.audio.playRumble();
        }
      }
    });
    
    // Handle Score
    const newScoreNum = this.progress.totalScore || 0;
    scoreValEls.forEach(el => {
      if (el.textContent !== String(newScoreNum)) {
        el.textContent = newScoreNum;
        el.classList.remove('bump');
        void el.offsetWidth;
        el.classList.add('bump');
      }
    });
    
    // Handle Reputation
    if (this.progress.reputations) {
      // Display the average standing across all factions in the global HUD
      const reps = Object.values(this.progress.reputations);
      const avg = Math.round(reps.reduce((a, b) => a + b, 0) / reps.length);
      repEls.forEach(el => {
        const oldVal = parseInt(el.textContent) || 0;
        if (oldVal !== avg) {
          el.textContent = avg;
          if (avg > oldVal) {
            el.classList.remove('bump');
            void el.offsetWidth;
            el.classList.add('bump');
          }
        }
      });
    }
  }

  submitAccusation(suspectId) {
    const c = this.getActiveCase();
    const p = this.progress.cases[this.activeCaseId];
    if (!c || !p) return null;

    const correct = suspectId === c.truth.culprit;
    
    // Scoring Strategy: Evidence (5/ea), Key Deductions (15/ea), Breakthroughs (10/ea), Prophecies (10/ea)
    const evidenceScore = (p.evidenceFound || []).length * 5;
    const deductionScore = (p.deductionsMade || []).filter(d => d.isKeyDeduction).length * 15;
    const challengeScore = (p.breakthroughs || []).length * 10;
    const prophecyScore = (p.propheciesFound || []).length * 10;
    const baseAccusationScore = correct ? 50 : -25;
    const currentDoubt = this.progress.doubt || 0;
    const doubtPenalty = currentDoubt * 2;
    const perfectBonus = (correct && (p.failedChallenges || 0) === 0) ? 25 : 0;

    const total = Math.max(0, (evidenceScore + deductionScore + challengeScore + prophecyScore + baseAccusationScore + perfectBonus) - doubtPenalty);

    const result = {
      correct,
      suspectId,
      truth: c.truth,
      score: { 
        evidence: evidenceScore, 
        deduction: deductionScore, 
        challenge: challengeScore,
        prophecy: prophecyScore,
        accusation: baseAccusationScore,
        perfectBonus: perfectBonus,
        doubtPenalty: doubtPenalty,
        total 
      },
    };

    p.accusation = suspectId;
    p.solved = correct;
    p.score = result.score;

    this.progress.totalScore = Math.max(0, (this.progress.totalScore || 0) + total);
    
    if (correct) {
      this.progress.rank = this._calcRank(total);
    } else {
      this.updateDoubt(25); // Failed accusation significantly increases doubt
    }
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
    const all = this.getAllCases();
    return all.filter(c => {
      if (!c.requires) return true;
      return this.progress.cases[c.requires]?.solved;
    });
  }

  getProgress() {
    return this.progress;
  }

  _loadProgress() {
    try {
      const raw = localStorage.getItem("detective_progress");
      const data = raw ? JSON.parse(raw) : { 
        cases: {}, 
        totalScore: 0, 
        rank: "Rookie", 
        doubt: 0, 
        reputations: { scribes: 100, temple: 100, roman: 100, local: 100 } 
      };
      // Ensure new metrics exist for returning players
      if (data.doubt === undefined) data.doubt = 0;
      if (!data.reputations) data.reputations = { scribes: 100, temple: 100, roman: 100, local: 100 };
      if (data.cases) {
        for (const id in data.cases) {
          const c = data.cases[id];
          if (!c.evidenceFound) c.evidenceFound = [];
          if (!c.propheciesFound) c.propheciesFound = [];
          if (!c.deductionsMade) c.deductionsMade = [];
          if (!c.breakthroughs) c.breakthroughs = [];
          if (!c.discoveredSuspects) c.discoveredSuspects = [];
          if (c.failedChallenges === undefined) c.failedChallenges = 0;
        }
      }
      return data;
    } catch {
      return { cases: {}, totalScore: 0, rank: "Rookie", doubt: 0, reputations: { scribes: 100, temple: 100, roman: 100, local: 100 } };
    }
  }

  _saveProgress() {
    try {
      localStorage.setItem("detective_progress", JSON.stringify(this.progress));
    } catch {}
  }

  resetProgress() {
    localStorage.removeItem("detective_progress");
    localStorage.removeItem("holy_week_first_play");
    this.progress = { cases: {}, totalScore: 0, rank: "Rookie", doubt: 0, reputations: { scribes: 100, temple: 100, roman: 100, local: 100 } };
    this._refreshMetricsUI();
  }
}
