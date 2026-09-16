// ============================================================
// CHARACTER: Thomas (Twin)
// ACT: Act IV
// CASE: Peter's Restoration
// CASE ID: peter_restoration
// SOURCE: NPC 'thomas_restoration'
// BIBLE REFERENCE: John 21:1-19; John 20:24-29; 1 Corinthians 15:5-8
// ------------------------------------------------------------
// PURPOSE: Thomas witnesses the shore breakfast and Peter's
// commission — resolved from doubt, and speaks to what makes a
// witness's testimony credible across the collection.
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE (canonical — act4_case.js / peter_restoration):
//   - Zechariah 13:7  [evidence: charcoal_fire — John 21:9]
//     Gospel: "I will strike the shepherd, and the sheep of the
//     flock will be scattered" (Matthew 26:31).
//     Insight: The charcoal fire in the high priest's courtyard
//     (John 18:18) where Peter fell is answered by this fire, where
//     he is restored.
//   - Ezekiel 34:11-16  [evidence: miraculous_catch, bread_breakfast,
//     threefold_commission — John 21:9-17]
//     Gospel: The Lord promised to seek, gather, and feed His
//     scattered sheep Himself.
//     Insight: Three commissions answer three denials — a precise
//     reversal Thomas witnesses firsthand.
//   - Psalm 16:10  [evidence: galilean_apparition — John 21:12]
//     Gospel: God's Holy One would not see decay.
//     Insight: For Thomas — who once required physical proof of the
//     resurrection — this shore appearance is a second, settled
//     confirmation of the same promise.
//   - Isaiah 53:10-11  [evidence: galilean_apparition — John 21:12]
//     Gospel: The Servant would live again and "see his offspring"
//     after His suffering.
//     Insight: Thomas's own move from doubt to belief mirrors this
//     case's theme: the Servant vindicated, witnessed, believed.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Thomas fished alongside Peter through the night and
//   was present when the risen Jesus called from the shore,
//   directed the great catch, and shared breakfast before restoring
//   Peter with the threefold question of love.
//   Significance: Having already moved from doubt to declaring
//   "My Lord and my God," Thomas's presence at the shore shows his
//   faith settled and steady, witnessing another disciple's
//   restoration rather than needing one himself.
// ============================================================

-> start

=== start ===
# UNLOCK_EVIDENCE: charcoal_fireHe
# UNLOCK_EVIDENCE: threefold_commissionThree
Peter and I fished together all night and caught nothing. Then He stood on the shore and called to us — none of us asked who He was. We simply knew. And yet I, of all people, needed to see before I could believe. I had already seen by then. But the beach made it final.

+ [You doubted the resurrection?] -> doubt
+ [What did you see on the shore?] -> shore_scene
+ [Why should anyone believe reports like these?] -> witness_reliability

=== witness_reliability ===
Paul, years later, wrote out the list like a legal record: He appeared to Cephas, then to the Twelve, then to more than five hundred at once — most of them still alive when Paul wrote it, so anyone could go and ask them — then to James, then to all the apostles, and last of all to Paul himself. [1 Corinthians 15:5-8] That is not the language of a private vision. That is the language of a man daring you to go check.

And before any of that list — before Cephas, before the Twelve — the first report came from women at a tomb. Their word carried no legal weight under the Law. No one inventing this story would have opened it with witnesses a court would not even hear. We opened with them because that is who found Him first.

+ [And you needed more, even so.] -> doubt

=== doubt ===
A week after the resurrection I told the others plainly: unless I see the nail marks and put my finger where the nails were and put my hand into His side, I will not believe. [John 20:25] He appeared again while I was present. "Put your finger here, Thomas... stop doubting and believe." [John 20:27] I did not need to touch anything. The sight of Him was sufficient. And then I said the only thing left to say: "My Lord and my God." [John 20:28]

+ [And now?] -> shore_scene
+ [He invited the doubt rather than condemning it.] -> doubt_addressed

=== doubt_addressed ===
He did not scold me for being absent the first time. He simply came to where I was and gave me exactly what I had asked for — and then one thing more: "Have you believed because you have seen? Blessed are those who have not seen and yet have believed." [John 20:29] He corrected me and included me in the same breath.

+ [Then you were ready for the shore.] -> shore_scene

=== shore_scene ===

+ [What passed between Him and Peter?] -> peter_commission
+ [Why a charcoal fire?] -> charcoal_meaning

=== charcoal_meaning ===
There was a charcoal fire in the high priest's courtyard the night of the arrest. [John 18:18] Peter denied Him three times beside that fire. Here was another. Not repeated by accident. The shepherd who was struck, the sheep who scattered — Zechariah wrote that centuries before any of us existed. [Zechariah 13:7] The restoration was built on the same material as the wound.

+ [Three questions.] -> peter_commission

=== peter_commission ===

+ [Then Peter is restored?] -> restoration
+ [Why did Peter weep?] -> why_weep

=== why_weep ===
Because by the third question he knew Jesus was counting on purpose. And on the third answer, Jesus used the ordinary word Peter had been using all along, not the higher one. He came down to where Peter was and restored him from there. Weeping was the only honest response to that kind of precision.

+ [Then Peter is restored.] -> restoration

=== restoration ===
Then Jesus said "Follow Me." [John 21:19] The first two words He ever said to Peter beside this same sea, three years before. After everything — the calling, the water-walking, the confession at Caesarea Philippi, the denial, the cross, the resurrection — everything circled back to two words. Peter stood up and followed.

+ [Finish the interview.] -> closing

=== closing ===
I am a man who required evidence and received it — and a man who has since watched a fisherman get his life handed back to him on a beach for saying nothing more than "I love You," three times. "Blessed are those who have not seen and yet believed" [John 20:29] — I think He was already speaking of the people who would come after. Those who will read what women told us at a tomb, and what I saw with my own hands, and believe it without having stood on that shore themselves.

That is the story I will carry: not that doubt is shameful, but that even doubt, honestly carried, can end at "My Lord and my God."

-> DONE
