// ============================================================
// CHARACTER: Pontius Pilate (Temple Cleansing Assessment)
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// SOURCE: NPC 'pontius_pilate' (Temple cleansing perspective)
// BIBLE REFERENCE: John 2:13-17; Psalm 69:9
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Psalm 69:9 — "Zeal for your house will consume me"
//     Gospel: John 2:17 — Jesus's disciples recognised the prophecy
//     Insight: The cleansing was not random zeal — it was the Messiah's
//       consuming zeal for the purity of worship, foretold by David.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Pontius Pilate assesses the Temple disturbance reported by
//   the chief priests. He investigates and finds not rebellion, but
//   prophetic reform — a single man with a whip of rushes and a message.
//   His report contradicts the priests' sedition narrative.
//   Significance: From the Roman perspective, Jesus's actions threaten
//   religious authority, not Roman rule.
// ============================================================

-> start

=== start ===
* [not yet] -> not_yet
I am Pontius Pilate, governor of Judea. I have no interest in your Jewish temple disputes. I deal in order, not theology.

But a disturbance in the Court of the Gentiles is a Roman concern. The priests came to me this morning, pale-faced, claiming insurrection.

I investigated personally. What I found was not rebellion. It was a single man with a whip of rushes and a message.

* [What did you find at the scene?] -> scene
* [Did you see the Galilean?] -> galilean

=== scene ===
The money tables were overturned. Dove cages broken. But the silver — the Tyrian shekels — was scattered, not stolen. The birds were released, not captured.

A thief takes. A zealot destroys. This man... discarded the instruments of corruption and left the merchants standing there, unharmed.

That is not insurrection. That is contempt.

