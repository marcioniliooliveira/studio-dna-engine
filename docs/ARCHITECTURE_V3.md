# Studio DNA Engine v3.0 — Technical Architecture Specification

## 1. System Overview & Core Invariants

Studio DNA v3.0 is an enterprise reverse-engineering and site-transmutation engine designed to extract design intelligence from award-winning web references and deterministically reassemble client web applications without quality degradation or AI slop.

### Core Architectural Invariants:
1. **Evidence Over Assertion**: No component or build is promoted without fresh, reproducible automated evidence.
2. **Interpretable Context Methodology (ICM)**: Absolute client isolation. Reference skeletons in `copias/` are immutable read-only assets. Client directories in `clientes/` cannot share tokens, brand specs, or assets.
3. **Deterministic Transmutation**: LLM reasoning is restricted to high-level schema compilation (e.g. GPT Sol blueprint planning). Mechanical assembly, asset swapping, and token compilation are performed by deterministic JavaScript engines.
4. **Zero Blocking UI**: The user interface relies entirely on asynchronous, non-blocking toast notifications (Sonner) and event-driven updates.

---

## 2. Hybrid Persistence Engine Architecture

The persistence layer reconciles high-velocity indexed queries with unstructured deep scrape payloads.

```
                    ┌─────────────────────────┐
                    │    HybridRepository     │
                    │  (src/persistence/      │
                    │   hybrid-repository.js) │
                    └────────────┬────────────┘
                                 │
           ┌─────────────────────┴─────────────────────┐
           ▼                                           ▼
┌───────────────────────────────┐           ┌────────────────────────────────┐
│      SqliteEngine (WAL)       │           │     DocumentStore (NoSQL)      │
│  - Engine: node:sqlite        │           │  - Atomic write protocol       │
│  - Path: data/studio_dna.db   │           │  - Path: data/documents/       │
│  - Synchronous WAL mode       │           │  - Collections: deep_scrapes,  │
│  - Foreign keys ON            │           │    design_dna, shader_ast,     │
│  - Busy timeout: 5000ms       │           │    audit_reports               │
└───────────────────────────────┘           └────────────────────────────────┘
```

### Relational Schema Specification
- `sites`:
  - `id` (TEXT, PK): Unique UUID.
  - `domain` (TEXT, UNIQUE): Target domain.
  - `name` (TEXT): Site slug.
  - `status` (TEXT): Lifecycle status (`active`, `archived`).
  - `createdAt` (TEXT): ISO 8601 timestamp.
- `analysis_runs`:
  - `id` (TEXT, PK): UUID.
  - `siteId` (TEXT, FK -> `sites.id`): Associated site reference.
  - `siteSlug` (TEXT, INDEXED): Site identifier.
  - `targetUrl` (TEXT): Scraped target URL.
  - `mode` (TEXT): Extraction mode (`all`, `dna`, `ui`, `kinetic-full`).
  - `model` (TEXT): LLM or extraction model used.
  - `status` (TEXT, INDEXED): Run state (`running`, `passed`, `failed`).
  - `outputTokens` (INTEGER): Token count.
  - `costUsd` (REAL): Recorded or estimated monetary cost.
  - `artifactHash` (TEXT): SHA-256 hash of generated artifact.
  - `documentRef` (TEXT): Pointer to NoSQL document ID in `deep_scrapes`.
  - `createdAt` (TEXT, INDEXED): ISO 8601 creation timestamp.
  - `completedAt` (TEXT): ISO 8601 completion timestamp.
- `quality_audits`:
  - `id` (TEXT, PK): UUID.
  - `runId` (TEXT, FK -> `analysis_runs.id` ON DELETE CASCADE): Parent run.
  - `siteSlug` (TEXT, INDEXED): Client or site identifier.
  - `auditType` (TEXT): Quality gate type (`unified`, `38-variable`, `box-diff`).
  - `passed` (INTEGER): Boolean flag (1 = pass, 0 = fail).
  - `score` (REAL): Normalized score (0.0–100.0).
  - `metricsJson` (TEXT): JSON stringified key-value metrics.
  - `rawReportRef` (TEXT): Pointer to NoSQL document in `audit_reports`.
  - `createdAt` (TEXT): ISO 8601 timestamp.
