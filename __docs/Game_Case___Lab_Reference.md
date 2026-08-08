# **Game Case & Lab Reference Update**

< [Back to Main Document](Miracle Maker.md)

## Table of Contents

- [System Mechanics & UI Specifications](#1-system-mechanics--ui-specifications)
- [Lab Action Table](#2-lab-action-table)
- [Difficulty Scaling Settings](#3-difficulty-scaling-settings)
- [State Variables & Code Data Blueprint](#4-state-variables--code-data-blueprint)
- [Holy Week Case File Database](#holy-week-case-file-database)

# **Lab Actions & Case Reference Manual — Master Specification**

This document serves as the master source-of-truth reference manual for all Lab Section mechanics, UI specifications, retry policies, and case evidence databases across the investigation system, featuring full coverage for **Act IV**.

## Typology vs. Predictive Prophecy

The Codex now distinguishes between:
1.  **Fulfilled Prophecy:** Direct predictive Old Testament statements fulfilled in the New Testament.
2.  **Typological Fulfilments (Types & Shadows):** Events where an earlier biblical pattern (e.g., Exodus 12) intentionally foreshadows Christ rather than predicting Him in a single prophetic text.

## **1\. System Mechanics & UI Specifications**

### **Retry Policy Matrix**

| Condition | Retry Allowed? | Items Consumed? | Notes |
| :---- | :---- | :---- | :---- |
| **Wrong answer submitted** | Yes | No | Increments lab try counter; triggers Helping Hand eligibility. |
| **Correct answer submitted** | No | Yes | Evidence marked used in shared pool (usedEvidence). |
| **Timeline submit (any)** | Yes | No | Per-slot visual feedback (green/red); retry immediately. |
| **Contradict submit (any)** | Yes | No | Evaluates false positives/negatives; retry immediately. |

### **Helping Hand Mechanic**

> * **Activation Trigger**: Unlocks only after at least one failed submission on a specific lab tab (helped\[tab\] \=== true).  
> * **Cost**: Consumes Evidence points based on difficulty (easy: 2, medium: 5, hard: 8).  
> * **Credit Penalty**: Resolving a lab after using Helping Hand grants **reduced credit** (halved points). Resets helped and helpActive upon lab completion.  
> * **Independence**: Hint and Helping Hand operate independently; both can be used on the same lab task.

### **Info Button ("i") & Solving-Clue System**

Every evidence item's **Info Button** opens a modal containing two distinct sections:

> 1. **Detail**: General narrative, flavor, and contextual historical text (consistent across all lab tabs).  
> 2. **\<Lab\> Clue**: Specific analytical guidance customized for the active lab tab (compare, link, timeline, contradict). Passed via openDetail(ev, tabName).

**Answer-Leak Prevention Rule**: The detail modal must **never** explicitly print an item's fake status (no "Status: FAKE/REAL" text). Contradict analysis must be derived strictly through the reasoning provided in clues.contradict.

### **Button-Group UI Pattern**

> * **Grid Cards** (2-column layout for Compare and Contradict banks):  
>   \<div class="ev-card \[selected|used\]"\>  
>     \<div class="ev-card-main"\>...icon \+ name (click to select)...\</div\>  
>     \<div class="info-btn" onclick="openDetail(ev, currentTab)"\>i\</div\>  
>   \</div\>

> * **List Chips / Slots** (Link bank and Timeline drop-zones):  
>   \<div class="slot \[selected-link|used\]"\>  
>     \<div class="slot-main"\>...icon \+ name (click or drag to place)...\</div\>  
>     \<div class="info-btn" onclick="openDetail(ev, currentTab)"\>i\</div\>  
>   \</div\>

## **2\. Lab Action Table**

# **Lab Actions & Clue Analysis Reference Guide**

This document serves as the master forensic reference for all investigative acts.

## **Lab Mechanics Overview**

> 1. **Category Assignment**: Items classified under event, people, or prophecy.  
> 2. **Timeline Ordering**: Items placed in chronological sequence.  
> 3. **Clue Generation**: Analytical vectors including Compare, Link, Timeline, and Contradict.

## **Act I: Early Ministry Events**

### **Case A: The Missing Donkey (triumphal\_entry)**

**Prophecies**: Zechariah 9:9, Psalm 118:25–26, Genesis 49:10–11, Malachi 3:1.

| ID | Cat | Order | Primary Clue |
| :---- | :---- | :---- | :---- |
| cloaks | people | 1 | Connects disciples' cloaks to the colt. |
| donkey\_tracks | event | 1 | Confirms single animal presence. |

**Lab Outcomes**: cloaks \+ peter (Motive Clarified).

## **Act II: Authority & Teaching**

### **Case A: The Silenced Teacher (authority\_challenged)**

**Prophecies**: Psalm 118:22, Isaiah 5:1–7, Malachi 3:1, Daniel 7:13–14.

| ID | Cat | Order | Primary Clue |
| :---- | :---- | :---- | :---- |
| question\_scroll | event | 1 | Official written challenge from priests. |
| cornerstone\_carving | prophecy | 3 | Inscribed stone fulfilling Psalm 118\. |

## **Act III: Passion & Arrest**

### **Case B: The Severed Ear (gethsemane\_arrest)**

**Prophecies**: Zechariah 13:7, Isaiah 53:7.

| ID | Cat | Order | Primary Clue |
| :---- | :---- | :---- | :---- |
| abandoned\_linen | event | 1 | Disciples' cloak dropped as they fled. |
| severed\_ear\_wrap | people | 3 | Bloodied wrap from healed servant. |

## **Act IV: Resurrection Victory**

### **Case A: The Empty Tomb (resurrection)**

**Prophecies**: Psalm 16:10, Hosea 6:2, Isaiah 26:19.

| ID | Cat | Order | Primary Clue |
| :---- | :---- | :---- | :---- |
| burial\_linen | event | 1 | Intact, orderly linens disprove body theft. |
| guard\_report | people | 5 | Exposes cover-up conspiracy. |

**Lab Outcomes**: guard\_report \+ marcus (Exposed cover-up).

| Action | Task | Correct Solution | Success Feedback | Success Scoring | Failure Feedback | Failure Scoring | Helping Hand Assist |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **Compare** | Select 2 evidence items that share a direct connection or prophecy fulfillment. | Valid matched pair (e.g., burial\_linen \+ empty\_tomb) | Reasoning-based explanation with biblical cross-reference. | \+10 Deduction \+3 Evidence | Reasoning-based feedback stating why items do not correlate. | \+5 Doubt (× penalty multiplier) | Auto-selects one correct pairing partner into Slot A. |
| **Link** | Classify **every** active evidence card into one of 3 categories: People & Suspects, Prophecy & Scripture, Event Trail. | Correct group assignment for all cards via evidenceGroupMap. | Explains the role of each category within the case context. | \+10 Evidence \+10 Deduction | Highlights incorrect cards in red and correct cards in green. Cards are retained for retry. | \+5 Doubt (× penalty multiplier) | Auto-places one unassigned card into its correct group. |
| **Timeline** | Drag/place all **real** evidence cards into exact chronological order. | Sequential array matching realTimelineOrder. | Confirms the true historical sequence of events. | \+10 Deduction | Per-slot visual indicators (green \= correct position, red \= incorrect position). | \+5 Doubt (× penalty multiplier) | Auto-places one item into its correct timeline slot. |
| **Contradict** | Select all fabricated, misleading, or bribed evidence items. | All items where fake \=== true. | Names the identified fake items with specific reasons for their falsity. | \+15 Challenge (full) \+8 Challenge (partial) | Indicates if false positives were included or remaining fakes exist. | \+10 Doubt (× penalty multiplier) | Auto-selects one fake item. |

## **3\. Difficulty Scaling Settings**

| Setting Key | Easy | Medium | Hard |
| :---- | :---- | :---- | :---- |
| hintCost | 0 | 3 | 5 |
| helpCost | 2 | 5 | 8 |
| penaltyMul | 0.5x | 1.0x | 1.5x |
| timelineSlots | 3 | 5 | All real items |
| linkIncludeFakes | false | true | true |
| linkShowDesc | true | true | false |
| contradictFinds | 1 (any fake) | 2 (all fakes) | 2 (all fakes) |

## **4\. State Variables & Code Data Blueprint**

// State Schema  
let difficulty \= 'medium';  
let scores \= { deduction: 0, evidence: 25, challenge: 0, doubt: 0 };  
let currentTab \= 'compare';  
let compareSelected \= \[\];  
let linkGroupAssignments \= {};      // { evidenceId: groupId }  
let contradictSelected \= new Set();  
let timelineSlots \= \[\];             // Array of evidenceId | null  
let usedEvidence \= new Set();       // Retired items pool  
let tries \= { compare: 0, link: 0, timeline: 0, contradict: 0 };  
let helped \= { compare: false, link: false, timeline: false, contradict: false };  
let helpActive \= { compare: false, link: false, timeline: false, contradict: false };

// Standard Group Definitions for Link Lab  
const groupDefinitions \= \[  
  { id: 'people',   name: '👥 People & Suspects',   desc: 'Disciples, Roman guards, rulers, and key witnesses' },  
  { id: 'prophecy', name: '📜 Prophecy & Scripture', desc: 'Old Testament scrolls and fulfilled Messianic passages' },  
  { id: 'event',    name: '🐾 Event Trail',          desc: 'Physical artifacts, ground traces, and official records' }  
\];

# Holy Week Case File Database

## ACT I: The Arrival

### Case: `triumphal_entry` (The Missing Donkey)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Zechariah 9:9 | `zechariah_9_9` | Prophecy |
| Psalm 118:25–26 | `psalm_118_25_26` | Prophecy |
| Genesis 49:10–11 | `genesis_49_10_11` | Prophecy |
| Malachi 3:1 | `malachi_3_1` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Two Disciples' Cloaks (`cloaks`) | `genesis_49_10_11` | Mark 11:7 | This mirrors 2 Kings 9:13 where cloaks were spread before King Jehu — a royal gesture the disciples repeated on the road to Jerusalem. |
| Fresh Hoofprints (`donkey_tracks`) | - | Luke 19:35–36 | The route from the Mount of Olives into Jerusalem through the eastern gate mirrors the processional route described in Ezekiel 44:1–3, associated with the glory of God entering the city. |
| Villager's Testimony (`witness_account`) | - | Mark 11:3–6 | Jesus's foreknowledge of the exact response to give is consistent with His omniscience, and mirrors how the Passover lamb was 'set apart' by divine instruction (Exodus 12:3–6). |
| Zechariah 9:9 Scroll Fragment (`prophecy_scroll`) | `zechariah_9_9` | Matthew 21:4–5 | Zechariah 9:9 was written around 520 BC. Zechariah himself arrived back in Judah after the Babylonian exile — a people who desperately needed a king. His vision of a humble, donkey-riding king was a hope that Jesus publicly claimed. |
| Fresh-Cut Palm Branch (`palm_branch`) | `psalm_118_25_26` | John 12:13 | In the Maccabean era, palm branches became a symbol of Jewish national liberation and celebration (1 Maccabees 13:51 — Simon Maccabeus's entry into the Jerusalem citadel, 141 BC). The crowd was making a political and spiritual statement — this man is our king and deliverer. |
| Cut Rope at the Tethering Post (`rope_fibers`) | - | Mark 11:2 | Jesus specified it must be a colt 'no one has ever ridden' — in Jewish law, an animal used for sacred purposes must be one that has not been used for common work (Numbers 19:2; Deuteronomy 21:3). This detail proves the act was religiously intentional, not criminal. |
| Pharisee's Written Complaint (`crowd_testimony`) | `malachi_3_1` | Luke 19:39–40 | The Pharisees recognised the messianic implication of the palm branches and shouts. John 12:19 records their panic: 'Look how the whole world has gone after him!' |
| Psalm 118:25–26 Scroll Fragment (`psalm_118_25_26_scroll`) | `psalm_118_25_26` | Psalm 118:25–26 | Supplementary primary-source scroll evidence for this case's Psalm 118:25–26 fulfilment (paired with `palm_branch`). |
| Genesis 49:10–11 Scroll Fragment (`genesis_49_10_11_scroll`) | `genesis_49_10_11` | Genesis 49:10–11 | Supplementary primary-source scroll evidence for this case's Genesis 49:10–11 fulfilment (paired with `cloaks`). |
| Malachi 3:1 Scroll Fragment (`malachi_3_1_scroll`) | `malachi_3_1` | Malachi 3:1 | Supplementary primary-source scroll evidence for this case's Malachi 3:1 fulfilment (paired with `crowd_testimony`). |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Forged Donkey Sale Receipt  
**ID:** `triumphal_entry_fake`

*   **Initial Conclusion:** The disciples stole the donkey colt.
*   **Forensic Findings:**
    *   The ink has not fully soaked into the papyrus fibers, suggesting it was written very recently.
    *   The signature does not match known samples of Tobias's handwriting.
    *   The receipt uses a Roman date format, whereas Tobias, a local villager, uses the Hebrew calendar.
*   **Type of Deception:** Forged.
*   **Likely Author & Motive:** Eleazar the Sadducee, to reframe a prophetic event as a common crime and discredit Jesus's followers.
*   **Alternative Narrative Supported:** *Jesus the Thief.* This evidence supports the narrative that Jesus's movement is built on lawlessness, not divine authority.


### Case: `temple_cleansing` (The Overturned Tables)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Malachi 3:1 | `malachi_3_1` | Prophecy |
| Isaiah 56:7 | `isaiah_56_7` | Prophecy |
| Psalm 69:9 | `psalm_69_9` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Shattered Dove Cages (`broken_cages`) | `isaiah_56_7` | Leviticus 5:7 | Isaiah 56:7 — 'My house shall be called a house of prayer for all nations' — is the prophecy Jesus explicitly quoted as He drove out the sellers. The dove trade was the clearest abuse of it: Leviticus 5:7 allows doves as a concession for poverty, yet the priests exploited this legal requirement with exorbitant commercial markups, locking the poor and the nations out of the very prayer court Isaiah said was for them. That exploitation directly triggered Jesus's anger. |
| Scattered Tyrian Shekels (`scattered_shekels`) | `malachi_3_1` | Exodus 30:13 | Exodus 30:13 required a half-shekel temple offering. The priests exploited this by mandating Tyrian shekels, forcing pilgrims to pay massive exchange fees. |
| Discarded Whip of Cords (`whip_of_cords`) | `malachi_3_1` | John 2:15 | John 2:15 specifically details Him weaving this instrument on the spot before initiating the cleansing. |
| Malachi 3:1 Scroll Fragment (`malachi_3_1_b_scroll`) | `malachi_3_1` | Malachi 3:1 | Supplementary primary-source scroll evidence for this case's Malachi 3:1 fulfilment (paired with `scattered_shekels` / `whip_of_cords`). |
| Isaiah 56:7 Scroll Fragment (`isaiah_56_7_scroll`) | `isaiah_56_7` | Isaiah 56:7 | Supplementary primary-source scroll evidence for this case's Isaiah 56:7 fulfilment (paired with `broken_cages`). |
| Psalm 69:9 Scroll Fragment (`psalm_69_9_scroll`) | `psalm_69_9` | Psalm 69:9 | Supplementary primary-source scroll evidence for this case's Psalm 69:9 fulfilment. |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Planted Roman Coin  
**ID:** `temple_cleansing_fake`

*   **Initial Conclusion:** Jesus's actions were an anti-Roman protest, not a religious one.
*   **Forensic Findings:**
    *   The coin is a denarius of Tiberius, but it lacks the grime and wear of other coins found at the scene.
    *   Unlike the Tyrian shekels, it has no Temple dust in its crevices.
    *   The coin's mint date is from a batch known to have entered circulation in Jerusalem *after* the cleansing event.
*   **Type of Deception:** Planted (Genuine but Taken Out of Context).
*   **Likely Author & Motive:** Malachi the money changer, to escalate the incident from a religious dispute to a state crime, hoping to trigger a Roman military response.
*   **Alternative Narrative Supported:** *Jesus the Revolutionary.* This evidence supports the narrative that Jesus is a political agitator aiming to overthrow Roman rule.


### Case: `fig_tree_incident` (The Barren Fig Tree)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Micah 7:1 | `micah_7_1` | Prophecy |
| Jeremiah 8:13 | `jeremiah_8_13` | Prophecy |
| Psalm 33:8–9 | `psalm_33_8_9` | Prophecy |
| Zechariah 4:6–7 | `zechariah_4_6_7` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Description of the Fig Tree (Monday) (`cursed_fig_tree_desc`) | `micah_7_1` | Mark 11:12–14 | The tree's appearance—leaves but no fruit—symbolized Israel's outward show of religiosity without genuine spiritual fruit, echoing prophetic laments like Micah 7:1. |
| The Withered Fig Tree (Tuesday) (`withered_fig_tree_state`) | `jeremiah_8_13` | Mark 11:20–21 | The rapid, complete withering fulfilled prophecies of judgment on unfruitfulness, such as Jeremiah 8:13, where God threatens to remove fruit and wither leaves. |
| Peter's Astonished Reaction (`peter_astonishment`) | `psalm_33_8_9` | Mark 11:21 | Psalm 33:8-9 declares that all should stand in awe of Him because 'He spoke, and it came to be.' Peter’s reaction is the physical fulfillment of this reverence when confronted with divine command. |
| Jesus's Teaching on Faith (`disciples_faith_lesson`) | `zechariah_4_6_7` | Mark 11:22–24 | Zechariah 4:7 speaks of a 'mighty mountain' becoming 'level ground' by the Spirit. Jesus adopts this imagery to show that faith connects the believer to that same mountain-moving power. |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Diseased Fig Leaf  
**ID:** `fig_tree_incident_fake`

*   **Initial Conclusion:** The fig tree withered due to a natural blight, not a curse.
*   **Forensic Findings:**
    *   The leaf shows genuine signs of agricultural blight.
    *   However, its species (Sycomore-fig) does not match the cursed tree (Common Fig).
    *   Pollen analysis shows it originated from an orchard on the other side of the Mount of Olives.
*   **Type of Deception:** Misleading Context (Genuine but Misleading).
*   **Likely Author & Motive:** A skeptical local (like Jemimah), to provide a rational, naturalistic explanation for the event and dismiss the miracle.
*   **Alternative Narrative Supported:** *Jesus the Fraud.* This evidence supports the narrative that Jesus's miracles are merely coincidences or staged illusions.


## ACT II: The Teacher

### Case: `authority_challenged` (The Silenced Teacher)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Psalm 118:22–23 | `psalm_118_22_23` | Prophecy |
| Isaiah 5:1–7 | `isaiah_5_1_7` | Prophecy |
| Daniel 7:13–14 | `daniel_7_13_14` | Prophecy |
| Malachi 3:1 | `malachi_3_1` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Formal Authority Challenge (`question_scroll`) | `malachi_3_1` | Matthew 21:23 | Malachi 3:1 predicted the Lord coming to His temple with authority. The irony of the challenge is that they were asking for credentials from the very One whose authority derived directly from God. |
| Sketch of the Vineyard Parable (`parable_fragments`) | `isaiah_5_1_7` | Matthew 21:33–45 | Isaiah 5:1–7 is the Song of the Vineyard — God's lament over Israel's unfaithfulness. Jesus deliberately echoed it. The bystander sketching this recognised the connection immediately. |
| Rejected Cornerstone Fragment (`cornerstone_carving`) | `psalm_118_22_23` | Matthew 21:42 | Psalm 118:22–23 was a coronation Psalm, used at Temple dedications. Jesus quoted it at the very Temple whose builders were rejecting Him. The rejected stone lying in the construction debris became a powerful object lesson for anyone listening. |
| Denarius of Tiberius Caesar (`coin_of_caesar`) | - | Matthew 22:19–21 | The coin bore Caesar's image (imago). Jesus's answer pointed to something deeper: humanity bears God's image (Genesis 1:26–27, imago Dei). The coin question about taxation became a profound statement about identity and allegiance — Caesar's image on metal; God's image on people. |
| Withered Fig Leaf (`fig_leaf_withered`) | - | Mark 11:20–21 | Micah 7:1 and Jeremiah 8:13 both use a barren fig tree as a symbol for Israel's spiritual fruitlessness. Hosea 9:10 says 'Like grapes in the wilderness, I found Israel.' The withered tree was a living parable — the judgement Jesus described in His Temple parables had already begun in miniature on the roadside. |
| Two Leptons (Widow's Mites) (`widow_two_coins`) | - | Mark 12:41–44 | 1 Samuel 16:7 — 'Man looks at the outward appearance, but the LORD looks at the heart.' The widow's offering is the practical demonstration of everything Jesus had been teaching against the religious leaders' showy piety. She gave all she had (100%); the wealthy gave from their surplus. |
| Temple Bystander's Written Account (`witness_scroll`) | `daniel_7_13_14` | Matthew 22:46 | Isaiah 11:2 promised the Messiah would have the 'Spirit of wisdom and understanding, the Spirit of counsel and might' — He would answer every challenge with perfect insight. The progressive silencing of each religious faction across one morning is the fulfilment of this promise made 700 years earlier. Daniel 7:13–14 foretold 'one like a son of man' coming with the clouds of heaven to receive an everlasting dominion — the title 'Son of Man' Jesus used for Himself throughout these exchanges. |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Altered Scribe's Notes  
**ID:** `authority_challenged_fake`

*   **Initial Conclusion:** Jesus was openly challenging Roman authority during his Temple debates.
*   **Forensic Findings:**
    *   The main body of the scroll matches other witness accounts.
    *   However, three key lines show different ink composition and a slightly different scribal hand.
    *   The altered lines change the meaning from theological debate to political sedition (e.g., "Give to God what is God's" is changed to "Give nothing to Caesar").
*   **Type of Deception:** Altered.
*   **Likely Author & Motive:** A Herodian sympathizer, to create a pretext for Roman intervention by reframing a religious argument as a political threat.
*   **Alternative Narrative Supported:** *Jesus the Revolutionary.*


### Case: `lazarus_plot` (The Price of Life)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Isaiah 25:8 | `isaiah_25_8` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Bethany Pilgrim Manifest (`crowd_report`) | - | John 12:9 notes that a large crowd found out Jesus was there and came not only because of Him, but also to see Lazarus, whom He had raised. | - |
| Bethany Limestone Dust (`grave_dirt`) | `isaiah_25_8` | John 11:39 records Martha's objection that after four days there would already be a bad odor | - |
| Intercepted Sadducean Memorandum (`secret_decree`) | - | John 12:10–11 explicitly validates this conspiracy: 'So the chief priests made plans to put Lazarus to death as well.' | - |

---
### Contested Evidence & Forensic Analysis

**Evidence:** False Witness Account of Grave Robbery  
**ID:** `lazarus_plot_fake`

*   **Initial Conclusion:** The disciples stole Lazarus's body to stage a fake resurrection.
*   **Forensic Findings:**
    *   The witness claims to have seen the disciples at night but misidentifies the tomb's location.
    *   The witness is a known associate of Annas's household guard.
    *   The payment record for the testimony matches funds disbursed from the Temple treasury.
*   **Type of Deception:** Fabricated.
*   **Likely Author & Motive:** Annas, to create a preemptive counter-narrative to the miracle, turning it from an act of God into a criminal conspiracy.
*   **Alternative Narrative Supported:** *Jesus the Fraud.*


### Case: `passover_lamb_chain` (The Anointing at Bethany)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Exodus 12:1–14 | `typology_passover_lamb` | Typological Fulfilment |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Passover Lamb Market Records (`lamb_records`) | - | Exodus 12:3–6 | This ledger is the background pattern the whole case is built on: every Passover lamb in the city was selected days in advance and kept under watch, inspected daily, before being sacrificed at twilight on the fourteenth. It's the template the investigator needs before the rest of the evidence makes sense. |
| Temple Inspection Notes (`inspection_notes`) | `typology_passover_lamb` | Mark 11:27–33 | The Passover lamb was inspected for blemishes for four days before it was sacrificed (Exodus 12:5). Jesus's public cross-examination in the Temple courts served the same function: every faction of religious authority took their turn testing Him, and none could find a fault to charge Him with. |
| Flask of Pure Nard (`nard_flask`) | `typology_passover_lamb` | John 12:3 | The anointing of Jesus's feet with expensive perfume was an act of profound worship. In the Old Testament, anointing with oil consecrated kings (1 Samuel 16:13) and priests (Exodus 30:30) for service. This act sets Jesus apart as the Messiah (the "Anointed One") and, as Jesus Himself stated, prepares His body "beforehand for burial" (Mark 14:8). |
| Broken Alabaster Jar (`alabaster_jar`) | `typology_passover_lamb` | Matthew 26:6–7 | The anointing of Jesus's head directly mirrors the way kings like Saul and David were anointed, signifying His royal authority. It also serves as a prophetic act of consecration, setting Him apart as the ultimate High Priest and King who would offer Himself as the final sacrifice. |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Merchant's Complaint about Stolen Nard  
**ID:** `passover_lamb_chain_fake`

*   **Initial Conclusion:** The expensive nard used for the anointing was stolen.
*   **Forensic Findings:**
    *   The complaint was filed but never officially submitted to the authorities.
    *   The handwriting on the complaint matches samples from Judas Iscariot, not the merchant.
    *   The merchant's own ledger shows the nard was sold legally to Mary of Bethany's household.
*   **Type of Deception:** Forged (Legal Manipulation).
*   **Likely Author & Motive:** Judas Iscariot, to create a legal pretext for his outrage over the "wasted" money and to discredit Mary's act of devotion.
*   **Alternative Narrative Supported:** *Jesus the Thief* (by association with his followers).


### Case: `olivet_discourse` (The End of the Age)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Daniel 9:27 | `daniel_9_27` | Prophecy |
| Joel 2:30–31 | `joel_2_30_31` | Prophecy |
| Isaiah 13:10 | `isaiah_13_10` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| View of the Temple from Olivet (`temple_overlook_view`) | - | Matthew 24:1–2 | The physical setting directly inspired the disciples' questions about the Temple's fate, linking Jesus's words to the tangible structure before them. |
| Disciples' Questions (Written Notes) (`disciples_questions_notes`) | `daniel_9_27` | Matthew 24:3 | These questions frame the entire discourse, revealing the disciples' immediate concerns about timing and signs, which Jesus then addresses with detailed prophecies. |
| Parable of the Ten Virgins (Notes) (`parable_of_virgins_notes`) | - | Matthew 25:1–13 | This parable underscores the theme of watchfulness, a recurring motif in eschatological prophecies, urging believers to be ready for the unexpected timing of the Lord's return. |
| Old Testament Cosmic Sign References (`cosmic_signs_references`) | `joel_2_30_31` | Matthew 24:29 | Jesus's use of these ancient prophecies demonstrates the continuity of God's plan and the fulfillment of long-foretold cosmic disturbances as signs of the end. |
| Darkened Sun Record (`darkened_sun_record`) | `isaiah_13_10` | Matthew 24:29 | Isaiah 13:10 foretells the darkening of the heavenly lights. Jesus quotes this same imagery when describing the signs preceding His return. |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Zealot Recruitment Pamphlet  
**ID:** `olivet_discourse_fake`

*   **Initial Conclusion:** Jesus's private teaching on the Mount of Olives was a secret war council.
*   **Forensic Findings:**
    *   The pamphlet uses language and symbols associated with the Zealot faction.
    *   However, it was printed on papyrus sourced from Egypt, a type not used by local Zealot cells but favored by Temple scribes for official documents.
    *   The location where it was "found" is inconsistent with the disciples' actual gathering spot.
*   **Type of Deception:** Planted.
*   **Likely Author & Motive:** A Temple spy (under Caiaphas's direction), to frame the Olivet Discourse as a seditious plot and provide a legal basis for arrest.
*   **Alternative Narrative Supported:** *Jesus the Revolutionary.*


## ACT III: The Pressure Builds

### Case: `last_supper` (The Broken Cup)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Exodus 12:1–14 | `exodus_12_1_14` | Prophecy |
| Jeremiah 31:31–34 | `jeremiah_31_31_34` | Prophecy |
| Psalm 41:9 | `psalm_41_9` | Prophecy |
| Zechariah 11:12–13 | `zechariah_11_12_13` | Prophecy |
| Isaiah 53:12 | `isaiah_53_12` | Prophecy |
| Genesis 14:18-20 | `typology_melchizedek` | Typological Fulfilment |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Unleavened Bread Crumbs (`bread_crumbs`) | `exodus_12_1_14` | Matthew 26:26 | The breaking of the matzah is called the 'afikomen' in the Passover Seder — traditionally hidden and later 'found' again. Early Christians saw this as a picture of Jesus's death and resurrection: broken, buried, and found alive. |
| Spilled Wine on the Linen (`wine_stain`) | `jeremiah_31_31_34` | Luke 22:20 | The third Passover cup — the Cup of Redemption — is the one Jesus transformed into the cup of the New Covenant (Jeremiah 31:31-34). This also fulfills the typology of Melchizedek, the priest-king of Salem who blessed Abraham with bread and wine (Genesis 14:18), an order of priesthood Jesus now embodies (Hebrews 7). |
| Spilled Wine on the Linen (`wine_stain`) | `typology_melchizedek` | Luke 22:20 | The third Passover cup — the Cup of Redemption — is the one Jesus transformed into the cup of the New Covenant (Jeremiah 31:31-34). This also fulfills the typology of Melchizedek, the priest-king of Salem who blessed Abraham with bread and wine (Genesis 14:18), an order of priesthood Jesus now embodies (Hebrews 7). |
| Shattered Clay Cup (`cup_fragments`) | - | Matthew 26:27 | Breaking pottery in the Jewish tradition was sometimes associated with mourning or the breaking of a covenant (see Jeremiah 19:10–11, where Jeremiah shattered a clay jar as a prophetic act of judgement). A broken cup at the Passover table carries heavy symbolic weight. |
| Large Stone Water Jug (`water_jug`) | - | John 13:4–5 | Isaiah 52:13–15 describes the Servant who 'shall startle many nations' — and immediately before this, is described as one who acts in a way that astonishes because of His humility. Jesus washing feet with this water fulfilled the spirit of what Isaiah described: the exalted One taking the lowest role. |
| Imprint of a Money Bag (`money_bag_impression`) | `zechariah_11_12_13` | John 13:29 | Judas carried the communal purse — and had recently agreed to betray Jesus for 30 silver coins (Matthew 26:14–16), fulfilling Zechariah 11:12. The presence of a money bag impression at the preparation table raises serious questions: what was Judas counting before the meal? |
| Fragment of Sop (Dipped Bread) (`betrayal_dipped_bread`) | `psalm_41_9` | John 13:26–30 | The giving of the dipped sop to Judas is the fulfilment of Psalm 41:9 ('even my close friend... who ate my bread has lifted his heel against me'). Jesus quoted this Psalm earlier that evening (John 13:18), identifying the traitor through an act of table fellowship. |
| Written Summary of Jesus's Words (`new_covenant_declaration`) | `jeremiah_31_31_34` | Luke 22:19–20; 1 Corinthians 11:24–25 | Jeremiah 31:31–34 promised a 'new covenant' that would supersede the Mosaic Law — written on hearts, not stone. Jesus announced its establishment at this very table. The young scribe recording His words was preserving the fulfilment of a 600-year-old prophecy. |
| List of the Twelve (`twelve_roll`) | `isaiah_53_12` | Luke 22:37 | Jesus explicitly applies Isaiah 53:12 ('numbered with the transgressors') to Himself during the Last Supper. |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Leavened Bread Fragment  
**ID:** `last_supper_fake`

*   **Initial Conclusion:** The Last Supper was not a legitimate Passover meal.
*   **Forensic Findings:**
    *   The bread fragment contains yeast, which is forbidden during Passover.
    *   It was found near Judas's seat, separate from the main table's unleavened bread.
    *   The grain type matches bread sold in the lower city markets, not the ceremonial matzah prepared for the Seder.
*   **Type of Deception:** Planted.
*   **Likely Author & Motive:** Judas Iscariot. By introducing leaven, he could argue the meal was ritually impure, thus invalidating any covenants made. This provides him with a legalistic and religious justification for his betrayal.
*   **Alternative Narrative Supported:** *Jesus the Fraud* (specifically, a religious hypocrite who doesn't follow the Law).


### Case: `gethsemane_arrest` (The Severed Ear)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Zechariah 13:7 | `zechariah_13_7` | Prophecy |
| Isaiah 53:7 | `isaiah_53_7` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Abandoned Linen Wrapper (`abandoned_linen`) | `zechariah_13_7` | Mark 14:51-52 | Zechariah 13:7 — 'Strike the shepherd, and the sheep will be scattered' — was quoted by Jesus himself just hours earlier (Matthew 26:31) as a prediction of this exact moment. The unnamed young man fleeing naked into the night, abandoning even his clothing, is the most vivid single image of the disciples' scattering the prophecy foretold. |
| Extinguished Roman Torch (`dropped_torch`) | - | John 18:3 | John 18:3 notes they arrived with torches and lanterns, expecting a deep-woods manhunt. |
| Bloodied Scarf Fragment (`severed_ear_wrap`) | - | John 18:10 | Luke 22:50–51 and John 18:10 document Peter cutting off Malchus's ear, which Jesus immediately healed. |
| Unresisting Prisoner's Cord (`prisoner_cord`) | `isaiah_53_7` | Matthew 26:52–54 | Jesus refuses armed resistance and willingly submits to arrest, embodying the silent Lamb led to slaughter as prophesied in Isaiah 53:7. |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Planted Second Sword  
**ID:** `gethsemane_arrest_fake`

*   **Initial Conclusion:** The disciples were armed for a violent insurrection.
*   **Forensic Findings:**
    *   The sword is a Roman gladius, not the short sicarii blade used by Galilean rebels.
    *   It bears the mark of the Antonia Fortress garrison, linking it to the arresting soldiers.
    *   It was found wiped clean of fingerprints.
*   **Type of Deception:** Planted.
*   **Likely Author & Motive:** One of the Temple guards, to exaggerate the threat posed by the disciples and justify the use of a large armed force for the arrest.
*   **Alternative Narrative Supported:** *Jesus the Revolutionary.*


### Case: `sanhedrin_trial` (The Midnight Tribunal)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Isaiah 50:6 | `isaiah_50_6` | Prophecy |
| Micah 5:1 | `micah_5_1` | Prophecy |
| Psalm 27:12 | `psalm_27_12` | Prophecy |
| Psalm 35:11 | `psalm_35_11` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Rooster Feather (`rooster_feather`) | `-` | Matthew 26:74-75 | The third denial led to the third crowing, fulfilling Jesus's own prediction of Peter's failure (Matthew 26:34). Supporting/narrative evidence — not directly Codex-linkable to one of this case's four defined prophecies. |
| Priestly Robe Fragment (`torn_robe`) | `isaiah_50_6` | Matthew 26:65 | Caiaphas tore his robes to signal blasphemy when Jesus affirmed His divinity. |
| Conflicting Depositions (`false_scroll`) | `psalm_27_12` | Mark 14:56-59 | The lack of consistent testimony exposes the trial as a fabrication. |
| Charcoal Briquette (`charcoal_remains`) | - | John 18:18 | Peter's denial by the fire fulfilled Jesus's prediction that he would deny three times. |
| Guard's Reed (`guard_reed`) | `micah_5_1` | Matthew 26:67–68 | Micah 5:1 prophesied that Israel's ruler would be struck. The guards' mockery with the reed is a literal fulfillment of this humiliation. |
| Perjured Witness Statement (`perjured_testimony`) | `psalm_35_11` | Mark 14:57–59 | 'Ruthless witnesses come forward' precisely matches the false testimony at the trial, as prophesied in Psalm 35:11. |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Fabricated Roman Dispatch  
**ID:** `sanhedrin_trial_fake`

*   **Initial Conclusion:** The Sanhedrin was under pressure from Rome to secure a quick conviction.
*   **Forensic Findings:**
    *   The dispatch uses a Roman seal, but it is a known forgery used by Annas's scribes for internal communications.
    *   The language is Latin, but contains grammatical errors inconsistent with official Roman correspondence.
    *   Pilate's own records show no such dispatch was ever sent.
*   **Type of Deception:** Forged.
*   **Likely Author & Motive:** Annas, to pressure wavering Sanhedrin members like Nicodemus by creating a false sense of urgency and implying Roman demand for a guilty verdict.
*   **Alternative Narrative Supported:** *The Disciples Invented Everything* (by suggesting the trial was a legitimate state process, not a Jewish conspiracy).


### Case: `barabbas_choice` (The People's Choice)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Isaiah 53:3 | `isaiah_53_3` | Prophecy |
| Psalm 2:1-2 | `psalm_2_1_2` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Governor's Silver Basin (`pilates_basin`) | - | Matthew 27:24 | - |
| Claudia's Warning Scroll (`wifes_letter`) | - | Matthew 27:19 | - |
| The Insurgent's Dossier (`barabbas_warrant`) | `isaiah_53_3` | Mark 15:7; John 18:40 | - |
| Joint Verdict Scroll (`joint_verdict`) | `psalm_2_1_2` | Luke 23:12 | Herod and Pilate become allies against God's Anointed, fulfilling Psalm 2's prophecy of rulers banding together against the LORD. |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Pre-made "Barabbas" Sign Fragment  
**ID:** `barabbas_choice_fake`

*   **Initial Conclusion:** The crowd spontaneously chose to free Barabbas.
*   **Forensic Findings:**
    *   The paint on the sign fragment is identical to that used for Temple maintenance notices.
    *   Multiple identical fragments were found, suggesting mass production.
    *   Eyewitnesses report seeing agents of the chief priests distributing these signs to the crowd before Pilate offered the choice.
*   **Type of Deception:** Planted (Evidence of Manipulation).
*   **Likely Author & Motive:** The chief priests, to orchestrate the crowd's response and ensure they would call for Barabbas's release, forcing Pilate's hand.
*   **Alternative Narrative Supported:** *Jesus the Revolutionary* (by implying the people preferred a "real" freedom fighter).


### Case: `crucifixion_site` (The Final Sacrifice)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Psalm 22:16–18 | `psalm_22_16_18` | Prophecy |
| Amos 8:9 | `amos_8_9` | Prophecy |
| Isaiah 53:9 | `isaiah_53_9` | Prophecy |
| Zechariah 12:10 | `zechariah_12_10` | Prophecy |
| Psalm 34:20 | `psalm_34_20` | Prophecy |
| Psalm 31:5 | `psalm_31_5` | Prophecy |
| Psalm 69:21 | `psalm_69_21` | Prophecy |
| Jeremiah 31:31–34 | `jeremiah_31_31_34` | Prophecy |
| Haggai 2:6–7 | `haggai_2_6_7` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| Soldiers' Casting Dice (`split_dice`) | `psalm_22_16_18` | John 19:23–24 | Directly fulfills Psalm 22:18. While the victim hung dying, the indifferent execution detail executed a routine lottery for a high-quality, seamless tunic woven from top to bottom. |
| Split Rocks (`split_rocks`) | `haggai_2_6_7` | Matthew 27:51 | The earthquake at the moment of death fulfilled Haggai's prophecy that God would 'shake the heavens and the earth,' signifying a world-altering divine event. |
| Blood-Stained Roman Hasta (`pierced_spear`) | `zechariah_12_10` | John 19:34 | Fulfills Zechariah 12:10 ('the one they have pierced') and protects the Passover Lamb requirement of Exodus 12:46 ('not one bone shall be broken'). The spear thrust proved the victim was already dead, making the leg-breaking unnecessary. |
| The Torn Temple Veil (`torn_temple_veil`) | `jeremiah_31_31_34` | Luke 23:45 | The Parokhet curtain blocked access to the Holy of Holies. Its top-to-bottom tear, occurring at the moment of death, fulfilled Jeremiah's promise of a New Covenant, granting direct access to the presence of God for all. |
| Joseph's Market Bill for Fine Linen (`linen_shroud_receipt`) | `isaiah_53_9` | Mark 15:46 | Fulfills Isaiah 53:9. Instead of being cast into the criminal dirt pits of Hinnom, Jesus was instantly reassigned to a wealthy man's private, rock-hewn garden tomb. |
| Sponge Soaked in Sour Wine (`sour_wine_sponge`) | `psalm_69_21` | John 19:28-29 | This act directly fulfills Psalm 69:21 ('...for my thirst they gave me sour wine to drink'). The deliberate mention of a hyssop branch also powerfully evokes the Passover (Exodus 12:22), where hyssop was used to apply the lamb's blood for salvation, identifying Jesus as the true Passover Lamb. |
| Unbroken Tibiae Report (`unbroken_legs`) | `psalm_34_20` | John 19:31–36 | Jesus' legs were not broken, fulfilling the Passover Lamb imagery (Exodus 12:46) and the specific prophecy of Psalm 34:20. |
| Final Words Scroll (`final_words`) | `psalm_31_5` | Luke 23:46 | Jesus's final words from the cross are a direct quote from Psalm 31:5, a prayer of ultimate trust in God at the moment of death. He did not simply die — He willingly surrendered His life into the Father's hands, quoting Scripture with His last breath. |

---
### Fake Evidence & Backstory

| Evidence | ID | Reason for Falsity |
|---|---|---|
| **Manufactured Shroud Thread** | `crucifixion_site_fake` | A thread of cheap, common wool "found" on the cross, inconsistent with the fine linen of the actual shroud. This was likely planted by a skeptical guard or bystander to suggest the "fine linen" story was an exaggeration, attempting to discredit Joseph of Arimathea's act of devotion and paint the burial as a common criminal's disposal. |

---



## ACT IV: The New Beginning

### Case: `resurrection` (The Empty Tomb)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Psalm 16:10 | `psalm_16_10` | Prophecy |
| Hosea 6:2 | `hosea_6_2` | Prophecy |
| Jonah 1:17 / Matthew 12:40 | `jonah_1_17___matthew_12_40` | Prophecy |
| Isaiah 53:10–11 | `isaiah_53_10_11` | Prophecy |
| Psalm 22:1–31 | `psalm_22_1_31` | Prophecy |
| Isaiah 26:19 | `isaiah_26_19` | Prophecy |
| Ezekiel 37:12–13 | `ezekiel_37_12_13` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Displaced Sealing Stone (`rolled_stone`) | `psalm_16_10` | Matthew 28:2 | Psalm 16:10 — 'You will not abandon me to the realm of the dead, nor will you let your Holy One see decay.' The angel rolled away the stone not to free Jesus, but to reveal that the Holy One had already risen. The empty tomb became the visible evidence that this ancient prophecy had been fulfilled. |
| The Empty Burial Chamber (`empty_tomb`) | `psalm_16_10` | Luke 24:3 | Psalm 16:10 — 'You will not let your holy one see corruption.' The empty tomb is the physical evidence that the Psalm's promise was kept. A body left long enough shows decomposition; no such evidence exists. Psalm 22:1–31 opens with the cry of abandonment Jesus spoke from the cross ('My God, my God, why have you forsaken me?') and closes in resurrection proclamation — the same psalm that describes His hands and feet pierced and His garments divided by lot. |
| Folded Burial Linens (`burial_linen`) | `psalm_16_10` | John 20:6–8 | John's Gospel records that the 'other disciple' (John) 'saw and believed' specifically because of how the linens were arranged. A body stolen hastily would leave disordered linens or none at all. The orderly, structured arrangement of the grave cloths pointed to something other than grave robbery. |
| The Angelic Proclamation (`angelic_witness`) | `psalm_16_10` | Matthew 28:2–7; Mark 16:5–7; Luke 24:4–7; John 20:12–13 | Psalm 103:20 describes angels as those who 'do his bidding.' The angelic announcement at the tomb echoes the angelic announcements at the nativity — both bookend Jesus's earthly life with heavenly proclamation. The consistency of the message across all four Gospel accounts, with slight variations in detail (one angel or two?), reflects the characteristics of independent eyewitness testimony. |
| The Soldiers' Broken Report (`guard_report`) | `hosea_6_2` | Matthew 28:2–4 | The bribe to the guards fulfils the pattern of institutional deception against God's purposes — similar to how the chief priests had bribed Judas (Matthew 26:14–16). The very people who guarded against resurrection were the first non-disciple witnesses of the supernatural event. Jonah 1:17 / Matthew 12:40 — Jesus named His own third-day resurrection the 'sign of Jonah,' the three days in the tomb mirroring Jonah's three days in the great fish. |
| The Soldiers' Broken Report (`guard_report`) | `jonah_1_17___matthew_12_40` | Matthew 28:2–4 | The bribe to the guards fulfils the pattern of institutional deception against God's purposes — similar to how the chief priests had bribed Judas (Matthew 26:14–16). The very people who guarded against resurrection were the first non-disciple witnesses of the supernatural event. Jonah 1:17 / Matthew 12:40 — Jesus named His own third-day resurrection the 'sign of Jonah,' the three days in the tomb mirroring Jonah's three days in the great fish. |
| Unused Burial Spices (`spice_jars`) | - | Mark 16:1 | Nicodemus had already brought 75 pounds of myrrh and aloes for the burial (John 19:39–40), fulfilling the wealthy burial of Isaiah 53:9. The women's additional spices were for the anointing ritual completed after the Sabbath — but there was no body to anoint. The unused jars are a symbol of an interrupted mourning, halted by resurrection. |
| Mary Magdalene's Testimony (`mary_encounter`) | `isaiah_53_10_11` | John 20:11–18 | Isaiah 53:10–11 promised the Suffering Servant would 'see his offspring and prolong his days' after being crushed — a resurrection paradox. The risen Christ's first act was to call Mary by name (echoing Isaiah 43:1), sending her as the primary witness. In a Roman court a woman's testimony was inadmissible; making a former demoniac the lead witness is exactly the kind of counter-cultural detail that confirms authenticity rather than fabrication. |
| Opened Tombs Testimony (`opened_tombs`) | `ezekiel_37_12_13` | Matthew 27:52-53 | Ezekiel 37 prophesied that God would open the graves of His people as a sign of His power to restore. The raising of these saints was a literal fulfillment and a powerful preview of the final resurrection. |
| Resurrection Psalm Scroll (`psalm22_scroll`) | `psalm_22_1_31` | Luke 24:26–27 | The Psalm that begins with suffering ends in worldwide proclamation and vindication, pointing beyond the cross to resurrection. Jesus explained these scriptures to the disciples on the road to Emmaus. |
| Psalm 16:10 Scroll Fragment (`psalm_16_10_scroll`) | `psalm_16_10` | Psalm 16:10 | Supplementary primary-source scroll evidence for this case's Psalm 16:10 fulfilment (paired with `rolled_stone` / `empty_tomb` / `burial_linen` / `angelic_witness`). |
| Hosea 6:2 Scroll Fragment (`hosea_6_2_scroll`) | `hosea_6_2` | Hosea 6:2 | Supplementary primary-source scroll evidence for this case's Hosea 6:2 fulfilment (paired with `guard_report`). |
| Jonah 1:17 / Matthew 12:40 Scroll Fragment (`jonah_1_17___matthew_12_40_scroll`) | `jonah_1_17___matthew_12_40` | Jonah 1:17 / Matthew 12:40 | Supplementary primary-source scroll evidence for this case's sign-of-Jonah fulfilment (paired with `guard_report`). |
| Isaiah 53:10–11 Scroll Fragment (`isaiah_53_10_11_scroll`) | `isaiah_53_10_11` | Isaiah 53:10–11 | Supplementary primary-source scroll evidence for this case's Isaiah 53:10–11 fulfilment (paired with `mary_encounter`). |
| Psalm 22:1–31 Scroll Fragment (`psalm_22_1_31_scroll`) | `psalm_22_1_31` | Psalm 22:1–31 | Supplementary primary-source scroll evidence for this case's Psalm 22:1–31 fulfilment (paired with `psalm22_scroll`). |
| Isaiah 26:19 Scroll Fragment (`isaiah_26_19_scroll`) | `isaiah_26_19` | Isaiah 26:19 | Supplementary primary-source scroll evidence for this case's Isaiah 26:19 fulfilment. |
| Ezekiel 37:12–13 Scroll Fragment (`ezekiel_37_12_13_scroll`) | `ezekiel_37_12_13` | Ezekiel 37:12–13 | Supplementary primary-source scroll evidence for this case's Ezekiel 37:12–13 fulfilment (paired with `opened_tombs`). |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Broken Tomb Seal Fragment  
**ID:** `resurrection_fake`

*   **Initial Conclusion:** The disciples broke the Roman seal to steal the body.
*   **Forensic Findings:**
    *   The clay seal bears the official mark of Pilate's garrison.
    *   The fracture pattern on the seal is crystalline and sharp, consistent with being broken by a powerful seismic shock, not pried off with a tool.
    *   The break aligns perfectly with the fissure in the rock caused by the earthquake (`split_rocks` evidence).
*   **Type of Deception:** Misleading Context. The evidence is genuine, but the initial conclusion is false.
*   **Likely Author & Motive:** The guards, as part of their "stolen body" cover story, presented this broken seal as proof of a break-in.
*   **Alternative Narrative Supported:** *The Disciples Invented Everything* (by staging a grave robbery).


### Case: `roman_inquiry` (The Guard's Report)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Psalm 2:1–2 | `psalm_2_1_2` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| High-Grade Sanctuary Coins (`bribe_shekels`) | `psalm_2_1_2` | - | Matthew 28:12 records that the chief priests met with the elders and devised a plan, giving the soldiers a 'large sum of money.' |
| Snapped Clay Roman Seal (`broken_imperial_seal`) | `psalm_2_1_2` | - | Matthew 27:66 notes they went and made the tomb secure by 'putting a seal on the stone and posting the guard.' |
| Shattered Pilum Shaft (`shattered_spear`) | `psalm_2_1_2` | - | Matthew 28:2 states there was a violent earthquake, for an angel of the Lord came down from heaven and rolled back the stone. |
| Official Sanhedrin Report (`sanhedrin_report`) | `psalm_2_1_2` | Matthew 28:11 | This report is the paper trail of the conspiracy itself — the Sanhedrin's own internal record of receiving the guards' account and choosing to suppress rather than investigate it, matching the pattern of rulers plotting against God's anointed described in Psalm 2:1–2. |
| Psalm 2:1–2 Scroll Fragment (`psalm_2_1_2_scroll`) | `psalm_2_1_2` | Psalm 2:1–2 | Supplementary primary-source scroll evidence for this case's Psalm 2:1–2 fulfilment. |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Guard's "Stolen" Personal Item  
**ID:** `roman_inquiry_fake`

*   **Initial Conclusion:** The disciples fought the guards and stole from them while taking the body.
*   **Forensic Findings:**
    *   The item is a standard-issue Roman legionary clasp.
    *   It shows no signs of being forcibly removed; the pin is undamaged.
    *   The guard who "lost" it is the same one who received the largest portion of the bribe money from the priests.
*   **Type of Deception:** Fabricated.
*   **Likely Author & Motive:** The bribed guards, to add a layer of personal violation to their "stolen body" report to Pilate, making their failure of duty seem more like the result of a violent struggle.
*   **Alternative Narrative Supported:** *The Disciples Invented Everything.*


### Case: `peter_restoration` (Peter's Restoration)

#### Prophecies & Typologies

| Reference | ID | Category |
|---|---|---|
| Zechariah 13:7 | `zechariah_13_7` | Prophecy |
| Ezekiel 34:11-16 | `ezekiel_34_11-16` | Prophecy |
| Psalm 16:10 | `psalm_16_10` | Prophecy |
| Isaiah 53:10–11 | `isaiah_53_10_11` | Prophecy |

#### Evidence Items

| Evidence | `relatedProphecy` (Codex) | `bibleRef` (supporting verse) | Prophetic / Narrative Link Text |
|---|---|---|---|
| The Charcoal Fire (`charcoal_fire`) | `zechariah_13_7` | John 21:9 | Zechariah 13:7 foretold that when the Shepherd was struck, His sheep would be scattered. Jesus applied this prophecy to His disciples on the night of His arrest (Matthew 26:31). Around one charcoal fire Peter denied his Lord; around another, the risen Shepherd restored him. The same setting that witnessed failure became the place of forgiveness and renewed calling. |
| The Miraculous Catch (`miraculous_catch`) | `ezekiel_34_11-16` | John 21:10-11 | This echoes the original calling of the disciples (Luke 5:1-11) and demonstrates that obedience to Christ yields supernatural results. |
| Bread and Fish Breakfast (`bread_breakfast`) | `ezekiel_34_11-16` | John 21:9 | Ezekiel 34:11–16 promised that the Lord Himself would seek, gather, and feed His scattered sheep. Psalm 23 declares that the Shepherd prepares a table for His people, while Isaiah 25:6–9 foretells the Messianic feast following God's victory over death. The risen Jesus fulfills these promises by preparing bread and fish for His disciples, demonstrating that the Good Shepherd still provides for His flock after conquering the grave. |
| The Threefold Commission (`threefold_commission`) | `ezekiel_34_11-16` | John 21:15-17 | Peter's three denials (crow, cock, fire) are met with three commissions (feed, tend, shepherd) showing prophetic reversal. |
| Risen Appearance (`galilean_apparition`) | `isaiah_53_10_11` | John 21:12 | Isaiah 53:10–11 foretold that after His suffering the Servant would live again and "see his offspring." Psalm 16:10 declared that God's Holy One would not remain in the grave. The disciples' recognition of Jesus on the shore was not merely a moment of faith—it was eyewitness confirmation that the crucified Messiah was alive, fulfilling the Scriptures. |
| Zechariah 13:7 Scroll Fragment (`zechariah_13_7_scroll`) | `zechariah_13_7` | Zechariah 13:7 | Supplementary primary-source scroll evidence for this case's Zechariah 13:7 fulfilment (paired with `charcoal_fire`). |
| Ezekiel 34:11–16 Scroll Fragment (`ezekiel_34_11-16_scroll`) | `ezekiel_34_11-16` | Ezekiel 34:11–16 | Supplementary primary-source scroll evidence for this case's Ezekiel 34:11–16 fulfilment (paired with `miraculous_catch` / `bread_breakfast` / `threefold_commission`). |
| Psalm 16:10 Scroll Fragment (`psalm_16_10_scroll`) | `psalm_16_10` | Psalm 16:10 | Supplementary primary-source scroll evidence for this case's Psalm 16:10 fulfilment (paired with `galilean_apparition`). |
| Isaiah 53:10–11 Scroll Fragment (`isaiah_53_10_11_scroll`) | `isaiah_53_10_11` | Isaiah 53:10–11 | Supplementary primary-source scroll evidence for this case's Isaiah 53:10–11 fulfilment (paired with `galilean_apparition`). |

---
### Contested Evidence & Forensic Analysis

**Evidence:** Fisherman's Net with Ripped Knot  
**ID:** `peter_restoration_fake`

*   **Initial Conclusion:** The "miraculous catch" was just a broken net spilling a few fish.
*   **Forensic Findings:**
    *   The knot was cleanly cut with a sharp blade, not frayed or broken under strain.
    *   The net itself is of a different weave and material than the one used by Peter's crew.
    *   The rumor originated from a rival fishing crew in Capernaum known for their jealousy.
*   **Type of Deception:** Honest Mistake / Rumor (or potentially Planted by rivals).
*   **Likely Author & Motive:** Rival fishermen, to explain away a supernatural event with a mundane, professional failure, thus preserving their own reputation.
*   **Alternative Narrative Supported:** *Jesus the Fraud.*


## Hidden Detective Chains

| Chain Name | Codex Reward | Cases Spanned | Evidence Required | Points | Faith |
|---|---|---|---|---|---|
| The Greater Atonement | *The Greater Atonement* | `sanhedrin_trial` → `barabbas_choice` → `crucifixion_site` | `torn_robe` + `barabbas_warrant` + `pierced_spear` | +25 | +10 |
| The True Passover Lamb | *The True Passover Lamb* | `last_supper` → `gethsemane_arrest` → `crucifixion_site` | `wine_stain` → `typology_melchizedek` + `prisoner_cord` → `isaiah_53_7` + `unbroken_legs` → `psalm_34_20` | +25 | +10 |
| The Scattered Sheep | *The Scattered Sheep* | `gethsemane_arrest` → `sanhedrin_trial` → `peter_restoration` | `abandoned_linen` + `rooster_feather` + `charcoal_fire` | +25 | +10 |
| The New Covenant | *The New Covenant* | `last_supper` only | `bread_crumbs` → `exodus_12_1_14` + `wine_stain` → `typology_melchizedek` + `new_covenant_declaration` → `jeremiah_31_31_34` | +25 | +10 |
| Death Defeated | *The Firstfruits of Resurrection* | `crucifixion_site` → `resurrection` | `guard_report` → `jonah_1_17___matthew_12_40` + `opened_tombs` → `ezekiel_37_12_13` + `empty_tomb` → `psalm_16_10` + `mary_encounter` → `isaiah_53_10_11` | +25 | +10 |

### Cross-Case Chain Notes

- **Greater Atonement:** The `Priestly Robe Fragment` (`torn_robe`) evidence in `sanhedrin_trial` represents the high priest's role (Isaiah 50:6); `The Insurgent's Dossier` (`barabbas_warrant`) in `barabbas_choice` represents the scapegoat (Isaiah 53:3); the `Blood-Stained Roman Hasta` (`pierced_spear`) in `crucifixion_site` represents the blood atonement (Zechariah 12:10).

- **True Passover Lamb:** The `Spilled Wine on the Linen` (`wine_stain`) evidence, mapped to `typology_melchizedek`, must be linked with the `Unresisting Prisoner's Cord` (`prisoner_cord`) → `isaiah_53_7` and the `Unbroken Tibiae Report` (`unbroken_legs`) → `psalm_34_20` to form the complete typological arc from the Last Supper through the crucifixion.

- **Scattered Sheep:** The `Abandoned Linen Wrapper` (`abandoned_linen`) evidence in `gethsemane_arrest` fulfils Zechariah 13:7's scattering directly; the `Rooster Feather` (`rooster_feather`) in `sanhedrin_trial` marks Peter's denial in contrast to Jesus's silence before His accusers; `The Charcoal Fire` (`charcoal_fire`) in `peter_restoration` completes the arc as the Shepherd gathers the scattered sheep.

- **New Covenant:** All three Last Supper evidence items must be linked to complete the chain: unleavened bread (`bread_crumbs` → Exodus 12:1-14), wine (`wine_stain` → the Melchizedek typology), and declaration (`new_covenant_declaration` → Jeremiah 31:31–34).

- **Death Defeated:** The Soldiers' Broken Report (`guard_report`) evidence, dual-linked to Hosea 6:2 and the sign of Jonah (`jonah_1_17___matthew_12_40`), must be linked with the `Opened Tombs Testimony` (`opened_tombs`) → `ezekiel_37_12_13`, the `Empty Burial Chamber` (`empty_tomb`) → `psalm_16_10`, and `Mary Magdalene's Testimony` (`mary_encounter`) → `isaiah_53_10_11` across the resurrection case.
