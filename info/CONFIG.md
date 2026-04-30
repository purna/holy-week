# Configuration File (js/config.js)

This file centralizes all major settings for the 3D world application.

## Structure

### 1. Loading Screen (`config.loading`)
- `svg`: Path to the loading spinner SVG
- `text`: Loading message text
- `color`: Text color
- `background`: Background overlay (supports rgba)

### 2. Scene (`config.backgroundColor`)
- Three.js Color value for scene background

### 3. Audio (`config.musicUrl`)
- Path to background music file
- Uses Howler.js for audio management (see audio.js module)
- Audio files organized by type: UI sounds (panelOpen, panelClose, buttonClick, questDone, victory, pickup), ambient (birds), music (bgMusic), and NPC-specific enter/exit sounds
- Stored in `assets/audio/` directory with filenames matching the SOUND object in examples/messenger_final_v16.html

### 4. World (`config.world`)
- `earth`: Path to the earth GLB model
- `earthScale`: Multiplier for earth size (default: 8)
- `planetRadius`: Base radius for physics calculations (default: 20)

### 5. Player (`config.player`)
- `model`: Path to player GLB model
- `scale`: Player model scale (default: 0.05)
- `startHeight`: Initial Y position above terrain (default: 100)
- `collider`: Player collider settings (radius, height)

### 6. Physics & Movement (`config.physics`)
- `acceleration`: Movement acceleration (default: 20)
- `deceleration`: Movement deceleration when no input (default: 10)
- `maxSpeed`: Maximum movement speed (default: 6)
- `strafeSpeed`: Side movement speed
- `rotateSpeed`: Rotation speed when pressing left/right (default: 0.5)
- `raycastOffset`: Height above player for terrain raycast (default: 200)
- `orbitAfterSeconds`: Seconds of stillness before orbit mode (default: 2)
- `orbitSpeed`: Orbiting camera rotation speed (default: 0.2)
- `orbitRadius`: Orbit camera radius (default: 20)
- `orbitHeight`: Orbit camera height (default: 10)
- `camDistanceMoving`: Camera Z-offset when moving (default: -30)
- `camDistanceStill`: Camera Z-offset when still (default: -18)
- `camHeightMoving`: Camera Y-offset when moving (default: 15)
- `camHeightStill`: Camera Y-offset when still (default: 9)
- `camLerpSpeed`: Camera position smoothing (default: 0.02)
- `turnLerpSpeed`: Player turning smoothing (default: 0.02)

### 7. Animation (`config.animation`)
- `walkSpeedThreshold`: Speed threshold to switch to walk animation (default: 0.2)
- `walkTimeScaleMultiplier`: Walk animation speed multiplier (default: 1.5)
- `turnFadeDuration`: Crossfade duration for turn animations (default: 0.2)
- `idleFadeDuration`: Crossfade duration for idle animations (default: 0.2)

### 8. Animation Assets (`config.animations`)
- `model`: Path to player GLB model with animations
- `idle`: Animation name for idle state
- `walking`: Animation name for walking
- `leftTurn`: Animation name for left turn
- `rightTurn`: Animation name for right turn
- `jump`: Animation name for jump

### 9. Wipe Transition (`config.wipeTransition`)
- `enabled`: Enable/disable wipe effect
- `direction`: Transition direction ('left', 'right', 'up', 'down', 'center')
- `speed`: Transition speed in seconds
- `color`: Wipe color (hex)
- `duration`: Wipe duration in milliseconds
- `easing`: Easing function

### 10. Typewriter Effect (`js/typewriter.js`)

The typewriter effect gradually reveals text character-by-character for immersive UI text display.

**Primary Use: Location Panel**
- The typewriter effect is applied to the **location name display** (`#loc-name`) when the player enters a named location zone
- The location text types out letter-by-letter when first detected
- The effect can be skipped by pressing any key or clicking
- Once completed, the full location name remains visible

**Features:**
- Gradual character-by-character text reveal
- Adjustable typing speed and delay
- Blinking cursor effect during typing
- Click/tap or keypress to skip to full text
- Automatic initialization via `data-typewriter` attribute
- Resets and replays when entering a new location

