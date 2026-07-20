import { getIntroText } from "../js/utils.js";
import { PeopleUI } from "../js/ui/PeopleUI.js";
import { SceneUI } from "../js/ui/SceneUI.js";
import { AccuseUI } from "../js/ui/AccuseUI.js";
import { CodexUI } from "../js/ui/CodexUI.js";
import { Scene2D } from "./Scene2D.js";

/**
 * UIManager orchestrates the 2D interface, handling screen routing,
 * modal interactions, and the rendering of game states to the DOM.
 */
export class UIManager {
  constructor(cm, es, ns, de, ls, a11y, audio, dm, app, labUI) {
    this.cm = cm;
    this.es = es;
    this.ns = ns;
    this.de = de;
    this.ls = ls;
    this.a11y = a11y;
    this.audio = audio;
    this.dm = dm;
    this.app = app;

    this.labUI = labUI;
    this.peopleUI = new PeopleUI(ns, es, a11y, this.onChatAction.bind(this), audio, dm);
    this.sceneUI = new SceneUI(cm, es, a11y, this);
    this.accuseUI = new AccuseUI(cm);
    this.codexUI = new CodexUI(cm, es, a11y, audio);

    this.prevScreen = "map";
    this._scene2DInitialized = false;
    this._tilemapData = null;
    this.discoveredNPCs = new Set();
  }

  showScreen(name) {
    // Delegate screen switching to the mobile app shell
    this.app.showScreen(`screen-${name}`);

    if (name === "map") this.renderMap();
    if (name === "a11y") this.renderA11yToggles();
  }

  switchInvTab(tab) {
    document.querySelectorAll(".inv-tab").forEach(t => {
      t.classList.toggle("active", t.dataset.tab === tab);
      t.setAttribute("aria-selected", t.dataset.tab === tab);
    });
    document.querySelectorAll(".inv-view").forEach(v => v.classList.remove("active"));
    document.getElementById(`inv-${tab}`).classList.add("active");

    if (tab === "lab") { const view = document.getElementById("inv-lab"); if (view) { view.innerHTML = this.labUI.render(); this.labUI.bindEvents(view); } }
    if (tab === "people") { const view = document.getElementById("inv-people"); if (view) { view.innerHTML = this.peopleUI.renderNPCPanel(this.discoveredNPCs); this.peopleUI.bindNPCEvents(view); } }
    if (tab === "codex") { const view = document.getElementById("inv-codex"); if (view) { view.innerHTML = this.codexUI.render(); } }
    if (tab === "scene") { const view = document.getElementById("inv-scene"); if (view && !window.scene2d) { view.innerHTML = this.sceneUI.render(); } }
    if (tab === "accuse") { const view = document.getElementById("inv-accuse"); if (view) { view.innerHTML = this.accuseUI.render(); } }

    this.a11y.announce(`${tab} tab open`);
  }

  goBack() {
    if (this.prevScreen) {
      this.showScreen(this.prevScreen);
    }
  }

  discoverNPC(npcId) {
    if (!this.discoveredNPCs.has(npcId)) {
      this.discoveredNPCs.add(npcId);
    }
  }

  renderPeople() {
    const view = document.getElementById("inv-people");
    if (view) {
      view.innerHTML = this.peopleUI.renderNPCPanel(this.discoveredNPCs);
      this.peopleUI.bindNPCEvents(view);
    }
  }

  renderMap() {
    const mapData = this.ls.getMapData();
    const progress = this.cm.getProgress() || {};
    const total = this.cm.getAllCases().length;
    const solved = Object.values(progress.cases || {}).filter(p => p.solved).length;

    const hdrRank = document.getElementById("hdr-rank");
    if (hdrRank) hdrRank.textContent = progress.rank || "Rookie";

    // Refresh all scores in the UI
    const scoreValEls = document.querySelectorAll('.val-score');
    scoreValEls.forEach(el => el.textContent = progress.totalScore || 0);

    const pct = total ? Math.round((solved / total) * 100) : 0;
    const progressFill = document.getElementById("progress-fill");
    if (progressFill) progressFill.style.width = pct + "%";

    const progressTrack = document.getElementById("progress-track");
    if (progressTrack) progressTrack.setAttribute("aria-valuenow", pct);

    const container = document.getElementById("map-locations");
    if (container) {
      container.innerHTML = mapData.map(loc => {
        const status = !loc.isUnlocked ? "locked" : loc.allSolved ? "solved" : "open";
        const badge = loc.allSolved ? "✅" : loc.isUnlocked ? "🔍" : "🔒";
        const statusText = { locked: "🔒 Locked", open: "🔍 Cases available", solved: "✅ All solved" }[status];
        return `
        <div class="location-card ${status}" role="listitem" tabindex="0" onclick="openLocation('${loc.id}')">
          <div class="location-inner">
            <div class="location-icon" aria-hidden="true">${loc.icon}</div>
            <div class="location-info">
              <div class="location-name">${loc.name}</div>
              <div class="location-region">${loc.region}</div>
              <div class="location-fact">${loc.fact}</div>
              <div class="location-status ${status}">${statusText}</div>
            </div>
          </div>
          <div class="location-badge" aria-hidden="true">${badge}</div>
        </div>`;
      }).join("");
    }
  }

