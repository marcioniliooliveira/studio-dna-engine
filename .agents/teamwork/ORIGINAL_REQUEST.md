# Original User Request

## 2026-10-03T07:10:31Z

Sistema de geração e transmutação front-end de alta fidelidade que recebe URLs de referência do Awwwards e especificações de marca de clientes, produzindo websites cinéticos e tridimensionais com zero defeitos de layout, zero degradação estética (anti-slop) e fidelidade de renderização comprovada a 60fps em Desktop e Mobile.

Working directory: C:\Users\wd\Documents\playwright-scraper
Integrity mode: development

## Requirements

### R1. Decompilador Semântico de Referências Web
Construir o pipeline automatizado que ingere uma URL arbitrária de alta tecnologia, intercepta o grafo cinético de timelines na memória via Chrome DevTools Protocol (CDP) e extrai um esqueleto semântico higienizado sem dependências de trackers ou scripts de analytics.

### R2. Extrator de Trajetória Cinética & Âncoras Espaciais Dinâmicas
Implementar o desacoplador de movimento que analisa sequências de mídia ou renders e extrai a função de câmera orbital contínua \vec{C}(s), vinculando linhas e anotações técnicas do HTML aos pontos de interesse do novo produto através de rastreamento óptico durante todo o scroll.

### R3. Pipeline de Assets 3D Ultraleves para Mobile
Integrar a esteira de otimização geométrica que converte modelos ou fotos de produtos em malhas 3D com peso total inferior a 3MB e pegada de VRAM inferior a 4MB, garantindo compatibilidade estrita com os limites de GPU do WebKit / Mobile Safari.

### R4. Gramática de Composição Cinética & Compilador Dual-Stack
Substituir a rigidez de esqueletos fixos por uma gramática de primitivas modulares independentes com escopo `@scope` isolado, capaz de exportar tanto páginas HTML ultrarrápidas para Edge CDN quanto componentes React Server Components (RSC) com Ilhas de Cliente para Next.js 15 App Router.

## Acceptance Criteria

### Integridade Física & Ausência de Colisões
- [ ] AABB Overlap = 0px² em 100% dos frames de scroll em Desktop (1440x900) e Mobile (390x844).
- [ ] Zero sangramento horizontal (scrollWidth <= clientWidth) em telas de smartphone.
- [ ] Zero colisões em pares 3D declarados com validação pelo DeepScrutinyGate.

### Performance e Hardware
- [ ] Framerate contínuo >= 58fps durante scroll inercial no Chromium e WebKit sem quedas de frame superiores a 16.6ms.
- [ ] Consumo de VRAM de assets 3D <= 384MB sem crash no Safari iOS.
- [ ] Tamanho total do pacote inicial de assets <= 5MB.

### Verificação Automatizada
- [ ] Suíte de testes automatizados com 100% de aprovação via npm test e node --test.
- [ ] Zero geração de strings livres de código ou HTML arbitrário por modelos de IA autorregressivos.


## 2026-10-04T20:14:18Z

Sistema de pesquisa, calibração e evolução do framework front-end autônomo studio-dna v2.5, integrando o motor determinístico de layout (AABB/VRAM), a suíte anti-slop do Impeccable e 8 frentes avançadas de cognição, estados finitos, física háptica e resiliência de hardware.

Working directory: C:\Users\wd\Documents\playwright-scraper
Integrity mode: development

## Requirements

### R1. Auditoria e Higienização de Anti-Padrões de Superfície (Taste & Craft Floor)
Integrar a suíte do Impeccable (detect-antipatterns.mjs) como Quality Gate (Tier 4) e higienizar cirurgicamente as telas ativas (JumpPlay), eliminando os 17 anti-padrões identificados (dark-glow, nested-cards, overused-font, bounce-easing).

### R2. Especificação e Prototipação de Primitivas de Estado (FSM) para Formulários
Pesquisar e projetar uma camada de Máquinas de Estado Finitas (baseada nos princípios de Zag.js/XState) para fluxos de checkout e cotação B2B/B2C, garantindo validação determinística inline, máscaras adaptativas, feedback de latência e recuperação de rascunhos.

### R3. Motor de Física Háptica e Molas Analíticas (Spring Dynamics)
Formular o modelo matemático de segunda ordem (\ddot{x} + 2\zeta\omega_n\dot{x} + \omega_n^2 x = 0) em vanilla JS ultraleve para interações táteis (arrasto, gavetas e feedback háptico via Vibration API), substituindo curvas de bezier estáticas e garantindo fallback estrito para prefers-reduced-motion.

### R4. Pipeline de Texturas GPU (KTX2 / Basis Universal) & Auditoria de Saliência Visual
Projetar o pipeline automatizado de transcodificação de assets 3D via gltf-transform para compressão KTX2/Basis e integrar oráculos de predição de saliência visual (atenção nos primeiros 500ms) para validação óptica do CTA e eliminação de distrações geradas por IA.

### R5. Suíte de Testes de Estresse em Hardware Adverso
Desenvolver cenários de teste automatizados via Playwright CDP simulando CPU throttled (6x), limitação de rAF a 30fps (Modo de Pouca Energia do Safari) e eventos de recuperação de contexto WebGL (webglcontextlost / webglcontextrestored).

## Acceptance Criteria

