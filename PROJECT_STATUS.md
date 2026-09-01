# Project Status

> Evidence snapshot: 2026-08-30
> Current maturity: `experimental`

This file separates observed project state from product vision. Update a claim only when its evidence is rerun.

## Claim–evidence ledger

| Claim | Evidence | Status |
|---|---|---|
| JavaScript source is syntactically valid | `node --check` across 55 project JavaScript files on 2026-08-28 | Observed pass (0 syntax errors) |
| Dependency audit has no known production vulnerability | `npm audit --omit=dev` on 2026-08-28 | Observed pass at that date |
| Automated test suite passes | `npm test` executed on 2026-09-01 across security, pipeline, ICM, vault, transmuter, anti-slop, pilot runner, unified quality gate and fixture-only Gemini execution | Observed pass (216/216) |
| CI uses reproducible install commands | Lockfile versioned and CI configured with `npm ci` and `npm test` | Documented; remote CI execution unverified |
| Clean-worktree reproduction passes | Detached worktree at `e03f833`: `npm ci` (0 vulnerabilities), `npm test` (51/51) and pilot candidate audit on 2026-08-30 | Observed pass for `e03f833` |
| Preview is client-isolated | Path traversal and cross-client leakage blocked and tested in `test/server-security.test.js` | Observed pass |
| Preview is local-only | Server binds strictly to `127.0.0.1` and is tested in `test/preview-server.integration.test.js` | Observed pass |
| ICM context routing is enforced | Cross-client and unselected-reference access blocked in `test/icm-context-router.test.js` | Observed pass |
| Design Vault integrity is enforced | Schema, patterns, templates and all 51 local Elyse asset references validated in `test/vault-integrity.test.js` | Observed pass |
| Deterministic transmutation is enforced | Idempotence and SHA-256 output hashes validated in `test/transmuter-and-anti-slop.test.js` | Observed pass |
| Anti-Slop Gate is enforced | Original-brand residue, meta-language, orphan slots and ±15% budget validated in `test/transmuter-and-anti-slop.test.js` | Observed pass |
| Core runtime quality gate is fail-closed | Playwright, console, network, structural and anti-slop regressions pass in `test/unified-quality-gate.test.js` | Observed pass in tests |
| Pilot core runtime audit passes | `scripts/build-and-certify-pilot.js` and fresh `linter-report.json` on 2026-08-30 | Observed candidate |
| Pilot has no observed core runtime failures | Fresh pilot report: 0 console errors, 0 failed requests and 0 broken images | Observed in this pilot run |
| DNA Lock is per-client | Formalized in `icm/_core/contracts.js` and exercised by `clientes/piloto-elyse-luxe/DNA.md` | Observed pass |
| Pilot output contains no reference residue | Fresh pilot anti-slop report: 0 violations | Observed in this pilot run |
| Visual regression is verified | Runtime baseline captured, but no executable comparison was run | Unverified |
| Accessibility is verified | No executable accessibility audit is configured | Unverified |
| Performance is verified | No reproducible performance budget or artifact is configured | Unverified |
| Static HTML + Next.js are both generated | No operational Next.js generation path was found at baseline | Unverified/unsupported |
| Fixture-only orchestration control plane | `node --test test/orchestration-*.test.js test/blueprint-validator.test.js test/artifact-registry.test.js test/run-store.test.js test/workflow-machine.test.js test/budget-governor.test.js test/dag-scheduler.test.js` on 2026-08-31 | Observed pass (65/65): validated plan, persisted workflow approvals, artifact-changing bounded QA repair, pause/resume, independent fixture verification and unknown-cost persistence |
| Full automated suite including orchestration fixture proof | `npm test` on 2026-08-31 | Observed pass (121/121) |
| Live Sol planning execution | No live model request or API credential was used in this run | Unverified |
| Fixture-only Gemini bounded repair workflow | `node --test test/gemini-executor.integration.test.js test/*executor*.test.js test/context-index.test.js test/tool-catalog.test.js test/result-verifier.test.js test/repair-controller.test.js test/cost-estimator.test.js` on 2026-09-01 | Observed pass (42/42): controlled 404 fixture, scoped package/context/node tools, routed fake adapter, independent runtime verifier, immutable candidate and cost-ledger evidence, repeated-fingerprint human intervention, and pre-execution budget block |
| Live Gemini execution | No live Gemini request or API credential was used; all Gemini responses in automated evidence are injected fakes | Unverified |
| New control-plane visual QA, accessibility and performance | No independent visual, accessibility or performance artifact was produced in this run | Unverified |

## Client inventory

| Client | DNA | Brand spec | Site artifact | QA Status | Maturity |
|---|---:|---:|---:|---|---|
| `piloto-elyse-luxe` | Yes | Yes | Yes | Candidate runtime audit: 0 console errors, 0 failed requests, 0 broken images and 0 anti-slop violations; visual/a11y/performance unverified | Candidate |
| `caso-01-healthtech` | No | Yes | Yes | Unverified | Experimental |
| `flashtech-caso-02-ecommerce` | No | No | Yes | Unverified | Experimental |
| `flashtech-caso-03-d2c` | Yes | No | Yes | Unverified | Experimental |
| `negocia-bem` | No | Yes | No | Incomplete | Experimental |
| `negocia-bem-imobiliaria` | No | Yes | Yes | Unverified | Experimental |
| `negociabem` | No | No | Yes | Unverified | Experimental |

## Promotion rules

- `candidate`: deterministic build exists and anti-slop, console, network and structural runtime gates pass.
- `verified`: all candidate evidence plus required security, semantic, DNA, visual-regression, accessibility and performance evidence passes on the same immutable artifact.
- `production`: a verified artifact is independently reviewed and reproduced from a clean checkout.

No client is currently promoted beyond `candidate` by executable evidence.
