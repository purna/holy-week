/**
 * Maps dialogueId to their Ink JSON story file paths.
 * NPCs in levels.js use dialogueId instead of storyFile / hasDialogue.
 * This map bridges that gap so loadStoryForNPC can normalise the path.
 * Also includes case file NPCs with their respective story files.
 */
const path = './../story';

export const DIALOGUE_ID_MAP = {
    // --- Act I: Jerusalem Confrontations ---
    // Case A: The Missing Donkey (Triumphal Entry)
    peter_donkey: path + '/act1/case_a_missing_donkey/peter_donkey.json',
    john_donkey: path + '/act1/case_a_missing_donkey/john_donkey.json',
    galilean_pilgrim: path + '/act1/case_a_missing_donkey/galilean_pilgrim.json',
    jerusalem_local: path + '/act1/case_a_missing_donkey/jerusalem_local.json',
    eleazar_sadducee: path + '/act1/case_a_missing_donkey/eleazar_sadducee.json',
    sadducee_opposition: path + '/act1/case_a_missing_donkey/sadducee_opposition.json',

    // Case B: The Overturned Tables (Temple Cleansing)
    money_changer: path + '/act1/case_b_overturned_tables/money_changer.json',
    guard_report: path + '/act1/case_b_overturned_tables/guard_report.json',
    barabbas_insurgent: path + '/act1/case_b_overturned_tables/barabbas_insurgent.json',
    local_traveler: path + '/local_traveler.json',
    informant_bribe: path + '/act1/case_b_overturned_tables/informant_bribe.json',
    market_rumors: path + '/act1/case_b_overturned_tables/market_rumors.json',
    pontius_pilate: path + '/act1/case_b_overturned_tables/pontius_pilate.json',
    pilates_secretary: path + '/act1/case_b_overturned_tables/pilates_secretary.json',
    pharisee_critique: path + '/act1/case_b_overturned_tables/pharisee_critique.json',
    priest_objection: path + '/act1/case_b_overturned_tables/priest_objection.json',
    
    // Case C: The Barren Fig Tree
    nathan_fig_tree: path + '/nathan_fig_tree.json', // Assuming direct under story/
    rumor_whisper: path + '/act1/case_b_overturned_tables/rumor_whisper.json',
    woman_cloak: path + '/act1/case_b_overturned_tables/woman_cloak.json',

    // --- Act II: The Plots ---
    // Case A: The Silenced Teacher (Temple Authority)
    scribe_intro: path + '/act2/case_a_silenced_teacher/scribe_intro.json',
    parable_meaning: path + '/act2/case_a_silenced_teacher/parable_meaning.json',
    parable_vineyard: path + '/act2/case_a_silenced_teacher/parable_vineyard.json',
    witness_healed: path + '/act2/case_a_silenced_teacher/witness_healed.json',
    teaching_mount: path + '/act2/case_a_silenced_teacher/teaching_mount.json',


    // Case B: The Price of Life (Lazarus Conspiracy)
    temple_spy: path + '/act2/case_b_lazarus_conspiracy/temple_spy.json',
    annas_patriarch: path + '/act2/case_b_lazarus_conspiracy/annas_patriarch.json',
    martha_bethany: path + '/act2/case_b_lazarus_conspiracy/martha_bethany.json',
    nicodemus_conflicted: path + '/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.json',
    simon_leper: path + '/act2/case_b_lazarus_conspiracy/simon_leper.json',

    // Case C: The End of the Age (Olivet Discourse)
    andrew_olivet: path + '/andrew_olivet.json', // Assuming direct under story/


    // --- Act III: The Passion ---
    // Case A: The Broken Cup (Last Supper)
    john_disciple: path + '/act3/case_a_broken_cup/john_disciple.json',
    rhoda_servant: path + '/act3/case_a_broken_cup/rhoda_servant.json',
    judas_iscariot: path + '/act3/case_a_broken_cup/judas_iscariot.json',
    upper_room_prep: path + '/act3/case_a_broken_cup/upper_room_prep.json',

    // Case B: The Severed Ear (Gethsemane)
    peter_defense: path + '/act3/case_b_severed_ear/peter_defense.json',
    secret_visit: path + '/act3/case_b_severed_ear/secret_visit.json',
    peter_defense_simple: path + '/act3/case_b_severed_ear/peter_defense_simple.json',

    // Case C: The Midnight Tribunal (Sanhedrin Trial)
    caiaphas_priest: path + '/act3/case_c_midnight_tribunal/caiaphas_priest.json',
    peter_denial: path + '/act3/case_c_midnight_tribunal/peter_denial.json',
    false_witness: path + '/act3/case_c_midnight_tribunal/false_witness.json',
    trial_rumors: path + '/act3/case_c_midnight_tribunal/trial_rumors.json',

    // Case E: The Final Sacrifice (Crucifixion)
    roman_assessment: path + '/act3/case_e_final_sacrifice/roman_assessment.json',
    simon_cyrene: path + '/act3/case_e_final_sacrifice/simon_cyrene.json',
    temple_curtain: path + '/act3/case_e_final_sacrifice/temple_curtain.json',
    centurion_witness: path + '/act3/case_e_final_sacrifice/centurion_witness.json',

    // --- Act IV: Dawn of the New Age ---
    // Case A: The Empty Tomb (Resurrection)
    mary_magdalene: path + '/act4/case_a_empty_tomb/mary_magdalene.json',
    execution_soldier: path + '/act4/case_a_empty_tomb/execution_soldier.json',
    joseph_arimathea: path + '/act4/case_a_empty_tomb/joseph_arimathea.json',

    // Case B: The Guard's Report (Roman Inquiry)
    mary_resurrection: path + '/act4/case_b_guards_report/mary_resurrection.json',
    judas_betrayal: path + '/act4/case_b_guards_report/judas_betrayal.json',
    herods_servant: path + '/act4/case_b_guards_report/herods_servant.json',

    // Case C: Peter's Restoration (Sea of Galilee)
    peter_restored: path + '/act4/case_c_peters_restoration/peter_restored.json',
    jesus_reinstatement: path + '/act4/case_c_peters_restoration/jesus_reinstatement.json',
    peter_reinstated: path + '/act4/case_c_peters_restoration/peter_reinstated.json',

    // --- System & Metadata ---
    board_review: path + '/story/system/board_review.json',
    board_debate: path + '/story/system/board_debate.json'
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
        if (this.inkLib && this.inkLib.Story && data.inkVersion) {
            return new this.inkLib.Story(data);
        }
        return null;
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
        const { bubScroll } = this._getEls();
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