  openLocation(locId) {
    const loc = this.ls.travelTo(locId);
    if (!loc) return;
    this.prevScreen = "map";

    document.getElementById("cases-loc-name").textContent = "🔍 Holy Week";
    const scroll = document.getElementById("cases-scroll");

    scroll.innerHTML = `
      <div class="location-header">
        <div class="location-header-icon" aria-hidden="true">${loc.icon}</div>
        <div>
          <div class="location-header-name">${loc.name}</div>
          <div class="location-header-ambiance">${loc.ambiance}</div>
        </div>
      </div>
      <div class="location-fact-box">📚 ${loc.fact}</div>
      ${this._renderActGroups(locId)}
    `;
    this.showScreen("cases");
  }

  _renderActGroups(locId) {
    const allCases = this.ls.getAllCasesAtLocation(locId);
    const actGroups = {};
    allCases.forEach(c => {
      const act = c.actLabel || "Act I";
      if (!actGroups[act]) actGroups[act] = [];
      actGroups[act].push(c);
    });
    return Object.entries(actGroups).map(([act, actCases]) => `
      <div class="act-section">
        <div class="act-label">${act}</div>
        ${actCases.map(c => {
      const prog = this.cm.getCaseProgress(c.id);
      return `<div class="case-card ${prog?.solved ? 'solved' : ''} ${c.isLocked ? 'locked' : ''}" 
                  onclick="${c.isLocked ? '' : `startCase('${c.id}')`}">
            <div class="case-title">${c.title}</div>
            <div class="case-subtitle">${c.subtitle}</div>
            ${c.eventLocation ? `<div class="case-event-location">📍 ${c.eventLocation}</div>` : ''}
            <span class="case-status-label">${prog?.solved ? `✅ Solved — ${prog.score?.total} pts` : c.isLocked ? "🔒 Locked" : "🔍 Open"}</span>
          </div>`;
    }).join("")}
      </div>`).join("");
  }

   async setupInvestigation(c) {
    // Re-bind callbacks to the specific case context
    this.labUI.onResult = this.onLabAction.bind(this);
    this.peopleUI.onAction = this.onChatAction.bind(this);
    const introText = getIntroText(c.intro) || c.subtitle;

    if (this.dm && this.dm.setActiveCase) this.dm.setActiveCase(c.id);
    this.peopleUI.addSystem(introText);
    document.getElementById("inv-case-title").textContent = c.title;
    document.getElementById("inv-case-sub").textContent = c.subtitle;

    if (!this._scene2DInitialized && !window.scene2d) {
      try {
        await this.init2DScene();
        this._scene2DInitialized = true;
      } catch (e) {
        console.warn('2D scene init failed:', e);
      }
    }

    if (window.scene2d && window.scene2d.loadCase) {
      const caseId = c.id;
      const tileData = this._tilemapData?.cases?.[caseId] || {};
      window.scene2d.loadCase(caseId, tileData);
    }

    this.switchInvTab("scene");
    this.showScreen("investigation");
    this.prevScreen = "cases";
    this.a11y.speak(`Case started: ${c.title}. ${introText}`);
  }

  async init2DScene(container) {
    window.Scene2D = (await import('./Scene2D.js')).Scene2D;
    window.scene2d = new window.Scene2D(this);
    await window.scene2d.init('inv-scene');

    try {
      const res = await fetch('./case_tilemaps.json');
      if (res.ok) {
        this._tilemapData = await res.json();
      }
    } catch (e) {
      console.warn('Failed to load case_tilemaps.json:', e);
    }
  }

