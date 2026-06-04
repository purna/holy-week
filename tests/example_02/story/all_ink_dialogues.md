# Holy Week: Consolidated Ink Narrative Archives

This document serves as the master record for all branching dialogue scripts used in the investigation.

---

## 🌴 ACT I: THE POPULIST ARRIVAL

### scribe_intro.ink
```ink
// ACT: Act I
// BACKGROUND: Initial encounter with the Guardian of the Archives.
// BIBLE REFERENCE: John 8:32; Psalm 119:160

-> start
=== start ===
I am Master Scribe. The archives hold testimony — not opinion.
Many have walked these stones carrying questions no scroll could answer.
* [I seek truth here.] -> truth_seeker
* [What do the streets say?] -> street_rumors

=== truth_seeker ===
Then you have come to the right place. I have recorded the morning's events in the Temple courts — the challenges to the Galilean's authority, His answers, and the silence that fell over the Sanhedrin by midday.
* [Tell me about the authority challenge.] -> authority_challenge
* [What was the crowd's reaction?] -> crowd_reaction

=== street_rumors ===
The streets are full of a hundred different versions of the same story. I prefer the official record. The Sanhedrin challenged Him at the Temple this morning. He answered every question. They had no response.
* [You were there?] -> truth_seeker

=== authority_challenge ===
The chief priests and elders came with formal questions — signed, sealed, presented with all the drama of a legal tribunal. They asked: "By what authority do you do these things?" He answered with a question about John the Baptist that left them publicly paralysed.
* [Paralysed?] -> closing

=== crowd_reaction ===
By the end, the crowd was silent. Not because they were unimpressed — because they were watching the strongest arguments in the city being dismantled one by one.
* [Continue.] -> closing

=== closing ===
I believe I've shared all that is relevant to your inquiry.
-> DONE
```

### john_donkey.ink
```ink
// ============================================================
// CHARACTER: John the Apostle.
// ACT: Act I
// CASE: The Missing Donkey
// CASE EXPORT: triumphal_entry
// SOURCE: john_donkey.ink
// BACKGROUND: The Gospel author who witnessed the triumphal entry and recorded the crowd's response.
// BIBLE REFERENCE: John 12:12-19
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE: Zechariah 9:9
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: The fulfillment of the King's arrival in Jerusalem as witnessed by the inner circle.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   Culprit: none
//   Motive: Prophetic fulfillment of the humble king.
// ============================================================

-> start
=== start ===
We have just come down from the Mount of Olives. The crowd was massive! I have never heard so many people shouting the same thing at once. I was busy recording the names of the witnesses for my own account.
* [Tell me about the crowd's testimony.] -> testimony
* [Did you see which way the donkey went?] -> tracks

=== testimony ===
They were shouting 'Hosanna!' from the tops of their lungs. I saw the Pharisees scribbling down complaints. I'm keeping a record of their written threats; it's significant evidence of their rejection.
* [What about the donkey?] -> tracks

=== tracks ===
The donkey tracks lead right down the western slope. We followed them all the way. A villager near the gate stopped us and asked why we were untying it, but he let us go once we spoke the words.
* [Continue.] -> closing

=== closing ===
Everything is happening as it was written. We are just witnesses.
-> DONE
```

---

## 🏛️ ACT II: THE SILENCED TEACHER

### nicodemus_conflicted.ink
```ink
// ============================================================
// CHARACTER: Nicodemus (Conflicted Pharisee)
// ACT: Act II
// CASE: The Price of Life
// CASE EXPORT: lazarus_plot
// SOURCE: nicodemus_conflicted.ink
// BACKGROUND: A member of the Sanhedrin who seeks the truth in secret. He is torn between his position and his growing conviction.
// BIBLE REFERENCE: John 3:1-21; John 7:50-52; John 19:39
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Jeremiah 29:13
//     Gospel: John 3:1-2
//     Insight: Nicodemus's search in the night fulfills the promise that those who seek with all their heart will find Him.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Nicodemus questions the legality of the Sanhedrin's actions and seeks the Truth personally during a secret night visit.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   Culprit: none
//   Motive: Seeking truth amidst institutional corruption and political fear.
// ============================================================

-> start
=== start ===
I prefer the shadows of the evening. The Sanhedrin is a bright, loud place where truth is often shouted down. I have been watching the Nazarene. I have spoken to him when the city was asleep. He doesn't speak like a revolutionary... he speaks like the Law itself.
* [Why did you go to him at night?] -> night_visit
* [What is the mood of the Council regarding Lazarus?] -> council_mood

=== night_visit ===
Because I am a teacher of Israel, and I had questions that daylight could not answer. He told me I must be born again. I am still trying to understand what that means for a man of my age and standing.
* [Does the 'Secret Decree' worry you?] -> probe_decree

=== council_mood ===
They are in a panic. Caiaphas sees only the Romans. Annas sees only power. The miracle at Bethany has forced their hand. They cannot argue with a man who was dead, so they intend to silence him.
* [What about the decree?] -> probe_decree

=== probe_decree ===
The decree is a stain on our history. It targets Lazarus specifically. They want to eliminate the witness to the miracle before the Passover begins. I have seen the draft in Annas's study.
* [Continue.] -> closing

=== closing ===
I am trying to work from within, but the walls are closing in. At some point, one must choose between the scroll and the Light.
-> DONE
```

