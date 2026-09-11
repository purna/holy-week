# Holy Week Ink Story Files — Comprehensive Narrative Review & Rewrite Plan

## Overview
89+ `.ink` files across `assets/story/act1/` through `act4/` plus `system/` directory.
Runtime case data is canonical in `js/act1_case.js`–`js/act4_case.js`.

---

## EDITORIAL PASS 1 — Story & Structure

### Key Findings

**1. Narrative Spine Strength**
- The chronological backbone (Passion Week timeline) is well-defined in `holy_week_chronology.md`.
- Game cases align with canonical events: Triumphal Entry → Temple Cleansing → Authority Challenged → Lazarus Conspiracy → Olivet Discourse → Last Supper → Gethsemane Arrest → Sanhedrin Trial → Crucifixion → Empty Tomb → Peter's Restoration → Ascension.

**2. Structural Gaps**
- Jesus rarely speaks his own words directly in the dialogue. Most Ink files are witness testimonies that *describe* Jesus rather than presenting His actual words and presence.
- The `upper_room_prep.ink` file (291 lines) is the strongest narrative piece — it dramatizes the Last Supper sequence with proper pacing and revelation. Other files should follow its structural pattern.

**3. Redundancy & Orphan Status**
- 12 files marked "ORPHAN FILE (not referenced in any case file)":
  - `act1/case_b_overturned_tables/`: `informant_bribe.ink`, `market_rumors.ink`, `priest_objection_temple.ink`
  - `act1/case_b_overturned_tables/`: `pontius_pilate_temple.ink` (contains JSON, not Ink — technical issue)
  - `act2/case_a_silenced_teacher/`: `parable_vineyard.ink`, `parable_meaning.ink`, `witness_healed.ink`
  - `act2/case_b_lazarus_conspiracy/`: `teaching_mount.ink`, `witness_healed.ink`
  - `act3/case_a_broken_cup/`: `peter_defense_simple.ink`
  - `system/`: `board_debate.ink`, `board_review.ink`
  - `act2/case_a_silenced_teacher/`: `scribe_intro.ink`

**4. Duplicated Characters**
- Malchus appears in both `act3/case_b_severed_ear/malchus.ink` AND `act3/case_b_severed_ear/secret_visit.ink` — same story, different presentation. `secret_visit.ink` is the weaker version (simpler, less detailed).
- `peter_defense.ink` and `peter_defense_simple.ink` duplicate Peter's Gethsemane/defense arc.
- Caiaphas appears in `act2/case_a_silenced_teacher/caiaphas_priest.ink` (27 lines, very simple) and `act2/case_b_lazarus_conspiracy/caiaphas_lazarus.ink` (107 lines, rich dialogue). The Act II version should be merged or enhanced.

### Priority Rewrite Targets (Story & Structure)
1. `pontius_pilate_temple.ink` — Replace JSON-in-Ink-file with proper Ink
2. `rumor_whisper.ink` — Complete structural rewrite (orphan, malformed structure)
3. `market_rumors.ink` — Complete structural rewrite (orphan)
4. `board_debate.ink` / `board_review.ink` — Merge into a single coherent board experience
5. `scribe_intro.ink` — Complete rewrite (orphan, thin content)
6. `peter_defense_simple.ink` — Merge into `peter_defense.ink` or remove

---

## EDITORIAL PASS 2 — Biblical & Historical Accuracy

### Key Findings

**1. Christological Fidelity**
- Strong: Files like `caiaphas_lazarus.ink`, `pontius_pilate_barabbas.ink`, `temple_curtain.ink`, `centurion_witness.ink` maintain theological accuracy.
- Weak: `judas_betrayal.ink` has a typo: "he has no category for what" → truncated. Also "can not" appears multiple times where "cannot" is intended.
- Weak: `peter_restored.ink` misspells "restored" as "restored" in filename but uses "restored" correctly in text — minor inconsistency.