### Integridade Visual & Anti-Slop (Taste Floor)
- [ ] 0 ocorrências de dark-glow, nested-cards, overused-font ou bounce-easing validadas via detect-antipatterns.mjs.
- [ ] Remoção completa de halos radioativos e achatamento de contêineres aninhados na tela B2B do JumpPlay.

### Estados Finitos & Acessibilidade
- [ ] 100% dos estados de formulário cobertos sem transições impossíveis ou travamentos visuais.
- [ ] Conformidade com WCAG 2.2 AA e navegação de teclado completa validada via @axe-core/playwright.

### Física & Performance
- [ ] Transições táteis com continuidade de velocidade e zero overshoot em prefers-reduced-motion.
- [ ] Assets 3D com texturas KTX2 mantendo VRAM <= 16MB na GPU e zero quedas de frame superiores a 16.6ms.


## 2026-10-15T18:45:01Z

Implement a complete Model Context Protocol (MCP) server for Studio DNA Engine, providing full tool access (scraping, deterministic transmutation, dual-stack compilation, and quality gates), contextual resources (client DNA, repository clones, and design vault), and guided prompts for external AI agents.

Working directory: c:\Users\wd\Documents\playwright-scraper
Integrity mode: development

## Requirements

### R1. Complete Modular Tool Surface
Implement clean, modular MCP tools in `src/mcp/tools/` registered onto the McpServer:
- Ingestion: `scrape_and_extract_dna` (deep cloner pipeline) and `inspect_reference` (metadata/asset inspection of `copias/`).
- Iteration & Production: `create_client_project` (ICM client workspace generator), `transmute_client_site` (canonical deterministic transmuter applying `brand-spec.json`), `compile_dualstack` (Edge Static & Next.js RSC compilers), `inject_content_slots`, and `patch_brand_spec`.
- Quality Assurance: `run_unified_quality_gate` (Playwright headless auditing console, network, images, anti-slop), `run_impeccable_gate` (visual anti-pattern linter), `run_box_diff_linter`, and `audit_visual_saliency`.
- Vault: `query_design_vault` (querying easings, typography pairings, and components).

### R2. Contextual Resources and Guided Prompts
Implement clean MCP resources in `src/mcp/resources/` and prompts in `src/mcp/prompts/`:
- Static resources: `vault://easings`, `vault://typography`, `vault://components`.
- Dynamic resource templates: `client://{slug}/dna`, `client://{slug}/slots`, `client://{slug}/audit`, and `ref://{slug}/dna`.
- Interactive prompt templates: `new_client_onboarding` and `fix_quality_gate_failure`.

### R3. Strict ICM Isolation, Path Security & Backward Compatibility
- Enforce path-traversal prevention on all client and reference slugs via strict slug validation.
- Enforce read-only guarantees on `copias/` (no tools may alter reference skeletons).
- Maintain isolated workspaces per client under `clientes/{slug}/`.
- Update `src/mcp-server.js` as the canonical STDIO runner delegating to `src/mcp/index.js`, maintaining 100% backward compatibility.

## Acceptance Criteria

### Automated Verification
- [ ] `node --test test/mcp-server.test.js` passes with 100% assertions covering tools, resources, templates, prompts, and traversal security.
- [ ] Attempting to access paths outside `clientes/` or `copias/` via traversal (e.g., `../../`) fails with an explicit error.
- [ ] Server initializes cleanly over `stdio` transport without runtime exceptions or missing module errors.


## 2026-10-15T19:42:30Z

Fundir e consolidar com rigor matemático e determinístico a secção **"THE WORK"** do cliente `marcionilio-oliveira` com o motor espacial WebGL 3D de apresentação de projetos e visão detalhada (*Card-to-Sheet*) inspirado em `jesperlandberg-com`, utilizando React Three Fiber, Drei, GSAP e validação TDD estrita via Playwright e Vitest.

Working directory: c:\Users\wd\Documents\playwright-scraper
Integrity mode: development

## Guidelines & Hard Guardrails
1. **Sem `<ScrollControls>`:** O scroll da página é controlado pelo Lenis e GSAP ScrollTrigger (`initHorizontalScroll.LNLCK81L.js`). Nunca injetar um segundo controlador de scroll no R3F.
2. **Equações GLSL Intactas:** Preservar a física de deformação dos shaders (`sheetShape`, `sheetShapeSlope`, `sheetWind`, `sheetDome`, `leanRamp`, `leanSlope`, `sheetLit`, `uvCover`, `roundedBox`).
3. **Contrato de Dados e Tokens:** Exclusivamente os 4 projetos (`evo-money`, `plant-tag`, `swisshaus`, `betahaus`) e tokens de cor de `referenceData.ts`.
4. **Header Lateral Astro:** O painel de detalhe deve conter `data-work-detail-panel`, `data-header-bg="#FAF9F6"`, `data-header-text="#2E2B28"` e `data-header-border="#b8b3ac"`, com cobertura física do header para ativação determinística em `headerTheme.BVy9gA6p.js`.
5. **Telemetria Global:** Manter `window.__WORK_STAGE__` sincronizado a cada frame com fase, cards, u_sheetP, u_hover, u_white, u_shade, u_scrim, u_sheetV e u_alpha.

## Requirements

