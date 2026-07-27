// ============================================================
// LOCATION SYSTEM — Shared world map, regions, and travel logic
// ============================================================

const LOCATIONS = {
  jerusalem: {
    id: "jerusalem",
    name: "<img src='../assets/gfx/leaf-duotone.svg' class='icon-svg' loading='lazy'> The Triumphal Entry",
    region: "Jerusalem",
    icon: '../assets/gfx/horse-duotone.svg',
    color: "#60a5fa",
    fact: "Jesus entered Jerusalem riding on a donkey, fulfilling prophecy.",
    ambiance: "Crowds wave palm branches and shout 'Hosanna!'"
  },
  temple: {
    id: "temple",
    name: "<img src='../assets/gfx/church-duotone.svg' class='icon-svg' loading='lazy'> The Temple Courts",
    region: "Jerusalem",
    icon: '../assets/gfx/scroll-duotone.svg',
    color: "#f59e0b",
    fact: "Religious leaders attempted to trap Jesus with trick questions, but His wisdom silenced them completely.",
    ambiance: "Crowds listening intently, murmuring scribes, and echoing debates in the outer courts."
  },
  upperroom: {
    id: "upperroom",
    name: "<img src='../assets/gfx/bread-duotone.svg' class='icon-svg' loading='lazy'> The Last Supper",
    region: "Jerusalem",
    icon: '../assets/gfx/wine-duotone.svg',
    color: "#34d399",
    fact: "Jesus shared the Passover meal with his disciples and instituted the New Covenant.",
    ambiance: "The upper room is prepared with bread and wine."
  },
  garden: {
    id: "garden",
    name: "<img src='../assets/gfx/cross-duotone.svg' class='icon-svg' loading='lazy'> The Resurrection",
    region: "Jerusalem",
    icon: '../assets/gfx/sparkles-duotone.svg',
    color: "#a78bfa",
    fact: "Jesus rose from the dead on the third day, defeating death.",
    ambiance: "The tomb is empty, and angels announce Jesus is alive."
  },
};

export class LocationSystem {
  constructor(caseManager) {
    this.caseManager = caseManager;
    this.currentLocation = null;
  }

  getLocation(id) {
    return LOCATIONS[id] || null;
  }

  getAllLocations() {
    return Object.values(LOCATIONS);
  }

  getMapData() {
    const allCases = this.caseManager.getAllCases();
    const unlocked = this.caseManager.getUnlockedCases().map(c => c.id);

    return this.getAllLocations().map(loc => {
      const assignedCases = allCases.filter(c => c.location === loc.id);
      const activeCases = assignedCases.filter(c => unlocked.includes(c.id));
      const solvedCases = assignedCases.filter(c => this.caseManager.getCaseProgress(c.id)?.solved);

      return {
        ...loc,
        cases: assignedCases,
        activeCases,
        solvedCases,
        isUnlocked: activeCases.length > 0,
        allSolved: assignedCases.length > 0 && solvedCases.length === assignedCases.length,
      };
    });
  }
}