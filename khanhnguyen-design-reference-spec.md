# 🧬 Referência Completa para Transmutação — `khanhnguyen-design`

> **Evidência:** Todas as mecânicas abaixo foram **observadas em runtime** via Chromium Headless (Playwright) contra `http://localhost:4000/copias/khanhnguyen-design/site/index.html`.  
> **Status do Gate:** `APROVADO` — 0 erros JS, 19/19 imagens, 2/2 vídeos locais, GSAP+Lenis operacionais.  
> **Branch:** `feature/clone-khanhnguyen-portfolio` — commit `a36457e` (working tree clean).

---

## Parte I — Mecânicas Perdidas: Investigação & Veredito

### Resultado: ✅ Nenhuma mecânica perdida detectada

Cada subsistema do site original foi testado individualmente em runtime:

| Subsistema | Método de Verificação | Status |
|---|---|---|
| Horizontal Pin + Track | `pin-spacer` criado com `height: 14124px`; `transform: matrix(1,0,0,1,-3000,0)` a 3000px, `-6920` a 8000px | ✅ Operacional |
| Loading Intro Timeline (0–6s) | Year strip ticking, name unmasking, clock GMT+7 (`20:17`) ao vivo | ✅ Operacional |
| Fullscreen Menu `<dialog>` | Open → `true` após click; Close → `false` após `[data-menu-close]` (1.2s) | ✅ Operacional |
| More Work Kinetic Video Pause | Vídeo desktop reproduzindo (`paused: false`, `currentTime: 1.4s`, `readyState: 4`) | ✅ Operacional |
| Selected Work Hover Preview | Scale `0→0.96→1.0` com dimming `opacity: 0.25` nos não-hover | ✅ Operacional |
| Header Theme Adaptation | Cores mudam de `rgb(58,54,50)` para `rgb(237,234,230)` conforme seção | ✅ Operacional |
| Vídeo Mobile (vertical) | `thework-mobile.DFnsCk-1.mp4` — `readyState: 4`, `1080×1920` | ✅ Presente |
| Tablet Orientation Barrier | `.tablet-orientation-notice` ativo em `768–1024px portrait` | ✅ Presente |
| Lenis Smooth Scroll | `class="lenis"` no `<html>`, módulo `lenis.UMZrGmQz.js` carregado | ✅ Operacional |

---

## Parte II — Categorização Exaustiva de Características

---

### 🏗️ A. ARQUITETURA GLOBAL

#### A.1 Stack Tecnológico Original
- **Framework:** Astro v6.3.1 (SSG — Static Site Generation)
- **CSS:** Tailwind CSS (classes utilitárias inline com `arbitrary values`)
- **Animação:** GSAP 3 + ScrollTrigger (com licenciamento Club Green Sock)
- **Scroll Inercial:** Lenis (`lenis.UMZrGmQz.js`)
- **Tipografia:** PP Editorial Old (Display/Serifas) + PP Neue Montreal (Body/Sans)
- **Build Output:** HTML estático com 14 módulos ES `type="module"` em `_astro/`

#### A.2 Estrutura de Módulos JavaScript (14 scripts)

```
Script #1:  inline (8234 chars)    — Universal Resilience Polyfills (SplitText, stubs, unhide)
Script #2:  [module] Header.astro  — Cabeçalho adaptativo + barra de progresso
Script #3:  [module] FullscreenMenu.astro — Dialog modal + timeline de abertura/fecho
Script #4:  [module] TabletOrientationNotice.astro — Barreira de retrato
Script #5:  [module] Loading.astro — Sequência de intro (year strip + name unmasking)
Script #6:  [module] About.astro   — Chapter I reveals de texto
Script #7:  [module] Work.astro    — Gallery hover preview + dimming
Script #8:  [module] Services.astro — Cards de capacidades
Script #9:  [module] Clients.astro — Lista de clientes com hover dimming
Script #10: [module] Footer.astro  — Colophon + contato
Script #11: [module] Layout.astro  — Orchestração global + Lenis init
Script #12: [module] index.astro   — Entry point da página
Script #13: inline (132 chars)     — Micro-bootstrap
Script #14: inline (25878 chars)   — Universal Scroll Director (SplitText, 3D Spinner, etc.)
```

