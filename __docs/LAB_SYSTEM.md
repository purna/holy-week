# Lab System Specification

[Back to the game overview](Holy_Week.md)

This document is the source of truth for Lab mechanics, interaction rules, difficulty, feedback, and Lab state. It deliberately contains no case-specific evidence, prophecy, solution, or timeline database; those records belong to [`act1_case.js`](../js/act1_case.js) through [`act4_case.js`](../js/act4_case.js).

Scoring values shared with the wider game are canonical in [`ScoringSystem.md`](ScoringSystem.md). If a prototype-specific value below differs from that document or the running code, reconcile it before release.

## Lab sections

### Connections (required)

The player selects two evidence items, labels their relationship, and tests the connection. The case's `deductions` data is the source of truth.

- Supported relationship labels are `Corroborates`, `Fulfils / explains`, and `Challenges`.
- A valid connection displays the authored `text`, `insight`, and `bibleRef` fields.
- A valid connection awards 10 Insight Points once, even if repeated.
- An unsupported connection remains available for retry and does not lose points.
- Scripture/fulfilment research remains in the Codex rather than being duplicated here.
- Each case defines one to three `requiredConnections`; all other valid deductions are optional discoveries.
- Progress displays required key insights separately from optional discoveries.

### Timeline (required when chronology is authored)

The player places three to five pivotal events into chronological order.

- A case may define `timelineEvidenceIds` to choose the pivotal events explicitly.
- Without that field, the UI selects one representative item from each of the first five authored timeline positions.
- Submission does not consume cards.
- Each slot receives immediate correct/incorrect feedback.
- Success displays `timelineInsight` and `timelineBibleRef` when supplied by the case.
- A completed timeline awards 10 Insight Points once.

### Reliability Check (optional)

Reliability appears only when a case supplies a non-empty `reliabilityChecks` array. It must be based on an authored claim and conflicting evidence, not merely an internal `fake` flag.

- `claim` — the statement being assessed;
- `prompt` — the question shown to the player;
- `evidenceIds` — evidence relevant to the assessment;
- `correctEvidenceId` — the evidence that resolves the check;
- `explanation` and optional `bibleRef` — learning content shown after success.

## Retry policy

| Condition | Retry | Consume items | Behaviour |
|---|---:|---:|---|
| Incorrect Connection | Yes | No | Explain that the relationship is unsupported without revealing the answer. |
| Correct consuming submission | No | As configured | Mark the relevant evidence used and finish the task. |
| Timeline submission | Yes | No | Show per-slot feedback and permit immediate correction. |
| Reliability submission | Yes | No | Permit another evidence-based assessment. |

## Hints, details, and Helping Hand

### Evidence details

The evidence info control opens a modal with:

1. **Detail** — narrative and historical context that does not depend on the active Lab tab.
2. **Investigator guidance** — general reasoning guidance that does not reveal a task answer.

The modal must not expose a correct pair, relationship, timeline position, or reliability answer before submission.

Viewing details does not change Insight Points.

### Hint

A hint provides contextual guidance without selecting or placing the answer. Its cost is difficulty-dependent. Hint use and Helping Hand use are tracked independently.

### Helping Hand

Helping Hand becomes available for a tab after at least one failed submission.

- It spends the configured resource cost.
- It performs one bounded assist: suggests a relationship category, places one timeline event, or narrows a reliability assessment.
- A task completed after assistance receives reduced credit where configured.
- Tab-specific help state resets when that task completes.

## Difficulty

| Setting | Easy | Medium | Hard |
|---|---:|---:|---:|
| `hintCost` | 0 | 3 | 5 |
| `helpCost` | 2 | 5 | 8 |
| `timelineSlots` | 3 | 4 | 5 |
| Connection guidance | Relationship labels explained | Standard labels | Labels only |
| Reliability context | Full prompt | Standard prompt | Concise prompt |

Difficulty changes presentation and assistance, not the canonical truth of a case.

## UI behaviour

- Connections uses two selectable evidence slots and an authored relationship label.
- Timeline uses ordered drop zones and supports pointer and touch interaction.
- Reliability is absent unless the active case provides authored checks.
- Selection, used, correct, incorrect, assisted, and disabled states must be visually distinct and exposed accessibly.
- Every evidence item keeps its info control available unless it has been intentionally retired from the task.
- Submission controls remain disabled until the minimum valid input is present.
- Feedback explains the reasoning and next action; colour alone must not carry meaning.

## State model

```js
let difficulty = 'medium';
let currentTab = 'connections';

let connectionSelected = [];
let connectionRelationship = 'compare';
let timelineSlots = [];        // evidenceId | null
let completedConnectionIds = new Set();

let tries = {
  connections: 0,
  timeline: 0,
  reliability: 0
};

let helped = {
  connections: false,
  timeline: false,
  reliability: false
};

let helpActive = {
  connections: false,
  timeline: false,
  reliability: false
};
```

The concrete implementation may encapsulate this state, but it must preserve tab isolation, retry counts, assistance state, used evidence, and save/restore behaviour.

## Data contract

The Lab consumes case data rather than redefining it. Runtime case modules may supply:

- evidence IDs and display metadata;
- authored deductions with relationship, explanation, insight, and Bible reference;
- pivotal timeline IDs, order, explanation, and optional Bible reference;
- optional authored reliability checks; and
- completion and scoring hooks.

Every current case supplies this explicit Lab contract:

```js
timelineEvidenceIds: ['evidence_a', 'evidence_b', 'evidence_c'],
timelineInsight: 'Why this sequence matters.',
timelineBibleRef: 'Book 1:1–3',
requiredConnections: [
  { pair: 'evidence_a+evidence_b', operation: 'compare' }
]
```

`operation` is the stable data value: `compare` means Corroborates, `link` means Fulfils / explains, and `contradict` means Challenges. Required pairs must reference evidence in the same case and an authored entry in `deductions`.

The Lab must treat IDs as opaque stable keys. It must not infer case truth from display labels, filenames, or Markdown.

## Completion and persistence

- Record completed deductions and research links idempotently.
- Never award the same completion reward twice after reload or repeated submission.
- Persist completed connections, timeline state, research state, and Insight Points accurately.
- Case conclusion eligibility is owned by the case/progression layer; the Lab reports completed work but does not invent additional case requirements.

## Maintenance rule

When adding or changing a case, edit the appropriate `act*_case.js` file. Update this document only when Lab behaviour or its data contract changes. Do not append case evidence tables, prophecy lists, correct pair inventories, or case timelines here.
