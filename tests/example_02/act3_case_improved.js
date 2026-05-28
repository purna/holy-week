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
      text: `"The blood shall be a sign for you, on the houses where you are... when I see the blood, I will pass over you, and no plague will befall you to destroy you."`,
      written: "~1400 BC",
      fulfilledBy: "Jesus, as the Passover Lamb, whose blood provides protection from judgement",
      gospelLink: "John 1:29; 1 Corinthians 5:7; Luke 22:15–20",
      insight: "The Passover lamb was to be 'without blemish' (Exodus 12:5). Jesus — declared righteous even by Pilate ('I find no fault in him', John 18:38) — perfectly fulfilled this requirement. The meal Jesus ate was the same meal that pointed to Him.",
    },
    {
      reference: "Jeremiah 31:31–34",
      text: `"Behold, the days are coming, declares the LORD, when I will make a new covenant with the house of Israel... I will put my law within them, and I will write it on their hearts."`,
      written: "~627 BC",
      fulfilledBy: "Jesus declaring 'This cup is the new covenant in my blood' at the Last Supper",
      gospelLink: "Luke 22:20; 1 Corinthians 11:25",
      insight: "Jeremiah prophesied a coming covenant that would be internal, not external — written on hearts, not stone tablets. Jesus announced its inauguration over a cup of wine at Passover. The old covenant was sealed with animal blood (Exodus 24:8); the new with His own.",
    },
    {
      reference: "Psalm 41:9",
      text: `"Even my close friend in whom I trusted, who ate my bread, has lifted his heel against me."`,
      written: "~1000 BC",
      fulfilledBy: "Judas Iscariot betraying Jesus after eating with Him at the Last Supper",
      gospelLink: "John 13:18 — Jesus quotes this Psalm directly at the supper",
      insight: "Jesus explicitly quoted Psalm 41:9 at the table (John 13:18), identifying the betrayal as prophetic fulfilment — not a surprise. In quoting it, He showed that even His betrayal was within God's foreknowledge.",
    },
    {
      reference: "Zechariah 11:12–13",
      text: `"So they weighed out as my wages thirty pieces of silver... and I threw it into the house of the LORD — to the potter."`,
      written: "~520 BC",
      fulfilledBy: "Judas receiving 30 silver coins for betraying Jesus, later thrown into the Temple",
      gospelLink: "Matthew 26:15; Matthew 27:3–10",
      insight: "Thirty silver pieces was the price of a slave (Exodus 21:32) — the religious leaders effectively valued Jesus as the lowest possible commodity. Matthew records this fulfilled Zechariah's prophecy to the detail of the coins being thrown into the temple treasury.",
    },
    {
      reference: "Isaiah 53:12",
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
      avatar: "👨‍🦰",
      truthfulness: 0.75,
      bibleRef: "Acts 12:12; Mark 14:51–52 (possibly the young man who fled the garden)",
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
      avatar: "👧",
      truthfulness: 0.9,
      bibleRef: "Acts 12:13–15",
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
      avatar: "🪙",
      truthfulness: 0.3,
      bibleRef: "Matthew 26:14–16; John 13:27–30; Matthew 27:3–5",
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
  location: "garden",
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
// CASE: The Broken Alabaster  — difficulty 2 — Bethany
// BIBLICAL FOCUS: Matthew 26:6–13, Mark 14:3–9, John 12:1–8
// PROPHECY: Isaiah 61:1–3 | Psalm 45:7–8 | Song of Songs 1:12
// ============================================================

export const act3CaseC = {
  id: "bethany_anointing",
  title: "The Broken Alabaster",
  subtitle: "A fortune in perfume has been poured out at a dinner in Bethany — accident, provocation, or prophecy?",
  location: "bethany",
  difficulty: 2,
  requires: "gethsemane_arrest",
  actLabel: "Act III",
  color: 0x34d399,
  quest: { name: "Bethany Dinner Investigation", task: "Gather all witness accounts", cur: 0, tar: 6 },

  // ── BIBLICAL CONTEXT ──────────────────────────────────────────────
  biblicalContext: {
    summary: `Six days before Passover, Jesus was at dinner in Bethany at the house of Simon the Leper. Mary — the sister of Lazarus — entered with an alabaster jar of pure nard, a perfume worth nearly a year's wages (300 denarii). She broke the jar and poured the entire contents over Jesus's head and feet, then wiped His feet with her hair. The disciples erupted in anger. Jesus silenced them: "She has done a beautiful thing to me. She has anointed my body beforehand for burial. Wherever the gospel is proclaimed in the whole world, what she has done will be told in memory of her."`,
    significance: `The anointing was a royal and prophetic act. In the Old Testament, anointing with oil was done to consecrate kings (1 Samuel 16:13), priests (Exodus 29:7), and sacred objects. The word 'Messiah' (Hebrew) and 'Christ' (Greek) literally mean 'the Anointed One.' Mary's act was — knowingly or unknowingly — the only formal anointing Jesus received before His death. Every king had an anointing. This was His.`,
    historicalNote: `Spikenard (nard) was an imported aromatic resin from the Himalayas — one of the most expensive luxury goods in the ancient world. Three hundred denarii was a working man's full annual wage. Alabaster jars were sealed to preserve the fragrance; breaking the jar was a point of no return — once opened, the nard had to be used completely. The disciples' reaction ('Why this waste?') reflected genuine economic shock. John 12:6 specifically notes Judas's objection — adding that he was a thief who regularly pilfered from the common purse.`,
  },

  prophecies: [
    {
      reference: "Isaiah 61:1–3",
      text: `"The Spirit of the Lord GOD is upon me, because the LORD has anointed me to bring good news to the poor; he has sent me to bind up the brokenhearted... to comfort all who mourn."`,
      written: "~700 BC",
      fulfilledBy: "Jesus being anointed at Bethany — the Messiah ('Anointed One') receiving the only formal consecration before His death",
      gospelLink: "Luke 4:18 — Jesus quotes this Psalm in the synagogue at Nazareth to describe His mission; the Bethany anointing fulfils its symbolic content",
      insight: "Jesus read this prophecy publicly at the start of His ministry to define His purpose. Mary's anointing at the end of His ministry enacted it physically. The whole arc of His mission — from Nazareth to Bethany — is framed by anointing.",
    },
    {
      reference: "Psalm 45:7–8",
      text: `"God, your God, has anointed you with the oil of gladness beyond your companions; your robes are all fragrant with myrrh and aloes and cassia."`,
      written: "~1000 BC",
      fulfilledBy: "The fragrance of the pure nard filling the entire house at Bethany (John 12:3)",
      gospelLink: "John 12:3 — 'the house was filled with the fragrance of the perfume'",
      insight: "Psalm 45 is a royal wedding psalm — the king is described as fragrant with anointing oil. John specifically records that the scent filled the entire house, an unusual detail that echoes the royal imagery of Psalm 45. The gospel writer's emphasis on the fragrance is deliberate.",
    },
    {
      reference: "Song of Songs 1:12",
      text: `"While the king was on his couch, my nard gave forth its fragrance."`,
      written: "~950 BC",
      fulfilledBy: "The specific perfume used — spikenard — poured out on the 'king' reclining at table in Bethany",
      gospelLink: "Mark 14:3 — 'a woman came with an alabaster flask of ointment of pure nard'",
      insight: "Nard appears only twice in all of Scripture: Song of Songs 1:12 and 4:13–14, and at Bethany. Song of Songs uses it in the context of a king's presence. The specific choice of nard — out of all available perfumes — carries this resonance for attentive readers.",
    },
  ],

  intro: `It is Wednesday evening of Passion Week. You have followed a tip to Simon the Leper's house in Bethany, where Jesus and His disciples gathered for dinner. The evening has exploded into argument. A woman — Mary, the sister of Lazarus — has shattered an alabaster jar containing some of the most expensive perfume in the known world and poured it over Jesus's head. The room still smells of nard. Several disciples are furious about the waste. Jesus silenced them in a way that disturbed everyone present. Three people give sharply conflicting accounts of what happened and why. Your task: find out what Mary actually did — and whether Jesus's response was a moment of grace or something far stranger.`,

  suspects: [
    { id: "mary_bethany", name: "Mary of Bethany", role: "Sister of Lazarus, Devoted Follower", avatar: "👩", bibleRef: "John 12:1–3; Luke 10:39" },
    { id: "judas_iscariot", name: "Judas Iscariot", role: "Disciple, Group Treasurer", avatar: "🪙", bibleRef: "John 12:4–6; Matthew 26:14–16" },
    { id: "simon_leper", name: "Simon", role: "House Owner, Healed Leper", avatar: "🏠", bibleRef: "Matthew 26:6; Mark 14:3" },
  ],

  evidencePool: [
    {
      id: "alabaster_shards",
      name: "Shattered Alabaster Neck",
      type: "physical",
      icon: "🏺",
      location: "Dining Room Floor, Simon's House",
      desc: "Fragments of the broken alabaster jar neck — the seal deliberately snapped off to release the contents. White alabaster, imported quality. Breaking the neck is irreversible: the entire jar must be used at once.",
      bibleRef: "Mark 14:3 — 'She broke the jar and poured it over his head.'",
      propheticLink: "Breaking an alabaster jar echoes Jeremiah 19:10–11, where God told Jeremiah to shatter a clay jar before the leaders of Jerusalem as a prophetic act of consecration and judgment. The breaking was the message.",
      investigatorNote: "The break is clean and deliberate — not a drop or an accident. She made a decision before she entered the room. This was not spontaneous.",
    },
    {
      id: "nard_residue",
      name: "Nard Perfume Residue",
      type: "physical",
      icon: "💧",
      location: "Floor Matting Near the Reclining Table",
      desc: "A dense, amber-brown residue saturating the floor matting where Jesus reclined. The scent is overwhelming — pure spikenard, imported from the Himalayas. At current market rates: approximately 300 denarii.",
      bibleRef: "John 12:3 — '...pure nard, very costly. She anointed Jesus's feet and wiped his feet with her hair. The house was filled with the fragrance.'",
      propheticLink: "Spikenard appears in Song of Songs 1:12 in the context of a reclining king. The same specific perfume, the same posture, the same overwhelming presence. The gospel writers chose this detail with care.",
      investigatorNote: "The full jar was used — nothing held back. 300 denarii is a year's wages for a common worker. This was everything Mary had. This was not a gift; it was an act of total surrender.",
    },
    {
      id: "disciples_objection",
      name: "Written Record of Disciples' Protest",
      type: "testimonial",
      icon: "📋",
      location: "John Mark's Scribal Notes, Courtyard",
      desc: "A partial record of the disciples' reaction: 'Why this waste? This could have been sold for a large sum and given to the poor.' Multiple voices. The objection was collective, not just from one person.",
      bibleRef: "Matthew 26:8–9 — 'And when the disciples saw it, they were indignant, saying, Why this waste?'",
      propheticLink: "The disciples' objection mirrors how Israel's leaders repeatedly dismissed prophetic acts as impractical or excessive — just as they rejected the prophets themselves. Amos 5:21–24 describes God's frustration with religious performance that ignores genuine devotion.",
      investigatorNote: "The objection was framed in terms of poverty relief — which sounds virtuous. But John 12:6 specifies that Judas, who led the objection, regularly stole from the common purse. The 'charitable concern' was not sincere.",
    },
    {
      id: "jesus_response_record",
      name: "Eyewitness Account of Jesus's Words",
      type: "analytical",
      icon: "📜",
      location: "Upstairs Room, Simon's House",
      desc: "A short but extraordinary written account from a dinner guest: 'He said, Leave her alone. She has done a beautiful thing to me. She has anointed my body beforehand for burial. Wherever the gospel is proclaimed in the whole world, what she has done will be told in memory of her.' The guest added: 'We didn't understand what burial meant. Not then.'",
      bibleRef: "Matthew 26:10–13; Mark 14:6–9",
      propheticLink: "Jesus's prediction that this act would be remembered 'wherever the gospel is proclaimed in the whole world' is itself a prophetic claim — that His story would reach the entire world, and that a woman's act of devotion would outlast the objections of His own disciples. That prediction is still being fulfilled.",
      investigatorNote: "The burial reference troubled every witness interviewed. Jesus was connecting this dinner to His own death. The disciples heard it and didn't understand. Mary may have.",
    },
    {
      id: "money_ledger",
      name: "Disciples' Common Purse Ledger",
      type: "physical",
      icon: "💰",
      location: "Judas's Travel Satchel, Outer Courtyard",
      desc: "A small wax tablet recording recent transactions from the disciples' shared funds. The entries are consistent — standard expenses for food and accommodation. But there is a notable discrepancy: a sum received and not recorded. The handwriting is Judas's.",
      bibleRef: "John 12:6 — 'He said this, not because he cared about the poor, but because he was a thief, and having charge of the moneybag he used to help himself to what was put into it.'",
      propheticLink: "Zechariah 11:12–13 foreshadowed the treasurer of God's people betraying Him for silver. Judas's ledger — already showing irregularities before the 30-coin agreement — begins to show the financial pressure and opportunism that would lead to the betrayal.",
      investigatorNote: "The unrecorded sum cannot be confirmed from the ledger alone. But the objection to the nard — framed as concern for the poor — must be read in light of this: the man protesting the waste was already stealing from the fund meant for the poor.",
    },
  ],

  npcs: [
    {
      id: "mary_bethany",
      name: "Mary of Bethany",
      avatar: "👩",
      truthfulness: 0.95,
      bibleRef: "John 12:1–3; Luke 10:39–42",
      background: "Mary is the younger sister of Martha and Lazarus. She watched Jesus raise her brother from four days of death. She has sat at Jesus's feet whenever He taught, absorbing His words more deeply than most of His own disciples. She is quiet, perceptive, and acts from conviction rather than calculation.",
      dialogue: {
        neutral: "He is going to die. Everyone is pretending not to hear it, but He has been saying it for weeks. I wanted Him to know — before it's too late — that I understood.",
        cautious: "I know what it cost. I know what they said. I would do it again.",
        pressured: "The jar was mine. The nard was mine. I don't need anyone's permission to honour Him.",
        exposed: "He said it was for His burial. When He said it, I knew I had done the right thing. If that's foolishness to you, I can't help that.",
        repeat: "There's nothing more to say. He accepted it. That's all that matters.",
      },
      reactions: {
        alabaster_shards: { text: "I broke it on purpose. You can't pour nard from a sealed jar. And I didn't want to use only some of it. He deserved all of it.", isLie: false },
        nard_residue: { text: "Yes, I anointed His feet and wiped them with my hair. Some of the disciples thought that was improper. I didn't care.", isLie: false },
        disciples_objection: { text: "They were angry. Judas most of all. He called it waste. Jesus told him to leave me alone.", isLie: false, revealedClue: "money_ledger" },
        jesus_response_record: { text: "He said it would be remembered. I don't understand all of what He meant. But the way He said 'burial'... He wasn't being figurative.", isLie: false },
      },
      contradictions: {
        "alabaster_shards+jesus_response_record": { exposed: "I had been holding that jar for a long time. I didn't know when to use it — or if I ever would. When He kept talking about dying and none of the others would listen — I understood. That was the moment." },
      },
    },
    {
      id: "judas_iscariot",
      name: "Judas Iscariot",
      avatar: "🪙",
      truthfulness: 0.35,
      bibleRef: "John 12:4–6; Matthew 26:14–16",
      background: "Judas is the group's treasurer — the only non-Galilean among the twelve, from Kerioth in Judah. He manages the common purse and has, for some time, been helping himself to its contents. He led the objection to Mary's anointing on the grounds of charity. Two days later, he will approach the chief priests to negotiate a betrayal price.",
      dialogue: {
        neutral: "Three hundred denarii. Poured on the floor. There are families in the lower city who haven't eaten this week.",
        cautious: "I manage the group's finances. I know exactly what things cost. What she did was indefensible from any responsible perspective.",
        pressured: "My concern was entirely for the poor. That is the position I stated at the table and it remains my position now.",
        exposed: "...He saw through me. He always sees through me. I don't know why I bother.",
        repeat: "I have nothing more to say about the perfume.",
      },
      reactions: {
        nard_residue: { text: "Three hundred denarii. Gone. Absorbed into the dirt. Yes, I'm still angry about it.", isLie: false },
        disciples_objection: { text: "The others agreed with me initially. It was Jesus who reversed the room.", isLie: false },
        money_ledger: { text: "My records are accurate. The discrepancy you're referring to is an accounting rounding error. I can explain it properly to you at another time.", isLie: true },
        jesus_response_record: { text: "He said she would be remembered. He said it was for His burial. I find it difficult to accept that He genuinely believes He is going to die.", isLie: false },
      },
      contradictions: {
        "disciples_objection+money_ledger": { exposed: "You want to know why I cared so much about three hundred denarii? Because I know what money like that can do. I've been — I've been managing funds for three years and I know what gets overlooked and what doesn't. That's all I'll say." },
      },
    },
    {
      id: "simon_leper",
      name: "Simon",
      avatar: "🏠",
      truthfulness: 0.8,
      bibleRef: "Matthew 26:6; Mark 14:3",
      background: "Simon was a leper — meaning he was ritually excluded from all social and religious life, unable to live within city walls, unable to attend Temple, unable to touch or be touched. Jesus healed him at some point before Passion Week. The dinner was Simon's way of giving thanks. He is a man who understands what it means to be restored from what seemed like a death sentence.",
      dialogue: {
        neutral: "I opened my house because He gave me back my life. Whatever happened at my table, I take full responsibility for the evening.",
        cautious: "Mary has been a guest of my household since her brother's sickness. What she did — I understood it.",
        pressured: "The disciples were upset. I was not. A man who has been an outcast knows what it means to give everything to the one who called you back.",
        exposed: "I'll tell you what I saw: a woman who heard what no one else was willing to hear, and did what no one else had the courage to do.",
        repeat: "I've said what I have to say.",
      },
      reactions: {
        alabaster_shards: { text: "She broke it deliberately, yes. I saw her face when she walked in. She had already decided. She was not distressed — she was resolved.", isLie: false },
        nard_residue: { text: "The house still smells of it. I don't mind. In my years as a leper, I forgot what it was to have fragrance around me rather than being the one others covered their faces against.", isLie: false },
        disciples_objection: { text: "The argument was louder than it should have been for a dinner table. Judas was the most vocal. One or two others joined him. Jesus stopped it quickly.", isLie: false },
        jesus_response_record: { text: "He said 'burial.' Very clearly. Very calmly. And the argument stopped. I've heard Jesus silence rooms before — but this was different. This was the silence of people who suddenly understood something they didn't want to understand.", isLie: false },
      },
      contradictions: {
        "alabaster_shards+nard_residue": { exposed: "She told me beforehand, actually — before the meal. She said, 'I need to do something tonight.' I didn't ask what. After what He did for my brother and for me... I would have let her bring an entire warehouse of nard." },
      },
    },
  ],

  deductions: {
    "alabaster_shards+jesus_response_record": {
      link: {
        text: "The deliberate breaking of the sealed jar and Jesus's immediate declaration that she was anointing Him 'for burial' form a single connected prophetic act.",
        insight: "Mary did not misunderstand what she was doing. She heard Jesus's repeated predictions of His death and responded with a formal royal anointing — the act of consecration given to kings before their greatest moment. The disciples objected to the economics. Jesus recognised the prophecy.",
        isKey: true,
        bibleRef: "Mark 14:8; Isaiah 61:1",
      },
    },
    "disciples_objection+money_ledger": {
      link: {
        text: "The moral language of the objection ('give to the poor') is directly undermined by the financial irregularities in the treasurer's own records.",
        insight: "The leading voice against a 300-denarii act of generosity belonged to the man quietly stealing from the fund designated for the poor. This is not simply ironic — it reveals that Judas's objection was never really about charity. He recognized value, not sacrifice.",
        isKey: true,
        bibleRef: "John 12:6; Zechariah 11:12–13",
      },
    },
    "nard_residue+alabaster_shards": {
      compare: {
        text: "The full depletion of an irreversibly broken jar confirms this was a total, unreserved offering — nothing withheld.",
        insight: "The alabaster jar could not be resealed. Every drop of nard was used. In the economy of sacred gesture, this parallels the completeness of the sacrifice Mary was anointing Jesus toward — a sacrifice that would also be total and unreserved.",
        isKey: false,
        bibleRef: "Mark 14:3; Psalm 45:7–8",
      },
    },
    "simon_leper+jesus_response_record": {
      timeline: {
        text: "Simon's account of the room's silence after the 'burial' word connects with Jesus's public prediction.",
        insight: "Two people at this dinner had experienced what it means to be recalled from a death sentence: Simon (healed of leprosy) and Lazarus (who was present, John 12:2). They understood at a visceral level what Mary was doing. The room fell silent because the ones who had faced death knew exactly what Jesus meant.",
        isKey: false,
        bibleRef: "John 12:1–3; Matthew 26:10–13",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no crime and no waste. Mary of Bethany performed the only formal anointing Jesus received — a prophetic royal consecration carried out with full awareness of His impending death, which most of the disciples refused to accept. The disciples' outrage revealed their own failure to listen to what Jesus had been telling them for months.",
    method: "Mary entered with a sealed alabaster jar of pure nard worth 300 denarii — a year's wages, her entire reserve. She broke the seal deliberately and poured the complete contents over Jesus's head and feet, then wiped His feet with her hair. The act was premeditated, total, and unreversible. Jesus not only accepted it but declared it a preparation for His burial and promised her memory would outlast the objections of His own disciples.",
    lesson: "Mary heard what the disciples refused to hear. While the twelve argued about waste and poverty relief, she understood that Jesus was going to die and acted accordingly. The broken jar is a picture of the same totality — what Jesus was about to give would also be unreserved and unrepeatable. Judas's objection, funded by his own theft from the poor fund, shows how self-interest disguises itself as moral concern. True devotion is recognized not by its cost, but by what it costs the giver.",
    prophesyFulfilled: ["Isaiah 61:1–3", "Psalm 45:7–8", "Song of Songs 1:12"],
    furtherReading: ["Matthew 26:6–13", "Mark 14:3–9", "John 12:1–8"],
  },
};
