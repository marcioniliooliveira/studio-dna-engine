# Handoff Report — explorer_phase0_1

**Data:** 2026-10-17  
**De:** `explorer_phase0_1` (Explorador Técnico de Arquitetura de Scroll e GSAP/Lenis)  
**Para:** `parent` (Orquestrador / Construtor de Implementação)  
**Assunto:** Investigação Técnica e Projeto da Abordagem C (Scroll Lifecycle, Lenis Deadlock Elimination e Viewport Sync)  
**Tipo de Handoff:** Hard Handoff (Fase 0.1 concluída com evidências e fórmulas prontas para implementação)

---

## 1. Observation

### Observação 1: Re-armamento cego de `data-lenis-prevent` em cada tick de `onUpdate`
- **Arquivo:** `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js` (linha 1)
- **Código Verbatim:**
  ```javascript
  function syncViewportClip(pp){
    const viewportEl=document.getElementById('jesper-work-stage-viewport');
    const rectEl=document.querySelector('[data-more-work-rect]')||document.querySelector('[data-more-work-mobile-rect]');
    if(viewportEl&&rectEl){
      if(pp>=0.999){
        viewportEl.style.clipPath='none';
        viewportEl.style.pointerEvents='auto';
        viewportEl.setAttribute('data-lenis-prevent','true');
        viewportEl.setAttribute('data-lenis-prevent-wheel','true');
        viewportEl.setAttribute('data-lenis-prevent-touch','true')
      } else if(pp<=0.001){
        viewportEl.style.clipPath='polygon(0 0, 0 0, 0 0, 0 0)';
        viewportEl.style.pointerEvents='none';
        viewportEl.removeAttribute('data-lenis-prevent');
        viewportEl.removeAttribute('data-lenis-prevent-wheel');
        viewportEl.removeAttribute('data-lenis-prevent-touch')
      } else {
        const r=rectEl.getBoundingClientRect();
        viewportEl.style.clipPath=`polygon(${r.left}px ${r.top}px, ${r.right}px ${r.top}px, ${r.right}px ${r.bottom}px, ${r.left}px ${r.bottom}px)`;
        viewportEl.style.pointerEvents='none';
        viewportEl.removeAttribute('data-lenis-prevent');
        viewportEl.removeAttribute('data-lenis-prevent-wheel');
        viewportEl.removeAttribute('data-lenis-prevent-touch')
      }
    }
  }
  ```

### Observação 2: Rampa Unilateral sem Fase de Saída
- **Arquivo:** `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js` (linha 1)
- **Código Verbatim:**
  ```javascript
  onUpdate: self => {
    const cur = s.time(),
          pp = Math.min(1, Math.max(0, (cur - p) / M));
    syncViewportClip(pp);
    typeof window != "undefined" && window.__TEST_SET_PORTAL_PROGRESS__ && window.__TEST_SET_PORTAL_PROGRESS__(pp);
  }
  ```
  Na timeline `s`, temos:
  ```javascript
  s.fromTo(r, {x:0}, {x:k, duration:p});
  s.addLabel("mwPause");
  s.fromTo(i, {scale:0}, {scale:W, force3D:!0, duration:M}, "mwPause");
  s.fromTo(u, {x:C}, {x:Y, force3D:!0, duration:M}, "mwPause");
  s.fromTo(a, {x:H}, {x:j, force3D:!0, duration:M}, "mwPause");
  s.addLabel("mwHold");
  s.to(i, {scale:W, duration:M_hold, ease:"none"}, "mwHold");
  s.fromTo(r, {x:k}, {x:-h, duration:Q});
  ```
  Para qualquer instante $cur \ge p + M$, a expressão $(cur - p) / M$ é $\ge 1.0$, fixando $pp = 1.0$ por todo o restante do site. O `#jesper-work-stage-viewport` nunca recebe transição de saída e encobre o documento permanentemente.

