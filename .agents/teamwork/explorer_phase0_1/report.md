# Relatório de Investigação Técnica e Arquitetura de Scroll (Fase 0.1)

**Investigador:** `explorer_phase0_1` (Especialista em Scroll GSAP + Lenis e Interações 3D)  
**Data:** 2026-10-17  
**Alvo:** `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`, `src/components/WorkStage/WorkStage.tsx`, `lenis.UMZrGmQz.js`  
**Referência Autoritativa:** `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md` (Seção `## 2026-10-17T15:18:48Z`, Requisitos R1, WP-1 e Hard Guardrails 1 e 2)

---

## 1. Sumário Executivo

A investigação técnica detalhada confirmou a causa-raiz exata da imobilização e aprisionamento (deadlock) do usuário na seção "THE WORK":
1. **Deadlock de Re-Armamento Cego de `data-lenis-prevent`:** Em `initHorizontalScroll.LNLCK81L.js`, a função `syncViewportClip(pp)` injeta cegamente `viewportEl.setAttribute('data-lenis-prevent', 'true')` (junto a `data-lenis-prevent-wheel` e `data-lenis-prevent-touch`) a cada tick de `onUpdate` do GSAP ScrollTrigger assim que `pp >= 0.999`. No motor `lenis.UMZrGmQz.js`, a presença desse atributo faz com que qualquer evento de wheel ou touch sobre `#jesper-work-stage-viewport` (que cobre 100vw × 100vh) aborte a execução no `onVirtualScroll` (`return`), impedindo o avanço de `targetScroll` e paralisando completamente o scroll vertical nativo da página.
2. **Rampa Unilateral sem Ciclo de Saída:** O cálculo atual de progresso em `initHorizontalScroll.LNLCK81L.js` é uma rampa unilateral:
   $$pp = \min(1, \max(0, (cur - p) / M))$$
   Assim que a timeline avança além do ponto de abertura ($cur \ge p + M$), $pp$ satura permanentemente em $1.0$. Não existe fase de saída para o portal 3D na timeline do GSAP; consequentemente, o viewport tridimensional permanece fixado, opaco e com `pointer-events: auto` cobrindo o ecrã até o final do documento, tornando o Chapter II, Chapter III (Serviços), Chapter IV (Clientes) e Rodapé permanentemente inacessíveis.
3. **Aprisionamento em Telas Móveis (`max-width: 767px`):** O gatilho mobile fixa `data-more-work-section` durante a altura $P$ e termina abruptamente com $pp = 1.0$, deixando `data-lenis-prevent-touch="true"` e a tela coberta sem qualquer transição de saída ou retenção proporcional.
4. **Resolução Determinística (Abordagem C):** Desenvolvemos a formulação matemática completa de um **Ciclo Contínuo em 4 Fases** (Entrada Óptica $0 \to 1$, Retenção 3D $1.0$, Saída Cinematográfica $1 \to 0$ e Continuidade da Página $0.0$), aliada à eliminação do anti-padrão de `data-lenis-prevent` global e desacoplamento de listeners para fluidez ininterrupta de rolagem do topo ao rodapé (Gate 6).

---

## 2. Diagnóstico da Arquitetura Atual de Scroll

### 2.1 Estrutura DOM e Mapeamento de Trilha
- **Contêiner Raiz do Scroll:** `<main><div data-horizontal-story class="bg-[#edeae6]">`
- **Pino do GSAP (`trigger`):** `<div data-horizontal-pin class="relative w-full md:h-dvh">`
- **Trilha Horizontal (`track`):** `<div data-horizontal-track class="flex w-full flex-col md:h-dvh md:flex-row md:flex-nowrap">`
- **Seção "THE WORK":** `<section data-more-work-section data-horizontal-panel class="...">`
  - Retângulo Desktop: `[data-more-work-rect]`
  - Tipografia Desktop: `[data-more-work-more]` ("THE") e `[data-more-work-work]` ("WORK")
  - Retângulo Mobile: `[data-more-work-mobile-rect]`
- **Palco Tridimensional Jesper:**
  `<div id="jesper-work-stage-viewport" style="position: fixed; inset: 0; left: 0; top: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 15; clip-path: polygon(0 0, 0 0, 0 0, 0 0);">`
  Contém `<div id="jesper-work-stage-mount">` onde a aplicação React Three Fiber (`WorkStage.tsx`) é montada via `mount.tsx`.

