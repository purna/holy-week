// ============================================================
// CHAIN MANAGER — Hidden Detective Chains & Typology Rewards
// ============================================================

export const CHAINS = {
  psalm_22_chain: {
    id: 'psalm_22_chain',
    name: 'The Perfect Sacrifice',
    description: 'The complete crucifixion psalm fulfilled scene by scene',
    prophecyIds: ['psalm_22_16_18', 'psalm_22_1_31', 'psalm_69_21'],
    bonusPoints: 25,
    bonusFaith: 10,
    codexEntry: 'Psalm 22 Fulfilled'
  },
  passover_lamb_chain: {
    id: 'passover_lamb_chain',
    name: 'The True Passover Lamb',
    description: 'Jesus follows the Exodus 12 lamb-sacrifice sequence',
    prophecyIds: ['exodus_12_1_14', 'typology_passover_lamb', 'psalm_34_20'],
    bonusPoints: 25,
    bonusFaith: 10,
    codexEntry: 'The True Passover Lamb'
  },
  day_of_atonement_chain: {
    id: 'day_of_atonement_chain',
    name: 'The Greater Atonement',
    description: 'Christ fulfills the dual role of sacrificial lamb and scapegoat',
    prophecyIds: ['isaiah_53_3', 'psalm_2_1_2', 'isaiah_50_6', 'zechariah_12_10'],
    bonusPoints: 25,
    bonusFaith: 10,
    codexEntry: 'The Greater Atonement'
  },
  new_covenant_chain: {
    id: 'new_covenant_chain',
    name: 'Covenant of Blood',
    description: 'The Jeremiah-prophesied new covenant is inaugurated',
    prophecyIds: ['jeremiah_31_31_34', 'typology_melchizedek', 'exodus_12_1_14'],
    bonusPoints: 25,
    bonusFaith: 10,
    codexEntry: 'The New Covenant'
  },
  resurrection_chain: {
    id: 'resurrection_chain',
    name: 'Death Defeated',
    description: "Christ's resurrection fulfills the pattern of Jonah's sign and the hope of resurrection",
    prophecyIds: ['psalm_16_10', 'hosea_6_2', 'jonah_1_17___matthew_12_40', 'isaiah_53_10_11', 'ezekiel_37_12_13', 'psalm_22_1_31'],
    bonusPoints: 25,
    bonusFaith: 10,
    codexEntry: 'Death Defeated'
  }
};

export class ChainManager {
  constructor(caseManager) {
    this.caseManager = caseManager;
    this.completedChains = new Set();
    this.onChainCompleted = null;
  }

  getChainDefinitions() {
    return CHAINS;
  }

  getChainById(chainId) {
    return CHAINS[chainId] || null;
  }

  getAllChains() {
    return Object.values(CHAINS);
  }

  isChainCompleted(chainId) {
    return this.completedChains.has(chainId);
  }

  checkChainCompletion(chainId) {
    const chain = CHAINS[chainId];
    if (!chain) return false;
    if (this.completedChains.has(chainId)) return true;

    const allComplete = chain.prophecyIds.every(prophecyId => {
      const status = this.caseManager.getCodexStatus(prophecyId);
      return status === 'complete';
    });

    if (allComplete) {
      this.completedChains.add(chainId);
      this.caseManager.recordChainCompleted(chainId);
      this.caseManager.addResearchPoints(chain.bonusPoints);
      
      if (this.onChainCompleted) {
        this.onChainCompleted(chain);
      }
      
      return true;
    }
    return false;
  }

  checkAllChains() {
    const results = [];
    for (const chainId of Object.keys(CHAINS)) {
      const completed = this.checkChainCompletion(chainId);
      if (completed) {
        results.push(CHAINS[chainId]);
      }
    }
    return results;
  }

  getCompletedChains() {
    return this.getAllChains().filter(chain => this.completedChains.has(chain.id));
  }

  getChainProgress(chainId) {
    const chain = CHAINS[chainId];
    if (!chain) return { completed: 0, total: 0, percent: 0 };
    
    const completed = chain.prophecyIds.filter(prophecyId => {
      const status = this.caseManager.getCodexStatus(prophecyId);
      return status === 'complete';
    }).length;
    
    return {
      completed,
      total: chain.prophecyIds.length,
      percent: Math.round((completed / chain.prophecyIds.length) * 100)
    };
  }
}