**Usage in HTML:**
```html
<div id="loc-name" data-typewriter data-typewriter-speed="40" data-typewriter-delay="0">
  NORTH_SPIRE
</div>
```

**JavaScript API:**
```javascript
import { Typewriter } from './js/typewriter.js';

const element = document.getElementById('loc-name');
const writer = new Typewriter(element, {
  speed: 40,        // ms per character
  delay: 0,         // ms before starting
  loop: false,      // repeat after completion
  cursor: true,     // show blinking cursor
  onComplete: () => console.log('Location revealed!')
});

writer.start();      // Begin typewriter effect
writer.skip();       // Skip to end instantly
writer.stop();       // Pause the effect
writer.reset();      // Reset to beginning
```

**Location Integration:**
The typewriter effect is triggered by the `LocationSystem`:
1. Player enters a location trigger zone
2. Location name is set on `#loc-name` element
3. Typewriter effect auto-starts (if `data-typewriter` attribute present)
4. Text types out over ~1–2 seconds
5. Cursor blinks until completion or user skip

**CSS Classes:**
- `.typewriter-text` - Applied to elements with typewriter effect
- `.typewriter-cursor` - Blinking cursor animation
- `.typewriter-skip` - Skip button styling (if used)

**Note:** The typewriter effect is **not** used for Ink dialogue text. Dialogue uses its own `continueStory()` flow with optional filler messages and immediate choice display.

The chat system is built into `js/ink-dialogue.js` with:

```javascript
// Start dialogue
window.inkDialogue.startStoryFromPath(
  'assets/dialogue/Story/npc_conversation.json',
  {
    npcName: 'UNIT-01 ECHO',
    color: '#00f2ff',
    portrait: 'assets/npcs/npc-01.png',
    status: 'Online'
  }
);

// Close dialogue
window.inkDialogue.close();

// Check if open
window.inkDialogue.isOpen();
```

**CSS Classes:**
- `#ink-dialogue-container` - Main chat container
- `chat-message` - Individual message bubble
- `chat-message.sent` - Player/system message
- `chat-message.received` - NPC message
- `chat-message.system` - System/info message
- `choice-poll` - Choice card (WhatsApp poll style)
- `choice-poll.selected` - Selected choice state
- `#ink-dialogue-messages` - Messages container
- `#ink-dialogue-choices` - Choices container
- `#ink-dialogue-header-typing` - Typing indicator

**Message Flow:**
1. Dialogue opens with chat slide-in animation
2. NPC message appears with typewriter effect (optional)
3. After message completes, choices appear (if any)
4. Player selects choice (click/tap)
5. Choice card shows checkmark
6. Next message appears
7. Repeat until story complete
8. Chat closes automatically

**Skip Behavior:**
- Click "Skip" button to instantly reveal full text
- Click "Next" to continue when waiting
- Close button (×) to exit dialogue
- Dialogue auto-closest on story completion

**Accessibility:**
- Keyboard navigation: Tab through choices, Enter to select
- Focus indicators on all interactive elements
- High contrast color scheme
- Semantic button elements
- ARIA roles could be added via data attributes

**Mobile Optimization:**
- Responsive width (92vw max)
- Touch-friendly targets (44px minimum)
- Prevents page scroll while open
- Optimized for landscape/portrait
- Fast 0.3s animations

### 12. Locations (`config.locations`)
Array of location objects for place detection and quest triggers:
- `name`: Location identifier (e.g., 'TOWN_SQUARE', 'FOREST_CLEaring')
- `position`: [theta, phi] spherical coordinates (each in [0,1])
- `radius`: Detection radius (as fraction of planet radius, default: 0.05)
- `questId`: Associated quest index

Location System:
- Detects when player enters/exits a location area
- Displays location name on HUD
- Can trigger quest progression or events
- Uses spherical coordinates for planet surface placement
- Radius is relative to planet size (0.05 = 5% of planet radius)

### 13. Naming Conventions

#### For Blender Objects → Game Recognition

When modeling in Blender, use specific naming prefixes so the engine recognizes object types:

