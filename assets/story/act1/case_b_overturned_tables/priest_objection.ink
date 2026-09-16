// ============================================================
// CHARACTER: Temple Priest Objector (Continuation)
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// CASE EXPORT: temple_cleansing
// SOURCE: act1_case.js → NPC 'priest_objection_temple'
// BIBLE REFERENCE: Psalm 69:9; Isaiah 56:7; Jeremiah 7:11
// ------------------------------------------------------------

=== repentance_needed ===
The Temple needs repair, yes, but not the kind that comes with a whip and scattered coin. It needs the repentance of the heart, the turning back of the nation to the statutes given on Sinai. Reform without the altar is just rebellion wearing priestly garments.

+ [The altar itself has been defiled.] -> defiled_altar
+ [True repentance starts with mercy.] -> mercy_start
+ [Finish the interview.] -> closing_priest

=== defiled_altar ===
Defiled? The sacrifices continue morning and evening without fail. The blood is sprinkled. The incense rises. The lamps burn bright. How can the altar be defiled when the ritual is kept to the very letter of Moses?

+ [The ritual lacks justice.] -> ritual_justice
+ [God desires mercy, not sacrifice.] -> mercy_sacrifice_quote
+ [Finish the interview.] -> closing_priest

=== mercy_start ===
Mercy without truth is sentimentality. Truth without mercy is tyranny. We have the truth of the Law. If we lack mercy, it is because we have borne the burden of guarding God's holiness in a world that despises it.

+ [Holiness does not require cruelty.] -> holiness_cruelty
+ [You guard an empty shell.] -> empty_shell
+ [Finish the interview.] -> closing_priest

=== ritual_justice ===
Justice? The orphan is neglected, the widow has no defense, and the courts of the Gentiles are turned into a bazaar. You keep the letter of the blood while losing the spirit of the God who demanded it.

+ [The Law demands both.] -> law_both
+ [Finish the interview.] -> closing_priest

=== mercy_sacrifice_quote ===
"I desire mercy and not sacrifice." Words of Hosea, often quoted by those who wish to escape the discipline of obedience. But God commanded the sacrifice just as surely as He commanded mercy. One does not cancel the other.

+ [Sacrifice without a heart is dead.] -> dead_sacrifice
+ [Finish the interview.] -> closing_priest

=== holiness_cruelty ===
Cruelty? It is not cruelty to uphold the boundaries that keep chaos at bay. Without the wall, there is no vineyard. Without the Law, there is no Israel.

+ [The wall has become a prison.] -> prison_wall
+ [Finish the interview.] -> closing_priest

=== empty_shell ===
An empty shell? You look at stone and cedar and see emptiness. I look at stone and cedar and see the dwelling place of the Most High, preserved through exile and sword.

+ [The true Temple is standing before you.] -> true_temple_standing
+ [Finish the interview.] -> closing_priest

=== law_both ===
Both, yes! Both justice and the weightier matters of the Law. We try, scribe. We try in a world that pulls us toward Rome on one side and lawlessness on the other. This Galilean makes it look simple, but governance is never simple.

+ [Governance is not salvation.] -> governance_not_salvation
+ [Finish the interview.] -> closing_priest

=== dead_sacrifice ===
Dead? The smoke of the altar ascends day and night. God receives it. If the heart of the nation were truly dead, the fire would have gone out long ago.

+ [The fire is about to change form.] -> fire_change
+ [Finish the interview.] -> closing_priest

=== prison_wall ===
A prison? Or a shield? You call it a cage; I call it a sanctuary. But as we speak, the councils gather, the testimonies are weighed, and the decision draws near.

+ [Choose your side carefully.] -> final_choice
+ [Finish the interview.] -> closing_priest

=== true_temple_standing ===
Standing before us? A man of dust and Nazareth. If God chose to dwell in flesh, He would not choose a carpenter who disrupts the courts and defies the elders of Israel. He would choose power. He would choose glory.

+ [His glory is hidden in weakness.] -> glory_weakness
+ [Finish the interview.] -> closing_priest

=== governance_not_salvation ===
Salvation is for the world to come; governance is for the world that is. We must manage the state, appease the governor, and keep the peace of Jerusalem. That is the priest's burden.

+ [A burden born without faith.] -> burden_faith
+ [Finish the interview.] -> closing_priest

=== fire_change ===
Change form? What do you mean? The Roman legions are outside. The zealots are in the hills. And inside, the priests hold the line. Nothing changes.

+ [Finish the interview.] -> closing_priest

=== glory_weakness ===
Hidden in weakness? A strange place for the King of Israel. Weakness gets you crucified under Roman law. Power gets you a throne. I know which one survives.

+ [Surviving is not reigning.] -> surviving_reigning
+ [Finish the interview.] -> closing_priest

=== burden_faith ===
Without faith? No. With too much of it, perhaps. When you carry the weight of an entire nation's covenant before God every single day, faith stops being a poetic dream and becomes a crushing stone.

+ [Let Him carry the stone.] -> carry_stone
+ [Finish the interview.] -> closing_priest

=== surviving_reigning ===
Reigning? A dead man on a tree reigns over nothing. History belongs to the living empires and the enduring institutions.

+ [History belongs to Him.] -> history_him
+ [Finish the interview.] -> closing_priest

=== carry_stone ===
Carry it? We tried. We laid it on the altar. And now this Galilean comes along, claiming He can rebuild it all in three days. Madness. Utter madness.

+ [It is not madness. It is resurrection.] -> resurrection_node
+ [Finish the interview.] -> closing_priest

=== history_him ===
Time will tell whose history endures—Rome's, the Sanhedrin's, or the carpenter's. Until then, my duty remains at the altar.

-> closing_priest

=== resurrection_node ===
Resurrection? You speak of dead things rising as if it were a common market trade. Death is final, scribe. That is the one rule Rome and the Torah agree upon.

+ [He is the exception to every rule.] -> exception_rule
+ [Finish the interview.] -> closing_priest

=== exception_rule ===
An exception... If He breaks death as He broke the tables in the courtyard, then nothing we have built will stand. And perhaps... perhaps that is what terrifies me most.

+ [Finish the interview.] -> closing_priest

=== final_choice ===
The choice is set. The Sanhedrin will judge, the Romans will execute, and the stones of the Temple will look down upon it all. Record it however you like, scribe. History will judge us both.
+ [Finish the interview.] -> closing_priest

=== closing_priest ===
The service of the Lord continues, regardless of the noise in the courts. Write your notes, scribe, and let the God of Israel judge the hearts of us all.
-> DONE
