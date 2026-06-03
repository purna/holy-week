// ============================================================
// CHARACTER: Market Vendor
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// SOURCE: ORPHAN FILE (not referenced in any case file)
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