- `file_catalog`:
  - `id` (TEXT, PK): UUID.
  - `siteSlug` (TEXT): Client slug.
  - `relativePath` (TEXT): Relative path within project.
  - `fileType` (TEXT): File extension or MIME category.
  - `sizeBytes` (INTEGER): File size.
  - `sha256` (TEXT): Content checksum.
  - `createdAt` (TEXT): ISO 8601 timestamp.
  - Unique constraint: `UNIQUE(siteSlug, relativePath)`.

### Embedded Document Store Specification
- Atomic write protocol: writes to `<target>.<random>.tmp` before executing `fs.renameSync` with transient retry logic.
- NTFS Reserved Characters Guard: Sanitizes `< > : " / \ | ? *` and control characters to prevent file-system exploits on Windows hosts.
- Query engine: Supports recursive dot-notation field navigation (`a.b.c`), exact match, array inclusion, and predicate functions.

---

## 3. REST API Specification (`/api/v3/*`)

Exposed via `src/server/preview-server.js` and `src/server/routes/v3-persistence.js`:

### Endpoints:
1. `GET /api/v3/analytics/kpi`
   - Returns: `{ success: true, totalRuns, passedRuns, failedRuns, passRate, avgScore, totalTokens, totalCostUsd }`
2. `GET /api/v3/runs`
   - Parameters: `page` (default 1), `limit` (default 20), `siteSlug`, `status`, `sortBy`, `sortOrder`.
   - Returns: `{ success: true, runs: [...], total, pagination: { page, limit, offset, total, totalPages } }`
3. `GET /api/v3/runs/:runId`
   - Returns: `{ success: true, run: { ... }, audits: [...], rawDocument: { ... } }`
4. `GET /api/v3/runs/:runId/raw`
   - Returns: `{ success: true, runId, documentRef, rawDocument: { ... } }`
5. `GET /api/v3/clients`
   - Returns: `{ success: true, clients: [...] }`
6. `GET /api/v3/clients/:slug/audits`
   - Returns: `{ success: true, siteSlug, audits: [...] }`
7. `GET /api/v3/files/tree`
   - Parameters: `scope` (`copias` | `clientes` | `all`), `slug`.
   - Returns: `{ success: true, tree: [...] }`
8. `GET /api/v3/files/content`
   - Parameters: `path` (relative project path).
   - Returns: Streamed content with appropriate MIME header.
9. `POST /api/v3/admin/sync`
   - Triggers `SyncIngestor` scan across `copias/` and `clientes/`.
   - Returns: `{ success: true, ingested: { sites, files, audits } }`

---

## 4. dnastudio 21st.dev UI/UX Command Center

The modernized dnastudio interface incorporates 7 component patterns from [21st.dev](https://21st.dev/):
1. **Bento Metric Ribbon**: Modular KPI grid with SVG sparklines and live REST polling.
2. **Floating Dock & Navigation Sidebar**: Collapsible navigation with route badges.
3. **⌘K Command Palette**: Global shortcut-triggered modal for search and navigation.
4. **Interactive File & Artifact Explorer**: Split-pane directory tree and code/JSON syntax viewer.
5. **Visual Before/After Diff Slider**: Interactive drag slider comparing reference vs transmuted output with 1440px/768px/390px viewport switching.
6. **38-Variable Multi-Factor Visualizer**: SVG polar radar chart with interactive diagnostic accordions.
7. **Sortable Runs Table & Sheet Drawer**: Filterable data table with slide-over drawer displaying raw NoSQL payloads.
8. **Sonner Toast System**: Non-blocking toast notifications guaranteeing zero `alert()` or `confirm()` interruptions.

---

## 5. DevOps & CI/CD Pipeline

```
GitHub Push / PR (main)
        │
        ▼
┌─────────────────────────┐
│     Job 1: lint         │ ──> node scripts/audit-syntax.js (100% syntax check)
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│     Job 2: test         │ ──> Install Playwright with deps, run npm test
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Job 3: docker-build    │ ──> Multi-stage Docker build & container smoke test
└─────────────────────────┘
```

- **Containerization**:
  - Unprivileged user `pwuser` (`UID 1000`).
  - Persistent storage at `/app/copias` and `/app/data`.
  - HTTP healthcheck on `/api/v3/analytics/kpi`.
