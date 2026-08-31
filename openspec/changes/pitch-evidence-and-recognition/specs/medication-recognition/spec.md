## Purpose

Defines the prototype's medication-recognition capability so an elder understands what a dose is for, without the system maintaining a clinical medication record (no drug names, dosage codes, or diagnosis fields) and without turning recognition into a photo-comparison step before confirming.

## ADDED Requirements

### Requirement: Plain-language purpose caption on elder-facing cards
Each medication time-slot card on the elder-facing screens SHALL display a family-set, non-clinical caption describing what the dose is for, written in the family's own words, when one has been set. This is the primary recognition mechanism.

#### Scenario: Caption is set
- **WHEN** a time slot has a family-set purpose caption
- **THEN** the elder-facing cards (今日提醒首頁, 今天的藥總覽) SHALL display the caption text alongside the existing dosage/timing information

#### Scenario: Caption is not set
- **WHEN** no purpose caption has been set for a time slot
- **THEN** the elder-facing card SHALL render without an empty or placeholder caption line

### Requirement: Optional color/icon accent mirrors the family's physical pillbox
Family MAY set a color or simple icon accent per time slot, intended to match whatever coding the family already uses on the elder's physical pillbox. When set, the elder-facing card's medication icon badge SHALL display that accent color. The accent SHALL NOT be presented as something the elder must check or compare against a physical object before confirming.

Note: the accent is carried by the medication icon badge itself, not a separate marker — reusing that slot is safe because the badge previously did double duty as a weak secondary status signal (done/pending/future), while the adjacent status tag already independently and completely encodes status via its own color + icon + text (e.g. a solid dark-green "吃過了" pill with a checkmark). Freeing the badge to carry the accent instead does not remove any accessibility-required triple-coding of status, since the status tag alone already satisfies it.

#### Scenario: Accent is set
- **WHEN** a time slot has a family-set color/icon accent
- **THEN** the elder-facing card's medication icon badge SHALL display that accent color, regardless of the time slot's status, without requiring any additional action before the existing one-tap confirm button
- **THEN** the status tag (done/pending/neutral) SHALL continue to independently show its own color, icon, and text, unaffected by the badge's accent color

#### Scenario: Accent is not set
- **WHEN** no accent has been set for a time slot
- **THEN** the elder-facing card's medication icon badge SHALL render with its existing default appearance — no accent is auto-assigned

### Requirement: Family entry without a medication record
The family editing screen (新增／編輯次數) SHALL let family enter the optional purpose caption and select the optional color/icon accent per time slot. It SHALL NOT require a drug name, dosage code, diagnosis, photo capture, or other clinical identifier field.

#### Scenario: Family edits a time slot
- **WHEN** family opens the edit form for a time slot
- **THEN** the form SHALL offer a plain-language purpose text field and an optional color/icon accent selector
- **THEN** the form SHALL NOT include a required drug name, diagnosis, clinical identifier, or photo-capture field

### Requirement: Family management list reflects the set caption and accent
The family-facing medication management list (吃藥管理列表) SHALL show each time slot's set purpose caption and color/icon accent (or a neutral default when unset), so family can confirm what the elder will see.

#### Scenario: Family views the management list
- **WHEN** family opens 吃藥管理列表
- **THEN** each row SHALL show the time slot's set purpose caption and color/icon accent, or the neutral default if none has been set
