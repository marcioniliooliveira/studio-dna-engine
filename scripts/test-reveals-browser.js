const { chromium } = require('playwright');

async function testPage(name, url) {
  console.log(`\n======================================================`);
  console.log(`🚀 TESTANDO NO NAVEGADOR: ${name}`);
  console.log(`   URL: ${url}`);
  console.log(`======================================================`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  const consoleWarns = [];
  const consoleLogs = [];
  const failedRequests = [];

  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') consoleErrors.push(text);
    else if (msg.type() === 'warning') consoleWarns.push(text);
    else consoleLogs.push(text);
  });

  page.on('pageerror', err => {
    consoleErrors.push(`[PAGEERROR] ${err.message}\nStack: ${err.stack}`);
  });

  page.on('requestfailed', req => {
    failedRequests.push(`${req.method()} ${req.url()} - ${req.failure()?.errorText}`);
  });

  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    console.log(`HTTP Status: ${response?.status()}`);

    // Aguarda um momento para scripts executarem
    await page.waitForTimeout(2000);

    // Avalia o estado no DOM
    const evalData = await page.evaluate(() => {
      const scribbles = Array.from(document.querySelectorAll('[data-scribble]')).map(el => ({
        type: el.getAttribute('data-scribble'),
        hasVisibleClass: el.classList.contains('scribble-visible'),
        text: el.innerText.trim().slice(0, 30)
      }));

      const dynamicPhotos = {
        section: !!document.querySelector('.dynamic_section'),
        center: !!document.querySelector('.photo--center'),
        photosCount: document.querySelectorAll('.dynamic_section [class*="photo--"]').length,
        centerTransform: document.querySelector('.photo--center')?.style.transform || '',
        centerScale: document.querySelector('.photo--center')?.style.scale || ''
      };

      const apartments = {
        section: !!document.querySelector('.apartments'),
        cardsCount: document.querySelectorAll('.apart_card').length,
        trackTransform: document.querySelector('.apart_cards_track')?.style.transform || ''
      };

      const gsapLoaded = typeof window.gsap !== 'undefined';
      const scrollTriggerLoaded = typeof window.ScrollTrigger !== 'undefined';
      const lenisLoaded = typeof window.lenis !== 'undefined' || typeof window.Lenis !== 'undefined';
      const splitTextLoaded = typeof window.SplitText !== 'undefined';

      return {
        title: document.title,
        gsapLoaded,
        scrollTriggerLoaded,
        lenisLoaded,
        splitTextLoaded,
        scribblesTotal: scribbles.length,
        scribblesVisible: scribbles.filter(s => s.hasVisibleClass).length,
        dynamicPhotos,
        apartments
      };
    });

    console.log(`\n📊 Estado dos Subsistemas:`);
    console.log(`   - GSAP: ${evalData.gsapLoaded}`);
    console.log(`   - ScrollTrigger: ${evalData.scrollTriggerLoaded}`);
    console.log(`   - Lenis: ${evalData.lenisLoaded}`);
    console.log(`   - SplitText: ${evalData.splitTextLoaded}`);
    console.log(`   - Scribbles Total: ${evalData.scribblesTotal} | Visíveis pós-scroll: ${evalData.scribblesVisible}`);
    console.log(`   - Dynamic Photos Section: ${evalData.dynamicPhotos.section} (Fotos: ${evalData.dynamicPhotos.photosCount})`);
    console.log(`   - Apartments Section: ${evalData.apartments.section} (Cards: ${evalData.apartments.cardsCount})`);

    // Simula Scroll para disparar IntersectionObservers e ScrollTriggers
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, 3500));
    await page.waitForTimeout(1000);

    const postScrollScribbles = await page.evaluate(() => {
      const visible = document.querySelectorAll('[data-scribble].scribble-visible').length;
      return visible;
    });
    console.log(`   - Scribbles visíveis após rolagem: ${postScrollScribbles}/${evalData.scribblesTotal}`);

    console.log(`\n❌ Console Errors (${consoleErrors.length}):`);
    consoleErrors.slice(0, 10).forEach(e => console.log(`   🔴 ${e}`));

    console.log(`\n⚠️ Failed Network Requests (${failedRequests.length}):`);
    failedRequests.slice(0, 10).forEach(r => console.log(`   🟡 ${r}`));

  } catch (err) {
    console.error(`Erro ao testar ${name}:`, err.message);
  } finally {
    await browser.close();
  }
}

async function run() {
  await testPage('21Oaks', 'http://localhost:4000/copias/21oaks-org/site/index.html');
  await testPage('AIR Center', 'http://localhost:4000/copias/aircenter-space/site/index.html');
}

run();
