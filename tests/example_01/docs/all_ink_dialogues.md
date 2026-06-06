# Ink Dialogue Catalog

This document tracks the narrative flow and content of the Ink stories used in the Miracle Maker project.

---

## Peter's Donkey (`peter_donkey.json`)

> **Background:** A lead disciple of Jesus, sent ahead to Bethphage to retrieve a donkey colt for the entry into Jerusalem.
> **Act/Case:** Act I | The Missing Donkey
> **Bible Reference:** Matthew 21:1-11; Mark 11:1-11
> **Prophecy:** Zechariah 9:9 (The King comes on a donkey)

**Node: start**
> "Jesus sent us ahead. He told us exactly where to find the colt and what to say if anyone questioned us. We weren't stealing anything! The Lord had authorised this."
*   **Choice:** "Tell me about the cloaks." &rarr; `cloaks`
*   **Choice:** "What about the rope at the post?" &rarr; `rope`

**Node: cloaks**
> "Those are mine and John's cloaks. We used them as a saddle for the colt because it had never been ridden — we didn't want it to bolt on the road."
*   **Choice:** "And the rope?" &rarr; `rope`

**Node: rope**
> "John untied the rope — he didn't cut it. I don't know how it ended up cut. We were in a hurry to get back to the main crowd."
*   **Choice:** "Continue." &rarr; `closing`

**Node: closing**
> "The King is coming, and He's coming in peace. That's all you need to know."
*   *Status: Conversation ends.*

---

## Annas the Patriarch (`annas_patriarch.json`)

> **Background:** Former High Priest and patriarch of the family controlling the Temple. He views Jesus' miracles not as divine signs, but as political threats to the fragile peace with Rome.
> **Act/Case:** Act II | The Lazarus Conspiracy
> **Bible Reference:** John 11:45-53; John 18:13-24
> **Prophecy:** Psalm 2:1-2 (Rulers plotting against the Anointed)
> **Historical Note:** The 'Price of Life' refers to the decision that it was 'expedient that one man should die for the people' to save the nation from Roman wrath.
> **Significance:** This miracle was the catalyst for the final decision to execute Jesus, as it proved He could not be ignored or easily discredited.

**Node: start**
> "Governments are not built on passion, scribe. They are built on stone and historical continuity. I have watched procurators come and go, but the Temple remains. This Lazarus business is a theological contamination we cannot ignore. A man who stops being dead is a monument to a power we do not control."
*   **Choice:** "Why bring him in at midnight instead of open day?" &rarr; `mechanics`
*   **Choice:** "Do you fear his popularity after the Bethany miracle?" &rarr; `popularity`
*   **Choice:** "What evidence did your spies gather at Simon's house?" &rarr; `evidence_request`
*   **Choice:** "Press: The 'Price of Life' decree was your idea." &rarr; `pressure`
*   **Choice:** "Change angle: Nicodemus seems divided." &rarr; `pivot`

**Node: mechanics**
> "Daylight belongs to the crowds. Silence allows for careful administrative evaluation. We needed a verdict on the Lazarus 'incident' before the city woke for Passover."
*   **Choice:** "Press harder: Who sleeps while a miracle breathes?" &rarr; `pressure`
*   **Choice:** "Soften: I understand the need for order." &rarr; `popularity`

**Node: popularity**
> "A crowd that shouts 'Hosanna' for a healer will shout something entirely different by Friday if the narrative shifts. Popularity is water. We simply redirected the flow."
*   **Choice:** "Accept: You are redirecting history." &rarr; `closing`
*   **Choice:** "Challenge: That makes you a manipulator." &rarr; `exposed`

**Node: evidence_request**
> "My household reported that when the Galilean called him out, not a single witness called for the legions. They called for the priests. That tells me where authority truly lives."
*   **Choice:** "Continue." &rarr; `mechanics`

**Node: pressure**
> "Caiaphas said it was expedient. One man dies, the nation survives. We all understood the arithmetic. The 'Price of Life' was decided at sunset. We needed the tomb closed again."
*   **Choice:** "Acknowledge: You voted for a second death." &rarr; `closing`
*   **Choice:** "Challenge: History will judge this calculation." &rarr; `exposed`

**Node: pivot**
> "Nicodemus likes to walk in the dark and ask about 'mercy.' He forgets that procedure is the shield of the weak. He is a seeker of signs; I am a guardian of the Law."
*   **Choice:** "Continue." &rarr; `pressure`

**Node: exposed**
> "You want the full truth? The evidence of the resurrection was undeniable. That is exactly why it was dangerous. A living miracle ruins a political consensus. We had to manufacture a contradiction before the truth burned the Temple down."
*   **Choice:** "Move forward." &rarr; `closing`

**Node: closing**
*   *Status: Conversation ends.*

---

## Martha of Bethany (`martha_bethany.json`)

