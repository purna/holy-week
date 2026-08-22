# Extras Integration Plan

## Purpose

This document maps the unused story files in `assets/story/extras/` to the investigation cases across Acts 1–4 of the Holy Week game. Each file has been reviewed for thematic fit, narrative connection, and integration potential. The goal is to provide a roadmap for incorporating these orphaned stories into existing cases or identifying candidates for future case expansion.

## Cleanup Status (2026-08-21)

- **Duplicates removed:** All `.ink` and `.json` files in `assets/story/extras/` that were exact or near-duplicates of files already present in act directories (`act1/`, `act2/`, `act3/`, `act4/`) have been deleted.
- **`hillel_scribe.json` moved:** This file was the only orphan with a `DIALOGUE_ID_MAP` reference but no existing file at its target path. It has been moved from `assets/story/extras/` to `assets/story/hillel_scribe.json`.
- **Remaining in `extras/`:** Only `generate_ink.py` remains in the extras folder. It is a tooling script, not a story file.

---

## Quick Reference: Integration Summary

| Extras File | Best Case Fit | Integration Type | Difficulty | Status |
|-------------|---------------|------------------|------------|--------|
| `board_debate.ink` | Post-game / meta | Deep integration | High | Removed (duplicate of `system/` version) |
| `board_review.ink` | Post-game / meta | Deep integration | High | Removed (duplicate of `system/` version) |
| `hillel_scribe.json` | Act 1 Case B or Act 2 Case A | Quick win | Low | **Moved to `assets/story/hillel_scribe.json`** |
| `andrew_olivet.ink` | Act 2 Case C | Already mapped | — | Removed (duplicate) |
| `annas_patriarch.ink` | Act 2 Case B | Already mapped | — | Removed (duplicate) |
| `barabbas_insurgent.ink` | Act 3 Case D | Already mapped | — | Removed (duplicate) |
| `caiaphas_priest.ink` | Act 3 Case C | Already mapped | — | Removed (duplicate) |
| `execution_soldier.ink` | Act 4 Case A | Already mapped | — | Removed (duplicate) |
| `false_witness.ink` | Act 3 Case C | Already mapped | — | Removed (duplicate) |
| `galilean_pilgrim.ink` | Act 1 Case A | Already mapped | — | Removed (duplicate) |
| `guard_report.ink` | Act 1 Case B | Already mapped | — | Removed (duplicate) |
| `guard_report_crucifixion.ink` | Act 3 Case E | Already mapped | — | Removed (duplicate) |
| `guard_report_gethsemane.ink` | Act 3 Case B | Already mapped | — | Removed (duplicate) |
| `informant_bribe.ink` | Act 1 Case B | Already mapped | — | Removed (duplicate) |
| `jerusalem_local.ink` | Act 1 Case A | Already mapped | — | **Wired into npcs array** |
| `john_disciple.ink` | Act 3 Case A | Already mapped | — | Removed (duplicate) |
| `john_fig_tree.ink` | Act 1 Case C | Already mapped | — | Removed (duplicate) |
| `john_olivet.ink` | Act 2 Case C | Already mapped | — | Removed (duplicate) |
| `joseph_arimathea.ink` | Act 4 Case A | Already mapped | — | Removed (duplicate) |
| `judas_iscariot.ink` | Act 3 Case A | Already mapped | — | Removed (duplicate) |
| `local_traveler.ink` | Act 1 Case C | Already mapped | — | Removed (duplicate) |
| `malchus.ink` | Act 3 Case B | Already mapped | — | Removed (duplicate) |
| `market_rumors.ink` | Act 1 Case B | Already mapped | — | Removed (duplicate) |
| `martha_bethany.ink` | Act 2 Case B | Already mapped | — | Removed (duplicate) |
| `mary_magdalene.ink` | Act 4 Case A | Already mapped | — | Removed (duplicate) |
| `money_changer.ink` | Act 1 Case B | Already mapped | — | Removed (duplicate) |
| `nathanael_disciple.ink` | Act 4 Case C | Already mapped | — | Removed (duplicate) |
| `parable_meaning.ink` | Act 2 Case A / B | Already mapped | — | Removed (duplicate) |
| `parable_vineyard.ink` | Act 2 Case A / B | Already mapped | — | Removed (duplicate) |
| `peter_defense.ink` | Act 3 Case B | Already mapped | — | Removed (duplicate) |
| `peter_denial.ink` | Act 3 Case C | Already mapped | — | Removed (duplicate) |
| `peter_fig_tree.ink` | Act 1 Case C | Already mapped | — | Removed (duplicate) |
| `peter_olivet.ink` | Act 2 Case C | Already mapped | — | Removed (duplicate) |
| `pharisee_critique.ink` | Act 1 Case B | Already mapped | — | Removed (duplicate) |
| `pontius_pilate.ink` | Act 1 Case B | Already mapped | — | Removed (duplicate) |
| `pontius_pilate_barabbas.ink` | Act 3 Case D | Already mapped | — | Removed (duplicate) |
| `priest_objection.ink` | Act 1 Case B | Already mapped | — | Removed (duplicate) |
| `priest_objection_crucifixion.ink` | Act 3 Case E | Already mapped | — | Removed (duplicate) |
| `priest_objection_temple.ink` | Act 1 Case B | Already mapped | — | Removed (duplicate) |
| `roman_assessment.ink` | Act 3 Case E | Already mapped | — | Removed (duplicate) |
| `rumor_whisper.ink` | Act 1 Case B | Already mapped | — | Removed (duplicate) |
| `scribe_intro.ink` | Act 2 Case A | Already mapped | — | Removed (duplicate) |
| `secret_visit.ink` | Act 3 Case B | Already mapped | — | Removed (duplicate) |
| `simon_cyrene.ink` | Act 3 Case E | Already mapped | — | Removed (duplicate) |
| `teaching_mount.ink` | Act 2 Case A / B | Already mapped | — | Removed (duplicate) |
| `temple_spy.ink` | Act 2 Case B | Already mapped | — | Removed (duplicate) |
| `trial_rumors.ink` | Act 2 Case B / Act 3 Case C | Already mapped | — | Removed (duplicate) |
| `upper_room_prep.ink` | Act 3 Case E | Already mapped | — | **Wired into Case E npcs, files moved** |
| `witness_healed.ink` | Act 2 Case A / B | Already mapped | — | Removed (duplicate) |

