# Handoff Report — WorkStage Implementation Survey & Conformance Audit

**Agent:** Survey Explorer 1 (`teamwork_preview_explorer_survey_1`)  
**Working Directory:** `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_explorer_survey_1`  
**Parent Orchestrator:** `d8887735-ed06-4d7f-8ad1-4b456af057d8`  
**Timestamp:** 2026-10-15T19:54:30Z  

---

## 1. Observation

### 1.1 Codebase & Component Structure
- `src/components/WorkStage/`:
  - `math.ts` (231 lines): Contains CPU mathematical twins for shaders, constants `SHEET_CONSTANTS`, and helper functions: `clamp`, `smoothstep`, `leanRamp`, `leanSlope`, `sheetDome`, `sheetQ`, `sheetShape`, `sheetShapeSlope`, `sheetZ`, `sheetRoll`, `roundedBox`, `uvCover`, `sheetLit`, `evaluateSheetPoint`.
  - `__tests__/math.spec.ts` (96 lines): 7 unit tests covering `sheetDome`, `leanSlope`, `leanRamp`, `evaluateSheetPoint` with `u_sheetP: 0`, `uvCover`, `roundedBox`, and `sheetLit`.
  - `RibbonCardMaterial.ts` (336 lines): Custom GLSL `RibbonCardMaterial` via `shaderMaterial` from `@react-three/drei`. Contains complete GLSL implementations of `leanRamp`, `leanSlope`, `lean`, `sheetQ`, `sheetShape`, `sheetShapeSlope`, `sheetZ`, `sheetRoll`, `sheetWind`, `sheet`, `sheetDome`, `sheetShade`, `sheetOffset`, `sheetNormal`, `sheetLit`, `uvCover`, and `roundedBox`.
  - `RibbonCard.tsx` (159 lines): R3F mesh rendering each card with plane size `[16, 10]`, segments `[24, 24]`. Includes GSAP animations for detail flight (`u_sheetP` → 0, `u_white` → 1, `u_shade` → 0, `u_scrim` → 0, `z` → 14) and neighbor fade (`u_alpha` → 0). Synchronizes uniforms to `window.__WORK_STAGE__.cards[index]`.
  - `FloorGridMaterial.ts` (96 lines) & `FloorGrid.tsx` (32 lines): Perspective ground plane shader with `u_leanK` and dual-color fade using `BRAND_TOKENS.floorC0` and `floorC1`.
  - `WorkStage.tsx` (426 lines): Root component mounting `<Canvas>` (FOV 75, Z 27), physics loop for `scrollVelocity`, `targetOffset`, and wheel listener with capture phase. Currently renders DOM proxies and detail panel within its local JSX hierarchy.
  - `mount.tsx` (21 lines): Client entry point initializing `createRoot` on `#jesper-work-stage-mount`.
  - `referenceData.ts` (80 lines): Canonical definitions of the 4 project slots (`evo-money`, `plant-tag`, `swisshaus`, `betahaus`) and `BRAND_TOKENS`.
  - `WorkStage.stories.tsx` (26 lines): Storybook stories for `Default` and `PortalExpanding`.
  - `vite.bundle.config.mjs` (24 lines): Vite build config targeting `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` with library entry `src/components/WorkStage/mount.tsx`.

### 1.2 Client Workspace & Integration Point (`clientes/marcionilio-oliveira/`)
- `clientes/marcionilio-oliveira/site/index.html` (lines 327–330):
  - Section `[data-more-work-section]` with `data-header-bg="#faf9f6"`, `data-header-text="#2e2b28"`, `data-header-border="#b8b3ac"`.
  - Expanding desktop rect: `<div data-more-work-rect="" class="relative h-[calc(14_*_var(--scale))] w-[calc(24.9_*_var(--scale))] overflow-hidden bg-[#d9d9d9]" style="transform-origin: 50% 50%;">`
  - Fallback `<video>` + mount node `<div id="jesper-work-stage-mount" class="size-full absolute inset-0 z-10"></div>`.
  - Script inclusion at line 13: `<script src="./assets/_astro/workStage.bundle.js" type="module"></script>`.
