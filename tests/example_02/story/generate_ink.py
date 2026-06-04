import os

story_dir = "/Users/nigelmorris/Documents/GitHub/Miracle Maker/tests/example_02/story"

if not os.path.exists(story_dir):
    os.makedirs(story_dir)

ink_contents = {}

# --- CASE B: BETHANY / LAZARUS CONSPIRACY NPCs ---

ink_contents["annas_highpriest.ink"] = """\
// ============================================================
// CHARACTER: Annas (High Priest Emeritus)
// ACT: Act II
// CASE: The Lazarus Conspiracy
// CASE EXPORT: lazarus_plot
// SOURCE: annas_highpriest.ink
// BACKGROUND: The elder statesman and former High Priest; the hidden kingmaker.
// STORY: Act II - The Lazarus Conspiracy and the 'Price of Life' decree.
// CHARACTERS: Annas (High Priest Emeritus).
// BIBLE VERSES: John 11:45-53; John 18:13-24.
// BIBLE REFERENCE: John 18:13
// PROPHECIES: Psalm 2:1-2 ('Why do the nations conspire?').
// PROPHECIES FULFILLED IN THIS CASE: Psalm 2:1-2
// BIBLICAL CONTEXT: Summary: The Sanhedrin's response to the resurrection of Lazarus.
// CASE FACTS (Truth Object): Culprit: none (institutional decision). Motive: Security preservation.
// ============================================================

-> start
=== start ===
Governments are not built on passion, scribe. They are built on stone and historical continuity. I have watched procurators come and go, but the Temple remains. This Lazarus business is a theological contamination we cannot ignore. A man who stops being dead is a monument to a power we do not control.

* [Why bring him in at midnight instead of open day?] -> mechanics
* [Do you fear his popularity after the Bethany miracle?] -> popularity
* [What evidence did your spies gather at Simon's house?] -> evidence_request
* [Press: The 'Price of Life' decree was your idea.] -> pressure
* [Change angle: Nicodemus seems divided.] -> pivot

=== mechanics ===
Daylight belongs to the crowds. Silence allows for careful administrative evaluation. We needed a verdict on the Lazarus 'incident' before the city woke for Passover.

* [Press harder: Who sleeps while a miracle breathes?] -> pressure
* [Soften: I understand the need for order.] -> popularity

=== popularity ===
A crowd that shouts 'Hosanna' for a healer will shout something entirely different by Friday if the narrative shifts. Popularity is water. We simply redirected the flow.

* [Accept: You are redirecting history.] -> closing
* [Challenge: That makes you a manipulator.] -> exposed

=== evidence_request ===
My household reported that when the Galilean called him out, not a single witness called for the legions. They called for the priests. That tells me where authority truly lives.

* [Continue.] -> mechanics

=== pressure ===
Caiaphas said it was expedient. One man dies, the nation survives. We all understood the arithmetic. The 'Price of Life' was decided at sunset. We needed the tomb closed again.

* [Acknowledge: You voted for a second death.] -> closing
* [Challenge: History will judge this calculation.] -> exposed

=== pivot ===
Nicodemus likes to walk in the dark and ask about 'mercy.' He forgets that procedure is the shield of the weak. He is a seeker of signs; I am a guardian of the Law.

* [Continue.] -> pressure

=== exposed ===
You want the full truth? The evidence of the resurrection was undeniable. That is exactly why it was dangerous. A living miracle ruins a political consensus. We had to manufacture a contradiction before the truth burned the Temple down.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

ink_contents["martha_bethany.ink"] = """\
// STORY: Act II - Witnessing the miracle of Lazarus.
// CHARACTERS: Martha of Bethany.
// BIBLE VERSES: John 11:17-44; Luke 10:38-42.
// PROPHECIES: Isaiah 26:19 ('Your dead will live, LORD; their bodies will rise').

-> start
=== start ===
The kitchen is full, the road is watched, and my brother is a target. I saw the stone roll away. I smelled the spices of burial on him as he walked out. I do not need a scribe to tell me what my own eyes have seen.

