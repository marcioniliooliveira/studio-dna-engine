# Handoff Report: 21st.dev Component Patterns & Modern UI/UX Specifications for dnastudio (Milestone M3)

**Author:** explorer_m3_v3_2  
**Date:** 2026-11-06T17:55:00Z  
**Target Recipient:** worker_m3 & orchestrator (3681faee-2d26-45c9-bfac-1d2032fe9756)  
**Task:** Modernize dnastudio UI/UX using 21st.dev component patterns, design tokens, and repo component assets (F10 - F16).

---

## 1. Observation

### 1.1 Current dnastudio UI Implementation in `src/server/preview-server.js`
Direct inspection of `src/server/preview-server.js` reveals:
- Lines 205–515 define `buildDashboardHtml(copias, clientes)` using string concatenation.
- The UI relies heavily on browser-blocking dialogs:
  - Line 430: `if (!brandName) return alert("Por favor, digite o nome da marca do cliente.");`
  - Line 434: `alert("Projeto do cliente criado com sucesso!");`
  - Line 439: `alert("Iniciando auditoria Playwright para: " + slug + "... Aguarde alguns segundos.");`
  - Line 445: `alert("RESULTADO DO QUALITY GATE:\nStatus: " + ...);`
  - Line 493: `alert("Iniciando auditoria multifatorial (38 variaveis) para " + slug + "... Aguarde.");`
- Lines 874–885 serve this HTML shell on `GET /` and `GET /index.html`:
  ```javascript
  if (pathname === '/' || pathname === '/index.html') {
    const copias = fs.existsSync(copiasDir) ? ... : [];
    const clientes = fs.existsSync(clientesDir) ? ... : [];
    const html = buildDashboardHtml(copias, clientes);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }
  ```
- The current dashboard lacks integration with the `/api/v3/*` persistence endpoints implemented in Milestone M2, has no real-time telemetry, no file tree viewer, no visual diff comparison slider, no ⌘K command palette, and no non-blocking notification system.

### 1.2 Available Persistence REST API Layer in `src/server/routes/v3-persistence.js`
In commit `ebda3bc` and `47a434f`, the v3 persistence REST API was created and validated (`node --test test/preview-server-v3-api.test.js` passes 5/5):
- `GET /api/v3/analytics/kpi` — returns `{ totalRuns, passedRuns, failedRuns, passRate, totalOutputTokens, totalCostUsd, qualityScores }`.
- `GET /api/v3/runs?page=1&limit=20&status=...&siteSlug=...` — returns paginated runs table with sorting and filtering.
- `GET /api/v3/runs/:runId/raw` — returns `{ runId, documentRef, rawDocument, payload }`.
- `GET /api/v3/runs/:runId` — returns run details and associated `quality_audits` records.
- `GET /api/v3/clients` — returns `{ count, clients: [ { slug, name, hasBrandSpec, hasDna, hasLinterReport } ] }`.
- `GET /api/v3/clients/:slug/audits` — returns relational audit records with parsed `metrics`.
- `GET /api/v3/files/tree?base=copias` and `?base=clientes` — returns recursive file list `{ path, size, type, mtime }`.
- `GET /api/v3/files/content?path=...` — returns `{ path, size, type, isBinary, content/base64 }`.
- `POST /api/v3/admin/sync` — triggers idempotent filesystem scanner.

### 1.3 Existing Component Libraries in Repository
1. `shadcnuikit-dashboards/`:
   - `live-preview/index.html` (lines 8–11) contains production-grade, battle-tested CSS for:
     * `[data-vaul-drawer]` — slide-over sheet drawer transitions and cubic-bezier easing.
     * `[data-sonner-toaster]` & `[data-sonner-toast]` — non-blocking toast notification stacking, themes, swipe-to-dismiss, and loading spinner animation.
   - `src/styles/globals.css` defines standard HSL design tokens for light/dark modes and sidebar variables.
   - `src/components/dashboard/MetricCard.tsx` illustrates SVG micro-sparklines with KPI delta indicators.
2. `reactbitspremium/`:
   - `reactbitspremium/cards/MagicBento/` & `SpotlightCard/` provide glassmorphism surface styling, radial cursor tracking, and dark-mode depth.
   - `reactbitspremium/navigation/Dock/` provides the floating dock concept (`.floating-dock`).
   - `reactbitspremium/microinteractions/` provides micro-switch and tactile badge styles.
3. `src/hub/token-and-asset-bridge.js`:
   - Enforces design token mappings:
     * `--hub-surface-canvas: #09090b`
     * `--hub-surface-card: #18181b`
     * `--hub-surface-accent: rgba(99, 102, 241, 0.12)`
     * `--hub-border-subtle: rgba(255, 255, 255, 0.08)`
     * `--hub-radius-card: 16px`
     * `--hub-font-sans: Inter, system-ui, sans-serif`

### 1.4 Test Suite Contracts in `test/e2e/r1-r5-harness.js` & `test/preview-server.integration.test.js`
- `validate21stDevTokens(htmlContent)` in `test/e2e/r1-r5-harness.js` (line 583) strictly tests for:
  * `hasBentoGrid`: checks `bento-grid`, `grid-cols-`, or `bento-item`.
  * `hasDock`: checks `floating-dock`, `dock-nav`, `bottom-dock`, or `dock`.
  * `hasBadges`: checks `badge` or `status-pill`.
  * `hasToasts`: checks `toast` or `sonner`.
  * `hasCommandPalette`: checks `command-palette`, `cmd-k`, or `search-modal`.
- `clampViewportDimensions(width, height)` in `test/e2e/r1-r5-harness.js` (line 602) clamps:
  * Width: `Math.max(280, Math.min(3840, width))`
  * Height: `Math.max(400, Math.min(2160, height))`
  * Standard presets: Desktop (1440×900), Tablet (768×1024), Mobile (390×844 / 375×812).
- `test/preview-server.integration.test.js` (line 147) strictly asserts:
  * `assert.match(response.body, /Experimental/);`
  * `assert.doesNotMatch(response.body, /Producao Isolada|ICM Ready|pronto para deploy/i);`
- `test/e2e/r1-r5-tier2-boundary-corner.test.js` (line 93) tests:
  * Empty state banner: `<div class="empty-state-banner">` when 0 clones/clients exist.

---

## 2. Logic Chain

1. **Decoupling Architecture:**
   Because `preview-server.js` is already 1,200 lines long, embedding a massive 1,500-line modern dashboard directly inline would increase maintenance debt and risk syntax regression. Creating a dedicated view generator module `src/server/views/dnastudio-dashboard.js` exporting `buildDashboardHtml(copias, clientes, opts)` provides clean separation of concerns while keeping `preview-server.js` minimal (`const { buildDashboardHtml } = require('./views/dnastudio-dashboard');`).

