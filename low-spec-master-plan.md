# Low-Spec Master Execution Plan

## Goal
Implement and verify all 12 tasks across Blocks A, B, C, and D of the Studio DNA Low-Spec Execution Profile with strict resource containment (100% capacity, zero brute-force rendering, 1 worker Chromium, zero code regression).

## Tasks

### Bloco A — Saneamento de Integridade e Clientes Ativos (Zero Browser)
- [x] Task A1: Saneamento de `design-vault/INDEX.json` e template `op-xy-76-aura-build` → Verify: `node --test test/vault-integrity.test.js` [PASSED]
- [x] Task A2: Purga de resíduos de marca vietnamita e vazamento de idioma em `marcionilio-oliveira` → Verify: `node --test test/transmuter-and-anti-slop.test.js` [PASSED]
- [x] Task A3: Pré-compilação AST de SplitText em `SCALEX` e alinhamento de esqueleto `Jumpflex` → Verify: `node --test test/components/hero-motion.test.js test/components/jumpflex-transmutation.test.js` [PASSED]

### Bloco B — Motores Matemáticos, Físicos e Shader Slicing (100% Node.js Puro)
- [x] Task B1: Decompilador cinemático CDP (`seekAnimations`) e ajuste de curvas de Bézier de Schneider (1990) em `src/kinetic/bezier-fitter.js` → Verify: `node --test test/kinetic/bezier-fitter.test.js test/m1-cdp-decompiler.test.js` [PASSED]
- [x] Task B2: Identificador físico inverso em 3 níveis (Log-Decrement, Prony/Padé e Weak-SINDYc) em `src/physics/inverse-system-id.js` → Verify: `node --test test/physics/inverse-system-id.test.js` [PASSED]
- [x] Task B3: Motor psicofísico APCA (WCAG 3.0) e solucionador analítico de scrim/assets em `src/constraints/contrast.js` → Verify: `node --test test/constraint-engine.test.js` [PASSED]
- [x] Task B4: Decompilador de shaders WebGL (Backward Program Slicing) e otimizador AST GLSL em `src/assets3d/shader-slicer.js` → Verify: `node --test test/assets3d/shader-slicer.test.js test/m3-assets3d-pipeline.test.js` [PASSED]

### Bloco C — Escopo Anelar CSS `@scope`, Ponte Lenis + FSM e Governança V2
- [x] Task C1: Motor de escopo anelar CSS `@scope` (`validateStrictDonutScope` e `buildScopedPreludes`) em `src/compiler/kinetic-grammar-schema.js` → Verify: `node --test test/m4-compiler-dualstack.test.js test/challenger-adversarial-m5.test.js` [PASSED]
- [x] Task C2: Ponte determinística Lenis + Micro-FSM e barramento `window.__DNA_TELEMETRY__` em `src/fsm/core/connect.js` → Verify: `node --test test/m2-fsm-forms.test.js` [PASSED]
- [x] Task C3: Matriz de captura single-browser (`workers: 1`), crítica visual calibrada e loop de refinamento limitado em `src/qa/` e `src/orchestration/` → Verify: `node --test test/visual-critic-and-refinement.test.js` [PASSED]

### Bloco D — Calibração Cinética do WorkStage 3D e Workbench Time-Warp
- [x] Task D1: Fechamento matemático da Gap Matrix (System A vs. System B) no `WorkStage` 3D (Gaps 1 a 5) → Verify: `npx playwright test tests/e2e/work-stage.spec.ts --workers=1` [PASSED]
- [x] Task D2: Rota de Component Workbench isolado e executor `npm run test:low-spec` (`scripts/run-low-spec-gate.js`) → Verify: `node --test test/server-security.test.js test/preview-server.integration.test.js && npm run test:low-spec` [PASSED]

## Done When
- [x] All 12 tasks pass their unit DoD command sequentially with zero skips or loosened tolerances.
- [x] No global un-isolated test suites executed during iteration.
- [x] `npm run test:low-spec` executes cleanly in $<2\text{ s}$ and $<100\text{ MB}$ RAM on Node.js puro.
- [x] Browser tests execute strictly with `--workers=1` without leaks or hangs.

## Notes & Invariants
- Contrato operacional: zero escrita em `copias/` (somente leitura).
- Isolamento estrito de cliente: `clientScope` respeitado em `clientes/<slug>/`.
- TDD Red-Green-Refactor: cada tarefa deve ter falha inicial comprovada antes do código de produção.
- Limite de 3 tentativas por tarefa antes de invocar `human_review_required`.
