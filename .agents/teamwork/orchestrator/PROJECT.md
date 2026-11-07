# Project: Studio DNA Production Consolidation & Modernization

## Architecture
Consolidation and modernization of Studio DNA Engine into an enterprise production release:
1. **Git Integration Trunk (`integration/staging-consolidated-v3`)**: Unifies core branches (`feat/pareto-v3-engine`, `client/silvio-iwata`, `integration/v2-dna-orchestrator`, `feat/merge-orchestration-into-main`) and selectively ports isolated high-value assets (Hub GenUI, Three.js cloud hero, local vendor determinism).
2. **Hybrid Persistence Architecture (`src/persistence/`)**:
   - Relational: Native `node:sqlite` (`DatabaseSync` built into Node 24.15.0) in WAL mode (`data/studio_dna.db`) for indexed runs, quality audits, client projects, design tokens, and files catalog.
   - Non-Relational: Embedded Document Store (`data/documents/`) with collection semantics for schemaless raw scrape ASTs, design DNA JSON trees, shaders, and 38-variable audit snapshots.
   - Coordinator: `HybridRepository` bridging relational queries and document retrieval, exposed via `/api/v3/*` endpoints in `src/server/preview-server.js`.
3. **dnastudio Modern UI/UX (21st.dev Component Patterns)**:
   - Command center replacing string-concatenated HTML and blocking `alert()` dialogs.
   - 21st.dev Bento KPI ribbon with SVG sparklines, collapsible sidebar navigation, ⌘K command palette, interactive file explorer & syntax viewer, before/after visual diff slider, 38-variable audit radar, sortable data table with slide-over sheet inspector, and non-blocking Sonner toast system.
4. **Architectural Cleanup & Hygiene**:
   - Removal of 21 throwaway scripts in `scripts/`, root scratch files (`gemini_share_content.txt`), binary/HTML dumps, and duplicate root audit manifests.
   - Pruning redundant dependencies and updating technical documentation (`README.md`, `PROJECT_STATUS.md`).
5. **DevOps CI/CD Pipeline**:
   - Hardened multi-stage `Dockerfile` with non-root `pwuser`, exposed port 4000, persistent volumes `/app/copias` and `/app/data`, and healthcheck.
   - Updated `.dockerignore` and `docker-compose.yml`.
   - 3-job GitHub Actions workflow (`.github/workflows/ci.yml`: `lint` -> `test` -> `docker-build`).
6. **Dual Track E2E Testing**:
   - 4-tier requirement-driven opaque-box test suite (`test/e2e/r1-r5-*.test.js`) and Tier 5 adversarial coverage hardening.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F01 | Git Branch Topology & Audit | Discovers all 11 local/remote branches, commit divergence, and merge bases relative to `main` | M1 | survey (explorer_survey_r1_1) |
