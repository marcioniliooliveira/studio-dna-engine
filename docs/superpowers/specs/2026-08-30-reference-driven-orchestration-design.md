# Studio DNA — Reference-Driven Orchestration Design

## Status

Proposed for review.

## Product definition

Studio DNA is an internal, reference-driven website production system. It turns curated, high-level web references into original client sites through controlled context, human-directed visual exploration, deterministic compilation, and independent quality gates.

It is not a generic website cloner, a one-prompt page generator, or an autonomous system that approves its own work.

## Current evidence and boundary

Observed on 2026-08-30:

- The project has client-isolated ICM contracts, deterministic HTML transmutation, a Design Vault, and Playwright-based quality checks.
- `npm test` passed 44/44 tests in a newly created clean worktree after the Vault artifacts were versioned in commit `78b17ea`.
- The certified pilot is a single controlled reference/client combination. Its reference selection and compatibility score are currently hardcoded in `scripts/build-and-certify-pilot.js`.

Therefore, the project has demonstrated a reference-driven production method, but has not yet demonstrated automatic selection, reusable multi-reference composition, visual-target generation, or generalized production across several templates and clients.

## Product principles

1. **Reference evidence is not client identity.** A reference may supply structure, rhythm, component behavior, typography patterns, and motion principles. It must not supply the original brand, copy, proprietary imagery, or unreviewed implementation wholesale.
2. **The client DNA is authoritative.** Each client has isolated brand rules, content, assets, and decisions. The system never imports another client's context.
3. **Creative direction precedes implementation.** A visual target is approved before agents change production artifacts.
4. **Artifacts, not chat history, cross boundaries.** Every stage emits versioned JSON, images, patches, manifests, or reports with provenance.
5. **Deterministic code owns deterministic work.** Extraction, composition, compilation, hashing, and objective checks remain scripts. Models are used for interpretation, alternatives, planning, and scoped repair.
6. **Builders do not self-certify.** Verification uses independent automated gates and human approval where judgment is required.

## Visual artifacts

Three visual artifacts have separate meanings:

| Artifact | Purpose | Approval authority |
| --- | --- | --- |
| `concept-render` | One of two or three exploratory directions in a creative session | Creator |
| `approved-visual-target` | The selected design direction and compositional intent | Creator, then client when presented |
| `runtime-baseline` | Screenshot of the rendered production artifact at defined viewports | Quality gate |

An approved visual target guides composition and hierarchy. It is not treated as a pixel-perfect executable specification, because generated images can contain unreadable text, impossible interactions, and non-renderable detail. The runtime baseline is the artifact used for strict regression testing.

## Target workflow

```text
Brief
  → context freeze
  → reference selection
  → creative session (2–3 concept renders)
  → creator approval
  → approved visual target
  → task planning
  → scoped execution
  → deterministic build
  → independent QA
  → repair loop or human decision
  → runtime baseline and release approval
```

Each run is client-scoped and stores the hashes of its input context. A revision creates a new run or a new visual-target version; it never mutates prior approval evidence.

## Control-plane architecture

The initial control plane uses an explicit XState state machine in the existing Node.js codebase. XState controls transitions, approvals, retries, and run state; it does not replace the existing ICM or deterministic pipeline.

```text
Interface / MCP / CLI
        ↓ events
Workflow controller (XState)
        ├── Context compiler
        ├── Reference composer
        ├── Creative-session service
        ├── Task planner
        ├── Executor registry
        ├── Deterministic pipeline adapters
        └── Quality controller
                ↓
          Artifact registry
```

Initial workflow states:

```text
draft → context_ready → concepts_generating → awaiting_concept_review
      → visual_target_approved → planning → tasks_ready → executing
      → verifying → awaiting_final_approval → verified

verifying → repairing → verifying
verifying → human_intervention
```

Only declared events can move a run between states. Examples: `CONTEXT_FROZEN`, `CONCEPTS_READY`, `TARGET_APPROVED`, `TASKS_ACCEPTED`, `QA_PASSED`, and `QA_BLOCKED`.

## Executor model

The workflow depends on a `ModelAdapter`, not a model name or IDE integration:

```text
ModelAdapter
├── GeminiIdeAdapter
├── GeminiApiAdapter
├── ScriptAdapter
└── HumanAdapter
```

The initial Gemini IDE adapter can exchange a `task-package.json` and `task-result.json` manually or through an IDE integration when one is available. Availability of a Gemini model in an IDE is not assumed to imply API, CLI, or MCP access.

Each task package includes a client ID, allowed inputs, allowed paths, expected artifacts, acceptance gates, token/cost budget, and maximum attempts. Executors cannot choose a client, reference, or promotion state.

## Quality architecture

The current quality gate remains the starting point, but must become fail-closed for every reported gate. The target gate evaluates:

| Class | Evidence |
| --- | --- |
| Technical | JavaScript errors, network failures, broken assets, deterministic build hash |
| Brand | DNA Lock, anti-slop, original-brand residue, content budgets |
| Visual | required screenshots, region-level regression, approved-target semantic review |
| Accessibility | keyboard, semantic structure, contrast and automated accessibility checks |
| Performance | reproducible budgets and artifacts, not qualitative claims |

A repair loop is bounded. After the configured number of failed attempts, it transitions to `human_intervention` with the evidence required for a decision.

## Client-facing presentation

The future interface is an internal creative workspace first. It assembles a private, read-only client presentation from approved artifacts:

- opportunity and briefing summary;
- selected references and their role;
- two or three concept renders with concise rationale;
- selected direction and captured decisions;
- latest production preview and QA state.

Interactive client comments and approvals are deferred until the internal workflow, permissions, and artifact provenance are operational.

## Explicit non-goals for the first implementation

- Multi-user SaaS, billing, or public client accounts.
- Automatic publishing to production.
- Unbounded autonomous loops.
- Generic reconstruction of arbitrary websites.
- Replacing deterministic HTML compilation with LLM file rewrites.
- Full visual pixel equality between generated concepts and browser output.

## Revisit triggers

Reconsider the initial XState control plane when at least one is true:

- multiple concurrent client runs require remote queue workers;
- approvals must survive long-running remote processes;
- the internal team needs robust distributed retries and worker observability;
- the same workflow is used by several people or systems simultaneously.

At that point, BullMQ plus persistent storage, Temporal, or another durable workflow runtime can be evaluated without changing the artifact contracts.
