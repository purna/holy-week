# Miracle Maker - Source of Truth

**Note on Suspects:** All characters involved in a case are considered potential suspects from the start. The final list of accusable suspects is fully unlocked once all prophecies for that case have been discovered.

This document serves as the canonical source of truth for the game's narrative structure, characters, and case resolutions for both mobile and desktop versions. It is generated from the `act*.js` case files.

## Gsames

Currently 3 versions all using a core gameplay 
*  [`/mobileA/`](../mobileA/)
*  [`/mobileB/`](../mobileB/)
*  [`/desktop/`](../desktop/)

## Linked Documentation

*   **Holy Week Chronology ([`holy_week_chronology.md`](holy_week_chronology.md)):** The master timeline of events, locations, prophecies, and historical context.
*   **Character Profiles: ([`character_profiles_expanded.md`](character_profiles_expanded.md)):**  In-depth linguistic and psychological profiles for all major characters.
*   **Prophecy Guide ([`prophecies.md`](prophecies.md)):** A detailed breakdown of all prophecies, their fulfillment, and which characters reference them.§
*   **System Architecture ([`CONFIG.md`](CONFIG.md)):** Technical documentation for the game's configuration and engine systems.
*   **Trigger & NPC System:** Design pattern for binding Blender objects to game logic.


## Prophecy System: How Prophecies are Unlocked

Prophecies are a key element for scoring and understanding the narrative. Unlocking them is a two-step process: **Reveal** and **Link**.

1.  **Reveal (Discovery):** First, a prophecy must be revealed. This removes the padlock in the Codex, allowing you to read its details. A prophecy is revealed when you:
    *   **Talk to a specific person:** Certain characters will mention a prophecy during dialogue, revealing it.
    *   **Perform an analysis in the Lab:** Combining the correct evidence in the Lab can also reveal a prophetic connection.

    Each NPC and lab deduction that reveals a prophecy is marked with a `revealsProphecy` field in the case data. When triggered, a "🔮 Prophecy Revealed" notification appears.

2.  **Link (Unlock for Score):** Once a prophecy is revealed, you must go to the Codex to unlock its point value. To do this, you must correctly link the prophecy to the piece of evidence that fulfills it.

3.  **Scoring:**
    *   Open the Codex.
    *   Select the unlocked prophecy.
    *   Correctly link it to the piece of evidence that fulfilled it.
    *   A correct link awards `+10 points`. An incorrect link adds `+5 doubt`.

A "Prophecy Revealed" notification (🔮) will appear when you successfully complete step 1.

---

## Scoring System

The player's performance in each case is evaluated based on a comprehensive scoring system designed to reward thorough investigation and careful deduction. The final score for a case is calculated when the player submits an accusation.

The score is composed of the following elements:

### Score
*   **Correct Accusation:** `+50 points`
    *   Awarded for correctly identifying the culprit (or 'No One' if it was a prophetic act). An incorrect accusation results in a `-25 point` penalty.
*   **Lab Deductions:** `+15 points` per deduction
    *   Awarded for successfully analyzing evidence in the Lab to reveal its implication on a suspect (e.g., clearing them, implicating them, or identifying them as a witness). Each case's Lab table lists the exact Points/Reputation/Doubt outcome per pairing — see **Lab Actions** below.
*   **Prophecies Linked:** `+10 points` per prophecy
    *   Awarded for correctly matching evidence to prophecies in the Codex.
*   **Successful Challenges:** `+10 points` per breakthrough
    *   Awarded for successfully challenging an NPC with a contradiction, leading to a breakthrough.
*   **Evidence Collected:** `+5 points` per item
    *   Rewards finding all available physical evidence and testimonials.
*   **Perfect Case Bonus:** `+25 points`
    *   A bonus awarded if the accusation is correct and the player made no failed challenges during the case.
*   **Doubt Penalty:** `-2 points` per doubt point
    *   The player's final score for the case is reduced by a penalty calculated from their accumulated "Doubt" score.

### Lab Actions

Every case's Lab table includes **Points**, **Reputation**, and **Doubt** columns showing exactly what each pairing awards:

*   **Correct Pairing:** `+15 points`
    *   Awarded when the player combines the listed pair of evidence with the correct operation (Link or Compare) and reaches the stated Result. This is the same `+15 points` "Lab Deductions" reward listed under Score, above.
    *   **Reputation:** unaffected. Unlike NPC challenges, Lab deductions are private research and don't move any faction's trust — the Reputation column always reads `—`.
    *   **Prophecy:** if the pairing also unlocks a prophecy, that's a notification only; the `+10 points` for a prophecy is earned separately when it's linked in the Codex.
