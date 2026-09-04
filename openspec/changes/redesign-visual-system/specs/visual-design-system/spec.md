## Purpose

Defines the app's two-track visual system: a shared, softened AA-contrast color palette used by all 13 screens, a layout floor that stays stricter on the 6 elder-facing screens, and a more permissive, visually rich layout treatment for the 7 caregiver/admin-facing screens.

## ADDED Requirements

### Requirement: Shared token base across both tracks
The elder track and the caregiver/admin track SHALL share one underlying token base: the color role palette (primary, secondary, accent A, accent B, success, danger, and their deep variants) defined in `design guide.md`, the corner-radius scale, and the spacing scale. Neither track SHALL introduce a color role, radius value, or spacing value outside this shared base. This shared palette was revised mid-implementation to a lower-saturation, higher-lightness set of hex values (see `design guide.md` §0 and §3) at the user's explicit request; both tracks pick up that revision automatically since they consume the same tokens.

#### Scenario: New component reuses existing tokens
- **WHEN** a new component is added to either track
- **THEN** its colors, corner radii, and spacing are drawn from the existing shared token set rather than new one-off values

### Requirement: Elder-track accessibility floor
On all 6 elder-facing screens (每日提醒首頁, 已完成確認, 藥物列表, 緊急聯絡, 回診提醒, 語音設定), the visual system SHALL enforce: body and label text contrast of at least 4.5:1 against its background, and large/bold text (18pt+, or 14pt+ bold) at least 3:1 (WCAG AA — relaxed from the original AAA/7:1 floor at the user's explicit, informed request; see `design guide.md` §0 for the recorded tradeoff against the original `poc.md`-cited rationale); background SHALL use the shared near-white secondary token (not a stark #FFFFFF, but no longer required to be a distinctly warm oatmeal tone either); at most one dominant accent color per screen used for emphasis (excluding the fixed-role success/danger colors); single-column layout with no reduction in text size or touch-target size from the current baseline; and status communicated through color plus text plus icon together (never color alone).

#### Scenario: New or restyled elder-screen component checked against the floor
- **WHEN** any component on an elder-facing screen is added or restyled
- **THEN** it is verified against all five floor constraints (contrast, background, single accent, layout/touch-target size, triple-encoding) before being considered complete

#### Scenario: Elder screen introduces a second simultaneous accent color
- **WHEN** a design for an elder-facing screen would add a second non-semantic accent color alongside the existing dominant accent
- **THEN** the design is rejected or revised to use only one dominant accent color for that screen

### Requirement: Elder-track card elevation
Cards on elder-facing screens SHALL use a soft box-shadow for depth in place of the current flat color block with a 2px solid border, with the border reduced to a thinner weight or removed. The elevation change SHALL NOT reduce the text contrast ratios required by the accessibility floor. The shadow SHALL stay subtle (a soft, low-opacity lift) rather than a pronounced/glowing effect — a stronger version (deeper shadow, colored button glow, decorative header circles, heavier font weight, all applied together) was tried and explicitly rejected by the user as making the screen feel heavier/more rigid, not softer; it was reverted.

#### Scenario: Elder-screen card is restyled
- **WHEN** an elder-facing screen's information card is updated for this change
- **THEN** it renders with a soft shadow and thinner (or no) border instead of the previous flat block plus 2px border, while all text inside it still meets the accessibility floor's contrast requirement

### Requirement: Elder-track icon badge treatment
Icon badges on elder-facing screens SHALL remain geometric line-icon SVGs (no illustration or mascot-style artwork). Their color, proportion, and shadow treatment MAY be refined for visual quality, and they SHALL continue to be paired with a text status label rather than standing alone as the sole carrier of meaning.

#### Scenario: Icon badge is refined
- **WHEN** an icon badge on an elder-facing screen is restyled for polish
- **THEN** it stays a geometric SVG icon (not an illustration/mascot) and remains adjacent to a text label communicating the same status

### Requirement: Caregiver-track relaxed visual constraints
On the 7 caregiver/admin-facing screens (今日總結, 通知詳情, 管理設定入口, 吃藥管理列表, 新增/編輯次數, 編輯回診, 個人資料設定), the visual system MAY use multiple simultaneous accent colors on one screen and a higher information density than the elder track, provided the shared token base is still used and the same WCAG AA contrast floor as the elder track (§ Elder-track accessibility floor) is maintained — both tracks now share one contrast floor, so this requirement's remaining distinction from the elder track is layout freedom (multi-accent, density), not a separate contrast standard.

#### Scenario: Caregiver screen uses multiple accent colors
- **WHEN** a caregiver/admin-facing screen is designed or restyled
- **THEN** it may combine more than one accent color from the shared token base on the same screen, as long as all text remains at least WCAG AA compliant

### Requirement: Caregiver-track layout pattern by screen role
Each caregiver/admin-facing screen SHALL use the layout pattern matching its role: entry/dashboard screens (管理設定入口, and the summary section of 今日總結) SHALL use an icon-tile grid; list/record screens (吃藥管理列表, 個人資料設定) SHALL use a single-column list with a colored icon chip per row; form screens (新增/編輯次數, 編輯回診) SHALL use a plain, non-gridded form layout. 通知詳情 (06-family-notification.html) has no discrete multi-row list in its current content (one incident-detail card plus two CTA buttons) — it is exempt from this requirement and keeps its existing single-card structure, styled with the shared token base like the rest of this track.

#### Scenario: Settings entry screen is restyled
- **WHEN** 管理設定入口 (09-family-settings.html) is updated for this change
- **THEN** its three entry options are presented as an icon-tile grid rather than a plain list

#### Scenario: Medication management list is restyled
- **WHEN** 吃藥管理列表 (10-manage-meds.html) is updated for this change
- **THEN** each medication row is presented as a single-column list item with a colored icon chip, not a grid tile

#### Scenario: Edit form screen is restyled
- **WHEN** 新增/編輯次數 (11-edit-med.html) or 編輯回診 (12-edit-appointment.html) is updated for this change
- **THEN** the form fields remain in a plain single-column layout without being reorganized into a grid or tile pattern