#### A.3 Bibliotecas Compartilhadas (`_astro/`)

| Módulo | Função |
|---|---|
| `setup.ehf6vWB0.js` | GSAP core (`gsap`) + ScrollTrigger export |
| `motion.C0Ky0Fmd.js` | Detecção de `prefers-reduced-motion` |
| `lenis.UMZrGmQz.js` | Motor Lenis de scroll inercial |
| `horizontalScrollContainer.CTQOhTfX.js` | Referência global ao container animation |
| `initHorizontalScroll.LNLCK81L.js` | Pin, track, More Work pause, mobile fallback |
| `initScrollLineReveals.rjpb3OL8.js` | Reveals de texto por scroll |
| `initScrollImageReveals.u9E5zVAx.js` | Reveals de imagem por scroll |
| `initLinkUnderline.DiQWWF0g.js` | Underline animado em links |
| `initPageTransitions.Ca9oQZ18.js` | Dissolve/curtain entre seções |
| `lineReveal.H_AATCsH.js` | Motor de reveal por linha + SplitText |
| `loadingIntroGate.BVGlbxOq.js` | Portão que libera interatividade pós-intro |
| `loadingTextMotion.CqQT0suC.js` | Animação do texto na intro |
| `loadingLineRevealMotion.BK1HFXxq.js` | Reveal de linhas na intro |
| `headerTheme.BVy9gA6p.js` | Interpolação de cores do cabeçalho |
| `menuIconBars.BHRpb_Rb.js` | Morph do ícone hamburger ↔ X |
| `documentScrollLock.Bf2ZIqRA.js` | Lock/unlock de scroll durante menu |
| `documentScroll.C4Kpgcwa.js` | Utilitário de scroll position |
| `safeRefresh.B6s9ntyA.js` | ScrollTrigger.refresh() debounced |

---

### 📐 B. LAYOUT & COMPOSIÇÃO ESPACIAL

#### B.1 Trilho Horizontal (Escolha Fundamental: Scroll Lateral)

**Decisão Arquitetônica Central:** O site NÃO faz scroll lateral nativo. Em vez disso, ele:

1. Fixa (`pin`) o container `[data-horizontal-pin]` no topo da viewport via `ScrollTrigger.create({ pin: true })`
2. Cria um `.pin-spacer` invisível de **14.124px de altura** para representar o "comprimento virtual" do scroll
3. Conforme o usuário rola **verticalmente**, o track `[data-horizontal-track]` é transladado **horizontalmente** via `transform: translateX(-Xpx)` em sincronia com `scrollY`
4. Lenis suaviza a inércia da roda do mouse, criando a ilusão de scroll lateral nativo

**Fórmula do deslocamento:**
```
translateX = -(scrollY / pinSpacerHeight) * (trackTotalWidth - viewportWidth)
```

**Dados observados em runtime:**
- Pin spacer: `14124px`
- `scrollY=0` → `matrix(1,0,0,1,-0.001,0)` (repouso)
- `scrollY=3000` → `matrix(1,0,0,1,-3000,0)`
- `scrollY=8000` → `matrix(1,0,0,1,-6920,0)` (não linear — pausa do More Work)

#### B.2 Composição dos 8 Painéis Horizontais

Cada painel é uma `<section>` com `shrink-0` + `md:h-dvh` dentro do flex row:

| # | Painel | Largura | Posição X | Cor de Fundo | Cor de Texto |
|---|---|---|---|---|---|
| 0 | Header (sidebar) | 64px | 0 | `--header-bg` | `--header-text` |
| 1 | Loading / Hero | 1920px | 0 | `#262220` | `#f3eee8` |
| 2 | About — Chapter I | 1920px | 1920 | `#faf9f6` | `#2e2b28` |
| 3 | Services — Chapter III | 1920px | 3840 | `#faf9f6` | `#2e2b28` |
| 4 | More Work Interlude | 1920px | 5760 | `#edeae6` | `#2e2b28` |
| 5 | Selected Work — Chapter II | 2364px | 7680 | `#2e2b28` | `#faf9f6` |
| 6 | Clients — Chapter IV | 1920px | 10044 | `#edeae6` | `#2e2b28` |
| 7 | Contact / Footer | 1920px | 11964 | `#1f1d1b` | `#ccc` |

