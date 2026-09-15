// ============================================================
// CHARACTER: Simon the Pharisee
// ACT: Act I
// CASE: The Overturned Tables (Temple Cleansing)
// CASE ID: temple_cleansing
// CASE EXPORT: temple_cleansing
// SOURCE: act1_case.js -> NPC 'pharisee_critique'
// BIBLE REFERENCE: Luke 7:36-50; Luke 18:9-14; John 12:1-8
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Isaiah 40:6-8 — "All flesh is grass"
//     Insight: Simon's confident self-righteousness withers
//     before the weight of grace he cannot earn.
//   - Psalm 51:16-17 — "The sacrifice of God is a broken spirit"
//     Insight: True worship is not in correct procedure but in
//     a surrendered heart — revealed in the woman's anointing.
// ============================================================

-> start

=== start ===
I am Simon. A Pharisee of the council. A keeper of the law. On the Sabbath, my peers and I questioned the Teacher about His authority. Before that, He visited my home — and a woman anointed His feet. I invited Him, but I did not invite her. I questioned His worthiness, but I did not question my own.

* [Tell me about the woman at the dinner.] -> dinner
* [What happened at the Temple? Did He cite Scripture?] -> temple_scripture
* [You questioned His authority earlier.] -> authority_question
* [Conclude.] -> closing

=== dinner ===
# UNLOCK_EVIDENCE: witness_account
# UNLOCK_EVIDENCE: crowd_testimony
She entered uninvited. A woman of the city — they whispered. She carried an alabaster jar of ointment and stood weeping at His feet. I watched from my couch. I noted it immediately. "If this man were a prophet," I thought, "he would know who is touching his body." I composed myself, but inwardly I was satisfied. My suspicion was confirmed.

* [She anointed His feet.] -> anointing
* [What did you think about her tears?] -> tears

=== temple_scripture ===
# UNLOCK_EVIDENCE: prophecy_scroll
# UNLOCK_EVIDENCE: crowd_testimony
At the Temple, He did not answer our authority question directly. He spoke of John's baptism — divine or human? We could not respond without condemning ourselves. But in the Upper Room — weeks later — He said: "The hour has come for the Son of Man to be glorified." And He spoke of the grain of wheat falling into the ground. Some believed. Others did not.

* [You recognized the divine claim.] -> divine_claim
* [The crowd split on His words.] -> crowd_split

=== authority_question ===
The authority question — my colleagues and I approached Him boldly. "By what authority do you do these things?" we asked. "Who gave you this authority?" He turned it back on us: "Was John's baptism from heaven or from men?" We were cornered. Admit John was divine and we admitted Christ's authority. Deny it and the crowd turned against us. So we said we did not know.

* [The trap backfired.] -> trap_backfired
* [You left with nothing to say.] -> silence

=== anointing ===
# UNLOCK_EVIDENCE: crowd_testimony
The ointment was expensive — a pound of spikenard, worth a month's wages. She poured it on His feet and wiped them with her hair. My guests muttered about waste. "This could have been sold and given to the poor," they said. But He — He defended her. He said she had prepared Him for burial. He called her love greater than my criticism.

* [Love versus waste.] -> love_greater
* [He called her love greater.] -> love_greater

=== tears ===
Her tears filled His feet and she dried them with her hair. I noted her lack of propriety — no proper veil, no decent covering, her hair unbound in public. A respectable woman covers her head in the presence of authority. She showed no such respect — for anyone except Him. And her tears were not tears of shame. They were tears of devotion.

* [She had nothing to be ashamed of.] -> love_greater
* [Her tears cleansed her sins.] -> love_greater

=== divine_claim ===
The divine claim was irrefutable. "The hour has come." Not "I hope." Not "I intend." But "has come." As if the timing were not His to negotiate but His to declare. I am a Pharisee — I know the law, the Scriptures, the precedents. But I did not know what to make of a man who spoke as if the Father spoke through Him.

* [You were troubled.] -> divine_claim_troubled
* [The authority was unprecedented.] -> unprecedented

