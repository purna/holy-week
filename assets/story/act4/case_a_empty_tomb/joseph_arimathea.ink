// CHARACTER: Joseph of Arimathea. Measured, careful; costly loyalty rather than a lecture.
// SOURCE: John 19:38-42; Matthew 27:57-60. Dialogue is a reconstructed recollection.
// FRAME: The empty-tomb investigation. Joseph establishes the burial, not an invented discovery.
VAR burial_recorded = false
VAR heard_risk = false
-> start
=== start ===
# UNLOCK_EVIDENCE: spice_jars
I can tell you how Jesus was laid in the tomb. I asked Pilate for His body, and permission was given. Begin there, if you wish to establish whose body was buried and who handled it.
+ [Who helped you prepare the body?] -> preparation
+ [Why that tomb?] -> tomb
+ [What did it cost you to ask?] -> risk
+ [Finish the interview.] -> closing
=== preparation ===
~ burial_recorded = true
Nicodemus came with me. He brought myrrh and aloes, a substantial quantity, about seventy-five pounds. Together we wrapped the body with the spices in strips of linen, following our burial custom.
It was work done with our hands. Whatever questions you now have about the empty tomb, do not lose sight of that burial.
+ [Where did you lay Him?] -> tomb
+ [Return to my questions.] -> start
=== tomb ===
There was a garden near the place of crucifixion, and a new tomb in which no one had yet been laid. It was nearby, and the day of Preparation pressed upon us.
I offered the tomb. We placed Jesus there. Those are things I can attest, not conclusions drawn from an empty place afterward.
+ [What can you tell me about the later discovery?] -> limits
+ [Return to my questions.] -> start
=== risk ===
~ heard_risk = true
I had followed Him secretly because I feared the leaders. Asking the governor for the body was no longer a private allegiance.
I will not call myself fearless. I was afraid, and I went.
+ [Tell me about Nicodemus's part.] -> preparation
+ [Return to my questions.] -> start
=== limits ===
Take the first discovery of the empty tomb from those who made it. I can confirm the burial arrangements; I should not be made a witness to every event in the garden.
Nor can I offer you an image on a cloth as part of this account. Keep your evidence tied to what the witnesses can actually establish.
+ [Return to my questions.] -> start
=== closing ===
{ burial_recorded and heard_risk:
You have the preparation of the body and my reason for coming forward. Nicodemus can corroborate his own part.
- else:
My testimony concerns the body entrusted to us and the burial we carried out.
}
-> DONE
