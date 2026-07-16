# Miracle Maker - Source of Truth

**Note on Suspects:** All characters involved in a case are considered potential suspects from the start. The final list of accusable suspects is fully unlocked once all prophecies for that case have been discovered.

This document serves as the canonical source of truth for the game's narrative structure, characters, and case resolutions for both mobile and desktop versions. It is generated from the `act*.js` case files.

## Gsames

Currently 3 versions all using a core gameplay 
*  /mobileA/
*  /mobileB/
*  /desktop/

## Linked Documentation

*   **Holy Week Chronology (holy_week_chronology.md):** The master timeline of events, locations, prophecies, and historical context.
*   **Character Profiles: (character_profiles_expanded.md):**  In-depth linguistic and psychological profiles for all major characters.
*   **Prophecy Guide (prophecies.md):** A detailed breakdown of all prophecies, their fulfillment, and which characters reference them.§
*   **System Architecture (CONFIG.md):** Technical documentation for the game's configuration and engine systems.
*   **Trigger & NPC System:** Design pattern for binding Blender objects to game logic.


## Scoring System

The player's performance in each case is evaluated based on a comprehensive scoring system designed to reward thorough investigation and careful deduction. The final score for a case is calculated when the player submits an accusation.

The score is composed of the following elements:

### Score
*   **Correct Accusation:** `+50 points`
    *   Awarded for correctly identifying the culprit (or 'No One' if it was a prophetic act). An incorrect accusation results in a `-25 point` penalty.
*   **Lab Deductions:** `+15 points` per deduction
    *   Awarded for successfully analyzing evidence in the Lab to reveal its implication on a suspect (e.g., clearing them, implicating them, or identifying them as a witness).
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

### Doubt

Doubt is a global penalty meter that accumulates across all cases. It measures how many missteps the investigator has made.

*   **Starting Value:** `0`
*   **Minimum Value:** `0` (cannot go negative)
*   **Penalty Calculation:** The player's final case score is reduced by `Doubt × 2` points.
*   **Accrual Triggers:**
    *   **Failed Challenge:** `+10 doubt`
        *   Awarded when the player incorrectly pairs two pieces of evidence during an NPC challenge and no contradiction is found.
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
    *   Peter (Disciple) (`../story/act1/case_a_missing_donkey/peter_donkey.ink`) (`../characters/peter.json`)
    *   John (Disciple) (`../story/act1/case_a_missing_donkey/john_donkey.ink`) (`../characters/john_apostle.json`)
    *   Tobias (Donkey Owner) (`../story/act1/case_a_missing_donkey/galilean_pilgrim.ink`) (`../characters/tobias_owner.json`)
    *   Jemimah (Local Skeptic) (`../story/act1/case_a_missing_donkey/jerusalem_local.ink`) (`../characters/jemimah.json`)
    *   Eleazar (Sadducean Aristocrat) (`../story/act1/case_a_missing_donkey/eleazar_sadducee.ink`) (`../characters/eleazar.json`)
*   **Suspects:**
    *   Peter (`../characters/peter.json`)
    *   John (`../characters/john_apostle.json`)
    *   Tobias (Owner) (`../characters/tobias_owner.json`)
    *   Local Villager (`../characters/local_villager.json`)
    *   Pharisee (`../characters/simon_pharisee.json`)
    *   Jemimah (Local Skeptic) (`../characters/jemimah.json`)
    *   No One (`../characters/no_one.json`)
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

| Character | Unlocks Evidence |
|---|---|
| Peter | `Two Disciples' Cloaks`, `Cut Rope at the Tethering Post` |
| John | `Fresh Hoofprints`, `Pharisee's Written Complaint`, `Villager's Testimony` |
| Tobias | `Zechariah Scroll`, `Fresh-Cut Palm Branch` |
| Jemimah | |
| Eleazar | |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `cloaks` | Peter | **Motive Clarified** (Acted on instruction, not as a thief) |
| `prophecy_scroll` | Tobias | **Cleared** (Confirmed he willingly lent the colt) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Zechariah Scroll` | `Triumphal Entry Prophecy (Zechariah 9:9)` |
| `Crowd's Palm Branches` | `Hosanna Prophecy (Psalm 118:25-26)` |
| `Two Disciples' Cloaks` | `Judah's Scepter Prophecy (Genesis 49:10-11)` |
| `Pharisee's Complaint` | `Sudden Temple Arrival Prophecy (Malachi 3:1)` |

