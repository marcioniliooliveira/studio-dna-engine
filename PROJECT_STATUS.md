# Project Status

> Evidence snapshot: 2026-08-28  
> Current maturity: `experimental`

This file separates observed project state from product vision. Update a claim only when its evidence is rerun.

## Claim–evidence ledger

| Claim | Evidence | Status |
|---|---|---|
| JavaScript source is syntactically valid | `node --check` across project JavaScript files on 2026-08-28 | Observed pass |
| Dependency audit has no known production vulnerability | `npm audit --omit=dev` on 2026-08-28 | Observed pass at that date |
| Automated test suite passes | `npm test` has no configured script at baseline | False |
| CI is reproducible | CI calls `npm test`; lockfile is ignored at baseline | False |
| Preview is client-isolated | Encoded path traversal returned files outside the requested client | False |
| Preview is local-only | Server binds to `0.0.0.0` at baseline | False |
| Client pages have zero runtime errors | Five previewed clients emitted `Unexpected token 'export'` at baseline | False |
| Quality gate validates visual regression | Current implementation captures screenshots without a pixel-diff assertion | False |
| DNA Lock is per-client | Baseline audit uses FlashTech-specific P0 rules globally | False |
| Outputs contain no reference residue | Visible original-brand, English and placeholder content exists in client outputs | False |
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

