// ============================================================
// CHAT UI — NPC conversations, dialogue feed
// ============================================================

export class ChatUI {
  constructor(npcSystem, evidenceSystem, accessibility, onAction, audioManager) {
    this.npcs  = npcSystem;
    this.es    = evidenceSystem;
    this.a11y  = accessibility;
    this.onAction = onAction;
    this.audio = audioManager;
    this.messagesByNPC = {};
    this.challengeResultsByNPC = {};
  }

  addMessage(speaker, text, type = "npc", extra = {}, npcId = null) {
    const targetNPC = npcId || this.pendingNPC;
    const msg = { speaker, text, type, extra, id: Date.now() };
    if (targetNPC) {
      if (!this.messagesByNPC[targetNPC]) this.messagesByNPC[targetNPC] = [];
      this.messagesByNPC[targetNPC].push(msg);
    }
    this.a11y.speak(`${speaker}: ${text}`);
    return msg;
  }

  addSystem(text, npcId = null) {
    return this.addMessage("System", text, "system", {}, npcId || this.pendingNPC);
  }

  getMessages(npcId) {
    return this.messagesByNPC[npcId] || [];
  }

  renderFeed(npcId = null) {
    const msgs = npcId ? this.getMessages(npcId) : [];
    if (!msgs.length) {
      return `<p class="chat-empty" role="status">No conversation yet. Talk to this witness to begin.</p>`;
    }
    return msgs.slice(-20).map(m => this._renderMsg(m)).join("");
  }

  _renderMsg(m) {
    const cls = `msg msg-${m.type}`;
    const icon = m.type === "player" ? "🕵️" : m.type === "system" ? "📋" : "🗣";
    return `
      <div class="${cls}" role="listitem" aria-label="${m.speaker}: ${m.text}">
        <span class="msg-speaker" aria-hidden="true">${icon} ${m.speaker}</span>
        <span class="msg-text">${this.a11y.simplify(m.text)}</span>
        ${m.extra?.breakthrough ? `<span class="breakthrough-badge" aria-label="Breakthrough!">⚡ Breakthrough</span>` : ""}
        ${m.extra?.revealedClue ? `<span class="clue-badge" aria-label="New clue found">🔍 New clue found</span>` : ""}
      </div>`;
  }

  renderNPCPanel() {
    const npcs = this.npcs.getNPCs();
    return `
      <div class="npc-list" role="list" aria-label="People to interview">
        ${npcs.map(npc => {
          const state = this.npcs.getState(npc.id);
          const moodColor = this.npcs.getMoodColor(state?.mood || "neutral");
          const moodLabel = this.npcs.getMoodLabel(state?.mood || "neutral");
          return `
            <div class="npc-card" role="listitem">
              <div class="npc-header">
                <span class="npc-avatar" aria-hidden="true">${npc.avatar}</span>
                <div class="npc-info">
                  <span class="npc-name">${npc.name}</span>
                  <span class="npc-role">${npc.role}</span>
                </div>
                <span class="npc-mood" style="color:${moodColor}" aria-label="Mood: ${moodLabel}">${moodLabel}</span>
              </div>
              <div class="npc-feed" role="log" aria-live="polite" aria-label="Conversation with ${npc.name}">
                ${this.renderFeed(npc.id)}
              </div>
              <div class="npc-actions" role="group" aria-label="Actions with ${npc.name}">
                <button class="npc-btn" data-action="talk" data-npc="${npc.id}" aria-label="Talk to ${npc.name}">
                  💬 Talk
                </button>
                <button class="npc-btn" data-action="show" data-npc="${npc.id}" aria-label="Show evidence to ${npc.name}">
                  🔍 Show Evidence
                </button>
                <button class="npc-btn npc-btn-challenge" data-action="challenge" data-npc="${npc.id}"
                  aria-label="Challenge ${npc.name} with a contradiction"
                  ${!this.es.selectedA ? "aria-disabled='true'" : ""}>
                  ⚡ Challenge
                </button>
              </div>
              ${state?.pressureLevel > 0 ? `
                <div class="pressure-bar" role="progressbar" aria-valuenow="${state.pressureLevel}" aria-valuemin="0" aria-valuemax="100" aria-label="Pressure level: ${state.pressureLevel}%">
                  <div class="pressure-fill" style="width:${state.pressureLevel}%"></div>
                </div>` : ""}
              <div class="challenge-result" data-npc-challenge="${npc.id}" ${this.challengeResultsByNPC[npc.id] ? '' : 'hidden'}>
                ${this.challengeResultsByNPC[npc.id] || ''}
              </div>
              <div class="show-evidence-picker" data-npc-picker="${npc.id}" hidden>
                <h3>Select evidence to show (up to 2):</h3>
                <div class="evidence-pick-list">
                  ${this.es.getCollected().map(e => `
                    <button class="evidence-pick-btn" data-evidence="${e.id}" data-npc="${npc.id}" aria-label="Show ${e.name}" aria-pressed="false">
                      ${e.icon} ${e.name}
                    </button>`).join("")}
                </div>
                <button class="cancel-btn" data-npc="${npc.id}" aria-label="Cancel">Cancel</button>
                <button class="confirm-show-btn" data-npc="${npc.id}" aria-label="Confirm selection" disabled>✓ Show Selected</button>
              </div>
              <div class="challenge-result" data-npc-challenge="${npc.id}" hidden></div>
            </div>`;
        }).join("")}
      </div>
    `;
  }

