# Handoff Report: Gate 3 & Gate 4 Investigation

**Agent**: `explorer_m3_2`  
**Milestone**: M3 (Verification of Gates 3 and 4)  
**Date**: 2026-10-15  
**Working Directory**: `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_2`  
**Authoritative Documents**:
- `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md` (Mandatory)
- `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_5\PROJECT.md`
- `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_2\DISPATCH.md`

---

## 1. Observation

### 1.1 Gate 3 Execution & Terminal Output

**Command executed:**
```powershell
npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"
```

**Verbatim Terminal Output:**
```text
Running 1 test using 1 worker

PROXY 0 DIAGNOSTIC: {"box":{"x":61.21875,"y":324,"width":302.390625,"height":252,"top":324,"left":61.21875},"scrollX":0,"scrollY":4920,"innerWidth":1440,"innerHeight":900}
HIT ELEMENT: {"target":"<button type=\"button\" data-testid=\"work-card-proxy-0\" data-work-card-proxy=\"0\" aria-label=\"View EVO ","hit":"<button type=\"button\" data-testid=\"work-card-proxy-0\" data-work-card-proxy=\"0\" aria-label=\"View EVO ","hitTag":"BUTTON","hitClass":"","hitZIndex":"auto","hitPointerEvents":"auto"}
  ok 1 [chromium] › tests\e2e\work-stage.spec.ts:182:7 › Gate 3: Fita 3D com os 4 Projetos, Velocidade e Hover › Presença dos 4 projetos, resposta de scrollVelocity e hover em u_hover (10.8s)

  1 passed (12.6s)
```
**Exit Code:** `0` (PASS)

### 1.2 Gate 4 Execution & Terminal Output

**Command executed:**
```powershell
npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"
```

**Verbatim Terminal Output:**
```text
Running 1 test using 1 worker

  x  1 [chromium] › tests\e2e\work-stage.spec.ts:271:7 › Gate 4: Voo Espacial Card-to-Sheet e Visão Detalhada › Voo tridimensional do Card 0, descurvatura, fade dos vizinhos e ativação do tema no header Astro (21.5s)


  1) [chromium] › tests\e2e\work-stage.spec.ts:271:7 › Gate 4: Voo Espacial Card-to-Sheet e Visão Detalhada › Voo tridimensional do Card 0, descurvatura, fade dos vizinhos e ativação do tema no header Astro 

    TimeoutError: page.waitForFunction: Timeout 10000ms exceeded.

      392 |
      393 |     // 5. Verificação da Ativação do Tema no Header Astro (<header data-intro-header>)
    > 394 |     await page.waitForFunction(() => {
          |                ^
      395 |       const header = document.querySelector('header[data-intro-header]') as HTMLElement;
      396 |       if (!header) return false;
      397 |       const bg = header.style.getPropertyValue('--header-bg').toLowerCase().trim();
        at C:\Users\wd\Documents\playwright-scraper\tests\e2e\work-stage.spec.ts:394:16

    Error Context: test-results\work-stage-Gate-4-Voo-Espa-4d8c3-ção-do-tema-no-header-Astro-chromium\error-context.md

  1 failed
    [chromium] › tests\e2e\work-stage.spec.ts:271:7 › Gate 4: Voo Espacial Card-to-Sheet e Visão Detalhada › Voo tridimensional do Card 0, descurvatura, fade dos vizinhos e ativação do tema no header Astro 
```
**Exit Code:** `1` (FAIL at Assertion 5)

### 1.3 Step-by-Step Gate 4 Assertions Breakdown

