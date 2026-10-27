# Backlog de Correções e Remediação Empírica

> **Derivado da Auditoria:** `audit-20261023-eixo-a-foundation`  
> **Priorização:** P0 (Bloqueadores de Segurança e CI) → P1 (Efetividade de Testes) → P2 (Dependências e Fixtures)  

---

## 1. Prioridade P0 — Bloqueadores de Segurança e Orquestração

### REM-001: Trava Criptográfica e Autenticação de Identidade em `bin/orchestrator.js`
- **Problema Observado (`SEC-005`):** O comando `approve` permite aprovar qualquer run sem verificar quem está chamando, qual o commit SHA e se os hashes de artefatos batem com os gerados.
- **Remediação Obrigatória:**
  - Exigir assinatura/identidade autorizada do aprovador (`--actor <id>`).
  - Validar que `run.status === 'verified'` antes de permitir `approved`.
  - Recalcular os hashes SHA-256 dos artefatos em disco e exigir correspondência com `run.artifactHash`.
  - Gravar `approval-audit.jsonl` com timestamp e assinatura do revisor independente.

### REM-002: Correção de Interseção de Caminhos e Locks em `dag-scheduler.js`
- **Problema Observado (`SEC-001`, `SEC-002`):** `pathsIntersect` falha em conflito pasta vs arquivo (ex: `src/components` vs `src/components/button.js`) e não normaliza caminhos com `..`.
- **Remediação Obrigatória:**
  - Reescrever `pathsIntersect` utilizando `path.resolve` / `path.normalize`.
  - Tratar qualquer escrita em diretório pai como colisão mandatória com seus filhos.
  - Alinhar nomes de campos: unificar `writeAllowlist` entre `blueprint.js` e `dag-scheduler.js`, eliminando chaves legadas `writes` e `writeLocks`.

### REM-003: Alinhamento Contratual entre `blueprint.js` e `task-contract-v2.js`
- **Problema Observado (`SEC-003`):** `validateBlueprint` aceita tarefas sem contratos V2.
- **Remediação Obrigatória:**
  - Fazer `validateBlueprint` invocar obrigatoriamente `validateTaskContractV2` para cada tarefa da lista, herdando as políticas globais do blueprint (`workspaceRoot`, `clientScope`, `networkPolicy`).

---

## 2. Prioridade P1 — Saneamento do Pipeline de CI e Descoberta de Testes

### REM-004: Resgate das 77 Suítes Órfãs
- **Problema Observado:** 71.3% das suítes de teste (incluindo testes de DAG, governança, shaders e física) não são executadas por nenhum script `npm`.
- **Remediação Obrigatória:**
  - Criar um test runner abrangente ou particionado:
    - `npm run test:unit` (todos os testes puros em `test/*.test.js`, sem dependência de browser).
    - `npm run test:e2e` (testes Playwright isolados com fixtures sintéticas).
    - `npm run test:security` (testes de contratos, locks e auditoria).

### REM-005: Eliminação de Dependências de Clones Locais em Testes E2E
- **Problema Observado:** `test/e2e/chat-orb-pipeline.test.js` falha em clean checkouts porque busca arquivos em `copias/useplanes-com/`, ignorados no `.gitignore`.
- **Remediação Obrigatória:**
  - Mover fixtures necessárias para testes para a pasta versionada `test/fixtures/`.
  - Testes NUNCA devem assumir que a pasta `copias/` possui dumps pesados locais.

---

## 3. Prioridade P2 — Atualização de Dependências Vulneráveis

### REM-006: Remediação de Vulnerabilidades `npm audit`
- **Problema Observado:** 9 vulnerabilidades (1 crítica em `proxy-addr`, 3 altas em `undici`, `fast-uri` e `@modelcontextprotocol/sdk`).
- **Remediação Obrigatória:**
  - Atualizar dependências diretas e resolver árvores transitivas via `npm update` / overrides no `package.json`.
