# PLANO MESTRE DE DELEGAÇÃO E EXECUÇÃO DETERMINÍSTICA (LOW-SPEC PROFILE)

> **Repositório:** `studio-dna-engine` (`v2.0.0` / `v2.5 Autonomous Front-End Framework Evolution`)  
> **Modo de Execução:** Contenção Estrita de Hardware (*Low-Spec Profile*) + Contrato de Tarefas V2 (`schemaVersion: 2`)  
> **Governança:** `AGENTS.md` (Truth Protocol), `ICM.md` (Client Isolation P0) e `design-quality-orchestrator-roadmap.md`  

---

## MATRIZ DE PRESERVAÇÃO DE FUNCIONALIDADE (100% CAPACIDADE, BAIXO CONSUMO)

| Capacidade / Funcionalidade da Pesquisa | Como Rodaria no Modo Ingênuo (Pesado) | Como Roda no Modelo Low-Spec (100% da Capacidade, Baixo Peso) | Perda de Funcionalidade |
| --- | --- | --- | --- |
| **Ajuste de Curvas de Schneider (1990) & Decompilação CDP** | Grava 60 quadros por segundo durante vários segundos em tempo real. | Congela a animação e usa `Animation.seekAnimations` ($\Delta t = 4\text{ ms}$) para ler os pontos instantaneamente; o ajuste de Bézier de Schneider roda em Node.js puro em $<50\text{ ms}$. | **0% (Zero)** |
| **Identificação Física Inversa (Log-Decrement, Prony/Padé e Weak-SINDYc)** | Simula física no browser repetidas vezes por tentativa e erro. | Cálculos matriciais (Hankel, Vandermonde, decimação de Froissart e STLSQ) rodam em CPU/Node.js nativo em $<90\text{ ms}$ e $<60\text{ MB}$ de RAM. | **0% (Zero)** |
| **Backward Program Slicing de Shaders WebGL & Otimizador GLSL** | Carrega o runtime inteiro do Nuxt/Vue e inspeciona WebGL manualmente. | Faz o fatiamento estático do AST JavaScript/GLSL em 2 fases *uma única vez* na extração, gerando um componente isolado $<15\text{ KB}$ e dobrando a performance de 60 para 120 FPS. | **0% (Zero)** |
| **Contraste Psicofísico APCA (WCAG 3.0) & Compensação de Scrim** | Tira screenshots da página para medir contraste visualmente. | Avalia analiticamente a luminância $Y_s$, a polaridade BoW/WoB e a frequência espacial `(font-size, font-weight)` via AST em $<30\text{ ms}$. | **0% (Zero)** |
| **Escopo Anelar CSS `@scope` & Sincronia Lenis + Micro-FSM** | Usa dezenas de `!important` e recarrega o browser para testar vazamentos. | Compila via PostCSS/Cheerio e valida seletores perfurantes estaticamente antes mesmo de abrir o navegador. | **0% (Zero)** |
| **Matriz Visual Imutável (4 Viewports $\times$ 6 Estados) & Gates E2E** | Abre 4 a 6 processos Chromium simultâneos (consumindo $>2,5\text{ GB}$ de RAM). | Reutiliza **1 único processo Chromium** (`workers: 1`) redimensionando o viewport em memória e aplicando *Time-Warp* nas timelines, mantendo o mesmo hash SHA-256. | **0% (Zero)** |

---

## SEÇÃO 1: CONTRATO OPERACIONAL DO AGENTE NA IDE (REGRAS INVIOLÁVEIS)

Qualquer agente de IA executando este plano no IDE **DEVE** obedecer às 6 restrições abaixo sem exceção:

