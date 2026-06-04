# All Ink Dialogues — Consolidated Proof-Reading Copy

All `.ink` source files from `story/`, grouped by Act and Case.
Each file now includes a metadata comment header with:
- Character name and role
- Act and Case assignment
- Prophecies fulfilled / Biblical references
- Biblical context and historical notes
- Case facts from the Truth Object
- Witness reliability status

---


## Act I


### Case: The Missing Donkey


#### Character: Jemimah (Jerusalem Local)

**Source:** `story/jerusalem_local.ink`

```ink
// ============================================================
// CHARACTER: Jemimah (Jerusalem Local)
// ACT: Act I
// CASE: The Missing Donkey
// CASE EXPORT: triumphal_entry
// SOURCE: act1_case_2d.js → NPC 'local_skeptic'
// BIBLE REFERENCE: Matthew 21:10-11
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Zechariah 9:9
//     Gospel: Matthew 21:4–5; John 12:14–15
//     Insight: The donkey was not a practical choice — Roman rulers rode horses. The donkey was a deliberate symbol of peace and humility, contrasted with ...
//   - Psalm 118:25–26
//     Gospel: Matthew 21:9; Mark 11:9–10
//     Insight: 'Hosanna' is the Greek transliteration of the Hebrew 'Hoshana' — a cry for salvation, not merely praise. The crowd was quoting this Psalm as...
//   - Genesis 49:10–11
//     Gospel: Matthew 21:1–9
//     Insight: Jacob's blessing over Judah, over 1,400 years before the event, described a royal figure arriving on a donkey colt. Early Jewish readers int...
//   - Malachi 3:1
//     Gospel: Mark 11:11
//     Insight: The 'coming to the temple' link connects the triumphal entry with the Temple cleansing the following day — two acts that together announced ...
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: On Nisan 10 (Palm Sunday), Jesus sent two disciples ahead to Bethphage to collect a donkey colt that had never been ridden. This was no coincidence — it was the precise fulfilment of a 500-year-old prophecy from Zecharia...
//   Historicalnote: Bethphage was a small priestly village on the Mount of Olives, roughly 1km from Jerusalem. It sat on the boundary of Jerusalem's sacred precincts. Jesus's knowledge of where the donkey was — and the pre-arranged answer f...
//   Significance: The triumphal entry deliberately echoed how King Solomon entered Jerusalem for his coronation (1 Kings 1:33–35), riding on a donkey down the Mount of Olives. Every Jewish bystander would have understood the royal claim b...
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: none
//   motive: There was no crime. The donkey was lent willingly by a sympathetic owner who recognised the fulfilment of Zechariah 9:9. The disciples had been given authorised access by Jesus, who foreknew the entire situation.
//   method: Jesus gave His disciples precise instructions, including a pre-arranged phrase ('The Lord needs it') that would signal the owner to release the colt. The colt — which had never been ridden, meeting the Jewish requirement...
// ============================================================
//

-> start
=== start ===
The whole city is in an uproar because of these country pilgrims. They're tracking mud everywhere and throwing their clothes in the middle of the road!
* [Who do you think this Galilean is?] -> who_is_he
* [The crowds are very devoted.] -> crowd_reaction
=== who_is_he ===
Everyone is yelling "Hosanna" like the Romans aren't watching from the Antonia tower. This Galilean teacher — who does He think He is? David? Nothing good comes from Nazareth, I'll tell you that much.
* [You think this is dangerous?] -> danger_path
* [At least people have hope.] -> closing
=== crowd_reaction ===
People were hacking palm branches off the trees out toward Jericho and dragging them all the way up the path. It's a miracle someone wasn't blinded by them. And the cloaks — whose garments are those? Left right in the dirt!
* [That seems disrespectful.] -> closing
* [Maybe it's intentional.] -> who_is_he
=== danger_path ===
Look, I just want to buy my grain without a mob blocking the eastern valley gate. They're calling Him a prophet, but prophets don't usually ride into town with an unauthorised parade. The noise was deafening. If the crowd doesn't calm down, the Roman garrison will come down from the walls to quiet us themselves.
* [So the Pharisees do have reason to worry.] -> closing
=== closing ===
Go ask the pilgrims with the green hands. I have work to do. The Passover crowds always bring trouble — this year just seems worse than usual.
-> DONE
```


#### Character: Tobias (Galilean Pilgrim / Donkey Owner)

**Source:** `story/galilean_pilgrim.ink`

```ink
// ============================================================
// CHARACTER: Tobias (Galilean Pilgrim / Donkey Owner)
// ACT: Act I
// CASE: The Missing Donkey
// CASE EXPORT: triumphal_entry
// SOURCE: act1_case_2d.js → NPC 'owner'
// BIBLE REFERENCE: Mark 11:3–6 (unnamed owner)
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Zechariah 9:9
//     Gospel: Matthew 21:4–5; John 12:14–15
//     Insight: The donkey was not a practical choice — Roman rulers rode horses. The donkey was a deliberate symbol of peace and humility, contrasted with ...
//   - Psalm 118:25–26
//     Gospel: Matthew 21:9; Mark 11:9–10
//     Insight: 'Hosanna' is the Greek transliteration of the Hebrew 'Hoshana' — a cry for salvation, not merely praise. The crowd was quoting this Psalm as...
//   - Genesis 49:10–11
//     Gospel: Matthew 21:1–9
//     Insight: Jacob's blessing over Judah, over 1,400 years before the event, described a royal figure arriving on a donkey colt. Early Jewish readers int...
//   - Malachi 3:1
//     Gospel: Mark 11:11
//     Insight: The 'coming to the temple' link connects the triumphal entry with the Temple cleansing the following day — two acts that together announced ...
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: On Nisan 10 (Palm Sunday), Jesus sent two disciples ahead to Bethphage to collect a donkey colt that had never been ridden. This was no coincidence — it was the precise fulfilment of a 500-year-old prophecy from Zecharia...
//   Historicalnote: Bethphage was a small priestly village on the Mount of Olives, roughly 1km from Jerusalem. It sat on the boundary of Jerusalem's sacred precincts. Jesus's knowledge of where the donkey was — and the pre-arranged answer f...
//   Significance: The triumphal entry deliberately echoed how King Solomon entered Jerusalem for his coronation (1 Kings 1:33–35), riding on a donkey down the Mount of Olives. Every Jewish bystander would have understood the royal claim b...
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: none
//   motive: There was no crime. The donkey was lent willingly by a sympathetic owner who recognised the fulfilment of Zechariah 9:9. The disciples had been given authorised access by Jesus, who foreknew the entire situation.
//   method: Jesus gave His disciples precise instructions, including a pre-arranged phrase ('The Lord needs it') that would signal the owner to release the colt. The colt — which had never been ridden, meeting the Jewish requirement...
// ============================================================
//
```


### Case: The Overturned Tables


#### Character: Malachi (Money Changer)

**Source:** `story/money_changer.ink`

```ink
// ============================================================
// CHARACTER: Malachi (Money Changer)
// ACT: Act I
// CASE: The Overturned Tables
// CASE EXPORT: temple_cleansing
// SOURCE: act1_case_2d.js → NPC 'none'
// BACKGROUND: A licensed merchant operating under high-priestly authorization. His business scales on demanding steep transaction rates to exchange foreign pilgrim coins into Tyrian shekels.
// BIBLE REFERENCE: Mark 11:15
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Malachi 3:1
//     Gospel: Matthew 21:12
//     Insight: Malachi predicted the Messiah would come not as a political puppet for the temple establishment, but as a refining fire to purify it.
//   - Isaiah 56:7
//     Gospel: Mark 11:17
//     Insight: By converting the Court of the Gentiles into a noisy, crowded marketplace, the leaders made it impossible for non-Jewish seekers to worship.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: On Monday morning, Jesus entered the Temple courts and forcefully drove out those who were buying and selling. He overturned the tables of the moneychangers and the benches of those selling doves, declaring: "My house wi...
//   Historicalnote: The moneychangers exchanged common Roman and Greek coins for high-purity Tyrian shekels—the only currency accepted for the mandatory temple tax. The currency exchange rates and high costs of sacrificial animals created m...
//   Significance: By halting the commercial exploitation in the Court of the Gentiles, Jesus disrupted the high-priestly financial monopoly. More importantly, He acted out a prophetic sign of judgment against an institutional temple syste...
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: none
//   motive: There was no crime. Jesus acted within His rightful authority as the Son of God purifying His Father's house, executing a calculated prophetic sign.
//   method: Jesus entered the Court of the Gentiles, manufactured a symbolic whip out of local rushes, and cleared out the illegal and predatory commercial stands. The religious authorities were too paralyzed by His moral clarity an...
// ============================================================
//

-> start
=== start ===
Look at this mess! Ink spilled everywhere, ledgers torn, Tyrian shekels scattered into the filth! We operate under a legal lease signed by the high priest himself. Our weights are fair, our rates are posted! He calls this a den of thieves, but without us, no traveler could buy an unblemished sacrifice!
* [Why Tyrian coinage specifically?] -> tyrian
* [Where did the crowd go after the tables fell?] -> crowd
=== tyrian ===
The Law forbids images of foreign kings in the inner house. Tyrian silver is pure — it has no emperor's face on it. It is logistics, not greed!
* [The disciples were violent too?] -> closing
=== crowd ===
They scattered toward the outer gates, singing like madmen. The priests are inside meeting right now. This will not stand.
* [What happened to the animals?] -> closing
=== closing ===
The conversation is over. Go in peace.
-> DONE
```


