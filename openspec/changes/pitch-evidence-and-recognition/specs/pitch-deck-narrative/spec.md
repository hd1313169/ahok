## Purpose

Defines what the pitch deck's (briefing.html) problem framing and core hypothesis must convey so the 7-minute proposal presentation argues from cited evidence rather than a single anecdote.

## ADDED Requirements

### Requirement: Core hypothesis covers comprehension and confirmation
The Proposal slide's core hypothesis (核心假說) SHALL state that the elder must be able to understand what a dose is for, in addition to confirming it was taken. A hypothesis that names confirmation alone does not satisfy this requirement.

Note: this is deliberately phrased as *understanding purpose*, not *identifying which dose is due right now* — the Insights & Decisions slide's two-layer breakdown (see the medication-recognition capability) establishes that family pre-sorting already resolves "which dose, now"; the hypothesis must stay consistent with that and not claim the app solves a problem the deck itself says is already solved elsewhere.

#### Scenario: Viewer reads the core hypothesis
- **WHEN** a viewer reads the 核心假說 card on the Proposal slide
- **THEN** the hypothesis text SHALL reference both understanding what the dose is for and confirming it was taken

### Requirement: Evidence slide presents sourced statistics
briefing.html SHALL include a slide, placed after the Proposal slide and before the Persona slides, that presents at least 3 statistics drawn from the underlying research notes, covering polypharmacy prevalence, medication non-adherence, and label/medication comprehension. Each statistic SHALL carry a source attribution using the same abbreviated public-source style already in use (e.g. "pmc.ncbi.nlm.nih") — never a citation to the internal research notes file itself.

#### Scenario: Viewer reaches the evidence slide
- **WHEN** a viewer advances from the Proposal slide
- **THEN** the next slide SHALL display at least 3 distinct statistics, each attributed to a public source, before the Persona slides appear

### Requirement: Insights & Decisions content is split into single-topic slides placed right after the Evidence slide
briefing.html SHALL present its Insights & Decisions content as separate single-topic slides — not one slide carrying multiple sub-points — placed immediately after the Evidence slide and before the Persona slides. Each such slide SHALL carry a small eyebrow tag with a unified sequential number ("洞察 1", "洞察 2", ...) rather than a reference to the competition rubric's Q1/Q2 question structure.

#### Scenario: Viewer advances from the Evidence slide
- **WHEN** a viewer advances from the Evidence slide
- **THEN** the following slides SHALL be single-topic Insights & Decisions slides, each tagged with a unified sequential number, before any Persona slide appears

#### Scenario: A slide covers more than one distinct insight
- **WHEN** a slide would otherwise need to present two unrelated sub-points together
- **THEN** it SHALL instead be split into separate slides, one per sub-point

### Requirement: Each insight slide separates its observation from its design decision
Each single-topic insight slide SHALL present its content as two labeled sections — "洞察" (the observation/finding) and "設計決策" (the resulting design decision) — rather than one undifferentiated block of prose.

#### Scenario: Viewer reads an insight slide
- **WHEN** a viewer reads any of the 5 single-topic insight slides
- **THEN** the slide SHALL show a "洞察" section and a separate "設計決策" section, each clearly labeled

### Requirement: The language-differentiation slide presents its statistics as individual stat cards
The language-differentiation insight slide's "洞察" section SHALL present its three statistics (primary-language-Taiwanese, primary-language-Mandarin, literacy rate) as individual stat cards, in the same visual style as the Evidence slide's stat cards, rather than embedding the numbers only in a paragraph of prose.

#### Scenario: Viewer reads the language-differentiation slide's observation section
- **WHEN** a viewer reads the language-differentiation slide's "洞察" section
- **THEN** the three statistics SHALL each appear in their own stat card

### Requirement: Live-narrated insight slides precede backup insight slides
Among the split Insights & Decisions slides, the slides intended for live 7-minute narration SHALL be placed before the slides held back as Q&A/backup material, so the live presentation path through the deck is contiguous.

#### Scenario: Presenter reaches the end of the live-narrated insight slides
- **WHEN** a presenter finishes the last live-narrated insight slide during the timed pitch
- **THEN** no backup-only insight slide SHALL appear between the Evidence slide and the end of the live-narrated insight slides

