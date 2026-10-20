# DISPATCH — Test Writer (Milestone M1)

- Agent: teamwork_preview_test_writer_m1
- Role: E2E Test Writer (Gates 4 & 5)
- Working Directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_test_writer_m1
- Authoritative Request: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
- Scope Document: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_4\PROJECT.md
- Exclusive File Ownership: tests/e2e/work-stage.spec.ts
## 2026-10-15T20:03:02Z

You are teamwork_preview_test_writer_m1.
Your working directory is: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_test_writer_m1
Authoritative user request: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (read the section from 2026-10-15T19:42:30Z).
Parent orchestrator conversation ID: d8887735-ed06-4d7f-8ad1-4b456af057d8
Project scope: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_4\PROJECT.md
Exclusive file ownership: tests/e2e/work-stage.spec.ts

Task:
Implement comprehensive, robust, requirement-driven E2E tests for Gate 4 and Gate 5 in `tests/e2e/work-stage.spec.ts` (appending to the existing file which currently ends at Gate 3):
1. Gate 4 Test (`-g "Gate 4"`):
   - Title: `Gate 4: Voo Espacial Card-to-Sheet e Visão Detalhada` -> `Voo tridimensional do Card 0, descurvatura, fade dos vizinhos e ativação do tema no header Astro`.
   - Setup: Set viewport 1440x900, navigate to site, scroll to portal progress 1.0 using `__TEST_SCROLL_TO_PORTAL_PROGRESS__`, wait for `window.__WORK_STAGE__.phase === 'RIBBON_BROWSE'`.
   - Action: Click proxy button for card 0: `page.locator('[data-work-card-proxy="0"]').click()`.
   - Verify Phase Transitions:
     - Immediate / transient phase: verify phase transitions to `'DETAIL_FLIGHT'`.
     - Settled phase: wait with `page.waitForFunction` (timeout 8000ms) for `window.__WORK_STAGE__.phase === 'DETAIL_ACTIVE'`.
   - Verify Shader Uniforms on Card 0:
     - `cards[0].uniforms.u_sheetP < 0.01` (completely flattened / uncurled sheet).
     - `cards[0].uniforms.u_white > 0.99` (white backing revealed).
     - `cards[0].uniforms.u_shade < 0.01`.
     - `cards[0].uniforms.u_scrim < 0.01`.
   - Verify Neighbor Cards Fade Out:
     - `cards[1].uniforms.u_alpha < 0.01`
     - `cards[2].uniforms.u_alpha < 0.01`
     - `cards[3].uniforms.u_alpha < 0.01`
   - Verify DOM Detail Panel & Accessibility:
     - `page.locator('[data-work-detail-panel]')` is visible (`aria-hidden="false"`, opacity > 0).
     - Title / copy for project `'evo-money'` (e.g. `EVO Money`) is rendered.
   - Verify Astro Header Theme Activation:
     - Header `<header data-intro-header>` styles adopt:
       `--header-bg: #faf9f6` (or `rgb(250, 249, 246)`),
       `--header-text: #2e2b28` (or `rgb(46, 43, 40)`),
       `--header-border: #b8b3ac`.
       (Use `page.waitForFunction` to allow `headerTheme` hit-test to execute).
   - Verify Scroll Lock:
     - `document.documentElement.style.overflow === 'hidden'` and/or `document.body.style.overflow === 'hidden'`.

2. Gate 5 Test (`-g "Gate 5"`):
   - Title: `Gate 5: Fecho do Detalhe e Restauração da Fita` -> `Fecho via botão e Escape, restauração de curvatura, vizinhos e overflow`.
   - Setup: Same navigation and activation into `DETAIL_ACTIVE` as Gate 4.
   - Action Part A (Close button): Click `page.locator('[data-detail-close]')`.
     - Phase transitions: `'DETAIL_CLOSING'` -> `'RIBBON_BROWSE'`.
     - Card 0 restored: `cards[0].uniforms.u_sheetP > 0.99`, `u_white < 0.01`.
     - Neighbor cards restored: `cards[1..3].uniforms.u_alpha > 0.99`.
     - Detail panel closed: `aria-hidden="true"` or opacity 0.
     - Document overflow restored: `document.documentElement.style.overflow === ''` and `document.body.style.overflow === ''`.
   - Action Part B (Escape key): Click proxy 0 to re-open detail, then press `page.keyboard.press('Escape')`.
     - Verify same clean restoration to `'RIBBON_BROWSE'`.

Deliver handoff report at: `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\teamwork_preview_test_writer_m1\handoff.md`.
Send completion message to orchestrator `d8887735-ed06-4d7f-8ad1-4b456af057d8`.