#### Character: Marcus (Roman Garrison Guard)

**Source:** `story/guard_report.ink`

```ink
// ============================================================
// CHARACTER: Marcus (Roman Garrison Guard)
// ACT: Act I
// CASE: The Overturned Tables
// CASE EXPORT: temple_cleansing
// SOURCE: act1_case_2d.js → NPC 'garrison_guard'
// BACKGROUND: A working-class Roman auxiliary stationed on the high outer wall walkways. He views the regional theological squabbles with complete military detachment.
// BIBLE REFERENCE: Luke 19:47-48
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Malachi 3:1
//     Gospel: Matthew 21:12
//     Insight: Malachi predicted the Messiah would come not as a political puppet for the temple establishment, but as a refining fire to purify it.
//   - Isaiah 56:7
//     Gospel: Mark 11:17
//     Insight: By converting the Court of the Gentiles into a noisy, crowded marketplace, the leaders made it impossible for non-Jewish seekers to worship.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: On Monday morning, Jesus entered the Temple courts and forcefully drove out those who were buying and selling. He overturned the tables of the moneychangers and the benches of those selling doves, declaring: "My house wi...
//   Historicalnote: The moneychangers exchanged common Roman and Greek coins for high-purity Tyrian shekels—the only currency accepted for the mandatory temple tax. The currency exchange rates and high costs of sacrificial animals created m...
//   Significance: By halting the commercial exploitation in the Court of the Gentiles, Jesus disrupted the high-priestly financial monopoly. More importantly, He acted out a prophetic sign of judgment against an institutional temple syste...
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: none
//   motive: There was no crime. Jesus acted within His rightful authority as the Son of God purifying His Father's house, executing a calculated prophetic sign.
//   method: Jesus entered the Court of the Gentiles, manufactured a symbolic whip out of local rushes, and cleared out the illegal and predatory commercial stands. The religious authorities were too paralyzed by His moral clarity an...
// ============================================================
//

-> start
=== start ===
I was on duty. I will read this scene plainly and let you draw your own conclusions. Last Sabbath, outside the outer court — tables overturned, animals scattered, the crowd orange with excitement. He called it My Father's house. The merchants called it their living. I called it my afternoon.
* [What did the merchants do?] -> merchants
* [Did He hurt anyone?] -> violence
=== merchants ===
The money changers scattered first — Tyrian shekels rolling into the drainage cracks. Then the livestock dealers. Within minutes the court was cleared and the crowd was singing.
* [The crowd supported Him?] -> crowd_support
=== violence ===
No blade was drawn. No centurion was summoned. He simply stood there while the merchants fled. It was the most disciplined crowd-disruption I have ever witnessed.
* [That sounds rehearsed.] -> opening
=== crowd_support ===
The people were already agitated from the triumphal entry two days prior. This was not a random crowd — this was a movement with momentum.
* [And the priests?] -> priestly_response
=== priestly_response ===
The Temple authorities have been meeting emergency sessions since then. They are not meeting about the coinage. They are meeting about the man.
* [Show me your official dispatch.] -> closing
=== closing ===
I am on duty. I will stick to what I observed. The rest belongs to the archives and the Sanhedrin's emergency sessions.
-> DONE
```


## Act II


### Case: The Price of Life


#### Character: Annas the Patriarch

**Source:** `story/annas_patriarch.ink`

```ink
// ============================================================
// CHARACTER: Annas the Patriarch
// ACT: Act II
// CASE: The Price of Life
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js → NPC 'annas_patriarch'
// BACKGROUND: The elderly patriarch of the ruling Sadducean family. Though Rome formally deposed him years ago, he remains the true systemic power behind the high priesthood, controlling his sons and son-...
// BIBLE REFERENCE: John 18:13; Luke 3:2; Acts 4:6
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 25:8
//     Gospel: John 11:25
//     Insight: Lazarus’s revival was a tactical, localized preview of the ultimate cosmic victory over death that was about to occur on Easter morning.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Following the resurrection of Lazarus after four days in the tomb, a massive theological shift occurred in Jerusalem. Instead of celebrating, the chief priests and Pharisees called a council meeting, fearing Roman interv...
//   Historicalnote: The raising of Lazarus took place in Bethany, less than two miles from Jerusalem. Because it happened right before Passover, the city was filled with thousands of eyewitnesses and curious pilgrims trying to catch a glimp...
//   Significance: This case exposes the moral bankruptcy of the corrupt religious leadership. To protect their political positions, they were willing to murder a living monument to God's resurrection power.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: caiaphas
//   motive: The high priests feared that the massive public following caused by Lazarus's resurrection would spark a Roman military crackdown, destroying their temple and nation.
//   method: Caiaphas and his inner circle bypassed standard judicial procedures to authorize a shadow assassination plot against Lazarus of Bethany, aiming to eliminate the physical evidence of Jesus's greatest miracle before the Pa...
// ============================================================
//

-> start
=== start ===
Governments are not built on passion, young man. They are built on stone and historical continuity. I have watched procurators come and go. They all think they command Judea, but the temple remains. This Galilean speaks well, but he does not recognize that systems outlive prophets.
* [Why was Jesus brought in at midnight?] -> midnight
* [Do you fear His popularity?] -> popularity
=== midnight ===
Daylight belongs to the crowds, and crowds are easily confused by noise. Silence allows for careful administrative evaluation. Certain matters require discretion — particularly when a man's following threatens both religious and civil order simultaneously.
* [What did the council decide?] -> decree_reveal
=== popularity ===
A crowd that shouts "Hosanna" on Sunday will shout something entirely different by Friday if the narrative shifts. Popularity is water — it finds the lowest level and erodes everything it touches. The Galilean must be stopped before Passover ends.
* [So there is a plan against Him.] -> decree_reveal
=== decree_reveal ===
The council is reviewing its options. When a man can raise the dead and the people respond by abandoning the Temple, we have a structural problem that requires structural solutions. The Sanhedrin does not act hastily.
* [But Lazarus is alive — you can't undo that.] -> exposed
=== exposed ===
You think a dynamic miracle justifies civic chaos? If a man is raised from the dead but his existence sparks a war that levels Jerusalem, his life is an unacceptable expense. The security of the temple requires the eradication of the asset.
* [You're planning to kill Lazarus.] -> closing
=== closing ===
Our conversation has reached its logical conclusion. Guard, show this investigator out.
-> DONE
```


#### Character: Market Vendor

**Source:** `story/market_rumors.ink`

```ink
// ============================================================
// CHARACTER: Market Vendor
// ACT: Act II
// CASE: The Lazarus Conspiracy
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js → NPC 'market_rumors'
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
Good day! The market moves faster than news. People are saying strange things. What draws you to my stall?
* [I'm looking for information about the Galilean.] -> galilean_rumors
* [Have you seen any unusual activity in the courts?] -> court_rumors
=== galilean_rumors ===
People are saying He healed a blind man at Bethesda. Others say He raised someone from the dead in Bethany. The Pharisees are trying to keep it quiet, but you can't stop a story like that from spreading.
* [What are the priests saying?] -> priest_response
=== court_rumors ===
The Temple courts have been a whirlwind for three days running. Questions, answers, more questions — and the Galilean keeps trapping them with His words.
* [Tell me about the questions.] -> priest_response
=== priest_response ===
The chief priests and Pharisees met in emergency session after Lazarus. They're planning something. I don't know what, but when the Sanhedrin starts meeting before dawn, it's never good for anyone.
* [Have you seen anything suspicious?] -> closing
=== closing ===
Keep your eyes open. The coin-changers' guild has informants everywhere — and three days ago I saw one of them slipping into the High Priest's courtyard with a leather pouch full of silver.
-> DONE
```


