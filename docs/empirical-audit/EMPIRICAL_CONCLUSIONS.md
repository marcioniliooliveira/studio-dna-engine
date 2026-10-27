# EMPIRICAL_CONCLUSIONS — Studio DNA Engine
**Conclusões Técnicas, Epistemológicas e Limites Operacionais**

> **Campanha:** Antigravity Teamwork Empirical Truth Campaign  
> **Run ID:** `audit-20261023-eixo-a-foundation`  
> **Commit Auditado:** `3c4aabf5b470ed275a95ff8a731fce9d6ea37b19`  
> **Branch de Análise:** `integration/v2-dna-orchestrator`  
> **Data de Fechamento do Eixo A:** 2026-10-23  

---

## 1. O que Sabemos (Fatos Empiricamente Observados)

1. **Reprodutibilidade de Instalação Básica:**
   - O comando `npm ci` executa com sucesso em ambiente Windows limpo em 26 segundos.
   - O Node.js `v22.23.3` suporta nativamente o módulo `node:sqlite` utilizado pelo repositório.
   - O lockfile possui hash SHA-256 verificado: `3c5c55e478e25509127ef9cc2320c4e2728784c8947b735530de6239df3f1a5b`.

2. **Inventário e Descoberta de Testes:**
   - Existem **108 arquivos de teste** totalizando **991 declarações** de teste (`test()` / `it()`).
   - O comando padrão de CI (`npm test`, que invoca `npm run test:all`) executa apenas **10 arquivos de teste** (9.3% do total).
   - Reconciliação do denominador: **56 suítes são estritamente órfãs** (sem qualquer script npm), 21 estão fragmentadas em scripts satélites (`test:v2.5`, `test:components`, `test:stress`, `test:mcp`, `test:workstage`), e 21 são alcançadas por `test:all` ou sub-runners.

3. **Inviabilidade da CI Oficial em Clean Checkout:**
   - O script `npm test` falha com código de saída 1 em checkout limpo devido à dependência rígida de arquivos em `copias/useplanes-com/chat-orb-standalone.html` dentro de `test/e2e/chat-orb-pipeline.test.js`. A pasta `copias/` é ignorada pelo `.gitignore`, quebrando o pipeline imediatamente.

4. **Efetividade e Vulnerabilidade do Agendador DAG:**
   - A cobertura de código do módulo `src/orchestration/dag-scheduler.js` em testes unitários é de 49.32% em linhas, mas funções cruciais de segurança (`pathsIntersect`, `getTaskWriteLocks`, `tasksConflict`) possuem **0% de cobertura**.
   - Três mutantes deliberados aplicados a `dag-scheduler.js` e `blueprint.js` sobreviveram sem que nenhum teste falhasse (**Mutation Score = 0.0%** na amostra).

5. **Falhas Críticas de Segurança na Orquestração:**
   - 5 vulnerabilidades materiais observadas:
     - `SEC-001`: Colisão não detectada entre diretório pai e arquivo filho em write-locks.
     - `SEC-002`: Ausência de normalização de path traversal (`..`).
     - `SEC-003`: `validateBlueprint` aceita tarefas sem contratos V2.
     - `SEC-004`: `executor-adapter.js` não implementa sandboxing de SO/rede.
     - `SEC-005`: `bin/orchestrator.js approve` permite aprovação forjada sem autenticação de identidade ou hash de artefatos.

6. **Mecanismos Técnicos M1–M4:**
   - Os testes unitários dos marcos M1 (descompilador CDP), M2 (cinemática de trajetória), M3 (quantização KTX2/VRAM) e M4 (compilação estática/RSC) passam 100% isoladamente, provando **correção local dos algoritmos matemáticos**, mas não certificam integração com browsers reais.

---

## 2. O que NÃO Sabemos (Limitações e Lacunas)

1. **Fidelidade Visual e Perceptual:**
   - O sistema de Visual Critic (`test/visual-critic-and-refinement.test.js`) utiliza mocks sintéticos de screenshot. Não temos evidências empíricas sobre a fidelidade visual real de layouts, nem calibração com avaliadores humanos cegos.
