/**
 * Maps dialogueId (from levels.js NPCs) to their Ink JSON story file paths.
 * NPCs in levels.js use dialogueId instead of storyFile / hasDialogue.
 * This map bridges that gap so loadStoryForNPC can normalise the path.
 */
const DIALOGUE_ID_MAP = {
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

        if (!storyFile) {
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
                if (!data.inkVersion) throw new Error('Invalid Ink JSON: missing inkVersion');
                this.npcStories[npc.id] = data;
                console.log(`[DialogueManager] Loaded story for ${npc.name} (Ink v${data.inkVersion})`);
            })
            .catch(e => console.error(`[DialogueManager] Failed to load story for ${npc.name}:`, e));
    }

    createStory(npcId) {
        if (!this.inkLib) throw new Error('Ink runtime not loaded');
        const data = this.npcStories[npcId];
        if (!data) throw new Error('Story data not found for ' + npcId);
        return new this.inkLib.Story(data);
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
        bubScroll.scrollTop = bubScroll.scrollHeight;
    }

    /**
     * Show an animated typing indicator, then call cb() after ~600–800 ms.
     * @param {Function} cb
     */
    addTyping(cb) {
        const { bubScroll } = this._getEls();
        const npcName = this.activeNpc?.name ?? 'NPC';
        const row = document.createElement('div');
        row.className = 'typing-row';
        row.innerHTML =
            '<div class="dot"></div>' +
            '<div class="dot"></div>' +
            '<div class="dot"></div>' +
            `<span class="typing-lbl">${npcName} is typing…</span>`;
        bubScroll.appendChild(row);
        bubScroll.scrollTop = bubScroll.scrollHeight;
        setTimeout(() => {
            row.remove();
            cb();
        }, 600 + Math.random() * 200);
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
            b.onclick = () => onPick(c);
            barChoices.appendChild(b);
        });
    }

    // ── Open / close ─────────────────────────────────────────────────────────

    /**
     * Open the dialogue box for an NPC and start the Ink story from the top.
     *
     * Also closes any open sidebar panels (mirrors vn.html startDialogue behaviour).
     *
     * @param {object}   npc       — NPC config object with .name and .id
     * @param {object}   inkStory  — Active inkjs Story instance
     * @param {Function} onClose   — Called when the player ends the conversation
     * @param {Function} onTag     — Called when a tag (e.g., reveal:id) is encountered
     */
    openDialogue(npc, inkStory, onClose, onTag) {
        // Close sidebar panels
        ['panel-quest', 'panel-inv', 'panel-actions'].forEach(id => {
            document.getElementById(id)?.classList.remove('open');
        });
        ['btn-quest-toggle', 'btn-inv-toggle', 'btn-actions-toggle'].forEach(id => {
            document.getElementById(id)?.classList.remove('active');
        });

        this.setActiveNPC(npc);
        this.setDialogueOpen(true);

        // Populate header
        const nameEl = document.getElementById('vn-speaker-name');
        if (nameEl) nameEl.innerText = npc.name ?? npc.id;

        // Clear previous messages
        const { bubScroll } = this._getEls();
        bubScroll.innerHTML = '';
        this.showChoices(null, () => { });

        // Show the box
        document.getElementById('vn-overlay').classList.add('active');

        // System handshake message, then start story
        this.addMsg('SECURE CONNECTION ESTABLISHED.', 'system');
        this._stepStory(inkStory, onClose, onTag);
    }

    closeDialogue(onClose) {
        document.getElementById('vn-overlay').classList.remove('active');
        const { bubScroll } = this._getEls();
        bubScroll.innerHTML = '';
        this.showChoices(null, () => { });
        this.setDialogueOpen(false);
        if (typeof onClose === 'function') onClose();
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
     * @param {Function} onTag
     */
    _stepStory(inkStory, onClose, onTag) {
        const { barChoices } = this._getEls();

        // Hide choices while processing
        this.showChoices(null, () => { });

        // ── Raw collection + sanitization pipeline ──────────────────────────────
        // All raw ink text is stripped of Wikilink markers (#, ^, /#) before
        // it ever touches the Typewriter or WhatsApp bubble DOM elements.
        // This prevents raw syntax flashing on screen.
        let raw = '';
        while (inkStory.canContinue) {
            raw += inkStory.Continue();
            if (inkStory.currentTags && typeof onTag === 'function') {
                inkStory.currentTags.forEach(tag => onTag(tag));
            }
        }
        const sanitizedLine = this.stripInkMarkers(raw).trim();

        // Show typing, then NPC bubble + filler + choices
        this.addTyping(() => {
            if (sanitizedLine) this.addMsg(sanitizedLine, 'npc');

            const fillers = [
                '⚠️ Hyper-vigilance index spiking...',
                '🔍 Scanning social tone subtext...',
                '📉 Risk assessment: vulnerability widening.',
                '🧠 Anxious thought-loop running worst-case models.',
                '🔒 Defensive parsing subroutines active...',
                '💓 Autonomic heart-rate variation trace active...',
            ];
            const fillerCount = sanitizedLine ? 2 : 0;
            const delay = 350;

            for (let i = 0; i < fillerCount; i++) {
                setTimeout(() => {
                    const msg = fillers[Math.floor(Math.random() * fillers.length)];
                    this.addMsg(msg, 'npc-filler');
                }, (i + 1) * delay);
            }

            setTimeout(() => {
                const choices = inkStory.currentChoices;

                if (choices.length > 0) {
                    this.showChoices(choices, (c) => {
                        this.addMsg(c.text, 'player');
                        inkStory.ChooseChoiceIndex(c.index);
                        setTimeout(() => this._stepStory(inkStory, onClose, onTag), 400);
                    });
                } else {
                    // End of story — offer close button
                    this.showChoices(
                        [{ text: '🔄 [ CLOSE CONNECTION ]', index: -1 }],
                        () => this.closeDialogue(onClose)
                    );
                }
            }, (fillerCount + 1) * delay);
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
