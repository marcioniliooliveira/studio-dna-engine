# Dispatch: Remediation Worker — Gate Iteration 1 Remediation

**Target**: C:\Users\wd\Documents\playwright-scraper
**Working Directory**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m5_remediation_1
**Authoritative Request**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
**Project Scope Document**: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
**Gate Status**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_1\GATE_STATUS.md
**Reviewer 1 Report**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_reviewer_m5_1\handoff.md
**Reviewer 2 Report**: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_reviewer_m5_2\handoff.md

**Mandatory Integrity Warning**:
> DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

**Remediation Mandate**:
Both Reviewer 1 and Reviewer 2 flagged mock facades and tautological tests in the E2E test suites, as well as an `npm test` failure:

1. **Eliminate Mock Facade in `test/e2e/e2e-harness.js`**:
   - Delete `COMPILER_ORACLES` completely (lines 398–530).
   - Export real production modules directly from `src/compiler/`:
     * `MODULES.kineticGrammarSchema = require('../../src/compiler/kinetic-grammar-schema');`
     * `MODULES.edgeStaticCompiler = require('../../src/compiler/edge-static-compiler');`
     * `MODULES.nextjsRscCompiler = require('../../src/compiler/nextjs-rsc-compiler');`
     * `MODULES.antiSlopTransformer = require('../../src/compiler/anti-slop-transformer');`

2. **Rewire `test/e2e/tier1-feature-coverage.test.js`**:
   - For Features 12, 13, 14, 15: replace all calls to `COMPILER_ORACLES` with genuine calls to `MODULES.kineticGrammarSchema`, `MODULES.edgeStaticCompiler`, `MODULES.nextjsRscCompiler`, and `MODULES.antiSlopTransformer`.
   - In F1.4: remove `|| true` and verify genuine CDP animation seeking or graceful error.
   - In F12.3, F12.4, F12.5: remove local string tautologies; validate real CSS `@scope` generation and Zod schema slot validation via `MODULES.kineticGrammarSchema.validateCompositionSpec(...)`.

3. **Rewire `test/e2e/tier2-boundary-corner.test.js`**:
   - For Boundaries B12, B13, B14, B15: replace all calls to `COMPILER_ORACLES` with genuine calls to `MODULES`.
   - Remove all tautological tests (B1.3, B2.3, B2.4, B12.3, B12.4, B12.5) and vacuous `else { assert.ok(true); }` branches. Make all boundary assertions falsifiable and strict against production modules.

4. **Fix `npm test` Legacy Failure**:
   - Inspect `test/negocia-bem.test.js` and `clientes/negocia-bem/site/index.html`.
   - Fix the markup / assertions so that running `npm test` (`node --test test/*.test.js`) passes 100% with 0 failures!

5. **Verify Full Test Suite**:
   - Run `node --test test/m*.test.js test/e2e/*.test.js`.
   - Run `npm test`.
   - Ensure 100% of all tests pass with exit code 0.
   - Update `TEST_READY.md`.
   - Write comprehensive report to `handoff.md` and notify parent.


## 2026-10-03T08:50:05Z
You are the Remediation Worker for Milestone M5.
Your working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m5_remediation_1
Authoritative user request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
Project Scope Document: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
Gate Status: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_1\GATE_STATUS.md
Reviewer 1 Report: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_reviewer_m5_1\handoff.md
Reviewer 2 Report: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_reviewer_m5_2\handoff.md
Your dispatch instructions: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m5_remediation_1\DISPATCH.md

You MUST read ORIGINAL_REQUEST.md first.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Remediate all issues raised by Reviewers 1 & 2:
1. In test/e2e/e2e-harness.js: Delete COMPILER_ORACLES facade (lines 398-530). Wire MODULES to directly require and expose src/compiler/ modules (kineticGrammarSchema, edgeStaticCompiler, nextjsRscCompiler, antiSlopTransformer).
2. In test/e2e/tier1-feature-coverage.test.js: Replace all COMPILER_ORACLES calls with genuine MODULES calls for F12-F15. Eliminate tautologies in F12.3-F12.5 and remove '|| true' in F1.4.
3. In test/e2e/tier2-boundary-corner.test.js: Replace all COMPILER_ORACLES calls with genuine MODULES calls for B12-B15. Eliminate tautologies (B1.3, B2.3-B2.4, B12.3-B12.5) and 'assert.ok(true)' fallback branches.
4. Fix npm test: Inspect and fix test/negocia-bem.test.js / clientes/negocia-bem/site/index.html so that 'npm test' passes 100% with 0 errors.
5. Verify: Run 'node --test test/m*.test.js test/e2e/*.test.js' and 'npm test'. Ensure all tests pass. Update TEST_READY.md.
6. Write handoff.md and send completion message to parent.
