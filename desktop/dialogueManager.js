/* 
NPCs in levels.js use dialogueId instead of storyFile / hasDialogue.
This map bridges that gap so loadStoryForNPC can normalise the path.
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
    informant_bribe: path + '/act1/case_b_overturned_tables/informant_bribe.json',
    market_rumors: path + '/act1/case_b_overturned_tables/market_rumors.json',
    pontius_pilate: path + '/act1/case_b_overturned_tables/pontius_pilate.json',
    pilates_secretary: path + '/act1/case_b_overturned_tables/pilates_secretary.json',
    pharisee_critique: path + '/act1/case_b_overturned_tables/pharisee_critique.json',
    priest_objection: path + '/act1/case_b_overturned_tables/priest_objection.json',
    rumor_whisper: path + '/act1/case_b_overturned_tables/rumor_whisper.json',
    woman_cloak: path + '/act1/case_b_overturned_tables/woman_cloak.json',

    // Act I Case C: The Barren Fig Tree
    nathan_fig_tree: path + '/extras/nathan_fig_tree.json',
    local_traveler: path + '/extras/local_traveler.json',

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
    andrew_olivet: path + '/extras/andrew_olivet.json',

    // --- Act III: The Passion ---
    // Case A: The Broken Cup (Last Supper)

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
    board_review: path + '/system/board_review.json',
    board_debate: path + '/system/board_debate.json'
};

/**       .chat-hdr
 *         #npc-name-display   ← NPC name
 *         .st                 ← "● ONLINE" status line
 *       #bub-scroll           ← scrollable message list
 *       #bar-choices          ← choice pill buttons (.hide when empty)
 */
export class DialogueManager {
    constructor(audio) {
        this.inkStory = null;
        this.isDialogueOpen = false;
        this.npcStories = {};
        this.inkLib = null;
        this.activeNpc = null;
        this.audio = audio;

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
            return Promise.resolve();
        }
        return fetch(storyFile)
            .then(r => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            })
            .then(data => { this.npcStories[npc.id] = data; })
            .catch(e => console.error(`[DialogueManager] Failed to load story for ${npc.name}:`, e));
    }

    createStory(npcId) {
        if (!this.inkLib) throw new Error('Ink runtime not loaded');
        const data = this.npcStories[npcId];
        if (!data || typeof data !== 'object' || !data.inkVersion) {
            return null;
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
        let displayStr = text;
        if (typeof text === 'object' && text !== null) displayStr = text.text || JSON.stringify(text);
        el.textContent = displayStr;
        bubScroll.appendChild(el);
        bubScroll.scrollTop = bubScroll.scrollHeight;
    }

    /**
     * Show an animated typing indicator, then call cb() after ~600–800 ms.
     * @param {Function} cb
     * @param {string} [npcName]
     */
    addTyping(cb, npcName) {
        const { bubScroll } = this._getEls();
        const displayName = npcName ?? this.activeNpc?.name ?? 'NPC';
        const row = document.createElement('div');
        row.className = 'typing-row';
        row.innerHTML =
            '<div class="dot"></div>' +
            '<div class="dot"></div>' +
            '<div class="dot"></div>' +
            `<span class="typing-lbl">${displayName} is typing…</span>`;
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
        const storyData = this.npcStories[npc.id];
        const isSimple = storyData && !!storyData.start;

        if (!inkStory && !isSimple) {
            console.warn(`[DialogueManager] Aborting dialogue for ${npc.name}: No valid story found (Ink or Simple JSON).`);
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
        const avatarEl = document.getElementById('vn-avatar');
        if (avatarEl) avatarEl.innerText = npc.avatar ?? '?';
        const statusEl = document.getElementById('vn-status');
        if (statusEl) statusEl.textContent = '● ONLINE';

        // Populate header
        const nameEl = document.getElementById('vn-speaker-name');
        if (nameEl) nameEl.innerText = npc.name ?? npc.id;

        // Clear previous messages
        const { bubScroll } = this._getEls();
        bubScroll.innerHTML = '';
        this.showChoices(null, () => { });

        // Show the box
        document.getElementById('vn-overlay').classList.add('active');

        const closeBtn = document.getElementById('vn-close-btn');
        if (closeBtn) closeBtn.onclick = () => this.closeDialogue(onClose);

        if (this.audio) this.audio.playTalk();

        // System handshake message, then start story
        this.addMsg('SECURE CONNECTION ESTABLISHED.', 'system');
        if (inkStory) {
            this._stepStory(inkStory, onClose, onTag);
        } else {
            this._stepSimpleJson(storyData, 'start', onClose, onTag);
        }
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

    /**
     * Interpreter for non-Ink simple JSON branching dialogue.
     */
    _stepSimpleJson(data, nodeId, onClose, onTag) {
        const node = data[nodeId];
        if (!node) {
            this.closeDialogue(onClose);
            return;
        }

        this.showChoices(null, () => { });

        this.addTyping(() => {
            const text = node.content || node.text || '';
            if (text) {
                this.addMsg(text, 'npc');
            }

            // Handle reveal: tags in text (common in custom JSON format)
            if (text.includes('# reveal:')) {
                const tag = text.split('# reveal:')[1]?.trim();
                if (tag && typeof onTag === 'function') onTag('reveal:' + tag);
            }

            // Process manual tags array
            if (node.tags && Array.isArray(node.tags)) {
                node.tags.forEach(t => onTag(t));
            }

            setTimeout(() => {
                const choices = node.choices || [];
                if (choices.length > 0) {
                    this.showChoices(choices, (choice) => {
                        this.addMsg(choice.text, 'player');
                        // Recursively move to the destination node
                        setTimeout(() => this._stepSimpleJson(data, choice.destination, onClose, onTag), 300);
                    });
                } else {
                    // End of simple story
                    this.showChoices(
                        [{ text: '🔄 [ CLOSE CONNECTION ]', destination: null }],
                        () => this.closeDialogue(onClose)
                    );
                }
            }, 600);
        });
    }

    continueStory(inkStory, onClose, onTag) {
        this._stepStory(inkStory, onClose, onTag);
    }
}
