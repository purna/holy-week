/**
 * Maps dialogueId to their Ink JSON story file paths.
 * NPCs in levels.js use dialogueId instead of storyFile / hasDialogue.
 * This map bridges that gap so loadStoryForNPC can normalise the path.
 * Also includes case file NPCs with their respective story files.
 */
const DIALOGUE_ID_MAP = {
    // Legacy levels.js mappings
    scribe_intro:       './story/scribe_intro.json',
    market_rumors:      './story/market_rumors.json',
    rumor_whisper:      './story/rumor_whisper.json',
    witness_healed:     './story/witness_healed.json',
    priest_objection:   './story/priest_objection.json',
    guard_report:       './story/guard_report.json',
    peter_defense:      './story/peter_defense.json',
    roman_assessment:   './story/roman_assessment.json',
    secret_visit:       './story/secret_visit.json',
    upper_room_prep:    './story/upper_room_prep.json',
    informant_bribe:    './story/informant_bribe.json',
    teaching_mount:     './story/teaching_mount.json',
    pharisee_critique:  './story/pharisee_critique.json',
    parable_vineyard:   './story/parable_vineyard.json',
    parable_meaning:    './story/parable_meaning.json',
    board_review:       './story/board_review.json',
    board_debate:       './story/board_debate.json',
    trial_rumors:       './story/trial_rumors.json',
    peter_denial:       './story/peter_denial.json',
// Case file NPC mappings
     peter:              './story/peter_defense.json',
     john:               './story/john_disciple.json',
     owner:              './story/galilean_pilgrim.json',
     local_skeptic:      './story/jerusalem_local.json',
     money_changer:      './story/money_changer.json',
     garrison_guard:     './story/guard_report.json',
     merchant_jadan:     './story/parable_vineyard.json',
     temple_spy:         './story/temple_spy.json',
     annas_patriarch:    './story/annas_patriarch.json',
     martha_bethany:     './story/martha_bethany.json',
mary_magdalene:     './story/mary_magdalene.json',
      marcus:             './story/execution_soldier.json',
      joseph:             './story/joseph_arimathea.json',
      john_mark:          './story/john_disciple.json',
      servant:            './story/jerusalem_local.json',
      judas:              './story/judas_iscariot.json',
      malchus_servant:    './story/execution_soldier.json',
      simon_peter:        './story/peter_defense.json',
      centurion_longinus: './story/roman_assessment.json',
      temple_priest_pashhur: './story/caiaphas_priest.json',
};
/**
 * DialogueManager
 *
 * Handles loading Ink story JSON files and driving the WhatsApp-style
 * chat-bubble dialogue UI (vn.html pattern).
 *
 * UI structure expected in index.html:
 *   #local-dialogue-box  (flex container, display:none → flex when open)
 *     #chat-panel
 *       .chat-hdr
 *         #npc-name-display   ← NPC name
 *         .st                 ← "● ONLINE" status line
 *       #bub-scroll           ← scrollable message list
 *       #bar-choices          ← choice pill buttons (.hide when empty)
 */
export class DialogueManager {
    constructor() {
        this.inkStory = null;
        this.isDialogueOpen = false;
        this.npcStories = {};
        this.inkLib = null;
        this.activeNpc = null;
        this.onCloseCallback = null;

        // Cache DOM refs once
        this._bubScroll = null;
        this._barChoices = null;
    }

    // ── Public init helpers ──────────────────────────────────────────────────

    setInkLib(lib) { this.inkLib = lib; }
    setActiveNPC(npc) { this.activeNpc = npc; }
    setDialogueOpen(state) { this.isDialogueOpen = state; }

    // ── Story loading ────────────────────────────────────────────────────────

    loadStoryForNPC(npc) {
        // NPCs from config.js use storyFile / hasDialogue directly.
        // NPCs from levels.js use dialogueId plus this DIALOGUE_ID_MAP.
        const storyFile = npc.storyFile
            || (npc.dialogueId != null ? DIALOGUE_ID_MAP[npc.dialogueId] : null);

        if (!npc.hasDialogue || !storyFile) {
            console.log('[DialogueManager] NPC has no dialogue or storyFile:', npc.id, npc.name,
                '| hasDialogue:', npc.hasDialogue, '| storyFile:', npc.storyFile,
                '| dialogueId:', npc.dialogueId);
            return Promise.resolve();
        }
        console.log('[DialogueManager] Loading story for NPC', npc.id, npc.name, 'from', storyFile);
        return fetch(storyFile)
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then(data => {
                this.npcStories[npc.id] = data;
                console.log(`[DialogueManager] Loaded story for ${npc.name}`);
            })
            .catch(e => console.error(`[DialogueManager] Failed to load story for ${npc.name}:`, e));
    }

