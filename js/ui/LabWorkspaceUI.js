import { OPERATIONS } from "../gameplay/deductionEngine.js";

export class LabWorkspaceUI {
  constructor(deductionEngine, evidenceSystem, accessibility, onResult) {
    this.de = deductionEngine;
    this.es = evidenceSystem;
    this.a11y = accessibility;
    this.onResult = onResult;
    
    // Track current tab for info buttons
    this.currentTab = "compare";
    this.selectedCardId = null;
  }

  render() {
    return `
      <div id="lab-workspace" role="region" aria-label="Lab Workspace">

        <div>

          <h3 class="section-title">Deduction Lab</h3>
          <div class="prophecy-lab-intro">
            <span>Gain points by correctly analyzing evidence.</span>
          </div>

          <div class="lab-actions" role="group" aria-label="Analysis operations">
            <button class="lab-btn active" data-lw-tab="compare" aria-label="Compare: Are these consistent?">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-magnifying-glass"></i></span>
              <span class="lab-btn-label">Compare</span>
            </button>
            <button class="lab-btn" data-lw-tab="link" aria-label="Link: Do they point to the same conclusion?">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-link"></i></span>
              <span class="lab-btn-label">Link</span>
            </button>
            <button class="lab-btn" data-lw-tab="timeline" aria-label="Timeline: What happened first?">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-clock"></i></span>
              <span class="lab-btn-label">Timeline</span>
            </button>
            <button class="lab-btn" data-lw-tab="contradict" aria-label="Contradict: Do these conflict?">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-bolt"></i></span>
              <span class="lab-btn-label">Contradict</span>
            </button>
          </div>

          <div id="lw-feedback" class="lw-feedback" role="status" aria-live="polite"></div>

          <div id="lw-panel-compare" class="tab-panel active" role="tabpanel" aria-label="Comparator">
            <div class="comparator-stage">
              <div class="comparator-slots">
                <div class="comparator-slot" id="lw-comp-slot-0">
                  <div class="slot-label" aria-hidden="true"><span class="sr-only">Slot A</span></div>
                  <div id="lw-comp-card-0"><span class="slot-label">Slot A</span></div>
                </div>
                <div class="comparator-slot" id="lw-comp-slot-1">
                  <div class="slot-label" aria-hidden="true"><span class="sr-only">Slot B</span></div>
                  <div id="lw-comp-card-1"><span class="slot-label">Slot B</span></div>
                </div>
              </div>
            </div>
            <p style="font-size:0.72rem; color: var(--text-muted); margin-bottom:6px;">Tap to add, or use buttons:</p>
            <div class="actions-bar">
              <button class="btn-secondary" id="lw-comp-clear">Clear</button>
              <button class="btn-submit" id="lw-comp-test">Compare</button>
            </div>
            <div class="card-pool-grid" id="lw-comp-bank"></div>
           
          </div>

          <div id="lw-panel-link" class="tab-panel" role="tabpanel" aria-label="Evidence folders">
            <div class="folder-grid" id="lw-folder-grid"></div>
            <p style="font-size:0.72rem; color: var(--text-muted); margin-bottom:6px;">Unfiled items:</p>
             <div class="actions-bar">
              <button class="btn-submit" id="lw-folder-submit">Verify Folders</button>
            </div>
            <div class="card-pool-grid" id="lw-folder-bank"></div>
           
          </div>

          <div id="lw-panel-timeline" class="tab-panel" role="tabpanel" aria-label="Timeline">
            <div class="timeline-vertical-box" id="lw-timeline-steps"></div>
            <p style="font-size:0.72rem; color: var(--text-muted); margin-bottom:6px;">Unassigned items:</p>
            <div class="actions-bar">
              <button class="btn-secondary" id="lw-timeline-clear">Clear</button>
              <button class="btn-submit" id="lw-timeline-test">Verify Chronology</button>
            </div>
            <div class="card-pool-grid" id="lw-timeline-bank"></div>
            
          </div>

          <div id="lw-panel-contradict" class="tab-panel" role="tabpanel" aria-label="Shredder">
            <div class="desk-stage">
              <div class="desk-station" id="lw-candle">
                <div class="station-emoji"><img src="../assets/gfx/flame-duotone.svg" class="icon-svg" loading="lazy" style="width:24px;height:24px;" alt=""></div>
                <div class="station-title">Candlelight Inspector</div>
                <div class="candle-viewer" id="lw-candle-viewer"></div>
              </div>
              <div class="desk-station" id="lw-shredder">
                <div class="station-emoji"><img src="../assets/gfx/scissors-duotone.svg" class="icon-svg" loading="lazy" style="width:24px;height:24px;" alt=""></div>
                <div class="station-title" style="color:var(--red)">Shredder Bin</div>
                <span style="font-size:0.68rem; color:#fca5a5; margin-top:2px;">Drag fake evidence here.</span>
              </div>
            </div>
            <p style="font-size:0.72rem; color: var(--text-muted); margin-bottom:4px;">Active items:</p>
            <div class="actions-bar">
              <button class="btn-submit" id="lw-shredder-submit">Verify Shredded</button>
            </div>
            <div class="card-pool-grid" id="lw-desk-bank"></div>
            <p style="font-size:0.72rem; color:var(--red); margin-bottom:4px;">Shredded bin (tap to restore):</p>
            <div class="trash-archive-box card-pool-grid" id="lw-shredded-bank"></div>
            
          </div>

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
        </div>
      </div>`;
  }

