const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

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

let passCount = 0;
let failCount = 0;
const failures = [];

function assert(condition, message) {
  if (!condition) {
    console.error(`  [FAIL] ${message}`);
    failCount++;
    failures.push(message);
    return false;
  }
  console.log(`  [PASS] ${message}`);
  passCount++;
  return true;
}

async function runAdversarialStressTests() {
  console.log('======================================================================');
  console.log('  CHALLENGER 2: ADVERSARIAL STRESS HARNESS — MILESTONE 2 (R2)        ');
  console.log('======================================================================\n');

  const server = createServer();
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  console.log(`Ephemeral test server active on http://127.0.0.1:${port}\n`);

  const browser = await chromium.launch({ headless: true });

  try {
    // -------------------------------------------------------------------------
    // TEST SUITE 1: 10-VIEWPORT COMPREHENSIVE MATRIX
    // -------------------------------------------------------------------------
    console.log('>>> TEST SUITE 1: 10-Viewport Matrix Stress-Test (Mobile, Tablet, Desktop) <<<');
    const viewports = [
      { name: 'Desktop Ultra-Wide (1920x1080)', width: 1920, height: 1080, isMobile: false },
      { name: 'Desktop Standard (1440x900)', width: 1440, height: 900, isMobile: false },
      { name: 'Desktop Compact (1280x720)', width: 1280, height: 720, isMobile: false },
      { name: 'Tablet Pro Portrait (1024x1366)', width: 1024, height: 1366, isMobile: false },
      { name: 'Tablet Air Landscape (1180x820)', width: 1180, height: 820, isMobile: false },
      { name: 'Tablet Mini Portrait (768x1024)', width: 768, height: 1024, isMobile: false },
      { name: 'Mobile Large / Pixel (412x915)', width: 412, height: 915, isMobile: true },
      { name: 'Mobile Standard / iPhone 14 (390x844)', width: 390, height: 844, isMobile: true },
      { name: 'Mobile Small / iPhone SE (375x667)', width: 375, height: 667, isMobile: true },
      { name: 'Mobile Ultra-Narrow (320x568)', width: 320, height: 568, isMobile: true },
    ];

    for (const vp of viewports) {
      console.log(`\n--- Testing Viewport: ${vp.name} ---`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile
      });
      const page = await context.newPage();

      const pageErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') pageErrors.push(msg.text());
      });

      await page.goto(`http://127.0.0.1:${port}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600);

      // Dismiss preloader
      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p && !p.classList.contains('is-dismissed')) p.click();
      });
      await page.waitForTimeout(400);

      // 1. Check Page Top
      const topState = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = window.getComputedStyle(h);
        const rect = h.getBoundingClientRect();
        return {
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(s.opacity),
          pointerEvents: s.pointerEvents,
          rectTop: Math.round(rect.top),
          rectBottom: Math.round(rect.bottom)
        };
      });
      assert(!topState.hidden, `[${vp.name}] Header does NOT have header--hidden at page top`);
      assert(topState.opacity === 1, `[${vp.name}] Header opacity is 1 at page top (got: ${topState.opacity})`);
      assert(topState.pointerEvents === 'auto', `[${vp.name}] Header pointer-events is auto at page top`);
      assert(topState.rectTop === 0, `[${vp.name}] Header rect.top is 0 at page top`);

      // 2. Check at #productStory
      await page.evaluate(() => {
        document.getElementById('productStory').scrollIntoView({ block: 'start' });
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(400);
      const storyState = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = window.getComputedStyle(h);
        return {
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(s.opacity),
          pointerEvents: s.pointerEvents
        };
      });
      assert(!storyState.hidden, `[${vp.name}] Header does NOT have header--hidden at #productStory`);
      assert(storyState.opacity >= 0.9, `[${vp.name}] Header is visible at #productStory (opacity: ${storyState.opacity})`);

      // 3. Check Inside #atelierPDP (Entry Boundary)
      await page.evaluate(() => {
        document.getElementById('atelierPDP').scrollIntoView({ block: 'start' });
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(800); // Allow 0.65s transition
      const pdpState = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = document.querySelector('.piece-switcher');
        const hStyle = window.getComputedStyle(h);
        const sStyle = window.getComputedStyle(s);
        const hRect = h.getBoundingClientRect();
        const sRect = s.getBoundingClientRect();
        return {
          headerHidden: h.classList.contains('header--hidden'),
          headerOpacity: parseFloat(hStyle.opacity),
          headerPointerEvents: hStyle.pointerEvents,
          headerBottom: Math.round(hRect.bottom),
          switcherTop: sStyle.top,
          switcherZ: sStyle.zIndex,
          switcherRectTop: Math.round(sRect.top)
        };
      });
      assert(pdpState.headerHidden, `[${vp.name}] Header has header--hidden class inside #atelierPDP`);
      assert(pdpState.headerOpacity === 0, `[${vp.name}] Header opacity is 0 inside #atelierPDP`);
      assert(pdpState.headerPointerEvents === 'none', `[${vp.name}] Header pointer-events is none inside #atelierPDP`);
      assert(pdpState.headerBottom <= 0, `[${vp.name}] Header is off-screen above viewport (bottom: ${pdpState.headerBottom}px)`);
      assert(pdpState.switcherTop === '0px', `[${vp.name}] Switcher has CSS rule top: 0px (got: ${pdpState.switcherTop})`);
      assert(pdpState.switcherZ === '50', `[${vp.name}] Switcher has computed z-index: 50 (got: ${pdpState.switcherZ})`);

      // 3b. ACTIVE SCROLL TEST: Scroll down 200px further into atelierPDP and verify switcher sticks to top: 0
      await page.evaluate(() => {
        window.scrollBy(0, 200);
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(300);
      const activeStickyState = await page.evaluate(() => {
        const s = document.querySelector('.piece-switcher');
        const sRect = s.getBoundingClientRect();
        return {
          switcherRectTop: Math.round(sRect.top)
        };
      });
      assert(
        activeStickyState.switcherRectTop === 0,
        `[${vp.name}] Switcher stays actively sticky at top: 0px during scroll (got: ${activeStickyState.switcherRectTop}px)`
      );

      // 4. Check Past #atelierPDP at Footer
      await page.evaluate(() => {
        document.querySelector('footer').scrollIntoView({ block: 'start' });
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(800);
      const footerState = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = window.getComputedStyle(h);
        const rect = h.getBoundingClientRect();
        return {
          headerHidden: h.classList.contains('header--hidden'),
          headerOpacity: parseFloat(s.opacity),
          headerPointerEvents: s.pointerEvents,
          headerTop: Math.round(rect.top)
        };
      });
      assert(!footerState.headerHidden, `[${vp.name}] Header re-appears at footer (header--hidden removed)`);
      assert(footerState.headerOpacity === 1, `[${vp.name}] Header opacity is restored to 1 at footer`);
      assert(footerState.headerPointerEvents === 'auto', `[${vp.name}] Header pointer-events is restored to auto at footer`);
      assert(footerState.headerTop === 0, `[${vp.name}] Header rect.top is 0 at footer`);

      // 5. Reverse Scroll Back Up into #atelierPDP
      await page.evaluate(() => {
        document.getElementById('atelierPDP').scrollIntoView({ block: 'center' });
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(800);
      const reversePDP = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = window.getComputedStyle(h);
        const rect = h.getBoundingClientRect();
        return {
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(s.opacity),
          bottom: Math.round(rect.bottom)
        };
      });
      assert(reversePDP.hidden, `[${vp.name}] Reverse scroll re-hides header in #atelierPDP`);
      assert(reversePDP.opacity === 0, `[${vp.name}] Reverse scroll header opacity is 0 in #atelierPDP`);
      assert(reversePDP.bottom <= 0, `[${vp.name}] Reverse scroll header bottom is off-screen`);

      // 6. Reverse Scroll Back Up to Page Top
      await page.evaluate(() => {
        window.scrollTo(0, 0);
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(800);
      const reverseTop = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = window.getComputedStyle(h);
        return {
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(s.opacity),
          pointerEvents: s.pointerEvents
        };
      });
      assert(!reverseTop.hidden, `[${vp.name}] Header fully restored at top after reverse scroll`);
      assert(reverseTop.opacity === 1, `[${vp.name}] Header opacity 1 at top after reverse scroll`);

      assert(pageErrors.length === 0, `[${vp.name}] Zero console errors encountered (errors: ${pageErrors.length})`);
      await context.close();
    }

    console.log('\n======================================================================');
    console.log(`STRESS TEST SUMMARY: ${passCount} passed, ${failCount} failed`);
    if (failures.length > 0) {
      console.log('\nDETAILED FAILURE LIST:');
      failures.forEach((f, idx) => console.log(`  ${idx + 1}. ${f}`));
    }
    console.log('======================================================================\n');

  } finally {
    await browser.close();
    server.close();
  }
}

runAdversarialStressTests().catch(err => {
  console.error('\nAdversarial stress test execution failed:', err);
  process.exit(1);
});