2. **Desempenho Sob Carga e Dispositivos Fracos:**
   - Não foi executada a bateria R18 de microbenchmarks sob restrição de memória/CPU ou em GPUs integradas/mobile.
3. **Generalização em Holdout Inédito:**
   - A capacidade de transmutação em sites inéditos (R19) não foi testada contra holdout fechado nesta fase.
4. **Resiliência Multi-Browser:**
   - Apenas o Chromium foi configurado no `playwright.config.ts`. O comportamento no WebKit (Safari) e Gecko (Firefox) permanece desconhecido (`NOT_TESTED`).

---

## 3. Contradições com Documentações Anteriores

1. **Alegação de "Zero Erros" ou "Pronto para Produção":**
   - Contraditada pela presença de 9 vulnerabilidades npm (incluindo 1 crítica em `proxy-addr`), 5 vulnerabilidades de orquestração e falha fatal imediata no checkout limpo da CI.
2. **Alegação de 77 Suítes Órfãs sem Qualificação:**
   - Reconciliada: a alegação anterior somava suítes alcançadas por globs e scripts secundários. A contagem precisa é de 56 arquivos estritamente desprovidos de npm script e 10 alcançados pelo gate de CI principal.
3. **Alegação de Suporte a Node 20.x:**
   - O `package.json` declara `"engines": { "node": ">=20" }`, mas o código utiliza `node:sqlite`, que só está disponível de forma nativa e estável no Node 22+. Em Node 20.x limpo, a execução falha.

---

## 4. Tabela de Estados Epistemológicos (Classificação Final)

| Asserção / Mecanismo | Classificação Epistêmica | Fonte / Evidência Principal | Incerteza / Limitação | Próxima Ação Recomendada |
|---|---|---|---|---|
| **Ambiente e Instalação** | `observed` | `artifacts/.../baseline-summary.json` | Testado apenas em Windows 11 x64; Linux/macOS não medidos | Validar matriz em Linux CI runner |
| **Vulnerabilidades de Dependências** | `observed` | `artifacts/.../dependency-audit.json` | 9 advisories confirmados | Atualizar dependências vulneráveis (P2) |
| **Quebra de CI em Clean Checkout** | `observed` | `test/e2e/chat-orb-pipeline.test.js` | Falha determinística por falta de `copias/*` | Mover fixtures para `test/fixtures/` (P0) |
| **Bypass de Locks no DAG** | `observed` | `artifacts/.../race-report.json` | Reproduzido em teste adversarial | Reescrever `pathsIntersect` (P0) |
| **Conexão Blueprint → Contrato V2** | `observed` | `artifacts/.../policy-decisions.jsonl` | `validateBlueprint` aceita V1 | Exigir `validateTaskContractV2` (P0) |
| **Aprovação CLI sem Identidade** | `observed` | `artifacts/.../approval-audit.jsonl` | Promove de `planned` sem chave | Travar CLI com autenticação e hash (P0) |
| **Corretude Algorítmica M1-M4** | `observed` | TAP logs dos testes M1–M4 | Provado em dados sintéticos; não em holdout real | Integrar oráculos de browser real |
| **Visual Critic & Renderização Real** | `unverified` | `test/visual-critic-and-refinement.test.js` | Testes atuais usam screenshots mockados | Executar bateria R14 com Chromium real |
| **Isolamento de Sandbox do SO** | `observed` (ausente) | `src/orchestration/executor-adapter.js` | Não há sandbox; adapter é mero proxy de função | Projetar sandbox efêmero (P0) |
| **Generalização em Sites Inéditos** | `unverified` | Holdout não submetido nesta campanha | Nenhuma mensuração científica recente | Congelar corpus holdout para R19 |

---

## 5. Parecer de Prontidão

O Studio DNA Engine encontra-se no estado de maturidade **EXPERIMENTAL**.  
A promoção para os estágios `candidate`, `verified` ou `production` está formalmente **BLOQUEADA** até o cumprimento integral das metas P0 do Backlog de Remediação.
