import os

story_dir = "/Users/nigelmorris/Documents/GitHub/Miracle Maker/tests/example_01/story"

# Each entry: nodes with content and choices. We'll generate valid Ink.
# Structure: start -> choice1/choice2 -> deeper nodes -> closing -> DONE
# We'll write these manually per file based on JSON data already analyzed.

ink_contents = {}

# Template builder helper
def ink(start_node):
    lines = [f"-> start"]
    for nname, content, choices in start_node:
        lines.append(f"=== {nname} ===")
        lines.append(content)
        for txt, dst in choices:
            lines.append(f"* [{txt}] -> {dst}")
    lines.append("")
    return "\n".join(lines)

# 1. annas_patriarch
ink_contents["annas_patriarch.ink"] = """\
-> start
=== start ===
Governments are not built on passion, young man. They are built on stone and historical continuity. I have watched procurators come and go. They all think they command Judea, but the temple remains. This Galilean speaks well, but he does not recognize that systems outlive prophets.

* [Why bring him in at midnight instead of open day?] -> mechanics
* [Do you fear his popularity among the crowd?] -> popularity
* [What evidence did your spies gather?] -> evidence_request
* [Press: tell me what really happened.] -> pressure
* [Change angle: the high priest seems divided.] -> pivot

=== mechanics ===
Daylight belongs to the crowds, and crowds are easily confused by noise. Silence allows for careful administrative evaluation. We needed time with the witnesses before the city woke.

* [Press harder: who sleeps while a prisoner bleeds?] -> pressure
* [Soften: I understand administrative caution.] -> popularity

=== popularity ===
A crowd that shouts 'Hosanna' on Sunday will shout something entirely different by Friday if the narrative shifts. Popularity is water. We simply redirected the flow.

* [Accept: so it was premeditated.] -> closing
* [Challenge: that makes you a manipulator.] -> exposed

=== evidence_request ===
I am not a spy, scribe. But my household reported that when the Galilean overturned the tables in the outer court, not a single merchant called for the legions. They called for the priests. That tells me something about where people think authority truly lives.

* [Continue.] -> mechanics
* [Ask follow-up: what did the Chief Priest do?] -> pressure

=== pressure ===
Very well. Caiaphas said it was expedient. One man dies, the nation survives. We all understood the arithmetic. The secret meeting was called at sunset. I attended. The vote was taken by candlelight.

* [Acknowledge: you voted to execute.] -> closing
* [Challenge: history will judge this vote.] -> exposed

=== pivot ===
The Sanhedrin was split. Some feared the Romans would destroy the temple if we acted. Others feared the people would riot if we did not. The deciding voice was Caiaphas. He saw a political problem and chose a political solution.

* [Continue.] -> pressure

=== exposed ===
You want the full truth? The evidence was manufactured. The witnesses contradicted each other. Even Pilate knew the case was weak. But by then, the crowd had been cajoled. We had built a momentum we could not stop.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 2. barabbas_insurgent
ink_contents["barabbas_insurgent.ink"] = """\
-> start
=== start ===
(A heavy chain rattles against the stone floor of the lower cell as he laughs roughly.) The crowd wants an assassin, scribe! They do not want a teacher who tells them to love the legions. Rome only understands the edge of a curved blade, and the people out there know it. My hands are stained with Roman blood, and today, that makes me a hero.

* [Do you think the crowd truly chose you, or were they manipulated?] -> mob
* [What happens to the movement when you walk free?] -> freedom
* [Press: admit you were a pawn.] -> pressure
* [Probe deeper: who benefits from your release?] -> probe

=== mob ===
Who cares who pulled the strings? The bars are opening. The priests needed a riot to force Pilate's signature, and I am the best riot money can buy.

* [Accept: you are just a convenient weapon.] -> closing
* [Challenge: what of the blood on your hands?] -> exposed
* [Soften: will you keep fighting?] -> freedom

=== freedom ===
I go back to the hills. The knives are already sharpened. The Galilean goes to the hill of execution, and I return to the war. Let history decide who was useful.

* [Move forward.] -> closing

=== pressure ===
A pawn? I was never a pawn. I was the storm they released because they could not control the wind. Pilate hated the choice. The priests hated it. But the crowd wanted blood, and I was the reddest cup they could find.

