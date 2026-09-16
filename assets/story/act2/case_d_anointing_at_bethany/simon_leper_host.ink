// ============================================================
// CHARACTER: Simon the Leper (Dinner Host)
// ACT: Act II
// CASE: The Passover Lamb Pattern
// SOURCE: js/act2_case.js -> NPC 'simon_leper_host'
// BIBLE REFERENCE: Matthew 26:6-13; Mark 14:3-9; John 12:1-8
// ------------------------------------------------------------
// PROPHECIES FULFILLED: Isaiah 53:10 — offering for sin
// ------------------------------------------------------------
// Evidence unlocked: alabaster_jar
// ============================================================

-> start

=== start ===
# UNLOCK_EVIDENCE: alabaster_jar
Simon gestures toward the table before settling into his seat.

"They still call me Simon the Leper," he says. "Even though the disease is gone. Perhaps it is easier for people to remember what I was than to believe what I became."

He looks toward the doorway.

"But I remember. I remember what it was like when people saw me coming and crossed the street. I remember the silence. The distance. The fear."

Then he smiles.

"And I remember the day the Master came near."

+ [Jesus healed you.] -> healed_by_jesus
+ [Tell me about the dinner.] -> dinner_arranged
+ [What happened when Mary anointed Jesus?] -> mary_act
+ [Why was that evening so important to you?] -> dinner_meaning
+ [Finish the interview.] -> closing

=== healed_by_jesus ===
"Yes. He healed me."

Simon looks down at his hands.

"Leprosy had taken almost everything. My health. My livelihood. My place among my people. The physicians tried to help, but nothing changed."

"Then Jesus came near."

"He did not stand at a distance. He did not recoil. He touched me and said, 'Be clean.'"

Simon slowly opens his hands.

"And I was clean."

+ [What did it mean to be touched again?] -> divine_touch
+ [How did the community react?] -> community_reaction
+ [Was the healing immediate?] -> healing_immediate
+ [Finish the interview.] -> closing

=== divine_touch ===
"I had forgotten what a human touch felt like."

Simon pauses.

"People think the miracle was only that the disease disappeared. It was more than that. When the Master touched me, He crossed the boundary everyone else feared."

"He looked at what everyone called unclean and treated me as someone worth restoring."

+ [Why would He risk becoming unclean?] -> why_risk
+ [What did that tell you about Him?] -> authority_greater
+ [Finish the interview.] -> closing

=== why_risk ===
"That is the question I have asked myself ever since."

"The Law required separation from uncleanness. Everyone knew that. Yet Jesus came near anyway."

"He did not behave as though impurity had power over Him. Instead, His holiness seemed to move in the other direction."

Simon looks toward the table.

"The uncleanness did not spread to Him. His cleansing spread to me."

+ [His authority was greater than disease.] -> authority_greater
+ [Did you think He possessed divine authority?] -> scope_cosmic
+ [Finish the interview.] -> closing

=== authority_greater ===
"Greater authority. That is how I came to understand it."

"He did not need a physician to declare me healed. He did not need fear of the disease to keep Him away. He spoke, He touched, and the impossible happened."

Simon shakes his head.

"If He had authority over a disease that had destroyed my life, then I began to wonder..."

"What else does He have authority over?"

+ [Even death?] -> power_over_death
+ [Something greater than healing?] -> scope_cosmic
+ [Finish the interview.] -> closing

=== power_over_death ===
"Death."

Simon says the word quietly.

"After what happened to Lazarus, none of us could speak about death in quite the same way."

"If Jesus could call a man from the grave, then disease was only the beginning of what His authority revealed."

+ [Lazarus was there that evening.] -> lazarus_present
+ [That must have changed the meaning of the dinner.] -> dinner_meaning
+ [Finish the interview.] -> closing

=== scope_cosmic ===
"At first I thought I had simply been healed."

"But then I began to see a larger pattern. The Master did not merely repair broken bodies. He restored what sin, suffering, and death had taken away."

"And that is why the events around that Passover troubled me so deeply."

+ [What pattern did you see?] -> pattern_emerged
+ [Was Mary part of that pattern?] -> mary_act
+ [Finish the interview.] -> closing

