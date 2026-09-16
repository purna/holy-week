// ============================================================
// CHARACTER: Joseph ben Caiaphas (High Priest)
// ACT: Act III
// CASE: The Midnight Tribunal
// CASE ID: sanhedrin_trial
// SOURCE: js/act3_case.js -> NPC 'caiaphas_priest'
// BIBLE REFERENCE: Matthew 26:57-68; Mark 14:53-65; Luke 22:66-71;
//   John 18:19-24
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Daniel 7:13-14 — Son of Man coming on clouds
//   - Isaiah 53:7 — Silent lamb before shearers
//   - Psalm 110:1 — The LORD says to my Lord
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_self_declaration (Son of Man on clouds)
//   - evidence_blasphemy_charge (Sanhedrin verdict sealed)
//   - evidence_daniel_vision (Daniel 7:13-14 fulfilled)
//   - evidence_silence_under_pressure (Isaiah 53:7 pattern)
//   - evidence_illegal_proceedings (midnight trial violation)
//   - evidence_sanhedrin_verdict (blasphemy verdict recorded)
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: High Priest Joseph ben Caiaphas convened the Sanhedrin
//   at midnight -- violating Mosaic procedural law -- to interrogate
//   Jesus. Using the formal adjuration, Caiaphas forced Jesus to
//   declare Himself the Son of Man from Daniel 7, triggering the
//   blasphemy charge that legally condemned Him to death.
//   Significance: The Sanhedrin's political urgency and illegal
//   proceedings sealed Jesus's fate while fulfilling Scripture.
// ============================================================

-> start

=== start ===
# UNLOCK_EVIDENCE: evidence_illegal_proceedings
# UNLOCK_EVIDENCE: evidence_silence_under_pressure
# UNLOCK_EVIDENCE: evidence_self_declaration
# UNLOCK_EVIDENCE: evidence_daniel_vision
# UNLOCK_EVIDENCE: evidence_blasphemy_charge
# UNLOCK_EVIDENCE: evidence_sanhedrin_verdict
I am Joseph ben Caiaphas. High Priest since the eighteenth year of Tiberius. In all my years studying Torah, in all my seasons judging disputes, I have never encountered the like of this Nazarene. The Sanhedrin convened at midnight -- not proper procedure under the Mosaic Code, but the hour demanded urgency. By dawn, the Passover crowds would stir, and we could not allow the temple courts to be filled with His voice.
+ [How did you begin questioning Him?] -> questioning
+ [What charges did you bring?] -> charges
+ [What did you know about trials at night?] -> illegal_trial
+ [Finish the interview.] -> closing
+ [Did they strike Him?] -> stuck

=== illegal_trial ===
The Mishnah is clear: capital cases must be heard in daylight, in the Hall of the Sanhedrin, on weekdays, not on the eve of Passover. We violated every procedural safeguard the scribes had established over centuries. But what choice did we have? The people were beginning to believe.
+ [You knew it was illegal.] -> knew_illegal
+ [The urgency was real.] -> urgency_real
+ [Finish the interview.] -> closing

=== knew_illegal ===
I knew it was illegal. The Great Sanhedrin -- seventy-one judges representing Israel -- cannot convene at night for capital cases. The Talmud teaches that such trials are invalid and must be repeated. But I had calculated -- the shorter the delay, the greater the chance of controlling the outcome.
+ [The calculation was political.] -> calculation_political
+ [Finish the interview.] -> closing

=== calculation_political ===
The calculation was political. Every day we delayed gave the teachers of the law more time to spread the story of Lazarus -- the man who had been dead four days and now walked alive. If the crowds in Bethany reached Jerusalem before we acted, the entire city would erupt.
+ [Finish the interview.] -> closing

=== urgency_real ===
The urgency was real -- and I must confess, it came from me. I had been thinking. Not about Torah. Not about law. About my own position, my own survival. The Roman eagle over Jerusalem's walls, the tax collectors' ledgers filling with the Temple's wealth. If this man's influence grew, the Sanhedrin's authority would be swept away.
+ [The political calculation.] -> political_calc
+ [Finish the interview.] -> closing

=== political_calc ===
The political calculation was unavoidable. The Roman administration tolerated Jewish religious customs but not political rivals. Jesus disciples spoke of His kingdom -- a word the Romans understood as "republic." A king was a threat to Caesar's peace.
+ [The Roman response.] -> roman_response
+ [Finish the interview.] -> closing

=== roman_response ===
The Roman response would be swift. Pilate had no love for Jewish theological debates. But political charges would stick. King of the Jews. Rival to Caesar. Tax refusal. These were the stones that would break the silence.
+ [To Pilate with Him.] -> next_steps
+ [The Temple charge.] -> temple_charge
+ [Finish the interview.] -> closing

=== temple_charge ===
The Temple charge was the most useful fiction -- "Destroy this temple, and in three days I will raise it up." Twisted from John's Gospel, from the temple of His body. But the people would hear "Temple" and think stones. The Romans would hear "destruction" and think rebellion.
+ [The twisting began.] -> twisting_begin
+ [Finish the interview.] -> closing

