/# Trigger & NPC Auto-Binding System

A scalable, data-driven pattern for binding gameplay logic to 3D objects in Three.js scenes using Blender naming conventions.

## 🎯 Overview

This system allows designers to place triggers and NPCs visually in Blender, name them using a convention, and have them automatically bind to gameplay logic in JavaScript — **no code changes required**.

## 🧱 Naming Convention

The backbone of the system. Use this format in Blender:

```
PREFIX_Type_Data[_param=value]
```

### Trigger Examples

```
TRIGGER_PlaceName_TownSquare
TRIGGER_QuestComplete_FindSword
TRIGGER_QuestStart_RescueVillager_radius=8
TRIGGER_Item_CollectKey
TRIGGER_Checkpoint_SpawnPoint
TRIGGER_AreaEnter_DarkForest
```

### NPC Examples

```
NPC_Guide_Kael
NPC_Merchant_Ria_dialogue=merchant_ria
NPC_Blacksmith_IntroDialogue
```

### Parameters

- `radius=<number>` - Override interaction radius (default: 3)
- `once=<true|false>` - Trigger fires only once (default: false)
- `dialogue=<path>` - Custom dialogue JSON path for NPCs
- `scale=<number>` - NPC scale multiplier

## 📦 Architecture

### Core Modules

#### `js/TriggerSystem.js`
Auto-detects and manages trigger objects in the scene.

**Features:**
- Scans scene for `TRIGGER_*` named objects
- Proximity-based activation
- One-shot vs repeatable triggers
- Debug visualization (wireframe spheres)
- Event-driven architecture

**Trigger Types:**
- `PlaceName` - Display location name
- `QuestStart` / `QuestComplete` - Quest progression
- `Checkpoint` - Save/spawn point
- `Item` / `Collect` - Item collection
- `AreaEnter` / `AreaExit` - Zone detection
- `Cutscene` - Play cinematic
- `Sound` / `SFX` - Audio trigger
- `Enter` / `Exit` - Generic area triggers

#### `js/NPCSystem.js`
Auto-detects and manages NPC characters.

**Features:**
- Scans scene for `NPC_*` named objects
- Proximity-based interaction
- Key-press or auto-trigger modes
- Toon-shaded mesh generation
- Bobbing animation
- Ink dialogue integration

#### `js/NPC.js`
Individual NPC class with dialogue support.

**Features:**
- Toon material with gradient
- Animated bobbing
- Distance checking
- Visibility culling
- Ink story integration

## 🔧 Usage

### In Blender

1. Create your mesh/empty
2. Name it following the convention:
   ```
   TRIGGER_QuestComplete_DragonDefeated_radius=10
   ```
3. Export as GLB

### In JavaScript

```javascript
import { TriggerSystem } from './js/TriggerSystem.js';
import { NPCSystem } from './js/NPCSystem.js';

// Initialize systems
const triggerSystem = new TriggerSystem(scene, { 
  debugMode: true  // Shows wireframe spheres
});

const npcSystem = new NPCSystem(scene, {
  interactionRadius: 3,
  requireKeyPress: true,  // Require 'E' key to interact
  debugMode: false
});

// Auto-bind all named objects
triggerSystem.scanAndBind();
npcSystem.scanAndBind();

// In your game loop
function update(deltaTime, playerPosition) {
  triggerSystem.update(playerPosition);
  npcSystem.update(deltaTime, playerPosition);
}

// Listen for events
document.addEventListener('questComplete', (e) => {
  console.log(`Quest completed: ${e.detail.questId}`);
});

document.addEventListener('itemCollect', (e) => {
  console.log(`Item collected: ${e.detail.itemId}`);
});
```

### Manual Trigger Creation

```javascript
triggerSystem.addTrigger(
  mesh,                    // THREE.Object3D
  'QuestStart',            // type
  'FindTheSword',          // value
  { radius: 5, once: true } // options
);
```

### NPC Interaction

```javascript
// Auto-trigger (when player gets close)
npcSystem.update(deltaTime, playerPosition);

// Key-press interaction (E key)
npcSystem.interact(playerPosition);
```

## 🎮 Event System

All systems dispatch CustomEvents for loose coupling:

### Trigger Events

- `triggerEnter` - Player entered trigger zone
- `triggerExit` - Player exited trigger zone
- `placeNameShow` - Display location name
- `questStart` - Quest started
- `questComplete` - Quest completed
- `itemCollect` - Item collected
- `areaEnter` / `areaExit` - Zone entered/exited
- `checkpointActivate` - Checkpoint reached
- `cutscenePlay` - Play cinematic
- `sfxPlay` - Play sound effect

### NPC Events

- `npcProximity` - Player near NPC
- `startNPCDialogue` - Begin NPC dialogue (Ink)

### Dialogue Events

- `inkDialogueOpen` - Dialogue started
- `inkDialogueClose` - Dialogue ended
- `storyComplete` - Ink story finished

## 🎨 Debug Mode

Enable debug visualization to see trigger zones and NPC radii:

```javascript
const triggerSystem = new TriggerSystem(scene, { debugMode: true });
const npcSystem = new NPCSystem(scene, { debugMode: true });
```

This renders:
- Green wireframe spheres for trigger zones
- Blue wireframe spheres for NPC interaction radii

## 🔄 Integration with Existing Code

The system is designed to work alongside existing NPC classes:

```javascript
// Existing NPCs from world.js are automatically detected
addNPCs(scene);  // Creates NPC instances
npcSystem.scanAndBind();  // Binds them to auto-system

// Both systems work together
```

## 📐 Design Principles

1. **Data-Driven**: Gameplay defined in Blender, not code
2. **Loose Coupling**: Events, not direct calls
3. **Extensible**: Add new trigger types without modifying core
4. **Debuggable**: Visual feedback for designers
5. **Non-Invasive**: Works with existing codebases

## 🚀 Benefits

- ✅ Designers iterate without programmer help
- ✅ One GLB = layout + gameplay hooks
- ✅ No code recompilation for level changes
- ✅ Visual debugging in-engine
- ✅ Scalable to hundreds of triggers/NPCs
- ✅ Event-driven for clean architecture

## 📚 Examples

### Quest Trigger

```
TRIGGER_QuestStart_FindTheSword_radius=5
```

When player enters, dispatches:
```javascript
{
  type: 'QuestStart',
  value: 'FindTheSword',
  radius: 5
}
```

### NPC with Custom Dialogue

```
NPC_Blacksmith_IntroDialogue_dialogue=blacksmith_intro
```

Auto-loads `assets/dialogue/Story/NPCs/blacksmith_intro.json`

### Collectible Item

```
TRIGGER_Item_GoldKey
```

Dispatches `itemCollect` event, can be picked up once

## ⚠️ Common Pitfalls

- **Scale not applied**: In Blender, always `Ctrl+A` → Apply Scale before export
- **Origin offsets**: Ensure trigger origins match visual position
- **Case sensitivity**: Names are case-sensitive (`TRIGGER_` not `trigger_`)
- **Parameter format**: Use `key=value` with no spaces

## 🛠️ Extending

Add new trigger type:

```javascript
// In TriggerSystem.js _fireTrigger()
case 'MyCustomType':
  this._handleCustom(trigger.value);
  break;

_addCustom(value) {
  // Your logic here
}
```

Add new event listener:

```javascript
document.addEventListener('myCustomEvent', (e) => {
  // Handle event
});
```
