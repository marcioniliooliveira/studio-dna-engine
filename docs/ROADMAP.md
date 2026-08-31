# Studio DNA Roadmap

This roadmap is ordered by dependency and proof. A milestone is promoted only when its exit evidence is fresh and reproducible.

## M0 — Reproducible Vault baseline

**Outcome:** A clean checkout contains every production artifact declared by the Design Vault.

**Status:** Observed complete on 2026-08-30.

**Evidence:** Commit `78b17ea`; a second worktree created from that commit ran `npm test` with 44/44 passing tests.

## M1 — Truthful, fail-closed production baseline

**Outcome:** Existing pipeline status is accurate and every required quality condition affects promotion.

**Status:** Observed complete for the core runtime candidate scope on 2026-08-30; visual regression, accessibility and performance remain unverified.

**Work:**

- Make network failures fail the unified gate and add a regression test.
- Separate a runtime screenshot fingerprint from a visual regression baseline.
- Add reproducible accessibility and performance checks, or explicitly keep them out of promotion status.
- Align `PROJECT_STATUS.md`, tests, and reports with actual runtime evidence.
- Establish a template promotion checklist: experimental → candidate → verified.

**Exit evidence:** A clean checkout reproduces a candidate pilot with all four core runtime gates passing, fails when a required core gate fails, and reports unsupported scopes as unverified.

## M2 — Versioned artifact registry and workflow state

**Outcome:** A client run can be planned once, paused, resumed, audited, costed, and reproduced without reading an agent conversation.

**Work:**

- Define schemas for run context, decisions, concept sessions, visual targets, tasks, results, and approvals.
- Add an append-only run ledger with hashes and provenance.
- Add a compact blueprint wire schema and a one-call `SolBlueprintAdapter`.
- Validate DAG acyclicity, budgets, client scope, tools and gates before execution.
- Record model usage, cache status, retries, latency and known or estimated cost from the first run.
- Implement the XState workflow state machine and persistence adapter.
- Expose controlled CLI or MCP commands for starting, inspecting, approving, and resuming a run.

**Exit evidence:** Tests prove one architect call per plan, reject invalid DAGs and budgets, resume persisted state, and block illegal transitions or cross-client artifacts.

## M3 — Reference intelligence and curated template promotion

**Outcome:** References become comparable, reusable production inputs rather than one-off clones.

**Work:**

- Define reference-card and template-contract schemas.
- Extract and curate archetype, layout, typography, motion, component, and technical metadata.
- Replace hardcoded reference selection with a scored recommendation plus human approval.
- Certify at least three templates across distinct archetypes.

**Exit evidence:** Three client pilots use the same selection and promotion contracts, with no cross-client context leakage.

## M4 — Visual Direction Studio

**Outcome:** The creator approves a concrete visual direction before implementation begins.

**Work:**

- Create `concept-render`, `approved-visual-target`, and decision schemas.
- Generate two or three concept renders from frozen client/reference context.
- Capture rationale, rejected directions, and selected attributes.
- Build an internal comparison view for concepts, references, and the current preview.

**Exit evidence:** A selected visual target is versioned, linked to a client run, and consumed by task planning without re-reading raw prompt history.

## M5 — Scoped execution and Gemini adapter

**Outcome:** Gemini can perform bounded work at controlled cost without owning workflow decisions.

**Work:**

- Implement `task-package.json` and `task-result.json` schemas.
- Add the initial Gemini IDE adapter; use manual package exchange if no reliable API/CLI/MCP integration exists.
- Add AST-based context projection and progressive disclosure; never mutate source while compacting context.
- Resolve only the tool definitions declared by the active DAG node.
- Define executor scopes, budgets, error fingerprints, retry caps, and structured outputs.
- Route non-interactive eligible work to Batch/Flex and keep interactive work on Standard.
- Add independent verifier tasks and targeted repair loops.

**Exit evidence:** A visual or bug-fix task is executed through the adapter, independently verified, stopped on repeated failure, and recorded with tokens, cost and outcome.

## M6 — Visual QA and production-loop completion

**Outcome:** Implementation can be compared to both production baselines and approved visual direction.

**Work:**

- Add deterministic screenshot capture for required viewports and regions.
- Add a Chromium/CDP runtime probe for computed geometry, scroll extents, stacking and asset state.
- Implement deterministic overflow, clipping, AABB collision, touch-target and broken-image checks.
- Replay bounded synthetic interaction scenarios with explicit animation/frame settling.
- Implement browser-output visual regression against runtime baselines.
- Add assisted semantic review against approved visual targets, always with evidence and human escalation.
- Route failures to focused repair tasks instead of broad prompts.

The initial performance target is a benchmark budget, not a correctness assumption: measure probe,
geometry, capture and comparison phases independently across representative pages. Do not claim
sub-500ms until repeated runs prove it. CDP output is compacted into findings; raw DOM/screenshots
are not forwarded to Gemini unless an explicitly authorized repair task requests a bounded slice.

**Exit evidence:** A deliberate visual regression fails the relevant gate, produces a usable diagnosis, and is repaired without changing unrelated sections. Runtime gates and Golden Screenshot comparison remain separate evidence classes.

## M7 — Client presentation layer

**Outcome:** A potential client can understand and validate the proposed direction before full production work.

**Work:**

- Build an internal presentation composer from approved artifacts.
- Create private, read-only presentation links.
- Show references, concept alternatives, rationale, decisions, preview, and QA status.
- Add client comments and explicit approval only after permission and audit requirements are defined.

**Exit evidence:** A presentation is generated entirely from versioned artifacts for one client and exposes no data from another client.

## M8 — Scale only when proven necessary

**Outcome:** Concurrent or long-running runs are reliable without changing the domain contracts.

**Work:**

- Add SQLite/Postgres persistence and BullMQ when concurrent workers are needed.
- Re-evaluate Temporal or another durable runtime only when multi-user, remote, or long-lived execution requires it.
- Add operational dashboards, rate limits, cost controls, retention, and authorization.

**Exit evidence:** Concurrent client runs have isolated contexts, bounded costs, reproducible artifacts, and observable recovery from worker failure.

## First implementation slice after roadmap approval

Start with M1, not with agents or interface work. The first slice should make the existing quality pipeline truthful and fail-closed, because every later orchestrator decision depends on trustworthy promotion evidence.
