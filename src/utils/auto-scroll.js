/**
 * Executa auto-scroll progressivo na página do Playwright para disparar
 * ScrollTrigger, animações CSS, lazy-loading de imagens e scripts deferidos.
 */
async function autoScroll(page, options = {}) {
  const step = options.step || 300;
  const delay = options.delay || 100;
  const maxScroll = options.maxScroll || 15000;
  const timeoutMs = options.timeoutMs || 15000;

  try {
    await Promise.race([
      page.evaluate(async ({ step, delay, maxScroll }) => {
        await new Promise((resolve) => {
          let totalHeight = 0;
          let timer = null;
          const safetyTimer = setTimeout(() => {
            if (timer) clearInterval(timer);
            try { window.scrollTo(0, 0); } catch (_) {}
            resolve();
          }, 12000);

          timer = setInterval(() => {
            try {
              if (typeof window.scrollBy === 'function') {
                window.scrollBy(0, step);
              }
              totalHeight += step;
              const scrollH = document.body ? document.body.scrollHeight : 0;
              if (totalHeight >= scrollH || totalHeight >= maxScroll) {
                clearTimeout(safetyTimer);
                clearInterval(timer);
                if (typeof window.scrollTo === 'function') {
                  window.scrollTo(0, 0);
                }
                resolve();
              }
            } catch (err) {
              clearTimeout(safetyTimer);
              clearInterval(timer);
              resolve();
            }
          }, delay);
        });
      }, { step, delay, maxScroll }),
      new Promise((resolve) => setTimeout(resolve, timeoutMs))
    ]);
  } catch (err) {
    // Failsafe: never block pipeline on auto-scroll failure
  }
}

module.exports = {
  autoScroll
};