* [Acknowledge: the system consumed itself.] -> closing
* [Challenge: you traded one life for another.] -> exposed

=== probe ===
The high priest's men whispered the names. They needed someone violent enough to make the choice stick. They pointed at me. Somewhere in that crowd, a deal was cut. My freedom for the Nazarene's silence.

* [Continue.] -> mob

=== exposed ===
You have been listening to the priests, have you? They will not speak of it, but I was the second victim that day. They killed two men to settle an argument about a voice they could not silence.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 3. board_debate
ink_contents["board_debate.ink"] = """\
-> start
=== start ===
Apprentice Scribe Maluch — you add something to the piece that was missing when I first read your draft. You have the witness from the pool, the Roman record from Rome, the accounts from Mark's house, the Galilean who frightened the chief priests. But the real question is not about the man. It is about what scares people most about him. The threat was not the healings. The threat was the categories he would not fit.

* [What would the Sanhedrin fear in that refusal?] -> fear_path
* [What would a scribe say they should fear?] -> scribe_path
* [Probe: what category does he break first?] -> probe_categories
* [Press: is this about power, not truth?] -> pressure

=== fear_path ===
They feared a prophet who healed on the Sabbath and called God his Father. That is not a category the Law has a box for. A man who claims authority over the Law is either divine or blasphemous. There is no middle category. The Sanhedrin could not live with either answer.

* [Accept: the categories were breaking.] -> closing
* [Ask follow-up: what happened when they tried to fit him anyway?] -> scribe_path

=== scribe_path ===
A scribe would say the Sanhedrin feared the disruption to the temple economy. A theologian would say they feared a challenge to 1500 years of tradition. But the deeper fear was personal: if he was right, they were wrong. And they had killed for being wrong before.

* [Continue.] -> pressure

=== probe_categories ===
The first category he broke was 'safety.' The temple had not been cleansed in living memory. The money changers were protected by Annas's lease. To drive them out was to attack the entire Sadducean financial structure.

* [Continue.] -> fear_path

=== pressure ===
It is always about power when the truth becomes inconvenient. Herod wanted quiet. Pilate wanted quiet. The Sanhedrin wanted quiet. But a voice from heaven does not negotiate.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 4. board_review
ink_contents["board_review.ink"] = """\
-> start
=== start ===
I have watched your investigation board grow. You have evidence that changes conclusions and evidence you are keeping out of affection. Can you tell the difference yet?

* [What weight does the weightiest piece of evidence carry?] -> weight_path
* [What have these pages told you about the man they describe?] -> pages_path
* [Probe: which evidence has changed your mind?] -> probe_change
* [Press: are you keeping evidence from affection?] -> pressure

=== weight_path ===
The weightiest evidence is always the one that contradicts your bias. A Roman centurion's testimony of faith carries less weight to a zealot than a rumor from the market. The boards we build reveal our own hearts more than the evidence we pin upon them.

* [Accept: I have been biased.] -> closing
* [Challenge: that is a harsh judgment.] -> exposed
* [Soften: show me which pieces matter most.] -> pages_path

=== pages_path ===
These pages describe a man who walked into the temple on Monday and challenged the entire establishment. The money changers testified in their ledgers. The soldiers testified in their silence. The blind man testified in his sight. The evidence does not lie.

* [Continue.] -> weight_path

=== pressure ===
I have seen you linger over Peter's denial and skip past the Roman centurion's confession. You are not building a board. You are building a case for hope. Hope is fine. But it is not investigation.

* [Acknowledge: you are right.] -> closing
* [Challenge: hope is not the same as bias.] -> exposed

