# Token-Aware Control Plane Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deterministic control plane that obtains one compact DAG from GPT-5.6 Sol, validates it, persists all state and cost evidence, and schedules bounded executor tasks without reading conversation history.

**Architecture:** GPT-5.6 Sol is an injected, stateless blueprint compiler called once per plan version. Zod validates the compact wire payload; descriptive internal objects feed a DAG validator, XState lifecycle and sequential scheduler. Existing pipeline and QA modules remain deterministic adapters rather than being rewritten.

**Tech Stack:** Node.js CommonJS, Node test runner, Zod 4.4.3, XState 5.32.6, SHA-256, JSONL, existing `src/server/security.js` slug validation.

**Spec:** `docs/superpowers/specs/2026-08-30-reference-driven-orchestration-design.md`

## Global Constraints

- Repository maturity remains `experimental`; M2 does not promote it to production.
- GPT-5.6 Sol is called once per plan version and never from an automatic retry loop.
- A replan requires a human-approved event and creates a new immutable plan version from a failure delta.
- Compact keys are allowed only in model wire payloads; internal code uses descriptive names.
- Every run is bound to one safe `clientId`; cross-client paths and artifacts fail closed.
- `copias/` remains immutable reference evidence.
- Missing budgets, gates, dependencies or tool declarations invalidate a blueprint.
- Unknown model usage is recorded as unknown, never as zero cost.
- Builder and verifier remain separate roles.
- Every production behavior change begins with a failing regression test.

---

## File structure

```text
src/orchestration/
├── contracts.js             # compact wire schemas and normalization
├── blueprint-validator.js   # DAG, scope, tools and budget validation
├── artifact-registry.js     # content-addressed immutable artifacts
├── run-store.js             # append-only events, snapshots and cost ledger
├── sol-blueprint-adapter.js # exactly-one-call planner adapter
├── workflow-machine.js      # XState lifecycle and legal transitions
├── budget-governor.js       # preflight and accumulated usage decisions
└── dag-scheduler.js         # topological, bounded task execution
bin/
└── orchestrator.js          # start, inspect, approve and resume commands
test/
├── orchestration-contracts.test.js
├── blueprint-validator.test.js
├── artifact-registry.test.js
├── run-store.test.js
├── sol-blueprint-adapter.test.js
├── workflow-machine.test.js
├── budget-governor.test.js
├── dag-scheduler.test.js
└── orchestration-integration.test.js
```

### Task 1: Compact blueprint contract with readable internal model

**Files:**
- Create: `src/orchestration/contracts.js`
- Create: `test/orchestration-contracts.test.js`

**Interfaces:**
- Consumes wire blueprint `{ v, rid, cid, ctx, nd, b }`.
- Produces `parseBlueprintWire(input)` returning `{ version, runId, clientId, context, nodes, budget }`.
- Produces `blueprintWireJsonSchema` for the Sol structured-output request.

- [ ] **Step 1: Write a failing normalization test**

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { parseBlueprintWire } = require('../src/orchestration/contracts');

test('expands a compact blueprint into readable internal names', () => {
  const blueprint = parseBlueprintWire({
    v: 1,
    rid: 'run-001',
    cid: 'piloto-elyse-luxe',
    ctx: [{ id: 'ctx-1', sha: 'a'.repeat(64), p: 'clientes/piloto-elyse-luxe/DNA.md' }],
    nd: [{
      id: 'n1', k: 'build', dep: [], in: ['ctx-1'], out: ['site'],
      p: ['clientes/piloto-elyse-luxe/site/index.html'],
      ni: false,
      tl: ['pipeline.build'], b: { it: 20000, ot: 4000, usd: 0.08, try: 2 },
      g: ['core-runtime']
    }],
    b: { usd: 1.5, sol: 1, rp: 0 }
  });

  assert.equal(blueprint.runId, 'run-001');
  assert.equal(blueprint.nodes[0].kind, 'build');
  assert.equal(blueprint.nodes[0].budget.maxAttempts, 2);
  assert.equal(blueprint.budget.maxSolCalls, 1);
});
```

- [ ] **Step 2: Run the contract test and confirm RED**

Run: `node --test test/orchestration-contracts.test.js`

Expected: FAIL with `Cannot find module '../src/orchestration/contracts'`.

- [ ] **Step 3: Implement Zod wire schemas and normalization**

Define strict schemas with these exact fields:

```js
const BudgetWire = z.object({
  it: z.number().int().positive(),
  ot: z.number().int().positive(),
  usd: z.number().positive(),
  try: z.number().int().min(1).max(3)
}).strict();

