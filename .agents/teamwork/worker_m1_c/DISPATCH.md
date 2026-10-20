## 2026-10-17T15:40:59Z
Você é worker_m1_c, o Construtor e Especialista em Implementação de Front-End e Interação (GSAP/WebGL/Playwright).
Seu diretório exclusivo de trabalho é:
c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m1_c

Você DEVE ler o arquivo autoritativo de requisitos:
c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
(especialmente a seção ## 2026-10-17T15:18:48Z, requisitos R1 a R4, WP-1 a WP-4, e Hard Guardrails 1 a 5).
Leia também:
- c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator_6\PROJECT.md
- Relatório de arquitetura GSAP/Lenis: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_phase0_1\report.md
- Relatório de interação WorkStage/Build: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_phase0_2\report.md
- Relatório de narrativa DOM e Gate 6: c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_phase0_3\report.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Sua posse exclusiva de escrita de arquivos é:
- `scripts/serve-marcionilio-site.cjs`
- `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`
- `src/components/WorkStage/WorkStage.tsx`
- `clientes/marcionilio-oliveira/site/index.html`
- `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`
- `tests/e2e/work-stage.spec.ts`

Plano de Execução Cirúrgico:
1. **WP-4 Preview Server (`scripts/serve-marcionilio-site.cjs`):**
   - Corrigir a rota raiz: quando `cleanPath === '/' || cleanPath === ''`, atribuir `cleanPath = '/index.html';`.
   - Atualizar a URL padrão de `--open` para abrir `/` diretamente.
2. **WP-1 Timeline GSAP 4 Fases & Eliminação do Deadlock (`clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`):**
   - Na função `syncViewportClip(pp)`: REMOVER sumariamente o set de `data-lenis-prevent`, `data-lenis-prevent-wheel` e `data-lenis-prevent-touch`. O viewport deve apenas ajustar `clipPath` e `pointerEvents` (`auto` quando $pp \ge 0.999$, `none` caso contrário).
   - Na timeline GSAP horizontal:
     - Implementar o ciclo em 4 fases com labels claros:
       - `mwPause` (Fase 1 - Entrada Óptica): escala de 0 a $W$, duração $M_{in}$, $pp$ subindo de 0 a 1.
       - `mwHold` (Fase 2 - Navegação 3D): duração $M_{hold}$, trilha horizontal pinada, $pp = 1.0$.
       - `mwExit` (Fase 3 - Saída Cinematográfica Suave): duração $M_{exit}$, transição suave onde o viewport fecha ou dissolve e $pp$ decresce de 1.0 para 0.0, restaurando a visão da trilha horizontal.
       - `mwResume` (Fase 4 - Continuidade da Página): a trilha retoma o deslocamento $x: -h$ para Chapter III, IV e rodapé.
     - No bloco mobile (`max-width: 767px`): adotar extensão temporal simétrica ($3.3 \times P$) com entrada, retenção e saída por dissolução, sem travamento de toque.
     - Preservar compatibilidade estrita com `window.__TEST_SCROLL_TO_PORTAL_PROGRESS__`.
3. **WP-2 Handshake e Listeners (`src/components/WorkStage/WorkStage.tsx`):**
   - Remover listener duplicado em `document` (manter apenas `window.addEventListener('wheel', onWindowWheel, { passive: true })`).
   - Remover `onWheel={handleWheel}` inline na `div[data-work-webgl-stage]`.
   - Calibrar a ativação dos listeners de wheel/touch para `phase === 'RIBBON_BROWSE' && portalProgress >= 0.99` (evitando canibalização durante abertura).
   - Na fronteira da fita (último projeto), permitir liberação suave de overscroll para que a rolagem prossiga para a fase de saída sem bloqueio.
   - Manter 100% intactas todas as equações GLSL em `RibbonCardMaterial.ts` e `math.ts`, e os 4 projetos canônicos.
4. **WP-3 Resolução da Redundância (`clientes/marcionilio-oliveira/site/index.html`):**
   - Remover a Seção 4 duplicata redundante (`data-section="home-work"`).
   - Assegurar transição direta da Seção 3 (`[data-more-work-section]`) para a Seção 5 (`[data-services-section]`, Chapter III).
5. **WP-4 Recompilação do Bundle:**
   - Executar `npm run build:workstage` e verificar a geração bem-sucedida de `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.
6. **Autorização e Autoria do Gate 6 (`tests/e2e/work-stage.spec.ts`):**
   - Adicionar o novo teste E2E para o Gate 6 conforme especificação detalhada de `explorer_phase0_3/report.md`:
     Navegação contínua da roda do mouse do topo (`scrollY = 0`), abertura do portal, rolagem pela fita 3D, saída suave e avanço ininterrupto até Chapter III (Serviços), Chapter IV (Clientes) e Rodapé sem nunca travar em deadlock.
7. **Verificação Completa de Todos os Quality Gates:**
   - Executar `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` (Gate 1).
   - Executar `npx playwright test tests/e2e/work-stage.spec.ts` (Gates 2, 3, 4, 5 e 6).
   - Executar `npx playwright test tests/e2e/challenger-viewport.spec.ts` (Multi-Viewport).
   - Incluir todos os comandos, tempos e logs de saída em seu `handoff.md`.

Escreva seu relatório de handoff em `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m1_c\handoff.md` e envie mensagem ao orquestrador ao concluir.
