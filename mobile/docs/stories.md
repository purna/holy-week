

### **Story Assignment Audit**


#### **Act 1 (<code>act1_case_2d.js</code>)**

**Exports:** `act1CaseA` (The Missing Donkey) and `act1CaseB` (The Overturned Tables)


<table>
  <tr>
   <td><strong>NPC</strong>
   </td>
   <td><strong>Assigned <code>dialogueId</code></strong>
   </td>
   <td><strong>Expected Story File</strong>
   </td>
   <td><strong>Status</strong>
   </td>
  </tr>
  <tr>
   <td>Peter
   </td>
   <td><code>peter_defense</code>
   </td>
   <td><code>peter_defense.json</code> ✅ exists
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>John
   </td>
   <td><em>(no dialogueId set)</em>
   </td>
   <td>Should have <code>john_donkey.ink</code>
   </td>
   <td>⚠️ Missing <code>dialogueId</code>
   </td>
  </tr>
  <tr>
   <td>Tobias (owner)
   </td>
   <td><em>(no dialogueId set)</em>
   </td>
   <td>n/a — simple NPC
   </td>
   <td>Fine
   </td>
  </tr>
  <tr>
   <td>Eleazar ben Simon
   </td>
   <td><em>(no dialogueId set)</em>
   </td>
   <td><code>eleazar_sadducee.ink</code> listed in character profiles
   </td>
   <td>⚠️ Missing <code>dialogueId</code>
   </td>
  </tr>
  <tr>
   <td>Malachi (money changer)
   </td>
   <td><code>money_changer</code>
   </td>
   <td><code>money_changer.ink</code> ✅ exists
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Marcus (garrison guard)
   </td>
   <td><em>(no dialogueId set)</em>
   </td>
   <td><code>guard_report.json</code> ✅ exists
   </td>
   <td>⚠️ Missing <code>dialogueId</code>
   </td>
  </tr>
</table>



---


#### **Act 2 (<code>act2_case_2d.js</code>)**

**Exports:** `act2CaseA` (The Silenced Teacher) and `act2CaseB` (The Price of Life)

**Notable structural issue:** `act2CaseA` contains a large `deductions` block referencing evidence IDs `lazarus_status` and `secret_decree` — these belong to `act2CaseB` (the Lazarus case), not to The Silenced Teacher. The deductions appear to have been copy-pasted from Case B into Case A by mistake. Case A's own evidence pool (question_scroll, parable_fragments, cornerstone_carving, coin_of_caesar, fig_leaf_withered, widow_two_coins, witness_scroll) is correctly handled in the deductions *below* that erroneous block — so both sets are present, but the Lazarus deductions don't belong in `act2CaseA`.


<table>
  <tr>
   <td><strong>NPC</strong>
   </td>
   <td><strong>Assigned <code>dialogueId</code></strong>
   </td>
   <td><strong>Story File</strong>
   </td>
   <td><strong>Status</strong>
   </td>
  </tr>
  <tr>
   <td>Caiaphas (Case A)
   </td>
   <td><code>caiaphas_priest</code>
   </td>
   <td><code>caiaphas_priest.ink</code> ✅ exists
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Samuel (scribe)
   </td>
   <td><code>scribe_intro</code>
   </td>
   <td><code>scribe_intro.json</code> ✅ exists
   </td>
   <td>✅ Corrected
   </td>
  </tr>
  <tr>
   <td>Nathanael (Pharisee)
   </td>
   <td><code>pharisee_critique</code>
   </td>
   <td><code>pharisee_critique.json</code> ✅ exists
   </td>
   <td>✅ Corrected
   </td>
  </tr>
  <tr>
   <td>Temple Spy / Maluch (Case B)
   </td>
   <td><code>temple_spy</code>
   </td>
   <td><code>temple_spy.json</code> ✅ exists
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Annas (Case B)
   </td>
   <td><code>annas_patriarch</code>
   </td>
   <td><code>annas_patriarch.json</code> ✅ exists
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Martha (Case B)
   </td>
   <td><code>martha_bethany</code>
   </td>
   <td><code>martha_bethany.json</code> ✅ exists
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Nicodemus (Case B)
   </td>
   <td><code>nicodemus_conflicted</code>
   </td>
   <td><code>nicodemus_conflicted.json</code> ✅ exists
   </td>
   <td>✅ Resolved
   </td>
  </tr>
  <tr>
   <td>Simon the Leper (Case B)
   </td>
   <td><code>simon_leper</code>
   </td>
   <td><code>simon_leper.json</code> ✅ exists
   </td>
   <td>✅ Resolved
   </td>
  </tr>
  <tr>
   <td>Nicodemus as suspect (Case B)
   </td>
   <td><code>secret_visit</code>
   </td>
   <td><code>secret_visit.json</code> ✅ exists
   </td>
   <td>✅ Correct (matches the night-visit character)
   </td>
  </tr>
