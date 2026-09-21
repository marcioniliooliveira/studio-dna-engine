# Handoff de Auditoria — `refactor/verified-production-pipeline`

> Data da auditoria: 2026-08-28
> Base revisada: `origin/main...5dbcfcb` (cinco commits)
> Estado sustentado por evidência atual: `experimental`
> Promoção para `verified` ou `production`: bloqueada pelos itens abaixo.

## Escopo e preservação do checkout

- O diff da branch contém 93 arquivos, com 31.679 inserções e 1.612 remoções.
- Havia 132 exclusões locais pré-existentes, concentradas em três clientes. Elas não foram revisadas como parte dos commits da branch, não foram encenadas e não devem entrar neste commit.
- A auditoria foi somente leitura no repositório. As reproduções que escrevem arquivos foram executadas em um checkout temporário criado a partir de `HEAD`.

## Evidências executadas

| Comando/cenário | Resultado observado |
|---|---|
| `npm ci && npm test` em checkout limpo de `HEAD` | 42/43 testes passaram; `test/vault-integrity.test.js` falhou. |
| `node scripts/audit-syntax.js` | 58/58 arquivos no escopo do script sem erro de sintaxe. O script não cobre todo o runtime e não falha o processo se encontrar erros. |
| `npm audit --omit=dev` | Nenhuma vulnerabilidade conhecida reportada na execução. |
| `node scripts/build-and-certify-pilot.js` em checkout limpo | Quality Gate falhou: 21 respostas 404 e 24 imagens quebradas. O processo terminou com código 0. |
| Fixture do `UnifiedQualityGate` com `console.error` e CSS 404 | Retornou `status: "verified"`, embora o gate de rede estivesse reprovado. |
| Preview de fixture HTML de 84 bytes | O servidor respondeu 38.738 bytes por injetar normalizador e Dev HUD; preview não avalia o mesmo artefato que o QA estático. |

## Bloqueadores de promoção

### 1. Checkout limpo não passa a suíte declarada

`design-vault/INDEX.json` declara `tokens.json`, `tailwind.config.js` e `brand-spec.template.json` para os templates, mas os arquivos não existem em `HEAD`. Os mesmos tipos de artefato são ignorados em `.gitignore`.

- Evidência de código: `design-vault/INDEX.json`, `.gitignore`, `test/vault-integrity.test.js`.
- Impacto: contradiz o claim de 43/43 e invalida a reprodutibilidade do CI.
- Próxima ação: versionar os inputs obrigatórios ou removê-los do índice e do contrato; incluir teste de checkout limpo na CI.

### 2. A CI não instala o browser exigido por Playwright

`.github/workflows/ci.yml` executa `npm ci` e `npm test`, mas não instala Chromium. Com `PLAYWRIGHT_BROWSERS_PATH` apontando para um diretório inexistente, os dois testes de `UnifiedQualityGate` falham antes das asserções.

- Impacto: o workflow não reproduz a suíte num runner limpo.
- Próxima ação: instalar explicitamente o browser no workflow ou usar imagem imutável que já o contenha e registrar essa condição.

### 3. O piloto não é reproduzível e o certificador não falha o processo

O build do piloto depende de mídias locais que não estão versionadas. Em checkout limpo, o `UnifiedQualityGate` encontrou 21 falhas de rede e 24 imagens quebradas. Mesmo assim, `scripts/build-and-certify-pilot.js` apenas imprime o resultado e retorna exit code 0.

- Impacto: um job pode aparentar sucesso com artefato reprovado.
- Próxima ação: versionar ou fornecer por artifact store todos os assets do bundle; hashear o bundle inteiro; lançar erro e definir exit code não zero se qualquer gate falhar.

### 4. O Quality Gate emite falso `verified`

`src/qa/unified-quality-gate.js` registra `networkFailures`, mas não as inclui na expressão de `passed`. Ele também escuta `pageerror`, não `console`, e não captura `requestfailed`.

- Impacto: 404, erros de console e falhas de transporte podem coexistir com `status: "verified"`.
- Próxima ação: tornar todos os gates obrigatórios na decisão final; adicionar regressões negativas isoladas para rede, console, navegação e imagens.