=== crowd_split ===
The crowd was split that evening. Some clung to His words about the grain of wheat — the idea that a seed must fall into the ground and die. Others recoiled. When He said, "If anyone comes to Me and does not hate his own family," they called it harsh. When He said, "I have not come to bring peace," they called it divisive. I watched the religious leaders among them turn away.

* [Division was the result.] -> closing
* [You recognized the cost.] -> closing

=== trap_backfired ===
The trap backfired completely. We expected evasion. We got a mirror. We asked about authority, and He asked about John. We sought to ensnare Him in His words, and instead, He ensnared us in our own. The people were with Him — "Blessed is the King who comes in the name of the Lord." And we... we had nothing to say.

# UNLOCK_EVIDENCE: witness_account
* [You understood your defeat.] -> defeat_understand
* [The defeat was public.] -> closing

=== love_greater ===
His words echoed in the hall long after she left. "Her sins, which are many, are forgiven — for she loved much. But to whom little is forgiven, the same loveth little." I had trusted in my ceremonial cleansing, my careful observance, my righteous standing before God. But He spoke of a love that forgave more than it judged. Of a mercy that exceeded the law. Of a grace that surpassed my righteousness.

* [You were humbled.] -> humbled
* [The parable of the debtors.] -> debtors_parable

=== divine_claim_troubled ===
Troubled, yes. Not because I doubted Scripture — I knew it intimately. But because this man handled it as no rabbi had. No debate. No citation of authorities. No careful parsing of texts. He spoke as if the words came from His own mouth — not from Moses or the prophets. And the crowd accepted it.

* [You questioned your certainty.] -> humbled
* [The words were authoritative.] -> closing

=== unprecedented ===
Unprecedented authority. No rabbi taught like this. No sage spoke as if the divine council debated in His presence. When He declared, "Your faith has saved you; go in peace," it was as if He bore the burden of sin and the power of absolution. I had spent my life studying the Law — and this man claimed to fulfill it, not explain it.

* [Fulfillment, not exposition.] -> closing
* [You were convicted.] -> humbled

=== silence ===
Silence. We had come with scrolls in hand, ready to record His contradiction. Instead, He handed us a question we could not answer. "We do not know," we said. And the crowd — the crowd that had gathered — they understood. They knew we had been outmaneuvered not by rhetoric, but by truth.

# UNLOCK_EVIDENCE: witness_scroll
* [The admission was recorded.] -> closing
* [You left with no answer.] -> closing

=== defeat_understand ===
I understood the defeat instantly. But it was not the defeat of an enemy — it was the exposure of my own inadequacy. I had prepared questions. He gave answers that required no preparation. I had studied the Law. He lived it without study. I had observed the rules. He broke them with authority.

* [You went home thoughtful.] -> humbled
* [The victory was effortless.] -> closing

=== humbled ===
Humbled. The parable of the debtors echoed in my mind: "A certain creditor had two debtors. One owed ten thousand. The other fifty. Neither could pay. The creditor forgave both. Which loves him more?" I had been forgiven nothing — because I had acknowledged no debt. I was the one who needed the physician, not the one who diagnosed the disease.

# UNLOCK_EVIDENCE: witness_account
* [The parable struck home.] -> debtors_parable
* [You saw your reflection.] -> closing

=== debtors_parable ===
The parable of the debtors cut deeper than any blade. "To whom little is forgiven, the same loveth little." I thought I was rich in righteousness. But I was bankrupt. The woman — the sinful woman — she had loved much. And I — I had loved little. Her tears cleansed her sins. My pride cleansed nothing.

* [The reflection was painful.] -> closing
* [You left a changed man.] -> closing

=== closing ===
# UNLOCK_EVIDENCE: witness_account
# UNLOCK_EVIDENCE: prophecy_scroll
I am Simon the Pharisee. I invited a prophet to dinner and discovered I was the one being judged. I questioned a teacher about His authority and found my own authority was nothing. The woman who anointed Him — she entered my home uninvited but left as a guest of honor. And I — I left humbled, holding scrolls that recorded not just His words but my own exposed inadequacy before the divine.

-> DONE
