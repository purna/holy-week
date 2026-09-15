// ============================================================
// CHARACTER: Judas Iscariot (Betrayal and Remorse)
// ACT: Act III/IV
// CASE: The Guard's Report
// CASE ID: roman_inquiry
// SOURCE: js/act3_case.js -> NPC 'judas'
// BIBLE REFERENCE: Matthew 26:14-16; Matthew 26:20-25; Matthew 27:3-10;
//   John 13:18-30; John 17:1-25; Acts 1:18-19
// ------------------------------------------------------------
// WITNESS CROSS-REFERENCES:
//   - Caiaphas (caiaphas_roman_inquiry.ink): accepted Judas's silver
//   - Peter (peter_defense.ink): denial and restoration as parallel
//   - Mary Magdalene (mary_resurrection.ink): first witness
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_judas_betrayal_price (thirty pieces of silver)
//   - evidence_field_of_blood (Akeldama, potter's field)
//   - evidence_peter_contrast (Peter's denial and restoration)
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Zechariah 11:12-13 — "Thirty pieces of silver"
//   - Matthew 27:3-10 — silver returned, death, and the potter's field;
//     Matthew attributes the combined prophetic pattern to Jeremiah
//   - Psalm 41:9 — "He who ate my bread has lifted up his heel"
//   - Psalm 55:12-14 — Ahithophel's betrayal prefigures Judas's
// ============================================================

-> start

=== start ===
You trace my steps with ink and parchment, little scribe, as though thirty pieces of silver were the whole of the story. You cannot know what it means to sit at the table of the Son of God and contemplate the weight of what the prophets have written. I saw the path ahead and thought I could shorten the journey by force. I was wrong.
* [You sold Him for thirty pieces of silver.] -> motivations
* [You regret it now.] -> regret
* [What did Jesus say to you at the supper?] -> supper_quote