### R1. Fita 3D com Física de Scroll e Resposta Tátil (Gate 3)
- Renderizar os 4 cards com geometria 24x24 em fita horizontal com stride = 18.5 unidades e piso em perspetiva `FloorGrid`.
- Implementar camada DOM acessível de botões proxy montados fora de transformações destrutivas (com `createPortal` para `document.body` em coordenadas `fixed`).
- Resposta de scroll com inércia: wheel do utilizador aumenta `scrollVelocity > 0.05` e desliza a fita suavemente.
- Hover no proxy DOM do card 0 aciona animação GSAP elevando `cards[0].uniforms.u_hover > 0.95`.

### R2. Voo Espacial Card-to-Sheet e Visão Detalhada (Gate 4)
- Ao clicar em `[data-work-card-proxy="0"]`, transicionar fase para `'DETAIL_FLIGHT'` e depois `'DETAIL_ACTIVE'`.
- Card 0 executa voo tridimensional para o centro e descurva completamente: `u_sheetP < 0.01`, `u_white > 0.99`, `u_shade < 0.01`, `u_scrim < 0.01`.
- Cards vizinhos (1, 2, 3) sofrem fade-out: `u_alpha < 0.01`.
- Painel DOM `[data-work-detail-panel]` torna-se visível e o header lateral `<header data-intro-header>` adota as variáveis `--header-bg: #faf9f6` e `--header-text: #2e2b28`.

### R3. Fecho do Detalhe e Restauração da Fita (Gate 5)
- Ao clicar em `[data-detail-close]` ou teclar Escape, transicionar fase para `'DETAIL_CLOSING'` e regressar a `'RIBBON_BROWSE'`.
- Card 0 restaura a curvatura da fita (`u_sheetP > 0.99`, `u_white < 0.01`).
- Cards vizinhos restauram visibilidade (`u_alpha > 0.99`).
- O painel fecha e o overflow do documento é restaurado (`overflow: ''`).

## Acceptance Criteria

### Testes Automatizados E2E (Playwright) & Unitários (Vitest)
- [ ] **Gate 1 (Verificação Matemática CPU):**
  `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` passa com exit code 0 (7/7 testes).
- [ ] **Gate 2 (Simetria Óptica e Expansão do Portal):**
  `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"` passa com exit code 0.
- [ ] **Gate 3 (Fita 3D, Velocidade e Hover):**
  `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"` passa com exit code 0.
- [ ] **Gate 4 (Voo Card-to-Sheet e Ativação do Detalhe):**
  `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"` passa com exit code 0.
- [ ] **Gate 5 (Fecho e Restauração de Estado):**
  `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 5"` passa com exit code 0.


## 2026-10-15T20:00:34Z

Servidor reiniciado. Por favor, retome a orquestração e a execução dos marcos M1 (testes E2E dos Gates 4 e 5), M2 (portais DOM no WorkStage.tsx e rebuild do bundle) e M3 (execução e verificação dos Gates 1 a 5). Prossiga com a equipa.

## 2026-10-17T15:18:48Z

# Teamwork Project Prompt — Final

> Status: Launched
> Goal: Multi-agent execution via `teamwork_preview`
> Requested team: Equipe multidisciplinar especializada (WebGL Shader Engineer, GSAP/Lenis Interaction Specialist, QA Playwright Auditor)

Implementar a arquitetura cinemática contínua em 4 fases (Abordagem C) para a seção "THE WORK" de Marcionilio Oliveira (`clientes/marcionilio-oliveira`), eliminando o deadlock do Lenis e harmonizando a fita 3D de Jesper Landberg com o scroll horizontal da página, viabilizando o ciclo completo: abertura óptica, navegação interativa na fita, saída cinematográfica suave e continuidade natural para o restante do site.

Working directory: c:\Users\wd\Documents\playwright-scraper
Integrity mode: development

---

## 🏛️ Diretrizes Arquiteturais Inegociáveis (Hard Guardrails)

1. **Ciclo de Vida Contínuo em 4 Fases (Continuous 4-Phase Cinematic Arc):**
   - A timeline do GSAP ScrollTrigger em `initHorizontalScroll.LNLCK81L.js` deve modelar uma curva de vida completa:
     - **Fase 1 (Entrada Óptica):** Expansão do portal de `scale: 0` a `W`, com máscara de recorte dinâmica acompanhando `[data-more-work-rect]`.
     - **Fase 2 (Navegação Interativa 3D):** Retenção com a trilha horizontal fixada enquanto a rolagem (roda/touch/trackpad) movimenta os 4 projetos editoriais na fita 3D com curvatura e física inercial.
     - **Fase 3 (Saída Cinematográfica Suave):** Transição de saída (deslocamento lateral coordenado com a trilha horizontal ou dissolução óptica progressiva), restaurando a máscara ou reduzindo a opacidade do `#jesper-work-stage-viewport`.
     - **Fase 4 (Continuidade da Página):** O trilho horizontal retoma seu percurso linear para o Capítulo III (Serviços), Capítulo IV (Clientes) e Rodapé.
2. **Eliminação do Deadlock de Lenis Prevent:**
   - É terminantemente proibido re-armar `data-lenis-prevent="true"` indefinidamente a cada tick de `onUpdate`.
   - O controle de rolagem deve utilizar uma máquina de estados de transição clara: enquanto dentro da zona útil da fita, os deltas navegam os cards; ao atingir a extremidade ou continuar a rolagem, a página avança suavemente para a fase de saída sem congelamentos.
