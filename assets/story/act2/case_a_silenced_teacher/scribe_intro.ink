// ============================================================
// CHARACTER: Master Scribe Samuel (Temple Archives)
// ACT: Act II
// CASE: The Silenced Teacher
// CASE ID: authority_challenged
// SOURCE: js/act2_case.js -> NPC 'scribe'
// BIBLE REFERENCE: Mark 11:27-33; Matthew 22:15-22; Mark 12:41-44
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Psalm 118:22-23 — "The stone the builders rejected has become the cornerstone"
//     Insight: The scribe records the public defeat of the religious builders.
//   - Isaiah 5:1-7 — The Song of the Vineyard
//     Insight: The scribe notes the parable's recognition by all present.
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - question_scroll (formal Sanhedrin authority challenge)
//   - coin_of_caesar (render unto Caesar — tax question trap)
//   - widow_two_coins (widow's two mites)
//   - witness_scroll (scribal records of unanswered questions)
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: A Master Scribe, assigned to record the formal proceedings in
//   the Temple courts, witnessed Jesus's confrontation with the religious
//   authorities and His devastating answers that left them silenced.
// ============================================================

-> start
=== start ===
I am Master Scribe. The archives hold testimony -- not opinion. My scrolls from this morning record every question the Sanhedrin dared to raise, and every answer that left them with nothing further to say.