#### Character: Martha of Bethany

**Source:** `story/martha_bethany.ink`

```ink
// ============================================================
// CHARACTER: Martha of Bethany
// ACT: Act II
// CASE: The Price of Life
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js → NPC 'martha_bethany'
// BACKGROUND: The practical, protective head of the Bethany household. Having witnessed her brother's descent into death and subsequent revival, she is now trapped in a terrifying surveillance grid, manag...
// BIBLE REFERENCE: John 11:1–44; John 12:1–2
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 25:8
//     Gospel: John 11:25
//     Insight: Lazarus’s revival was a tactical, localized preview of the ultimate cosmic victory over death that was about to occur on Easter morning.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Following the resurrection of Lazarus after four days in the tomb, a massive theological shift occurred in Jerusalem. Instead of celebrating, the chief priests and Pharisees called a council meeting, fearing Roman interv...
//   Historicalnote: The raising of Lazarus took place in Bethany, less than two miles from Jerusalem. Because it happened right before Passover, the city was filled with thousands of eyewitnesses and curious pilgrims trying to catch a glimp...
//   Significance: This case exposes the moral bankruptcy of the corrupt religious leadership. To protect their political positions, they were willing to murder a living monument to God's resurrection power.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: caiaphas
//   motive: The high priests feared that the massive public following caused by Lazarus's resurrection would spark a Roman military crackdown, destroying their temple and nation.
//   method: Caiaphas and his inner circle bypassed standard judicial procedures to authorize a shadow assassination plot against Lazarus of Bethany, aiming to eliminate the physical evidence of Jesus's greatest miracle before the Pa...
// ============================================================
//

-> start
=== start ===
There are thirteen extra mouths to feed tonight, and the road to Jerusalem is monitored by patrols. Mary sits at His feet listening, but someone must handle the bread, the water, and the structural security of this house. We are hiding people who have prices on their heads.
* [Your brother is alive.] -> lazarus
* [How is Mary handling all this?] -> mary
=== lazarus ===
He is the proof they want to destroy. A man who was dead four days walking around is a living problem for the Sadducees. We keep him out of sight. The authorities have already been asking questions in Bethany.
* [What questions?] -> danger
=== mary ===
Mary has always been the listener. She sits at the feet of teachers while Martha handles the serving. Tonight, I understand her. He is speaking words that will outlast the hills outside this window.
* [But you are afraid?] -> lazarus
=== danger ===
They want him silenced. They cannot deny the miracle — Lazarus himself has been in the Temple courts three times now. So they are looking for a way to make him disappear permanently.
* [Can you protect him?] -> closing
=== closing ===
We have dried grain and oil for three days. The authorities are closing in. If I am speaking to you, it is because I believe someone outside this house needs to know what is happening in Bethany.
-> DONE
```


#### Character: Rumor Whisperer

**Source:** `story/rumor_whisper.ink`

```ink
// ============================================================
// CHARACTER: Rumor Whisperer
// ACT: Act II
// CASE: The Lazarus Conspiracy
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js → NPC 'rumor_whisper'
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
(A nervous citizen glances sideways before leaning close.) Last Sabbath a man blind from birth walked out of the Pool of Bethesda and now says he sees. The Pharisees asked for details. He said, "I was blind. Now I can see." I will not say my name, but you should find him and ask.
* [Why are you telling me this?] -> nervous_tell
* [The Pharisees didn't believe him?] -> pharisee_response
=== nervous_tell ===
Because what happened at that pool was not natural. The man had been blind since birth — the disciples themselves had asked Jesus about him once. Now he's seeing. The Pharisees want the story buried.
* [What did they do?] -> pharisee_response
=== pharisee_response ===
They questioned him closely. Not about the healing — about the voice. They wanted to know who spoke to him. He said "the man they call Jesus." They didn't like that answer.
* [And then?] -> closing
=== closing ===
The conversation is over. Go in peace.
-> DONE
```


#### Character: Teaching on the Mount

**Source:** `story/teaching_mount.ink`

```ink
// ============================================================
// CHARACTER: Teaching on the Mount
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
You walked up Mount Olivet. Most people approach Jerusalem and see only walls. He spoke in parables. People laughed, left, or argued. Then He asked the question.
* [What question?] -> question
* [The crowd's reaction?] -> crowd_reaction
=== question ===
He asked about the stone the builders rejected. The stone that becomes the cornerstone. The crowd was silent after that. Some looked confused. Some looked... afraid.
* [Afraid of what?] -> closing
=== crowd_reaction ===
People laughed, then left, or argued. The parables were not comfortable. They were mirrors. Each person saw themselves — and didn't always like what they saw.
* [And then?] -> closing
=== closing ===
He spoke as someone who owned the Law, not merely interpreted it. That was the most unsettling thing of all.
-> DONE
```


#### Character: Trial Rumors

**Source:** `story/trial_rumors.ink`

```ink
// ============================================================
// CHARACTER: Trial Rumors
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
The council chamber was closed to many of us tonight. Whatever decisions were made inside, they were final.
* [What happened after the arrest?] -> after_arrest
* [Do you know who testified?] -> witnesses
=== after_arrest ===
After the Galilean was led away, the council rushed into emergency session. The doors were barred. The few of us still outside could hear raised voices — not debate, but something closer to panic dressed as procedure.
* [Panic?] -> witnesses
=== witnesses ===
The ones who testified were not surprise witnesses. The arrest had been planned for days — the witnesses were assembled before the kiss in the garden.
* [Legal witnesses are required.] -> exposed
=== exposed ===
The Law requires two or three witnesses. They had them ready. The conviction was pre-arranged. The sentence was decided before the accused entered the chamber.
* [So the trial was a formality.] -> closing
=== closing ===
The council chamber was closed to many of us tonight. Whatever decisions were made inside, they were final.
-> DONE
```


#### Character: Witness to Healing

**Source:** `story/witness_healed.ink`

```ink
// ============================================================
// CHARACTER: Witness to Healing
// ACT: Act II
// CASE: The Lazarus Conspiracy
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js → NPC 'witness_healed'
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
The man who was healed — he was brought to the priests immediately. The elders questioned him closely. Not about the healing, but about the voice.
* [What did the elders do?] -> elders
* [What did he tell you?] -> testimony
=== elders ===
They wanted to know who had healed him. When he said "Jesus of Nazareth," some of them began to question whether such a thing was possible on the Sabbath.
* [Were they angry?] -> testimony
=== testimony ===
He told them the plain truth: he had never seen, but now he sees. That was enough to make the Pharisees call a council meeting.
* [Go on.] -> closing
=== closing ===
The conversation is over. Go in peace.
-> DONE
```


### Case: The Silenced Teacher


#### Character: Maluch (Temple Spy)

**Source:** `story/temple_spy.ink`

```ink
// ============================================================
// CHARACTER: Maluch (Temple Spy)
// ACT: Act II
// CASE: The Price of Life
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js → NPC 'temple_spy'
// BACKGROUND: An administrative operative and courier under the payroll of the high priest's household, tasked with logging suspicious crowd densities, tracking routes, and profiling revolutionary movemen...
// BIBLE REFERENCE: John 18:10; Luke 22:52
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 25:8
//     Gospel: John 11:25
//     Insight: Lazarus’s revival was a tactical, localized preview of the ultimate cosmic victory over death that was about to occur on Easter morning.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Following the resurrection of Lazarus after four days in the tomb, a massive theological shift occurred in Jerusalem. Instead of celebrating, the chief priests and Pharisees called a council meeting, fearing Roman interv...
//   Historicalnote: The raising of Lazarus took place in Bethany, less than two miles from Jerusalem. Because it happened right before Passover, the city was filled with thousands of eyewitnesses and curious pilgrims trying to catch a glimp...
//   Significance: This case exposes the moral bankruptcy of the corrupt religious leadership. To protect their political positions, they were willing to murder a living monument to God's resurrection power.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: caiaphas
//   motive: The high priests feared that the massive public following caused by Lazarus's resurrection would spark a Roman military crackdown, destroying their temple and nation.
//   method: Caiaphas and his inner circle bypassed standard judicial procedures to authorize a shadow assassination plot against Lazarus of Bethany, aiming to eliminate the physical evidence of Jesus's greatest miracle before the Pa...
// ============================================================
//

-> start
=== start ===
Keep moving, scribe. Do not look at me directly. I am cataloguing the faces near the treasury gates.
* [What are you cataloguing?] -> catalogue
* [For whom do you work?] -> employer
=== catalogue ===
The faces of the men who came to hear the Galilean today. The chief priests, the scribes, the Pharisees — they all came with questions. He answered every one.
* [And the answers?] -> employer
=== employer ===
The High Priest's household employs many watchers. I watch the Temple because the Temple is where power assembles. And power, when challenged, remembers.
* [You heard the teachings?] -> closing
=== closing ===
Say nothing. The treasury walls have ears. The Galilean's words are being weighed, and the scales do not favour Him.
-> DONE
```


