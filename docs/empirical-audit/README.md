# Dossiê de Pesquisa e Certificação Empírica — Studio DNA Engine

> **Run ID Oficial:** `audit-20261023-eixo-a-foundation`  
> **Repositório:** `marcioniliooliveira/studio-dna-engine`  
> **Branch Auditada:** `integration/v2-dna-orchestrator`  
> **Commit SHA:** `3c4aabf5b470ed275a95ff8a731fce9d6ea37b19`  
> **Data:** 2026-10-23  
> **Veredito Global:** `EXPERIMENTAL` — **Promoção para Produção Bloqueada**  
> **Documento de Delegação Operacional:** [STUDIO_DNA_DELEGACAO_AUDITORIA_EMPIRICA_TEAMWORK (1).md](file:///c:/Users/USER/Downloads/STUDIO_DNA_DELEGACAO_AUDITORIA_EMPIRICA_TEAMWORK%20%281%29.md)

---

## 1. Visão Executiva e Evidências Centrais

A presente auditoria empírica implementou o **Protocolo de Pesquisa e Certificação Empírica**, executando baterias de testes em ambiente estritamente isolado e controlado (Worktree Git limpo, Node `v22.23.3`, Windows 11).

O objetivo foi romper com afirmações documentais ou presunções de sucesso e obter **medições reproduzíveis** sobre o estado real de cada mecanismo.

### Principais Medições Observadas (Eixo A):
1. **Instalabilidade Limpa Comprovada (R00):** O sistema instala com sucesso via `npm ci` a partir do lockfile versionado em 26 segundos. O suporte ao `node:sqlite` nativo está plenamente ativo no Node v22.23.3.
2. **Desconexão Massiva na Descoberta de Testes (R01):** Existem **108 arquivos de teste** contendo **991 testes** declarados no repositório. No entanto, o comando oficial de CI (`npm test` / `test:all`) executa apenas **10 arquivos** (9.3%). **56 arquivos de teste estão estritamente órfãos**, sem qualquer vínculo a comandos do `package.json`.
3. **Quebra Imediata da Suíte CI em Checkout Limpo (R01):** A suíte `test:all` falha em clean checkouts porque testes E2E (`test/e2e/chat-orb-pipeline.test.js`) dependem de arquivos locais na pasta `copias/`, que é ignorada pelo `.gitignore` e não reside no controle de versão.
4. **Ponto Cego de Cobertura e Mutation Score Nulo (R04):** A cobertura do módulo `src/orchestration/dag-scheduler.js` é de apenas 49.3%, com **0% de cobertura** nas funções de bloqueio de escrita (`pathsIntersect`, `tasksConflict`). O teste de mutação registrou **Mutation Score = 0.0%** (3 mutantes de concorrência e loops sobreviveram sem que nenhum teste falhasse).
5. **Cinco Vulnerabilidades Adversariais Comprovadas (R16):**
   - **SEC-001 (High):** `dag-scheduler.js` permite escritas concorrentes paralelas quando um caminho é diretório (`src/components`) e outro é arquivo (`src/components/button.js`).
   - **SEC-002 (Medium):** `pathsIntersect` não resolve caminhos com `..`, permitindo concorrência indevida em arquivos equivalentes.
   - **SEC-003 (High):** `blueprint.js` aceita tarefas desprovidas dos contratos estritos de `task-contract-v2.js`.
   - **SEC-004 (High):** `executor-adapter.js` não implementa isolamento de processo ou sandboxing, operando apenas como wrapper de logs.
   - **SEC-005 (Critical):** `bin/orchestrator.js` permite aprovação de execuções sem autenticação de identidade e sem conferência criptográfica dos hashes de artefatos.

---

## 2. As Dez Entregas Canônicas da Auditoria (A até J)

Conforme a Seção 0 e Seção 17 do documento de delegação operacional, a campanha disponibiliza integralmente os dez grupos de artefatos:

| Entrega | Descrição | Arquivo |
|---|---|---|
| **A** | Baseline de Verdade do Sistema de Testes e Reconciliação Epistemológica | [TEST_SYSTEM_TRUTH_BASELINE.md](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/TEST_SYSTEM_TRUTH_BASELINE.md) |
| **B** | Índice Completo de Execuções, Comandos, Provas e Cadeia de Custódia | [EXECUTION_AND_EVIDENCE_INDEX.md](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/EXECUTION_AND_EVIDENCE_INDEX.md) |
| **C** | Relatórios Individuais R00 até R19 (Template Seção 13) | [R00](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R00.md), [R01](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R01.md), [R02](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R02.md), [R03](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R03.md), [R04](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R04.md), [R05](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R05.md), [R06](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R06.md), [R07](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R07.md), [R08](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R08.md), [R09](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R09.md), [R10](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R10.md), [R11](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R11.md), [R12](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R12.md), [R13](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R13.md), [R14](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R14.md), [R15](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R15.md), [R16](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R16.md), [R17](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R17.md), [R18](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R18.md), [R19](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/R19.md) |
| **D** | Matriz de Qualidade de Oráculos e Força das Asserções | [TEST_ORACLE_QUALITY_MATRIX.csv](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/TEST_ORACLE_QUALITY_MATRIX.csv) |
| **E** | Matriz de Rastreabilidade Requisito → Teste → Evidência | [CAPABILITY_TEST_TRACEABILITY.csv](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/CAPABILITY_TEST_TRACEABILITY.csv) |
| **F** | Matriz Formal de Certificação por Capacidade e Dimensões (JSON) | [CAPABILITY_CERTIFICATION_MATRIX.json](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/CAPABILITY_CERTIFICATION_MATRIX.json) |
| **G** | Relatório de Vulnerabilidades Adversariais e Riscos de Segurança | [SECURITY_FINDINGS.md](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/SECURITY_FINDINGS.md) |
| **H** | Conclusões Técnicas, Epistemologia e Limites de Operação | [EMPIRICAL_CONCLUSIONS.md](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/EMPIRICAL_CONCLUSIONS.md) |
| **I** | Backlog Formal de Remediação com Tabela Padronizada de 11 Colunas | [REMEDIATION_BACKLOG.md](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/REMEDIATION_BACKLOG.md) |
| **J** | Pacote Canônico de Evidências, Assinaturas e Checksums SHA-256 | [artifacts/empirical-audit/.../checksums.sha256](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/artifacts/empirical-audit/audit-20261023-eixo-a-foundation/checksums.sha256) e [manifest.json](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/artifacts/empirical-audit/audit-20261023-eixo-a-foundation/manifest.json) |

Também está disponível a compilação unificada monolítica:
- [DOSSIE_CERTIFICACAO_EMPIRICA_COMPLETO.md](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/docs/empirical-audit/DOSSIE_CERTIFICACAO_EMPIRICA_COMPLETO.md)

---

## 3. Pacote Canônico de Evidências Físicas

Todos os logs estruturados em JSON Lines, manifestos e hashes estão arquivados e vinculados criptograficamente em:  
`artifacts/empirical-audit/audit-20261023-eixo-a-foundation/`

- `manifest.json` — Manifesto geral da execução da auditoria.
- `environment.json` — Metadados de hardware, SO, Node, npm e Git.
- `baseline-summary.json` — Resumo do baseline e hashes dos arquivos fundamentais.
- `dependency-audit.json` — Relatório nativo do npm audit com as 9 vulnerabilidades.
- `test-inventory.json` — Registro detalhado de todos os 108 arquivos de teste.
- `ci-coverage-map.csv` — Tabela CSV mapeando suítes para comandos da CI.
- `orphaned-suites.json` — Lista das 56 suítes estritamente órfãs de scripts npm.
- `flakiness.csv` — Resultados das 5 iterações de teste de repetição.
- `mutation-report.json` — Registro da pontuação e execução de mutantes.
- `surviving-mutants.json` — Detalhes dos 3 mutantes sobreviventes.
- `policy-decisions.jsonl` — Envelope universal de decisões de política de segurança.
- `security-findings.json` — Registro estruturado das 5 vulnerabilidades observadas.
- `approval-audit.jsonl` — Log de auditoria da tentativa de forja de aprovação.
- `race-report.json` — Registro de condições de corrida e falha de locks paralelos.
- `checksums.sha256` — Hashes SHA-256 de todos os artefatos gerados.