=== probe_change ===
The blind man's testimony changed me most. They asked him to explain the miracle. He said, 'I was blind. Now I can see.' No theology. Just the fact. That is the evidence that cannot be argued away.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 5. caiaphas_priest
ink_contents["caiaphas_priest.ink"] = """\
-> start
=== start ===
You look at a single man, scribe, and you see a moral puzzle. I look at this city and I see an entire nation facing absolute erasure. If the legions move to clear these courts, Sinai becomes a memory. It is expedient that one man should die for the people. Do you understand the weight of this chair?

* [Is justice something that can be bartered for national security?] -> security
* [What if the witnesses contradict each other at the trial?] -> trial
* [Press harder: you are plotting murder.] -> pressure
* [Probe: was the vote already taken?] -> probe_vote
* [Soften: was there no other way?] -> soften

=== security ===
Without a nation, there is no altar. Without an altar, there is no law. Order is the highest form of justice we can offer under Rome. The Galilean threatens order. Therefore, he threatens the Law itself.

* [Acknowledge: you chose the Law over the man.] -> closing
* [Challenge: blood money is not order.] -> exposed
* [What happened in the Sanctuary today?] -> temple_signs

=== temple_signs ===
The afternoon tremor was... unexpected. They say the inner veil tore from top to bottom. Tectonic rifts in the limestone, nothing more.

* [Continue.] -> trial

=== pressure ===
Plotting? There is no plot. There is a calculation. Every year, Rome sends a procurator. Every year, we assess the temperament. Pilate is weak. Herod is a puppet. This year, the card is ours.

* [Accept: the politics are cold.] -> closing
* [Challenge: God sees beyond the procurator.] -> exposed

=== probe_vote ===
The vote was taken at sunset. The room was full. The witnesses were already coached. It was not a trial. It was a conclusion dressed in legal language.

* [Continue.] -> trial

=== soften ===
There was no other way? Perhaps there was. Perhaps we were too afraid of Pilate. Perhaps we should have defended the man before the procurator rather than condemned him in the dark. But fear is a powerful council.

* [Move forward.] -> closing
* [Challenge: that sounds like regret.] -> exposed

=== trial ===
We will hear them all. The truth will reveal itself, but the public safety verdict cannot be delayed. Pilate wanted to wash his hands. We gave him the chance. He chose not to take it.

* [Accept: you both share the guilt.] -> closing
* [Challenge: Pilate saw through you.] -> exposed

=== exposed ===
The night we condemned an innocent man, I knew we had made an error. But when the ground split and the Temple curtain failed, I realized our old monopoly over the presence of God had collapsed in three seconds. We were too proud to admit we were wrong.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 6. execution_soldier
ink_contents["execution_soldier.ink"] = """\
-> start
=== start ===
We have done three of these already this month. It is heavy work hammering spikes through bone, but you get used to the rhythm. But this one... when the sky went pitch black at noon, the entire detail stopped gambling for the garments. Even the Centurion looks like he has seen a ghost. This is not a standard provincial execution.

* [What did he say right before the end?] -> phrase
* [Is the guard detail staying on the hill tonight?] -> guard
* [Press: what did the Centurion do?] -> pressure
* [Probe deeper: what happened at the moment of death?] -> deep_probe

=== phrase ===
He did not curse us like the others. He said, 'Father, forgive them.' It felt like the ground was moving beneath our boots.

* [Accept: it shook you.] -> closing
* [Ask follow-up: what did the earth do?] -> deep_probe
* [Challenge: how can you forgive a soldier?] -> exposed

=== guard ===
We are posted here until the bodies are broken and taken down. We dropped our torches when the tremor hit. No one wants to sit in this darkness, but orders are orders.

* [Probe deeper: why is the Centurion unsettled?] -> deep_probe
* [Soften: you are just following orders.] -> closing

=== pressure ===
The Centurion did not speak for a long time. Then he said, 'Truly this man was the Son of God.' You do not lightly call your prisoner the Son of your gods. That is either madness or something worse.

* [Accept: he believed.] -> closing
* [Challenge: Centurions do not say such things.] -> exposed

=== deep_probe ===
At the moment he died, the sky turned black in the middle of the day. The curtain in the temple tore from top to bottom. The earth shook. I have been in battles where the earth shook, but never from the sky. This was not an earthquake. This was something answering.

* [Move forward.] -> closing

=== exposed ===
The curtain tore, and someone left a fine linen wrapper caught in the branches nearby. If that does not tell you God was present, nothing else will. The old agreement was over. And we were the ones hammering the nails.

* [Acknowledge: you are witnesses.] -> closing

=== closing ===
-> DONE
"""

# 7. galilean_pilgrim
ink_contents["galilean_pilgrim.ink"] = """\
-> start
=== start ===
We followed him all the way from the Jordan. Our villages emptied out when he walked through. They say he is the one promised to break the yoke. Look at the gates—even the children are cutting palm leaves. But the soldiers on the battlements... they are watching us like wolves before a strike.