---

## Act I — The Triumphal Entry

### Case A: The Missing Donkey (`triumphal_entry`)
**Location:** Bethphage, Mount of Olives  
**Current NPCs:** Peter, John, Tobias (owner), Jemimah (local skeptic), Eleazar (Sadducean Aristocrat)  
**Current Evidence:** Cloaks, donkey tracks, villager testimony, Zechariah scroll, palm branch, rope fibers, Pharisee complaint, forged receipt

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `galilean_pilgrim.ink` | Tobias (owner) | Alternative dialogue | Thematic fit: pilgrim perspective on the triumphal entry |
| `jerusalem_local.ink` | Jemimah | Alternative dialogue | Thematic fit: local cynicism about the procession |
| `local_traveler.ink` | Eyewitness | Additional witness | Could supplement villager testimony with road observations |

#### Integration Opportunities
- **`local_traveler.ink`** is wired as an alternate witness on the Bethphage road, providing corroborating detail about the colt's condition and the disciples' behavior.
- **`jerusalem_local.ink`** maps to Jemimah as an NPC in the `npcs` array. The duplicate suspect entry has been removed.

---

### Case B: The Overturned Tables (`temple_cleansing`)
**Location:** Temple Courts, Jerusalem  
**Current NPCs:** Eleazar (Sadducean Aristocrat), money changer, Pharisee, Pilate's secretary, informant, rumor whisperer  
**Current Evidence:** Coins, debris, scroll fragments, price lists, overturned stand, Roman dispatch, cleansing whip

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `guard_report.ink` | Garrison Guard | Additional testimony | Roman perspective on the Temple cleansing |
| `informant_bribe.ink` | Street Informant | Additional NPC | Judas bribery subplot |
| `market_rumors.ink` | Market Vendor | Additional NPC | Street-level gossip |
| `money_changer.ink` | Malachi (Money Changer) | Additional NPC | Defense of Temple commerce |
| `pharisse_critique.ink` | Simon the Pharisee | Additional NPC | Legal critique of Jesus's actions |
| `pontius_pilate.ink` | Pontius Pilate | Additional NPC | Roman prefect's perspective |
| `priest_objection.ink` | Temple Priest | Additional NPC | Sadducean objection |
| `priest_objection_temple.ink` | Temple Priest | Additional NPC | Expanded temple objection |
| `rumor_whisper.ink` | City Gossip | Additional NPC | Bethesda healing rumor |