const NodeWire = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  k: z.enum(['extract', 'render', 'build', 'fix', 'verify']),
  dep: z.array(z.string()),
  in: z.array(z.string()),
  out: z.array(z.string()).min(1),
  p: z.array(z.string()).min(1),
  ni: z.boolean(),
  tl: z.array(z.string()).max(8),
  b: BudgetWire,
  g: z.array(z.string()).min(1)
}).strict();

const RunBudgetWire = z.object({
  usd: z.number().positive(),
  sol: z.literal(1),
  rp: z.number().int().min(0).max(1)
}).strict();

const BlueprintWire = z.object({
  v: z.literal(1), rid: z.string(), cid: z.string(),
  ctx: z.array(z.object({ id: z.string(), sha: z.string().length(64), p: z.string() }).strict()).min(1),
  nd: z.array(NodeWire).min(1),
  b: RunBudgetWire
}).strict();

const TaskResultWire = z.object({
  v: z.literal(1), rid: z.string(), cid: z.string(), nid: z.string(),
  st: z.enum(['ok', 'err', 'blocked']),
  art: z.array(z.object({ id: z.string(), sha: z.string().length(64) })),
  chg: z.array(z.string()),
  use: z.object({ it: z.number().int().nonnegative().nullable(), ct: z.number().int().nonnegative().nullable(), ot: z.number().int().nonnegative().nullable() }),
  err: z.object({ code: z.string(), msg: z.string() }).nullable()
}).strict();