### Requirement: Language-differentiation insight cites the census statistic
The language-differentiation slide (Taiwanese voice support) SHALL cite the census-based primary-language statistic (65 and over: 65.9% primarily Hoklo/Taiwanese vs. 28.5% primarily Mandarin) alongside the existing family-observation account, distinguishing it from the separate literacy-rate statistic so the two are not conflated. This slide is one of the live-narrated slides.

#### Scenario: Viewer reads the language-differentiation slide
- **WHEN** a viewer reads the language-differentiation slide
- **THEN** it SHALL state both the family observation and the census primary-language statistic, and SHALL NOT present the literacy-rate statistic as if it measured spoken-language preference

### Requirement: Recognition-scope slide separates the two recognition problems
The recognition-scope slide SHALL explain the medication-recognition capability's scope as two distinct, visually separated statements: (1) the label-comprehension problem that family pre-sorting already resolves, and (2) the purpose-comprehension problem that remains and that the plain-language caption addresses. The two statements SHALL NOT be merged into a single undifferentiated paragraph, and SHALL NOT cite the internal research notes file by name. This slide is one of the live-narrated slides.

#### Scenario: Viewer reads the recognition-scope slide
- **WHEN** a viewer reads the recognition-scope slide
- **THEN** the two problems SHALL appear as separate, clearly distinguished statements (e.g. separate paragraphs or list items)
- **THEN** neither statement SHALL name the internal research notes file as its source

### Requirement: Family-photo insight slide explains the gamification rejection
A slide SHALL explain the decision to reject generic gamification (badges/achievements) in favor of unlocking a family photo on the medication-confirmation screen, grounded in the observation that family photos hold strong emotional value for isolated elders. This slide is one of the live-narrated slides, and SHALL NOT cite an external statistic for this point — it SHALL be presented as a personal/family observation, not desk research.

#### Scenario: Viewer reads the family-photo insight slide
- **WHEN** a viewer reads the family-photo insight slide
- **THEN** it SHALL state both the rejection of generic gamification and the reasoning for the family-photo alternative
- **THEN** it SHALL NOT attribute this reasoning to an external statistic or the internal research notes file

### Requirement: Backup insight slides remain reachable after the live-narrated slides
The family-exceptions-only and no-calendar insight points SHALL remain present in the deck as individual slides immediately following the live-narrated insight slides, so they stay reachable for Q&A without requiring navigation back to the deck's original slide order.

#### Scenario: A viewer looks for a backup insight after the live-narrated slides
- **WHEN** a viewer advances past the live-narrated insight slides
- **THEN** the family-exceptions-only and no-calendar slides SHALL appear next, before any Persona slide

### Requirement: Headline-weight statements do not claim scope the live pitch doesn't cover
The cover slide's `<h1>` and subtitle, the Proposal slide (問題描述, 成功指標, and its meta line), and the Design Goal slide's one-sentence `goal-statement` SHALL NOT reference appointment-reminder (回診) functionality, since the live 7-minute narrative never covers it. This applies only to these headline-weight, single-statement elements — it does NOT require removing 回診 from the IA architecture slide's screen inventory or the demo-nav menu's link labels (both correctly describe screens that exist in the prototype), and does NOT require rewriting the Persona or JTBD slides' detailed goal/challenge lists (backup detail is expected to exceed the live pitch's compressed scope).

#### Scenario: Viewer reads the cover or Proposal slide
- **WHEN** a viewer reads the cover slide's `<h1>`/subtitle or the Proposal slide's problem description, success metrics, or meta line
- **THEN** none of that text SHALL reference 回診/appointment-reminder functionality

#### Scenario: Viewer reads the Design Goal slide's one-sentence summary
- **WHEN** a viewer reads the Design Goal slide's `goal-statement`
- **THEN** it SHALL NOT reference 回診/appointment-reminder functionality

#### Scenario: Viewer reads the IA architecture slide or demo-nav menu
- **WHEN** a viewer reads the IA architecture slide's screen inventory or opens the demo-nav menu
- **THEN** entries naming the existing appointment-reminder screens (回診提醒, 編輯回診) MAY remain, since they describe screens that genuinely exist in the prototype rather than claiming live-pitch coverage