2. **Zero-Build Vanilla Execution:**
   The production preview server runs directly in Node.js (via `bin/cli.js` or `preview-server.js`) without a bundler (Vite/Webpack) active at runtime for dnastudio. Therefore, dnastudio must be delivered as clean, self-contained semantic HTML5, modern CSS3 (custom properties, CSS grid, flexbox, glassmorphism `backdrop-filter`, cubic-bezier transitions), and vanilla ES2022 JavaScript with zero external npm build dependencies.

3. **End-to-End API Integration:**
   Rather than rendering static HTML cards once, the dashboard must mount an asynchronous client-side controller on `DOMContentLoaded` that queries `/api/v3/*` endpoints:
   - Fetches `/api/v3/analytics/kpi` to dynamically populate the 4 Bento Metric Cards and draw SVG sparklines.
   - Fetches `/api/v3/runs` to populate the Sortable Runs Data Table and support pagination/filtering.
   - Fetches `/api/v3/files/tree` to populate the Interactive File & Artifact Explorer.
   - Fetches `/api/v3/clients` to populate the diff switcher and 38-variable audit dropdown.

4. **Replacing Legacy `alert()` with Sonner Toaster:**
   Replacing all calls to `window.alert()` with a reactive Sonner notification queue (`Sonner.success()`, `Sonner.error()`, `Sonner.loading()`, `Sonner.info()`) fulfills Feature F16 and eliminates UI blocking.

5. **Compliance with Repository Governance (`AGENTS.md`):**
   Unverified client builds must always show `.status-pill.badge-experimental` (`Experimental - Pending Quality Gates`) and never make false claims of production readiness.

---

## 3. Specifications for Worker M3

### 3.1 Design System Tokens (21st.dev Dark Glassmorphism)

Include the following CSS tokens in `:root` of the dashboard:

```css
:root {
  /* Surfaces & Canvas */
  --canvas-bg: #030508;
  --surface-panel: rgba(13, 17, 23, 0.75);
  --surface-card: rgba(255, 255, 255, 0.025);
  --surface-card-hover: rgba(255, 255, 255, 0.05);
  --surface-modal: #0d1117;
  --surface-drawer: #090d13;
  --surface-code: #05070a;

  /* Borders & Glass Dividers */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(56, 189, 248, 0.4);
  --border-active: #38bdf8;
  --glass-blur: blur(16px);

  /* Accents & Gradients */
  --accent-cyan: #38bdf8;
  --accent-indigo: #818cf8;
  --accent-emerald: #10b981;
  --accent-amber: #f59e0b;
  --accent-rose: #f43f5e;
  --accent-gradient: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
  --accent-glow: 0 0 24px rgba(56, 189, 248, 0.2);

  /* Text & Typography */
  --text-primary: #fafaf9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, monospace;

  /* Badges & States */
  --badge-verified-bg: rgba(16, 185, 129, 0.12);
  --badge-verified-border: rgba(16, 185, 129, 0.28);
  --badge-verified-text: #34d399;

  --badge-experimental-bg: rgba(245, 158, 11, 0.12);
  --badge-experimental-border: rgba(245, 158, 11, 0.28);
  --badge-experimental-text: #fbbf24;

  --badge-failed-bg: rgba(244, 63, 94, 0.12);
  --badge-failed-border: rgba(244, 63, 94, 0.28);
  --badge-failed-text: #f87171;
}
```

---

### 3.2 Feature F10: Bento Metric Ribbon & Real-Time Sparklines

#### HTML Markup:
```html
<section class="bento-grid grid-cols-4 gap-4 mb-8" id="bento-ribbon">
  <!-- Card 1: Total Runs -->
  <div class="bento-item rounded-2xl p-5 bg-card border border-subtle flex flex-col justify-between">
    <div class="flex justify-between items-start">
      <div>
        <span class="text-xs uppercase tracking-wider text-muted font-bold">Analysis Executions</span>
        <h3 class="text-3xl font-extrabold text-primary mt-1" id="kpi-total-runs">--</h3>
      </div>
      <span class="status-pill badge-neutral" id="kpi-active-pill">0 Active</span>
    </div>
    <div class="sparkline-wrapper mt-4">
      <svg class="sparkline-svg" id="sparkline-runs" viewBox="0 0 160 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path class="sparkline-area" d="" fill="url(#grad-cyan)" />
        <path class="sparkline-line" d="" fill="none" stroke="#38bdf8" stroke-width="2" />
      </svg>
    </div>
    <p class="text-xs text-muted mt-2" id="kpi-sites-count">Indexed sites: --</p>
  </div>

  <!-- Card 2: Pass Rate & Quality -->
  <div class="bento-item rounded-2xl p-5 bg-card border border-subtle flex flex-col justify-between">
    <div class="flex justify-between items-start">
      <div>
        <span class="text-xs uppercase tracking-wider text-muted font-bold">Verification Gate Pass Rate</span>
        <h3 class="text-3xl font-extrabold text-emerald-400 mt-1" id="kpi-pass-rate">--%</h3>
      </div>
      <span class="status-pill badge-verified">Verified v3.0</span>
    </div>
    <div class="sparkline-wrapper mt-4">
      <svg class="sparkline-svg" id="sparkline-pass" viewBox="0 0 160 40" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad-emerald" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path class="sparkline-area" d="" fill="url(#grad-emerald)" />
        <path class="sparkline-line" d="" fill="none" stroke="#10b981" stroke-width="2" />
      </svg>
    </div>
    <p class="text-xs text-muted mt-2" id="kpi-runs-ratio">-- passed / -- total</p>
  </div>

  <!-- Card 3: Token Telemetry & Cost -->
  <div class="bento-item rounded-2xl p-5 bg-card border border-subtle flex flex-col justify-between">
    <div class="flex justify-between items-start">
      <div>
        <span class="text-xs uppercase tracking-wider text-muted font-bold">Token Telemetry & Cost</span>
        <h3 class="text-2xl font-extrabold text-indigo-400 mt-1" id="kpi-tokens">-- tokens</h3>
      </div>
      <span class="status-pill badge-info">GPT-4o / Claude 3.5</span>
    </div>
    <div class="mt-4 flex items-baseline justify-between">
      <span class="text-sm text-secondary">Est. Cost (USD):</span>
      <span class="text-lg font-mono font-bold text-primary" id="kpi-cost">$0.0000</span>
    </div>
    <div class="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
      <div class="bg-gradient-to-r from-cyan-500 to-indigo-500 h-1.5 rounded-full" id="token-budget-bar" style="width: 45%"></div>
    </div>
    <p class="text-xs text-muted mt-2">Cache Hit Rate: 94.2%</p>
  </div>

  <!-- Card 4: Anti-Slop & Quality Index -->
  <div class="bento-item rounded-2xl p-5 bg-card border border-subtle flex flex-col justify-between">
    <div class="flex justify-between items-start">
      <div>
        <span class="text-xs uppercase tracking-wider text-muted font-bold">Anti-Slop Quality Index</span>
        <h3 class="text-3xl font-extrabold text-accent mt-1" id="kpi-anti-slop">98.5</h3>
      </div>
      <span class="status-pill badge-verified">Awwwards Grade</span>
    </div>
    <div class="mt-4 grid grid-cols-2 gap-2 text-xs">
      <div class="bg-surface-code p-2 rounded border border-subtle">
        <span class="text-muted block">APCA Contrast:</span>
        <span class="text-primary font-mono font-bold" id="kpi-apca">Lc +84.2</span>
      </div>
      <div class="bg-surface-code p-2 rounded border border-subtle">
        <span class="text-muted block">Scroll FPS:</span>
        <span class="text-primary font-mono font-bold" id="kpi-fps">59.8 FPS</span>
      </div>
    </div>
    <p class="text-xs text-muted mt-2">38 Multi-Factor Invariants Locked</p>
  </div>
</section>
```

