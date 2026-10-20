## 2026-10-15T19:43:00Z
You are the Project Orchestrator (orchestrator_4).
Your working directory is: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_4
The project root is: c:\Users\wd\Documents\playwright-scraper
Authoritative user request: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (read the latest entry from 2026-10-15T19:42:30Z).

Your objective:
Lead the end-to-end implementation and verification of merging and consolidating with mathematical and deterministic rigor the section "THE WORK" for client `marcionilio-oliveira` with the WebGL 3D spatial engine for project presentation and detailed view (Card-to-Sheet) inspired by `jesperlandberg-com`, using React Three Fiber, Drei, GSAP, and strict TDD validation via Playwright and Vitest.

Strict adherence to Guidelines & Hard Guardrails:
1. Sem <ScrollControls>: O scroll da página é controlado pelo Lenis e GSAP ScrollTrigger (initHorizontalScroll.LNLCK81L.js). Nunca injetar um segundo controlador de scroll no R3F.
2. Equações GLSL Intactas: Preservar a física de deformação dos shaders (sheetShape, sheetShapeSlope, sheetWind, sheetDome, leanRamp, leanSlope, sheetLit, uvCover, roundedBox).
3. Contrato de Dados e Tokens: Exclusivamente os 4 projetos (evo-money, plant-tag, swisshaus, betahaus) e tokens de cor de referenceData.ts.
4. Header Lateral Astro: O painel de detalhe deve conter data-work-detail-panel, data-header-bg="#FAF9F6", data-header-text="#2E2B28" e data-header-border="#b8b3ac", com cobertura física do header para ativação determinística em headerTheme.BVy9gA6p.js.
5. Telemetria Global: Manter window.__WORK_STAGE__ sincronizado a cada frame com fase, cards, u_sheetP, u_hover, u_white, u_shade, u_scrim, u_sheetV e u_alpha.

Requirements:
- R1. Fita 3D com Física de Scroll e Resposta Tátil (Gate 3)
- R2. Voo Espacial Card-to-Sheet e Visão Detalhada (Gate 4)
- R3. Fecho do Detalhe e Restauração da Fita (Gate 5)

Acceptance Criteria (must achieve 100% green exit code 0):
- Gate 1: npx vitest run src/components/WorkStage/__tests__/math.spec.ts (7/7 tests pass)
- Gate 2: npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"
- Gate 3: npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"
- Gate 4: npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"
- Gate 5: npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 5"