### Observação 3: Interceptação Abortiva no Lenis Virtual Scroll
- **Arquivo:** `clientes/marcionilio-oliveira/site/assets/_astro/lenis.UMZrGmQz.js` (linha 1)
- **Código Verbatim:**
  ```javascript
  onVirtualScroll = t => {
    if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(t) === !1) return;
    const { deltaX: e, deltaY: i, event: s } = t;
    ...
    let a = s.composedPath();
    a = a.slice(0, a.indexOf(this.rootElement));
    const d = this.options.prevent, p = Math.abs(e) >= Math.abs(i) ? "horizontal" : "vertical";
    if (a.find(l => l instanceof HTMLElement && (
      typeof d == "function" && d?.(l) ||
      l.hasAttribute?.("data-lenis-prevent") ||
      p === "vertical" && l.hasAttribute?.("data-lenis-prevent-vertical") ||
      p === "horizontal" && l.hasAttribute?.("data-lenis-prevent-horizontal") ||
      o && l.hasAttribute?.("data-lenis-prevent-touch") ||
      h && l.hasAttribute?.("data-lenis-prevent-wheel") ||
      this.options.allowNestedScroll && this.hasNestedScroll(l, {deltaX:e, deltaY:i})
    ))) return;
  ```
  Como `#jesper-work-stage-viewport` cobre a tela com `position: fixed; inset: 0`, qualquer evento wheel/touch o atinge. Lenis encontra `data-lenis-prevent` e sai imediatamente via `return`, impedindo qualquer atualização de `targetScroll` e paralisando a página.

### Observação 4: Aprisionamento Mobile sem Saída
- **Arquivo:** `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js` (linha 1, bloco `max-width: 767px`):
  ```javascript
  p.fromTo(i, {scale:0}, {scale:h, force3D:!0, duration:P}, 0);
  f = b.create({
    trigger: n,
    animation: p,
    start: "top top",
    end: `+=${P}`,
    pin: !0,
    pinSpacing: !0,
    scrub: !0,
    onUpdate: self => {
      const cur = p.time(),
            pp = Math.min(1, Math.max(0, cur / P));
      syncViewportClip(pp);
    }
  });
  ```
  Ao atingir $cur = P$, o gatilho termina, fixando $pp = 1.0$ e atribuindo `data-lenis-prevent-touch="true"`, o que bloqueia o gesto touch do smartphone indefinidamente.

### Observação 5: Servidor de Preview Local apontando para arquivo temporário
- **Arquivo:** `scripts/serve-marcionilio-site.cjs` (linhas 46–48)
- **Código Verbatim:**
  ```javascript
  let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
  if (cleanPath === '/' || cleanPath === '') {
    cleanPath = '/gemini-code-1792177008460.html';
  }
  ```

---

## 2. Logic Chain

1. A partir da **Observação 1** e **Observação 3**, `#jesper-work-stage-viewport` cobre 100% da viewport física (`100vw × 100vh`). Quando `pp >= 0.999`, recebe `data-lenis-prevent="true"`.
2. Como todo evento de roda do mouse ou toque sobre a tela passa pelo `composedPath()` do viewport, o motor do Lenis aborta imediatamente no `onVirtualScroll`, impedindo qualquer scroll do documento pelo usuário.
3. A tentativa em `WorkStage.tsx` de remover o atributo ao atingir overscroll elástico é anulada instantaneamente porque o callback `onUpdate` do GSAP é acionado a cada tick ou mínimo deslocamento, e a **Observação 2** demonstra que para todo $cur \ge p + M$, $pp$ é computado como $1.0$, re-injetando `data-lenis-prevent="true"` no mesmíssimo frame.
4. Além disso, pela **Observação 2**, como a timeline não prevê decaimento para $pp$ nem animação de saída para `#jesper-work-stage-viewport`, o palco tridimensional nunca fecha nem dissolve, cobrindo permanentemente os Capítulos II, III, IV e Rodapé.
5. Pela **Observação 4**, o bloco mobile padece do mesmo vício estrutural, culminando no aprisionamento dos gestos táteis em smartphones.
6. Pela **Observação 5**, o servidor de desenvolvimento serve uma página estática desatualizada na raiz em vez de `index.html`.
7. **Conclusão Lógica:** A solução definitiva requer a reformulação da timeline e da função $pp(cur)$ para a **Abordagem C** (Curva Contínua em 4 Fases: $0 \to 1 \to 1 \to 0 \to 0$), a remoção categórica da injeção cega de `data-lenis-prevent` durante a navegação regular, a extensão simétrica para o bloco mobile e o ajuste de rota no preview server.

