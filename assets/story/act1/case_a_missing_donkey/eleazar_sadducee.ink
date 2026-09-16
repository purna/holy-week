// CHARACTER: Eleazar, fictional aristocrat. Formal, defensive; concerned about public order.
// FRAME: Immediately after the entry. His accusation is a claim to test, not Scripture.
VAR view_established = false
VAR consent_challenged = false
-> start
=== start ===
{ visited_start > 1:
You have returned. I trust you will distinguish a correction to my report from approval of that procession.
- else:
Men take a colt and a crowd declares a king. You see a celebration; I see the beginnings of disorder. I reported what looked to me like a seizure.
}
+ [Where were you standing?] -> vantage
+ [What made you call it a seizure?] -> accusation
+ {evidence_witness_account} [Compare your claim with the owner's account.] -> consent
+ [Finish the interview.] -> closing
=== vantage ===
~ view_established = true
Above the road, at some distance. I could see men by the tethering place and an exchange with the people there. I could not hear every word.
You may note the distance. Do not pretend distance makes every observation worthless.
+ [Which part did you actually see?] -> accusation
+ [Return to my questions.] -> start
=== accusation ===
The approach, the questioning, the animal being led away. I took the questioning to mean an objection.
{ view_established:
No, I cannot give you the exact words from where I stood. You have already established that limitation.
- else:
If you intend to dispute it, first ask where I stood. A report should state its vantage point.
}
+ {evidence_witness_account} [The owner's account distinguishes a question from a refusal.] -> consent
+ [Ask about your vantage point.] -> vantage
+ [Return to my questions.] -> start
=== consent ===
~ consent_challenged = true
If the owner says he allowed it, then my description of a seizure goes beyond what I can establish.
Record that correction. I remain concerned about the crowd's royal acclamation. You have challenged one claim, not answered every question about what follows.
+ [Why does the crowd worry you?] -> concern
+ [Return to my questions.] -> start
=== concern ===
Rome watches a gathering like that. If soldiers intervene, traders, pilgrims, and residents all pay for it.
Perhaps you think my judgment too severe. But do not confuse my fear of unrest with proof that the animal was stolen. They are separate matters.
+ [Return to my questions.] -> start
=== closing ===
{ consent_challenged:
My report must distinguish what I saw from what I assumed. Include the owner's account alongside mine.
- else:
Check the owner's answer before treating my suspicion as a settled charge.
}
-> DONE