> **Background:** A practical and devoted follower who witnessed the resurrection of her brother in Bethany. She now guards her household against growing Temple surveillance.
> **Act/Case:** Act II | The Lazarus Conspiracy
> **Bible Reference:** John 11:17-44; Luke 10:38-42
> **Prophecy:** Isaiah 26:19 (Your dead will live, bodies rise)
> **Historical Note:** Bethany was close enough to Jerusalem (about 2 miles) that word of the miracle reached the Sanhedrin almost immediately, sparking the final plot.
> **Significance:** Martha's testimony provides the intimate family perspective on a miracle that terrified the religious establishment.

**Node: start**
> "The kitchen is full, the road is watched, and my brother is a target. I saw the stone roll away. I smelled the spices of burial on him as he walked out. I do not need a scribe to tell me what my own eyes have seen."
*   **Choice:** "What was Lazarus like when he first came out?" &rarr; `the_miracle`
*   **Choice:** "Are the High Priest's spies watching this house?" &rarr; `spies`
*   **Choice:** "Press: Tell me about the 'Price of Life' decree." &rarr; `pressure`
*   **Choice:** "Soften: You have carried a heavy burden." &rarr; `comfort`

**Node: the_miracle**
> "He was wrapped in linen, blinking at the sun like a newborn. He didn't speak for an hour. He just looked at Jesus. There was a peace in the yard that the Temple guards could never understand."
*   **Choice:** "Accept: It was a divine moment." &rarr; `closing`
*   **Choice:** "Ask follow-up: What did the crowd do?" &rarr; `spies`

**Node: spies**
> "They sit at the edge of the olive grove. They think they are invisible, but I see them every time I draw water. They aren't looking for Jesus; they are looking for Lazarus. They want to bury the evidence."
*   **Choice:** "Accept: You are protecting the proof." &rarr; `closing`
*   **Choice:** "Challenge: Why not run?" &rarr; `pressure`

**Node: pressure**
> "They sent a scroll. A 'Secret Decree.' It said the presence of Lazarus was 'theological contamination.' That's a fancy way of saying they want my brother back in the ground."
*   **Choice:** "Acknowledge: The conspiracy is real." &rarr; `closing`
*   **Choice:** "Challenge: Will you testify?" &rarr; `exposed`

**Node: comfort**
> "I do what I must. Mary listens, I serve, and Lazarus lives. That is enough for today. But the shadows on the road are growing longer."
*   **Choice:** "Move forward." &rarr; `closing`

**Node: exposed**
> "I saw Nicodemus come here at midnight. He warned us. He said the vote in the Sanhedrin was already weighted. He risked his life to tell us to hide Lazarus. If a man like Nicodemus is afraid, we should all be."
*   **Choice:** "Move forward." &rarr; `closing`

**Node: closing**
*   *Status: Conversation ends.*

---

## Nicodemus (`nicodemus_conflicted.json`)

> **Background:** A Pharisee and member of the Sanhedrin who seeks the truth in secret. He is torn between his position in the Council and his growing conviction that Jesus is from God.
> **Act/Case:** Act II | The Lazarus Conspiracy
> **Bible Reference:** John 3:1-21; John 7:50-52; John 19:39
> **Prophecy:** Jeremiah 29:13 (Seeking and finding the Lord)
> **Historical Note:** As a 'ruler of the Jews,' Nicodemus risked his entire social and political standing by associating with the Nazarene.
> **Significance:** Nicodemus provides the 'insider' view of the Sanhedrin's deliberations and the growing legal conspiracy against Jesus.

**Node: start**
> "I prefer the shadows of the evening. The Sanhedrin is a bright, loud place where truth is often shouted down. I have been watching the Nazarene. I have spoken to him when the city was asleep. He doesn't speak like a revolutionary... he speaks like the Law itself."
*   **Choice:** "Why did you go to him at night?" &rarr; `night_visit`
*   **Choice:** "What is the mood of the Council regarding Lazarus?" &rarr; `council_mood`
*   **Choice:** "Press: You are afraid to stand for him openly." &rarr; `pressure`
*   **Choice:** "Probe: What is the 'Secret Decree'?" &rarr; `probe_decree`

**Node: night_visit**
> "Because I am a teacher of Israel, and I had questions that daylight could not answer. He told me I must be born again. I am still trying to understand what that means for a man of my age and standing."
*   **Choice:** "Accept: It is a difficult teaching." &rarr; `closing`
*   **Choice:** "Ask follow-up: Did he mention the Temple?" &rarr; `council_mood`

**Node: council_mood**
> "They are in a panic. Caiaphas sees only the Romans. Annas sees only power. The miracle at Bethany has forced their hand. They cannot argue with a man who was dead, so they intend to silence him."
*   **Choice:** "Acknowledge: The conspiracy is deep." &rarr; `closing`
*   **Choice:** "Challenge: You are part of that Council." &rarr; `exposed`

