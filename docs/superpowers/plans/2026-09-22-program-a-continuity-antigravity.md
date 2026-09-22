# Program A — Continuity and Antigravity Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a provider-neutral continuity control plane that Antigravity can operate, another harness can resume, and independent verification can trust without chat history.

**Architecture:** Add a V2 continuity layer beside the existing V1 orchestration path. Canonical state, roadmap, tasks, results, evidence and decisions live in strict hash-bound repository artifacts; harness adapters only translate those artifacts. Antigravity is the primary workspace adapter through a local plugin and filesystem exchange, while Gemini IDE, Codex, Claude and manual execution use the same adapter contract.

**Tech Stack:** Node.js 20+, CommonJS, Zod 4, `node:test`, Git CLI, atomic JSON files, Antigravity workspace plugins and native subagents.

**Spec:** `docs/superpowers/specs/2026-09-22-antigravity-executable-continuity-and-transmutation-design.md`

## Global Constraints

- The repository remains `experimental` until fresh promotion evidence says otherwise.
- Runtime evidence and executable tests override documentation, comments and executor claims.
- Label material conclusions as `observed`, `derived`, `inferred` or `unknown`.
- Preserve unrelated dirty files, client artifacts and all raw `copias/` evidence.
- Use a dedicated branch or worktree for material implementation.
- Write a failing regression test before changing production behavior.
- Preview, QA and promotion must evaluate the same immutable artifact.
- Builder and verifier actor identities must differ for material tasks.
- Read only the active client's DNA, brand specification, content and decisions.
- Network access is deny-by-default and host-allowlisted per task.
- Unknown fields are rejected from canonical contracts.
- Human gates cannot be satisfied by an agent.
- Existing V1 commands remain behavior-compatible until a separate deprecation gate.
- Do not add a graph database, Antigravity SDK dependency or remote service in Program A.
- Do not update `PROJECT_STATUS.md` until fresh commands produce the cited evidence.

## Review Focus

1. **Pre-existing dirty worktree:** diff verification must distinguish user-owned changes present before dispatch from executor changes; Task 5 tests this.
2. **Windows path aliases, case and junctions:** allowlists must resist `..`, case aliases, symlinks, junctions and alternate data streams; Task 5 tests this.
3. **Stale result after restart:** another task, attempt or input hash must be rejected; Tasks 6 and 9 test this.
4. **Unavailable harness capability:** only dependent DAG nodes block; Tasks 3 and 6 test this.
5. **Forged success or same-actor verification:** executor `passed` claims and builder/verifier collisions are rejected; Tasks 8 and 9 test this.

---

## Planned File Structure

```text
src/shared/canonical-json.js
src/continuity/
  contracts.js
  file-store.js
  event-ledger.js
  state-store.js
  roadmap-engine.js
  baseline-audit.js
  workspace-manifest.js
  diff-guard.js
  drift-checker.js
  recovery.js
src/orchestration/
  adapter-contract-v2.js
  workflow-orchestrator-v2.js
src/execution/
  filesystem-handoff-adapter.js
  antigravity-adapter.js
  gemini-ide-adapter-v2.js
  handoff-profiles.js
scripts/
  generate-continuity-schemas.js
  init-continuity.js
  run-continuity-conformance.js
  run-clean-checkout-continuity-drill.js
schemas/v2/
  continuity-state.schema.json
  roadmap.schema.json
  execution-task.schema.json
  task-result.schema.json
  evidence-manifest.schema.json
  human-decision.schema.json
  capability-report.schema.json
continuity/
  CHARTER.md
  CURRENT_STATE.json
  ROADMAP.json
  RECOVERY.md
  decisions/
  evidence/
  runs/
  tasks/program-a/
.agents/plugins/studio-dna-orchestrator/
  plugin.json
  skills/resume-studio-dna/SKILL.md
  agents/studio-dna-researcher.md
  agents/studio-dna-builder.md
  agents/studio-dna-verifier.md
  rules/evidence-authority.md
```

The V1 files `src/orchestration/blueprint.js`, `src/orchestration/workflow-orchestrator.js` and `src/execution/gemini-ide-adapter.js` remain in place. V2 may reuse stable primitives but V1 must not interpret V2 contracts.

## Temporary Antigravity Bootstrap

Tasks 1–6 run before the workspace plugin exists. Start the plan in Antigravity with this exact prompt:

```text
Read AGENTS.md, the approved specification at
docs/superpowers/specs/2026-09-22-antigravity-executable-continuity-and-transmutation-design.md,
and the implementation plan at
docs/superpowers/plans/2026-09-22-program-a-continuity-antigravity.md.

Create a native task artifact containing every task and step. Execute one task at
a time with TDD. Use a fresh full-capability subagent as builder and a different
fresh subagent as verifier before advancing. Use read-only research subagents only
for investigation. Preserve all pre-existing dirty files. Never mark a task passed
from the builder's report; require the listed command and actual Git diff. Stop on
ambiguity, missing capability, unexpected file change or human gate.

Prefer Gemini Flash for bounded implementation when the installed Antigravity
surface exposes it. Do not substitute a high-cost architect inside repair loops.
```

After Task 7, invoke `resume-studio-dna` and continue through the canonical adapter. If the installed Antigravity surface does not expose the named model or subagent capability, record `CAPABILITY_UNAVAILABLE` and use the manual handoff profile; do not silently change the plan.

### Task 1: Shared Canonical JSON and Atomic File Store

**Files:**
- Create: `src/shared/canonical-json.js`
- Modify: `src/design/canonical-json.js`
- Create: `src/continuity/file-store.js`
- Test: `test/continuity-primitives.test.js`
- Run regression: `test/reference-authority-and-v2-transmuter.test.js`