### 2.2 Estrutura da Timeline GSAP Atual (Desktop)
No arquivo `initHorizontalScroll.LNLCK81L.js` (linha 1):
```javascript
const v = se(t);                                    // Dimensões da Viewport: { width, height }
const h = Math.max(0, r.scrollWidth - v.width);      // Distância total da trilha horizontal
const k = -n.offsetLeft + (v.width - n.offsetWidth) / 2; // Posição que centraliza data-more-work-section
const p = Math.max(0, -k);                           // Distância de scroll para atingir k
const Q = Math.max(0, h - p);                        // Distância restante da trilha horizontal
const M = v.height;                                  // Distância de expansão do portal (Fase 1)
const M_hold = v.height * 2.5;                       // Distância de retenção estática
const U = h + M + M_hold;                            // Extensão total de scroll do ScrollTrigger

// Construção da timeline GSAP s:
s.fromTo(r, { x: 0 }, { x: k, duration: p });       // Trecho 1: Desliza até centralizar o portal
s.addLabel("mwPause");
s.fromTo(i, { scale: 0 }, { scale: W, force3D: true, duration: M }, "mwPause"); // Expansão do rect
s.fromTo(u, { x: C }, { x: Y, force3D: true, duration: M }, "mwPause");         // "THE" afasta p/ esquerda
s.fromTo(a, { x: H }, { x: j, force3D: true, duration: M }, "mwPause");         // "WORK" afasta p/ direita
s.addLabel("mwHold");
s.to(i, { scale: W, duration: M_hold, ease: "none" }, "mwHold");                 // Retenção estática
s.fromTo(r, { x: k }, { x: -h, duration: Q });                                   // Retomada linear da trilha
```

Configuração do `ScrollTrigger`:
```javascript
d = b.create({
  trigger: t,
  animation: s,
  start: "top top",
  end: `+=${U}`,
  pin: true,
  scrub: true,
  anticipatePin: 1,
  invalidateOnRefresh: true,
  fastScrollEnd: true,
  preventOverlaps: true,
  refreshPriority: 1,
  onUpdate: self => {
    const cur = s.time();
    const pp = Math.min(1, Math.max(0, (cur - p) / M));
    syncViewportClip(pp);
    typeof window != "undefined" && window.__TEST_SET_PORTAL_PROGRESS__ && window.__TEST_SET_PORTAL_PROGRESS__(pp);
  }
});
```

---

## 3. Análise da Causa-Raiz do Deadlock do Lenis

### 3.1 O Mecanismo de Bloqueio em `lenis.UMZrGmQz.js`
Inspecionando `lenis.UMZrGmQz.js` (linha 1, método `onVirtualScroll` da classe `Lenis`):
```javascript
onVirtualScroll = t => {
  if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(t) === !1) return;
  const { deltaX: e, deltaY: i, event: s } = t;
  ...
  let a = s.composedPath();
  a = a.slice(0, a.indexOf(this.rootElement));
  const d = this.options.prevent;
  const p = Math.abs(e) >= Math.abs(i) ? "horizontal" : "vertical";
  
  if (a.find(l => l instanceof HTMLElement && (
    typeof d == "function" && d?.(l) ||
    l.hasAttribute?.("data-lenis-prevent") ||
    p === "vertical" && l.hasAttribute?.("data-lenis-prevent-vertical") ||
    p === "horizontal" && l.hasAttribute?.("data-lenis-prevent-horizontal") ||
    o && l.hasAttribute?.("data-lenis-prevent-touch") ||
    h && l.hasAttribute?.("data-lenis-prevent-wheel") ||
    this.options.allowNestedScroll && this.hasNestedScroll(l, { deltaX: e, deltaY: i })
  ))) return; // <-- BLOQUEIO TOTAL E RETORNO IMEDIATO!
```

### 3.2 O Ciclo Vicioso de Re-Armamento
1. Quando o scroll atinge $cur \ge p + M \times 0.999$, a função `syncViewportClip(pp)` executa:
   ```javascript
   if (pp >= 0.999) {
     viewportEl.style.clipPath = 'none';
     viewportEl.style.pointerEvents = 'auto';
     viewportEl.setAttribute('data-lenis-prevent', 'true');
     viewportEl.setAttribute('data-lenis-prevent-wheel', 'true');
     viewportEl.setAttribute('data-lenis-prevent-touch', 'true');
   }
   ```
