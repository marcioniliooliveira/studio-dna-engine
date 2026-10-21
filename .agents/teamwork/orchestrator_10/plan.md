# Plan — Orchestrator 10 (Iteration 2 Remediation & Final Verification)

## Objective
Apply the 6 tested blueprints from `explorer_remediation_m5_1/handoff.md`, compile production bundle, run all automated test suites (Vitest math unit test + Playwright full suite + Challenger multi-viewport suite), obtain independent sign-offs from Reviewer and Challenger, and report verified completion to Sentinel.

## Execution Steps

### Step 1: Worker Execution (`worker_m5_remediation_2`)
- **Working Directory**: `.agents/teamwork/worker_m5_remediation_2`
- **Scope**:
  1. Blueprint 1: Root `vitest.config.ts` (exclude `worktrees`, `dist`, `node_modules`).
  2. Blueprint 2: `src/components/WorkStage/__tests__/math.spec.ts` (import and test `wrapRibbonPosition`).
  3. Blueprint 3: `src/components/WorkStage/WorkStage.tsx` (natural centering $k \cdot S$, remove 50px clamp, pure 1:1 projection).
  4. Blueprint 4: `src/components/WorkStage/RibbonCard.tsx` (natural centering $k \cdot S$).
  5. Blueprint 5: `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js` (style/attribute guards, onUpdate throttling, resize listener cleanup).
  6. Blueprint 6: `tests/e2e/work-stage.spec.ts` (voluntary departure HUD button click test).
  7. Compile production bundle: `npm run build:workstage` into `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.
  8. Run test suites:
     - `npx vitest run src/components/WorkStage/__tests__/math.spec.ts`
     - `npx playwright test tests/e2e/work-stage.spec.ts`
     - `npx playwright test tests/e2e/challenger-viewport.spec.ts`
  9. Deliver detailed `handoff.md` with raw command outputs and exit codes.

### Step 2: Independent Review & Adversarial Challenge
- **Reviewer (`reviewer_m5_remediation_1`)**: Verify code quality, absence of test hacks/clamps, memory safety, event listener cleanup, and test execution.
- **Challenger (`challenger_m5_remediation_1`)**: Execute independent multi-viewport verification, adversarial edge cases (fast wheel, rapid click on departure, resize).

### Step 3: Gate Evaluation & Synthesis
- Update `GATE_STATUS.md` with all verdicts.
- Verify strict pass criteria (All APPROVE, 0 integrity violations, 100% test pass).
- Produce `handoff.md` and report completion to Parent/Sentinel.