**Interfaces:**
- Produces: `canonicalize(value): string`
- Produces: `hashCanonical(value): string`
- Produces: `readJsonFile(filename): unknown`
- Produces: `writeJsonAtomic(filename, value): void`
- Produces: `writeTextAtomic(filename, value): void`

- [ ] **Step 1: Write failing primitive tests**

```js
test('canonical hash is stable across object key order', () => {
  assert.equal(hashCanonical({ b: 2, a: 1 }), hashCanonical({ a: 1, b: 2 }));
});

test('atomic JSON write leaves only the destination', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'continuity-store-'));
  const target = path.join(root, 'state.json');
  writeJsonAtomic(target, { schemaVersion: 2, revision: 1 });
  assert.deepEqual(readJsonFile(target), { revision: 1, schemaVersion: 2 });
  assert.deepEqual(fs.readdirSync(root), ['state.json']);
  fs.rmSync(root, { recursive: true, force: true });
});
```

- [ ] **Step 2: Run RED**

Run: `node --test test/continuity-primitives.test.js`
Expected: FAIL because the shared and continuity modules do not exist.

- [ ] **Step 3: Extract canonical JSON and add atomic persistence**

Move the complete current implementation into `src/shared/canonical-json.js`. Replace `src/design/canonical-json.js` with:

```js
'use strict';
module.exports = require('../shared/canonical-json');
```

Create `src/continuity/file-store.js`:

```js
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { canonicalize } = require('../shared/canonical-json');

function writeTextAtomic(filename, value) {
  const absolute = path.resolve(filename);
  const temporary = absolute + '.' + process.pid + '.' + Date.now() + '.tmp';
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  try {
    fs.writeFileSync(temporary, String(value), 'utf8');
    fs.renameSync(temporary, absolute);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
}
function writeJsonAtomic(filename, value) { writeTextAtomic(filename, canonicalize(value)); }
function readJsonFile(filename) { return JSON.parse(fs.readFileSync(path.resolve(filename), 'utf8')); }
module.exports = { readJsonFile, writeJsonAtomic, writeTextAtomic };
```

- [ ] **Step 4: Run GREEN and compatibility tests**

