// ============================================================
// CASE: The Vanishing Exhibit  — difficulty 2 — Museum
// ============================================================

export const museumCase = {
  id: "museum_exhibit",
  title: "The Vanishing Exhibit",
  subtitle: "A priceless artefact disappears on opening night.",
  location: "museum",
  difficulty: 2,
  requires: "school_trophy",   // unlocks after school case solved

  intro: "A rare Roman coin, valued at £40,000, has gone missing from the new exhibition. Security footage shows a 4-minute gap. Three people had after-hours access that night.",

  suspects: [
    { id: "curator",  name: "Dr Hana Park",  role: "Chief Curator",    avatar: "👩‍🎨" },
    { id: "guard",    name: "Benny Walsh",   role: "Security Guard",   avatar: "💂" },
    { id: "restorer", name: "Otto Krebs",    role: "Art Restorer",     avatar: "🧑‍🔧" },
  ],

  evidencePool: [
    {
      id: "camera_gap",
      name: "CCTV Gap",
      type: "digital",
      desc: "Footage cuts for exactly 4 minutes at 23:17. Too precise to be a fault.",
      location: "Security room",
      icon: "📹",
    },
    {
      id: "glove_fibre",
      name: "Latex Glove Fibre",
      type: "physical",
      desc: "A single fibre from a latex glove caught on the display case latch.",
      location: "Exhibition hall",
      icon: "🧤",
    },
    {
      id: "tool_marks",
      name: "Tool Marks",
      type: "physical",
      desc: "Fine scratches on the case lock consistent with a jeweller's pick tool.",
      location: "Display case",
      icon: "🔧",
    },
    {
      id: "access_log",
      name: "Access Badge Log",
      type: "digital",
      desc: "Otto Krebs' badge logged entry to the restoration room at 23:15.",
      location: "Digital archives",
      icon: "🪪",
    },
    {
      id: "insurance_doc",
      name: "Insurance Document",
      type: "analytical",
      desc: "The coin was insured for triple its market value — taken out last week.",
      location: "Admin office",
      icon: "📄",
    },
    {
      id: "restorer_tools",
      name: "Restorer's Tool Kit",
      type: "physical",
      desc: "Otto's kit contains a jeweller's pick — identical profile to the marks on the case.",
      location: "Restoration room",
      icon: "🧰",
    },
  ],

  npcs: [
    {
      id: "curator",
      name: "Dr Hana Park",
      avatar: "👩‍🎨",
      truthfulness: 0.8,
      dialogue: {
        neutral:   "This is a disaster. That coin was on loan. We're liable.",
        cautious:  "I've worked here twelve years. My reputation is impeccable.",
        pressured: "Are you suggesting I had something to do with this?",
        exposed:   "Yes, I arranged the insurance. Any sensible curator would. That doesn't make me a thief.",
        repeat:    "I have nothing more to add.",
      },
      reactions: {
        insurance_doc: { text: "I arranged that policy. It's standard practice for high-value loans.", isLie: false },
        camera_gap:    { text: "I reported that gap myself. I noticed it at 7am.", isLie: false },
        tool_marks:    { text: "Only Otto would have the tools for something like that.", isLie: false, revealedClue: "restorer_tools" },
      },
      contradictions: {},
    },
    {
      id: "guard",
      name: "Benny Walsh",
      avatar: "💂",
      truthfulness: 0.6,
      dialogue: {
        neutral:   "I did my rounds every 30 minutes. Nothing was out of order.",
        cautious:  "The gap in the footage? That was a system glitch, I reported it.",
        pressured: "I don't know anything about picking locks. I'm a guard, not a thief.",
        exposed:   "Okay — I stepped outside for a smoke at 23:15. I shouldn't have. But I didn't take anything.",
        repeat:    "I've said everything I'm going to say.",
      },
      reactions: {
        camera_gap:  { text: "I told you, it's a system thing. It happened before.", isLie: true },
        access_log:  { text: "Otto was working late? Seems suspicious to me.", isLie: false },
        glove_fibre: { text: "I wear gloves on duty. Standard issue. Not latex though.", isLie: false },
      },
      contradictions: {
        "camera_gap+access_log": {
          exposed: "Alright. I stepped out at 23:14 for a cigarette. I was gone maybe six minutes. I shouldn't have left the floor. I didn't see anyone go past.",
        },
      },
    },
    {
      id: "restorer",
      name: "Otto Krebs",
      avatar: "🧑‍🔧",
      truthfulness: 0.3,
      dialogue: {
        neutral:   "I was restoring a bronze piece in the back room. I left at midnight.",
        cautious:  "The badge log? Yes, that's accurate. I was in early.",
        pressured: "Those tool marks could come from any jeweller's pick. It's a common tool.",
        exposed:   "I want a lawyer.",
        repeat:    "I think I've said too much already.",
      },
      reactions: {
        access_log:      { text: "I was logged in — yes. I was doing my job.", isLie: false },
        tool_marks:      { text: "That scratch pattern is generic. Means nothing.", isLie: true },
        restorer_tools:  { text: "That kit is for restoration work. Completely legitimate.", isLie: true },
        glove_fibre:     { text: "I always wear gloves with antiques. Oils from your hands damage them.", isLie: true, revealedClue: null },
      },
      contradictions: {
        "tool_marks+restorer_tools": {
          exposed: "The marks match my pick, yes. But I use it for work. Someone else could have taken it from my kit.",
        },
        "access_log+camera_gap": {
          exposed: "I was in the building when the camera cut. I can see how that looks. I want a lawyer.",
        },
      },
    },
  ],

  deductions: {
    "access_log+camera_gap": {
      timeline:   { text: "Otto's badge logs him entering at 23:15 — exactly 2 minutes before the CCTV goes dark. The timing is not coincidental.", insight: "Otto was in position when the camera went down.", isKey: true },
      compare:    { text: "The access log and camera gap overlap perfectly. Someone who knew the system cut the feed as they moved.", insight: "The blackout was planned, not accidental.", isKey: true },
    },
    "tool_marks+restorer_tools": {
      link:       { text: "The scratches on the case latch match the exact profile of Otto's jeweller's pick — a specialist tool not available to the public.", insight: "Otto's specific tool was used to open the case.", isKey: true },
      contradict: { text: "Otto claims the marks are generic, but the pick profile is unique to his kit. His denial doesn't hold.", isKey: true },
    },
    "glove_fibre+restorer_tools": {
      link:       { text: "Latex gloves + specialist tool = a restorer preparing for a job that isn't restoration.", insight: "The glove and tool together show preparation.", isKey: true },
    },
    "insurance_doc+camera_gap": {
      compare:    { text: "Insurance arranged last week. Camera cut on the night. These are independent facts pointing in the same direction.", insight: "Someone knew the theft was coming.", isKey: false },
    },
  },

  truth: {
    culprit: "restorer",
    motive:  "Otto was offered a large sum by a private collector to acquire the coin quietly. He planned it over two weeks.",
    method:  "Entered restoration room with legitimate access, disabled CCTV via the system he knew from previous security work, picked the display case lock with his jeweller's tool.",
    lesson:  "Access logs, physical tool evidence, and the precision of the CCTV blackout together confirm premeditation — not coincidence.",
  },
};
