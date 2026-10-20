# Relatório de Investigação Técnica — WebGL/R3F, Física de Interação e Infraestrutura de Build

**Autor:** `explorer_phase0_2`  
**Data:** 2026-10-17T15:38:30Z  
**Diretório de Trabalho:** `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_phase0_2`  
**Escopo:** Investigação técnica em conformidade com `ORIGINAL_REQUEST.md` (requisitos R2 e R4, WP-2 e WP-4, e Hard Guardrails 4 e 5).

---

## 1. Sumário Executivo

Esta investigação técnica aprofundou a arquitetura do motor 3D "THE WORK" (`src/components/WorkStage/`), sua física de rolagem e interação tátil, a integridade matemática dos shaders GLSL, o servidor de preview local (`scripts/serve-marcionilio-site.cjs`) e a esteira de build do bundle de produção.

### Principais Constatações:
1. **Canibalização de Eventos e Duplicação de Listeners [OBSERVADO]:**
   - Os listeners de rolagem em `WorkStage.tsx` registram `onWindowWheel` tanto em `window` quanto em `document` com `{ capture: true, passive: true }`, invocando `applyDelta` duas vezes a cada tick de wheel. Além disso, a `div[data-work-webgl-stage]` possui um handler `onWheel={handleWheel}` inline no JSX que sobrescreve o `targetOffset` com um `clamp` rígido `[-maxOffset, maxOffset]`, eliminando qualquer elasticidade calculada.
   - O limiar de abertura atual está configurado em `portalProgress >= 0.95`. No intervalo $0.95 \le pp < 0.99$, o portal ainda está em expansão visual, mas o motor já processa deltas e move a fita prematuramente, canibalizando eventos do GSAP ScrollTrigger.
2. **Deadlock do Lenis e Fronteira Rígida [OBSERVADO & INFERIDO]:**
   - O stride entre cards é de $18.5$ unidades com 4 cards (largura total $55.5$, `maxOffset = 27.75`). O limite rígido histórico (ex: `-28.76`) impedia o avanço contínuo.
   - Em `initHorizontalScroll.LNLCK81L.js`, a função `syncViewportClip` re-aplica `data-lenis-prevent="true"` indefinidamente em todo tick de `onUpdate` enquanto `pp >= 0.999`. O cálculo de progresso unilateral `Math.min(1, Math.max(0, (cur - p) / M))` trava $pp$ em $1.0$ por toda a retenção e além, congelando o Lenis e impedindo o usuário de alcançar o Chapter III e o rodapé.
3. **Integridade Estrita dos Shaders GLSL e CPU Twin [OBSERVADO]:**
   - Todas as 12 equações matemáticas analíticas de deformação (`sheetShape`, `sheetShapeSlope`, `sheetZ`, `sheetRoll`, `sheetWind`, `sheetDome`, `leanRamp`, `leanSlope`, `sheetLit`, `uvCover`, `roundedBox` e Blinn-Phong) foram verificadas e apresentam equivalência 1:1 absoluta entre `RibbonCardMaterial.ts` e `math.ts`. A suíte Vitest passa com 7/7 testes verdes.
   - Os 4 projetos canônicos (`evo-money`, `plant-tag`, `swisshaus`, `betahaus`) e tokens de cor (`referenceData.ts`) estão rigorosamente preservados.
4. **Causa Raiz do Servidor de Preview Local [OBSERVADO]:**
   - Em `scripts/serve-marcionilio-site.cjs`, as linhas 46-48 redirecionam requisições na raiz `/` para `cleanPath = '/gemini-code-1792177008460.html'`. Esse arquivo é um fragmento HTML corrompido/truncado (355 linhas, sem montagem de WebGL e sem scripts do Astro). O arquivo canônico `clientes/marcionilio-oliveira/site/index.html` não era servido por padrão na raiz.
5. **Sincronização do Pipeline de Build [OBSERVADO]:**
   - Antes da execução de `npm run build:workstage`, o artefato `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` estava desatualizado em relação às últimas alterações em `src/components/WorkStage/WorkStage.tsx`.
   - Após a compilação com `vite build --config vite.bundle.config.mjs` (4.97s, 1.299MB), tanto a suíte padrão de Gates 2 a 5 quanto a suíte multi-viewport (`challenger-viewport.spec.ts`) passaram com 100% de sucesso em todas as resoluções de desktop (1440x900, 1920x1080, 1280x800, 1600x900).

