# Surgical Delegation Kernel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Gemini task delegation schema-exact, scope-bounded, hash-addressed and independently verifiable before expanding visual generation.

**Architecture:** Zod is the runtime source of truth and emits JSON Schema for external agents. The filesystem Gemini IDE path remains soft-enforced: an isolated worktree, pre/post snapshots and a diff guard prove compliance after execution. Tool-mediated adapters may declare hard enforcement only after every capability passes through `PolicyEnforcer`.

**Tech Stack:** Node.js 20+, CommonJS, Zod 4, SHA-256, Node test runner, existing execution ledger and Gemini adapters.

**Spec:** `docs/superpowers/specs/2026-09-16-design-capability-orchestration-v2-design.md`

## Global Constraints

- Preserve V1 task and blueprint compatibility until the V2 pilot passes.
- Reject unknown fields and non-JSON-safe values.
- Persist descriptive property names; minify whitespace only at transport time.
- Treat `copias/` as read-only.
- A Gemini claim never substitutes for an independently calculated diff or gate result.
- No task may contain absolute paths, `..`, drive-relative paths, NTFS alternate data streams or paths outside the workspace.
- Three total implementation attempts are permitted; no fourth builder dispatch.

---

### Task 1: Canonical serialization and content hashing

**Files:**
- Create: `src/orchestration/canonical-json.js`
- Create: `src/orchestration/content-hash.js`
- Test: `test/canonical-json.test.js`

**Interfaces:**
- Produces: `canonicalize(value): string`
- Produces: `hashJson(value): string`
- Produces: `hashFile(filename): Promise<string>`

- [ ] **Step 1: Write failing tests for stable object ordering and unsafe values**

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const { canonicalize } = require('../src/orchestration/canonical-json');
const { hashJson } = require('../src/orchestration/content-hash');

test('canonical JSON is independent of property insertion order', () => {
  assert.equal(canonicalize({ b: 2, a: 1 }), '{"a":1,"b":2}');
  assert.equal(hashJson({ b: 2, a: 1 }), hashJson({ a: 1, b: 2 }));
});

test('canonical JSON rejects undefined and non-finite numbers', () => {
  assert.throws(() => canonicalize({ value: undefined }), /JSON-safe/);
  assert.throws(() => canonicalize({ value: Infinity }), /JSON-safe/);
});
```

- [ ] **Step 2: Run `node --test test/canonical-json.test.js` and confirm module-not-found failure**
- [ ] **Step 3: Implement recursive key sorting without coercing unsupported values**
- [ ] **Step 4: Run the focused test and expect all tests to pass**
- [ ] **Step 5: Commit only the three declared files with `feat(orchestrator): add canonical content hashing`**

### Task 2: Contract family V2

**Files:**
- Create: `src/contracts/v2/common.js`
- Create: `src/contracts/v2/execution-task.js`
- Create: `src/contracts/v2/task-result.js`
- Create: `src/contracts/v2/human-decision.js`
- Create: `src/contracts/v2/export-schemas.js`
- Create: `schemas/v2/` through the export command
- Test: `test/contracts-v2.test.js`

**Interfaces:**
- Produces: `validateExecutionTaskV2(input): Readonly<ExecutionTaskV2>`
- Produces: `validateTaskResultV2(input): Readonly<TaskResultV2>`
- Produces: `validateHumanDecisionV2(input): Readonly<HumanDecisionV2>`
- Produces: `exportSchemasV2(outputDirectory): string[]`

- [ ] **Step 1: Write failing table-driven tests for required fields, unknown fields and discriminated kinds**

```js
test('human checkpoints cannot masquerade as executable tasks', () => {
  const input = validExecutionTask();
  input.contractKind = 'human-decision';
  assert.throws(() => validateExecutionTaskV2(input), /contractKind/);
});

