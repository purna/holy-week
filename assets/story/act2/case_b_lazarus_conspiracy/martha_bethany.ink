// ============================================================
// CHARACTER: Martha of Bethany
// ACT: Act II
// CASE: The Price of Life
// CASE ID: lazarus_plot
// CASE EXPORT: lazarus_plot
// SOURCE: act2_case_2d.js -> NPC 'martha_bethany'
// BACKGROUND: The practical, protective head of the Bethany household.
// Having witnessed her brother's descent into death and subsequent revival,
// she is now trapped in a terrifying surveillance grid, managing the safety
// of both her family and the living evidence of Jesus's power.
// BIBLE REFERENCE: John 11:1-44; John 12:1-8
// ------------------------------------------------------------
// PROPHECIES FULFILLED IN THIS CASE:
//   - Isaiah 25:8
//     Gospel: John 11:25
//     Insight: Lazarus's revival was a tactical, localized preview of
//     the ultimate cosmic victory over death that was about to occur
//     on Easter morning.
// ------------------------------------------------------------
// BIBLICAL CONTEXT:
//   Summary: Following the resurrection of Lazarus after four days in
//   the tomb, a massive theological shift occurred in Jerusalem. Instead
//   of celebrating, the chief priests and Pharisees called a council
//   meeting, fearing Roman intervention. John 12:10 explicitly records
//   that the chief priests made plans to put Lazarus to death as well,
//   because on account of him, many Jews were putting their faith in Jesus.
//   Historical note: The raising of Lazarus took place in Bethany, less
//   than two miles from Jerusalem. Because it happened right before
//   Passover, the city was filled with thousands of eyewitnesses and
//   curious pilgrims trying to catch a glimpse of the resurrected man.
//   Significance: This case exposes the moral bankruptcy of the corrupt
//   religious leadership. To protect their political positions, they
//   were willing to murder a living monument to God's resurrection power.
// ------------------------------------------------------------
// CASE FACTS (Truth Object):
//   culprit: caiaphas
//   motive: The high priests feared that the massive public following
//   caused by Lazarus's resurrection would spark a Roman military
//   crackdown, destroying their temple and nation.
//   method: Caiaphas and his inner circle bypassed standard judicial
//   procedures to authorize a shadow assassination plot against Lazarus
//   of Bethany, aiming to eliminate the physical evidence of Jesus's
//   greatest miracle before the Passover feast ended.
// ============================================================

-> start

=== start ===
# UNLOCK_EVIDENCE: grave_dirt
Lazarus has been raised from the dead. The whole city is talking about it. There are thirteen extra mouths to feed tonight, and the road to Jerusalem is monitored by patrols. Mary sits at His feet listening, but someone must handle the bread, the water, and the structural security of this house. We are hiding people who have prices on their heads.

+ [Your brother is alive.] -> lazarus
+ [How is Mary handling all this?] -> mary
+ [What will you do if the household is searched?] -> closing2

=== lazarus ===
He is the proof they want to destroy. A man who was dead for four days walking around is a living problem for the Sadducees. We keep him out of sight. The authorities have already been asking questions in Bethany.

+ [What questions?] -> danger
+ [What will you do if the household is searched?] -> closing2

=== mary ===
Mary has always been the listener. She sits at the feet of teachers while Martha handles the serving. Tonight, I understand her. He is speaking words that feed the soul.

+ [What will you do if the household is searched?] -> closing2
+ [But you are afraid?] -> danger

=== danger ===
They want him silenced. They cannot deny the miracle - Lazarus himself has been in the Temple courts three times now. So they are looking for a way to make him disappear permanently.

+ [Finish the interview.] -> closing
+ [What will you do if the household is searched?] -> closing2

=== closing ===
We have dried grain and oil for three days. The authorities are closing in. If I am speaking to you, it is because I believe someone outside this house needs to know what is happening in Bethany. Everyone believes Jesus is a prophet who has come to save his people from the Romans.
-> DONE

=== closing2 ===
The guards are already patrolling the eastern road. If they sweep the houses at dawn, I will have nowhere left to hide him. But I will try. For all our sakes.
+ [Finish the interview.] -> closing