Through source inspection and runtime diagnostics, the test progress inside Gate 4 was determined:
1. **Phase Sequence Transition:** PASS. `DETAIL_FLIGHT` was captured during the flight animation, and the settled phase reached `DETAIL_ACTIVE` (lines 314–330).
2. **Card 0 Shader Uniforms:** PASS. At `DETAIL_ACTIVE`, Card 0 uniforms satisfied `u_sheetP < 0.01`, `u_white > 0.99`, `u_shade < 0.01`, and `u_scrim < 0.01` (lines 333–349).
3. **Neighbor Cards Fade-out:** PASS. Cards 1, 2, and 3 reached `u_alpha < 0.01` (lines 351–370).
4. **Detail Panel DOM Visibility & Content:** PASS. Locator `[data-work-detail-panel]` became visible, `opacity > 0`, `aria-hidden="false"`, and text matched `/evo\s*[-]?\s*money/i` (lines 373–391).
5. **Header Theme Activation:** FAIL. `waitForFunction` timed out waiting for `--header-bg: #faf9f6`, `--header-text: #2e2b28`, and `--header-border: #b8b3ac` on `header[data-intro-header]` (lines 394–406).
6. **Scroll Lock:** (Not reached due to assertion 5 timeout).

### 1.4 Code Inspection: DOM Proxy Portaling & Hover Scale Immunity

In `src/components/WorkStage/WorkStage.tsx` (lines 308–387):
```tsx
      {mounted &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            data-work-ribbon-proxies=""
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5vw',
              pointerEvents: 'none',
              zIndex: 105,
              opacity: portalProgress >= 0.95 && activeIndex === null ? 1 : 0,
              visibility: portalProgress >= 0.95 && activeIndex === null ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease-out',
            }}
          >
            {REFERENCE_PROJECTS.map((proj) => (
              <button
                key={proj.slug}
                type="button"
                data-testid={`work-card-proxy-${proj.index}`}
                data-work-card-proxy={proj.index}
                aria-label={`View ${proj.shortName} project details`}
                onClick={() => handleOpenProject(proj.index)}
                onMouseEnter={() => {
                  window.dispatchEvent(
                    new CustomEvent('work-card-hover', { detail: { index: proj.index, hover: 1 } })
                  );
                }}
                ...
```
- The proxies are mounted via `createPortal(..., document.body)`.
- Because `document.body` has no CSS transform applied, the proxies escape the `[data-more-work-rect]` CSS scale transform and are positioned accurately in fixed screen viewport space.
- In Gate 3 diagnostics, Proxy 0 was measured at `x: 61.22, y: 324, width: 302.39, height: 252`, and `document.elementFromPoint` directly resolved `<button data-work-card-proxy="0">` as the hit target with pointer events intact.
- Hovering proxy 0 dispatched `work-card-hover`, and `RibbonCard.tsx` (lines 88–104) successfully tweened `u_hover` to `> 0.95`.
- Wheel events captured in window capture phase increased `scrollVelocity` above `0.05`.

### 1.5 Code Inspection: Header Theme Mechanism and Containing Block Bug

In `clientes/marcionilio-oliveira/site/assets/_astro/headerTheme.BVy9gA6p.js`:
```javascript
function f(t,r,e){
  const n=t.getBoundingClientRect();
  return r>=n.left&&r<n.right&&e>=n.top&&e<n.bottom
}
function R(t,r){
  const e=r.getBoundingClientRect(),
        n=e.left+e.width/2,
        a=e.top+e.height/2,
        d=t.find(o=>o.hasAttribute("data-work-detail-panel")&&!c(o)&&f(o,n,a));
  if(d)return d;
  ...
```
- The desktop header rail is fixed at `x: 0..64px`, `y: 0..900px`, with its geometric center at `(n = 32, a = 450)`.
- `R(t, r)` evaluates whether any active section or panel physically encloses `(n, a)`.
- In `clientes/marcionilio-oliveira/site/index.html` (line 331):
```html
</p> </div> </section> <div id="work-detail-panel-root" data-work-detail-panel="" data-header-bg="#faf9f6" data-header-text="#2e2b28" data-header-border="#b8b3ac" aria-hidden="true" style="position: fixed; inset: 0; left: 0; top: 0; width: 100vw; height: 100vh; z-index: 120; pointer-events: none; opacity: 0; transition: opacity 0.4s ease-out;"></div> <section ...
```
- `work-detail-panel-root` was placed inside `<div data-horizontal-track class="flex w-full flex-col md:h-dvh md:flex-row md:flex-nowrap">`.
- When the user scrolls to portal progress 1.0, GSAP horizontal scroll applies `transform: matrix(1, 0, 0, 1, -3840, 0)` to `data-horizontal-track`.
- Per the W3C CSS Transforms Module Level 1 specification, any ancestor with a `transform` property other than `none` creates a new containing block for `position: fixed` descendants.
- Runtime diagnostic evaluation in Playwright revealed:
```json
"panelRect": {
  "x": -3840.00048828125,
  "y": 0,
  "width": 1440,
  "height": 900,
  "top": 0,
  "right": -2400.00048828125,
  "bottom": 900,
  "left": -3840.00048828125
}
```
- Because `panelRect.left` is `-3840px` and `panelRect.right` is `-2400px`, `f(o, 32, 450)` evaluates `32 >= -3840 && 32 < -2400`, which is strictly `false`.
- The detail panel is offscreen to the left, so `R(t, r)` never matches it, and `--header-bg: #faf9f6` is never applied to the header.