* [What was Lazarus like when he first came out?] -> the_miracle
* [Are the High Priest's spies watching this house?] -> spies
* [Press: Tell me about the 'Price of Life' decree.] -> pressure
* [Soften: You have carried a heavy burden.] -> comfort

=== the_miracle ===
He was wrapped in linen, blinking at the sun like a newborn. He didn't speak for an hour. He just looked at Jesus. There was a peace in the yard that the Temple guards could never understand.

* [Accept: It was a divine moment.] -> closing
* [Ask follow-up: What did the crowd do?] -> spies

=== spies ===
They sit at the edge of the olive grove. They think they are invisible, but I see them every time I draw water. They aren't looking for Jesus; they are looking for Lazarus. They want to bury the evidence.

* [Accept: You are protecting the proof.] -> closing
* [Challenge: Why not run?] -> pressure

=== pressure ===
They sent a scroll. A 'Secret Decree.' It said the presence of Lazarus was 'theological contamination.' That's a fancy way of saying they want my brother back in the ground.

* [Acknowledge: The conspiracy is real.] -> closing
* [Challenge: Will you testify?] -> exposed

=== comfort ===
I do what I must. Mary listens, I serve, and Lazarus lives. That is enough for today. But the shadows on the road are growing longer.

* [Move forward.] -> closing

=== exposed ===
I saw Nicodemus come here at midnight. He warned us. He said the vote in the Sanhedrin was already weighted. He risked his life to tell us to hide Lazarus. If a man like Nicodemus is afraid, we should all be.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

ink_contents["nicodemus_conflicted.ink"] = """\
// STORY: Act II - The secret search for truth from within the Sanhedrin.
// CHARACTERS: Nicodemus (The Pharisee).
// BIBLE VERSES: John 3:1-21; John 7:50-52; John 19:39.
// PROPHECIES: Jeremiah 29:13 ('You will seek me and find me').

-> start
=== start ===
I prefer the shadows of the evening. The Sanhedrin is a bright, loud place where truth is often shouted down. I have been watching the Nazarene. I have spoken to him when the city was asleep. He doesn't speak like a revolutionary... he speaks like the Law itself.

* [Why did you go to him at night?] -> night_visit
* [What is the mood of the Council regarding Lazarus?] -> council_mood
* [Press: You are afraid to stand for him openly.] -> pressure
* [Probe: What is the 'Secret Decree'?] -> probe_decree

=== night_visit ===
Because I am a teacher of Israel, and I had questions that daylight could not answer. He told me I must be born again. I am still trying to understand what that means for a man of my age and standing.

* [Accept: It is a difficult teaching.] -> closing
* [Ask follow-up: Did he mention the Temple?] -> council_mood

=== council_mood ===
They are in a panic. Caiaphas sees only the Romans. Annas sees only power. The miracle at Bethany has forced their hand. They cannot argue with a man who was dead, so they intend to silence him.

* [Acknowledge: The conspiracy is deep.] -> closing
* [Challenge: You are part of that Council.] -> exposed

=== pressure ===
I am a coward, is that what you think? Perhaps. I have my position, my family, my reputation. But I have also seen the light in his eyes. I am trying to work from within, but the walls are closing in.

* [Acknowledge: You are in a difficult position.] -> closing
* [Challenge: At some point, you must choose.] -> exposed

=== probe_decree ===
The decree is a stain on our history. It targets Lazarus specifically. They want to eliminate the witness to the miracle before the Passover begins. I have seen the draft in Annas's study.

* [Move forward.] -> pressure

=== exposed ===
I was the one who leaked the location of the guards to Martha. I couldn't let them take him in the dark. I am a member of the Sanhedrin, yes, but I am first a seeker of the Truth. And the Truth is currently eating bread in Bethany.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

ink_contents["simon_leper.ink"] = """\
// STORY: Act II - Testimony of social healing and preparation for burial.
// CHARACTERS: Simon the Leper.
// BIBLE VERSES: Matthew 26:6-13; Mark 14:3-9.
// PROPHECIES: Isaiah 53:3-4 ('Surely he took up our pain and bore our suffering').

-> start
=== start ===
My house was a place of exclusion once. Now, it is a place where the Son of God eats. The perfume Mary poured on him... the scent is still in the rafters. The disciples grumbled about the cost, but Jesus saw it as a preparation.

* [Why do the disciples grumble?] -> grumbling
* [What happened to your leprosy?] -> healing
* [Press: Was the High Priest's man here?] -> pressure
* [Probe: What did Jesus say about his burial?] -> probe_burial

=== grumbling ===
They think in coins. They see a year's wages spilled on the floor. They don't see that he is giving a life's worth of love in return. Judas was the loudest. He has a ledger where his heart should be.

* [Accept: Love cannot be measured in silver.] -> closing
* [Challenge: Judas has a point about the poor.] -> exposed

=== healing ===
He touched me. Nobody touches a leper. The Law says I am unclean, but his touch made the Law irrelevant. I am clean because he willed it. My house is his house now.

* [Continue.] -> grumbling

=== pressure ===
A man in a Temple robe came to the door yesterday. He didn't come to eat. He came to count the guests. He asked if Lazarus was here. I told him the King's table is open to all, but his eyes were cold.

* [Acknowledge: The Temple is monitoring you.] -> closing
* [Challenge: You should have turned him away.] -> exposed

=== probe_burial ===
He said she was anointing him for his burial. He said it so calmly, while we were all laughing and eating. It was as if he was already looking past the cross.

* [Move forward.] -> pressure

=== exposed ===
The Temple spy left a silver coin on the table. A bribe to tell them when Jesus leaves for the Garden. I threw it into the street. I have been clean long enough to know the smell of corruption.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# --- UTILITY TO WRITE ALL FILES ---
for filename, content in ink_contents.items():
    filepath = os.path.join(story_dir, filename)
    with open(filepath, "w") as f:
        f.write(content)
    print(f"Generated: {filepath}")