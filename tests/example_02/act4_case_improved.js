
// ============================================================
// CASE: The Night Court  — difficulty 4 — Sanhedrin Trial
// BIBLICAL FOCUS: Matthew 26:57–68, Mark 14:53–65, Luke 22:54–71, John 18:12–24
// PROPHECY: Isaiah 53:7–8 | Psalm 27:12 | Daniel 7:13–14
// ============================================================

export const act4CaseA = {
  id: "sanhedrin_trial",
  title: "The Night Court",
  subtitle: "A capital trial was convened in secret at midnight — every legal rule was broken. But was the verdict predetermined?",
  location: "sanhedrin",
  difficulty: 4,
  requires: "bethany_anointing",
  actLabel: "Act IV",
  color: 0xf87171,
  quest: { name: "Trial Investigation", task: "Expose the procedural violations", cur: 0, tar: 8 },

  biblicalContext: {
    summary: `After the arrest at Gethsemane, Jesus was taken first to Annas (the former High Priest and real power behind the priesthood), then to the house of Caiaphas the High Priest, where the Sanhedrin had gathered in the middle of the night. The Sanhedrin was the highest Jewish court — 70 elders plus the High Priest. They assembled to try Jesus on charges of blasphemy. The proceedings violated nearly every rule of Jewish capital law: it was held at night, during Passover, in the High Priest's private house rather than the Hall of Hewn Stones. False witnesses were called. Their testimonies didn't agree. Caiaphas finally demanded Jesus answer under oath whether He was the Messiah — and Jesus responded with a direct quote from Daniel 7:13, identifying Himself as the Son of Man coming on the clouds of heaven. The High Priest tore his robes. The council condemned Jesus to death.`,
    significance: `The Mishnah (codified around AD 200, but reflecting older oral traditions) lists specific rules for Jewish capital trials: they must be held during daylight hours, not during Passover or Sabbath, not in a private home, and a conviction could not be reached on the day of the trial. The night session violated all of these. The irony is total: the court charged with protecting God's law dismantled it to execute the one it claimed to protect. More significantly, Jesus's answer was not evasion — He directly and publicly claimed to be the Messiah, the Son of God, and the Son of Man from Daniel 7. The High Priest's tearing of his robes was the traditional mourning response to blasphemy.`,
    historicalNote: `Caiaphas had served as High Priest since AD 18 — an unusually long tenure made possible by careful collaboration with Rome. His father-in-law Annas had been High Priest before him and still wielded enormous informal power. The priestly family of Annas controlled the Temple treasury and the profitable moneychanging operations that Jesus had disrupted earlier that week. They had both political and financial reasons to remove Him. John's Gospel records the preliminary hearing before Annas (John 18:12–24) — the informal intelligence-gathering before the formal (illegal) court convened at Caiaphas's house.`,
  },

  prophecies: [
    {
      reference: "Isaiah 53:7–8",
      text: `"He was oppressed, and he was afflicted, yet he opened not his mouth; like a lamb that is led to the slaughter... By oppression and judgment he was taken away."`,
      written: "~700 BC",
      fulfilledBy: "Jesus remaining largely silent before His accusers during the Sanhedrin trial",
      gospelLink: "Matthew 26:63 — 'But Jesus remained silent'; Acts 8:32–35 — Philip identifies this passage as describing Jesus",
      insight: "The Servant is described as silent before His oppressors — yet He does speak once, at the critical moment when asked under oath about His identity. His silence before false witnesses fulfils Isaiah 53:7; His one decisive answer fulfils Daniel 7:13. The silence was strategic, not fearful.",
    },
    {
      reference: "Psalm 27:12",
      text: `"Give me not up to the will of my adversaries; for false witnesses have risen against me, and they breathe out violence."`,
      written: "~1000 BC",
      fulfilledBy: "The Sanhedrin's failed use of false witnesses whose testimonies contradicted each other",
      gospelLink: "Matthew 26:59–60 — 'The chief priests and the whole council were seeking false testimony... but they found none, though many false witnesses came forward'",
      insight: "Both Matthew and Mark record that the false witnesses failed — they contradicted each other. Under Jewish law, contradictory testimony was immediately invalid. The Psalm's plea against false witnesses became the precise legal reality Jesus faced. The court that condemned Him couldn't even fabricate a consistent charge.",
    },
    {
      reference: "Daniel 7:13–14",
      text: `"There before me was one like a son of man, coming with the clouds of heaven... He was given authority, glory and sovereign power; all nations and peoples of every language worshipped him."`,
      written: "~550 BC",
      fulfilledBy: "Jesus quoting Daniel 7:13 directly to the High Priest when asked under oath if He was the Christ",
      gospelLink: "Mark 14:62 — 'I am, and you will see the Son of Man seated at the right hand of Power, and coming with the clouds of heaven'",
      insight: "Daniel's 'Son of Man' figure is not a humble title — it describes a cosmic, divine figure receiving universal worship and eternal dominion from the Ancient of Days. When Jesus quoted this to the Sanhedrin, they understood exactly what He was claiming. The High Priest didn't tear his robes because Jesus was unclear. He tore them because Jesus was perfectly clear.",
    },
    {
      reference: "Micah 5:1",
      text: `"They will strike Israel's ruler on the cheek with a rod."`,
      written: "~700 BC",
      fulfilledBy: "Jesus being struck in the face before the High Priest by temple guards",
      gospelLink: "John 18:22 — 'one of the officers standing by struck Jesus with his hand'; Mark 14:65",
      insight: "Micah 5:1 immediately follows the Bethlehem prophecy about the ruler born in Bethlehem (Micah 5:2). The same passage that pinpoints His birthplace predicts He will be struck before His accusers — two details about the same person, seven centuries before the events.",
    },
  ],

  intro: `It is now past midnight on Friday. You have tracked the arrest party from Gethsemane into the city. Jesus has been taken to the house of Caiaphas the High Priest, where an emergency session of the Sanhedrin is already assembling — in the middle of the night, during Passover week. This is illegal under at least four provisions of Jewish capital trial law. You manage to position yourself in the outer courtyard. From your vantage point and the accounts of two witnesses inside, you begin to reconstruct what happened in that room. The evidence is clear on one point: this was not a trial searching for truth. But what exactly happened, and can you prove the verdict was predetermined?`,

  suspects: [
    { id: "caiaphas", name: "Caiaphas", role: "High Priest, Trial Presiding Judge", avatar: "👨‍⚖️", bibleRef: "Matthew 26:57–68; John 11:49–52; John 18:14" },
    { id: "annas", name: "Annas", role: "Former High Priest, Patriarch, Preliminary Interrogator", avatar: "👴", bibleRef: "John 18:12–24; Luke 3:2" },
    { id: "witness_eli", name: "Eli", role: "False Witness, Hired Testimony", avatar: "🧔", bibleRef: "Matthew 26:60–61 — unnamed false witnesses" },
  ],

  evidencePool: [
    {
      id: "midnight_summons",
      name: "Emergency Council Summons Tablet",
      type: "physical",
      icon: "📋",
      location: "Temple Administrative Office, High Priest's Gate",
      desc: "A clay tablet bearing the seal of the High Priest's administrative office, sent to Sanhedrin members ordering them to assemble at Caiaphas's private residence 'before the third watch of the night.' Dated to Thursday of Passover week.",
      bibleRef: "Matthew 26:57 — 'Those who had seized Jesus led him to Caiaphas the high priest, where the scribes and the elders had gathered.'",
      propheticLink: "Psalm 2:2 — 'The kings of the earth set themselves, and the rulers take counsel together, against the LORD and against his anointed.' The night assembly is itself a fulfilment of this Psalm's description of human rulers conspiring against the Messiah.",
      investigatorNote: "Jewish capital trials were legally required to be held in the Hall of Hewn Stones inside the Temple complex, not in a private house. This summons was issued to a private address. The violation was deliberate — the Temple courts closed at night.",
    },
    {
      id: "witness_contradictions",
      name: "Contradicted False Witness Statements",
      type: "analytical",
      icon: "📄",
      location: "Council Secretary's Writing Table, Caiaphas's House",
      desc: "Two written statements from prosecution witnesses, side by side. One reads: 'I heard him say he would destroy the Temple and rebuild it in three days.' The other reads: 'He said he was able to destroy the Temple and rebuild it in three days.' Under Jewish law, contradictory testimony is automatically invalid — both witnesses are disqualified.",
      bibleRef: "Mark 14:56–59 — 'For many bore false witness against him, but their testimony did not agree.'",
      propheticLink: "Deuteronomy 19:15–21 established the law of two witnesses: testimony required two consistent, independent accounts. Contradictory witnesses were to be punished with the same penalty they sought to impose on the accused. The prosecution's own witnesses condemned the prosecution under the very law they claimed to uphold.",
      investigatorNote: "The discrepancy between 'I heard him say' and 'he said he was able' is legally fatal under Mishnaic trial standards. Yet the court pressed forward. They needed a charge — any charge. This tells us the verdict was not waiting on evidence.",
    },
    {
      id: "oath_question",
      name: "Record of the Oath-Compelled Question",
      type: "analytical",
      icon: "🔖",
      location: "Scribe's Minutes of the Night Session",
      desc: "A written record of the decisive exchange: Caiaphas: 'I adjure you by the living God, tell us if you are the Christ, the Son of God.' Jesus: 'You have said so. But I tell you, from now on you will see the Son of Man seated at the right hand of Power and coming on the clouds of heaven.' Reaction: High Priest tears his robes; council votes death.",
      bibleRef: "Matthew 26:63–65; Mark 14:61–64",
      propheticLink: "Daniel 7:13–14 — the Son of Man coming on clouds of heaven. Jesus was not simply claiming to be a teacher or prophet. He quoted the highest Messianic and divine designation in all of Jewish Scripture directly at the High Priest. The council understood it. That is why they convicted him.",
      investigatorNote: "The High Priest placed Jesus under a binding oath — 'I adjure you by the living God.' This legally obligated a truthful answer. Jesus answered. His answer was the only moment of truthful, legally-binding testimony in the entire proceeding. The court called it blasphemy. The investigator notes it as a claim — one that either validates or invalidates everything else in this file.",
    },
    {
      id: "torn_robe_fragment",
      name: "Fragment of the High Priest's Robe",
      type: "physical",
      icon: "👘",
      location: "Council Chamber Floor, Caiaphas's House",
      desc: "A torn strip of fine priestly linen — the distinctive blue-purple colour of the High Priest's ceremonial garment. It was torn during the session and left on the floor. The tear is consistent with the traditional mourning gesture performed upon hearing blasphemy.",
      bibleRef: "Matthew 26:65 — 'Then the high priest tore his robes and said, He has uttered blasphemy.'",
      propheticLink: "Leviticus 21:10 explicitly forbids the High Priest from tearing his robes: 'He who is the high priest among his brothers... shall not tear his clothes.' By performing the traditional blasphemy-mourning gesture, Caiaphas violated Levitical law — the very law he claimed to defend. The courtroom irony collapses the entire proceeding.",
      investigatorNote: "Leviticus 21:10 is unambiguous: the High Priest is prohibited from this act under any circumstances. Either Caiaphas forgot his own law in the heat of the moment — or he was performing for the room, not acting from genuine religious conviction.",
    },
    {
      id: "peter_courtyard",
      name: "Servant Girl's Identification Account",
      type: "testimonial",
      icon: "🔥",
      location: "Outer Courtyard, Caiaphas's House — Near the Charcoal Fire",
      desc: "An account from a servant girl who was warming herself by the fire in the outer courtyard: 'One of the disciples — the large one with the Galilean accent — was here three times. I identified him twice. The third time he swore and denied knowing the man entirely. Then the rooster crowed and he left, weeping openly.'",
      bibleRef: "Matthew 26:69–75; Mark 14:66–72; Luke 22:54–62; John 18:15–18, 25–27",
      propheticLink: "Zechariah 13:7 — 'Strike the shepherd, and the sheep will be scattered.' Jesus had quoted this prophecy to the disciples at the Last Supper, predicting their desertion (Matthew 26:31). Peter's three denials — including the oath 'I do not know the man' — fulfilled it precisely. But Jesus also said He would go before them to Galilee after His resurrection (Matthew 26:32). Even in the scattering, restoration was already planned.",
      investigatorNote: "Peter was inside the compound — this confirms that at least one disciple attempted to follow after the arrest. His three denials confirm the psychological reality of the night: even the most resolute follower buckled under social pressure. The rooster's crowing at dawn marks the time: the trial ran from midnight to dawn.",
    },
    {
      id: "no_defense_counsel",
      name: "Absence of Defense Counsel Record",
      type: "analytical",
      icon: "⚖️",
      location: "Legal Archive, Hall of Hewn Stones (Cross-Reference)",
      desc: "A cross-reference check against standard Sanhedrin trial procedure reveals: no defense advocate was appointed, no witnesses for the defense were called, no adjournment was granted for the accused to prepare a response. The convicting vote was cast on the same night as the initial hearing — all three violations of standard capital trial law.",
      bibleRef: "Luke 22:66–71 — the formal morning session confirms that the night verdict was then ratified at dawn to create a legal document for Pilate",
      propheticLink: "Isaiah 53:8 — 'By oppression and judgment he was taken away.' The Hebrew can be translated 'without justice, without judgment he was taken away' — pointing to exactly these procedural violations. Seven centuries before the night court, Isaiah described it.",
      investigatorNote: "The morning session recorded in Luke 22:66–71 was not a second trial — it was a brief formalization of the night's conclusion designed to produce a legal instrument they could bring to Pilate. The real decision was made illegally at midnight. The dawn session was the paper trail.",
    },
  ],

  npcs: [
    {
      id: "caiaphas",
      name: "Caiaphas",
      avatar: "👨‍⚖️",
      truthfulness: 0.45,
      bibleRef: "Matthew 26:57–68; John 11:49–52",
      background: "Joseph ben Caiaphas has been High Priest since AD 18. His survival in office for nearly two decades under three Roman prefects demonstrates exceptional political skill. Earlier in the week, he told the council: 'It is better for one man to die for the people than for the whole nation to perish.' He convened this night session from his private house because the Temple courts were closed and he could not afford to wait until morning.",
      dialogue: {
        neutral: "The session was convened under emergency provisions. The threat to public order required immediate action.",
        cautious: "The charge of blasphemy was established when the accused made his own claims. We did not manufacture the accusation — he supplied it himself.",
        pressured: "The procedural irregularities you cite are a matter for rabbinic interpretation. The substance of the verdict is what matters.",
        exposed: "I will not debate the tactics with a scribe's apprentice. The man claimed to be the Son of God, seated at the right hand of the Almighty. That is either the most dangerous lie in the history of Israel — or it is true. And I have made my determination.",
        repeat: "This matter is before Rome now. Speak to Pilate.",
      },
      reactions: {
        midnight_summons: { text: "The summons was within my authority as High Priest. Emergency sessions have been convened before.", isLie: false },
        witness_contradictions: { text: "The testimony was sufficient to establish the nature of the claim being made. Precise wording is a secondary matter.", isLie: true },
        oath_question: { text: "I placed him under the most binding oath available under Jewish law. He answered. His own words condemned him.", isLie: false },
        torn_robe_fragment: { text: "The gesture was an expression of genuine religious distress at hearing the name of the Almighty invoked in blasphemy.", isLie: false },
      },
      contradictions: {
        "witness_contradictions+oath_question": { exposed: "The witnesses failed — yes. Their testimony would have been thrown out in any legitimate proceeding. That is why I asked the direct question under oath. I needed him to say it himself. And he did." },
      },
    },
    {
      id: "annas",
      name: "Annas",
      avatar: "👴",
      truthfulness: 0.6,
      bibleRef: "John 18:12–24; Luke 3:2; Acts 4:6",
      background: "Annas served as High Priest from AD 6 to 15 before being deposed by Rome, but continued to wield decisive influence — five of his sons and his son-in-law Caiaphas subsequently held the office. The Temple moneychanging operations that Jesus disrupted were administered under the Annas family network. He conducted the preliminary, informal interrogation of Jesus before the formal session.",
      dialogue: {
        neutral: "I asked him about his disciples and his teaching. Standard preliminary inquiry.",
        cautious: "Matters of judicial record are Caiaphas's responsibility. I simply spoke with the prisoner first.",
        pressured: "My interest is in the stability of the Temple and the preservation of this people under a difficult occupation. Everything I do serves that purpose.",
        exposed: "He told me to ask those who heard him teach — said everything he did was in public. One of the guards struck him for impertinence. He responded more calmly than any accused man I have ever interrogated in forty years.",
        repeat: "I am an old man. I have seen enough trials. Speak to my son-in-law.",
      },
      reactions: {
        midnight_summons: { text: "I was not at the night session formally. I had already concluded my preliminary discussion.", isLie: false },
        no_defense_counsel: { text: "Defense counsel in a blasphemy case is a theoretical provision. When a man condemns himself, the formality becomes moot.", isLie: true },
        torn_robe_fragment: { text: "Caiaphas has always been... expressive. I would not have torn my robes. But the reaction was genuine.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "witness_eli",
      name: "Eli",
      avatar: "🧔",
      truthfulness: 0.2,
      bibleRef: "Matthew 26:60–61; Mark 14:57–59",
      background: "Eli is a minor Temple functionary and occasional paid informant for the priestly administration. He was recruited to testify at the night session. He practiced his statement with a colleague before the hearing; the two versions ended up slightly different, making them legally useless. He is aware the testimony failed and is nervous about what happens to failed assets.",
      dialogue: {
        neutral: "I heard what I heard. I stated what I heard. That's the end of it.",
        cautious: "I was present on Tuesday in the Temple courts. He said things about the Temple. I reported accurately.",
        pressured: "My colleague and I spoke about what we both heard. We may have expressed it differently but the substance was identical.",
        exposed: "We used different words. I know that. They told me not to worry — that it wouldn't matter, that the High Priest had another plan. I don't know exactly what I walked into.",
        repeat: "I've already said too much. I'd like to go home.",
      },
      reactions: {
        witness_contradictions: { text: "My testimony and my colleague's testimony were substantively aligned. The phrasing differences are not material.", isLie: true },
        midnight_summons: { text: "I was told to be there before the second watch. I didn't ask questions. I was told it was an official proceeding.", isLie: false },
        oath_question: { text: "When the High Priest asked him directly — that changed the room. No one was watching me after that.", isLie: false },
      },
      contradictions: {
        "witness_contradictions+midnight_summons": { exposed: "They said if the first witnesses didn't work, the High Priest had a backup plan. They were right. I didn't know the backup was asking him directly. I feel like I was used as a distraction." },
      },
    },
  ],

  deductions: {
    "midnight_summons+no_defense_counsel": {
      link: {
        text: "The illegal timing of the summons and the complete absence of defense procedure together confirm that this was a predetermined outcome, not a genuine judicial process.",
        insight: "Jewish capital trials required daylight sessions, a minimum adjournment before conviction, and procedural defense rights. This session violated all three. The legal architecture was not being used to find truth — it was being used to produce a document. The verdict existed before the witnesses spoke.",
        isKey: true,
        bibleRef: "Isaiah 53:8; Matthew 26:59",
      },
    },
    "witness_contradictions+oath_question": {
      link: {
        text: "The failure of the false witnesses and Caiaphas's resort to a direct oath-compelled question form a two-act sequence that reveals the prosecution's own awareness that their evidence was insufficient.",
        insight: "If the witnesses had succeeded, Caiaphas would not have needed to ask the oath-compelled question. His decision to demand a direct answer under the most binding Jewish oath available proves that the false testimony failed — even by the court's own internal standards. He manufactured a conviction from the defendant's own truthful statement.",
        isKey: true,
        bibleRef: "Mark 14:56–62; Daniel 7:13–14",
      },
    },
    "torn_robe_fragment+no_defense_counsel": {
      compare: {
        text: "The torn robe violates Leviticus 21:10; the absent defense violates the standard trial procedure. The judge violated one law to convict a man accused of violating another law.",
        insight: "The entire trial is a study in institutional self-contradiction. The Sanhedrin, which existed to uphold God's law, broke God's law to condemn a man they accused of breaking God's law. The torn robe is physical evidence that the courtroom's moral authority had already destroyed itself.",
        isKey: false,
        bibleRef: "Leviticus 21:10; Matthew 26:65",
      },
    },
    "peter_courtyard+oath_question": {
      timeline: {
        text: "Peter's three denials in the outer court ran concurrently with the trial inside — the rooster crowed at dawn, marking the approximate end of both.",
        insight: "While Jesus was inside confessing His identity under oath — 'I am' — Peter was outside denying his. The two simultaneous scenes form a stark contrast: Jesus's silence was unbreakable until the truthful moment; Peter's courage collapsed at the question of a servant girl. Both were later restored. Neither story ends with this night.",
        isKey: false,
        bibleRef: "Mark 14:61–72; Zechariah 13:7",
      },
    },
  },

  truth: {
    culprit: "caiaphas",
    motive: "Caiaphas and the Sanhedrin needed to eliminate Jesus before the Passover feast ended — both to prevent a popular uprising that might invite Roman military intervention (destroying the Temple and their power base) and to remove the man whose growing authority directly threatened the priestly financial network built around Temple commerce.",
    method: "Caiaphas convened an emergency night session in his private house — four violations of Jewish capital trial law before a single word was spoken. False witnesses were brought in, but their contradictory testimonies rendered them legally useless. Caiaphas then placed Jesus under the most binding Jewish oath available, forcing Him to speak. Jesus answered directly and truthfully, quoting Daniel 7:13 — the most explicitly divine Messianic claim available in Jewish Scripture. Caiaphas used this truthful self-identification as the basis for a blasphemy conviction. He then tore his priestly robes — itself a violation of Leviticus 21:10 — declared the trial concluded, and arranged a brief morning ratification session to produce documentation for Pilate.",
    lesson: "The night court is a study in what happens when institutions designed to protect truth are used to suppress it. Every procedural law that existed to prevent false convictions was set aside. The one moment of genuine, truthful, oath-sworn testimony in the entire proceeding — Jesus's own answer — became the instrument of His condemnation. The verdict was written before the session opened. What Jesus said under oath was either the most dangerous claim ever made in a courtroom, or the most important truth ever spoken in one.",
    prophesyFulfilled: ["Isaiah 53:7–8", "Psalm 27:12", "Daniel 7:13–14", "Micah 5:1", "Psalm 2:2"],
    furtherReading: ["Matthew 26:57–75", "Mark 14:53–72", "Luke 22:54–71", "John 18:12–27"],
  },
};


// ============================================================
// CASE: The Three Hours of Darkness  — difficulty 4 — Golgotha
// BIBLICAL FOCUS: Matthew 27:33–54, Mark 15:22–39, Luke 23:33–47, John 19:16–30
// PROPHECY: Psalm 22 | Amos 8:9 | Isaiah 53:3–12 | Exodus 12:46
// ============================================================

export const act4CaseB = {
  id: "crucifixion_darkness",
  title: "The Three Hours of Darkness",
  subtitle: "From noon to 3pm, the sky went dark over Jerusalem. The Temple veil tore in two. A Roman soldier declared what the Sanhedrin refused to say.",
  location: "golgotha",
  difficulty: 4,
  requires: "sanhedrin_trial",
  actLabel: "Act IV",
  color: 0xf87171,
  quest: { name: "Golgotha Investigation", task: "Document the full sequence of evidence", cur: 0, tar: 8 },

  biblicalContext: {
    summary: `Jesus was crucified at Golgotha ('Place of the Skull') outside Jerusalem's walls at approximately the third hour (9 AM). He was crucified between two criminals. The charge written on the titulus above His head read: 'The King of the Jews.' From the sixth hour (noon) until the ninth hour (3 PM), darkness covered the land. At the ninth hour, Jesus cried out: 'Eli, Eli, lema sabachthani?' — 'My God, my God, why have you forsaken me?' (the opening of Psalm 22). He then declared 'It is finished' and died. At that moment: the Temple veil was torn from top to bottom, an earthquake shook Jerusalem, tombs broke open, and the Roman centurion who oversaw the execution declared: 'Truly this was the Son of God.'`,
    significance: `The six hours on the cross were a cascade of fulfilled prophecies so dense that early Christians pointed to Psalm 22 as the definitive evidence. Jesus quoted its opening from the cross — a Psalm that describes every detail of crucifixion a thousand years before it was invented as a method of execution: hands and feet pierced (v.16), bones out of joint (v.14), garments divided by lot (v.18), mocked by those watching (v.7–8), surrounded by enemies (v.12–13). The Psalm ends not in despair but in universal proclamation. Crucifixion was designed to be the ultimate humiliation and deterrence. Instead it became the centrepiece of the world's largest religion.`,
    historicalNote: `Roman crucifixion was reserved for slaves, pirates, and enemies of the state — it was the most degrading death Rome could devise, designed specifically to be public, prolonged, and shaming. The victim was stripped naked. Death came from asphyxiation as the body's weight made breathing increasingly difficult. The titulus (charge tablet) was carried before the prisoner and then nailed above the cross. Pilate's inscription 'King of the Jews' in Hebrew, Latin, and Greek was itself a political statement — simultaneously mocking the Jewish leaders, dismissing the prisoner, and broadcasting Roman authority. The chief priests objected to the wording; Pilate refused to change it.`,
  },

  prophecies: [
    {
      reference: "Psalm 22:1–31",
      text: `"My God, my God, why have you forsaken me?... They have pierced my hands and my feet... they divide my garments among them, and for my clothing they cast lots... All the ends of the earth shall remember and turn to the LORD."`,
      written: "~1000 BC",
      fulfilledBy: "Jesus's cry from the cross (quoting v.1), the soldiers casting lots for His clothing (v.18), the mocking crowd (v.7–8), and the universal proclamation following His death",
      gospelLink: "Matthew 27:35–46; John 19:23–24",
      insight: "Crucifixion was not an execution method in David's time — it was invented by the Persians centuries later and adopted by Rome. Yet Psalm 22 describes every physical detail of it: pierced extremities, dislocated joints, extreme thirst, public mockery, and garments divided by lot. Jesus quoted verse 1 from the cross — directing every hearer to the full Psalm, which ends in resurrection proclamation ('He has done it!', v.31).",
    },
    {
      reference: "Amos 8:9",
      text: `"And on that day, declares the Lord GOD, I will make the sun go down at noon and darken the earth in broad daylight."`,
      written: "~760 BC",
      fulfilledBy: "The three hours of darkness from noon to 3 PM on the day of crucifixion",
      gospelLink: "Matthew 27:45; Mark 15:33; Luke 23:44–45",
      insight: "Amos 8:9 appears in a passage describing God's judgment and mourning. The darkness at midday was not merely atmospheric — it was a cosmic sign of mourning and judgment over what was happening. Luke's account adds that 'the sun's light failed' (Luke 23:45), ruling out a natural solar eclipse (impossible during Passover full moon). Ancient astronomers including Thallus and Phlegon of Tralles recorded the darkness and sought natural explanations.",
    },
    {
      reference: "Exodus 12:46",
      text: `"You shall not break any of its bones."`,
      written: "~1400 BC",
      fulfilledBy: "The soldiers not breaking Jesus's legs (standard practice to hasten death), fulfilling the requirement for the Passover lamb",
      gospelLink: "John 19:33–36 — 'When they came to Jesus and saw that he was already dead, they did not break his legs... For these things took place that the Scripture might be fulfilled: Not one of his bones will be broken.'",
      insight: "The Passover lamb (Exodus 12:46) could not have a single bone broken. Jesus died on Passover Friday, the exact day lambs were being slaughtered in the Temple for the feast. His unbroken bones connect His death to the Passover sacrificial system — the original event the meal commemorated. Paul later wrote: 'Christ, our Passover lamb, has been sacrificed' (1 Corinthians 5:7).",
    },
    {
      reference: "Isaiah 53:3–12",
      text: `"He was despised and rejected by men, a man of sorrows and acquainted with grief... he was pierced for our transgressions; he was crushed for our iniquities... and they made his grave with the wicked and with a rich man in his death."`,
      written: "~700 BC",
      fulfilledBy: "The rejection, crucifixion between criminals ('wicked'), and burial in Joseph of Arimathea's tomb ('rich man')",
      gospelLink: "Luke 23:33; Matthew 27:38; John 19:38–42",
      insight: "Isaiah 53 is the most detailed advance description of the crucifixion in the entire Old Testament. Verse 9 is striking: 'his grave with the wicked and with a rich man in his death.' Jesus was crucified between two criminals (the wicked) but buried in the private tomb of Joseph of Arimathea — a wealthy member of the Sanhedrin. Both details are in the same verse, fulfilled within the same day.",
    },
    {
      reference: "Zechariah 12:10",
      text: `"And I will pour out on the house of David and the inhabitants of Jerusalem a spirit of grace and pleas for mercy, so that, when they look on me, on him whom they have pierced, they shall mourn for him."`,
      written: "~520 BC",
      fulfilledBy: "The piercing of Jesus's side with a spear after death (John 19:34)",
      gospelLink: "John 19:34–37 — 'But one of the soldiers pierced his side with a spear, and at once there came out blood and water.' John quotes Zechariah 12:10 directly.",
      insight: "John's Gospel specifically quotes Zechariah 12:10 as fulfilled by the spear thrust — and notes the eyewitness detail of blood and water (likely a medical indicator of death and pericardial fluid). Revelation 1:7 quotes the same Zechariah verse again, applied to Christ's return. The piercing is both a historical detail and an eschatological marker.",
    },
  ],

  intro: `It is Friday afternoon. The city has been in chaos since dawn — the arrest, the two trials, the execution procession through the streets. You have followed the crowd to Golgotha, the rocky outcrop outside the city walls used for public executions. What you see over the next six hours will become the central disputed event of the century. Three hours into the crucifixion, the sky goes dark. At the ninth hour, Jesus dies. The Temple veil tears. The ground shakes. A Roman soldier says something no Jewish religious leader has said all week. Your task is to document the full chain of evidence — and determine what actually happened in those three hours of darkness.`,

  suspects: [
    { id: "centurion_longinus", name: "Longinus", role: "Roman Execution Officer, Centurion", avatar: "🛡️", bibleRef: "Matthew 27:54; Mark 15:39; Luke 23:47" },
    { id: "mary_magdalene_witness", name: "Mary Magdalene", role: "Eyewitness, Close Follower", avatar: "👩", bibleRef: "Matthew 27:55–56; John 19:25" },
    { id: "joseph_arimathea", name: "Joseph of Arimathea", role: "Sanhedrin Member, Secret Disciple, Tomb Owner", avatar: "🧓", bibleRef: "Matthew 27:57–61; John 19:38–42; Mark 15:43" },
  ],

  evidencePool: [
    {
      id: "titulus_inscription",
      name: "The Titulus: 'King of the Jews'",
      type: "physical",
      icon: "📌",
      location: "Cross, Golgotha — Above the Prisoner's Head",
      desc: "A wooden board bearing the charge in three languages: Hebrew (יֵשׁוּעַ הַנָּצְרִי וּמֶלֶךְ הַיְּהוּדִים), Latin (IESVS NAZARENVS REX IVDAEORVM), and Greek (ΙΗΣΟΥΣ Ο ΝΑΖΩΡΑΙΟΣ Ο ΒΑΣΙΛΕΥΣ ΤΩΝ ΙΟΥΔΑΙΩΝ). The chief priests requested a rewording; Pilate refused: 'What I have written, I have written.'",
      bibleRef: "John 19:19–22 — Pilate's refusal to alter the titulus is recorded verbatim.",
      propheticLink: "Genesis 49:10 — 'The scepter shall not depart from Judah.' The trilingual inscription — in the three great languages of law, culture, and religion of the ancient world — proclaimed His kingship to every literate person in Jerusalem for Passover. The very instrument of His humiliation broadcast the claim He had been condemned for making.",
      investigatorNote: "The inscription is itself a legal document. Roman law required the charge be publicly stated. Pilate wrote 'King of the Jews' — not 'claims to be King of the Jews.' Whether this was sarcasm, defiance toward the Jewish leadership, or something else entirely: the wording stands.",
    },
    {
      id: "soldiers_dice",
      name: "Bone Dice Found Near the Cross",
      type: "physical",
      icon: "🎲",
      location: "Base of the Cross, Golgotha",
      desc: "Four Roman military dice — knucklebone style — left in the dirt beneath the cross. Soldiers regularly gambled during slow executions. The garments of the condemned were a traditional perquisite of the execution detail.",
      bibleRef: "John 19:23–24 — 'When the soldiers had crucified Jesus, they took his garments and divided them into four parts, one part for each soldier; also his tunic. But the tunic was seamless, woven in one piece from top to bottom, so they said to one another, Let us not tear it, but cast lots for it.'",
      propheticLink: "Psalm 22:18 — 'They divide my garments among them, and for my clothing they cast lots.' Written 1,000 years before the event, the Psalm distinguishes between garments divided (multiple pieces) and a specific garment gambled over (one item). John records exactly this distinction: four pieces distributed, one garment lotted. The Psalm is specific; the event is specific.",
      investigatorNote: "John explicitly states he is quoting Psalm 22:18 to explain why the soldiers made this choice. The seamless tunic was probably a fine garment — too valuable to tear. Their practical decision to gamble rather than cut fulfilled a Psalm detail with no human engineering required.",
    },
    {
      id: "darkness_account",
      name: "Multiple Witness Accounts of Midday Darkness",
      type: "testimonial",
      icon: "🌑",
      location: "Golgotha and Surrounding Jerusalem Streets",
      desc: "Seven independent accounts collected from different locations around Jerusalem: market traders, Roman wall sentries, a Temple priest, and three pilgrims all describe the same event — a darkness covering the land from approximately the sixth hour to the ninth hour. None describe it as a storm or cloud cover. The Temple priest notes that oil lamps had to be lit inside the inner courts at midday.",
      bibleRef: "Matthew 27:45; Mark 15:33; Luke 23:44–45",
      propheticLink: "Amos 8:9 — 'I will make the sun go down at noon and darken the earth in broad daylight.' The event was recorded in secular sources: the historian Thallus (cited by Julius Africanus, c. AD 221) attempted to explain the darkness as a solar eclipse — impossible at Passover, which always falls on a full moon, when the moon is on the opposite side of the earth from the sun. The attempt to explain it naturally confirms that the darkness was real and widely documented.",
      investigatorNote: "Seven witnesses, multiple locations, independent of each other. The darkness lasted approximately three hours and ended at the moment of Jesus's death. Whatever the mechanism, the event was real, documented, and timed.",
    },
    {
      id: "psalm22_cry",
      name: "Record of the Cry from the Cross",
      type: "analytical",
      icon: "📢",
      location: "Account of Mary Magdalene and John, Golgotha",
      desc: "A written account of the words spoken from the cross, specifically the ninth-hour cry: 'Eli, Eli, lema sabachthani?' — Aramaic for 'My God, my God, why have you forsaken me?' — the opening verse of Psalm 22. Some bystanders misheard 'Eli' as 'Elijah,' causing momentary confusion. Jesus spoke several other phrases from the cross, including 'It is finished' (tetelestai in Greek — also meaning 'paid in full,' a commercial debt-clearance term).",
      bibleRef: "Matthew 27:46–50; John 19:30",
      propheticLink: "Psalm 22 begins in desolation and ends in universal triumph: 'All the ends of the earth shall remember and turn to the LORD' (v.27). By quoting verse 1, Jesus was pointing listeners to the entire Psalm — including its ending. The word 'tetelestai' ('It is finished') was stamped on paid debt certificates in the Roman world. Jesus used a commercial debt-clearance term to describe the completion of His redemptive work.",
      investigatorNote: "Psalm 22 ends at verse 31 with the word 'he has done it.' In Hebrew: 'asah.' The same root as the Greek 'tetelestai.' Jesus may have quoted the beginning of the Psalm knowing that those familiar with it would follow it to its ending — not despair, but declared completion.",
    },
    {
      id: "veil_torn",
      name: "Temple Veil Incident Report",
      type: "testimonial",
      icon: "🧵",
      location: "Jerusalem Temple, Inner Court — Priest Duty Log",
      desc: "A duty log from the Temple's inner court noting an extraordinary event at approximately the ninth hour on Friday: the great curtain separating the outer courts from the Holy of Holies was found torn from top to bottom. The veil was 60 feet high, made of thick woven linen described as being as thick as a man's palm. Priests on duty are listed as witnesses.",
      bibleRef: "Matthew 27:51 — 'And behold, the curtain of the temple was torn in two, from top to bottom.'",
      propheticLink: "Hebrews 10:19–20 — 'We have confidence to enter the holy places by the blood of Jesus, by the new and living way that he opened for us through the curtain, that is, through his flesh.' The veil separated humanity from the innermost presence of God — only the High Priest could pass through it, once a year, on Yom Kippur. Its tearing 'from top to bottom' (not bottom to top, as human hands would have torn it) signalled the removal of the barrier between God and humanity. Hebrews identifies this as the theological meaning.",
      investigatorNote: "Torn from top to bottom — the direction is specified. A tear initiated from the bottom would indicate human agency. A tear from the top requires force applied at a 60-foot height. Temple priests logged this. The report was filed. It is in the duty record.",
    },
    {
      id: "centurion_declaration",
      name: "The Centurion's Statement",
      type: "testimonial",
      icon: "⚔️",
      location: "Golgotha — Recorded by Multiple Bystanders",
      desc: "Three independent accounts record the same statement from the Roman officer overseeing the execution, made immediately following Jesus's death, the darkness, and the earthquake: 'Truly this was the Son of God' (Matthew, Mark) / 'Certainly this man was righteous' (Luke). The statement was made in public, to his unit, by a professional soldier whose entire career was built on Roman religion and imperial authority.",
      bibleRef: "Matthew 27:54; Mark 15:39; Luke 23:47",
      propheticLink: "Isaiah 53:1 asks: 'Who has believed what he has heard from us? And to whom has the arm of the LORD been revealed?' The first person to publicly and formally declare Jesus 'Son of God' after His death was not a Jewish disciple — it was a Roman Gentile soldier. This reversal — the empire's representative speaking what the empire's court denied — echoes Isaiah's question about unexpected witnesses to the revelation.",
      investigatorNote: "This man had executed people before. He had watched many deaths. He said what he said publicly, to his unit, in an occupied province where uttering this phrase about someone other than Caesar was not without professional risk. Three sources record the statement. None record a retraction.",
    },
    {
      id: "unbroken_legs",
      name: "Medical Examiner's Note: Bones Unbroken",
      type: "physical",
      icon: "🦴",
      location: "Golgotha — Execution Detail Log",
      desc: "Standard Roman execution procedure included breaking the legs of the condemned to hasten death by preventing the body from pushing up to breathe. The execution detail log records that the legs of the two criminals on either side were broken. For the prisoner in the centre — already confirmed dead — no leg-breaking was performed. One soldier is noted as having pierced the side with a spear to verify death.",
      bibleRef: "John 19:31–37 — 'But when they came to Jesus and saw that he was already dead, they did not break his legs... and he who saw it has borne witness — his testimony is true.'",
      propheticLink: "Exodus 12:46 / Numbers 9:12 — the Passover lamb: 'You shall not break any of its bones.' John explicitly quotes this law as the reason no leg was broken, identifying Jesus as the Passover lamb. Paul repeats this in 1 Corinthians 5:7: 'Christ, our Passover lamb, has been sacrificed.' The soldiers' standard efficiency procedure was diverted at the one moment it would have broken a 1,400-year-old sacrificial regulation.",
      investigatorNote: "The soldiers had no theological knowledge of Exodus 12:46. They broke the criminals' legs as procedure and skipped Jesus's because he was already dead. An accident of military protocol fulfilled a specific Mosaic law to the letter.",
    },
  ],

  npcs: [
    {
      id: "centurion_longinus",
      name: "Longinus",
      avatar: "🛡️",
      truthfulness: 0.9,
      bibleRef: "Matthew 27:54; Mark 15:39",
      background: "A veteran Roman centurion commanding the execution detail at Golgotha. He has overseen multiple crucifixions and is not given to superstition. He is a professional soldier trained to observe and assess. He was present from the nailing through the spear-thrust confirmation of death. He made his statement publicly and has not retracted it.",
      dialogue: {
        neutral: "I have overseen forty-seven executions in this province. I have never reported an execution like this one.",
        cautious: "The darkness was real. My men can confirm it. We had to light a torch at midday. That doesn't happen.",
        pressured: "What I said, I said. I said it to my unit. I understood the implications when I said it. I said it anyway.",
        exposed: "I've watched men die slowly on crosses for years. They curse, they beg, they bargain, they break. This man — he spoke like someone finishing a task, not like someone being destroyed. When he said 'It is finished' — it didn't sound like defeat. It sounded like arrival.",
        repeat: "My report is my report. I stand by it.",
      },
      reactions: {
        darkness_account: { text: "Three hours. I have no natural explanation for it. I don't claim to have one.", isLie: false },
        psalm22_cry: { text: "He cried out in Aramaic. Some of my men thought he was calling for someone named Elijah. I had a local translator. He told me what the words meant. Then I understood we were dealing with something different.", isLie: false },
        centurion_declaration: { text: "I stand by what I said. My men heard it. It is in my personal report.", isLie: false },
        veil_torn: { text: "I had a runner come from the city less than an hour later. He said the Temple curtain had torn while we were up here. I noted the time. It matched the moment of death exactly.", isLie: false },
        unbroken_legs: { text: "Standard procedure: break the legs if the prisoner isn't dead yet. He was already dead. We verified with the spear. There was no reason to break them.", isLie: false },
      },
      contradictions: {
        "centurion_declaration+darkness_account": { exposed: "You want to know what convinced me? It wasn't just the darkness or the earthquake or the curtain report. It was the combination. Every time a significant man has died in this province, nothing happens. This time, the sky went dark, the earth shook, and the dead started walking in the city. I'm a soldier, not a philosopher. But I know what that adds up to." },
      },
    },
    {
      id: "mary_magdalene_witness",
      name: "Mary Magdalene",
      avatar: "👩",
      truthfulness: 0.95,
      bibleRef: "Matthew 27:55–56; John 19:25; Mark 15:40–41",
      background: "Mary Magdalene has been following Jesus since He healed her in Galilee. She was present at Golgotha throughout the crucifixion — one of the few who stayed. She watched Him die. She knew where He was buried. She will be the first person to report the empty tomb on Sunday morning.",
      dialogue: {
        neutral: "I was there from the beginning to the end. I didn't run.",
        cautious: "The men ran. Most of them. John stayed. The women stayed. We stayed because — where else would we go?",
        pressured: "The darkness started suddenly. No clouds before it, no gradual dimming. One moment it was noon. The next it was like dusk. The guards started talking among themselves.",
        exposed: "When he cried out — 'My God, my God' — I recognized the beginning of Psalm 22. I had heard him quote Scripture all week. He was quoting again. Even then. Even there. I don't think he had stopped teaching.",
        repeat: "I've told you what I saw. I will tell anyone who asks.",
      },
      reactions: {
        psalm22_cry: { text: "I know that Psalm. When he said those opening words, I knew which Psalm it was. The Psalm ends with — it ends with God not ignoring the one who cries out. It ends with praise and proclamation. He was quoting the whole thing.", isLie: false },
        darkness_account: { text: "My first thought was that it was a judgment. The way the prophets described judgment — darkness at noon. Amos. I thought of Amos.", isLie: false },
        veil_torn: { text: "I didn't hear about the veil until later that evening. When someone told me, I wasn't surprised. Everything that could signal that this was important — it happened.", isLie: false },
        soldiers_dice: { text: "They gambled for his clothes while he was still alive. I know it's their job. I know what soldiers do. But I kept thinking of the Psalm. 'They divide my garments among them.' He quoted the beginning of that Psalm from the cross while they were fulfilling the rest of it below him.", isLie: false },
      },
      contradictions: {
        "psalm22_cry+soldiers_dice": { exposed: "I don't think he was in despair when he quoted that Psalm. I think he was pointing to it. He knew the Psalm ends in victory. He was telling us something about how this ends — not just how it was going." },
      },
    },
    {
      id: "joseph_arimathea",
      name: "Joseph of Arimathea",
      avatar: "🧓",
      truthfulness: 0.85,
      bibleRef: "Matthew 27:57–61; John 19:38–42; Mark 15:43–46; Luke 23:50–53",
      background: "Joseph is a wealthy member of the Sanhedrin who had secretly believed in Jesus but lacked the courage to say so publicly — John 19:38 records his fear of the Jewish leadership. He did not vote for the condemnation (Luke 23:51). After the death, he went directly to Pilate and asked for the body — an act of unusual boldness that exposed his allegiance publicly and permanently. He placed Jesus in his own newly hewn tomb.",
      dialogue: {
        neutral: "I was a member of the council that condemned him. I did not vote for it. I should have spoken sooner. I did not.",
        cautious: "Going to Pilate was the most frightening thing I have ever done. I am a wealthy man. I have much to lose. I went anyway.",
        pressured: "He deserved better than a criminal's burial. It was the least I could do. Embarrassingly, it was the most I had done.",
        exposed: "I had listened to him teach for months. In secret. I sat near the back at the Temple. I believed he was who he said he was. And I said nothing during the trial. When they brought him to the cross — I decided I would not say nothing again.",
        repeat: "The tomb is sealed now. I've done what I could.",
      },
      reactions: {
        titulus_inscription: { text: "I read the inscription when I came to ask for the body. 'King of the Jews.' Pilate meant it as a taunt. I read it as a title.", isLie: false },
        unbroken_legs: { text: "I arrived after he had died. The soldiers had already confirmed it. His legs were intact. I noted it because of the Passover law. I said nothing — the soldiers wouldn't have known.", isLie: false },
        veil_torn: { text: "I was in Pilate's antechamber when someone came with the report from the Temple. The priest was pale. He said the inner veil had torn. Pilate's secretary wrote it down. I saw him write it.", isLie: false },
        centurion_declaration: { text: "I heard the centurion's words before I left Golgotha. A Roman soldier. Saying what the Sanhedrin refused to say in forty years of watching his ministry. I'm not sure whether to be ashamed or grateful.", isLie: false },
      },
      contradictions: {
        "titulus_inscription+centurion_declaration": { exposed: "I had spent three years as a secret disciple because I was afraid of what public belief would cost me. In one afternoon, a Roman soldier with no formal theology and a writing board with three words in three languages did more than I did in three years. I decided I wouldn't let that stand." },
      },
    },
  ],

  deductions: {
    "psalm22_cry+soldiers_dice": {
      link: {
        text: "Jesus quoted Psalm 22:1 from the cross while the soldiers beneath him were simultaneously fulfilling Psalm 22:18 without knowing it.",
        insight: "The opening cry ('My God, my God, why have you forsaken me?') and the soldiers' gambling for the garment happen in the same scene, documented by the same eyewitnesses. David wrote a Psalm that described both simultaneously, 1,000 years in advance, before crucifixion existed as a method. Jesus quoted the Psalm's beginning while its details were being enacted around him — possibly directing attentive listeners to follow the Psalm through to its end, which is not despair but declaration.",
        isKey: true,
        bibleRef: "Psalm 22:1, 18; Matthew 27:35–46",
      },
    },
    "darkness_account+veil_torn": {
      link: {
        text: "The three-hour darkness and the tearing of the Temple veil were simultaneous with the crucifixion — two independent, unconnected events in different locations that converged on the same moment.",
        insight: "One event happened outside the city walls at a public execution site. The other happened inside the Temple's innermost sacred chamber, accessible only to priests. Neither group could have coordinated with the other. Both were documented independently. Both were timed to the ninth hour. The convergence suggests not human orchestration but cosmic significance — the two events bracket the city: judgment outside its walls, access opened inside its holiest room.",
        isKey: true,
        bibleRef: "Matthew 27:45–51; Amos 8:9; Hebrews 10:19–20",
      },
    },
    "unbroken_legs+titulus_inscription": {
      compare: {
        text: "The unbroken bones (fulfilling Exodus 12:46) and the trilingual inscription (broadcasting His identity) both resulted from Roman soldiers following standard procedure with no religious knowledge.",
        insight: "The soldiers had no reason to know about the Passover lamb law. They skipped leg-breaking because he was already dead — it was efficient, not theological. The inscription was Pilate's political statement. Yet both acts, performed by the empire with no knowledge of Hebrew Scripture, fulfilled specific Old Testament details. The prophecies were fulfilled by people with no intention of fulfilling them.",
        isKey: true,
        bibleRef: "Exodus 12:46; John 19:36; John 19:19–22",
      },
    },
    "centurion_declaration+psalm22_cry": {
      timeline: {
        text: "Jesus's citation of Psalm 22's beginning and the centurion's declaration at His death form a narrative bracket: the opening cry of desolation is answered at death's moment by the first human confession of His identity.",
        insight: "Psalm 22 begins with abandonment and ends with proclamation to all nations. The centurion — a Gentile, the representative of the occupying empire — became the living fulfilment of Psalm 22's ending: a non-Israelite declaring the Lord's righteousness at the moment of death. The Psalm's arc from despair to universal proclamation was enacted in real time on a hillside outside Jerusalem.",
        isKey: false,
        bibleRef: "Psalm 22:27–31; Matthew 27:54; Isaiah 53:1",
      },
    },
    "joseph_arimathea+unbroken_legs": {
      timeline: {
        text: "Joseph's arrival at Golgotha to claim the body and his observation of the unbroken legs converge to connect the crucifixion to the Passover narrative.",
        insight: "Joseph — a member of the Sanhedrin, trained in Torah — was the one person at Golgotha with the scriptural knowledge to recognize that the unbroken legs fulfilled Exodus 12:46. He saw it. He said nothing at the time. But John's Gospel, which preserves the eyewitness account of Jesus's beloved disciple, makes the connection explicit — citing the law directly. The witness with the most knowledge of Scripture was the last to act publicly. The witness with the least (the centurion) acted first.",
        isKey: false,
        bibleRef: "John 19:35–36; Exodus 12:46; Luke 23:50–53",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no crime in the investigative sense. But the question this case presents is whether the events of six hours at Golgotha — the darkness, the veil, the unbroken bones, the gambling soldiers, the centurion's declaration — are individually explainable as coincidence and collectively comprehensible as anything less than the fulfilment of a coherent prophetic pattern written across seven centuries.",
    method: "Jesus was crucified by Roman soldiers under the authority of Pontius Pilate, following an illegal night trial before the Sanhedrin. He died at approximately the ninth hour. In the three hours between noon and His death, the sky went dark across the land. At the moment of His death: the Temple veil tore from top to bottom, an earthquake struck Jerusalem, and the Roman officer overseeing the execution publicly declared Him the Son of God. His bones were left unbroken by soldiers following standard efficiency procedure, fulfilling the Passover lamb requirement. He was buried in the private tomb of a wealthy Sanhedrin member, fulfilling Isaiah 53:9.",
    lesson: "Crucifixion was designed to be the final word — the ultimate declaration that a person was finished, defeated, and beneath consideration. Rome used it as the loudest possible statement of imperial dominance. Yet the events at Golgotha left the execution detail's own commanding officer saying what the condemned man's accusers refused to say. The prophecies fulfilled that afternoon were written by people who had never seen a Roman cross. The soldiers who fulfilled them had never read a Hebrew scroll. The convergence of detail, across seven centuries, at a single hill outside Jerusalem on a specific Friday afternoon is the central historical case that the rest of the game has been building toward.",
    prophesyFulfilled: ["Psalm 22:1–31", "Amos 8:9", "Isaiah 53:3–12", "Exodus 12:46", "Zechariah 12:10", "Isaiah 53:9"],
    furtherReading: ["Matthew 27:33–54", "Mark 15:22–39", "Luke 23:33–47", "John 19:16–37"],
  },
};

// ============================================================
// CASE: The Empty Tomb  — difficulty 3 — Garden
// BIBLICAL FOCUS: Matthew 28:1–10, Mark 16:1–8, Luke 24:1–12, John 20:1–18
// PROPHECY: Psalm 16:10, Hosea 6:2, Jonah 1:17/Matt 12:40, Isaiah 53:10–11
// ============================================================

export const act4CaseC = {
  id: "resurrection",
  title: "The Empty Tomb",
  subtitle: "The sealed tomb is open. The body is gone. The guards have fled. What happened on the third day?",
  location: "garden",
  difficulty: 3,
  requires: "crucifixion_darkness",
  actLabel: "Act IV",
  color: 0xa78bfa,
  quest: { name: "Garden Investigation", task: "Find the body", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Early on Sunday morning, Nisan 17, three days after the crucifixion, Mary Magdalene came to the tomb in the garden near Golgotha. She found the stone rolled away, the tomb empty, and — according to John's Gospel — initially thought the body had been stolen (John 20:2). But as the morning unfolded, multiple witnesses reported encounters with a risen Jesus: first Mary Magdalene alone (John 20:11–18), then the other women (Matthew 28:9–10), then Peter (1 Corinthians 15:5), then two disciples on the Emmaus road (Luke 24:13–35), and finally the eleven apostles in a locked room (John 20:19–23).`,
    significance: `The resurrection is the pivotal claim of Christianity. Paul wrote: 'If Christ has not been raised, your faith is futile' (1 Corinthians 15:17). But it was also the most precisely predicted event in the Passion narrative — Psalm 16:10, Hosea 6:2, Jonah 1:17, and Isaiah 53:10–11 all pointed toward it. Jesus himself predicted it three times (Matthew 16:21, 17:23, 20:19). The evidence at the tomb — the folded linens, the rolled stone, the guard report — all points toward something for which 'theft' is an inadequate explanation.`,
    historicalNote: `The tomb was a wealthy man's tomb — Joseph of Arimathea's, hewn from rock in the garden near Golgotha (John 19:41). This fulfilled Isaiah 53:9 ('buried with the rich'). A large stone (Greek: lithos) sealed the entrance — estimates suggest it weighed 1–2 tonnes. The Roman guard (koustodia) was a 4–16 man unit assigned to prevent exactly the situation they now had to report. Matthew 28:11–15 records that the chief priests bribed the soldiers to say the disciples stole the body while they slept — a story with obvious problems: soldiers asleep on duty faced execution; if they were asleep, how did they see what happened?`,
  },

  prophecies: [
    {
      reference: "Psalm 16:10",
      text: `"For you will not abandon my soul to Sheol, or let your holy one see corruption."`,
      written: "~1000 BC",
      fulfilledBy: "Jesus rising before His body could decay, leaving only the burial linens",
      gospelLink: "Acts 2:27–31 — Peter quotes Psalm 16:10 at Pentecost and explicitly applies it to Jesus's resurrection",
      insight: "David wrote Psalm 16 in first person, but Acts 2:29–31 records Peter explaining that David was a prophet who 'seeing what was ahead, spoke about the resurrection of the Messiah, that he was not abandoned to the realm of the dead, nor did his body see decay.' The empty tomb is the physical evidence of this 1,000-year-old promise kept.",
    },
    {
      reference: "Hosea 6:2",
      text: `"After two days he will revive us; on the third day he will restore us, that we may live in his presence."`,
      written: "~750 BC",
      fulfilledBy: "Jesus rising on the third day after crucifixion",
      gospelLink: "1 Corinthians 15:4 — Paul writes the resurrection happened 'according to the Scriptures,' citing the third-day pattern",
      insight: "Jesus predicted His own third-day resurrection three times in the Gospels (Matthew 16:21, 17:23, 20:19). He drew on the pattern of Hosea 6:2 and the sign of Jonah (Jonah 1:17, Matthew 12:40). Paul's use of 'according to the Scriptures' (1 Corinthians 15:3–4) is the earliest written attestation that the church understood the resurrection as prophetic fulfilment.",
    },
    {
      reference: "Jonah 1:17 / Matthew 12:40",
      text: `"For just as Jonah was three days and three nights in the belly of the great fish, so will the Son of Man be three days and three nights in the heart of the earth."`,
      written: "~800 BC / AD 28",
      fulfilledBy: "Jesus's three days in the tomb, followed by resurrection",
      gospelLink: "Matthew 12:40 — Jesus explicitly identifies Himself with Jonah when challenged for a sign",
      insight: "This is one of the most precise self-fulfilling prophecies in Scripture — Jesus named His own death and resurrection timing using the Jonah metaphor when challenged by Pharisees for miraculous proof. The empty tomb on the third day was the 'sign of Jonah' He had promised.",
    },
    {
      reference: "Isaiah 53:10–11",
      text: `"Yet it was the will of the LORD to crush him; he has put him to grief; when his soul makes an offering for guilt, he shall see his offspring and prolong his days... After his anguish he shall see light and be satisfied."`,
      written: "~700 BC",
      fulfilledBy: "Jesus's resurrection — 'prolonging his days' after the sacrifice; 'seeing light' after death",
      gospelLink: "John 20:11–18; Luke 24:13–35 — Jesus appears alive after the suffering",
      insight: "The Suffering Servant song of Isaiah 53 contains a remarkable internal paradox: the servant is 'cut off from the land of the living' (v.8), assigned a grave (v.9), and yet he 'shall see his offspring and prolong his days' (v.10). The only way to reconcile these statements is resurrection. Jesus's post-resurrection appearances fulfilled Isaiah's paradox.",
    },
    {
      reference: "Psalm 22:1–31",
      text: `"My God, my God, why have you forsaken me?... They will come and proclaim his righteousness, declaring to a people yet unborn: He has done it!"`,
      written: "~1000 BC",
      fulfilledBy: "Psalm 22 begins with the crucifixion cry (v.1, quoted by Jesus from the cross) and ends with resurrection proclamation (v.31)",
      gospelLink: "Matthew 27:46 (crucifixion); the closing verses of Psalm 22 look beyond the suffering to vindication",
      insight: "Psalm 22 is a remarkable document: it begins with abandonment and describes crucifixion details (hands and feet pierced, v.16; garments divided by lots, v.18) before ending in triumphant proclamation. The Psalm is both a lament and a resurrection song — which is why Jesus quoted its opening from the cross, perhaps pointing His listeners to its ending.",
    },
  ],

  intro: `It is early Sunday morning, Nisan 17. Three women — Mary Magdalene, Mary the mother of James, and Salome — have come to the garden tomb at first light to complete the anointing of Jesus's body. They were worried about who would roll the stone away. But when they arrive: the stone is already moved. The Roman guard post is abandoned. The tomb is open, and empty. Two strange figures in white are inside. And then — Mary Magdalene sees someone she mistakes for the gardener, until He speaks her name. You are the investigative scribe. What happened here? And can the evidence in this garden account for the most important claim in history?`,

  suspects: [
    { id: "mary_magdalene", name: "Mary Magdalene", role: "Disciple, First Witness", avatar: "👩", bibleRef: "John 20:1–18; Mark 16:9" },
    { id: "marcus", name: "Marcus", role: "Roman Soldier, Guard Detail", avatar: "🛡️", bibleRef: "Matthew 27:62–66; 28:11–15" },
    { id: "joseph", name: "Joseph of Arimathea", role: "Secret Disciple, Tomb Owner", avatar: "🧓", bibleRef: "Matthew 27:57–61; John 19:38–42" },
  ],

  evidencePool: [
    {
      id: "rolled_stone",
      name: "The Displaced Sealing Stone",
      type: "physical",
      icon: "🗿",
      location: "Tomb Entrance, Garden of Joseph",
      desc: "A massive circular limestone stone — estimated at 1–2 tonnes — has been rolled away from the tomb entrance and sits to the side, not rolled down the slope but resting beside it. The sealing wax from the Roman official seal is broken.",
      bibleRef: "Matthew 28:2 — 'There was a violent earthquake, for an angel of the Lord came down from heaven and, going to the tomb, rolled back the stone and sat on it.'",
      propheticLink: "Isaiah 26:19 — 'Your dead will live, LORD; their bodies will rise — let those who dwell in the dust wake up and shout for joy.' The removal of the stone was not to let Jesus out — a resurrected, glorified body passed through locked doors (John 20:19). The stone was rolled away so witnesses could look in.",
      investigatorNote: "A 2-tonne stone moved uphill, not downhill. No marks suggesting ropes or levers. The Roman guard seal is broken from outside the tomb.",
    },
    {
      id: "empty_tomb",
      name: "The Empty Burial Chamber",
      type: "physical",
      icon: "🕳️",
      location: "Interior of Joseph's Tomb",
      desc: "The tomb is completely empty except for the burial wrappings. No body, no signs of struggle, no disturbance of the surrounding grave goods. The shelf where Jesus lay is bare. The wall niches are untouched.",
      bibleRef: "Luke 24:3 — 'When they entered, they did not find the body of the Lord Jesus.'",
      propheticLink: "Psalm 16:10 — 'You will not let your holy one see corruption.' The empty tomb is the physical evidence that the Psalm's promise was kept. A body left long enough shows decomposition; no such evidence exists.",
      investigatorNote: "No disturbance to the grave goods. No signs of a struggle. No evidence of the organised haste a grave robbery would require. The space is orderly.",
    },
    {
      id: "burial_linen",
      name: "Folded Burial Linens",
      type: "physical",
      icon: "🧻",
      location: "Burial Shelf, Inside the Tomb",
      desc: "The linen strips that wrapped Jesus's body are still present, lying where the body was — not unwrapped and discarded, but apparently lying in the exact shape the body had been, as if it had simply passed through them. The face cloth is separately folded and placed to one side.",
      bibleRef: "John 20:6–8 — 'He saw the strips of linen lying there, as well as the cloth that had been wrapped around Jesus' head. The cloth was still lying in its place, separate from the linen.'",
      propheticLink: "John's Gospel records that the 'other disciple' (John) 'saw and believed' specifically because of how the linens were arranged. A body stolen hastily would leave disordered linens or none at all. The orderly, structured arrangement of the grave cloths pointed to something other than grave robbery.",
      investigatorNote: "If grave robbers unwrapped the body to carry it out more easily, why leave the wrappings so neatly? If they took the body still wrapped, why are the linens here at all? The linen arrangement defies theft as an explanation.",
    },
    {
      id: "angelic_witness",
      name: "The Angelic Proclamation",
      type: "testimonial",
      icon: "✨",
      location: "Inside the Tomb / Seated on the Stone",
      desc: "Multiple witnesses independently report seeing one or two figures in white — described as 'like lightning' in appearance — at or inside the tomb. Each gives a consistent message: 'He is not here. He has risen, just as he said. Come and see the place where he lay.'",
      bibleRef: "Matthew 28:2–7; Mark 16:5–7; Luke 24:4–7; John 20:12–13",
      propheticLink: "Psalm 103:20 describes angels as those who 'do his bidding.' The angelic announcement at the tomb echoes the angelic announcements at the nativity — both bookend Jesus's earthly life with heavenly proclamation. The consistency of the message across all four Gospel accounts, with slight variations in detail (one angel or two?), reflects the characteristics of independent eyewitness testimony.",
      investigatorNote: "Four independent accounts agree on the core message. The small variations (one angel/two angels; inside or outside) are consistent with the kind of variation seen in genuine eyewitness reports, not coordinated fabrication.",
    },
    {
      id: "guard_report",
      name: "The Soldiers' Broken Report",
      type: "analytical",
      icon: "📋",
      location: "Roman Guard Post, Outer Garden",
      desc: "A shattered wax tablet from the guard log — only partially legible: '...seismos... phos... ekphobothesan... nekroi...' ('earthquake... light... we became as dead men...'). The soldiers have fled their post. An official report was filed later — but the chief priests are paying the soldiers to alter their account.",
      bibleRef: "Matthew 28:2–4 — 'The guards shook for fear of him and became like dead men.' Matthew 28:11–15 — the chief priests bribed the guards to say the disciples had stolen the body.",
      propheticLink: "The bribe to the guards fulfils the pattern of institutional deception against God's purposes — similar to how the chief priests had bribed Judas (Matthew 26:14–16). The very people who guarded against resurrection were the first non-disciple witnesses of the supernatural event.",
      investigatorNote: "Soldiers asleep on duty faced execution under Roman military law. If they were asleep, they couldn't know what happened. If they were awake, they witnessed something they couldn't explain. The bribery is itself evidence that the authorities knew the disciples hadn't stolen the body.",
    },
    {
      id: "spice_jars",
      name: "Unused Burial Spices",
      type: "physical",
      icon: "🧴",
      location: "Entrance to the Tomb Garden",
      desc: "Three clay jars of prepared burial spices — myrrh, aloe, and cinnamon — set down at the garden entrance, unopened. The women brought them to complete the anointing of the body, but they were never used.",
      bibleRef: "Mark 16:1 — 'Mary Magdalene, Mary the mother of James, and Salome bought spices so that they might go to anoint Jesus's body.'",
      propheticLink: "Nicodemus had already brought 75 pounds of myrrh and aloes for the burial (John 19:39–40), fulfilling the wealthy burial of Isaiah 53:9. The women's additional spices were for the anointing ritual completed after the Sabbath — but there was no body to anoint. The unused jars are a symbol of an interrupted mourning, halted by resurrection.",
      investigatorNote: "Women who had watched the crucifixion and burial now find the tomb empty. Their grief was real. Their testimony carries the weight of witnesses who had no reason to fabricate — and everything to lose by making the claim.",
    },
    {
      id: "mary_encounter",
      name: "Mary Magdalene's Testimony",
      type: "testimonial",
      icon: "👁️",
      location: "Garden, Near the Tomb Entrance",
      desc: "Mary Magdalene's first-person account, recorded by John: 'I saw the Lord.' She had initially mistaken the risen Jesus for the gardener. He said one word — her name: 'Mary.' She turned and recognised Him. 'Rabboni!' He told her not to cling to Him, for He had not yet ascended to the Father, and sent her to tell the disciples.",
      bibleRef: "John 20:11–18 — the most detailed and intimate resurrection appearance account in Scripture.",
      propheticLink: "Isaiah 43:1 — 'I have called you by name; you are mine.' The risen Christ's first post-resurrection act was to call a woman by name — the same woman from whom He had cast seven demons (Luke 8:2). His resurrection announcement went first to the most socially marginalised witness — deliberate and counter-cultural. In a Roman court, a woman's testimony was inadmissible. If the disciples were fabricating a resurrection, they would not have made a woman — and a former demoniac — the primary witness.",
      investigatorNote: "The fact that Mary Magdalene is the primary resurrection witness is powerful evidence of authenticity. No first-century Jewish or Roman author inventing a resurrection story would choose a woman as the lead witness. This detail is counterproductive to fabrication — which is exactly why it's credible.",
    },
  ],

  npcs: [
    {
      id: "mary_magdalene",
      name: "Mary Magdalene",
      avatar: "👩",
      truthfulness: 0.98,
      bibleRef: "John 20:1–18; Mark 16:9; Luke 8:1–3",
      background: "Mary Magdalene was from Magdala on the Sea of Galilee. Luke 8:2 records that Jesus had cast seven demons from her — making her one of the most dramatic examples of His healing ministry. She subsequently became one of His most devoted followers, one of the women who funded His ministry (Luke 8:3), and one of the few disciples present at the crucifixion (John 19:25). She is the first witness to the resurrection.",
      dialogue: {
        neutral: "I came to the tomb before dawn. I needed to be there. I had to finish what we couldn't do before the Sabbath.",
        cautious: "The stone was moved. I didn't wait — I ran to find Peter and John. I thought someone had taken Him.",
        pressured: "When I came back, I stayed at the tomb, weeping. I looked inside and saw two figures in white where His body had been. They asked me why I was weeping.",
        exposed: "Then I turned around and there was a man standing there. I thought He was the gardener. He asked me who I was looking for. And then He said my name — 'Mary.' Just like that. And I knew. I fell at His feet. He was alive.",
        repeat: "I saw Him. I spoke to Him. I don't expect everyone to believe me. But I know what I saw.",
      },
      reactions: {
        burial_linen: { text: "The grave cloths were lying there, shaped like a body but empty. Peter went straight in and stood there, confused. But John went in after him and he saw and believed. I think the cloths told him something the rest of us weren't ready to understand yet.", isLie: false },
        angelic_witness: { text: "Two figures — like bright light. They asked me, 'Woman, why are you weeping?' I said, 'They have taken my Lord, and I don't know where they have laid him.' And then I turned around.", isLie: false },
        spice_jars: { text: "I set them down when I saw the stone was moved. I didn't need them anymore — but I didn't know that yet. I just stood there staring.", isLie: false },
        mary_encounter: { text: "He called my name. That's all it took. 'Mary.' I knew His voice. I knew it the way I knew my own name. Three years I'd been with this man. He was dead — I watched Him die — and there He stood. What would you have done?", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "marcus",
      name: "Marcus",
      avatar: "🛡️",
      truthfulness: 0.6,
      bibleRef: "Matthew 27:62–66; 28:2–4; 28:11–15",
      background: "A Roman legionary assigned to the tomb guard detail — koustodia, a specialised guard unit. He was present at the supernatural event, has filed a report, and is now caught between his military duty to report accurately and the bribe from the chief priests to lie. He knows the official story is false. He is afraid.",
      dialogue: {
        neutral: "I was on duty. There was an earthquake. A light. And then... nothing. We were assigned elsewhere after that.",
        cautious: "The official report is that the disciples came while we slept and stole the body. That is the statement I have authorised.",
        pressured: "I would face military discipline if I contradicted my commanding officer's official statement. I have a family in Rome.",
        exposed: "We didn't sleep. What happened at that tomb — I have no words for it. The light was like nothing I have ever seen in fifteen years of military service. We fell like dead men. When we got up, the stone was moved and the tomb was open. We didn't touch anything. We ran.",
        repeat: "My official statement stands. Whatever you think you know, leave it alone.",
      },
      reactions: {
        rolled_stone: { text: "We didn't move the stone. No human being moved that stone. I was four metres away when it happened.", isLie: false },
        guard_report: { text: "That tablet is from my post. The legible words are accurate — earthquake, light, we became as dead men. The chief priests paid us afterward to change our account. I'm telling you this once, and then it never happened.", isLie: false, revealedClue: "burial_linen" },
        empty_tomb: { text: "The tomb was sealed when our watch began Friday evening. The seal was intact at the start of the final watch. And then it wasn't.", isLie: false },
        angelic_witness: { text: "I don't have a word for what I saw in the Roman tradition. In the Jewish tradition, I believe they call it an angel. Whatever it was — it was not human.", isLie: false },
      },
      contradictions: {
        "guard_report+rolled_stone": { exposed: "You want me to say it plainly? Nothing human moved that stone. Nothing human caused that light. Nothing human emptied that tomb. I've guarded crucifixion sites. I've handled bodies. The disciples? Twelve frightened men who scattered when he was arrested? They couldn't have done this. Whatever happened in that garden — I am going to spend the rest of my life trying to forget it." },
      },
    },
    {
      id: "joseph",
      name: "Joseph of Arimathea",
      avatar: "🧓",
      truthfulness: 0.9,
      bibleRef: "Matthew 27:57–61; Mark 15:43–47; Luke 23:50–56; John 19:38–42",
      background: "Joseph of Arimathea is a wealthy member of the Sanhedrin who had privately opposed the vote to condemn Jesus (Luke 23:51). He is described as 'waiting for the Kingdom of God' (Mark 15:43) — and after the crucifixion, he risked his reputation by going publicly to Pilate to ask for the body. He provided his own newly cut tomb in the garden. Nicodemus came with him, bringing 75 pounds of burial spices (John 19:39).",
      dialogue: {
        neutral: "I provided this tomb for Him. I have no regrets about that, regardless of what the council thinks of me.",
        cautious: "I was a member of the Sanhedrin. I know what the official position is. I also know what I put into that tomb and what the stone looked like when it was sealed.",
        pressured: "Nicodemus and I wrapped the body ourselves. We prepared it according to Jewish custom with myrrh and aloes. We placed Him in this tomb and watched the stone rolled shut. I know what was there.",
        exposed: "And now it is gone. The linens are there. The tomb is open. I walked inside this morning. I stood where I placed Him. And I find I am no longer grieving the way I expected to.",
        repeat: "What I believe about what happened — that is my own business. What I can tell you is what I saw with my own eyes.",
      },
      reactions: {
        burial_linen: { text: "I chose those linens myself. The finest cloth I could obtain quickly before the Sabbath began. I know how we wrapped Him. What remains in that tomb — the linens haven't been unwrapped. They're still in the shape He was in. I can't explain that.", isLie: false },
        spice_jars: { text: "Nicodemus brought seventy-five pounds of myrrh and aloes (John 19:39). That fulfilled Isaiah 53:9 — the rich burial the prophet described. These jars the women brought were additional. None of it was used this morning.", isLie: false },
        rolled_stone: { text: "I watched four men seal that stone and apply the Roman wax. It took all four of them to move it. This morning it's beside the entrance as if resting there, not rolled or fallen — placed. Something placed it there.", isLie: false },
        empty_tomb: { text: "I am a wealthy man with many resources at my disposal. I buried Him in my own tomb. I had every reason to know exactly what was in that tomb, and I had every resource to investigate if something had been moved. The body is gone. The linens remain. I do not believe it was stolen.", isLie: false },
      },
      contradictions: {
        "burial_linen+rolled_stone": { exposed: "You want to know what I think? I've read Psalm 16:10. 'You will not let your holy one see corruption.' I read it as poetry before. I was wrong. The linens are arranged as if a body simply passed through them. The stone is resting, not tumbled. And Joseph's testimony about the guard — no one slept through that. This tomb is empty. He said it would be. I am beginning to believe He was right." },
      },
    },
  ],

  deductions: {
    "rolled_stone+guard_report": {
      compare: {
        text: "The displaced 2-tonne stone and the soldiers' broken report ('earthquake... light... we became as dead men') both point to a single event: something of enormous power at the tomb entrance, in the middle of the night.",
        insight: "A stone that size cannot be moved silently by frightened men (the disciples) past an armed guard. The guards' own account — corroborated by the fact that the chief priests had to bribe them — confirms they witnessed something they could not explain, not an organised grave robbery.",
        isKey: true,
        bibleRef: "Matthew 28:2–4; Matthew 28:11–15",
      },
      link: {
        text: "The bribery of the guards (Matthew 28:12–15) is itself evidence that the authorities knew the disciples hadn't stolen the body. You don't pay soldiers to lie about sleeping unless the truth — that they saw something — would be worse.",
        insight: "The chief priests' response to the resurrection was not to produce the body (which would have ended Christianity immediately) — but to manufacture an alternative story. The inability to produce the body is the strongest institutional evidence for the resurrection.",
        isKey: true,
        bibleRef: "Matthew 28:11–15",
      },
    },
    "empty_tomb+burial_linen": {
      compare: {
        text: "An empty tomb and orderly, in-situ burial linens together rule out the most plausible alternative: theft. Grave robbers stealing a body would either leave the linens in disarray (if they unwrapped the body inside) or take the linens with the body (if they carried it wrapped).",
        insight: "John's Gospel specifically says that the 'beloved disciple' saw the burial cloths and 'believed' (John 20:8). The arrangement of the linens was itself a witness to something beyond grave robbery. Joseph of Arimathea's testimony confirms the linens are arranged as if the body passed through them.",
        isKey: true,
        bibleRef: "John 20:6–8; Psalm 16:10",
      },
    },
    "angelic_witness+mary_encounter": {
      compare: {
        text: "The angelic proclamation ('He is risen') and Mary Magdalene's personal encounter with the risen Jesus are independent reports of the same morning, converging on the same conclusion.",
        insight: "The choice of Mary Magdalene as the first resurrection witness is historically significant. Paul's 1 Corinthians 15 list of witnesses does not mention her — he is addressing a Roman legal context in which women's testimony was inadmissible. The Gospels record her testimony because it actually happened, not because it was strategically useful.",
        isKey: true,
        bibleRef: "John 20:11–18; Mark 16:9; 1 Corinthians 15:5–8",
      },
    },
    "spice_jars+burial_linen": {
      timeline: {
        text: "Timeline: Women prepared spices on Friday evening after the burial. Observed Sabbath Saturday. Arrived at dawn Sunday intending to anoint the body. Set spices down when they found the stone moved. Never used the spices.",
        insight: "The unused spices and untouched linens complete a picture: the body did not need to be anointed because it was no longer there. The linens did not need to be removed because whatever left them behind passed through them. The women's grief was real — their testimony carries the weight of people who had every emotional reason to want the body to still be there.",
        isKey: false,
        bibleRef: "Mark 16:1; John 19:39–40; Isaiah 53:9",
      },
    },
    "mary_encounter+guard_report": {
      contradict: {
        text: "The guard's account (supernatural light, earthquake, became as dead men) and Mary's account (mistook Jesus for the gardener, recognised Him by voice) are strikingly different experiences of the same morning — and together they are stronger evidence than either alone.",
        insight: "If the resurrection were fabricated, the disciples would likely have created a single, consistent, impressive account — not two wildly different experiences (terrifying supernatural power for the guards; a quiet garden conversation for Mary). The diversity of the accounts reflects genuine independent witnesses.",
        isKey: true,
        bibleRef: "Matthew 28:2–4; John 20:14–17",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no theft, no conspiracy, and no staged event. Jesus rose from the dead on the third day exactly as He had predicted, fulfilling centuries of prophetic writing. The evidence at the tomb — the orderly linens, the impossibly moved stone, the terrified guards, the independent witnesses, the inability of the authorities to produce a body — all points toward one conclusion.",
    method: "The resurrection was a supernatural act of God. The stone was moved not to release Jesus — who later appeared in locked rooms — but to allow witnesses to see the empty tomb. The burial linens remained in their position, undisturbed. Multiple independent witnesses encountered the risen Jesus across the day: Mary Magdalene in the garden, the other women on the road, Peter, the Emmaus disciples, and finally all the apostles in the locked room.",
    lesson: "The resurrection is the cornerstone of Christian faith — and the most prophetically anticipated event in the Bible. Psalm 16:10, Hosea 6:2, Isaiah 53:10–11, Jonah 1:17, and Jesus's own three predictions all pointed to this morning. The evidence is not that everyone immediately believed — Peter was confused, Thomas doubted, the guards lied — but that the tomb remained empty, the body was never produced, and witnesses continued to report encounters with a risen Jesus despite having no earthly incentive to do so under Roman persecution.",
    prophesyFulfilled: ["Psalm 16:10", "Hosea 6:2", "Jonah 1:17 / Matthew 12:40", "Isaiah 53:10–11", "Psalm 22:1–31", "Isaiah 26:19"],
    furtherReading: ["Matthew 28:1–20", "Mark 16:1–8", "Luke 24:1–53", "John 20:1–21:25", "1 Corinthians 15:1–58", "Acts 2:22–36"],
  },
};


// ============================================================
// CASE: The Guard's Report  — difficulty 3 — The Roman Inquiry
// BIBLICAL FOCUS: Matthew 28:11–15
// PROPHECY: Psalm 2:1–4 | Matthew 12:40
// ============================================================

export const act4CaseD = {
  id: "roman_inquiry",
  title: "The Guard's Report",
  subtitle: "A Roman guard detail has returned from the garden tomb with a story that breaks military law. What are they hiding?",
  location: "antonia_fortress",
  difficulty: 3,
  requires: "resurrection",
  actLabel: "Act IV",
  color: 0xa78bfa,
  quest: { name: "Interrogate the Legion", task: "Expose financial anomalies", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Following the supernatural opening of the tomb, members of the Roman guard detail rushed into the city. Instead of reporting directly to Pilate—which would mean immediate execution for losing a post—they went to the chief priests. The Sanhedrin gave the soldiers a large sum of money, instructing them to spread a cover story: "His disciples came during the night and stole him away while we were asleep."`,
    significance: `This case exposes the extreme lengths to which the political apparatus went to manufacture a counter-narrative. The absurdity of the official cover story (witnessing a theft while completely unconscious) historically validates that the tomb was undeniably empty.`,
    historicalNote: `Under Roman military discipline (*Disciplinam Militarem*), sleeping on watch or failing to guard a sealed state target carried the mandatory penalty of being beaten or executed by crucifixion. Soldiers would never confess to sleeping unless guaranteed absolute political immunity from the highest levels.`,
  },

  prophecies: [
    {
      reference: "Psalm 2:1–2",
      text: `"Why do the nations conspire and the peoples plot in vain? The kings of the earth rise up and the rulers band together against the LORD and against his anointed."`,
      written: "~1000 BC",
      fulfilledBy: "The Roman military and Jewish Sanhedrin combining forces to suppress the resurrection",
      gospelLink: "Matthew 28:12–14",
      insight: "Human institutions frequently coordinate their efforts to lock down the truth, yet God laughs their conspiracies to scorn.",
    },
  ],

  evidencePool: [
    {
      id: "bribe_shekels",
      name: "High-Grade Sanctuary Coins",
      type: "physical",
      icon: "💰",
      pos: [-2, 5, 0],
      snippet: "A heavy canvas pouch filled with pristine Temple shekels.",
      description: "A large sum of silver coins found hidden inside a Roman legionary's standard gear locker inside the fortress. Roman soldiers were paid in imperial denarii, making this Jewish religious currency completely irregular.",
      propheticLink: "Matthew 28:12 records that the chief priests met with the elders and devised a plan, giving the soldiers a 'large sum of money.'",
      investigatorNote: "The high transaction value indicates this wasn't common marketplace spending money. This is institutional hush money directly from the treasury.",
    },
    {
      id: "broken_imperial_seal",
      name: "Snapped Clay Roman Seal",
      type: "physical",
      icon: "🏷️",
      pos: [4, -2, 0],
      snippet: "Hardened clay fragments showing the stamp of the Roman Governor.",
      description: "Pieces of the structural sealing clay that tied the chord across the tomb door, cleanly fractured and thrown into the dirt.",
      propheticLink: "Matthew 27:66 notes they went and made the tomb secure by 'putting a seal on the stone and posting the guard.'",
      investigatorNote: "To break this seal without authorization was a high treasonous offense against Caesar himself. No thief would carefully snap the clay and leave it behind; it bears signs of a violent, percussive structural displacement.",
    },
    {
      id: "shattered_spear",
      name: "Shattered Pilum Shaft",
      type: "physical",
      icon: "🗡️",
      pos: [0, -4, 0],
      snippet: "An ash-wood Roman spear snapped cleanly down the middle.",
      description: "A heavy legionary spear fractured by clean kinetic force, left behind in the garden grass near the shifted rock.",
      propheticLink: "Matthew 28:2 states there was a violent earthquake, for an angel of the Lord came down from heaven and rolled back the stone.",
      investigatorNote: "This spear wasn't cut by a sword in combat; the wood fibers show high-impact compression failure, consistent with an external physical shockwave that knocked the sentries flat.",
    },
  ],

  suspects: [
    {
      id: "sentry_lucas",
      name: "Lucas of the Tenth Legion",
      role: "Tomb Guard Sentry",
      avatar: "💂",
      color: 0xffaa44,
      pos: [0, 0, 0],
      bibleRef: "Matthew 28:13",
      background: "A seasoned auxiliary legionary assigned to the special security detail stationed at the garden tomb.",
      dialogue: {
        neutral: "We fell asleep. The night was long. The disciples sneaked in like ghosts and robbed the place. That is our statement.",
        cautious: "Look, if the Governor hears about this, my life is forfeit. But the High Priest promised that if this reaches Pilate's ears, they will satisfy him and keep us out of trouble. I'm just following orders.",
      },
      contradictions: {
        "bribe_shekels+broken_imperial_seal": {
          exposed: "You think a handful of unarmed galilean fishermen broke a Roman imperial seal while an elite unit slept right next to it? We didn't sleep! The ground split open, and a light like lightning blinded us. We woke up paralyzed, and the body was gone. The priests paid us to lie because the truth scares them to death!"
        },
      },
    },
  ],

  deductions: {
    "bribe_shekels+broken_imperial_seal": {
      link: {
        text: "The silver currency from the temple treasury directly connects to the broken security parameters of the Roman state.",
        insight: "The Sanhedrin is actively financing the cover-up of a Roman security failure. This proves that an event occurred which both factions desperately need to hide from the public record.",
        isKey: true,
        bibleRef: "Matthew 28:11–12",
      },
    },
    "broken_imperial_seal+shattered_spear": {
      link: {
        text: "The physical damage at the scene points to structural and environmental trauma, not a stealthy grave robbery.",
        insight: "Thieves do not fracture weapons and shatter seals with concussive force while leaving the valuable burial linens perfectly intact inside.",
        isKey: false,
        bibleRef: "John 20:6–7",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no grave robbery. The resurrection was a real, supernatural event that shattered the physical boundaries of the tomb, causing the guards to flee in terror.",
    method: "God raised Jesus on the third morning, accompanied by an earthquake and an angelic manifestation. The terrified guards ran to the chief priests, who chose to bribe the soldiers to distribute a fabricated theft narrative to prevent a total collapse of their religious authority.",
    lesson: "The existence of the bribe and the logical vulnerability of the official cover story serve as absolute legal confirmation of the empty tomb. The world's systems will spend any amount of silver to silence the reality of the resurrected King.",
    prophesyFulfilled: ["Psalm 2:1–4", "Matthew 12:40"],
    furtherReading: ["Matthew 28:11–15"],
  },
};