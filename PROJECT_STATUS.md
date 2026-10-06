# Project Status

> Evidence snapshot: 2026-08-28  
> Current maturity: `experimental`

This file separates observed project state from product vision. Update a claim only when its evidence is rerun.

## Claim–evidence ledger

| Claim | Evidence | Status |
|---|---|---|
| JavaScript source is syntactically valid | `node --check` across 55 project JavaScript files on 2026-08-28 | Observed pass (0 syntax errors) |
| Dependency audit has no known production vulnerability | `npm audit --omit=dev` on 2026-08-28 | Observed pass at that date |
| Automated test suite passes | `npm test` runs 95 tests across security, pipeline, ICM, vault, transmuter, anti-slop, unified quality gate, DNA-IR schema, constraint engine, HUD projector, transactional mutation resolver, and dual-gradient presets E2E | Observed pass (95/95) on 2026-09-28 |
| Component Reference Pipeline (CRP) End-to-End | Schemas canônicos (ComponentDNA, Archetype, Manifest, Certification), Tríade de Fixtures (Planes, Arc, Beautiful UI), Deterministic Capture Engine (`delta = 0`), Motion Reverse Engine, Similarity Engine, Archetype Miner, Clean-Room Compiler, Hub Agent Runtime, Quality Gates e Orchestrator DAG validados em `test/crp-e2e-suite.test.js`, `test/m1-schemas-fixtures.test.js` e `test/crp-pipeline.test.js` | Observed pass (66/66 tests, 0 skips) on 2026-10-05 |
| Hub Integration Bridge & 21st.dev `DraggableWidgetGrid` GenUI | Ingestão via `ShadcnRegistryAdapter` (`npx shadcn@latest add "https://21st.dev/r/carolinaraulino/draggable-widget-grid"`), 8 arquétipos canônicos no Design Vault, materialização física via `HubComponentCatalog` em `design-vault/components/synthesized/` (`.tsx` + `.genui.json`), compilação Clean-Room para React TSX e `hub.genui.v1` (`bento-draggable-grid` com física de mola $k=300, c=28$), persistência de estado/reordenação/resize no `HubAgentRuntime` e exportação assinada via `ReferenceAdoptionRegistry`, `HubTokenAndAssetBridge` e `StudioToHubExporter` validados em `test/hub-integration-and-widget-grid.test.js` | Observed pass (72/72 CRP + Hub tests, 0 skips) on 2026-10-06 |
| Hub GenUI Workbench & Live Server API | Aba interativa `🧩 Hub GenUI & Bento Grid` e endpoints `/api/hub/components`, `/api/hub/components/:id`, `/api/hub/widget-grid` e `/api/hub/ingest-registry` integrados em `src/server/preview-server.js` e validados em `test/hub-server-workbench.test.js`, `test/preview-server.integration.test.js` e `test/server-security.test.js` | Observed pass (93/93 combined tests, 0 skips) on 2026-10-06 |
| Dual-Gradient Presets & 3D Sync | Sincronização atômica dos 16 degraus do backdrop (`OPXY.bars`) e das 16 teclas de passo central do sintetizador (`OPXY.steps`) com 5 presets (Swiss, Berlin, Braun, Tokyo, Aura Precision), tipografia de assets (`Inter`), acento de hardware e preservação de cavidades LED validada em `test/dual-gradient-sync.test.js` e `test/opxy-presets-e2e.test.js` | Observed pass (5/5 presets + Playwright E2E) |
| Gooey Text Reveal & Kinetic Strip | Transição fluida SVG gooey (`#dna-gooey-filter`) na sequência vertical do `#strip` (`sequence.`) e reveals de copy sem quebra de indexação de DOM, Lenis scroll ou cinemática translateY | Observed pass (Visual screenshot + E2E) |
| Deliverables A & B: DNA-IR Schemas & OP-XY Mapping | Schemas agnósticos em `icm/_core/` e mapeamento canônico de OP-XY em `clientes/opxy-tuning-lab/dna-ir.json` validados em `test/dna-ir-schema.test.js` | Observed pass (6/6 tests) |
| Deliverable C: Constraint Engine & DAG | DAG com ordenação topológica, detecção de ciclos e 5 handlers C1-C5 (tipografia, contraste rim-light, geometria FOV, a11y motion, fps tier) validados em `test/constraint-engine.test.js` | Observed pass (8/8 tests) |
| Deliverable D: Schema-Driven HUD Projector | Projeção dinâmica de controles glassmórficos a partir de DNA-IR agnóstico em `src/generators/hud-projector.js` validada em `test/hud-schema-projection.test.js` | Observed pass (4/4 tests) |
| Deliverables E & F: Mutation Resolver & Transactional Rollback | Resolução declarativa com Mutation Budget, Edit Locality Score ($L \ge 0.70$) e rollback atômico criptográfico (SHA-256) validados em `test/transactional-mutation-resolver.test.js` | Observed pass (5/5 tests) |
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
| `opxy-tuning-lab` | Yes (DNA IR v0.1.0) | Yes | Yes | Verified (DNA IR + Constraints + HUD + Transactions) | Verified |
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


