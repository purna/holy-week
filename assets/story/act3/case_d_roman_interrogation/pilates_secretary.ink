// ============================================================
// CHARACTER: Pilate's Secretary
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// SOURCE: js/act1_case.js -> NPC 'pilates_secretary' (Administrative Recorder)
// BIBLE REFERENCE: John 19:19-22
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Pilate ordered a written charge, the titulus, fixed to
//   Jesus's cross reading "Jesus of Nazareth, King of the Jews" in
//   Latin, Greek, and Hebrew. When the chief priests objected to the
//   wording, Pilate refused to change it, answering, "What I have
//   written, I have written."
//   Significance: Intended as a mocking warning to would-be rebels,
//   the inscription instead stood as an unwitting proclamation of
//   Jesus's true kingship, written in the languages of the whole
//   known world.
// ------------------------------------------------------------
// ============================================================
//
-> start
=== start ===
State your name and business for the archives, scribe. I am formatting the official titulus for the crossbeam. The charge must be written clearly in Latin, Greek, and Hebrew so every traveler passing the main road reads it. The Prefect ordered it to read: 'Jesus of Nazareth, King of the Jews.' The priests are complaining about the phrasing.
+ [Why won't the Prefect change the wording?] -> protocol
+ [Are you recording the testimonies from the morning session?] -> records

=== protocol ===
What is written, is written. The Prefect does not take edits from the Sanhedrin. It serves as an imperial warning to anyone else planning a throne.
-> closing

=== records ===
The morning logs are closed. The sentencing is verified and passed to the execution detail. It is just state paperwork now.
-> closing

=== closing ===
-> DONE
