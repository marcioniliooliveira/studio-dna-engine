# Gemini Scoped Executor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute bounded DAG nodes through Gemini 3.7 Flash with progressive context, node-specific tools, structured results, independent verification, fingerprinted repair limits, and measurable cost.

**Architecture:** The M2 scheduler emits a compact task package for one node. A context index exposes structural summaries and exact slices without mutating source; a tool catalog resolves only declared tools. Manual IDE exchange is the first working adapter, followed by an API adapter behind the same interface. Deterministic gates accept or reject every result.

**Tech Stack:** Node.js CommonJS, Node test runner, Zod contracts from M2, Acorn 8.18.0, acorn-walk 8.3.5, `@google/genai` 2.19.0, existing Playwright/QA/pipeline modules.

**Spec:** `docs/superpowers/specs/2026-08-30-reference-driven-orchestration-design.md`

**Prerequisite:** Complete `docs/superpowers/plans/2026-08-30-token-aware-control-plane.md` first. This plan consumes `TaskResultWire`, `createArtifactRegistry`, `createRunStore`, `createBudgetGovernor`, and the executor interface defined there.

## Global Constraints

- Gemini executes tasks; it cannot choose client, reference, promotion state or run budget.
- Every task package contains exact allowed paths, artifact refs, tools, gates and maximum attempts.
- Context projection never rewrites source files or changes executable semantics.
- Full files and logs are disclosed only through allowed read tools when structural summaries are insufficient.
- Tool definitions absent from the node allow-list are not sent to the model and cannot be invoked.
- Standard service is used for interactive repairs; Batch/Flex is limited to explicitly eligible non-interactive nodes.
- Repeating the same normalized failure stops automatic repair.
- Model-reported success is not evidence; independent gates decide acceptance.
- IDE usage without token metadata is stored as unknown cost, never zero.
- A live API key is not required for unit or integration tests.

---

## File structure

```text
src/execution/
├── model-adapter.js          # shared adapter contract and result normalization
├── tool-catalog.js           # allow-listed dynamic tool resolution
├── context-index.js          # AST/symbol/import index and exact slices
├── task-package-builder.js   # compact package from DAG node and refs
├── gemini-ide-adapter.js     # manual package/result exchange
├── gemini-api-adapter.js     # structured Gemini API execution
├── service-router.js         # Standard vs Batch/Flex eligibility
├── error-fingerprint.js      # stable failure identity and delta
├── repair-controller.js      # bounded repair decisions
├── result-verifier.js        # fixed gate catalog, no arbitrary commands
└── cost-estimator.js         # usage normalization and dated rate config
config/
└── model-rates.json          # explicit effective dates and rates
test/
├── tool-catalog.test.js
├── context-index.test.js
├── task-package-builder.test.js
├── gemini-ide-adapter.test.js
├── gemini-api-adapter.test.js
├── service-router.test.js
├── error-fingerprint.test.js
├── repair-controller.test.js
├── result-verifier.test.js
├── cost-estimator.test.js
└── gemini-executor.integration.test.js
```

### Task 1: Model adapter and compact task/result packages

**Files:**
- Create: `src/execution/model-adapter.js`
- Create: `src/execution/task-package-builder.js`
- Create: `test/task-package-builder.test.js`

**Interfaces:**
- Adapter interface: `execute(taskPackage) -> Promise<TaskResultWire>`.
- Produces `buildTaskPackage({ blueprint, node, artifacts, contextSummary })`.
- Compact package: `{ v, rid, cid, nid, k, ni, in, p, out, tl, g, b }`.

- [ ] **Step 1: Write the failing package-isolation test**

Build a task for `piloto-elyse-luxe` and assert it contains only that node's inputs, paths, tools, gates and budget. Assert raw blueprint nodes and conversation history are absent.

- [ ] **Step 2: Write failing path and budget tests**

Assert `clientes/outro-cliente/file.js`, undeclared artifacts, empty gates and attempt count above the node budget are rejected before adapter execution.