**NPC Objects:**
- `NPC_{Name}` - General NPC (e.g., `NPC_Guard`, `NPC_Merchant`)
- `NPC_Dialogue_{ID}` - NPC with specific dialogue (e.g., `NPC_Dialogue_01`)
- Auto-detected by NPCSystem via name prefix
- Can set userData properties in Blender:
  - `npcColor`: Hex color (e.g., `0x4488ff`)
  - `npcRadius`: Interaction radius (e.g., `3`)
  - `dialogue`: Path to Ink JSON (e.g., `dialogue/npc_01.json`)

**Trigger Objects (Quests, Locations, Items):**
- `TRIGGER_Quest_{ID}_{Type}` - Quest triggers (e.g., `TRIGGER_Quest_FindSword_radius=5`)
- `TRIGGER_Item_{Name}` - Item collection (e.g., `TRIGGER_Item_CollectKey`)
- `TRIGGER_PlaceName_{Location}` - Location detection (e.g., `TRIGGER_PlaceName_TownSquare`)
- Auto-detected by TriggerSystem
- Radius can be set: `_radius=5` suffix

**Colliders (Static Geometry):**
- `COL_Building_{Name}` - Building collider (e.g., `COL_Building_Tavern`)
- `COL_Prop_{Name}` - Prop collider (e.g., `COL_Prop_Tree_Oak`)
- `COL_Wall_{Name}` - Wall/barrier (e.g., `COL_Wall_Outer`)
- Recognized by collider system for environment blocking
- Use box/cylinder meshes for collision shapes

**Collectibles:**
- `ITEM_{Type}_{ID}` - Collectible items (e.g., `ITEM_Coin_01`, `ITEM_Key_Gold`)
- Auto-detected by item collection system
- Can add `itemValue` userData for scoring

**Location Markers:**
- `LOC_{Name}` - Location identifier (e.g., `LOC_Town_Square`, `LOC_Forest_Entrance`)
- Used for HUD location display
- Radius via `locRadius` userData

**Quest Objects:**
- `QUEST_{ID}_{Type}` - Quest-specific objects (e.g., `QUEST_01_Door_Locked`)
- Links to quest system
- Can set `questId` userData

**General Interactive:**
- `INTERACT_{Name}` - Generic interactable (e.g., `INTERACT_Chest_Wooden`)
- Detected by action system within range

#### Examples in Blender:

```
NPC_Guard_Main           → Recognized as NPC
NPC_Dialogue_01          → NPC with dialogue
TRIGGER_Item_Key_01      → Key item trigger
TRIGGER_PlaceName_Castle → Location marker
COL_Building_Castle_Wall → Collision box for wall
ITEM_Key_Silver_01       → Collectible key
LOC_Castle_Entrance      → Location identifier
QUEST_01_Door_Locked     → Quest-related door
```

#### Setting Custom Properties (Blender UserData):

In Blender, add custom properties to objects:
- `npcColor`: `0xff0000` (red NPC)
- `npcRadius`: `2.5` (interaction range)
- `dialogue`: `"assets/dialogue/npc_guard.json"`
- `itemValue`: `10` (point value)
- `locRadius`: `0.1` (location detection radius)
- `questId`: `0` (associated quest)
- `radius`: `5` (trigger radius)

These are read by the game engine on object spawn.

#### Best Practices:

1. **Use clear, descriptive names** - `NPC_Blacksmith` not `NPC_001`
2. **Be consistent with prefixes** - Always use `NPC_`, `TRIGGER_`, etc.
3. **Group related objects** - Use collections in Blender
4. **Add userData for customization** - Override defaults per-object
5. **Keep collision shapes simple** - Use primitives, not detailed meshes
6. **Name layers logically** - `NPCs`, `Triggers`, `Colliders`, `Items`

