// ============================================================
// CHARACTER: Pilate's Secretary
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// CASE EXPORT: temple_cleansing
// SOURCE: act1_case.js -> NPC 'pilates_secretary'
// BIBLE REFERENCE: John 2:13-21; Mark 11:15-18
// ------------------------------------------------------------
// PURPOSE: Administrative perspective on the Temple cleansing
// ------------------------------------------------------------

-> start

=== start ===
I am in the Praetorium this morning, formatting the official titulus for the crossbeam. The charge must be written clearly in Latin, Greek, and Hebrew so every traveller passing the main road reads it. The Prefect ordered it to read: "Jesus of Nazareth, King of the Jews." The priests are complaining about the phrasing.

* [Why are the priests complaining?] -> priests_complain
* [What does Pilate think?] -> pilate_response

=== priests_complain ===
They want "He said I am King of the Jews" — making it a subjective claim rather than an official charge. The Prefect refuses. He said: "What I have written, I have written." He does not take edits from the Sanhedrin.

* [That is significant defiance.] -> pilate_response
* [The inscription is important.] -> inscription_significance

=== pilate_response ===
Pilate was angry with them. They had brought a case he did not believe, tried to manipulate him into a conviction, and now they want to rewrite the charge after sentence has been passed. He despises them.

* [So the inscription stands as written.] -> closing
* [Pilate is more principled than they think.] -> principled_governor

=== inscription_significance ===
The inscription is not merely a label. It is an imperial declaration. It names Jesus as "King of the Jews" in three languages. Every Roman, every Greek, every Jew who passes will read it. The priests know this — that is why they want to change it.

* [The inscription is a threat to Roman authority.] -> roman_threat
* [The inscription speaks for eternity.] -> eternal_words

=== roman_threat ===
"King of the Jews" — those words are a threat to Roman authority. Any Jew reading that inscription will think: there IS a king. There IS a rival. There IS a sovereainty above Caesar's. The Prefect may not understand the theological implications, but he does understand the political ones.

* [That is why the priests object.] -> priests_object
* [The inscription will outlive them all.] -> closing

=== priests_object ===
Exactly. They want to soften the language — make it about His claims, not His identity. But the Prefect has already decided. Jesus of Nazareth is named as "King of the Jews" — a title of authority, not of aspiration. The stone cannot be un-laid once it is placed.

* [The declaration stands.] -> closing
* [The priests' objections are futile.] -> futile_objections

=== eternal_words ===
Some words are written in dust and fade with the wind. Others are carved in stone and endure for centuries. This inscription — written in three languages — will outlast the Temple, the Sanhedrin, and even Rome itself. The Prefect may not understand what he has accomplished.

* [The word endures.] -> word_endures
* [He has written more than he knows.] -> written_more

=== word_endures ===
The word written will endure. Long after the priests' complaints are forgotten. Long after the Sanhedrin's authority crumbles. Long after Rome's legions march to distant places. The words "Jesus of Nazareth, King of the Jews" will echo long after the stones fall silent.

* [The stone will fall and the word remains.] -> closing
* [The king will return.] -> king_returns

=== written_more ===
He has written more than he knows. The words King of the Jews — placed above a crucified man — will endure long after every priestly objection has been forgotten. What Pilate intended as political expedience, God has used to inscribe a crown of eternal truth. The stone remembers what the priests have forgotten.

* [The stone remains.] -> closing
* [The truth stands.] -> closing

=== principled_governor ===
Pilate may be many things — ambitious, opportunistic, self-serving. But in this moment, he chooses principle over expediency. "What I have written, I have written." Those are the words of a man who will not be bullied by a religious establishment.

* [Even a flawed governor can do justice.] -> flawed_justice
* [The principle stands regardless.] -> principle_stands

=== closing ===
What is written, is written. The Prefect does not take edits from the Sanhedrin. It serves as an imperial warning to anyone else planning a throne.
-> DONE

=== flawed_justice ===
Even a flawed governor can do justice on a single point. Pilate's hands are stained with many decisions. But this — this declaration of truth — it is correct. For perhaps the wrong reasons. But correct.
* [Finish the interview.] -> closing

=== principle_stands ===
The principle stands regardless of the man who speaks it. Truth written in three languages is truth written for all time. The Sanhedrin can complain. The Prefect can ignore them. The stones will remember what the priests have forgotten.
* [Finish the interview.] -> closing

=== futile_objections ===
The priests' objections are futile not because they lack power, but because they lack truth. A man who died on a cross with "King of the Jews" above his head — that is a king who died for his crown. And a crown offered in sacrifice is more powerful than a crown accepted in pride.
* [Finish the interview.] -> closing

=== king_returns ===
The king will return. Not as a suffering servant. Not as a crucified criminal. But as the risen Lord, the ascended King, the sovereign ruler of all creation. And when He returns, every knee will bow — including the knees of those who once complained about His inscription.


* [Finish the interview.] -> closing