- [ ] **Step 3: Run and confirm RED**

Run: `node --test test/task-package-builder.test.js`

- [ ] **Step 4: Implement compact wire construction**

Use descriptive arguments internally and emit:

```js
{
  v: 1,
  rid: blueprint.runId,
  cid: blueprint.clientId,
  nid: node.id,
  k: node.kind,
  ni: node.nonInteractive,
  in: artifacts.map(({ id, sha256 }) => ({ id, sha: sha256 })),
  p: node.allowedPaths,
  out: node.outputs,
  tl: node.tools,
  g: node.gates,
  b: { it, ot, usd, try }
}
```

Freeze the returned package in tests to prevent an adapter from mutating scheduler state.

- [ ] **Step 5: Run and commit**

Run: `node --test test/task-package-builder.test.js`

```bash
git add src/execution/model-adapter.js src/execution/task-package-builder.js test/task-package-builder.test.js
git commit -m "feat(execution): build isolated task packages"
```

### Task 2: AST context index and progressive disclosure

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/execution/context-index.js`
- Create: `test/context-index.test.js`
- Create: `test/fixtures/context-index/sample.js`

**Interfaces:**
- Produces `createContextIndex({ projectRoot, allowedPaths })`.
- Methods: `indexFile(relativePath)`, `getSummary(relativePath)`, `readSymbol(relativePath, symbol)`, `readLines(relativePath, start, end)`.

- [ ] **Step 1: Install pinned AST dependencies**

Run: `npm install acorn@8.18.0 acorn-walk@8.3.5`

- [ ] **Step 2: Create a semantic fixture and failing summary test**

The fixture must include imports, a class, async function, template literal, ASI-sensitive return and comments describing a constraint. Assert the summary includes imports, exported symbols, signatures and line spans but not full function bodies.

- [ ] **Step 3: Write failing exact-slice tests**

Assert `readSymbol` returns byte-exact source for one function, including its comment and whitespace. Assert a line request outside the allowed path or file bounds fails closed.

- [ ] **Step 4: Run and confirm RED**

Run: `node --test test/context-index.test.js`

- [ ] **Step 5: Implement parse-only indexing**

Parse with Acorn using `{ ecmaVersion: 'latest', sourceType: 'module', locations: true }`; fall back once to `sourceType:'script'`. Store symbol metadata and offsets in memory or a content-addressed JSON artifact. Never write transformed source.

- [ ] **Step 6: Add hash invalidation test**

Index a file, modify the test copy, and assert its SHA changes and stale symbol offsets are discarded.

- [ ] **Step 7: Run and commit**

Run: `node --test test/context-index.test.js`

```bash
git add package.json package-lock.json src/execution/context-index.js test/context-index.test.js test/fixtures/context-index/sample.js
git commit -m "feat(execution): add progressive AST context index"
```

### Task 3: Dynamic tool catalog

**Files:**
- Create: `src/execution/tool-catalog.js`
- Create: `test/tool-catalog.test.js`

**Interfaces:**
- Produces `createToolCatalog(definitions)`.
- Methods: `resolve(toolIds) -> ModelToolDefinition[]`, `invoke(toolId, args, taskScope)`.
- Initial IDs: `context.summary`, `context.symbol`, `context.lines`, `patch.apply`, `test.focused`, `qa.core`.

- [ ] **Step 1: Write failing definition-minimization test**

Register six tools, resolve two IDs, serialize the definitions and assert the other four names/descriptions are absent.

- [ ] **Step 2: Write failing invocation-scope tests**

Assert an undeclared tool ID and a declared read outside `taskScope.allowedPaths` both fail before handler invocation.

- [ ] **Step 3: Run and confirm RED**

Run: `node --test test/tool-catalog.test.js`

- [ ] **Step 4: Implement registry with strict argument schemas**

Each definition contains `{ id, description, inputSchema, handler }`. `resolve` returns only model-visible JSON schema fields, never handlers. `invoke` validates arguments and scope, then calls the local handler.

- [ ] **Step 5: Add duplicate-ID and payload-size tests**

Reject duplicate IDs at construction. Record serialized tool-definition bytes so later telemetry can measure prompt overhead.

- [ ] **Step 6: Run and commit**

Run: `node --test test/tool-catalog.test.js`

```bash
git add src/execution/tool-catalog.js test/tool-catalog.test.js
git commit -m "feat(execution): resolve node-specific tools"
```

### Task 4: Gemini IDE adapter with manual artifact exchange

**Files:**
- Create: `src/execution/gemini-ide-adapter.js`
- Create: `test/gemini-ide-adapter.test.js`

**Interfaces:**
- Produces `createGeminiIdeAdapter({ exchangeDir, now })`.
- `execute(taskPackage)` writes `<exchangeDir>/<runId>/<nodeId>/task-package.json` and waits only through explicit `collectResult(runId, nodeId)` calls.
- `collectResult` validates `task-result.json` through `TaskResultWire`.

- [ ] **Step 1: Write failing export test**

Execute a package and assert atomic JSON creation, compact keys, no conversation field, and no file contents beyond the provided context summary.

- [ ] **Step 2: Write failing result-validation test**

Place malformed prose in `task-result.json`; assert `TASK_RESULT_INVALID`. Place a result for another client/node and assert scope mismatch.

- [ ] **Step 3: Run and confirm RED**

Run: `node --test test/gemini-ide-adapter.test.js`

- [ ] **Step 4: Implement non-polling manual exchange**

`execute` returns `{ status:'awaiting_external_result', packagePath }`; it does not sleep or consume retries. `collectResult` is invoked by CLI/MCP after the IDE user saves a result.

- [ ] **Step 5: Record unknown usage correctly**

When IDE output lacks usage, emit `{ inputTokens:null, outputTokens:null, usd:null, estimated:false }`.

- [ ] **Step 6: Run and commit**

Run: `node --test test/gemini-ide-adapter.test.js`

```bash
git add src/execution/gemini-ide-adapter.js test/gemini-ide-adapter.test.js
git commit -m "feat(execution): add manual Gemini IDE exchange"
```

### Task 5: Gemini API adapter and service routing

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/execution/gemini-api-adapter.js`
- Create: `src/execution/service-router.js`
- Create: `test/gemini-api-adapter.test.js`
- Create: `test/service-router.test.js`