const CostEventWire = z.object({
  v: z.literal(1), rid: z.string(), nid: z.string(), m: z.string(), svc: z.enum(['standard', 'batch', 'flex', 'ide']),
  it: z.number().int().nonnegative().nullable(), ct: z.number().int().nonnegative().nullable(), ot: z.number().int().nonnegative().nullable(),
  ms: z.number().int().nonnegative(), try: z.number().int().positive(), usd: z.number().nonnegative().nullable(), est: z.boolean()
}).strict();
```

Implement `parseBlueprintWire` with `BlueprintWire.parse(input)` followed by a pure mapping to descriptive names. Export `BlueprintWire`, `TaskResultWire`, `CostEventWire`, `parseBlueprintWire`, and `blueprintWireJsonSchema = z.toJSONSchema(BlueprintWire)`.

- [ ] **Step 4: Add rejection tests**

Assert that unknown keys, zero budgets, four attempts, missing paths, missing gates and unsafe client IDs are rejected. Reuse `assertSafeSlug` after Zod parsing for `runId` and `clientId`.

- [ ] **Step 5: Run focused tests and commit**

Run: `node --test test/orchestration-contracts.test.js`

Expected: all contract tests pass.

```bash
git add src/orchestration/contracts.js test/orchestration-contracts.test.js
git commit -m "feat(orchestration): define compact blueprint contracts"
```

### Task 2: Fail-closed blueprint validator

**Files:**
- Create: `src/orchestration/blueprint-validator.js`
- Create: `test/blueprint-validator.test.js`

**Interfaces:**
- Consumes normalized blueprint from Task 1.
- Produces `validateBlueprint(blueprint, policy)` returning the blueprint or throwing `BlueprintValidationError` with `violations`.
- Policy shape: `{ allowedTools: Set<string>, allowedGates: Set<string>, runBudgetUsd: number }`.

- [ ] **Step 1: Write failing tests for cycles and scope**

Create a two-node cycle `n1 → n2 → n1` and assert error violations include `DAG_CYCLE`. Add a node referencing `clientes/outro-cliente/DNA.md` and assert `CROSS_CLIENT_INPUT`.

- [ ] **Step 2: Run the validator test and confirm RED**

Run: `node --test test/blueprint-validator.test.js`

Expected: FAIL because `blueprint-validator.js` does not exist.

- [ ] **Step 3: Implement validation in deterministic order**

Implement these checks without calling a model:

```js
const checks = [
  checkUniqueNodeIds,
  checkDependenciesExist,
  checkAcyclic,
  checkContextReferencesExist,
  checkClientPaths,
  checkAllowedTools,
  checkAllowedGates,
  checkNodeBudgetTotals,
  checkRunBudget
];
```

Collect every violation, sort by `code` then `nodeId`, and throw once. This makes failures stable for tests and delta hashes.

- [ ] **Step 4: Add valid-DAG and budget tests**

Assert a valid three-node DAG returns unchanged. Assert the sum of node USD budgets above both blueprint and policy budget emits `RUN_BUDGET_EXCEEDED`.

- [ ] **Step 5: Run and commit**

Run: `node --test test/blueprint-validator.test.js test/orchestration-contracts.test.js`

```bash
git add src/orchestration/blueprint-validator.js test/blueprint-validator.test.js
git commit -m "feat(orchestration): validate blueprint scope and budgets"
```

### Task 3: Content-addressed artifact registry

**Files:**
- Create: `src/orchestration/artifact-registry.js`
- Create: `test/artifact-registry.test.js`

**Interfaces:**
- Produces `createArtifactRegistry({ rootDir, now })`.
- Registry methods: `putJson({ runId, clientId, type, value, sources })`, `read(ref)`, `verify(ref)`.
- Artifact ref: `{ id, sha256, runId, clientId, type, relativePath }`.

- [ ] **Step 1: Write the failing immutability test**

Store the same JSON twice and assert identical SHA/reference. Change one field and assert a new SHA. Attempt to read the first ref with another client ID and assert `ARTIFACT_CLIENT_MISMATCH`.

- [ ] **Step 2: Run and confirm RED**

Run: `node --test test/artifact-registry.test.js`

- [ ] **Step 3: Implement canonical hashing and immutable writes**

Canonicalize JSON by recursively sorting object keys, hash with SHA-256, and write to:

```text
<rootDir>/<clientId>/<runId>/artifacts/<type>/<sha256>.json
```

Use a temporary sibling file and `fs.renameSync` for atomic creation. If the destination exists, verify its hash and reuse it. Validate both slugs with `assertSafeSlug`.

- [ ] **Step 4: Add corruption and path-escape tests**

Mutate a stored fixture after creation and assert `verify(ref)` throws `ARTIFACT_HASH_MISMATCH`. Reject `../client` before creating any directory.

- [ ] **Step 5: Run and commit**

Run: `node --test test/artifact-registry.test.js`

```bash
git add src/orchestration/artifact-registry.js test/artifact-registry.test.js
git commit -m "feat(orchestration): add immutable artifact registry"
```

### Task 4: Append-only run and cost ledger

**Files:**
- Create: `src/orchestration/run-store.js`
- Create: `test/run-store.test.js`

**Interfaces:**
- Produces `createRunStore({ rootDir, now })`.
- Methods: `createRun(initialState)`, `appendEvent(runRef, event)`, `appendCost(runRef, costEvent)`, `loadRun(runRef)`.
- Persists `events.jsonl`, `costs.jsonl`, and an atomic `snapshot.json`.

- [ ] **Step 1: Write a failing resume test**

Create a run, append `CONTEXT_FROZEN` and `BLUEPRINT_ACCEPTED`, reconstruct a new store instance, and assert `loadRun` restores state without any conversation field.

- [ ] **Step 2: Write a failing unknown-cost test**

Append an IDE cost event with `usd: null`, `estimated: false` and assert it remains `null` after reload rather than becoming zero.

- [ ] **Step 3: Run and confirm RED**

Run: `node --test test/run-store.test.js`

- [ ] **Step 4: Implement append, fsync and snapshot replacement**

Each JSONL entry contains `{ seq, at, type, data, prev, hash }`; `prev` is the previous entry hash. On load, recompute the chain and throw `RUN_LEDGER_CORRUPT` on mismatch. Replace snapshots through `.tmp` plus rename.

- [ ] **Step 5: Add tamper and sequence tests**

Change one persisted event and assert load fails. Append two costs and assert sequence numbers are monotonic and isolated per run.

- [ ] **Step 6: Run and commit**

Run: `node --test test/run-store.test.js`

```bash
git add src/orchestration/run-store.js test/run-store.test.js
git commit -m "feat(orchestration): persist run and cost ledgers"
```

### Task 5: Single-pass Sol blueprint adapter

**Files:**
- Create: `src/orchestration/sol-blueprint-adapter.js`
- Create: `test/sol-blueprint-adapter.test.js`

**Interfaces:**
- Produces `createSolBlueprintAdapter({ responsesClient, model, staticInstructions })`.
- Adapter method: `plan({ runId, clientId, contextManifest, runBudget })`.
- Returns a normalized blueprint from `parseBlueprintWire`.

- [ ] **Step 1: Write the one-call test**

Inject a fake `responsesClient.create` that counts calls and returns valid compact JSON. Assert `plan()` calls it exactly once and returns the expanded blueprint.

- [ ] **Step 2: Write the invalid-output no-retry test**

Return prose or malformed JSON. Assert rejection code `BLUEPRINT_OUTPUT_INVALID` and call count exactly one.

- [ ] **Step 3: Run and confirm RED**

Run: `node --test test/sol-blueprint-adapter.test.js`

- [ ] **Step 4: Implement stable-prefix prompt construction**

Send `staticInstructions` as the first immutable input item. Send this dynamic object last:

```js
{
  rid: runId,
  cid: clientId,
  ctx: contextManifest,
  b: runBudget
}
```

Request `blueprintWireJsonSchema`, set the model default to `gpt-5.6-sol`, and make no retry inside the adapter. Record returned usage separately; do not add it to the blueprint.

- [ ] **Step 5: Test prompt order and dynamic isolation**

Assert the first request item is byte-identical across two runs while only the last item changes. Assert no raw file contents are inserted when the manifest contains hashes only.

- [ ] **Step 6: Run and commit**

Run: `node --test test/sol-blueprint-adapter.test.js test/orchestration-contracts.test.js`

```bash
git add src/orchestration/sol-blueprint-adapter.js test/sol-blueprint-adapter.test.js
git commit -m "feat(orchestration): add single-pass Sol planner"
```

### Task 6: XState workflow lifecycle

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/orchestration/workflow-machine.js`
- Create: `test/workflow-machine.test.js`