### 5. Preview, QA e produção não usam o mesmo artefato imutável

O preview altera o HTML no momento da resposta ao aplicar `UniversalAssetNormalizer` e `injectDevHud`; o QA serve o arquivo estático bruto. O manifesto hasheia apenas HTML, não assets, screenshot ou configuração de execução. Em Windows, o HTML materializado também diverge do blob por EOL, sem `.gitattributes` que fixe a política.

- Impacto: o relatório de QA não prova o conteúdo servido no preview nem um bundle promocionável.
- Próxima ação: construir bundle content-addressed com hash de todos os arquivos; verificar o hash antes do QA; desligar mutações de preview no caminho de certificação.

### 6. ICM e Anti-Slop não garantem o isolamento alegado

`ContextRouter` permite acesso quando `activeClientSlug` ou `selectedRefSlug` não são fornecidos e o contrato do estágio 04 rejeita até o caminho do próprio cliente por esperar literalmente `clientes/active-client/`. O certificador não chama `ContextRouter` nem `STAGE_CONTRACTS`.

O Anti-Slop Gate não usa `brandSpec` e o piloto aprovado mantém resíduos da referência, incluindo e-mail, endereço, telefone e crédito externo. A página também contém SEO genérico e dados fictícios por incompatibilidade entre `compositionSpec` e `SeoInjector`.

- Impacto: isolamento de contexto, DNA Lock, SEO e ausência de resíduos não estão demonstrados pelo fluxo real.
- Próxima ação: exigir slugs/ref válidos e contenção de paths, integrar contratos no orquestrador, derivar inventário de resíduos da referência e validar o HTML/metadata final.

## Riscos de segurança e integridade a corrigir antes de exposição

1. `UniversalAssetNormalizer` aceita URLs presentes no HTML sem passar pela validação central e resolve alguns destinos sem contenção dentro de `assets/`.
2. O fallback de assets do preview escolhe cliente pelo header `Referer`; a reprodução retornou asset do cliente B para uma requisição do cliente A.
3. O preview executa scripts clonados no mesmo origin das APIs e do dashboard, sem CSP/sandbox.
4. O preview permite `host: "0.0.0.0"`, apesar do claim de bind estritamente local.
5. O Self-Healing Proxy grava assets em GETs sem autorização explícita e o `UniversalScrollDirector` transforma falhas de `fetch` em respostas 200 fabricadas.

## Controles positivos observados

- `package-lock.json` está versionado.
- `npm audit --omit=dev` não reportou vulnerabilidades conhecidas nesta execução.
- Os testes focados de path traversal, CORS, corpo de requisição e autenticação de mutações passaram.
- O preview usa `127.0.0.1` por padrão e as APIs mutáveis requerem token quando habilitadas.

Esses controles não compensam os bloqueadores de certificação, isolamento e artefato acima.

## Ordem recomendada de recuperação

1. Suspender os claims `verified` do piloto e atualizar `PROJECT_STATUS.md` para refletir a evidência atual.
2. Fazer `npm test` passar em checkout limpo e restaurar instalação verificável do Chromium na CI.
3. Corrigir o certificador para falhar o processo e incluir todos os gates no resultado.
4. Versionar ou publicar bundle completo de assets e gerar manifesto de bundle imutável.
5. Integrar ICM/DNA/Anti-Slop ao orquestrador real, com schemas únicos e testes de integração do piloto.
6. Separar origens de conteúdo clonado e APIs, remover mocks globais e restringir os fluxos de download.

## Verificações mínimas antes de nova promoção

```powershell
npm ci
npx playwright install --with-deps chromium
npm test
node scripts/build-and-certify-pilot.js
```

O último comando deve encerrar com código diferente de zero para qualquer reprovação e produzir um relatório cujo manifesto corresponda ao bundle efetivamente auditado.

## Revisão externa

CodeRabbit não foi incluído como evidência: o CLI instalado no WSL retornou `not_authenticated`. Uma revisão externa exige autenticação explícita antes de rodar o comando de review.

---

