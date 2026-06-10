// ============================================================
// CHARACTER: Simon the Leper (Healed Host)
// ACT: Act II
// CASE: The Price of Life
// CASE EXPORT: lazarus_plot
// SOURCE: simon_leper.ink
// BACKGROUND: Once an outcast, now a host. His house in Bethany became a refuge for Jesus and a place where the preparation for His burial began.
// BIBLE REFERENCE: Matthew 26:6-13; Mark 14:3-9
// ============================================================
// CHARACTER: Simon the Leper
// ACT: Act 2
// CASE: The Price of Life
// CASE ID: lazarus_plot
// ============================================================
// CHARACTER: Simon the Leper (Healed Host)
// ACT: Act II
// CASE: The Price of Life
// CASE EXPORT: lazarus_plot
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