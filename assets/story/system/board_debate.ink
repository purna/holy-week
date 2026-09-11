// ============================================================
// CHARACTER: Senior Scribe - Investigation Board
// ACT: Global / Board
// CASE: Investigation Board
// CASE ID: investigation_board
// SOURCE: formerly board_debate.ink and scribe_intro.ink (merged)
// ------------------------------------------------------------
// ============================================================

-> start

=== start ===
Master Scribe. The archives hold testimony — not opinion. Many have walked these stones carrying questions no scroll could answer.

* [I seek truth here.] -> truth_seeker
* [What do the streets say?] -> street_rumors

=== truth_seeker ===
Then you have come to the right place. I have recorded the morning's events in the Temple courts — the challenges to the Galilean's authority, His answers, the silence that fell over the Sanhedrin by midday.

* [Tell me about the authority challenge.] -> authority_challenge
* [What was the crowd's reaction?] -> crowd_reaction

=== street_rumors ===
The streets are full of a hundred different versions of the same story. I prefer the official record. The Sanhedrin challenged Him at the Temple this morning. He answered every question. They had no response.

* [You were there?] -> truth_seeker

=== authority_challenge ===
The chief priests and elders came with formal questions — signed, sealed, presented with all the drama of a legal tribunal. They asked: "By what authority do you do these things?" He answered with a question about John the Baptist that left them publicly paralysed.

* [Paralysed?] -> exposed_authority

=== crowd_reaction ===
By the end, the crowd was silent. Not because they were unimpressed — because they were watching the strongest arguments in the city being dismantled one by one.

* [And the Pharisees?] -> pharisee_fall

=== pharisee_fall ===
The Pharisees and Herodians came with the tax question. They thought they had Him. Instead, He pointed to Caesar's coin and said: "Give to Caesar what is Caesar's, and to God what is God's." The coalition fell apart in that moment.

* [So they couldn't trap Him.] -> exposed_authority

=== exposed_authority ===
No one could say a word in reply. And from that day on, no one dared ask Him any more questions. That is in the archives. That is the record.

* [And the widow's offering?] -> widow_reveal

=== widow_reveal ===
Ah, you know that detail too. Yes — the widow gave two small copper coins. He called her over. He said she had given more than all the others. That was the moment I stopped writing and just... watched.

* [You were moved.] -> closing

=== closing ===
Apprentice — you add something to the piece that was missing when I first read your draft. You have the witness from the pool, the Roman record from Rome, the accounts from Mark's house, the Galilean who frightened the chief priests. But the real question is not about the man. It is about what scares people most about Him.

* [What scares them?] -> fear
* [The healings?] -> healings

=== fear ===
The threat was not the healings. The threat was the categories He would not fit. A man who claims authority over the Sabbath. A teacher who quotes Isaiah 5 and points at the Sanhedrin. A prophet who raises the dead and will not call down fire on Rome.

* [They fear losing control.] -> control
* [Continue.] -> closing2

=== healings ===
Healings happen. The Essenes have healing traditions. But this man speaks as if He authored the Law itself. That is not a prophet's tone. That is the tone of Someone withholding an inheritance from its current stewards.

* [The Sanhedrin heard that tone.] -> closing2

=== control ===
Yes. When a man acts as though the Temple is His Father's house, and the Pharisees are tenants who have abused the lease, the tenants begin to think about eviction. Not by legal process — by elimination.

* [And the Roman Governor?] -> pilate_path

=== pilate_path ===
Pilate found no fault in Him. Even Pilate — who washed his hands of the whole affair — could not find a capital crime. The Sanhedrin's case was fabricated from start to finish.

* [So the whole trial was illegal.] -> closing2

=== closing2 ===
But there is a final category, Maluch — one that no archive can fully contain. They think they are taking His life, but He is giving it up. This is not just a trial in a Judean court; it is the moment where heaven itself descends to touch the dust. He is the Son of God, delivering Himself up for the sins of the world. Write that, apprentice. For that is the only truth that will endure when these stones are gone.

* [The weightiest evidence.] -> board_review

=== board_review ===
The evidence with the most weight is the one that refuses to be explained away. A weighty piece of evidence is not the most dramatic — it is the one that generates the fewest alternative explanations.

* [The truth is already there.] -> final
* [The board grows.] -> final

=== final ===
Keep gathering. The board grows, but the truth is already there. You just have to be willing to see it.

-> DONE
