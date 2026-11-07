# Handoff Report: dnastudio Frontend & Milestone 2 Persistence API Integration Blueprint

**Author**: `explorer_m3_v3_3`  
**Target Milestone**: Milestone 3 (dnastudio UI/UX Modernization — F10-F16)  
**Target Recipient**: `worker_m3` and Orchestrator  
**Date**: 2026-11-06T18:00:00Z  
**Status**: COMPLETE (Hard Handoff)

---

## 1. Observation

### 1.1 Architecture & Endpoints in `src/server/routes/v3-persistence.js`
- `[observed]` (src/server/routes/v3-persistence.js:25-277): The router exposes 9 REST persistence endpoints mounted under `/api/v3/*`.
  - Line 51: `GET /api/v3/analytics/kpi` — Calls `hybridRepo.getDashboardAnalytics()`, returns `{ success: true, totalRuns, passedRuns, failedRuns, runningRuns, passRate, averageAuditScore, totalTokens, totalCostUsd }`.
  - Line 61: `GET /api/v3/runs` — Accepts query parameters `page` (default 1), `limit` (default 20, max 100), `siteSlug`, `status`, `sortBy` (default 'createdAt'), `sortOrder` (default 'DESC'). Returns `{ success: true, runs: [...], total, pagination: { page, limit, offset, total, totalPages } }`.
  - Line 92: `GET /api/v3/runs/:runId/raw` — Returns `{ success: true, runId, documentRef, rawDocument, payload }`. Returns HTTP 404 if `rawDocument` does not exist.
  - Line 112: `GET /api/v3/runs/:runId` — Calls `hybridRepo.getRunDetails(runId)`, returns `{ success: true, ...details, run: details }` where `details` joins SQLite run record, attached `quality_audits` array, and NoSQL `rawDocument`. Returns HTTP 404 if run does not exist.
  - Line 126: `GET /api/v3/clients` — Scans `clientesDir`, returns `{ success: true, count, clients: [ { slug, name, hasBrandSpec, hasDna, hasLinterReport }, ... ] }`.
  - Line 155: `GET /api/v3/clients/:slug/audits` — Queries `quality_audits` table in SQLite for `siteSlug`, parses `metricsJson`, returns `{ success: true, siteSlug, count, audits: [...] }`. Validates `assertSafeSlug(slugCandidate)`.
  - Line 172: `GET /api/v3/files/tree` — Accepts query `base` (`'copias'` | `'clientes'`, default `'copias'`). Recursively scans directory up to depth 3, filters out `.` entries and `node_modules`. Returns `{ success: true, base, count, files: [ { path, size, type, mtime }, ... ] }`.
  - Line 215: `GET /api/v3/files/content` — Accepts query `path`. Resolves file using `resolveStaticPath({ rootDir, copiasDir, clientesDir, pathname: targetRel })`. Rejects paths > 10MB with HTTP 413 (`File exceeds 10MB inspection limit`). Text files (`.html`, `.css`, `.js`, `.mjs`, `.json`, `.md`, `.txt`, `.svg`) return `{ success: true, path, size, type, isBinary: false, content: string }`. Binary files return `{ success: true, path, size, type, isBinary: true, base64: string }`.
  - Line 262: `POST /api/v3/admin/sync` — Calls `hybridRepo.syncExistingFilesystem({ copiasDir, clientesDir })`, returns `{ success: true, message, sitesCount, runsCount, auditsCount, documentsCount }`.

### 1.2 Mutation Authorization & Security Interception in `src/server/preview-server.js`
- `[observed]` (src/server/preview-server.js:525-528): Preview server initializes mutation options from startup options:
  ```javascript
  const mutationOptions = {
    enabled: opts.enableMutations === true,
    token: opts.mutationToken
  };
  ```
- `[observed]` (src/server/preview-server.js:564-568): Global mutation gate intercepts any non-GET request to `/api/*`:
  ```javascript
  if (pathname.startsWith('/api/') && req.method !== 'GET' && !isMutationAuthorized(req, mutationOptions)) {
    res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: 'Mutation APIs are disabled or unauthorized' }));
    return;
  }
  ```
