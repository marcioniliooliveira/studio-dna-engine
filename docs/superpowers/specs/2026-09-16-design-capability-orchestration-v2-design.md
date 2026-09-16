# Design Capability Orchestration V2 — Design Specification

## Status

Approved for incremental implementation on 2026-09-16. This specification defines the target architecture; only capabilities backed by current runtime evidence may be described as implemented.

## Purpose

Build a local, reference-driven design workframe that measurably improves visual output, gives the AI enough structured context to understand advanced UI/UX, and delegates bounded implementation work to Gemini without relying on ambiguous prose.

The system optimizes for outcome quality over scale. It may generate and compare multiple visual directions, require human approval, and run expensive local verification before accepting an artifact.

## Current evidence

Observed on 2026-09-16:

- The repository baseline passes 112 tests in the isolated worktree.
- The existing orchestrator validates DAG shape, schedules ready nodes, records token counts and supports Gemini API and filesystem-based Gemini IDE adapters.
- The current Gemini IDE adapter exchanges task/result JSON files but does not mediate Gemini's filesystem, shell, browser or network tools.
- `src/qa/visual-regression.js` captures screenshots but does not compare them.
- `UnifiedQualityGate` uses one desktop viewport and does not prove artistic quality.
- The current Design Vault contains three declared patterns and two templates.

## Product outcomes

The V2 workframe must improve five capabilities in this order:

1. **Understanding:** transform client evidence and references into explicit, inspectable design intent.
2. **Divergence:** produce three materially different, reference-aligned directions instead of palette variations.
3. **Construction:** compose advanced, responsive UI and motion from governed design grammar and recipes.
4. **Delegation precision:** make every Gemini task bounded, verifiable and resistant to interpretation drift.
5. **Proof:** demonstrate improvement against the previous pipeline through blind comparisons and deterministic QA.

## Non-goals

- Fully autonomous taste decisions.
- Automatic acceptance of licenses or commercial usage rights.
- Copying complete reference websites or redistributing their assets.
- One universal visual style shared by all clients.
- Scale, multi-tenant SaaS or remote production deployment in this phase.
- Treating a VLM score as final design approval.

## Core architectural decision

### JSON is necessary but insufficient

JSON is the canonical interchange format because it is deterministic, schema-validatable, hashable and inexpensive to transport. It does not, by itself, prevent an IDE agent from ignoring instructions or using tools outside the declared scope.

Precision is produced by six controls together:

1. strict JSON contracts;
2. immutable file and image inputs referenced by SHA-256;
3. isolated worktrees;
4. mediated tools when technically available;
5. post-execution diff and artifact verification;
6. independent human and machine gates.

The filesystem-based Gemini IDE path is classified as **soft-enforced** until Gemini tool calls pass through an orchestrator-controlled gateway. API/MCP execution may be classified as **hard-enforced** only when every relevant capability is mediated.

## Contract family

One large task JSON would mix evidence, creative intent, permissions and acceptance rules. V2 uses small contracts with one responsibility each.

| Contract | Responsibility | Created by | Consumed by |
|---|---|---|---|
| `client-evidence` | Sourced facts, content and missing information | content analyst/human | design architect |
| `design-intent` | Audience, emotion, narrative, design dials and negative constraints | architect + human | direction generator |
| `reference-candidate` | Untrusted source identity, roles, provenance and declared usage intent | discovery adapter | qualification core |
| `reference-qualification` | Separate merit, extraction, fit, runtime, provenance and risk evidence | deterministic verifier + reviewer | portfolio selector |
| `reference-probe` | Bounded reconstruction results, cost and quality delta | executor + verifier | promotion gate |
| `reference-promotion` | Human approval bound to candidate, qualification and probe hashes | human + promotion gate | approved source registry |
| `reference-portfolio` | Non-dominated promoted sources assigned to explicit design roles | portfolio compiler | reference-packet compiler |
| `reference-packet` | Approved reference evidence and extracted design grammar | reference compiler | direction generator |
| `visual-direction` | One candidate composition, tokens, assets and motion strategy | architect | board renderer |
| `human-decision` | Approved/rejected direction or release bound to hashes | human | orchestrator |
| `design-contract` | Frozen direction selected for implementation | contract compiler | Gemini executor |
| `execution-task` | Bounded operation, permissions, inputs, outputs and acceptance IDs | orchestrator | Gemini adapter |
| `task-result` | Claimed outputs, changed files, usage and evidence | Gemini adapter | verifier |
| `visual-acceptance` | Machine-executable geometric, token, state and screenshot checks | architect/verifier | QA gates |
| `artifact-manifest` | Canonical tree of output files and hashes | artifact builder | every gate |

