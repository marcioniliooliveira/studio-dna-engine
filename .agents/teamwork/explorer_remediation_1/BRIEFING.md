# BRIEFING — 2026-10-17T17:36:30Z

## Mission
Investigar a causa-raiz do GPU stall (ReadPixels) e timeout no Gate 6 decorrente de re-renders síncronos no React Three.js (`WorkStage.tsx`) acionados por GSAP `onUpdate` em `initHorizontalScroll.LNLCK81L.js`, e projetar solução cirúrgica de desacoplamento imperativo.

## 🔒 My Identity
- Archetype: explorer
- Roles: [investigation, synthesis, remediation analysis]
- Working directory: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_remediation_1
- Original parent: 7d651584-5b92-4d58-9690-9e50523cc287
- Milestone: Remediation Iteration 2 (GPU Stall & React State Decoupling)

## 🔒 Key Constraints
- Read-only investigation — do NOT implement directly in source files
- Label findings according to truth protocol (observed, inferred, documented, unverified)
- Only write within c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_remediation_1
- Must communicate via send_message to parent 7d651584-5b92-4d58-9690-9e50523cc287

## Current Parent
- Conversation ID: 7d651584-5b92-4d58-9690-9e50523cc287
- Updated: 2026-10-17T17:36:30Z

## Investigation State
- **Explored paths**:
  - `ORIGINAL_REQUEST.md`, `orchestrator_6/PROJECT.md`, `GATE_STATUS.md`, `DEAD_ENDS.md`
  - `auditor_m1_1/handoff.md`, `auditor_m1_1/report.md`
  - `reviewer_m1_2/handoff.md`, `reviewer_m1_2/report.md`
  - `src/components/WorkStage/WorkStage.tsx`, `FloorGrid.tsx`, `RibbonCard.tsx`, `mount.tsx`
  - `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`
  - `clientes/marcionilio-oliveira/site/assets/_astro/lenis.UMZrGmQz.js`
  - `clientes/marcionilio-oliveira/site/assets/_astro/index.astro_astro_type_script_index_0_lang.FpIfv3r_.js`
  - `tests/e2e/work-stage.spec.ts`, `tests/e2e/challenger-viewport.spec.ts`, `tests/e2e/diagnostic-hang.spec.ts`
- **Key findings**:
  - Causa do GPU Stall: Reconciliação síncrona do React via `setPortalProgress` e `setPhase` em cada tick de scroll (13.724 chamadas em uma travessia), forçando o Chromium a emitir `glReadPixels` para sincronizar camadas DOM com WebGL.
  - Causa da perda de velocidade no Gate 3: O Lenis revertia o scroll para 0 após `window.scrollTo` não sincronizado, regredindo $pp$ para 0 e travando o listener de wheel.
  - Causa do bug mobile: `document.querySelector('[data-more-work-rect]')` selecionava o elemento desktop com `hidden md:flex` (0x0px) em vez de `[data-more-work-mobile-rect]`.
  - Causa do timeout no Challenger Viewport: Montagem assíncrona do `WorkStage` sobrescrevia a telemetria com 0.0 se o teste já tivesse avançado para 1.0.
- **Unexplored areas**: Nenhuma pendente dentro do escopo de remediação.

## Key Decisions Made
- Desacoplar completamente `portalProgress` do `useState` do React, mantendo-o apenas em `portalProgressRef` e na telemetria `window.__WORK_STAGE__`.
- Atualizar `FloorGrid.tsx` e `RibbonCard.tsx` nativamente em seus loops `useFrame` via `window.__WORK_STAGE__`.
- Sincronizar o contêiner de proxies DOM imperativamente via `ref`, eliminando re-renders de botões.
- Sincronizar o Lenis via `window.lenis.scrollTo(tgt, { immediate: true })` em saltos de teste.
- Adequar seletor mobile com base em `window.matchMedia('(max-width: 767px)').matches`.

## Artifact Index
- `DISPATCH.md` — Mensagem de ativação do orchestrator
- `BRIEFING.md` — Memória persistente de trabalho
- `progress.md` — Liveness heartbeat
- `report.md` — Relatório técnico aprofundado com diffs cirúrgicos propostos
- `handoff.md` — Handoff formal de 5 componentes
