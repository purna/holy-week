// ============================================================
// CASE: The Missing Bread and Wine  — difficulty 3 — Last Supper
// BIBLICAL FOCUS: Matthew 26:17–30, Mark 14:12–26, Luke 22:7–23, John 13
// PROPHECY: Exodus 12, Jeremiah 31:31–34, Psalm 41:9, Zechariah 11:12–13
// ============================================================

export const act3CaseA = {
  id: "last_supper",
  title: "The Broken Cup",
  subtitle: "The Passover preparations in the upper room have been disturbed — and someone is hiding what they know.",
  location: "upperroom",
  eventLocation: "Upper Room, Jerusalem",
  timeOfDay: "night",
  difficulty: 3,
  requires: "lazarus_plot",
  actLabel: "Act III",
  color: 0x34d399,
  quest: { name: "Last Supper Investigation", task: "Find the bread and wine", cur: 0, tar: 7 },

  // ── BIBLICAL CONTEXT ──────────────────────────────────────────────
  biblicalContext: {
    summary: `On Thursday evening, Nisan 14, Jesus and His disciples gathered in a borrowed upper room in Jerusalem to celebrate the Passover meal. But this was no ordinary Passover — Jesus was about to transform a 1,500-year-old ceremony into something entirely new. He took the bread and wine that were already present for the Seder and reinterpreted them: the broken bread as His body, the wine as His blood — the New Covenant (Jeremiah 31:31–34). This meal, the Last Supper, ended with Judas slipping away into the night to betray Him.`,
    significance: `The Passover lamb had always pointed forward to something greater. In Exodus 12, God told the Israelites to sacrifice a lamb and mark their doorposts with its blood — death would 'pass over' every house protected by the blood. Paul later wrote: 'Christ, our Passover lamb, has been sacrificed' (1 Corinthians 5:7). Jesus was intentionally eating the Passover on the night He became it.`,
    historicalNote: `The 'upper room' (Greek: anagaion) was likely in the southwestern upper city of Jerusalem — the wealthier quarter where larger houses with guest rooms existed. Peter and John were sent ahead to prepare (Luke 22:8), following a man carrying a water jar as their sign — unusual, since water-carrying was women's work, making such a man easy to spot. The host is unnamed in Scripture, though later tradition associates the house with John Mark's family (see Acts 12:12).`,
  },

  prophecies: [
    {
      reference: "Exodus 12:1–14",
      id: "exodus_12_1_14",
      icon: "🔮",
      text: `"The blood shall be a sign for you, on the houses where you are... when I see the blood, I will pass over you, and no plague will befall you to destroy you."`,
      written: "~1400 BC",
      fulfilledBy: "Jesus, as the Passover Lamb, whose blood provides protection from judgement",
      gospelLink: "John 1:29; 1 Corinthians 5:7; Luke 22:15–20",
      insight: "The Passover lamb was to be 'without blemish' (Exodus 12:5). Jesus — declared righteous even by Pilate ('I find no fault in him', John 18:38) — perfectly fulfilled this requirement. The meal Jesus ate was the same meal that pointed to Him.",
    },
    {
      reference: "Jeremiah 31:31–34",
      id: "jeremiah_31_31_34",
      icon: "🔮",
      text: `"Behold, the days are coming, declares the LORD, when I will make a new covenant with the house of Israel... I will put my law within them, and I will write it on their hearts."`,
      written: "~627 BC",
      fulfilledBy: "Jesus declaring 'This cup is the new covenant in my blood' at the Last Supper",
      gospelLink: "Luke 22:20; 1 Corinthians 11:25",
      insight: "Jeremiah prophesied a coming covenant that would be internal, not external — written on hearts, not stone tablets. Jesus announced its inauguration over a cup of wine at Passover. The old covenant was sealed with animal blood (Exodus 24:8); the new with His own.",
    },
    {
      reference: "Psalm 41:9",
      id: "psalm_41_9",
      icon: "🔮",
      text: `"Even my close friend in whom I trusted, who ate my bread, has lifted his heel against me."`,
      written: "~1000 BC",
      fulfilledBy: "Judas Iscariot betraying Jesus after eating with Him at the Last Supper",
      gospelLink: "John 13:18 — Jesus quotes this Psalm directly at the supper",
      insight: "Jesus explicitly quoted Psalm 41:9 at the table (John 13:18), identifying the betrayal as prophetic fulfilment — not a surprise. In quoting it, He showed that even His betrayal was within God's foreknowledge.",
    },
    {
      reference: "Zechariah 11:12–13",
      id: "zechariah_11_12_13",
      icon: "🔮",
      text: `"So they weighed out as my wages thirty pieces of silver... and I threw it into the house of the LORD — to the potter."`,
      written: "~520 BC",
      fulfilledBy: "Judas receiving 30 silver coins for betraying Jesus, later thrown into the Temple",
      gospelLink: "Matthew 26:15; Matthew 27:3–10",
      insight: "Thirty silver pieces was the price of a slave (Exodus 21:32) — the religious leaders effectively valued Jesus as the lowest possible commodity. Matthew records this fulfilled Zechariah's prophecy to the detail of the coins being thrown into the temple treasury.",
    },
    {
      reference: "Isaiah 53:12",
      id: "isaiah_53_12",
      icon: "🔮",
      text: `"He poured out his soul to death and was numbered with the transgressors; yet he bore the sin of many, and makes intercession for the transgressors."`,
      written: "~700 BC",
      fulfilledBy: "Jesus's prayer for His disciples and for those who would betray and crucify Him (John 17)",
      gospelLink: "John 17:1–26 (the High Priestly Prayer, delivered the same evening)",
      insight: "The farewell discourse (John 14–17), delivered after the meal, is the longest recorded prayer of Jesus. Isaiah described the Suffering Servant 'making intercession' — Jesus fulfilled this at the Last Supper by praying for His disciples, for future believers, and — as He would later do from the cross — even for His enemies.",
    },
  ],

  intro: `It is the evening of Nisan 14. In a large upper room in Jerusalem's southwestern quarter, Peter and John have spent all afternoon preparing for the Passover Seder. The unleavened bread is set. The cups of wine are poured. The Passover lamb is ready. But when Jesus and the twelve arrive for the meal, something is wrong: a cup has been broken, the wine from one goblet has been spilled across the tablecloth, and a portion of the unleavened bread is missing. Three people had access to the upper room that afternoon. Was this sabotage — or something far more significant?`,

  suspects: [
    { id: "john_mark", name: "John Mark", role: "Son of the House Owner", avatar: "👨‍🦰", bibleRef: "Acts 12:12 — later tradition links this house to Mary, John Mark's mother" },
    { id: "servant", name: "Rhoda", role: "Household Servant", avatar: "👧", bibleRef: "Acts 12:13–15 — a servant named Rhoda is mentioned in the same household" },
    { id: "judas", name: "Judas Iscariot", role: "Disciple and Treasurer", avatar: "🪙", bibleRef: "John 13:29 — Judas kept the money bag; Luke 22:3–6 — already made his deal" },
  ],

  evidencePool: [
    {
      id: "bread_crumbs",
      name: "Unleavened Bread Crumbs",
      relatedProphecy: "exodus_12_1_14",
      type: "physical",
      icon: "🍞",
      location: "Upper Room Preparation Table",
      desc: "Crumbles of unleavened (matzah) bread found on the floor near the preparation table, as if a piece was broken and dropped in haste.",
      bibleRef: "Matthew 26:26 — 'Jesus took bread, and after blessing it broke it and gave it to the disciples.'",
      propheticLink: "The breaking of the matzah is called the 'afikomen' in the Passover Seder — traditionally hidden and later 'found' again. Early Christians saw this as a picture of Jesus's death and resurrection: broken, buried, and found alive.",
      investigatorNote: "The crumbs suggest someone handled the bread before the meal. The question is whether they were testing its freshness, or hiding something.",
    },
    {
      id: "wine_stain",
      name: "Spilled Wine on the Linen",
      type: "physical",
      relatedProphecy: "jeremiah_31_31_34",
      icon: "🍷",
      location: "Upper Room Dining Table",
      desc: "A dark red stain on the fine linen tablecloth, exactly where the third cup of wine — the 'Cup of Redemption' — was set. It was spilled, not drunk.",
      bibleRef: "Luke 22:20 — 'In the same way, after supper he took the cup, saying: This cup is the new covenant in my blood, which is poured out for you.'",
      propheticLink: "The Passover Seder uses four cups of wine (Exodus 6:6–7). The third cup — the Cup of Redemption — is the one Jesus transformed into the cup of the New Covenant. The spilled wine at this cup's position is theologically charged: 'blood poured out' was exactly the language He used.",
      investigatorNote: "The stain is at the position of the third cup. Was this clumsiness, or deliberate disruption of this specific cup?",
    },
    {
      id: "cup_fragments",
      name: "Shattered Clay Cup",
      type: "physical",
      icon: "🥃",
      location: "Near the Serving Entrance to the Upper Room",
      desc: "Fragments of a small clay cup — one of the Passover cups — shattered near the doorway, as if dropped or thrown. The clay is Galilean-style, not local Jerusalem pottery.",
      bibleRef: "Matthew 26:27 — 'And he took a cup, and when he had given thanks he gave it to them, saying, Drink of it, all of you.'",
      propheticLink: "Breaking pottery in the Jewish tradition was sometimes associated with mourning or the breaking of a covenant (see Jeremiah 19:10–11, where Jeremiah shattered a clay jar as a prophetic act of judgement). A broken cup at the Passover table carries heavy symbolic weight.",
      investigatorNote: "Galilean clay cup — not from Jerusalem. One of the disciples may have brought their own cup. Judas was from Kerioth in Judah; this cup isn't his.",
    },
    {
      id: "water_jug",
      name: "Large Stone Water Jug",
      type: "physical",
      icon: "🫙",
      location: "Upper Room Entrance Landing",
      desc: "A large stone water jug used for ceremonial hand-washing before the Passover meal. Full to the brim. But there is a wet trail on the floor that suggests it was moved and replaced.",
      bibleRef: "John 13:4–5 — 'He rose from supper... then he poured water into a basin and began to wash the disciples' feet.'",
      propheticLink: "Isaiah 52:13–15 describes the Servant who 'shall startle many nations' — and immediately before this, is described as one who acts in a way that astonishes because of His humility. Jesus washing feet with this water fulfilled the spirit of what Isaiah described: the exalted One taking the lowest role.",
      investigatorNote: "Someone moved this jug. If it was Rhoda doing her preparation duties, the wet trail should lead to the washing basin. It leads toward the staircase instead.",
    },
    {
      id: "money_bag_impression",
      name: "Imprint of a Money Bag",
      type: "physical",
      relatedProphecy: "zechariah_11_12_13",
      icon: "💰",
      location: "Preparation Table Surface",
      desc: "A faint ring impression on the dusty preparation table surface — the outline of a leather drawstring bag, the kind used to carry coins. It was set down and picked up within the last few hours.",
      bibleRef: "John 13:29 — 'Since Judas had the money bag, some thought Jesus was telling him to buy what was needed for the feast, or give something to the poor.'",
      propheticLink: "Judas carried the communal purse — and had recently agreed to betray Jesus for 30 silver coins (Matthew 26:14–16), fulfilling Zechariah 11:12. The presence of a money bag impression at the preparation table raises serious questions: what was Judas counting before the meal?",
      investigatorNote: "The disciples' money bag was Judas's responsibility. Why was it here, in the food preparation area, before the meal?",
    },
    {
      id: "betrayal_dipped_bread",
      name: "Fragment of Sop (Dipped Bread)",
      type: "physical",
      relatedProphecy: "psalm_41_9",
      icon: "🫓",
      location: "Floor beneath the seat nearest the door",
      desc: "A small piece of bread that has been dipped in the bitter herb paste (charoset) and then dropped or discarded. Found beneath the seat closest to the exit — the seat traditionally associated with the honoured guest.",
      bibleRef: "John 13:26–30 — 'Jesus answered, It is he to whom I will give this morsel of bread when I have dipped it. So when he had dipped the morsel, he gave it to Judas... After he received the morsel, Satan entered into him. Jesus said, What you are going to do, do quickly.'",
      propheticLink: "The giving of the dipped sop to Judas is the fulfilment of Psalm 41:9 ('even my close friend... who ate my bread has lifted his heel against me'). Jesus quoted this Psalm earlier that evening (John 13:18), identifying the traitor through an act of table fellowship.",
      investigatorNote: "The dipped bread points to the seat of honour — and to one specific disciple. This is the most revealing piece of evidence in the room.",
    },
    {
      id: "new_covenant_declaration",
      name: "Written Summary of Jesus's Words",
      type: "analytical",
      relatedProphecy: "jeremiah_31_31_34",
      icon: "📜",
      location: "John Mark's Writing Table, Downstairs",
      desc: "A partial written record in careful Aramaic script: 'This cup is the new covenant in my blood. Do this in remembrance of me.' The handwriting is young but educated. Someone was recording this meal.",
      bibleRef: "Luke 22:19–20; 1 Corinthians 11:24–25 — Paul records the same words, passed on 'from the Lord.'",
      propheticLink: "Jeremiah 31:31–34 promised a 'new covenant' that would supersede the Mosaic Law — written on hearts, not stone. Jesus announced its establishment at this very table. The young scribe recording His words was preserving the fulfilment of a 600-year-old prophecy.",
      investigatorNote: "John Mark was present. He was watching, listening, and writing. He knew everything that happened in that room.",
    },
  ],

  npcs: [
    {
      id: "john_mark",
      name: "John Mark",
      role: "Son of the House Owner",
      faction: "scribes",
      avatar: "👨\u200d🦰",
      profileFile: "./characters/john_mark.json",
      truthfulness: 0.75,
      bibleRef: "Acts 12:12; Mark 14:51–52 (possibly the young man who fled the garden)",
      hasDialogue: true,
      storyFile: "./story/john_disciple.json",
      unlocksEvidence: ["bread_crumbs", "new_covenant_declaration", "betrayal_dipped_bread"],
      background: "John Mark is the teenage son of Mary, the owner of this Jerusalem house. He is educated, observant, and later travels with Paul before writing the Gospel of Mark — which scholars believe contains Peter's eyewitness accounts. He was in and out of the upper room all afternoon.",
      dialogue: {
        neutral: "My mother's house was chosen for this meal. I was helping prepare the room all afternoon.",
        cautious: "I saw what happened at the table. But I'm not sure how much I should say — some of it felt... private. Sacred.",
        pressured: "I was recording some of what He said. I wanted to remember it. Jesus spoke about a new covenant. About His blood. I didn't fully understand it at the time.",
        exposed: "I saw Judas counting coins at the preparation table before the meal. He didn't know I was watching. He looked troubled — not guilty-troubled, more like someone trying to convince themselves they've made the right decision.",
        repeat: "I've told you what I saw. The rest is between those twelve men and their teacher.",
      },
      reactions: {
        bread_crumbs: { text: "I checked the bread myself — it was perfectly unleavened, as required. Those crumbs were from my own inspection. I broke a small corner to taste it.", isLie: true, revealedClue: "money_bag_impression" },
        wine_stain: { text: "The wine stain... that was during the meal itself. When Jesus took the third cup and said it was the new covenant in His blood — someone knocked their arm and spilled a little. It felt almost fitting, somehow.", isLie: false },
        new_covenant_declaration: { text: "Yes, that's my writing. I was sitting on the stairs and could hear through the doorway. I know it seems presumptuous to write down a private meal. But something told me these words mattered.", isLie: false },
        betrayal_dipped_bread: { text: "I saw Him give that bread to the man sitting closest to the door. After that, that man left immediately. Jesus looked... resigned. Like someone watching something inevitable.", isLie: false },
      },
      contradictions: {
        "bread_crumbs+money_bag_impression": { exposed: "Alright. I saw Judas at the preparation table before the others arrived. He wasn't inspecting bread — he was counting coins. Silver coins. Thirty, I think. I backed away before he saw me." },
      },
    },
{
       id: "servant",
       name: "Rhoda",
       role: "Household Servant",
       faction: "local",
       avatar: "👧",
       profileFile: "./characters/rhoda.json",
       truthfulness: 0.9,
       bibleRef: "Acts 12:13–15",
       hasDialogue: true,
       storyFile: "./story/rhoda_servant.json",
       unlocksEvidence: ["water_jug", "cup_fragments"],
      background: "Rhoda is a young servant in the household — the same Rhoda who will later be so astonished at Peter's miraculous release from prison that she forgets to open the door (Acts 12:13–15). She is earnest, perceptive, and loyal to the household.",
      dialogue: {
        neutral: "I prepared the room from midday. Everything was in order when Jesus and his twelve arrived.",
        cautious: "I wouldn't touch the Passover elements — that's not my place. I brought in the water jug and kept the lamps trimmed. That's all.",
        pressured: "I did see something that troubled me. One of the disciples — the quiet one with the dark eyes — asked me where the nearest city gate was. Before the meal. Why would someone need to know that at Passover?",
        exposed: "He also asked about the temple treasury. Where it was kept. How late it was staffed. I thought it was an odd question for someone about to have Passover dinner. I told my mistress afterward.",
        repeat: "I've shared everything I observed. I'm just a servant. I only watch and listen.",
      },
      reactions: {
        water_jug: { text: "I filled that jug myself this morning. But yes — it was moved. I noticed the wet trail when I came up to check on the lamps. Someone moved it toward the staircase, then put it back. I don't know why.", isLie: false, revealedClue: "cup_fragments" },
        cup_fragments: { text: "Those fragments — I found them when I swept after the meal. The cup broke near the door. I assumed it was dropped when the men were leaving in a hurry. One man left very quickly, right in the middle of the meal.", isLie: false },
        betrayal_dipped_bread: { text: "I wasn't in the room for the meal itself. But I heard raised voices briefly — not angry, more like something solemn and painful — and then one man descended the stairs very fast and went into the night.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "judas",
      name: "Judas Iscariot",
      role: "Disciple and Treasurer",
      faction: "scribes",
      avatar: "🪙",
      profileFile: "./characters/judas.json",
      truthfulness: 0.3,
      bibleRef: "Matthew 26:14–16; John 13:27–30; Matthew 27:3–5",
      hasDialogue: true,
      storyFile: "./story/judas_iscariot.json",
      unlocksEvidence: ["money_bag_impression"],
      background: "Judas Iscariot — the only non-Galilean among the twelve, from Kerioth in Judah. He has carried the disciples' money bag for three years. Two days ago he approached the chief priests and agreed to hand Jesus over for 30 silver coins. Tonight he will complete that agreement. He is at the table, eating, knowing what he has done.",
      dialogue: {
        neutral: "The meal was sacred. I have nothing unusual to report about the preparations.",
        cautious: "I handle the group's finances. It's natural that I would be near the preparation area counting supplies.",
        pressured: "Jesus is a great teacher. Whatever questions you have about this evening, they would be better directed to Peter or John.",
        exposed: "I want to speak with the Temple authorities. I have nothing further to say to you.",
        repeat: "I've already said too much.",
      },
      reactions: {
        money_bag_impression: { text: "I count the money regularly. We needed to confirm we had funds for the Passover lamb and the room hire. Nothing unusual.", isLie: true },
        betrayal_dipped_bread: { text: "The teacher gave bread to several of us during the meal. That's what you do at Passover. Read nothing into it.", isLie: true },
        cup_fragments: { text: "I don't know anything about a broken cup. I left the meal before it concluded — I had an errand.", isLie: true },
        wine_stain: { text: "Wine spills. It means nothing.", isLie: true },
        new_covenant_declaration: { text: "Whatever that boy wrote down is his own interpretation. I won't comment on private religious discussions.", isLie: true },
      },
      contradictions: {
        "money_bag_impression+betrayal_dipped_bread": { exposed: "You want the truth? The truth is written in Psalm 41:9. 'My close friend, who ate my bread, has lifted his heel against me.' He quoted it. At the table. While I was sitting there. He knew. And he gave me the bread anyway. I don't expect you to understand that." },
        "cup_fragments+money_bag_impression": { exposed: "Thirty pieces of silver. That's what they gave me. I dropped the clay cup when I was leaving — my hands were shaking. Are you satisfied now? The chief priests are waiting." },
        "money_bag_impression+new_covenant_declaration": { exposed: "One is the price of a life, the other is a promise I no longer have a part in. He spoke of a New Covenant while I felt the weight of those thirty coins. I thought I was ending His movement, but He was writing its next chapter before my very eyes." }
      },
    },
  ],

  deductions: {
    "betrayal_dipped_bread+money_bag_impression": {
      compare: {
        text: "The dipped bread points to the seat of the honoured guest — who left immediately after receiving it. The money bag impression shows someone was counting coins at the preparation table earlier. Both point to the same disciple.",
        insight: "John 13:26–30 records that after receiving the dipped bread, Judas 'went out immediately. And it was night.' The money bag impression suggests he had already received his 30 silver coins before the meal began.",
        isKey: true,
        bibleRef: "John 13:26–30; Matthew 26:14–16",
      },
      link: {
        text: "The two pieces of evidence form a timeline: Judas received payment from the priests before the meal. He sat at the table with Jesus — who gave him the honoured sop, making his betrayal explicit. He then left.",
        insight: "Psalm 41:9, quoted by Jesus at the table, was written 1,000 years earlier. The entire sequence — eating together, the betrayal, the coins — was prophesied.",
        isKey: true,
        bibleRef: "Psalm 41:9; John 13:18; Zechariah 11:12–13",
      },
    },
    "wine_stain+new_covenant_declaration": {
      link: {
        text: "The wine stain marks the precise position of the third Passover cup — the Cup of Redemption. John Mark's written record captures Jesus's words over this very cup: 'This is the new covenant in my blood.'",
        insight: "Jeremiah 31:31–34, written 600 years earlier, promised a new covenant. Jesus announced its arrival over spilled wine at a Passover table. The stain and the written words together document one of history's most significant moments.",
        isKey: true,
        bibleRef: "Luke 22:20; Jeremiah 31:31–34",
      },
    },
    "bread_crumbs+betrayal_dipped_bread": {
      compare: {
        text: "Bread crumbs near the preparation table, and a dipped piece of bread under the seat closest to the door. Two different bread moments — one from preparation, one from the meal itself.",
        insight: "The Passover Seder uses bread in multiple ways: the breaking of the matzah (which Jesus reinterpreted as His body), and the dipping of bread into bitter herbs (which Jesus used to identify the betrayer). Both bread items relate to different prophetic threads in the same evening.",
        isKey: false,
        bibleRef: "Matthew 26:26; John 13:26",
      },
    },
    "water_jug+cup_fragments": {
      timeline: {
        text: "The water jug was moved toward the staircase before the meal. The broken cup was found near the door after the meal. Something was carried up — or someone left in a hurry.",
        insight: "The water jug trail leads up, suggesting it was taken upstairs before being returned — perhaps for Jesus's foot-washing (John 13:4–5). The broken cup near the exit was shattered when Judas left abruptly. Two moments on the same evening, at the same doorway.",
        isKey: false,
        bibleRef: "John 13:4–5; John 13:30",
      },
    },
    "money_bag_impression+new_covenant_declaration": {
      contradict: {
        text: "The money bag impression on the preparation table and John Mark's written record of Jesus's words about a 'new covenant' sit in direct tension. One represents the 30 silver coins that bought a betrayal. The other records the covenant those coins were meant to destroy.",
        insight: "Zechariah 11:12–13 described 30 silver pieces thrown into the Temple treasury. Matthew 27:5 records this happening exactly. The money that passed through this table ultimately fulfilled both the betrayal prophecy and the covenant prophecy — pointing to one man: Judas Iscariot.",
        isKey: true,
        bibleRef: "Zechariah 11:12–13; Matthew 27:3–10; Jeremiah 31:31",
      },
    },
  },

  truth: {
    culprit: "judas",
    motive: "Judas Iscariot had already made his agreement with the chief priests for 30 silver coins. He came to the preparation area before the meal to count his payment, dropping the clay cup in his haste. The broken cup and spilled wine were caused by his agitated state — and by his abrupt departure after Jesus identified him through the dipped bread.",
    method: "Judas moved through the preparation room before the Passover meal began, handling the money bag containing his payment. His nervous energy caused the cup to be knocked and broken near the doorway. During the meal, Jesus gave him the honoured sop of dipped bread — publicly naming him as the betrayer, though only John fully understood. Judas left immediately into the night to alert the Temple guards.",
    lesson: "Even the betrayal was prophesied. Psalm 41:9, Zechariah 11:12–13, and Isaiah 53:12 all pointed toward this moment centuries in advance. Jesus did not merely endure the betrayal — He identified it from Scripture, gave Judas one final act of grace (the honoured bread), and then let the plan of God proceed.",
    prophesyFulfilled: ["Psalm 41:9", "Zechariah 11:12–13", "Jeremiah 31:31–34", "Exodus 12:1–14", "Isaiah 53:12"],
    furtherReading: ["Matthew 26:17–30", "Mark 14:12–26", "Luke 22:7–23", "John 13:1–30", "1 Corinthians 11:23–26"],
  },
};

// ============================================================
// CASE: The Severed Ear  — difficulty 3 — Gethsemane
// BIBLICAL FOCUS: Matthew 26:47–56, Mark 14:43–52, Luke 22:47–53, John 18:1–12
// PROPHECY: Isaiah 53:7 | Zechariah 13:7
// ============================================================

export const act3CaseB = {
  id: "gethsemane_arrest",
  title: "The Severed Ear",
  subtitle: "An armed mob entered Gethsemane under cover of darkness. A sword was drawn, yet the physical evidence makes no sense.",
  location: "upperroom",
  eventLocation: "Gethsemane Garden, Mount of Olives",
  timeOfDay: "night",
  difficulty: 3,
  requires: "last_supper",
  actLabel: "Act III",
  color: 0x34d399,
  quest: { name: "Garden Search", task: "Locate tactical anomalies", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Late Thursday night, Judas led a cohort of Roman soldiers and temple officers to a private olive grove called Gethsemane. After identifying Jesus with a kiss, a scuffle broke out. Peter drew a short sword and cut off the ear of Malchus, the High Priest’s servant. Jesus immediately commanded Peter to put away his weapon, healed Malchus, and surrendered peacefully.`,
    significance: `This case highlights Jesus's absolute control over His arrest. He prohibited violent revolution, healed His enemy, and protected His disciples from capture, fulfilling His own word that He would lose none of them.`,
    historicalNote: `A Roman cohort combined with temple police shows a massive, coordinated security operation. The authorities expected armed resistance from Jesus's followers, making His peaceful surrender highly unexpected to military tacticians.`,
  },

  prophecies: [
    {
      reference: "Isaiah 53:7",
      id: "isaiah_53_7",
      icon: "🔮",
      text: `"He was oppressed, and he was afflicted, yet he opened not his mouth; like a lamb that is led to the slaughter, and like a sheep that before its shearers is silent, so he opened not his mouth."`,
      written: "~700 BC",
      fulfilledBy: "Jesus refusing to defend Himself or let His disciples fight",
      gospelLink: "Matthew 26:52–54",
      insight: "Though armies of angels were at His call, He voluntarily submitted to human bonds to fulfill the redemptive plan.",
    },
  ],

  evidencePool: [
    {
      id: "abandoned_linen",
      name: "Abandoned Linen Wrapper",
      type: "physical",
      relatedProphecy: "isaiah_53_7",
      icon: "🧣",
      pos: [3, 4, 0],
      snippet: "A fine linen garment left caught in an olive branch.",
      description: "A high-quality linen cloak dropped in the brush, consistent with someone fleeing in an extreme hurry.",
      propheticLink: "Mark 14:51–52 records a young man who followed Jesus wearing only a linen cloth. When seized, he left the cloth behind and fled naked.",
      investigatorNote: "The high grade of the linen suggests the owner was from a wealthy Jerusalem family, potentially John Mark acting as a secret night observer.",
    },
    {
      id: "dropped_torch",
      name: "Extinguished Roman Torch",
      type: "physical",
      icon: "🪵",
      pos: [-6, -2, 0],
      snippet: "A heavy pitch-pine torch block stamped with legionary markings.",
      description: "A Roman military torch dropped and trampled into the mud. It was unlit when dropped, despite still having plenty of unburnt pitch.",
      propheticLink: "John 18:3 notes they arrived with torches and lanterns, expecting a deep-woods manhunt.",
      investigatorNote: "John 18:6 records that when Jesus stated 'I am he,' the entire detachment fell backward to the ground. This dropped torch marks the exact physical epicenter of that divine surge.",
    },
    {
      id: "severed_ear_wrap",
      name: "Bloodied Scarf Fragment",
      type: "physical",
      icon: "🩸",
      pos: [1, -1, 0],
      snippet: "A head cloth heavily soaked in arterial blood, but cleanly cut.",
      description: "A cloth bearing a distinct vertical slice from a sharp blade, heavily stained with blood, found directly on the garden path.",
      propheticLink: "Luke 22:50–51 and John 18:10 document Peter cutting off Malchus's ear, which Jesus immediately healed.",
      investigatorNote: "This provides the supreme paradox: there is dynamic arterial blood indicating an amputation, but no victim at the scene lacks an ear.",
    },
  ],

  suspects: [
    {
      id: "malchus_servant",
      name: "Malchus",
      role: "High Priest's Personal Assistant",
      avatar: "👨‍💼",
      color: 0xffaa44,
      pos: [0, 0, 0],
      bibleRef: "John 18:10",
      background: "The personal agent of Caiaphas, sent to oversee the temple police execution of the arrest warrant.",
      dialogue: {
        neutral: "The man surrendered cleanly. The arrest was successful. There is nothing more to discuss.",
        cautious: "I... I felt the cold blade hit my neck. I heard the blood pooling. But then His hand touched me, and the pain vanished. Look at me... my skin is unbroken. Explain that to your records.",
      },
      contradictions: {
        "dropped_torch+severed_ear_wrap": {
          exposed: "Alright! Peter struck me. I should be disfigured, but Jesus repaired what His own disciple broke. I came to chain Him, and He healed me instead. That's why I did not order the arrest of the rest of the disciples."
        },
      },
    },
    { id: "none", name: "No One", role: "Not Stolen", avatar: "❓", bibleRef: null },
  ],

  npcs: [
    {
      id: "malchus_servant",
      name: "Malchus",
      role: "High Priest's Personal Assistant",
      faction: "temple",
      avatar: "👨\u200d💼",
      profileFile: "./characters/malchus.json",
      truthfulness: 0.90,
      bibleRef: "John 18:10; Luke 22:51",
      hasDialogue: true,
      storyFile: null,
      unlocksEvidence: ["abandoned_linen", "dropped_torch"],
      background: "The confidential agent of Caiaphas[cite: 1]. He was at the front of the line holding the warrant when Simon Peter drawing a hidden blade ambushed him in the dark. He is dealing with acute cognitive dissonance after an enemy healed his wound[cite: 1].",
      dialogue: {
        neutral: "The tactical entry succeeded. The prisoner surrendered without demanding a siege.",
        cautious: "The blood on my tunic is real. The cut on my head covering is clean through. But my flesh... there isn't even a scar.",
        pressured: "Simon Peter came at me from the dark brush. I didn't see the steel until it caught me. I fell into the mud, holding the side of my face, expecting to bleed out in an oil grove.",
        exposed: "The Galilean didn't run. He touched the side of my face, and the burning cold turned into... skin. He rebuilt my flesh. I came to put iron bands on Him, and He mended my wound. Why didn't he let his men fight?",
        repeat: "My report to the high priest is concluded. Do not waste my time.",
      },
      reactions: {
        severed_ear_wrap: { text: "That is my head scarf. You can see where the blade sliced the linen cleanly from above. The blood soaked through completely before the touch occurred.", isLie: false },
        dropped_torch: { text: "When we asked for Him, He stepped forward and said 'I am He.' The air went thick, like a heavy gale hitting a wall. Half the line tumbled backward over the roots. That's when torches were trampled.", isLie: false },
        abandoned_linen: { text: "One of their younger followers was grabbed by a guard. He panicked, slipped right out of his white cloak, and bolted into the deep brush naked.", isLie: false },
      },
      contradictions: {},
    },
{
       id: "simon_peter",
       name: "Simon Peter",
       role: "Galilean Disciple",
       faction: "scribes",
       avatar: "🐓",
      profileFile: "./characters/peter.json",
       truthfulness: 0.70,
       bibleRef: "John 18:10-11; Matthew 26:51-54",
       hasDialogue: true,
       storyFile: "./story/peter_defense.json",
       unlocksEvidence: ["severed_ear_wrap"],
      background: "The informal leader of the inner circle[cite: 1]. He is currently hidden in the shadows outside the high priest's courthouse, deeply traumatized, defensive, and swinging violently between raw panic and profound shame[cite: 1].",
      dialogue: {
        neutral: "They came with swords and clubs as if hunting an insurgent. What did they expect us to do? Sit there?",
        cautious: "The garden was dark. Torches were moving through the trees. Everything happened in seconds.",
        pressured: "I drew the blade because we said we would die with Him. I swung at the closest person holding a rope. I wanted to split his skull.",
        exposed: "I cut the ear clean off. I saw the blood hit the mud. But the teacher... He yelled at me. He told me those who take the sword die by the sword. He didn't want a war. He healed the man, then told me to sheath the iron. I don't understand His strategy.",
        repeat: "Leave me alone. I don't know the man you're talking about.",
      },
      reactions: {
        severed_ear_wrap: { text: "That blood belongs to Malchus. I dropped my defense when the teacher commanded me to put the blade away. The wound should still be open.", isLie: false },
        dropped_torch: { text: "The cohort fell backward when He spoke. They had lanterns and military weapons, but they were shaking like leaves when He stepped into the light.", isLie: false },
        abandoned_linen: { text: "That belongs to John Mark. He was tracking us from the upper city. When the temple police grabbed his shoulder, he just ran.", isLie: false },
      },
      contradictions: {
        "severed_ear_wrap+dropped_torch": { exposed: "I thought we were starting the rebellion! He told us to carry swords earlier. But when I actually used the steel, He fixed the enemy's wounds and surrendered willingly. I ran because... if He isn't fighting Rome, what are we doing?" },
      },
    },
    {
      id: "roman_soldier",
      name: "Garrison Guard",
      role: "Antonia Fortress Auxiliary",
      faction: "roman",
      avatar: "🛡️",
      profileFile: "./characters/garrison_guard.json",
      truthfulness: 0.85,
      bibleRef: "John 18:3; Matthew 26:47",
      background: "A professional auxiliary infantryman stationed at the Antonia Fortress, assigned to reinforce the temple police for a high-risk night arrest[cite: 1]. He views the regional religious dynamics with absolute cynical detachment[cite: 1].",
      dialogue: {
        neutral: "We were ordered to secure the perimeter of an olive orchard. We hold the fortress, not local theological opinions[cite: 1].",
        cautious: "The operation was a logistical mess. Night deployments in heavy brush are always unpredictable.",
        pressured: "The temple enforcers were nervous. They thought the Galilean had an armed cell waiting in the trees. Then one of the inner circle jumped from the shadows with a short sword.",
        exposed: "The old man Peter sliced Malchus. Standard tactical procedure would be to deploy lethal force against the entire cell. But the prisoner stopped it. He literally commanded His own rebel to stand down, touched the servant, and solved the injury. We just stood there with our spears low.",
        repeat: "My shift ends at dawn. Talk to the centurion if you want a dispatch report.",
      },
      reactions: {
        dropped_torch: { text: "That pine torch belongs to my unit. Stamped with the fortress mark. The frontline fell back like they hit a stone barrier when the target declared his identity. Clumsy line work.", isLie: false },
        severed_ear_wrap: { text: "I saw the strike. Messy swing, but it took the ear off. The servant should be dead or disfigured. Instead, he walked back to the city gates tracking our prisoner with his head intact.", isLie: false },
        abandoned_linen: { text: "One of the local kids left his cloak in our hands. He scampered off into the darkness. Not our target, so we let him clear the line.", isLie: false },
      },
      contradictions: {},
    },
  ],

  deductions: {
    "abandoned_linen+dropped_torch": {
      link: {
        text: "The placement of the dropped torch and the abandoned linen show a split path of panic.",
        insight: "While the arresting party was knocked off balance, the younger followers of Jesus scattered into the darkness in utter terror, leaving their belongings behind.",
        isKey: false,
        bibleRef: "Mark 14:50",
      },
    },
    "dropped_torch+severed_ear_wrap": {
      link: {
        text: "The proximity of the weapon strike to the fallen military hardware suggests a sudden collision of kingdoms.",
        insight: "Peter attempted a messy tactical defense, but Jesus immediately neutralized the violence by performing a medical miracle on the enemy commander.",
        isKey: true,
        bibleRef: "Luke 22:51",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no military insurgency. Jesus submitted voluntarily, refusing to allow His disciples to mount an armed rebellion against the legal authorities.",
    method: "Judas betrayed the location, and an armed force arrived. Peter panicked and struck Malchus. Jesus miraculously healed Malchus's ear on the spot, demanded peace, and surrendered Himself willingly to fulfill the Scriptures.",
    lesson: "The kingdom of Jesus does not advance by carnal weapons. His voluntary surrender proves that His death was an act of deliberate obedience, not a tactical failure.",
    prophesyFulfilled: ["Isaiah 53:7", "Zechariah 13:7"],
    furtherReading: ["John 18:1–12", "Luke 22:47–53"],
  },
};



// ============================================================
// CASE: The Curtain and the Cross  — difficulty 3 — Crucifixion
// BIBLICAL FOCUS: Matthew 27:32–56, Mark 15:21–41, Luke 23:26–49, John 19:16–37
// PROPHECY: Psalm 22:16-18, Isaiah 53:9, Zechariah 12:10, Amos 8:9
// ============================================================

export const act3CaseC = {
  id: "sanhedrin_trial",
  title: "The Midnight Tribunal",
  subtitle: "Inside the High Priest's residence, a legal sham is unfolding while a disciple waits in the cold courtyard.",
  location: "upperroom",
  eventLocation: "High Priest's Courtyard, Jerusalem",
  timeOfDay: "night",
  difficulty: 3,
  requires: "gethsemane_arrest",
  actLabel: "Act III",
  color: 0x991b1b,
  quest: { name: "Trial Investigation", task: "Expose the illegal proceedings", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Following the arrest in Gethsemane, Jesus was taken to the house of Caiaphas. In an illegal midnight session, the Sanhedrin sought false testimony to condemn Him. When Jesus affirmed His identity as the Son of God, Caiaphas tore his robes in a display of ritual outrage. Outside in the courtyard, Peter denied Jesus three times, punctuated by the crowing of the rooster.`,
    significance: `The trial fulfilled prophecies concerning the silence of the Lamb and the specific insults He would endure. Peter's denial serves as the low point of the disciples' faithfulness.`,
    historicalNote: `Jewish law forbade capital trials at night or on the eve of a Sabbath/Festival. The haste and location of this gathering highlight its procedural illegality.`,
  },

  prophecies: [
    {
      reference: "Isaiah 50:6",
      id: "isaiah_50_6",
      icon: "🔮",
      text: `"I offered my back to those who beat me, my cheeks to those who pulled out my beard; I did not hide my face from mocking and spitting."`,
      written: "~700 BC",
      fulfilledBy: "The guards and Sanhedrin members striking and spitting on Jesus after the verdict",
      gospelLink: "Matthew 26:67",
      insight: "The physical abuse was prophesied—the Suffering Servant would endure mockery and spitting as part of the redemptive plan.",
    },
    {
      reference: "Micah 5:1",
      id: "micah_5_1",
      icon: "🔮",
      text: `"Out of you will come one ruler to rule over a people... Yet I will come to the firstborn of the exiles of Moab, to the one who has been spared among the dry bones."`,
      written: "~700 BC",
      fulfilledBy: "Jesus remaining silent during His false trial, fulfilling the role of the innocent sufferer",
      gospelLink: "Matthew 27:12-14",
      insight: "Though mocked as a criminal, Jesus fulfilled the prophecy of one who would rule from weakness.",
    },
  ],

  intro: `The moon has set behind the Temple Mount. In the courtyard of the High Priest's residence, a surreal scene unfolds: Jesus stands before a hastily assembled tribunal, accused of blasphemy. Inside, false witnesses testify against Him. Outside, by a charcoal fire, a certain disciple warms himself—for the moment. The rooster's crow will change everything.`,

  suspects: [
    { id: "chief_priest", name: "Caiaphas", role: "High Priest", avatar: "👨‍⚖️", bibleRef: "Matthew 26:57" },
    { id: "false_witness", name: "Ananias", role: "Hired Accuser", avatar: "🤥", bibleRef: "Mark 14:56" },
    { id: "peter_denial", name: "Peter", role: "Denying Disciple", avatar: "🐓", bibleRef: "Matthew 26:69-75" },
    { id: "none", name: "No One", role: "Not Guilty", avatar: "❓", bibleRef: null },
  ],

  evidencePool: [
    {
      id: "rooster_feather",
      name: "Rooster Feather",
      relatedProphecy: "micah_5_1",
      type: "physical",
      icon: "🪶",
      location: "Courtyard Floor",
      desc: "A small feather found near the charcoal fire where Peter stood. The sound of the crowing still echoes in the air.",
      bibleRef: "Matthew 26:74-75",
      propheticLink: "The third denial led to the third crowing, fulfilling Jesus's prediction of Peter's failure.",
      investigatorNote: "This feather marks the site of the most famous denial in history.",
    },
    {
      id: "torn_robe",
      name: "Priestly Robe Fragment",
      relatedProphecy: "isaiah_50_6",
      type: "physical",
      icon: "🥋",
      location: "Judgment Seat",
      desc: "A clean, white piece of high-grade linen torn from a priestly garment. It bears the tear marks of deliberate ripping.",
      bibleRef: "Matthew 26:65",
      propheticLink: "Caiaphas tore his robes to signal blasphemy when Jesus affirmed His divinity.",
      investigatorNote: "The tear was ritual declaration that Jesus had committed the unforgivable offense.",
    },
    {
      id: "false_scroll",
      name: "Conflicting Depositions",
      type: "analytical",
      icon: "📜",
      location: "Council Chamber",
      desc: "Scraps of parchment recording the claims of witnesses. The details about destroying the Temple do not match.",
      bibleRef: "Mark 14:56-59",
      propheticLink: "The lack of consistent testimony exposes the trial as a fabrication.",
      investigatorNote: "No single witness could agree—so they had to manufacture testimony.",
    },
    {
      id: "charcoal_remains",
      name: "Charcoal Briquette",
      type: "physical",
      icon: "🔥",
      location: "Courtyard Fire Pit",
      desc: "A charred piece of olive wood from the courtyard fire. Its arrangement suggests recent burning.",
      bibleRef: "John 18:18",
      propheticLink: "Peter's denial by the fire fulfilled Jesus's prediction that he would deny three times.",
      investigatorNote: "The fire was a place of warmth—and of betrayal.",
    },
  ],

  npcs: [
    {
      id: "caiaphas_trial",
      name: "Caiaphas",
      role: "High Priest",
      faction: "temple",
      avatar: "👨‍⚖️",
      profileFile: "./characters/caiaphas.json",
      color: 0xcc8888,
      pos: [0, 0, 0],
      truthfulness: 0.4,
      bibleRef: "Matthew 26:57-68; John 11:49-52",
      hasDialogue: true,
      storyFile: "./story/caiaphas_priest.json",
      background: "Joseph ben Caiaphas presided over the late-night tribunal. Fearing Roman intervention, he orchestrated Jesus's condemnation.",
      dialogue: {
        neutral: "The council has spoken. The prisoner has condemned Himself.",
        cautious: "We asked legitimate questions. A teacher claiming divinity has obligations to the Law.",
        pressured: "He answered our questions with silence at first—then with blasphemy when pressed.",
        exposed: "When He said 'I am,' and 'you will see the Son of Man seated at the right hand of Power'—that was not silence anymore. That was the unforgivable claim.",
        repeat: "The decision is unanimous. There is nothing more to discuss.",
      },
      reactions: {
        torn_robe: { text: "I tore my robes when He said the words that confirmed His guilt. The Law demands this response.", isLie: false },
        false_scroll: { text: "The witnesses were... inconsistent on some details. But the verdict stands.", isLie: true },
        charcoal_remains: { text: "The courtyard was cold. The fire was for warmth, nothing more.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "peter_denial_trial",
      name: "Peter",
      role: "Denying Disciple",
      faction: "scribes",
      avatar: "🐓",
      profileFile: "./characters/peter.json",
      color: 0xffaa44,
      pos: [12, 0, 8],
      truthfulness: 0.7,
      bibleRef: "Matthew 26:69-75; Mark 14:66-72; John 18:15-27",
      hasDialogue: true,
      storyFile: "./story/peter_denial.json",
      background: "Peter had boasted he would never deny the Master. Now, in the courtyard, fear has seized him.",
      dialogue: {
        neutral: "I tell you, I do not know the man!",
        cautious: "It was a dark courtyard. I was hardly paying attention to what they were saying.",
        pressured: "They kept asking, and I kept denying. Each time, my words felt heavier.",
        exposed: "The third time—the third time—he looked at me. And I remembered. And I went out and wept bitterly.",
        repeat: "I have nothing more to say. Leave me.",
      },
      reactions: {
        rooster_feather: { text: "That sound... that sound haunted me for the rest of the night. And for the rest of my life.", isLie: false, revealedClue: "torn_robe" },
        charcoal_remains: { text: "I was just warming myself. I was just... distancing myself.", isLie: true },
        torn_robe: { text: "I heard the tearing. I heard the outrage. I was relieved they had decided He was guilty.", isLie: false },
      },
      contradictions: {
        "rooster_feather+charcoal_remains": { exposed: "The fire was supposed to keep me warm. Instead, it became the place where my courage burned away." },
      },
    },
    {
      id: "false_witness_trial",
      name: "Ananias",
      role: "Hired Accuser",
      faction: "temple",
      avatar: "🤥",
      profileFile: "./characters/ananias_witness.json",
      color: 0x94a3b8,
      pos: [-5, 0, -5],
      truthfulness: 0.2,
      bibleRef: "Mark 14:56-58",
      hasDialogue: true,
      background: "One of the men paid to testify against Jesus. His testimony was bought—and easily discredited.",
      dialogue: {
        neutral: "I heard Him say He would destroy the Temple. That was enough for me.",
        cautious: "They gave me instructions before I entered. Specific words to say.",
        pressured: "Yes, I was paid. The truth has to be flexible when the stakes are this high.",
        exposed: "The other witnesses and I could not agree on details. 'Destroy this Temple'—in what timeframe? It was embarrassing.",
        repeat: "The payment was sufficient. The message was sufficient.",
      },
      reactions: {
        false_scroll: { text: "That is my handwriting. I recorded what they told me to say.", isLie: false },
        torn_robe: { text: "When the High Priest tore his robes, I knew they had the answer they wanted.", isLie: false },
      },
      contradictions: {},
    },
  ],

  deductions: {
    "rooster_feather+torn_robe": {
      timeline: {
        text: "Peter's third denial coincided with the High Priest's dramatic tear of his robes—two moments of judgment on the same night.",
        insight: "While the tribunal pronounced condemnation on the Son of God, a disciple pronounced condemnation on himself through denial.",
        isKey: true,
        bibleRef: "Matthew 26:74-75; 26:65",
      },
    },
    "false_scroll+charcoal_remains": {
      contradict: {
        text: "The conflicting witness testimony and the presence of the courtyard fire show the contrast between manufactured evidence and genuine human weakness.",
        insight: "While false witnesses could not agree, Peter's denials were uncomfortably consistent—confirming his presence and his failure.",
        isKey: true,
        bibleRef: "Matthew 26:56; 26:75",
      },
    },
  },

  truth: {
    culprit: "caiaphas",
    motive: "Blasphemy charge used as political leverage to secure Roman execution.",
    method: "The Sanhedrin manufactured testimony and pressured Jesus to pronounce judgment on Himself through His own words.",
    lesson: "The trial was a collection of procedural illegalities. Peter's failure shows the human condition, while Jesus's silence shows divine resolve.",
    prophesyFulfilled: ["Isaiah 50:6", "Micah 5:1", "Psalm 27:12"],
    furtherReading: ["Matthew 26:57–68", "Mark 14:53–65", "Luke 22:54–71"],
},
};


// ============================================================
// CASE: The People's Choice  — difficulty 3 — The Trial
// BIBLICAL FOCUS: Matthew 27:15–26, Mark 15:6–15, Luke 23:13–25, John 18:38–40
// PROPHECY: Isaiah 53:3 | Psalm 2:1-2
// ============================================================

export const act3CaseD = {
  id: "barabbas_choice",
  title: "The People's Choice",
  subtitle: "Pilate offers a choice between a Prince of Peace and a man of violence. Who will the crowd choose?",
  location: "upperroom",
  timeOfDay: "day",
  difficulty: 3,
  requires: "sanhedrin_trial",
  actLabel: "Act III",
  color: 0xa78bfa,
  quest: { name: "Judgment Review", task: "Review the release of Barabbas", cur: 0, tar: 3 },

  biblicalContext: {
    summary: "During the Passover, the Roman governor released one prisoner. Pilate offered Jesus or Barabbas. The crowd, stirred by the priests, chose the insurgent.",
    significance: "This choice represents the rejection of God's Kingdom in favor of earthly revolution and power.",
    historicalNote: "Barabbas was an insurrectionist who had committed murder in a rebellion, making him the direct opposite of Jesus's peaceful message."
  },

  prophecies: [],
  evidencePool: [],
  suspects: [
    { id: "barabbas_insurgent", name: "Barabbas", role: "Released Criminal", avatar: "⚔️", bibleRef: "Matthew 27:16" },
    { id: "none", name: "No One", role: "Fulfillment", avatar: "❓", bibleRef: null }
  ],
  npcs: [],
  deductions: {},
  truth: {
    culprit: "none",
    motive: "The crowd preferred a political savior who would fight Rome over a spiritual savior who would suffer for them.",
    method: "Pressure from the religious leadership manipulated the Roman legal process to release a known killer.",
    lesson: "The rejection of Jesus was a choice of the many, not just a few, highlighting the depth of human brokenness.",
    prophesyFulfilled: ["Isaiah 53:3"],
    furtherReading: ["Matthew 27:15-26"]
  }
};


// ============================================================
// CASE: The Crucifixion — difficulty 3 — Golgotha
// BIBLICAL FOCUS: Matthew 27:32–56, Mark 15:21–41, Luke 23:26–49, John 19:16–37
// PROPHECY: Psalm 22:16-18, Isaiah 53:9, Zechariah 12:10, Amos 8:9
// ============================================================

export const act3CaseE = {

  id: "crucifixion_site",
  title: "The Final Sacrifice",
  subtitle: "The sky has turned to ink and the ground is groaning. On the hill of execution, the records of Rome and Jerusalem are being rewritten by the rocks themselves.",
  location: "upperroom",
  timeOfDay: "night",
  difficulty: 3,
  requires: "barabbas_choice",
  actLabel: "Act III",
  color: 0xef4444,
  quest: { name: "Golgotha Forensics", task: "Analyze the seismic and cosmic anomalies", cur: 0, tar: 3 },

  biblicalContext: {
    summary: `On Friday morning, Nisan 14, Jesus was led out of Jerusalem to a rocky hill called Golgotha to be executed between two insurrectionists[cite: 3, 5, 7]. For three hours, an eerie, supernatural darkness covered the entire land[cite: 3, 5, 7]. At 3:00 PM, Jesus cried out and gave up His spirit[cite: 3, 5, 7]. Instantly, a localized earthquake ripped through Judea, splitting rocks, opening tombs, and tearing the massive Temple veil clean in two from top to bottom[cite: 3, 5, 7]. To accelerate burial before the Sabbath sunset, a Roman soldier pierced His side, yielding an unexpected flow of blood and water[cite: 3, 5].`,
    significance: `This case records the ultimate paradox of the Passion Week: an execution meant to act as a public deterrent of Roman shame became the epic center of cosmic and theological transformation[cite: 2, 7]. The tearing of the heavy Temple curtain declared that the barrier between God and humanity had been permanently removed[cite: 3], while the unbroken bones identified Jesus as the true Passover Lamb[cite: 3].`,
    historicalNote: `Crucifixion squads under Pontius Pilate were highly efficient, professional units[cite: 6, 7]. The execution details were tightly managed, making the accompanying seismic rifts, sudden midday darkness, and structural Temple failures deeply disruptive anomalies to veteran legionaries and Temple priests alike[cite: 6, 7].`,
  },

  prophecies: [
    {
      reference: "Psalm 22:16–18",
      id: "psalm_22_16_18",
      icon: "🔮",
      text: `"They have pierced my hands and my feet... they divide my garments among them and cast lots for my clothing."`,
      written: "~1000 BC",
      fulfilledBy: "Roman soldiers nailing Jesus to the cross and gambling for His seamless garment",
      gospelLink: "Matthew 27:35; John 19:23–24",
      insight: "Crucifixion did not exist as a method of execution when David penned this Psalm[cite: 2]. Yet, the details match precisely down to the soldiers dividing His outer garments into four parts and casting lots for His single woven tunic[cite: 7].",
    },
    {
      reference: "Amos 8:9",
      id: "amos_8_9",
      icon: "🔮",
      text: `"'In that day,' declares the Sovereign LORD, 'I will make the sun go down at noon and darken the earth in broad daylight.'"`,
      written: "~750 BC",
      fulfilledBy: "The supernatural three-hour darkness blanketing Judea from noon until 3:00 PM",
      gospelLink: "Mark 15:33; Luke 23:44–45",
      insight: "Passover always occurs during a full moon, making a natural solar eclipse astronomically impossible[cite: 6, 7]. The historical record of this prolonged noon darkness was so widely documented that non-Christian historians like Thallos and Phlegon actively tried to find natural explanations for it[cite: 6, 7].",
    },
    {
      reference: "Isaiah 53:9",
      id: "isaiah_53_9",
      icon: "🔮",
      text: `"He was assigned a grave with the wicked, and with the rich in his death, though he had done no violence."`,
      written: "~700 BC",
      fulfilledBy: "Jesus dying alongside criminals but being buried in the clean, private rock-cut tomb of wealthy Joseph of Arimathea",
      gospelLink: "Matthew 27:57–60; John 19:38–42",
      insight: "Executed criminals were routinely thrown into mass, unmarked graves or left to historical decay[cite: 7]. The sudden intervention of a wealthy Sanhedrin member fulfilled Isaiah's binary paradox to the letter[cite: 7].",
    },
    {
      reference: "Zechariah 12:10",
      id: "zechariah_12_10",
      icon: "🔮",
      text: `"They will look on me, the one they have pierced, and they will mourn for him as one mourns for an only child."`,
      written: "~520 BC",
      fulfilledBy: "The legionary piercing Jesus's side with a spear, and the surrounding crowd departing in deep grief",
      gospelLink: "John 19:34–37; Luke 23:48",
      insight: "To ensure death without breaking His legs (which would violate the Passover lamb protocol), a soldier delivered a post-mortem spear thrust[cite: 3]. The resulting discharge of blood and water clinically confirmed death by cardiac rupture or extreme physical trauma[cite: 6, 7].",
    },
  ],

  intro: `The air over Golgotha is heavy with dust. The supernatural darkness that choked out the midday sun for three hours has finally lifted, revealing a scene of utter devastation. A violent tremor has split the limestone rifts of the hill, throwing down old tombs. Down in the city, panic has erupted over a structural disaster inside the Temple sanctuary itself. Up here, the execution detail stands frozen. Something unprecedented has just occurred—and the physical evidence left on this hill holds the answers.`,

  suspects: [
    { id: "centurion_longinus", name: "Longinus", role: "Roman Centurion", avatar: "🪖", bibleRef: "Matthew 27:54 — 'When the centurion... saw the earthquake and all that had happened, they were terrified, and said, \"Surely he was the Son of God!\"'" },
    { id: "temple_priest_pashhur", name: "Pashhur", role: "Temple Priest on Shift", avatar: "🕌", bibleRef: "Matthew 27:51 — 'At that moment the curtain of the temple was torn in two from top to bottom.'" },
    { id: "joseph_arimathea", name: "Joseph of Arimathea", role: "Secret Disciple & Council Member", avatar: "📜", bibleRef: "John 19:38 — 'Joseph of Arimathea asked Pilate for the body of Jesus... With Pilate's permission, he came and took the body away.'" },
    { id: "none", name: "No One", role: "Divine/Cosmic Event", avatar: "❓", bibleRef: "Amos 8:9; Matthew 27:51 — The signs were acts of God, not human subversion" }
  ],

  evidencePool: [
    {
      id: "split_dice",
      name: "Soldiers' Casting Dice",
      type: "physical",
      relatedProphecy: "psalm_22_16_18",
      icon: "🎲",
      location: "Foot of the Central Cross",
      desc: "Four crude bone gaming dice dropped in the dust near a pile of discarded ropes, right where the soldiers gambled for the victim's clothes.",
      bibleRef: "John 19:23–24 — 'Let’s not tear it,' they said to one another. 'Let’s decide by lot who will get it.' This happened that the scripture might be fulfilled...",
      propheticLink: "Directly fulfills Psalm 22:18[cite: 3, 5, 7]. While the victim hung dying, the indifferent execution detail executed a routine lottery for a high-quality, seamless tunic woven from top to bottom[cite: 7].",
      investigatorNote: "The dice indicate a standard, procedural execution routine—until the noon darkness disrupted their shifts[cite: 5, 7].",
    },
    {
      id: "pierced_spear",
      name: "Blood-Stained Roman Hasta",
      type: "physical",
      relatedProphecy: "zechariah_12_10",
      icon: "🗡️",
      location: "Golgotha Guard Station",
      desc: "A heavy Roman iron spearhead stained with a clear, separated residue of deep red blood crust and transparent pericardial fluid.",
      bibleRef: "John 19:34 — 'Instead, one of the soldiers pierced Jesus’s side with a spear, bringing a sudden flow of blood and water.'",
      propheticLink: "Fulfills Zechariah 12:10 ('the one they have pierced') and protects the Passover Lamb requirement of Exodus 12:46 ('not one bone shall be broken')[cite: 3, 5, 7]. The spear thrust proved the victim was already dead, making the leg-breaking unnecessary[cite: 3, 7].",
      investigatorNote: "The fluid separation proves severe internal trauma. The medical signature matches a ruptured heart or extreme pleural effusion[cite: 6, 7].",
    },
    {
      id: "shattered_limestone",
      name: "Shattered Limestone Fragment",
      type: "physical",
      icon: "🪨",
      location: "Golgotha Basal Rift",
      desc: "A freshly sheared section of Jerusalem limestone showing a sharp, jagged vertical fracture path triggered by a massive, sudden seismic wave.",
      bibleRef: "Matthew 27:51 — 'The earth shook, the rocks split and the tombs broke open.'",
      propheticLink: "The earthquake, combined with the three hours of darkness (Amos 8:9), served as a macrocosmic response to the execution[cite: 3, 5, 7]. Recent Dead Sea sediment varve analyses confirm a major localized seismic event occurred in Judea during this exact decade[cite: 6, 7].",
      investigatorNote: "The split is clean and deep, indicating a severe tectonic movement centered right through the execution hill[cite: 3, 7].",
    },
    {
      id: "torn_veil_thread",
      name: "Thick Blue and Scarlet Threads",
      type: "physical",
      relatedProphecy: "amos_8_9",
      icon: "🧵",
      location: "Temple Outer Courtyard Landing",
      desc: "A heavy twist of woven blue, purple, and scarlet threads, ripped violently apart. The weave is a palm-width thick and incredibly dense.",
      bibleRef: "Luke 23:45 — 'The sun stopped shining. And the curtain of the temple was torn in two.'",
      propheticLink: "The Parokhet curtain blocked access to the Holy of Holies[cite: 6, 7]. Its top-to-bottom tear structurally verified that the old covenant system had split wide open, granting direct access to the presence of God[cite: 3, 7].",
      investigatorNote: "Brought out of the sanctuary by a panicked priest. No human hands could rip material this thick[cite: 6, 7]—and the tear started from the top down[cite: 3, 7].",
    },
    {
      id: "linen_shroud_receipt",
      name: "Joseph's Market Bill for Fine Linen",
      type: "analytical",
      relatedProphecy: "isaiah_53_9",
      icon: "📜",
      location: "Downstairs Lower Market Quarter",
      desc: "A hurried commercial receipt matching a purchase from a wealthy merchant: 'One piece of premium fine linen shroud, paid in full by Joseph, counselor of Arimathea.' Signed just before the city gates closed for Sabbath.",
      bibleRef: "Mark 15:46 — 'So Joseph bought some linen cloth, took down the body, wrapped it in the linen, and placed it in a tomb...'",
      propheticLink: "Fulfills Isaiah 53:9[cite: 3, 5, 7]. Instead of being cast into the criminal dirt pits of Hinnom, Jesus was instantly reassigned to a wealthy man's private, rock-hewn garden tomb[cite: 3, 5, 7].",
      investigatorNote: "Joseph risked his entire aristocratic standing on the Sanhedrin by publicly claiming the body of a condemned man from Pilate[cite: 2, 7].",
    },
  ],

  npcs: [
    {
      id: "centurion_longinus",
      name: "Centurion Longinus",
      role: "Roman Centurion",
      faction: "roman",
      avatar: "🪖",
      profileFile: "./characters/centurion_longinus.json",
      truthfulness: 0.95,
      bibleRef: "Mark 15:39 — 'And when the centurion... saw how he died, he said, \"Surely this man was the Son of God!\"'",
      hasDialogue: true,
      storyFile: "./story/roman_assessment.json",
      unlocksEvidence: ["split_dice", "pierced_spear"],
      background: "A battle-hardened Roman officer assigned to the Antonia Fortress[cite: 1]. He has supervised dozens of routine public deterrence executions[cite: 2]. He stood directly in front of the central cross all afternoon and ordered the final spear thrust[cite: 3].",
      dialogue: {
        neutral: "The execution details were carried out according to imperial protocols. The prisoner is dead.",
        cautious: "I have broken armies, citizen. I know when a man dies in despair. But this one... He didn't curse. He commanded His own spirit to depart. And then the sun vanished[cite: 3, 5, 7].",
        pressured: "When the ground sheared beneath our boots, the rock rifts split open[cite: 3, 7]. My men panicked. We have crucified a philosopher before, but never one whose death made the earth itself scream[cite: 6, 7].",
        exposed: "I told the governor myself—this was no ordinary provincial insurgent[cite: 6, 7]. When I looked at how He died under that black sky, I knew it[cite: 3, 7]. We didn't execute a criminal; we executed the Son of God[cite: 3, 7].",
        repeat: "The record stands. I gave the final verification report to Pilate[cite: 3, 7].",
      },
      reactions: {
        split_dice: { text: "My men were playing tabs for the garments. It's an old garrison habit to pass the grueling hours. But when the darkness hit at noon, they dropped the bone dice and fell flat on their faces[cite: 5, 7].", isLie: false },
        pierced_spear: { text: "Yes, that's my unit's hasta[cite: 3]. I ordered the thrust because the priests wanted the legs smashed to clear the hill before Sabbath[cite: 3, 7]. But He was already gone. When the iron went in, blood and water came rushing out in distinct streams[cite: 3, 7]. No living body does that[cite: 6, 7].", isLie: false },
        shattered_limestone: { text: "That limestone split right at the moment He breathed His last[cite: 3, 7]. The tectonic shock wave nearly knocked me off my feet[cite: 6, 7].", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "temple_priest_pashhur",
      name: "Pashhur",
      role: "Temple Priest on Shift",
      faction: "temple",
      avatar: "🕌",
      profileFile: "./characters/pashhur.json",
      truthfulness: 0.4,
      bibleRef: "Luke 23:45; Matthew 27:51",
      hasDialogue: true,
      storyFile: "./story/caiaphas_priest.json",
      unlocksEvidence: ["torn_veil_thread", "shattered_limestone"],
      background: "A serving priest from the course of Abijah, responsible for maintaining ritual protocols inside the Holy Place on the afternoon of Passover Eve[cite: 2, 5]. He was inside the Sanctuary when the earthquake struck at 3:00 PM[cite: 3, 5, 7].",
      dialogue: {
        neutral: "The Passover sacrifices proceeded in the inner court without structural delay. The Temple remains secure.",
        cautious: "There was a... minor structural shifting due to the afternoon tremor. A routine maintenance issue in the sanctuary, nothing more.",
        pressured: "You have no right to question the priesthood! The inner sanctuary is forbidden to outsiders. Whatever happened to the veil is an internal matter for the high priest to review[cite: 2].",
        exposed: "It was terrifying! At the exact hour of the evening sacrifice—3:00 PM—the great rifts shook the stone floor[cite: 3, 5, 7]. Then, with a sound like a rushing wind, the massive inner curtain tore straight down the middle[cite: 3, 5, 7]! It didn't wear out; it ripped from the top down, exposing the Holy of Holies to the open air[cite: 3, 7]! The doors swung open by themselves[cite: 6, 7]!",
        repeat: "The sanctuary is closed. Go back to the lower city.",
      },
      reactions: {
        torn_veil_thread: { text: "Where did you get that thread? Put it away! If the people find out the inner curtain split right down the center while that Galilean died, it will trigger an absolute religious panic[cite: 3, 7]!", isLie: true, revealedClue: "shattered_limestone" },
        shattered_limestone: { text: "The earthquake was a generic natural coincidence. Tectonic shifts happen in the Rift valley all the time. It has nothing to do with the execution outside the city walls[cite: 6, 7].", isLie: true },
      },
      contradictions: {
        "torn_veil_thread+shattered_limestone": { exposed: "Fine! The earthquake rifts directly struck the Temple foundations at the exact moment the man died on Golgotha[cite: 3, 5, 7]. The great doors slammed open, the massive veil split completely in two from top to bottom[cite: 3, 5, 7], and the sanctuary is left bare[cite: 6, 7]. Our old structural monopoly over the presence of God collapsed in three seconds[cite: 3, 6, 7]." },
      },
    },
    {
      id: "joseph_arimathea",
      name: "Joseph of Arimathea",
      role: "Secret Disciple & Council Member",
      faction: "scribes",
      avatar: "📜",
      profileFile: "./characters/joseph_arimathea.json",
      truthfulness: 0.9,
      bibleRef: "Luke 23:50–53; John 19:38",
      hasDialogue: true,
      storyFile: "./story/joseph_arimathea.json",
      unlocksEvidence: ["linen_shroud_receipt"],
      background: "A prominent, wealthy member of the Sanhedrin council who secretly looked for the Kingdom of God[cite: 2, 7]. He opposed the late-night illegal tribunal of Caiaphas but remained silent until the crucifixion forced him to act[cite: 2, 7].",
      dialogue: {
        neutral: "I have provided a legal, clean resting place for the teacher's body in my own garden estate.",
        cautious: "I had to act quickly. The Sabbath sunset was approaching fast, and it is against our Law to leave a body exposed overnight.",
        pressured: "Yes, I went to Pilate directly[cite: 3, 7]. My colleagues on the council wanted Him thrown into the common criminal trenches to erase His memory[cite: 7]. I could not let that happen. I bought the linens myself[cite: 3, 7].",
        exposed: "I spent three years hiding my devotion because I feared losing my seat on the high council[cite: 2]. But when I saw the darkness, the earthquake, and the way He died, my silence became an unbearable sin[cite: 2, 3, 7]. I used my wealth to buy His dignity. I buried Him like a king in a clean, pristine rock tomb[cite: 3, 5, 7].",
        repeat: "He rests securely under a heavy stone seal[cite: 3, 7].",
      },
      reactions: {
        linen_shroud_receipt: { text: "Yes, that is my commercial signature. I bought the finest linen available in the lower markets[cite: 3, 7]. Nicodemus joined me with a massive weight of myrrh and aloes[cite: 3, 7]. We buried Him with the honor due to royalty[cite: 7].", isLie: false },
        pierced_spear: { text: "When we took Him down from the timber, we saw the wound in His side[cite: 3, 7]. It was clean, deep, and already stopped bleeding[cite: 7]. The sacrifice was completely finished[cite: 3, 7].", isLie: false },
      },
      contradictions: {},
    },
,
    {
      id: "upper_room_prep",
      name: "Upper Room Prep",
      role: "Household Servant",
      avatar: "🏠",
      truthfulness: 0.8,
      bibleRef: "Mark 14:12-16",
      hasDialogue: true,
      storyFile: "./story/upper_room_prep.json",
      background: "Helped prepare the upper room for Passover. Observed unusual details.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "secret_visit",
      name: "Secret Visitor",
      role: "Night Visitor",
      avatar: "🌙",
      truthfulness: 0.5,
      bibleRef: "John 18:1-14",
      hasDialogue: true,
      storyFile: "./story/secret_visit.json",
      background: "A mysterious nighttime visit. Account of garden events differs from official narrative.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "peter_denial",
      name: "Peter (Denial)",
      role: "Broken Disciple",
      avatar: "😔",
      truthfulness: 0.6,
      bibleRef: "Matthew 26:69-75; Mark 14:66-72; Luke 22:54-62; John 18:15-18,25-27",
      hasDialogue: true,
      storyFile: "./story/peter_denial.json",
      background: "Denied Jesus three times before the rooster crowed. Hiding after public collapse.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "peter_defense_simple",
      name: "Peter (Simple Defense)",
      role: "Disciple",
      avatar: "🕊️",
      truthfulness: 0.7,
      bibleRef: "John 18:15-18",
      hasDialogue: true,
      storyFile: "./story/peter_defense_simple.json",
      background: "A simplified account of Peter defense after the arrest.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "simon_cyrene",
      name: "Simon of Cyrene",
      role: "Cross-Bearer",
      avatar: "🏋️",
      truthfulness: 0.8,
      bibleRef: "Matthew 27:32; Mark 15:21; Luke 23:26",
      hasDialogue: true,
      storyFile: "./story/simon_cyrene.json",
      background: "Forced to carry Jesus cross. A foreign pilgrim caught in Roman enforcement.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "temple_curtain",
      name: "Temple Curtain Witness",
      role: "Temple Attendant",
      avatar: "🏛️",
      truthfulness: 0.9,
      bibleRef: "Matthew 27:51",
      hasDialogue: true,
      background: "Witnessed the Temple curtain tearing at Jesus death. The ultimate sign the old covenant ended.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "centurion_witness",
      name: "Centurion Witness",
      role: "Roman Officer",
      avatar: "🛡️",
      truthfulness: 0.8,
      bibleRef: "Matthew 27:54; Mark 15:39; Luke 23:47",
      hasDialogue: true,
      storyFile: "./story/centurion_witness.json",
      background: "A Roman centurion present at the crucifixion. Declared Jesus innocent.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
,
    {
      id: "temple_curtain",
      name: "Temple Curtain Witness",
      role: "Temple Attendant",
      avatar: "🏛️",
      truthfulness: 0.9,
      bibleRef: "Matthew 27:51",
      hasDialogue: true,
      storyFile: "./story/temple_curtain.json",
      background: "Witnessed the Temple curtain tearing at Jesus death — the ultimate sign that the old covenant ended.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
  ],

  deductions: {
    "split_dice+pierced_spear": {
      link: {
        text: "The combination of the soldiers' gambling dice and the dynamic spear wound documents the calculated mechanical nature of Roman execution protocol running directly into a sudden medical paradox.",
        insight: "While the guards routinely parsed out His garments to fulfill Psalm 22:18, the sudden water and blood discharge clinically proved that Jesus died of a ruptured heart before His legs could be broken, preserving the Passover Lamb motif.",
        isKey: true,
        bibleRef: "John 19:23–34; Psalm 22:18; Exodus 12:46",
      },
    },
    "shattered_limestone+torn_veil_thread": {
      link: {
        text: "The split limestone on Golgotha and the torn threads of the inner sanctuary veil form a perfectly synchronized tectonic and theological timeline.",
        insight: "At exactly 3:00 PM, the localized seismic wave that fractured the rocks of Golgotha simultaneously struck the Temple foundations, ripping the palm-thick veil from top to bottom to signify that access to God's presence was now completely open.",
        isKey: true,
        bibleRef: "Matthew 27:51; Luke 23:45; Mishnah Shekalim 8:5",
      },
    },
    "linen_shroud_receipt+split_dice": {
      compare: {
        text: "The soldiers gambling for cheap garments at the foot of the cross sits in stark contrast with a wealthy counselor paying a premium price for a fine linen shroud.",
        insight: "This structural transition directly bridges the binary paradox of Isaiah 53:9—moving Jesus instantly from the lowest status of a disgraced criminal to the high-society burial honors of a rich man's private garden estate.",
        isKey: true,
        bibleRef: "Isaiah 53:9; Mark 15:46; Matthew 27:57",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "The crucifixion was not an unexpected strategic failure, but a calculated, voluntary act of redemption that explicitly leveraged cosmic, geological, and legal parameters to fulfill ancient prophecies.",
    method: "The Roman military machinery carried out the execution, and the Sanhedrin elite initiated the charges to secure political stability. However, the resulting three hours of darkness, the rock-splitting earthquake, the top-down tearing of the Temple veil, and the rich man's burial completely bypassed their control, structurally validating Jesus as the true Messiah and the ultimate Passover Lamb.",
    lesson: "The cross transformed a Roman instrument of shame into history's absolute center of restoration. Every physical detail—from the unbroken bones to the torn curtain—proved that old barriers were shattered, and a New Covenant was established.",
    prophesyFulfilled: ["Psalm 22:16-18", "Amos 8:9", "Isaiah 53:9", "Zechariah 12:10", "Exodus 12:46"],
    furtherReading: ["Matthew 27:32–56", "Mark 15:21–41", "Luke 23:26–49", "John 19:16–37", "Hebrews 10:19–22"],
  },
};