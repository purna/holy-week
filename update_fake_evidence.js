const fs = require('fs');

const fakeData = {
  triumphal_entry_fake: {
    name: 'Questionable Cloak Pin',
    desc: 'A cheap bronze cloak pin found near the eastern gate, stamped with a Roman legion mark that postdates the entry by 30 years. It was likely dropped by a later pilgrim and planted to suggest Roman soldiers were present.',
    bibleRef: 'John 12:19',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'The Roman stamp on this pin is from the 40s AD, decades after the Triumphal Entry. Someone deliberately scattered these pins near the gate to make investigators think Rome had a military presence that the Gospels never mention.',
    bibleRefs: [{ ref: 'John 12:19', link: 'john_1219' }],
    propheticRefs: []
  },
  temple_cleansing_fake: {
    name: 'Fabricated Witness Token',
    desc: 'A small clay token bearing the official seal of the Sadducean family, found near the money changers tables. It claims to be a receipt for temple tax payments, but the seal is from a later high priest.',
    bibleRef: 'John 2:15',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'The seal on this token belongs to a high priest who served 20 years after the cleansing. It was planted by someone wanting to frame Jesus for theft — to make it look like He took money from the treasury.',
    bibleRefs: [{ ref: 'John 2:15', link: 'john_215' }],
    propheticRefs: []
  },
  withered_fig_tree_fake: {
    name: 'Altered Fig Leaf Sample',
    desc: 'A fig leaf preserved in wax, allegedly from the cursed tree. Testing reveals it was treated with copper salts to make it look freshly picked, when it was actually harvested months earlier.',
    bibleRef: 'Mark 11:13–14',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'The Pharisees agents collected leaves from a nearby healthy fig tree and treated them with copper salts to make them appear fresh. They planted this sample to suggest the tree was already dead before Jesus approached it.',
    bibleRefs: [{ ref: 'Mark 11:13-14', link: 'mark_1113_14' }],
    propheticRefs: []
  },
  authority_challenged_fake: {
    name: 'Forged Challenge Scroll',
    desc: 'A scroll bearing the official seals of the Sanhedrin, claiming Jesus admitted to planning a violent uprising. Analysis reveals the ink contains a dye not available in Jerusalem until AD 40.',
    bibleRef: 'Matthew 21:23',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'The Sanhedrin actual challenge to Jesus was about authority, not violence. This scroll was forged decades later by a Roman sympathizer trying to retroactively justify the execution by making Jesus look like a political rebel.',
    bibleRefs: [{ ref: 'Matthew 21:23', link: 'matthew_2123' }],
    propheticRefs: []
  },
  lazarus_plot_fake: {
    name: 'Manufactured Gate Record',
    desc: 'A forged gate tally showing exaggerated crowd numbers heading to Bethany, designed to make the Sanhedrin panic seem more justified.',
    bibleRef: 'John 12:9',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'Annas agents created this record after the fact to justify the secret decree against Lazarus. The real gate records show normal Passover traffic, but this forged document inflates the numbers to suggest a dangerous mob movement.',
    bibleRefs: [{ ref: 'John 12:9', link: 'john_129' }],
    propheticRefs: []
  },
  olivet_discourse_fake: {
    name: 'Fabricated Prophecy Fragment',
    desc: 'A fragment of parchment claiming to be an unknown prophecy about the destruction of Jerusalem, written in a style that does not match any known biblical text.',
    bibleRef: 'Matthew 24:1–2',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'A later apocalyptic sect created this fragment to support their own end-times theories. They planted it among the genuine evidence to make it look like Jesus Olivet Discourse was quoting from a wider body of prophetic literature than actually existed.',
    bibleRefs: [{ ref: 'Matthew 24:1-2', link: 'matthew_241_2' }],
    propheticRefs: []
  },
  passover_lamb_chain_fake: {
    name: 'Suspicious Anointing Oil',
    desc: 'A small vial of oil claiming to be from Mary anointing, found in the possession of a Judas sympathizer.',
    bibleRef: 'John 12:3',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'Judas supporters created this fake relic to suggest that Mary anointing was actually a common practice, not the unique prophetic act John Gospel describes. The oil in the vial does not match the chemical composition of first-century nard.',
    bibleRefs: [{ ref: 'John 12:3', link: 'john_123' }],
    propheticRefs: []
  },
  last_supper_fake: {
    name: 'Altered Breadcrumb Evidence',
    desc: 'Bread crumbs found near the upper room, supposedly from the Passover meal, but analysis shows they contain modern yeast.',
    bibleRef: 'Matthew 26:26',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'A later group of ritualists created this evidence to suggest the Last Supper was a regular Passover meal rather than the establishment of the New Covenant. Passover bread must be unleavened, so the presence of modern yeast exposes the forgery.',
    bibleRefs: [{ ref: 'Matthew 26:26', link: 'matthew_2626' }],
    propheticRefs: []
  },
  gethsemane_arrest_fake: {
    name: 'Planted Torch Fragment',
    desc: 'A fragment of a Roman torch found at the garden edge, stamped with a mark from a different cohort than the one that actually arrested Jesus.',
    bibleRef: 'John 18:3',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'Someone planted this fragment to suggest a different Roman unit was involved, trying to create confusion about the actual events. The torch fragment was taken from a different site and placed in Gethsemane to mislead investigators.',
    bibleRefs: [{ ref: 'John 18:3', link: 'john_183' }],
    propheticRefs: []
  },
  sanhedrin_trial_fake: {
    name: 'Fabricated Roman Dispatch',
    desc: 'A dispatch purportedly from Pilate office authorizing the Sanhedrin to proceed with the trial, but the seal and script are from a later period.',
    bibleRef: 'Matthew 26:57–68',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'The Sanhedrin themselves forged this document after the fact to justify their illegal trial. Jewish law forbade capital trials at night or on the eve of a Sabbath/Festival, so they created a fake Roman authorization to retroactively legitimize their actions.',
    bibleRefs: [{ ref: 'Matthew 26:57-68', link: 'matthew_2657_68' }],
    propheticRefs: []
  },
  barabbas_choice_fake: {
    name: 'Questionable Sign Fragment',
    desc: 'A fragment of a public notice claiming Barabbas was a peaceful political prisoner, not a violent insurgent.',
    bibleRef: 'Luke 23:18',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'Barabbas supporters created this fragment to retroactively rehabilitate his image. The Gospels describe him as an insurrectionist and murderer, but his sympathizers later tried to rewrite history by planting this fake notice.',
    bibleRefs: [{ ref: 'Luke 23:18', link: 'luke_2318' }],
    propheticRefs: []
  },
  crucifixion_site_fake: {
    name: 'Manufactured Shroud Thread',
    desc: 'A thread from a shroud claiming to be from Jesus burial cloth, but testing reveals it is from a medieval European weaving technique.',
    bibleRef: 'John 19:40',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'A later relic-hunter created this fake shroud thread to support fraudulent claims about Jesus burial. Medieval forgers often wove modern materials into ancient textiles to make them appear authentic.',
    bibleRefs: [{ ref: 'John 19:40', link: 'john_1940' }],
    propheticRefs: []
  },
  resurrection_fake: {
    name: 'Altered Ascension Witness Token',
    desc: 'A token claiming to be from an ascension witness, but the inscription mentions details that were not recorded until decades later.',
    bibleRef: 'Acts 1:9–11',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'A later church community created this token to bolster their claim to being an eyewitness community. They inscribed details from later theological reflections onto a first-century-style token to make it appear authentic.',
    bibleRefs: [{ ref: 'Acts 1:9-11', link: 'acts_19_11' }],
    propheticRefs: []
  },
  roman_inquiry_fake: {
    name: 'Fabricated Tongue Fragment',
    desc: 'A fragment of parchment claiming to be part of the guards official report to Pilate, but the Latin grammar is from a much later period.',
    bibleRef: 'Matthew 28:11–15',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'The Sanhedrin descendants created this fragment to support their claim that the guards reported the resurrection to Pilate. The actual guards likely did not file a formal report — they were bribed and silenced.',
    bibleRefs: [{ ref: 'Matthew 28:11-15', link: 'matthew_2811_15' }],
    propheticRefs: []
  },
  peter_restoration_fake: {
    name: 'Planted Persecution Record',
    desc: 'A record claiming Peter was executed in Rome during Nero persecution, found among documents from a much later period.',
    bibleRef: 'John 21:15–17',
    propheticLink: 'No prophetic significance — this is a planted distractor.',
    investigatorNote: 'Early church tradition records Peter martyrdom in Rome under Nero, but this fragment was planted among the evidence to confuse the timeline. The restoration at the Sea of Galilee happened decades before any Roman persecution of Christians.',
    bibleRefs: [{ ref: 'John 21:15-17', link: 'john_2115_17' }],
    propheticRefs: []
  }
};