**Largura total do track:** `~13.884px` (soma dos painéis)

#### B.3 Escala Proporcional & Sistema de Viewport Units

Todo o layout usa uma variável CSS `--scale` derivada da largura do viewport:

```css
/* Calculada em runtime */
--scale: calc(10vw / 14.4);   /* Para base 1440px → 1.0x */
--vg: calc(4 * var(--scale));  /* Vertical gutter */
```

Isso garante que fontes, espaçamentos e dimensões mantêm **proporções matemáticas constantes** em qualquer resolução, sem breakpoints fracionários.

---

### 🎬 C. CINEMÁTICA & FÍSICA DE MOVIMENTO

#### C.1 Sequência de Abertura (Loading Intro Timeline)

```
T = 0.0s  ─── Tela escura (#262220), contador de anos invisível
│
T = 0.0s → 2.85s ─── Year Strip Ticker
│   • [data-year-strip] translada verticalmente
│   • Exibe "13" → "14" → ... → "26" em numerais tabulares
│   • Fonte: PP Neue Montreal, peso regular
│
T = 3.5s ─── Base Overlay Expansion
│   • [data-loading-base-overlay] escala de 8px → 100vh
│   • Cor: #3A3632 (Warm Graphite)
│   • origin: bottom-left
│
T = 3.5s → 4.5s ─── Year Row Ascensão
│   • [data-year-row] translada para cima (-181px)
│   • opacity: 1 → 0 (crossfade com o nome)
│
T = 4.0s ─── Nome Principal Unmasking
│   • "Khanh" (word 1) e "Nguyen" (word 2)
│   • Container: overflow:hidden + translateY(100%) → translateY(0)
│   • Fonte: PP Editorial Old com ligaduras discretas (dlig)
│   • Tamanho: calc(18.1 * var(--scale)) no desktop
│
T = 5.0s ─── Revelação de Contexto
│   • Tagline: "Independent designer based in Vietnam..."
│   • Localização: "HCMC, Vietnam"
│   • Relógio ao vivo: "(GMT+7) 20:17" [data-clock] atualiza a cada minuto
│   • Indicador "SCROLL" em serifas uppercase
│   • "Open for collaborations" em reveal por linha
│
T = 5.5s ─── Header Fade-in
│   • opacity: 0 → 1 (cabeçalho lateral aparece)
│   • loadingIntroGate.j() e P() liberam o pin horizontal
│
T = 6.0s ─── Página completamente interativa
```

#### C.2 Pausa Cinemática "More Work" (Kinetic Video Freeze)

