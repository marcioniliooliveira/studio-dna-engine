# Antigravity-Executable Continuity and Transmutation — Design Specification

## Status and authority

Status: proposed for human review on 2026-09-22.

This specification defines the target architecture and the implementation sequence for turning Studio DNA Pro / Reverser-AI into a provider-neutral, evidence-driven workframe that can be operated primarily through Antigravity.

This document supersedes the execution sequence in:

- `docs/DESIGN_CAPABILITY_ROADMAP_V2.md`;
- `docs/superpowers/specs/2026-09-16-design-capability-orchestration-v2-design.md`;
- `docs/superpowers/plans/2026-09-21-jev-motion-preservation-and-delegation.md`.

It does not invalidate their security, client-isolation, evidence, hashing, reference-promotion or motion-preservation requirements. Any contradiction is resolved in favor of this specification after human approval, then runtime evidence, tests and `AGENTS.md`.

The repository remains `experimental`. Nothing in this specification is evidence that the described capabilities are implemented.

## Intent

The system must let the project owner define design intent and editorial direction while delegating bounded technical work to inexpensive executor models. It must preserve sophisticated mechanics from high-quality references, explain how those mechanics work, adapt them deliberately to a client and prove that the implementation did not silently lose them.

The development process must survive the loss of any conversation, model or IDE. Antigravity is the primary operational environment, not the canonical source of truth. The same task and evidence contracts must remain usable from Gemini IDE, Codex, Claude or a manual CLI.

Success means:

1. another agent can resume from a clean checkout without chat history;
2. Antigravity can select and delegate ready tasks without interpreting roadmap prose;
3. builders cannot approve their own results;
4. observed evidence is never silently replaced by inference;
5. reference mechanics such as handwritten SVG reveals and image-mask reveals survive controlled transmutation;
6. mechanical validity and editorial approval remain independent;
7. quality improvement is demonstrated through blind comparison, not asserted by an agent.

## Current evidence and contradictions

Observed on 2026-09-22 in the dedicated `docs/design-capability-roadmap-v2` worktree:

- the repository contains an orchestration core, DAG scheduler, task contracts, execution ledger, Gemini adapters and orchestration tests;
- the repository contains reference qualification and promotion modules, visual QA modules and client-isolation controls;
- the existing V2 design specification makes Gemini the principal execution path;
- the existing roadmap and Jev plan do not define a canonical continuity package or an Antigravity adapter;
- the worktree contains unrelated modified and untracked files, which must not be included in this specification's commit;
- `PROJECT_STATUS.md` reports a 112-test pass from 2026-09-03, not from the current run.

Documented by current Antigravity materials:

- Antigravity supports custom agents, background subagents, skills, MCP integrations and browser automation;
- full-capability delegation maps to `invoke_subagent` with `TypeName: self`;
- read-only research maps to `invoke_subagent` with `TypeName: research`;
- task tracking is represented by a task artifact, not by `manage_task`;
- plugins can provide bootstrap instructions, skills and MCPs.

Unverified until the Antigravity conformance milestone:

- the exact behavior of the locally installed Antigravity version;
- unattended execution across an entire implementation wave;
- reliable result ingestion after IDE restarts;
- availability and authentication of external model and Jev APIs.

The strongest failure mode is circular validation: one agent interprets the reference, implements its interpretation, runs weak checks and approves its own result. The architecture must make that state structurally impossible for material changes.

## Non-goals

- Autonomous editorial taste or client approval.
- Treating Antigravity, Gemini, Jev, an MCP server or a VLM as an authority over evidence.
- Loading every client, every reference or the complete Vault into each model call.
- Copying a reference's identity, proprietary assets or client-specific content.
- A graph database before two distinct reference-mechanism verticals prove the need.
- A universal design system that makes clients visually interchangeable.
- Unlimited repair loops.
- Remote multi-tenant production infrastructure during this roadmap.
- A claim that arbitrary websites can be transmuted reliably before the benchmark proves it.

## Core architectural decisions

### 1. Provider-neutral canonical control plane

The repository owns state. IDE task panels, chat history and provider-specific memory are projections.

Canonical artifacts are versioned, schema-validatable and hashable:

```text
continuity/
  CHARTER.md
  CURRENT_STATE.json
  ROADMAP.json
  RECOVERY.md
  decisions/
  capabilities/
  tasks/
  runs/
  evidence/
  schemas/
  adapters/
```