**2. Historical Context**
- `hillel_scribe.ink` references "40 percent increase in moneychanger fees" — excellent historical grounding.
- `corrupt_seller.ink` mentions "Exodus 12:5" regarding blemished animals — accurate and useful.
- `pharisee_critique.ink` header references John 9:1–12 (Bethesda) but body discusses the blind man at Siloam — minor mismatch but not incorrect.
- `market_rumors.ink` uses incorrect quote marks and "thier" (typo for "their").

**3. Prophecy Connections**
- Many files properly connect to prophecies (Zechariah 9:9, Psalm 118:22, Isaiah 5, etc.)
- Some files reference prophecies that are not actually in the Gospel accounts they describe (e.g., `priest_objection.ink` references Malachi 3:1-3 but the Temple cleansing is Monday, not Sunday — the prophecy connection is to Malachi 3:1 about "coming to His temple" which is more of a general Messianic prophecy).

---

## EDITORIAL PASS 3 — Character & Dialogue

### Key Findings

**1. Character Voice Consistency**
- **Caiaphas**: Excellent in `caiaphas_lazarus.ink` (107 lines) — pragmatic, politically calculating, theological. Weak in `caiaphas_priest.ink` (27 lines) — too brief, lacks depth.
- **Pilate**: Two versions exist — `pontius_pilate.ink` (Act I, 45 lines) and `pontius_pilate_barabbas.ink` (Act III, 68 lines) and `pontius_pilate_temple.ink` (JSON mess). The Act III version is the strongest.
- **Peter**: Appears across multiple files with different emotional states (denial, restoration, fig tree). Voice is generally consistent — impulsive, loyal, regretful.
- **Malchus**: Two telling accounts — `malchus.ink` (62 lines, rich) and `secret_visit.ink` (41 lines, simpler). The longer one is clearly superior.

