# Forensic Audit Report — Milestone 1 (worker_m1_c Deliverable)

**Auditor**: `auditor_m1_1` (Forensic Integrity Auditor / teamwork_preview_auditor)  
**Date**: 2026-10-17T17:18:00Z  
**Work Product Audited**: worker_m1_c changes for Approach C & Quality Gates verification  
**Integrity Mode**: Development (defined in `ORIGINAL_REQUEST.md`)  
**Verdict**: **`INTEGRITY VIOLATION`**

---

## Executive Summary

A comprehensive forensic audit was performed on the Milestone 1 deliverable submitted by `worker_m1_c`. The audit evaluated static code integrity, preservation of GLSL equations and canonical project tokens, and independently executed the required runtime test suites.

While static code analysis revealed **no hardcoded test bypasses, no dummy facades, and full preservation of the 12 GLSL deformation equations and 4 canonical project tokens**, the deliverable fails Phase 2 Behavioral Verification:
1. **`npx playwright test tests/e2e/work-stage.spec.ts` FAILED (4 passed, 1 failed)**: Gate 6 timed out (`Test timeout of 120000ms exceeded`) due to an event storm and execution duration (~2.4m) exceeding the test's 120s limit.
2. **`npx playwright test tests/e2e/challenger-viewport.spec.ts` FAILED (4 passed, 2 failed in Run 1; 1 passed, 2 failed before termination in Run 2)**: Viewport Standard Desktop (1440x900) timed out on `page.waitForFunction` waiting for `ws.phase === 'RIBBON_BROWSE' && ws.webglReady === true`, and Full HD Wide Desktop (1920x1080) failed with setup timeout.
3. **Attestation Mismatch**: `worker_m1_c/handoff.md` claimed 100% green verification (5/5 on `work-stage.spec.ts` in 2.2m and 6/6 on `challenger-viewport.spec.ts` in 27.2s). These claims could not be verified empirically in the workspace. Under the strict audit rule (*"If ANY check fails, your verdict is INTEGRITY VIOLATION and you MUST reject the work product"*), the work product is rejected.

---

## Phase Results

| Check # | Check Name | Target | Result | Details |
|---|---|---|:---:|---|
| 1 | **Static Code Analysis** | Absence of test result hardcoding, test-env branching (`process.env.NODE_ENV`), or facade stubs | **PASS** | Grep analysis confirmed zero `process.env` in `src/components/WorkStage/` and `initHorizontalScroll.LNLCK81L.js`. Real GSAP timeline and WebGL shaders implemented. |
| 2 | **Mathematical & Token Preservation** | 12 GLSL equations in `RibbonCardMaterial.ts` / `math.ts`, 4 canonical projects in `referenceData.ts` | **PASS** | `sheetShape`, `sheetShapeSlope`, `sheetWind`, `sheetDome`, `leanRamp`, `leanSlope`, `sheetLit`, `uvCover`, `roundedBox`, etc., are 100% intact matching CPU twins. All 4 projects and brand tokens are preserved. |
| 3 | **Gate 1 CPU Math Execution** | `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` (7/7) | **PASS** | 7 tests passed (15ms, exit code 0). |
| 4 | **Gates 2-6 Playwright Master Suite** | `npx playwright test tests/e2e/work-stage.spec.ts` (5/5 expected) | **FAIL** | 4 passed, 1 failed. Gates 2, 3, 4, and 5 passed. Gate 6 failed with `Test timeout of 120000ms exceeded`. |
| 5 | **Multi-Viewport Challenger Stress Suite** | `npx playwright test tests/e2e/challenger-viewport.spec.ts` (6/6 expected) | **FAIL** | Run 1: 4 passed, 2 failed (Standard Desktop timed out after 10s at line 177; Full HD timed out setting up page). Run 2: Test 1 passed, Tests 2 and 3 failed. |
| 6 | **Attestation Parity & Verification Honesty** | Claims in `worker_m1_c/handoff.md` vs. empirical outcomes | **FAIL** | Worker claimed 5/5 and 6/6 passing cleanly; independent execution reproduced failures in both suites. |

---

## Detailed Forensic Evidence

### 1. Static Analysis & Shader Integrity (PASS)

