# Agent Operating Contract

## Purpose

Agents working in this repository optimize for evidence, client isolation and reproducible outcomes. Agreement with prior documentation or with the user is not a substitute for verification.

## Truth protocol

- Runtime evidence and executable tests override documentation, comments and handoff claims.
- Label material conclusions as `observed`, `inferred`, `documented` or `unverified`.
- Do not use `complete`, `fixed`, `validated`, `100%`, `zero errors` or `production-ready` without a fresh command or artifact that proves the claim.
- Every status claim must identify its evidence in the current run.
- A caught exception, fallback, stub or preview-only repair is not success.
- Report contradictions between intended architecture and current behavior.
- Before supporting a consequential approach, state the strongest failure mode or disconfirming evidence.

## Change protocol

- Use a dedicated branch for material work.
- Preserve unrelated user changes and generated client artifacts.
- Write a failing regression test before changing production behavior.
- Keep changes scoped and independently reviewable.
- Preview, QA and production must evaluate the same immutable artifact.
- Builder and verifier should be separate review roles for material releases.

## Context and client isolation

- ICM means **Interpretable Context Methodology**.
- ICM governs context routing; it is not the name of the site-transformation engine.
- Treat `copias/` as immutable reference evidence.
- Read only the active client's `DNA.md`, `brand-spec.json`, content and decisions.
- Never reuse client-specific colors, copy, assets or patches as global defaults.
- Do not load all clients or the entire Vault when a stage can name narrower inputs.

## Production status

- The repository is currently `experimental`.
- A build may be promoted through `experimental → candidate → verified → production` only by explicit quality gates.
- Read `PROJECT_STATUS.md` before relying on claims in `README.md` or `HANDOFF.md`.
- Follow `project-transformation-plan.md` for the active hardening sequence.