2. `#jesper-work-stage-viewport` possui `position: fixed; inset: 0; width: 100vw; height: 100vh; z-index: 15;`. Ao receber `pointer-events: auto`, ele intercepta **100% dos eventos de mouse e toque** em toda a área visível do navegador.
3. No instante seguinte, quando o usuário gira a roda do mouse ou arrasta com o dedo:
   - O evento dispara em `#jesper-work-stage-viewport`.
   - Lenis intercepta no `window`.
   - `s.composedPath()` contém `viewportEl`.
   - `l.hasAttribute("data-lenis-prevent")` retorna `true`.
   - Lenis aborta imediatamente com `return`.
   - `animatedScroll` e `scrollY` **não avançam**.
4. Em `WorkStage.tsx`, havia uma tentativa ingênua de desengatar o prevent ao atingir overscroll elástico:
   ```typescript
   if (overflow > OVERSCROLL_EXIT_THRESHOLD) {
     viewportEl?.removeAttribute('data-lenis-prevent');
     viewportEl?.removeAttribute('data-lenis-prevent-wheel');
     viewportEl?.removeAttribute('data-lenis-prevent-touch');
   }
   ```
   Porém, esta tentativa falha irremediavelmente por duas razões fatais:
   - O retorno elástico no loop RAF de `WorkStage.tsx` reduz imediatamente o `targetOffset`, trazendo `overflow` de volta para baixo de $3.5$.
   - Se o usuário rolar 1 único pixel no Lenis, o ScrollTrigger dispara `onUpdate(self)`. Como $cur$ ainda é $> p + M$, $pp = 1.0$. A linha `syncViewportClip(1.0)` é chamada e **re-injeta imediatamente** `data-lenis-prevent="true"`, rearmando o deadlock no mesmíssimo frame!
   - Para trás (scroll reverso/subida), não havia qualquer desbloqueio, tornando impossível retornar ao Chapter I.

---

## 4. Projeto Arquitetural da Abordagem C (Ciclo de Vida em 4 Fases)

A Abordagem C substitui o modelo unilateral de aprisionamento por um **arco cinemático contínuo, determinístico e 100% reversível**.

```
[ScrollY Axis Progress]
0 ---------------- p ----------- (p+Min) ---------------- (p+Min+Mhold) ---------- (p+Min+Mhold+Mout) ------- U
|   Pré-Portal     |   FASE 1    |            FASE 2             |            FASE 3           |    FASE 4     |
| Loading + Chap I | Entrada Ópt |    Navegação Interativa 3D    |   Saída Cinematográfica     | Continuidade  |
| pp = 0           | pp: 0 -> 1  |           pp = 1.0            |        pp: 1 -> 0           |    pp = 0     |
| viewport: Oculto | clip dinâm  | viewport tela cheia interat   | viewport dissolve/transic   | Chap III..Fim |
```

### 4.1 Definição Matemática Exata dos Marcos Temporais

Sejam:
- $v$: dimensões da viewport `{ width, height }`.
- $h = \max(0, r.\text{scrollWidth} - v.\text{width})$: curso total horizontal da trilha.
- $k = -n.\text{offsetLeft} + (v.\text{width} - n.\text{offsetWidth}) / 2$: coordenada de centralização do portal.
- $p = \max(0, -k)$: percurso de rolagem até a centralização de "THE WORK".
- $M_{\text{in}} = v.\text{height}$: extensão de scroll da Fase 1 (Entrada Óptica).
- $M_{\text{hold}} = v.\text{height} \times 2.5$: extensão de scroll da Fase 2 (Retenção e Navegação 3D).
- $M_{\text{out}} = v.\text{height} \times 1.0$: extensão de scroll da Fase 3 (Saída Cinematográfica Suave).
- $Q = \max(0, h - p)$: extensão restante da trilha horizontal até o rodapé.
- $U = p + M_{\text{in}} + M_{\text{hold}} + M_{\text{out}} + Q$: extensão total do ScrollTrigger.

