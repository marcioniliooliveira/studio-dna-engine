# Handoff Report — explorer_phase0_3

## 1. Observation
1. **Deadlock do Lenis em `initHorizontalScroll.LNLCK81L.js` (linha 1):**
   `syncViewportClip(pp)` executa:
   ```javascript
   if(pp>=0.999){
     viewportEl.style.clipPath='none';
     viewportEl.style.pointerEvents='auto';
     viewportEl.setAttribute('data-lenis-prevent','true');
     viewportEl.setAttribute('data-lenis-prevent-wheel','true');
     viewportEl.setAttribute('data-lenis-prevent-touch','true');
   }
   ```
   No `onUpdate` do ScrollTrigger:
   ```javascript
   const cur=s.time(), pp=Math.min(1,Math.max(0,(cur-p)/M));
   syncViewportClip(pp);
   ```
   Como `pp` é calculado por `Math.min(1, ...)`, assim que a timeline atinge `p + M`, `pp` permanece cravado em `1.0` por toda a extensão de `mwHold` e pelo restante do documento. A cada frame de rolagem, `data-lenis-prevent` é re-armado.
2. **Lenis Abortando Eventos de Wheel em `lenis.UMZrGmQz.js` (linha 1):**
   ```javascript
   if(a.find(l=>l instanceof HTMLElement&&(typeof d=="function"&&d?.(l)||l.hasAttribute?.("data-lenis-prevent")||...))) return;
   ```
   Como `#jesper-work-stage-viewport` possui `position: fixed; inset: 0; width: 100vw; height: 100vh; pointer-events: auto; z-index: 15;`, qualquer clique ou evento de roda do mouse na janela contém o viewport em sua composed path `a`. O Lenis aborta imediatamente via `return;`, impedindo o incremento de `window.scrollY`.
3. **Redundância do Chapter II em `clientes/marcionilio-oliveira/site/index.html` (linhas 191 a 240):**
   - Seção 3 (`[data-more-work-section]`): Expande o portal 3D "THE WORK" apresentando os 4 projetos (*EVO Money*, *Plant Tag*, *Swiss Haus*, *Betahaus*).
   - Seção 4 (`data-section="home-work"`): Apresenta em HTML estático `[data-work-list]` exatamente os mesmos 4 projetos com o cabeçalho `Chapter II` e previews 2D.
   - Em `src/components/WorkStage/WorkStage.tsx` (linha 703), o cabeçalho do painel detalhado já traz a legenda: `Chapter II — {displayProject.category} ({displayProject.year})`, comprovando que o próprio WebGL WorkStage é a encarnação oficial do Chapter II.
4. **Isolamento de Scripts das Seções Seguintes em `index.html`:**
   - `Services.astro...js`: Seleciona `[data-services-section]` (Chapter III). Não possui nenhuma referência a `[data-section="home-work"]`.
   - `Clients.astro...js`: Seleciona `[data-section="home-clients"]` (Chapter IV) e é acionado por `containerAnimation: B()`.
   - `Work.astro...js`: Contém guarda defensiva na linha 1: `const i = document.querySelector("[data-section='home-work']"); if (!(i instanceof HTMLElement)) return;`.
5. **Baseline dos Testes Existentes:**
   - Gate 1: `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` -> 7 passed (100%).
   - Gates 2, 3, 4, 5: `npx playwright test tests/e2e/work-stage.spec.ts` -> 4 passed (100%).
   - Multi-Viewport: `npx playwright test tests/e2e/challenger-viewport.spec.ts` -> 6 passed (100%).
6. **Desvio de Rota no Servidor de Preview Local em `scripts/serve-marcionilio-site.cjs` (linhas 46-48):**
   ```javascript
   let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
   if (cleanPath === '/' || cleanPath === '') {
     cleanPath = '/gemini-code-1792177008460.html';
   }
   ```
   A rota raiz servia um arquivo temporário ao invés de `/index.html`.