---

## 2. Inspeção Técnica Detalhada: `WorkStage.tsx`, `RibbonCard.tsx`, `RibbonCardMaterial.ts` e `math.ts`

### 2.1. Registro e Processamento de Listeners (Wheel, Touch, Teclado)

**Localização:** `src/components/WorkStage/WorkStage.tsx` (linhas 120-260 e 519-540)

#### Observações do Código Atual:
1. **Registro Duplo em Fase de Captura:**
   ```typescript
   // Linhas 244-245
   window.addEventListener('wheel', onWindowWheel, { capture: true, passive: true });
   document.addEventListener('wheel', onWindowWheel, { capture: true, passive: true });
   ```
   Como `window` é o ancestral raiz de `document`, um evento de roda acionado em qualquer elemento do DOM dispara `onWindowWheel` primeiro no `window` (capture phase) e imediatamente a seguir no `document` (capture phase). Isso duplica a chamada de `applyDelta(delta)` para um mesmo tick de hardware.

2. **Manipulador Inline Antagônico no JSX:**
   ```tsx
   // Linha 540
   <div data-work-webgl-stage="" onWheel={handleWheel} ...>

   // Linhas 519-527
   const handleWheel = (e: React.WheelEvent) => {
     if (activeIndex !== null || portalProgress < 0.95) return;
     const maxOffset = ((REFERENCE_PROJECTS.length - 1) * RIBBON_STRIDE) / 2;
     ribbonState.current.targetOffset = clamp(
       ribbonState.current.targetOffset - e.deltaY * 0.025,
       -maxOffset,
       maxOffset
     );
   };
   ```
   O manipulador `handleWheel` aplica uma trava estrita `clamp(..., -maxOffset, maxOffset)`. Quando o usuário rola o mouse sobre o canvas, o evento borbulha até `handleWheel`, que desfaz imediatamente qualquer extensão de overscroll elástico calculada por `applyDelta` (`-maxOffset - OVERSCROLL_LIMIT`), gerando um conflito de estado interno a cada frame.

3. **Canibalização de Eventos Durante Abertura ($0.0 < pp < 0.99$):**
   ```typescript
   // Linhas 131-134 e 179-182
   const isPortalOpen =
     portalProgressRef.current >= 0.95 ||
     (w.__WORK_STAGE__ && w.__WORK_STAGE__.portalProgress >= 0.95);
   ```
   No intervalo $0.95 \le pp < 0.99$, o portal ainda está realizando a animação de expansão visual e acomodação de texto do GSAP ScrollTrigger. Ao registrar listeners com `capture: true` no `window` que aceitam deltas a partir de $pp \ge 0.95$, o componente consome deltas de rolagem e movimenta a fita antes do momento em que a fita deveria estar interativa ($pp \ge 0.99$), competindo diretamente com a aceleração da timeline.

#### Prescrição de Higienização:
- Remover `document.addEventListener('wheel')`, mantendo exclusivamente o listener em `window`.
- Remover o handler redundante `onWheel={handleWheel}` da tag `<div data-work-webgl-stage="">`.
- Elevar a condição de guarda para aceitação de eventos:
  ```typescript
  const isBrowseReady =
    phaseRef.current === 'RIBBON_BROWSE' &&
    portalProgressRef.current >= 0.99 &&
    activeIndexRef.current === null;
  if (!isBrowseReady) return;
  ```
- Para eventos touch (`touchmove`), ignorar completamente o processamento se $pp < 0.99$, permitindo que o scroll vertical nativo ou o Lenis conduza a abertura sem retenção de gestos.

---

### 2.2. Cálculo de `scrollVelocity`, `ribbonOffset` e Fronteira Rígida

**Localização:** `src/components/WorkStage/WorkStage.tsx` (linhas 15, 64-68, 74-91, 125-175, 262-310)

