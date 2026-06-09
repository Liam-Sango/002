# NERV as an Activatable Mode (Clean Slate Default) — Design Spec

**Date:** 2026-06-09
**Status:** Approved

## Summary

Invert the site's theme system. Today the entire Evangelion/NERV cyberpunk
look is baked into the base CSS layer, and the `nerv` key gate only toggles the
boot sequence + HUD *overlays* on top of that always-cyberpunk skin. After this
change, the **default** presentation is a clean, professional dark theme
("Slate"); the **full NERV treatment** — green palette, angular shapes,
scanlines, CRT flicker, glows, hazard stripes, kanji, decorative hero
flourishes, plus the boot sequence and HUD overlays — becomes an opt-in mode
gated behind a root-level `.nerv` class.

No UI structure or layout changes. Every component's markup and class names stay
the same; the same class names simply resolve to different styles depending on
whether the `.nerv` class is present on the root element. The only markup
addition in the entire feature is one small, subtle toggle control in the
footer.

NERV mode, when enabled, is **pixel-identical to the current `main` site.**

## Motivation

The portfolio is shared in professional contexts (recruiters, applications).
The previous key gate (`2026-06-08-nerv-mode-keygate`) hid the boot + HUD
overlays by default, but the underlying skin — neon green, scanlines, CRT
flicker, uppercase angular type, notched/cut corners, kanji watermark — was
still always on. That still reads as a themed "vibecoded" site rather than a
clean professional portfolio.

This change makes the professional minimalist look the genuine default, while
preserving the complete NERV experience as a discoverable easter egg for anyone
who wants it.

## Theme Direction (decided during brainstorming)

**Clean default = "Slate Professional":**

- **Palette:** GitHub-dark neutrals — background `#0d1117`, panel `#161b22`,
  hairline borders `~#21262d`/`#1f2630`, text `#e6edf3`, muted text desaturated
  slate.
- **Accent:** calm blue `#3b82f6`, reserved for links, buttons, and hover states
  (not splashed across the whole UI).
- **Shape:** gentle ~8px rounded corners, hairline borders only, **outlined**
  chips/badges. No clip-path notches, no corner brackets, no hazard stripes.
- **Type:** Inter for body and headings, normal case (no forced uppercase),
  tighter heading letter-spacing. JetBrains Mono may remain for small
  metadata/labels where appropriate, but without the heavy uppercase tracking.
- **Effects:** none of the NERV effects — no scanlines, no CRT flicker, no body
  grid backdrop, no neon glows, no kanji watermark, no blinking caret, no
  synchro-ratio gauges.
- **Finishing treatment:** "Quiet border" — restrained, senior-engineer feel;
  blue accent appears only on links/buttons/hover.

**NERV mode = the current cyberpunk identity, unchanged.** Green readout palette,
Chakra Petch / Saira, uppercase, notched clip-paths, corner brackets, scanlines,
CRT flicker, body grid, glows, hazard stripes, kanji, decorative hero
flourishes, boot sequence, and full HUD overlay (telemetry, side labels, MAGI
side panels, stock ticker).

## Activation & Persistence (decided during brainstorming)

- **Keyword (kept):** typing `nerv` (case-insensitive, no modifier keys, not
  while focused in an editable field) toggles NERV mode on/off, via the existing
  `useKeySequence` hook.
- **Subtle visible toggle (new):** a small, low-key glyph/button in the site
  **footer** also toggles NERV mode. Discoverable by the curious, unobtrusive to
  a quick recruiter scan. This is the only markup addition.
- **Shared state:** both the keyword and the footer glyph flip the **same**
  underlying state.
- **Persistence:** `sessionStorage` (per-session), key `nerv-mode`. Survives
  same-tab reloads; a new tab or fresh browser resets to the clean Slate default.
  Every first-time/fresh visitor always lands on the clean theme.

## Architecture

Approach: **`.nerv` root class + CSS variable swap** (chosen over separate
stylesheets and over per-component conditional class names, both of which add
FOUC/markup-churn risk and were rejected).

The clean Slate theme lives in the base CSS layer (`:root` variables + base
element/class rules). All NERV styling is moved under a `.nerv` scope on the
root element, where it overrides the variables and re-enables the heavy effects.
Components are unaware of the theme; their class names resolve to different
styles based solely on the presence of `.nerv`.

State ownership is lifted out of `NervLayer` into a small shared hook so the
keyword listener and the footer glyph share one source of truth.

### Changed: `src/app/globals.css` (major, mechanical restructure)

