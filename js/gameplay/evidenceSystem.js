
// ============================================================
// EVIDENCE SYSTEM — Shared collection and discovery logic
// ============================================================

export const EVIDENCE_TYPES = {
  PHYSICAL:      { id: "physical",      label: "Physical",      icon: '../assets/gfx/shield-duotone.svg', color: "#f59e0b" },
  TESTIMONIAL:   { id: "testimonial",   label: "Testimonial",   icon: '../assets/gfx/chat-duotone.svg', color: "#60a5fa" },
  DIGITAL:       { id: "digital",       label: "Digital",       icon: '../assets/gfx/laptop-code.svg', color: "#34d399" },
  ENVIRONMENTAL: { id: "environmental", label: "Environmental", icon: '../assets/gfx/leaf-duotone.svg', color: "#a78bfa" },
  ANALYTICAL:    { id: "analytical",    label: "Analytical",    icon: '../assets/gfx/microscope-duotone.svg', color: "#f472b6" },
  PROPHECY:      { id: "prophecy",      label: "Prophecy",      icon: '../assets/gfx/star-duotone.svg', color: "#facc15" },
};

export class EvidenceSystem {
  constructor(caseManager, config = {}) {
    this.caseManager = caseManager;
    this.config = config;
    this.collected = [];
    this.prophecies = [];
    this.prophecyStatus = {};
    this.onProphecyReveal = null;

    this.selectedA = null;
    this.selectedB = null;

    this.selectedCodexEvidenceId = null;
    this.selectedCodexProphecyId = null;
  }

  loadCase(caseData) {
    if (this.config.unlockAllEvidence) {
      this.collected = (caseData.evidencePool || []).map(e => e.id);
    } else {
      this.collected = this.caseManager.getCaseProgress(caseData.id)?.evidenceFound || [];
    }
    this.prophecies = caseData.prophecies || [];
    this.prophecyStatus = {};
    this.prophecies.forEach(p => {
      this.prophecyStatus[p.id] = 'locked';
    });
    this.selectedCodexEvidenceId = null;
    this.selectedCodexProphecyId = null;
  }

  getEvidencePool() {
    const c = this.caseManager.getActiveCase();
    return c ? c.evidencePool : [];
  }

  getCollected() {
    return this.getEvidencePool().filter(e => this.collected.includes(e.id));
  }

  discover(evidenceId) {
    return this.unlock(evidenceId);
  }

  unlock(evidenceId) {
    if (!this.collected.includes(evidenceId)) {
      this.collected.push(evidenceId);
      this.caseManager.recordEvidenceFound(evidenceId);
      return this.getById(evidenceId);
    }
    return null;
  }

  isCollected(id) {
    return this.collected.includes(id);
  }

  getById(id) {
    return this.getEvidencePool().find(e => e.id === id) || null;
  }

  getProphecyById(prophecyId) {
    return this.prophecies.find(p => p.id === prophecyId);
  }

  getTypeInfo(typeId) {
    return EVIDENCE_TYPES[typeId?.toUpperCase()] || EVIDENCE_TYPES.PHYSICAL;
  }

  revealProphecy(prophecyId) {
    if (prophecyId && this.prophecyStatus[prophecyId] === 'locked') {
      this.prophecyStatus[prophecyId] = 'revealed';
      console.log(`[EvidenceSystem] Prophecy Revealed: ${prophecyId}`);
      // Trigger a UI notification via callback
      if (this.onProphecyReveal) {
        const prophecy = this.getProphecyById(prophecyId);
        if (prophecy) this.onProphecyReveal(prophecy);
      }
      return true;
    }
    return false;
  }

  selectEvidence(evidenceId) {
    const e = this.getById(evidenceId);
    if (!e) return;
    if (this.selectedA && this.selectedA.id === evidenceId) {
      this.selectedA = null;
      return;
    }
    if (this.selectedB && this.selectedB.id === evidenceId) {
      this.selectedB = null;
      return;
    }
    if (!this.selectedA) {
      this.selectedA = e;
    } else if (!this.selectedB) {
      this.selectedB = e;
    } else {
      this.selectedA = e;
    }
  }

  selectForSlot(evidenceId, slot) {
    const e = this.getById(evidenceId);
    if (!e) return;
    if (slot === "A") {
      if (this.selectedB && this.selectedB.id === evidenceId) this.selectedB = null;
      this.selectedA = e;
    } else {
      if (this.selectedA && this.selectedA.id === evidenceId) this.selectedA = null;
      this.selectedB = e;
    }
  }

  deselectAll() {
    this.selectedA = null;
    this.selectedB = null;
  }

  getPropheciesWithStatus() {
    const linked = this.caseManager.getCaseProgress(this.caseManager.getActiveCase()?.id)?.propheciesFound || [];
    return this.prophecies.map(p => ({
      ...p,
      status: linked.includes(p.id) ? 'linked' : (this.prophecyStatus[p.id] || 'locked'),
      discovered: linked.includes(p.id || p.reference) // Keep for legacy UI compatibility
    }));
  }

  getProphecyCompletionPercent() {
    const pool = this.getPropheciesWithStatus();
    if (pool.length === 0) return 0;
    const discoveredCount = pool.filter(p => p.discovered).length;
    return Math.round((discoveredCount / pool.length) * 100);
  }

  attemptProphecyMatch() {
    if (!this.selectedCodexEvidenceId || !this.selectedCodexProphecyId) return null;
    if (typeof this.caseManager?.canAttemptProphecyMatch === "function" && !this.caseManager.canAttemptProphecyMatch()) {
      return { success: false, message: "Run another Lab deduction before matching the next prophecy." };
    }
    const ev = this.getById(this.selectedCodexEvidenceId);
    const prop = this.getProphecyById(this.selectedCodexProphecyId);
    const isMatch = ev.relatedProphecy === prop.id || ev.bibleRef?.includes(prop.reference) || ev.propheticLink?.includes(prop.reference);
    if (isMatch) {
      this.caseManager.recordProphecyFound(prop.id || prop.reference);
      return { success: true, message: `Prophecy Linked: ${prop.reference}` };
    }
    return { success: false, message: "This evidence does not fulfill this prophecy." };
  }
}