*   **Incorrect Pairing:** `-5 points`, `+5 doubt`
    *   Applied whenever the player submits an evidence pair/operation that doesn't match any correct combination listed for that case. This isn't listed as its own row in every table — it's a standing rule that applies to any mismatch, in every case.

### Doubt

Doubt is a global penalty meter that accumulates across all cases. It measures how many missteps the investigator has made.

*   **Starting Value:** `0`
*   **Minimum Value:** `0` (cannot go negative)
*   **Penalty Calculation:** The player's final case score is reduced by `Doubt × 2` points.
*   **Accrual Triggers:**
    *   **Failed Challenge:** `+10 doubt`
        *   Awarded when the player incorrectly pairs two pieces of evidence during an NPC challenge and no contradiction is found.
    *   **Incorrect Lab Pairing:** `+5 doubt`
        *   Awarded when the player submits an evidence pair/operation in the Lab that doesn't match any correct combination for the case. Also carries a `-5 point` penalty — see **Lab Actions** above.
    *   **Incorrect Prophecy Link:** `+5 doubt`
        *   Awarded when the player links evidence to the wrong prophecy in the Codex.
    *   **Incorrect Accusation:** `+25 doubt`
        *   Awarded when the player accuses the wrong suspect (or 'No One') of a crime.

### Reputation

Reputation is a faction-based trust meter that tracks how each major group in Jerusalem views the investigator.

*   **Factions:**
    *   `scribes` — Religious scholars and teachers
    *   `temple` — Temple authorities and priests
    *   `roman` — Roman military and administrative officials
    *   `local` — Local Jerusalem residents and merchants
*   **Starting Value:** `100` per faction
*   **Range:** `0` to `100` (clamped on change)
*   **Displayed Value:** The UI shows the **average** of all four faction reputations as a single number.
*   **Change Triggers:**
    *   **Successful Challenge:** `+5` to the challenged NPC's faction
        *   Awarded when the player correctly exposes a contradiction without having previously failed that challenge.
    *   **Failed Challenge:** `-15` to the challenged NPC's faction
        *   Awarded when the player incorrectly challenges an NPC and fails to find a contradiction.

---

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
    *   `Fresh Hoofprints`
    *   `Villager's Testimony`
    *   `Cut Rope at the Tethering Post`
    *   `Two Disciples' Cloaks`
    *   `Zechariah Scroll`
    *   `Fresh-Cut Palm Branch`
    *   `Pharisee's Written Complaint`

#### People

| Character | Action | Unlocks Evidence | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `Two Disciples' Cloaks`, `Cut Rope at the Tethering Post` | Genesis 49:10–11 |
| John | Talk | `Fresh Hoofprints`, `Villager's Testimony` | — |
| Tobias | Talk | `Fresh-Cut Palm Branch`, `Zechariah Scroll` | Psalm 118:25–26 |
| Eleazar | Talk | `Pharisee's Written Complaint` | Malachi 3:1 |

##### Character Unlock Table

| Character | ID | Type | Unlock Method | Unlockable |
|---|---|---|---|---|
| Peter | `peter` | NPC + Suspect | Talk to Peter; Collect `Two Disciples' Cloaks` | ✅ Yes |
| John | `john` | NPC + Suspect | Talk to John | ✅ Yes |
| Tobias | `owner` | NPC + Suspect | Talk to Tobias | ✅ Yes |
| Jemimah | `local_skeptic` | NPC + Suspect | Talk to Jemimah | ✅ Yes |
| Eleazar | `eleazar` | NPC only (not a suspect in this case) | Walk up in Scene tab | ✅ Yes (as NPC) |
| Local Villager | `villager` | Suspect only | Talk to Peter, John, or Tobias | ✅ Yes |
| Pharisee | `pharisee` | Suspect only | Talk to Eleazar | ✅ Yes |
| No One | `none` | Suspect only | Collect `Villager's Testimony` or `Zechariah Scroll` | ✅ Yes |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Two Disciples' Cloaks` + `Zechariah Scroll` | Compare | **Motive Clarified** for Peter (Acted on instruction) | Zechariah 9:9 | +15 | — | — |
| `Fresh Hoofprints` + `Villager's Testimony` | Compare | **Cleared** Tobias (Confirmed he willingly lent the colt) | — | +15 | — | — |

