// CHARACTER: Jemimah. Practical resident, irritated by disruption, capable of fair distinctions.
// FRAME: Matthew 21:10-11; fictional local witness.
VAR heard_identity = false
-> start
=== start ===
I had work to do, and suddenly the road was full of branches and people. You can admire the procession and still admit it made getting home difficult.
+ [Who did people say He was?] -> identity
+ [What did you see on the road?] -> road
+ [Did you hear a complaint from the colt's owner?] -> limits
+ [Finish the interview.] -> closing
=== identity ===
~ heard_identity = true
People were asking who He was. Others answered that He was Jesus, the prophet from Nazareth in Galilee.
So no, the whole city did not arrive with one settled opinion. Some of us were trying to find out what was happening.
+ [What did you observe yourself?] -> road
+ [Return to my questions.] -> start
=== road ===
Cloaks underfoot. People making space for the colt, then crowding in again to see the rider. Excitement spreads quickly when a street is packed.
I can tell you the road was blocked. That does not tell you whether the animal was stolen.
+ [What did you hear about its owner?] -> limits
+ [Return to my questions.] -> start
=== limits ===
Not from the owner. I heard people repeat a charge. Repeating it would not make me a second witness.
Ask the person whose animal it was. My complaint is about the road.
+ [Return to my questions.] -> start
=== closing ===
{ heard_identity:
Put the questions in your account too. People were asking who He was, not all giving the same answer.
- else:
You have my account. An inconvenient procession is not proof of a theft.
}
-> DONE