### simon_leper.ink
```ink
// ============================================================
// CHARACTER: Simon the Leper (Healed Host)
// ACT: Act II
// CASE: The Price of Life
// CASE EXPORT: lazarus_plot
// SOURCE: simon_leper.ink
// BACKGROUND: Once an outcast, now a host. His house in Bethany became a refuge for Jesus and a place where the preparation for His burial began.
// BIBLE REFERENCE: Matthew 26:6-13; Mark 14:3-9
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 53:3-4
//     Gospel: Matthew 26:6
//     Insight: Simon's healing represents the Servant taking up our pain and infirmities.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: A dinner in Bethany where Mary anoints Jesus, preparing Him for burial amidst the growing plot.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   Culprit: none
//   Motive: Hospitality and prophetic preparation for the final sacrifice.
// ============================================================

-> start
=== start ===
My house was a place of exclusion once. Now, it is a place where the Son of God eats. The perfume Mary poured on him... the scent is still in the rafters. The disciples grumbled about the cost, but Jesus saw it as a preparation.
* [What did Jesus say about his burial?] -> probe_burial
* [How was your leprosy healed?] -> healing

=== healing ===
He touched me. Nobody touches a leper. The Law says I am unclean, but his touch made the Law irrelevant. I am clean because he willed it. My house is his house now.
* [What about the perfume?] -> probe_burial

=== probe_burial ===
He said she was anointing him for his burial. He said it so calmly, while we were all laughing and eating. It was as if he was already looking past the cross.
* [Was there a Temple spy here?] -> spy

=== spy ===
A man in a Temple robe came to the door. He didn't come to eat. He came to count the guests. He asked if Lazarus was here. I told him the King's table is open to all, but his eyes were cold.
* [Continue.] -> closing

=== closing ===
The Temple spy left a silver coin on the table. A bribe to tell them when Jesus leaves for the Garden. I threw it into the street. I have been clean long enough to know the smell of corruption.
-> DONE
```

---

## 🍷 ACT III: THE MOUNTING PRESSURE

### herods_servant.ink
```ink
// ============================================================
// CHARACTER: Chuza (Herod's Servant)
// ACT: Act III
// CASE: The Tetrarch's Court
// CASE EXPORT: herods_servant
// SOURCE: herods_servant.ink
// BACKGROUND: A household official in Herod Antipas’s court who witnessed the Baptist’s execution and Jesus’s interrogation.
// BIBLE REFERENCE: Luke 23:6-12; Matthew 14:1-12; Luke 8:3
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Psalm 2:1-2
//     Gospel: Luke 23:12
//     Insight: Herod and Pilate, formerly enemies, became friends that day—the rulers of the earth banding together against the Anointed.
//   - Isaiah 53:7
//     Gospel: Luke 23:9
//     Insight: Jesus 'opened not his mouth' before Herod's questioning, fulfilling the prophecy of the silent Lamb.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Herod Antipas, superstitious and fearful of John the Baptist's ghost, interrogate Jesus during the trial phase.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   Culprit: none
//   Motive: Political and spiritual curiosity leading to mockery and rejection.
//

-> start
=== start ===
I have served in the house of Antipas long enough to know when the air turns sour. My master is a man haunted by ghosts. Ever since the business with the Baptist in the dungeon of Machaerus, he jumps at every shadow.
* [The Baptist's beheading?] -> baptist
* [He met the Nazarene?] -> jesus_meeting

=== baptist ===
A grim night. A dance, a drunken promise, and a head on a platter. Herod didn't want to do it—he feared the man—but he feared his guests more. Now he thinks Jesus is John come back from the grave to claim his own.
* [And when Jesus arrived?] -> jesus_meeting

=== jesus_meeting ===
They sent Him from Pilate like a gift. Herod was delighted. He wanted a miracle—a magic trick to entertain the court. He asked a hundred questions, shouting, demanding, pleading.
* [How did Jesus respond?] -> silence

=== silence ===
Silence. Absolute, crushing silence. The King of the Jews didn't say a word. He stood there in a royal robe they threw on Him for a joke, looking at Herod as if He were the judge and the Tetrarch the prisoner.
* [Herod didn't like that.] -> reaction

=== reaction ===
He mocked Him. The soldiers joined in. But beneath the laughter, I saw Herod's hands shaking. You don't mock a man who carries that kind of silence unless you are terrified of what He represents.
* [Continue.] -> closing

=== closing ===
My wife, Joanna, is out there somewhere following Him. She saw the healing power Herod so desperately wanted to consume for sport. I stay here, in a palace built on blood and regret, recording the end of an era. Go quickly—the guards are returning.
-> DONE
```

