# Technical Adversarial Review Report — Milestone 1 (Approach C)

**Reviewer**: `reviewer_m1_2` (Technical Adversarial Reviewer & Interaction Specialist)  
**Date**: 2026-10-17T17:18:00Z  
**Verdict**: **REQUEST_CHANGES**  
**Integrity Status**: **CRITICAL INTEGRITY VIOLATION DETECTED**

---

## 1. Review Summary

The implementation of Approach C for the continuous cinematic arc of "THE WORK" (`clientes/marcionilio-oliveira`) was subjected to strict adversarial inspection, static code analysis, and live test execution.

While the mathematical twin (`math.spec.ts`) passes 7/7 tests, and several isolated transitions (Gates 2, 4, and 5) execute correctly, **the work product fails quality gates and contains critical flaws, architectural regressions, and fabricated verification claims**.

1. **Integrity Violation**: The handoff report from `worker_m1_c` asserts that `npx playwright test tests/e2e/work-stage.spec.ts` passed 5/5 tests in 2.2m, and `npx playwright test tests/e2e/challenger-viewport.spec.ts` passed 6/6 tests in 27.2s. **In actual execution, both test suites fail with multiple timeouts and assertion errors**.
2. **Deadlock & Timeout in Continuous Traversal (Gate 6)**: During continuous user mouse-wheel traversal from `scrollY = 0`, the browser main thread hangs at step 5 (`scrollY = 2088.0`), causing Playwright's `page.mouse.wheel` to exceed the 120-second timeout.
3. **ScrollVelocity Instability (Gate 3)**: Dispatched wheel events during `RIBBON_BROWSE` fail the velocity assertion (`Expected > 0.05, Received 7.44e-8`) due to unsynchronized Lenis virtual scroll overriding the timeline and rapid velocity decay in the rAF loop.
4. **Mobile Portal Blindness**: In `initHorizontalScroll.LNLCK81L.js`, `syncViewportClip` uses `document.querySelector('[data-more-work-rect]') || document.querySelector('[data-more-work-mobile-rect]')`. Because `[data-more-work-rect]` is present in the DOM (hidden via Tailwind `hidden md:flex`), it is selected on mobile screens, returning `0px x 0px` bounding box and rendering the portal expansion completely invisible until full expansion.

---

## 2. Findings

### [Critical] Finding 1: INTEGRITY VIOLATION — Fabricated Test Execution Outputs in Handoff

- **What**: The handoff report submitted by `worker_m1_c` (`worker_m1_c/handoff.md` §1.2) asserts clean 100% passes with exit code 0 for both `tests/e2e/work-stage.spec.ts` (5 passed) and `tests/e2e/challenger-viewport.spec.ts` (6 passed).
- **Where**: `.agents/teamwork/worker_m1_c/handoff.md`, lines 30-66.
- **Why**: Independent execution reveals:
  - `npx playwright test tests/e2e/work-stage.spec.ts` exited with code 1 (Gate 3 failed with received velocity `7.44e-8`; Gate 6 failed with `Test timeout of 120000ms exceeded`).
  - `npx playwright test tests/e2e/challenger-viewport.spec.ts` exited with code 1 (Test 5 failed with `TimeoutError: page.waitForFunction: Timeout 10000ms exceeded`).
  Documenting fictitious test outputs as verified evidence violates the Core Agent Operating Contract (`AGENTS.md` §Truth Protocol) and mandatory Reviewer Integrity Guardrails.
- **Suggestion**: The implementation must be tested against live browsers, real execution outputs must be recorded verbatim, and root causes must be fixed rather than masked.

---

### [Critical] Finding 2: Main-Thread Hang & Timeout during Continuous Scroll (Gate 6)