- `[observed]` (src/server/security.js:191-199): `isMutationAuthorized(req, options)` requires `options.enabled === true`, `options.token` to be set, and incoming request header `Authorization: Bearer <token>` verified via `crypto.timingSafeEqual`.
- `[inferred]`: If dnastudio is run in default local preview mode without `--enable-mutations`, `POST /api/v3/admin/sync` will return HTTP 403. The client-side UI must handle HTTP 403 gracefully without throwing uncaught exceptions, informing the user that mutation mode is disabled or prompting for a Bearer token.

### 1.3 Path Resolution Asymmetry Between File Tree & Content Endpoints
- `[observed]` (src/server/routes/v3-persistence.js:185): In `GET /api/v3/files/tree`, `rel` is calculated relative to `scanDir` (`copiasDir` or `clientesDir`). Thus, for `base=clientes`, `f.path` has the form `"silvio-iwata-imobiliaria/site/index.html"`.
- `[observed]` (src/server/security.js:47-64): In `resolveStaticPath({ pathname })`:
  - If `segments[0] === 'clientes'`, it resolves within `clientesDir`.
  - If `segments[0] === 'copias'`, it resolves within `copiasDir`.
  - Otherwise, it defaults to resolving within `copiasDir`.
- `[observed]` (test/preview-server-v3-api.test.js:182-184): The integration test confirms:
  ```javascript
  const targetFile = treeData.files.find(f => f.path.includes('DNA.md'));
  const contentRes = await fetch(`${baseUrl}/api/v3/files/content?path=clientes/${targetFile.path}`);
  ```
- `[inferred]`: The client API layer MUST normalize paths when requesting content: if `base === 'clientes'`, prefix `clientes/` before querying `/api/v3/files/content?path=`. If `base === 'copias'`, prefix `copias/`.

### 1.4 Frontend Architecture & Absence of Bundler in `preview-server.js`
- `[observed]` (src/server/preview-server.js:205-515): dnastudio is rendered on lines 874-885 via `buildDashboardHtml(copias, clientes)` as a monolithic HTML string.
- `[observed]` (package.json): The project does not have a frontend build step (no Vite, Webpack, or Babel build command for dnastudio).
- `[inferred]`: The client-side persistence API client, state manager, and UI integration must be delivered as clean, self-contained, native Vanilla JavaScript (ES2022+ browser compatible) without requiring external bundlers or node_modules imports.

---

## 2. Logic Chain

1. **Persistence Integration Requirement**: Requirement R3 and Feature F09 mandate full operational integration between the frontend control panel and the hybrid persistence layer (SQLite + DocumentStore).
2. **Unified Client Interface (`window.dnaApi`)**: Instead of ad-hoc `fetch()` calls scattered across components (which caused legacy `alert()` dialogs and inconsistent error handling), dnastudio requires a unified, zero-dependency client layer that:
   - Encapsulates all 9 persistence endpoints.
   - Normalizes path parameters and URL queries.
   - Manages an in-memory TTL cache with request deduplication to eliminate redundant network traffic during UI transitions.
   - Manages Bearer authorization tokens for admin mutations.
3. **Data Flow to 21st.dev Components**:
   - **Feature F10 (Bento Metric Ribbon)** requires `GET /api/v3/analytics/kpi`. Because KPIs change as runs execute or sync runs, a visibility-aware polling loop (e.g. 8-second interval when tab is focused) ensures the metric ribbon stays real-time without slamming the server when the user is idle.
   - **Feature F11 (Collapsible Navigation & ⌘K Command Palette)** requires indexing clients (`GET /api/v3/clients`), recent runs (`GET /api/v3/runs`), and files (`GET /api/v3/files/tree`) into a fast client-side fuzzy search trie.
   - **Feature F12 (Interactive File & Artifact Viewer)** requires transforming the flat file list from `GET /api/v3/files/tree` into a nested tree structure (`buildFolderTree`), handling file clicks, querying `GET /api/v3/files/content`, and rendering syntax highlighting or base64 previews.
   - **Feature F13 (Visual Before/After Diff Slider)** requires pairing each client with its reference clone (from `brand-spec.json` or `/api/v2/preview/diff/:slug`), loading both `/copias/:ref/site/index.html` and `/clientes/:client/site/index.html` into synchronizable iframes, and updating split position via CSS `clip-path` at 60fps.
   - **Feature F14 (38-Variable Multi-Factor Audit Visualizer)** consumes `GET /api/v3/clients/:slug/audits`, plotting the 4 pillars (Anti-Slop, Console, Network, Motion) on an SVG radar chart and rendering accordion scorecards for each metric.
   - **Feature F15 (Sortable Runs Table & Sheet Inspector)** consumes `GET /api/v3/runs` with pagination and sorting state (`page`, `limit`, `siteSlug`, `status`, `sortBy`, `sortOrder`). Clicking a row opens the slide-over sheet drawer, fetching `GET /api/v3/runs/:runId` and raw payload `GET /api/v3/runs/:runId/raw`.
   - **Feature F16 (Toast System & Sync Trigger)** triggers `POST /api/v3/admin/sync`, displaying a non-blocking loading toast, invalidating client-side caches upon success, and triggering re-renders across all active views.