---

## 2. Logic Chain

1. **Gate 3 Verification**:
   - `tests/e2e/work-stage.spec.ts` Gate 3 tests the 3D ribbon state in `RIBBON_BROWSE`:
     1. Telemetry confirms 4 project cards: `['0', '1', '2', '3']` with slugs `['evo-money', 'plant-tag', 'swisshaus', 'betahaus']`.
     2. A wheel scroll impulse increases `window.__WORK_STAGE__.scrollVelocity` beyond `0.05`.
     3. Hovering `[data-work-card-proxy="0"]` triggers `u_hover > 0.95`.
   - Observation 1.1 confirms this entire sequence executed cleanly in 10.8s with exit code 0.
   - Observation 1.4 confirms that because the proxy container is mounted via `createPortal(..., document.body)`, it is completely isolated from the expanding rectangle CSS scale transform.

2. **Gate 4 Flight & Shader Transition**:
   - When proxy button 0 is clicked, `WorkStage.tsx` initiates `handleOpenProject(0)`.
   - `phase` immediately transitions to `DETAIL_FLIGHT`, and `__PHASE_SEQUENCE__` captures this transient state.
   - After the 900ms GSAP tween, `phase` settles to `DETAIL_ACTIVE`.
   - Card 0's GLSL uniforms are tweened via GSAP: `u_sheetP` drops to `< 0.01`, `u_white` rises to `> 0.99`, `u_shade` and `u_scrim` drop to `< 0.01`.
   - Neighbors 1, 2, 3 have their `u_alpha` tweened to `< 0.01`.
   - Observation 1.3 confirms all these phases, GLSL uniforms, and neighbor fades passed within their respective timeouts.

3. **Gate 4 Header Theme Failure Root Cause**:
   - Step 5 in Gate 4 waits for `header[data-intro-header]` to adopt `--header-bg: #faf9f6`, `--header-text: #2e2b28`, `--header-border: #b8b3ac`.
   - Header theme detection is performed by `headerTheme.BVy9gA6p.js`: function `R(t, r)` queries bounding boxes using `f(o, n, a)`.
   - In `index.html`, `<div id="work-detail-panel-root">` is situated inside `<div data-horizontal-track>`, which is transformed by `-3840px` along the X-axis by GSAP ScrollTrigger.
   - Due to the CSS containing block rule for transformed elements, `position: fixed` on `#work-detail-panel-root` computes its bounding rect relative to the translated track, resulting in `x = -3840px`.
   - Because `(32, 450)` does not intersect `[-3840px, -2400px]`, `f(o, 32, 450)` returns `false`.
   - Therefore, `headerTheme.BVy9gA6p.js` never detects the detail panel, and the header styles are never updated.

