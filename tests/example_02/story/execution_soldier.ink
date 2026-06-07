// ============================================================
// CHARACTER: Marcus (Execution Soldier)
// ACT: Act III
// CASE: The Curtain and the Cross
// CASE EXPORT: crucifixion_det
// SOURCE: act4_case_2d.js → NPC 'marcus'
// ------------------------------------------------------------
// ============================================================
//

-> start
=== start ===
I am Marcus. I was on duty. I will read this scene plainly and let you draw your own conclusions. Last Sabbath, outside the outer court — tables overturned, animals scattered, the crowd orange with excitement. He called it My Father's house. The merchants called it their living. I called it my afternoon.
* [What did the merchants do?] -> merchants
* [Did He hurt anyone?] -> violence
=== merchants ===
The money changers scattered first — Tyrian shekels rolling into the drainage cracks. Then the livestock dealers. Within minutes the court was cleared and the crowd was singing.
* [The crowd supported Him?] -> crowd_support
=== violence ===
No blade was drawn. No centurion was summoned. He simply stood there while the merchants fled. It was the most disciplined crowd-disruption I have ever witnessed.
* [That sounds rehearsed.] -> opening
=== crowd_support ===
The people were already agitated from the triumphal entry two days prior. This was not a random crowd — this was a movement with momentum.
* [And the priests?] -> priestly_response
=== priestly_response ===
The priests are meeting emergency sessions day and night. They are not meeting about the coinage. They are meeting about the man.
* [Show me your official dispatch.] -> closing
=== closing ===
I am on duty. I will stick to what I observed. The rest belongs to the archives and the Sanhedrin's emergency sessions.
-> DONE