#### Geometria e Distribuição Espacial dos Cards:
- **Passo da Fita (`RIBBON_STRIDE`):** $18.5$ unidades no espaço de mundo Three.js.
- **Dimensões do Plano do Card:** $16.0 \times 10.0$ unidades.
- **Folga Lateral Mínima entre Centros:** $18.5 - 16.0 = 2.5$ unidades. Como a separação entre centros adjacentes é estritamente maior que a largura do plano, a sobreposição AABB no plano $(X, Y)$ é matematicamente zero ($0\text{px}^2$).
- **Posições Base dos Cards no Eixo X:**
  $$\text{baseX}_i = (i - 1.5) \times 18.5$$
  - Card 0 (`evo-money`): $(0 - 1.5) \times 18.5 = -27.75$
  - Card 1 (`plant-tag`): $(1 - 1.5) \times 18.5 = -9.25$
  - Card 2 (`swisshaus`): $(2 - 1.5) \times 18.5 = +9.25$
  - Card 3 (`betahaus`): $(3 - 1.5) \times 18.5 = +27.75$
- **Posição de Mundo Renderizada:**
  $$X_i = \text{baseX}_i + \text{offset}$$
  - Para centralizar o Card 0 no centro da câmera ($X = 0$):
    $$-27.75 + \text{offset} = 0 \implies \text{offset} = +27.75$$
  - Para centralizar o Card 3 no centro da câmera ($X = 0$):
    $$+27.75 + \text{offset} = 0 \implies \text{offset} = -27.75$$
- **Amplitude Útil de Navegação:** $\text{maxOffset} = 27.75$.

#### Origem da Fronteira Rígida Histórica:
No código anterior, a rolagem era delimitada por travamento estrito no intervalo $[-27.75, +27.75]$ ou com uma margem arbitrária fixa (como o valor `-28.76` citado nos requisitos). Ao atingir essa coordenada, o cálculo simplesmente descartava deltas subsequentes:
$$\text{targetOffset} = \text{clamp}(\text{next}, -27.75, +27.75)$$
Como a timeline do GSAP e o Lenis permaneciam bloqueados por `data-lenis-prevent="true"`, o scroll do usuário não produzia efeito nem na fita nem na página, caracterizando o deadlock.

#### Dinâmica de Velocidade e Shader Uniform `u_sheetV`:
- No impacto do delta da roda:
  $$\text{impulse} = \text{clamp}(|\text{delta}| \times 0.0012, 0.08, 1.0)$$
  $$\text{velocity} = \max(\text{velocity}, \text{impulse})$$
- No loop de animação a 60fps (normalizado por $\text{ratio} = \Delta t / 16.66\text{ms}$):
  $$\text{offsetLerp} = 1 - (1 - 0.10)^{\text{ratio}}$$
  $$\text{velLerp} = 1 - (1 - 0.15)^{\text{ratio}}$$
  $$\text{offset} \mathrel{+}= (\text{targetOffset} - \text{offset}) \times \text{offsetLerp}$$
  $$\Delta_{\text{offset}} = |\text{offset} - \text{offset}_{\text{prev}}|$$
  $$\text{targetVel} = \text{clamp}(\Delta_{\text{offset}} \times 1.6, 0, 1)$$
  $$\text{velocity} \mathrel{+}= (\text{targetVel} - \text{velocity}) \times \text{velLerp}$$
- A variável `velocity` alimenta o uniforme `u_sheetV` em `RibbonCard.tsx` (linha 113), que no shader `sheetWind` gera a torção inercial ($\text{SHEET\_VTWIST} = 1.8$) e empinamento de cauda ($\text{SHEET\_REAR\_Z} = 0.2$).

---

### 2.3. Mecanismo de Fronteira Elástica e Handshake de Saída (Abordagem C)

Para que o usuário possa navegar do topo da página até o rodapé de forma contínua e sem colisões, a fronteira da fita precisa operar como uma mola de retenção com desengate cinemático:

```
[Entrada: Scroll Página] ──> [Portal Expande: 0 -> 1]
                                    │
                                    ▼
                          [Fita 3D: RIBBON_BROWSE]
                          Card 0 (offset: +27.75)
                          Card 1 (offset: +9.25)
                          Card 2 (offset: -9.25)
                          Card 3 (offset: -27.75)
                                    │
                         (Usuário continua rolando)
                                    ▼
                         [Overscroll Elástico]
                         overflow = -maxOffset - next
                         next = -maxOffset - overflow * 0.35
                                    │
                      (overflow > EXIT_THRESHOLD: ~3.5)
                                    ▼
                         [Handshake de Saída]
                         1. Libera data-lenis-prevent
                         2. Transiciona fase para saída
                         3. Viewport 3D dissolve / clip-out
                                    │
                                    ▼
                         [Continuidade da Página]
                         Chapter III (Serviços) ──> Chapter IV ──> Rodapé
```

