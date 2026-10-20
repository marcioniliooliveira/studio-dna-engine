# Relatório Técnico de Investigação: Narrativa DOM, Continuidade de Layout e Arquitetura de Testes E2E (Gate 6)

**Autor:** `explorer_phase0_3` (Especialista em Narrativa DOM, Continuidade de Layout e Arquitetura E2E Playwright)  
**Data:** 2026-10-17  
**Alvo:** Cliente `marcionilio-oliveira` (`clientes/marcionilio-oliveira/site/index.html`)  
**Status:** Investigação Concluída — Evidências Coletadas e Arquitetura Especificada  

---

## 1. Resumo Executivo & Diagnóstico Global

Esta investigação técnica analisou a raiz do congelamento de scroll (*deadlock* do Lenis), a redundância narrativa entre o palco tridimensional "THE WORK" e o Chapter II estático, e a viabilidade da rolagem contínua de ponta a ponta na experiência do cliente `marcionilio-oliveira`.

### Principais Constatações:
1. **Origem do Deadlock de Lenis:** Em `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`, a função `syncViewportClip(pp)` injeta `data-lenis-prevent="true"`, `data-lenis-prevent-wheel="true"` e `data-lenis-prevent-touch="true"` sobre `#jesper-work-stage-viewport` assim que `pp >= 0.999`. Como esse elemento possui `position: fixed; inset: 0; width: 100vw; height: 100vh; pointer-events: auto; z-index: 15;`, ele cobre 100% da tela. A cada tick do master ScrollTrigger, a rampa clamped `Math.min(1, Math.max(0, (cur - p) / M))` retorna `1.0` indefinidamente até o fim da timeline, re-armando `data-lenis-prevent` mesmo se `WorkStage.tsx` tentar desengatá-lo. O Lenis então descarta 100% dos eventos de mouse wheel, impossibilitando qualquer avanço além do palco 3D.
2. **Redundância Estrutural de Chapter II:** No HTML original, existem duas apresentações sucessivas e idênticas dos mesmos 4 projetos (*EVO Money*, *Plant Tag*, *Swiss Haus* e *Betahaus*):
   - Seção 3 (`[data-more-work-section]`): Expande o portal 3D "THE WORK" para o WebGL WorkStage (que inclusive traz internamente no seu detail panel o subtítulo `Chapter II — Category (Year)`).
   - Seção 4 (`data-section="home-work"`): Lista estática em HTML 2D repetindo exatamente os mesmos 4 projetos.
   Ao sair do portal 3D, o usuário é confrontado com a repetição plana dos mesmos trabalhos, quebrando o ritmo cinemático e gerando atrito estético (*design slop*).
3. **Harmonização da Trilha Horizontal:** A remoção/desativação da seção estática 4 faz com que a trilha horizontal, após a saída de "THE WORK" (Fase 3), avance de imediato para o **Chapter III: Serviços** (`[data-services-section]`), seguido do **Chapter IV: Clientes** (`[data-section="home-clients"]`) e do **Rodapé** (`#contact`). A matemática de posicionamento do GSAP baseada em `containerAnimation` permanece intacta e os listeners dos capítulos subsequentes disparam perfeitamente.
4. **Viabilidade dos Gates Existentes (1 a 5 e Challenger Multi-Viewport):** Todos os 7 testes de matemática CPU (`math.spec.ts`), os 4 testes de WorkStage (`work-stage.spec.ts`) e os 6 testes multi-viewport (`challenger-viewport.spec.ts`) executaram com 100% de sucesso no baseline. A arquitetura proposta para a curva de 4 fases preserva as precondições dos Gates 2, 3, 4 e 5, ao mesmo tempo em que viabiliza a implementação do **Gate 6 (Rolagem Contínua de Ponta a Ponta)**.

---

## 2. Auditoria e Mapeamento Detalhado do DOM (`index.html`)

A estrutura em `clientes/marcionilio-oliveira/site/index.html` organiza o scroll horizontal em um contêiner mestre fixado via GSAP ScrollTrigger:

```html
<main>
  <div data-horizontal-story="" class="bg-[#edeae6]" id="site-top">
    <div data-horizontal-pin="" class="relative w-full md:h-dvh">
      <div data-horizontal-track="" class="flex w-full flex-col md:h-dvh md:flex-row md:flex-nowrap">
        <!-- Seção 1: Loading / Hero (100vw) -->
        <section data-section="loading" data-horizontal-panel="" ...>
        
        <!-- Seção 2: Chapter I - About (100vw) -->
        <section data-section="home-about" data-horizontal-panel="" ...>
        
        <!-- Seção 3: THE WORK - Portal Óptico (100vw) -->
        <section data-more-work-section="" data-horizontal-panel="" ...>
          <div data-more-work-rect=""></div>
          <p data-more-work-more="">THE</p>
          <p data-more-work-work="">WORK</p>
        </section>
        
        <!-- Seção 4: Chapter II - Trabalhos Estáticos Redundantes (100vw) -->
        <section data-section="home-work" data-horizontal-panel="" ...>
          <ul data-work-list="">
            <li data-work-item-index="0">EVO Money</li>
            <li data-work-item-index="1">Plant Tag</li>
            <li data-work-item-index="2">Swiss Haus</li>
            <li data-work-item-index="3">Betahaus</li>
          </ul>
        </section>
        
        <!-- Seção 5: Chapter III - Serviços (md:w-max, 4 artigos) -->
        <section data-services-section="" data-horizontal-panel="" ...>
          <p>Chapter III</p>
          <article data-service-item="">Web Design</article>
          <article data-service-item="">Creative Dev</article>
          <article data-service-item="">Frontend Build</article>
          <article data-service-item="">Internal Tools</article>
        </section>
        
        <!-- Seção 6: Chapter IV - Clientes (100vw) -->
        <section data-section="home-clients" data-horizontal-panel="" ...>
          <p>Chapter IV</p>
          <ul data-clients-list="">...</ul>
        </section>
        
        <!-- Seção 7: Footer / Contato (100vw) -->
        <section id="contact" data-section="home-footer" data-horizontal-panel="" ...>
          <h2>Next chapter</h2>
          <a href="mailto:contato@marcionilio.dev">contato@marcionilio.dev</a>
        </section>
      </div>
    </div>
  </div>
</main>

<!-- Camadas Espaciais Fixas Globais (fora de <main>) -->
<div id="jesper-work-stage-viewport" style="position: fixed; inset: 0; left: 0; top: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 15; clip-path: polygon(0 0, 0 0, 0 0, 0 0);">
  <div id="jesper-work-stage-mount" class="size-full absolute inset-0 z-10 pointer-events-auto"></div>
</div>
<div id="work-detail-panel-root" style="position: fixed; inset: 0; left: 0; top: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 120;"></div>
```

### Análise de Dependências dos Componentes JS:
- **`Work.astro_astro_type_script_index_0_lang.B0cS72Vi.js`:**
  Possui a guarda: `const i = document.querySelector("[data-section='home-work']"); if (!(i instanceof HTMLElement)) return;`.
  Se a seção estática 4 for removida do DOM ou declarada inerte, o script aborta graciosamente sem lançar nenhuma exceção.
- **`Services.astro_astro_type_script_index_0_lang.CavSbKjf.js`:**
  Busca exclusivamente `document.querySelector("[data-services-section]")`. Não tem nenhuma dependência em relação a `[data-section='home-work']`.
- **`Clients.astro_astro_type_script_index_0_lang.CkJXhcIa.js`:**
  Busca `document.querySelector("[data-section='home-clients']")` e escuta a timeline horizontal através de `containerAnimation: B()`. Se a seção 4 não estiver presente, sua posição física na fita simplesmente se desloca 100vw para a esquerda, acionando o trigger perfeitamente no momento visual correto.
- **`Footer.astro_astro_type_script_index_0_lang.En_bDpoP.js`:**
  Busca `document.querySelector("[data-section='home-footer']")` e dispara via `containerAnimation: o, start: "left 60%"`.
- **`headerTheme.BVy9gA6p.js`:**
  Inspeciona os nós que contêm `[data-header-bg][data-header-text]`. A sequência cromática salta de `#faf9f6` (The Work) diretamente para `#2e2b28` (Services), depois `#edeae6` (Clients) e `#1f1d1b` (Footer), mantendo um contraste refinado a cada etapa.

---

## 3. Investigação da Redundância do Chapter II & Estratégia de Harmonização