  handleNpcInteraction(mode) {
    if (window.scene2d && mode === 'talk') {
      this.switchInvTab('people');
      return;
    }

    const activeNpc = window.sceneNPCs?.find(n => n.data && n.data.id);
    if (activeNpc && this.dm) {
      this.dm.setActiveNPC(activeNpc.data);
      const c = this.cm.getActiveCase();
      const caseId = c?.id || this.cm.activeCaseId || null;
      const loadedStory = this.dm.getStory(activeNpc.data.id, caseId);

      const unlocks = activeNpc.data.unlocksEvidence || [];
      if (unlocks.length > 0 && c) {
        this.cm.unlockEvidenceForScene(c.id, unlocks);
        this.renderLab();
      }

      if (loadedStory) {
        const story = this.dm.createStory(activeNpc.data.id, caseId);
        this.dm.openDialogue(activeNpc.data, story,
          () => {
            this.renderPeople();
          }, (text, type) => this.peopleUI.addMessage(type === 'player' ? 'Investigator' : activeNpc.data.name, text, type, {}, activeNpc.data.id)
        );
      } else {
        this.peopleUI.addMessage(activeNpc.data.name || activeNpc.data.id, "I can tell you about this location.", 'npc', {}, activeNpc.data.id);
        this.renderPeople();
      }
    }
  }

  openNPCChatFromScene(npcId) {
    this.discoverNPC(npcId);
    this.switchInvTab('people');
    this.peopleUI._ensureMessagesForActiveCase();
    const npc = this.ns.getNPC(npcId);
    if (!npc) return;

    const talkBtn = document.querySelector(`[data-action="talk"][data-npc="${npcId}"]`);
    if (talkBtn) talkBtn.click();
  }

  onLabAction(result) {
    if (result.type === "selection") this.renderPeople();
    else result.error ? this.audio.playError() : this.audio.playClue();
    this.switchInvTab('lab');
    if (!result?.error && result?.operation) {
      const view = document.getElementById("inv-lab");
      this.labUI.showActiveResultModal?.(view);
    }
  }

  /**
   * Routes system messages to the appropriate UI feed.
   * @param {string} text 
   * @param {string} tab - Optional hint for where the message originated
   */
  addSystemMessage(text, tab = 'system') {
    if (this.peopleUI) this.peopleUI.addSystem(text);
  }

