// CHARACTER: Simon Peter. Direct, loyal, practical; not yet an all-knowing narrator.
// SOURCE: Luke 19:29-36; Mark 11:1-7. The two messengers are unnamed in these accounts.
// FRAME: Reconstructed interview following the entry; conversational wording is dramatized.
VAR asked_instructions = false
VAR asked_cloaks = false
-> start
=== start ===
# UNLOCK_EVIDENCE: rope_fibers
# UNLOCK_EVIDENCE: cloaks
{ visited_start > 1:
You wanted to go over the colt again? Ask. I would rather you had the account straight.
- else:
The Teacher sent two of our company ahead for a colt. You are asking whether it was stolen? Then begin with what He told them to do, not with the shouting afterward.
}
+ [What instructions did He give?] -> instructions
+ [What happened when the colt arrived?] -> cloaks
+ [What can you tell me about the owners?] -> owners
+ [Finish the interview.] -> closing
=== instructions ===
~ asked_instructions = true
He told them where to find a colt that no one had ridden. They were to untie it and bring it. If questioned, they were to say, "The Lord needs it."
That was the instruction. Not to threaten anyone. Not to take a sword to the rope.
+ [What did the owners ask?] -> owners
+ [Return to my questions.] -> start
=== owners ===
The men reported that the owners asked why they were untying it. They gave the answer Jesus had told them to give.
Ask the owners about their own intentions. I will not put thoughts into their heads for your report.
+ [How was Jesus seated on the colt?] -> cloaks
+ [Return to my questions.] -> start
=== cloaks ===
~ asked_cloaks = true
We put our cloaks on the colt and helped Jesus onto it. Along the road, people spread their own cloaks before Him.
It was not a saddle fit for a ruler. It was what we had to offer.
+ [Did everyone understand what the entry meant?] -> understanding
+ [Return to my questions.] -> start
=== understanding ===
Do not make us wiser than we were. I knew I wanted to follow Him. Knowing what every part of that day meant was another matter.
Put down what we did. Let the words of Scripture be examined carefully.
+ [Return to my questions.] -> start
=== closing ===
{ asked_instructions and asked_cloaks:
You have the instruction and the preparation for the ride. Keep those separate from rumours about force.
- else:
There is more I can tell you about the instructions and the cloaks when you return.
}
-> DONE