1. **Proibição de Baterias Globais na Iteração:** É terminantemente proibido executar `npm test`, `npm run test:all` ou `npx playwright test` sem filtro de arquivo durante o desenvolvimento de uma tarefa. Cada tarefa **DEVE** ser validada exclusivamente pelo seu comando unitário declarado no campo `Comando de Verificação (DoD)`.
2. **Pirâmide Fail-Fast (Node.js antes de Browser):** Nenhum teste de Playwright/Chromium pode ser iniciado se qualquer teste unitário de Node.js puro (`node --test ...`) estiver falhando.
3. **Concorrência Unitária de Navegador (`workers: 1`):** Quando o Playwright for exigido (apenas no Bloco D), ele **DEVE** rodar com `--workers=1` e reutilizar o contexto de página existente, nunca abrindo múltiplos navegadores em paralelo.
4. **Imutabilidade de Referências (`copias/`):** O diretório `copias/` é evidência bruta somente leitura (*read-only*). Qualquer tentativa de escrita em `copias/` encerra a tarefa com erro `POLICY_DENIED`.
5. **Isolamento Absoluto de Clientes (`clientScope`):** Tarefas de cliente só podem ler e escrever dentro de `clientes/<clientScope>/`, no pacote de referência selecionado do `design-vault/` e nos módulos globais explicitamente listados na `writeAllowlist`.
6. **Segregação Builder vs. Verifier e Parada em 3 Tentativas:** O agente nunca deve remover um teste, afrouxar uma tolerância matemática ou usar `setTimeout` arbitrário para simular aprovação. Após 3 tentativas falhas de correção na mesma tarefa, a execução deve parar e solicitar revisão humana (`human_review_required`).

---

## SEÇÃO 2: BLOCO A — SANEAMENTO DE INTEGRIDADE E CLIENTES ATIVOS (ZERO BROWSER)

### `TASK-A1`: Saneamento do `design-vault/INDEX.json` e Template `op-xy-76-aura-build`
* **Papel:** `implementation_agent`
* **Diagnóstico Observado:** O teste `test/vault-integrity.test.js` falha porque `design-vault/INDEX.json` possui o slug `khanhnguyen-design` duplicado e exige os artefatos `tokens.json` e `brand-spec.template.json` na pasta `design-vault/op-xy-76-aura-build/`, que hoje contém apenas `dna-ir.json`, `composition-spec.template.json`, `content-slots.template.json`, `skeleton.html` e `REFERENCE_CARD.md`.
* **`readAllowlist`:** `["design-vault/INDEX.json", "design-vault/op-xy-76-aura-build/dna-ir.json", "design-vault/bymonolog-com/tokens.json", "design-vault/bymonolog-com/brand-spec.template.json", "test/vault-integrity.test.js"]`
* **`writeAllowlist`:** `["design-vault/INDEX.json", "design-vault/op-xy-76-aura-build/tokens.json", "design-vault/op-xy-76-aura-build/brand-spec.template.json"]`
* **Instruções de Implementação:**
  1. Remover a entrada duplicada do template `khanhnguyen-design` no array de templates de `design-vault/INDEX.json`.
  2. Extrair os parâmetros de superfície, cores e tipografia de `design-vault/op-xy-76-aura-build/dna-ir.json` e gerar os arquivos `design-vault/op-xy-76-aura-build/tokens.json` e `design-vault/op-xy-76-aura-build/brand-spec.template.json` em total conformidade com o schema validado por `test/vault-integrity.test.js`.
* **Comando de Verificação (DoD):**
  ```bash
  node --test test/vault-integrity.test.js
  ```

---

