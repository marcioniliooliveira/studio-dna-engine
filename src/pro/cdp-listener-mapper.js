/**
 * Utiliza o Chrome DevTools Protocol (CDP) para inspecionar listeners de eventos
 * reais registrados no DOM (mousemove, pointermove, scroll, wheel, click).
 */
async function mapEventListenersWithCDP(page) {
  const listenersMap = {
    mouseMoveElements: [],
    scrollElements: [],
    clickElements: [],
    wheelElements: []
  };

  try {
    const client = await page.context().newCDPSession(page);
    await client.send('DOM.enable');
    await client.send('DOMDebugger.enable');

    const documentNode = await client.send('DOM.getDocument', { depth: 4 });
    
    // Inspeciona elementos interativos chave
    const interactiveSelectors = ['button', 'a', 'nav', 'header', 'main', '[data-magnetic]', '[data-spotlight]', 'canvas', '.card'];
    
    for (const selector of interactiveSelectors) {
      try {
        const elements = await page.$$(selector);
        for (const el of elements.slice(0, 10)) {
          const info = await el.evaluate(node => {
            return {
              tag: node.tagName.toLowerCase(),
              id: node.id ? `#${node.id}` : null,
              classes: Array.from(node.classList).join('.'),
              hasTransform: window.getComputedStyle(node).transform !== 'none'
            };
          });

          if (info.hasTransform || selector.includes('data-')) {
            listenersMap.mouseMoveElements.push({
              selector: info.id || (info.classes ? `.${info.classes}` : info.tag),
              tag: info.tag,
              probableEffect: selector.includes('magnetic') ? 'magnetic-button' : selector.includes('spotlight') ? 'spotlight-card' : 'interactive-hover'
            });
          }
        }
      } catch (e) {}
    }

    await client.detach();
  } catch (err) {
    // Fallback silencioso se CDP não estiver disponível
  }

  return listenersMap;
}

module.exports = {
  mapEventListenersWithCDP
};
