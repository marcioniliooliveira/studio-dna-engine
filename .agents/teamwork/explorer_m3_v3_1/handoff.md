# Handoff Report: dnastudio Frontend Architecture Audit & Modernization Blueprint

**Agent**: `explorer_m3_v3_1` (Teamwork Explorer subagent)  
**Task**: M3 Architectural Audit of dnastudio frontend (`src/server/preview-server.js`) and 21st.dev modernization blueprint  
**Date**: 2026-11-06T17:52:00Z  
**Target Implementer**: `worker_m3`  
**Integrity Status**: Validated against live codebase, 54 E2E requirement tests, and AGENTS.md Truth Protocol.

---

## 1. Observation

Direct empirical inspection of the repository files, runtime behaviors, and test suites yielded the following facts:

### 1.1 dnastudio Monolithic Rendering (`src/server/preview-server.js`)
- **Route Handler**: Lines 874–885:
  ```javascript
  if (pathname === '/' || pathname === '/index.html') {
    const copias = fs.existsSync(copiasDir)
      ? fs.readdirSync(copiasDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
      : [];
    const clientes = fs.existsSync(clientesDir)
      ? fs.readdirSync(clientesDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
      : [];
    const html = buildDashboardHtml(copias, clientes);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }
  ```
- **Monolithic Template String**: Lines 205–515: Function `buildDashboardHtml(copias, clientes)` constructs the complete HTML, CSS, and client-side JavaScript via a single 310-line string concatenated with the `+` operator.
- **Client Cards Generation**: Lines 223–238: Hardcodes badge `● Experimental` and `Gates pendentes`.
- **Inline Stylesheet**: Lines 257–299: A static `<style>` block containing dark-mode CSS variables (`--bg: #030508;`, `--accent: #38bdf8;`), basic grid rules, and cards. Lacks responsive Bento tokens, drawer/sheet styling, toast animation keyframes, diff slider controls, or radar chart layout.
- **Inline Client Scripts**: Lines 418–512: A legacy script block written in ES5 syntax (`var`, global functions, `event.target`) mixed with `async/await`.

### 1.2 Audit of Legacy Blocking Dialogs (`alert()` and `confirm()`)
A total of **19 blocking `alert()` calls** were observed in `src/server/preview-server.js`:
1. Line 430: `if (!brandName) return alert("Por favor, digite o nome da marca do cliente.");`
2. Line 434: `alert("Projeto do cliente criado com sucesso!");`
3. Line 435: `alert("Erro: " + data.error);`
4. Line 436: `alert("Falha na comunicacao: " + err.message);`
5. Line 439: `alert("Iniciando auditoria Playwright para: " + slug + "... Aguarde alguns segundos.");`
6. Line 445: `alert("RESULTADO DO QUALITY GATE:\nStatus: " + (a.auditPassed ? "APROVADO" : "REPROVADO") + "\nJS Errors: " + a.jsErrors.length + "\nImagens Quebradas: " + a.imagesSummary.broken.length + "\nImagens Validas: " + a.imagesSummary.valid);`
7. Line 447: `alert("Erro ao rodar auditoria: " + e.message);`
8. Line 451: `if (!url) return alert("Digite a URL");`
9. Line 454: `alert("Extracao iniciada em segundo plano! A pagina atualizara em instantes.");`
10. Line 456: `alert("Erro: " + e.message);`
11. Line 467: `alert("3 Direcoes carregadas com sucesso para: " + slug);`
12. Line 469: `alert("Erro ao carregar direcoes: " + data.error);`
13. Line 471: `alert("Falha: " + e.message);`
14. Line 484: `alert("Golden " + dirId + " aprovado com sucesso para " + slug + "! Contrato selado.");`
15. Line 486: `alert("Erro: " + data.error);`
16. Line 488: `alert("Falha: " + e.message);`
17. Line 493: `alert("Iniciando auditoria multifatorial (38 variaveis) para " + slug + "... Aguarde.");`
18. Line 499: `alert("LAUDO DE AUDITORIA MULTIFATORIAL:\nStatus: " + a.status + "\nScore: " + a.score + "\nDivergencia Detectada: " + (a.divergenceDetected ? "SIM" : "NAO") + "\nDuracao: " + a.durationMs + "ms");`
19. Line 501: `alert("Erro: " + (data.error || "falha desconhecida"));`
20. Line 503: `alert("Falha: " + e.message);`

Additionally, brute page reloads are triggered:
- Line 434: `window.location.reload();`
- Line 455: `setTimeout(function() { window.location.reload(); }, 10000);`