  showProphecyDetail(prophecyId) {
    // Convert reference to id if needed
    const normalizedId = prophecyId.replace(/\s/, "_").toLowerCase();
    const modal = document.getElementById("evidence-detail-modal");
    const p = this.es.getProphecyById(prophecyId);
    if (!p) return;

    modal.querySelector(".evidence-detail-icon").textContent = p.icon || "🔮";
    modal.querySelector(".evidence-detail-name").textContent = p.reference || "Prophecy";
    modal.querySelector(".evidence-detail-type").textContent = "Prophecy";

    const descEl = modal.querySelector(".evidence-detail-desc");
    descEl.textContent = p.text || "";

    const locationEl = modal.querySelector(".evidence-detail-location");
    if (locationEl) {
      locationEl.textContent = p.location || "";
      locationEl.parentElement.hidden = !p.location;
    }

    const bibleRefEl = modal.querySelector(".evidence-detail-bible-ref");
    const bibleReadMoreBtn = modal.querySelector(".read-more-btn[data-target='bible-verse-content']");
    const bibleVerseContent = modal.querySelector(".verse-content[data-target='bible-verse-content']");

    if (p.bibleRef) {
      bibleRefEl.textContent = p.bibleRef;
      if (bibleReadMoreBtn) {
        bibleReadMoreBtn.hidden = false;
        bibleReadMoreBtn.onclick = () => this.fetchVerseInline(p.bibleRef, bibleVerseContent, bibleReadMoreBtn);
      }
      bibleRefEl.closest(".evidence-detail-section").hidden = false;
    } else {
      bibleRefEl.closest(".evidence-detail-section").hidden = true;
    }

    const prophetLinkEl = modal.querySelector(".evidence-detail-prophetic-link");
    prophetLinkEl.textContent = p.insight || "";
    prophetLinkEl.closest(".evidence-detail-section").hidden = false;

    const investigatorNoteEl = modal.querySelector(".evidence-detail-investigator-note");
    investigatorNoteEl.parentElement.hidden = true;

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("active"));
  }

  renderResult(result) {
    const c = this.cm.getActiveCase();
    document.getElementById("result-content").innerHTML = `
    <div class="container" role="region" aria-label="Case result details">
      <div class="result-card">
        <div class="result-verdict" aria-hidden="true">${result.correct ? "🏆" : "❌"}</div>
        <div class="result-verdict-text ${result.correct ? 'correct' : 'wrong'}" role="heading" aria-level="1">
          ${result.correct ? "Case Solved!" : "Wrong Accusation"}
        </div>
        <div class="result-summary scrollable" aria-label="Case summary">
          <div class="result-truth">
            <strong>The truth:</strong> ${this.a11y.simplify(c.truth.motive)} ${this.a11y.simplify(c.truth.method)}
          </div>
          <div class="result-lesson" aria-label="What you learned">
            📚 ${this.a11y.simplify(c.truth.lesson)}
          </div>
        </div>
        <div class="scroll-hint" aria-hidden="true">
          <i class="fas fa-chevron-down"></i> Scroll Down <i class="fas fa-chevron-down"></i>
        </div>
        <div class="score-grid" aria-label="Your score breakdown">
          <div class="score-item"><div class="score-item-value">${result.score.evidence}</div><div class="score-item-label">Evidence</div></div>
          <div class="score-item"><div class="score-item-value">${result.score.deduction}</div><div class="score-item-label">Deductions</div></div>
          <div class="score-item"><div class="score-item-value">${result.score.challenge || 0}</div><div class="score-item-label">Challenges</div></div>
          <div class="score-item"><div class="score-item-value">${result.score.prophecy || 0}</div><div class="score-item-label">Prophecies</div></div>
          <div class="score-item" style="border: 1px solid var(--gold);"><div class="score-item-value" style="color:var(--green)">+${result.score.perfectBonus || 0}</div><div class="score-item-label">Perfect Bonus</div></div>
          <div class="score-item"><div class="score-item-value">${result.score.accusation > 0 ? '+' : ''}${result.score.accusation}</div><div class="score-item-label">Accusation</div></div>
          <div class="score-item"><div class="score-item-value" style="color:var(--red)">-${result.score.doubtPenalty}</div><div class="score-item-label">Doubt (x2)</div></div>
          <div class="score-item"><div class="score-item-value">${result.score.total}</div><div class="score-item-label">Total</div></div>
        </div>
        <button class="result-continue-btn" onclick="showScreen('map')" aria-label="Continue to world map">Continue →</button>
      </div>
    </div>`;

    const summary = document.querySelector('.result-summary');
    const hint = document.querySelector('.scroll-hint');
    if (summary && hint) {
      const updateScrollHintVisibility = () => {
        if (summary.scrollTop > 0) hint.classList.add('scroll-hint-hidden');
        else hint.classList.remove('scroll-hint-hidden');
      };
      if (summary.scrollHeight > summary.clientHeight) updateScrollHintVisibility();
      else hint.classList.add('scroll-hint-hidden');
      summary.addEventListener('scroll', updateScrollHintVisibility);
    }
  }

  renderA11yToggles() {
    const settings = this.a11y.getAll();
    document.querySelectorAll(".toggle-btn[data-feature]").forEach(btn => {
      const feature = btn.dataset.feature;
      const on = !!settings[feature];

      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-checked", String(on)); // Essential for role="switch"

      if (feature === 'sound') {
        const icon = btn.querySelector('i');
        if (icon) icon.className = on ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
      }

      // Attach the click handler to actually perform the toggle
      btn.onclick = () => {
        const newState = this.a11y.toggle(feature);
        this.renderA11yToggles(); // Refresh this screen's state

        if (feature === 'sound') {
          this.audio.setEnabled(newState);
          // Sync the main navbar sound button icon
          const navBtnIcon = document.querySelector('[onclick="toggleAudio()"] i');
          if (navBtnIcon) navBtnIcon.className = newState ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
        }
      };
    });
  }

  showInstructionsModal(isFirstPlay = false) {
    const logo = document.getElementById("instructions-logo");
    if (logo) logo.style.display = isFirstPlay ? "block" : "none";
    document.getElementById("instructions-modal").classList.add("active");
    if (this.audio) this.audio.playHighStakes();
  }

  closeInstructionsModal() {
    document.getElementById("instructions-modal").classList.remove("active");
  }

  showResetModal() {
    document.getElementById("reset-modal").classList.add("active");
    if (this.audio) this.audio.playHighStakes();
  }

  closeResetModal() {
    document.getElementById("reset-modal").classList.remove("active");
  }

  showGameComplete(score, rank) {
    const modal = document.getElementById("game-complete-modal");
    document.getElementById("final-score-value").textContent = score || 0;
    document.getElementById("final-score-rank").textContent = rank || "Rookie";
    modal.classList.add("active");
    this.a11y.speak(`Game complete! Your final score is ${score || 0} points.`, "assertive");
  }

  closeGameComplete() {
    document.getElementById("game-complete-modal").classList.remove("active");
    this.showScreen("map");
  }

  openEvidenceDetail(evidenceId) {
    const modal = document.getElementById("evidence-detail-modal");
    const e = this.es.getById(evidenceId);
    if (!e) return;
    const typeInfo = this.es.getTypeInfo(e.type);

    modal.querySelector(".evidence-detail-icon").textContent = e.icon;
    modal.querySelector(".evidence-detail-name").textContent = e.name;
    modal.querySelector(".evidence-detail-type").textContent = typeInfo.label || e.type;

    const descEl = modal.querySelector(".evidence-detail-desc");
    descEl.textContent = e.desc || e.description || "";

    const locationEl = modal.querySelector(".evidence-detail-location");
    if (locationEl) {
      locationEl.textContent = e.location || "";
      locationEl.parentElement.hidden = !e.location;
    }

    const bibleRefEl = modal.querySelector(".evidence-detail-bible-ref");
    const bibleReadMoreBtn = modal.querySelector(".read-more-btn[data-target='bible-verse-content']");
    const bibleVerseContent = modal.querySelector(".verse-content[data-target='bible-verse-content']");

    if (e.bibleRef) {
      bibleRefEl.textContent = e.bibleRef;
      if (bibleReadMoreBtn) {
        bibleReadMoreBtn.hidden = false;
        bibleReadMoreBtn.onclick = () => this.fetchVerseInline(e.bibleRef, bibleVerseContent, bibleReadMoreBtn);
      }
      bibleRefEl.closest(".evidence-detail-section").hidden = false;
    } else {
      bibleRefEl.closest(".evidence-detail-section").hidden = true;
    }

    const prophetLinkEl = modal.querySelector(".evidence-detail-prophetic-link");
    const prophetReadMoreBtn = modal.querySelector(".read-more-btn[data-target='prophecy-verse-content']");
    const prophetVerseContent = modal.querySelector(".verse-content[data-target='prophecy-verse-content']");

    if (e.prophecy || e.propheticLink) {
      prophetLinkEl.textContent = e.prophecy || e.propheticLink || "";
      if (prophetReadMoreBtn && e.relatedProphecy) {
        const prophecy = this.es.getProphecyById(e.relatedProphecy);

        // THIS IS THE FIX: Set the data-ref attribute on the button
        if (prophetReadMoreBtn && e.relatedProphecy) {
            prophetReadMoreBtn.dataset.ref = e.relatedProphecy;
        }

        if (prophecy) {
          prophetReadMoreBtn.hidden = false;
          prophetReadMoreBtn.onclick = () => this.fetchVerseInline(prophecy.reference, prophetVerseContent, prophetReadMoreBtn);
        }
      }
      prophetLinkEl.closest(".evidence-detail-section").hidden = false;
    } else {
      prophetLinkEl.closest(".evidence-detail-section").hidden = true;
    }

    const investigatorNoteEl = modal.querySelector(".evidence-detail-investigator-note");
    if (investigatorNoteEl) {
      investigatorNoteEl.textContent = e.investigatorNote || e.investigator_note || "";
      investigatorNoteEl.parentElement.hidden = !(e.investigatorNote || e.investigator_note);
    }

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("active"));
  }

  closeEvidenceDetail() {
    const modal = document.getElementById("evidence-detail-modal");
    modal.classList.remove("active");
    setTimeout(() => { modal.hidden = true; }, 200);
  }

  async fetchVerseInline(refString, targetEl, btnEl) {
    targetEl.innerHTML = `⏳ Loading…`;
    targetEl.hidden = false;
    try {
      const parts = refString.match(/([A-Za-z]+)\s(\d+):(\d+)/);
      if (!parts) throw new Error('Could not parse reference');
      const apiRef = `${parts[1].toLowerCase()}+${parts[2]}:${parts[3]}`;
      const r = await fetch(`https://bible-api.com/${apiRef}?translation=web`);
      const j = await r.json();
      targetEl.innerHTML = `<div class="verse-ref">${j.reference}</div><div>${j.verses[0].text}</div>`;
      this.audio.playClue();
    } catch (err) {
      targetEl.innerHTML = `Could not load verse.`;
    }
  }

  onChatAction(result) {
    this.switchInvTab('people');
    if (result?.type === "talk_complete") { this.switchInvTab('scene'); }
  }
}
