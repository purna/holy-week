// ============================================================
// CHARACTER: Joseph ben Caiaphas (High Priest)
// ACT: Act II
// CASE: The Silenced Teacher
// CASE ID: temple_authority
// SOURCE: js/act2_case.js -> NPC 'chief_priest'
// BIBLE REFERENCE: Matthew 21:23-27; Mark 11:27-33; Luke 20:1-8;
//   John 11:49-52 (Caiaphas's unwitting prophecy)
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - John 11:51 — "Caiaphas prophesied that Jesus would die for
//     the nation"
//     Insight: Caiaphas, trying to protect the nation,
//     unknowingly prophesied of the cross that would save it
//   - Isaiah 53:10 — "It pleased the LORD to crush him"
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_national_security (political motivation for arrest)
//   - evidence_temple_authority (challenge to Jesus authority)
//   - evidence_prophecy_fulfilled (Caiaphas unwitting prophesy)
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: High Priest Caiaphas, confronting the Galilean
//   in the Temple, weighs national survival against the threat
//   of Roman intervention. His calculated political reasoning
//   -- "it is expedient that one man should die for the people" --
//   unknowingly fulfills prophecy about the lamb led to slaughter.
// ============================================================

-> start
=== start ===
You look at a single man, scribe, and you see a moral puzzle. I look at this city and I see an entire nation facing absolute erasure.
# UNLOCK_EVIDENCE: evidence_national_security
If the legions move to clear these courts, Sinai becomes a memory. It is expedient that one man should die for the people. Do you understand the weight of this chair?
* [Is justice something that can be bartered for national security?] -> security
* [What about the witnesses at the trial?] -> trial
* [The Lazarus event was dangerous.] -> lazarus_danger