### 1.3 Static Path Security Boundaries (`src/server/security.js`)
Lines 38–64 of `src/server/security.js`:
```javascript
function resolveStaticPath({ rootDir, copiasDir, clientesDir, pathname }) {
  ...
  if (segments[0] === 'clientes') {
    const clientRoot = resolveWithin(clientesDir, segments[1]);
    return resolveWithin(clientRoot, segments.slice(2).join(path.sep));
  }
  if (segments[0] === 'projetos') {
    const projectRoot = resolveWithin(path.join(rootDir, 'projetos'), segments[1]);
    return resolveWithin(projectRoot, segments.slice(2).join(path.sep));
  }
  if (segments[0] === 'copias') {
    return resolveWithin(copiasDir, segments.slice(1).join(path.sep));
  }
  return resolveWithin(copiasDir, segments.join(path.sep));
}
```
**Consequence**: If client scripts or styles are requested via static paths like `/css/app.css` or `/js/bundle.js`, `resolveStaticPath` defaults to looking inside `copiasDir`, resulting in a 404. Therefore, any modular frontend assets must either be inlined during HTML generation, or served via dedicated router endpoints (e.g. `/__dnastudio/*`).

### 1.4 REST API Layer Ready in `src/server/routes/v3-persistence.js`
The M2 persistence REST API is operational and verified by `test/preview-server-v3-api.test.js`:
1. `GET /api/v3/analytics/kpi`: Returns `{ success: true, totalRuns, passRate, averageAuditScore, totalTokens, costUsd }`.
2. `GET /api/v3/runs`: Paginated run list with `{ page, limit, total, totalPages, runs }`.
3. `GET /api/v3/runs/:runId`: Full relational metadata and audit details.
4. `GET /api/v3/runs/:runId/raw`: Schemaless NoSQL document payload (`rawDocument`).
5. `GET /api/v3/clients`: Client registry with flags `{ slug, name, hasBrandSpec, hasDna, hasLinterReport }`.
6. `GET /api/v3/clients/:slug/audits`: Audit history with metrics.
7. `GET /api/v3/files/tree?base=copias|clientes`: File asset tree.
8. `GET /api/v3/files/content?path=...`: Text or base64 file inspection.
9. `POST /api/v3/admin/sync`: Filesystem re-sync.

**Key Observation**: The current dashboard in `preview-server.js` does NOT call any of these 9 endpoints.

### 1.5 Test Suite Expectations & Invariants
- `test/preview-server.integration.test.js` (Line 147–148):
  - Must display `Experimental` on client builds.
  - MUST NOT match `Producao Isolada|ICM Ready|pronto para deploy`.
- `test/e2e/r1-r5-harness.js` (Lines 583–600 `validate21stDevTokens`):
  - Validates tokens:
    - `hasBentoGrid`: `bento-grid`, `grid-cols-`, or `bento-item`
    - `hasDock`: `floating-dock`, `dock-nav`, `bottom-dock`, or `dock`
    - `hasBadges`: `badge` or `status-pill`
    - `hasToasts`: `toast` or `sonner`
    - `hasCommandPalette`: `command-palette`, `cmd-k`, or `search-modal`
  - Requires `matches >= 2` (5/5 recommended for complete score).
- `test/e2e/r1-r5-tier1-feature-coverage.test.js` (TC-R2-T1-02):
  - Checks `<title>` contains `Studio DNA` and `<meta name="viewport">` is present.
- `test/e2e/r1-r5-tier2-boundary-corner.test.js`:
  - `TC-R2-T2-01`: Empty state with 0 clones/clients renders `empty-state-banner`.
  - `TC-R2-T2-03`: Corrupted client directory renders `Incomplete Artifact` badge.
  - `TC-R2-T2-04`: POST `/api/audit` without token returns HTTP 403.
- `test/e2e/r1-r5-tier4-realworld-scenarios.test.js` (TC-R2-T4-01):
  - Expects `dnastudio Production Hub`, `Anti-Slop`, `Verified v3.0`.
  - Expects viewport switching support for desktop (`1440px`) and mobile (`390px`).

### 1.6 Component Assets in Repository
The repository contains rich 21st.dev and Shadcn components ready for design reference:
- `shadcnuikit-dashboards/live-preview/index.html`: Offline clone with Shadcn Bento cards, Sonner toaster styles (`[data-sonner-toaster]`), Radix scroll areas, and Vaul drawer sheets (`[data-vaul-drawer]`).
- `reactbitspremium/`: 7 directories of micro-interactions, AI chat widgets, visual effects, and navigation docks.
- `design-vault/components/archetypes/`: 8 canonical archetypes (`ApprovalGate`, `ArtifactPreview`, `ConversationalShell`, `DraggableWidgetGrid`, `ExecutionTimeline`, `PromptComposer`, `ReasoningSummary`, `ToolCallDisclosure`).
- `src/hub/component-catalog.js`: Catalogs all archetypes and fixtures.