### `TASK-A2`: Purga de Resíduos de Marca e Vazamento de Idioma em `marcionilio-oliveira`
* **Papel:** `implementation_agent`
* **Cliente (`clientScope`):** `marcionilio-oliveira`
* **Diagnóstico Observado:** O HTML compilado (`clientes/marcionilio-oliveira/site/index.html`) contém vazamentos da referência vietnamita `khanhnguyen-design`: links sociais apontando para `khanh_nguyen_des` e `kennguyen034b8`, atributo `alt="Portrait of Khanh Nguyen."`, 5 SVGs de empresas vietnamitas na grade mobile (`trusting-social`, `vietnamwork`, `autonomous`, `ven`, `glass-egg`) e rótulos estruturais em inglês (`Chapter I` a `IV`, `Quick intro`, `More about me`, `What I do?`, `Selected experiences`, `And more`, `Next chapter`, `Contact to`).
* **`readAllowlist`:** `["clientes/marcionilio-oliveira/brand-spec.json", "clientes/marcionilio-oliveira/content-slots.json", "clientes/marcionilio-oliveira/site/index.html"]`
* **`writeAllowlist`:** `["clientes/marcionilio-oliveira/content-slots.json", "clientes/marcionilio-oliveira/site/index.html", "clientes/marcionilio-oliveira/site/assets/_astro/"]`
* **Instruções de Implementação:**
  1. Atualizar `clientes/marcionilio-oliveira/content-slots.json` e sincronizar deterministicamente no `clientes/marcionilio-oliveira/site/index.html` todos os rótulos em inglês para português:
     - `"Chapter I"` a `"Chapter IV"` $\rightarrow$ `"Capítulo I"` a `"Capítulo IV"`
     - `"Quick intro"` $\rightarrow$ `"Introdução"`
     - `"More about me"` $\rightarrow$ `"Mais sobre mim"`
     - `"What I do?"` $\rightarrow$ `"O que faço?"`
     - `"Selected experiences"` $\rightarrow$ `"Experiência selecionada"`
     - `"And more"` $\rightarrow$ `"E mais"`
     - `"Work spanning brands, products, and digital teams."` $\rightarrow$ `"Projetos que conectam marcas, produtos e equipes digitais."`
     - `"Where stories find their form"` $\rightarrow$ `"Onde ideias ganham forma"`
     - `"Next chapter"` $\rightarrow$ `"Próximo capítulo"`
     - `"Contact to"` $\rightarrow$ `"Contato"`
  2. Substituir `alt="Portrait of Khanh Nguyen."` por `alt="Retrato de Marcionilio Oliveira"` e atualizar todas as âncoras sociais para os links oficiais de `content-slots.json` (`https://linkedin.com`, `https://github.com`).
  3. Substituir os 5 SVGs residuais e seus respectivos atributos `alt` em `[data-clients-list]` e `[data-clients-mobile-logos]` por ícones vetoriais próprios representando os pilares da stack (*Motion & Física*, *Arquitetura Modular*, *Rigor Visual*, *Motores Locais*, *Inspeção & Evidência* e *Base da Web*).
* **Comando de Verificação (DoD):**
  ```bash
  node --test test/transmuter-and-anti-slop.test.js
  ```

---

### `TASK-A3`: Pré-Compilação AST de SplitText em `SCALEX` e Alinhamento de Esqueleto `Jumpflex`
* **Papel:** `implementation_agent`
* **Diagnóstico Observado:** Em `clientes/flashtech-caso-04-growth` (SCALEX), `.hero-display-text-1` falha em `test/components/hero-motion.test.js` por ausência das classes `.gsap_split_word` e `.gsap_split_char` no DOM estático. Em `test/components/jumpflex-transmutation.test.js`, o teste aponta para o HTML bruto `copias/jumpflex-com/jumpflex-com.html` em vez de um esqueleto normalizado com `main h1.brand__heading`.
* **`readAllowlist`:** `["src/cdp/semantic-skeleton-normalizer.js", "clientes/flashtech-caso-04-growth/site/index.html", "test/components/hero-motion.test.js", "test/components/jumpflex-transmutation.test.js", "copias/jumpflex-com/"]`
* **`writeAllowlist`:** `["src/cdp/semantic-skeleton-normalizer.js", "clientes/flashtech-caso-04-growth/site/index.html", "test/components/jumpflex-transmutation.test.js", "design-vault/jumpflex-com/skeleton.html"]`
* **Instruções de Implementação:**
  1. Em `src/cdp/semantic-skeleton-normalizer.js` e no HTML de `clientes/flashtech-caso-04-growth/site/index.html`, garantir via Cheerio AST que headlines marcadas para SplitText (`.hero-display-text-1`) possuam os wrappers estáticos `.gsap_split_word` (`overflow: hidden; display: inline-block;`) e `.gsap_split_char` (`display: inline-block; opacity: 1;`).
  2. Gerar o esqueleto normalizado `design-vault/jumpflex-com/skeleton.html` com os seletores canônicos (`main h1.brand__heading`) e atualizar `test/components/jumpflex-transmutation.test.js` para consumir esse esqueleto do `design-vault/` (preservando `copias/` intocado).
