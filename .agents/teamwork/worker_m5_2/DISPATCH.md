# DISPATCH — worker_m5_2

## Task Assignment
- Role: Adverse Hardware Stress Suite & Integration Worker
- Working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m5_2
- Workspace root: C:\Users\wd\Documents\playwright-scraper
- Authoritative Request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (specifically read ## 2026-10-04T20:14:18Z, Requirement R5)
- Project Scope: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
- Test Infrastructure: C:\Users\wd\Documents\playwright-scraper\TEST_INFRA.md
- Survey Reference: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_2_2\handoff.md (Section 2.4)
- Previous Milestones Handoffs:
  - M1: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m1_2\handoff.md
  - M2: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m2_2\handoff.md
  - M3: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_2\handoff.md
  - M4: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m4_2\handoff.md

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Exclusive Write Ownership
You exclusively own and may edit or create ONLY these files:
- `test/stress/adverse-hardware-stress.test.js`
- `package.json` (to wire `"test:stress"` or `"test:v2.5"`)
- `test/stress/stress-harness.js` (if needed)

## Objectives
1. **Adverse Hardware Stress Suite (`test/stress/adverse-hardware-stress.test.js`)**:
   - Implement comprehensive automated test scenarios using Playwright CDP and Node native test runner (`node:test`):
     - **Scenario A: 6x CPU Throttling**:
       Use `const cdp = await context.newCDPSession(page); await cdp.send('Emulation.setCPUThrottlingRate', { rate: 6 });`.
       Test that under 6x CPU throttling:
       - Form input typing with adaptive masks (CPF/CNPJ) remains responsive (keystroke latency < 16.6ms per character, zero input dropping).
       - State machine transitions (idle -> validating -> submitting) execute cleanly.
       - Spring analytical motion computes continuous positions without freezing.
     - **Scenario B: 30fps rAF Clamping (Safari Low Power Mode)**:
       Simulate 30fps rAF clamping via page init script or delta time measurement.
       Test that analytical spring dynamics evaluates $x(t)$ with normalized continuous time $t$, achieving identical settling time ($t_{\text{settle}} \pm 10\text{ms}$) with zero numerical explosion or velocity divergence compared to 60fps.
     - **Scenario C: WebGL Context Loss and Restoration**:
       Simulate WebGL context loss via `WEBGL_lose_context` extension (`loseContext()` & `restoreContext()`).
       Assert that:
       - Context loss event is handled gracefully with `e.preventDefault()`, halting draw calls with 0 uncaught errors.
       - Upon `restoreContext()`, resources rehydrate cleanly and rendering resumes.
       - All DOM controls, forms, and buttons remain fully responsive throughout the GPU outage.
     - **Scenario D: Full v2.5 Integration Verification**:
       - Verify that all M1, M2, M3, M4 modules work harmoniously together.
2. **Execute and Verify**:
   - Run `node --test test/stress/adverse-hardware-stress.test.js`.
   - Run the full milestone battery:
     `node --test test/m1-impeccable-sanitization.test.js test/m2-fsm-forms.test.js test/m3-spring-dynamics.test.js test/m4-gpu-saliency.test.js test/stress/adverse-hardware-stress.test.js`
   - Run `npm test` to confirm 0 baseline regressions.
3. Report all test results and file paths in `C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m5_2\handoff.md`.
