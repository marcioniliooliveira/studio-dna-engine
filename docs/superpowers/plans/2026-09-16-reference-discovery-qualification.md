# Reference Discovery and Qualification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local, transport-independent gate that turns untrusted reference candidates into a small, role-scoped portfolio only after provenance checks, multi-axis qualification, a bounded probe and explicit human approval.

**Architecture:** Discovery adapters only emit strict candidate contracts into quarantine. Pure deterministic modules validate evidence, select the non-dominated Pareto set and verify probe results; a separate promotion gate requires matching hashes and human approval. MCP and external catalogs remain optional adapters outside the core and receive no execution or promotion authority.

**Tech Stack:** Node.js 20+, CommonJS, Zod 4, JSON Schema 2020-12, `node:test`, existing ICM and orchestration ledger.

**Spec:** `docs/superpowers/specs/2026-09-16-design-capability-orchestration-v2-design.md`

## Global Constraints

- Read only the active client's evidence and explicitly named candidate inputs.
- Never mutate `copias/` or execute code from a discovered repository.
- Treat URLs, README content, MCP metadata and tool descriptions as untrusted data.
- Reject unknown contract fields and non-JSON-safe values.
- Preserve creative merit, extractability, client fit, runtime quality, provenance and risk as separate dimensions.
- Stars, downloads and catalog rank cannot qualify or promote a candidate.
- Promotion requires zero P0 probe failures, positive measured quality delta and explicit human approval bound to evidence hashes.
- The domain core cannot import an MCP SDK, GitHub SDK or vendor client.
- Persisted contracts use descriptive keys; transport minification removes whitespace only.

## Normative contract shapes

`ReferenceCandidate` is a strict object with `schemaVersion: 2`, `contractKind: "reference-candidate"`, non-empty `candidateId`, `clientScope`, `sourceType`, `roles`, `usageIntent` and `provenance`. `sourceType` is one of `git-repository`, `web-page`, `uploaded-image`, `local-capture`, `figma-file`, `penpot-file`, `design-system` or `client-asset`. Roles are drawn from `composition`, `typography`, `motion`, `material`, `image-treatment`, `interaction`, `conversion`, `accessibility` and `code-pattern`. `usageIntent` is `inspiration-only`, `code-candidate` or `asset-candidate`.

`provenance` is strict and always contains `canonicalUri`. A Git repository additionally requires a 40-character lowercase hexadecimal `commit` and `license: { spdxId, evidenceUri }`. A web page requires ISO `capturedAt` and `contentSha256` matching `sha256:` plus 64 lowercase hexadecimal characters. Other source types require `contentSha256`; `code-candidate` additionally requires license evidence. Registration adds `lifecycle: "quarantined"`, `registeredAt` and `candidateHash` and never accepts those derived fields from discovery input.

`ReferenceQualification` contains candidate identity/hash, scope, roles, `rubricVersion`, and strict score entries for `creativeMerit`, `extractability`, `clientFit`, `runtimeQuality`, `provenanceConfidence` and `risk`. Every entry is `{ value: integer 0..100, evidenceIds: non-empty unique string[] }`. It also contains a canonical `qualificationHash`.

`ReferenceProbe` contains candidate, qualification and artifact hashes plus `acceptancePassRatio` in `0..1`, non-negative integer `p0Failures`, signed integer `pairwiseQualityDelta` in `-100..100`, integer `attempts` in `1..3`, non-negative integer `inputTokens`, `outputTokens`, `durationMs` and non-empty `evidenceIds`. `HumanReferenceDecision` is strict and contains `status: "approved" | "rejected"`, `actorId`, ISO `decidedAt`, `candidateHash`, `qualificationHash` and `probeHash`. `ReferencePromotion` preserves `candidateId`, `clientScope`, candidate/qualification/probe hashes, the approved roles and usage intent, decision actor/time and adds a canonical `promotionHash`; it contains no source code or raw reference content.