## 2. Logic Chain
1. A partir da **Observação 1 e 2**, quando o usuário atinge o portal óptico em `p + M`, o viewport 3D recebe `data-lenis-prevent="true"` indefinidamente e intercepta todo evento de roda do mouse na janela. O Lenis descarta esses eventos, congelando `window.scrollY`. Por sua vez, o GSAP ScrollTrigger não recebe novos valores de scroll e a timeline nunca alcança a fase de saída nem as seções posteriores da página, caracterizando deadlock irremediável.
2. A partir da **Observação 3 e 4**, a seção 4 (`data-section="home-work"`) é uma duplicata redundante do palco 3D. Se ela for eliminada da trilha horizontal, a Seção 5 (`[data-services-section]`, Chapter III) torna-se a vizinha imediata da Seção 3. Como os scripts de Chapter III e IV escutam a timeline mestre via `containerAnimation`, a remoção da seção 4 não quebra nenhum layout nem dispara erros de JavaScript (`Work.astro` aborta graciosamente pela guarda observada).
3. A partir da **Observação 1 e 5**, a reformulação de `calculatePortalProgress` para um ciclo simétrico contínuo de 4 fases ($0 \to 1 \to 1 \to 0 \to 0$) combinada com a remoção de `data-lenis-prevent` durante a navegação normal da fita mantém os valores de progresso `0.35` e `1.0` intactos para os Gates 2, 3, 4 e 5.
4. A partir das deduções anteriores, a criação do **Gate 6 (Rolagem Contínua de Ponta a Ponta)** é plenamente viável: ele simula rajadas inerciais da roda do mouse desde `scrollY = 0`, verifica a expansão do portal, a resposta de velocidade na fita, a saída limpa e a chegada visual sequencial ao Chapter III (Serviços), Chapter IV (Clientes) e Rodapé sem nenhum deadlock.

## 3. Caveats
- No modo Mobile (`max-width: 767px`), a narrativa utiliza scroll vertical nativo em vez de fita horizontal. O teste Gate 6 especificado foca na experiência desktop (1440x900) conforme solicitado pelos requisitos originais.
- A sensibilidade de rolagem através da fita 3D deve ser calibrada pelo implementador em `WorkStage.tsx` para que a transição entre o card 0 e o card 3 acompanhe a proporção de scroll alocada em $M_{hold}$ ($v.height \times 2.5$).

## 4. Conclusion
A arquitetura do **Ciclo Contínuo em 4 Fases (Abordagem C)** é a única solução determinística que resolve simultaneamente:
1. O deadlock de scroll do Lenis (eliminando `data-lenis-prevent` da fita interativa e criando a fase explícita de saída `mwExit`).
2. A redundância narrativa de Chapter II (removendo a seção estática duplicada e promovendo "THE WORK" a Chapter II oficial).
3. A integridade total dos Quality Gates 1 a 5 e do Multi-Viewport Stress Gate.
4. A especificação completa do novo Gate 6 em `tests/e2e/work-stage.spec.ts`.

## 5. Verification Method
Para verificar independentemente todas as afirmações e asserções deste relatório:
1. **Verificar Gates Existentes:**
   ```powershell
   npx vitest run src/components/WorkStage/__tests__/math.spec.ts
   npx playwright test tests/e2e/work-stage.spec.ts
   npx playwright test tests/e2e/challenger-viewport.spec.ts
   ```
   *Condição de invalidação:* Qualquer falha nos testes atuais indica alteração indevida prévia.
2. **Inspecionar os Arquivos Analisados:**
   - `clientes/marcionilio-oliveira/site/index.html` (linhas 191 a 248)
   - `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js` (função `syncViewportClip`)
   - `clientes/marcionilio-oliveira/site/assets/_astro/lenis.UMZrGmQz.js` (filtro `data-lenis-prevent`)
   - `scripts/serve-marcionilio-site.cjs` (linha 47)
   - `.agents/teamwork/explorer_phase0_3/report.md` (especificação detalhada do Gate 6)