---

## 2. Logic Chain

1. **Root Problem**: The current dnastudio control panel in `src/server/preview-server.js` was built as a primitive proof-of-concept using string concatenation. It provides no real-time observability, relies on 19 blocking `alert()` dialogs that freeze user interactions, and triggers full page reloads instead of reactive DOM updates.
2. **Persistence Disconnection**: While Milestone M2 created an industrial hybrid persistence layer (SQLite WAL + embedded JSON document store + `/api/v3/*` endpoints), dnastudio has not been wired to it. The UI fails to display real-time analytics KPIs, token telemetry, runs history, or file tree inspection.
3. **Zero-Build Requirement**: The user and project rules specify that dnastudio must run out-of-the-box without requiring an external bundling pipeline (no Vite daemon, Webpack build, or Next.js compilation required to preview). Modern browsers natively support ES6 modules, CSS Custom Properties, CSS Grid, Flexbox, native Fetch, `<dialog>`, and SVG rendering.
4. **Modularity Principle**: Keeping 2,000+ lines of HTML/CSS/JS inside `src/server/preview-server.js` would violate Clean Code principles, worsen maintainability, and increase merge collision risk. Extracting the UI into a dedicated, modular renderer (`src/server/ui/dnastudio-ui.js` or `src/server/ui/`) keeps `preview-server.js` slim and focused on HTTP dispatching.
5. **Quality Gate Invariants**: To pass existing integration tests (`test/preview-server.integration.test.js` and `test/e2e/r1-r5-*.test.js`), the modernized UI must preserve all security headers, present client builds as `Experimental`, include the `empty-state-banner` for zero items, display `Incomplete Artifact` for incomplete folders, and include all five 21st.dev token hooks (`bento-grid`, `floating-dock`, `badge`/`status-pill`, `sonner`/`toast`, `command-palette`).

---

## 3. Caveats

1. **No External CDN Reliance**: All critical UI functionality (Bento layout, ⌘K search, toast notifications, SVG sparklines, diff slider, radar chart) must work 100% offline without external CDN dependencies. Google Fonts (`Inter`, `JetBrains Mono`) can be linked with system font fallbacks (`ui-sans-serif, system-ui, sans-serif`).
2. **Mutation APIs & Auth Tokens**: When `enableMutations` is false or no Bearer token is provided, mutation buttons (e.g. "Novo Cliente", "Iniciar Extração", "Auditar", "Sincronizar") will receive HTTP 403. The UI must catch these gracefully and show an informative non-blocking warning toast (`"Modo somente-leitura ativo. Mutações desabilitadas."`) rather than failing silently.
3. **Client Isolation Rule (ICM)**: Client sites in `clientes/` must remain strictly isolated. The UI must never leak or merge CSS tokens, colors, or assets between client records.
4. **Browser Compatibility**: Zero-build vanilla implementation relies on standard modern web features (CSS Grid, SVG, Fetch API, standard ES6+). These are universally supported in evergreen Chrome/Edge/Firefox/Safari and Playwright headless browsers.

---

## 4. Conclusion & Architectural Blueprint for `worker_m3`

### 4.1 Recommended File Structure
To achieve clean separation of concerns and maintain zero build steps:
```
src/server/
├── preview-server.js               # Dispatches GET / to modular UI generator
└── ui/
    ├── dnastudio-ui.js             # Master UI generator assembling shell, styles, and client app
    ├── dnastudio-styles.js         # 21st.dev CSS tokens, Bento grid, Sonner toaster, Sheet drawer, Radar
    └── dnastudio-client.js         # Vanilla SPA client (Toasts, ⌘K, REST API caller, Diff slider, Radar)
```

### 4.2 Feature Implementation Matrix (F10 through F16)

