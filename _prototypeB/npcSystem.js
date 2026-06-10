// ============================================================
// NPC SYSTEM — state machines, dialogue, contradiction tracking
// ============================================================

const path = './../characters';

export const PROFILE_ID_MAP = {
  annas: path + "/annas.json",
  martha: path + "/martha.json",
  nicodemus: path + "/nicodemus.json",
  peter: path + "/peter.json",
  mary_magdalene: path + "/mary_magdalene.json",
  joseph_arimathea: path + "/joseph_arimathea.json",
  maluch: path + "/maluch.json",
  bethesda_witness: path + "/bethesda_witness.json",
  mount_teacher: path + "/mount_teacher.json",
  simon_leper: path + "/simon_leper.json",
  john_mark: path + "/john_mark.json",
  rhoda: path + "/rhoda.json",
  judas: path + "/judas.json",
  malchus: path + "/malchus.json",
  garrison_guard: path + "/garrison_guard.json",
  pilate_secretary: path + "/pilate_secretary.json",
  thomas: path + "/thomas.json",
  nathanael_disciple: path + "/nathanael_disciple.json",
  barabbas: path + "/barabbas.json",
  centurion_longinus: path + "/centurion_longinus.json",
  pashhur: path + "/pashhur.json",
  john_apostle: path + "/john_apostle.json",
  tobias_owner: path + "/tobias_owner.json",
  jemimah: path + "/jemimah.json",
  eleazar: path + "/eleazar.json",
  malachi_moneychanger: path + "/malachi_moneychanger.json",
  trial_rumors: path + "/trial_rumors.json",
  samuel_scribe: path + "/samuel_scribe.json",
  nathanael_pharisee: path + "/nathanael_pharisee.json",
  caiaphas: path + "/caiaphas.json",
  market_informant: path + "/market_informant.json",
  market_vendor: path + "/market_vendor.json",
  pontius_pilate: path + "/pontius_pilate.json",
  simon_pharisee: path + "/simon_pharisee.json",
  temple_priest: path + "/temple_priest.json",
  city_gossip: path + "/city_gossip.json",
  displaced_merchant: path + "/displaced_merchant.json",
  devout_follower: path + "/devout_follower.json",
  sadducee_authority: path + "/sadducee_authority.json",
  ananias_witness: path + "/ananias_witness.json",
  temple_merchant: path + "/temple_merchant.json",
  upper_room_prep: path + "/upper_room_prep.json",
  secret_visit: path + "/secret_visit.json",
  simon_cyrene: path + "/simon_cyrene.json"
};

class CharacterLoader {
  constructor() {
    this.cache = new Map();
  }

  async loadProfile(url) {
    if (this.cache.has(url)) return this.cache.get(url);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      this.cache.set(url, data);
      return data;
    } catch (e) {
      console.error(`[CharacterLoader] Failed to load profile: ${url}`, e);
      return null;
    }
  }
}

export class NPCSystem {
  constructor(caseManager, evidenceSystem) {
    this.caseManager = caseManager;
    this.es = evidenceSystem;
    this.loader = new CharacterLoader();
    this.npcStates = {};
  }

  async loadCase(caseData) {
    this.npcStates = {};

    for (const npc of (caseData.npcs || [])) {
      if (!npc) continue;
      let pFile = npc.profileFile;
      // Resolve ID reference if it doesn't look like a direct path
      if (pFile && !pFile.includes('/') && !pFile.endsWith('.json')) {
        pFile = PROFILE_ID_MAP[pFile] || pFile;
      }
      if (pFile) {
        const profile = await this.loader.loadProfile(pFile);
        if (profile) {
          // Merge profile data, allowing case-specific NPC fields to override shared profile defaults
          Object.assign(npc, { ...profile, ...npc });
        }
      }

      this.npcStates[npc.id] = {
        mood: "neutral",
        pressureLevel: 0,
        contradictions: [],
        memory: [],
        hasFailedChallenge: false,
        correctedLies: [],
      };
    }
  }

  getNPCs() {
    const c = this.caseManager.getActiveCase();
    return c ? c.npcs : [];
  }

  getNPC(id) {
    return this.getNPCs().find(n => n.id === id) || null;
  }

  getState(npcId) {
    return this.npcStates[npcId] || null;
  }

  // Basic greeting / question response
  talk(npcId) {
    const npc = this.getNPC(npcId);
    const state = this.getState(npcId);
    if (!npc || !state) return null;

    const mood = state.mood;
    const node = npc.dialogue[mood] || npc.dialogue.neutral;

    // Automatically unlock suspects associated with this NPC upon talking
    if (npc.unlocksSuspects) {
      npc.unlocksSuspects.forEach(sid => this.caseManager.unlockSuspect(sid));
    }

    // Handle object-based dialogue with lie/correction logic
    if (node && typeof node === 'object' && node.text) {
      const isCorrected = state.correctedLies.includes(mood);
      const text = isCorrected ? (node.correction || node.text) : node.text;

      this._addMemory(npcId, { type: "talk", mood, isLie: node.isLie && !isCorrected });
      return {
        speaker: npc.name,
        text,
        mood,
        isLie: node.isLie && !isCorrected,
        wasCorrected: isCorrected
      };
    }

    this._addMemory(npcId, { type: "talk", mood });
    return { speaker: npc.name, text: node, mood };
  }