3. **Resolução de Redundância com o Chapter II:**
   - Como os 4 projetos (*EVO Money*, *Plant Tag*, *Swiss Haus* e *Betahaus*) são apresentados no palco 3D imersivo, a transição pós-portal deve conduzir naturalmente para a narrativa de serviços (Chapter III), evitando a duplicação imediata e repetitiva da listagem em HTML estático.
4. **Preservação dos Shaders GLSL e Fidelidade Canônica de Jesper:**
   - Manter as equações analíticas exatas de curvatura longitudinal (`sheetZ`), torção inercial (`sheetWind`), curvatura de pista (`sheetRoll`), wash fotográfico (`u_white`), iluminação Blinn-Phong e o voo tridimensional *Card-to-Sheet* com transição de temas no header lateral.
5. **Correção do Servidor de Preview Local:**
   - O script `scripts/serve-marcionilio-site.cjs` deve servir deterministicamente o `clientes/marcionilio-oliveira/site/index.html` na rota raiz `/` (porta 3000 ou fallback livre), garantindo que a inspeção manual no navegador corresponda 1:1 ao código de produção compilado.

---

## Requirements

### R1. Timeline GSAP com Curva de Progresso de Ciclo Completo (WP-1)
- Reformular o cálculo de progresso em `initHorizontalScroll.LNLCK81L.js`: substituir a rampa unilateral `Math.min(1, Math.max(0, (cur - p) / M))` por um modelo de ciclo completo que contempla entrada ($0 \to 1$), permanência na galeria e saída suave ($1 \to 0$).
- Configurar a transição do `#jesper-work-stage-viewport`: ao final da fase de retenção, o viewport 3D deve transicionar suavemente (`opacity` ou `transform`), devolvendo a visibilidade às seções subsequentes da trilha horizontal.
- Adaptar o bloco mobile (`max-width: 767px`) para sincronizar a mesma transição de entrada e saída no scroll vertical nativo, sem aprisionamento de gestos touch.

### R2. Handshake Cinemático e Resolução de Escala Dimensional (WP-2)
- Em `src/components/WorkStage/WorkStage.tsx`, unificar a sensibilidade da fita à extensão de scroll alocada na timeline do GSAP, garantindo que a rolagem do usuário percorra os 4 projetos de maneira proporcional e com resposta tátil estável.
- Implementar transição de fronteira elástica sem colisões: ao atingir o último projeto e continuar rolando, a fita aciona a fase de saída da timeline em vez de travar no limite rígido de `-28.76`.
- Isolar os listeners de wheel e touch para não canibalizarem eventos durante a fase de abertura ($0.0 < pp < 0.99$).

### R3. Resolução da Redundância Narrativa (WP-3)
- Harmonizar a transição entre o fechamento de "THE WORK" e a continuação da trilha horizontal, garantindo que o usuário avance fluentemente para o Chapter III (Serviços) sem quebra de continuidade estética ou repetição redundante dos projetos.

### R4. Saneamento do Ambiente de Preview e Compilação (WP-4)
- Ajustar `scripts/serve-marcionilio-site.cjs` para direcionar a rota `/` diretamente ao `index.html`.
- Executar `npm run build:workstage` e atualizar o bundle de produção `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.

---

## Acceptance Criteria

### Gates de Verificação Automatizados (Playwright & Vitest)
- [ ] **Gate 1 (Matemática CPU & Shaders GLSL):**
  `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` passa com 100% de sucesso (7/7 testes verdes).
- [ ] **Gate 2 (Simetria Óptica e Abertura):**
  `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"` comprova simetria óptica entre "THE" e "WORK" ($\Delta \text{diff} \le 1.0\text{px}$) e expansão total no ápice da abertura.
- [ ] **Gate 3 (Fita 3D e Resposta Interativa):**
  `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"` valida presença dos 4 projetos, resposta de velocidade via wheel e elevação de $u_{\text{hover}} > 0.95$.
- [ ] **Gate 4 (Voo Card-to-Sheet & Tema Astro):**
  `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"` valida o voo do card selecionado, wash fotográfico e sincronização de cores no header lateral.
- [ ] **Gate 5 (Fecho e Restauração de Estado):**
  `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 5"` comprova o retorno perfeito à fita e desobstrução de overflow.
- [ ] **Gate 6 (Novo: Rolagem Contínua de Ponta a Ponta):**
  Novo teste E2E comprovando que um usuário rolando naturalmente a roda do mouse navega do topo (`scrollY = 0`), abre o portal 3D, percorre os projetos da fita e **continua rolando até o Chapter III, Chapter IV e Rodapé**, sem nunca travar em deadlock em nenhuma coordenada.
- [ ] **Multi-Viewport Stress Gate:**
  `npx playwright test tests/e2e/challenger-viewport.spec.ts` passa em todas as 4 resoluções de desktop (1440x900, 1920x1080, 1280x800, 1600x900).


## 2026-10-19T16:33:26Z

Conduct an implementation-grade Deep Research and Architectural Specification for Studio DNA PRO v2.6 (`studio-dna-engine`), specifying Pillars 6 through 11 and connecting them seamlessly to Pillars 1 through 5 with zero external dependencies outside the existing `package-lock.json`. Deliver modular research chapters, fully functional CommonJS reference implementations, and runnable unit tests.