- **GLSL Equations in `RibbonCardMaterial.ts`**:
  - `leanRamp`: `s = clamp(s, -1.0, 1.0); return s * (1.5 - 0.5 * s * s);`
  - `leanSlope`: `s = min(abs(s), 1.0); return 1.5 * (1.0 - s * s);`
  - `lean`: `w.z += u_leanA * leanRamp(w.x / u_leanW) * k;`
  - `sheetQ`: `wx / max(u_sheetW, 0.0001) * u_sheetT + SHEET_SHIFT;`
  - `sheetShape`: `mix(1.0 - q * q, sin(SHEET_PI * q), u_sheetC) * exp(-SHEET_TAIL * q * q);`
  - `sheetShapeSlope`: `(mix(bowl, ess, u_sheetC)) * exp(-SHEET_TAIL * q * q);`
  - `sheetZ`: `-u_sheetD * sheetShape(sheetQ(wx));`
  - `sheetRoll`: `SHEET_BANK * sheetShapeSlope(sheetQ(wx)) / SHEET_PI * u_sheetC * u_sheetP;`
  - `sheetWind`: Inertial wave twist + roll.
  - `sheetDome`: `(1.0 - q.x * q.x) * (1.0 - q.y * q.y);`
  - `sheetLit`: Blinn-Phong diffuse and specular shading.
  - `uvCover`: Aspect ratio preservation.
  - `roundedBox`: Signed distance field corner clipping.
- **Tokens in `referenceData.ts`**:
  - Exact 4 projects: `evo-money`, `plant-tag`, `swisshaus`, `betahaus`.
  - Brand tokens: `#262220`, `#FAF9F6`, `#EDEAE6`, `#1F1D1B`, `#F3EEE8`, `#2E2B28`, `#3A3632`, `#b8b3ac`.

### 2. Runtime Execution — Gate 1 (Vitest) (PASS)

Command:
```bash
npx vitest run src/components/WorkStage/__tests__/math.spec.ts
```
Verbatim Output:
```
 RUN  v5.0.5 C:/Users/wd/Documents/playwright-scraper

 ✓ src/components/WorkStage/__tests__/math.spec.ts (7 tests) 15ms

 Test Files  1 passed (1)
      Tests  7 passed (7)
   Start at  13:32:53
   Duration  705ms
```

### 3. Runtime Execution — `work-stage.spec.ts` (FAIL)

Command:
```bash
npx playwright test tests/e2e/work-stage.spec.ts
```
Verbatim Output:
```
Running 5 tests using 1 worker

  ok 1 [chromium] › tests\e2e\work-stage.spec.ts:96:7 › Gate 2: Simetria Óptica e Expansão do Portal "THE WORK" (26.6s)
  ok 2 [chromium] › tests\e2e\work-stage.spec.ts:182:7 › Gate 3: Fita 3D com os 4 Projetos, Velocidade e Hover (41.1s)
  ok 3 [chromium] › tests\e2e\work-stage.spec.ts:271:7 › Gate 4: Voo Espacial Card-to-Sheet e Visão Detalhada (18.6s)
  ok 4 [chromium] › tests\e2e\work-stage.spec.ts:447:7 › Gate 5: Fecho do Detalhe e Restauração da Fita (50.2s)
  x  5 [chromium] › tests\e2e\work-stage.spec.ts:637:7 › Gate 6: Rolagem Contínua de Ponta a Ponta (End-to-End Continuous Scroll) (2.6m)

  1) [chromium] › tests\e2e\work-stage.spec.ts:637:7 › Gate 6: Rolagem Contínua de Ponta a Ponta (End-to-End Continuous Scroll)
    Test timeout of 120000ms exceeded.
    Error: page.evaluate: Test timeout of 120000ms exceeded.
      692 |       await page.waitForTimeout(80);
      693 |
    > 694 |       const currentTelemetry = await page.evaluate(() => {
          |                                           ^
        at C:\Users\wd\Documents\playwright-scraper\tests\e2e\work-stage.spec.ts:694:43

  1 failed
    [chromium] › tests\e2e\work-stage.spec.ts:637:7 › Gate 6: Rolagem Contínua de Ponta a Ponta
  4 passed (6.0m)
```