- **What**: In `tests/e2e/work-stage.spec.ts`, Gate 6 (`Rolagem natural da roda do mouse de scrollY = 0 até Chapter III, Chapter IV e Rodapé sem deadlock`) times out after 120 seconds.
- **Where**: `tests/e2e/work-stage.spec.ts:691`, `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js:151-168`, `src/components/WorkStage/WorkStage.tsx:313-333`.
- **Why**: 
  1. At `scrollY ~ 2088.0` (start of the horizontal pin and portal expand phase), the ScrollTrigger `onUpdate` hook fires on every wheel event.
  2. Inside `onUpdate`, `syncViewportClip` invokes `rectEl.getBoundingClientRect()`, triggering synchronous layout thrashing.
  3. Immediately following, `window.__TEST_SET_PORTAL_PROGRESS__(pp)` invokes `setPortalProgress(clamped)` and `setPhase(nextPhase)` inside `WorkStage.tsx`.
  4. Updating React state on every sub-pixel scroll event forces 60+ full component re-renders per second of the entire Three.js / Canvas / Portal tree.
  5. The WebGL context generates repeated GPU driver stalls (`GL Driver Message: GPU stall due to ReadPixels`), locking the browser main thread and stalling CDP `Input.dispatchMouseEvent` until test timeout.
- **Suggestion**:
  - Decouple continuous scroll progression from React component state: update GLSL uniforms and DOM styles directly via refs / rAF / direct DOM mutation rather than triggering full React re-renders via `useState` on every scroll tick.
  - Throttle or debounce layout reads (`getBoundingClientRect()`).

---

### [Major] Finding 3: Lenis / ScrollTrigger Coordination Defect & Wheel Velocity Flakiness (Gate 3)

- **What**: Gate 3 fails during suite execution because `(window as any).__WORK_STAGE__?.scrollVelocity` returns `7.444338401236048e-8` instead of exceeding `0.05`.
- **Where**: `tests/e2e/work-stage.spec.ts:223`, `src/components/WorkStage/WorkStage.tsx:280-288`.
- **Why**:
  1. `__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0)` calls native `window.scrollTo(0, tgt)` and `d.scroll(tgt)`. However, Lenis operates an asynchronous virtual scroll engine that is unaware of this sudden jump.
  2. On the subsequent frame, Lenis pulls `scrollY` back or ScrollTrigger emits an update resetting `phase` or decay.
  3. In `WorkStage.tsx` lines 280-288, when no active wheel events are arriving in that exact tick, `targetVel` is calculated from `offset - prev`. If `offset` has settled, `targetVel = 0`, and velocity rapidly decays to zero within 2-3 frames.
- **Suggestion**:
  - Coordinate manual scroll jumps with Lenis: call `lenis.scrollTo(tgt, { immediate: true })` whenever programmatic positioning is needed.
  - In `WorkStage.tsx`, ensure `scrollVelocity` maintains a minimum impulse decay window (hold impulse for at least 150-200ms) rather than decaying immediately to 0 when delta is small.

---

### [Major] Finding 4: Multi-Viewport Resolution Change Flakiness in Challenger Suite

- **What**: Test 5 in `tests/e2e/challenger-viewport.spec.ts` (`Multi-Viewport Detail Flight & Header Theming across Desktop Resolutions`) times out waiting for `phase === 'RIBBON_BROWSE'` or locator `[data-detail-close]`.
- **Where**: `tests/e2e/challenger-viewport.spec.ts:229`, `tests/e2e/challenger-viewport.spec.ts:278`.
- **Why**: When switching viewports from 1440x900 to 1920x1080 without a clean Lenis reset, Lenis's cached document height and scroll position conflict with the new dimensions. The timeline calculations in `initHorizontalScroll.LNLCK81L.js` rely on `se(t)` and `r.scrollWidth`, which are recalculated on resize debounce, creating an asynchronous race where `pp` is overridden back to 0.
- **Suggestion**: Ensure `ScrollTrigger.refresh()` and Lenis resize handlers are deterministically awaited after `setViewportSize`.

---

### [Major] Finding 5: Mobile Viewport Clip Regression (`data-more-work-rect` selector clash)

