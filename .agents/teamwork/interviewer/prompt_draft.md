Implementar a iteração do Studio DNA Engine v3.0 executando todas as 8 tarefas atômicas (TASK-V3-01 a TASK-V3-08) do Plano Mestre de Delegação da Fronteira de Pareto, aplicando TDD rigoroso (RED -> GREEN -> REFACTOR) em branch dedicado.

Integrity mode: development

Reference material:
- Plano Mestre: `c:\Users\wd\Downloads\plano_mestre_de_delega_o_v3_0_pareto.md`
- Pesquisa de Engenharia: `gemini_share_content.txt` (https://share.gemini.google/bPlkMcT6HAji)

## Requirements

### R1. Isolamento de Branch e Governança V2 (TASK-V3-01)
Criar e utilizar um branch dedicado (ex.: `feat/pareto-v3-engine`) para a evolução do motor/orquestrador, mantendo o branch `client/silvio-iwata` inalterado. Implementar o TaskContractV2 com validação estrita de escopo de cliente, o PolicyEnforcer com travas de escrita concorrente no DAG Scheduler, e a máquina de estados de promoção com validação de integridade SHA-256 (`experimental` -> `candidate` -> `verified` -> `production`).

### R2. Context Engine MCP e Índice Híbrido SQLite (TASK-V3-02)
Implementar o motor de podagem de contexto (`prune_context_for_task`) reduzindo subárvores DOM e tokens desnecessários para as tarefas de agente UI, o índice híbrido compile-time SQLite (vetor topológico DTFV de 12 dimensões, 7 eixos UX e pesos IDF), e a padronização W3C DTCG com tool MCP para contratos de primitivas.

### R3. Funil de Pareto Níveis 0 e 1 (TASK-V3-03 a TASK-V3-05)
Implementar os dois primeiros níveis determinísticos:
- Nível 0 (<80ms): hooks de IDE (`ide-pre-tool-hook.js` e `ide-post-edit-hook.js`), linter estrito de design tokens com cálculo de distância perceptual Delta E (<2.0) e Wallace CSS Analyzer com suporte a isolamento anelar `@scope`;
- Anti-Slop Mega-Suíte: expansão para 62 regras de anti-padrões Impeccable v4.8, heurísticas de Gestalt UX (proximidade, escala monotônica, CSI, completude FSM), AST hygiene contra erros engolidos e truncamentos, e suporte a `surfaceMode` com `artisticWaivers` vinculados a seletores `data-ds`;
- Nível 1 (<400ms): instrumentação determinística AST de nós estruturais com `data-ds` (xxhash64 de 8 caracteres) e `data-dna-line`, geração do manifesto `.domscribe/manifest.jsonl` com strip na compilação de produção, e verificador delta de estilos computados e AABB em rota isolada.

### R4. Funil de Pareto Níveis 2 e 3 (TASK-V3-06 e TASK-V3-07)
Implementar os níveis visual e de refinamento:
- Nível 2 (~1.5s): matriz de captura determinística em worker único Chromium (3 viewports x esquemas de cor x estados de scroll/interação), auditor Boulder Loop com diff numérico de CSS computado vs spec, atribuição geométrica de linha para vazamentos/colisões e extração automática de `regionCropPairs`;
- Nível 3 e Auto-Refinamento: oráculo visual de fronteira com acionamento condicionado a score determinístico >= 90%, avaliação das 7 dimensões visuais sobre `regionCropPairs`, score final ponderado pela regra 70/30 (70% determinístico + 30% juiz visual), e controlador de auto-refinamento limitado a no máximo 3 tentativas antes de bloquear para revisão humana.

### R5. DNA Live Workbench e Alinhamento do Roadmap (TASK-V3-08)
Implementar a ponte bidirecional Alt+Click no `dev-hud.js` via endpoint `POST /__dna_live_select` e recurso MCP dinâmico `client://{slug}/live-selection`, hot-swap de direções visuais e verbos do Impeccable no workbench ao vivo com registro de assinaturas no ledger, e atualizar o `ROADMAP.md` para os marcos v2.6 a v3.5.

### R6. Desenvolvimento Orientado a Testes (TDD Rigoroso)
Executar cada tarefa através do ciclo estrito RED -> GREEN -> REFACTOR, escrevendo testes com falha antes da implementação de código de produção e assegurando compatibilidade retroativa e isolamento de falhas.

## Acceptance Criteria

### Governança e Contratos (TASK-V3-01)
- [ ] `node --test test/task-contract-v2.test.js test/policy-enforcer.test.js test/orchestrator-isolation.test.js test/promotion-state-machine.test.js` executa e passa 100% dos testes em < 1.5s e < 60 MB de RAM.
- [ ] O PolicyEnforcer bloqueia tentativas de leitura/escrita cross-client e escrita em `copias/` com código de erro correspondente.
- [ ] O DAG Scheduler serializa automaticamente tarefas com interseção não vazia de `writeAllowlist`.

### Context Engine e Tokens (TASK-V3-02)
- [ ] `node --test test/topology-context-pruner.test.js test/dtcg-token-compiler.test.js test/mcp-server.test.js` passa integralmente.
- [ ] A tool MCP `prune_context_for_task` reduz o tamanho de documento HTML/CSS em pelo menos 80% preservando tokens P0.
- [ ] A busca híbrida no índice SQLite DTFV + 7 Eixos UX responde em < 5ms.

### Nível 0 e Anti-Slop (TASK-V3-03 e TASK-V3-04)
- [ ] `node --test test/strict-token-linter.test.js test/wallace-css-analyzer.test.js` passa integralmente.
- [ ] O hook pós-edição de IDE executa em < 80ms bloqueando desvios de token com exit code 2 e indicando linha/token sugerido.
- [ ] `node --test test/m1-impeccable-sanitization.test.js test/ux-structural-heuristics.test.js` passa integralmente validando as 62 regras Impeccable, Gestalt, CSI e suporte a `artisticWaivers` por `data-ds`.

### Nível 1 Delta Verifier (TASK-V3-05)
- [ ] `node --test test/delta-component-verifier.test.js test/ast-injector-resilience.test.js` passa integralmente.
- [ ] A instrumentação gera entradas bidirecionais no `.domscribe/manifest.jsonl` e a verificação delta executa em < 400ms.
- [ ] Os atributos `data-ds` e `data-dna-line` são completamente removidos na compilação de produção.

### Nível 2 Boulder Loop (TASK-V3-06)
- [ ] `node --test test/boulder-visual-matrix.test.js` passa integralmente operando em single-worker Chromium.
- [ ] Gera relatórios com diffs de CSS computado e extrai arquivos `regionCropPairs` para discrepâncias visuais.

### Nível 3 Oráculo Visual e Refinamento (TASK-V3-07)
- [ ] `node --test test/visual-critic-gate.test.js test/refinement-controller.test.js` passa integralmente.
- [ ] O oráculo visual é invocado apenas quando o score determinístico for >= 90%, aplicando a fórmula S_final = 0.70 * S_det + 0.30 * S_vis.
- [ ] O controlador de refinamento interrompe a execução e marca `human_review_required` caso o candidato não atinja aprovação após 3 tentativas.

### DNA Live Workbench e Roadmap (TASK-V3-08)
- [ ] `node --test test/live-workbench-bridge.test.js test/preview-server.integration.test.js` passa integralmente.
- [ ] O endpoint `/__dna_live_select` sincroniza a seleção de elemento com o recurso MCP `client://{slug}/live-selection`.
- [ ] O arquivo `ROADMAP.md` reflete os marcos revisados M5 (v2.6) a M8 (v3.5).
