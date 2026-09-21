# 🏛️ REFERENCE CARD: Elyse Residence (Ultra-Luxury & Real Estate Model)

> **Slug:** `elyse-residence-dev-webflow-io`  
> **Categoria:** Real Estate / Ultra-Luxury / Architectural Living / High-End Hospitality  
> **Status:** Esqueleto 100% Validado, Design DNA Extraído, Zero Dependências Externas Quebradas.

---

## 🎨 1. Design DNA & Identidade Visual

- **Paleta de Cores Mestre:**
  - `Background Primário`: `#080807` (Preto Profundo / Charcoal Luxe)
  - `Superfícies & Cards`: `rgba(255, 255, 255, 0.03)` / `#121210`
  - `Tipografia Principal`: `#fafaf9` (Off-white puro)
  - `Tipografia Suave / Legendas`: `#71717a` (Cinza neutro)
  - `Destaques & Bordas`: `rgba(255, 255, 255, 0.12)`
- **Tipografia Fluida:**
  - Escala base responsiva baseada em viewport: `font-size: calc(16 * (100vw / 1920))`
  - Serifas refinadas para headings e títulos com glare sutil.

---

## ⚙️ 2. Mecanismos & Motores de Animação

1. **Hero Background Video com Fallback:**
   - Loop em vídeo 100vh com suporte a HTTP 206 streaming (`.mp4` / `.webm`).
   - SplitText 3D de caracteres com animação em cascata (`stagger: 0.08`, `ease: 'power3.out'`).
2. **Carrossel Splide Sincronizado (`.projects-slider`):**
   - Slider contínuo com paginação customizada e títulos flutuantes sincronizados (`.project-titles`).
3. **Amenities Pinned Masked Slices (`.amenities`):**
   - Trilho de scroll fixo (`.anim-track`) com efeito fatiado de 30 gradientes dinâmicos lineares (`--mask-gradient`) e revelação por `clip-path: inset(...)`.
   - Transição sequencial de 3 camadas de texto sincronizadas pelo GSAP ScrollTrigger.
4. **FAQ Accordion Interativo:**
   - Accordion com expansão em Grid (`0fr` ➔ `1fr`) e transição suave de altura.
5. **CTA & Formulário Interativo:**
   - Inputs com botões de limpeza instantânea (`.input-clear-btn`) e validação nativa.

---

## 📂 3. Arquivos do Modelo no Vault

- [`skeleton.html`](file:///c:/Users/wd/Documents/playwright-scraper/design-vault/elyse-residence-dev-webflow-io/skeleton.html): Esqueleto base pronto para injeção semântica.
- [`content-slots.json`](file:///c:/Users/wd/Documents/playwright-scraper/design-vault/elyse-residence-dev-webflow-io/content-slots.json): Mapeamento de todos os slots de texto e copy.
- [`tokens.json`](file:///c:/Users/wd/Documents/playwright-scraper/design-vault/elyse-residence-dev-webflow-io/tokens.json): Compilação completa de cores, fontes e espaçamentos.
- [`tailwind.config.js`](file:///c:/Users/wd/Documents/playwright-scraper/design-vault/elyse-residence-dev-webflow-io/tailwind.config.js): Configuração Tailwind correspondente ao Design DNA.
- [`brand-spec.template.json`](file:///c:/Users/wd/Documents/playwright-scraper/design-vault/elyse-residence-dev-webflow-io/brand-spec.template.json): Template JSON para criação de novos clientes baseados neste modelo.

---

## ⚡ 4. Como Usar de Referência para um Novo Cliente

Para transmutar este esqueleto para um novo cliente:
1. Copie o template:
   ```bash
   cp design-vault/elyse-residence-dev-webflow-io/brand-spec.template.json configs/clients/meu-novo-cliente.json
   ```
2. Edite os textos, cores e imagens no JSON do cliente.
3. Execute o gerador de clientes:
   ```bash
   npm run client -- --config configs/clients/meu-novo-cliente.json --skeleton design-vault/elyse-residence-dev-webflow-io/skeleton.html
   ```