- `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`:
  - Drives GSAP ScrollTrigger timeline pinning `data-horizontal-pin` and expanding `data-more-work-rect` by cover scale `W = 7.7714`.
  - Contains hooks: `window.__TEST_SET_PORTAL_PROGRESS__` and `window.__TEST_SCROLL_TO_PORTAL_PROGRESS__`.
- `clientes/marcionilio-oliveira/site/assets/_astro/headerTheme.BVy9gA6p.js`:
  - Contains function `R(t, r)` which explicitly searches for `[data-work-detail-panel]`:
    `d = t.find(o => o.hasAttribute("data-work-detail-panel") && !c(o) && f(o, n, a)); if (d) return d;`
  - `c(t)` evaluates `t.getAttribute("aria-hidden") === "true"`.
  - `f(t, r, e)` verifies whether point `(r, e)` (center of header rect, `r = 32px`, `e = 450px`) lies inside `t.getBoundingClientRect()`.
  - Updates `--header-bg`, `--header-text`, `--header-border` via function `x(t, r)`.
- `clientes/marcionilio-oliveira/site/assets/_astro/Header.astro_astro_type_script_index_0_lang.-_d_Djl9.js`:
  - Initializes `r = [...document.querySelectorAll(S)]` (`S = "[data-header-bg][data-header-text]"`) once on module execution.
  - Header is fixed on desktop left rail: `md:inset-y-0 md:left-0 md:w-16` (0px to 64px, center at `x = 32px`).

### 1.3 Executed Test Results
1. **Gate 1 (Vitest CPU Math Twin):**
   - Command: `npx vitest run src/components/WorkStage/__tests__/math.spec.ts`
   - Result: **EXIT CODE 0** (7 passed, duration 4.31s).
   - [Observed] `sheetDome`, `leanSlope`, `leanRamp`, `evaluateSheetPoint`, `uvCover`, `roundedBox`, and `sheetLit` all pass assertions with zero errors.
2. **Gate 2 (Playwright Portal Expansion & Optical Symmetry):**
   - Command: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"`
   - Result: **EXIT CODE 0** (1 passed, duration 17.2s).
   - [Observed] Diagnostic bounding box of `[data-more-work-rect]` at `portalProgress = 1.0`: `width: 1935.08px`, `height: 1088.00px`, `transform: matrix(7.7714, 0, 0, 7.7714, 0, 0)`.
   - [Observed] `window.__WORK_STAGE__.phase` is confirmed as `'RIBBON_BROWSE'`.
3. **Gate 3 (Playwright 3D Ribbon, Velocity & Hover):**
   - Command: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"`
   - Result: **EXIT CODE 1 (FAIL)**.
   - [Observed verbatim error]:
     ```
     TimeoutError: locator.hover: Timeout 10000ms exceeded.
     Call log:
       - waiting for locator('[data-work-card-proxy="0"]')
         - locator resolved to <button type="button" data-work-card-proxy="0" ...>
     ```
   - [Observed verbatim diagnostic]:
     ```json
     PROXY 0 DIAGNOSTIC: {
       "box": {
         "x": -1277.79931640625,
         "y": -529.1964111328125,
         "width": 880.11083984375,
         "height": 1958.3927001953125,
         "top": -529.1964111328125,
         "left": -1277.79931640625
       },
       "scrollX": 0,
       "scrollY": 4920,
       "innerWidth": 1440,
       "innerHeight": 900
     }
     ```
   - [Observed wheel physics]: `scrollVelocity: 0.9712` (> 0.05 threshold), `cardData.slugs: ['evo-money', 'plant-tag', 'swisshaus', 'betahaus']`.
4. **Gates 4 & 5 (Detail Flight & Close Restoration):**
   - [Observed] `tests/e2e/work-stage.spec.ts` ends at line 274. No `test.describe` blocks exist for Gate 4 or Gate 5 in this test file yet.

---

## 2. Logic Chain

1. **Gate 1 Conformance [Observed]:**
   - `math.ts` contains CPU implementations strictly matching the GLSL code in `RibbonCardMaterial.ts` (lines 36–120, 156–293) and `FloorGridMaterial.ts` (lines 16–35, 50–65).
   - Execution of `vitest` confirmed 7/7 tests passing with exit code 0.

