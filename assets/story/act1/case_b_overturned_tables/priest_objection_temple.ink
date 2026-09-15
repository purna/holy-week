// ============================================================
// CHARACTER: Temple Priest (Course of Abijah - Expansion)
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// CASE EXPORT: temple_cleansing
// SOURCE: act1_case.js → NPC 'priest_objection_temple_2'
// BIBLE REFERENCE: Malachi 3:1; Numbers 3:10; 1 Samuel 2:35
// ------------------------------------------------------------

=== priest_abijah_extended ===
The lot fell to my father's house, as it fell to Zechariah before the altar of incense. We did not choose this burden. The course of Abijah has guarded the holy precincts since the days of David. Now a stranger from Galilee walks in with cords in His hands and speaks of judgment against the house of Zadok.

* [You treat the office as an inheritance rather than a calling.] -> office_inheritance
* [Malachi spoke of a refiner coming suddenly to His temple.] -> malachi_refiner
* [Conclude.] -> closing_priest_ext

=== office_inheritance ===
An inheritance? It is an unbroken stewardship. Every stone of this court has been watered by the prayers of the faithful. What has this Nazarene built? A following of fishermen and tax collectors who know nothing of the inner veil.

* [The veil was torn from top to bottom.] -> veil_torn
* [God is not bound by your stewardship.] -> God_not_bound
* [Conclude.] -> closing_priest_ext

=== malachi_refiner ===
"And the Lord, whom you seek, will suddenly come to His temple." Yes, the messenger of the covenant. We know the text. But Malachi also asked: "Who can endure the day of His coming?" Not the crowds shouting Hosanna on the road. Not a prophet who disrupts the morning sacrifice.

