// ============================================================
// CHARACTER: Barabbas the Insurgent
// ACT: Act III/IV
// CASE: The Final Sacrifice
// CASE ID: crucifixion_site
// CASE EXPORT: crucifixion_det
// SOURCE: act3_case.js -> NPC 'barabbas_choice'
// BIBLE REFERENCE: Matthew 27:15-31; Mark 15:6-15; Luke 23:18-25;
//   John 18:39-40; Acts 3:14; Romans 5:7-8
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_barabbas_substitution (the innocent for the guilty)
//   - evidence_pilate_offers (the Passover custom of releasing a prisoner)
//   - evidence_crowd_manipulation (the priests orchestrating the crowd)
//   - evidence_jesus_silent (Jesus's refusal to defend Himself)
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Isaiah 53:6 — "All we like sheep have gone astray..."
//   - Acts 3:14 — "You denied the Holy and Righteous One..."
//   - Romans 5:7-8 — "While we were still sinners, Christ died for us."
// ============================================================

-> start
=== start ===
They brought me out of the dungeon that morning in chains. My hands still bore the marks of the manacles — iron on iron, day on day. I was a prince among robbers, a name whispered in the hills. And now the priests wanted me to walk free.
* [What was their plan?] -> priest_deal
* [Why were you in chains?] -> imprisonment
* [The crowd's reaction.] -> crowd_mood

=== priest_deal ===
The priests needed a crowd to demand a prisoner's release — any prisoner — to satisfy the mob and get their man executed. They knew the crowd would never choose an unknown preacher. So they made sure I was on the slate. It was political theater, and I was the unwilling star.
* [Political theater?] -> theater
* [What role did you play?] -> unwilling_star

=== imprisonment ===
They threw me into the cistern when I resisted the census. A Zealot with too much fire and not enough wisdom. They beat me, chained me, left me to rot in the dark. My hands still shake from those manacles. But I never stopped planning — my next raid, my next strike, my next chance to bleed the Romans white.
* [You were a rebel all your life?] -> rebel_life
* [The chains that bound you.] -> chains

=== rebel_life ===
A rebel all my life. My father taught me that the Romans take what they want and give nothing back. My brother died at the lash for refusing to carry a Roman officer's pack. I learned early that mercy is a luxury the oppressed cannot afford. The sword is the only language Rome understands.
* [But you were sentenced to death?] -> death_sentence
* [The revolution lives on?] -> revolution_continues

=== death_sentence ===
Yes — I was sentenced to die. Four nails through my wrists, a spear through my heart. But the crowd chose me instead of the Nazarene. The substitution was total. I walked free while He walked to the cross. I am alive because the innocent died.
* [The weight of survival.] -> survival_weight
* [What you think about the substitution.] -> substitution_reflection

=== survival_weight ===
The weight of survival is heavier than any iron chain. I look at my hands — hands that have killed, hands stained with blood — and I know they should be nailed to a cross. Instead, I am free. Free because another died in my place. Free because the innocent took my sentence.
* [Do you feel worthy?] -> unworthy
* [This freedom is a gift.] -> grace_received

=== substitution_reflection ===
The substitution was not accidental. The priests needed a criminal released to justify a righteous man's execution. But who can say whether this was their plan — or God's? Isaiah wrote that all we like sheep have gone astray, and the Lord has laid on Him the iniquity of us all. I was the sheep that went astray. He was the Lamb.
* [The scriptures were fulfilled.] -> scripture_fulfilled
* [What does this mean?] -> gospel_meaning

=== scripture_fulfilled ===
The scriptures were fulfilled that day. Every prophet who wrote of the suffering servant converging on the hill called Skull. I was the living proof — the guilty released, the innocent condemned. The greatest substitution in human history played out before my eyes.
# UNLOCK_EVIDENCE: barabbas_substitution
# UNLOCK_EVIDENCE: pilate_offers
# UNLOCK_EVIDENCE: crowd_manipulation
# UNLOCK_EVIDENCE: jesus_silent
* [The meaning is staggering.] -> staggering
* [What of the one who died?] -> the_one_who_died

=== gospel_meaning ===
It means that God's love reaches into the depths of sin and says: "I will take your place." The guilty go free. The innocent dies. And the universe itself is reconfigured around that single, shocking truth.
* [The meaning is staggering.] -> staggering
* [What of the one who died?] -> the_one_who_died

=== staggering ===
Staggering. A criminal who had spilled blood walks free while the Son of Man hangs on a cross. The irony is so complete, so terrible, that it turns into something holy. The universe itself bows to a love that takes the guilty's place.
* [The irony was divine.] -> divine_irony
* [What you carry now.] -> carrying_it

=== carrying_it ===
What I carry now is not guilt — it is gratitude. Every day, I ask: what would He think of the man I have become? He died for the man I was.
* [The transformation.] -> transformation
* [He sees the heart.] -> heart_seen

=== heart_seen ===
He sees the heart. Not my deeds. Not my crimes. He sees the heart — and He died for the heart He found there. Even in rebellion, even in darkness — He was already there, preparing to take my place.
* [The love that endured.] -> divine_irony

=== divine_irony ===
They did not know what they did. Caiaphas thought he was protecting the nation. The crowd thought they were choosing a hero. None realized they were instruments of redemption — the worst decision became God's best provision.
* [They chose poorly.] -> poor_choice
* [Yet it was planned.] -> scripture_fulfilled

=== poor_choice ===
They chose poorly — and perfectly. Their greatest sin became the instrument of salvation. The logic of the cross defies every human calculation.
* [The redemption was planned.] -> scripture_fulfilled
* [The love transcends time.] -> divine_irony

=== theater ===
Political theater, yes — but whose theater? Behind the stage, behind the curtain of human agency, the Author was writing His story. I was the unwilling star — but born for this moment, as was He.
* [The Author writes all stories.] -> divine_irony
* [Even rebellion serves Him.] -> unknowing

=== unwilling_star ===
I was the unwilling star of their production. My freedom was purchased at the price of His death. I never auditioned for this role — but I was born for it, as was He.
* [Born for such a time.] -> scripture_fulfilled
* [The role was predetermined.] -> predetermined

=== predetermined ===
The role was predetermined by a love that transcends time. Before the foundation of the world, the Lamb was slain. I am Barabbas — and my name means "son of the father." In the end, we all are.
* [The redemption was planned.] -> scripture_fulfilled
* [The love transcends time.] -> divine_irony

=== chains ===
The chains that bound me were not just iron. They were fear, hatred, revenge. The man on the cross loosened them, one nail at a time.
* [The real freedom.] -> grace_received
* [The heart was freed.] -> heart_seen

=== crowd_mood ===
The crowd was a living thing that morning. When the priests whispered in the right ears, the tide turned. One moment they asked for Jesus. The next, they screamed for Barabbas. I watched my freedom purchased with the blood of another — and I did not deserve it.
* [They chose a criminal over Christ.] -> poor_choice
* [The crowd was manipulated.] -> unknowing

=== unworthy ===
Worthy? No. I am a murderer, a rebel, a man who cursed the God who judges me. I deserve the cross more than any man. Yet they chose me. And they crucified Him. The injustice is absolute — and that is precisely why it is justice.
* [The injustice is justice.] -> grace_received
* [The gift is undeserved.] -> grace_received

=== grace_received ===
Grace is not fair. It is the guilty going free while the innocent dies. It is the criminal receiving life instead of death. It is what I received when I did not deserve it — and what Christ gave when I was still His enemy.
* [What you do with this gift?] -> response
* [The grace is overwhelming.] -> staggering

=== response ===
I have done nothing worthy of this gift. All I can do is live differently — as one who has been bought with a price too high to count. Every act of violence I once committed, every moment of hatred — all ends today.
* [A life transformed.] -> transformation
* [The price is too high.] -> scripture_fulfilled

=== transformation ===
A life transformed by the realization that the innocent died for the guilty. The Righteous One took my place. The Son of God looked down from the cross at the man who would succeed where the priests failed — not in killing a threat, but in witnessing to the power of resurrection love.
* [The witness was complete.] -> the_one_who_died

=== the_one_who_died ===
The one who died was not just another criminal. He was the Author of life itself, the Creator who spoke galaxies into being. When He died, it was not defeat — it was victory. The greatest act of love in human history.
* [The victory over death.] -> victory
* [The love endures.] -> love_endures

=== victory ===
The victory over death. Three days later, the tomb was empty. My freedom — purchased at such a cost — was the proof that no sinner is beyond grace.
* [The power that raised Him.] -> power_raise
* [The love transforms.] -> grace_received

=== love_endures ===
The love endures beyond the cross, beyond the tomb, beyond the grave. The same love that took my place now calls me to take up my cross and follow — not in rebellion, but in love that gives itself completely.
* [Following in His footsteps.] -> follow
* [The love transforms.] -> grace_received

=== follow ===
Following in His footsteps means laying down the sword that once brought me power. It means picking up the cross that once was my enemy's weapon. It means living for the One who died for me — not dying for causes I believe in.
* [The sword becomes a plowshare.] -> plowshare
* [The cross becomes a banner.] -> cross_banner

=== plowshare ===
The sword becomes a plowshare. The dagger becomes a pen. The rebellion becomes redemption. Every weapon I once used to tear down now builds up. The God who stopped my violence with His sacrifice now calls me to stop violence with His love.
* [The transformation is complete.] -> completion
* [The weapons are reversed.] -> reversed_weapons

=== reversed_weapons ===
The weapons are reversed. Where I once used the sword to take life, I now use love to give life. Where I once cursed those who stood against me, I now bless those who curse me.
* [The enemy becomes the ally.] -> ally
* [The cycle breaks.] -> cycle_breaks

=== ally ===
The enemy becomes the ally. The executioner becomes the executed. The victim becomes the victor. And the one who died on the cross — He is not the victim. He is the Victor.
* [The victory is complete.] -> completion
* [The story continues.] -> story_continues

=== cycle_breaks ===
The cycle of violence breaks on a cross. For two thousand years, humanity has responded to hatred with hatred. But the cross whispers: love. Forgiveness. Grace. Redemption.
* [Love fights the real battles.] -> love_fights
* [The cross changes everything.] -> changes_everything

=== love_fights ===
Love fights the real battles. Not with swords and shields. But with sacrifice and service. With forgiveness and mercy. With a willingness to take the place of the guilty and die for the undeserving.
* [The conversion of a killer.] -> completion
* [The kingdom advances.] -> kingdom_advances

=== kingdom_advances ===
The kingdom advances not by the might of men, but by the mercy of God. Not by the force of arms, but by the power of love. Not by the sword of rebellion, but by the cross of redemption. I am Barabbas — and my freedom is the proof that no sinner is beyond the reach of grace.
* [The proof endures.] -> completion

=== completion ===
The proof endures. The freedman walks in peace. The killer finds rest. The grave that once held my name has been emptied by love. And the man who died in my place — He lives, and His Kingdom lives on.
* [The freedman's testimony.] -> closing

=== closing ===
I go back to the hills. But the knives I carry now are not for killing — they are for cutting the bonds that still bind my people. The Galilean goes to the hill of execution, and I go to the hill of testimony. Let history decide who was useful — the criminal who was freed, or the Savior who died that I might live.
-> DONE
