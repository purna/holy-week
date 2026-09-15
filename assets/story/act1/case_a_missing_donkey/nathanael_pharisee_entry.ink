// ============================================================
// CHARACTER: Nathanael bar Caleb (Pharisee)
// ACT: Act I
// CASE: The Missing Donkey
// CASE ID: triumphal_entry
// CASE EXPORT: triumphal_entry
// SOURCE: act1_case.js → NPC 'nathanael_pharisee_entry'
// BIBLE REFERENCE: Matthew 21:15–16; John 12:19; Zechariah 9:9; Psalm 118:25–26
// ------------------------------------------------------------
// PURPOSE: Pharisee alarmed by crowds hailing Jesus as King at the Triumphal Entry
// ============================================================

-> start

=== start ===
The crowd was calling "Hosanna to the Son of David!" and waving palm branches like the days of the Maccabees. I watched from the Temple steps, noting the political overtones. This is not a gentle religious gathering — this is a coronation gesture with deep nationalist implications.

* [The palm branches were loaded with political meaning.] -> palm
* [You knew immediately this was dangerous.] -> danger_immediate
* [The crowd seemed unified in purpose.] -> unified
* [Conclude.] -> closing_nathanael

=== palm ===
The last time Jerusalem waved palms in the streets was when Simon Maccabaeus liberated the city from the Seleucids. When I saw the crowd cutting branches and shouting "Hosanna," I understood — they were invoking messiah-king, not merely prophet. The language of liberation was unmistakable. This was not enthusiasm. This was revolution dressed in religious symbolism.

* [They invoked the Maccabean precedent.] -> common_node
* [Could they have meant it differently?] -> common_node
* [The Roman response would be swift.] -> common_node
* [Conclude.] -> closing_nathanael

=== danger_immediate ===
I knew immediately. A crowd this size, declaring a Galilean teacher as king, threatens the fragile peace we maintain with Rome. The Sanhedrin walks a tightrope between religious authority and Roman tolerance. This — this was the edge of the rope snapping.

* [The Sanhedrin's dilemma.] -> common_node
* [They needed to act fast.] -> common_node
* [The teachers should have seen this coming.] -> common_node
* [Conclude.] -> closing_nathanael

=== unified ===
They seemed unified in purpose — all shouting the same words, all moving with the same rhythm. But crowds are deceptive. Behind the surface unity, I saw competing interests. The pilgrims wanted a king. The locals wanted order. The priests wanted control. And the Temple officials... they wanted silence.

* [No voice for the silent.] -> common_node
* [The unity was superficial.] -> common_node
* [The competing visions.] -> common_node
* [Conclude.] -> closing_nathanael

=== closing_nathanael ===
I watched the procession from the Temple steps, noting every detail, recording every symbol, calculating every risk. The crowd was celebrating. The priests were conspiring. The soldiers were watching. And I — I was trying to understand what I had just witnessed.

The Teacher rode into Jerusalem on a donkey. And I, a Pharisee trained in the Law, could not recognize the moment for what it was.

The king had come.

And I, like my colleagues, was on the wrong side of history.

-> DONE

// ── Streamlined Shared Knot ─────────────────────────────

=== common_node ===
The tension surrounding the procession grows thicker, and every observer on the temple steps realizes that the events unfolding will change the city forever.

* [Return to the start] -> start
* [Conclude] -> closing_nathanael
