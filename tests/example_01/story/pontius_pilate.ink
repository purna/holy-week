// ============================================================
// CHARACTER: Pontius Pilate
// ACT: Act IV
// CASE: The Guard's Report
// CASE ID: barabbas_choice
// SOURCE: ORPHAN FILE (not referenced in any case file)
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
Am I an expert in your laws, Judean? Your priests drag this man to my praetorium at dawn and expect me to sign a death warrant for words. They say he claims to be a king. If he is a king without an army, he is a fool. If he has an army, let him show his banners.
* [You don't see Him as a threat?] -> threat
* [The crowd wants Barabbas.] -> barabbas
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