Working directory: c:\Users\wd\Documents\playwright-scraper
Integrity mode: development

## Deliverable Structure
- Research chapters: `docs/research/v2.6/pilar-06-scene-to-capsule.md` through `docs/research/v2.6/pilar-11-dual-hud-mcp.md` and `docs/research/v2.6/zero-dependency-engines.md`.
- Reference implementations: `docs/research/v2.6/reference/` (self-contained CommonJS modules).
- Executable verification test suite: `test/v2.6/` runnable via `node --test` or Node.js test runners.

## Requirements

### R1. Scene-to-Capsule Subtree Slicing (Pillar 6)
Specify the automated extraction of reference sections from `copias/<refSlug>/` into self-contained capsules in `design-vault/capsules/<capsuleSlug>/` to resolve limitation L1 (`src/core/cloner.js` creating empty `sections/`):
1. **Closed CDP CSS Extraction:** Algorithm using `DOM.getDocument`, `DOM.querySelector`, `CSS.getMatchedStylesForNode`, and `CSS.getComputedStyleForNode` across all subtree nodes $v_i \in T(r_k)$, preserving cascade order, pseudo-elements (`::before`, `::after`), `@media` queries, and transitively extracting only utilized `@keyframes` and `@font-face`.
2. **Inherited Custom Property Closure:** Exact formula resolving free variables $\nu \in \mathcal{V}_{\text{used}}(r_k) \setminus \mathcal{V}_{\text{defined}}(r_k)$ captured via `getComputedStyle(r_k)` and injected as tokens `:scope` into `scoped.styles.css` and mutable parameters in `dna-ir.json`.
3. **AST Ancestor Prefix Pruning:** Algorithm partitioning composite selectors $S_{\text{anc}} \ \combinator \ S_{\text{local}}$, pruning external ancestors, re-anchoring to `@scope ([data-dna-capsule="<slug>"]) to ([data-kinetic-slot])` and generating the `@supports not (scope: default)` fallback.
4. **Associative Kinetic Slicing:** Filter from `esm-agnostic-introspector` GSAP tweens/ScrollTriggers targeting $T(r_k)$ (rewriting selectors relative to capsule scope) and associate the `WebGLFrameIR` whose canvas intersects the section's bounding box.

### R2. Universal `<dna-capsule>` Envelope, Sibling Portal Mount & UniversalScrollBus (Pillar 7)
Specify the framework-agnostic runtime envelope and cross-stack scroll bus, resolving L6 in `src/components/WorkStage/`:
1. **`UniversalScrollBus` Formulation:** Piecewise Affine Phase Mapping converting global scroll (vertical or pinned horizontal) to normalized signals $(p_{\text{portal}}, p_{\text{ribbon}}, v_k, \phi_k)$ using configurable multipliers $\mu_{\text{expand}}, \mu_{\text{hold}}, \mu_{\text{exit}} \in \text{dna-ir.json}$, eliminating premature saturation and wheel conflicts.
2. **Five Physical Laws of `<dna-capsule>`:**
   - Sibling Portal Mount (`[data-capsule-anchor]` in normal flow + `[data-capsule-stage]` in fixed inset 0 clipped via dynamic `clip-path: inset(...)`).
   - Reactive `uniformStore` (`setUniform`, `getUniform`, `applyBinding`, `getTelemetry`) wired into the render loop (`useFrame`/`requestAnimationFrame`).
   - Pointer events arbitration, `data-lenis-prevent*` injection in detail modals, and theme change events for host headers.
   - Dynamic JSON slot and project hydration (`data-capsule-slots`), eliminating hardcoded references in `referenceData.ts`.
3. **Sub-Pixel NDC-to-Viewport Projection:** Closed-form equation projecting the 4 3D vertices deformed by `sheet(w)` and `lean(w)` through $\mathbf{M}_{\text{VP}} = \mathbf{P} \cdot \mathbf{V}$ to position 2D proxy buttons `[data-work-card-proxy="i"]` with bounding box error $\le 0.5\text{px}$.

### R3. WebGL Context Virtualization & Single-Canvas Scissor Multiplexer (Pillar 8)
Specify multi-capsule WebGL virtualization preventing browser context loss (8–16 context limits):
1. **Dual Rendering Architecture:** IntersectionObserver rAF hibernation (`rootMargin: '250px'`) + single shared canvas multiplexer using `gl.enable(gl.SCISSOR_TEST)`, `gl.viewport(...)`, and `gl.scissor(...)`.
2. **Coordinate & State Isolation:** Convert `getBoundingClientRect()` to Y-inverted framebuffer coordinates with DPR clamping, selective depth buffer clearing (`gl.clear(gl.DEPTH_BUFFER_BIT)`), and proxy pointer/raycast event remapping to virtual cameras.

