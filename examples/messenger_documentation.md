
# Messenger 3D Asset & System Documentation

## 1. Scene setup (Three.js & Cannon.js)
The environment consists of a planet (Radius 50) and a physics world. 
Shadows are driven by a DirectionalLight with a custom camera frustum (-150 to 150) to cover the entire planetary surface.

## 2. Naming Conventions for Asset Replacement
When replacing the primitives with GLB files, use the following names in your scripts or Blender file:

| System | Convention | Example |
| :--- | :--- | :--- |
| **NPCs** | `NPC_[ID]` | `NPC_UNIT_ECHO` |
| **Inventory Items** | `ITEM_[NAME]_[ID]` | `ITEM_DATA_CELL_01` |
| **Locations** | `LOC_[NAME]` | `LOC_NORTH_SPIRE` |
| **Quest Triggers** | `QUEST_[MISSION]_[STEP]` | `QUEST_RECON_01` |

## 3. Animation State Mapping (GLB Replacement)
The character controller currently uses a Box. When you load your `character.glb`, map your AnimationMixer states as follows:
- **IDLE:** Active when `pBody.velocity.length() < 0.1` and grounded.
- **WALK:** Active when `pBody.velocity.length() > 0.1` and grounded.
- **JUMP:** Triggered when the `Space` key is pressed.

## 4. Input Configuration
- **Movement:** WASD / Arrow Keys / Mouse Click.
- **Action:** Space (Jump).
- **NPC Dialogue:** Proximity based (World-Space Bubble).

## 5. Horizon Lock System
To prevent camera flipping on the sphere, the `camera.up` is synchronized to the planet's surface normal (`pBody.position.normalize()`) every frame.