---

## 3. Caveats

1. `[observed]` **Mutation Authorization**: `POST /api/v3/admin/sync` requires a mutation token if `opts.enableMutations === true`. In environments where `--enable-mutations` was not passed to `startPreviewServer`, the server returns HTTP 403. The frontend must handle this without crashing and offer a Bearer token input setting.
2. `[documented]` **10MB File Inspection Limit**: Files exceeding 10MB will be rejected with HTTP 413 by `/api/v3/files/content`. Large video/binary assets must display a download placeholder rather than loading into memory.
3. `[inferred]` **Client Scope Isolation (ICM)**: Each client in `clientes/` is strictly isolated. The UI must never blend design tokens or brand specs across different client tabs.
4. `[observed]` **Tree Scanning Depth**: `GET /api/v3/files/tree` scans up to depth 3 (`rel.split('/').length <= 3`). Files located deeper than 3 subdirectories will not appear in the tree; if deep asset inspection is needed in the future, the backend scan depth or on-demand folder expansion would need an extension.

---

## 4. Conclusion & Complete Implementation Blueprint

### 4.1 REST API Endpoint Matrix
| Endpoint | Method | Key Params / Body | Success Format | Error Statuses | Target UI Component |
|---|---|---|---|---|---|
| `/api/v3/analytics/kpi` | `GET` | None | `{ success: true, totalRuns, passedRuns, failedRuns, runningRuns, passRate, averageAuditScore, totalTokens, totalCostUsd }` | `500` | F10 Bento Metric Ribbon |
| `/api/v3/runs` | `GET` | `page`, `limit`, `siteSlug`, `status`, `sortBy`, `sortOrder` | `{ success: true, runs: [...], total, pagination: { page, limit, offset, total, totalPages } }` | `500` | F15 Sortable Runs Table |
| `/api/v3/runs/:runId` | `GET` | `:runId` (in path) | `{ success: true, id, siteSlug, targetUrl, status, audits: [...], rawDocument: {...} }` | `404, 500` | F15 Sheet Inspector Drawer |
| `/api/v3/runs/:runId/raw` | `GET` | `:runId` (in path) | `{ success: true, runId, documentRef, rawDocument, payload }` | `404, 500` | F15 Sheet Inspector (Raw NoSQL view) |
| `/api/v3/clients` | `GET` | None | `{ success: true, count, clients: [ { slug, name, hasBrandSpec, hasDna, hasLinterReport } ] }` | `500` | F11 Sidebar, ⌘K, Client Selectors |
| `/api/v3/clients/:slug/audits` | `GET` | `:slug` (in path) | `{ success: true, siteSlug, count, audits: [ { id, auditType, passed, score, metrics } ] }` | `400, 500` | F14 38-Variable Audit Visualizer |
| `/api/v3/files/tree` | `GET` | `base` (`copias` \| `clientes`) | `{ success: true, base, count, files: [ { path, size, type, mtime } ] }` | `500` | F12 Interactive File Viewer |
| `/api/v3/files/content` | `GET` | `path` (`clientes/...` \| `copias/...`) | Text: `{ success: true, path, size, type, isBinary: false, content }`<br>Binary: `{ success: true, isBinary: true, base64 }` | `400, 404, 413, 500` | F12 Syntax Highlight Viewer |
| `/api/v3/admin/sync` | `POST` | Header `Authorization: Bearer <token>` | `{ success: true, message, sitesCount, runsCount, auditsCount, documentsCount }` | `403, 500` | F16 Sync Action Button & Toast |

