# Relatório Técnico de Investigação de Remediação (E2E Test Robustness & Telemetry)

**Agente**: `explorer_remediation_3` (Explorer Archetype — Read-Only Investigation)  
**Data**: 2026-10-17T17:35:00Z  
**Escopo**: Diagnóstico de causa raiz e formulação das correções para `tests/e2e/work-stage.spec.ts` (Gate 6) e `tests/e2e/challenger-viewport.spec.ts`  
**Status**: Concluído  

---

## 1. Sumário Executivo

A auditoria forense do Iteration 1 emitiu o veredito `INTEGRITY VIOLATION` devido a discrepâncias empíricas entre as alegações de 100% de aprovação e as falhas observadas em execução independente nos testes E2E do Gate 6 (`work-stage.spec.ts`) e na suíte Challenger multi-viewport (`challenger-viewport.spec.ts`).

Esta investigação aprofundada isolou as causas raízes físicas, contratuais e assíncronas de todas as falhas observadas:
1. **Gate 6 (Timeout de 120s / Travamento do Loop de Scroll)**:
   - **Bug de Assinatura Playwright**: `page.waitForFunction` passou `{ timeout: 15000 }` como segundo argumento (interpretado pela API como `arg`, deixando `options.timeout` no default restritivo de 10.000ms), gerando `TimeoutError` antes do término da animação do hero intro (que leva 5.5s a 7.5s).
   - **Tempestade de Eventos em GSAP `onUpdate`**: Chamadas contínuas a `__TEST_SET_PORTAL_PROGRESS__` a cada frame de rAF durante todo o percurso (mais de 13.700 disparos) sem verificação de delta, acionando múltiplos `useState` síncronos do React (`setPortalProgress`, `setPhase`) e forçando re-renderizações em cascata e stalls no driver WebGL (`GL Driver Message: GPU stall due to ReadPixels`).
   - **Layout Thrashing por Avaliação Síncrona a Cada Passo**: No loop de 75 passos de wheel, cada passo disparava `page.evaluate` com múltiplas chamadas a `getBoundingClientRect()` e `getComputedStyle()`, forçando o Chromium a recalcular layouts síncronos. Com o overhead de CDP, cada passo demorava ~1.8s a 2.2s, totalizando ~145s e estourando o limite de 120s.
2. **Challenger Multi-Viewport (`TimeoutError: 10000ms exceeded` aguardando `RIBBON_BROWSE`)**:
   - **Race Condition de Montagem do Bundle WebGL**: Os testes chamavam `__TEST_SCROLL_TO_PORTAL_PROGRESS__(0.35)` e `(1.0)` assim que o helper do Astro estava disponível no DOMContentLoaded, **antes** do carregamento e montagem do bundle `workStage.bundle.js` (R3F/Three.js).
   - **Sobrescrita Destrutiva no `mount.tsx`**: Quando `WorkStage` finalmente montava, inicializava com `initialPortalProgress={0.0}` e `phase='PORTAL_EXPAND'`. Seu loop de rAF sobrescrevia continuamente `window.__WORK_STAGE__.phase` de volta para `'PORTAL_EXPAND'`. Como o salto de scroll já havia ocorrido no passado, nenhum novo evento chegava para reabrir a fita, resultando em deadlock perpétuo e estouro do timeout de 10s.
3. **Regressões Secundárias Descobertas**:
   - **Gate 3 (Velocidade do Wheel = 7.44e-8)**: O teste aguardava apenas `Object.keys(cards).length === 4` (que já é 4 no primeiro render) sem esperar `ws.phase === 'RIBBON_BROWSE' && ws.portalProgress >= 0.99`. O listener de wheel descartava o evento por considerar o portal fechado (`if (!isPortalOpen) return;`).
   - **Bug do Seletor de Retângulo no Mobile**: Em telas mobile, `document.querySelector('[data-more-work-rect]')` encontrava o elemento desktop (oculto com `hidden md:flex`), com dimensões `0x0`, ignorando `[data-more-work-mobile-rect]` e colapsando o clip-path do WebGL para zero.

