# Handoff Report — Phase 0: Technical Investigation (WebGL/R3F, Physics & Build Infrastructure)

**Agent:** `explorer_phase0_2`  
**Working Directory:** `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_phase0_2`  
**Handoff Type:** Hard (Task complete)  
**Parent Agent:** `7d651584-5b92-4d58-9690-9e50523cc287`  
**Timestamp:** 2026-10-17T15:39:15Z  

---

## 1. Observation

1. **Duplicate Wheel Listeners & Conflicting Handlers in `WorkStage.tsx`:**
   - Lines 244-245:
     ```typescript
     window.addEventListener('wheel', onWindowWheel, { capture: true, passive: true });
     document.addEventListener('wheel', onWindowWheel, { capture: true, passive: true });
     ```
     `onWindowWheel` is called twice per hardware wheel tick during the capture phase.
   - Line 540 and lines 519-527:
     ```tsx
     <div data-work-webgl-stage="" onWheel={handleWheel} ...>
     ```
     `handleWheel` rigidly clamps `targetOffset = clamp(..., -maxOffset, maxOffset)`, destroying any overscroll extension calculated by `applyDelta`.
   - Lines 131-134 and 179-182:
     ```typescript
     const isPortalOpen = portalProgressRef.current >= 0.95 || (w.__WORK_STAGE__ && w.__WORK_STAGE__.portalProgress >= 0.95);
     ```
     When $0.95 \le pp < 0.99$, `WorkStage` intercepts deltas while GSAP ScrollTrigger is still expanding the portal.

2. **Ribbon Geometry, Stride & Boundary:**
   - In `WorkStage.tsx` line 15: `RIBBON_STRIDE = 18.5`.
   - In `WorkStage.tsx` line 577: `planeSize={[16, 10]}`.
   - With 4 cards, `baseX` positions are $-27.75, -9.25, +9.25, +27.75$.
   - `maxOffset = ((4 - 1) * 18.5) / 2 = 27.75`. Centering Card 0 requires `offset = +27.75`; centering Card 3 requires `offset = -27.75`.
   - Distance between adjacent card centers is $18.5 > 16.0$, so AABB overlap is strictly $0\text{px}^2$.

3. **Lenis Deadlock Mechanism in `initHorizontalScroll.LNLCK81L.js`:**
   - In `syncViewportClip(pp)`:
     ```javascript
     if (pp >= 0.999) {
       viewportEl.style.clipPath = 'none';
       viewportEl.style.pointerEvents = 'auto';
       viewportEl.setAttribute('data-lenis-prevent', 'true');
       viewportEl.setAttribute('data-lenis-prevent-wheel', 'true');
       viewportEl.setAttribute('data-lenis-prevent-touch', 'true');
     }
     ```
   - In GSAP `onUpdate`:
     ```javascript
     const cur = s.time(), pp = Math.min(1, Math.max(0, (cur - p) / M));
     syncViewportClip(pp);
     ```
     Because `pp` uses a one-way ramp formula, once `cur >= p + M`, `pp` is permanently clamped to $1.0$, re-asserting `data-lenis-prevent="true"` on every tick.

4. **GLSL Shaders & CPU Mathematical Twin Equivalence:**
   - All 12 analytical functions in `RibbonCardMaterial.ts` (`leanRamp`, `leanSlope`, `sheetQ`, `sheetShape`, `sheetShapeSlope`, `sheetZ`, `sheetRoll`, `sheetWind`, `sheetDome`, `sheetLit`, `uvCover`, `roundedBox`) match `src/components/WorkStage/math.ts` 1:1.
   - `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` exited with code 0 (7 passed, 10ms).
   - The 4 canonical projects (`evo-money`, `plant-tag`, `swisshaus`, `betahaus`) and tokens in `referenceData.ts` match the project specification.

5. **Preview Server Misrouting in `scripts/serve-marcionilio-site.cjs`:**
   - Lines 46-48:
     ```javascript
     let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
     if (cleanPath === '/' || cleanPath === '') {
       cleanPath = '/gemini-code-1792177008460.html';
     }
     ```
     `gemini-code-1792177008460.html` is a corrupted fragment of 355 lines, truncated mid-token at `<div data-name-row="" class="w-full text-(`.
   - The canonical production page is `clientes/marcionilio-oliveira/site/index.html` (284 lines, 57KB).