`CHARTER.md` records intent and invariants. `CURRENT_STATE.json` records the last independently verified state and the next eligible transition. `ROADMAP.json` is the executable dependency graph. `RECOVERY.md` is a minimal cold-start procedure.

`.agents/memory`, chat transcripts, task artifacts and IDE todo lists may aid a session but never override canonical state.

### 2. Antigravity is the primary adapter

Antigravity consumes the canonical control plane and projects it into its native constructs:

- bootstrap instructions through the project/plugin context file;
- a task artifact showing the current wave;
- `research` subagents for read-only investigation;
- `self` subagents for bounded builder and verifier roles;
- MCP tools only where a stable domain interface already exists;
- result adapters that write canonical run and evidence artifacts.

The adapter may translate data but may not invent tasks, relax requirements, change hashes or approve promotion.

### 3. Roadmap prose is not executable

The human roadmap is compiled into a DAG of atomic tasks. Every executable task declares:

- identity and schema version;
- dependencies and preconditions;
- required capabilities;
- immutable inputs and hashes;
- read and write allowlists;
- forbidden actions;
- normative requirements with stable IDs;
- exact commands and expected exit behavior;
- resource and retry budgets;
- expected artifacts;
- independent verification gates;
- stop, escalation and rollback policies.

Descriptive names are used in canonical JSON. Transport may remove whitespace but must not replace semantic field names with opaque abbreviations.

### 4. Human gates are first-class DAG nodes

Human decisions are not comments or informal chat approvals. They are signed or otherwise identity-bound artifacts referencing the exact contracts and artifact hashes reviewed.

Mandatory human gates include:

- conflict resolution during truth consolidation;
- reference usage or licensing exceptions;
- design-direction selection;
- editorial acceptance;
- consequential architecture changes;
- maturity promotion;
- low-confidence or contradictory evidence.

An agent encountering a human gate must stop that branch without blocking unrelated ready tasks.

### 5. Mechanical validity and editorial approval are independent

Promotion requires both dimensions:

```json
{
  "mechanicallyValid": true,
  "editoriallyApproved": true,
  "scopeValid": true,
  "evidenceComplete": true
}
```

Mechanical checks cannot declare taste. Editorial approval cannot override a P0 mechanical, security, isolation or accessibility failure.

### 6. Evidence precedes inference

Every material claim has one of four epistemic states:

- `observed`: captured directly from source or runtime;
- `derived`: deterministically calculated from observed evidence;
- `inferred`: a bounded model or human interpretation;
- `unknown`: insufficient or contradictory evidence.

Derived and inferred records reference their source evidence IDs. `unknown` is a valid outcome and cannot be coerced into a guess to keep a workflow moving.

### 7. Builder and verifier are separate roles

For material tasks, actor identity and capability boundaries must prevent the builder from modifying:

- acceptance contracts;
- expected baselines;
- verification thresholds;
- evidence used to judge the patch;
- the verifier's result.

The verifier reruns commands against the immutable produced artifact. A self-reported pass is only a claim.

### 8. Jev is a bounded ambiguity resolver

The Node client calls the hosted Jev API behind a typed adapter. Jev receives small evidence-linked choices, scores or nullable classifications. It runs in shadow mode until calibration demonstrates value for each question type.

Jev cannot mutate files, approve tasks, replace browser evidence or turn uncalibrated confidence into a probability claim. Model versions are pinned, decisions are cached by evidence hash and low-confidence results route to human review.

### 9. Motion Capability Core precedes MCP

The project first implements a transport-neutral Node domain core for CSS, WAAPI, GSAP and Motion inspection. The core exposes ownership, timeline, seek, trajectory, conflict, validation and profiling operations.

An MCP facade is added only after direct Node calls and fixtures prove the interface. MCP exposes capability; it does not supply truth or authorization.

### 10. Generalization follows two verticals

The first scientific vertical is a handwritten SVG associated with emphasized text. The second is an image-mask reveal. Shared abstractions are extracted only after both work, preventing an SVG-specific ontology from being mislabeled as a universal frontend model.

## System architecture

```text
Project owner
  ├── intent and priorities
  ├── human-gate decisions
  └── editorial approval
          │
Canonical control plane
  ├── charter and state
  ├── executable roadmap DAG
  ├── task/result contracts
  ├── capability registry
  └── evidence and decision ledger
          │
Harness adapters
  ├── Antigravity (primary)
  ├── Gemini IDE
  ├── Codex
  ├── Claude
  └── manual CLI
          │
Role-separated workers
  ├── researcher
  ├── builder
  ├── browser auditor
  └── verifier
          │
Domain capabilities
  ├── safe capture and readiness
  ├── evidence identity and relations
  ├── reference qualification
  ├── controlled transmutation
  ├── Motion Capability Core
  ├── Jev classifier
  └── visual and runtime QA
          │
Immutable artifacts and promotion gates
```