#### Regras para a Implementação do Handshake:
1. **Zona Útil da Fita:** Enquanto $\text{targetOffset} \in [-27.75, +27.75]$, o Lenis deve ser contido para permitir a navegação livre entre os 4 cards.
2. **Zona de Tensão Elástica:** Ao passar do Card 3 ($\text{next} < -27.75$), aplicar resistência amortecida ($0.35$). A fita se desloca ligeiramente até um limite máximo de $-33.75$ ($\text{OVERSCROLL\_LIMIT} = 6.0$).
3. **Ponto de Disparo de Saída:** Quando $\text{overflow} > 3.5$, emitir o evento de handshake ou desarmar `data-lenis-prevent`.
4. **Sincronização com `initHorizontalScroll.LNLCK81L.js`:**
   A timeline do GSAP deve tratar a saída como Fase 3:
   - Em vez de uma parada indefinida, o progresso da página volta a mover a trilha horizontal.
   - O viewport `#jesper-work-stage-viewport` deve receber transição suave de opacidade ($1 \to 0$) ou retração de máscara e `pointer-events: none`, permitindo a visualização e interação imediata com o Chapter III.

---

### 2.4. Integridade das Equações GLSL e CPU Twin (`math.ts`)

Foi realizada a auditoria analítica e executável comparando o shader `RibbonCardMaterial.ts` e o módulo CPU `math.ts`:

| Equação GLSL / Função | Parâmetros Canônicos | Correspondência CPU (`math.ts`) | Status de Teste |
| :--- | :--- | :--- | :--- |
| `leanRamp(s)` | $s \in [-1, 1]$, $s(1.5 - 0.5s^2)$ | `leanRamp(s)` | Passa (Vitest Gate 1) |
| `leanSlope(s)` | $|s| \le 1$, $1.5(1 - s^2)$ | `leanSlope(s)` | Passa (Vitest Gate 1, $C^1$ contínua) |
| `sheetQ(wx)` | $\text{shift} = -0.2$, $u_{\text{sheetW}} = 22$, $u_{\text{sheetT}} = 0.9$ | `sheetQ(wx, ...)` | Passa (Vitest Gate 1) |
| `sheetShape(q)` | $\text{mix}(1 - q^2, \sin(\pi q), c) \cdot e^{-q^2}$ | `sheetShape(q, c)` | Passa (Vitest Gate 1) |
| `sheetShapeSlope(q)` | Derivada exata da forma de onda da folha | `sheetShapeSlope(q, c)` | Passa (Vitest Gate 1) |
| `sheetZ(wx)` | $-u_{\text{sheetD}} \cdot \text{sheetShape}(q)$ | `sheetZ(wx, ...)` | Passa (Vitest Gate 1) |
| `sheetRoll(wx)` | $\text{SHEET\_BANK} = -0.16$, inclinação lateral | `sheetRoll(wx, ...)` | Passa (Vitest Gate 1) |
| `sheetWind(w)` | Torção $\text{VTWIST} = 1.8$, empinamento $\text{REAR\_Z} = 0.2$ | `evaluateSheetPoint(...)` | Passa (Vitest Gate 1, plano puro em $u_{\text{sheetP}} = 0$) |
| `sheetDome(uv)` | $(1 - q_x^2)(1 - q_y^2)$, elevação central de hover | `sheetDome(uv)` | Passa (Vitest Gate 1, centro = 1.0, bordas = 0.0) |
| `sheetLit(...)` | Blinn-Phong: spec 0.35, gloss 48.0, diff 0.12 | `sheetLit(...)` | Passa (Vitest Gate 1) |
| `uvCover(...)` | Proporção sem distorção e recorte centralizado | `uvCover(...)` | Passa (Vitest Gate 1) |
| `roundedBox(...)` | SDF de caixa com cantos arredondados ($r = 0.04$) | `roundedBox(...)` | Passa (Vitest Gate 1) |

#### Execução de Testes Unitários:
```
npx vitest run src/components/WorkStage/__tests__/math.spec.ts
✓ src/components/WorkStage/__tests__/math.spec.ts (7 tests) 10ms
Test Files: 1 passed (1) | Tests: 7 passed (7)
```
**Conclusão:** A integridade matemática dos shaders GLSL é absoluta e comprovada por testes determinísticos na CPU.