* [Do you think he has come to fight Rome?] -> perspective
* [What did you see him do in Galilee?] -> signs
* [Probe deeper: are you afraid of what comes next?] -> fear
* [Press: Rome does not let kings live.] -> pressure

=== perspective ===
He speaks of a kingdom, but his hands hold no iron. We will see what happens when he reaches the temple mount.

* [Accept: his kingdom is not of this world.] -> closing
* [Challenge: you still do not understand.] -> exposed

=== signs ===
I saw five thousand men sit on a hillside hungry, and walk away full. You do not forget a thing like that.

* [Accept: that is the power of God.] -> closing
* [Ask follow-up: did anyone else see that?] -> fear
* [Challenge: a miracle does not make a king.] -> exposed

=== fear ===
Of course I am afraid. But I have been afraid before — before the leper was cleansed, before the storm was calmed, before the dead man walked. Fear is not the same as doubt.

* [Move forward.] -> closing

=== pressure ===
Rome has killed every pretender to the throne. And yet, you are here. Why? Because somewhere between Cana and Jerusalem, something shifted. He did not take the sword. He took a towel and a basin instead.

* [Accept: that is a different kind of power.] -> closing

=== closing ===
-> DONE
"""

# 8. guard_report
ink_contents["guard_report.ink"] = """\
-> start
=== start ===
I am on duty. I will read this scene plainly and let you draw your own conclusions. Last Sabbath, outside the outer court — tables overturned, animals scattered, the crowd orange with excitement. He called it My Father's house. The merchants called it their living. I called it my afternoon.

* [What did you make of it all?] -> view
* [Was it a rebellion or a reformation?] -> question
* [Press deeper: did anyone call for the legions?] -> pressure
* [Probe: who gave the order to clear?] -> probe

=== view ===
I made of it this: one man, no weapons, no army, walked into the most secure piece of real estate in the eastern empire and cleared it with nothing but a voice. That is either madness or a message the legions should take seriously.

* [Accept: you were impressed.] -> closing
* [Challenge: you were just a spectator.] -> exposed

=== question ===
The ancient scribes would call it zeal, like Phineas. A revolution would have had swords. This had a whip of cords. It was a cleansing. A prophetic act. But whether it was biblical or treason depended entirely on which side of the temple gate you stood.

* [Move forward.] -> closing

=== pressure ===
No one called for the legions. Not the merchants, not the priests. They argued among themselves. That silence — that absence of Rome — was the loudest thing in the court that day.

* [Continue.] -> view

=== probe ===
I did. I ordered the immediate area secured and the outer court cleared. Not because I feared a riot — but because I feared the man. Not for his weapon. But for whatever it was behind his eyes.

* [Accept: you saw something you could not name.] -> closing

=== exposed ===
You think I was just watching? I was calculating. A Galilean peasant with no weapon, a hostile crowd, and a temple full of armed priests. And yet... he was the one standing still.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 9. informant_bribe
ink_contents["informant_bribe.ink"] = """\
-> start
=== start ===
Information has a price. Names have a price. Silence also has a price. The Galilean's gathering had a ledger before the sun went down. One of the twelve has been studying the treasury boxes for weeks.

* [For how much was Judas paid?] -> price
* [What account is being kept and by whom?] -> account
* [Press deeper: show me the ledger.] -> pressure
* [Probe: was Judas recruited or did he volunteer?] -> probe

=== price ===
Thirty pieces of silver. The price of a slave in the Law of Moses. Not a king's ransom. A transaction. A crude one — the kind of payment that suggests the priests did not respect him enough to offer more.

* [Accept: that cheapens both men.] -> closing
* [Challenge: the priests used him.] -> exposed

=== account ===
Caiaphas's steward. The treasury sits in the Court of the Women — exactly where Judas was stationed as the group's keeper of the money. He had access. He had knowledge. He had grievances no one else noticed.

* [Continue.] -> price

=== pressure ===
The ledger is not mine to show. But I have seen it. It lists the names of those present at the last supper. It shows movement of funds from the temple treasury to a private account three days before the arrest. A reward was pre-authorized.

* [Accept: this was planned.] -> closing

=== probe ===
Volunteered? He looked like a man who had been waiting to be asked. He did not even haggle. That is either total conviction or total despair. I suspect the latter.

* [Move forward.] -> price

=== exposed ===
The account shows the priests had the money ready before the betrayal. Judas did not create the opportunity. He was the final gear in a mechanism that had already been assembled. He was the one they trusted to identify him in the dark.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 10. jerusalem_local
ink_contents["jerusalem_local.ink"] = """\
-> start
=== start ===
Every year it is the same. Passover comes, the prices double, and the streets fill up with shouting provincials. This Galilean rabble is going to get the entire eastern market burnt to the ground if they keep calling him a king. Rome does not take jokes well, especially not during feast week.