  bindEvents(container) {
    this.root = container.querySelector("#lab-workspace");
    if (!this.root) return;

    this._initState();
    this._setFeedback("Tap items or use buttons to complete each task.");
    this._renderBanks();

    this.root.querySelectorAll(".lab-btn[data-lw-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.root.querySelectorAll(".lab-btn[data-lw-tab]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const tab = btn.dataset.lwTab;
        this.root.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
        const panel = this.root.querySelector(`#lw-panel-${tab}`);
        if (panel) panel.classList.add("active");
        // Update current tab for info buttons
        this.currentTab = tab;
      });
    });

    this.root.querySelector("#lw-comp-clear")?.addEventListener("click", () => this._clearComparator());
    this.root.querySelector("#lw-comp-test")?.addEventListener("click", () => this._testComparator());
    this.root.querySelector("#lw-folder-submit")?.addEventListener("click", () => this._submitFolders());
    this.root.querySelector("#lw-timeline-clear")?.addEventListener("click", () => this._clearTimeline());
    this.root.querySelector("#lw-timeline-test")?.addEventListener("click", () => this._testTimeline());
    this.root.querySelector("#lw-shredder-submit")?.addEventListener("click", () => this._submitShredder());

    if (!container.dataset.lwBound) {
      container.dataset.lwBound = "1";
      container.addEventListener("click", (e) => {
        const slot = e.target.closest(".comparator-slot");
        if (slot && !e.target.closest(".ev-card, .ev-info-btn")) {
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
        
        const folder = e.target.closest(".folder-tray");
        if (folder && !e.target.closest(".ev-card, .ev-info-btn, [data-folder-info]")) {
          this._activeFolderKey = folder.dataset.folder;
          this._setFeedback(`Tap an item to file into ${folderInfoData[this._activeFolderKey]?.title || this._activeFolderKey}.`, "success");
          return;
        }
        
        const step = e.target.closest(".timeline-step");
        if (step && !e.target.closest(".ev-card, .ev-info-btn")) {
          this._activeTimelineStep = parseInt(step.dataset.step, 10);
          this._setFeedback(`Tap an item to place into step ${this._activeTimelineStep}.`, "success");
          return;
        }
        
        const deskStation = e.target.closest(".desk-station");
        if (deskStation && !e.target.closest(".ev-card, .ev-info-btn")) {
          if (deskStation.id === "lw-candle") this._activeDeskStation = "candle";
          if (deskStation.id === "lw-shredder") this._activeDeskStation = "shredder";
          this._setFeedback(this._activeDeskStation === "candle" ? "Tap item to inspect under candlelight." : "Tap item to shred.");
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
          if (this._activeComparatorSlotIndex !== null) {
            this.compareSlots[this._activeComparatorSlotIndex] = item;
            this._activeComparatorSlotIndex = null;
            this._renderComparatorSlots();
            this._renderComparatorBank();
            this._setFeedback(`Placed ${item.name} in comparison.`, "success");
          } else if (this._activeFolderKey) {
            if (!this.folderState[this._activeFolderKey]) this.folderState[this._activeFolderKey] = [];
            if (!this.folderState[this._activeFolderKey].includes(id)) {
              this.folderState[this._activeFolderKey].push(id);
              this._renderFolderContents();
              this._setFeedback(`Filed ${item.name}.`, "success");
            } else {
              this.folderState[this._activeFolderKey] = this.folderState[this._activeFolderKey].filter(i => i !== id);
              this._renderFolderContents();
              this._setFeedback(`Unfiled ${item.name}.`, "success");
            }
          } else if (this._activeTimelineStep) {
            const step = this._activeTimelineStep;
            if (!this.timelineSlots[step]) this.timelineSlots[step] = [];
            const idx = this.timelineSlots[step].indexOf(id);
            if (idx >= 0) {
              this.timelineSlots[step].splice(idx, 1);
            } else {
              const max = step === 3 ? 2 : 1;
              if (this.timelineSlots[step].length < max) {
                this.timelineSlots[step].push(id);
              } else {
                this._setFeedback(`Step ${step} is full.`, "error");
                this._activeTimelineStep = null;
                return;
              }
            }
            this._activeTimelineStep = null;
            this._renderTimelineSteps();
            this._renderTimelineBank();
          } else if (this._activeDeskStation === "candle") {
            this.candleItem = item;
            this._activeDeskStation = null;
            this._renderCandleViewer();
            this._renderDeskBank();
          } else if (this._activeDeskStation === "shredder") {
            this.deskItems = this.deskItems.filter(i => i.id !== id);
            if (!this.shreddedItems.find(i => i.id === id)) this.shreddedItems.push(item);
            this._renderDeskBank();
            this._renderShreddedBank();
            this._setFeedback(`Shredded ${item.name}.`, "success");
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
      });

      container.addEventListener("dragend", (e) => {
        const card = e.target.closest(".ev-card");
        if (card) card.classList.remove('dragging');
        this.root.querySelectorAll('.drop-hover').forEach(el => el.classList.remove('drop-hover'));
      });

      container.addEventListener("dragover", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step, .desk-station");
        if (dropZone) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }
      });

      container.addEventListener("dragenter", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step, .desk-station");
        if (dropZone) {
          e.preventDefault();
          dropZone.classList.add('drop-hover');
        }
      });

      container.addEventListener("dragleave", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step, .desk-station");
        if (dropZone && !dropZone.contains(e.relatedTarget)) {
          dropZone.classList.remove('drop-hover');
        }
      });

      container.addEventListener("drop", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step, .desk-station");
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
          if (!this.folderState[key]) this.folderState[key] = [];
          const idx = this.folderState[key].indexOf(id);
          if (idx >= 0) {
            this.folderState[key].splice(idx, 1);
          } else {
            this.folderState[key].push(id);
          }
          this._renderFolderContents();
          this._setFeedback(`Filed item.`, "success");
        } else if (dropZone.classList.contains('timeline-step')) {
          const step = parseInt(dropZone.dataset.step, 10);
          if (!this.timelineSlots[step]) this.timelineSlots[step] = [];
          const idx = this.timelineSlots[step].indexOf(id);
          if (idx >= 0) {
            this.timelineSlots[step].splice(idx, 1);
          } else {
            const max = step === 3 ? 2 : 1;
            if (this.timelineSlots[step].length < max) {
              this.timelineSlots[step].push(id);
            } else {
              this._setFeedback(`Step ${step} is full.`, "error");
              return;
            }
          }
          this._renderTimelineSteps();
          this._renderTimelineBank();
        } else if (dropZone.id === 'lw-candle') {
          this.candleItem = this.evidence.find(i => i.id === id);
          this._renderCandleViewer();
          this._renderDeskBank();
        } else if (dropZone.id === 'lw-shredder') {
          this.deskItems = this.deskItems.filter(i => i.id !== id);
          if (!this.shreddedItems.find(i => i.id === id)) {
            this.shreddedItems.push(this.evidence.find(i => i.id === id));
          }
          this._renderDeskBank();
          this._renderShreddedBank();
          this._setFeedback(`Shredded item.`, "success");
        }
      });
    }
  }

  _initState() {
    this.score = 0;
    const pool = this.es.getEvidencePool?.() || [];
    const typeMap = { physical: 'physical', testimonial: 'testimonial', analytical: 'direct', environmental: 'circumstantial' };
    const categoryMap = { people: 'testimonial', event: 'circumstantial', prophecy: 'direct' };
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
    this.deskItems = this.evidence.map(e => ({ ...e }));
    this.shreddedItems = [];
    this.candleItem = null;
    this.activeTab = "compare";
    this._activeComparatorSlotIndex = null;
    this._activeFolderKey = null;
    this._activeTimelineStep = null;
    this._activeDeskStation = null;
    this.selectedCardId = null;
  }

  _renderBanks() {
    this._renderComparatorBank();
    this._renderFolderGrid();
    this._renderFolderContents();
    this._renderTimelineSteps();
    this._renderTimelineBank();
    this._renderDeskBank();
    this._renderShreddedBank();
  }

  _renderComparatorBank() {
    const bank = this.root.querySelector("#lw-comp-bank");
    if (!bank) return;
    bank.innerHTML = this.evidence.map(item => {
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
    for (let i = 0; i < 2; i++) {
      const slot = this.root.querySelector(`#lw-comp-card-${i}`);
      const container = this.root.querySelector(`#lw-comp-slot-${i}`);
      if (!slot || !container) continue;
      const item = this.compareSlots[i];
      if (item) {
        slot.innerHTML = this._cardHTML(item, "selected");
        container.classList.add("filled");
      } else {
        slot.innerHTML = `<span style="font-size:0.72rem; color:var(--text-dim);">Empty</span>`;
        container.classList.remove("filled");
      }
    }
  }

  _renderFolderGrid() {
    const grid = this.root.querySelector("#lw-folder-grid");
    if (!grid) return;
    const cats = [...new Set(this.evidence.map(e => e.category))];
    const folderTitles = { direct: 'Direct Evidence', circumstantial: 'Circumstantial Evidence', physical: 'Physical (Real) Evidence', testimonial: 'Testimonial & Expert Evidence' };
    const folders = cats.map(c => ({ key: c, title: folderTitles[c] || c.charAt(0).toUpperCase() + c.slice(1) + ' Evidence' }));
    grid.innerHTML = folders.map(f => `
      <div class="folder-tray" data-folder="${f.key}">
        <div class="folder-header">
          <span class="folder-header-title">${f.title}</span>
          <button class="ev-info-btn" data-folder-info="${f.key}">ⓘ</button>
        </div>
        <div class="folder-content" id="lw-folder-${f.key}"></div>
      </div>
    `).join("");

    grid.querySelectorAll("[data-folder-info]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const key = btn.dataset.folderInfo;
        const info = folderInfoData[key];
        if (!info) return;
        document.getElementById("lw-modal-title").textContent = info.title;
        document.getElementById("lw-modal-body").textContent = info.desc;
        document.getElementById("lw-modal-detail").innerHTML = "";
        document.getElementById("lw-modal-mask").classList.add("open");
      });
    });
  }

  _renderFolderContents() {
    for (const key of ['direct', 'circumstantial', 'physical', 'testimonial']) {
      const el = this.root.querySelector(`#lw-folder-${key}`);
      if (!el) continue;
      const ids = this.folderState[key] || [];
      const items = ids.map(id => this.evidence.find(e => e.id === id)).filter(Boolean);
      if (items.length === 0) {
        el.innerHTML = `<span style="font-size:0.72rem; color:var(--text-dim);">Empty</span>`;
      } else {
        el.innerHTML = items.map(i => this._cardHTML(i, "selected")).join("");
      }
    }
    const bank = this.root.querySelector("#lw-folder-bank");
    if (bank) {
      const filed = new Set(Object.values(this.folderState).flat());
      const unfiled = this.evidence.filter(e => !filed.has(e.id));
      bank.innerHTML = unfiled.length ? unfiled.map(i => this._cardHTML(i)).join("") : `<span style="font-size:0.72rem; color:var(--text-dim);">All items filed</span>`;
    }
  }

  _renderTimelineSteps() {
    const stepsEl = this.root.querySelector("#lw-timeline-steps");
    if (!stepsEl) return;
    const orders = [...new Set(this.evidence.filter(e => e.timelineOrder != null).map(e => e.timelineOrder))].sort((a, b) => a - b);
    const steps = orders.map((num, idx) => {
      const count = this.evidence.filter(e => e.timelineOrder === num).length;
      return { num, title: `Step ${num}`, hint: `${count} item${count !== 1 ? 's' : ''}` };
    });
    stepsEl.innerHTML = steps.map(s => {
      const ids = this.timelineSlots[s.num] || [];
      const filled = ids.length > 0 ? "filled" : "";
      const itemsHtml = ids.map(id => {
        const item = this.evidence.find(e => e.id === id);
        return item ? this._cardHTML(item, "selected") : "";
      }).join("");
      return `
        <div class="timeline-step ${filled}" data-step="${s.num}">
          <div class="step-header">
            <span class="step-title">${s.title}</span>
            <span class="step-hint">${s.hint}</span>
          </div>
          <div class="step-cards-container" id="lw-timeline-step-${s.num}">
            ${itemsHtml || `<span style="font-size:0.72rem; color:var(--text-dim);">Tap item then here</span>`}
          </div>
        </div>
      `;
    }).join("");
  }

  _renderTimelineBank() {
    const bank = this.root.querySelector("#lw-timeline-bank");
    if (!bank) return;
    const assigned = new Set(Object.values(this.timelineSlots).flat());
    const unassigned = this.evidence.filter(e => !assigned.has(e.id));
    bank.innerHTML = unassigned.length ? unassigned.map(i => this._cardHTML(i)).join("") : `<span style="font-size:0.72rem; color:var(--text-dim);">All placed</span>`;
  }

  _renderDeskBank() {
    const bank = this.root.querySelector("#lw-desk-bank");
    if (!bank) return;
    bank.innerHTML = this.deskItems.length ? this.deskItems.map(i => this._cardHTML(i, "selected")).join("") : `<span style="font-size:0.72rem; color:var(--text-dim);">All processed</span>`;
  }

  _renderCandleViewer() {
    const viewer = this.root.querySelector("#lw-candle-viewer");
    if (!viewer) return;
    if (!this.candleItem) {
      viewer.innerHTML = `<span style="font-size:0.68rem; color:var(--text-dim);">Drag/tap item here.</span>`;
      return;
    }
    viewer.innerHTML = this._cardHTML(this.candleItem, "selected");
    const card = viewer.querySelector(".ev-card");
    if (this.candleItem.fake) {
      card?.classList.add("wrong-flash");
      this._setFeedback(`Warning: ${this.candleItem.name} looks forged under light.`, "error");
    } else {
      card?.classList.add("correct-flash");
      this._setFeedback(`${this.candleItem.name} appears genuine.`, "success");
    }
  }

  _renderShreddedBank() {
    const bank = this.root.querySelector("#lw-shredded-bank");
    if (!bank) return;
    bank.innerHTML = this.shreddedItems.length ? this.shreddedItems.map(i => this._cardHTML(i, "selected")).join("") : `<span style="font-size:0.68rem; color:#fca5a5; pointer-events:none;">Empty</span>`;
  }

  _cardHTML(item, extraClass = "", badge = null) {
    const iconHtml = typeof item.icon === 'string' && item.icon.endsWith('.svg')
      ? `<img src="${item.icon}" class="icon-svg" loading="lazy" style="width:24px;height:24px;" alt="">`
      : item.icon;
    const badgeHtml = badge ? `<span class="sel-badge sel-badge-${badge.toLowerCase()}" aria-hidden="true">${badge}</span>` : '';
    return `<div class="ev-card ${extraClass}" data-evidence-id="${item.id}" draggable="true"><span class="card-icon">${iconHtml}</span><span class="card-name">${item.name}</span>${badgeHtml}<button class="ev-info-btn" data-evidence-id="${item.id}">ⓘ</button></div>`;
  }

  _clearComparator() {
    this.compareSlots = [null, null];
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
    const clueA = (a.clues?.compare || "").toLowerCase();
    const clueB = (b.clues?.compare || "").toLowerCase();
    const match = clueA && clueB && (clueA.includes(b.name.toLowerCase()) || clueB.includes(a.name.toLowerCase()));
    slot0?.classList.add(match ? "correct" : "wrong");
    slot1?.classList.add(match ? "correct" : "wrong");
    card0?.classList.add(match ? "correct-flash" : "wrong-flash");
    card1?.classList.add(match ? "correct-flash" : "wrong-flash");
    if (match) {
      this._setFeedback(`Match confirmed: ${a.name} & ${b.name}`, "success");
      this.onResult?.({ scoreDelta: 5 });
    } else {
      this._setFeedback("These do not match.", "error");
      this.onResult?.({ scoreDelta: -3 });
    }
    setTimeout(() => { 
      slot0?.classList.remove("correct", "wrong"); 
      slot1?.classList.remove("correct", "wrong"); 
      card0?.classList.remove("correct-flash", "wrong-flash");
      card1?.classList.remove("correct-flash", "wrong-flash");
    }, 1400);
  }

  _submitFolders() {
    const expected = {};
    this.evidence.forEach(e => {
      if (!e.timelineOrder && !e.fake) {
        expected[e.category] = (expected[e.category] || 0) + 1;
      }
    });
    let allOk = true;
    let totalCorrect = 0;
    let totalItems = 0;
    for (const key of Object.keys(expected)) {
      const ids = this.folderState[key] || [];
      const count = ids.length;
      totalItems += count;
      if (count < expected[key]) {
        allOk = false;
        this._setFeedback(`Folder ${folderInfoData[key]?.title || key} has ${count}/${expected[key]}.`, "error");
      }
      // Check correctness
      ids.forEach(id => {
        const item = this.evidence.find(e => e.id === id);
        const folderEl = this.root.querySelector(`#lw-folder-${key}`);
        const card = folderEl?.querySelector(`.ev-card[data-evidence-id="${id}"]`);
        if (item && card) {
          totalCorrect++;
          if (item.category === key) {
            card.classList.add("correct-flash");
          } else {
            card.classList.add("wrong-flash");
            allOk = false;
          }
        }
      });
    }
    const bank = this.root.querySelector("#lw-folder-bank");
    bank?.querySelectorAll(".ev-card").forEach(card => card.classList.add("wrong-flash"));
    
    if (allOk && totalItems === this.evidence.length) {
      this._setFeedback("Evidence folders verified.", "success");
      this.onResult?.({ scoreDelta: 5 });
    } else {
      this._setFeedback("Some items are misfiled.", "error");
      this.onResult?.({ scoreDelta: -3 });
    }
    setTimeout(() => {
      this.root.querySelectorAll(".ev-card").forEach(el => el.classList.remove("correct-flash", "wrong-flash"));
    }, 1400);
  }

  _clearTimeline() {
    this.timelineSlots = { 1: [], 2: [], 3: [], 4: [] };
    this._renderTimelineSteps();
    this._renderTimelineBank();
    this._setFeedback("Timeline cleared.");
  }

  _testTimeline() {
    let correct = 0;
    Object.entries(this.timelineSlots).forEach(([step, ids]) => {
      const stepEl = this.root.querySelector(`#lw-timeline-step-${step}`);
      if (!stepEl) return;
      const allCorrect = ids.every(id => {
        const item = this.evidence.find(e => e.id === id);
        if (item && item.timelineOrder === parseInt(step, 10)) {
          correct++;
          return true;
        }
        return false;
      });
      stepEl.classList.add(allCorrect ? "correct" : "wrong");
      // Add feedback to cards
      ids.forEach(id => {
        const card = stepEl.querySelector(`.ev-card[data-evidence-id="${id}"]`);
        const item = this.evidence.find(e => e.id === id);
        if (card && item) {
          const isCorrect = item.timelineOrder === parseInt(step, 10);
          card.classList.add(isCorrect ? "correct-flash" : "wrong-flash");
        }
      });
    });
    const totalTimelineItems = this.evidence.filter(e => e.timelineOrder != null).length;
    if (correct === totalTimelineItems) {
      this._setFeedback("Timeline is correct.", "success");
      this.onResult?.({ scoreDelta: 5 });
    } else {
      this._setFeedback(`Timeline has ${correct}/${totalTimelineItems} correct placements.`, "error");
      this.onResult?.({ scoreDelta: -3 });
    }
    setTimeout(() => {
      this.root.querySelectorAll(".timeline-step").forEach(el => el.classList.remove("correct", "wrong"));
      this.root.querySelectorAll(".ev-card").forEach(el => el.classList.remove("correct-flash", "wrong-flash"));
    }, 1400);
  }

  _submitShredder() {
    const totalFakes = this.evidence.filter(i => i.fake).length;
    const fakes = this.shreddedItems.filter(i => i.fake).length;
    const shreddedBank = this.root.querySelector("#lw-shredded-bank");
    const deskBank = this.root.querySelector("#lw-desk-bank");
    
    if (totalFakes === 0 || fakes >= totalFakes) {
      shreddedBank?.querySelectorAll(".ev-card").forEach(card => card.classList.add("correct-flash"));
      deskBank?.querySelectorAll(".ev-card").forEach(card => card.classList.add("wrong-flash"));
      this._setFeedback(`Shredder verified: ${fakes} fake items removed.`, "success");
      this.onResult?.({ scoreDelta: 5 });
    } else {
      shreddedBank?.querySelectorAll(".ev-card").forEach(card => card.classList.add("wrong-flash"));
      this._setFeedback(`Only ${fakes} fake items shredded. Need ${totalFakes}.`, "error");
      this.onResult?.({ scoreDelta: -3 });
    }
    setTimeout(() => {
      this.root.querySelectorAll(".ev-card").forEach(el => el.classList.remove("correct-flash", "wrong-flash"));
    }, 1400);
  }

  _setFeedback(text, type = "") {
    const el = this.root.querySelector("#lw-feedback");
    if (!el) return;
    el.className = `lw-feedback ${type}`.trim();
    el.textContent = text;
  }

  _openDetail(evId) {
    this.onResult?.({ scoreDelta: -1 });
    const item = this.evidence.find(e => e.id === evId);
    if (!item) return;
    const iconHtml = typeof item.icon === 'string' && item.icon.endsWith('.svg')
      ? `<img src="${item.icon}" class="icon-svg" loading="lazy" style="width:24px;height:24px;" alt="">`
      : item.icon || '';
    document.getElementById("lw-modal-title").innerHTML = `${iconHtml} <span>${item.name}</span>`;
    document.getElementById("lw-modal-body").textContent = item.desc || '';
    const clue = item.clues?.[this.currentTab] || "No hint available.";
    document.getElementById("lw-modal-detail").innerHTML = `
      <div class="detail-row">
        <strong>${this.currentTab.toUpperCase()} HINT:</strong>
        <span>${clue}</span>
      </div>
    `;
    document.getElementById("lw-modal-mask").classList.add("open");
  }
}

const folderInfoData = {
  direct: { title: "Direct Evidence", desc: "Proves a fact directly." },
  circumstantial: { title: "Circumstantial Evidence", desc: "Implies a fact through circumstances." },
  physical: { title: "Physical (Real) Evidence", desc: "Tangible objects like weapons, DNA, or fibres." },
  testimonial: { title: "Testimonial & Expert Evidence", desc: "Spoken statements from witnesses or specialists." }
};