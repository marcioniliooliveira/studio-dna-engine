# Implementation & Verification Plan — THE WORK Enhancement

## Objective
Implement infinite scroll on 3D ribbon ($L=128.0$), cinematic HUD with voluntary departure button, symmetric inverted optical exit timeline ($W \to 0$), and staggered fluid choreography in Card-to-Sheet, maintaining 100% automated gate compliance across all Vitest and Playwright test suites.

## Architectural Work Packages
- **WP-1: Infinite Ribbon Wrap & DOM Proxies**
  - Continuous modular translation: $X_{\text{wrapped}} = ((X_{\text{raw}} + 64.0) \pmod{128.0} + 128.0) \pmod{128.0} - 64.0$ with $L=128.0$.
  - Remove hard boundary limits on `targetOffset`.
  - DOM proxy synchronization for continuous hit-testing and hover mapping.
- **WP-2: Cinematic HUD & Cumulative Scroll Departure**
  - Kinetic scroll accumulator tracking cumulative displacement ($\approx 1200\text{px}$ threshold for 1.5 scrolls).
  - Editorial microcopy `"CAPÍTULO II — FIQUE O TEMPO QUE QUISER"` (#FAF9F6, muted opacity).
  - Pill button `"EU JÁ ESTOU CONVENCIDO" / "I'M ALREADY SOLD"` appearing smoothly (`y: 20 -> 0`, `opacity: 0 -> 1`).
  - Button click handler: triggers symmetric optical close and navigates to Chapter III (Services).
- **WP-3: Inverted Optical Exit Timeline**
  - In `initHorizontalScroll.LNLCK81L.js`: `scale: W -> 0`, "MORE" and "WORK" rejoin.
  - `syncViewportClip` reverse tracking during exit phase.
- **WP-4: Card-to-Sheet Staggered Fluid Choreography**
  - Replace monolithic `setTimeout(900ms)` with GSAP timeline:
    - Card flight: $t = 0\text{s}$, $0.85\text{s}$ duration, `expo.out`.
    - Project title: $t = 0.25\text{s}$.
    - Description & body: $t = 0.35\text{s}$.
    - Tags & close button: $t = 0.50\text{s}$.
- **WP-5: Build Compilation & Multi-Gate Automated Verification**
  - Build command: `npm run build:workstage` producing `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.
  - Gates:
    1. `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` (8/8 passing).
    2. `npx playwright test tests/e2e/work-stage.spec.ts`.
    3. `npx playwright test tests/e2e/challenger-viewport.spec.ts`.

## Execution Topology
1. **Phase 0: Technical Exploration (3 parallel Explorers)**
   - `teamwork_preview_explorer` (Explorer 1): Ribbon wrap math, physics, proxy mapping.
   - `teamwork_preview_explorer` (Explorer 2): HUD accumulator, DOM integration, optical exit timeline.
   - `teamwork_preview_explorer` (Explorer 3): Card-to-Sheet timeline, test assertions, build pipeline.
2. **Phase 1: Implementation (Worker)**
   - `teamwork_preview_worker`: Implements WP-1 to WP-4, compiles bundle via `npm run build:workstage`, verifies tests locally.
3. **Phase 2: Independent Gate Verification**
   - 2 Reviewers (`teamwork_preview_reviewer`): Code quality, invariants, optical symmetry.
   - 2 Challengers (`teamwork_preview_challenger`): Stress tests, viewport edge cases, infinite wrap boundary conditions.
   - 1 Forensic Auditor (`teamwork_preview_auditor`): Integrity verification, genuine logic check, zero-facade audit.
4. **Phase 3: Synthesis & Handoff**
   - Publish `GATE_STATUS.md` and report completion with verified command evidence to parent/sentinel.
