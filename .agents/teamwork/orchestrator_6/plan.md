# Plan — Continuous 4-Phase Cinematic Arc for "THE WORK"

## Objective
Implement continuous 4-phase cinematic architecture (Approach C) for "THE WORK" section of Marcionilio Oliveira (`clientes/marcionilio-oliveira`), eliminating Lenis deadlock, harmonizing Jesper Landberg 3D ribbon with page horizontal scroll, resolving Chapter II redundancy, and passing Quality Gates 1-6 + Multi-Viewport Stress Gate.

## Step-by-Step Plan

### Phase 0: Survey & Assessment
1. Dispatch 3 parallel Explorers:
   - **Explorer 1 (`explorer_phase0_1`)**: Focus on `initHorizontalScroll.LNLCK81L.js` (GSAP ScrollTrigger, Lenis prevent deadlock, 4-phase timeline, desktop & mobile).
   - **Explorer 2 (`explorer_phase0_2`)**: Focus on `src/components/WorkStage/WorkStage.tsx` & `scripts/serve-marcionilio-site.cjs` (elastic boundary, scrollVelocity handshake, preview server root path fix, bundle compilation pipeline).
   - **Explorer 3 (`explorer_phase0_3`)**: Focus on HTML structure (`clientes/marcionilio-oliveira/site/index.html`), Chapter II redundancy, Chapter III transition, and existing/new E2E tests (`tests/e2e/work-stage.spec.ts`, `tests/e2e/challenger-viewport.spec.ts`, and new Gate 6 end-to-end continuous scroll spec).
2. Collect reports and synthesize architecture in `PROJECT.md`.

### Phase 1: Milestone Decomposition & Execution
- **Milestone 1 (Preview Server & Bundling Environment - WP-4)**:
  - Fix `scripts/serve-marcionilio-site.cjs` to serve `index.html` at `/`.
  - Validate bundle compilation `npm run build:workstage`.
- **Milestone 2 (4-Phase GSAP Timeline & WorkStage Handshake - WP-1 & WP-2)**:
  - Refactor `initHorizontalScroll.LNLCK81L.js` to implement 4-phase cinematic arc:
    - Phase 1: Optical entry (0 -> 1).
    - Phase 2: 3D Ribbon interactive browse with fixed horizontal track.
    - Phase 3: Smooth cinematic exit (1 -> 0 fade/slide).
    - Phase 4: Seamless resumption of horizontal scroll to subsequent chapters.
  - Eliminate `data-lenis-prevent="true"` deadlock.
  - Implement elastic boundary transition in `WorkStage.tsx`.
  - Verify shader preservation and 4 canonical projects.
- **Milestone 3 (Narrative Continuity & Redundancy Resolution - WP-3)**:
  - Harmonize post-WorkStage flow with Chapter III (Services) in `index.html` and horizontal track offsets.
  - Ensure zero collision or duplicate static listing.
- **Milestone 4 (Verification & Quality Gates 1 to 6)**:
  - Gate 1: Vitest CPU Math Twin (7/7).
  - Gate 2: Optical symmetry & portal expansion E2E.
  - Gate 3: 3D Ribbon, wheel velocity & hover E2E.
  - Gate 4: Card-to-Sheet flight & Astro theme E2E.
  - Gate 5: Detail close & state restoration E2E.
  - Gate 6: Continuous end-to-end scroll test (top -> portal -> ribbon -> Chapter III -> Chapter IV -> footer without deadlock).
  - Multi-Viewport Stress Gate: Challenger viewport across 4 desktop resolutions.
  - Full Reviewer, Challenger, and Auditor integrity sign-off.
