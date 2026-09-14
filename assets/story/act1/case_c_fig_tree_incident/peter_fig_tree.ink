// ============================================================
// CHARACTER: Peter (Fig Tree Witness)
// ACT: Act I
// CASE: The Barren Fig Tree
// CASE ID: fig_tree_incident
// SOURCE: act1_case.js -> NPC 'peter_fig_tree' (Disciple, Witness to the Withering)
// BIBLE REFERENCE: Mark 11:12-14, 20-25; Matthew 21:18-22
// ------------------------------------------------------------
// PROPHECIES / OT BACKGROUND ECHOED IN THIS CASE:
//   - Jeremiah 8:13
//     Gospel: Mark 11:13-14, 20
//     Insight: The withered tree enacts, in a single morning, the
//     same judgment Jeremiah once spoke against a fruitless nation.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: The morning after Jesus cursed a leafy but fruitless
//   fig tree on the road from Bethany, Peter was the one who
//   noticed it had withered "from the roots up" and pointed it out
//   to Jesus, who used the moment to teach on faith, prayer, and
//   forgiveness.
//   Significance: Mark names Peter specifically as the disciple who
//   recalls and reports the withering (Mark 11:21) — one of several
//   small, first-person details across Mark's Gospel that scholars
//   point to as evidence the account draws on Peter's own memory.
// ============================================================

-> start

=== start ===
Rabbi — look! The tree You spoke to yesterday. It's completely withered, from the roots up, just like that!
* [It happened so fast.] -> miracle
* [Why did He curse it in the first place?] -> judgment
* [You're the one who noticed it, aren't you?] -> peter_noticed

=== peter_noticed ===
# UNLOCK_EVIDENCE: peter_astonishment
# UNLOCK_EVIDENCE: disciples_faith_lesson
I was. If anyone ever sets our story down properly, Scribe, I expect it will read something like: "Peter, calling to remembrance, saith unto him, Master, behold, the fig tree which thou cursedst is withered away." I don't know why it should matter who spotted it first. But it was me. I always seem to be the one who blurts things out before I fully understand what I'm looking at.
* [It makes you realize who you're walking with.] -> miracle
* [What did He say about the mountain?] -> faith

=== miracle ===
# UNLOCK_EVIDENCE: peter_astonishment
# UNLOCK_EVIDENCE: disciples_faith_lesson
It makes you realize who we're really walking with. He didn't just teach us a lesson with words; He showed us He has authority over the very roots of the earth we stand on. A tree, dead by morning, from a single sentence spoken the day before.
* [What did He say about the mountain?] -> faith

=== faith ===
"Have faith in God," He told us. "Truly I say to you, whoever says to this mountain, 'Be taken up and thrown into the sea,' and does not doubt in his heart, but believes that what he says will come to pass, it will be done for him." I am starting to think He was not exaggerating for effect.
* [What about forgiveness?] -> forgiveness
* [Continue.] -> closing

=== forgiveness ===
That's the part I did not expect, right in the middle of a lesson about withering a tree to its root: "And whenever you stand praying, if you have anything against anyone, forgive, that your Father also who is in heaven may forgive you your trespasses." Judgment on the tree, mercy in the very same breath for the rest of us. I have thought about that pairing more than once since — especially on nights I would rather not describe to a scribe.
* [Continue.] -> closing

=== judgment ===
# UNLOCK_EVIDENCE: peter_astonishment
# UNLOCK_EVIDENCE: disciples_faith_lesson
The Master is walking into Jerusalem to face the men who run that Temple, and that tree was a mirror held up before He ever reached the gates. It looked healthy from a distance — green, full, promising — the same as the sacrifices and the courts and all the rest of it. But there was no fruit for God underneath the leaves. He said as much of the tree that morning, and He said as much of the Temple two hours later.
* [What did He teach about faith?] -> faith

=== closing ===
"Have faith in God," He told us. It sounds simple enough — until you've watched a tree turn to dust overnight because He said so. It is a heavy kind of simple, Scribe. I have not stopped thinking about it since.
-> DONE