Marcos na timeline $s$:
- $t_0 = 0$
- $t_1 = p$ (Início da Fase 1 — Entrada Óptica)
- $t_2 = p + M_{\text{in}}$ (Início da Fase 2 — Retenção 3D)
- $t_3 = p + M_{\text{in}} + M_{\text{hold}}$ (Início da Fase 3 — Saída Cinematográfica)
- $t_4 = p + M_{\text{in}} + M_{\text{hold}} + M_{\text{out}}$ (Início da Fase 4 — Continuidade da Trilha)
- $t_5 = U = t_4 + Q$ (Fim do Documento / Rodapé)

---

### 4.2 Equação Matemática de $pp(cur)$ (Função Contínua por Partes)

Para qualquer instante temporal $cur = s.\text{time}() \in [0, U]$:

$$
pp(cur) = \begin{cases}
0.0, & cur < t_1 \\
\dfrac{cur - t_1}{M_{\text{in}}}, & t_1 \le cur < t_2 \quad (\text{Fase 1: } 0.0 \to 1.0) \\
1.0, & t_2 \le cur \le t_3 \quad (\text{Fase 2: } 1.0 \text{ estático}) \\
1.0 - \dfrac{cur - t_3}{M_{\text{out}}}, & t_3 < cur \le t_4 \quad (\text{Fase 3: } 1.0 \to 0.0) \\
0.0, & cur > t_4 \quad (\text{Fase 4: } 0.0)
\end{cases}
$$

**Propriedades Formais:**
- **Continuidade:** $\lim_{cur \to t_1^-} pp = 0 = pp(t_1)$; $\lim_{cur \to t_2^-} pp = 1 = pp(t_2)$; $\lim_{cur \to t_3^+} pp = 1 = pp(t_3)$; $\lim_{cur \to t_4^+} pp = 0 = pp(t_4)$.
- **Dominio Limitado:** $pp(cur) \in [0.0, 1.0]$ para todo $cur \in \mathbb{R}$.
- **Reversibilidade:** A função é simétrica em reversão temporal ($\frac{d(cur)}{dt} < 0$), garantindo retorno limpo e sem saltos visuais ao subir a página.

---

### 4.3 Especificação Detalhada das 4 Fases

#### Fase 1: Entrada Óptica ($t \in [t_1, t_2]$, $pp \in [0, 1]$)
- **Ação:** O retângulo `[data-more-work-rect]` expande de `scale: 0` até o fator de cobertura total $W = V(L, v)$.
- **Tipografia:** "THE" desliza de $C \to Y$ e "WORK" de $H \to j$ com simetria óptica calibrada ($|leftGap - rightGap| \le 1.0\text{px}$).
- **Viewport WebGL:**
  - `clipPath`: Polígono dinâmico calculado com precisão subpixel a partir de `[data-more-work-rect].getBoundingClientRect()`.
  - `opacity`: `1.0`.
  - `pointerEvents`: `'none'` (garante que eventos de rolagem e cliques continuem a mover a página sem captura precoce).
  - `data-lenis-prevent`: Ausente.

#### Fase 2: Navegação Interativa 3D ($t \in [t_2, t_3]$, $pp = 1.0$)
- **Ação:** A trilha horizontal do DOM permanece fixada em $x = k$.
- **Viewport WebGL:**
  - `clipPath`: `'none'`.
  - `opacity`: `1.0`.
  - `pointerEvents`: `'auto'`.
  - `data-lenis-prevent`: **Eliminado** durante a rolagem natural contínua, permitindo que a inércia do Lenis impulsione o progresso na galeria.
- **Sincronização da Fita:**
  - O progresso normalizado dentro da fita é dado por:
    $$\tau_2 = \frac{cur - t_2}{M_{\text{hold}}} \in [0, 1]$$
  - A fita possui 4 projetos com stride de 18.5 unidades ($X_0 = -27.75, X_1 = -9.25, X_2 = 9.25, X_3 = 27.75$).
  - A rolagem contínua via roda ou touch impulsiona suavemente o deslocamento da fita de $+27.75$ (Card 0) até $-27.75$ (Card 3).
  - Eventos de wheel sobre a janela geram impulso instantâneo em `scrollVelocity` ($> 0.05$), curvando parametricamente as malhas GLSL (`u_sheetV`) e satisfazendo o Gate 3.