## Canonical lifecycle

### Task states

```text
draft
  → ready
  → running
  → produced
  → verifying
  → passed | failed | blocked | human-review-required
  → approved
  → closed
```

Rules:

- only the scheduler can move `draft` to `ready` after dependencies validate;
- an executor can move `running` to `produced`, `failed` or `blocked`;
- only an independent verifier can set `passed`;
- only the declared human authority can satisfy a human gate;
- `approved` requires all mandatory machine and human gates;
- retry creates a new attempt linked to the previous one; it never overwrites history;
- exceeding the retry budget produces `human-review-required`;
- resumption begins by validating hashes and locks, not by trusting the last textual status.

### Adapter interface

Every harness adapter implements the same conceptual operations:

```text
detectCapabilities()
prepareTask(canonicalTask)
dispatch(preparedTask)
inspect(runIdentity)
ingestResult(runIdentity)
cancel(runIdentity)
projectStatus(canonicalState)
```

Adapter output is validated before it changes canonical state. A capability not proven by a conformance test is reported as unavailable.

### Antigravity execution flow

```text
Open workspace
  → load generated bootstrap
  → validate CURRENT_STATE and ROADMAP
  → select ready tasks whose capabilities are available
  → create or update the Antigravity task artifact
  → invoke bounded subagent
  → ingest task-result and actual repository diff
  → run independent verifier
  → append evidence and ledger events
  → update canonical state atomically
  → continue, pause at human gate or report blocked
```

Before the adapter exists, the first implementation wave uses a manually supplied bootstrap that points Antigravity to the approved specification and plan. This is the only planned chicken-and-egg exception. The first conformance milestone removes it.

## Task package

A task package is a directory or manifest containing one bounded operation. A representative shape is:

```json
{
  "schemaVersion": 2,
  "taskId": "CONT-001",
  "waveId": "continuity-core",
  "state": "ready",
  "dependsOn": [],
  "role": "builder",
  "requiredCapabilities": ["nodejs", "filesystem.patch", "shell.test.focused"],
  "inputs": [
    {
      "path": "PROJECT_STATUS.md",
      "sha256": "sha256:<computed-at-dispatch>",
      "purpose": "status-evidence"
    }
  ],
  "authority": {
    "readAllowlist": ["PROJECT_STATUS.md", "src/orchestration/**"],
    "writeAllowlist": ["src/continuity/state-schema.js", "test/continuity/state-schema.test.js"],
    "network": { "mode": "deny", "hosts": [] }
  },
  "requirements": [
    { "id": "REQ-CONT-001", "kind": "behavior", "assertion": "reject-missing-schema-version" }
  ],
  "commands": {
    "red": "node --test test/continuity/state-schema.test.js",
    "verify": "node --test test/continuity/state-schema.test.js"
  },
  "budget": {
    "maxAttempts": 2,
    "timeoutMs": 600000,
    "maxFilesChanged": 2
  },
  "failurePolicy": {
    "ambiguity": "blocked",
    "missingInput": "blocked",
    "policyViolation": "failed-no-retry",
    "acceptanceFailure": "failed"
  }
}
```

Executable tasks use computed hashes. Placeholder hashes are forbidden by schema outside examples and fixtures.

## Model and token-routing policy

The control plane routes work by capability and uncertainty rather than using one model for every step.

| Work | Default route | Context policy |
|---|---|---|
| Architecture or irreversible decision | high-reasoning architect | one stateless blueprint; immutable prefix first |
| Repetitive implementation and file work | Gemini Flash executor | one task slice and progressive disclosure |
| Repository investigation | read-only subagent | named paths and search results only |
| Deterministic inspection | local Node/Playwright tools | no model where code can decide |
| Residual classification ambiguity | Jev | typed question and evidence IDs only |
| Editorial choice | human | rendered candidates and localized evidence |

The architect is not placed inside repair loops. Repair requests carry only failure deltas, relevant files and unchanged contract hashes. Dynamic toolsets expose only capabilities needed for the active task. Cost, latency, token usage, cache behavior, attempts and human interventions are recorded per run; savings are not claimed until measured against a baseline.

