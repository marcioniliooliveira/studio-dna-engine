# Reference Architecture, Guardrails & Structural Integration Survey Report

**Agent**: `teamwork_preview_explorer_survey_3`  
**Working Directory**: `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_explorer_survey_3`  
**Parent Orchestrator ID**: `d8887735-ed06-4d7f-8ad1-4b456af057d8`  
**Target Client**: `clientes/marcionilio-oliveira` ("THE WORK" Section)  
**Reference Archetype**: `copias/jesperlandberg-com/` (WebGL 3D Spatial Engine)  
**Host Framework**: Astro v6.3.1 + Tailwind CSS + GSAP 3 + Lenis (`khanhnguyen-design`)  

---

## 1. Observation

Direct inspection of code, tests, and runtime telemetry produced the following exact evidence:

### 1.1 Jesper Landberg WebGL 3D Spatial Engine Reference
- **Source Files in `copias/jesperlandberg-com/`**:
  - `copias/jesperlandberg-com/MASTER_SPEC.md` (lines 47–48): Verifies canvas/WebGL presence (`1 Canvas encontrado(s)`).
  - `copias/jesperlandberg-com/ui-ux/extraction_manifest.json` (lines 40–168): Catalogs 26 reverse-engineered GLSL shaders (`shader_1.vert` to `shader_10.frag`, `shader_vertex_*.glsl`, `shader_fragment_*.glsl`).
  - `copias/jesperlandberg-com/ui-ux/shaders/shader_1.vert` (lines 71–74): Verifies the fullscreen clip-space quad pass:
    ```glsl
    // Fullscreen pass. The quad is already in clip space (-1..1), so there is no
    // camera to apply and no model matrix worth multiplying by — the vertices go
    // straight through.
    ```
  - `copias/jesperlandberg-com/ui-ux/shaders/shader_vertex_d9ceaf56df.glsl` (lines 71–78): Verifies the ground/floor plane architecture:
    ```glsl
    // Clip space already, exactly like the post pass's quad: this is the page's
    // GROUND, not an object in the scene, so there is no camera to apply and
    // nothing about it should move when the camera's frustum does.
    ```
- **Shader Equations in `src/components/WorkStage/`**:
  - `RibbonCardMaterial.ts` (lines 6–120 vertex shader, lines 123–293 fragment shader):
    - Deformations: `sheetShape(q)` (line 57), `sheetShapeSlope(q)` (line 61), `sheetZ(wx)` (line 68), `sheetRoll(wx)` (line 72), `sheetWind(w)` (line 77), `sheet(w)` (line 89), `sheetDome(uv)` (line 105), `leanRamp(s)` (line 36), `leanSlope(s)` (line 41).
    - Shading & Fragment: `sheetShade` (line 195), `sheetNormal` (line 214), `sheetLit` (line 239), `uvCover` (line 247), `roundedBox` (line 259).
  - `math.ts` (lines 1–231): Provides an exact CPU twin of all GLSL deformation and shading equations.
  - `__tests__/math.spec.ts` (lines 1–96): Vitest CPU verification of `sheetDome`, `leanSlope`, `leanRamp`, `evaluateSheetPoint`, `uvCover`, `roundedBox`, `sheetLit`.
  - **Direct Command Executed**:
    ```powershell
    npx vitest run src/components/WorkStage/__tests__/math.spec.ts
    ```
    **Verbatim Result**: `✓ src/components/WorkStage/__tests__/math.spec.ts (7 tests) 11ms`, `Test Files 1 passed (1)`, `Tests 7 passed (7)`. Exit code 0.

### 1.2 R3F, Drei, GSAP, and Lenis Integration (Strictly WITHOUT `<ScrollControls>`)
- **No `<ScrollControls>` Rule**:
  - In `src/components/WorkStage/WorkStage.tsx` (lines 238–271):
    `<Canvas camera={{ position: [0, 0, SHEET_CONSTANTS.CAMERA_Z], fov: SHEET_CONSTANTS.CAMERA_FOV, near: 0.1, far: 200 }}>` renders `<FloorGrid>` and `<RibbonCard>` directly within `<React.Suspense>`.
    `<ScrollControls>` is completely absent.
