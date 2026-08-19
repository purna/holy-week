# Game Scoring, Progression, and Penalty Systems

< [Back to Main Document](Miracle Maker.md)

## Table of Contents

- [1. Core Loop](#1-core-loop)
- [2. Investigation Score & Detective Rank](#2-investigation-score--detective-rank)
- [3. Research Score & Scholar Level](#3-research-score--scholar-level)
- [4. Doubt System](#4-doubt-system)
- [5. Honor System](#5-honor-system)
- [6. Game Over Conditions](#6-game-over-conditions)

This document provides a comprehensive overview of the game's progression tracks (Investigation, Research, Honor) and the penalty systems (Doubt) that affect them.

---

## 1. Core Loop

The player gains points by:
- **Talking to NPCs** — gathering evidence, identifying contradictions, and successfully challenging witnesses.
- **Solving Lab puzzles** — comparing evidence, filing into correct categories, verifying timelines, and shredding fake evidence.
- **Linking prophecies** — matching scripture to its fulfillment in the Lab for Research Score.

The player loses ground when:
- **Speculating** — viewing evidence detail in the Lab costs Score and adds Doubt.
- **Challenging incorrectly** — failed NPC challenges add Doubt and damage Honor.
- **Ignoring doubt** — accumulated Doubt is multiplied by 2 and subtracted from the final Investigation Score at case conclusion.

---

## 2. Investigation Score & Detective Rank

The **Investigation Score** measures your performance as a detective within a single case. It is calculated when you **conclude the case** — no accusation required. A case can be concluded once all evidence has been found, all prophecies have been discovered, and at least one deduction has been made (`canConcludeCase()`).

### Point-Scoring Actions

| Action | Points Awarded | Notes |
| :--- | :--- | :--- |
| **Case Closed** | `+50` | Awarded once, when a case is concluded. |
| **Full Investigation Bonus** | `+25` | Awarded on conclusion if the case had zero failed NPC challenges and zero incorrect Lab pairings. |
| **Lab Deduction** | `+15` | For each correct evidence pairing in the Lab that yields an investigative insight. |
| **Research Complete** | `+10` (Investigation Score) / `+20` (Research Score) | For each prophecy correctly linked to its fulfillment. Counts toward both tracks. |
| **Successful Challenge** | `+10` | For each "Breakthrough" achieved when challenging an NPC with a contradiction. |
| **Evidence Collected** | `+5` | For each piece of evidence discovered and collected from the scene or dialogue. |

### Point-Penalizing Actions

| Action | Penalty | Notes |
| :--- | :--- | :--- |
| **View Evidence Detail** | `-1 Score` | Each time the player taps the info (ⓘ) button on an evidence card in the Lab. |
| **Incorrect Lab Pairing** | `-5` | For submitting an evidence pair in the Lab that yields no insight — investigative or research (scripture/fulfillment mismatch). Also adds `+5` Doubt. |
| **Doubt Penalty** | `-2` per Doubt point | The total accumulated Doubt is multiplied by 2 and subtracted from the final case score at conclusion. |

### Detective Ranks

| Rank | Score Range |
| :--- | :--- |
| Rookie | 0 – 59 |
| Investigator | 60 – 99 |
| Analyst | 100 – 149 |
| Master Detective | 150+ |

---

## 3. Research Score & Scholar Level

The **Research Score** is a persistent, game-wide progression track that measures your success as a biblical scholar. It is independent of case-solving and rewards exploration, collection, and connecting theological patterns.

### Research Point (RP) Actions

| Action | RP Awarded | Notes |
| :--- | :--- | :--- |
| **Complete Research** | `+20` | For correctly linking a `SCRIPTURE` evidence item to its `FULFILLMENT` evidence in the Lab. Updates the prophecy's Codex status to `complete`. |
| **Complete Hidden Chain** | `+25` | Bonus for completing all prophecies (or evidence) in a multi-case typology chain (e.g., The True Passover Lamb). |

### Scholar Levels

Your total Research Score contributes to a "Biblical Scholar" level. Higher levels unlock bonus content in the Codex (e.g., historical maps, theological notes, developer commentary).

| Level | RP Required |
| :--- | :--- |
| Novice | 0 |
| Student | 100 |
| Scribe | 250 |
| Rabbi | 500 |
| Scholar | 750 |
| Expert | 1000 |
| Master | 1500 |

---

## 4. Doubt System

Doubt is a global penalty meter that tracks investigative missteps. It increases with incorrect actions and speculative behavior, and applies a penalty to the **Investigation Score** when a case is concluded.

*   **Starting Value:** `0`
*   **Minimum Value:** `0` (cannot go negative)
*   **Maximum Value:** `99` (reaching this triggers **Game Over**)
*   **Final Score Penalty:** `Total Doubt × 2` (subtracted from Investigation Score on conclusion)

### Doubt Accrual Triggers

| Action | Doubt Added | Notes |
| :--- | :--- | :--- |
| **View Evidence Detail** | `+1` | Each time the player taps the info (ⓘ) button on an evidence card in the Lab. Speculation carries risk. |
| **Failed NPC Challenge** | `+10` | When challenging an NPC with evidence that does not form a valid contradiction. |
| **Incorrect Lab Pairing** | `+5` | When combining evidence in the Lab that does not yield a scripted insight — investigative or research. |

---

## 5. Honor System

Honor measures the player's standing as an investigator in Jerusalem. It is derived from **Reputation** — the average of four faction reputations (scribes, temple, roman, local).

*   **Starting Value:** `100` (average of all factions)
*   **Range:** `0` to `100`
*   **UI Display:** The UI shows the **average** of all four faction reputations as a single "Honor" value.
*   **Game Over Threshold:** `0` — if Honor reaches zero, the player has lost all credibility and the investigation collapses.

### Honor Change Triggers

| Action | Honor Change | Notes |
| :--- | :--- | :--- |
| **Successful NPC Challenge** | `+5` | Applied to the challenged NPC's faction. Rewards exposing a lie correctly. |
| **Failed NPC Challenge** | `-15` | Applied to the challenged NPC's faction. A significant penalty for a baseless challenge. |

---

## 6. Game Over Conditions

The investigation ends in failure if either threshold is crossed:

| Condition | Threshold | Result |
| :--- | :--- | :--- |
| **Doubt Overflow** | Doubt reaches `99` | The player's uncertainty has paralyzed the investigation. Game Over. |
| **Honor Collapse** | Honor (average reputation) reaches `0` | The player has been discredited across all factions. No one will cooperate. Game Over. |

When either condition is met, the game presents a "Game Over" screen with the option to retry the current case or reset all progress.
