# Example 02: 3D World Engine Analysis

## Overview
Example 02 is the technical implementation. It provides the 3D environment, character movement, and the UI shell, but currently functions more as a "walking simulator" than an investigation game.

## Core Features
*   **3D Environment**: Spherical planet physics with gravity and colliders.
*   **WhatsApp-Style Dialogue**: High-quality chat interface using the Ink.js runtime.
*   **VFX & Atmosphere**: Dynamic day/night cycle, landing decals, and particle trails.
*   **Action System**: Support for keyboard-bound actions (E, F) with floating icon feedback.
*   **Toon Shading**: A consistent anime-style aesthetic for characters and environment.

## How it Works
The engine uses `config.js` to spawn NPCs and items at spherical coordinates. Interaction is distance-based; when a player is near an NPC, a "CONNECT" prompt appears, launching an Ink-driven conversation.

## Technical Gaps (Compared to 01)
*   **Investigation Manager**: Added `InvestigationManager.js` to handle the Conflict Matrix (Evidence vs NPC lies).
*   **Evidence System**: Added `EvidenceSystem.js` to track narrative tokens separately from physical items.
*   **Contextual Actions**: Prompt UI updated to support `[E] Talk`, `[Q] Challenge`, and `[R] Accuse`.
*   **Quest-Dialogue Linking**: The `questId` property in the NPC config is currently a static reference. It needs to be linked to the `tasks` checklist so that dialogue choices increment progress.
*   **NPC Persistence**: NPCs need to move or change state based on the current "Act" from Example 01.

## Recommended Improvements
1.  **Contextual Actions**: Update `NPCSystem.js` to show multiple prompts when near an NPC: `[E] Talk`, `[Q] Challenge`, `[R] Accuse`.
2.  **Evidence UI**: Create a specialized "Evidence" tab in the inventory that shows the "Evidence Tokens" collected from the design doc.
3.  **Ink Integration**: Add an `external function` in Ink called `has_evidence(id)` that the game engine resolves by checking the player's inventory.
4.  **Blender Workflow**: Use the naming convention `NPC_Accuse_{Name}` to automatically flag NPCs that can be targeted in the final Act.