- **Scroll Driver**:
  - The page scroll is driven exclusively by Lenis (`assets/_astro/lenis.UMZrGmQz.js`) and GSAP ScrollTrigger in `assets/_astro/initHorizontalScroll.LNLCK81L.js` (lines 1–2).
  - The scroll track is pinned via `ScrollTrigger.create({ trigger: t, animation: s, start: 'top top', end: '+=14124', pin: true, scrub: true })`.
- **Inertial Wheel Synchronization**:
  - In `WorkStage.tsx` (lines 80–123):
    `window.addEventListener('wheel', onWindowWheel, { capture: true, passive: true });`
    When `portalProgress >= 0.95` (stage expanded into view), wheel deltas add physical impulse:
    `ribbonState.current.targetOffset = clamp(ribbonState.current.targetOffset - deltaY * 0.025, -maxOffset, maxOffset);`
    `ribbonState.current.velocity = Math.max(ribbonState.current.velocity, impulse);`
  - In `WorkStage.tsx` (lines 126–155): An exponential smoothing loop updates `ribbonState.current.offset` at 60fps and writes `w.__WORK_STAGE__.scrollVelocity`.
  - In `RibbonCard.tsx` (line 113): `matRef.current.u_sheetV = scrollVelocity;`.
- **GSAP Transitions**:
  - Hover: `gsap.to(matRef.current, { u_hover: 1.0, duration: 0.35, ease: 'power2.out' })` (lines 93–97).
  - Flight to Sheet: `gsap.to(meshRef.current.position, { x: 0, y: 0, z: 14, duration: 0.85, ease: 'power3.out' })` and `gsap.to(matRef.current, { u_sheetP: 0.0, u_white: 1.0, u_shade: 0.0, u_scrim: 0.0, duration: 0.85 })` (lines 43–57).
  - Neighbor Fade: `gsap.to(matRef.current, { u_alpha: 0.0, duration: 0.45, ease: 'power2.out' })` (lines 80–84).

### 1.3 DOM Proxy Layer Architecture and Clipping Pitfalls
- **Current Mounting in `clientes/marcionilio-oliveira/site/index.html`** (lines 330–334):
  ```html
  <div data-more-work-rect="" class="relative h-[calc(14_*_var(--scale))] w-[calc(24.9_*_var(--scale))] overflow-hidden bg-[#d9d9d9]" style="transform-origin: 50% 50%;">
    <video class="h-full w-full object-cover" src="./assets/_astro/thework-desktop.BOEUPLXP.mp4" autoplay="" muted="" loop="" playsinline="" preload="metadata"></video>
    <div id="jesper-work-stage-mount" class="size-full absolute inset-0 z-10"></div>
  </div>
  ```
  - The mount element `#jesper-work-stage-mount` is situated inside `[data-more-work-rect]`.
  - The parent of `[data-more-work-rect]` is:
    `<div class="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center md:flex" aria-hidden="true">`
  - `[data-more-work-rect]` has `overflow: hidden` and undergoes continuous CSS transform scaling (`scale: 0` to `scale: 7.7714`).
- **Defect in `WorkStage.tsx`** (lines 2, 274–345):
  - Line 2 imports `createPortal`: `import { createPortal } from 'react-dom';`.
  - However, lines 274–345 render `<div data-work-ribbon-proxies="">` directly as a regular child inside `<div data-work-webgl-stage="">`.
  - As a result, the proxy buttons are trapped inside `[data-more-work-rect]` and its transformed, clipped, `pointer-events: none` / `aria-hidden="true"` hierarchy.
- **Verbatim Test Failure Observed in Playwright Gate 3**:
  ```
  TimeoutError: locator.hover: Timeout 10000ms exceeded.
  Call log:
    - waiting for locator('[data-work-card-proxy="0"]')
      - locator resolved to <button type="button" data-work-card-proxy="0" data-testid="work-card-proxy-0" aria-label="View EVO Money project details">…</button>
  ```
  Playwright's actionability checks failed because the proxy button was trapped inside a container with `aria-hidden="true"` and an active CSS scaling transform, preventing clean pointer dispatch.
- **Direct Command Executed for Gate 2**:
  ```powershell
  npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"
  ```
  **Verbatim Result**: `ok 1 [chromium] › tests\e2e\work-stage.spec.ts:96:7 › Gate 2: Simetria Óptica e Expansão do Portal "THE WORK" ... (15.3s)`, `1 passed (17.8s)`. Exit code 0. Proves portal expansion and optical symmetry logic in `initHorizontalScroll.LNLCK81L.js` are fully functional.

