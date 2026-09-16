// ============================================================
// CHARACTER: Woman with Issue of Blood
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// CASE_EXPORT: temple_cleansing
// SOURCE: act1_case.js -> NPC 'woman_cloak'
// BIBLE REFERENCE: Matthew 9:20-22; Mark 5:25-34; Luke 8:43-48
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Isaiah 43:18-19
//     Insight: Jesus declared His identity as the Creator who
//     makes all things new, turning the bitter waters of
//     suffering into healing streams.
//   - Jeremiah 30:17
//     Insight: The restoration of health itself was foretold
//     as a sign of future redemption.
// ------------------------------------------------------------

-> start

=== start ===
The woman lowers her eyes for a moment, then looks back at you. There is something in her expression — relief, perhaps, or the memory of a sorrow that has finally become a joy.

"You've heard the story, haven't you?" she asks quietly. "The woman who reached through the crowd and touched His cloak."

She gives a small, almost embarrassed smile.

"That woman was me."

For twelve years I had suffered with bleeding. Twelve years of being separated from others, of being called unclean, of watching my life become smaller and smaller. I had almost forgotten what it felt like to belong.

"But that day, I heard that Jesus was passing by. And I thought..." She pauses.

"If I could only touch the hem of His garment."

+ [Tell me about your twelve years of suffering.] -> suffering
+ [What happened when you touched His cloak?] -> touch
+ [Did you believe Jesus would heal you?] -> faith_sustained
+ [What happened when Jesus called you "daughter"?] -> called_daughter
+ [How did you feel afterward?] -> peace_after
+ [Finish the interview.] -> closing

=== suffering ===
Twelve years of bleeding. Twelve years of isolation. Twelve years of ritual uncleanness that made me untouchable to my own family. The physicians took my money and gave me nothing. The priests declared me ceremonially unclean. And still — the flow would not stop.

+ [You were completely alone.] -> alone
+ [Faith sustained you.] -> faith_sustained
+ [Finish the interview.] -> closing

=== alone ===
Completely alone. My husband divorced me — the Law required it. Leviticus 15 declares a woman with a discharge ritually unclean. My own children were told to avoid me. Even the beast of burden was cleaner than I.

+ [How did you survive?] -> survive
+ [The isolation was crushing.] -> crushing
+ [Finish the interview.] -> closing

=== faith_sustained ===
Faith sustained me — faith in the promises of the prophets, faith in the mercies of God, faith that someday the flowing would stop. But faith alone cannot stop bleeding. Faith alone cannot purify the body. Faith alone... can lead me to the hem of His garment.

+ [The hem of His garment.] -> touch
+ [Faith becomes action.] -> testimony
+ [Finish the interview.] -> closing

=== survive ===
I survived on alms. On the kindness of strangers who threw scraps from their tables without looking me in the eye. On the charity of women who whispered prayers for my soul while crossing the street to avoid my shadow.

+ [Continue.] -> testimony

=== crushing ===
The isolation was crushing. Twelve years without a human touch that was not born of duty or fear. Twelve years wondering if God had forgotten my name.

+ [God never forgets.] -> seen
+ [The loneliness was deafening.] -> seen
+ [Finish the interview.] -> closing

=== touch ===
I pushed through men with their eyes fixed ahead, not caring who brushed against them. My fingers found the fringe of His tallit — the blue cord woven through the corner. I scarcely made contact when I felt the flow stop. Not slow, not easing... but stopping. Like a spring dammed in an instant.

+ [Did He know?] -> jesus_feels
+ [Were you afraid?] -> testimony
+ [The touch was electric.] -> electric_touch
+ [Finish the interview.] -> closing

=== electric_touch ===
The touch was electric. Not with pain — with power. I felt His energy flow into me like a river breaking through a dam. The twelve years of emptiness filled at once.

+ [The power was immediate.] -> power_immediate
+ [The river of life.] -> river_life
+ [The dam broke in your favor.] -> dam_broke
+ [Finish the interview.] -> closing

=== power_immediate ===
Immediate. Not gradual. Not partial. But total. Complete. Whole. As if the moment my fingers touched the hem of His garment, the entire twelve years of suffering was undone.

