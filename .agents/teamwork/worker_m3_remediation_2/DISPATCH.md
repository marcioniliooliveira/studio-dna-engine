# DISPATCH: worker_m3_remediation_2

## Identity
- Name: worker_m3_remediation_2
- Type: teamwork_preview_worker
- Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_remediation_2

## Context & Motivation
Predecessor `worker_m3_remediation_1` stalled after 42 minutes. You are spawned as replacement to execute the exact remediation identified by Explorers 2 and 3 and verified by all diagnostics.

## Authoritative Documents
- Mandatory User Request: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
- Scope Document: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_5\PROJECT.md
- Explorer 2 Report: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_2\handoff.md
- Explorer 3 Report: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_3\handoff.md

## Exclusive File Ownership
You have exclusive write ownership of:
- `clientes/marcionilio-oliveira/site/index.html`
- `src/components/WorkStage/WorkStage.tsx`
- Building `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` via Vite.
Do NOT modify test files or other unrelated files.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Precise Action Plan
1. **Fix `clientes/marcionilio-oliveira/site/index.html`**:
   - Check if `<div id="work-detail-panel-root">` is inside `<main>` / `data-horizontal-track` (around line 331).
   - Relocate `<div id="work-detail-panel-root"></div>` to be an immediate child of `<body>` (right before `</body>`), completely outside `<main>` and `data-horizontal-track`.
   - Ensure `<div id="work-detail-panel-root"></div>` has NO duplicate attributes (remove `data-work-detail-panel=""`, `data-header-bg`, `data-header-text`, `data-header-border`) so that only the actively mounted React portal carries them, avoiding strict-mode duplicate locator errors.
2. **Verify `src/components/WorkStage/WorkStage.tsx`**:
   - Verify that the detail panel renders with `left: 0`, `top: 0`, `width: '100vw'`, `height: '100vh'`, `zIndex: 120`, and `data-work-detail-panel=""`, `data-header-bg="#FAF9F6"`, `data-header-text="#2E2B28"`, `data-header-border="#b8b3ac"`.
   - Verify portaling to `document.getElementById('work-detail-panel-root')` (or `document.body` if not found).
   - Verify `aria-hidden={activeIndex === null ? 'true' : 'false'}` and `pointerEvents: activeIndex === null ? 'none' : 'auto'`.
3. **Rebuild bundle**:
   - Run: `npx vite build --config vite.bundle.config.mjs`
4. **Execute all 5 Quality Gates & Full Suite**:
   - Gate 1: `npx vitest run src/components/WorkStage/__tests__/math.spec.ts`
   - Gate 2: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"`
   - Gate 3: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"`
   - Gate 4: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"`
   - Gate 5: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 5"`
   - Full Suite: `npx playwright test tests/e2e/work-stage.spec.ts`
5. **Report**:
   - Write comprehensive report with exact commands and terminal output to `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_remediation_2\handoff.md`.
   - Notify orchestrator using `send_message`.


## 2026-10-15T21:33:02Z
You are worker_m3_remediation_2. Your working directory is c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_remediation_2.
Read your instructions in c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_remediation_2\DISPATCH.md.
MANDATORY: Read c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md before doing any work.
Read Explorer reports:
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_2\handoff.md
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m3_3\handoff.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your task:
1. In clientes/marcionilio-oliveira/site/index.html, relocate <div id="work-detail-panel-root"></div> to be an immediate child of <body> (right before </body>), outside <main> and data-horizontal-track. Strip duplicate attributes from the empty mounting div.
2. In src/components/WorkStage/WorkStage.tsx, verify detail panel portaling to document.getElementById('work-detail-panel-root') (or document.body) with left: 0, top: 0, width: '100vw', height: '100vh', zIndex: 120, data-work-detail-panel="", data-header-bg="#FAF9F6", data-header-text="#2E2B28", data-header-border="#b8b3ac", aria-hidden, pointer events, and close button.
3. Rebuild bundle: npx vite build --config vite.bundle.config.mjs.
4. Run all 5 gates and full suite:
   - npx vitest run src/components/WorkStage/__tests__/math.spec.ts
   - npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"
   - npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"
   - npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"
   - npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 5"
   - npx playwright test tests/e2e/work-stage.spec.ts
5. Write your complete handoff report to c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m3_remediation_2\handoff.md and notify me via send_message.


## 2026-10-15T21:50:21Z
**Context**: Milestone 3 Remediation.
**Content**: Heartbeat check. Please update on your progress: have you relocated `#work-detail-panel-root` in `index.html` and rebuilt the bundle via Vite?
**Action**: Please report your current progress or status.