=== motivations ===
Thirty pieces of silver. The Torah sets that exact sum as the price paid when a slave is gored — Exodus 21:32. That is what the chief priests weighed into my hand: not a fortune, but a slave's price.
# UNLOCK_EVIDENCE: evidence_judas_betrayal_price
* [Zechariah wrote of this exact price.] -> zechariah_price
* [The money bag seems heavy tonight.] -> bag_heavy
* [Peter's reaction at the table.] -> conversation_end
* [Conclude.] -> victory_is_his

=== zechariah_price ===
You know your prophets. "So they weighed for my price thirty pieces of silver... and I cast them to the potter in the house of the LORD." Zechariah wrote this centuries before I was born. I fulfilled it to the coin without setting out to follow his scroll. If the price was written before I chose it, whose hand was really moving mine?
* [Whose hand guided yours?] -> whose_hand
* [The silver was prophetic.] -> silver_prophetic
* [Why does Matthew name Jeremiah?] -> jeremiah_attribution
* [Conclude.] -> victory_is_his

=== jeremiah_attribution ===
Matthew records what followed and says that the words spoken through Jeremiah were fulfilled: thirty pieces returned to the sanctuary, then used to buy the potter's field. The price and the casting of the silver echo Zechariah 11:12–13. Jeremiah supplies the wider image — the potter, the shattered vessel, and a field purchased under judgment and hope in Jeremiah 19 and 32. Matthew gathers those prophetic threads under Jeremiah's name and shows them converging in what the priests did with my blood money.
# UNLOCK_EVIDENCE: evidence_field_of_blood
* [Trace what happened to each coin.] -> matthew_fulfillment
* [Conclude.] -> victory_is_his
* [So two prophetic pictures converge.] -> prophetic_threads

=== matthew_fulfillment ===
Matthew 27:3–10 traces it step by step. I saw that Jesus was condemned. I returned the thirty pieces and confessed that I had betrayed innocent blood. The priests refused responsibility. I threw the coins into the sanctuary and went away to hang myself. Because they called the money blood money, they would not return it to the treasury. Instead they bought the potter's field as a burial place for foreigners. Price, sanctuary, potter, field — the details became evidence after my voice was gone.
# UNLOCK_EVIDENCE: evidence_judas_betrayal_price
# UNLOCK_EVIDENCE: evidence_field_of_blood
* [The Field of Blood preserved the testimony.] -> conversation_end
* [The priests completed what they tried to contain.] -> prophetic_threads
* [Conclude.] -> victory_is_his
* [Conclude.] -> victory_is_his

=== prophetic_threads ===
Two prophetic pictures converge. Zechariah gives the rejected shepherd's contemptible wage — thirty silver pieces thrown to the potter in the house of the LORD. Jeremiah gives the potter and the field as signs of judgment, while a purchased field also becomes a witness that God's purpose reaches beyond disaster. Matthew does not let the priests' transaction remain bookkeeping. He reads it as fulfilment.
# UNLOCK_EVIDENCE: evidence_field_of_blood
* [The transaction became testimony.] -> testimony_endures_detail
* [Return to what happened at the field.] -> field_calls

=== whose_hand ===
Whose hand guided mine? The same hand that guided Moses, that guided David, that guided the prophets who spoke of this very moment. All of it was written before the foundation of the world. I was the instrument, not the author.
* [The betrayal was foreknown.] -> foreknown_betrayal
* [The price was agreed.] -> conversation_end
* [Conclude.] -> victory_is_his

=== foreknown_betrayal ===
Foreknown by the Father before the foundation of the world — yet I chose. The Scriptures declare: "He was foreknown before the foundation of the world." The Lamb was slain. And yet I am responsible.
* [The choice was real.] -> choice_was_real
* [Conclude.] -> victory_is_his
* [The responsibility was mine.] -> responsibility_mine

=== choice_was_real ===
The choice was real. My silver bought a field. His sacrifice bought a kingdom. I chose the lesser price. The wages of sin is death.
* [The field was bought.] -> conversation_end
* [The price was different.] -> conversation_end
* [Conclude.] -> victory_is_his

=== responsibility_mine ===
The responsibility was mine. Not God's. Not the Scriptures'. Mine. "Repent therefore, and be converted, that sins may be blotted out."
* [The refusal was mine.] -> refusal_was_mine
* [The light remained.] -> conversation_end
* [Conclude.] -> victory_is_his

=== refusal_was_mine ===
The refusal was mine. The invitation was extended to me as to all. I chose the darkness I preferred to the light I had seen.
* [The field calls.] -> field_calls
* [What became of the silver?] -> silver_became
* [Conclude.] -> victory_is_his
* [Conclude.] -> victory_is_his
* [Conclude.] -> victory_is_his

=== silver_prophetic ===
The silver was prophetic — not because I sought prophecy, but because the prophecy sought me. "They weighed out as my wages thirty pieces of silver" — Zechariah. Thirty pieces: the price I could not take back.
# UNLOCK_EVIDENCE: evidence_judas_betrayal_price
* [The payment was counted.] -> conversation_end
* [The testimony was buried.] -> conversation_end
* [Conclude.] -> victory_is_his

=== field_calls ===
The field calls — and answered. Akeldama. The blood of the prophet, mixed with the price of betrayal, soaked into soil that welcomed it as it had welcomed Abel's blood.
# UNLOCK_EVIDENCE: evidence_field_of_blood
* [Akeldama's testimony.] -> conversation_end
* [The soil remembers.] -> conversation_end

=== silver_became ===
Silver became soil. Soil became testimony. Testimony became history. History became the foundation of a kingdom.
* [The testimony endures.] -> testimony_endures_detail
* [The field still grows.] -> conversation_end
* [Conclude.] -> victory_is_his

=== testimony_endures_detail ===
The testimony endures. Mary Magdalene first, whose testimony the priests tried to counter with a lie. Then Peter, restored. Then the centurion confessing.
* [The witnesses multiplied.] -> witnesses_multiplied_detail
* [Conclude.] -> victory_is_his
* [The testimony spread.] -> testimony_spread_detail
* [Conclude.] -> victory_is_his

=== witnesses_multiplied_detail ===
The witnesses multiplied. Mary Magdalene first. Then Peter and John. Then the women with their message of joy. Then the centurion with his confession.
* [The testimony spread.] -> testimony_spread_detail
* [The lie could not hold.] -> conversation_end

=== testimony_spread_detail ===
The testimony spread. Each witness added credibility. Each appearance multiplied the evidence. The women rejected became the foundation of the Gospel message.
* [The foundation was weak.] -> conversation_end
* [The kingdom was built on weak things.] -> conversation_end
* [Conclude.] -> victory_is_his
* [Conclude.] -> victory_is_his

=== bag_heavy ===
The money bag does seem heavy tonight. Thirty silver coins — the weight of a life. I did what was necessary, or so I told myself.
money_bag_impression = true
* [What was necessary.] -> was_necessary
* [Jesus spoke of a new covenant.] -> conversation_end
* [Conclude.] -> victory_is_his

=== was_necessary ===
What was necessary — to force His hand, to fulfill the Scriptures. Peter will tell you I was possessed by Satan. But the Scriptures were precise. The price was exact.
* [The definition mattered.] -> definition_mattered
* [Satan's role.] -> conversation_end
* [Conclude.] -> victory_is_his

=== definition_mattered ===
The definition mattered. Judas Iscariot — not "the disciple who betrayed Him," but "Judas, a common name." Thirty pieces of silver, the price of a slave. The Scriptures were precise.
* [The price was exact.] -> conversation_end
* [Conclude.] -> victory_is_his
* [The betrayal was sealed.] -> conversation_end

=== supper_quote ===
He knew before I had even risen from the table. He dipped the bread and gave it to me, saying: "That thou doest, do quickly." John thought He meant an errand. Only I understood — He was releasing me, not stopping me.
* [He quoted a psalm about you first.] -> psalm_quote_detail
* [John recorded this.] -> conversation_end

=== psalm_quote_detail ===
Earlier that evening, He said: "He that eateth bread with me hath lifted up my heel against me." David wrote those words a thousand years before. I had eaten His bread every night.
* [Jesus knew.] -> jesus_knew_detail
* [Conclude.] -> victory_is_his
* [The prediction was clear.] -> conversation_end

=== jesus_knew_detail ===
Jesus knew. He had spoken of His death and resurrection three times. The silver was waiting. The trap was laid. Judas of Kerioth — the man trusted with the bag, chose the outer darkness.
* [The path was clear.] -> conversation_end
* [The regret began.] -> conversation_end
* [Conclude.] -> victory_is_his

=== regret ===
I watched three years of expectation curdle. The Messiah was supposed to be a king who broke Rome. Instead He washed feet. Instead He spoke of dying. The Zealots wanted a general. I wanted a winner. I was wrong.
# UNLOCK_EVIDENCE: evidence_peter_contrast
* [What happened to the money?] -> field_of_blood_detail
* [He prayed for you.] -> jesus_prayed_detail

=== field_of_blood_detail ===
I took it back. I threw thirty pieces of silver onto the floor, telling the priests: "I have sinned." They said: "What is that to us? See to it yourself." Then I went and hanged myself.
# UNLOCK_EVIDENCE: evidence_field_of_blood
* [Akeldama's echo.] -> conversation_end
* [The earth bore witness.] -> conversation_end
* [Why does Matthew name Jeremiah?] -> jeremiah_attribution

=== jesus_prayed_detail ===
John records that Jesus prayed for His disciples — and for all who would believe, including me. "I pray for those you have given me." I was among those He had been given.
* [The prayer included the traitor.] -> prayer_included_traitor
* [The forgiveness was offered.] -> conversation_end

=== prayer_included_traitor ===
The prayer included the traitor. The forgiveness was offered before the betrayal was complete. The redemption was planned before the silver was paid.
* [Before the foundation.] -> conversation_end
* [The betrayal was instrument.] -> betrayal_instrument

=== betrayal_instrument ===
The betrayal was not the interruption of divine plan — it was the instrument of divine purpose. The Lamb was slain before the foundation of the world.
* [The redemption was sufficient.] -> conversation_end
* [The gift was free.] -> gift_was_free

=== gift_was_free ===
The gift was free. The wages of sin is death, but the gift of God is eternal life. My thirty pieces could not buy back what I had sold.
* [The salvation was offered.] -> salvation_offered_detail
* [The rejection was mine.] -> conversation_end

=== salvation_offered_detail ===
The salvation was offered — to me, Peter, the centurion, Mary, to all who would believe. The rejection was mine. But the offer stands.
* [The testimony is complete.] -> testimony_complete_detail
* [The light endures.] -> light_endures
* [Conclude.] -> victory_is_his

=== testimony_complete_detail ===
The testimony is complete. The witnesses have spoken. The tomb is empty. The earth has borne witness. The Scriptures have been fulfilled.
* [The final word.] -> conversation_end
* [The dawn breaks.] -> conversation_end

=== light_endures ===
The light endures. The dawn breaks. And the testimony — "I am the resurrection and the life" — endures still. My silver bought a field for strangers. His sacrifice bought a kingdom for all.
* [The testimony spreads still.] -> testimony_spreads_still
* [The earth testifies.] -> conversation_end

=== testimony_spreads_still ===
The testimony spreads still — from that hill to the ends of the earth. From my silver, a field was bought. From His sacrifice, a kingdom was won. From my silence, a warning. From His voice — eternal life.
* [Every knee bows.] -> every_knee_final
* [The blood calls.] -> conversation_end

=== every_knee_final ===
Every knee bows — even mine, in the day when I stand before the throne. "Repent therefore, and be converted, that sins may be blotted out."
* [The throne awaits.] -> throne_awaits
* [The judgment comes.] -> conversation_end

=== throne_awaits ===
The throne awaits. The books are open. Every deed stands recorded. My silver — a slave's price. His sacrifice — a king's ransom. My field — Akeldama. His cross — the Tree of Life.
* [The contrast is etched.] -> contrast_etched
* [The choice remains.] -> conversation_end

=== contrast_etched ===
The contrast is etched in stone and blood and testimony. My silver could not purchase redemption. But His blood — shed once for all — paid the price I could never pay.
* [The price was paid.] -> price_paid_final
* [The gift accepted.] -> conversation_end

=== price_paid_final ===
The price was paid. It is finished. The debt is canceled. The handwriting that accused me — nailed to the cross — is gone.
* [The record erased.] -> record_erased
* [The testimony complete.] -> conversation_end

=== record_erased ===
The record erased — blotted out the charge that was against me, nailing it to the cross. What was written against me, sealed with the thirty pieces of silver — gone. What was written for me, sealed with the blood of the cross — eternal.
* [The blood was sufficient.] -> blood_sufficient
* [The covenant stands.] -> conversation_end

=== blood_sufficient ===
The blood was sufficient. More than sufficient. "The blood of Jesus, His Son, cleanses us from all sin." Not some sins. Not many sins. All sin. Even mine.
* [The cleansing is complete.] -> cleansing_complete
* [The forgiveness is full.] -> conversation_end

=== cleansing_complete ===
The cleansing is complete. The forgiveness is full. The invitation remains.
* [The invitation stands.] -> invitation_stands_final
* [The light beckons.] -> conversation_end

=== invitation_stands_final ===
The invitation stands. Not because I deserved it, but because He is faithful. "Come, for all things are now ready."
* [The readiness is here.] -> readiness_here
* [The table is set.] -> conversation_end

=== readiness_here ===
The readiness is here. The table is set. The lamb is slain. The cup is poured. The testimony is true. He who overcomes — He shall eat of the tree of life.
* [The tree of life.] -> tree_of_life
* [The testimony endures.] -> conversation_end

=== tree_of_life ===
The tree of life — once barred to me, now opened. The gates of the city stand open. The river of life flows from the throne.
* [The river flows.] -> river_flows
* [The gates stand open.] -> conversation_end

=== river_flows ===
The river flows. The testimony flows. The light flows. And in that light, I see — not my failure, but His victory. Not my silver, but His sacrifice. Not Akeldama, but the Tree of Life.
* [The victory is His.] -> victory_is_his
* [The testimony complete.] -> conversation_end

=== victory_is_his ===
The victory is His. The testimony complete. The dawn breaks. The earth remembers. The testimony endures.


* [Finish the interview.] -> conversation_end

=== conversation_end ===
-> DONE
