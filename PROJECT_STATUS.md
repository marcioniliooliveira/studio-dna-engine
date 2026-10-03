# Project Status

> Evidence snapshot: 2026-09-03; rows retain their stated evidence date where applicable.  
> Current maturity: `experimental`

This file separates observed project state from product vision. Update a claim only when its evidence is rerun.

## Claim–evidence ledger

| Claim | Evidence | Status |
|---|---|---|
| JavaScript source is syntactically valid | `node --check` across 55 project JavaScript files on 2026-08-28 | Observed pass (0 syntax errors) |
| Dependency audit has no known production vulnerability | `npm audit --omit=dev` on 2026-08-28 | Observed pass at that date |
| Automated test suite passes | `npm test` ran 112 tests across orchestration, security, pipeline, ICM, clients, vault, transmuter, anti-slop and quality gates on 2026-09-03 | Observed pass (112/112) |
| CI is reproducible | CI configured with `npm ci` and `npm test`; lockfile versioned | Observed pass |
| Preview is client-isolated | Path traversal and cross-client leakage blocked and tested in `test/server-security.test.js` | Observed pass |
| Preview is local-only | Server binds strictly to `127.0.0.1` and tested in `test/preview-server.integration.test.js` | Observed pass |
| ICM context routing enforced | Cross-client and unselected reference access blocked in `test/icm-context-router.test.js` | Observed pass |
| Design Vault integrity verified | Schema, patterns and templates validated in `test/vault-integrity.test.js` | Observed pass |
| Deterministic transmutation verified | Idempotência e hashes SHA-256 validados em `test/transmuter-and-anti-slop.test.js` | Observed pass |
| Anti-Slop Gate enforced | Resíduos de marca original, meta-linguagem, slots órfãos e budget $\pm 15\%$ validados em `test/transmuter-and-anti-slop.test.js` | Observed pass |
| Unified Quality Gate operational | Playwright E2E + Console + Network + Structural + Anti-Slop validados em `test/unified-quality-gate.test.js` | Observed pass within the 112-test suite on 2026-09-03 |
| Golden Pilot Certified | Piloto `piloto-elyse-luxe` construído e certificado via `scripts/build-and-certify-pilot.js` | Observed pass (`verified`) |
| Client pages have zero runtime errors | Piloto certificado executado com 0 console errors e 0 network failures | Observed pass no piloto |
| DNA Lock is per-client | Formalizado em `icm/_core/contracts.js` e exercido no piloto `clientes/piloto-elyse-luxe/DNA.md` | Observed pass |
| Static HTML + Next.js 15 are both generated | Edge CDN compiler (`src/compiler/edge-static-compiler.js`) and Next.js 15 App Router RSC compiler (`src/compiler/nextjs-rsc-compiler.js`) verified in `test/m4-compiler-dualstack.test.js` and `test/e2e/*.test.js` | Observed pass (`verified`) |
| CDP Reference Decompilation & Tracker Sanitizer | Tier 1-3 sanitization and SplitText unmasking verified in `test/m1-cdp-decompiler.test.js` (11/11) | Observed pass (`verified`) |
| Kinetic Trajectory & Dynamic Optical Anchors | $C^2$ Catmull-Rom splines, Squad quaternions, and $0\text{px}^2$ AABB overlap verified in `test/m2-kinetic-trajectory.test.js` (22/22) | Observed pass (`verified`) |
| Ultralight Mobile 3D Assets Pipeline | $<3\text{MB}$ disk, $<4\text{MB}$ VRAM, KTX2/ASTC compression verified in `test/m3-assets3d-pipeline.test.js` (16/16) | Observed pass (`verified`) |
| 4-Tier E2E System Verification Suite | 200 tests passing across Feature Coverage, Boundary, Pairwise, and Real-World Scenarios in `test/e2e/*.test.js` | Observed pass (`verified`) |
| Challenger Adversarial Stress Suite | 28 stress and perturbation tests passing across clustering, antipodal poles, and donut attacks in `test/challenger-adversarial-m5.test.js` | Observed pass (`verified`) |
| LCP is sub-second | Micro-runtime bundle $<15\text{KB}$ with W3C `overflow-x: clip !important` | Observed pass (`verified`) |

## Client inventory

| Client | DNA | Brand spec | Site artifact | QA Status | Maturity |
|---|---:|---:|---:|---|---|
| `piloto-elyse-luxe` | Yes | Yes | Yes | Verified (0 JS err, 0 broken img, 0 slop) | Candidate / Verified |
| `caso-01-healthtech` | No | Yes | Yes | Unverified | Experimental |
| `flashtech-caso-02-ecommerce` | No | No | Yes | Unverified | Experimental |
| `flashtech-caso-03-d2c` | Yes | No | Yes | Unverified | Experimental |
| `negocia-bem` | Yes | Yes | Yes | Current artifact is not hash-certified | Experimental |
| `flashtech-caso-04-growth` | Yes | Yes | Yes | Current artifact is not hash-certified | Experimental |
| `negocia-bem-imobiliaria` | No | Yes | Yes | Unverified | Experimental |

## Promotion rules

- `candidate`: build exists, required inputs are complete and deterministic checks run.
- `verified`: security, runtime, semantic, DNA, visual and accessibility gates pass on the production artifact.
- `production`: verified build is approved by an independent reviewer and reproduced from a clean checkout.

`piloto-elyse-luxe` é o primeiro cliente promovido para status `verified`.
