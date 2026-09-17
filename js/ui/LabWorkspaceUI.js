import { OPERATIONS } from "../gameplay/deductionEngine.js?v=20260917-research-r2";
import { getResearchEvidenceIds } from '../gameplay/prophecyResearch.js';

const escapeLabText = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export class LabWorkspaceUI {
  constructor(deductionEngine, evidenceSystem, accessibility, onResult) {
    this.de = deductionEngine;
    this.es = evidenceSystem;
    this.a11y = accessibility;
    this.onResult = onResult;

    // Track current tab for info buttons
    this.currentTab = "connections";
    this.selectedCardId = null;
    this._pendingResultModal = null;
  }

  render() {
    const hasReliability = this._getReliabilityTasks().length > 0;
    const hasTimeline = (this._getActiveCase()?.evidencePool || []).some(e => e.timelineOrder != null);
    return `
      <div id="lab-workspace" role="region" aria-label="Lab Workspace">

        <div>

          <div class="lab-header-row">
            <h3 class="section-title">Deduction Lab</h3>
          </div>
          <div class="prophecy-lab-intro">
            <span>Gain points by correctly analyzing evidence.</span>
          </div>

          <div class="lab-actions" role="group" aria-label="Analysis operations">
            <button class="lab-btn" data-lw-tab="prophecies" aria-label="Prophecies: Research the case references"><span class="lab-btn-label">Prophecies</span></button>
            <button class="lab-btn active" data-lw-tab="connections" aria-label="Connections: How are these pieces of evidence related?">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-link"></i></span>
              <span class="lab-btn-label">Connections</span>
            </button>
            <button class="lab-btn" data-lw-tab="link" aria-label="Link: Sort evidence by type into folders">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-folder-tree"></i></span>
              <span class="lab-btn-label">Link</span>
            </button>
            ${hasTimeline ? `<button class="lab-btn" data-lw-tab="timeline" aria-label="Timeline: What happened first?">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-clock"></i></span>
              <span class="lab-btn-label">Timeline</span>
            </button>` : ''}
            ${hasReliability ? `<button class="lab-btn" data-lw-tab="reliability" aria-label="Reliability Check: Which evidence challenges this claim?">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-scale-balanced"></i></span>
              <span class="lab-btn-label">Reliability</span>
            </button>` : ''}
          </div>



          <div id="lw-feedback" class="lw-feedback" role="status" aria-live="polite"></div>
          <div id="lw-panel-prophecies" class="tab-panel" role="tabpanel" aria-label="Prophecy research">
            <section class="lab-task-guide"><h4>Research workbench</h4><p>Match an identified passage with collected evidence here. Your full prophecy checklist and completed findings are in Case Files.</p></section>
            <div id="lw-prophecy-tasks"></div>
          </div>

           <div id="lw-panel-connections" class="tab-panel active" role="tabpanel" aria-label="Evidence connections">
        
              <section class="lab-task-guide" aria-labelledby="lw-connections-goal">
              <div class="lab-task-guide-heading">
                <span class="lab-task-guide-kicker">Your task</span>
                <h4 id="lw-connections-goal">Connect evidence that relates to the same story</h4>
              </div>
              <ol class="lab-task-steps">
                <li><strong>Select two evidence cards</strong> from the pool below. Drag them into the two comparison slots, or click the slots to pick cards.</li>
                <li><strong>Choose the relationship</strong> that best describes how they connect: <em>Corroborates</em> (both support the same point), <em>Fulfils / explains</em> (one clarifies or completes the other), or <em>Challenges</em> (one questions or contradicts the other).</li>
                <li><strong>Test the connection</strong> by clicking "Test Connection". A correct match reveals a key insight; an incorrect match removes the cards so you can try again.</li>
              </ol>
            </section>
 <div class="actions-bar connections-actions">
               <button class="btn-secondary" id="lw-comp-clear">Clear</button>
               <fieldset class="relationship-switch">
                 <legend>Choose the relationship</legend>
                 <div class="relationship-switch-options">
                   <label><input type="radio" name="lw-connection-type" value="compare" checked><span>Corroborates</span></label>
                   <label><input type="radio" name="lw-connection-type" value="link"><span>Fulfils / explains</span></label>
                   <label><input type="radio" name="lw-connection-type" value="contradict"><span>Challenges</span></label>
                 </div>
                 <p id="lw-relationship-help" class="relationship-help">Both pieces support the same conclusion.</p>
               </fieldset>
               <button class="btn-submit" id="lw-comp-test">Test Connection</button>
             </div>
           <div class="listgrid">  

           

            <div class="comparator-stage">
              <div class="comparator-slots">
                <div class="comparator-slot" id="lw-comp-slot-0" role="button" tabindex="0" aria-label="Evidence slot A">
                  <div class="slot-label" aria-hidden="true"><span class="sr-only">Slot A</span></div>
                  <div id="lw-comp-card-0"><span class="slot-label">Slot A</span></div>
                </div>
                <div class="comparator-slot" id="lw-comp-slot-1" role="button" tabindex="0" aria-label="Evidence slot B">
                  <div class="slot-label" aria-hidden="true"><span class="sr-only">Slot B</span></div>
                  <div id="lw-comp-card-1"><span class="slot-label">Slot B</span></div>
                </div>
              </div>
            </div>
           
            <div class="card-pool-grid" id="lw-comp-bank"></div>
            <section class="lab-task-guide"><h4>Required connections</h4><p>Only these key connections are needed to close the case. Other discoveries are optional. Use a hint to load a pair and its suggested relationship, then test it.</p><div id="lw-connection-guide"></div></section>
            <div class="compare-progress" id="lw-compare-progress">
              <span class="compare-progress-label">Key insights:</span>
              <span class="compare-progress-count">0/0</span>
              <span class="compare-progress-optional">Optional discoveries: 0/0</span>
            </div>
            <div class="matched-pairs-panel" id="lw-matched-pairs">
              <div class="matched-pairs-header">Matched Pairs</div>
              <div class="matched-pairs-list" id="lw-matched-pairs-list"></div>
            </div>
          </div>
            
           
          </div>

          <div id="lw-panel-link" class="tab-panel" role="tabpanel" aria-label="Evidence type folders">
            <section class="lab-task-guide" aria-labelledby="lw-link-goal">
              <div class="lab-task-guide-heading">
                <span class="lab-task-guide-kicker">Your task</span>
                <h4 id="lw-link-goal">Sort every clue into the correct evidence folder</h4>
              </div>
              <ol class="lab-task-steps">
                <li><strong>Select an evidence card</strong> from the unfiled pool below.</li>
                <li><strong>Choose a destination folder</strong> from the dropdown, or drag the card into the folder tray.</li>
                <li><strong>File every card,</strong> then select Verify Folders to check your work.</li>
              </ol>
            </section>
            <div class="actions-bar">
              <select id="lw-folder-move" class="folder-move-select" aria-label="Move selected evidence to folder">
                <option value="">Move to folder…</option>
              </select>
              <button class="btn-submit" id="lw-folder-submit">Verify Folders</button>
            </div>
            <div class="folder-grid" id="lw-folder-grid"></div>
            <p class="lab-bank-label">Unfiled evidence:</p>
            <div class="card-pool-grid" id="lw-folder-bank"></div>
            <div class="timeline-mini-bar" id="lw-folder-timeline-bar" role="img" aria-label="Evidence count by category"></div>
          </div>

          <div id="lw-panel-timeline" class="tab-panel" role="tabpanel" aria-label="Timeline">
            <section class="lab-task-guide" aria-labelledby="lw-timeline-goal">
              <div class="lab-task-guide-heading">
                <span class="lab-task-guide-kicker">Your task</span>
                <h4 id="lw-timeline-goal">Put the pivotal evidence in chronological order</h4>
              </div>
              <ol class="lab-task-steps">
                <li><strong>Select an event step,</strong> then select the evidence that belongs there. You can also drag cards into place.</li>
                <li><strong>Place every unassigned item</strong> from earliest to latest.</li>
                <li><strong>Verify Chronology</strong> to check your sequence and correct any mistakes.</li>
              </ol>
            </section>
                <div class="actions-bar">
              <button class="btn-secondary" id="lw-timeline-clear">Clear</button>
              <button class="btn-submit" id="lw-timeline-test">Verify Chronology</button>
            </div>
            <div class="listgrid">

            
            <div class="timeline-vertical-box" id="lw-timeline-steps"></div>
            <p style="font-size:0.72rem; color: var(--text-muted); margin-bottom:6px;">Unassigned items:</p>
           
            <div class="card-pool-grid" id="lw-timeline-bank"></div>
            </div>

        
            
          </div>

          ${hasReliability ? `<div id="lw-panel-reliability" class="tab-panel" role="tabpanel" aria-label="Reliability Check">
            <section class="lab-task-guide" aria-labelledby="lw-reliability-goal">
              <div class="lab-task-guide-heading">
                <span class="lab-task-guide-kicker">Your task</span>
                <h4 id="lw-reliability-goal">Identify the evidence that tests the claim</h4>
              </div>
              <ol class="lab-task-steps">
                <li><strong>Read the claim and question.</strong></li>
                <li><strong>Choose the evidence</strong> that confirms whether the claim is reliable.</li>
                <li><strong>Check your answer.</strong> A correct choice explains why the claim is true or false.</li>
              </ol>
            </section>
            <div class="listgrid">
              <div id="lw-reliability-tasks"></div>
            </div>
          </div>` : ''}

          <div id="lw-modal-mask" class="modal-mask" onclick="this.classList.remove('open')">
            <div class="modal-card" onclick="event.stopPropagation()">
              <div class="modal-header">
                <div id="lw-modal-title" class="modal-title">Title</div>
                <button class="modal-close" onclick="document.getElementById('lw-modal-mask').classList.remove('open')">✕</button>
              </div>
              <div id="lw-modal-body" class="modal-body">Description...</div>
              <div id="lw-modal-detail"></div>
            </div>
          </div>

          <div id="lw-result-modal-mask" class="modal-mask" onclick="this.classList.remove('open')">
            <div class="modal-card result-celebration" onclick="event.stopPropagation()">
              <div class="celebration-stars" aria-hidden="true">
                <span class="star star-1">✦</span>
                <span class="star star-2">✦</span>
                <span class="star star-3">✦</span>
                <span class="star star-4">✦</span>
                <span class="star star-5">✦</span>
                <span class="star star-6">✦</span>
                <span class="star star-7">✦</span>
                <span class="star star-8">✦</span>
              </div>
              <div class="modal-header">
                <div id="lw-result-modal-title" class="modal-title celebration-title">🎉 Amazing Work!</div>
                <button class="modal-close" onclick="document.getElementById('lw-result-modal-mask').classList.remove('open')">✕</button>
              </div>
              <div id="lw-result-modal-body" class="modal-body celebration-body"></div>
              <div id="lw-result-modal-detail" class="celebration-detail"></div>
            </div>
          </div>
        </div>
      </div>`;
  }

  bindEvents(container) {
    this.root = container.querySelector("#lab-workspace");
    if (!this.root) return;

    this._initState();
    this._restoreActiveTab();
    this._setFeedback(this._lastFeedback?.text || "Connections: select two evidence cards, choose their relationship, then test the connection.", this._lastFeedback?.type || "");
    this._renderBanks();

    this.root.addEventListener('click', event => {
      const hint = event.target.closest('[data-connection-hint]');
      if (hint) {
        if (hint.disabled) return;
        const connection = this._getRequiredConnections()[Number(hint.dataset.connectionHint)];
        if (!connection) return;
        const items = connection.ids.map(id => this.evidence.find(e => e.id === id));
        if (items.some(item => !item)) { this._setFeedback('Collect both clues before testing this connection.', 'error'); return; }
        this.compareSlots = items;
        const option = this.root.querySelector(`input[name="lw-connection-type"][value="${connection.operation}"]`);
        if (option) option.checked = true;
        this._updateRelationshipHelp();
        this._renderComparatorSlots();
        this._renderComparatorBank();
        this._setFeedback('Suggested pair loaded. Read the clues, then select Test Connection.');
        this.root.querySelector('#lw-comp-test')?.focus();
      }
      const research = event.target.closest('[data-research-prophecy]');
      if (research) {
        const id = research.dataset.researchProphecy;
        const selected = research.closest('article')?.querySelector('select')?.value;
        if (!selected) { this._setFeedback('Choose a collected evidence item first.', 'error'); return; }
        const result = this.de.researchProphecy(id, selected);
        this._setFeedback(result.error || result.text, result.success ? 'success' : 'error');
        this._initState();
        this._restoreActiveTab();
        this._renderBanks();
        this.onResult?.({ type: 'prophecy_research', success: result.success, feedback: result.error || result.text, feedbackType: result.success ? 'success' : 'error' });
      }
    });

    this.root.querySelectorAll(".lab-btn[data-lw-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.root.querySelectorAll(".lab-btn[data-lw-tab]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const tab = btn.dataset.lwTab;
        this.root.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
        const panel = this.root.querySelector(`#lw-panel-${tab}`);
        if (panel) panel.classList.add("active");
        this.currentTab = tab;
        const instructions = {
          prophecies: 'Prophecies: read a passage, select supporting evidence, and test the match to unlock it.',
          connections: "Connections: select two evidence cards, choose their relationship, then test the connection.",
          link: "Link: choose an evidence-type folder, place each clue in the correct folder, then verify your work.",
          timeline: "Timeline: place every pivotal evidence card from earliest to latest, then verify the chronology.",
          reliability: "Reliability: read the claim, select the evidence that resolves it, then check your answer."
        };
        this._setFeedback(instructions[tab] || "Follow the steps above to complete this task.");
      });
    });

    this.root.querySelector("#lw-comp-clear")?.addEventListener("click", () => this._clearComparator());
    this.root.querySelector("#lw-comp-test")?.addEventListener("click", () => this._testComparator());
    this.root.querySelectorAll('input[name="lw-connection-type"]').forEach(input => {
      input.addEventListener('change', () => this._updateRelationshipHelp());
    });
    this.root.querySelector("#lw-folder-submit")?.addEventListener("click", () => this._submitFolders());
    this.root.querySelector("#lw-folder-move")?.addEventListener("change", () => this._moveSelectedItemToFolder());
    this.root.querySelector("#lw-timeline-clear")?.addEventListener("click", () => this._clearTimeline());
    this.root.querySelector("#lw-timeline-test")?.addEventListener("click", () => this._testTimeline());

    if (!container.dataset.lwBound) {
      container.dataset.lwBound = "1";
      container.addEventListener("keydown", (e) => {
        if (!['Enter', ' '].includes(e.key) || e.target.closest('button, select, input')) return;
        const interactive = e.target.closest('.ev-card, .comparator-slot, .folder-tray-header, .timeline-step');
        if (!interactive) return;
        e.preventDefault();
        interactive.click();
      });
      container.addEventListener("click", (e) => {
        const slot = e.target.closest(".comparator-slot");
        if (slot && !e.target.closest(".ev-info-btn")) {
          const idx = parseInt(slot.id.replace("lw-comp-slot-", ""), 10);
          if (this.compareSlots[idx]) {
            this.compareSlots[idx] = null;
            this._renderComparatorSlots();
            this._renderComparatorBank();
            this._setFeedback(`Cleared Slot ${idx === 0 ? 'A' : 'B'}.`);
          } else {
            this._activeComparatorSlotIndex = idx;
            this._setFeedback(`Slot ${idx === 0 ? 'A' : 'B'} selected. Tap an item to place.`, "success");
          }
          return;
        }

        const folderInfo = e.target.closest("[data-folder-info]");
        if (folderInfo) {
          e.stopPropagation();
          this._showFolderInfo(folderInfo.dataset.folderInfo);
          return;
        }

        const folderHeader = e.target.closest(".folder-tray-header");
        if (folderHeader) {
          const tray = folderHeader.closest(".folder-tray");
          if (tray) {
            tray.classList.toggle("expanded");
            this._activeFolderKey = tray.dataset.folder;
            this._setFeedback(`Selected ${folderInfoData[this._activeFolderKey]?.title || this._activeFolderKey}. Now select an unfiled evidence card.`, "success");
          }
          return;
        }

        const folder = e.target.closest(".folder-tray");
        if (folder && !e.target.closest(".ev-card, .ev-info-btn")) {
          this._activeFolderKey = folder.dataset.folder;
          this._setFeedback(`Selected ${folderInfoData[this._activeFolderKey]?.title || this._activeFolderKey}. Now select an unfiled evidence card.`, "success");
          return;
        }

        const stepHeader = e.target.closest(".step-header[data-step-toggle]");
        if (stepHeader) {
          const step = stepHeader.closest(".timeline-step");
          if (step) {
            step.classList.toggle("expanded");
            this._activeTimelineStep = Number(step.dataset.step);
            this._setFeedback(`Tap an item to place into event ${this._activeTimelineStep}.`);
          }
          return;
        }

        const step = e.target.closest(".timeline-step");
        if (step && !e.target.closest(".ev-card, .ev-info-btn")) {
          this._activeTimelineStep = parseInt(step.dataset.step, 10);
          this._setFeedback(`Tap an item to place into step ${this._activeTimelineStep}.`, "success");
          return;
        }

        const infoBtn = e.target.closest(".ev-info-btn");
        if (infoBtn) {
          e.stopPropagation();
          const id = infoBtn.dataset.evidenceId;
          this._openDetail(id);
          return;
        }

        const card = e.target.closest(".ev-card");
        if (card) {
          const id = card.dataset.evidenceId;
          const item = this.evidence.find(i => i.id === id);
          if (!item) return;
          this.selectedCardId = id;

          // Clicking a card that's already in a comparator slot removes it
          const slot = card.closest(".comparator-slot");
          if (slot) {
            const idx = parseInt(slot.id.replace("lw-comp-slot-", ""), 10);
            if (this.compareSlots[idx]?.id === id) {
              this.compareSlots[idx] = null;
              this._renderComparatorSlots();
              this._renderComparatorBank();
              this._setFeedback(`Removed ${item.name} from Slot ${idx === 0 ? 'A' : 'B'}.`);
              return;
            }
          }

          // Clicking a card that's already in a timeline step removes it
          const timelineStep = card.closest(".timeline-step");
          if (timelineStep) {
            const step = parseInt(timelineStep.dataset.step, 10);
            const idx = this.timelineSlots[step]?.indexOf(id);
            if (idx >= 0) {
              this.timelineSlots[step].splice(idx, 1);
              this._renderTimelineSteps();
              this._renderTimelineBank();
              this._setFeedback(`Removed ${item.name} from Step ${step}.`);
              return;
            }
          }

          const currentFolder = card.closest(".folder-tray");
          if (currentFolder) {
            const key = currentFolder.dataset.folder;
            this.folderState[key] = (this.folderState[key] || []).filter(itemId => itemId !== id);
            this._renderFolderContents();
            this._setFeedback(`Returned ${item.name} to unfiled evidence.`);
            return;
          }

          if (this._activeComparatorSlotIndex !== null) {
            this.compareSlots[this._activeComparatorSlotIndex] = item;
            this._activeComparatorSlotIndex = null;
            this._renderComparatorSlots();
            this._renderComparatorBank();
            this._setFeedback(`Placed ${item.name} in comparison.`, "success");
          } else if (this._activeFolderKey) {
            this._moveEvidenceToFolder(id, this._activeFolderKey);
            const folderTitle = folderInfoData[this._activeFolderKey]?.title || this._activeFolderKey;
            this._activeFolderKey = null;
            this._renderFolderContents();
            this._setFeedback(`Filed ${item.name} as ${folderTitle}.`, "success");
          } else if (this._activeTimelineStep) {
            const step = this._activeTimelineStep;
            if (!this.timelineSlots[step]) this.timelineSlots[step] = [];
            const idx = this.timelineSlots[step].indexOf(id);
            if (idx >= 0) {
              this.timelineSlots[step].splice(idx, 1);
              this._setFeedback(`Removed ${item.name} from Step ${step}.`, "success");
            } else {
              this.timelineSlots[step].push(id);
              this._setFeedback(`Placed ${item.name} in Step ${step}.`, "success");
              const stepEl = this.root.querySelector(`.timeline-step[data-step="${step}"]`);
              if (stepEl) stepEl.classList.add("expanded");
            }
            this._activeTimelineStep = null;
            this._renderTimelineSteps();
            this._renderTimelineBank();
          } else {
            this._setFeedback(`Select an action for ${item.name} first.`, "error");
          }
        }
      });

      // Drag and drop events
      container.addEventListener("dragstart", (e) => {
        const card = e.target.closest(".ev-card");
        if (!card) return;
        const id = card.dataset.evidenceId;
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => card.classList.add('dragging'), 0);
      }, true);

      container.addEventListener("dragend", (e) => {
        const card = e.target.closest(".ev-card");
        if (card) card.classList.remove('dragging');
        this.root.querySelectorAll('.drop-hover').forEach(el => el.classList.remove('drop-hover'));
      }, true);

      container.addEventListener("dragover", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step");
        if (dropZone) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }
      });

      container.addEventListener("dragenter", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step");
        if (dropZone) {
          e.preventDefault();
          dropZone.classList.add('drop-hover');
        }
      });

      container.addEventListener("dragleave", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step");
        if (dropZone && !dropZone.contains(e.relatedTarget)) {
          dropZone.classList.remove('drop-hover');
        }
      });

      container.addEventListener("drop", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step");
        if (!dropZone) return;
        e.preventDefault();
        dropZone.classList.remove('drop-hover');
        const id = e.dataTransfer.getData('text/plain');
        if (!id) return;

        if (dropZone.id.startsWith('lw-comp-slot-')) {
          const idx = parseInt(dropZone.id.replace("lw-comp-slot-", ""), 10);
          if (this.compareSlots[idx]?.id === id) {
            this.compareSlots[idx] = null;
            this._setFeedback(`Removed from Slot ${idx === 0 ? 'A' : 'B'}.`);
          } else {
            for (let s = 0; s < 2; s++) {
              if (this.compareSlots[s]?.id === id) {
                this.compareSlots[s] = null;
                break;
              }
            }
            this.compareSlots[idx] = this.evidence.find(i => i.id === id);
            this._setFeedback(`Placed in Slot ${idx === 0 ? 'A' : 'B'}.`, "success");
          }
          this._renderComparatorSlots();
          this._renderComparatorBank();
        } else if (dropZone.classList.contains('folder-tray')) {
          const key = dropZone.dataset.folder;
          const item = this.evidence.find(evidence => evidence.id === id);
          this._moveEvidenceToFolder(id, key);
          this._renderFolderContents();
          dropZone.classList.add("expanded");
          this._setFeedback(`Filed ${item?.name || 'evidence'} as ${folderInfoData[key]?.title || key}.`, "success");
        } else if (dropZone.classList.contains('timeline-step')) {
          const step = parseInt(dropZone.dataset.step, 10);
          if (!this.timelineSlots[step]) this.timelineSlots[step] = [];
          const alreadyHere = this.timelineSlots[step].includes(id);
          if (alreadyHere) {
            this.timelineSlots[step] = this.timelineSlots[step].filter(i => i !== id);
            this._setFeedback(`Removed from Step ${step}.`, "success");
          } else {
            for (const s in this.timelineSlots) {
              const idx = this.timelineSlots[s].indexOf(id);
              if (idx >= 0) this.timelineSlots[s].splice(idx, 1);
            }
            this.timelineSlots[step].push(id);
            this._setFeedback(`Placed in Step ${step}.`, "success");
            const stepEl = this.root.querySelector(`.timeline-step[data-step="${step}"]`);
            if (stepEl) stepEl.classList.add("expanded");
          }
          this._renderTimelineSteps();
          this._renderTimelineBank();
        }
      }, true);
    }

    this._flushPendingResultModal();
  }

  _initState() {
    this._workspaceCaseId = (this.es.caseManager || this.de.caseManager)?.activeCaseId;
    this.score = 0;
    const pool = this.es.getCollected?.() || this.es.getEvidencePool?.().filter(e => this.es.isCollected(e.id)) || [];
    const typeMap = { physical: 'physical', testimonial: 'testimonial', analytical: 'analytical', environmental: 'environmental' };
    const categoryMap = { people: 'testimonial', event: 'environmental', prophecy: 'analytical' };
    this.evidence = pool.map(e => ({
      id: e.id,
      name: e.name,
      icon: e.icon || e.emoji || '',
      category: typeMap[e.type] || categoryMap[e.category] || e.category || e.type || 'physical',
      timelineOrder: e.timelineOrder ?? null,
      fake: !!e.fake,
      desc: e.desc || e.name,
      clues: e.clues || { compare: '', link: '', timeline: '', contradict: '' }
    }));
    this.compareSlots = [null, null];
    this.folderState = {};
    this.timelineSlots = {};
    this.activeTab = "connections";
    this._activeComparatorSlotIndex = null;
    this._activeFolderKey = null;
    this._activeTimelineStep = null;
    this.selectedCardId = null;
    const savedDeductions = this.es.caseManager?.getCaseProgress?.(this.es.caseManager.activeCaseId)?.deductionsMade || [];
    this.matchedPairs = savedDeductions
      .filter(d => d.isValidatedInsight && d.evidenceAId && d.evidenceBId && d.operation !== 'research')
      .map(d => [d.evidenceAId, d.evidenceBId, this._relationshipLabel(d.operation, d), d.operation]);
    this._pendingResultModal = null;
    const insightAwards = this.es.caseManager?.getCaseProgress?.(this.es.caseManager.activeCaseId)?.insightAwards || {};
    this._labVerified = {
      folders: !!insightAwards['lab:folder_verify'],
      timeline: !!insightAwards['lab:timeline_test']
    };
    const cm = this.es.caseManager || this.de.caseManager;
    const saved = cm?.getCaseProgress?.(this._workspaceCaseId)?.labWorkspace;
    const byId = new Map(this.evidence.map(item => [item.id, item]));
    const restoreGroups = (groups, allowedKeys, allowedIds) => {
      const seen = new Set();
      return Object.fromEntries(Object.entries(groups || {}).filter(([key]) => allowedKeys.has(key)).map(([key, ids]) =>
        [key, (Array.isArray(ids) ? ids : []).filter(id => {
          if (!allowedIds.has(id) || seen.has(id)) return false;
          seen.add(id);
          return true;
        })]));
    };
    this._folderChecked = !!saved?.folderChecked;
    this._timelineChecked = !!saved?.timelineChecked;
    this._lastFeedback = saved?.feedback || null;
    this.currentTab = ['connections', 'link', 'timeline', 'reliability', 'prophecies'].includes(saved?.tab) ? saved.tab : 'connections';
    if (saved?.version === 1) {
      this.folderState = restoreGroups(saved.folders, new Set(Object.keys(folderInfoData)), new Set(byId.keys()));
      const timeline = this._getTimelineEvidence();
      this.timelineSlots = restoreGroups(saved.timeline, new Set(this._getAllTimelineEvidence().map(item => String(item.timelineOrder))), new Set(timeline.map(item => item.id)));
      this.compareSlots = [0, 1].map(index => byId.get(saved.compare?.[index]) || null);
    } else {
      // Older saves recorded completed tasks but discarded their placements.
      if (this._labVerified.folders) {
        for (const item of this.evidence) (this.folderState[item.category] ||= []).push(item.id);
        this._folderChecked = true;
      }
      if (this._labVerified.timeline) {
        for (const item of this._getTimelineEvidence()) (this.timelineSlots[item.timelineOrder] ||= []).push(item.id);
        this._timelineChecked = true;
      }
    }
  }

  _saveWorkspace() {
    const cm = this.es.caseManager || this.de.caseManager;
    // A delayed callback from an old case must never write into the new one.
    if (!this._workspaceCaseId || cm?.activeCaseId !== this._workspaceCaseId) return;
    const progress = cm.getCaseProgress?.(this._workspaceCaseId);
    if (!progress) return;
    progress.labWorkspace = JSON.parse(JSON.stringify({
      version: 1, folders: this.folderState, timeline: this.timelineSlots,
      compare: this.compareSlots.map(item => item?.id || null), tab: this.currentTab,
      folderChecked: this._folderChecked, timelineChecked: this._timelineChecked,
      feedback: this._lastFeedback
    }));
    cm._saveProgress?.();
  }

  _showPlacementResults(kind) {
    const folderMode = kind === 'folder';
    const groups = folderMode ? this.folderState : this.timelineSlots;
    this.root.querySelectorAll(folderMode ? '.folder-tray' : '.timeline-step').forEach(group => {
      group.classList.add('expanded');
      const key = folderMode ? group.dataset.folder : group.dataset.step;
      group.querySelectorAll('.ev-card').forEach(card => {
        const item = this.evidence.find(e => e.id === card.dataset.evidenceId);
        const correct = item && (folderMode ? item.category === key : String(item.timelineOrder) === key);
        card.setAttribute('data-folder-status', correct ? 'correct' : 'wrong');
        card.setAttribute('aria-label', `${item?.name || 'Evidence'}: ${correct ? 'Correct placement' : 'Wrong placement'}`);
      });
      const badge = group.querySelector('[data-folder-badge]');
      if (badge) {
        const expected = this.evidence.filter(item => item.category === key).length;
        const ids = groups[key] || [];
        const count = ids.filter(id => this.evidence.find(item => item.id === id)?.category === key).length;
        badge.hidden = false;
        badge.textContent = `${count}/${expected}`;
        badge.className = `folder-verify-badge ${count === expected && ids.length === expected ? 'badge-correct' : 'badge-wrong'}`;
      }
    });
  }

  _renderBanks() {
    this._renderResearch();
    this._renderComparatorSlots();
    this._renderComparatorBank();
    this._renderFolderGrid();
    this._renderFolderContents();
    this._populateFolderMoveDropdown();
    this._renderTimelineMiniBar();
    this._renderTimelineSteps();
    this._renderTimelineBank();
    this._renderMatchedPairs();
    this._updateCompareProgress();
    this._renderReliabilityTasks();
  }

  _renderTimelineMiniBar() {
    const bar = this.root.querySelector("#lw-folder-timeline-bar");
    if (!bar) return;
    const byCategory = {};
    this.evidence.forEach(e => {
      byCategory[e.category] = (byCategory[e.category] || 0) + 1;
    });
    const maxCount = Math.max(...Object.values(byCategory), 1);
    bar.innerHTML = Object.entries(byCategory).map(([cat, count]) => {
      const heightPct = Math.round((count / maxCount) * 100);
      return `
        <div class="mini-bar-item">
          <div class="mini-bar-fill" style="height: ${heightPct}%;"></div>
          <span class="mini-bar-count">${count}</span>
          <span class="mini-bar-label">${cat}</span>
        </div>`;
    }).join('');
  }

  _getActiveCase() {
    return this.es.caseManager?.getActiveCase?.() || this.de.caseManager?.getActiveCase?.() || null;
  }

  _renderResearch() {
    const container = this.root.querySelector('#lw-prophecy-tasks');
    if (!container) return;
    const cm = this.es.caseManager || this.de.caseManager;
    const c = this._getActiveCase();
    const clues = (this.es.getCollected?.() || []).filter(e => e.type !== 'scripture' && !e.fake);
    const prophecies = c?.prophecies || [];
    const pending = prophecies.filter(p => cm.isCaseProphecyListed?.(p.id) && cm.getCodexStatus(p.id) !== 'complete');
    const unidentified = prophecies.some(p => !cm.isCaseProphecyListed?.(p.id));
    const reminder = unidentified ? '<p class="lab-research-status">Interview the remaining witnesses to identify more passages. Track your discoveries in Case Files.</p>' : '';
    if (!pending.length) {
      container.innerHTML = unidentified ? reminder : '<p class="lab-research-status">Research complete. Review your findings and conclude the investigation in Case Files.</p>';
      return;
    }
    container.innerHTML = reminder + pending.map(p => {
      const supported = getResearchEvidenceIds(c, p);
      return `<article class="lab-task-guide"><h4>${escapeLabText(p.reference)}</h4>
        <p>${escapeLabText(p.text)}</p>
        ${!clues.length ? '<p>Collect evidence from the scene and witness interviews before testing this passage.</p>' : !supported.length
          ? '<p>This older case is missing its evidence mapping. Research is unavailable until the case data is corrected.</p>'
          : `<label>Supporting evidence<select class="folder-move-select" aria-label="Evidence for ${escapeLabText(p.reference)}"><option value="">Choose a collected clue…</option>${clues.map(e => `<option value="${escapeLabText(e.id)}">${escapeLabText(e.name)}</option>`).join('')}</select></label><button class="btn-submit" data-research-prophecy="${escapeLabText(p.id)}">Test prophecy match</button>`}
      </article>`;
    }).join('');
  }

  _getReliabilityTasks() {
    const tasks = this._getActiveCase()?.reliabilityChecks;
    return Array.isArray(tasks) ? tasks : [];
  }

  _getAuthoredConnections() {
    const deductions = this._getActiveCase()?.deductions || {};
    const connections = [];
    Object.entries(deductions).forEach(([pairKey, operations]) => {
      const ids = pairKey.split('+');
      if (ids.length !== 2 || !operations) return;
      Object.entries(operations).forEach(([operation, deduction]) => {
        if (!['compare', 'link', 'contradict'].includes(operation)) return;
        if (operation === 'link' && deduction?.revealsProphecy) return;
        if (this.evidence?.length && !ids.every(id => this.evidence.some(e => e.id === id))) return;
        connections.push({ ids, operation, deduction });
      });
    });
    return connections;
  }

  _relationshipLabel(operation, deduction = {}) {
    if (deduction.relationship) return deduction.relationship;
    if (operation === 'compare') return 'Corroborates';
    if (operation === 'contradict') return 'Challenges';
    return 'Fulfils / explains';
  }

  _selectedConnectionOperation() {
    const selected = this.root?.querySelector('input[name="lw-connection-type"]:checked')?.value || 'compare';
    return selected;
  }

  _updateRelationshipHelp() {
    const help = this.root?.querySelector('#lw-relationship-help');
    if (!help) return;
    const descriptions = {
      compare: 'Both pieces support the same conclusion.',
      link: 'One piece gives meaning or context to the other.',
      contradict: 'One piece exposes a conflict or false claim.'
    };
    help.textContent = descriptions[this._selectedConnectionOperation()];
  }

  _renderReliabilityTasks() {
    const el = this.root?.querySelector('#lw-reliability-tasks');
    if (!el) return;
    el.innerHTML = this._getReliabilityTasks().map(task => `
      <article class="reliability-task">
        <h4>${task.claim || 'Assess this claim'}</h4>
        <p>${task.prompt || 'Which evidence makes this source less reliable?'}</p>
        <p class="reliability-note">Use the case evidence to assess this claim.</p>
      </article>`).join('');
  }

  _updateCompareProgress() {
    const guide = this.root.querySelector('#lw-connection-guide');
    if (guide) guide.innerHTML = this._getRequiredConnections().map((connection, index) => {
      const done = this.matchedPairs.some(([a, b, , operation]) => operation === connection.operation && connection.ids.includes(a) && connection.ids.includes(b));
      const names = connection.ids.map(id => this._getActiveCase()?.evidencePool?.find(e => e.id === id)?.name || id);
      const missing = connection.ids.filter(id => !this.evidence.some(e => e.id === id));
      const missingNames = missing.map(id => names[connection.ids.indexOf(id)]);
      const status = done ? 'Connection verified.' : missing.length ? `Collect first: ${missingNames.join(' + ')}. Find clues at the scene or by interviewing witnesses. Scripture cards are added after Lab research.` : 'Both clues collected — ready to test.';
      return `<div class="lab-connection-hint ${done ? 'is-complete' : ''}"><div class="lab-connection-hint-copy"><p class="lab-connection-hint-name"><span aria-hidden="true">${done ? '✓' : '○'}</span> ${names.map(escapeLabText).join(' + ')}</p><p class="lab-connection-hint-status" id="lw-hint-status-${index}">${escapeLabText(status)}</p></div><button type="button" class="btn-secondary" data-connection-hint="${index}" aria-describedby="lw-hint-status-${index}" ${done || missing.length ? 'disabled' : ''}>${done ? 'Complete' : missing.length ? 'Awaiting clues' : 'Load hint'}</button></div>`;
    }).join('');
    const countEl = this.root.querySelector("#lw-compare-progress .compare-progress-count");
    if (!countEl) return;
    const authored = this._getAuthoredConnections();
    const required = this._getRequiredConnections();
    const isFound = connection => this.matchedPairs.some(([a, b, relationship, operation]) =>
      connection.ids.includes(a) && connection.ids.includes(b) &&
      (operation ? operation === connection.operation : relationship === this._relationshipLabel(connection.operation, connection.deduction))
    );
    const requiredFound = required.filter(isFound).length;
    const optional = authored.filter(connection => !required.some(requiredConnection =>
      requiredConnection.operation === connection.operation && requiredConnection.ids.every(id => connection.ids.includes(id))
    ));
    const optionalFound = optional.filter(isFound).length;
    countEl.textContent = `${requiredFound}/${required.length}`;
    const optionalEl = this.root.querySelector("#lw-compare-progress .compare-progress-optional");
    if (optionalEl) optionalEl.textContent = `Optional discoveries: ${optionalFound}/${optional.length}`;
  }

  _getRequiredConnections() {
    const configured = this._getActiveCase()?.requiredConnections;
    if (Array.isArray(configured) && configured.length) {
      return configured.map(required => ({ ids: required.pair.split('+'), operation: required.operation }));
    }
    return this._getAuthoredConnections().filter(connection => connection.deduction?.isKey);
  }

  _getTotalComparePairs() {
    return this._getAuthoredConnections().length;
  }

  _renderMatchedPairs() {
    const list = this.root.querySelector("#lw-matched-pairs-list");
    if (!list) return;
    if (this.matchedPairs.length === 0) {
      list.innerHTML = `<span style="font-size:0.72rem; color:var(--text-dim);">No pairs matched yet</span>`;
      return;
    }
    list.innerHTML = this.matchedPairs.map(([aId, bId, relationship]) => {
      const a = this.evidence.find(e => e.id === aId);
      const b = this.evidence.find(e => e.id === bId);
      const aHtml = a ? this._cardHTML(a, "matched") : `<span>${aId}</span>`;
      const bHtml = b ? this._cardHTML(b, "matched") : `<span>${bId}</span>`;
      return `<div class="matched-pair-row">${aHtml}<span class="pair-arrow">${relationship || 'Connects'}</span>${bHtml}</div>`;
    }).join("");
  }

  _renderComparatorBank() {
    const bank = this.root.querySelector("#lw-comp-bank");
    if (!bank) return;
    const available = this.evidence;
    bank.innerHTML = available.map(item => {
      const inSlotA = this.compareSlots[0]?.id === item.id;
      const inSlotB = this.compareSlots[1]?.id === item.id;
      const selClass = inSlotA || inSlotB ? "selected" : "";
      const badge = inSlotA ? "A" : inSlotB ? "B" : null;
      return this._cardHTML(item, selClass, badge);
    }).join("");
    if (!bank.dataset.bound) {
      bank.dataset.bound = "1";
      bank.addEventListener("click", (e) => {
        const card = e.target.closest(".ev-card");
        if (!card) return;
        const infoBtn = e.target.closest(".ev-info-btn");
        if (infoBtn) return;
        const item = this.evidence.find(i => i.id === card.dataset.evidenceId);
        if (!item) return;
        const currentSelected = new Set(this.compareSlots.filter(Boolean).map(i => i.id));
        if (currentSelected.has(item.id)) {
          this._setFeedback(`${item.name} is already placed. Tap the slot to remove it.`, "error");
          e.stopPropagation();
          return;
        }
        const empty = this.compareSlots.findIndex(s => s === null);
        if (empty >= 0) {
          this.compareSlots[empty] = item;
        } else {
          this.compareSlots[0] = item;
        }
        this._renderComparatorSlots();
        this._renderComparatorBank();
        this._setFeedback(`Added ${item.name} to comparison.`, "success");
        e.stopPropagation();
      });
    }
  }

  _renderComparatorSlots() {
    this._saveWorkspace();
    for (let i = 0; i < 2; i++) {
      const slot = this.root.querySelector(`#lw-comp-card-${i}`);
      const container = this.root.querySelector(`#lw-comp-slot-${i}`);
      if (!slot || !container) continue;
      const item = this.compareSlots[i];
      if (item) {
        slot.innerHTML = this._cardHTML(item, "selected");
        container.classList.add("filled");
      } else {
        container.setAttribute("data-empty-label", `Slot ${i === 0 ? 'A' : 'B'}`);
        slot.innerHTML = "";
        container.classList.remove("filled");
      }
    }
  }

  _renderFolderGrid() {
    const grid = this.root.querySelector("#lw-folder-grid");
    if (!grid) return;
    grid.innerHTML = Object.entries(folderInfoData).map(([key, info]) => `
      <div class="folder-tray" data-folder="${key}" role="group" aria-label="${info.title}">
        <div class="folder-tray-header" data-folder-toggle="${key}" role="button" tabindex="0" aria-label="Select ${info.title}: ${info.desc}">
          <span class="folder-header-title">${info.title}</span>
          <button type="button" class="folder-info-btn" data-folder-info="${key}" aria-label="What is ${info.title}?">ⓘ</button>
          <span class="folder-verify-badge" data-folder-badge="${key}" hidden></span>
          <span class="folder-chevron" aria-hidden="true">▼</span>
        </div>
        <div class="folder-type-description">${info.desc}</div>
        <div class="folder-tray-body">
          <div class="folder-content" id="lw-folder-${key}"></div>
        </div>
      </div>
    `).join("");
  }

  _renderFolderContents() {
    this._saveWorkspace();
    for (const key of Object.keys(folderInfoData)) {
      const el = this.root.querySelector(`#lw-folder-${key}`);
      if (!el) continue;
      const items = (this.folderState[key] || [])
        .map(id => this.evidence.find(evidence => evidence.id === id))
        .filter(Boolean);
      el.innerHTML = items.length
        ? items.map(item => this._cardHTML(item, "selected")).join("")
        : `<span class="folder-empty">Select this folder, then choose a card</span>`;
    }

    const bank = this.root.querySelector("#lw-folder-bank");
    if (!bank) return;
    const filed = new Set(Object.values(this.folderState).flat());
    const unfiled = this.evidence.filter(item => !filed.has(item.id));
    bank.innerHTML = unfiled.length
      ? unfiled.map(item => this._cardHTML(item)).join("")
      : `<span class="folder-empty">${this.evidence.length ? 'All evidence has been filed. Verify your folders.' : 'No evidence collected yet. Return after finding a clue.'}</span>`;
    if (this._folderChecked) this._showPlacementResults('folder');
  }

  _moveEvidenceToFolder(id, folderKey) {
    for (const key of Object.keys(folderInfoData)) {
      this.folderState[key] = (this.folderState[key] || []).filter(itemId => itemId !== id);
    }
    if (!this.folderState[folderKey]) this.folderState[folderKey] = [];
    this.folderState[folderKey].push(id);
  }

    _populateFolderMoveDropdown() {
    const select = this.root.querySelector("#lw-folder-move");
    if (!select) return;
    select.innerHTML = '<option value="">Move selected to folder…</option>';
    Object.entries(folderInfoData).forEach(([key, info]) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = info.title;
      select.appendChild(opt);
    });
  }

  _moveSelectedItemToFolder() {
    const select = this.root.querySelector("#lw-folder-move");
    if (!select || !select.value || !this.selectedCardId) {
      if (!this.selectedCardId) this._setFeedback("Select an evidence card first.", "error");
      return;
    }
    const id = this.selectedCardId;
    const item = this.evidence.find(e => e.id === id);
    const folderKey = select.value;
    this._moveEvidenceToFolder(id, folderKey);
    this._renderFolderContents();
    select.value = "";
    this._setFeedback(`Moved ${item?.name || 'evidence'} to ${folderInfoData[folderKey]?.title || folderKey}.`, "success");
  }

  _showFolderInfo(key) {
    const info = folderInfoData[key];
    if (!info) return;
    const title = this.root.querySelector("#lw-modal-title");
    const body = this.root.querySelector("#lw-modal-body");
    const detail = this.root.querySelector("#lw-modal-detail");
    if (title) title.textContent = info.title;
    if (body) body.textContent = info.desc;
    if (detail) detail.innerHTML = `<div class="detail-row"><strong>Example:</strong><span>${info.example}</span></div>`;
    this.root.querySelector("#lw-modal-mask")?.classList.add("open");
  }

  _renderTimelineSteps() {
    this._saveWorkspace();
    const stepsEl = this.root.querySelector("#lw-timeline-steps");
    if (!stepsEl) return;
    const allTimelineEvidence = this._getAllTimelineEvidence();
    const collectedEvidence = this._getCollectedTimelineEvidence();
    const orders = [...new Set(allTimelineEvidence.map(e => e.timelineOrder))].sort((a, b) => a - b);
    const steps = orders.map((num, idx) => {
      const allAtOrder = allTimelineEvidence.filter(e => e.timelineOrder === num);
      const collectedAtOrder = collectedEvidence.filter(e => e.timelineOrder === num);
      return { num, title: `Event ${num}`, hint: `${allAtOrder.length} item${allAtOrder.length !== 1 ? 's' : ''}` };
    });
    stepsEl.innerHTML = steps.map(s => {
      const ids = this.timelineSlots[s.num] || [];
      const filled = ids.length > 0 ? "filled" : "";
      const itemsHtml = ids.map(id => {
        const item = this.evidence.find(e => e.id === id);
        return item ? this._cardHTML(item, "selected") : "";
      }).join("");
      const requiredCount = allTimelineEvidence.filter(e => e.timelineOrder === s.num).length;
      const collectedCount = this.evidence.filter(e => e.timelineOrder === s.num).length;
      const badgeHtml = requiredCount > 0 ? `<span class="timeline-badge">${collectedCount}/${requiredCount} collected</span>` : '';
      return `
        <div class="timeline-step ${filled}" data-step="${s.num}" role="button" tabindex="0" aria-label="Event ${s.num}, ${collectedCount} of ${requiredCount} evidence items collected">
          <div class="step-header" data-step-toggle="${s.num}">
            <div>
              <span class="step-title">${s.title}</span>
              <span class="step-hint">${s.hint}</span>
              ${badgeHtml}
            </div>
            <span class="step-chevron" aria-hidden="true">▼</span>
          </div>
          <div class="step-body">
            <div class="step-cards-container" id="lw-timeline-step-${s.num}">
              ${itemsHtml || `<span class="timeline-placeholder">Drag evidence here</span>`}
            </div>
          </div>
        </div>
      `;
    }).join("");
    if (this._timelineChecked) this._showPlacementResults('timeline');
  }

  _renderTimelineBank() {
    const bank = this.root.querySelector("#lw-timeline-bank");
    if (!bank) return;
    const assigned = new Set(Object.values(this.timelineSlots).flat());
    const unassigned = this._getTimelineEvidence().filter(e => !assigned.has(e.id));
    bank.innerHTML = unassigned.length ? unassigned.map(i => this._cardHTML(i)).join("") : `<span class="timeline-placeholder">All placed</span>`;
  }

  _getAllTimelineEvidence() {
    const pool = this.es.getEvidencePool?.() || [];
    const authoredIds = this._getActiveCase()?.timelineEvidenceIds;
    if (Array.isArray(authoredIds) && authoredIds.length) {
      const allPool = pool.map(e => ({
        id: e.id, name: e.name, icon: e.icon || e.emoji || '',
        timelineOrder: e.timelineOrder ?? null,
        fake: !!e.fake, desc: e.desc || e.name
      }));
      return authoredIds.slice(0, 5).map(id => allPool.find(e => e.id === id)).filter(e => e?.timelineOrder != null);
    }
    return pool
      .filter(e => e.timelineOrder != null)
      .sort((a, b) => a.timelineOrder - b.timelineOrder)
      .slice(0, 5)
      .map(e => ({
        id: e.id, name: e.name, icon: e.icon || e.emoji || '',
        timelineOrder: e.timelineOrder ?? null,
        fake: !!e.fake, desc: e.desc || e.name
      }));
  }

  _getCollectedTimelineEvidence() {
    const authoredIds = this._getActiveCase()?.timelineEvidenceIds;
    if (Array.isArray(authoredIds) && authoredIds.length) {
      return authoredIds.slice(0, 5).map(id => this.evidence.find(e => e.id === id)).filter(e => e?.timelineOrder != null);
    }
    const byEvent = new Map();
    this.evidence
      .filter(e => e.timelineOrder != null)
      .sort((a, b) => a.timelineOrder - b.timelineOrder)
      .forEach(e => {
        if (!byEvent.has(e.timelineOrder) && byEvent.size < 5) byEvent.set(e.timelineOrder, e);
      });
    return [...byEvent.values()];
  }

  _getTimelineEvidence() {
    return this._getCollectedTimelineEvidence();
  }

  _cardHTML(item, extraClass = "", badge = null) {
    const iconSrc = item.icon || item.emoji || '../assets/gfx/scroll-duotone.svg';
    const iconHtml = typeof iconSrc === 'string' && iconSrc.endsWith('.svg')
      ? `<img src="${iconSrc}" class="icon-svg" loading="lazy" alt="">`
      : iconSrc;
    const badgeHtml = badge ? `<span class="sel-badge sel-badge-${badge.toLowerCase()}" aria-hidden="true">${badge}</span>` : '';
    return `<div class="ev-card ${extraClass}" data-evidence-id="${item.id}" draggable="true" role="button" tabindex="0" aria-label="Select ${item.name}"><span class="card-icon">${iconHtml}</span><span class="card-name">${item.name}</span>${badgeHtml}<button type="button" class="ev-info-btn" data-evidence-id="${item.id}" aria-label="More information about ${item.name}">ⓘ</button></div>`;
  }

  _clearComparator() {
    this.compareSlots = [null, null];
    this._activeComparatorSlotIndex = null;
    this._renderComparatorSlots();
    this._renderComparatorBank();
    this._setFeedback("Comparator cleared.");
  }

  _testComparator() {
    const [a, b] = this.compareSlots;
    if (!a || !b) {
      this._setFeedback("Select two items to compare.", "error");
      return;
    }
    const slot0 = this.root.querySelector("#lw-comp-slot-0");
    const slot1 = this.root.querySelector("#lw-comp-slot-1");
    const card0 = slot0.querySelector(".ev-card");
    const card1 = slot1.querySelector(".ev-card");
    const operation = this._selectedConnectionOperation();
    const authored = this._getAuthoredConnections().find(connection => {
      const pairMatches = connection.ids.includes(a.id) && connection.ids.includes(b.id);
      const relationshipMatches = connection.operation === operation;
      return pairMatches && relationshipMatches;
    });

    if (authored) {
      this.es.selectForSlot(a.id, 'A');
      this.es.selectForSlot(b.id, 'B');
      const result = this.de.operate(authored.operation);
      this.es.deselectAll();
      slot0?.classList.add("correct");
      slot1?.classList.add("correct");
      card0?.classList.add("correct-flash");
      card1?.classList.add("correct-flash");
      const relationship = result.relationship || this._relationshipLabel(authored.operation, authored.deduction);
      this._setFeedback(`${relationship}: ${a.name} and ${b.name}`, "success");
      this.onResult?.({ type: 'connection_test', success: true, feedback: `${relationship} connection confirmed.`, feedbackType: "success" });
      const detail = [
        result.text ? `<strong>Deduction:</strong> ${result.text}` : '',
        result.insight ? `<strong>Why it matters:</strong> ${result.insight}` : '',
        result.bibleRef ? `<strong>Bible reference:</strong> ${result.bibleRef}` : '',
        result.pointsAwarded ? `<strong>Insight Points:</strong> +${result.pointsAwarded}` : `<strong>Insight Points:</strong> Already awarded`
      ].filter(Boolean).join('<br><br>');
      this._showResultModal("Connection Found", `${relationship}: ${a.name} and ${b.name}`, detail);
      this._flushPendingResultModal();

      if (!this.matchedPairs.some(pair => pair[0] === a.id && pair[1] === b.id && pair[2] === relationship)) {
        this.matchedPairs.push([a.id, b.id, relationship, authored.operation]);
      }
      this.compareSlots = [null, null];
      this._renderComparatorSlots();
      this._renderComparatorBank();
      this._renderMatchedPairs();
      this._updateCompareProgress();

      const totalPairs = this._getTotalComparePairs();
      if (this.matchedPairs.length >= totalPairs && totalPairs > 0) {
        this._setFeedback("All compare pairs found!", "success");
        this._showResultModal("🎉 Amazing Work!", "All evidence connections have been identified.", `<strong>Reward:</strong> Deduction methodology unlocked.`);
        this._flushPendingResultModal();
      }

      setTimeout(() => {
        slot0?.classList.remove("correct", "wrong");
        slot1?.classList.remove("correct", "wrong");
        card0?.classList.remove("correct-flash", "wrong-flash");
        card1?.classList.remove("correct-flash", "wrong-flash");
      }, 1400);
    } else {
      slot0?.classList.add("wrong");
      slot1?.classList.add("wrong");
      card0?.classList.add("wrong-flash");
      card1?.classList.add("wrong-flash");
      this._setFeedback("That relationship is not supported by the evidence. Try another connection.", "error");
      this.onResult?.({ type: 'connection_test', success: false, feedback: "That relationship is not supported by the evidence.", feedbackType: "error" });
      setTimeout(() => {
        slot0?.classList.remove("correct", "wrong");
        slot1?.classList.remove("correct", "wrong");
        card0?.classList.remove("correct-flash", "wrong-flash");
        card1?.classList.remove("correct-flash", "wrong-flash");
      }, 1400);
    }
  }

  _submitFolders() {
    this._folderChecked = true;
    this._showPlacementResults('folder');
    this._saveWorkspace();
    if (!this.evidence.length) {
      this._setFeedback("Collect evidence before using the Link folders.", "error");
      return;
    }

    const filedIds = new Set(Object.values(this.folderState).flat());
    let correct = 0;

    for (const [key, info] of Object.entries(folderInfoData)) {
      const ids = this.folderState[key] || [];
      const expected = this.evidence.filter(item => item.category === key).length;
      const correctInFolder = ids.filter(id => this.evidence.find(item => item.id === id)?.category === key).length;
      const folder = this.root.querySelector(`.folder-tray[data-folder="${key}"]`);
      const badge = this.root.querySelector(`[data-folder-badge="${key}"]`);
      const folderIsCorrect = correctInFolder === expected && ids.length === expected;

      folder?.classList.remove("correct", "wrong");
      folder?.classList.add(folderIsCorrect ? "correct" : "wrong");
      if (badge) {
        badge.hidden = false;
        badge.textContent = `${correctInFolder}/${expected}`;
        badge.className = `folder-verify-badge ${folderIsCorrect ? 'badge-correct' : 'badge-wrong'}`;
      }

      ids.forEach(id => {
        const item = this.evidence.find(evidence => evidence.id === id);
        const card = folder?.querySelector(`.ev-card[data-evidence-id="${id}"]`);
        const isCorrect = item?.category === key;
        if (isCorrect) correct++;
        card?.classList.add(isCorrect ? "correct-flash" : "wrong-flash");
        card?.setAttribute("data-folder-status", isCorrect ? "correct" : "wrong");
      });

      if (!folderIsCorrect) {
        folder?.setAttribute("aria-label", `${info.title}: ${correctInFolder} of ${expected} correct`);
      }
    }

    const allFiled = filedIds.size === this.evidence.length;
    const allCorrect = allFiled && correct === this.evidence.length;
    if (allCorrect) {
      const wasAlreadySolved = this._labVerified.folders;
      this._labVerified.folders = true;
      this._setFeedback("All evidence is filed under the correct type.", "success");
      this.onResult?.({
        type: "folder_verify",
        success: true,
        scoreDelta: 5,
        feedback: `Evidence types verified.${wasAlreadySolved ? '' : ' +5 Insight Points'}`,
        feedbackType: "success"
      });
      this._showResultModal(
        "Evidence Linked",
        "Every clue is filed under the correct evidence type.",
        `<strong>What you learned:</strong> Physical evidence is tangible; testimonial evidence records what people say; analytical evidence interprets facts; environmental evidence comes from the surrounding scene.<br><br><strong>Insight Points:</strong> ${wasAlreadySolved ? 'Already awarded' : '+5'}`
      );
      this._flushPendingResultModal();
    } else if (!allFiled) {
      const remaining = this.evidence.length - filedIds.size;
      this._setFeedback(`File the remaining ${remaining} evidence item${remaining === 1 ? '' : 's'}, then verify again.`, "error");
      this.onResult?.({ type: "folder_verify", success: false, feedback: "Some evidence is still unfiled.", feedbackType: "error" });
    } else {
      this._setFeedback(`${correct}/${this.evidence.length} items are in the correct folder. Move the marked items and try again.`, "error");
      this.onResult?.({ type: "folder_verify", success: false, feedback: "Some evidence is in the wrong folder.", feedbackType: "error" });
    }

    setTimeout(() => {
      this.root?.querySelectorAll(".ev-card").forEach(card => card.classList.remove("correct-flash", "wrong-flash"));
      this.root?.querySelectorAll(".folder-tray").forEach(folder => folder.classList.remove("correct", "wrong"));
    }, 1800);
  }

  _clearTimeline() {
    this.timelineSlots = {};
    this._activeTimelineStep = null;
    this._renderTimelineSteps();
    this._renderTimelineBank();
    this._setFeedback("Timeline cleared.");
  }

  _testTimeline() {
    this._timelineChecked = true;
    this._showPlacementResults('timeline');
    this._saveWorkspace();
    const authoredTimelineIds = this._getActiveCase()?.timelineEvidenceIds || [];
    const collectedTimelineIds = new Set(this.evidence.map(e => e.id));
    const missingTimelineCount = authoredTimelineIds.filter(id => !collectedTimelineIds.has(id)).length;
    if (missingTimelineCount > 0) {
      this._setFeedback(`Find ${missingTimelineCount} more pivotal evidence item${missingTimelineCount === 1 ? '' : 's'} before verifying the timeline.`, "error");
      return;
    }
    let correct = 0;
    const timelineEvidence = this._getTimelineEvidence();
    const totalTimelineItems = timelineEvidence.length;
    const allSteps = [...new Set(timelineEvidence.map(e => e.timelineOrder))].sort((a, b) => a - b);
    allSteps.forEach(step => {
      const stepEl = this.root.querySelector(`#lw-timeline-step-${step}`);
      if (!stepEl) return;
      const ids = this.timelineSlots[step] || [];
      if (ids.length === 0) return;
      const correctIds = ids.filter(id => {
        const item = timelineEvidence.find(e => e.id === id);
        if (item && item.timelineOrder === step) {
          correct++;
          return true;
        }
        return false;
      });
      const allCorrect = correctIds.length === ids.length;
      stepEl.classList.add(allCorrect ? "correct" : "wrong");
      ids.forEach(id => {
        const card = stepEl.querySelector(`.ev-card[data-evidence-id="${id}"]`);
        const item = this.evidence.find(e => e.id === id);
        if (card && item) {
          const isCorrect = item.timelineOrder === step;
          card.classList.add(isCorrect ? "correct-flash" : "wrong-flash");
        }
      });
    });
    if (correct === totalTimelineItems && totalTimelineItems > 0) {
      const wasAlreadySolved = this._labVerified.timeline;
      this._labVerified.timeline = true;
      this._setFeedback("Timeline is correct.", "success");
      this.onResult?.({ type: 'timeline_test', success: true, scoreDelta: 10, feedback: "Timeline is correct. +10 Insight Points", feedbackType: "success" });
      const activeCase = this._getActiveCase();
      const timelineInsight = activeCase?.timelineInsight || "The sequence establishes what happened before the case reached its conclusion.";
      const timelineReference = activeCase?.timelineBibleRef ? `<br><br><strong>Bible reference:</strong> ${activeCase.timelineBibleRef}` : '';
      this._showResultModal("Timeline Verified", "Chronology verified. The pivotal events are in the correct order.", `<strong>Why it matters:</strong> ${timelineInsight}${timelineReference}<br><br><strong>Insight Points:</strong> ${wasAlreadySolved ? 'Already awarded' : '+10'}`);
      this._flushPendingResultModal();
      this._labVerified.timeline = true;
      this.root?.classList.add('lab-verified');
    } else {
      this._setFeedback(`Timeline has ${correct}/${totalTimelineItems} correct placements.`, "error");
      this.onResult?.({ type: 'timeline_test', success: false, feedback: `Timeline has ${correct}/${totalTimelineItems} correct placements.`, feedbackType: "error" });
    }
    this._activeTimelineStep = null;
    setTimeout(() => {
      this.root.querySelectorAll(".timeline-step").forEach(el => el.classList.remove("correct", "wrong"));
      this.root.querySelectorAll(".ev-card").forEach(el => el.classList.remove("correct-flash", "wrong-flash"));
    }, 1400);
  }

  _setFeedback(text, type = "") {
    this._lastFeedback = { text, type };
    this._saveWorkspace();
    const el = this.root.querySelector("#lw-feedback");
    if (!el) return;
    el.className = `lw-feedback ${type}`.trim();
    el.textContent = text;
  }

  _restoreActiveTab() {
    const tab = this.currentTab || "connections";
    this.root.querySelectorAll(".lab-btn[data-lw-tab]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lwTab === tab);
    });
    this.root.querySelectorAll(".tab-panel").forEach(p => {
      p.classList.toggle("active", p.id === `lw-panel-${tab}`);
    });
  }

  _openDetail(evId) {
    const item = this.evidence.find(e => e.id === evId);
    if (!item) return;
    const iconHtml = typeof item.icon === 'string' && item.icon.endsWith('.svg')
      ? `<img src="${item.icon}" class="icon-svg" loading="lazy"  alt="">`
      : item.icon || '';
    document.getElementById("lw-modal-title").innerHTML = `${iconHtml} <span>${item.name}</span>`;
    document.getElementById("lw-modal-body").textContent = item.desc || '';
    document.getElementById("lw-modal-detail").innerHTML = `
      <div class="detail-row">
        <strong>Investigator guidance:</strong>
        <span>Use the evidence description, witness testimony, and case context to test your theory.</span>
      </div>
    `;
    document.getElementById("lw-modal-mask").classList.add("open");
  }

  _showResultModal(title, body, detail) {
    this._pendingResultModal = { title, body, detail: detail || "" };
  }

  _flushPendingResultModal() {
    if (!this._pendingResultModal) return;
    const { title, body, detail } = this._pendingResultModal;
    this._pendingResultModal = null;
    const mask = this.root?.querySelector("#lw-result-modal-mask");
    if (!mask) return;
    const titleEl = mask.querySelector("#lw-result-modal-title");
    const bodyEl = mask.querySelector("#lw-result-modal-body");
    const detailEl = mask.querySelector("#lw-result-modal-detail");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    if (detailEl) detailEl.innerHTML = detail || "";
    mask.classList.add("open");
  }
}

const folderInfoData = {
  physical: {
    title: "Physical Evidence",
    desc: "Tangible objects or material traces that can be directly examined.",
    example: "An object, mark, fibre, document, or other material clue from the scene."
  },
  testimonial: {
    title: "Testimonial Evidence",
    desc: "Information given by a witness or another person involved in the case.",
    example: "A spoken account, written statement, recollection, or reported observation."
  },
  analytical: {
    title: "Analytical Evidence",
    desc: "A reasoned interpretation that explains the meaning of other evidence.",
    example: "An expert conclusion, researched connection, or interpretation of a text."
  },
  environmental: {
    title: "Environmental Evidence",
    desc: "Circumstances in the surrounding place or event that help establish what happened.",
    example: "The location, timing, conditions, or pattern of activity around the scene."
  }
};