### 14. Actions (`config.actions`)
Array of action objects representing player actions that can be executed:
- `id`: Unique action identifier (e.g., 'collect', 'interact', 'use-key')
- `icon`: Path to SVG icon (e.g., 'assets/gfx/collect.svg')
- `name`: Display name for the action
- `description`: Brief description of what the action does
- `key`: Keyboard key to trigger the action (e.g., 'f', 'e')
- `cooldown`: Cooldown time in seconds (0 = no cooldown)
- `range`: Maximum distance to interact with objects/NPCs (default: 3)
- `questId`: Associated quest ID that this action can progress
- `effect`: Function name or type that defines the action's effect
- `animation`: Icon animation settings
  - `duration`: Duration of upward float animation (ms)
  - `easing`: CSS easing function (e.g., 'ease-out')
  - `endOpacity`: Final opacity (0 = fully transparent)

Action System:
- Actions are triggered via assigned keyboard keys
- When executed, the action's icon animates upward from player position
- Cooldown period prevents spam (visual grayscale overlay when on cooldown)
- Range-limited interaction (only affects objects/NPCs within radius)
- Quest integration: executing action near matching NPC increments quest progress
- Action panel slides in/out (similar to inventory UI)
- Effects include collect, interact, unlock, use-item, etc.
- Floating icon animation provides visual feedback

### 15. NPCs (`config.npcs`)
Array of NPC configuration objects:
- `id`: Unique NPC identifier
- `name`: Display name (e.g., 'UNIT-01 ECHO')
- `model`: Path to NPC GLB model (e.g., 'assets/npcs/npc-01.glb')
- `scale`: Model scale multiplier
- `position`: [theta, phi] spherical coordinates on planet surface (each in [0,1])
- `color`: NPC tint color (hex)
- `hasDialogue`: Whether NPC has Ink dialogue (true/false)
- `storyFile`: Path to Ink JSON story file
- `dialogue`: Array of dialogue lines (fallback if no Ink file)
- `questId`: Associated quest index (from tasks array)
- `bubbleMsg`: Non-dialogue NPC message (for passive NPCs)

NPC System:
- NPCs spawn at configured spherical positions on planet surface
- Each NPC can have custom GLB model with toon shading
- Proximity detection triggers interaction prompt (within range)
- E-key (or action key) initiates dialogue or action
- NPCs with `hasDialogue: true` launch Ink story system
- Dialogue progress can unlock quest advancement
- Visual feedback via name tags, bubbles, and bobbing animation
- NPCs auto-orient to face outward from planet center

### 16. Pathfinding (`config.pathfinding`)
- `enabled`: Enable/disable pathfinding system
- `nodes`: Array of waypoint nodes {id, position: [x, y, z], connections: ['id1', 'id2']}
- `speed`: Movement speed along paths (units/second)
- `arrivalThreshold`: Distance to consider waypoint reached (default: 0.5)

Pathfinding System:
- A* algorithm computes shortest path between waypoints
- Waypoint graph defines navigation mesh on spherical surface
- NPCs can follow predefined patrol routes or dynamic paths
- Path follower applies steering behaviors (seek, arrive)
- Y-axis constrained to planet surface normal
- Visual debug mode shows connection lines and nodes
- Used for NPC navigation and quest-guided movement

### 17. Colliders (`config.colliders`)
- `enabled`: Enable/disable collision system
- `objects`: Array of collidable objects with:
  - `type`: 'sphere' | 'box' | 'capsule'
  - `position`: [x, y, z] world coordinates
  - `size`: [width, height, depth] for box, or [radius] for sphere/capsule
  - `rotation`: [rx, ry, rz] optional rotation in radians
  - `radius`: radius for sphere/capsule types
  - `start`/`end`: line segment endpoints for capsule type

Collision System:
- Sphere colliders for NPCs and player (distance-based)
- Box colliders (AABB) for buildings and props
- Capsule colliders for character-style collision
- Trigger volumes fire enter/exit events for quest zones
- Central CollisionManager tracks all colliders
- Integrated with physics world for dynamic objects
- Supports static and dynamic collision types
- Used for environmental blocking and interaction zones

### 18. Tasks Checklist (`config.tasks`)
Array of quest/task objects:
- `name`: Quest display name
- `current`: Current progress (0 to total)
- `total`: Required completion value

