# Prophecy & Evidence Link Reference (v6)

< [Back to Main Document](Miracle Maker.md)

## Table of Contents

- [Typology vs. Predictive Prophecy](#typology-vs-predictive-prophecy)
- [act1CaseA — The Missing Donkey](#act1casea-the-missing-donkey)
- [act2CaseD — The Anointing at Bethany (New Investigation Chain)](#act2cased-the-anointing-at-bethany-new-investigation-chain)
- [act1CaseB — The Overturned Tables](#act1caseb-the-overturned-tables)
- [act1CaseC — The Barren Fig Tree](#act1casec-the-barren-fig-tree)
- [act2CaseA — The Silenced Teacher](#act2casea-the-silenced-teacher)
- [act2CaseB — The Price of Life](#act2caseb-the-price-of-life)
- [act2CaseC — The End of the Age](#act2casec-the-end-of-the-age)
- [act3CaseA — The Broken Cup](#act3casea-the-broken-cup)
- [act3CaseB — The Severed Ear](#act3caseb-the-severed-ear)
- [act3CaseC — The Midnight Tribunal](#act3casec-the-midnight-tribunal)
- [act3CaseD — The People's Choice](#act3cased-the-peoples-choice)
- [act3CaseE — The Final Sacrifice](#act3casee-the-final-sacrifice)
- [act4CaseA — The Empty Tomb](#act4casea-the-empty-tomb)
- [act4CaseB — The Guard's Report](#act4caseb-the-guards-report)
- [act4CaseC — Peter's Restoration](#act4casec-peters-restoration)
- [act4CaseD — The Ascension](#act4cased-the-ascension)
- [Cross-Case Typology: The Day of Atonement (Leviticus 16)](#cross-case-typology-the-day-of-atonement-leviticus-16)
- [Cross-Case Typology: Isaac Carrying the Wood (Genesis 22)](#cross-case-typology-isaac-carrying-the-wood-genesis-22)
- [Cross-Case Typology: The Zechariah 13:7 Scattering Chain](#cross-case-typology-the-zechariah-137-scattering-chain)

This document maps every case to its defined prophecies and to each piece of evidence, showing the two-link design used in the game code:

- **`relatedProphecy`** → the fulfilled prophecy or typological pattern the evidence links to in the Codex (must be one of the case's defined prophecies/types).
- **`bibleRef`** → the supporting background Bible verse(s) the evidence's narrative/text cites (may be a Gospel account or an OT background verse).

> Note: a `relatedProphecy` of `-` means the evidence is not Codex-linkable to a prophecy (supporting/background evidence only).

Each case also has a **Fulfillment Links** table listing every Bible reference an evidence cites, so each link is readable on its own line.

---

## Typology vs. Predictive Prophecy

The Codex now distinguishes between:
1. **Fulfilled Prophecy:** Direct predictive Old Testament statements fulfilled in the New Testament.
2. **Typological Fulfilments (Types & Shadows):** Events where an earlier biblical pattern (e.g., Exodus 12) intentionally foreshadows Christ rather than predicting Him in a single prophetic text.

## act1CaseA — The Missing Donkey

### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Zechariah 9:9 | `zechariah_9_9` | Prophecy |
| Psalm 118:25–26 | `psalm_118_25_26` | Prophecy |
| Genesis 49:10–11 | `genesis_49_10_11` | Prophecy |
| Malachi 3:1 | `malachi_3_1` | Prophecy |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Two Disciples' Cloaks (`cloaks`) | `genesis_49_10_11` | Mark 11:7 | This mirrors 2 Kings 9:13 where cloaks were spread before King Jehu — a royal gesture the disciples repeated on the road to Jerusalem. |
| Fresh Hoofprints (`donkey_tracks`) | - | Luke 19:35–36 | The route from the Mount of Olives into Jerusalem through the eastern gate mirrors the processional route described in Ezekiel 44:1–3, associated with the glory of God entering the city. |
| Villager's Testimony (`witness_account`) | - | Mark 11:3–6 | Jesus's foreknowledge of the exact response to give is consistent with His omniscience, and mirrors how the Passover lamb was 'set apart' by divine instruction (Exodus 12:3–6). |
| Zechariah 9:9 Scroll Fragment (`prophecy_scroll`) | `zechariah_9_9` | Matthew 21:4–5 | Zechariah 9:9 was written around 520 BC. Zechariah himself arrived back in Judah after the Babylonian exile — a people who desperately needed a king. His vision of a humble, donkey-riding king was a hope that Jesus publicly claimed. |
| Fresh-Cut Palm Branch (`palm_branch`) | `psalm_118_25_26` | John 12:13 | In the Maccabean era, palm branches became a symbol of Jewish national liberation and celebration (1 Maccabees 13:51 — Simon Maccabeus's entry into the Jerusalem citadel, 141 BC). The crowd was making a political and spiritual statement — this man is our king and deliverer. |
| Cut Rope at the Tethering Post (`rope_fibers`) | - | Mark 11:2 | Jesus specified it must be a colt 'no one has ever ridden' — in Jewish law, an animal used for sacred purposes must be one that has not been used for common work (Numbers 19:2; Deuteronomy 21:3). This detail proves the act was religiously intentional, not criminal. |
| Pharisee's Written Complaint (`crowd_testimony`) | `malachi_3_1` | Luke 19:39–40 | Malachi 3:1 prophesied that the Lord would 'suddenly come to his temple.' The Triumphal Entry was the formal, public procession *to* the Temple. The Pharisees' panic was a reaction to seeing the Messianic procession heading directly for the house of God, heralding the imminent fulfillment of Malachi's prophecy. |
| Psalm 118:25–26 Scroll Fragment (`psalm_118_25_26_scroll`) | `psalm_118_25_26` | Psalm 118:25–26 | Supplementary primary-source scroll evidence for this case's Psalm 118:25–26 fulfilment (paired with `palm_branch`). |
| Genesis 49:10–11 Scroll Fragment (`genesis_49_10_11_scroll`) | `genesis_49_10_11` | Genesis 49:10–11 | Supplementary primary-source scroll evidence for this case's Genesis 49:10–11 fulfilment (paired with `cloaks`). |
| Malachi 3:1 Scroll Fragment (`malachi_3_1_scroll`) | `malachi_3_1` | Malachi 3:1 | Supplementary primary-source scroll evidence for this case's Malachi 3:1 fulfilment (paired with `crowd_testimony`). |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Two Disciples' Cloaks (`cloaks`) | Mark 11:7 | mark_11_7 |
| Two Disciples' Cloaks (`cloaks`) | 2 Kings 9:13 | 2_kings_9_13 |
| Two Disciples' Cloaks (`cloaks`) | Genesis 49:10-11 | genesis_49_10_11 |
| Fresh Hoofprints (`donkey_tracks`) | Luke 19:35-36 | luke_19_35_36 |
| Fresh Hoofprints (`donkey_tracks`) | Ezekiel 44:1-3 | ezekiel_44_1_3 |
| Villager's Testimony (`witness_account`) | Mark 11:3-6 | mark_11_3_6 |
| Villager's Testimony (`witness_account`) | Exodus 12:3-6 | exodus_12_3_6 |
| Zechariah 9:9 Scroll Fragment (`prophecy_scroll`) | Matthew 21:4-5 | matthew_21_4_5 |
| Zechariah 9:9 Scroll Fragment (`prophecy_scroll`) | Zechariah 9:9 | zechariah_9_9 |
| Fresh-Cut Palm Branch (`palm_branch`) | John 12:13 | john_12_13 |
| Fresh-Cut Palm Branch (`palm_branch`) | Psalm 118:25-26 | psalm_118_25_26 |
| Fresh-Cut Palm Branch (`palm_branch`) | 1 Maccabees 13:51 | 1_maccabees_13_51 |
| Cut Rope at the Tethering Post (`rope_fibers`) | Mark 11:2 | mark_11_2 |
| Cut Rope at the Tethering Post (`rope_fibers`) | Numbers 19:2 | numbers_19_2 |
| Cut Rope at the Tethering Post (`rope_fibers`) | Deuteronomy 21:3 | deuteronomy_21_3 |
| Pharisee's Written Complaint (`crowd_testimony`) | Luke 19:39-40 | luke_19_39_40 |
| Pharisee's Written Complaint (`crowd_testimony`) | John 12:19 | john_12_19 |
| Pharisee's Written Complaint (`crowd_testimony`) | Malachi 3:1 | malachi_3_1 |

## act2CaseD — The Anointing at Bethany (New Investigation Chain)

### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Exodus 12:1–14 | `typology_passover_lamb` | Typological Fulfilment |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Passover Lamb Market Records (`lamb_records`) | - | Exodus 12:3–6 | This ledger is the background pattern the whole case is built on: every Passover lamb in the city was selected days in advance and kept under watch, inspected daily, before being sacrificed at twilight on the fourteenth. It's the template the investigator needs before the rest of the evidence makes sense. |
| Temple Inspection Notes (`inspection_notes`) | `typology_passover_lamb` | Mark 11:27–33 | The Passover lamb was inspected for blemishes for four days before it was sacrificed (Exodus 12:5). Jesus's public cross-examination in the Temple courts served the same function: every faction of religious authority took their turn testing Him, and none could find a fault to charge Him with. |
| Flask of Pure Nard (`nard_flask`) | `typology_passover_lamb` | John 12:3 | The anointing of Jesus's feet with expensive perfume was an act of profound worship. In the Old Testament, anointing with oil consecrated kings (1 Samuel 16:13) and priests (Exodus 30:30) for service. This act sets Jesus apart as the Messiah (the "Anointed One") and, as Jesus Himself stated, prepares His body "beforehand for burial" (Mark 14:8). |
| Broken Alabaster Jar (`alabaster_jar`) | `typology_passover_lamb` | Matthew 26:6–7 | The anointing of Jesus's head directly mirrors the way kings like Saul and David were anointed, signifying His royal authority. It also serves as a prophetic act of consecration, setting Him apart as the ultimate High Priest and King who would offer Himself as the final sacrifice. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Passover Lamb Market Records (`lamb_records`) | Exodus 12:3-6 | exodus_12_3_6 |
| Temple Inspection Notes (`inspection_notes`) | Mark 11:27-33 | mark_11_27_33 |
| Temple Inspection Notes (`inspection_notes`) | Exodus 12:5 | exodus_12_5 |
| Flask of Pure Nard (`nard_flask`) | John 12:1-3 | john_12_1_3 |
| Flask of Pure Nard (`nard_flask`) | Mark 14:8 | mark_14_8 |
| Flask of Pure Nard (`nard_flask`) | 1 Samuel 16:13 | 1_samuel_16_13 |
| Flask of Pure Nard (`nard_flask`) | Exodus 30:30 | exodus_30_30 |
| Broken Alabaster Jar (`alabaster_jar`) | Matthew 26:6-7 | matthew_26_6_7 |
| Broken Alabaster Jar (`alabaster_jar`) | 1 Samuel 16:13 | 1_samuel_16_13 |

## act1CaseB — The Overturned Tables

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Malachi 3:1 | `malachi_3_1` |
| Isaiah 56:7 | `isaiah_56_7` |
| Psalm 69:9 | `psalm_69_9` | Prophecy |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Shattered Dove Cages (`broken_cages`) | `isaiah_56_7` | Leviticus 5:7 | Isaiah 56:7 — 'My house shall be called a house of prayer for all nations' — is the prophecy Jesus explicitly quoted as He drove out the sellers. The dove trade was the clearest abuse of it: Leviticus 5:7 allows doves as a concession for poverty, yet the priests exploited this legal requirement with exorbitant commercial markups, locking the poor and the nations out of the very prayer court Isaiah said was for them. That exploitation directly triggered Jesus's anger. |
| Scattered Tyrian Shekels (`scattered_shekels`) | `malachi_3_1` | Exodus 30:13 | Exodus 30:13 required a half-shekel temple offering. The priests exploited this by mandating Tyrian shekels, forcing pilgrims to pay massive exchange fees. |
| Discarded Whip of Cords (`whip_of_cords`) | `malachi_3_1` | John 2:15 | Malachi 3:1-3 describes the Lord's coming as a 'refiner's fire' that purifies. The whip of cords was the physical instrument of that refining judgment, used to drive out the corruption from His Father's house. |
| Disciples' Recollection (`disciples_recollection`) | `psalm_69_9` | John 2:17 | After the event, the disciples themselves connected Jesus's fiery passion to this specific prophecy: 'His disciples remembered that it was written, "Zeal for your house will consume me."' |
| Malachi 3:1 Scroll Fragment (`malachi_3_1_b_scroll`) | `malachi_3_1` | Malachi 3:1 | Supplementary primary-source scroll evidence for this case's Malachi 3:1 fulfilment (paired with `scattered_shekels` / `whip_of_cords`). |
| Isaiah 56:7 Scroll Fragment (`isaiah_56_7_scroll`) | `isaiah_56_7` | Isaiah 56:7 | Supplementary primary-source scroll evidence for this case's Isaiah 56:7 fulfilment (paired with `broken_cages`). |
| Psalm 69:9 Scroll Fragment (`psalm_69_9_scroll`) | `psalm_69_9` | Psalm 69:9 | Supplementary primary-source scroll evidence for this case's Psalm 69:9 fulfilment. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Shattered Dove Cages (`broken_cages`) | Leviticus 5:7 | leviticus_5_7 |
| Shattered Dove Cages (`broken_cages`) | Isaiah 56:7 | isaiah_56_7 |
| Scattered Tyrian Shekels (`scattered_shekels`) | Exodus 30:13 | exodus_30_13 |
| Scattered Tyrian Shekels (`scattered_shekels`) | Malachi 3:1 | malachi_3_1 |
| Discarded Whip of Cords (`whip_of_cords`) | John 2:15 | john_2_15 |
| Discarded Whip of Cords (`whip_of_cords`) | Malachi 3:1 | malachi_3_1 |

## act1CaseC — The Barren Fig Tree

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Micah 7:1 | `micah_7_1` |
| Jeremiah 8:13 | `jeremiah_8_13` |
| Psalm 33:8–9 | `psalm_33_8_9` |
| Zechariah 4:6–7 | `zechariah_4_6_7` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Description of the Fig Tree (Monday) (`cursed_fig_tree_desc`) | `micah_7_1` | Mark 11:12–14 | The tree's appearance—leaves but no fruit—symbolized Israel's outward show of religiosity without genuine spiritual fruit, echoing prophetic laments like Micah 7:1. |
| The Withered Fig Tree (Tuesday) (`withered_fig_tree_state`) | `jeremiah_8_13` | Mark 11:20–21 | The rapid, complete withering fulfilled prophecies of judgment on unfruitfulness, such as Jeremiah 8:13, where God threatens to remove fruit and wither leaves. |
| Peter's Astonished Reaction (`peter_astonishment`) | `psalm_33_8_9` | Mark 11:21 | Psalm 33:8-9 declares that all should stand in awe of Him because 'He spoke, and it came to be.' Peter’s reaction is the physical fulfillment of this reverence when confronted with divine command. |
| Jesus's Teaching on Faith (`disciples_faith_lesson`) | `zechariah_4_6_7` | Mark 11:22–24 | Zechariah 4:7 speaks of a 'mighty mountain' becoming 'level ground' by the Spirit. Jesus adopts this imagery to show that faith connects the believer to that same mountain-moving power. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Description of the Fig Tree (Monday) (`cursed_fig_tree_desc`) | Mark 11:12-14 | mark_11_12_14 |
| Description of the Fig Tree (Monday) (`cursed_fig_tree_desc`) | Micah 7:1 | micah_7_1 |
| The Withered Fig Tree (Tuesday) (`withered_fig_tree_state`) | Mark 11:20-21 | mark_11_20_21 |
| The Withered Fig Tree (Tuesday) (`withered_fig_tree_state`) | Jeremiah 8:13 | jeremiah_8_13 |
| Peter's Astonished Reaction (`peter_astonishment`) | Mark 11:21 | mark_11_21 |
| Peter's Astonished Reaction (`peter_astonishment`) | Psalm 33:8-9 | psalm_33_8_9 |
| Jesus's Teaching on Faith (`disciples_faith_lesson`) | Mark 11:22-24 | mark_11_22_24 |
| Jesus's Teaching on Faith (`disciples_faith_lesson`) | Zechariah 4:6-7 | zechariah_4_6_7 |
| Jesus's Teaching on Faith (`disciples_faith_lesson`) | Zechariah 4:7 | zechariah_4_7 |

## act2CaseA — The Silenced Teacher

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Psalm 118:22–23 | `psalm_118_22_23` |
| Isaiah 5:1–7 | `isaiah_5_1_7` |
| Daniel 7:13–14 | `daniel_7_13_14` |
| Malachi 3:1 | `malachi_3_1` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Formal Authority Challenge (`question_scroll`) | `malachi_3_1` | Matthew 21:23 | Malachi 3:1 predicted the Lord coming to His temple with authority. The irony of the challenge is that they were asking for credentials from the very One whose authority derived directly from God. |
| Sketch of the Vineyard Parable (`parable_fragments`) | `isaiah_5_1_7` | Matthew 21:33–45 | Isaiah 5:1–7 is the Song of the Vineyard — God's lament over Israel's unfaithfulness. Jesus deliberately echoed it. The bystander sketching this recognised the connection immediately. |
| Rejected Cornerstone Fragment (`cornerstone_carving`) | `psalm_118_22_23` | Matthew 21:42 | Psalm 118:22–23 was a coronation Psalm, used at Temple dedications. Jesus quoted it at the very Temple whose builders were rejecting Him. The rejected stone lying in the construction debris became a powerful object lesson for anyone listening. |
| Denarius of Tiberius Caesar (`coin_of_caesar`) | - | Matthew 22:19–21 | The coin bore Caesar's image (imago). Jesus's answer pointed to something deeper: humanity bears God's image (Genesis 1:26–27, imago Dei). The coin question about taxation became a profound statement about identity and allegiance — Caesar's image on metal; God's image on people. |
| Withered Fig Leaf (`fig_leaf_withered`) | - | Mark 11:20–21 | Micah 7:1 and Jeremiah 8:13 both use a barren fig tree as a symbol for Israel's spiritual fruitlessness. Hosea 9:10 says 'Like grapes in the wilderness, I found Israel.' The withered tree was a living parable — the judgement Jesus described in His Temple parables had already begun in miniature on the roadside. |
| Two Leptons (Widow's Mites) (`widow_two_coins`) | - | Mark 12:41–44 | 1 Samuel 16:7 — 'Man looks at the outward appearance, but the LORD looks at the heart.' The widow's offering is the practical demonstration of everything Jesus had been teaching against the religious leaders' showy piety. She gave all she had (100%); the wealthy gave from their surplus. |
| Temple Bystander's Written Account (`witness_scroll`) | `daniel_7_13_14` | Matthew 22:46 | Isaiah 11:2 promised the Messiah would have the 'Spirit of wisdom and understanding, the Spirit of counsel and might' — He would answer every challenge with perfect insight. The progressive silencing of each religious faction across one morning is the fulfilment of this promise made 700 years earlier. Daniel 7:13–14 foretold 'one like a son of man' coming with the clouds of heaven to receive an everlasting dominion — the title 'Son of Man' Jesus used for Himself throughout these exchanges. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| The Formal Authority Challenge (`question_scroll`) | Matthew 21:23 | matthew_21_23 |
| The Formal Authority Challenge (`question_scroll`) | Malachi 3:1 | malachi_3_1 |
| Sketch of the Vineyard Parable (`parable_fragments`) | Matthew 21:33-45 | matthew_21_33_45 |
| Sketch of the Vineyard Parable (`parable_fragments`) | Isaiah 5:1-7 | isaiah_5_1_7 |
| Rejected Cornerstone Fragment (`cornerstone_carving`) | Matthew 21:42 | matthew_21_42 |
| Rejected Cornerstone Fragment (`cornerstone_carving`) | Psalm 118:22-23 | psalm_118_22_23 |
| Denarius of Tiberius Caesar (`coin_of_caesar`) | Matthew 22:19-21 | matthew_22_19_21 |
| Denarius of Tiberius Caesar (`coin_of_caesar`) | Genesis 1:26-27 | genesis_1_26_27 |
| Withered Fig Leaf (`fig_leaf_withered`) | Mark 11:20-21 | mark_11_20_21 |
| Withered Fig Leaf (`fig_leaf_withered`) | Micah 7:1 | micah_7_1 |
| Withered Fig Leaf (`fig_leaf_withered`) | Jeremiah 8:13 | jeremiah_8_13 |
| Withered Fig Leaf (`fig_leaf_withered`) | Hosea 9:10 | hosea_9_10 |
| Two Leptons (Widow's Mites) (`widow_two_coins`) | Mark 12:41-44 | mark_12_41_44 |
| Two Leptons (Widow's Mites) (`widow_two_coins`) | Samuel 16:7 | samuel_16_7 |
| Temple Bystander's Written Account (`witness_scroll`) | Matthew 22:46 | matthew_22_46 |
| Temple Bystander's Written Account (`witness_scroll`) | Isaiah 11:2 | isaiah_11_2 |
| Temple Bystander's Written Account (`witness_scroll`) | Daniel 7:13-14 | daniel_7_13_14 |

## act2CaseB — The Price of Life

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Isaiah 25:8 | `isaiah_25_8` |
| Psalm 78:2 | `psalm_78_2` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Bethany Pilgrim Manifest (`crowd_report`) | - | John 12:9 notes that a large crowd found out Jesus was there and came not only because of Him, but also to see Lazarus, whom He had raised. | - |
| Bethany Limestone Dust (`grave_dirt`) | `isaiah_25_8` | John 11:39 records Martha's objection that after four days there would already be a bad odor | - |
| Intercepted Sadducean Memorandum (`secret_decree`) | - | John 12:10–11 explicitly validates this conspiracy: 'So the chief priests made plans to put Lazarus to death as well.' | - |
| Galilean Pilgrim's Testimony (`hidden_treasure_testimony`) | `psalm_78_2` | Matthew 13:34–35 records that Jesus 'did not say anything to them without using a parable,' fulfilling what was spoken through the prophet: 'I will open my mouth in parables, I will utter things hidden since the creation of the world.' | A pilgrim in the Bethany crowd who once heard Jesus teach the Parable of the Hidden Treasure (Matthew 13:44) by the Sea of Galilee now recognises the pattern: a treasure once hidden, now found — the same shape as a life once sealed in a tomb, now walking free. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Bethany Pilgrim Manifest (`crowd_report`) | John 12:9 | john_12_9 |
| Bethany Limestone Dust (`grave_dirt`) | John 11:39 | john_11_39 |
| Intercepted Sadducean Memorandum (`secret_decree`) | John 12:10-11 | john_12_10_11 |
| Thomas's Recollection of the Parable of the Weeds (`parable_notes`) | Matthew 13:24-30, 36-43 | matt_13_24 |
| Thomas's Recollection of the Parable of the Weeds (`parable_notes`) | Matthew 13:34-35 | matt_13_34 |

### NPC — New

**Thomas (Parable)** (`parable_meaning`, shares `profileFile: "thomas"` with the `parable_vineyard` NPC in Act I)
- `bibleRef`: Matthew 13:24-30, 36-43; Matthew 13:34-35
- `storyFile`: `parable_meaning` (new Ink story — Thomas recounts the Parable of the Weeds)
- `unlocksEvidence`: `["parable_notes"]`
- `revealsProphecy`: `psalm_78_2`
- Narrative role: explains why Jesus taught in parables that night (fulfilling Psalm 78:2), and draws the parallel between the parable's "enemy sowing weeds by night" and the Sanhedrin's own secret decree against Lazarus.

## act2CaseC — The End of the Age

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Daniel 9:27 | `daniel_9_27` |
| Joel 2:30–31 | `joel_2_30_31` |
| Isaiah 13:10 | `isaiah_13_10` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| View of the Temple from Olivet (`temple_overlook_view`) | - | Matthew 24:1–2 | The physical setting directly inspired the disciples' questions about the Temple's fate, linking Jesus's words to the tangible structure before them. |
| Disciples' Questions (Written Notes) (`disciples_questions_notes`) | `daniel_9_27` | Matthew 24:3 | These questions frame the entire discourse, revealing the disciples' immediate concerns about timing and signs, which Jesus then addresses with detailed prophecies. |
| Parable of the Ten Virgins (Notes) (`parable_of_virgins_notes`) | - | Matthew 25:1–13 | This parable underscores the theme of watchfulness, a recurring motif in eschatological prophecies, urging believers to be ready for the unexpected timing of the Lord's return. |
| Old Testament Cosmic Sign References (`cosmic_signs_references`) | `joel_2_30_31` | Matthew 24:29 | Jesus's use of these ancient prophecies demonstrates the continuity of God's plan and the fulfillment of long-foretold cosmic disturbances as signs of the end. |
| Darkened Sun Record (`darkened_sun_record`) | `isaiah_13_10` | Matthew 24:29 | Isaiah 13:10 foretells the darkening of the heavenly lights. Jesus quotes this same imagery when describing the signs preceding His return. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| View of the Temple from Olivet (`temple_overlook_view`) | Matthew 24:1-2 | matthew_24_1_2 |
| Disciples' Questions (Written Notes) (`disciples_questions_notes`) | Matthew 24:3 | matthew_24_3 |
| Parable of the Ten Virgins (Notes) (`parable_of_virgins_notes`) | Matthew 25:1-13 | matthew_25_1_13 |
| Old Testament Cosmic Sign References (`cosmic_signs_references`) | Matthew 24:29 | matthew_24_29 |
| Darkened Sun Record (`darkened_sun_record`) | Matthew 24:29 | matthew_24_29 |
| Darkened Sun Record (`darkened_sun_record`) | Isaiah 13:10 | isaiah_13_10 |

## act3CaseA — The Broken Cup

### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Exodus 12:1–14 | `exodus_12_1_14` | Prophecy |
| Jeremiah 31:31–34 | `jeremiah_31_31_34` | Prophecy |
| Psalm 41:9 | `psalm_41_9` | Prophecy |
| Zechariah 11:12–13 | `zechariah_11_12_13` | Prophecy |
| Isaiah 53:12 | `isaiah_53_12` | Prophecy |
| Genesis 14:18-20 | `typology_melchizedek` | Typological Fulfilment |
| Zechariah 13:7 | `zechariah_13_7` | Prophecy |
| Psalm 22:16 | `psalm_22_16_18` | Prophecy |

> **⚠️ Confirmed bug — orphaned entry:** `amos_8_9` (darkness at noon) was defined here but never used by any evidence item or NPC in this case — pure dead weight, likely a copy-paste from `crucifixion_site`, where it's fully built (Pashhur reveals it there). No natural Last Supper scene fits it as foreshadowing. Fix: delete the entry outright — drafted in `patch4_amos_ezekiel_id_fix.js`.

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Unleavened Bread Crumbs (`bread_crumbs`) | `exodus_12_1_14` | Matthew 26:26 | The breaking of the matzah is called the 'afikomen' in the Passover Seder — traditionally hidden and later 'found' again. Early Christians saw this as a picture of Jesus's death and resurrection: broken, buried, and found alive. |
| Spilled Wine on the Linen (`wine_stain`) | `jeremiah_31_31_34` | Luke 22:20 | The third Passover cup — the Cup of Redemption — is the one Jesus transformed into the cup of the New Covenant (Jeremiah 31:31-34). |
| Spilled Wine on the Linen (`wine_stain`) | `typology_melchizedek` | Luke 22:20 | Melchizedek, the priest-king of Salem, blessed Abraham with bread *and* wine (Genesis 14:18). Jesus, as the ultimate priest-king (Hebrews 7), uses both elements to establish the New Covenant. The bread (`bread_crumbs`) begins the typology; the wine (`wine_stain`) completes it. |
| Shattered Clay Cup (`cup_fragments`) | - | Matthew 26:27 | Breaking pottery in the Jewish tradition was sometimes associated with mourning or the breaking of a covenant (see Jeremiah 19:10–11, where Jeremiah shattered a clay jar as a prophetic act of judgement). A broken cup at the Passover table carries heavy symbolic weight. |
| Large Stone Water Jug (`water_jug`) | - | John 13:4–5 | Isaiah 52:13–15 describes the Servant who 'shall startle many nations' — and immediately before this, is described as one who acts in a way that astonishes because of His humility. Jesus washing feet with this water fulfilled the spirit of what Isaiah described: the exalted One taking the lowest role. |
| Imprint of a Money Bag (`money_bag_impression`) | `zechariah_11_12_13` | John 13:29 | Judas carried the communal purse — and had recently agreed to betray Jesus for 30 silver coins (Matthew 26:14–16), fulfilling Zechariah 11:12. The presence of a money bag impression at the preparation table raises serious questions: what was Judas counting before the meal? |
      | Roman Nail (`roman_nail`) | `psalm_22_16_18` | John 20:25 | Psalm 22:16 prophesied 'they have pierced my hands and my feet.' This was written centuries before crucifixion was invented. |
| Fragment of Sop (Dipped Bread) (`betrayal_dipped_bread`) | `psalm_41_9` | John 13:26–30 | The giving of the dipped sop to Judas is the fulfilment of Psalm 41:9 ('even my close friend... who ate my bread has lifted his heel against me'). Jesus quoted this Psalm earlier that evening (John 13:18), identifying the traitor through an act of table fellowship. |
| Written Summary of Jesus's Words (`new_covenant_declaration`) | `jeremiah_31_31_34` | Luke 22:19–20; 1 Corinthians 11:24–25 | Jeremiah 31:31–34 promised a 'new covenant' that would supersede the Mosaic Law — written on hearts, not stone. Jesus announced its establishment at this very table. The young scribe recording His words was preserving the fulfilment of a 600-year-old prophecy. |
| List of the Twelve (`twelve_roll`) | `isaiah_53_12` | Luke 22:37 | Jesus explicitly applies Isaiah 53:12 ('numbered with the transgressors') to Himself during the Last Supper. |
| Account of the Rooster Warning (`denial_foretold`) | `zechariah_13_7` | Matthew 26:31-35 | Jesus quotes Zechariah 13:7 directly — 'I will strike the shepherd, and the sheep of the flock will be scattered' — before adding an even more specific prediction naming Peter and a number: three denials, before the rooster crows. Peter's confident vow makes the prophecy's exactness, and his failure to keep it hours later, all the sharper. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Unleavened Bread Crumbs (`bread_crumbs`) | Matthew 26:26 | matthew_26_26 |
| Unleavened Bread Crumbs (`bread_crumbs`) | Exodus 12:1-14 | exodus_12_1_14 |
| Spilled Wine on the Linen (`wine_stain`) | Luke 22:20 | luke_22_20 |
| Spilled Wine on the Linen (`wine_stain`) | Jeremiah 31:31-34 | jeremiah_31_31_34 |
| Spilled Wine on the Linen (`wine_stain`) | Exodus 6:6-7 | exodus_6_6_7 |
| Spilled Wine on the Linen (`wine_stain`) | Genesis 14:18-20 | genesis_14_18_20 |
| Shattered Clay Cup (`cup_fragments`) | Matthew 26:27 | matthew_26_27 |
| Shattered Clay Cup (`cup_fragments`) | Jeremiah 19:10-11 | jeremiah_19_10_11 |
| Large Stone Water Jug (`water_jug`) | John 13:4-5 | john_13_4_5 |
| Large Stone Water Jug (`water_jug`) | Isaiah 52:13-15 | isaiah_52_13_15 |
| Imprint of a Money Bag (`money_bag_impression`) | John 13:29 | john_13_29 |
| Imprint of a Money Bag (`money_bag_impression`) | Matthew 26:14-16 | matthew_26_14_16 |
| Imprint of a Money Bag (`money_bag_impression`) | Zechariah 11:12 | zechariah_11_12 |
| Fragment of Sop (Dipped Bread) (`betrayal_dipped_bread`) | John 13:26-30 | john_13_26_30 |
      | Roman Nail (`roman_nail`) | John 20:25 | john_2025 |
      | Roman Nail (`roman_nail`) | Psalm 22:16 | psalm_2216 |
| Fragment of Sop (Dipped Bread) (`betrayal_dipped_bread`) | Psalm 41:9 | psalm_41_9 |
| Fragment of Sop (Dipped Bread) (`betrayal_dipped_bread`) | John 13:18 | john_13_18 |
| Written Summary of Jesus's Words (`new_covenant_declaration`) | Luke 22:19-20 | luke_22_19_20 |
| Written Summary of Jesus's Words (`new_covenant_declaration`) | Corinthians 11:24-25 | corinthians_11_24_25 |
| Written Summary of Jesus's Words (`new_covenant_declaration`) | Jeremiah 31:31-34 | jeremiah_31_31_34 |
| List of the Twelve (`twelve_roll`) | Luke 22:37 | luke_22_37 |
| List of the Twelve (`twelve_roll`) | Isaiah 53:12 | isaiah_53_12 |
| Account of the Rooster Warning (`denial_foretold`) | Matthew 26:31-35 | matthew_263135 |
| Account of the Rooster Warning (`denial_foretold`) | Mark 14:27-31 | mark_142731 |
| Account of the Rooster Warning (`denial_foretold`) | Luke 22:31-34 | luke_223134 |
| Account of the Rooster Warning (`denial_foretold`) | John 13:36-38 | john_133638 |
| Account of the Rooster Warning (`denial_foretold`) | Zechariah 13:7 | zechariah_137 |

## act3CaseB — The Severed Ear

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Zechariah 13:7 | `zechariah_13_7` |
| Isaiah 53:7 | `isaiah_53_7` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Abandoned Linen Wrapper (`abandoned_linen`) | `zechariah_13_7` | Mark 14:51-52 | Zechariah 13:7 — 'Strike the shepherd, and the sheep will be scattered' — was quoted by Jesus himself just hours earlier (Matthew 26:31) as a prediction of this exact moment. The unnamed young man fleeing naked into the night, abandoning even his clothing, is the most vivid single image of the disciples' scattering the prophecy foretold. |
| Extinguished Roman Torch (`dropped_torch`) | - | John 18:3 | John 18:3 notes they arrived with torches and lanterns, expecting a deep-woods manhunt. |
| Bloodied Scarf Fragment (`severed_ear_wrap`) | - | John 18:10 | Luke 22:50–51 and John 18:10 document Peter cutting off Malchus's ear, which Jesus immediately healed. |
| Unresisting Prisoner's Cord (`prisoner_cord`) | `isaiah_53_7` | Matthew 26:52–54 | Jesus refuses armed resistance and willingly submits to arrest, embodying the silent Lamb led to slaughter as prophesied in Isaiah 53:7. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Abandoned Linen Wrapper (`abandoned_linen`) | Mark 14:51-52 | mark_14_51_52 |
| Abandoned Linen Wrapper (`abandoned_linen`) | Zechariah 13:7 | zechariah_13_7 |
| Abandoned Linen Wrapper (`abandoned_linen`) | Matthew 26:31 | matthew_26_31 |
| Extinguished Roman Torch (`dropped_torch`) | John 18:3 | john_18_3 |
| Bloodied Scarf Fragment (`severed_ear_wrap`) | John 18:10 | john_18_10 |
| Bloodied Scarf Fragment (`severed_ear_wrap`) | Luke 22:50-51 | luke_22_50_51 |
| Unresisting Prisoner's Cord (`prisoner_cord`) | Matthew 26:52-54 | matthew_26_52_54 |
| Unresisting Prisoner's Cord (`prisoner_cord`) | Isaiah 53:7 | isaiah_53_7 |

## act3CaseC — The Midnight Tribunal

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Isaiah 50:6 | `isaiah_50_6` |
| Micah 5:1 | `micah_5_1` |
| Psalm 27:12 | `psalm_27_12` |
| Psalm 35:11 | `psalm_35_11` |
| Psalm 22:7–8 | `psalm_22_7_8` |
| Psalm 38:11 | `psalm_38_11` |

> **⚠️ Confirmed bug (matches the gap flagged in message 1 of this thread):** `torn_robe`'s `relatedProphecy` is `isaiah_50_6`, but its content — Caiaphas ritually tearing his own robe over the blasphemy verdict — has nothing to do with Isaiah 50:6 ("I offered my back to those who beat me... mocking and spitting"). That means **Isaiah 50:6 has zero real evidence in this case**, despite appearing in `truth.prophesyFulfilled`. The mislabel cascades into the deduction `"torn_robe+false_scroll"`, which also incorrectly claims `revealsProphecy: "isaiah_50_6"`, **and into the "Greater Atonement" Hidden Detective Chain** in `Game_Case___Lab_Reference.md`, which also cites `torn_robe` as representing Isaiah 50:6. There's also a literal duplicate of the `isaiah_50_6` prophecy object in this case's `prophecies` array (copy-pasted twice, byte-identical). Separately, `Psalm 35:11` *does* have real, working evidence (`perjured_testimony`) but is missing from `truth.prophesyFulfilled` — a plain omission. Full fix drafted in `act3_case_sanhedrin_isaiah_50_6_patch.js`: dedupe the prophecy entry, clear `torn_robe`'s mislabel, add a new evidence item (`spittle_stained_blindfold`, Mark 14:65) that actually fulfils Isaiah 50:6, fix the cascaded deduction, and add Psalm 35:11 to the fulfilled list. No new Ink file needed — this case's evidence is scene-pickup only, not NPC-gated (`npcs` here unlock *suspects* for interrogation, not evidence).

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Rooster Feather (`rooster_feather`) | `-` | Matthew 26:74-75 | The third denial led to the third crowing, fulfilling Jesus's own prediction of Peter's failure (Matthew 26:34). Supporting/narrative evidence — not directly Codex-linkable to one of this case's four defined prophecies. |
| Priestly Robe Fragment (`torn_robe`) | ~~`isaiah_50_6`~~ → *(none — see gap note above)* | Matthew 26:65 | Caiaphas tore his robes to signal blasphemy when Jesus affirmed His divinity. |
| 🆕 Spittle-Stained Blindfold (`spittle_stained_blindfold`) | `isaiah_50_6` | Mark 14:65 | Fulfills Isaiah 50:6 precisely: 'I offered my back to those who beat me... I did not hide my face from mocking and spitting.' Distinct from the Guard's Reed (Micah 5:1) — spitting and blindfolding, matched clause for clause. |
| Conflicting Depositions (`false_scroll`) | `psalm_27_12` | Mark 14:56-59 | The lack of consistent testimony exposes the trial as a fabrication. |
| Charcoal Briquette (`charcoal_remains`) | - | John 18:18 | Peter's denial by the fire fulfilled Jesus's prediction that he would deny three times. |
| Guard's Reed (`guard_reed`) | `micah_5_1` | Matthew 26:67–68 | Micah 5:1 prophesied that Israel's ruler would be struck. The guards' mockery with the reed is a literal fulfillment of this humiliation. |
| Perjured Witness Statement (`perjured_testimony`) | `psalm_35_11` | Mark 14:57–59 | 'Ruthless witnesses come forward' precisely matches the false testimony at the trial, as prophesied in Psalm 35:11. |
| Servant Girl's Accusation (`first_denial_account`) | - | Matthew 26:69-70 | This is the first of the three denials Jesus predicted hours earlier at the Supper — a low-stakes accusation from a servant girl, met with an immediate, flat denial. |
| Second Bystander's Accusation (`second_denial_account`) | - | Matthew 26:71-72 | The second of the three predicted denials — and the pattern is worsening. What began as a simple denial has now become a sworn oath. |
| Witness to Peter's Departure (`peters_bitter_weeping`) | - | Luke 22:61-62 | This is the moment the prophecy lands. Peter does not need to be told what he has done — a single look is enough. The man who swore he would never disown Jesus breaks down completely. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Rooster Feather (`rooster_feather`) | Matthew 26:74-75 | matthew_26_74_75 |
| Rooster Feather (`rooster_feather`) | Zechariah 13:7 | zechariah_13_7 |
| Rooster Feather (`rooster_feather`) | Matthew 26:34 | matthew_26_34 |
| Priestly Robe Fragment (`torn_robe`) | Matthew 26:65 | matthew_26_65 |
| Priestly Robe Fragment (`torn_robe`) | Isaiah 50:6 | isaiah_50_6 |
| Conflicting Depositions (`false_scroll`) | Mark 14:56-59 | mark_14_56_59 |
| Conflicting Depositions (`false_scroll`) | Psalm 27:12 | psalm_27_12 |
| Charcoal Briquette (`charcoal_remains`) | John 18:18 | john_18_18 |
| Guard's Reed (`guard_reed`) | Matthew 26:67-68 | matthew_26_67_68 |
| Guard's Reed (`guard_reed`) | Micah 5:1 | micah_5_1 |
| Perjured Witness Statement (`perjured_testimony`) | Mark 14:57-59 | mark_14_57_59 |
| Perjured Witness Statement (`perjured_testimony`) | Psalm 35:11 | psalm_35_11 |
| 🆕 Spittle-Stained Blindfold (`spittle_stained_blindfold`) | Mark 14:65 | mark_14_65 |
| 🆕 Spittle-Stained Blindfold (`spittle_stained_blindfold`) | Isaiah 50:6 | isaiah_50_6 |
| Perjured Witness Statement (`perjured_testimony`) | Psalm 35:11 | psalm_35_11 |
| Servant Girl's Accusation (`first_denial_account`) | Matthew 26:69-70 | matthew_266970 |
| Servant Girl's Accusation (`first_denial_account`) | Mark 14:66-68 | mark_146668 |
| Servant Girl's Accusation (`first_denial_account`) | John 18:15-17 | john_181517 |
| Servant Girl's Accusation (`first_denial_account`) | Matthew 26:34 | matthew_2634 |
| Second Bystander's Accusation (`second_denial_account`) | Matthew 26:71-72 | matthew_267172 |
| Second Bystander's Accusation (`second_denial_account`) | Mark 14:69-70 | mark_146970 |
| Second Bystander's Accusation (`second_denial_account`) | Luke 22:58 | luke_2258 |
| Second Bystander's Accusation (`second_denial_account`) | Matthew 26:34 | matthew_2634 |
| Witness to Peter's Departure (`peters_bitter_weeping`) | Luke 22:61-62 | luke_226162 |
| Witness to Peter's Departure (`peters_bitter_weeping`) | Matthew 26:34 | matthew_2634 |
| Witness to Peter's Departure (`peters_bitter_weeping`) | Matthew 26:33 | matthew_2633 |

## act3CaseD — The People's Choice

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Isaiah 53:3 | `isaiah_53_3` |
| Psalm 2:1-2 | `psalm_2_1_2` |
| Psalm 22:7–8 | `psalm_22_7_8` |
| Psalm 38:11 | `psalm_38_11` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Governor's Silver Basin (`pilates_basin`) | - | Matthew 27:24 | - |
| Claudia's Warning Scroll (`wifes_letter`) | - | Matthew 27:19 | - |
| The Insurgent's Dossier (`barabbas_warrant`) | `isaiah_53_3` | Mark 15:7; John 18:40 | - |
| Joint Verdict Scroll (`joint_verdict`) | `psalm_2_1_2` | Luke 23:12 | Herod and Pilate become allies against God's Anointed, fulfilling Psalm 2's prophecy of rulers banding together against the LORD. |
| Joint Verdict Scroll (`joint_verdict`) | `psalm_2_1_2` | Psalm 2:1-2 | Herod and Pilate become allies against God's Anointed, fulfilling Psalm 2's prophecy of rulers banding together against the LORD. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| The Governor's Silver Basin (`pilates_basin`) | Matthew 27:24 | matthew_27_24 |
| Claudia's Warning Scroll (`wifes_letter`) | Matthew 27:19 | matthew_27_19 |
| The Insurgent's Dossier (`barabbas_warrant`) | Mark 15:7 | mark_15_7 |
| The Insurgent's Dossier (`barabbas_warrant`) | John 18:40 | john_18_40 |
| Joint Verdict Scroll (`joint_verdict`) | Luke 23:12 | luke_23_12 |
| Joint Verdict Scroll (`joint_verdict`) | Psalm 2:1-2 | psalm_2_1_2 |

## act3CaseE — The Final Sacrifice

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Psalm 22:16–18 | `psalm_22_16_18` |
| Amos 8:9 | `amos_8_9` |
| Isaiah 53:9 | `isaiah_53_9` |
| Zechariah 12:10 | `zechariah_12_10` |
| Psalm 34:20 | `psalm_34_20` |
| Psalm 31:5 | `psalm_31_5` |
| Psalm 69:21 | `psalm_69_21` |
| Jeremiah 31:31–34 | `jeremiah_31_31_34` |
| Haggai 2:6–7 | `haggai_2_6_7` |
| Psalm 22:1 | `psalm_22_1` |
| Psalm 22:7–8 | `psalm_22_7_8` |
| Psalm 38:11 | `psalm_38_11` |

> **✅ Gap drafted (pending merge):** Isaiah 53:12 is not yet defined as a prophecy for this case in `act3_case.js` — even though `truth.prophesyFulfilled` for `crucifixion_site` already lists "Isaiah 53:12," meaning the code makes this claim without backing it. It's currently foretold only at the Last Supper (`act3CaseA`, evidence `twelve_roll` — Jesus applying the verse to Himself in advance). The fix has been drafted (prophecy object, two evidence items, a new witness NPC, and a lab deduction) in `act3_case_crucifixion_isaiah_53_12_patch.js`, with the matching Ink dialogue in `penitent_thief.ink`. See the addition at the end of this section.

> **✅ Gap drafted (pending merge):** `execution_guard` was a dialogue stub (no `unlocksEvidence`) despite Holy_Week.md documenting him as the intended owner of `sour_wine_sponge`, `final_words`, and `unbroken_legs` — leaving all three with no NPC unlock path in the actual code. Also adds the missing `crucifixion_nails` evidence (Psalm 22:16, "pierced my hands and feet" — the piercing itself was never backed by evidence; only the garment-gambling half of the verse, v.18, was). Fleshed-out NPC and new evidence are in `act3_case_crucifixion_stub_npc_patch.js` / `guard_report_crucifixion.ink`.

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Soldiers' Casting Dice (`split_dice`) | `psalm_22_16_18` | John 19:23–24 | Directly fulfills Psalm 22:18. While the victim hung dying, the indifferent execution detail executed a routine lottery for a high-quality, seamless tunic woven from top to bottom. |
| 🆕 Iron Crucifixion Nails (`crucifixion_nails`) | `psalm_22_16_18` | John 20:25 | Fulfills the piercing clause of Psalm 22:16 ('they have pierced my hands and my feet') — drafted in `act3_case_crucifixion_stub_npc_patch.js`. Previously `split_dice` was the only evidence linked to `psalm_22_16_18`, covering v.18 (garments) but not v.16 (the actual piercing). |
| Split Rocks (`split_rocks`) | `haggai_2_6_7` | Matthew 27:51 | The earthquake at the moment of death fulfilled Haggai's prophecy that God would 'shake the heavens and the earth,' signifying a world-altering divine event. |
| Blood-Stained Roman Hasta (`pierced_spear`) | `zechariah_12_10` | John 19:34 | Fulfills Zechariah 12:10 ('the one they have pierced') and protects the Passover Lamb requirement of Exodus 12:46 ('not one of its bones is to be broken'). The spear thrust proved the victim was already dead, making the leg-breaking unnecessary. |
| The Torn Temple Veil (`torn_temple_veil`) | `jeremiah_31_31_34` | Luke 23:45 | The Parokhet curtain blocked access to the Holy of Holies. Its top-to-bottom tear, occurring at the moment of death, fulfilled Jeremiah's promise of a New Covenant, granting direct access to the presence of God for all. |
| Joseph's Market Bill for Fine Linen (`linen_shroud_receipt`) | `isaiah_53_9` | Mark 15:46 | Fulfills Isaiah 53:9. Instead of being cast into the criminal dirt pits of Hinnom, Jesus was instantly reassigned to a wealthy man's private, rock-hewn garden tomb. |
| Sponge Soaked in Sour Wine (`sour_wine_sponge`) | `psalm_69_21` | John 19:28-29 | This act directly fulfills Psalm 69:21 ('...for my thirst they gave me sour wine to drink'). The deliberate mention of a hyssop branch also powerfully evokes the Passover (Exodus 12:22), where hyssop was used to apply the lamb's blood for salvation, identifying Jesus as the true Passover Lamb. |
| Unbroken Tibiae Report (`unbroken_legs`) | `psalm_34_20` | John 19:31–36 | Jesus' legs were not broken, fulfilling both the Passover Lamb requirement (Exodus 12:46) and the specific prophecy of Psalm 34:20. |
| Final Words Scroll (`final_words`) | `psalm_31_5` | Luke 23:46 | Jesus's final words from the cross are a direct quote from Psalm 31:5, a prayer of ultimate trust in God at the moment of death. He did not simply die — He willingly surrendered His life into the Father's hands, quoting Scripture with His last breath. |
| Transcript of the Aramaic Cry (`the_forsaken_cry`) | `psalm_22_1` | Matthew 27:46 | Jesus's cry is not a wordless scream but a precise quotation of the opening line of Psalm 22, written a thousand years earlier. Quoting an entire psalm by its first line was a common rabbinic practice — He was pointing His hearers to the whole psalm, including its ending of vindication. |
| Record of the Crowd's Taunt (`mocking_crowd_taunt`) | `psalm_22_7_8` | Matthew 27:43 | The mockers' taunt echoes Psalm 22:8 so closely it is almost a direct quotation, spoken by people with no apparent awareness they were reciting a thousand-year-old psalm about this very moment. |
| List of Those Watching From Afar (`distant_witnesses`) | `psalm_38_11` | Luke 23:49 | Psalm 38:11 describes the isolation of the sufferer: even friends and companions keep their distance because of his wounds. Luke's careful note that Jesus's own acquaintances 'stood at a distance' fulfills this pattern of grief-stricken avoidance precisely. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Soldiers' Casting Dice (`split_dice`) | John 19:23-24 | john_19_23_24 |
| Soldiers' Casting Dice (`split_dice`) | Psalm 22:18 | psalm_22_18 |
| Iron Crucifixion Nails (`crucifixion_nails`) | John 20:25 | john_20_25 |
| Iron Crucifixion Nails (`crucifixion_nails`) | Psalm 22:16 | psalm_22_16 |
| Split Rocks (`split_rocks`) | Matthew 27:51 | matthew_27_51 |
| Split Rocks (`split_rocks`) | Haggai 2:6-7 | haggai_2_6_7 |
| Blood-Stained Roman Hasta (`pierced_spear`) | John 19:34 | john_19_34 |
| Blood-Stained Roman Hasta (`pierced_spear`) | Zechariah 12:10 | zechariah_12_10 |
| Blood-Stained Roman Hasta (`pierced_spear`) | Exodus 12:46 | exodus_12_46 |
| The Torn Temple Veil (`torn_temple_veil`) | Luke 23:45 | luke_23_45 |
| The Torn Temple Veil (`torn_temple_veil`) | Jeremiah 31:31-34 | jeremiah_31_31_34 |
| Joseph's Market Bill for Fine Linen (`linen_shroud_receipt`) | Mark 15:46 | mark_15_46 |
| Joseph's Market Bill for Fine Linen (`linen_shroud_receipt`) | Isaiah 53:9 | isaiah_53_9 |
| Sponge Soaked in Sour Wine (`sour_wine_sponge`) | John 19:28-29 | john_19_28_29 |
| Sponge Soaked in Sour Wine (`sour_wine_sponge`) | Psalm 69:21 | psalm_69_21 |
| Sponge Soaked in Sour Wine (`sour_wine_sponge`) | Exodus 12:22 | exodus_12_22 |
| Unbroken Tibiae Report (`unbroken_legs`) | John 19:31-36 | john_19_31_36 |
| Unbroken Tibiae Report (`unbroken_legs`) | Psalm 34:20 | psalm_34_20 |
| Final Words Scroll (`final_words`) | Luke 23:46 | luke_23_46 |
| Final Words Scroll (`final_words`) | Psalm 31:5 | psalm_31_5 |
| Transcript of the Aramaic Cry (`the_forsaken_cry`) | Matthew 27:46 | matthew_27_46 |
| Transcript of the Aramaic Cry (`the_forsaken_cry`) | Psalm 22:1 | psalm_22_1 |
| Record of the Crowd's Taunt (`mocking_crowd_taunt`) | Matthew 27:39-43 | matthew_27_39 |
| Record of the Crowd's Taunt (`mocking_crowd_taunt`) | Psalm 22:7-8 | psalm_22_7_8 |
| List of Those Watching From Afar (`distant_witnesses`) | Luke 23:49 | luke_23_49 |
| List of Those Watching From Afar (`distant_witnesses`) | Psalm 38:11 | psalm_38_11 |

### 🆕 Drafted addition — closing the Isaiah 53:12 gap

Not yet merged into `act3_case.js`. Full code patch: `act3_case_crucifixion_isaiah_53_12_patch.js`. Full Ink dialogue: `penitent_thief.ink`.

| Reference | Prophecy ID |
|---|---|
| Isaiah 53:12 | `isaiah_53_12` *(reuses the ID already defined in `act3CaseA`; no second ID for the same prophecy)* |

| Evidence | `relatedProphecy` | `bibleRef` | Prophetic / Narrative Link Text |
|---|---|---|---|
| Sentencing Record of the Two Thieves (`crucified_with_thieves`) | `isaiah_53_12` | Luke 23:32–33 | Fulfills the first clause of Isaiah 53:12 — "numbered with the transgressors." Roman execution records placed Jesus's cross deliberately between two convicted criminals, publicly branding Him a common lawbreaker rather than a righteous man. |
| Words of Forgiveness (`crucifiers_forgiven`) | `isaiah_53_12` | Luke 23:34 | Fulfills the second clause — "made intercession for the transgressors." As the nails were driven in, Jesus prayed aloud for the very soldiers executing Him: "Father, forgive them, for they know not what they do." |

**New witness NPC:** Dismas, the Penitent Thief (`penitent_thief`) — crucified at Jesus's right hand (Luke 23:39–43). Unlocks both evidence items above; `revealsProphecy: isaiah_53_12`. Chosen over routing this through the existing `execution_guard` stub because Dismas is the one witness close enough to both experience the sentencing firsthand *and* hear the prayer — giving the prophecy's two clauses a single first-person voice rather than a secondhand report.

**Lab deduction:** `crucified_with_thieves` + `crucifiers_forgiven` → Link → reveals `isaiah_53_12` — "a guilty man could easily be numbered among criminals; almost no one intercedes for their own executioners."

This pairs naturally with the existing `twelve_roll` evidence in `act3CaseA` (where Jesus first applies Isaiah 53:12 to Himself) — a foretelling → fulfillment chain across two cases, the same pattern as the existing Zechariah 13:7 scattering chain (Gethsemane → Peter's Restoration).

## act4CaseA — The Empty Tomb

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Psalm 16:10 | `psalm_16_10` |
| Hosea 6:2 | `hosea_6_2` |
| Jonah 1:17 / Matthew 12:40 | `jonah_1_17___matthew_12_40` |
| Isaiah 53:10–11 | `isaiah_53_10_11` |
| Psalm 22:1–31 | `psalm_22_1_31` |
| Isaiah 26:19 | `isaiah_26_19` |
| Ezekiel 37:12–13 | `ezekiel_37_12_13` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Displaced Sealing Stone (`rolled_stone`) | `psalm_16_10` | Matthew 28:2 | Psalm 16:10 — 'You will not abandon me to the realm of the dead, nor will you let your Holy One see decay.' The angel rolled away the stone not to free Jesus, but to reveal that the Holy One had already risen. The empty tomb became the visible evidence that this ancient prophecy had been fulfilled. |
| The Empty Burial Chamber (`empty_tomb`) | `psalm_16_10` | Luke 24:3 | Psalm 16:10 — 'You will not let your holy one see corruption.' The empty tomb is the physical evidence that the Psalm's promise was kept. A body left long enough shows decomposition; no such evidence exists. Psalm 22:1–31 opens with the cry of abandonment Jesus spoke from the cross ('My God, my God, why have you forsaken me?') and closes in resurrection proclamation — the same psalm that describes His hands and feet pierced and His garments divided by lot. |
| Folded Burial Linens (`burial_linen`) | `psalm_16_10` | John 20:6–8 | The orderly arrangement of the grave cloths, particularly the folded face cloth, convinced John that this was not a grave robbery. It pointed to a deliberate, unhurried departure, fulfilling the promise that the Holy One would not see decay (Psalm 16:10). |
| The Angelic Proclamation (`angelic_witness`) | `psalm_16_10` | Matthew 28:2–7; Mark 16:5–7; Luke 24:4–7; John 20:12–13 | The angels' message, "He is not here; he has risen," is the divine confirmation that the promise of Psalm 16:10 has been kept. They serve as the official heavenly witnesses to the empty tomb. |
| The Soldiers' Broken Report (`guard_report`) | `hosea_6_2` | Matthew 28:2–4 | The bribe to the guards fulfils the pattern of institutional deception against God's purposes — similar to how the chief priests had bribed Judas (Matthew 26:14–16). The very people who guarded against resurrection were the first non-disciple witnesses of the supernatural event. Jonah 1:17 / Matthew 12:40 — Jesus named His own third-day resurrection the 'sign of Jonah,' the three days in the tomb mirroring Jonah's three days in the great fish. |
| The Soldiers' Broken Report (`guard_report`) | `jonah_1_17___matthew_12_40` | Matthew 28:2–4 | The bribe to the guards fulfils the pattern of institutional deception against God's purposes — similar to how the chief priests had bribed Judas (Matthew 26:14–16). The very people who guarded against resurrection were the first non-disciple witnesses of the supernatural event. Jonah 1:17 / Matthew 12:40 — Jesus named His own third-day resurrection the 'sign of Jonah,' the three days in the tomb mirroring Jonah's three days in the great fish. |
| Unused Burial Spices (`spice_jars`) | - | Mark 16:1 | Nicodemus had already brought 75 pounds of myrrh and aloes for the burial (John 19:39–40), fulfilling the wealthy burial of Isaiah 53:9. The women's additional spices were for the anointing ritual completed after the Sabbath — but there was no body to anoint. The unused jars are a symbol of an interrupted mourning, halted by resurrection. |
| Mary Magdalene's Testimony (`mary_encounter`) | `isaiah_53_10_11` | John 20:11–18 | Isaiah 53:10–11 promised the Suffering Servant would 'see his offspring and prolong his days' after being crushed — a resurrection paradox. The risen Christ's first act was to call Mary by name (echoing Isaiah 43:1), sending her as the primary witness. In a Roman court a woman's testimony was inadmissible; making a former demoniac the lead witness is exactly the kind of counter-cultural detail that confirms authenticity rather than fabrication. |
      | Broiled Fish Remains (`broiled_fish_remains`) | `isaiah_53_10_11` | Luke 24:41-43 | This act demonstrated the physical, bodily nature of His resurrection, fulfilling the promise that the Suffering Servant would 'see light' and live again after His death (Isaiah 53:10-11). |
| Opened Tombs Testimony (`opened_tombs`) | `ezekiel_37_12_13` | Matthew 27:52-53 | Ezekiel 37 prophesied that God would open the graves of His people as a sign of His power to restore. The raising of these saints was a literal fulfillment and a powerful preview of the final resurrection. |
| Resurrection Psalm Scroll (`psalm22_scroll`) | `psalm_22_1_31` | Luke 24:26–27 | The Psalm that begins with suffering ends in worldwide proclamation and vindication, pointing beyond the cross to resurrection. Jesus explained these scriptures to the disciples on the road to Emmaus. |
| Psalm 16:10 Scroll Fragment (`psalm_16_10_scroll`) | `psalm_16_10` | Psalm 16:10 | Supplementary primary-source scroll evidence for this case's Psalm 16:10 fulfilment (paired with `rolled_stone` / `empty_tomb` / `burial_linen` / `angelic_witness`). |
| Hosea 6:2 Scroll Fragment (`hosea_6_2_scroll`) | `hosea_6_2` | Hosea 6:2 | Supplementary primary-source scroll evidence for this case's Hosea 6:2 fulfilment (paired with `guard_report`). |
| Jonah 1:17 / Matthew 12:40 Scroll Fragment (`jonah_1_17___matthew_12_40_scroll`) | `jonah_1_17___matthew_12_40` | Jonah 1:17 / Matthew 12:40 | Supplementary primary-source scroll evidence for this case's sign-of-Jonah fulfilment (paired with `guard_report`). |
| Isaiah 53:10–11 Scroll Fragment (`isaiah_53_10_11_scroll`) | `isaiah_53_10_11` | Isaiah 53:10–11 | Supplementary primary-source scroll evidence for this case's Isaiah 53:10–11 fulfilment (paired with `mary_encounter`). |
| Psalm 22:1–31 Scroll Fragment (`psalm_22_1_31_scroll`) | `psalm_22_1_31` | Psalm 22:1–31 | Supplementary primary-source scroll evidence for this case's Psalm 22:1–31 fulfilment (paired with `psalm22_scroll`). |
| Isaiah 26:19 Scroll Fragment (`isaiah_26_19_scroll`) | `isaiah_26_19` | Isaiah 26:19 | Supplementary primary-source scroll evidence for this case's Isaiah 26:19 fulfilment. |
| Ezekiel 37:12–13 Scroll Fragment (`ezekiel_37_12_13_scroll`) | `ezekiel_37_12_13` | Ezekiel 37:12–13 | Supplementary primary-source scroll evidence for this case's Ezekiel 37:12–13 fulfilment (paired with `opened_tombs`). |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| The Displaced Sealing Stone (`rolled_stone`) | Matthew 28:2 | matthew_28_2 |
| The Displaced Sealing Stone (`rolled_stone`) | Psalm 16:10 | psalm_16_10 |
| The Displaced Sealing Stone (`rolled_stone`) | Acts 2:25–32 | acts_2_25_32 |
| The Displaced Sealing Stone (`rolled_stone`) | Acts 13:35–37 | acts_13_35_37 |
| The Displaced Sealing Stone (`rolled_stone`) | John 20:19 | john_20_19 |
      | Broiled Fish Remains (`broiled_fish_remains`) | Luke 24:41-43 | luke_244143 |
| The Empty Burial Chamber (`empty_tomb`) | Luke 24:3 | luke_24_3 |
| The Empty Burial Chamber (`empty_tomb`) | Psalm 16:10 | psalm_16_10 |
| The Empty Burial Chamber (`empty_tomb`) | Psalm 22:1-31 | psalm_22_1_31 |
| Folded Burial Linens (`burial_linen`) | John 20:6-8 | john_20_6_8 |
| The Angelic Proclamation (`angelic_witness`) | Matthew 28:2-7 | matthew_28_2_7 |
| The Angelic Proclamation (`angelic_witness`) | Mark 16:5-7 | mark_16_5_7 |
| The Angelic Proclamation (`angelic_witness`) | Luke 24:4-7 | luke_24_4_7 |
| The Angelic Proclamation (`angelic_witness`) | John 20:12-13 | john_20_12_13 |
| The Angelic Proclamation (`angelic_witness`) | Psalm 103:20 | psalm_103_20 |
| The Soldiers' Broken Report (`guard_report`) | Matthew 28:2-4 | matthew_28_2_4 |
| The Soldiers' Broken Report (`guard_report`) | Matthew 28:11-15 | matthew_28_11_15 |
| The Soldiers' Broken Report (`guard_report`) | Matthew 26:14-16 | matthew_26_14_16 |
| The Soldiers' Broken Report (`guard_report`) | Jonah 1:17 | jonah_1_17 |
| The Soldiers' Broken Report (`guard_report`) | Jonah 1:17 | jonah_117 |
| The Soldiers' Broken Report (`guard_report`) | Matthew 12:40 | matthew_12_40 |
| Unused Burial Spices (`spice_jars`) | Mark 16:1 | mark_16_1 |
| Unused Burial Spices (`spice_jars`) | Psalm 16:10 | psalm_16_10 |
| Unused Burial Spices (`spice_jars`) | John 19:39-40 | john_19_39_40 |
| Unused Burial Spices (`spice_jars`) | Isaiah 53:9 | isaiah_53_9 |
| Unused Burial Spices (`spice_jars`) | Acts 2:25-32 | acts_2_25_32 |
| Mary Magdalene's Testimony (`mary_encounter`) | John 20:11-18 | john_20_11_18 |
| Mary Magdalene's Testimony (`mary_encounter`) | Isaiah 43:1 | isaiah_43_1 |
| Mary Magdalene's Testimony (`mary_encounter`) | Isaiah 53:10-11 | isaiah_53_10_11 |
      | Broiled Fish Remains (`broiled_fish_remains`) | Isaiah 53:10-11 | isaiah_53_10_11 |
| Opened Tombs Testimony (`opened_tombs`) | Matthew 27:52-53 | matthew_27_52_53 |
| Opened Tombs Testimony (`opened_tombs`) | Ezekiel 37:12-13 | ezekiel_37_12_13 |
| Resurrection Psalm Scroll (`psalm22_scroll`) | Luke 24:26-27 | luke_24_26_27 |
| Resurrection Psalm Scroll (`psalm22_scroll`) | Psalm 22:1-31 | psalm_22_1_31 |

## act4CaseB — The Guard's Report

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Psalm 2:1–2 | `psalm_2_1_2` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| High-Grade Sanctuary Coins (`bribe_shekels`) | `psalm_2_1_2` | - | Matthew 28:12 records that the chief priests met with the elders and devised a plan, giving the soldiers a 'large sum of money.' |
| Snapped Clay Roman Seal (`broken_imperial_seal`) | `psalm_2_1_2` | - | Matthew 27:66 notes they went and made the tomb secure by 'putting a seal on the stone and posting the guard.' |
| Shattered Pilum Shaft (`shattered_spear`) | `psalm_2_1_2` | - | Matthew 28:2 states there was a violent earthquake, for an angel of the Lord came down from heaven and rolled back the stone. |
| Official Sanhedrin Report (`sanhedrin_report`) | `psalm_2_1_2` | Matthew 28:11 | This report is the paper trail of the conspiracy itself — the Sanhedrin's own internal record of receiving the guards' account and choosing to suppress rather than investigate it, matching the pattern of rulers plotting against God's anointed described in Psalm 2:1–2. |
| Psalm 2:1–2 Scroll Fragment (`psalm_2_1_2_scroll`) | `psalm_2_1_2` | Psalm 2:1–2 | Supplementary primary-source scroll evidence for this case's Psalm 2:1–2 fulfilment. |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| High-Grade Sanctuary Coins (`bribe_shekels`) | Matthew 28:12 | matthew_28_12 |
| Snapped Clay Roman Seal (`broken_imperial_seal`) | Matthew 27:66 | matthew_27_66 |
| Shattered Pilum Shaft (`shattered_spear`) | Matthew 28:2 | matthew_28_2 |
| Official Sanhedrin Report (`sanhedrin_report`) | Matthew 28:11 | matthew_28_11 |
| Official Sanhedrin Report (`sanhedrin_report`) | Psalm 2:1-2 | psalm_2_1_2 |

## act4CaseC — Peter's Restoration

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Zechariah 13:7 | `zechariah_13_7` |
| Ezekiel 34:11-16 | `ezekiel_34_11-16` |
| Psalm 16:10 | `psalm_16_10` |
| Isaiah 53:10–11 | `isaiah_53_10_11` |

> **⚠️ Confirmed bug — inconsistent ID spelling, not a missing prophecy.** (Correction: an earlier automated scan in this thread wrongly flagged Ezekiel 34:11-16 as entirely undefined in this case — that was a false positive caused by the scanner's own regex failing on the hyphenated ID below, not a real gap. The prophecy is fully built: `charcoal_fire`, `miraculous_catch`, `bread_breakfast`, and `threefold_commission` all correctly unlock it, and it's correctly listed in `truth.prophesyFulfilled`.) The actual issue is that the ID is spelled three different ways across the case: `ezekiel_34_11-16` (hyphen, 10 occurrences — the one evidence-unlocking actually keys off), `ezekiel_34_11_16` (all underscores, 2 occurrences, in a couple of `propheticRefs.link` fields), and `ezekiel_3411_16` (typo, 3 occurrences, on the scroll fragment item). If the Codex UI resolves "jump to prophecy" links by exact string match, the 2nd and 3rd variants would silently fail to resolve even though evidence unlocking itself works fine. Fix: standardize on `ezekiel_34_11_16` (matching the codebase's usual all-underscore convention) everywhere — drafted in `patch4_amos_ezekiel_id_fix.js`.

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Charcoal Fire (`charcoal_fire`) | `zechariah_13_7` | John 21:9 | Zechariah 13:7 foretold that when the Shepherd was struck, His sheep would be scattered. Jesus applied this prophecy to His disciples on the night of His arrest (Matthew 26:31). Around one charcoal fire Peter denied his Lord; around another, the risen Shepherd restored him. The same setting that witnessed failure became the place of forgiveness and renewed calling. |
| The Miraculous Catch (`miraculous_catch`) | `ezekiel_34_11-16` | John 21:10-11 | This echoes the original calling of the disciples (Luke 5:1-11) and demonstrates that obedience to Christ yields supernatural results. |
| Bread and Fish Breakfast (`bread_breakfast`) | `ezekiel_34_11-16` | John 21:9 | Ezekiel 34:11–16 promised that the Lord Himself would seek, gather, and feed His scattered sheep. Psalm 23 declares that the Shepherd prepares a table for His people, while Isaiah 25:6–9 foretells the Messianic feast following God's victory over death. The risen Jesus fulfills these promises by preparing bread and fish for His disciples, demonstrating that the Good Shepherd still provides for His flock after conquering the grave. |
| The Threefold Commission (`threefold_commission`) | `ezekiel_34_11-16` | John 21:15-17 | Peter's three denials (crow, cock, fire) are met with three commissions (feed, tend, shepherd) showing prophetic reversal. |
      | Risen Appearance (`galilean_apparition`) | `isaiah_53_10_11`, `psalm_16_10` | John 21:12 | Isaiah 53:10–11 foretold that after His suffering the Servant would live again and "see his offspring." Psalm 16:10 declared that God's Holy One would not remain in the grave. The disciples' recognition of Jesus on the shore was not merely a moment of faith—it was eyewitness confirmation that the crucified Messiah was alive, fulfilling the Scriptures. |
| Zechariah 13:7 Scroll Fragment (`zechariah_13_7_scroll`) | `zechariah_13_7` | Zechariah 13:7 | Supplementary primary-source scroll evidence for this case's Zechariah 13:7 fulfilment (paired with `charcoal_fire`). |
| Ezekiel 34:11–16 Scroll Fragment (`ezekiel_34_11-16_scroll`) | `ezekiel_34_11-16` | Ezekiel 34:11–16 | Supplementary primary-source scroll evidence for this case's Ezekiel 34:11–16 fulfilment (paired with `miraculous_catch` / `bread_breakfast` / `threefold_commission`). |
| Psalm 16:10 Scroll Fragment (`psalm_16_10_scroll`) | `psalm_16_10` | Psalm 16:10 | Supplementary primary-source scroll evidence for this case's Psalm 16:10 fulfilment (paired with `galilean_apparition`). |
| Isaiah 53:10–11 Scroll Fragment (`isaiah_53_10_11_scroll`) | `isaiah_53_10_11` | Isaiah 53:10–11 | Supplementary primary-source scroll evidence for this case's Isaiah 53:10–11 fulfilment (paired with `galilean_apparition`). |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| The Charcoal Fire (`charcoal_fire`) | John 21:9 | john_21_9 |
| The Charcoal Fire (`charcoal_fire`) | Zechariah 13:7 | zechariah_13_7 |
| The Charcoal Fire (`charcoal_fire`) | Matthew 26:31 | matthew_26_31 |
| The Charcoal Fire (`charcoal_fire`) | John 18:18 | john_18_18 |
| The Miraculous Catch (`miraculous_catch`) | John 21:10-11 | john_21_10_11 |
| The Miraculous Catch (`miraculous_catch`) | Luke 5:1-11 | luke_5_1_11 |
| Bread and Fish Breakfast (`bread_breakfast`) | John 21:9 | john_21_9 |
| Bread and Fish Breakfast (`bread_breakfast`) | Ezekiel 34:11-16 | ezekiel_34_11_16 |
| Bread and Fish Breakfast (`bread_breakfast`) | Psalm 23:1-5 | psalm_23_1_5 |
| Bread and Fish Breakfast (`bread_breakfast`) | Isaiah 25:6-9 | isaiah_25_6_9 |
| The Threefold Commission (`threefold_commission`) | John 21:15-17 | john_21_15_17 |
| The Threefold Commission (`threefold_commission`) | Ezekiel 34:11-16 | ezekiel_34_11_16 |
| The Threefold Commission (`threefold_commission`) | Jeremiah 3:15 | jeremiah_3_15 |
| The Threefold Commission (`threefold_commission`) | Isaiah 40:11 | isaiah_40_11 |
| The Threefold Commission (`threefold_commission`) | Zechariah 13:7 | zechariah_13_7 |
| Risen Appearance (`galilean_apparition`) | John 21:12 | john_21_12 |
| Risen Appearance (`galilean_apparition`) | Isaiah 53:10-11 | isaiah_53_10_11 |
| Risen Appearance (`galilean_apparition`) | Psalm 16:10 | psalm_16_10 |
| Risen Appearance (`galilean_apparition`) | Acts 2:25-32 | acts_2_25_32 |
| Risen Appearance (`galilean_apparition`) | Acts 13:35-37 | acts_13_35_37 |

---

## act4CaseD — The Ascension

> **v7 addition:** this case is fully built in `act4_case.js` (`export const act4CaseD`, case ID `ascension`) but was missing from this reference doc entirely. Location: Mount of Olives. Requires `peter_restoration` to unlock. Culprit: **No One** — a divine event, not a crime.

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Luke 24:50–51 | `luke_24_50_51` |
| Acts 1:9–11 | `acts_1_9_11` |
| Matthew 28:19–20 | `matthew_28_19_20` |
| Luke 24:36–43 | `luke_24_36_43` |

> Note: all four are NT prophecy/fulfillment-of-pattern texts rather than OT predictive prophecy (consistent with this document's Typology vs. Predictive Prophecy distinction — see top of doc). `luke_24_50_51` and `acts_1_9_11` are explicitly tied to OT typology in their evidence links below (Numbers 6:24-26 and Daniel 7:13-14 / Psalm 110:1 respectively).

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Testimony of the Wound Marks (`wound_marks_testimony`) | `luke_24_36_43` | John 20:27 | Jesus's invitation to touch His wounds directly fulfilled the need for tangible proof of His bodily resurrection ("a ghost does not have flesh and bones," Luke 24:39). This physical reality was crucial for the disciples' witness. |
| Great Commission Mandate (`great_commission_mandate`) | `matthew_28_19_20` | Matthew 28:19–20 | Fulfills OT promises that all nations would come to worship the Lord (Isaiah 2:2-4; Zechariah 8:20-23). Jesus's command initiates the global spread of the Gospel. |
| Priestly Benediction Account (`priestly_benediction_account`) | `luke_24_50_51` | Luke 24:50–51 | Echoes the priestly blessing of Numbers 6:24-26, signifying Jesus's role as the ultimate High Priest who intercedes for His people and bestows divine favor. |
| Ascension Eyewitness Account (`ascension_eyewitness_account`) | `acts_1_9_11` | Acts 1:9–11 | This visible, bodily ascension fulfills prophecies of the Messiah's enthronement and return (Daniel 7:13-14; Psalm 110:1). The angels' promise of His return reinforces this prophetic expectation. |
| Disciples' Hallucination Report (`ascension_fake`) | *(fake — not Codex-linkable)* | Acts 1:9 | Planted distractor: a fabricated claim that the disciples hallucinated the ascension from grief and exhaustion. Ignores the physical proofs of the risen body and the consistent multi-witness testimony. |
| Luke 24:50–51 Scroll Fragment (`luke_24_50_51_scroll`) | `luke_24_50_51` | Luke 24:50–51 | Supplementary primary-source scroll evidence (paired with `priestly_benediction_account`). |
| Acts 1:9–11 Scroll Fragment (`acts_1_9_11_scroll`) | `acts_1_9_11` | Acts 1:9–11 | Supplementary primary-source scroll evidence (paired with `ascension_eyewitness_account`). |
| Matthew 28:19–20 Scroll Fragment (`matthew_28_19_20_scroll`) | `matthew_28_19_20` | Matthew 28:19–20 | Supplementary primary-source scroll evidence (paired with `great_commission_mandate`). |
| Luke 24:36–43 Scroll Fragment (`luke_24_36_43_scroll`) | `luke_24_36_43` | Luke 24:36–43 | Supplementary primary-source scroll evidence (paired with `wound_marks_testimony`). |

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Testimony of the Wound Marks (`wound_marks_testimony`) | John 20:27 | john_20_27 |
| Testimony of the Wound Marks (`wound_marks_testimony`) | Luke 24:39 | luke_24_39 |
| Great Commission Mandate (`great_commission_mandate`) | Matthew 28:19-20 | matthew_28_19_20 |
| Great Commission Mandate (`great_commission_mandate`) | Isaiah 2:2-4 | isaiah_2_2_4 |
| Great Commission Mandate (`great_commission_mandate`) | Zechariah 8:20-23 | zechariah_8_20_23 |
| Priestly Benediction Account (`priestly_benediction_account`) | Luke 24:50-51 | luke_24_50_51 |
| Priestly Benediction Account (`priestly_benediction_account`) | Numbers 6:24-26 | numbers_6_24_26 |
| Ascension Eyewitness Account (`ascension_eyewitness_account`) | Acts 1:9-11 | acts_1_9_11 |
| Ascension Eyewitness Account (`ascension_eyewitness_account`) | Daniel 7:13-14 | daniel_7_13_14 |
| Ascension Eyewitness Account (`ascension_eyewitness_account`) | Psalm 110:1 | psalm_110_1 |

**Deductions (Lab pairings):**

| Evidence Pair | Op | Reveals Prophecy | Bible Ref |
|---|---|---|---|
| `ascension_eyewitness_account` + `great_commission_mandate` | Compare | `acts_1_9_11` | Acts 1:8-11; Matthew 28:18-20 |
| `priestly_benediction_account` + `ascension_eyewitness_account` | Link | `luke_24_50_51` | Luke 24:50-51; Hebrews 7:25 |
| `wound_marks_testimony` + `great_commission_mandate` | Compare | `luke_24_36_43` | Luke 24:39-43; John 20:27; Matthew 28:19-20 |

**Characters:** Peter (`peter_ascension`, reveals `acts_1_9_11`), John (`john_ascension`, reveals `luke_24_50_51`), Thomas (`thomas_ascension`, reveals `luke_24_36_43`), Angelic Messengers (`angelic_messengers`, reveals `acts_1_9_11`).

---

## Cross-Case Typology: The Day of Atonement (Leviticus 16)

This typological arc spans three Act III cases, using the Jewish High Holy Day of Yom Kippur as its framework.

| Case | Typological Element | Evidence | Bible ID |
|---|---|---|---|
| `sanhedrin_trial` (act3CaseC) | High Priest's Role | `Priestly Robe Fragment` (`torn_robe`) | `isaiah_50_6` |
| `barabbas_choice` (act3CaseD) | Scapegoat (Azazel) | `The Insurgent's Dossier` (`barabbas_warrant`) | `isaiah_53_3` |
| `crucifixion_site` (act3CaseE) | Blood of Atonement | `Blood-Stained Roman Hasta` (`pierced_spear`) | `zechariah_12_10` |

**Fulfillment:** Christ fulfills all three roles simultaneously — the sinless high priest, the scapegoat bearing sin, and the altar sacrifice whose blood atones. Leviticus 16's single-day drama is stretched across Christ's final 24 hours: the high priest's illegitimate arrest at midnight, the people's choice to release the guilty, and the offering of His blood outside the camp.

**Complete Chain Evidence:** `torn_robe` + `barabbas_warrant` + `pierced_spear`

---

## Cross-Case Typology: Isaac Carrying the Wood (Genesis 22)

| Case | Typological Element | Evidence | Bible ID |
|---|---|---|---|
| `last_supper` (act3CaseA) | The Wood (bread and wine of Melchizedek) | `Spilled Wine on the Linen` (`wine_stain`) | `typology_melchizedek` |
| `gethsemane_arrest` (act3CaseB) | The Binding | `Unresisting Prisoner's Cord` (`prisoner_cord`) | `isaiah_53_7` |
| `crucifixion_site` (act3CaseE) | **The Wood, Carried** (Simon of Cyrene bears the crossbeam) | 🆕 `Rope-Burn Marks on a Borrowed Shoulder Cloth` (`cross_burden`) | `typology_isaac_wood` |
| `crucifixion_site` (act3CaseE) | The Sacrifice (Passover Lamb, no bone broken) | `Unbroken Tibiae Report` (`unbroken_legs`) | `psalm_34_20` |

> **Gap closed:** this chain previously had no evidence for the most literal element of the typology — someone actually carrying wood — despite Holy_Week.md documenting Simon of Cyrene as the intended `Genesis 22:6` reveal. `simon_cyrene` was a dialogue stub with no `unlocksEvidence`. Drafted fix (new evidence `cross_burden`, new typology ID `typology_isaac_wood`, and a fleshed-out Simon NPC) is in `act3_case_crucifixion_stub_npc_patch.js` / `simon_cyrene.ink`.

**Fulfillment:** Isaac carried the wood for his sacrifice; Jesus carries the cross, then collapses under it and has the burden finished by a compelled bystander. Both were bound, both were part of a journey to a hill outside the city, and both had a substitute provided by God — the ram caught in the thicket, the true Passover Lamb kept without a broken bone. Abraham's question "Where is the lamb?" (Genesis 22:7) is answered 2,000 years later: "Behold the Lamb of God" (John 1:29).

**Complete Chain Evidence:** `wine_stain` + `prisoner_cord` + `cross_burden` + `unbroken_legs`

---

## Cross-Case Typology: The Zechariah 13:7 Scattering Chain

**Prophecy:** Zechariah 13:7 — "Strike the Shepherd, and the sheep will be scattered." — `zechariah_13_7`

| Case | Event | Evidence | Fulfillment Role |
|---|---|---|---|
| `gethsemane_arrest` (act3CaseB) | Disciples flee | `Abandoned Linen Wrapper` (`abandoned_linen`) | Fulfillment |
| `sanhedrin_trial` (act3CaseC) | Peter denies | `Rooster Feather` (`rooster_feather`) | Contrast (Jesus silent before accusers, Peter denies by the fire) |
| `peter_restoration` (act4CaseC) | Shepherd restored | `The Charcoal Fire` (`charcoal_fire`) | Reversal |

**Fulfillment:** Jesus quotes Zechariah 13:7 to His disciples at the Last Supper as a prediction of their scattering at Gethsemane. The prophecy is fulfilled when all abandon Him, leaving Him alone. Yet the chain extends beyond the crucifixion — at the charcoal fire in John 21, Peter is restored as the shepherd of the scattered flock, completing the arc from scattering to gathering.

**Complete Chain Evidence:** `abandoned_linen` + `rooster_feather` + `charcoal_fire`

---

### Cross-Case Chain Summary

The three typological arcs above correspond to Hidden Detective Chains documented in `Holy Week.md` and `Game Case & Lab Reference.md`:

| Chain Name | Cross-Case Typology | Cases Spanned | Codex Reward |
|---|---|---|---|
| The Greater Atonement | Day of Atonement (Leviticus 16) | `sanhedrin_trial` → `barabbas_choice` → `crucifixion_site` | *The Greater Atonement* |
| The True Passover Lamb | Isaac Carrying the Wood (Genesis 22) | `last_supper` → `gethsemane_arrest` → `crucifixion_site` | *The True Passover Lamb* |
| The Scattered Sheep | Zechariah 13:7 Scattering | `gethsemane_arrest` → `sanhedrin_trial` → `peter_restoration` | *The Scattered Sheep* |

These cross-case arcs require linking evidence from multiple cases — the `relatedProphecy` field alone does not reveal them; the player must discover the theological connections across case boundaries.