## 🚀 Handoff: Cópia e Extração Likova Space (`copias/likova-space/`)

> **Data do Handoff:** 18/09/2026  
> **Branch de Trabalho:** `feature/clone-likova-portfolio`  
> **URL de Origem:** [https://likova.space/](https://likova.space/)  
> **Status:** Concluído, auditado e catalogado como evidência imutável.

### 1. Intenções e Propósito Estratégico do Scrape
- **Objetivo Principal:** O site [https://likova.space/](https://likova.space/) foi clonado e processado pelo **Studio DNA PRO** para servir como **esqueleto de referência arquitetural, visual e cinemático de alto padrão (Awwwards)** para o futuro **Portfólio Profissional de Desenvolvedor Web** do usuário.
- **Diretriz de Imutabilidade (MANDATÓRIA):** Nenhuma alteração de texto, cor ou branding foi (ou deve ser) aplicada sobre a referência em `copias/likova-space/`. O clone deve ser rigorosamente mantido como evidência pura e intocada (`read-only`), conforme o protocolo ICM (*Interpretable Context Methodology*).
- **Alinhamento Futuro:** A personalização do portfólio (nome, bio, cases reais, especialidades e serviços) será alinhada e transmutada futuramente em uma pasta de cliente isolada (`clientes/webdev-portfolio/`), sem contaminar o esqueleto original.

### 2. O que foi Extraído e Validado
1. **Pipeline Completo do Engine:**
   - 9 estágios executados com sucesso (`PIPELINE_STATUS.json`): detecção de tipo, download de assets e mídias em alta resolução, saneamento de paths locais, extração de tokens de design, styleguide visual, mapeamento de particularidades de UI/UX, master spec, manifesto de assets e catálogo de prompts de IA.
2. **Tokens Compilados no Design Vault:**
   - Pasta: `design-vault/likova-space/`
   - `tokens.json`: 49 variáveis de cores e 9 famílias de fontes.
   - `tailwind.config.js`: Preset utilitário completo com a identidade do site.
   - `brand-spec.template.json`: Template base pronto para orquestrar a futura transmutação determinística.
3. **Quality Gate & Linter Headless:**
   - Auditoria via `scripts/box-diff-linter.js` aprovada com **0 erros de runtime em JavaScript** (Barba.js wrapper e ServiceWorker resolvidos).
   - 19 seções estruturais mapeadas com precisão geométrica.
4. **Preview Local Ativo:**
   - Visualizável em `http://localhost:4000/copias/likova-space/site/index.html`.

### 3. Roadmap para a Futura Transmutação (Próximos Passos)
Quando o usuário decidir avançar para a construção do portfólio:
1. **Definição de Conteúdo e Identidade:**
   - Coletar dados profissionais do desenvolvedor (nome/estúdio, bio de alto impacto, links de redes/GitHub).
   - Mapear os serviços principais (ex: Engenharia Frontend de Alto Padrão, Animações Awwwards/GSAP, Aplicações Web Next.js/React, Arquitetura Full-Stack).
   - Selecionar projetos e repositórios reais para preencher os blocos de showcase e modais de detalhe.
2. **Setup do Cliente ICM:**
   - Criar `clientes/webdev-portfolio/` com seu próprio `DNA.md` e `brand-spec.json`.
   - Declarar invariantes P0/P1 via protocolo `dna-lock`.
3. **Dual-Version Delivery (Padrão do Projeto):**
   - **Versão 1 (HTML Estático):** Versão ultrarrápida, sem build overhead, pronta para deploy instantâneo ou CDN.
   - **Versão 2 (Next.js App Router):** Versão modular com TypeScript, componentes React limpos, Tailwind e Framer Motion/GSAP para máxima manutenibilidade.

---

## Handoff: apresentações imobiliárias Integrii e Silvio Iwata

> Atualizado em: 2026-09-21
> Branch: `feature/clone-likova-portfolio`
> Estado do escopo: entregue como demonstração estática offline; não representa inventário, envio de leads, mapa ao vivo ou integração de atendimento.

### Objetivo aprovado

Foram construídas duas apresentações independentes para conversa com leads imobiliários:

- `clientes/integrii-imoveis/site/`: adaptação consciente da hero de 21 Oaks, com comprar/alugar/investir, troca de imagem, reveal circular desktop, fallback leve no mobile, thumbnails, progresso, autoplay pausável e rota intermediária de atendimento.
- `clientes/silvio-iwata-imobiliaria/site/`: adaptação 50/50 de Aircenter e 21 Oaks, com hero sticky, parallax nativo, reveals por seção, rail de progresso, contador, mapa estático de Maringá/região, slider e rota intermediária de atendimento.

Cada cliente possui `content-slots.json` e `composition-spec.json` isolados. As imagens são SVGs locais demonstrativos porque não foi autorizada fotografia de imóvel. Todos os cards, propriedades e condições deixam claro o caráter demonstrativo; não há backend, coleta, envio ou confirmação fictícia de lead.

### Decisões de identidade e isolamento

- A solicitação do usuário substitui explicitamente os blocos FlashTech adicionados pelos manifestos de DNA gerados. Os runtimes usam somente a identidade observada de cada lead: azul naval da Integrii e verde/lima da Silvio Iwata.
- Nenhum runtime de cliente possui URL externa, CDN, `fetch`, analíticos, SDK de mapa ou token/termo FlashTech. A conferência final por `rg` encontrou zero ocorrências proibidas.
- As famílias tipográficas permanecem como preferência CSS com fallback de sistema; nenhuma fonte remota foi importada. Isso preserva o requisito offline e evita uma dependência de licença não fornecida.
- `copias/21oaks-org` e `copias/aircenter-space` foram usados apenas como evidência de referência e não foram modificados.

### Processo de comparação com as referências

1. **Mapeamento de fonte.** Foram lidos os trechos funcionais, não apenas o visual: 21 Oaks usa hero com `bg-current`/`bg-next`, três thumbnails, estado `data-hero-slide`, timeline GSAP, `clipPath` circular, preload e autoplay em `copias/21oaks-org/site/index.html` nas faixas 1445, 2838–3160 e 3564–3618. Aircenter usa 11 seções de scroll, camadas sticky/parallax, reveal, contadores, mapa e slider em `copias/aircenter-space/site/index.html` nas faixas 306–641, 903–975 e 1242–1326.
2. **Mapeamento de comportamento.** A Integrii implementa o mesmo eixo de estado para imagem, copy, CTA, thumbnail e progresso em `site/interaction.js`; a CSS aplica `clip-path: circle(...)` no desktop e opacidade/translação no mobile. A Silvio usa `IntersectionObserver` para ativação de seções e `requestAnimationFrame` para atualizar as variáveis de parallax, sem copiar runtimes remotos.
3. **Execução empírica.** As referências foram abertas por um servidor local temporário. 21 Oaks expôs três thumbnails e as camadas `bg-current`/`bg-next`, mas falhou o carregamento de `webflow.achunk.22b66e874d42861f.js`; o clique de thumbnail não completou a troca nesse ambiente. Aircenter expôs 11 seções e parallax/reveal com transform observado, mas emitiu 48 requests externos. Portanto, a equivalência foi julgada pela estrutura e comportamento observável, não por dependências externas quebradas.
4. **Testes de paridade.** Os testes de navegador verificam: troca sincronizada de imagem/copy/CTA/progresso, thumbnails, pausa explícita do autoplay, `prefers-reduced-motion`, rota dos três intents, rota dos três cards, rail de seção da Silvio, slider, mapa visível, overflow horizontal e bloqueio de requests não locais.
5. **Inspeção visual.** Foram capturadas e avaliadas as primeiras dobras nos viewports 1440×977 e 390×844 de ambos os sites. A hierarquia, CTA, imagem demonstrativa, navegação e controles permaneceram visíveis; o suite também cobre 1024×900.

### Matriz de fidelidade e desvios conscientes

| Referência | Mantido e testado | Não reproduzido intencionalmente | Razão |
|---|---|---|---|
| 21 Oaks → Integrii | Hero em camadas, reveal circular, três escolhas, thumbnails, progresso, autoplay pausável, troca por CTA e mobile simplificado | Zonas de ambiente em SVG, slider de brilho, conteúdo/arte de moradia estudantil | As zonas e controles descrevem ambientes da referência e não agregam ao funil imobiliário aprovado; os SVGs locais passam a cumprir a função visual sem reutilizar assets de terceiros. |
| Aircenter → Silvio | Hero sticky, narrativa por scroll, parallax, reveal, contador, rail, mapa e slider | Vimeo de fundo, WebGL carousel, mapa interativo, formulário/POST e SDKs externos | A apresentação deve operar offline, com mapa estático e sem backend. Esses recursos exigiriam mídia, licenças, APIs ou integração ainda não autorizados. |

O custo conhecido desses desvios é uma experiência menos cinematográfica/fotorealista que as referências. A compensação é fidelidade de fluxo, isolamento de marca, transparência de demo e operação offline verificável.

### Arquivos e commits relevantes

- Especificação: `docs/superpowers/specs/2026-09-21-real-estate-lead-presentations-design.md` (`4098d09`).
- Plano executável: `docs/superpowers/plans/2026-09-21-real-estate-lead-presentations.md` (`59872d1`).
- Contratos, placas locais e duas experiências: `cc0a53a`, `2909325`, `4e4b140`, `7e902ea`.
- QA de browser e rotas: `d081430`, `b428ed8`.
- Ajustes de acessibilidade e affordances da referência: `62cb405`.
- Testes adicionados: `test/real-estate-demos.test.js` e `test/real-estate-demos.browser.test.js`.

### Evidência de validação atual

| Verificação | Resultado observado |
|---|---|
| `node --test test/real-estate-demos.test.js test/real-estate-demos.browser.test.js` | 8/8 passaram. |
| Navegador local | Fluxos verificados em 1440×977, 1024×900 e 390×844; reduced-motion e requests locais cobertos. |
| `git diff --check 4098d09..HEAD` | Sem erro de whitespace. |
| Scan de resíduos externos/FlashTech | Zero ocorrências nos diretórios dos dois clientes. |
| `npm.cmd test` | 58/59 passaram; falha fora deste escopo em `test/vault-integrity.test.js:27`, pois falta `design-vault/elyse-residence-dev-webflow-io/tokens.json`. |

Os auditores heurísticos de UX devem ser interpretados com cautela aqui: um deles classificou o atributo `data-autoplay-toggle` como mídia autoplay sem mudo, embora não exista elemento de mídia; outro reportou scroll sem throttling apesar do uso de `requestAnimationFrame`. Os testes de browser e a inspeção visual são a evidência dominante para estes pontos.

### Próximos passos de execução

1. Receber autorização e ativos imobiliários reais do lead; substituir apenas os SVGs demonstrativos pelos assets aprovados, adicionando dimensões, `loading="lazy"` abaixo da dobra e descrições finais.
2. Validar a copy e os dados públicos de cada lead antes de remover qualquer rótulo de demonstração. Não publicar preços, disponibilidade, depoimentos, rentabilidade ou métricas sem fonte aprovada.
3. Se uma integração de atendimento for aprovada, definir destino, consentimento, backend e mensagem de sucesso real; só então substituir a rota intermediária estática.
4. Se mapa vivo, vídeo ou WebGL forem desejados, obter permissão de asset/licença e revisar o requisito offline antes de incluí-los.
5. Resolver separadamente a falha global do Design Vault; ela não deve ser mascarada como falha dos demos.

### Retomada segura

1. Preservar os arquivos sujos e não rastreados fora das pastas dos dois clientes e dos testes de demo; eles pertencem a outras frentes.
2. Rodar primeiro o suite focado acima; em seguida, rodar `npm.cmd test` e reportar a falha do Vault de forma separada se ela persistir.
3. Antes de alterar qualquer cliente, reler seu `DNA.md` e `brand-spec.json`, mantendo a exceção aprovada: nenhuma identidade FlashTech nesta apresentação.
4. Manter `copias/` somente leitura e repetir a comparação por comportamento, não por cópia de assets ou dependências remotas.