## Roadmap and exit gates

Estimates assume one developer assisted by agents for approximately 30 productive hours per week. They are planning ranges, not delivery guarantees. Fifteen hours per week approximately doubles calendar time. Research uncertainty, API access and browser nondeterminism require 20–30% contingency.

### Phase 0 — Truth consolidation

Estimated time: 3–5 working days.

Deliverables:

- authoritative state inventory;
- contradiction and stale-document ledger;
- migration map from current V2 artifacts;
- branch and worktree preservation rules;
- baseline evidence freshness report.

Exit gate: one authority chain is documented; no unresolved document can present itself as the active roadmap; unrelated user changes remain untouched.

Antigravity execution: supervised. It may inventory and propose resolutions, but consequential conflicts require the project owner.

### Phase 1 — Continuity Core

Estimated time: 5–8 working days.

Deliverables:

- canonical schemas for charter references, current state, DAG, task, result, evidence and human decision;
- validators and canonical hashing;
- recovery command and drift checker;
- fixtures for invalid dependencies, stale state and incomplete evidence.

Exit gate: a clean checkout can determine the next valid task and reject malformed or contradictory state.

Antigravity execution: technical work may be delegated through the temporary bootstrap.

### Phase 2 — Antigravity primary adapter

Estimated time: 5–8 working days.

Deliverables:

- project/plugin manifest where supported;
- generated Antigravity bootstrap context;
- canonical-to-task-artifact projection;
- researcher, builder and verifier role mapping;
- result ingestion and capability discovery;
- mock and locally installed-version conformance tests.

Exit gate: a new Antigravity session can load the project, identify one ready task, dispatch it, ingest its result and refuse an invalid result.

Antigravity execution: partially self-hosting. Initial bootstrap is manual; subsequent conformance tasks use the adapter under test.

### Phase 3 — Portable adapters and manual fallback

Estimated time: 5–10 working days.

Deliverables:

- Gemini IDE V2 bridge;
- Codex adapter;
- Claude handoff format;
- manual CLI adapter;
- capability registry and adapter conformance contract.

Exit gate: one canonical task package executes through Antigravity, one alternative harness and the manual fallback without changing normative requirements.

### Phase 4 — Continuity and delegation test matrix

Estimated time: 4–7 working days.

Deliverables:

- schema, DAG, adversarial and adapter tests;
- stale-lock and interrupted-run recovery;
- builder/verifier identity tests;
- clean-checkout, no-chat-history continuity drill;
- cross-harness resume fixture.

Exit gate: after simulated loss of the original agent, a different harness resumes and closes one safe task using repository artifacts only.

Expected cumulative milestone: provider-independent operational backup in 4–7 weeks.

### Phase 5 — Research contract and safe capture

Estimated time: 6–10 working days.

Deliverables:

- capture coverage contract;
- immutable raw-capture manifest;
- readiness and environment manifest;
- source, license and privacy boundaries;
- hostile-page and prompt-injection isolation;
- repeatability fixtures.

Exit gate: two captures preserve the same required source and runtime evidence; absent dependencies produce `unknown` or `blocked`, never destructive normalization.

### Phase 6 — Minimal evidence and identity model

Estimated time: 8–15 working days.

Deliverables:

- typed observed, derived, inferred and unknown records;
- stable identities for DOM, SVG, text, assets and runtime actors;
- spatial, temporal and causal relations;
- source-to-runtime correlation probes;
- JSON/SQLite persistence.

Exit gate: a handwritten SVG, its emphasized text and its runtime animation retain traceable identities across declared states; every non-observed claim cites evidence.

### Phase 7 — Handwritten SVG vertical

Estimated time: 12–20 working days.

Deliverables:

- SVG topology and geometry extractor;
- text-association model;
- draw-order, duration, easing and trigger evidence;
- invariant/free-variable contract;
- content-sensitive adaptation;
- reference corpus and intentionally broken fixtures;
- three materially distinct target implementations.

Exit gate: the mechanism survives different text and layout conditions, broken variants fail and blind review shows improvement over a generic baseline.

Antigravity execution: implementation and measurement are delegable; final editorial choice is a human gate.

### Phase 8 — Jev shadow integration and calibration

Estimated time: 5–10 working days.

Deliverables:

- Node API adapter;
- typed question registry;
- pinned model and evidence-hash cache;
- append-only calibration ledger;
- confidence and contradiction routing;
- shadow-mode authorization tests.

