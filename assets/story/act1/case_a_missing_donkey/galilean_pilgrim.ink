// CHARACTER: Tobias, the game's fictional name for an unnamed owner.
// SOURCE: Luke 19:32-36; Mark 11:4-6. Personal reactions are dramatized.
// FRAME: Following the entry. No invented family prophecy or secret password.
VAR consent_recorded = false
VAR rope_discussed = false
-> start
=== start ===
# UNLOCK_EVIDENCE: prophecy_scroll
# UNLOCK_EVIDENCE: palm_branch
{ visited_start > 1:
Still working through the reports? Very well. It was my colt; you should hear my answer plainly.
- else:
You have come about the colt. People have made quite a story of it since it left the tethering place. Ask me what happened before you call it theft.
}
+ [Why did you question the men?] -> question
+ [Did you allow them to take the colt?] -> consent
+ [What does the rope tell us?] -> rope
+ [Finish the interview.] -> closing
=== question ===
Of course I asked. They were untying an animal that belonged to us. "Why are you untying the colt?" That was the question.
They answered, "The Lord needs it." Do not turn the question itself into a struggle or a threat.
+ [And did you allow them to leave?] -> consent
+ [Return to my questions.] -> start
=== consent ===
~ consent_recorded = true
Yes. They went with the colt. I did not ask anyone to pursue them or recover it by force.
You may record that I allowed it. What every neighbour thought of the procession is a different question.
+ [What happened along the road?] -> road
+ [Return to my questions.] -> start
=== rope ===
~ rope_discussed = true
They were untying the colt when we questioned them. That is the action I am describing.
If someone gives you a piece of rope afterward, ask where it came from and who handled it. A loose strand cannot tell you whether I gave permission. I can.
+ [Then I should record your consent directly.] -> consent
+ [Return to my questions.] -> start
=== road ===
They brought the colt to Jesus. Cloaks were put on it, and others were spread on the road as He went along.
I hear people discussing the words of Zechariah. You can examine those with the account of the ride. My part in your inquiry is simpler: I let the colt go.
+ [Return to my questions.] -> start
=== closing ===
{ consent_recorded:
Write it clearly: questioned, answered, allowed to go.
- else:
Before you settle this case, make sure your notes contain the owner's answer about permission.
}
-> DONE