Run: `node --test test/continuity-primitives.test.js test/reference-authority-and-v2-transmuter.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```powershell
git add src/shared/canonical-json.js src/design/canonical-json.js src/continuity/file-store.js test/continuity-primitives.test.js
git commit -m "refactor(core): share canonical artifact primitives"
```

### Task 2: Strict Continuity Contracts and Generated JSON Schemas

**Files:**
- Create: `src/continuity/contracts.js`
- Create: `scripts/generate-continuity-schemas.js`
- Create: `schemas/v2/continuity-state.schema.json`
- Create: `schemas/v2/roadmap.schema.json`
- Create: `schemas/v2/execution-task.schema.json`
- Create: `schemas/v2/task-result.schema.json`
- Create: `schemas/v2/evidence-manifest.schema.json`
- Create: `schemas/v2/human-decision.schema.json`
- Create: `schemas/v2/capability-report.schema.json`
- Modify: `package.json`
- Test: `test/continuity-contracts.test.js`

**Interfaces:**
- Consumes: canonical primitives from Task 1
- Produces: `validateContinuityState`, `validateRoadmap`, `validateExecutionTask`, `validateTaskResultV2`, `validateEvidenceManifest`, `validateHumanDecision`, `validateCapabilityReport`
- Produces: `generateContinuitySchemas(outputDirectory)`

- [ ] **Step 1: Write table-driven failing contract tests**

Create one valid fixture per contract. Prove rejection of unknown fields, unsorted or duplicate IDs, malformed hashes, invalid state names, non-relative paths, missing human authority and builder/verifier identity collision.

```js
test('task rejects ambiguous authority and unknown fields', () => {
  const task = validExecutionTask();
  assert.throws(() => validateExecutionTask({ ...task, instructions: 'make it premium' }), /unrecognized|unknown/i);
  assert.throws(() => validateExecutionTask({
    ...task,
    authority: { ...task.authority, writeAllowlist: ['../outside'] }
  }), /workspace-relative/i);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test test/continuity-contracts.test.js`
Expected: FAIL because `contracts.js` does not exist.

- [ ] **Step 3: Implement closed vocabularies**

```js
const TaskState = z.enum([
  'draft', 'ready', 'running', 'produced', 'verifying',
  'passed', 'failed', 'blocked', 'human-review-required',
  'approved', 'closed'
]);
const NodeType = z.enum(['agent-task', 'human-gate', 'external-input']);
const EpistemicStatus = z.enum(['observed', 'derived', 'inferred', 'unknown']);
const ActorRole = z.enum(['architect', 'researcher', 'builder', 'verifier', 'human']);
const ProjectStatus = z.enum(['experimental', 'candidate', 'verified', 'production']);
const Sha256 = z.string().regex(/^sha256:[a-f0-9]{64}$/);
const WorkspacePath = z.string().min(1).refine(value =>
  !path.isAbsolute(value) && !value.split(/[\\/]+/).includes('..') && !value.includes(':'),
  'path must be workspace-relative'
);
```

All objects use `.strict()`. Dependency, path, evidence and capability arrays are unique and ordinally sorted. Executor results allow only `produced`, `failed` or `blocked`; `passed` is verifier-owned.

Implement these required shapes exactly:

| Contract | Required fields |
|---|---|
| `continuity-state` | `schemaVersion`, `contractKind`, `revision`, `projectStatus`, `activeProgramId`, `activeWaveId` nullable, `lastEventHash`, `updatedAt`, `nextEligibleTaskIds`, `blockedReasonCodes` |
| `roadmap` | `schemaVersion`, `contractKind`, `roadmapId`, `specHash`, `programs`, `nodes`; each node has `id`, `programId`, `type`, `state`, `dependsOn`, `taskPath` nullable, `requiredCapabilities`, `humanAuthorityId` nullable, `blockedReasonCode` nullable |
| `execution-task` | `schemaVersion`, `contractKind`, `taskId`, `programId`, `waveId`, `state`, `dependsOn`, `role`, `requiredCapabilities`, `inputs`, `authority`, `requirements`, `commands`, `budget`, `failurePolicy`, `expectedArtifacts` |
| `task-result` | `schemaVersion`, `contractKind`, `runId`, `taskId`, `attempt`, `actor`, `status`, `taskHash`, `inputManifestHash`, `outputManifestHash` nullable, `changedPaths`, `evidenceIds`, `usage`, `error` nullable |
| `evidence-manifest` | `schemaVersion`, `contractKind`, `evidenceId`, `epistemicStatus`, `artifactHash`, `sourceEvidenceIds`, `producerActorId`, `createdAt`, `payloadPath` |
| `human-decision` | `schemaVersion`, `contractKind`, `decisionId`, `authorityId`, `nodeId`, `taskHash`, `artifactHash`, `decision`, `decidedAt`, `signature` |
| `capability-report` | `schemaVersion`, `contractKind`, `harnessId`, `harnessVersion`, `observedAt`, `capabilities`, `reportHash` |

`signature` is strict `{ algorithm: "Ed25519", keyId, signedPayload, signatureBase64 }`. The signed payload is the canonical decision without `signature`. `authority.network` is strict `{ mode: "deny" | "allowlist", hosts }`. Capability entries are strict `{ id, status: "observed" | "unverified" | "unavailable", evidenceIds }`. `reportHash` is computed over the capability report without `reportHash`.

Add cross-field refinements: `produced` results require `outputManifestHash`; `failed` and `blocked` results require `error`; `observed` evidence has no source IDs; `derived` and `inferred` evidence require at least one source ID; `unknown` requires a non-empty reason in the payload.

Nested task/result objects are also strict:

- task input: `{ path, sha256, purpose }`;
- authority: `{ readAllowlist, writeAllowlist, network }`;
- requirement: `{ id, kind: "behavior" | "security" | "evidence" | "human-gate", assertion }`;
- commands: `{ red, verify }`;
- budget: `{ maxAttempts, timeoutMs, maxFilesChanged }`;
- failure policy: `{ ambiguity, missingInput, policyViolation, acceptanceFailure }` using `blocked`, `failed`, `failed-no-retry` or `human-review-required`;
- expected artifact: `{ path, mediaType }`;
- result actor: `{ actorId, role, harnessId }`;
- usage: `{ inputTokens, outputTokens, durationMs }` with non-negative safe integers;
- error: `{ code, message, evidenceIds }`;
- human decision value: `approve`, `reject` or `request-changes`.

Use one refinement helper for canonical arrays:

```js
const sortedUniqueStrings = z.array(z.string().min(1)).refine(items =>
  items.every((item, index) => index === 0 || items[index - 1] < item),
  'items must be unique and canonically sorted'
);
```

- [ ] **Step 4: Generate schemas deterministically**

Export `SCHEMAS` from `contracts.js`. Use `z.toJSONSchema` plus `writeJsonAtomic` in the generator. Add `"schemas:continuity": "node scripts/generate-continuity-schemas.js"` to the existing package scripts without removing another script.

- [ ] **Step 5: Run the generator twice and compare hashes**

```powershell
npm run schemas:continuity
$first = (Get-FileHash schemas/v2/*.schema.json).Hash
npm run schemas:continuity
$second = (Get-FileHash schemas/v2/*.schema.json).Hash
Compare-Object $first $second
```

Expected: no output from `Compare-Object`.

- [ ] **Step 6: Run GREEN and V1 tests**

Run: `node --test test/continuity-contracts.test.js test/task-contract.test.js test/blueprint.test.js`
Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/continuity/contracts.js scripts/generate-continuity-schemas.js schemas/v2 package.json test/continuity-contracts.test.js
git commit -m "feat(continuity): add strict canonical contracts"
```

### Task 3: Revisioned State, Hash-Linked Ledger and Roadmap Engine

**Files:**
- Create: `src/continuity/event-ledger.js`
- Create: `src/continuity/state-store.js`
- Create: `src/continuity/evidence-store.js`
- Create: `src/continuity/human-decision-authority.js`
- Create: `src/continuity/roadmap-engine.js`
- Test: `test/continuity-state-store.test.js`
- Test: `test/continuity-authority.test.js`
- Test: `test/continuity-roadmap-engine.test.js`

**Interfaces:**
- Produces: `createEventLedger({ filename, clock })` with `appendEvent` and `verifyChain`
- Produces: `createStateStore({ filename, ledger })` with `load`, `initialize` and `compareAndSwap`
- Produces: `createEvidenceStore({ directory })` with `put` and `get`
- Produces: `verifyHumanDecision({ decision, trustedPublicKeys })`
- Produces: `validateRoadmapSemantics`, `selectReadyNodes`, `transitionNode` and `applyHumanDecision`

- [ ] **Step 1: Write failing state, tamper and authority tests**

Cover revision conflicts, edited history, wrong previous hash, evidence replacement, wrong Ed25519 key, changed signed payload, cycles, unknown dependencies, invalid transitions, an agent approving a human gate, a missing capability and an unrelated node remaining ready.

```js
test('compareAndSwap rejects stale writers', () => {
  const store = makeStore();
  store.initialize(validState({ revision: 0 }));
  store.compareAndSwap(0, state => ({ ...state, activeWave: 'wave-1' }));
  assert.throws(() => store.compareAndSwap(0, state => state), error => error.code === 'STATE_REVISION_CONFLICT');
});

test('missing capability blocks only its branch', () => {
  const ready = selectReadyNodes({
    roadmap: roadmapWithParallelNodes(),
    capabilityReports: [capabilityReport(['filesystem.patch'])]
  });
  assert.deepEqual(ready.map(node => node.id), ['file-node']);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test test/continuity-state-store.test.js test/continuity-roadmap-engine.test.js`
Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement hash-linked events and compare-and-swap**

Each event contains `sequence`, `occurredAt` from an injected clock, `type`, `payload`, `previousHash` and an `eventHash` over those five fields. The first previous hash is `sha256:` plus 64 zeroes. The store validates current state, requires the exact revision, forces `revision + 1` and persists atomically.

- [ ] **Step 4: Implement immutable evidence and human authority**

`evidence-store.js` validates a manifest, derives its canonical hash, writes it under that hash and refuses replacement when existing bytes differ. `verifyHumanDecision` canonicalizes the unsigned decision payload, requires `algorithm: "Ed25519"`, resolves `keyId` only from the caller-provided `trustedPublicKeys` map and verifies the detached signature with `crypto.verify`. `applyHumanDecision` accepts only a successfully verified decision bound to the exact node, task and artifact hashes.

- [ ] **Step 5: Implement the closed transition map**

```js
const TRANSITIONS = Object.freeze({
  draft: ['ready', 'blocked'],
  ready: ['running', 'blocked'],
  running: ['produced', 'failed', 'blocked'],
  produced: ['verifying'],
  verifying: ['passed', 'failed', 'human-review-required'],
  passed: ['approved', 'closed'],
  failed: ['ready', 'human-review-required'],
  blocked: ['ready', 'human-review-required'],
  'human-review-required': ['approved', 'blocked'],
  approved: ['closed'],
  closed: []
});
```

Only a verifier may set `passed`. Only the declared human authority may approve a `human-gate`. Ready nodes require satisfied dependencies, a valid task file and all required observed capabilities.

- [ ] **Step 6: Run GREEN**

Run: `node --test test/continuity-state-store.test.js test/continuity-authority.test.js test/continuity-roadmap-engine.test.js`
Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/continuity/event-ledger.js src/continuity/state-store.js src/continuity/evidence-store.js src/continuity/human-decision-authority.js src/continuity/roadmap-engine.js test/continuity-state-store.test.js test/continuity-authority.test.js test/continuity-roadmap-engine.test.js
git commit -m "feat(continuity): govern state and roadmap transitions"
```

### Task 4: Truth Baseline and Canonical Continuity Seed

**Files:**
- Create: `src/continuity/baseline-audit.js`
- Create: `scripts/init-continuity.js`
- Create: `continuity/CHARTER.md`
- Create: `continuity/CURRENT_STATE.json`
- Create: `continuity/ROADMAP.json`
- Create: `continuity/RECOVERY.md`
- Create: `continuity/decisions/.gitkeep`
- Create: `continuity/evidence/.gitkeep`
- Create: `continuity/runs/.gitkeep`
- Create: `continuity/tasks/program-a/A-01-primitives.task.json`
- Create: `continuity/tasks/program-a/A-02-contracts.task.json`
- Create: `continuity/tasks/program-a/A-03-state-roadmap.task.json`
- Create: `continuity/tasks/program-a/A-04-baseline.task.json`
- Create: `continuity/tasks/program-a/A-05-diff-guard.task.json`
- Create: `continuity/tasks/program-a/A-06-handoff.task.json`
- Create: `continuity/tasks/program-a/A-07-antigravity.task.json`
- Create: `continuity/tasks/program-a/A-08-gemini-v2.task.json`
- Create: `continuity/tasks/program-a/A-09-orchestrator-v2.task.json`
- Create: `continuity/tasks/program-a/A-10-recovery.task.json`
- Create: `continuity/tasks/program-a/A-11-conformance.task.json`
- Test: `test/continuity-baseline.test.js`

**Interfaces:**
- Produces: `auditBaseline({ workspaceRoot, runCommand }): BaselineReport`
- Produces CLI: `node scripts/init-continuity.js --workspace . --spec docs/superpowers/specs/2026-09-22-antigravity-executable-continuity-and-transmutation-design.md [--verified-evidence evidence.json] [--check]`

- [ ] **Step 1: Write the failing baseline test**

Use a temporary Git fixture with committed, modified and untracked files. Verify branch, HEAD and dirty paths are observed while historical `PROJECT_STATUS.md` claims remain documented, not current.

```js
test('baseline records dirty paths without claiming them as generated work', () => {
  const report = auditBaseline({ workspaceRoot: fixture.root, runCommand: fixture.git });
  assert.equal(report.epistemicStatus, 'observed');
  assert.deepEqual(report.dirtyPaths, ['owned.txt', 'untracked.txt']);
  assert.equal(report.claims.fullSuiteCurrent, false);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test test/continuity-baseline.test.js`
Expected: FAIL because `baseline-audit.js` does not exist.

- [ ] **Step 3: Implement the read-only audit**

Run only `git rev-parse --show-toplevel`, `git branch --show-current`, `git rev-parse HEAD`, `git status --porcelain=v1 -z` and `git log -1 --format=%cI`. Do not read unrelated client contents and do not run the full suite during initialization.

- [ ] **Step 4: Implement idempotent initialization**

The initializer validates the approved spec, writes the four canonical root artifacts, creates a Phase 0–14 roadmap, sets Program A nodes to evidence-backed current states and later-program nodes to `blocked` with `blockedReasonCode: "DESIGN_APPROVAL_REQUIRED"`, and initializes revision 0. It refuses overwrite unless `--check` is present; `--check` validates without writing.

Generate all eleven Program A task contracts from a frozen `PROGRAM_A_TASKS` array embedded in the initializer. Each entry uses the exact task number, files and verification command from this plan. Dependencies are:

```text
A-01 → A-02 → A-03 → A-04 → A-05 → A-06 → A-07
                                             A-06 → A-08
                                             A-07 + A-08 → A-09 → A-10 → A-11
```

Task states are imported only from verifier evidence supplied with `--verified-evidence <manifest>`. Without that argument, previously executed tasks remain `produced` or `verifying` rather than being declared passed. This allows the temporary bootstrap to hand control to the canonical orchestrator without inventing history.

- [ ] **Step 5: Initialize and check twice**

```powershell
node scripts/init-continuity.js --workspace . --spec docs/superpowers/specs/2026-09-22-antigravity-executable-continuity-and-transmutation-design.md
node scripts/init-continuity.js --workspace . --spec docs/superpowers/specs/2026-09-22-antigravity-executable-continuity-and-transmutation-design.md --check
node scripts/init-continuity.js --workspace . --spec docs/superpowers/specs/2026-09-22-antigravity-executable-continuity-and-transmutation-design.md --check
```

Expected: both checks pass without changing Git status.

- [ ] **Step 6: Commit**

```powershell
git add src/continuity/baseline-audit.js scripts/init-continuity.js continuity test/continuity-baseline.test.js
git commit -m "feat(continuity): seed authoritative project state"
```

### Task 5: Workspace Manifest and Actual Diff Guard

**Files:**
- Create: `src/continuity/workspace-manifest.js`
- Create: `src/continuity/diff-guard.js`
- Test: `test/continuity-diff-guard.test.js`

**Interfaces:**
- Produces: `createWorkspaceManifest({ workspaceRoot, runGit }): WorkspaceManifest`
- Produces: `verifyWorkspaceDiff({ before, after, task }): DiffVerification`
- Produces: `assertAllowedWorkspacePath({ workspaceRoot, candidate, allowlist }): string`

- [ ] **Step 1: Write adversarial failing tests**

Cover added, modified, deleted and renamed files; unchanged pre-existing dirt; changed pre-existing dirt; traversal; absolute paths; Windows case aliases; alternate data streams; escaping symlinks or junctions; non-existent output parents; and `maxFilesChanged`.

```js
test('unchanged pre-existing dirt is not attributed to the executor', () => {
  const verification = verifyWorkspaceDiff({
    before: manifest({ 'user-owned.txt': 'sha256:a', 'task.txt': 'sha256:b' }),
    after: manifest({ 'user-owned.txt': 'sha256:a', 'task.txt': 'sha256:c' }),
    task: taskAllowing(['task.txt'])
  });
  assert.deepEqual(verification.changedPaths, ['task.txt']);
  assert.deepEqual(verification.violations, []);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test test/continuity-diff-guard.test.js`
Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement manifest collection**

Use `git ls-files --cached --others --exclude-standard -z`. Normalize separators to `/`, sort ordinally and hash regular files. Record symlink targets without following them. Reject paths whose real existing ancestor resolves outside the workspace.

- [ ] **Step 4: Implement three-way attribution**

Compare pre-dispatch manifest, post-execution manifest and task authority. Return `added`, `modified`, `deleted`, `changedPaths` and `violations`. Pre-existing dirt is allowed only while unchanged. A changed dirty path still requires explicit write authorization.

- [ ] **Step 5: Run GREEN and path regressions**

Run: `node --test test/continuity-diff-guard.test.js test/server-security.test.js`
Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add src/continuity/workspace-manifest.js src/continuity/diff-guard.js test/continuity-diff-guard.test.js
git commit -m "feat(continuity): verify actual workspace changes"
```

### Task 6: Provider-Neutral Adapter and Durable Filesystem Handoff

**Files:**
- Create: `src/orchestration/adapter-contract-v2.js`
- Create: `src/execution/filesystem-handoff-adapter.js`
- Create: `src/execution/handoff-profiles.js`
- Test: `test/adapter-contract-v2.test.js`
- Test: `test/filesystem-handoff-adapter.test.js`

**Interfaces:**
- Produces: `assertExecutorAdapterV2(adapter)`
- Produces: `createFilesystemHandoffAdapter(options): ExecutorAdapterV2`
- Adapter methods: `detectCapabilities`, `prepareTask`, `dispatch`, `inspect`, `ingestResult`, `cancel`, `projectStatus`
- Produces profiles: `antigravity`, `gemini-ide`, `codex`, `claude`, `manual`

- [ ] **Step 1: Write failing conformance tests**

Test missing methods, malformed capability reports, atomic package creation, stale task hash, wrong attempt, result replay after restart, cancellation and timeout. `dispatch` may return `awaiting-external-executor` but may not claim the task ran.

```js
test('filesystem handoff rejects stale result after restart', () => {
  const prepared = createFilesystemHandoffAdapter(options).prepareTask(validTask());
  writeResult(prepared, { taskHash: differentSha256 });
  const restarted = createFilesystemHandoffAdapter(options);
  assert.throws(() => restarted.ingestResult(prepared.runIdentity), error =>
    error.code === 'RESULT_TASK_HASH_MISMATCH'
  );
});
```

- [ ] **Step 2: Run RED**

Run: `node --test test/adapter-contract-v2.test.js test/filesystem-handoff-adapter.test.js`
Expected: FAIL because the modules do not exist.

- [ ] **Step 3: Implement the interface assertion**

```js
const REQUIRED_METHODS = Object.freeze([
  'detectCapabilities', 'prepareTask', 'dispatch', 'inspect',
  'ingestResult', 'cancel', 'projectStatus'
]);
function assertExecutorAdapterV2(adapter) {
  for (const method of REQUIRED_METHODS) {
    if (!adapter || typeof adapter[method] !== 'function') {
      throw new TypeError('adapter.' + method + ' must be a function');
    }
  }
  return adapter;
}
```

- [ ] **Step 4: Implement restart-safe exchange**

Persist each attempt under:

```text
continuity/runs/{runId}/{taskId}/{attempt}/
  task.json
  before-manifest.json
  dispatch.json
  result.json
  after-manifest.json
  verification.json
```

`prepareTask` computes task and input hashes. `dispatch` records `awaiting-external-executor`. `ingestResult` validates run, task, attempt, actor, task hash and input manifest hash.

- [ ] **Step 5: Add declarative profiles**

Profiles contain only harness identity, exchange naming and declared capabilities. They cannot alter a canonical task. Codex, Claude and manual profiles are handoff formats, not unattended-integration claims.

- [ ] **Step 6: Run GREEN and V1 adapter tests**

Run: `node --test test/adapter-contract-v2.test.js test/filesystem-handoff-adapter.test.js test/gemini-ide-adapter.test.js`
Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/orchestration/adapter-contract-v2.js src/execution/filesystem-handoff-adapter.js src/execution/handoff-profiles.js test/adapter-contract-v2.test.js test/filesystem-handoff-adapter.test.js
git commit -m "feat(orchestrator): add portable V2 handoffs"
```

### Task 7: Antigravity Workspace Plugin and Primary Adapter

**Files:**
- Create: `src/execution/antigravity-adapter.js`
- Create: `.agents/plugins/studio-dna-orchestrator/plugin.json`
- Create: `.agents/plugins/studio-dna-orchestrator/skills/resume-studio-dna/SKILL.md`
- Create: `.agents/plugins/studio-dna-orchestrator/agents/studio-dna-researcher.md`
- Create: `.agents/plugins/studio-dna-orchestrator/agents/studio-dna-builder.md`
- Create: `.agents/plugins/studio-dna-orchestrator/agents/studio-dna-verifier.md`
- Create: `.agents/plugins/studio-dna-orchestrator/rules/evidence-authority.md`
- Test: `test/antigravity-adapter.test.js`

**Interfaces:**
- Consumes: filesystem adapter from Task 6
- Produces: `createAntigravityAdapter(options): ExecutorAdapterV2`
- Produces: `renderAntigravityTaskArtifact` and `renderAntigravityDispatchPrompt`

- [ ] **Step 1: Write failing projection tests**

Prove the plugin manifest is minimal and valid, task artifacts contain every requirement and forbidden action, research is read-only, builder/verifier roles differ, missing native capability remains `unverified` and no projection grants approval authority.

- [ ] **Step 2: Run RED**

Run: `node --test test/antigravity-adapter.test.js`
Expected: FAIL because the adapter and plugin do not exist.

- [ ] **Step 3: Create the official workspace plugin shape**

```json
{
  "$schema": "https://antigravity.google/schemas/v1/plugin.json",
  "name": "studio-dna-orchestrator",
  "description": "Operates Studio DNA canonical tasks without granting agents approval authority."
}
```

Do not edit global Antigravity configuration. Workspace discovery under `.agents/plugins/` is the primary path.

- [ ] **Step 4: Write the resume skill and role boundaries**

The skill reads `AGENTS.md` and the four canonical continuity roots, runs `status` and `next`, creates the native task artifact, uses `research` for read-only work and `self` for bounded builder/verifier work, forbids actor reuse, writes `produced` rather than `passed`, and stops on human gates, unavailable capability or hash mismatch.

- [ ] **Step 5: Implement projections**

The adapter wraps Task 6, emits `task-artifact.md` and `dispatch-prompt.md` beside `task.json`, and reports native capabilities as `unverified` until a version-bound live conformance report exists.

- [ ] **Step 6: Run GREEN**

Run: `node --test test/antigravity-adapter.test.js test/filesystem-handoff-adapter.test.js`
Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/execution/antigravity-adapter.js .agents/plugins/studio-dna-orchestrator test/antigravity-adapter.test.js
git commit -m "feat(antigravity): add canonical workspace adapter"
```

### Task 8: Gemini IDE V2 and Cross-Harness Contract Proof

**Files:**
- Create: `src/execution/gemini-ide-adapter-v2.js`
- Create: `test/gemini-ide-adapter-v2.test.js`
- Modify: `test/filesystem-handoff-adapter.test.js`

**Interfaces:**
- Consumes: filesystem adapter and `gemini-ide` profile
- Produces: `createGeminiIdeAdapterV2(options): ExecutorAdapterV2`

- [ ] **Step 1: Write failing V2 bridge tests**

Cover strict task preparation, absence of other-client context, stale V1 result rejection, executor `passed` rejection, input-manifest mismatch, actual-diff handoff and restart-safe inspection.

```js
test('V2 bridge rejects executor self-approval', () => {
  const prepared = adapter.prepareTask(validTask());
  writeRawResult(prepared, { ...validProducedResult(prepared), status: 'passed' });
  assert.throws(() => adapter.ingestResult(prepared.runIdentity), /status|verifier/i);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test test/gemini-ide-adapter-v2.test.js`
Expected: FAIL because the bridge does not exist.

- [ ] **Step 3: Implement the profile specialization**

Use the Task 6 directory protocol. Emit `gemini-prompt.md` with only the selected task, allowed inputs, requirements and result-writing rules. Do not include the full Vault, another client or conversation history.

- [ ] **Step 4: Prove the same task hash across two harnesses**

Prepare one canonical task through Antigravity and Gemini IDE. Remove transport metadata and assert identical canonical task hashes.

- [ ] **Step 5: Run GREEN and V1 compatibility**

Run: `node --test test/gemini-ide-adapter.test.js test/gemini-ide-adapter-v2.test.js test/filesystem-handoff-adapter.test.js`
Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add src/execution/gemini-ide-adapter-v2.js test/gemini-ide-adapter-v2.test.js test/filesystem-handoff-adapter.test.js
git commit -m "feat(gemini): bridge canonical V2 handoffs"
```

### Task 9: V2 Orchestrator Lifecycle and CLI

**Files:**
- Create: `src/orchestration/workflow-orchestrator-v2.js`
- Modify: `bin/orchestrator.js`
- Modify: `bin/cli.js`
- Test: `test/workflow-orchestrator-v2.test.js`
- Test: `test/orchestrator-cli-v2.test.js`
- Run regression: `test/workflow-orchestrator.test.js`

**Interfaces:**
- Produces: `createWorkflowOrchestratorV2(options)`
- Produces methods: `status`, `next`, `prepare`, `consume`, `verify`, `approve` and `recover`
- Produces CLI: `studio-dna orchestrate status|next|prepare|consume|verify|approve|recover`

- [ ] **Step 1: Write failing lifecycle tests**

Cover `ready → running → produced → verifying → passed → closed`, failed verification, same-actor rejection, stale result, out-of-scope diff, retry creation, budget exhaustion and progress on independent nodes.

```js
test('executor claim cannot advance to passed', async () => {
  const run = await orchestrator.prepare('task-a', 'manual');
  writeProducedResult(run);
  const consumed = await orchestrator.consume(run);
  assert.equal(consumed.nodeState, 'produced');
});

test('verification requires a different actor', async () => {
  await assert.rejects(orchestrator.verify(runIdentity, verifier({ actorId: builderActorId })),
    error => error.code === 'VERIFIER_ACTOR_COLLISION');
});
```

- [ ] **Step 2: Run RED**

Run: `node --test test/workflow-orchestrator-v2.test.js test/orchestrator-cli-v2.test.js`
Expected: FAIL because the V2 lifecycle and commands do not exist.

- [ ] **Step 3: Implement lifecycle transitions**

`prepare` snapshots the workspace and atomically moves to `running`. `consume` validates the result, creates the after manifest, runs the diff guard and moves only to `produced`. `verify` reruns the exact `commands.verify` and declared gates against the unchanged artifact hash before `passed`. Retry creates attempt `n + 1` and carries only failure deltas.

- [ ] **Step 4: Route CLI without breaking V1**

Direct legacy `studio-dna-orchestrate start|inspect|resume|approve` remains compatible. `bin/cli.js` recognizes first argument `orchestrate` and routes to V2. `status` and `next` are read-only; `approve` requires a validated human-decision file.

- [ ] **Step 5: Run GREEN and orchestration regressions**

```powershell
node --test test/workflow-orchestrator-v2.test.js test/orchestrator-cli-v2.test.js test/workflow-orchestrator.test.js test/dag-scheduler.test.js test/execution-ledger.test.js
```

Expected: PASS.

- [ ] **Step 6: Commit**

```powershell
git add src/orchestration/workflow-orchestrator-v2.js bin/orchestrator.js bin/cli.js test/workflow-orchestrator-v2.test.js test/orchestrator-cli-v2.test.js
git commit -m "feat(orchestrator): run canonical V2 lifecycle"
```

### Task 10: Drift Detection and Cold-Start Recovery

**Files:**
- Create: `src/continuity/drift-checker.js`
- Create: `src/continuity/recovery.js`
- Modify: `continuity/RECOVERY.md`
- Test: `test/continuity-recovery.integration.test.js`

**Interfaces:**
- Produces: `detectContinuityDrift({ workspaceRoot }): DriftFinding[]`
- Produces: `recoverContinuity({ workspaceRoot, adapterReports }): RecoveryReport`

- [ ] **Step 1: Write failing recovery tests**

Cover stale state revision, altered roadmap, task hash drift, missing capability, interrupted `running` state, stale lock and a legacy memory claiming production while canonical state says experimental.

```js
test('running without a matching immutable attempt requires review', () => {
  const report = recoverFixture({ nodeState: 'running', attemptDirectoryPresent: false });
  assert.equal(report.status, 'human-review-required');
  assert.equal(report.findings[0].code, 'RUN_ATTEMPT_MISSING');
});
```

- [ ] **Step 2: Run RED**

Run: `node --test test/continuity-recovery.integration.test.js`
Expected: FAIL because recovery modules do not exist.

- [ ] **Step 3: Implement typed drift findings**

Each finding includes `code`, `severity`, `epistemicStatus`, `paths` and `recommendedAction`. Read only declared authority files and named legacy status files; do not scan all clients.

- [ ] **Step 4: Implement conservative recovery**

Verify workspace, branch, HEAD, contracts, ledger chain, task/input hashes, attempt directory, capability reports and Git manifest. Return the next safe action without dispatching. Output-affecting contradictions become `human-review-required`.

- [ ] **Step 5: Make RECOVERY.md command-driven**

```powershell
npm ci
npm run schemas:continuity
node bin/cli.js orchestrate recover
node bin/cli.js orchestrate status
node bin/cli.js orchestrate next
```

- [ ] **Step 6: Run GREEN**

Run: `node --test test/continuity-recovery.integration.test.js test/continuity-state-store.test.js test/continuity-roadmap-engine.test.js`
Expected: PASS.

- [ ] **Step 7: Commit**

```powershell
git add src/continuity/drift-checker.js src/continuity/recovery.js continuity/RECOVERY.md test/continuity-recovery.integration.test.js
git commit -m "feat(continuity): recover without conversation history"
```

### Task 11: Conformance, Clean-Checkout Drill and Status Migration

**Files:**
- Create: `scripts/run-continuity-conformance.js`
- Create: `scripts/run-clean-checkout-continuity-drill.js`
- Create: `test/continuity-conformance.integration.test.js`
- Modify: `.agents/workflows/orchestrate.md`
- Modify: `.agents/agent/orchestrator.md`
- Modify: `PROJECT_STATUS.md`
- Modify: `continuity/CURRENT_STATE.json`
- Modify: `continuity/ROADMAP.json`

**Interfaces:**
- Produces CLI: `node scripts/run-continuity-conformance.js --adapter antigravity --report continuity/evidence/antigravity-live-conformance.json [--live]`
- Produces CLI: `node scripts/run-clean-checkout-continuity-drill.js --source .`
- Produces hash-bound `capability-report` and `continuity-drill-report` evidence

- [ ] **Step 1: Write the failing conformance test**

The fixture prepares a task, lets a builder produce but not pass it, makes another verifier reject an intentionally invalid result, advances a valid result, prepares the same task for Antigravity and manual profiles, then resumes after restart.

```js
test('restart rejects poisoned result and retains ready work', async () => {
  const first = await createFixtureOrchestrator();
  const run = await first.prepare('fixture-task', 'antigravity');
  writePoisonedResult(run);
  await assert.rejects(first.consume(run), /scope|hash|diff/i);
  const restarted = await loadFixtureOrchestrator();
  assert.equal(restarted.status().projectStatus, 'experimental');
  assert.equal(restarted.next().some(node => node.id === 'fixture-task'), true);
});
```

- [ ] **Step 2: Run RED**

Run: `node --test test/continuity-conformance.integration.test.js`
Expected: FAIL because the scripts do not exist.

- [ ] **Step 3: Implement deterministic and live conformance**

Default to a deterministic local fixture. `--adapter antigravity --live` consumes a locally produced result and records Antigravity version, exposed tools, task hash, actor IDs, actual diff and verifier output. Without `--live`, native Antigravity capabilities remain `unverified`.

- [ ] **Step 4: Implement safe clean-checkout drill**

Create a unique OS temp directory, `git clone --local --no-hardlinks` from the explicit source, run `npm ci --ignore-scripts`, validate schemas and recovery, execute conformance, write the report outside the clone and remove only the resolved temporary clone in `finally`. Inject the command runner in tests.

- [ ] **Step 5: Replace stale agent instructions**

Reduce `.agents/workflows/orchestrate.md` and `.agents/agent/orchestrator.md` to provider-neutral pointers to `AGENTS.md` and canonical continuity state. Remove arbitrary three-agent requirements, Claude-specific tools and any implication that synthesis is proof.

- [ ] **Step 6: Run the focused Program A suite**

```powershell
node --test test/continuity-primitives.test.js test/continuity-contracts.test.js test/continuity-state-store.test.js test/continuity-authority.test.js test/continuity-roadmap-engine.test.js test/continuity-baseline.test.js test/continuity-diff-guard.test.js test/adapter-contract-v2.test.js test/filesystem-handoff-adapter.test.js test/antigravity-adapter.test.js test/gemini-ide-adapter-v2.test.js test/workflow-orchestrator-v2.test.js test/orchestrator-cli-v2.test.js test/continuity-recovery.integration.test.js test/continuity-conformance.integration.test.js
```

Expected: PASS.

- [ ] **Step 7: Run the real clean-checkout drill**

Run: `node scripts/run-clean-checkout-continuity-drill.js --source .`
Expected: report records schema validation, recovery, poisoned-result rejection, valid-result verification and cross-adapter preparation.

- [ ] **Step 8: Run the complete project suite**

Run: `npm test`
Expected: PASS. If unrelated pre-existing failures exist, record exact output and do not update the project-status claim.

- [ ] **Step 9: Perform live Antigravity conformance**

Open the workspace in Antigravity, invoke `resume-studio-dna`, dispatch a builder and a different verifier for the prepared fixture, write the canonical result, then run:

```powershell
node scripts/run-continuity-conformance.js --adapter antigravity --live --report continuity/evidence/antigravity-live-conformance.json
```

Expected: tested native capabilities become `observed` and bind to the installed Antigravity version. Authentication or tool failure yields `blocked`.

- [ ] **Step 10: Update status only from fresh evidence**

Set Program A nodes to actual verified states. Add a `PROJECT_STATUS.md` row citing the focused suite, full suite, clean-checkout report and live report. Do not mark Program A complete while live conformance is blocked.

- [ ] **Step 11: Commit**

```powershell
git add scripts/run-continuity-conformance.js scripts/run-clean-checkout-continuity-drill.js test/continuity-conformance.integration.test.js .agents/workflows/orchestrate.md .agents/agent/orchestrator.md PROJECT_STATUS.md continuity
git commit -m "test(continuity): prove cross-harness recovery"
```

## Program A Completion Gate

- [ ] All canonical contracts reject unknown fields.
- [ ] State writes are atomic and revision-checked.
- [ ] Ledger history is hash-linked and tamper-evident.
- [ ] Capability loss blocks only dependent DAG branches.
- [ ] Pre-existing dirty files remain protected and unattributed.
- [ ] Executor self-reports cannot pass a task.
- [ ] Builder and verifier identities differ.
- [ ] Antigravity loads the workspace plugin and returns a consumable canonical result.
- [ ] Manual or Gemini IDE handoff prepares the same canonical task hash.
- [ ] A poisoned result is rejected independently.
- [ ] A clean checkout resumes without chat history.
- [ ] Legacy V1 tests still pass.
- [ ] `PROJECT_STATUS.md` cites fresh evidence and retains `experimental` absent a separate promotion.

## Expected Operational Result

After Program A, the project owner opens Antigravity and invokes the workspace skill. Antigravity reads canonical state, projects the current wave into its task artifact, delegates only ready work, writes a strict result and hands control to deterministic verification. If Antigravity is unavailable, another harness or the manual CLI resumes from the same repository state without rewriting the task.

Programs B–E remain visible in `ROADMAP.json` but cannot become `ready` until their own specification delta and implementation plan are reviewed.
