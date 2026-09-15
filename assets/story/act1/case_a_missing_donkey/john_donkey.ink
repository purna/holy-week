// ============================================================
// CHARACTER: John the Apostle (Donkey Witness)
// ACT: Act I
// CASE: The Missing Donkey
// CASE ID: triumphal_entry
// CASE EXPORT: triumphal_entry
// SOURCE: js/act1_case.js -> NPC 'john' (Disciple of Jesus)
// BIBLE REFERENCE: Matthew 21:1-11; Mark 11:1-11; Luke 19:28-40; John 12:12-19
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Zechariah 9:9
//     Gospel: Matthew 21:4-5; John 12:14-15
//     Insight: Jesus fulfilled the ancient prophecy by riding into
//     Jerusalem on a donkey colt — the symbol of a peaceful king.
//   - Psalm 118:25-26
//     Gospel: Matthew 21:9; Mark 11:9-10
//     Insight: "Blessed is He who comes in the name of the Lord"
//     was the crowd's messianic acclamation, fulfilled as the
//     people recognized Jesus as their king.
//   - Isaiah 62:11
//     Gospel: Matthew 21:5
//     Insight: "Behold, the Lord has proclaimed to Zion, 'See, your
//     salvation comes.' " The crowd's "Hosanna" was the answer to
//     Isaiah's call.
// ============================================================

-> start

=== start ===
I have walked with the Teacher for three years, but today — today I understood something I had never grasped before. From my place among the disciples, I watched the crowds recognize in Him the fulfillment of prophecies written centuries before our birth.

* [Tell me about the crowd.] -> crowd
* [Did you see the prophecy fulfilled?] -> fulfilled
* [What about the donkey colt?] -> colt

=== crowd ===
# UNLOCK_EVIDENCE: donkey_tracks
# UNLOCK_EVIDENCE: crowd_testimony
# UNLOCK_EVIDENCE: witness_account
The road from Bethphage to Jerusalem was a river of people. Pilgrims from Galilee, Judea, and beyond — all streaming down the Mount of Olives. When we emerged from the garden with the colt, the crowd simply knew. They understood without being told. Children waved palm branches. Elders fell to their knees. Even the soldiers on the walls looked uncertain.

* [The people recognized the moment.] -> recognition
* [The soldiers seemed confused.] -> soldiers
* [Conclude.] -> hour_arrived

=== fulfilled ===
# UNLOCK_EVIDENCE: donkey_tracks
# UNLOCK_EVIDENCE: crowd_testimony
# UNLOCK_EVIDENCE: witness_account
Every detail matched exactly. The donkey — never ridden. The cloaks spread on the road. The palm branches waving. "Hosanna to the Son of David!" — that cry rose like incense. I kept thinking of Zechariah's words: "Your king comes to you... humble and riding on a donkey." It was living prophecy.

* [Did the people know what they were saying?] -> hosanna_meaning
* [The detail was divine.] -> divine_detail
* [Conclude.] -> hour_arrived

=== colt ===
# UNLOCK_EVIDENCE: donkey_tracks
# UNLOCK_EVIDENCE: crowd_testimony
# UNLOCK_EVIDENCE: witness_account
The colt had never been ridden — our mothers taught us that such an animal is set apart. When the Lord said "the Lord needs it," the owner understood at once. "Let my lord go in peace," he surely meant. No transaction. No payment. Just recognition that this was the moment.

* [The owner was a prophet too.] -> owner_recognized
* [No one questioned it.] -> no_questions

=== recognition ===
I watched old men weep as they recognized the scene. They had studied the same scriptures their whole lives. Suddenly the words had feet, had voice, had presence. The crowd sang in fragments I recognized — Psalms my grandmother taught me as a child. But now the Psalms were alive with meaning.

* [The scriptures became real.] -> common_node
* [Prophecy walking among them.] -> common_node
* [Conclude.] -> hour_arrived

=== soldiers ===
The Antonia garrison was positioned on the walls. I saw them tense — spears half-raised, eyes scanning the crowd for signs of unrest. But we gave them no cause. The crowd was too focused on the Teacher, too caught up in the joy of recognition.

* [Rome had no cause for alarm.] -> common_node
* [Conclude.] -> hour_arrived
* [The soldiers watched silently.] -> common_node
* [Conclude.] -> hour_arrived

=== hosanna_meaning ===
"Hosanna" — that word echoed from every throat. "Save now, we beseech You!" It is not praise. It is desperation. A cry for salvation. The crowd knew what they needed. The crowd knew what they were asking for.

* [They asked for salvation.] -> common_node
* [The moment was urgent.] -> common_node
* [Conclude.] -> hour_arrived

=== divine_detail ===
Every detail was arranged — the exact colt, the precise timing, the crowd's movement like a choreographed dance. The Teacher did not arrive by accident. He orchestrated the convergence of prophecy, prophecy-fulfillment, and people ready to receive their king.

* [This was divine appointment.] -> common_node
* [Nothing was left to chance.] -> common_node
* [Conclude.] -> hour_arrived

=== owner_recognized ===
The owner of the colt — his name was Tobias — I recognized his face from Bethphage. When the Teacher's disciple spoke the words, Tobias simply nodded. He had been waiting. His entire life he had prepared for this moment. The colt was his offering.

* [Waiting his whole life.] -> common_node
* [A willing sacrifice.] -> common_node

=== no_questions ===
No one questioned. No one challenged. The owner released his best animal without a second thought. The crowd made room without hesitation. Even the soldiers on the wall stood back.

Because everyone recognized: this was not theft or rebellion. This was worship.

* [Worship in motion.] -> common_node
* [The city bowed.] -> common_node

=== hour_arrived ===
The hour had arrived. The moment foretold. The prophecy fulfilled. The king entered. The people recognized. And history was changed forever.
* [Finish the interview.] -> final

=== final ===
I am John. I have walked with the Teacher for three years. I have seen his miracles. I have heard his teachings. But today — today I understood who he truly was. And I knew — from this moment forward — everything would be different.

// ── Streamlined Shared Knot ─────────────────────────────
-> DONE

=== common_node ===
The weight of the moment hangs heavy over the streets, and the consequences of what is unfolding continue to ripple through the city.

* [Return to the start] -> start
* [Conclude] -> hour_arrived
```[cite: 3]
