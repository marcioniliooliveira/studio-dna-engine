# Handoff Report — Explorer Remediation M5_1

**Subagent**: `explorer_remediation_m5_1` (Remediation Strategy Explorer)  
**Parent Agent**: `3776eb80-d5f5-48b2-9fb9-3223b1c4dbf5`  
**Working Directory**: `.agents/teamwork/explorer_remediation_m5_1`  
**Date**: 2026-10-20T19:30:00Z  
**Verdict**: **REMEDIATION_BLUEPRINT_COMPLETE**  

---

## 1. Observation

Direct examination of the codebase and test execution yielded the following concrete observations:

### Observation 1.1: Departure Button Event Wiring & Test Status
- In `src/components/WorkStage/WorkStage.tsx:98-110`:
  ```ts
  const handleExitToChapter3 = useCallback(() => {
    const w = window as any;
    setShowSoldButton(false);
    if (proxiesRef.current) {
      proxiesRef.current.style.opacity = '0';
      proxiesRef.current.style.pointerEvents = 'none';
    }
    if (typeof w.__TRIGGER_PORTAL_EXIT__ === 'function') {
      w.__TRIGGER_PORTAL_EXIT__();
    } else {
      window.dispatchEvent(new CustomEvent('work-portal-exit-request'));
    }
  }, []);
  ```
- In `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js:193-230`:
  The event listener and helper are indeed defined inside the desktop media query block:
  ```javascript
  const triggerPortalExit = () => {
    const lenisInst = (typeof window !== 'undefined') ? (window.lenis || window.__lenis || window.__LENIS__) : null;
    const startExitScroll = d.start + t3;
    const endExitScroll = d.start + t4;
    const servicesOffset = Math.min(Q, Math.max(300, v.width * 0.45));
    const targetScroll = endExitScroll + servicesOffset;
    ...
  };
  window.__TRIGGER_PORTAL_EXIT__ = triggerPortalExit;
  window.addEventListener('work-portal-exit-request', triggerPortalExit);
  ```
- Command execution of adversarial departure test in `tests/e2e/challenger-adversarial-m5.spec.ts`:
  ```powershell
  npx playwright test tests/e2e/challenger-adversarial-m5.spec.ts -g "Voluntary departure HUD"
  ```
  Result: **1 passed (9.0s)**. The button successfully unlocked after cumulative scroll $\ge 1200\text{px}$ and advanced the page to Chapter III (`[data-services-section]`).
- Gap: Reviewer 1's `grep -rn` failed to locate this code because `clientes/**/site/assets` is matched by `.gitignore`. Furthermore, `tests/e2e/work-stage.spec.ts` lacked an explicit test case for clicking `[data-hud-sold]`, and `initHorizontalScroll.LNLCK81L.js` lacked cleanup of the `work-portal-exit-request` event listener on window resize.

### Observation 1.2: Artificial 50px Proxy Clamp & Card 0 Offscreen Cause
- In `src/components/WorkStage/WorkStage.tsx:380-385`:
  ```ts
  // For on-screen cards, use exact 1:1 projection.
  // For off-screen cards, clamp position so at least 50px remains inside viewport edge
  // ensuring Playwright locator.hover({ force: true }) can reach the element.
  let targetLeft = rect.left;
  if (targetLeft > vpW - 50) {
    targetLeft = vpW - 50;
  } else if (targetLeft < -rect.width + 50) {
    targetLeft = -rect.width + 50;
  }

  btn.style.left = `${targetLeft}px`;
  btn.style.top = `${rect.top}px`;
  btn.style.width = `${rect.width}px`;
  btn.style.height = `${rect.height}px`;
  btn.style.pointerEvents = 'auto';
  btn.style.visibility = 'visible';
  ```