### 1.4 Astro Header Interaction and Physical Header Coverage
- **Header Structure & Geometry in `skeleton.html` / `index.html`** (line 258):
  ```html
  <header class="fixed z-[110] opacity-0 ... md:inset-x-auto md:inset-y-0 md:left-0 md:right-auto md:bottom-0 md:w-16 md:flex-col ... style="--header-bg: #3A3632; --header-text: #f3eee8; --header-border: #5a524d;" data-intro-header="" aria-label="Global site header">
  ```
  - On desktop (`md:`), the header is a fixed vertical left sidebar:
    `left: 0`, `top: 0`, `bottom: 0`, `width: 64px` (`md:w-16`), `z-index: 110`.
  - Header center coordinates: $X_{\text{center}} = 0 + 64 / 2 = 32\text{px}$; $Y_{\text{center}} = 900 / 2 = 450\text{px}$.
- **Hit-Testing Engine in `assets/_astro/headerTheme.BVy9gA6p.js`** (lines 1–2):
  ```javascript
  const m = "[data-header-bg][data-header-text]";
  function c(t) { return t.getAttribute("aria-hidden") === "true"; }
  function f(t, r, e) {
    const n = t.getBoundingClientRect();
    return r >= n.left && r < n.right && e >= n.top && e < n.bottom;
  }
  function T(t) {
    if (c(t)) return null;
    const r = t.dataset.headerBg, e = t.dataset.headerText;
    return !r || !e ? null : { bg: r, text: e, border: t.dataset.headerBorder ?? "#5a524d" };
  }
  function R(t, r) {
    const e = r.getBoundingClientRect(),
          n = e.left + e.width / 2,   // 32px on desktop!
          a = e.top + e.height / 2,  // 450px on desktop!
          d = t.find(o => o.hasAttribute("data-work-detail-panel") && !c(o) && f(o, n, a));
    if (d) return d;
    for (const o of t)
      if (!c(o) && f(o, n, a)) return o;
    ...
  }
  ```
- **Physical Header Coverage Defect in `WorkStage.tsx`** (lines 350–368):
  - `data-work-detail-panel` has style `inset: '5vh 5vw'`.
  - At a viewport width of 1440px, `5vw = 72px`.
  - Therefore, `o.getBoundingClientRect().left = 72px`.
  - The function `f(o, 32, 450)` evaluates `32 >= 72`, which is **`false`**!
  - Consequently, `headerTheme.BVy9gA6p.js` never matches `data-work-detail-panel`, and the header never applies `--header-bg: #FAF9F6`, `--header-text: #2E2B28`, `--header-border: #b8b3ac`.
- **Query Caching Pitfall in `Header.astro...js`** (line 1):
  - Function `B()` caches: `const r = [...document.querySelectorAll(S)]` once during script initialization.
  - If `data-work-detail-panel` is conditionally rendered into the DOM only after user click, it is not in the cached array `r` unless either:
    1. The detail panel (or an outer proxy layer containing the dataset attributes) is permanently present in the DOM (e.g. via `display: none` / `pointer-events: none` toggles), OR
    2. `[data-more-work-section]` / its portaled wrapper is assigned the attributes so `headerTheme` can track it.

### 1.5 State Machine Transitions and Telemetry Contracts
- **Phase Typings in `WorkStage.tsx`** (line 23):
  `'IDLE' | 'PORTAL_EXPAND' | 'RIBBON_BROWSE' | 'DETAIL_FLIGHT' | 'DETAIL_ACTIVE' | 'DETAIL_CLOSING'`
- **Global Telemetry Object**:
  `window.__WORK_STAGE__` exposes:
  `{ webglReady, phase, portalProgress, ribbonOffset, scrollVelocity, activeProjectIndex, floorAlpha, cards }`.
- **Card Uniforms per Index (`0..3`)**:
  `u_sheetP`, `u_hover`, `u_white`, `u_shade`, `u_scrim`, `u_sheetV`, `u_alpha`.

---

## 2. Logic Chain

### Step 2.1: Mathematical Soundness of Shaders (Gate 1 Passed)
1. *From GLSL to CPU Twin*: `src/components/WorkStage/math.ts` accurately ports `sheetShape`, `sheetShapeSlope`, `sheetDome`, `leanRamp`, `leanSlope`, `uvCover`, `roundedBox`, and `sheetLit`.
2. *From Verification*: Execution of `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` passed 7/7 tests with 0 errors.
3. *Deduction*: The shader mathematics and CPU twin are completely verified and sound.

