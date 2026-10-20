# BRIEFING — 2026-10-20T15:55:00Z

## Mission
Implement infinite ribbon wrap ($L=128.0$), cinematic HUD with cumulative displacement departure, inverted optical exit timeline (`scale: W -> 0`), and staggered card-to-sheet choreography ($Kp$) for Marcionilio Oliveira's "THE WORK" WebGL stage, maintaining 100% green pass on all automated verification gates (Gates 1-6 & Challenger Viewport suite).

## 🔒 My Identity
- Archetype: Lead Full-Stack WebGL & Motion Engineer
- Roles: implementer, qa, specialist
- Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m5_1
- Original parent: 3776eb80-d5f5-48b2-9fb9-3223b1c4dbf5
- Milestone: M5 Implementation & Gate Verification

## 🔒 Key Constraints
- Exclusive write ownership:
  - src/components/WorkStage/math.ts
  - src/components/WorkStage/WorkStage.tsx
  - src/components/WorkStage/RibbonCard.tsx
  - clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js
  - clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js
- Integrity mandate: No cheating, no hardcoding test results, no dummy facade implementations.
- Preserve canonical GLSL shader mathematics and tokens in referenceData.ts.
- Build production bundle with `npm run build:workstage` before testing.
- Must verify all gates: Vitest math.spec.ts (8/8 pass), Playwright work-stage.spec.ts (Gates 2 to 6 pass), and challenger-viewport.spec.ts (all desktop resolutions pass).

## Current Parent
- Conversation ID: 3776eb80-d5f5-48b2-9fb9-3223b1c4dbf5
- Updated: not yet

## Task Summary
- **What to build**:
  - WP-1: Infinite ribbon wrap in `math.ts`, `RibbonCard.tsx`, and `WorkStage.tsx` with analytical DOM proxy perspective projection.
  - WP-2: Cinematic HUD with cumulative scroll accumulator ($\ge 1200\text{px}$) and departure pill button advancing to Chapter III.
  - WP-3: Inverted optical exit timeline (`scale: W -> 0`, texts `Y -> C`, `j -> H`) and symmetric clip polygon in `initHorizontalScroll.LNLCK81L.js`.
  - WP-4: Staggered card-to-sheet choreography ($Kp$) with GSAP timeline replacing `setTimeout(900ms)`.
  - WP-5: Production bundle build and automated verification of all 7 test gates.
- **Success criteria**: All automated tests pass (Vitest 8/8, Playwright Gates 2-6, Challenger 6/6), bundle built and synced, 5-component handoff report delivered.
- **Interface contracts**: `PROJECT_STATUS.md`, `referenceData.ts`, `math.ts`.

## Key Decisions Made
- Use modular wrapping $X_{\text{wrapped}} = ((X_{\text{raw}} + 64.0) \pmod{128.0} + 128.0) \pmod{128.0} - 64.0$ with $L = 128.0$.
- Imperatively synchronize DOM proxy coordinates via direct element style modification in `updateLoop` to maintain 60fps without triggering React re-renders.
- Mirror GSAP entrance timeline symmetrically in `mwExit` with `scale: W -> 0` and uncurled clip-path.
- Use GSAP timeline for detail modal entrance at $t=0.25\text{s}, 0.35\text{s}, 0.50\text{s}$ settling to `DETAIL_ACTIVE` at $t=0.85\text{s}$.

## Artifact Index
- `src/components/WorkStage/math.ts` — math functions for wrap and proxy projection
- `src/components/WorkStage/RibbonCard.tsx` — wrapped card mesh positioning and smooth detail return
- `src/components/WorkStage/WorkStage.tsx` — unbounded scrolling, HUD elements, proxy synchronization, staggered detail
- `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js` — inverted optical exit timeline
- `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` — compiled production bundle

## Change Tracker
- **Files modified**: none yet
- **Build status**: pending
- **Pending issues**: none

## Quality Status
- **Build/test result**: Gate 1 Vitest passed (8/8), Challenger passed (6/6), Gate 6 pending implementation
- **Lint status**: clean
- **Tests added/modified**: pending implementation

## Loaded Skills
- **awwwards-motion-engine**: mathematical motion physics, easing, GSAP timelines, inertial scroll.
- **clean-code**: concise, direct, minimal change principle.
- **testing-patterns**: Playwright E2E and Vitest unit testing.
- **verify-changes**: proving code works through live execution and test runs.
