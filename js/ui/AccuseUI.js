export class AccuseUI {
    constructor(caseManager) {
        this.cm = caseManager;
    }

    render(options = {}) {
        const c = this.cm.getActiveCase();
        if (!c) return '';

        const prophecies = (c.prophecies || []).map(p => ({
            ...p,
            status: this.cm.getCodexStatus(p.id)
        }));
        const total = prophecies.length;
        const complete = prophecies.filter(p => p.status === 'complete').length;
        const canConclude = options.canConclude ? this.cm.canConcludeCase() : false;
        const isConcluded = options.isConcluded || false;

        const statusIcon = (status) => {
            if (status === 'complete') return '<i class="fa-solid fa-check"></i>';
            if (status === 'found_scripture') return '<i class="fa-solid fa-scroll"></i>';
            if (status === 'rumor') return '<i class="fa-solid fa-question"></i>';
            return '<i class="fa-solid fa-circle-dot"></i>';
        };

        let concludeButton;
        if (isConcluded) {
            concludeButton = `<button class="conclude-btn concluded" onclick="showConclusionResult()"><i class="fa-solid fa-gavel"></i> Concluded Case</button>`;
        } else if (canConclude) {
            concludeButton = `<button class="conclude-btn" onclick="conclude()"><i class="fa-solid fa-gavel"></i> Conclude Case</button>`;
        } else {
            concludeButton = `<button class="conclude-btn" disabled title="Find all evidence and complete all prophecies to unlock"><i class="fa-solid fa-gavel"></i> Conclude Case</button>`;
        }

        return `<h3 class="section-title">Case File</h3>
            <div class="prophecy-accuse-intro">
                Close this case once every prophecy has been researched in the Lab. The truth behind it is revealed when you do.
            </div>
            <div class="accuse-panel">
                <div class="case-file-progress">
                    <div class="case-file-progress-label">Prophecies Researched</div>
                    <div class="case-file-progress-value">${complete} / ${total}</div>
                </div>
                 <div class="prophecy-checklist">
                     ${prophecies.map(p => {
                         const isClickable = p.status === 'complete' || p.status === 'found_scripture';
                         const clickHandler = isClickable ? `onclick="window.ui.showProphecyDetail('${p.id}')"` : '';
                         return `
                         <div class="prophecy-checklist-item status-${p.status}" ${clickHandler}>
                             <span class="prophecy-checklist-icon" aria-hidden="true">${statusIcon(p.status)}</span>
                             <span class="prophecy-checklist-name">${p.status === 'unseen' ? '???' : p.reference}</span>
                         </div>`;
                     }).join("")}
                 </div>
                ${concludeButton}
            </div>`;
    }
}
