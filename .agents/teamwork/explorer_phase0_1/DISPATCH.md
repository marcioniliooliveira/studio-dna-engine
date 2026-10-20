## 2026-10-17T15:23:04Z
Você é explorer_phase0_1, um explorador técnico especializado em arquitetura de scroll, GSAP e Lenis.
Seu diretório exclusivo de trabalho é:
c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_phase0_1

Você DEVE ler o arquivo autoritativo de requisitos:
c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md
(com atenção especial à seção ## 2026-10-17T15:18:48Z, requisitos R1 e WP-1, e Hard Guardrails 1 e 2).

Sua missão de investigação técnica:
1. Localizar e inspecionar a fundo `clientes/marcionilio-oliveira/site/assets/_astro/initHorizontalScroll.LNLCK81L.js` (e quaisquer fontes ou scripts relacionados à timeline de scroll horizontal).
2. Mapear minuciosamente a configuração atual do GSAP ScrollTrigger e a integração com Lenis:
   - Como a rolagem horizontal da página está estruturada (track, container, pin, scrub).
   - Como o progresso do portal 3D (`portalProgress`) é calculado atualmente (ex: rampa unilateral `Math.min(1, Math.max(0, (cur - p) / M))`).
   - Como `data-lenis-prevent="true"` está sendo manipulado, por que ocorre o deadlock de re-armamento cego a cada tick de `onUpdate`, e por que o usuário fica preso sem conseguir rolar para frente nem para trás.
3. Projetar a solução para a Abordagem C (Ciclo de Vida Contínuo em 4 Fases):
   - Fase 1 (Entrada Óptica): 0 -> 1.
   - Fase 2 (Navegação Interativa 3D): retenção com a trilha horizontal fixada enquanto wheel/touch navegam a fita.
   - Fase 3 (Saída Cinematográfica Suave): transição do `#jesper-work-stage-viewport` (fade/slide/clip-path) devolvendo a visibilidade às seções subsequentes.
   - Fase 4 (Continuidade da Página): retomada fluida do percurso linear do trilho horizontal para Chapter III, IV e rodapé.
4. Definir a máquina de estados para eliminação do deadlock de Lenis prevent (quando ligar e quando desligar definitivamente `data-lenis-prevent`).
5. Analisar o bloco mobile (`max-width: 767px`) para sincronização da mesma transição de entrada e saída no scroll vertical nativo, sem aprisionamento de gestos touch.
6. Apresentar propostas de código detalhadas, fórmulas matemáticas exatas e mapeamento de dependências.

Escreva seu relatório completo em `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_phase0_1\report.md` e crie seu `handoff.md`. Ao terminar, envie uma mensagem concisa ao orquestrador com seu status.