| F02 | Virtual 3-Way Merge Simulation | Dry-run conflict checking via `git merge-tree --write-tree` verifying clean trees | M1 | survey (explorer_survey_r1_1) |
| F03 | Clean Branch Chained Integration | Merges `feat/pareto-v3-engine`, `client/silvio-iwata`, `integration/v2-dna-orchestrator`, `feat/merge-orchestration-into-main` into `integration/staging-consolidated-v3` with 0 conflicts | M1 | survey (explorer_survey_r1_1) |
| F04 | Selective High-Value Asset Porting | Ports 21st.dev Hub GenUI, Three.js cloud hero, local vendor runtime determinism, and reference qualification engine from diverged branches | M1 | survey (explorer_survey_r1_1) |
| F05 | Native SQLite Relational Engine | Initializes WAL-mode SQLite database using Node 24 native `node:sqlite` (`data/studio_dna.db`) with schemas for runs, audits, clients, tokens, and files | M2 | survey (explorer_survey_r2_1) |
| F06 | Embedded Non-Relational Document Store | Schemaless collection store (`data/documents/`) with atomic file writes for deep scrape ASTs, DNA payloads, shaders, and audit reports | M2 | survey (explorer_survey_r2_1) |
| F07 | Hybrid Repository Coordinator | Unified repository (`src/persistence/hybrid-repository.js`) managing transactional coordination between SQLite and Document Store | M2 | survey (explorer_survey_r2_1) |
| F08 | Historical Filesystem Sync Ingestor | Idempotent scanner (`src/persistence/sync-ingestor.js`) importing existing historical runs and artifacts from `copias/` and `clientes/` | M2 | survey (explorer_survey_r2_1) |
| F09 | Persistence REST API Layer | `/api/v3/*` endpoints in `src/server/preview-server.js` serving paginated runs, analytics KPIs, client records, and file streams | M2 | survey (explorer_survey_r2_1) |
| F10 | 21st.dev Bento Metric Ribbon | Real-time KPI cards with SVG sparklines, run status radar, and token telemetry | M3 | survey (explorer_survey_r2_1) |
| F11 | 21st.dev Navigation & ⌘K Palette | Collapsible sidebar with route badges and global fuzzy search command palette | M3 | survey (explorer_survey_r2_1) |
| F12 | Interactive File & Artifact Viewer | Tree-view asset explorer with split-pane syntax-highlighted code/markdown/JSON viewer | M3 | survey (explorer_survey_r2_1) |
| F13 | Visual Before/After Diff Slider | Drag-to-compare visual diff slider between original scraped site and transmuted client page with multi-viewport switching | M3 | survey (explorer_survey_r2_1) |
| F14 | 38-Variable Multi-Factor Audit Visualizer | Radar/Polar score chart and interactive accordion cards for Anti-Slop, Console, Network, and Scroll Dynamics | M3 | survey (explorer_survey_r2_1) |
| F15 | Sortable Runs Table & Sheet Inspector | Filterable data table of historical runs with slide-over drawer showing full document payload | M3 | survey (explorer_survey_r2_1) |
| F16 | Non-Blocking Toast Notification System | Replaces legacy `alert()`/`confirm()` dialogs with non-blocking toast notifications | M3 | survey (explorer_survey_r2_1) |
| F17 | One-Off Legacy Script Deprecation | Safe deletion of 21 obsolete debug scripts in `scripts/check-*.js` and `scripts/find-*.js` | M4 | survey (explorer_survey_r1_1) |
| F18 | Scratch & Binary Clutter Deletion | Deletion of `gemini_share_content.txt`, tracked HTML/image dumps, and root duplicate audit files | M4 | survey (explorer_survey_r1_1) |
| F19 | Dependency Tree Consolidator | Pruning redundant packages in `package.json` while maintaining zero-dependency guarantees | M4 | survey (explorer_survey_r1_1) |
| F20 | Technical Documentation Modernization | Update `README.md` and `PROJECT_STATUS.md` reflecting v3.0 consolidated architecture, CLI usage, and CI/CD | M4 | survey (explorer_survey_r1_1) |
| F21 | Multi-Stage Production Dockerfile | Hardened container build: Node 20 builder -> Playwright runner, unprivileged `pwuser`, port 4000, volumes `/app/copias` and `/app/data`, healthcheck | M5 | survey (spec_miner_survey_r3_1) |
| F22 | Container Configuration Hardening | Updated `.dockerignore` excluding unnecessary directories and `docker-compose.yml` with port 4000 mapping and volume mounts | M5 | survey (spec_miner_survey_r3_1) |
| F23 | GitHub Actions CI/CD Pipeline | 3-job workflow (`.github/workflows/ci.yml`): `lint` (syntax audit), `test` (Playwright browser cache & OS deps), `docker-build` (build & smoke test) | M5 | survey (spec_miner_survey_r3_1) |
| F24 | Dual Track 4-Tier E2E Test Suite | 4-tier requirement-driven test suite (`test/e2e/r1-r5-*.test.js`) covering features, boundaries, pairwise combinations, and real-world scenarios | M6 / Test Track | survey (spec_miner_survey_r3_1) |
| F25 | Final Integration & Mainline Release | 100% test pass on staging branch, Tier 5 adversarial hardening, clean merge into `main`, and release tag `v3.0.0-verified` | M6 | survey (ORIGINAL_REQUEST) |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Branch Audit, Conflict Resolution & Integration Branch | Create `integration/staging-consolidated-v3`, merge clean branches, selectively port assets from diverged branches, generate conflict matrix report | Survey complete | DONE |
| M2 | Hybrid Persistence Layer (SQLite + NoSQL) | Implement `node:sqlite` relational schema, embedded document store, `HybridRepository`, `/api/v3/*` endpoints, and legacy sync ingestor | M1 | DONE (commit 47a434f, Gate PASS) |
| M3 | Modernization of dnastudio UI/UX with 21st.dev | Rebuild dnastudio control panel with 21st.dev patterns (Bento ribbon, ⌘K, file viewer, visual diff, 38-variable visualizer, table sheet, toasts) | M2 | DONE (commit a66f5cd, Gate PASS) |
| M4 | Architectural Consolidation, Dependency Pruning & Cleanup | Delete 21 throwaway scripts, clean scratch/dumps, prune dependencies, update `README.md` and `PROJECT_STATUS.md` | M1, M2 | DONE (commit 510ea91, Gate PASS) |
| M5 | DevOps CI/CD Pipeline (Docker & GitHub Actions) | Implement multi-stage Dockerfile, updated docker-compose, hardened .dockerignore, and 3-job GitHub Actions CI/CD workflow | M1, M4 | DONE (commit 421f6d9, Gate PASS) |
| Test Track | E2E Test Suite Creation | Create 4-tier requirement-driven test suite (`test/e2e/r1-r5-*.test.js`) and publish `TEST_READY.md` | Survey complete | DONE |
| M6 | Final Acceptance, E2E Pass & Main Merge | 100% pass of E2E test suite, adversarial coverage hardening, merge staging into `main`, verify `main` stability | M1-M5, Test Track | IN_PROGRESS |

