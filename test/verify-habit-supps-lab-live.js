const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleLogs = [];
  const pageErrors = [];
  page.on('console', msg => consoleLogs.push(msg.text()));
  page.on('pageerror', err => pageErrors.push(err.message));

  console.log('Navigating to Habit Supps Lab on local dev server (port 4002)...');
  await page.goto('http://127.0.0.1:4002/clientes/habit-supps-lab/site/index.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // 1. Invariant 2 Check: Header height and logo
  const headerMetrics = await page.evaluate(() => {
    const header = document.querySelector('.site-header');
    const logo = document.querySelector('.header-logo');
    return {
      height: header?.offsetHeight,
      logoNaturalWidth: logo?.naturalWidth,
      logoNaturalHeight: logo?.naturalHeight,
      logoSrc: logo?.src
    };
  });
  console.log('Header Metrics:', headerMetrics);

  // 2. Invariant 3 Check: Mascot Sticker Bounding Box
  const stickerMetrics = await page.evaluate(() => {
    const wrap = document.querySelector('.hero-sticker-wrap');
    const img = document.querySelector('.hero-sticker-img');
    return {
      wrapWidth: wrap?.offsetWidth,
      wrapHeight: wrap?.offsetHeight,
      imgSrc: img?.src
    };
  });
  console.log('Mascot Sticker Metrics:', stickerMetrics);

  // 3. Invariant 1 Check: Sticky Stage 58% Safe-Zone and Narrative Phases
  const stageMetrics = await page.evaluate(() => {
    const mediaSlot = document.querySelector('.sequence-media-slot');
    const video = document.getElementById('stage-hero-video');
    return {
      slotHeight: mediaSlot?.offsetHeight,
      viewportHeight: window.innerHeight,
      ratio: (mediaSlot?.offsetHeight / window.innerHeight).toFixed(2),
      videoReadyState: video?.readyState,
      videoSrc: video?.querySelector('source')?.src
    };
  });
  console.log('Stage Metrics:', stageMetrics);

  // Scroll through narrative phase 1, 2, 3, 4
  console.log('Testing scroll scrubbing through narrative phases...');
  await page.evaluate(() => window.scrollTo({ top: 600, behavior: 'instant' }));
  await page.waitForTimeout(500);
  const phase1 = await page.evaluate(() => document.getElementById('narrative-title')?.textContent);

  await page.evaluate(() => window.scrollTo({ top: 1400, behavior: 'instant' }));
  await page.waitForTimeout(500);
  const phase2 = await page.evaluate(() => document.getElementById('narrative-title')?.textContent);

  await page.evaluate(() => window.scrollTo({ top: 2200, behavior: 'instant' }));
  await page.waitForTimeout(500);
  const phase3 = await page.evaluate(() => document.getElementById('narrative-title')?.textContent);

  console.log('Narrative Titles observed during scroll:', { phase1, phase2, phase3 });

  // 4. Invariant 4 Check: Bento Grid Cards
  const bentoMetrics = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('.bento-card'));
    return cards.map(c => ({
      height: c.offsetHeight,
      title: c.querySelector('.bento-card-title')?.textContent
    }));
  });
  console.log('Bento Cards Metrics (all >= 280px):', bentoMetrics);

  // 5. Accordion Interactivity Check
  console.log('Testing Clinical Accordion toggle...');
  await page.evaluate(() => {
    const items = document.querySelectorAll('.accordion-item');
    if (items[1]) {
      items[1].querySelector('.accordion-trigger').click();
    }
  });
  await page.waitForTimeout(400);
  const accordionOpen = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.accordion-item')).map(i => i.classList.contains('is-open'));
  });
  console.log('Accordion items open states:', accordionOpen);

  // 6. Check Universal HUD Presence
  const hudInfo = await page.evaluate(() => {
    const hud = document.querySelector('studio-dna-hud');
    return {
      exists: !!hud,
      hasShadowRoot: !!hud?.shadowRoot
    };
  });
  console.log('Studio DNA HUD attached with Shadow DOM:', hudInfo);

  // 7. Capture Hero & Stage Screenshot
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.waitForTimeout(1000);
  const heroScreenshot = path.resolve('scratch/screenshot-habit-supps-hero.png');
  await page.screenshot({ path: heroScreenshot, fullPage: false });

  // 8. Capture Stage & Bento Screenshot
  await page.evaluate(() => {
    const sec = document.getElementById('formula');
    if (sec) sec.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  const stageScreenshot = path.resolve('scratch/screenshot-habit-supps-stage.png');
  await page.screenshot({ path: stageScreenshot, fullPage: false });

  // 9. Capture Bento & Reviews Screenshot
  await page.evaluate(() => {
    const sec = document.getElementById('ingredients');
    if (sec) sec.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1000);
  const bentoScreenshot = path.resolve('scratch/screenshot-habit-supps-bento.png');
  await page.screenshot({ path: bentoScreenshot, fullPage: false });

  // Copy evidence to artifacts
  const artifactHero = path.resolve('C:/Users/USER/.gemini/antigravity-ide/brain/c2f44784-b29e-4cdc-8cd3-b7d0f892500c/screenshot-habit-supps-hero.png');
  const artifactStage = path.resolve('C:/Users/USER/.gemini/antigravity-ide/brain/c2f44784-b29e-4cdc-8cd3-b7d0f892500c/screenshot-habit-supps-stage.png');
  const artifactBento = path.resolve('C:/Users/USER/.gemini/antigravity-ide/brain/c2f44784-b29e-4cdc-8cd3-b7d0f892500c/screenshot-habit-supps-bento.png');

  fs.copyFileSync(heroScreenshot, artifactHero);
  fs.copyFileSync(stageScreenshot, artifactStage);
  fs.copyFileSync(bentoScreenshot, artifactBento);

  console.log('Screenshots saved to artifacts:');
  console.log('- Hero:', artifactHero);
  console.log('- Stage:', artifactStage);
  console.log('- Bento:', artifactBento);
  console.log('Page Errors encountered:', pageErrors);

  await browser.close();
  console.log('E2E Verification script finished!');
})();