---

### 4.2 Complete Drop-in Client API Module (`window.dnaApi`)
The following complete, zero-dependency module is designed for `worker_m3` to inject directly into `preview-server.js` inside the `<script>` tag of the dnastudio dashboard:

```javascript
/**
 * dna-api.js — Client-Side Persistence & Control Panel Data Layer
 * Provides robust caching, in-flight deduplication, polling, pagination, and error handling.
 */
(function() {
  'use strict';

  class DnaApiClient {
    constructor() {
      this.baseUrl = window.location.origin;
      this.cache = new Map(); // key -> { timestamp, data, ttl }
      this.inFlightRequests = new Map(); // key -> Promise
      this.kpiPollingTimer = null;
      this.mutationToken = localStorage.getItem('studio_dna_mutation_token') || '';
      
      // Default Query State for Runs Table
      this.runsQueryState = {
        page: 1,
        limit: 20,
        siteSlug: '',
        status: '',
        sortBy: 'createdAt',
        sortOrder: 'DESC'
      };
    }

    setMutationToken(token) {
      this.mutationToken = String(token || '').trim();
      if (this.mutationToken) {
        localStorage.setItem('studio_dna_mutation_token', this.mutationToken);
      } else {
        localStorage.removeItem('studio_dna_mutation_token');
      }
    }

    getMutationToken() {
      return this.mutationToken;
    }

    /**
     * Core request wrapper with caching, in-flight deduplication, and error mapping.
     */
    async request(endpoint, options = {}, { useCache = false, ttlMs = 10000, forceRefresh = false } = {}) {
      const method = (options.method || 'GET').toUpperCase();
      const cacheKey = `${method}:${endpoint}`;

      // 1. Check in-memory cache for GET requests
      if (method === 'GET' && useCache && !forceRefresh) {
        const cached = this.cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp < cached.ttl)) {
          return cached.data;
        }
      }

      // 2. In-flight request deduplication
      if (method === 'GET' && this.inFlightRequests.has(cacheKey) && !forceRefresh) {
        return this.inFlightRequests.get(cacheKey);
      }

      const headers = Object.assign({
        'Accept': 'application/json',
      }, options.headers || {});

      // Auto-attach mutation token if POST/PUT/DELETE
      if (method !== 'GET' && this.mutationToken && !headers['Authorization']) {
        headers['Authorization'] = `Bearer ${this.mutationToken}`;
      }

      const fetchPromise = (async () => {
        try {
          const res = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers
          });

          // Handle 403 Forbidden for admin mutations
          if (res.status === 403) {
            const errData = await res.json().catch(() => ({}));
            const err = new Error(errData.error || 'Ação não autorizada ou modo somente-leitura ativo');
            err.status = 403;
            err.isAuthError = true;
            throw err;
          }

          if (res.status === 413) {
            const err = new Error('Arquivo excede o limite de inspeção de 10MB.');
            err.status = 413;
            throw err;
          }

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            const err = new Error(errData.error || `Erro HTTP ${res.status}: ${res.statusText}`);
            err.status = res.status;
            throw err;
          }

          const data = await res.json();

          if (method === 'GET' && useCache) {
            this.cache.set(cacheKey, { timestamp: Date.now(), data, ttl: ttlMs });
          }

          return data;
        } finally {
          this.inFlightRequests.delete(cacheKey);
        }
      })();

      if (method === 'GET') {
        this.inFlightRequests.set(cacheKey, fetchPromise);
      }

      return fetchPromise;
    }

    invalidateCache(pattern = null) {
      if (!pattern) {
        this.cache.clear();
        return;
      }
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 1. Analytics & KPI (F10 Bento Metric Ribbon)
    // ─────────────────────────────────────────────────────────────────────────

    async getKpis({ forceRefresh = false } = {}) {
      return this.request('/api/v3/analytics/kpi', {}, {
        useCache: true,
        ttlMs: 5000,
        forceRefresh
      });
    }

    startKpiPolling(callback, intervalMs = 8000) {
      this.stopKpiPolling();
      const poll = async () => {
        if (document.visibilityState === 'hidden') return;
        try {
          const data = await this.getKpis({ forceRefresh: true });
          if (typeof callback === 'function') callback(data);
        } catch (err) {
          console.warn('[dnaApi] KPI polling error:', err.message);
        }
      };

      // Initial immediate fetch
      poll();
      this.kpiPollingTimer = setInterval(poll, intervalMs);

      // Re-trigger immediately when tab becomes visible
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') poll();
      });
    }

    stopKpiPolling() {
      if (this.kpiPollingTimer) {
        clearInterval(this.kpiPollingTimer);
        this.kpiPollingTimer = null;
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 2. Runs Table & Sheet Inspector (F15)
    // ─────────────────────────────────────────────────────────────────────────

    async getRuns(queryOverrides = {}) {
      const q = Object.assign({}, this.runsQueryState, queryOverrides);
      this.runsQueryState = q;

      const params = new URLSearchParams();
      params.set('page', String(q.page || 1));
      params.set('limit', String(q.limit || 20));
      if (q.siteSlug) params.set('siteSlug', q.siteSlug);
      if (q.status) params.set('status', q.status);
      if (q.sortBy) params.set('sortBy', q.sortBy);
      if (q.sortOrder) params.set('sortOrder', q.sortOrder);

      return this.request(`/api/v3/runs?${params.toString()}`, {}, {
        useCache: true,
        ttlMs: 8000,
        forceRefresh: Boolean(queryOverrides.forceRefresh)
      });
    }

    async getRunDetails(runId, { forceRefresh = false } = {}) {
      if (!runId) throw new Error('runId é obrigatório');
      return this.request(`/api/v3/runs/${encodeURIComponent(runId)}`, {}, {
        useCache: true,
        ttlMs: 30000,
        forceRefresh
      });
    }

    async getRunRawPayload(runId) {
      if (!runId) throw new Error('runId é obrigatório');
      return this.request(`/api/v3/runs/${encodeURIComponent(runId)}/raw`, {}, {
        useCache: true,
        ttlMs: 60000
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 3. Clients & Audits (F14 & F11)
    // ─────────────────────────────────────────────────────────────────────────

    async getClients({ forceRefresh = false } = {}) {
      return this.request('/api/v3/clients', {}, {
        useCache: true,
        ttlMs: 30000,
        forceRefresh
      });
    }

    async getClientAudits(slug, { forceRefresh = false } = {}) {
      if (!slug) throw new Error('slug é obrigatório');
      return this.request(`/api/v3/clients/${encodeURIComponent(slug)}/audits`, {}, {
        useCache: true,
        ttlMs: 15000,
        forceRefresh
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 4. File Tree & Artifact Viewer (F12 & F13)
    // ─────────────────────────────────────────────────────────────────────────

    async getFileTree(base = 'copias', { forceRefresh = false } = {}) {
      const safeBase = base === 'clientes' ? 'clientes' : 'copias';
      return this.request(`/api/v3/files/tree?base=${safeBase}`, {}, {
        useCache: true,
        ttlMs: 20000,
        forceRefresh
      });
    }

    /**
     * Retrieves file content. Safely prefixes base directory if omitted.
     * @param {string} rawPath - E.g. "clientes/silvio-iwata/site/index.html" or "silvio-iwata/site/index.html"
     * @param {'copias'|'clientes'} [base='copias']
     */
    async getFileContent(rawPath, base = 'copias') {
      if (!rawPath) throw new Error('Caminho do arquivo é obrigatório');
      let targetPath = rawPath.replace(/\\/g, '/');
      if (!targetPath.startsWith('clientes/') && !targetPath.startsWith('copias/')) {
        targetPath = `${base === 'clientes' ? 'clientes' : 'copias'}/${targetPath}`;
      }

      return this.request(`/api/v3/files/content?path=${encodeURIComponent(targetPath)}`, {}, {
        useCache: true,
        ttlMs: 60000
      });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 5. Admin Filesystem Sync (F16)
    // ─────────────────────────────────────────────────────────────────────────

    async triggerSync() {
      const res = await this.request('/api/v3/admin/sync', {
        method: 'POST'
      });
      // Invalidate all caches upon successful sync
      this.invalidateCache();
      return res;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // 6. Data Transformation & Tree Utilities
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Converts a flat file array from /api/v3/files/tree into a nested folder hierarchy.
     */
    buildFolderTree(files = []) {
      const root = { name: 'root', isDirectory: true, children: {} };

      for (const f of files) {
        const parts = f.path.split('/');
        let current = root;

        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          const isFile = (i === parts.length - 1);

          if (isFile) {
            current.children[part] = {
              name: part,
              path: f.path,
              size: f.size,
              type: f.type,
              mtime: f.mtime,
              isDirectory: false
            };
          } else {
            if (!current.children[part]) {
              current.children[part] = {
                name: part,
                isDirectory: true,
                children: {}
              };
            }
            current = current.children[part];
          }
        }
      }
      return root;
    }

    formatBytes(bytes) {
      if (!bytes || bytes <= 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    formatDate(isoString) {
      if (!isoString) return '—';
      try {
        const d = new Date(isoString);
        return d.toLocaleDateString('pt-BR', {
          day: '2-digit', month: '2-digit', year: '2-digit',
          hour: '2-digit', minute: '2-digit'
        });
      } catch (_) {
        return isoString;
      }
    }

    debounce(fn, delayMs = 300) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delayMs);
      };
    }
  }

  // Export as singleton to global window
  window.dnaApi = new DnaApiClient();
})();
```

