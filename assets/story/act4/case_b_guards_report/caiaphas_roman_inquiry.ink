// ============================================================
// CHARACTER: Joseph ben Caiaphas — High Priest
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: roman_inquiry
// CASE EXPORT: resurrection
// SOURCE: act4_case.js -> NPC 'caiaphas' / 'chief_priest'
// BIBLE REFERENCE: Matthew 28:11-15; Matthew 26:57-68; Mark 14:53-65;
//   John 18:19-24; Acts 5:17-42
// ------------------------------------------------------------
// WITNESS CROSS-REFERENCES:
//   - Judas Iscariot (judas_betrayal.ink): paid the price of a slave
//   - Chuza / Joanna (herods_servant.ink): Herod's steward whose wife
//     was among the women who reported the empty tomb
//   - Mary Magdalene (mary_resurrection.ink): first witness to the
//     empty tomb, rejected by this same council
//   - Lucas the Sentry (sentry_lucas.ink): Roman guard whose report
//     triggered the cover story Caiaphas now manages
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_sanhedrin_report (the forged Sanhedrin report filed by
//     Caiaphas's administration as part of the cover-up)
//   - evidence_bribe_shekels (Temple shekels paid to the soldiers)
//   - evidence_coverup_documentation (the internal correspondence
//     proving Caiaphas fabricated the "disciples stole the body" narrative)
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Psalm 2:1-2
//     Gospel: Matthew 28:11-15 — "The chief priests... gave the
//     soldiers a large sum of money."
//     Insight: The rulers of the earth banding together against the
//     Anointed One — their conspiracy documented in their own records
//     and verified by the bribe coins found in the soldiers' lockers.
//   - Isaiah 53:10
//     Gospel: Caiaphas's unwitting prophecy (John 11:51): "You know
//     nothing at all, nor do you take account of this, that you will
//     have the Son of Man lifted up."
//     Insight: Caiaphas prophesied salvation without knowing it —
//     his attempt to protect the nation became the instrument of
//     its salvation through the cross.
//   - Jeremiah 19:1-6
//     Gospel: The field of blood — Akeldama, purchased with the price
//     of betrayal, becomes the field of prophecy fulfilled.
//     Insight: Judas's silver, meant to silence the truth, became a
//     monument to the very blood price it was meant to hide.
//   - Psalm 16:10
//     Gospel: Matthew 27:9-10 — "Then was fulfilled the saying of the
//     prophets: 'I will receive thirty pieces of silver.'"
//     Insight: Even the field where Judas's silver was spent became
//     a vehicle for prophecy — the potter's field for the aliens,
//     the burial ground for the nameless.
// ============================================================

-> start

=== start ===
# UNLOCK_EVIDENCE: coverup_documentation
# UNLOCK_EVIDENCE: sanhedrin_report
# UNLOCK_EVIDENCE: bribe_shekels
I speak as both High Priest of Israel and a pragmatic administrator of this province. When the guard unit reported what they had seen — the earthquake, the light, the empty tomb — I did not dismiss it as superstition. I assessed the threat.
+ [What threat could a dead man pose?] -> threat_assessment
+ [You called the guards to your chamber.] -> conversation_end
+ [And the soldiers?] -> conversation_end
+ [What was the institutional calculation behind your response?] -> calculated_risk

=== threat_assessment ===
The threat was not theological. It was institutional. A movement that could produce dozens of witnesses to a resurrection — Mary Magdalene, other women who followed Him, and His disciples — could not be contained by a single false narrative. We needed absolute control of the story.
+ [Absolute control?] -> absolute_control
+ [You chose silence.] -> conversation_end

=== absolute_control ===
Absolute control of the narrative. The Sanhedrin has managed this city's religious discourse for decades. We permit debate. We allow discussion. But we do not permit movements that challenge the fundamental architecture of Temple worship. The empty tomb was precisely such a challenge.
+ [You knew the reports were multiplying.] -> reports_spreading
+ [What was the first step?] -> conversation_end

=== reports_spreading ===
The reports were multiplying faster than we could contain them. By the third day after the crucifixion, women were returning from the garden with tears of joy — not mourning. The disciples were meeting in private — not hiding, but preaching. And the guards — men who do not invent earthquakes — were demanding protection from the procurator himself.
+ [The women came first.] -> women_first
+ [Even the guards were involved.] -> conversation_end

=== women_first ===
The women came first — naturally. They had been with Him from the beginning, from the day He cast seven demons from Mary Magdalene in the region of Galilee. They had followed Him through the cities and towns, ministering to Him out of their own means, as Luke records. They were the last to leave the cross, and now they were the first to announce the resurrection.
+ [You knew them.] -> knew_them
+ [And their testimony was rejected.] -> testimony_rejected

=== knew_them ===
I knew them. The Sanhedrin has catalogued these women for years. Mary Magdalene — wept from her, a victim of demonic oppression now healed by this Galilean. Joanna — Chuza's wife, a wealthy woman whose household records still list "expenditures for the Teacher" before the final entry: "expenditures ceased." Martha and Mary — sisters of Bethany, hosts of multiple dinners where He had reclined at their table.
+ [What did you do with their testimony?] -> testimony_handling
+ [Their testimony could not be ignored.] -> could_not_ignore

=== testimony_rejected ===
Their testimony was... inconvenient. Luke records what happened when they returned to the Eleven: "Their words seemed to them as idle tales, and they believed them not." Even the apostles — who had spent three years with the Teacher — could not accept the testimony of women.
+ [Even the apostles struggled.] -> apostles_struggled
+ [But the testimony endured.] -> conversation_end
+ [Finish the interview.] -> truth_prevailed

=== apostles_struggled ===
The apostles struggled with women's testimony because our legal system provides no recourse — Deuteronomy 19 requires two or three witnesses, and a woman's word alone carries no weight before the Sanhedrin. This is not malice — it is statute. Yet if eleven men conspired to fabricate a resurrection, no sane fabricator would build his story on a woman's word, knowing that word would be dismissed.
+ [The weakness of the testimony.] -> conversation_end
+ [Which proves its authenticity.] -> conversation_end
+ [Finish the interview.] -> truth_prevailed

=== could_not_ignore ===
But their testimony could not be ignored — because it kept spreading. More women reported more encounters. More disciples claimed more appearances. The movement was growing faster than the Temple's ability to suppress it. Each witness added credibility to the others.
+ [The credibility multiplied.] -> credibility_multiplied
+ [You saw the numbers.] -> conversation_end
+ [Finish the interview.] -> truth_prevailed

=== credibility_multiplied ===
The credibility multiplied. Five hundred at once — Paul writes of this years later, a number too large to dismiss as hallucination. The women who went to Simon Peter and the others — they were not the only ones who saw the risen Christ. The evidence was no longer contained to Galilee or even to Judea. It was traveling.
+ [Continue.] -> conversation_end

=== testimony_handling ===
I authorized a carefully worded response. Matthew notes that when the guards reported to us, "when they were assembled with the elders, they consulted together, and they gave a large sum of money to the soldiers, saying, 'Tell them, His disciples came by night and stole Him away while we slept.'"
+ [The words were strategic.] -> strategic_words
+ [The money was substantial.] -> money_substantial

=== strategic_words ===
"Tell them His disciples came by night and stole Him away while we slept." Strategic in its simplicity. It explains the empty tomb without denying the supernatural events — the earthquake, the light, the paralyzed soldiers. It redirects the narrative to human agency: the disciples, thieves, liars, frightened men.
+ [The narrative was pre-fabricated.] -> pre_fabricated
+ [It would not hold.] -> conversation_end
+ [Finish the interview.] -> truth_prevailed

=== pre_fabricated ===
The narrative was pre-fabricated. We had been discussing the possibility since Lazarus — when the Sanhedrin first realized that this man could raise the dead and that the people were beginning to believe. The cover story was written in draft form months before the first guard ever reported. We were ready.
+ [The draft was written in advance.] -> draft_in_advance
+ [The plan had stages.] -> plan_stages
+ [Finish the interview.] -> truth_prevailed

=== draft_in_advance ===
The draft was written in advance. Caiaphas himself raised the question at the Sanhedrin meeting after Lazarus: "You know nothing at all. If we let Him go on, all the world will be going to Him, and the Romans will come and take away both our place and our nation." John records that he did not understand that He was speaking of the death of the Son of God.
+ [Caiaphas prophesied it.] -> caiaphas_prophecy
+ [Without knowing.] -> conversation_end
+ [Finish the interview.] -> truth_prevailed

=== caiaphas_prophecy ===
Caiaphas prophesied it — and John notes that he did so as High Priest, "prophesying that Jesus would die for the nation, and not for the nation only, but also to gather together into one the children of God who were scattered abroad." A high priest speaking salvation while intending political survival. The irony was complete.
+ [The prophecy was fulfilled.] -> conversation_end
+ [The death was necessary.] -> conversation_end
+ [Finish the interview.] -> truth_prevailed

=== plan_stages ===
The plan had stages. Stage one: manage the guards' report. Stage two: pay the soldiers. Stage three: ensure the false narrative is spread throughout the city. Stage four: monitor the spread of the alternative accounts and counter them with our own.
+ [The monitoring was constant.] -> conversation_end
+ [The counter-narrative was aggressive.] -> conversation_end
+ [Finish the interview.] -> truth_prevailed

=== money_substantial ===
The money was substantial. Matthew records the exact figure: "a large sum of money." Not a pittance — enough to enrich four men permanently. Enough to buy silence for years. The Temple treasury paid for truth to be buried.
+ [The price of silence.] -> price_silence
+ [The cost to the Temple.] -> conversation_end

=== price_silence ===
The price of silence was paid in Temple shekels — the very currency that paid for the sacrifices that this man had just rendered obsolete. The irony was too perfect: the Temple's sacred treasury financing the cover-up of a resurrection that would end the need for Temple sacrifice.
+ [The irony was complete.] -> conversation_end
+ [The cost was internal.] -> internal_cost

=== internal_cost ===
The cost was internal. Every shekel paid to the soldiers was a shekel taken from the Temple's reserves. Every attempt to silence witnesses was an admission that the witnesses had something worth silencing. The more we spent, the more we proved the truth.
+ [The proof was in the spending.] -> proof_spending
+ [The evidence was self-incriminating.] -> conversation_end

=== proof_spending ===
The evidence was self-incriminating. Our own records — the Sanhedrin report, the correspondence between Caiaphas and the Temple steward, the ledger entries showing the disbursement — all of it proved that we knew what the guards had seen was real. We spent silver to cover up what the earthquake revealed.
+ [The records survive.] -> records_survive
+ [The investigation will find them.] -> investigation_finds

=== records_survive ===
The records survive. The Sanhedrin report — Matthew calls it that — was filed in the Temple archives. The correspondence — correspondence between the High Priest's office, the Temple steward who handled the money, and the scribe who recorded the guards' testimony — still exists.
+ [The investigation will find them.] -> investigation_finds
+ [The evidence is irrefutable.] -> conversation_end

=== investigation_finds ===
The investigation will find them — if you know where to look. The Temple archives. The Sanhedrin records. The correspondence between Caiaphas and the procurator. Everything was documented. Everything was filed. Everything was signed. The paper trail of the greatest cover-up in Jewish history.
+ [The truth is in the files.] -> truth_files
+ [No stone is unturned.] -> conversation_end

=== truth_files ===
The truth is in the files. And the files will be read. One day, someone — perhaps a scribe like you — will open this very chamber and find the letters, the ledgers, the testimonies, and the silver weights that prove we knew what we were covering up.
+ [The revelation will be complete.] -> revelation_complete
+ [The house of cards falls.] -> conversation_end

=== revelation_complete ===
The revelation will be complete. The house of cards built on silver and silence will come crashing down. The Sanhedrin's reputation — built on centuries of religious authority — will be exposed as the product of political calculation and theological cowardice.
+ [Finish the interview.] -> conversation_end

=== calculated_risk ===
The calculated risk of institutional collapse. If the resurrection reports gained traction — and they were gaining — the Temple's revenue stream would evaporate within months. The pilgrim trade, the sacrifice fees, the money-changing commissions — all dependent on a population that still believed in the sacrificial system. The resurrection threatened to make all of it obsolete.
+ [The economics of faith.] -> faith_economics
+ [The threat was financial.] -> conversation_end

=== faith_economics ===
The economics of faith were straightforward. The people come to Jerusalem, they offer sacrifices, they pay for the animals, they exchange their coins, they donate to the Temple treasury. Remove the belief that sacrifices are necessary, and the entire system crumbles. The resurrection of one man threatened to collapse a thousand years of religious commerce.
+ [The collapse was theological.] -> conversation_end
+ [The response was decisive.] -> decisive

=== decisive ===
The response was decisive. We could not debate the resurrection in the open — that would give it legitimacy. We could not engage the witnesses directly — that would validate their claims. We had to act behind the scenes, in the shadows of the Temple administration, with the tools of institutional power: money, narrative, and silence.
+ [The tools of power.] -> tools_of_power
+ [The narrative was controlled.] -> conversation_end

=== tools_of_power ===
The tools of power. Money — to pay the guards to stay quiet. Narrative — to explain away the empty tomb without engaging with the supernatural. Silence — to prevent any discussion of the earthquake, the light, or the divine intervention that the soldiers had witnessed.
+ [The silence was bought.] -> conversation_end
+ [The narrative was weaponized.] -> narrative_weaponized

=== narrative_weaponized ===
The narrative was weaponized. "His disciples came by night and stole Him away while we slept." The narrative was designed to accomplish three objectives: it explained the empty tomb without acknowledging the supernatural, it blamed the disciples without implicating the Sanhedrin, and it shifted the burden of proof to someone else's actions.
+ [The burden was shifted.] -> burden_shifted
+ [The objective was met.] -> conversation_end

=== burden_shifted ===
The burden of proof was shifted to the disciples — accused of theft and deception, not the authorities of covering up a miracle. The narrative was designed to make the witnesses look dishonest and the establishment look reasonable. The simplicity of the lie was its strength.
+ [The simplicity was deceptive.] -> conversation_end
+ [The deception would be exposed.] -> deception_exposed

=== deception_exposed ===
The deception would be exposed. Every coin paid to the soldiers was a coin that proved we knew what they saw was real. Every letter written was a letter that proved we were trying to hide it. Every narrative we pushed was a narrative that contradicted the physical evidence — the broken seal, the shattered spear, the unbroken silence of the tomb.
+ [The contradiction was in their records.] -> truth_will_out
+ [The evidence was undeniable.] -> conversation_end

=== truth_will_out ===
The truth will out. Matthew — the tax collector, the former outcast — writes it down for all to read. He records that the soldiers said "His disciples stole the body." But he also writes: "When the people heard this, they were greatly distressed." The lie did not convince. The truth endured.
+ [The people knew.] -> people_knew
+ [The lie was insufficient.] -> conversation_end

=== people_knew ===
The people knew. Even under the weight of the official narrative, even with the silver flowing, even with the Sanhedrin's authority behind the cover story — the people knew. They had witnessed the crucifixion. They had seen the darkness. They had felt the earthquake. The lie could not override what they had seen.
+ [The truth prevailed.] -> truth_prevailed

=== truth_prevailed ===
The truth prevailed. Not because we stopped lying — we continued to lie. Not because the people stopped questioning — they continued to question. But because the resurrection happened whether we acknowledged it or not. A lie cannot cover up a fact.
+ [Finish the interview.] -> conversation_end

=== conversation_end ===
-> DONE
