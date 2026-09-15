// ============================================================
// CHARACTER: Centurion Longinus (Claudius)
// ACT: Act III
// CASE: The Curtain and the Cross
// CASE ID: crucifixion_site
// SOURCE: js/act3_case.js -> NPC 'centurion_longinus'
// BIBLE REFERENCE: Matthew 27:35-37, 45-54; Mark 15:24-39;
//   Luke 23:44-46; John 19:23-24, 28-30, 34-37
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Psalm 22:18 — "They cast lots for my clothing"
//   - Psalm 34:20 — "He keeps all his bones"
//   - Zechariah 12:10 — "They will look upon the one they pierced"
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_torn_tunic (seamless robe, Psalm 22:18)
//   - evidence_water_and_blood (John 19:34, Zechariah 12:10)
//   - evidence_darkness_and_earthquake (cosmic signs)
//   - evidence_centurion_confession (first Gentile confession)
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Centurion Claudius Longinus recounts the execution
//   that defied every expectation of a professional soldier —
//   soldiers casting lots for the seamless tunic, the unexpected
//   flow of blood and water, the cosmic darkness, and his own
//   confession: "Truly this was the Son of God."
// ============================================================

-> start

=== start ===
I am Claudius Longinus, centurion of the Antonia Fortress. I have overseen more executions than I can count — crucifixions for rebels, bandits, and slaves who dreamed beyond their station. That morning, I processed three prisoners for the hill. Two I forgot by afternoon. The third — He changed everything about how I understand the world I serve in.
* [Tell me about the soldiers casting lots.] -> dice
* [What happened when you pierced his side?] -> spear
* [What about the sour wine on the hyssop stalk?] -> hyssop
* [What did you observe about his death?] -> cosmic_signs
* [What did you report to your superiors?] -> report

=== dice ===
Standard procedure for a valuable garment. A seamless tunic — woven in one piece, no seams to unravel — is a rare find. The quartermaster ordered us to divide His possessions among ourselves. We cast lots for it — four of us, kneeling in the dust beneath that cross.
# UNLOCK_EVIDENCE: evidence_torn_tunic
* [The psalm spoke of this.] -> psalm_dice
* [What did you think?] -> dice_thoughts
* [Conclude.] -> final_word

=== psalm_dice ===
Psalm 22. David wrote it a thousand years before that hill existed — "They cast lots for my clothing, for my clothing among them, they divided my garments." My grandfather had verses from that psalm memorized. We were reading it on the march. The centurions carried scrolls, not just swords. We knew the words, living them.
* [Scripture fulfilled in action.] -> scripture_action
* [The coincidence was uncanny.] -> uncanny_coincidence
* [Conclude.] -> final_word

=== scripture_action ===
Scripture fulfilled in action — yes, that is precisely what it was. The Gospel writers were not embellishing. They were reporting what happened, and what happened was that we fulfilled the psalm to the letter. Not by design — by divine orchestration before Caesar was born.
* [The divine author.] -> divine_author
* [The plan was written.] -> final_word
* [Conclude.] -> final_word

=== uncanny_coincidence ===
The coincidence was uncanny. But I have learned that coins with two heads are minted with intent. When we divided His garments, we were not choosing randomly. We were enacting a drama written before the foundation of the world.
* [The world was watching.] -> final_word
* [The temple veil tore.] -> final_word

=== divine_author ===
The divine author — I did not know His name at the time. Our sign read Latin: "IHS REX IUDaeorum." But even in my ignorance, I knew we were not the authors of what was happening. We were actors in a play whose script had been written before Caesar was born.
* [What was written?] -> what_was_written
* [The play ended differently.] -> final_word
* [Conclude.] -> final_word

=== what_was_written ===
What was written was this: the lamb led to slaughter, the sheep before the shearers. The lamb with no broken bones, the blood on the doorposts, the veil torn from top to bottom. A thousand details, all converging on this one hill.
* [The veil tore from top to bottom.] -> veil_detail
* [The temple shook.] -> final_word

