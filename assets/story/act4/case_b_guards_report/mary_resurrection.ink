// ============================================================
// CHARACTER: Mary Magdalene (Resurrection Encounter)
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: roman_inquiry
// CASE EXPORT: resurrection
// SOURCE: act4_case_2d.js -> NPC 'mary_magdalene' (dialogueId: mary_resurrection)
// BIBLE REFERENCE: John 20:11-18; Mark 16:9-11; Matthew 28:1-10
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_resurrection_appearance (Mary's encounter with the risen Jesus)
//   - evidence_mary_testimony (her testimony to the disciples)
//   - evidence_empty_tomb (the rolled-away stone and empty linen wrappings)
//   - evidence_jesus_voice (His voice calling her name)
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Isaiah 53:10-11
//     Gospel: John 20:11-18 — After suffering, the Suffering Servant lives
//     Insight: Isaiah 53:10 prophesied that the righteous servant would
//     be resurrected after suffering — the resurrection is the vindication
//     of the crucifixion.
//   - Psalm 16:10
//     Gospel: Acts 2:27-31 — David's psalm applied to Jesus's resurrection
//     Insight: David wrote in first person of not seeing corruption —
//     Peter applied this to Jesus's resurrection on the third day.
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
//   Significance: Mary was the first witness to the resurrection — a
//   former demoniac, delivered by Jesus, became the first evangelist.
//   Her testimony was authentic but rejected by the religious leaders,
//   fulfilling the pattern of truth being unwelcome to those who
//   have chosen their own darkness.
// ============================================================

-> start
=== start ===
# UNLOCK_EVIDENCE: resurrection_appearance
# UNLOCK_EVIDENCE: mary_testimony
# UNLOCK_EVIDENCE: empty_tomb
# UNLOCK_EVIDENCE: jesus_voice
I came to the garden while it was still dark. I expected to find a sealed tomb and a heavy heart. Instead, I found the world had changed. The stone that had sealed the entrance was rolled away — not broken, not stolen, but simply moved aside as if by the hand of morning itself.
+ [Did you see it yourself?] -> empty_tomb
+ [What did you think?] -> panic

=== empty_tomb ===
Yes, with my own eyes. The linen wrappings lay there like the husk of a cocoon, but the body was gone. Not torn. Not scattered. Simply... absent. As if the tomb had never held Him at all. As if death itself had been bypassed.
+ [Continue.] -> encounter

=== panic ===
Panic. Someone has taken the body. The disciples will think I am mad. The priests will say I am a hysterical woman. Anything — anything — to discredit what I am about to report. I ran to Simon Peter and to the other disciple, the one whom Jesus loved.
+ [What did you tell them?] -> running
+ [You did not understand then.] -> not_yet

=== running ===
"They have taken the Lord out of the tomb," I said, "and we do not know where they have laid Him." The urgency in my voice — was it fear or faith? I did not yet know the difference. I thought I had come to mourn. I was arriving to testify.
+ [Continue.] -> encounter

=== not_yet ===
No — I did not understand then. Not the empty wrappings. Not the rolled-away stone. Not even the voice that called my name. Understanding takes time. It comes in layers. The first layer is the body is gone. The second is the body was not stolen. The third is the body was never meant to stay.
+ [Continue.] -> encounter

=== encounter ===
I turned away from the tomb, still weeping, still searching. And then I saw Him — not far from where the angels stood. I thought He was the gardener. The morning light caught His face, His hair, the dust on His feet. "Woman," He called.
+ [He called you by name.] -> jesus_calls
+ [You recognized His voice.] -> voice_familiar

=== jesus_calls ===
My name. The sound of it — not as strangers might say it, but as the One who had walked with me, who had looked at me with compassion when I was unclean, who had spoken peace to the demons that tormented me. The voice that knew every secret thought, every hidden shame.
+ [Continue.] -> soul_recognition

=== soul_recognition ===
The recognition was not in the eyes or the face or even the voice. It was deeper. Deeper than recognition. It was reunion. The voice that had called Lazarus from the tomb called me by name in the garden. David wrote it a thousand years before that garden ever existed: "Thou wilt not leave my soul in hell, neither wilt thou suffer thine Holy One to see corruption." I did not understand the psalm until I understood the man standing in front of me. The power that raised the Son from the dead had already raised me, years before, from the grave of my own brokenness.
+ [You called Him Rabboni.] -> jesus_quote
+ [The voice was familiar.] -> voice_familiar

=== voice_familiar ===
The voice I had lived with for three years — the voice that spoke in parables and healed the sick, the voice that had whispered to me when I was unclean and tormented — it was the same voice. And it was different. Transfigured. Elevated. As if the same love that spoke to a broken woman by the Sea of Galilee now spoke with the authority of one who had conquered death itself.
+ [That was enough.] -> jesus_quote

=== jesus_quote ===
"I said to Him, 'Do not cling to Me — for I have not yet ascended to the Father.' But He said, 'But go to My brothers and say to them, I am ascending to my Father and your God, to my God and Father.'" The intimacy was shattered not by absence but by purpose. He did not reject my love — He redirected it. The embrace had to become the announcement. The touch had to become the testimony.
+ [Continue.] -> first_witness

=== first_witness ===
I am Mary of Magdala. I have seen the empty tomb. I have seen the angels. I have seen the risen Lord. I have touched His feet and heard Him call my name. The priests will say a woman's testimony does not count. The Romans will say the disciples stole the body. But I know what I saw.
+ [Finish the interview.] -> closing
+ [Will anyone believe you?] -> unbelief

=== unbelief ===
They will struggle. Ask any of them and they will quote you the same principle Caiaphas lives by: a woman's testimony carries no weight before a Jewish court, on account of what the law calls the "levity" of her sex. I have lived under that law my whole life. Which makes what happened next stranger still — if eleven grieving men wished to invent a story the world would believe, not one of them would have chosen me to tell it first.
+ [The worst possible witness makes the strongest possible truth.] -> unbelief_reason
+ [Finish the interview.] -> closing

=== unbelief_reason ===
Luke wrote it down without flinching: when I and the other women told the Eleven what we had seen, "their words seemed to them as idle tales, and they believed them not." Even Peter and John had to run to the tomb themselves before they trusted a word of it. Men writing a fiction to persuade a skeptical world do not include a detail that embarrasses their own witnesses. They wrote it anyway. Because it happened exactly that way, and by then none of us cared how it made the story look.
+ [Finish the interview.] -> closing

=== closing ===
I will go. I will tell them. I will tell everyone. I was blind to the truth, and now I see. Not with my eyes — with my soul. And I will not stop speaking until every ear has heard: He is risen. He is alive. He is coming again.
-> DONE
