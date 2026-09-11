// ============================================================
// CHARACTER: Market Vendor
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// SOURCE: formerly market_rumors (orphan file) — now referencing lazarus_plot
// BIBLE REFERENCE: John 12:9-11
// ------------------------------------------------------------
// PURPOSE: Connects the public testimony of Lazarus's resurrection
// with the Sanhedrin's emergency council and the beginning of the
// conspiracy. Market vendors are conduits of information in
// Jerusalem's streets.
// ============================================================

-> start

=== start ===
Good day! The market moves faster than news. People are saying strange things. What draws you to my stall? Have you heard the reports about the miracles circulating through the city?

* [I'm looking for information about the Galilean.] -> galilean_rumors
* [Have you heard about the Temple courts?] -> court_rumors

=== galilean_rumors ===
People are saying He healed a blind man at Bethesda. Others say He raised Lazarus from the dead in Bethany - a man dead for four days. The Pharisees are trying to keep it quiet, but you cannot stop a story like that from spreading. Who is He that can raise the dead?

* [What are the priests saying?] -> priest_response
* [The crowd accepts it.] -> crowd_accept

=== court_rumors ===
The Temple courts have been a whirlwind for three days running. Questions, answers, more questions - and the Galilean traps them with His words at every turn. They tried to trap Him on the question of taxes to Caesar or to God. He answered: "Give to Caesar what is Caesar's, and to God what is God's."

* [Tell me about the questions?] -> priest_response
* [The people were amazed.] -> crowd_amazed

=== priest_response ===
The chief priests and Pharisees met in emergency session after Lazarus. They're planning something. I don't know what, but when the Sanhedrin starts meeting before dawn, it is never good for anyone.

* [Have you seen anything suspicious?] -> closing
* [They are plotting.] -> plotting

=== crowd_accept ===
Who wouldn't? A man who can raise the dead - that is the kind of answer people have been waiting for. The crowds at the gate are thicker than the Passover traffic. Everyone is streaming toward Bethany.

* [The Sanhedrin is alarmed.] -> closing

=== crowd_amazed ===
Amazed is the right word. They asked about the Temple tax, about resurrection, about the greatest commandment. Every time, He answered so they could not find a flaw. The scribes took notes and looked foolish. The Pharisees left without their lunch.

* [The priests are troubled.] -> plotting

=== plotting ===
Troubled? They are terrified. I heard one of the priests slip away from the council meeting this morning - his robes were damp, and he kept looking back over his shoulder. They know something is wrong. The Galilean knows their hearts too well.

* [Will they act?] -> closing

=== closing ===
Keep your eyes open. I saw one of the coin-changers' guild slip into the High Priest's courtyard three days ago with a leather pouch full of silver.

-> DONE