Zod definitions are the runtime source of truth. JSON Schemas are generated from them for IDE and external tool consumption. A schema-versioned migration layer preserves V1 compatibility during rollout.

### Canonical versus transport representation

- Persisted contracts use descriptive field names.
- Transport JSON is minified by removing whitespace, not by replacing meaningful names with cryptic keys.
- The executor receives only the contract slices and files needed for its current task.
- Large immutable inputs are referenced by path and hash; their contents are retrieved progressively.
- Canonical hashing sorts object keys recursively before SHA-256 calculation.

## Normative execution task

```json
{
  "schemaVersion": 2,
  "contractKind": "execution-task",
  "identity": {
    "runId": "scalex-hero-v2-001",
    "taskId": "implement-approved-hero",
    "clientScope": "flashtech-caso-04-growth",
    "actorId": "gemini-ide-builder-01",
    "role": "implementation-agent"
  },
  "authority": {
    "enforcementMode": "soft",
    "readAllowlist": [
      "clientes/flashtech-caso-04-growth/design-contract.json",
      "clientes/flashtech-caso-04-growth/site/index.html"
    ],
    "writeAllowlist": [
      "clientes/flashtech-caso-04-growth/site/index.html"
    ],
    "capabilityAllowlist": [
      "filesystem.read",
      "filesystem.patch",
      "shell.test.focused"
    ],
    "network": { "mode": "deny", "hosts": [] }
  },
  "inputs": [
    {
      "path": "clientes/flashtech-caso-04-growth/design-contract.json",
      "sha256": "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "purpose": "normative-design-contract"
    }
  ],
  "operations": [
    {
      "operationId": "hero-layout",
      "action": "implement",
      "target": "[data-a2-hero]",
      "requirements": ["REQ-HERO-001", "REQ-HERO-002"]
    }
  ],
  "requiredOutputs": [
    {
      "path": "clientes/flashtech-caso-04-growth/site/index.html",
      "mediaType": "text/html"
    }
  ],
  "acceptanceIds": ["ACC-HERO-001", "ACC-HERO-002"],
  "budget": {
    "maxAttempts": 1,
    "timeoutMs": 900000,
    "maxFilesChanged": 1,
    "maxAddedLines": 800
  },
  "failurePolicy": {
    "onAmbiguity": "blocked",
    "onMissingInput": "blocked",
    "onPolicyViolation": "failed-no-retry",
    "onAcceptanceFailure": "failed"
  }
}
```

The example hash is structurally valid but illustrative. Executable tasks must use hashes computed from current inputs.

## Rules that close ambiguity

1. Unknown fields are rejected.
2. Every normative requirement has a stable ID.
3. Every operation names its exact target and requirement IDs.
4. Every unit is explicit: `px`, `rem`, `%`, milliseconds or normalized viewport ratio.
5. Every color uses a declared color space and value.
6. Every breakpoint and state is explicit.
7. `premium`, `modern`, `clean`, `better`, `dynamic` and similar adjectives are forbidden in normative acceptance fields.
8. Subjective language is allowed only in `design-intent` and must be anchored to approved visual references or human decisions.
9. Conflicting requirements cause `CONTRACT_CONTRADICTION`; the executor is not allowed to choose.
10. Missing information causes `blocked`; the executor is not allowed to invent it.
11. The builder cannot update a baseline, contract, threshold or test used to verify its work.
12. A result cannot pass by self-declaration; independent gates rerun the acceptance IDs.

### Machine-executable acceptance assertions

Normative acceptance is a closed union. Free prose cannot be used as a pass condition. Supported assertion kinds are `existence`, `text`, `computed-style`, `normalized-rect`, `spatial-relation`, `interaction-state`, `asset`, `accessibility`, `motion-keyframe` and `implementation-golden`.

```json
{
  "id": "ACC-HERO-001",
  "kind": "normalized-rect",
  "severity": "p0",
  "viewport": { "width": 1440, "height": 900 },
  "target": "[data-a2-headline]",
  "measure": "x",
  "operator": "between",
  "expected": [0.045, 0.095],
  "evidencePath": "qa/metrics/desktop.json#/regions/headline/x"
}
```