## Interface Contracts

### 1. Hybrid Repository Interface (`src/persistence/hybrid-repository.js`)
```javascript
class HybridRepository {
  async init();
  async startAnalysisRun({ siteSlug, targetUrl, mode, model, inputHash });
  async completeAnalysisRun(runId, { status, outputTokens, costUsd, artifactHash, rawScrapePayload });
  async recordQualityAudit({ runId, siteSlug, auditType, passed, score, metrics, rawReport });
  async listAnalysisRuns({ siteSlug, status, limit, offset, sortBy, sortOrder });
  async getRunDetails(runId);
  async getDashboardAnalytics();
  async syncExistingFilesystem();
}
```

### 2. Embedded Document Store Interface (`src/persistence/document-store.js`)
```javascript
class DocumentStore {
  constructor({ basePath = 'data/documents' });
  async init();
  getCollection(name); // returns Collection instance
}

class Collection {
  async insertOne(doc); // assigns _id, createdAt, persists atomically
  async findById(id);
  async find(queryFilter);
  async updateOne(id, updateData);
  async deleteById(id);
}
```

### 3. REST API Endpoints (`src/server/preview-server.js`)
- `GET /api/v3/runs?page=1&limit=20&status=passed&siteSlug=...`
- `GET /api/v3/runs/:runId`
- `GET /api/v3/runs/:runId/raw`
- `GET /api/v3/analytics/kpi`
- `GET /api/v3/clients`
- `GET /api/v3/clients/:slug/audits`
- `GET /api/v3/files/tree`
- `GET /api/v3/files/content?path=...`
- `POST /api/v3/admin/sync`

### 4. Git Integration Contract
- Base branch: `feat/pareto-v3-engine` (clean linear ancestor of `main`).
- Integration branch: `integration/staging-consolidated-v3`.
- Merged branches: `origin/client/silvio-iwata`, `origin/integration/v2-dna-orchestrator`, `feat/merge-orchestration-into-main`.
- Selective asset porting: `src/hub/`, `src/runtime/hub-agent-runtime.js`, `src/components/interactive-cloud-hero/`, `clientes/negocia-bem/site/assets/vendor/`, `src/design/`.
- Target release: `main` via `--no-ff` merge after 100% green verification.

## Code Layout
- Root:
  - `Dockerfile` (multi-stage production container)
  - `docker-compose.yml` (service orchestrator with port 4000 and volumes)
  - `.dockerignore` (pruned ignore rules)
  - `package.json` (CommonJS dependencies & scripts)
  - `README.md` (updated technical documentation)
  - `PROJECT_STATUS.md` (updated project status)
- Backend & Core:
  - `bin/cli.js` (CLI entry point)
  - `bin/orchestrator.js` (DAG orchestrator entry point)
  - `src/server/preview-server.js` (HTTP preview server, dnastudio backend, REST API)
  - `src/persistence/sqlite-engine.js` (Node 24 native SQLite engine)
  - `src/persistence/document-store.js` (embedded JSON document store)
  - `src/persistence/hybrid-repository.js` (hybrid persistence coordinator)
  - `src/persistence/sync-ingestor.js` (legacy filesystem sync scanner)
- Frontend (dnastudio):
  - `src/server/preview-server.js` (modernized HTML/SPA bootstrap with 21st.dev components)
  - `shadcnuikit-dashboards/` & `reactbitspremium/` (component source libraries)
- CI/CD:
  - `.github/workflows/ci.yml` (lint -> test -> docker-build)
- Tests:
  - `test/persistence-sqlite.test.js`
  - `test/persistence-docstore.test.js`
  - `test/persistence-hybrid.test.js`
  - `test/persistence-sync.test.js`
  - `test/preview-server-v3-api.test.js`
  - `test/e2e/r1-r5-tier1-feature-coverage.test.js`
  - `test/e2e/r1-r5-tier2-boundary-corner.test.js`
  - `test/e2e/r1-r5-tier3-pairwise-combinations.test.js`
  - `test/e2e/r1-r5-tier4-realworld-scenarios.test.js`