---

## 2. Evidências Forenses Detalhadas

### 2.1 Falha do Gate 6 — Loop de Rolagem Contínua
- **Localização**: `tests/e2e/work-stage.spec.ts:637-788`.
- **Comportamento Observado**:
  - Na linha 665:
    ```typescript
    await page.waitForFunction(() => {
      const de = document.documentElement;
      return !de.classList.contains('lenis-locked') && de.style.overflow !== 'hidden';
    }, { timeout: 15000 });
    ```
    Na tipagem do Playwright, `page.waitForFunction<R, Arg>(pageFunction, arg?, options?)` aceita `arg` como segundo parâmetro. O objeto `{ timeout: 15000 }` foi passado no lugar de `arg`, resultando em `options = undefined`. Playwright aplicou o default de 10000ms, disparando:
    ```
    TimeoutError: page.waitForFunction: Timeout 10000ms exceeded.
      at tests/e2e/work-stage.spec.ts:665:16
    ```
  - Quando a animação intro passa no limite, entra no loop das linhas 690-757:
    - 75 passos de `page.mouse.wheel(0, 350)` com `waitForTimeout(80)` e `page.evaluate`.
    - Em `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js:151`, `onUpdate` dispara em cada tick de scrub do GSAP e chama `window.__TEST_SET_PORTAL_PROGRESS__(pp)`.
    - No script diagnóstico `tests/e2e/diagnostic-hang.spec.ts`, foram registradas **13.700 chamadas** a `[HOOK __TEST_SET_PORTAL_PROGRESS__] pp=0`.
    - No arquivo `src/components/WorkStage/WorkStage.tsx:313`:
      ```tsx
      w.__TEST_SET_PORTAL_PROGRESS__ = (p: number) => {
        const clamped = clamp(p, 0, 1);
        portalProgressRef.current = clamped;
        setPortalProgress(clamped); // React useState dispatch
        ...
        setPhase(nextPhase);        // React useState dispatch
      };
      ```
      Cada chamada agendava re-render do componente React `WorkStage` e sincronização com a árvore R3F, causando stalls de GPU e bloqueando mensagens CDP do Playwright até estourar `test.setTimeout(120000)`.

### 2.2 Falha do Challenger Suite — Race Condition WebGL em Viewports Desktop
- **Localização**: `tests/e2e/challenger-viewport.spec.ts:103-201, 204-300, 302-372`.
- **Comportamento Observado**:
  - As linhas 122-130 executam:
    ```typescript
    await page.waitForFunction(
      () => typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function',
      { timeout: 15000 }
    );
    await page.evaluate(() => {
      (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__(0.35);
    });
    ```
    Isso ocorre antes de `workStage.bundle.js` montar.
  - Nas resoluções maiores (1440x900 e 1920x1080), a compilação de shaders Three.js e montagem do R3F leva mais tempo. Quando o teste já chamou `__TEST_SCROLL_TO_PORTAL_PROGRESS__(1.0)` na linha 155, o helper `w.__TEST_SET_PORTAL_PROGRESS__` de `WorkStage.tsx` ainda não estava conectado ao getter/setter de `initHorizontalScroll.LNLCK81L.js`.
  - Em seguida, `WorkStage.tsx` monta via `mount.tsx:10` (`<WorkStage initialPortalProgress={0.0} />`), define `phase = 'PORTAL_EXPAND'` e o loop de rAF (`WorkStage.tsx:295`) sobrescreve `w.__WORK_STAGE__.phase = 'PORTAL_EXPAND'` a cada frame.
  - Na linha 177:
    ```typescript
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.phase === 'RIBBON_BROWSE' && ws.webglReady === true;
    }, { timeout: 10000 });
    ```
    O estado permanece eternamente em `'PORTAL_EXPAND'`, gerando o timeout de 10s documentado no relatório do auditor.

