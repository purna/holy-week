# Game Scoring, Doubt, and Reputation Systems

This document provides a comprehensive overview of the scoring, doubt, and reputation systems in Miracle Maker. It details how points are awarded, how penalties are accrued, and how player actions affect their standing with various factions.

## 1. Core Scoring System

The player's performance in each case is evaluated based on several factors. The final score is calculated when an accusation is made.

### Point-Scoring Actions

| Action | Points Awarded | Notes |
| :--- | :--- | :--- |
| **Correct Accusation** | `+50` | The single largest point award for solving the case. |
| **Lab Deduction** | `+15` (Key) / `+8` (Standard) | For each correct evidence pairing in the Lab. Key deductions are worth more. |
| **Prophecy Linked** | `+10` | For each prophecy correctly linked to its fulfilling evidence in the Codex. |
| **Successful Challenge** | `+10` | For each "Breakthrough" achieved when challenging an NPC with a contradiction. |
| **Evidence Collected** | `+5` | For each piece of evidence discovered and collected from the scene or dialogue. |
| **Perfect Case Bonus** | `+25` | Awarded if the accusation is correct and no failed challenges were made. |

### Point-Penalizing Actions

| Action | Points Penalty | Notes |
| :--- | :--- | :--- |
| **Incorrect Accusation** | `-25` | A significant penalty for failing to solve the case. |
| **Incorrect Lab Pairing** | `-5` | For submitting an evidence pair/operation in the Lab that yields no insight. |
| **Doubt Penalty** | `-2` per Doubt point | The total accumulated Doubt is multiplied by 2 and subtracted from the final score. |

---

## 2. Doubt System

Doubt is a global penalty meter that tracks investigative missteps. It increases with incorrect actions and applies a penalty to the final score of each case.

*   **Starting Value:** `0`
*   **Minimum Value:** `0` (cannot go negative)
*   **Final Score Penalty:** `Total Doubt × 2`

### Doubt Accrual Triggers

| Action | Doubt Added | Notes |
| :--- | :--- | :--- |
| **Incorrect Accusation** | `+25` | The largest single source of Doubt. |
| **Failed Challenge** | `+10` | When challenging an NPC with evidence that does not form a valid contradiction. |
| **Incorrect Lab Pairing** | `+5` | When combining evidence in the Lab that does not yield a specific, scripted insight. |
| **Incorrect Prophecy Link** | `+5` | When linking a prophecy to the wrong piece of evidence in the Codex. |

---

## 3. Reputation System

Reputation measures the player's standing with the four major factions in Jerusalem. High reputation can lead to more cooperative witnesses, while low reputation can cause them to become hostile.

*   **Factions:**
    *   `scribes` — Religious scholars and teachers
    *   `temple` — Temple authorities and priests
    *   `roman` — Roman military and administrative officials
    *   `local` — Local Jerusalem residents and merchants
*   **Starting Value:** `100` per faction
*   **Range:** `0` to `100`
*   **UI Display:** The UI shows the **average** of all four faction reputations as a single number.

### Reputation Change Triggers

| Action | Reputation Change | Notes |
| :--- | :--- | :--- |
| **Successful Challenge** | `+5` | Applied to the challenged NPC's faction. Rewards exposing a lie correctly. |
| **Failed Challenge** | `-15` | Applied to the challenged NPC's faction. A significant penalty for a baseless challenge. |

---

## Analysis & Suggested Improvements

The current system effectively rewards thoroughness and accuracy while penalizing guesswork. The three interconnected systems (Score, Doubt, Reputation) create interesting trade-offs for the player.

### Strengths

1.  **Clear Incentives:** The system clearly rewards the core gameplay loops: finding evidence, making deductions, and correctly identifying the truth.
2.  **Risk vs. Reward:** Challenging NPCs is a high-stakes action. A correct challenge yields points and reputation, while a failure is costly in both doubt and reputation, forcing players to be confident in their logic.
3.  **Thematic Cohesion:** The "Doubt" and "Reputation" mechanics are thematically appropriate for a detective game set in a complex social and political environment.
4.  **Replayability:** The scoring breakdown encourages players to replay cases to achieve a "Perfect Case" bonus or improve their rank.

### Areas for Improvement & Potential Enhancements

