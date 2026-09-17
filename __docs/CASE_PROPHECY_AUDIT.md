# Case prophecy and Connections audit — 17 September 2026

## Verified changes

- Talking to every configured witness lists every prophecy in the Case File and the Lab. Listing grants no research completion or points. Existing saved conversations/chat messages count toward witness coverage.
- The Lab now has a dedicated Prophecies panel. Each match requires an identified prophecy and collected supporting evidence. Existing Scripture reference cards are logged on successful research rather than requiring separate world pickups.
- Missing Donkey: all four prophecies can be researched. Browser verification reached 4/4; repeated matches do not award points again.
- Required Connections have visible pair hints and a load-hint button. Optional discoveries remain optional. All required operations in all 16 cases pass runtime tests. Authored scripture-containing connections no longer accidentally route into prophecy research.
- Research status is case-scoped, so completing a Scripture reference in one case does not automatically complete another case using it. Global Codex entries remain locked until their case closes.

## Case-by-case results

| Case | Research routes | Required Connections tested | Missing authored mapping |
| --- | ---: | ---: | --- |
| The Missing Donkey (triumphal_entry) | 4/4 | 3 | None |
| The Overturned Tables (temple_cleansing) | 3/3 | 2 | None |
| The Barren Fig Tree (fig_tree_incident) | 4/4 | 2 | None |
| The Silenced Teacher (authority_challenged) | 4/4 | 2 | None |
| The Price of Life (lazarus_plot) | 2/2 | 3 | None |
| The End of the Age (olivet_discourse) | 3/3 | 2 | None |
| The Anointing at Bethany (passover_lamb_chain) | 1/1 | 2 | None |
| The Broken Cup (last_supper) | 8/8 | 3 | None |
| The Severed Ear (gethsemane_arrest) | 2/2 | 2 | None |
| The Midnight Tribunal (sanhedrin_trial) | 6/6 | 3 | None |
| The People's Choice (barabbas_choice) | 4/4 | 2 | None |
| The Final Sacrifice (crucifixion_site) | 14/14 | 2 | None |
| The Empty Tomb (resurrection) | 7/7 | 3 | None |
| The Guard's Report (roman_inquiry) | 1/1 | 1 | None |
| Peter's Restoration (peter_restoration) | 4/4 | 2 | None |
| The Ascension (ascension) | 4/4 | 2 | None |

## Completed follow-up

All 71 case prophecy entries have an evidence route. The matcher now accepts multiple related prophecies on one clue. Explicit mappings cover the tribunal's mocking and denial testimony, the darkness surrounding the final cry, and the open-tomb witnesses. Pilate's interview now supplies two testimonial records for mock kingship and the prisoner's public isolation; neither claims knowledge of every disciple's whereabouts. The opening dialogue grants both records on every branch.

Runtime tests research every prophecy in every case and verify that the Codex stays locked before case closure. Required Connections are tested independently in all 16 cases. Repeated research does not duplicate rewards.

Mobile2D: all 16 authored maps load terrain, NPCs and enemies in regression tests. Added the missing Bethany and Ascension map routes, explicit load-error/retry feedback, rectangular-map bounds, refreshed minimap construction and versioned scene imports. A fresh browser load displayed terrain and NPCs; the first case loaded four enemies, which start away from the player.

This is a progression/data audit, not a fresh theological review of the game’s authored prophecy interpretations. Tests grant fixture evidence directly; they do not establish that every later-case world pickup is reachable. Existing duplicate evidence IDs in the Last Supper and Empty Tomb also deserve a separate data-cleanup pass.
