# Project Status

> Evidence snapshot: 2026-08-28  
> Current maturity: `experimental`

This file separates observed project state from product vision. Update a claim only when its evidence is rerun.

## Claim–evidence ledger

| Claim | Evidence | Status |
|---|---|---|
| JavaScript source is syntactically valid | `node --check` across 55 project JavaScript files on 2026-08-28 | Observed pass (0 syntax errors) |
| Dependency audit has no known production vulnerability | `npm audit --omit=dev` on 2026-08-28 | Observed pass at that date |
| Automated test suite passes | `npm test` runs 43 tests across security, pipeline, ICM, vault, transmuter, anti-slop and unified quality gate | Observed pass (43/43) |
| CI is reproducible | CI configured with `npm ci` and `npm test`; lockfile versioned | Observed pass |
| Preview is client-isolated | Path traversal and cross-client leakage blocked and tested in `test/server-security.test.js` | Observed pass |
| Preview is local-only | Server binds strictly to `127.0.0.1` and tested in `test/preview-server.integration.test.js` | Observed pass |
| ICM context routing enforced | Cross-client and unselected reference access blocked in `test/icm-context-router.test.js` | Observed pass |
| Design Vault integrity verified | Schema, patterns and templates validated in `test/vault-integrity.test.js` | Observed pass |
| Deterministic transmutation verified | Idempotência e hashes SHA-256 validados em `test/transmuter-and-anti-slop.test.js` | Observed pass |
| Anti-Slop Gate enforced | Resíduos de marca original, meta-linguagem, slots órfãos e budget $\pm 15\%$ validados em `test/transmuter-and-anti-slop.test.js` | Observed pass |
| Unified Quality Gate operational | Playwright E2E + Console + Network + Structural + Anti-Slop validados em `test/unified-quality-gate.test.js` | Observed pass |
| Golden Pilot Certified | Piloto `piloto-elyse-luxe` construído e certificado via `scripts/build-and-certify-pilot.js` | Observed pass (`verified`) |
| Client pages have zero runtime errors | Piloto certificado executado com 0 console errors e 0 network failures | Observed pass no piloto |
| DNA Lock is per-client | Formalizado em `icm/_core/contracts.js` e exercido no piloto `clientes/piloto-elyse-luxe/DNA.md` | Observed pass |
| Outputs contain no reference residue | AntiSlopGate Cheerio scanner executado e aprovado com 0 violações no piloto | Observed pass |
| Static HTML + Next.js are both generated | No operational Next.js generation path was found at baseline | Unverified/unsupported |
| LCP is sub-second | No reproducible performance artifact is configured | Unverified |

## Client inventory

| Client | DNA | Brand spec | Site artifact | QA Status | Maturity |
|---|---:|---:|---:|---|---|
| `piloto-elyse-luxe` | Yes | Yes | Yes | Verified (0 JS err, 0 broken img, 0 slop) | Candidate / Verified |
| `caso-01-healthtech` | No | Yes | Yes | Unverified | Experimental |
| `flashtech-caso-02-ecommerce` | No | No | Yes | Unverified | Experimental |
| `flashtech-caso-03-d2c` | Yes | No | Yes | Unverified | Experimental |
| `negocia-bem` | No | Yes | No | Incomplete | Experimental |
| `negocia-bem-imobiliaria` | No | Yes | Yes | Unverified | Experimental |
| `negociabem` | No | No | Yes | Unverified | Experimental |

## Promotion rules

- `candidate`: build exists, required inputs are complete and deterministic checks run.
- `verified`: security, runtime, semantic, DNA, visual and accessibility gates pass on the production artifact.
- `production`: verified build is approved by an independent reviewer and reproduced from a clean checkout.

`piloto-elyse-luxe` é o primeiro cliente promovido para status `verified`.


