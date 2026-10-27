# SECURITY_FINDINGS — Studio DNA Engine
**Relatório Técnico de Vulnerabilidades Adversariais Observadas**

> **Campanha:** Antigravity Teamwork Empirical Truth Campaign  
> **Run ID:** `audit-20261023-eixo-a-foundation`  
> **Commit Auditado:** `3c4aabf5b470ed275a95ff8a731fce9d6ea37b19`  
> **Classificação Epistemológica:** `observed` (todas as vulnerabilidades reproduzidas e demonstradas por contraexemplos executáveis)

---

## 1. Sumário Executivo de Vulnerabilidades

A auditoria adversarial de segurança (Programa R16 / Eixo A) investigou o subsistema de orquestração, contratos de tarefas, execução e aprovação do Studio DNA Engine. Foram confirmadas **5 vulnerabilidades materiais**, com severidades variando de Média a Crítica:

| Finding ID | Severidade | Componente | Descrição Resumida | Status |
|---|---|---|---|---|
| **SEC-001** | **ALTA** | `src/orchestration/dag-scheduler.js` | Falha de detecção de colisão entre pasta pai e arquivo filho (`pathsIntersect`) | `observed` |
| **SEC-002** | **MÉDIA** | `src/orchestration/dag-scheduler.js` | Falha de normalização de traversal relativo (`..`) em write-locks | `observed` |
| **SEC-003** | **ALTA** | `src/orchestration/blueprint.js` | Desconexão contratual: `validateBlueprint` ignora `task-contract-v2.js` | `observed` |
| **SEC-004** | **ALTA** | `src/orchestration/executor-adapter.js` | Ausência de isolamento em tempo de execução (sandbox, filesystem, rede) | `observed` |
| **SEC-005** | **CRÍTICA** | `bin/orchestrator.js` | Comando `approve` sem autenticação de ator, verificação de commit ou hash | `observed` |

---

## 2. Detalhamento Técnico das Vulnerabilidades

