## Context

See `proposal.md` - Why. The current system is a single undifferentiated visual treatment (`prototype/styles.css`, ~1177 lines) driven by CSS custom properties defined once in `:root` and consumed identically by all 13 static HTML screens. `design guide.md` documents the color/contrast rules but does not currently distinguish which rules are evidence-backed (from `poc.md`'s gerontology research) versus which are stylistic defaults that happen to also serve the elder audience. `--shadow-card`, `--shadow-button`, etc. are already declared as CSS variables but set to `none` — the elevation change in this design flips their values rather than introducing new variables.

## Goals / Non-Goals

**Goals:**
- Give `design guide.md` an explicit two-track structure so future edits know which rules are non-negotiable (elder floor) versus adjustable (caregiver track, elder execution polish).
- Keep both tracks visually part of "one app" via a shared token base, not two disconnected style sheets.
- Make the caregiver/admin track's layout choice (grid vs. list vs. form) a direct, mechanical function of screen role, not a per-screen judgment call.

**Non-Goals:**
- Not changing any color hex value, semantic color role, or the underlying `poc.md` accessibility research.
- Not touching `PRODUCT.md`'s information architecture, screen count, or navigation flow.
- Not building a component library or design tool — this stays static HTML/CSS per `PRODUCT.md`'s Stack section.
- Not adding illustration/mascot artwork (ruled out during exploration; geometric icons stay geometric).

## Decisions

**One stylesheet, track-scoped selectors, not two stylesheets.** `prototype/styles.css` stays a single file. Elder-only and caregiver-only rules are scoped with a track class on `<body>` (e.g. `body.track-elder`, `body.track-caregiver`) set per-screen in each HTML file's existing `<body class="page-backdrop">` tag. Alternative considered: separate `elder.css` / `caregiver.css` imports — rejected because the shared token base (`:root` variables) would need to live somewhere both import anyway, adding a file-boundary with no real decoupling benefit, and risking drift between two files that both style `.card`.

**Shadow tokens get real values instead of new properties.** `--shadow-card` etc. already exist and are wired through `.card`, `.btn`, etc.; they're just `none` today. Elder-track elevation is implemented by giving `--shadow-card` a soft value (e.g. `0 8px 24px rgba(15,76,66,0.10)`) under the `body.track-elder` scope, and thinning `.card`'s border-width under the same scope. Alternative considered: a new `--shadow-card-elder` variable — rejected as unnecessary indirection since the existing variable is unused (`none`) everywhere today and no screen needs the flat variant preserved.

**Caregiver layout patterns are three new CSS component classes, not per-screen bespoke markup.** `.tile-grid` / `.tile-grid__item` (icon-tile grid), `.chip-list` / `.chip-list__row` (colored icon chip list) are added to `styles.css` as reusable components, matching the existing BEM-ish naming already used for `.card__*`, `.bottom-nav__*`. Form screens (11, 12) get no new component — they keep the existing form classes and only receive the caregiver track's relaxed color/contrast scoping. This keeps the mapping in the proposal/spec mechanical: screen role → component class, not a fresh layout invented per screen.

**Track assignment is a static, hardcoded list, not a computed rule.** The 6 elder screens and 7 caregiver screens are enumerated explicitly in the spec and in `design guide.md`'s revision (not derived from a "does this screen have X" heuristic), because `PRODUCT.md`'s IA already fixes which screens are 長輩端 vs 家屬端／管理設定 — reusing that existing split avoids inventing a second classification system.

## Risks / Trade-offs

- [Shadow changes could accidentally soften text-adjacent contrast if a card's background shifts] → Mitigation: shadow is applied to the card's outer box only; the card's fill color and text color are unchanged, so the 7:1 contrast requirement is unaffected by construction, not just by testing.
- [Track-scoping via a `<body>` class is easy to forget on a new/edited screen] → Mitigation: `design guide.md`'s revision will list the exact screen → track mapping (mirrors the spec's scenarios) so it's a lookup, not a judgment call, when a screen is touched.
- [Caregiver track's relaxed contrast could regress toward the "混亂" (chaotic) feeling this change is meant to fix if multi-color use isn't bounded] → Mitigation: the spec still requires WCAG AA (not "anything goes") and ties layout to screen role via fixed component classes, so color variety happens within a consistent structural pattern rather than ad hoc.
- [Two tracks sharing one stylesheet could bit-rot if elder-only overrides leak into caregiver screens or vice versa] → Mitigation: all track-specific rules are scoped strictly under `body.track-elder` / `body.track-caregiver` selectors; shared rules (unscoped) are limited to the token base and structural rules that don't touch contrast, color count, or layout density.
