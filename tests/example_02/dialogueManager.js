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
 * Maps profileId to their character JSON file paths.
 */
export const PROFILE_ID_MAP = {
    caiaphas: './characters/caiaphas.json',
    peter: './characters/peter.json',
    ananias_witness: './characters/ananias_witness.json',
    thomas: './characters/thomas.json',
    mary_magdalene: './characters/mary_magdalene.json',
    nathanael_disciple: './characters/nathanael_disciple.json',
};

/**
 * Helper to resolve a path from a potentially shorthand ID reference.
 */
export function getProfilePath(ref) {
    return PROFILE_ID_MAP[ref] || ref;
}

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
        // We now allow storyFile to be an ID reference.
        const storyRef = npc.storyFile || npc.dialogueId;
        const storyFile = DIALOGUE_ID_MAP[storyRef] || storyRef;

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
        if (!data || typeof data !== 'object' || !data.inkVersion) {
            throw new Error(`[DialogueManager] Invalid or missing story data for: ${npcId}`);
        }
        try {
            return new this.inkLib.Story(data);
        } catch (err) {
            console.error(`[DialogueManager] inkjs failed to parse story for ${npcId}. 
                Engine version: ${this.inkLib.Story.inkVersionCurrent}
                Story version: ${data.inkVersion}
                Error:`, err);
            throw err;
        }
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
     * @param {object|null} inkStory — Active inkjs Story instance
     * @param {Function} onClose   — Called when the player ends the conversation
     * @param {Function} onTag     — Called when a tag (e.g., reveal:id) is encountered
     */
    openDialogue(npc, inkStory, onClose, onTag) {
        if (!inkStory) {
            console.warn(`[DialogueManager] Aborting dialogue for ${npc.name}: Story instantiation failed.`);
            return;
        }

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
        // Ensure the choices bar is hidden while text lines are still arriving
        this.showChoices(null, () => { });

        if (inkStory.canContinue) {
            this.addTyping(() => {
                // ink-js runtime: story.Continue() handles the JSON traversal and returns plain text.
                // This avoids manual JSON parsing or flattening.
                const rawLine = inkStory.Continue();
                const line = (rawLine || '').trim();

                if (line) {
                    this.addMsg(line, 'npc');

                    // process line tags immediately (e.g. # reveal:evidence_id)
                    if (inkStory.currentTags && typeof onTag === 'function') {
                        inkStory.currentTags.forEach(tag => onTag(tag));
                    }

                    // Narrative flavor: occasionally show detective system processing messages
                    const fillers = [
                        '⚠️ Hyper-vigilance index spiking...',
                        '🔍 Scanning social tone subtext...',
                        '📉 Risk assessment: vulnerability widening.',
                        '🔒 Defensive parsing subroutines active...',
                    ];
                    if (Math.random() > 0.8) {
                        this.addMsg(fillers[Math.floor(Math.random() * fillers.length)], 'npc-filler');
                    }
                }

                // Recurse to handle the next line, or move to choices if finished
                setTimeout(() => this._stepStory(inkStory, onClose, onTag), line ? 450 : 0);
            });
        } else {
            // No more lines. Retrieve choices from the runtime state.
            const choices = inkStory.currentChoices;

            if (choices && choices.length > 0) {
                this.showChoices(choices, (choice) => {
                    this.addMsg(choice.text, 'player');
                    // ink-js: story.ChooseChoiceIndex(index) updates the internal state machine
                    inkStory.ChooseChoiceIndex(choice.index);
                    setTimeout(() => this._stepStory(inkStory, onClose, onTag), 300);
                });
            } else {
                // Terminal node (-> END or -> DONE)
                this.showChoices(
                    [{ text: '🔄 [ CLOSE CONNECTION ]', index: -1 }],
                    () => this.closeDialogue(onClose)
                );
            }
        }
    }

    continueStory(inkStory, onClose, onTag) {
        this._stepStory(inkStory, onClose, onTag);
    }
}