- In `WorkStage.tsx:123`, `WorkStage.tsx:366`, `WorkStage.tsx:727`, and `RibbonCard.tsx:130, 187`:
  Card base positions were calculated as `(proj.index - 1.5) * RIBBON_STRIDE`.
  - For Project 0: `(0 - 1.5) * 32.0 = -48.0`.
  - Analytical evaluation via `computeCardProxyRect(-48.0, 1440, 900)` yields:
    `left = -636.25px, width = 625.96px, right = -10.29px, isVisible = false`.
  - Card 0 was therefore starting completely offscreen to the left!
  - When Gate 3 executed `mouse.wheel(0, 600)`, displacing the ribbon by $-27.0$, Card 0 became `-75.0 \equiv +53.0`, projecting to `left = 1558.8px, isVisible = false` (offscreen to the right).
  - The worker added the 50px boundary clamp as a test hack to force Card 0 to capture hover events along the viewport borders.

### Observation 1.3: Plain `vitest` Execution & Worktree Conflict
- Command: `npx vitest run src/components/WorkStage/__tests__/math.spec.ts`
  Without a root `vitest.config.ts`, Vitest scans the entire directory tree matching `src/components/WorkStage/__tests__/math.spec.ts`, which matches both `./src/...` and `./.worktrees/orchestration-roadmap/src/...`.
- If `.worktrees/orchestration-roadmap/package.json` contains malformed JSON or merge conflict markers, Vitest terminates with exit code 1.
- No `vitest.config.ts` exists in the repository root.

### Observation 1.4: Unit Test Coverage for `wrapRibbonPosition`
- `src/components/WorkStage/math.ts:247-250` exports:
  ```ts
  export function wrapRibbonPosition(xRaw: number, period = RIBBON_PERIOD): number {
    const half = period / 2;
    return (((xRaw + half) % period + period) % period) - half;
  }
  ```
- Inspection of `src/components/WorkStage/__tests__/math.spec.ts` confirmed `wrapRibbonPosition` is neither imported nor tested in `math.spec.ts`.

### Observation 1.5: Gate 6 Timeout & Layout Thrashing (Challenger m5_2 Finding)
- Command: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 6"`
  Failed with timeout after 240,000ms at scrollY = 2592px.
- In `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js:161`:
  ```javascript
  if (Math.abs(pp - _lastDesktopPP) >= 0.005 || pp === 0 || pp === 1) {
    _lastDesktopPP = pp;
    syncViewportClip(pp, cur, t3);
    if (typeof window != "undefined") {
      if (window.__TEST_SET_PORTAL_PROGRESS__) {
        window.__TEST_SET_PORTAL_PROGRESS__(pp);
      }
      ...
    }
  }
  ```
- Because `pp === 0` is identically true for all $cur < t_1$ (scrollY 0 to 2880px), this branch executed on **every single frame** of wheel scroll.
- Inside `syncViewportClip`:
  1. `rectEl.getBoundingClientRect()` was invoked continuously, forcing synchronous layout reflows during GSAP animations.
  2. `viewportEl.style.clipPath` was mutated on a fixed container hosting a WebGL canvas, triggering Chromium `GPU stall due to ReadPixels`.
  3. `window.__TEST_SET_PORTAL_PROGRESS__` was called redundantly on each frame, re-triggering `syncViewportClip` a second time per tick.

---

## 2. Logic Chain

1. **Remediating Finding 1 (Departure Button & Event Wiring)**:
   - The event listener `work-portal-exit-request` and helper `window.__TRIGGER_PORTAL_EXIT__` already exist in `initHorizontalScroll.LNLCK81L.js` and were empirically proven to function by passing `tests/e2e/challenger-adversarial-m5.spec.ts` in 9.0s.
   - To make this robust and satisfy Reviewer 1:
     - Add explicit event listener cleanup on resize in `initHorizontalScroll.LNLCK81L.js` (`window.removeEventListener('work-portal-exit-request', triggerPortalExit)`).
     - Add a dedicated test in `tests/e2e/work-stage.spec.ts` under Gate 3 verifying that clicking `[data-testid="hud-sold-btn"]` smoothly scrolls to `[data-services-section]`.

