// ============================================================
// CHARACTER: Master Scribe (Temple Archives)
// ACT: Act II
// CASE: The Silenced Teacher
// CASE ID: temple_authority
// SOURCE: js/act2_case.js -> NPC 'scribe_intro'
// BIBLE REFERENCE: Mark 11:27-33; Matthew 22:15-22; Mark 12:41-44
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Psalm 119:160 — "The sum of your word is truth"
//     Insight: The scribe's dedication to record-keeping
//     preserves testimony that cannot be silenced
//   - Isaiah 53:1 — "Who has believed our report?"
//     Insight: The scribe records both the questions asked
//     and the silence left behind as evidence
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_temple_challenge (formal Sanhedrin authority question)
//   - evidence_caesar_claim (render unto Caesar)
//   - evidence_widow_coins (widow's two mites)
//   - evidence_archives_untouched (scribal records of unanswered questions)
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: A Master Scribe, assigned to record the formal
//   proceedings in the Temple courts, witnessed Jesus's
//   confrontation with the religious authorities and His
//   devastating answers that left them silenced.
// ============================================================

-> start
=== start ===
I am Master Scribe. The archives hold testimony -- not opinion. Many have walked these stones carrying questions no scroll could answer. You seek answers about the Galilean? My pen has been busy.
* [What have you been recording?] -> truth_records
* [What did you observe in the Temple courts?] -> temple_observations
* [I am investigating the authority challenge.] -> authority_inquiry

=== truth_records ===
I record what is said, not what I believe. My notes are the same either way -- official, detailed, comprehensive. The past week has generated more scroll than the entire month of Tishri.
# UNLOCK_EVIDENCE: evidence_archives_untouched
* [The archives are detailed.] -> archives_detailed
* [The records speak for themselves.] -> records_speak_truth
* [Are you allowed to share these?] -> sharing_allowed

=== temple_observations ===
The Temple courts this morning -- a theater of questions that never concluded. The chief priests came first, then the Pharisees, the Sadducees, the Herodians. Each faction with a different angle, each leaving with the same result: silence.
* [The silence was notable.] -> silence_notable
* [What of the crowd?] -> crowd_reaction_scribe
* [Did Jesus answer every question?] -> answered_all

=== authority_inquiry ===
# UNLOCK_EVIDENCE: evidence_temple_challenge=== could_not_respond ===
They could not respond because they did not know the answer. John's baptism -- was it from heaven or from men? If they said "from heaven," He would ask why they did not believe. If they said "from men," the crowd would stone them. The Talmud records this kind of dilemma as "a knot the sages cannot untie."
* [The crowd witnessed this.] -> crowd_witnessed
* [The question was devastating.] -> devastating_question

=== devastating_question ===
=== crowd_witnessed ===
=== silence_notable ===
=== psalm_specific ===
=== implication_profound ===
=== answered_all ===
# UNLOCK_EVIDENCE: evidence_caesar_claim=== trap_backfired_scribe ===
=== archives_detailed ===
=== records_speak_truth ===
=== sharing_allowed ===
=== most_revealing ===
# UNLOCK_EVIDENCE: evidence_widow_coins=== widow_offering ===
=== value_inverted ===
=== lesson_learned ===
=== records_prove_it ===
=== testimony_conclusive ===
=== archives_survive ===
=== truth_endures_scribe ===
-> DONE
