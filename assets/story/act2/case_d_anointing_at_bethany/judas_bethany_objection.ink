// ============================================================
// CHARACTER: Judas Iscariot (Bethany Objection)
// ACT: Act II
// CASE: The Passover Lamb Pattern (Anointing at Bethany)
// CASE ID: passover_lamb_chain
// CASE EXPORT: passover_lamb_chain
// SOURCE: js/act2_case.js -> NPC 'judas_bethany'
// BIBLE REFERENCE: John 12:4-6, 27; Matthew 26:6-13; Mark 14:3-9
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Exodus 12:3-6 — Passover lamb selection and inspection
//     Gospel: Jesus entered Jerusalem (selection), was tested in
//     the Temple (inspection), anointed at Bethany (consecration)
//     Insight: The anointing at Bethany mirrors the Passover lamb
//     being kept under watch for four days before sacrifice
//   - Zechariah 11:12-13
//     Gospel: Matthew 26:15; 27:3-10
//     Insight: The greed Judas voices at Bethany over 300 denarii
//     is the same appetite that later settles for thirty pieces of
//     silver — a straight line from this dinner to the betrayal.
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_judas_motive_exposed (Judas's true motive revealed)
//   - evidence_money_bag_pilfering (history of skimming funds)
//   - evidence_betrayal_preparation (plan already forming)
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Judas Iscariot, keeper of the money bag, objects
//   loudly to Mary's anointing of Jesus with expensive nard,
//   claiming the cost could have fed the poor. John records that
//   Judas was not motivated by concern for the poor but was a
//   thief, skimming from the group's funds. His objection masks
//   the greed and resentment that would lead to betrayal.
//   Significance: Judas's complaint contrasts "waste" with
//   worship — but Jesus declares the anointing a preparation for
//   burial. Judas's objection exposes his inability to recognize
//   divine value when it demands cost.
// ------------------------------------------------------------
// WITNESS CROSS-REFERENCE:
//   - Mary (mary_bethany_anointing.ink): her act of worship, which
//     Judas objects to, directly parallels the disciples' later
//     question "Who then is this, that you will give the kingdom
//     to you?" — Judas asks what the money could do.
//   - Lazarus (lazarus_conspiracy.ink): recently raised from the
//     dead, demonstrating Jesus's power over death — Judas sees
//     this power as something to be bought, not given.
//   - Peter (peter_defense.ink): Peter's later rebuke of Judas
//     in Acts 1:25, "He was a guide to those who crucify him."
// ============================================================

-> start
=== start ===
# UNLOCK_EVIDENCE: alabaster_jar
# UNLOCK_EVIDENCE: evidence_judas_motive_exposed
# UNLOCK_EVIDENCE: evidence_money_bag_pilfering
# UNLOCK_EVIDENCE: evidence_betrayal_preparation
Twenty pieces of silver would have fed a family for months. I said it quietly at first — "Why was this ointment not sold for three hundred denarii and given to the poor?" Three hundred — the weight of a slave's life in this city. The perfume was expensive. The gesture — unnecessary.
+ [You were concerned for the poor.] -> concern_claim
+ [Why did you object so strongly?] -> strong_objection
+ [What did Lazarus's raising have to do with it?] -> lazarus_reflect

=== strong_objection ===
Strongly? I raised my voice at a dinner table, that is all. Someone had to say the practical thing out loud. The rest of them were too moved by the performance of it to do the arithmetic I had already done in my head before she'd finished pouring.
+ [You raised your voice at a dinner table.] -> dinner_table
+ [You were concerned for the poor.] -> concern_claim

=== lazarus_reflect ===
Lazarus. Yes — I watched a dead man walk out of his own tomb six days before that dinner, and I have not slept properly since. You want to know what that has to do with a jar of oil? Everything, and nothing, and I would rather talk about the money, if you don't mind, because the money is a subject I can still make sense of.
+ [You still haven't answered about Lazarus.] -> coins_handled
+ [The money could have done much.] -> money_potential

=== concern_claim ===
Concern for the poor! Of course it was. I have walked these streets and seen children eat dust while the Temple priests count coins. Three hundred denarii — that is not a trifle to waste on perfume when children cry for bread in the alleys behind the temple courts.
+ [Your motives weren't questioned?] -> questioned_motives
+ [The money could have done much.] -> money_potential

=== questioned_motives ===
Questioned by whom — you? I keep the money bag for this entire company. Twelve men, three years, and I am the one who has counted every denarius that came in and went back out again to feed us, house us, clothe us. If anyone in that room had earned the right to speak on money, it was me.
+ [What did He say in response?] -> what_he_said

=== what_he_said ===
"For you always have the poor with you, but you do not always have me. She has done a beautiful thing to me — for she prepared me for the burial." He said it was for His burial! Not celebration, but preparation for death.
+ [Preparation for burial.] -> burial_prep
+ [Why did that unsettle you?] -> unsettled

=== burial_prep ===
Preparation for burial. That is what He called it, in front of the whole table, as though dying were already a settled matter and the only question left was whether the oil had been applied correctly. I told myself it was a metaphor. Rabbis speak in figures. It is easier to file a man's words as a figure of speech than to sit with what they actually mean.
+ [You didn't believe Him.] -> good_deed
+ [Why did that unsettle you?] -> unsettled

=== unsettled ===
Unsettled is a generous word for it. I felt something close my throat for a moment — the same feeling I get counting coins that don't add up to what the ledger says they should. I decided it was the wine, or the heat of the room, or simply that I hadn't eaten enough that day. A man can always find a reason that isn't the true one, if he wants it badly enough.
+ [Continue.] -> cost_considered

=== good_deed ===
"A beautiful thing," He called it. I have turned that phrase over more times than I care to admit. A beautiful thing, and a wasteful one, can apparently be the same object depending entirely on who is looking at it. I decided that was His problem to carry, not mine.
+ [Continue.] -> cost_considered

=== cost_considered ===
Three hundred denarii. I did the sum again that night, lying awake — what it would have bought, what it would have covered, how many weeks of bread for how many mouths. I told myself the number mattered more than the moment. It is easier to argue with a number than with a woman weeping over a man's feet.
+ [The poor were never really your concern, were they?] -> practical_rejected

=== money_potential ===
Think what that sum could have done. Grain for a season. Shelter through a winter. Instead it sat evaporating into the floorboards of Simon's house, perfuming a room that would forget the smell of it within the week. I still believe the money could have mattered more than the moment did.
+ [Practical concerns, or something else?] -> practical_rejected

=== practical_rejected ===
Practical, yes — or so I told myself, right up until He said the poor would always be there and I would not always have Him, and something in me heard it as a verdict rather than an answer. I do not enjoy admitting that a rebuke can sound like it was aimed at exactly one person in a crowded room.
+ [Continue.] -> dinner_table

=== dinner_table ===
The table that night was full of gratitude I did not share — Simon healed, Lazarus breathing, Martha serving with her sleeves pushed up like nothing unusual had happened at all. I sat at the edge of it, watching, doing arithmetic no one else in that room seemed interested in doing. That is the night I remember thinking, clearly, for the first time, that I was no longer sure what I was still doing among them.
+ [What happened as you managed the money that night?] -> coins_handled

=== coins_handled ===
I managed the bag the way I always managed it — counting it twice, once for the group and once for myself. It was not the first time a few coins found their way into my own purse before the total was recorded. John will write, later, that I did not care about the poor because I was a thief and kept the money bag and used to help myself to what was put into it. He will not be wrong.
+ [This wasn't the first time you'd taken more than your share.] -> plan_forming

=== plan_forming ===
The plan began forming — not that night, but weeks before. The money bag was not the only thing I could offer the high priest. Information was more valuable than silver. Access was more valuable than coins.
+ [What information did you offer?] -> information_offered
+ [The price was discussed.] -> price_discussed

=== information_offered ===
Where He slept when He was outside the city. Which nights He withdrew to pray alone, away from the crowds who might have made an arrest impossible. Small things — a schedule, a habit, the kind of ordinary detail a man only knows if he has spent three years close enough to notice it. I told myself I was simply providing facts. Facts have no blood on them, or so I wanted to believe.
+ [The price was discussed.] -> price_discussed

=== price_discussed ===
The number came up quickly, once I was actually standing in front of Caiaphas rather than merely resenting him from a distance. Thirty pieces of silver. I did not haggle. I have wondered since whether that should have told me something about how little I actually valued what I was selling — or how little I let myself think about it while I was selling it.
+ [Continue.] -> agreement_sealed

=== agreement_sealed ===
They weighed it out and I took it, and the agreement was sealed the way agreements are always sealed — quietly, in a back room, by men who had already decided the outcome before the conversation began. I remember thinking it felt smaller than I expected. Betrayal, up close, is a remarkably unremarkable transaction.
+ [Continue.] -> betrayal_bargained

=== betrayal_bargained ===
If you trace it back far enough, Scribe, it starts at that dinner table in Bethany, not in the council chamber. The chamber is only where the resentment finally found a price. The resentment itself was born the night a woman poured a year's wages over a man's feet and called it worship, and I called it waste, and neither of us ever really convinced the other.
+ [Did you know this fulfilled prophecy?] -> zechariah_wrote

=== zechariah_wrote ===
Prophecy. That word sits strangely in my mouth even now. I was not trying to fulfill anything. I was trying to settle an account that had never sat right with me. And yet Zechariah wrote it four hundred years before I was born — thirty pieces of silver, weighed out exactly, cast to the potter in the house of the Lord. I chose my own price. Scripture had already written it down before I chose it. I do not know what to do with that, except to keep talking to you until it stops sitting on my chest.
+ [Continue.] -> field_of_blood_detail

=== field_of_blood_detail ===
I could not keep the silver, in the end. I threw it back at the priests' feet and they used it to buy a field for burying strangers — men with no names left to claim them. Even they would not let it touch the treasury. They knew what it was, whatever they told themselves about it afterward.
+ [Continue.] -> earth_testimony

=== earth_testimony ===
The field is still there, as far as I know — they call it Akeldama now, the Field of Blood. I did not mean to leave a monument. I only meant to be rid of the coins. But the ground itself remembers what I could not make myself forget, and it does not need my permission to keep testifying, whatever I say to you in this room.
+ [Continue.] -> testimony_stands_detail

=== testimony_stands_detail ===
You can write down whatever you like about my motives, Scribe. I have offered you the poor, and the practicalities, and the arithmetic, and every reasonable-sounding cover I could find for what happened at that table. None of it changes the ledger. I skimmed the bag before that dinner. I resented her gift during it. I sold Him after it. The testimony against me was never really in question — I was only ever deciding how long I could keep from saying so myself.
-> DONE
