// ============================================================
// CHARACTER: Roman Guard (Antonia Fortress)
// ACT: Act I
// CASE: The Overturned Tables (Temple Cleansing)
// CASE ID: case_b_overturned_tables
// CASE EXPORT: overturn_tables
// SOURCE: act1_case.js -> NPC 'guard_report_temple'
// BIBLE REFERENCE: Psalm 69:9 — "Zeal for your house will consume me"
// ------------------------------------------------------------
// CASE FACTS:
//   witness: roman_guard
//   observation: Saw Jesus enter the Court of Gentiles with
//   a whip of rushes, overturn tables, scatter coins, release
//   doves. No violence. No shouting. Just authority.
//   significance: Demonstrates Jesus' messianic authority and
//   the religious leaders' rejection of Him.
// ============================================================

-> start

=== start ===
# UNLOCK_EVIDENCE: whip_of_cords
I am on duty at the Antonia fortress. Three years on the wall walkways. I have seen riots, rebellions, crucifixions. But never anything like today. The Galilean — Jesus — walked into the Court of the Gentiles with a whip of rushes and turned the whole place upside down.

+ [What did you see?] -> saw_cleansing
+ [Why didn't Rome intervene?] -> no_intervention
+ [Did you recognize His authority?] -> authority_seen

=== saw_cleansing ===
Tables overturned. Coins flying. Doves scattering. Merchants running. The Galilean standing in the middle of it all, looking like He owned the place. He didn't strike anyone. Didn't yell. Just looked at them. And they ran. Like sheep before a shepherd.

+ [He quoted Scripture.] -> scripture_zeal
+ [The crowd surged after Him.] -> crowd_surge
+ [It was not a threat to Rome.] -> not_roman_threat

=== no_intervention ===
Intervene? Orders were clear: engage only on full-scale rebellion. Flipped tables don't count. Scattered coins don't count. The Romans don't die for Jewish commerce. This was not a threat to Roman order — it was the priests' problem to handle.

+ [The priests complained to Pilate.] -> priests_complain
+ [Pilate saw through it.] -> pilate_saw

=== authority_seen ===
He had authority — not the kind of legions or procurators. Something deeper, older. The kind that makes men obey without thinking. The kind that makes crowds follow without question. From the parapet, it was unsettling.

+ [It was divine authority.] -> divine_power
+ [It frightened you.] -> feeling_fear

=== scripture_zeal ===
He was quoting Scripture — Psalm 69: "Zeal for your house will consume me." His disciples shouted it afterward. They say it proves He is the Messiah. But from where I stood, it looked like a man with a whip and a grievance. A dangerous combination in this city.

+ [The priests feared this zeal.] -> priestly_fear
+ [You recognized something different.] -> not_zealot

=== crowd_surge ===
Followed Him? They surged like a tide. One minute buying doves and changing money. The next chasing after this Galilean like He was the emperor returning to Rome. I have never seen anything like it. Not even at the Passover pilgrimages.

+ [He had that kind of authority.] -> authority_recognized
+ [The movement was growing.] -> movement_grows

=== not_roman_threat ===
Dangerous to the Temple, yes. To the priests, definitely. To Rome? No. A man who cleanses a market is not a military threat. A man who quotes Psalms is not a revolutionary. He is a prophet. And prophets are dangerous — but not to the empire.

+ [Pilate will yield to pressure.] -> crucifixion_path
+ [The net is tightening.] -> net_closes

=== priests_complain ===
Furious. They went straight to Pilate, demanding action, calling it insurrection. But when Pilate asked for bodies — the wounded, the dead — they had nothing. No Roman casualties. No property damage to Rome. Just their precious temple tax scattered in the dirt. Pilate sent them packing.

+ [Continue.] -> crucifixion_path

=== pilate_saw ===
Pilate saw through it immediately. A Roman governor deals in facts, evidence, Roman law. The priests came with accusations of insurrection. He asked for bodies. They had nothing. He called it a religious dispute and told them to sort it themselves. For now.

+ [Continue.] -> crucifixion_path

=== divine_power ===
Divine authority? I don't believe in your gods. But I know power when I see it. Not the power of a legion. Not the power of a procurator. Something older, stronger. Authority that makes men obey without weapons. Without threats. Without fear.

+ [Continue.] -> faith_begins

=== feeling_fear ===
Frightened? I haven't been frightened since recruit training. But that man — He looked at the crowd like He owned them. Like He created them. And they followed Him. Not out of fear. Out of love. Out of devotion. It frightened me. Because I knew I was in the presence of something real.

+ [Continue.] -> faith_begins

=== priestly_fear ===
The priests fear everything. They fear the Romans. They fear the crowds. They fear the prophets. They fear losing their power. This Galilean threatens all of it — His zeal, His authority, His following. They will stop at nothing to destroy Him.

+ [Continue.] -> crucifixion_path

=== not_zealot ===
Zealots kill. Zealots burn. Zealots start wars. This man broke cages and scattered coins. He didn't hurt anyone. That's not zeal. That's something else. Something I can't name. Something that made the bravest centurion in the legion pause.

+ [You felt a spiritual presence.] -> faith_begins
+ [You recognized a prophet.] -> prophet_recognized

=== authority_recognized ===
That kind of authority — it doesn't come from position or power. It comes from somewhere else. From truth. From conviction. From something deeper than Rome's finest steel. Even from the parapet, I could feel it shifting the crowd's allegiance.

+ [You saw it transform people.] -> faith_begins
+ [That is prophetic authority.] -> prophet_recognized

=== movement_grows ===
The movement was growing. The crowd surged. But Jesus didn't call for an army. Didn't call for revolt. Just walked out of the Temple courts with a whip of rushes and a following. A following that grows, not by conquest but by conviction.

+ [This cannot stop the priests.] -> crucifixion_path
+ [You are witnessing something greater.] -> faith_begins

=== crucifixion_path ===
The net was tightening. The circle was closing. Three powerful forces converged: the priests wanted blood, Pilate wanted peace, the crowd wanted spectacle. And Jesus — Jesus walked into it knowingly. He knew what was coming. And He went anyway.

+ [Continue.] -> crucifixion_witnessed

=== net_closes ===
The net closes. The circle tightens. And the Teacher — He walks into it knowingly. He knows what they will do. And He goes anyway. Not because He is defeated. But because He has counted the cost. And the cost is worth paying. For all of us.

+ [You could not stop it.] -> crucifixion_witnessed
+ [You understood the sacrifice.] -> faith_begins

=== faith_begins ===
What I saw in the Temple courts that day — it changed me. Not immediately. Not completely. But enough to know that this was not just another execution. The peace in the chaos. The authority in the silence. The love in the violence. Something was happening there that transcended Roman understanding.

+ [The resurrection will change everything.] -> resurrection_hope
+ [Finish the interview.] -> closing_guard

=== prophet_recognized ===
Prophet? From a Roman guard's perspective, maybe. But not an ordinary one. He looked at the crowd like He owned them. And they followed Him. Not out of fear. Out of love. Something deeper than military discipline. Something I cannot name but I will never forget.

+ [You saw divine presence.] -> faith_begins
+ [Finish the interview.] -> closing_guard

=== resurrection_hope ===
Three days later, the stone was rolled away. The guards at the tomb said the earth shook. An angel spoke. The centurion at the cross — his last words were "Truly this was the Son of God." And I — I saw the peace that passed all understanding. That peace did not die with Him in the tomb.

+ [Finish the interview.] -> closing_guard

=== crucifixion_witnessed ===
On the hill outside the city walls, I watched them nail Him to the cross. The peace from the Temple courts was gone. The screams of the crowd replaced the murmurs of amazement. The soldiers gambled for His clothes. The religious leaders stood there, satisfied. But one thing was different — even as He died, people were drawn to Him. Even in death, He had authority.

+ [Continue.] -> faith_begins

=== closing_guard ===
I was on the wall. I saw the whole thing. The whip. The coins. The doves. The crowd. The peace. And I know — I know that man is who they say He is. The Son of God. The Savior. The Lamb. And I watched Him die. I couldn't stop it. But I can tell the story. I can be a witness. For the rest of my life. Until He comes again.

-> DONE