* [Why didn't you arrest Him?] -> justice
* [What did the priests say?] -> priests

=== galilean ===
I saw Him from the parapet. He stood in the middle of the court, surrounded by merchants cowering on the ground. He said nothing. Just looked at them.

When He left, the crowd followed Him like sheep. Not a weapon among them. Not a threat to Rome. Just... a man on a mission.

* [What mission?] -> mission
* [That sounds dangerous.] -> dangerous

=== mission ===
His disciples quoted a Psalm afterward. "Zeal for your house will consume me." Psalm 69. David wrote it about the temple. This man... He lived it.

I have crucified men for less. But this one... He has a fire in Him that does not come from Rome.

* [That fire could burn your province.] -> burning
* [Then He is a prophet, not a rebel.] -> prophet

=== dangerous ===
Dangerous? A man who destroys property without shedding blood is not dangerous to Rome. He is dangerous to the priesthood.

And the priests know it. That is why they are so angry. Not because of the shekels. Because He exposed their system for what it is: a profit margin dressed in incense.

* [Will they try to arrest Him?] -> arrest
* [And your role?] -> role

=== justice ===
Arrest Him for what? Cleaning up a market? The Romans do not execute men for disturbing Jewish commerce. That is their problem. Their sacred business.

Unless... unless the priests make it my problem. They are already framing this as sedition. They will say the Galilean incited the crowd to violence.

* [Did He?] -> violence
* [Will you believe them?] -> believe

=== priests ===
The high priest's household came to me personally. They used the word 'insurrection.' They showed me overturned tables and scattered coins.

I asked them: where are the dead? Where are the wounded? Where is the Roman damage? They had no answer.

Because there was none. This was a domestic theological dispute. Not a Roman concern. Not yet.

* [Not yet?] -> yet
* [So you dismissed them?] -> dismissed

=== burning ===
Let it burn. The temple system is rotten. The priests line their pockets with temple tax while the poor bring doves they cannot afford. I have watched this for years.

But a province that burns is a province Rome must pacify. And pacification is ugly. I have crucified entire villages for less than this.

* [And yet you did nothing.] -> nothing
* [You fear what He might become.] -> become

=== prophet ===
A prophet. Yes. That is what He claims to be. And prophets are more dangerous than rebels. Rebels can be crucified. Prophets... cannot be killed so easily.

The priests understand this. That is why they are so afraid. They can deal with a military messiah. They cannot deal with a man who quotes their own Scriptures and turns their own courts against them.

* [What will you do?] -> closing
* [This will end badly.] -> badly

=== arrest ===
They are already plotting. I have informants in the Sanhedrin. They want Him arrested for blasphemy — their charge, not mine.

But they cannot execute Him without Roman approval. And I will not sign a death warrant for a man who has committed no crime against Rome.

* [Not yet.] -> closing
* [You sounded uncertain.] -> uncertain

=== role ===
My role is to keep the peace. If the Galilean continues to disrupt the temple courts, the priests will incite the crowd. The crowd will turn on Rome.

And I will have no choice but to send in the cohorts. Not to protect the priests. To protect the Pax Romana.

* [And if the crowd turns on the priests instead?] -> closing
* [Then you will crucify an innocent man.] -> closing
* [Conclude.] -> closing

=== violence ===
Did He? I watched from the Antonia fortress. I saw the dove cages break. I saw the coins scatter. I did not see a single sword. Not a single stone thrown.

The priests will say there was violence. They will fabricate witnesses. They always do. But my record will say: a man with a whip of reeds. A temple full of scattered coins. A crowd of terrified merchants.

* [That record may not save Him.] -> save
* [And your conscience?] -> conscience

=== yet ===
Not yet. But the priests will not let this go. They will find a way to make it my problem. They will fabricate a sedition charge. They will bring Him to my praetorium.

And when they do... I will have to choose. Between a prophet and a province. Between justice and peace.

* [Choose justice.] -> justice_choice
* [Choose peace.] -> peace_choice

=== dismissed ===
I dismissed them. Politely. I told them the disturbance was domestic. I told them to handle their own prophet.

But they will not stop. They are already planning. I can see it in their eyes. They want Him dead. And they will use my court to do it.

* [Will you let them?] -> let_them
* [You are a pawn in their game.] -> pawn

=== nothing ===
I did nothing. Because there was nothing to do. A man cleansed a market. He did not burn a fortress. He did not kill a centurion.

If I had arrested Him, I would have been the tool of corrupt priests. And I will not be anyone's tool.

* [Not even Rome's?] -> rome_option
* [So you let Him go.] -> closing

=== become ===
I do not fear what He is. I fear what the priests will make Him. They will turn this cleansing into a revolution. They will use the crowd to force my hand.

And when they do, I will have to choose. Between a man who quotes Psalms and a province that burns.

* [Choose the Psalms.] -> closing
* [Choose the province.] -> closing
* [Conclude.] -> closing

=== justice_choice ===
Justice. You ask a Roman governor to choose justice. In this province, justice is a luxury. Peace is a necessity.

But you are right. If I choose peace over justice, I am no better than the priests I despise.

I will wait. I will see what charges they bring. And I will judge according to Roman law, not their religious fury.

-> closing

=== peace_choice ===
Peace. Always peace. A dead prophet is a martyr. A living prophet is a problem. But a dead prophet can ignite a province.

I will choose peace. I will give them Barabbas. I will wash my hands. And I will go back to Caesarea knowing I sent an innocent man to the cross.

-> closing

=== closing ===
Investigate all you want. The Galilean disturbed the temple courts. He scattered the priests' silver. He released their birds.

But He did not commit a Roman crime. And I will not execute a man for quoting Psalms.
-> DONE

=== let_them ===
Let them bring Him. I will judge according to Roman law. And Roman law does not execute men for cleaning up corrupt markets.

Unless... unless they fabricate a sedition charge. Then I will have no choice.

* [Will you have no choice?] -> closing

=== pawn ===
I am always a pawn. The emperor sends me to Judea to keep the peace. The priests use me to legitimize their murders. The crowds use me to satisfy their bloodlust.

A Roman governor is never a man. He is a function. A tool. A basin of water for washing hands that are never clean.

* [Then break the pattern.] -> closing

=== rome_option ===
Rome wants taxes. Rome wants order. Rome does not care which prophet the priests kill, as long as the silver keeps flowing.

But I do care. Not because I am a good man. Because I am a Roman. And Romans do not execute innocent men for the convenience of corrupt priests.

* [You are walking a fine line.] -> closing
* [You care about the wrong things.] -> closing

=== badly ===
This will end badly. The priests will get their execution. The crowd will get their blood. And I will get my peace — at the cost of an innocent man's life.

The weight of that peace will follow me to my grave.

* [You know the cost.] -> closing
* [The peace is false.] -> closing

=== uncertain ===
Uncertain? I appear certain because I am a governor. Governors must project confidence. But inside — inside, I wonder if I am protecting the province or betraying the truth.

* [The uncertainty shows wisdom.] -> closing
* [Truth demands a choice.] -> closing

=== save ===
That record is all I have. A man with a whip of reeds. A temple full of scattered coins. A crowd of terrified merchants.

It will not save Him from the Sanhedrin. But it might save Him from Rome. And in this province, that is the only salvation that matters.

* [You are a better man than you pretend.] -> closing
* [That is not the same as saving Him.] -> closing

=== conscience ===
My conscience is a Roman governor's conscience. It sleeps soundly as long as the legions are paid and the taxes are collected.

But even a Roman conscience has limits. I will not sign a death warrant for a man who has done nothing to Rome. That is my limit.

* [That is not much of a limit.] -> closing
* [It is enough.] -> closing

=== believe ===
Believe the priests? They are the ones who run the temple tax racket. They are the ones who profit from the poor bringing doves. Of course they want Him silenced.

But I am a Roman. I do not take sides in Jewish theological wars. I take orders. And my orders are to prevent sedition. Not to protect corrupt priests from prophets.

* [So you will protect the Galilean?] -> closing
* [For now.] -> closing

=== not_yet ===
For now. But the priests will not let this go. They will bring Him to me. They will demand His blood. And I will face a crowd the size of a legion.

And I will have to decide whether to be a Roman or a pawn.

* [Be a Roman.] -> closing
* [Be a man.] -> closing