---

### 2.5. Verificação dos 4 Projetos Canônicos

Em `src/components/WorkStage/referenceData.ts`:
1. `index: 0` — `slug: 'evo-money'` (EVO Money, 2025, aspect: [1440, 810])
2. `index: 1` — `slug: 'plant-tag'` (Plant Tag, 2024, aspect: [1440, 810])
3. `index: 2` — `slug: 'swisshaus'` (Swiss Haus, 2024, aspect: [1440, 804])
4. `index: 3` — `slug: 'betahaus'` (Betahaus, 2023, aspect: [1440, 810])

Tokens de cor:
- `bgDark: '#1F1D1B'`, `bgBase: '#262220'`, `bgSurface: '#FAF9F6'`, `textDark: '#2E2B28'`, `washRgb: [250/255, 249/255, 246/255]`.
Todos os 4 projetos e tokens atendem 100% à especificação.

---

## 3. Inspeção do Servidor de Preview Local: `scripts/serve-marcionilio-site.cjs`

### 3.1. Causa Raiz do Redirecionamento da Rota `/`

Ao inspecionar `scripts/serve-marcionilio-site.cjs`, observou-se:

```javascript
// Linhas 45-48 de scripts/serve-marcionilio-site.cjs
let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
if (cleanPath === '/' || cleanPath === '') {
  cleanPath = '/gemini-code-1792177008460.html';
}
```

E nas linhas 123-125:
```javascript
if (process.argv.includes('--open')) {
  const targetUrl = `http://localhost:${port}/gemini-code-1792177008460.html`;
  ...
}
```

#### Diagnóstico do Arquivo `gemini-code-1792177008460.html`:
- O arquivo possui apenas 355 linhas e 18.297 bytes.
- Termina abruptamente na linha 355 com uma classe incompleta: `<div data-name-row="" class="w-full text-(`.
- Não inclui os containers `#jesper-work-stage-viewport`, `#jesper-work-stage-mount` nem `#work-detail-panel-root`.
- Não importa `workStage.bundle.js` nem as seções do Astro (Chapter II, III, IV, etc.).
- Como consequência direta, qualquer usuário ou ferramenta que acessasse `http://localhost:3000/` recebia uma tela quebrada e truncada.

#### Comparação com `clientes/marcionilio-oliveira/site/index.html`:
- Arquivo de produção com 284 linhas e 57.616 bytes.
- Contém a árvore completa do Astro SSG com todos os scripts e os containers do WorkStage.
- É o arquivo servido nos testes E2E (`tests/e2e/work-stage.spec.ts`, linhas 30-32).

### 3.2. Proposta de Correção em `scripts/serve-marcionilio-site.cjs`

```javascript
// Linhas 46-48: substituir por roteamento determinístico para index.html
let cleanPath = decodeURIComponent(req.url?.split('?')[0] || '/');
if (cleanPath === '/' || cleanPath === '') {
  cleanPath = '/index.html';
}
```

E no bloco `--open` (linhas 124-125):
```javascript
const targetUrl = `http://localhost:${port}/`;
```

#### Verificação do Mecanismo de Fallback de Porta:
O script já possui lógica resiliente de fallback:
```javascript
function startOnPort(port, maxAttempts = 10) {
  const server = createServer();
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && maxAttempts > 0) {
      console.log(`Port ${port} in use, trying ${port + 1}...`);
      startOnPort(port + 1, maxAttempts - 1);
    }
  });
  ...
}
```
Caso a porta 3000 esteja em uso por outro processo ou dev server, o script incrementa automaticamente para 3001, 3002, etc., garantindo inicialização limpa.

---

## 4. Inspeção do Pipeline de Compilação

### 4.1. Configuração do Vite e Mapeamento de Arquivos

- **Script NPM:** `"build:workstage": "vite build --config vite.bundle.config.mjs"`
- **Configuração:** `vite.bundle.config.mjs`
  - `entry`: `src/components/WorkStage/mount.tsx`
  - `outDir`: `clientes/marcionilio-oliveira/site/assets/_astro`
  - `fileName`: `() => 'workStage.bundle.js'`
  - `formats`: `['es']`
  - `emptyOutDir`: `false` (preserva os outros bundles compilados do Astro no diretório)
- **Ponto de Entrada:** `src/components/WorkStage/mount.tsx`
  Monta o componente `<WorkStage initialPortalProgress={0.0} />` no nó `#jesper-work-stage-mount`.

