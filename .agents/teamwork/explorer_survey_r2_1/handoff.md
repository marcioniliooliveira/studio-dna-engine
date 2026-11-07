# Handoff Report: Survey of dnastudio UI/UX and Hybrid Persistence Architecture (R2 & R3)

> **Agent**: `explorer_survey_r2_1`  
> **Milestone**: Survey dnastudio UI/UX and Data Persistence Architecture  
> **Timestamp**: 2026-11-06T12:55:00Z  
> **Handoff Type**: Hard (Investigation & Architecture Design Complete)  
> **Detailed Specification**: `.agents/teamwork/explorer_survey_r2_1/analysis.md`  

---

## 1. Observation

### 1.1 dnastudio Frontend Landscape
- `[observed]` In `package.json:2-10`, the project is identified as `studio-dna-engine` ("Studio DNA PRO — Awwwards Web Cloner, Design DNA, ICM Pipeline & Client Production Factory"), matching the user's reference to `dnastudio`.
- `[observed]` In `src/server/preview-server.js:200-513`, the existing control panel is built via a single multi-line JavaScript string concatenation function `buildDashboardHtml(copias, clientes)` containing a legacy monolithic `<style>` block and five static tabs (`tab-clients`, `tab-vault`, `tab-clones`, `tab-extractor`, `tab-review`).
- `[observed]` In `src/server/preview-server.js:428, 432, 434, 437, 443, 449, 452, 454, 465, 467, 481, 484, 491, 497`, interactive feedback in the UI relies on blocking native browser `alert()` dialogs (e.g. `alert("RESULTADO DO QUALITY GATE...")`).
- `[observed]` In `src/server/preview-server.js:750-860`, the server already provides foundational REST endpoints (`/api/extract`, `/api/client/create`, `/api/audit/:slug`, `/api/vault`, `/api/site/:slug`, `/api/v2/audit/:clientSlug`, `/api/v2/preview/diff/:clientSlug`, `/api/v2/directions/:clientSlug`, `/api/v2/decisions`, `/api/v2/orchestrate/run`, `/api/v2/orchestrate/status/:runId`, `/api/v2/ledger/:runId`).
- `[observed]` In `src/dev/dev-hud.js:1-100`, an in-browser agency Dev HUD uses Tweakpane 4 for Alt+Click element selection (`data-ds`), token inspection, and Direction tuning (T03A, T03B, T03C).
- `[observed]` In `src/components/WorkStage/`, 3D kinetic components are written in React 18, Three.js, and R3F, bundled via Vite (`vite.bundle.config.mjs`) into `workStage.bundle.js`.
- `[observed]` In `shadcnuikit-dashboards/`, a complete design system of layout components (`AppSidebar.tsx`, `DashboardHeader.tsx`, `DashboardShell.tsx`), UI primitives (`Card.tsx`, `Button.tsx`, `Badge.tsx`), widgets (`MetricCard.tsx` with SVG sparklines, `RevenueChart.tsx`, `ExerciseChart.tsx`), and pre-built dashboard pages already exists in the repo.
- `[observed]` In `reactbitspremium/`, seven directories of high-end UI components (`cards`, `chat-ai`, `dashboards-billing`, `icons-microvisuals`, `microinteractions`, `navigation`, `tools-visual-effects`) exist with Tailwind, Framer Motion, and GSAP.

### 1.2 Analysis & Scraper Artifact Storage (Current State)
- `[observed]` Pipeline outputs are emitted directly as loose filesystem files across disconnected folders:
  - `copias/<siteSlug>/PIPELINE_STATUS.json` (`pipeline-runner.js:54`)
  - `copias/<siteSlug>/SITE_TYPE.json` (`pipeline-runner.js:191`)
  - `copias/<siteSlug>/design-system/design_dna.json` (`dna-extractor.js`)
  - `copias/<siteSlug>/ui-ux/ui_ux_features.json` (`ui-ux-extractor.js`)
  - `copias/<siteSlug>/assets-manifest.json` (`asset-manifest-generator.js`)
  - `copias/<siteSlug>/MASTER_SPEC.md` (`spec-generator.js`)
  - `<siteDir>/linter-report.json` (`unified-quality-gate.js:369`, `box-diff-linter.js:168`)
  - `<clientDir>/EXECUTION_LEDGER.json` (`execution-ledger.js`, `preview-server.js:676`)
  - `clientes/<slug>/human-decision.json` (`preview-server.js:718`, `v2-review.js:91`)
  - `jumpflex_full_analysis.json` (root directory, 330 lines, 16KB)
  - Binary PNG screenshots in `qa-reports/<client>/` and `copias/<slug>/design-system/screenshot.png`.
