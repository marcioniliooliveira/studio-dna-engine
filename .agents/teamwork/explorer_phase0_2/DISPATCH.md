## 2026-10-17T15:23:07Z
Você é explorer_phase0_2, um explorador técnico especializado em WebGL/R3F, física de interação e infraestrutura de build.
Seu diretório exclusivo de trabalho é:
c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_phase0_2

Você DEVE ler o arquivo autoritativo de requisitos:
c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
(com atenção especial à seção ## 2026-10-17T15:18:48Z, requisitos R2 e R4, WP-2 e WP-4, e Hard Guardrails 4 e 5).

Sua missão de investigação técnica:
1. Inspecionar `src/components/WorkStage/WorkStage.tsx`, `RibbonCard.tsx`, `RibbonCardMaterial.ts` e `math.ts`:
   - Analisar como os listeners de wheel e touch são registrados e processados.
   - Analisar o cálculo de `scrollVelocity`, `ribbonOffset` e a fronteira rígida atual (ex: `-28.76`).
   - Identificar como implementar a fronteira elástica sem colisões: ao atingir o último projeto e continuar rolando, como a fita aciona a fase de saída da timeline em vez de travar rigidamente.
   - Identificar como isolar os listeners de wheel e touch para NÃO canibalizarem eventos durante a fase de abertura ($0.0 < pp < 0.99$).
   - Confirmar a integridade estrita das equações GLSL e dos 4 projetos canônicos (`evo-money`, `plant-tag`, `swisshaus`, `betahaus`).
2. Inspecionar `scripts/serve-marcionilio-site.cjs`:
   - Por que a rota `/` atualmente não serve deterministicamente `clientes/marcionilio-oliveira/site/index.html`?
   - O que precisa ser corrigido no servidor local para garantir preview 1:1 na porta 3000 (ou fallback)?
3. Inspecionar o pipeline de compilação:
   - `package.json` scripts (`build:workstage`), `vite.bundle.config.mjs`, e o destino `clientes/marcionilio-oliveira/site/assets/_astro/workStage.bundle.js`.
   - Verificar se há quaisquer discrepâncias entre código fonte e bundle compilado.

Escreva seu relatório completo em `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_phase0_2\report.md` e crie seu `handoff.md`. Ao terminar, envie uma mensagem concisa ao orquestrador com seu status.
