// ============================================================
// CHARACTER: Mary of Bethany (Anointing)
// ACT: Act II
// CASE: The Passover Lamb Pattern (Anointing at Bethany)
// CASE ID: passover_lamb_chain
// CASE EXPORT: passover_lamb_chain
// SOURCE: js/act2_case.js -> NPC 'mary_bethany'
// BIBLE REFERENCE: John 12:1-8; Matthew 26:6-13; Mark 14:3-9
//   Lazarus: John 11:1-44 (raised from the tomb)
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Exodus 12:3-6 — Passover lamb selection, inspection,
//     consecration, and sacrifice
//     Gospel: Jesus entered Jerusalem (selection), was tested in
//     the Temple (inspection), was anointed at Bethany (consecration)
//     Insight: Mary's act mirrors the anointing of a Passover lamb
//     being set apart for sacrifice — four days from selection to
//     slaughter, the same span as the dinner to the cross.
//   - Isaiah 53:10 — "He was cut off... to make a man of sin
//     an offering for sin"
//     Insight: The nard poured on Jesus's feet is the anointing
//     for the altar — the priestly preparation for sacrifice.
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_nard_flask (pure nard, worth 300 denarii)
//   - evidence_foot_anointing (priestly foot-washing pattern)
//   - evidence_burial_preparation (Jesus identified it as such)
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Mary of Bethany — whose brother Lazarus had been
//   raised from the dead by Jesus — hosted a dinner at Simon the
//   Leper's house. She took a pound of expensive spikenard and
//   anointed Jesus's feet, wiping them with her own hair. Judas
//   objected to the cost. Jesus declared the anointing a
//   "fragrant offering and holy" — a preparation for His burial
//   that would be told wherever the Gospel was preached.
//   Significance: Mary's act was the final consecration in the
//   Passover lamb pattern — the lamb, having been selected
//   (Triumphal Entry), inspected (Temple questioning), and
//   now anointed, would be sacrificed days later.
// ------------------------------------------------------------
// WITNESS CROSS-REFERENCE:
//   - Judas (judas_bethany_objection.ink): his objection to the
//     cost reveals the contrast between divine value and human
//     calculation — Mary gave what Judas could not understand.
//   - Martha (martha_bethany.ink): her earlier complaint that
//     Mary sat at Jesus' feet while she served teaches the same
//     lesson in a different way — attention on the person, not
//     the preparation.
//   - Lazarus (lazarus_conspiracy.ink): his resurrection six days
//     earlier was the event that convinced Mary this hour of
//     consecration had come.
// ============================================================

-> start
=== start ===
I had waited for this moment every day since the tomb was emptied — six days, counted carefully, watching the man who called Lazarus forth from death prepare to enter Jerusalem. I had seen the stone rolled away, heard the voice that spoke my brother back to life. If such power lived in that voice — then every breath He took was a gift the world could not afford to waste.
* [The voice that called Lazarus.] -> lazarus_voice
* [You knew what you must do.] -> knew_must_do
* [How did you prepare for this?] -> preparation

=== lazarus_voice ===
# UNLOCK_EVIDENCE: nard_flask
"Lazarus, come forth." Three words, spoken into a tomb that had already begun to smell of death — four days gone, Martha warned Him. And my brother walked out still wrapped in the burial cloths, because death had no more claim on him than a locked door has on a man who already holds the key. I have not been the same since. How could I be?
* [What did that hour mean to you?] -> hour_coming
* [You knew what you must do.] -> knew_must_do

=== hour_coming ===
He had spoken for months of "the hour" that was coming, as though the whole of His life were moving toward a single appointment none of us could see the shape of. Watching Lazarus walk free of the tomb, I understood, without being told, that the hour had finally arrived — and that it would not look the way any of us expected.
* [You knew what you must do.] -> knew_must_do

=== knew_must_do ===
# UNLOCK_EVIDENCE: nard_flask
I knew. Not as a plan forms in the mind, slowly, with reasons stacked on reasons — I knew the way you know a door has opened in a dark room, before you can see it, simply because the air has changed. Whatever I had left to give, it belonged to Him now. There was no version of gratitude smaller than everything.
* [Why a sacrifice, specifically?] -> fitting_sacrifice
* [How did you prepare for this?] -> preparation