- **Modais Card-to-Sheet:** Caso o usuário clique em um card (ex: Card 0), `WorkStage.tsx` assume a fase `'DETAIL_FLIGHT' -> 'DETAIL_ACTIVE'`, aplicando `document.documentElement.style.overflow = 'hidden'`. Ao fechar (Close / Escape), restaura `overflow = ''` e retorna fluidamente a `'RIBBON_BROWSE'`.

#### Fase 3: Saída Cinematográfica Suave ($t \in [t_3, t_4]$, $pp \in [1, 0]$)
- **Ação:** O viewport 3D `#jesper-work-stage-viewport` executa sua transição de saída:
  - `opacity`: decai continuamente de $1.0 \to 0.0$ em sincronia estrita com $pp$.
  - `pointerEvents`: transiciona imediatamente para `'none'` assim que $pp < 0.999$, transferindo o foco de interação e eventos do ponteiro para as camadas DOM da página.
  - O palco 3D desfaz sua presença no ecrã sem saltos de renderização ou piscamentos.
- **Desengate Definitivo de Lenis:** `data-lenis-prevent` permanece estritamente desativado.

#### Fase 4: Continuidade da Trilha Horizontal ($t \in [t_4, t_5]$, $pp = 0.0$)
- **Ação:** O viewport 3D permanece inerte e oculto (`clipPath = polygon(0 0, 0 0, 0 0, 0 0)`, `opacity = 0`, `pointerEvents = none`).
- **Trilha Horizontal:** O trilho `r` retoma seu deslocamento linear $x: k \to -h$ por uma duração $Q$.
- **Transição Suave para Chapter III:** Conforme o trilho avança, o usuário entra de forma direta e cinematográfica na narrativa de serviços (Chapter III), Chapter IV (Clientes) e Rodapé (Contact), sem travamentos, sem barreiras de scroll e sem duplicidade estática dos projetos já vistos em 3D.

---

## 5. Máquina de Estados para Eliminação do Deadlock (FSM)

Para garantir que o `data-lenis-prevent` nunca mais cause aprisionamento do usuário, formalizamos a seguinte Máquina de Estados Finitos:

| Estado da FSM | Condição de Entrada | `clipPath` | `opacity` | `pointerEvents` | `data-lenis-prevent` | Ação de Scroll |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`PRE_PORTAL`** | $cur < t_1$ | `polygon(0 0...)` | `0` | `'none'` | **Removido** | Rola trilha horizontal (Capítulo 0 e I). |
| **`PORTAL_ENTRANCE`** | $t_1 \le cur < t_2$ | Polígono dinâmico do `rectEl` | `1` | `'none'` | **Removido** | Scrub da expansão óptica ($0 \to 1$). |
| **`RIBBON_BROWSE`** | $t_2 \le cur \le t_3$ e modal fechado | `'none'` | `1` | `'auto'` | **Removido** (Rolagem contínua) | Rolagem move a fita; wheel gera `scrollVelocity`. |
| **`DETAIL_MODAL`** | Card clicado (`DETAIL_ACTIVE`) | `'none'` | `1` | `'auto'` | **Bloqueio via `overflow: hidden`** | Página travada enquanto visualiza detalhes; destravada ao fechar. |
| **`PORTAL_EXIT`** | $t_3 < cur \le t_4$ | `'none'` | $pp$ ($1 \to 0$) | `'none'` | **Removido** | Dissolução cinematográfica do viewport 3D. |
| **`PAGE_CONTINUATION`**| $cur > t_4$ | `polygon(0 0...)` | `0` | `'none'` | **Removido** | Trilha desliza para Capítulos III, IV e Rodapé. |

### Regra de Ouro (Invariante FSM):
> **É PROIBIDO** invocar `viewportEl.setAttribute('data-lenis-prevent', 'true')` de forma incondicional ou cíclica em listeners de rAF ou callbacks de `onUpdate`. O controle de rolagem na página principal é de propriedade exclusiva do Lenis e do GSAP ScrollTrigger. O travamento de página só é permitido quando uma sobreposição modal de detalhes estiver formalmente ativa (`DETAIL_ACTIVE`), sendo realizado via controle canônico de overflow no documento (`documentScrollLock`).

---

## 6. Análise e Solução para o Bloco Mobile (`max-width: 767px`)

