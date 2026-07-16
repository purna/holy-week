
import { formatIntro } from './utils.js';


// ============================================================
// CASE: The Empty Tomb  — difficulty 3 — Garden
// BIBLICAL FOCUS: Matthew 28:1–10, Mark 16:1–8, Luke 24:1–12, John 20:1–18
// PROPHECY: Psalm 16:10 | Hosea 6:2 & Jonah 1:17 | Isaiah 53:10–11
// ============================================================

export const act4CaseA = {
  id: "resurrection",
  title: "The Empty Tomb",
  subtitle: "The sealed tomb is open. The body is gone. The guards have fled. What happened on the third day?",
  location: "garden",
  eventLocation: "Garden Tomb, Golgotha",
  timeOfDay: "day",
  difficulty: 3,
  requires: "crucifixion_site",
  actLabel: "Act IV",
  color: 0xa78bfa,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Garden Investigation", task: "Find the body", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Early on Sunday morning, Nisan 17, three days after the crucifixion, Mary Magdalene came to the tomb in the garden near Golgotha. She found the stone rolled away, the tomb empty, and — according to John's Gospel — initially thought the body had been stolen (John 20:2). But as the morning unfolded, multiple witnesses reported encounters with a risen Jesus: first Mary Magdalene alone (John 20:11–18), then the other women (Matthew 28:9–10), then Peter (1 Corinthians 15:5), then two disciples on the Emmaus road (Luke 24:13–35), and finally the eleven apostles in a locked room (John 20:19–23).`,
    significance: `The resurrection is the pivotal claim of Christianity. Paul wrote: 'If Christ has not been raised, your faith is futile' (1 Corinthians 15:17). But it was also the most precisely predicted event in the Passion narrative — Psalm 16:10, Hosea 6:2, Jonah 1:17, and Isaiah 53:10–11 all pointed toward it. Jesus himself predicted it three times (Matthew 16:21, 17:23, 20:19). The evidence at the tomb — the folded linens, the rolled stone, the guard report — all points toward something for which 'theft' is an inadequate explanation.`,
    historicalNote: `The tomb was a wealthy man's tomb — Joseph of Arimathea's, hewn from rock in the garden near Golgotha (John 19:41). This fulfilled Isaiah 53:9 ('buried with the rich'). A large stone (Greek: lithos) sealed the entrance — estimates suggest it weighed 1–2 tonnes. The Roman guard (koustodia) was a 4–16 man unit assigned to prevent exactly the situation they now had to report. Matthew 28:11–15 records that the chief priests bribed the soldiers to say the disciples stole the body while they slept — a story with obvious problems: soldiers asleep on duty faced execution; if they were asleep, how did they see what happened?`,
  },

  prophecies: [
    {
      reference: "Psalm 16:10",
      id: "psalm_16_10",
      icon: "🔮",
      text: `"For you will not abandon my soul to Sheol, or let your holy one see corruption."`,
      written: "~1000 BC",
      fulfilledBy: "Jesus rising before His body could decay, leaving only the burial linens",
      gospelLink: "Acts 2:27–31 — Peter quotes Psalm 16:10 at Pentecost and explicitly applies it to Jesus's resurrection",
      insight: "David wrote Psalm 16 in first person, but Acts 2:29–31 records Peter explaining that David was a prophet who 'seeing what was ahead, spoke about the resurrection of the Messiah, that he was not abandoned to the realm of the dead, nor did his body see decay.' The empty tomb is the physical evidence of this 1,000-year-old promise kept.",
      explanation: "The resurrection on the third day, before the body could begin to decay, is the ultimate fulfillment of this promise. The empty tomb is its physical proof.",
    },
    {
      reference: "Hosea 6:2",
      id: "hosea_6_2",
      icon: "🔮",
      text: `"After two days he will revive us; on the third day he will restore us, that we may live in his presence."`,
      written: "~750 BC",
      fulfilledBy: "Jesus rising on the third day after crucifixion",
      gospelLink: "1 Corinthians 15:4 — Paul writes the resurrection happened 'according to the Scriptures,' citing the third-day pattern",
      insight: "Jesus predicted His own third-day resurrection three times in the Gospels (Matthew 16:21, 17:23, 20:19). He drew on the pattern of Hosea 6:2 and the sign of Jonah (Jonah 1:17, Matthew 12:40). Paul's use of 'according to the Scriptures' (1 Corinthians 15:3–4) is the earliest written attestation that the church understood the resurrection as prophetic fulfilment.",
      explanation: "Jesus explicitly identified His resurrection with the 'sign of Jonah.' The timing—on the third day—was a consistent prophetic pattern.",
    },
    {
      reference: "Jonah 1:17 / Matthew 12:40",
      id: "jonah_1_17___matthew_12_40",
      icon: "🔮",
      text: `"For just as Jonah was three days and three nights in the belly of the great fish, so will the Son of Man be three days and three nights in the heart of the earth."`,
      written: "~800 BC / AD 28",
      fulfilledBy: "Jesus's three days in the tomb, followed by resurrection",
      gospelLink: "Matthew 12:40 — Jesus explicitly identifies Himself with Jonah when challenged for a sign",
      insight: "This is one of the most precise self-fulfilling prophecies in Scripture — Jesus named His own death and resurrection timing using the Jonah metaphor when challenged by Pharisees for miraculous proof. The empty tomb on the third day was the 'sign of Jonah' He had promised.",
      explanation: "Jesus explicitly identified His resurrection with the 'sign of Jonah.' The timing—on the third day—was a consistent prophetic pattern.",
    },
    {
      reference: "Isaiah 53:10–11",
      id: "isaiah_53_10_11",
      icon: "🔮",
      text: `"Yet it was the will of the LORD to crush him; he has put him to grief; when his soul makes an offering for guilt, he shall see his offspring and prolong his days... After his anguish he shall see light and be satisfied."`,
      written: "~700 BC",
      fulfilledBy: "Jesus's resurrection — 'prolonging his days' after the sacrifice; 'seeing light' after death",
      gospelLink: "John 20:11–18; Luke 24:13–35 — Jesus appears alive after the suffering",
      insight: "The Suffering Servant song of Isaiah 53 contains a remarkable internal paradox: the servant is 'cut off from the land of the living' (v.8), assigned a grave (v.9), and yet he 'shall see his offspring and prolong his days' (v.10). The only way to reconcile these statements is resurrection. Jesus's post-resurrection appearances fulfilled Isaiah's paradox.",
      explanation: "This paradox within Isaiah's prophecy—a figure who is killed yet lives on—can only be resolved through resurrection.",
    },
    {
      reference: "Psalm 22:1–31",
      id: "psalm_22_1_31",
      icon: "🔮",
      text: `"My God, my God, why have you forsaken me?... They will come and proclaim his righteousness, declaring to a people yet unborn: He has done it!"`,
      written: "~1000 BC",
      fulfilledBy: "Psalm 22 begins with the crucifixion cry (v.1, quoted by Jesus from the cross) and ends with resurrection proclamation (v.31)",
      gospelLink: "Matthew 27:46 (crucifixion); the closing verses of Psalm 22 look beyond the suffering to vindication",
      insight: "Psalm 22 is a remarkable document: it begins with abandonment and describes crucifixion details (hands and feet pierced, v.16; garments divided by lots, v.18) before ending in triumphant proclamation. The Psalm is both a lament and a resurrection song — which is why Jesus quoted its opening from the cross, perhaps pointing His listeners to its ending.",
      explanation: "The crucifixion psalm ends not in defeat, but in a proclamation of victory to be declared to future generations.",
    },
    {
      reference: "Isaiah 26:19",
      id: "isaiah_26_19",
      icon: "🔮",
      text: `"Your dead will live, LORD; their bodies will rise — let those who dwell in the dust wake up and shout for joy."`,
      written: "~700 BC",
      fulfilledBy: "The supernatural opening of the tomb allowing witnesses to see the resurrection result",
      insight: "The stone was not moved to let Jesus out, but to let the world look in. This fulfilled the promise of the dead rising to bring joy to those dwelling in the dust.",
      explanation: "The stone was not moved to let Jesus out, but to let the world look in. This fulfilled the promise of the dead rising to bring joy to those dwelling in the dust.",
    },
  ],

  intro: formatIntro(`It is early Sunday morning, Nisan 17. Three women — Mary Magdalene, Mary the mother of James, and Salome — have come to the garden tomb at first light to complete the anointing of Jesus's body. They were worried about who would roll the stone away. But when they arrive: the stone is already moved. The Roman guard post is abandoned. The tomb is open, and **empty**. Two strange figures in white are inside. And then — Mary Magdalene sees someone she mistakes for the gardener, until He speaks her name. You are the investigative scribe. What happened here? And can the evidence in this garden account for the _most important claim in history_?`),

  suspects: [
    { id: "mary_magdalene", name: "Mary Magdalene", role: "Disciple, First Witness", avatar: "👩", bibleRef: "John 20:1–18; Mark 16:9" },
    { id: "marcus", name: "Marcus", role: "Roman Soldier, Guard Detail", avatar: "🛡️", bibleRef: "Matthew 27:62–66; 28:11–15" },
    { id: "joseph", name: "Joseph of Arimathea", role: "Secret Disciple, Tomb Owner", avatar: "🧓", bibleRef: "Matthew 27:57–61; John 19:38–42" },
    { id: "none", name: "No One", role: "Not Stolen", avatar: "❓", bibleRef: null },

  ],

  evidencePool: [
    {
      id: "rolled_stone",
      name: "The Displaced Sealing Stone",
      type: "physical",
      relatedProphecy: "isaiah_26_19",
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
      revealsSuspect: "none",
      type: "physical",
      relatedProphecy: "psalm_16_10",
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
      relatedProphecy: "psalm_16_10",
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
      relatedProphecy: "psalm_16_10",
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
      revealsSuspect: "none",
      type: "analytical",
      relatedProphecy: "hosea_6_2",
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
      relatedProphecy: "isaiah_53_9",
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
      relatedProphecy: "isaiah_53_10_11",
      icon: "👁️",
      location: "Garden, Near the Tomb Entrance",
      desc: "Mary Magdalene's first-person account, recorded by John: 'I saw the Lord.' She had initially mistaken the risen Jesus for the gardener. He said one word — her name: 'Mary.' She turned and recognised Him. 'Rabboni!' He told her not to cling to Him, for He had not yet ascended to the Father, and sent her to tell the disciples.",
      bibleRef: "John 20:11–18 — the most detailed and intimate resurrection appearance account in Scripture.",
      propheticLink: "Isaiah 43:1 — 'I have called you by name; you are mine.' The risen Christ's first post-resurrection act was to call a woman by name — the same woman from whom He had cast seven demons (Luke 8:2). His resurrection announcement went first to the most socially marginalised witness — deliberate and counter-cultural. In a Roman court, a woman's testimony was inadmissible. If the disciples were fabricating a resurrection, they would not have made a woman — and a former demoniac — the primary witness.",
      investigatorNote: "The fact that Mary Magdalene is the primary resurrection witness is powerful evidence of authenticity. No first-century Jewish or Roman author inventing a resurrection story would choose a woman as the lead witness. This detail is counterproductive to fabrication — which is exactly why it's credible.",
    },
  ],

  lab: [
    {
      evidence: "burial_linen",
      suspect: "mary_magdalene",
      result: "**Identified as Witness** (Discovered the empty tomb)"
    },
    {
      evidence: "rolled_stone",
      suspect: "marcus",
      result: "**Implicated in Failure** (The seal he guarded was broken)"
    },
    {
      evidence: "spice_jars",
      suspect: "joseph",
      result: "**Cleared** (His intention was to anoint a body, not hide one)"
    }
  ],

  npcs: [
    {
      id: "mary_magdalene",
      name: "Mary Magdalene",
      role: "Disciple, First Witness",
      avatar: "👩",
      unlocksSuspects: ["mary_magdalene"],
      profileFile: "mary_magdalene",
      truthfulness: 0.98,
      bibleRef: "John 20:1–18; Mark 16:9; Luke 8:1–3",
      hasDialogue: true,
      storyFile: "mary_magdalene",
      unlocksEvidence: ["mary_encounter", "angelic_witness", "empty_tomb", "burial_linen"],
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
        angelic_witness: { text: "Two figures — like bright light. They asked me, 'Woman, why are you weeping?' I said, 'They have taken my Lord, and I don't know where they have laid him.' And then I turned around.", isLie: false, revealedClue: "burial_linen" },
        spice_jars: { text: "I set them down when I saw the stone was moved. I didn't need them anymore — but I didn't know that yet. I just stood there staring.", isLie: false, revealedClue: "empty_tomb" },
        rolled_stone: { text: "I was so worried about the stone. It's so heavy! But it was already pushed aside. That's when I saw the tomb was open and empty.", isLie: false, revealedClue: "empty_tomb" },
        mary_encounter: { text: "He called my name. That's all it took. 'Mary.' I knew His voice. I knew it the way I knew my own name. Three years I'd been with this man. He was dead — I watched Him die — and there He stood. What would you have done?", isLie: false },
      },
contradictions: {},
     },
    {
       id: "marcus",
       name: "Marcus",
       role: "Roman Soldier, Guard Detail",
       avatar: "🛡️",
       unlocksSuspects: ["marcus"],
      profileFile: "garrison_guard",
       truthfulness: 0.6,
       bibleRef: "Matthew 27:62–66; 28:2–4; 28:11–15",
       hasDialogue: true,
       storyFile: "execution_soldier",
       unlocksEvidence: ["guard_report", "rolled_stone"],
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
      role: "Secret Disciple, Tomb Owner",
      unlocksSuspects: ["joseph"],
      avatar: "🧓",
      profileFile: "joseph_arimathea",
      truthfulness: 0.9,
      bibleRef: "Matthew 27:57–61; Mark 15:43–47; Luke 23:50–56; John 19:38–42",
      hasDialogue: true,
      storyFile: "joseph_arimathea",
      unlocksEvidence: ["spice_jars"],
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
// PROPHECY: Psalm 2:1–2
// ============================================================

export const act4CaseB = {
  id: "roman_inquiry",
  title: "The Guard's Report",
  subtitle: "A Roman guard detail has returned from the garden tomb with a story that breaks military law. What are they hiding?",
  location: "garden",
  eventLocation: "Garden Tomb, Golgotha",
  timeOfDay: "day",
  difficulty: 3,
  requires: "resurrection",
  actLabel: "Act IV",
  color: 0xa78bfa,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Interrogate the Legion", task: "Expose financial anomalies", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `Following the supernatural opening of the tomb, members of the Roman guard detail rushed into the city. Instead of reporting directly to Pilate—which would mean immediate execution for losing a post—they went to the chief priests. The Sanhedrin gave the soldiers a large sum of money, instructing them to spread a cover story: "His disciples came during the night and stole him away while we were asleep."`,
    significance: `This case exposes the extreme lengths to which the political apparatus went to manufacture a counter-narrative. The absurdity of the official cover story (witnessing a theft while completely unconscious) historically validates that the tomb was undeniably empty.`,
    historicalNote: `Under Roman military discipline (*Disciplinam Militarem*), sleeping on watch or failing to guard a sealed state target carried the mandatory penalty of being beaten or executed by crucifixion. Soldiers would never confess to sleeping unless guaranteed absolute political immunity from the highest levels.`,
  },

  prophecies: [
    {
      reference: "Psalm 2:1–2",
      id: "psalm_2_1_2",
      icon: "🔮",
      text: `"Why do the nations conspire and the peoples plot in vain? The kings of the earth rise up and the rulers band together against the LORD and against his anointed."`,
      written: "~1000 BC",
      fulfilledBy: "The Roman military and Jewish Sanhedrin combining forces to suppress the resurrection",
      gospelLink: "Matthew 28:12–14",
      insight: "Human institutions frequently coordinate their efforts to lock down the truth, yet God laughs their conspiracies to scorn.",
      explanation: "The Roman military and the Jewish Sanhedrin collaborating to create a cover-story for the empty tomb is a direct fulfillment of rulers conspiring to suppress God's truth.",
    },
  ],

  evidencePool: [
    {
      id: "bribe_shekels",
      name: "High-Grade Sanctuary Coins",
      relatedProphecy: "psalm_2_1_2",
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
      relatedProphecy: "psalm_2_1_2",
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
      relatedProphecy: "psalm_2_1_2",
      type: "physical",
      icon: "🗡️",
      pos: [0, -4, 0],
      snippet: "An ash-wood Roman spear snapped cleanly down the middle.",
      description: "A heavy legionary spear fractured by clean kinetic force, left behind in the garden grass near the shifted rock.",
      propheticLink: "Matthew 28:2 states there was a violent earthquake, for an angel of the Lord came down from heaven and rolled back the stone.",
      investigatorNote: "This spear wasn't cut by a sword in combat; the wood fibers show high-impact compression failure, consistent with an external physical shockwave that knocked the sentries flat.",
    },
  ],

  evidencePool: [
    {
      id: "bribe_shekels",
      name: "High-Grade Sanctuary Coins",
      relatedProphecy: "psalm_2_1_2",
      type: "physical",
      icon: "💰",
      desc: "A pouch of high-purity silver coins, the kind used for Temple taxes, found in a Roman guard's possession.",
    },
    {
      id: "sanhedrin_report",
      name: "Official Sanhedrin Report",
      type: "analytical",
      icon: "📜",
      desc: "The official report filed by the Sanhedrin, claiming the disciples stole the body while the guards slept.",
    },
  ],
  lab: [
    {
      evidence: "bribe_shekels",
      suspect: "sentry_lucas",
      result: "**Implicated in Bribery** (Possession of the coins links him to the cover-up)"
    },
    {
      evidence: "broken_imperial_seal",
      suspect: "caiaphas",
      result: "**Implicated in Conspiracy** (Authored the false report)"
    }
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
    { id: "none", name: "No One", role: "Not Stolen", avatar: "❓", bibleRef: null },
  ],

  npcs: [
    {
      id: "sentry_lucas",
      name: "Lucas of the Tenth Legion",
      role: "Tomb Guard Sentry",
      avatar: "💂",
      unlocksSuspects: ["sentry_lucas"],
      profileFile: "garrison_guard",
      truthfulness: 0.50,
      bibleRef: "Matthew 28:11–15",
      background: "A veteran legionary auxiliary from the Antonia Fortress garrison[cite: 1]. He was on the final pre-dawn watch when the tomb seal was breached. Caught between mandatory military execution for a failed post and a high-value religious payoff, his panic is extreme.",
      dialogue: {
        neutral: "The shift was standard until the lapse occurred. We fell asleep under heavy exhaustion. The body vanished during our slumber.",
        cautious: "A soldier does not look for trouble in provincial courts. The high priest has given his word that our names are protected with the procurator.",
        pressured: "If I tell you anything else, the cohort will brand me a traitor to the legion standard. We slept. The disciples must have carried out the theft.",
        exposed: "We didn't close our eyes! No human thief could have bypassed our array without drawing steel. The earth groaned, the rock seal tore away with a dynamic concussive shock, and a flash like white lightning left us flat and frozen. When we came to, the chamber was empty. We ran straight to the Temple because Pilate would have nailed us to a timber for it.",
        repeat: "I have given my authorized narrative. Leave my barracks locker alone.",
      },
      reactions: {
        bribe_shekels: { text: "That pouch belongs to the Temple inner treasury, not Rome. The priests weighed it out to us directly in the Sanhedrin chamber. It’s... a security stipend. For our silence.", isLie: true },
        broken_imperial_seal: { 
          text: "The Governor’s seal was snapped clear through. It wasn't chipped or pried off with tools; it exploded off the limestone face during the tremors.", 
          isLie: false, 
          revealedClue: { requiredDeduction: "Payoff", clueId: "bribe_shekels" } 
        },
        shattered_spear: { text: "That is my primary pilum. The ash shaft split from extreme structural compression when the concussive shock knocked us down. No rebel sword made that fracture.", isLie: false, revealedClue: "broken_imperial_seal" },
      },
      contradictions: {},
    },
    {
      id: "chief_priest_caiaphas",
      name: "Caiaphas",
      role: "High Priest, Sadducee",
      avatar: "👨‍⚖️",
      profileFile: "caiaphas",
      truthfulness: 0.30,
      bibleRef: "Matthew 28:11-12; John 11:49-50",
      background: "Joseph ben Caiaphas, managing severe institutional damage control[cite: 1]. He must maintain the stability of the Temple state and protect the nation from an immediate Roman military crackdown by manufacturing an alternate narrative for the empty tomb.",
      dialogue: {
        neutral: "The tomb is empty because of common grave-robbing. Frightened Galileans returned under cover of night to stage a dynamic event.",
        cautious: "The allocation of treasury funds is an internal administrative matter. We frequently compensate secular guards for civic peacekeeping actions.",
        pressured: "The rumor of resurrection is a contagious superstition designed to foster civil unrest. We have taken logical steps to stabilize public interpretation.",
        exposed: "Do you truly think I care about the testimony of a few terrified mercenaries? If the populace believes a dead man broke a Roman seal, a nationalist riot will level this city by sunset. The silver from our treasury buys the narrative that preserves the peace. The truth is whatever prevents an imperial legionary response.",
        repeat: "The Sanhedrin council session is locked. This inquiry is closed.",
      },
      reactions: {
        bribe_shekels: { text: "Tyrian sanctuary silver. We paid it out to secure the soldiers' protection from the Governor’s immediate wrath. It was an act of administrative diplomacy.", isLie: true },
        broken_imperial_seal: { text: "The disciples used precision levers to displace the stone and shatter the clay. A common strategy for ideological martyrs.", isLie: true },
        shattered_spear: { text: "A routine manufacturing flaw in auxiliary equipment. Roman supply chains are famously inconsistent in our province.", isLie: true },
      },
      contradictions: {
        "bribe_shekels+broken_imperial_seal": { exposed: "The soldiers came to us shaking, babbling about angels and lightning! If I let that report reach the streets, our authority collapses instantly. I spent the silver to purchase their story because an open grave robbery is a minor local felony, but a resurrected prophet is a direct threat to our entire system!" },
      },
    },
    {
      id: "pilates_secretary",
      name: "Pilate’s Secretary",
      role: "Administrative Bureaucrat",
      avatar: "📜",
      profileFile: "pilate_secretary",
      truthfulness: 0.90,
      bibleRef: "Matthew 27:65-66; 28:14",
      background: "An educated Roman scribe responsible for auditing legal charges, guard dispatches, and official provincial records inside the Praetorium[cite: 1]. He approaches the entire situation with absolute bureaucratic detachment[cite: 1].",
      dialogue: {
        neutral: "I process the garrison dockets and security ledgers. The official report filed by the sentries states a sleeping lapse occurred.",
        cautious: "The legal ledger contains major inconsistencies. An elite guard detail does not confess to sleeping on a capital assignment without a prior guarantee of executive immunity.",
        pressured: "The High Priest had a private meeting with the Governor this morning. Afterward, the formal misconduct charges against Lucas's unit were quietly struck from the execution log.",
        exposed: "The official theft narrative is an absolute structural farce. Under imperial law, if a guard unit falls completely unconscious on a state watch, they wake up on crosses, not with purses full of high-grade Tyrian silver. The Temple elite bought those men, and the Governor allowed the transaction to preserve provincial tax metrics.",
        repeat: "The docket has been signed and archived. The paperwork is finished.",
      },
      reactions: {
        bribe_shekels: { text: "This silver did not originate from our imperial mints. This is pure Temple coinage. It proves a financial transaction occurred between the Sanhedrin and our auxiliary line.", isLie: false },
        broken_imperial_seal: { text: "The structural fracture on this clay seal shows zero scrape marks from metal tools. It was sheared off by a singular percussive impact wave.", isLie: false },
        shattered_spear: { 
          text: "A standard-issue pilum from our armory. The impact split the wood grains from top to bottom, indicating severe kinetic displacement.", 
          isLie: false,
          revealedClue: { pressured: "bribe_shekels", exposed: "bribe_shekels" }
        },
      },
      contradictions: {},
    },
    {
      id: "mary_resurrection",
      name: "Mary (Resurrection)",
      role: "First Witness",
      avatar: "👩",
      truthfulness: 0.98,
      bibleRef: "John 20:1-18",
      hasDialogue: true,
      storyFile: "mary_resurrection",
      background: "Mary Magdalene, first witness to the risen Jesus. Her testimony became the foundation of the resurrection claim.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "judas_betrayal",
      name: "Judas (Betrayal)",
      role: "Betrayer",
      avatar: "😈",
      truthfulness: 0.3,
      bibleRef: "Matthew 26:14-16,47-50; Mark 14:10-11,43-45",
      hasDialogue: true,
      storyFile: "judas_betrayal",
      background: "The disciple who betrayed Jesus for thirty pieces of silver. His motives remain debated — greed, disillusionment, or something darker.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "herods_servant",
      name: "Herod's Servant",
      role: "Royal Household",
      avatar: "👑",
      truthfulness: 0.5,
      bibleRef: "Luke 23:6-12 (Herod and Pilate)",
      hasDialogue: true,
      storyFile: "herods_servant",
      background: "Served in Herod Antipas household. Saw the political maneuvering around Jesus — Herod wanted a miracle, got silence instead.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
      },
    },
    {
      id: "peter_restored",
      name: "Peter (Restored)",
      role: "Restored Disciple",
      avatar: "🕊️",
      truthfulness: 0.9,
      bibleRef: "John 21:15-19 (Restoration of Peter)",
      hasDialogue: true,
      storyFile: "peter_restored",
      background: "Peter after the resurrection. Restored by Jesus three times to match his three denials. Now a bold witness.",
      dialogue: {
        neutral: "Tell me what you know.",
      },
      reactions: {
        default: { text: "I have nothing more to add.", isLie: false },
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
        id: "Payoff",
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

// ============================================================
// CASE: Peter's Restoration  — difficulty 3 — Sea of Galilee
// BIBLICAL FOCUS: John 21:1-19
// PROPHECY: Zechariah 13:7 & Ezekiel 34:11-16
// ============================================================

export const act4CaseC = {
  id: "peter_restoration",
  title: "Peter's Restoration",
  subtitle: "By the Sea of Galilee, a disciple is confronted with his failures—and given a second chance.",
  location: "garden",
  eventLocation: "Sea of Galilee",
  timeOfDay: "dawn",
  difficulty: 3,
  requires: "roman_inquiry",
  actLabel: "Act IV",
  color: 0xa78bfa,
  worldModel: "../assets/models/sphere.glb",
  showCityLayer: false,
  quest: { name: "Restoration Inquiry", task: "Understand the commission", cur: 0, tar: 7 },

  biblicalContext: {
    summary: `After His resurrection, Jesus appeared to seven disciples by the Sea of Galilee. They had returned to fishing—having caught nothing all night—when a voice from the shore told them to cast their nets on the right side. The catch was miraculous: 153 large fish. When they came ashore, they found Jesus waiting with a charcoal fire and bread. After breakfast, He singled out Peter for a threefold commission that mirrored his threefold denial.`,
    significance: `This scene shows the heart of the risen Christ—restoration, not condemnation. Peter, who had failed miserably, was not only forgiven but reinstated as the leader of the disciples. The threefold question 'Simon, son of John, do you love me?' corresponds to Peter's three denials, and each 'Feed my sheep' commission restores Peter's apostolic authority.`,
    historicalNote: `The charcoal fire is significant—the only time John mentions one in his Gospel. The other charcoal fire was where Peter denied Jesus (John 18:18). Jesus deliberately used fire and fish to trigger Peter's memory of his failure, then transformed that memory into restoration. The 153 fish has been interpreted by early commentators as representing the universal scope of the gospel—all nations would come to faith through Peter's commission.`,
  },

  prophecies: [
    {
      reference: "Zechariah 13:7",
      id: "zechariah_13_7",
      icon: "🔮",
      text: `"Strike the shepherd, and the sheep will be scattered. I will turn my hand against the little ones."`,
      written: "~520 BC",
      fulfilledBy: "Peter's denial and scattering, followed by restoration",
      gospelLink: "Matthew 26:31; John 21:15-19",
      insight: "The scattering of the disciples after Jesus's arrest was prophesied. Peter's restoration shows that God's purposes stand even when human faithfulness fails.",
      explanation: "Peter's denial was a fulfillment of the 'scattered sheep' prophecy. His restoration by the Sea of Galilee, where Jesus commissions him to 'feed my sheep,' is the fulfillment of the Good Shepherd gathering His flock.",
    },
    {
      reference: "Ezekiel 34:11-16",
      id: "ezekiel_34_11-16",
      icon: "🔮",
      text: `"For thus says the Lord GOD: I will seek my sheep... I will rescue them... I will feed them... I will bind up the injured... I will bring back the strayed."`,
      written: "~580 BC",
      fulfilledBy: "Jesus seeking, rescuing, and commissioning Peter to feed His sheep",
      gospelLink: "John 21:15-17",
      insight: "The imagery of shepherding is central—Jesus seeks Peter, binds his wounds, and commissions him to shepherd others.",
      explanation: "Peter's denial was a fulfillment of the 'scattered sheep' prophecy. His restoration by the Sea of Galilee, where Jesus commissions him to 'feed my sheep,' is the fulfillment of the Good Shepherd gathering His flock.",
    },
  ],

  intro: formatIntro(`It is the third morning after the resurrection. Seven disciples—including Peter, Thomas, and Nathanael—have returned to Galilee and spent the night fishing on the Sea. As dawn breaks, a figure on the shore calls out: **'Cast the net on the right side, and you will find something.'** Reluctantly, they obeyed—and the catch was so large they could not haul it in. When they came ashore, they found the resurrected Jesus waiting with bread and fish. But this was not just breakfast—it was a divine appointment to _restore a broken disciple_.`),

  suspects: [
    { id: "peter", name: "Peter", role: "Restored Apostle", avatar: "🕊️", bibleRef: "John 21:15-19" },
    { id: "none", name: "No One", role: "Forgiven", avatar: "❓", bibleRef: null },
  ],

  evidencePool: [
    {
      id: "charcoal_fire",
      name: "The Charcoal Fire",
      relatedProphecy: "zechariah_13_7",
      type: "physical",
      icon: "🔥",
      location: "Shoreline, Sea of Galilee",
      desc: "A small charcoal fire with coals still glowing, the only other charcoal fire mentioned in John's Gospel—the first was where Peter denied Jesus (John 18:18).",
      bibleRef: "John 21:9 — 'When they got out of the boat, they saw a fire of burning coals there with fish lying on it, and bread.'",
      propheticLink: "The fire triggers Peter's memory of his denial, but now transforms that shame into restoration around the risen Christ.",
      investigatorNote: "Peter had warmed himself at a charcoal fire on the night of Jesus's arrest. When he recognized this fire, he knew exactly who stood before him.",
    },
    {
      id: "miraculous_catch",
      name: "The Miraculous Catch",
      relatedProphecy: "ezekiel_34_11-16",
      type: "physical",
      icon: "🐟",
      location: "Nets on the Beach",
      desc: "The disciples' nets still contained 153 large fish—the same number they had caught at Jesus's command. The nets had not torn despite the enormous weight.",
      bibleRef: "John 21:10-11 — 'Bring some of the fish you have just caught... There were so many that the fisherman was not able to haul in the net, for it was torn.'",
      propheticLink: "This echoes the original calling of the disciples (Luke 5:1-11) and demonstrates that obedience to Christ yields supernatural results.",
      investigatorNote: "The number 153 has been interpreted as representing the universality of the gospel—how all nations would come to faith through Peter's commission.",
    },
    {
      id: "bread_breakfast",
      name: "Bread and Fish Breakfast",
      relatedProphecy: "ezekiel_34_11-16",
      type: "physical",
      icon: "🍞",
      location: "Shoreline Meal",
      desc: "Loaves of bread and grilled fish prepared by the risen Jesus Himself—simple fare for a divine meal.",
      bibleRef: "John 21:9 — 'Jesus said, \"Bring some of the fish you have just caught... and come and have breakfast.\"'",
      propheticLink: "The 'bread of life' (John 6) now eats bread with Peter—the broken bread that once condemned him now nourishes him.",
      investigatorNote: "Jesus ate with Peter again, as He had many times before. The intimacy of the meal signals complete restoration.",
    },
    {
      id: "threefold_commission",
      name: "The Threefold Commission",
      revealsSuspect: "none",
      relatedProphecy: "ezekiel_34_11-16",
      type: "testimonial",
      icon: "📜",
      location: "Dialogue with Peter",
      desc: "Peter's account of being asked three times by Jesus: 'Simon, son of John, do you love me?' Each time Peter answered, Jesus responded: 'Feed my sheep.'",
      bibleRef: "John 21:15-17 — 'Feed my lambs... Feed my sheep... Tend my sheep.'",
      propheticLink: "Peter's three denials (crow, cock, fire) are met with three commissions (feed, tend, shepherd) showing prophetic reversal.",
      investigatorNote: "The Greek words for 'love' and 'shepherd' carry deep theological weight—Jesus asks if Peter loves him with agape love, while Peter responds with phileo love. The commission transcends Peter's failure.",
    },
    {
      id: "galilean_apparition",
      name: "Risen Appearance",
      type: "testimonial",
      relatedProphecy: "",
      icon: "👁️",
      location: "Shoreline Recognition",
      desc: "The disciples' recognition moment—how they knew this was Jesus. He had been dead, and now stood before them alive.",
      bibleRef: "John 21:12 — 'Jesus said to them, \"Come and have breakfast.\" None of the disciples dared ask him, \"Who are you?\" because they knew it was the Lord.'",
      propheticLink: "Despite seeing Him die, the disciples knew—supernaturally—who stood before them. Faith recognized its Author.",
      investigatorNote: "Their recognition was immediate. No debate, no rational explanation—just the certainty that comes from intimate relationship.",
    },
  ],

  lab: [
    {
      evidence: "charcoal_fire",
      suspect: "peter",
      result: "**Motive Clarified** (Links his restoration to his earlier denial)"
    },
    {
      evidence: "miraculous_catch",
      suspect: "thomas",
      result: "**Identified as Witness** (His doubt led to physical proof)"
    }
  ],
  npcs: [
    {
      id: "peter",
      name: "Peter",
      role: "Restored Apostle",
      faction: "scribes",
      unlocksSuspects: ["peter"],
      avatar: "🕊️",
      profileFile: "peter",
      color: 0xffaa44,
      pos: [0, 0, 0],
      truthfulness: 0.95,
      bibleRef: "John 21:15-19; 1 Corinthians 1:12",
      hasDialogue: true,
      storyFile: "peter_restored",
      unlocksEvidence: ["charcoal_fire", "threefold_commission"],
      background: "Simon Peter, once a bold fisherman, had denied knowing Jesus three times in the courtyard. Now restored, he would become the foundational apostle of the new church.",
      dialogue: {
        neutral: "I was ashamed. I had told everyone I would die for him—and then I couldn't even admit I knew him.",
        cautious: "When I saw that charcoal fire, I knew. It was the same place where I had warmed my hands and denied him.",
        pressured: "He asked me three times if I loved him. Each time, I said yes. Each time, he told me to feed his sheep. Do you understand what happened there?",
        exposed: "The first time he said 'Feed my lambs.' The second, 'Feed my sheep.' The third, 'Tend my sheep.' Three denials, three commissions. Three deaths, three resurrections of my calling.",
        repeat: "I am not who I was. I am still becoming who he says I am.",
      },
      reactions: {
        charcoal_fire: { text: "I knew immediately. That fire—it was the same kind as in the high priest's courtyard. My hands still trembled when I saw it.", isLie: false },
        miraculous_catch: { text: "We caught nothing all night. Then his voice from the shore: 'Cast the net on the right side.' Reluctantly, we obeyed. The net didn't tear—they never do with him.", isLie: false, revealedClue: "galilean_apparition" },
        threefold_commission: { text: "He asked me if I loved him. Three times. Each time, I answered. Each time, he commissioned me to feed his sheep. The third time, I was hurt—because I knew what he was doing.", isLie: false },
        bread_breakfast: { text: "He invited us to breakfast. The risen Lord—eating bread, eating fish. He could have appeared in glory, but he chose intimacy. That's who he is.", isLie: false },
        galilean_apparition: { text: "None of us asked who he was. We knew. We had seen him die, and yet we knew. It was like seeing your brother after thinking him dead.", isLie: false },
      },
      contradictions: {
        "charcoal_fire+threefold_commission": { exposed: "I wept when he asked me the third time. Not because I was offended—he was right. I had denied him out of fear, not lack of love. And yet he restored me anyway." },
      },
    },
    {
      id: "thomas",
      name: "Thomas",
      role: "Doubting Disciple",
      faction: "scribes",
      avatar: "👨‍🦰",
      profileFile: "thomas",
      color: 0x66aaff,
      pos: [5, 0, 5],
      truthfulness: 0.9,
      bibleRef: "John 21:2; John 14:5, 20:24-29",
      hasDialogue: true,
      storyFile: "parable_meaning",
      background: "Thomas, called 'the Twin,' would later be known as 'Doubting Thomas'—but here he stands as witness to the restoration.",
      dialogue: {
        neutral: "I was here. I saw it all. It's one thing to see him die. It's another to see him eat breakfast with us.",
        cautious: "The net was full—the fish were large. And when we came ashore, there he was. No mistaking. No doubt.",
        pressured: "Peter was pale. I've never seen him look like that—not even when he cut off the soldier's ear. He knew what was coming.",
        exposed: "After breakfast, he took Peter aside. We watched from a distance. Peter kept nodding. Finally, he broke down weeping. The rest of us understood—this was about more than fishing.",
        repeat: "Go ask Peter about what happened. He can tell you better than I.",
      },
      reactions: {
        charcoal_fire: { text: "Peter recognized it immediately. I didn't think about it until later—the same kind of fire where he denied him.", isLie: false },
        miraculous_catch: { text: "I counted them later—153 fish. Large ones, too. The net held, just like when we first followed him.", isLie: false },
        threefold_commission: { text: "Peter came back different. Not just restored—redefined. That was the moment he became the foundation.", isLie: false, revealedClue: "bread_breakfast" },
        bread_breakfast: { text: "He cooked for us. The risen Messiah—cooking breakfast on a charcoal fire. That's the kind of king he is.", isLie: false },
        galilean_apparition: { text: "I recognized him by his voice first. Then by what he did. He still does what he says.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "mary_magdalene",
      name: "Mary Magdalene",
      role: "First Witness",
      faction: "scribes",
      avatar: "👩",
      profileFile: "mary_magdalene",
      color: 0xdd44dd,
      pos: [8, 0, -3],
      truthfulness: 0.98,
      bibleRef: "John 21:1-14",
      hasDialogue: true,
      storyFile: "mary_magdalene",
      unlocksEvidence: ["miraculous_catch"],
      background: "Mary had witnessed the empty tomb, and now stood by as Jesus restored Peter—the same Peter who had been so sure of his own loyalty.",
      dialogue: {
        neutral: "I was there at the tomb. I was there on the shore. I've seen what resurrection does to broken people.",
        cautious: "The women and I followed the disciples that morning. We watched from a distance as Jesus spoke to Peter.",
        pressured: "Peter wept when he understood. Not from shame now—but from being known. That's what he does—he knows us and loves us anyway.",
        exposed: "I've thought about this: the same man who denied him became the rock he builds his church on. What do you make of that?",
        repeat: "He knows every failure. He calls every name. He still builds his kingdom through cracked vessels.",
      },
      reactions: {
        threefold_commission: { text: "Peter had boasted he would die for Jesus. He couldn't even confess him. But the risen Lord knew his heart beyond his failure.", isLie: false },
        galilean_apparition: { text: "When you've seen the empty tomb, you learn to recognize him anywhere. Even cooking breakfast on a beach.", isLie: false },
        charcoal_fire: { text: "Peter's hands—those same hands that had warmed themselves at the courtyard fire—now warmed at this one. Full circle.", isLie: false },
      },
      contradictions: {},
    },
    {
      id: "nathanael",
      name: "Nathanael",
      role: "Honest Disciple",
      faction: "local",
      avatar: "👨‍🌾",
      profileFile: "nathanael_disciple",
      color: 0x88cc88,
      pos: [-5, 0, 7],
      truthfulness: 0.9,
      bibleRef: "John 21:2; John 1:47",
      hasDialogue: true,
      storyFile: "nathanael_disciple",
      background: "Nathanael, whom Jesus called 'an Israelite in whom there is no guile,' was present as a witness to this restoration.",
      dialogue: {
        neutral: "I came from Cana that morning. They told me about the catch, about the fire. I saw Peter's face.",
        cautious: "Peter was different after. Not just healed—redefined. He carried himself like a man who'd been given back his soul.",
        pressured: "I've known him since the beginning. He was always impulsive. But that morning—he was shaken in a way that became strength.",
        exposed: "He had denied the man standing before him. Now he was being asked to lead his people. That's grace.",
        repeat: "Ask him about the commission. I can only tell you what I observed.",
      },
      reactions: {
        miraculous_catch: { text: "I helped haul the net. 153 fish—large ones. The miracle wasn't just in catching them, but that the net held at all.", isLie: false },
        threefold_commission: { text: "I heard the exchange. Peter was pale. Jesus was gentle. It was the kindest confrontation I've ever witnessed.", isLie: false },
        bread_breakfast: { text: "He made them breakfast. The Son of God—making us breakfast. That's the kind of king who restores.", isLie: false },
      },
      contradictions: {},
    },
  ],

  deductions: {
    "charcoal_fire+threefold_commission": {
      compare: {
        text: "The charcoal fire where Peter denied Jesus becomes the fire of his restoration—same element, different outcome.",
        insight: "Jesus doesn't erase our failures; he transforms them into testimony. The place of shame became the place of grace.",
        isKey: true,
        bibleRef: "John 18:18; 21:9-17",
      },
      link: {
        text: "Each denial (by fire, by crow, by man) meets its antidote in each commission (by fire, by voice, by Christ).",
        insight: "This is prophetic reversal—the curse replaced with blessing, the fall with restoration.",
        isKey: true,
        bibleRef: "Zechariah 13:7; Ezekiel 34:11-16",
      },
    },
    "miraculous_catch+threefold_commission": {
      timeline: {
        text: "First: obedience to Christ's command yields the catch. Then: obedience to Christ's commission yields the calling.",
        insight: "Peter's failure came during his independent action (denying). His restoration came through submitting to Christ's word.",
        isKey: true,
        bibleRef: "John 21:3, 15-17",
      },
    },
    "galilean_apparition+bread_breakfast": {
      compare: {
        text: "The risen Christ eats with his disciples—God incarnate sharing a meal with human witnesses.",
        insight: "This confirms the physical resurrection. The appearances were not visions or dreams but real encounters with a bodily raised Jesus.",
        isKey: true,
        bibleRef: "Luke 24:38-43; John 21:12",
      },
    },
  },

  truth: {
    culprit: "none",
    motive: "There was no crime to investigate. This was a divine restoration—Peter's threefold denial met with threefold commission, his shame replaced with grace.",
    method: "Jesus appeared to the disciples after resurrection, used the familiar details of fishing and fire to trigger recognition, then privately restored Peter through the threefold dialogue of love and commission.",
    lesson: "Jesus's restoration of Peter shows that failure never disqualifies us from grace. The same hands that warmed at the courtyard fire now warmed at the shoreline fire—receive mercy, then become mercy.",
    prophesyFulfilled: ["Zechariah 13:7", "Ezekiel 34:11-16", "Jeremiah 3:14"],
    furtherReading: ["John 21:1-19", "1 Corinthians 1:12-14", "Galatians 2:9-21"],
  },
};
