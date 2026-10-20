## 2026-10-15T20:03:02Z

You are teamwork_preview_worker_m2.
Your working directory is: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m2
Authoritative user request: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (read the section from 2026-10-15T19:42:30Z).
Parent orchestrator conversation ID: d8887735-ed06-4d7f-8ad1-4b456af057d8
Project scope: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_4\PROJECT.md
Exclusive file ownership: src/components/WorkStage/WorkStage.tsx (and vite.bundle.config.mjs if needed).
You must build: clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js via `npx vite build --config vite.bundle.config.mjs`.

DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Task:
Fix the DOM layering, portal architecture, and Astro header detection in `src/components/WorkStage/WorkStage.tsx`:
1. Proxy Buttons Portaling (Fixes Gate 3 hover timeout):
   - Wrap `<div data-work-ribbon-proxies>` in `createPortal(..., document.body)`.
   - Ensure container is `position: fixed; inset: 0; pointer-events: none; z-index: 105;`.
   - The proxy buttons `<button type="button" data-work-card-proxy={index} ...>` must have `pointer-events: auto;`, positioned properly on-screen across the horizontal ribbon (for example centered or matching projected card positions or visible click zones within viewport, e.g. at 1440x900 viewport, spanning visible screen coordinates so `locator.hover()` and `click()` work cleanly).
   - Ensure `[data-work-card-proxy="0"]` is fully within the viewport (e.g. `left: 50%`, `transform: translate(-50%, -50%)` or calculated from ribbon offset, definitely inside [0, 1440] x [0, 900]), and NOT affected by `[data-more-work-rect]`'s 7.7714x CSS scale.
2. Detail Panel Portaling & Astro Header Coverage (Fixes Gate 4):
   - Wrap `<div data-work-detail-panel>` in `createPortal(..., document.body)` with `position: fixed; inset: 0; left: 0; width: 100vw; height: 100vh; z-index: 120;`.
   - Crucial physical coverage: The left edge MUST be `0` (or `left: 0`) so that point `(x = 32px, y = 450px)` (the center of `<header data-intro-header>`) is physically inside `[data-work-detail-panel].getBoundingClientRect()`.
   - Crucial DOM permanence: The element `[data-work-detail-panel]` must exist in the DOM from initial mount so `Header.astro` query selector caching includes it. Use `aria-hidden={activeProject ? 'false' : 'true'}` and CSS opacity / pointer-events toggles rather than conditional unmounting `{activeProject && ...}`.
   - Include exact dataset attributes:
     `data-work-detail-panel=""`
     `data-header-bg="#FAF9F6"`
     `data-header-text="#2E2B28"`
     `data-header-border="#b8b3ac"`
   - Document scroll lock: lock `document.documentElement.style.overflow = 'hidden'` and `document.body.style.overflow = 'hidden'` when detail is active, restore to `''` when closing.
3. Detail Close & Restoration (Fixes Gate 5):
   - Close button `<button type="button" data-detail-close="">` and `window.addEventListener('keydown', onKeyDown)` for `Escape` trigger the closing transition: phase becomes `'DETAIL_CLOSING'`, GSAP transitions restore Card 0 uniforms (`u_sheetP: 1`, `u_white: 0`) and neighbor visibility (`u_alpha: 1`), settling into `'RIBBON_BROWSE'`.
   - Detail panel sets `aria-hidden="true"`, opacity 0, pointer-events none, and document overflow restored.
4. Build & Verify:
   - Run `npx vite build --config vite.bundle.config.mjs` to produce `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.
   - Run Gate 1: `npx vitest run src/components/WorkStage/__tests__/math.spec.ts`.
   - Run Gate 2: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"`.
   - Run Gate 3: `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"`.

Deliver handoff report at: `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_worker_m2\handoff.md`.
Send completion message to orchestrator `d8887735-ed06-4d7f-8ad1-4b456af057d8`.