Reorganize into two clearly delimited sections:

1. **Base layer — clean Slate (default):**
   - `:root` holds the Slate palette and shape tokens: e.g. `--bg:#0d1117`,
     `--bg-2`, `--panel:#161b22`, `--panel-2`, `--line` (hairline), `--accent`
     and accent-hover set to the blue family, `--text:#e6edf3`, muted/dim slate
     text, `--radius:8px`, `--radius-pill` for chips, and `--notch:0` (no
     clip-path notch).
   - Base rules for `body`, `.nav`, `.glass-card`, `.btn`/`.btn--primary`/
     `.btn--ghost`, `.badge`/`.tag`, `.project-card`, `.blog-post`, `.skill-*`,
     `.timeline-*`, `.contact-*`, `.article-*`, `.site-footer`, etc. render the
     quiet, professional look: rounded corners, hairline borders, outlined
     chips, blue only on links/buttons/hover, normal-case Inter headings.
   - **No** scanline overlay, CRT flicker, body grid backdrop, glow shadows,
     hazard stripes, kanji, hero gauges/caret/watermark in this base layer.
   - Clip-path-based shapes (`.glass-card`, `.btn` notches, `.brand-mark`
     polygon, hexagonal timeline nodes) are reduced to clean rounded equivalents
     in the base, and the angular versions move to the `.nerv` layer.

2. **NERV layer — `html.nerv` / `body.nerv` overrides:**
   - Variable overrides restoring the green readout palette (`--accent:#2bff88`,
     etc.) and `--notch:14px`, `--radius:0`.
   - All NERV-only effects re-scoped under `.nerv`:
     `html.nerv::after` (scanlines + CRT flicker), `body.nerv::before/::after`
     (grid + vignette), notched clip-paths, corner brackets, glows, hazard
     stripes, `.hero-kanji`, `.caret`, `.hero-gauge`, uppercase/letter-spacing
     treatments, Chakra Petch/Saira application, and the boot/HUD/side-panel
     styling (boot and HUD only render in NERV mode anyway).
   - The existing `prefers-reduced-motion` and responsive media queries are
     preserved (NERV effects already respect reduced motion).

   The net effect: with `.nerv` present, the cascade reproduces today's look
   exactly; without it, the clean Slate look applies.

### New: `src/lib/useNervMode.ts` (shared state hook)

Single source of truth for the on/off boolean.

- Owns `enabled: boolean`, default `false` (SSR-safe — first render always
  `false`, hydrate via effect; no hydration mismatch).
- On mount: reads `sessionStorage` key `nerv-mode`; if `"1"`, sets enabled and
  applies the `.nerv` class.
- Exposes the current value and a `toggle()` (and/or `setEnabled`).
- On every change: writes/removes `nerv-mode` in `sessionStorage` (wrapped in
  try/catch) and adds/removes the `nerv` class on `document.documentElement`.
- Supports multiple simultaneous consumers (keyword listener + footer glyph)
  that stay in sync. Implemented with a tiny module-level store + subscription
  (e.g. `useSyncExternalStore`) or React Context — whichever the implementation
  plan selects; requirement is simply that all consumers share one state and
  re-render together.

### Changed: `src/components/NervLayer.tsx`

- Drop the local `useState`/`sessionStorage` logic; consume `useNervMode()`
  instead.
- Keep `useKeySequence("nerv", toggle)`.
- Keep rendering `enabled && (<><BootSequence /><Hud /></>)`.
- No longer responsible for applying any class itself if the hook owns the
  `.nerv` class toggle (avoid double-ownership).

### Changed: `src/components/Footer.tsx`

- Add one subtle toggle control (a small button/glyph, e.g. a tiny hex or
  "NERV" marker) with an accessible `aria-label` (e.g. "Toggle NERV mode").
- It calls the shared `toggle()` from `useNervMode()`. (Footer becomes a client
  component, or the toggle is factored into a small client child so the rest of
  the footer can stay server-rendered — implementation plan decides.)
- Styled to be unobtrusive in the clean theme and on-brand in NERV mode.

### Changed: `src/app/layout.tsx`

- Continues to mount `<NervLayer />`, `<NavBar />`, `{children}`, `<Footer />`.
- **Fonts:** add Inter (via `next/font/google`) for the Slate body/headings, and
  keep Chakra Petch + Saira loaded for NERV mode. Wire the font CSS variables so
  the base layer uses Inter and the `.nerv` layer uses Chakra Petch/Saira.
- Otherwise unchanged.

