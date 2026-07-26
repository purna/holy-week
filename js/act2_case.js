// ============================================================
// CASE: The Silenced Teacher — difficulty 2 — Temple Courts
// ACT: Act II
// CASE EXPORT: act2CaseA (id: "authority_challenged")
// ============================================================

export const act2CaseA = {
  id: "authority_challenged",
  title: "The Silenced Teacher",
  subtitle: "Three religious leaders have attempted to trap Jesus in His words — but who holds the real authority?",
  location: "temple",
  eventLocation: "Temple Courts, Jerusalem",
  timeOfDay: "day",
  difficulty: 2,
  requires: "temple_cleansing",
  actLabel: "Act II",
  color: 0xf59e0b,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Authority Investigation", task: "Collect all evidence", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `On Tuesday morning, Nisan 12, Jesus returned to the Temple courts for His most intensive day of public teaching. The religious leadership — stung by the Temple cleansing the day before and alarmed by the growing crowds — mounted a coordinated series of challenges designed to discredit Him publicly. They sent Pharisees, Sadducees, Herodians, and scribes in waves. Each trap backfired. Each time, Jesus's answer not only escaped the trap but turned the tables, exposing the questioner's hypocrisy, ignorance, or bad faith. By afternoon, 'no one dared ask him any more questions' (Matthew 22:46).`,
    significance: `The authority question ('By what authority do you do these things?') was the most direct challenge. Jesus answered with a counter-question about John the Baptist's authority that left them publicly paralysed — they couldn't say divine, because they hadn't believed John; they couldn't say human, because the crowd would be furious. Their own trap snapped shut on them. Jesus then delivered three devastating parables against them (the Two Sons, the Wicked Tenants, the Wedding Banquet) followed by the Parable of the Cornerstone — quoting Psalm 118:22 directly at them.`,
    historicalNote: `The 'Temple courts' (Greek: hieron) referred to the vast outer courts of Herod's Temple complex — particularly the Court of the Gentiles. This was a public, noisy, commercially active space where teachers would gather disciples and debate. Jesus taught here daily during Passion Week. The size of the audience made public defeats deeply humiliating for the religious leaders.`,
  },

  prophecies: [
    {
      reference: "Psalm 118:22–23",
      id: "psalm_118_22_23",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"The stone the builders rejected has become the cornerstone; the LORD has done this, and it is marvellous in our eyes."`,
      written: "~1000 BC",
      fulfilledBy: "Jesus quoting this Psalm directly against the religious leaders after the Parable of the Wicked Tenants",
      gospelLink: "Matthew 21:42–44; Mark 12:10–11",
      insight: "The 'builders' were Israel's religious leaders, entrusted with building God's community. The 'stone' was Jesus, whom they were rejecting. Jesus used their own Scripture to declare their judgement — He was the very stone they were trying to remove, and His rejection would become the cornerstone of something entirely new: the Church.",
      explanation: "Jesus quoted this coronation psalm directly at the religious leaders ('the builders'), identifying Himself as the cornerstone of God's new work, which they were in the process of rejecting.",
    },
    {
      reference: "Isaiah 5:1–7",
      id: "isaiah_5_1_7",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"My beloved had a vineyard on a very fertile hill... He looked for it to yield grapes, but it yielded wild grapes... The vineyard of the LORD Almighty is the nation of Israel."`,
      written: "~700 BC",
      fulfilledBy: "The Parable of the Wicked Tenants (Matthew 21:33–46), which deliberately echoed Isaiah's Song of the Vineyard",
      gospelLink: "Matthew 21:33–45; Mark 12:1–12",
      insight: "When Jesus began His parable 'There was a landowner who planted a vineyard, set a hedge around it, dug a winepress...' — He was quoting Isaiah 5 almost word-for-word. Every Pharisee in the crowd recognised it immediately. The tenants who killed the owner's son were unmistakably them. Matthew records: 'When the chief priests and the Pharisees heard his parables, they perceived that he was speaking about them' (Matthew 21:45).",
      explanation: "Jesus's Parable of the Wicked Tenants deliberately quoted Isaiah's 'Song of the Vineyard.' The religious leaders immediately recognized themselves as the unfaithful tenants.",
    },
    {
      reference: "Daniel 7:13–14",
      id: "daniel_7_13_14",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"There before me was one like a son of man, coming with the clouds of heaven... He was given authority, glory and sovereign power; all nations and peoples of every language worshipped him."`,
      written: "~550 BC",
      fulfilledBy: "Jesus's implicit claim to be the 'Son of Man' with divine authority — the title He used throughout the Gospels",
      gospelLink: "Mark 14:62 — Jesus explicitly quotes Daniel 7:13 at His trial before Caiaphas",
      insight: "The title 'Son of Man' was Jesus's preferred self-designation — it is used over 80 times in the Gospels. It came from Daniel 7:13 and carried unmistakable divine authority claims. The religious leaders understood exactly what He was claiming — which is why the high priest tore his robes at Jesus's trial when He quoted it (Mark 14:62–64).",
      explanation: "'Son of Man' was Jesus's preferred title for Himself. It was a direct claim to the divine authority described in Daniel's vision, a claim the High Priest understood as blasphemy.",
    },
    {
      reference: "Malachi 3:1",
      id: "malachi_3_1",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"I will send my messenger, who will prepare the way before me. Then suddenly the Lord you are seeking will come to his temple; the messenger of the covenant, whom you desire, will come."`,
      written: "~430 BC",
      fulfilledBy: "Jesus's presence and teaching authority in the Temple",
      gospelLink: "Matthew 11:10 (Jesus identifies John the Baptist as the 'messenger'); Mark 1:2",
      insight: "The authority challenge asked where Jesus's authority came from. Jesus's counter-question about John's authority was strategic — if John was God's messenger (Malachi 3:1), and John had publicly identified Jesus as the Coming One (John 1:29–34), then Jesus's authority derived from the very God who had sent His messenger ahead. The leaders were trapped.",
      explanation: "Jesus's authority is linked to John the Baptist, the prophesied messenger who would prepare the way for the Lord's arrival at His temple.",
    },
  ],

  intro: formatIntro(`It is Tuesday morning, Nisan 12. The Temple courts are packed with Passover pilgrims and local worshippers. Jesus is teaching when a delegation of chief priests, scribes, and elders arrives — formally and deliberately. Their challenge is direct: **'By what authority do you do these things? Who gave you this authority?'** Three religious leaders were the primary challengers that morning, each representing a different faction. But as you gather evidence from the scene, a question emerges: _who is really on trial here_ — Jesus, or them?`),

  suspects: [
    { id: "chief_priest", name: "Caiaphas", role: "High Priest, Sadducee", avatar: "caiaphas.svg", bibleRef: "Matthew 21:23; John 11:49–52" },
    { id: "scribe", name: "Samuel", role: "Temple Scribe, Pharisee", avatar: "samuel_scribe.svg", bibleRef: "Mark 12:28–34 — a scribe who asks about the greatest commandment" },
    { id: "pharisee", name: "Nathanael", role: "Pharisee, Herodian ally", avatar: "simon_pharisee.svg", bibleRef: "Matthew 22:15–22 — the Pharisees and Herodians on the tax question" },
    { id: "none", name: "No One", role: "Not Stolen", avatar: "<img src='../assets/gfx/question-duotone.svg' class='icon-svg' loading='lazy'>", bibleRef: null },
  ],

  evidencePool: [
    {
      id: "question_scroll",
      name: "The Formal Authority Challenge",
      type: "analytical",
      relatedProphecy: "malachi_3_1",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Temple East Portico",
      pos: [10, 0, 10],
      snippet: "A formal scroll bearing three official priestly seals.",
      description: "A written record of the formal challenge: 'By what authority do you do these things? Who gave you this authority?' Signed with three priestly seals. This was an official delegated challenge, not a spontaneous question.",
      bibleRef: "Matthew 21:23 — 'When he entered the temple, the chief priests and the elders of the people came up to him as he was teaching.'",
      propheticLink: "Malachi 3:1 predicted the Lord coming to His temple with authority. The irony of the challenge is that they were asking for credentials from the very One whose authority derived directly from God.",
      bibleRefs: [
        { ref: "Matthew 21:23", link: "matthew_2123" },
        { ref: "Malachi 3:1", link: "malachi_31" }
      ],
      propheticRefs: [
        { ref: "Malachi 3:1", link: "malachi_31" }
      ],
      investigatorNote: "Three seals: the High Priest, the Chief Scribe, the Council Elder. This was planned, not spontaneous.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Pairs with the witness account to show the delegation's formal challenge backfired.",
        link: "Event — official written challenge from the chief priests questioning Jesus's authority.",
        timeline: "CHRONOLOGY: Presented first thing on Tuesday morning as Jesus began teaching in the Temple.",
        contradict: "RELIABILITY: Sealed by three priestly factions, proving a pre-planned entrapment attempt."
      }
    },

    {
      id: "parable_fragments",
      name: "Sketch of the Vineyard Parable",
      type: "physical",
      relatedProphecy: "isaiah_5_1_7",
      icon: "../assets/gfx/jar-duotone.svg",
      location: "Temple West Portico, Ground",
      pos: [-10, 0, 15],
      snippet: "Broken pottery fragments with rough agricultural sketches.",
      description: "Pieces of broken pottery with rough sketches scratched into them — a vineyard, a watchtower, figures being thrown out. A bystander was illustrating what they were hearing to someone who couldn't see. The Isaiah 5 imagery is unmistakable.",
      bibleRef: "Matthew 21:33–45 — the Parable of the Wicked Tenants",
      propheticLink: "Isaiah 5:1–7 is the Song of the Vineyard — God's lament over Israel's unfaithfulness. Jesus deliberately echoed it. The bystander sketching this recognised the connection immediately.",
      bibleRefs: [
        { ref: "Matthew 21:33-45", link: "matthew_213345" },
        { ref: "Isaiah 5:1-7", link: "isaiah_517" }
      ],
      propheticRefs: [
        { ref: "Isaiah 5:1-7", link: "isaiah_517" }
      ],
      investigatorNote: "These fragments show a bystander who understood the parable's OT reference. The religious leaders would have recognised it instantly — and been publicly shamed.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Pairs with the cornerstone carving to connect the Parable of the Wicked Tenants with Psalm 118.",
        link: "Event — physical sketches recording Jesus's response to the priestly delegation.",
        timeline: "CHRONOLOGY: Drawn during the parable teaching immediately following the authority challenge.",
        contradict: "RELIABILITY: The Isaiah 5 imagery was unmistakable to all bystanders and religious leaders present."
      }
    },

    {
      id: "cornerstone_carving",
      name: "Rejected Cornerstone Fragment",
      type: "physical",
      relatedProphecy: "psalm_118_22_23",
      icon: "../assets/gfx/rock-duotone.svg",
      location: "Temple South Wall, Construction Debris",
      pos: [5, 0, -20],
      snippet: "A discarded limestone fragment with a single Hebrew word.",
      description: "A piece of rejected limestone — the kind cut, shaped, and discarded during the Temple's renovation. Workers have been leaving such stones for years. But on this piece, someone has carved the Hebrew word 'pinnah' — 'cornerstone.' It is from Psalm 118:22.",
      bibleRef: "Matthew 21:42 — 'Jesus said to them, Have you never read in the Scriptures: The stone the builders rejected has become the cornerstone?'",
      propheticLink: "Psalm 118:22–23 was a coronation Psalm, used at Temple dedications. Jesus quoted it at the very Temple whose builders were rejecting Him. The rejected stone lying in the construction debris became a powerful object lesson for anyone listening.",
      bibleRefs: [
        { ref: "Matthew 21:42", link: "matthew_2142" },
        { ref: "Psalm 118:22-23", link: "psalm_1182223" }
      ],
      propheticRefs: [
        { ref: "Psalm 118:22-23", link: "psalm_1182223" }
      ],
      investigatorNote: "Someone scratched 'pinnah' onto a discarded stone and left it here. A disciple? A bystander who understood? Or was it already there — providentially?",
      fake: false,
      category: 'prophecy',
      timelineOrder: 3,
      clues: {
        compare: "Links the rejected stone in Psalm 118:22 directly to the religious leaders' rejection of Jesus.",
        link: "Prophecy — inscribed scripture fragment fulfilling coronation prophecy from Psalm 118.",
        timeline: "CHRONOLOGY: Carved and referenced immediately after the Parable of the Wicked Tenants.",
        contradict: "RELIABILITY: Inscribed on discarded Temple limestone, creating a tangible physical object lesson."
      }
    },

    {
      id: "coin_of_caesar",
      name: "Denarius of Tiberius Caesar",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/coins-duotone.svg",
      location: "Temple Court Floor, Near Treasury Entrance",
      pos: [-5, 0, -10],
      snippet: "A Roman silver coin bearing the face of the Emperor.",
      description: "A silver denarius coin bearing the image of Tiberius Caesar and the inscription 'TIBERIUS CAESAR, SON OF THE DIVINE AUGUSTUS.' A Pharisee dropped it — or left it deliberately — near the treasury entrance.",
      bibleRef: "Matthew 22:19–21 — 'Show me the coin used for paying the tax... Whose image is this? And whose inscription? Caesar's, he replied. Then he said to them, Give back to Caesar what is Caesar's, and to God what is God's.'",
      propheticLink: "The coin bore Caesar's image (imago). Jesus's answer pointed to something deeper: humanity bears God's image (Genesis 1:26–27, imago Dei). The coin question about taxation became a profound statement about identity and allegiance — Caesar's image on metal; God's image on people.",
      bibleRefs: [
        { ref: "Matthew 22:19-21", link: "matthew_221921" },
        { ref: "Genesis 1:26-27", link: "genesis_12627" }
      ],
      propheticRefs: [
        { ref: "Genesis 1:26-27", link: "genesis_12627" }
      ],
      investigatorNote: "The Pharisees and Herodians brought this coin specifically to trap Him. They never expected His answer to turn the image question back onto every human being.",
      fake: false,
      category: 'event',
      timelineOrder: 4,
      clues: {
        compare: "Pairs with the widow's leptons to contrast Roman tax obligations with wholehearted devotion to God.",
        link: "Event — Roman silver denarius used by Pharisees and Herodians in their taxation trap.",
        timeline: "CHRONOLOGY: Produced during the second wave of challenges regarding tribute to Caesar.",
        contradict: "RELIABILITY: Possessing a Roman coin inside the Temple exposed the hypocritical stance of the questioners."
      }
    },

    {
      id: "fig_leaf_withered",
      name: "Withered Fig Leaf",
      type: "environmental",
      relatedProphecy: "",
      icon: "../assets/gfx/leaf-duotone.svg",
      location: "Jerusalem-Bethany Road, Near the Temple Gate",
      pos: [20, 0, 0],
      snippet: "A brittle, blackened leaf that appears to have died instantly.",
      description: "A withered, blackened fig leaf — from the tree Jesus cursed the previous morning. Peter had pointed it out earlier: 'Rabbi, look! The fig tree you cursed has withered.' The leaf has been kept as a testimony to what was seen.",
      bibleRef: "Mark 11:20–21 — 'In the morning, as they went along, they saw the fig tree withered from the roots.'",
      propheticLink: "Micah 7:1 and Jeremiah 8:13 both use a barren fig tree as a symbol for Israel's spiritual fruitlessness. Hosea 9:10 says 'Like grapes in the wilderness, I found Israel.' The withered tree was a living parable — the judgement Jesus described in His Temple parables had already begun in miniature on the roadside.",
      bibleRefs: [
        { ref: "Mark 11:20-21", link: "mark_112021" }
      ],
      propheticRefs: [
        { ref: "Micah 7:1", link: "micah_71" },
        { ref: "Jeremiah 8:13", link: "jeremiah_813" },
        { ref: "Hosea 9:10", link: "hosea_910" }
      ],
      investigatorNote: "The withered fig tree and the Temple parables interpret each other. Both speak of outward religious appearance with no real fruit.",
      fake: false,
      category: 'event',
      timelineOrder: 5,
      clues: {
        compare: "Pairs with the Parable of the Wicked Tenants as a physical sign of judgment on fruitlessness.",
        link: "Event — dried leaf from the cursed fig tree brought from the Bethany road.",
        timeline: "CHRONOLOGY: Collected Tuesday morning before entering the Temple courts.",
        contradict: "RELIABILITY: Shows total, rapid withering from the roots, confirming the prophetic act."
      }
    },

    {
      id: "widow_two_coins",
      name: "Two Leptons (Widow's Mites)",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/currency-dollar-duotone.svg",
      location: "Temple Treasury Contribution Chests",
      pos: [0, 0, 12],
      snippet: "Two tiny bronze coins, the smallest possible currency.",
      description: "Two tiny bronze lepton coins — the smallest denomination in circulation, worth a fraction of a penny. They were deposited in the Treasury by a widow, observed by Jesus and several disciples. The treasurer has logged them alongside substantial gifts from wealthy donors.",
      bibleRef: "Mark 12:41–44 — 'Calling his disciples to him, Jesus said, Truly I tell you, this poor widow has put more into the treasury than all the others.'",
      propheticLink: "1 Samuel 16:7 — 'Man looks at the outward appearance, but the LORD looks at the heart.' The widow's offering is the practical demonstration of everything Jesus had been teaching against the religious leaders' showy piety. She gave all she had (100%); the wealthy gave from their surplus.",
      bibleRefs: [
        { ref: "Mark 12:41-44", link: "mark_124144" }
      ],
      propheticRefs: [
        { ref: "Samuel 16:7", link: "samuel_167" }
      ],
      investigatorNote: "The widow's two coins appear after the Seven Woes against the Pharisees (Matthew 23). Jesus used her as a living counter-example: this is what genuine faith looks like, next to the performance the religious leaders were offering.",
      fake: false,
      category: 'people',
      timelineOrder: 6,
      clues: {
        compare: "Pairs with the denarius of Caesar to contrast ostentatious legalism with sacrificial faith.",
        link: "People — two tiny leptons deposited by a poor widow in the Temple treasury.",
        timeline: "CHRONOLOGY: Observed late Tuesday afternoon near the Treasury chests.",
        contradict: "RELIABILITY: Confirmed by Jesus's direct commendation in front of the disciples."
      }
    },

    {
      id: "witness_scroll",
      name: "Temple Bystander's Written Account",
      type: "testimonial",
      relatedProphecy: "",
      icon: "../assets/gfx/clipboard-duotone.svg",
      location: "Temple North Portico",
      pos: [-15, 0, -5],
      snippet: "A detailed testimonial from a visitor from Alexandria.",
      description: "A written eyewitness account from a devout Jew who was present: 'He answered every question. The Pharisees about taxes. The Sadducees about resurrection. The scribes about the Law. At the end, He asked them whose son is the Christ — and not one of them could answer. Then no man dared question him again.' Signed: 'A God-fearer from Alexandria.'",
      bibleRef: "Matthew 22:46 — 'No one could say a word in reply, and from that day on no one dared to ask him any more questions.'",
      propheticLink: "Isaiah 11:2 promised the Messiah would have the 'Spirit of wisdom and understanding, the Spirit of counsel and might' — He would answer every challenge with perfect insight. The progressive silencing of each religious faction across one morning is the fulfilment of this promise made 700 years earlier. Daniel 7:13–14 foretold 'one like a son of man' coming with the clouds of heaven to receive an everlasting dominion — the title 'Son of Man' Jesus used for Himself throughout these exchanges.",
      bibleRefs: [
        { ref: "Matthew 22:46", link: "matthew_2246" }
      ],
      propheticRefs: [
        { ref: "Isaiah 11:2", link: "isaiah_112" },
        { ref: "Daniel 7:13-14", link: "daniel_71314" }
      ],
      investigatorNote: "The witness is from Alexandria — an educated diaspora Jew well-versed in both Scripture and rhetoric. His assessment is clear: Jesus did not evade their questions. He answered them and won.",
      fake: false,
      category: 'event',
      timelineOrder: 7,
      clues: {
        compare: "Summarizes the total defeat of all three religious factions across the day's debates.",
        link: "Event — eyewitness written testimony from an Alexandrian pilgrim recording the exchanges.",
        timeline: "CHRONOLOGY: Recorded at the conclusion of Tuesday's public teaching sessions.",
        contradict: "RELIABILITY: Independent third-party account confirming no one dared question Him further."
      }
    }
  ],

  lab: [
    {
      evidence: "parable_fragments",
      suspect: "scribe",
      result: "**Identified as Witness** (His record implicates the priests)",
      notes: "The tenants who kill the son (Mark 12:1-9) — even Samuel's own notes read as an indictment of the men he serves."
    },
    {
      evidence: "question_scroll",
      suspect: "chief_priest",
      result: "**Implicated by Parable** (The teaching was aimed at him)",
      notes: "'They knew he had spoken the parable against them' (Mark 12:12). Caiaphas heard the accusation and couldn't answer it."
    }
  ],

  npcs: [
    {
      id: "chief_priest",
      name: "Caiaphas",
      role: "High Priest, Sadducee",
      avatar: "caiaphas.svg",
      pos: [15, 0, 5],
      unlocksSuspects: ["chief_priest"],
      hasDialogue: true,
      storyFile: "chief_priest",
      profileFile: "caiaphas",
      truthfulness: 0.55,
      bibleRef: "Matthew 21:23; John 11:49–52; Matthew 26:57–68",
      background: "Joseph ben Caiaphas has been High Priest since AD 18 — appointed by the Roman prefect, dependent on Roman goodwill to remain in office. He is theologically Sadducean (denies resurrection, angels, and spirits — Acts 23:8) and politically calculating. He famously said it was 'better for one man to die for the people than for the whole nation to perish' (John 11:50) — not realising he was prophesying.",
      dialogue: {
        neutral: "The Temple is the domain of the priesthood. Any teacher claiming this level of authority has an obligation to present credentials.",
        cautious: "The Temple is the domain of the priesthood, established by Mosaic Law. Anyone teaching here is subject to our oversight.",
        pressured: "He answered our question with a question — typical rabbinic evasion. We could hardly say John's authority was from God or from men without a public spectacle.",
        exposed: "He trapped us. I'll admit it. If we said John was divine, He'd ask why we didn't believe him. If we said John was merely human, the crowd would stone us. We were paralysed.",
        repeat: "I have a council session to attend. This interview is concluded.",
      },
      reactions: {
        question_scroll: { text: "That is an official Temple challenge. Signed by three representatives of the Sanhedrin. This was procedure, not persecution.", isLie: false },
        parable_fragments: { text: "Those parables were deeply offensive. He compared us to tenants who murder the landowner's son. The crowd understood exactly what He meant.", isLie: false, revealedClue: "cornerstone_carving" },
        cornerstone_carving: { text: "He quoted Psalm 118:22 at us. In the Temple. He was calling us 'the builders who rejected the stone.' I found that stone fragment myself — I've kept it as a reminder.", isLie: true },
        widow_two_coins: { text: "The Temple treasury receives all offerings, large and small. I fail to see what a widow's coins have to do with our authority challenge.", isLie: false },
      },
      contradictions: {
        "question_scroll+witness_scroll": { exposed: "The witness from Alexandria is correct. No one could answer His final question. He asked us who the Christ is — is He David's son or David's Lord? Psalm 110:1 says David called him 'my Lord.' How can He be both son and Lord? We had no answer. We still don't." },
      },
    },
    {
      id: "scribe",
      name: "Samuel",
      role: "Temple Scribe, Pharisee",
      avatar: "samuel_scribe.svg",
      pos: [-15, 0, 10],
      unlocksSuspects: ["scribe"],
      hasDialogue: true,
      storyFile: "scribe_intro",
      profileFile: "samuel_scribe",
      revealsProphecy: "isaiah_5_1_7",
      truthfulness: 0.85,
      bibleRef: "Mark 12:28–34",
      background: "A Temple scribe trained in meticulous recording of legal proceedings and scriptural interpretation. Pharisaic background — unlike the Sadducean priests, he believes in resurrection and angels. He asked Jesus about the greatest commandment and received an answer that genuinely moved him.",
      dialogue: {
        neutral: "I came to hear a fanatic. I listened to a master of the Law.",
        cautious: "His command of Scripture is unmatched. When He quoted Deuteronomy 6:4–5 and Leviticus 19:18, He summed up all 613 commandments in two sentences.",
        pressured: "The chief priests were trying to trap Him. But He turned every question back on them until they were silent.",
        exposed: "He told me I was 'not far from the kingdom of God.' Those words have stayed with me all day.",
        repeat: "I am pondering what was spoken today.",
      },
      reactions: {
        parable_fragments: { text: "I recorded those sketches myself as He spoke. The reference to Isaiah 5 was unmistakable. He was accusing the Sanhedrin of killing God's prophets.", isLie: false },
        cornerstone_carving: { text: "Psalm 118:22. Every scribe knows it. But applying it to Himself in front of the High Priest... that took courage I have never seen in this city.", isLie: false },
      },
      contradictions: {},
    }
  ],

  deductions: {
    "question_scroll+parable_fragments": {
      compare: {
        text: "The chief priests came to question Jesus's authority. Jesus responded not with an argument, but with the Parable of the Wicked Tenants — exposing that they were rejecting God's authority.",
        insight: "Instead of defending His credentials to men who lacked spiritual authority, Jesus delivered a parabolic judgement showing they were unfaithful stewards of God's vineyard.",
        isKey: true,
        bibleRef: "Matthew 21:23–46",
      },
      link: {
        text: "The official challenge scroll and the parable sketch document the exact turning point of Tuesday morning: from religious leaders questioning Jesus to Jesus judging the religious leaders.",
        insight: "The authority challenge backfired completely, shifting public initiative to Jesus.",
        isKey: true,
        bibleRef: "Matthew 21:27–33",
      }
    },
    "parable_fragments+cornerstone_carving": {
      link: {
        text: "The Parable of the Wicked Tenants ends with the murder of the owner's son. Immediately following, Jesus quoted Psalm 118:22 — the stone rejected by the builders becoming the cornerstone.",
        insight: "The stone and the son are the same figure: Jesus Himself. His upcoming rejection by the leaders was predicted in Scripture and would result in God giving the kingdom to others.",
        isKey: true,
        bibleRef: "Matthew 21:42; Psalm 118:22",
      }
    },
    "coin_of_caesar+widow_two_coins": {
      compare: {
        text: "The Roman denarius represented financial allegiance to Caesar; the widow's two leptons represented complete heart-devotion to God.",
        insight: "Jesus contrasted political traps about taxation with genuine spiritual sacrifice. Caesar receives metal bearing his image; God receives hearts bearing His image.",
        isKey: true,
        bibleRef: "Matthew 22:15–22; Mark 12:41–44",
      }
    }
  },

  truth: {
    culprit: "caiaphas",
    motive: "Caiaphas and the priestly establishment sought to preserve their political monopoly and institutional power under Roman rule, fearing Jesus's public teaching threatened their authority.",
    method: "A coordinated delegation of chief priests, scribes, Pharisees, and Sadducees mounted sequential public challenges against Jesus in the Temple courts. Jesus dismantled every trap, turned their questions back upon their hypocritical motives, and silenced them entirely.",
    lesson: "True authority in the kingdom of God does not derive from earthly position, political alliances, or religious office, but from divine commission and total obedience to God's truth. Those who reject the Cornerstone will find themselves displaced by God's unfolding plan.",
    prophesyFulfilled: ["Psalm 118:22–23", "Isaiah 5:1–7", "Daniel 7:13–14", "Malachi 3:1"],
    furtherReading: ["Matthew 21:23–22:46", "Mark 11:27–12:44", "Luke 20:1–21:4"],
  }
};