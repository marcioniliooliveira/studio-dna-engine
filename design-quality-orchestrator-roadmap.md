# Design Quality Orchestrator — Plano de Ação Normativo

> **Para execução por agentes:** usar `superpowers:subagent-driven-development` ou `superpowers:executing-plans`. Nenhuma tarefa pode ser iniciada sem cumprir o contrato, as dependências e o gate de entrada definidos neste documento.

**Objetivo:** implementar um pipeline multiagente que produza sites visualmente fortes a partir de conteúdo verificável, referências licenciadas e direção de arte aprovada, sem permitir escrita concorrente, autocertificação ou promoção sem evidência.

**Arquitetura:** o Orchestrator é um controlador determinístico: valida contratos, reduz contexto, aplica permissões, agenda tarefas, registra hashes e bloqueia promoções. Agentes executam tarefas limitadas por papel e por allowlists de leitura/escrita. Decisões de licença, fatos de cliente, escolha final de direção visual, atualização de baselines e promoção para produção permanecem humanas.

**Stack:** Node.js 20+, CommonJS, Playwright, Zod, JSON Schema, SHA-256 e o ledger existente.

**Especificações de origem:** `AGENTS.md`, `PROJECT_STATUS.md`, `project-transformation-plan.md`, `orchestrator-workflow.md` e este documento.

## 1. Estado atual e risco dominante

### Evidência observada

- `src/orchestration/blueprint.js` valida a forma de `allowedTools` e `allowedGates`, mas não prova que o executor aplique essas permissões.
- `src/orchestration/dag-scheduler.js` executa todos os nós prontos com `Promise.all`, sem declarar ou bloquear conjuntos de escrita sobrepostos.
- `bin/orchestrator.js approve` muda o run para `approved` sem exigir identidade humana, hashes dos artefatos ou relatórios de gate.
- `src/orchestration/workflow-orchestrator.js` exige um callback `verify`, mas não registra nem compara a identidade de builder e verifier.
- O workspace está na maturidade `experimental`; qualquer afirmação de promoção deve continuar fail-closed.

### Falha mais grave

O mesmo fluxo pode gerar, avaliar e aprovar o próprio trabalho enquanto tarefas paralelas alteram o mesmo artefato. Nesse cenário, o ledger registra atividade, mas não garante isolamento, independência nem qualidade visual.

## 2. Regras invariáveis

As palavras **DEVE**, **NÃO DEVE** e **SOMENTE** são normativas.

1. O Orchestrator **NÃO DEVE** criar copy, escolher direção de arte, editar HTML/CSS ou declarar que uma página é bonita.
2. Cada tarefa **DEVE** declarar `readAllowlist`, `writeAllowlist`, `allowedTools`, `networkPolicy`, `maxAttempts`, `timeoutMs`, entradas com hash e saídas esperadas.
3. Uma tarefa sem allowlist completa **DEVE** ser rejeitada antes do dispatch.
4. Duas tarefas com `mutatesWorkspace: true` e caminhos de escrita sobrepostos **NÃO DEVEM** executar em paralelo.
5. `clientScope` **DEVE** limitar todo caminho a `clientes/<clientScope>/`, ao pacote de referência explicitamente selecionado e aos módulos globais nominados no blueprint.
6. `copias/` **DEVE** permanecer somente leitura.
7. O agente builder e o agente verifier **DEVEM** ter `actorId` distintos.
8. Um agente **NÃO DEVE** atualizar sua própria baseline, reduzir um limiar ou remover um teste para obter aprovação.
9. Resultados `partial`, `fallback`, `preview`, `timeout` ou com exceção capturada **NÃO DEVEM** satisfazer dependências.
10. A autocorreção **DEVE** parar após três tentativas. A quarta falha muda o run para `human_review_required`.
11. `verified` **DEVE** estar vinculado ao mesmo SHA-256 do artefato avaliado por todos os gates.
12. `production` **DEVE** exigir aprovação humana autenticada após `verified`; nenhum agente ou comando sem credencial humana pode promovê-lo.

## 3. Divisão de autoridade