=== fitting_sacrifice ===
Our fathers have always known that the costliest gift is the only honest one. A lamb without blemish, watched over for four days before the altar — not because God needs our accounting, but because we need the waiting, to feel the weight of what we are about to give. I did not choose the timing by design. I only know that from the day He entered Jerusalem to the day they nailed Him to a Roman cross was the very same span the Law sets for a lamb between its selection and its slaughter.
* [Tell me about the oil itself.] -> oil_expensive

=== preparation ===
# UNLOCK_EVIDENCE: nard_flask
I sent to Jericho for it, weeks before, when the merchants who trade the caravan routes still had a jar left of true nard — not the diluted oils sold to pilgrims at inflated Passover prices, but pistic nard, pressed once, unmixed, carried up from the far side of the mountains where the plant actually grows. I did not know, then, exactly what I was preparing it for. I only knew it had to be the truest thing I owned.
* [Tell me about the oil itself.] -> oil_expensive

=== oil_expensive ===
A full pound of it, in an alabaster flask sealed at the neck. Judas did the arithmetic before I had even finished pouring — three hundred denarii, he said, as though I had not already done that sum myself a hundred times in the weeks before. Three hundred denarii is a laborer's wages for the better part of a year. I did not spend it lightly. I spent it exactly because it was not light.
* [Where did the money come from?] -> familys_savings
* [What happened at the dinner?] -> choice_final

=== familys_savings ===
It was what remained of our family's portion — what Lazarus, Martha, and I had set aside since our father died, the closest thing to a dowry or an inheritance a household like ours could hold. I did not ask my brother or sister for it. I did not need to. They had watched the same tomb open. They understood, before I said a word, what the money was for.
* [What happened at the dinner?] -> choice_final

=== choice_final ===
Simon had set his table the way you set a table when you are grateful and do not know how to say so — the leper healed, hosting the man who healed him, and my own brother reclining at that same table breathing, eating, laughing, four days after I had watched them roll a stone across the mouth of his grave. In the middle of all that gratitude, mine could not stay seated. I rose from my place at the table and went to Him.
* [What did you do next?] -> seal_broken

=== seal_broken ===
# UNLOCK_EVIDENCE: evidence_nard_flask
I broke the seal at the neck of the flask myself. There is no way to use nard like that carefully — an alabaster jar like mine is sealed to be broken, not measured out drop by drop. Some of the guests must have thought I intended to anoint His head, the way a king is anointed, the way Samuel once anointed a shepherd boy with the horn of oil that made him Israel's king. I knelt at His feet instead.
* [Continue.] -> pouring_complete

=== pouring_complete ===
I poured until the flask was empty. The whole house filled with the scent within moments — thick, sweet, unmistakable, the kind of fragrance that does not stay politely in one room. Every guest at that table breathed in what I had given, whether they understood it or not.
* [You anointed His feet, not His head?] -> feet_anointed

=== feet_anointed ===
# UNLOCK_EVIDENCE: evidence_foot_anointing
His feet, not His head. A king is anointed on the head, lifted up before his people. I anointed the part of Him that touches the road, that carries the dust of every village He has walked through to reach the ones no one else would visit. Within the week He would kneel and wash His own disciples' feet with water from a basin, and I have wondered since whether He remembered, kneeling there, that a woman had once knelt at His feet the same way.
* [And then you let down your hair.] -> hair_unbound

