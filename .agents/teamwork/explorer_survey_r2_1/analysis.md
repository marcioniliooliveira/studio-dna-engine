# Comprehensive Survey & Architectural Specification: dnastudio UI/UX Modernization & Hybrid Persistence Architecture (R2 & R3)

> **Document Type**: Technical Survey & Architecture Design Specification  
> **Status**: Completed Investigation  
> **Target System**: Studio DNA PRO Engine (`dnastudio` / `studio-dna-engine`)  
> **Environment**: Node.js v24.15.0, CommonJS / ES Modules, Windows / Linux Docker  

---

## 1. Executive Summary

This investigation surveys the frontend landscape, user interface, analysis pipelines, and storage mechanisms of the **Studio DNA PRO Engine** (`studio-dna-engine`, referred to in user requirements as `dnastudio`). It defines a comprehensive technical roadmap for:
1. **Modernizing the dnastudio Control Panel (Requirement R2)** using modern component patterns from [21st.dev](https://21st.dev/) and `shadcn/ui`, replacing legacy string-concatenated HTML templates and blocking browser `alert()` dialogs with a high-density, dark-mode design-engineering command center.
2. **Implementing a Hybrid Persistence Architecture (Requirement R3)** combining **SQLite** (using Node.js 24's native `node:sqlite` engine for zero external runtime dependencies) for structured runs, relational metrics, timestamps, and indexes, alongside an **Embedded Non-Relational Document Store** for schemaless raw scrape ASTs, design DNA JSON trees, GLSL shaders, 38-variable audit reports, and file metadata.
3. **Establishing an Integration Bridge & API Layer** to connect the hybrid persistence engines directly to the modernized dnastudio dashboard, enabling real-time telemetry, full-text and faceted search, interactive file exploration, and visual before/after diffing.

---

## 2. Inventory of Existing Frontend Applications & Tech Stack

Our direct inspection of the repository identified six distinct frontend facets:

### 2.1 The Current dnastudio Dashboard (`src/server/preview-server.js`)
- **Location**: `src/server/preview-server.js` (lines 200–513, 862–874)
- **Tech Stack**: Raw inline HTML/CSS/JavaScript generated dynamically via JavaScript string concatenation (`buildDashboardHtml()`).
- **Styling**: Monolithic `<style>` block (~180 lines) setting dark CSS variables (`--bg: #07090e`, `--card-bg: #0d1117`, `--border: #1e2638`, `--accent: #38bdf8`).
- **Components & Navigation**: Five tabbed views toggled via client-side DOM class manipulation (`showTab()`):
  1. `tab-clients`: Client Project Generation Form & Cards Grid
  2. `tab-vault`: Static code snippets for easings and typography
  3. `tab-clones`: Grid of cloned skeleton cards
  4. `tab-extractor`: URL input form triggering POST `/api/extract`
  5. `tab-review`: Review Console V2 with range slider dials (Density, Aesthetic, Motion, Contrast, Surface), Golden Direction cards (A, B, C), and viewport iframe sandbox.
- **State & Interactivity**: Vanilla browser DOM scripting; user interactions trigger blocking browser `alert()` popups; no reactive state management, virtual DOM, or component modularity.
- **Existing REST Endpoints**:
  - `POST /api/extract`: Triggers `runPipeline()` in background.
  - `POST /api/client/create`: Calls `createClientProject()`.
  - `POST /api/audit/:slug`: Runs `runBoxDiffLinter()`.
  - `GET /api/vault`: Returns motion easings and typography pairings.
  - `GET /api/site/:slug`: Returns `SITE_TYPE.json`, `design_dna.json`, `ui_ux_features.json`, `MASTER_SPEC.md`.
  - `POST /api/save-brand-spec`: Updates `brand-spec.json`.
  - `POST /api/v2/audit/:clientSlug`: Triggers `TriangulatedAuditEngine.auditSite()`.
  - `GET /api/v2/preview/diff/:clientSlug`: Returns multi-viewport diff matrix (1440px, 768px, 375px).
  - `GET /api/v2/directions/:clientSlug`: Returns 3 generated design directions (T03A, T03B, T03C).
  - `POST /api/v2/decisions`: Seals `human-decision.json` with SHA-256 hash.
  - `GET /api/v2/vault/references` & `GET /api/v2/vault/tokens/:slug`: Vault tokens.
  - `POST /api/v2/orchestrate/run`: Starts DAG execution run.
  - `GET /api/v2/orchestrate/status/:runId` & `GET /api/v2/ledger/:runId`: DAG status and ledger.
  - `POST /__dna_live_select` & `POST /__dna_live_approve`: Click-to-MCP live workbench endpoints.

### 2.2 In-Browser Developer HUD (`src/dev/dev-hud.js`)
- **Location**: `src/dev/dev-hud.js` (598 lines)
- **Tech Stack**: Vanilla JavaScript script injected into previewed client sites; dynamically loads **Tweakpane 4** via CDN.
- **Functionality**:
  - Alt+Click element selection capturing `data-ds` attributes, line numbers, CSS computed styles, bounding box.
  - Tweakpane floating panels for adjusting CSS custom properties in real time.
  - Presets for Directions T03A (Swiss Grid), T03B (Editorial Brutalist), T03C (Kinetic Luxury).
  - Persists edits via POST `/__dna_live_select` and POST `/api/save-brand-spec`.

### 2.3 3D & Kinetic Component Workbench (`src/components/WorkStage/` & `src/components/ChatOrb/`)
- **Location**: `src/components/WorkStage/` and `src/components/ChatOrb/`
- **Tech Stack**: React 18 (`react`, `react-dom`), `@react-three/fiber` (R3F), `@react-three/drei`, `three.js`, TypeScript (`.tsx`).
- **Build Tooling**: Bundled with Vite (`vite.bundle.config.mjs`) into standalone ES modules (`workStage.bundle.js`).
- **Testing**: Vitest (`vitest.config.ts`) and Playwright E2E (`tests/e2e/work-stage.spec.ts`).

### 2.4 Pre-Cloned Shadcn UI Kit Dashboards (`shadcnuikit-dashboards/`)
- **Location**: `shadcnuikit-dashboards/`
- **Tech Stack**: Next.js 14/15, React 18, Tailwind CSS v3.4, `lucide-react`, `clsx`, `tailwind-merge`.
- **Components Available**:
  - Layout: `AppSidebar.tsx` (collapsible, search, badges), `DashboardHeader.tsx`, `DashboardShell.tsx`.
  - UI Primitives: `Card.tsx`, `Button.tsx`, `Badge.tsx`, `Avatar.tsx`.
  - Widgets: `MetricCard.tsx` (with SVG sparklines), `RevenueChart.tsx`, `ExerciseChart.tsx`, `TeamMembersCard.tsx`, `RecentPaymentsTable.tsx`.
  - Full Pages: `Classic Dashboard`, `Sales Dashboard`, `CRM Dashboard`, `AI Analytics`, `Kanban`, `AI Chat`.
  - Offline Live Clone: Standalone hydrated HTML bundle at `shadcnuikit-dashboards/live-preview/index.html`.

### 2.5 ReactBits Premium Components (`reactbitspremium/`)
- **Location**: `reactbitspremium/`
- **Tech Stack**: React 18, Three.js, R3F, Framer Motion, GSAP, Tailwind CSS.
- **Contents**: 7 categories of high-end UI components: `cards`, `chat-ai`, `dashboards-billing`, `icons-microvisuals`, `microinteractions`, `navigation`, `tools-visual-effects`.

### 2.6 Dual-Stack Compiled Sites (`copias/` and `clientes/`)
- **Generated by**: `src/compiler/edge-static-compiler.js` (static single-page HTML with inlined assets and runtime) and `src/compiler/nextjs-rsc-compiler.js` (Next.js 15 App Router React Server Components).

---

## 3. Analysis & Scraper Artifact Storage (Current State & Bottlenecks)

### 3.1 Observed Artifact Types & Formats
When the pipeline runs (`bin/cli.js`, `index.js`, `pipeline-runner.js`, or `unified-quality-gate.js`), artifacts are emitted directly to disk across several disconnected directories:

| Artifact File | Emitting Engine | Typical Path | Contents & Structure |
|---|---|---|---|
| `PIPELINE_STATUS.json` | `pipeline-runner.js` | `copias/<slug>/PIPELINE_STATUS.json` | `{ schemaVersion, status, url, siteName, mode, startedAt, completedAt, stages: [...] }` |
| `SITE_TYPE.json` | `detector.js` | `copias/<slug>/SITE_TYPE.json` | `{ url, framework, siteType, cloneMode, cloneCapacity, warning, detectedAt }` |
| `design_dna.json` | `dna-extractor.js` | `copias/<slug>/design-system/design_dna.json` | `{ colors, typography, spacing, layout, components, rawCssStats }` |
| `ui_ux_features.json` | `ui-ux-extractor.js` | `copias/<slug>/ui-ux/ui_ux_features.json` | `{ gsapAnimations, shaders, threeScenes, microInteractions }` |
| `assets-manifest.json` | `asset-manifest-generator.js` | `copias/<slug>/assets-manifest.json` | `{ totalAssets, assetsByType, externalVsLocal }` |
| `MASTER_SPEC.md` | `spec-generator.js` | `copias/<slug>/MASTER_SPEC.md` | Comprehensive Markdown report combining DNA, UX, and AI prompts |
| `linter-report.json` | `unified-quality-gate.js` / `box-diff-linter.js` | `<siteDir>/linter-report.json` | `{ auditTimestamp, siteSlug, auditPassed, jsErrors, layoutBoxes, imagesSummary, gates: { antiSlop, console, network, structural, scrollDynamics } }` |
| `EXECUTION_LEDGER.json` | `execution-ledger.js` | `<clientDir>/EXECUTION_LEDGER.json` | `{ schemaVersion, runs: { [runId]: { runId, taskId, model, tokens, status, gates, artifactHash, events } } }` |
| `human-decision.json` | `v2-review.js` | `clientes/<slug>/human-decision.json` | `{ schemaVersion, contractKind, decisionId, clientSlug, selectedDirection, approver, signedPayloadSha256, status }` |
| `brand-spec.json` | `client-factory.js` / `dev-hud.js` | `clientes/<slug>/brand-spec.json` | `{ colors, typography, niche, toneOfVoice, whatsapp }` |
| Deep Scrape Dumps (e.g. `jumpflex_full_analysis.json`) | Root / Scratch Scripts | `<root>/<site>_full_analysis.json` | `{ url, serverHeaders, techStack, routesBreakdown, dependencies, mainSections, localSkeletonSections }` |
| Screenshots & VRT Pairs | Playwright / VRT engine | `qa-reports/<slug>/`, `copias/<slug>/design-system/screenshot.png` | PNG binary visual proofs |

### 3.2 Key Pain Points & Bottlenecks Observed
1. **No Centralized Querying or Indexing**: To list all runs or get aggregate metrics, `preview-server.js` currently invokes `fs.readdirSync()` across folders. There is no way to perform queries like "find all sites using Shopify framework", "list all runs with broken images > 0", or "calculate total LLM token spend across clients".
2. **Lack of Transactional Atomicity**: If a pipeline stage fails mid-execution, partial JSON files remain on disk, causing inconsistent reads in subsequent steps.
3. **No Separation between Relational Metadata and Large Document Payloads**: Large JSON files (e.g. `jumpflex_full_analysis.json` at 16KB, `design_dna.json` with hundreds of raw CSS rules, or GLSL shader dumps) are read synchronously from disk in their entirety even when the UI only needs a summary count or timestamp.
4. **File Lock Contention on Windows**: Concurrent operations on Windows can fail with `EBUSY: resource busy or locked` when multiple agents or preview servers read/write JSON files simultaneously.

---

## 4. UI/UX Modernization Strategy using 21st.dev Component Patterns

To transform dnastudio into a production-grade interface, we formulate a modernization plan based on design patterns from **21st.dev** and **shadcn/ui**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│  🌐 Studio DNA Control Panel (21st.dev Design Engine Architecture)                     │
├──────────────┬─────────────────────────────────────────────────────────────────────────┤
│ [AppSidebar] │ [DashboardHeader: Breadcrumb / System Mode / ⌘K Search / Theme Toggle]   │
│              ├─────────────────────────────────────────────────────────────────────────┤
│ • Overview   │ [Bento Metric Ribbon: Active Runs | Pass Rate | Token Spend | Latency]  │
│ • Runs & Scrape├───────────────────────────────────────────────────────────────────────┤
│ • Clients    │ [Main Content Area: Tabbed Multi-View Workspace]                        │
│ • Explorer   │  - Executive KPI Bento Grid & Live DAG Execution Stepper                │
│ • QA Audits  │  - Interactive File Tree + Monaco/Prism Code & JSON Viewer              │
│ • Vault      │  - Visual Comparison: Interactive Image Diff Slider (Before vs. After)   │
│ • Workbench  │  - 38-Variable Multi-Factor Audit Visualizer (Radar Chart & Gate Cards) │
│ • Settings   │  - TanStack/Shadcn Sortable/Filterable Runs & Data Table                │
│              ├─────────────────────────────────────────────────────────────────────────┤
│ [Status Pill]│ [Bottom Live Ticker / Sonner Toast Notifications / Telemetry Stream]    │
└──────────────┴─────────────────────────────────────────────────────────────────────────┘
```

### 4.1 Layout & Theme Tokens (21st.dev Dark Obsidian Aesthetic)
- **Base Palette**:
  - Canvas Background: `#030508` (deep obsidian)
  - Card & Panel Background: `#07090e` / `#0d1117` with subtle `rgba(255,255,255,0.05)` borders
  - Accents: Technical Cyan/Sky (`#38bdf8`), Emerald Verified (`#10b981`), Amber Attention (`#f59e0b`), Rose Reproved (`#f43f5e`), Kinetic Luxury Gold (`#d4af37`)
  - Typography: Inter / SF Pro for interface labels; JetBrains Mono / Space Grotesk for telemetry, code, and token values
- **AppSidebar (21st.dev Collapsible Navigation)**:
  - Collapsible side navigation with icons (`lucide-react`), active route highlighting, count badges (e.g. `14 Clientes`, `35 Esqueletos`), and live system health indicator.
- **DashboardHeader**:
  - Global Search / Command Menu (`⌘K` modal) enabling instant fuzzy search across clients, references, tokens, and runs.
  - Quick action buttons: "Novo Scraping One-Shot", "Gerar Projeto Cliente", "Executar Auditoria QA".
  - Maturity pills: `experimental` (amber), `candidate` (blue), `verified` (green).

### 4.2 Key 21st.dev Component Patterns & Specifications

#### Pattern A: Bento Metric Ribbon (KPIs with SVG Sparklines)
- Replaces static cards with responsive bento grid cells featuring:
  - Total Analysis Runs & Active Pipeline Executions (with animated pulsating radar indicator).
  - Quality Gate Pass Rate (%) with trend direction (`TrendingUp` / `TrendingDown`).
  - Total Token Volume & Estimated Cost (USD) from `EXECUTION_LEDGER`.
  - Average DOM Readiness & Layout Box Integrity Score.
  - Hardware Confinement & Asset Size Gauge (< 3MB disk, < 4MB VRAM, LCP < 1.0s).

#### Pattern B: File Explorer & Syntax-Highlighted Artifact Viewer
- Tree-view folder navigation representing virtual or disk-backed structures (`copias/`, `clientes/`, `qa-reports/`, `design-vault/`).
- Split-pane code viewer:
  - Supports Markdown (`DNA.md`, `MASTER_SPEC.md`), JSON (`design_dna.json`, `SITE_TYPE.json`), and CSS/HTML.
  - Features line numbers, copy-to-clipboard, fold/unfold blocks, search within file, and download action.

#### Pattern C: Visual Comparison / Interactive Image Diff Slider
- A 21st.dev Before/After image comparison slider:
  - Left pane: Original scraped reference screenshot (`orig-desktop-1200px.png`).
  - Right pane: Transmuted client page screenshot (`trans-desktop-1200px.png`).
  - Draggable vertical divider enabling micro-visual alignment and pixel diff verification.
  - Viewport switcher buttons: Desktop (1440px), Tablet (768px), Mobile (375px).

#### Pattern D: Analysis Results & Multi-Factor Visualizer
- **Radar / Polar Chart**: Visualizes scores across the 38 audit variables (Anti-Slop, Console Errors, Network Failures, Image Integrity, Font Loading, Kinetic Telemetry, Contrast, Spacing).
- **Interactive Gate Accordion**: Expandable cards for each gate check:
  - Anti-Slop Gate: list of matched keywords, residual brand names, unfilled slot tokens.
  - Console Health: runtime error stack traces.
  - Network Health: failed 404 assets with self-healing download status.
  - Scroll Dynamics: AABB overlap collisions and bounding box breaches.
- **Live DAG Pipeline Stepper**: Visual node graph showing stage execution status (`detect` -> `clone` -> `normalize-assets` -> `extract-design-dna` -> `generate-master-spec` -> `audit`).

#### Pattern E: Filterable Data Table with Slide-Over Sheet Inspector
- Data table for historical analysis runs and client projects:
  - Columns: Timestamp, Site Slug, URL, Mode, Status Pill, Duration, Token Cost, Gates Passed, Actions.
  - Features: Client-side and server-side filtering, multi-column sort, search by slug.
  - Clicking a row opens a slide-over drawer (Sheet) showing the full raw document payload from the Non-Relational Document Store without reloading the page.

#### Pattern F: Non-Blocking Toast System (Sonner / Radix)
- Completely replaces native `alert()` and `confirm()` calls with non-blocking toast notifications.
- Displays operation progress (e.g. "Scraping iniciado para https://..."), success confirmations with action links, and expandable error logs.

---

## 5. Hybrid Persistence Architecture Design (SQLite + Non-Relational Document Store)

To satisfy **Requirement R3**, the persistence layer must handle two fundamentally different types of data:
1. **Relational & Structured**: Runs, statuses, timestamps, aggregated metrics, foreign keys, and indexes needed for fast UI queries, filtering, sorting, and reporting.
2. **Unstructured & Schemaless**: Full DOM ASTs, deep scrape route trees, raw CSS rules, GLSL shaders, 38-variable audit snapshots, and raw JSON payloads.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        Hybrid Persistence Layer Architecture                           │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                 [Repository API Bridge]                                │
│                     (src/persistence/hybrid-repository.js)                             │
├───────────────────────────────────────────┬────────────────────────────────────────────┤
│           Relational Engine               │       Document Store Engine                │
│             (node:sqlite)                 │        (Embedded DocStore)                 │
├───────────────────────────────────────────┼────────────────────────────────────────────┤
│ • Database: data/studio_dna.db            │ • Storage: data/documents/<collection>/    │
│ • Engine: node:sqlite (Node 24 built-in)  │ • Format: Atomic JSON / Indexed BSON-like  │
│ • Modes: WAL Mode, Foreign Keys On        │ • Interface: LokiJS/MongoDB Collection API │
│                                           │                                            │
│ [Tables]                                  │ [Collections]                              │
│ 1. analysis_runs                          │ 1. raw_scrapes                             │
│ 2. quality_audits                         │ 2. dna_payloads                            │
│ 3. client_projects                        │ 3. uiux_features                           │
│ 4. design_tokens_index                    │ 4. specs_and_templates                     │
│ 5. files_catalog                          │ 5. audit_reports                           │
│                                           │ 6. execution_events                        │
└───────────────────────────────────────────┴────────────────────────────────────────────┘
```

### 5.1 Technology Selection & Evaluation

#### Relational Engine: `node:sqlite` (Node.js 24 Built-In)
- **Evaluation**: The current runtime environment is Node.js v24.15.0. `node:sqlite` (`DatabaseSync`) is built directly into the Node.js standard library.
- **Advantages**:
  - **Zero external dependencies**: Perfectly satisfies the strict zero-dependency mandate of Studio DNA PRO v2.6.
  - **Zero build friction**: No `node-gyp`, no Python dependency, no C++ compilation failures on Windows or inside Docker.
  - **High Performance**: Native C++ V8 binding with fast prepared statements and synchronous execution matching the Node event loop.
  - **WAL Mode**: Enables high-concurrency readers alongside writers without database locks.

#### Non-Relational Document Store: Evaluation of Options
We evaluated five non-relational options:
1. **LevelDB (`classic-level` / `leveldown`)**: Requires native C++ compilation bindings; frequent compilation failures on Windows and minimal Docker images. In addition, it is pure key-value, requiring secondary indexing layers for document queries.
2. **NeDB (`@seald-io/nedb`)**: Unmaintained for years; append-only file format can balloon in size without periodic compaction.
3. **PouchDB**: Heavy dependency footprint, tailored for CouchDB sync rather than embedded document storage.
4. **LokiJS**: In-memory document store with persistent disk adapter, Mongo-like query language (`$eq`, `$gt`, `$contains`), and binary indexing. Fast and pure JavaScript, but requires external package installation unless bundled.
5. **Zero-Dependency Embedded Document Store (`EmbeddedDocStore`)**:
   - A purpose-built, pure-JavaScript document store engine implementing standard collection semantics (`insertOne`, `findById`, `find`, `updateOne`, `deleteById`).
   - Persists collections to atomic JSON files (`data/documents/<collection>/<id>.json` or append-safe collection stores) using write-to-temp-then-rename (`fs.renameSync`) for complete crash resilience.
   - Maintains in-memory indexes on `_id`, `siteSlug`, `runId`, and `timestamp`.
   - **Recommendation**: Deploy `EmbeddedDocStore` (or LokiJS adapter) adhering to a standard document store interface so that either can be swapped transparently without changing business logic.

---

### 5.2 Relational Database Schema (SQLite DDL)

The SQLite database file is stored at `data/studio_dna.db`. The schema is defined below:

```sql
-- PRAGMA configuration
PRAGMA journal_mode = WAL;
PRAGMA synchronous = NORMAL;
PRAGMA foreign_keys = ON;

-- 1. Analysis Runs Table
CREATE TABLE IF NOT EXISTS analysis_runs (
    id TEXT PRIMARY KEY,                       -- e.g. 'run_20261106_123456_a1b2'
    site_slug TEXT NOT NULL,                  -- e.g. 'jumpflex-com'
    target_url TEXT NOT NULL,                 -- e.g. 'https://www.jumpflex.com/'
    mode TEXT NOT NULL DEFAULT 'all',         -- 'all', 'clone', 'dna', 'ui'
    status TEXT NOT NULL,                     -- 'running', 'passed', 'failed', 'cancelled'
    started_at INTEGER NOT NULL,              -- Epoch timestamp (ms)
    completed_at INTEGER,                     -- Epoch timestamp (ms)
    duration_ms INTEGER,                      -- Total execution duration
    input_tokens INTEGER DEFAULT 0,
    output_tokens INTEGER DEFAULT 0,
    cost_usd REAL DEFAULT 0.0,
    model TEXT,                               -- e.g. 'gemini-3.7-flash', 'pipeline-runner'
    artifact_hash TEXT,                       -- SHA-256 of generated output
    input_hash TEXT,                          -- SHA-256 of input parameters
    error_message TEXT,
    raw_doc_id TEXT,                          -- Foreign document key in DocumentStore
    created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_runs_site_slug ON analysis_runs(site_slug);
CREATE INDEX IF NOT EXISTS idx_runs_status ON analysis_runs(status);
CREATE INDEX IF NOT EXISTS idx_runs_started_at ON analysis_runs(started_at DESC);

-- 2. Quality Audits Table
CREATE TABLE IF NOT EXISTS quality_audits (
    id TEXT PRIMARY KEY,                       -- e.g. 'audit_20261106_123500_x9y8'
    run_id TEXT REFERENCES analysis_runs(id) ON DELETE CASCADE,
    site_slug TEXT NOT NULL,
    audit_type TEXT NOT NULL,                 -- 'linter', 'triangulated', 'anti_slop', 'unified'
    passed INTEGER NOT NULL DEFAULT 0,        -- 1 = true, 0 = false
    score REAL DEFAULT 0.0,                   -- Overall quality score (0.0 to 100.0)
    js_errors_count INTEGER DEFAULT 0,
    broken_images_count INTEGER DEFAULT 0,
    valid_images_count INTEGER DEFAULT 0,
    sections_count INTEGER DEFAULT 0,
    anti_slop_passed INTEGER DEFAULT 1,
    slop_violations_count INTEGER DEFAULT 0,
    divergence_detected INTEGER DEFAULT 0,
    html_artifact_path TEXT,
    screenshot_artifact_path TEXT,
    raw_report_doc_id TEXT,                   -- Foreign document key in DocumentStore
    created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_audits_site_slug ON quality_audits(site_slug);
CREATE INDEX IF NOT EXISTS idx_audits_passed ON quality_audits(passed);
CREATE INDEX IF NOT EXISTS idx_audits_run_id ON quality_audits(run_id);

-- 3. Client Projects Table
CREATE TABLE IF NOT EXISTS client_projects (
    client_slug TEXT PRIMARY KEY,             -- e.g. 'piloto-elyse-luxe'
    brand_name TEXT NOT NULL,                 -- e.g. 'Elyse Luxe Residence'
    ref_slug TEXT NOT NULL,                   -- e.g. 'storeyarchitecture-co-uk'
    niche TEXT,
    whatsapp TEXT,
    status TEXT NOT NULL DEFAULT 'experimental', -- 'experimental', 'candidate', 'verified', 'production'
    selected_direction TEXT,                  -- 'A', 'B', 'C'
    approved_by TEXT,                         -- 'human-architect', 'art_director'
    decision_hash TEXT,                       -- SHA-256 signed approval
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_clients_status ON client_projects(status);

-- 4. Design Tokens Index Table
CREATE TABLE IF NOT EXISTS design_tokens_index (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site_slug TEXT NOT NULL,
    token_type TEXT NOT NULL,                 -- 'color', 'font', 'spacing', 'radius', 'easing'
    token_name TEXT NOT NULL,                 -- e.g. '--primary', '--font-headline'
    token_value TEXT NOT NULL,                -- e.g. '#38bdf8', "'Inter', sans-serif"
    direction_id TEXT DEFAULT 'global',       -- 'T03A', 'T03B', 'T03C', or 'global'
    created_at INTEGER NOT NULL,
    UNIQUE(site_slug, token_type, token_name, direction_id)
);

CREATE INDEX IF NOT EXISTS idx_tokens_slug_type ON design_tokens_index(site_slug, token_type);

-- 5. Files & Artifacts Catalog Table
CREATE TABLE IF NOT EXISTS files_catalog (
    id TEXT PRIMARY KEY,                       -- Normalized relative path
    site_slug TEXT NOT NULL,
    category TEXT NOT NULL,                   -- 'copia', 'cliente', 'vault', 'qa_report'
    file_type TEXT NOT NULL,                  -- 'html', 'css', 'js', 'json', 'image', 'font', 'model'
    size_bytes INTEGER NOT NULL,
    sha256 TEXT NOT NULL,
    mtime INTEGER NOT NULL,
    is_external INTEGER DEFAULT 0,
    doc_ref_id TEXT                           -- Optional document reference
);

CREATE INDEX IF NOT EXISTS idx_files_slug_cat ON files_catalog(site_slug, category);
CREATE INDEX IF NOT EXISTS idx_files_type ON files_catalog(file_type);
```

---

### 5.3 Non-Relational Document Store Architecture

The Document Store organizes schemaless documents into structured collections under `data/documents/<collection_name>/`:

```
data/documents/
├── raw_scrapes/         # Raw scraping AST, HTTP headers, full section lists (e.g. jumpflex.json)
├── dna_payloads/        # Complete design_dna.json trees and token trees
├── uiux_features/       # Extracted GSAP code snippets, GLSL shaders, 3D model configs
├── specs_and_templates/ # MASTER_SPEC.md, composition-spec.json, content-slots.json
├── audit_reports/       # Detailed 38-variable audit dumps, DOM readiness trees, network traces
└── execution_events/    # Fine-grained DAG execution step logs and telemetry
```

#### Document Envelope Schema
Each stored document complies with a standard metadata envelope:

```json
{
  "_id": "doc_scrape_jumpflex_20261106_123456",
  "collection": "raw_scrapes",
  "siteSlug": "jumpflex-com",
  "runId": "run_20261106_123456_a1b2",
  "schemaVersion": 1,
  "createdAt": 1730896496000,
  "updatedAt": 1730896496000,
  "tags": ["shopify", "tailwind", "video-heavy"],
  "payload": {
    "serverHeaders": { ... },
    "techStack": { ... },
    "routesBreakdown": { ... },
    "mainSections": [ ... ],
    "localSkeletonSections": [ ... ]
  },
  "metadata": {
    "byteSize": 16384,
    "sha256": "4a7f8e9b..."
  }
}
```

---

### 5.4 Hybrid Repository API Specification (`src/persistence/hybrid-repository.js`)

The `HybridRepository` provides a unified interface orchestrating both engines:

```javascript
class HybridRepository {
  /**
   * Initializes both SQLite and Document Store engines, running pending migrations
   */
  async init();

  /**
   * Records the start of a pipeline run in SQLite and stores initial parameters
   */
  async startAnalysisRun({ siteSlug, targetUrl, mode, model, inputHash });

  /**
   * Finalizes a run with status, tokens, artifact hash, and persists the raw scrape payload
   */
  async completeAnalysisRun(runId, { status, outputTokens, costUsd, artifactHash, rawScrapePayload });

  /**
   * Records a quality audit result in SQLite and stores full report in DocumentStore
   */
  async recordQualityAudit({ runId, siteSlug, auditType, passed, score, metrics, rawReport });

  /**
   * Retrieves paginated runs with filters (SQLite) joined with summary metadata
   */
  async listAnalysisRuns({ siteSlug, status, limit, offset, sortBy, sortOrder });

  /**
   * Retrieves complete run details: relational row from SQLite + raw payload from DocStore
   */
  async getRunDetails(runId);

  /**
   * Retrieves aggregated KPI metrics for dnastudio dashboard bento ribbon
   */
  async getDashboardAnalytics();

  /**
   * Syncs existing filesystem artifacts (copias/, clientes/, qa-reports/) into DB
   */
  async syncExistingFilesystem();
}
```

---

## 6. Integration Bridge & REST API Endpoints

To connect the modernized frontend control panel to the hybrid persistence layer, new clean JSON endpoints are added to `src/server/preview-server.js` (under `/api/v3/*`):

| Endpoint | Method | Purpose | Response Payload |
|---|---|---|---|
| `/api/v3/runs` | `GET` | Paginated analysis runs list with search & filter | `{ runs: [...], total, page, limit }` |
| `/api/v3/runs/:runId` | `GET` | Complete run details (joined SQLite row + DocStore payload) | `{ run: { ... }, rawDocument: { ... } }` |
| `/api/v3/runs/:runId/raw` | `GET` | Fetches raw document payload only | Raw JSON document |
| `/api/v3/analytics/kpi` | `GET` | Aggregated dashboard KPI cards data | `{ totalRuns, passRate, totalTokens, totalCost, avgScore, activeClients }` |
| `/api/v3/clients` | `GET` | Lists all client projects with statuses & approvals | `{ clients: [...] }` |
| `/api/v3/clients/:slug/audits`| `GET` | Audit history and trend for a specific client | `{ audits: [...], latestScore }` |
| `/api/v3/files/tree` | `GET` | File explorer tree structure with sizes & types | `{ tree: { ... } }` |
| `/api/v3/files/content` | `GET` | Fetches file content for syntax-highlighted viewer | `{ path, mimeType, content, size }` |
| `/api/v3/stream/runs` | `GET` | Server-Sent Events (SSE) stream of active DAG node events | Stream of `event: stage` and `event: metric` |
| `/api/v3/admin/sync` | `POST` | Ingestion scanner to index legacy files on disk into DB | `{ indexedRuns, indexedAudits, indexedFiles }` |

---

## 7. Migration & Legacy Ingestion Strategy

To ensure zero loss of historical data, an idempotent sync scanner (`src/persistence/sync-ingestor.js`) is designed to execute during server startup:
1. **Scans `copias/`**:
   - Reads `SITE_TYPE.json`, `PIPELINE_STATUS.json`, `design-system/design_dna.json`, `assets-manifest.json`, `linter-report.json`.
   - Inserts run record into `analysis_runs`.
   - Inserts raw document into `raw_scrapes` and `dna_payloads` collections.
   - Extracts design tokens into `design_tokens_index`.
   - Indexes all assets in `files_catalog`.
2. **Scans `clientes/`**:
   - Reads `brand-spec.json`, `DNA.md`, `human-decision.json`, `linter-report.json`.
   - Inserts or updates `client_projects` with verified status and approval hashes.
3. **Scans `qa-reports/`**:
   - Indexes screenshot pairs and VRT diffs into `quality_audits` and `files_catalog`.
4. **Idempotency Guarantee**: If a record already exists with the same file hash or slug timestamp, the scanner skips it without duplication.

---

## 8. Verification & Test Plan

The proposed architecture will be verified through the following executable test suites:
1. **Relational Database Tests (`test/persistence-sqlite.test.js`)**:
   - Tests `DatabaseSync` initialization in WAL mode.
   - Verifies DDL migrations, foreign key cascading, index usage, and transactions.
   - Verifies query throughput for pagination and KPI aggregations.
2. **Document Store Tests (`test/persistence-docstore.test.js`)**:
   - Tests atomic file writes (`fs.renameSync`) under simulated crash or concurrent writes.
   - Tests document insertion, retrieval by ID, and query filtering.
3. **Hybrid Repository Integration Tests (`test/persistence-hybrid.test.js`)**:
   - Tests atomic saving of runs with paired relational metrics and document payloads.
   - Tests `getRunDetails()` joining SQLite and DocStore.
4. **REST API Endpoint Tests (`test/preview-server-v3-api.test.js`)**:
   - Tests HTTP GET `/api/v3/runs`, `/api/v3/analytics/kpi`, `/api/v3/files/tree`.
5. **Legacy Sync Ingestor Test (`test/persistence-sync.test.js`)**:
   - Runs ingestor against existing sample folders (`copias/storeyarchitecture-co-uk`, `clientes/piloto-elyse-luxe`) and asserts all files are correctly cataloged and queryable.
