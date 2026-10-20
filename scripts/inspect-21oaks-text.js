const { chromium } = require('playwright');

async function inspect() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4000/copias/21oaks-org/site/index.html', { waitUntil: 'networkidle' });

  const res = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, .middle, [class*="heading"], .apartments, .dynamic_section')).map(h => {
      const cs = window.getComputedStyle(h);
      return {
        tag: h.tagName,
        className: h.className,
        text: (h.innerText || '').trim().slice(0, 40),
        opacity: cs.opacity,
        visibility: cs.visibility,
        color: cs.color,
        display: cs.display,
        zIndex: cs.zIndex,
        position: cs.position,
        offsetTop: h.offsetTop,
        parent: h.parentElement ? h.parentElement.className : 'null'
      };
    });
    return headings;
  });

  console.log(JSON.stringify(res, null, 2));
  await browser.close();
}

inspect();