</table>



---


#### **Act 3 (<code>act3_case_2d.js</code>)**

**Exports:** `act3CaseA` (The Broken Cup / Last Supper), `act3CaseB` (The Severed Ear / Gethsemane), `act3CaseC` (The Midnight Tribunal), `act3CaseD` (The Final Sacrifice / Crucifixion)

**Structural note:** `act3CaseB` (Gethsemane) has its `deductions` block listed *twice* — once at the end of its own content (lines ~486–503) and once inside `act3CaseA`'s content (lines ~254–269). The `dropped_torch+severed_ear_wrap` key appears in both places. The Gethsemane evidence IDs (`dropped_torch`, `severed_ear_wrap`, `abandoned_linen`) are referenced inside Case A's deductions section — those IDs don't exist in Case A's evidence pool. This is a **copy-paste bleed** between cases.


<table>
  <tr>
   <td><strong>NPC</strong>
   </td>
   <td><strong>Assigned <code>dialogueId</code></strong>
   </td>
   <td><strong>Story File</strong>
   </td>
   <td><strong>Status</strong>
   </td>
  </tr>
  <tr>
   <td>John Mark (Case A)
   </td>
   <td><em>(no dialogueId)</em>
   </td>
   <td><code>rhoda_servant.ink</code> exists for Rhoda; no dedicated John Mark file
   </td>
   <td>⚠️ Missing <code>dialogueId</code>
   </td>
  </tr>
  <tr>
   <td>Rhoda (Case A)
   </td>
   <td><em>(no dialogueId)</em>
   </td>
   <td><code>rhoda_servant.ink</code> ✅ exists
   </td>
   <td>⚠️ Missing <code>dialogueId</code>
   </td>
  </tr>
  <tr>
   <td>Judas (Case A)
   </td>
   <td><code>judas_betrayal</code>
   </td>
   <td><code>judas_betrayal.ink</code> ✅ (listed in character profiles as a standalone file; <code>judas_iscariot.ink</code> also exists)
   </td>
   <td>⚠️ Confirm which file is intended — two Judas files exist
   </td>
  </tr>
  <tr>
   <td>John the Beloved (Case A)
   </td>
   <td><code>john_disciple</code>
   </td>
   <td><code>john_disciple.ink</code> ✅ exists
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Malchus (Case B)
   </td>
   <td><em>(no dialogueId)</em>
   </td>
   <td><code>secret_visit.json</code> — but that's Nicodemus's night visit, not Malchus. Character profiles assign Malchus to <code>secret_visit.ink</code>
   </td>
   <td>❌ Wrong conceptual match — <code>secret_visit</code> is the Nicodemus file
   </td>
  </tr>
  <tr>
   <td>Simon Peter (Case B)
   </td>
   <td><em>(no dialogueId)</em>
   </td>
   <td><code>peter_denial.json</code> ✅ exists and is appropriate
   </td>
   <td>⚠️ Missing <code>dialogueId</code>
   </td>
  </tr>
  <tr>
   <td>Roman soldier (Case B)
   </td>
   <td><em>(no dialogueId)</em>
   </td>
   <td><code>roman_assessment.json</code> ✅ exists
   </td>
   <td>⚠️ Missing <code>dialogueId</code>
   </td>
  </tr>
  <tr>
   <td>Caiaphas (Case C)
   </td>
   <td><code>caiaphas_priest</code>
   </td>
   <td><code>caiaphas_priest.ink</code> ✅
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Peter / denial (Case C)
   </td>
   <td><code>peter_denial</code>
   </td>
   <td><code>peter_denial.json</code> ✅
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>False Witness (Case C)
   </td>
   <td><code>false_witness</code>
   </td>
   <td><strong>No such file exists</strong> in the 37-file story list
   </td>
   <td>❌ Broken reference
   </td>
  </tr>
  <tr>
   <td>Centurion Longinus (Case D)
   </td>
   <td><code>centurion_witness</code>
   </td>
   <td><code>centurion_witness</code> — listed in character profiles as <code>centurion_witness.ink</code>
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Pashhur the Priest (Case D)
   </td>
   <td><code>temple_curtain</code>
   </td>
   <td><code>temple_curtain.ink</code> ✅ listed in character profiles
   </td>
   <td>✅ Correct
   </td>
  </tr>
