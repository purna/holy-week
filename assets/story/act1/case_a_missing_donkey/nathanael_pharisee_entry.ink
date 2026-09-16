// CHARACTER: Nathanael bar Caleb, fictional Pharisee; careful about titles and public consequences.
// SOURCE CONTEXT: Luke 19:39-40; John 12:19.
VAR distinction_made = false
-> start
=== start ===
You are investigating a missing animal. I am concerned about the words being shouted around its rider. We should not pretend those are the same question.
+ [Which words concern you?] -> titles
+ [Why ask the Teacher to rebuke the crowd?] -> rebuke
+ [Does your objection establish a theft?] -> distinction
+ [Finish the interview.] -> closing
=== titles ===
A royal welcome is no small thing in a city watched by Rome. A title can carry hopes that the speaker has scarcely considered.
I heard the acclamation. I cannot claim to know every pilgrim's intention.
+ [What response did you want?] -> rebuke
+ [Return to my questions.] -> start
=== rebuke ===
Some Pharisees asked Him to rebuke His disciples. He answered that if they were silent, the stones would cry out.
You can examine that answer. It did not remove my concern about where the procession might lead.
+ [But is that evidence the colt was stolen?] -> distinction
+ [Return to my questions.] -> start
=== distinction ===
~ distinction_made = true
No. My objection to the acclaim does not establish what happened at the tethering place.
Record the owners' testimony on that question. I will answer for my own objection, not for an exchange I did not witness.
+ [Return to my questions.] -> start
=== closing ===
{ distinction_made:
Keep the two questions separate: permission to use an animal, and the meaning of a royal welcome.
- else:
Take care with titles, and equal care with accusations.
}
-> DONE
