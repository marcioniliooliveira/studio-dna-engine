# Fail-Closed Quality Baseline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the existing production quality pipeline fail closed, distinguish runtime evidence from unimplemented quality scopes, and report pilot maturity truthfully.

**Architecture:** Keep `UnifiedQualityGate` as the runtime auditor. Its four implemented runtime gates become the only gates that determine `passed`; missing visual-regression, accessibility, and performance evidence prevent promotion beyond `candidate`. The ICM contract consumes the report's nested gate shape rather than stale flat properties, and the pilot/status documents report only freshly observed evidence.

**Tech Stack:** Node.js 20+, `node:test`, Playwright, Cheerio, CommonJS, JSON artifacts.

**Spec:** `docs/superpowers/specs/2026-08-30-reference-driven-orchestration-design.md`

## Global Constraints

- Preserve ICM client isolation; never load another client's files to validate a run.
- Treat `copias/` as immutable reference evidence.
- Do not add an LLM, XState, queue, or presentation interface in this milestone.
- Do not claim visual regression, accessibility, or performance verification until executable evidence exists.
- All production changes start with a failing `node:test` regression test and end with a full `npm test` run.
- `verified` is unavailable while any required promotion scope is explicitly unverified; a successful runtime audit may only return `candidate`.

---

## File structure

| File | Responsibility after this milestone |
| --- | --- |
| `src/qa/unified-quality-gate.js` | Run core browser/static gates, capture a runtime baseline, emit fail-closed report and candidate status. |
| `test/unified-quality-gate.test.js` | Exercise clean, anti-slop, network-failure, and runtime-baseline report behavior against real temporary sites. |
| `icm/_core/contracts.js` | Validate the nested quality report contract and reject failed core gates or incomplete reports. |
| `test/icm-context-router.test.js` | Exercise Stage 05 acceptance and rejection using the report shape emitted by `UnifiedQualityGate`. |
| `scripts/build-and-certify-pilot.js` | Report the candidate/failed runtime result without claiming verified promotion. |
| `PROJECT_STATUS.md` | Record only evidence rerun during this milestone; distinguish candidate runtime QA from unimplemented scopes. |

### Task 1: Make the network gate fail closed

**Files:**
- Modify: `test/unified-quality-gate.test.js`
- Modify: `src/qa/unified-quality-gate.js:203-207`

**Interfaces:**
- Consumes: `UnifiedQualityGate.auditSite({ siteDir, clientSlug, headless })`.
- Produces: `report.passed === false` and `report.status === 'failed'` whenever `report.gates.network.passed === false`.

- [ ] **Step 1: Write the failing network regression test**

Add this test after the clean-site test. It uses the real local server owned by `UnifiedQualityGate` and a missing script requested by the page.

```js
test('UnifiedQualityGate: fails when a required local asset returns 404', async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'uqg-test-network-'));
  const siteDir = path.join(tmpDir, 'site');
  fs.mkdirSync(siteDir, { recursive: true });
  fs.writeFileSync(path.join(siteDir, 'index.html'), `<!DOCTYPE html>
<html><head><title>Network failure</title><script src="/missing.js"></script></head>
<body><main><section><p>Conteúdo válido para auditoria.</p></section></main></body></html>`, 'utf8');

  const report = await UnifiedQualityGate.auditSite({
    siteDir,
    clientSlug: 'test-network-client',
    headless: true
  });

  assert.equal(report.gates.network.passed, false);
  assert.equal(report.gates.network.failedRequestsCount, 1);
  assert.equal(report.passed, false);
  assert.equal(report.status, 'failed');
  fs.rmSync(tmpDir, { recursive: true, force: true });
});
```

- [ ] **Step 2: Run the focused test and confirm the expected RED state**

Run: `node --test test/unified-quality-gate.test.js`

Expected before implementation: the new test fails because `report.gates.network.passed` is `false` while `report.passed` remains `true` and the report status remains non-failed.

- [ ] **Step 3: Include network success in the production pass condition**

Change the `passed` calculation to include `networkFailures.length === 0`:

```js
const passed = antiSlopReport.passed &&
               jsErrors.length === 0 &&
               networkFailures.length === 0 &&
               domAudit.brokenImages.length === 0;
```

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `node --test test/unified-quality-gate.test.js`

Expected: all current quality-gate tests pass, including the local-404 regression.

- [ ] **Step 5: Commit the isolated behavior change**

```bash
git add src/qa/unified-quality-gate.js test/unified-quality-gate.test.js
git commit -m "fix(qa): fail closed on network errors"
```

### Task 2: Separate a runtime baseline from a Golden visual target

**Files:**
- Modify: `test/unified-quality-gate.test.js`
- Modify: `src/qa/unified-quality-gate.js:196-239`

**Interfaces:**
- Consumes: a successful `auditSite` browser run.
- Produces: `report.artifacts.runtimeBaselinePath`, whose basename is `runtime-baseline.png`; no report field or file name calls this capture a Golden screenshot.

- [ ] **Step 1: Write the failing runtime-baseline test**

Add this assertion to the clean-site test after `assert.equal(report.passed, true)`:

```js
assert.match(report.artifacts.runtimeBaselinePath, /qa-reports\/runtime-baseline\.png$/);
assert.ok(fs.existsSync(path.resolve(process.cwd(), report.artifacts.runtimeBaselinePath)));
assert.equal('screenshotPath' in report.artifacts, false);
```

- [ ] **Step 2: Run the focused test and confirm the expected RED state**

Run: `node --test test/unified-quality-gate.test.js`

Expected before implementation: the assertion fails because the report only exposes `screenshotPath` pointing to `verified-golden-preview.png`.

- [ ] **Step 3: Rename the artifact at its source**

In `UnifiedQualityGate.auditSite`, replace the current `verified-golden-preview.png` path with:

```js
const runtimeBaselinePath = path.join(reportsDir, 'runtime-baseline.png');
await page.screenshot({ path: runtimeBaselinePath, fullPage: false });
```

Replace the artifact report member with:

```js
runtimeBaselinePath: path.relative(process.cwd(), runtimeBaselinePath).replace(/\\/g, '/')
```

Update the surrounding comment to call this a runtime baseline, not a Golden screenshot.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `node --test test/unified-quality-gate.test.js`

Expected: all quality-gate tests pass and the clean test proves the file exists.

- [ ] **Step 5: Commit the terminology and artifact-contract change**

```bash
git add src/qa/unified-quality-gate.js test/unified-quality-gate.test.js
git commit -m "refactor(qa): record runtime baseline separately"
```

### Task 3: Make the ICM Stage 05 contract consume the real report shape

**Files:**
- Modify: `test/icm-context-router.test.js`
- Modify: `icm/_core/contracts.js:104-122`

**Interfaces:**
- Consumes: `{ status, gates: { antiSlop, console, network, structural } }` emitted by `UnifiedQualityGate`.
- Produces: `{ valid, passed, jsErrors, brokenImages, networkFailures, error }` from `STAGE_CONTRACTS[STAGES.STAGE_05_QUALITY_GATE].validateOutput(report)`.

- [ ] **Step 1: Write failing contract tests for nested runtime reports**

Add this test to `test/icm-context-router.test.js`:

```js
test('ICM Stage 05 rejects a network failure in the nested quality report', () => {
  const contract = STAGE_CONTRACTS[STAGES.STAGE_05_QUALITY_GATE];
  const result = contract.validateOutput({
    status: 'failed',
    gates: {
      antiSlop: { passed: true },
      console: { passed: true, errorsCount: 0 },
      network: { passed: false, failedRequestsCount: 1 },
      structural: { passed: true, brokenImagesCount: 0 }
    }
  });

  assert.equal(result.valid, false);
  assert.equal(result.passed, false);
  assert.equal(result.networkFailures, 1);
  assert.match(result.error, /network/i);
});
```

Also add a candidate report fixture with all four nested gates passed and assert `valid === true`, `passed === true`, `jsErrors === 0`, `brokenImages === 0`, and `networkFailures === 0`.

- [ ] **Step 2: Run the focused contract test and confirm RED**

Run: `node --test test/icm-context-router.test.js`

Expected before implementation: the new candidate fixture is not validated from its nested gates, and the failed-network fixture is incorrectly treated as passing because the current contract reads only flat `report.jsErrors` and `report.brokenImages`.

- [ ] **Step 3: Normalize the four nested gates in `validateOutput`**

Replace the Stage 05 implementation with logic equivalent to:

```js
const gates = report.gates;
if (!gates || !gates.antiSlop || !gates.console || !gates.network || !gates.structural) {
  return { valid: false, passed: false, error: 'Relatório de quality gate incompleto' };
}

const jsErrors = gates.console.errorsCount;
const brokenImages = gates.structural.brokenImagesCount;
const networkFailures = gates.network.failedRequestsCount;
const passed = gates.antiSlop.passed && gates.console.passed &&
  gates.network.passed && gates.structural.passed;
```

Return the three counts and an error string naming every failed gate. Do not fall back to zero when a required gate is absent.

- [ ] **Step 4: Run focused and full contract tests**

Run: `node --test test/icm-context-router.test.js`

Expected: every ICM contract and isolation test passes.

- [ ] **Step 5: Commit the contract alignment**

```bash
git add icm/_core/contracts.js test/icm-context-router.test.js
git commit -m "fix(icm): validate nested quality gate reports"
```

### Task 4: Prevent unsupported scopes from being promoted as verified

**Files:**
- Modify: `test/unified-quality-gate.test.js`
- Modify: `src/qa/unified-quality-gate.js`
- Modify: `scripts/build-and-certify-pilot.js:1-10,159-171`

**Interfaces:**
- Consumes: a core-runtime-pass report.
- Produces: `report.passed === true`, `report.status === 'candidate'`, and `report.assessments` with `visualRegression`, `accessibility`, and `performance` all set to `{ status: 'unverified', reason: string }`.

- [ ] **Step 1: Change the clean-site test to require candidate status and explicit unverified scopes**

Replace the current clean-site status assertion and add these assertions:

