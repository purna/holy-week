// ============================================================
// CHARACTER: Hillel (Junior Temple Scribe)
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// SOURCE: js/act1_case.js -> NPC 'hillel_scribe' (Junior Temple Scribe)
// BACKGROUND: A meticulous scribe assigned to the Temple's administrative offices. Hillel cross-references market ledgers for Passover lambs with priestly inspection records.
// BIBLE REFERENCE: Mark 11:15
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Malachi 3:1
//     Gospel: Matthew 21:12
//     Insight: The Messiah comes as a refiner, not a reformer — purging what is corrupt rather than patching it.
//   - Isaiah 56:7
//     Gospel: Mark 11:17
//     Insight: The Court of the Gentiles was meant for all peoples, but had been turned into a marketplace that excluded them.
// ============================================================

-> start
=== start ===
You have questions about the market? I have ledgers. Every sacrifice registered this week, every coin exchanged, every lamb inspected. My records show a 40 percent increase in moneychanger fees since Tuesday. 
* [What about the Passover lambs?] -> lambs
* [Did Jesus disrupt the schedule?] -> schedule
=== lambs ===
The inspectors were supposed to screen for blemishes from Nisan 10 onward. That was four days ago. Instead, the merchants are crowded into the Court of Gentiles while the priests argue over inspection fees. The lambs are queued outside the walls. The one thing required for Passover is being crowded out by the one thing forbidden — commerce.
* [So the Temple priorities are inverted?] -> schedule
=== schedule ===
If the Galilean's timing was intentional, He chose the morning of the inspection rush. Not when the priests were relaxed, but when every desk was full, every ledger open, every merchant shouting over prices. He crashed the peak transaction window.
* [That sounds calculated.] -> closing
* [Why would He do that?] -> closing
=== closing ===
My ledgers do not record motives. But the numbers do not lie: when He left, the fees stopped. The inspectors resumed two hours later. The lambs went through. Order returned — but only after the tables were broken.
-> DONE