=== security ===
Without a nation, there is no altar. Without an altar, there is no law. Order is the highest form of justice we can offer under Rome. The Romans do not distinguish between religious dispute and political sedition -- neither do I when the alternative is the eagle standard in our holy of holies.
# UNLOCK_EVIDENCE: evidence_temple_authority
* [The temple's authority is at stake.] -> temple_stakes
* [The cost is calculated.] -> cost_calculated

=== temple_stakes ===
The temple's authority is at stake. Not my personal preference, but the collective authority of the priesthood, the Sanhedrin, the entire Levitical system. If this Galilean's claims go unchallenged, what becomes of forty years of established precedent?
* [The precedent is sacred.] -> precedent_sacred
* [The challenge is existential.] -> challenge_existential

=== precedent_sacred ===
The precedent is sacred. The Sanhedrin has governed Jewish religious life according to the Oral Law for three centuries. We are the guardians of the Mishnah, the interpreters of the Talmud. To allow a carpenter's son from Nazareth to redefine that -- to claim authority greater than Moses himself -- is to risk everything.
* [The risk is great.] -> risk_great
* [The people are watching.] -> people_watching

=== risk_great ===
The risk is great -- and the people are watching. Every word from His mouth, every miracle He performs, every challenge He issues to our authority is recorded by dozens of scribes in the galleries. The Pharisees, the Sadducees, the teachers of the law -- we are all witnesses to what is happening.
* [The witness is universal.] -> witness_universal
* [The moment is critical.] -> moment_critical

=== cost_calculated ===
The cost is calculated. Lazarus of Bethany -- recently raised from the dead. What the physician Luke recorded was not merely a miracle but a declaration of war against the natural order. If a man can command death itself, what cannot he command?
# UNLOCK_EVIDENCE: evidence_prophecy_fulfilled
* [The timing was critical.] -> timing_critical_caiaphas
* [The danger was real.] -> danger_real

=== timing_critical_caiaphas ===
The timing was critical. Passover was drawing near. The crowds were already murmuring about the miraculous raising of Lazarus. If word spread that the Messiah could defeat death itself, the entire city would erupt. Herod was already watching from his fortress. Pilate was receiving reports from Caesarea.
* [The faith was contagious.] -> faith_contagious
* [The response was desperate.] -> response_desperate

=== faith_contagious ===
The faith was contagious -- and that is precisely what made it dangerous. A crowd that witnessed a dead man walk out of his tomb would follow anything he said next. The Sadducees, who denied resurrection, found their theology challenged in the most public way possible.
* [The theology was questioned.] -> theology_questioned
* [The Sadducees were divided.] -> sadducees_divided

=== theology_questioned ===
The theology was questioned -- and we could not answer. Lazarus was a living sermon. Every day he walked the streets, a walking testament that the resurrection was real. We were the guardians of a religion that taught resurrection -- and here was its fulfillment walking in our own city.
* [The contradiction was fatal.] -> contradiction_fatal
* [The decision was made.] -> decision_made

=== decision_made ===
The decision was made -- not in council, not in session, but in the quiet of my study, where the oil lamps had burned out and only the necessity remained. To arrest Him publicly would cause a riot. To arrest Him secretly would be... expedient. One man's death could preserve the nation.
* [The unwitting prophecy.] -> unwitting_prophecy
* [The divine purpose.] -> divine_purpose_caiaphas

=== unwitting_prophecy ===
The prophecy was unwitting. Years later, the physician John would write: "Caiaphas prophesied that Jesus would die for the nation." Not because he sought to fulfill prophecy -- but because he sought to prevent chaos. "It is expedient for us that one man should perish for the people, and not that the whole nation should perish."
* [The irony was sharp.] -> irony_sharp
* [The consequence was eternal.] -> consequence_eternal

=== irony_sharp ===
The irony was sharp -- a high priest who sought to suppress the truth, unknowingly speaking it. My words were not my own. They were the voice of prophecy speaking through a mouth that did not intend to prophesy. The instrument was flawed, but the message transcended it.
* [The message endured.] -> message_endured
* [The testimony spread.] -> testimony_spread_caiaphas

=== message_endured ===
The message endured -- not because of me, but despite me. The archives I maintained, the judgments I pronounced, the calculations I made -- all of it now serves a purpose I never intended. Truth, like a stone rolled away, cannot be contained.
* [The greatest story.] -> greatest_story
* [The final word.] -> final_word_caiaphas

=== greatest_story ===
The greatest story -- for me, for this council, for this nation, for the world -- is that justice and mercy meet at the cross. That truth and power confront each other. That the high priest who sought to preserve his position would instead be remembered as the man who unknowingly sealed his own people's salvation.
* [The record stands.] -> closing

=== trial ===
We will hear them all. The truth will reveal itself, but the public safety verdict cannot be delayed. Let the witnesses speak -- let them contradict themselves if they must. The Sanhedrin does not act without due process, even under pressure.
# UNLOCK_EVIDENCE: evidence_temple_authority
* [The due process is questioned.] -> due_process
* [The pressure is mounting.] -> pressure_mounting

=== due_process ===
The due process is questioned. The Law requires two or three witnesses, valid testimony, proper procedure. We have followed these laws precisely. But the most important thing is not the letter of the law but the spirit of justice it embodies.
* [The safety of many.] -> safety_many
* [The burden is great.] -> burden_great

=== safety_many ===
The safety of many outweighs the rights of one. When a single individual threatens the peace of the entire community, the community preservation becomes the higher imperative. The Talmudic sages understood this principle deeply.
* [The judgment is final.] -> judgment_final
* [The consequences are eternal.] -> consequences_eternal

=== judgment_final ===
The judgment is final -- for the condemned, for the judges, for the nation that watches. I have seen prophets come and go, messiahs rise and fall. Few leave their mark on the face of eternity as this one does.
* [The mark is indelible.] -> mark_indelible
* [The testimony endures.] -> testimony_endures_caiaphas

=== closing ===
The record stands -- not because I desired it, but because the truth, like a stone rolled away, cannot be contained. My council chamber, my judgment hall, my very chair -- all of it became a stage for the greatest story ever told. The archives I touched as a scribe, the robes I wore as a priest, the crown I carried as a judge -- all of it now serves eternity instead of temporality.
-> DONE
