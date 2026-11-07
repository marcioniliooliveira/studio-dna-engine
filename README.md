# 🌐 Studio DNA Engine v3.0 — Enterprise Production Hub

> **Consolidated, reference-driven reverse engineering platform, Design DNA decompiler, deterministic ICM transmutation engine, and 21st.dev UI command center.**

[![Status](https://img.shields.io/badge/Maturity-Verified_Candidate-brightgreen.svg)](./PROJECT_STATUS.md)
[![Node](https://img.shields.io/badge/Node-%3E%3D20%20%7C%2024%20Native-blue.svg)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Persistence-SQLite_WAL_%2B_NoSQL_DocStore-orange.svg)](#-hybrid-persistence-layer)
[![UI/UX](https://img.shields.io/badge/UI%2FUX-21st.dev_Bento_%2B_Sonner-purple.svg)](#-dnastudio-command-center-21stdev-uiux)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-Docker_%2B_GitHub_Actions-teal.svg)](#-devops-cicd-pipeline)

Studio DNA disassembles complex, award-winning web references (Playwright CDP, shaders, typography, motion physics) into structured, auditable Design DNA, and deterministically reconstructs production-ready client applications with **0 runtime errors** and **0 AI slop**.

---

## 🏗️ Architectural Blueprint v3.0

Studio DNA v3.0 unifies scraping, reverse engineering, persistence, and visual direction into a hardened, decoupled pipeline:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   STUDIO DNA ENGINE v3.0                               │
└────────────────────────────────────┬───────────────────────────────────────────────────┘
                                     │
           ┌─────────────────────────┴─────────────────────────┐
           ▼                                                   ▼
┌──────────────────────────────┐                    ┌──────────────────────────────────┐
│   RAW SCRAPE & DECOMPILER    │                    │     CLIENT BRAND ISOLATION       │
│  - Playwright Chromium CDP   │                    │  - clientes/<slug>/DNA.md        │
│  - Shaders & WebGL Capture   │                    │  - brand-spec.json (Tokens)      │
│  - Kinetic Trajectories      │                    │  - 100% Isolated Context (ICM)   │
└──────────────┬───────────────┘                    └──────────────────┬───────────────┘
               │                                                       │
               └───────────────────────┬───────────────────────────────┘
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                    DETERMINISTIC TRANSMUTATION & QUALITY GATES                       │
│  - Surgical Slot Injection (0 token LLM code mutations)                              │
│  - 38-Variable Multi-Factor Audit (APCA, Anti-Slop, Bounding Box Linter)             │
│  - Dual-Stack Exporter: Edge Static CDN HTML + Next.js 15 App Router RSC             │
└──────────────────────────────────────┬───────────────────────────────────────────────┘
                                       │
           ┌───────────────────────────┴───────────────────────────┐
           ▼                                                       ▼
┌──────────────────────────────────────────────┐  ┌────────────────────────────────────┐
│      HYBRID PERSISTENCE ENGINE (R3)          │  │     DNASTUDIO 21ST.DEV UI (R2)     │
│  - Relational: node:sqlite in WAL Mode       │  │  - Bento Metric Ribbon & Sparks    │
│    data/studio_dna.db                        │  │  - ⌘K Command Palette & Sidebar    │
│  - DocumentStore: Schemaless JSON Storage    │  │  - Interactive File Explorer       │
│    data/documents/<collection>/<id>.json     │  │  - Before/After Visual Diff Slider │
│  - HybridRepository Coordinator              │  │  - 38-Var Polar Radar Visualizer   │
│  - REST API Layer: /api/v3/*                 │  │  - Non-blocking Sonner Toasts      │
└──────────────────────────────────────────────┘  └────────────────────────────────────┘
```

---

## ⚡ Quick Start Guide

### Prerequisites
- **Node.js**: `>= 20.0.0` (Node.js **24.15.0+** recommended for native `node:sqlite`)
- **NPM**: `>= 10.0.0`
- **Docker & Docker Compose** (optional, for containerized execution)

### 1. Installation & Environment Setup
```bash
# Clone repository and install dependencies
git clone https://github.com/SEU_USUARIO/studio-dna-engine.git
cd studio-dna-engine
npm install

# Install Playwright browser dependencies (Chromium)
npm run setup
```

### 2. Start the Local dnastudio Command Center
```bash
# Boot preview server with persistence and 21st.dev UI
npm start
```
Open your browser at **`http://127.0.0.1:4000/`**.

### 3. Run with Docker Compose
```bash
docker compose up --build
```
Container boots with exposed port `4000` and persistent volume mounts for `./copias` and `./data`.

---

## 🎨 dnastudio Command Center (21st.dev UI/UX)

The dnastudio dashboard provides a command center powered by component patterns from [21st.dev](https://21st.dev/):

| Component | Pattern | Description |
|:---|:---|:---|
| **Bento Metric Ribbon** | `bento-grid`, `bento-item` | Real-time KPI telemetry (Total Runs, Pass Rate, Avg Score, Cost USD) with live SVG sparklines. |
| **Global Navigation & ⌘K** | `floating-dock`, `cmd-k` | Collapsible sidebar with route badges and global fuzzy search command palette (press `Ctrl+K` / `⌘K`). |
| **Interactive File Viewer** | `file-tree`, `syntax-view` | Split-pane asset explorer with syntax-highlighted code, markdown, and JSON inspection. |
| **Visual Diff Slider** | `diff-slider` | Split-screen drag-to-compare slider contrasting original scraped references with transmuted client sites across Desktop (`1440px`), Tablet (`768px`), and Mobile (`390px`). |
| **38-Variable Radar** | `radar-chart`, `accordions` | Polar SVG radar chart assessing Typography, Anti-Slop, Console, Network, and Scroll Dynamics. |
| **Historical Runs Table** | `data-table`, `sheet-drawer` | Sortable, paginated table of runs with a slide-over sheet drawer displaying full NoSQL document payloads. |
| **Sonner Toast System** | `data-sonner-toaster` | Asynchronous, non-blocking toast notifications replacing legacy blocking `alert()`/`confirm()` dialogs. |

---

## 💾 Hybrid Persistence Layer

Studio DNA employs a dual persistence architecture balancing relational query speed with schemaless document storage.

### 1. Relational Engine (`node:sqlite`)
- **Engine**: Node native `node:sqlite` (`DatabaseSync`) in Write-Ahead Logging (`WAL`) mode.
- **Location**: `data/studio_dna.db`.
- **Database Pragmas**:
  ```sql
  PRAGMA busy_timeout = 5000;
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
  PRAGMA synchronous = NORMAL;
  PRAGMA temp_store = MEMORY;
  ```
- **Tables**:
  - `sites`: Client domains, site names, and lifecycle statuses.
  - `analysis_runs`: Indexed runs, target URLs, models, token consumption, cost USD, and document pointers.
  - `quality_audits`: Quality gate scores, pass/fail results, and audit metrics.
  - `file_catalog`: Tracked static assets, relative paths, file sizes, and SHA-256 hashes.

### 2. Embedded Document Store (NoSQL)
- **Engine**: Schemaless, file-per-document store with atomic write protocols (`.tmp` write + atomic rename).
- **Location**: `data/documents/<collection>/<id>.json`.
- **Collections**:
  - `deep_scrapes`: Deep AST snapshots and raw HTML/CSS payloads.
  - `design_dna`: Computed design tokens, spacing scales, and color hierarchies.
  - `shader_ast`: Parsed WebGL GLSL fragment/vertex shader programs.
  - `audit_reports`: Comprehensive 38-variable diagnostic reports.

### 3. REST API Reference (`/api/v3/*`)

All persistence endpoints are exposed over HTTP via `src/server/preview-server.js`:

| Method | Endpoint | Description | Query / Body Parameters |
|:---|:---|:---|:---|
| `GET` | `/api/v3/analytics/kpi` | Aggregated dashboard metrics | None |
| `GET` | `/api/v3/runs` | Paginated list of analysis runs | `page`, `limit`, `siteSlug`, `status`, `sortBy`, `sortOrder` |
| `GET` | `/api/v3/runs/:runId` | Complete run details with joined audits | None |
| `GET` | `/api/v3/runs/:runId/raw` | Raw NoSQL document payload | None |
| `GET` | `/api/v3/clients` | List of all registered client projects | None |
| `GET` | `/api/v3/clients/:slug/audits` | Audit history for specific client | None |
| `GET` | `/api/v3/files/tree` | Directory tree of project files | `scope` (`copias` \| `clientes` \| `all`), `slug` |
| `GET` | `/api/v3/files/content` | Content stream of specific file | `path` (relative project path) |
| `POST` | `/api/v3/admin/sync` | Trigger filesystem sync ingestor | None |

---

## 🛠️ CLI Usage & Orchestration Engine

Studio DNA includes dual CLI binaries for standalone operations and multi-agent DAG orchestration:

### 1. Primary CLI (`bin/cli.js` / `studio-dna`)

```bash
# Deep scrape a web reference (Headless Chromium CDP)
node bin/cli.js https://reference-site.com --mode all

# Run interactive wizard
node bin/cli.js

# Scrape with visual browser display (headed) and proxy
node bin/cli.js https://reference-site.com --headed --proxy http://proxy:8080

# Start dnastudio preview server on custom port
node bin/cli.js --preview --port 4000
```

### 2. DAG Orchestrator CLI (`bin/orchestrator.js` / `studio-dna-orchestrate`)

```bash
# Start a new orchestration run with a client manifest
node bin/orchestrator.js start --client silvio-iwata --context manifests/silvio-iwata.json

# Inspect an active or paused run
node bin/orchestrator.js inspect --run <run-id>

# Approve a visual direction or promotion milestone
node bin/orchestrator.js approve --run <run-id> --event final-approved

# Resume an interrupted or paused run
node bin/orchestrator.js resume --run <run-id>
```

### 3. Transmutation & Client Generation

```bash
# Scaffold a new client from an existing skeleton
npm run client -- --brand "Silvio Iwata Imóveis" --ref "mellem-ca"

# Execute surgical deterministic transmutation
npm run transmute -- --client silvio-iwata

# Run Unified Quality Gate & Bounding Box Linter
npm run audit clientes/silvio-iwata-imobiliaria
```

---

## 🛡️ Quality Gates & Testing Architecture

Studio DNA adheres strictly to a multi-tiered, zero-mock testing philosophy:

```
test/
├── e2e/
│   ├── r1-r5-tier1-feature-coverage.test.js      # Feature verification across R1–R5
│   ├── r1-r5-tier2-boundary-corner.test.js       # Stress, malformed payloads, rate limits
│   ├── r1-r5-tier3-pairwise-combinations.test.js # Combinatorial matrix validation
│   └── r1-r5-tier4-realworld-scenarios.test.js   # Full end-to-end lifecycle runs
├── persistence-sqlite.test.js                   # node:sqlite WAL operations & concurrency
├── persistence-docstore.test.js                 # Atomic NoSQL DocumentStore tests
├── persistence-hybrid.test.js                   # HybridRepository integration
├── dnastudio-modern-ui.test.js                  # 21st.dev UI component contracts & 0 alerts
└── preview-server-v3-api.test.js                # /api/v3/* REST endpoint validation
```

### Run Automated Tests
```bash
# Execute full test suite
npm test

# Run milestone verification tests
npm run test:milestones

# Run 4-Tier E2E requirements suite
npm run test:e2e

# Run project-wide syntax audit (node --check across all JS files)
node scripts/audit-syntax.js
```

---

## 🐳 DevOps & CI/CD Pipeline

### 1. Multi-Stage Dockerfile
- **Stage 1 (Builder)**: Resolves dependencies and builds static assets.
- **Stage 2 (Runner)**: Hardened `mcr.microsoft.com/playwright` image running as unprivileged `pwuser` (`UID 1000`).
- **Exposed Port**: `4000`.
- **Persistent Volumes**: `/app/copias` and `/app/data`.
- **Healthcheck**: Automated HTTP polling on `/api/v3/analytics/kpi`.

### 2. GitHub Actions CI/CD (`.github/workflows/ci.yml`)
Automated pipeline triggered on all `push` and `pull_request` events targeting `main`:
1. **Job 1: `lint`**: Executes `node scripts/audit-syntax.js` to ensure 100% syntactical correctness across all project files.
2. **Job 2: `test`**: Sets up Node.js 20/24, installs Playwright Chromium with system dependencies, and executes `npm test`.
3. **Job 3: `docker-build`**: Builds the production Docker image and runs container smoke verification.

---

## 🔒 Truth Protocol & ICM Client Isolation

Studio DNA operates under strict governance principles formalized in [`AGENTS.md`](./AGENTS.md):

1. **Runtime Evidence Over Claims**: Labels must explicitly distinguish `observed`, `inferred`, `documented`, and `unverified`. Claims like "production-ready" require fresh executable proof.
2. **Interpretable Context Methodology (ICM)**:
   - `copias/` contains immutable, read-only reference clones.
   - Each client in `clientes/` is an **isolated sandbox**. Reusing colors, typography, or content across client scopes is strictly prohibited.
   - DNA Lock is client-specific: rules are defined exclusively within the active client's `DNA.md` or `brand-spec.json`.
3. **Promotion Taxonomy**:
   `experimental` → `candidate` → `verified` → `production`

---

## 📄 License
MIT © Studio DNA / FlashTech