#### Quick Win Integration
- **`hillel_scribe.json`** (from extras) — A junior Temple scribe who cross-references Passover lamb ledgers. This character does not currently exist in any act directory and would be a **quick win** addition to Case B. He could provide evidence about the commercial logistics of the Temple market and the typological significance of Jesus as the Passover Lamb. The JSON file is lightweight (14 lines) and only needs an `.ink` dialogue file.

---

### Case C: The Fig Tree Incident (`fig_tree_incident`)
**Location:** Jerusalem-Bethany Road  
**Current NPCs:** Peter, Nathanael, local traveler  
**Current Evidence:** Withered branches, leaf samples, bark scrapings, root ball, soil sample, cursed fruit, moisture readings, shadow measurements

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `john_fig_tree.ink` | John the Disciple | Additional dialogue | Theological reflection on the fig tree symbolism |
| `local_traveler.ink` | Eyewitness | Core witness | Bytestanding account of the tree's transformation |
| `peter_fig_tree.ink` | Simon Peter | Core dialogue | Peter's reaction to the withered tree |

---

## Act II — Authority Challenged

### Case A: The Silenced Teacher (`authority_challenged`)
**Location:** Temple Courts, Jerusalem  
**Current NPCs:** Caiaphas, Samuel (scribe), Nathanael (Pharisee), Thomas the Rich Young Ruler  
**Current Evidence:** Authority challenge scroll, parable fragments, cornerstone carving, denarius, withered fig leaf, widow's mites, bystander's account, altered scribe's notes

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `caiaphas_priest.ink` | Caiaphas | Additional dialogue | Alternative interrogation angles |
| `parable_meaning.ink` | Thomas | Additional dialogue | Expanded parable analysis |
| `parable_vineyard.ink` | Thomas | Additional dialogue | Vineyard parable focus |
| `scribe_intro.ink` | Samuel | Additional dialogue | Scribe's opening testimony |
| `teaching_mount.ink` | Disciple | Additional NPC | Sermon on the Mount recollections |
| `witness_healed.ink` | Bethesda Witness | Additional NPC | Healing testimony subplot |

---

### Case B: The Price of Life (`lazarus_plot`)
**Location:** Bethany & Temple Courts, Jerusalem  
**Current NPCs:** Maluch (temple spy), Annas, Martha, Thomas (parable), Nicodemus  
**Current Evidence:** Crowd report, grave dirt, secret decree, parable notes, false witness account

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `annas_patriarch.ink` | Annas | Core dialogue | High Priest Emeritus perspective |
| `martha_bethany.ink` | Martha | Core dialogue | Sister of Lazarus, household security |
| `parable_meaning.ink` | Thomas | Additional dialogue | Parable of the Weeds analysis |
| `parable_vineyard.ink` | Thomas | Additional dialogue | Vineyard parable analysis |
| `temple_spy.ink` | Maluch | Core dialogue | Temple informant's surveillance report |
| `teaching_mount.ink` | Disciple | Additional NPC | Mount Olivet teaching recollections |
| `trial_rumors.ink` | Court Observer | Additional NPC | Sanhedrin trial gossip |
| `witness_healed.ink` | Bethesda Witness | Additional NPC | Healing testimony |