+ [The undoing was complete.] -> undoing_complete
+ [Twelve years in an instant.] -> twelve_instant
+ [Healing beyond healing.] -> healing_beyond

=== river_life ===
The river of life. That is what flowed from that single point of contact. The river that Ezekiel saw in his vision. The river that makes the dead live. The river that transforms everything it touches.

+ [Ezekiel's river.] -> power
+ [Finish the interview.] -> closing
+ [The dead live.] -> power
+ [Transformation flows.] -> testimony

=== dam_broke ===
The dam broke in my favor. Not in my face. Not against me. But FOR me. As if the very heavens had aligned to release what had been held back for twelve long years.

+ [Continue.] -> power

=== undoing_complete ===
The undoing was complete. Not a single thread of my twelve-year disease remained. Not a single memory of pain. Not a single trace of uncleanness. Just... wholeness. Pure and complete.

+ [Wholeness beyond healing.] -> testimony
+ [Finish the interview.] -> closing
+ [Pure and complete.] -> testimony
+ [The old was gone.] -> testimony

=== twelve_instant ===
Twelve years in an instant. Twelve years of suffering reduced to twelve seconds of touch. Twelve years of isolation ended by one moment of faith. Time collapsed. Pain dissolved. Life returned.

+ [Time collapsed.] -> power
+ [Pain dissolved.] -> power
+ [Life returned.] -> power
+ [Finish the interview.] -> closing

=== healing_beyond ===
Healing beyond healing. Not just the stopping of blood. Not just the cleansing of uncleanness. But the restoration of dignity. Of connection. Of belonging. The healing was total.

+ [Dignity restored.] -> testimony
+ [Connection restored.] -> testimony
+ [Finish the interview.] -> closing
+ [Belonging restored.] -> seen
+ [How do you understand the wider effect of your healing?] -> healing_flowed

=== jesus_feels ===
"Who touched Me?" He asked — not harshly, but clearly. His disciples looked around bewildered. "Why ask?" they said. "All touch You, and the crowd presses in." But He insisted. Then His gaze landed on me.

+ [What happened next?] -> confession
+ [He called you daughter.] -> called_daughter
+ [The gaze found you.] -> gaze_found
+ [Finish the interview.] -> closing

=== called_daughter ===
He called me "daughter." Not "woman." Not "unclean." "Daughter." As if twelve years of bleeding had never happened. As if my isolation meant nothing. As if I were the most welcome guest at His table.

+ [The word was healing.] -> power
+ [Dignity restored.] -> dignity_restored2
+ [Belonging restored.] -> belonging_restored2
+ [Finish the interview.] -> closing
+ [What did the word daughter mean to you?] -> word_healing2

=== gaze_found ===
His gaze found me through the crowd. Not because I was loud. Not because I was important. But because somehow — somehow — He knew. He knew that among all these people, one heart had reached out in faith. And He found that heart.

+ [He knows all hearts.] -> seen
+ [The gaze connected.] -> seen
+ [Faith is seen.'] -> seen
+ [Finish the interview.] -> closing

=== confession ===
I fell at His feet, quaking. I told Him the truth — all of it. The physicians, the expenses, the growing worse. And how in that single moment of touching His garment, I felt the power go out from Him. I was healed. Completely.

+ [What did He say to you?] -> grace
+ [Finish the interview.] -> closing
+ [His power flowed to you.] -> power
+ [The truth was safe.] -> truth_safe

=== grace ===
He didn't rebuke me. He called me "daughter." As if I were clean. As if I were whole. "Your faith has healed you," He said. "Go in peace." And I felt what I had not felt in twelve years — truly whole. Not just the bleeding stopped, but my very soul.

+ [Peace after pain.] -> peace_after
+ [The soul was healed too.] -> soul_healed
+ [Faith received everything.] -> faith_received
+ [Finish the interview.] -> closing

=== peace_after ===
Peace after pain. Rest after turmoil. Silence after twelve years of weeping. The peace of God — which passes understanding — flooded through every cell of my being. I was at peace. Not just in my body. Not just in my spirit. But in my very soul.

+ [Continue.] -> seen

=== soul_healed ===
The soul was healed too. Not just the body. Not just the spirit. But the soul — the deepest part, the part that had been bruised by twelve years of isolation, twelve years of rejection, twelve years of believing that God had forgotten. The soul was made whole.

+ [The bruised soul healed.] -> soul_healed
+ [Finish the interview.] -> closing
+ [The deep place restored.] -> testimony
+ [The forgotten remembered.] -> seen

=== faith_received ===
Faith received everything. Not just healing. Not just peace. Not just restoration. But recognition. Validation. Belonging. Faith reached out and grasped not just a garment but the heart of the Son of God. And He gave back more than she had asked.

+ [The heart reached back.] -> testimony
+ [More than asked.] -> testimony
+ [Faith grasped grace.] -> seen

=== word_healing2 ===
The word was healing — "daughter." Not "woman." Not "sinner." "Daughter." The most intimate term of endearment in our culture. A child. Beloved. Accepted. The word healed what the touch began. And the touch healed what the word confirmed.

+ [Word and touch united.] -> power
+ [Intimacy over institution.] -> seen
+ [The word created worth.] -> seen
+ [Finish the interview.] -> closing

=== dignity_restored2 ===
Dignity restored. Twelve years of being untouchable ended with twelve words: "Your faith has healed you." Dignity restored. Worth affirmed. Value established. Not by my family. Not by my wealth. But by the Son of God.

+ [Worth beyond worthiness.] -> seen
+ [Value through grace.] -> testimony
+ [Established by divinity.] -> power
+ [Finish the interview.] -> closing

=== belonging_restored2 ===
Belonging restored. Twelve years of isolation ended in a moment. I was no longer an outcast. I was a daughter. I was welcome. I was home.

+ [Home at last.] -> seen
+ [The outcast welcomed.] -> seen
+ [Belonging through faith.] -> seen
+ [Finish the interview.] -> closing
+ [Did you feel more than merely welcomed?] -> more_than_welcome

=== truth_safe ===
The truth was safe with Him. Not judged. Not condemned. Not dismissed. But received. Understood. Honored. My twelve years of shame — He held them gently. My confession — He met with compassion. My faith — He honored.

+ [Compassion over judgment.] -> seen
+ [Shame held gently.] -> seen
+ [Faith honored completely.] -> testimony

=== more_than_welcome ===
More than welcome. More than accepted. More than understood. I was celebrated. My faith was praised. My journey was honored. And my healing was presented as a testimony to all.

+ [Continue.] -> testimony

=== healing_flowed ===
The healing flowed beyond my body. It flowed to the crowd who witnessed it. It flowed to the disciples who recorded it. It flowed to every generation that would hear my story. One touch. One word. One moment. And the ripple of healing reaches to the ends of the earth.

+ [The ripple continues.] -> testimony
+ [Healing spreads.'] -> testimony
+ [One touch changes all.'] -> testimony
+ [What would you want someone hearing your story to understand?] -> closer_to_you

=== closer_to_you ===
I am closer to you now than I ever was. Not in distance. Not in time. But in connection. In understanding. In the shared knowledge that healing is not earned. It is given. And those who receive it are called to share it.

+ [Continue.] -> testimony

=== closing ===
I am no one remarkable. Just a woman who touched a thread of His cloak. Yet He stopped for me. He saw me. If He notices a broken woman in a crowd of thousands, what might He do for those who seek Him openly?


// ── Consolidated terminal branches ───────────────────────────
-> DONE

=== testimony ===
The word of healing became a living testimony. What He did for me was not meant to remain hidden. My healing, dignity, faith, and restoration became a witness that His mercy reaches the broken.
+ [Finish the interview.] -> closing

=== seen ===
He saw me when others saw only an outcast. He remembered me, received me, and restored my place. I was no longer defined by twelve years of suffering, but by being known, loved, and welcomed.
+ [Finish the interview.] -> closing

=== power ===
His power was immediate and complete. What twelve years of suffering could not change was transformed in a moment of faith. The touch, the word, and the healing all revealed the life-giving power of God.
+ [Finish the interview.] -> closing
