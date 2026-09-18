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
