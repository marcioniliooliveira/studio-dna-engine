# Relatório R03 — Segurança, Contratos e Orquestração Adversarial

> **Run ID:** `audit-20261023-eixo-a-foundation`  
> **Status:** `observed`  
> **Data de Coleta:** 2026-10-23T16:14:05Z  
> **Vulnerabilidades Críticas Observadas:** 5 descobertas e reproduzidas  

---

## 1. Pergunta Empírica

> Contratos, permissões, locks e aprovações são efetivamente impostos em tempo de execução?

---

## 2. As Quatro Investigações Críticas e Descobertas Adversariais

### 2.1 Desconexão Contratual (`blueprint.js` vs `task-contract-v2.js`)
- **Hipótese:** Tarefas executadas em lote através de um blueprint poderiam contornar os contratos estritos de V2.
- **Evidência Observada (`SEC-003`):**
  - `validateBlueprint` aceita tarefas desprovidas de `workspaceRoot`, `role`, `requiredVerifierRole`, `readAllowlist`, `writeAllowlist` e `networkPolicy`.
  - A mesma tarefa rejeitada expressamente por `validateTaskContractV2` é aceita por `validateBlueprint`.
  - **Severidade:** `HIGH`. Permite a injeção de tarefas legadas ou incompletas no agendador DAG.

---

### 2.2 Falha de Locks e Colisão Concorrente (`dag-scheduler.js`)
- **Hipótese:** Testar se locks impedem conflitos reais, inclusive com caminhos equivalentes, globs e symlinks.
- **Evidência Observada 1 — Burlar Lock por Pasta vs Arquivo (`SEC-001`):**
  - A função `pathsIntersect('src/components', 'src/components/button.js')` retorna `false`.
  - O agendador DAG escalona a Tarefa A (escrevendo em `src/components`) e a Tarefa B (escrevendo em `src/components/button.js`) **no mesmo lote paralelo**.
  - Ocorre condição de corrida real (`race condition`) em tempo de execução.
- **Evidência Observada 2 — Burlar Lock por Path Traversal (`SEC-002`):**
  - `pathsIntersect('src/utils/math.js', 'src/core/../utils/math.js')` retorna `false` porque `normalizePath` não resolve `..`.
  - Duas tarefas escrevendo no mesmo arquivo físico são executadas simultaneamente.
- **Evidência Observada 3 — Incompatibilidade de Nomenclatura:**
  - `dag-scheduler.js` busca `task.writes` e `task.writeLocks`.
  - No entanto, `blueprint.js` proíbe expressamente as chaves `writes` e `writeLocks`, lançando erro caso existam no blueprint!

---

### 2.3 Ausência de Isolamento no Executor (`executor-adapter.js`)
- **Hipótese:** Comprovar se permissões são impostas pelo executor ou pelo isolamento de execução, não apenas declaradas.
- **Evidência Observada (`SEC-004`):**
  - `createExecutor.execute(task)` executa diretamente `await options.invoke(task)`.
  - Não há encapsulamento em container, chroot, isolamento de processo no Node ou interceptação de chamadas ao sistema de arquivos/rede.
  - A função `invoke` fornecida pelo agente pode violar qualquer restrição declarada no contrato sem que o adaptador intervenha.
  - **Severidade:** `HIGH`. As permissões são puramente declarativas no executor adapter.

---

### 2.4 Forja de Aprovação sem Identidade ou Validação de Hash (`bin/orchestrator.js`)
- **Hipótese:** Exigir que a aprovação esteja vinculada a identidade autorizada, commit, artefatos e hashes verificados.
- **Evidência Observada (`SEC-005`):**
  - O comando `node bin/orchestrator.js approve --ledger EXECUTION_LEDGER.json --run <runId>` executa:
    ```javascript
    if (command === 'approve') ledger.updateRun(runId, { status: 'approved' });
    ```
  - **Nenhuma checagem de identidade do chamador é realizada.**
  - **Nenhuma checagem de commit SHA é realizada.**
  - **Nenhuma checagem de hashes de artefatos é realizada.**
  - Uma execução em status `planned` com artefatos `pending` é promovida instantaneamente para `approved`.
  - **Severidade:** `CRITICAL`. Falha estrutural de governança de produto.

---

## 3. Catálogo de Vulnerabilidades (`security-findings.json`)

```json
[
  {
    "finding_id": "SEC-001-DAG-LOCK-DIRECTORY-BYPASS",
    "severity": "HIGH",
    "component": "dag-scheduler.js",
    "status": "observed"
  },
  {
    "finding_id": "SEC-002-DAG-LOCK-TRAVERSAL-EQUIVALENCE",
    "severity": "MEDIUM",
    "component": "dag-scheduler.js",
    "status": "observed"
  },
  {
    "finding_id": "SEC-003-BLUEPRINT-CONTRACT-DISCONNECT",
    "severity": "HIGH",
    "component": "blueprint.js vs task-contract-v2.js",
    "status": "observed"
  },
  {
    "finding_id": "SEC-004-EXECUTOR-NO-RUNTIME-SANDBOX",
    "severity": "HIGH",
    "component": "executor-adapter.js",
    "status": "observed"
  },
  {
    "finding_id": "SEC-005-ORCHESTRATOR-CLI-UNAUTHENTICATED-APPROVAL",
    "severity": "CRITICAL",
    "component": "bin/orchestrator.js",
    "status": "observed"
  }
]
```

---

## 4. Evidências Vinculadas

- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/security-findings.json`
- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/policy-decisions.jsonl`
- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/task-ledger.jsonl`
- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/approval-audit.jsonl`
- `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/race-report.json`