* [Is there no hope in what he claims?] -> critique
* [How are the merchants reacting?] -> trade
* [Press: you fear the Romans more than the truth.] -> pressure
* [Probe: have you seen his miracles?] -> probe

=== critique ===
Hope does not pay the temple tax or stop a legionary shield wall. We need peace, not another failed uprising.

* [Challenge: peace at any cost is cowardice.] -> exposed
* [Soften: tell me what the crowd believes.] -> trade

=== trade ===
They are nervous. When tables flip, coins roll into the drainage cracks. No one wins when the peace breaks.

* [Accept: merchants are a weathervane.] -> closing
* [Press deeper: where is Pilate in this?] -> pressure

=== pressure ===
I fear the Romans because they are here. I fear the Galilean because he could wake the Romans. Do not confuse caution with cynicism. Jerusalem has survived three centuries of occupation by watching its tongue.

* [Acknowledge: survival has a price.] -> closing

=== probe ===
I have never seen a miracle with my own eyes. But my cousin's son — a leper — went down to the Jordan after John the Baptist. He came back clean. I do not explain that. But I do not trust it either.

* [Move forward.] -> critique

=== exposed ===
You want my honest fear? The Galilean scares me because the crowds follow him without understanding him. A people who act on hope without reason can burn a city faster than Caesar himself.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 11. john_disciple
ink_contents["john_disciple.ink"] = """\
-> start
=== start ===
The candles are burning down, and he keeps speaking about washing feet and breaking bread like it is a farewell. I looked across the table at Judas—his eyes were tracking the doorway the entire evening. Something is fracturing inside our circle tonight, and I do not think words can mend it.

* [What did Jesus mean by his warning about denial?] -> warning
* [Where will you go if the guard arrives?] -> loyalty
* [Probe: Judas is betraying him.] -> judas_reveal
* [Press harder: Peter will deny him first.] -> peter_truth

=== warning ===
He looks at Simon Peter when he says it. Simon thinks he is iron, but Jesus sees the forge fire coming.

* [Accept: Jesus knows the future.] -> closing
* [Ask follow-up: what will Peter do?] -> peter_truth

=== loyalty ===
I will follow him. Even if they take him to the palace court. Someone needs to stay near his mother.

* [Accept: you are his anchor.] -> closing
* [Challenge: you will both die.] -> exposed

=== judas_reveal ===
I saw it. The way he kept glancing at the door. The way he did not reach for the bread when Jesus passed it. I think Judas has been going to the priests for days. He thinks he is forcing the Messiah's hand.

* [Continue.] -> peter_truth

=== peter_truth ===
Peter will deny him. Three times before the morning. Jesus told him so. Peter laughed. But I saw Peter's eyes shift to the doorway when a servant girl pointed at him. He knows. He is walking toward the fire of his own making.

* [Move forward.] -> closing

=== exposed ===
Judas has the bag. He has been skimming from it. He thinks he is being clever. But I saw the priests' servant in the courtyard the afternoon before. Something was arranged. I just did not want to believe my brother would sell him.

* [Acknowledge: betrayal from within.] -> closing

=== closing ===
-> DONE
"""