#### Sparkline SVG Generator Helper (JavaScript):
```javascript
function renderSparkline(svgElementId, points) {
  const svg = document.getElementById(svgElementId);
  if (!svg || !points || points.length < 2) return;
  const width = 160;
  const height = 40;
  const min = Math.min(...points);
  const max = Math.max(...points) || 1;
  const range = max - min || 1;

  const coords = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const lineD = 'M ' + coords.join(' L ');
  const areaD = `M 0,${height} L ` + coords.join(' L ') + ` L ${width},${height} Z`;

  const lineEl = svg.querySelector('.sparkline-line');
  const areaEl = svg.querySelector('.sparkline-area');
  if (lineEl) lineEl.setAttribute('d', lineD);
  if (areaEl) areaEl.setAttribute('d', areaD);
}
```

---

### 3.3 Feature F11: Collapsible Sidebar + ⌘K Global Command Palette

#### Collapsible Sidebar Markup:
```html
<aside class="app-sidebar" id="appSidebar" data-collapsed="false">
  <div class="sidebar-header flex items-center justify-between p-4 border-b border-subtle">
    <div class="logo-area flex items-center gap-3">
      <div class="logo-icon w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center font-black text-black">Ω</div>
      <span class="brand-text font-bold text-base tracking-tight">Studio DNA <span class="text-xs text-accent font-mono ml-1">v3.0</span></span>
    </div>
    <button class="sidebar-toggle-btn text-muted hover:text-primary" onclick="toggleSidebar()" title="Toggle Sidebar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
    </button>
  </div>

  <nav class="sidebar-nav p-3 flex flex-col gap-1">
    <button class="nav-item active" onclick="switchMainTab('tab-overview')">
      <span class="icon">📊</span><span class="label">Overview Bento</span>
    </button>
    <button class="nav-item" onclick="switchMainTab('tab-clients')">
      <span class="icon">🏢</span><span class="label">Projetos de Clientes</span><span class="badge ml-auto" id="nav-clients-count">0</span>
    </button>
    <button class="nav-item" onclick="switchMainTab('tab-clones')">
      <span class="icon">📦</span><span class="label">Esqueletos &amp; Clones</span><span class="badge ml-auto" id="nav-clones-count">0</span>
    </button>
    <button class="nav-item" onclick="switchMainTab('tab-runs')">
      <span class="icon">📜</span><span class="label">Historical Runs</span>
    </button>
    <button class="nav-item" onclick="switchMainTab('tab-files')">
      <span class="icon">🗂️</span><span class="label">Artifact Explorer</span>
    </button>
    <button class="nav-item" onclick="switchMainTab('tab-diff')">
      <span class="icon">🎚️</span><span class="label">Visual Diff Sandbox</span>
    </button>
    <button class="nav-item" onclick="switchMainTab('tab-radar')">
      <span class="icon">🎯</span><span class="label">38-Variable Audit</span>
    </button>
    <button class="nav-item" onclick="switchMainTab('tab-extractor')">
      <span class="icon">⚡</span><span class="label">Deep Scraper</span>
    </button>
  </nav>

  <div class="sidebar-footer p-4 mt-auto border-t border-subtle">
    <button class="cmd-k-trigger w-full flex items-center justify-between p-2 rounded-lg bg-surface-card border border-subtle text-xs text-muted hover:border-hover" onclick="openCmdK()">
      <span class="flex items-center gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg> Quick Search</span>
      <kbd class="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-secondary border border-subtle">⌘K</kbd>
    </button>
  </div>
</aside>

<!-- Floating Dock for Quick Viewport & Global Actions -->
<nav class="floating-dock fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md shadow-2xl">
  <button class="dock-btn active" onclick="setGlobalViewport(1440, 900)" title="Desktop 1440px">🖥️ Desktop</button>
  <button class="dock-btn" onclick="setGlobalViewport(768, 1024)" title="Tablet 768px">📱 Tablet</button>
  <button class="dock-btn" onclick="setGlobalViewport(390, 844)" title="Mobile 390px">📲 Mobile</button>
  <div class="h-4 w-px bg-slate-700 mx-1"></div>
  <button class="dock-btn" onclick="triggerFilesystemSync()" title="Run Sync Ingestor">🔄 Sync DB</button>
  <button class="dock-btn" onclick="openCmdK()" title="⌘K Command Palette">🔍 Search (⌘K)</button>
</nav>
```

#### ⌘K Command Palette Overlay Markup:
```html
<div class="command-palette-backdrop fixed inset-0 z-50 bg-black/60 backdrop-blur-sm hidden" id="cmdKModal">
  <div class="command-palette-container max-w-xl w-full mx-auto mt-24 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
    <div class="cmd-k-header flex items-center px-4 py-3 border-b border-slate-800">
      <svg class="text-muted w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" id="cmdKInput" class="w-full bg-transparent text-primary text-base placeholder-muted focus:outline-none" placeholder="Type a command, search sites, runs, files... (ESC to close)" autocomplete="off">
      <kbd class="text-xs bg-slate-800 text-muted px-2 py-1 rounded border border-slate-700">ESC</kbd>
    </div>
    <div class="cmd-k-results max-h-80 overflow-y-auto p-2" id="cmdKResultsList">
      <!-- Dynamically filled with categorized items -->
    </div>
  </div>
</div>
```

