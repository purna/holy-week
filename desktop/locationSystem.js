// ============================================================
// LOCATION SYSTEM — Shared world map, regions, and travel logic
// ============================================================

const LOCATIONS = {
  jerusalem: {
    id: "jerusalem",
    name: "🌿 Triumphal Entry into Jerusalem",
    region: "Jerusalem",
    icon: "🐴",
    color: "#60a5fa",
    fact: "Jesus entered Jerusalem riding on a donkey, fulfilling prophecy.",
    ambiance: "Crowds wave palm branches and shout 'Hosanna!'"
  },
  temple: {
    id: "temple",
    name: "🕍 Temple Courts Confrontation",
    region: "Jerusalem",
    icon: "📜",
    color: "#f59e0b",
    fact: "Religious leaders attempted to trap Jesus with trick questions, but His wisdom silenced them completely.",
    ambiance: "Crowds listening intently, murmuring scribes, and echoing debates in the outer courts."
  },
  upperroom: {
    id: "upperroom",
    name: "🍞 The Last Supper",
    region: "Jerusalem",
    icon: "🍷",
    color: "#34d399",
    fact: "Jesus shared the Passover meal with his disciples and instituted the New Covenant.",
    ambiance: "The upper room is prepared with bread and wine."
  },
  garden: {
    id: "garden",
    name: "✝️ The Resurrection",
    region: "Jerusalem",
    icon: "✨",
    color: "#a78bfa",
    fact: "Jesus rose from the dead on the third day, defeating death.",
    ambiance: "The tomb is empty, and angels announce Jesus is alive."
  },
  galilee: {
    id: "galilee",
    name: "🌊 The Sea of Galilee",
    region: "Galilee",
    icon: "🐟",
    color: "#38bdf8",
    fact: "Jesus appeared to the disciples by the sea and reinstated Peter.",
    ambiance: "The sound of waves and a charcoal fire on the shore."
  }
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

  travelTo(locationId) {
    const loc = this.getLocation(locationId);
    if (!loc) return null;
    this.currentLocation = loc;
    return loc;
  }
}