Quest System Details:
- Tasks panel displays all active quests with progress bars
- Quest progression tied to: item collection, NPC dialogue, location visits, action execution
- Multiple quests can be active simultaneously
- Completed quests remain visible with strike-through styling
- Visual indicators on HUD show active quest count
- Quest completion triggers: story events, rewards, NPC reactions
- Quest data persists via config object

### 19. Inventory (`config.inventory`)
Array of item objects:
- `name`: Unique item identifier/display name
- `quantity`: Stack size (1 for unique items, >1 for consumables)

Inventory System Details:
- Grid-based or list-based item display
- Items collected via action button within interaction range
- Automatic stacking for duplicate items (by name)
- Tooltips show item descriptions on hover
- Items can be used via click or assigned hotkeys
- Inventory state updates in real-time across all panels
- Maximum capacity configurable (default: unlimited)
- Supports equipment slots and consumable categories
- Visual feedback on collection (floating text, sound)

### 20. Folder Structure Proposal

```
my-3d-world/
├── index.html              # Main HTML
├── CONFIG.md              # This configuration documentation
├── styles.css             # Main styles
├── css/                   # Additional stylesheets
│   ├── dialogue.css       # Dialogue box and choices
│   ├── panels.css         # Inventory and checklist panels
│   ├── actions.css        # Action buttons and floating animations
│   └── responsive.css     # Mobile breakpoints
├── js/                    # JavaScript modules
│   ├── config.js          # Central configuration
│   ├── main.js            # Application entry point
│   ├── scene.js           # Three.js scene setup
│   ├── player.js          # Player controller
│   ├── world.js           # Terrain and physics
│   ├── NPC.js             # NPC class with dialogue
│   ├── NPCSystem.js       # NPC management
│   ├── actions.js         # Action system
│   ├── pathfinding.js     # A* pathfinding
│   ├── collider.js        # Collision detection
│   ├── dialogue.js        # Ink wrapper
│   ├── audio.js           # Sound management
│   ├── typewriter.js      # Typewriter effect for dialogue
│   ├── CameraController.js
│   ├── ToonShader.js
│   ├── utils/             # Third-party libraries
│   ├── plugins/           # ink.js, howler.min.js
│   ├── lib/               # Three.js and helpers
│   └── curves/            # NURBS utilities
├── assets/                # Static assets
│   ├── player/            # Player GLB models
│   ├── collectables/      # collectable GLB models (items) e.g. crystals
│   ├── npcs/              # NPC GLB models
│   ├── obstacles/         # obstacle GLB models e.g. rocks
│   ├── actions/           # Action icons in SVG format e.g. 
│   ├── models/            # buildings and props GLB models e.g. planet, buildings
│   ├── locations/         # location reference trigger for location message
│   ├── gfx/               # UI graphics
│   ├── audio/             # Sound files
│   └── dialogue/          # Ink JSON stories

```

### 21. External Resources
- **Google Fonts**: Luxurious Roman family via CDN
- **Font Awesome**: Icons for UI buttons
- **Ink.js**: Dialogue scripting runtime
- **Howler.js**: Audio management with spatial effects
- **Three.js**: 3D rendering and scene graph
- **Cannon.js**: Physics simulation

### 22. Day/Night Cycle & VFX System (`js/vfx.js`, `day_night_example.html`)

The day/night system provides dynamic lighting, sky/fog color transitions, and visual effects that react to time of day and player actions.

**Features:**
- Automatic or manual day/night cycle
- Dynamic sky color transitions (day: sky blue, night: deep space black)
- Fog color matches sky for atmospheric consistency
- Sun and moon celestial bodies with orbital motion
- Lighting intensity changes based on time of day
- Player trail particles (color varies by day/night)
- Landing decals on ground impact (SVG-based, color-inverted at night)
- Jump impulse with grounded state tracking
- Manual toggle button (sun/moon icon) to switch day/night

**Configuration:**

**Day/Night Timing:**
- `isDayMode`: Boolean flag (true = day, false = night)
- `timeProgress`: Float 0–1 representing orbital position (0.25 = day peak, 0.75 = night peak)
- `autoCycle`: Boolean to enable automatic time progression (default: true)

