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

function assert(condition, message) {
  if (!condition) {
    console.error(`  [FAIL] ${message}`);
    failCount++;
    throw new Error(`Assertion failed: ${message}`);
  }
  console.log(`  [PASS] ${message}`);
  passCount++;
}

async function runDeepStressTests() {
  console.log('======================================================================');
  console.log('  CHALLENGER 2: DEEP ADVERSARIAL STRESS HARNESS — MILESTONE 2 (R2)    ');
  console.log('======================================================================\n');

  const server = createServer();
  await new Promise(resolve => server.listen(0, resolve));
  const port = server.address().port;
  console.log(`Server listening on port ${port}\n`);

  const browser = await chromium.launch({ headless: true });

  try {
    // -------------------------------------------------------------------------
    // TEST 1: CONTINUOUS WHEEL STREAM THROUGH #productStory INTO #atelierPDP
    // -------------------------------------------------------------------------
    console.log('>>> TEST 1: Continuous High-Velocity Wheel Stream Through #productStory into #atelierPDP <<<');
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:${port}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p && !p.classList.contains('is-dismissed')) p.click();
      });
      await page.waitForTimeout(300);

      // Fast forward to near end of productStory
      const targetPdpY = await page.evaluate(() => {
        const pdp = document.getElementById('atelierPDP');
        return window.scrollY + pdp.getBoundingClientRect().top;
      });

      console.log(`Target #atelierPDP absolute Y = ${targetPdpY}px`);

      // Scroll to 1000px before atelierPDP
      await page.evaluate((y) => window.scrollTo(0, y - 1000), targetPdpY);
      await page.waitForTimeout(200);

      // Verify header is visible before entering PDP
      const headerBefore = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        return {
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(window.getComputedStyle(h).opacity)
        };
      });
      assert(!headerBefore.hidden, 'Header is NOT hidden while still in #productStory before PDP');
      assert(headerBefore.opacity >= 0.8, 'Header is visibly opaque before entering PDP');

      // Now stream 15 rapid wheel bursts into #atelierPDP
      console.log('Streaming 15 rapid wheel bursts (200px each) into #atelierPDP...');
      for (let i = 0; i < 15; i++) {
        await page.mouse.wheel(0, 200);
        await page.waitForTimeout(16);
      }
      await page.waitForTimeout(800);

      const headerInside = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = document.querySelector('.piece-switcher');
        const p = document.getElementById('atelierPDP');
        const pRect = p.getBoundingClientRect();
        const sRect = s.getBoundingClientRect();
        return {
          pdpTop: Math.round(pRect.top),
          isInside: pRect.top <= 80 && pRect.bottom > 0,
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(window.getComputedStyle(h).opacity),
          switcherTop: Math.round(sRect.top)
        };
      });

      console.log(`Position after wheel stream: pdpTop=${headerInside.pdpTop}, isInside=${headerInside.isInside}`);
      if (headerInside.isInside) {
        assert(headerInside.hidden, 'Header has header--hidden class after wheel streaming into PDP');
        assert(headerInside.opacity === 0, 'Header opacity is 0 after wheel streaming into PDP');
        assert(headerInside.switcherTop === 0, 'Switcher is sticky at exactly 0px');
      }

      // Now reverse stream wheel bursts back UP into #productStory
      console.log('Streaming 20 rapid reverse wheel bursts (-200px each) back up into #productStory...');
      for (let i = 0; i < 20; i++) {
        await page.mouse.wheel(0, -200);
        await page.waitForTimeout(16);
      }
      await page.waitForTimeout(800);

      const headerAfterReverse = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const p = document.getElementById('atelierPDP');
        const pRect = p.getBoundingClientRect();
        return {
          pdpTop: Math.round(pRect.top),
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(window.getComputedStyle(h).opacity),
          pointerEvents: window.getComputedStyle(h).pointerEvents
        };
      });

      console.log(`Position after reverse wheel stream: pdpTop=${headerAfterReverse.pdpTop}`);
      if (headerAfterReverse.pdpTop > 80) {
        assert(!headerAfterReverse.hidden, 'Header re-appears (header--hidden removed) on reverse scroll into #productStory');
        assert(headerAfterReverse.opacity === 1, 'Header opacity restored to 1 on reverse scroll into #productStory');
        assert(headerAfterReverse.pointerEvents === 'auto', 'Header pointer-events restored to auto on reverse scroll into #productStory');
      }

      await context.close();
    }

    // -------------------------------------------------------------------------
    // TEST 2: MOBILE TOUCH SCROLL & HORIZONTAL SWITCHER ACCESSIBILITY
    // -------------------------------------------------------------------------
    console.log('\n>>> TEST 2: Mobile Touch Scroll & Horizontal Switcher Accessibility <<<');
    {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true
      });
      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:${port}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p && !p.classList.contains('is-dismissed')) p.click();
      });
      await page.waitForTimeout(300);

      // Scroll into atelierPDP on mobile
      await page.evaluate(() => {
        document.getElementById('atelierPDP').scrollIntoView({ block: 'start' });
        window.scrollBy(0, 150);
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(800);

      // Verify switcher is sticky at top: 0 on mobile
      const mobileStickyCheck = await page.evaluate(() => {
        const s = document.querySelector('.piece-switcher');
        const h = document.getElementById('siteHeader');
        const sRect = s.getBoundingClientRect();
        return {
          sTop: Math.round(sRect.top),
          sZ: window.getComputedStyle(s).zIndex,
          hHidden: h.classList.contains('header--hidden'),
          hOpacity: parseFloat(window.getComputedStyle(h).opacity)
        };
      });
      assert(mobileStickyCheck.sTop === 0, `Mobile switcher is flush sticky at top: 0px (got: ${mobileStickyCheck.sTop}px)`);
      assert(mobileStickyCheck.sZ === '50', `Mobile switcher has z-index: 50 (got: ${mobileStickyCheck.sZ})`);
      assert(mobileStickyCheck.hHidden, 'Header is hidden on mobile inside PDP');
      assert(mobileStickyCheck.hOpacity === 0, 'Header opacity is 0 on mobile inside PDP');

      // Verify that switcher group is horizontally scrollable on mobile
      const switcherScrollable = await page.evaluate(() => {
        const group = document.querySelector('.piece-switcher [role="group"]');
        return {
          scrollWidth: group.scrollWidth,
          clientWidth: group.clientWidth,
          isOverflowing: group.scrollWidth > group.clientWidth
        };
      });
      console.log(`Mobile switcher button group: scrollWidth=${switcherScrollable.scrollWidth}px, clientWidth=${switcherScrollable.clientWidth}px`);
      assert(switcherScrollable.isOverflowing, 'Switcher group horizontally overflows and scrolls on narrow mobile screen');

      // Scroll switcher group to reveal Slide 005 and click it
      await page.evaluate(() => {
        const group = document.querySelector('.piece-switcher [role="group"]');
        group.scrollLeft = group.scrollWidth; // Scroll all the way right
      });
      await page.waitForTimeout(200);

      const btn5Visible = await page.evaluate(() => {
        const btn5 = document.querySelector('[data-piece-select="5"]');
        const rect = btn5.getBoundingClientRect();
        return rect.right <= window.innerWidth && rect.left >= 0;
      });
      assert(btn5Visible, 'Button 005 (The Silas Shirt) is scrolled into view and visible in mobile viewport');

      // Tap on Button 005
      await page.tap('[data-piece-select="5"]');
      await page.waitForTimeout(300);

      const piece5Active = await page.evaluate(() => {
        const btn5 = document.querySelector('[data-piece-select="5"]');
        return {
          pressed: btn5.getAttribute('aria-pressed') === 'true',
          activeClass: btn5.classList.contains('is-active'),
          headerHidden: document.getElementById('siteHeader').classList.contains('header--hidden')
        };
      });
      assert(piece5Active.pressed, 'Mobile piece 5 button has aria-pressed="true"');
      assert(piece5Active.activeClass, 'Mobile piece 5 button has is-active class');
      assert(piece5Active.headerHidden, 'Header remains hidden on mobile after piece switch');

      // Verify mobile sticky purchase action bar at bottom does NOT collide with switcher at top
      const barCollisionCheck = await page.evaluate(() => {
        const switcher = document.querySelector('.piece-switcher');
        const bottomBar = document.querySelector('.mobile-sticky-action-bar');
        const sRect = switcher.getBoundingClientRect();
        const bRect = bottomBar.getBoundingClientRect();
        return {
          switcherBottom: sRect.bottom,
          bottomBarTop: bRect.top,
          hasClearance: bRect.top > sRect.bottom
        };
      });
      assert(barCollisionCheck.hasClearance, `Clear vertical clearance between top switcher (bottom: ${barCollisionCheck.switcherBottom}px) and bottom purchase bar (top: ${barCollisionCheck.bottomBarTop}px)`);

      await context.close();
    }

    // -------------------------------------------------------------------------
    // TEST 3: TABLET ORIENTATION ROTATION (PORTRAIT <-> LANDSCAPE)
    // -------------------------------------------------------------------------
    console.log('\n>>> TEST 3: Tablet Orientation Change (Portrait <-> Landscape) <<<');
    {
      const context = await browser.newContext({
        viewport: { width: 768, height: 1024 }, // iPad Portrait
        isMobile: false
      });
      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:${port}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p && !p.classList.contains('is-dismissed')) p.click();
      });
      await page.waitForTimeout(300);

      // Scroll into atelierPDP
      await page.evaluate(() => {
        document.getElementById('atelierPDP').scrollIntoView({ block: 'start' });
        window.scrollBy(0, 100);
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(700);

      // Verify in portrait
      const portraitCheck = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = document.querySelector('.piece-switcher');
        return {
          hHidden: h.classList.contains('header--hidden'),
          sTop: Math.round(s.getBoundingClientRect().top)
        };
      });
      assert(portraitCheck.hHidden, 'Tablet Portrait: Header is hidden inside atelierPDP');
      assert(portraitCheck.sTop === 0, 'Tablet Portrait: Switcher sits at top: 0px');

      // Rotate to Landscape (1024x768)
      console.log('Rotating to Tablet Landscape (1024x768)...');
      await page.setViewportSize({ width: 1024, height: 768 });
      await page.evaluate(() => {
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(700);

      const landscapeCheck = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = document.querySelector('.piece-switcher');
        const p = document.getElementById('atelierPDP');
        const pRect = p.getBoundingClientRect();
        return {
          isInside: pRect.top <= 80 && pRect.bottom > 0,
          hHidden: h.classList.contains('header--hidden'),
          sTop: Math.round(s.getBoundingClientRect().top)
        };
      });
      assert(landscapeCheck.hHidden, 'Tablet Landscape: Header remains hidden inside atelierPDP after rotation');
      assert(landscapeCheck.sTop === 0, 'Tablet Landscape: Switcher remains flush at top: 0px after rotation');

      // Rotate back to Portrait (768x1024)
      console.log('Rotating back to Tablet Portrait (768x1024)...');
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.evaluate(() => {
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(700);

      const returnPortraitCheck = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = document.querySelector('.piece-switcher');
        return {
          hHidden: h.classList.contains('header--hidden'),
          sTop: Math.round(s.getBoundingClientRect().top)
        };
      });
      assert(returnPortraitCheck.hHidden, 'Tablet Re-Portrait: Header remains hidden');
      assert(returnPortraitCheck.sTop === 0, 'Tablet Re-Portrait: Switcher remains flush at top: 0px');

      await context.close();
    }

    // -------------------------------------------------------------------------
    // TEST 4: RAPID DIRECTIONAL REVERSAL (TRANSITION INTERRUPTION)
    // -------------------------------------------------------------------------
    console.log('\n>>> TEST 4: Rapid Directional Reversal (Transition Interruption Stress) <<<');
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(`http://127.0.0.1:${port}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);
      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p && !p.classList.contains('is-dismissed')) p.click();
      });
      await page.waitForTimeout(300);

      // Scroll into atelierPDP, then IMMEDIATELY (within 50ms) scroll back out before 0.65s transition finishes
      console.log('Scrolling into PDP and reversing out after 50ms (interrupting hide transition)...');
      await page.evaluate(() => {
        document.getElementById('atelierPDP').scrollIntoView({ block: 'start' });
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(50); // Interrupted midway through transition

      await page.evaluate(() => {
        window.scrollTo(0, 0); // Jump back to top immediately
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(800); // Allow restore transition to settle

      const interruptedState = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = window.getComputedStyle(h);
        return {
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(s.opacity),
          pointerEvents: s.pointerEvents,
          transform: s.transform
        };
      });
      assert(!interruptedState.hidden, 'Header recovered from interrupted transition (header--hidden is false)');
      assert(interruptedState.opacity === 1, `Header opacity cleanly recovered to 1 (got: ${interruptedState.opacity})`);
      assert(interruptedState.pointerEvents === 'auto', 'Header pointer-events cleanly recovered to auto');

      await context.close();
    }

    console.log('\n======================================================================');
    console.log(`DEEP STRESS TEST SUMMARY: ${passCount} passed, ${failCount} failed`);
    console.log('======================================================================\n');

    if (failCount > 0) {
      throw new Error(`${failCount} deep stress test assertions failed!`);
    }

  } finally {
    await browser.close();
    server.close();
  }
}

runDeepStressTests().catch(err => {
  console.error('\nDeep stress test execution failed:', err);
  process.exit(1);
});
