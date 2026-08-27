# 🚀 HANDOFF DE ENGENHARIA & TRANSIÇÃO DE CONTEXTO (V5.1 CONSOLIDADA)

> **Data:** 27 de Agosto de 2026  
> **Repositório:** `playwright-scraper` (`studio-dna-engine`)  
> **Status:** Blindagem de IA Ativa, Pipeline de Engenharia Determinística (Custo Zero de IA no Scraper), Preview Server com HTTP 206 Streaming & Proxy Self-Healing 100% Operacional, Modelo Elyse Residence Esqueletizado e Integrado ao Design Vault.

---

## 🧭 1. Resumo Executivo & Mudança de Paradigma

Após auditoria técnica e financeira completa do projeto, a transição para **Engenharia Determinística** e a **Esqueletização de Modelos de Referência** foram consolidadas:

1. **Fim do Debugging Visual "Hands-On" de IA (Custo e Latência Zero):**
   - **Eliminado:** Uso de agentes de IA inspecionando o Chrome por tentativa e erro para encontrar seletores e assets quebrados (~400.000 tokens e $2,50 por site).
   - **Implementado:** **Engenharia Determinística no Node.js/Playwright**:
     - `src/server/preview-server.js`: Suporte nativo a streaming **HTTP 206 Partial Content** (Range requests para vídeos de fundo e áudio) e **Proxy Self-Healing** (se um asset der 404, o servidor busca automaticamente na URL de origem/CDN Webflow, salva no disco em `./assets/` e entrega com status 200/206).
     - `src/pro/universal-asset-normalizer.js`: Des-externalização de CDNs (download em lote de imagens Webflow, Vercel e fontes), desativação de travas de preloader e neutralização não-destrutiva de `html.w-mod-js` (preservando o controle dinâmico do GSAP ScrollTrigger e SplitText).

2. **Esqueletização & Design Vault:**
   - O modelo **Elyse Residence** (`copias/elyse-residence-dev-webflow-io`) foi transformado em um esqueleto de referência completo no **Design Vault** (`design-vault/elyse-residence-dev-webflow-io/`):
     - `skeleton.html`: HTML base parametrizado pronto para injeção semântica.
     - `content-slots.json`: Mapeamento estruturado de 100% dos slots de copy e seções (Hero, About, Livings/Splide, Beliefs, Amenities/Pinned Mask Scroll, FAQ, CTA/Form).
     - `tokens.json` & `tailwind.config.js`: Design DNA completo (paleta Dark Luxe `#080807`, tipografia fluida `100vw / 1920`, escalas e easings).
     - `brand-spec.template.json` & `REFERENCE_CARD.md`: Documentação técnica e template para geração imediata de novos clientes em 1 comando.

3. **Blindagem de Contexto & Otimização da IA:**
   - As pastas pesadas de terceiros (`copias/`, `clientes/`, `qa-reports/`, `storage/`, `scratch/`, `node_modules/`, `*.png`) estão 100% isoladas pelas regras em `.ignore`, `.cursorignore` e `.geminiignore`.
   - Novos clientes são criados via `configs/clients/*.json` + `src/generators/ast-injector.js` (Zero scripts `.js` pontuais).

---

## 📂 2. Mapa Canônico de Arquitetura

```
playwright-scraper/
├── .ignore / .cursorignore / .geminiignore   # ⚡ Blindagem total de busca/indexação da IA
├── HANDOFF.md                                # 📖 Este documento de transição contínua
├── index.js                                  # Entrypoint do motor
├── bin/cli.js                                # CLI unificada
│
├── design-vault/                             # 🏛️ Modelos de Referência & Esqueletos
│   └── elyse-residence-dev-webflow-io/
│       ├── skeleton.html                     # Esqueleto base parametrizado
│       ├── content-slots.json                # Mapa completo de variáveis/slots
│       ├── tokens.json                       # Design tokens de cores e tipografia
│       ├── tailwind.config.js                # Tailwind Config exportada
│       ├── brand-spec.template.json          # Template para novos clientes
│       └── REFERENCE_CARD.md                 # Ficha técnica do modelo
│
├── src/
│   ├── config/index.js                       # Configuração central de caminhos e viewports
│   ├── core/
│   │   ├── cloner.js                         # Cloner Playwright + CDP
│   │   ├── detector.js                       # Detecção de stack (Webflow, Next, GSAP, etc)
│   │   └── dna-extractor.js                  # Extração dinâmica de DNA via Playwright
│   ├── extractors/
│   │   └── token-compiler.js                 # Compilador de Design Tokens
│   ├── generators/
│   │   ├── ast-injector.js                   # Transmutador AST Cheerio (Anti-Slop + Budget Guard)
│   │   ├── client-factory.js                 # Fábrica de sites para clientes
│   │   ├── slot-injector.js                  # Injeção de slots de conteúdo
│   │   └── tailwind-generator.js             # Exportador de Tailwind Config
│   ├── pro/
│   │   ├── universal-asset-normalizer.js     # Sanitização, uncloaking e download em lote de assets
│   │   ├── universal-scroll-director.js      # Ponte Lenis + ScrollTrigger + GSAP
│   │   └── advanced-asset-interceptor.js     # Interceptação de shaders, webgl e mídias
│   ├── server/
│   │   └── preview-server.js                 # Servidor local (HTTP 206 Range + Self-Healing 404 Proxy)
│   └── qa/
│       └── visual-regression.js              # Testes de regressão visual Pixelmatch
│
├── configs/clients/                          # 💡 Arquivos JSON de clientes (Zero scripts .js soltos)
│   └── template-elyse-luxe.json
│
└── copias/ e clientes/ (Isolados do git e da IA via .ignore)
```

---

## ⚡ 3. Comandos Canônicos do CLI

| Comando | Função |
| :--- | :--- |
| `npm run start` / `npm run preview` | Inicia o servidor local de preview na porta 4000 com Self-Healing e HTTP 206 ativo |
| `npm run scrape <url>` | Clona uma página de referência e normaliza os assets |
| `npm run normalize` | Executa o universal-asset-normalizer em todas as cópias existentes em lote |
| `npm run tokens` | Compila os tokens de design do site clonado para o Design Vault |
| `npm run client` | Executa a fábrica de clientes baseada em configuração JSON |
| `npm run inject` | Injeta slots de copy deterministicamente no esqueleto |

---

## 🎯 4. Como Criar um Novo Cliente Baseado no Elyse Residence

1. Copie o template:
   ```bash
   cp configs/clients/template-elyse-luxe.json configs/clients/meu-novo-cliente.json
   ```
2. Edite os dados do novo cliente (Nome, cores primárias, nicho, copy do Hero, Livings e Métricas).
3. Gere o site final instantaneamente:
   ```bash
   npm run client -- --config configs/clients/meu-novo-cliente.json --skeleton design-vault/elyse-residence-dev-webflow-io/skeleton.html
   ```