#### Codex
 
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Zechariah Scroll` → Zechariah 9:9 | Lab: `Two Disciples' Cloaks` + `Zechariah Scroll` |
| `Fresh-Cut Palm Branch` → Psalm 118:25–26 | Dialogue: Tobias |
| `Two Disciples' Cloaks` → Genesis 49:10–11 | Dialogue: Peter |
| `Pharisee's Written Complaint` → Malachi 3:1 | Dialogue: Eleazar |



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
    *   `Scattered Shekels`
    *   `Roman Standard`
    *   `Shattered Dove Cages`
    *   `Disciples' Testimony`
    *   `Whip of Cords`

#### People

| Character | Action | Unlocks Evidence | Reveals Prophecy |
|---|---|---|---|
| Malachi (Money Changer) | Talk | `Scattered Shekels` | Malachi 3:1 |
| Marcus (Garrison Guard) | Talk | `Roman Standard`, `Whip of Cords` | — |
| Jadan of Bethphage | Talk | `Shattered Dove Cages` | Isaiah 56:7 |
| Disciples (generic) | Talk | `Disciples' Testimony` | Psalm 69:9 |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Shattered Dove Cages` + `Whip of Cords` | Link | **Identified as Victim** for Jadan | — | +15 | — | — |
| `Scattered Shekels` + `Whip of Cords` | Link | **Identified as Victim** for Malachi | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Shattered Dove Cages` → Isaiah 56:7 | Dialogue: Jadan of Bethphage |
| `Scattered Shekels` → Malachi 3:1 | Dialogue: Malachi (Money Changer) |
| `Disciples' Testimony` → Psalm 69:9 | Dialogue: Disciples (generic) |
 
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
    *   `Withered Fig Leaf (Tuesday)`
    *   `Healthy Fig Leaf (Monday)`
    *   `Jesus's Teaching on Faith`
    *   `Disciples' Astonishment`

#### People

| Character | Action | Unlocks Evidence | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `Withered Fig Leaf (Tuesday)`, `Disciples' Astonishment` | Jeremiah 8:13 |
| John | Talk | `Jesus's Teaching on Faith`, `Disciples' Astonishment` | Zechariah 4:6–7 |
| Nathan (Gardener) | Talk | `Healthy Fig Leaf (Monday)` | Micah 7:1 |
| Local Traveler | Talk | — | Psalm 33:8–9 |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Withered Fig Leaf (Tuesday)` + `Disciples' Astonishment` | Link | **Identified as Witness** for Peter | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Healthy Fig Leaf (Monday)` → Micah 7:1 | Dialogue: Nathan (Gardener) |
| `Withered Fig Leaf (Tuesday)` → Jeremiah 8:13 | Dialogue: Peter |
| `Disciples' Astonishment` → Psalm 33:8–9 | Dialogue: Local Traveler |
| `Jesus's Teaching on Faith` → Zechariah 4:6–7 | Dialogue: John |
 
---

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
    *   `Priestly Vestments`
    *   `Sketch of Vineyard Parable`
    *   `Rejected Cornerstone Fragment`
    *   `Denarius of Tiberius Caesar`
    *   `Withered Fig Leaf`
    *   `Two Leptons (Widow's Mites)`
    *   `Temple Bystander's Written Account`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Caiaphas | Talk | `Priestly Vestments`, `Rejected Cornerstone Fragment` |
| Caiaphas | Talk | `Denarius of Tiberius Caesar`, `Two Leptons (Widow's Mites)` |
| Samuel (Scribe) | Talk | `Sketch of Vineyard Parable`, `Temple Bystander's Written Account` |
| Nathanael (Pharisee) | Talk | — |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Sketch of Vineyard Parable` + `Rejected Cornerstone Fragment` | Link | **Implicated by Parable** for Caiaphas | Psalm 118:22–23 | +15 | — | — |
| `Priestly Vestments` + `Temple Bystander's Written Account` | Compare | **Identified as Witness** for Samuel | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Rejected Cornerstone Fragment` → Psalm 118:22–23 | Lab: `Sketch of Vineyard Parable` + `Rejected Cornerstone Fragment` |
| `Sketch of Vineyard Parable` → Isaiah 5:1–7 | Dialogue: Samuel (Scribe) |
| `Priestly Vestments` → Daniel 7:13–14 | Dialogue: Caiaphas |
| `question_scroll` → Malachi 3:1 | Dialogue: Caiaphas |
 
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
    *   `Lazarus's Grave Cloth`
    *   `Report to Caiaphas`
    *   `Sanhedrin Meeting Scroll`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Maluch (Temple Spy) | Talk | `Report to Caiaphas` |