**Interfaces:**
- Produces `createWorkflowMachine(initialContext)` and `createWorkflowActor(machine, snapshot)`.
- Context contains `runId`, `clientId`, `planVersion`, `attempts`, `candidateArtifact`, `blockingEvidence`.

- [ ] **Step 1: Install the pinned state-machine dependency**

Run: `npm install xstate@5.32.6`

- [ ] **Step 2: Write failing legal-transition tests**

Assert this route:

```text
draft → context_ready → planning → tasks_ready → executing
→ verifying → candidate → awaiting_final_approval
```

Assert `FINAL_APPROVED` cannot move `candidate` directly to `verified`; full QA evidence must first produce `FULL_QA_PASSED`.

- [ ] **Step 3: Write failing repair-limit test**

Send `QA_BLOCKED` from `verifying`, increment attempts through two repairs, and assert the third block enters `human_intervention`.

- [ ] **Step 4: Implement the machine**

Use explicit events only. Guards inspect persisted evidence, never model self-reported confidence. Include `failed` and `human_intervention` terminal states. Export serializable snapshots.

- [ ] **Step 5: Run and commit**

Run: `node --test test/workflow-machine.test.js`

```bash
git add package.json package-lock.json src/orchestration/workflow-machine.js test/workflow-machine.test.js
git commit -m "feat(orchestration): add persisted workflow lifecycle"
```

### Task 7: Budget governor and DAG scheduler

**Files:**
- Create: `src/orchestration/budget-governor.js`
- Create: `src/orchestration/dag-scheduler.js`
- Create: `test/budget-governor.test.js`
- Create: `test/dag-scheduler.test.js`

**Interfaces:**
- `createBudgetGovernor(runBudget)` produces `authorize(node, accumulatedUsage)`.
- `createDagScheduler({ executors, verifier, runStore, budgetGovernor })` produces `execute({ runRef, blueprint })`.
- Executor interface: `execute(taskPackage) -> Promise<TaskResultWire>`.

- [ ] **Step 1: Write failing preflight budget tests**

Assert a node is rejected before executor invocation when its maximum possible cost exceeds remaining run budget. Assert missing usage is not treated as zero; it reserves the full node budget.

- [ ] **Step 2: Write failing topological execution test**