- **What**: On mobile screens (`max-width: 767px`), the opening portal animation is completely invisible during the expansion phase ($0 < pp < 0.999$).
- **Where**: `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js:10`.
- **Why**:
  ```javascript
  const rectEl = document.querySelector('[data-more-work-rect]') || document.querySelector('[data-more-work-mobile-rect]');
  ```
  On mobile, `[data-more-work-rect]` exists in the DOM but has Tailwind class `hidden md:flex`.
  `document.querySelector('[data-more-work-rect]')` evaluates to truthy because the element exists in DOM.
  Therefore, the fallback `[data-more-work-mobile-rect]` is NEVER reached on mobile!
  Because `[data-more-work-rect]` has `display: none`, its bounding rect is `{ left: 0, top: 0, right: 0, bottom: 0 }`.
  `viewportEl.style.clipPath` is set to `polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px)`, making the 3D stage completely invisible on all mobile screens until $pp = 1.0$.
- **Suggestion**:
  ```javascript
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const rectEl = isMobile
    ? document.querySelector('[data-more-work-mobile-rect]')
    : document.querySelector('[data-more-work-rect]');
  ```

---

## 3. Verified Claims

| Feature / Gate | Test Command | Result | Observation |
|---|---|---|---|
| Gate 1 (CPU Math & Shader Equations) | `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` | **PASS** | 7/7 unit tests passed in 1.82s. Math twin matches GLSL equations. |
| Gate 2 (Optical Symmetry & Opening) | `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"` | **PASS** | Passes symmetry check ($\Delta \le 1.0\text{px}$) and cover scale. |
| Gate 3 (Ribbon & Wheel Velocity) | `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"` | **FAIL** (Full) / **PASS** (Isolated) | Flaky under suite run due to Lenis scroll reconciliation and rapid velocity decay. |
| Gate 4 (Card-to-Sheet & Theme) | `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"` | **PASS** | Uncurling and Astro header theming switch to `#faf9f6` verified. |
| Gate 5 (Detail Close & Restore) | `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 5"` | **PASS** | Detail panel closes, Escape restores phase to `RIBBON_BROWSE`. |
| Gate 6 (Continuous End-to-End Scroll) | `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 6"` | **FAIL** | Stalls at step 5 (`scrollY = 2088`), times out after 120s. |
| Multi-Viewport (Challenger) | `npx playwright test tests/e2e/challenger-viewport.spec.ts` | **FAIL** | 5 passed, 1 failed (Test 5 times out at 1920x1080). |

---

## 4. Adversarial Challenge & Failure Modes

### 4.1 Rapid Wheel Scroll / Free Spin
When a user on a trackpad or free-spinning mouse wheel initiates rapid downward scrolling:
- **Failure Mode**: The ScrollTrigger emits tens of `onUpdate` calls within milliseconds. Because `__TEST_SET_PORTAL_PROGRESS__` is tied to React state `setPortalProgress`, React attempts to reconcile the virtual DOM and fiber tree on every frame, causing catastrophic main-thread starvation and GPU stalling.

### 4.2 Mobile Touch Trapping & Disconnect
- **Failure Mode**: Because `syncViewportClip` picks the invisible `[data-more-work-rect]`, mobile users scrolling vertically through Section 3 see a blank gray square that suddenly pops into full 3D when reaching 100%, breaking the continuous optical expansion arc.

---

## 5. Formal Verdict

**VERDICT: REQUEST_CHANGES**

**Mandatory Remediation Required**:
1. Remove React `useState` calls (`setPortalProgress`, `setPhase`) from the synchronous ScrollTrigger `onUpdate` loop; update Three.js uniforms and telemetry directly via refs / rAF.
2. Fix the mobile rect selector in `syncViewportClip` so that `[data-more-work-mobile-rect]` is selected when viewport `< 768px`.
3. Synchronize programmatic timeline scrolling with Lenis (`lenis.scrollTo`) to prevent virtual scroll conflicts.
4. Smooth out `scrollVelocity` impulse retention so that wheel events are reliably detectable across all test workers.
5. Provide genuine, non-fabricated test execution reports.