| Papel | Pode fazer | Não pode fazer | Saída obrigatória |
|---|---|---|---|
| Orchestrator | Validar contratos; reduzir contexto; despachar; aplicar locks; registrar eventos; calcular estados | Produzir design; editar artefato; interpretar aprovação; ignorar gate | Ledger append-only e estado calculado |
| `reference_researcher` | Ler fontes remotas autorizadas; identificar licença, commit e padrões | Instalar dependências; executar código externo; aprovar licença; copiar página inteira | `reference-candidate.json` |
| `content_analyst` | Estruturar fatos fornecidos; apontar lacunas e conflitos | Inventar claim; preencher lacuna; alterar fonte | `content-evidence.json` |
| `art_direction_agent` | Propor exatamente três direções visuais a partir do pacote aprovado | Escolher a vencedora; editar site; acessar outro cliente | Três `visual-direction.json` válidos |
| `composition_agent` | Converter a direção selecionada em `composition-spec.json` | Escrever HTML/CSS/JS; trocar conteúdo aprovado | Spec validada e hash |
| `implementation_agent` | Materializar uma spec aprovada no conjunto de arquivos declarado | Alterar schema, gate, baseline, outro cliente ou `copias/` | Patch + artefato + manifestos |
| `visual_critic_agent` | Avaliar screenshots por rubrica; localizar falhas | Alterar código; aprovar produção; avaliar o próprio output | `visual-critique.json` |
| `technical_verifier_agent` | Executar comandos exatos e registrar stdout, exit code e hashes | Corrigir falhas; mudar teste ou limiar | `technical-verification.json` |
| Humano — direção de arte | Aprovar referências e escolher uma direção visual | Ser substituído por nota automática | Evento assinado `visual_direction_approved` |
| Humano — release | Aprovar baseline e produção | Aprovar artefato diferente do verificado | Evento assinado `production_approved` |

## 4. Ações seguras para delegação

### Delegação automática permitida

- Pesquisa somente leitura, com domínios e diretórios explicitamente permitidos.
- Extração de metadados de licença e commit sem executar código do repositório pesquisado.
- Estruturação de conteúdo já fornecido, preservando a fonte de cada afirmação.
- Geração de propostas em JSON schema-validado dentro de uma pasta de run isolada.
- Implementação sequencial em branch/worktree dedicada e allowlist de arquivos.
- Renderização de screenshots a partir de artefato local imutável.
- Execução de testes, linters, visual diff e auditorias sem modificar baselines.
- Crítica visual independente, limitada à rubrica e às imagens do mesmo hash.

### Delegação proibida

- Aceitar licença ou decidir que uso comercial é permitido.
- Inventar métricas, depoimentos, certificações, garantias, preços ou fatos de cliente.
- Escolher a direção visual final em nome do cliente.
- Acessar todo o Vault quando existe um `reference-packet.json` selecionado.
- Instalar ou executar código de repositório de referência.
- Alterar secrets, infraestrutura externa, DNS, contas, produção ou permissões.
- Deletar, mover ou sobrescrever `copias/`, evidência, ledger ou artefato aprovado.
- Atualizar screenshot baseline, reduzir threshold ou silenciar teste sem aprovação humana.
- Fazer merge, marcar `production` ou aprovar o próprio trabalho.

## 5. Contrato obrigatório de tarefa V2

Todo nó do DAG **DEVE** conter exatamente estes campos:

```json
{
  "schemaVersion": 2,
  "runId": "design-client-a-20260903-001",
  "clientScope": "client-a",
  "taskId": "T05_BUILD_ARTIFACT",
  "role": "implementation_agent",
  "actorId": "agent-builder-01",
  "dependsOn": ["T04_COMPILE_COMPOSITION"],
  "mutatesWorkspace": true,
  "readAllowlist": [
    "clientes/client-a/composition-spec.json",
    "runs/design-client-a-20260903-001/reference-packet.json"
  ],
  "writeAllowlist": [
    "clientes/client-a/site/**",
    "clientes/client-a/build-manifest.json"
  ],
  "allowedTools": ["read_file", "apply_patch", "shell:npm_test_focused"],
  "allowedGates": ["schema", "client_scope", "artifact_hash"],
  "networkPolicy": "deny",
  "budget": {
    "maxAttempts": 1,
    "timeoutMs": 900000,
    "maxFilesChanged": 30,
    "maxAddedLines": 4000
  },
  "inputs": [
    {
      "path": "clientes/client-a/composition-spec.json",
      "sha256": "sha256:<64-hex>"
    }
  ],
  "requiredOutputs": [
    "clientes/client-a/site/index.html",
    "clientes/client-a/build-manifest.json"
  ],
  "requiredVerifierRole": "technical_verifier_agent"
}
```