* **Comando de Verificação (DoD):**
  ```bash
  node --test test/components/hero-motion.test.js test/components/jumpflex-transmutation.test.js
  ```

---

## SEÇÃO 3: BLOCO B — MOTORES MATEMÁTICOS, FÍSICOS, PERCEPTUAIS E SHADER SLICING (100% NODE.JS PURO)

### `TASK-B1`: Decompilador Cinemático CDP (`seekAnimations`) e Ajuste de Curvas de Bézier de Schneider (1990)
* **Papel:** `implementation_agent`
* **Objetivo Universal:** Capturar séries temporais de qualquer propriedade animada (WebGL, GSAP ou WAAPI) sem depender de espera em tempo real, avançando o relógio passo a passo via CDP (`Animation.seekAnimations` com $\Delta t = 4\text{ ms}$) e comprimindo a nuvem de pontos em segmentos de Bézier cúbicos $\mathbf{Q}(u) = (1-u)^3\mathbf{V}_0 + 3u(1-u)^2\mathbf{V}_1 + 3u^2(1-u)\mathbf{V}_2 + u^3\mathbf{V}_3$ pelo algoritmo de Philip J. Schneider (*Graphics Gems*, 1990).
* **`readAllowlist`:** `["src/cdp/kinetic-timeline-interceptor.js", "src/kinetic/trajectory-solver.js", "design-vault/01-motion-physics/easings.json"]`
* **`writeAllowlist`:** `["src/cdp/kinetic-timeline-interceptor.js", "src/kinetic/bezier-fitter.js", "test/kinetic/bezier-fitter.test.js"]`
* **Instruções de Implementação:**
  1. Criar `src/kinetic/bezier-fitter.js` implementando o algoritmo completo de Schneider (1990):
     - Filtragem prévia de pontos adjacentes duplicados e detecção de ângulos agudos (`lineSensitivity`) para combinar segmentos de reta com curvas de Bézier sem ondulações espúrias.
     - Cálculo de tangentes unitárias extremas (`computeLeftTangent`, `computeRightTangent`, `computeCenterTangent`) e parametrização inicial por comprimento de corda (`chordLengthParameterize`).
     - Resolução do sistema linear $2 \times 2$ via matriz de covariância para encontrar $\mathbf{V}_1$ e $\mathbf{V}_2$.
     - Reparametrização de Newton-Raphson iterando:
       $$u_i^{\text{novo}} = u_i - \frac{(\mathbf{Q}(u_i) - \mathbf{d}_i) \cdot \mathbf{Q}'(u_i)}{\Vert\mathbf{Q}'(u_i)\Vert^2 + (\mathbf{Q}(u_i) - \mathbf{d}_i) \cdot \mathbf{Q}''(u_i)}$$
       seguida de subdivisão recursiva no `splitPoint` de erro máximo quando $\max_i \Vert\mathbf{d}_i - \mathbf{Q}(u_i)\Vert^2 > \epsilon^2$.
     - Exportar `fitCurve(points, maxError)` e `fitEasingToMultiSegmentBezier(samples, maxError)`.
  2. Em `src/cdp/kinetic-timeline-interceptor.js`, adicionar o método `sampleTimelineDeterministic(cdpSession, options)` que pausa o relógio (`Animation.setPaused`), avança `Animation.seekAnimations` e `gsap.globalTimeline.time(t)` em passos discretos $\Delta t = 4\text{ ms}$ e invoca `bezier-fitter.js`.
