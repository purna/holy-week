// ============================================================
// NPC SYSTEM — state machines, dialogue, contradiction tracking
// ============================================================

const profilePath = './../assets/characters';

export const PROFILE_ID_MAP = {
  annas: profilePath + "/annas.json",
  martha: profilePath + "/martha.json",
  nicodemus: profilePath + "/nicodemus.json",
  peter: profilePath + "/peter.json",
  mary_magdalene: profilePath + "/mary_magdalene.json",
  joseph_arimathea: profilePath + "/joseph_arimathea.json",
  maluch: profilePath + "/maluch.json",
  bethesda_witness: profilePath + "/bethesda_witness.json",
  mount_teacher: profilePath + "/mount_teacher.json",
  simon_leper: profilePath + "/simon_leper.json",
  john_mark: profilePath + "/john_mark.json",
  rhoda: profilePath + "/rhoda.json",
  judas: profilePath + "/judas.json",
  malchus: profilePath + "/malchus.json",
  garrison_guard: profilePath + "/garrison_guard.json",
  pilate_secretary: profilePath + "/pilate_secretary.json",
  thomas: profilePath + "/thomas.json",
  nathanael_disciple: profilePath + "/nathanael_disciple.json",
  barabbas: profilePath + "/barabbas.json",
  centurion_longinus: profilePath + "/centurion_longinus.json",
  pashhur: profilePath + "/pashhur.json",
  john_apostle: profilePath + "/john_apostle.json",
  tobias_owner: profilePath + "/tobias_owner.json",
  jemimah: profilePath + "/jemimah.json",
  eleazar: profilePath + "/eleazar.json",
  malachi_moneychanger: profilePath + "/malachi_moneychanger.json",
  trial_rumors: profilePath + "/trial_rumors.json",
  samuel_scribe: profilePath + "/samuel_scribe.json",
  nathanael_pharisee: profilePath + "/nathanael_pharisee.json",
  caiaphas: profilePath + "/caiaphas.json",
  market_informant: profilePath + "/market_informant.json",
  market_vendor: profilePath + "/market_vendor.json",
  pontius_pilate: profilePath + "/pontius_pilate.json",
  simon_pharisee: profilePath + "/simon_pharisee.json",
  temple_priest: profilePath + "/temple_priest.json",
  city_gossip: profilePath + "/city_gossip.json",
  displaced_merchant: profilePath + "/displaced_merchant.json",
  devout_follower: profilePath + "/devout_follower.json",
  sadducee_authority: profilePath + "/sadducee_authority.json",
  ananias_witness: profilePath + "/ananias_witness.json",
  temple_merchant: profilePath + "/temple_merchant.json",
  upper_room_prep: profilePath + "/upper_room_prep.json",
  secret_visit: profilePath + "/secret_visit.json",
  simon_cyrene: profilePath + "/simon_cyrene.json",
  nathan_gardener: profilePath + "/nathan_gardener.json",
  andrew_disciple: profilePath + "/andrew_disciple.json",
  local_traveler: profilePath + "/local_traveler.json",
  rich_young_ruler: profilePath + "/rich_young_ruler.json",
  judas_iscariot: profilePath + "/judas.json",
  malchus_servant: profilePath + "/malchus.json",
  roman_soldier: profilePath + "/execution_soldier.json",
  penitent_thief: profilePath + "/penitent_thief.json",
  execution_guard: profilePath + "/execution_guard.json",
  hillel_scribe: profilePath + "/hillel_scribe.json",
  mary_bethany: profilePath + "/mary_bethany.json",
};

const characterModelPath = './../assets/models/characters';