### Unchanged

`BootSequence`, `Hud`, `SidePanels`, `StockTicker`, `useKeySequence`,
`useMarketFeed`, `marketViz`, all section components' markup, all `data/*`,
routing, and the static-export config.

## Data Flow

1. `layout.tsx` renders `<NervLayer />` and `<Footer />` (with the toggle glyph).
2. `useNervMode` initializes `enabled = false`; an effect reads `sessionStorage`
   and may set `enabled = true`, applying the `.nerv` class to the root element.
3. Toggling happens via either the `nerv` keyword (in `NervLayer`) or the footer
   glyph — both call the shared `toggle()`.
4. `toggle()` flips `enabled`, updates `sessionStorage`, and adds/removes the
   `.nerv` class on `document.documentElement`.
5. The CSS cascade renders Slate (no `.nerv`) or full NERV (`.nerv` present).
6. `BootSequence` + `Hud` mount only while `enabled` is true (boot replays on
   each enable, as today).

## Edge Cases

- **No-FOUC / hydration:** clean Slate is the SSR default and first paint; the
  `.nerv` class is applied only after mount via effect/keystroke, so server and
  client markup match. Fresh loads never flash green.
- **Decorative hero elements:** the kanji watermark, blinking caret, and the two
  `SYNCHRO RATIO` gauges are `aria-hidden` decoration in the existing markup.
  They are **hidden via CSS** in the base layer (not removed from markup), and
  reappear under `.nerv`. No markup change, honoring the "no structure changes"
  constraint.
- **Blog search / form fields:** keyword listener still ignores editable targets
  and modifier keys (unchanged `useKeySequence`).
- **Same-tab reload while enabled:** `sessionStorage` persists `nerv-mode=1`;
  effect re-enables and boot replays. On-brand, acceptable.
- **sessionStorage unavailable:** try/catch; feature works in-memory for the page
  view, just not persisted.
- **Reduced motion:** unchanged; NERV effects and the boot animation still
  respect `prefers-reduced-motion`.
- **Both controls in sync:** keyword and footer glyph share one state, so they
  always reflect and drive the same value.

## Testing

No test runner is wired up; verification is proportionate and manual, plus a
build check.

- `npm run build` (static export) succeeds.
- **Clean default:** fresh load shows the Slate theme — no green, no scanlines,
  no CRT flicker, no body grid, no glows, no kanji/caret/gauges, no boot, no HUD.
  Rounded corners, hairline borders, outlined chips, blue only on links/buttons/
  hover.
- **NERV via keyword:** typing `nerv` plays the boot sequence and applies the
  full NERV skin + HUD, **pixel-identical to current `main`.** Typing `nerv`
  again returns to clean Slate.
- **NERV via footer glyph:** clicking it toggles the same state; stays in sync
  with the keyword.
- **Persistence:** same-tab reload preserves the mode; a new tab resets to clean.
- **Editable fields:** typing "nerv" in the blog search box does not toggle.
- **Reduced motion:** toggling under `prefers-reduced-motion` shows NERV without
  the boot animation.
- **Responsive:** mobile/tablet breakpoints intact in both themes.

## Execution Plan (ultracode)

Work is delegated across parallel agents, with synthesis and an adversarial
verification pass:

- **Agent A:** extract/author the clean Slate **base** CSS layer (palette, shape
  tokens, base element/class rules; remove NERV effects from base).
- **Agent B:** build the **`.nerv` override** layer (variable overrides + all
  NERV-only effects re-scoped under `.nerv`), targeting pixel-parity with today.
- **Agent C:** the shared `useNervMode` hook + `NervLayer` refactor + `Footer`
  toggle glyph + `layout.tsx` font wiring.
- **Synthesis:** merge into `globals.css`/components, resolve cascade conflicts.
- **Agent D (adversarial verify):** `npm run build`; confirm clean default has
  zero NERV artifacts; confirm NERV mode matches current `main`; confirm both
  toggles sync; check reduced-motion and responsive paths.

## Out of Scope

- Any change to UI **structure or layout** (only visual styling + one footer
  toggle control are added).
- Cross-session persistence (localStorage) — per-session is intentional.
- Changes to NERV's own visuals (it must remain identical to current `main`).
- Changes to `Hud` / `SidePanels` / `StockTicker` / `BootSequence` rendering or
  to the live market feed.
- A nav-bar toggle or dual placement (footer glyph only).
- A configurable/user-customizable key sequence.
- Adding a test harness / unit tests (no runner today; YAGNI).
