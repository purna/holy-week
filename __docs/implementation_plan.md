# Implementation Plan: Decoupling Investigation & Research

This document outlines the high-level engineering plan to refactor the game's architecture for **all versions (mobile and desktop)**, separating the core detective gameplay from the biblical research and collection systems. This plan is designed to be executed in phases to manage complexity.

## Phase 1: Data Structure & System Decoupling

**Goal:** Establish the foundational data structures for the two new progression tracks without altering major UI components.

1.  **Update Global State (`gameState.js` or equivalent):**
    *   Introduce a new persistent, global property: `researchScore`, initialized to `0`.
    *   Introduce a new persistent, global object: `codex`, to store the status of all prophecies. Example: `codex: { zechariah_9_9: 'unseen', psalm_22_16_18: 'unseen', ... }`.
    *   The status for each prophecy will be one of: `'unseen'`, `'rumor'`, `'found_scripture'`, `'complete'`.

2.  **Update Case State (`caseManager.js`):**
    *   The per-case `score` property will now be renamed to `investigationScore` to avoid ambiguity.
    *   Modify `submitAccusation()` to calculate and store only the `investigationScore` for the completed case.

3.  **Update Evidence System (`evidenceSystem.js`):**
    *   Add a new evidence type constant: `EVIDENCE_TYPES.SCRIPTURE`.
    *   Update any logic that categorizes or filters evidence to handle this new type.

4.  **Refactor Case Data (`act*_case.js` files):**
    *   **Evidence Pool:** Add new evidence items with `type: 'SCRIPTURE'` for each prophecy scroll/fragment. These should be discoverable items in the game world.
        *   Example: `{ id: 'zechariah_9_9_scroll', name: 'Zechariah 9:9 Scroll Fragment', type: 'SCRIPTURE', ... }`
    *   **Prophecy Objects:**
        *   Add a `scriptureEvidenceId` field to each prophecy object, linking it to the new `SCRIPTURE` evidence item. (e.g., `scriptureEvidenceId: 'zechariah_9_9_scroll'`).
        *   Add a `fulfillmentEvidenceId` field, linking to the evidence that fulfills the prophecy. (e.g., `fulfillmentEvidenceId: 'two_disciples_cloaks'`).

## Phase 2: Reworking the Lab & Codex Logic

**Goal:** Implement the new core mechanics for research and investigation, separating their logic.

1.  **Modify Deduction Engine (`deductionEngine.js`):**
    *   Create two distinct logic paths within the evidence combination function.
    *   **Investigative Deduction:** If neither evidence item is of type `SCRIPTURE`, proceed with the existing logic to check for a valid investigative deduction. On success, award `investigationScore`.
    *   **Research Completion:** If one evidence item is `SCRIPTURE` and the other is not, trigger the new research logic.
        *   Find the prophecy where `prophecy.scriptureEvidenceId` matches the `SCRIPTURE` evidence ID.
        *   Check if the second evidence item's ID matches `prophecy.fulfillmentEvidenceId`.
        *   On success:
            *   Update the prophecy's status in the global `codex` object to `'complete'`.
            *   Add points to the global `researchScore`.
            *   Trigger a "Research Complete" UI notification.
        *   On failure: Add to the `doubt` score.

2.  **Update Scoring Logic (`scoringSystem.js` or `caseManager.js`):**
    *   Remove the old "Prophecies Linked: +10 points" from the `investigationScore` calculation.
    *   Create a new function `addResearchPoints(points)` that updates the global `researchScore` and handles the "Biblical Scholar" level progression.

## Phase 3: Implementing the New Discovery Flow & UI

**Goal:** Connect the new systems to the player-facing UI and implement the multi-stage discovery process.

1.  **Update NPC System (`npcSystem.js` / Dialogue Manager):**
    *   Modify the logic that handles the `revealsProphecy` tag in dialogue.
    *   Instead of unlocking the prophecy directly, it should now update the prophecy's status in the global `codex` object to `'rumor'`.
    *   Trigger a "New Rumor" UI notification.

2.  **Update Evidence Collection Logic (`evidenceSystem.js`):**
    *   When an evidence item is collected, check if its type is `SCRIPTURE`.
    *   If it is, find the corresponding prophecy (by matching `prophecy.scriptureEvidenceId`) and update its status in the global `codex` to `'found_scripture'`.
    *   Trigger a "Scripture Found" UI notification.

3.  **Overhaul Codex UI (`codexUI.js`):**
    *   Rename the "Accuse" or "Prophecy" tab to "Codex".
    *   The UI should now read from the global `codex` object.
    *   Render the list of all prophecies, with visual states corresponding to their status:
        *   `'unseen'`: Not visible or completely hidden.
        *   `'rumor'`: Greyed out, title might be "???".
        *   `'found_scripture'`: Title and scripture text are visible.
        *   `'complete'`: Full entry is visible (significance, context, etc.).
    *   Add a prominent display for the player's total `Research Score` and their "Biblical Scholar" level (e.g., Novice, Scribe, Master).

## Phase 4: Hidden Chains & Bonus Content

**Goal:** Implement the meta-game of typologies and reward completionists.

1.  **Create Chain Manager (`chainManager.js`):**
    *   Define the "Hidden Chains" or typologies in a data structure, listing the required prophecy IDs for each chain.
    *   This manager will listen for events when a prophecy's status changes to `'complete'`.
    *   When a prophecy is completed, it checks if this completion finishes a chain.
    *   On chain completion:
        *   Award a large bonus to `researchScore`.
        *   Unlock a special "Master Pattern" entry in the Codex.
        *   Trigger a "New Discovery: The True Passover Lamb" UI notification.

2.  **Expand Codex UI (`codexUI.js`):**
    *   Add sections for the bonus content unlocked by "Biblical Scholar" levels (maps, timelines, word studies).
    *   These sections are initially locked and become visible as the player's `researchScore` reaches certain thresholds.

This phased approach ensures that the core data model is sound before building the logic and UI on top of it, reducing complexity and making the refactoring process more manageable.