    createStory(npcId) {
        const data = this.npcStories[npcId];
        if (!data) throw new Error('Story data not found for ' + npcId);
        // Return the simple STORY format (same as vn.html)
        return data;
    }

    getStory(npcId) {
        const story = this.npcStories[npcId];
        if (!story) {
            console.warn('[DialogueManager] No story for npcId:', npcId,
                '| Available:', Object.keys(this.npcStories));
        }
        return story;
    }

    // ── DOM helpers ──────────────────────────────────────────────────────────

    /** Lazily cache #bub-scroll and #bar-choices. */
    _getEls() {
        if (!this._bubScroll) this._bubScroll = document.getElementById('bub-scroll');
        if (!this._barChoices) this._barChoices = document.getElementById('bar-choices');
        return { bubScroll: this._bubScroll, barChoices: this._barChoices };
    }

    /**
     * Append a message bubble to #bub-scroll.
     * @param {string} text
     * @param {'npc'|'player'|'system'|'npc-filler'} type
     */
    addMsg(text, type = 'npc') {
        const { bubScroll } = this._getEls();
        const el = document.createElement('div');
        el.className = 'msg ' + type;
        el.textContent = text;
        bubScroll.appendChild(el);
        const atBottom = bubScroll.scrollHeight - bubScroll.scrollTop - bubScroll.clientHeight < 120;
        if (atBottom) {
            bubScroll.scrollTop = bubScroll.scrollHeight;
        }
    }

    /**
      * Show an animated typing indicator, then call cb() after the delay.
      * @param {Function} cb
      */
    addTyping(cb) {
        const { bubScroll } = this._getEls();
        const npcName = this.activeNpc?.name ?? 'NPC';
        const row = document.createElement('div');
        row.className = 'typing-row';
        row.setAttribute('aria-label', `${npcName} is typing`);
        row.innerHTML =
            '<div class="dot"></div>' +
            '<div class="dot"></div>' +
            '<div class="dot"></div>' +
            `<span class="typing-lbl">${npcName} is typing</span>`;
        bubScroll.appendChild(row);
        const delay = 1200 + Math.random() * 600;
        setTimeout(() => {
            row.remove();
            cb();
        }, delay);
    }

    addTypingBubble(message) {
        const { bubScroll } = this._getEls();
        const bubble = document.createElement('div');
        bubble.className = 'msg npc typing-bubble';
        bubble.textContent = '...';
        bubScroll.appendChild(bubble);
        bubScroll.scrollTop = bubScroll.scrollHeight;
        return bubble;
    }

    replaceTypingBubble(bubble, message) {
        if (!bubble) return;
        bubble.textContent = message;
        bubble.classList.remove('typing-bubble');
        bubScroll.scrollTop = bubScroll.scrollHeight;
    }

    /**
     * Render choice buttons inside #bar-choices.
     * Pass null / empty array to hide the bar.
     * @param {Array|null} choices  — inkjs choice objects { text, index }
     * @param {Function}   onPick  — called with the chosen choice object
     */
    showChoices(choices, onPick) {
        const { barChoices } = this._getEls();
        barChoices.classList.toggle('hide', !choices || choices.length === 0);
        barChoices.innerHTML = '';
        if (!choices || choices.length === 0) return;
        choices.forEach(c => {
            const b = document.createElement('button');
            b.className = 'choice-btn';
            b.textContent = '→ ' + c.text;
            b.onclick = () => {
                barChoices.classList.add('hide');
                setTimeout(() => onPick(c), 120);
            };
            barChoices.appendChild(b);
        });
    }

    // ── Open / close ─────────────────────────────────────────────────────────