test('passed results require output manifest and evidence', () => {
  const input = validTaskResult();
  delete input.artifactManifest;
  assert.throws(() => validateTaskResultV2(input), /artifactManifest/);
});
```

- [ ] **Step 2: Run `node --test test/contracts-v2.test.js` and confirm failure**
- [ ] **Step 3: Implement strict Zod schemas with enums for status, role, capability and network mode**
- [ ] **Step 4: Export JSON Schemas and assert each schema rejects an unknown property**
- [ ] **Step 5: Add `npm run schemas:v2` mapped to `node src/contracts/v2/export-schemas.js`**
- [ ] **Step 6: Run focused tests plus `node --test test/task-contract.test.js` to prove V1 compatibility**
- [ ] **Step 7: Commit with `feat(contracts): add strict delegation contract family v2`**

### Task 3: Normative ambiguity and contradiction linter

**Files:**
- Create: `src/contracts/v2/contract-linter.js`
- Test: `test/contract-linter.test.js`

**Interfaces:**
- Consumes: validated `ExecutionTaskV2` and `DesignContractV2`
- Produces: `lintContract(contract): { passed: boolean, violations: ContractViolation[] }`

- [ ] **Step 1: Write failing fixtures for vague adjectives and conflicting requirements**

```js
test('rejects subjective language in normative assertions', () => {
  const result = lintContract({
    requirements: [{ id: 'REQ-1', assertion: 'make the hero more premium' }]
  });
  assert.equal(result.passed, false);
  assert.equal(result.violations[0].code, 'AMBIGUOUS_NORMATIVE_LANGUAGE');
});

test('rejects mutually exclusive values for one target property', () => {
  const result = lintContract({ requirements: [
    { id: 'REQ-1', target: '#hero', property: 'display', operator: 'equals', expected: 'grid' },
    { id: 'REQ-2', target: '#hero', property: 'display', operator: 'equals', expected: 'flex' }
  ] });
  assert.equal(result.violations[0].code, 'CONTRACT_CONTRADICTION');
});
```

- [ ] **Step 2: Run the focused test and confirm failure**
- [ ] **Step 3: Implement forbidden-language, duplicate-ID, unit, tolerance and contradiction rules**
- [ ] **Step 4: Add positive tests proving descriptive language remains allowed under `designIntent`**
- [ ] **Step 5: Run `node --test test/contract-linter.test.js test/contracts-v2.test.js`**
- [ ] **Step 6: Commit with `feat(contracts): reject ambiguous delegation requirements`**

### Task 4: Windows-safe policy enforcement

**Files:**
- Create: `src/orchestration/policy-enforcer.js`
- Modify: `src/orchestration/executor-adapter.js`
- Test: `test/policy-enforcer.test.js`

**Interfaces:**
- Produces: `createPolicyEnforcer({ workspaceRoot, task }): PolicyEnforcer`
- Produces methods: `authorizeRead`, `authorizeWrite`, `authorizeCapability`, `authorizeNetwork`

- [ ] **Step 1: Write failing tests for traversal, case variation, junction escape and alternate data streams**

```js
test('denies a write through a junction that resolves outside the workspace', async () => {
  const enforcer = createPolicyEnforcer({ workspaceRoot, task: scopedTask });
  await assert.rejects(enforcer.authorizeWrite('clientes/a/site/junction/escape.html'), /POLICY_DENIED/);
});