**Celestial Bodies:**
- `sunSphere`: Visible sphere mesh during daytime
- `moonLight`: Directional light active at night (blue tint)
- `sunLight`: Directional light active during day (white, casts shadows)
- Light positions orbit based on `timeProgress` using sine/cosine

**Lighting:**
- `ambientLight`: Base scene light (intensity varies 0.6 day / 0.2 night)
- `hemiLight`: Hemisphere light (sky/ground gradient, disabled at night)
- `playerMat.emissive`: Player mesh glow (black by day, red glow at night)
- `torch` (PointLight): Player-mounted light (off by day, 600 intensity at night)

**Trail System:**
- Spawns small spheres behind player during movement
- Trail color: brownish (`0x966F33`) during day, cyan (`0x00f2ff`) at night
- Trail particles fade out and shrink over time
- Triggered when player velocity exceeds threshold

**Landing Decals (Jump Splat):**
- SVG texture loaded from `assets/gfx/dirt.svg`
- Raycast downward from player position to find exact ground hit point
- Decal aligns with surface normal using `DecalGeometry`
- Decal size: 4×4×4 world units
- Fades out over 1.5 seconds
- Color inversion: black in day mode, white in night mode for visibility
- Only spawns when player transitions from air to ground (`isGrounded && !wasGrounded`)

**Player Movement & Jump:**
- Gravity: constant downward force toward planet center (`-75` units/s²)
- Ground detection: `pPos.length() < planetR + 1.6`
- Jump impulse: 12 units applied radially outward from planet center
- Jump cooldown: `canJump` flag resets only when grounded
- Movement controlled by WASD keys relative to camera heading
- Camera follows player with offset based on heading and up vector

**Controls:**
- **WASD**: Move player (relative to camera direction)
- **Spacebar**: Jump (only when grounded)
- **C key**: Toggle auto-cycle on/off
- **Sun/Moon button**: Manual day/night toggle (sets `timeProgress` to 0.25 or 0.75)

**Visual Effects (VFX) Class Structure:**
```javascript
class VFXSystem {
  constructor(scene, planetMesh, planetR) { ... }
  setNightMode(isNight)           // Updates internal night flag
  getDecalMaterial()              // Returns cloned material with correct color tint
  emitLandingDecal(pos, up)       // Spawns decal at ground impact point
  updateDecals(dt)                // Updates/fades decals each frame
}
```

**Implementation Notes:**
- Decals use `polygonOffset` to avoid z-fighting with planet surface
- TextureLoader is asynchronous; decals wait for SVG load before spawning
- Night mode color achieved by setting material `color` property to white (tints bright) vs black (original SVG colors show through)
- `DecalGeometry` requires importing from Three.js addons: `import { DecalGeometry } from 'three/addons/geometries/DecalGeometry.js'`

