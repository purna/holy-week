// ============================================================
// CASE: The Missing Science Trophy  — difficulty 1 — School
// ============================================================

export const schoolCase = {
  id: "school_trophy",
  title: "The Missing Trophy",
  subtitle: "Something valuable has disappeared from the science lab.",
  location: "school",
  difficulty: 1,
  requires: null,   // always unlocked

  intro: "The school's Regional Science Award trophy has vanished overnight. The principal is furious. Three students were seen near the lab that evening.",

  suspects: [
    { id: "alex",   name: "Alex Chen",   role: "Student",       avatar: "👦" },
    { id: "mia",    name: "Mia Torres",  role: "Student",       avatar: "👧" },
    { id: "mr_lin", name: "Mr Lin",      role: "Lab Technician", avatar: "👨‍🔬" },
  ],

  evidencePool: [
    {
      id: "muddy_shoes",
      name: "Muddy Shoes",
      type: "physical",
      desc: "A pair of trainers with soil matching the greenhouse behind the lab.",
      location: "Changing rooms",
      icon: "👟",
    },
    {
      id: "fingerprint",
      name: "Fingerprint",
      type: "analytical",
      desc: "A clear print lifted from the trophy cabinet. Sent for matching.",
      location: "Science lab",
      icon: "🖐",
    },
    {
      id: "keycard_log",
      name: "Keycard Log",
      type: "digital",
      desc: "The lab door log shows entry at 21:42 — after school hours.",
      location: "Security office",
      icon: "💳",
    },
    {
      id: "witness_note",
      name: "Witness Note",
      type: "testimonial",
      desc: "A Year 8 student says they saw someone with a bag near the lab at 9pm.",
      location: "Corridor",
      icon: "📝",
    },
    {
      id: "greenhouse_soil",
      name: "Greenhouse Soil Sample",
      type: "environmental",
      desc: "Soil from the greenhouse — unique clay composition, not found elsewhere.",
      location: "Greenhouse",
      icon: "🌱",
    },
    {
      id: "trophy_bag",
      name: "Trophy-Sized Bag",
      type: "physical",
      desc: "A canvas bag found in Alex's locker. Fits the trophy exactly.",
      location: "Alex's locker",
      icon: "🎒",
    },
  ],

  npcs: [
    {
      id: "alex",
      name: "Alex Chen",
      avatar: "👦",
      truthfulness: 0.4,
      dialogue: {
        neutral:   "I was at football practice. Ask the coach.",
        cautious:  "Why do you keep asking me? I didn't go near the lab.",
        pressured: "Look, I was near the building, okay? But I didn't go inside.",
        exposed:   "Fine! I went in to look at my project results. The trophy was already gone!",
        repeat:    "I've already said what I know about that.",
      },
      reactions: {
        muddy_shoes:  { text: "Those aren't mine. Anyone could have left those.", isLie: true },
        fingerprint:  { text: "That's impossible. I never touched the cabinet.", isLie: true },
        keycard_log:  { text: "That's… someone must have used a copied card.", isLie: true, revealedClue: "trophy_bag" },
        trophy_bag:   { text: "I can explain that bag—", isLie: false },
      },
      contradictions: {
        "keycard_log+witness_note": {
          exposed: "Alright — yes, that's me on the log. But I swear I only went to check my project marks. The trophy was gone when I got there.",
        },
        "muddy_shoes+greenhouse_soil": {
          exposed: "Okay, I cut through the greenhouse path. It's a shortcut. That's all.",
        },
      },
    },
    {
      id: "mia",
      name: "Mia Torres",
      avatar: "👧",
      truthfulness: 0.9,
      dialogue: {
        neutral:   "I left at 5. I saw Alex hanging around near the lab though.",
        cautious:  "Is Alex in trouble? I don't want to get anyone in trouble.",
        pressured: "I really did see him. He had a big bag with him.",
        exposed:   "I saw him go in. He used his keycard. I didn't say anything because I thought he had a reason.",
        repeat:    "I think I've told you everything I know.",
      },
      reactions: {
        witness_note:  { text: "That's me — I left that note. I wanted to help but stay anonymous.", isLie: false },
        keycard_log:   { text: "21:42 — yes, that's about when I saw him.", isLie: false },
        muddy_shoes:   { text: "Alex always cuts through the greenhouse. Everyone knows that.", isLie: false, revealedClue: "greenhouse_soil" },
      },
      contradictions: {},
    },
    {
      id: "mr_lin",
      name: "Mr Lin",
      avatar: "👨‍🔬",
      truthfulness: 0.85,
      dialogue: {
        neutral:   "I locked up at 5:30. Everything was fine when I left.",
        cautious:  "Security said someone used a student keycard after hours.",
        pressured: "I don't give out my override codes, if that's what you're implying.",
        exposed:   "I do know Alex asked me last week if the trophy would be locked away. I thought nothing of it.",
        repeat:    "Nothing more I can add, I'm afraid.",
      },
      reactions: {
        keycard_log: { text: "I reviewed this myself. It's a student-band card, not staff.", isLie: false },
        fingerprint: { text: "The lab gets the fingerprints matched through the office. Results should be back today.", isLie: false, revealedClue: "trophy_bag" },
        trophy_bag:  { text: "That bag — I've seen Alex with that bag before, actually.", isLie: false },
      },
      contradictions: {},
    },
  ],

  // Key deductions players can unlock
  deductions: {
    "muddy_shoes+greenhouse_soil": {
      compare: { text: "The soil on the shoes is an exact match to the greenhouse sample — same clay, same moisture content.", insight: "Alex walked through the greenhouse that evening.", isKey: true },
      link:    { text: "The shoes place Alex at the greenhouse path — the route to the lab after hours.", insight: "The route was deliberate.", isKey: true },
    },
    "keycard_log+witness_note": {
      compare: { text: "The keycard entry at 21:42 matches exactly when the witness saw someone near the lab.", insight: "The witness saw the person who used the keycard.", isKey: true },
      timeline:{ text: "First: Alex near the lab (witness). Then: keycard entry at 21:42. This is a tight window.", insight: "Timeline places Alex at the scene.", isKey: true },
    },
    "fingerprint+trophy_bag": {
      link:       { text: "The print on the cabinet matches the same person who owned the bag — connecting physical presence to intent.", insight: "The bag was prepared before the theft.", isKey: true },
      contradict: { text: "Alex says he never touched the cabinet, but the fingerprint says otherwise.", insight: "Alex lied about being in the lab.", isKey: true },
    },
  },

  truth: {
    culprit: "alex",
    motive:  "Alex believed the trophy should have been awarded to him. He planned to hide it temporarily as a protest.",
    method:  "Used his keycard after hours, entered the lab, took the trophy in a bag he brought from home.",
    lesson:  "Digital logs, physical traces, and witness accounts together form an irrefutable chain of evidence.",
  },
};