  bindNPCEvents(container) {
    let pendingNPC = null;
    let pendingSelection = [];

    container.querySelectorAll("[data-action='talk']").forEach(btn => {
      btn.addEventListener("click", () => {
        const npcId = btn.dataset.npc;
        const npc = this.npcs.getNPC(npcId);
        this.pendingNPC = npcId;

        if (window.dm && npc && npc.hasDialogue && npc.storyFile) {
          const story = window.dm.createStory(npcId);
          if (story) {
            window.dm.openDialogue(npc, story, () => {
              if (npc.unlocksEvidence && npc.unlocksEvidence.length > 0) {
                npc.unlocksEvidence.forEach(id => {
                  const unlocked = this.es.discover(id);
                  if (unlocked) {
                    this.addSystem(`🔓 New clue: ${unlocked.name}`, npcId);
                  }
                });
              }
              if (this.onAction) this.onAction({ type: "talk_complete", npcId });
              this._refreshNPCFeed(npcId, container);
            });
            return;
          }
        }

        const result = this.npcs.talk(npcId);
        if (result) {
          this.addMessage(result.speaker, result.text, "npc", {}, npcId);
          this._refreshNPCFeed(npcId, container);
        }
      });
    });

    container.querySelectorAll("[data-action='show']").forEach(btn => {
      btn.addEventListener("click", () => {
        pendingNPC = btn.dataset.npc;
        pendingSelection = [];
        const npcId = pendingNPC;
        delete this.challengeResultsByNPC[npcId];
        const npcCard = btn.closest(".npc-card");
        const picker = npcCard?.querySelector("[data-npc-picker]");

        const allPickers = container.querySelectorAll(".show-evidence-picker");
        allPickers.forEach(p => p.hidden = true);

        container.querySelectorAll(".evidence-pick-btn").forEach(b => {
          b.classList.remove("selected");
          b.setAttribute("aria-pressed", "false");
        });
        container.querySelectorAll(".confirm-show-btn").forEach(b => b.disabled = true);
        container.querySelectorAll(".challenge-btn").forEach(b => b.disabled = true);

        if (picker) { picker.hidden = false; }
      });
    });

    container.querySelectorAll(".evidence-pick-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const npcId = btn.dataset.npc;
        if (!npcId || npcId !== pendingNPC) return;

        const evId = btn.dataset.evidence;
        const idx = pendingSelection.indexOf(evId);

        if (idx >= 0) {
          pendingSelection.splice(idx, 1);
          btn.classList.remove("selected");
          btn.setAttribute("aria-pressed", "false");
          this.es.deselectAll();
          pendingSelection.forEach(id => this.es.selectEvidence(id));
        } else if (pendingSelection.length < 2) {
          pendingSelection.push(evId);
          btn.classList.add("selected");
          btn.setAttribute("aria-pressed", "true");
          this.es.deselectAll();
          pendingSelection.forEach(id => this.es.selectEvidence(id));
        }

        const confirmBtn = container.querySelector(`.confirm-show-btn[data-npc="${npcId}"]`);
        if (confirmBtn) confirmBtn.disabled = pendingSelection.length === 0;

        const challengeBtn = container.querySelector(`[data-action="challenge"][data-npc="${npcId}"]`);
        if (challengeBtn) {
          challengeBtn.disabled = pendingSelection.length < 2;
          challengeBtn.setAttribute("aria-disabled", pendingSelection.length < 2 ? "true" : "false");
        }
      });
    });

    container.querySelectorAll(".confirm-show-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const npcId = btn.dataset.npc;
        if (!npcId || pendingSelection.length === 0) return;

        pendingSelection.forEach(evId => {
          const result = this.npcs.showEvidence(npcId, evId);
          if (result) {
            this.addMessage(result.speaker, result.text, "npc", { revealedClue: result.revealedClue }, npcId);
            if (result.revealedClue) {
              this.es.discover(result.revealedClue);
              this.addSystem(`New evidence found: ${this.es.getById(result.revealedClue)?.name}`, npcId);
            }
          }
        });

        this._refreshNPCFeed(npcId, container);
        const picker = container.querySelector(`[data-npc-picker="${npcId}"]`);
        if (picker) picker.hidden = true;
        pendingSelection = [];
        pendingNPC = null;

        if (this.onAction) this.onAction({ type: "show_evidence", npcId });
      });
    });

    container.querySelectorAll(".cancel-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const npcId = btn.dataset.npc || pendingNPC;
        const picker = container.querySelector(`[data-npc-picker="${npcId}"]`);
        if (picker) picker.hidden = true;
        pendingSelection = [];
        pendingNPC = null;
      });
    });

    container.querySelectorAll("[data-action='challenge']").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.getAttribute("aria-disabled") === "true") return;
        const npcId = btn.dataset.npc;
        if (pendingSelection.length === 0) return;

        const result = this.npcs.challenge(npcId, this.es.selectedA?.id, this.es.selectedB?.id);
        if (!result) return;
        const npcCard = btn.closest(".npc-card");
        const resultPanel = npcCard?.querySelector(`[data-npc-challenge="${npcId}"]`);
        if (resultPanel) {
          resultPanel.hidden = false;
          const html = `
            <div class="challenge-result-box ${result.breakthrough ? 'breakthrough' : ''}">
              <div class="challenge-result-header">
                <span class="challenge-result-icon">${result.breakthrough ? '⚡' : '💬'}</span>
                <span class="challenge-result-speaker">${result.speaker}</span>
              </div>
              <div class="challenge-result-text">${result.text}</div>
              ${result.breakthrough ? '<div class="challenge-breakthrough-badge">⚡ Breakthrough</div>' : ''}
            </div>
          `;
          resultPanel.innerHTML = html;
          this.challengeResultsByNPC[npcId] = html;
        } else {
          this.addMessage(result.speaker, result.text, "npc", { breakthrough: result.breakthrough }, npcId);
          this._refreshNPCFeed(npcId, container);
        }
        if (this.onAction) this.onAction({ type: "challenge", result, npcId });
      });
    });
  }

  _refreshNPCFeed(npcId, container) {
    const feed = container.querySelector(`.npc-card:has([data-npc="${npcId}"]) .npc-feed`)
      || container.querySelector(`.npc-feed`);
    if (feed) feed.innerHTML = this.renderFeed(npcId);
  }

  _refreshFeed(feedContainer) {
    if (feedContainer) feedContainer.innerHTML = this.renderFeed();
  }
}