Valores contendo `<`, `>`, `TBD`, `TODO`, caminhos absolutos, `..`, drive letters ou glob fora das raízes autorizadas **DEVEM** ser rejeitados pelo validador. O exemplo acima é ilustrativo e **NÃO É** um blueprint executável por conter o marcador de hash.

## 6. DAG operacional sem decisões implícitas

| ID | Responsável | Dependência | Mutação | Gate de saída |
|---|---|---|---:|---|
| `T00_VALIDATE_INTAKE` | Orchestrator | nenhuma | não | Schema válido; fatos obrigatórios presentes; cliente isolado |
| `T01_RESEARCH_REFERENCES` | `reference_researcher` | `T00` | somente pasta do run | Cada fonte tem URL, commit, licença encontrada e `usageStatus: pending_human` |
| `H01_APPROVE_REFERENCES` | Humano | `T01` | evento no ledger | Exatamente 3–5 referências com `usageStatus: approved` |
| `T02_BUILD_REFERENCE_PACKET` | Orchestrator | `H01` | pasta do run | Pacote contém somente fontes aprovadas e seus hashes |
| `T03A/B/C_PROPOSE_DIRECTION` | três `art_direction_agent` distintos | `T02` | pasta do run, arquivos separados | Exatamente uma proposta por agente; schema e anti-clichê passam |
| `T04_RENDER_DIRECTION_BOARDS` | `implementation_agent` de protótipo | `T03A/B/C` | somente `runs/<runId>/boards/**` | Três boards renderizadas nos mesmos viewports |
| `T05_CRITIQUE_DIRECTIONS` | `visual_critic_agent` | `T04` | somente relatório | Comparação pareada; sem escolha automática |
| `H02_SELECT_DIRECTION` | Humano | `T05` | evento no ledger | Uma direção escolhida; hash da proposta registrado |
| `T06_COMPILE_COMPOSITION` | `composition_agent` | `H02` | somente spec do cliente | `composition-spec.json` válido; conteúdo e direção mantidos |
| `T07_BUILD_ARTIFACT` | `implementation_agent` | `T06` | site do cliente | Build e manifestos; hash final calculado |
| `T08A_TECHNICAL_VERIFY` | `technical_verifier_agent` | `T07` | relatórios somente | Testes focados, Deep Scrutiny e Unified Gate passam |
| `T08B_VISUAL_VERIFY` | `visual_critic_agent` diferente do builder | `T07` | relatórios somente | Rubrica visual sem falha crítica e screenshots completos |
| `T09_REFINE` | `implementation_agent` | falha em `T08A` ou `T08B` | allowlist do `T07` | Corrige somente findings registrados; máximo 3 ciclos |
| `T10_CERTIFY` | Orchestrator | `T08A` e `T08B` passam | ledger e relatório | Todos os relatórios referenciam o SHA-256 de `T07/T09` |
| `H03_PRODUCTION_APPROVAL` | Humano | `T10` | evento no ledger | Aprovação autenticada do mesmo hash certificado |

Regras do DAG:

- `T03A`, `T03B` e `T03C` podem executar em paralelo porque escrevem arquivos distintos.
- `T08A` e `T08B` podem executar em paralelo porque são somente leitura sobre o mesmo artefato imutável.
- Nenhuma outra tarefa mutável pode executar em paralelo.
- Ao iniciar `T08A`, o Orchestrator bloqueia escrita em `clientes/<clientScope>/site/**` até ambos os verificadores terminarem.
- Se `T09` alterar um byte, os resultados anteriores de `T08A` e `T08B` são invalidados e ambos executam novamente.

## 7. Plano de implementação

### Tarefa 1 — Contrato V2 e rejeição fail-closed