#### Character: Nathanael (Pharisee)

**Source:** `story/pharisee_critique.ink`

```ink
// ============================================================
// CHARACTER: Nathanael (Pharisee)
// ACT: Act II
// CASE: The Silenced Teacher
// CASE ID: authority_challenged
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am Simon the Pharisee. I return from the synagogue and for some this town calls it conversation. For those who respect the Law, this matter is not as straightforward as the crowds claim. A man heals on the Sabbath and claims authority over the Law. Torah asks the question. The crowd needs an answer.
* [He healed a man born blind — on the Sabbath.] -> healing
* [The crowd follows Him like a king.] -> popularity
=== healing ===
The evidence is troubling. A man blind from birth — that is a condition no one disputes — begins to see on the Sabbath. The Pharisees questioned him for hours. His answer was simple: "I was blind. Now I can see." The council couldn't refute it.
* [So the miracle is real?] -> law_challenge
=== popularity ===
The crowds are laying cloaks on the road. People are calling Him king. But a king who rides on a donkey colt? A king who refuses to call down legions? The crowd wants a liberator. He seems to be offering something far more disruptive — truth itself.
* [That threatens your system.] -> law_challenge
=== law_challenge ===
He quoted Daniel 7:13 — the Son of Man coming with the clouds of heaven. He claimed that title openly. In our Law, that is a claim to divine authority. The Sadducees fear it. The Pharisees debate it. I cannot deny the case He is building.
* [And the Sabbath healings continue?] -> exposed
=== exposed ===
I asked Him about the greatest commandment — truly asked. I wanted to trap Him. Instead He answered with a simplicity that shattered my categories. "Love God with all your heart, soul, mind, and strength, and your neighbour as yourself. On these two commands hang all the Law and the Prophets."
* [That stopped you.] -> closing
=== closing ===
You are not far from the kingdom of God. Those were His words to me. I have thought about nothing else since.
-> DONE
```


#### Character: Temple Priest Objection

**Source:** `story/priest_objection.ink`

```ink
// ============================================================
// CHARACTER: Temple Priest Objection
// ACT: Act II
// CASE: The Silenced Teacher
// CASE ID: authority_challenged
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I was on duty when it happened. I will tell you only what I witnessed — nothing more. Last Sabbath, outside the outer court — tables overturned, animals scattered, the crowd orange with excitement. He called it My Father's house. The merchants called it their living. I called it my afternoon.
* [Did He strike anyone?] -> violence
* [What did the priests do?] -> priestly
=== violence ===
No blade was drawn. No centurion was summoned. He simply stood there while the merchants fled. It was the most disciplined crowd-disruption I have ever witnessed in this province.
* [That is unusual.] -> priestly
=== priestly ===
The merchants ran straight to the priests. By evening, the Sanhedrin was in emergency session. They were not discussing the disruption. They were discussing the man.
* [And the following days?] -> closing
=== closing ===
I have my instructions. I watch. I report. The Galilean's movement is being catalogued, questioned, and debated at every level of authority in this city. The outcome is not in doubt.
-> DONE
```


#### Character: Thomas (Parable Meaning)

**Source:** `story/parable_meaning.ink`

```ink
// ============================================================
// CHARACTER: Thomas (Parable Meaning)
// ACT: Act II
// CASE: The Silenced Teacher
// CASE ID: authority_challenged
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am Thomas. Ask more questions than I answer. The honest ones. Jesus told a story about tenants who kept killing the servants the owner sent. Eventually they killed the owner's son. I heard it in the Temple courtyard.
* [The crowd heard it too.] -> crowd
* [What is the vineyard?] -> vineyard
=== crowd ===
The crowd was silent after that. When someone tells a story about murderous tenants and the owner's son, and then looks at the chief priests while saying it — the silence is the answer.
* [And the stone?] -> stone
=== vineyard ===
The vineyard is Israel. The owner is God. The tenants are the chief priests and elders. The servants are the prophets. The son — that is where the story ends in the telling.
* [And the builders' rejected stone?] -> stone
=== stone ===
The stone the builders rejected becomes the cornerstone. That is Psalm 118. The crowd did not look where He was pointing. They were too busy watching the priests turn pale.
* [Thomas, you understand the parables.] -> closing
=== closing ===
I ask questions. That is my trade. But some answers are so clear, even a questioner has to pause. The man from Nazareth speaks truth in a way that makes the comfortable very uncomfortable.
-> DONE
```


#### Character: Thomas (Parable of the Vineyard)

**Source:** `story/parable_vineyard.ink`

```ink
// ============================================================
// CHARACTER: Thomas (Parable of the Vineyard)
// ACT: Act II
// CASE: The Silenced Teacher
// CASE ID: authority_challenged
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am a merchant from Tyre. I trade in spices and stories — both travel well along the Roman roads. I heard the Galilean tell the story of the vineyard in the Temple courtyard.
* [What is the story?] -> vineyard
* [The crowd's reaction?] -> reaction
=== vineyard ===
There was a man who planted a vineyard. He put a fence around it, dug a winepress, and built a watchtower. Then he leased it to tenants and went away. At harvest, he sent servants to collect his fruit. The tenants beat one, killed another, stoned a third.
* [And then?] -> reaction
=== reaction ===
The crowd murmured. They knew the story. It was Isaiah 5, sung in the synagogues every year. But this time, the tenants were standing in the front row — and the teller was looking right at them.
* [That is dangerous.] -> closing
=== closing ===
The stone the builders rejected has become the cornerstone. That is how the story ended. The chief priests left early. They did not want to hear the rest.
-> DONE
```


## Act III


### Case: The Broken Cup


#### Character: John Mark

**Source:** `story/john_disciple.ink`

```ink
// ============================================================
// CHARACTER: John Mark
// ACT: Act III
// CASE: The Broken Cup
// CASE EXPORT: last_supper
// SOURCE: act3_case_2d.js → NPC 'john_mark'
// BIBLE REFERENCE: Acts 12:12 — later tradition links this house to Mary, John Mark's mother
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Exodus 12:1–14
//     Gospel: John 1:29; 1 Corinthians 5:7; Luke 22:15–20
//     Insight: The Passover lamb was to be 'without blemish' (Exodus 12:5). Jesus — declared righteous even by Pilate ('I find no fault in him', John 18:38...
//   - Jeremiah 31:31–34
//     Gospel: Luke 22:20; 1 Corinthians 11:25
//     Insight: Jeremiah prophesied a coming covenant that would be internal, not external — written on hearts, not stone tablets. Jesus announced its inaug...
//   - Psalm 41:9
//     Gospel: John 13:18 — Jesus quotes this Psalm directly at the supper
//     Insight: Jesus explicitly quoted Psalm 41:9 at the table (John 13:18), identifying the betrayal as prophetic fulfilment — not a surprise. In quoting ...
//   - Zechariah 11:12–13
//     Gospel: Matthew 26:15; Matthew 27:3–10
//     Insight: Thirty silver pieces was the price of a slave (Exodus 21:32) — the religious leaders effectively valued Jesus as the lowest possible commodi...
//   - Isaiah 53:12
//     Gospel: John 17:1–26 (the High Priestly Prayer, delivered the same evening)
//     Insight: The farewell discourse (John 14–17), delivered after the meal, is the longest recorded prayer of Jesus. Isaiah described the Suffering Serva...
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: On Thursday evening, Nisan 14, Jesus and His disciples gathered in a borrowed upper room in Jerusalem to celebrate the Passover meal. But this was no ordinary Passover — Jesus was about to transform a 1,500-year-old cere...
//   Historicalnote: The 'upper room' (Greek: anagaion) was likely in the southwestern upper city of Jerusalem — the wealthier quarter where larger houses with guest rooms existed. Peter and John were sent ahead to prepare (Luke 22:8), follo...
//   Significance: The Passover lamb had always pointed forward to something greater. In Exodus 12, God told the Israelites to sacrifice a lamb and mark their doorposts with its blood — death would 'pass over' every house protected by the ...
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: judas
//   motive: Judas Iscariot had already made his agreement with the chief priests for 30 silver coins. He came to the preparation area before the meal to count his payment, dropping the clay cup in his haste. The broken cup and spill...
//   method: Judas moved through the preparation room before the Passover meal began, handling the money bag containing his payment. His nervous energy caused the cup to be knocked and broken near the doorway. During the meal, Jesus ...
// ============================================================
//

-> start
=== start ===
The candles are burning down, and He keeps speaking about washing feet and breaking bread like it is a farewell. I looked across the table at Judas — his eyes were tracking the doorway the entire evening. Something is fracturing inside our circle tonight, and I do not think words can mend it.
* [You saw Judas watching the door?] -> judas
* [What happened at the table?] -> table
=== judas ===
His eyes kept moving. Not like he was worried about being caught — like he had somewhere else to be. Something urgent. Then Jesus gave him a piece of bread, dipped in the bitter herbs. "Do quickly," He said. Judas left immediately. It was night.
* [You knew what was happening.] -> table
=== table ===
Jesus took the bread and broke it. "This is my body." Then the cup: "This cup is the new covenant in my blood." We didn't understand. We were still thinking in terms of kingdoms and swords. He was speaking of something far greater — and far more terrible.
* [You wrote it down.] -> closing
=== closing ===
The conversation is over. Go in peace.
-> DONE
```