=== veil_detail ===
The veil tore from top to bottom — indicating divine action from above. In all my years, I have seen curtains burn, banners fall, standards break. But never a veil that separates the earthly from the divine — torn by an invisible hand.
* [The access was opened.] -> access_opened
* [The glory departed.] -> glory_departed
* [Conclude.] -> final_word

=== access_opened ===
The access was opened — not by human hands, but by divine power. The temple veil, the most sacred barrier in Judaism, was rent. If the high priest tore it, it would be human action. From above — it was the finger of God.
* [The glory departed.] -> glory_departed
* [The way was made.] -> way_made
* [Conclude.] -> final_word

=== glory_departed ===
The glory departed — Isaiah spoke of it: "The glory of the LORD departs from the temple." The Shekhinah that had dwelt in the temple for a thousand years — gone. Not in defeat, but in triumph. The veil was rent; the glory was released.
* [The victory was won.] -> final_word
* [The way was made.] -> way_made
* [Conclude.] -> final_word

=== way_made ===
The way was made — through the torn veil, through the rent sanctuary curtain, through the broken body of the Lamb. Isaiah 53:5: "He was pierced for our transgressions... by his wounds we are healed." The way to the Father — opened.
* [The healing was complete.] -> final_word
* [The way stands.] -> way_stands
* [Conclude.] -> final_word

=== way_stands ===
The way stands open — for me, a Roman centurion, and for you, whoever reads this. No longer mediated by priest, veil, or sacrifice. The way is through the torn veil, through the empty tomb.
* [The testimony endures.] -> testimony_endures_final
* [The light shines.] -> final_word
* [Conclude.] -> final_word

=== testimony_endures_final ===
The testimony endures. The Gospel writers recorded it. The historians confirmed it. The archaeology uncovered it. And the centurion's confession echoed through the empire.
* [The confession stands.] -> confession_stands
* [The legacy remains.] -> final_word
* [Conclude.] -> final_word

=== confession_stands ===
The confession stands — "Truly this was the Son of God." Three words. And they did more: they announced that the divine had entered human history, that the sacred had touched the profane, that the Creator had been crucified by the creation.
# UNLOCK_EVIDENCE: evidence_centurion_confession
* [The empire would kneel.] -> empire_kneel
* [The confession echoes.] -> final_word
* [Conclude.] -> final_word

=== empire_kneel ===
The empire would kneel — not to Caesar, but to the crucified king. Within three hundred years, the eagle standard of Rome would bow to the cross standard of Christ. The centurion's confession would be quoted by emperors.
* [The eagle bowed.] -> final_word
* [The cross triumphed.] -> final_word

=== dice_thoughts ===
What did I think as I cast lots? I thought of my pay — a denarius, maybe two from the auction. I thought of my duty — I was following orders. And I thought of the prisoner, hanging there. But I also thought — this moment matters.
* [The moment mattered.] -> final_word
* [The memory lingers.] -> memory_lingers

=== memory_lingers ===
The memory lingers — thirty years later, when earthquakes still shake the eastern provinces, I still see that hill. When I am asked to certify a report about a crucified preacher, his name escapes me.
* [The name escapes.] -> final_word
* [The details remain.] -> final_word
* [Conclude.] -> final_word

=== spear ===
My spear — the one I use to dispatch stragglers. I pressed the blade into the side of the central prisoner — to confirm death before removing the body. The blade found blood and water. Dark red, arterial blood. Clear, bright water.
# UNLOCK_EVIDENCE: evidence_water_and_blood
* [The spear entered flesh.] -> spear_flesh2
* [What flowed out?] -> final_word
* [Conclude.] -> final_word

=== spear_flesh2 ===
The spear entered flesh — and found blood and water. In all my years of campaigning, I have seen bodies drained of blood, desiccated in the sun. I have never seen a corpse bleed and flow water. The texts say it happens, but I saw it myself.
* [The testimony was immediate.] -> testimony_immediate
* [The sign was undeniable.] -> final_word
* [Conclude.] -> final_word

