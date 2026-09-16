// CHARACTER: Unnamed child; fictional eyewitness at the procession, not at the tethering post.
// VOICE: Short, concrete, enthusiastic. SOURCE CONTEXT: Matthew 21; John 12.
VAR heard_detail = false
-> start
=== start ===
I could see the colt between people's shoulders! Then someone lifted a branch and I couldn't see anything. Everyone was shouting.
+ [What could you see when the way cleared?] -> sight
+ [What were people shouting?] -> sound
+ [Did you see where the colt came from?] -> limits
+ [Finish the interview.] -> closing
=== sight ===
~ heard_detail = true
Jesus was riding it. There were clothes on its back, and people were putting more on the road. I kept hoping it wouldn't tread on anyone's sleeve.
+ [What did you hear?] -> sound
+ [Return to my questions.] -> start
=== sound ===
"Hosanna!" I shouted it too. I asked what it meant, but there was so much noise I couldn't hear the answer.
You should ask someone who knows the words. I can tell you how loud we were!
+ [Did you see the owners?] -> limits
+ [Return to my questions.] -> start
=== limits ===
No. I was here, waiting for the procession. Someone told me about the men fetching it, but I didn't see that part.
Will you put down the bit I really saw?
+ [Yes. Tell me about the cloaks.] -> sight
+ [Return to my questions.] -> start
=== closing ===
{ heard_detail:
Remember the clothes on the road. I saw those myself.
- else:
I only saw a little of it. But I was there.
}
-> DONE