  // Show evidence to NPC — they react based on their role + truthfulness
  showEvidence(npcId, evidenceId) {
    const npc = this.getNPC(npcId);
    const state = this.getState(npcId);
    const evidence = this.es.getById(evidenceId);
    if (!npc || !state || !evidence) return null;

    // Already shown?
    if (state.memory.includes(evidenceId)) {
      return { speaker: npc.name, text: npc.dialogue.repeat || "I already told you what I know about that.", mood: state.mood };
    }

    state.memory.push(evidenceId);

    // Look for a specific reaction
    const reaction = npc.reactions?.[evidenceId];
    if (reaction) {
      // Reactions can also trigger suspect unlocks
      if (reaction.unlocksSuspects) {
        reaction.unlocksSuspects.forEach(sid => this.caseManager.unlockSuspect(sid));
      }

      if (reaction.isLie && npc.id === this.caseManager.getActiveCase()?.truth?.culprit) {
        state.pressureLevel = Math.min(100, state.pressureLevel + 25);
        this._updateMood(npcId, state);
      }
      this._addMemory(npcId, { type: "shown_evidence", evidenceId, reaction: reaction.text });
      return { speaker: npc.name, text: reaction.text, mood: state.mood, revealedClue: reaction.revealedClue || null };
    }

    // Generic reaction by type
    const genericReactions = {
      physical: "Hmm. I'm not sure how that connects to me.",
      testimonial: "That's not what I said at all.",
      digital: "I don't know anything about that data.",
      environmental: "The environment? Could be anyone.",
      analytical: "Numbers can be misleading, you know.",
    };

    const text = genericReactions[evidence.type] || "Interesting. So what?";
    this._addMemory(npcId, { type: "shown_evidence", evidenceId, reaction: text });
    return { speaker: npc.name, text, mood: state.mood };
  }

  // Challenge NPC with a contradiction between two evidence items
  challenge(npcId, evidenceAId, evidenceBId) {
    const npc = this.getNPC(npcId);
    const state = this.getState(npcId);
    if (!npc || !state) return null;

    const key = `${evidenceAId}+${evidenceBId}`;
    const contradiction = npc.contradictions?.[key] || npc.contradictions?.[`${evidenceBId}+${evidenceAId}`];

    if (contradiction) {
      state.pressureLevel = Math.min(100, state.pressureLevel + 40);
      state.contradictions.push(key);
      this._updateMood(npcId, state);

      // Check if this contradiction corrects a lying dialogue node
      let correctedNode = null;
      if (contradiction.corrects && !state.correctedLies.includes(contradiction.corrects)) {
        state.correctedLies.push(contradiction.corrects);
        correctedNode = contradiction.corrects;
      }

      // Reputation Bonus for precise investigation
      if (!state.hasFailedChallenge && npc.faction) {
        this.caseManager.updateReputation(npc.faction, 5);
      }

      this.caseManager.recordBreakthrough(npcId, key);

      return {
        speaker: npc.name,
        text: contradiction.exposed,
        mood: state.mood,
        breakthrough: true,
        correctedNode
      };
    }

    // Failure Logic
    state.hasFailedChallenge = true;
    state.pressureLevel = Math.min(100, state.pressureLevel + 5);
    this._updateMood(npcId, state);

    if (typeof this.caseManager.updateDoubt === 'function') {
      this.caseManager.updateDoubt(10);
    }
    if (npc.faction && typeof this.caseManager.updateReputation === 'function') {
      this.caseManager.updateReputation(npc.faction, -15);
    }
    if (typeof this.caseManager.recordFailedChallenge === 'function') {
      this.caseManager.recordFailedChallenge();
    }

    return {
      speaker: npc.name,
      text: npc.dialogue.noContradiction || `No contradiction found between "${this.es.getById(evidenceAId)?.name || evidenceAId}" and "${this.es.getById(evidenceBId)?.name || evidenceBId}". Try a different pairing.`,
      mood: state.mood,
      breakthrough: false
    };
  }

  _updateMood(npcId, state) {
    if (state.pressureLevel >= 80) state.mood = "exposed";
    else if (state.pressureLevel >= 50) state.mood = "pressured";
    else if (state.pressureLevel >= 25) state.mood = "cautious";
  }

  _addMemory(npcId, entry) {
    if (this.npcStates[npcId]) {
      this.npcStates[npcId].memory.push(entry);
    }
  }

  getMoodColor(mood) {
    return { neutral: "#94a3b8", cautious: "#fbbf24", pressured: "#f97316", exposed: "#ef4444", friendly: "#34d399" }[mood] || "#94a3b8";
  }

  getMoodLabel(mood) {
    return { neutral: "Calm", cautious: "Uneasy", pressured: "Nervous", exposed: "Rattled", friendly: "Helpful" }[mood] || mood;
  }
}
