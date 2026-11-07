# Git Workflow, Merge & Push Governance - AG Kit

> Regras mandatórias para controle de versão, isolamento de escopo (ICM), merge e push no repositório `studio-dna-engine`.

---

## 1. Topologia de Branches

| Branch | Finalidade | Nível de Estabilidade | Política de Escrita |
|---|---|---|---|
| `main` | Código de Produção / Golden Standard auditado. | `verified` / `production` | **Push direto proibido.** Apenas PR via validação total dos Quality Gates. |
| `release/vX.Y` | Estabilização pré-lançamento de versões do motor e clientes auditados. | `candidate` | Apenas cherry-picks de correções críticas. |
| `integration/v2-dna-orchestrator` | Branch tronco de integração contínua para orquestradores e worktrees paralelos. | `candidate` | PRs validados via CI com auto-merge ou merge de orquestrador. |
| `feat/engine-<slug>` | Mudanças no núcleo do compilador, pipeline de transmutação, extratores, MCP e runtime global. | `experimental` | Branches de curta duração (< 3 dias). |
| `client/<client-slug>-<feat>` | Trabalho exclusivo em um cliente isolado (`clientes/<nome>`). | `experimental` | **Isolamento estrito:** Proibido alterar arquivos fora da pasta do cliente correspondente. |
| `qa/<adversarial-suite>` | Testes de estresse, desafios adversariais e auditorias. | `experimental` | Foco em suites de teste em `test/` e `scripts/`. |

---

## 2. Matriz de Organização de Merge

```
┌─────────────────────────────────┐
│     TIPO DE INTEGRAÇÃO          │
├─────────────────────────────────┤
│ feat/*      ──▶  integration    │ ──▶ SQUASH & MERGE (1 commit atômico)
│ client/*    ──▶  integration    │ ──▶ SQUASH & MERGE (Preserva DNA e histórico coeso)
│ integration ──▶  release/*      │ ──▶ REBASE ou MERGE COMMIT (--no-ff para auditoria)
│ release/*   ──▶  main           │ ──▶ FAST-FORWARD ou MERGE COMMIT com TAG GPG
└─────────────────────────────────┘
```

### Regras de Merge:
1. **`feat/*` e `client/*` $\rightarrow$ `integration/*`:**
   - Obrigatório uso de **Squash & Merge**.
   - Compacta micro-commits e tentativas de teste em um único commit atômico com evidências documentadas.
2. **`integration/*` $\rightarrow$ `main`:**
   - Merge Commit formal com `--no-ff` (preservando o marco de release) ou Fast-Forward quando linear.
   - Tag de versão obrigatória (ex: `v2.6.0-verified`).

---

## 3. Governança e Regras de Push

1. **Push Direto Proibido em `main`:**
   - Todas as alterações em `main` devem obrigatoriamente originar-se de PR ou integração testada.
2. **Isolamento de Escopo por Commit (Princípio ICM):**
   - **PROIBIDO** comitar alterações de mais de um cliente no mesmo commit.
   - **PROIBIDO** misturar alterações do núcleo da engine (`src/`) com código específico de cliente (`clientes/`) no mesmo commit.
3. **Formato Conventional Commits Obrigatório:**
   - `feat(engine):` $\rightarrow$ núcleo do sistema (`src/compiler`, `src/pipeline`, `src/extractors`).
   - `feat(client/<slug>):` $\rightarrow$ cliente específico (ex: `feat(client/marcionilio): implementa ribbon 3d`).
   - `test(qa):` $\rightarrow$ suites de teste globais ou testes de estresse.
   - `chore(deps):` $\rightarrow$ atualizações de dependências no `package.json` ou lockfiles.
   - `chore(teamwork):` $\rightarrow$ logs de orquestração formais em `.agents/teamwork/`.
4. **Higiene de Binários e Scratch:**
   - Respeitar estritamente o `.gitignore`.
   - Screenshots de QA (`qa-reports/`, `playwright-report/`) e clones brutos de scrapers (`copias/*`) não devem ser rastreados.
   - Modelos 3D e texturas devem ser validados pela pipeline de compressão KTX2/ASTC antes do commit.

---

## 4. Quality Gates Mandatórios Pré-Merge

Nenhum código pode ser integrado à branch `main` ou `integration` sem a aprovação nos seguintes gates:

1. **Gate Estático:** Validação de sintaxe em todos os arquivos (`node --check`).
2. **Gate de DNA & Anti-Slop:** Testes de idempotência e ausência de resíduos de clone (`test/transmuter-and-anti-slop.test.js`).
3. **Gate de Motor (M1-M4):** Verificação das suites essenciais (`npm run test:milestones`).
4. **Gate de Runtime Real:** Playwright E2E com zero erros no console do navegador e zero requisições quebradas.
