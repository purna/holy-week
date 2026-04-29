import { npcs } from './config.js';

export class DialogueManager {
    constructor() {
        this.inkStory = null;
        this.isDialogueOpen = false;
        this.npcStories = {}; // story data loaded per NPC
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

    continueStory(inkStory, textEl, choiceEl, uiSounds, onClose) {
        let txt = "";
        while (inkStory.canContinue) txt += inkStory.Continue();

        const cleaned = this.stripInkMarkers(txt);
        textEl.innerHTML = cleaned;
        choiceEl.innerHTML = "";

        inkStory.currentChoices.forEach(c => {
            const b = document.createElement('button');
            b.className = "choice-btn";
            b.innerText = c.text;
            b.onclick = () => {
                inkStory.ChooseChoiceIndex(c.index);
                this.continueStory(inkStory, textEl, choiceEl, uiSounds, onClose);
            };
            choiceEl.appendChild(b);
        });

        if (inkStory.currentChoices.length === 0 && !inkStory.canContinue) {
            const b = document.createElement('button');
            b.className = "choice-btn";
            b.innerText = "[CLOSE CONNECTION]";
            b.onclick = () => {
                onClose();
            };
            choiceEl.appendChild(b);
        }
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