**Asset Requirements:**
- `assets/gfx/dirt.svg` — Landing pad decal texture (black shapes on transparent background)
- Must be served over HTTP (SVG textures blocked by CORS on file://)

**Performance:**
- Decals are automatically disposed after 1.5s lifetime
- Particle system uses object pooling for trail spheres
- VFX updates called once per frame in main loop

### 23. Shadows & Render Quality

Three.js shadow system configuration:

**Shadow Map Settings:**
- `renderer.shadowMap.enabled = true`
- `renderer.shadowMap.type = THREE.VSMShadowMap` (Variance Shadow Maps for soft edges)
- `shadow.mapSize.set(2048, 2048)` — High-resolution shadow maps
- `shadow.bias = -0.0005` — Prevents shadow acne artifacts
- `shadow.radius = 6` — Softens shadow edges (VSM only)

**Shadow-Casting Lights:**
- `sunLight` (Directional): Casts sharp daytime shadows, intensity 3.5
- `moonLight` (Directional): Casts soft blue-tinted night shadows, intensity 1.2

**Shadow-Receiving Objects:**
- `planet.receiveShadow = true` — Ground receives shadows
- `buildings[i].receiveShadow = true` — Structures receive shadows
- `playerMesh.children[0].receiveShadow = true` — Player receives shadows
- `NPC body meshes` — Receive shadows from sun/moon

**Optimization Tips:**
- Keep shadow camera bounds tight (frustum) to reduce map area
- Lower map size (1024) for mobile/performance
- Disable shadows on small decorative objects
- Use `castShadow = false` for particles and trails

### 23. WhatsApp-Style Dialogue System (`js/ink-dialogue.js`, `whatsapp2.html`)

The dialogue system presents Ink-powered conversations in a modern WhatsApp/chat interface. Centered on screen, it displays message bubbles with NPC and player messages, interactive poll-style choices, and smooth animations.

**Features:**
- WhatsApp-like chat bubbles (NPC left-aligned, player right-aligned)
- Cyclamic scrolling with custom scrollbar styling
- Poll-choice buttons for player decisions
- Disconnect/close connection option at conversation end
- Auto-scroll to newest message
- Filler messages during "typing" simulation (optional)
- Background blur overlay while dialogue active
- Player movement disabled during conversation

**Dialogue Flow:**
1. Player approaches NPC within interaction radius (8 units)
2. "CONNECT" prompt appears above NPC (positioned in 3D space)
3. Player clicks "CONNECT" (or presses E key in some variants)
4. Dialogue box fades in (centered)
5. NPC name displayed in header (teal/orange colored)
6. Story begins: `inkStory.Continue()` outputs initial text
7. Text appears as NPC message bubble with optional filler lines
8. Choices render as poll cards if available
9. Player selects choice → message sent → next story segment
10. Loop until story reaches `END` or no choices remain
11. "[DISCONNECT]" button closes the dialogue

**Ink JSON Integration:**
The system loads Ink story files via `fetch()` at startup:
```javascript
const npcs = [
  { id: 1, name: "UNIT-01 ECHO", storyFile: './assets/dialogue/NPC_UNIT_ECHO_1.json', hasDialogue: true }
];

async function loadAllStories() {
  for (const npc of npcs) {
    const response = await fetch(npc.storyFile);
    npcStories[npc.id] = await response.json();
  }
}
```
Each story JSON must follow the Ink glue format with `inkVersion`, `root` array, and optional `listDefs`. Example minimal structure:
```json
{
  "inkVersion": 21,
  "root": [
    "^Hello traveler.", "\n",
    "?^(choice1) Yes, I'll help.", "?^(choice2) Not now."
  ]
}
```

**Dialogue API:**
```javascript
// Start dialogue with loaded story
function startDialogue(npc) {
  const inkLib = window.inkjs || window.ink;
  inkStory = new inkLib.Story(npcStories[npc.id]);
  pBody.sleep();                          // Freeze player physics
  isDialogueOpen = true;
  document.getElementById('npc-name-display').innerText = npc.data.name;
  document.getElementById('local-dialogue-box').style.display = 'flex';
  continueStory();                        // Begin Ink flow
}

// Continue to next story segment
function continueStory() {
  let txt = "";
  while(inkStory.canContinue) txt += inkStory.Continue();  // Accumulate text
  
  if(txt.trim()) {
    appendMessage(txt.trim(), 'npc');      // Show NPC message
    // Optional: add filler lines for extended dialogue
    setTimeout(continueStory, 400);        // Delay before choices appear
  }

  // Render choices
  inkStory.currentChoices.forEach(c => {
    const btn = document.createElement('button');
    btn.className = "poll-choice";
    btn.innerText = c.text;
    btn.onclick = () => {
      appendMessage(c.text, 'player');
      inkStory.ChooseChoiceIndex(c.index);
      continueStory();                    // Continue after selection
    };
    choiceEl.appendChild(btn);
  });

  // No choices and story ended → show disconnect
  if(inkStory.currentChoices.length === 0 && !inkStory.canContinue) {
    const close = document.createElement('button');
    close.className = "poll-choice";
    close.innerText = "[DISCONNECT]";
    close.onclick = closeDialogue;
    choiceEl.appendChild(close);
  }
}
```

**Visual Design:**
- **NPC messages**: Dark teal/blue bubble (`rgba(32,44,51,0.95)`), left-aligned, cyan border accent
- **Player messages**: Green teal bubble (`rgba(0,92,75,0.95)`), right-aligned, green border accent
- **Choice buttons**: Semi-transparent panel background, cyan border, hover glow effect
- **Header**: Rounded pill shape with NPC name in orange (`--accent-secondary`)
- **Background**: Transparent overlay (3D world visible behind)
- **Font**: Monospace uppercase (consistent with UI theme)

**CSS Classes:**
- `#local-dialogue-box` — Main container (centered, flex column)
- `.npc-header` — NPC name pill
- `#bubble-text-container` — Scrollable message area
- `.msg-bubble` — Base message bubble
- `.npc-msg` / `.player-msg` — Message alignment variants
- `#bubble-choices` — Choice button container
- `.poll-choice` — Individual choice button

**Controls & Interaction:**
- **Click on CONNECT prompt**: Starts dialogue
- **Click choice button**: Selects dialogue option
- **Click [DISCONNECT]**: Closes dialogue, wakes player body
- **Movement keys (WASD)**: Disabled while dialogue open
- **Escape key**: Not bound (could be added to close)

**Technical Notes:**
- Dialogue box uses `position: fixed` centered via `transform: translate(-50%, -50%)`
- `pointer-events: none` on container, `auto` on interactive children
- `z-index: 1000` ensures dialogue above 3D canvas
- Ink.js loaded via CDN: `https://unpkg.com/inkjs@2.2.1/dist/ink.js`
- `pBody.sleep()` pauses physics; `pBody.wakeUp()` resumes on close
- Message container auto-scrolls to bottom after each append

**Differences from test1.html Dialogue:**
- Centered modal vs. bottom-aligned WhatsApp-style panel
- Simpler message bubble styling (no timestamp avatars)
- No typing indicator (instant text + optional filler messages)
- No inline save/load or quest integration in header
- Focused purely on conversation flow without extra UI chrome

**Asset Requirements:**
- `assets/dialogue/NPC_*.json` — Ink story files for each NPC
- Font Awesome icons (CDN loaded)
- ink.js runtime (CDN loaded)

**Accessibility Considerations:**
- Buttons use semantic `<button>` elements
- Focus styles could be enhanced for keyboard navigation
- High contrast text on dark backgrounds
- Scalable UI (max-width: 90% for smaller screens)

**Mobile Touch Support:**
- Touch-friendly choice buttons (min 44px height via padding)
- Prompt positioned near NPC in screen space
- Dialogue dismisses on disconnect tap


### 24. Skybox & Fog

**Day Mode:**
- Sky color: `0x87CEEB` (light blue)
- Fog color: `0x87CEEB` (matches sky)
- Fog density: `0.002` (FogExp2)

**Night Mode:**
- Sky color: `0x020205` (deep space black)
- Fog color: `0x020205` (matches sky)
- Fog density: unchanged (0.002)

**Transition:**
- Colors lerp over time (factor 0.02 per frame) when toggling
- `scene.background` and `scene.fog.color` both animate
- Instant snap possible via `updateCelestial(true)`

### 25. Implementation Roadmap (Current)

**Completed:**
1. ✅ Day/night cycle with celestial orbits
2. ✅ VFX system: landing decals (SVG), trail particles, color inversion
3. ✅ Jump mechanics with grounded state & impulse physics
4. ✅ Auto-cycle toggle (C key) and manual button
5. ✅ Shadows (VSM) with sun/moon lighting
6. ✅ Atmospheric sky/fog transitions
7. ✅ WhatsApp-style Ink dialogue system with poll choices
8. ✅ Mission/storage/actions panels with toggle buttons
9. ✅ WASD camera-relative movement on spherical terrain
10. ✅ Wipe transition start screen

**Next Phases:**
11. ⬜ Full Ink story loading from JSON files for all NPCs
12. ⬜ Quest progression tied to dialogue choices
13. ⬜ Inventory item collection and display
14. ⬜ Audio integration (ambiance, UI sounds, NPC voices)
15. ⬜ Mobile touch controls
16. ⬜ Save/load game state
17. ⬜ Optimize particle counts and shadow cascades

