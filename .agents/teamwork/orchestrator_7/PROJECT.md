# Project: Continuous 4-Phase Cinematic Arc for "THE WORK" (Approach C)

## Architecture
- **Host Site**: Astro v6.3.1 + Tailwind CSS + GSAP 3 + Lenis (`clientes/marcionilio-oliveira/site/`).
- **3D Spatial Engine**: React Three Fiber (R3F), Drei, GSAP (`src/components/WorkStage/`).
- **4-Phase Cinematic Lifecycle (Approach C)**:
  - **Phase 1 (Optical Entry)**: GSAP timeline label `mwPause` expands `[data-more-work-rect]` (or mobile equivalent) from scale 0 to $W$ while clipping `#jesper-work-stage-viewport`. $pp$ transitions from $0 \to 1$.
  - **Phase 2 (3D Interactive Browse)**: GSAP timeline label `mwHold` retains viewport at $100\%$ while horizontal track remains pinned. Wheel/touch deltas navigate the 4 editorial project cards along the 3D ribbon with inertial physics and hover elevation.
  - **Phase 3 (Smooth Cinematic Exit)**: GSAP timeline label `mwExit` smoothly transitions `#jesper-work-stage-viewport` ($pp: 1 \to 0$ clip-path fade), handing visual focus back to the page layout.
  - **Phase 4 (Page Continuity)**: GSAP timeline label `mwResume` seamlessly resumes the horizontal track translation toward Chapter III (Services), Chapter IV (Clients), and the Footer.
- **Lenis Deadlock Elimination**:
  - Total elimination of `data-lenis-prevent="true"` attribute assignments.
  - Non-blocking event flow: page wheel and virtual scroll remain active so users navigate smoothly without deadlocks.
- **React State Decoupling**:
  - `setPortalProgress` eliminated from synchronous scroll event loops; Three.js `useFrame` reads atomic values from `window.__WORK_STAGE__` at 60fps.
  - DOM proxy visibility manipulated via `.style` directly; `setPhase` guarded by transition boundaries ($\ge 0.99$).
- **Narrative Harmony & Zero Redundancy**:
  - The 3D WorkStage is the canonical Chapter II presentation (EVO Money, Plant Tag, Swiss Haus, Betahaus).
  - Removal of redundant static Section 4 (`data-section="home-work"`), creating a direct continuous transition from Section 3 to Section 5 (`[data-services-section]`, Chapter III).
- **GLSL Shaders & Canonical Fidelity**:
  - Strict preservation of all 12 deformation equations in `RibbonCardMaterial.ts` (`sheetShape`, `sheetWind`, `sheetDome`, `leanRamp`, `roundedBox`, etc.) matching CPU twin in `math.ts` 1:1.
  - Exact 4 canonical projects and tokens from `referenceData.ts`.
- **Preview & Build Infrastructure**:
  - `scripts/serve-marcionilio-site.cjs` routes `/` deterministically to `/index.html`.
  - `workStage.bundle.js` compiled via `npm run build:workstage` (1.299 kB).

## Code Layout
- `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`: GSAP ScrollTrigger 4-phase timeline, `syncViewportClip`, mobile scroll handling, `__SYNC_VIEWPORT_CLIP__`.
- `src/components/WorkStage/WorkStage.tsx`: 3D canvas, wheel listener deduplication, activation threshold ($pp \ge 0.99$), elastic overscroll release, React state decoupling.
- `src/components/WorkStage/FloorGrid.tsx`: Three.js floor grid reading `window.__WORK_STAGE__.floorAlpha` via `useFrame`.
- `src/components/WorkStage/RibbonCard.tsx`: Three.js ribbon card reading `ribbonOffset` and `scrollVelocity` via `useFrame`.
- `clientes/marcionilio-oliveira/site/index.html`: Main HTML entry, removal of redundant static Chapter II.
- `scripts/serve-marcionilio-site.cjs`: Local preview server, routing `/` to `/index.html`.
- `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`: Compiled client bundle artifact.
- `tests/e2e/work-stage.spec.ts`: Playwright test suite for Quality Gates 2-5 and Gate 6.
- `tests/e2e/challenger-viewport.spec.ts`: Multi-viewport stress test suite across 4 desktop resolutions and WebGL health.
- `src/components/WorkStage/__tests__/math.spec.ts`: Vitest CPU math twin verification (Gate 1).