* **Comando de Verificação (DoD):**
  ```bash
  node --test test/kinetic/bezier-fitter.test.js test/m1-cdp-decompiler.test.js
  ```

---

### `TASK-B2`: Identificador Físico Inverso em 3 Níveis (Log-Decrement, Prony/Padé e Weak-SINDYc)
* **Papel:** `implementation_agent`
* **Objetivo Universal:** Extrair automaticamente os parâmetros ocultos de molas ($\zeta, \omega_n, k, c$) e equações diferenciais não-lineares forçadas por scroll/drag a partir de séries temporais de deslocamento $x(t)$.
* **`readAllowlist`:** `["src/physics/spring-dynamics.js", "test/m3-spring-dynamics.test.js"]`
* **`writeAllowlist`:** `["src/physics/inverse-system-id.js", "test/physics/inverse-system-id.test.js"]`
* **Instruções de Implementação:**
  1. **Nível 1 — Decremento Logarítmico e Sobressinal Fracionário ($0 < \zeta \le 0,8$):**
     - Para $\zeta \le 0,5$: $\delta = \frac{1}{n}\ln\left(\frac{x(t)}{x(t+nT_d)}\right)$, $\zeta = \frac{\delta}{\sqrt{4\pi^2 + \delta^2}}$, $\omega_n = \frac{2\pi}{T_d\sqrt{1 - \zeta^2}}$.
     - Para $0,5 < \zeta \le 0,8$: $OS = \frac{|x_p - x_f|}{|x_f - x_0|}$, $\zeta = \frac{-\ln(OS)}{\sqrt{\pi^2 + \ln^2(OS)}}$.
  2. **Nível 2 — Método de Prony Validado com Matrizes de Hankel e Filtragem de Dupletos de Froissart:**
     - Decomposição $f_k = \sum_{j=1}^n \alpha_j z_j^k$, resolução de $\mathbf{H}_n^{(0)}\mathbf{b} = -\mathbf{h}$, decimação com sobreamostragem $\eta > n$, descarte de dupletos de Froissart de Padé $[n-1/n]_F(z)$.
  3. **Nível 3 — Weak / Ensemble-SINDYc (Dinâmica Não-Linear):**
     - Biblioteca esparsa $\boldsymbol{\Theta}(\mathbf{X}, \mathbf{U})$ ($x|x|$, $\dot{x}|\dot{x}|$, $\tanh(u/\text{velNorm})$).
     - Integração por partes contra funções de teste suaves com limiarização iterativa STLSQ e ensemble bagging.
* **Comando de Verificação (DoD):**
  ```bash
  node --test test/physics/inverse-system-id.test.js
  ```

---

### `TASK-B3`: Motor Psicofísico APCA (WCAG 3.0) e Solucionador Analítico de Scrim/Assets
* **Papel:** `implementation_agent`
* **Objetivo Universal:** Prevenir matematicamente a Fadiga Retiniana ($V_{15}$) e a Cegueira de Domínio ($V_{24}$) em polaridade reversa (modo escuro) e recalibrar automaticamente a opacidade de overlays/scrims (`u_scrim` no WebGL ou classes de overlay no DOM) ao substituir fotos ou vídeos de clientes.
* **`readAllowlist`:** `["src/constraints/contrast.js", "src/qa/visual-saliency-oracle.js", "test/constraint-engine.test.js"]`
* **`writeAllowlist`:** `["src/constraints/contrast.js", "test/constraint-engine.test.js"]`
* **Instruções de Implementação:**
  1. Em `src/constraints/contrast.js`, implementar `computeAPCA(textHex, bgHex)` segundo o algoritmo SAPC/APCA:
     - Luminância de tela linearizada ($\gamma = 2,4$), soft-clamp de preto ($Y_{\text{blk}} = 0,022$, expoente $1,414$).
     - Assimetria BoW ($Y_{\text{bg}}^{0,56} - Y_{\text{txt}}^{0,57}$) e WoB ($Y_{\text{bg}}^{0,65} - Y_{\text{txt}}^{0,62}$), gerando $L_c \in [-108, +106]$.
  2. Implementar `validateFontSpatialFrequency(lcValue, fontSizePx, fontWeight)`.
  3. Implementar `solveOptimalScrimOpacity({ textHex, mediaLuminance, targetLc = 60, scrimHex = '#000000' })`.