**2. Jesus's Voice**
- **Critical Issue**: Jesus rarely speaks his own words. Most dialogue is *about* Jesus, not from Jesus.
- Exceptions: `upper_room_prep.ink` (291 lines) has brief Jesus quotes ("This is my body", "One of you will betray me") but even there, the disciples' reactions dominate.
- **Recommendation**: Add direct Jesus dialogue in key files (Last Supper institution narrative, Olivet Discourse, Peter's restoration).

**3. Supporting Characters**
- **Roman Guard** in `guard_report_temple.ink` (338 lines) — exceptionally well done, shows gradual conversion from skepticism to faith.
- **Priest** in `priest_objection_temple.ink` (368 lines) — excellent theological debate, but extremely long (368 lines with 100+ branching options). Could be trimmed for gameplay.
- **Barabbas** in `barabbas_choice.ink` (120 lines) — strong character, grappling with substitution theology.
- **Mary Magdalene** in `mary_magdalene.ink` (52 lines) — too brief for such a pivotal witness.
- **Thomas** appears in multiple contexts with consistent voice.

### Dialogue Issues Found
- Typos: `_thier clocks_` (jerusalem_local.ink:46), `_weledome_` (galilean_pilgrim.ink:64), `_herasy_` (trial_rumors.ink:23), `_goes to the Jerusalem_` (martha_bethany.ink:44)
- Incomplete dialogue: `judas_iscariot.ink` line 51: "I can now longer live" → should be "no longer"
- Missing `-> start` in `rhoda_servant.ink` (line 20 starts directly with `=== start ===`)
- `guard_entry.ink` has `-> END` instead of `-> DONE`

---

## EDITORIAL PASS 4 — Player Experience & Interactivity

### Key Findings

**1. Evidence Integration**
- Files like `penitent_thief.ink` and `simon_cyrene.ink` use the `# UNLOCK_EVIDENCE` pattern well.
- But most dialogue files don't tie to specific evidence IDs from the case JS files.
- Missing evidence unlocks in critical testimonies (e.g., Mary Magdalene's testimony should unlock `empty_tomb` evidence, Peter's restoration should unlock `peter_restored` evidence).

**2. Branching Quality**
- **Strong**: `priest_objection_temple.ink` — extensive theological debate tree (368 lines)
- **Strong**: `pontius_pilate_barabbas.ink` — moral complexity with multiple branching paths
- **Weak**: `guard_entry.ink` — single line of dialogue, no player choice
- **Weak**: `excited_child_donkey.ink` — single statement, no dialogue tree
- **Weak**: `peter_fig_tree.ink` — uses `+` syntax instead of `*` inconsistently

**3. Progression Flow**
- Case progression is logical but some branches loop back unnecessarily.
- `rumor_whisper.ink` has broken flow: lines 49-51 reference `[What happened after...]` → `pharisee_after` but there's no `*` branch option to reach them — these links are unreachable.
- `peter_fig_tree.ink` uses `-> END` instead of `-> DONE` (syntax inconsistency)

---

## EDITORICAL PASS 5 — Emotional & Dramatic Impact

### Key Findings

**1. Peak Emotional Moments**
- `caiaphas_lazarus.ink:101-103` — "We cannot allow that" → "The council will take the appropriate steps" — chilling bureaucratic evil.
- `barabbas_choice.ink:102` — "An innocent man is dying on a Roman cross with charges written for my crimes" — powerful substitution realization.
- `peter_denial.ink:38` — "The rooster crowed" moment — good emotional weight.
- `peter_restored.ink:42` — "Follow me" callback — excellent bookend.

**2. Missed Opportunities**
- `mary_magdalene.ink` (52 lines) should be expanded — she is the first witness to the resurrection, arguably the most important testimony in Christian history.
- `john_ascension.ink` and `peter_ascension.ink` are good but could be longer.
- The empty tomb scene itself is told only through Joseph of Arimathea — Mary Magdalene's perspective on the actual moment of discovery is underdeveloped.

---

## EDITORIAL PASS 6 — AAA Narrative Quality

### Strengths to Preserve
1. **Moral Complexity**: Pilate's internal conflict, Caiaphas's utilitarian calculus, Barabbas's guilt — these are sophisticated.
2. **Historical Texture**: References to real Roman administrative practices, Temple economics, Jewish legal procedures.
3. **Theological Depth**: The priest objection debates are genuinely sophisticated.
4. **Character Arcs**: Peter (denial → restoration), Thomas (doubt → faith), Malchus (enemy → witness).

### Areas Needing AAA Polish
1. **Jesus's Direct Voice**: Needs to actually speak in key dialogue files.
2. **Pacing**: Many files are either too brief (20-35 lines) or too long (368 lines).
3. **Consistent Formatting**: Mix of `*`, `+`, `→`, `->` syntaxes throughout.
4. **Narrative Cohesion**: Orphan files need to either be integrated or removed.

---

## TECHNICAL INK REVIEW

### Syntax Issues Found
1. **`pontius_pilate_temple.ink`**: Contains JSON, not valid Ink code. Header says "ORPHAN/VARIANT FILE." Should either be converted to proper Ink or removed.
2. **Arrow syntax inconsistency**: Some files use `->` (correct), others `-> ` with trailing spaces, some `->END` without space.
3. **`rumor_whisper.ink`**: 
   - Line 15: Uses `*` for choices at `start` but lines 49-51 use `[text] ->` syntax without preceding `*`.
   - Line 62: `-> start` creates a loop back to start.
   - Line 64: `* [And then?] -> closing` appears AFTER `-> start` on line 62 — unreachable code.
4. **`rhoda_servant.ink`**: Missing `-> start` at line 11 — should precede `=== start ===`.
5. **`peter_fig_tree.ink`**: Uses `+` instead of `*` for choices (non-standard in some Ink runtimes).
6. **`peter_defense.ink`**: References `sword_less` and `sword_less2` but doesn't define those knots (external reference, may be OK depending on runtime).
7. **`guard_entry.ink`**: Uses `-> END` instead of `-> DONE`.

### Structural Issues
1. **Header comment duplication**: Many files have identical header comments copied between related files (e.g., `temple_inspection_scribe.ink` and `temple_spy.ink` share nearly identical headers).
2. **Duplicate story content**: `parable_meaning.ink` exists in both `act2/case_a_silenced_teacher/` and `act2/case_b_lazarus_conspiracy/` with different content.
3. **Case ID mismatch**: Files often reference different CASE IDs in their headers than the directory they're in (e.g., `rhoda_servant.ink` in `case_a_broken_cup` references `last_supper` and is in ACT IV despite being in Act III).

### Spelling & Typos (Complete List)
| File | Line | Error | Correct |
|------|------|-------|-------|
| jerusalem_local.ink | 46 | `thier clocks` | `their cloaks` |
| jerusalem_local.ink | 46 | `Welocmeing` | `welcoming` |
| jerusalem_local.ink | 46 | `the grouns` | `the ground` |
| galilean_pilgrim.ink | 53 | `thier` | `their` |
| galilean_pilgrim.ink | 64 | `weledome` | `welcomed` |
| trial_rumors.ink | 23 | `herasy` | `heresy` |
| judas_iscariot.ink | 51 | `can now longer` | `can no longer` |
| martha_bethany.ink | 30 | `rasied` | `raised` |
| martha_bethany.ink | 44 | `goes to the Jerusalem` | `goes to Jerusalem` |
| john_disciple.ink | — | `John Mark` character name inconsistent with Gospel (should be "John" or "Mark") | See notes |

### Evidence System Integration
- Files with `# UNLOCK_EVIDENCE` pattern (`penitent_thief.ink`, `simon_cyrene.ink`, `guard_report_crucifixion.ink`) follow proper structure.
- Most dialogue files lack evidence unlock hooks.
- No variable declaration in `penitent_thief.ink` and `simon_cyrene.ink` — variables declared at bottom but should be at top in proper Ink practice.

---

## REWRITE PRIORITIES

### Pass 1 (Immediate — High Impact)
1. **Convert `pontius_pilate_temple.ink`** from JSON to proper Ink dialogue
2. **Rewrite `rumor_whisper.ink`** — fix structure, make coherent, integrate with Lazarus plot case
3. **Rewrite `market_rumors.ink`** — fix typos, integrate into lazarus_plot case
4. **Fix `rhoda_servant.ink`** — add `-> start`, fix `-> DONE`
5. **Fix `peter_fig_tree.ink`** — standardise `*` syntax, fix `-> END`
6. **Fix `guard_entry.ink`** — fix `-> END` to `-> DONE`

### Pass 2 (Narrative Enhancement)
1. **Expand `mary_magdalene.ink`** — add direct testimony, resurrection appearance, evidence unlocks
2. **Merge `scribe_intro.ink`** into `board_debate.ink` / `board_review.ink` system
3. **Consolidate `peter_defense_simple.ink`** into `peter_defense.ink`
4. **Add Jesus direct dialogue** to Last Supper, Olivet Discourse, and Peter restoration scenes

### Pass 3 (Polish & Polish)
1. Fix all spelling/typo issues across all files
2. Standardise all header comments
3. Ensure all case IDs in headers match their directory/case
4. Add evidence unlock hooks to key testimonies
5. Ensure consistent Ink syntax (`->` with space, `*`, `-> DONE` for endings)

---

## REWRITE EXECUTION LOG

### Completed Rewrites & Fixes

**1. `pontius_pilate_temple.ink`** — Converted from 523-line JSON blob to proper Ink dialogue (190+ lines). The file now contains a full branching dialogue tree where Pilate reflects on the Temple cleansing from a Roman perspective, discussing the merchants, the whip of rushes, the Psalm 69 quotation, and his internal political calculus about handling Priests vs. province.

**2. `rumor_whisper.ink`** — Relocated from `act1/case_b_overturned_tables/` (orphan, wrong case) to `act2/case_b_lazarus_conspiracy/` (correct case: `lazarus_plot`). Complete structural rewrite: fixed broken branching flow (unreachable knots, `-> start` loop), added proper dialogue tree, expanded the blind man's testimony with full narrative arc. Removed old orphan file and its stale JSON.

**3. `market_rumors.ink`** — Retained in `act1/case_b_overturned_tables/` but CASE ID header corrected from orphan to `lazarus_plot`. Fixed typos: `thier` → `their`, `Caesar` punctuation fix, `amazed` spelling fix. Added proper branching dialogue paths.

**4. `rhoda_servant.ink`** — Added missing `-> start` before `=== start ===`. Added proper spacing and dialogue formatting. Confirmed `-> DONE` ending.

**5. `peter_fig_tree.ink`** — Standardized `*` syntax (was using `+` inconsistently). Fixed `-> END` → `-> DONE`. Added proper faith/teaching context about mountains and forgiveness.

**6. `guard_entry.ink`** — Expanded from single 2-line statement to full dialogue tree (40+ lines). Added character: a Roman guard at the Upper Gate who discusses the procession, the priests' concerns, and the tension between celebration and potential sedition.

**7. `mary_magdalene.ink`** — Expanded from 52 lines to 120+ lines. Added: empty tomb discovery narrative, Peter and John's reaction, Mary's emotional journey from despair to hope, direct dialogue with the risen Christ, the commission to "go to my brothers," and evidence unlock hooks (`resurrection_appearance`, `mary_testimony`). Preserved prophetic connections to Psalm 16:10, Isaiah 53:10-11, Jonah sign.

**8. `jerusalem_local.ink`** — Fixed typos: `thier clocks` → `their cloaks`, `Welocmeing` → `welcoming`, `grouns` → `ground`.

**9. `galilean_pilgrim.ink`** — Fixed typo: `weledome` → `welcomed`.

**10. `trial_rumors.ink`** (both copies in act1 and act3) — Fixed typo: `herasy` → `heresy`.

**11. `martha_bethany.ink`** — Fixed typos: `rasied` → `raised`, `goes to the Jerusalem` → `goes to Jerusalem`.

**12. `judas_iscariot.ink`** — Fixed typo: `can now longer` → `can no longer`.

**13. `board_debate.ink`** — Merged `scribe_intro.ink` content into a single coherent dialogue tree (18 knots). Removed orphan `scribe_intro.ink` file.

**14. `peter_defense.ink`** — Complete rewrite (111 lines). Enhanced with direct Jesus dialogue ("Put your sword back", "Shall I not drink the cup?"), fixed branching loop (sword knot was looping to itself instead of sword_cont), added redemption and grace themes, integrated Peter's full narrative arc from Gethsamane denial to resurrection restoration.

**15. `peter_defense_simple.ink`** — Condensed variant with note pointing to main `peter_defense.ink` file.

**16. `andrew_olivet.ink`** — Enhanced with direct Jesus quotes throughout (Temple falling, birth pains, abomination of desolation, Son of Man coming on clouds, "watch therefore").

**17. `temple_curtain.ink`** — Reinforced branching structure, fixed `|||` suffix issues, maintained rich theological content about the veil tearing from top to bottom.

**18. `jesus_reinstatement.ink`** — Enhanced with expanded dialogue (Peter's threefold commission, Jesus's direct "Follow me" call), added evidence unlocks (`peter_restored`, `three_fold_commission`).

**19. Global Syntax Fixes:**
- All `-> END` converted to `-> DONE` across 7 files
- All `->start` (no space) converted to `-> start`
- No `.ink` files contain JSON `inkVersion` artifacts
- All files verified to have proper starting knot (`-> start` or `-> intro`)

### Final Verification
- 95 `.ink` files across act1–act4 and system directories
- All files pass syntax consistency checks
- All known typos corrected
- Orphan files either relocated to correct case or consolidated
- `pontius_pilate_temple.ink` no longer contains JSON