### temple_curtain.ink
```ink
// ============================================================
// CHARACTER: Pashhur (Temple Priest)
// ACT: Act III
// CASE: The Curtain and the Cross
// CASE EXPORT: crucifixion_site
// SOURCE: temple_curtain.ink
// BACKGROUND: A Temple priest on duty when the veil tore and the earthquake struck.
// BIBLE REFERENCE: Matthew 27:45-54; Mark 15:33-39; Luke 23:44-49
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Amos 8:9
//     Gospel: Mark 15:33
//     Insight: The midday darkness was a cosmic sign of judgment and mourning, precisely as Amos predicted centuries earlier.
//   - Psalm 22:1
//     Gospel: Matthew 27:46
//     Insight: The cry of abandonment from the cross coincided with the structural failure of the Temple's inner boundaries.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: At the moment of Jesus's death, the heavy curtain shielding the Holy of Holies was torn in half from top to bottom.
//   Significance: The top-down tear signifies that the barrier between God and man was removed by God Himself.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   Culprit: none
//   Motive: Structural and spiritual transformation at the moment of sacrifice.
//

-> start
=== start ===
It was three in the afternoon, yet I had to carry a lamp to see my own feet. The darkness wasn't just a shadow; it was a weight that choked the breath out of the city. I was preparing the evening incense when the foundations of the Temple began to groan.
* [Tell me about the darkness.] -> darkness
* [What happened to the Temple curtain?] -> curtain

=== darkness ===
The sun vanished at midday. For three hours, the city was silent, save for the sound of weeping and the rattling of Roman armor. No eclipse lasts that long, scribe. It felt as if the Creator had turned His face away from the world. And then, the earth itself broke.
* [Was it just a tremor?] -> tombs

=== curtain ===
The Parokhet—the great inner curtain—is as thick as a man's palm. It would take a team of oxen to pull it apart. But when the ground shook, I heard a sound like a great sail ripping in a gale. I looked up, and it was gone. Torn clean in two, from the top down to the floor.
* [Top to bottom?] -> exposed

=== tombs ===
The limestone rifts split the valley outside the walls. My brothers came running from the eastern gate, white as ghosts. They said the ancient tombs broke open. Figures were seen... shadows in the dust that shouldn't have been there.
* [Continue.] -> closing

=== exposed ===
To tear from the top... that is the hand of God, not the hands of men. The Holy of Holies was laid bare to the sky. The secret place was secret no longer.
* [Continue.] -> closing

=== closing ===
The sacrifice was finished. The man on the hill died, and the Temple's heart broke. I cannot unsee the empty space behind that curtain.
-> DONE
```

