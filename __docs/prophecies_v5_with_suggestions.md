# Prophecy & Evidence Link Reference (Corrected)

This document maps every case to its defined prophecies and to each piece of evidence, showing the two-link design used in the game code:

- **`relatedProphecy`** → the fulfilled prophecy the evidence links to in the Codex (must be one of the case's defined prophecies).
- **`bibleRef`** → the supporting background Bible verse(s) the evidence's narrative/text cites (may be a Gospel account or an OT background verse).

> Note: a `relatedProphecy` of `-` means the evidence is not Codex-linkable to a prophecy (supporting/background evidence only).

Each case also has a **Fulfillment Links** table listing every Bible reference an evidence cites, so each fulfillment link is readable on its own line.

> **CHANGE LOG** — see end of document for a full list of corrections made to the original file, plus items flagged for a decision rather than auto-fixed.

## act1CaseA — The Missing Donkey

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Zechariah 9:9 | `zechariah_9_9` |
| Psalm 118:25–26 | `psalm_118_25_26` |
| Genesis 49:10–11 | `genesis_49_10_11` |
| Malachi 3:1 | `malachi_3_1` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Two Disciples' Cloaks (`cloaks`) | `genesis_49_10_11` | Mark 11:7 — 'They brought the colt to Jesus and threw their cloaks over it.'; 2 Kings 9:13 — cloaks spread before King Jehu as a royal honour | This mirrors 2 Kings 9:13 where cloaks were spread before King Jehu — a royal gesture the disciples repeated on the road to Jerusalem. |
| Fresh Hoofprints (`donkey_tracks`) | - | Luke 19:35–36 — 'As he rode along, people spread their cloaks on the road.' | The route from the Mount of Olives into Jerusalem through the eastern gate mirrors the processional route described in Ezekiel 44:1–3, associated with the glory of God entering the city. |
| Villager's Testimony (`witness_account`) | - | Mark 11:3–6 — 'They answered as Jesus had told them to, and the people let them go.' | Jesus's foreknowledge of the exact response to give is consistent with His omniscience, and mirrors how the Passover lamb was 'set apart' by divine instruction (Exodus 12:3–6). |
| Zechariah 9:9 Scroll Fragment (`prophecy_scroll`) | `zechariah_9_9` | Matthew 21:4–5 — 'This took place to fulfil what was spoken through the prophet.' | Zechariah 9:9 was written around 520 BC. Zechariah himself arrived back in Judah after the Babylonian exile — a people who desperately needed a king. His vision of a humble, donkey-riding king was a hope that Jesus publicly claimed. |
| Fresh-Cut Palm Branch (`palm_branch`) | `psalm_118_25_26` | John 12:13 — 'They took palm branches and went out to meet him, shouting, Hosanna! Blessed is the king of Israel!' | In the Maccabean era, palm branches became a symbol of Jewish national liberation and celebration (1 Maccabees 13:51). The crowd was making a political and spiritual statement — this man is our king and deliverer. |
| Cut Rope at the Tethering Post (`rope_fibers`) | - | Mark 11:2 — 'You will find a colt tied there, which no one has ever ridden. Untie it and bring it here.' | Jesus specified it must be a colt 'no one has ever ridden' — in Jewish law, an animal used for sacred purposes must be one that has not been used for common work (Numbers 19:2; Deuteronomy 21:3). This detail proves the act was religiously intentional, not criminal. |
| Pharisee's Written Complaint (`crowd_testimony`) | `malachi_3_1` | Luke 19:39–40 — The Pharisees said, 'Teacher, rebuke your disciples!' Jesus replied, 'If they keep quiet, the stones will cry out.' | The Pharisees recognised the messianic implication of the palm branches and shouts. John 12:19 records their panic: 'Look how the whole world has gone after him!' |

*No changes to this case's `relatedProphecy` assignments. Minor factual correction to the `palm_branch` narrative text — see change log (the 1 Maccabees 13:51 event is dated 141 BC, not 165 BC).*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Two Disciples' Cloaks (`cloaks`) | Genesis 49:10–11 | genesis_49_10_11 |
| Two Disciples' Cloaks (`cloaks`) | Mark 11:7 | mark_11_7 |
| Two Disciples' Cloaks (`cloaks`) | 2 Kings 9:13 | 2_kings_9_13 |
| Fresh Hoofprints (`donkey_tracks`) | Luke 19:35–36 | luke_19_35 |
| Villager's Testimony (`witness_account`) | Mark 11:3–6 | mark_11_3 |
| Zechariah 9:9 Scroll Fragment (`prophecy_scroll`) | Zechariah 9:9 | zechariah_9_9 |
| Zechariah 9:9 Scroll Fragment (`prophecy_scroll`) | Matthew 21:4–5 | matthew_21_4 |
| Fresh-Cut Palm Branch (`palm_branch`) | Psalm 118:25–26 | psalm_118_25_26 |
| Fresh-Cut Palm Branch (`palm_branch`) | John 12:13 | john_12_13 |
| Cut Rope at the Tethering Post (`rope_fibers`) | Mark 11:2 | mark_11_2 |
| Pharisee's Written Complaint (`crowd_testimony`) | Malachi 3:1 | malachi_3_1 |
| Pharisee's Written Complaint (`crowd_testimony`) | Luke 19:39–40 | luke_19_39 |

## act1CaseB — The Overturned Tables

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Malachi 3:1 | `malachi_3_1` |
| Isaiah 56:7 | `isaiah_56_7` |
| Psalm 69:9 | `psalm_69_9` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Shattered Dove Cages (`broken_cages`) | `isaiah_56_7` | Leviticus 5:7 | Isaiah 56:7 — 'My house shall be called a house of prayer for all nations' — is the prophecy Jesus explicitly quoted as He drove out the sellers. The dove trade was the clearest abuse of it: Leviticus 5:7 allows doves as a concession for poverty, yet the priests exploited this legal requirement with exorbitant commercial markups, locking the poor and the nations out of the very prayer court Isaiah said was for them. That exploitation directly triggered Jesus's anger. |
| Scattered Tyrian Shekels (`scattered_shekels`) | `malachi_3_1` | Exodus 30:13 | Exodus 30:13 required a half-shekel temple offering. The priests exploited this by mandating Tyrian shekels, forcing pilgrims to pay massive exchange fees. |
| Discarded Whip of Cords (`whip_of_cords`) | `malachi_3_1` | John 2:15 | John 2:15 specifically details Him weaving this instrument on the spot before initiating the cleansing. |

*No changes. NOTE (flagged, not fixed): John 2:15 is John's account, chronologically placed early in Jesus's ministry, while the Malachi/Isaiah/Psalm prophecies here are anchored to the Passion-week Synoptic cleansing (Matthew 21 / Mark 11 / Luke 19). Scholars differ on whether these are one event or two. Worth a deliberate editorial call given the case sits inside your Passion-week act structure.*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Shattered Dove Cages (`broken_cages`) | Isaiah 56:7 | isaiah_56_7 |
| Shattered Dove Cages (`broken_cages`) | Leviticus 5:7 | leviticus_5_7 |
| Scattered Tyrian Shekels (`scattered_shekels`) | Malachi 3:1 | malachi_3_1 |
| Scattered Tyrian Shekels (`scattered_shekels`) | Exodus 30:13 | exodus_30_13 |
| Discarded Whip of Cords (`whip_of_cords`) | Malachi 3:1 | malachi_3_1 |
| Discarded Whip of Cords (`whip_of_cords`) | John 2:15 | john_2_15 |

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
| Peter's Astonished Reaction (`peter_astonishment`) | `psalm_33_8_9` | Mark 11:21 | Psalm 33:8-9 declares that all should stand in awe of Him because 'He spoke, and it came to be.' Peter's reaction is the physical fulfillment of this reverence when confronted with divine command. |
| Jesus's Teaching on Faith (`disciples_faith_lesson`) | `zechariah_4_6_7` | Mark 11:22–24 | Zechariah 4:7 speaks of a 'mighty mountain' becoming 'level ground' by the Spirit. Jesus adopts this imagery to show that faith connects the believer to that same mountain-moving power. |

*No changes.*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Description of the Fig Tree (Monday) (`cursed_fig_tree_desc`) | Micah 7:1 | micah_7_1 |
| Description of the Fig Tree (Monday) (`cursed_fig_tree_desc`) | Mark 11:12–14 | mark_11_12 |
| The Withered Fig Tree (Tuesday) (`withered_fig_tree_state`) | Jeremiah 8:13 | jeremiah_8_13 |
| The Withered Fig Tree (Tuesday) (`withered_fig_tree_state`) | Mark 11:20–21 | mark_11_20 |
| Peter's Astonished Reaction (`peter_astonishment`) | Psalm 33:8–9 | psalm_33_8_9 |
| Peter's Astonished Reaction (`peter_astonishment`) | Mark 11:21 | mark_11_21 |
| Jesus's Teaching on Faith (`disciples_faith_lesson`) | Zechariah 4:6–7 | zechariah_4_6_7 |
| Jesus's Teaching on Faith (`disciples_faith_lesson`) | Mark 11:22–24 | mark_11_22 |

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
| The Formal Authority Challenge (`question_scroll`) | `malachi_3_1` | Matthew 21:23 — 'When he entered the temple, the chief priests and the elders of the people came up to him as he was teaching.' | Malachi 3:1 predicted the Lord coming to His temple with authority. The irony of the challenge is that they were asking for credentials from the very One whose authority derived directly from God. |
| Sketch of the Vineyard Parable (`parable_fragments`) | `isaiah_5_1_7` | Matthew 21:33–45 — the Parable of the Wicked Tenants | Isaiah 5:1–7 is the Song of the Vineyard — God's lament over Israel's unfaithfulness. Jesus deliberately echoed it. The bystander sketching this recognised the connection immediately. |
| Rejected Cornerstone Fragment (`cornerstone_carving`) | `psalm_118_22_23` | Matthew 21:42 — 'Jesus said to them, Have you never read in the Scriptures: The stone the builders rejected has become the cornerstone?' | Psalm 118:22–23 was a coronation Psalm, used at Temple dedications. Jesus quoted it at the very Temple whose builders were rejecting Him. The rejected stone lying in the construction debris became a powerful object lesson for anyone listening. |
| Denarius of Tiberius Caesar (`coin_of_caesar`) | - | Matthew 22:19–21 — 'Show me the coin used for paying the tax... Whose image is this? And whose inscription? Caesar's, he replied. Then he said to them, Give back to Caesar what is Caesar's, and to God what is God's.' | The coin bore Caesar's image (imago). Jesus's answer pointed to something deeper: humanity bears God's image (Genesis 1:26–27, imago Dei). The coin question about taxation became a profound statement about identity and allegiance — Caesar's image on metal; God's image on people. |
| Withered Fig Leaf (`fig_leaf_withered`) | - | Mark 11:20–21 — 'In the morning, as they went along, they saw the fig tree withered from the roots.' | Micah 7:1 and Jeremiah 8:13 both use a barren fig tree as a symbol for Israel's spiritual fruitlessness. Hosea 9:10 says 'Like grapes in the wilderness, I found Israel.' The withered tree was a living parable — the judgement Jesus described in His Temple parables had already begun in miniature on the roadside. |
| Two Leptons (Widow's Mites) (`widow_two_coins`) | - | Mark 12:41–44 — 'Calling his disciples to him, Jesus said, Truly I tell you, this poor widow has put more into the treasury than all the others.' | 1 Samuel 16:7 — 'Man looks at the outward appearance, but the LORD looks at the heart.' The widow's offering is the practical demonstration of everything Jesus had been teaching against the religious leaders' showy piety. She gave all she had (100%); the wealthy gave from their surplus. |
| Temple Bystander's Written Account (`witness_scroll`) | - | Matthew 22:46 — 'No one could say a word in reply, and from that day on no one dared to ask him any more questions.' | Isaiah 11:2 promised the Messiah would have the 'Spirit of wisdom and understanding, the Spirit of counsel and might' — He would answer every challenge with perfect insight. The progressive silencing of each religious faction across one morning is the fulfilment of this promise made 700 years earlier. Daniel 7:13–14 foretold 'one like a son of man' coming with the clouds of heaven to receive an everlasting dominion — the title 'Son of Man' Jesus used for Himself throughout these exchanges. |

*No changes.*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| The Formal Authority Challenge (`question_scroll`) | Malachi 3:1 | malachi_3_1 |
| The Formal Authority Challenge (`question_scroll`) | Matthew 21:23 | matthew_21_23 |
| Sketch of the Vineyard Parable (`parable_fragments`) | Isaiah 5:1–7 | isaiah_5_1_7 |
| Sketch of the Vineyard Parable (`parable_fragments`) | Matthew 21:33–45 | matthew_21_33 |
| Rejected Cornerstone Fragment (`cornerstone_carving`) | Psalm 118:22–23 | psalm_118_22_23 |
| Rejected Cornerstone Fragment (`cornerstone_carving`) | Matthew 21:42 | matthew_21_42 |
| Denarius of Tiberius Caesar (`coin_of_caesar`) | Matthew 22:19–21 | matthew_22_19 |
| Withered Fig Leaf (`fig_leaf_withered`) | Mark 11:20–21 | mark_11_20 |
| Two Leptons (Widow's Mites) (`widow_two_coins`) | Mark 12:41–44 | mark_12_41 |
| Temple Bystander's Written Account (`witness_scroll`) | Matthew 22:46 | matthew_22_46 |

## act2CaseB — The Price of Life

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Isaiah 25:8 | `isaiah_25_8` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Bethany Pilgrim Manifest (`crowd_report`) | - | John 12:9 notes that a large crowd found out Jesus was there and came not only because of Him, but also to see Lazarus, whom He had raised. | - |
| Bethany Limestone Dust (`grave_dirt`) | `isaiah_25_8` | **[CORRECTED]** John 11:39 records Martha's objection that after four days there would already be a bad odor — the natural expectation of decay this deep into a Judean burial, against which the raising of Lazarus stands out as a reversal. | - |
| Intercepted Sadducean Memorandum (`secret_decree`) | - | John 12:10–11 explicitly validates this conspiracy: 'So the chief priests made plans to put Lazarus to death as well.' | - |

*Fix applied: `grave_dirt`'s `bibleRef` note previously said John 11:39 evidenced "preservation oils" — the opposite of what that verse says (Martha's concern is the smell of decay, not preservation). `relatedProphecy` (`isaiah_25_8`, "he will swallow up death forever") is unchanged and still fits.*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Bethany Pilgrim Manifest (`crowd_report`) | John 12:9 | john_12_9 |
| Bethany Limestone Dust (`grave_dirt`) | Isaiah 25:8 | isaiah_25_8 |
| Bethany Limestone Dust (`grave_dirt`) | John 11:39 | john_11_39 |
| Intercepted Sadducean Memorandum (`secret_decree`) | John 12:10–11 | john_12_10 |

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

*FLAGGED, not auto-fixed: `isaiah_13_10` is defined for this case but never used as a `relatedProphecy`. It covers the same cosmic-darkening theme as `joel_2_30_31` (already attached to `cosmic_signs_references`). Recommend either (a) dropping `isaiah_13_10` from this case's prophecy list as redundant, or (b) writing it a dedicated evidence row if you want the two OT cosmic-sign texts distinguished in the Codex.*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| View of the Temple from Olivet (`temple_overlook_view`) | Matthew 24:1–2 | matthew_24_1 |
| Disciples' Questions (Written Notes) (`disciples_questions_notes`) | Daniel 9:27 | daniel_9_27 |
| Disciples' Questions (Written Notes) (`disciples_questions_notes`) | Matthew 24:3 | matthew_24_3 |
| Parable of the Ten Virgins (Notes) (`parable_of_virgins_notes`) | Matthew 25:1–13 | matthew_25_1 |
| Old Testament Cosmic Sign References (`cosmic_signs_references`) | Joel 2:30–31 | joel_2_30_31 |
| Old Testament Cosmic Sign References (`cosmic_signs_references`) | Matthew 24:29 | matthew_24_29 |

## act3CaseA — The Broken Cup

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Exodus 12:1–14 | `exodus_12_1_14` |
| Jeremiah 31:31–34 | `jeremiah_31_31_34` |
| Psalm 41:9 | `psalm_41_9` |
| Zechariah 11:12–13 | `zechariah_11_12_13` |
| Isaiah 53:12 | `isaiah_53_12` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Unleavened Bread Crumbs (`bread_crumbs`) | `exodus_12_1_14` | Matthew 26:26 — 'Jesus took bread, and after blessing it broke it and gave it to the disciples.' | The breaking of the matzah is called the 'afikomen' in the Passover Seder — traditionally hidden and later 'found' again. Early Christians saw this as a picture of Jesus's death and resurrection: broken, buried, and found alive. |
| Spilled Wine on the Linen (`wine_stain`) | `jeremiah_31_31_34` | Luke 22:20 — 'In the same way, after supper he took the cup, saying: This cup is the new covenant in my blood, which is poured out for you.' | The Passover Seder uses four cups of wine (Exodus 6:6–7). The third cup — the Cup of Redemption — is the one Jesus transformed into the cup of the New Covenant. The spilled wine at this cup's position is theologically charged: 'blood poured out' was exactly the language He used. |
| Shattered Clay Cup (`cup_fragments`) | - | Matthew 26:27 — 'And he took a cup, and when he had given thanks he gave it to them, saying, Drink of it, all of you.' | Breaking pottery in the Jewish tradition was sometimes associated with mourning or the breaking of a covenant (see Jeremiah 19:10–11, where Jeremiah shattered a clay jar as a prophetic act of judgement). A broken cup at the Passover table carries heavy symbolic weight. |
| Large Stone Water Jug (`water_jug`) | - | John 13:4–5 — 'He rose from supper... then he poured water into a basin and began to wash the disciples' feet.' | Isaiah 52:13–15 describes the Servant who 'shall startle many nations' — and immediately before this, is described as one who acts in a way that astonishes because of His humility. Jesus washing feet with this water fulfilled the spirit of what Isaiah described: the exalted One taking the lowest role. |
| Imprint of a Money Bag (`money_bag_impression`) | `zechariah_11_12_13` | John 13:29 — 'Since Judas had the money bag, some thought Jesus was telling him to buy what was needed for the feast, or give something to the poor.' | Judas carried the communal purse — and had recently agreed to betray Jesus for 30 silver coins (Matthew 26:14–16), fulfilling Zechariah 11:12. The presence of a money bag impression at the preparation table raises serious questions: what was Judas counting before the meal? |
| Fragment of Sop (Dipped Bread) (`betrayal_dipped_bread`) | `psalm_41_9` | John 13:26–30 — 'Jesus answered, It is he to whom I will give this morsel of bread when I have dipped it. So when he had dipped the morsel, he gave it to Judas... After he received the morsel, Satan entered into him. Jesus said, What you are going to do, do quickly.' | The giving of the dipped sop to Judas is the fulfilment of Psalm 41:9 ('even my close friend... who ate my bread has lifted his heel against me'). Jesus quoted this Psalm earlier that evening (John 13:18), identifying the traitor through an act of table fellowship. |
| Written Summary of Jesus's Words (`new_covenant_declaration`) | `jeremiah_31_31_34` | Luke 22:19–20; 1 Corinthians 11:24–25 — Paul records the same words, passed on 'from the Lord.' | Jeremiah 31:31–34 promised a 'new covenant' that would supersede the Mosaic Law — written on hearts, not stone. Jesus announced its establishment at this very table. The young scribe recording His words was preserving the fulfilment of a 600-year-old prophecy. |

*No changes. NOTE: `isaiah_53_12` is defined for this case but not used as a `relatedProphecy` anywhere — it's referenced only implicitly (Jesus "numbered with the transgressors"). Low priority since the case is otherwise fully covered.*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Unleavened Bread Crumbs (`bread_crumbs`) | Exodus 12:1–14 | exodus_12_1_14 |
| Unleavened Bread Crumbs (`bread_crumbs`) | Matthew 26:26 | matthew_26_26 |
| Spilled Wine on the Linen (`wine_stain`) | Jeremiah 31:31–34 | jeremiah_31_31_34 |
| Spilled Wine on the Linen (`wine_stain`) | Luke 22:20 | luke_22_20 |
| Shattered Clay Cup (`cup_fragments`) | Matthew 26:27 | matthew_26_27 |
| Large Stone Water Jug (`water_jug`) | John 13:4–5 | john_13_4 |
| Imprint of a Money Bag (`money_bag_impression`) | Zechariah 11:12–13 | zechariah_11_12_13 |
| Imprint of a Money Bag (`money_bag_impression`) | John 13:29 | john_13_29 |
| Fragment of Sop (Dipped Bread) (`betrayal_dipped_bread`) | Psalm 41:9 | psalm_41_9 |
| Fragment of Sop (Dipped Bread) (`betrayal_dipped_bread`) | John 13:26–30 | john_13_26 |
| Written Summary of Jesus's Words (`new_covenant_declaration`) | Jeremiah 31:31–34 | jeremiah_31_31_34 |
| Written Summary of Jesus's Words (`new_covenant_declaration`) | Luke 22:19–20 | luke_22_19 |
| Written Summary of Jesus's Words (`new_covenant_declaration`) | 1 Corinthians 11:24–25 | 1_corinthians_11_24 |

## act3CaseB — The Severed Ear

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Isaiah 53:7 | `isaiah_53_7` |
| Zechariah 13:7 | `zechariah_13_7` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Abandoned Linen Wrapper (`abandoned_linen`) | **`zechariah_13_7`** *(was `isaiah_53_7`)* | Mark 14:51-52 | **[CORRECTED]** Zechariah 13:7 — 'Strike the shepherd, and the sheep will be scattered' — was quoted by Jesus himself just hours earlier (Matthew 26:31) as a prediction of this exact moment. The unnamed young man fleeing naked into the night, abandoning even his clothing, is the most vivid single image of the disciples' scattering the prophecy foretold. |
| Extinguished Roman Torch (`dropped_torch`) | - | John 18:3 | John 18:3 notes they arrived with torches and lanterns, expecting a deep-woods manhunt. |
| Bloodied Scarf Fragment (`severed_ear_wrap`) | - | John 18:10 | Luke 22:50–51 and John 18:10 document Peter cutting off Malchus's ear, which Jesus immediately healed. |

*Fix applied: `abandoned_linen` previously linked to `isaiah_53_7` (Jesus's silence before his accusers), which has no real connection to a disciple fleeing the scene. Reassigned to `zechariah_13_7` (sheep scattering), which was otherwise unused in this case. FLAGGED: `isaiah_53_7` is now unlinked in this case — none of the three evidence items directly depict Jesus's silence. Recommend either a new evidence item (e.g. covering His non-resistance during the arrest) or removing `isaiah_53_7` from this case's prophecy list, since it's already covered later at trial (see act3CaseC territory).*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Abandoned Linen Wrapper (`abandoned_linen`) | Zechariah 13:7 | zechariah_13_7 |
| Abandoned Linen Wrapper (`abandoned_linen`) | Mark 14:51-52 | mark_14_51 |
| Extinguished Roman Torch (`dropped_torch`) | John 18:3 | john_18_3 |
| Bloodied Scarf Fragment (`severed_ear_wrap`) | John 18:10 | john_18_10 |

## act3CaseC — The Midnight Tribunal

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Isaiah 50:6 | `isaiah_50_6` |
| Micah 5:1 | `micah_5_1` |
| Psalm 27:12 | `psalm_27_12` |
| Psalm 35:11 | `psalm_35_11` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Rooster Feather (`rooster_feather`) | **`-`** *(was `micah_5_1`)* | Matthew 26:74-75 | **[CORRECTED]** The third denial led to the third crowing, fulfilling Jesus's own prediction of Peter's failure (Matthew 26:34). Supporting/narrative evidence — not directly Codex-linkable to one of this case's four defined prophecies. |
| Priestly Robe Fragment (`torn_robe`) | - | Matthew 26:65 | Caiaphas tore his robes to signal the charge of blasphemy when Jesus affirmed His identity. This action forms part of the trial narrative but is not itself a direct fulfilment of one of this case's defined prophecies. |
| Conflicting Depositions (`false_scroll`) | `psalm_27_12` | Mark 14:56-59 | The lack of consistent testimony exposes the trial as a fabrication. |
| Mocking Guards' Reed and Spittle (`mocking_guards`) | `isaiah_50_6` | Matthew 26:67–68 — 'Then they spat in his face and struck him with their fists. Others slapped him.' | Isaiah 50:6 declares, 'I gave my back to those who beat me, my cheeks to those who pulled out my beard; I did not hide my face from mocking and spitting.' The abuse inflicted by the Temple guards immediately after the trial is a direct fulfilment of the Suffering Servant prophecy. |
| Charcoal Briquette (`charcoal_remains`) | - | John 18:18 | Peter's denial by the fire fulfilled Jesus's prediction that he would deny three times. |

*Fix applied: `rooster_feather` previously linked to `micah_5_1`, which is the "strike the ruler on the cheek" prophecy — unrelated to Peter's denial. Changed to `-`. FLAGGED: `micah_5_1` is now unused in this case; it fits the guards' physical mockery of Jesus better than anything currently listed (there's a loose thematic overlap with `torn_robe`'s narrative text now, but the field can only hold one prophecy ID — consider a dedicated "mocking/beating" evidence item if you want Micah 5:1 explicitly codexed). `psalm_35_11` is also still unused — near-duplicate of `psalm_27_12`'s false-witness theme; consider merging or dropping.*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Rooster Feather (`rooster_feather`) | Matthew 26:74-75 | matthew_26_74 |
| Priestly Robe Fragment (`torn_robe`) | Isaiah 50:6 | isaiah_50_6 |
| Priestly Robe Fragment (`torn_robe`) | Matthew 26:65 | matthew_26_65 |
| Conflicting Depositions (`false_scroll`) | Psalm 27:12 | psalm_27_12 |
| Conflicting Depositions (`false_scroll`) | Mark 14:56-59 | mark_14_56 |
| Mocking Guards' Reed and Spittle (`mocking_guards`) | `isaiah_50_6` | Matthew 26:67–68 — 'Then they spat in his face and struck him with their fists. Others slapped him.' | Isaiah 50:6 declares, 'I gave my back to those who beat me, my cheeks to those who pulled out my beard; I did not hide my face from mocking and spitting.' The abuse inflicted by the Temple guards immediately after the trial is a direct fulfilment of the Suffering Servant prophecy. |
| Mocking Guards' Reed and Spittle (`mocking_guards`) | Isaiah 50:6 | isaiah_50_6 |
| Mocking Guards' Reed and Spittle (`mocking_guards`) | Matthew 26:67–68 | matthew_26_67 |
| Charcoal Briquette (`charcoal_remains`) | John 18:18 | john_18_18 |

*Note: the `Micah 5:1 | micah_5_1` fulfillment-link row was removed since `rooster_feather` no longer cites that prophecy and no other evidence claims it.*

## act3CaseD — The People's Choice

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Isaiah 53:3 | `isaiah_53_3` |
| Psalm 2:1-2 | `psalm_2_1_2` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Governor's Silver Basin (`pilates_basin`) | - | Matthew 27:24 — 'I am innocent of this man's blood; see to it yourselves.' | - |
| Claudia's Warning Scroll (`wifes_letter`) | - | Matthew 27:19 | - |
| The Insurgent's Dossier (`barabbas_warrant`) | `isaiah_53_3` | Mark 15:7; John 18:40 | - |

*No changes. NOTE: `psalm_2_1_2` is defined here but unused — it's correctly used in act4CaseB instead, so this may simply be an intentional cross-reference left in the case's prophecy list; low priority.*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| The Governor's Silver Basin (`pilates_basin`) | Matthew 27:24 | matthew_27_24 |
| Claudia's Warning Scroll (`wifes_letter`) | Matthew 27:19 | matthew_27_19 |
| The Insurgent's Dossier (`barabbas_warrant`) | Isaiah 53:3 | isaiah_53_3 |
| The Insurgent's Dossier (`barabbas_warrant`) | Mark 15:7 | mark_15_7 |
| The Insurgent's Dossier (`barabbas_warrant`) | John 18:40 | john_18_40 |

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

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Soldiers' Casting Dice (`split_dice`) | `psalm_22_16_18` | John 19:23–24 — 'Let's not tear it,' they said to one another. 'Let's decide by lot who will get it.' This happened that the scripture might be fulfilled... | Directly fulfils Psalm 22:18. While the victim hung dying, the execution detail cast lots for a high-quality, seamless tunic woven from top to bottom. |
| Blood-Stained Roman Hasta (`pierced_spear`) | `zechariah_12_10` | John 19:34 — 'Instead, one of the soldiers pierced Jesus's side with a spear, bringing a sudden flow of blood and water.' | Fulfils Zechariah 12:10 ('the one they have pierced') and protects the Passover Lamb requirement of Exodus 12:46 ('not one bone shall be broken'). The spear thrust proved the victim was already dead, making the leg-breaking unnecessary. |
| Shattered Limestone Fragment (`shattered_limestone`) | **`-`** *(was `psalm_34_20`)* | Matthew 27:51 — 'The earth shook, the rocks split and the tombs broke open.' | **[CORRECTED]** The earthquake, combined with the three hours of darkness described elsewhere in this case's evidence, served as a cosmic response to the execution. Supporting/narrative evidence — not directly tied to any single one of this case's six defined prophecies. |
| Thick Blue and Scarlet Threads (`torn_veil_thread`) | `amos_8_9` | Luke 23:45 — 'The sun stopped shining. And the curtain of the temple was torn in two.' | The Parokhet curtain blocked access to the Holy of Holies. Its top-to-bottom tear structurally verified that the old covenant system had split wide open, granting direct access to the presence of God. |
| Joseph's Market Bill for Fine Linen (`linen_shroud_receipt`) | `isaiah_53_9` | Mark 15:46 — 'So Joseph bought some linen cloth, took down the body, wrapped it in the linen, and placed it in a tomb...' | Fulfils Isaiah 53:9. Instead of being cast into the criminal dirt pits of Hinnom, Jesus was instantly reassigned to a wealthy man's private, rock-hewn garden tomb. |

*Fix applied: `shattered_limestone` previously carried `psalm_34_20` (bones not broken) — but its own narrative text talked about darkness/Amos 8:9 instead, which is already correctly assigned to `torn_veil_thread`. The field contradicted its own prose. Changed to `-`. FLAGGED: `psalm_34_20` is now unused in this case. It fits `pierced_spear` best thematically (the spear made leg-breaking unnecessary), but that evidence already correctly carries the more direct `zechariah_12_10` fulfilment. If you want Psalm 34:20 explicitly codexed, consider a dedicated "unbroken legs" evidence item alongside `pierced_spear` rather than folding it in. Also stripped stray `[cite: ...]` citation-tool artifacts left in the original narrative text.*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| Soldiers' Casting Dice (`split_dice`) | Psalm 22:16–18 | psalm_22_16_18 |
| Soldiers' Casting Dice (`split_dice`) | John 19:23–24 | john_19_23 |
| Blood-Stained Roman Hasta (`pierced_spear`) | Zechariah 12:10 | zechariah_12_10 |
| Blood-Stained Roman Hasta (`pierced_spear`) | John 19:34 | john_19_34 |
| Shattered Limestone Fragment (`shattered_limestone`) | Matthew 27:51 | matthew_27_51 |
| Thick Blue and Scarlet Threads (`torn_veil_thread`) | Amos 8:9 | amos_8_9 |
| Thick Blue and Scarlet Threads (`torn_veil_thread`) | Luke 23:45 | luke_23_45 |
| Joseph's Market Bill for Fine Linen (`linen_shroud_receipt`) | Isaiah 53:9 | isaiah_53_9 |
| Joseph's Market Bill for Fine Linen (`linen_shroud_receipt`) | Mark 15:46 | mark_15_46 |

*Note: the `Psalm 34:20 | psalm_34_20` fulfillment-link row was removed since `shattered_limestone` no longer cites that prophecy.*

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

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Displaced Sealing Stone (`rolled_stone`) | `isaiah_26_19` | Matthew 28:2 — 'There was a violent earthquake, for an angel of the Lord came down from heaven and, going to the tomb, rolled back the stone and sat on it.' | Isaiah 26:19 — 'Your dead will live, LORD; their bodies will rise — let those who dwell in the dust wake up and shout for joy.' The removal of the stone was not to let Jesus out — a resurrected, glorified body passed through locked doors (John 20:19). The stone was rolled away so witnesses could look in. |
| The Empty Burial Chamber (`empty_tomb`) | `psalm_16_10` | Luke 24:3 — 'When they entered, they did not find the body of the Lord Jesus.' | Psalm 16:10 — 'You will not let your holy one see corruption.' The empty tomb is the physical evidence that the Psalm's promise was kept. A body left long enough shows decomposition; no such evidence exists. Psalm 22:1–31 opens with the cry of abandonment Jesus spoke from the cross ('My God, my God, why have you forsaken me?') and closes in resurrection proclamation — the same psalm that describes His hands and feet pierced and His garments divided by lot. |
| Folded Burial Linens (`burial_linen`) | `psalm_16_10` | John 20:6–8 — 'He saw the strips of linen lying there, as well as the cloth that had been wrapped around Jesus' head. The cloth was still lying in its place, separate from the linen.' | John's Gospel records that the 'other disciple' (John) 'saw and believed' specifically because of how the linens were arranged. A body stolen hastily would leave disordered linens or none at all. The orderly, structured arrangement of the grave cloths pointed to something other than grave robbery. |
| The Angelic Proclamation (`angelic_witness`) | `psalm_16_10` | Matthew 28:2–7; Mark 16:5–7; Luke 24:4–7; John 20:12–13 | Psalm 103:20 describes angels as those who 'do his bidding.' The angelic announcement at the tomb echoes the angelic announcements at the nativity — both bookend Jesus's earthly life with heavenly proclamation. The consistency of the message across all four Gospel accounts, with slight variations in detail (one angel or two?), reflects the characteristics of independent eyewitness testimony. |
| The Soldiers' Broken Report (`guard_report`) | `hosea_6_2` | Matthew 28:2–4 — 'The guards shook for fear of him and became like dead men.' Matthew 28:11–15 — the chief priests bribed the guards to say the disciples had stolen the body. | The bribe to the guards fulfils the pattern of institutional deception against God's purposes — similar to how the chief priests had bribed Judas (Matthew 26:14–16). The very people who guarded against resurrection were the first non-disciple witnesses of the supernatural event. Jonah 1:17 / Matthew 12:40 — Jesus named His own third-day resurrection the 'sign of Jonah,' the three days in the tomb mirroring Jonah's three days in the great fish. |
| Unused Burial Spices (`spice_jars`) | - | Mark 16:1 — 'Mary Magdalene, Mary the mother of James, and Salome bought spices so that they might go to anoint Jesus's body.' | Nicodemus had already brought 75 pounds of myrrh and aloes for the burial (John 19:39–40), fulfilling the wealthy burial of Isaiah 53:9. The women's additional spices were for the anointing ritual completed after the Sabbath — but there was no body to anoint. The unused jars are a symbol of an interrupted mourning, halted by resurrection. |
| Mary Magdalene's Testimony (`mary_encounter`) | `isaiah_53_10_11` | John 20:11–18 — the most detailed and intimate resurrection appearance account in Scripture. Isaiah 43:1 — 'I have called you by name; you are mine.' | Isaiah 53:10–11 promised the Suffering Servant would 'see his offspring and prolong his days' after being crushed — a resurrection paradox. The risen Christ's first act was to call Mary by name (echoing Isaiah 43:1), sending her as the primary witness. In a Roman court a woman's testimony was inadmissible; making a former demoniac the lead witness is exactly the kind of counter-cultural detail that confirms authenticity rather than fabrication. |

*No changes to `relatedProphecy` assignments. FLAGGED: `psalm_22_1_31` is discussed at length in `empty_tomb`'s narrative text but the field itself holds `psalm_16_10`. Since each evidence item carries a single Codex tag, this is fine as-is — flagging only in case you'd rather give Psalm 22 its own dedicated evidence row (e.g. tied to the crucifixion scene in act3CaseE, where its "pierced hands and feet" / "divided garments" content would fit even more naturally alongside `split_dice`).*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| The Displaced Sealing Stone (`rolled_stone`) | Isaiah 26:19 | isaiah_26_19 |
| The Displaced Sealing Stone (`rolled_stone`) | Matthew 28:2 | matthew_28_2 |
| The Empty Burial Chamber (`empty_tomb`) | Psalm 16:10 | psalm_16_10 |
| The Empty Burial Chamber (`empty_tomb`) | Luke 24:3 | luke_24_3 |
| Folded Burial Linens (`burial_linen`) | Psalm 16:10 | psalm_16_10 |
| Folded Burial Linens (`burial_linen`) | John 20:6–8 | john_20_6 |
| The Angelic Proclamation (`angelic_witness`) | Psalm 16:10 | psalm_16_10 |
| The Angelic Proclamation (`angelic_witness`) | Matthew 28:2–7 | matthew_28_2 |
| The Angelic Proclamation (`angelic_witness`) | Mark 16:5–7 | mark_16_5 |
| The Angelic Proclamation (`angelic_witness`) | Luke 24:4–7 | luke_24_4 |
| The Angelic Proclamation (`angelic_witness`) | John 20:12–13 | john_20_12 |
| The Soldiers' Broken Report (`guard_report`) | Hosea 6:2 | hosea_6_2 |
| The Soldiers' Broken Report (`guard_report`) | Matthew 28:2–4 | matthew_28_2 |
| The Soldiers' Broken Report (`guard_report`) | Matthew 28:11–15 | matthew_28_11 |
| Unused Burial Spices (`spice_jars`) | Mark 16:1 | mark_16_1 |
| Mary Magdalene's Testimony (`mary_encounter`) | Isaiah 53:10–11 | isaiah_53_10_11 |
| Mary Magdalene's Testimony (`mary_encounter`) | John 20:11–18 | john_20_11 |
| Mary Magdalene's Testimony (`mary_encounter`) | Isaiah 43:1 | isaiah_43_1 |

## act4CaseB — The Guard's Report

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Psalm 2:1–2 | `psalm_2_1_2` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| High-Grade Sanctuary Coins (`bribe_shekels`) | `psalm_2_1_2` | Matthew 28:12 — the chief priests met with the elders and devised a plan, giving the soldiers a 'large sum of money.' | The bribe money is itself the physical evidence of Psalm 2:1–2's 'rulers take counsel together against the LORD and against his anointed' — Israel's own religious leaders conspiring to suppress the resurrection they could not disprove. |
| Snapped Clay Roman Seal (`broken_imperial_seal`) | `psalm_2_1_2` | Matthew 27:66 — they went and made the tomb secure by 'putting a seal on the stone and posting the guard.' | The broken imperial seal is physical proof that Rome's own security measures — meant to make any resurrection claim impossible to fake — were the very thing overcome, undercutting the guards' cover story. |
| Shattered Pilum Shaft (`shattered_spear`) | `psalm_2_1_2` | Matthew 28:2 — there was a violent earthquake, for an angel of the Lord came down from heaven and rolled back the stone. | A soldier's dropped and shattered weapon speaks to the guards' terror described in Matthew 28:4 ('the guards were so afraid... that they shook and became like dead men') — the earthly power structure the conspirators relied on was overwhelmed in an instant. |
| Official Sanhedrin Report (`sanhedrin_report`) | **`psalm_2_1_2`** *(was blank)* | **[FILLED IN]** Matthew 28:11 — 'While the women were on their way, some of the guards went into the city and reported to the chief priests everything that had happened.' | This report is the paper trail of the conspiracy itself — the Sanhedrin's own internal record of receiving the guards' account and choosing to suppress rather than investigate it, matching the pattern of rulers plotting against God's anointed described in Psalm 2:1–2. |

*Fix applied: the duplicate `High-Grade Sanctuary Coins (bribe_shekels)` row (it appeared twice in the original table) has been removed. `sanhedrin_report` was previously an empty placeholder row with no `bibleRef` or narrative text — filled in above with a defensible citation and link text; happy to revise the wording if you had different intent for this evidence item.*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| High-Grade Sanctuary Coins (`bribe_shekels`) | Psalm 2:1–2 | psalm_2_1_2 |
| Snapped Clay Roman Seal (`broken_imperial_seal`) | Psalm 2:1–2 | psalm_2_1_2 |
| Shattered Pilum Shaft (`shattered_spear`) | Psalm 2:1–2 | psalm_2_1_2 |
| Official Sanhedrin Report (`sanhedrin_report`) | Psalm 2:1–2 | psalm_2_1_2 |
| Official Sanhedrin Report (`sanhedrin_report`) | Matthew 28:11 | matthew_28_11 |

## act4CaseC — Peter's Restoration

### Prophecies (defined for this case)

| Reference | Prophecy ID |
|---|---|
| Zechariah 13:7 | `zechariah_13_7` |
| Ezekiel 34:11-16 | `ezekiel_34_11-16` |

### Evidence Links

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Charcoal Fire (`charcoal_fire`) | `zechariah_13_7` | John 21:9 — 'When they got out of the boat, they saw a fire of burning coals there with fish lying on it, and bread.' | The fire triggers Peter's memory of his denial, but now transforms that shame into restoration around the risen Christ. |
| The Miraculous Catch (`miraculous_catch`) | `ezekiel_34_11-16` | John 21:10–11 — 'Bring some of the fish you have just caught... Although there were so many, the net was not torn.' | This echoes the original calling of the disciples (Luke 5:1-11) and demonstrates that obedience to Christ yields supernatural results. |
| Bread and Fish Breakfast (`bread_breakfast`) | `ezekiel_34_11-16` | **[CORRECTED]** John 21:9 — 'When they landed, they saw a fire of burning coals there with fish on it, and some bread.' | The 'bread of life' (John 6) now eats bread with Peter — the broken bread that once condemned him now nourishes him. |
| The Threefold Commission (`threefold_commission`) | `ezekiel_34_11-16` | John 21:15-17 — 'Feed my lambs... Feed my sheep... Tend my sheep.' | Peter's three denials (crow, cock, fire) are met with three commissions (feed, tend, shepherd) showing prophetic reversal. |
| Risen Appearance (`galilean_apparition`) | - | **[CORRECTED]** John 21:12 — 'Jesus said to them, "Come and have breakfast." None of the disciples dared ask him, "Who are you?" They knew it was the Lord.' | Despite seeing Him die, the disciples knew — supernaturally — who stood before them. Faith recognized its Author. |

*Fix applied: two rows (`bread_breakfast`, `galilean_apparition`) had truncated quotes ending mid-sentence with a stray backslash-quote. Filled in with the actual verse text.*

### Fulfillment Links

| Evidence | Reference | Bible ID |
|---|---|---|
| The Charcoal Fire (`charcoal_fire`) | Zechariah 13:7 | zechariah_13_7 |
| The Charcoal Fire (`charcoal_fire`) | John 21:9 | john_21_9 |
| The Miraculous Catch (`miraculous_catch`) | Ezekiel 34:11-16 | ezekiel_34_11-16 |
| The Miraculous Catch (`miraculous_catch`) | John 21:10-11 | john_21_10 |
| Bread and Fish Breakfast (`bread_breakfast`) | Ezekiel 34:11-16 | ezekiel_34_11-16 |
| Bread and Fish Breakfast (`bread_breakfast`) | John 21:9 | john_21_9 |
| The Threefold Commission (`threefold_commission`) | Ezekiel 34:11-16 | ezekiel_34_11-16 |
| The Threefold Commission (`threefold_commission`) | John 21:15-17 | john_21_15 |
| Risen Appearance (`galilean_apparition`) | John 21:12 | john_21_12 |

---

## Change Log

**Auto-fixed (data errors):**
1. act2CaseB `grave_dirt` — corrected misreading of John 11:39 (was described as evidencing preservation oils; actually Martha's objection about the smell of decay).
2. act3CaseB `abandoned_linen` — `relatedProphecy` changed from `isaiah_53_7` to `zechariah_13_7` (better thematic fit; was also unused in-case).
3. act3CaseC `rooster_feather` — `relatedProphecy` changed from `micah_5_1` to `-` (no defined prophecy in this case actually fits denial/rooster-crowing).
4. act3CaseE `shattered_limestone` — `relatedProphecy` changed from `psalm_34_20` to `-` (field contradicted its own narrative text, which cites Amos 8:9 — already correctly owned by `torn_veil_thread`).
5. act4CaseB — removed duplicated `bribe_shekels` row.
6. act4CaseB `sanhedrin_report` — filled in previously blank `bibleRef` and narrative text.
7. act4CaseC `bread_breakfast` and `galilean_apparition` — repaired truncated quotes.
8. act3CaseE — stripped stray `[cite: ...]` citation-tool artifacts from narrative text.
9. act1CaseA `palm_branch` — corrected date attribution for 1 Maccabees 13:51 (141 BC, not "the Maccabean revolt, 165 BC").

**Flagged for a decision (not auto-changed):**
- act2CaseC: `isaiah_13_10` defined but unused (redundant with `joel_2_30_31`).
- act3CaseA: `isaiah_53_12` defined but unused.
- act3CaseB: `isaiah_53_7` now unused after fix #2 above — needs new evidence or removal from case.
- act3CaseC: `micah_5_1` now unused after fix #3 above; `psalm_35_11` also unused (near-duplicate of `psalm_27_12`).
- act3CaseD: `psalm_2_1_2` defined but unused in this case (used correctly elsewhere in act4CaseB).
- act3CaseE: `psalm_34_20` now unused after fix #4 above — best fits `pierced_spear`, which already carries `zechariah_12_10`.
- act4CaseA: `psalm_22_1_31` discussed in prose but not set as any evidence's `relatedProphecy` field.
- act1CaseB: chronological blending of John 2:15 (early ministry) with Passion-week Synoptic cleansing accounts — a scholarly/editorial choice worth making deliberately.


---

# Suggested Additional Evidence Items for Currently Unused Prophecies

These are **editorial suggestions** to give every prophecy a dedicated Evidence item and remove orphaned `relatedProphecy` values.

## act2CaseC — The End of the Age

### Isaiah 13:10 (`isaiah_13_10`)
**Suggested Evidence:** **Darkened Sun Record** (`darkened_sun_record`)
- **relatedProphecy:** `isaiah_13_10`
- **bibleRef:** Matthew 24:29
- **Narrative Link:** Isaiah 13:10 foretells the darkening of the heavenly lights. Jesus quotes this same imagery when describing the signs preceding His return.

## act3CaseA — The Broken Cup

### Isaiah 53:12 (`isaiah_53_12`)
**Suggested Evidence:** **List of the Twelve** (`twelve_roll`)
- **relatedProphecy:** `isaiah_53_12`
- **bibleRef:** Luke 22:37
- **Narrative Link:** Jesus explicitly applies Isaiah 53:12 ("numbered with the transgressors") to Himself during the Last Supper.

## act3CaseB — The Severed Ear

### Isaiah 53:7 (`isaiah_53_7`)
**Suggested Evidence:** **Unresisting Prisoner's Cord** (`prisoner_cord`)
- **relatedProphecy:** `isaiah_53_7`
- **bibleRef:** Matthew 26:52–54
- **Narrative Link:** Jesus refuses armed resistance and willingly submits to arrest, embodying the silent Lamb led to slaughter.

## act3CaseC — The Midnight Tribunal

### Micah 5:1 (`micah_5_1`)
**Suggested Evidence:** **Guard's Reed** (`guard_reed`)
- **relatedProphecy:** `micah_5_1`
- **bibleRef:** Matthew 26:67–68
- **Narrative Link:** Israel's ruler is struck and mocked exactly as Micah foretold.

### Psalm 35:11 (`psalm_35_11`)
**Suggested Evidence:** **Perjured Witness Statement** (`perjured_testimony`)
- **relatedProphecy:** `psalm_35_11`
- **bibleRef:** Mark 14:57–59
- **Narrative Link:** 'Ruthless witnesses come forward' precisely matches the false testimony at the trial.

## act3CaseD — The People's Choice

### Psalm 2:1–2 (`psalm_2_1_2`)
**Suggested Evidence:** **Joint Verdict Scroll** (`joint_verdict`)
- **relatedProphecy:** `psalm_2_1_2`
- **bibleRef:** Luke 23:12
- **Narrative Link:** Herod and Pilate become allies against God's Anointed, fulfilling Psalm 2.

## act3CaseE — The Final Sacrifice

### Psalm 34:20 (`psalm_34_20`)
**Suggested Evidence:** **Unbroken Tibiae Report** (`unbroken_legs`)
- **relatedProphecy:** `psalm_34_20`
- **bibleRef:** John 19:31–36
- **Narrative Link:** Jesus' legs were not broken, fulfilling the Passover Lamb imagery and Psalm 34:20.

## act4CaseA — The Empty Tomb

### Psalm 22:1–31 (`psalm_22_1_31`)
**Suggested Evidence:** **Resurrection Psalm Scroll** (`psalm22_scroll`)
- **relatedProphecy:** `psalm_22_1_31`
- **bibleRef:** Luke 24:26–27
- **Narrative Link:** The Psalm that begins with suffering ends in worldwide proclamation and vindication, pointing beyond the cross to resurrection.