### R4. OKLCH Perceptual Color Synthesis, Dynamic Constraints & Fluid Typography (Pilares 9 e 10)
Specify chromatic and typographic adaptation across references and client branding, resolving L3 and L4:
1. **Bidirectional $s\text{RGB} \leftrightarrow \text{OKLCH}$ Transformations:** Exact conversion matrices ($s\text{RGB} \leftrightarrow \text{LMS} \leftrightarrow \text{Oklab} \leftrightarrow \text{OKLCH}$), semantic role classification by lightness/chroma quantiles, and relational palette projection preserving $\Delta L_i$ in CSS variables and shader `vec3` uniforms.
2. **Real APCA `0.0.98G-4g` Engine:** Replace legacy WCAG 2.1 in `src/constraints/contrast.js` with complete APCA `0.0.98G-4g` equations (`revBG=0.65`, `revTXT=0.62`, `blkThrs=0.022`, `blkClmp=1.414`), monotonic binary search for text/surface luminance compliance, rim light compensation, and refactor `ConstraintEngine` to traverse dynamic `dnaIr.constraints` without hardcoded OP-XY keys.
3. **Responsive Fluid Scaling:** Linear regression across viewports ($390\text{px}, 768\text{px}, 1440\text{px}$) generating `clamp(S_min, beta*vw + gamma*px, S_max)` with lexical expansion damping $\kappa_{\text{copy}} = (L_{\text{orig}}/L_{\text{new}})^{0.65}$.

### R5. Dual-Environment Live Tweaks, HUD Projector & Section MCP Server (Pillar 11)
Specify the real-time feedback loop replacing the 62 throwaway scripts (L9) with live MCP-driven iteration:
1. **Byte-Exact Passthrough & Iframe Wrapper:** Static binary delivery (`/clientes/<slug>/site/*`) with SHA-256 ETag and external wrapper route `/__dna_hud_wrapper?client=<slug>` with same-origin bridge `iframe.contentWindow.__DNA_LIVE_BUS__`.
2. **Agnostic HUD Projector:** Complete elimination of hardcoded OP-XY presets/selectors in `src/generators/hud-projector.js` (resolving L2), implementation of `webgl-uniform` and `scroll-bridge` adapters, real APCA badge rendering, and ACID commit via `TransactionManager` + `node:sqlite`.
3. **MCP Tools & Resources:** Complete Zod schemas and handlers for tools (`extract_section_capsule`, `list_client_sections`, `mount_vault_capsule`, `patch_section_dna`, `compile_slug_font`, `diagnose_section_telemetry`) and resources (`vault://capsules`, `vault://capsules/{slug}/manifest`, `client://{slug}/sections`, `client://{slug}/sections/{sectionId}/dna`) backed by SQLite WAL.

### R6. Zero-Dependency Core Micro-Engines (Node.js 24+ CommonJS)
Provide complete, functional pure JavaScript implementations (CommonJS, zero npm packages outside `package-lock.json`):
1. **Pure JS 2D R-Tree & Slot Tagger:** `src/compiler/spatial-rtree.js` (API matching `RBush`: `load`, `insert`, `search`, `collides`) and `spatial-auto-slot-tagger.js` using Typographic Energy $E_{\text{typo}}(v)$ and subtree isomorphism ($\text{TED}=0$, $\sigma_{\text{area}}/\mu_{\text{area}} \le 0.15$).
2. **PostCSS Selector AST & Donut Scope Validator:** `src/compiler/css-selector-ast.js` recursive selector parser over `postcss` and fix for `validateDonutScopeInvariants` in `src/compiler/kinetic-grammar-schema.js` eliminating blind spots in Tests 4.5 and 4.6 (resolving L7).
3. **Native PNG RGBA Decoder & Saliency Oracle:** `src/qa/png-codec.js` via `node:zlib` (`inflateSync` + 5 scanline filters: None, Sub, Up, Average, Paeth) integrated with 42-map Itti-Koch visual saliency oracle with lateral competition $\mathcal{N}(M) = M(M_{\max} - \overline{m})^2$.
4. **Binary TrueType Slug Font Compiler:** `src/assets3d/slug-font-compiler.js` using `DataView` on `.ttf` tables (`cmap` 4/12, `head`, `hhea`, `hmtx`, `loca`, `glyf`), extracting quadratic contours, De Casteljau subdivision for cubic beziers, and packing Slug curves/bands buffers ($N_B=8$).
5. **DAG Scheduler Write-Locks & CSS Normalizer Repair:** Write-lock intersection algorithm in `src/orchestration/dag-scheduler.js` (resolving L8) and repair of corrupted CSS block in `src/pro/universal-asset-normalizer.js` lines 152–174 (resolving L5).

## Verification Resources & Verification Mechanism

### Programmatic Verification
1. **Syntax Integrity:** All generated JavaScript files must pass syntax validation via `node --check <file>`.
2. **Zero-Dependency Guarantee:** Modules must load cleanly in Node.js 24 without requiring `opentype.js`, `rbush`, `postcss-selector-parser`, or `pngjs`.
3. **Executable Unit Tests in `test/v2.6/`:**
   - `test/v2.6/spatial-rtree.test.js`: Validates R-Tree insertion, search, and boundary collision against fixtures.
   - `test/v2.6/css-selector-ast.test.js`: Validates detection of boundary violations for `[data-kinetic-slot] > h1` and `[data-kinetic-slot="hero-title"] h1`.
   - `test/v2.6/png-codec.test.js`: Validates PNG decompression and scanline defiltering on test image fixtures against raw pixel arrays.
   - `test/v2.6/slug-font-compiler.test.js`: Validates binary table parsing and quadratic curve packaging.
   - `test/v2.6/apca-contrast.test.js`: Validates APCA `0.0.98G-4g` calculations against reference test pairs.