* **Comando de Verificação (DoD):**
  ```bash
  node --test test/constraint-engine.test.js
  ```

---

### `TASK-B4`: Decompilador de Shaders WebGL (`Backward Program Slicing`) e Otimizador AST GLSL
* **Papel:** `implementation_agent`
* **Objetivo Universal:** Elevar a fidelidade de extração de referências WebGL/SPAs de ~65% para >95%, isolando apenas as equações de *glue code* JavaScript que alimentam as `uniforms` sem causar explosão de objetos, e auditando o custo de ciclos GPU dos shaders GLSL.
* **`readAllowlist`:** `["src/assets3d/vram-auditor.js", "src/assets3d/texture-compressor.js", "copias/jesperlandberg-com/ui-ux/ui_ux_features.json"]`
* **`writeAllowlist`:** `["src/assets3d/shader-slicer.js", "test/assets3d/shader-slicer.test.js"]`
* **Instruções de Implementação:**
  1. Criar `src/assets3d/shader-slicer.js` implementando o **Two-Phase Backward Program Slicing**:
     - *Fase I:* Mapear sumidouros WebGL (`gl.uniform*`, `.uniforms.<name>.value`).
     - *Fase II:* Travessia retrospetiva até as fontes (`scrollY`, `wheelDelta`, `pointer`, `performance.now`), emitindo `uniformBindings` para micro-runtime $<15\text{ KB}$.
  2. Implementar `auditGlslShader`:
     - Alinhamento `std140`/`std430`.
     - Função de custo: $\text{Cycles} = \text{ALU\_Ops} + \text{Texture\_Fetches} + \lambda \cdot \text{Branch\_Divergence}$.
     - Hash estrutural de shaders para desduplicação.
* **Comando de Verificação (DoD):**
  ```bash
  node --test test/assets3d/shader-slicer.test.js test/m3-assets3d-pipeline.test.js
  ```

---

## SEÇÃO 4: BLOCO C — ESCOPO ANELAR CSS `@scope`, PONTE LENIS + FSM E GOVERNANÇA V2 (100% NODE.JS PURO)

### `TASK-C1`: Motor de Escopo Anelar CSS `@scope` (Correção dos Blind Spots 4.5 e 4.6)
* **Papel:** `implementation_agent`
* **Diagnóstico Observado:** Os testes `4.5` e `4.6` de `test/challenger-adversarial-m5.test.js` provam que o regex atual de `validateDonutScopeInvariants` não bloqueia ataques de perfuração com combinador de filho direto (`[data-kinetic-slot] > h1`) nem seletores com valor de atributo (`[data-kinetic-slot="hero-title"] h1`).
* **`readAllowlist`:** `["src/compiler/kinetic-grammar-schema.js", "src/compiler/edge-static-compiler.js", "src/pipeline/transmuter.js", "test/challenger-adversarial-m5.test.js"]`
* **`writeAllowlist`:** `["src/compiler/kinetic-grammar-schema.js", "src/compiler/edge-static-compiler.js", "src/pipeline/transmuter.js", "test/m4-compiler-dualstack.test.js"]`
* **Instruções de Implementação:**
  1. Em `src/compiler/kinetic-grammar-schema.js`, exportar `validateStrictDonutScope(cssSource)` capaz de bloquear 100% das perfurações de slot (combinadores `>`, `+`, `~`, seletores de atributo, `:is()`, `:where()`).
  2. Exportar `buildScopedPreludes({ root, limit, mode })` suportando as 5 topologias do W3C CSS Cascade Level 6.
  3. Injetar reset explícito de propriedades herdáveis (`color`, `font-family`) na fronteira do slot em `edge-static-compiler.js` e `transmuter.js`.