**Responsável:** `implementation_agent` exclusivo.  
**Dependências:** nenhuma.  
**Arquivos:** criar `src/orchestration/task-contract-v2.js`; modificar `src/orchestration/blueprint.js`; criar `test/task-contract-v2.test.js`.

**Interface produzida:** `validateTaskContractV2(input, workspaceRoot): FrozenTaskContract`.

- [ ] Escrever testes que rejeitam campo ausente, campo desconhecido, path absoluto, `..`, allowlist vazia, orçamento inválido, role desconhecido e output fora do cliente.
- [ ] Executar `node --test test/task-contract-v2.test.js`; resultado esperado: falha porque `task-contract-v2.js` não existe.
- [ ] Implementar validação e retorno de cópia profundamente congelada.
- [ ] Executar o mesmo comando; resultado esperado: todos os testes passam.
- [ ] Executar `node --test test/blueprint.test.js test/task-contract-v2.test.js`; resultado esperado: todos passam.
- [ ] Commit permitido: somente os três arquivos declarados; mensagem `feat(orchestrator): enforce task contract v2`.

### Tarefa 2 — Enforcement de ferramentas, rede e caminhos

**Responsável:** `implementation_agent` novo.  
**Dependências:** Tarefa 1 aprovada por verifier independente.  
**Arquivos:** criar `src/orchestration/policy-enforcer.js`; modificar `src/orchestration/executor-adapter.js`; criar `test/policy-enforcer.test.js`.

**Interfaces produzidas:** `authorizeTool(task, toolName): true`; `authorizeRead(task, relativePath): true`; `authorizeWrite(task, relativePath): true`; `authorizeNetwork(task, url): true`.

- [ ] Escrever testes negativos para ferramenta não permitida, escrita fora da allowlist, leitura cross-client, rede em `deny`, host fora da allowlist e acesso a `copias/` em modo escrita.
- [ ] Executar `node --test test/policy-enforcer.test.js`; resultado esperado: falha pela ausência do módulo.
- [ ] Implementar comparação por caminho real resolvido e contenção dentro do workspace.
- [ ] Envolver toda invocação do executor com o policy enforcer; tentativa proibida encerra a tarefa com `POLICY_DENIED` e sem retry.
- [ ] Executar `node --test test/policy-enforcer.test.js test/executor-adapter.test.js`; resultado esperado: todos passam.
- [ ] Commit permitido: somente os três arquivos declarados; mensagem `feat(orchestrator): enforce task permissions`.

### Tarefa 3 — Locks de escrita e independência de verificação

**Responsável:** `implementation_agent` novo.  
**Dependências:** Tarefa 2.  
**Arquivos:** modificar `src/orchestration/dag-scheduler.js` e `src/orchestration/workflow-orchestrator.js`; criar `test/orchestrator-isolation.test.js`.

**Interface produzida:** o scheduler executa em paralelo somente tarefas read-only ou tarefas com `writeAllowlist` disjuntas; `builderActorId !== verifierActorId` é obrigatório.

- [ ] Criar teste que fornece dois nós prontos com escrita em `clientes/a/site/**`; o segundo não pode iniciar antes do primeiro terminar.
- [ ] Criar teste que fornece nós com escritas disjuntas em `runs/x/a.json` e `runs/x/b.json`; ambos devem iniciar no mesmo batch.
- [ ] Criar teste que usa o mesmo `actorId` para build e verify; esperar `VERIFIER_NOT_INDEPENDENT`.
- [ ] Executar `node --test test/orchestrator-isolation.test.js`; resultado esperado: os três testes falham.
- [ ] Implementar locks e comparação de identidade.
- [ ] Executar `node --test test/dag-scheduler.test.js test/workflow-orchestrator.test.js test/orchestrator-isolation.test.js`; resultado esperado: todos passam.
- [ ] Commit permitido: somente os três arquivos declarados; mensagem `feat(orchestrator): isolate writers and verifiers`.

### Tarefa 4 — Estado calculado e aprovação vinculada a evidência

**Responsável:** `implementation_agent` novo.  
**Dependências:** Tarefa 3.  
**Arquivos:** criar `src/orchestration/promotion-state-machine.js`; modificar `bin/orchestrator.js` e `src/orchestration/execution-ledger.js`; criar `test/promotion-state-machine.test.js`.

