// ============================================================
// CHARACTER: Simon Peter
// ACT: Act III
// CASE: The Severed Ear
// CASE ID: gethsemane_arrest
// CASE EXPORT: gethsemane_arrest
// SOURCE: act3_case_2d.js -> NPC 'simon_peter'
// BACKGROUND: The informal leader of the inner circle. He is currently
//   hidden in the shadows outside the high priest's courthouse, deeply
//   traumatized, defensive, and swinging violently between rage and
//   regret. His denial haunts him even as his ear-cutting impulsiveness
//   still echoes in Gethsemane.
// BIBLE REFERENCE: John 18:10-11; Matthew 26:51-54; John 18:15-18, 25-27;
//   Luke 22:54-62
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 53:7
//     Gospel: Matthew 26:52-54
//     Insight: Though armies of angels were at His call, He voluntarily
//     submitted to human bonds to fulfill the redemptive plan.
//   - Psalm 31:22
//     Gospel: Matthew 26:33-35; Mark 14:29-31; Luke 22:33-34;
//     John 13:38
//     Insight: "I said in my alarm, I am cut off from your sight."
//     Peter felt abandoned but was not truly lost.
//   - Zechariah 13:7
//     Gospel: Matthew 26:31; Mark 14:27
//     Insight: "Strike the shepherd, and the sheep will be scattered."
//     Peter's denial was part of the larger pattern of apparent
//     abandonment that led to resurrection victory.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Late Thursday night, Judas led a cohort of Roman soldiers
//   and temple officers to a private olive grove called Gethsemane.
//   After identifying Jesus with a kiss, a scuffle broke out. Peter
//   drew a short sword and cut off the ear of Malchus, the high
//   priest's servant. Jesus immediately healed the ear, prohibited
//   violent revolution, and surrendered Himself willingly to fulfill
//   the Scriptures. Days later, Peter denied knowing Jesus three times
//   before the rooster crowed.
//   Historical note: A Roman cohort combined with temple police shows
//   a massive, coordinated security operation. The authorities
//   expected armed resistance from Jesus's followers, making His
//   peaceful surrender highly unexpected to military commanders.
//   Significance: This case highlights Jesus's absolute control over
//   His arrest. He prohibited violent revolution, healed His enemy,
//   and protected His disciples from capture, fulfilling His own word
//   that He would lose none of them.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: none
//   motive: There was no military insurgency. Jesus submitted
//   voluntarily, refusing to allow His disciples to mount an armed
//   rebellion against the legal authorities.
//   method: Judas betrayed the location, and an armed force arrived.
//   Peter panicked and struck Malchus. Jesus miraculously healed
//   Malchus's ear on the spot, demanded peace, and surrendered
//   Himself willingly to fulfill the Scriptures. Later, Peter denied
//   three times, wept bitterly, and was forgiven.
// ============================================================

-> start
=== start ===
I am Simon Peter. I followed Him for three years. I healed others, asked impossible questions, and watched Him do things no teacher should be able to do. Then the rooster crowed. I denied Him three times and left. I am still here, which is either resilience or foolishness. You decide.

* [Tell me about the sword.] -> sword
* [What happened with the donkey?] -> rope
* [The denials.] -> denials

=== sword ===
# UNLOCK_EVIDENCE: severed_ear_wrap
It happened so fast. Judas appeared with torches and weapons. The moment I saw them close in on Him, something snapped. I drew my sword — the one I carried since the day He called me to leave my nets. My blade found its mark, and the ear of the high priest's servant fell to the ground.

Jesus turned. Not to fight. Not to flee. He looked at me — at all of us — and said one word. "Put your sword back." Then He knelt and touched the wound. Warmth flooded through the garden, and I felt the ear whole again.

* [What else did He say?] -> sword_cont
* [That silenced you.] -> sword_cont

=== sword_cont ===
"Shall I not drink the cup the Father has given me?" He asked. The arrest was not happening to Him. He was orchestrating it. He had counted the cost. He had drunk the cup from the beginning, and He would drink it to the last drop.

The soldiers stepped forward. I could have cut them down. There were twelve of us against six hundred. But the words He spoke — "I am he" — and they fell back. Not from our swords. From His voice.

* [You could have fought.] -> sword
* [That is not power you expected.] -> power

=== power ===
Power? Yes. The power to command an army to fall. The power to heal a severed ear. The power to let them take Him while protecting every one of us. I had expected to die for my Rabbi. I never expected Him to die for me.

* [Then you ran too.] -> denials

=== denials ===
# UNLOCK_EVIDENCE: severed_ear_wrap
Three times before the rooster crowed twice. "I do not know the man." "I do not know him." Then cursing and swearing. Each denial carved deeper than the last. But when He turned — "Jesus looked at me" — I saw not anger, but grief. And love. And I ran. I wept. And somehow, I was still following.

* [How did you get here?] -> redemption
* [Three days later.] -> redemption

=== redemption ===
The tomb was empty. The linen wrappings lay in perfect folds. And then He appeared — alive. Not a ghost. Not a vision. A man who had been dead and was now standing in front of me, eating fish and laughing with the others.

He did not reproach me. He did not say, "You denied me three times." He simply looked at me and said, "Follow me." The same words He spoke by the Sea of Galilee thirty years ago.

I am here because grace is heavier than guilt. Because three denials meet three invitations. Because the Shepherd who was struck became the Shepherd who seeks.

* [What do you do now?] -> closing

=== closing ===
I write this not to excuse what I did, but to explain what was done for me. The sword I drew in fear is sheathed. The sword He drew in love has not fallen.

My name is Simon Peter. I denied the Messiah. I am forgiven. And I am not done yet.

-> DONE
