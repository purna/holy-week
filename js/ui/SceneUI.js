import { getIntroHtml, getIntroText } from "../utils.js";

export class SceneUI {
    constructor(caseManager, evidenceSystem, accessibility, ui) {
        this.cm = caseManager;
        this.es = evidenceSystem;
        this.a11y = accessibility;
        this.ui = ui;
    }

    render() {
        const c = this.cm.getActiveCase();
        if (!c) return '';

        const introText = getIntroText(c.intro) || c.subtitle;
        const introMarkup = this.a11y.getAll().simple_mode
            ? `<p class="scene-intro">${this.a11y.simplify(introText)}</p>`
            : getIntroHtml(c.intro, c.subtitle);

        return `
            <h3 class="section-title">Crime Scene</h3>
            <div class="prophecy-scene-intro">Examine the scene and tap glowing objects to collect evidence for your investigation.</div>
            ${introMarkup}
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

    openNPCChat(npcId) {
        const npc = this.ui.ns.getNPC(npcId);
        if (!npc) return;

        this.ui.dm.setActiveNPC(npc);
        const c = this.ui.cm.getActiveCase();
        const caseId = c?.id || this.ui.cm.activeCaseId || null;
        const loadedStory = this.ui.dm.getStory(npcId, caseId);

        const handleUnlocks = () => {
            let count = 0;

            if (Array.isArray(npc?.unlocksEvidence)) {
                npc.unlocksEvidence.forEach(id => {
                    const alreadyCollected = typeof this.ui.es.isCollected === "function" ? this.ui.es.isCollected(id) : false;
                    if (alreadyCollected) return;
                    const discovered = this.ui.es.discover(id);
                    const evidence = discovered || (typeof this.ui.es.getById === "function" ? this.ui.es.getById(id) : null);
                    this.ui.peopleUI.addSystem(`🔓 New clue: ${evidence?.name || id}`, npcId);
                    count++;
                });
            }

            if (npc?.revealsProphecy) {
                const prophecy = this.ui.es.getProphecyById(npc.revealsProphecy);
                if (prophecy) {
                    const caseProgress = this.ui.cm.getCaseProgress?.(caseId);
                    const alreadyFound = caseProgress?.propheciesFound?.includes(npc.revealsProphecy);
                    if (!alreadyFound) {
                        this.ui.npcs?.caseManager?.recordProphecyFound?.(npc.revealsProphecy);
                        this.ui.peopleUI.addSystem(`🔮 Prophecy Revealed: ${prophecy.reference}`, npcId);
                        count++;
                    }
                }
            }

            if (Array.isArray(npc?.unlocksSuspects)) {
                npc.unlocksSuspects.forEach(suspectId => {
                    const cm = this.ui.npcs?.caseManager;
                    const wasUnlocked = typeof cm?.isSuspectUnlocked === "function" ? cm.isSuspectUnlocked(suspectId) : false;

                    if (typeof this.ui.npcs.unlockSuspect === "function") {
                        this.ui.npcs.unlockSuspect(suspectId);
                    }
                    if (typeof cm?.discoverSuspect === "function") cm.discoverSuspect(suspectId);
                    else if (typeof cm?.unlockSuspect === "function") cm.unlockSuspect(suspectId);

                    const isUnlocked = typeof cm?.isSuspectUnlocked === "function" ? cm.isSuspectUnlocked(suspectId) : !!this.ui.npcs.getState?.(suspectId)?.isSuspectUnlocked;
                    if (!isUnlocked || wasUnlocked) return;

                    if (this.ui.onChatAction) {
                        this.ui.onChatAction({ type: "reveal_suspect", suspectId, npcId });
                    }

                    const suspect = this.ui.ns.getNPC(suspectId);
                    this.ui.peopleUI.addSystem(`⚖️ New suspect identified: ${suspect ? suspect.name : suspectId}`, npcId);
                    count++;
                });
            }

            return count;
        };

        if (loadedStory) {
            const story = this.ui.dm.createStory(npcId, caseId);
            this.ui.dm.openDialogue(npc, story,
                () => {
                    const unlocked = handleUnlocks();
                    const peopleView = document.getElementById("inv-people");
                    if (peopleView) this.ui.peopleUI._refreshNPCFeed(npcId, peopleView);
                    if (this.ui.onChatAction) this.ui.onChatAction({ type: "talk_complete", npcId, unlocked });
                },
                (text, type) => this.ui.peopleUI.addMessage(type === 'player' ? 'Investigator' : npc.name, text, type, {}, npcId)
            );
        } else {
            const talkFn = (typeof this.ui.ns.talkProgressive === "function" && this.ui.ns.talkProgressive.bind(this.ui.ns)) ||
                           (typeof this.ui.ns.talk === "function" && this.ui.ns.talk.bind(this.ui.ns));
            const result = talkFn ? talkFn(npcId) : null;
            if (result) {
                const unlocked = handleUnlocks();
                this.ui.peopleUI.addMessage(result.speaker, result.text, "npc", { wasCorrected: result.wasCorrected }, npcId);
                const peopleView = document.getElementById("inv-people");
                if (peopleView) this.ui.peopleUI._refreshNPCFeed(npcId, peopleView);
                if (this.ui.onChatAction) this.ui.onChatAction({ type: "talk_complete", npcId, unlocked });
            }
        }
    }
}