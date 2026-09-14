// ============================================================
// CHARACTER: Local Traveler
// ACT: Act I
// CASE: The Barren Fig Tree
// CASE ID: fig_tree_incident
// CASE EXPORT: fig_tree_incident
// SOURCE: act1_case.js → NPC 'local_traveler'
// BACKGROUND: A common traveler on the road between Bethany and Jerusalem, who observed the fig tree both on Monday and Tuesday morning.
// BIBLE REFERENCE: Mark 11:12-14, 20-21
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: This traveler witnessed the fig tree with leaves but no fruit on Monday, and its withered state on Tuesday, without understanding the prophetic significance.
//   Significance: Provides an unbiased, purely observational account of the tree's rapid change.
// ============================================================

-> start
=== start ===
I walk this road every day between Bethany and Jerusalem. I saw that fig tree yesterday morning, full of leaves. And this morning... well, you wouldn't believe it.

* [What did it look like yesterday?] -> yesterday
* [What did it look like this morning?] -> this_morning
* [Press: Did you see anyone near it?] -> pressure

=== yesterday ===
# UNLOCK_EVIDENCE: withered_fig_tree_state
It was a fine-looking tree, lots of leaves. But no figs. Not a single one. A bit early in the season, perhaps, but still, a shame. All show, no substance.

* [Continue.] -> this_morning

=== this_morning ===
# UNLOCK_EVIDENCE: withered_fig_tree_state
Withered. Completely. From the roots up. Blackened leaves, brittle branches. Like it had been struck by lightning, but there was no storm. It happened overnight.

* [Continue.] -> pressure

=== pressure ===
# UNLOCK_EVIDENCE: withered_fig_tree_state
I saw the Galilean teacher and his disciples pass by both mornings. Yesterday, he stopped and looked at it. This morning, one of his men pointed it out, astonished. They seemed to know something about it.

* [Accept: They were involved.] -> closing
* [Challenge: Did you see them do anything?] -> exposed

=== exposed ===
No, I didn't see them do anything. Just look. But the way the teacher looked at it yesterday... it was a look that could curdle milk. And this morning, one of his followers told me what he'd said to it out loud, the day before — "Let no one eat fruit from you ever again." I didn't think much of it at the time. Words are cheap on this road. But the tree is dead, and the words weren't.
* [Move forward.] -> closing

=== closing ===
I don't know what to make of any of it, if I'm honest. I've walked this road for years and trees don't die like that — not overnight, not from a sentence. All I can tell you is what my own eyes saw on two mornings running: leaves on Monday, and a dead tree on Tuesday, and a teacher who seemed to know which one was coming before I did.
-> DONE