**Node: pressure**
> "I am a coward, is that what you think? Perhaps. I have my position, my family, my reputation. But I have also seen the light in his eyes. I am trying to work from within, but the walls are closing in."
*   **Choice:** "Acknowledge: You are in a difficult position." &rarr; `closing`
*   **Choice:** "Challenge: At some point, you must choose." &rarr; `exposed`

**Node: probe_decree**
> "The decree is a stain on our history. It targets Lazarus specifically. They want to eliminate the witness to the miracle before the Passover begins. I have seen the draft in Annas's study."
*   **Choice:** "Move forward." &rarr; `pressure`

**Node: exposed**
> "I was the one who leaked the location of the guards to Martha. I couldn't let them take him in the dark. I am a member of the Sanhedrin, yes, but I am first a seeker of the Truth. And the Truth is currently eating bread in Bethany."
*   **Choice:** "Move forward." &rarr; `closing`

**Node: closing**
*   *Status: Conversation ends.*

---

## Simon the Leper (`simon_leper.json`)

> **Background:** Once an outcast, now a host. His house in Bethany became a refuge for Jesus and a place where the preparation for His burial began through Mary's anointing.
> **Act/Case:** Act II | The Lazarus Conspiracy
> **Bible Reference:** Matthew 26:6-13; Mark 14:3-9
> **Prophecy:** Isaiah 53:3-4 (He bore our pain and suffering)
> **Historical Note:** Hosting a dinner for Jesus and Lazarus made Simon's house a focal point for Temple spies tracking the movement.
> **Significance:** Simon represents those restored from the margins of society who offer hospitality to the King, contrasting with the hostility of the elites.

**Node: start**
> "My house was a place of exclusion once. Now, it is a place where the Son of God eats. The perfume Mary poured on him... the scent is still in the rafters. The disciples grumbled about the cost, but Jesus saw it as a preparation."
*   **Choice:** "Why do the disciples grumble?" &rarr; `grumbling`
*   **Choice:** "What happened to your leprosy?" &rarr; `healing`
*   **Choice:** "Press: Was the High Priest's man here?" &rarr; `pressure`
*   **Choice:** "Probe: What did Jesus say about his burial?" &rarr; `probe_burial`

**Node: grumbling**
> "They think in coins. They see a year's wages spilled on the floor. They don't see that he is giving a life's worth of love in return. Judas was the loudest. He has a ledger where his heart should be."
*   **Choice:** "Accept: Love cannot be measured in silver." &rarr; `closing`
*   **Choice:** "Challenge: Judas has a point about the poor." &rarr; `exposed`

**Node: healing**
> "He touched me. Nobody touches a leper. The Law says I am unclean, but his touch made the Law irrelevant. I am clean because he willed it. My house is his house now."
*   **Choice:** "Continue." &rarr; `grumbling`

**Node: pressure**
> "A man in a Temple robe came to the door yesterday. He didn't come to eat. He came to count the guests. He asked if Lazarus was here. I told him the King's table is open to all, but his eyes were cold."
*   **Choice:** "Acknowledge: The Temple is monitoring you." &rarr; `closing`
*   **Choice:** "Challenge: You should have turned him away." &rarr; `exposed`

**Node: probe_burial**
> "He said she was anointing him for his burial. He said it so calmly, while we were all laughing and eating. It was as if he was already looking past the cross."
*   **Choice:** "Move forward." &rarr; `pressure`

**Node: exposed**
> "The Temple spy left a silver coin on the table. A bribe to tell them when Jesus leaves for the Garden. I threw it into the street. I have been clean long enough to know the smell of corruption."
*   **Choice:** "Move forward." &rarr; `closing`

**Node: closing**
*   *Status: Conversation ends.*

---

## Teaching on the Mount (`teaching_mount.json`)

> **Background:** A teacher from the Mount of Olives area who heard Jesus's direct teaching. They share wisdom from the gatherings.
> **Act/Case:** Act II | The Lazarus Conspiracy
> **Bible Reference:** Matthew 5-7 (Sermon on the Mount)
> **Prophecy:** Psalm 118:22–23 (The rejected stone becomes the cornerstone)
> **Historical Note:** The Mount of Olives provided a natural amphitheater for large crowds.
> **Significance:** These teachings established Jesus's authority over the Law.

**Node: start**
> "You walked up Mount Olivet. Most people approach Jerusalem and see only walls. He spoke in parables. People laughed, left, or argued. Then He asked the question."
*   **Choice:** "What question?" &rarr; `question`
*   **Choice:** "The crowd's reaction?" &rarr; `crowd_reaction`

**Node: question**
> "He asked about the stone the builders rejected. The stone that becomes the cornerstone. The crowd was silent after that. Some looked confused. Some looked... afraid."
*   **Choice:** "Afraid of what?" &rarr; `closing`

**Node: closing**
> "He spoke as someone who owned the Law, not merely interpreted it. That was the most unsettling thing of all."
*   *Status: Conversation ends.*

---

*Last updated: Compiled from Ink JSON Source*