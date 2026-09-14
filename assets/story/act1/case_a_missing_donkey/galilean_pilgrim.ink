// ============================================================
// CHARACTER: Tobias (Galilean Pilgrim / Donkey Owner)
// ACT: Act I
// CASE: The Missing Donkey
// CASE ID: triumphal_entry
// CASE EXPORT: triumphal_entry
// SOURCE: act1_case_2d.js -> NPC 'owner'
// BIBLE REFERENCE: Mark 11:3-6 (unnamed owner)
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Zechariah 9:9
//     Gospel: Matthew 21:4-5; John 12:14-15
//     Insight: The donkey was not a practical choice - Roman rulers rode horses.
//     The donkey was a deliberate symbol of peace and humility, contrasted with
//     the conqueror's steed.
//   - Psalm 118:25-26
//     Gospel: Matthew 21:9; Mark 11:9-10
//     Insight: 'Hosanna' is the Greek transliteration of the Hebrew 'Hoshana' -
//     a cry for salvation, not merely praise. The crowd was quoting this Psalm as
//     a messianic acclamation.
//   - Genesis 49:10-11
//     Gospel: Matthew 21:1-9
//     Insight: Jacob's blessing over Judah, over 1,400 years before the event,
//     described a royal figure arriving on a donkey colt.
//   - Malachi 3:1
//     Gospel: Mark 11:11
//     Insight: The 'coming to the temple' link connects the triumphal entry
//     with the Temple cleansing the following day - two acts that together
//     announced Messiah's kingly authority and prophetic mission.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: On Nisan 10 (Palm Sunday), Jesus sent two disciples ahead to
//   Bethphage to collect a donkey colt that had never been ridden. This was
//   no coincidence - it was the precise fulfilment of a 500-year-old prophecy
//   from Zechariah 9:9.
//   Historical note: Bethphage was a small priestly village on the Mount of
//   Olives, roughly 1km from Jerusalem. Jesus's knowledge of where the donkey
//   was - and the pre-arranged answer for the owner - demonstrated divine
//   foreknowledge.
//   Significance: The triumphal entry deliberately echoed how King Solomon
//   entered Jerusalem for his coronation (1 Kings 1:33-35), riding on a donkey
//   down the Mount of Olives. Every Jewish bystander would have understood
//   the royal claim being made.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: none
//   motive: There was no crime. The donkey was lent willingly by a
//   sympathetic owner who recognised the fulfilment of Zechariah 9:9.
//   method: Jesus gave His disciples precise instructions, including a
//   pre-arranged phrase ('The Lord needs it') that would signal the owner
//   to release the colt. The colt - which had never been ridden - met the
//   Jewish requirement for a consecrated beast.
// ============================================================

-> start

=== start ===
Two men came for my donkey colt this morning. They said "The Lord needs it." I knew exactly what that meant. I've had the words of Zechariah 9:9 on my wall for twenty years. "Your king comes to you... humble and riding on a donkey." You think I was going to say no?

* [Why did you keep the colt unridden?] -> set_apart
* [The rope was cut, not untied.] -> rope_question

=== set_apart ===
# UNLOCK_EVIDENCE: prophecy_scroll
# UNLOCK_EVIDENCE: palm_branch
I've had that colt set apart since it was born. Never let anyone ride it. Some things you hold in reserve for the right moment.

* [And this was the moment.] -> palm_reveal
* [What about the cloaks?] -> cloak_reveal

=== rope_question ===
# UNLOCK_EVIDENCE: prophecy_scroll
# UNLOCK_EVIDENCE: palm_branch
The rope was cut? I didn't cut it - I untied the knot myself and handed the colt to them. Someone else must have cut it after. I wasn't watching the post after they left.

* [Then who?] -> palm_reveal
* [You seem very certain about the prophecy.] -> set_apart

=== cloak_reveal ===
I saw those cloaks go by - they used them as a saddle. That's also from the old accounts. When kings are anointed, people give what they have. It's an act of honour. The people were laying their cloaks on the ground.

* [And the palm branches?] -> palm_reveal
* [That confirms royal intention.] -> scroll_reveal

=== scroll_reveal ===
That scroll fragment in the tent? It's mine. My grandfather gave it to me. Zechariah 9:9 - we always believed that a day would come when those words walked off the page and into history. I believe today was that day.

* [Tell me about the crowd's reaction.] -> crowd_reveal

=== palm_reveal ===
The palms. People waving them as Jesus went by on the donkey. - this brought tears to my eyes. In the days of the Maccabees, palms meant liberation. Those people understood the language of what was happening.

* [And the cloaks?] -> cloak_reveal
* [This wasn't random.] -> scroll_reveal

=== crowd_reveal ===
The Pharisees' complaint says "the whole world has gone after him." If even they say that - perhaps they're right. Perhaps they just don't know what to do with it.

* [But you do.] -> closing

=== closing ===
When they said those words, I felt it in my chest. This was the day. I told them: "Take him. Give him whatever he needs." Then I walked down to the road to watch, and I wept. This was not a theft. This was the fulfilment of what I've been waiting for my entire life.
-> DONE