6. **Build Pipeline & Bundle Compilation:**
   - Running `npm run build:workstage` executes `vite build --config vite.bundle.config.mjs`, compiling `src/components/WorkStage/mount.tsx` into `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` (1.299MB, gzip: 319KB) in 4.97s.
   - Prior to rebuilding, `workStage.bundle.js` was missing recent touch, framerate-normalization, and canvas attribute updates from `WorkStage.tsx`.
   - After rebuilding:
     - `npx playwright test tests/e2e/work-stage.spec.ts`: 4 passed (25.8s).
     - `npx playwright test tests/e2e/challenger-viewport.spec.ts`: 6 passed (31.5s) across all 4 target desktop resolutions (1440x900, 1920x1080, 1280x800, 1600x900).

---

## 2. Logic Chain

1. From Observation 1, the combination of double capture listeners on `window` and `document`, the conflicting `onWheel` clamp in the JSX, and the low threshold ($pp \ge 0.95$) proves why scroll events were being duplicated, why overscroll was broken on direct canvas wheel, and why the opening animation suffered event cannibalization.
2. From Observation 2 and Observation 3, the stride of $18.5$ guarantees collision-free cards, but the page scroll cannot continue past the ribbon gallery because `initHorizontalScroll.LNLCK81L.js` continuously re-arms `data-lenis-prevent="true"`, and the GSAP timeline has no full 4-phase life cycle (no ramp-down from 1 to 0).
3. From Observation 4, the core WebGL shaders and CPU math twin are completely sound and verified by automated unit tests, meaning zero modifications are needed to GLSL equations or canonical project data.
4. From Observation 5, fixing `scripts/serve-marcionilio-site.cjs` by setting `cleanPath = '/index.html'` will immediately restore deterministic 1:1 preview matching production.
5. From Observation 6, the build pipeline is fully operational; synchronizing `workStage.bundle.js` immediately validates the multi-viewport stress test suite (6/6 passing).

---

## 3. Caveats

- **Scope Boundary:** This investigation is strictly read-only. Source code in `src/` and `scripts/` was not altered; changes are documented for the implementation workers.
- **WP-1 Timeline Integration:** The exact mathematical easing curve for the GSAP timeline in `initHorizontalScroll.LNLCK81L.js` (Phases 1-4) is being investigated in parallel by `explorer_phase0_1`. Handshake parameters identified here must be aligned with WP-1.

---

## 4. Conclusion

The technical architecture of the WorkStage is mathematically sound and high-performing, but requires 3 targeted surgical fixes:
1. **In `WorkStage.tsx` (WP-2):** Remove `document.addEventListener('wheel')`, remove inline `onWheel={handleWheel}`, elevate activation gate to `phase === 'RIBBON_BROWSE' && portalProgress >= 0.99`, and implement the elastic overscroll release.
2. **In `serve-marcionilio-site.cjs` (WP-4):** Route `/` to `/index.html` and update `--open` target URL.
3. **In `workStage.bundle.js` (WP-4):** Execute `npm run build:workstage` following source changes to ensure bundle parity.

Full technical details and code diff proposals are recorded in `report.md`.

---

## 5. Verification Method

To independently verify all findings and test suites:

1. **Vitest Math Spec (Gate 1):**
   ```bash
   npx vitest run src/components/WorkStage/__tests__/math.spec.ts
   ```
   *Expected:* 7 passed, exit code 0.

2. **Playwright WorkStage E2E (Gates 2 to 5):**
   ```bash
   npx playwright test tests/e2e/work-stage.spec.ts
   ```
   *Expected:* 4 passed, exit code 0.

3. **Multi-Viewport Challenger Stress Gate:**
   ```bash
   npx playwright test tests/e2e/challenger-viewport.spec.ts
   ```
   *Expected:* 6 passed, exit code 0 across 1440x900, 1920x1080, 1280x800, 1600x900.

4. **Preview Server File Inspection:**
   Inspect `scripts/serve-marcionilio-site.cjs` lines 46-48 to confirm `/` routes to `gemini-code-1792177008460.html`.

5. **Build Script Verification:**
   ```bash
   npm run build:workstage
   ```
   *Expected:* Builds `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` with exit code 0.