1.  **Deepen the Reputation System:**
    *   **Problem:** Currently, Reputation primarily affects dialogue and is averaged in the UI. Its impact could be more direct and visible.
    *   **Suggestion:**
        *   **Scoring Bonus/Penalty:** Add a "Reputation Modifier" to the final case score. For example, an average reputation above 80 could grant a `+10%` bonus, while an average below 30 could apply a `-10%` penalty. This makes maintaining good relations a strategic goal with a clear reward.
        *   **Information Gating:** Tie the unlocking of specific, valuable (but not essential) evidence to high reputation with a certain faction. A trusted investigator might be given a sensitive document that an untrusted one would not.

2.  **Refine the Doubt System:**
    *   **Problem:** The Doubt penalty is purely numerical at the end of a case. It could be integrated more into the active investigation.
    *   **Suggestion:**
        *   **Dynamic Difficulty:** If Doubt exceeds a certain threshold (e.g., 50), NPCs could become more guarded. Their `dialogue` could shift to more evasive "cautious" or "pressured" responses, making it harder to get information. This would make early-case mistakes have tangible consequences later in the same case.
        *   **Doubt Reduction:** Introduce a high-cost, high-reward "moment of clarity" action. For example, correctly solving a particularly difficult optional puzzle or making a key multi-stage deduction could reduce Doubt by a small amount, representing the investigator regaining their confidence.

3.  **Add Positive Scoring for Non-Essential Interactions:**
    *   **Problem:** The scoring is heavily focused on the "critical path" of solving the case. Atmospheric or thematic actions, like those in the `Actions` tab, don't contribute.
    *   **Suggestion:**
        *   **Exploration/Interaction Points:** Award a small number of points (`+1` or `+2`) for interacting with non-essential world objects or exhausting all dialogue with non-suspect flavor NPCs. This encourages players to fully immerse themselves in the world you've built.
        *   **"Act of Mercy" Bonus:** In cases where a suspect is technically guilty but acted under duress or with noble intentions, the player could be given a choice to "Recommend Leniency" after a correct accusation for a small "Mercy" score bonus.

4.  **Make Scoring More Transparent In-Game:**
    *   **Problem:** While the final score screen is clear, players may not always understand *why* their Doubt or Reputation changed during gameplay.
    *   **Suggestion:**
        *   **Explicit Feedback:** When an action changes Doubt or Reputation, provide a small, clear UI notification (e.g., `+10 Doubt (Failed Challenge)` or `-15 Roman Reputation`). This is already done well for point-scoring actions like "Prophecy Linked" and could be extended to penalties. This reinforces the rules of the world for the player.

By implementing some of these suggestions, you can make the scoring and reputation systems even more integral to the moment-to-moment gameplay, enhancing strategic depth and player engagement.

5.  **Introduce Dynamic Scoring Based on Difficulty and Performance:**
    *   **Problem:** The point values are static. A more dynamic system could better reward skilled play and adapt to the selected difficulty.
    *   **Suggestion:**
        *   **Difficulty Modifier:** Your `Game Case & Lab Reference.md` mentions difficulty settings. Tie these directly to scoring. On 'Hard' difficulty, all positive point awards could be increased by 25% (e.g., a Key Lab Deduction is worth `18` points instead of `15`), but penalties are also harsher (e.g., a Failed Challenge adds `+15` Doubt instead of `+10`). This creates a higher-risk, higher-reward experience.
        *   **"Efficiency" Bonus:** Track the number of actions (dialogue choices, lab attempts, challenges) a player takes to solve a case. If the player solves it under a certain threshold of actions, award an "Efficient Investigator" bonus of `+15` points. This rewards players who think ahead and avoid unnecessary steps.

6.  **Integrate Thematic Actions into Scoring:**
    *   **Problem:** The `🙏 Pray` and `❤️‍🩹 Heal` actions are currently only atmospheric, as noted in `Miracle Maker.md`. They could be powerful thematic mechanics.
    *   **Suggestion:**
        *   **"Prayer for Insight" Mechanic:** Allow the `🙏 Pray` action to be used once per case. When used, it could provide a cryptic hint related to the case's central spiritual theme or point towards a key prophecy. Using it might cost a small number of points (`-5`) or disable a different bonus, creating a trade-off: do you sacrifice score for a clue?
        *   **"Act of Faith" Bonus:** In cases involving a direct miracle (e.g., `gethsemane_arrest` with the healed ear), using the `❤️‍🩹 Heal` action on the victim could trigger a unique dialogue or insight and award a small, thematic "Faith" bonus (`+5` points). This directly rewards the player for engaging with the game's core themes.