2. **Root Cause of Gate 3 Failure [Observed & Inferred]:**
   - In `clientes/marcionilio-oliveira/site/index.html`, `#jesper-work-stage-mount` is a child of `div[data-more-work-rect]`.
   - In `initHorizontalScroll.LNLCK81L.js`, GSAP applies `scale: 7.7714` to `div[data-more-work-rect]` when expanded to full viewport.
   - In `WorkStage.tsx` (lines 274–286), the DOM proxy buttons `[data-work-card-proxy]` are rendered as children of `data-work-webgl-stage` inside `#jesper-work-stage-mount`.
   - Consequently, the 7.7714x CSS scale transform cascades into `[data-work-card-proxy="0"]`, scaling its dimensions to `880px × 1958px` and translating its origin to `x = -1277.8px`, far off-screen.
   - Requirement R1 in `ORIGINAL_REQUEST.md` specifically mandates:
     > *"Implementar camada DOM acessível de botões proxy montados fora de transformações destrutivas (com `createPortal` para `document.body` em coordenadas `fixed`)."*
   - In `WorkStage.tsx` line 2, `createPortal` is imported from `react-dom`, but the proxies are rendered locally in the JSX tree instead of portaling to `document.body`.
   - Fixing this requires rendering the proxies via `createPortal(<div style={{ position: 'fixed', inset: 0, ... }}>...</div>, document.body)`.

3. **Guardrail 4 Analysis: Lateral Header & Detail Panel [Observed & Inferred]:**
   - `headerTheme.BVy9gA6p.js` checks whether the center point of `<header data-intro-header>` (`x = 32px`, `y = 450px` on desktop) is physically enclosed by `[data-work-detail-panel].getBoundingClientRect()`.
   - In `WorkStage.tsx` (line 358), `[data-work-detail-panel]` is styled with `position: 'absolute', inset: '5vh 5vw'`. On 1440px viewport, `5vw = 72px`. Therefore `rect.left = 72px`, which fails the check `32 >= rect.left` (`32 >= 72` is false).
   - Additionally, `Header.astro` queries `r = [...document.querySelectorAll('[data-header-bg][data-header-text]')]` only once at script load time. If `[data-work-detail-panel]` is conditionally unmounted (`{activeProject && ...}`) or not present in initial DOM, `r` will never contain it.
   - Furthermore, `[data-work-detail-panel]` rendered inside `#jesper-work-stage-mount` inherits the 7.7714x scale transform of `[data-more-work-rect]`.
   - Mounting `[data-work-detail-panel]` via `createPortal` to `document.body` with `position: 'fixed'`, `left: 0`, `top: 0`, `width: '100vw'`, `height: '100vh'`, and initial presence in the DOM (with `aria-hidden="true"` when inactive) guarantees physical coverage of the header (`x = 32px`) and deterministic theme switching to `--header-bg: #faf9f6` / `--header-text: #2e2b28`.

4. **Missing E2E Tests for Gates 4 and 5 [Observed]:**
   - The test file `tests/e2e/work-stage.spec.ts` only contains Gate 2 (lines 95–179) and Gate 3 (lines 181–272).
   - Gate 4 and Gate 5 test suites must be implemented in `tests/e2e/work-stage.spec.ts` to satisfy the Acceptance Criteria in `ORIGINAL_REQUEST.md`.

---

## 3. Caveats

1. **Read-Only Scope [Documented]:** As Survey Explorer 1, no source code in `src/` or `clientes/` was modified during this survey. Proposed architectural repairs are strictly documented for the implementing builder agent.
2. **Bundle Recompilation Requirement [Inferred]:** Any code modifications to `src/components/WorkStage/` require executing `npx vite build --config vite.bundle.config.mjs` to update `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` before running Playwright E2E tests.
3. **Alternative Portal Mount Target [Inferred]:** While `createPortal(..., document.body)` is the standard solution, ensuring the proxy and detail panel layers do not inherit pointer-events blocking from ancestor overlays was noted.

---

## 4. Conclusion

### Conformance Audit of the 5 Hard Guardrails

