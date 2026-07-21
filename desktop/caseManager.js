// ============================================================
// CASE MANAGER — loads cases, tracks progress, scores reasoning
// ============================================================

export class CaseManager {
  constructor() {
    this.cases = {};
    this.activeCaseId = null;
    this.progress = this._loadProgress();
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
    const isNew = !this.progress.cases[id];
    if (isNew) {
      this.progress.cases[id] = {
        started: true,
        solved: false,
        evidenceFound: [],
        deductionsMade: [],
        unlockedSuspects: [],
        suspects: this._initializeSuspects(this.cases[id]),
        accusation: null,
        score: null,
      };
    }
    if (!isNew) {
      const p = this.progress.cases[id];
      const c = this.getActiveCase();
      if (!p.suspects) p.suspects = this._initializeSuspects(c);
      (p.evidenceFound || []).forEach(evId => {
        const ev = c?.evidencePool.find(e => e.id === evId);
        if (ev && ev.revealsSuspect && !p.unlockedSuspects.includes(ev.revealsSuspect)) {
          p.unlockedSuspects.push(ev.revealsSuspect);
        }
        if (c?.lab) {
          const labEntry = c.lab.find(l => l.evidence === evId);
          if (labEntry && p.suspects[labEntry.suspect]) {
            p.suspects[labEntry.suspect].status = labEntry.result;
            p.suspects[labEntry.suspect].notes = labEntry.result;
          }
        }
      });
    }
    this._saveProgress();
    return true;
  }

  _initializeSuspects(caseData) {
    const suspects = {};
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
    const c = this.getActiveCase();
    if (p && c) {
      if (!p.evidenceFound.includes(evidenceId)) {
        p.evidenceFound.push(evidenceId);
        const ev = c.evidencePool.find(e => e.id === evidenceId);
        if (ev && ev.revealsSuspect) {
          this.unlockSuspect(ev.revealsSuspect);
        }
        if (c.lab) {
          const labEntry = c.lab.find(l => l.evidence === evidenceId);
          if (labEntry && p.suspects[labEntry.suspect]) {
            p.suspects[labEntry.suspect].status = labEntry.result;
            p.suspects[labEntry.suspect].notes = labEntry.result;
          }
        }
      }
      this._saveProgress();
    }
  }

  refreshUnlockedSuspects() {
    const p = this.progress.cases[this.activeCaseId];
    const c = this.getActiveCase();
    if (!p || !c) return;
    if (!p.suspects) p.suspects = this._initializeSuspects(c);
    (p.evidenceFound || []).forEach(evId => {
      const ev = c.evidencePool.find(e => e.id === evId);
      if (ev && ev.revealsSuspect && !p.unlockedSuspects.includes(ev.revealsSuspect)) {
        p.unlockedSuspects.push(ev.revealsSuspect);
      }
      if (c.lab) {
        const labEntry = c.lab.find(l => l.evidence === evId);
        if (labEntry && p.suspects[labEntry.suspect]) {
          p.suspects[labEntry.suspect].status = labEntry.result;
          p.suspects[labEntry.suspect].notes = labEntry.result;
        }
      }
    });
    this._saveProgress();
  }

  recordDeduction(deduction) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      p.deductionsMade.push(deduction);
      this._saveProgress();
    }
  }

  recordBreakthrough(npcId, contradictionKey) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      if (!p.breakthroughs) p.breakthroughs = [];
      if (!p.breakthroughs.includes(contradictionKey)) {
        p.breakthroughs.push(contradictionKey);
        this._saveProgress();
      }
    }
  }

  unlockSuspect(suspectId) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      if (!p.unlockedSuspects) p.unlockedSuspects = [];
      if (!p.unlockedSuspects.includes(suspectId)) {
        p.unlockedSuspects.push(suspectId);
        this._saveProgress();
        return true;
      }
    }
    return false;
  }

  isSuspectUnlocked(suspectId) {
    const p = this.progress.cases[this.activeCaseId];
    return p ? (p.unlockedSuspects || []).includes(suspectId) : false;
  }

  getSuspectStatus(suspectId) {
    const p = this.progress.cases[this.activeCaseId];
    return p?.suspects?.[suspectId] || { status: 'Unknown', notes: '' };
  }

  recordLabDeduction(evidenceId, suspectId, result) {
    const p = this.progress.cases[this.activeCaseId];
    if (!p || !p.suspects?.[suspectId]) return;
    p.suspects[suspectId].status = result;
    p.suspects[suspectId].notes = result;
    this._saveProgress();
  }

  refreshUnlockedSuspects() {
    const p = this.progress.cases[this.activeCaseId];
    const c = this.getActiveCase();
    if (!p || !c) return;
    if (!p.suspects) p.suspects = this._initializeSuspects(c);
    (p.evidenceFound || []).forEach(evId => {
      const ev = c.evidencePool.find(e => e.id === evId);
      if (ev && ev.revealsSuspect && !p.unlockedSuspects.includes(ev.revealsSuspect)) {
        p.unlockedSuspects.push(ev.revealsSuspect);
      }
      if (c.lab) {
        const labEntry = c.lab.find(l => l.evidence === evId);
        if (labEntry && p.suspects[labEntry.suspect]) {
          p.suspects[labEntry.suspect].status = labEntry.result;
          p.suspects[labEntry.suspect].notes = labEntry.result;
        }
      }
    });
    this._saveProgress();
  }

  submitAccusation(suspectId) {
    const c = this.getActiveCase();
    const p = this.progress.cases[this.activeCaseId];
    if (!c || !p) return null;

    const correct = suspectId === c.truth.culprit;
    const totalEvidence = c.evidencePool.length;
    const foundEvidence = p.evidenceFound.length;
    const deductionScore = Math.min(p.deductionsMade.length * 10, 40);
    const evidenceScore = Math.round((foundEvidence / totalEvidence) * 40);
    const accusationScore = correct ? 20 : 0;
    const total = deductionScore + evidenceScore + accusationScore;

    const result = {
      correct,
      suspectId,
      truth: c.truth,
      score: { deduction: deductionScore, evidence: evidenceScore, accusation: accusationScore, total },
    };

    p.accusation = suspectId;
    p.solved = correct;
    p.score = result.score;

    if (correct) {
      this.progress.rank = this._calcRank(total);
      this.progress.totalScore = (this.progress.totalScore || 0) + total;
    }

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
      return raw ? JSON.parse(raw) : { cases: {}, totalScore: 0, rank: "Rookie" };
    } catch {
      return { cases: {}, totalScore: 0, rank: "Rookie" };
    }
  }

  _saveProgress() {
    try {
      localStorage.setItem("detective_progress", JSON.stringify(this.progress));
    } catch { }
  }

  resetProgress() {
    localStorage.removeItem("detective_progress");
    this.progress = { cases: {}, totalScore: 0, rank: "Rookie" };
  }
}