=== twisting_begin ===
The twisting began immediately. The false witnesses tried to frame His words about the Temple's destruction as treason. But they could not agree on the specifics. One claimed He said it about Herod temple. Another about His own body. Their contradiction undermined their case.
+ [The contradictions mattered.] -> contradictions
+ [Finish the interview.] -> closing

=== contradictions ===
In a capital case, testimony must be consistent. The Mishnah records: a single false witness invalidates the entire proceeding. When Jesus refused to answer and simply gazed at the high priest, the false witnesses knew their testimony was void.
+ [Finish the interview.] -> closing

=== questioning ===
I began as the Law prescribes. The Mishnah teaches that a capital case begins with a solemn adjuration. "By the holy name of the living God," I said, "I adjure you to tell us whether you are the Christ, the Son of God." The oil lamps flickered, and the room fell utterly still. No false witness had appeared at dawn that day -- they contradicted each other on the third hour.
+ [What did He say to that?] -> jesus_speaks
+ [Why the formal adjuration?] -> formal_adjure
+ [The witnesses had failed.] -> witness_failure

=== witness_failure ===
The witnesses had failed. Two men stepped forward and said the same thing -- "We heard Him say, 'I will destroy this temple made with hands, and in three days I will build another without hands.' But they contradicted each other on the details. Their testimony was invalid under Deuteronomy 19.
+ [The silence was strategic.] -> strategic_silence
+ [Finish the interview.] -> closing

=== strategic_silence ===
The silence was strategic -- not cowardice, not confusion, but the deliberate choice of the suffering servant. Isaiah had described it centuries before: "He was oppressed, and He also was afflicted; He opened not His mouth." Before the shearers, the lamb.
+ [You pressed for an answer.] -> press_answer
+ [Finish the interview.] -> closing

=== press_answer ===
I pressed -- as a high priest must. The Law demands a response when God's name is invoked in adjuration. No Israelite can hear "I adjure you by the living God" and remain silent. The adjuration carries the weight of heaven itself.
+ [He looked directly at you.] -> direct_gaze
+ [Finish the interview.] -> closing

=== direct_gaze ===
He looked directly at me -- not at my accusers, not at the false witnesses, but at me, the high priest of Israel. And in that gaze, I saw recognition of something written long before either of us was born. He spoke, and the words rang out like temple bells:
+ [The declaration.] -> jesus_speaks
+ [Finish the interview.] -> closing

=== jesus_speaks ===
"You have said so," He said. "But I tell you -- in the presence of God I declare to you: From now on you will see the Son of Man seated at the right hand of Power and coming on the clouds of heaven." Psalm 110. Daniel 7. All of it converging on this courtroom.
+ [Finish the interview.] -> closing
+ [The Daniel vision was named.] -> daniel_vision_named
+ [How did you react?] -> reaction

=== daniel_vision_named ===
The Son of Man -- Daniel's vision from the seventh century before Christ. "One like a son of man... was given dominion and glory and a kingdom." I had studied those words in the academies, taught on those verses in the synagogue. And now -- a man from Nazareth was speaking them as His own.
+ [The vision was specific.] -> vision_specific
+ [Finish the interview.] -> closing

=== vision_specific ===
The vision was specific -- not vague imagery, but the precise language of Daniel: "coming on the clouds of heaven" with "clouds" as the very phrase identifying the divine. No human can make that claim without crossing the final boundary.
+ [Finish the interview.] -> closing
+ [The verdict was sealed.] -> verdict_sealed

