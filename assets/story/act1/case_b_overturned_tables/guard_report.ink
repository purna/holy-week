// ============================================================
// CHARACTER: Marcus (Roman Garrison Guard)
// ACT: Act I
// CASE: The Overturned Tables
// CASE ID: temple_cleansing
// CASE EXPORT: temple_cleansing
// SOURCE: act1_case.js -> NPC 'garrison_guard'
// BACKGROUND: A working-class Roman auxiliary stationed on the
// high outer wall walkways. Views regional theological squabbles
// with military detachment.
// BIBLE REFERENCE: Luke 19:47-48; Matthew 21:12-17; Mark 11:15-18
// ------------------------------------------------------------
// PROPHECIES FULFILLED:
//   - Malachi 3:1 — "Behold, I send my messenger, and he will prepare
//     the way before me." The Messiah comes as refiner, not reformer.
//   - Isaiah 56:7 — "My house shall be called a house of prayer for
//     all nations." Jesus restored the Temple's true purpose.
//   - Jeremiah 7:11-12 — "Has this house, which is called by My name,
//     become a den of robbers?" Jesus quoted this directly.
// ============================================================

-> start

=== start ===
On duty at the Antonia fortress. I watched the whole thing from the parapet. Last Sabbath morning outside the outer court — tables overturned, animals scattered, the crowd orange with excitement. He called it "My Father's house." The merchants called it their living. I called it my afternoon.

* [What did you witness?] -> witnessed
* [Your orders were to stand down.] -> stand_down
* [Did He quote Scripture?] -> scripture_quote

=== witnessed ===
# UNLOCK_EVIDENCE: temple_action
# UNLOCK_EVIDENCE: scattered_shekels
The money changers scattered first — Tyrian shekels rolling into the drainage cracks. Then the livestock dealers. Within minutes the court was cleared and the crowd was singing. I observed from the wall — disciplined, controlled, no blade drawn. Every movement had purpose.

* [The crowd supported Him.] -> crowd_support
* [The priests watched.] -> priests_watched

=== stand_down ===
Orders from the Centurion: do not intervene unless a full political rebellion. Flipped tables don't violate Roman civil law. Broken cages — not our tactical concern. The priests were furious we didn't send in cohorts. But why should Roman blood protect their currency exchange booths?

* [The priests wanted Roman force.] -> priests_watched
* [You recognized something deeper.] -> deeper_meaning

=== scripture_quote ===
He quoted Jeremiah: "My house shall be called a house of prayer for all nations." Then Isaiah: "They shall call on the Lord's name — as messengers of the Lord." The words were calm. The action was decisive. The Temple rang with prophecy.

# UNLOCK_EVIDENCE: scripture_quote
# UNLOCK_EVIDENCE: whip_of_cords
* [The words mattered as much as the actions.] -> deeper_meaning
* [The crowd heard both.] -> crowd_support

=== crowd_support ===
The crowd responded with songs of liberation. Pilgrims who had been cheated on previous visits felt vindicated. Foreigners who had been excluded felt welcomed. The Temple was becoming what it was meant to be — a house of prayer for all nations. Not a marketplace.

# UNLOCK_EVIDENCE: crowd_response
* [The priests were afraid.] -> priests_watched
* [The redefinition was radical.] -> radical_redefinition

=== priests_watched ===
The priests watched from the eastern gallery. They did not intervene — they could not. To stop the cleansing would have required force. And force against a crowd singing praises was force against God Himself. After the crowd dispersed, the emergency sessions began. The Temple authorities were meeting about the man, not the coinage. They could not contain this threat.

# UNLOCK_EVIDENCE: priestly_fear
* [They would plot arrest.] -> plot_arrest
* [The threat was theological.] -> radical_redefinition

=== deeper_meaning ===
The meaning was not in the means. The means were the message. The donkey was not transportation. It was testimony. The whip of rushes was not violence. It was vindication. The Messiah declared that God's house belongs to all nations — Jew and Gentile alike.

* [The declaration was permanent.] -> radical_redefinition
* [The kingdom was advancing.] -> kingdom_advancing

=== radical_redefinition ===
The redefinition was irreversible. Once someone had seen the Temple as a house of prayer, they could not unsee it. Once someone had heard that God's house was for all nations, they could not shrink it back to a Jewish monopoly. The conceptual damage was done — and it was eternal.

* [The transformation was cosmic.] -> kingdom_advancing
* [The priests would resist.] -> plot_arrest

=== kingdom_advancing ===
The kingdom was advancing — not with the fanfare of empires, not with the glory of kings, but with the sound of scattered coins and the smell of bruised animals. A whip of rushes declared more truth than a legion of soldiers. The Messiah who cleansed the Temple would soon cleanse the grave. The victory was certain.

* [The victory was complete.] -> closing
* [The testimony spreads.] -> closing

=== plot_arrest ===
From emergency sessions to whispered councils, the priests plotted. Arrest. Trial. Execution. Anything to restore their order. But every plot against the Messiah was part of the divine plan. Every attempt to stop the kingdom only advanced it further. The scattered coins had declared more justice than all their legal charges combined.

* [The plan could not be frustrated.] -> closing
* [The kingdom would prevail.] -> closing

=== closing ===
I have recorded what I witnessed. The Temple priests have filed their reports. The crowd has sung their songs. And the man who cleansed the Temple with a whip of rushes — He would soon cleanse the grave. The story continues. The kingdom that began with scattered coins would end with scattered chains. From a whip of rushes to a cross of glory — the advancement was unstoppable.

-> DONE
