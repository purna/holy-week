// ============================================================
// CHARACTER: Eleazar ben Simon (Sadducee Noble)
// ACT: Act I
// CASE: The Missing Donkey
// CASE ID: triumphal_entry
// CASE EXPORT: triumphal_entry
// SOURCE: act1_case_2d.js → SUSPECT 'sadducee_noble' (Eleazar ben Simon)
// BIBLE REFERENCE: Acts 5:17 (Sadducean opposition context); Matthew 21:12-13
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Psalm 2:2
//     Gospel: Luke 22:66-71 — The Sanhedrin's conspiracy against Jesus
//     Insight: The psalmist foresaw the rulers of this earth taking
//     counsel against the Lord and His anointed. Eleazar represents
//     this opposition, using his wealth and influence to challenge
//     the kingly claims of Christ.
//   - Isaiah 53:9
//     Gospel: Matthew 27:12-26 — Jesus's trial before the Sanhedrin
//     Insight: The suffering servant was numbered with the transgressors
//     and buried with the rich. Caiaphas, Eleazar, and their like are
//     those who "considered Him stricken, smitten by God, and afflicted."
// ============================================================
// BIBLICAL CONTEXT:
//   Eleazar ben Simon, a wealthy Sadducean aristocrat, witnessed
//   the triumphal entry and the Temple cleansing. Rather than
//   recognizing the prophetic moment, he framed the donkey
//   retrieval as theft and the Temple cleansing as insurrection.
//   His deposition created legal grounds for Roman intervention,
//   reflecting the depth of opposition to Jesus's kingly claims.
// ============================================================

-> start

=== start ===
My name is Eleazar. I am a son of Aaron — not by birth, but by contract. The Temple employs my family to manage its commercial interests. What you call the "Triumphal Entry," I call an unauthorized seizure of property. The colt was not lent. It was taken. By force. Under cover of religious fervor.

* [You filed a deposition with the authorities.] -> deposition
* [The owner says he gave it willingly.] -> owner_testimony
* [You also witnessed the Temple cleansing.] -> temple_cleansing

=== deposition ===
# UNLOCK_EVIDENCE: witness_account
# UNLOCK_EVIDENCE: rope_fibers
I witnessed the entire event from my villa's upper terrace. Two rough-looking men approached the tethering post near the gate. They drew blades — crude iron points — and hacked through the rope. The owner protested. Violently. I have the guards' testimony to corroborate my deposition.

* [But rope fibers show no cuts.] -> evidence_conflict
* [The owner contradicts your account.] -> owner_testimony
* [Your villa gave you limited perspective.] -> limited_view

=== owner_testimony ===
# UNLOCK_EVIDENCE: witness_account
Tobias is a dreamer. He sees prophecies in every bird that flies over his field and every breeze that stirs his curtains. When I questioned him, he insisted the colt was "given freely" and that the stranger's words — "The Lord needs it" — unlocked some ancient recognition. I have studied the Torah for forty years, not folk tales.

* [You frame faith as delusion.] -> limited_view
* [The Sanhedrin accepts your deposition.] -> sanhedrin

=== temple_cleansing ===
Three days later, the same crowd that celebrated a stolen donkey demanded that I explain why our Temple had become a marketplace. I stood in the outer courts and watched a Galilean carpenter destroy three centuries of established commerce with nothing but a whip of rushes. He called it "cleansing." I call it economic terrorism.

* [The merchants had licenses.] -> temple_defense
* [You fear Roman retaliation.] -> roman_threat
* [The system serves the people.] -> temple_defense

=== evidence_conflict ===
The rope fibers, examined under magnification, show fresh separation at the cut points. Iron residue on the remaining strands. The owner's claim that he "untied" the colt is physically impossible. I am a man of evidence, not superstition. But my investigators found no iron in the rope. Only the owner's word against my deposition.

* [The investigation contradicts you.] -> limited_view
* [You stand by your account regardless.] -> closing_eleazar

=== limited_view ===
I had a villa overview. Not the ground-level detail. But I saw the approach, the confrontation, the removal of the animal. From two hundred cubits up, I had sufficient perspective to file a credible deposition. My income depends on the Temple's stability, just as every Jerusalem merchant depends on its prosperity. The Galilean's "cleansing" disrupted a system that functioned for two thousand years.

* [The system was already corrupt.] -> corruption
* [You protect your investment.] -> corruption
* [Your view is motivated by profit.] -> closing_eleazar

=== sanhedrin ===
The Sanhedrin is divided. Caiaphas sees political threat. The Pharisees see theological concern. Some scribes see genuine prophecy. But the Sadducees — those who control the Temple finances — see the greatest threat to the established order. My deposition confirmed what we already knew.

* [Division weakens your position.] -> closing_eleazar
* [The Sadducees have the most to lose.] -> closing_eleazar

=== temple_defense ===
Every merchant in the Court of the Gentiles operates under priestly license. Every transaction is registered. Every animal is inspected. We maintain standards that a carpenter from Nazareth cannot comprehend. Corruption in commerce exists, yes — but corruption in faith is a different question entirely. The Galilean speaks of love and forgiveness, but He does not provide the means by which the Temple functions. Without our commerce, how do the poor offer their sacrifices?

* [Prayer replaces sacrifice.] -> closing_eleazar
* [The means should not become the end.] -> closing_eleazar

=== corruption ===
Every institution has corruption. But the system as a whole is not corrupt. It is the individuals within it who sometimes fail. The system provides structure, order, predictability. Through Babylonian captivity. Through Maccabean revolt. Through Roman occupation. The Temple endures because it adapts while remaining faithful to its core function.

* [Stability without righteousness is not stability.] -> closing_eleazar
* [The system protects itself, not the people.] -> closing_eleazar

=== roman_threat ===
The Romans will be called in when the crowds become unruly. Today it is scattered coins. Tomorrow — when the people realize their leader has been taken — it could be stones. Or worse. A king who enters on a donkey invites chaos. A priest who maintains contracts maintains order.

* [The chaos is your fear.] -> closing_eleazar
* [The king offers real peace.] -> closing_eleazar

=== closing_eleazar ===
I am Eleazar ben Simon. I have filed my deposition. I have stated my concerns. I have defended the system that has served Israel for two thousand years. You can believe me or not. But you cannot deny that I witnessed what I witnessed. And I will testify to it. Whatever the cost.

-> DONE
