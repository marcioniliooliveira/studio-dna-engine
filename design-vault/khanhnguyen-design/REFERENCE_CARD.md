# 🏛️ REFERENCE CARD: Khanh Nguyen Portfolio (Horizontal Pin Scroll)

> **Slug:** `khanhnguyen-design`  
> **Categoria:** High-End Editorial Portfolio / Creative Technologist / Pin Scroll  
> **Status:** `candidate` — Esqueleto Parametrizado, Design DNA Extraído, Fita de Anos Parametrizável, Zero Dependências Externas Quebradas.  
> **Proveniência:** `copias/khanhnguyen-design`

---

## 🎨 1. Design DNA & Identidade Visual

- **Paleta Cromática por Seção:**
  - `Hero / Loading`: `#262220` (Carvão Mineral Quente) / Texto: `#F3EEE8` / Header: `#3A3632`
  - `About (Chapter I)`: `#FAF9F6` (Marfim Editorial / Linho) / Texto: `#2E2B28` / Header: `#FAF9F6`
  - `More Work (Reel Freeze)`: `#FAF9F6` / Texto: `#2E2B28` / Header: `#FAF9F6`
  - `Selected Work (Chapter II)`: `#EDEAE6` (Cinza Areia) / Texto: `#2E2B28` / Header: `#EDEAE6`
  - `Services (Chapter III)`: `#2E2B28` (Carvão Escuro) / Texto: `#FAF9F6` / Header: `#2E2B28`
  - `Clients (Chapter IV)`: `#EDEAE6` (Cinza Areia) / Texto: `#2E2B28` / Header: `#EDEAE6`
  - `Contact / Colophon`: `#1F1D1B` (Obsidian Profundo) / Texto: `#CCCCCC` / Header: `#1F1D1B`
- **Tipografia Fluida:**
  - Display / Títulos: `"PP Editorial Old", serif` (tamanho: `calc(18.1 * var(--scale))`, tracking: `-0.04em`, ligaduras discretas `font-editorial-dlig`).
  - Interface / Body: `"PP Neue Montreal", ui-sans-serif, system-ui, sans-serif` (`14.66px` / `16px`).
  - Numerais: `tabular-nums` ativo em tickers e relógios.
- **Sistema Proporcional de Viewport:**
  - Base: `--scale: calc(10vw / 14.4)` (1.0x em 1440px de largura).
  - Vertical Gutter: `--vg: calc(4 * var(--scale))`.

---

## ⚙️ 2. Mecanismos & Motores de Animação

1. **Virtual Pin Scroll Horizontal:**
   - O container `[data-horizontal-pin]` é pinado via `ScrollTrigger.create({ pin: true })`.
   - Spacer virtual de `14.124px` de altura no desktop (`md:`). O scroll vertical translada o flex track horizontalmente (`translateX(0 -> -13.884px)`).
   - Motor Lenis com inércia suave (`lenis.UMZrGmQz.js`).
2. **Intro Ticker de Anos & Name Unmasking:**
   - Atributos dinâmicos `data-start-year="YYYY"` e `data-end-year="YYYY"`.
   - Fita vertical `[data-year-strip]` desliza numerais tabulares com `power4.inOut` (2.85s).
   - Nome principal surge com máscara `overflow:hidden` e `translateY(100% -> 0)`.
   - Relógio ao vivo atualizado a cada 30 segundos.
3. **Pausa Cinemática "More Work" (Video Scale Freeze):**
   - Rótulo de pausa `mwPause` injetado no ScrollTrigger. O trilho horizontal congela enquanto o frame de vídeo escala de `scale: 0` até cobrir a tela inteira com reprodução contínua.
4. **Galeria Selected Work com Hover Preview:**
   - 4 projetos em lista. Ao hoverar, thumbnail 16:9 escala `0 -> 1` com promoção de z-index dinâmico (`p++`) e atenuação dos itens inativos (`opacity: 0.25`).
5. **Fullscreen Menu Dialog:**
   - Modal nativo `<dialog id="fullscreen-menu">` com animação `clipPath: inset(0 100% 0 0)` -> `inset(0 0% 0 0)` (0.88s), morphing de ícone hamburger e bloqueio inercial de scroll (`documentScrollLock`).

---

## 📂 3. Arquivos do Modelo no Vault

- [`skeleton.html`](file:///c:/Users/wd/Documents/playwright-scraper/design-vault/khanhnguyen-design/skeleton.html): Esqueleto base com slots declarativos e fita de anos parametrizada.
- [`content-slots.template.json`](file:///c:/Users/wd/Documents/playwright-scraper/design-vault/khanhnguyen-design/content-slots.template.json): Mapeamento de slots de textos, bio, projetos e links.
- [`brand-spec.template.json`](file:///c:/Users/wd/Documents/playwright-scraper/design-vault/khanhnguyen-design/brand-spec.template.json): Template de marca e metadados.
- [`composition-spec.template.json`](file:///c:/Users/wd/Documents/playwright-scraper/design-vault/khanhnguyen-design/composition-spec.template.json): Especificação de compilação para o `transmuter.js`.
- [`tokens.json`](file:///c:/Users/wd/Documents/playwright-scraper/design-vault/khanhnguyen-design/tokens.json): Compilação completa de cores, tipografia e easings.
- [`tailwind.config.js`](file:///c:/Users/wd/Documents/playwright-scraper/design-vault/khanhnguyen-design/tailwind.config.js): Configuração Tailwind correspondente.

---

## ⚡ 4. Como Usar de Referência para um Novo Portfólio

1. **Copiar templates para a pasta do cliente:**
   ```bash
   mkdir -p clientes/meu-portfolio
   cp design-vault/khanhnguyen-design/brand-spec.template.json clientes/meu-portfolio/brand-spec.json
   cp design-vault/khanhnguyen-design/content-slots.template.json clientes/meu-portfolio/content-slots.json
   ```
2. **Editar os dados em `brand-spec.json` e `content-slots.json`.**
3. **Executar a transmutação determinística:**
   ```bash
   node -e "
     const t = require('./src/pipeline/transmuter.js');
     const brand = require('./clientes/meu-portfolio/brand-spec.json');
     const slots = require('./clientes/meu-portfolio/content-slots.json');
     const spec = t.createCompositionSpec({ refSlug: 'khanhnguyen-design', brandSpec: brand, contentSlots: slots });
     t.runDeterministicTransmutation({
       skeletonPath: './design-vault/khanhnguyen-design/skeleton.html',
       compositionSpec: spec,
       outputPath: './clientes/meu-portfolio/site/index.html',
       clientDir: './clientes/meu-portfolio'
     });
   "
   ```
