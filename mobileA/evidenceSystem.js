// ============================================================
// EVIDENCE SYSTEM — Shared collection and discovery logic
// ============================================================

export const EVIDENCE_TYPES = {
  PHYSICAL:      { id: "physical",      label: "Physical",      icon: "🧤", color: "#f59e0b" },
  TESTIMONIAL:   { id: "testimonial",   label: "Testimonial",   icon: "💬", color: "#60a5fa" },
  DIGITAL:       { id: "digital",       label: "Digital",       icon: "💻", color: "#34d399" },
  ENVIRONMENTAL: { id: "environmental", label: "Environmental", icon: "🌿", color: "#a78bfa" },
  ANALYTICAL:    { id: "analytical",    label: "Analytical",    icon: "🔬", color: "#f472b6" },
  PROPHECY:      { id: "prophecy",      label: "Prophecy",      icon: "🔮", color: "#facc15" },
};

export class EvidenceSystem {
  constructor(caseManager) {
    this.caseManager = caseManager;
    this.collected = [];    
    this.selectedA = null;
    this.selectedB = null;
  }

  loadCase(caseData) {
    const saved = this.caseManager.getCaseProgress(caseData.id);
    this.collected = saved?.evidenceFound ? [...saved.evidenceFound] : [];
    this.selectedA = null;
    this.selectedB = null;
  }

  getEvidencePool() {
    const c = this.caseManager.getActiveCase();
    return c ? c.evidencePool : [];
  }

  getProphecyPool() {
    const c = this.caseManager.getActiveCase();
    return c ? (c.prophecies || []) : [];
  }

  getCollected() {
    return this.getEvidencePool().filter(e => this.collected.includes(e.id));
  }

  discover(evidenceId) {
    if (!this.collected.includes(evidenceId)) {
      this.collected.push(evidenceId);
      this.caseManager.recordEvidenceFound(evidenceId);
      return this.getById(evidenceId);
    }
    return null;
  }

  getById(id) {
    return this.getEvidencePool().find(e => e.id === id) || null;
  }

  getProphecyById(id) {
    const pool = this.getProphecyPool();
    return pool.find(p => p.id === id || p.reference === id) || null;
  }

  selectEvidence(evidenceId) {
    const e = this.getById(evidenceId);
    if (!e) return;
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

  getPropheciesWithStatus() {
    const c = this.caseManager.getActiveCase();
    const found = this.caseManager.getCaseProgress(c?.id)?.propheciesFound || [];
    return this.getProphecyPool().map(p => ({
      ...p,
      discovered: found.includes(p.id || p.reference)
    }));
  }

  getProphecyCompletionPercent() {
    const pool = this.getPropheciesWithStatus();
    if (pool.length === 0) return 0;
    const discoveredCount = pool.filter(p => p.discovered).length;
    return Math.round((discoveredCount / pool.length) * 100);
  }
}