</table>



---


#### **Act 4 (<code>act4_case_2d.js</code>)**

**Exports:** `act4CaseA` (The Empty Tomb), `act4CaseB` (The Guard's Report / roman_inquiry), `act4CaseC` (Breakfast by the Sea / reinstatement)

**Structural note:** `act4CaseA` and `act4CaseB` share significant NPC overlap (Lucas the guard, Caiaphas, Pilate's Secretary all appear in both). The evidence pool of Case B (`bribe_shekels`, `broken_imperial_seal`, `shattered_spear`) is also referenced in Case A's deductions. This creates a dependency where Case A deductions require Case B evidence — which the player doesn't have yet. These cross-case deductions should either be moved to Case B or the shared evidence noted explicitly.


<table>
  <tr>
   <td><strong>NPC</strong>
   </td>
   <td><strong>Assigned <code>dialogueId</code></strong>
   </td>
   <td><strong>Story File</strong>
   </td>
   <td><strong>Status</strong>
   </td>
  </tr>
  <tr>
   <td>Mary Magdalene (Case A)
   </td>
   <td><code>mary_resurrection</code>
   </td>
   <td><code>mary_resurrection.ink</code> ✅ listed in character profiles
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Marcus the guard (Case A)
   </td>
   <td><code>guard_report</code>
   </td>
   <td><code>guard_report.json</code> ✅ exists
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Joseph of Arimathea (Case A)
   </td>
   <td><code>joseph_arimathea</code>
   </td>
   <td><code>joseph_arimathea.ink</code> ✅ exists
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Lucas the sentry (Case B)
   </td>
   <td><code>guard_report</code>
   </td>
   <td><code>guard_report.json</code> ✅ exists
   </td>
   <td>✅ Fixed
   </td>
  </tr>
  <tr>
   <td>Caiaphas (Case B)
   </td>
   <td><code>caiaphas_priest</code>
   </td>
   <td>✅
   </td>
   <td>✅ Correct
   </td>
  </tr>
  <tr>
   <td>Pilate's Secretary (Case B)
   </td>
   <td><code>pilates_secretary</code>
   </td>
   <td><code>pilates_secretary.json</code> ✅ exists
   </td>
   <td>✅ Fixed
   </td>
  </tr>
  <tr>
   <td>Jesus / Risen Lord (Case C)
   </td>
   <td><code>jesus_reinstatement</code>
   </td>
   <td><strong>No such file exists</strong> in the 37-file story list
   </td>
   <td>⚠️ Reference still needs mapping
   </td>
  </tr>
  <tr>
   <td>Peter Restored (Case C)
   </td>
   <td><code>peter_restored</code>
   </td>
   <td><code>peter_restored.json</code> ✅ exists
   </td>
   <td>✅ Fixed
   </td>
  </tr>
</table>



---


### **Summary of Issues**

**Broken <code>dialogueId</code> references (file doesn't exist):**



* `nicodemus_conflicted` (act2CaseB NPC)
* `simon_leper` (act2CaseB NPC)
* `false_witness` (act3CaseC NPC)
* `jesus_reinstatement` (act4CaseC NPC)
* `peter_reinstated` (act4CaseC NPC)

**Wrong file assigned:**



* Annas in act2CaseB uses `priest_objection` — should be `annas_patriarch`
* Malchus in act3CaseB description references `secret_visit` conceptually — but that file belongs to Nicodemus's night visit

**Deduction content bleed between cases:**



* act2CaseA's `deductions` block contains Lazarus-case keys (`lazarus_status+secret_decree`, `grave_dirt+secret_decree`) — these belong in act2CaseB
* act3CaseA's `deductions` block contains Gethsemane evidence keys (`dropped_torch`, `severed_ear_wrap`) — these belong in act3CaseB
* act4CaseA's `deductions` reference act4CaseB's evidence (`bribe_shekels`, `broken_imperial_seal`, `shattered_spear`) before the player has played Case B

**Missing <code>dialogueId</code> fields** (NPC has no story file assigned despite likely needing one): John (act1CaseA), Eleazar ben Simon (act1CaseA), Marcus the guard (act1CaseB), Samuel the scribe (act2CaseA), Nathanael (act2CaseA), John Mark (act3CaseA), Rhoda (act3CaseA), Malchus (act3CaseB), Simon Peter (act3CaseB), Roman soldier (act3CaseB), Lucas (act4CaseB).