**Interfaces:**
- Produces `createGeminiApiAdapter({ client, toolCatalog, model })`.
- Produces `selectService(node) -> 'standard' | 'batch' | 'flex'`.
- Default model: `gemini-3.7-flash`.

- [ ] **Step 1: Install pinned SDK**

Run: `npm install @google/genai@2.19.0`

- [ ] **Step 2: Write failing structured-output test with a fake client**

Assert the request contains only the task package, progressively disclosed context, node tools and `TaskResultWire` JSON schema. Assert model output is validated before return.

- [ ] **Step 3: Write failing tool-loop budget test**

Simulate two allowed tool calls and a third beyond the task limit. Assert the third is rejected locally and no additional model call occurs.

- [ ] **Step 4: Implement API adapter without reading environment internally**

The composition root constructs the SDK client from `GEMINI_API_KEY`; the adapter accepts an injected client. Normalize usage metadata into input, cached, output/thinking tokens and latency.

- [ ] **Step 5: Implement service eligibility**

Use Standard for `fix`, interactive `render`, and any node with dependencies awaiting immediate output. Permit Batch/Flex only for `extract` or `verify` nodes marked `nonInteractive:true` with no human approval edge.

- [ ] **Step 6: Test no-key fallback in the composition root**

Without `GEMINI_API_KEY`, select `GeminiIdeAdapter`; never silently use another paid model.

- [ ] **Step 7: Run and commit**

Run: `node --test test/gemini-api-adapter.test.js test/service-router.test.js`

```bash
git add package.json package-lock.json src/execution/gemini-api-adapter.js src/execution/service-router.js test/gemini-api-adapter.test.js test/service-router.test.js
git commit -m "feat(execution): add bounded Gemini API adapter"
```