=== community_reaction ===
"The community did not know what to do with me."

"For years they had known me as the man who must remain outside. Then suddenly I could walk among them again."

"Some rejoiced. Some were suspicious. Others simply stared."

"But the strangest part was sitting at my own table and realizing that people were no longer afraid to sit beside me."

+ [That must have been overwhelming.] -> dinner_meaning
+ [You wanted to celebrate.] -> dinner_arranged
+ [Finish the interview.] -> closing

=== healing_immediate ===
"Immediate."

Simon smiles.

"There was no gradual recovery. No long treatment. No waiting to see whether the disease would return."

"The Master spoke, touched me, and my life changed."

"But the greatest healing was not what happened to my skin."

"It was what happened to my place in the world."

+ [You were restored to the community.] -> community_reaction
+ [And that led to the dinner.] -> dinner_arranged
+ [Finish the interview.] -> closing

=== dinner_arranged ===
"The dinner was my way of saying thank you."

Simon gestures around the room.

"How do you repay a man who gives you your life back?"

"I could not. So I opened my home."

"I wanted Him at my table. I wanted the people who had witnessed my healing to see that I was no longer the man they remembered."

+ [What preparations did you make?] -> preparations
+ [Who came to the dinner?] -> guests_arrived
+ [Why was the table so important?] -> dinner_meaning
+ [Finish the interview.] -> closing

=== preparations ===
"I wanted everything to be worthy of Him."

"The finest food. Good wine. Fresh bread. My best linen."

Simon laughs softly.

"I probably spent far too much."

"But when someone has given you back your life, ordinary hospitality does not seem enough."

+ [Were the guests important?] -> notable_guests
+ [You wanted everything to be proper.] -> proper_prep
+ [Finish the interview.] -> closing

=== proper_prep ===
"Proper? Yes."

"But I learned something that evening."

"I had prepared the house. Mary had prepared something far more costly."

"I was preparing a dinner. She was preparing for something none of us fully understood."

+ [You mean her anointing of Jesus.] -> mary_act
+ [You sensed something larger was happening.] -> dinner_meaning
+ [Finish the interview.] -> closing

=== notable_guests ===
"There were many people of importance there, but one guest overshadowed them all."

"Lazarus was there. The man who had been dead and was now sitting at the table."

"That alone made the evening extraordinary."

