# Implementation Plan: Replacing Accusation with Prophecy-Based Case Resolution

## Why

Of the 15 cases, only 4 have a real `culprit` — the other 11 use `culprit: "none"`:

| Case ID | Act | Culprit |
| :--- | :--- | :--- |
| triumphal_entry | 1 | none |
| temple_cleansing | 1 | none |
| fig_tree_incident | 1 | none |
| authority_challenged | 2 | chief_priest |
| lazarus_plot | 2 | caiaphas |
| olivet_discourse | 2 | none |
| passover_lamb_chain | 2 | none |
| last_supper | 3 | judas |
| gethsemane_arrest | 3 | none |
| sanhedrin_trial | 3 | chief_priest |
| barabbas_choice | 3 | none |
| crucifixion_site | 3 | none |
| resurrection | 4 | none |
| roman_inquiry | 4 | none |
| peter_restoration | 4 | none |

Picking a suspect from a list is a hollow "solve the case" moment when 11 of 15 cases have no one to pick. Every case, however, already has at least one linked prophecy (1–6 per case). This plan replaces the accuse mechanic with a single, uniform resolution: **a case is closed when its prophecies are fully investigated (discovered + linked in the Lab)** — the same win condition for all 15 cases, including the 4 with a real culprit.

**Recommendation on the 4 real-culprit cases:** don't gate resolution on guessing the name. Fold the culprit into the case-closed narrative text as a reveal (`"The evidence points to Caiaphas..."`) rather than a mechanic. This keeps one resolution code path instead of two. Flag if you'd rather keep a lightweight accuse step just for those 4 — noted as an open decision in Phase 4 below.

---

## Phase 1: Data & State

- **Prerequisite check:** this plan depends on each `prophecy` object carrying `scriptureEvidenceId` and `fulfillmentEvidenceId` (as scoped in the earlier Investigation/Research decoupling plan). If that hasn't shipped to all four `act*_case.js` files yet, it's now a hard blocker — case resolution can't read prophecy completion without it.
- Add a computed helper: `caseManager.getCaseProphecyStatus(caseId)` → `{ total, complete, allComplete }`, reading from the global `codex` (or `propheciesFound` if `codex` isn't in yet).
- `truth.culprit` stays in case data as flavor text for the closing narrative — it's no longer read by any gameplay check.
- `p.accusation` is retired as a gameplay field. Keep reading it on old saves for backward compatibility (see Phase 5) but stop writing it.

## Phase 2: Scoring Rework (`ScoringSystem.md`)

Remove, from the Investigation Score table:
- ~~Correct Accusation (+50)~~
- ~~Incorrect Accusation (−25, +25 Doubt)~~
- ~~Perfect Case Bonus~~ tied to accusation correctness

Replace with:

| Action | Points | Notes |
| :--- | :--- | :--- |
| **Case Closed** | `+50` | Awarded once, when the last required prophecy for a case is linked in the Lab. |
| **Full Investigation Bonus** | `+25` | Case Closed with zero failed NPC challenges and zero incorrect Lab pairings. |
| Lab Deduction | `+15` | Unchanged. |
| Successful Challenge | `+10` | Unchanged. |
| Evidence Collected | `+5` | Unchanged. |

Doubt and Reputation systems are untouched — they still accrue from failed challenges and incorrect Lab pairings, nothing about how a case ends changes those triggers, except: drop the "Incorrect Accusation → +25 Doubt" row, since there's no accusation left to get wrong.

## Phase 3: Engine & Code Changes

**`caseManager.js`**
- Replace `submitAccusation(suspectId)` with `submitConclusion()` — no suspect parameter. This is also the method `GameManager.conclude()` already calls but that doesn't exist yet, so this closes that gap.
- New: `checkAndAutoConclude(caseId)` — called whenever a prophecy is marked `complete`. If it's the last one required for that case, calls `submitConclusion()` automatically. (Alternative: leave it manual — surface a "Conclude Case" button that only enables once `allComplete` is true, if you'd rather the player press something instead of it firing silently. Worth deciding before Phase 3 starts.)
- `submitConclusion()` score formula: `evidenceScore + labDeductionScore + challengeScore + caseClosedScore(50) + fullInvestigationBonus(25 if no failed challenges/incorrect pairings) − doubtPenalty`.

**`GameManager.js`**
- Delete `accuse(suspectId)` entirely.
- `conclude()` stays as-is; it already has no suspect dependency.

**`gameEngine.js`**
- Remove `window.accuse` export.
- The "Accuse" tab (`id: 'accuse'`) gets repurposed — rename to something like "Case File", showing the prophecy checklist for the active case and a status indicator (locked until `allComplete`, or a live progress count).

**UI (not shown in the files you shared, but flagged):** the current Accuse screen (suspect list + submit button) needs to become a prophecy checklist view. This is the single largest piece of net-new UI work in this plan.

**`deductionEngine.js` / `evidenceSystem.js`**
- Hook the prophecy-completion moment (SCRIPTURE + FULFILLMENT matched in the Lab) to call `caseManager.checkAndAutoConclude(activeCaseId)`.

## Phase 4: Open Decision — the 4 real-culprit cases

`authority_challenged`, `lazarus_plot`, `last_supper`, `sanhedrin_trial` have a real `culprit`. Two options:

1. **Uniform (recommended):** treat them exactly like the other 11 — prophecy completion closes the case, culprit is revealed in the result text, not guessed.
2. **Hybrid:** keep a lightweight accuse step only for these 4, running *after* prophecy completion as an optional "who was really behind it?" bonus round (could award a small side bonus, doesn't gate case-solved).

Let me know which of these you want before Phase 3 is built — it changes whether `submitConclusion()` needs an optional suspect branch at all.

## Phase 5: Save-Data Migration

Old `localStorage` saves have `p.accusation` and `p.score` in the old accusation shape. On load, if a case has an old accusation-shaped score but no prophecy-based conclusion, recompute `p.solved` from the current `codex`/prophecy status rather than trusting the stored value — the codex becomes the single source of truth for "is this case solved" going forward.
