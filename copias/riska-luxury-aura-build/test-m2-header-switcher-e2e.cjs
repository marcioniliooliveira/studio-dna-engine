const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8092;
const BASE_DIR = __dirname;

function createServer() {
  return http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/site/index.html';
    const filePath = path.join(BASE_DIR, reqPath);
    
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
      let contentType = 'text/plain';
      if (filePath.endsWith('.html')) contentType = 'text/html';
      else if (filePath.endsWith('.css')) contentType = 'text/css';
      else if (filePath.endsWith('.js') || filePath.endsWith('.cjs')) contentType = 'application/javascript';
      else if (filePath.endsWith('.json')) contentType = 'application/json';
      else if (filePath.endsWith('.png')) contentType = 'image/png';
      else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) contentType = 'image/jpeg';
      else if (filePath.endsWith('.webp')) contentType = 'image/webp';
      else if (filePath.endsWith('.mp4')) contentType = 'video/mp4';
      else if (filePath.endsWith('.svg')) contentType = 'image/svg+xml';
      
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });
}

function assert(condition, message) {
  if (!condition) {
    console.error(`  [FAIL] ${message}`);
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  [PASS] ${message}`);
}

async function runM2Tests() {
  console.log('=== Milestone 2: Header Auto-Hide & Switcher Elevation Test Suite ===\n');
  const server = createServer();
  await new Promise(resolve => server.listen(PORT, resolve));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  try {
    await page.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000); // Allow preloader dismissal or dismiss it

    // Dismiss preloader if active
    await page.evaluate(() => {
      const p = document.getElementById('sitePreloader');
      if (p && !p.classList.contains('is-dismissed')) {
        p.click();
      }
    });
    await page.waitForTimeout(600);

    console.log('--- Checkpoint 1: Initial State at Page Top ---');
    const headerInitial = await page.evaluate(() => {
      const h = document.getElementById('siteHeader');
      const style = window.getComputedStyle(h);
      return {
        exists: !!h,
        hiddenClass: h.classList.contains('header--hidden'),
        opacity: style.opacity,
        pointerEvents: style.pointerEvents,
        transform: style.transform
      };
    });
    assert(headerInitial.exists, 'Site header exists in document');
    assert(!headerInitial.hiddenClass, 'Site header does not have header--hidden class at page top');
    assert(headerInitial.opacity === '1', `Site header opacity is 1 at page top (got: ${headerInitial.opacity})`);
    assert(headerInitial.pointerEvents === 'auto', `Site header pointer-events is auto at page top (got: ${headerInitial.pointerEvents})`);

    console.log('\n--- Checkpoint 2: Header Remains Visible at #productStory ---');
    await page.evaluate(() => {
      document.getElementById('productStory').scrollIntoView({ block: 'start' });
      if (window.__checkPDP) window.__checkPDP();
    });
    await page.waitForTimeout(500);

    const headerAtStory = await page.evaluate(() => {
      const h = document.getElementById('siteHeader');
      const style = window.getComputedStyle(h);
      return {
        hiddenClass: h.classList.contains('header--hidden'),
        opacity: parseFloat(style.opacity),
        pointerEvents: style.pointerEvents
      };
    });
    assert(!headerAtStory.hiddenClass, 'Site header does not have header--hidden at #productStory');
    assert(headerAtStory.opacity > 0.8, `Site header is visible at #productStory (opacity: ${headerAtStory.opacity})`);

    console.log('\n--- Checkpoint 3: Inside #atelierPDP - Header Hidden & Switcher Promoted ---');
    await page.evaluate(() => {
      document.getElementById('atelierPDP').scrollIntoView({ block: 'start' });
      if (window.__checkPDP) window.__checkPDP();
    });
    await page.waitForTimeout(900); // Allow luxury transition (0.65s) to complete

    const pdpState = await page.evaluate(() => {
      const h = document.getElementById('siteHeader');
      const s = document.querySelector('.piece-switcher');
      const sStyle = window.getComputedStyle(s);
      const hStyle = window.getComputedStyle(h);
      const sRect = s.getBoundingClientRect();
      const hRect = h.getBoundingClientRect();
      return {
        headerHidden: h.classList.contains('header--hidden'),
        headerOpacity: parseFloat(hStyle.opacity),
        headerPointerEvents: hStyle.pointerEvents,
        headerBottom: hRect.bottom,
        headerTransform: hStyle.transform,
        switcherTop: sStyle.top,
        switcherZ: sStyle.zIndex,
        switcherRectTop: Math.round(sRect.top),
        switcherHasTop0: s.classList.contains('top-0'),
        switcherHasZ50: s.classList.contains('z-50')
      };
    });

    assert(pdpState.headerHidden, 'Site header has header--hidden class while inside #atelierPDP');
    assert(pdpState.headerOpacity === 0, `Site header opacity is 0 inside #atelierPDP (got: ${pdpState.headerOpacity})`);
    assert(pdpState.headerPointerEvents === 'none', `Site header pointer-events are disabled inside #atelierPDP (got: ${pdpState.headerPointerEvents})`);
    assert(pdpState.headerBottom <= 0, `Site header is completely off-screen above viewport (bottom: ${pdpState.headerBottom}px)`);
    assert(pdpState.switcherTop === '0px' || pdpState.switcherHasTop0, `Piece switcher has top: 0px (got: ${pdpState.switcherTop})`);
    assert(pdpState.switcherZ === '50' || pdpState.switcherHasZ50, `Piece switcher has z-index: 50 (got: ${pdpState.switcherZ})`);
    assert(pdpState.switcherRectTop === 0, `Piece switcher sits cleanly at viewport top (got: ${pdpState.switcherRectTop}px)`);
    assert(pdpState.switcherHasTop0, 'Piece switcher markup contains top-0 class');
    assert(pdpState.switcherHasZ50, 'Piece switcher markup contains z-50 class');

    console.log('\n--- Checkpoint 4: Past #atelierPDP at Footer - Header Re-appears ---');
    await page.evaluate(() => {
      document.querySelector('footer').scrollIntoView({ block: 'start' });
      if (window.__checkPDP) window.__checkPDP();
    });
    await page.waitForTimeout(900); // Allow luxury transition to complete

    const footerState = await page.evaluate(() => {
      const h = document.getElementById('siteHeader');
      const hStyle = window.getComputedStyle(h);
      const hRect = h.getBoundingClientRect();
      return {
        headerHidden: h.classList.contains('header--hidden'),
        headerOpacity: parseFloat(hStyle.opacity),
        headerPointerEvents: hStyle.pointerEvents,
        headerTop: hRect.top
      };
    });

    assert(!footerState.headerHidden, 'Site header class header--hidden removed when scrolling past #atelierPDP to footer');
    assert(footerState.headerOpacity === 1, `Site header opacity restored to 1 at footer (got: ${footerState.headerOpacity})`);
    assert(footerState.headerPointerEvents === 'auto', `Site header pointer-events restored to auto at footer (got: ${footerState.headerPointerEvents})`);
    assert(footerState.headerTop === 0, `Site header is positioned at top: 0 at footer (got: ${footerState.headerTop})`);

    console.log('\n--- Checkpoint 5: Reverse Scroll Back UP into #atelierPDP - Header Re-hides ---');
    await page.evaluate(() => {
      document.getElementById('atelierPDP').scrollIntoView({ block: 'center' });
      if (window.__checkPDP) window.__checkPDP();
    });
    await page.waitForTimeout(900);

    const reEntryState = await page.evaluate(() => {
      const h = document.getElementById('siteHeader');
      const hStyle = window.getComputedStyle(h);
      const hRect = h.getBoundingClientRect();
      return {
        headerHidden: h.classList.contains('header--hidden'),
        headerOpacity: parseFloat(hStyle.opacity),
        headerPointerEvents: hStyle.pointerEvents,
        headerBottom: hRect.bottom
      };
    });

    assert(reEntryState.headerHidden, 'Site header hides again when scrolling back up into #atelierPDP');
    assert(reEntryState.headerOpacity === 0, `Site header opacity is 0 on reverse scroll into #atelierPDP (got: ${reEntryState.headerOpacity})`);
    assert(reEntryState.headerPointerEvents === 'none', 'Site header pointer-events are disabled on reverse scroll into #atelierPDP');
    assert(reEntryState.headerBottom <= 0, `Site header is off-screen on reverse scroll into #atelierPDP (bottom: ${reEntryState.headerBottom}px)`);

    console.log('\n--- Checkpoint 6: Reverse Scroll Back UP into #productStory - Header Re-appears ---');
    await page.evaluate(() => {
      document.getElementById('productStory').scrollIntoView({ block: 'start' });
      if (window.__checkPDP) window.__checkPDP();
    });
    await page.waitForTimeout(900);

    const storyReturnState = await page.evaluate(() => {
      const h = document.getElementById('siteHeader');
      const hStyle = window.getComputedStyle(h);
      return {
        headerHidden: h.classList.contains('header--hidden'),
        headerOpacity: parseFloat(hStyle.opacity),
        headerPointerEvents: hStyle.pointerEvents
      };
    });

    assert(!storyReturnState.headerHidden, 'Site header class header--hidden removed when returning to #productStory');
    assert(storyReturnState.headerOpacity === 1, `Site header opacity restored to 1 at #productStory (got: ${storyReturnState.headerOpacity})`);
    assert(storyReturnState.headerPointerEvents === 'auto', 'Site header pointer-events restored at #productStory');

    console.log('\n--- Checkpoint 7: prefers-reduced-motion Accommodation ---');
    const rmContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce'
    });
    const rmPage = await rmContext.newPage();
    await rmPage.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
    await rmPage.waitForTimeout(500);

    const rmHeaderTransition = await rmPage.evaluate(() => {
      const h = document.getElementById('siteHeader');
      return window.getComputedStyle(h).transition;
    });
    assert(rmHeaderTransition.includes('none'), `Header transition is 'none' under prefers-reduced-motion: reduce (got: ${rmHeaderTransition})`);
    await rmContext.close();

    console.log('\n--- Checkpoint 8: Mobile Viewport (< 768px) Compatibility ---');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(600);

    // Dismiss preloader if active on mobile
    await mobilePage.evaluate(() => {
      const p = document.getElementById('sitePreloader');
      if (p && !p.classList.contains('is-dismissed')) {
        p.click();
      }
    });
    await mobilePage.waitForTimeout(600);

    // Check inside atelierPDP on mobile
    await mobilePage.evaluate(() => {
      document.getElementById('atelierPDP').scrollIntoView({ block: 'start' });
      if (window.__checkPDP) window.__checkPDP();
    });
    await mobilePage.waitForTimeout(900);

    const mobilePdpState = await mobilePage.evaluate(() => {
      const h = document.getElementById('siteHeader');
      const s = document.querySelector('.piece-switcher');
      const sStyle = window.getComputedStyle(s);
      const hStyle = window.getComputedStyle(h);
      return {
        headerHidden: h.classList.contains('header--hidden'),
        headerOpacity: parseFloat(hStyle.opacity),
        switcherTop: sStyle.top,
        switcherZ: sStyle.zIndex
      };
    });

    assert(mobilePdpState.headerHidden, 'Site header is hidden on mobile inside #atelierPDP');
    assert(mobilePdpState.headerOpacity === 0, `Site header opacity is 0 on mobile inside #atelierPDP (got: ${mobilePdpState.headerOpacity})`);
    assert(mobilePdpState.switcherTop === '0px', `Piece switcher top is 0px on mobile (got: ${mobilePdpState.switcherTop})`);
    assert(mobilePdpState.switcherZ === '50', `Piece switcher zIndex is 50 on mobile (got: ${mobilePdpState.switcherZ})`);

    // Active sticky scroll verification on mobile (Milestone 2 Iteration 2)
    await mobilePage.evaluate(() => {
      window.scrollBy(0, 200);
      if (window.__checkPDP) window.__checkPDP();
    });
    await mobilePage.waitForTimeout(400);

    const mobileStickyActive = await mobilePage.evaluate(() => {
      const s = document.querySelector('.piece-switcher');
      const rect = s.getBoundingClientRect();
      return Math.round(rect.top);
    });
    assert(mobileStickyActive === 0, `Piece switcher stays actively sticky at top: 0px during scroll on mobile (got: ${mobileStickyActive}px)`);

    await mobileContext.close();

    console.log('\n--- Checkpoint 9: Console Error Verification ---');
    assert(consoleErrors.length === 0, `Zero console errors during entire test lifecycle (found: ${consoleErrors.length} errors)`);

    console.log('\n=======================================');
    console.log('ALL MILESTONE 2 VERIFICATION CHECKS PASSED!');
    console.log('=======================================');
  } finally {
    await browser.close();
    server.close();
  }
}

runM2Tests().catch(err => {
  console.error('\nM2 Test suite failed:', err);
  process.exit(1);
});
