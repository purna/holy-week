# Game Scoring, Progression, and Penalty Systems

< [Back to Main Document](Miracle Maker.md)

## Table of Contents

- [1. Investigation Score & Detective Rank](#1-investigation-score--detective-rank)
- [2. Research Score & Scholar Level](#2-research-score--scholar-level)
- [3. Doubt System](#3-doubt-system)
- [4. Reputation System](#4-reputation-system)

This document provides a comprehensive overview of the game's two primary progression tracks (Investigation and Research) and the penalty systems (Doubt and Reputation) that affect them.

---

## 1. Investigation Score & Detective Rank

The **Investigation Score** measures your performance as a detective within a single case. It is calculated when you submit your final accusation and determines your case-specific rank. This score is focused purely on case-solving skills.

### Point-Scoring Actions

| Action | Points Awarded | Notes |
| :--- | :--- | :--- |
| **Correct Accusation** | `+50` | The single largest point award for solving the case. |
| **Lab Deduction** | `+15` | For each correct evidence pairing in the Lab that yields an investigative insight. |
| **Successful Challenge** | `+10` | For each "Breakthrough" achieved when challenging an NPC with a contradiction. |
| **Evidence Collected** | `+5` | For each piece of evidence discovered and collected from the scene or dialogue. |
| **Perfect Case Bonus** | `+25` | Awarded if the accusation is correct and no failed challenges were made. |

### Point-Penalizing Actions

| Action | Penalty | Notes |
| :--- | :--- | :--- |
| **Incorrect Accusation** | `-25` | A significant penalty for failing to solve the case. Also adds +25 Doubt. |
| **Incorrect Lab Pairing** | `-5` | For submitting an evidence pair in the Lab that yields no investigative insight. Also adds `+5` Doubt. |
| **Doubt Penalty** | `-2` per Doubt point | The total accumulated Doubt is multiplied by 2 and subtracted from the final case score. |

### Detective Ranks

| Rank | Score Range |
| :--- | :--- |
| Rookie | 0 – 59 |
| Investigator | 60 – 99 |
| Analyst | 100 – 149 |
| Master Detective | 150+ |

---

## 2. Research Score & Scholar Level

The **Research Score** is a persistent, game-wide progression track that measures your success as a biblical scholar. It is independent of case-solving and rewards exploration, collection, and connecting theological patterns.

### Research Point (RP) Actions

| Action | RP Awarded | Notes |
| :--- | :--- | :--- |
| **Discover Scripture** | `+10` | For finding a `SCRIPTURE` evidence item for the first time. |
| **Complete Research** | `+20` | For correctly linking a `SCRIPTURE` to its `FULFILLMENT` evidence in the Lab. |
| **Find OT Scroll** | `+15` | For discovering optional Old Testament scrolls that provide context. |
| **Complete Hidden Chain** | `+50` | A large bonus for completing all prophecies in a multi-case typology (e.g., The Passover Lamb). |

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

## 3. Doubt System

Doubt is a global penalty meter that tracks investigative missteps. It increases with incorrect actions and applies a penalty to the **Investigation Score** at the end of each case.

*   **Starting Value:** `0`
*   **Minimum Value:** `0` (cannot go negative)
*   **Final Score Penalty:** `Total Doubt × 2` (subtracted from Investigation Score)

### Doubt Accrual Triggers

| Action | Doubt Added | Notes |
| :--- | :--- | :--- |
| **Incorrect Accusation** | `+25` | The largest single source of Doubt. |
| **Failed NPC Challenge** | `+10` | When challenging an NPC with evidence that does not form a valid contradiction. |
| **Incorrect Lab Pairing** | `+5` | When combining evidence in the Lab that does not yield a scripted insight (investigative or research). |

---

## 4. Reputation System

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
| **Successful NPC Challenge** | `+5` | Applied to the challenged NPC's faction. Rewards exposing a lie correctly. |
| **Failed NPC Challenge** | `-15` | Applied to the challenged NPC's faction. A significant penalty for a baseless challenge. |