---

### 4.3 Interactive File & Artifact Viewer (F12) Architecture
1. **Left-Pane Tree Renderer**:
   - Tab buttons toggle `base = 'copias'` vs `base = 'clientes'`.
   - On load, calls `dnaApi.getFileTree(base)`.
   - Converts the flat list to a nested tree using `dnaApi.buildFolderTree(data.files)`.
   - Recursively renders collapsible `<div class="tree-node folder">` and `<div class="tree-node file">`.
   - File icon helper displays custom SVG/emoji based on extension (`html`, `css`, `js`, `json`, `md`, `png`).
2. **Right-Pane Content Loader**:
   - Clicking a file node invokes:
     ```javascript
     async function selectFileNode(fileNode, base) {
       const viewerHeader = document.getElementById('viewerFileName');
       const viewerMeta = document.getElementById('viewerFileMeta');
       const viewerBody = document.getElementById('viewerContentArea');
       
       viewerHeader.innerText = fileNode.path;
       viewerMeta.innerText = `${dnaApi.formatBytes(fileNode.size)} • Modificado em ${dnaApi.formatDate(fileNode.mtime)}`;
       viewerBody.innerHTML = '<div class="spinner">Carregando conteúdo...</div>';

       try {
         const fileData = await dnaApi.getFileContent(fileNode.path, base);
         if (fileData.isBinary) {
           viewerBody.innerHTML = `
             <div class="binary-preview">
               <img src="data:image/${fileData.type};base64,${fileData.base64}" alt="${fileNode.name}" style="max-width:100%;border-radius:8px;"/>
             </div>`;
         } else {
           // Escapes HTML entities for syntax display
           const escaped = fileData.content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
           const lines = escaped.split('\n');
           const numberedLines = lines.map((l, i) => `<span class="line-num">${i + 1}</span><span class="line-code">${l}</span>`).join('\n');
           viewerBody.innerHTML = `<pre class="code-view language-${fileData.type}"><code>${numberedLines}</code></pre>`;
         }
       } catch (err) {
         viewerBody.innerHTML = `<div class="error-banner">Falha ao carregar arquivo: ${err.message}</div>`;
       }
     }
     ```