function createFakeEvidence(id, data) {
  return `    {
      id: "${id}",
      name: "${data.name}",
      type: "environmental",
      icon: "../assets/gfx/shield-duotone.svg",
      fake: true,
      category: "event",
      timelineOrder: null,
      desc: "${data.desc}",
      bibleRef: "${data.bibleRef}",
      propheticLink: "${data.propheticLink}",
      bibleRefs: [
        { ref: "${data.bibleRefs[0].ref}", link: "${data.bibleRefs[0].link}" }
      ],
      propheticRefs: [],
      investigatorNote: "${data.investigatorNote}",
      clues: {
        compare: "No matching pair exists for this item.",
        link: "Event — this item is suspiciously convenient.",
        timeline: "CHRONOLOGY: The timeline does not quite fit with the other evidence.",
        contradict: "RELIABILITY: This item was planted to mislead the investigation. It contains inconsistencies that do not match the verified evidence."
      }
    }`;
}

const files = {
  'js/act1_case.js': ['triumphal_entry_fake', 'temple_cleansing_fake', 'withered_fig_tree_fake'],
  'js/act2_case.js': ['authority_challenged_fake', 'lazarus_plot_fake', 'olivet_discourse_fake', 'passover_lamb_chain_fake'],
  'js/act3_case.js': ['last_supper_fake', 'gethsemane_arrest_fake', 'sanhedrin_trial_fake', 'barabbas_choice_fake', 'crucifixion_site_fake'],
  'js/act4_case.js': ['resurrection_fake', 'roman_inquiry_fake', 'peter_restoration_fake']
};

for (const [file, ids] of Object.entries(files)) {
  let content = fs.readFileSync(file, 'utf8');
  
  for (const id of ids) {
    const data = fakeData[id];
    if (!data) continue;
    
    // Find the start of the fake evidence object
    const startMarker = `id: "${id}"`;
    const startIdx = content.indexOf(startMarker);
    if (startIdx === -1) continue;
    
    // Find the start of the object (the { before id:)
    const objStart = content.lastIndexOf('{', startIdx);
    
    // Find the end of the object - look for the pattern: }\n  ],\n\n  lab:
    // or }\n  ],\n\n  npcs:
    // The fake evidence is always the last item in evidencePool
    const afterObject = content.indexOf('  ],\n\n', startIdx);
    if (afterObject === -1) continue;
    
    const newObj = createFakeEvidence(id, data);
    content = content.substring(0, objStart) + newObj + content.substring(afterObject);
  }
  
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
}