export const CHARACTER_MODEL_MAP = {
  annas: characterModelPath + "/annas.glb",
  andrew: characterModelPath + "/andrew.glb",
  andrew_disciple: characterModelPath + "/andrew_disciple.glb",
  ananias_witness: characterModelPath + "/ananias.glb",
  barabbas: characterModelPath + "/barabbas.glb",
  bethesda_witness: characterModelPath + "/bethesda_witness.glb",
  caiaphas: characterModelPath + "/caiaphas.glb",
  centurion_longinus: characterModelPath + "/centurion_longinus.glb",
  city_gossip: characterModelPath + "/city_gossip.glb",
  claudia_procula: characterModelPath + "/claudia_procula.glb",
  devout_follower: characterModelPath + "/devout_follower.glb",
  displaced_merchant: characterModelPath + "/displaced_merchant.glb",
  eleazar: characterModelPath + "/eleazar.glb",
  execution_soldier: characterModelPath + "/execution_soldier.glb",
  galilean_pilgrim: characterModelPath + "/galilean_pilgrim.glb",
  hillel_scribe: characterModelPath + "/hillel_scribe.glb",
  jemimah: characterModelPath + "/jemimah.glb",
  jerusalem_local: characterModelPath + "/jerusalem_local.glb",
  john_apostle: characterModelPath + "/john_apostle.glb",
  john_mark: characterModelPath + "/john_mark.glb",
  joseph_arimathea: characterModelPath + "/joseph_arimathea.glb",
  judas: characterModelPath + "/judas.glb",
  judas_betrayal: characterModelPath + "/judas_betrayal.glb",
  local_traveler: characterModelPath + "/local_traveler.glb",
  malachi_moneychanger: characterModelPath + "/malachi_moneychanger.glb",
  malchus: characterModelPath + "/malchus.glb",
  marcus: characterModelPath + "/marcus.glb",
  market_informant: characterModelPath + "/market_informant.glb",
  market_vendor: characterModelPath + "/market_vendor.glb",
  martha: characterModelPath + "/martha.glb",
  mary_bethany: characterModelPath + "/mary_bethany.glb",
  mary_magdalene: characterModelPath + "/mary_magdalene.glb",
  mary_resurrection: characterModelPath + "/mary_resurrection.glb",
  mount_teacher: characterModelPath + "/mount_teacher.glb",
  nathan_gardener: characterModelPath + "/nathan_gardener.glb",
  nathanael_disciple: characterModelPath + "/nathanael_disciple.glb",
  nathanael_pharisee: characterModelPath + "/nathanael_pharisee.glb",
  nicodemus: characterModelPath + "/nicodemus.glb",
  pashhur: characterModelPath + "/pashhur.glb",
  peter: characterModelPath + "/peter.glb",
  peter_restored: characterModelPath + "/peter_restored.glb",
  peter_simple_defense: characterModelPath + "/peter_simple_defense.glb",
  pilates_secretary: characterModelPath + "/pilates_secretary.glb",
  pontius_pilate: characterModelPath + "/pontius_pilate.glb",
  rhoda: characterModelPath + "/rhoda.glb",
  rich_young_ruler: characterModelPath + "/rich_young_ruler.glb",
  sadducee_authority: characterModelPath + "/sadducee_authority.glb",
  samuel_scribe: characterModelPath + "/samuel_scribe.glb",
  secret_visit: characterModelPath + "/secret_visit.glb",
  senior_scribe: characterModelPath + "/senior_scribe.glb",
  sentry_lucas: characterModelPath + "/sentry_lucas.glb",
  simon_cyrene: characterModelPath + "/simon_cyrene.glb",
  simon_leper: characterModelPath + "/simon_leper.glb",
  simon_pharisee: characterModelPath + "/simon_pharisee.glb",
  temple_merchant: characterModelPath + "/temple_merchant.glb",
  temple_priest: characterModelPath + "/temple_priest.glb",
  temple_spy: characterModelPath + "/temple_spy.glb",
  thomas: characterModelPath + "/thomas.glb",
  tobias_owner: characterModelPath + "/tobias_owner.glb",
  trial_rumors: characterModelPath + "/trial_rumors.glb",
  upper_room_prep: characterModelPath + "/upper_room_prep.glb",
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

    const npcReactions = npc.genericReactions || {
      physical: "Hmm. I'm not sure how that connects to me.",
      testimonial: "That's not what I said at all.",
      digital: "I don't know anything about that data.",
      environmental: "The environment? Could be anyone.",
      analytical: "Numbers can be misleading, you know.",
      prophecy: "A prophecy fulfilled? I see the connection now.",
    };

    const text = npcReactions[evidence.type] || "Interesting. So what?";
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
