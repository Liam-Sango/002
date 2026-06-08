# NERV Mode Key Gate — Design Spec

**Date:** 2026-06-08
**Status:** Approved

## Summary

Hide the Evangelion/NERV "flavor" layers of the portfolio by default so the
site presents as a clean, professional portfolio. Reveal the full NERV
experience — the boot sequence and the entire HUD overlay — only when the
visitor types a secret key sequence (`nerv`). Typing the sequence again hides
it. The enabled state lasts for the current browser session only.

## Motivation

The portfolio is shared in professional contexts (recruiters, applications).
The NERV HUD, MAGI side panels, and live stock ticker are distinctive but can
read as distracting in those contexts. Gating them behind a key sequence keeps
the default presentation professional while preserving the themed experience as
an opt-in easter egg.

## Behavior

- **Default (fresh load / new tab):** clean professional portfolio. No boot
  animation, no HUD overlay, no MAGI side panels, no stock ticker.
- **Enable:** typing `n`, `e`, `r`, `v` in order (no modifier keys) anywhere on
  the page enables NERV mode. The boot sequence plays, then the full HUD overlay
  appears.
- **Disable:** typing `nerv` again toggles NERV mode off. The HUD disappears and
  the view returns to the clean portfolio.
- **Persistence:** sessionStorage. The enabled state survives reloads within the
  same tab. A new tab or a closed/reopened browser resets to the clean default.
- **Boot on enable:** the boot sequence plays each time NERV mode is enabled
  (including on a same-tab reload while enabled), because the boot component
  mounts fresh on enable.
- **Typing safety:** the key-sequence listener ignores keystrokes while focus is
  in an `input`, `textarea`, or `contenteditable` element (e.g. the blog search
  box), and ignores keypresses with modifier keys (Ctrl/Alt/Meta) held.
- **Reduced motion:** unchanged from current behavior — when NERV mode is
  enabled under `prefers-reduced-motion: reduce`, the boot animation is skipped
  and the HUD is shown directly.

## Architecture

One small client component owns the feature; the key-detection logic is a
reusable hook. Boundaries stay single-purpose: the hook detects the sequence,
`NervLayer` handles gating + persistence, and `Hud`/`BootSequence` stay focused
on rendering their visuals.

### New: `src/lib/useKeySequence.ts`

A reusable hook.

- Signature: `useKeySequence(target: string, onMatch: () => void): void`
- Maintains a small rolling buffer of recent keypresses (length capped at
  `target.length`).
- Fires `onMatch` when the buffer ends with `target` (case-insensitive).
- Ignores `keydown` events when:
  - the event target is an `input`, `textarea`, or `contenteditable` element, or
  - a modifier key (Ctrl / Alt / Meta) is held.
- Adds the `keydown` listener on mount and removes it on unmount.
- Uses a ref for the buffer so listener identity is stable and re-renders are
  not triggered by buffering.

### New: `src/components/NervLayer.tsx` (client component)

Owns gating + persistence.

- State: `enabled: boolean`, default `false`.
- On mount (`useEffect`): reads sessionStorage key `nerv-mode`; if the value is
  `"1"`, sets `enabled = true`. First render is always `false`, so there is no
  hydration mismatch; same-tab reloads re-enable after mount.
- Calls `useKeySequence("nerv", toggle)`.
- `toggle`: flips `enabled`; writes `"1"` to sessionStorage `nerv-mode` when on,
  removes the key when off. sessionStorage access is wrapped in try/catch
  (consistent with existing `BootSequence` handling).
- Renders: `enabled && (<><BootSequence /><Hud /></>)`. Mount/unmount of
  `BootSequence` on enable/disable drives the boot replay naturally.

### Changed: `src/app/layout.tsx`

- Remove the direct `<Hud />` and `<BootSequence />` mounts.
- Mount `<NervLayer />` in their place (placement equivalent to the current
  mounts so overlay stacking is preserved).

### Changed: `src/components/BootSequence.tsx`

- Remove the `nerv-booted` session guard (the `SESSION_KEY` constant and the
  `alreadyBooted` check / `sessionStorage.setItem` in `finish`): boot now plays
  whenever the component mounts, which only happens on enable.
- Keep the reduced-motion skip (renders nothing / hidden under
  `prefers-reduced-motion`).
- Keep click-to-skip behavior.
- No other changes to the animation, timing, or markup.

`Hud`, `SidePanels`, and `StockTicker` are unchanged.

## Data Flow

1. `layout.tsx` (server component) renders `<NervLayer />`.
2. `NervLayer` mounts with `enabled = false`; effect reads sessionStorage and
   may set `enabled = true`.
3. `useKeySequence` listens for `keydown`; on matching `nerv`, calls `toggle`.
4. `toggle` updates `enabled` and sessionStorage.
5. When `enabled` is `true`, `BootSequence` and `Hud` render; the boot plays then
   the HUD overlay is visible. When `false`, neither renders.

## Edge Cases

- **Blog search / form fields:** listener skips events from editable targets, so
  typing "nerv" in a search box does not toggle.
- **Same-tab reload while enabled:** sessionStorage persists `nerv-mode=1`;
  effect re-enables; boot replays. Acceptable and on-brand.
- **sessionStorage unavailable:** try/catch around reads/writes; feature still
  works in-memory for the page view, just not persisted.
- **Hydration:** first client render matches server (nothing rendered for the
  layer); enabling happens only after mount via effect/keystroke.

## Testing

No test runner is currently wired up; verification is proportionate.

Manual verification checklist:

- Fresh load → clean portfolio, no HUD/boot.
- Type `nerv` → boot plays, then HUD appears.
- Type `nerv` again → HUD disappears.
- Reload while enabled → boot replays, HUD returns.
- New tab → clean default.
- Focus the blog search box and type "nerv..." → does **not** toggle.
- `prefers-reduced-motion` enabled → toggling shows HUD without the boot
  animation.
- `npm run build` succeeds (static export stays clean).

A unit test for `useKeySequence` is intentionally out of scope (no test harness;
YAGNI).

## Out of Scope

- React Context / global store (only one consumer today).
- Persisting NERV mode across sessions (localStorage).
- Any change to the NERV visuals themselves (fonts, colors, glass aesthetic) or
  to `Hud` / `SidePanels` / `StockTicker` rendering.
- Configurable / user-customizable key sequence.
