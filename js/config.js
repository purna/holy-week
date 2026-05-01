// Configuration object - npcs, locations, quests, actions, audio paths
const basePath = './assets/audio/';
const baseNPCPath = './assets/dialogue/';
const baseModelPath = './assets/models/';
const baseIconPath = './assets/gfx/';

// ============================================================================
// RENDERING SYSTEM CONFIGURATION
// ============================================================================
/**
 * ICON_SYSTEM: Choose between FontAwesome and inline SVG icons.
 *   - 'fontawesome': Loads FontAwesome CDN and uses CSS classes.
 *   - 'svg': Uses local SVG files from assets/gfx/ via IconManager.
 *
 * MODEL_SYSTEM: Choose between primitive geometries and GLB 3D models.
 *   - 'primitives': Uses Three.js built-in geometries (boxes, spheres, capsules).
 *   - 'glb': Loads .glb files from assets/models/ via ModelManager.
 *
 * To switch systems, simply change these values and ensure required assets exist.
 */
export const ICON_SYSTEM = 'svg'; // 'fontawesome' | 'svg'
export const MODEL_SYSTEM = 'primitives'; // 'primitives' | 'glb'

// Debug flags: force primitive rendering for specific objects even in GLB mode
// Useful when GLB models are missing or you want to see fallback primitives
export const DEBUG_FORCE_PRIMITIVES = {
    player: false,       // Set true to see box primitive instead of player.glb
    planet: false,       // Set true to see icosahedron primitive instead of earth.glb
    npcs: false,         // Set true to see capsule primitives instead of NPC GLBs
    pickups: false       // Set true to see sphere/octahedron primitives instead of GLBs
};


// ============================================================================
// ICON CONFIGURATION
// ============================================================================
// Icon mappings for SVG system (file paths)
export const ICONS = {
    // UI buttons
    quest:        baseIconPath + 'list.svg',
    inventory:    baseIconPath + 'inventory.svg',
    actions:      baseIconPath + 'list.svg',
    soundOn:      baseIconPath + 'music.svg',
    soundOff:     baseIconPath + 'music_off.svg',
    day:          baseIconPath + 'day.svg',
    night:        baseIconPath + 'night.svg',
    // Action icons (for floating icons & action list)
    scan:         baseIconPath + 'search.svg',
    repair:       baseIconPath + 'wrench.svg',
    hack:         baseIconPath + 'laptop-code.svg',
    heal:         baseIconPath + 'first-aid.svg',
    // Inventory item icons
    circle:       baseIconPath + 'circle.svg',
    memory:       baseIconPath + 'memory.svg',
    gem:          baseIconPath + 'gem.svg',
    // Quest icons
    checkFull:    baseIconPath + 'check-square-full.svg',
    checkEmpty:   baseIconPath + 'check-square-empty.svg'
    //
};

// FontAwesome icon class names (for FA system)
export const FA_ICONS = {
    quest:        'fas fa-list-check',
    inventory:    'fas fa-boxes-stacked',
    actions:      'fas fa-list',
    soundOn:      'fas fa-volume-up',
    soundOff:     'fas fa-volume-off',
    scan:         'fas fa-search',
    repair:       'fas fa-wrench',
    hack:         'fas fa-laptop-code',
    heal:         'fas fa-first-aid',
    circle:       'fas fa-circle',
    memory:       'fas fa-memory',
    gem:          'fas fa-gem',
    interact:     'fas fa-hand-pointer',
    day:          'fas fa-sun',
    night:        'fas fa-moon'
};

// ── MODEL PATHS (used when MODEL_SYSTEM === 'glb') ───────────────────────
export const MODELS = {
    player:       baseModelPath + 'player/player.glb',    // Player character GLB
    npcEcho:      baseModelPath + 'npcs/npc_echo.glb',
    npcHorizon:   baseModelPath + 'npcs/npc_horizon.glb',
    npcSpire:     baseModelPath + 'npcs/npc_spire.glb',
    npcKeeper:    baseModelPath + 'npcs/npc_keeper.glb',
    pickupCell:   baseModelPath + 'cell.glb',
    pickupShard:  baseModelPath + 'shard.glb',
    // Environment
    planet:       baseModelPath + 'earth.glb',
    tower:        baseModelPath + 'tower.glb',
    rocks:        baseModelPath + 'rocks.glb',
    house:        baseModelPath + 'house.glb'
};