#### Character: Judas Iscariot

**Source:** `story/judas_iscariot.ink`

```ink
// ============================================================
// CHARACTER: Judas Iscariot
// ACT: Act III
// CASE: The Broken Cup
// CASE EXPORT: last_supper
// SOURCE: act3_case_2d.js → NPC 'judas'
// BIBLE REFERENCE: John 13:29 — Judas kept the money bag; Luke 22:3–6 — already made his deal
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Exodus 12:1–14
//     Gospel: John 1:29; 1 Corinthians 5:7; Luke 22:15–20
//     Insight: The Passover lamb was to be 'without blemish' (Exodus 12:5). Jesus — declared righteous even by Pilate ('I find no fault in him', John 18:38...
//   - Jeremiah 31:31–34
//     Gospel: Luke 22:20; 1 Corinthians 11:25
//     Insight: Jeremiah prophesied a coming covenant that would be internal, not external — written on hearts, not stone tablets. Jesus announced its inaug...
//   - Psalm 41:9
//     Gospel: John 13:18 — Jesus quotes this Psalm directly at the supper
//     Insight: Jesus explicitly quoted Psalm 41:9 at the table (John 13:18), identifying the betrayal as prophetic fulfilment — not a surprise. In quoting ...
//   - Zechariah 11:12–13
//     Gospel: Matthew 26:15; Matthew 27:3–10
//     Insight: Thirty silver pieces was the price of a slave (Exodus 21:32) — the religious leaders effectively valued Jesus as the lowest possible commodi...
//   - Isaiah 53:12
//     Gospel: John 17:1–26 (the High Priestly Prayer, delivered the same evening)
//     Insight: The farewell discourse (John 14–17), delivered after the meal, is the longest recorded prayer of Jesus. Isaiah described the Suffering Serva...
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: On Thursday evening, Nisan 14, Jesus and His disciples gathered in a borrowed upper room in Jerusalem to celebrate the Passover meal. But this was no ordinary Passover — Jesus was about to transform a 1,500-year-old cere...
//   Historicalnote: The 'upper room' (Greek: anagaion) was likely in the southwestern upper city of Jerusalem — the wealthier quarter where larger houses with guest rooms existed. Peter and John were sent ahead to prepare (Luke 22:8), follo...
//   Significance: The Passover lamb had always pointed forward to something greater. In Exodus 12, God told the Israelites to sacrifice a lamb and mark their doorposts with its blood — death would 'pass over' every house protected by the ...
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: judas
//   motive: Judas Iscariot had already made his agreement with the chief priests for 30 silver coins. He came to the preparation area before the meal to count his payment, dropping the clay cup in his haste. The broken cup and spill...
//   method: Judas moved through the preparation room before the Passover meal began, handling the money bag containing his payment. His nervous energy caused the cup to be knocked and broken near the doorway. During the meal, Jesus ...
// ============================================================
//

-> start
=== start ===
You trace my steps with your ink and your parchment, little scribe. You think you are tracking a simple exchange of silver. You have no understanding of what it means to watch three years of momentum evaporate into poetry and feet-washing. We were supposed to hold the gates of the city! Now he speaks of tombs and broken bread. Someone must force his hand to action.
* [You sold Him for thirty pieces.] -> thirty
* [You regret it.] -> regret
=== thirty ===
Thirty pieces of silver. The price of a slave. That is what the Temple assessed the Son of God to be worth. And they paid me to deliver Him.
* [Why did you take it?] -> regret
=== regret ===
I watched three years of expectation curdle into disappointment. The Messiah was supposed to be a king. Instead He washed feet. Instead He spoke of dying. The Zealots wanted a general. I wanted a winner. I was wrong.
* [What happened to the money?] -> closing
=== closing ===
Silver is a ledger entry. Disappointment is a fire. The Temple priests counted it out. I took it. And then I saw Him look at me from across the courtyard. I threw the silver at them and ran.
-> DONE
```


#### Character: Upper Room Preparation

**Source:** `story/upper_room_prep.ink`

```ink
// ============================================================
// CHARACTER: Upper Room Preparation
// ACT: Act III
// CASE: The Broken Cup
// CASE ID: last_supper
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
They have prepared the room for the evening meal. Whatever happened in the temple courts changed everything. The atmosphere in the upper city tonight is not celebration — it is something far heavier.
* [Who prepared this room?] -> preparers
* [What happened in the Temple?] -> temple
=== preparers ===
Peter and John were sent ahead. They followed a man carrying a water jar — that was the sign. The house belongs to a woman named Mary, John Mark's mother. The room was ready by mid-afternoon.
* [Something was disturbed.] -> temple
=== temple ===
The Galilean overturned the money changers' tables in the outer court. He called it His Father's house. The merchants called it their living. The priests called it the last straw.
* [This was deliberate.] -> closing
=== closing ===
Whatever happens tonight, it is not a coincidence. Every element of this Passover has been coloured by what happened in those courts yesterday.
-> DONE
```


### Case: The Severed Ear


#### Character: Secret Visit

**Source:** `story/secret_visit.ink`

```ink
// ============================================================
// CHARACTER: Secret Visit
// ACT: Act III
// CASE: The Severed Ear
// CASE ID: gethsemane_arrest
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
It was too risky. A storm was rising faster than we could measure. I watched from the shadows. Whatever occurred there — in that house that night.
* [What happened in that house?] -> rised
* [You were watching?] -> shadows
=== rised ===
Words. Accusations. A betrayal announced before it was complete. The teacher knew. He gave the bread to the betrayer openly. The entire room went quiet.
* [Who gave the bread?] -> shadows
=== shadows ===
I watched from the olive grove. I had no right to be there. But when you have seen what I have seen — when a man calls the dead out of tombs and speaks to storms — you do not walk away easily.
* [What did you witness?] -> closing
=== closing ===
Say nothing of this. Some doors, once opened, do not close again.
-> DONE
```


#### Character: Simon Peter

**Source:** `story/peter_defense.ink`