* **Comando de Verificação (DoD):**
  ```bash
  node --test test/m4-compiler-dualstack.test.js test/challenger-adversarial-m5.test.js
  ```

---

### `TASK-C2`: Ponte Determinística Lenis + Micro-FSM e Barramento Universal `window.__DNA_TELEMETRY__`
* **Papel:** `implementation_agent`
* **Objetivo Universal:** Erradicar hacks `!important` de bloqueio de scroll (`html.lenis-stopped`), prevenir o engolimento de eventos `wheel` em modais/dropdowns e expor um barramento padronizado de telemetria.
* **`readAllowlist`:** `["src/fsm/core/machine.js", "src/fsm/core/connect.js", "test/m2-fsm-forms.test.js"]`
* **`writeAllowlist`:** `["src/fsm/core/connect.js", "test/m2-fsm-forms.test.js"]`
* **Instruções de Implementação:**
  1. Em `src/fsm/core/connect.js`, implementar `bindLenisScrollLifecycle(machine, options)`:
     - Entrada em modais (`DETAIL_FLIGHT`, `open`): `lenis?.stop()`, `overflow = 'hidden'`, `overscroll-behavior: contain`, `e.stopPropagation()` no listener de `wheel`.
     - Saída para navegação (`RIBBON_BROWSE`, `idle`): remover `data-lenis-prevent*`, restaurar `overflow = ''`, `lenis?.start()`.
  2. Implementar `registerTelemetryScope(scopeId, stateGetter)` expondo `window.__DNA_TELEMETRY__[scopeId]`.
* **Comando de Verificação (DoD):**
  ```bash
  node --test test/m2-fsm-forms.test.js
  ```

---

### `TASK-C3`: Matriz de Captura Single-Browser, Crítica Visual Calibrada e Loop de Refinamento Limitado
* **Papel:** `implementation_agent`
* **Objetivo Universal:** Implementar os módulos de governança visual do roadmap adaptados para consumo mínimo de RAM (reutilizando 1 única aba para todos os viewports e estados).
* **`readAllowlist`:** `["src/qa/visual-regression.js", "src/qa/unified-quality-gate.js", "src/orchestration/workflow-orchestrator.js", "design-quality-orchestrator-roadmap.md"]`
* **`writeAllowlist`:** `["schemas/visual-critique.schema.json", "src/qa/visual-capture-matrix.js", "src/qa/visual-critic-gate.js", "src/orchestration/refinement-controller.js", "test/visual-critic-and-refinement.test.js"]`
* **Instruções de Implementação:**
  1. `src/qa/visual-capture-matrix.js`: `captureVisualMatrix` reutilizando 1 instância de página para viewports `1440x900`, `1024x768`, `768x1024`, `390x844` nos estados `top`, `middle`, `bottom`, `menu-open`, `focus`, `reduced-motion` com vinculação SHA-256.
  2. `src/qa/visual-critic-gate.js`: `evaluateVisualCritique` cobrindo as 7 dimensões obrigatórias (`score >= 4`, `critical: false`).
  3. `src/orchestration/refinement-controller.js`: `planRefinement` com trava estrita de 3 tentativas (`human_review_required`).
* **Comando de Verificação (DoD):**
  ```bash
  node --test test/visual-critic-and-refinement.test.js
  ```

---

## SEÇÃO 5: BLOCO D — CALIBRAÇÃO CINÉTICA DO `WorkStage` 3D E WORKBENCH TIME-WARP

