// CHARACTER: Garrison guard; concise, practical, no access to private village exchanges.
// FRAME: Entry into Jerusalem. Fictional report grounded in the public procession.
VAR report_limited = false
-> start
=== start ===
A crowd approaching the city. A man on a colt. Branches, cloaks, shouting. That is the beginning of my report. What do you need clarified?
+ [What were you watching for?] -> orders
+ [Did you witness the colt being taken?] -> limits
+ [What did the crowd call Him?] -> words
+ [Finish the interview.] -> closing
=== orders ===
Weapons. A rush at a gate. Someone giving orders to turn the crowd against us. A loud procession needs watching; noise alone is not an attack.
Do not write that I knew what every person intended. I watched their movements.
+ [What did you hear?] -> words
+ [Return to my questions.] -> start
=== limits ===
~ report_limited = true
No. I was watching the approach to the city, not the tethering place. If someone has quoted me as a witness to theft, they have enlarged my report.
Take that question to the owners and the men who fetched the animal.
+ [Return to my questions.] -> start
=== words ===
They were welcoming Him with a royal title. That drew our attention. Whether their words fulfilled your Scriptures is for someone trained in them.
My report concerns what the crowd said and did, not what a scroll means.
+ [Did that establish a theft?] -> limits
+ [Return to my questions.] -> start
=== closing ===
{ report_limited:
My report does not establish how the colt was obtained. Keep that limitation attached to it.
- else:
Record the procession. Do not add an offence I did not witness.
}
-> DONE
