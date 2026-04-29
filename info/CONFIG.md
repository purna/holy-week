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
The typewriter effect gradually reveals text character-by-character for a more immersive dialogue experience.

**Features:**
- Gradual character-by-character text reveal
- Adjustable typing speed and delay
- Blinking cursor effect
- Support for looping text
- Click/tap to skip typewriter and show full text
- Automatic initialization via `data-typewriter` attribute

**Usage in HTML:**
```html
<div data-typewriter data-typewriter-speed="30" data-typewriter-delay="100">
  This text will type out gradually...
</div>
```

**JavaScript API:**
```javascript
import { Typewriter } from './js/typewriter.js';

const element = document.getElementById('my-text');
const writer = new Typewriter(element, {
  speed: 30,        // ms per character
  delay: 100,       // ms before starting
  loop: false,      // repeat after completion
  cursor: true,     // show blinking cursor
  onComplete: () => console.log('Done!')
});

writer.start();      // Begin typewriter effect
writer.skip();       // Skip to end instantly
writer.stop();       // Pause the effect
writer.reset();      // Reset to beginning
```

**Ink Dialogue Integration:**
The typewriter is automatically applied to Ink dialogue text. Players can click the "Skip" button or press any key to instantly reveal all text.

**CSS Classes:**
- `.typewriter-text` - Applied to elements with typewriter effect
- `.typewriter-cursor` - Blinking cursor animation
- `.typewriter-skip` - Skip button styling

### 11. Chat-Style Dialogue System (`js/ink-dialogue.js`)

The Ink dialogue system has been enhanced with a WhatsApp-style chat interface. Messages appear as conversation bubbles with timestamps, choices appear as selectable poll cards, and the interface feels like a modern messaging app.

**Features:**
- WhatsApp-style message bubbles with rounded corners
- Sent messages (player/system) in green, received messages (NPC) in white
- Timestamps on each message (HH:MM format)
- Choices displayed as poll cards with selection animation
- Typing indicator in header during NPC speech
- Avatar with NPC initial or custom portrait
- Smooth slide-in animations
- Auto-scroll to newest message
- Responsive design (max 500px width, 60vh height)

**UI Components:**

**Chat Header:**
- NPC avatar circle (with initial letter or custom image)
- NPC name and status below
- Typing indicator dots (...)
- Close button (×)

**Message Area:**
- Chat background with subtle dot pattern
- Messages stacked vertically with gap
- Sent messages: green bubble, right-aligned, rounded bottom-left
- Received messages: white bubble, left-aligned, rounded bottom-right
- System messages: blue-tinted italic text

**Choice Cards:**
- Displayed as selectable poll cards
- Hover: light background, border color change, slight right shift
- Selected: green checkmark, green border, light green background
- Smooth transitions on all interactions

**Header States:**
- Idle: Shows NPC name and status
- Typing: Shows animated dots in header

**Implementation:**

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

### 22. Implementation Priority

1. **Phase 1**: Update config.js with actions, npcs, pathfinding, colliders, locations
2. **Phase 2**: Modularize core JS files (scene, player, world, NPC, actions)
3. **Phase 3**: Implement GLB player model with toon shading
4. **Phase 4**: Add typewriter.js for dialogue text effects
5. **Phase 5**: Add actions.js with cooldown and UI system
6. **Phase 6**: Add pathfinding.js for NPC navigation
7. **Phase 7**: Add collider.js for collision/trigger system
8. **Phase 8**: Implement NPC quest and dialogue system
9. **Phase 9**: Implement inventory system
10. **Phase 10**: Implement location detection system
11. **Phase 11**: Create actions.css for floating animations
12. **Phase 12**: Test quest completion workflows
13. **Phase 13**: Optimize and balance gameplay