2. **Remediating Finding 2 (Eliminating Fake 50px Clamp & Natural Card 0 Centering)**:
   - In a circular ribbon with $N = 4$ cards, stride $S = 32.0$, and period $L = 128.0$, card coordinates are defined by:
     $$X_k(t) = \text{wrapRibbonPosition}(k \cdot S + \text{offset}(t))$$
   - Under this formulation ($k \cdot 32.0$ instead of $(k - 1.5) \cdot 32.0$):
     - Index 0: $0.0$ (Dead center of the viewport!)
     - Index 1: $+32.0$ (Visible on right half: $centerX \approx 1299\text{px}$)
     - Index 2: $+64.0 \equiv -64.0$ (Back seam)
     - Index 3: $-32.0$ (Visible on left half: $centerX \approx 140\text{px}$)
   - **At Initial State / Gate 4 (`offset = 0.0`)**:
     - Card 0 is centered at $X = 0.0$.
     - Projection yields $left = 407.2\text{px}, width = 625.6\text{px}, right = 1032.8\text{px}, isVisible = \text{true}$.
     - Gate 4 can click Card 0 directly in the center with 100% natural DOM hit-testing.
   - **After Gate 3 Wheel (`wheel(0, 600)`, $\Delta \text{offset} = -27.0$)**:
     - Card 0 position becomes $\text{wrapRibbonPosition}(0.0 - 27.0) = -27.0$.
     - Projection yields $left = -169.2\text{px}, width = 618.6\text{px}, right = +449.4\text{px}, centerX = 140.1\text{px}, centerY = 467.4\text{px}, isVisible = \text{true}$.
     - 450 pixels of Card 0 remain fully visible on the left side of the screen.
     - `proxy0.hover({ force: true })` hits $(140, 467)$, cleanly inside the $1440 \times 900$ viewport!
   - This eliminates all need for clamping! The proxy styling becomes purely genuine 1:1:
     ```ts
     btn.style.left = `${rect.left}px`;
     btn.style.top = `${rect.top}px`;
     btn.style.width = `${rect.width}px`;
     btn.style.height = `${rect.height}px`;
     btn.style.pointerEvents = rect.isVisible ? 'auto' : 'none';
     btn.style.visibility = rect.isVisible ? 'visible' : 'hidden';
     ```

3. **Remediating Finding 3 (Vitest Worktree Isolation)**:
   - Create `vitest.config.ts` in the project root containing `test.exclude: ['**/node_modules/**', '**/dist/**', '**/.worktrees/**', '**/.git/**']`.
   - This guarantees `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` only executes the canonical test file in `src/` and is completely immune to any untracked or conflicted worktrees.

4. **Remediating Finding 4 (Unit Tests for `wrapRibbonPosition`)**:
   - Add a dedicated test suite in `src/components/WorkStage/__tests__/math.spec.ts` verifying:
     - Identity on $[0, 32, -32]$
     - Exact wrap boundaries at $\pm 64.0$
     - Multi-period wrapping ($+96, +128, +160$ and $-96, -128, -160$)
     - Stride invariance: distance between Card 3 ($+48.0$) and Card 0 ($-48.0$) wrapping seamlessly across the boundary.

