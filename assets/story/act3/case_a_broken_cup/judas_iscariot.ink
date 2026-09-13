// ============================================================
// CHARACTER: Judas Iscariot
// ACT: Act III
// CASE: The Broken Cup
// CASE ID: last_supper
// CASE EXPORT: last_supper
// SOURCE: act3_case_2d.js -> NPC 'judas'
// BIBLE REFERENCE: John 13:29 - Judas kept the money bag;
// Luke 22:3-6 - already made his deal
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Exodus 12:1-14
//     Gospel: John 1:29; 1 Corinthians 5:7; Luke 22:15-20
//     Insight: The Passover lamb was to be 'without blemish' (Exodus 12:5).
//     Jesus - declared righteous even by Pilate ('I find no fault in him',
//     John 18:38) - was the unblemished sacrifice.
//   - Jeremiah 31:31-34
//     Gospel: Luke 22:20; 1 Corinthians 11:25
//     Insight: Jeremiah prophesied a coming covenant that would be internal,
//     not external - written on hearts, not stone tablets. Jesus announced
//     its inauguration with His own blood.
//   - Psalm 41:9
//     Gospel: John 13:18 - Jesus quotes this Psalm directly at the supper
//     Insight: 'Even my close friend, in whom I trusted, who ate my bread,
//     has lifted up his heel against me.' Jesus explicitly identified the
//     betrayal as prophetic fulfilment - not a surprise.
//   - Zechariah 11:12-13
//     Gospel: Matthew 26:15; Matthew 27:3-10
//     Insight: Thirty silver pieces was the price of a slave (Exodus 21:32)
//     - the religious leaders effectively valued Jesus as the lowest possible
//     commodity. The amount was prophetic, not coincidental.
//   - Isaiah 53:12
//     Gospel: John 17:1-26 (the High Priestly Prayer, delivered the same evening)
//     Insight: The farewell discourse (John 14-17), delivered after the meal,
//     is the longest recorded prayer of Jesus. Isaiah described the Suffering
//     Servant as numbered with the transgressors.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: On Thursday evening, Nisan 14, Jesus and His disciples gathered
//   in a borrowed upper room in Jerusalem to celebrate the Passover meal.
//   But this was no ordinary Passover - Jesus was about to transform a
//   1,500-year-old ceremony into the inauguration of the New Covenant.
//   Historical note: The 'upper room' (Greek: anagaion) was likely in the
//   southwestern upper city of Jerusalem - the wealthier quarter where larger
//   houses with guest rooms existed. Peter and John were sent ahead to
//   prepare (Luke 22:8).
//   Significance: The Passover lamb had always pointed forward to something
//   greater. In Exodus 12, God told the Israelites to sacrifice a lamb and
//   mark their doorposts with its blood - death would 'pass over' every house
//   protected by the blood. Jesus became that lamb.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: judas
//   motive: Judas Iscariot had already made his agreement with the chief
//   priests for thirty silver coins. He came to the preparation area before
//   the meal to count his payment, dropping the clay cup in his haste.
//   The broken cup and spilled silver became evidence of his state of mind.
//   method: Judas moved through the preparation room before the Passover
//   meal began, handling the money bag containing his payment. His nervous
//   energy caused the cup to be knocked and broken near the doorway.
//   During the meal, Jesus identified him directly.
// ============================================================

-> start
=== start ===
You trace my steps with your ink and parchment, little scribe. You think you are tracking a simple exchange of silver. You have no understanding of what it means to watch three years of momentum evaporate into poetry and feet-washing. We were supposed to hold the gates of the city! Now he speaks of tombs and broken bread. Someone must force his hand to action.

* [You sold Him for thirty pieces.] -> motives
* [You regret it.] -> regret

=== motives ===
Thirty pieces of silver. The price of a slave. That is what the Temple assessed the Son of God to be worth. And they paid me to deliver Him.

* [The money bag seems heavy tonight.] -> bag_heavy
* [Jesus spoke of a new covenant.] -> new_covenant

=== bag_heavy ===
The money bag seems heavy tonight. Thirty silver coins is the weight of a life in this city. A slave's price. I did what was necessary for the group.

# UNLOCK_EVIDENCE: evidence_money_bag_impression
/#

Jesus told us to be prepared. I am merely ensuring we are.
-> closing

=== new_covenant ===
He speaks of many things. Blood, wine, bread. I look at the silver and I see reality. He is walking into a trap he will not avoid.
-> closing

=== regret ===
I watched three years of expectation curdle into disappointment. The Messiah was supposed to be a king. Instead He washed feet. Instead He spoke of dying. The Zealots wanted a general. I wanted a winner. I was wrong.

* [What happened to the money?] -> closing

=== closing ===
Silver is a ledger entry. Disappointment is a fire. The Temple priests counted it out. I took it. And then I saw Him look at me from across the courtyard. I threw the silver at them and ran. I can no longer live with what I have done.
-> DONE
