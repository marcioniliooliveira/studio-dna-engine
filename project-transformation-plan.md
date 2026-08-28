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
- [ ] **6. Construir o pipeline determinístico de transmutação:** captura única gera snapshot; adapters tratam frameworks; uma representação intermediária tipada produz `reference-selection.json`, `composition-spec.json` e `build-manifest.json`; remover patches particulares dos motores universais. **Verificar:** o mesmo snapshot + mesmas specs gera hashes equivalentes e nenhuma modificação ocorre em `copias/`.
- [ ] **7. Tornar anti-slop um gate executável:** validar resíduos de marca, placeholders, lorem, idioma, slots, comprimento, tokens DNA, asset ratios, estrutura, motion e contaminação entre clientes; IA fica limitada a schemas de conteúdo, seleção e briefs. **Verificar:** fixtures com cada tipo de slop bloqueiam o build e um cliente nunca recebe tokens ou copy de outro.
- [ ] **8. Unificar QA, preview e produção:** testar o mesmo artefato imutável; implementar console/network gate, visual diff real, structural fingerprint, acessibilidade, reduced motion, responsividade e budgets de performance; HUD apenas em modo dev isolado. **Verificar:** relatório reproduzível contém evidência para cada gate e uma regressão conhecida reprova o pipeline.
- [ ] **9. Consolidar e certificar um piloto:** escolher uma referência principal e um cliente, executar todo o fluxo ICM, corrigir lacunas, consolidar slugs/pastas duplicadas e somente então promover o piloto de `experimental` para `verified` e `production`. **Verificar:** outro agente reproduz o build a partir de clone limpo e os gates passam sem reparos manuais no preview.

## Dependências e ordem crítica

`Baseline → Segurança/Reprodutibilidade → ICM → Vault → Transmutação → Anti-slop/QA → Piloto`

Segurança e reprodutibilidade podem avançar em paralelo. ICM e desenho do Vault também podem avançar em paralelo depois que ownership e nomenclatura forem decididos. Novos clientes não devem ampliar motores universais antes das tarefas 1–3.

## Posição esperada

| Marco | Posição do projeto |
|---|---|
| Atual | Protótipo R&D promissor, com baixa confiança operacional |
| Após 1–3 | Ferramenta segura, reproduzível e honestamente observável |
| Após 4–5 | Sistema ICM interpretável, com contexto e referências governados |
| Após 6–8 | Fábrica determinística com prevenção mensurável de AI slop |
| Após 9 | Production candidate validado em um caminho dourado; pronto para escalar referência por referência |

## Concluído quando

- [ ] Um clone limpo reproduz o piloto sem conhecimento informal da sessão anterior.
- [ ] Toda decisão criativa da IA está registrada em spec e pode ser revisada antes do build.
- [ ] Toda transformação mecânica é determinística, rastreável e idempotente.
- [ ] Nenhum gate depende da autodeclaração do agente que implementou a mudança.
- [ ] “Production” é um estado calculado por evidências, não uma descrição manual.
