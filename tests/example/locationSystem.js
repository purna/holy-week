// ============================================================
// LOCATION SYSTEM — world map, regions, unlocks, travel
// ============================================================

export const LOCATIONS = {
  school: {
    id: "school",
    name: "Westbrook School",
    region: "Town",
    icon: "🏫",
    coords: { x: 28, y: 62 },   // % on map SVG
    color: "#60a5fa",
    fact: "Schools keep attendance logs, CCTV records, and locker assignments — all useful evidence.",
    ambiance: "Hallway chatter echoes. Lockers slam. A bell rings in the distance.",
  },
  museum: {
    id: "museum",
    name: "City Museum",
    region: "City Centre",
    icon: "🏛",
    coords: { x: 48, y: 45 },
    color: "#f59e0b",
    fact: "Museums use laser grids, weight sensors, and security logs. Thieves must bypass all three.",
    ambiance: "Polished floors reflect dim exhibition lights. A guard yawns at the door.",
  },
  harbour: {
    id: "harbour",
    name: "East Harbour",
    region: "Docks",
    icon: "⚓",
    coords: { x: 72, y: 70 },
    color: "#34d399",
    fact: "Ports log every cargo shipment. Manifests, weigh-bills, and crew lists are public record.",
    ambiance: "Salt air. Foghorns. Crates being moved in the early morning dark.",
  },
  tech_district: {
    id: "tech_district",
    name: "Silicon Quarter",
    region: "Tech District",
    icon: "🏙",
    coords: { x: 55, y: 28 },
    color: "#a78bfa",
    fact: "Tech companies store data exhaust: logins, API calls, access badges, and server logs.",
    ambiance: "Neon signs. Glass towers. A courier drops a package and leaves without signing.",
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

  // Returns locations with their unlock status + case assignment
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

  getCasesAtLocation(locationId) {
    return this.caseManager.getAllCases().filter(c => c.location === locationId);
  }

  getUnlockedCasesAtLocation(locationId) {
    return this.caseManager.getUnlockedCases().filter(c => c.location === locationId);
  }
}
