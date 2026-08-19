/**
 * Executa auto-scroll progressivo na página do Playwright para disparar
 * ScrollTrigger, animações CSS, lazy-loading de imagens e scripts deferidos.
 */
async function autoScroll(page, options = {}) {
  const step = options.step || 300;
  const delay = options.delay || 100;
  const maxScroll = options.maxScroll || 15000;

  await page.evaluate(async ({ step, delay, maxScroll }) => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        totalHeight += step;
        if (totalHeight >= document.body.scrollHeight || totalHeight >= maxScroll) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, delay);
    });
  }, { step, delay, maxScroll });
}

module.exports = {
  autoScroll
};