| Maluch (Temple Spy) | Talk | `Lazarus's Grave Cloth` |
| Annas (High Priest Emeritus) | Talk | `Sanhedrin Meeting Scroll` |
| Martha (Sister of Lazarus) | Talk | `grave_dirt` | Isaiah 25:8 |
| Nicodemus | Talk | — |
| Simon the Leper | Talk | — |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Report to Caiaphas` + `Sanhedrin Meeting Scroll` | Link | **Implicated in Conspiracy** for Caiaphas | — | +15 | — | — |
| `grave_dirt` + `Sanhedrin Meeting Scroll` | Link | **Cleared** Nicodemus (Shows he was a dissenting voice) | — | +15 | — | — |

...
#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Lazarus's Grave Cloth` → Isaiah 25:8 | Dialogue: Martha |
 
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
    *   `Sketch of Temple Stones`
    *   `Notes on Cosmic Signs`
    *   `Disciples' Questions`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `Disciples' Questions` | |
| John | Talk | `Sketch of Temple Stones`, `Notes on Cosmic Signs` | Isaiah 13:10 |
| Thomas | Talk | `parable_of_virgins_notes`, `cosmic_signs_references` |
| Andrew | Talk | — |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Sketch of Temple Stones` + `Disciples' Questions` | Link | **Identified as Primary Witness** for Peter | Daniel 9:27 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Disciples' Questions` → Daniel 9:27 | Lab: `Sketch of Temple Stones` + `Disciples' Questions` |
| `Notes on Cosmic Signs` → Joel 2:30-31 | Dialogue: Thomas |
| `Notes on Cosmic Signs` → Isaiah 13:10 | Dialogue: John |
 
---

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
*   **Prophecies:** Exodus 12:1–14, Jeremiah 31:31–34, Psalm 41:9, Zechariah 11:12–13, Isaiah 53:12

*   **Evidence:**
    *   `Broken Wine Cup`
    *   `Spilled Water Basin`
    *   `Dipped Bread Fragment`
    *   `Passover Lamb Bone`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| John Mark | Talk | `Broken Wine Cup` | Jeremiah 31:31–34 |
| Rhoda | Talk | `Spilled Water Basin`, `Passover Lamb Bone`, `Dipped Bread Fragment` | Exodus 12:1–14 |
| Judas Iscariot | Talk | `Dipped Bread Fragment` |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Broken Wine Cup` + `Dipped Bread Fragment` | Link | **Implicated by Prophecy** for Judas Iscariot | Psalm 41:9 | +15 | — | — |
| `Spilled Water Basin` + `Dipped Bread Fragment` | Link | **Witness to Haste** for Rhoda | — | +15 | — | — |
| `Broken Wine Cup` + `Spilled Water Basin` | Compare | **Witness to Agitation** for John Mark | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Broken Wine Cup` → Jeremiah 31:31–34 | Dialogue: John Mark |
| `Dipped Bread Fragment` → Psalm 41:9 | Lab: `Broken Wine Cup` + `Dipped Bread Fragment` |
| `Passover Lamb Bone` → Exodus 12:1–14 | Dialogue: Rhoda |
| `Money Bag Impression` → Zechariah 11:12–13 | Lab: betrayal evidence (thirty pieces of silver) |
| `Dipped Bread Fragment` → Isaiah 53:12 | Not explicitly linked in Lab/People tables |
 
