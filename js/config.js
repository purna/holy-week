// Configuration object - npcs, locations, quests, actions, audio paths
const basePath = './assets/audio/';
const baseNPCPath = './assets/dialogue/';

export const COLORS = {
    cyan: 0x00f2ff,      // Cyan accent
    orange: 0xffaa00,    // Orange accent
    purple: 0xff00ff,    // Purple accent
    green: 0x00ff88,     // Success green
    red: 0xff4444,       // Alert red
    blue: 0x4488ff,      // Info blue
    white: 0xffffff,     // White
    black: 0x000000,     // Black
    gray: 0x888888,      // Neutral gray
    darkGray: 0x333333   // Dark gray
};

// Scene configuration
export const SCENE = {
    background: 0x020205,        // Dark background
    fogColor: 0x020205,          // Fog color
    fogDensity: 0.008,           // Fog density
    ambientLight: 0x404040,      // Ambient light intensity
    ambientIntensity: 1.5,       // Ambient light strength
    sunColor: 0xffffff,          // Sunlight color
    sunIntensity: 2.5,           // Sunlight intensity
    shadowMapSize: 2048          // Shadow map resolution
};

// Planet configuration
export const PLANET = {
    radius: 50,                  // Planet radius
    segments: 5,                 // Geometry segments
    color: 0x1a251a,             // Planet surface color
    toonRampLevels: 3,           // Toon shading levels
    shadowBias: 0.0001           // Shadow bias for artifacts
};

// Player configuration
export const PLAYER = {
    bodySize: { x: 0.5, y: 1, z: 0.5 },  // Collision box size
    meshColor: 0xff3333,          // Player mesh color
    jumpImpulse: 12,              // Jump impulse force
    mass: 1,                      // Player mass
    linearDamping: 0.9,           // Movement damping
    fixedRotation: true           // Lock rotation
};

// NPC color palette
export const NPC_COLORS = {
    echo: 0x00f2ff,         // Cyan - UNIT-01 ECHO
    horizon: 0xffaa00,     // Orange - UNIT-02 HORIZON
    spire: 0x00ffaa,       // Green - SPIRE_MINOR
    keeper: 0xff00ff       // Purple - DATA_KEEPER
};

export const SOUND = {
    // UI sounds
    panelOpen: basePath + 'panel_open.mp3',
    panelClose: basePath + 'panel_close.mp3',
    buttonClick: basePath + 'button_click.mp3',
    questDone: basePath + 'quest_complete.mp3',
    victory: basePath + 'victory_fanfare.mp3',
    pickup: basePath + 'pickup.mp3',
    // Ambient
    birds: basePath + 'bird_song.mp3',
    // Music
    bgMusic: basePath + 'bg_music.mp3',
    // NPC-specific (by ID)
    npc: {
        1: { enter: basePath + 'echo_enter.mp3', exit: basePath + 'echo_exit.mp3' },
        2: { enter: basePath + 'horizon_enter.mp3', exit: basePath + 'horizon_exit.mp3' },
        3: { enter: basePath + 'spire_enter.mp3', exit: basePath + 'spire_exit.mp3' },
        4: { enter: basePath + 'keeper_enter.mp3', exit: basePath + 'keeper_exit.mp3' }
    }
};

export const npcs = [
    { id: 1, name: "UNIT-01 ECHO", color: COLORS.cyan, pos: [0.1, 0.1], storyFile: baseNPCPath + 'NPC_UNIT_ECHO_1.json', hasDialogue: true },
    { id: 2, name: "UNIT-02 HORIZON", color: COLORS.green, pos: [0.6, 2.2], storyFile: baseNPCPath + 'NPC_UNIT_ECHO_2.json', hasDialogue: false },
    { id: 3, name: "SPIRE_MINOR", color: COLORS.orange, pos: [1.2, 0.3], hasDialogue: false, bubbleMsg: "The Spire awaits..." },
    { id: 4, name: "DATA_KEEPER", color: COLORS.purple, pos: [0.8, 1.0], storyFile: baseNPCPath + 'NPC_DATA_KEEPER.json', hasDialogue: true, questId: 1 }
];

export const locations = [
    { name: "LOC_NORTH_SPIRE", pos: [0.1, 0.5], r: 15, questId: 0 },
    { name: "LOC_SOUTH_SPIRE", pos: [0.9, 2.5], r: 15 }
];

export const quests = [
    { id: 'RECON', name: 'NORTH_RECON', task: 'Reach the North Spire', cur: 0, tar: 1, completed: false },
    { id: 'CELLS', name: 'CELL_RECOVERY', task: 'Collect Data Cells', cur: 0, tar: 3, completed: false },
    { id: 'SHARDS', name: 'SIGNAL_FRAGMENTS', task: 'Collect Purple Shards', cur: 0, tar: 3, completed: false },
    { id: 'VISIT', name: 'VISIT_HORIZON', task: 'Contact UNIT-02 HORIZON', cur: 0, tar: 1, completed: false }
];

export const actions = [
    { name: "Scan Area", type: "scan", icon: "fas fa-search", consumable: false },
    { name: "Repair Gear", type: "repair", icon: "fas fa-wrench", consumable: true },
    { name: "Hack Terminal", type: "hack", icon: "fas fa-laptop-code", consumable: true },
    { name: "Med Kit", type: "heal", icon: "fas fa-first-aid", consumable: true }
];
