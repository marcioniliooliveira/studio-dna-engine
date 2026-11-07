# E2E Test Infrastructure: Studio DNA Production Consolidation (v3.0)

## 1. Test Philosophy & Architecture

- **Opaque-Box & Requirement-Driven**: Derived strictly from `ORIGINAL_REQUEST.md` (2026-11-06T12:28:27Z), `PROJECT.md`, and technical specifications (`spec_miner_survey_r3_1/handoff.md`). Tests treat the system as black-box modules verifying observable inputs, outputs, error conditions, and interface contracts.
- **Zero-External-Dependency Guarantee**: Native Node.js 24+ test runner (`node:test`, `node:assert/strict`) with built-in runtime modules (`node:sqlite` `DatabaseSync`, `node:fs`, `node:http`, `node:crypto`, `node:child_process`, `node:os`). Zero uninstalled or external runtime test dependencies.
- **Progressive Testability & Dynamic Resolver**: Conforming to milestone progressive testability, the test harness (`test/e2e/r1-r5-harness.js`) dynamically resolves candidate modules in `src/persistence/` or `src/server/`, falling back to strict interface contract reference implementations during parallel track execution.
- **Real-Behavior Execution & Non-Facade Integrity**: Every test exercises concrete logic — real SQLite relational databases in WAL mode, real file-backed atomic NoSQL document writes up to 15MB, real git topology analysis, dry-run 3-way merge tree simulations, and real HTTP servers on ephemeral ports. Facade tests that always pass without assertions are strictly forbidden.

---

## 2. Feature Inventory Matrix (R1 to R5)

| Requirement | ID | Feature | Description | Primary Verification Target |
|---|---|---|---|---|
| **R1: Branches & Git** | F01 | Git Branch Topology & Audit | Discovers all local and remote branches and computes commit divergence relative to `main` | `scanGitBranchTopology`, `git rev-list` |
| **R1: Branches & Git** | F02 | Virtual 3-Way Merge Simulation | Dry-run conflict checking via `git merge-tree` verifying conflict-free trees | `simulate3WayMerge` |
| **R1: Branches & Git** | F03 | Clean Branch Integration Trunk | Validates integration branch `integration/staging-consolidated-v3` integrity | `git rev-list --left-right --count` |
| **R1: Branches & Git** | F04 | Reusable Script Harvester | Catalogs and extracts reusable service scripts from feature branches | `harvestReusableServiceScripts` |
| **R2: dnastudio UI/UX** | F05 | 21st.dev Component Catalog | Validates Bento grid, floating dock, and status pill token structures | `validate21stDevTokens` |
| **R2: dnastudio UI/UX** | F06 | dnastudio Control Panel Route | Verifies preview server `GET /` responds with valid HTML shell and viewport meta | Ephemeral HTTP Server on port 4000/dynamic |
| **R2: dnastudio UI/UX** | F07 | Interactive File & Asset Viewer | REST endpoint `/api/v3/files/tree` returning file catalog with MIME types | `GET /api/v3/files/tree` |
| **R2: dnastudio UI/UX** | F08 | Analysis Results Visualizer | Formats 38-variable quality audit metrics, APCA contrast, and radar scores | Metric bounding & display validation |
| **R2: dnastudio UI/UX** | F09 | Dynamic Viewport Switcher | Clamps and normalizes preview dimensions across Desktop, Tablet, and Mobile | `clampViewportDimensions` |
| **R3: Persistence** | F10 | Native SQLite Relational Engine | Initializes WAL-mode SQLite database using Node 24 native `node:sqlite` (`DatabaseSync`) | `SqliteEngine`, schemas, indexes, foreign keys |
| **R3: Persistence** | F11 | Embedded NoSQL Document Store | Schemaless collection store with atomic writes for deep ASTs, DNA payloads, and reports | `DocumentStore`, `Collection` |
| **R3: Persistence** | F12 | Hybrid Repository Coordinator | Unified repository bridging relational SQLite records with document payload retrieval | `HybridRepository` |
| **R3: Persistence** | F13 | Historical Filesystem Sync Ingestor | Scans `copias/` and `clientes/` to index existing historical runs | `syncExistingFilesystem` |
| **R3: Persistence** | F14 | Persistence REST API Layer | Serves `/api/v3/runs`, `/api/v3/runs/:id`, and `/api/v3/analytics/kpi` | REST API endpoints |
| **R4: Cleanup & Arch** | F15 | Syntax Audit Enforcement | Executes syntax verification (`node --check`) across all core project JavaScript files | `scripts/audit-syntax.js` |
| **R4: Cleanup & Arch** | F16 | Legacy Script Deprecation Scanner | Scans `scripts/` directory to detect throwaway debug scripts for pruning | Orphan detection heuristic |
| **R4: Cleanup & Arch** | F17 | Dependency Tree Auditor | Verifies `package.json` CommonJS specification and essential test/build scripts | Package manifest inspection |
| **R4: Cleanup & Arch** | F18 | Documentation Modernization | Validates presence and completeness of `README.md` and `PROJECT_STATUS.md` | File integrity checks |
| **R5: DevOps CI/CD** | F19 | Multi-Stage Production Dockerfile | Verifies multi-stage build (`node:20` -> `mcr.microsoft.com/playwright`), unprivileged `pwuser`, port 4000 | `parseAndValidateDockerfile` |
| **R5: DevOps CI/CD** | F20 | Container Configuration Hardening | Validates `.dockerignore` pruning and `docker-compose.yml` port 4000/volume mounts | Compose and ignore validators |
| **R5: DevOps CI/CD** | F21 | GitHub Actions CI/CD Pipeline | 3-job workflow (`.github/workflows/ci.yml`: `lint` -> `test` -> `docker-build`) | Workflow YAML schema validator |