### Architectural Rubric Audit
An independent auditor review against explicit evaluation criteria:
- Every formula is closed-form with numbered notation.
- Every schema (Zod and JSON) is syntactically valid and covers all required fields.
- AGENTS.md truth protocol labels (`[observed]`, `[documented]`, `[inferred]`) are applied to every architectural claim.

## Acceptance Criteria

### Mathematical Rigor & Formal Theorems
- [ ] Numbered closed-form equations for: APCA `0.0.98G-4g`, Itti-Koch $\mathcal{N}(M)$, ribbon NDC-to-Viewport matrix transformation $\mathbf{M}_{\text{VP}}$, piecewise affine scroll phases $(p_{\text{portal}}, p_{\text{ribbon}}, v_k, \phi_k)$, and $s\text{RGB} \leftrightarrow \text{OKLCH}$ matrices.
- [ ] Invariance theorems formally stated and proven for Donut Scope boundaries, Custom Property Closures, and WebGL scissor state isolation.

### Implementation Completeness & Zero-Dependency
- [ ] Complete, non-stubbed CommonJS reference code provided for all 4 micro-engines in `docs/research/v2.6/reference/`:
  - `spatial-rtree.js` (Pure JS R-Tree)
  - `css-selector-ast.js` (PostCSS selector AST parser)
  - `png-codec.js` (Native zlib PNG decoder)
  - `slug-font-compiler.js` (Binary TTF parser & Slug buffer generator)
- [ ] No uninstalled dependencies (`opentype.js`, `rbush`, `postcss-selector-parser`, `pngjs`) imported or required.
- [ ] Repaired code blocks provided for `src/pro/universal-asset-normalizer.js` (L5), `src/compiler/kinetic-grammar-schema.js` (L7), and `src/orchestration/dag-scheduler.js` (L8).

### Executable Test Suite
- [ ] Runnable test files created in `test/v2.6/` covering R-Tree, Selector AST, PNG codec, Slug compiler, and APCA contrast.
- [ ] Tests execute and pass cleanly under `node --test` or equivalent native test runner without errors.

### Schemas & Contracts
- [ ] Complete Zod schemas defined for:
  - `dna-ir.json` Capsule Manifest and Constraint Graph
  - MCP Tools input/output parameters (`extract_section_capsule`, `patch_section_dna`, etc.)
  - SQLite WAL relational schema + FTS5 search index
- [ ] Every claim strictly labeled with `[observed]`, `[documented]`, or `[inferred]`.

## 2026-10-20T15:19:36Z

# Teamwork Project Prompt — Final

> Status: Launched  
> Goal: Multi-agent execution via `teamwork_preview`  
> Requested team: Equipe multidisciplinar especializada (WebGL Shader Physicist, GSAP Motion Choreographer, UI/UX Interaction Specialist, QA Playwright Invariant Verifier)  

Implementar a arquitetura de scroll infinito na fita 3D, HUD cinemático de permanência e saída voluntária ("Fique o tempo que quiser" e "Eu já estou convencido"), animação óptica de saída simétrica invertida (`scale: W -> 0` via clip-path reverso) e coreografia escalonada fluida no Card-to-Sheet para a seção "THE WORK" de Marcionilio Oliveira (`clientes/marcionilio-oliveira`), mantendo todos os 7 gates automatizados 100% verdes.

Working directory: c:\Users\wd\Documents\playwright-scraper  
Integrity mode: development  

---

## 🏛️ Diretrizes Arquiteturais Inegociáveis (Hard Guardrails)

1. **Scroll Infinito Contínuo na Fita 3D (Infinite Ribbon Wrap):**
   - Substituir as barreiras rígidas/elásticas de `targetOffset` por um modelo de translação modular contínua:
     $$X_{\text{wrapped}} = \left( (X_{\text{raw}} + 64.0) \pmod{128.0} + 128.0 \right) \pmod{128.0} - 64.0$$
     onde $L = 4 \times 32.0 = 128.0$ unidades de mundo.
   - Os proxies DOM (`[data-work-card-proxy="0..3"]`) devem acompanhar exatamente a mesma equação modular convertida em viewport coordinates, permitindo interação ininterrupta em qualquer ponto do ciclo infinito.
2. **HUD Cinemático de Permanência e Saída Voluntária:**
   - **Canto inferior esquerdo:** Microcopy editorial refinada fixa em `#FAF9F6` com opacidade atenuada: `"CAPÍTULO II — FIQUE O TEMPO QUE QUISER"`.
   - **Canto inferior direito:** Botão pill `"EU JÁ ESTOU CONVENCIDO" / "I'M ALREADY SOLD"` que surge suavemente (`y: 20 -> 0`, `opacity: 0 -> 1`) após o usuário acumular 1.5 scrolls na fita 3D ($\approx 1200\text{px}$ de deslocamento cumulativo).
   - O clique no botão deve disparar imediatamente o fechamento óptico simétrico da sessão 3D e conduzir a página diretamente ao Capítulo III (Serviços).
