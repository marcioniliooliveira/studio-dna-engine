# Synthesis: Architecture & Implementation Blueprint for THE WORK Enhancement

## 1. Consensus Findings Across Explorers
1. **WP-1: Infinite Ribbon Wrap & DOM Proxies** (Explorer 1):
   - Formula: $X_{\text{wrapped}} = ((X_{\text{raw}} + 64.0) \pmod{128.0} + 128.0) \pmod{128.0} - 64.0$ with $L = 4 \times 32.0 = 128.0$.
   - Optical discontinuity invariance proven: at $|X| = 64.0$, innermost vertex is at $|X_{\text{inner}}| = 49.6 > 49.08$ world units, completely outside camera frustum across all desktop viewports up to 2560px width.
   - Closed-form perspective camera projection computes 2D viewport coordinates for DOM proxies with $\le 0.5\text{px}$ error.
   - Updating DOM proxies imperatively via refs in `updateLoop` prevents 60fps React re-renders.

2. **WP-2 & WP-3: Cinematic HUD & Inverted Optical Exit** (Explorer 2):
   - In `initHorizontalScroll.LNLCK81L.js`, `mwExit` currently holds `scale: W` statically. Changing to `fromTo(i, { scale: W }, { scale: 0, duration: M_out, ease: "none" })` and translating texts `u: Y -> C` and `a: j -> H` mirrors entrance with mathematical precision.
   - In `syncViewportClip`, removing `isExitPhase` allows `rectEl.getBoundingClientRect()` to compute exact shrinking polygon on exit.
   - In `WorkStage.tsx`, `cumulativeScrollRef.current += Math.abs(rawDelta)` tracks displacement. At $\ge 1200\text{px}$ ($\approx 1.5$ scrolls), pill button `"EU JÁ ESTOU CONVENCIDO"` appears smoothly (`y: 20 -> 0`, `opacity: 0 -> 1`).
   - Clicking button jumps instantly to timeline position `t3` (visually identical to `mwHold`, zero flicker) and scrubs smoothly to `t4 + servicesOffset` via Lenis/GSAP.

3. **WP-4 & WP-5: Staggered Card-to-Sheet Choreography & Gate Baseline** (Explorer 3):
   - Replace `setTimeout(900ms)` with GSAP staggered entrance timeline:
     - Mesh uncurving & wash: $t = 0\text{s}$, $0.85\text{s}$, `expo.out`.
     - Title: $t = 0.25\text{s}$, `y: 40 -> 0`, `opacity: 0 -> 1`, `expo.out`.
     - Description: $t = 0.35\text{s}$, `y: 30 -> 0`, `opacity: 0 -> 1`, `expo.out`.
     - Tags / pills & close button: $t = 0.50\text{s}$, `y: 20 -> 0`, `opacity: 0 -> 1`, `expo.out`.
     - Settle at $t = 0.85\text{s}$ to `DETAIL_ACTIVE` with Astro header light theme.
   - Build: `npm run build:workstage` generates `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.
   - Gate 1 (`math.spec.ts` 8/8 tests) and Challenger Viewport suite (6/6 tests) currently pass 100%. Gate 6 timeout was caused by lack of infinite scroll and exit portal implementation.

## 2. File Ownership & Boundary Matrix for Worker
| File | Changes Required |
|---|---|
| `src/components/WorkStage/math.ts` | Add `wrapRibbonPosition`, `computeCardProxyRect`, `RIBBON_PERIOD = 128.0`, `RIBBON_HALF_PERIOD = 64.0`. Ensure existing 8/8 tests pass without regression. |
| `src/components/WorkStage/RibbonCard.tsx` | Apply `wrapRibbonPosition` to card $X$ coordinate. Target current wrapped position on detail close return animation. |
| `src/components/WorkStage/WorkStage.tsx` | Remove boundary clamps and elastic rubber-banding from `applyDelta` and `updateLoop`. Track `cumulativeScroll`. Render bottom-left microcopy and bottom-right departure button. Synchronize DOM proxies imperatively via refs in `updateLoop`. Replace `setTimeout(900ms)` with GSAP staggered timeline ($Kp$). |
| `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js` | Update `mwExit` to animate `scale: W -> 0` and texts `Y -> C`, `j -> H`. Update `syncViewportClip` to mirror polygon clip on exit. Update mobile timeline exit. |
| `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` | Recompiled production bundle via `npm run build:workstage`. |