Quando a seção "More Work" (painel #4) atinge o centro do viewport:

1. **ScrollTrigger injeta label `"mwPause"`** → trilho horizontal congela
2. **Frame do vídeo** `[data-more-work-rect]` escala de `0` até cobrir toda a tela:
   - `scale: 0 → W` (onde `W = max(viewportW/rectW, viewportH/rectH)`)
   - Duração: equivalente a `viewportHeight` pixels de scroll
3. **Tipografia "MORE" e "WORK"** se afastam lateralmente:
   - "MORE" → `x: +textOffset`
   - "WORK" → `x: -textOffset`
4. **Vídeo** `thework-desktop.BOEUPLXP.mp4` (1920×1080, 13MB) inicia reprodução em loop
5. **Retomada:** após a transição, o trilho reinicia o deslocamento horizontal normal

**No mobile (<768px):** a pausa é vertical, com o rect escalando no eixo Y e pinado com `pinSpacing: true`.

#### C.3 Curvas de Easing Utilizadas

| Contexto | Curva | CSS / GSAP |
|---|---|---|
| Hover de Work Items | Cinematic Snappy | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Menu clipPath reveal | Power3 Out | `power3.out` |
| Menu clipPath close | Power3 In | `power3.in` |
| Work image scale | Smooth Deceleration | `power3.out` (0.45s) |
| Header color transition | CSS ease-out | `transition: 500ms ease-out` |
| Scroll progress bar | Linear proporcional | `ease: "none"` |
| Line reveals | Snappy Cinema | `power2.out` |
| Year strip tick | None (scrubbed) | `ease: "none"` (vinculado ao scroll) |

#### C.4 Reveals de Texto por Linha (`lineReveal.H_AATCsH.js`)

**Mecânica:**
1. Cada `[data-reveal-line]` é processado pelo SplitText em `.line` wrappers
2. Estado inicial: `opacity: 0`, `yPercent: 102%`
3. Ao entrar no viewport (ScrollTrigger `once: true`): stagger de `0.07s` por bloco
4. Duração: `1.0s` com `power2.out`
5. Gap entre blocos: `0.15s`

#### C.5 Barra de Progresso de Scroll (`[data-header-scroll-progress]`)

- Elemento: div absoluto na borda inferior do header (mobile) ou borda direita (desktop)
- Cor: `#8A8178`
- Escala: `scaleX` (mobile) ou `scaleY` (desktop) de 0 a 1, vinculada ao progresso do ScrollTrigger horizontal
- `will-change: transform` para GPU promotion

---

### 🖱️ D. INTERATIVIDADE & MICRO-INTERAÇÕES

#### D.1 Galeria "Selected Work" — Hover Preview System

**Componentes:**
- **Lista de projetos:** 4 items `[data-work-item-index="0..3"]`
- **Frame de preview:** `[data-work-preview]` (container fixo)
- **Imagens de preview:** `img[data-work-image="0..3"]` (WebP 16:9)

**Projetos presentes:**

| Index | Título | Thumbnail |
|---|---|---|
| 0 | EVO Money | `evo-money-thumbnail-16-9.B00Lym5-_qy4LO.webp` |
| 1 | Plant Tag | `plant-tag-thumbnail-16-9.CEaBMfaz_Z64N3z.webp` |
| 2 | Swiss Haus | `swisshaus-thumbnail-16-9.Dl-P9oLP_Z1jbLrY.webp` |
| 3 | Betahaus | `betahaus-thumbnail-16-9.ZH-WOOsP_GLeLu.webp` |

**Comportamento no hover:**
1. Imagem ativa: `scale: 0 → 1` em `0.45s` `power3.out`
2. Imagens inativas: `autoAlpha: 0, scale: 0, zIndex: 0`
3. Textos dos projetos não-hovereados: `opacity: 0.25`
4. Seta direcional: `translate(0) scale(1)` com `cubic-bezier(0.22, 1, 0.36, 1)`
5. Linha decorativa: `scaleX: 0 → 1` em `1.0s`

**Sistema de zIndex dinâmico:** Cada nova imagem ativa recebe `zIndex: p++` crescente. Ao completar a transição, todas as anteriores são resetadas para `zIndex: 0`.

#### D.2 Fullscreen Menu — Lifecycle Completo

```
[Fechado] ──click #menu-toggle──→ [Abrindo]
  │                                    │
  │  1. Salva tema atual do header     │
  │  2. Aplica tema do menu            │
  │     (#2e2b28 bg, #faf9f6 text)     │
  │  3. e.show() (native <dialog>)     │
  │  4. documentScrollLock(true)        │
  │  5. aria-expanded="true"            │
  │  6. main.inert = true              │
  │  7. Menu icon bars → morph "X"     │
  │                                    │
  │  8. clipPath: inset(0 100% 0 0)    │
  │     → inset(0 0% 0 0) (0.88s)     │
  │  9. Nav items stagger reveal       │
  │     (0.07s each, 1.0s duration)    │
  │ 10. Social links reveal            │
  │ 11. Active nav line scaleX: 0→1    │
  │ 12. Focus → [data-menu-close]      │
  │                                    ▼
[Aberto] ──click close / ESC / toggle──→ [Fechando]
  │                                    │
  │  1. Active line scaleX: 1→0        │
  │  2. Todos os reveals revertem      │
  │     (power3.in)                    │
  │  3. clipPath: inset(0 0% 0 0)     │
  │     → inset(0 100% 0 0) (0.58s)   │
  │  4. Callback em 0.66s:            │
  │     - e.close()                    │
  │     - Restaura tema do header      │
  │     - documentScrollLock(false)    │
  │     - main.inert = false           │
  │     - aria-expanded="false"        │
  │     - Focus → #menu-toggle         │
  │                                    ▼
[Fechado]
```

**Items de navegação do menu:**
1. `01. Home` → `/` (aria-current="page")
2. `02. About` → `/about`
3. `03. Works` → `/works`
4. `04. Contact` → `mailto:kennguyen02587@gmail.com`

**Links sociais:** Instagram, Behance, Linkedin

#### D.3 Clients Row Dimming

- Ao hoverar qualquer `[data-client-row]`:
  - Target: `opacity: 1.0`
  - Todos os outros: `opacity: 0.25`
- Clientes: Trusting Social, Vietnamwork, Autonomous, VEN Agency, Glass Egg, And more

#### D.4 Link Underline Animado (`initLinkUnderline.DiQWWF0g.js`)

- Atributo: `data-to-link-underline`
- Estado: `data-underline-filled="false"` → `"true"` no hover
- Fase: `data-underline-phase="idle"` → `"filling"` → `"filled"`
- Animação: pseudo-elemento que se expande da esquerda para a direita

---

### 📱 E. RESPONSIVIDADE & BREAKPOINTS

#### E.1 Desktop (`md:` ≥ 768px)
- Layout: **Horizontal Pin Scroll** (trilho flex-row)
- Header: **Barra lateral esquerda vertical** (64px × 100vh)
- Work Preview: **Hover com imagem flutuante**
- Vídeo: `thework-desktop.BOEUPLXP.mp4` (1920×1080)

#### E.2 Mobile (`< 768px`)
- Layout: **Vertical convencional** (flex-column)
- Header: **Barra superior horizontal** (390px × 65px)
- Work Preview: **Sem hover** (touch-friendly)
- Vídeo: `thework-mobile.DFnsCk-1.mp4` (1080×1920)
- Menu: Ocupa 100% da tela, ícone de fechar visível no header fixo

#### E.3 Tablet Portrait (`768px–1024px, orientation: portrait`)
- **Barreira ativa:** `.tablet-orientation-notice` cobre toda a tela
- Ícone rotacional + mensagem: "Rotate your screen"
- Subfrase: "Please turn your tablet to landscape for the best viewing experience."

---

### 🎨 F. SISTEMA DE CORES COMPLETO

#### F.1 Paleta por Seção (Observada no Linter Report)

| Seção | Background | Texto | Header BG | Header Border |
|---|---|---|---|---|
| Loading/Hero | `#262220` | `#f3eee8` | `#3A3632` | `#5a524d` |
| About | `#faf9f6` | `#2e2b28` | `#faf9f6` | `#e2ded9` |
| Services | `#faf9f6` | `#2e2b28` | `#faf9f6` | `#e2ded9` |
| More Work | `#edeae6` | `#2e2b28` | `#edeae6` | `#b8b3ac` |
| Selected Work | `#2e2b28` | `#faf9f6` | `#2e2b28` | `#5a524d` |
| Clients | `#edeae6` | `#2e2b28` | `#edeae6` | `#b8b3ac` |
| Contact | `#1f1d1b` | `#ccc` | `#1f1d1b` | `#5a524d` |
| Menu | `#2e2b28` | `#faf9f6` | `#2e2b28` | `#5a524d` |

#### F.2 Cores Funcionais

- **Scroll Progress Bar:** `#8A8178`
- **Muted Text / Footer:** `#c8c0b8` e `#faf9f6/90` (com opacidade)
- **Placeholder Text:** `#faf9f6/85`
- **Menu Dim (nav inactive):** `opacity: 0.25`
- **Work Dim (non-hover):** `opacity: 0.25`

---

### ✍️ G. TIPOGRAFIA & FONTES

#### G.1 Famílias Tipográficas

| Uso | Família | Classe CSS |
|---|---|---|
| Display / Headings | PP Editorial Old | `font-serif-2`, `font-editorial-dlig` |
| SVG Logo | Custom SVG paths | Renderizado inline |
| Body / Dados | PP Neue Montreal | (default sans stack) |
| Numerais | PP Neue Montreal | `tabular-nums` |

#### G.2 Escalas Tipográficas (desktop)

| Elemento | Tamanho |
|---|---|
| Nome Hero | `calc(18.1 * var(--scale))` |
| Year Strip | `calc(18.1 * var(--scale))` |
| Nome mobile | `calc(9 * var(--scale))` |
| Menu nav items | `min(20vh, 15vw)` |
| Menu nav mobile | `calc(6.8 * var(--scale))` |
| Tagline | `calc(1.8 * var(--scale))` (mobile), variável desktop |
| Header text | `calc(1.1 * var(--scale))` |
| Folio Edition | `calc(1 * var(--scale))` |

#### G.3 Features Tipográficas Especiais
- **Ligaduras discretas:** `font-editorial-dlig` (ativo no nome "Khanh" para glifos conectados)
- **Numerais tabulares:** `tabular-nums` (year strip, relógio ao vivo)
- **Tracking negativo:** `tracking-[-0.04em]` (menu items, headings)
- **Writing mode vertical:** `vt-rl vt-reading-up` (sidebar "Folio — Edition" e "© 2026")

---

### 🔊 H. MÍDIA & ASSETS

#### H.1 Vídeos Locais (Offline, Zero CDN)
| Arquivo | Resolução | Tamanho | Uso |
|---|---|---|---|
| `thework-desktop.BOEUPLXP.mp4` | 1920×1080 | 13 MB | More Work desktop |
| `thework-mobile.DFnsCk-1.mp4` | 1080×1920 | 9 MB | More Work mobile |

#### H.2 Imagens WebP (Thumbnails de Projetos)
| Arquivo | Projeto |
|---|---|
| `evo-money-thumbnail-16-9.B00Lym5-_qy4LO.webp` | EVO Money |
| `plant-tag-thumbnail-16-9.CEaBMfaz_Z64N3z.webp` | Plant Tag |
| `swisshaus-thumbnail-16-9.Dl-P9oLP_Z1jbLrY.webp` | Swiss Haus |
| `betahaus-thumbnail-16-9.ZH-WOOsP_GLeLu.webp` | Betahaus |

#### H.3 SVGs Inline
- Logo "KNM" (mobile header): Paths vetoriais inline, `fill="currentColor"`
- Logo vertical (desktop sidebar): "KHANH NGUYEN" em SVG tipográfico rotacionado
- Ícone hamburger: 3 rects com animação de morph
- Ícone rotação (tablet notice): SVG de dispositivo com setas

---

### 📦 I. CONTEÚDO TEXTUAL POR SEÇÃO (Copy Map)

#### I.1 Loading / Hero
- **Anos:** 2013 → 2026
- **Nome:** Khanh / Nguyen
- **Tagline:** "Independent designer based in Vietnam — focused on thoughtful, considered digital work."
- **Localização:** HCMC, Vietnam
- **Timezone:** (GMT+7) + relógio ao vivo
- **Journey Line:** "A journey through years of design"
- **Status:** "Open for collaborations"
- **Prompt:** "SCROLL"

#### I.2 About — Chapter I
- **Label:** "Chapter I" / "Quick intro"
- **Bio:** "Hi, I'm Khanh — a designer with 10+ years of experience in digital products, websites, and visual systems, creating clear and thoughtful experiences."

#### I.3 More Work
- **Text:** "The Work" (com "MORE" e "WORK" separados na pausa cinemática)

#### I.4 Selected Work — Chapter II
- **Label:** "Chapter II" / "Related work"
- **4 Projetos:** EVO Money, Plant Tag, Swiss Haus, Betahaus
- **CTA:** "View All Work"
- **Disclaimer:** "❋ Live site unavailable for some inactive or incomplete projects"

#### I.5 Services — Chapter III
- **Label:** "Chapter III" / "What I do?"
- **Headline:** "Designing digital experiences with clarity, structure, and intention."
- **Cards:**
  1. `01` Product Design — "Digital products designed with intuitive flow..."
  2. `02` Digital Experiences — "Web experiences shaped through clarity, rhythm..."
  3. `03` Art Direction — "Visual direction focused on mood, identity..."
  4. `04` Development — "Built in Webflow or Framer, with custom development..."

#### I.6 Clients — Chapter IV
- **Label:** "Chapter IV" / "Selected experiences"
- **Lista:** Trusting Social, Vietnamwork, Autonomous, VEN Agency, Glass Egg, And more
- **Nota:** "Work spanning brands, products, and digital teams."

#### I.7 Contact / Footer
- **Pretitle:** "Where stories find their form"
- **Sub:** "Next chapter"
- **Email:** kennguyen02587@gmail.com
- **Socials:** Instagram, Behance, Linkedin
- **Copyright:** "© 2026 — khanh nguyen folio — edition"
- **Header Text:** "Folio — Edition" (sidebar) + "© 2026" (sidebar bottom)

---

## Parte III — Status da Referência para Transmutação

### ✅ Artefatos Criados no Design Vault

| Arquivo | Caminho | Propósito |
|---|---|---|
| `REFERENCE_CARD.md` | [REFERENCE_CARD.md](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/design-vault/khanhnguyen-design/REFERENCE_CARD.md) | Documentação técnica completa |
| `brand-spec.template.json` | [brand-spec.template.json](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/design-vault/khanhnguyen-design/brand-spec.template.json) | Template de marca para novo cliente |
| `content-slots.template.json` | [content-slots.template.json](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/design-vault/khanhnguyen-design/content-slots.template.json) | Mapeamento declarativo de todos os slots |
| `composition-spec.template.json` | [composition-spec.template.json](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/design-vault/khanhnguyen-design/composition-spec.template.json) | Spec de compilação para `transmuter.js` |
| `tokens.json` | [tokens.json](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/design-vault/khanhnguyen-design/tokens.json) | 27 cores, 21 fontes, easings |
| `tailwind.config.js` | [tailwind.config.js](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/design-vault/khanhnguyen-design/tailwind.config.js) | Config Tailwind representativa |

### ✅ Registrado no Design Vault Index

- Slug: `khanhnguyen-design`
- Status: `candidate`
- Archetype: `Horizontal Editorial Portfolio / Pin Scroll`
- Provenance: `copias/khanhnguyen-design`

### ✅ Esqueleto Imutável em `copias/`

- [index.html](file:///c:/Users/USER/Documents/scraper%20e%20extracor/studio-dna-engine/copias/khanhnguyen-design/site/index.html) (117KB, 1176 linhas)
- 70 assets em `site/assets/_astro/` (JS, CSS, WebP, MP4, SVG)

### ✅ Referência Pronta para Transmutação

**Para iniciar a transmutação de um novo cliente:**

```bash
# 1. Copiar templates
cp design-vault/khanhnguyen-design/brand-spec.template.json clientes/<slug>/brand-spec.json
cp design-vault/khanhnguyen-design/content-slots.template.json clientes/<slug>/content-slots.json

# 2. Editar os JSONs com dados do novo cliente

# 3. Executar o transmuter universal
node -e "
  const t = require('./src/pipeline/transmuter.js');
  const brand = require('./clientes/<slug>/brand-spec.json');
  const slots = require('./clientes/<slug>/content-slots.json');
  const spec = t.createCompositionSpec({ refSlug: 'khanhnguyen-design', brandSpec: brand, contentSlots: slots });
  t.runDeterministicTransmutation({
    skeletonPath: './copias/khanhnguyen-design/site/index.html',
    compositionSpec: spec,
    outputPath: './clientes/<slug>/site/index.html',
    clientDir: './clientes/<slug>'
  });
"

# 4. Auditar fidelidade
npm run audit -- <slug>
```