=== testimony_immediate ===
The testimony was immediate — the soldiers around me saw it too. Some fell to their knees. Others crossed themselves. We had all seen death. We had never seen this.
* [The soldiers believed.] -> final_word
* [The sign was undeniable.] -> final_word

=== cosmic_signs ===
The cosmic signs began at noon — not at dawn, when the first guard change occurs, but at noon, when the sun stands at its zenith. Darkness fell. Not a cloud — a divine withdrawal.
# UNLOCK_EVIDENCE: evidence_darkness_and_earthquake
* [The darkness lasted how long?] -> darkness_duration
* [The temple veil tore.] -> final_word
* [Conclude.] -> final_word

=== darkness_duration ===
The darkness lasted three hours. The sun did not shine. The moon turned to blood. The stars fell from their courses. In that darkness, the centurions knew — this was no ordinary execution.
* [The creation groaned.] -> creation_groaned
* [The silence was absolute.] -> final_word
* [Conclude.] -> final_word

=== creation_groaned ===
The creation groaned — "the whole creation has been groaning." We felt it. The horses whinnied. The earth trembled. And in that trembling, we understood that the foundation of the world was not what we thought.
* [The earth trembled.] -> final_word
* [The foundation shook.] -> final_word

=== hyssop ===
He cried, "I thirst!" — and one of the soldiers lifted a sponge soaked in posca on a hyssop branch and placed it to His lips. The posca was standard issue. But the hyssop... that is the herb of the Passover.
* [The hyssop was significant.] -> hyssop_significant
* [The Passover connection.] -> final_word
* [Conclude.] -> final_word

=== hyssop_significant ===
The hyssop was significant — a Roman soldier offering wine on a Passover herb to a Jewish king. The irony was rich. We were the occupiers, the executioners, unwittingly re-enacting the night of the first Passover.
* [The first Passover.] -> first_passover
* [The lamb was bound.] -> final_word
* [Conclude.] -> final_word

=== first_passover ===
The first Passover — the night of deliverance, the night of judgment, the night the lamb's blood marked the doorposts. And here, on this hill, a Roman soldier offered wine on hyssop to a Jewish king who was about to become the Passover lamb.
* [The lamb was slain.] -> lamb_slain
* [The blood was applied.] -> final_word

=== lamb_slain ===
The lamb was slain — not in the temple, not by the high priest, not with the blood of bulls and goats. But on a Roman execution hill, by Roman hands, with Roman weapons. Yet it was the most Jewish moment of history.
* [The temple lamb.] -> final_word
* [The people's reaction.] -> final_word

=== report ===
I reported — and they wrote it down. The centurion's report became the historians' record. The testimony spread from the hill to the ends of the earth. "Truly this was the Son of God."
* [The testimony endures.] -> testimony_endures_second
* [The light shines.] -> final_word

=== testimony_endures_second ===
The testimony endures. The Gospel writers recorded it. The historians confirmed it. The archaeology uncovered it.
* [The confession stands.] -> final_word
* [The legacy remains.] -> legacy_remains_second

=== legacy_remains_second ===
The legacy remains — the confession, the testimony, the empty tomb. My spear found blood and water. My eyes saw darkness and light. My voice confessed what my training could not explain.
* [The testimony is complete.] -> testimony_complete_final_second
* [The dawn breaks.] -> final_word

=== testimony_complete_final_second ===
The testimony is complete. The witnesses have spoken. The tomb is empty. The earth has borne witness. The Scriptures have been fulfilled.
* [The final word.] -> final_word
* [The light endures.] -> final_word

=== final_word ===
The final word — and it is not mine. It is His: "It is finished." But finished does not mean ended. It means accomplished. The debt is paid. The testimony is true.
-> DONE