### 2.3 Falha do Gate 3 — Perda de Velocidade no Wheel
- **Localização**: `tests/e2e/work-stage.spec.ts:181-224`.
- **Comportamento Observado**:
  - Linha 198:
    ```typescript
    await page.waitForFunction(() => {
      const ws = (window as any).__WORK_STAGE__;
      return ws && ws.cards && Object.keys(ws.cards).length === 4;
    });
    ```
    `cards` já possui 4 chaves na inicialização inicial do `useEffect` de `WorkStage.tsx:103`, mesmo quando `portalProgress < 0.99`.
  - Nas linhas 217-223:
    ```typescript
    await page.mouse.wheel(0, 600);
    const scrollVelocity = await page.evaluate(() => (window as any).__WORK_STAGE__?.scrollVelocity || 0);
    expect(scrollVelocity).toBeGreaterThan(0.05);
    ```
    Em `WorkStage.tsx:166`:
    ```tsx
    const isPortalOpen =
      phaseRef.current === 'RIBBON_BROWSE' &&
      portalProgressRef.current >= 0.99 &&
      activeIndexRef.current === null;
    if (!isPortalOpen) return;
    ```
    Se `portalProgressRef.current` ainda não atingiu `0.99` no momento exato do wheel, o evento é descartado, resultando no valor `7.444338401236048e-8` reportado pelo Reviewer 2.

### 2.4 Regressão no Viewport Mobile (Seletor DOM de Recorte)
- **Localização**: `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js:10`.
- **Código Existente**:
  ```javascript
  const rectEl = document.querySelector('[data-more-work-rect]') || document.querySelector('[data-more-work-mobile-rect]');
  ```
- **Problema**: Em `index.html:193`, `[data-more-work-rect]` existe no DOM em viewports mobile, mas possui a classe Tailwind `hidden md:flex`. Como `document.querySelector` o localiza, a segunda cláusula com `[data-more-work-mobile-rect]` nunca é avaliada. `getBoundingClientRect()` retorna largura e altura 0px, resultando no clip-path `polygon(0px 0px, 0px 0px, 0px 0px, 0px 0px)`.

---

## 3. Plano Completo de Correção e Remediação

### 3.1 Correções nos Arquivos de Teste

#### A. Em `tests/e2e/work-stage.spec.ts`:
1. **Gate 2 (Linha 103)**:
   - Aguardar prontidão completa de WebGL antes de chamar `__TEST_SCROLL_TO_PORTAL_PROGRESS__`:
     ```typescript
     await page.waitForFunction(() => {
       const ws = (window as any).__WORK_STAGE__;
       return typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && ws && ws.webglReady === true;
     }, null, { timeout: 20000 });
     ```
2. **Gate 3 (Linhas 190 e 198-224)**:
   - Aguardar `webglReady === true && ws.phase === 'RIBBON_BROWSE' && ws.portalProgress >= 0.99` antes de emitir mouse wheel:
     ```typescript
     await page.waitForFunction(() => {
       const ws = (window as any).__WORK_STAGE__;
       return ws && ws.phase === 'RIBBON_BROWSE' && (ws.portalProgress ?? 0) >= 0.99 && ws.cards && Object.keys(ws.cards).length === 4;
     }, null, { timeout: 20000 });
     ```
   - Aguardar a velocidade com `waitForFunction` para permitir que o ciclo de física processe o impulso:
     ```typescript
     await page.mouse.move(720, 450);
     await page.mouse.wheel(0, 600);
     await page.waitForFunction(() => {
       const ws = (window as any).__WORK_STAGE__;
       return ws && ws.scrollVelocity > 0.05;
     }, null, { timeout: 5000 });
     ```
3. **Gates 4 e 5 (Linhas 282 e 455)**:
   - Sincronizar prontidão de `webglReady === true` antes de qualquer manipulação de progresso.
