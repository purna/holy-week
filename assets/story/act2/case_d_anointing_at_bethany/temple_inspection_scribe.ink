// ============================================================
// CHARACTER: Temple Inspection Scribes (Maluch & Hillel)
// ACT: Act II
// CASES: The Price of Life & The Passover Lamb Pattern
// CASE ID: lazarus_plot / act2_case
// SOURCE: Derived from NPC 'temple_spy' & 'temple_inspection_scribe'
// PURPOSE: To provide both an administrative/security perspective on the Lazarus crisis and a procedural record of the Passover week challenges.
// BIBLE REFERENCE: John 11:47-48; John 12:9-11; Mark 11:27-33; Matthew 22:15-22; Mark 12:41-44
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 25:8
//     Gospel: John 11:25
//     Insight: Lazarus's revival was a tactical, localized preview of the ultimate cosmic victory over death that was about to occur on Easter morning.
//   - Isaiah 53:1 — "Who has believed our report?"
//     Insight: The scribe's records bear testimony that the people could not ignore.
//   - Psalm 119:160 — "The sum of your word is truth"
//     Insight: Careful record-keeping preserves witness that cannot be silenced.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Following the resurrection of Lazarus, the Sanhedrin, fearing Roman intervention due to Jesus's growing popularity, plots to kill both Jesus and Lazarus to suppress the miracle's impact.
//   Historicalnote: Bethany's proximity to Jerusalem during Passover meant thousands of pilgrims could witness Lazarus, creating a significant political and religious challenge for the Temple authorities.
//   Significance: This case highlights the leadership's moral failure; instead of embracing a miracle, they chose to eliminate the evidence to protect their power.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: caiaphas
//   motive: The high priests feared that the massive public following caused by Lazarus's resurrection would spark a Roman military crackdown, destroying their temple and nation.
//   method: Caiaphas and his inner circle bypassed standard judicial procedures to authorize a shadow assassination plot against Lazarus of Bethany, aiming to eliminate the physical evidence of Jesus's greatest miracle before the Passover feast ended.
// ============================================================

-> start

=== start ===
I am Hillel, a junior scribe assigned to the Court of the Gentiles, and alongside me, Maluch tracks the logistics of the district. My hands are stained with ink from inspection ledgers and dust from the court. What do you require?
* [What does your data tell you about the crowds?] -> data_analysis
* [Are you tracking the man, Lazarus?] -> tracking_lazarus
* [What is the official Temple response?] -> official_response
* [What have you recorded this week regarding the Temple proceedings?] -> temple_proceedings
* [Show me the Passover lamb records.] -> lamb_records
* [What of the questioning records?] -> questioning_records
* [Conclude.] -> closing_scribe

