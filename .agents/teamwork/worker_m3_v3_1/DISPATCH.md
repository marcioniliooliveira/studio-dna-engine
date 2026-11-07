# Task Assignment: worker_m3_v3_1

## Objective
Implement Milestone 3 (Requirement R2): Modernize dnastudio UI/UX using 21st.dev component patterns, design tokens, and integration with the Milestone 2 hybrid persistence API.

## Mandatory Inputs & References (Read First)
1. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md` (Read completely before starting)
2. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md`
3. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_v3_1\handoff.md` (Architecture, legacy alert removal, test invariants)
4. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_v3_2\handoff.md` (21st.dev Component HTML/CSS/JS specs, Bento ribbon, ⌘K, diff slider, 38-variable visualizer, table sheet, toasts)
5. `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_v3_3\handoff.md` (Persistence API client integration, `window.dnaApi`, file tree resolution)

## File Ownership
- You exclusively own:
  - `src/server/views/dnastudio-dashboard.js` (NEW module exporting `buildDashboardHtml`)
  - `src/server/preview-server.js` (integrate `buildDashboardHtml` from `src/server/views/dnastudio-dashboard.js`)
  - Any new tests verifying dnastudio UI/UX e.g. `test/dnastudio-modern-ui.test.js`
- FORBIDDEN to touch:
  - `copias/` and `clientes/` (strictly immutable reference evidence).
  - Existing persistence engines in `src/persistence/` unless directly fixing an interface mismatch.

## Features to Implement (F10 - F16)
1. **F10: 21st.dev Bento Metric Ribbon**:
   - 4 metric cards: Total Runs, Pass Rate %, Output Tokens, Cost USD.
   - Live data fetched from `/api/v3/analytics/kpi`.
   - Real-time SVG sparklines for trend visualization.
2. **F11: Navigation, Dock & ⌘K Command Palette**:
   - Collapsible sidebar navigation with route badges.
   - Floating dock (`.floating-dock`) with quick action icons.
   - Global ⌘K / Ctrl+K command palette modal with sub-30ms fuzzy search filtering across sites, runs, files, and audits.
3. **F12: Interactive File & Artifact Explorer**:
   - Split-pane layout: tree-view on the left (`/api/v3/files/tree`) with folder expansion and file type icons.
   - Syntax-highlighted code/markdown/JSON previewer on the right (`/api/v3/files/content`).
4. **F13: Visual Before/After Diff Slider**:
   - Interactive drag slider comparing original scraped site (left iframe) vs transmuted client page (right iframe).
   - Viewport switcher (Desktop 1440px, Tablet 768px, Mobile 390px).
5. **F14: 38-Variable Multi-Factor Audit Visualizer**:
   - SVG radar / polar chart for 6 dimensions (Visual, Anti-Slop, Console, Network, Mobile, Performance).
   - Interactive accordion cards detailing each of the 38 quality variables.
6. **F15: Sortable Runs Table & Sheet Inspector**:
   - Filterable data table of historical runs with sorting, search, and pagination.
   - Slide-over sheet drawer (Vaul-style drawer) displaying full JSON document payload (`/api/v3/runs/:runId/raw`).
7. **F16: Non-Blocking Toast Notification System**:
   - Sonner-style non-blocking toast notifications (`window.dnaToast`) with success, error, info, and loading states.
   - ZERO blocking `alert()` or `confirm()` dialogs in dnastudio.

## Critical Test Invariants & Quality Gates
- `Experimental` badge MUST appear on client builds (`assert.match(response.body, /Experimental/);`).
- NO claims of `Producao Isolada`, `ICM Ready`, or `pronto para deploy`.
- Empty state banner `<div class="empty-state-banner">` when 0 clones/clients exist.
- Incomplete artifact warning for corrupted directories.
- Satisfy `validate21stDevTokens` in `test/e2e/r1-r5-harness.js` (`bento-grid`, `floating-dock`, `badge`, `toast`/`sonner`, `command-palette`).
- All existing test suites MUST pass:
  * `node --test test/preview-server.integration.test.js`
  * `node --test test/preview-server-v3-api.test.js`
  * `node --test test/e2e/r1-r5-*.test.js` (54/54 PASS)
  * `npm run test:milestones` (79/79 PASS)
  * `node scripts/audit-syntax.js` (0 syntax errors in source code)

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Completion Criteria & Handoff
Commit your changes to `integration/staging-consolidated-v3` with clear conventional commit message.
Document all executed test commands, outputs, and diffs in `.agents/teamwork/worker_m3_v3_1/handoff.md`.


## 2026-11-06T17:54:14Z
From: 3681faee-2d26-45c9-bfac-1d2032fe9756
Content:
You are worker_m3_v3_1, a Teamwork Worker subagent.
Your working directory is: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_v3_1\

MANDATORY FIRST STEP:
Read c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md completely before writing any code. Do NOT skip this.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

TASK ASSIGNMENT:
Read your detailed task assignment in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_v3_1\DISPATCH.md.
Also read:
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_v3_1\handoff.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_v3_2\handoff.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_v3_3\handoff.md

Implement Milestone 3 (Requirement R2 / Features F10–F16):
1. Extract dashboard generation to `src/server/views/dnastudio-dashboard.js` and integrate cleanly into `src/server/preview-server.js`.
2. Implement 21st.dev component patterns:
   - F10: Bento Metric Ribbon with live `/api/v3/analytics/kpi` and real-time SVG sparklines.
   - F11: Collapsible navigation sidebar, floating dock, and ⌘K Command Palette with fuzzy search.
   - F12: Interactive File & Artifact Explorer (split-pane tree view + code/markdown/json previewer).
   - F13: Visual Before/After Diff Slider with 1440/768/390 viewport switcher.
   - F14: 38-Variable Multi-Factor Audit Visualizer with SVG polar radar chart & accordions.
   - F15: Sortable historical runs table with pagination and slide-over sheet drawer.
   - F16: Non-blocking Sonner toast system replacing all 19 legacy `alert()`/`confirm()` dialogs.
3. Obey all test invariants:
   - `Experimental` badge on client builds.
   - No claims of `Producao Isolada`, `ICM Ready`, or `pronto para deploy`.
   - Empty state banner `<div class="empty-state-banner">` when 0 clones/clients exist.
   - Incomplete artifact warning for corrupted directories.
   - Satisfy `validate21stDevTokens` (`bento-grid`, `floating-dock`, `badge`, `toast`/`sonner`, `command-palette`).
4. Run all test suites and verify:
   - `node --test test/preview-server.integration.test.js`
   - `node --test test/preview-server-v3-api.test.js`
   - `node --test test/e2e/r1-r5-*.test.js` (54/54 PASS)
   - `npm run test:milestones` (79/79 PASS)
   - `node scripts/audit-syntax.js`
5. Commit your work to `integration/staging-consolidated-v3`.
6. Deliver a comprehensive handoff report to `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_v3_1\handoff.md` and send a completion message to your caller.
