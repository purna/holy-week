// ============================================================
// CHARACTER: Hillel (Temple Court Scribe)
// ACT: Act II
// CASE: The Passover Lamb Pattern
// SOURCE: js/act2_case.js -> NPC 'temple_inspection_scribe'
// BIBLE REFERENCE: Mark 11:27-33; Matthew 22:15-22; Mark 12:41-44
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Isaiah 53:1 — "Who has believed our report?"
//     Insight: The scribe's records bear testimony that the
//     people could not ignore
//   - Psalm 119:160 — "The sum of your word is truth"
//     Insight: Careful record-keeping preserves witness that
//     cannot be silenced
// ------------------------------------------------------------
// Evidence unlocked: evidence_inspection_notes, evidence_lamb_records,
//   evidence_fig_leaf_withered, evidence_archives_authentic
// ============================================================

-> start
=== start ===
I am Hillel, a junior scribe assigned to the Court of the Gentiles. My hands are stained with ink from record-keeping and dust from the inspection ledgers. You wish to understand the proceedings? My records speak clearly.
* [What have you recorded this week?] -> temple_proceedings
* [The Passover lamb records?] -> lamb_records
* [What of the questioning?] -> questioning_records

=== temple_proceedings ===
The Temple proceedings this week have been extraordinary. I have documented four separate factions challenging the Galilean's authority, each using different legal precedents, each leaving without an answer.
* [The factions were coordinated.] -> factions_coordinated
* [None could trap Him.] -> none_trapped
* [The crowd's reaction?] -> crowd_reaction_scribe

=== factions_coordinated ===
The factions were coordinated -- chief priests, Pharisees, Sadducees, Herodians. Each brought a different angle, a different scripture, a different legal precedent. They approached it like seasoned prosecutors. But their case collapsed repeatedly.
# UNLOCK_EVIDENCE: evidence_inspection_notes
* [The collapses were recorded.] -> collapses_recorded
* [What went wrong for them?] -> went_wrong

=== none_trapped ===
None could trap Him. The Herodians came with their tax question, the Sadducees with their resurrection puzzle, the Pharisees with their law question, the chief priests with their authority challenge. Each question answered in a way that turned the questioner's own weapon against them.
* [The weapons were turned.] -> weapons_turned
* [The questions were answered.] -> questions_answered

=== questioning_records ===
My questioning records span seventeen columns of careful script. The chief priests asked about authority -- He answered about John's baptism. The Pharisees asked about resurrection -- He spoke of Abraham's calling. The Herodians asked about taxes -- He spoke of Caesar and God.
# UNLOCK_EVIDENCE: evidence_inspection_notes
* [The answers were profound.] -> answers_profound
* [The record is complete.] -> record_complete

=== answers_profound ===
The answers were profound in their simplicity. Not lengthy treatises, not legal citations, but single sentences that reframed the entire question. When asked about resurrection, He did not argue theology -- He simply stated, "God is not the God of the dead, but of the living." A grammatical observation that undermined their entire premise.
# UNLOCK_EVIDENCE: evidence_inspection_notes
* [The precision was startling.] -> precision_startling
* [The silence followed.] -> silence_followed

=== record_complete ===
The record is complete. Every question, every hesitation in the crowd, every glance exchanged between the questioners. I was trained to record details -- dates, names, locations -- but this day required something beyond mere documentation. I felt I was witnessing history being made.
* [The history was visible.] -> history_visible
* [The significance was clear.] -> significance_clear

=== lamb_records ===
The lamb records -- I keep the official schedules for the Temple's livestock market. Passover lambs are selected on the tenth of Nisan, inspected daily until the fourteenth, and slaughtered at twilight. Each animal marked, each blemish noted, each breath counted. It is a rigorous process.
# UNLOCK_EVIDENCE: evidence_lamb_records
* [The schedule was precise.] -> schedule_precise
* [The inspection was thorough.] -> inspection_thorough

=== schedule_precise ===
The schedule was precise. Ten days of selection, four days of inspection, one night of sacrifice. Same as it has been for centuries. Same as it will be for generations to come. The reliability is the point -- the lamb must be flawless, the record must be unbroken.
* [The parallel is unmistakable.] -> parallel_unmistakable
* [The pattern is clear.] -> pattern_clear_lamb

=== inspection_thorough ===
The inspection was thorough. Priests examined each lamb for blemish, deformity, age, and health. A lame lamb was disqualified. A blind lamb was set aside. A bull or goat with any imperfection was rejected. And yet --
* [And yet what?] -> yet_what
* [The inspection passed.] -> inspection_passed

=== yet_what ===
And yet the one being inspected was not an animal. He was a man -- a carpenter's son from Nazareth. For four days, the religious authorities had subjected Him to the same scrutiny they give to sacrificial animals. The same questions, the same challenges, the same demand for perfection.
* [The scrutiny was divine.] -> scrutiny_divine
* [The perfection was proven.] -> perfection_proven

=== inspection_passed ===
The inspection passed -- no blemish found, no flaw detected. The Herodians could not catch Him in His words. The Sadducees could not ensnare Him with their theology. The Pharisees could not trip Him up in the Law. Each test revealed the same result: spotless, blameless, without defect.
# UNLOCK_EVIDENCE: evidence_fig_leaf_withered
* [The result was conclusive.] -> result_conclusive
* [The records prove it.] -> records_prove_it

=== records_prove_it ===
The records prove it. My ledgers, meticulously maintained, show that every challenge was met, every question answered, every trap sprung back upon its setter. The ink is permanent, the testimony is true, and the conclusion is unavoidable.
# UNLOCK_EVIDENCE: evidence_archives_authentic
* [The archives are trusted.] -> archives_trusted
* [The testimony stands.] -> testimony_stands_scribe

=== collapses_recorded ===
The collapses were recorded. Every faction that approached the Galilean left without victory. The scholars would later discuss these encounters -- "The debates of that month," they called them, "when the Son of Man silenced every challenger."
* [The Talmud recorded them?] -> talmud_recorded
* [The silence was total.] -> silence_totally

=== crowd_reaction_scribe ===
The crowd's reaction was mixed -- amazement at His answers, confusion at their implications, discomfort at their own inadequacy. The Gospel writers would later record: "The chief priests and the scribes... were looking for a way to kill Him, for they feared Him because the whole crowd was amazed at His teaching."
* [The fear was real.] -> fear_was_real
* [The amazement was public.] -> amazement_public

=== closing_scribe ===
Read the two ledgers side by side, if you like. The lamb records and the questioning records. I only write down what happens. But the pattern emerging from the records is unmistakable: the Passover lamb is being selected, inspected, challenged, and proven flawless. The same sequence, the same days, the same outcome.
# UNLOCK_EVIDENCE: evidence_lamb_records
-> DONE