3. **Animação de Saída Simétrica e Invertida (Inverted Optical Portal):**
   - A timeline GSAP em `initHorizontalScroll.LNLCK81L.js` deve espelhar com exatidão a entrada óptica:
     - Entrada: `scale: 0 -> W`, textos "MORE" e "WORK" se afastam, `clip-path` do viewport 3D expande.
     - Saída: `scale: W -> 0`, textos "MORE" e "WORK" se reaproximam suavemente, `clip-path` encolhe de volta ao retângulo original `[data-more-work-rect]`, devolvendo o controle linear da trilha ao Capítulo III sem cortes abruptos.
4. **Coreografia Escalonada Fluida no Card-to-Sheet (Jesper Parity):**
   - Eliminar a transição em bloco com fade estático de `setTimeout(900ms)`.
   - Implementar a coreografia escalonada (`Kp`): durante a aterrissagem do mesh no plano frontal com descurvatura e lavagem fotográfica ($u_{\text{sheetP}} \to 0$, $u_{\text{white}} \to 1$), o título sobe aos $0.25\text{s}$, a descrição aos $0.35\text{s}$ e as tags/pills aos $0.50\text{s}$.
5. **Preservação e Validação Integral dos Quality Gates:**
   - O bundle de produção compilado (`workStage.bundle.js`) e as páginas do site devem passar com 100% de sucesso em:
     - Gate 1 (Vitest Math CPU Twin): 8/8 testes.
     - Gate 2 (Simetria Óptica e Expansão do Portal).
     - Gate 3 (Fita 3D, 4 Projetos, Velocidade e Hover).
     - Gate 4 (Voo Card-to-Sheet & Header Astro).
     - Gate 5 (Fecho e Restauração de Estado via Botão e Escape).
     - Gate 6 (Rolagem Contínua de Ponta a Ponta sem Deadlock).
     - Challenger Multi-Viewport Suite (todas as 4 resoluções de desktop).

---

## Requirements

### R1. Loop Infinito na Fita 3D e Proxies DOM (WP-1)
- Atualizar `src/components/WorkStage/WorkStage.tsx` e `RibbonCard.tsx` para remover os limites rígidos de `targetOffset` e aplicar a fórmula de wrap modular periódico com $L = 128.0$.
- Manter a física inercial calibrada ($0.88$ de retenção e $\tau \approx 400\text{ms}$ síncrono com a parada do gesto) funcionando perfeitamente dentro do domínio periódico.
- Sincronizar os botões transparentes `[data-work-card-proxy]` para que o hover e o clique continuem mapeando 1:1 para o card visível na tela.

### R2. HUD Cinemático com Gatilho Cumulativo de 1.5 Scrolls (WP-2)
- Implementar o acumulador cinético `cumulativeScroll` em `WorkStage.tsx`.
- Renderizar a microcopy inferior esquerda `"CAPÍTULO II — FIQUE O TEMPO QUE QUISER"` e o botão inferior direito `"EU JÁ ESTOU CONVENCIDO"`.
- Configurar o botão para acionar a saída suave do modo 3D sem exigir rolagem adicional do usuário.

### R3. Timeline Óptica de Saída Invertida (WP-3)
- Modificar `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`:
  - Na label `mwExit`, animar `[data-more-work-rect]` de `scale: W` para `scale: 0`, e os textos `[data-more-work-more]` e `[data-more-work-work]` de volta às suas posições fechadas.
  - Ajustar `syncViewportClip` para que a máscara de recorte acompanhe o encolhimento do retângulo também durante a fase de saída.

### R4. Coreografia Escalonada Card-to-Sheet (WP-4)
- Substituir a espera monolítica do modal por uma timeline GSAP coreografada:
  - Voo do card: $t = 0\text{s}$, duração $0.85\text{s}$, `expo.out`.
  - Título do projeto: início em $t = 0.25\text{s}$, elevação vertical e opacidade com easing `expo.out`.
  - Texto e descrição: início em $t = 0.35\text{s}$.
  - Metadados e botão de fechar: início em $t = 0.50\text{s}$.

### R5. Compilação e Verificação Automatizada (WP-5)
- Executar `npm run build:workstage` e atualizar o bundle de produção `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.
- Executar e comprovar com logs reais a aprovação em todos os 6 Gates do Playwright/Vitest e no Challenger Suite.

---

## Acceptance Criteria

- [ ] **R1 (Scroll Infinito):** O usuário pode rolar a fita continuamente para a esquerda ou direita sem jamais bater em um limite ou travar.
- [ ] **R2 (HUD):** O texto "FIQUE O TEMPO QUE QUISER" é visível na fita 3D e o botão "EU JÁ ESTOU CONVENCIDO" surge após 1.5 scrolls; o clique no botão fecha o portal e avança para Serviços.
- [ ] **R3 (Saída Simétrica):** O fechamento do portal 3D comprime o viewport de volta para o retângulo entre as palavras "MORE" e "WORK" de forma 100% simétrica à entrada.
- [ ] **R4 (Coreografia Detalhe):** A abertura do projeto ocorre em cascata fluida ($t=0.25\text{s}, 0.35\text{s}, 0.50\text{s}$) sem salto em bloco.
- [ ] **R5 (Gates 1 a 6 & Challenger):** 100% dos testes aprovados nos comandos:
  - `npx vitest run src/components/WorkStage/__tests__/math.spec.ts`
  - `npx playwright test tests/e2e/work-stage.spec.ts`
  - `npx playwright test tests/e2e/challenger-viewport.spec.ts`