// Model scale factors (apply when loading GLB)
export const MODEL_SCALES = {
    planet: 0.5,        // earth.glb already at radius 50
    player: 1,
    npcEcho: 1,
    npcHorizon: 1,
    npcSpire: 1,
    npcKeeper: 1,
    pickupCell: 1,
    pickupShard: 1,
    tower: 1,
    rocks: 1,
    house: 1
};

// Fallback primitive configs (used when MODEL_SYSTEM === 'primitives')
export const PRIMITIVE_CONFIG = {
    player:       { type: 'box', size: [1.2, 2, 1.2], color: 0xff3333 },
    npcEcho:      { type: 'capsule', radius: 1, length: 2, color: 0x00f2ff },
    npcHorizon:   { type: 'capsule', radius: 1, length: 2, color: 0xffaa00 },
    npcSpire:     { type: 'capsule', radius: 1, length: 2, color: 0x00ffaa },
    npcKeeper:    { type: 'capsule', radius: 1, length: 2, color: 0xff00ff },
    pickupCell:   { type: 'sphere', radius: 1, color: 0xffaa00 },
    pickupShard:  { type: 'octahedron', radius: 0.9, color: 0xa020f0, emissive: 0x4a0080 },
    planet:       { type: 'icosahedron', radius: 50, segments: 5, color: 0x2a552a },
    tower:        { type: 'box', size: [3, 10, 3], color: 0x333344 },
    rocks:        { type: 'box', size: [2, 4, 2], color: 0xdddddd }
};

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
    ambientLight: 0x404040,      // Ambient light color
    ambientIntensity: 1.5,       // Ambient light strength
    sunColor: 0xffffff,          // Sunlight color
    sunIntensity: 3.5,           // Sunlight intensity (higher for toon shading)
    shadowMapSize: 2048,         // Shadow map resolution
    // Player torch settings
    torchColor: 0x00f2ff,        // Cyan torch light
    torchIntensityDay: 0,        // Torch off during day
    torchIntensityNight: MODEL_SYSTEM === 'glb' ? 400 : 800, // Lower for GLB, higher for primitives
    torchDistance: 80,           // Moderate reach distance
    torchDecay: 2                // Light falloff
};

// Planet configuration
export const PLANET = {
    radius: 50,                  // Planet radius
    segments: 5,                 // Geometry segments
    color: 0x2a552a,             // Planet surface color (brighter green)
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
    { id: 1, name: "UNIT-01 ECHO", color: COLORS.cyan, pos: [0.1, 0.1], storyFile: baseNPCPath + 'NPC_UNIT_ECHO_1.json', hasDialogue: true, bubbleMsg: ". . ." },
    { id: 2, name: "UNIT-02 HORIZON", color: COLORS.green, pos: [0.6, 2.2], storyFile: baseNPCPath + 'NPC_UNIT_ECHO_2.json', hasDialogue: false, questId: 3, bubbleMsg: "please heal me", bubbleMsgComplete: "Thank you, I'm restored." }, // VISIT quest is at index 3
    { id: 3, name: "SPIRE_MINOR", color: COLORS.orange, pos: [1.2, 0.3], hasDialogue: false, bubbleMsg: "The Spire awaits..." },
    { id: 4, name: "DATA_KEEPER", color: COLORS.purple, pos: [0.8, 1.0], storyFile: baseNPCPath + 'NPC_DATA_KEEPER.json', hasDialogue: true, questId: 1, bubbleMsg: ". . ." } // CELLS quest at index 1
];

export const locations = [
    { name: "LOC_NORTH_SPIRE", pos: [0.1, 0.5], r: 15, questId: 0 },
    { name: "LOC_SOUTH_SPIRE", pos: [0.9, 2.5], r: 15 }
];

export const quests = [
    { id: 'RECON', name: 'NORTH_RECON', task: 'Reach the North Spire', cur: 0, tar: 1, completed: false },
    { id: 'CELLS', name: 'CELL_RECOVERY', task: 'Collect Data Cells', cur: 0, tar: 3, completed: false },
    { id: 'SHARDS', name: 'SIGNAL_FRAGMENTS', task: 'Collect Purple Shards', cur: 0, tar: 3, completed: false },
    { id: 'VISIT', name: 'VISIT_HORIZON', task: 'Contact UNIT-02 HORIZON - Heal Med Kit', cur: 0, tar: 1, completed: false }
];

