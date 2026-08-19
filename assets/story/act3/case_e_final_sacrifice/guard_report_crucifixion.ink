// ============================================================
// STORY: Crucifixion Guard
// CASE: crucifixion_site (act3CaseE — The Final Sacrifice)
// NPC ID: execution_guard
// UNLOCKS: unbroken_legs, sour_wine_sponge, final_words, crucifixion_nails
// REVEALS PROPHECY: psalm_34_20
// SOURCE: John 19:28-36, Luke 23:46
// ============================================================

-> intro

=== intro ===
A Roman soldier stands apart from the others, cleaning his hands
with a rag that does little good. He has the look of a man who has
done this before, many times — and of a man unsettled by having
done it again today.

"You want to know how it's done, or you want to know what I saw?
They're not the same question. Ask carefully."

-> main_hub

=== main_hub ===
+ [Ask how the crucifixion itself was carried out] -> unlock_nails
+ [Ask about the legs of the two other men] -> unlock_legs
+ [Ask about the sponge and the vinegar] -> unlock_sponge
+ [Ask what His last words were] -> unlock_final_words
+ [Leave him] -> repeat_stage

=== unlock_nails ===
"Three nails. Wrists, not the palms — palms tear straight through
once the body's full weight comes down on them. Feet crossed and
pinned with the third, through the arch. He didn't cry out when
they went in. Most men do."

{ not evidence_crucifixion_nails:
    ~ evidence_crucifixion_nails = true
    # UNLOCK_EVIDENCE: crucifixion_nails
}
-> main_hub

=== unlock_legs ===
"Orders came down from the priests — break the legs of all three
before sundown, get the bodies off the crosses before the Sabbath.
Standard procedure, speeds up the death. We did the two thieves.
By the time we got to Him, He was already gone. Nothing left to
break."

{ not evidence_unbroken_legs:
    ~ evidence_unbroken_legs = true
    # UNLOCK_EVIDENCE: unbroken_legs
}
-> main_hub

=== unlock_sponge ===
"Near the end He said He was thirsty. One word, barely audible.
We soaked a sponge in the sour wine ration — what we drink on
duty, not fine stuff — and lifted it up to Him on a hyssop branch.
Wasn't cruelty. It's what we had."

{ not evidence_sour_wine_sponge:
    ~ evidence_sour_wine_sponge = true
    # UNLOCK_EVIDENCE: sour_wine_sponge
}
-> main_hub

=== unlock_final_words ===
"I heard it myself, clear as anything. Not a scream, not a groan
— a declaration. 'Father, into your hands I commit my spirit.'
Then He bowed His head, and it was finished. Loud. Deliberate.
Like a man choosing the moment, not one being dragged into it."

{ not evidence_final_words:
    ~ evidence_final_words = true
    # UNLOCK_EVIDENCE: final_words
}
-> main_hub

=== repeat_stage ===
"Three men crucified today. One of them died differently than the
other two. I've been doing this a long time. I don't have a good
explanation for that."
-> END

// ------------------------------------------------------------
// Variables
// ------------------------------------------------------------
VAR evidence_crucifixion_nails = false
VAR evidence_unbroken_legs = false
VAR evidence_sour_wine_sponge = false
VAR evidence_final_words = false
