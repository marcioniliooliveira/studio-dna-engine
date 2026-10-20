# Plano de Refinamento de Dinâmicas 3D: Marcionilio Oliveira vs Jesper Landberg

> **Objetivo (/goal):** Elevar a física, inércia e shaders da seção "THE WORK" de Marcionilio Oliveira (`clientes/marcionilio-oliveira`) ao padrão cinemático de Jesper Landberg (`copias/jesperlandberg-com`), garantindo a preservação absoluta e inegociável da dinâmica de abertura da explicação dos projetos (*Card-to-Sheet* $\to$ Modal de Detalhe $\to$ Fechamento $\to$ Restauração).

---

## 1. Diagnóstico Forense de Discrepâncias

A análise comparativa minuciosa entre o código canônico de Jesper Landberg (`copias/jesperlandberg-com/site/assets/_nuxt/DZyj3ghP.js` e `CSMsEA09.js`) e a implementação atual em Marcionilio Oliveira (`src/components/WorkStage/`) revelou 5 discrepâncias técnicas determinantes para a percepção de fluidez e "peso" físico:

| Eixo Cinemático | Implementação Jesper Landberg (`DZyj3ghP.js`) | Implementação Atual Marcionilio (`WorkStage`) | Impacto Percebido |
| :--- | :--- | :--- | :--- |
| **1. Expansão de Profundidade com Velocidade (`u_sheetD`)** | $D = s \cdot \text{depth} \cdot (1 + 1.1 \cdot V)$. No pico de velocidade ($V \to 1$), a amplitude da onda S aumenta em **+110%**, afundando a fita e projetando a crista no espaço. | `u_sheetD` é mantido fixo e estático em `12.0` (`SHEET_CONSTANTS.depth`) independentemente da aceleração da rolagem. | A fita atual parece um carrossel rígido deslizando, enquanto Jesper parece um tecido orgânico que se deforma com o fluxo de ar. |
| **2. Inércia de Arremesso (Flick Physics)** | No release de gestos rápidos ($< 100\text{ms}$), calcula a velocidade instantânea $f = (L - m) \cdot 1.5$ e injeta um impulso de arremesso multiplicado por 12 ($f \cdot 12$). | O wheel/drag atual aplica apenas `clamp(rawDelta * 0.0025, 0.15, 1.0)` sem preservar o momentum de release do ponteiro. | O scroll para de forma mais abrupta ao soltar o mouse/touch, carecendo da inércia aveludada do original. |
| **3. Dinâmica do Voo Card-to-Sheet** | A transição de abertura utiliza a curva de Bezier cúbica `ro` (`expo.out`) onde a lavagem branca (`u_white`) atinge 100% ligeiramente antes da parada ($d \times 1.08$), descurvando a geometria de forma sincronizada com o desvanecimento dos vizinhos. | O voo move o mesh para `z: 22` com `power3.out` em 0.85s e transiciona `u_sheetP: 0`, `u_white: 1`, `u_shade: 0`, `u_scrim: 0` linearmente. | O voo atual funciona perfeitamente mas parece um "zoom mecânico" em direção à câmera, em vez de um desdobramento espacial editorial na viewport. |
| **4. Gating de Velocidade e Resfriamento Pré-Voo** | Jesper condiciona estritamente: `if (u_sheetV > 0.001 && u_sheetW > 0.001 && u_sheetP > 0.001)` e zera a velocidade antes do voo (`this.vel = 0`), impedindo que o card congele torcido no modal. | Marcionilio aplica o gate em `u_sheetP`, mas o decaimento de `scrollVelocity` ocorre suavemente a cada tick, podendo manter uma deformação residual nos primeiros milissegundos do voo. | Risco de vibração ou torção perceptível se o usuário clicar num card no meio de uma rolagem violenta. |
| **5. Concavidade e Relevo ao Hover (`u_dent`)** | `u_dent = 0.10`. Ao pairar o ponteiro, o centro do card afunda suavemente (`-u_hover * u_dent * resY * dome(uv)`), com a luz Blinn-Phong reagindo à curvatura do reflexo. | `u_dent = 0.04` em `RibbonCardMaterial.ts`, gerando um efeito de arqueamento quase imperceptível. | Falta a resposta tátil de profundidade sob o cursor que dá a sensação de um objeto tridimensional maleável. |

---

## 2. Guardrails Inegociáveis: Preservação da Dinâmica de Explicação

O utilizador exigiu estritamente: **"sem quebras da dinâmica de abertura de explicação dos sites exibidos"**. Para garantir 100% de estabilidade e zero regressões:

1. **Blindagem dos Contratos de Teste (Gate 4 e Gate 5):**
   - A máquina de estados continuará emitindo rigorosamente a sequência de fases:
     `PORTAL_EXPAND` $\to$ `RIBBON_BROWSE` $\to$ `DETAIL_FLIGHT` $\to$ `DETAIL_ACTIVE` $\to$ `DETAIL_CLOSING` $\to$ `RIBBON_BROWSE`.
   - No estado `DETAIL_ACTIVE`, os uniforms do card selecionado devem satisfazer as asserções exatas do Playwright:
     - `u_sheetP < 0.01` (completamente plano, sem curvatura).
     - `u_white > 0.99` (superfície 100% branca `#FAF9F6`).
     - `u_shade < 0.01` (sem sombra/iluminação 3D).
     - `u_scrim < 0.01` (sem degradê de rodapé).
     - `u_alpha < 0.01` em todos os vizinhos (1, 2, 3).
   - No fechamento (`DETAIL_CLOSING` $\to$ `RIBBON_BROWSE`):
     - `u_sheetP > 0.95`
     - `u_white < 0.05`
     - `u_shade > 0.95`
     - `u_scrim > 0.80`
     - `u_alpha > 0.95` em todos os cartões.
2. **Preservação de DOM & Acessibilidade:**
   - O elemento `#work-detail-panel-root` e o atributo `[data-work-detail-panel]` com `aria-hidden="false"` e `opacity > 0` permanecem intocados.
   - Os proxies `[data-work-card-proxy="0..3"]` continuam recebendo eventos de clique, hover e coordenadas de hit-test.
3. **Sincronização do Header Astro:**
   - O cabeçalho `header[data-intro-header]` continua alternando para `--header-bg: #FAF9F6`, `--header-text: #2E2B28` no modal e voltando a `--header-bg: #3A3632`, `--header-text: #f3eee8` ao fechar.

---

## 3. Roteiro de Iteração Técnica (TDD Workflow)

### Fase 1: Testes Unitários de Dinâmica (TDD - RED)
- Arquivo alvo: `src/components/WorkStage/__tests__/math.spec.ts`.
- Adicionar asserções para o cálculo de amplitude dinâmica de profundidade:
  $$D(V) = D_{\text{base}} \cdot (1 + 1.1 \cdot V)$$
- Garantir que $V \in [0, 1]$ mapeie deterministicamente $D \in [12.0, 25.2]$.

### Fase 2: Implementação da Amplitude Dinâmica e Arremesso Inercial
- **Arquivos:** `src/components/WorkStage/RibbonCard.tsx`, `src/components/WorkStage/WorkStage.tsx`.
- Passar a amplitude calculada para o material:
  `matRef.current.u_sheetD = SHEET_CONSTANTS.depth * (1.0 + 1.1 * currentVel)`.
- No `WorkStage.tsx`, aprimorar o manipulador de ponteiro e wheel com o fator de flick release ($f \cdot 12$), conferindo a inércia elástica autêntica de Jesper.
- Forçar resfriamento imediato de `scrollVelocity = 0` ao disparar `handleOpenProject`, impedindo qualquer vibração no início do voo.

### Fase 3: Refinamento da Curva de Voo (Card-to-Sheet)
- **Arquivo:** `src/components/WorkStage/RibbonCard.tsx`.
- Ajustar os tweens do GSAP durante `isDetailOpen`:
  - Easing: `expo.out` sincronizado (1.0s de voo).
  - Lavagem branca: `u_white` atinge 1.0 com multiplicador de avanço ($d \times 1.08$), criando o "snap" fotográfico de alta-costura.
  - Sincronização impecável com os tempos de timeout de `WorkStage.tsx` (900ms para `DETAIL_ACTIVE`), garantindo que o painel HTML apareça no exato momento em que o card WebGL estaciona como folha branca.

### Fase 4: Calibração de Micro-Interação ao Hover
- **Arquivo:** `src/components/WorkStage/RibbonCardMaterial.ts`.
- Ajustar `u_dent` padrão de `0.04` para `0.09`.
- Aprimorar a resposta de `u_hover` com easing `expo.out` (0.5s in, 0.5s out), gerando o afundamento sedoso e a reflexão especular no centro do card.

### Fase 5: Compilação, Servidor e Bateria de Verificação Completa
- Executar `npm run build:workstage` e atualizar `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.
- Rodar a suíte completa de verificação automatizada:
  1. `npx vitest run src/components/WorkStage/__tests__/math.spec.ts` (Gate 1).
  2. `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 2"` (Abertura e portal).
  3. `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 3"` (Fita 3D, velocidade e hover).
  4. `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 4"` (Voo Card-to-Sheet e tema).
  5. `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 5"` (Fechamento e restauração).
  6. `npx playwright test tests/e2e/work-stage.spec.ts -g "Gate 6"` (Rolagem contínua sem deadlock).
  7. `npx playwright test tests/e2e/challenger-viewport.spec.ts` (Multi-viewport 1440x900, 1920x1080, 1280x800, 1600x900).