export const collectables = [
    {
        id: 1,
        name: "Data Cell",
        key: "pickupCell",
        prefix: "CELL",
        count: 4,
        color: 0xffaa00,
        questIndex: 1,
        model: 'pickupCell',
        primitive: { type: "sphere", radius: 1 },
        material: "toon"
    },
    {
        id: 2,
        name: "Signal Shard",
        key: "pickupShard",
        prefix: "SHARD",
        count: 4,
        color: 0xa020f0,
        emissive: 0x4a0080,
        questIndex: 2,
        model: 'pickupShard',
        primitive: { type: "octahedron", radius: 0.9 },
        material: "standard"
    }
];

export const actions = [
    { name: "Scan Area", type: "scan", icon: ICON_SYSTEM === 'svg' ? ICONS.scan : FA_ICONS.scan, iconType: "scan", uses: -1 },
    { name: "Repair Gear", type: "repair", icon: ICON_SYSTEM === 'svg' ? ICONS.repair : FA_ICONS.repair, iconType: "repair", uses: 1 },
    { name: "Hack Terminal", type: "hack", icon: ICON_SYSTEM === 'svg' ? ICONS.hack : FA_ICONS.hack, iconType: "hack", uses: 1 },
    { name: "Med Kit", type: "heal", icon: ICON_SYSTEM === 'svg' ? ICONS.heal : FA_ICONS.heal, iconType: "heal", uses: 5 }
];

// ============================================================================
// DIALOGUE SYSTEM CONFIGURATION
// ============================================================================
/**
 * Dialogue system uses WhatsApp-style chat interface.
 * Ink.js runtime loaded via CDN (https://unpkg.com/inkjs@2.2.1/dist/ink.js)
 *
 * NPCs with `hasDialogue: true` will load their story from `storyFile` at startup.
 * Stories are stored in npcStories cache and instantiated on conversation start.
 */
export const DIALOGUE = {
    // Ink library detection order
    inkLibrary: ['inkjs', 'ink'],           // window.inkjs or window.ink

    // Dialogue UI timing (ms)
    fillerDelay: 300,                       // Delay between filler messages
    choiceDelay: 400,                       // Delay after choice before continuing

    // Whether to show filler messages during conversation
    enableFiller: true,

    // Auto-scroll behavior
    autoScroll: true,

    // Conversation bubble limits
    maxBubblesPerSegment: 10,               // Prevent spam
};

// ============================================================================
// VFX SYSTEM CONFIGURATION ( Landing Decals, Trails )
// ============================================================================
export const VFX = {
    landingDecal: {
        enabled: true,
        size: 4,                            // World units
        lifetime: 1.5,                      // Seconds before fade
        svgPath: './assets/gfx/dirt.svg',   // Decal texture (black shapes)
        nightColor: 0xffffff,               // Tint color in night mode (white)
        dayColor: 0x000000                  // Tint color in day mode (black)
    },
    trail: {
        enabled: true,
        particleSize: 0.3,
        dayColor: 0x966F33,                 // Brownish by day
        nightColor: 0x00f2ff,               // Cyan by night
        lifetime: 1.0                       // Seconds
    }
};

// ============================================================================
// DAY/NIGHT CYCLE CONFIGURATION
// ============================================================================
export const DAY_NIGHT = {
    autoCycle: true,                        //自动时间推进
    cycleSpeed: 0.0001,                     // timeProgress increment per frame
    dayPosition: 0.25,                      // timeProgress value for full day
    nightPosition: 0.75,                    // timeProgress value for full night
    sky: {
        day: 0x87CEEB,                      // Light blue
        night: 0x020205                     // Deep space black
    },
    fogDensity: 0.002
};

// ============================================================================
// INPUT CONFIGURATION
// ============================================================================
export const CONTROLS = {
    jumpKey: 'Space',
    toggleAutoCycleKey: 'KeyC',
    moveForward: 'KeyW',
    moveBackward: 'KeyS',
    moveLeft: 'KeyA',
    moveRight: 'KeyD'
};

