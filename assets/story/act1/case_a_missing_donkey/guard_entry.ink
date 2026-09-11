// ============================================================
// CHARACTER: Guard at the Upper Gate
// ACT: Act I
// CASE: The Missing Donkey
// CASE ID: triumphal_entry
// SOURCE: act1_case.js -> NPC 'guard_entry'
// ------------------------------------------------------------
// ============================================================

-> start

=== start ===
Halt! This is a restricted area. The procession is about to begin - keep back or face the tribune's wrath!

* [Who is being processed?] -> procession
* [I'm not a threat.] -> not_threat

=== procession ===
The High Priest's own guard is here today. We have instructions to maintain the eastern wall corridor clear for the chief priests as they observe the entry. Pilgrims are... energetic.

* [They are celebrating.] -> celebrating
* [Are the priests watching?] -> priests_watch

=== celebrating ===
Celebrating? Perhaps. Or perhaps forgetting that every shout of "Son of David" echoes against Roman walls. We keep the gates clear for those who would call it sedition.

-> DONE

=== not_threat ===
Everyone claims they're not a threat. The crowd was not a threat until it became one. Step back from the gate.

-> DONE

=== priests_watch ===
They are watching. And they are not pleased. The noise from the lower road is carrying voices that the Sanhedrin would rather silence. We are ordered to prevent escalation, not to stop the celebration itself.

-> DONE
