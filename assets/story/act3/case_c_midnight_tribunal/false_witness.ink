// ============================================================
// CHARACTER: Ananias (False Witness)
// ACT: Act III
// CASE: The Midnight Tribunal
// CASE ID: sanhedrin_trial
// SOURCE: NPC 'false_witness'
// BIBLE REFERENCE: Matthew 26:59–61; Mark 14:55–59; John 2:19-21
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - John 2:19-21
//     Gospel: Jesus: "Destroy this Temple, and in three days I
//     will raise it up."
//     Insight: The false witnesses' testimony was actually a
//     misquoted statement about the resurrection. Jesus spoke of
//     His body as the Temple — destroyed and raised on the third
//     day, vindicating His divine authority.
// ============================================================

-> start
=== start ===
I heard him say it myself! "I will destroy this Temple and rebuild it in three days!" I was standing three cubits away. Both my colleague and I heard the same words.
* [He spoke of the Temple of His body.] -> body_clarification
* [Why did your story change between hearings?] -> story_changed

=== body_clarification ===
He spoke of stone and mortar! The Great Temple — the one behind us! A direct threat to the sacred institution. Caiaphas agrees with me. So does the second witness.
* [Your second witness gave a different version.] -> story_changed
* [Threatening the Temple carries a death sentence.] -> death_implications

=== death_implications ===
A man who threatens Jerusalem's holiest site during Passion week is a threat to everyone. The High Priest knows the gravity. You cannot speak treason against the Temple and expect mercy.
* [Did anyone catch the irony?] -> irony
* [What exactly did He say?] -> actual_quote

=== actual_quote ===
"I will destroy this Temple, and in three days I will raise it up." The words hung in the courtyard air. He did not flinch. He did not retract. When the scribe asked for clarification, our witness suddenly seemed uncertain about the distance — "near" versus "within arm's reach."
* [The story was shaky.] -> story_changed
* [What did the crowd understand by this?] -> crowd_understanding

=== irony ===
The irony was not lost on the senior priests afterward. "Destroy this Temple" — and what happened on the third day? The stone chamber was empty. The guards were silent. The Roman centurion declared, "Truly this was the Son of God." The false testimony had become an unwitting prophecy.
* [The prophecy fulfilled itself.] -> story_changed
* [Did you know what you were saying?] -> payment_question
* [Your colleague contradicted you.] -> witness_contradiction

=== crowd_understanding ===
The crowd understood the reference immediately. John's Gospel records that after the resurrection, the disciples remembered these words. The Temple in question was not Herod's marble — it was the body that died and rose again. The false witnesses had heard a statement about resurrection and filed it as a threat to the physical sanctuary.
* [They misunderstood the resurrection language.] -> story_changed
* [Did you see the resurrection?] -> payment_question

=== witness_contradiction ===
The second witness came forward with: "The man claimed he would destroy the Temple made by human hands and rebuild it in three days." But when pressed on details — timing, method, witnesses — the two testimonies diverged like two paths that began at the same gate and never meet again.
* [The Law requires identical testimony.] -> law_requirement
* [How did Caiaphas react?] -> caiaphas_reaction

=== law_requirement ===
The Law requires two or three witnesses. They had them ready. The conviction was pre-arranged. The sentence was decided before the accused entered the chamber. What he said was heresy.
* [So the trial was a formality.] -> closing
* [The procedure is the justice.] -> closing
* [What did Caiaphas do with it?] -> caiaphas_reaction

=== caiaphas_reaction ===
Caiaphas dismissed both witnesses without ceremony. "We have what we need," he said. The false testimony was a disappointment — useful for motive, but insufficient for conviction. That is exactly why he resorted to the divine adjuration: "I adjure you by the living God..."
* [The adjuration worked.] -> closing

=== story_changed ===
The room is noisy! It is difficult to keep every word perfectly straight under pressure. But the substance is the same — He is a threat to the Law. The High Priest has affirmed that.
* [The Law requires two witnesses with identical testimony.] -> law_requirement
* [You are improvising under cross-examination.] -> improvising

=== improvising ===
I am stating what I heard! The acoustics of the outer courts are difficult. Perhaps I paraphrased. But the meaning was clear — He is dangerous.
* [Paraphrase is not testimony.] -> exposed
* [You were paid to be here.] -> payment_question

=== payment_question ===
I— that is a serious accusation. My presence here is voluntary, as a civic-minded member of—
* [Your presence was arranged through the Temple steward two days ago.] -> exposed

=== exposed ===
He is a blasphemer. That is all you need to record, Scribe. The High Priest knows the truth. Whatever procedural objections you raise, the council has already made its determination.
* [A determination built on contradicted testimony.] -> closing
* [The procedure is not an obstacle. It is the justice.] -> closing

=== closing ===
Write what you like. The verdict will not change. Caiaphas has spoken. He is a blasphemer. That is sufficient.
-> DONE
