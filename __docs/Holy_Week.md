# Holy Week — Game and Design Overview

Holy Week is a browser-based educational investigation game. The player explores scenes, interviews witnesses, collects evidence, solves Lab deductions, researches biblical prophecy and typology, and concludes cases spanning Jesus's entry into Jerusalem through the Ascension.

> Four acts. Sixteen cases. One truth.

## Sources of truth

- **Runtime case data:** [`act1_case.js`](../js/act1_case.js), [`act2_case.js`](../js/act2_case.js), [`act3_case.js`](../js/act3_case.js), and [`act4_case.js`](../js/act4_case.js). These files own case IDs, titles, locations, evidence, prophecies, witnesses, dialogue mappings, deductions, and case truth.
- **Game and narrative design:** this document.
- **Biblical and historical chronology:** [`holy_week_chronology.md`](holy_week_chronology.md).
- **Lab behaviour:** [`LAB_SYSTEM.md`](LAB_SYSTEM.md).
- **Scoring and progression:** [`ScoringSystem.md`](ScoringSystem.md).
- **Character voice and dialogue authoring:** [`Character_Dialogue_Profiles.md`](Character_Dialogue_Profiles.md).
- **Technical configuration:** [`CONFIG.md`](CONFIG.md).
- **Trigger and NPC integration:** [`TRIGGER_NPC_SYSTEM.md`](TRIGGER_NPC_SYSTEM.md).
- **Generated prophecy and typology reference:** [`GENERATED_PROPHECY_REFERENCE.md`](GENERATED_PROPHECY_REFERENCE.md).

Maintained Markdown must not reproduce the runtime evidence or prophecy databases. When implementation-level case detail is needed, consult the four case modules. Any human-readable case or prophecy inventory should be generated from those modules rather than maintained by hand.

## Core loop

1. Select an unlocked case from the Act map.
2. Explore the location and inspect points of interest.
3. Interview witnesses and challenge contradictions.
4. Collect physical, testimonial, documentary, Scripture, and fulfilment evidence.
5. Use the Lab to compare, classify, order, and test evidence.
6. Link Scripture evidence with fulfilment evidence to complete Codex research.
7. Conclude the case when its collection, research, and deduction requirements are met.

Case resolution is evidence- and research-based. The player does not have to accuse a person to finish every case; many events are prophetic, typological, institutional, or divine rather than conventional crimes.

## Acts and canonical cases

The canonical count is derived from the exported case objects in `act1_case.js` through `act4_case.js`: **16 cases**.

| Act | Export | Case ID | Title | Event location |
|---|---|---|---|---|
| I | `act1CaseA` | `triumphal_entry` | The Missing Donkey | Bethphage, Mount of Olives |
| I | `act1CaseB` | `temple_cleansing` | The Overturned Tables | Temple Courts, Jerusalem |
| I | `act1CaseC` | `fig_tree_incident` | The Barren Fig Tree | Bethany Road, Mount of Olives |
| II | `act2CaseA` | `authority_challenged` | The Silenced Teacher | Temple Courts, Jerusalem |
| II | `act2CaseB` | `lazarus_plot` | The Price of Life | Bethany and the Temple Courts |
| II | `act2CaseC` | `olivet_discourse` | The End of the Age | Mount of Olives |
| II | `act2CaseD` | `passover_lamb_chain` | The Anointing at Bethany | Bethany and the Temple Courts |
| III | `act3CaseA` | `last_supper` | The Broken Cup | Upper Room, Jerusalem |
| III | `act3CaseB` | `gethsemane_arrest` | The Severed Ear | Garden of Gethsemane |
| III | `act3CaseC` | `sanhedrin_trial` | The Midnight Tribunal | High Priest's Courtyard |
| III | `act3CaseD` | `barabbas_choice` | The People's Choice | Praetorium, Jerusalem |
| III | `act3CaseE` | `crucifixion_site` | The Final Sacrifice | Golgotha |
| IV | `act4CaseA` | `resurrection` | The Empty Tomb | Garden Tomb, Golgotha |
| IV | `act4CaseB` | `roman_inquiry` | The Guard's Report | Garden Tomb, Golgotha |
| IV | `act4CaseC` | `peter_restoration` | Peter's Restoration | Sea of Galilee |
| IV | `act4CaseD` | `ascension` | The Ascension | Mount of Olives, Jerusalem |

This table is intentionally limited to navigation-level metadata. It is not an evidence, prophecy, witness, or solution reference.

## Prophecy and typology

The Codex distinguishes two related categories:

- **Predictive prophecy:** a biblical text understood by the game as anticipating a later person or event.
- **Typology:** a person, institution, object, or event that forms an earlier biblical pattern echoed or completed in Christ.

The normal research flow is:

1. discover Scripture evidence;
2. discover corresponding fulfilment evidence;
3. compare the pair in the Lab;
4. record the completed relationship in the Codex; and
5. apply Investigation and Research rewards according to [`ScoringSystem.md`](ScoringSystem.md).

The case modules define the actual prophecy records and evidence links. Design prose should explain the distinction and player experience without copying those records.

## Hidden detective chains

Hidden chains reward connections that span cases and acts. Current design themes include Psalm 22, the Passover Lamb, the Day of Atonement, the New Covenant, resurrection, and the scattering and restoration of the disciples.

A chain should unlock only from canonical runtime relationships. Its name, reward, and presentation may be documented here or in the scoring specification, while its member evidence IDs belong in runtime data.

## Progression philosophy

- **Investigation Score** evaluates performance within a case.
- **Research Score** persists across the game and rewards completed biblical research.
- **Doubt** records unsupported or incorrect investigative actions and reduces final performance.
- **Honor** represents reputation with the factions whose cooperation sustains the investigation.

Exact values, thresholds, ranks, and game-over rules are canonical in [`ScoringSystem.md`](ScoringSystem.md).

## Design principles

- Investigation should lead the player from apparent mystery to defensible conclusion.
- Scripture research should require both text and fulfilment evidence, not trivia recall alone.
- Typology must be labelled distinctly from direct prediction.
- Incorrect actions may cost progress, but feedback should teach the relevant reasoning.
- Hints should reduce friction without silently completing the whole deduction.
- Case conclusions should reflect the event's nature; a human culprit is not mandatory.
- Historical or theological interpretation should be transparent about where the game makes a design choice.

## Documentation maintenance

When a case changes, update the relevant `act*_case.js` module first. Update this overview only if navigation metadata or broader design changes, and update specialist documentation only when its system behaviour changes. Any optional case or prophecy reference should be regenerated from JavaScript.

Do not reintroduce hand-maintained evidence lists, prophecy mappings, suspect inventories, dialogue-ID databases, or case solutions into this document.