Exit gate: Jev predictions are compared with independent outcomes, cannot mutate or approve and route unresolved cases to humans.

### Phase 9 — Controlled transmutation kernel

Estimated time: 10–20 working days.

Deliverables:

- functional mechanism model;
- role and compatibility mapping;
- invariant and permitted-change contracts;
- actual diff guard and artifact lineage;
- deterministic verifier;
- traceability report.

Exit gate: a target implementation preserves declared invariants, changes only authorized variables and answers what changed, why and from which evidence.

### Phase 10 — Motion Capability Core and runtime adapters

Estimated time: 8–15 working days.

Deliverables:

- engine-neutral motion interface;
- CSS, WAAPI, GSAP and Motion adapters where present in fixtures;
- owner and conflict detection;
- seek, replay, trajectory capture and reduced-motion checks;
- motion-contract verifier and profiler.

Exit gate: timelines and owners are observable and reproducible; a removed reveal and a conflicting owner both fail independently of final-frame visibility.

### Phase 11 — MCP facade

Estimated time: 3–6 working days.

Deliverables:

- narrow, typed MCP tools over the proven Motion Capability Core;
- read versus mutation capability boundaries;
- direct-Node/MCP parity tests;
- audit records for agent calls.

Exit gate: MCP and direct Node paths return equivalent canonical results, with no arbitrary evaluation or approval authority.

### Phase 12 — Image-mask reveal vertical

Estimated time: 10–15 working days.

Deliverables:

- mask topology, ownership and state extraction;
- invariant/free-variable model;
- adaptation fixtures;
- shared abstractions extracted from both verticals only.

Exit gate: the second mechanism works without handwritten-SVG-specific branches in the shared model.

### Phase 13 — Reference intelligence and direction boards

Estimated time: 10–20 working days.

Deliverables:

- qualified role-based reference portfolios;
- compact reference packets;
- design intent and negative constraints;
- three materially distinct directions;
- intent goldens with explicit motion intent;
- human direction decision.

Exit gate: an agent can reconstruct relationships from the packet without loading a raw clone, and the project owner can approve a direction from visible differences rather than vague adjectives.

### Phase 14 — Review console and empirical benchmark

Estimated time: 10–20 working days.

Deliverables:

- local read-mostly review UI;
- visual-region, runtime, motion and provenance evidence;
- dual mechanical/editorial gates;
- cost, token, latency, attempt and intervention telemetry;
- anonymized blind-comparison workflow;
- failure memory and promotion report.

Exit gate: promotion is based on immutable evidence and signed decisions, continuity is demonstrated across harnesses and the new pipeline meets the predeclared blind-comparison threshold with no P0 failures.

### Cumulative planning ranges

| Outcome | Expected cumulative time |
|---|---:|
| Provider-independent operational backup | 4–7 weeks |
| First credible SVG/Jev vertical | 10–16 weeks, with 12–20 weeks possible under R&D variance |
| Controlled transmutation, Motion Core and second vertical | 18–28 weeks |
| Internal local-tool candidate | 5–8 months |
| Broad arbitrary-reference capability | 9–18+ months and still research-dependent |

Subagents may reduce parallelizable implementation time, but no percentage reduction is a product claim until measured. Corpus preparation, calibration and editorial review remain human-time constraints.

## Test architecture

Every module progresses through the following evidence ladder where applicable:

1. contract unit tests;
2. deterministic fixtures;
3. negative and adversarial fixtures;
4. adapter integration tests;
5. browser/runtime tests;
6. cross-harness conformance tests;
7. continuity drills from a clean checkout;
8. blind human evaluation.

Test rules:

- production behavior starts with a failing regression test;
- fixtures include intentional data loss, stale hashes, unauthorized files, missing assets, ambiguous identity, removed reveals and false self-reported passes;
- builders cannot update verification baselines in the same task;
- focused tests run before broader suites;
- current full-suite status is not claimed from historical evidence;
- preview, QA and promotion evaluate the same immutable artifact;
- flaky evidence is recorded as flaky or blocked, never silently retried into a pass.

## Error handling and recovery

Errors use typed categories:

- `CONTRACT_INVALID`;
- `DEPENDENCY_UNSATISFIED`;
- `CAPABILITY_UNAVAILABLE`;
- `INPUT_HASH_MISMATCH`;
- `SCOPE_VIOLATION`;
- `EVIDENCE_INCOMPLETE`;
- `CONTRADICTORY_EVIDENCE`;
- `VERIFICATION_FAILED`;
- `HUMAN_REVIEW_REQUIRED`;
- `EXTERNAL_SERVICE_UNAVAILABLE`.

