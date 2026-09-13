// ============================================================
// CHARACTER: Pontius Pilate (Roman Interrogation)
// ACT: Act III
// CASE: Roman Interrogation
// CASE ID: roman_trial
// SOURCE: act3_case.js -> NPC 'pilate_interrogation'
// CASE EXPORT: crucifixion_det
// BIBLE REFERENCE: John 18:28-40; Matthew 27:11-26; Mark 15:1-15
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_jesus_silence (His refusal to defend Himself)
//   - evidence_pilate_water (Pilate washing his hands)
//   - evidence_barabbas_choice (release of the criminal instead of the Savior)
//   - evidence_titulus (the inscription "King of the Jews")
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Isaiah 53:7
//     Gospel: Matthew 27:12-14 — Jesus answered almost nothing
//     Insight: The silent lamb led to slaughter — the Messiah's
//     restraint under interrogation fulfilled the suffering servant.
//   - John 18:36
//     Gospel: Jesus: "My kingdom is not of this world."
//     Insight: The kingdom Pilate sought to suppress was not an
//     earthly kingdom — it could not be defeated by political arrest.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Pilate examined Jesus privately, questioning Him about
//   His kingship, and found no basis for a Roman charge — yet under
//   pressure from the chief priests and the crowd, he handed Jesus
//   over to be crucified anyway.
//   Significance: Pilate's own verdict of innocence, repeated
//   throughout the Gospels, makes the crucifixion an act of
//   political cowardice rather than justice — the judge condemned
//   a man he had declared blameless.
// ============================================================

-> start
=== start ===
The chamber was cold this morning. Stone floors hold the night's chill long after dawn breaks. They brought the Galilean before me — not in chains, not in fetters, but surrounded by a mob that wanted blood. The charge sheet said "King of the Jews." A theological claim. Not a political crime. That troubled me.
* [What did the priests say?] -> priestly_charge
* [How did Jesus appear?] -> appearance

=== priestly_charge ===
"The Jews have found Him guilty of blasphemy," they said. But blasphemy is not a Roman offense. I needed a political charge — sedition, rebellion, anything that would justify the death sentence I knew they wanted. I looked at the man they brought before me. He was calm. Too calm.
* [Did He defend Himself?] -> jesus_silence
* [What did you do?] -> interrogation

=== jesus_silence ===
I asked Him directly: "Are You the King of the Jews?" The silence stretched. The priests crowded closer. The crowd outside pressed against the doors. And He spoke — but not as they expected. Not with defiance. Not with threat. But with quiet certainty that seemed to fill the entire chamber.
* [What did He say?] -> kingdom_answer
* [The priests grew angry.] -> priestly_fury

=== kingdom_answer ===
"My kingdom is not of this world." Those were the words. "If my kingdom were of this world, my servants would fight." He did not need soldiers. He did not need swords. He did not need political alliances. His kingdom operated by a different order entirely.
* [You pressed Him further.] -> interrogation
* [That confused you.] -> confused

=== confused ===
A kingdom not of this world — what did that mean? I had expected rebellion. A claim to political power. A threat to Caesar's rule. Instead, I found a philosopher who spoke in parables of a kingdom that would not be established by force. What crime was that? What law had He broken?
* [What did the crowd say?] -> crowd_reaction
* [How did you handle it?] -> interrogation

=== interrogation ===
I found myself questioning Him about it repeatedly. "Tell me, is it true that You are the Son of God?" He looked at me with eyes that seemed to see through my title and my authority, through my three legions and my golden bracelets. He did not answer me the way the priests demanded.
* [He would not cooperate.] -> jesus_silence2
* [What did you learn?] -> realization

=== jesus_silence2 ===
He would not give them the answer they wanted. "It is as you say," He replied when pressed. And then He spoke of the Son of Man sitting at the right hand of Power and coming on the clouds of heaven — words that sounded like the very prophecies I had dismissed as Jewish superstition. But He spoke them with such quiet authority...
* [The priests heard everything.] -> priestly_fury
* [You were troubled.] -> confused

=== priestly_fury ===
"They accused Him of claiming to be the Son of God — a charge that carries the death penalty under their law!" But Rome's law is different. A man claiming divinity is a madman, not a criminal. The real danger was the crowd — restless, passionate, easily turned. They were not interested in legal nuance. They wanted blood.
* [Did you offer clemency?] -> barabbas_offer
* [The crowd turned against you.] -> crowd_turn