```ink
// ============================================================
// CHARACTER: Simon Peter
// ACT: Act III
// CASE: The Severed Ear
// CASE EXPORT: gethsemane_arrest
// SOURCE: act3_case_2d.js → NPC 'simon_peter'
// BACKGROUND: The informal leader of the inner circle[cite: 1]. He is currently hidden in the shadows outside the high priest's courthouse, deeply traumatized, defensive, and swinging violently between ra...
// BIBLE REFERENCE: John 18:10-11; Matthew 26:51-54
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 53:7
//     Gospel: Matthew 26:52–54
//     Insight: Though armies of angels were at His call, He voluntarily submitted to human bonds to fulfill the redemptive plan.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Late Thursday night, Judas led a cohort of Roman soldiers and temple officers to a private olive grove called Gethsemane. After identifying Jesus with a kiss, a scuffle broke out. Peter drew a short sword and cut off the...
//   Historicalnote: A Roman cohort combined with temple police shows a massive, coordinated security operation. The authorities expected armed resistance from Jesus's followers, making His peaceful surrender highly unexpected to military ta...
//   Significance: This case highlights Jesus's absolute control over His arrest. He prohibited violent revolution, healed His enemy, and protected His disciples from capture, fulfilling His own word that He would lose none of them.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: none
//   motive: There was no military insurgency. Jesus submitted voluntarily, refusing to allow His disciples to mount an armed rebellion against the legal authorities.
//   method: Judas betrayed the location, and an armed force arrived. Peter panicked and struck Malchus. Jesus miraculously healed Malchus's ear on the spot, demanded peace, and surrendered Himself willingly to fulfill the Scriptures...
// ============================================================
//

-> start
=== start ===
I am Simon Peter. I do not count words when answers were never final. I followed him for three years. I healed others, asked impossible things, and watched him do things no teacher should be able to do. Then the rooster crowed. I denied him three times and left. I am still here, which is either resilience or foolishness. You decide.
* [Tell me about the donkey colt and the cloaks.] -> cloaks
* [What happened with the rope at the tethering post?] -> rope
=== cloaks ===
Those are mine and John's cloaks. We used them as a saddle for the colt because it had never been ridden — we didn't want it to bolt on the road. Simple as that.
* [Why leave them behind?] -> cloak_detail
* [That sounds rehearsed.] -> rope_lie
=== cloak_detail ===
We didn't leave them, exactly. We draped them over the colt and then... when the crowd started cheering and the whole Mount of Olives came alive, we were swept up in it. The cloaks were still on the animal. We just forgot them in the noise.
* [Go on.] -> closing
=== rope ===
John untied the rope — he didn't cut it. I don't know how it ended up cut. Maybe someone else came along later. We were in a hurry.
* [You cut it yourself.] -> rope_lie
* [I believe you.] -> cloak_detail
=== rope_lie ===
Alright — I cut the rope. Not to steal anything, but the knot had been tied extra tight and I was in a hurry. We were supposed to be back before the main crowd arrived. Everything else happened exactly as Jesus said.
* [Thank you, Peter.] -> closing
=== closing ===
The story ends here. But the work carries on.
-> DONE
```


#### Character: Simon Peter (Simple Defense)

**Source:** `story/peter_defense_simple.ink`

```ink
// ============================================================
// CHARACTER: Simon Peter (Simple Defense)
// ACT: Act III
// CASE: The Severed Ear
// CASE ID: gethsemane_arrest
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am Simon Peter. I do not count words when answers were never final. I followed him for three years. I healed others, asked impossible things, and watched him do things no teacher should be able to do. Then the rooster crowed. I denied him three times and left. I am still here, which is either resilience or foolishness. You decide.
* [Tell me of the rooster crowing.] -> rooster
* [And after — why did you stay?] -> stay
=== rooster ===
The third time, He turned. He looked at me — right through the smoke and the noise. And I knew. I had denied Him three times before that dawn. I ran. I wept. And somehow, I was still following.
* [How does failure become hope?] -> stay
=== stay ===
Three days later I found the tomb empty. And then I saw Him — alive. He forgave me before I could ask. He commissioned me before I could explain. That is why I am here.
* [This is your simple defense.] -> closing
=== closing ===
Mock me if you will. I earned my place at that table by failing spectacularly and being restored completely. That is the gospel in three sentences.
-> DONE
```


## Act III


### Case: The Curtain and the Cross


#### Character: Centurion Longinus

**Source:** `story/roman_assessment.ink`

```ink
// ============================================================
// CHARACTER: Centurion Longinus
// ACT: Act III
// CASE: The Curtain and the Cross
// CASE EXPORT: crucifixion_det
// SOURCE: act3_case_2d.js → NPC 'centurion_longinus'
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am Claudius, centurion of the Antonia fortress. A Roman officer does not submit reports about Jewish prophets. But my servant lay dying, and the reports about this Galilean were consistent enough to investigate.
* [Your servant was healed?] -> servant
* [How do you explain it?] -> explanation
=== servant ===
My servant was paralysed — unable to move her legs for two years. I sent two men with a message: "Lord, do not trouble Yourself. My servant is dying." He replied with words I still cannot repeat without trembling: "Go your way. She has been healed."
* [When did you know?] -> explanation
=== explanation ===
When the messengers arrived home, the neighbours were celebrating. She had stood at the doorway and walked to the well before they could ask where the healer was. She never saw the Galilean. Never heard His voice. Yet she is whole.
* [That is beyond your understanding.] -> closing
=== closing ===
I have served emperors, governed provinces, and commanded auxiliaries. I have no category for what I witnessed that day. The man from Nazareth heals by authority. Not by ritual. Not by proximity. By a word. That is worth recording.
-> DONE
```


#### Character: Joseph of Arimathea

**Source:** `story/joseph_arimathea.ink`

```ink
// ============================================================
// CHARACTER: Joseph of Arimathea
// ACT: Act III
// CASE: The Curtain and the Cross
// CASE EXPORT: crucifixion_det
// SOURCE: act3_case_2d.js → NPC 'joseph_arimathea'
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I have the means to secure the remains from the governor's staff, but it requires using up all my political leverage. Conscience is an expensive thing to buy back when you have kept silent for too long.
* [You opposed the sentence?] -> opposition
* [Why use your own tomb?] -> tomb
=== opposition ===
I did not speak during the vote. My voice was present but not raised. I waited for the outcome — and when the sentence was passed, I knew silence was complicity.
* [And now?] -> tomb
=== tomb ===
Joseph of Arimathea offered his own new tomb. A wealthy man's tomb, hewn from rock. That fulfilled Isaiah 53:9 — buried with the rich. I chose those linens myself — the finest cloth I could obtain quickly before the Sabbath began.
* [And the spices?] -> spices
=== spices ===
Nicodemus brought seventy-five pounds of myrrh and aloes. That is Roman imperial weight, not Temple amounts. It was meant to honour the body properly. The women brought additional jars for the final anointing after Sabbath.
* [None of it was used.] -> closing
=== closing ===
And now the linens are there. The tomb is open. I walked inside this morning. I stood where I placed Him. And I find I am no longer grieving the way I expected to.
-> DONE
```


#### Character: Marcus (Execution Soldier)

**Source:** `story/execution_soldier.ink`

```ink
// ============================================================
// CHARACTER: Marcus (Execution Soldier)
// ACT: Act III
// CASE: The Curtain and the Cross
// CASE EXPORT: crucifixion_det
// SOURCE: act4_case_2d.js → NPC 'marcus'
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am Marcus. I was on duty. I will read this scene plainly and let you draw your own conclusions. Last Sabbath, outside the outer court — tables overturned, animals scattered, the crowd orange with excitement. He called it My Father's house. The merchants called it their living. I called it my afternoon.
* [What did the merchants do?] -> merchants
* [Did He hurt anyone?] -> violence
=== merchants ===
The money changers scattered first — Tyrian shekels rolling into the drainage cracks. Then the livestock dealers. Within minutes the court was cleared and the crowd was singing.
* [The crowd supported Him?] -> crowd_support
=== violence ===
No blade was drawn. No centurion was summoned. He simply stood there while the merchants fled. It was the most disciplined crowd-disruption I have ever witnessed.
* [That sounds rehearsed.] -> opening
=== crowd_support ===
The people were already agitated from the triumphal entry two days prior. This was not a random crowd — this was a movement with momentum.
* [And the priests?] -> priestly_response
=== priestly_response ===
The priests are meeting emergency sessions day and night. They are not meeting about the coinage. They are meeting about the man.
* [Show me your official dispatch.] -> closing
=== closing ===
I am on duty. I will stick to what I observed. The rest belongs to the archives and the Sanhedrin's emergency sessions.
-> DONE
```


#### Character: Pashhur (Temple Priest on Shift)

**Source:** `story/caiaphas_priest.ink`