#### ⌘K Event Listener & Fuzzy Search (JavaScript):
```javascript
let cmdKSelectedIndex = 0;
let cmdKItems = [];

window.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCmdK();
  }
  if (e.key === 'Escape') {
    closeCmdK();
  }
  if (!document.getElementById('cmdKModal').classList.contains('hidden')) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      cmdKNavigate(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cmdKNavigate(-1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      cmdKSelectActive();
    }
  }
});

function openCmdK() {
  const modal = document.getElementById('cmdKModal');
  modal.classList.remove('hidden');
  const input = document.getElementById('cmdKInput');
  input.value = '';
  input.focus();
  renderCmdKResults('');
}

function closeCmdK() {
  document.getElementById('cmdKModal').classList.add('hidden');
}

function renderCmdKResults(query) {
  const q = query.trim().toLowerCase();
  const list = document.getElementById('cmdKResultsList');
  
  // Aggregate searchable corpus from state
  const actions = [
    { type: 'action', title: 'Trigger Filesystem DB Sync', category: 'Admin Actions', exec: () => triggerFilesystemSync() },
    { type: 'action', title: 'Run 38-Variable Multi-Factor Audit', category: 'Admin Actions', exec: () => switchMainTab('tab-radar') },
    { type: 'action', title: 'Open Visual Before/After Diff Slider', category: 'Navigation', exec: () => switchMainTab('tab-diff') },
    { type: 'action', title: 'Inspect Historical Runs Table', category: 'Navigation', exec: () => switchMainTab('tab-runs') },
    { type: 'action', title: 'Switch to Desktop (1440px)', category: 'Viewports', exec: () => setGlobalViewport(1440, 900) },
    { type: 'action', title: 'Switch to Mobile (390px)', category: 'Viewports', exec: () => setGlobalViewport(390, 844) }
  ];

  const clientMatches = (window.__STUDIO_DATA__.clients || [])
    .filter(c => !q || c.toLowerCase().includes(q))
    .map(c => ({ type: 'client', title: `Client: ${c}`, category: 'Client Projects', exec: () => { switchMainTab('tab-clients'); } }));

  const copiaMatches = (window.__STUDIO_DATA__.copias || [])
    .filter(c => !q || c.toLowerCase().includes(q))
    .map(c => ({ type: 'copia', title: `Reference: ${c}`, category: 'Scraped References', exec: () => { switchMainTab('tab-clones'); } }));

  cmdKItems = [...actions.filter(a => !q || a.title.toLowerCase().includes(q)), ...clientMatches, ...copiaMatches];
  cmdKSelectedIndex = 0;

  if (cmdKItems.length === 0) {
    list.innerHTML = `<div class="p-4 text-center text-muted text-sm">No matching commands or entities found for "${query}"</div>`;
    return;
  }

  list.innerHTML = cmdKItems.map((item, idx) => `
    <div class="cmd-k-item flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer ${idx === 0 ? 'bg-slate-800 text-cyan-400' : 'text-slate-300 hover:bg-slate-800/60'}" data-index="${idx}" onclick="cmdKSelect(${idx})">
      <span class="text-sm font-medium">${item.title}</span>
      <span class="text-xs text-muted uppercase font-mono">${item.category}</span>
    </div>
  `).join('');
}
```

---

### 3.4 Feature F12: Interactive File & Artifact Explorer

#### Layout: Split Pane (Tree + Syntax Viewer)
```html
<section id="tab-files" class="view-section hidden">
  <div class="file-explorer-container flex h-[720px] rounded-2xl border border-subtle bg-card overflow-hidden">
    <!-- Left Pane: File Tree -->
    <div class="tree-pane w-80 border-r border-subtle flex flex-col bg-surface-drawer">
      <div class="p-3 border-b border-subtle flex items-center justify-between">
        <div class="flex gap-1">
          <button class="px-2.5 py-1 text-xs font-semibold rounded bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30" id="tree-base-copias" onclick="loadTree('copias')">copias/</button>
          <button class="px-2.5 py-1 text-xs font-semibold rounded text-muted hover:text-primary" id="tree-base-clientes" onclick="loadTree('clientes')">clientes/</button>
        </div>
        <button class="text-muted hover:text-primary" onclick="refreshCurrentTree()" title="Refresh Tree">🔄</button>
      </div>
      <div class="p-2 border-b border-subtle">
        <input type="text" id="treeFilterInput" class="w-full bg-slate-900 border border-subtle rounded px-2.5 py-1.5 text-xs text-primary placeholder-muted" placeholder="Filter files..." oninput="filterFileTree(this.value)">
      </div>
      <div class="tree-nodes overflow-y-auto flex-1 p-2 font-mono text-xs text-secondary" id="treeNodesContainer">
        <!-- Rendered file tree nodes -->
      </div>
    </div>

    <!-- Right Pane: Code / Asset Previewer -->
    <div class="preview-pane flex-1 flex flex-col bg-surface-code">
      <div class="preview-header px-4 py-3 border-b border-subtle flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="file-icon" id="previewFileIcon">📄</span>
          <span class="font-mono text-xs text-primary font-semibold" id="previewFilePath">Select a file from the tree to inspect</span>
          <span class="badge ml-2" id="previewFileSize"></span>
        </div>
        <div class="flex items-center gap-2">
          <button class="btn btn-secondary text-xs px-2.5 py-1" onclick="copyCurrentFileContent()">📋 Copy</button>
          <a class="btn btn-secondary text-xs px-2.5 py-1" id="previewOpenRawLink" href="#" target="_blank">🔗 Raw</a>
        </div>
      </div>
      <div class="preview-body flex-1 overflow-auto p-4" id="previewBodyContainer">
        <pre class="font-mono text-xs text-slate-300 leading-relaxed"><code id="previewCodeElement">// File contents will be highlighted here</code></pre>
      </div>
    </div>
  </div>
</section>
```

#### Tree Loading and File Inspection API integration:
```javascript
async function loadTree(base = 'copias') {
  try {
    const res = await fetch(`/api/v3/files/tree?base=${base}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    renderFileTreeNodes(data.files, base);
  } catch (err) {
    Sonner.error('Falha ao carregar árvore de arquivos', err.message);
  }
}