### 6.1 Problema Atual
No bloco mobile atual de `initHorizontalScroll.LNLCK81L.js`:
- O gatilho é `n` (`data-more-work-section`), com `start: "top top"` e `end: +=${P}`.
- O timeline anima apenas a entrada de $i$ de `scale: 0` a $h$ no intervalo de $0 \to P$.
- Ao final de $P$, a timeline encerra, mantendo $pp = 1.0$ e atribuindo `data-lenis-prevent-touch="true"`.
- O toque na tela do smartphone é bloqueado pelo Lenis, aprisionando o usuário sem possibilidade de continuar a descer no scroll vertical nativo.

### 6.2 Formulação Mobile sob a Abordagem C
Em smartphones, a página possui fluxo vertical nativo (`flex flex-col`). A seção "THE WORK" deve respeitar o mesmo ciclo de 4 fases adaptado à dimensão vertical:

1. **Parâmetros:**
   - $P = n.\text{offsetHeight}$ (altura total da tela mobile, ex: $100\text{svh} \approx 844\text{px}$).
   - $P_{\text{in}} = P$: extensão de abertura óptica ($0 \to 1$).
   - $P_{\text{hold}} = P \times 1.5$: extensão de fixação (pin) para interação touch com os cards 3D.
   - $P_{\text{out}} = P \times 0.8$: extensão de saída suave por dissolução ($1 \to 0$).
   - $P_{\text{total}} = P_{\text{in}} + P_{\text{hold}} + P_{\text{out}} = 3.3 \times P$.

2. **Timeline GSAP Mobile:**
   - $0 \to P_{\text{in}}$: `i` escala de $0 \to h$, `u` sobe para $-k$, `a` desce para $+k$.
   - $P_{\text{in}} \to P_{\text{in}} + P_{\text{hold}}$: fixação (`hold`). A seção permanece fixada enquanto o swipe/touch vertical ou horizontal desloca a fita.
   - $P_{\text{in}} + P_{\text{hold}} \to P_{\text{total}}$: o viewport 3D dissolve de `opacity: 1` para `0`.
   - ScrollTrigger: `trigger: n`, `start: "top top"`, `end: +=${P_total}`, `pin: true`, `pinSpacing: true`, `scrub: true`.

3. **Cálculo de $pp_{\text{mobile}}(cur)$:**
   $$
   pp_{\text{mobile}}(cur) = \begin{cases}
   \dfrac{cur}{P_{\text{in}}}, & cur < P_{\text{in}} \\
   1.0, & P_{\text{in}} \le cur \le P_{\text{in}} + P_{\text{hold}} \\
   1.0 - \dfrac{cur - (P_{\text{in}} + P_{\text{hold}})}{P_{\text{out}}}, & P_{\text{in}} + P_{\text{hold}} < cur \le P_{\text{total}} \\
   0.0, & cur > P_{\text{total}}
   \end{cases}
   $$

4. **Zero Interrupção de Gestos Touch:**
   - `data-lenis-prevent-touch` é **banido**. O scroll touch nativo conduz o scrub sem saltos, sem interrupções e sem retenção destrutiva.

---

## 7. Propostas Detalhadas de Implementação de Código

### 7.1 Reformulação de `initHorizontalScroll.LNLCK81L.js`

Abaixo apresentamos o projeto de substituição exata para a timeline e o `syncViewportClip`:

