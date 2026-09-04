## Why

The prototype's 13 screens are inconsistent, flat, and lack clear visual hierarchy — the color system defined in `design guide.md` isn't being executed with enough polish, and the app doesn't yet match the refined, confident feel needed for the pitch demo. A round of exploration (informed by reference UI images) surfaced a workable path: the app currently treats all 13 screens as one undifferentiated visual system, but it actually serves two distinct users with very different visual needs — 陳奶奶 (72, degraded contrast sensitivity, lens yellowing, glare sensitivity) on 6 elder-facing screens, and 陳阿明 (45, no visual impairment) on 7 caregiver/admin screens. Splitting the visual treatment by audience lets the caregiver screens become significantly more polished and visually rich (closer to the reference aesthetic) while keeping the elder screens' evidence-backed accessibility floor (documented in `poc.md`) fully intact.

## What Changes

- Split the layout/execution treatment into two tracks sharing one token base (color roles, radii, spacing scale): an **elder track** (6 screens: 01, 02, 03, 04, 07, 08-voice-settings) and a **caregiver/admin track** (7 screens: 05, 06, 09, 10, 11, 12, 13).
- Elder track: keep the non-color-value rules as hard floor — single dominant accent color per screen (no multi-color card grids), single-column large-text layout with unshrunk touch targets, triple-encoding for status (color + text + icon). Within that floor, raise execution quality: cards move from flat color block + 2px border to soft-shadow elevation with a thinner border; icon badges stay geometric SVG (no illustration/mascot style).
- **Revised mid-implementation (user feedback):** the original plan kept WCAG AAA (7:1) text contrast and the warm-oatmeal background as an uncompromising elder-track floor, changing only shadows/spacing/badges. After seeing the result, the user judged it "almost unchanged" and asked for the actual color palette to be softened — lower saturation, higher lightness, background close to white — across **all 13 screens** (not just the caregiver track), explicitly accepting a lower contrast floor to get there. The floor for both tracks is now **WCAG AA (4.5:1 normal text / 3:1 large text)**, and every core color hex value in `design guide.md` was changed (see `design guide.md` §0 for the full record of this tradeoff against the original `poc.md`-cited rationale). A first attempt at "more visible change" instead piled on deeper shadows, a colored button glow, and decorative header circles without touching color — the user rejected that direction outright ("更糟糕", more heavy/rigid) and it was reverted; the actual fix was the palette, not more elevation effects.
- Caregiver/admin track: also on the same softened AA-floor palette; still allowed multiple simultaneous accent colors per screen and denser information layout where appropriate.
- Caregiver/admin track gets two layout patterns applied by screen role: entry/dashboard screens (05 family overview top section, 09 settings entry) use an icon-tile grid; list/record screens (10 medication management list, 13 profile) use a list with colored icon chips; form screens (11 edit medication, 12 edit appointment) keep a clean, non-gridded form layout. (06 notification detail turned out to have no discrete list to convert — left structurally as-is, still gets the shared softened palette.)
- Update `design guide.md` to document the two-track layout system, the softened palette and its AA contrast re-verification, the elder-track elevation/badge polish, and the caregiver-track layout-pattern-by-screen-role mapping.
- Explicitly excluded: no changes to information architecture, screen count, or screen flow (PRODUCT.md's 13-screen IA stays as-is); no introduction of illustration/mascot-style artwork; no changes to `briefing.html` or `poc.md`; no per-track difference in contrast floor or background color (that distinction was dropped when the floor became AA for both tracks).

## Capabilities

### New Capabilities
- `visual-design-system`: the app's visual system must define an evidence-backed accessibility floor that applies to all 6 elder-facing screens, and a separate, more permissive visual treatment for the 7 caregiver/admin-facing screens, sharing one underlying token base (color roles, spacing scale, corner-radius scale).

### Modified Capabilities
(none — `openspec/specs` has no existing capability covering visual/design system rules; this is the first)

## Impact

- `design guide.md`: revised to document the two-track system (elder floor vs. caregiver-track freedoms), new card elevation spec, icon badge refinement spec, caregiver layout-pattern-by-screen mapping.
- `prototype/styles.css`: new/updated CSS for card elevation (shadow + thinner border), refined icon badge treatment, caregiver-track components (icon-tile grid, colored icon chip list).
- `prototype/01-today.html`, `02-confirmed.html`, `03-medlist.html`, `04-emergency.html`, `07-appointment.html`, `08-voice-settings.html`: elder-track visual polish pass (no structural/IA changes).
- `prototype/05-family-overview.html`, `09-family-settings.html`: restructured to use icon-tile grid pattern for entry sections.
- `prototype/06-family-notification.html`, `10-manage-meds.html`, `13-profile.html`: restructured to use colored icon-chip list pattern.
- `prototype/11-edit-med.html`, `12-edit-appointment.html`: visual polish within existing form layout (no structural change).
- No changes to `PRODUCT.md`, `poc.md`, `briefing.html`, or any JS behavior files.