### Task 6: Independent gate verifier

**Files:**
- Create: `src/execution/result-verifier.js`
- Create: `test/result-verifier.test.js`

**Interfaces:**
- Produces `createResultVerifier({ gateCatalog, artifactRegistry })`.
- Method: `verify({ taskPackage, taskResult }) -> Promise<{ passed, gateResults, artifactRefs }>`.
- Gate IDs map to fixed functions; task results cannot provide shell commands.

- [ ] **Step 1: Write failing self-certification test**

Return `{ st:'ok' }` from the model with a failing `qa.core` gate. Assert verification fails and the scheduler cannot accept the model status.

- [ ] **Step 2: Write failing arbitrary-command test**

Include `cmd:'powershell ...'` in a task result and assert strict schema rejection. Only gate IDs declared in the package may run.

- [ ] **Step 3: Run and confirm RED**

Run: `node --test test/result-verifier.test.js`

- [ ] **Step 4: Implement fixed gate catalog adapters**

Initial adapters call existing deterministic functions for core runtime QA, anti-slop, artifact hash and focused tests. Persist verifier output separately from executor output.

- [ ] **Step 5: Add immutable-artifact test**

Modify a candidate artifact after the executor result but before verification; assert hash mismatch fails before any gate reports pass.

- [ ] **Step 6: Run and commit**

Run: `node --test test/result-verifier.test.js test/unified-quality-gate.test.js`

```bash
git add src/execution/result-verifier.js test/result-verifier.test.js
git commit -m "feat(execution): verify executor results independently"
```

### Task 7: Failure fingerprints and bounded repair controller

**Files:**
- Create: `src/execution/error-fingerprint.js`
- Create: `src/execution/repair-controller.js`
- Create: `test/error-fingerprint.test.js`
- Create: `test/repair-controller.test.js`

**Interfaces:**
- `fingerprintFailure(evidence) -> sha256`.
- `createFailureDelta(evidence) -> { fp, gate, files, diffHash, summary }`.
- `decideRepair({ node, attempts, previousFingerprints, evidence, remainingBudget })` returns `retry`, `human_intervention`, or `budget_blocked`.

- [ ] **Step 1: Write failing normalization tests**

Two errors differing only by temporary port, timestamp or absolute worktree prefix must produce the same fingerprint. Different gate/file/line combinations must differ.

- [ ] **Step 2: Write failing repeated-error test**

After one failed repair, submit the same fingerprint and assert `human_intervention`, even when attempts remain.

- [ ] **Step 3: Write failing delta-minimization test**

Provide a 10,000-line log and a three-line relevant diff. Assert the delta contains the gate, normalized message, affected paths, diff hash and at most 40 lines of evidence; it must not contain the full log.

- [ ] **Step 4: Run and confirm RED**

Run: `node --test test/error-fingerprint.test.js test/repair-controller.test.js`

- [ ] **Step 5: Implement deterministic decisions**

Decision order is: repeated fingerprint → exhausted attempts → insufficient remaining budget → retry. None of these branches call Sol. `human_intervention` may later authorize a new plan version through M2.

- [ ] **Step 6: Run and commit**

Run: `node --test test/error-fingerprint.test.js test/repair-controller.test.js`

```bash
git add src/execution/error-fingerprint.js src/execution/repair-controller.js test/error-fingerprint.test.js test/repair-controller.test.js
git commit -m "feat(execution): bound repairs by failure fingerprint"
```

### Task 8: Cost calculation and baseline comparison

**Files:**
- Create: `config/model-rates.json`
- Create: `src/execution/cost-estimator.js`
- Create: `scripts/compare-execution-cost.js`
- Create: `test/cost-estimator.test.js`

**Interfaces:**
- `estimateCost(usage, rateCard, at) -> { usd, estimated, rateVersion }`.
- Rate selection uses effective date and service mode.
- Script compares runs with equal task/gate sets; it does not compare unrelated projects.

