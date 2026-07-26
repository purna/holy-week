// ============================================================
// CASE: The Empty Tomb — difficulty 4 — Garden Tomb, Jerusalem
// ACT: Act IV
// CASE EXPORT: act4CaseA (id: "empty_tomb")
// ============================================================

export const act4CaseA = {
  id: "empty_tomb",
  title: "The Empty Tomb",
  subtitle: "A broken Roman seal, an empty stone slab, and undisturbed grave clothes — did disciples steal the body, or did death lose its sting?",
  location: "garden_tomb",
  eventLocation: "Garden Tomb, North of Jerusalem",
  timeOfDay: "dawn",
  difficulty: 4,
  requires: "pilate_verdict",
  actLabel: "Act IV",
  color: 0x10b981,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Resurrection Investigation", task: "Collect all evidence", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `At dawn on Sunday morning (Nisan 16), Mary Magdalene and other women brought spices to the tomb of Jesus. They found the heavy stone rolled back, the Roman seal shattered, and the tomb empty. Inside, the linen burial wrappings were lying flat where the body had been, with the face cloth folded separately. An angel announced His resurrection, and Jesus subsequently appeared alive to Mary, the disciples, and over 500 witnesses, vindicating His divine claims and triumphing over death.`,
    significance: `The Resurrection is the supreme historical pivot of the Christian faith. It validates Jesus's identity as the divine Son of God (Romans 1:4), confirms the sufficiency of His atonement on the cross, and fulfills centuries of Messianic prophecy. Without the empty tomb, apostolic preaching would be in vain, but His victory over death guarantees eternal life to all believers.`,
    historicalNote: `Under Roman law, breaking a governor's seal carried an immediate death penalty, and sleeping on guard duty resulted in execution for entire soldier squads. The Sanhedrin's subsequent bribery of the Roman guard post (Matthew 28:11–15) reveals an official cover-up effort to suppress the news of the empty tomb rather than producing a body.`,
  },

  prophecies: [
    {
      reference: "Psalm 16:10",
      id: "psalm_16_10",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"Because you will not abandon me to the realm of the dead, nor will you let your faithful one see decay."`,
      written: "~1000 BC",
      fulfilledBy: "Jesus rising bodily from the dead on the third day before physical decomposition could begin",
      gospelLink: "Acts 2:27–31; Acts 13:35–37; Luke 24:6–7",
      insight: "King David died and saw decay in his tomb, but Peter argued at Pentecost that David was speaking prophetically of the Messiah, whose flesh saw no corruption.",
      explanation: "The intact empty shroud and rapid third-day resurrection directly fulfilled Psalm 16:10.",
    },
    {
      reference: "Hosea 6:2 / Jonah 1:17",
      id: "hosea_6_2_jonah",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"After two days he will revive us; on the third day he will restore us... For as Jonah was three days and three nights in the belly of a huge fish..."`,
      written: "~750 BC / ~780 BC",
      fulfilledBy: "Jesus remaining in the heart of the earth from Friday evening until Sunday dawn before rising",
      gospelLink: "Matthew 12:40; 1 Corinthians 15:4",
      insight: "Jesus called the 'Sign of Jonah' the only sign given to an unbelieving generation, predicting His precise three-day timeline in the tomb.",
      explanation: "The Sunday dawn discovery matched the exact third-day timeline prophesied throughout the Old Testament.",
    },
    {
      reference: "Isaiah 53:9",
      id: "isaiah_53_9",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"He was assigned a grave with the wicked, and with the rich in his death, though he had done no violence."`,
      written: "~700 BC",
      fulfilledBy: "Jesus being crucified between two criminals yet buried in the private rock tomb of Joseph of Arimathea",
      gospelLink: "Matthew 27:57–60; Mark 15:43–46",
      insight: "Executed criminals were normally thrown into common trench graves, but divine providence arranged for Jesus to be laid in a rich Sanhedrin member's newly hewn tomb.",
      explanation: "Isaiah foresaw both the criminal execution setting and the wealthy burial place 700 years prior.",
    },
    {
      reference: "Psalm 22:18",
      id: "psalm_22_18",
      icon: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>",
      text: `"They divide my clothes among them and cast lots for my garment."`,
      written: "~1000 BC",
      fulfilledBy: "Roman soldiers gambling for Jesus's seamless tunic at the foot of the cross before His burial",
      gospelLink: "John 19:23–24; Matthew 27:35",
      insight: "Roman executioners typically split a prisoner's garments. The seamless woven tunic was left whole and decided by rolling dice, fulfilling Psalm 22 down to the detail.",
      explanation: "David described execution details centuries before crucifixion was invented by Persians and Romans.",
    }
  ],

  intro: formatIntro(`It is dawn on Sunday morning, Nisan 16. The morning mist hovers over the garden tomb near Golgotha. The massive circular stone sealing the entrance lies rolled back, its Roman imperial seal shattered into clay fragments. Inside, the stone slab where the body lay is empty — but the linen burial wrappings lie completely intact, flat, and undisturbed, with the headpiece folded neatly nearby. Roman soldiers have fled into the city, while rumor spreads that the Sanhedrin is bribing guards to claim the disciples stole the body. Step inside the empty tomb to evaluate the physical evidence.`),

  suspects: [
    { id: "mary_magdalene", name: "Mary Magdalene", role: "Devout Follower & First Witness", avatar: "mary_magdalene.svg", bibleRef: "John 20:1–2, 11–18; Mark 16:9" },
    { id: "roman_guard", name: "Garrison Guard", role: "Roman Tomb Security Guard", avatar: "roman_soldier.svg", bibleRef: "Matthew 28:2–4, 11–15" },
    { id: "joseph_arimathea", name: "Joseph of Arimathea", role: "Sanhedrin Member & Tomb Owner", avatar: "joseph_arimathea.svg", bibleRef: "Matthew 27:57–60; John 19:38" },
    { id: "none", name: "No One (Risen Christ)", role: "Resurrected Messiah", avatar: "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'>", bibleRef: "Luke 24:5–6; Revelation 1:18" },
  ],

  evidencePool: [
    {
      id: "folded_grave_clothes",
      name: "Undisturbed Linen Burial Wrappings",
      type: "physical",
      relatedProphecy: "psalm_16_10",
      icon: "../assets/gfx/linen-duotone.svg",
      location: "Burial Slab",
      pos: [0, 0, -2],
      snippet: "Fine linen strips lying flat and intact without the body inside.",
      description: "The fine linen wrappings impregnated with myrrh and aloes lie collapsed flat on the stone bench. Grave robbers or thieves stealing a body would never unwrap seventy pounds of sticky spiced linen or leave the cloth intact.",
      bibleRef: "John 20:6–7 — 'He saw the strips of linen lying there, as well as the cloth that had been wrapped around Jesus' head.'",
      propheticLink: "Psalm 16:10 promised that God's Holy One would not see decay. The physical shroud remained behind without signs of tearing or decay.",
      bibleRefs: [
        { ref: "John 20:6-7", link: "john_2067" },
        { ref: "Psalm 16:10", link: "psalm_1610" }
      ],
      propheticRefs: [
        { ref: "Psalm 16:10", link: "psalm_1610" }
      ],
      investigatorNote: "The shroud lies like an empty cocoon. The body emerged without disturbing the wrapping bonds.",
      fake: false,
      category: 'event',
      timelineOrder: 1,
      clues: {
        compare: "Pairs with the face cloth napkin to disprove theft by tomb robbers or panicked disciples.",
        link: "Event — physical evidence remaining inside the burial chamber.",
        timeline: "CHRONOLOGY: Discovered at dawn on Sunday morning by Mary Magdalene, Peter, and John.",
        contradict: "RELIABILITY: Intact linen wrappings contradict the theft narrative, as robbers would not unwrap a body."
      }
    },

    {
      id: "face_cloth_napkin",
      name: "Folded Headpiece (Sudarium)",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/cloth-duotone.svg",
      location: "Burial Niche Corner",
      pos: [3, 0, -4],
      snippet: "A rolled linen napkin placed neatly in a separate spot on the stone.",
      description: "The face cloth (sudarium) that covered Jesus's head is rolled up neatly in a place by itself, separate from the body linens. This deliberate arrangement reflects calm order rather than grave robbery under cover of night.",
      bibleRef: "John 20:7 — 'The cloth was folded up by itself, separate from the linen.'",
      propheticLink: "Demonstrates deliberate order and divine composure over death, proving the event was controlled.",
      bibleRefs: [
        { ref: "John 20:7", link: "john_207" }
      ],
      propheticRefs: [],
      investigatorNote: "A folded headpiece demonstrates composure. Thieves operating under guard pressure do not stop to fold laundry.",
      fake: false,
      category: 'event',
      timelineOrder: 2,
      clues: {
        compare: "Pairs with the grave clothes to verify intentional order rather than hasty theft.",
        link: "Event — personal burial cloth folded neatly inside the tomb.",
        timeline: "CHRONOLOGY: Discovered alongside the body linens on Sunday morning.",
        contradict: "RELIABILITY: A neatly folded napkin disproves panic or grave robbery."
      }
    },

    {
      id: "broken_roman_seal",
      name: "Shattered Roman Clay Seal",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/shield-duotone.svg",
      location: "Tomb Entrance Threshold",
      pos: [-6, 0, 4],
      snippet: "Cracked clay fragments bearing the imperial stamp of Pontius Pilate.",
      description: "Clay seal fragments imprinted with Pilate's imperial insignia, previously fastened across the cord securing the rolling stone. Breaking this seal without governor authorization carried an immediate death penalty.",
      bibleRef: "Matthew 27:66 — 'So they went and made the tomb secure by putting a seal on the stone and posting the guard.'",
      propheticLink: "Human political empire attempted to seal the Lord of Life in death, but divine power shattered earth's authority.",
      bibleRefs: [
        { ref: "Matthew 27:66", link: "matthew_2766" },
        { ref: "Matthew 28:2", link: "matthew_282" }
      ],
      propheticRefs: [],
      investigatorNote: "The Roman seal was broken from the inside out when the stone was moved, risking execution for anyone responsible.",
      fake: false,
      category: 'event',
      timelineOrder: 3,
      clues: {
        compare: "Pairs with the guards' bribe pouch to demonstrate the failure of physical force to secure the tomb.",
        link: "Event — legal security measure placed by Pilate's order.",
        timeline: "CHRONOLOGY: Affixed Friday afternoon, shattered prior to Sunday dawn.",
        contradict: "RELIABILITY: Proves official military oversight was active until supernatural intervention."
      }
    },

    {
      id: "dislodged_tomb_stone",
      name: "Rolled-Back Circular Tomb Stone",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/rock-duotone.svg",
      location: "Tomb Entry Track",
      pos: [-10, 0, 10],
      snippet: "A multi-ton circular stone rolled uphill out of its locking groove.",
      description: "A massive circular stone weighing over two tons, dislodged from its downward-sloping trench and pushed up the incline away from the entrance. Moving this stone required the force of multiple strong men.",
      bibleRef: "Mark 16:3–4 — 'They asked each other, Who will roll the stone away from the entrance of the tomb? But when they looked up, they saw that the stone, which was very large, had been rolled away.'",
      propheticLink: "The stone was rolled away not to let Jesus out, but to let witnesses in to behold the empty tomb.",
      bibleRefs: [
        { ref: "Mark 16:3-4", link: "mark_1634" },
        { ref: "Matthew 28:2", link: "matthew_282" }
      ],
      propheticRefs: [],
      investigatorNote: "Pushed uphill out of its locking trough. Doing this silently in front of sleeping guards is physically impossible.",
      fake: false,
      category: 'event',
      timelineOrder: 4,
      clues: {
        compare: "Pairs with Mary Magdalene's testimony to explain how access to the empty tomb was opened.",
        link: "Event — physical barrier securing the entrance.",
        timeline: "CHRONOLOGY: Dislodged during the earthquake at dawn.",
        contradict: "RELIABILITY: The sheer weight of the stone rules out covert theft by grieving disciples."
      }
    },

    {
      id: "guards_bribe_pouch",
      name: "Sanhedrin Guard Bribe Purse",
      type: "physical",
      relatedProphecy: "",
      icon: "../assets/gfx/coins-duotone.svg",
      location: "Garrison Quarters, Antonia Fortress",
      pos: [14, 0, -6],
      snippet: "A heavy pouch of silver coins paid to soldiers to spread the theft rumor.",
      description: "A leather pouch containing large sums of silver money paid by the chief priests to the Roman guards stationed at the tomb, instructing them to lie and say: 'His disciples came by night and stole Him away while we slept.'",
      bibleRef: "Matthew 28:12–13 — 'When the chief priests had met with the elders and devised a plan, they gave the soldiers a large sum of money, telling them, You are to say, His disciples came by night...'",
      propheticLink: "Fulfills Psalm 2:2 — rulers conspiring together against the Lord and His Anointed, resorting to bribery to suppress truth.",
      bibleRefs: [
        { ref: "Matthew 28:12-13", link: "matthew_281213" },
        { ref: "Psalm 2:2", link: "psalm_22" }
      ],
      propheticRefs: [
        { ref: "Psalm 2:2", link: "psalm_22" }
      ],
      investigatorNote: "If guards were sleeping, they could not identify thieves. If they were awake, they would have prevented theft. The bribe bought silence.",
      fake: false,
      category: 'people',
      timelineOrder: 5,
      clues: {
        compare: "Pairs with the broken Roman seal to expose the conspiracy to cover up the empty tomb.",
        link: "People — bribe payment issued from the chief priests to the garrison guards.",
        timeline: "CHRONOLOGY: Paid Sunday morning after guards reported the empty tomb to priests.",
        contradict: "RELIABILITY: Exposes the official theft narrative as a paid disinformation campaign."
      }
    },

    {
      id: "psalm_16_scroll",
      name: "Psalm 16 Scroll Fragment",
      type: "analytical",
      relatedProphecy: "psalm_16_10",
      icon: "../assets/gfx/star-duotone.svg",
      location: "Apostolic Gathering Room",
      pos: [8, 0, 12],
      snippet: "An ancient psalm text declaring that God's Holy One will not see corruption.",
      description: "A scroll fragment of Psalm 16:10 studied by the apostles following the resurrection, establishing that David foretold the bodily resurrection of the Messiah without decay.",
      bibleRef: "Acts 2:31 — 'Seeing what was to come, he spoke of the resurrection of the Messiah, that he was not abandoned to the realm of the dead, nor did his body see decay.'",
      propheticLink: "Direct prophetic promise that Messiah's body would overcome the grave prior to physical decomposition.",
      bibleRefs: [
        { ref: "Acts 2:31", link: "acts_231" },
        { ref: "Psalm 16:10", link: "psalm_1610" }
      ],
      propheticRefs: [
        { ref: "Psalm 16:10", link: "psalm_1610" }
      ],
      investigatorNote: "Penned 1000 years earlier by David, fulfilled on the third day in Arimathea's tomb.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 6,
      clues: {
        compare: "Pairs with the folded grave clothes to prove prophetic fulfillment in physical detail.",
        link: "Prophecy — Messianic promise of bodily victory over decay.",
        timeline: "CHRONOLOGY: Written ~1000 BC, cited during Pentecost as proof.",
        contradict: "RELIABILITY: The absence of a rotting body confirms David's prophecy."
      }
    },

    {
      id: "isaiah_53_tomb_scroll",
      name: "Isaiah 53 Scroll Fragment",
      type: "analytical",
      relatedProphecy: "isaiah_53_9",
      icon: "../assets/gfx/scroll-duotone.svg",
      location: "Temple Archive Annex",
      pos: [-14, 0, -10],
      snippet: "A prophecy fragment foretelling burial with the rich despite execution.",
      description: "A parchment scroll fragment of Isaiah 53:9 predicting that although the Servant was appointed to die with criminals, He would be assigned a grave with the rich in His death.",
      bibleRef: "Matthew 27:57–60 — 'As evening approached, there came a rich man from Arimathea, named Joseph... and placed Jesus' body in his own new tomb.'",
      propheticLink: "Fulfilled when Joseph of Arimathea, a wealthy Sanhedrin member, requested Jesus's body and laid Him in his costly private tomb.",
      bibleRefs: [
        { ref: "Matthew 27:57-60", link: "matthew_275760" },
        { ref: "Isaiah 53:9", link: "isaiah_539" }
      ],
      propheticRefs: [
        { ref: "Isaiah 53:9", link: "isaiah_539" }
      ],
      investigatorNote: "Explains how a crucified teacher ended up inside a high-status private rock-hewn tomb.",
      fake: false,
      category: 'prophecy',
      timelineOrder: 7,
      clues: {
        compare: "Pairs with Joseph of Arimathea's testimony to explain the tomb's provenance.",
        link: "Prophecy — Isaiah's prediction regarding the Servant's honorable burial place.",
        timeline: "CHRONOLOGY: Written ~700 BC, fulfilled Friday evening at Golgotha.",
        contradict: "RELIABILITY: Rules out a common criminal trench burial."
      }
    }
  ],

  lab: [
    {
      evidence: "folded_grave_clothes",
      suspect: "none",
      result: "**Corroborated** (Resurrection confirmed)",
      notes: "The undisturbed cocoon structure of the linens proves the physical body was resurrected rather than stolen or moved."
    },
    {
      evidence: "guards_bribe_pouch",
      suspect: "roman_guard",
      result: "**Exposed** (Paid cover-up confirmed)",
      notes: "Garrison soldiers accepted silver bribes from Sanhedrin officers to spread the claim that disciples stole the body."
    }
  ],

  npcs: [
    {
      id: "mary_magdalene",
      name: "Mary Magdalene",
      role: "Devout Follower & First Witness",
      avatar: "mary_magdalene.svg",
      pos: [6, 0, 4],
      unlocksSuspects: ["mary_magdalene"],
      hasDialogue: true,
      storyFile: "mary_tomb_account",
      profileFile: "mary_magdalene",
      truthfulness: 1.00,
      bibleRef: "John 20:1–2, 11–18; Mark 16:9",
      background: "Mary of Magdala, out of whom Jesus cast seven demons. She remained faithful at the cross, observed His burial, and came to the tomb early Sunday morning to apply burial spices. She was the first person to encounter the Risen Lord.",
      dialogue: {
        neutral: "I came while it was still dark to honor Him with spices.",
        cautious: "The stone was already rolled away. I thought someone had taken my Lord!",
        pressured: "I saw Him standing there! I thought He was the gardener until He called my name: 'Mary!'",
        exposed: "He is alive! Go tell His brothers that I have seen the Lord!",
        repeat: "I have seen the Lord! Death could not hold Him!",
      },
      reactions: {
        folded_grave_clothes: { text: "I ran to Peter and John when I saw the empty slab, but when we looked inside, the cloths were lying flat and untouched!", isLie: false },
        dislodged_tomb_stone: { text: "That stone was far too heavy for us women to move, yet when we arrived, the entrance stood wide open!", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "roman_guard",
      name: "Marcus",
      role: "Garrison Guard Officer",
      avatar: "roman_soldier.svg",
      pos: [-12, 0, -4],
      unlocksSuspects: ["roman_guard"],
      hasDialogue: true,
      storyFile: "roman_guard_report",
      profileFile: "roman_soldier",
      truthfulness: 0.30,
      bibleRef: "Matthew 28:2–4, 11–15",
      background: "A Roman legionnaire assigned to secure the tomb with the Temple guard force. After experiencing a sudden earthquake and an angelic appearance at dawn, the guards collapsed in terror and later reported the events to the chief priests.",
      dialogue: {
        neutral: "We maintained our watch as commanded by the governor.",
        cautious: "The night was quiet... until the earth shook at dawn.",
        pressured: "We... we fell asleep! Yes, His disciples came while we slept and took Him!",
        exposed: "How could we sleep through a multi-ton stone being rolled uphill? The priests paid us to say that! An angel descended like lightning, and we froze in terror!",
        repeat: "The priests guaranteed Pilate wouldn't execute us if we stuck to the theft story...",
      },
      reactions: {
        guards_bribe_pouch: { text: "Where did you get that pouch? The chief priests gave us those shekels to protect us from Pilate's execution order!", isLie: false },
        broken_roman_seal: { text: "That seal was intact until the earth shook and light flashed. No human hand broke it first!", isLie: false },
      },
      contradictions: {
        "guards_bribe_pouch+broken_roman_seal": { exposed: "Alright! We didn't sleep! The ground shook, a glowing messenger rolled back the stone, and we fell like dead men! The priests bribed us to cover it up!" },
      },
    }
  ],

  deductions: {
    "folded_grave_clothes+face_cloth_napkin": {
      compare: {
        text: "The intact burial wrappings and folded face cloth disprove grave robbery or theft by disciples.",
        insight: "Thieves do not unwrap seventy pounds of sticky spiced linen or take time to neatly fold a sudarium. The body resurrected through the wrappings.",
        isKey: true,
        bibleRef: "John 20:6–7",
      },
      link: {
        text: "Physical evidence inside the tomb confirms a calm, miraculous exit rather than violent body theft.",
        insight: "Demonstrates divine order and composure over death.",
        isKey: true,
        bibleRef: "Luke 24:12",
      }
    },
    "broken_roman_seal+guards_bribe_pouch": {
      compare: {
        text: "The shattered seal and silver bribe money expose the Sanhedrin's paid disinformation campaign.",
        insight: "The priests created the theft rumor to suppress news of the resurrection, buying off soldiers whose failure would otherwise mean execution.",
        isKey: true,
        bibleRef: "Matthew 28:12–15",
      }
    },
    "psalm_16_scroll+folded_grave_clothes": {
      compare: {
        text: "Psalm 16:10 foresaw that God's Holy One would not suffer decay, fulfilled by the third-day empty shroud.",
        insight: "Prophetic expectation matched physical evidence perfectly — Jesus rose bodily before physical decay began.",
        isKey: true,
        bibleRef: "Acts 2:27–31; Psalm 16:10",
      }
    }
  },

  truth: {
    culprit: "none",
    motive: "God raised Jesus from the dead to conquer sin and death, vindicating His divine claims, fulfilling Messianic prophecy, and offering eternal salvation.",
    method: "Supernatural resurrection on the third day; Jesus's physical body was glorified, leaving the wrappings flat, while an angel rolled away the heavy stone to reveal the empty tomb to witnesses.",
    lesson: "The empty tomb is the historical cornerstone of Christian faith — proving that Jesus is the Son of God, death is defeated, and His promises are true.",
    prophesyFulfilled: ["Psalm 16:10", "Hosea 6:2 / Jonah 1:17", "Isaiah 53:9", "Psalm 22:18"],
    furtherReading: ["Matthew 28:1–20", "Mark 16:1–8", "Luke 24:1–53", "John 20:1–31", "1 Corinthians 15:1–20"],
  }
};