---

### Case C: The Olivet Discourse (`olivet_discourse`)
**Location:** Mount of Olives  
**Current NPCs:** Andrew, John, Peter  
**Current Evidence:** Discourse notes, temple model, prophetic timeline, eschatological charts

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `andrew_olivet.ink` | Andrew | Core dialogue | Olivet Discourse witness |
| `john_disciple.ink` | John | Additional dialogue | Upper Room anxiety, pre-arrest reflections |
| `john_olivet.ink` | John the Apostle | Core dialogue | Extended Olivet Discourse reflection |
| `peter_olivet.ink` | Simon Peter | Core dialogue | Peter's reaction to the Temple destruction prediction |

---

## Act III — The Last Supper & Arrest

### Case A: The Broken Cup (`last_supper`)
**Location:** Upper Room, Jerusalem  
**Current NPCs:** John Mark, Rhoda (servant), Judas Iscariot  
**Current Evidence:** Bread crumbs, wine stain, cup fragments, water jug, money bag impression, dipped bread, new covenant declaration, twelve roll, rooster warning

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `judas_iscariot.ink` | Judas Iscariot | Core dialogue | Betrayer's motivation |
| `john_disciple.ink` | John Mark | Additional dialogue | John Mark's anxiety about Judas |
| `upper_room_prep.ink` | Household Servant | Additional NPC | Room preparation context |

---

### Case B: The Severed Ear (`gethsemane_arrest`)
**Location:** Gethsemane Garden, Mount of Olives  
**Current NPCs:** Malchus, Simon Peter, Roman Garrison Guard  
**Current Evidence:** Abandoned linen, dropped torch, bloodied scarf, prisoner cord, planted sword

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `guard_report_gethsemane.ink` | Roman Guard | Additional dialogue | Arrest witness account |
| `malchus.ink` | Malchus | Core dialogue | High Priest's servant, healed by Jesus |
| `peter_defense.ink` | Simon Peter | Additional dialogue | Peter's post-arrest reflections |
| `secret_visit.ink` | Night Visitor | Additional NPC | Shadow witness to Gethsemane events |

---

### Case C: The Midnight Tribunal (`sanhedrin_trial`)
**Location:** High Priest's Courtyard, Jerusalem  
**Current NPCs:** Caiaphas, Ananias (false witness), Peter (denying disciple)  
**Current Evidence:** Rooster feather, torn robe, conflicting depositions, charcoal briquette, servant girl's accusation, guard's reed, perjured testimony, second denial account, witness to Peter's departure

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `caiaphas_priest.ink` | Caiaphas | Additional dialogue | High Priest's trial perspective |
| `false_witness.ink` | Ananias | Core dialogue | Hired accuser's testimony |
| `peter_denial.ink` | Peter | Additional dialogue | Denial aftermath |

---

### Case D: The People's Choice (`barabbas_choice`)
**Location:** Praetorium, Jerusalem  
**Current NPCs:** Barabbas, Pontius Pilate  
**Current Evidence:** Governor's basin, Claudia's warning scroll, insurgent's dossier, joint verdict scroll

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `barabbas_insurgent.ink` | Barabbas | Core dialogue | Released criminal's perspective |
| `pontius_pilate_barabbas.ink` | Pontius Pilate | Core dialogue | Pilate's choice narrative |

---

