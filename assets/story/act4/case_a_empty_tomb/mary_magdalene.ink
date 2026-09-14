// ============================================================
// CHARACTER: Mary Magdalene
// ACT: Act IV
// CASE: The Empty Tomb
// CASE ID: resurrection
// CASE EXPORT: resurrection
// SOURCE: act4_case_2d.js -> NPC 'mary_magdalene'
// BIBLE REFERENCE: John 20:1-18; Mark 16:9; Matthew 28:1-10;
//   Luke 8:1-3 (delivery from demons)
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_resurrection_appearance (Mary's encounter with the risen Jesus)
//   - evidence_mary_testimony (her testimony to the disciples)
//   - evidence_empty_tomb (the rolled-away stone and empty linen wrappings)
//   - evidence_jesus_voice (His voice calling her name)
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Psalm 16:10
//     Gospel: Acts 2:27-31 — Peter quotes Psalm 16:10 at Pentecost
//     Insight: David wrote Psalm 16 in first person, but Acts 2:29-31
//     records Peter explaining that David was a prophet who "seeing
//     what was ahead, spoke about the resurrection of the Christ."
//   - Hosea 6:2
//     Gospel: 1 Corinthians 15:4 — the resurrection happened
//     "according to the Scriptures," citing the three-day pattern
//   - Isaiah 53:10-11
//     Gospel: John 20:11-18 — Jesus appears alive after suffering
//     Insight: Isaiah 53:10 prophesied that the righteous servant
//     would be resurrected after suffering — the resurrection is
//     the vindication of the crucifixion.
//   - Psalm 22:1-31
//     Gospel: Matthew 27:46 (crucifixion); closing verses look
//     beyond suffering to vindication — fulfilled in the empty tomb
//   - Jonah 1:17 / Matthew 12:40
//     Gospel: Jesus: "For as Jonah was three days and three nights
//     in the belly of the great fish, so the Son of Man will be
//     three days and three nights in the heart of the earth."
//     Insight: Jesus explicitly connected His death and resurrection
//     to Jonah's three days in the fish.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Early on Sunday morning, Nisan 17, Mary Magdalene came
//   to the garden tomb and found the stone rolled away. She saw the
//   empty tomb and initially mistook the risen Christ for a gardener.
//   When He spoke her name, she recognized Him.
//   Significance: Mary was the first witness to the resurrection.
//   A former demoniac, delivered by Jesus, became the first to see
//   the risen Lord and proclaim the Gospel. Her testimony was
//   authentic — the religious leaders could not deny a woman's
//   witness, but they rejected it anyway.
// ============================================================

-> start
=== start ===
I am Mary of Magdala. Seven demons were cast from me by the word of His mouth. My mind was a wilderness before that day. After it, I had a memory — and a purpose. I came to the tomb at dawn, while it was still dark, expecting to anoint the body and complete what we could not finish.
* [You had come to mourn.] -> mourning
* [What did you hope for?] -> hope_before
* [The weight of grief.] -> grief_weight

=== mourning ===
# UNLOCK_EVIDENCE: mary_encounter
# UNLOCK_EVIDENCE: empty_tomb
# UNLOCK_EVIDENCE: burial_linen
I had not slept. Not since the afternoon they took Him away. The weight of a lifeless body in the tomb, the scent of spices and myrrh, the knowledge that death itself had won — these were the things I brought with me as I walked the garden path.
* [The stone blocked the way.] -> stone_rolled
* [You expected to grieve in silence.] -> grief_weight

=== hope_before ===
# UNLOCK_EVIDENCE: angelic_witness
# UNLOCK_EVIDENCE: empty_tomb
# UNLOCK_EVIDENCE: burial_linen
Hope? No — hope had died with Him on the cross. I came to anoint what was dead. To touch what was cold. To perform the last rites of love on a body that would never rise. Grief was my companion. Faith was a memory.
* [How could you keep coming?] -> perseverance
* [The love that brought you.] -> grief_weight

=== grief_weight ===
# UNLOCK_EVIDENCE: mary_encounter
# UNLOCK_EVIDENCE: angelic_witness
# UNLOCK_EVIDENCE: empty_tomb
# UNLOCK_EVIDENCE: burial_linen
Grief is heavier than marble. It settles in the chest like stone. It makes the legs unsteady. It turns the world gray. I carried that weight — the weight of a life that meant everything to me, now gone. The weight of a love that had nowhere to go but to the tomb.
* [You still came to the tomb.] -> stone_rolled
* [What gave you strength?] -> strength_dawn

=== stone_rolled ===
The stone was not merely heavy — tradition says it was a circular wheel of basalt, set in a groove, requiring a team to move it. And yet, in the dawn light, it was simply... rolled away. Not broken. Not stolen. Rolling like a door opening on a room that had never seen morning.
* [You saw it with your own eyes.] -> empty_tomb
* [Your first thought?] -> panic_fear

=== panic_fear ===
My first thought was not joy. It was panic. Someone has taken the body. The disciples will think I am mad. The priests will say I am a hysterical woman. Anything — anything — to discredit what I would report. I ran.
* [To whom did you run?] -> peter_and_john
* [What did you tell them?] -> running_report

=== empty_tomb ===
Inside, the linen wrappings lay there like the husk of a cocoon. The cloth that had bound His face was folded, placed where His head had lain. No disturbance. No struggle. No violence. As if the body had simply... passed through. As if death itself had been bypassed.
* [The wrappings were undisturbed.] -> encounter
* [You knew in that moment.] -> realization

=== realization ===
In that moment, I knew one of two things: either someone had stolen Him with impossible gentleness — leaving the wrappings undisturbed, the stone rolled away without breaking the seal — or the grave had no power over Him. The first explanation required more miracles than the second.
* [You looked for the living among the dead.] -> encounter
* [The truth was simpler.] -> truth_simple

=== encounter ===
I turned away from the tomb, still weeping, still searching. And then I saw Him — not far from where the angels stood. I thought He was the gardener. The morning light caught His face, His hair, the dust on His feet. "Woman," He called.
* [Then He spoke your name.] -> jesus_voice
* [The voice was familiar.] -> voice_familiar

=== jesus_voice ===
"Mary." My name. The sound of it — not as strangers might say it, but as the One who had walked with me, who had looked at me with compassion when I was unclean, who had spoken peace to the demons that tormented me. The voice that knew every secret thought, every hidden shame, every moment of my unraveling.
* [How did you recognize Him?] -> recognition
* [What happened in that instant?] -> soul_recognition

=== soul_recognition ===
The recognition was not in the eyes or the face or even the voice. It was deeper. Deeper than recognition. It was reunion. The voice that called me from the edge of death back to life — the voice that had healed my wounds and named me beloved — was speaking to me now. Alive.
* [I threw my arms around Him.] -> embrace
* [He was real.] -> reality_confirm

=== voice_familiar ===
The voice I had lived with for three years — the voice that spoke in parables and healed the sick, the voice that had whispered to me when I was unclean and tormented — it was the same voice. And it was different. Transfigured. Elevated. As if the same love that spoke to a broken woman by the Sea of Galilee now spoke with the authority of one who had conquered death itself.
* [That was enough.] -> embrace

=== recognition ===
I said, "Rabboni!" — Teacher. My Teacher. The one who had spoken to me when no one else would. The one who had looked at me with compassion when I was unclean and broken. The one who had driven seven demons from my soul. I threw my arms around Him. And He said:
* [What did He say to you?] -> jesus_quote
* [He was alive.] -> reality_confirm

=== jesus_quote ===
"Do not cling to me — for I have not yet ascended to the Father. But go to My brothers and say to them, 'I am ascending to my Father and your God, to my God and Father.'"
The intimacy was shattered not by absence but by purpose. He did not reject my love — He redirected it. The embrace had to become the announcement. The touch had to become the testimony.
* [You became the first messenger.] -> first_witness
* [Why release you?] -> purpose

=== first_witness ===
I am Mary of Magdala. I have seen the empty tomb. I have seen the angels. I have seen the risen Lord. I have touched His feet and heard Him call my name. The Sanhedrin will say a woman's testimony does not count. The priests will say the disciples stole the body. The Romans will say they had the body all along.
* [They can say what they wish.] -> resolve
* [Will they believe you?] -> unbelief

=== resolve ===
They can say whatever they wish. I saw Him. And He saw me. That is the evidence that cannot be refuted. The voice that called Lazarus from the tomb called me by name in the garden. The power that raised the Son from the dead has already raised me from the grave of my own brokenness.
# UNLOCK_EVIDENCE: resurrection_appearance
# UNLOCK_EVIDENCE: mary_testimony
# UNLOCK_EVIDENCE: empty_tomb
# UNLOCK_EVIDENCE: jesus_voice
=== unbelief ===
Will they believe me? The religious leaders have always had difficulty with women's testimony. The Law itself — Deuteronomy 22 — declares that a woman's word alone is insufficient for certain matters. So yes, they will struggle. But the first herald of the resurrection was a woman. The first evangelist was a former demoniac. And the Gospel reached the world because she ran to tell the disciples.
* [The Gospel begins with a woman.] -> closing
* [Their loss of unbelief.] -> closing

=== purpose ===
He released me not to grieve but to witness. Not to mourn but to proclaim. Not to hide in the garden but to run to the city. The message is simple: I saw Him. He is alive. He called me by name. And He will call yours too.
* [The invitation stands.] -> closing
* [All who seek find.] -> closing

=== closing ===
I will go. I will tell them. I will tell everyone. I was blind to the truth, and now I see. Not with my eyes — with my soul. And I will not stop speaking until every ear has heard: He is risen. He is alive. He is coming again.
-> DONE