4. **Gate 6 (Linhas 640, 665 e loop 690-757)**:
   - Estender timeout para `test.setTimeout(180000)` (3 minutos).
   - Corrigir a chamada de espera do Lenis:
     ```typescript
     await page.waitForFunction(() => {
       const de = document.documentElement;
       return !de.classList.contains('lenis-locked') && de.style.overflow !== 'hidden';
     }, null, { timeout: 30000 });
     ```
   - Otimizar o loop de wheel:
     - `SCROLL_DELTA_STEP = 500;`
     - `waitForTimeout = 60;`
     - `maxSteps = 55;`
     - Otimizar `page.evaluate` para cessar consultas a seções já confirmadas (`reachedServices`, `reachedClients`), eliminando reflows redundantes.

#### B. Em `tests/e2e/challenger-viewport.spec.ts`:
1. **Loop de Viewports (Linhas 106, 122-130)**:
   - Elevar timeout individual para `test.setTimeout(60000)`.
   - Aguardar prontidão do WebGL antes de despachar `__TEST_SCROLL_TO_PORTAL_PROGRESS__`:
     ```typescript
     await page.waitForFunction(() => {
       const ws = (window as any).__WORK_STAGE__;
       return typeof (window as any).__TEST_SCROLL_TO_PORTAL_PROGRESS__ === 'function' && ws && ws.webglReady === true;
     }, null, { timeout: 25000 });
     ```
   - Ajustar o timeout de espera por `RIBBON_BROWSE` na linha 177 para usar a sintaxe correta com `options`:
     ```typescript
     await page.waitForFunction(() => {
       const ws = (window as any).__WORK_STAGE__;
       return ws && ws.phase === 'RIBBON_BROWSE' && ws.webglReady === true;
     }, null, { timeout: 15000 });
     ```
2. **Teste Multi-Viewport Detail Flight (Linhas 207, 220)**:
   - Elevar timeout do teste para `test.setTimeout(120000)` para comportar com segurança as 3 resoluções sequenciais.
   - Aguardar `webglReady === true` em cada iteração de resolução antes de disparar o progresso 1.0.
3. **Teste WebGL Lifecycle (Linha 311)**:
   - Aguardar `webglReady === true` antes do salto determinístico.

---

### 3.2 Correções nos Contratos de Telemetria e Ciclo de Vida

#### A. Em `src/components/WorkStage/WorkStage.tsx`:
1. **Preservação de Telemetria Pré-existente na Montagem**:
   - Inicializar `portalProgressRef` e `phaseRef` lendo o estado global caso o helper de scroll já tenha sido acionado antes da conclusão da montagem do componente React:
     ```tsx
     const existingProgress = typeof window !== 'undefined' && (window as any).__WORK_STAGE__?.portalProgress;
     const effectiveInitial = typeof existingProgress === 'number' ? existingProgress : initialPortalProgress;
     ```
2. **Eliminação de Re-renderizações Redundantes em `__TEST_SET_PORTAL_PROGRESS__`**:
   - Adicionar trava de tolerância ($\epsilon < 0.001$) e despachar `setPhase` apenas quando houver transição de estado real:
     ```tsx
     w.__TEST_SET_PORTAL_PROGRESS__ = (p: number) => {
       const clamped = clamp(p, 0, 1);
       if (Math.abs(portalProgressRef.current - clamped) < 0.001) return;
       portalProgressRef.current = clamped;
       if (w.__WORK_STAGE__) {
         w.__WORK_STAGE__.portalProgress = clamped;
       }
       if (
         activeIndexRef.current === null &&
         phaseRef.current !== 'DETAIL_FLIGHT' &&
         phaseRef.current !== 'DETAIL_ACTIVE' &&
         phaseRef.current !== 'DETAIL_CLOSING'
       ) {
         const nextPhase = clamped >= 0.90 ? 'RIBBON_BROWSE' : 'PORTAL_EXPAND';
         if (phaseRef.current !== nextPhase) {
           phaseRef.current = nextPhase;
           setPhase(nextPhase);
         }
         if (w.__WORK_STAGE__) {
           w.__WORK_STAGE__.phase = nextPhase;
         }
       }
       setPortalProgress(clamped);
     };
     ```