### `TASK-D1`: Fechamento Matemático da Gap Matrix (System A vs. System B) no `WorkStage`
* **Papel:** `implementation_agent`
* **Cliente (`clientScope`):** `marcionilio-oliveira`
* **Objetivo:** Alinhar o `WorkStage` com a física exata do benchmark `jesperlandberg-com` (System A) satisfazendo 100% dos Invariantes 1 a 5 (Gates 2, 3, 4, 5 e 6 em `tests/e2e/work-stage.spec.ts`).
* **`readAllowlist`:** `["src/components/WorkStage/", "vite.bundle.config.mjs", "clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js", "tests/e2e/work-stage.spec.ts", "copias/jesperlandberg-com/ui-ux/shaders/shader_9.vert", "copias/jesperlandberg-com/ui-ux/shaders/shader_10.frag"]`
* **`writeAllowlist`:** `["src/components/WorkStage/", "clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js", "tests/e2e/work-stage.spec.ts"]`
* **Transformações Matemáticas:**
  1. `u_sheetD(V) = W \cdot \text{depth} \cdot (1,0 + 1,1 \cdot V)` com $H \approx 20,71$ e $W = H \cdot \text{aspectRatio}$.
  2. Velocidade $t = \tanh(\Delta / \text{velNorm})$, $\text{vel} = t \cdot |t|$, impulso $\text{Impulse} = f \cdot 12,0$.
  3. Concavidade hover `u_dent`: `0.10` com $z_{\text{offset}} = -u\_hover \cdot 0,10 \cdot \text{res}_y \cdot (1 - q_x^2)(1 - q_y^2)$.
  4. Handoff quadro a quadro: zerar velocidade no Frame 0 de clique, interpolação pela curva `ro`, transições ligadas a `onComplete` eliminando timeouts cegos.
  5. Compilar bundle via `npx vite build --config vite.bundle.config.mjs` e rodar testes de Gate 4, 5, 6.
* **Comando de Verificação (DoD):**
  ```bash
  npx playwright test tests/e2e/work-stage.spec.ts --workers=1
  ```

---

### `TASK-D2`: Rota de *Component Workbench* Isolado e Executor *Low-Spec Gate*
* **Papel:** `implementation_agent`
* **Objetivo:** Permitir abrir qualquer componente ou seção diretamente no estado desejado em `http://127.0.0.1:4000` (pulando preloaders) e criar o comando `npm run test:low-spec` que valida toda a engenharia sem sobrecarregar a máquina.
* **`readAllowlist`:** `["src/server/preview-server.js", "package.json", "test/server-security.test.js", "test/preview-server.integration.test.js"]`
* **`writeAllowlist`:** `["src/server/preview-server.js", "scripts/run-low-spec-gate.js", "package.json"]`
* **Instruções de Implementação:**
  1. Em `src/server/preview-server.js`, detectar `?workbench=<target>&skipIntro=1` e saltar preloader.
  2. Criar `scripts/run-low-spec-gate.js` e adicionar `"test:low-spec": "node scripts/run-low-spec-gate.js"` no `package.json`:
     - *Estágio 1:* Executa suítes matemáticas, AST, Vault, APCA, Shader Slicer e FSM em série (`--test-concurrency=1`, $<100\text{ MB}$ RAM, $<2\text{ s}$).
     - *Estágio 2 (Opcional):* `npx playwright test tests/e2e/work-stage.spec.ts --workers=1`.
* **Comando de Verificação (DoD):**
  ```bash
  node --test test/server-security.test.js test/preview-server.integration.test.js && npm run test:low-spec
  ```

---

## SEÇÃO 6: PROTOCOLO DE DESPACHO SEQUENCIAL

1. **Passo 1 (Saneamento Rápido — ~0,5s):** `TASK-A1`, `TASK-A2`, `TASK-A3`.
2. **Passo 2 (Motores Matemáticos, Físicos e Shaders — ~0,5s):** `TASK-B1`, `TASK-B2`, `TASK-B3`, `TASK-B4`.
3. **Passo 3 (Isolamento `@scope`, Lenis FSM e Governança — ~0,5s):** `TASK-C1`, `TASK-C2`, `TASK-C3`.
4. **Passo 4 (Calibração do `WorkStage` e Workbench — ~4s com 1 worker):** `TASK-D1`, `TASK-D2`.