`ReferencePortfolio` contains `schemaVersion: 2`, `contractKind: "reference-portfolio"`, `clientScope`, sorted unique `requiredRoles`, one to five source assignments shaped as `{ candidateId, promotionHash, roles }`, and `portfolioHash`. Each required role must be covered and an assignment may contain only roles present in its promotion.

---

### Task 1: Quarantined reference candidate contract

**Files:**
- Create: `src/design/canonical-json.js`
- Create: `src/design/reference-candidate-contract.js`
- Create: `src/design/reference-candidate-registry.js`
- Create: `schemas/v2/reference-candidate.schema.json`
- Test: `test/reference-candidate-registry.test.js`

**Interfaces:**
- Produces: `canonicalize(value): string`
- Produces: `hashCanonical(value): string`
- Produces: `validateReferenceCandidate(input): ReferenceCandidate`
- Produces: `registerReferenceCandidate({ registryPath, candidate, now }): RegisteredReferenceCandidate`
- Produces: `listReferenceCandidates({ registryPath, clientScope, candidateIds, lifecycle }): RegisteredReferenceCandidate[]`

- [ ] **Step 1: Write a failing test for strict candidate validation**

```js
test('registers an external candidate in quarantine and rejects self-approval', () => {
  const registered = registerReferenceCandidate({
    registryPath,
    now: () => '2026-09-16T12:00:00.000Z',
    candidate: validGitCandidate()
  });
  assert.equal(registered.lifecycle, 'quarantined');
  assert.throws(() => registerReferenceCandidate({
    registryPath,
    now: () => '2026-09-16T12:00:00.000Z',
    candidate: { ...validGitCandidate(), lifecycle: 'promoted' }
  }), /unknown|lifecycle/i);
});
```

- [ ] **Step 2: Run `node --test test/reference-candidate-registry.test.js` and verify RED because the module does not exist**
- [ ] **Step 3: Add source-specific failing cases: Git requires canonical URI, full commit SHA and license evidence; web pages require capture timestamp and `sha256:` content hash**
- [ ] **Step 4: Add failing cases for empty roles, missing client/global scope, duplicate IDs, cross-client listing and unknown fields**
- [ ] **Step 5: Implement strict Zod contracts, generate the checked-in JSON Schema with `z.toJSONSchema`, and write the registry atomically through a same-directory temporary file**
- [ ] **Step 6: Run the focused test and `node --test test/icm-context-router.test.js test/vault-integrity.test.js`**
- [ ] **Step 7: Commit with `feat(design): quarantine typed reference candidates`**

### Task 2: Multi-axis qualification and Pareto selection

**Files:**
- Create: `src/design/reference-qualification.js`
- Create: `src/design/reference-pareto-selector.js`
- Create: `schemas/v2/reference-qualification.schema.json`
- Test: `test/reference-qualification.test.js`

**Interfaces:**
- Consumes: `RegisteredReferenceCandidate`
- Produces: `qualifyReferenceCandidate({ candidate, rubricVersion, signals, evidence }): ReferenceQualification`
- Produces: `selectParetoCandidates({ qualifications, requiredRoles, maxCandidates }): ParetoSelection`

- [ ] **Step 1: Write a failing test requiring literal 0–100 values for `creativeMerit`, `extractability`, `clientFit`, `runtimeQuality`, `provenanceConfidence` and `risk`**
- [ ] **Step 2: Run the focused test and verify RED because qualification is missing**
- [ ] **Step 3: Write failing tests proving every score has evidence IDs, a quarantined candidate cannot claim executable-code usage, and popularity fields are rejected**
- [ ] **Step 4: Write a failing Pareto test where a candidate dominated on every benefit axis with equal-or-higher risk is excluded without averaging the dimensions**

```js
test('excludes a candidate dominated on every quality axis', () => {
  const result = selectParetoCandidates({
    qualifications: [strongQualification(), dominatedQualification()],
    requiredRoles: ['motion'],
    maxCandidates: 5
  });
  assert.deepEqual(result.candidateIds, ['ref-strong']);
});
```

