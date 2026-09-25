# 🏛️ REFERENCE CARD: Khanh Nguyen Portfolio (Awwwards Horizontal Editorial Masterpiece)

> **Slug:** `khanhnguyen-design`  
> **Arquétipo:** Portfolio Pessoal / Estúdio Criativo / Editorial de Luxo / Horizontal Pin Scroll  
> **Status:** 🟢 **Referência 100% Funcional e Verificada** (Auditada via Chromium Headless, 0 erros JS, 19/19 imagens válidas, vídeos locais 1080p, GSAP + Lenis operando com alta fidelidade).

---

## 🎨 1. Design DNA & Identidade Visual

### 1.1 Paleta Cromática de Superfícies & Contraste
O site utiliza uma transição tonal sofisticada entre superfícies quentes e neutras (Stone, Clay, Taupe, Sand e Off-Black):

- **Loading & Intro Base:** `#262220` (Dark Umber / Espresso) ➔ Overlay `#3A3632` (Warm Graphite)
- **About Chapter I & Services:** `#faf9f6` (Alabaster / Off-White quente) com tipografia `#2e2b28`
- **More Work Interlude:** `#edeae6` (Warm Sandstone)
- **Selected Work Gallery:** `#2e2b28` (Dark Clay / Charcoal) com tipografia `#faf9f6`
- **Clients & Collaborations:** `#edeae6` (Warm Sandstone)
- **Footer & Colophon:** `#1f1d1b` (Deep Espresso Night) com tipografia `#cccccc` e acentos `#8a8178`

### 1.2 Tipografia Editorial & Escala Fluida
- **Fonte Display Headings:** `PP Editorial Old` / `Editorial New` (com ligaduras discricionárias ativas `font-editorial-dlig`).
- **Fonte Body & Dados:** `PP Neue Montreal` (limpa, brutalista suave, com numerais tabulares `tabular-nums`).
- **Motor de Escala Proporcional:** Todas as dimensões de fonte e espaçamentos usam variáveis proporcionais baseadas em `--scale`:
  - `font-size: calc(X * var(--scale))`
  - Escala desktop calibrada para `1440px` (`--scale: 1vw * 10 / 14.4`), garantindo proporções imutáveis independente da resolução da tela.

---

## ⚙️ 2. Mecanismos & Cinemática de Movimento (Motion Physics)

### 2.1 Trilho de Scroll Horizontal com Pin GSAP & Lenis (`initHorizontalScroll`)
- **Mecânica Central:** A section `[data-horizontal-pin]` é fixada no topo via ScrollTrigger dentro de um container `.pin-spacer` de `14.124px`.
- **Deslocamento:** Conforme o usuário rola verticalmente a página, o container `[data-horizontal-track]` sofre uma translação horizontal contínua de `transform: matrix(1, 0, 0, 1, -X, 0)`.
- **Inércia Suave:** O motor Lenis (`class="lenis"`) intercepta a rolagem da roda do mouse e do teclado, suavizando a inércia em 60 FPS estáveis.

### 2.2 Sequência de Abertura / Loading Intro Gate (`Loading.astro` + `loadingIntroGate`)
- **T=0s a 2.85s (Ticker dos Anos):** O marcador numérico rola os últimos dois dígitos de `2013` até `2026` usando `[data-year-strip]` em numerais tabulares.
- **T=3.5s a 4.5s (Ascensão & Expansão):** A cortina base `[data-loading-base-overlay]` escala verticalmente de `8px` até cobrir `100vh` em cor `#3A3632`.
- **T=4.0s (Unmasking do Nome):** O nome principal "Khanh Nguyen" sofre um desmascaramento palavra por palavra (`overflow: hidden` com `.word { translateY(0) }`) em tipografia serifada de alto luxo com ligaduras editoriais.
- **T=5.0s (Revelação de Contexto):** O relógio ao vivo (Saigon GMT+7), a frase de posicionamento ("Independent designer based in Vietnam...") e o indicador de scroll se revelam. O portão `loadingIntroGate` libera a interatividade do cabeçalho e os gatilhos das seções seguintes.

### 2.3 Pausa Cinemática "More Work" (`data-more-work-section`)
- **Detecção do Centro:** Ao alcançar o centro exato da viewport (`k = -n.offsetLeft + (v.width - n.offsetWidth) / 2`), o ScrollTrigger injeta uma label `"mwPause"`.
- **Congelamento Horizontal:** O movimento lateral do trilho é temporariamente pausado durante uma distância de rolagem equivalente a `v.height`.
- **Expansão do Frame de Vídeo:** O container `[data-more-work-rect]` escala de `scale: 0` até preencher `100vw × 100vh` (`scale: W`).
- **Afastamento Tipográfico Dinâmico:** As palavras "MORE" e "WORK" se afastam lateralmente para as bordas da tela enquanto o vídeo em alta definição (`thework-desktop.BOEUPLXP.mp4`) é reproduzido em loop.
- **Retomada:** Concluída a escala, o trilho retoma seu deslocamento horizontal normal até a galeria de trabalhos.

