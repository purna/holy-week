# Miracle Maker - Source of Truth

## Table of Contents

- [Games](#games)
- [Linked Documentation](#linked-documentation)
- [Core Gameplay Philosophy: Two Progression Paths](#core-gameplay-philosophy-two-progression-paths)
- [Prophecy & Typology System](#prophecy--typology-system)
  - [Categories in the Codex](#categories-in-the-codex)
  - [Discovery Steps](#discovery-steps)
- [Codex: Biblical Patterns Section](#codex-biblical-patterns-section)
  - [Predictive Prophecies (Direct OT Predictions)](#predictive-prophecies-direct-ot-predictions)
  - [Typological Fulfilments (Types & Shadows)](#typological-fulfilments-types--shadows)
- [Typology Deep Dive: The Passover Lamb](#typology-deep-dive-the-passover-lamb)
  - [Case Details](#case-details)
  - [Evidence Items](#evidence-items)
  - [Lab Mechanics & "Aha!" Moment](#lab-mechanics--aha-moment)
- [Typology Deep Dive: The Priest-King of Salem](#typology-deep-dive-the-priest-king-of-salem)
- [Hidden Detective Chains](#hidden-detective-chains)
  - [Chain 1 — Psalm 22 (Crucifixion Prophecy Chain)](#chain-1--psalm-22-crucifixion-prophecy-chain)
  - [Chain 2 — Passover Lamb (The True Passover)](#chain-2--passover-lamb-the-true-passover)
  - [Chain 3 — Day of Atonement (The Greater Atonement)](#chain-3--day-of-atonement-the-greater-atonement)
  - [Chain 4 — New Covenant (Covenant of Blood)](#chain-4--new-covenant-covenant-of-blood)
  - [Chain 5 — Resurrection (Death Defeated)](#chain-5--resurrection-death-defeated)
  - [Cross-Case Discovery Mechanics](#cross-case-discovery-mechanics)
- [Prophecy Collection System](#prophecy-collection-system)
- [Scoring & Gameplay Systems](#scoring--gameplay-systems)
- [Core Gameplay Systems](#core-gameplay-systems)
- [Acts & Cases](#acts--cases)
- [Canonical Runtime Dialogue ID Reference (Auto-Generated)](#canonical-runtime-dialogue-id-reference-auto-generated)
- [Appendix: Emoji Reference](#appendix-emoji-reference)
- [Appendix: Character Emoji & Icon Reference](#appendix-character-emoji--icon-reference)
- [Appendix: Location Emoji & Icon Reference](#appendix-location-emoji--icon-reference)
- [Appendix: Act & Case Emoji & Icon Reference](#appendix-act--case-emoji--icon-reference)

**Note on Suspects:** All characters begin as potential suspects; Lab research reveals their status (implicated, cleared, etc.) as investigative texture. There is no accusation — a case is solved by fully researching it: finding every piece of evidence and Lab-linking every prophecy tied to that case, then concluding it.

This document serves as the canonical source of truth for the game's narrative structure, characters, and case resolutions for both mobile and desktop versions. It is generated from the `act*.js` case files.

---
[Back to Top](#table-of-contents)

## Games

Currently 4 versions all using a core gameplay 
*  [`/mobile/`](../mobile/)
*  [`/mobile3D/`](../mobile3D/)
*  [`/mobile2D/`](../mobile3D/)
*  [`/desktop/`](../desktop/)

## Linked Documentation

*   [**Holy Week Chronology**](`holy_week_chronology.md`) holy_week_chronology.md : The master timeline of events, locations, prophecies, and historical context.
*   [**Character Dialogue Profiles**](`Character_Dialogue_Profiles.md`) Character_Dialogue_Profiles.md : Master index of all character dialogue profiles, roles, and linguistic styles.
*   [**Game Case & Lab Reference**](`Game Case & Lab Reference.md`) Game Case & Lab Reference.md : Master reference for Lab mechanics, UI specs, and case evidence databases.
*   [**Prophecy & Evidence Links**](`prophecies.md`) : Maps every case to its prophecies and evidence links.
*   [**Scoring System**](`ScoringSystem.md`) ScoringSystem.md: Comprehensive overview of the scoring, doubt, and reputation systems.
*   [**System Architecture**](`CONFIG.md`) CONFIG.md: Technical documentation for the game's configuration and engine systems.
*   [**Trigger & NPC System**](`TRIGGER_NPC_SYSTEM.md`) TRIGGER_NPC_SYSTEM.md: Design pattern for binding Blender objects to game logic.


---
[Back to Top](#table-of-contents)

## Prophecy & Typology System

Unlocking prophetic and typological insights is a key mechanics layer for scoring and narrative discovery.

### Categories in the Codex
1. **Fulfilled Prophecies:** Direct OT predictions matched with NT events (e.g., Zechariah 9:9).
2. **Typological Fulfilments (Types & Shadows):** Structural patterns where OT historical events foreshadow Christ (e.g., Passover Lamb sequence).

### Discovery Steps
1. **Reveal (Discovery):** Unlocked through NPC conversation or Lab analysis (`revealsProphecy`).
2. **Link (Codex):** Match the revealed prophecy's Scripture evidence to its Fulfillment evidence in the Lab.
3. **Scoring ("Research Complete"):** A correct link in the Lab awards `+20 Research Score` and `+10 Investigation Score`. An incorrect link adds `+5 Doubt` and a `-5` point penalty to the Investigation Score.
4. **Case Resolution:** A case is solved when all its prophecies are marked `complete` in the Lab. This is the win condition for all cases.


## Codex: Biblical Patterns Section

The Codex features a dedicated section for **Biblical Patterns & Typology**, distinguishing between predictive prophecies and typological fulfilments:

### Predictive Prophecies (Direct OT Predictions)

| Prophecy | Scripture | Category | Codex Entry |
|---|---|---|---|
| The Rejected City | Jeremiah 19:10–11; Daniel 9:26 | Prophecy | *The Rejected City* |
| The Rejected King | Psalm 2:1–6; Isaiah 8:14–15 | Prophecy | *The Rejected King* |
| The New Covenant | Jeremiah 31:31–34; Exodus 24:8 | Prophecy | *The New Covenant* |
| The Scattered Sheep | Zechariah 13:7 | Prophecy | *The Scattered Sheep* |
| The Silent Lamb | Isaiah 53:7; Psalm 27:12; Isaiah 50:6 | Prophecy | *The Silent Lamb* |
| Psalm 22 | Psalm 22:1, 7–8, 16, 18 | Prophecy | *Psalm 22 Fulfilled* |
| The Perfect Sacrifice | Zechariah 12:10; Exodus 12:46; Psalm 34:20 | Prophecy | *The Perfect Sacrifice* |
| The Unexpected Tomb | Isaiah 53:9 | Prophecy | *The Unexpected Tomb* |
| The Firstfruits of Resurrection | Leviticus 23:9–14; Psalm 16:10; Hosea 6:2; Isaiah 53:10–11 | Prophecy | *The Firstfruits of Resurrection* |

### Typological Fulfilments (Types & Shadows)

* **Passover Lamb** (Exodus 12)
* **Bronze Serpent** (Numbers 21)
* **Jonah** (Jonah 1)
* **Hyssop at Passover** (Exodus 12:22)
* **Manna** (Exodus 16)
* **Melchizedek** (Genesis 14)
* **Isaac Carrying the Wood** (Genesis 22)
* **Joseph Rejected then Exalted** (Genesis 37–45)
* **Day of Atonement / Scapegoat** (Leviticus 16)
* **Red Heifer** (Numbers 19)
* **Abel's Righteous Blood** (Genesis 4)
* **Rock Struck for Water** (Exodus 17)

---
[Back to Top](#table-of-contents)

## Typology Deep Dive: The Passover Lamb

### Case Details
* **ID:** `passover_lamb_chain` (Act II) & `crucifixion_site` (Act III)
* **Theme:** The detective discovers that Jesus is intentionally fulfilling the multi-day Passover Lamb sequence from Exodus 12.

### Evidence Items
*   🧴 **Flask of Nard (`nard_flask`):** Anointing of Jesus's feet at Bethany (John 12). *Typology: The anointing of Jesus's feet with expensive perfume was an act of profound worship. In the Old Testament, anointing with oil consecrated kings (1 Samuel 16:13) and priests (Exodus 30:30) for service. This act sets Jesus apart as the Messiah (the "Anointed One") and, as Jesus Himself stated, prepares His body "beforehand for burial" (Mark 14:8).*
*   🏺 **Broken Alabaster Jar (`alabaster_jar`):** Anointing of Jesus's head (Matthew 26). *Typology: The anointing of Jesus's head directly mirrors the way kings like Saul and David were anointed, signifying His royal authority. It also serves as a prophetic act of consecration, setting Him apart as the ultimate High Priest and King who would offer Himself as the final sacrifice.*
*   📜 **Temple Inspection Notes (`inspection_notes`):** Jesus is publicly questioned by priests and found without fault. *Typology: The lamb is inspected for four days.*
*   🌿 **Sponge Soaked in Sour Wine (`sour_wine_sponge`):** The sponge is lifted to Jesus on a hyssop branch at the cross (John 19:29). *Typology: Hyssop was used to apply the lamb's blood to the doorposts for salvation (Exodus 12:22).*

### Lab Mechanics & "Aha!" Moment
When players link evidence from across multiple cases (e.g., `nard_flask` + `alabaster_jar` + `sour_wine_sponge`), the game unlocks the hidden pattern:

> **Hidden Pattern Discovered:** 
> *Jesus is intentionally following the Passover Lamb sequence (Selection -&gt; Inspection -&gt; Anointing -&gt; Sacrifice).*


## Typology Deep Dive: The Priest-King of Salem

*   **Case:** `last_supper` (Act III)
*   **Evidence:** `Spilled Wine on the Linen` (`wine_stain`)
*   **Typology:** Melchizedek, the mysterious priest-king of Salem, blessed Abraham with bread and wine (Genesis 14:18). Jesus, as the ultimate priest-king (Hebrews 7), uses the same elements to establish the New Covenant, fulfilling this ancient pattern.


## Hidden Detective Chains

Hidden Detective Chains are **cross-case discovery patterns** that unlock bonus Codex entries when the player links all related evidence items from multiple cases. Each chain represents a complete theological arc spanning multiple days of Holy Week.

### Chain 1 — Psalm 22 (Crucifixion Prophecy Chain)

| Detail | Information |
|---|---|
| **Theme** | The complete crucifixion psalm fulfilled scene by scene |
| **Cases Involved** | `crucifixion_site` (Act III) |
| **Unlock Requirements** | Mocking Witness, Roman Dice, Crucifixion Nails, Divided Garments, Sour Wine |
| **Reward** | Codex Entry: *Psalm 22 Fulfilled* |
| **Scoring** | +25 bonus points, +10 Faith |
| **Unlock Conditions** | All 5 evidence items linked to their respective Psalm 22 prophecy entries in the Codex |

### Chain 2 — Passover Lamb (The True Passover)

| Detail | Information |
|---|---|
| **Theme** | Jesus follows the Exodus 12 lamb-sacrifice sequence |
| **Cases Involved** | `last_supper` (Act III), `crucifixion_site` (Act III), `passover_lamb_chain` (Act II) |
| **Unlock Requirements** | Lamb Selection, Temple Inspection, Hyssop Branch, Unbroken Bones, Crucifixion |
| **Reward** | Codex Entry: *The True Passover Lamb* |
| **Scoring** | +25 bonus points, +10 Faith |
| **Unlock Conditions** | Evidence from `nard_flask`, `alabaster_jar`, `inspection_notes`, `sour_wine_sponge`, `unbroken_legs` all linked across cases |

### Chain 3 — Day of Atonement (The Greater Atonement)

| Detail | Information |
|---|---|
| **Theme** | Christ fulfills the dual role of sacrificial lamb and scapegoat |
| **Cases Involved** | `barabbas_choice` (Act III), `sanhedrin_trial` (Act III), `crucifixion_site` (Act III) |
| **Unlock Requirements** | High Priest, Trial, Scapegoat Evidence, Outside-the-City Execution |
| **Reward** | Codex Entry: *The Greater Atonement* |
| **Scoring** | +25 bonus points, +10 Faith |
| **Unlock Conditions** | Evidence linking Caiaphas's high-priestly role, the trial records, Barabbas as scapegoat, and the crucifixion outside the city all connected |

### Chain 4 — New Covenant (Covenant of Blood)

| Detail | Information |
|---|---|
| **Theme** | The Jeremiah-prophesied new covenant is inaugurated |
| **Cases Involved** | `last_supper` (Act III) |
| **Unlock Requirements** | Bread, Wine, Jeremiah Scroll, Upper Room Witness |
| **Reward** | Codex Entry: *The New Covenant* |
| **Scoring** | +25 bonus points, +10 Faith |
| **Unlock Conditions** | `bread_crumbs`, `wine_stain`, `new_covenant_declaration`, and Upper Room preparation evidence all linked to Jeremiah 31:31–34 |

### Chain 5 — Resurrection (Death Defeated)

| Detail | Information |
|---|---|
| **Theme** | Christ's resurrection fulfills the pattern of Jonah's sign and the hope of resurrection |
| **Cases Involved** | `crucifixion_site` (Act III) → `resurrection` (Act IV) |
| **Unlock Requirements** | Guards' Broken Report, Opened Tombs, Empty Tomb, Mary's Testimony |
| **Reward** | Codex Entry: *Death Defeated* |
| **Scoring** | +25 bonus points, +10 Faith |
| **Unlock Conditions** | `guard_report`, `opened_tombs`, `empty_tomb`, and `mary_encounter` evidence all linked across prophecy entries |

### Cross-Case Discovery Mechanics

Hidden chains are discovered through the **Codex** tab. When a prophecy from one case is linked to evidence from a *different* case that also relates to the same chain, a "Cross-Case Discovery" notification appears. Completing all links in a chain triggers the bonus Codex entry.

| Chain | Cross-Case Links | Trigger Point |
|---|---|---|
| Day of Atonement | `sanhedrin_trial`: `torn_robe` → `isaiah_50_6`, `barabbas_choice`: `barabbas_warrant` → scapegoat, `crucifixion_site`: `pierced_spear` → `zechariah_12_10` | After linking all 3 pieces of evidence |
| Passover Lamb | `passover_lamb_chain`: `nard_flask` / `alabaster_jar` → `typology_passover_lamb`, `last_supper`: `wine_stain` → `typology_melchizedek`, `crucifixion_site`: `unbroken_legs` → `psalm_34_20` | After linking evidence from 3 cases |
| New Covenant | `last_supper`: `bread_crumbs` → Exodus 12:1–14, `wine_stain` → Melchizedek typology, `new_covenant_declaration` → Jeremiah 31:31–34 | After linking all 3 Last Supper evidence |
| Resurrection | `crucifixion_site` → `resurrection`: `guard_report`, `opened_tombs`, `empty_tomb`, `mary_encounter` | After linking all 4 resurrection evidence |

# Prophecy Collection System

This system has been superseded by the unified Lab-based research flow. Prophecies are discovered, researched by linking `SCRIPTURE` and `FULFILLMENT` evidence in the Lab, and tracked in the Codex. The "Accuse" tab has been repurposed into a "Case File" tab showing prophecy completion status and the "Conclude Case" button.

---

## Overview

The prophecy collection system allows players to discover and track biblical prophecies that are fulfilled throughout their investigation. Prophecies work similarly to evidence but are categorized separately and displayed in a dedicated Codex tab.

## Architecture

### Evidence Type Addition
- A new evidence type, `SCRIPTURE`, is added for scrolls and fragments.

### Case Manager Tracking
- A `prophecyStatus` object tracks the state of each prophecy: `'unseen'`, `'rumor'`, `'found_scripture'`, `'complete'`.

### NPC System Integration
- Dialogue with `revealsProphecy` sets the prophecy status to `'rumor'`.

### UI Changes
- The Accuse tab was repurposed into a **Case File** view: a per-case prophecy checklist (each entry showing its Codex status) plus the **Conclude Case** action, enabled once all evidence is found, all prophecies are `complete`, and at least one deduction has been made. It sits alongside the separate, game-wide **Codex** tab, which shows the full Biblical Patterns collection and Scholar level.
- The Codex displays all prophecies, filterable by status (Rumor, Found, Complete).
- A "Biblical Scholar" level and "Research Score" are displayed.

### Prophecy Discovery Flow

A prophecy progresses through four stages before it is considered "Complete."

1.  **Stage 1: Rumor (Heard About)**
    *   **Action:** An NPC mentions a prophecy in dialogue.
    *   **Result:** A new, greyed-out entry appears in the Codex, often with a hidden title (e.g., "The Prophecy of the Pierced Shepherd").

2.  **Stage 2: Scripture (Found)**
    *   **Action:** The player finds the relevant scripture fragment or scroll as a piece of evidence.
    *   **Result:** The Codex entry updates to show the prophecy's text (e.g., "Zechariah 13:7"). It is marked as "Found" but remains incomplete.

3.  **Stage 3: Evidence (Matched)**
    *   **Action:** The player collects the piece of evidence that fulfills the prophecy (e.g., `Scattered Disciples' Cloaks`).
    *   **Result:** The evidence is now available for analysis. The Codex may show a checkmark indicating the fulfillment evidence has been found.

4.  **Stage 4: Research (Complete)**
    *   **Action:** In the Lab, the player correctly links the **Scripture Evidence** with the **Fulfillment Evidence**.
    *   **Result:** The research is marked complete. The full Codex entry unlocks, revealing its significance, historical context, and gospel links. This awards a significant amount of **Research Points**.

## Hidden Chains Integration

- Hidden Detective Chains span multiple cases
- `chainManager.js` tracks cross-case evidence-to-prophecy linkages
- `chainsCompleted` array stored in `caseState` per case
- Cross-case links trigger a "Discovery" notification in the Codex
- Completing a chain unlocks a bonus Codex entry and awards Faith

## Prophecy Data Structure

```javascript
{
  id: "zechariah_9_9",
  reference: "Zechariah 9:9",
  text: "Rejoice greatly, O daughter of Zion!...",
  written: "~520 BC",
  fulfilledBy: "Jesus riding a donkey colt into Jerusalem",
  gospelLink: "Matthew 21:4-5; John 12:14-15",
  insight: "The donkey was not a practical choice...",
  icon: "🔮",
  location: "Bethphage, Mount of Olives",
  type: "PROPHECY"
}
```

---
[Back to Top](#table-of-contents)

* **Story files present:** 79
* **Distinct `storyFile` references used:** 62
* **Story files NOT referenced by any act case (unused):** 18
* **`storyFile` references with NO matching file (orphans / broken links):** 1 — `chief_priest`

## ⚠️ Broken Reference (fixed)
* `js/act2_case.js` referenced `storyFile: "chief_priest"` (NPC id `chief_priest` = Caiaphas), but no `chief_priest.ink`/`.json` exists. The correct file is `caiaphas_priest`. **Corrected** in `js/act2_case.js:213` to `storyFile: "caiaphas_priest"` (act3 already used the correct name).

## Unused Story Files (present in `/story/` but not referenced in `act*_case.js`)

| Story File | Identity | Notes |
|---|---|---|
| `board_debate` | Board Debate (Senior Scribe) | System overlay / case-review interface |
| `board_review` | Board Review (Senior Scribe) | System overlay / case-review interface |
| `centurion_witness` | Centurion Longinus Witness | Crucifixion spear-thrust account |
| `excited_child_donkey` | Excited Child (Donkey) | Triumphal entry flavor |
| `guard_entry` | Guard — Entry | Antonia gate duty |
| `guard_report_crucifixion` | Guard — Crucifixion | Roman watch report variant |
| `guard_report_gethsemane` | Guard — Gethsemane | Arrest watch report variant |
| `guard_report_temple` | Guard — Temple | Cleansing watch report variant |
| `jesus_reinstatement` | Jesus Reinstatement (Peter) | John 21 restoration |
| `peter_reinstated` | Peter Reinstated | John 21 restoration variant |
| `pilate_interrogation` | Pilate Interrogation | Trial dialogue variant |
| `pontius_pilate_barabbas` | Pilate — Barabbas | Barabbas exchange variant |
| `pontius_pilate_temple` | Pilate — Temple | Temple-cleansing variant |
| `priest_objection_crucifixion` | Priest Objection — Crucifixion | Crucifixion variant |
| `priest_objection_temple` | Priest Objection — Temple | Temple variant |
| `rich_young_ruler` | Rich Young Ruler | Extra encounter |
| `roman_council` | Roman Council | Extra encounter |
| `roman_soldier` | Roman Soldier | Extra encounter |

## Notes
* Several unused files are **variant** dialogue trees (`*_crucifixion`, `*_temple`, `*_gethsemane`, `*_barabbas`, `pilate_interrogation`, `priest_objection_*`) that branch the same NPC but are not currently wired into the linear act cases.
* `board_debate` / `board_review` belong to the persistent investigation-board overlay rather than an act case, which is expected.
* The `chief_priest` → `caiaphas_priest` mismatch was the only broken link; it has been resolved.


## Scoring & Gameplay Systems

### Scoring

The **Investigation Score** is calculated when a case is concluded.

*   **Case Closed:** `+50` points.
*   **Full Investigation Bonus:** `+25` points for a "perfect" case (zero failed challenges/incorrect lab pairings).
*   **Lab Deduction:** `+15` points for each correct evidence pairing.
*   **Research Complete:** `+10` points (plus `+20` to the separate Research Score).
*   **Successful Challenge:** `+10` points.
*   **Evidence Collected:** `+5` points.

The **Research Score** is a persistent, game-wide track that unlocks bonus content in the Codex.

*   **Complete Research:** `+20` Research Points (RP).
*   **Complete Hidden Chain:** `+25` RP.

### Doubt

Doubt is a global penalty meter. The final case score is reduced by `Total Doubt × 2`.

*   **Accrual Triggers:**
    *   **Failed NPC Challenge:** `+10` Doubt.
    *   **Incorrect Lab Pairing:** `+5` Doubt.

### Reputation

Reputation tracks standing with Jerusalem's four factions (`scribes`, `temple`, `roman`, `local`).

*   **Change Triggers:**
    *   **Successful NPC Challenge:** `+5` to the challenged NPC's faction.
    *   **Failed NPC Challenge:** `-15` to the challenged NPC's faction.

---
[Back to Top](#table-of-contents)

---

## Core Gameplay Systems

### Inventory & Evidence System

The player's inventory consists of **Evidence** collected during an investigation. Evidence is the primary resource used for making deductions, challenging witnesses, and linking events to prophecies.

*   **Collection:** Evidence is discovered by exploring the 2D/3D scene, interacting with objects, and talking to witnesses.
*   **Management:** Collected evidence is accessible through the **Evidence** tab (or "Lab" tab in some versions). From here, players can review details or select items for analysis.
*   **Usage:**
    *   **Lab:** Combine two pieces of evidence to make a deduction.
    *   **People:** Show evidence to a witness to get a reaction.
    *   **Codex:** Link evidence to a revealed prophecy to score Research and Investigation points.
    *   **Case File:** Once every prophecy is complete, conclude the case here instead of accusing a suspect.

### Actions System

A new **Actions** tab is available on the main investigation screen, providing access to thematic and spiritual actions that deepen the player's connection to the narrative.

*   **Purpose:** To provide immersive, non-investigative interactions that reinforce the game's spiritual themes.
*   **Current Actions:**
    *   **🙏 Pray:** The player can offer a prayer for guidance. This triggers a visual effect of a floating icon, representing a moment of reflection.
    *   **❤️‍🩹 Heal:** A context-sensitive action representing spiritual restoration. It provides a visual effect and could be used in specific cases (like "The Severed Ear") to confirm a miracle.
*   **Gameplay:** These actions are currently for atmospheric effect and do not directly impact scoring or case progression. They are accessible from the "Actions" tab in the main investigation UI for all game versions (`/desktop/`, `/mobileB/`, `/mobileC/`).

## Acts & Cases

## Act I: The Arrival

### Case: `triumphal_entry` (The Missing Donkey)
*   **Title:** The Missing Donkey
*   **Characters:**
    *   Peter (Disciple) ([`../story/act1/case_a_missing_donkey/peter_donkey.ink`](../story/act1/case_a_missing_donkey/peter_donkey.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   John (Disciple) ([`../story/act1/case_a_missing_donkey/john_donkey.ink`](../story/act1/case_a_missing_donkey/john_donkey.ink)) ([`../characters/john_apostle.json`](../characters/john_apostle.json))
    *   Tobias (Donkey Owner) ([`../story/act1/case_a_missing_donkey/galilean_pilgrim.ink`](../story/act1/case_a_missing_donkey/galilean_pilgrim.ink)) ([`../characters/tobias_owner.json`](../characters/tobias_owner.json))
    *   Jemimah (Local Skeptic) ([`../story/act1/case_a_missing_donkey/jerusalem_local.ink`](../story/act1/case_a_missing_donkey/jerusalem_local.ink)) ([`../characters/jemimah.json`](../characters/jemimah.json))
    *   Eleazar (Sadducean Aristocrat) ([`../story/act1/case_a_missing_donkey/eleazar_sadducee.ink`](../story/act1/case_a_missing_donkey/eleazar_sadducee.ink)) ([`../characters/eleazar.json`](../characters/eleazar.json))
*   **Suspects:**
    *   Peter ([`../characters/peter.json`](../characters/peter.json))
    *   John ([`../characters/john_apostle.json`](../characters/john_apostle.json))
    *   Tobias (Owner) ([`../characters/tobias_owner.json`](../characters/tobias_owner.json))
    *   Local Villager ([`../characters/local_traveler.json`](../characters/local_traveler.json))
    *   Pharisee ([`../characters/simon_pharisee.json`](../characters/simon_pharisee.json))
    *   Jemimah (Local Skeptic) ([`../characters/jemimah.json`](../characters/jemimah.json))
    *   No One ()
*   **Culprit:** **No One**. The event was a willing fulfillment of prophecy, not a theft.
*   **Prophecies:** Zechariah 9:9, Psalm 118:25–26, Genesis 49:10–11, Malachi 3:1
*   **Evidence:**
    *   `cloaks` (Two Disciples' Cloaks)
    *   `donkey_tracks` (Fresh Hoofprints)
    *   `witness_account` (Villager's Testimony)
    *   `prophecy_scroll` (Zechariah 9:9 Scroll Fragment)
    *   `palm_branch` (Fresh-Cut Palm Branch)
    *   `rope_fibers` (Cut Rope at the Tethering Post)
    *   `crowd_testimony` (Pharisee's Written Complaint)
    *   `psalm_118_25_26_scroll` (Psalm 118:25-26 Scroll Fragment)
    *   `genesis_49_10_11_scroll` (Genesis 49:10-11 Scroll Fragment)
    *   `malachi_3_1_scroll` (Malachi 3:1 Scroll Fragment)

#### People

| Character | Action | Unlocks Evidence | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `Two Disciples' Cloaks`, `Cut Rope at the Tethering Post` | Genesis 49:10–11 |
| John | Talk | `Fresh Hoofprints`, `Villager's Testimony` | — |
| Tobias | Talk | `palm_branch`, `prophecy_scroll` | Psalm 118:25–26 |
| Eleazar | Talk | `crowd_testimony` | Malachi 3:1 |



---
[Back to Top](#table-of-contents)


##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Peter | `peter` | NPC + Suspect | Talk to Peter; Collect `cloaks`, `rope_fibers`; Lab: **Motive Clarified** (Acted on instruction, not as a thief) | ✅ Yes |
| John | `john` | NPC + Suspect | Talk to John; Collect `donkey_tracks`, `crowd_testimony`, `witness_account` | ✅ Yes |
| Tobias | `owner` | NPC + Suspect | Talk to Tobias; Collect `prophecy_scroll`, `palm_branch`; Lab: **Cleared** (Confirmed he willingly lent the colt) | ✅ Yes |
| Jemimah | `local_skeptic` | NPC + Suspect | Talk to Jemimah | ✅ Yes |
| Eleazar | `eleazar` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Local Villager | `villager` | Suspect only | Talk to John or Tobias | ✅ Yes |
| Pharisee | `pharisee` | Suspect only | Talk to Eleazar; Collect `crowd_testimony` | ✅ Yes |
| No One | `none` | Suspect only | Collect `witness_account`, `prophecy_scroll` | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `cloaks` + `peter` | Link | Motive Clarified | — | +15 | — | — |

#### Codex
 
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `prophecy_scroll` → `zechariah_9_9` | Dialogue with Tobias |
| `palm_branch` → `psalm_118_25_26` | Dialogue with Tobias |
| `cloaks` → `genesis_49_10_11` | Dialogue with Peter |
| `crowd_testimony` → `malachi_3_1` | Dialogue with Eleazar |



### Case: `temple_cleansing` (The Overturned Tables)
*   **Title:** The Overturned Tables
*   **Characters:**
    *   Malachi (Money Changer) ([`../story/act1/case_b_overturned_tables/money_changer.ink`](../story/act1/case_b_overturned_tables/money_changer.ink)) ([`../characters/malachi_moneychanger.json`](../characters/malachi_moneychanger.json))
    *   Marcus (Garrison Guard) ([`../story/act1/case_b_overturned_tables/guard_report.ink`](../story/act1/case_b_overturned_tables/guard_report.ink)) ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   Jadan of Bethphage (Temple Dove Vendor) ([`../characters/displaced_merchant.json`](../characters/displaced_merchant.json))
*   **Suspects:**
    *   Jadan of Bethphage ([`../characters/displaced_merchant.json`](../characters/displaced_merchant.json))
    *   No One ()
*   **Culprit:** **No One**. The event was a prophetic act of judgment by Jesus.
*   **Prophecies:** Malachi 3:1, Isaiah 56:7, Psalm 69:9

*   **Evidence:** 
    *   `broken_cages` (Shattered Dove Cages)
    *   `scattered_shekels` (Scattered Tyrian Shekels)
    *   `whip_of_cords` (Discarded Whip of Cords)
    *   `malachi_3_1_b_scroll` (Malachi 3:1 Scroll Fragment)
    *   `isaiah_56_7_scroll` (Isaiah 56:7 Scroll Fragment)
    *   `psalm_69_9_scroll` (Psalm 69:9 Scroll Fragment)

#### People

| Character | Action | Unlocks Evidence | Reveals Prophecy |
|---|---|---|---|
| Malachi (Money Changer) | Talk | `scattered_shekels` | Malachi 3:1 |
| Marcus (Garrison Guard) | Talk | `whip_of_cords` | — |
| Jadan of Bethphage | Talk | `broken_cages` | Isaiah 56:7 |
| Disciples (generic) | Talk | `disciples_recollection` | Psalm 69:9 |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `broken_cages` + `whip_of_cords` | Link | **Identified as Victim** for Jadan | — | +15 | — | — |
| `scattered_shekels` + `whip_of_cords` | Link | **Identified as Victim** for Malachi | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Shattered Dove Cages` → Isaiah 56:7 | Dialogue: Jadan of Bethphage |
| `Scattered Shekels` → Malachi 3:1 | Dialogue: Malachi (Money Changer) |
| `Disciples' Testimony` → Psalm 69:9 | Dialogue: Disciples (generic) |
 
### Case: `fig_tree_incident` (The Barren Fig Tree)
*   **Title:** The Barren Fig Tree
*   **Characters:**
    *   Peter (Disciple) ([`../story/act1/case_c_fig_tree_incident/peter_fig_tree.ink`](../story/act1/case_c_fig_tree_incident/peter_fig_tree.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   John (Disciple) ([`../story/act1/case_c_fig_tree_incident/john_fig_tree.ink`](../story/act1/case_c_fig_tree_incident/john_fig_tree.ink)) ([`../characters/john_apostle.json`](../characters/john_apostle.json))
    *   Nathan (Gardener) ([`../story/act1/case_c_fig_tree_incident/nathan_fig_tree.ink`](../story/act1/case_c_fig_tree_incident/nathan_fig_tree.ink)) ([`../characters/nathan_gardener.json`](../characters/nathan_gardener.json))
    *   Local Traveler ([`../story/act1/case_c_fig_tree_incident/local_traveler.ink`](../story/act1/case_c_fig_tree_incident/local_traveler.ink)) ([`../characters/local_traveler.json`](../characters/local_traveler.json))
*   **Suspects:**
    *   Peter ([`../characters/peter.json`](../characters/peter.json))
    *   No One ()
*   **Culprit:** **No One**. The event was a prophetic act by Jesus.
*   **Prophecies:** Micah 7:1, Jeremiah 8:13, Psalm 33:8–9, Zechariah 4:6–7

*   **Evidence:**
    *   `cursed_fig_tree_desc` (Description of the Fig Tree (Monday))
    *   `withered_fig_tree_state` (The Withered Fig Tree (Tuesday))
    *   `peter_astonishment` (Peter's Astonished Reaction)
    *   `disciples_faith_lesson` (Jesus's Teaching on Faith)

#### People

| Character | Action | Unlocks Evidence | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `withered_fig_tree_state`, `peter_astonishment` | Jeremiah 8:13 |
| John | Talk | `disciples_faith_lesson`, `peter_astonishment` | Zechariah 4:6–7 |
| Nathan (Gardener) | Talk | `cursed_fig_tree_desc` | Micah 7:1 |
| Local Traveler | Talk | — | Psalm 33:8–9 |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `withered_fig_tree_state` + `peter_astonishment` | Link | **Identified as Witness** for Peter | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `cursed_fig_tree_desc` → `micah_7_1` | Dialogue: Nathan (Gardener) |
| `withered_fig_tree_state` → `jeremiah_8_13` | Dialogue: Peter |
| `peter_astonishment` → `psalm_33_8_9` | Dialogue: Local Traveler |
| `disciples_faith_lesson` → `zechariah_4_6_7` | Dialogue: John |
 
## Act II: The Teacher

### Case: `authority_challenged` (The Silenced Teacher)
*   **Title:** The Silenced Teacher
*   **Characters:**
    *   Caiaphas (High Priest) ([`../story/act2/case_a_silenced_teacher/caiaphas_priest.ink`](../story/act2/case_a_silenced_teacher/caiaphas_priest.ink)) ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   Samuel (Scribe) ([`../story/act2/case_a_silenced_teacher/scribe_intro.ink`](../story/act2/case_a_silenced_teacher/scribe_intro.ink)) ([`../characters/samuel_scribe.json`](../characters/samuel_scribe.json))
    *   Nathanael (Pharisee) ([`../story/act1/case_b_overturned_tables/pharisee_critique.ink`](../story/act1/case_b_overturned_tables/pharisee_critique.ink)) ([`../characters/nathanael_pharisee.json`](../characters/nathanael_pharisee.json))
*   **Suspects:**
    *   Caiaphas ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   Samuel ([`../characters/samuel_scribe.json`](../characters/samuel_scribe.json))
    *   Nathanael ([`../characters/nathanael_pharisee.json`](../characters/nathanael_pharisee.json))
    *   No One ()
*   **Culprit:** **Caiaphas**. He orchestrated the challenges to protect institutional authority.
*   **Prophecies:** Psalm 118:22–23, Isaiah 5:1–7, Daniel 7:13–14, Malachi 3:1

*   **Evidence:**
    *   `question_scroll` (The Formal Authority Challenge)
    *   `parable_fragments` (Sketch of the Vineyard Parable)
    *   `cornerstone_carving` (Rejected Cornerstone Fragment)
    *   `coin_of_caesar` (Denarius of Tiberius Caesar)
    *   `fig_leaf_withered` (Withered Fig Leaf)
    *   `widow_two_coins` (Two Leptons (Widow's Mites))
    *   `witness_scroll` (Temple Bystander's Written Account)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Caiaphas | Talk | `Priestly Vestments`, `Rejected Cornerstone Fragment` |
| Caiaphas | Talk | `Denarius of Tiberius Caesar`, `Two Leptons (Widow's Mites)` |
| Samuel (Scribe) | Talk | `parable_fragments`, `witness_scroll` |
| Nathanael (Pharisee) | Talk | — |


---
[Back to Top](#table-of-contents)


##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Caiaphas | `chief_priest` | NPC + Suspect | Talk to Caiaphas; Lab: **Implicated by Parable** (The teaching was aimed at him) | ✅ Yes |
| Samuel | `scribe` | NPC + Suspect | Talk to Samuel; Lab: **Identified as Witness** (His record implicates the priests) | ✅ Yes |
| Nathanael | `pharisee` | NPC + Suspect | Talk to Nathanael | ✅ Yes |
| Thomas the Rich Young Ruler | `rich_young_ruler` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `parable_fragments` + `cornerstone_carving` | Link | **Implicated by Parable** for Caiaphas | Psalm 118:22–23 | +15 | — | — |
| `question_scroll` + `witness_scroll` | Compare | **Identified as Witness** for Samuel | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `cornerstone_carving` → `psalm_118_22_23` | Lab: `parable_fragments` + `cornerstone_carving` |
| `parable_fragments` → `isaiah_5_1_7` | Dialogue: Samuel (Scribe) |
| `witness_scroll` → `daniel_7_13_14` | Dialogue: Samuel (Scribe) |
| `question_scroll` → `malachi_3_1` | Dialogue: Caiaphas |
 
### Case: `lazarus_plot` (The Price of Life)
*   **Title:** The Price of Life
*   **Characters:**
    *   Maluch (Temple Spy) ([`../story/act2/case_b_lazarus_conspiracy/temple_spy.ink`](../story/act2/case_b_lazarus_conspiracy/temple_spy.ink)) ([`../characters/maluch.json`](../characters/maluch.json))
    *   Annas (High Priest Emeritus) ([`../story/act2/case_b_lazarus_conspiracy/annas_patriarch.ink`](../story/act2/case_b_lazarus_conspiracy/annas_patriarch.ink)) ([`../characters/annas.json`](../characters/annas.json))
    *   Martha (Sister of Lazarus) ([`../story/act2/case_b_lazarus_conspiracy/martha_bethany.ink`](../story/act2/case_b_lazarus_conspiracy/martha_bethany.ink)) ([`../characters/martha.json`](../characters/martha.json))
    *   Nicodemus (Conflicted Pharisee) ([`../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.ink`](../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.ink)) ([`../characters/nicodemus.json`](../characters/nicodemus.json))
    *   Simon the Leper (Healed Host) ([`../story/act2/case_b_lazarus_conspiracy/simon_leper.ink`](../story/act2/case_b_lazarus_conspiracy/simon_leper.ink)) ([`../characters/simon_leper.json`](../characters/simon_leper.json))
*   **Suspects:**
    *   Nicodemus ([`../characters/nicodemus.json`](../characters/nicodemus.json))
    *   Caiaphas ([`../characters/caiaphas.json`](../characters/caiaphas.json))
*   **Culprit:** **Caiaphas**. He authorized the plot to eliminate Lazarus to contain the political fallout of the miracle.
*   **Prophecies:** Isaiah 25:8

*   **Evidence:**
    *   `crowd_report` (Bethany Pilgrim Manifest)
    *   `grave_dirt` (Bethany Limestone Dust)
    *   `secret_decree` (Intercepted Sadducean Memorandum)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Maluch (Temple Spy) | Talk | `secret_decree` |
| Annas (High Priest Emeritus) | Talk | `secret_decree` |
| Martha (Sister of Lazarus) | Talk | `grave_dirt` | Isaiah 25:8 |
| Nicodemus | Talk | — |
| Simon the Leper | Talk | `crowd_report` |


---
[Back to Top](#table-of-contents)


##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Maluch | `temple_spy` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Annas | `annas_patriarch` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Martha | `martha_bethany` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Thomas (Parable) | `parable_meaning` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Thomas (Vineyard) | `parable_vineyard` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Trial Rumors | `trial_rumors` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Bethesda Witness | `witness_healed` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Mount Teacher | `teaching_mount` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Nicodemus | `nicodemus` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Simon the Leper | `simon_leper` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Nicodemus | `nicodemus_secret` | Suspect only | Talk to Martha; Lab: **Cleared** (Shows he was a dissenting voice) | ✅ Yes |
| Caiaphas | `caiaphas` | Suspect only | Talk to Maluch; Lab: **Implicated in Conspiracy** (Directly links him to the plot) | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `secret_decree` + `crowd_report` | Link | **Implicated in Conspiracy** for Caiaphas | — | +15 | — | — |
| `grave_dirt` + `secret_decree` | Link | **Cleared** Nicodemus (Shows he was a dissenting voice) | — | +15 | — | — |

...
#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `grave_dirt` → `isaiah_25_8` | Dialogue: Martha |
 
### Case: `olivet_discourse` (The End of the Age)
*   **Title:** The End of the Age
*   **Characters:**
    *   Peter (Disciple) ([`../story/act2/case_c_olivet_discourse/peter_olivet.ink`](../story/act2/case_c_olivet_discourse/peter_olivet.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   John (Disciple) ([`../story/act2/case_c_olivet_discourse/john_olivet.ink`](../story/act2/case_c_olivet_discourse/john_olivet.ink)) ([`../characters/john_apostle.json`](../characters/john_apostle.json))
    *   Thomas (Disciple) ([`../story/act2/case_a_silenced_teacher/parable_meaning.ink`](../story/act2/case_a_silenced_teacher/parable_meaning.ink)) ([`../characters/thomas.json`](../characters/thomas.json))
    *   Andrew (Disciple) ([`../story/act2/case_c_olivet_discourse/andrew_olivet.ink`](../story/act2/case_c_olivet_discourse/andrew_olivet.ink)) ([`../characters/andrew_disciple.json`](../characters/andrew_disciple.json))
*   **Suspects:**
    *   No One ()
*   **Culprit:** **No One**. This is a teaching event, not a crime.
*   **Prophecies:** Daniel 9:27, Joel 2:30-31, Isaiah 13:10

*   **Evidence:**
    *   `temple_overlook_view` (View of the Temple from Olivet)
    *   `disciples_questions_notes` (Disciples' Questions (Written Notes))
    *   `parable_of_virgins_notes` (Parable of the Ten Virgins (Notes))
    *   `cosmic_signs_references` (Old Testament Cosmic Sign References)
    *   `darkened_sun_record` (Darkened Sun Record)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `Disciples' Questions` | |
| John | Talk | `Sketch of Temple Stones`, `Notes on Cosmic Signs` | Isaiah 13:10 |
| Thomas | Talk | `parable_of_virgins_notes`, `cosmic_signs_references` | Joel 2:30-31 |
| Andrew | Talk | `disciples_questions_notes` | Daniel 9:27 |



---
[Back to Top](#table-of-contents)

##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Peter | `peter_olivet` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| John | `john_olivet` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Thomas | `thomas_olivet` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Andrew | `andrew_olivet` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `temple_overlook_view` + `disciples_questions_notes` | Link | **Identified as Primary Witness** for Peter | Daniel 9:27 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `disciples_questions_notes` → `daniel_9_27` | Dialogue: Andrew |
| `cosmic_signs_references` → `joel_2_30_31` | Dialogue: Thomas |
| `darkened_sun_record` → `isaiah_13_10` | Dialogue: John |

### Case: `passover_lamb_chain` (The Anointing at Bethany)
*   **Title:** The Anointing at Bethany
*   **Characters:**
    *   Mary of Bethany ([`../characters/mary_bethany.json`](../characters/mary_bethany.json))
    *   Judas Iscariot ([`../characters/judas_bethany.json`](../characters/judas_bethany.json))
    *   Simon the Leper ([`../characters/simon_leper.json`](../characters/simon_leper.json))
    *   Hillel (Temple Scribe) ([`../characters/temple_scribe_hillel.json`](../characters/temple_scribe_hillel.json))
*   **Suspects:**
    *   Judas Iscariot ([`../characters/judas_bethany.json`](../characters/judas_bethany.json))
    *   Mary of Bethany ([`../characters/mary_bethany.json`](../characters/mary_bethany.json))
    *   Simon the Leper ([`../characters/simon_leper.json`](../characters/simon_leper.json))
*   **Culprit:** **No One**. Mary's anointing was an act of costly worship and prophetic preparation for burial, not wrongdoing; Judas's objection exposed his own self-interest.
*   **Prophecies:** Exodus 12:1–14 (Typological Fulfilment — the Passover Lamb)
*   **Evidence:**
    *   `lamb_records` (Passover Lamb Market Records)
    *   `inspection_notes` (Temple Inspection Notes)
    *   `nard_flask` (Flask of Pure Nard)
    *   `alabaster_jar` (Broken Alabaster Jar)

#### People

| Character | Action | Unlocks Evidence | Reveals Prophecy |
|---|---|---|---|
| Mary of Bethany | Talk | `nard_flask` | Exodus 12:1–14 (typology) |
| Judas Iscariot | Talk | `alabaster_jar` | — |
| Simon the Leper | Talk | `alabaster_jar` | — |
| Hillel (Temple Scribe) | Talk | `inspection_notes`, `lamb_records` | — |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `nard_flask` → Mary of Bethany | Present | **Cleared** (An act of costly, unguarded worship, not waste) | — | +15 | — | — |
| `nard_flask` → Judas Iscariot | Present | **Motive Exposed** (Objection was self-interest, not charity) | — | +15 | — | — |
| `alabaster_jar` → Simon the Leper | Present | **Cleared** (A gracious host, willing to be associated with a costly act of devotion) | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `nard_flask` → `typology_passover_lamb` | Dialogue: Mary of Bethany |
| `inspection_notes` → `typology_passover_lamb` | Dialogue: Hillel |
| `alabaster_jar` → `typology_passover_lamb` | Dialogue: Judas Iscariot / Simon the Leper |

## Act III: The Pressure Builds

### Case: `last_supper` (The Broken Cup)
*   **Title:** The Broken Cup
*   **Characters:**
    *   John Mark (Son of the House Owner) ([`../story/act3/case_a_broken_cup/john_disciple.ink`](../story/act3/case_a_broken_cup/john_disciple.ink)) ([`../characters/john_mark.json`](../characters/john_mark.json))
    *   Rhoda (Household Servant) ([`../story/act3/case_a_broken_cup/rhoda_servant.ink`](../story/act3/case_a_broken_cup/rhoda_servant.ink)) ([`../characters/rhoda.json`](../characters/rhoda.json))
    *   Judas Iscariot (Disciple) ([`../story/act3/case_a_broken_cup/judas_iscariot.ink`](../story/act3/case_a_broken_cup/judas_iscariot.ink)) ([`../characters/judas.json`](../characters/judas.json))
*   **Suspects:**
    *   John Mark ([`../characters/john_mark.json`](../characters/john_mark.json))
    *   Rhoda ([`../characters/rhoda.json`](../characters/rhoda.json))
    *   Judas Iscariot ([`../characters/judas.json`](../characters/judas.json))
*   **Culprit:** **Judas Iscariot**. His agitation and haste led to the broken items as he prepared for his betrayal.
*   **Prophecies:** Exodus 12:1–14, Jeremiah 31:31–34, Exodus 24:8, Psalm 41:9, Zechariah 11:12–13, Isaiah 53:12
*   **Typologies:** `typology_melchizedek` (Genesis 14:18), Passover Meal (Exodus 12)

*   **Evidence:**
    *   `bread_crumbs` (Unleavened Bread Crumbs)
    *   `wine_stain` (Spilled Wine on the Linen)
    *   `cup_fragments` (Shattered Clay Cup)
    *   `water_jug` (Large Stone Water Jug)
    *   `money_bag_impression` (Imprint of a Money Bag)
    *   `betrayal_dipped_bread` (Fragment of Sop (Dipped Bread))
    *   `new_covenant_declaration` (Written Summary of Jesus's Words)
    *   `twelve_roll` (List of the Twelve) 
    *   `roman_nail` (Roman Nail) 
    *   `denial_foretold` (Account of the Rooster Warning)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| John Mark | Talk | `cup_fragments`, `new_covenant_declaration`, `twelve_roll` | Jeremiah 31:31–34, Isaiah 53:12 |
| Rhoda | Talk | `water_jug`, `bread_crumbs`, `betrayal_dipped_bread` | Exodus 12:1–14 |
| Judas Iscariot | Talk | `betrayal_dipped_bread` |


---
[Back to Top](#table-of-contents)


##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| John Mark | `john_mark` | NPC + Suspect | Talk to John Mark; Collect `bread_crumbs`, `new_covenant_declaration`, `betrayal_dipped_bread`, `twelve_roll`; Lab: **Witness to Agitation** (Observed the event, but did not cause it) | ✅ Yes |
| Rhoda | `servant` | NPC + Suspect | Talk to Rhoda; Collect `water_jug`, `cup_fragments`; Lab: **Witness to Haste** (Saw someone leaving in a hurry) | ✅ Yes |
| Judas Iscariot | `judas` | NPC + Suspect | Talk to Judas Iscariot; Collect `money_bag_impression`; Lab: **Implicated by Prophecy** (Links him to the betrayal) | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `cup_fragments` + `betrayal_dipped_bread` | Link | **Implicated by Prophecy** for Judas Iscariot | `psalm_41_9` | +15 | — | — |
| `water_jug` + `betrayal_dipped_bread` | Link | **Witness to Haste** for Rhoda | — | +15 | — | — |
| `cup_fragments` + `water_jug` | Compare | **Witness to Agitation** for John Mark | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `new_covenant_declaration` → `jeremiah_31_31_34` | Dialogue: John Mark |
| `betrayal_dipped_bread` → `psalm_41_9` | Lab: `cup_fragments` + `betrayal_dipped_bread` |
| `bread_crumbs` → `exodus_12_1_14` | Dialogue: Rhoda |
| `money_bag_impression` → `zechariah_11_12_13` | Dialogue with Judas |
| `twelve_roll` → `isaiah_53_12` | Dialogue with John Mark |
| `wine_stain` → `typology_melchizedek` | Dialogue: John Mark |
| `denial_foretold` → `zechariah_13_7` | Dialogue with Peter |
| `roman_nail` → `psalm_22_16_18` | Dialogue with Thomas |

**Hidden Detective Chain:** *The New Covenant* — Links bread, wine, Jeremiah scroll, and Upper Room witness across the Last Supper investigation.
 
### Case: `gethsemane_arrest` (The Severed Ear)
*   **Title:** The Severed Ear
*   **Characters:**
    *   Malchus (High Priest's Assistant) ([`../story/act3/case_b_severed_ear/malchus.ink`](../story/act3/case_b_severed_ear/malchus.ink)) ([`../characters/malchus.json`](../characters/malchus.json))
    *   Simon Peter (Disciple) ([`../story/act3/case_b_severed_ear/peter_defense.ink`](../story/act3/case_b_severed_ear/peter_defense.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   Roman Soldier ([`../story/act3/case_b_severed_ear/guard_report_gethsemane.json`](../story/act3/case_b_severed_ear/guard_report_gethsemane.json)) ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
*   **Suspects:**
    *   Malchus ([`../characters/malchus.json`](../characters/malchus.json))
    *   Simon Peter ([`../characters/peter.json`](../characters/peter.json))
    *   No One ()
*   **Culprit:** **No One**. The event was a scuffle during the arrest, immediately resolved by Jesus.
*   **Prophecies:** Isaiah 53:7, Zechariah 13:7
*   **Evidence:**
    *   `abandoned_linen` (Abandoned Linen Wrapper)
    *   `dropped_torch` (Extinguished Roman Torch)
    *   `severed_ear_wrap` (Bloodied Scarf Fragment)
    *   `prisoner_cord` (Unresisting Prisoner's Cord)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Malchus | Talk | `severed_ear_wrap` | Isaiah 53:7 |
| Simon Peter | Talk | `abandoned_linen` | Zechariah 13:7 |
| Roman Soldier | Talk | `dropped_torch`, `prisoner_cord` | Isaiah 53:7 |



---
[Back to Top](#table-of-contents)

##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Malchus | `malchus_servant` | NPC + Suspect | Talk to Malchus; Collect `abandoned_linen`, `dropped_torch`; Lab: **Identified as Victim** (He was healed, not an aggressor) | ✅ Yes |
| Simon Peter | `simon_peter` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Garrison Guard | `roman_soldier` | NPC | Talk to Garrison Guard; Collect `dropped_torch`, `prisoner_cord`; Lab: **Witness to Non-Resistance** (Observed Jesus's silent submission) | ✅ Yes |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `severed_ear_wrap` + `malchus` | Link | **Identified as Victim** for Malchus | — | +15 | — | — |
| `abandoned_linen` + `peter` | Link | **Implicated as Assailant** for Simon Peter | Zechariah 13:7 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `prisoner_cord` → `isaiah_53_7` | Dialogue: Roman Soldier |
| `abandoned_linen` → `zechariah_13_7` | Dialogue: Simon Peter |

**🔗 Cross-Case Chain:** *The Scattered Sheep* — Zechariah 13:7 fulfilled at Gethsemane; its reversal in Peter's Restoration (`peter_restoration` case).
 
### Case: `sanhedrin_trial` (The Midnight Tribunal)
*   **Title:** The Midnight Tribunal
*   **Characters:**
    *   Caiaphas (High Priest) ([`../story/act3/case_c_midnight_tribunal/caiaphas_priest.ink`](../story/act3/case_c_midnight_tribunal/caiaphas_priest.ink)) ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   Peter (Denying Disciple) ([`../story/act3/case_c_midnight_tribunal/peter_denial.ink`](../story/act3/case_c_midnight_tribunal/peter_denial.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   Ananias (False Witness) ([`../story/act3/case_c_midnight_tribunal/false_witness.ink`](../story/act3/case_c_midnight_tribunal/false_witness.ink)) ([`../characters/ananias_witness.json`](../characters/ananias_witness.json))
*   **Suspects:**
    *   Caiaphas ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   Ananias ([`../characters/ananias_witness.json`](../characters/ananias_witness.json))
    *   Peter ([`../characters/peter.json`](../characters/peter.json))
    *   No One ()
*   **Culprit:** **Caiaphas**. He orchestrated the illegal trial to secure a blasphemy charge.
*   **Prophecies:** Isaiah 53:7, Isaiah 50:6, Micah 5:1, Psalm 27:12, Psalm 35:11
*   **Evidence:**
    *   `rooster_feather` (Rooster Feather)
    *   `torn_robe` (Priestly Robe Fragment)
    *   `false_scroll` (Conflicting Depositions)
    *   `guard_reed` (Guard's Reed)
    *   `charcoal_remains` (Charcoal Briquette)
    *   `perjured_testimony` (Perjured Witness Statement)
    *   `first_denial_account` (Servant Girl's Accusation)
    *   `second_denial_account` (Second Bystander's Accusation)
    *   `peters_bitter_weeping` (Witness to Peter's Departure)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Caiaphas | Talk | `torn_robe`, `guard_reed` | Isaiah 50:6 & Micah 5:1 |
| Peter | Talk | `rooster_feather`, `charcoal_remains` | |
| Ananias | Talk | `false_scroll`, `perjured_testimony` | Psalm 27:12 & Psalm 35:11 |


---
[Back to Top](#table-of-contents)


##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Caiaphas | `caiaphas_trial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Peter | `peter_denial_trial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Ananias | `false_witness_trial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Caiaphas | `chief_priest` | Suspect only | Talk to Caiaphas; Lab: **Implicated by Action** (His own gesture reveals his orchestration) | ✅ Yes |
| Ananias | `false_witness` | Suspect only | Talk to Ananias; Lab: **Discredited** (Revealed as a false witness) | ✅ Yes |
| Peter | `peter_denial` | Suspect only | Talk to Peter; Lab: **Motive Established** (Fear and denial, not conspiracy) | ✅ Yes |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `torn_robe` + `false_scroll` | Link | **Implicated by Action** for Caiaphas | Isaiah 50:6 & Micah 5:1 | +15 | — | — |
| `false_scroll` + `perjured_testimony` | Compare | **Discredited** Ananias | Psalm 27:12 & Psalm 35:11 | +15 | — | — |
| `rooster_feather` + `charcoal_remains` | Compare | **Motive Established** for Peter (Fear, not conspiracy) | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `torn_robe` → `isaiah_50_6` | Dialogue: Caiaphas |
| `guard_reed` → `micah_5_1` | Dialogue: Caiaphas |
| `false_scroll` → `psalm_27_12` | Dialogue: Ananias |
| `perjured_testimony` → `psalm_35_11` | Dialogue: Ananias |

**🔗 Cross-Case Chain:** *The Greater Atonement* — The Sanhedrin trial (high priest role) and `barabbas_choice` (scapegoat) connect here to `crucifixion_site`, forming the Day of Atonement typology.
 
### Case: `barabbas_choice` (The People's Choice)
*   **Title:** The People's Choice
*   **Characters:**
    *   Pontius Pilate (Roman Prefect) ([`../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.ink`](../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.ink)) ([`../characters/pontius_pilate.json`](../characters/pontius_pilate.json))
    *   Barabbas (Released Criminal) ([`../story/act3/case_d_roman_interrogation/barabbas_choice.ink`](../story/act3/case_d_roman_interrogation/barabbas_choice.ink)) ([`../characters/barabbas.json`](../characters/barabbas.json))
*   **Suspects:**
    *   Barabbas ([`../characters/barabbas.json`](../characters/barabbas.json))
    *   Pontius Pilate ([`../characters/pontius_pilate.json`](../characters/pontius_pilate.json))
    *   No One ()
*   **Culprit:** **No One**. The "crime" was the crowd's choice, manipulated by the priests.
*   **Prophecies:** Isaiah 53:3, Psalm 2:1–2

*   **Evidence:**
    *   `pilates_basin` (The Governor's Silver Basin)
    *   `wifes_letter` (Claudia's Warning Scroll)
    *   `barabbas_warrant` (The Insurgent's Dossier)
    *   `joint_verdict` (Joint Verdict Scroll)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Pontius Pilate | Talk | `pilates_basin`, `wifes_letter` | Psalm 2:1-2 |
| Barabbas | Talk | `barabbas_warrant`, `joint_verdict` | Isaiah 53:3 |


---
[Back to Top](#table-of-contents)


##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Pontius Pilate | `pontius_pilate_trial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Barabbas | `barabbas_insurgent_trial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Barabbas | `barabbas_insurgent` | Suspect only | Talk to Barabbas; Lab: **Cleared** (He was the beneficiary, not the cause) | ✅ Yes |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `barabbas_warrant` + `pilates_basin` | Link | **Cleared** Barabbas (Beneficiary, not cause) | Isaiah 53:3 | +15 | — | — |
| `pilates_basin` + `barabbas_warrant` | Link | **Has Alibi** for Pontius Pilate (Publicly washed hands) | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `barabbas_warrant` → `isaiah_53_3` | Dialogue: Barabbas |
| `joint_verdict` → `psalm_2_1_2` | Dialogue: Pontius Pilate |
 
### Case: `crucifixion_site` (The Final Sacrifice)
*   **Title:** The Final Sacrifice
*   **Characters:**
    *   Centurion Longinus ([`../story/act3/case_e_final_sacrifice/roman_assessment.ink`](../story/act3/case_e_final_sacrifice/roman_assessment.ink)) ([`../characters/centurion_longinus.json`](../characters/centurion_longinus.json))
    *   Pashhur (Temple Priest) ([`../story/act3/case_e_final_sacrifice/pashhur.ink`](../story/act3/case_e_final_sacrifice/pashhur.ink)) ([`../characters/pashhur.json`](../characters/pashhur.json))
    *   Joseph of Arimathea ([`../story/act3/case_e_final_sacrifice/joseph_arimathea_cross.ink`](../story/act3/case_e_final_sacrifice/joseph_arimathea_cross.ink)) ([`../characters/joseph_arimathea.json`](../characters/joseph_arimathea.json))
*   **Suspects:**
    *   Longinus ([`../characters/centurion_longinus.json`](../characters/centurion_longinus.json))
    *   Pashhur ([`../characters/pashhur.json`](../characters/pashhur.json))
    *   Joseph of Arimathea ([`../characters/joseph_arimathea.json`](../characters/joseph_arimathea.json))
    *   No One ()
*   **Culprit:** **No One**. The event was a divine/cosmic act, not a human crime.
*   **Prophecies:** Psalm 22:1, Psalm 22:7–8, Psalm 22:16, Psalm 22:18, Psalm 69:21, Amos 8:9, Isaiah 53:9, Zechariah 12:10, Psalm 34:20, Exodus 12:46, Psalm 31:5

*   **Typologies:** `haggai_2_6_7` (Earthquake), `jeremiah_31_31_34` (New Covenant/Torn Veil)

*   **Evidence:**
    *   `split_dice` (Soldiers' Casting Dice)
    *   `split_rocks` (Split Rocks)
    *   `pierced_spear` (Blood-Stained Roman Hasta)
    *   `torn_temple_veil` (The Torn Temple Veil)
    *   `linen_shroud_receipt` (Joseph's Market Bill for Fine Linen)
    *   `sour_wine_sponge` (Sponge Soaked in Sour Wine)
    *   `unbroken_legs` (Unbroken Tibiae Report)
    *   `final_words` (Final Words Scroll)
    *   `the_forsaken_cry` (Transcript of the Aramaic Cry)
    *   `mocking_crowd_taunt` (Record of the Crowd's Taunt)
    *   `distant_witnesses` (List of Those Watching From Afar)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Centurion Longinus | Talk | `Soldier's Gambling Dice`, `Centurion's Spear`, `Mocking Crown of Thorns` | Psalm 34:20 |
| Pashhur | Talk | `The Torn Temple Veil`, `Split Rocks` | Amos 8:9 |
| Joseph of Arimathea | Talk | `linen_shroud_receipt` | Isaiah 53:9 |
| Crucifixion Guard | Talk | `the_forsaken_cry`, `mocking_crowd_taunt` | Psalm 22:1, Psalm 22:7-8 |
| Simon of Cyrene | Talk | `sour_wine_sponge`, `final_words` | Psalm 69:21, Psalm 31:5 |

---
[Back to Top](#table-of-contents)



##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Centurion Longinus | `centurion_longinus` | NPC + Suspect | Talk to Centurion Longinus; Collect `split_dice`, `pierced_spear`; Lab: **Motive Questioned** (Was a participant, not an instigator) | ✅ Yes |
| Pashhur | `temple_priest_pashhur` | NPC + Suspect | Talk to Pashhur; Collect `torn_temple_veil`, `split_rocks`; Lab: **Identified as Witness** (Witnessed the divine event in the Temple) | ✅ Yes |
| Joseph of Arimathea | `joseph_arimathea` | NPC + Suspect | Talk to Joseph of Arimathea; Collect `linen_shroud_receipt`; Lab: **Motive Clarified** (Acted out of respect, not conspiracy) | ✅ Yes |
| Upper Room Prep | `upper_room_prep` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Secret Visitor | `secret_visit` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Peter (Denial) | `peter_denial` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Peter (Simple Defense) | `peter_defense_simple` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Simon of Cyrene | `simon_cyrene` | NPC | Talk to Simon of Cyrene; Collect `unbroken_legs`; Lab: **Isaac Typology** (Carries the wood, just as Isaac did) | ✅ Yes |
| Temple Curtain Witness | `temple_curtain` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Crucifixion Guard | `execution_guard` | NPC | Talk to Crucifixion Guard; Collect `sour_wine_sponge`, `final_words`; Lab: **Gospel Details Verified** (Sponge and final words confirm Gospel accuracy) | ✅ Yes |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `split_dice` + `pierced_spear` | Link | **Motive Questioned** for Centurion Longinus | Psalm 22:18 | +15 | — | — |
| `torn_temple_veil` + `split_rocks` | Compare | **Identified as Witness** for Pashhur | Haggai 2:6-7 | +15 | — | — |
| `linen_shroud_receipt` + `pierced_spear` | Link | **Motive Clarified** for Joseph of Arimathea | Isaiah 53:9 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `split_dice` → `psalm_22_16_18` | Dialogue: Centurion Longinus |
| `mocking_crowd_taunt` → `psalm_22_7_8` | Dialogue: Crucifixion Guard |
| `the_forsaken_cry` → `psalm_22_1` | Dialogue: Crucifixion Guard |
| `sour_wine_sponge` → `psalm_69_21` | Dialogue: Simon of Cyrene |
| `split_rocks` → `haggai_2_6_7` | Dialogue: Pashhur |
| `torn_temple_veil` → `jeremiah_31_31_34` | Dialogue: Pashhur |
| `linen_shroud_receipt` → `isaiah_53_9` | Dialogue: Joseph of Arimathea |
| `pierced_spear` → `zechariah_12_10` | Dialogue: Centurion Longinus |
| `unbroken_legs` → `psalm_34_20` | Dialogue: Centurion Longinus |
| `final_words` → `psalm_31_5` | Dialogue: Simon of Cyrene |
| `distant_witnesses` → `psalm_38_11` | Dialogue: Joseph of Arimathea |

**🔓 Hidden Chain:** *The Perfect Sacrifice* — Complete the Psalm 22 chain by linking all mocking, piercing, and garment-division evidence.

**🔓 Hidden Chain:** *The True Passover Lamb* — Link Passover Lamb evidence across `last_supper`, `passover_lamb_chain`, and `crucifixion_site`.
 
## Act IV: The New Beginning

### Case: `resurrection` (The Empty Tomb)
*   **Title:** The Empty Tomb
*   **Characters:**
    *   Mary Magdalene (First Witness) ([`../story/act4/case_a_empty_tomb/mary_magdalene.ink`](../story/act4/case_a_empty_tomb/mary_magdalene.ink)) ([`../characters/mary_magdalene.json`](../characters/mary_magdalene.json))
    *   Marcus (Roman Guard) ([`../story/act4/case_a_empty_tomb/execution_soldier.ink`](../story/act4/case_a_empty_tomb/execution_soldier.ink)) ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   Joseph of Arimathea (Tomb Owner) ([`../story/act4/case_a_empty_tomb/joseph_arimathea.ink`](../story/act4/case_a_empty_tomb/joseph_arimathea.ink)) ([`../characters/joseph_arimathea.json`](../characters/joseph_arimathea.json))
*   **Suspects:**
    *   Mary Magdalene ([`../characters/mary_magdalene.json`](../characters/mary_magdalene.json))
    *   Marcus ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   Joseph of Arimathea ([`../characters/joseph_arimathea.json`](../characters/joseph_arimathea.json))
    *   No One ()
*   **Culprit:** **No One**. The resurrection was a supernatural event.
*   **Prophecies:** Psalm 16:10, Hosea 6:2, Jonah 1:17 / Matthew 12:40, Isaiah 53:10–11, Psalm 22:1–31, Isaiah 26:19, Leviticus 23:9–14
*   **Evidence:**
    *   `rolled_stone` (The Displaced Sealing Stone)
    *   `empty_tomb` (The Empty Burial Chamber)
    *   `burial_linen` (Folded Burial Linens)
    *   `angelic_witness` (The Angelic Proclamation)
    *   `guard_report` (The Soldiers' Broken Report)
    *   `spice_jars` (Unused Burial Spices)
    *   `mary_encounter` (Mary Magdalene's Testimony)
    *   `opened_tombs` (Opened Tombs Testimony)
    *   `psalm22_scroll` (Resurrection Psalm Scroll)
    *   `psalm_16_10_scroll` (Psalm 16:10 Scroll Fragment)
    *   `hosea_6_2_scroll` (Hosea 6:2 Scroll Fragment)
    *   `jonah_1_17___matthew_12_40_scroll` (Jonah 1:17 / Matthew 12:40 Scroll Fragment)
    *   `isaiah_53_10_11_scroll` (Isaiah 53:10-11 Scroll Fragment)
    *   `psalm_22_1_31_scroll` (Psalm 22:1-31 Scroll Fragment)
    *   `isaiah_26_19_scroll` (Isaiah 26:19 Scroll Fragment)
    *   `ezekiel_37_12_13_scroll` (Ezekiel 37:12-13 Scroll Fragment)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Mary Magdalene | Talk | `rolled_stone`, `empty_tomb`, `burial_linen`, `angelic_witness`, `mary_encounter` | Psalm 16:10 |
| Marcus | Talk | `guard_report`, `rolled_stone` | Hosea 6:2 |
| Joseph of Arimathea | Talk | `spice_jars`, `opened_tombs` | Isaiah 53:10–11, Ezekiel 37:12-13 |



---
[Back to Top](#table-of-contents)

##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Mary Magdalene | `mary_magdalene` | NPC + Suspect | Talk to Mary Magdalene; Collect `mary_encounter`, `angelic_witness`, `empty_tomb`, `burial_linen`; Lab: **Identified as Witness** (Discovered the empty tomb) | ✅ Yes |
| Marcus | `marcus` | NPC + Suspect | Talk to Marcus; Collect `guard_report`, `rolled_stone`; Lab: **Implicated in Failure** (The seal he guarded was broken) | ✅ Yes |
| Joseph of Arimathea | `joseph` | NPC + Suspect | Talk to Joseph of Arimathea; Collect `spice_jars`; Lab: **Cleared** (His intention was to anoint a body, not hide one) | ✅ Yes |
| No One | `none` | Suspect only | Collect `empty_tomb`, `guard_report` | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `guard_report` + `marcus` | Link | Exposed cover-up | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `rolled_stone` → `psalm_16_10` | Dialogue: Mary Magdalene |
| `guard_report` → `hosea_6_2` | Dialogue: Marcus |
| `guard_report` → `jonah_1_17___matthew_12_40` | Dialogue: Marcus |
| `mary_encounter` → `isaiah_53_10_11` | Dialogue: Joseph of Arimathea |
| `psalm22_scroll` → `psalm_22_1_31` | Dialogue: Mary Magdalene |
| `opened_tombs` → `ezekiel_37_12_13` | Dialogue: Joseph of Arimathea |
| `burial_linen` → `isaiah_26_19` | Dialogue: Mary Magdalene |

**🔓 Hidden Chain:** *Death Defeated* — Link the Soldiers' Broken Report, Opened Tombs Testimony, Empty Burial Chamber, and Mary Magdalene's Testimony to complete the resurrection prophecy chain.
 
### Case: `roman_inquiry` (The Guard's Report)
*   **Title:** The Guard's Report
*   **Characters:**
    *   Lucas (Tomb Guard Sentry) ([`../story/act4/case_b_guards_report/sentry_lucas.ink`](../story/act4/case_b_guards_report/sentry_lucas.ink)) ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   Caiaphas (High Priest) ([`../story/act4/case_b_guards_report/caiaphas_roman_inquiry.ink`](../story/act4/case_b_guards_report/caiaphas_roman_inquiry.ink)) ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   Pilate's Secretary ([`../story/act3/case_d_roman_interrogation/pilates_secretary.ink`](../story/act3/case_d_roman_interrogation/pilates_secretary.ink)) ([`../characters/pilate_secretary.json`](../characters/pilate_secretary.json))
*   **Suspects:**
    *   Lucas ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   Caiaphas ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   No One ()
*   **Culprit:** **No One**. The crime was the cover-up conspiracy orchestrated by the Sanhedrin.
*   **Prophecies:** Psalm 2:1–2

*   **Evidence:**
    *   `bribe_shekels` (High-Grade Sanctuary Coins)
    *   `broken_imperial_seal` (Snapped Clay Roman Seal)
    *   `shattered_spear` (Shattered Pilum Shaft)
    *   `sanhedrin_report` (Official Sanhedrin Report)
    *   `psalm_2_1_2_scroll` (Psalm 2:1-2 Scroll Fragment)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Lucas | Talk | `bribe_shekels`, `broken_imperial_seal`, `shattered_spear` | Psalm 2:1–2 |
| Caiaphas | Talk | `sanhedrin_report` | Psalm 2:1–2 |
| Pilate's Secretary | Talk | — | Psalm 2:1–2 |



---
[Back to Top](#table-of-contents)

##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Lucas of the Tenth Legion | `sentry_lucas` | NPC + Suspect | Talk to Lucas of the Tenth Legion; Lab: **Implicated in Bribery** (Possession of the coins links him to the cover-up) | ✅ Yes |
| Caiaphas | `chief_priest_caiaphas` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Pilate’s Secretary | `pilates_secretary` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Mary (Resurrection) | `mary_resurrection` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Judas (Betrayal) | `judas_betrayal` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Herod's Servant | `herods_servant` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Peter (Restored) | `peter_restored` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| No One | `none` | Suspect only | Auto-unlocked | ✅ Yes |

---
[Back to Top](#table-of-contents)

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `bribe_shekels` + `sanhedrin_report` | Link | **Implicated in Bribery** for Lucas | Psalm 2:1–2 | +15 | — | — |
| `sanhedrin_report` + `bribe_shekels` | Link | **Implicated in Conspiracy** for Caiaphas | Psalm 2:1–2 | +15 | — | — |
| `broken_imperial_seal` + `shattered_spear` | Link | **Physical Damage Confirmed** | Psalm 2:1–2 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `sanhedrin_report` → `psalm_2_1_2` | Dialogue: Caiaphas |
 
### Case: `peter_restoration` (Peter's Restoration)
*   **Title:** Peter's Restoration
*   **Characters:**
    *   Peter (Restored Apostle) ([`../story/act4/case_c_peters_restoration/peter_restored.ink`](../story/act4/case_c_peters_restoration/peter_restored.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   Thomas (Disciple) ([`../story/act4/case_c_peters_restoration/thomas_restoration.ink`](../story/act4/case_c_peters_restoration/thomas_restoration.ink)) ([`../characters/thomas.json`](../characters/thomas.json))
    *   Mary Magdalene (Witness) ([`../story/act4/case_c_peters_restoration/jesus_reinstatement.ink`](../story/act4/case_c_peters_restoration/jesus_reinstatement.ink)) ([`../characters/mary_magdalene.json`](../characters/mary_magdalene.json))
    *   Nathanael (Disciple) ([`../story/act4/case_c_peters_restoration/nathanael_disciple.ink`](../story/act4/case_c_peters_restoration/nathanael_disciple.ink)) ([`../characters/nathanael_disciple.json`](../characters/nathanael_disciple.json))
*   **Suspects:**
    *   Peter ([`../characters/peter.json`](../characters/peter.json))
    *   No One ()
*   **Culprit:** **No One**. The event was an act of divine grace and restoration.
*   **Prophecies:** Zechariah 13:7, Ezekiel 34:11-16
*   **Evidence:**
    *   `charcoal_fire` (The Charcoal Fire)
    *   `miraculous_catch` (The Miraculous Catch)
    *   `bread_breakfast` (Bread and Fish Breakfast)
    *   `threefold_commission` (The Threefold Commission)
    *   `galilean_apparition` (Risen Appearance)
    *   `zechariah_13_7_scroll` (Zechariah 13:7 Scroll Fragment)
    *   `ezekiel_34_11-16_scroll` (Ezekiel 34:11-16 Scroll Fragment)
    *   `psalm_16_10_scroll` (Psalm 16:10 Scroll Fragment)
    *   `isaiah_53_10_11_scroll` (Isaiah 53:10-11 Scroll Fragment)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `charcoal_fire`, `threefold_commission` | Zechariah 13:7 |
| Thomas | Talk | `miraculous_catch`, `threefold_commission` | Zechariah 13:7 |
| Mary Magdalene | Talk | `miraculous_catch` | Ezekiel 34:11-16 |
| Nathanael | Talk | `bread_breakfast`, `galilean_apparition` | Ezekiel 34:11-16 |

---
[Back to Top](#table-of-contents)


##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Peter | `peter` | NPC + Suspect | Talk to Peter; Collect `charcoal_fire`, `threefold_commission`; Lab: **Motive Clarified** (Links his restoration to his earlier denial) | ✅ Yes |
| Thomas | `thomas` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Mary Magdalene | `mary_magdalene` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| Nathanael | `nathanael` | NPC only | Walk up in Scene tab | ✅ Yes (as NPC) |
| No One | `none` | Suspect only | Collect `threefold_commission` | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `charcoal_fire` + `threefold_commission` | Compare | **Motive Clarified** for Peter | Zechariah 13:7 | +15 | — | — |
| `miraculous_catch` + `threefold_commission` | Timeline | **Restoration Pattern** | Ezekiel 34:11-16 | +15 | — | — |
| `galilean_apparition` + `bread_breakfast` | Compare | **Physical Resurrection Confirmed** | Ezekiel 34:11-16 | +15 | — | — |
| `galilean_apparition` + `miraculous_catch` | Compare | **Eyewitness Confirmation** | Isaiah 53:10-11 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `charcoal_fire` → `zechariah_13_7` | Dialogue: Peter |
| `threefold_commission` → `ezekiel_34_11-16` | Dialogue: Peter |
 
### Case: `ascension` (The Ascension)
*   **Title:** The Ascension
*   **Characters:**
    *   Peter (Apostle)
    *   John (Apostle)
    *   Mary Magdalene (Witness)
*   **Suspects:**
    *   No One ()
*   **Culprit:** **No One**. This is a divine event, not a crime.
*   **Prophecies:** Psalm 68:18, Psalm 110:1, Daniel 7:13-14
*   **Evidence:**
    *   `parting_cloud` (The Parting Cloud)
    *   `angelic_messengers` (The Two Messengers)
    *   `disciples_gaze` (The Disciples' Upward Gaze)

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `disciples_gaze` | Psalm 110:1 |
| John | Talk | `parting_cloud` | Daniel 7:13-14 |
| Mary Magdalene | Talk | `angelic_messengers` | Psalm 68:18 |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `parting_cloud` + `angelic_messengers` | Compare | **Divine Departure Confirmed** | Daniel 7:13-14 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `parting_cloud` → `daniel_7_13_14` | Dialogue: John |
| `angelic_messengers` → `psalm_68_18` | Dialogue: Mary Magdalene |
| `disciples_gaze` → `psalm_110_1` | Dialogue: Peter |

---
[Back to Top](#table-of-contents)

<!-- AUTO-GENERATED: DIALOGUE-ID-INDEX START -->
## Canonical Runtime Dialogue ID Reference (Auto-Generated)


This section is generated from `js/act*_case.js` + `js/gameplay/dialogueMaps.js` and reflects the **actual runtime mapping**.

- Dialogue cache key is case-scoped at runtime: `caseId::npcId`.
- `dialogueKey` is resolved from: `npc.storyFile || npc.dialogueId || npc.id`.

| Act | Case ID | Character ID | Character Name | dialogueKey | Runtime Story (.json) | Source (.ink) |
|---|---|---|---|---|---|---|
| Act I | `fig_tree_incident` | `john_fig_tree` | John | `john_fig_tree` | [`../story/act1/case_c_fig_tree_incident/john_fig_tree.json`](../story/act1/case_c_fig_tree_incident/john_fig_tree.json) | [`../story/act1/case_c_fig_tree_incident/john_fig_tree.ink`](../story/act1/case_c_fig_tree_incident/john_fig_tree.ink) |
| Act I | `fig_tree_incident` | `local_traveler_fig_tree` | Local Traveler | `local_traveler` | [`../story/act1/case_c_fig_tree_incident/local_traveler.json`](../story/act1/case_c_fig_tree_incident/local_traveler.json) | [`../story/act1/case_c_fig_tree_incident/local_traveler.ink`](../story/act1/case_c_fig_tree_incident/local_traveler.ink) |
| Act I | `fig_tree_incident` | `nathan_gardener` | Nathan | `nathan_fig_tree` | [`../story/act1/case_c_fig_tree_incident/nathan_fig_tree.json`](../story/act1/case_c_fig_tree_incident/nathan_fig_tree.json) | — |
| Act I | `fig_tree_incident` | `peter_fig_tree` | Peter | `peter_fig_tree` | [`../story/act1/case_c_fig_tree_incident/peter_fig_tree.json`](../story/act1/case_c_fig_tree_incident/peter_fig_tree.json) | [`../story/act1/case_c_fig_tree_incident/peter_fig_tree.ink`](../story/act1/case_c_fig_tree_incident/peter_fig_tree.ink) |
| Act I | `temple_cleansing` | `barabbas_insurgent` | Barabbas | `barabbas_insurgent` | [`../story/act1/case_b_overturned_tables/barabbas_insurgent.json`](../story/act1/case_b_overturned_tables/barabbas_insurgent.json) | [`../story/act1/case_b_overturned_tables/barabbas_insurgent.ink`](../story/act1/case_b_overturned_tables/barabbas_insurgent.ink) |
| Act I | `temple_cleansing` | `corrupt_seller` | Corrupt Seller | `corrupt_seller` | [`../story/act1/case_b_overturned_tables/corrupt_seller.json`](../story/act1/case_b_overturned_tables/corrupt_seller.json) | [`../story/act1/case_b_overturned_tables/corrupt_seller.ink`](../story/act1/case_b_overturned_tables/corrupt_seller.ink) |
| Act I | `temple_cleansing` | `garrison_guard` | Marcus | `guard_report_temple` | [`../story/act1/case_b_overturned_tables/guard_report_temple.json`](../story/act1/case_b_overturned_tables/guard_report_temple.json) | — |
| Act I | `temple_cleansing` | `informant_bribe` | Market Informant | `informant_bribe` | [`../story/act1/case_b_overturned_tables/informant_bribe.json`](../story/act1/case_b_overturned_tables/informant_bribe.json) | [`../story/act1/case_b_overturned_tables/informant_bribe.ink`](../story/act1/case_b_overturned_tables/informant_bribe.ink) |
| Act I | `temple_cleansing` | `market_rumors` | Market Vendor | `market_rumors` | [`../story/act1/case_b_overturned_tables/market_rumors.json`](../story/act1/case_b_overturned_tables/market_rumors.json) | [`../story/act1/case_b_overturned_tables/market_rumors.ink`](../story/act1/case_b_overturned_tables/market_rumors.ink) |
| Act I | `temple_cleansing` | `money_changer` | Malachi | `money_changer` | [`../story/act1/case_b_overturned_tables/money_changer.json`](../story/act1/case_b_overturned_tables/money_changer.json) | [`../story/act1/case_b_overturned_tables/money_changer.ink`](../story/act1/case_b_overturned_tables/money_changer.ink) |
| Act I | `temple_cleansing` | `pharisee_critique` | Simon the Pharisee | `pharisee_critique` | [`../story/act1/case_b_overturned_tables/pharisee_critique.json`](../story/act1/case_b_overturned_tables/pharisee_critique.json) | [`../story/act1/case_b_overturned_tables/pharisee_critique.ink`](../story/act1/case_b_overturned_tables/pharisee_critique.ink) |
| Act I | `temple_cleansing` | `pilates_secretary` | Pilate's Secretary | `pilates_secretary` | [`../story/act1/case_b_overturned_tables/pilates_secretary.json`](../story/act1/case_b_overturned_tables/pilates_secretary.json) | [`../story/act1/case_b_overturned_tables/pilates_secretary.ink`](../story/act1/case_b_overturned_tables/pilates_secretary.ink) |
| Act I | `temple_cleansing` | `pontius_pilate` | Pontius Pilate | `pontius_pilate_temple` | [`../story/act1/case_b_overturned_tables/pontius_pilate_temple.json`](../story/act1/case_b_overturned_tables/pontius_pilate_temple.json) | [`../story/act1/case_b_overturned_tables/pontius_pilate_temple.ink`](../story/act1/case_b_overturned_tables/pontius_pilate_temple.ink) |
| Act I | `temple_cleansing` | `priest_objection` | Temple Priest Objector | `priest_objection_temple` | [`../story/act1/case_b_overturned_tables/priest_objection_temple.json`](../story/act1/case_b_overturned_tables/priest_objection_temple.json) | — |
| Act I | `temple_cleansing` | `rumor_whisper` | Rumor Whisperer | `rumor_whisper` | [`../story/act1/case_b_overturned_tables/rumor_whisper.json`](../story/act1/case_b_overturned_tables/rumor_whisper.json) | [`../story/act1/case_b_overturned_tables/rumor_whisper.ink`](../story/act1/case_b_overturned_tables/rumor_whisper.ink) |
| Act I | `temple_cleansing` | `sadducee_opposition` | Sadducee Opposer | `sadducee_opposition` | [`../story/act1/case_a_missing_donkey/sadducee_opposition.json`](../story/act1/case_a_missing_donkey/sadducee_opposition.json) | [`../story/act1/case_a_missing_donkey/sadducee_opposition.ink`](../story/act1/case_a_missing_donkey/sadducee_opposition.ink) |
| Act I | `temple_cleansing` | `upset_buyer` | Upset Temple Buyer | `upset_buyer` | [`../story/act1/case_b_overturned_tables/upset_buyer.json`](../story/act1/case_b_overturned_tables/upset_buyer.json) | [`../story/act1/case_b_overturned_tables/upset_buyer.ink`](../story/act1/case_b_overturned_tables/upset_buyer.ink) |
| Act I | `temple_cleansing` | `woman_cloak` | Woman Who Gave Her Cloak | `woman_cloak` | [`../story/act1/case_b_overturned_tables/woman_cloak.json`](../story/act1/case_b_overturned_tables/woman_cloak.json) | [`../story/act1/case_b_overturned_tables/woman_cloak.ink`](../story/act1/case_b_overturned_tables/woman_cloak.ink) |
| Act I | `triumphal_entry` | `eleazar` | Eleazar | `eleazar_sadducee` | [`../story/act1/case_a_missing_donkey/eleazar_sadducee.json`](../story/act1/case_a_missing_donkey/eleazar_sadducee.json) | [`../story/act1/case_a_missing_donkey/eleazar_sadducee.ink`](../story/act1/case_a_missing_donkey/eleazar_sadducee.ink) |
| Act I | `triumphal_entry` | `john` | John | `john_donkey` | [`../story/act1/case_a_missing_donkey/john_donkey.json`](../story/act1/case_a_missing_donkey/john_donkey.json) | [`../story/act1/case_a_missing_donkey/john_donkey.ink`](../story/act1/case_a_missing_donkey/john_donkey.ink) |
| Act I | `triumphal_entry` | `local_skeptic` | Jemimah | `jerusalem_local` | [`../story/act1/case_a_missing_donkey/jerusalem_local.json`](../story/act1/case_a_missing_donkey/jerusalem_local.json) | [`../story/act1/case_a_missing_donkey/jerusalem_local.ink`](../story/act1/case_a_missing_donkey/jerusalem_local.ink) |
| Act I | `triumphal_entry` | `owner` | Tobias | `galilean_pilgrim` | [`../story/act1/case_a_missing_donkey/galilean_pilgrim.json`](../story/act1/case_a_missing_donkey/galilean_pilgrim.json) | [`../story/act1/case_a_missing_donkey/galilean_pilgrim.ink`](../story/act1/case_a_missing_donkey/galilean_pilgrim.ink) |
| Act I | `triumphal_entry` | `peter` | Peter | `peter_donkey` | [`../story/act1/case_a_missing_donkey/peter_donkey.json`](../story/act1/case_a_missing_donkey/peter_donkey.json) | [`../story/act1/case_a_missing_donkey/peter_donkey.ink`](../story/act1/case_a_missing_donkey/peter_donkey.ink) |
| Act II | `authority_challenged` | `chief_priest` | Caiaphas | `chief_priest` | [`../story/act2/case_a_silenced_teacher/caiaphas_priest.json`](../story/act2/case_a_silenced_teacher/caiaphas_priest.json) | [`../story/act2/case_a_silenced_teacher/caiaphas_priest.ink`](../story/act2/case_a_silenced_teacher/caiaphas_priest.ink) |
| Act II | `authority_challenged` | `pharisee` | Nathanael | `pharisee_critique` | [`../story/act1/case_b_overturned_tables/pharisee_critique.json`](../story/act1/case_b_overturned_tables/pharisee_critique.json) | [`../story/act1/case_b_overturned_tables/pharisee_critique.ink`](../story/act1/case_b_overturned_tables/pharisee_critique.ink) |
| Act II | `authority_challenged` | `rich_young_ruler` | Thomas the Rich Young Ruler | `rich_young_ruler` | [`../story/act2/case_a_silenced_teacher/rich_young_ruler.json`](../story/act2/case_a_silenced_teacher/rich_young_ruler.json) | [`../story/act2/case_a_silenced_teacher/rich_young_ruler.ink`](../story/act2/case_a_silenced_teacher/rich_young_ruler.ink) |
| Act II | `authority_challenged` | `scribe` | Samuel | `scribe_intro` | [`../story/act2/case_a_silenced_teacher/scribe_intro.json`](../story/act2/case_a_silenced_teacher/scribe_intro.json) | [`../story/act2/case_a_silenced_teacher/scribe_intro.ink`](../story/act2/case_a_silenced_teacher/scribe_intro.ink) |
| Act II | `lazarus_plot` | `annas_patriarch` | Annas | `annas_patriarch` | [`../story/act2/case_b_lazarus_conspiracy/annas_patriarch.json`](../story/act2/case_b_lazarus_conspiracy/annas_patriarch.json) | [`../story/act2/case_b_lazarus_conspiracy/annas_patriarch.ink`](../story/act2/case_b_lazarus_conspiracy/annas_patriarch.ink) |
| Act II | `lazarus_plot` | `martha_bethany` | Martha | `martha_bethany` | [`../story/act2/case_b_lazarus_conspiracy/martha_bethany.json`](../story/act2/case_b_lazarus_conspiracy/martha_bethany.json) | [`../story/act2/case_b_lazarus_conspiracy/martha_bethany.ink`](../story/act2/case_b_lazarus_conspiracy/martha_bethany.ink) |
| Act II | `lazarus_plot` | `nicodemus` | Nicodemus | `nicodemus_conflicted` | [`../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.json`](../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.json) | [`../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.ink`](../story/act2/case_b_lazarus_conspiracy/nicodemus_conflicted.ink) |
| Act II | `lazarus_plot` | `parable_meaning` | Thomas (Parable) | `parable_meaning` | [`../story/act2/case_a_silenced_teacher/parable_meaning.json`](../story/act2/case_a_silenced_teacher/parable_meaning.json) | [`../story/act2/case_a_silenced_teacher/parable_meaning.ink`](../story/act2/case_a_silenced_teacher/parable_meaning.ink) |
| Act II | `lazarus_plot` | `parable_vineyard` | Thomas (Vineyard) | `parable_vineyard` | [`../story/act2/case_a_silenced_teacher/parable_vineyard.json`](../story/act2/case_a_silenced_teacher/parable_vineyard.json) | [`../story/act2/case_a_silenced_teacher/parable_vineyard.ink`](../story/act2/case_a_silenced_teacher/parable_vineyard.ink) |
| Act II | `lazarus_plot` | `simon_leper` | Simon the Leper | `simon_leper` | [`../story/act2/case_b_lazarus_conspiracy/simon_leper.json`](../story/act2/case_b_lazarus_conspiracy/simon_leper.json) | [`../story/act2/case_b_lazarus_conspiracy/simon_leper.ink`](../story/act2/case_b_lazarus_conspiracy/simon_leper.ink) |
| Act II | `lazarus_plot` | `teaching_mount` | Mount Teacher | `teaching_mount` | [`../story/act2/case_a_silenced_teacher/teaching_mount.json`](../story/act2/case_a_silenced_teacher/teaching_mount.json) | [`../story/act2/case_a_silenced_teacher/teaching_mount.ink`](../story/act2/case_a_silenced_teacher/teaching_mount.ink) |
| Act II | `lazarus_plot` | `temple_spy` | Maluch | `temple_spy` | [`../story/act2/case_b_lazarus_conspiracy/temple_spy.json`](../story/act2/case_b_lazarus_conspiracy/temple_spy.json) | [`../story/act2/case_b_lazarus_conspiracy/temple_spy.ink`](../story/act2/case_b_lazarus_conspiracy/temple_spy.ink) |
| Act II | `lazarus_plot` | `trial_rumors` | Trial Rumors | `trial_rumors` | [`../story/act3/case_c_midnight_tribunal/trial_rumors.json`](../story/act3/case_c_midnight_tribunal/trial_rumors.json) | [`../story/act3/case_c_midnight_tribunal/trial_rumors.ink`](../story/act3/case_c_midnight_tribunal/trial_rumors.ink) |
| Act II | `lazarus_plot` | `witness_healed` | Bethesda Witness | `witness_healed` | [`../story/act2/case_a_silenced_teacher/witness_healed.json`](../story/act2/case_a_silenced_teacher/witness_healed.json) | [`../story/act2/case_a_silenced_teacher/witness_healed.ink`](../story/act2/case_a_silenced_teacher/witness_healed.ink) |
| Act II | `olivet_discourse` | `andrew_olivet` | Andrew | `andrew_olivet` | [`../story/act2/case_c_olivet_discourse/andrew_olivet.json`](../story/act2/case_c_olivet_discourse/andrew_olivet.json) | — |
| Act II | `olivet_discourse` | `john_olivet` | John | `john_olivet` | [`../story/act2/case_c_olivet_discourse/john_olivet.json`](../story/act2/case_c_olivet_discourse/john_olivet.json) | — |
| Act II | `olivet_discourse` | `peter_olivet` | Peter | `peter_olivet` | [`../story/act2/case_c_olivet_discourse/peter_olivet.json`](../story/act2/case_c_olivet_discourse/peter_olivet.json) | — |
| Act II | `olivet_discourse` | `thomas_olivet` | Thomas | `parable_meaning` | [`../story/act2/case_a_silenced_teacher/parable_meaning.json`](../story/act2/case_a_silenced_teacher/parable_meaning.json) | [`../story/act2/case_a_silenced_teacher/parable_meaning.ink`](../story/act2/case_a_silenced_teacher/parable_meaning.ink) |
| Act III | `barabbas_choice` | `barabbas_insurgent_trial` | Barabbas | `barabbas_insurgent` | [`../story/act1/case_b_overturned_tables/barabbas_insurgent.json`](../story/act1/case_b_overturned_tables/barabbas_insurgent.json) | [`../story/act1/case_b_overturned_tables/barabbas_insurgent.ink`](../story/act1/case_b_overturned_tables/barabbas_insurgent.ink) |
| Act III | `barabbas_choice` | `pontius_pilate_trial` | Pontius Pilate | `pontius_pilate_barabbas` | [`../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.json`](../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.json) | — |
| Act III | `crucifixion_site` | `centurion_longinus` | Centurion Longinus | `roman_assessment` | [`../story/act3/case_e_final_sacrifice/roman_assessment.json`](../story/act3/case_e_final_sacrifice/roman_assessment.json) | [`../story/act3/case_e_final_sacrifice/roman_assessment.ink`](../story/act3/case_e_final_sacrifice/roman_assessment.ink) |
| Act III | `crucifixion_site` | `execution_guard` | Crucifixion Guard | `guard_report_crucifixion` | [`../story/act3/case_e_final_sacrifice/guard_report_crucifixion.json`](../story/act3/case_e_final_sacrifice/guard_report_crucifixion.json) | — |
| Act III | `crucifixion_site` | `joseph_arimathea` | Joseph of Arimathea | `joseph_arimathea` | [`../story/act4/case_a_empty_tomb/joseph_arimathea.json`](../story/act4/case_a_empty_tomb/joseph_arimathea.json) | [`../story/act4/case_a_empty_tomb/joseph_arimathea.ink`](../story/act4/case_a_empty_tomb/joseph_arimathea.ink) |
| Act III | `crucifixion_site` | `peter_defense_simple` | Peter (Simple Defense) | `peter_defense_simple` | [`../story/act3/case_b_severed_ear/peter_defense_simple.json`](../story/act3/case_b_severed_ear/peter_defense_simple.json) | [`../story/act3/case_b_severed_ear/peter_defense_simple.ink`](../story/act3/case_b_severed_ear/peter_defense_simple.ink) |
| Act III | `crucifixion_site` | `peter_denial` | Peter (Denial) | `peter_denial` | [`../story/act3/case_c_midnight_tribunal/peter_denial.json`](../story/act3/case_c_midnight_tribunal/peter_denial.json) | [`../story/act3/case_c_midnight_tribunal/peter_denial.ink`](../story/act3/case_c_midnight_tribunal/peter_denial.ink) |
| Act III | `crucifixion_site` | `secret_visit` | Secret Visitor | `secret_visit` | [`../story/act3/case_b_severed_ear/secret_visit.json`](../story/act3/case_b_severed_ear/secret_visit.json) | [`../story/act3/case_b_severed_ear/secret_visit.ink`](../story/act3/case_b_severed_ear/secret_visit.ink) |
| Act III | `crucifixion_site` | `simon_cyrene` | Simon of Cyrene | `simon_cyrene` | [`../story/act3/case_e_final_sacrifice/simon_cyrene.json`](../story/act3/case_e_final_sacrifice/simon_cyrene.json) | [`../story/act3/case_e_final_sacrifice/simon_cyrene.ink`](../story/act3/case_e_final_sacrifice/simon_cyrene.ink) |
| Act III | `crucifixion_site` | `temple_curtain` | Temple Curtain Witness | `priest_objection_crucifixion` | [`../story/act3/case_e_final_sacrifice/priest_objection_crucifixion.json`](../story/act3/case_e_final_sacrifice/priest_objection_crucifixion.json) | — |
| Act III | `crucifixion_site` | `temple_priest_pashhur` | Pashhur | `temple_curtain` | [`../story/act3/case_e_final_sacrifice/temple_curtain.json`](../story/act3/case_e_final_sacrifice/temple_curtain.json) | [`../story/act3/case_e_final_sacrifice/temple_curtain.ink`](../story/act3/case_e_final_sacrifice/temple_curtain.ink) |
| Act III | `crucifixion_site` | `upper_room_prep` | Upper Room Prep | `upper_room_prep` | [`../story/act3/case_a_broken_cup/upper_room_prep.json`](../story/act3/case_a_broken_cup/upper_room_prep.json) | [`../story/act3/case_a_broken_cup/upper_room_prep.ink`](../story/act3/case_a_broken_cup/upper_room_prep.ink) |
| Act III | `gethsemane_arrest` | `malchus_servant` | Malchus | `malchus` | [`../story/act3/case_b_severed_ear/malchus.json`](../story/act3/case_b_severed_ear/malchus.json) | — |
| Act III | `gethsemane_arrest` | `roman_soldier` | Garrison Guard | `guard_report_gethsemane` | [`../story/act3/case_b_severed_ear/guard_report_gethsemane.json`](../story/act3/case_b_severed_ear/guard_report_gethsemane.json) | — |
| Act III | `gethsemane_arrest` | `simon_peter` | Simon Peter | `peter_defense` | [`../story/act3/case_b_severed_ear/peter_defense.json`](../story/act3/case_b_severed_ear/peter_defense.json) | [`../story/act3/case_b_severed_ear/peter_defense.ink`](../story/act3/case_b_severed_ear/peter_defense.ink) |
| Act III | `last_supper` | `john_mark` | John Mark | `john_disciple` | [`../story/act3/case_a_broken_cup/john_disciple.json`](../story/act3/case_a_broken_cup/john_disciple.json) | [`../story/act3/case_a_broken_cup/john_disciple.ink`](../story/act3/case_a_broken_cup/john_disciple.ink) |
| Act III | `last_supper` | `judas` | Judas Iscariot | `judas_iscariot` | [`../story/act3/case_a_broken_cup/judas_iscariot.json`](../story/act3/case_a_broken_cup/judas_iscariot.json) | [`../story/act3/case_a_broken_cup/judas_iscariot.ink`](../story/act3/case_a_broken_cup/judas_iscariot.ink) |
| Act III | `last_supper` | `servant` | Rhoda | `rhoda_servant` | [`../story/act3/case_a_broken_cup/rhoda_servant.json`](../story/act3/case_a_broken_cup/rhoda_servant.json) | [`../story/act3/case_a_broken_cup/rhoda_servant.ink`](../story/act3/case_a_broken_cup/rhoda_servant.ink) |
| Act III | `sanhedrin_trial` | `caiaphas_trial` | Caiaphas | `caiaphas_priest` | [`../story/act3/case_c_midnight_tribunal/caiaphas_priest.json`](../story/act3/case_c_midnight_tribunal/caiaphas_priest.json) | [`../story/act3/case_c_midnight_tribunal/caiaphas_priest.ink`](../story/act3/case_c_midnight_tribunal/caiaphas_priest.ink) |
| Act III | `sanhedrin_trial` | `false_witness_trial` | Ananias | `false_witness` | [`../story/act3/case_c_midnight_tribunal/false_witness.json`](../story/act3/case_c_midnight_tribunal/false_witness.json) | — |
| Act III | `sanhedrin_trial` | `peter_denial_trial` | Peter | `peter_denial` | [`../story/act3/case_c_midnight_tribunal/peter_denial.json`](../story/act3/case_c_midnight_tribunal/peter_denial.json) | [`../story/act3/case_c_midnight_tribunal/peter_denial.ink`](../story/act3/case_c_midnight_tribunal/peter_denial.ink) |
| Act IV | `peter_restoration` | `mary_magdalene` | Mary Magdalene | `mary_magdalene` | [`../story/act4/case_a_empty_tomb/mary_magdalene.json`](../story/act4/case_a_empty_tomb/mary_magdalene.json) | [`../story/act4/case_a_empty_tomb/mary_magdalene.ink`](../story/act4/case_a_empty_tomb/mary_magdalene.ink) |
| Act IV | `peter_restoration` | `nathanael` | Nathanael | `nathanael_disciple` | [`../story/act4/case_c_peters_restoration/nathanael_disciple.json`](../story/act4/case_c_peters_restoration/nathanael_disciple.json) | — |
| Act IV | `peter_restoration` | `peter` | Peter | `peter_restored` | [`../story/act4/case_c_peters_restoration/peter_restored.json`](../story/act4/case_c_peters_restoration/peter_restored.json) | [`../story/act4/case_c_peters_restoration/peter_restored.ink`](../story/act4/case_c_peters_restoration/peter_restored.ink) |
| Act IV | `peter_restoration` | `thomas` | Thomas | `parable_meaning` | [`../story/act2/case_a_silenced_teacher/parable_meaning.json`](../story/act2/case_a_silenced_teacher/parable_meaning.json) | [`../story/act2/case_a_silenced_teacher/parable_meaning.ink`](../story/act2/case_a_silenced_teacher/parable_meaning.ink) |
| Act IV | `resurrection` | `joseph` | Joseph of Arimathea | `joseph_arimathea` | [`../story/act4/case_a_empty_tomb/joseph_arimathea.json`](../story/act4/case_a_empty_tomb/joseph_arimathea.json) | [`../story/act4/case_a_empty_tomb/joseph_arimathea.ink`](../story/act4/case_a_empty_tomb/joseph_arimathea.ink) |
| Act IV | `resurrection` | `marcus` | Marcus | `execution_soldier` | [`../story/act4/case_a_empty_tomb/execution_soldier.json`](../story/act4/case_a_empty_tomb/execution_soldier.json) | [`../story/act4/case_a_empty_tomb/execution_soldier.ink`](../story/act4/case_a_empty_tomb/execution_soldier.ink) |
| Act IV | `resurrection` | `mary_magdalene` | Mary Magdalene | `mary_magdalene` | [`../story/act4/case_a_empty_tomb/mary_magdalene.json`](../story/act4/case_a_empty_tomb/mary_magdalene.json) | [`../story/act4/case_a_empty_tomb/mary_magdalene.ink`](../story/act4/case_a_empty_tomb/mary_magdalene.ink) |
| Act IV | `roman_inquiry` | `herods_servant` | Herod's Servant | `herods_servant` | [`../story/act4/case_b_guards_report/herods_servant.json`](../story/act4/case_b_guards_report/herods_servant.json) | [`../story/act4/case_b_guards_report/herods_servant.ink`](../story/act4/case_b_guards_report/herods_servant.ink) |
| Act IV | `roman_inquiry` | `judas_betrayal` | Judas (Betrayal) | `judas_betrayal` | [`../story/act4/case_b_guards_report/judas_betrayal.json`](../story/act4/case_b_guards_report/judas_betrayal.json) | [`../story/act4/case_b_guards_report/judas_betrayal.ink`](../story/act4/case_b_guards_report/judas_betrayal.ink) |
| Act IV | `roman_inquiry` | `mary_resurrection` | Mary (Resurrection) | `mary_resurrection` | [`../story/act4/case_b_guards_report/mary_resurrection.json`](../story/act4/case_b_guards_report/mary_resurrection.json) | [`../story/act4/case_b_guards_report/mary_resurrection.ink`](../story/act4/case_b_guards_report/mary_resurrection.ink) |
| Act IV | `roman_inquiry` | `peter_restored` | Peter (Restored) | `peter_restored` | [`../story/act4/case_c_peters_restoration/peter_restored.json`](../story/act4/case_c_peters_restoration/peter_restored.json) | [`../story/act4/case_c_peters_restoration/peter_restored.ink`](../story/act4/case_c_peters_restoration/peter_restored.ink) |
<!-- AUTO-GENERATED: DIALOGUE-ID-INDEX END -->

---
[Back to Top](#table-of-contents)

## Appendix: Emoji Reference

This table catalogs every emoji used directly in the game UI, narrative, or system code.
The **Phosphor Duotone** column provides the SVG filename from [phosphoricons.com](https://phosphoricons.com/?weight=duotone) where a matching icon exists.
Emojis without a match (`—`) currently have no Phosphor Duotone equivalent and remain as-is.

Phosphor Duotone Icon  are in the /assets/gfx/ folder

| Emoji | Phosphor Duotone Icon | Name / Description |
|-------|------------------------|-------------------|
| `🔄` | `arrow-clockwise-duotone.svg` | Arrow Clockwise |
| `⬇️` | `arrow-down-duotone.svg` | Arrow Down |
| `⬆️` | `arrow-up-duotone.svg` | Arrow Up |
| `🔊` | `audio.svg` | Audio |
| `🎒` | `backpack-duotone.svg` | Backpack |
| `⚖️` | `balance-scale-duotone.svg` | Balance Scale |
| `⛵` | `boat-duotone.svg` | Boat |
| `🦴` | `bone-duotone.svg` | Bone |
| `📖` | `book-open-duotone.svg` | Book Open |
| `📚` | `books-duotone.svg` | Books |
| `🥣` | `bowl-duotone.svg` | Bowl |
| `🥊` | `boxing-glove-duotone.svg` | Boxing Glove |
| `🍞` | `bread-duotone.svg` | Bread |
| `🏛️` | `building-columns-duotone.svg` | Building Columns |
| `📅` | `calendar-duotone.svg` | Calendar |
| `⛓` | `chain-duotone.svg` | Chain |
| `💬` | `chat-duotone.svg` | Chat |
| `✅` | `check-circle-duotone.svg` | Check Circle |
| `☐` | `check-square-empty.svg` | Check Square Empty |
| `☑️` | `check-square-full.svg` | Check Square Full |
| `⛪` | `church-duotone.svg` | Church |
| `⭕` | `circle-duotone.svg` | Circle |
| `⭕` | `circle.svg` | Circle |
| `📋` | `clipboard-duotone.svg` | Clipboard |
| `🪙` | `coins-duotone.svg` | Coins |
| `✝️` | `cross-duotone.svg` | Cross |
| `👑` | `crown-duotone.svg` | Crown |
| `☕` | `cup-duotone.svg` | Cup |
| `💵` | `currency-dollar-duotone.svg` | Currency Dollar |
| `🖱️` | `cursor-duotone.svg` | Cursor |
| `🗡` | `dagger-duotone.svg` | Dagger |
| `☀️` | `day.svg` | Day |
| `🎲` | `dice-duotone.svg` | Dice |
| `🟫` | `dirt.svg` | Dirt |
| `🦅` | `eagle-duotone.svg` | Eagle |
| `👂` | `ear-duotone.svg` | Ear |
| `🌍` | `earth-duotone.svg` | Earth |
| `✉️` | `envelope-duotone.svg` | Envelope |
| `👁️` | `eye-duotone.svg` | Eye |
| `🪶` | `feather-duotone.svg` | Feather |
| `🚑` | `first-aid.svg` | First Aid |
| `🐟` | `fish-duotone.svg` | Fish |
| `🔥` | `flame-duotone.svg` | Flame |
| `💾` | `floppy-disk-duotone.svg` | Floppy Disk |
| `💎` | `gem.svg` | Gem |
| `☝️` | `hand-pointer.svg` | Hand Pointer |
| `🪦` | `headstone-duotone.svg` | Headstone |
| `🐴` | `horse-duotone.svg` | Horse |
| `🏠` | `house-chimney-duotone.svg` | House Chimney |
| `🏠` | `house-duotone.svg` | House |
| `📦` | `inventory.svg` | Inventory |
| `🫙` | `jar-duotone.svg` | Jar |
| `💻` | `laptop-code.svg` | Laptop Code |
| `💻` | `laptop-duotone.svg` | Laptop |
| `🍃` | `leaf-duotone.svg` | Leaf |
| `🍂` | `leaves-duotone.svg` | Leaves |
| `🔗` | `link-duotone.svg` | Link |
| `📋` | `list.svg` | List |
| `⏳` | `loading.svg` | Loading |
| `🔒` | `lock-duotone.svg` | Lock |
| `🔓` | `lock-open-duotone.svg` | Lock Open |
| `🪵` | `log-duotone.svg` | Log |
| `🔍` | `magnifying-glass-duotone.svg` | Magnifying Glass |
| `📍` | `map-pin-duotone.svg` | Map Pin |
| `🧠` | `memory.svg` | Memory |
| `🔬` | `microscope-duotone.svg` | Microscope |
| `🌙` | `moon-duotone.svg` | Moon |
| `🎵` | `music.svg` | Music |
| `🔇` | `music_off.svg` | Music_Off |
| `🌙` | `night.svg` | Night |
| `📦` | `package-duotone.svg` | Package |
| `✏️` | `pencil-duotone.svg` | Pencil |
| `📌` | `pin-duotone.svg` | Pin |
| `▶️` | `play-duotone.svg` | Play |
| `➕` | `plus-duotone.svg` | Plus |
| `❓` | `quest.svg` | Quest |
| `❓` | `question-duotone.svg` | Question |
| `🪨` | `rock-duotone.svg` | Rock |
| `🐓` | `rooster-duotone.svg` | Rooster |
| `📏` | `ruler-duotone.svg` | Ruler |
| `📡` | `scan.svg` | Scan |
| `✂️` | `scissors-duotone.svg` | Scissors |
| `📜` | `scroll-duotone.svg` | Scroll |
| `🔍` | `search.svg` | Search |
| `🐑` | `sheep-duotone.svg` | Sheep |
| `🛡️` | `shield-duotone.svg` | Shield |
| `🚿` | `shower-duotone.svg` | Shower |
| `💀` | `skull-duotone.svg` | Skull |
| `✨` | `sparkles-duotone.svg` | Sparkles |
| `🔊` | `speaker-high-duotone.svg` | Speaker High |
| `🕵️` | `spy-duotone.svg` | Spy |
| `⭐` | `star-duotone.svg` | Star |
| `🌟` | `stars-duotone.svg` | Stars |
| `☀️` | `sun-duotone.svg` | Sun |
| `🌅` | `sunrise-duotone.svg` | Sunrise |
| `⚔️` | `sword-duotone.svg` | Sword |
| `📝` | `text-align-left-duotone.svg` | Text Align Left |
| `🎭` | `theater-masks-duotone.svg` | Theater Masks |
| `🌳` | `tree-duotone.svg` | Tree |
| `🏆` | `trophy-duotone.svg` | Trophy |
| `👤` | `user-duotone.svg` | User |
| `👥` | `users-duotone.svg` | Users |
| `💧` | `water-drop-duotone.svg` | Water Drop |
| `🥀` | `wilted-flower-duotone.svg` | Wilted Flower |
| `🍷` | `wine-duotone.svg` | Wine |
| `🔧` | `wrench.svg` | Wrench |
| `❌` | `x-circle-duotone.svg` | X Circle |
| `✖️` | `x-duotone.svg` | X |

---
[Back to Top](#table-of-contents)

# Appendix: Character Emoji & Icon Reference

This table maps each character to their representative emoji and the corresponding SVG icon file located in `/assets/character/`.

| Emoji | Character Name | SVG Icon File |
|:---:|---|---|
| `📜` | Senior Scribe | `senior_scribe.svg` |
| `🤔` | Thomas the Twin | `thomas.svg` |
| `🏛️` | Pashhur | `pashhur.svg` |
| `🧐` | Simon the Pharisee | `simon_pharisee.svg` |
| `🕍` | The Temple Priest | `temple_priest.svg` |
| `⛵` | Simon Peter | `peter.svg` |
| `🛡️` | Claudius the Centurion | `centurion_longinus.svg` |
| `💂` | The Garrison Guard | `garrison_guard.svg` |
| `💰` | Corrupt Seller | `temple_merchant.svg` |
| `🤫` | The Market Informant | `market_informant.svg` |
| `🧺` | The Market Vendor | `market_vendor.svg` |
| `😨` | The Nervous Citizen | `city_gossip.svg` |
| `🌾` | The Galilean Pilgrim | `galilean_pilgrim.svg` |
| `🏙️` | The Jerusalem Local | `jerusalem_local.svg` |
| `💸` | The Temple Money Changer | `money_changer.svg` |
| `👑` | Annas the Patriarch | `annas.svg` |
| `⚖️` | Caiaphas the High Priest | `caiaphas.svg` |
| `📖` | Eleazar | `eleazar.svg` |
| `⚰️` | Joseph of Arimathea | `joseph_arimathea.svg` |
| `😠` | Sadducee Opposer | `sadducee_authority.svg` |
| `🪙` | Judas Iscariot | `judas.svg` |
| `🕵️` | The Temple Spy | `temple_spy.svg` |
| `✍️` | John the Beloved Disciple | `john_apostle.svg` |
| `🍲` | Martha of Bethany | `martha.svg` |
| `💎` | Mary of Bethany | `mary_bethany.svg` |
| `💧` | Mary Magdalene | `mary_magdalene.svg` |
| `⚔️` | Centurion Longinus | `centurion_longinus.svg` |
| `💭` | Claudia Procula (Pilate’s Wife) | `claudia_procula.svg` |
| `🤵` | Herod’s Servant (Chuza) | `herods_servant.svg` |
| `✒️` | Pilate’s Secretary | `pilate_secretary.svg` |
| `🏛️` | Pontius Pilate | `pontius_pilate.svg` |
| `🤥` | Ananias the False Witness | `ananias_witness.svg` |
| `🦊` | Nathanael the Pharisee | `nathanael_pharisee.svg` |
| `❓` | Nicodemus | `nicodemus.svg` |
| `📝` | Hillel the Scribe | `hillel_scribe.svg` |
| `👨‍🏫` | Samuel the Scribe | `samuel_scribe.svg` |
| `🤝` | Andrew the Disciple | `andrew_disciple.svg` |
| `📝` | John Mark | `john_mark.svg` |
| `🗣️` | Mount Teacher | `mount_teacher.svg` |
| `🇮🇱` | Nathanael | `nathanael_disciple.svg` |
| `⛓️` | Barabbas | `barabbas.svg` |
| `😒` | Jemimah the Skeptic | `jemimah.svg` |
| `👮` | Lucas the Sentry | `lucas_sentry.svg` |
| `🤑` | Malachi the Money Changer | `malachi_moneychanger.svg` |
| `👂` | Malchus | `malchus.svg` |
| `👁️` | Maluch the Temple Spy | `maluch.svg` |
| `💂` | Marcus the Garrison Guard | `garrison_guard.svg` |
| `👨‍🌾` | Nathan the Gardener | `nathan_gardener.svg` |
| `🧹` | Preparation Servant | `upper_room_prep.svg` |
| `👧` | Rhoda the Servant | `rhoda.svg` |
| `💪` | Simon of Cyrene | `simon_cyrene.svg` |
| `🙌` | Simon the Leper | `simon_leper.svg` |
| `💂` | The Execution Detail Soldier | `execution_soldier.svg` |
| `🐴` | Tobias the Donkey Owner | `tobias_owner.svg` |
| `🧑‍🤝‍🧑` | Bethesda Witness | `bethesda_witness.svg` |
| `🚶` | Local Traveler | `local_traveler.svg` |
| `💰` | Rich Young Ruler | `rich_young_ruler.svg` |
| `🤫` | Secret Visitor | `secret_visit.svg` |
| `😡` | The Upset Pilgrim Buyer | `upset_buyer.svg` |
| `🗣️` | Trial Rumors | `trial_rumors.svg` |
| `😠` | Upset Temple Buyer | `displaced_merchant.svg` |
| `🧥` | Woman Who Gave Her Cloak | `devout_follower.svg` |

<!-- AUTO-GENERATED: EMOJI-REFERENCE-APPENDIX END -->

---
[Back to Top](#table-of-contents)

## Appendix: Location Emoji & Icon Reference

This table maps each key location in the game to its representative emoji and the corresponding SVG icon file located in `/assets/locations/`.

| Emoji | Location Name | SVG Icon File |
|:---:|---|---|
| `🏡` | Bethany | `bethany.svg` |
| `🫒` | Mount of Olives | `mount_of_olives.svg` |
| `🕍` | Jerusalem Temple | `temple.svg` |
| `🏛️` | The Praetorium | `praetorium.svg` |
| `🏠` | Palace of Caiaphas | `caiaphas_palace.svg` |
| `🚪` | The Upper Room | `upper_room.svg` |
| `🌳` | Garden of Gethsemane | `gethsemane.svg` |
| `🪦` | Golgotha / Garden Tomb | `golgotha.svg` |
| `🌊` | Sea of Galilee | `sea_of_galilee.svg` |
| `🏙️` | Jerusalem | `jerusalem.svg` |
| `🛤️` | Road to Emmaus | `emmaus_road.svg` |
| `🏺` | Pool of Bethesda | `pool_of_bethesda.svg` |
| `🌾` | Field of Blood (Akeldama) | `akeldama.svg` |

---
[Back to Top](#table-of-contents)


## Appendix: Location Emoji & Icon Reference

This table maps each key location in the game to its representative emoji and the corresponding SVG icon file located in `/assets/locations/`.

| Emoji | Location Name | SVG Icon File |
|:---:|---|---|
| `🏡` | Bethany | `bethany.svg` |
| `🫒` | Mount of Olives | `mount_of_olives.svg` |
| `🕍` | Jerusalem Temple | `temple.svg` |
| `🏛️` | The Praetorium | `praetorium.svg` |
| `🏠` | Palace of Caiaphas | `caiaphas_palace.svg` |
| `🚪` | The Upper Room | `upper_room.svg` |
| `🌳` | Garden of Gethsemane | `gethsemane.svg` |
| `🪦` | Golgotha / Garden Tomb | `golgotha.svg` |
| `🌊` | Sea of Galilee | `sea_of_galilee.svg` |
| `🏙️` | Jerusalem | `jerusalem.svg` |
| `🛤️` | Road to Emmaus | `emmaus_road.svg` |
| `🏺` | Pool of Bethesda | `pool_of_bethesda.svg` |
| `🌾` | Field of Blood (Akeldama) | `akeldama.svg` |

---
[Back to Top](#table-of-contents)


## Appendix: Act & Case Emoji & Icon Reference

This table maps each case to its representative emoji and the corresponding SVG icon file located in `assets/gfx/`.

| Emoji | Case Title | Act | SVG Icon File |
|:---:|---|---|---|
| 🐴 | The Missing Donkey | Act I | `horse-duotone.svg` |
| 🪑 | The Overturned Tables | Act I | `coins-duotone.svg` |
| 🌳 | The Barren Fig Tree | Act I | `tree-duotone.svg` |
| 📖 | The Silenced Teacher | Act II | `book-open-duotone.svg` |
| 💰 | The Price of Life | Act II | `coins-duotone.svg` |
| ☀️ | The End of the Age | Act II | `sun-duotone.svg` |
| 🫙 | The Anointing at Bethany | Act II | `jar-duotone.svg` |
| 🍷 | The Broken Cup | Act III | `cup-duotone.svg` |
| 👂 | The Severed Ear | Act III | `ear-duotone.svg` |
| ⚖️ | The Midnight Tribunal | Act III | `balance-scale-duotone.svg` |
| 👑 | The People's Choice | Act III | `crown-duotone.svg` |
| ✝️ | The Final Sacrifice | Act III | `cross-duotone.svg` |
| ⚰️ | The Empty Tomb | Act IV | `package-duotone.svg` |
| 📜 | The Guard's Report | Act IV | `scroll-duotone.svg` |
| 🐟 | Peter's Restoration | Act IV | `fish-duotone.svg` |

---
[Back to Top](#table-of-contents)