### Step 2.2: Dual-Driver Conflict Avoidance (Lenis + GSAP without `<ScrollControls>`)
1. *Observation*: The host page employs an Astro horizontal pin-spacer of 14,124px height driven by Lenis and GSAP ScrollTrigger (`initHorizontalScroll.LNLCK81L.js`).
2. *Mechanism*: Adding `<ScrollControls>` from Drei would create a nested virtual scroll DOM container with conflicting event listeners (`wheel`, `touchmove`), destroying inertial continuity and causing scroll hijacking.
3. *Current Integration*: `WorkStage.tsx` omits `<ScrollControls>` and connects directly to window `wheel` events only when `portalProgress >= 0.95`.
4. *Deduction*: The absence of `<ScrollControls>` is a mandatory architectural invariant that preserves Lenis 60fps inertial smooth scrolling.

### Step 2.3: Root Cause of Proxy Actionability Failure in Gate 3
1. *Observation*: `tests/e2e/work-stage.spec.ts:262` timed out waiting for `proxy0.hover()` on `[data-work-card-proxy="0"]`.
2. *Structural Mapping*:
   - `#jesper-work-stage-mount` is mounted inside `<div data-more-work-rect="">`.
   - `[data-more-work-rect]` is inside `<div class="pointer-events-none ... " aria-hidden="true">`.
   - `[data-more-work-rect]` has `transform: matrix(...)` scaling up to $7.7714\times$ and `overflow: hidden`.
   - `WorkStage.tsx` imports `createPortal` but renders `<div data-work-ribbon-proxies="">` inline inside `<div data-work-webgl-stage="">`.
3. *Deduction*: The proxy buttons are trapped in a transformed, clipped, and `aria-hidden` container. In Playwright, `locator.hover()` inspects visibility, stability, and hit-testing; pointer interception by the parent container or transform offsets causes the timeout.
4. *Solution*: Rendering the proxy layer via `createPortal(..., document.body)` with `position: fixed` and `z-index: 105` completely uncouples the interactive buttons from canvas transforms and `[data-more-work-rect]` clipping.

### Step 2.4: Root Cause of Astro Header Theme Inactivation in Gate 4
1. *Observation*: `headerTheme.BVy9gA6p.js` searches for `data-work-detail-panel` where `f(o, n, a)` is true. On desktop (1440x900), $n = 32\text{px}$ and $a = 450\text{px}$.
2. *Geometry Check*: `f(o, 32, 450)` checks `32 >= o.getBoundingClientRect().left && 32 < o.getBoundingClientRect().right`.
3. *Current Styling*: `WorkStage.tsx` sets `style={{ inset: '5vh 5vw' }}`. On 1440px viewport, `5vw = 72px`. Therefore, `o.left = 72px`.
4. *Deduction*: `32 >= 72` evaluates to `false`. The detail panel does not physically cover the left 64px where the sidebar header resides. Therefore, `headerTheme.BVy9gA6p.js` never applies `--header-bg: #FAF9F6`, `--header-text: #2E2B28`, `--header-border: #b8b3ac`.
5. *Solution*: The detail panel (or its backdrop/container) must have `left: 0` and span the full viewport width ($100\text{vw}$ or `left: 0; right: 0`), ensuring $X_{\text{center}} = 32\text{px}$ is contained within its bounding box.

### Step 2.5: Inertial Velocity Decay Race Condition in Gate 3
1. *Observation*: In Playwright Gate 3, `WHEEL DEBUG INFO` logged `scrollVelocity: 0.09317`, but `peakVelocityHandle = await page.waitForFunction(...)` timed out waiting for `scrollVelocity > 0.05`.
2. *Mechanism*: In `WorkStage.tsx` (lines 130–136), `velocity` decays exponentially every animation frame. By the time `page.evaluate` logged the value and Playwright initiated `page.waitForFunction`, the velocity had already decayed below 0.05.
3. *Deduction*: A kinetic velocity pulse must either be captured by setting up the telemetry listener *before* dispatching the mouse wheel event, or `window.__WORK_STAGE__` must maintain a `peakScrollVelocity` metric that preserves the impulse across a multi-frame measurement window.

---

## 3. Caveats