---

## 3. 4-Tier Test Architecture Matrix

The test framework organizes all 54 test cases into 4 requirement-driven tiers:

| Tier | File Path | Focus Area | Test Count | Key Invariants Tested |
|---|---|---|---|---|
| **Tier 1: Feature Coverage** | `test/e2e/r1-r5-tier1-feature-coverage.test.js` | Happy-path direct contract verification for R1, R2, R3, R4, R5 | 27 tests | All 21 features verified individually against primary input/output contracts. |
| **Tier 2: Boundary & Corner Cases** | `test/e2e/r1-r5-tier2-boundary-corner.test.js` | Edge cases, stress, fault injection, injection attacks, resource constraints | 17 tests | Binary `.glb` conflict detection, SQL injection neutralization, 15MB AST payload handling, 0-clone empty states, non-root permissions, CI cache miss fallbacks. |
| **Tier 3: Pairwise Combinations** | `test/e2e/r1-r5-tier3-pairwise-combinations.test.js` | Cross-subsystem multi-module integration | 5 suites | Scraper -> Persistence -> Control Panel, Control Panel UI -> Re-audit, Git Unification -> Syntax Audit, Docker -> Volumes -> Server, CI Pipeline sequential gating. |
| **Tier 4: Real-World Scenarios** | `test/e2e/r1-r5-tier4-realworld-scenarios.test.js` | Realistic end-to-end user workflows and persona journeys | 5 scenarios | DevOps Lead Branch Consolidation, UI/UX Designer Transmutation, Data Engineer High-Volume Ingestion, New Contributor Cold-Start, DevOps Release Container Lifecycle. |

---

## 4. Test Suite Inventory & File Layout

```
test/e2e/
├── r1-r5-harness.js                             # Common test harness, candidate resolver & reference engines (42KB)
├── r1-r5-tier1-feature-coverage.test.js         # Tier 1: 27 Feature Coverage tests (22KB)
├── r1-r5-tier2-boundary-corner.test.js          # Tier 2: 17 Boundary & Corner Case tests (15KB)
├── r1-r5-tier3-pairwise-combinations.test.js   # Tier 3: 5 Cross-Subsystem Integration tests (9KB)
└── r1-r5-tier4-realworld-scenarios.test.js     # Tier 4: 5 Real-World Persona Scenarios (12KB)
```

---

## 5. Execution & Validation Commands

All test files pass syntax audit and execute cleanly using native Node.js:

```bash
# 1. Syntax verification across test harness and all test suites
node --check test/e2e/r1-r5-harness.js
node --check test/e2e/r1-r5-tier1-feature-coverage.test.js
node --check test/e2e/r1-r5-tier2-boundary-corner.test.js
node --check test/e2e/r1-r5-tier3-pairwise-combinations.test.js
node --check test/e2e/r1-r5-tier4-realworld-scenarios.test.js

# 2. Run Tier 1 Feature Coverage Suite
node --test test/e2e/r1-r5-tier1-feature-coverage.test.js

# 3. Run Tier 2 Boundary & Corner Cases Suite
node --test test/e2e/r1-r5-tier2-boundary-corner.test.js

# 4. Run Tier 3 Pairwise Combinations Suite
node --test test/e2e/r1-r5-tier3-pairwise-combinations.test.js

# 5. Run Tier 4 Real-World Scenarios Suite
node --test test/e2e/r1-r5-tier4-realworld-scenarios.test.js

# 6. Run Complete 4-Tier Test Suite (54 Tests, 20 Suites)
node --test test/e2e/r1-r5-*.test.js
```