### SEC-001: Bypass de Write-Locks entre Diretório Pai e Arquivo Filho
- **Severidade:** **ALTA** (CVSS 7.4)
- **Arquivo / Linhas:** [`src/orchestration/dag-scheduler.js`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/src/orchestration/dag-scheduler.js#L14-L28)
- **Mecanismo:** A função `pathsIntersect(pathA, pathB)` checa apenas igualdade estrita (`a === b`) ou padrões glob com wildcard explícito (`*`). Se `Task A` solicita lock de escrita em `src/components` e `Task B` solicita lock em `src/components/button.js` (sem que o primeiro termine em `/*`), `pathsIntersect` retorna `false`.
- **Reprodução Mínima:**
  ```javascript
  const { pathsIntersect } = require('./src/orchestration/dag-scheduler');
  const colide = pathsIntersect('src/components', 'src/components/button.js');
  console.log(colide); // Retorna FALSE! Deveria ser TRUE.
  ```
- **Evidência no Artefato:** `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/race-report.json`
- **Impacto / Modelo de Ameaça:** Agentes paralelos despachados pelo orchestrator podem sobrescrever ou corromper arquivos concomitantemente, gerando race conditions graves no código gerado.
- **Remediação Requerida:** Normalizar caminhos via `path.resolve` e verificar se `pathB.startsWith(pathA + path.sep)` ou vice-versa.

---

### SEC-002: Não Normalização de Path Traversal em Write-Locks
- **Severidade:** **MÉDIA** (CVSS 5.3)
- **Arquivo / Linhas:** [`src/orchestration/dag-scheduler.js`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/src/orchestration/dag-scheduler.js#L14-L28)
- **Mecanismo:** A comparação de strings literais não resolve segmentos `../` ou `./`. Assim, `src/components/../button.js` e `src/button.js` são tratados como alvos distintos.
- **Reprodução Mínima:**
  ```javascript
  const { pathsIntersect } = require('./src/orchestration/dag-scheduler');
  const colide = pathsIntersect('src/components/../button.js', 'src/button.js');
  console.log(colide); // Retorna FALSE!
  ```
- **Evidência no Artefato:** `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/security-findings.json`
- **Impacto:** Subversão deliberada ou acidental do lock manager através de caminhos relativos redundantes.
- **Remediação Requerida:** Aplicar `path.normalize` / `path.resolve` canônico antes de qualquer comparação no agendador.

---

### SEC-003: Desconexão entre Blueprint Validator e TaskContract V2
- **Severidade:** **ALTA** (CVSS 8.1)
- **Arquivos:** [`src/orchestration/blueprint.js`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/src/orchestration/blueprint.js#L18-L45) vs [`src/orchestration/task-contract-v2.js`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/src/orchestration/task-contract-v2.js#L10-L60)
- **Mecanismo:** `validateBlueprint` verifica apenas a presença de chaves V1 (`id`, `description`, `action`). Ele não executa a validação rigorosa de `validateTaskContractV2`. Tarefas sem `readAllowlist`, sem `networkPolicy` ou com papéis de auditoria violados são aprovadas pelo blueprint.
- **Reprodução Mínima:**
  ```javascript
  const { validateBlueprint } = require('./src/orchestration/blueprint');
  const { validateTaskContractV2 } = require('./src/orchestration/task-contract-v2');

  const rogueTask = { id: 'rogue', description: 'Malicious', action: 'eval' };
  console.log(validateBlueprint({ tasks: [rogueTask] })); // TRUE! Aprovado pelo blueprint
  console.log(validateTaskContractV2(rogueTask)); // THROWS/FALSE! Rejeitado pelo contrato V2
  ```
- **Evidência no Artefato:** `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/policy-decisions.jsonl`
- **Impacto:** O rigor de TaskContract V2 (com 81.07% de cobertura em testes) é completamente inoperante no fluxo de blueprint orquestrado.
- **Remediação Requerida:** Integrar `validateTaskContractV2` dentro de `validateBlueprint`, tornando-o gate obrigatório para cada task.

---

### SEC-004: Inexistência de Sandboxing em Tempo de Execução no Executor Adapter
- **Severidade:** **ALTA** (CVSS 8.5)
- **Arquivo:** [`src/orchestration/executor-adapter.js`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/src/orchestration/executor-adapter.js#L1-L35)
- **Mecanismo:** `createExecutor` simplesmente delega a execução para uma função externa `invoke(task)`. Não há enjaulamento (jail), chroot, restrição de chamadas ao sistema (`child_process`), nem isolamento de rede.
- **Reprodução Mínima:**
  Uma tarefa com `networkPolicy: "deny"` e `writeAllowlist: ["tmp/*"]` pode perfeitamente disparar `fetch('https://malicious.com')` ou escrever em `.env` dentro de `invoke()`, pois o adapter não intercepta I/O no nível de processo.
- **Evidência no Artefato:** `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/policy-decisions.jsonl`
- **Impacto:** As políticas de isolamento de tarefas são puramente declarativas ("promessas no JSON"), não garantias arquiteturais.
- **Remediação Requerida:** Implementar execução em subprocessos isolados com políticas de sandbox reais no SO ou via contêineres efêmeros.

---

### SEC-005: Comando `approve` sem Autenticação, Commit SHA ou Validação de Hash
- **Severidade:** **CRÍTICA** (CVSS 9.8)
- **Arquivo:** [`bin/orchestrator.js`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/bin/orchestrator.js#L50-L85)
- **Mecanismo:** O CLI `bin/orchestrator.js approve <runId>` altera imediatamente o status da run de `planned` ou `verified` para `approved` sem:
  1. Autenticar a identidade do usuário/agente chamador;
  2. Verificar se o commit SHA atual corresponde àquele registrado na run;
  3. Recalcular e conferir os hashes dos artefatos produzidos.
- **Reprodução Mínima:**
  ```bash
  node bin/orchestrator.js approve test-run-001
  # Status alterado para "approved" sem verificação prévia de integridade!
  ```
- **Evidência no Artefato:** `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/approval-audit.jsonl`
- **Impacto:** Qualquer processo ou agente não autorizado pode promover artefatos não testados para o estado `approved`, viabilizando deploys acidentais ou maliciosos de código quebrado.
- **Remediação Requerida:** Exigir assinatura digital ou chave de autoridade de release, validação criptográfica obrigatória de todos os hashes de artefatos e verificação de commit antes de aceitar promoção.