### Case: `temple_cleansing` (The Overturned Tables)
*   **Title:** The Overturned Tables
*   **Characters:**
    *   Malachi (Money Changer) (`../story/act1/case_b_overturned_tables/money_changer.ink`) (`../characters/malachi_moneychanger.json`)
    *   Marcus (Garrison Guard) (`../story/act1/case_b_overturned_tables/guard_report.ink`) (`../characters/garrison_guard.json`)
    *   Jadan of Bethphage (Temple Dove Vendor) (`../characters/displaced_merchant.json`)
*   **Suspects:**
    *   Jadan of Bethphage (`../characters/displaced_merchant.json`)
    *   No One (`../characters/no_one.json`)
*   **Culprit:** **No One**. The event was a prophetic act of judgment by Jesus.
*   **Prophecies:** Malachi 3:1, Isaiah 56:7, Psalm 69:9

*   **Evidence:**
    *   `Scattered Shekels`
    *   `Roman Standard`
    *   `Shattered Dove Cages`
    *   `Disciples' Testimony`
    *   `Whip of Cords`

#### People

| Character | Unlocks Evidence |
|---|---|
| Malachi (Money Changer) | `Scattered Shekels` |
| Marcus (Garrison Guard) | `Roman Standard` |
| Jadan of Bethphage (Temple Dove Vendor) | `Shattered Dove Cages` |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `scattered_shekels` | Malachi | **Identified as Victim** (Business was disrupted) |
| `broken_cages` | Jadan of Bethphage | **Identified as Victim** (Wares were destroyed) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Shattered Dove Cages` | `House of Prayer Prophecy (Isaiah 56:7)` |
| `Scattered Shekels` | `Refiner's Fire Prophecy (Malachi 3:1)` |
| `Disciples' Testimony` | `Zeal for Your House Prophecy (Psalm 69:9)` |

### Case: `fig_tree_incident` (The Barren Fig Tree)
*   **Title:** The Barren Fig Tree
*   **Characters:**
    *   Peter (Disciple) (`../story/act1/case_c_barren_fig_tree/peter_fig_tree.ink`) (`../characters/peter.json`)
    *   John (Disciple) (`../story/act1/case_c_barren_fig_tree/john_fig_tree.ink`) (`../characters/john_apostle.json`)
    *   Nathan (Gardener) (`../story/act1/case_c_barren_fig_tree/nathan_fig_tree.ink`) (`../characters/nathan_gardener.json`)
    *   Local Traveler (`../story/act1/case_c_barren_fig_tree/local_traveler.ink`) (`../characters/local_traveler.json`)
*   **Suspects:**
    *   Peter (`../characters/peter.json`)
    *   No One (`../characters/no_one.json`)
*   **Culprit:** **No One**. The event was a prophetic act by Jesus.
*   **Prophecies:** Micah 7:1, Jeremiah 8:13, Psalm 33:8–9, Zechariah 4:6–7

*   **Evidence:**
    *   `Withered Fig Leaf (Tuesday)`
    *   `Healthy Fig Leaf (Monday)`
    *   `Jesus's Teaching on Faith`
    *   `Disciples' Astonishment`

#### People

| Character | Unlocks Evidence |
|---|---|
| Peter | `Withered Fig Leaf (Tuesday)` |
| John | |
| Nathan (Gardener) | `Healthy Fig Leaf (Monday)` |
| Local Traveler | |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `withered_fig_tree_state` | Peter | **Identified as Witness** (Observed the event, did not cause it) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Withered Fig Leaf (Tuesday)` | `Withered Leaves Prophecy (Jeremiah 8:13)` |
| `Healthy Fig Leaf (Monday)` | `No Early Fig Prophecy (Micah 7:1)` |
| `Jesus's Teaching on Faith` | `Mountain-Moving Faith Prophecy (Zechariah 4:6-7)` |
| `Disciples' Astonishment` | `Spoken Word Authority Prophecy (Psalm 33:8-9)` |

---

## Act II: The Teacher