=== verdict_sealed ===
The verdict was sealed in that moment. Blasphemy -- the most sacred of charges. Under the Mosaic Code, the high priest could not show mercy. The court had been convened, the Law had been invoked, and the verdict was unavoidable.
+ [Then to Pilate.] -> next_steps
+ [Finish the interview.] -> closing
+ [The Sanhedrin's decision.] -> sanhedrin_decision

=== sanhedrin_decision ===
The Sanhedrin -- seventy-one judges -- was divided. Some argued for leniency. Others for immediate delivery to Rome. The vote was close -- forty-three to twenty-eight -- until the self-declaration sealed it. Blasphemy under the Mosaic Code was a capital offense.
+ [The vote reflected division.] -> vote_division
+ [The urgency was real.] -> urgency_real

=== vote_division ===
The vote reflected division. Some argued He was a prophet, others a deceiver. Some saw the miracles, others saw manipulation. Caiaphas himself had spoken earlier that week -- at the council meeting where Nicodemus had pressed for dialogue. We had argued for a sign. Jesus refused.
+ [Finish the interview.] -> closing

=== reaction ===
The room divided. Some priests tried to speak after Him -- they struck Him with the palm of the hand. One demanded He name the specific time of His return. Another asked if He thought Himself greater than Abraham or the prophets. But His statement had already done what a hundred witnesses could not.
+ [The verdict was sealed.] -> verdict_sealed
+ [They struck Him.] -> stuck
+ [Finish the interview.] -> closing

=== stuck ===
They struck Him. Slapped Him. Said, "Who is it that struck You?" Each blow was an attempt to silence the voice that spoke of clouds and power and judgment. Each blow was a failure.
+ [The strikes could not unname Him.] -> strikes_unname
+ [Finish the interview.] -> closing

=== strikes_unname ===
The strikes could not unname Him. If anything, the more they struck, the more certain the words became. The high priest tore His robes. The soldiers struck His face. The crowd mocked. And the Son of Man was named in the council chamber.
+ [The tearing of robes.] -> robe_tearing
+ [Finish the interview.] -> closing

=== robe_tearing ===
The tearing of robes -- kriah -- the high priest's acknowledgment of blasphemy. In the Talmud, they discuss this moment: "When the high priest tore his garments, the Shekhinah departed from the Temple." The tearing was not just acknowledgment. It was farewell.
+ [The Shekhinah's departure.] -> shekhinah_departure
+ [Finish the interview.] -> closing

=== shekhinah_departure ===
The Shekhinah departed -- Isaiah spoke of it: "The glory of the LORD departs from the temple." The sanctity that had dwelt for a thousand years was gone. Not in defeat, but in triumph. The veil was rent; the glory was released.
+ [Finish the interview.] -> closing

=== next_steps ===
From the council chamber to the praetorium. I carried the sentence of death folded inside the charge of insurrection. The guards took Him away. By dawn, the city would need to choose between Caesar prisoner and the Galilean prophet.
+ [The choice was made.] -> choice_made
+ [Finish the interview.] -> closing

=== choice_made ===
The choice was made -- Barabbas or the Lamb. The murderer or the Messiah. The crowd, whipped into a frenzy by the priests, chose the murderer. Pilate, finding no fault in Him, offered to release Jesus -- but they shouted, "Crucify Him!"
+ [Pilate's dilemma.] -> pilates_dilemma
+ [Finish the interview.] -> closing

=== pilates_dilemma ===
Pilate's dilemma -- and mine. We had done what we believed was necessary. The Sanhedrin's verdict was sealed in blood, recorded in the official register. "Jesus of Nazareth, King of the Jews," was the charge. Yet something about the proceedings haunted us both.
+ [Finish the interview.] -> closing

=== formal_adjure ===
The adjuration was not casual. "I adjure you by the living God" -- these are the words of a priest invoking the Shem HaMephorash, the ineffable name of God. No Israelite in their right mind could hear the divine name invoked and refuse to answer.
+ [And He answered.] -> jesus_speaks
+ [The divine name.] -> divine_name_invoked
+ [Finish the interview.] -> closing

=== divine_name_invoked ===
The divine name -- the Tetragrammaton, pronounced only once a year by the high priest on the Day of Atonement. To invoke it in a criminal proceeding was to bring the sanctity of the temple into the secular realm.
+ [The roles reversed.] -> roles_reverse
+ [Finish the interview.] -> closing

=== roles_reverse ===
The roles were reversed. I, the anointed high priest, was questioning the accused. And He, the accused, stood in the place of the divine judge. "You have said so" -- the Son of Man was naming Himself in the council chamber.
+ [The tearing of robes.] -> robe_tearing
+ [Finish the interview.] -> closing

=== charges ===
I brought the charge of blasphemy under the Mosaic Code -- the most sacred of all offenses. But the Sanhedrin's authority ended at the edge of the executioner's block. Rome reserves the sword. So I presented political charges as well.
+ [Political charges.] -> political
+ [Finish the interview.] -> closing

=== political ===
King of the Jews. A rival claimant to Caesar's peace. Tax refusal. Incitement to rebellion. These were the stones the Romans understood. The blasphemy charge -- the true offense -- was the weapon we could not publicly wield.
+ [Did He respond to the charges?] -> jesus_responds_to_political
+ [What did Pilate hear?] -> next_steps

=== jesus_responds_to_political ===
"My kingdom is not of this world." He answered the political charge with a kingdom that transcends all categories. "If my kingdom were of this world, my servants would fight." But He would not fight. He would not defend. He would not call down legions.
+ [The answer was cosmic.] -> cosmic_answer
+ [Finish the interview.] -> closing

=== cosmic_answer ===
The answer was cosmic -- a kingdom not of this world. He did not need to fight. The temple would fall. The city would burn. The people would disperse. And in exile, they would remember what He had said. "My kingdom is not of this world" -- and yet it would outlast Rome.
+ [Finish the interview.] -> closing

=== closing ===
I have recorded in the official register that Jesus of Nazareth claimed to be the Son of Man from Daniel's vision. Whether that record will outlast the Temple -- only the Son of Man knows. The Temple that stood here for four centuries fell to the armies of Rome in the end. But the record remains. The Word remains. The testimony remains.
-> DONE
