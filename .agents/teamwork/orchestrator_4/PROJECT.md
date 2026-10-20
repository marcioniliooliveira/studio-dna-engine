# Project: "THE WORK" Section Consolidation with WebGL 3D Spatial Engine

## Architecture
- **Host Site**: Astro v6.3.1 + Tailwind CSS + GSAP 3 + Lenis (`clientes/marcionilio-oliveira/site/`).
- **3D Spatial Engine**: React Three Fiber (R3F), Drei, GSAP (`src/components/WorkStage/`).
- **Scroll Synchronization**:
  - Lenis and GSAP ScrollTrigger drive the page scroll (`initHorizontalScroll.LNLCK81L.js`).
  - No `<ScrollControls>` inside R3F (Guardrail 1).
  - Wheel impulse added to ribbon scroll velocity when portal expanded (`portalProgress >= 0.95`).
- **Shader Deformations**:
  - Exact GLSL equations in `RibbonCardMaterial.ts` (`sheetShape`, `sheetShapeSlope`, `sheetWind`, `sheetDome`, `leanRamp`, `leanSlope`, `sheetLit`, `uvCover`, `roundedBox`) mirrored 1:1 in `math.ts` (Guardrail 2).
- **Client Tokens & Data Contract**:
  - Exactly 4 project cards (`evo-money`, `plant-tag`, `swisshaus`, `betahaus`) and tokens from `referenceData.ts` (Guardrail 3).
- **DOM Proxy & Detail Panel Layer**:
  - Proxies and detail panel portaled to `document.body` via `createPortal` with `position: fixed` coordinates to escape `[data-more-work-rect]`'s 7.7714x CSS scale transform.
  - Detail panel covers `left: 0` to physically cover the desktop header rail (center at `x = 32px`, `y = 450px`) for deterministic detection by `headerTheme.BVy9gA6p.js` (Guardrail 4).
  - Detail panel permanently mounted with `aria-hidden="true"` / `"false"` so `Header.astro` queries can resolve it.
- **Global Telemetry**:
  - Synchronous `window.__WORK_STAGE__` state updated every frame with `phase`, `cards`, and shader uniforms (`u_sheetP`, `u_hover`, `u_white`, `u_shade`, `u_scrim`, `u_sheetV`, `u_alpha`) (Guardrail 5).

## Code Layout
- `src/components/WorkStage/WorkStage.tsx`: Main React component, canvas, wheel listener, portal mount for proxies and detail panel.
- `src/components/WorkStage/RibbonCard.tsx`: Card mesh, shader material uniforms, and GSAP tweens.
- `src/components/WorkStage/RibbonCardMaterial.ts`: Custom Drei shader material with GLSL deformation and lighting.
- `src/components/WorkStage/math.ts`: CPU twin functions matching GLSL shaders.
- `src/components/WorkStage/__tests__/math.spec.ts`: Unit test suite (Gate 1).
- `vite.bundle.config.mjs`: Bundling configuration.
- `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`: Compiled client bundle.
- `tests/e2e/work-stage.spec.ts`: Playwright E2E test suite (Gates 2, 3, 4, 5).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | CPU Math Twin Verification | 7/7 unit tests verifying GLSL math equations in `math.spec.ts` | M1 (DONE) | ORIGINAL_REQUEST §Acceptance (Gate 1) |
| 2 | Optical Symmetry & Portal Expansion | Symmetry at 0.35, 100% viewport coverage at 1.0 in `work-stage.spec.ts` | M1 (DONE) | ORIGINAL_REQUEST §Acceptance (Gate 2) |
| 3 | 3D Ribbon & Velocity Response | 4 cards, wheel impulse response (`scrollVelocity > 0.05`) | M2 | ORIGINAL_REQUEST §R1 (Gate 3) |
| 4 | Tactile DOM Proxy Button Layer | Accessible proxy buttons mounted via `createPortal(..., document.body)` in `fixed` coords, fixing hover scale bug | M2 | ORIGINAL_REQUEST §R1 (Gate 3) |
| 5 | Card-to-Sheet Flight & Transition | Card 0 flight to center, uncurling (`u_sheetP < 0.01`, `u_white > 0.99`), neighbors fade (`u_alpha < 0.01`) | M2 | ORIGINAL_REQUEST §R2 (Gate 4) |
| 6 | Detail Panel & Header Theme Detection | `[data-work-detail-panel]` with `left: 0` physical header coverage, applying `--header-bg: #FAF9F6` | M2 | ORIGINAL_REQUEST §R2 (Gate 4) |
| 7 | Detail Close & Ribbon Restoration | `[data-detail-close]` / Escape triggers `DETAIL_CLOSING` -> `RIBBON_BROWSE`, uniform & overflow restoration | M2 | ORIGINAL_REQUEST §R3 (Gate 5) |
| 8 | Gate 4 E2E Test Suite | Automated Playwright test for Card-to-Sheet flight and header theme activation | M1 | ORIGINAL_REQUEST §Acceptance (Gate 4) |
| 9 | Gate 5 E2E Test Suite | Automated Playwright test for detail close and state restoration | M1 | ORIGINAL_REQUEST §Acceptance (Gate 5) |
| 10 | Bundle Compilation Pipeline | Rebuild `workStage.bundle.js` via `npx vite build --config vite.bundle.config.mjs` | M2 | ORIGINAL_REQUEST §Acceptance |
| 11 | Quality Gates 1-5 End-to-End Validation | Strict TDD verification of all 5 gates with 100% green exit code 0 | M3 | ORIGINAL_REQUEST §Acceptance |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | E2E Testing Track: Gates 4 & 5 Specs | Author Gate 4 and Gate 5 test suites in `tests/e2e/work-stage.spec.ts` | none | IN_PROGRESS |
| M2 | Component Architecture & DOM Portaling | Port proxies and detail panel to `document.body` via `createPortal` with `fixed` coords and `left: 0`, rebuild bundle | none | IN_PROGRESS |
| M3 | End-to-End Verification & Quality Gates | Execute Gates 1-5, Reviewer review, Challenger stress tests, and Forensic Audit | M1, M2 | PLANNED |

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

### Detail Panel DOM Contract
```html
<div
  data-work-detail-panel=""
  data-header-bg="#FAF9F6"
  data-header-text="#2E2B28"
  data-header-border="#b8b3ac"
  aria-hidden="false" <!-- or "true" when inactive -->
  style="position: fixed; inset: 0; left: 0; ..."
>
  ...
  <button type="button" data-detail-close="">Close</button>
</div>
```