### 3.1 A Redundância Observada
1. O usuário rola a página, entra em `[data-more-work-section]`.
2. O portal óptico expande e revela os 4 cards WebGL 3D em perspectiva cônica e iluminação Blinn-Phong (*EVO Money*, *Plant Tag*, *Swiss Haus*, *Betahaus*).
3. O usuário pode inspecionar os projetos, clicar no proxy e abrir o painel detalhado.
4. No estado atual do site, se o usuário continuasse rolando a trilha horizontal, a Seção 4 apresentaria exatamente os mesmos 4 títulos em uma listagem de texto preto com preview estático ao lado.
5. **Evidência Interna no Código:** O componente React `WorkStage.tsx` (linha 703) renderiza no cabeçalho do modal de detalhes a string:
   ```tsx
   Chapter II — {displayProject.category} ({displayProject.year})
   ```
   Isto comprova que o **palco tridimensional "THE WORK" É o Chapter II**. A presença simultânea da seção HTML estática é uma duplicata acidental deixada pelo esqueleto original.

### 3.2 Solução Arquitetural de Harmonização (WP-3)
- **Ação Recomendada:** Remover `<section data-section="home-work">` da trilha horizontal em `index.html`.
- **Rotulagem Editorial Harmoniosa:** Adicionar o cabeçalho editorial `Chapter II` dentro de `<section data-more-work-section>`:
  ```html
  <p class="font-serif text-lg font-normal uppercase leading-none md:absolute md:left-32 md:top-(--vg) md:text-2xl" data-reveal-line="">
    Chapter II
  </p>
  ```
- **Resultado Narrativo:**
  - **Chapter I:** Sobre mim (Filosofia & Rigor gráfico)
  - **Chapter II:** The Work (Palco WebGL 3D interativo com os 4 projetos editoriais)
  - **Chapter III:** Serviços (Web Design, Creative Dev, Frontend Build, Internal Tools)
  - **Chapter IV:** Clientes (Experiências selecionadas & Tecnologias)
  - **Next Chapter:** Rodapé & Contato

Zero duplicidade, continuidade narrativa 100% fluida e conformidade com os princípios editoriais da referência de alta fidelidade.

---

## 4. O Mecanismo de Deadlock do Lenis & Ciclo Contínuo em 4 Fases

### 4.1 Anatomia do Deadlock Atual
Em `initHorizontalScroll.LNLCK81L.js`:
```javascript
// 1. Função de sincronismo chamada em cada tick do ScrollTrigger
function syncViewportClip(pp) {
  const viewportEl = document.getElementById('jesper-work-stage-viewport');
  if (viewportEl) {
    if (pp >= 0.999) {
      viewportEl.style.clipPath = 'none';
      viewportEl.style.pointerEvents = 'auto';
      viewportEl.setAttribute('data-lenis-prevent', 'true');
      viewportEl.setAttribute('data-lenis-prevent-wheel', 'true');
      viewportEl.setAttribute('data-lenis-prevent-touch', 'true');
    } ...
  }
}

// 2. Timeline do master ScrollTrigger
const k = -n.offsetLeft + (v.width - n.offsetWidth) / 2;
const p = Math.max(0, -k);
const M = v.height;
const M_hold = v.height * 2.5;

s.fromTo(r, { x: 0 }, { x: k, duration: p });
s.addLabel("mwPause");
s.fromTo(i, { scale: 0 }, { scale: W, duration: M }, "mwPause");
s.addLabel("mwHold");
s.to(i, { scale: W, duration: M_hold, ease: "none" }, "mwHold");
s.fromTo(r, { x: k }, { x: -h, duration: Q });

// 3. onUpdate com rampa unilateral clamped
d = b.create({
  ...
  onUpdate: self => {
    const cur = s.time();
    const pp = Math.min(1, Math.max(0, (cur - p) / M));
    syncViewportClip(pp);
    ...
  }
});
```

#### A cadeia causal da falha:
1. Quando `cur >= p + M`, `(cur - p) / M >= 1`.
2. A fórmula `Math.min(1, Math.max(0, ...))` trava `pp` permanentemente em `1.0`.
3. `syncViewportClip(1.0)` crava `data-lenis-prevent="true"` no `#jesper-work-stage-viewport`.
4. O `#jesper-work-stage-viewport` está fixo cobrindo toda a janela (`100vw × 100vh`) com `pointer-events: auto`.
5. Em `lenis.UMZrGmQz.js`:
   ```javascript
   if (a.find(l => l.hasAttribute?.("data-lenis-prevent") || ...)) return;
   ```
   O Lenis aborta imediatamente a rolagem. O valor de `window.scrollY` é congelado.
