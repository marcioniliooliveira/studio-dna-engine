# Relatório R02 — Efetividade, Cobertura e Mutation Testing

> **Run ID:** `audit-20261023-eixo-a-foundation`  
> **Status:** `observed`  
> **Data de Coleta:** 2026-10-23T16:10:42Z  
> **Mutation Score no Núcleo de Orquestração:** **0.0% (0/3 mutantes mortos — 3 sobreviveram)**  

---

## 1. Pergunta Empírica

> Os testes detectam defeitos reais ou apenas confirmam caminhos felizes?

---

## 2. Cobertura Estrutural de Código (`node --experimental-test-coverage`)

Execução nos módulos canônicos de orquestração e contratos (`task-contract-v2.js`, `task-contract.js`, `workflow-orchestrator.js`):

| Módulo | Linhas (%) | Branches (%) | Funções (%) | Trechos Críticos Descobertos |
|---|---|---|---|---|
| `src/orchestration/task-contract-v2.js` | 97.31% | 90.51% | 100.00% | Linhas 47-48, 50-51 |
| `src/orchestration/task-contract.js` | 100.00% | 74.29% | 100.00% | Branches de erro não exercitadas |
| `src/orchestration/blueprint.js` | 96.67% | **53.62%** | 100.00% | 46.38% das decisões lógicas não testadas |
| `src/orchestration/executor-adapter.js` | 70.91% | **57.89%** | 100.00% | Linhas 33-48 (Tratamento de falhas e retentativas) |
| `src/orchestration/execution-ledger.js` | **51.79%** | **50.88%** | 55.56% | Linhas 115-142, 145-163 (Rollback e recuperação) |
| `src/orchestration/dag-scheduler.js` | **49.32%** | **45.16%** | 58.33% | **Linhas 10-37 (`pathsIntersect`), 39-51 (`getTaskWriteLocks`), 53-63 (`tasksConflict`)** |
| **Média Geral dos Módulos** | **81.07%** | **75.37%** | **91.03%** | **Lacunas graves em concorrência e isolamento** |

---

## 3. O Ponto Cego do `dag-scheduler.js`

A cobertura revelou que, embora o arquivo `dag-scheduler.js` tenha 49.32% de linhas exercitadas:
- A função `pathsIntersect` teve **0% de execução real**.
- A função `getTaskWriteLocks` teve **0% de execução real**.
- A função `tasksConflict` teve **0% de execução real**.

Ou seja: o mecanismo de bloqueio de escritas concorrentes do orquestrador **nunca foi chamado** pelos testes da suíte ativa!

---

## 4. Mutation Testing Controlado (`mutation-report.json`)

Para comprovar se a suíte detecta defeitos reais, introduzimos mutações deliberadas no código de produção e reexecutamos os testes:

| ID Mutante | Módulo Alvo | Mutação Injetada | Resultado | Status |
|---|---|---|---|---|
| `MUT-01-DAG-LOCKS` | `src/orchestration/dag-scheduler.js` | `pathsIntersect(p1, p2) { return false; }` | Testes continuam passando | **SURVIVED (0/1)** |
| `MUT-02-DAG-CONFLICTS` | `src/orchestration/dag-scheduler.js` | `tasksConflict(taskA, taskB) { return false; }` | Testes continuam passando | **SURVIVED (0/1)** |
| `MUT-03-BLUEPRINT-CYCLES` | `src/orchestration/blueprint.js` | Desativação da detecção de ciclos no grafo DAG | Testes continuam passando | **SURVIVED (0/1)** |

### Conclusão de Efetividade:
**Mutation Score = 0.0%**.  
A suíte ativa confirmava apenas o "caminho feliz" (blueprints sem conflito de locks e grafos lineares simples), falhando totalmente em detectar a neutralização de travas de concorrência ou loops infinitos de dependência.

---

## 5. Análise de Estabilidade e Flakiness (`flakiness.csv`)

Execução repetida (5 repetições consecutivas) sob o mesmo ambiente:
- **Taxa de Passagem:** 100% (5/5).
- **Variação de Duração:** 98ms – 105ms (desvio padrão < 3ms).
- **Conclusão:** As suítes unitárias puras de contratos são altamente determinísticas e não apresentam flakiness intrínseco.

---

## 6. Evidências Vinculadas

- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/mutation-report.json`
- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/surviving-mutants.json`
- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/flakiness.csv`