Create `n1`, `n2(dep:n1)`, `n3(dep:n1)` in shuffled input order. Assert execution order is `n1`, then deterministic lexical order `n2`, `n3`.

- [ ] **Step 3: Write failing verifier-separation test**

Make executor report `st:'ok'` while verifier rejects its artifact. Assert scheduler records failure and does not mark the node passed.

- [ ] **Step 4: Implement budget authorization**

Return `{ allowed, reservedUsd, reason }`. Reasons are `BUDGET_OK`, `NODE_BUDGET_EXCEEDS_REMAINING`, or `USAGE_UNKNOWN_RESERVE_MAX`.

- [ ] **Step 5: Implement sequential scheduler**

M2 intentionally executes one ready node at a time. For each node: authorize, build package, execute, independently verify, append result/cost events, then unlock dependencies. Do not call the planner.

- [ ] **Step 6: Add failure and resume tests**

Persist after every node. Recreate scheduler after `n1`, resume, and assert `n1` is not executed again. On executor exception, persist the failed node and transition evidence rather than swallowing it.

- [ ] **Step 7: Run and commit**

Run: `node --test test/budget-governor.test.js test/dag-scheduler.test.js`

```bash
git add src/orchestration/budget-governor.js src/orchestration/dag-scheduler.js test/budget-governor.test.js test/dag-scheduler.test.js
git commit -m "feat(orchestration): schedule bounded DAG tasks"
```

### Task 8: Controlled CLI and end-to-end control-plane proof

**Files:**
- Create: `bin/orchestrator.js`
- Modify: `package.json`
- Create: `test/orchestration-integration.test.js`
- Modify: `PROJECT_STATUS.md`

**Interfaces:**
- Commands: `start --client <slug> --context <manifest>`, `inspect --run <slug>`, `approve --run <slug> --event <event>`, `resume --run <slug>`.
- CLI uses adapters injected by a composition root; tests never call live models.

- [ ] **Step 1: Write failing CLI argument and isolation tests**

Assert missing client/context exits nonzero. Assert `--client ../other` is rejected before creating state. Assert `inspect` prints persisted JSON without prompts or source contents.

- [ ] **Step 2: Implement command parsing without a new CLI framework**

Use `process.argv`, a fixed command map and `assertSafeSlug`. Unknown commands and events fail with stable error codes.

Add `"orchestrate": "node bin/orchestrator.js"` to `package.json`; do not replace the existing `studio-dna` binary.

- [ ] **Step 3: Write the integration test**

Use fake Sol, fake script executor and independent fake verifier. Prove:

1. Sol call count is one.
2. Blueprint is validated before executor invocation.
3. A two-node run pauses after the first node.
4. A new process instance resumes the second node only.
5. Cost entries preserve `usd:null` when usage is unknown.
6. Final state is `candidate`, not `verified`.

- [ ] **Step 4: Run focused and full suites**

Run: `node --test test/orchestration-*.test.js test/blueprint-validator.test.js test/artifact-registry.test.js test/run-store.test.js test/workflow-machine.test.js test/budget-governor.test.js test/dag-scheduler.test.js`

Run: `npm test`

Expected: all existing 51 tests plus the new control-plane tests pass.

- [ ] **Step 5: Update evidence without overstating maturity**

Add observed command results to `PROJECT_STATUS.md`. Keep live Sol execution, Gemini execution, visual QA, accessibility and performance explicitly unverified unless independently executed in this run.

- [ ] **Step 6: Commit**

```bash
git add bin/orchestrator.js package.json PROJECT_STATUS.md test/orchestration-integration.test.js
git commit -m "feat(orchestration): expose resumable control plane"
```

## Plan self-review

- **Spec coverage:** Single-pass planning, compact wire format, client isolation, DAG validation, append-only evidence, XState lifecycle, budgets, unknown cost handling, independent verification, pause/resume and human intervention are mapped to Tasks 1–8.
- **Deferred intentionally:** Gemini context projection, dynamic tool schemas, Gemini IDE/API execution, error fingerprints, Batch/Flex routing and visual repair are implemented by the separate M5 executor plan.
- **YAGNI:** M2 is sequential and filesystem-backed. BullMQ, SQLite/Postgres, Temporal, concurrency and remote workers remain M8 concerns.