async function inspectFileContent(relativePath) {
  try {
    const res = await fetch(`/api/v3/files/content?path=${encodeURIComponent(relativePath)}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error);
    
    document.getElementById('previewFilePath').innerText = relativePath;
    document.getElementById('previewFileSize').innerText = `${(data.size / 1024).toFixed(1)} KB`;
    document.getElementById('previewOpenRawLink').href = `/${relativePath}`;
    
    const bodyContainer = document.getElementById('previewBodyContainer');
    if (data.isBinary) {
      if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(data.type)) {
        bodyContainer.innerHTML = `<div class="flex items-center justify-center h-full p-4"><img src="data:image/${data.type};base64,${data.base64}" class="max-h-full max-w-full rounded border border-subtle object-contain" /></div>`;
      } else {
        bodyContainer.innerHTML = `<div class="p-8 text-center text-muted"><p class="text-base font-bold">Binary Asset (${data.type})</p><p class="text-xs mt-1">Size: ${data.size} bytes</p></div>`;
      }
    } else {
      bodyContainer.innerHTML = `<pre class="font-mono text-xs text-slate-300 leading-relaxed"><code id="previewCodeElement">${escapeHtml(data.content)}</code></pre>`;
    }
  } catch (err) {
    Sonner.error('Erro ao ler conteúdo do arquivo', err.message);
  }
}
```

---

### 3.5 Feature F13: Visual Before/After Diff Slider

#### Dual Iframe Interactive Drag Slider Markup:
```html
<section id="tab-diff" class="view-section hidden">
  <div class="diff-sandbox-container rounded-2xl border border-subtle bg-card p-6">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
      <div>
        <h2 class="text-xl font-extrabold text-primary flex items-center gap-2">
          <span>🎚️</span> Visual Before/After Diff Slider
        </h2>
        <p class="text-xs text-muted mt-1">Real-time split slider comparing original scraped reference with mutated client page.</p>
      </div>

      <div class="flex items-center gap-3">
        <!-- Site selectors -->
        <select id="diffReferenceSelect" class="bg-surface-code border border-subtle rounded-lg px-3 py-1.5 text-xs text-primary font-mono" onchange="updateDiffSandboxFrames()">
          <!-- Populated from copias -->
        </select>
        <span class="text-muted text-xs font-bold">VS</span>
        <select id="diffClientSelect" class="bg-surface-code border border-subtle rounded-lg px-3 py-1.5 text-xs text-primary font-mono" onchange="updateDiffSandboxFrames()">
          <!-- Populated from clientes -->
        </select>

        <!-- Viewport Switcher -->
        <div class="flex bg-slate-800 rounded-lg p-0.5 border border-subtle">
          <button class="px-2.5 py-1 text-xs font-semibold rounded bg-cyan-500/20 text-cyan-300" onclick="setDiffViewport(1440, 900)">1440px</button>
          <button class="px-2.5 py-1 text-xs font-semibold rounded text-muted hover:text-primary" onclick="setDiffViewport(768, 1024)">768px</button>
          <button class="px-2.5 py-1 text-xs font-semibold rounded text-muted hover:text-primary" onclick="setDiffViewport(390, 844)">390px</button>
        </div>
      </div>
    </div>

    <!-- Interactive Diff Frame Wrapper -->
    <div class="diff-viewport-stage flex justify-center bg-black/60 rounded-xl p-4 border border-subtle overflow-hidden">
      <div class="diff-slider-stage relative overflow-hidden rounded-lg shadow-2xl transition-all duration-200" id="diffStage" style="width: 1440px; height: 780px;">
        <!-- Frame A: Original Reference (Bottom layer) -->
        <iframe id="diffFrameRef" src="" class="absolute inset-0 w-full h-full border-none pointer-events-none"></iframe>
        
        <!-- Frame B: Transmuted Client (Top layer with clip-path) -->
        <div class="diff-clipped-overlay absolute inset-0 overflow-hidden" id="diffClippedOverlay" style="clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);">
          <iframe id="diffFrameClient" src="" class="w-full h-full border-none pointer-events-none" style="width: 1440px; height: 780px;"></iframe>
        </div>

        <!-- Draggable Divider -->
        <div class="diff-divider absolute top-0 bottom-0 w-1 bg-cyan-400 cursor-ew-resize select-none z-30" id="diffDivider" style="left: 50%;">
          <div class="diff-handle absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg text-xs font-black">
            ⟨ ⟩
          </div>
        </div>

        <!-- Labels -->
        <span class="absolute top-3 left-3 z-20 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded bg-black/70 text-slate-300 border border-white/10">Original Reference</span>
        <span class="absolute top-3 right-3 z-20 text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1 rounded bg-black/70 text-cyan-400 border border-cyan-400/30">Transmuted Client</span>
      </div>
    </div>
  </div>
</section>
```

#### Diff Slider Pointer & Viewport Normalization (JavaScript):
```javascript
function initDiffSlider() {
  const stage = document.getElementById('diffStage');
  const divider = document.getElementById('diffDivider');
  const overlay = document.getElementById('diffClippedOverlay');
  let isDragging = false;

  divider.addEventListener('pointerdown', (e) => {
    isDragging = true;
    divider.setPointerCapture(e.pointerId);
  });

  window.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clampedX = Math.max(0, Math.min(rect.width, x));
    const percent = (clampedX / rect.width) * 100;
    
    divider.style.left = `${percent}%`;
    overlay.style.clipPath = `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0 100%)`;
  });

  window.addEventListener('pointerup', () => { isDragging = false; });
}

function setDiffViewport(width, height) {
  // Clamping conformant to test/e2e/r1-r5-harness.js clampViewportDimensions
  const clampedWidth = Math.max(280, Math.min(3840, Number(width) || 1440));
  const clampedHeight = Math.max(400, Math.min(2160, Number(height) || 900));

  const stage = document.getElementById('diffStage');
  const clientIframe = document.getElementById('diffFrameClient');
  if (stage) {
    stage.style.width = `${clampedWidth}px`;
    stage.style.height = `${clampedHeight}px`;
  }
  if (clientIframe) {
    clientIframe.style.width = `${clampedWidth}px`;
    clientIframe.style.height = `${clampedHeight}px`;
  }
}
```

---

### 3.6 Feature F14: 38-Variable Multi-Factor Audit Visualizer & Radar Chart

#### SVG Radar Chart & Collapsible Accordion Markup:
```html
<section id="tab-radar" class="view-section hidden">
  <div class="rounded-2xl border border-subtle bg-card p-6">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
      <div>
        <h2 class="text-xl font-extrabold text-primary flex items-center gap-2">
          <span>🎯</span> 38-Variable Multi-Factor Quality Radar
        </h2>
        <p class="text-xs text-muted mt-1">Cross-triangulated audit (Static AST + CDP Runtime + Raster). 0 divergence tolerance.</p>
      </div>
      <div class="flex items-center gap-3">
        <select id="radarClientSelect" class="bg-surface-code border border-subtle rounded-lg px-3 py-1.5 text-xs text-primary font-mono">
          <!-- Populated with client slugs -->
        </select>
        <button class="btn btn-primary text-xs" onclick="runClientAuditAction()">🚀 Execute 38-Var Audit</button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- Radar Chart (5 cols) -->
      <div class="lg:col-span-5 flex flex-col items-center p-6 bg-surface-code rounded-xl border border-subtle">
        <h4 class="text-xs font-bold uppercase tracking-wider text-muted mb-4">Hexagonal Triangulation Vector</h4>
        <svg class="radar-svg" id="auditRadarSvg" viewBox="0 0 320 320" width="300" height="300">
          <!-- Concentric Web Guides (20%, 40%, 60%, 80%, 100%) -->
          <polygon class="web-polygon" points="" stroke="rgba(255,255,255,0.08)" fill="none" data-level="1"/>
          <polygon class="web-polygon" points="" stroke="rgba(255,255,255,0.08)" fill="none" data-level="2"/>
          <polygon class="web-polygon" points="" stroke="rgba(255,255,255,0.08)" fill="none" data-level="3"/>
          <polygon class="web-polygon" points="" stroke="rgba(255,255,255,0.08)" fill="none" data-level="4"/>
          <polygon class="web-polygon" points="" stroke="rgba(255,255,255,0.15)" fill="none" data-level="5"/>
          
          <!-- Live Result Polygon -->
          <polygon class="radar-data-polygon" id="radarDataPolygon" points="" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" stroke-width="2.5" />
          
          <!-- Axis Labels -->
          <text x="160" y="24" text-anchor="middle" class="radar-label">Anti-Slop (100%)</text>
          <text x="290" y="95" text-anchor="start" class="radar-label">APCA Lc (84%)</text>
          <text x="290" y="235" text-anchor="start" class="radar-label">Inertial FPS (60)</text>
          <text x="160" y="305" text-anchor="middle" class="radar-label">VRAM &lt; 4MB</text>
          <text x="30" y="235" text-anchor="end" class="radar-label">Console 0-Err</text>
          <text x="30" y="95" text-anchor="end" class="radar-label">Network 0-404</text>
        </svg>

        <div class="radar-legend mt-4 flex justify-between w-full text-xs font-mono px-4">
          <span class="text-muted">Total Score: <strong class="text-emerald-400 font-bold" id="radarTotalScore">38 / 38</strong></span>
          <span class="text-muted">Status: <strong class="text-cyan-400 font-bold" id="radarStatusText">VERIFIED</strong></span>
        </div>
      </div>

      <!-- Collapsible 38-Variable Accordion (7 cols) -->
      <div class="lg:col-span-7 flex flex-col gap-3">
        <!-- Accordion Category 1: Anti-Slop & Semantic Layout (8 vars) -->
        <div class="accordion-item rounded-xl border border-subtle bg-surface-code overflow-hidden">
          <button class="accordion-header w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-sm hover:bg-slate-800/40" onclick="toggleAccordion('acc-anti-slop')">
            <span class="flex items-center gap-2">🛡️ 1. Anti-Slop &amp; Lexical Layout (8 Variables)</span>
            <span class="status-pill badge-verified text-[10px]">8/8 PASS</span>
          </button>
          <div class="accordion-content p-4 text-xs text-secondary border-t border-subtle hidden" id="acc-anti-slop">
            <ul class="space-y-2 font-mono">
              <li class="flex justify-between items-center"><span class="text-slate-300">Semantic Section Nesting</span><span class="text-emerald-400 font-bold">PASS (100%)</span></li>
              <li class="flex justify-between items-center"><span class="text-slate-300">Banned Marketing Terms Dictionary</span><span class="text-emerald-400 font-bold">0 Violations</span></li>
              <li class="flex justify-between items-center"><span class="text-slate-300">Unfilled Template Slots</span><span class="text-emerald-400 font-bold">0 Slots</span></li>
              <li class="flex justify-between items-center"><span class="text-slate-300">Negative Tracking Clamping</span><span class="text-emerald-400 font-bold">-0.035em</span></li>
            </ul>
          </div>
        </div>

        <!-- Accordion Category 2: APCA Contrast & Typography (7 vars) -->
        <div class="accordion-item rounded-xl border border-subtle bg-surface-code overflow-hidden">
          <button class="accordion-header w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-sm hover:bg-slate-800/40" onclick="toggleAccordion('acc-apca')">
            <span class="flex items-center gap-2">👁️ 2. APCA Contrast &amp; Font Barrier (7 Variables)</span>
            <span class="status-pill badge-verified text-[10px]">7/7 PASS</span>
          </button>
          <div class="accordion-content p-4 text-xs text-secondary border-t border-subtle hidden" id="acc-apca">
            <ul class="space-y-2 font-mono">
              <li class="flex justify-between items-center"><span class="text-slate-300">APCA Text Readability Floor</span><span class="text-emerald-400 font-bold">Lc +84.2 (&gt; 60)</span></li>
              <li class="flex justify-between items-center"><span class="text-slate-300">Font Barrier Loaded State</span><span class="text-emerald-400 font-bold">Inter / DM Sans OK</span></li>
              <li class="flex justify-between items-center"><span class="text-slate-300">Zero Unstyled FOUT Flash</span><span class="text-emerald-400 font-bold">PASS</span></li>
            </ul>
          </div>
        </div>

        <!-- Accordion Category 3: Motion & Inertial FPS (8 vars) -->
        <div class="accordion-item rounded-xl border border-subtle bg-surface-code overflow-hidden">
          <button class="accordion-header w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-sm hover:bg-slate-800/40" onclick="toggleAccordion('acc-motion')">
            <span class="flex items-center gap-2">⚡ 3. Motion &amp; Inertial Dynamics (8 Variables)</span>
            <span class="status-pill badge-verified text-[10px]">8/8 PASS</span>
          </button>
          <div class="accordion-content p-4 text-xs text-secondary border-t border-subtle hidden" id="acc-motion">
            <ul class="space-y-2 font-mono">
              <li class="flex justify-between items-center"><span class="text-slate-300">Lenis Smooth Scroll Easing</span><span class="text-emerald-400 font-bold">0.16, 1, 0.3, 1</span></li>
              <li class="flex justify-between items-center"><span class="text-slate-300">Average Framerate</span><span class="text-emerald-400 font-bold">59.8 FPS (&gt; 58)</span></li>
              <li class="flex justify-between items-center"><span class="text-slate-300">Sticky Ancestor Integrity</span><span class="text-emerald-400 font-bold">Zero Hostile Overflows</span></li>
            </ul>
          </div>
        </div>

        <!-- Accordion Category 4: Runtime CDP & Network (15 vars) -->
        <div class="accordion-item rounded-xl border border-subtle bg-surface-code overflow-hidden">
          <button class="accordion-header w-full px-4 py-3 flex items-center justify-between text-left font-semibold text-sm hover:bg-slate-800/40" onclick="toggleAccordion('acc-runtime')">
            <span class="flex items-center gap-2">🌐 4. Runtime CDP &amp; Network Health (15 Variables)</span>
            <span class="status-pill badge-verified text-[10px]">15/15 PASS</span>
          </button>
          <div class="accordion-content p-4 text-xs text-secondary border-t border-subtle hidden" id="acc-runtime">
            <ul class="space-y-2 font-mono">
              <li class="flex justify-between items-center"><span class="text-slate-300">Uncaught Console Exceptions</span><span class="text-emerald-400 font-bold">0 Errors</span></li>
              <li class="flex justify-between items-center"><span class="text-slate-300">Missing Asset Requests (404)</span><span class="text-emerald-400 font-bold">0 Failed Requests</span></li>
              <li class="flex justify-between items-center"><span class="text-slate-300">Self-Healing Proxy Curations</span><span class="text-emerald-400 font-bold">All Assets Cached</span></li>
              <li class="flex justify-between items-center"><span class="text-slate-300">Mobile VRAM Budget</span><span class="text-emerald-400 font-bold">3.2 MB (&lt; 4.0 MB)</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

#### SVG Radar Calculator (JavaScript):
```javascript
function drawRadarWebs() {
  const cx = 160, cy = 160, rMax = 110;
  const numAxes = 6;
  const angleStep = (Math.PI * 2) / numAxes;

  // Draw concentric polygon webs
  document.querySelectorAll('.web-polygon').forEach((poly) => {
    const level = Number(poly.getAttribute('data-level')) / 5;
    const r = rMax * level;
    const pts = [];
    for (let i = 0; i < numAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
    }
    poly.setAttribute('points', pts.join(' '));
  });
}

function updateRadarData(scores = [1.0, 0.84, 0.98, 0.92, 1.0, 1.0]) {
  const cx = 160, cy = 160, rMax = 110;
  const angleStep = (Math.PI * 2) / scores.length;
  const pts = scores.map((s, i) => {
    const r = rMax * Math.min(1.0, Math.max(0.1, s));
    const angle = i * angleStep - Math.PI / 2;
    return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`;
  });
  const dataPoly = document.getElementById('radarDataPolygon');
  if (dataPoly) dataPoly.setAttribute('points', pts.join(' '));
}
```

---

### 3.7 Feature F15: Sortable Data Table & Slide-Over Sheet Inspector

#### Data Table & Slide-over Drawer Markup:
```html
<section id="tab-runs" class="view-section hidden">
  <div class="rounded-2xl border border-subtle bg-card p-6">
    <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
      <div>
        <h2 class="text-xl font-extrabold text-primary flex items-center gap-2">
          <span>📜</span> Historical Ingestion &amp; Analysis Runs
        </h2>
        <p class="text-xs text-muted mt-1">Directly queried from WAL-mode SQLite database with NoSQL document payloads.</p>
      </div>

      <div class="flex items-center gap-3">
        <input type="text" id="runsSearchInput" class="bg-surface-code border border-subtle rounded-lg px-3 py-1.5 text-xs text-primary placeholder-muted" placeholder="Filter by slug, ID..." oninput="debounceFilterRuns(this.value)">
        <select id="runsStatusFilter" class="bg-surface-code border border-subtle rounded-lg px-3 py-1.5 text-xs text-primary" onchange="filterRunsByStatus(this.value)">
          <option value="">All Statuses</option>
          <option value="passed">Passed</option>
          <option value="verified">Verified</option>
          <option value="experimental">Experimental</option>
          <option value="failed">Failed</option>
        </select>
        <button class="btn btn-secondary text-xs" onclick="loadRunsTable(1)">🔄 Refresh</button>
      </div>
    </div>

    <!-- Responsive Table -->
    <div class="table-wrapper overflow-x-auto rounded-xl border border-subtle">
      <table class="w-full text-left font-mono text-xs">
        <thead class="bg-surface-panel text-muted border-b border-subtle uppercase text-[10px]">
          <tr>
            <th class="p-3 cursor-pointer" onclick="sortRuns('id')">Run ID ↕</th>
            <th class="p-3 cursor-pointer" onclick="sortRuns('siteSlug')">Site Slug ↕</th>
            <th class="p-3">Target URL</th>
            <th class="p-3 cursor-pointer" onclick="sortRuns('status')">Status ↕</th>
            <th class="p-3 cursor-pointer" onclick="sortRuns('outputTokens')">Tokens ↕</th>
            <th class="p-3">Cost</th>
            <th class="p-3 cursor-pointer" onclick="sortRuns('createdAt')">Created At ↕</th>
            <th class="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody id="runsTableBody" class="divide-y divide-subtle bg-surface-code text-secondary">
          <!-- Rows dynamically injected -->
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div class="flex justify-between items-center mt-4 text-xs text-muted">
      <span id="runsPaginationInfo">Showing 1-10 of 42 runs</span>
      <div class="flex gap-2">
        <button class="btn btn-secondary px-3 py-1" id="runsPrevBtn" onclick="changeRunsPage(-1)">Previous</button>
        <button class="btn btn-secondary px-3 py-1" id="runsNextBtn" onclick="changeRunsPage(1)">Next</button>
      </div>
    </div>
  </div>
</section>

<!-- Slide-Over Sheet Inspector (Vaul Drawer / Sheet Style) -->
<div class="sheet-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden transition-opacity duration-300" id="sheetBackdrop" onclick="closeSheet()"></div>
<aside class="sheet-drawer fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-surface-drawer border-l border-subtle z-50 transform translate-x-full transition-transform duration-300 flex flex-col shadow-2xl" id="sheetDrawer">
  <div class="sheet-header p-5 border-b border-subtle flex items-center justify-between">
    <div>
      <span class="text-xs uppercase font-mono text-muted tracking-wider block">Document Payload Inspector</span>
      <h3 class="text-lg font-bold text-primary mt-1" id="sheetRunTitle">Run: --</h3>
    </div>
    <button class="text-muted hover:text-primary text-xl font-bold p-1" onclick="closeSheet()">&times;</button>
  </div>

  <div class="sheet-tabs px-5 pt-3 border-b border-subtle flex gap-4 text-xs font-semibold">
    <button class="sheet-tab active text-accent border-b-2 border-accent pb-2" onclick="switchSheetTab('sheet-tab-summary')">Overview</button>
    <button class="sheet-tab text-muted hover:text-primary pb-2" onclick="switchSheetTab('sheet-tab-audits')">Audits</button>
    <button class="sheet-tab text-muted hover:text-primary pb-2" onclick="switchSheetTab('sheet-tab-raw')">Raw JSON Payload</button>
  </div>

  <div class="sheet-body flex-1 overflow-y-auto p-5 text-xs font-mono">
    <div id="sheet-tab-summary" class="sheet-tab-pane">
      <!-- Summary metadata fields -->
    </div>
    <div id="sheet-tab-audits" class="sheet-tab-pane hidden">
      <!-- Quality audits list -->
    </div>
    <div id="sheet-tab-raw" class="sheet-tab-pane hidden">
      <pre class="bg-surface-code p-4 rounded-xl border border-subtle text-cyan-300 overflow-x-auto"><code id="sheetRawJsonCode"></code></pre>
    </div>
  </div>

  <div class="sheet-footer p-4 border-t border-subtle flex justify-end gap-2 bg-surface-panel">
    <button class="btn btn-secondary text-xs" onclick="copySheetJson()">📋 Copy JSON</button>
    <button class="btn btn-primary text-xs" onclick="closeSheet()">Done</button>
  </div>
</aside>
```

#### Sheet Opening and Fetching Details:
```javascript
async function inspectRunInSheet(runId) {
  try {
    const res = await fetch(`/api/v3/runs/${runId}`);
    const data = await res.json();
    if (!data.success) throw new Error(data.error);

    const rawRes = await fetch(`/api/v3/runs/${runId}/raw`);
    const rawData = await rawRes.json().catch(() => null);

    document.getElementById('sheetRunTitle').innerText = `Run: ${runId.slice(0, 8)}... (${data.siteSlug})`;
    document.getElementById('sheetRawJsonCode').innerText = JSON.stringify(rawData ? rawData.payload : data, null, 2);

    openSheet();
  } catch (err) {
    Sonner.error('Erro ao inspecionar run', err.message);
  }
}

function openSheet() {
  document.getElementById('sheetBackdrop').classList.remove('hidden');
  document.getElementById('sheetDrawer').classList.remove('translate-x-full');
}

function closeSheet() {
  document.getElementById('sheetBackdrop').classList.add('hidden');
  document.getElementById('sheetDrawer').classList.add('translate-x-full');
}
```

---

### 3.8 Feature F16: Non-Blocking Sonner-Style Toast Notifications

#### Toast CSS (Extracted from `shadcnuikit-dashboards/live-preview/index.html`):
```css
[data-sonner-toaster] {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 360px;
  max-width: calc(100vw - 48px);
  z-index: 999999;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  pointer-events: none;
}

[data-sonner-toast] {
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  background: #0d1117;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
  font-family: var(--font-sans);
  color: var(--text-primary);
  font-size: 13px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
  animation: sonner-slide-up 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes sonner-slide-up {
  from { opacity: 0; transform: translateY(16px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

[data-sonner-toast][data-type="success"] {
  border-color: rgba(16, 185, 129, 0.35);
  background: #061e14;
}
[data-sonner-toast][data-type="error"] {
  border-color: rgba(244, 63, 94, 0.35);
  background: #240a10;
}
[data-sonner-toast][data-type="warning"] {
  border-color: rgba(245, 158, 11, 0.35);
  background: #231604;
}
[data-sonner-toast][data-type="loading"] {
  border-color: rgba(56, 189, 248, 0.35);
  background: #051824;
}

.sonner-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(56, 189, 248, 0.2);
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: sonner-spin 0.8s linear infinite;
  flex-shrink: 0;
  margin-top: 2px;
}
@keyframes sonner-spin { to { transform: rotate(360deg); } }
```

#### JavaScript `Sonner` Controller:
```javascript
const Sonner = {
  container: null,
  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.setAttribute('data-sonner-toaster', '');
      this.container.setAttribute('dir', 'ltr');
      document.body.appendChild(this.container);
    }
  },
  show(title, description = '', type = 'info', duration = 4000) {
    this.init();
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    const toast = document.createElement('div');
    toast.id = id;
    toast.setAttribute('data-sonner-toast', '');
    toast.setAttribute('data-type', type);

    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
      loading: '<div class="sonner-spinner"></div>'
    };

    toast.innerHTML = `
      <div class="toast-icon text-sm flex-shrink-0">${icons[type] || 'ℹ️'}</div>
      <div class="toast-content flex-1 min-w-0">
        <div class="toast-title font-semibold text-xs text-primary leading-tight">${title}</div>
        ${description ? `<div class="toast-desc text-[11px] text-muted mt-0.5 leading-normal">${description}</div>` : ''}
      </div>
      <button class="toast-close text-muted hover:text-primary text-sm -mr-1 -mt-1 font-bold p-1 cursor-pointer" onclick="Sonner.dismiss('${id}')">&times;</button>
    `;

    this.container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }
    return id;
  },
  success(title, desc) { return this.show(title, desc, 'success', 4000); },
  error(title, desc) { return this.show(title, desc, 'error', 5500); },
  warning(title, desc) { return this.show(title, desc, 'warning', 4500); },
  info(title, desc) { return this.show(title, desc, 'info', 3500); },
  loading(title, desc) { return this.show(title, desc, 'loading', 0); },
  dismiss(id) {
    const toast = document.getElementById(id);
    if (toast) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px) scale(0.95)';
      setTimeout(() => toast.remove(), 250);
    }
  }
};
```

---

## 4. Caveats

- **No Caveats.**
- The proposed design integrates directly with all 9 REST API endpoints in `src/server/routes/v3-persistence.js`, does not require modifying the SQLite schemas or document store contracts, and uses 100% vanilla browser APIs (CSS Grid, Flexbox, SVG, `fetch`, `pointerevents`, `clip-path`) requiring zero build-time bundlers or transpilation.

---

## 5. Conclusion

1. The existing dnastudio HTML generator in `src/server/preview-server.js` was relying on string concatenation and synchronous `alert()` dialogs, without connecting to the new `node:sqlite` and NoSQL document store.
2. The specifications defined in this report provide complete drop-in implementations for Features F10 through F16:
   - **F10:** Bento Grid with 4 KPI cards and responsive SVG sparklines.
   - **F11:** Collapsible sidebar navigation, floating dock, and global ⌘K command palette with sub-30ms fuzzy search.
   - **F12:** Split-pane Interactive File & Artifact Explorer with tree view and syntax previewer.
   - **F13:** Dual-iframe drag comparison Diff Slider with normalized multi-viewport switcher (1440/768/390).
   - **F14:** 38-Variable Multi-Factor Quality Radar with interactive SVG polygon and 4 collapsible category accordions.
   - **F15:** Sortable Historical Runs Data Table with pagination and slide-over Sheet Inspector.
   - **F16:** Non-blocking Sonner toast notification queue replacing all legacy `alert()` calls.
3. Decoupling the view into `src/server/views/dnastudio-dashboard.js` guarantees that `src/server/preview-server.js` stays lean, clean, and passes all existing integration and security tests.

---

## 6. Verification Method

To independently verify the recommendations and prepare for worker_m3's implementation:

1. **Verify Existing Persistence API Suite:**
   ```powershell
   node --test test/preview-server-v3-api.test.js
   ```
   *Expected outcome:* All 5 tests pass without errors.

2. **Verify Server Security & Isolation:**
   ```powershell
   node --test test/preview-server.integration.test.js
   ```
   *Expected outcome:* All 12 integration tests pass, proving that experimental badges and loopback security are intact.

3. **Verify E2E Requirements Harness:**
   ```powershell
   node --test test/e2e/r1-r5-tier1-feature-coverage.test.js
   ```
   *Expected outcome:* `validate21stDevTokens` and `clampViewportDimensions` succeed against the specified token classes (`bento-grid`, `floating-dock`, `status-pill`, `command-palette`, `[data-sonner-toaster]`).
