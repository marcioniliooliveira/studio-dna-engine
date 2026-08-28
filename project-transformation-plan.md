# Plano de Transformação — Studio DNA PRO

## Objetivo

Transformar o protótipo atual em uma fábrica de sites segura, reproduzível e orientada por ICM, na qual a IA planeja dentro de contexto controlado, scripts determinísticos constroem o artefato e gates independentes comprovam o resultado.

## Princípios de execução

- O estado atual é `experimental`, não `production-ready`.
- Runtime e artefatos de teste prevalecem sobre documentação e mensagens de sucesso.
- `copias/` permanece imutável; todo processamento gera derivados.
- Cada cliente lê apenas seu próprio DNA, conteúdo e decisões.
- A IA produz análises e specs estruturadas; não reescreve o HTML final livremente.
- Nenhuma etapa obrigatória pode falhar silenciosamente.
- Cada mudança relevante usa branch dedicada, diff pequeno e evidência de verificação.

## Plano de ação

- [x] **1. Estabelecer baseline e protocolo de verdade:** corrigida a nomenclatura de ICM, registrado estado real e claims em `PROJECT_STATUS.md` e regras em `AGENTS.md`. **Evidência:** `PROJECT_STATUS.md` e `AGENTS.md` ativos.
- [x] **2. Fechar riscos P0 do preview:** loopback `127.0.0.1`, `src/server/security.js` com contenção de path traversal, bloqueio de SSRF, restrição de CORS e autorização de mutações. **Evidência:** 14 testes de segurança em `test/server-security.test.js` e `test/remote-asset-security.test.js`.
- [x] **3. Recuperar reprodutibilidade e falha explícita:** versionado lockfile, `npm test` nativo (`node --test`), runner fail-closed em `src/pipeline/pipeline-runner.js`. **Evidência:** 35 testes automatizados passando em `npm test`.
- [x] **4. Implementar a camada ICM:** criados `ICM.md`, `icm/CONTEXT.md`, `icm/_core/contracts.js`, `icm/_core/context-router.js` e guias dos 5 estágios em `icm/stages/`. **Evidência:** testes de isolamento e anti-slop em `test/icm-context-router.test.js`.
- [x] **5. Reestruturar o Vault:** criado índice pesquisável e tipado `design-vault/INDEX.json`, separando evidence, patterns e production templates com schemas e provenance. **Evidência:** testes de integridade em `test/vault-integrity.test.js`.
- [x] **6. Construir o pipeline determinístico de transmutação:** representação intermediária `composition-spec.json`, manifesto de build `build-manifest.json` com hashes SHA-256 e motor idempotente em `src/pipeline/transmuter.js`. **Evidência:** testes de idempotência e hashes em `test/transmuter-and-anti-slop.test.js`.
- [x] **7. Tornar anti-slop um gate executável:** gate rigoroso em `src/qa/anti-slop-gate.js` validando resíduos de marcas originais, meta-linguagem de IA, placeholders, slots não preenchidos e estouro de budget de caracteres ($\pm 15\%$). **Evidência:** testes de bloqueio em `test/transmuter-and-anti-slop.test.js`.
- [x] **8. Unificar QA, preview e produção:** testar o mesmo artefato imutável; implementado `UnifiedQualityGate` em `src/qa/unified-quality-gate.js` cobrindo Console Gate (0 JS errors), Network Gate (0 404/500), Structural Gate (0 imagens quebradas, contagem de seções) e Anti-Slop Gate com captura de golden screenshot. **Evidência:** 43 testes automatizados passando em `npm test` (`test/unified-quality-gate.test.js`).
- [x] **9. Consolidar e certificar um piloto:** executado o fluxo completo ponta a ponta dos 5 estágios ICM no piloto `piloto-elyse-luxe` através de `scripts/build-and-certify-pilot.js`. O artefato gerou `build-manifest.json` com hash SHA-256 e foi auditado pelo `UnifiedQualityGate` com status `verified`. **Evidência:** `clientes/piloto-elyse-luxe/linter-report.json` com `status: "verified"`, 0 erros JS, 0 requests falhos, 0 imagens quebradas e 0 violações anti-slop.

## Dependências e ordem crítica

`Baseline → Segurança/Reprodutibilidade → ICM → Vault → Transmutação → Anti-slop/QA → Piloto`

Todas as 9 etapas críticas foram executadas e verificadas com testes automatizados e evidências em runtime.

## Posição esperada

| Marco | Posição do projeto |
|---|---|
| Inicial | Protótipo R&D promissor, com baixa confiança operacional |
| Atual (Pós 1–9) | **Fábrica determinística com ICM, Design Vault governado, Anti-Slop Gate executável e Piloto 100% Certificado (`verified`)** |

## Concluído quando

- [x] Um clone limpo reproduz o piloto sem conhecimento informal da sessão anterior (`scripts/build-and-certify-pilot.js`).
- [x] Toda decisão criativa da IA está registrada em spec (`brand-spec.json`, `DNA.md`, `content-slots.json`) e pode ser revisada antes do build.
- [x] Toda transformação mecânica é determinística, rastreável e idempotente (`src/pipeline/transmuter.js` + `build-manifest.json`).
- [x] Nenhum gate depende da autodeclaração do agente que implementou a mudança (`UnifiedQualityGate` executa Playwright independente).
- [x] “Production” é um estado calculado por evidências, não uma descrição manual (`linter-report.json`).