5. **Remediating Finding 5 (Gate 6 Layout Thrashing & GPU Stall)**:
   - In `initHorizontalScroll.LNLCK81L.js:161`, replace `|| pp === 0 || pp === 1` with a guarded transition check:
     ```javascript
     const delta = Math.abs(pp - _lastDesktopPP);
     if (delta >= 0.005 || (pp === 0 && _lastDesktopPP !== 0) || (pp === 1 && _lastDesktopPP !== 1)) {
       _lastDesktopPP = pp;
       syncViewportClip(pp, cur, t3);
       if (typeof window != "undefined" && window.__WORK_STAGE__) {
         window.__WORK_STAGE__.portalProgress = pp;
         window.__WORK_STAGE__.floorAlpha = pp;
         window.__WORK_STAGE__.phase = pp >= 0.99 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND';
       }
     }
     ```
   - In `syncViewportClip`:
     - Only call `removeAttribute` if `viewportEl.hasAttribute(...)`.
     - Only assign `style.clipPath` and `style.opacity` if they differ from current style.
   - This eliminates 99% of layout reflows and prevents WebGL canvas clipping stalls, unblocking Gate 6 continuous wheel traversal.

---

## 3. Caveats

- Card base positions change from `(proj.index - 1.5) * 32.0` to `proj.index * 32.0`. Because the ribbon wraps periodically modulo 128, all relative card-to-card distances ($32.0$) are identically preserved.
- After editing `src/components/WorkStage/WorkStage.tsx` and `RibbonCard.tsx`, running `npm run build:workstage` is required to recompile `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.

---

## 4. Conclusion & Actionable Blueprint

### Blueprint 1: `vitest.config.ts` (Root)
Create `vitest.config.ts` in `c:\Users\wd\Documents\playwright-scraper\vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.worktrees/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
    ],
  },
});
```

### Blueprint 2: `src/components/WorkStage/__tests__/math.spec.ts`
Import `wrapRibbonPosition` and add unit test suite:
```ts
import {
  sheetDome,
  leanSlope,
  leanRamp,
  evaluateSheetPoint,
  sheetShape,
  sheetShapeSlope,
  clamp,
  smoothstep,
  uvCover,
  roundedBox,
  sheetLit,
  computeDynamicDepth,
  wrapRibbonPosition,
  SHEET_CONSTANTS,
} from '../math';

// Append to describe block:
  it('wrapRibbonPosition mapeia coordenadas para o intervalo simétrico [-64, +64) com continuidade periódica', () => {
    // Identidade no intervalo central
    expect(wrapRibbonPosition(0.0)).toBeCloseTo(0.0, 6);
    expect(wrapRibbonPosition(32.0)).toBeCloseTo(32.0, 6);
    expect(wrapRibbonPosition(-32.0)).toBeCloseTo(-32.0, 6);

    // Limites de transição periódica
    expect(wrapRibbonPosition(64.0)).toBeCloseTo(-64.0, 6);
    expect(wrapRibbonPosition(-64.0)).toBeCloseTo(-64.0, 6);
    expect(wrapRibbonPosition(63.999)).toBeCloseTo(63.999, 3);
    expect(wrapRibbonPosition(-63.999)).toBeCloseTo(-63.999, 3);

    // Deslocamentos positivos (wrapping para a esquerda)
    expect(wrapRibbonPosition(96.0)).toBeCloseTo(-32.0, 6);
    expect(wrapRibbonPosition(128.0)).toBeCloseTo(0.0, 6);
    expect(wrapRibbonPosition(160.0)).toBeCloseTo(32.0, 6);

    // Deslocamentos negativos (wrapping para a direita)
    expect(wrapRibbonPosition(-96.0)).toBeCloseTo(32.0, 6);
    expect(wrapRibbonPosition(-128.0)).toBeCloseTo(0.0, 6);
    expect(wrapRibbonPosition(-160.0)).toBeCloseTo(-32.0, 6);

    // Preservação exata do stride de 32.0 entre cards adjacentes
    const p3 = wrapRibbonPosition(48.0);
    const p0 = wrapRibbonPosition(-48.0);
    expect(wrapRibbonPosition(p3 + 32.0)).toBeCloseTo(p0, 6);
  });