```javascript
// ============================================================================
// syncViewportClip com Abordagem C (Entrada Óptica, Retenção e Saída Suave)
// ============================================================================
function syncViewportClip(pp, cur, tHoldEnd) {
  const viewportEl = document.getElementById('jesper-work-stage-viewport');
  const rectEl = document.querySelector('[data-more-work-rect]') || document.querySelector('[data-more-work-mobile-rect]');
  if (!viewportEl) return;

  // Garantir remoção permanente dos atributos de deadlock do Lenis
  viewportEl.removeAttribute('data-lenis-prevent');
  viewportEl.removeAttribute('data-lenis-prevent-wheel');
  viewportEl.removeAttribute('data-lenis-prevent-touch');

  if (pp >= 0.999) {
    // FASE 2: Palco 3D Totalmente Ativo e Interativo
    viewportEl.style.clipPath = 'none';
    viewportEl.style.opacity = '1';
    viewportEl.style.pointerEvents = 'auto';
  } else if (pp <= 0.001) {
    // FORA DO PALCO: Pré-Portal ou Continuidade (Capítulo III, IV e Rodapé)
    viewportEl.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)';
    viewportEl.style.opacity = '0';
    viewportEl.style.pointerEvents = 'none';
  } else {
    // FASES DE TRANSIÇÃO (Fase 1 de Entrada ou Fase 3 de Saída)
    viewportEl.style.pointerEvents = 'none';

    const isExitPhase = (typeof cur === 'number' && typeof tHoldEnd === 'number' && cur > tHoldEnd);

    if (!isExitPhase && rectEl) {
      // FASE 1 (Entrada Óptica): Máscara acompanha precisamente o retângulo expansor
      const r = rectEl.getBoundingClientRect();
      viewportEl.style.opacity = '1';
      viewportEl.style.clipPath = `polygon(${r.left}px ${r.top}px, ${r.right}px ${r.top}px, ${r.right}px ${r.bottom}px, ${r.left}px ${r.bottom}px)`;
    } else {
      // FASE 3 (Saída Cinematográfica): Dissolução progressiva da opacidade
      viewportEl.style.clipPath = 'none';
      viewportEl.style.opacity = String(Math.max(0, Math.min(1, pp)));
    }
  }
}

// ============================================================================
// Construção da Master Timeline Desktop (min-width: 768px)
// ============================================================================
// Parâmetros de extensão de tempo e scroll:
const M_in = v.height;                  // Fase 1: Entrada óptica (expansão do portal)
const M_hold = v.height * 2.5;           // Fase 2: Retenção para navegação 3D na fita
const M_out = v.height * 1.0;            // Fase 3: Saída cinematográfica suave (dissolução)
const U = h + M_in + M_hold + M_out;     // Extensão total do ScrollTrigger

// Pontos de demarcação temporal:
const t1 = p;                            // Início Entrada Óptica
const t2 = p + M_in;                     // Início Retenção 3D
const t3 = p + M_in + M_hold;            // Início Saída Suave
const t4 = p + M_in + M_hold + M_out;     // Início Continuidade da Trilha

// Construção da Timeline s:
c.set(i, { scale: 0, transformOrigin: "center center", force3D: true });
c.set(u, { x: C, force3D: true });
c.set(a, { x: H, force3D: true });

// Trecho 0: Deslocamento inicial da trilha até centralizar o portal
s.fromTo(r, { x: 0 }, { x: k, duration: p });

// FASE 1: Entrada Óptica (Expansão do Portal e afastamento do texto)
s.addLabel("mwPause");
s.fromTo(i, { scale: 0 }, { scale: W, force3D: true, duration: M_in }, "mwPause");
s.fromTo(u, { x: C }, { x: Y, force3D: true, duration: M_in }, "mwPause");
s.fromTo(a, { x: H }, { x: j, force3D: true, duration: M_in }, "mwPause");

// FASE 2: Retenção e Navegação 3D (Trilha fixada em k)
s.addLabel("mwHold");
s.to(i, { scale: W, duration: M_hold, ease: "none" }, "mwHold");

// FASE 3: Saída Cinematográfica Suave (Dissolução coordenada)
s.addLabel("mwExit");
s.to(i, { scale: W, duration: M_out, ease: "none" }, "mwExit");

// FASE 4: Continuidade da Trilha (Avanço linear para Chapter III, IV e Rodapé)
s.addLabel("mwResume");
s.fromTo(r, { x: k }, { x: -h, duration: Q }, "mwResume");

// ScrollTrigger com Cálculo de Ciclo de Vida Contínuo:
d = b.create({
  trigger: t,
  animation: s,
  start: "top top",
  end: `+=${U}`,
  pin: true,
  scrub: true,
  anticipatePin: 1,
  invalidateOnRefresh: true,
  fastScrollEnd: true,
  preventOverlaps: true,
  refreshPriority: 1,
  onUpdate: self => {
    const cur = s.time();
    let pp = 0;
    if (cur < t1) {
      pp = 0;
    } else if (cur < t2) {
      pp = Math.min(1, Math.max(0, (cur - t1) / M_in));
    } else if (cur <= t3) {
      pp = 1.0;
    } else if (cur <= t4) {
      pp = Math.max(0, Math.min(1, 1 - (cur - t3) / M_out));
    } else {
      pp = 0;
    }

    syncViewportClip(pp, cur, t3);
    if (typeof window !== "undefined" && window.__TEST_SET_PORTAL_PROGRESS__) {
      window.__TEST_SET_PORTAL_PROGRESS__(pp);
    }
  }
});
```

