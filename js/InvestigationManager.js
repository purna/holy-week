import { evidenceSystem } from './EvidenceSystem.js';

/**
 * Determines contextual NPC actions (Talk, Challenge, Accuse)
 * based on gathered evidence and the current Act.
 */
export class InvestigationManager {
    constructor() {
        // Mapping NPCs to the evidence that 'breaks' their testimony
        this.challengeMatrix = {
            'merchant': 'temple_corruption',
            'simon_pharisee': 'healing_testimony',
            'centurion_claudius': 'prophecy_fulfilled',
            'centurion_witness': 'pierced_spear',
            'sentry_lucas': 'bribe_shekels',
            'healed_man': 'healing_testimony'
        };
    }

    /**
     * Returns valid interaction modes for a nearby NPC.
     */
    getModes(npcId, currentAct) {
        const modes = [
            { id: 'talk', label: '[E] TALK', key: 'e' }
        ];

        // Check for Challenge availability
        const requiredEvidence = this.challengeMatrix[npcId];
        if (requiredEvidence && evidenceSystem.has(requiredEvidence)) {
            modes.push({ id: 'challenge', label: '[Q] CHALLENGE', key: 'q' });
        }

        // Enable Accuse for all active investigation acts (Acts 1 through 10)
        if (currentAct >= 1 && currentAct <= 10) {
            modes.push({ id: 'accuse', label: '[R] ACCUSE', key: 'r' });
        }

        return modes;
    }
}

export const investigationManager = new InvestigationManager();