### Case E: The Final Sacrifice (`crucifixion_site`)
**Location:** Golgotha, outside Jerusalem  
**Current NPCs:** Longinus (centurion), Pashhur (priest), Joseph of Arimathea  
**Current Evidence:** Soldiers' dice, split rocks, pierced spear, torn veil, linen receipt, sour wine sponge, unbroken legs, final words scroll, Aramaic cry, crowd taunt, distant witnesses, crucifixion nails, cross burden, crucified with thieves record

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `guard_report_crucifixion.ink` | Garrison Guard | Additional dialogue | Crucifixion guard perspective |
| `joseph_arimathea.ink` | Joseph of Arimathea | Additional dialogue | Tomb preparation context |
| `priest_objection_crucifixion.ink` | Temple Priest | Additional dialogue | Veil tearing witness |
| `roman_assessment.ink` | Claudius (Centurion) | Additional dialogue | Centurion's servant healing testimony |
| `secret_visit.ink` | Night Visitor | Additional NPC | Gethsemane-to-crucifixion bridge |
| `simon_cyrene.ink` | Simon of Cyrene | Additional NPC | Cross-bearer's account |
| `upper_room_prep.ink` | Household Servant | Additional NPC | Last Supper → Crucifixion bridge. Files moved to `act3/case_e_final_sacrifice/`. |

---

## Act IV — The Resurrection

### Case A: The Empty Tomb (`resurrection`)
**Location:** Garden Tomb, Golgotha  
**Current NPCs:** Mary Magdalene, Marcus (Roman soldier), Joseph of Arimathea  
**Current Evidence:** Displaced stone, empty tomb, folded linens, angelic witness, guard report, spice jars, Mary's encounter, opened tombs, Psalm 22 scroll, prophecy scrolls

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `execution_soldier.ink` | Marcus | Additional dialogue | Crucifixion guard perspective |
| `joseph_arimathea.ink` | Joseph | Additional dialogue | Tomb owner's testimony |
| `mary_magdalene.ink` | Mary Magdalene | Additional dialogue | Resurrection witness |

---

### Case B: The Guard's Report (`roman_inquiry`)
**Location:** Garden Tomb, Golgotha  
**Current NPCs:** Lucas (sentry), Caiaphas, Pilate's secretary, Mary (resurrection), Judas (betrayal), Herod's servant, Peter (restored)  
**Current Evidence:** Bribe shekels, broken imperial seal, shattered spear, Sanhedrin report, Psalm 2 scroll

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `judas_betrayal.ink` | Judas | Additional dialogue | Betrayer's aftermath |
| `sentry_lucas.ink` | Lucas | Core dialogue | Tomb guard's confession |

---

### Case C: Peter's Restoration (`peter_restoration`)
**Location:** Sea of Galilee  
**Current NPCs:** Nathanael, Thomas, Peter (restored)  
**Current Evidence:** Miraculous catch, charcoal fire, reinstatement dialogue

#### Extras Already Mapped
| File | Character | Role | Notes |
|------|-----------|------|-------|
| `nathanael_disciple.ink` | Nathanael | Core dialogue | Disciple witness to restoration |

---

## Truly Orphaned Files (No Case Assignment)

These files exist in `assets/story/extras/` but have no corresponding entry in any case's `npcs` array and no home in an act directory.

### `board_debate.ink`
**Character:** Maluch (Senior Scribe)  
**Content:** A mentorship dialogue where a senior scribe evaluates an apprentice's investigation board, questioning what scares people most about Jesus — not the healings, but the categories He refuses to fit.  
**Suggested Integration:** Post-game epilogue or meta-commentary overlay. Could appear after all cases are complete as a "debrief" with the player's investigation board.  
**Integration Type:** Deep integration  
**Why It Fits:** Thematically rich but structurally disconnected. It comments on the investigation itself rather than any single case event. Best saved for a future "investigation review" scene.

### `board_review.ink`
**Character:** Board (Investigation Review)  
**Content:** A brief philosophical prompt about evidence weight and what the investigation pages reveal about the subject.  
**Suggested Integration:** Could be used as a concluding reflection after Act IV, or as a framing device for a "review board" mechanic where the player summarizes their findings.  
**Integration Type:** Deep integration  
**Why It Fits:** Meta-narrative tool rather than in-world story. Needs a new game system to implement properly.