### Case: `gethsemane_arrest` (The Severed Ear)
*   **Title:** The Severed Ear
*   **Characters:**
    *   Malchus (High Priest's Assistant) ([`../story/act3/case_b_severed_ear/malchus.ink`](../story/act3/case_b_severed_ear/malchus.ink)) ([`../characters/malchus.json`](../characters/malchus.json))
    *   Simon Peter (Disciple) ([`../story/act3/case_b_severed_ear/peter_defense.ink`](../story/act3/case_b_severed_ear/peter_defense.ink)) ([`../characters/peter.json`](../characters/peter.json))
    *   Roman Soldier ([`../story/act3/case_b_severed_ear/guard_report_gethsemane.json`](../story/act3/case_b_severed_ear/guard_report_gethsemane.json)) ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
*   **Suspects:**
    *   Malchus ([`../characters/malchus.json`](../characters/malchus.json))
    *   No One ()
*   **Culprit:** **No One**. The event was a scuffle during the arrest, immediately resolved by Jesus.
*   **Prophecies:** Isaiah 53:7, Zechariah 13:7

*   **Evidence:**
    *   `Bloody Linen Swab`
    *   `Disciple's Sword`
    *   `Scattered Disciples' Cloaks`
    *   `Extinguished Roman Torch`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Malchus | Talk | `Bloody Linen Swab` | Isaiah 53:7 |
| Simon Peter | Talk | `Disciple's Sword` |
| Roman Soldier | Talk | `Extinguished Roman Torch` |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Bloody Linen Swab` + `Disciple's Sword` | Link | **Identified as Victim** for Malchus | — | +15 | — | — |
| `Disciple's Sword` + `Extinguished Roman Torch` | Link | **Implicated as Assailant** for Simon Peter | Zechariah 13:7 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Disciple's Sword` → Isaiah 53:7 | Dialogue: Malchus |
| `Scattered Disciples' Cloaks` → Zechariah 13:7 | Lab: `Disciple's Sword` + `Extinguished Roman Torch` |
 
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
*   **Prophecies:** Isaiah 50:6, Micah 5:1, Psalm 27:12, Psalm 35:11

*   **Evidence:**
    *   `Torn High Priestly Robe`
    *   `Conflicting Depositions`
    *   `Courtyard Rooster Feather`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Caiaphas | Talk | `Torn High Priestly Robe` | |
| Peter | Talk | `Courtyard Rooster Feather` | |
| Ananias | Talk | `Conflicting Depositions` |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Torn High Priestly Robe` + `Conflicting Depositions` | Link | **Implicated by Action** for Caiaphas | Isaiah 50:6 & Micah 5:1 | +15 | — | — |
| `Conflicting Depositions` + `Torn High Priestly Robe` | Compare | **Discredited** Ananias | Psalm 27:12 & Psalm 35:11 | +15 | — | — |
| `Courtyard Rooster Feather` + `Torn High Priestly Robe` | Compare | **Motive Established** for Peter (Fear, not conspiracy) | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Torn High Priestly Robe` → Isaiah 50:6 & Micah 5:1 | Lab: `Torn High Priestly Robe` + `Conflicting Depositions` |
| `Conflicting Depositions` → Psalm 27:12 & Psalm 35:11 | Lab: `Conflicting Depositions` + `Torn High Priestly Robe` |
 
### Case: `barabbas_choice` (The People's Choice)
*   **Title:** The People's Choice
*   **Characters:**
    *   Pontius Pilate (Roman Prefect) ([`../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.ink`](../story/act3/case_d_roman_interrogation/pontius_pilate_barabbas.ink)) ([`../characters/pontius_pilate.json`](../characters/pontius_pilate.json))
    *   Barabbas (Released Criminal) ([`../story/act3/case_d_roman_interrogation/barabbas_choice.ink`](../story/act3/case_d_roman_interrogation/barabbas_choice.ink)) ([`../characters/barabbas.json`](../characters/barabbas.json))
*   **Suspects:**
    *   Barabbas ([`../characters/barabbas.json`](../characters/barabbas.json))
    *   No One ()
*   **Culprit:** **No One**. The "crime" was the crowd's choice, manipulated by the priests.
*   **Prophecies:** Isaiah 53:3, Psalm 2:1–2

*   **Evidence:**
    *   `Pilate's Wash Basin`
    *   `Broken Prison Shackles`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Pontius Pilate | Talk | `Pilate's Wash Basin` | |
| Barabbas | Talk | `Broken Prison Shackles`, `Pilate's Written Judgment` |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Broken Prison Shackles` + `Pilate's Wash Basin` | Link | **Cleared** Barabbas (Beneficiary, not cause) | Isaiah 53:3 | +15 | — | — |
| `Pilate's Wash Basin` + `Broken Prison Shackles` | Link | **Has Alibi** for Pontius Pilate (Publicly washed hands) | — | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Broken Prison Shackles` → Isaiah 53:3 | Lab: `Broken Prison Shackles` + `Pilate's Wash Basin` |
| `Broken Prison Shackles` → Psalm 2:1–2 | Not explicitly linked in Lab/People tables |
 
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
*   **Prophecies:** Psalm 22:16-18, Amos 8:9, Isaiah 53:9, Zechariah 12:10, Psalm 34:20, Psalm 31:5

*   **Evidence:**
    *   `Soldier's Gambling Dice`
    *   `Torn Temple Veil Fragment`
    *   `Fine Linen Burial Cloth`
    *   `Centurion's Spear`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Centurion Longinus | Talk | `Soldier's Gambling Dice`, `Centurion's Spear` | Psalm 34:20 |
| Pashhur | Talk | `Torn Temple Veil Fragment` | |
| Joseph of Arimathea | Talk | `Fine Linen Burial Cloth` |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Soldier's Gambling Dice` + `Centurion's Spear` | Link | **Motive Questioned** for Centurion Longinus | Psalm 22:16–18 | +15 | — | — |
| `Torn Temple Veil Fragment` + `Soldier's Gambling Dice` | Compare | **Identified as Witness** for Pashhur | Amos 8:9 | +15 | — | — |
| `Fine Linen Burial Cloth` + `Centurion's Spear` | Link | **Motive Clarified** for Joseph of Arimathea | Isaiah 53:9 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Soldier's Gambling Dice` → Psalm 22:16–18 | Lab: `Soldier's Gambling Dice` + `Centurion's Spear` |
| `Torn Temple Veil Fragment` → Amos 8:9 | Lab: `Torn Temple Veil Fragment` + `Soldier's Gambling Dice` |
| `Fine Linen Burial Cloth` → Isaiah 53:9 | Lab: `Fine Linen Burial Cloth` + `Centurion's Spear` |
| `Centurion's Spear` → Psalm 34:20 | Dialogue: Centurion Longinus |
| `Centurion's Spear` → Zechariah 12:10 | Lab: `Centurion's Spear` (pierced side) |
| `Centurion's Spear` → Psalm 31:5 | Not explicitly linked in Lab/People tables |
 
---

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
*   **Prophecies:** Psalm 16:10, Hosea 6:2, Jonah 1:17 / Matthew 12:40, Isaiah 53:10–11, Psalm 22:1–31, Isaiah 26:19

*   **Evidence:**
    *   `Folded Grave Clothes`
    *   `Roman Seal Fragment`
    *   `Empty Spice Jars`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Mary Magdalene | Talk | `Folded Grave Clothes` | Psalm 16:10 |
| Marcus | Talk | `Roman Seal Fragment`, `Displaced Tomb Stone` | Hosea 6:2 |
| Joseph of Arimathea | Talk | `Empty Spice Jars` | Isaiah 53:10–11 |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Folded Grave Clothes` + `Empty Spice Jars` | Link | **Identified as Witness** for Mary Magdalene | Psalm 16:10 | +15 | — | — |
| `Roman Seal Fragment` + `Folded Grave Clothes` | Compare | **Implicated in Failure** for Marcus | Hosea 6:2 & Jonah 1:17 | +15 | — | — |
| `Empty Spice Jars` + `Roman Seal Fragment` | Link | **Cleared** Joseph of Arimathea | Isaiah 53:10–11 | +15 | — | — |
| `Displaced Tomb Stone` + `Roman Guard Report` | Compare | **Supernatural Event Confirmed** | Psalm 16:10 | +15 | — | — |
| `Empty Burial Chamber` + `Folded Grave Clothes` | Compare | **Theft Ruled Out** | Psalm 16:10 | +15 | — | — |
| `Angelic Proclamation` + `Mary Magdalene's Testimony` | Compare | **Witness Convergence** | Isaiah 53:10–11 | +15 | — | — |
| `Mary Magdalene's Testimony` + `Roman Guard Report` | Contradict | **Independent Accounts** | Jonah 1:17 / Matthew 12:40 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Folded Grave Clothes` → Psalm 16:10 | Lab: `Folded Grave Clothes` + `Empty Spice Jars` |
| `Roman Seal Fragment` → Hosea 6:2 & Jonah 1:17 | Lab: `Roman Seal Fragment` + `Folded Grave Clothes` |
| `Empty Spice Jars` → Isaiah 53:10–11 | Lab: `Empty Spice Jars` + `Roman Seal Fragment` |
| `The Empty Burial Chamber` → Psalm 22:1–31 | Codex: `The Empty Burial Chamber` (cry of abandonment opens, resurrection closes the psalm) |
| `The Displaced Sealing Stone` → Isaiah 26:19 | Lab: `The Displaced Sealing Stone` (the dead rise and shout for joy) |
 
### Case: `roman_inquiry` (The Guard's Report)
*   **Title:** The Guard's Report
*   **Characters:**
    *   Lucas (Tomb Guard Sentry) ([`../story/act4/case_b_guards_report/sentry_lucas.ink`](../story/act4/case_b_guards_report/sentry_lucas.ink)) ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   Caiaphas (High Priest) ([`../story/act4/case_b_guards_report/caiaphas_roman_inquiry.ink`](../story/act4/case_b_guards_report/caiaphas_roman_inquiry.ink)) ([`../characters/caiaphas.json`](../characters/caiaphas.json))
    *   Pilate's Secretary ([`../story/act3/case_d_roman_interrogation/pilates_secretary.ink`](../story/act3/case_d_roman_interrogation/pilates_secretary.ink)) ([`../characters/pilate_secretary.json`](../characters/pilate_secretary.json))
*   **Suspects:**
    *   Lucas ([`../characters/garrison_guard.json`](../characters/garrison_guard.json))
    *   No One ()
*   **Culprit:** **No One**. The crime was the cover-up conspiracy orchestrated by the Sanhedrin.
*   **Prophecies:** Psalm 2:1–2

*   **Evidence:**
    *   `High-Grade Sanctuary Coins`
    *   `Official Sanhedrin Report`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Lucas | Talk | `High-Grade Sanctuary Coins` | Psalm 2:1–2 |
| Caiaphas | Talk | `Official Sanhedrin Report`, `Priests' Alibi Scroll` | Psalm 2:1–2 |
| Pilate's Secretary | Talk | — | Psalm 2:1–2 |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `High-Grade Sanctuary Coins` + `Official Sanhedrin Report` | Link | **Implicated in Bribery** for Lucas | Psalm 2:1–2 | +15 | — | — |
| `Official Sanhedrin Report` + `High-Grade Sanctuary Coins` | Link | **Implicated in Conspiracy** for Caiaphas | Psalm 2:1–2 | +15 | — | — |
| `Broken Imperial Seal` + `Shattered Spear Shaft` | Link | **Physical Damage Confirmed** | Psalm 2:1–2 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `High-Grade Sanctuary Coins` → Psalm 2:1–2 | Lab: `High-Grade Sanctuary Coins` + `Official Sanhedrin Report` |
 
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
*   **Prophecies:** Zechariah 13:7 & Ezekiel 34:11-16

*   **Evidence:**
    *   `Charcoal Fire Remnants`
    *   `Wound-Touching Testimony`

#### People

| Character | Action | Unlocks | Reveals Prophecy |
|---|---|---|---|
| Peter | Talk | `Charcoal Fire Remnants` | Zechariah 13:7 |
| Thomas | Talk | `Wound-Touching Testimony`, `Charcoal Fire Remnants` | Zechariah 13:7 |
| Mary Magdalene | Talk | `Wound-Touching Testimony` | Ezekiel 34:11-16 |
| Nathanael | Talk | — | Ezekiel 34:11-16 |

#### Lab

| Evidence Pair | Operation | Result | Prophecy Revealed | Points | Reputation | Doubt |
|---|---|---|---|---|---|---|
| `Charcoal Fire Remnants` + `Wound-Touching Testimony` | Compare | **Motive Clarified** for Peter | Zechariah 13:7 & Ezekiel 34:11-16 | +15 | — | — |
| `Wound-Touching Testimony` + `Charcoal Fire Remnants` | Link | **Identified as Witness** for Thomas | Zechariah 13:7 & Ezekiel 34:11-16 | +15 | — | — |
| `Miraculous Catch` + `Threefold Commission` | Timeline | **Restoration Pattern** | Ezekiel 34:11-16 | +15 | — | — |
| `Risen Appearance` + `Bread Breakfast` | Compare | **Physical Resurrection Confirmed** | Ezekiel 34:11-16 | +15 | — | — |

#### Codex
| Evidence + Prophecy = Unlock | Source of Information |
|---|---|
| `Charcoal Fire Remnants` → Zechariah 13:7 & Ezekiel 34:11-16 | Lab: `Charcoal Fire Remnants` + `Wound-Touching Testimony` |
| `Wound-Touching Testimony` → Zechariah 13:7 & Ezekiel 34:11-16 | Dialogue: Mary Magdalene |
 
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