- [ ] **Step 5: Implement deterministic qualification hashing and role-aware Pareto selection with stable candidate-ID tie ordering**
- [ ] **Step 6: Run the focused test twice and assert identical output hashes, then run `node --test test/blueprint.test.js test/execution-ledger.test.js`**
- [ ] **Step 7: Commit with `feat(design): qualify references on independent axes`**

### Task 3: Probe evidence and promotion gate

**Files:**
- Create: `src/design/reference-probe-contract.js`
- Create: `src/design/reference-promotion-gate.js`
- Create: `schemas/v2/reference-probe.schema.json`
- Create: `schemas/v2/reference-promotion.schema.json`
- Test: `test/reference-promotion-gate.test.js`

**Interfaces:**
- Produces: `validateReferenceProbe(input): ReferenceProbe`
- Produces: `promoteReference({ candidate, qualification, probe, humanDecision }): ReferencePromotion`

- [ ] **Step 1: Write a failing test for probe evidence containing artifact hash, acceptance pass ratio, P0 failures, pairwise quality delta, attempts, executor tokens and duration**
- [ ] **Step 2: Run the focused test and verify RED because the probe contract is missing**
- [ ] **Step 3: Write failing promotion tests for mismatched hashes, any P0 failure, pass ratio below `1`, quality delta at or below `0`, more than three attempts, rejected decision and different client scope**
- [ ] **Step 4: Write a positive test requiring the human decision to bind candidate, qualification and probe hashes**
- [ ] **Step 5: Implement strict probe validation and a deterministic promotion record; keep raw cost dimensions instead of collapsing them into an uncalibrated score**
- [ ] **Step 6: Run focused tests and `node --test test/task-contract.test.js test/gemini-ide-adapter.test.js`**
- [ ] **Step 7: Commit with `feat(design): gate reference promotion on probe evidence`**

### Task 4: Role-scoped portfolio and ICM Stage 01 compatibility

**Files:**
- Create: `src/design/reference-portfolio.js`
- Create: `schemas/v2/reference-portfolio.schema.json`
- Modify: `icm/_core/contracts.js`
- Modify: `icm/_core/context-router.js`
- Test: `test/reference-portfolio.test.js`
- Modify: `test/icm-context-router.test.js`

**Interfaces:**
- Consumes: `ReferencePromotion[]`
- Produces: `buildReferencePortfolio({ clientScope, requiredRoles, promotions }): ReferencePortfolio`
- Produces: Stage 01 V2 output `{ schemaVersion: 2, selectedRefSlug, compatibilityScore, referencePortfolio }` while preserving Stage 01 V1 validation

- [ ] **Step 1: Write a failing test that assigns one to five promoted sources to explicit roles and preserves separate source contributions**
- [ ] **Step 2: Run the focused test and verify RED because the portfolio compiler is missing**
- [ ] **Step 3: Write failing tests for missing role coverage, duplicate source-role assignment, more than five sources, cross-client promotions and candidates without promotion evidence**
- [ ] **Step 4: Write a failing compatibility test proving the existing V1 `{ selectedRefSlug, compatibilityScore }` Stage 01 output still validates while a V2 output requires a valid portfolio**
- [ ] **Step 5: Implement canonical portfolio hashing, stable role/source ordering and ICM input resolution to the client-scoped portfolio artifact without widening access to other clients or raw references**
- [ ] **Step 6: Run `node --test test/reference-portfolio.test.js test/icm-context-router.test.js test/vault-integrity.test.js` followed by `npm test`**
- [ ] **Step 7: Commit with `feat(design): compile approved reference portfolios`**

## Completion criteria

- External candidates enter quarantine and cannot self-approve.
- Qualification preserves independent quality and risk axes with evidence references.
- Pareto selection removes dominated candidates without an opaque weighted average.
- Probe and approval hashes must match the promoted candidate exactly.
- Stage 01 remains backward compatible while accepting a client-scoped V2 portfolio.
- No task fetches from the network, executes discovered code or imports a vendor/MCP SDK into the domain core.
- The resulting promotions are the only valid input to the existing Reference Design Intelligence plan.
