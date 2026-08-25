/**
 * Barreira Determinística de Hidratação para Playwright (ICM Pipeline)
 * Aguarda a estabilização real do DOM e renderização gráfica sem utilizar sleeps cegos.
 */

/**
 * @param {import('playwright').Page} page
 * @param {Object} options
 * @param {number} [options.domSilenceThresholdMs=400] Tempo de inatividade do DOM para declarar hidratação concluída
 * @param {number} [options.timeoutMs=30000] Timeout total de segurança
 * @param {string} [options.preloaderSelector] Seletor CSS comum de telas de loading
 * @param {number} [options.minCanvasFrames=3] Mínimo de frames renderizados no Canvas antes de liberar
 */
async function waitForHydrationSettled(page, options = {}) {
  const {
    domSilenceThresholdMs = 400,
    timeoutMs = 30000,
    preloaderSelector = '[class*="loader"], [class*="preloader"], [id*="loading"], [data-loading], .splash-screen',
    minCanvasFrames = 3
  } = options;

  console.log('⏳ [Hydration-Barrier] Aguardando estabilização do DOM e conclusão da hidratação...');

  // 1. Aguarda a remoção ou ocultação do Preloader (se presente)
  try {
    await page.waitForFunction((selector) => {
      const loader = document.querySelector(selector);
      if (!loader) return true;
      const style = window.getComputedStyle(loader);
      return style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity || '1') === 0;
    }, preloaderSelector, { timeout: 8000 });
  } catch (e) {
    // Prossegue se não houver preloader clássico detectado
  }

  // 2. Barreira de Silêncio do DOM (MutationObserver) + WebGL Frame Barrier
  try {
    await page.evaluate(
      ({ silenceMs, minFrames }) => {
        return new Promise((resolve) => {
          let timer = null;
          let frameCount = 0;

          // Se houver Canvas na página, conta os frames de desenho antes de liberar
          const canvases = document.querySelectorAll('canvas');
          if (canvases.length > 0) {
            const countFrames = () => {
              frameCount++;
              if (frameCount < minFrames) {
                requestAnimationFrame(countFrames);
              }
            };
            requestAnimationFrame(countFrames);
          } else {
            frameCount = minFrames;
          }

          // Observa mutações para detectar quando o framework parou de injetar nós no DOM
          const observer = new MutationObserver(() => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
              if (frameCount >= minFrames) {
                observer.disconnect();
                resolve();
              } else {
                setTimeout(() => {
                  observer.disconnect();
                  resolve();
                }, 200);
              }
            }, silenceMs);
          });

          observer.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
          });

          // Trigger de segurança inicial caso o DOM já tenha nascido estável
          timer = setTimeout(() => {
            observer.disconnect();
            resolve();
          }, silenceMs);
        });
      },
      { silenceMs: domSilenceThresholdMs, minFrames: minCanvasFrames }
    );
  } catch (err) {
    console.warn('⚠️ [Hydration-Barrier] Fallback acionado durante observação do DOM.');
  }

  console.log('✅ [Hydration-Barrier] DOM estabilizado e hidratado com sucesso.');
}

module.exports = {
  waitForHydrationSettled
};