4. **Proof of Remediation**:
   - In a controlled diagnostic run (`diag.js`), moving `#work-detail-panel-root` from `<div data-horizontal-track>` directly into `document.body` shifted `panelRect.left` from `-3840px` to `0px`.
   - Upon clicking proxy 0, `f(o, 32, 450)` immediately returned `true`.
   - `header.style.getPropertyValue('--header-bg')` changed to `#faf9f6`, `--header-text` changed to `#2e2b28`, and `--header-border` changed to `#b8b3ac`.
   - Assertion 5 passed cleanly.

---

## 3. Caveats

1. **Milestone Boundaries**:
   - Gates 1 and 2 are assigned to `explorer_m3_1`.
   - Gate 5 and full-suite orchestration are assigned to `explorer_m3_3`.
   - This report investigates strictly Gate 3 and Gate 4.
2. **Bundle Recompilation vs HTML Placement**:
   - In `src/components/WorkStage/WorkStage.tsx`, lines 407–476 contain a fallback: if `document.getElementById('work-detail-panel-root')` exists, it portals into that element; if not, it portals into `document.body`.
   - However, in `clientes/marcionilio-oliveira/site/index.html` line 331, `<div id="work-detail-panel-root">` was placed inside `data-horizontal-track`.
   - Moving this element in `index.html` to be a direct child of `<body>` (or adjusting `WorkStage.tsx` to always portal to `document.body`) will permanently fix the issue.

---

## 4. Conclusion

1. **Gate 3 Status**: **PASS** (100% verified, exit code 0).
   - 4 reference projects are present and correct.
   - Wheel scroll impulse drives `scrollVelocity > 0.05`.
   - Tactile DOM proxy button layer correctly portals to `document.body` and is immune to canvas and container transforms.
   - Hover on Card 0 proxy elevates `u_hover > 0.95`.

2. **Gate 4 Status**: **FAIL** (due solely to Assertion 5, header theme activation).
   - Phases `DETAIL_FLIGHT` and `DETAIL_ACTIVE` work flawlessly.
   - Card 0 3D flight to center and uncurling (`u_sheetP < 0.01`, `u_white > 0.99`) work flawlessly.
   - Neighbor cards fade-out (`u_alpha < 0.01`) works flawlessly.
   - Detail panel DOM element and accessibility attributes work flawlessly.
   - The failure at assertion 5 is mathematically proven to be caused by `<div id="work-detail-panel-root">` being nested inside `<div data-horizontal-track>`, whose `-3840px` CSS transform displaces the fixed detail panel offscreen.

3. **Recommended Remediation Strategy**:
   - In `clientes/marcionilio-oliveira/site/index.html`, move `<div id="work-detail-panel-root" ...></div>` from line 331 (inside `<div data-horizontal-track>`) to be a direct child of `<body>` (e.g. right before `<script src="./assets/_astro/Header..."></script>` or right before `</body>`).
   - Alternatively or additionally, in `src/components/WorkStage/WorkStage.tsx`, ensure `createPortal(..., document.body)` is always used directly for the detail panel, avoiding any transformed containers.

---

## 5. Verification Method

To independently reproduce and verify these findings:

1. **Execute Gate 3**:
   ```powershell
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"
   ```
   *Expected outcome*: 1 passed with exit code 0.

2. **Execute Gate 4**:
   ```powershell
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"
   ```
   *Expected outcome*: Fails at line 394 (`TimeoutError: page.waitForFunction: Timeout 10000ms exceeded`).

3. **Verify Containing Block Transform Displacement**:
   Inspect `panelRect.left` during scroll in `clientes/marcionilio-oliveira/site/index.html`:
   ```powershell
   node .agents/teamwork/explorer_m3_2/diag.js
   ```
   *Expected outcome*: Shows `panelRect.left = -3840px` when inside `data-horizontal-track`, and `panelRect.left = 0px` (with `bg = #faf9f6`) when appended to `document.body`.

4. **Invalidation Conditions**:
   - If Gate 3 fails wheel impulse or hover, this conclusion is invalidated.
   - If moving `work-detail-panel-root` to `document.body` does not cause Gate 4 to pass with exit code 0, this conclusion is invalidated.