### 2.4 Galeria Interativa com Preview Flutuante ("Selected Work")
- **Escala Instantânea no Hover:** Ao passar o mouse sobre um item `[data-work-item-index]`, a imagem de preview correspondente em `[data-work-preview]` escala de `scale: 0` para `scale: 1` em `0.45s` com desaceleração cinematográfica `power3.out`.
- **Atenuação Concorrente (Dimming):** Todos os itens da lista que não estão sob o cursor têm sua opacidade reduzida para `0.25`, mantendo o foco total no item ativo.
- **Micro-interações:** A seta direcional desliza com curva cúbica `cubic-bezier(0.22, 1, 0.36, 1)` e a linha delimitadora sofre expansão `scaleX: 1`.

### 2.5 Menu Fullscreen Modal (`<dialog id="fullscreen-menu">`)
- **Abertura Fluida por Máscara:** Animação de corte `clipPath: inset(0 100% 0 0)` ➔ `inset(0 0% 0 0)` em `0.88s` com `power3.out`.
- **Trava de Scroll:** O módulo `documentScrollLock` congela o scroll do body enquanto o menu está aberto.
- **Ícone Burger Bifurcado:** O botão `#menu-toggle` morfa as duas barras (`data-menu-icon-bar="upper"` e `lower`) em um "X" estilizado.
- **Fechamento Reverso:** Ao clicar em fechar ou teclar ESC, o menu reverte a timeline em `0.58s` e fecha a tag nativa `<dialog>` no callback de `0.66s`, restaurando o tema do cabeçalho original.

### 2.6 Cabeçalho Adaptativo Inteligente (`Header.astro` + `headerTheme`)
- **Trilho Vertical Fixo:** No desktop, o cabeçalho funciona como uma barra lateral esquerda minimalista de `64px` de largura contendo logotipo SVG, barra de progresso vertical e botão de navegação.
- **Transição de Tema Dinâmica:** Cada seção horizontal declara seus atributos:
  - `data-header-bg`
  - `data-header-text`
  - `data-header-border`
- Conforme o trilho desliza, o cabeçalho interpola suas cores em `500ms ease-out`.

---

## 📱 3. Divergência Responsiva & Mobile Architecture

1. **Desktop (`>= 768px`):**
   - Trilho horizontal contínuo (`flex-direction: row, flex-nowrap`).
   - Cabeçalho em barra lateral esquerda vertical (`width: 64px, flex-col`).
   - Preview flutuante de imagens no hover.
2. **Mobile (`< 768px`):**
   - Transforma-se automaticamente em fluxo vertical convencional (`flex-direction: column`).
   - Cabeçalho migra para o topo em formato de barra horizontal (`width: 100%, height: 65px, flex-row`).
   - Vídeo otimizado para formato vertical (`thework-mobile.DFnsCk-1.mp4`).
3. **Barreira para Tablets em Modo Retrato (`768px - 1024px portrait`):**
   - Exibe a tela de aviso `.tablet-orientation-notice` com instrução e ícone giratório solicitando que o usuário gire o tablet para o modo paisagem para desfrutar da experiência horizontal.

---

## 📂 4. Arquivos do Modelo no Design Vault

- [`brand-spec.template.json`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/design-vault/khanhnguyen-design/brand-spec.template.json): Template de marca, SEO, paletas e copy.
- [`content-slots.template.json`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/design-vault/khanhnguyen-design/content-slots.template.json): Mapeamento declarativo de todos os slots de substituição textual e de mídia.
- [`composition-spec.template.json`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/design-vault/khanhnguyen-design/composition-spec.template.json): Especificação de compilação para o motor determinístico universal (`transmuter.js`).
- [`tokens.json`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/design-vault/khanhnguyen-design/tokens.json): Compilação de 27 cores, 21 famílias tipográficas e easings GSAP.
- [`tailwind.config.js`](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/design-vault/khanhnguyen-design/tailwind.config.js): Configuração Tailwind CSS representativa.

---

## ⚡ 5. Protocolo de Transmutação para Novos Clientes

Para transmutar esta referência para um novo cliente:
1. Crie a pasta do cliente em `clientes/<novo-cliente-slug>/`.
2. Configure o `brand-spec.json` e `content-slots.json` a partir dos templates do vault.
3. Execute a compilação determinística:
   ```bash
   node -e "
     const { runDeterministicTransmutation, createCompositionSpec } = require('./src/pipeline/transmuter.js');
     const brandSpec = require('./clientes/<slug>/brand-spec.json');
     const contentSlots = require('./clientes/<slug>/content-slots.json');
     const compSpec = createCompositionSpec({ refSlug: 'khanhnguyen-design', brandSpec, contentSlots });
     runDeterministicTransmutation({
       skeletonPath: './copias/khanhnguyen-design/site/index.html',
       compositionSpec: compSpec,
       outputPath: './clientes/<slug>/site/index.html',
       clientDir: './clientes/<slug>'
     });
   "
   ```
4. Verifique o resultado no linter de fidelidade:
   ```bash
   npm run audit -- <slug>
   ```
