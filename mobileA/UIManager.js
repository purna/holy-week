/**
 * UIManager orchestrates the 2D interface, handling screen routing,
 * modal interactions, and the rendering of game states to the DOM.
 */
export class UIManager {
  constructor(cm, es, ns, de, ls, a11y, audio, dm, app, labUI, chatUI) {
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
    this.chatUI = chatUI;
    this.prevScreen = "map";

    // Prophecy Matching State
    this.selectedCodexEvidenceId = null;
    this.selectedCodexProphecyId = null;
    this.codexMatchFeedback = null;
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

    if (tab === "lab") this.renderLab();
    if (tab === "people") this.renderPeople();
    if (tab === "codex") this.renderCodex();
    if (tab === "scene") this.renderScene();
    if (tab === "accuse") this.renderAccuse();

    this.a11y.announce(`${tab} tab open`);
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
            ${c.eventLocation ? `<div class="case-event-location">📍 ${c.eventLocation}</div>` : ''}
            <span class="case-status-label">${prog?.solved ? `✅ Solved — ${prog.score?.total} pts` : c.isLocked ? "🔒 Locked" : "🔍 Open"}</span>
          </div>`;
    }).join("")}
      </div>`).join("");
  }

  setupInvestigation(c) {
    // Re-bind callbacks to the specific case context
    this.labUI.onResult = this.onLabAction.bind(this);
    this.chatUI.onAction = this.onChatAction.bind(this);

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
      ${!this.cm.getCaseProgress(c.id)?.sceneViewed ? `<button class="lets-investigate-btn" onclick="this.style.display='none'; const p=window.cm.getCaseProgress(window.cm.activeCaseId); if(p) p.sceneViewed=true; window.cm._saveProgress(); switchInvTab('people')">Let's investigate</button>` : ''}
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

  renderCodex() {
    const c = this.cm.getActiveCase();
    const view = document.getElementById("inv-codex");
    if (!c || !view) return;

    const propheciesWithStatus = this.es.getPropheciesWithStatus();
    const lockedProps = propheciesWithStatus.filter(p => !p.discovered);
    const discoveredProps = propheciesWithStatus.filter(p => p.discovered);
    const collectedEvidence = this.es.getCollected();

    // Get selected items for matching
    const selectedEv = this.es.getById(this.selectedCodexEvidenceId);
    const selectedProp = this.es.getProphecyById(this.selectedCodexProphecyId);

    const completion = this.es.getProphecyCompletionPercent();

    view.innerHTML = `
      <h3 class="section-title">Prophecy Matching</h3>
      <div class="prophecy-lab-intro">
        Select evidence from your collection, then choose a locked prophecy below to attempt a link.
      </div>

      <div class="codex-selection-area">
        <div class="selection-slot ${selectedEv ? 'active' : ''}" id="codex-evidence-slot" onclick="window.ui.a11y.speak('Select evidence from your collection below.')">
          ${selectedEv ? `<span class="slot-icon">${selectedEv.icon}</span><span class="slot-name">${selectedEv.name}</span>` : `<span>Select Evidence...</span>`}
        </div>
        <div class="selection-arrow">➕</div>
        <div class="selection-slot ${selectedProp ? 'active' : ''}" id="codex-prophecy-slot" onclick="window.ui.a11y.speak('Select a locked prophecy to attempt a match.')">
          ${selectedProp ? `<span class="slot-icon">${selectedProp.icon}</span><span class="slot-name">${selectedProp.reference}</span>` : `<span>Select Prophecy...</span>`}
        </div>
        <button id="btn-match-prophecy" class="evidence-detail-confirm ${!(selectedEv && selectedProp) ? 'is-disabled' : ''}" onclick="window.ui.attemptProphecyMatch()">Match</button>
      </div>

      <div id="codex-feedback" class="codex-feedback" ${!this.codexMatchFeedback ? 'hidden' : ''}>
        ${this.codexMatchFeedback || ''}
      </div>

      <div class="codex-matching-columns" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <h3 class="section-title">1. Your Evidence</h3>
          <div class="picker-grid" style="grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));">
        ${collectedEvidence.length === 0
        ? `<p class="picker-empty">Collect evidence from the scene first.</p>`
        : collectedEvidence.map(e => {
          const isSelected = this.selectedCodexEvidenceId === e.id;
          return `
                <button
                  class="picker-card ${isSelected ? 'selected-a' : ''}"
                  data-evidence-id="${e.id}"
                  aria-label="${e.name}: ${e.desc}. ${isSelected ? 'Selected for matching' : 'Tap to select'}"
                  aria-pressed="${isSelected}"
                  onclick="window.ui.selectEvidenceForMatching('${e.id}')"
                >
                  <span class="picker-icon" aria-hidden="true">${e.icon}</span>
                  <span class="picker-name">${e.name}</span>
                  ${isSelected ? `<span class="sel-badge" aria-hidden="true">A</span>` : ""}
                </button>`;
        }).join("")}
          </div>
        </div>

        <div>
          <h3 class="section-title">2. Locked Prophecies</h3>
          <div class="picker-grid" style="grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));">
            ${lockedProps.length === 0
        ? `<p class="picker-empty">All current prophecies matched!</p>`
        : lockedProps.map(p => {
          const isSelected = this.selectedCodexProphecyId === p.id;
          return `
                    <button
                      class="picker-card ${isSelected ? 'selected-b' : ''}"
                      onclick="window.ui.selectProphecyForMatching('${p.id}')"
                      aria-label="Locked Prophecy: ${p.reference}. ${isSelected ? 'Selected for matching' : 'Tap to select'}"
                      aria-pressed="${isSelected}"
                    >
                      <span class="picker-icon" aria-hidden="true"><i class="fa-solid fa-lock"></i></span>
                      <span class="picker-name">${p.reference}</span>
                      ${isSelected ? `<span class="sel-badge" aria-hidden="true">B</span>` : ""}
                    </button>`;
        }).join("")}
          </div>
        </div>
      </div>

      <h3 class="section-title">Prophecy Library (${completion}% Complete)</h3>
      <div id="codex-grid" class="codex-grid">
        ${discoveredProps.map(p => `
          <div class="prophecy-card discovered" onclick="window.ui.showProphecyDetail('${p.id}')">
            <div class="prophecy-card-icon">${p.icon || '🔮'}</div>
            <div class="prophecy-card-info">
              <div class="prophecy-card-reference">${p.reference}</div>
              <div class="prophecy-card-desc">${(p.fulfilledBy || p.desc || '').substring(0, 60)}...</div>
            </div>
          </div>
        `).join("")}
      </div>`;
  }

  selectEvidenceForMatching(evidenceId) {
    this.selectedCodexEvidenceId = (this.selectedCodexEvidenceId === evidenceId) ? null : evidenceId;
    this.renderCodex();
  }

  selectProphecyForMatching(prophecyId) {
    const prophecy = this.es.getProphecyById(prophecyId);
    if (prophecy && !prophecy.discovered) { // Only allow selecting locked prophecies for matching
      this.selectedCodexProphecyId = (this.selectedCodexProphecyId === prophecyId) ? null : prophecyId;
    } else if (prophecy && prophecy.discovered) {
      this.showProphecyDetail(prophecyId); // Still allow viewing discovered prophecies
    }
    this.renderCodex();
  }

  /**
   * Logic for processing a prophecy match attempt.
   */
  attemptProphecyMatch() {
    const evidenceId = this.selectedCodexEvidenceId;
    const prophecyId = this.selectedCodexProphecyId;

    if (!evidenceId || !prophecyId) {
      if (this.audio.enabled) this.audio.playError();
      return;
    }

    const evidence = this.es.getById(evidenceId);
    const prophecy = this.es.getProphecyById(prophecyId);
    const isMatch = evidence && evidence.relatedProphecy === prophecyId;

    if (isMatch) {
      this.cm.recordProphecyFound(prophecyId);
      if (this.audio.enabled) this.audio.playBonus();
      this.codexMatchFeedback = `<div class="codex-feedback-msg success">✨ Correct! +10 pts<br><small>${evidence.name} linked to ${prophecy.reference}</small></div>`;
      this.addSystemMessage(`✨ Correct! ${evidence.name} linked to prophecy. (+10 pts)`, 'codex');
    } else {
      this.cm.updateDoubt(5);
      if (this.audio.enabled) this.audio.playError();
      this.codexMatchFeedback = `<div class="codex-feedback-msg error">❌ Incorrect Link! +5 Doubt<br><small>This evidence does not fulfill that prophecy.</small></div>`;
      this.addSystemMessage(`❌ Incorrect link. Doubt increased by 5.`, 'codex');
    }

    this.selectedCodexEvidenceId = null;
    this.selectedCodexProphecyId = null;
    this.renderCodex();

    setTimeout(() => {
      this.codexMatchFeedback = null;
      this.renderCodex();
    }, 4000);
  }

  /**
   * Routes system messages to the appropriate UI feed.
   * @param {string} text 
   * @param {string} tab - Optional hint for where the message originated
   */
  addSystemMessage(text, tab = 'system') {
    if (this.chatUI) this.chatUI.addSystem(text);
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
}
