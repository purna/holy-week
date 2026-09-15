// ============================================================
// CHARACTER: Pontius Pilate (Roman Prefect)
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// SOURCE: act1_case.js -> NPC 'pontius_pilate' (Roman Prefect)
// BIBLE REFERENCE: Matthew 27:11-26; John 18:28-40
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 53:7
//     Gospel: Matt 27:12-14 — Jesus answered almost nothing
//     before Pilate. The silent lamb led to slaughter.
//     Insight: The Messiah's restraint under interrogation
//     fulfilled the suffering servant's character.
//   - John 18:36
//     Gospel: Jesus: "My kingdom is not of this world."
//     Insight: The kingship Pilate sought to suppress was not
//     the kind earthly kings understand — it would not be
//     established by force, but by sacrifice.
// ============================================================

-> start

=== start ===
Am I an expert in your theological disputes? Your priests drag this man to my praetorium at dawn and expect me to sign a death warrant for philosophical claims. But the disturbance is not only in the streets; it has entered my own sleeping chambers.
* [Your wife sent a message?] -> wifes_warning
* [You don't see Him as a threat?] -> threat
* [The crowd wants Barabbas.] -> barabbas

=== wifes_warning ===
Claudia sent a frantic note to the judgment seat: "Have nothing to do with that righteous man." She has suffered a great deal in a dream today because of him. She sees a guilt in this room that my ledgers cannot account for. A Roman of noble blood, not given to the superstitions of this province — yet she saw his face in torment.
* [Does her dream worry you?] -> truth_question
* [You dismissed her concern.] -> dismiss_warning

=== dismiss_warning ===
I told her it was only a dream. Roman discipline does not bend to visions. Yet I found myself asking the prisoner to speak — and received silence instead. His wife sees a righteous man; the Sanhedrin sees a rebel. I see a man who makes the silence heavier than a shield wall.
* [But you will execute Him.] -> crowd_response
* [Why did He not answer?] -> closing

=== truth_question ===
What is truth to a man holding three legions? I asked him the same. He spoke of a kingdom not of this world. My wife sees a righteous man; the priests see a rebel. I see a man who makes the silence heavier than a shield wall.
* [But you will execute Him.] -> crowd_response

=== threat ===
What is truth to a man holding three legions? A man who heals the blind and raises the dead is not a military threat. He is a philosophical problem. And Rome does not execute philosophers.
* [But you will execute Him.] -> crowd_response

=== barabbas ===
The crowd wants Barabbas — an actual murderer. Give them what they want. It satisfies the feast custom, and it gets this theological dispute off my docket.
* [You are washing your hands.] -> crowd_response

=== crowd_response ===
Mobs are volatile. Give them Barabbas if they want a thief. I will wash my hands of this local dispute. The sentence stands.
* [And the inscription on the cross?] -> writing

=== writing ===
"Jesus of Nazareth, King of the Jews." That is the titulus I authorised — in Latin, Greek, and Hebrew for every traveller on the road to read. The priests complained. I told them: what is written, is written. The Prefect does not take edits from the Sanhedrin.
* [That is defiance.] -> closing

=== closing ===
I have no further comments for your investigation. The matter is concluded.


-> DONE