| Guardrail | Status | Verification Detail |
|---|---|---|
| **1. Sem `<ScrollControls>`** | **CONFORMS** [Observed] | Zero references to `<ScrollControls>` across `src/components/WorkStage/`. Scroll is orchestrated by Lenis + GSAP ScrollTrigger in `initHorizontalScroll.LNLCK81L.js` and local wheel event listener on `window`/`document`. |
| **2. Equações GLSL Intactas** | **CONFORMS** [Observed] | All 9 equations (`sheetShape`, `sheetShapeSlope`, `sheetWind`, `sheetDome`, `leanRamp`, `leanSlope`, `sheetLit`, `uvCover`, `roundedBox`) are identical between `RibbonCardMaterial.ts` and `math.ts`. Vitest unit suite passes 7/7 (100%). |
| **3. Contrato de Dados e Tokens** | **CONFORMS** [Observed] | Exactly the 4 specified projects (`evo-money`, `plant-tag`, `swisshaus`, `betahaus`) and tokens matching `brand-spec.json` and `referenceData.ts`. |
| **4. Header Lateral Astro** | **PARTIAL / NEEDS FIX** [Observed] | Attributes `data-work-detail-panel`, `data-header-bg="#FAF9F6"`, `data-header-text="#2E2B28"`, `data-header-border="#b8b3ac"` are present in `WorkStage.tsx`. However, physical coverage fails because `inset: 5vh 5vw` leaves the header (`x = 32px`) uncovered (`left = 72px`), and conditional unmounting prevents `Header.astro` from caching the element in its query selector list. |
| **5. Telemetria Global** | **CONFORMS** [Observed] | `window.__WORK_STAGE__` continuously syncs `phase`, `portalProgress`, `ribbonOffset`, `scrollVelocity`, `activeProjectIndex`, `floorAlpha`, and all uniform properties (`u_sheetP`, `u_hover`, `u_white`, `u_shade`, `u_scrim`, `u_sheetV`, `u_alpha`). |

### Concrete Action Plan for Implementation Agent
1. **Fix DOM Proxies (Gate 3 Fix):**
   - Wrap `[data-work-ribbon-proxies]` in `createPortal(..., document.body)`.
   - Use `position: 'fixed'` viewport coordinates so buttons are immune to `[data-more-work-rect]`'s 7.7714x scale transform.
2. **Fix Detail Panel & Header Theme (Gate 4 Fix):**
   - Wrap `[data-work-detail-panel]` in `createPortal(..., document.body)` with `position: 'fixed'`, `inset: 0`, and physical coverage of the left rail (`left: 0`).
   - Ensure `[data-work-detail-panel]` is present in the DOM (rendered initially with `aria-hidden="true"`, toggling to `aria-hidden="false"` when active) so `Header.astro` can detect it.
3. **Implement Gate 4 and Gate 5 E2E Tests:**
   - Add test suites for Gate 4 (Card-to-Sheet flight, uniform transitions, header variables `--header-bg: #faf9f6` / `--header-text: #2e2b28`) and Gate 5 (Close button / Escape key restoration) in `tests/e2e/work-stage.spec.ts`.
4. **Rebuild Bundle:**
   - Run `npx vite build --config vite.bundle.config.mjs` after edits.

---

## 5. Verification Method

To independently verify these findings, execute the following commands in `c:\Users\wd\Documents\playwright-scraper`:

1. **Verify Gate 1 CPU Math Twins:**
   ```bash
   npx vitest run src/components/WorkStage/__tests__/math.spec.ts
   ```
   *Expected:* 7 passed, exit code 0.

2. **Verify Gate 2 Portal Expansion:**
   ```bash
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"
   ```
   *Expected:* 1 passed, exit code 0.

3. **Verify Gate 3 Reproduction of Proxy Scale Bug:**
   ```bash
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"
   ```
   *Expected:* Fails with `TimeoutError: locator.hover: Timeout 10000ms exceeded` on `[data-work-card-proxy="0"]`, with diagnostic `box.x = -1277.8px`.

4. **Verify Absence of Gate 4 and Gate 5 Tests:**
   Inspect `tests/e2e/work-stage.spec.ts` lines 240–274. Confirm no `test.describe('Gate 4...'` or `test.describe('Gate 5...'` exist.