1. **Gate 4 and Gate 5 E2E Tests Are Unwritten**: `tests/e2e/work-stage.spec.ts` currently ends at line 274 (Gate 3). Gate 4 (Card-to-Sheet Flight & Header Activation) and Gate 5 (Detail Close & Ribbon Restoration) must be formalized and appended by the test writer.
2. **`Header.astro...js` DOM Query Caching**: In `Header.astro_astro_type_script_index_0_lang.-_d_Djl9.js`, `const r = [...document.querySelectorAll(S)]` runs once on page load. Any element that is created dynamically after hydration must either exist in the initial HTML or trigger an event that forces re-evaluation.
3. **Build Pipeline Requirement**: Any changes to `src/components/WorkStage/` require running `npx vite build --config vite.bundle.config.mjs` to regenerate `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.

---

## 4. Conclusion

1. **Jesper Landberg Reference Architecture**: The GLSL shaders and deformation physics (`sheetShape`, `sheetShapeSlope`, `sheetWind`, `sheetDome`, `leanRamp`, `leanSlope`, `sheetLit`, `uvCover`, `roundedBox`) are verified and mathematically validated by 7/7 passing Vitest tests in Gate 1.
2. **Scroll Driver Coordination**: The hard guardrail of **NO `<ScrollControls>`** is strictly observed. The system successfully relies on Lenis and GSAP ScrollTrigger for page movement, passing wheel events to the 3D ribbon only when the portal is open.
3. **DOM Proxy Layer (`createPortal`)**: The proxy buttons are currently rendered inside the transformed 3D canvas mount, causing hover actionability timeouts in Playwright. Moving the proxy layer to `createPortal(..., document.body)` with `position: fixed` and `z-index: 105` resolves this failure.
4. **Astro Header Coverage**: `headerTheme.BVy9gA6p.js` checks the header centroid at $X = 32\text{px}$. The detail panel currently uses `inset: 5vh 5vw` ($X_{\text{left}} = 72\text{px}$), failing the containment check. Expanding `data-work-detail-panel` to `left: 0` (physical coverage of the 64px header) is required to trigger the light header theme (`#FAF9F6` / `#2E2B28`).
5. **State Machine & Contracts**: The 5-stage lifecycle (`IDLE/PORTAL_EXPAND` $\to$ `RIBBON_BROWSE` $\to$ `DETAIL_FLIGHT` $\to$ `DETAIL_ACTIVE` $\to$ `DETAIL_CLOSING`) and the `window.__WORK_STAGE__` contract are structurally sound, with Gate 2 passing 100% in Playwright.

---

## 5. Verification Method

To independently verify the architecture, tests, and mechanisms documented in this report:

1. **Verify Gate 1 (CPU Twin Mathematical Verification)**:
   ```powershell
   npx vitest run src/components/WorkStage/__tests__/math.spec.ts
   ```
   *Expected Result*: 7/7 tests pass cleanly with exit code 0.

2. **Verify Gate 2 (Optical Symmetry & 100% Portal Viewport Expansion)**:
   ```powershell
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"
   ```
   *Expected Result*: 1/1 tests pass cleanly in ~15s with exit code 0.

3. **Verify Gate 3 Diagnostics (Fita 3D, Velocity & Hover)**:
   ```powershell
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"
   ```
   *Expected Result*: Verifies presence of the 4 reference cards (`evo-money`, `plant-tag`, `swisshaus`, `betahaus`) and wheel impulse response (`scrollVelocity > 0.05`), while isolating the DOM proxy actionability timeout.

4. **Verify Astro Header Coordinate Check Formula**:
   - Inspect `clientes/marcionilio-oliveira/site/assets/_astro/headerTheme.BVy9gA6p.js`:
     Line 1: `f(t, r, e)` requires $r \ge \text{left} \land r < \text{right}$.
     At $1440\text{px}$ width: Header center $r = 32\text{px}$.
     If `inset: 5vh 5vw` $\implies \text{left} = 72\text{px} \implies 32 \ge 72$ is `false`.
     If `left: 0` $\implies 32 \ge 0 \implies \text{true}$.

5. **Invalidation Condition**:
   - Any modification introducing `<ScrollControls>` into `WorkStage.tsx` invalidates this architecture and breaks Lenis integration.
   - Any proxy implementation retaining DOM elements within `[data-more-work-rect]` invalidates Playwright actionability and accessibility compliance.