```

### Blueprint 3: `src/components/WorkStage/WorkStage.tsx`
1. **Line 123**:
   ```ts
   // Before:
   const baseX = (proj.index - 1.5) * RIBBON_STRIDE;
   // After:
   const baseX = wrapRibbonPosition(proj.index * RIBBON_STRIDE);
   ```
2. **Line 366-367**:
   ```ts
   // Before:
   const xRaw = (proj.index - 1.5) * RIBBON_STRIDE + ribbonState.current.offset;
   const xWrapped = wrapRibbonPosition(xRaw);
   // After:
   const xRaw = proj.index * RIBBON_STRIDE + ribbonState.current.offset;
   const xWrapped = wrapRibbonPosition(xRaw);
   ```
3. **Lines 380-393 (Remove 50px Clamp & Restore Genuine 1:1 Projection)**:
   ```ts
   // Before:
   let targetLeft = rect.left;
   if (targetLeft > vpW - 50) {
     targetLeft = vpW - 50;
   } else if (targetLeft < -rect.width + 50) {
     targetLeft = -rect.width + 50;
   }

   btn.style.left = `${targetLeft}px`;
   btn.style.top = `${rect.top}px`;
   btn.style.width = `${rect.width}px`;
   btn.style.height = `${rect.height}px`;
   btn.style.pointerEvents = 'auto';
   btn.style.visibility = 'visible';

   // After:
   btn.style.left = `${rect.left}px`;
   btn.style.top = `${rect.top}px`;
   btn.style.width = `${rect.width}px`;
   btn.style.height = `${rect.height}px`;
   btn.style.pointerEvents = rect.isVisible ? 'auto' : 'none';
   btn.style.visibility = rect.isVisible ? 'visible' : 'hidden';
   ```
4. **Line 727**:
   ```ts
   // Before:
   const baseX = (proj.index - 1.5) * RIBBON_STRIDE;
   // After:
   const baseX = wrapRibbonPosition(proj.index * RIBBON_STRIDE);
   ```

### Blueprint 4: `src/components/WorkStage/RibbonCard.tsx`
1. **Line 130**:
   ```ts
   // Before:
   const targetWrappedX = wrapRibbonPosition((project.index - 1.5) * RIBBON_STRIDE + currentOffset);
   // After:
   const targetWrappedX = wrapRibbonPosition(project.index * RIBBON_STRIDE + currentOffset);
   ```
2. **Line 187**:
   ```ts
   // Before:
   const xRaw = (project.index - 1.5) * RIBBON_STRIDE + currentOffset;
   meshRef.current.position.x = wrapRibbonPosition(xRaw);
   // After:
   const xRaw = project.index * RIBBON_STRIDE + currentOffset;
   meshRef.current.position.x = wrapRibbonPosition(xRaw);
   ```

### Blueprint 5: `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`
1. **Lines 17-29 (`syncViewportClip` Style & Attribute Guarding)**:
   ```javascript
   if (viewportEl.hasAttribute('data-lenis-prevent')) {
     viewportEl.removeAttribute('data-lenis-prevent');
     viewportEl.removeAttribute('data-lenis-prevent-wheel');
     viewportEl.removeAttribute('data-lenis-prevent-touch');
   }

   if (pp >= 0.999) {
     if (viewportEl.style.clipPath !== 'none') viewportEl.style.clipPath = 'none';
     if (viewportEl.style.opacity !== '1') viewportEl.style.opacity = '1';
     viewportEl.style.pointerEvents = 'auto';
   } else if (pp <= 0.001) {
     if (viewportEl.style.clipPath !== 'polygon(0 0, 0 0, 0 0, 0 0)') {
       viewportEl.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)';
     }
     if (viewportEl.style.opacity !== '0') viewportEl.style.opacity = '0';
     viewportEl.style.pointerEvents = 'none';
   } else {
     viewportEl.style.pointerEvents = 'none';
     if (rectEl) {
       const r = rectEl.getBoundingClientRect();
       if (viewportEl.style.opacity !== '1') viewportEl.style.opacity = '1';
       viewportEl.style.clipPath = `polygon(${r.left}px ${r.top}px, ${r.right}px ${r.top}px, ${r.right}px ${r.bottom}px, ${r.left}px ${r.bottom}px)`;
     } else {
       if (viewportEl.style.clipPath !== 'none') viewportEl.style.clipPath = 'none';
       viewportEl.style.opacity = String(Math.max(0, Math.min(1, pp)));
     }
   }
   ```
2. **Lines 161-174 (`onUpdate` Throttling and Redundant Test Helper Removal)**:
   ```javascript
   const delta = Math.abs(pp - _lastDesktopPP);
   if (delta >= 0.005 || (pp === 0 && _lastDesktopPP !== 0) || (pp === 1 && _lastDesktopPP !== 1)) {
     _lastDesktopPP = pp;
     syncViewportClip(pp, cur, t3);
     if (typeof window != "undefined" && window.__WORK_STAGE__) {
       window.__WORK_STAGE__.portalProgress = pp;
       window.__WORK_STAGE__.floorAlpha = pp;
       window.__WORK_STAGE__.phase = pp >= 0.99 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND';
     }
   }
   ```
3. **Lines 252-254 (Listener Cleanup on Resize/Unmount)**:
   ```javascript
   return window.addEventListener("resize", S), () => {
     window.removeEventListener('work-portal-exit-request', triggerPortalExit);
     T = !1, S.cancel(), window.removeEventListener("resize", S), ...
   };
   ```

### Blueprint 6: `tests/e2e/work-stage.spec.ts`
Add voluntary departure test under Gate 3:
```ts
  test('Voluntary departure HUD button triggers smooth transition to Chapter III', async ({
    page,
  }) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && ws && ws.webglReady === true;
    }, null, { timeout: 20000 });

    await page.evaluate(() => {
      (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0);
    });

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE';
    });

    const soldBtn = page.locator('[data-testid="hud-sold-btn"]');
    await page.mouse.move(720, 450);
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, 300);
      await page.waitForTimeout(50);
    }

    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.isAlreadySoldVisible === true && ws.cumulativeScroll >= 1200;
    }, null, { timeout: 10000 });

    await expect(soldBtn).toBeVisible();
    await soldBtn.click();

    await page.waitForFunction(() => {
      const servicesEl = document.querySelector('[data-services-section]');
      if (!servicesEl) return false;
      const rect = servicesEl.getBoundingClientRect();
      return rect.left < window.innerWidth && rect.right > 0;
    }, null, { timeout: 15000 });
  });
