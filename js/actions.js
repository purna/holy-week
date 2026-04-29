import { actions as actionDefs } from './config.js';
import { quests } from './config.js';

export class ActionManager {
    constructor() {
        this.actions = [...actionDefs];
        this.pendingFloatingIcon = null;
    }

    getActions() {
        return this.actions;
    }

    executeAction(action, activeNpc, updateUI, playSoundFunc, playQuestSound) {
        if (playSoundFunc) playSoundFunc();

        this.showFloatingActionIcon(action.icon);

        let questCompleted = false;

        if (activeNpc && activeNpc.data.questId !== undefined) {
            const quest = quests[activeNpc.data.questId];
            const actionQuestMap = {
                'scan': 'RECON',
                'repair': 'CELLS',
                'hack': 'SHARDS',
                'heal': 'VISIT'
            };

            if (actionQuestMap[action.type] === quest.id) {
                quest.cur = quest.tar;
                quest.completed = true;
                questCompleted = true;
                if (playQuestSound) playQuestSound();
            }
        }

        if (!questCompleted) {
            this.performActionLogic(action);
        }

        updateUI();

        if (action.consumable) {
            const index = this.actions.indexOf(action);
            if (index > -1) {
                this.actions.splice(index, 1);
            }
        }

        return questCompleted;
    }

    performActionLogic(action) {
        switch (action.type) {
            case 'scan':
                console.log('Performing scan action');
                break;
            case 'repair':
                console.log('Performing repair action');
                break;
            case 'hack':
                console.log('Performing hack action');
                break;
            case 'heal':
                console.log('Performing heal action');
                break;
            default:
                console.log(`Performing ${action.name} action`);
                break;
        }
    }

    showFloatingActionIcon(iconClass) {
        this.pendingFloatingIcon = iconClass;
    }

    renderFloatingIcon(camera, playerPosition) {
        if (this.pendingFloatingIcon) {
            const icon = document.createElement('i');
            icon.className = `${this.pendingFloatingIcon} floating-action-icon`;

            const playerScreenPos = playerPosition.project(camera);
            const startX = (playerScreenPos.x * 0.5 + 0.5) * window.innerWidth;
            const startY = (playerScreenPos.y * -0.5 + 0.5) * window.innerHeight;
            icon.style.left = `${startX}px`;
            icon.style.top = `${startY}px`;

            icon.style.transform = 'translate(0, 0) scale(2)';
            icon.style.opacity = '1';

            document.body.appendChild(icon);

            let startTime = null;
            const duration = 3000;
            const travelDistance = 500;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const scale = 2 - progress;
                const translateY = -travelDistance * progress;
                icon.style.transform = `translate(0, ${translateY}px) scale(${scale})`;

                let opacity;
                if (progress < 0.2) {
                    opacity = 1;
                } else if (progress < 0.6) {
                    opacity = 1 - ((progress - 0.2) / 0.4);
                } else {
                    opacity = 0;
                }
                icon.style.opacity = opacity;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(icon);
                }
            };

            requestAnimationFrame(animate);
            this.pendingFloatingIcon = null;
        }
    }
}
