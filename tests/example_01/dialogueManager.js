/**
 * Maps dialogueId to their Ink JSON story file paths.
 * NPCs in levels.js use dialogueId instead of storyFile / hasDialogue.
 * This map bridges that gap so loadStoryForNPC can normalise the path.
 * Also includes case file NPCs with their respective story files.
 */
export const DIALOGUE_ID_MAP = {
    scribe_intro: './story/scribe_intro.json',
    market_rumors: './story/market_rumors.json',
    rumor_whisper: './story/rumor_whisper.json',
    witness_healed: './story/witness_healed.json',
    priest_objection: './story/priest_objection.json',
    guard_report: './story/guard_report.json',
    peter_defense: './story/peter_defense.json',
    roman_assessment: './story/roman_assessment.json',
    secret_visit: './story/secret_visit.json',
    upper_room_prep: './story/upper_room_prep.json',
    informant_bribe: './story/informant_bribe.json',
    teaching_mount: './story/teaching_mount.json',
    pharisee_critique: './story/pharisee_critique.json',
    parable_vineyard: './story/parable_vineyard.json',
    parable_meaning: './story/parable_meaning.json',
    board_review: './story/board_review.json',
    board_debate: './story/board_debate.json',
    trial_rumors: './story/trial_rumors.json',
    judas_betrayal: './story/judas_betrayal.json',
    mary_resurrection: './story/mary_resurrection.json',
    sadducee_opposition: './story/sadducee_opposition.json',
    peter_denial: './story/peter_denial.json',
    mary_magdalene: './story/mary_magdalene.json',
    herods_servant: './story/herods_servant.json',
    temple_curtain: './story/temple_curtain.json',
    centurion_witness: './story/centurion_witness.json',
    pontius_pilate: './story/pontius_pilate.json',
    woman_cloak: './story/woman_cloak.json',
    joseph_arimathea: './story/joseph_arimathea.json',
    temple_spy: './story/temple_spy.json',
    galilean_pilgrim: './story/galilean_pilgrim.json',
    jerusalem_local: './story/jerusalem_local.json',
    money_changer: './story/money_changer.json',
    execution_soldier: './story/execution_soldier.json',
    annas_patriarch: './story/annas_patriarch.json',
    caiaphas_priest: './story/caiaphas_priest.json',
    barabbas_insurgent: './story/barabbas_insurgent.json',
    pilates_secretary: './story/pilates_secretary.json',
    judas_iscariot: './story/judas_iscariot.json',
    john_disciple: './story/john_disciple.json',
    jesus_reinstatement: './story/jesus_reinstatement.json',
    peter_reinstated: './story/peter_reinstated.json',
    false_witness: './story/false_witness.json',
    nicodemus_conflicted: './story/nicodemus_conflicted.json',
    simon_leper: './story/simon_leper.json',
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
        this.onMessageCallback = null;

        // Cache DOM refs once
        this._bubScroll = null;
        this._barChoices = null;
    }

    // ── Public init helpers ──────────────────────────────────────────────────

    setInkLib(lib) { this.inkLib = lib; }
    setActiveNPC(npc) { this.activeNpc = npc; }
    setOnMessage(cb) { this.onMessageCallback = cb; }
    setDialogueOpen(state) { this.isDialogueOpen = state; }

    // ── Story loading ────────────────────────────────────────────────────────

    loadStoryForNPC(npc) {
        let storyFile = npc.storyFile;

        // If storyFile is an ID reference (no directory path or extension)
        if (storyFile && !storyFile.includes('/') && !storyFile.endsWith('.json')) {
            storyFile = DIALOGUE_ID_MAP[storyFile];
        }

        // Fallback for legacy dialogueId
        if (!storyFile && npc.dialogueId) {
            storyFile = DIALOGUE_ID_MAP[npc.dialogueId];
        }

        if (!npc.hasDialogue || !storyFile) {
            console.log('[DialogueManager] NPC has no dialogue or storyFile:', npc.id, npc.name,
                '| hasDialogue:', npc.hasDialogue, '| storyFile:', npc.storyFile);
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
        if (this.inkLib && this.inkLib.Story) {
            return new this.inkLib.Story(data);
        }
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
        if (this.onMessageCallback && (type === 'npc' || type === 'player')) {
            this.onMessageCallback(text, type);
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
     * @param {Function} onMessage — Optional callback for each message added
     */
    openDialogue(npc, inkStory, onClose, onMessage) {
        // Close sidebar panels
        ['panel-quest', 'panel-inv', 'panel-actions'].forEach(id => {
            document.getElementById(id)?.classList.remove('open');
        });
        ['btn-quest-toggle', 'btn-inv-toggle', 'btn-actions-toggle'].forEach(id => {
            document.getElementById(id)?.classList.remove('active');
        });

        console.log(`[DialogueManager] Initializing dialogue for ${npc.name} (${npc.id}). Reference: ${npc.storyFile || 'none'}`);

        this.setActiveNPC(npc);
        this.onCloseCallback = onClose;
        this.onMessageCallback = onMessage;
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
        this._stepStory(inkStory, onClose);
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
        this.onMessageCallback = null;
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
      * @param {object}   story - inkjs.Story instance
      * @param {Function} onClose
      */
_stepStory(story, onClose) {
        if (!story) return;

        // If the story is at the end, show closing button
        if (!story.canContinue && (!story.currentChoices || story.currentChoices.length === 0)) {
            this.showChoices([{ text: 'End Conversation', index: -1 }], () => this.closeDialogue(onClose));
            return;
        }

        this.addTyping(() => {
            let text = "";
            while (story.canContinue) {
                text += story.Continue();
            }

            if (text.trim()) {
                this.addMsg(this.stripInkMarkers(text), 'npc');
            }

            if (story.currentChoices && story.currentChoices.length > 0) {
                this.showChoices(story.currentChoices, (choice) => {
                    this.addMsg(choice.text, 'player');
                    story.ChooseChoiceIndex(choice.index);
                    setTimeout(() => this._stepStory(story, onClose), 400);
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
        this._stepStory(inkStory, onClose);
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