=== crowd_turn ===
The crowd — which had started as priests and officers — had grown into a mob. They began shouting: "Crucify Him!" And louder: "If you release this man, you are no friend of Caesar's!" Those were fighting words to a Roman. No governor could ignore that accusation.
* [The political trap.] -> political_trap
* [You washed your hands.] -> washing_hands

=== political_trap ===
A clever trap, but not unexpected. Accuse me of disloyalty to Caesar. Make my defense of this Galilean look like rebellion against Rome. I was cornered — either execute an innocent man to save my position, or risk my career for a philosophical conversation in a dusty Judean town. The choice was never truly mine.
* [You still had options?] -> barabbas_offer

=== barabbas_offer ===
I offered them the Passover custom — release one prisoner. "Whom would you have me release to you — Barabbas, the king of the thieves? Or Jesus, called the Christ?" The priests had stirred the crowd. The answer was predictable.
* [Barabbas was a real criminal.] -> barabbas_reality
* [They chose Barabbas.] -> choosing_death

=== barabbas_reality ===
Barabbas was a real murderer. A real rebel. A real threat to Roman order. And I offered him as an alternative to a pacifist rabbi who spoke of a kingdom that would not be defended with swords. They chose the killer. They always choose the killer when given the option.
* [The choice was made.] -> choosing_death

=== choosing_death ===
The shouts grew louder: "Not this man's blood — let His blood be on us and on our children!" They took the responsibility. They accepted the verdict. They chose Barabbas — and condemned the Son of Man to crucifixion. My hands were clean, but my soul was not.
* [You washed your hands.] -> washing_hands
* [The weight of command.] -> realization

=== washing_hands ===
I returned to the basin of water and poured it over my hands while speaking into the crowd: "I am innocent of this man's blood; see to it yourselves." The water ran red in the morning light — or perhaps it was my imagination. The stain of responsibility is not so easily washed away.
* [The priests accused you.] -> priests_accuse
* [The guilt remained.] -> realization

=== priests_accuse ===
"You are not Caesar's friend," they hissed afterward. "You have condemned a man to death, and now his blood is on your hands forever." They were wrong. The blood was never mine to bear. But the decision — the choice to crucify — that was mine to make. And I made it.
* [What did you learn?] -> realization

=== realization ===
I learned that power without truth is tyranny. I learned that political survival without moral courage is cowardice. I learned that some choices leave scars that no amount of washing can remove. And I learned — too late perhaps — that I had just crucified the Son of God, whose kingdom was indeed not of this world.
* [The kingdom that cannot be defeated.] -> closing
* [The weight of your decision.] -> closing

=== closing ===
The chamber door closed behind them. The crowd went out to see Him mocked, beaten, stripped, and crowned with thorns. By the time they led Him away, the morning crowds had thinned. I stood at the window watching the procession carry the cross — and thinking of a rabbi who spoke of a kingdom not of this world.
* [What did you record in your logs?] -> record
* [Could you have stopped it?] -> stopping_it

=== record ===
In my official records, I wrote: "Jesus of Nazareth, King of the Jews." The priests complained. I told my secretary: "What I have written, I have written." The Latin was precise. The Greek was clear. The Hebrew was unambiguous. Every reader would understand: this was the title He claimed, and it would echo through history.
* [The inscription would outlive you.] -> outlive
* [What the priests feared.] -> priests_fear

=== outlive ===
What I wrote in three languages would outlive the Temple, outlive the Sanhedrin, outlive Rome itself. The centurions would read it. The pilgrims would read it. The soldiers would mock it. And centuries later, historians would debate its meaning. "King of the Jews" — a title of authority that could not be erased.
* [The title was prophetic.] -> closing

=== priests_fear ===
The priests feared — and with reason. A king who died and rose again was a king who could not be defeated by death. A crown of thorns was a crown no power could strip away. The title I wrote would echo through every generation: "Jesus of Nazareth, King of the Jews."
* [The title endured.] -> closing

=== stopping_it ===
Could I have stopped it? I had the power. I had the guards. I had the authority. But I also had the crowd — restless, violent, politically volatile. One spark, and the entire city would burn. I chose order over justice. Peace over truth. Caesar's approval over divine justice. The choice haunted me.
* [The choice was yours.] -> closing
* [No one saw the alternative.] -> closing

=== closing2 ===
I have no further comments for your investigation. The matter is concluded. What I have written, I have written.
-> DONE
