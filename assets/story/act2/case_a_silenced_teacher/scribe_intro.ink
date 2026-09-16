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
// ============================================================

-> start

=== start ===
# UNLOCK_EVIDENCE: question_scroll
# UNLOCK_EVIDENCE: witness_scroll
# UNLOCK_EVIDENCE: coin_of_caesar
# UNLOCK_EVIDENCE: widow_two_coins
I am Master Scribe Samuel. The archives hold testimony — not opinion. My scrolls from this morning record every question the Sanhedrin dared to raise, and every answer that left them with nothing further to say. The religious leadership came with scrolls, seals, and strategies. They left with silence.

+ [Tell me about the authority challenge.] -> authority_challenge
+ [The tax question and Caesar's coin.] -> caesar_coin
+ [The widow's offering.] -> widow_offering

=== authority_challenge ===
The formal authority challenge arrived with full ceremony — chief priests, scribes, and elders, three seals on their scroll. "By what authority do you do these things?" they demanded. "Who gave you this authority?"

His response surprised them. Not evasion — another question. "Was John's baptism from heaven or from men?" He put them in the same position they had put Him: forced to choose, forced to commit.

+ [They were caught in the dilemma.] -> dilemma_caught
+ [Their silence was recorded.] -> silence_recorded

=== dilemma_caught ===
If they said "from heaven," He would ask why they did not believe John, who had pointed to Him. If they said "from men," the crowd would turn against them — the people believed John was a prophet. The Alexandria visitor recorded: "They could not respond because they did not know the answer."

+ [The trap was self-inflicted.] -> trap_self_inflicted

=== silence_recorded ===
Column three, margin note: "The questioners had no answer." That single notation captured the entire morning's outcome. They sought to trap Him, and instead, were trapped by their own inability to formulate a response.

+ [The defeat was public.] -> public_defeat

=== trap_self_inflicted ===
Completely. Their question about authority became a question about John. Their question about John became a statement about their own ignorance. Their question about their own ignorance became a public admission that they could not discern divine authority when it stood before them.

+ [The defeat was recorded.] -> public_defeat

=== public_defeat ===
Before the crowds, before the Gentile visitors, before the children who would later cry "Hosanna" — the religious leadership was shown to be inadequate. My scroll records their original challenge alongside their defeated retreat. The precision of their defeat matched the precision of His answers.

+ [Continue to final entry.] -> final_entry

=== caesar_coin ===
The Herodian delegation brought a denarius, expecting a Yes or No on tribute. He asked whose image bore on the coin. Caesar's. And whose inscription? Caesar's. Then: "Render therefore to Caesar the things that are Caesar's, and to God the things that are God's."


The trap snapped shut on them instead of Him. The image on the coin — Caesar's — became the instrument to teach about the divine image in humanity.

+ [The crowd recognized the shift.] -> crowd_recognized
+ [The Herodians left confused.] -> herodians_confused

=== crowd_recognized ===
The crowd recognised the shift instantly. He had not said "pay taxes" or "refuse taxes." He had reframed the entire question around image and allegiance. Caesar's image on the coin; God's image on every person listening. The delegation walked away without retrieving their denarius from the Temple floor.

+ [The leadership's frustration.] -> leadership_frustration

=== herodians_confused ===
They expected political evasion. They received divine philosophy. Their coin — inscribed with Caesar's image — became the instrument through which they learned about the divine image in humanity. Their body language suggested they had a plan. What they had not prepared for was being questioned themselves.

+ [Their script failed.] -> script_failed

=== leadership_frustration ===
Frustration marked their retreat. The chief priests exchanged glances. One muttered something in Aramaic, caught by the court recorder. The Alexandria visitor's scroll records: "They left Him alone, marveling at the answer He had given."

+ [Their retreat was noted.] -> public_defeat

=== script_failed ===
The carefully prepared questions became stammered evasions. The legal experts became beggars for words. The scribes who prided themselves on their ability to answer any theological query found themselves speechless before a Galilean carpenter.

+ [The defeat was recorded.] -> public_defeat

=== widow_offering ===
The widow's offering came after the last questioner left. Two small coins into the treasury. I noted it because the treasurer's ledger shows the deposit alongside the substantial contributions from the wealthy. The contrast was unmistakable.

+ [More than she had.] -> sacrifice_meaning
+ [The scribes devoured widows' houses.] -> scribal_hypocrisy

=== sacrifice_meaning ===
Clear enough for the disciples to remember and record. "Truly I tell you," He said to those nearby, "this poor widow has put in more than all others." Not because her coins were heavier, but because her sacrifice was complete. The measure is not of what you give, but what you keep.

+ [The testimony stands.] -> final_entry

=== scribal_hypocrisy ===
The contradiction was not lost on Him — or on me, who recorded it. The scribes who reclined in expensive robes were the ones who devoured widows' houses. The one society expected to beg was the one who gave everything. My note: "Widow's contribution exceeds all others in proportional giving."

+ [The testimony stands.] -> final_entry

=== final_entry ===
My final entry for the day: "At the close of proceedings, no one dared ask Him any more questions." I dated it, signed it, and sealed it. The archives preserve what the powerful sought to obscure.

+ [The testimony endures.] -> testimony_endures

=== testimony_endures ===
The testimony endures in ink that will not fade. My scrolls, stored in the Temple archives, preserve evidence that outlasts any attempt to rewrite it. The questioners sought to trap Him; they ended up trapped by their own failed stratagems. I recorded it all.

+ [Finish the interview.] -> closing_scribe

=== closing_scribe ===
The stone the builders rejected has become the cornerstone. Before the religious leadership stood a prophet, a teacher, a king — and they silenced Him with their questions. But the questions they hurled became the very words that silenced them. My scrolls preserve what power could not erase.

-> DONE