```ink
// ============================================================
// CHARACTER: Pashhur (Temple Priest on Shift)
// ACT: Act III
// CASE: The Curtain and the Cross
// CASE EXPORT: crucifixion_det
// SOURCE: act3_case_2d.js → NPC 'temple_priest_pashhur'
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am Joseph ben Caiaphas. I have served as High Priest since the eighteenth year of Tiberius. The Romans appointed me; I serve at their pleasure. The man from Galilee is testing everything that keeps this city from burning.
* [He claims authority over the Temple.] -> authority_challenge
* [The crowd follows Him everywhere.] -> crowd_threat
=== authority_challenge ===
We challenged Him this morning — formally. "By what authority do you do these things?" He answered with a question about John the Baptist. We couldn't respond without inciting the crowd or admitting John was a fraud. He trapped us completely.
* [You were outmanoeuvred.] -> exposed
=== crowd_threat ===
The Pharisees are panicking. They think the crowds are about to crown Him king. I look at the Antonia fortress and I see four legions that will flatten this city if there's any hint of sedition. One man's popularity is not worth Jerusalem.
* [So you're protecting the city?] -> exposed
=== exposed ===
He answered the Herodians about the tax with one sentence: "Render to Caesar what is Caesar's, and to God what is God's." He split our coalition in half. The crowd went silent. We had nothing left.
* [That sounds brilliant.] -> parable_reveal
=== parable_reveal ===
He told parables about tenants murdering the landowner's son. Anyone schooled in Isaiah 5 recognised it immediately. He was quoting Scripture and pointing at us. The crowd understood. We understood. And then He asked us about the cornerstone stone from Psalm 118.
* [The builders rejected the stone.] -> closing
=== closing ===
-> DONE
```


## Act IV


### Case: The Guard's Report


#### Character: Barabbas the Insurgent

**Source:** `story/barabbas_insurgent.ink`

```ink
// ============================================================
// CHARACTER: Barabbas the Insurgent
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: barabbas_choice
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
(A heavy chain rattles against the stone floor of the lower cell as he laughs roughly.) The crowd wants an assassin, scribe! They do not want a teacher who tells them to love the legions. Rome only understands the edge of a curved blade, and the people out there know it. My hands are stained with Roman blood, and today, that makes me a hero.
* [You killed Romans?] -> kiling_record
* [Why do the priests want you released?] -> priest_deal
=== kiling_record ===
I killed seven. With my own hands. The governor put a price on my head three years ago. The Sicarii use my tactics. The Zealots bring me targets. Tonight, the High Priest needed a riot to force Pilate's signature on an execution — and I am the best riot money can buy.
* [And today's crowd chose you.] -> crowd_choice
=== priest_deal ===
The priests needed a crowd to demand a prisoner's release — any prisoner — to satisfy the mob and get their man executed. Barabbas the insurgent was already in their calculations before I arrived this morning.
* [So this was political theatre.] -> closing
=== crowd_choice ===
The crowd chose me. Not because I am innocent — because I am useful. The priests whispered in the right ears. The Galilean stood silent before Pilate while this city screamed for blood. I return to the hills. The knives are already sharpened.
* [And the Galilean goes to the hill of execution.] -> closing
=== closing ===
I go back to the hills. The Galilean goes to the hill of execution, and I return to the war. Let history decide who was useful.
-> DONE
```


#### Character: Market Informant / Bribe-Taker

**Source:** `story/informant_bribe.ink`

```ink
// ============================================================
// CHARACTER: Market Informant / Bribe-Taker
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: barabbas_choice
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
Information has a price. Names have a price. Silence also has a price. The Galilean's gathering had a ledger before the sun went down. One of the twelve.
* [You are selling information?] -> selling
* [Tell me about the Galilean.] -> galilean
=== selling ===
I sell what people are willing to pay for. The Sanhedrin pays for surveillance data. The Zealots pay for safe house locations. You pay for this conversation.
* [What does the Sanhedrin want?] -> sanhedrin_pay
=== galilean ===
The Galilean draws crowds like a fire draws moths. The priests want to know who, where, when — not why. Understanding is not their métier. Control is.
* [Do you know who the informant is?] -> sanhedrin_pay
=== sanhedrin_pay ===
One of the twelve disciples. The one who keeps the purse. He has... concerns. Concerns that translate well into the seventy pieces of silver the inner council values at precisely the price of a slave's life.
* [Judas Iscariot.] -> closing
=== closing ===
The one who walks with shadows and counts silver. I have said too much already.
-> DONE
```


#### Character: Pilate's Secretary

**Source:** `story/pilates_secretary.ink`

```ink
// ============================================================
// CHARACTER: Pilate's Secretary
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: barabbas_choice
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am in the Praetorium this morning, formatting the official titulus for the crossbeam. The charge must be written clearly in Latin, Greek, and Hebrew so every traveller passing the main road reads it. The Prefect ordered it to read: "Jesus of Nazareth, King of the Jews." The priests are complaining about the phrasing.
* [Why are the priests complaining?] -> priests_complain
* [What does Pilate think?] -> pilate_response
=== priests_complain ===
They want "He said I am King of the Jews" — making it a subjective claim rather than an official charge. The Prefect refuses. He said: "What I have written, I have written." He does not take edits from the Sanhedrin.
* [That is significant defiance.] -> pilate_response
=== pilate_response ===
Pilate was angry with them. They had brought a case he did not believe, tried to manipulate him into a conviction, and now they want to rewrite the charge after sentence has been passed. He despises them.
* [So the inscription stands as written.] -> closing
=== closing ===
What is written, is written. The Prefect does not take edits from the Sanhedrin. It serves as an imperial warning to anyone else planning a throne.
-> DONE
```


#### Character: Pontius Pilate

**Source:** `story/pontius_pilate.ink`

```ink
// ============================================================
// CHARACTER: Pontius Pilate
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: barabbas_choice
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
Am I an expert in your laws, Judean? Your priests drag this man to my praetorium at dawn and expect me to sign a death warrant for words. They say he claims to be a king. If he is a king without an army, he is a fool. If he has an army, let him show his banners.
* [You don't see Him as a threat?] -> threat
* [The crowd wants Barabbas.] -> barabbas
=== threat ===
What is truth to a man holding three legions? A man who heals the blind and raises the dead is not a military threat. He is a philosophical problem. And Rome does not execute philosophers.
* [But you will execute Him.] -> crowd_response
=== barabbas ===
The crowd wants Barabbas — an actual murderer. Give them what they want. It satisfies the feast custom, and it gets this theological dispute off my docket.
* [You are washing your hands.] -> crowd_response
=== crowd_response ===
Mobs are volatile. Give them Barabbas if they want a thief. I will wash my hands of this local dispute. The sentence stands.
* [And the inscription on the cross?] -> writing
=== writing ===
"Jesus of Nazareth, King of the Jews." That is the titulus I authorised — in Latin, Greek, and Hebrew for every traveller on the road to read. The priests complained. I told them: what is written, is written. The Prefect does not take edits from the Sanhedrin.
* [That is defiance.] -> closing
=== closing ===
I have no further comments for your investigation. The matter is concluded.
-> DONE
```


## Act IV

### Case: The Empty Tomb

#### Character: Mary Magdalene

**Source:** `story/mary_magdalene.ink`