# 12. joseph_arimathea
ink_contents["joseph_arimathea.ink"] = """\
-> start
=== start ===
It is dangerous to speak here. The council chamber was closed to many of us tonight, but the decision was made before the candles were lit. I have the means to secure the remains from the governor's staff, but it requires using up all my political leverage. Conscience is an expensive thing to buy back when you have kept silent for too long.

* [Will the rest of the Sanhedrin oppose your request to Pilate?] -> council
* [Where will you lay him?] -> tomb
* [Press: why risk everything now?] -> pressure
* [Probe: what broke your silence?] -> probe

=== council ===
They want the matter forgotten. A public tomb means a public memory. They will not be pleased, but the Roman law allows for family burial petitions.

* [Accept: you are using Roman law against them.] -> closing
* [Challenge: you are one voice in a hostile room.] -> exposed

=== tomb ===
I have a new vault cut out of the bedrock near the execution hill. It is secure, clean, and empty. My family used it for generations, but I made sure no one was buried there since my wife. It will be ready by Friday evening.

* [Accept: you prepared this in advance.] -> closing
* [Press deeper: how could you know?] -> pressure

=== pressure ===
Risk everything? I have already lost everything. I spent years sitting in that council, watching them plot a murder while quoting the Law. Tonight, the silence broke me. I could not let them have the last word — not over him.

* [Move forward.] -> closing

=== probe ===
I saw him in the temple courts. Not his miracles. Not his crowds. Just him. Sitting, tired, alone. Something in the way he looked up told me he was going to die. And I knew I could not let him end in a pauper's grave.

* [Continue.] -> tomb

=== exposed ===
I kept my seat on the council while he died. That is the fact I carry. I could have spoken at the trial. I did not. This tomb is not justice. It is restitution. It is the smallest thing I have left to give.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 13. judas_iscariot
ink_contents["judas_iscariot.ink"] = """\
-> start
=== start ===
You trace my steps with your ink and your parchment, little scribe. You think you are tracking a simple exchange of silver. You have no understanding of what it means to watch three years of momentum evaporate into poetry and feet-washing. We were supposed to hold the gates of the city! Now he speaks of tombs and broken bread. Someone must force his hand to action.

* [Is it silver or disappointment that drives you to the temple gates?] -> motives
* [The others cross the table are watching you, Judas.] -> suspicion
* [Press: you have already made the deal.] -> pressure
* [Probe: do you still believe he is the Son of God?] -> belief_reveal

=== motives ===
Silver is a ledger entry. Disappointment is a fire. If he is the King, the soldiers will not be able to bind him in the garden. Let the system test him.