test('denies Windows alternate data stream paths', async () => {
  const enforcer = createPolicyEnforcer({ workspaceRoot, task: scopedTask });
  await assert.rejects(enforcer.authorizeWrite('clientes/a/site/index.html:payload'), /POLICY_DENIED/);
});
```

- [ ] **Step 2: Run the focused test and confirm failure**
- [ ] **Step 3: Normalize existing paths with `realpath` and non-existent outputs through their nearest existing parent**
- [ ] **Step 4: Enforce case-insensitive containment on Windows and read-only `copias/`**
- [ ] **Step 5: Require adapters to declare `enforcementMode: soft | hard`; reject `hard` unless capabilities are mediated**
- [ ] **Step 6: Run policy and existing executor tests**
- [ ] **Step 7: Commit with `feat(orchestrator): enforce scoped execution policy`**

### Task 5: Artifact manifest and undeclared-diff guard

**Files:**
- Create: `src/orchestration/artifact-manifest.js`
- Create: `src/orchestration/worktree-diff-guard.js`
- Test: `test/artifact-manifest.test.js`
- Test: `test/worktree-diff-guard.test.js`

**Interfaces:**
- Produces: `buildArtifactManifest({ workspaceRoot, paths }): Promise<ArtifactManifest>`
- Produces: `verifyDeclaredDiff({ before, after, writeAllowlist, limits }): DiffVerification`

- [ ] **Step 1: Write failing tests proving tree hashes are order-independent and content-sensitive**
- [ ] **Step 2: Write a failing test where Gemini claims one output but modifies a protected file**

```js
test('rejects any actual change outside writeAllowlist', () => {
  const result = verifyDeclaredDiff({
    before: fixtureBefore,
    after: fixtureWithPackageJsonChange,
    writeAllowlist: ['clientes/a/site/index.html'],
    limits: { maxFilesChanged: 1, maxAddedLines: 800 }
  });
  assert.equal(result.passed, false);
  assert.equal(result.violations[0].code, 'UNDECLARED_FILE_CHANGE');
});
```

- [ ] **Step 3: Implement canonical file ordering, relative paths, byte sizes and SHA-256 tree hash**
- [ ] **Step 4: Implement added/deleted/modified/renamed file accounting and line budgets**
- [ ] **Step 5: Run focused tests and verify generated files are not written during tests**
- [ ] **Step 6: Commit with `feat(orchestrator): bind results to actual workspace diff`**

### Task 6: Tamper-evident ledger and signed human decisions

**Files:**
- Create: `src/orchestration/ledger-v2.js`
- Create: `src/orchestration/human-approval.js`
- Create: `bin/generate-local-approver-key.js`
- Test: `test/ledger-v2.test.js`
- Test: `test/human-approval.test.js`

**Interfaces:**
- Produces: `LedgerV2.append(event): LedgerEvent`
- Produces: `LedgerV2.computeRunState(runId): PromotionState`
- Produces: `signDecision(decision, privateKey): SignedDecision`
- Produces: `verifyDecision(signedDecision, publicKey): true`

- [ ] **Step 1: Write failing tests for sequence gaps, changed historical payloads and invalid signatures**
- [ ] **Step 2: Implement an SHA-256 event chain and state projection without mutable truth fields**
- [ ] **Step 3: Implement Ed25519 signing over canonical decision JSON**
- [ ] **Step 4: Ensure the signing command refuses to overwrite an existing private key**
- [ ] **Step 5: Run focused tests and V1 ledger compatibility tests**
- [ ] **Step 6: Commit with `feat(orchestrator): add tamper-evident approvals`**

### Task 7: Gemini IDE bridge V2

**Files:**
- Create: `src/execution/gemini-ide-bridge-v2.js`
- Modify: `src/execution/gemini-ide-adapter.js`
- Test: `test/gemini-ide-bridge-v2.test.js`

**Interfaces:**
- Produces: `prepareExchange({ task, workspaceRoot, exchangeDir }): PreparedExchange`
- Produces: `consumeExchange({ prepared, resultPath }): VerifiedExchangeResult`

- [ ] **Step 1: Write a failing lifecycle test for prepare, pending, consume and diff verification**
- [ ] **Step 2: Write a failing test for stale result reuse from another task hash**
- [ ] **Step 3: Atomically write `task.json`, selected contract slices and `input-manifest.json`**
- [ ] **Step 4: Bind the result to `taskHash`, `inputManifestHash`, `actorId` and actual diff**
- [ ] **Step 5: Report `human-trigger-required` when no IDE automation hook is configured**
- [ ] **Step 6: Preserve the V1 adapter and select V2 explicitly**
- [ ] **Step 7: Run bridge, adapter and contract tests**
- [ ] **Step 8: Commit with `feat(gemini): add verifiable IDE exchange v2`**

### Task 8: Integrate V2 into the orchestrator behind a feature flag

**Files:**
- Create: `src/orchestration/workflow-orchestrator-v2.js`
- Modify: `bin/orchestrator.js`
- Create: `test/orchestrator-v2-adversarial.test.js`
- Modify: `package.json`

**Interfaces:**
- Produces CLI: `studio-dna orchestrate v2 prepare|inspect|consume|verify|approve`
- Produces: `runWorkflowV2(options): Promise<WorkflowV2Result>`

- [ ] **Step 1: Add adversarial tests for ambiguous contract, cross-client read, undeclared write, stale result, same builder/verifier and unsigned approval**
- [ ] **Step 2: Run the adversarial test and confirm every scenario currently fails for the expected missing capability**
- [ ] **Step 3: Wire validation, linting, policy, manifest, diff guard and ledger in fail-closed order**
- [ ] **Step 4: Implement attempt semantics as total attempts `1..3`; block before attempt `4`**
- [ ] **Step 5: Keep V2 off by default and prevent V1 from producing `verified` or `production` while a V2 run owns the client artifact**
- [ ] **Step 6: Run all focused orchestration tests**
- [ ] **Step 7: Run `npm test` and require zero failures**
- [ ] **Step 8: Commit with `feat(orchestrator): integrate surgical delegation v2`**

## Completion criteria

- An ambiguous requirement never reaches Gemini.
- A missing input produces `blocked`, not invented output.
- Any undeclared file change fails regardless of the model result JSON.
- Task, inputs, outputs, evidence and approval are hash-linked.
- Filesystem IDE execution is labeled soft-enforced.
- V1 remains operational during the pilot.
- The full repository test suite passes in a clean checkout.