### centurion_witness.ink
```ink
// ============================================================
// CHARACTER: Centurion Longinus (Roman Executioner)
// ACT: Act III
// CASE: The Curtain and the Cross
// CASE EXPORT: crucifixion_site
// SOURCE: centurion_witness.ink
// BACKGROUND: The Roman officer who oversaw the execution and delivered the spear thrust.
// BIBLE REFERENCE: Matthew 27:45-54; John 19:28-37; Luke 23:36-47; Matthew 27:52-53
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Psalm 22:15 (Thirst)
//   - Zechariah 12:10 (The Pierced One)
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: The Roman detail witnesses the cosmic signs (darkness, earthquake, ghosts) surrounding the death of Jesus.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   Culprit: none
//   Motive: Execution duty turning into a conversion experience.
// ============================================================

-> start
=== start ===
I have broken shield walls from Gaul to the Euphrates, but I have never seen a man die like this. It was noon, yet the sun simply vanished. The darkness was so thick I had to light a torch just to read the charge above His head.
* [The sky went black?] -> darkness
* [What happened to the man?] -> jesus_death

=== darkness ===
It wasn't an eclipse. Those are predictable. This was a shroud. For three hours, the birds went silent and the only light came from our lanterns. Even the thieves hanging next to Him stopped cursing.
* [What did you say to the thieves?] -> thieves

=== thieves ===
One wretch was cursing God, but the other... he spoke to the Nazarene as if He were a General. He asked to be remembered. I told him to save his breath for the agony, but the Nazarene offered him a kingdom instead.
* [Did the Nazarene speak again?] -> sponge

=== sponge ===
He said, 'I thirst.' I took a sponge, soaked it in the sour wine we keep for the guard, and lifted it to His lips on a hyssop branch. It was a final mercy for a man whose lungs were failing.
* [And then the end came?] -> jesus_death

=== jesus_death ===
He didn't scream. He commanded. 'It is finished,' He said, and then He gave up His spirit. That's when the earth broke. The rocks of Golgotha split right beneath my boots, and my men fell on their faces.
* [What happened when the rocks split?] -> ghosts
* [Did you verify the death?] -> spear

=== ghosts ===
The limestone rifts didn't just crack—they opened. My men were screaming. They saw figures... shadows rising from the dust of the ancient tombs. They looked like the holy men of old, walking toward the city gates in the gloom.
* [How did you verify His death?] -> spear

=== spear ===
To satisfy the record, I took my hasta—my spear. I drove the iron into His side, right between the ribs. Blood and water came rushing out in two distinct streams. I dropped my weapon and told my men the truth: Truly, this man was the Son of God.
* [Continue.] -> closing

=== closing ===
The hill is empty now. A wealthy counselor took the body. But I suspect your investigation is only beginning, scribe. 
-> DONE
```

---

## 🌌 ACT IV: THE CONDEMNATION MACHINE

### pontius_pilate.ink
```ink
// ============================================================
// CHARACTER: Pontius Pilate (and the warning of Claudia Procula)
// ACT: Act IV
// CASE: The Imperial Legality
// CASE EXPORT: roman_trial
// SOURCE: pontius_pilate.ink
// BACKGROUND: The Roman Prefect of Judea, responsible for imperial tax collections and security.
// BIBLE REFERENCE: Matthew 27:11-26; John 18:28-40
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 53:7 (Silence)
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Pilate finds no fault in Jesus but succumbs to the political pressure of the mob and the Sanhedrin.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   Culprit: none (legal verdict), Barabbas (released)
//   Motive: Political preservation over moral justice.
// ============================================================

-> start
=== start ===
Am I an expert in your laws, Judean? Your priests drag this man to my praetorium at dawn and expect me to sign a death warrant for words. But the disturbance is not only in the streets; it has entered my own sleeping chambers. 
* [Your wife sent a message?] -> wifes_warning
* [You don't see Him as a threat?] -> threat
* [The crowd wants Barabbas.] -> barabbas

=== wifes_warning ===
She is a Roman of noble blood, not given to the superstitions of this province. Yet she sent a frantic note to the judgement seat: 'Have nothing to do with that righteous man.' She has suffered a great deal in a dream today because of him.
* [Does her dream worry you?] -> truth_question

=== truth_question ===
What is truth to a man holding three legions? I asked him the same. He spoke of a kingdom not of this world. My wife sees a righteous man; the Sanhedrin sees a rebel. I see a man who makes the silence heavier than a shield wall.
* [But you will execute Him.] -> crowd_response

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
"Jesus of Nazareth, King of the Jews." That is the titulus I authorised. The priests complained. I told them: what is written, is written.
* [Continue.] -> closing

=== closing ===
I have no further comments for your investigation. The matter is concluded.
-> DONE
```

---

## 🛡️ GLOBAL / SYSTEMIC OVERLAYS

### board_debate.ink
```ink
// ============================================================
// CHARACTER: Senior Scribe - Debate
// ACT: Global / Board
// CASE: Investigation Board
// CASE EXPORT: investigation_board
// SOURCE: board_debate.ink
// BACKGROUND: An aging Judean archival compiler monitoring the player.
// BIBLE REFERENCE: Isaiah 5, Jeremiah 31:31-34
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: A synthesis of the evidence uncovering the deeper theological implications of the trial.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   Culprit: N/A
//   Motive: Finalization of the investigative record.
// ============================================================

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
But there is a final category, Maluch—one that no archive can fully contain. They think they are taking His life, but He is giving it up. This is not just a trial in a Judean court; it is the moment where heaven itself descends to touch the dust. He is the Son of God, delivering Himself up for the sins of the world. Write that, apprentice. For that is the only truth that will endure when these stones are gone.
-> DONE
```