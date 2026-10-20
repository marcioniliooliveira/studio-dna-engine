## 2026-10-20T15:24:47Z

# Dispatch for Explorer m5_3: Card-to-Sheet Choreography, Build & Gates

**Role**: QA Playwright Invariant Verifier & Build Integration Explorer
**Working Directory**: `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m5_3`
**Authoritative Request**: `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md` (read header ## 2026-10-20T15:19:36Z)
**Scope Document**: `c:\Users\wd\Documents\playwright-scraper\PROJECT.md`

## Objectives:
1. Thoroughly investigate Card-to-Sheet transition in `src/components/WorkStage/WorkStage.tsx`:
   - Identify existing `setTimeout(900ms)` or static fade logic.
   - Formulate the fluid staggered GSAP choreography ($Kp$):
     - Mesh landing in front plane with uncurving & photographic wash ($u_{\text{sheetP}} \to 0, u_{\text{white}} \to 1$): $t = 0\text{s}$, $0.85\text{s}$ duration, `expo.out`.
     - Project title: enters at $t = 0.25\text{s}$, vertical elevation and opacity (`expo.out`).
     - Description & body text: enters at $t = 0.35\text{s}$.
     - Tags / pills & close button: enter at $t = 0.50\text{s}$.
2. Inspect the build pipeline:
   - Check `package.json` for script `npm run build:workstage` and output file `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.
   - Verify how imports and exports are packaged into the Astro site bundle.
3. Inspect all automated test suites and gates:
   - `src/components/WorkStage/__tests__/math.spec.ts` (Gate 1: 8/8 tests).
   - `tests/e2e/work-stage.spec.ts` (Gates 2 through 6).
   - `tests/e2e/challenger-viewport.spec.ts` (Challenger Multi-Viewport Suite).
4. Verify the exact assertions, selectors, and timing expectations in each test file so the implementation satisfies 100% of the gates.
5. Write a detailed analysis and recommendations in `handoff.md` in your working directory.
