import { LabUI } from "./labUI.js";
import { ChatUI } from "./chatUI.js";

/**
 * UIManager orchestrates the 2D interface, handling screen routing,
 * modal interactions, and the rendering of game states to the DOM.
 */
export class UIManager {
  constructor(cm, es, ns, de, ls, a11y, audio, dm) {
    this.cm = cm;
    this.es = es;
    this.ns = ns;
    this.de = de;
    this.ls = ls;
    this.a11y = a11y;
    this.audio = audio;
    this.dm = dm;

    this.labUI = null;
    this.chatUI = null;
    this.prevScreen = "map";
  }

  showScreen(name) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    const target = document.getElementById(`screen-${name}`);
    if (target) target.classList.add("active");
    
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

    if (tab === "lab") this.renderLab();
    if (tab === "people") this.renderPeople();
    if (tab === "accuse") this.renderAccuse();
    if (tab === "scene") this.renderScene();

    this.a11y.announce(`${tab} tab open`);
  }

  renderMap() {
    const mapData = this.ls.getMapData();
    const progress = this.cm.getProgress();
    const total = this.cm.getAllCases().length;
    const solved = Object.values(progress.cases).filter(p => p.solved).length;

    document.getElementById("hdr-rank").textContent = progress.rank || "Rookie";
    
    // Refresh all scores in the UI
    const scoreEls = document.querySelectorAll('.header-score');
    scoreEls.forEach(el => el.textContent = `${progress.totalScore || 0} pts`);

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

    document.getElementById("cases-loc-name").textContent = `${loc.icon} ${loc.name}`;
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
            <span class="case-status-label">${prog?.solved ? `✅ Solved — ${prog.score?.total} pts` : c.isLocked ? "🔒 Locked" : "🔍 Open"}</span>
          </div>`;
        }).join("")}
      </div>`).join("");
  }

  setupInvestigation(c) {
    this.labUI = new LabUI(this.de, this.es, this.a11y, this.onLabAction.bind(this));
    this.chatUI = new ChatUI(this.ns, this.es, this.a11y, this.onChatAction.bind(this), this.audio, this.dm);

    this.chatUI.addSystem(c.intro);
    document.getElementById("inv-case-title").textContent = c.title;
    document.getElementById("inv-case-sub").textContent = c.subtitle;

    this.switchInvTab("scene");
    this.showScreen("investigation");
    this.prevScreen = "cases";
    this.a11y.speak(`Case started: ${c.title}. ${c.intro}`);
  }

  renderScene() {
    const c = this.cm.getActiveCase();
    const container = document.getElementById("inv-scene");
    if (!c || !container) return;
    container.innerHTML = `
      <p class="scene-intro">${this.a11y.simplify(c.intro || c.subtitle)}</p>
      <div class="evidence-grid">
        ${c.evidencePool.map(e => {
          const col = this.es.collected.includes(e.id);
          return `<div class="evidence-card ${col ? 'collected' : 'locked'}" 
                   onclick="${col ? `openEvidenceDetail('${e.id}')` : ''}">
            <div class="evidence-card-icon">${e.icon}</div>
            <div class="evidence-card-name">${e.name}</div>
          </div>`;
        }).join("")}
      </div>`;
  }

  renderLab() {
    const view = document.getElementById("inv-lab");
    if (view) { view.innerHTML = this.labUI.render(); this.labUI.bindEvents(view); }
  }

  onLabAction(result) {
    if (result.type === "selection") this.renderPeople();
    else result.error ? this.audio.playError() : this.audio.playClue();
    this.renderLab();
  }

  renderPeople() {
    const npcPanel = document.getElementById("npc-panel");
    if (npcPanel) { npcPanel.innerHTML = this.chatUI.renderNPCPanel(); this.chatUI.bindNPCEvents(npcPanel); }
  }

  onChatAction(result) {
    this.renderPeople();
    if (result?.type === "talk_complete" && result.unlocked > 0) { this.renderScene(); this.renderLab(); }
  }

  renderAccuse() {
    const c = this.cm.getActiveCase();
    const view = document.getElementById("inv-accuse");
    if (!c || !view) return;
    const prog = this.cm.getCaseProgress(c.id);
    view.innerHTML = `<div class="accuse-panel">
      <div class="suspect-list">
        ${c.suspects.map(s => {
          const isLocked = !(prog?.discoveredSuspects || []).includes(s.id);
          return `<button class="suspect-btn ${isLocked ? 'locked' : ''}" ${isLocked ? 'disabled' : ''} onclick="accuse('${s.id}')">
            <span class="suspect-btn-avatar">${s.avatar}</span>
            <div class="suspect-btn-info"><div class="suspect-btn-name">${s.name}</div></div>
            ${isLocked ? '🔒' : '→'}
          </button>`;
        }).join("")}
      </div>
    </div>`;
  }

  renderResult(result) {
    const c = this.cm.getActiveCase();
    document.getElementById("result-content").innerHTML = `
      <div class="result-card">
        <div class="result-verdict">${result.correct ? "🏆" : "❌"}</div>
        <div class="result-summary scrollable">
          <div class="result-truth"><strong>The truth:</strong> ${this.a11y.simplify(c.truth.motive)}</div>
          <div class="result-lesson">📚 ${this.a11y.simplify(c.truth.lesson)}</div>
        </div>
        <div class="score-grid">
           <div class="score-item"><div class="score-item-value">${result.score.total}</div><div class="score-item-label">Total Score</div></div>
        </div>
        <button class="result-continue-btn" onclick="showScreen('map')">Continue →</button>
      </div>`;
  }

  renderA11yToggles() {
    const settings = this.a11y.getAll();
    document.querySelectorAll(".toggle-btn[data-feature]").forEach(btn => {
      const on = !!settings[btn.dataset.feature];
      btn.setAttribute("aria-pressed", String(on));
      if (btn.dataset.feature === 'sound') {
        const icon = btn.querySelector('i');
        if (icon) icon.className = on ? 'fas fa-volume-up' : 'fas fa-volume-mute';
      }
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
    modal.querySelector(".evidence-detail-desc").textContent = e.desc || e.description;
    
    const bibleRefEl = modal.querySelector(".evidence-detail-bible-ref");
    const bibleReadMoreBtn = modal.querySelector(".read-more-btn");
    const bibleVerseContent = modal.querySelector(".verse-content");

    if (e.bibleRef) {
      bibleRefEl.textContent = e.bibleRef;
      bibleReadMoreBtn.onclick = () => this.fetchVerseInline(e.bibleRef, bibleVerseContent, bibleReadMoreBtn);
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
      const bookIds = { "Matthew": "MAT", "Mark": "MRK", "Luke": "LUK", "John": "JHN" }; // truncated for brevity
      const parts = refString.match(/([A-Za-z]+)\s(\d+):(\d+)/);
      const apiRef = `${bookIds[parts[1]].toLowerCase()}+${parts[2]}:${parts[3]}`;
      const r = await fetch(`https://bible-api.com/${apiRef}?translation=web`);
      const j = await r.json();
      targetEl.innerHTML = `<div class="verse-ref">${j.reference}</div><div>${j.verses[0].text}</div>`;
      this.audio.playClue();
    } catch (err) {
      targetEl.innerHTML = `Could not load verse.`;
    }
  }
}