### Case: `authority_challenged` (The Silenced Teacher)
*   **Title:** The Silenced Teacher
*   **Characters:**
    *   Caiaphas (High Priest) (`../story/act2/case_a_silenced_teacher/chief_priest.ink`) (`../characters/caiaphas.json`)
    *   Samuel (Scribe) (`../story/act2/case_a_silenced_teacher/scribe_intro.ink`) (`../characters/samuel_scribe.json`)
    *   Nathanael (Pharisee) (`../story/act2/case_a_silenced_teacher/pharisee_critique.ink`) (`../characters/nathanael_pharisee.json`)
*   **Suspects:**
    *   Caiaphas (`../characters/caiaphas.json`)
    *   Samuel (`../characters/samuel_scribe.json`)
    *   Nathanael (`../characters/nathanael_pharisee.json`)
    *   No One (`../characters/no_one.json`)
*   **Culprit:** **Caiaphas**. He orchestrated the challenges to protect institutional authority.
*   **Prophecies:** Psalm 118:22–23, Isaiah 5:1–7, Daniel 7:13–14

*   **Evidence:**
    *   `Priestly Vestments`
    *   `Sketch of Vineyard Parable`
    *   `Rejected Cornerstone Fragment`
    *   `Denarius of Tiberius Caesar`
    *   `Withered Fig Leaf`
    *   `Two Leptons (Widow's Mites)`
    *   `Temple Bystander's Written Account`

#### People

| Character | Unlocks Evidence |
|---|---|
| Caiaphas | `Priestly Vestments` |
| Samuel (Scribe) | `Sketch of Vineyard Parable` |
| Nathanael (Pharisee) | |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `parable_fragments` | Samuel (Scribe) | **Identified as Witness** (His record implicates the priests) |
| `question_scroll` | Caiaphas | **Implicated by Parable** (The teaching was aimed at him) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Sketch of Vineyard Parable` | `Rejected Cornerstone Prophecy (Psalm 118:22-23)` |
| `Sketch of Vineyard Parable` | `Song of the Vineyard Prophecy (Isaiah 5:1-7)` |
| `Priestly Vestments` | `Son of Man Authority Prophecy (Daniel 7:13-14)` |

### Case: `lazarus_plot` (The Price of Life)
*   **Title:** The Price of Life
*   **Characters:**
    *   Maluch (Temple Spy) (`../story/act2/case_b_lazarus_plot/temple_spy.ink`) (`../characters/maluch.json`)
    *   Annas (High Priest Emeritus) (`../story/act2/case_b_lazarus_plot/annas_patriarch.ink`) (`../characters/annas.json`)
    *   Martha (Sister of Lazarus) (`../story/act2/case_b_lazarus_plot/martha_bethany.ink`) (`../characters/martha.json`)
    *   Nicodemus (Conflicted Pharisee) (`../story/act2/case_b_lazarus_plot/nicodemus_conflicted.ink`) (`../characters/nicodemus.json`)
    *   Simon the Leper (Healed Host) (`../story/act2/case_b_lazarus_plot/simon_leper.ink`) (`../characters/simon_leper.json`)
*   **Suspects:**
    *   Nicodemus (`../characters/nicodemus.json`)
    *   Caiaphas (`../characters/caiaphas.json`)
*   **Culprit:** **Caiaphas**. He authorized the plot to eliminate Lazarus to contain the political fallout of the miracle.
*   **Prophecies:** Isaiah 25:8

*   **Evidence:**
    *   `Lazarus's Grave Cloth`
    *   `Report to Caiaphas`
    *   `Sanhedrin Meeting Scroll`

#### People

| Character | Unlocks Evidence |
|---|---|
| Maluch (Temple Spy) | `Report to Caiaphas` |
| Annas (High Priest Emeritus) | |
| Martha (Sister of Lazarus) | `Lazarus's Grave Cloth` |
| Nicodemus (Conflicted Pharisee) | `Sanhedrin Meeting Scroll` |
| Simon the Leper (Healed Host) | |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `Report to Caiaphas` | Caiaphas | **Implicated in Conspiracy** (Directly links him to the plot) |
| `secret_decree` | Nicodemus | **Cleared** (Shows he was a dissenting voice) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Lazarus's Grave Cloth` | `Swallow Up Death Prophecy (Isaiah 25:8)` |