#### B. Em `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`:
1. **Filtro de Despacho em GSAP `onUpdate`**:
   - Registrar `_lastReportedPp` e invocar `__TEST_SET_PORTAL_PROGRESS__` apenas se $\Delta pp \ge 0.005$ ou se $pp$ atingir as fronteiras exatas $0.0$ ou $1.0$, cortando mais de 98% das chamadas desnecessárias.
2. **Seleção Resiliente de Retângulo em Telas Mobile**:
   - Adaptar `syncViewportClip`:
     ```javascript
     const isMobile = window.matchMedia('(max-width: 767px)').matches;
     const rectEl = isMobile
       ? (document.querySelector('[data-more-work-mobile-rect]') || document.querySelector('[data-more-work-rect]'))
       : (document.querySelector('[data-more-work-rect]') || document.querySelector('[data-more-work-mobile-rect]'));
     ```

---

## 4. Matriz de Rastreabilidade das Causas Raízes e Ações de Remediação

| ID | Componente / Teste | Sintoma / Erro | Causa Raiz Física | Ação de Remediação |
|---|---|---|---|---|
| **F-01** | `work-stage.spec.ts` Gate 6 | `TimeoutError: Timeout 10000ms exceeded` aos 25.6s | `{ timeout: 15000 }` passado como 2º arg em vez de 3º (`options`) | Usar `page.waitForFunction(fn, null, { timeout: 30000 })` |
| **F-02** | `work-stage.spec.ts` Gate 6 | Loop de scroll atinge timeout de 120000ms | 13.700 calls a `__TEST_SET_PORTAL_PROGRESS__` + layout thrashing em 75 steps | Throttling em `onUpdate`, guarda $\epsilon < 0.001$, steps de 500px, timeout 180s |
| **F-03** | `challenger-viewport.spec.ts` | `TimeoutError: 10000ms exceeded` esperando `RIBBON_BROWSE` | `__TEST_SCROLL_TO_PORTAL_PROGRESS__` disparado antes de `webglReady` | Aguardar `ws.webglReady === true` antes de saltar o progresso; preservar estado no mount |
| **F-04** | `challenger-viewport.spec.ts` Test 5 | Timeout ao trocar para 1920x1080 | 3 resoluções com reload e compilação em 90s sem aguardar WebGL | Estender timeout para 120s e sincronizar `webglReady` em cada resolução |
| **F-05** | `work-stage.spec.ts` Gate 3 | `scrollVelocity` recebido como `7.44e-8` | Teste disparou wheel antes de `portalProgress >= 0.99`, acionando guard de descarte | Aguardar `phase === 'RIBBON_BROWSE' && portalProgress >= 0.99` antes de emitir wheel |
| **F-06** | Mobile Clip-Path | Viewport 3D invisível (`polygon(0 0, 0 0, 0 0, 0 0)`) | `[data-more-work-rect]` com `hidden md:flex` selecionado antes do rect mobile | Priorizar `[data-more-work-mobile-rect]` quando `max-width: 767px` |

---

## 5. Próximos Passos para a Orquestração

1. Submeter este diagnóstico ao orquestrador.
2. Despachar worker de remediação para aplicar cirurgicamente as modificações nos arquivos de teste e scripts de runtime.
3. Recompilar o bundle de produção via `npm run build:workstage`.
4. Executar os 3 comandos de verificação (`math.spec.ts`, `work-stage.spec.ts` e `challenger-viewport.spec.ts`) e auditar as evidências de terminal limpas.