```js
assert.equal(report.passed, true);
assert.equal(report.status, 'candidate');
assert.deepEqual(report.assessments.accessibility.status, 'unverified');
assert.deepEqual(report.assessments.performance.status, 'unverified');
assert.deepEqual(report.assessments.visualRegression.status, 'unverified');
```

- [ ] **Step 2: Run the focused test and confirm RED**

Run: `node --test test/unified-quality-gate.test.js`

Expected before implementation: the clean report still returns `status === 'verified'` and no `assessments` object.

- [ ] **Step 3: Emit a candidate report with explicit scope limits**

After computing `passed`, build these assessments in `UnifiedQualityGate.auditSite`:

```js
const assessments = {
  visualRegression: {
    status: 'unverified',
    reason: 'Nenhuma comparação com runtime baseline foi executada.'
  },
  accessibility: {
    status: 'unverified',
    reason: 'Nenhuma auditoria de acessibilidade executável foi configurada.'
  },
  performance: {
    status: 'unverified',
    reason: 'Nenhum budget de performance reproduzível foi configurado.'
  }
};
```

Set the report status with `passed ? 'candidate' : 'failed'`. Do not expose `verified` from this runtime auditor until required assessments have real, passing evidence.

Update the pilot script comments and console message to call its successful result a candidate runtime audit, not certification.

- [ ] **Step 4: Run the focused test and confirm GREEN**

Run: `node --test test/unified-quality-gate.test.js`

Expected: all quality-gate tests pass, including fail-closed network behavior and the explicit candidate scope contract.

- [ ] **Step 5: Commit the promotion truthfulness change**

```bash
git add src/qa/unified-quality-gate.js scripts/build-and-certify-pilot.js test/unified-quality-gate.test.js
git commit -m "fix(qa): report unverified promotion scopes"
```

### Task 5: Rebuild the pilot and update the evidence ledger

**Files:**
- Modify: `PROJECT_STATUS.md`
- Verify: `scripts/build-and-certify-pilot.js`
- Verify: `clientes/piloto-elyse-luxe/linter-report.json`

**Interfaces:**
- Consumes: the M1 quality report emitted by the pilot runner.
- Produces: a status ledger whose date, test count, pilot maturity, and limitations match fresh command output.

- [ ] **Step 1: Run the full suite before changing status claims**

Run: `npm test`

Expected: all tests pass, including the new network, runtime-baseline, nested-contract, and candidate-status regressions.

- [ ] **Step 2: Run the pilot from the isolated worktree**

Run: `node scripts/build-and-certify-pilot.js`

Expected: it either produces a `candidate` runtime report with all four core gates passing, or exits nonzero with an explicit missing-artifact/network/asset error. Do not edit `PROJECT_STATUS.md` until the command's outcome is known.

- [ ] **Step 3: Inspect the generated evidence**

Run:

```bash
node -e "const r=require('./clientes/piloto-elyse-luxe/linter-report.json'); console.log(JSON.stringify({status:r.status,passed:r.passed,gates:r.gates,assessments:r.assessments,artifacts:r.artifacts},null,2))"
```

Expected successful output: `status: "candidate"`, `passed: true`, all four core gates passing, a `runtimeBaselinePath`, and three explicit `unverified` assessments.

- [ ] **Step 4: Update only claims proved by the current run**

In `PROJECT_STATUS.md`:

- change the automated-suite claim to the fresh test count and date;
- describe the Unified Quality Gate as a **candidate runtime gate** covering anti-slop, console, network, and structural checks;
- change the pilot maturity from verified to candidate unless real visual-regression, accessibility, and performance evidence exists;
- retain static Next.js and LCP claims as unverified;
- add a concise note that visual regression, accessibility, and performance are roadmap requirements rather than currently verified gates.

- [ ] **Step 5: Re-run verification after documentation update**

Run:

```bash
git diff --check
npm test
git status --short
```

Expected: no whitespace errors, full suite passing, and only the intended status/report artifacts modified.

- [ ] **Step 6: Commit the evidence refresh**

```bash
git add PROJECT_STATUS.md clientes/piloto-elyse-luxe/linter-report.json clientes/piloto-elyse-luxe/qa-reports/runtime-baseline.png
git commit -m "docs: refresh candidate quality evidence"
```

If the runtime baseline image remains ignored by repository policy, do not force-add it. Commit the report and document the artifact path plus its hash instead; add a small hash field to the report in a separate TDD task only if the current report cannot identify the exact image.

## Plan self-review

- **Spec coverage:** M1's fail-closed network gate, baseline terminology, explicit unverified visual/accessibility/performance scopes, status alignment, and clean evidence are covered by Tasks 1–5.
- **Deferred intentionally:** M2 state persistence, M3 reference intelligence, M4 concept rendering, M5 Gemini execution, M6 visual comparison, and M7 presentation are not included.
- **TDD coverage:** Every production behavior change begins with a focused failing regression test and names the pre-change failure.
- **Consistency:** `candidate` means core runtime gates passed while required promotion scopes remain unverified; `verified` remains unavailable in this milestone.
