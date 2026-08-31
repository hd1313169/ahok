## Why

poc.md brings evidence-based problem framing (Taiwan-specific polypharmacy, adherence, and label-comprehension statistics) that isn't reflected in the current 7-minute pitch. Two gaps matter most for the next demo: (1) briefing.html's Proposal slide argues the problem anecdotally and its core hypothesis only covers "remembering to confirm," under-weighting the stronger, data-backed "can't recognize what to take" problem (43.3% can't read medication bags, 40.0% can't name their own medications); (2) the prototype dropped all per-dose visual identification when an earlier decision rejected building a maintained medication record — but the data problem is about recognizing "this dose" in the moment, not about logging drug history, so a lightweight recognition aid doesn't actually conflict with that earlier decision.

## What Changes

- Rewrite briefing.html's Proposal slide 核心假說 (core hypothesis) to cover both "看得懂該吃什麼" (recognizing what to take) and "確認吃過" (confirming it was taken), not confirmation alone.
- Add a new evidence/data slide to briefing.html, placed after Proposal and before the Persona slides, presenting 3-4 statistics from poc.md (polypharmacy prevalence, non-adherence rate, label-comprehension failure, reliance on adult children for digital tasks) with lightweight source attribution, in the visual style already used by existing stat/card slides.
- Add per-dose recognition to the prototype: a family-set photo per time slot (of the actual dispensing pack/bag, not an individual pill) plus an optional plain-language purpose caption (family's own words, not a drug name or diagnosis) — surfaced on the elder-facing cards and captured through the existing family-editing form.
- Update PRODUCT.md's Information Architecture and Evidence sections to describe the added recognition fields so the document stays the authoritative reference for the prototype.
- Explicitly excluded (confirmed out of scope for this 7-minute pitch/demo): any real backend, working escalation-timer logic, drug-interaction or clinical-safety logic, a maintained medication database/history, and PoC validation metrics or recruitment flows — none of these are needed for a pitch deck and static demo.

## Capabilities

### New Capabilities
- `pitch-deck-narrative`: briefing.html's problem-framing and hypothesis content must be evidence-grounded and cite the supporting statistics.
- `medication-recognition`: the prototype's medication cards must support per-dose visual identification (photo of the dispensing pack + plain-language purpose caption) without requiring a maintained medication database.

### Modified Capabilities
(none — openspec/specs is currently empty; this change introduces the first two capabilities)

## Impact

- `briefing.html`: Proposal slide (核心假說 rewrite), new evidence slide.
- `prototype/01-today.html`, `prototype/03-medlist.html`: display the per-dose photo and purpose caption.
- `prototype/10-manage-meds.html`, `prototype/11-edit-med.html`: family-side photo/caption entry.
- `prototype/styles.css`: any new component styling the above screens need.
- `PRODUCT.md`: Information Architecture and Evidence on Hand sections updated to describe the recognition fields.