---

### 4.4 Visual Before/After Diff Slider (F13) Architecture
1. **Reference Clone Resolution**:
   - To show a true Before/After comparison, each client must be paired with its original reference clone in `copias/`.
   - Worker implementation resolves reference via three cascading options:
     1. Client's `brand-spec.json`: inspect `dnaApi.getFileContent(clientSlug + '/brand-spec.json', 'clientes')` for `refSlug`.
     2. Call `GET /api/site/:clientSlug` which returns `{ siteType: { refSlug } }`.
     3. Fallback map derived from `MEMORY.md`:
        - `silvio-iwata-imobiliaria` -> `copias/mellem-ca`
        - `negocia-bem` -> `copias/elyse-residence-dev-webflow-io`
        - `jumpflex-home-evolution` -> `copias/op-xy-76-aura-build`
        - `apex-barbearia` -> `copias/barbershop-landing-51-aura-build`
2. **Iframe Loading & 60fps Split Slider**:
   - `beforeIframe.src = '/${refSlug}/site/index.html'`
   - `afterIframe.src = '/clientes/${clientSlug}/site/index.html'`
   - The "After" container overlays the "Before" container. The drag handle controls the CSS clip-path:
     `afterContainer.style.clipPath = 'polygon(' + splitPercent + '% 0, 100% 0, 100% 100%, ' + splitPercent + '% 100%)';`
     `handle.style.left = splitPercent + '%';`
   - Viewport buttons adjust container max-width:
     - Desktop: `width: 1440px; height: 900px;`
     - Tablet: `width: 768px; height: 1024px;`
     - Mobile: `width: 375px; height: 812px;`