**Interface produzida:** `computePromotionState(run): experimental | candidate | verified | production`; `approveHumanCheckpoint({ runId, checkpoint, artifactHash, approverId, signature })`.

- [ ] Escrever testes que impedem `verified` sem dois verificadores, hashes divergentes, ausência de screenshot e verifier igual ao builder.
- [ ] Escrever testes que impedem `production` sem assinatura e que invalidam aprovação quando o hash muda.
- [ ] Executar `node --test test/promotion-state-machine.test.js`; resultado esperado: falha pela ausência do módulo.
- [ ] Implementar a máquina de estados e substituir o `approve` irrestrito do CLI por `approve --checkpoint --artifact-hash --approver --signature-file`.
- [ ] Executar `node --test test/promotion-state-machine.test.js test/execution-ledger.test.js`; resultado esperado: todos passam.
- [ ] Commit permitido: somente os quatro arquivos declarados; mensagem `feat(orchestrator): bind promotion to evidence`.

### Tarefa 5 — Registry de fontes e pacote mínimo de referência

**Responsável:** `implementation_agent` novo.  
**Dependências:** Tarefa 2. Pode iniciar em paralelo com a Tarefa 4 em worktree separada.  
**Arquivos:** criar `schemas/reference-source.schema.json`, `src/vault/reference-registry.js`, `src/vault/reference-packet-builder.js`, `test/reference-packet-builder.test.js`; modificar `design-vault/INDEX.json` apenas após verificar sua versão no início da tarefa.

**Interfaces produzidas:** `registerReference(candidate): PendingReference`; `buildReferencePacket({ clientScope, approvedSourceIds, patternIds }): ReferencePacket`.

- [ ] Testar rejeição de fonte sem URL, commit SHA de 40 caracteres, licença encontrada, provenance e aprovação humana.
- [ ] Testar rejeição de mais de cinco fontes, fonte `inspiration-only` tratada como código e fonte de cliente diferente.
- [ ] Executar `node --test test/reference-packet-builder.test.js`; resultado esperado: falha pelos módulos ausentes.
- [ ] Implementar registry que registra metadados, sem clonar nem executar código remoto.
- [ ] Implementar pacote com exatamente 3–5 referências aprovadas e somente os pattern IDs solicitados.
- [ ] Executar `node --test test/reference-packet-builder.test.js test/vault-integrity.test.js`; resultado esperado: todos passam.
- [ ] Commit permitido: somente os cinco arquivos declarados; mensagem `feat(vault): add governed reference packets`.

### Tarefa 6 — Contrato visual e três direções obrigatórias

**Responsável:** `implementation_agent` novo.  
**Dependências:** Tarefa 5.  
**Arquivos:** criar `schemas/visual-acceptance.schema.json`, `schemas/visual-direction.schema.json`, `src/design/direction-compiler.js`, `test/direction-compiler.test.js`.

**Interfaces produzidas:** `compileDirectionTaskPackages({ visualAcceptance, referencePacket }): [TaskPackage, TaskPackage, TaskPackage]`.

- [ ] Testar que são produzidos exatamente três pacotes com `actorId`, output e `writeAllowlist` distintos.
- [ ] Testar que todos preservam emoção alvo, densidade, hierarquia, assets permitidos e antirreferências do contrato.
- [ ] Testar que nenhuma direção contém cores, fontes ou padrões não declarados no contrato ou nas referências aprovadas.
- [ ] Executar `node --test test/direction-compiler.test.js`; resultado esperado: falha pelo módulo ausente.
- [ ] Implementar schemas e compilador determinístico de pacotes.
- [ ] Executar o mesmo comando; resultado esperado: todos passam.
- [ ] Commit permitido: somente os quatro arquivos declarados; mensagem `feat(design): compile bounded visual directions`.

### Tarefa 7 — Matriz de captura visual imutável

**Responsável:** `implementation_agent` novo.  
**Dependências:** Tarefa 3 e Tarefa 6.  
**Arquivos:** criar `src/qa/visual-capture-matrix.js` e `test/visual-capture-matrix.test.js`; modificar `src/qa/visual-regression.js`.