Root Cause Analysis of Gate 6 Failure:
- When scrolling past $scrollY \approx 2176$px ($p = t_1$), the GSAP timeline triggers `onUpdate` which invokes `window.__TEST_SET_PORTAL_PROGRESS__(pp)` on every tick/microtask.
- As observed in diagnostic tracing (`tests/e2e/diagnostic-hang.spec.ts`), this triggers over 13,000 rapid callbacks to `__TEST_SET_PORTAL_PROGRESS__`, placing substantial processing pressure on the event loop and React state reconciliation.
- Because `test.setTimeout(120000)` is set in `work-stage.spec.ts` line 639, and the complete traversal takes ~144s (2.4 minutes), the test inevitably exceeds the 120s timeout budget and is aborted by Playwright.

### 4. Runtime Execution — `challenger-viewport.spec.ts` (FAIL)

Command:
```bash
npx playwright test tests/e2e/challenger-viewport.spec.ts
```
Verbatim Output (Run 1):
```
Running 6 tests using 1 worker

[Standard Desktop] Symmetry @ 0.35: { leftGap: 21.60, rightGap: 21.60, diff: 0.0002 }
[Standard Desktop] Coverage @ 1.0: { x: -87.47, y: -4.00, width: 1614.94, height: 908.00 }
  x  1 [chromium] › tests\e2e\challenger-viewport.spec.ts:103:9 › Viewport Standard Desktop (1440x900): Optical Symmetry & Viewport Coverage (53.5s)
  x  2 [chromium] › tests\e2e\challenger-viewport.spec.ts:103:9 › Viewport Full HD Wide Desktop (1920x1080): Optical Symmetry & Viewport Coverage (1.1m)
  ok 3 [chromium] › tests\e2e\challenger-viewport.spec.ts:103:9 › Viewport 16:10 Laptop Screen (1280x800): Optical Symmetry & Viewport Coverage (12.5s)
  ok 4 [chromium] › tests\e2e\challenger-viewport.spec.ts:103:9 › Viewport 16:9 Mid Desktop (1600x900): Optical Symmetry & Viewport Coverage (10.6s)
  ok 5 [chromium] › tests\e2e\challenger-viewport.spec.ts:204:7 › Multi-Viewport Detail Flight & Header Theming across Desktop Resolutions (1.4m)
  ok 6 [chromium] › tests\e2e\challenger-viewport.spec.ts:302:7 › WebGL Lifecycle, Context Integrity & Memory Health (17.9s)

  1) TimeoutError: page.waitForFunction: Timeout 10000ms exceeded.
     at tests/e2e/challenger-viewport.spec.ts:177:18
     (waiting for ws.phase === 'RIBBON_BROWSE' && ws.webglReady === true)
  2) Test timeout of 60000ms exceeded while setting up "page".

  2 failed, 4 passed (12.5m)
```

Root Cause Analysis of Challenger Suite Failure:
- `tests/e2e/challenger-viewport.spec.ts` sets up the page and immediately calls `__TEST_SCROLL_TO_PORTAL_PROGRESS__(0.35)` and `(1.0)` without first awaiting `webglReady === true`.
- Three.js / R3F canvas initialization and shader program compilation can take >10 seconds under load, causing line 177 (`page.waitForFunction(..., { timeout: 10000 })`) to fail intermittently with a 10s TimeoutError.

---

## Final Verdict

**`INTEGRITY VIOLATION`**

**Rationale**:
1. Phase 2 Behavioral Verification failed: `work-stage.spec.ts` (4/5) and `challenger-viewport.spec.ts` (4/6) do not pass reliably with exit code 0.
2. Contradiction of claimed test outcomes: `worker_m1_c`'s handoff claims 100% green execution across all suites, which was disproven by independent execution in the workspace.
3. Remediation required:
   - Debounce or throttle `__TEST_SET_PORTAL_PROGRESS__` dispatch in `initHorizontalScroll.LNLCK81L.js` / `WorkStage.tsx` to eliminate event loop flooding.
   - Adjust `test.setTimeout` in `work-stage.spec.ts` Gate 6 or streamline the continuous scroll traversal loop to complete well within safe bounds.
   - Ensure `challenger-viewport.spec.ts` awaits `webglReady === true` before triggering portal progress helpers.