* [He came to purify the sons of Levi.] -> purify_levi
* [You fear the refiner's fire.] -> refiners_fire
* [Conclude.] -> closing_priest_ext

=== veil_torn ===
Torn? No human hand has breached the Holy of Holies. The veil hangs thick and heavy, woven with blue and purple and scarlet. What you speak of is a delusion born of mob fury.

* [A divine hand tore it when He breathed His last.] -> divine_tear
* [Conclude.] -> closing_priest_ext

=== God_not_bound ===
Not bound? He chose Mount Zion. He chose the threshing floor of Araunah. He placed His name here forever. To say He is unbound from His own dwelling is to say the covenant is a shadow.

* [The shadow has given way to the substance.] -> shadow_substance
* [Conclude.] -> closing_priest_ext

=== purify_levi ===
Purify us? By handing us over to the judgment of the Governor? By inviting the Roman eagles into the sanctuary? If this is purification, it looks remarkably like ruin.

* [Ruin is required before true restoration.] -> ruin_restoration
* [Conclude.] -> closing_priest_ext

=== refiners_fire ===
Fire consumes the dross, scribe. But it also tests whether the gold is pure. We have kept the flame burning through Greek desecration and Maccabean blood. Where was the Galilean when Antiochus set up the abomination? He was nowhere. We were here.

* [You survived by compromising with every power that conquered you.] -> compromise_power
* [Conclude.] -> closing_priest_ext

=== divine_tear ===
Breathed His last? You speak of future things as if the sentence were already executed. The trial has not even begun. The Sanhedrin sits tonight.

* [The verdict was written before the foundations of the world.] -> verdict_written
* [Conclude.] -> closing_priest_ext

=== shadow_substance ===
Substance without form is a ghost. You preach a kingdom without a capital, a sacrifice without an altar, a priesthood without anointing. Israel cannot live on spirit alone; we are flesh and bone, requiring bread and blood.

* [He is the bread of life and the final sacrifice.] -> final_sacrifice
* [Conclude.] -> closing_priest_ext

=== ruin_restoration ===
Restoration is the promise given to Zerubbabel and Nehemiah. It was built with trowel in one hand and sword in the other. We need no new foundation. We need only for the disturbers of the peace to be silenced.

* [You cannot silence the truth.] -> truth_unbounded
* [Conclude.] -> closing_priest_ext

=== compromise_power ===
Compromise? Call it survival. Call it stewardship under the yoke. If we did not bend to Caesar, the plough would go over Zion and not one stone would be left upon another.

* [And now you fulfill your own prophecy.] -> stone_upon_stone
* [Conclude.] -> closing_priest_ext

=== verdict_written ===
Pre-written? That is the language of Pharisees and fatalists. We have free will under the Law. We weigh the evidence. We vote. The Sanhedrin is not a rubber stamp for heaven or Rome.

* [Yet your minds are already made up.] -> minds_made_up
* [Conclude.] -> closing_priest_ext

=== final_sacrifice ===
The final sacrifice... If every man becomes his own priest, then the altar is abolished, the tribe of Levi is cast aside, and the order given on Sinai is mocked. That is not redemption. That is lawlessness.

* [It is the fulfillment of the Law, not its abolition.] -> law_fulfillment
* [Conclude.] -> closing_priest_ext

=== truth_unbounded ===
Truth without an institution is a wind that blows where it lists, leaving only wreckage behind. I will stay with the stones I can touch and the God whose name is inscribed upon them.

-> closing_priest_ext

=== stone_upon_stone ===
Not one stone... You speak the words of doom like a curse. Is that what you want? Fire and ash? A scattered people and a silent altar?

* [Sometimes the house must fall so the true temple can rise.] -> true_temple_rise
* [Conclude.] -> closing_priest_ext

=== minds_made_up ===
Made up? We are burdened. Every member of the council feels the weight of the Sabbath and the crowd. But when a man breaks the peace of the feast, choice narrows to necessity.

* [Necessity is the tyrant's excuse.] -> tyrant_excuse
* [Conclude.] -> closing_priest_ext

=== law_fulfillment ===
Fulfillment... Every revolutionary claims to fulfill the law by breaking it. Moses did not break the tablets until the people turned to gold. This man broke the tables before the people even understood His teaching.

* [His actions spoke louder than your parchment.] -> actions_louder
* [Conclude.] -> closing_priest_ext

=== true_temple_rise ===
Rise in three days? That was His boast in the outer court. Three days to replace forty and six years of cedar and marble. Let Him try it from the dust of Gabbatha.

* [He will.] -> closing_priest_ext
* [Conclude.] -> closing_priest_ext

=== tyrant_excuse ===
Call it tyranny if you like. When the legions march down the Antonia fortress because the courts are in revolt, you will not talk to me of grace. You will look for a hiding place.

* [I have nothing to hide from the King of kings.] -> king_of_kings
* [Conclude.] -> closing_priest_ext

=== actions_louder ===
Loud, yes. The noise of a whip, the clatter of silver on stone, the shouting of frightened doves. It filled the air with confusion. And out of confusion, you expect me to see the finger of God?

* [God is found in the still small voice, not the riot.] -> still_small_voice
* [Conclude.] -> closing_priest_ext

=== king_of_kings ===
King of kings... Written above His head in Hebrew, Latin, and Greek before the sun goes down. A strange kingship, crowned with thorns and bleeding upon Roman wood. If that is your victor, keep Him.

* [He bore your sins upon that wood.] -> sins_borne
* [Conclude.] -> closing_priest_ext

=== still_small_voice ===
A still small voice spoke to Elijah on Horeb, true. But it also gave the Law in thunder and lightning upon the mountain. God is not only whispered; He is commanded. And His commands are written in the Torah.

* [And His living Word stands before you.] -> living_word
* [Conclude.] -> closing_priest_ext

=== sins_borne ===
My sins? I am a priest of the Most High. I offer the sin offering year after year according to the ordinance. I have cleansed my hands at the bronze laver. Do not speak to me of bearing sins I have already laid upon the head of the lamb.

* [The blood of bulls and goats cannot take away sin.] -> blood_ineffective
* [Conclude.] -> closing_priest_ext

=== living_word ===
A living word that stands silent before the high priest, answering nothing. If He has words of power, let Him speak them to the Sanhedrin. Let Him justify His disruption under oath.

* [He spoke all that needed to be spoken.] -> spoken_enough
* [Conclude.] -> closing_priest_ext

=== blood_ineffective ===
Ineffective? You blaspheme the entire economy of God's mercy. Without those lambs, the nation perishes in its uncleanness. Without those altars, we are naked before His holiness.

* [Clothed in His righteousness, we need no other cover.] -> clothed_righteousness
* [Conclude.] -> closing_priest_ext

=== spoken_enough ===
He said enough to seal His doom. And enough to test whether any among the priests have ears to hear beyond the walls of this courtyard.

* [Open your ears before the walls fall.] -> open_ears
* [Conclude.] -> closing_priest_ext

=== clothed_righteousness ===
Righteousness imputed without works, without blood, without the temple? That is the doctrine of lawlessness. It dissolves the moral fabric of Israel and leaves us at the mercy of every wind of doctrine.

* [It is the grace that saves.] -> grace_saves
* [Conclude.] -> closing_priest_ext

=== open_ears ===
My ears are deaf to rebellion, scribe. But they are open to the voice of the living God as delivered through Moses. Write your record. Seal your scroll. The night is falling over Jerusalem, and the Passover lamb is waiting.

-> closing_priest_ext

=== grace_saves ===
Grace... We shall see if grace saves the nation when the Roman standards are planted in the holy place. Until then, my post is at the altar.

-> closing_priest_ext

=== closing_priest_ext ===
The record is made. The service of Abijah concludes its watch. Whatever comes with the morning light, the God of our fathers remains upon His throne.
-> DONE
