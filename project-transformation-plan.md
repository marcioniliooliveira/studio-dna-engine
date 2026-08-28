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

- [ ] **1. Estabelecer baseline e protocolo de verdade:** corrigir a nomenclatura de ICM, separar ICM do pipeline de transmutação, registrar estado real, inventário de clientes e claim-evidence ledger; adicionar regras para agentes em `AGENTS.md`. **Verificar:** nenhuma afirmação de “validado”, “zero erros” ou “produção” permanece sem evidência associada.
- [ ] **2. Fechar riscos P0 do preview:** restringir a `127.0.0.1`, validar containment de paths, separar conteúdo clonado das APIs administrativas, limitar requests/downloads, remover CORS amplo e bloquear SSRF/redes privadas. **Verificar:** testes automatizados de traversal, acesso entre clientes, SSRF e bodies excessivos falham de forma segura.
- [ ] **3. Recuperar reprodutibilidade e falha explícita:** versionar lockfile, fixar Node/Playwright, criar `npm test`, corrigir CI e retornar estados `success|partial|failed` com exit codes reais por estágio. **Verificar:** clone limpo executa `npm ci` e CI completa; falha injetada nunca termina com mensagem de sucesso.
- [ ] **4. Implementar a camada ICM:** criar `ICM.md`, `CONTEXT.md`, `_core/` e workspaces numerados com contratos de Inputs, Forbidden Context, Process, Checkpoint, Audit, Outputs e Definition of Done. **Verificar:** um agente novo consegue executar uma etapa sem explorar o repositório inteiro e sem ler outro cliente.
- [ ] **5. Reestruturar o Vault:** separar Evidence Vault imutável, Pattern Vault curado e Production Template Vault; criar índice pesquisável, schemas, provenance, compatibilidade, dependências e processo formal de promoção. **Verificar:** nenhuma referência entra em produção sem card, contratos, golden screenshots e testes; uma tarefa carrega somente as referências selecionadas.
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