6. Se `window.scrollY` não avança, o ScrollTrigger não avança `s.time()`. O usuário fica permanentemente preso em `mwHold`, sem possibilidade de alcançar o fim da fita nem transicionar para os capítulos seguintes.

### 4.2 A Arquitetura do Ciclo Completo em 4 Fases (Abordagem C)
Para cumprir os requisitos R1, R2, R3 e Hard Guardrails 1 e 2:

1. **Eliminar `data-lenis-prevent` durante a navegação normal da fita:**
   O `#jesper-work-stage-viewport` **não deve possuir `data-lenis-prevent`** durante o scroll regular da página. O controle de scroll é orquestrado pelo próprio ScrollTrigger através do percurso alocado na timeline. O único momento em que a rolagem da página deve ser travada é quando o usuário clica em um card para abrir o modal de detalhes (`phase === 'DETAIL_ACTIVE'`), momento em que o documento recebe `overflow: hidden`.
2. **Definir a timeline com 4 fases explícitas:**
   - **Fase 1 (Entrada Óptica):** Duração $M = v.height$. Rect escala $0 \to W$, textos se afastam, máscara de recorte dinâmica acompanha o retângulo.
   - **Fase 2 (Navegação na Fita 3D):** Duração $M_{hold} = v.height \times 2.5$. O contêiner horizontal fica parado em $x = k$. Conforme a rolagem progride de $p + M$ até $p + M + M_{hold}$, o progresso normalizado $\tau = \frac{cur - (p + M)}{M_{hold}} \in [0, 1]$ desliza os cards da fita 3D suavemente de Card 0 até Card 3.
   - **Fase 3 (Saída Cinematográfica Suave):** Duração $M_{exit} = v.height \times 0.8$. A máscara de recorte fecha (ou opacidade do viewport transiciona para 0), devolvendo a visibilidade às seções HTML.
   - **Fase 4 (Continuidade da Trilha Horizontal):** Duração $Q = h - p$. A trilha horizontal retoma o movimento de $x = k$ até $x = -h$, apresentando Chapter III (Serviços), Chapter IV (Clientes) e Footer.

3. **Cálculo Matemático Contínuo de $pp(cur)$:**
   ```javascript
   function calculatePortalProgress(cur, p, M, M_hold, M_exit) {
     if (cur <= p) return 0;
     if (cur <= p + M) return (cur - p) / M; // 0 -> 1 (Fase 1)
     if (cur <= p + M + M_hold) return 1.0;  // 1.0 (Fase 2 - Retenção ativa)
     if (cur <= p + M + M_hold + M_exit) {
       return Math.max(0, 1 - (cur - (p + M + M_hold)) / M_exit); // 1 -> 0 (Fase 3 - Saída)
     }
     return 0; // 0 (Fase 4 - Inerte)
   }
   ```
4. **Comportamento de `syncViewportClip(pp)`:**
   - Se $pp \le 0.001$:
     - `clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)'`
     - `pointerEvents = 'none'`
     - `opacity = '0'`
     - Sem atributos `data-lenis-prevent`.
   - Se $0.001 < pp < 0.999$:
     - `clipPath = polygon(...)` (acompanhando `data-more-work-rect`)
     - `pointerEvents = 'none'`
     - `opacity = '1'`
     - Sem atributos `data-lenis-prevent`.
   - Se $pp \ge 0.999$:
     - `clipPath = 'none'`
     - `pointerEvents = 'auto'`
     - `opacity = '1'`
     - Sem `data-lenis-prevent` (rolagem da roda do mouse livre para alimentar Lenis + ScrollTrigger).

---

## 5. Auditoria dos Testes E2E Existentes

Uma inspeção aprofundada dos arquivos de teste `tests/e2e/work-stage.spec.ts` e `tests/e2e/challenger-viewport.spec.ts` revelou como cada gate é operado:

| Gate | Arquivo de Teste | Mecanismo de Navegação | Principais Asserções | Dependência Específica |
|---|---|---|---|---|
| **Gate 1** | `src/components/WorkStage/__tests__/math.spec.ts` | Execução pura CPU em Vitest (7 testes) | Deformações GLSL: `sheetShape`, `sheetWind`, `sheetDome`, `leanRamp`, `leanSlope`, `Blinn-Phong`, `roundedBox`. | Nenhuma dependência de DOM/Scroll. 100% verde. |
| **Gate 2** | `tests/e2e/work-stage.spec.ts` | `__TEST_SCROLL_TO_PORTAL_PROGRESS__(0.35)` e `(1.0)` | Simetria óptica: $\Delta diff = \|(rect.left - more.right) - (work.left - rect.right)\| \le 2.0\text{px}$. Cobertura da viewport em 1.0: $w \ge 1440, h \ge 900, x \le 0, y \le 0$. Telemetria: `phase === 'RIBBON_BROWSE'`. | Usa o helper determinístico que injeta scroll no ScrollTrigger. |
| **Gate 3** | `tests/e2e/work-stage.spec.ts` | Posiciona em 1.0, dispara `page.mouse.wheel(0, 600)`, hover em `[data-work-card-proxy="0"]` | 4 cards `['0', '1', '2', '3']` presentes. `scrollVelocity > 0.05`. Uniform `u_hover > 0.95`. | Depende de proxies DOM montados em coordenadas fixed fora de transformações. |
| **Gate 4** | `tests/e2e/work-stage.spec.ts` | Clica em `[data-work-card-proxy="0"]` | Captura transição `DETAIL_FLIGHT` $\to$ `DETAIL_ACTIVE`. Card 0 descurvado: $u_{sheetP} < 0.01, u_{white} > 0.99, u_{shade} < 0.01$. Vizinhos com fade $u_{alpha} < 0.01$. Painel visível. Header Astro com cores `#faf9f6` e `#2e2b28`. Scroll bloqueado (`overflow: hidden`). | Valida a integração completa R3F + Astro Header. |
| **Gate 5** | `tests/e2e/work-stage.spec.ts` | Dispara clique em `[data-detail-close]` e teclado `Escape` | Captura `DETAIL_CLOSING` $\to$ `RIBBON_BROWSE`. Curvatura restaurada: $u_{sheetP} > 0.99, u_{white} < 0.01$. Vizinhos restaurados: $u_{alpha} > 0.99$. Painel fechado/aria-hidden. `overflow` restaurado para `''`. | Valida restauração limpa de estado. |
| **Challenger Multi-Viewport** | `tests/e2e/challenger-viewport.spec.ts` | Itera 4 resoluções de desktop (1440x900, 1920x1080, 1280x800, 1600x900) | Simetria $\le 2.0\text{px}$, cobertura $\ge vp$, telemetria `webglReady: true`, voo de detalhe em 3 resoluções, integridade de contexto WebGL (`isContextLost: false`, `glError: 0`), zero exceções. | Valida resiliência geométrica e de GPU. |

**Garantia de Não-Regressão:**  
Como todos os Gates 2 a 5 e o Multi-Viewport utilizam `__TEST_SCROLL_TO_PORTAL_PROGRESS__(0.35)` e `(1.0)` para ancorar o estado nos pontos exatos de teste, a substituição da rampa unilateral pela curva de ciclo completo manterá a avaliação no ponto `0.35` (Fase 1) e no ponto `1.0` (Fase 2) rigorosamente inalterada. Logo, **nenhum dos testes existentes sofrerá regressão**.

---

## 6. Arquitetura e Especificação do Novo Gate 6 (Rolagem Contínua de Ponta a Ponta)

### 6.1 Objetivo e Cenário de Uso
Comprovar que um usuário real rolando naturalmente a roda do mouse navega fluidamente desde o topo da página (`scrollY = 0`), testemunha a abertura óptica de "THE WORK", percorre os 4 projetos da fita 3D, experiencia a saída suave e continua rolando sem nenhuma interrupção ou travamento até o Chapter III (Serviços), Chapter IV (Clientes) e o Rodapé.

### 6.2 Especificação Detalhada do Teste (`tests/e2e/work-stage.spec.ts`)

