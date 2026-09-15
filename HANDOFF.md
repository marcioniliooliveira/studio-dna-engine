# 🚀 HANDOFF DE ENGENHARIA & TRANSIÇÃO DE CONTEXTO (V5.3 CONSOLIDADA)

> **Data:** 14 de Setembro de 2026  
> **Repositório:** `playwright-scraper` (`studio-dna-engine`)  
> **Status:** Branch estruturada para testes da equipe com Canvases Kombai Canônicos (ACON24 e Jumpflex Home Journey), Cliente Negocia Bem validado via DNA Lock, Handoff Jumpflex Evolution atualizado e repositório higienizado.

---

## 🧪 Guia Rápido de Testes para a Equipe

Esta branch foi organizada para que os colegas possam testar diretamente os principais artefatos canônicos:

### 1. Canvases Kombai (Design & Jornadas)
Os arquivos canônicos aprovados estão versionados em `.kombai/canvas/`:
- **ACON24 Faithful Canvas Clone (`.kombai/canvas/ACON24 home — faithful canvas clone.html`):**
  - Abra o arquivo HTML diretamente no seu navegador ou via extensão Kombai para visualizar o clone fiel e responsivo da home do ACON24.
- **Jumpflex Home Journey (`.kombai/canvas/jumpflex-home-journey.canvas`):**
  - Jornada completa de 7 etapas (`Hero`, `Transição Scroll`, `Rail FLEX/HERO/MEGA`, `Comparação de Produtos`, `Prova Social & Garantia`, `Entrada B2B/Cotação` e `FAQ/Footer`).
  - Abra via extensão do Kombai no seu IDE ou editor de design.
- **Jumpflex Brand Exploration (`.kombai/canvas/jumpflex-com-home.canvas`):**
  - Exploração dos componentes de marca Jumpflex.

### 2. Cliente Negocia Bem (`clientes/negocia-bem`)
Site completo da consultoria imobiliária com DNA Lock e contratos ICM:
- **Para executar o servidor dedicado do cliente:**
  ```bash
  cd clientes/negocia-bem
  npm run dev
  ```
  Acesse `http://localhost:3000` para navegar na experiência com GSAP ScrollTrigger, abas interativas e formulários.
- **Contratos e Documentação do Cliente:**
  - `clientes/negocia-bem/DNA.md`
  - `clientes/negocia-bem/brand-spec.json`
  - `clientes/negocia-bem/composition-spec.json`
  - `clientes/negocia-bem/content-slots.json`

