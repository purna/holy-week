// ============================================================
// STORY: Dismas (The Penitent Thief)
// CASE: crucifixion_site (act3CaseE — The Final Sacrifice)
// NPC ID: penitent_thief
// UNLOCKS: crucified_with_thieves, crucifiers_forgiven
// REVEALS PROPHECY: isaiah_53_12
// SOURCE: Luke 23:32-33, Luke 23:34, Luke 23:39-43
// ============================================================

-> intro

=== intro ===
A man hangs on the cross to the right of the central beam, his
breathing ragged. He turns his head slightly as you approach —
still alive enough to notice you, still alive enough to speak.

"Come to gawk? Or come to ask? Everyone else already has their
verdict on me. Thief. Numbered with him. Might as well be numbered
with him twice, the way they tell it."

-> main_hub

=== main_hub ===
+ [Ask what happened this morning] -> neutral_stage
+ [Ask about the other two men on the crosses] -> cautious_stage
+ [Press him about what he said to Jesus] -> pressured_stage
+ [Ask what he heard Jesus say] -> exposed_stage
+ [Leave him be] -> repeat_stage

=== neutral_stage ===
"They nailed up three crosses that morning. Mine, my friend's,
and His — right between us. Made a point of it, putting Him in
the middle. Wasn't an accident. The charge sheet listed the three
of us together."

* [Continue] -> unlock_crucified_with_thieves -> main_hub

=== cautious_stage ===
"At first I mocked Him too. Same as my friend on the other side.
'Aren't you the Messiah? Save yourself — and us, while you're at
it.' Cheap talk. When you're dying, you'll say anything, hoping
something sticks."

* [Continue] -> main_hub

=== pressured_stage ===
"My friend wouldn't let up on Him. Cursing, jeering, same as the
crowd below. I told him to stop. 'Don't you fear God? We're
getting exactly what we deserve. This man's done nothing wrong.'
{penitent_confessed: I don't know why I said it. It just came out true.}

~ penitent_confessed = true

* [Continue] -> main_hub

=== exposed_stage ===
"The soldiers were still rolling dice for His clothes when I heard
it. He wasn't cursing back at anyone. He was praying — for them.
'Father, forgive them, they don't know what they're doing.'

I asked Him to remember me when He came into His kingdom. Didn't
expect an answer, not really. He said I'd be with Him in paradise.
Today. Not someday. <i>Today.</i>"

* [Continue] -> unlock_crucifiers_forgiven -> main_hub

=== repeat_stage ===
"I was numbered among the criminals, same as Him. I know exactly
what that felt like, dying next to Him instead of far from Him."
-> END

// ------------------------------------------------------------
// Evidence unlock knots
// ------------------------------------------------------------

=== unlock_crucified_with_thieves ===
{ not evidence_crucified_with_thieves:
    ~ evidence_crucified_with_thieves = true
    # UNLOCK_EVIDENCE: crucified_with_thieves
}
-> DONE

=== unlock_crucifiers_forgiven ===
{ not evidence_crucifiers_forgiven:
    ~ evidence_crucifiers_forgiven = true
    # UNLOCK_EVIDENCE: crucifiers_forgiven
}
-> DONE

// ------------------------------------------------------------
// Variables (declare at top of runtime story bundle if merged
// into a shared variables file rather than kept per-knot)
// ------------------------------------------------------------
VAR evidence_crucified_with_thieves = false
VAR evidence_crucifiers_forgiven = false
VAR penitent_confessed = false