+ [Lazarus's presence must have amazed everyone.] -> lazarus_present
+ [And then Mary acted.] -> mary_act
+ [Finish the interview.] -> closing

=== guests_arrived ===
"The guests arrived, and soon the house was full."

"Lazarus was there. Martha was serving. The disciples were there."

"And there was Mary."

Simon pauses.

"I did not know then how important her actions would become."

+ [Tell me about Lazarus.] -> lazarus_present
+ [Tell me about Mary.] -> mary_act
+ [Finish the interview.] -> closing
+ [What was Martha doing during the meal?] -> martha_service

=== lazarus_present ===
"Lazarus was impossible to ignore."

"He had been dead four days. Now he was alive, eating at my table."

"People whispered about him. Some came simply to see whether the stories were true."

"But there he was."

Simon lowers his voice.

"And perhaps that is why what happened next carried such weight. One man had been called out of death. Another was about to face it."

+ [The contrast was striking.] -> pattern_emerged
+ [Was the atmosphere uncomfortable?] -> strange_silence
+ [Finish the interview.] -> closing

=== strange_silence ===
"Yes."

"There were moments when the room seemed strangely quiet."

"Everyone could see Lazarus alive. Everyone could see Jesus sitting there."

"But no one seemed prepared to say what it might mean."

"Some miracles are easier to witness than to understand."

+ [And then Mary broke the silence.] -> mary_act
+ [The miracle was undeniable.] -> undeniable_miracle
+ [Finish the interview.] -> closing

=== undeniable_miracle ===
"Lazarus was living proof."

"You could argue with a story. You could question a witness."

"But you could not easily explain away the man sitting at the table."

"His life was testimony."

"And that made the hostility toward Jesus all the more difficult to understand."

+ [The danger was growing.] -> pattern_emerged
+ [Tell me what Mary did.] -> mary_act
+ [Finish the interview.] -> closing

=== martha_service ===
"Martha served."

"She was always attentive to the practical things. Food. Guests. The household."

"But Mary was different that evening."

"Mary seemed to understand that the moment required something beyond ordinary hospitality."

+ [What did Mary do?] -> mary_act
+ [Why was her action so significant?] -> dinner_meaning
+ [Finish the interview.] -> closing

=== mary_act ===
"Then Mary came forward."

"She had an alabaster jar filled with costly perfume."

"She broke it and poured the nard upon Jesus."

Simon closes his eyes for a moment.

"The fragrance filled the entire house."

"Everyone knew immediately that this was no ordinary gesture."

+ [The perfume must have been overwhelming.] -> fragrance_intense
+ [Judas objected.] -> judas_objection
+ [Why did Mary do it?] -> burial_prep
+ [Finish the interview.] -> closing

=== fragrance_intense ===
"It was powerful."

"The scent filled every corner of the house. It clung to our clothes. Even afterward, I could still smell it."

"But it was not the fragrance that shocked me."

"It was the cost."

"Mary had not brought something cheap and called it devotion. She had given something precious."

+ [The cost was enormous.] -> cost_great
+ [And Judas objected.] -> judas_objection
+ [Finish the interview.] -> closing

=== cost_great ===
"Yes. Very great."

"Judas calculated its value. Three hundred denarii."

"That was the language he understood: cost, price, profit."

"But Mary seemed to be speaking another language entirely."

"She was not calculating what Jesus was worth to her."

"She was giving Him everything she could."

+ [Then Judas complained.] -> judas_complaint
+ [The Master understood her.] -> masters_response
+ [Finish the interview.] -> closing

=== judas_objection ===
"Judas objected."

"He said the perfume could have been sold and the money given to the poor."

"On the surface, it sounded noble."

"But there was something beneath his words."

+ [What was his real motive?] -> judas_motive
+ [How did Jesus respond?] -> masters_response
+ [Finish the interview.] -> closing

=== judas_complaint ===
"Judas complained about the waste."

"I remember thinking that he had completely missed the point."

"Mary was not wasting something valuable."

"She was recognizing that Jesus Himself was more valuable than anything she could pour out."

+ [What did the Master say?] -> masters_response
+ [Did Judas understand?] -> master_knew
+ [Finish the interview.] -> closing

=== judas_motive ===
"John tells us something important about Judas."

"He carried the money bag, and he had been stealing from it."

"So perhaps his concern for the poor was not as pure as he wanted us to believe."

Simon looks toward the doorway.

"But the Master already knew what was in Judas's heart."

+ [Jesus saw through him.] -> master_knew
+ [How did Jesus respond?] -> masters_response
+ [Finish the interview.] -> closing

=== master_knew ===
"The Master knew."

"That is what strikes me most."

"He knew Judas's heart. He knew Mary's heart. He knew what was coming."

"And still He allowed Mary to anoint Him."

+ [His response was remarkable.] -> masters_response
+ [He knew the hour was approaching.] -> burial_prep
+ [Finish the interview.] -> closing
+ [What do you think the Master saw that others overlooked?] -> seen

=== masters_response ===
"The Master did not rebuke Mary."

"He defended her."

"He said she had done a beautiful thing."

Simon pauses.

"And then He said something that made the room feel very different."

"Her act was connected with His burial."

+ [She was preparing Him for burial.] -> burial_prep
+ [What did you understand from that?] -> meaning_deeper
+ [Finish the interview.] -> closing

=== burial_prep ===
"At the time, I did not fully understand."

"Now I believe Mary understood more than most of us."

"The perfume was not simply an act of affection."

"It pointed toward His death."

"Passover was approaching. The Lamb was moving toward the sacrifice."

+ [You saw a pattern.] -> pattern_emerged
+ [The meaning was deeper than the dinner.] -> meaning_deeper
+ [Finish the interview.] -> closing

=== meaning_deeper ===
"The dinner was about gratitude, but it became something greater."

"Every detail seemed to point beyond itself."

"Lazarus represented life restored."

"Mary represented costly devotion."

"The perfume pointed toward burial."

"And Jesus sat at the center of it all."

"Only later did I begin to understand that the Passover Lamb pattern was unfolding before our eyes."

+ [Tell me about that pattern.] -> pattern_emerged
+ [The Exodus connection.] -> exodus_connection
+ [Finish the interview.] -> closing

=== pattern_emerged ===
"Look at the sequence."

"The King entered Jerusalem."

"He was examined and questioned."

"He was anointed."

"And then He went toward His sacrifice."

Simon slowly shakes his head.

"At the time, we saw separate events."

"Afterward, they looked like pieces of the same story."

+ [The Passover connection.] -> exodus_connection
+ [The pattern was remarkably precise.] -> pattern_precise
+ [Finish the interview.] -> closing

=== exodus_connection ===
"At Passover, Israel remembered the lamb whose blood meant deliverance."

"Now Jesus was moving toward Jerusalem, toward His own sacrifice."

"I began to wonder whether the old story was pointing toward Him all along."

"Deliverance through sacrifice."

"Life through the blood of another."

"That was the pattern I could no longer ignore."

+ [The pattern was precise.] -> pattern_precise
+ [Isaiah had spoken of a suffering servant.] -> pattern_precise
+ [Finish the interview.] -> closing

=== pattern_precise ===
"The more I looked, the harder it became to dismiss."

"The timing. The Passover. The sacrifice. The preparation."

"And Isaiah had already spoken of one who would bear the sins of others."

Simon looks directly at you.

"Perhaps Mary understood it before the rest of us."

"Perhaps she knew that the One at our table was preparing to become the offering."

+ [The alabaster jar was part of that witness.] -> testimony
+ [The meaning was still unfolding.] -> power
+ [Finish the interview.] -> closing

=== dinner_meaning ===
"I thought I was inviting Jesus to dinner because I was grateful."

"And I was."

"But looking back, I think the table became a place where several things came together."

"The healed sat with the living."

"The dead who had been raised sat beside the One who would soon die."

"And Mary poured out something precious in preparation for His burial."

Simon smiles sadly.

"I thought I was hosting a dinner."

"Perhaps I was witnessing something much greater."
+ [What do you mean by a greater purpose?] -> greater_purpose
+ [What do you want people to remember?] -> testimony
+ [Finish the interview.] -> closing

=== greater_purpose ===
"The dinner was more than a celebration of my healing."

"It became a witness to what Jesus was about to do."

"Lazarus showed His power over death. Mary showed the cost of devotion. And Jesus was moving toward Jerusalem and the sacrifice that awaited Him."

"I did not understand all of it that night."

"But I remember the feeling that something greater was unfolding before us."

[You saw the pattern afterward.] -> pattern_emerged [Mary's actions suddenly make more sense.] -> burial_prep [Conclude.] -> closing
+ [Finish the interview.] -> closing

=== closing ===
Simon looks around the room.

"I have very little left to give that would embarrass me to give."

"My health was given back to me. My place was restored. And that evening, my house became a witness to something I did not yet understand."

"Let my house be remembered for what happened at this table, not for what I once was."

He gestures toward the food.

"Please. Eat."

"There is more than enough."


// ── Consolidated terminal branches ───────────────────────────
-> DONE

=== testimony ===
Simon smiles.

"Some things are meant to be remembered."

"My healing became a testimony. Mary's devotion became a testimony. Lazarus's life became a testimony."

"And the Master Himself became the center of them all."

"That is what I want you to remember."
+ [Finish the interview.] -> closing

=== seen ===
"The Master saw what others overlooked."

"He saw the outcast. He saw the grateful host. He saw Mary's devotion. He saw Judas's heart."

"Nothing was hidden from Him."

"And somehow, even knowing what was coming, He continued toward the sacrifice."
+ [Finish the interview.] -> closing

=== power ===
"The more I remember that evening, the more clearly I see His authority."

"He had authority over disease. Authority over death. Authority over uncleanness."

"And soon He would demonstrate an authority greater still — the authority to lay down His life and become the offering."

+ [Finish the interview.] -> closing
