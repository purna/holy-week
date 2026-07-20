export class CodexUI {
    constructor(caseManager, evidenceSystem, accessibility, audio) {
        this.cm = caseManager;
        this.es = evidenceSystem;
        this.a11y = accessibility;
        this.audio = audio;

        this.selectedCodexEvidenceId = null;
        this.selectedCodexProphecyId = null;
        this.codexMatchFeedback = null;
    }

    render() {
        const c = this.cm.getActiveCase();
        if (!c) return '';

        const propheciesWithStatus = this.es.getPropheciesWithStatus();
        const lockedProps = propheciesWithStatus.filter(p => !p.discovered);
        const discoveredProps = propheciesWithStatus.filter(p => p.discovered);
        const collectedEvidence = this.es.getCollected();

        const selectedEv = this.es.getById(this.selectedCodexEvidenceId);
        const selectedProp = this.es.getProphecyById(this.selectedCodexProphecyId);
        const caseProgress = this.cm.getCaseProgress(c.id) || {};
        const deductionCount = (caseProgress.deductionsMade || []).length;
        const prophecyCount = (caseProgress.propheciesFound || []).length;
        const hasLabInsightForNextProphecy = deductionCount > prophecyCount;
        const canMatchNow = !!(selectedEv && selectedProp && hasLabInsightForNextProphecy);
        const completion = this.es.getProphecyCompletionPercent();

        return `
            <h3 class="section-title">Prophecy Matching</h3>
            <div class="prophecy-lab-intro">
                Select evidence from your collection, then choose a locked prophecy below to attempt a link.
            </div>
            <div class="prophecy-lab-intro">
                Lab progress: ${deductionCount} deductions, ${prophecyCount} prophecies unlocked. Each new prophecy requires one additional Lab deduction.
            </div>

            <div id="codex-feedback" class="codex-feedback" ${!this.codexMatchFeedback ? 'hidden' : ''}>
                ${this.codexMatchFeedback || ''}
            </div>

            <div class="codex-matching-columns">
                <div class="codex-match-column">
                    <div class="selection-slot ${selectedEv ? 'active' : ''}" id="codex-evidence-slot">
                        ${selectedEv ? `<span class="slot-icon">${selectedEv.icon}</span><span class="slot-name">${selectedEv.name}</span>` : `<span>Select Evidence...</span>`}
                    </div>
                    <h3 class="section-title">Your Evidence</h3>
                    <div class="picker-grid">
                        ${collectedEvidence.map(e => `
                            <button class="picker-card ${this.selectedCodexEvidenceId === e.id ? 'selected-a' : ''}" onclick="window.ui.codexUI.selectEvidenceForMatching('${e.id}')">
                                <span class="picker-icon">${e.icon}</span><span class="picker-name">${e.name}</span>
                            </button>`).join('') || `<p class="picker-empty">Collect evidence first.</p>`}
                    </div>
                </div>

                <div class="codex-match-column">
                    <div class="selection-slot ${selectedProp ? 'active' : ''}" id="codex-prophecy-slot">
                        ${selectedProp ? `<span class="slot-icon">${selectedProp.icon}</span><span class="slot-name">${selectedProp.reference}</span>` : `<span>Select Prophecy...</span>`}
                    </div>
                    <h3 class="section-title">Locked Prophecies</h3>
                    <div class="picker-grid">
                        ${lockedProps.map(p => `
                            <button class="picker-card ${this.selectedCodexProphecyId === p.id ? 'selected-b' : ''}" onclick="window.ui.codexUI.selectProphecyForMatching('${p.id}')">
                                <span class="picker-icon"><i class="fa-solid fa-lock"></i></span><span class="picker-name">${p.reference}</span>
                            </button>`).join('') || `<p class="picker-empty">All prophecies matched!</p>`}
                    </div>
                </div>
            </div>

            <button id="btn-match-prophecy" class="evidence-detail-confirm codex-match-btn ${!canMatchNow ? 'is-disabled' : ''}" ${!canMatchNow ? "disabled" : ""} onclick="window.ui.codexUI.attemptProphecyMatch()">Match</button>

            <h3 class="section-title">Prophecy Library (${completion}% Complete)</h3>
            <div id="codex-grid" class="codex-grid">
                ${discoveredProps.map(p => `
                    <div class="prophecy-card discovered" onclick="window.ui.showProphecyDetail('${p.id}')">
                        <div class="prophecy-card-icon">${p.icon || '🔮'}</div>
                        <div class="prophecy-card-info">
                            <div class="prophecy-card-reference">${p.reference}</div>
                            <div class="prophecy-card-desc">${(p.fulfilledBy || p.desc || '').substring(0, 60)}...</div>
                        </div>
                    </div>`).join('')}
            </div>`;
    }

    selectEvidenceForMatching(evidenceId) {
        this.selectedCodexEvidenceId = (this.selectedCodexEvidenceId === evidenceId) ? null : evidenceId;
        window.ui.switchInvTab('codex'); // Re-render
    }

    selectProphecyForMatching(prophecyId) {
        const prophecy = this.es.getProphecyById(prophecyId);
        if (prophecy && !prophecy.discovered) {
            this.selectedCodexProphecyId = (this.selectedCodexProphecyId === prophecyId) ? null : prophecyId;
        } else if (prophecy && prophecy.discovered) {
            window.ui.showProphecyDetail(prophecyId);
        }
        window.ui.switchInvTab('codex'); // Re-render
    }

    attemptProphecyMatch() {
        const evidenceId = this.selectedCodexEvidenceId;
        const prophecyId = this.selectedCodexProphecyId;
        const caseProgress = this.cm.getCaseProgress(this.cm.activeCaseId) || {};
        const deductionCount = (caseProgress.deductionsMade || []).length;
        const prophecyCount = (caseProgress.propheciesFound || []).length;

        if (!evidenceId || !prophecyId) {
            if (this.audio.enabled) this.audio.playError();
            return;
        }

        if (deductionCount <= prophecyCount) {
            if (this.audio.enabled) this.audio.playError();
            this.codexMatchFeedback = `<div class="codex-feedback-msg error">🧪 Run another Lab deduction first<br><small>You need ${prophecyCount + 1} deductions to unlock prophecy #${prophecyCount + 1}.</small></div>`;
        } else {
            const evidence = this.es.getById(evidenceId);
            const prophecy = this.es.getProphecyById(prophecyId);
            const isMatch = evidence && evidence.relatedProphecy === prophecyId;

            if (isMatch) {
                this.cm.recordProphecyFound(prophecyId);
                if (this.audio.enabled) this.audio.playBonus();
                this.codexMatchFeedback = `<div class="codex-feedback-msg success">✨ Correct! +10 pts<br><small>${evidence.name} linked to ${prophecy.reference}</small></div>`;
            } else {
                this.cm.updateDoubt(5);
                if (this.audio.enabled) this.audio.playError();
                this.codexMatchFeedback = `<div class="codex-feedback-msg error">❌ Incorrect Link! +5 Doubt<br><small>This evidence does not fulfill that prophecy.</small></div>`;
            }
            this.selectedCodexEvidenceId = null;
            this.selectedCodexProphecyId = null;
        }

        window.ui.switchInvTab('codex'); // Re-render
        setTimeout(() => { this.codexMatchFeedback = null; window.ui.switchInvTab('codex'); }, 4000);
    }
}