### Case: `olivet_discourse` (The End of the Age)
*   **Title:** The End of the Age
*   **Characters:**
    *   Peter (Disciple) (`../story/act2/case_c_olivet_discourse/peter_defense.ink`) (`../characters/peter.json`)
    *   John (Disciple) (`../story/act2/case_c_olivet_discourse/john_disciple.ink`) (`../characters/john_apostle.json`)
    *   Thomas (Disciple) (`../story/act2/case_c_olivet_discourse/parable_meaning.ink`) (`../characters/thomas.json`)
    *   Andrew (Disciple) (`../story/act2/case_c_olivet_discourse/andrew_olivet.ink`) (`../characters/andrew_disciple.json`)
*   **Suspects:**
    *   No One (`../characters/no_one.json`)
*   **Culprit:** **No One**. This is a teaching event, not a crime.
*   **Prophecies:** Daniel 9:27, Joel 2:30-31, Isaiah 13:10

*   **Evidence:**
    *   `Sketch of Temple Stones`
    *   `Notes on Cosmic Signs`
    *   `Disciples' Questions`

#### People

| Character | Unlocks Evidence |
|---|---|
| Peter | `Sketch of Temple Stones` |
| John | `Notes on Cosmic Signs` |
| Thomas | |
| Andrew | |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `Sketch of Temple Stones` | Peter | **Identified as Primary Witness** (He asked the initial question about the Temple's destruction) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Sketch of Temple Stones` | `Abomination of Desolation Prophecy (Daniel 9:27)` |
| `Notes on Cosmic Signs` | `Sun and Moon Darkened Prophecy (Joel 2:30-31)` |
| `Disciples' Questions` | `Stars of Heaven Prophecy (Isaiah 13:10)` |

---

## Act III: The Pressure Builds

### Case: `last_supper` (The Broken Cup)
*   **Title:** The Broken Cup
*   **Characters:**
    *   John Mark (Son of the House Owner) (`../story/act3/case_a_last_supper/john_disciple.ink`) (`../characters/john_mark.json`)
    *   Rhoda (Household Servant) (`../story/act3/case_a_last_supper/rhoda_servant.ink`) (`../characters/rhoda.json`)
    *   Judas Iscariot (Disciple) (`../story/act3/case_a_last_supper/judas_iscariot.ink`) (`../characters/judas.json`)
*   **Suspects:**
    *   John Mark (`../characters/john_mark.json`)
    *   Rhoda (`../characters/rhoda.json`)
    *   Judas Iscariot (`../characters/judas.json`)
*   **Culprit:** **Judas Iscariot**. His agitation and haste led to the broken items as he prepared for his betrayal.
*   **Prophecies:** Exodus 12:1–14, Jeremiah 31:31–34, Psalm 41:9

*   **Evidence:**
    *   `Broken Wine Cup`
    *   `Spilled Water Basin`
    *   `Dipped Bread Fragment`
    *   `Passover Lamb Bone`

#### People

| Character | Unlocks Evidence |
|---|---|
| John Mark | `Broken Wine Cup` |
| Rhoda (Household Servant) | `Spilled Water Basin` |
| Judas Iscariot | `Dipped Bread Fragment` |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `cup_fragments` | John Mark | **Witness to Agitation** (Observed the event, but did not cause it) |
| `water_jug` | Rhoda | **Witness to Haste** (Saw someone leaving in a hurry) |
| `betrayal_dipped_bread` | Judas Iscariot | **Implicated by Prophecy** (Links him to the betrayal) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Broken Wine Cup` | `New Covenant Prophecy (Jeremiah 31:31-34)` |
| `Dipped Bread Fragment` | `Betrayal by a Friend Prophecy (Psalm 41:9)` |
| `Passover Lamb Bone` | `Passover Lamb Prophecy (Exodus 12:1-14)` |

### Case: `gethsemane_arrest` (The Severed Ear)
*   **Title:** The Severed Ear
*   **Characters:**
    *   Malchus (High Priest's Assistant) (`../story/act3/case_b_severed_ear/malchus.ink`) (`../characters/malchus.json`)
    *   Simon Peter (Disciple) (`../story/act3/case_b_severed_ear/peter_defense.ink`) (`../characters/peter.json`)
    *   Roman Soldier (`../story/act3/case_b_severed_ear/guard_report.ink`) (`../characters/garrison_guard.json`)
*   **Suspects:**
    *   Malchus (`../characters/malchus.json`)
    *   No One (`../characters/no_one.json`)
*   **Culprit:** **No One**. The event was a scuffle during the arrest, immediately resolved by Jesus.
*   **Prophecies:** Isaiah 53:7, Zechariah 13:7

*   **Evidence:**
    *   `Bloody Linen Swab`
    *   `Disciple's Sword`
    *   `Scattered Disciples' Cloaks`
    *   `Extinguished Roman Torch`

#### People

| Character | Unlocks Evidence |
|---|---|
| Malchus (High Priest's Assistant) | `Bloody Linen Swab` |
| Simon Peter (Disciple) | `Disciple's Sword` |
| Roman Soldier | |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `severed_ear_wrap` | Malchus | **Identified as Victim** (He was healed, not an aggressor) |
| `abandoned_linen` | Simon Peter | **Implicated as Assailant** (He drew the sword) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Disciple's Sword` | `Silent Lamb Prophecy (Isaiah 53:7)` |
| `Scattered Disciples' Cloaks` | `Strike the Shepherd Prophecy (Zechariah 13:7)` |

### Case: `sanhedrin_trial` (The Midnight Tribunal)
*   **Title:** The Midnight Tribunal
*   **Characters:**
    *   Caiaphas (High Priest) (`../story/act3/case_c_sanhedrin_trial/caiaphas_priest.ink`) (`../characters/caiaphas.json`)
    *   Peter (Denying Disciple) (`../story/act3/case_c_sanhedrin_trial/peter_denial.ink`) (`../characters/peter.json`)
    *   Ananias (False Witness) (`../story/act3/case_c_sanhedrin_trial/false_witness.ink`) (`../characters/ananias_witness.json`)
*   **Suspects:**
    *   Caiaphas (`../characters/caiaphas.json`)
    *   Ananias (`../characters/ananias_witness.json`)
    *   Peter (`../characters/peter.json`)
    *   No One (`../characters/no_one.json`)
*   **Culprit:** **Caiaphas**. He orchestrated the illegal trial to secure a blasphemy charge.
*   **Prophecies:** Isaiah 50:6, Micah 5:1, Psalm 27:12, Psalm 35:11

*   **Evidence:**
    *   `Torn High Priestly Robe`
    *   `Conflicting Depositions`
    *   `Courtyard Rooster Feather`

#### People

| Character | Unlocks Evidence |
|---|---|
| Caiaphas (High Priest) | `Torn High Priestly Robe` |
| Peter (Denying Disciple) | `Courtyard Rooster Feather` |
| Ananias (False Witness) | `Conflicting Depositions` |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `torn_robe` | Caiaphas | **Implicated by Action** (His own gesture reveals his orchestration) |
| `false_scroll` | Ananias | **Discredited** (Revealed as a false witness) |
| `rooster_feather` | Peter | **Motive Established** (Fear and denial, not conspiracy) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Torn High Priestly Robe` | `Beaten and Mocked Prophecy (Isaiah 50:6)` |
| `Conflicting Depositions` | `False Witnesses Prophecy (Psalm 27:12)` |

### Case: `barabbas_choice` (The People's Choice)
*   **Title:** The People's Choice
*   **Characters:**
    *   Pontius Pilate (Roman Prefect) (`../story/act3/case_d_barabbas_choice/pontius_pilate.ink`) (`../characters/pontius_pilate.json`)
    *   Barabbas (Released Criminal) (`../story/act3/case_d_barabbas_choice/barabbas_insurgent.ink`) (`../characters/barabbas.json`)
*   **Suspects:**
    *   Barabbas (`../characters/barabbas.json`)
    *   No One (`../characters/no_one.json`)
*   **Culprit:** **No One**. The "crime" was the crowd's choice, manipulated by the priests.
*   **Prophecies:** Isaiah 53:3

*   **Evidence:**
    *   `Pilate's Wash Basin`
    *   `Broken Prison Shackles`

#### People

| Character | Unlocks Evidence |
|---|---|
| Pontius Pilate (Roman Prefect) | `Pilate's Wash Basin` |
| Barabbas (Released Criminal) | `Broken Prison Shackles` |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `barabbas_warrant` | Barabbas | **Cleared** (He was the beneficiary, not the cause) |
| `pilates_basin` | Pontius Pilate | **Has Alibi** (Publicly washed his hands of the matter) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Pilate's Wash Basin` | `Despised and Rejected Prophecy (Isaiah 53:3)` |

### Case: `crucifixion_site` (The Final Sacrifice)
*   **Title:** The Final Sacrifice
*   **Characters:**
    *   Centurion Longinus (`../story/act3/case_e_final_sacrifice/roman_assessment.ink`) (`../characters/centurion_longinus.json`)
    *   Pashhur (Temple Priest) (`../story/act3/case_e_final_sacrifice/caiaphas_priest.ink`) (`../characters/pashhur.json`)
    *   Joseph of Arimathea (`../story/act3/case_e_final_sacrifice/joseph_arimathea.ink`) (`../characters/joseph_arimathea.json`)
*   **Suspects:**
    *   Longinus (`../characters/centurion_longinus.json`)
    *   Pashhur (`../characters/pashhur.json`)
    *   Joseph of Arimathea (`../characters/joseph_arimathea.json`)
    *   No One (`../characters/no_one.json`)
*   **Culprit:** **No One**. The event was a divine/cosmic act, not a human crime.
*   **Prophecies:** Psalm 22:16-18, Amos 8:9, Isaiah 53:9, Psalm 34:20

*   **Evidence:**
    *   `Soldier's Gambling Dice`
    *   `Torn Temple Veil Fragment`
    *   `Fine Linen Burial Cloth`
    *   `Centurion's Spear`

#### People

| Character | Unlocks Evidence |
|---|---|
| Centurion Longinus | `Soldier's Gambling Dice` |
| Pashhur (Temple Priest) | `Torn Temple Veil Fragment` |
| Joseph of Arimathea | `Fine Linen Burial Cloth` |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `split_dice` | Centurion Longinus | **Motive Questioned** (Was a participant, not an instigator) |
| `torn_veil_thread` | Pashhur (Priest) | **Identified as Witness** (Witnessed the divine event in the Temple) |
| `linen_shroud_receipt` | Joseph of Arimathea | **Motive Clarified** (Acted out of respect, not conspiracy) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Soldier's Gambling Dice` | `Pierced Hands and Feet Prophecy (Psalm 22:16-18)` |
| `Torn Temple Veil Fragment` | `Midday Darkness Prophecy (Amos 8:9)` |
| `Fine Linen Burial Cloth` | `Grave with the Rich Prophecy (Isaiah 53:9)` |
| `Centurion's Spear` | `Unbroken Bones Prophecy (Psalm 34:20)` |

---

## Act IV: The New Beginning

### Case: `resurrection` (The Empty Tomb)
*   **Title:** The Empty Tomb
*   **Characters:**
    *   Mary Magdalene (First Witness) (`../story/act4/case_a_resurrection/mary_magdalene.ink`) (`../characters/mary_magdalene.json`)
    *   Marcus (Roman Guard) (`../story/act4/case_a_resurrection/execution_soldier.ink`) (`../characters/garrison_guard.json`)
    *   Joseph of Arimathea (Tomb Owner) (`../story/act4/case_a_resurrection/joseph_arimathea.ink`) (`../characters/joseph_arimathea.json`)
*   **Suspects:**
    *   Mary Magdalene (`../characters/mary_magdalene.json`)
    *   Marcus (`../characters/garrison_guard.json`)
    *   Joseph of Arimathea (`../characters/joseph_arimathea.json`)
    *   No One (`../characters/no_one.json`)
*   **Culprit:** **No One**. The resurrection was a supernatural event.
*   **Prophecies:** Psalm 16:10, Hosea 6:2 & Jonah 1:17, Isaiah 53:10–11

*   **Evidence:**
    *   `Folded Grave Clothes`
    *   `Roman Seal Fragment`
    *   `Empty Spice Jars`

#### People

| Character | Unlocks Evidence |
|---|---|
| Mary Magdalene (First Witness) | `Folded Grave Clothes` |
| Marcus (Roman Guard) | `Roman Seal Fragment` |
| Joseph of Arimathea (Tomb Owner) | `Empty Spice Jars` |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `burial_linen` | Mary Magdalene | **Identified as Witness** (Discovered the empty tomb) |
| `rolled_stone` | Marcus (Guard) | **Implicated in Failure** (The seal he guarded was broken) |
| `spice_jars` | Joseph of Arimathea | **Cleared** (His intention was to anoint a body, not hide one) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Folded Grave Clothes` | `Not Abandoned to Sheol Prophecy (Psalm 16:10)` |
| `Roman Seal Fragment` | `Sign of Jonah Prophecy (Jonah 1:17)` |
| `Empty Spice Jars` | `Will See Light Prophecy (Isaiah 53:10-11)` |

### Case: `roman_inquiry` (The Guard's Report)
*   **Title:** The Guard's Report
*   **Characters:**
    *   Lucas (Tomb Guard Sentry) (`../story/act4/case_b_roman_inquiry/garrison_guard.ink`) (`../characters/garrison_guard.json`)
    *   Caiaphas (High Priest) (`../story/act4/case_b_roman_inquiry/caiaphas_priest.ink`) (`../characters/caiaphas.json`)
    *   Pilate's Secretary (`../story/act4/case_b_roman_inquiry/pilate_secretary.ink`) (`../characters/pilate_secretary.json`)
*   **Suspects:**
    *   Lucas (`../characters/garrison_guard.json`)
    *   No One (`../characters/no_one.json`)
*   **Culprit:** **No One**. The crime was the cover-up conspiracy orchestrated by the Sanhedrin.
*   **Prophecies:** Psalm 2:1–2

*   **Evidence:**
    *   `High-Grade Sanctuary Coins`
    *   `Official Sanhedrin Report`

#### People

| Character | Unlocks Evidence |
|---|---|
| Lucas (Tomb Guard Sentry) | `High-Grade Sanctuary Coins` |
| Caiaphas (High Priest) | `Official Sanhedrin Report` |
| Pilate's Secretary | |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `bribe_shekels` | Lucas (Sentry) | **Implicated in Bribery** (Possession of the coins links him to the cover-up) |
| `broken_imperial_seal` | Caiaphas | **Implicated in Conspiracy** (Authored the false report) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `High-Grade Sanctuary Coins` | `Rulers Conspire Prophecy (Psalm 2:1-2)` |

### Case: `peter_restoration` (Peter's Restoration)
*   **Title:** Peter's Restoration
*   **Characters:**
    *   Peter (Restored Apostle) (`../story/act4/case_c_peter_restoration/peter_restored.ink`) (`../characters/peter.json`)
    *   Thomas (Disciple) (`../story/act4/case_c_peter_restoration/parable_meaning.ink`) (`../characters/thomas.json`)
    *   Mary Magdalene (Witness) (`../story/act4/case_c_peter_restoration/mary_magdalene.ink`) (`../characters/mary_magdalene.json`)
    *   Nathanael (Disciple) (`../story/act4/case_c_peter_restoration/nathanael_disciple.ink`) (`../characters/nathanael_disciple.json`)
*   **Suspects:**
    *   Peter (`../characters/peter.json`)
    *   No One (`../characters/no_one.json`)
*   **Culprit:** **No One**. The event was an act of divine grace and restoration.
*   **Prophecies:** Zechariah 13:7 & Ezekiel 34:11-16

*   **Evidence:**
    *   `Charcoal Fire Remnants`
    *   `Wound-Touching Testimony`

#### People

| Character | Unlocks Evidence |
|---|---|
| Peter (Restored Apostle) | `Charcoal Fire Remnants` |
| Thomas (Disciple) | `Wound-Touching Testimony` |
| Mary Magdalene (Witness) | |
| Nathanael (Disciple) | |

#### Lab

| Evidence | Suspect | Result |
|---|---|---|
| `charcoal_fire` | Peter | **Motive Clarified** (Links his restoration to his earlier denial) |
| `miraculous_catch` | Thomas | **Identified as Witness** (His doubt led to physical proof) |

#### Codex

| Evidence | Unlocks Prophecy |
|---|---|
| `Charcoal Fire Remnants` | `Good Shepherd Prophecy (Ezekiel 34:11-16)` |
| `Wound-Touching Testimony` | `Scattered Sheep Prophecy (Zechariah 13:7)` |