**Interface produzida:** `captureVisualMatrix({ siteDir, artifactHash, outputDir }): VisualCaptureManifest`.

- [ ] Testar capturas em `1440x900`, `1024x768`, `768x1024` e `390x844`, nos estados `top`, `middle`, `bottom`, `menu-open`, `focus` e `reduced-motion` quando aplicáveis.
- [ ] Testar que cada imagem contém SHA-256, viewport, estado e hash do artefato.
- [ ] Testar que a função falha se o artefato mudar durante a captura.
- [ ] Executar `node --test test/visual-capture-matrix.test.js`; resultado esperado: falha pelo módulo ausente.
- [ ] Implementar captura e manifesto determinísticos.
- [ ] Executar `node --test test/visual-capture-matrix.test.js`; resultado esperado: todos passam.
- [ ] Commit permitido: somente os três arquivos declarados; mensagem `feat(qa): capture immutable visual matrix`.

### Tarefa 8 — Crítica visual estruturada e calibrável

**Responsável:** `implementation_agent` novo.  
**Dependências:** Tarefa 7.  
**Arquivos:** criar `schemas/visual-critique.schema.json`, `src/qa/visual-critic-gate.js`, `test/visual-critic-gate.test.js` e `test/fixtures/visual-critic/`.

**Interface produzida:** `evaluateVisualCritique({ captureManifest, visualAcceptance, critique }): VisualGateResult`.

- [ ] Criar fixtures positiva, mediana e negativa com críticas pré-calibradas.
- [ ] Testar sete dimensões obrigatórias: hierarquia, composição, tipografia, cor, assets, originalidade contextual e movimento.
- [ ] Definir falha crítica como qualquer dimensão `critical: true`; definir aprovação automática apenas quando todas as dimensões têm `score >= 4` em escala inteira de 1 a 5 e não há falha crítica.
- [ ] Testar rejeição de crítica sem coordenadas/região, sem justificativa, com screenshot desconhecida ou com hash divergente.
- [ ] Executar `node --test test/visual-critic-gate.test.js`; resultado esperado: falha pelos módulos ausentes.
- [ ] Implementar somente validação e cálculo do gate; o adapter de modelo visual permanece substituível e não pode alterar arquivos.
- [ ] Executar o mesmo comando; resultado esperado: todos passam.
- [ ] Commit permitido: somente os caminhos declarados; mensagem `feat(qa): add calibrated visual critic gate`.

### Tarefa 9 — Loop limitado de refinamento e gate unificado

**Responsável:** `implementation_agent` novo.  
**Dependências:** Tarefas 4, 7 e 8.  
**Arquivos:** criar `src/orchestration/refinement-controller.js` e `test/refinement-controller.test.js`; modificar `src/qa/unified-quality-gate.js` e `test/unified-quality-gate.test.js`.

**Interface produzida:** `planRefinement({ attempt, findings, priorArtifactHash }): RefinementTask | HumanReviewRequired`.

- [ ] Testar que somente findings dos verificadores podem entrar no prompt de refinamento.
- [ ] Testar que `attempt > 3` retorna `human_review_required` e não despacha builder.
- [ ] Testar que qualquer alteração invalida todos os gates anteriores.
- [ ] Testar que Unified Quality Gate exige Anti-Slop, Deep Scrutiny, captura completa, crítica visual, console, network e structural para o mesmo hash.
- [ ] Executar `node --test test/refinement-controller.test.js test/unified-quality-gate.test.js`; resultado esperado: falha antes da implementação.
- [ ] Implementar controlador e integração fail-closed.
- [ ] Executar o mesmo comando; resultado esperado: todos passam.
- [ ] Commit permitido: somente os quatro arquivos declarados; mensagem `feat(qa): enforce bounded visual refinement`.

### Tarefa 10 — Piloto adversarial e habilitação controlada

**Responsável:** `implementation_agent` para fixtures; depois `technical_verifier_agent` independente para execução.  
**Dependências:** Tarefas 1–9 verificadas.  
**Arquivos:** criar `test/orchestrator-design-e2e.test.js`, `test/fixtures/orchestrator-design/` e `scripts/run-design-orchestrator-pilot.js`; modificar `PROJECT_STATUS.md` somente se a execução fresca produzir evidência.