## Feature Inventory
| # | Feature | Description | Milestone | Status | Source |
|---|---------|-------------|-----------|--------|--------|
| 1 | 4-Phase GSAP Cinematic Arc (WP-1) | `mwPause` (0->1), `mwHold` (1.0), `mwExit` (1->0), `mwResume` (page scroll) in `initHorizontalScroll.LNLCK81L.js` | M1 | DONE | ORIGINAL_REQUEST §R1 |
| 2 | Lenis Deadlock Elimination (WP-1) | Remove blind `data-lenis-prevent` re-arming in `syncViewportClip`; allow natural wheel propagation | M1 | DONE | ORIGINAL_REQUEST §Guardrail 2 |
| 3 | Mobile Arc Synchronization (WP-1) | Symmetric temporal expansion ($3.3 \times P$) in vertical scroll block without touch lock | M1 | DONE | ORIGINAL_REQUEST §R1 |
| 4 | WorkStage Handshake & Listener Cleanup (WP-2) | Deduplicate window/document wheel listeners, remove inline JSX clamp, elevate threshold to $pp \ge 0.99$ | M1 | DONE | ORIGINAL_REQUEST §R2 |
| 5 | Elastic Boundary & Overscroll Release (WP-2) | When reaching ribbon boundary (Card 3), user wheel smoothly triggers timeline advance without hard lock | M1 | DONE | ORIGINAL_REQUEST §R2 |
| 6 | Redundancy Elimination (WP-3) | Remove static Section 4 duplicate in `index.html`, connect Section 3 to Section 5 (Chapter III) | M1 | DONE | ORIGINAL_REQUEST §R3 |
| 7 | Preview Server Sanitation (WP-4) | Serve `/index.html` at root route `/` in `scripts/serve-marcionilio-site.cjs` | M1 | DONE | ORIGINAL_REQUEST §R4 |
| 8 | Production Bundle Synchronization (WP-4) | Build and verify `workStage.bundle.js` with `npm run build:workstage` | M1 | DONE | ORIGINAL_REQUEST §R4 |
| 9 | Gate 1 (CPU Math & Shaders) | Vitest passes 7/7 tests in `math.spec.ts` | M2 | DONE | ORIGINAL_REQUEST §Acceptance |
| 10 | Gate 2 (Optical Symmetry & Opening) | Playwright E2E passes optical symmetry & portal expansion | M2 | DONE | ORIGINAL_REQUEST §Acceptance |
| 11 | Gate 3 (3D Ribbon & Wheel Velocity) | Playwright E2E passes 4 projects, wheel response & hover elevation | M2 | DONE | ORIGINAL_REQUEST §Acceptance |
| 12 | Gate 4 (Card-to-Sheet Flight & Theme) | Playwright E2E passes card 0 uncurling & lateral header theme match | M2 | DONE | ORIGINAL_REQUEST §Acceptance |
| 13 | Gate 5 (Detail Close & State Restoration) | Playwright E2E passes close button, escape key & overflow restore | M2 | DONE | ORIGINAL_REQUEST §Acceptance |
| 14 | Gate 6 (Continuous End-to-End Scroll) | Playwright E2E passes top -> portal -> ribbon -> Chapter III -> IV -> Footer without deadlock | M2 | DONE | ORIGINAL_REQUEST §Acceptance |
| 15 | Multi-Viewport Stress Gate | Playwright E2E passes across 1440x900, 1920x1080, 1280x800, 1600x900 + WebGL health | M2 | DONE | ORIGINAL_REQUEST §Acceptance |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M0 | Survey & Architecture Formulation | 3 parallel Explorers diagnosing codebase, Lenis deadlock, WorkStage, DOM and test suite | none | DONE |
| M1 | Approach C Implementation (WP-1, WP-2, WP-3, WP-4) | GSAP 4-phase timeline, Lenis fix, WorkStage handshake, redundancy removal, preview server fix, bundle build | M0 | DONE |
| M2 | Verification & Quality Gates (Gates 1-6 & Multi-Viewport) | Running Gates 1-6 and multi-viewport stress suite, Reviewer, Challenger, and Forensic Auditor | M1 | DONE |
| M3 | Final Orchestration Handoff & Reporting | Synthesis of verification reports, gate consolidation, and completion report to Sentinel | M2 | DONE |

## Interface Contracts
### `window.__WORK_STAGE__` Telemetry
```typescript
interface WorkStageTelemetry {
  webglReady: boolean;
  phase: 'IDLE' | 'PORTAL_EXPAND' | 'RIBBON_BROWSE' | 'DETAIL_FLIGHT' | 'DETAIL_ACTIVE' | 'DETAIL_CLOSING';
  portalProgress: number;
  ribbonOffset: number;
  scrollVelocity: number;
  activeProjectIndex: number | null;
  floorAlpha: number;
  cards: {
    [key: string]: {
      slug: string;
      title: string;
      position: [number, number, number];
      uniforms: {
        u_sheetP: number;
        u_hover: number;
        u_white: number;
        u_shade: number;
        u_scrim: number;
        u_sheetV: number;
        u_alpha: number;
      };
    };
  };
}
```

### Timeline Progression Contract
- `portalProgress = 0.0`: Viewport clipped to `polygon(0 0, 0 0, 0 0, 0 0)`, `pointer-events: none`.
- `0.0 < portalProgress < 0.999`: Viewport clipped to `[data-more-work-rect]` (or mobile equivalent), `pointer-events: none`.
- `portalProgress = 1.0`: Viewport `clipPath = none`, `pointer-events: auto`, interactive 3D ribbon browse active.
- `portalProgress` during `mwExit`: smoothly transitions to 0.0 with fade/clip restoration, handing off to Chapter III.
- `window.__TEST_SCROLL_TO_PORTAL_PROGRESS__(tp)`: remains backwards-compatible, scrolling timeline to $p + tp \times M_{in}$.
