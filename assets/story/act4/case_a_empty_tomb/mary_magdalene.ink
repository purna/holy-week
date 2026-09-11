// ============================================================
// CHARACTER: Mary Magdalene
// ACT: Act IV
// CASE: The Empty Tomb
// CASE ID: resurrection
// CASE EXPORT: resurrection
// SOURCE: act4_case_2d.js -> NPC 'mary_magdalene'
// BIBLE REFERENCE: John 20:1-18; Mark 16:9; Matthew 28:1-10
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Psalm 16:10
//     Gospel: Acts 2:27-31 - Peter quotes Psalm 16:10 at Pentecost
//     Insight: David wrote Psalm 16 in first person, but Acts 2:29-31
//     records Peter explaining that David was a prophet who "seeing
//     what was ahead, spoke about the resurrection of the Christ."
//   - Hosea 6:2
//     Gospel: 1 Corinthians 15:4 - Paul writes the resurrection happened
//     "according to the Scriptures," citing the three-day pattern
//   - Jonah 1:17 / Matthew 12:40
//     Gospel: Matthew 12:40 - Jesus explicitly identifies Himself
//     with Jonah when challenged for a sign
//   - Isaiah 53:10-11
//     Gospel: John 20:11-18; Luke 24:13-35 - Jesus appears alive
//     after the suffering
//   - Psalm 22:1-31
//     Gospel: Matthew 27:46 (crucifixion); closing verses look beyond
//     suffering to vindication
// ============================================================

-> start

=== start ===
I am Mary of Magdala. Seven demons were cast from me by the word of His mouth. My mind was a wilderness before that day. After it, I had a memory — and a purpose.

I came to the tomb at dawn, while it was still dark. The sky was the colour of iron, and my heart was heavier than stone. I had come to anoint His body, to complete what we were never able to finish.

* [What did you find at the tomb?] -> empty_tomb
* [You followed Him to the cross.] -> cross_witness

=== empty_tomb ===
The stone was rolled away. Not broken. Not stolen. Simply rolled. And inside — the linen wrappings lay there like the husk of a cocoon, but the body was gone.

My first thought was panic. Someone has taken Him. The disciples will think I am mad. The priests will say I am a hysterical woman. Anything — anything — to discredit what I have seen.

So I ran. I ran to Simon Peter and to the other disciple, the one whom Jesus loved. "They have taken the Lord out of the tomb," I said, "and we do not know where they have laid Him."

* [Then you met the angels.] -> encounter
* [Then you met Him.] -> encounter

=== cross_witness 
Yes. I watched from the hill. I saw the darkness fall at noon. I saw the earth shake and the rocks split. I saw the soldiers cast lots for His garments. I saw Him cry out, "My God, my God, why have you forsaken me?"

And when the curtain of the Temple was torn from top to bottom, I knew — I knew that something was ending and something was beginning.

But I did not understand. Not then. I thought even death itself would hold Him.

* [What gave you hope?] -> hope

=== hope 
Three years ago, I was unclean. Tormented. Rejected by my own family. When Jesus looked at me, He saw a daughter. When the demons screamed, He silenced them. When the crowd shamed me, He honored me.

I followed Him from that day. Not because I understood everything — but because I had nothing to lose and He offered everything.

And now... now He offers eternity.

* [Then you met the angels.] -> encounter

=== encounter 
I turned away from the tomb, still weeping, still searching. And then I saw Him — not far from where the angels stood. I thought He was the gardener. The morning light caught His face, His hair, the dust on His feet.

"Woman," He called.

And when He spoke my name — "Mary" — something in me snapped open. The voice I had lived with for three years, the voice that spoke in parables and healed the sick, the voice that had whispered to me when I was unclean and tormented — it was the same voice. And it was different.

* [What did He say to you?] -> dialogue

=== dialogue 
I ran to Him, and He looked at me with eyes that held the depth of the universe. He asked, "Woman, why are you weeping? Whom are you seeking?"

I thought He was the gardener, so I said, "Sir, if you have carried Him away, tell me where you have laid Him, and I will take Him away."

And He said my name. "Mary."

* [He called you by name.] -> recognition
* [That is all you needed.] -> recognition

=== recognition 
I said, "Rabboni!" — Teacher. My Teacher. The one who had spoken to me when no one else would. The one who had looked at me with compassion when I was unclean and broken. The one who had driven seven demons from my soul.

I threw my arms around Him. And He said, "Do not cling to me — for I have not yet ascended to the Father. But go to My brothers and say to them, 'I am ascending to my Father and your God, to my God and Father.'"

* [You became the first witness.] -> first_witness

=== first_witness 
I am Mary of Magdala. I have seen the empty tomb. I have seen the angels. I have seen the risen Lord. I have touched His feet and heard Him call my name.

The Sanhedrin will say a woman's testimony does not count. The priests will say the disciples stole the body. The Romans will say they had the body all along.

They can say whatever they wish.

I saw Him. And He saw me.

# UNLOCK_EVIDENCE: resurrection_appearance
# UNLOCK_EVIDENCE: mary_testimony

* [What will you do?] -> closing

=== closing 
I will go. I will tell them. I will tell everyone.

I was blind [to the truth], and now I see. Not with my eyes — with my soul.

And I will not stop speaking until every ear has heard: He is risen. He is alive. He is coming again.

-> DONE