### `hillel_scribe.json`
**Character:** Hillel (Junior Temple Scribe)  
**Content:** A meticulous scribe responsible for cross-referencing market ledgers for Passover lambs with priestly inspection records. His data-driven work reveals typological patterns linking Jesus to the Passover Lamb.  
**Suggested Integration:** Act 1 Case B (The Overturned Tables) as an alternative NPC in the Temple administrative offices, or Act 2 Case A (The Silenced Teacher) as a witness to the Temple commerce disruption.  
**Integration Type:** Quick win  
**Why It Fits:** The JSON profile is already complete (14 lines). Only an `.ink` dialogue file needs to be written. Hillel's focus on Passover lamb logistics provides a fresh forensic angle on the Temple cleansing — he could identify the economic disruption's impact on sacrificial readiness.

---

## Quick Wins

These integrations require minimal new content and can be completed by wiring existing files to case `npcs` arrays:

1. **`hillel_scribe.json` → Act 1 Case B**  
   ✅ Done. Hillel is wired in `js/act1_case.js:1268` with `storyFile: "hillel_scribe"`.

2. **`local_traveler.ink` → Act 1 Case C**  
   ✅ Done. Local traveler is wired in `js/act1_case.js:1955` with `storyFile: "local_traveler"`.

3. **`jerusalem_local.ink` → Act 1 Case A**  
   ✅ Done. The file maps to Jemimah (`local_skeptic`) in Case A. The duplicate suspect entry has been removed; the NPC definition in the `npcs` array remains intact with `storyFile: "jerusalem_local"`.

4. **`upper_room_prep.ink` → Act 3 Case E**  
   ✅ Done. The `.ink` and `.json` files have been moved from `act3/case_a_broken_cup/` to `act3/case_e_final_sacrifice/`. The `dialogueMaps.js` path has been updated to point to the new location.

---

## Deep Integration

These stories require new case content, expanded dialogue trees, or new game mechanics:

1. **`board_debate.ink` → Post-game Review Scene**  
   Requires a new "investigation board" UI overlay where Maluch evaluates the player's completed case files. Would need new HTML/CSS/JS for the review interface.

2. **`board_review.ink` → Meta-commentary Framing**  
   Could serve as an intro or outro for the entire game, but needs a new scene context. Not suitable for insertion into existing cases without structural changes.

3. **`guard_report.ink` (extras variant)** → Act 1 Case B  
   The extras version is a minimalist Roman guard's observation of the Temple cleansing. The act directory already contains a fuller version, but this variant could be wired as a "conflicting testimony" fake/distractor evidence.

---

## Thematic Cross-Cutting Themes

Several extras explore motifs that span multiple acts:

- **Betrayal & Denial:** `judas_iscariot.ink`, `peter_denial.ink`, `peter_defense.ink` form a trilogy of failure, regret, and attempted redemption that threads from Act III into Act IV.
- **Roman Authority:** `pontius_pilate.ink`, `pontius_pilate_barabbas.ink`, `execution_soldier.ink`, `roman_assessment.ink`, `guard_report.ink` provide layered Roman perspectives from indifference to terror.
- **Temple Opposition:** `priest_objection.ink`, `priest_objection_temple.ink`, `priest_objection_crucifixion.ink` show Sadducean resistance evolving from legal objection to cosmic terror.
- **Disciple Anxiety:** `john_disciple.ink`, `john_olivet.ink`, `peter_olivet.ink`, `andrew_olivet.ink` capture the inner circle processing Jesus's predictions at different moments.

---

## Recommendations

1. **Immediate:** Integrate `hillel_scribe.json` into Act 1 Case B. It is the only file in extras with no act-directory home and no JS reference, yet it has complete profile data ready for wiring.
2. **Short-term:** Audit the duplicate files in extras against their act-directory counterparts. Many appear to be earlier drafts or alternate versions. Consolidate or remove duplicates to reduce confusion.
3. **Long-term:** Consider `board_debate.ink` and `board_review.ink` for a post-resurrection "investigation debrief" scene that would give the player narrative closure and a chance to review their deductive work.
