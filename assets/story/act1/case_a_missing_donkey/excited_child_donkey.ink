// ============================================================
// CHARACTER: Excited Child
// ACT: Act I
// CASE: The Missing Donkey (Triumphal Entry)
// CASE ID: triumphal_entry
// CASE EXPORT: triumphal_entry
// SOURCE: act1_case_2d.js → NPC 'excited_child'
// BIBLE REFERENCE: Matthew 21:1–11; Mark 11:1–11; Luke 19:28–40; John 12:12–19
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: On Nisan 10 (Palm Sunday), crowds in Jerusalem
//   recognized Jesus as the fulfillment of Zechariah 9:9,
//   waving palm branches and crying "Hosanna" as He rode
//   into the city on a donkey colt.
//   Significance: Children were among the most enthusiastic
//   witnesses, recognizing in Jesus the fulfillment of ancient
//   prophecy that older scholars had missed.
// ============================================================

-> start

=== start ===
I saw it happen! The colt appeared right near the Temple mount, just like the old prophecy said it would. The Teacher's friends untied it — well, my father helped them untie it — and the crowd went wild!

* [What did the crowd do?] -> crowd_reaction
* [The prophecy was fulfilled.] -> prophecy
* [My father helped with the donkey.] -> father_help

=== crowd_reaction ===
The people were shouting "Hosanna!" and throwing their cloaks on the ground. Some kids — older than me — were waving palm branches they'd cut from the trees. The soldiers looked nervous. The priests looked angry. But the people... they looked like they'd been waiting their whole lives for this moment.

* [What did the teachers say?] -> teachers_reaction
* [The donkey had never been ridden.] -> never_ridden

=== prophecy ===
My grandfather reads from the scrolls every Sabbath. He told me about a king who would come "humble, and riding on a donkey." I didn't understand what it meant until today. When the Teacher rode by on that colt, I knew — this was the day grandpa prayed for. I grabbed the biggest palm branch I could find and waved it as hard as I could.

* [You believed as a child.] -> simple_faith
* [The prophecy was clear.] -> zechariah

=== father_help ===
My father works the stalls near the eastern gate. When those two travelers came asking about the colt, he recognized the sign immediately. "The Lord needs it," they said. My father knew those words. He helped untie the rope himself and handed the colt over without asking for payment.

* [He knew the prophecy.] -> simple_faith
* [Why didn't he charge?] -> no_charge

=== teachers_reaction ===
The priests and scribes stood apart, arms crossed. I heard one of them mutter about "this rabble" and "false claims." But the children kept shouting. I think that's what annoyed them most — children believing without the years of study.

* [They rejected a child's faith.] -> blind_leaders
* [Children recognized the king.] -> child_prophet

=== never_ridden ===
The colt had never been ridden before — my grandmother told me, and she knows these things. A colt that has never borne a rider is set apart. Consecrated. Like the Passover lamb that has never had a yoke placed on it. The Teacher knew exactly what He was doing.

* [It was a holy thing.] -> consecrated
* [The preparation was divine.] -> divine_prep

=== simple_faith ===
Sometimes I think children see what the wise have learned to ignore. I didn't need scrolls or debates. I saw a man on a donkey and my heart knew: this was the one. Faith doesn't need explanations. It just needs eyes to see.

* [That is wisdom.] -> closing
* [Children lead the way.] -> closing

=== zechariah ===
"See, your king comes to you... humble, and riding on a donkey." Grandfather read it every year at this season. This year, it walked out of the page and into the street. History was watching itself happen.

* [Prophecy alive.] -> closing
* [The words had feet.] -> closing

=== blind_leaders ===
They study the Law but cannot see the Moment. They guard the Temple gates but miss the King entering through the Eastern Gate. Sometimes I wonder if their learning has made them blind to the very things they study.

* [Knowledge without sight.] -> closing
* [Their loss.] -> closing

=== child_prophet ===
There is a Hebrew saying — "from the mouths of children, you have established praise." Maybe that is what happened today. A child's voice calling "Hosanna" and the stones themselves would have answered.

* [Faith beyond learning.] -> closing
* [The stones were silent today.] -> closing

=== no_charge ===
"The Lord needs it" — those were the words. My father knew them from the scrolls. A prophet's authority is not a personal favor. It is a divine appointment. No charge is fitting for what God has ordained.

* [Obedience to the prophecy.] -> closing
* [Sacred preparation.] -> closing

=== consecrated ===
In our tradition, a colt that has never been ridden is marked for holy purpose. To ride it is to claim a sacred moment. The Teacher did not just enter Jerusalem — He consecrated the very ground beneath His path.

* [Sacred symbolism.] -> closing
* [The donkey as altar.] -> closing

=== divine_prep ===
The Teacher did not improvise. He sent His disciples to a specific place — Bethphage, beyond the cedars — to a specific colt — one that had never known a rider. Every detail was arranged. This was not spontaneity. This was divine orchestration.

* [Every detail planned.] -> closing
* [More than coincidence.] -> closing

=== closing ===
I ran home and grabbed every palm frond I could find. The grown-ups were shouting, the priests were fuming, and the soldiers looked confused. But I — I knew this was the day. The day the old songs would become real. The day the promises walked into our street.

"Hosanna to the Son of David!" I shouted until my voice was gone. And I would do it again tomorrow. And the next day. And every day until the king returned.

* [You were a prophet.] -> final

=== final ===
The grown-ups will write histories about this. They will analyze the politics, debate the theology, calculate the strategy. But I know the truth: I saw God enter the city. On a donkey. With children shouting and stones silent. And it was enough.

-> DONE