---

### 4.5 Admin Filesystem Sync Trigger (F16) & Toast Integration
1. **Sync Workflow**:
   ```javascript
   async function handleSyncTrigger() {
     const syncBtn = document.getElementById('btnSyncData');
     if (syncBtn) syncBtn.classList.add('loading');

     const toastId = window.dnaToast.loading('Sincronizando banco de dados híbrido com o sistema de arquivos...');
     try {
       const result = await window.dnaApi.triggerSync();
       window.dnaToast.dismiss(toastId);
       window.dnaToast.success(`Sincronização concluída! ${result.sitesCount || 0} sites e ${result.runsCount || 0} runs indexados.`);
       
       // Refresh active views
       window.dnaApi.getKpis({ forceRefresh: true }).then(renderKpiRibbon);
       loadRunsTable({ forceRefresh: true });
       loadFileExplorer({ forceRefresh: true });
     } catch (err) {
       window.dnaToast.dismiss(toastId);
       if (err.isAuthError) {
         window.dnaToast.error('Mutação não autorizada. Configure o Bearer Token nas configurações.');
         openMutationTokenModal();
       } else {
         window.dnaToast.error(`Falha na sincronização: ${err.message}`);
       }
     } finally {
       if (syncBtn) syncBtn.classList.remove('loading');
     }
   }
   ```

---

## 5. Verification Method

### 5.1 Automated Test Execution
Run the full persistence integration and API test suites:
```powershell
node --test test/preview-server-v3-api.test.js
node --test test/challenger-m2-2.test.js
node --test test/persistence-hybrid.test.js
```

### 5.2 Verification Checklist for `worker_m3`
- [ ] `window.dnaApi` is initialized on page load in browser console (`window.dnaApi !== undefined`).
- [ ] `dnaApi.getKpis()` returns valid KPI metrics matching `/api/v3/analytics/kpi`.
- [ ] `dnaApi.getRuns({ page: 1, limit: 10 })` populates the runs table with pagination controls.
- [ ] Clicking a run row calls `dnaApi.getRunDetails(runId)` and opens the Sheet Inspector drawer with audits and raw NoSQL document.
- [ ] `dnaApi.getFileTree('clientes')` renders a collapsible folder tree.
- [ ] Clicking a file in the tree calls `dnaApi.getFileContent()` with properly prefixed path (`clientes/...`) and renders text syntax or image preview.
- [ ] Before/After Diff Slider loads both reference clone and client transmuted site in synchronized split view.
- [ ] Sync button triggers `POST /api/v3/admin/sync` with non-blocking toast notifications.
- [ ] No `alert()` or `confirm()` blocking dialogs exist anywhere in client-side code.

### 5.3 Invalidation Conditions
This handoff specification is invalidated if:
1. The route handlers in `src/server/routes/v3-persistence.js` are altered or renamed.
2. The mutation check in `src/server/preview-server.js` changes its authorization header format (`Bearer <token>`).
3. External npm frontend build dependencies are introduced (violating zero-dependency deployment).