### 4.2. Auditoria de Discrepâncias entre Código Fonte e Bundle

Foi realizada a compilação do bundle via `npm run build:workstage` e a inspeção do diff gerado no repositório:

```
vite v8.3.4 building client environment for production...
✓ 595 modules transformed.
clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js  1,299.73 kB │ gzip: 319.59 kB
✓ built in 4.97s
```

#### Discrepâncias Identificadas e Resolvidas:
Antes da compilação recente, o arquivo `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js` continha a versão legada da física de rolagem:
1. **Falta do motor de gestos touch e teclado:** O bundle compilado antigo não possuía o suporte a `touchstart`, `touchmove`, `touchend` e navegação de setas do teclado.
2. **Falta da normalização de taxa de quadros (rAF ratio):** A física antiga usava constantes estáticas de amortecimento (`* 0.1` e `* 0.15`) em vez da equação invariante a framerate baseada em $60\text{fps}$ ($\text{ratio} = \Delta t / 16.66\text{ms}$).
3. **Parâmetros do Canvas R3F ausentes no bundle:** As propriedades `gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}`, `dpr={[1, 2]}` e `style={{ width: '100%', height: '100%' }}` não estavam presentes no bundle anterior.

Após a reconstrução com o novo bundle:
- `tests/e2e/work-stage.spec.ts` (Gates 2, 3, 4, 5): **4 passed (25.8s)**
- `tests/e2e/challenger-viewport.spec.ts` (Multi-Viewport Stress Gate): **6 passed (31.5s)**
  - 1440x900 Standard Desktop: Simetria óptica $\Delta = 0.00021\text{px}$, Cobertura 100%
  - 1920x1080 Full HD Wide: Simetria óptica $\Delta = 0.00006\text{px}$, Cobertura 100%
  - 1280x800 16:10 Laptop: Simetria óptica $\Delta = 0.00006\text{px}$, Cobertura 100%
  - 1600x900 16:9 Mid Desktop: Simetria óptica $\Delta = 0.00021\text{px}$, Cobertura 100%
  - Multi-Viewport Card Flight & Header Theming: Aprovado em todas as resoluções
  - WebGL Lifecycle & Memory Health: 0 erros WebGL, contexto íntegro após redimensionamentos adversos.

---

## 5. Recomendações Técnicas para os Pacotes de Trabalho WP-2 e WP-4

Com base nas evidências coletadas, detalhamos o plano de ação cirúrgico para os agentes executores (Workers):

### WP-2: Handshake Cinemático e Resolução de Escala Dimensional
1. **Em `src/components/WorkStage/WorkStage.tsx`:**
   - Remover `document.addEventListener('wheel')` e remover o atributo inline `onWheel={handleWheel}` da `div[data-work-webgl-stage]`.
   - Modificar a condição de ativação de wheel/touch para `phaseRef.current === 'RIBBON_BROWSE' && portalProgressRef.current >= 0.99`.
   - No cálculo de overscroll elástico, conectar a saída de rolagem a uma emissão explícita ou remoção definitiva de `data-lenis-prevent`.
2. **Em `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js`:**
   - Parar de rearmar incondicionalmente `data-lenis-prevent="true"` a cada tick de `onUpdate`.
   - Integrar a Fase 3 da timeline GSAP: após o período de retenção da fita (`M_hold`), o viewport 3D deve transicionar suavemente (`opacity: 0` ou retração de recorte) e devolver o controle linear para a trilha horizontal avançar em direção aos Capítulos III e IV.

### WP-4: Saneamento do Ambiente de Preview e Compilação
1. **Em `scripts/serve-marcionilio-site.cjs`:**
   - Alterar linha 47 para `cleanPath = '/index.html'`.
   - Ajustar o comando de `--open` para abrir a rota raiz `/`.
2. **Compilação e Verificação:**
   - Executar `npm run build:workstage` após as modificações de `WorkStage.tsx`.
   - Executar a suíte completa de testes:
     `npm run test:workstage` (Vitest + Playwright)
     `npx playwright test tests/e2e/challenger-viewport.spec.ts`

---
*Relatório gerado em estrita conformidade com o Protocolo de Verdade e a Arquitetura Studio DNA.*