    /**
     * Open the dialogue box for an NPC and start the Ink story from the top.
     *
     * @param {object}   npc       — NPC config object with .name, .id, .unlocksEvidence
     * @param {object}   inkStory  — Active inkjs Story instance
     * @param {Function} onClose   — Called when the player ends the conversation
     */
    openDialogue(npc, inkStory, onClose) {
        // Close sidebar panels
        ['panel-quest', 'panel-inv', 'panel-actions'].forEach(id => {
            document.getElementById(id)?.classList.remove('open');
        });
        ['btn-quest-toggle', 'btn-inv-toggle', 'btn-actions-toggle'].forEach(id => {
            document.getElementById(id)?.classList.remove('active');
        });

        this.setActiveNPC(npc);
        this.onCloseCallback = onClose;
        this.setDialogueOpen(true);

        // Populate header
        const nameEl = document.getElementById('npc-name-display');
        if (nameEl) nameEl.innerText = npc.name ?? npc.id;

        // Clear previous messages
        const { bubScroll } = this._getEls();
        bubScroll.innerHTML = '';
        this.showChoices(null, () => { });

        // Show the modal
        const box = document.getElementById('local-dialogue-box');
        if (box) box.classList.add('active');
        else document.getElementById('local-dialogue-box').style.display = 'flex';

        // System handshake message, then start story
        this.addMsg('SECURE CONNECTION ESTABLISHED.', 'system');
        this._stepStory(inkStory, 'start', onClose);
    }

    closeDialogue(onClose) {
        const box = document.getElementById('local-dialogue-box');
        if (box) box.classList.remove('active');
        else document.getElementById('local-dialogue-box').style.display = 'none';
        
        const { bubScroll } = this._getEls();
        bubScroll.innerHTML = '';
        this.showChoices(null, () => { });
        this.setDialogueOpen(false);
        
        const cb = this.onCloseCallback || onClose;
        this.onCloseCallback = null;
        if (typeof cb === 'function') cb();
    }

// ── Story stepping ───────────────────────────────────────────────────────

    /**
      * Advance the Ink story one beat:
      *   1. Collect all pending text lines.
      *   2. Show typing indicator → display NPC bubble(s).
      *   3. Show ambient filler lines.
      *   4. Render choice buttons (or a [CLOSE] button at story end).
      *
      * @param {object}   inkStory
      * @param {Function} onClose
      */
_stepStory(story, nodeId, onClose) {
        const node = story[nodeId];
        if (!node) {
            this.showChoices(
                [{ text: 'End Conversation', index: -1 }],
                () => this.closeDialogue(onClose)
            );
            return;
        }

        this.addTyping(() => {
            // Display NPC content
            if (node.content) {
                this.addMsg(node.content, 'npc');
            }

            // Show choices or close button
            if (node.choices && node.choices.length > 0) {
                this.showChoices(node.choices.map((c, i) => ({ text: c.text, index: i, destination: c.destination })), (c) => {
                    this.addMsg(c.text, 'player');
                    setTimeout(() => this._stepStory(story, c.destination, onClose), 400);
                });
            } else {
                this.showChoices(
                    [{ text: 'End Conversation', index: -1 }],
                    () => this.closeDialogue(onClose)
                );
            }
        });
    }

    /**
     * Legacy public entry-point kept for compatibility with existing callers.
     * Prefer openDialogue() for new code.
     *
     * @param {object}   inkStory
     * @param {Function} appendMessage  — ignored (addMsg used internally now)
     * @param {Function} showFiller     — ignored
     * @param {Element}  choiceEl       — ignored
     * @param {object}   uiSounds       — ignored
     * @param {Function} onClose
     */
    continueStory(inkStory, appendMessage, showFiller, choiceEl, uiSounds, onClose) {
        this._stepStory(inkStory, 'start', onClose);
    }

    // ── Ink text utilities ───────────────────────────────────────────────────

    stripInkMarkers(s) {
        if (!s) return '';
        return s.split(/\r?\n/)
            .map(line => {
                let l = (line || '').trim();
                if (l === '#' || l === '/#') return '';
                if (l.startsWith('^')) l = l.slice(1).trim();
                if (l.startsWith('#')) l = l.slice(1).trim();
                return l;
            })
            .filter(Boolean)
            .join('\n');
    }
}
