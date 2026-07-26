// ============================================================
// CASE: The Midnight Arrest — difficulty 3 — Mount of Olives
// ACT: Act III
// CASE EXPORT: act3CaseA (id: "gethsemane_arrest")
// ============================================================

export const act3CaseA = {
  id: "gethsemane_arrest",
  title: "The Midnight Arrest",
  subtitle: "A covert operation under cover of darkness, a kiss of betrayal, and a strike in the dark — who commanded the hand behind the arrest?",
  location: "gethsemane",
  eventLocation: "Garden of Gethsemane, Mount of Olives",
  timeOfDay: "night",
  difficulty: 3,
  requires: "authority_challenged",
  actLabel: "Act III",
  color: 0x8b5cf6,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Gethsemane Investigation", task: "Collect all evidence", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Late Thursday night after the Passover meal, Jesus led His disciples across the Kidron Valley into an olive grove called Gethsemane. As Jesus prayed in intense agony, Judas Iscariot arrived leading a detachment of Roman soldiers along with officers from the chief priests and Pharisees, armed with lanterns, torches, and weapons. Judas identified Jesus with a predetermined sign: a kiss. When Peter attempted armed resistance by striking the High Priest's servant Malchus, Jesus immediately healed the servant's severed ear and rebuked Peter, submitting voluntarily to fulfill the Scriptures.`,
    significance: `The Gethsemane arrest represents the climax of the conspiracy against Jesus. It demonstrates Jesus's total voluntary submission — He was not taken by surprise or overwhelmed by force, but surrendered Himself in fulfillment of messianic prophecy. The betrayal by an intimate companion fulfilled Psalm 41:9, while the exact transaction price of 30 pieces of silver fulfilled Zechariah 11:12–13.`,
    historicalNote: `A Roman cohort (speira) commanded by a tribune (chiliarchos) alongside the Temple guard indicates a joint operation orchestrated by Sanhedrin leadership and Roman military authorities. Conducting the arrest late at night in a private grove was deliberate to avoid stirring up a public riot among Passover pilgrims in Jerusalem.`,
  },

  prophecies: [
    {
      reference: "Zechariah 11:12–13",
      id: "zechariah_11_12_13",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"They paid me thirty pieces of silver... Throw it to the potter — the handsome price at which they valued me!"`,
      written: "~520 BC",
      fulfilledBy: "Judas bargaining with the chief priests for 30 silver shekels to betray Jesus",
      gospelLink: "Matthew 26:14–15; Matthew 27:3–10",
      insight: "Thirty pieces of silver was the exact Mosaic valuation for a slave injured by an ox (Exodus 21:32). Zechariah sarcastically calls it 'a handsome price,' highlighting Israel's insultingly low valuation of God's Shepherd.",
      explanation: "The precise transaction fee for Jesus's betrayal matched Zechariah's prophecy centuries before the Temple treasury paid Judas.",
    },
    {
      reference: "Psalm 41:9",
      id: "psalm_41_9",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"Even my close friend, someone I trusted, one who shared my bread, has turned against me."`,
      written: "~1000 BC",
      fulfilledBy: "Judas Iscariot betraying Jesus after sharing the Passover bread at the Upper Room table",
      gospelLink: "John 13:18; Mark 14:18–20",
      insight: "In ancient Near Eastern culture, sharing bread sealed a covenant of peace and protection. To break bread with someone and then deliver them to death was considered the ultimate betrayal.",
      explanation: "Jesus explicitly cited Psalm 41:9 at the Last Supper, identifying Judas as the intimate companion who would betray Him.",
    },
    {
      reference: "Isaiah 53:7",
      id: "isaiah_53_7",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"He was oppressed and afflicted, yet he did not open his mouth; he was led like a lamb to the slaughter."`,
      written: "~700 BC",
      fulfilledBy: "Jesus voluntarily yielding to arrest in Gethsemane without calling down angelic armies or allowing Peter to fight",
      gospelLink: "Matthew 26:52–54; John 18:11",
      insight: "Jesus reminded Peter that He could command 'more than twelve legions of angels' (Matthew 26:53), yet chose non-resistance so that the Scriptures of the prophets would be fulfilled.",
      explanation: "Isaiah foresaw the Messiah's willing submissiveness during His violent seizure and false trial.",
    },
    {
      reference: "Zechariah 13:7",
      id: "zechariah_13_7",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"Strike the shepherd, and the sheep will be scattered."`,
      written: "~520 BC",
      fulfilledBy: "The disciples fleeing into the darkness upon Jesus's arrest in the Garden",
      gospelLink: "Matthew 26:31; Mark 14:50",
      insight: "When the arrest force bound Jesus, every disciple deserted Him and fled, leaving Him entirely alone in fulfillment of Zechariah's word.",
      explanation: "Jesus quoted this prophecy on the walk to Gethsemane, warning His disciples of their immediate scatter upon His arrest.",
    }
  ],

  intro: formatIntro(`It is past midnight on Friday morning, Nisan 14. The silence of the olive trees in Gethsemane is shattered by torchlight and heavy boots. A mixed force of Temple guards and Roman soldiers marches into the grove, led by one of Jesus's twelve apostles. **'The one I kiss is the man; arrest him,'** Judas had instructed. A sudden flash of a sword leaves the High Priest's servant wounded, but Jesus touches the man and restores him, commanding His disciples to put away their arms. Examine the scene of midnight betrayal and trace who orchestrated this operation.`),

  suspects: [
    { id: "judas", name: "Judas Iscariot", role: "Disgraced Apostle", avatar: "judas_iscariot.svg", bibleRef: "Matthew 26:14–16; John 18:2–5" },
    { id: "malchus", name: "Malchus", role: "High Priest's Personal Servant", avatar: "malchus_servant.svg", bibleRef: "John 18:10–11; Luke 22:50–51" },
    { id: "guard_commander", name: "Commander Eli", role: "Temple Guard Captain", avatar: "temple_guard.svg", bibleRef: "John 18:12; Luke 22:52" },
    { id: "none", name: "No One", role: "Not Stolen", avatar: "<img src='../assets/gfx/question-duotone.svg' class='icon-svg' loading='lazy'>", bibleRef: null },
  ],

  evidencePool: [
    {
      id: "thirty_silver",
      name: "Bag of Thirty Shekels of Tyre",
      type: "physical",
      relatedProphecy: "zechariah_11_12_13",
      icon: "../assets/gfx/coins-duotone.svg",
      location: "Gethsemane Entrance Path",
      pos: [12, 0, 8],
      snippet: "A heavy leather pouch containing thirty high-purity Tyrian silver coins.",
      description: "A leather coin pouch containing thirty silver shekels minted in Tyre. Tyrian shekels were the only currency accepted for Temple tax due to their high silver purity. This was the exact payment from the Temple treasury.",
      bibleRef: "Matthew 26:15 — 'They counted out for him thirty pieces of silver.'",
      propheticLink: "Zechariah 11:12–13 specified thirty pieces of silver as the price of the Shepherd. The pouch directly ties the transaction back to the Sanhedrin treasury.",
      bibleRefs: [
        { ref: "Matthew 26:15", link: "matthew_2615" },
        { ref: "Zechariah 11:12-13", link: "zechariah_111213" }
      ],
      propheticRefs: [
        { ref: "Zechariah 11:12-13", link: "zechariah_111213" }
      ],
      investigatorNote: "Thirty silver shekels — high purity Temple coinage. This wasn't ordinary street money; it came straight out of the priestly vault.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Pairs with Zechariah 11 scroll fragment to confirm the exact monetary price paid for betrayal.",
        link: "Event — silver payment issued directly from the Temple treasury to Judas Iscariot.",
        timeline: "CHRONOLOGY: Exchanged prior to the Passover meal during the secret conspiracy meeting.",
        contradict: "RELIABILITY: High silver content shekels prove official Sanhedrin treasury involvement."
      }
    },

    {
      id: "signal_lantern",
      name: "Iron Guard Lantern & Torch",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/fire-duotone.svg",
      location: "Olive Press Ruins",
      pos: [-8, 0, 14],
      snippet: "A pitch torch and soot-stained metal lamp dropped during the scuffle.",
      description: "A heavy iron lantern and pine-pitch torch dropped in the olive press clearing. The torch burning at midnight confirms the authorities brought full illumination to identify their target under the full moon.",
      bibleRef: "John 18:3 — 'So Judas came to the garden, guiding a detachment of soldiers and some officers... They were carrying lanterns, torches and weapons.'",
      propheticLink: "The use of torches highlights the spiritual contrast between the 'darkness' of the arresting party and Jesus as the 'Light of the World' (John 8:12).",
      bibleRefs: [
        { ref: "John 18:3", link: "john_183" }
      ],
      propheticRefs: [],
      investigatorNote: "Torches under a full Passover moon show they anticipated Jesus might try to slip away into the dark shadows of the olive grove.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Pairs with the witness account of the kiss to establish visibility conditions during the arrest.",
        link: "Event — lighting equipment brought by the Temple guard delegation for night operations.",
        timeline: "CHRONOLOGY: Lit and carried into Gethsemane at midnight.",
        contradict: "RELIABILITY: Torches prove the raid was intentionally executed under cover of night."
      }
    },

    {
      id: "severed_ear_cloth",
      name: "Bloodied Linen Servant Wrap",
      type: "physical",
      relatedProphecy: "isaiah_53_7",
      icon: "../assets/gfx/bandage-duotone.svg",
      location: "Center Olive Grove",
      pos: [2, 0, -5],
      snippet: "A blood-stained strip of fine linen cloth torn from a servant's turban.",
      description: "A piece of fine linen wrapped in haste, bearing fresh blood stains. Belongs to Malchus, the personal servant of High Priest Caiaphas, whose right ear was sliced off by Simon Peter and subsequently healed.",
      bibleRef: "Luke 22:50–51 — 'And one of them struck the servant of the high priest, cutting off his right ear. But Jesus answered, No more of this! And he touched the man's ear and healed him.'",
      propheticLink: "Jesus's refusal to permit violent defense fulfilled Isaiah 53:7 — He submitted meekly like a lamb led to slaughter, healing even His captor.",
      bibleRefs: [
        { ref: "Luke 22:50-51", link: "luke_225051" },
        { ref: "Isaiah 53:7", link: "isaiah_537" }
      ],
      propheticRefs: [
        { ref: "Isaiah 53:7", link: "isaiah_537" }
      ],
      investigatorNote: "Blood is present on the discarded linen, yet Malchus's ear is completely intact. The physical healing left no permanent physical wound.",
      fake: false,
      category: 'people',
      timelineOrder: 3,
      clues: {
        compare: "Pairs with the broken sword sheath to document Peter's violent defense and Jesus's miraculous intervention.",
        link: "People — linen headwrap belonging to Malchus, the High Priest's servant.",
        timeline: "CHRONOLOGY: Torn during the sword attack immediately after the signal kiss.",
        contradict: "RELIABILITY: Blood on the wrap contrasts with Malchus's restored ear, proving the miracle."
      }
    },

    {
      id: "psalm_41_scroll",
      name: "Psalm 41 Scroll Fragment",
      type: "analytical",
      relatedProphecy: "psalm_41_9",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Upper Room Table, Mount Zion",
      pos: [-18, 0, -12],
      snippet: "A parchment scrap with Psalm 41:9 highlighted in Hebrew ink.",
      description: "A parchment scrap left on the Passover meal table bearing Psalm 41:9. Jesus quoted this text directly during the meal before Judas slipped out into the night.",
      bibleRef: "John 13:18 — 'But this is to fulfill the scripture: He who shares my bread has turned against me.'",
      propheticLink: "David's ancient lament over Ahithophel's betrayal foreshadowed Judas's betrayal of the Son of David after eating the Passover meal.",
      bibleRefs: [
        { ref: "John 13:18", link: "john_1318" },
        { ref: "Psalm 41:9", link: "psalm_419" }
      ],
      propheticRefs: [
        { ref: "Psalm 41:9", link: "psalm_419" }
      ],
      investigatorNote: "Left behind at the Upper Room table. Jesus foreknew the betrayer's identity and action before they even arrived at the garden.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 4,
      clues: {
        compare: "Pairs with the bag of thirty shekels to identify betrayal by an intimate Passover companion.",
        link: "Prophecy — ancient text predicting covenant betrayal by one sharing bread.",
        timeline: "CHRONOLOGY: Recited in the Upper Room during the Last Supper prior to the garden prayer.",
        contradict: "RELIABILITY: Left at the dining table where Judas dipped his bread with Jesus."
      }
    },

    {
      id: "broken_sword_sheath",
      name: "Discarded Leather Sword Sheath",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/sword-duotone.svg",
      location: "Gethsemane Clearing",
      pos: [6, 0, -18],
      snippet: "A short leather sheath scaled for a small fisherman's blade.",
      description: "A worn leather scabbard fitted for a short sword or utility blade. Simon Peter dropped it after striking Malchus when Jesus ordered: 'Put your sword back into its place, for all who draw the sword will die by the sword.'",
      bibleRef: "Matthew 26:52 — 'Put your sword back in its place, Jesus said to him, for all who draw by the sword will die by the sword.'",
      propheticLink: "Isaiah 2:4 foresaw beating swords into plowshares; Jesus forbade defensive violence to fulfill His redemptive mission through sacrifice.",
      bibleRefs: [
        { ref: "Matthew 26:52", link: "matthew_2652" },
        { ref: "Isaiah 2:4", link: "isaiah_24" }
      ],
      propheticRefs: [],
      investigatorNote: "Peter came prepared to fight a physical battle. Jesus disarmed His own disciple to fulfill the Father's spiritual purpose.",
      fake: false,
      category: 'people',
      timelineOrder: 5,
      clues: {
        compare: "Pairs with the severed ear cloth to corroborate Peter's sudden blade strike.",
        link: "People — sheath belonging to Simon Peter, abandoned upon Jesus's command.",
        timeline: "CHRONOLOGY: Dropped during the confrontation right after Jesus healed Malchus.",
        contradict: "RELIABILITY: Proves physical arms were present among disciples but explicitly restrained by Jesus."
      }
    },

    {
      id: "temple_guard_warrant",
      name: "Sanhedrin Arrest Order",
      type: "analytical",
      relatedProphecy: "",
      icon: "../assets/gfx/clipboard-duotone.svg",
      location: "Gethsemane Boundary Wall",
      pos: [-12, 0, 5],
      snippet: "An official parchment writ bearing the seal of High Priest Caiaphas.",
      description: "An official warrant ordering the immediate apprehension of 'Jesus of Nazareth' under cover of darkness to prevent public unrest. Sealed by Caiaphas and counter-signed by the Roman cohort commander.",
      bibleRef: "John 18:12 — 'Then the detachment of soldiers with its commander and the Jewish officials arrested Jesus.'",
      propheticLink: "Psalm 2:2 — 'The kings of the earth rise up and the rulers band together against the LORD and against his anointed one.'",
      bibleRefs: [
        { ref: "John 18:12", link: "john_1812" },
        { ref: "Psalm 2:2", link: "psalm_22" }
      ],
      propheticRefs: [
        { ref: "Psalm 2:2", link: "psalm_22" }
      ],
      investigatorNote: "Signed jointly by Sanhedrin officers and a Roman commander. This was a coordinated political suppression.",
      fake: false,
      category: 'event',
      timelineOrder: 6,
      clues: {
        compare: "Pairs with the silver coins to confirm legal and financial backing by Sanhedrin leadership.",
        link: "Event — legal arrest decree authorizing joint Roman-Temple guard force deployment.",
        timeline: "CHRONOLOGY: Formulated late Thursday evening during Caiaphas' emergency session.",
        contradict: "RELIABILITY: Official seals prove the arrest was not a rogue riot but state action."
      }
    },

    {
      id: "zechariah_11_scroll",
      name: "Zechariah 11 Scroll Fragment",
      type: "analytical",
      relatedProphecy: "zechariah_11_12_13",
      icon: "../assets/gfx/star-duotone.svg",
      location: "Temple Treasury Archive",
      pos: [18, 0, -8],
      snippet: "An ancient prophecy parchment detailing thirty silver pieces.",
      description: "A scroll fragment from Zechariah 11:12–13 predicting the valuation of the Shepherd at thirty pieces of silver and the throwing of that money into the house of the LORD for the potter.",
      bibleRef: "Matthew 27:9–10 — 'Then what was spoken by Jeremiah the prophet was fulfilled: They took the thirty pieces of silver... and they used them to buy the potter's field.'",
      propheticLink: "The prophecy foretold not only the price but also the exact disposition of the money back in the Temple and its eventual use for a potter's field.",
      bibleRefs: [
        { ref: "Matthew 27:9-10", link: "matthew_27910" },
        { ref: "Zechariah 11:12-13", link: "zechariah_111213" }
      ],
      propheticRefs: [
        { ref: "Zechariah 11:12-13", link: "zechariah_111213" }
      ],
      investigatorNote: "Written 500 years prior, detailing the exact figure agreed upon by Judas and Caiaphas.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 7,
      clues: {
        compare: "Pairs with thirty shekels of silver to establish prophetic fulfillment in precise financial detail.",
        link: "Prophecy — Messianic prophecy specifying the valuation of God's Shepherd.",
        timeline: "CHRONOLOGY: Penned in 520 BC, fulfilled on the night of Nisan 14.",
        contradict: "RELIABILITY: The exact match of 30 silver coins rules out coincidence."
      }
    }
  ],

  lab: [
    {
      evidence: "thirty_silver",
      suspect: "judas",
      result: "**Implicated directly** (Transaction payment confirmed)",
      notes: "Judas accepted the thirty Tyrian shekels from Caiaphas' treasury as his fee for betraying Jesus's private location."
    },
    {
      evidence: "severed_ear_cloth",
      suspect: "malchus",
      result: "**Identified as Victim/Witness** (Healed by target)",
      notes: "Malchus was struck by Peter's sword, but Jesus touched and completely healed his ear on the spot."
    }
  ],

  npcs: [
    {
      id: "judas",
      name: "Judas Iscariot",
      role: "Disgraced Apostle",
      avatar: "judas_iscariot.svg",
      pos: [10, 0, 5],
      unlocksSuspects: ["judas"],
      hasDialogue: true,
      storyFile: "judas_confrontation",
      profileFile: "judas_iscariot",
      truthfulness: 0.20,
      bibleRef: "Matthew 26:14–16, 47–50; John 18:2–5",
      background: "Judas of Kerioth, the treasurer for the twelve disciples. Over time, he grew disillusioned with Jesus's refusal to establish an earthly military kingdom. He struck a private bargain with the chief priests to hand Jesus over in exchange for thirty pieces of silver.",
      dialogue: {
        neutral: "Why do you question me? I did what was necessary.",
        cautious: "The money was standard compensation. I only identified Him with a greeting.",
        pressured: "I have sinned! I have betrayed innocent blood! Take the silver back!",
        exposed: "I thought He would assert His power and overthrow Rome when forced! I never intended Him to be condemned to die!",
        repeat: "The blood is on my hands... take back the silver!",
      },
      reactions: {
        thirty_silver: { text: "That pouch... thirty shekels. The exact fee they offered me. I don't want it anymore!", isLie: false },
        psalm_41_scroll: { text: "He knew... at the table He said 'the one who dips bread with me will betray me.' He knew all along.", isLie: false, revealedClue: "zechariah_11_scroll" },
      },
      contradictions: {
        "thirty_silver+zechariah_11_scroll": { exposed: "Thirty pieces... the exact price written in Zechariah! They valued Him as a slave, and I took it!" },
      },
    },
    {
      id: "malchus",
      name: "Malchus",
      role: "High Priest's Personal Servant",
      avatar: "malchus_servant.svg",
      pos: [-10, 0, -5],
      unlocksSuspects: ["malchus"],
      hasDialogue: true,
      storyFile: "malchus_healing",
      profileFile: "malchus_servant",
      revealsProphecy: "isaiah_53_7",
      truthfulness: 0.90,
      bibleRef: "John 18:10–11; Luke 22:50–51",
      background: "Malchus served as the trusted personal slave and representative of High Priest Caiaphas. He was dispatched with the arrest party to ensure official oversight. During Peter's sudden assault, his ear was sliced off, but Jesus restored it immediately.",
      dialogue: {
        neutral: "I came to carry out my master's orders, nothing more.",
        cautious: "The disciple swung a blade at my head in the dark. I thought I was dead.",
        pressured: "He touched my head... where the blood was pouring out. The pain stopped instantly. My ear is whole.",
        exposed: "How could a man being arrested show such compassion to the very servant sent to seize Him?",
        repeat: "I felt His hand touch my ear. There is no scar left.",
      },
      reactions: {
        severed_ear_cloth: { text: "That linen wrap has my blood on it from when the fisherman struck me. But look at me — my ear is restored!", isLie: false },
        broken_sword_sheath: { text: "The Galilean disciple dropped that sheath when his Master commanded him to put away his sword.", isLie: false },
      },
      contradictions: {},
    }
  ],

  deductions: {
    "thirty_silver+zechariah_11_scroll": {
      compare: {
        text: "The thirty Tyrian silver shekels paid to Judas match the precise transaction amount prophesied in Zechariah 11:12–13.",
        insight: "The Sanhedrin valued the Messiah at thirty pieces of silver — the price of a common slave under Mosaic Law — fulfilling ancient prophecy to the exact coin.",
        isKey: true,
        bibleRef: "Matthew 26:15; Zechariah 11:12–13",
      },
      link: {
        text: "The financial transaction links the Sanhedrin treasury directly to the betrayer Judas Iscariot.",
        insight: "This was an official state transaction rather than an isolated act of mob violence.",
        isKey: true,
        bibleRef: "Matthew 27:3–5",
      }
    },
    "severed_ear_cloth+broken_sword_sheath": {
      link: {
        text: "Peter attempted armed defense with a sword, but Jesus disarmed His disciples and miraculously healed Malchus's ear.",
        insight: "Jesus refused physical violence, demonstrating that His kingdom is not of this world and submitting voluntarily to the Father's plan.",
        isKey: true,
        bibleRef: "John 18:10–11; Luke 22:51",
      }
    },
    "psalm_41_scroll+thirty_silver": {
      compare: {
        text: "Psalm 41:9 predicted betrayal by an intimate companion who shared bread, which occurred when Judas betrayed Jesus after the Passover meal.",
        insight: "Judas's betrayal was foreknown and foretold, highlighting human responsibility alongside divine providence.",
        isKey: true,
        bibleRef: "John 13:18; Psalm 41:9",
      }
    }
  },

  truth: {
    culprit: "judas",
    motive: "Judas Iscariot betrayed Jesus for thirty pieces of silver due to greed, disillusionment over Jesus's spiritual Messiahship, and spiritual vulnerability to Satanic influence.",
    method: "Judas led a joint force of Roman soldiers and Temple guards to Gethsemane under cover of night, identifying Jesus with a kiss of greeting to allow immediate seizure away from public crowds.",
    lesson: "Jesus submitted willingly to arrest not out of weakness, but to fulfill Scripture and accomplish redemption. True kingdom victory is achieved through sacrificial love and divine obedience rather than worldly force.",
    prophesyFulfilled: ["Zechariah 11:12–13", "Psalm 41:9", "Isaiah 53:7", "Zechariah 13:7"],
    furtherReading: ["Matthew 26:47–56", "Mark 14:43–52", "Luke 22:47–53", "John 18:1–12"],
  }
};