### 3. Documentação e Handoff Jumpflex Evolution
- Consulte [clientes/jumpflex-home-evolution/handoff.md](file:///c:/Users/wd/Documents/playwright-scraper/clientes/jumpflex-home-evolution/handoff.md) para ver a especificação completa dos contratos de dados, slots, regras de motion GSAP, matriz comparativa e checklist de aceitação por etapas (A a E).

### 4. Execução da Suíte de Testes Automatizados
- Para rodar a bateria de testes automatizados do projeto:
  ```bash
  npm test
  ```
- Para rodar especificamente os testes do Negocia Bem:
  ```bash
  node --test test/negocia-bem-scroll-integrity.test.js
  ```

---

## 🧭 1. Resumo Executivo & Pilares do Sistema

O **Studio DNA Engine (V5.2)** é um ecossistema completo para captura, dissecação de Design DNA, compilação de tokens e transmutação determinística de sites Awwwards para produção de alta fidelidade:

1. **Engenharia Determinística & Custo Zero de IA:**
   - **Eliminação de Tentativa e Erro:** Substituição de agentes visuais navegando no Chrome por scripts determinísticos Node.js/Playwright com interceptação de rede e CDP.
   - **`src/server/preview-server.js`:** Servidor local com suporte nativo a streaming **HTTP 206 Partial Content** (Range requests para vídeos de fundo e áudio) e **Proxy Self-Healing** (recuperação automática de assets 404 direto da CDN de origem para `./assets/` com entrega 200/206).
   - **`src/pro/universal-asset-normalizer.js`:** Sanitização completa, des-externalização de CDNs (Webflow, Vercel, Google Fonts), remoção de travas de preloader e neutralização não-destrutiva de classes JS para manter compatibilidade com Lenis, GSAP ScrollTrigger e SplitText.

2. **Design Vault Multidimensional:**
   - Modelos de referência dissecados e parametrizados em `design-vault/`:
     - **`elyse-residence-dev-webflow-io/`:** Esqueleto completo (`skeleton.html`, `content-slots.json`, `tokens.json`, `tailwind.config.js`, `brand-spec.template.json`, `REFERENCE_CARD.md`).
     - **`bymonolog-com/`:** Design DNA e tokens compilados com template de marca.
     - **`01-motion-physics/`:** Matrizes e curvas matemáticas de easing (`easings.json`).
     - **`02-3d-experiments/`:** Componentes WebGL/Three.js (`cylindrical-spinner.js`).
     - **`04-typography/`:** Pares tipográficos curados para Awwwards (`curated-pairings.json`).

3. **Servidor MCP Integrado (`src/mcp-server.js`):**
   - Expõe 4 tools (`scrape_and_extract_dna`, `create_client_project`, `inject_content_slots`, `run_quality_gate_audit`) e 2 resources (`vault://easings`, `vault://typography`) permitindo que agentes de IA orquestrem a fábrica e auditem projetos sem alucinações.

4. **Metodologia Dual-Stack (HTML + Next.js 15):**
   - Criação de versões duplas: clone estático 1:1 desacoplado + conversão modular em Next.js 15 (App Router, Tailwind CSS, TypeScript, Lucide Icons, GSAP/Lenis).

5. **Blindagem de Contexto (ICM & DNA Lock):**
   - Pastas pesadas e isoladas (`copias/`, `clientes/`, `qa-reports/`, `storage/`, `scratch/`, `node_modules/`, `*.png`) permanecem blindadas via `.ignore`, `.cursorignore`, `.agentignore` e `.geminiignore`.
   - Cada cliente em `clientes/` possui seu próprio `brand-spec.json` ou `DNA.md` com tokens e regras de isolamento P0/P1.

---

## 📂 2. Mapa Canônico de Arquitetura

```
playwright-scraper/
├── .ignore / .cursorignore / .geminiignore   # ⚡ Blindagem total de busca/indexação da IA
├── HANDOFF.md                                # 📖 Este documento de transição contínua
├── README.md / CONTRIBUTING.md               # 📚 Documentação do projeto
├── package.json                              # 📦 Dependências e scripts de execução
├── index.js                                  # 🚀 Entrypoint programático do pipeline
├── bin/cli.js                                # 🖥️ CLI unificada (studio-dna)
│
├── design-vault/                             # 🏛️ Acervo de Referências & Esqueletos
│   ├── 01-motion-physics/                    # 📐 Fórmulas e curvas de interpolação
│   │   └── easings.json
│   ├── 02-3d-experiments/                    # 🧊 Componentes 3D e Shaders
│   │   └── cylindrical-spinner.js
│   ├── 04-typography/                        # 🔤 Combinações de fontes curadas
│   │   └── curated-pairings.json
│   ├── bymonolog-com/                        # 🧬 DNA Tokens & Brand Spec
│   │   ├── tokens.json
│   │   ├── tailwind.config.js
│   │   └── brand-spec.template.json
│   └── elyse-residence-dev-webflow-io/       # 💎 Esqueleto Master Parametrizado
│       ├── skeleton.html
│       ├── content-slots.json
│       ├── tokens.json
│       ├── tailwind.config.js
│       ├── brand-spec.template.json
│       └── REFERENCE_CARD.md
│
├── src/                                      # ⚙️ Núcleo de Engenharia
│   ├── config/index.js                       # Configuração de caminhos e viewports
│   ├── mcp-server.js                         # Servidor MCP (Tools & Resources)
│   │
│   ├── core/                                 # Motores principais de scraping
│   │   ├── cloner.js                         # Cloner Playwright + interceptação CDP
│   │   ├── detector.js                       # Detecção de framework/stack
│   │   ├── dna-extractor.js                  # Extrator de cores, fontes e espaçamentos
│   │   └── ui-ux-extractor.js                # Extração de componentes e hierarquia UX
│   │
│   ├── extractors/
│   │   └── token-compiler.js                 # Compilador de Design Tokens (W3C/Tailwind)
│   │
│   ├── generators/                           # Injeção e geração de código
│   │   ├── asset-manifest-generator.js       # Mapeamento de assets locais
│   │   ├── ast-injector.js                   # Transmutador AST Cheerio (Anti-Slop)
│   │   ├── client-factory.js                 # Fábrica de novos clientes (One-shot)
│   │   ├── prompt-builder.js                 # Montador de prompts estruturados
│   │   ├── prompt-template-generator.js      # Templates de briefing
│   │   ├── seo-injector.js                   # Injeção de metatags e OpenGraph
│   │   ├── slot-injector.js                  # Injeção determinística de copy em slots
│   │   ├── spec-generator.js                 # Gerador de especificações técnicas
│   │   ├── styleguide.js                     # Gerador de página de Style Guide
│   │   └── tailwind-generator.js             # Exportador de Tailwind Config
│   │
│   ├── pro/                                  # Módulos avançados de runtime
│   │   ├── advanced-asset-interceptor.js     # Interceptação de shaders, webgl e áudios
│   │   ├── cdp-listener-mapper.js            # Mapeamento de eventos de rede CDP
│   │   ├── gsap-reverser.js                  # Reversão e captura de timelines GSAP
│   │   ├── shaders-interceptor.js            # Extração de GLSL e canvas
│   │   ├── universal-asset-normalizer.js     # Sanitização, uncloaking e download de assets
│   │   └── universal-scroll-director.js      # Ponte Lenis + ScrollTrigger + GSAP
│   │
│   ├── dev/
│   │   └── dev-hud.js                        # HUD visual para debugging local
│   ├── qa/
│   │   └── visual-regression.js              # Testes de regressão visual Pixelmatch
│   └── server/
│       └── preview-server.js                 # Servidor local (HTTP 206 + Self-Healing Proxy)
│
├── scripts/                                  # 🛠️ Scripts utilitários e de manutenção
│   ├── box-diff-linter.js                    # Quality Gate Playwright (0 erros JS/assets)
│   ├── capture-hydrated.js                   # Captura de DOM pós-hidratação
│   ├── dna-extractor.js                      # Extrator autônomo de DNA
│   ├── export-community.js                   # Exportação de templates limpos
│   └── normalize-all-copies.js               # Normalizador em lote de todas as cópias
│
├── configs/clients/                          # 💡 Configurações declarativas JSON de clientes
│   └── template-elyse-luxe.json
│
├── clientes/                                 # 🏢 Ambientes 100% isolados de clientes (ICM)
│   ├── caso-01-healthtech/                   # PulseMed (base #120824, CTA #E8FF54)
│   ├── flashtech-caso-02-ecommerce/          # NorthTrail (trail.orange, sand.100)
│   ├── flashtech-caso-03-d2c/                # APEX Wireless (base #02040A, CTA #00F0FF)
│   └── negocia-bem-imobiliaria/              # Negocia Bem (ref storeyarchitecture)
│
└── copias/                                   # 📦 Esqueletos brutos 1:1 e conversões Next.js
```

---

## ⚡ 3. Comandos Canônicos do CLI & Scripts

| Comando | Descrição |
| :--- | :--- |
| `npm run start` / `npm run preview` | Inicia o servidor local de preview na porta 4000 com Proxy Self-Healing e streaming HTTP 206 ativo |
| `npm run scrape <url>` | Executa o cloner Playwright com interceptação de rede, extração de DNA e normalização de assets |
| `npm run normalize` | Executa o normalizador universal em todas as pastas de `copias/` em lote |
| `npm run tokens` | Compila os tokens de design do site clonado para o formato padrão do Vault |
| `npm run client` | Executa a fábrica de clientes (`client-factory.js`) baseada em configuração JSON |
| `npm run inject` | Injeta deterministicamente variáveis de copy nos slots do esqueleto HTML |
| `npm run audit` | Executa o Quality Gate Playwright (`box-diff-linter.js`) para validar 0 erros JS e 100% de imagens |
| `npm run setup` | Instala as dependências e o Chromium do Playwright |

---

## 🤖 4. Servidor MCP (`src/mcp-server.js`)

O projeto expõe um servidor MCP compatível com IDEs e agentes de IA para automação total:

### Ferramentas (Tools):
1. `scrape_and_extract_dna(url, mode)`: Clona o site e gera esqueleto + tokens.
2. `create_client_project(brandName, refSlug, niche, toneOfVoice, whatsapp)`: Cria a pasta isolada do cliente e inicializa o preview.
3. `inject_content_slots(skeletonPath, contentSlotsPath, outputPath)`: Injeta copy no esqueleto com custo 0 de IA.
4. `run_quality_gate_audit(siteSlug)`: Executa auditoria automatizada Playwright headless.

### Recursos (Resources):
- `vault://easings`: Entrega a matriz de curvas de easing Awwwards.
- `vault://typography`: Entrega o catálogo de pares tipográficos de alta performance.

---

## 🎯 5. Fluxo de Criação de Novos Clientes (ICM & DNA Lock)

### Opção A: Via Configuração Declarativa JSON
1. Copie o template:
   ```bash
   cp configs/clients/template-elyse-luxe.json configs/clients/meu-novo-cliente.json
   ```
2. Preencha as cores, dados da marca e copy das seções.
3. Gere o site final instantaneamente:
   ```bash
   node src/generators/client-factory.js --config configs/clients/meu-novo-cliente.json --skeleton design-vault/elyse-residence-dev-webflow-io/skeleton.html
   ```

### Opção B: Via Injeção Direta de Slots
```bash
node src/generators/slot-injector.js \
  --skeleton design-vault/elyse-residence-dev-webflow-io/skeleton.html \
  --slots design-vault/elyse-residence-dev-webflow-io/content-slots.json \
  --output clientes/novo-cliente/site/index.html
```

### Opção C: Validação de Qualidade (Quality Gate)
```bash
node scripts/box-diff-linter.js clientes/novo-cliente
```