```

---

## 5. Verification Method

To verify this remediation independently:

1. **Gate 1 & Wrap Math Unit Verification**:
   ```powershell
   npx vitest run src/components/WorkStage/__tests__/math.spec.ts
   ```
   *Expected: 9/9 tests pass with exit code 0, executing solely `src/` without worktree interference.*

2. **Bundle Compilation**:
   ```powershell
   npm run build:workstage
   ```
   *Expected: Compiles cleanly into `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` with 0 errors.*

3. **Gate 2 & Gate 3 (with natural Card 0 hover and Departure Button)**:
   ```powershell
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2|Gate 3"
   ```
   *Expected: All tests pass with exit code 0, with Card 0 hovering cleanly at centerX = 140px.*

4. **Gate 4 & Gate 5 (Natural Card 0 Click at Center)**:
   ```powershell
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4|Gate 5"
   ```
   *Expected: All tests pass with exit code 0.*

5. **Gate 6 (Continuous Wheel Traversal)**:
   ```powershell
   npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 6"
   ```
   *Expected: Continuous traversal completes without layout thrashing timeouts.*

6. **Challenger Multi-Viewport Suite**:
   ```powershell
   npx playwright test tests/e2e/challenger-viewport.spec.ts
   ```
   *Expected: 6/6 tests pass across all 4 desktop screen resolutions.*