- [ ] **Step 1: Write failing dated-rate tests**

Encode Gemini 3.7 Flash Standard rates through 2026-12-31 and the documented 2027 rates as separate entries. Assert the same usage changes price across the boundary. Encode Sol input/output/cache read/cache write as a separately dated card.

- [ ] **Step 2: Write failing unknown-usage test**

If any required token field is unknown, return `usd:null`, `estimated:false`; never coerce missing fields to zero.

- [ ] **Step 3: Run and confirm RED**

Run: `node --test test/cost-estimator.test.js`

- [ ] **Step 4: Implement integer-safe calculation**

Calculate each token class independently using decimal rates and round only the final USD result to six decimals. Store original usage alongside the estimate.

- [ ] **Step 5: Implement comparison script**

Read two run ledgers, verify matching task/gate fingerprints, and print total known cost, unknown calls, retries, gate pass rate and human interventions. Refuse to print a savings percentage when either run contains unknown cost.

- [ ] **Step 6: Run and commit**

Run: `node --test test/cost-estimator.test.js`

```bash
git add config/model-rates.json src/execution/cost-estimator.js scripts/compare-execution-cost.js test/cost-estimator.test.js
git commit -m "feat(execution): measure model cost by run"
```

### Task 9: End-to-end bug-fix proof and evidence update

**Files:**
- Create: `test/gemini-executor.integration.test.js`
- Create: `test/fixtures/gemini-executor/broken-site/index.html`
- Modify: `PROJECT_STATUS.md`

**Interfaces:**
- Consumes a valid M2 `fix` node, fake Gemini response, immutable artifact registry and core QA gate.
- Produces a verified node result, cost event and candidate artifact without a Sol callback.

- [ ] **Step 1: Create a controlled failing fixture**

The fixture requests `/missing.js`. Confirm the existing core runtime gate fails on network evidence before the executor patch.

- [ ] **Step 2: Write the integration workflow**

Use a fake Gemini client that requests only the relevant symbol/lines, returns a patch removing the missing request, and reports usage. Assert only node tools are visible and the full repository is never loaded.

- [ ] **Step 3: Verify bounded execution**

Assert one architect call inherited from the M2 fixture, one executor attempt, independent QA pass, zero repeated fingerprints, known cost event and final run state `candidate`.

- [ ] **Step 4: Add negative integration cases**

Assert an undeclared tool fails, a repeated broken patch enters `human_intervention`, and an over-budget task never calls Gemini.

- [ ] **Step 5: Run focused and full suites**

Run: `node --test test/gemini-executor.integration.test.js test/*executor*.test.js test/context-index.test.js test/tool-catalog.test.js test/result-verifier.test.js test/repair-controller.test.js test/cost-estimator.test.js`

Run: `npm test`

- [ ] **Step 6: Update status with exact evidence**

Record test counts and fake-adapter evidence. A live Gemini claim requires a separate opt-in run with recorded model ID, usage and artifact hashes. Keep visual comparison, accessibility and performance unverified.

- [ ] **Step 7: Commit**

```bash
git add test/gemini-executor.integration.test.js test/fixtures/gemini-executor/broken-site/index.html PROJECT_STATUS.md
git commit -m "test(execution): prove bounded Gemini repair workflow"
```

## Plan self-review

- **Spec coverage:** Progressive disclosure, AST context, compact packages, dynamic tools, manual IDE path, API path, service routing, independent verification, bounded repairs, failure deltas and cost evidence are mapped to Tasks 1–9.
- **Type consistency:** The adapter `execute(taskPackage)` and `TaskResultWire` contracts match the M2 scheduler. Cost events remain append-only through `runStore.appendCost`.
- **Deferred intentionally:** Concept generation and visual semantic comparison remain M4/M6. Client presentation remains M7. Distributed queues and concurrent workers remain M8.
- **Live-service boundary:** All automated tests use injected fakes. A live Gemini run is an explicit evidence step, not a hidden test dependency.
