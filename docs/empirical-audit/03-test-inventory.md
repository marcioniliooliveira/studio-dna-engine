# Relatório R01 — Inventário Real e Descoberta de Testes

> **Run ID:** `audit-20261023-eixo-a-foundation`  
> **Status:** `observed`  
> **Data de Coleta:** 2026-10-23T16:03:20Z  
> **Métrica Chave:** 108 suítes descobertas / 10 executadas na CI padrão (90.7% órfãs da CI principal)  

---

## 1. Pergunta Empírica

> Todas as suítes relevantes são descobertas e executadas pela CI?

## 2. Dados Agregados da Descoberta (`test-inventory.json`)

| Dimensão | Quantidade Medida | Percentual do Total |
|---|---|---|
| **Total de Arquivos de Teste no Repositório** | **108 arquivos** | 100.0% |
| **Total de Testes Unitários/E2E Declarados** | **991 testes** | 100.0% |
| **Suítes Abrangidas por `npm test` (`test:all`)** | **10 arquivos** | **9.3%** |
| **Suítes Cobertas em Outros Scripts npm (`v2.5`, `stress`, etc.)** | **21 arquivos** | 19.4% |
| **Suítes Totalmente Órfãs (Sem Nenhum Script npm)** | **77 arquivos** | **71.3%** |
| **Testes Declarados com `.skip`** | **0 testes** | 0.0% |
| **Testes Declarados com `.todo`** | **0 testes** | 0.0% |

---

## 3. A Desconexão Estrutural da CI (`package.json`)

O script oficial de entrada da CI é:
```json
"test": "npm run test:all",
"test:all": "node --test --test-concurrency=1 test/m1-cdp-decompiler.test.js test/m2-kinetic-trajectory.test.js test/m3-assets3d-pipeline.test.js test/m4-compiler-dualstack.test.js test/e2e/*.test.js"
```

### O que `npm run test:all` realmente executa:
1. `test/m1-cdp-decompiler.test.js` (11 testes - PASS)
2. `test/m2-kinetic-trajectory.test.js` (22 testes - PASS)
3. `test/m3-assets3d-pipeline.test.js` (16 testes - PASS)
4. `test/m4-compiler-dualstack.test.js` (30 testes - PASS)
5. `test/e2e/chat-orb-pipeline.test.js` (5 testes - **FAIL por dependência de clone não versionado**)
6. `test/e2e/tier1-feature-coverage.test.js` (85 testes E2E pesados Playwright)
7. `test/e2e/tier2-boundary-corner.test.js`
8. `test/e2e/tier3-pairwise-combinations.test.js`
9. `test/e2e/tier4-realworld-scenarios.test.js`
10. `test/e2e/useplanes-site-functional.test.js`

---

## 4. O Catálogo de Suítes Órfãs Críticas (`orphaned-suites.json`)

Entre os **77 arquivos órfãos** que nunca são chamados por nenhum comando `npm run ...`, estão os núcleos vitais de segurança, governança e motores de análise:

### Núcleo de Orquestração e Segurança (R03)
- `test/dag-scheduler.test.js` — Escalonamento DAG e locks de concorrência.
- `test/blueprint.test.js` — Validação estrutural de blueprints e ciclos.
- `test/executor-adapter.test.js` — Execução e retentativas de agentes.
- `test/execution-ledger.test.js` — Registro transacional e eventos de auditoria.
- `test/governance-and-sandbox.test.js` — Políticas de sandbox e governança.
- `test/icm-context-router.test.js` — Isolamento de contexto entre clientes.

### Motores de Análise e Física (R04 - R09)
- `test/assets3d/shader-slicer.test.js` — Decomposição e análise de shaders WebGL.
- `test/kinetic/bezier-fitter.test.js` — Inferência de física e curvas de aceleração.
- `test/physics/inverse-system-id.test.js` — Identificação de sistemas dinâmicos.
- `test/dna-ir-schema.test.js` — Validação canônica do schema DNA-IR.
- `test/constraint-engine.test.js` — Motor de restrições determinísticas.
- `test/hud-schema-projection.test.js` — Projeção de interfaces HUD.

---

## 5. Falha de Execução na CI por Falta de Fixture Versionada

No commit limpo, `test/e2e/chat-orb-pipeline.test.js` falha imediatamente com:
```
page.goto: net::ERR_FILE_NOT_FOUND at file:///.../copias/useplanes-com/chat-orb-standalone.html
```
**Causa Raiz:** O arquivo `.gitignore` do repositório ignora `copias/*`. Como a pasta `copias/` não foi versionada no Git, a suíte de testes oficial da CI assume a presença de arquivos locais que não existem em uma instalação limpa.

---

## 6. Evidências Vinculadas

- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/test-inventory.json`
- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/test-discovery.json`
- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/ci-coverage-map.csv`
- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/orphaned-suites.json`