- `[observed]` No database engine (relational or non-relational) currently exists in the codebase. All queries in `preview-server.js:864-869` perform synchronous directory traversals (`fs.readdirSync()`).

### 1.3 Execution Environment & Runtime Capabilities
- `[observed]` Command `node -v` returned `v24.15.0`.
- `[observed]` Command `node --eval "const { DatabaseSync } = require('node:sqlite'); const db = new DatabaseSync(':memory:'); db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)'); db.prepare('INSERT INTO test (name) VALUES (?)').run('it works'); console.log(db.prepare('SELECT * FROM test').all());"` executed with exit code 0 and output `[ [Object: null prototype] { id: 1, name: 'it works' } ]`.
- `[observed]` Command `npx vite --version` returned `vite/8.3.4 win32-x64 node-v24.15.0`.
- `[observed]` In `PROJECT.md:4` and `docs/research/v2.6/zero-dependency-engines.md:12`, a strict mandate states: "no external packages may be installed beyond the existing `package-lock.json`".

---

## 2. Logic Chain

1. **Premise**: Requirements R2 and R3 require modernizing dnastudio's UI/UX using 21st.dev component patterns, integrating a control panel for viewing files and analysis results, and establishing a hybrid persistence layer (SQLite + non-relational database).
2. **Current State Assessment**:
   - The current UI in `preview-server.js` is an inline string template without reactive state, virtual DOM, or component reusability, triggering disruptive browser `alert()` dialogs.
   - Analysis results are scattered across loose `.json` and `.md` files without indexes, schema validation, transactional atomicity, or relational querying capabilities.
3. **Persist Engine Selection**:
   - Node.js 24 provides native `node:sqlite` (`DatabaseSync`) in the standard library.
   - `[inferred]` Using `node:sqlite` satisfies Requirement R3 for relational storage while adhering strictly to the zero-dependency mandate (`PROJECT.md`), avoiding `node-gyp` native compilation failures on Windows and multi-platform Docker environments.
   - For the non-relational store, an `EmbeddedDocStore` implementing LokiJS/MongoDB collection semantics (`insertOne`, `find`, `findById`) with atomic file writes (`fs.renameSync`) provides schemaless persistence for deep scrape ASTs, GLSL shaders, and 38-variable audit snapshots without native compilation friction.
4. **UI/UX Modernization Strategy**:
   - Rather than relying on fragile string concatenation, dnastudio should leverage a modern React 18 SPA built with Vite (already present in the repository: `vite/8.3.4`).
   - The UI components from `shadcnuikit-dashboards` and `reactbitspremium` already present in the workspace provide the exact primitives needed to compose the 21st.dev patterns:
     - Bento KPI Metric Ribbon with SVG sparklines (`shadcnuikit-dashboards/src/components/dashboard/MetricCard.tsx`)
     - Collapsible Navigation (`shadcnuikit-dashboards/src/components/layout/AppSidebar.tsx`)
     - Global Command Palette (`⌘K`)
     - Interactive File Explorer & Split-Pane Syntax-Highlighted Code/Markdown/JSON Viewer
     - Visual Comparison / Interactive Image Diff Slider (Before vs. After)
     - 38-Variable Multi-Factor Audit Visualizer (Radar/Polar Chart + Accordion Gate Checks)
     - Filterable/Sortable Runs Data Table with Slide-Over Sheet Inspector
     - Non-blocking Sonner toast notifications replacing `alert()`.