* [Accept: you wanted him to act.] -> closing
* [Challenge: you wanted to force God's hand.] -> exposed
* [Soften: you were never evil, just desperate.] -> belief_reveal

=== suspicion ===
Let them look. John dreams of symbols, and Peter dreams of swords. Neither of them sees the net closing over this upper room before the sun rises.

* [Continue.] -> motives

=== pressure ===
The deal is done. Thirty pieces. The priests have the money ready. I gave them a signal — a kiss. Simple. Invisible. But when they came, he did not call down twelve legions of angels. He let them take him like a lamb.

* [Acknowledge: you did not expect this.] -> closing

=== belief_reveal ===
Do I still believe? I saw the coin in my hand this morning and it felt like a stone. I looked at him across the table. He knew. He had always known. And he still broke the bread for me. That is the thing I cannot forgive myself for.

* [Move forward.] -> closing

=== exposed ===
I wanted a revolution with Jerusalem as the capital. Instead, I got a Nazarene who wanted to die. A kingdom that claimed to be 'not of this world.' That is the deepest disappointment of all. I sold God for a political idea.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 14. market_rumors
ink_contents["market_rumors.ink"] = """\
-> start
=== start ===
Good day! The market moves faster than news. People are saying strange things. What draws you to my stall?

* [I am here for the news, not the figs.] -> welcome
* [What are people saying about the man?] -> rumours
* [Press deeper: be honest, you saw him.] -> pressure
* [Probe: who is spreading these rumors?] -> probe

=== welcome ===
Then you came to the right place. My figs are from Jericho — sweet and cheap. But the gossip? That is free. What do you want to know?

* [Continue.] -> rumours

=== rumours ===
People are saying he healed a blind man at the Pool of Bethesda. That is not rumour — that is fact. The man is walking around the market telling everyone who will listen. The Pharisees called him in twice. They could not disprove it.

* [Press deeper: why?] -> pressure
* [Challenge: the Pharisees do not give up easily.] -> exposed

=== pressure ===
Fine. I saw it. I was at the pool that morning. The man was sitting there in rags, and this Galilean came. He spat on the ground, made mud, and put it on the blind man's eyes. Told him to wash in the pool. The man came back... he could see. I have not been able to stop thinking about it.

* [Accept: you are a witness.] -> closing

=== probe ===
The Pharisees? They are quietly paying off anyone who will say the man was not really blind. They asked the parents for a statement. The family is terrified.

* [Move forward.] -> rumours

=== exposed ===
He told the Pharisees, 'I was blind. Now I can see.' That line has been running through the market like wildfire. The priests want it stopped. But you cannot un-see a miracle.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 15. martha_bethany
ink_contents["martha_bethany.ink"] = """\
-> start
=== start ===
There are thirteen extra mouths to feed tonight, and the road to Jerusalem is monitored by patrols. Mary sits at his feet listening, but someone must handle the bread, the water, and the structural security of this house. We are hiding people who have prices on their heads.

* [Is Lazarus safe here?] -> lazarus
* [How long can your provisions hold out?] -> storage
* [Press: your faith is being tested.] -> pressure
* [Probe: what did Lazarus tell you after he rose?] -> probe

=== lazarus ===
He is the proof they want to destroy. A man who was dead four days walking around is a living problem for the Sadducees. We keep him out of sight.

* [Accept: the miracle is true.] -> closing
* [Challenge: they will kill him for it.] -> exposed

=== storage ===
We have dried grain and oil for three days. If he does not enter the city openly soon, we will run out of cover.

* [Press harder: three days of safety for a lifetime of proof?] -> pressure
* [Soften: you are doing what you must.] -> lazarus

=== pressure ===
My faith is fine. My logistics are strained. But you ask a fair question. I complained once — asked him why Mary sat listening instead of helping. He said, 'Martha, Martha, you are worried about many things. Mary has chosen the good portion.' I have been choosing it ever since.

* [Acknowledge: he saw your heart.] -> closing

=== probe ===
Lazarus told us the last thing he heard was Jesus saying, 'Lazarus, come out.' He said he did not argue. He came before he realized what was happening. He said the light was already warm on his face.

* [Move forward.] -> lazarus

=== exposed ===
The Sanhedrin called a meeting the day after Lazarus appeared. Not to celebrate. To discuss how to kill him. The proof is too dangerous to let live. A dead man raised threatens the entire Sadducean theology.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

# 16. mary_magdalene
ink_contents["mary_magdalene.ink"] = """\
-> start
=== start ===
They speak of him in the palaces as if he were a tactical problem to be mapped out and solved. They did not see the graves open. They do not know what it feels like to have seven demons wrenched out of your mind by a single word. My memory is the only anchor I have left, and I will not look away from it.

* [Are you not afraid of the high priest's guards?] -> fear
* [What does he mean when he speaks of his upcoming departure?] -> departure
* [Press: what were those seven demons?] -> pressure
* [Probe deeper: will you stay at the cross?] -> probe

=== fear ===
Fear is a clothing I took off a long time ago. Let them watch the house. The stone has already been rolled away from my past; they cannot lock me back inside it.

* [Accept: you are brave.] -> closing
* [Challenge: bravery is not the same as wisdom.] -> exposed

=== departure ===
He speaks in shadows, but his eyes look straight through the horizon. He is preparing us for a night where there will be no lanterns to follow.

* [Accept: he sees the end coming.] -> closing
* [Ask follow-up: what night?] -> probe

=== pressure ===
Demons? I do not know their names. I only know what they did. They made me see things that were not there. They made me say things I did not mean. They made me hate my own reflection. One word from him, and every one of them fell out of my mind like stones from a broken wall.

* [Move forward.] -> fear

=== probe ===
Yes. At the cross. The others ran. I stayed. There were women there — his mother, Mary, Salome. I was there because he was the one who had stayed with me when everyone else had run from me.

* [Accept: you owe him everything.] -> closing

=== exposed ===
They do not understand that a woman freed from seven demons is not the same woman who stood at the cross. I had nowhere else to go. Every other door in my life had been closed by things I could not name. He opened the one that mattered.

* [Move forward.] -> closing

=== closing ===
-> DONE
"""

print("Templates written for 16 files. Need 20 more.")
with open("/tmp/ink_16.txt", "w") as f:
    f.write(list(ink_contents.keys())[-1] + "\n")
