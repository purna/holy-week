// CHARACTER: Mary Magdalene. Personal, concrete, devoted; never treated as a puzzle to break.
// SOURCE: John 20:1-18. Interview wording is dramatized; Jesus's message follows the supplied passage.
// FRAME: After Mary has returned to the disciples. Emotional model: permission, listening, optional detail.
VAR heard_recognition = false
VAR heard_message = false
VAR offered_space = false
-> start
=== start ===
# UNLOCK_EVIDENCE: mary_encounter
# UNLOCK_EVIDENCE: angelic_witness
# UNLOCK_EVIDENCE: empty_tomb
# UNLOCK_EVIDENCE: burial_linen
{ visited_start > 1:
I can tell you again. Some parts are still difficult to speak about, but I want you to understand what changed.
- else:
I went there expecting death. Even when the stone was moved, I did not think, "He is alive." I thought someone had taken Him away.
}
+ [Tell me what happened, when you are ready.] -> grief
+ [Would you like a moment first?] -> space
+ {heard_recognition} [May we return to the moment you recognised Him?] -> recognition
+ [We can stop here.] -> closing
=== space ===
~ offered_space = true
Thank you. Give me a moment.
What I need you to know is that I was looking for His body. I was not expecting to hear His voice.
+ [Listen as Mary continues.] -> grief
+ [We can leave the rest for another time.] -> closing
=== grief ===
I stood outside the tomb crying. When I bent down to look inside, I saw two angels in white where His body had been, one at the head and one at the feet.
They asked why I was crying. I told them my Lord had been taken away, and I did not know where He had been put.
+ [Listen to what happened next.] -> gardener
+ [May I clarify what you expected to find?] -> expectation
+ [Pause the interview.] -> closing
=== expectation ===
His body. Somewhere I could find Him and care for Him. The empty place frightened me; it did not explain itself.
Please keep that in your account. My first thought was loss, not resurrection.
+ [Listen as Mary continues.] -> gardener
+ [Pause the interview.] -> closing
=== gardener ===
I turned and saw someone standing there. It was Jesus, but I did not recognise Him.
He asked why I was crying and whom I was looking for. I thought He was the gardener. I asked where he had put the body so I could take it away.
+ [Listen.] -> recognition
+ [Pause the interview.] -> closing
=== recognition ===
~ heard_recognition = true
Then He said, "Mary."
I turned toward Him. "Rabboni!" My Teacher.
{ offered_space:
Thank you for letting me reach that part in my own time.
}
+ [What did He ask you to tell the disciples?] -> message
+ [How did you respond afterward?] -> announcement
+ [Let that be enough for now.] -> closing
=== message ===
~ heard_message = true
He told me not to hold on to Him, because He had not yet ascended to the Father. He sent me to His brothers with this message:
"I am ascending to my Father and your Father, to my God and your God."
I had come asking where He had been taken. Now I had somewhere to go and something to tell.
+ [What did you tell them?] -> announcement
+ [Pause the interview.] -> closing
=== announcement ===
I went to the disciples. "I have seen the Lord!" I told them what He had said to me.
That is my testimony: not only that the tomb was empty, but that I saw Him and heard Him.
+ {not heard_message} [May I hear the message He gave you?] -> message
+ [Thank you for telling me.] -> closing
=== closing ===
{ heard_recognition and heard_message:
You have heard what changed my grief, and the message I carried back.
- else:
We can speak again. You do not have to hurry me, and I do not want you to fill the gaps with guesses.
}
-> DONE