**Interface produzida:** comando `node scripts/run-design-orchestrator-pilot.js --client <slug> --blueprint <path> --ledger <path>`.

- [ ] Criar casos negativos: cross-client, mesma identidade builder/verifier, escrita concorrente, fonte não aprovada, hash alterado após QA, crítica ausente, quarta tentativa e promoção sem humano.
- [ ] Criar um caso positivo completo em cliente de fixture, sem usar `copias/` nem dados de cliente real.
- [ ] Executar `node --test test/orchestrator-design-e2e.test.js`; resultado esperado: falha antes do runner existir.
- [ ] Implementar o runner usando exclusivamente as interfaces das Tarefas 1–9.
- [ ] Executar `node --test test/orchestrator-design-e2e.test.js`; resultado esperado: todos passam.
- [ ] Executar `npm test`; resultado esperado: exit code 0 e zero testes falhos.
- [ ] Executar o piloto duas vezes em checkout limpo; resultado esperado: artefatos e relatórios têm hashes idênticos.
- [ ] Um verifier independente revisa diff, logs e hashes; somente depois `PROJECT_STATUS.md` pode registrar o escopo observado.
- [ ] Commit permitido: arquivos declarados e eventual atualização factual de status; mensagem `test(orchestrator): prove governed design workflow`.

## 8. Sequência de delegação

```text
Tarefa 1 → Verifier A
Tarefa 2 → Verifier B
Tarefa 3 → Verifier A
              ├─ Tarefa 4 → Verifier B
              └─ Tarefa 5 → Verifier C
Tarefa 5 → Tarefa 6 → Verifier A
Tarefas 3 + 6 → Tarefa 7 → Verifier B
Tarefa 7 → Tarefa 8 → Verifier C
Tarefas 4 + 7 + 8 → Tarefa 9 → Verifier A
Tarefas 1–9 → Tarefa 10 → Verifier final que não construiu nenhuma delas
```

O Coordinator **DEVE** sintetizar o resultado de cada verifier antes de liberar a próxima tarefa. Ele **NÃO DEVE** encaminhar “corrija o que encontrar”; cada correção exige um novo pacote com arquivo, condição atual, mudança exata, limite de escopo e comando de verificação.

## 9. Critérios de conclusão

O roadmap somente está concluído quando todos os itens abaixo forem observados em uma execução fresca:

- [ ] Blueprint V2 rejeita tarefa ambígua antes do dispatch.
- [ ] Permissões declaradas são aplicadas em runtime, não apenas validadas como strings.
- [ ] Escritas sobrepostas nunca executam em paralelo.
- [ ] Builder e verifier têm identidades distintas registradas no ledger.
- [ ] Referências não aprovadas nunca chegam ao pacote de contexto.
- [ ] O fluxo produz exatamente três direções e pausa para escolha humana.
- [ ] Screenshots, crítica, testes e artefato compartilham o mesmo SHA-256.
- [ ] Alterar o artefato invalida a certificação anterior.
- [ ] Três refinamentos falhos causam pausa humana; não existe loop infinito.
- [ ] `production` exige assinatura humana e não pode ser emitido por agente.
- [ ] Todos os casos adversariais falham pelo motivo esperado.
- [ ] `npm test` passa e o piloto é reproduzível em checkout limpo.

## 10. Ordem de implantação e rollback

1. Entregar Tarefas 1–4 com a flag `ORCHESTRATOR_V2=off` por padrão.
2. Entregar Tarefas 5–9 sem habilitar clientes reais.
3. Rodar Tarefa 10 somente com fixtures.
4. Habilitar `ORCHESTRATOR_V2=on` para um único cliente candidato explicitamente escolhido.
5. Manter o fluxo anterior disponível apenas para rollback durante o piloto; ele não pode promover `verified` nem `production` enquanto V2 estiver ativo.
6. Remover a flag somente após duas execuções reprodutíveis do piloto e revisão independente.

Rollback permitido: desligar `ORCHESTRATOR_V2` e preservar ledger, relatórios e artefatos. Rollback **NÃO DEVE** apagar evidência nem converter falha em sucesso.
