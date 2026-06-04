# Folder Review: Example 01 - Narrative Foundation

## Current Features
### 1. Advanced Dialogue System (Ink)
Uses `generate_ink.py` to create complex, branching narratives for 16 different characters. This allows for:
- **Contextual Choices:** Players can press, soften, or pivot during conversations.
- **Character Memory:** NPCs remember if they've been "exposed" or "challenged."

### 2. NPC Psychology & Challenge System
- **Truthfulness Rating:** Each NPC has a float value (e.g., 0.55 for Caiaphas) determining how likely they are to lie.
- **Progressive Interrogation:** Dialogue moves through four distinct phases: `neutral`, `cautious`, `pressured`, and `exposed`.

### 3. Evidence Collection & Analysis
- **Analytical vs. Physical:** Distinguishes between documents and objects.
- **Prophetic Links:** Every piece of evidence is tied to Old Testament prophecy (e.g., Malachi 3:1 for the Authority Challenge).
- **Deduction Engine:** Uses a `compare` or `link` logic to combine two pieces of evidence into a "Key Insight."

### 4. Accuse System
- NPCs have an `isLie` flag in their reactions.
- Catching an NPC in a contradiction (e.g., `question_scroll` vs `witness_scroll`) triggers an "Exposed" state.

## Observations
- **Strengths:** Excellent mapping of Biblical history to gameplay mechanics. The "Investigator Notes" provide great flavor.
- **Weaknesses:** The UI for the "Accuse" system is data-heavy; it relies on the player manually finding contradictions in text.

## Suggested Improvements
1.  **Dynamic Evidence Spawning:** Move evidence from static locations in the JS file to a more randomized system based on NPC interactions.
2.  **Visual Evidence Board:** Create a UI component that visually links `propheticLink` to the `evidencePool` items.
3.  **Voice Profile:** Add a `tone` field to NPCs to help the Ink script generator create more distinct voices (e.g., "Arrogant," "Fearful," "Scientific").