```ink
// ============================================================
// CHARACTER: Mary Magdalene
// ACT: Act IV
// CASE: The Empty Tomb
// CASE EXPORT: resurrection
// SOURCE: act4_case_2d.js → NPC 'mary_magdalene'
// BIBLE REFERENCE: John 20:1–18; Mark 16:9
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Psalm 16:10
//     Gospel: Acts 2:27–31 — Peter quotes Psalm 16:10 at Pentecost and explicitly applies it to Jesus's resurrection
//     Insight: David wrote Psalm 16 in first person, but Acts 2:29–31 records Peter explaining that David was a prophet who 'seeing what was ahead, spoke a...
//   - Hosea 6:2
//     Gospel: 1 Corinthians 15:4 — Paul writes the resurrection happened 'according to the Scriptures,' citing the third-day pattern
//     Insight: Jesus predicted His own third-day resurrection three times in the Gospels (Matthew 16:21, 17:23, 20:19). He drew on the pattern of Hosea 6:2...
//   - Jonah 1:17 / Matthew 12:40
//     Gospel: Matthew 12:40 — Jesus explicitly identifies Himself with Jonah when challenged for a sign
//     Insight: This is one of the most precise self-fulfilling prophecies in Scripture — Jesus named His own death and resurrection timing using the Jonah ...
//   - Isaiah 53:10–11
//     Gospel: John 20:11–18; Luke 24:13–35 — Jesus appears alive after the suffering
//     Insight: The Suffering Servant song of Isaiah 53 contains a remarkable internal paradox: the servant is 'cut off from the land of the living' (v.8), ...
//   - Psalm 22:1–31
//     Gospel: Matthew 27:46 (crucifixion); the closing verses of Psalm 22 look beyond the suffering to vindication
//     Insight: Psalm 22 is a remarkable document: it begins with abandonment and describes crucifixion details (hands and feet pierced, v.16; garments divi...
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Early on Sunday morning, Nisan 17, three days after the crucifixion, Mary Magdalene came to the tomb in the garden near Golgotha. She found the stone rolled away, the tomb empty, and — according to John's Gospel — initia...
//   Historicalnote: The tomb was a wealthy man's tomb — Joseph of Arimathea's, hewn from rock in the garden near Golgotha (John 19:41). This fulfilled Isaiah 53:9 ('buried with the rich'). A large stone (Greek: lithos) sealed the entrance —...
//   Significance: The resurrection is the pivotal claim of Christianity. Paul wrote: 'If Christ has not been raised, your faith is futile' (1 Corinthians 15:17). But it was also the most precisely predicted event in the Passion narrative ...
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: none
//   motive: There was no theft, no conspiracy, and no staged event. Jesus rose from the dead on the third day exactly as He had predicted, fulfilling centuries of prophetic writing. The evidence at the tomb — the orderly linens, the...
//   method: The resurrection was a supernatural act of God. The stone was moved not to release Jesus — who later appeared in locked rooms — but to allow witnesses to see the empty tomb. The burial linens remained in their position, ...
// ============================================================
//

-> start
=== start ===
I am Mary of Magdala. Seven demons were cast from me by the word of His mouth. My mind was a wilderness before that day. After it, I had a memory — and a purpose.
* [You followed Him everywhere.] -> following
* [The authorities don't fear women.] -> fear_auth
=== following ===
I followed from Galilee to Jerusalem. I watched from the hill when they crucified Him. I stood at the tomb before dawn. I saw the linen. I heard the voice.
* [And you recognised Him.] -> following
=== fear_auth ===
The Sanhedrin fears testimony from women. In Roman courts, a woman's word does not count. In the Temple hierarchy, women cannot give evidence. So they will dismiss me.
* [But you saw what you saw.] -> closing
=== closing ===
They did not see the graves open. They did not feel the demons leave. Their categories are too small for what happened that morning. I am not afraid of them. I am afraid that people will forget.
-> DONE
```

## Act III

### Case: The Road to Golgotha

#### Character: Simon of Cyrene

**Source:** `story/simon_cyrene.ink`

```ink
// ============================================================
// CHARACTER: Simon of Cyrene
// ACT: Act III
// CASE: The Road to Golgotha
// CASE ID: via_dolorosa
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
My friend, I was just walking home from the quarry when they seized me. I was carrying my own cross to the place of the skull. I did not know his name then.
* [They forced you to carry the cross.] -> forced
* [What was He like?] -> his_words
=== forced ===
The soldiers saw I was from Cyrene — a Greek-speaking Jew from North Africa. They needed someone strong enough to carry that beam when the Nazarene collapsed from blood loss and exhaustion. They didn't ask. They drafted.
* [And you carried it.] -> his_words
=== his_words ===
I heard Him speak to the women along the way. "Daughters of Jerusalem, do not weep for me." Not a word of anger. Not a curse. He spoke to them as if He were already beyond their grief.
* [He was heading to His death.] -> closing
=== closing ===
I set the cross down at Golgotha and I left. I did not know who He was. But I have thought about those words every day since.
-> DONE
```


## Act II

### Case: Investigation Board


#### Character: Senior Scribe - Debate

**Source:** `story/board_debate.ink`

```ink
// ============================================================
// CHARACTER: Senior Scribe - Debate
// ACT: II
// CASE: Investigation Board
// CASE ID: investigation_board
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
Apprentice Scribe Maluch — you add something to the piece that was missing when I first read your draft. You have the witness from the pool, the Roman record from Rome, the accounts from Mark's house, the Galilean who frightened the chief priests. But the real question is not about the man. It is about what scares people most about Him.
* [What scares them?] -> fear
* [The healings?] -> healings
=== fear ===
The threat was not the healings. The threat was the categories He would not fit. A man who claims authority over the Sabbath. A teacher who quotes Isaiah 5 and points at the Sanhedrin. A prophet who raises the dead and will not call down fire on Rome.
* [They fear losing control.] -> control
=== healings ===
Healings happen. The Essenes have healing traditions. But this man speaks as if He authored the Law itself. That is not a prophet's tone. That is the tone of Someone witholding an inheritance from its current stewards.
* [The Sanhedrin heard that tone.] -> closing
=== control ===
Yes. When a man acts as though the Temple is His Father's house, and the Pharisees are tenants who have abused the lease, the tenants begin to think about eviction. Not by legal process — by elimination.
* [And the Roman Governor?] -> pilate_path
=== pilate_path ===
Pilate found no fault in Him. Even Pilate — who washed his hands of the whole affair — could not find a capital crime. The Sanhedrin's case was fabricated from start to finish.
* [So the whole trial was illegal.] -> closing
=== closing ===
The real question is not about the man. It is about what scares people most about Him. The threat was not the healings. The threat was the categories He would not fit.
-> DONE
```


#### Character: Senior Scribe - Intro

**Source:** `story/scribe_intro.ink`

```ink
// ============================================================
// CHARACTER: Senior Scribe - Intro
// ACT: Global / Board
// CASE: IV
// CASE ID: investigation_board
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am Master Scribe. The archives hold testimony — not opinion. Many have walked these stones carrying questions no scroll could answer.
* [I seek truth here.] -> truth_seeker
* [What do the streets say?] -> street_rumors
=== truth_seeker ===
Then you have come to the right place. I have recorded the morning's events in the Temple courts — the challenges to the Galilean's authority, His answers, the silence that fell over the Sanhedrin by midday.
* [Tell me about the authority challenge.] -> authority_challenge
* [What was the crowd's reaction?] -> crowd_reaction
=== street_rumors ===
The streets are full of a hundred different versions of the same story. I prefer the official record. The Sanhedrin challenged Him at the Temple this morning. He answered every question. They had no response.
* [You were there?] -> truth_seeker
=== authority_challenge ===
The chief priests and elders came with formal questions — signed, sealed, presented with all the drama of a legal tribunal. They asked: "By what authority do you do these things?" He answered with a question about John the Baptist that left them publicly paralysed.
* [Paralysed?] -> exposed_authority
=== crowd_reaction ===
By the end, the crowd was silent. Not because they were unimpressed — because they were watching the strongest arguments in the city being dismantled one by one.
* [And the Pharisees?] -> pharisee_fall
=== pharisee_fall ===
The Pharisees and Herodians came with the tax question. They thought they had Him. Instead, He pointed to Caesar's face on the coin and said: "Give to Caesar what is Caesar's, and to God what is God's." The coalition fell apart in that moment.
* [So they couldn't trap Him.] -> exposed_authority
=== exposed_authority ===
No one could say a word in reply. And from that day on, no one dared ask Him any more questions. That is in the archives. That is the record.
* [And the widow's offering?] -> widow_reveal
=== widow_reveal ===
Ah, you know that detail too. Yes — the widow gave two small copper coins. He called her over. He said she had given more than all the others. That was the moment I stopped writing and just... watched.
* [You were moved.] -> closing
=== closing ===
I believe I've shared all that is relevant to your inquiry.
-> DONE
```


#### Character: Senior Scribe - Review

**Source:** `story/board_review.ink`

```ink
// ============================================================
// CHARACTER: Senior Scribe - Review
// ACT: Global / Board
// CASE: Investigation Board
// CASE ID: investigation_board
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I have watched your investigation board grow. You have evidence that changes conclusions and evidence you are keeping out of affection. Can you tell the difference yet?
* [What does the weightiest evidence carry?] -> weight
* [What have the pages told you?] -> pages
=== weight ===
The evidence with the most weight is the one that refuses to be explained away. A weighty piece of evidence is not the most dramatic — it is the one that generates the fewest alternative explanations.
* [Like?] -> closing
=== pages ===
The pages tell me that the most dangerous thing about this man was not the healings. It was the categories He would not fit. Every questioner came with a trap. Every trap shattered on contact with the truth.
* [Why is that terrifying?] -> closing
=== closing ===
Keep gathering. The board grows, but the truth is already there. You just have to be willing to see it.
-> DONE
```