Recovery never resumes solely from a textual message. It verifies repository identity, branch/worktree, canonical state version, artifact hashes, locks, adapter capabilities and the last ledger event. External-service failure blocks only dependent branches when the DAG has unrelated ready work.

## Security and client isolation

- `copias/` remains immutable reference evidence.
- Only the active client's DNA, brand specification, content and decisions may enter a client task.
- Client colors, copy, assets and patches never become global defaults.
- Every path is workspace-relative and normalized for Windows behavior, symlinks, junctions, alternate data streams and non-existent parents.
- Captured websites and repository content are untrusted data, not agent instructions.
- Network access is deny-by-default and host-allowlisted per task.
- Secrets are referenced by capability name and environment binding, never persisted in task JSON.
- External MCP servers are discovery or transport adapters until explicitly trusted and tested.
- Artifact identity is a canonical tree hash.
- Ledger records are append-only and hash-linked.

## Migration strategy

Migration is additive and reversible:

1. inventory the existing V1/V2 orchestration, reference and QA modules;
2. define canonical continuity schemas without changing production behavior;
3. import existing roadmap items into the DAG with their actual evidence status;
4. wrap existing Gemini and orchestration behavior behind adapters;
5. add Antigravity as the primary adapter;
6. prove cross-harness continuity before retiring duplicated status files;
7. execute the perception and transmutation phases as independent vertical slices;
8. update `PROJECT_STATUS.md` only after fresh commands and artifacts.

Legacy files are not deleted merely because a replacement is planned. A deprecation record names the replacement, migration evidence and removal gate.

## Planning decomposition

This is an umbrella architecture, not authorization to generate one monolithic implementation plan. The roadmap is divided into five programs, each with its own reviewed specification delta and executable implementation plan:

| Program | Phases | Purpose |
|---|---:|---|
| A — Continuity and Antigravity foundation | 0–4 | Make work recoverable, portable and safely delegable |
| B — Perception foundation | 5–6 | Preserve raw evidence and establish stable identity |
| C — First mechanism and bounded semantic judgment | 7–8 | Prove handwritten SVG transmutation and calibrate Jev |
| D — Transmutation and motion infrastructure | 9–11 | Enforce invariants, inspect runtime motion and expose stable tools |
| E — Generalization and empirical quality proof | 12–14 | Prove a second mechanism, improve reference direction and benchmark output |

The master `ROADMAP.json` may contain all programs and their milestone dependencies. Only tasks belonging to an approved program plan can enter `ready`. Future milestones remain `planned` or `blocked-by-design-approval`; the orchestrator cannot expand them from prose.

The first implementation plan produced from this specification covers Program A only. Completion of Program A provides the infrastructure through which later program plans can be executed by Antigravity. Each later program begins with a consistency review against this umbrella architecture instead of reopening already-settled global decisions.

## Implementation-plan requirements

The implementation plan derived from this specification must be directly operable by Antigravity and portable to other harnesses. It must:

- divide phases into small waves with explicit dependencies;
- provide one canonical task JSON per bounded implementation unit;
- name exact files, tests, commands and expected evidence;
- separate research, builder and verifier tasks;
- mark human gates and external inputs as non-agent nodes;
- define stop conditions and retry limits;
- include a temporary bootstrap for Waves 0–2;
- include adapter conformance before automated progression;
- preserve unrelated dirty files and client artifacts;
- use isolated branches or worktrees for material work;
- never describe planned modules as implemented.

## Final acceptance conditions

The architecture is realized only when all of the following are observed through current evidence:

1. Antigravity completes a canonical task and an independent verifier rejects a deliberately invalid result.
2. A second harness completes the same task contract without changing its normative requirements.
3. A clean checkout resumes after loss of chat and original executor.
4. The first vertical preserves a handwritten SVG mechanism across content changes.
5. The second vertical preserves an image-mask reveal without SVG-specific shared logic.
6. Jev remains bounded, calibrated and unable to mutate or approve.
7. Motion inspection produces deterministic trajectory evidence and catches lost reveals.
8. MCP output matches the direct domain-core output.
9. Every promoted client artifact passes mechanical gates and a separate editorial decision.
10. Blind comparison demonstrates the predeclared quality improvement while measured cost and intervention data remain available for analysis.
