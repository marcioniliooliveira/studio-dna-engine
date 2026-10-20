# BRIEFING — 2026-10-20T15:36:10Z

## Mission
Investigate GSAP motion choreography and UI interaction for "THE WORK" section: formulate the symmetric inverted optical exit timeline (`scale: W -> 0`, texts rejoining, `syncViewportClip`, advance to Chapter III) and the Cinematic HUD (scroll accumulator, microcopy "CAPÍTULO II — FIQUE O TEMPO QUE QUISER", pill button "EU JÁ ESTOU CONVENCIDO" with direct optical close trigger).

## 🔒 My Identity
- Archetype: explorer
- Roles: GSAP Motion Choreographer & UI Interaction Specialist
- Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m5_2
- Original parent: 3776eb80-d5f5-48b2-9fb9-3223b1c4dbf5
- Milestone: M5 (Infinite Ribbon, Cinematic HUD & Inverted Optical Exit)

## 🔒 Key Constraints
- Read-only investigation — do NOT modify project source code directly
- Only write reports and metadata inside `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m5_2`
- Truth protocol: label material conclusions as observed, inferred, documented, or unverified
- Complete evidence chains: cite exact file paths and line numbers
- Follow 5-component handoff report (Observation, Logic Chain, Caveats, Conclusion, Verification Method)

## Current Parent
- Conversation ID: 3776eb80-d5f5-48b2-9fb9-3223b1c4dbf5
- Updated: 2026-10-20T15:24:46Z

## Investigation State
- **Explored paths**:
  - `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`
  - `src/components/WorkStage/WorkStage.tsx`
  - `clientes/marcionilio-oliveira/site/index.html`
  - `tests/e2e/work-stage.spec.ts`
  - `tests/e2e/challenger-viewport.spec.ts`
  - `src/components/WorkStage/__tests__/math.spec.ts`
- **Key findings**:
  - `initHorizontalScroll.LNLCK81L.js`: `mwExit` currently maintains `scale: W` as a dummy `to(i, { scale: W })` tween, and `syncViewportClip` falls back to `clipPath: none` + fading `opacity` during `isExitPhase` (`cur > tHoldEnd`).
  - Symmetrizing `mwExit`: animate `i` from `scale: W -> 0`, `u` from `Y -> C`, `a` from `j -> H` over `M_out`. Remove `!isExitPhase` guard in `syncViewportClip` so `rectEl.getBoundingClientRect()` drives the shrinking polygon during exit.
  - Cinematic HUD: Add `cumulativeScrollRef` accumulator in `WorkStage.tsx` summing `Math.abs(rawDelta)`. At $\ge 1200\text{px}$, reveal pill button `"EU JÁ ESTOU CONVENCIDO"`.
  - Seamless navigation: Clicking the pill button jumps scroll instantly to `t3` (zero visual jump since `t3` visual state is identical to `mwHold`) and triggers a smooth scroll to `t4 + servicesOffset` via Lenis/GSAP.
- **Unexplored areas**: None within m5_2 scope. All requirements fully traced and formulated.

## Key Decisions Made
- Use exact mathematical inverse coordinates (`scale: W -> 0`, `Y -> C`, `j -> H`) for Desktop and (`scale: h -> 0`, `y: -k -> 0`, `y: k -> 0`) for Mobile.
- Wire button click via `window.__TRIGGER_PORTAL_EXIT__` and `window.dispatchEvent(new CustomEvent('work-portal-exit-request'))` for decoupled cross-script communication.
- Provide full 5-component handoff report with exact patch / drop-in code snippets for implementer.

## Artifact Index
- `DISPATCH.md` — Agent incoming instructions
- `BRIEFING.md` — Persistent working memory
- `progress.md` — Liveness heartbeat and status
- `handoff.md` — Comprehensive 5-component handoff report