=== hair_unbound ===
I unbound my hair in front of that entire table. A woman does not do that — not in company, not before men who are not her husband. It is the kind of thing a household remembers about you for years, the kind of thing said behind hands at the well. I did not think of any of that while I was doing it. I only had oil on His feet and no cloth in reach, and my hair was what I had.
* [You didn't care what it looked like.] -> tears_mixed
* [This gesture mirrors your brother's healing.] -> healing_complete

=== healing_complete ===
It was the only way I knew to answer what He had done for Lazarus. He gave my brother back his breath. I could not give Him anything of that size in return — no one could — but I could give Him the costliest thing I owned and the last shred of my own reputation besides, and let both of them dry into His skin along with the oil.
* [Continue.] -> tears_mixed

=== tears_mixed ===
I was weeping before I realized I had started. It surprised me more than it surprised anyone watching. The oil and the tears ran together over His feet, and I wiped both away with my hair, and somewhere in the middle of it I stopped being able to tell which one I was offering Him and which one He was simply letting me spend.
* [That's when Judas objected.] -> cost_counted

=== cost_counted ===
Judas said it loud enough for the whole table to hear — "Why was this ointment not sold for three hundred denarii and given to the poor?" I did not lift my head. I already knew what a room sounds like when it is deciding, all at once, whether to be embarrassed for you or with you.
* [What did Jesus say in your defense?] -> richness_spiritual

=== richness_spiritual ===
# UNLOCK_EVIDENCE: evidence_burial_preparation
"Let her alone," He said. "Why do you trouble her? She has done a beautiful thing to Me. For you have the poor with you always, and whenever you wish you may do them good; but Me you do not have always. She has done what she could. She has come beforehand to anoint My body for burial." The table went silent in a different way after that — not embarrassed anymore. Afraid, some of them, though they would not have used that word.
* [How did that make you feel?] -> satisfaction_real

=== satisfaction_real ===
I did not feel vindicated, exactly — vindication is a small, sharp thing, and what I felt was wider than that. I felt seen. Every ointment merchant, every whispered word at the well about the unmarried woman who let down her hair in front of a table of men, every coin my family had set aside — He named all of it a beautiful thing, out loud, in front of everyone who would later claim they had not understood what I was doing.
* [Did you understand what it meant?] -> dawn_would_come

=== dawn_would_come ===
Not fully — not that night. I understood I was preparing Him for something, the way you prepare anything you are about to lose. I did not yet know it would be four days from that table to a cross, or that the very dawn we were all waiting for, without knowing it, would not come the way any of us expected.
* [What did He promise about your act?] -> testimony_endure

=== testimony_endure ===
"Truly, I say to you, wherever this gospel is preached in the whole world, what she has done will also be told in memory of her." He said it plainly, in front of witnesses, so that no later argument about my reputation could erase it from the record. I have thought of that promise every day since, Scribe — that you are here, writing this down, is the promise still being kept.
* [How does this connect to the Passover lamb?] -> prophecy_fulfilled_detail

=== prophecy_fulfilled_detail ===
The Law in Exodus sets the pattern exactly: on the tenth day, the lamb is selected from the flock. For four days it is kept under watch — inspected, examined, proven without blemish. On the fourteenth day, at twilight, it is slaughtered. Count it yourself, Scribe. He entered Jerusalem to the crowds — selected. He was questioned in the Temple by every authority who wanted Him gone — inspected. I anointed Him at Simon's table — consecrated. Isaiah wrote it seven hundred years early: "He was cut off... to make Him an offering for sin." I did not plan the timing. I only did what my hands already knew to do.
* [What happened after His death?] -> resurrection_come

=== resurrection_come ===
The other women — Mary Magdalene among them — bought their own spices after the Sabbath, meaning to finish what a proper burial required, since there had been no time before the Sabbath fell. They reached the tomb at first light only to find it empty and the stone already rolled away. I have turned that over many times since. Mine was the anointing that was allowed to happen. Theirs, the Lord Himself made unnecessary before they ever arrived with it.
* [The fragrance filled the house.] -> flow_complete

=== flow_complete ===
I am told the fragrance stayed in that house for days — clinging to the beams, the cushions, the clothing of everyone who had been at the table. I have wondered whether it followed Him all the way to the cross, whether the soldiers who stripped His garments caught some trace of nard still clinging to the hem, not knowing what it meant, or where it had come from, or whose hands had poured it.
* [Continue.] -> testimony_true

=== testimony_true ===
Write it down faithfully, Scribe, however it reads to you. I know what my testimony is worth in this city, before men like the ones who will read your record — a woman's word, weighed lightly, if it is weighed at all. But He told this story in front of witnesses who could not un-hear it, and named it Himself as something the whole world would carry. My part in it is small. My testimony of it is not, and I will not let it be made smaller than He made it.
-> DONE
