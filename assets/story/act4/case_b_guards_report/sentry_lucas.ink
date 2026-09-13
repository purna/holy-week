// ============================================================
// CHARACTER: Lucas the Sentry
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: roman_inquiry
// CASE EXPORT: resurrection
// SOURCE: act4_case.js -> NPC 'sentry_lucas'
// BIBLE REFERENCE: Matthew 28:11-15; Matthew 27:62-66
// ------------------------------------------------------------
// EVIDENCE UNLOCKED:
//   - evidence_bribe_shekels (the high-grade sanctuary coins paid as hush money)
//   - evidence_broken_imperial_seal (the Roman governor's seal broken at dawn)
//   - evidence_shattered_spear (the legionary spear fractured by kinetic force)
//   - evidence_sanhedrin_report (the official report documenting the cover-up)
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Psalm 2:1-2
//     Gospel: Matthew 28:11-15 — "The chief priests... gave the
//     soldiers a large sum of money."
//     Insight: The rulers banding together against the Anointed One —
//     their conspiracy revealed in their own report and bribe coins.
//   - Matthew 27:62-66
//     Gospel: The imperial seal securing the tomb.
//     Insight: The seal broken by divine power, not human theft.
// ============================================================

-> start
=== start ===
The shift began at 2100 hours. Standard post at the garden tomb. The imperial seal was intact. Four of us — rotating watch. The disciples' report said we were asleep. That is the official story.
* [A Roman guard sleeping on post faces execution.] -> execution_threat
* [Where did those coins in your locker come from?] -> bribe_question
* [You were awake when it happened.] -> truth_claim

=== execution_threat ===
Which is why the High Priest gave his personal word to Pilate. Under Lex Julia, sleeping at your post during a sacred assignment carried the death sentence. But Caiaphas held a letter from the procurator.
* [The letter from Pilate.] -> pilate_letter
* [Pilate agreed to suppress.] -> pilate_arrangement

=== pilate_letter ===
The letter from Pilate — I saw it. "No harm to the body of the prisoner." Those were his exact words. He instructed his agents to ensure the corpse remained intact.
# UNLOCK_EVIDENCE: broken_imperial_seal
* [The seal was intact] -> seal_intact
* [What happened at dawn?] -> dawn_events

=== bribe_question ===
That silver is a "security stipend." The chief priests counted it out in the Sanhedrin chamber.
# UNLOCK_EVIDENCE: bribe_shekels
* [How many shekels?] -> shekel_count
* [The coins were Temple currency.] -> temple_currency

=== shekel_count ===
Fifty shekels each — enough to buy a small vineyard. The steward distributed them with practiced efficiency. The weight in my palm was unmistakable.
* [The payment was unprecedented.] -> unprecedented_payment
* [The weight felt wrong.] -> felt_wrong

=== unprecedented_payment ===
The payment was unprecedented. The amount could buy a small vineyard or fund a new start. The steward acted as if buying witness silence was routine. The machinery of cover-up was well-oiled.
* [The machinery was sophisticated.] -> sophisticated
* [The practice was routine.] -> routine_bribery

=== sophisticated ===
The machinery was sophisticated. The Sanhedrin knew how to handle inconvenient witnesses. Bribe money. A letter from the procurator. A pre-approved narrative.
# UNLOCK_EVIDENCE: sanhedrin_report
* [The cover was comprehensive.] -> cover_comprehensive
* [The truth would out.] -> truth_will_out

=== truth_will_out ===
The truth will out. It always does. No amount of silver can erase the earthquake. No letter can explain the light. No approved narrative can make the dead stay dead.
* [The truth was unshakeable.] -> unshakeable
* [The evidence was divine.] -> divine_evidence

=== dawn_events ===
Dawn brought the earthquake. A focused, violent shaking knocked every man flat. Dust filled the air. And in the chaos, a light white as lightning filled the garden.
* [The light appeared.] -> light_appears
* [The soldiers were paralyzed.] -> paralyzed

=== light_appears ===
The light appeared — white as lightning, brighter than the noonday sun, yet silent. It filled the garden, touched the tomb entrance, and the stone began to move.
* [The recognition was divine.] -> divine_recognition
* [The spear broke.] -> spear_breaks

=== paralyzed ===
Paralyzed by something beyond physical force. Awe and terror gripped us as we witnessed the divine intervention unfolding.
# UNLOCK_EVIDENCE: shattered_spear
* [The evidence was complete.] -> evidence_complete

=== spear_breaks ===
My spear — the pilum that served me eight years — snapped clean in two. The wood fibers showed compression failure.
# UNLOCK_EVIDENCE: shattered_spear
* [The force was supernatural.] -> supernatural_force
* [The evidence was physical.] -> physical_evidence

=== evidence_complete ===
The evidence was complete. We ran to the priests — not to Pilate. The priests smiled. And they counted out the coins.
# UNLOCK_EVIDENCE: sanhedrin_report
* [The report was filed.] -> report_filed
* [The truth was purchased.] -> purchased

=== report_filed ===
The Sanhedrin report was filed in triplicate. One copy for the procurator. One for the Temple elders. One — the one I keep hidden — for the day someone asks questions.
* [The admission is in writing.] -> written_admission
* [The cover-up is documented.] -> documented

=== truth_claim ===
I will repeat the authorized statement: "We fell asleep. The disciples stole the body." But the Sanhedrin knows we did not sleep. The coins prove it. The report proves it. The spear proves it.
# UNLOCK_EVIDENCE: sanhedrin_report
* [The contradiction is in their records.] -> contradiction
* [The truth is in the evidence.] -> evidence_proves

=== contradiction ===
The contradiction is in their own records. The Sanhedrin report admits receiving our account. The bribe coins were minted by the Temple. The broken seal bears the procurator's stamp.
* [The evidence is overwhelming.] -> overwhelming_evidence
* [The cover-up is complete.] -> complete_cover

=== overwhelming_evidence ===
The evidence is overwhelming. The coins. The seal. The spear. The report. All of it points to the same conclusion: something beyond human explanation occurred at the garden tomb.
* [The testimony is true.] -> truth_undeniable
* [The witnesses will testify.] -> witnesses_testify

=== truth_undeniable ===
The testimony is undeniable. We are Roman soldiers. We do not fabricate. The earth shook. The light appeared. The stone moved. The tomb was empty.
# UNLOCK_EVIDENCE: resurrection_appearance
* [The explanation was divine.] -> divine_explanation
* [The testimony is eternal.] -> eternal

=== eternal ===
The testimony is eternal. The evidence will speak. And the truth — that something beyond human comprehension happened in a garden outside Jerusalem — will echo through every generation until the Son of Man returns.
-> DONE