5. **Integration Bridge**:
   - A unified `HybridRepository` class (`src/persistence/hybrid-repository.js`) coordinates SQLite tables (`analysis_runs`, `quality_audits`, `client_projects`, `design_tokens_index`, `files_catalog`) and Document Store collections (`raw_scrapes`, `dna_payloads`, `uiux_features`, `specs_and_templates`, `audit_reports`, `execution_events`).
   - Exposing REST endpoints (`/api/v3/*`) on `preview-server.js` bridges the persistence layer to the frontend control panel cleanly without breaking existing v2 routes.

---

## 3. Caveats

- `[unverified]` Real-time WebSocket support: While SSE (Server-Sent Events) is specified for streaming DAG node progress, high-frequency bidirectional WebSockets were not prototyped in this read-only survey.
- `[documented]` Node 24 requirement: `node:sqlite` requires Node.js >= 22.5.0. On older Node versions, a polyfill or fallback (`better-sqlite3` or `sql.js`) would be required, but `node -v` confirmed Node v24.15.0 in the target environment.
- `[observed]` Large binary assets: Video files (e.g. MP4 files in Jumpflex) and large 3D models should remain on disk and be referenced by relative path and SHA-256 hash in `files_catalog` rather than being stored as inline blobs in the database.

---

## 4. Conclusion

The technical path to fulfill Requirements R2 and R3 is well-defined and fully feasible with existing workspace capabilities:
1. **dnastudio Modernization (R2)**: Upgrade from string-concatenated HTML to a modular React 18 + Vite control panel utilizing the 21st.dev and shadcn/ui design patterns cataloged in `analysis.md`.
2. **Hybrid Persistence Architecture (R3)**:
   - Deploy **SQLite** via Node.js 24 native `node:sqlite` (`data/studio_dna.db` in WAL mode) for structured runs, relational metrics, timestamps, and indexes.
   - Deploy an **Embedded Document Store** (`data/documents/`) for schemaless raw scrape ASTs, design DNA JSON trees, shaders, and audit reports.
3. **Integration Bridge**: Implement `src/persistence/hybrid-repository.js` and `/api/v3/*` endpoints in `preview-server.js`, alongside an idempotent migration scanner to ingest existing historical artifacts from `copias/` and `clientes/`.

Full DDL schemas, document structures, API specifications, and component designs are documented in `.agents/teamwork/explorer_survey_r2_1/analysis.md`.

---

## 5. Verification Method

To independently verify the facts and technical feasibility established in this report:

1. **Verify Node.js Version & Native SQLite**:
   ```powershell
   node -v
   node --eval "const { DatabaseSync } = require('node:sqlite'); const db = new DatabaseSync(':memory:'); db.exec('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)'); db.prepare('INSERT INTO test (name) VALUES (?)').run('it works'); console.log(db.prepare('SELECT * FROM test').all());"
   ```
   *Expected outcome*: Node >= 22.5.0 and output `[ [Object: null prototype] { id: 1, name: 'it works' } ]`.

2. **Verify Vite Tooling Availability**:
   ```powershell
   npx vite --version
   ```
   *Expected outcome*: Vite version reported successfully (e.g. `vite/8.3.4`).

3. **Inspect Existing UI Components & Dashboards**:
   ```powershell
   Test-Path shadcnuikit-dashboards/src/components/layout/AppSidebar.tsx
   Test-Path shadcnuikit-dashboards/src/components/dashboard/MetricCard.tsx
   Test-Path reactbitspremium/package.json
   ```
   *Expected outcome*: All return `True`.

4. **Verify Existing Server Endpoints and Tests**:
   ```powershell
   node --test test/v2-endpoints.integration.test.js
   ```
   *Expected outcome*: Passes all integration tests verifying v2 endpoints.

5. **Invalidation Condition**:
   - If the runtime Node.js environment is downgraded below v22.5.0, `require('node:sqlite')` will fail, requiring a fallback SQLite driver.