Subjective goals use `human-review-anchor` entries outside the deterministic gate. Each entry must reference an intent-golden hash, a named region and a human decision checkpoint. It can request review but cannot produce a machine pass.

## Design intelligence model

### Discovery, quarantine and promotion

External websites, repositories, registries and MCP servers are untrusted discovery inputs. They cannot write to `copias/`, become executable dependencies or enter a Reference Pack directly.

The lifecycle is closed and monotonic:

```text
discovered → quarantined → qualified → probed → promoted
                      └→ rejected      └→ rejected
```

Promotion requires all of the following:

1. canonical identity and immutable revision or capture hash;
2. explicit license evidence or `inspiration-only` usage;
3. qualification evidence for every claimed role;
4. a bounded probe with zero P0 failures and a positive measured quality delta;
5. explicit human approval bound to the candidate, qualification and probe hashes.

Quality is a vector, not one opaque score. Creative merit, extractability, client fit, runtime quality and provenance are benefit axes; security, licensing and implementation complexity are risk axes. Selection uses the non-dominated Pareto set per required role. Popularity, stars and download counts may help discovery but cannot promote a source.

One source is not expected to provide every capability. A portfolio may combine art direction from a captured site, motion mechanics from a licensed experiment, component behavior from an approved Storybook and accessibility behavior from a design system.

The domain core is transport-independent. GitHub, registry, Storybook, Figma, Penpot and catalog integrations are adapters that produce `reference-candidate` contracts. MCP is an optional protocol boundary and never an authorization or quality boundary. External instructions, tool descriptions, README content and metadata are treated as untrusted data.

### Reference Pack

Each source has a type and role. A source may contribute composition without contributing copy, branding or assets.

```json
{
  "sourceId": "ref-editorial-01",
  "sourceType": "web-page",
  "roles": ["composition", "typography", "motion"],
  "provenance": {
    "url": "https://example.invalid",
    "capturedAt": "2026-09-16T00:00:00.000Z",
    "captureSha256": "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    "usageStatus": "approved-inspiration-only"
  },
  "extractedGrammar": {
    "layoutTopology": "asymmetric-split",
    "density": 3,
    "typeDominance": 9,
    "imageStrategy": "edge-cropped-hero-object",
    "motionSignature": ["masked-type-reveal", "single-scroll-trajectory"]
  }
}
```

Reference count is not fixed. A direction may use one to five sources, but every source must declare a role, provenance and usage status.

### Design grammar

The grammar captures relationships rather than CSS snippets:

- layout topology;
- hierarchy ratios;
- alignment and tension;
- whitespace rhythm;
- typography contrast;
- image crop and focal behavior;
- material language;
- section transitions;
- interaction and motion signature;
- responsive transformation strategy;
- patterns explicitly forbidden for the client.

### Design registry

The registry is framework-neutral. It separates reliable behavior from visual expression:

```text
design-registry/
  foundations/
  primitives/
  compositions/
  typography/
  materials/
  image-treatments/
  motion/
  transitions/
  experiments/
  adapters/html/
  adapters/react/
```

Each recipe declares provenance, license, when-to-use, avoid-when, content constraints, responsive strategy, motion contract, accessibility contract and test fixtures. Client colors, copy and assets are never global defaults.

### Tokens

Design tokens use DTCG-compatible JSON as the portable source of truth:

```text
tokens/core.tokens.json
tokens/semantic.tokens.json
tokens/typography.tokens.json
tokens/motion.tokens.json
clientes/<slug>/tokens/client.tokens.json
clientes/<slug>/tokens/component.tokens.json
```

Penpot is an optional visual editor and MCP adapter. Git contracts and tokens remain canonical so the architecture does not depend on Penpot availability.

## Direction generation and approval

The architect makes one stateless planning call and returns exactly three direction contracts. Diversity is enforced by mutually exclusive axes, not by merely using three actor IDs.

Example axes:

- Direction A: typography-dominant, low density, editorial motion.
- Direction B: image-dominant, cinematic composition, narrative scroll.
- Direction C: technical geometry, asymmetric data rhythm, responsive microinteractions.

Each critical section receives two or three rendered boards. The human reviewer compares them pairwise and records:

- selected direction;
- preserved elements;
- rejected patterns;
- requested deltas;
- decision rationale;
- hashes of the exact boards and contracts reviewed.

The selected direction is compiled into `design-contract.json`. Gemini never chooses the winning direction.

## Golden model

Two golden types are mandatory:

1. **Intent golden:** conceptual direction approved before implementation. It guides composition, hierarchy, material and atmosphere.
2. **Implementation golden:** browser capture approved after implementation. It becomes the exact regression baseline.

Pixel-perfect comparison is valid only against the implementation golden. The intent golden is evaluated through regions, geometry, token adherence and human review.

## Gemini execution model

### Single-task context

Gemini receives:

- one `execution-task`;
- the selected portion of `design-contract`;
- exact input files;
- approved visual assets or board paths;
- acceptance IDs;
- permitted output paths.

It does not receive the entire Vault, every client or the complete conversation.

### Filesystem IDE bridge

The bridge lifecycle is:

```text
prepare task package
→ snapshot allowed and protected paths
→ write inbox atomically
→ Gemini executes in isolated worktree
→ consume result
→ calculate actual diff
→ reject undeclared changes
→ build artifact manifest
→ run independent gates
```

If the IDE does not expose an automation API, dispatch may still require a human trigger. The system must report that limitation instead of presenting polling as autonomous execution.

### Repair loop

Repair context contains only:

- failure IDs;
- affected selectors/files;
- measured expected versus actual values;
- diff excerpt;
- prior artifact hash;
- unchanged contract hash.

At most three total implementation attempts are permitted. Before dispatching a fourth attempt, the run becomes `human-review-required`.

## Evidence plane

Deterministic gates run before subjective review:

1. contract/schema;
2. scope and diff;
3. artifact hash;
4. runtime/console/network/assets;
5. structural geometry and overflow;
6. accessibility and focus;
7. typography and tokens;
8. motion keyframes and reduced motion;
9. implementation-golden regression;
10. visual critic advisory;
11. human approval.

The visual matrix includes desktop, tablet portrait, tablet landscape and mobile, plus declared interaction states. States are driven by an `interaction-state` contract; the capture engine never guesses how to open a menu or modal.

## Quality benchmark

Operational correctness and visual capability are measured separately.

The first benchmark uses fixed briefs and the same content/reference inputs for the old and new pipelines. Outputs are anonymized and compared pairwise.

Score dimensions:

- human blind preference: 30%;
- reference alignment: 20%;
- direction coherence: 15%;
- contextual originality: 10%;
- responsive and interaction quality: 10%;
- accessibility and runtime: 10%;
- performance: 5%.

Promotion requires zero P0 failures and at least 70% pairwise preference for V2 over the baseline across the pilot set. This threshold is a project decision and may only change through a versioned human decision, never inside a repair task.

## Local review console

The console is a local, read-mostly UI that shows:

- reference roles and provenance;
- three directions side by side;
- desktop, mobile and motion states;
- intent and implementation goldens;
- visual diff heatmaps;
- deterministic failures;
- critic findings;
- comments anchored to regions;
- preserve/reject decisions;
- signed approval bound to artifact and contract hashes.

The initial implementation uses plain HTML, CSS and browser JavaScript served on loopback. A framework is not required until the interaction model proves it necessary.

## Security and integrity

- `copias/` is read-only.
- Every path is workspace-relative and normalized for Windows case behavior.
- Path policy covers symlinks, junctions, non-existent output parents and alternate data streams.
- Artifact identity is a canonical tree hash, not a hash of one HTML file.
- Ledger events form a hash chain; run state is calculated from events.
- Human approvals use a local signing key and bind checkpoint, artifact hash, contract hash and timestamp.
- Builder and verifier actor IDs must differ.
- Verification freezes the artifact until all gates finish.

## Rollout strategy

The work is delivered as vertical slices prioritized by perceptible output:

1. freeze a visual baseline;
2. implement surgical contracts and diff verification;
3. implement the local quarantine, qualification, probe and promotion core;
4. add read-only discovery adapters and promote one role-based reference portfolio;
5. produce one reference pack and three hero directions;
6. implement the selected hero through Gemini;
7. prove visual and responsive fidelity;
8. generalize tokens and design registry;
9. add the review console;
10. run the blind benchmark;
11. extend from hero to complete sites.

No client is promoted to `verified` or `production` solely because the V2 workflow exists.