```typescript
test.describe('Gate 6: Rolagem Contínua de Ponta a Ponta (End-to-End Continuous Scroll)', () => {
  test('Rolagem natural da roda do mouse de scrollY = 0 até Chapter III, Chapter IV e Rodapé sem deadlock', async ({
    page,
  }) => {
    test.setTimeout(90000);

    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    page.on('pageerror', (err) => pageErrors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded' });

    // 1. Ponto de partida: Topo estrito
    const initialScrollY = await page.evaluate(() => window.scrollY);
    expect(initialScrollY).toBe(0);

    // Garante inicialização dos scripts de animação e WebGL
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.webglReady === true;
    }, { timeout: 15000 });

    // Posiciona o ponteiro do mouse no centro da tela para disparar eventos de wheel
    await page.mouse.move(720, 450);

    // Sentinel de telemetria para registrar marcos ao longo da travessia contínua
    const milestones = {
      reachedPortalApex: false,
      ribbonVelocityObserved: false,
      reachedServices: false,
      reachedClients: false,
      reachedFooter: false,
    };

    let lastScrollY = -1;
    let consecutiveStuckTicks = 0;
    const MAX_ALLOWED_STUCK_TICKS = 4; // Tolerância máxima antes de decretar deadlock
    const SCROLL_DELTA_STEP = 240;

    // 2. Loop de rolagem inercial progressiva da roda do mouse
    // Dispara rajadas periódicas simulando a rolagem natural do usuário
    for (let step = 0; step < 45; step++) {
      await page.mouse.wheel(0, SCROLL_DELTA_STEP);
      await page.waitForTimeout(65); // Tempo de acomodação do rAF/Lenis

      const currentTelemetry = await page.evaluate(() => {
        const ws = (window as any).__WORK_STAGE__;
        const servicesEl = document.querySelector('[data-services-section]');
        const clientsEl = document.querySelector('[data-section="home-clients"]');
        const footerEl = document.querySelector('[data-section="home-footer"]');
        const viewportEl = document.getElementById('jesper-work-stage-viewport');

        const sBox = servicesEl ? servicesEl.getBoundingClientRect() : null;
        const cBox = clientsEl ? clientsEl.getBoundingClientRect() : null;
        const fBox = footerEl ? footerEl.getBoundingClientRect() : null;

        return {
          scrollY: window.scrollY,
          portalProgress: ws?.portalProgress || 0,
          phase: ws?.phase || '',
          scrollVelocity: ws?.scrollVelocity || 0,
          servicesVisible: sBox ? sBox.left < window.innerWidth && sBox.right > 0 : false,
          servicesCentered: sBox ? sBox.left <= window.innerWidth / 2 && sBox.right >= window.innerWidth / 2 : false,
          clientsVisible: cBox ? cBox.left < window.innerWidth && cBox.right > 0 : false,
          footerVisible: fBox ? fBox.left < window.innerWidth && fBox.right > 0 : false,
          viewportPointerEvents: viewportEl ? window.getComputedStyle(viewportEl).pointerEvents : '',
          viewportClip: viewportEl ? viewportEl.style.clipPath : '',
        };
      });

      // Avaliação de Deadlock: Se o scrollY não mudou e ainda não chegamos ao rodapé
      if (Math.abs(currentTelemetry.scrollY - lastScrollY) < 1.0 && !milestones.reachedFooter) {
        // Durante a permanência na fita, o scrollY deve continuar avançando na timeline do GSAP
        consecutiveStuckTicks++;
        if (consecutiveStuckTicks >= MAX_ALLOWED_STUCK_TICKS) {
          throw new Error(
            `DEADLOCK DETECTADO no step ${step}! scrollY travado em ${currentTelemetry.scrollY}px com portalProgress=${currentTelemetry.portalProgress}.`
          );
        }
      } else {
        consecutiveStuckTicks = 0;
      }
      lastScrollY = currentTelemetry.scrollY;

      // Registro dos marcos
      if (currentTelemetry.portalProgress >= 0.95 && currentTelemetry.phase === 'RIBBON_BROWSE') {
        milestones.reachedPortalApex = true;
      }
      if (currentTelemetry.scrollVelocity > 0.04) {
        milestones.ribbonVelocityObserved = true;
      }
      if (currentTelemetry.servicesVisible) {
        milestones.reachedServices = true;
      }
      if (currentTelemetry.clientsVisible) {
        milestones.reachedClients = true;
      }
      if (currentTelemetry.footerVisible) {
        milestones.reachedFooter = true;
        break; // Atingiu o final com sucesso absoluto
      }
    }

    // 3. Asserções rigorosas dos marcos de navegação
    expect(milestones.reachedPortalApex).toBe(true);
    expect(milestones.ribbonVelocityObserved).toBe(true);
    expect(milestones.reachedServices).toBe(true);
    expect(milestones.reachedClients).toBe(true);
    expect(milestones.reachedFooter).toBe(true);

    // 4. Verificação de estado final do palco 3D e da página
    const finalState = await page.evaluate(() => {
      const ws = (window as any).__WORK_STAGE__;
      const viewportEl = document.getElementById('jesper-work-stage-viewport');
      const footerEl = document.querySelector('[data-section="home-footer"]');
      const fBox = footerEl ? footerEl.getBoundingClientRect() : null;

      return {
        portalProgress: ws?.portalProgress,
        viewportPointerEvents: viewportEl ? window.getComputedStyle(viewportEl).pointerEvents : null,
        footerFullyInView: fBox ? fBox.left <= 100 : false,
      };
    });

    // Ao alcançar o rodapé, o palco 3D deve estar inerte e não bloquear interações
    expect(finalState.viewportPointerEvents).toBe('none');
    expect(finalState.footerFullyInView).toBe(true);

    // Zero exceções em console e runtime
    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
});
```

