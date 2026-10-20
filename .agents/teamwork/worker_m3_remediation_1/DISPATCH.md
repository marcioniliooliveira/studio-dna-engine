# DISPATCH: worker_m3_remediation_1

## Identity
- Name: worker_m3_remediation_1
- Type: teamwork_preview_worker
- Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_remediation_1

## Authoritative Documents
- Mandatory User Request: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
- Scope Document: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_5\PROJECT.md
- Explorer 1 Report: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_1\handoff.md
- Explorer 2 Report: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_2\handoff.md
- Explorer 3 Report: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_3\handoff.md

## Exclusive File Ownership
You have exclusive write ownership of:
- `clientes/marcionilio-oliveira/site/index.html`
- `src/components/WorkStage/WorkStage.tsx`
- Rebuilding `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` via Vite build.
Do NOT modify any test files or other source files.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Objective & Tasks
Remediate the containing-block displacement causing Gate 4 and Gate 5 failures:

1. **Fix `clientes/marcionilio-oliveira/site/index.html`**:
   - Locate `<div id="work-detail-panel-root">` currently nested inside `<main>` / `data-horizontal-track` (around line 331).
   - Relocate it to be a direct child of `<body>` (e.g., right before `</body>`), completely outside `<main>` and `data-horizontal-track`.
   - Remove duplicate attributes (`data-work-detail-panel=""`, `data-header-bg`, `data-header-text`, `data-header-border`) from the empty container in `index.html` so only the actively rendered React portal bears those attributes, preventing Playwright strict mode duplicate locator collisions.
   - Keep `<div id="work-detail-panel-root"></div>` as the clean mounting target for React `createPortal`.

2. **Verify / Update `src/components/WorkStage/WorkStage.tsx`**:
   - Ensure the detail panel is portaled cleanly to `document.getElementById('work-detail-panel-root')` (or `document.body`), with:
     - `position: fixed`, `inset: 0`, `left: 0`, `top: 0`, `width: '100vw'`, `height: '100vh'`, `zIndex: 120`.
     - Attributes: `data-work-detail-panel=""`, `data-header-bg="#FAF9F6"`, `data-header-text="#2E2B28"`, `data-header-border="#b8b3ac"`.
     - `aria-hidden={activeIndex === null ? 'true' : 'false'}`.
     - Pointer events active when `activeIndex !== null` (`pointerEvents: activeIndex === null ? 'none' : 'auto'`).
     - Close button with `data-detail-close=""` and `data-testid="detail-close-btn"`.

3. **Rebuild Bundle**:
   - Run: `npx vite build --config vite.bundle.config.mjs`
   - Verify `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` is updated.

4. **Verify All 5 Gates**:
   - Gate 1: `npx vitest run src/components/WorkStage/__tests__/math.spec.ts`
   - Gate 2: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"`
   - Gate 3: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"`
   - Gate 4: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"`
   - Gate 5: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 5"`
   - Full Suite: `npx playwright test tests/e2e/work-stage.spec.ts`

5. **Deliver Handoff**:
   - Write comprehensive handoff report to `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_remediation_1\handoff.md`.
   - Notify orchestrator using `send_message`.


## 2026-10-15T20:50:52Z
You are worker_m3_remediation_1. Your working directory is c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_remediation_1.
Read your instructions in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_remediation_1\DISPATCH.md.
MANDATORY: Read c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md before doing any work.
Read Explorer reports:
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_1\handoff.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_2\handoff.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_3\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your task:
1. In clientes/marcionilio-oliveira/site/index.html, relocate <div id="work-detail-panel-root"> from inside <main> / data-horizontal-track to be a direct child of <body> (right before </body>). Remove redundant attributes (data-work-detail-panel="", data-header-bg, etc.) from the empty container so only the active React portal bears them.
2. In src/components/WorkStage/WorkStage.tsx, verify detail panel portaling to document.getElementById('work-detail-panel-root') (or document.body) with left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 120, aria-hidden, pointer events, and close button.
3. Rebuild bundle: npx vite build --config vite.bundle.config.mjs.
4. Run and verify all 5 gates:
   - npx vitest run src/components/WorkStage/__tests__/math.spec.ts
   - npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"
   - npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"
   - npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"
   - npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 5"
   - npx playwright test tests/e2e/work-stage.spec.ts
5. Write your complete handoff report to c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_remediation_1\handoff.md and notify me via send_message.