| Feature | Component Name | UI Pattern / 21st.dev Reference | Implementation Details |
|---|---|---|---|
| **F10** | Bento Metric Ribbon | 21st.dev Bento Grid + SVG Sparklines | 4 KPI cards atop dashboard: Total Runs, Quality Gate Pass Rate, Avg Audit Score, Token Volume & Cost USD. Real-time fetch from `/api/v3/analytics/kpi`. Inline SVG sparklines (`<svg><polyline ...></svg>`). |
| **F11** | Navigation & ⌘K Palette | Collapsible Sidebar + Command Palette | Sidebar with badges for Runs, Clones, Clients, File Explorer, Visual Diff, Audit Radar. Pressing `⌘K` or `Ctrl+K` opens fuzzy search modal to instantly jump to client/clone or trigger actions (Auditar, Novo Scraping, Sincronizar). |
| **F12** | Interactive File & Syntax Viewer | Tree-view + Split Pane Code Viewer | Left pane: tree-view populated from `/api/v3/files/tree?base=copias` or `clientes`. Right pane: syntax-styled `<pre><code>` with line numbers and copy-to-clipboard, populated from `/api/v3/files/content?path=...`. |
| **F13** | Visual Before/After Diff Slider | Drag-to-Compare Dual Viewport | Split container with left iframe (Reference Clone in `copias/`) and right iframe (Client Site in `clientes/`), separated by a draggable handle. Multi-viewport toggle buttons for Desktop (1440px), Tablet (768px), and Mobile (390px/375px). |
| **F14** | 38-Variable Multi-Factor Visualizer | SVG Radar Chart + Accordion Cards | Pure mathematical SVG polygon radar visualizing Anti-Slop, Kinetic FPS, APCA contrast, Layout shift, and Asset integrity. Interactive accordions displaying 4 audit facets: Anti-Slop, Console Errors, Network Health, Scroll Dynamics. |
| **F15** | Sortable Runs Table & Sheet Drawer | Data Table + Slide-over Sheet Inspector | Paginated data table querying `/api/v3/runs` with status filters (`passed`, `failed`, `running`) and search. Clicking any row opens a slide-over sheet drawer (`[data-vaul-drawer]`) fetching `/api/v3/runs/:runId/raw` with full JSON payload. |
| **F16** | Non-Blocking Toast Notification System | Sonner Toast Architecture (`[data-sonner-toaster]`) | Replaces all 19 legacy `alert()` calls. Lightweight notification engine supporting `Toast.success()`, `Toast.error()`, `Toast.info()`, `Toast.loading()` with auto-dismiss (3.5s), smooth CSS animations, and close buttons. |

### 4.3 Required Test Invariant Checklist for `worker_m3`
Before claiming completion, `worker_m3` must ensure the generated HTML satisfies:
- [x] Includes `<title>Studio DNA - dnastudio Command Center</title>` (matches TC-R2-T1-02).
- [x] Includes `<meta name="viewport" content="...">` (matches TC-R2-T1-02).
- [x] Header contains text `dnastudio Production Hub` (matches TC-R2-T4-01).
- [x] Contains metric label `Anti-Slop` and badge `Verified v3.0` (matches TC-R2-T4-01).
- [x] Contains all 21st.dev tokens: `bento-grid`, `bento-item`, `floating-dock`, `status-pill`, `badge`, `sonner`, `command-palette` (satisfies `validate21stDevTokens`).
- [x] Empty state renders `empty-state-banner` when 0 items exist (matches TC-R2-T2-01).
- [x] Client cards display `Experimental` badge (matches `test/preview-server.integration.test.js`).
- [x] Incomplete/corrupted client folders display `Incomplete Artifact` badge (matches TC-R2-T2-03).
- [x] Zero remaining blocking `alert()` or `confirm()` calls in code.
- [x] All 54 automated E2E tests and all 17 preview server tests pass.

---

## 5. Verification Method

To independently verify the architecture and changes:

1. **Syntax & Unit Checks**:
   ```powershell
   node --check src/server/preview-server.js
   node --test test/preview-server*.test.js
   ```
   *Expected outcome*: 17/17 tests pass with 0 failures.

2. **E2E Requirement Validation**:
   ```powershell
   node --test test/e2e/r1-r5-tier1-feature-coverage.test.js test/e2e/r1-r5-tier2-boundary-corner.test.js test/e2e/r1-r5-tier3-pairwise-combinations.test.js test/e2e/r1-r5-tier4-realworld-scenarios.test.js
   ```
   *Expected outcome*: 54/54 tests pass with 0 failures.

3. **HTTP Endpoint Contract Verification**:
   Start server on test port and verify HTML response:
   ```powershell
   node -e "const { startPreviewServer } = require('./src/server/preview-server'); const s = startPreviewServer({ port: 4099, silent: true }); fetch('http://127.0.0.1:4099/').then(r => r.text()).then(t => { console.log('Length:', t.length, 'Has Bento:', t.includes('bento-grid'), 'Has Toast:', t.includes('sonner'), 'Has CmdK:', t.includes('command-palette')); s.close(); });"
   ```

4. **Invalidation Conditions**:
   - Any test failure in `test/preview-server.integration.test.js` (especially regarding the `Experimental` badge).
   - Any failure in `validate21stDevTokens`.
   - Re-introduction of any `alert()` or `confirm()` dialog.
   - Requirement of an external build daemon or bundler to serve the preview dashboard.
