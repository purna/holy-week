// CHARACTER: Eleazar, alternate interview. Formal and resistant; fictional political interpretation.
// FRAME: After the procession, before later Temple and trial events.
VAR distinction_made = false
-> start
=== start ===
I object to the royal display. Do not reduce that objection to a quarrel over an animal.
+ [What danger do you anticipate?] -> danger
+ [What do you know about the owner's consent?] -> consent
+ [Finish the interview.] -> closing
=== danger ===
A crowd may disperse before the consequences arrive. The people responsible for order must remain here afterward.
That is my concern. It is a prediction of danger, not a report that violence has already occurred.
+ [Does that change the question of consent?] -> consent
+ [Return to my questions.] -> start
=== consent ===
~ distinction_made = true
The owners must answer that. I cannot turn my opposition to the procession into knowledge of their intentions.
If they allowed the colt to go, record it. That does not require me to approve of the acclamation.
+ [Return to my questions.] -> start
=== closing ===
{ distinction_made:
You may disagree with my judgment. At least keep judgment separate from eyewitness evidence.
- else:
Ask the people involved before you settle the charge.
}
-> DONE
