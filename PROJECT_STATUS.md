# Project Status

> Evidence snapshot: 2026-08-28  
> Current maturity: `experimental`

This file separates observed project state from product vision. Update a claim only when its evidence is rerun.

## Claim–evidence ledger

| Claim | Evidence | Status |
|---|---|---|
| JavaScript source is syntactically valid | `node --check` across project JavaScript files on 2026-08-28 | Observed pass |
| Dependency audit has no known production vulnerability | `npm audit --omit=dev` on 2026-08-28 | Observed pass at that date |
| Automated test suite passes | `npm test` runs 35 tests across security, pipeline, ICM and vault | Observed pass (35/35) |
| CI is reproducible | CI configured with `npm ci` and `npm test`; lockfile versioned | Observed pass |
| Preview is client-isolated | Path traversal and cross-client leakage blocked and tested in `test/server-security.test.js` | Observed pass |
| Preview is local-only | Server binds strictly to `127.0.0.1` and tested in `test/preview-server.integration.test.js` | Observed pass |
| ICM context routing enforced | Cross-client and unselected reference access blocked in `test/icm-context-router.test.js` | Observed pass |
| Design Vault integrity verified | Schema, patterns and templates validated in `test/vault-integrity.test.js` | Observed pass |
| Client pages have zero runtime errors | Five previewed clients emitted `Unexpected token 'export'` at baseline | Pending repair |
| Quality gate validates visual regression | Current implementation captures screenshots without a pixel-diff assertion | Pending step 8 |
| DNA Lock is per-client | Per-client contracts formalized in `icm/_core/contracts.js` | In progress |
| Outputs contain no reference residue | Anti-slop validators active in stage 3 contract | In progress (step 7) |
| Static HTML + Next.js are both generated | No operational Next.js generation path was found at baseline | Unverified/unsupported |
| LCP is sub-second | No reproducible performance artifact is configured | Unverified |

## Client inventory

| Client | DNA | Brand spec | Site artifact | Initial status |
|---|---:|---:|---:|---|
| `caso-01-healthtech` | No | Yes | Yes | Experimental |
| `flashtech-caso-02-ecommerce` | No | No | Yes | Experimental |
| `flashtech-caso-03-d2c` | Yes | No | Yes | Experimental |
| `negocia-bem` | No | Yes | No | Incomplete |
| `negocia-bem-imobiliaria` | No | Yes | Yes | Experimental |
| `negociabem` | No | No | Yes | Experimental |

## Promotion rules

- `candidate`: build exists, required inputs are complete and deterministic checks run.
- `verified`: security, runtime, semantic, DNA, visual and accessibility gates pass on the production artifact.
- `production`: verified build is approved by an independent reviewer and reproduced from a clean checkout.

No current client has been promoted beyond `experimental`.

