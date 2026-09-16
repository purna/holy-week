# Conversation state and interview patterns

## Runtime contract

All five platform dialogue managers use `js/gameplay/conversationStory.js` for node-based stories. Compiled Ink JSON continues to use inkjs. This project still uses a **documented Ink subset**, not a full Ink compiler. Unsupported syntax must fail conversion rather than leak into spoken dialogue.

Supported authoring syntax:

- `VAR name = false`, numeric and quoted-string literal defaults.
- `~ name = true`, `~ count += 1`, `~ count -= 1`.
- Boolean expressions with `not`, `and`, `or`, and single comparisons `== != > >= < <=`.
- Multiline `{ condition:` / `- else:` / `}` blocks for text, tags, and assignments.
- `+ {condition} [Question] -> passage` for repeatable questions.
- `* [Question] -> passage` for choices available once per interview run.
- Automatic `-> passage` transitions; they are not player-facing buttons.
- One shared terminal passage ending in `-> DONE`.

No functions, arbitrary JavaScript, includes, lists, inline interpolation, or arithmetic expressions are implied by this subset. Use a real Ink compilation workflow if the project later requires those capabilities.

## Saved state

Conversation snapshots live inside existing case progress under `conversations`; they are not a separate localStorage save. Each snapshot stores the story revision, current reply/menu, variables, passage visits, and questions asked. Returning to an unfinished interview resumes its last reply without repeating assignments or evidence tags. Completed interviews reopen from the entry while retaining topic memory. A changed source revision resets that interview snapshot only, leaving earned case progress intact. Resetting case progress also resets its conversations.

`visited_<passage>` is a read-only passage visit count; the current entry has already been counted when its conditions run. `evidence_<id>` reflects an evidence item collected in the existing case state. Do not set these reserved names in new stories. Variables are scoped to this conversation, not all appearances of the character.

Interview memory is not evidence verification. Merely reading every passage must not complete a case, award challenge points, or unlock Codex entries. Existing evidence, challenge, Lab, and case-completion systems retain those responsibilities.

## Investigative pattern: Missing Donkey

The nine stories in `assets/story/act1/case_a_missing_donkey/` are the reference collection.

1. Log the witness's configured evidence at the opening.
2. Offer distinct questions about observation, source, or motive, plus a way to leave.
3. State what a witness saw, heard secondhand, inferred, or cannot know.
4. Let evidence-conditioned follow-ups alter the account without forcing a worldview change.
5. Return to a small topic menu; reviewed questions remain readable.
6. End at one shared passage with a summary reflecting the questions asked.

Peter's practical loyalty, John's precise recollection, Tobias's direct consent, Eleazar's concern for order, and the child's limited view are different voices, not interchangeable explanations. Tobias and other invented witnesses are identified as dramatizations in source notes. The messengers in Luke 19 are not named as Peter and John.

John's retrospective distinction follows John 12:16: https://www.biblegateway.com/passage/?search=John+12%3A16&version=NIV . Avoid giving disciples complete immediate understanding of events.

## Emotional pattern: Mary Magdalene

`assets/story/act4/case_a_empty_tomb/mary_magdalene.ink` is the reference interview.

1. Establish the experience before interpreting it.
2. Invite listening; make clarifying questions optional.
3. Allow pauses without losing access to testimony.
4. Remember an offer of space, but do not turn compassion into a points exploit.
5. Preserve the movement from grief, through mistaken recognition, to recognition and commission.
6. Let the shared ending acknowledge whether the player heard the full account.

Use this structure for grief and restoration, not adversarial pressure mechanics. A witness's vulnerability is not evidence of unreliability.

## Voice and source checks

Read the relevant `assets/characters/*.json` profile. A scene-specific voice brief can clarify an inconsistent general profile, but never derive personality from appearance settings. Establish motive, vocabulary, sentence rhythm, knowledge limits, and the interview's time frame. Keep direct quotations distinct from paraphrase. Label fictional reconstruction and later interpretation. Do not give every opponent a forced conversion or every disciple a complete commentary.

## Conversion and tests

Run from the project root:

```sh
python3 scripts/ink_to_json.py assets/story
python3 -m unittest discover -s scripts -p 'test_*.py'
node --test scripts/test_conversation_story.mjs
node --test scripts/test_story_corpus.mjs
node --test scripts/test_lives_header.mjs
python3 scripts/audit_ink.py --report __docs/INK_DIALOGUE_AUDIT.md
```

The structural audit cannot prove that every condition combination has a route to an ending. Test conditional paths, missing evidence, return visits, completed replays, case switches, and reset behavior separately. A passing audit is not a biblical accuracy certificate or a completed editorial review.

## Implementation and verification — 16 September 2026

- Shared conversation state integrated into all five platform dialogue managers; saved interviews remain case-scoped.
- Nine Missing Donkey interviews and Mary Magdalene's empty-tomb interview are the model rewrites. Joseph of Arimathea, the crucifixion priest, and the penitent criminal also received targeted rewrites.
- All 108 source files received a navigation/evidence consistency pass: opening evidence tags, reusable questions, readable choices, and removal of redundant same-destination menus. Existing testimony outside the targeted rewrites was preserved; this is not a claim that every sentence has undergone a fresh historical review.
- All 108 files regenerated successfully. Structural audit: zero findings, including missing links, duplicate definitions, unreachable passages, and missing ending routes.
- 239 conversation/converter tests and two lives-header regression tests pass. Corpus traversal tests exercise stories with evidence absent and present; they are not an exhaustive proof of every possible future variable combination.
- Browser checks confirmed Mary's listening route remembers the offer of space and proceeds through recognition, commission, and announcement.
- Mobile2D lives moved beside Insight Points in the investigation status bar; canvas initialization and the counter were checked at 320, 768, and 1280-pixel widths. Life-value changes/reset are covered by an isolated updater test, not a full collision playthrough.
- Mobile3D has no lives/damage system in its current scene or shared Player class. No fictional fixed counter or new damage mechanic was added; that requires a separate scope decision.