* [What have you been recording?] -> truth_records
* [What did you observe in the Temple courts?] -> temple_observations
* [I am investigating the authority challenge.] -> authority_inquiry
* [Tell me about the widow's offering.] -> widow_observation

=== truth_records ===
I record what is said, not what I believe. My notes are the same either way -- official, detailed, comprehensive. The past week has generated more scroll than the entire month of Tishri.

# UNLOCK_EVIDENCE: witness_scroll
* [How detailed were the records?] -> records_detailed
* [Did the crowd witness it all?] -> crowd_witnessed_all
* [Continue to temple observations.] -> temple_observations

=== records_detailed ===
Every exchange, every rebuttal, every glance across the court. The Pharisees' body language when He answered their tax question. The Sadducees' hesitation when the resurrection was discussed. Even the Herodians' concession when He spoke of Caesar and God in the same breath.

* [The precision was remarkable.] -> precision_remarkable
* [What of the questioners' reactions?] -> questioners_reactions
* [Continue to authority inquiry.] -> authority_inquiry

=== precision_remarkable ===
Remarkable precision. When the Herodian delegation brought the denarius, expecting a Yes or No on tribute, He asked whose image bore on the coin. Caesar's. And whose inscription? Caesar's. Then: "Render therefore to Caesar the things that are Caesar's, and to God the things that are God's." The trap snapped shut on them instead of Him.

# UNLOCK_EVIDENCE: coin_of_caesar
* [The crowd recognized the shift.] -> crowd_recognized_shift
* [The Herodians were caught off guard.] -> herodians_off_guard
* [Continue to temple observations.] -> temple_observations

=== crowd_recognized_shift ===
The crowd recognised the shift instantly. He had not said "pay taxes" or "refuse taxes." He had reframed the entire question around image and allegiance. Caesar's image on the coin; God's image on every person listening.

* [The image question was deeper.] -> image_question_deeper
* [The trap backfired completely.] -> trap_backfired
* [Continue to start.] -> start

=== image_question_deeper ===
Deeper than politics. When He spoke of rendering to God what was God's, He meant the very breath and fabric of humanity -- made in the divine image. The Herodians left with their coin and no answer to give their masters.

# UNLOCK_EVIDENCE: coin_of_caesar
* [The leadership's frustration.] -> leadership_frustration
* [Return to start.] -> start

=== trap_backfired ===
The trap backfired completely. They had come to entrap Him on taxation policy. He left them contemplating the nature of human identity. I recorded it all in column seven.

* [The records preserve this.] -> records_preserve_this
* [Continue to start.] -> start

=== records_preserve_this ===
My records preserve this moment. Column seven, entry dated 15:32: "The delegation departed without retrieving their coin from the ground where it had fallen. The Teacher's answer reframed the question entirely."

# UNLOCK_EVIDENCE: witness_scroll
* [Return to start.] -> start

=== herodians_off_guard ===
The Herodians left off guard. They expected political evasion. They received divine philosophy. Their coin -- inscribed with Caesar's image -- became the instrument through which they learned about the divine image in humanity. I noted their confusion in column eight.

* [The confusion was evident.] -> herodian_confusion
* [Return to start.] -> start

=== herodian_confusion ===
Evident in their departure. The delegation walked away without retrieving their denarius from the Temple floor. I picked it up and logged it -- silver denarius, Tiberius Caesar. The coin that became an instrument of divine teaching.

# UNLOCK_EVIDENCE: coin_of_caesar
* [The archives stand.] -> archives_stand
* [Return to start.] -> start

=== leadership_frustration ===
Frustration marked their retreat. The chief priests exchanged glances. One muttered something in Aramaic picked up by the court recorder. The Alexandria visitor's scroll records: "They left Him alone, marveling at the answer He had given."

# UNLOCK_EVIDENCE: question_scroll
* [Their retreat was noted.] -> retreat_noted
* [Return to start.] -> start

=== retreat_noted ===
Noted at 16:03. The delegation withdrew to the priestly chambers. No further formal challenge was mounted that day. The people's favour had shifted decisively, and the leadership recognised their trap had backfired.

* [The admission was telling.] -> admission_telling
* [Continue to final entry.] -> final_entry

=== admission_telling ===
Telling, yes. The leaders of Israel, who spent their lives parsing the law, could not determine the source of John's authority. Yet they demanded to judge the Teacher's. I filed this under "Opposition Tactics" for future reference.

# UNLOCK_EVIDENCE: question_scroll
* [Continue.] -> final_entry
* [Return to start.] -> start

=== temple_observations ===
The Temple courts this morning -- a theater of questions that never concluded. The chief priests came first, then the Pharisees, the Sadducees, the Herodians. Each faction with a different angle, each leaving with the same result: silence.

* [The silence was notable.] -> silence_notable
* [What of the crowd?] -> crowd_reaction_scribe
* [Did Jesus answer every question?] -> answered_all
* [Continue to truth records.] -> truth_records

=== silence_notable ===
Silence hung over the court like incense -- present, weighty, unmistakable. After the baptism counter-question, after the resurrection refutation, after the law commandment clarification, after the Caesar-God distinction -- there was nothing left for them to ask. I dated and signed that observation.

* [The crowd's silence was different.] -> crowd_silence_different
* [Return to authority inquiry.] -> authority_inquiry
* [Continue to start.] -> start

=== crowd_silence_different ===
The crowd's silence was different from the questioners' silence. The crowd had been listening, and their silence was engagement -- they were processing what they had heard. The questioners' silence was defeat. The crowd stayed; the leaders left.

# UNLOCK_EVIDENCE: witness_scroll
* [Continue to crowd reaction.] -> crowd_reaction_scribe
* [Return to start.] -> start

=== crowd_reaction_scribe ===
The crowd's reaction was mixed -- amazement at His answers, confusion at their implications, discomfort at their own inadequacy. The Gospel writers later recorded: "The chief priests and the scribes... were looking for a way to kill Him, for they feared Him because the whole crowd was amazed at His teaching."

* [The fear was real.] -> fear_was_real_scribe
* [The praise was notable.] -> praise_notable
* [Continue to start.] -> start

=== fear_was_real_scribe ===
Fear was the leadership's constant companion that day. They had come to trap a Teacher and left having been trapped themselves. I noted the timing -- they withdrew immediately after the widow's offering, perhaps realising their wealth contrasted unfavorably with her sacrifice.

# UNLOCK_EVIDENCE: question_scroll
* [The archives preserve this.] -> records_preserve_this
* [Return to start.] -> start

=== praise_notable ===
Notable, yes. From the outermost court to the inner colonnade, the crowd's murmurs carried the evening news: "A Teacher who answers beyond the wisdom of the elders." I recorded the geographical spread of witnesses, from Galilee to Alexandria to Babylon.

# UNLOCK_EVIDENCE: witness_scroll
* [Return to start.] -> start
* [Continue to final entry.] -> final_entry

=== answered_all ===
Every question was met, not with evasion, but with truth that reframed the entire context. The resurrection question about the Sadducees became a lesson on the nature of eternal life. The law question from the Pharisee became a declaration of love itself. The tax question from the Herodians became a statement on divine-human dual allegiance. Nothing was left unanswered.

# UNLOCK_EVIDENCE: coin_of_caesar
* [The reframing was consistent.] -> reframing_consistent
* [The preservation was thorough.] -> preservation_thorough
* [Continue to start.] -> start

=== reframing_consistent ===
Consistent in its divine clarity. Each answer did not merely evade the trap -- it exposed the trap's flawed premise and replaced it with a higher truth. I recorded each reframing alongside the original question, for posterity to judge the disparity.

* [The testimony multiplies.] -> testimony_multiplies
* [Return to start.] -> start

=== preservation_thorough ===
Thorough, yes. Column by column, question by question, answer by answer. I preserved not just the words but the context, the atmosphere, the reactions. A future investigator, reading these records, would see exactly what happened that morning.

# UNLOCK_EVIDENCE: witness_scroll
* [Continue to final entry.] -> final_entry

=== testimony_multiplies ===
Multiplies, yes. Each witness added their thread to the tapestry of that day's testimony. The scribe's scrolls, the treasurer's ledger, the crowd's memory -- all converging on one undeniable fact: the Teacher who entered the Temple courts as a questioner became the one who answered all questions.

# UNLOCK_EVIDENCE: witness_scroll
* [Continue to final entry.] -> final_entry

=== questioners_reactions ===
Reactions varied. The Pharisees exchanged heated glances -- their legal expertise had been turned against them. The Sadducees' faces were grim -- their theological challenge had been reframed as a discussion of eternal life. The Herodians' expressions suggested they had completely misread their target.

* [Their retreat was telling.] -> retreat_telling
* [Return to start.] -> start

=== retreat_telling ===
Telling, yes. After the resurrection question, the Sadducees stopped their objections. After the law question, the Pharisees found no further opening. After the tax question, the Herodians departed without a word. Each faction retreated before the same divine clarity.

# UNLOCK_EVIDENCE: question_scroll
* [The defeat was public.] -> defeat_public
* [Continue to final entry.] -> final_entry

=== defeat_public ===
Public and undeniable. Before the crowds, before the Gentile visitors, before the children who would later cry "Hosanna" in the Temple -- the religious leadership was shown to be inadequate. I recorded their defeat alongside their original challenge, for balance.

# UNLOCK_EVIDENCE: witness_scroll
* [Continue to final entry.] -> final_entry

=== authority_inquiry ===
The formal authority challenge arrived with full ceremony -- chief priests, scribes, and elders, three seals on their scroll. "By what authority do you do these things?" they demanded. "Who gave you this authority?"

# UNLOCK_EVIDENCE: question_scroll
* [The question was loaded.] -> question_loaded
* [His response surprised them.] -> response_surprised
* [The counter-question trapped them.] -> counter_question_trapped
* [Continue to start.] -> start

=== question_loaded ===
Loaded, yes. The question carried the weight of Temple law, the Sanhedrin's authority, the full apparatus of religious power. They expected Him to either submit to their jurisdiction or cite a higher authority -- both of which would provide grounds for arrest.

* [The trap was visible.] -> trap_visible
* [They were prepared.] -> they_prepared
* [Continue to His response.] -> response_surprised

=== response_surprised ===
His response surprised them because it was not evasion -- it was another question. "Was John's baptism from heaven or from men?" He put them in the same position they had put Him: forced to choose, forced to commit, forced to either confess or contradict themselves.

* [The baptism question was key.] -> baptism_key
* [They could not answer.] -> could_not_answer
* [Continue to the trap.] -> counter_question_trapped

=== counter_question_trapped ===
Trapped by their own dilemma. If they said "from heaven," He would ask why they did not believe John, who had pointed to Him. If they said "from men," the crowd would turn against them -- the people believed John was a prophet. The Alexandria visitor recorded: "They could not respond because they did not know the answer."

# UNLOCK_EVIDENCE: question_scroll
* [Their silence was recorded.] -> silence_recorded
* [The crowd's reaction.] -> crowd_after_challenge
* [Continue to final entry.] -> final_entry

=== baptism_key ===
The baptism question was key precisely because it was prior. If John's authority was divine, then Jesus's authority -- which John himself had confessed -- was also divine. If John's authority was merely human, then their objection was to a human messenger, which would make them look petty before the crowd.

# UNLOCK_EVIDENCE: question_scroll
* [They were caught in the dilemma.] -> caught_in_dilemma
* [Continue to their silence.] -> silence_recorded

=== could_not_answer ===
Could not answer. The baptism question forced them to choose between acknowledging divine authority or admitting their own ignorance. Neither was acceptable. So they said, "We do not know" -- which was admission enough that their authority question was never about discovering truth.

# UNLOCK_EVIDENCE: question_scroll
* [The council's frustration.] -> council_frustration
* [Return to start.] -> start

=== caught_in_dilemma ===
Caught in the dilemma they had crafted. They muttered "We do not know" -- which was admission enough that their challenge was not about discovering truth but about manufacturing it. I recorded their admission in column three.

# UNLOCK_EVIDENCE: question_scroll
* [The admission was recorded.] -> admission_recorded
* [Continue to final entry.] -> final_entry

=== council_frustration ===
Frustration, yes. I observed the chief priests exchanging glances after that exchange. One muttered something in Aramaic picked up by the court recorder. The Alexandria visitor's scroll records: "They left Him alone, marveling at the answer He had given."

# UNLOCK_EVIDENCE: question_scroll
* [Their retreat was noted.] -> retreat_noted
* [Return to start.] -> start

=== admission_recorded ===
Recorded in my official scroll. "The elders and scribes, having asked Him about His authority, were unable to provide a response to His counter-question." The precision of their defeat was as devastating as the precision of His answers.

# UNLOCK_EVIDENCE: witness_scroll
* [Continue to final entry.] -> final_entry
* [Return to start.] -> start

=== trap_visible ===
Visible from the start. The delegation's body language suggested they had a plan. The formal scroll, the coordinated arrival, the precise question -- all pointed to preparation. What they had not prepared for was being asked about John.

* [They underestimated Him.] -> underestimated_him
* [Continue to baptism key.] -> baptism_key

=== they_prepared ===
Prepared, yes. The delegation arrived at the ninth hour with scrolls in hand, maps drawn, precedents cited. But they had not prepared for being questioned themselves. When He asked about John's baptism, their script fell silent.

# UNLOCK_EVIDENCE: question_scroll
* [Their script failed.] -> script_failed
* [Continue to final entry.] -> final_entry

=== silence_recorded ===
Recorded, yes. Column three, margin note: "The questioners had no answer." That single notation captured the entire morning's outcome. They sought to trap Him, and instead, were trapped by their own inability to formulate a response.

* [The trap was self-inflicted.] -> trap_self_inflicted
* [Return to start.] -> start

=== trap_self_inflicted ===
Self-inflicted, completely. Their question about authority became a question about John. Their question about John became a statement about their own ignorance. Their question about their own ignorance became a public admission that they could not discern divine authority when it stood before them.

# UNLOCK_EVIDENCE: question_scroll
* [The defeat was recorded.] -> defeat_recorded
* [Return to start.] -> start

=== defeat_recorded ===
Recorded in my official scroll. "The elders and scribes, having asked Him about His authority, were unable to provide a response to His counter-question." The precision of their defeat was as devastating as the precision of His answers.

# UNLOCK_EVIDENCE: witness_scroll
* [Continue to final entry.] -> final_entry
* [Return to start.] -> start

=== underestimated_him ===
Underestimated Him, certainly. They thought legal precision would corner Him. Instead, He turned the question of authority back upon them -- who was John? If they affirmed John's divine commission, they affirmed the Teacher's authority. If they denied it, they lost the crowd's respect.

# UNLOCK_EVIDENCE: question_scroll
* [Their retreat was noted.] -> retreat_noted
* [Continue to baptism question.] -> baptism_key

=== script_failed ===
Failed completely. The carefully prepared questions became stammered evasions. The legal experts became beggars for words. The scribes who prided themselves on their ability to answer any theological query found themselves speechless before a Galilean carpenter.

# UNLOCK_EVIDENCE: question_scroll
* [The defeat was public.] -> defeat_public
* [Return to start.] -> start

=== retreat_telling ===
Already covered under retreat_noted above.

* [Return to start.] -> start

=== widow_observation ===
The widow's offering came after the last questioner left. Two small coins into the treasury. I noted it because the treasurer's ledger shows the deposit alongside the substantial contributions from the wealthy. The contrast was unmistakable.

# UNLOCK_EVIDENCE: widow_two_coins
* [The contrast was intentional.] -> intentional_contrast
* [The widow's identity.] -> widow_identity
* [Continue to start.] -> start

=== intentional_contrast ===
Intentional or not, the contrast spoke volumes. The wealthy dropped their contributions from a distance, their coins clinking against the metal slots. The widow -- two leptons, the smallest currency -- placed everything she had into the same chest.

* [The meaning was clear.] -> meaning_clear
* [The lesson was recorded.] -> lesson_recorded
* [Continue to start.] -> start

=== meaning_clear ===
Clear enough for the disciples to remember and record. "Truly I tell you," He said to those nearby, "this poor widow has put in more than all others." Not because her coins were heavier, but because her sacrifice was complete.

# UNLOCK_EVIDENCE: widow_two_coins
* [The scribal note was damning.] -> scribal_note_damning
* [Continue to start.] -> start

=== lesson_recorded ===
Recorded in column twelve of my proceedings scroll. The lesson: the measure is not of what you give, but what you keep. All she had was two coins. All they had was surplus.

# UNLOCK_EVIDENCE: widow_two_coins
* [The testimony stands.] -> testimony_stands_final
* [Return to start.] -> start

=== widow_identity ===
She was a widow -- the most vulnerable position a woman could occupy in our society. Without a husband's protection, dependent on the charity of relatives who might or might not exist. Yet she gave first. The Law required the orphan and the widow be defended. Here was one who defended the Temple treasury with her last coins.

* [The reversal was profound.] -> reversal_profound
* [Return to start.] -> start

=== reversal_profound ===
Profound, yes. The one society expected to beg was the one who gave everything. The scribes who reclined in expensive robes were the ones who devoured widows' houses. The contradiction was not lost on Him -- or on me, who recorded it.

# UNLOCK_EVIDENCE: widow_two_coins
* [The archives stand.] -> archives_stand
* [Return to start.] -> start

=== scribal_note_damning ===
I noted it plainly: "Widow's contribution exceeds all others in proportional giving." The Alexandria visitor's scroll records the same observation. The leadership's wealth and the widow's poverty formed a mirror -- their abundance reflected their spiritual emptiness, her poverty reflected perfect trust.

# UNLOCK_EVIDENCE: widow_two_coins
* [The testimony multiplies.] -> testimony_multiplies
* [Return to start.] -> start

=== archives_stand ===
The archives stand intact. No decree has expunged these records, no fire has consumed them, no enemy has breached the sanctuary where they rest. They speak still, as clearly as they spoke that morning.

# UNLOCK_EVIDENCE: witness_scroll
* [Continue to final entry.] -> final_entry
* [Return to start.] -> start

=== testimony_stands_final ===
The testimony stands. My scrolls, the treasurer's ledger, the crowd's memory, even the dust beneath their sandals -- all bear witness to the fact that the Teacher was not silenced in that court. Instead, His questioners were silenced.

# UNLOCK_EVIDENCE: witness_scroll
* [The case is complete.] -> final_entry

=== final_entry ===
My final entry for the day: "At the close of proceedings, no one dared ask Him any more questions." I dated it, signed it, and sealed it. The archives preserve what the powerful sought to obscure -- and what the powerful witnessed.

# UNLOCK_EVIDENCE: witness_scroll
* [The testimony endures.] -> testimony_endures

=== testimony_endures ===
The testimony endures in ink that will not fade. My scrolls, stored in the Temple archives, preserve evidence that outlasts any attempt to rewrite it. The questioners sought to trap Him; they ended up trapped by their own failed stratagems. I recorded it all.

# UNLOCK_EVIDENCE: witness_scroll
* [End of testimony] -> DONE
