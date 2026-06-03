# Example 01: Narrative & Quest Framework Analysis

## Overview
Example 01 serves as the logical blueprint for the "Miracle Maker" experience. It focuses on the role of the player as a teenage scribe investigating the final week of Jesus in Jerusalem.

## Core Features
*   **Evidence Token System**: A structured way to collect findings (Miracles, Teachings, Prophecies).
*   **Witness Testimony Logic**: Specifically defined NPC roles (Excited Child, Suspicious Merchant, etc.) with conflicting perspectives.
*   **The Trial Mechanic**: A final gameplay state where gathered evidence determines the player's personal conclusion.
*   **Reputation System**: Concept for tracking trust between the Disciples, Temple Leaders, and Romans.

## How it Works
The game progresses through 5 Acts. Each Act unlocks specific "Investigation Quests." Players talk to witnesses to generate "Evidence Tokens," which are then used to build an "Investigation Board." The dialogue is meant to feel like an investigative interview rather than a simple fetch quest.

## Missing in 02
*   **Evidence Logic**: The specific items (e.g., "Donkey King Prophecy") are not represented in the 3D world's inventory.
*   **NPC Logic**: 01 has distinct NPC types (Prophets, Critics, Romans) that need to be instantiated as 3D models in 02.
*   **The Investigation Board**: This is the "brain" of the game and is completely absent from the 02 UI.

## Recommended Improvements
1.  **Conflict Matrix**: Create a clear table of which evidence tokens "challenge" which NPC lies.
2.  **Act Triggers**: Define exactly which "Evidence Tokens" are required to transition from ACT 2 to ACT 3.
3.  **Variable Dialogue**: NPCs should react differently if you have already spoken to their "rival" (e.g., the Merchant reacts if you spoke to the Healed Man).