=== data_analysis ===
It tells me an unsanctioned event in Bethany has created a significant public order challenge. We have documented a surge in foot traffic, a rise in seditious chatter, and a statistical probability of civil unrest. My job is to report the numbers, not interpret the cause.
* [So it's just a numbers problem to you?] -> numbers_problem
* [Conclude.] -> closing_scribe

=== numbers_problem ===
Everything is a numbers problem. Passion is unpredictable. Data is not. When the numbers exceed a certain threshold, protocols are enacted. It is simple risk management.
* [What protocol, exactly, gets enacted for a threshold like this?] -> lazarus_protocol
* [Conclude.] -> closing_scribe
* [Continue to ledgers.] -> start

=== tracking_lazarus ===
The 'Bethany asset' is a focal point for this anomaly. His public appearances correlate directly with spikes in crowd density. From a security standpoint, he is a catalyst for instability. Whether he was dead or simply... unavailable... is irrelevant to my report.
* [You call a living man an 'asset'?] -> asset_perspective
* [Conclude.] -> closing_scribe

=== asset_perspective ===
He is an element in a complex security equation. His status generates crowds that threaten the peace. That makes him an asset to be managed or a liability to be contained.
* ["Contained" meaning what, precisely?] -> asset_contained
* [Continue to ledgers.] -> start

=== asset_contained ===
Meaning the council has stopped debating whether the miracle happened and started debating what to do about the man it happened to. I have seen the draft language cross my own desk, Scribe. It does not use soft words like "monitor" anymore.
* [Conclude.] -> closing_scribe
* [What words does it use?] -> reveal_plot

=== official_response ===
The council acts on verified intelligence. My reports are one part of that. The data suggests a need for proactive containment to mitigate risk to public order and Temple security. Final policy is above my pay grade.
* ["Containment." That's a careful word.] -> official_deeper
* [Continue to ledgers.] -> start
* [Conclude.] -> closing_scribe

=== official_deeper ===
Careful is my job description, Scribe. I log numbers. I do not authorize policy. But I have drafted enough containment memos to recognize the shape of one that has stopped being about crowd control and started being about a specific individual. I am not required to have an opinion on that distinction. I am required to file the memo.
* [Say it plainly. What does the memo actually recommend?] -> reveal_plot

=== lazarus_protocol ===
The threshold protocol for a security concern this size has three tiers: monitor, disperse, or remove the variable entirely. I log which tier gets recommended. I do not choose it. But I can tell you which tier the Bethany file has been escalated to this week, if you are prepared to hear it stated without the softening.
* [State it.] -> reveal_plot
* [Conclude.] -> closing_scribe

=== reveal_plot ===
Remove the variable. That is the language in the draft, Scribe, whatever euphemism you want to dress it in afterward. The council has moved past debating Jesus of Nazareth. It will likely be written down plainly enough one day: "the chief priests took counsel that they might put Lazarus also to death, because on his account many of the Jews were going away and believing in Jesus." I did not invent that sentence. I only stopped being able to file this as a mere numbers problem once I understood who the memo was actually written about — a man whose only offense was staying alive after everyone had already watched him die once. Your own prophets wrote that death itself would one day be swallowed up forever. I did not expect to find myself logging the paperwork for the men trying to feed it one more meal first.
# UNLOCK_EVIDENCE: inspection_notes
# UNLOCK_EVIDENCE: lamb_records
* [Return to the court records.] -> start

=== temple_proceedings ===
The Temple proceedings this week have been extraordinary. I have documented four separate factions challenging the Galilean's authority, each using different legal precedents, each leaving without an answer.
# UNLOCK_EVIDENCE: inspection_notes
* [The factions were coordinated.] -> factions_coordinated
* [None could trap Him.] -> none_trapped
* [The crowd's reaction?] -> crowd_reaction_scribe
* [Conclude.] -> closing_scribe

=== factions_coordinated ===
The factions were coordinated -- chief priests, Pharisees, Sadducees, Herodians. Each brought a different angle, a different scripture, a different legal precedent. They approached it like seasoned prosecutors. But their case collapsed repeatedly.
# UNLOCK_EVIDENCE: inspection_notes
* [The collapses were recorded.] -> collapses_recorded
* [What went wrong for them?] -> went_wrong

=== went_wrong ===
They assumed legalistic entrapment would work against the author of the Law. Every trap they laid was built on a false dichotomy that He effortlessly bypassed by shifting the paradigm from transactional legality to eternal truth.
# UNLOCK_EVIDENCE: inspection_notes
* [Return to proceedings.] -> temple_proceedings
* [Conclude.] -> closing_scribe

=== none_trapped ===
None could trap Him. The Herodians came with their tax question, the Sadducees with their resurrection puzzle, the Pharisees with their law question, the chief priests with their authority challenge. Each question answered in a way that turned the questioner's own weapon against them.
# UNLOCK_EVIDENCE: inspection_notes
* [The weapons were turned.] -> weapons_turned
* [The questions were answered.] -> questions_answered
* [Conclude.] -> closing_scribe

=== weapons_turned ===
The weapons were turned instantly. When pressed on tribute to Caesar, the image on the coin settled the debate. When pressed on levirate marriage, the nature of heavenly existence shattered the Sadducees' skepticism.
# UNLOCK_EVIDENCE: inspection_notes
* [Return to proceedings.] -> temple_proceedings
* [Conclude.] -> closing_scribe

=== questions_answered ===
Every question met its match in divine clarity. The interrogators became the interrogated simply by standing before Him.
# UNLOCK_EVIDENCE: inspection_notes
* [Return to proceedings.] -> temple_proceedings

=== questioning_records ===
My questioning records span seventeen columns of careful script. The chief priests asked about authority -- He answered about John's baptism. The Pharisees asked about resurrection -- He spoke of Abraham's calling. The Herodians asked about taxes -- He spoke of Caesar and God.
# UNLOCK_EVIDENCE: inspection_notes
* [The answers were profound.] -> answers_profound
* [Conclude.] -> closing_scribe
* [The record is complete.] -> record_complete

=== answers_profound ===
The answers were profound in their simplicity. Not lengthy treatises, not legal citations, but single sentences that reframed the entire question. When asked about resurrection, He did not argue theology -- He simply stated, "God is not the God of the dead, but of the living." A grammatical observation that undermined their entire premise.
# UNLOCK_EVIDENCE: inspection_notes
* [The precision was startling.] -> precision_startling
* [Conclude.] -> closing_scribe
* [The silence followed.] -> silence_followed

=== precision_startling ===
The precision was startling. It left the scribes and lawyers with nothing further to add to the docket.
# UNLOCK_EVIDENCE: inspection_notes
* [Return to records.] -> questioning_records
* [Conclude.] -> closing_scribe

=== silence_followed ===
The silence that followed was absolute. No one dared ask Him any more questions after that day.
# UNLOCK_EVIDENCE: inspection_notes
* [Return to records.] -> questioning_records
* [Conclude.] -> closing_scribe

=== record_complete ===
The record is complete. Every question, every hesitation in the crowd, every glance exchanged between the questioners. I was trained to record details -- dates, names, locations -- but this day required something beyond mere documentation. I felt I was witnessing history being made.
# UNLOCK_EVIDENCE: inspection_notes
* [The history was visible.] -> history_visible
* [The significance was clear.] -> significance_clear
* [Conclude.] -> closing_scribe

=== history_visible ===
The history was visible in the shifting power dynamics of the court. The crowds leaned in; the authorities backed away.
# UNLOCK_EVIDENCE: inspection_notes
* [Continue.] -> record_complete
* [Conclude.] -> closing_scribe

=== significance_clear ===
The significance was clear to anyone willing to look past the ink and parchment: the ultimate authority was standing right there in the Court of the Gentiles.
# UNLOCK_EVIDENCE: inspection_notes
* [Continue.] -> record_complete
* [Conclude.] -> closing_scribe

=== lamb_records ===
The lamb records -- I keep the official schedules for the Temple's livestock market. Passover lambs are selected on the tenth of Nisan, inspected daily until the fourteenth, and slaughtered at twilight. Each animal marked, each blemish noted, each breath counted. It is a rigorous process.
# UNLOCK_EVIDENCE: lamb_records
* [The schedule was precise.] -> schedule_precise
* [The inspection was thorough.] -> inspection_thorough
* [Conclude.] -> closing_scribe

=== schedule_precise ===
The schedule was precise. Ten days of selection, four days of inspection, one night of sacrifice. Same as it has been for centuries. Same as it will be for generations to come. The reliability is the point -- the lamb must be flawless, the record must be unbroken.
# UNLOCK_EVIDENCE: lamb_records
* [The parallel is unmistakable.] -> parallel_unmistakable
* [The pattern is clear.] -> pattern_clear_lamb

=== parallel_unmistakable ===
The parallel is unmistakable to anyone tracking the dates. The timeline of His arrival in Bethany aligns precisely with the selection of the lamb.
# UNLOCK_EVIDENCE: lamb_records
* [Continue.] -> schedule_precise
* [Conclude.] -> closing_scribe

=== pattern_clear_lamb ===
The pattern points directly toward a fulfillment that transcends temple bureaucracy.
# UNLOCK_EVIDENCE: lamb_records
* [Continue.] -> schedule_precise
* [Conclude.] -> closing_scribe

=== inspection_thorough ===
The inspection was thorough. Priests examined each lamb for blemish, deformity, age, and health. A lame lamb was disqualified. A blind lamb was set aside. A bull or goat with any imperfection was rejected. And yet --
# UNLOCK_EVIDENCE: lamb_records
* [And yet what?] -> yet_what
* [The inspection passed.] -> inspection_passed

=== yet_what ===
And yet the one being inspected was not an animal. He was a man -- a carpenter's son from Nazareth. For four days, the religious authorities had subjected Him to the same scrutiny they give to sacrificial animals. The same questions, the same challenges, the same demand for perfection.
# UNLOCK_EVIDENCE: lamb_records
* [The scrutiny was divine.] -> scrutiny_divine
* [The perfection was proven.] -> perfection_proven
* [Conclude.] -> closing_scribe

=== scrutiny_divine ===
The scrutiny was divine in its irony. They sought blemish, but found only absolute purity.
# UNLOCK_EVIDENCE: lamb_records
* [Continue.] -> yet_what
* [Conclude.] -> closing_scribe

=== perfection_proven ===
The perfection was proven under the harshest lights of institutional interrogation.
# UNLOCK_EVIDENCE: lamb_records
* [Continue.] -> yet_what

=== inspection_passed ===
The inspection passed -- no blemish found, no flaw detected. The Herodians could not catch Him in His words. The Sadducees could not ensnare Him with their theology. The Pharisees could not trip Him up in the Law. Each test revealed the same result: spotless, blameless, without defect.
# UNLOCK_EVIDENCE: lamb_records
# UNLOCK_EVIDENCE: fig_leaf_withered
* [The result was conclusive.] -> result_conclusive
* [The records prove it.] -> records_prove_it
* [Conclude.] -> closing_scribe

=== result_conclusive ===
The result of every test was completely uniform. There was no defense to make against Him because His walk matched His word entirely.
# UNLOCK_EVIDENCE: lamb_records
* [Continue.] -> inspection_passed
* [Conclude.] -> closing_scribe

=== records_prove_it ===
The records prove it. My ledgers, meticulously maintained, show that every challenge was met, every question answered, every trap sprung back upon its setter. The ink is permanent, the testimony is true, and the conclusion is unavoidable.
# UNLOCK_EVIDENCE: lamb_records
* [The archives are trusted.] -> archives_trusted
* [The testimony stands.] -> testimony_stands_scribe
* [Conclude.] -> closing_scribe

=== archives_trusted ===
The archives are kept under strict temple seal, yet even these administrative logs bear unintentional witness to the truth.
# UNLOCK_EVIDENCE: lamb_records
* [Continue.] -> records_prove_it

=== testimony_stands_scribe ===
The testimony stands unshakeable across all written accounts.
# UNLOCK_EVIDENCE: lamb_records
* [Continue.] -> records_prove_it
* [Conclude.] -> closing_scribe

=== collapses_recorded ===
The collapses were recorded. Every faction that approached the Galilean left without victory. The scholars would later discuss these encounters -- "The debates of that month," they called them, "when the Son of Man silenced every challenger."
# UNLOCK_EVIDENCE: inspection_notes
* [The Talmud recorded them?] -> talmud_recorded
* [The silence was total:] -> silence_totally
* [Conclude.] -> closing_scribe

=== talmud_recorded ===
Subsequent rabbinical notes mention these disputes, acknowledging the confounding wisdom that checked every official maneuver.
# UNLOCK_EVIDENCE: inspection_notes
* [Continue.] -> collapses_recorded

=== silence_totally ===
The silence was total among His adversaries, forced into retreat by their own failure to construct a valid charge.
# UNLOCK_EVIDENCE: inspection_notes
* [Continue.] -> collapses_recorded

=== crowd_reaction_scribe ===
The crowd's reaction was mixed -- amazement at His answers, confusion at their implications, discomfort at their own inadequacy. The Gospel writers would later record: "The chief priests and the scribes... were looking for a way to kill Him, for they feared Him because the whole crowd was amazed at His teaching."
# UNLOCK_EVIDENCE: inspection_notes
* [The fear was real.] -> fear_was_real
* [The amazement was public.] -> amazement_public

=== fear_was_real ===
The leadership's fear grew in direct proportion to public admiration.
# UNLOCK_EVIDENCE: inspection_notes
* [Continue.] -> closing_scribe

=== amazement_public ===
The amazement was openly displayed in the temple courts before the entire pilgrim populace.
# UNLOCK_EVIDENCE: inspection_notes
* [Continue.] -> closing_scribe

=== closing_scribe ===
Read the two ledgers side by side, if you like. The lamb records and the questioning records. I only write down what happens. But the pattern emerging from the records is unmistakable: the Passover lamb is being selected, inspected, challenged, and proven flawless. The same sequence, the same days, the same outcome.
# UNLOCK_EVIDENCE: lamb_records
# UNLOCK_EVIDENCE: inspection_notes
-> DONE