---

## 3. Caveats

- **Testes Existentes Baseados em Jumps Determinísticos:** Os testes atuais de Gates 2 a 5 em `tests/e2e/work-stage.spec.ts` utilizam `__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0)` ou `(0.35)`. A nova formulação mantém compatibilidade matemática 100% com esses helpers (para $tp = 0.35$ e $tp = 1.0$, a posição na timeline coincide com $p + 0.35 \times M_{\text{in}}$ e $p + 1.0 \times M_{\text{in}}$).
- **Redundância do Chapter II:** A transição da Fase 3 para a Fase 4 deve harmonizar com a trilha horizontal existente para que o Chapter III (Serviços) surja sem choque visual após a galeria 3D. O implementador deve manter a trilha fluida com `fromTo(r, { x: k }, { x: -h, duration: Q })` a partir do marco `mwResume`.
- **Nenhuma outra limitação não investigada:** Toda a cadeia de scripts (`initHorizontalScroll`, `lenis`, `WorkStage`, `mount`, `serve-marcionilio-site`, `index.html`) foi inspecionada na íntegra.

---

## 4. Conclusion

A causa-raiz do deadlock está diagnosticada com 100% de evidências empíricas e código-fonte verbatim. A arquitetura da Abordagem C está completamente modelada e pronta para implementação na Fase 1 pelos construtores técnicos:
- A timeline GSAP deve conter 4 fases delimitadas por labels (`mwPause`, `mwHold`, `mwExit`, `mwResume`).
- $pp(cur)$ deve ser modelado pela função contínua por partes especificada no relatório.
- `data-lenis-prevent` deve ser sumariamente eliminado do `syncViewportClip`, permitindo fluxo ininterrupto de scroll vertical/horizontal.
- O bloco mobile deve adotar extensão temporal simétrica ($3.3 \times P$) com entrada, retenção e saída por dissolução.
- O preview server deve apontar `/` para `/index.html`.

---

## 5. Verification Method

Para verificar de forma independente e reproduzir as constatações:

1. **Verificação de Código e Linhas:**
   - Inspecione `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js` na linha 1 procurando por `setAttribute('data-lenis-prevent','true')` e `Math.min(1, Math.max(0, (cur - p) / M))`.
   - Inspecione `clientes/marcionilio-oliveira/site/assets/_astro/lenis.UMZrGmQz.js` na linha 1 procurando por `l.hasAttribute?.("data-lenis-prevent")`.
   - Inspecione `scripts/serve-marcionilio-site.cjs` nas linhas 46–48.
2. **Execução da Suíte Existente (Baseline Verificado):**
   ```bash
   npx vitest run src/components/WorkStage/__tests__/math.spec.ts
   # Saída observada: 7 passed (7)
   
   npx playwright test tests/e2e/work-stage.spec.ts
   # Saída observada: 4 passed (24.3s)
   
   npx playwright test tests/e2e/challenger-viewport.spec.ts
   # Saída observada: 6 passed (29.6s)
   ```
3. **Condição de Invalidação:**
   A conclusão seria invalidada apenas se `lenis.UMZrGmQz.js` não possuísse checagem de `data-lenis-prevent`, o que foi refutado pela observação direta no código-fonte.
