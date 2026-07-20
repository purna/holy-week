// ============================================================
// LOCATION SYSTEM — Shared world map, regions, and travel logic
// ============================================================

const LOCATIONS = {
  jerusalem: {
    id: "jerusalem",
    name: "🌿 The Triumphal Entry",
    region: "Jerusalem",
    icon: "🐴",
    color: "#60a5fa",
    fact: "Jesus entered Jerusalem riding on a donkey, fulfilling prophecy.",
    ambiance: "Crowds wave palm branches and shout 'Hosanna!'"
  },
  temple: {
    id: "temple",
    name: "🕍 The Temple Courts",
    region: "Jerusalem",
    icon: "📜",
    color: "#f59e0b",
    fact: "Religious leaders attempted to trap Jesus with trick questions, but His wisdom silenced them completely.",
    ambiance: "Crowds listening intently, murmuring scribes, and echoing debates in the outer courts."
  },
  temple_treasury: {
    id: "temple_treasury",
    name: "💰 The Treasury",
    region: "Temple Courts",
    icon: "🪙",
    color: "#facc15",
    fact: "The treasury was located in the Court of the Women, where thirteen trumpet-shaped chests received offerings.",
    ambiance: "The clinking of coins and the quiet footsteps of worshippers."
  },
  temple_inner: {
    id: "temple_inner",
    name: "🏛️ Inner Temple Courts",
    region: "Temple",
    icon: "🕯️",
    color: "#ffffff",
    fact: "The inner courts were reserved for the priesthood and ritual sacrifices.",
    ambiance: "The smell of incense and the chanting of levitical choirs."
  },
  bethany: {
    id: "bethany",
    name: "🏡 Village of Bethany",
    region: "Judea",
    icon: "🏘️",
    color: "#8b7355",
    fact: "Located on the eastern slope of the Mount of Olives, it was the home of Lazarus, Mary, and Martha.",
    ambiance: "Quiet village life mixed with the tension of Temple surveillance."
  },
  bethany_road: {
    id: "bethany_road",
    name: "🛣️ Road to Bethany",
    region: "Judea",
    icon: "🌳",
    color: "#4a5d23",
    fact: "The path Jesus walked daily during His final week, where He taught His disciples through signs.",
    ambiance: "Dusty roads and the rustle of olive trees."
  },
  gethsemane: {
    id: "gethsemane",
    name: "🌿 Garden of Gethsemane",
    region: "Mount of Olives",
    icon: "🌙",
    color: "#1a1a0d",
    fact: "Meaning 'Oil Press,' this garden was a frequent place of prayer for Jesus and His disciples.",
    ambiance: "Night birds and the rustle of ancient olive leaves in the breeze."
  },
  high_priest_palace: {
    id: "high_priest_palace",
    name: "⚖️ Palace of Caiaphas",
    region: "Jerusalem",
    icon: "🔥",
    color: "#3d2b1f",
    fact: "The setting for the illegal midnight assembly of the Sanhedrin.",
    ambiance: "Whispers in the dark and the crackle of a charcoal fire in the courtyard."
  },
  praetorium: {
    id: "praetorium",
    name: "🏛️ The Praetorium",
    region: "Jerusalem",
    icon: "🦅",
    color: "#8b0000",
    fact: "The Roman headquarters in Jerusalem, likely the Fortress of Antonia or Herod's Palace.",
    ambiance: "The rhythmic marching of Roman boots and the cold echoes of stone halls."
  },
  gabbatha: {
    id: "gabbatha",
    name: "🎭 The Stone Pavement",
    region: "Jerusalem",
    icon: "⚖️",
    color: "#444444",
    fact: "Known in Aramaic as Gabbatha, this was where Pilate sat on the judgment seat.",
    ambiance: "The roar of a manipulated crowd demanding a verdict."
  },
  golgotha: {
    id: "golgotha",
    name: "✝️ Calvary",
    region: "Jerusalem",
    icon: "💀",
    color: "#2a1810",
    fact: "The 'Place of the Skull' located outside the city walls.",
    ambiance: "Thunder rolling in a darkened sky and the sound of hammer on iron."
  },
  galilee: {
    id: "galilee",
    name: "🌅 Sea of Galilee",
    region: "Galilee",
    icon: "⛵",
    color: "#4fa3e8",
    fact: "The shore where the Risen Lord shared breakfast with His disciples.",
    ambiance: "Waves lapping against the shore and the smell of fish cooking over coals."
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