---

## 7. Ajuste no Servidor de Preview Local (`scripts/serve-marcionilio-site.cjs`)

Durante a inspeção das diretrizes arquiteturais (Hard Guardrail 5), foi constatada uma discrepância crítica em `scripts/serve-marcionilio-site.cjs`:

```javascript
// Linha 46-48 atual:
let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
if (cleanPath === '/' || cleanPath === '') {
  cleanPath = '/gemini-code-1792177008460.html'; // <- INCORRETO
}
```

O servidor local estava servindo um arquivo temporário de scratch em vez do arquivo canônico compilado do cliente.  
**Correção Obrigatória:**
```javascript
let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
if (cleanPath === '/' || cleanPath === '') {
  cleanPath = '/index.html'; // <- CANÔNICO
}
```
Isso garante paridade 1:1 absoluta entre os testes E2E do Playwright e a inspeção manual no navegador pelo time ou usuário.

---

## 8. Matriz de Qualidade & Plano de Verificação

A matriz de gates do projeto deve ser executada na seguinte ordem de precedência:

| Ordem | Gate / Comando | Escopo | Critério de Aceite |
|---|---|---|---|
| **Gate 1** | `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` | Matemática CPU & Shaders | 7/7 testes aprovados com exit code 0. |
| **Gate 2** | `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"` | Simetria Óptica e Expansão | $\Delta diff \le 2.0\text{px}$, cobertura total $1440 \times 900$, fase `RIBBON_BROWSE`. |
| **Gate 3** | `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"` | Fita 3D e Resposta Tátil | 4 projetos indexados, $scrollVelocity > 0.05$, $u_{hover} > 0.95$. |
| **Gate 4** | `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"` | Voo Card-to-Sheet & Tema Astro | Card 0 plano e branco, vizinhos fade-out, detail panel visível, tema Astro `#faf9f6/#2e2b28`. |
| **Gate 5** | `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 5"` | Fecho & Restauração | Retorno a `RIBBON_BROWSE`, descurvatura restaurada, overflow liberado. |
| **Gate 6** | `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 6"` | Rolagem Contínua Ponta a Ponta | Travessia de $scrollY=0$ ao Rodapé sem nenhum deadlock, visitando Services, Clients e Footer. |
| **Stress**| `npx playwright test tests/e2e/challenger-viewport.spec.ts` | Multi-Viewport e GPU Health | Passar em 1440x900, 1920x1080, 1280x800, 1600x900 sem erros de WebGL ou perda de simetria. |

---

## 9. Recomendações Técnicas para o Implementador

1. **Em `initHorizontalScroll.LNLCK81L.js`:**
   - Adicionar a fase de saída `mwExit` na timeline master logo após `mwHold`.
   - Modificar `calculatePortalProgress` para utilizar a rampa bidirecional com retorno a 0.
   - Eliminar a injeção indiscriminada de `data-lenis-prevent` em `onUpdate`.
2. **Em `index.html`:**
   - Remover a `<section data-section="home-work">` redundante.
   - Acrescentar a legenda editorial `Chapter II` na `<section data-more-work-section>`.
3. **Em `WorkStage.tsx`:**
   - Integrar o delta do scroll com a timeline do GSAP para deslizar a fita suavemente durante a Fase 2.
   - Garantir que `scrollVelocity` responda com inércia durante todo o percurso.
4. **Em `serve-marcionilio-site.cjs`:**
   - Apontar rota `/` para `/index.html`.
5. **Em `tests/e2e/work-stage.spec.ts`:**
   - Adicionar a suíte `Gate 6: Rolagem Contínua de Ponta a Ponta`.
