import { npcs } from './config.js';

/**
 * DialogueManager
 *
 * Handles loading Ink story JSON files and driving the WhatsApp-style
 * chat-bubble dialogue UI introduced in whatsapp2.html.
 *
 * Key changes vs. original:
 *   - continueStory() no longer writes to a flat #bubble-text element.
 *     Instead it calls appendMessage() to add .msg-bubble elements into
 *     #bubble-text-container (provided via the `appendMessage` callback).
 *   - Player choice selection echoes the choice text as a 'player' bubble
 *     before advancing the Ink story.
 *   - Ambient filler messages are shown between NPC lines via showFiller().
 *   - Choice buttons use CSS class "choice-btn" (styled as pills in index.html).
 */
export class DialogueManager {
    constructor() {
        this.inkStory = null;
        this.isDialogueOpen = false;
        this.npcStories = {};
        this.inkLib = null;
        this.activeNpc = null;
    }

    setInkLib(lib) {
        this.inkLib = lib;
    }

    setActiveNPC(npc) {
        this.activeNpc = npc;
    }

    setDialogueOpen(state) {
        this.isDialogueOpen = state;
    }

    loadAllStories() {
        return Promise.all(npcs.map(npc => this.loadStoryForNPC(npc)));
    }

    loadStoryForNPC(npc) {
        if (!npc.hasDialogue || !npc.storyFile) return Promise.resolve();

        return fetch(npc.storyFile)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(storyData => {
                if (!storyData.inkVersion) {
                    throw new Error('Invalid Ink JSON: missing inkVersion field');
                }
                this.npcStories[npc.id] = storyData;
                console.log(`Loaded story for ${npc.name} (Ink v${storyData.inkVersion})`);
            })
            .catch(e => console.error(`Failed to load story for ${npc.name}:`, e));
    }

    createStory(npcId) {
        if (!this.inkLib) throw new Error('Ink runtime not loaded');
        const storyData = this.npcStories[npcId];
        if (!storyData) throw new Error('Story data not found');
        return new this.inkLib.Story(storyData);
    }

    /**
     * Drive the Ink story one step forward using the WhatsApp-style UI.
     *
     * @param {object}   inkStory       - Active inkjs Story instance
     * @param {Function} appendMessage  - fn(text, 'npc'|'player') → appends a bubble
     * @param {Function} showFiller     - fn(count) → shows ambient filler bubbles
     * @param {Element}  choiceEl       - #bubble-choices container
     * @param {object}   uiSounds       - optional (not used directly; kept for API compat)
     * @param {Function} onClose        - called when the player closes the dialogue
     */
    continueStory(inkStory, appendMessage, showFiller, choiceEl, uiSounds, onClose) {
        // Collect all pending Ink text
        let txt = "";
        while (inkStory.canContinue) txt += inkStory.Continue();

        const cleaned = this.stripInkMarkers(txt);
        choiceEl.innerHTML = "";

        // Append the NPC's lines as a chat bubble, then show filler activity
        if (cleaned.trim()) {
            appendMessage(cleaned.trim(), 'npc');
            showFiller(3);
        }

        // Delay choice rendering until after filler messages appear
        const renderDelay = cleaned.trim() ? 3 * 300 + 100 : 0;

        setTimeout(() => {
            choiceEl.innerHTML = "";

            inkStory.currentChoices.forEach(c => {
                const b = document.createElement('button');
                b.className = "choice-btn";
                b.innerText = c.text;
                b.onclick = () => {
                    // Echo player's choice as a right-aligned bubble
                    appendMessage(c.text, 'player');
                    inkStory.ChooseChoiceIndex(c.index);
                    // Small delay before NPC response (feels more natural)
                    setTimeout(() => {
                        this.continueStory(inkStory, appendMessage, showFiller, choiceEl, uiSounds, onClose);
                    }, 400);
                };
                choiceEl.appendChild(b);
            });

            // End of story
            if (inkStory.currentChoices.length === 0 && !inkStory.canContinue) {
                const b = document.createElement('button');
                b.className = "choice-btn";
                b.innerText = "[CLOSE CONNECTION]";
                b.onclick = () => onClose();
                choiceEl.appendChild(b);
            }
        }, renderDelay);
    }

    stripInkMarkers(s) {
        if (!s) return '';
        const rawLines = s.split(/\r?\n/);
        const out = [];
        for (let line of rawLines) {
            let l = (line || '').trim();
            if (l === '#' || l === '/#') continue;
            if (l.startsWith('^')) l = l.slice(1).trim();
            if (l.startsWith('#')) l = l.slice(1).trim();
            if (l) out.push(l);
        }
        return out.join('\n');
    }

    getStory(npcId) {
        return this.npcStories[npcId];
    }
}
