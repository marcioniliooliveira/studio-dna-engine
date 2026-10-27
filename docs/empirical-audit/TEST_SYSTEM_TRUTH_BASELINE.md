# TEST_SYSTEM_TRUTH_BASELINE — Studio DNA Engine
**Baseline de Verdade do Sistema de Testes e Reconciliação Epistemológica**

> **Campanha:** Antigravity Teamwork Empirical Truth Campaign  
> **Run ID:** `audit-20261023-eixo-a-foundation`  
> **Commit SHA:** `3c4aabf5b470ed275a95ff8a731fce9d6ea37b19`  
> **Branch de Análise:** `integration/v2-dna-orchestrator`  
> **Data:** 2026-10-23T16:02:42Z a 2026-10-23T16:14:50Z  
> **Ambiente:** Windows 11 (`win32 10.0.26200 x64`), Intel Core 7 240H (16 vCPUs), Node.js `v22.23.3`, npm `10.9.9`  

---

## 1. Reconciliação de Alegações Históricas (LEG-01 a LEG-08)

Conforme a Seção 1.4 do protocolo de delegação, nenhuma alegação prévia foi aceita passivamente. Todas foram confrontadas com o código real e com a execução em ambiente limpo:

| ID | Alegação Histórica | Classificação Anterior | Evidência Medida Nesta Campanha | Status Reconciliado |
|---|---|---|---|---|
| **LEG-01** | 108 arquivos / 991 testes declarados | `DOCUMENTED` | Varredura AST recursiva confirmou **108 arquivos de teste** contendo **991 declarações** `test()` e `it()`. | `observed` |
| **LEG-02** | 77 suítes órfãs (71.3%) | `DOCUMENTED` | **Reconciliação de Denominador:** A contagem bruta de 77 suítes incluía arquivos cobertos por globs de `test:all` (`test/e2e/*.test.js`) e scripts satélites (`v2.5`, `stress`). Excluindo duplicidades de globs, **56 arquivos não possuem qualquer script npm**, 10 estão em `test:all`, e 21 estão fragmentados em scripts secundários. A CI padrão alcança apenas 9.3% dos arquivos. | `observed` |
| **LEG-03** | `npm test` falha por `copias/useplanes-com` | `DOCUMENTED` | Executado em clean worktree: falha fatal com `ERR_FILE_NOT_FOUND` em `chat-orb-standalone.html`. A pasta `copias/*` está no `.gitignore`. | `observed` (`BLOCKED_FIXTURE`) |
| **LEG-04** | Mutation score 0.0% | `DOCUMENTED` | **Amostra Localizada:** 3 mutantes deliberados aplicados a `dag-scheduler.js` e `blueprint.js` sobreviveram integralmente à suíte de testes. Não é score global do motor, mas comprova ponto cego no agendador. | `observed` (amostra local) |
| **LEG-05** | 5 vulnerabilidades na orquestração | `DOCUMENTED` | `SEC-001` (lock pasta/arquivo), `SEC-002` (path traversal `..`), `SEC-003` (blueprint vs V2), `SEC-004` (executor sem sandbox) e `SEC-005` (CLI approval forjável) foram reproduzidas. | `observed` |
| **LEG-06** | 9 vulnerabilidades no npm audit | `DOCUMENTED` | `npm audit --json` confirmou 9 vulnerabilidades: 1 crítica (`proxy-addr`), 3 altas (`@modelcontextprotocol/sdk`, `fast-uri`, `undici`), 5 moderadas. | `observed` |
| **LEG-07** | Marcos M1–M4 aprovados | `DOCUMENTED` | M1 (11 testes), M2 (22 testes), M3 (16 testes) e M4 (30 testes) passam 100% de forma isolada. Não provam integração de ponta a ponta com browsers reais em holdout. | `observed` (unitário) |
| **LEG-08** | Suporte a `node:sqlite` no Node 22 | `DOCUMENTED` | Confirmado no Node `v22.23.3` (`sqlite_available: true`). Registrada incompatibilidade com Node 20.x declarado no `package.json`. | `observed` |

---

## 2. Topologia dos Runners e Ponto de Entrada da CI

O repositório utiliza três runners distintos sem consolidação unificada:
1. **`node:test` (Nativo):** Utilizado nos marcos M1–M4, testes de contratos e testes v2.6.
2. **`playwright` / `@playwright/test`:** Utilizado para testes E2E e captura visual, configurado estritamente para Chromium em `playwright.config.ts`.
3. **`vitest`:** Presente nas dependências para `test:workstage`, operando sobre arquivos TypeScript em `src/components/WorkStage/__tests__/math.spec.ts`.

### O Bloqueio da CI Oficial:
A execução de `npm test` engloba `node --test --test-concurrency=1 test/m1-cdp-decompiler.test.js test/m2-kinetic-trajectory.test.js test/m3-assets3d-pipeline.test.js test/m4-compiler-dualstack.test.js test/e2e/*.test.js`.
- O glob `test/e2e/*.test.js` tenta executar testes que acessam a pasta `copias/`, que não é distribuída via Git.
- **Conclusão:** O gate de CI atual está **quebrado por design** em qualquer máquina limpa que faça checkout do repositório.

---

## 3. Matriz de Estados Epistemológicos da Campanha

```text
[ESTADO DE CERTIFICAÇÃO: NOT_EVALUATED / EXPERIMENTAL]
- Local Correctness: VALIDADO para algoritmos matemáticos (M1-M4)
- Integration: INCONCLUSIVO (falhas em clean checkout e dependência de clones)
- Robustness: VULNERÁVEL (5 falhas de concorrência, contratos e aprovação)
- Generalization: NOT_TESTED (holdout inédito não executado nesta fase)
- Operations: REPROVADO (CI quebrada, testes órfãos, npm audit com 1 crítica)
```