---

### 7.2 Ajustes de Coordenação em `src/components/WorkStage/WorkStage.tsx`

1. **Remoção das Linhas de Manipulação Cega de Lenis Prevent:**  
   Em `WorkStage.tsx` (linhas 144–161), as chamadas manuais a `removeAttribute('data-lenis-prevent')` devem ser removidas, pois a FSM agora mantém o prevent permanentemente desativado durante a rolagem.
2. **Propagação Limpa de Wheel:**  
   No handler `onWindowWheel` (linhas 178–198), não interromper propagação de eventos globais de scroll para permitir que a rolagem contínua via roda ou trackpad alimente o Lenis e o GSAP ScrollTrigger suavemente.
3. **Preservação dos Contratos de Telemetria:**  
   Manter estritamente `window.__WORK_STAGE__` com todas as propriedades esperadas pelos Gates 1 a 5 (`phase`, `cards`, `scrollVelocity`, `portalProgress`, etc.).

---

### 7.3 Correção do Servidor de Preview Local

Em `scripts/serve-marcionilio-site.cjs` (linhas 46–48):
**Antes:**
```javascript
let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
if (cleanPath === '/' || cleanPath === '') {
  cleanPath = '/gemini-code-1792177008460.html';
}
```
**Depois (Conforme Hard Guardrail 5 e R4):**
```javascript
let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
if (cleanPath === '/' || cleanPath === '') {
  cleanPath = '/index.html';
}
```

---

## 8. Mapeamento de Dependências e Arquivos Afetados

| Arquivo | Natureza da Modificação | Risco | Mitigação |
| :--- | :--- | :--- | :--- |
| `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js` | Substituição da rampa $pp$, implementação do ciclo 4 fases e limpeza de prevent | Médio | Testes E2E automatizados (Gates 2 a 6 e Challenger Viewport). |
| `src/components/WorkStage/WorkStage.tsx` | Ajuste de limites elásticos, remoção de chamadas a prevent e rebuild do bundle | Baixo | Suíte Vitest (Gate 1) e build determinístico Vite. |
| `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` | Rebuild via `npm run build:workstage` | Baixo | Verificação de integridade pós-compilação. |
| `scripts/serve-marcionilio-site.cjs` | Rota raiz `/` apontando para `index.html` | Mínimo | Teste HTTP local direto. |
| `tests/e2e/work-stage.spec.ts` | Adição formal do teste Gate 6 (Rolagem Contínua de Ponta a Ponta) | Nenhum | Validação de regressão completa. |

---

## 9. Plano de Validação do Gate 6 (Rolagem Contínua de Ponta a Ponta)

Para auditar e comprovar a inexistência de qualquer deadlock ou aprisionamento de scroll, o novo teste E2E do Gate 6 deve ser estruturado da seguinte forma:
1. Carregar a página em `http://127.0.0.1:port/` a partir de `scrollY = 0`.
2. Executar múltiplos disparos de mouse wheel progressivos (`page.mouse.wheel(0, 400)` com pequenos intervalos).
3. Monitorar os marcos da jornada:
   - Passagem pelo Loading ($scrollY: 0 \to 1000$).
   - Atingimento e abertura do portal ($pp: 0 \to 1.0$).
   - Travessia da fita 3D ($phase = \text{'RIBBON_BROWSE'}$, $scrollVelocity > 0$).
   - Transição de saída cinematográfica ($pp: 1.0 \to 0.0$).
   - Deslocamento contínuo da trilha horizontal até Chapter III (Serviços), Chapter IV (Clientes) e alcance do rodapé (`#contact`), comprovando que `window.scrollY` atingiu a proximidade de `document.documentElement.scrollHeight - window.innerHeight` sem travar em nenhum ponto.
4. Repetir o processo em sentido reverso (`wheel(0, -400)`), comprovando reversibilidade perfeita de volta ao topo (`scrollY = 0`).

---

*Relatório técnico concluído por explorer_phase0_1 em conformidade estrita com o Protocolo de Verdade e Diretrizes Arquiteturais.*
