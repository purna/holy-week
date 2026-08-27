# Lab System Specification

[Back to the game overview](Holy_Week.md)

This document is the source of truth for Lab mechanics, interaction rules, difficulty, feedback, and Lab state. It deliberately contains no case-specific evidence, prophecy, solution, or timeline database; those records belong to [`act1_case.js`](../js/act1_case.js) through [`act4_case.js`](../js/act4_case.js).

Scoring values shared with the wider game are canonical in [`ScoringSystem.md`](ScoringSystem.md). If a prototype-specific value below differs from that document or the running code, reconcile it before release.

## Lab actions

### Compare

The player selects two evidence items and submits them as a possible relationship.

- A valid pair yields a scripted deduction or research insight.
- A Scripture/fulfilment pair may complete Codex research.
- An invalid pair remains available for retry and applies the configured penalty.
- Successfully consumed evidence enters the shared `usedEvidence` pool only when the relevant task design calls for consumption.

### Link

The player assigns every active card to a defined group. The standard groups are:

- `people` — witnesses, suspects, rulers, disciples, and other participants;
- `prophecy` — Scripture and prophecy research items; and
- `event` — physical objects, traces, records, and event evidence.

Submission validates all assignments. Correct cards receive positive feedback and incorrect cards remain available for correction.

### Timeline

The player places the required real evidence into chronological order.

- The number of required slots depends on difficulty.
- Submission does not consume cards.
- Each slot receives immediate correct/incorrect feedback.
- The player can retry without rebuilding already correct positions unless the implementation intentionally resets the task.

### Contradict

The player identifies fabricated, misleading, bribed, or otherwise invalid evidence.

- Validation checks false positives and missed fake items.
- The UI explains why the submitted set is incomplete or incorrect without exposing answers before submission.
- Difficulty determines how many fake items must be found.

## Retry policy

| Condition | Retry | Consume items | Behaviour |
|---|---:|---:|---|
| Incorrect Compare or Link submission | Yes | No | Increment the tab's try count and enable Helping Hand eligibility. |
| Correct consuming submission | No | As configured | Mark the relevant evidence used and finish the task. |
| Timeline submission | Yes | No | Show per-slot feedback and permit immediate correction. |
| Contradict submission | Yes | No | Report false positives or remaining fakes and permit correction. |

## Hints, details, and Helping Hand

### Evidence details

The evidence info control opens a modal with:

1. **Detail** — narrative and historical context that does not depend on the active Lab tab.
2. **Lab clue** — reasoning guidance for Compare, Link, Timeline, or Contradict.

The modal must never print an item's internal fake/real flag or otherwise disclose the answer directly. Contradiction reasoning must come from authored clue text.

Viewing details applies the score and Doubt effects specified in [`ScoringSystem.md`](ScoringSystem.md).

### Hint

A hint provides contextual guidance without selecting or placing the answer. Its cost is difficulty-dependent. Hint use and Helping Hand use are tracked independently.

### Helping Hand

Helping Hand becomes available for a tab after at least one failed submission.

- It spends the configured resource cost.
- It performs one bounded assist: selects one valid partner, places one unassigned card, fills one timeline slot, or selects one fake item.
- A task completed after assistance receives reduced credit where configured.
- Tab-specific help state resets when that task completes.

## Difficulty

| Setting | Easy | Medium | Hard |
|---|---:|---:|---:|
| `hintCost` | 0 | 3 | 5 |
| `helpCost` | 2 | 5 | 8 |
| `penaltyMul` | 0.5 | 1.0 | 1.5 |
| `timelineSlots` | 3 | 5 | All required real items |
| `linkIncludeFakes` | No | Yes | Yes |
| `linkShowDesc` | Yes | Yes | No |
| `contradictFinds` | One fake | All required fakes | All required fakes |

Difficulty changes presentation and assistance, not the canonical truth of a case.

## UI behaviour

- Compare and Contradict use selectable evidence cards.
- Link uses group destinations and cards or chips.
- Timeline uses ordered drop zones and supports pointer and touch interaction.
- Selection, used, correct, incorrect, assisted, and disabled states must be visually distinct and exposed accessibly.
- Every evidence item keeps its info control available unless it has been intentionally retired from the task.
- Submission controls remain disabled until the minimum valid input is present.
- Feedback explains the reasoning and next action; colour alone must not carry meaning.

## State model

```js
let difficulty = 'medium';
let currentTab = 'compare';

let compareSelected = [];
let linkGroupAssignments = {}; // { evidenceId: groupId }
let timelineSlots = [];        // evidenceId | null
let contradictSelected = new Set();
let usedEvidence = new Set();

let tries = {
  compare: 0,
  link: 0,
  timeline: 0,
  contradict: 0
};

let helped = {
  compare: false,
  link: false,
  timeline: false,
  contradict: false
};

let helpActive = {
  compare: false,
  link: false,
  timeline: false,
  contradict: false
};
```

The concrete implementation may encapsulate this state, but it must preserve tab isolation, retry counts, assistance state, used evidence, and save/restore behaviour.

## Data contract

The Lab consumes case data rather than redefining it. Runtime case modules may supply:

- evidence IDs and display metadata;
- clue text per Lab action;
- group classification;
- real timeline order;
- fake markers;
- valid Compare pairs and deduction results;
- Scripture/fulfilment relationships; and
- completion and scoring hooks.

The Lab must treat IDs as opaque stable keys. It must not infer case truth from display labels, filenames, or Markdown.

## Completion and persistence

- Record completed deductions and research links idempotently.
- Never award the same completion reward twice after reload or repeated submission.
- Persist the active difficulty, completed tasks, used evidence, research state, scores, Doubt, and any assistance penalties needed to restore a case accurately.
- Case conclusion eligibility is owned by the case/progression layer; the Lab reports completed work but does not invent additional case requirements.

## Maintenance rule

When adding or changing a case, edit the appropriate `act*_case.js` file. Update this document only when Lab behaviour or its data contract changes. Do not append case evidence tables, prophecy lists, correct pair inventories, or case timelines here.
