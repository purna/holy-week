// ============================================================
// EVIDENCE SYSTEM — types, collection, discovery, queries
// ============================================================

export const EVIDENCE_TYPES = {
  PHYSICAL:      { id: "physical",      label: "Physical",      icon: "🧤", color: "#f59e0b" },
  TESTIMONIAL:   { id: "testimonial",   label: "Testimonial",   icon: "💬", color: "#60a5fa" },
  DIGITAL:       { id: "digital",       label: "Digital",       icon: "💻", color: "#34d399" },
  ENVIRONMENTAL: { id: "environmental", label: "Environmental", icon: "🌿", color: "#a78bfa" },
  ANALYTICAL:    { id: "analytical",    label: "Analytical",    icon: "🔬", color: "#f472b6" },
};

export class EvidenceSystem {
  constructor(caseManager) {
    this.caseManager = caseManager;
    this.collected = [];    // all collected IDs (restored from save)
    this.selectedA = null;
    this.selectedB = null;
    this.unlockedIds = new Set(); // only IDs revealed this session
  }

  loadCase(caseData) {
    const saved = this.caseManager.getCaseProgress(caseData.id);
    this.collected = saved?.evidenceFound ? [...saved.evidenceFound] : [];
    this.unlockedIds = new Set();
    this.selectedA = null;
    this.selectedB = null;
  }

  getEvidencePool() {
    return this.caseManager.getActiveCase()?.evidencePool || [];
  }

  getCollected() {
    return this.getEvidencePool().filter(e => this.collected.includes(e.id) && this.unlockedIds.has(e.id));
  }

  getById(id) {
    return this.getEvidencePool().find(e => e.id === id) || null;
  }

  isCollected(id) {
    return this.collected.includes(id);
  }

  unlock(id) {
    if (!this.unlockedIds.has(id)) {
      this.unlockedIds.add(id);
      this.collected.push(id);
      this.caseManager.recordEvidenceFound(id);
      return this.getById(id);
    }
    return null;
  }

  isUnlocked(id) {
    return this.unlockedIds.has(id);
  }

  getUndiscovered() {
    return this.getEvidencePool().filter(e => !this.unlockedIds.has(e.id));
  }

  selectEvidence(evidenceId) {
    const e = this.getById(evidenceId);
    if (!e) return;
    if (!this.isUnlocked(evidenceId)) return;
    if (!this.selectedA || (this.selectedA && this.selectedB)) {
      this.selectedA = e;
      this.selectedB = null;
    } else {
      this.selectedB = e;
    }
  }

  deselectAll() {
    this.selectedA = null;
    this.selectedB = null;
  }

  getTypeInfo(typeId) {
    return EVIDENCE_TYPES[typeId.toUpperCase()] || EVIDENCE_TYPES.PHYSICAL;
  }

  getCollectedByType() {
    const groups = {};
    this.getCollected().forEach(e => {
      const type = e.type || "physical";
      if (!groups[type]) groups[type] = [];
      groups[type].push(e);
    });
    return groups;
  }

  getCompletionPercent() {
    const pool = this.getEvidencePool();
    if (!pool.length) return 0;
    return Math.round((this.getCollected().length / pool.length) * 100);
  }
}
