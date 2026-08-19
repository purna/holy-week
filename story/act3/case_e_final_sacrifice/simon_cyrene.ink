// ============================================================
// STORY: Simon of Cyrene
// CASE: crucifixion_site (act3CaseE — The Final Sacrifice)
// NPC ID: simon_cyrene
// UNLOCKS: cross_burden
// REVEALS PROPHECY: typology_isaac_wood
// SOURCE: Matthew 27:32, Mark 15:21, Luke 23:26
// ============================================================

-> intro

=== intro ===
A pilgrim sits apart from the crowd, still catching his breath,
rubbing at one shoulder beneath a cloak worn through at the seam.
He looks like a man who arrived in Jerusalem expecting a feast,
not this.

"I wasn't a follower. I wasn't even from here. I was walking in
from the countryside for the feast, and Roman hands grabbed me
off the road. No warning. No explanation."

-> main_hub

=== main_hub ===
+ [Ask what happened on the road] -> cautious_stage
+ [Ask why the soldiers chose him] -> pressured_stage
+ [Ask what he makes of it now] -> exposed_stage
+ [Leave him] -> repeat_stage

=== cautious_stage ===
"He'd already been carrying it Himself, from what I could tell —
the whole beam, on His own back. But He went down under it.
Couldn't get back up carrying that weight, not after what they'd
clearly already done to Him before I ever saw Him."

* [Continue] -> main_hub

=== pressured_stage ===
"The soldiers didn't ask. They pulled me straight out of the
crowd, forced my hands onto the beam, pointed me up the hill.
I didn't have a choice in any of it. Wrong place, wrong moment
— that's all it was, far as I understood it then."

* [Continue] -> main_hub

=== exposed_stage ===
"I keep thinking of Isaac. Carrying the wood up the mountain for
his own sacrifice, not knowing what it meant, trusting his father
without understanding why. I carried this man's wood up a
different mountain, and I didn't know what it meant either.
Not then. I think about it every day since."

{ not evidence_cross_burden:
    ~ evidence_cross_burden = true
    # UNLOCK_EVIDENCE: cross_burden
}
-> main_hub

=== repeat_stage ===
"My shoulder still bears the mark of it. I don't think it will
ever fully fade. I'm not sure I want it to."
-> END

// ------------------------------------------------------------
// Variables
// ------------------------------------------------------------
VAR evidence_cross_burden = false
