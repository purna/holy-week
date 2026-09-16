// ============================================================
// CHARACTER: Market Informant / Bribe-Taker
// ACT: Act I
// CASE: The Overturned Tables
// CASE_ID: temple_cleansing
// CASE_EXPORT: temple_cleansing
// SOURCE: act1_case.js -> NPC 'informant' (Market informer)
// BIBLE REFERENCE: Matthew 26:14-16; Zechariah 11:12
// ============================================================

-> start

=== start ===
Information has a price. Names have a price. Silence also has a price. The Galilean's gathering had a ledger before the sun went down. One of the twelve.

+ [Who buys your information?] -> buyers
+ [What do you know about the betrayal?] -> betrayal
+ [The Sanhedrin's surveillance.] -> surveillance
+ [What is truth worth?] -> truth_value

=== buyers ===
The Sanhedrin pays in Tyrian shekels — gold-standard silver that no Roman mint has ever debased. The Zealots pay in copper and promises. The wealthy families pay in land deeds and daughters' dowries. And the priests? They pay in secrets. I take what I can carry.

+ [Continue.] -> silence_price

=== betrayal ===
One of the twelve disciples. The one who keeps the purse. He has concerns. Concerns that translate well into seventy pieces of silver — the price of a slave's life, Exodus 21:32. The information I provided led to a meeting in the shadows. A plan set in motion. Coincidence? I think not. The prophecy was written centuries before, and the fulfillment was arranged centuries before that.

+ [Finish the interview.] -> closing

=== surveillance ===
The Sanhedrin's network spans the city — gate guards, market watchers, Temple attendants. Every eye has its price. Every ear has its loyalty. They track movement through the gates, cross-reference tax records with synagogue rolls, monitor the markets. Their thoroughness is impressive. Desperate. And the Teacher's name is at the top of every list.

+ [Finish the interview.] -> closing

=== truth_value ===
The truth has a price, scribe — not because truth wants payment, but because men demand payment for what they have suppressed. Truth outlasts the crowd. The Teacher speaks truth today, just as He did when the priests asked about His authority yesterday.

+ [Finish the interview.] -> closing

=== silence_price ===
Favors are promises. Promises break in storms. They fade in time. They are forgotten when power shifts. Coin is fact. Promise is hope. The priests pay well for silence — but silver cannot silence inevitability. The truth that is suppressed has weight. And weight has momentum. And momentum cannot be bought.

+ [Finish the interview.] -> closing

=== closing ===
Information has a price. Names have a price. Silence also has a price. The choice is yours — buy the truth or bear the cost of its absence. Choose wisely, scribe. Your investigation depends on it.

-> DONE
