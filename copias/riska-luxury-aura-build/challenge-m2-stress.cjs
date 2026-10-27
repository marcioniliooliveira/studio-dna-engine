const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8098;
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

const results = [];
function recordResult(name, passed, detail) {
  results.push({ name, passed, detail });
  const tag = passed ? '[CHALLENGE PASS]' : '[CHALLENGE FAIL]';
  console.log(`  ${tag} ${name}${detail ? ' — ' + detail : ''}`);
  if (!passed) {
    console.error(`      ERROR DETAILS: ${detail}`);
  }
}

async function runEmpiricalStressSuite() {
  console.log('================================================================');
  console.log('   EMPIRICAL CHALLENGER: MILESTONE 2 ADVERSARIAL STRESS SUITE   ');
  console.log('================================================================\n');

  const server = createServer();
  await new Promise(resolve => server.listen(PORT, resolve));

  const browser = await chromium.launch({ headless: true });

  try {
    // -------------------------------------------------------------
    // SUITE 1: BOUNDARY PRECISION & MATHEMATICAL THRESHOLDS
    // -------------------------------------------------------------
    console.log('\n>>> SUITE 1: Boundary Precision & Mathematical Thresholds');
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);

      // Dismiss preloader
      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p) p.click();
      });
      await page.waitForTimeout(600);

      const boundaryReport = await page.evaluate(async () => {
        const pdp = document.getElementById('atelierPDP');
        const header = document.getElementById('siteHeader');
        const check = window.__checkPDP || (() => {});
        const pdpAbsoluteTop = pdp.getBoundingClientRect().top + window.scrollY;

        // Position A: Above boundary (rect.top = 85px > 80px)
        window.scrollTo(0, pdpAbsoluteTop - 85);
        check();
        const stateAbove = {
          rectTop: pdp.getBoundingClientRect().top,
          hiddenClass: header.classList.contains('header--hidden'),
          pointerEvents: window.getComputedStyle(header).pointerEvents
        };

        // Position B: Inside boundary (rect.top = 79px <= 80px)
        window.scrollTo(0, pdpAbsoluteTop - 79);
        check();
        const stateInsideImmediate = {
          rectTop: pdp.getBoundingClientRect().top,
          hiddenClass: header.classList.contains('header--hidden'),
          ariaHidden: header.getAttribute('aria-hidden'),
          pointerEvents: window.getComputedStyle(header).pointerEvents
        };

        // Wait for CSS transition (0.55s opacity / 0.65s transform)
        await new Promise(r => setTimeout(r, 750));
        const stateInsideSettled = {
          opacity: parseFloat(window.getComputedStyle(header).opacity),
          pointerEvents: window.getComputedStyle(header).pointerEvents,
          headerBottom: Math.round(header.getBoundingClientRect().bottom)
        };

        // Position C: Boundary edge (rect.top = 80px exact)
        window.scrollTo(0, pdpAbsoluteTop - 80);
        check();
        const stateExactEdge = {
          rectTop: pdp.getBoundingClientRect().top,
          hiddenClass: header.classList.contains('header--hidden')
        };

        // Position D: Near bottom inside PDP (rect.bottom = 20px > 0)
        const pdpAbsoluteBottom = pdp.getBoundingClientRect().bottom + window.scrollY;
        window.scrollTo(0, pdpAbsoluteBottom - 20);
        check();
        const stateNearBottomInside = {
          rectBottom: pdp.getBoundingClientRect().bottom,
          hiddenClass: header.classList.contains('header--hidden')
        };

        // Position E: Past bottom edge (rect.bottom = -20px <= 0)
        window.scrollTo(0, pdpAbsoluteBottom + 20);
        check();
        const statePastBottomImmediate = {
          rectBottom: pdp.getBoundingClientRect().bottom,
          hiddenClass: header.classList.contains('header--hidden')
        };

        await new Promise(r => setTimeout(r, 750));
        const statePastBottomSettled = {
          opacity: parseFloat(window.getComputedStyle(header).opacity),
          pointerEvents: window.getComputedStyle(header).pointerEvents,
          headerTop: Math.round(header.getBoundingClientRect().top)
        };

        return {
          stateAbove,
          stateInsideImmediate,
          stateInsideSettled,
          stateExactEdge,
          stateNearBottomInside,
          statePastBottomImmediate,
          statePastBottomSettled
        };
      });

      recordResult(
        'Header visible at 85px above PDP (rect.top > 80)',
        !boundaryReport.stateAbove.hiddenClass && boundaryReport.stateAbove.pointerEvents === 'auto',
        `rectTop: ${boundaryReport.stateAbove.rectTop}, hidden: ${boundaryReport.stateAbove.hiddenClass}`
      );

      recordResult(
        'Header immediately toggles hidden state at rect.top <= 80',
        boundaryReport.stateInsideImmediate.hiddenClass && boundaryReport.stateInsideImmediate.ariaHidden === 'true' && boundaryReport.stateInsideImmediate.pointerEvents === 'none',
        `hiddenClass: ${boundaryReport.stateInsideImmediate.hiddenClass}, ariaHidden: ${boundaryReport.stateInsideImmediate.ariaHidden}`
      );

      recordResult(
        'Header settles to 0 opacity and off-screen position inside PDP',
        boundaryReport.stateInsideSettled.opacity === 0 && boundaryReport.stateInsideSettled.headerBottom <= 0,
        `opacity: ${boundaryReport.stateInsideSettled.opacity}, headerBottom: ${boundaryReport.stateInsideSettled.headerBottom}px`
      );

      recordResult(
        'Header triggers hide at exact 80px boundary',
        boundaryReport.stateExactEdge.hiddenClass,
        `rectTop: ${boundaryReport.stateExactEdge.rectTop}, hidden: ${boundaryReport.stateExactEdge.hiddenClass}`
      );

      recordResult(
        'Header remains hidden while rect.bottom > 0',
        boundaryReport.stateNearBottomInside.hiddenClass,
        `rectBottom: ${boundaryReport.stateNearBottomInside.rectBottom}, hidden: ${boundaryReport.stateNearBottomInside.hiddenClass}`
      );

      recordResult(
        'Header immediately un-hides when rect.bottom <= 0',
        !boundaryReport.statePastBottomImmediate.hiddenClass,
        `rectBottom: ${boundaryReport.statePastBottomImmediate.rectBottom}, hidden: ${boundaryReport.statePastBottomImmediate.hiddenClass}`
      );

      recordResult(
        'Header settles to opacity 1 at top: 0 past PDP bottom',
        boundaryReport.statePastBottomSettled.opacity === 1 && boundaryReport.statePastBottomSettled.pointerEvents === 'auto' && boundaryReport.statePastBottomSettled.headerTop === 0,
        `opacity: ${boundaryReport.statePastBottomSettled.opacity}, pointerEvents: ${boundaryReport.statePastBottomSettled.pointerEvents}, headerTop: ${boundaryReport.statePastBottomSettled.headerTop}px`
      );

      await context.close();
    }

    // -------------------------------------------------------------
    // SUITE 2: RAPID BOUNDARY OSCILLATION & FLICKER STRESS
    // -------------------------------------------------------------
    console.log('\n>>> SUITE 2: Rapid Boundary Oscillation (Jitter / Chattering Stress)');
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);

      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p) p.click();
      });
      await page.waitForTimeout(500);

      const oscillationResult = await page.evaluate(async () => {
        const pdp = document.getElementById('atelierPDP');
        const header = document.getElementById('siteHeader');
        const check = window.__checkPDP || (() => {});
        const pdpAbsoluteTop = pdp.getBoundingClientRect().top + window.scrollY;

        let errorCount = 0;
        const errors = [];

        for (let i = 0; i < 30; i++) {
          window.scrollTo(0, pdpAbsoluteTop - 120);
          check();
          if (header.classList.contains('header--hidden')) {
            errorCount++;
            errors.push(`Iteration ${i} above: header has header--hidden`);
          }

          window.scrollTo(0, pdpAbsoluteTop - 40);
          check();
          if (!header.classList.contains('header--hidden')) {
            errorCount++;
            errors.push(`Iteration ${i} inside: header lacks header--hidden`);
          }
        }

        // Settle inside and wait for transition
        window.scrollTo(0, pdpAbsoluteTop + 200);
        check();
        await new Promise(r => setTimeout(r, 750));

        const settledInside = {
          hidden: header.classList.contains('header--hidden'),
          opacity: parseFloat(window.getComputedStyle(header).opacity),
          pointerEvents: window.getComputedStyle(header).pointerEvents,
          headerBottom: Math.round(header.getBoundingClientRect().bottom)
        };

        return { errorCount, errors, settledInside };
      });

      recordResult(
        'Zero state desynchronization during 30 rapid threshold oscillations',
        oscillationResult.errorCount === 0,
        `Errors: ${oscillationResult.errorCount}`
      );

      recordResult(
        'Clean settling inside PDP after oscillation (hidden, opacity 0, pointer-events none, off-screen)',
        oscillationResult.settledInside.hidden && oscillationResult.settledInside.opacity === 0 && oscillationResult.settledInside.pointerEvents === 'none' && oscillationResult.settledInside.headerBottom <= 0,
        `hidden: ${oscillationResult.settledInside.hidden}, opacity: ${oscillationResult.settledInside.opacity}, pointerEvents: ${oscillationResult.settledInside.pointerEvents}, headerBottom: ${oscillationResult.settledInside.headerBottom}px`
      );

      await context.close();
    }

    // -------------------------------------------------------------
    // SUITE 3: PIECE SWITCHER STICKY TOP-0 CONTINUITY & ELEVATION
    // -------------------------------------------------------------
    console.log('\n>>> SUITE 3: Piece Switcher Sticky Top-0 Continuity & Stacking Elevation');
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1500);

      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p) p.click();
      });
      await page.waitForTimeout(500);

      const switcherContinuity = await page.evaluate(async () => {
        const pdp = document.getElementById('atelierPDP');
        const switcher = document.querySelector('.piece-switcher');
        const check = window.__checkPDP || (() => {});
        const pdpAbsoluteTop = pdp.getBoundingClientRect().top + window.scrollY;

        const checkpoints = [100, 300, 600, 1000, 1500, 2000];
        const res = [];

        for (const offset of checkpoints) {
          window.scrollTo(0, pdpAbsoluteTop + offset);
          check();
          const sRect = switcher.getBoundingClientRect();
          const sStyle = window.getComputedStyle(switcher);
          res.push({
            offset,
            rectTop: Math.round(sRect.top),
            zIndex: sStyle.zIndex,
            position: sStyle.position
          });
        }
        return res;
      });

      const allStickyAtZero = switcherContinuity.every(p => p.rectTop === 0);
      const allZ50 = switcherContinuity.every(p => p.zIndex === '50');

      recordResult(
        'Piece switcher sticks continuously at rect.top === 0 across all scroll depths in PDP',
        allStickyAtZero,
        `Recorded tops: ${switcherContinuity.map(p => `+${p.offset} -> ${p.rectTop}px`).join(', ')}`
      );

      recordResult(
        'Piece switcher maintains computed z-index 50 throughout sticky duration',
        allZ50,
        `Recorded zIndexes: ${switcherContinuity.map(p => p.zIndex).join(', ')}`
      );

      // Verify physical mouse click at viewport top on button 003 while sticky
      await page.evaluate(() => {
        const pdp = document.getElementById('atelierPDP');
        window.scrollTo(0, pdp.getBoundingClientRect().top + window.scrollY + 500);
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(300);

      const btn3 = await page.$('button[data-piece-select="3"]');
      const btn3Box = await btn3.boundingBox();

      await page.mouse.click(btn3Box.x + btn3Box.width / 2, btn3Box.y + btn3Box.height / 2);
      await page.waitForTimeout(400);

      const activeAfterClick = await page.evaluate(() => {
        const title = document.querySelector('.atelier-buy-module [data-piece-title]');
        const price = document.querySelector('.atelier-buy-module [data-piece-price]');
        const activeBtn = document.querySelector('.piece-nav-btn.is-active');
        return {
          title: title ? title.textContent.trim() : null,
          price: price ? price.textContent.trim() : null,
          activeBtnText: activeBtn ? activeBtn.textContent.trim() : null
        };
      });

      recordResult(
        'Piece switcher buttons are directly clickable at viewport top without header interception',
        activeAfterClick.title === 'The Blake Trouser' && activeAfterClick.price === '$2,950',
        `Selected title: "${activeAfterClick.title}", price: "${activeAfterClick.price}"`
      );

      await context.close();
    }

    // -------------------------------------------------------------
    // SUITE 4: MULTI-VIEWPORT RESPONSIVENESS MATRIX
    // -------------------------------------------------------------
    console.log('\n>>> SUITE 4: Multi-Viewport Responsiveness Matrix');
    const viewports = [
      { name: '4K Desktop (2560x1440)', width: 2560, height: 1440, mobile: false },
      { name: 'FHD Desktop (1920x1080)', width: 1920, height: 1080, mobile: false },
      { name: 'Standard Laptop (1366x768)', width: 1366, height: 768, mobile: false },
      { name: 'iPad Portrait (768x1024)', width: 768, height: 1024, mobile: false },
      { name: 'iPhone 14 (390x844)', width: 390, height: 844, mobile: true },
      { name: 'Pixel 7 (412x915)', width: 412, height: 915, mobile: true },
      { name: 'Compact Mobile (360x740)', width: 360, height: 740, mobile: true },
    ];

    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.mobile
      });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(800);

      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p) p.click();
      });
      await page.waitForTimeout(400);

      const vpReport = await page.evaluate(async () => {
        const header = document.getElementById('siteHeader');
        const switcher = document.querySelector('.piece-switcher');
        const pdp = document.getElementById('atelierPDP');
        const check = window.__checkPDP || (() => {});

        // 1. Initial top state
        window.scrollTo(0, 0);
        check();
        const topState = {
          headerHidden: header.classList.contains('header--hidden'),
          headerOpacity: parseFloat(window.getComputedStyle(header).opacity)
        };

        // 2. Scroll into PDP
        pdp.scrollIntoView({ block: 'start' });
        check();
        await new Promise(r => setTimeout(r, 850));

        const pdpState = {
          headerHidden: header.classList.contains('header--hidden'),
          headerOpacity: parseFloat(window.getComputedStyle(header).opacity),
          headerPointerEvents: window.getComputedStyle(header).pointerEvents,
          headerBottom: Math.round(header.getBoundingClientRect().bottom),
          switcherTop: window.getComputedStyle(switcher).top,
          switcherZ: window.getComputedStyle(switcher).zIndex,
          switcherRectTop: Math.round(switcher.getBoundingClientRect().top)
        };

        // 3. Scroll past PDP to footer
        const footer = document.querySelector('footer');
        footer.scrollIntoView({ block: 'start' });
        check();
        await new Promise(r => setTimeout(r, 850));

        const footerState = {
          headerHidden: header.classList.contains('header--hidden'),
          headerOpacity: parseFloat(window.getComputedStyle(header).opacity),
          headerPointerEvents: window.getComputedStyle(header).pointerEvents,
          headerTop: Math.round(header.getBoundingClientRect().top)
        };

        return { topState, pdpState, footerState };
      });

      const passTop = !vpReport.topState.headerHidden && vpReport.topState.headerOpacity === 1;
      const passPDP = vpReport.pdpState.headerHidden &&
                      vpReport.pdpState.headerOpacity === 0 &&
                      vpReport.pdpState.headerBottom <= 0 &&
                      vpReport.pdpState.switcherRectTop === 0 &&
                      vpReport.pdpState.switcherZ === '50';
      const passFooter = !vpReport.footerState.headerHidden &&
                         vpReport.footerState.headerOpacity === 1 &&
                         vpReport.footerState.headerTop === 0;

      recordResult(
        `Viewport [${vp.name}] Full Cycle (Top -> PDP -> Footer)`,
        passTop && passPDP && passFooter,
        `Top: ${passTop ? 'OK' : 'FAIL'}, PDP(hidden: ${vpReport.pdpState.headerHidden}, bottom: ${vpReport.pdpState.headerBottom}px, switcherTop: ${vpReport.pdpState.switcherRectTop}px, z: ${vpReport.pdpState.switcherZ}), Footer: ${passFooter ? 'OK' : 'FAIL'}`
      );

      await context.close();
    }

    // -------------------------------------------------------------
    // SUITE 5: DYNAMIC WINDOW RESIZING STRESS WHILE MAINTAINING SCROLL
    // -------------------------------------------------------------
    console.log('\n>>> SUITE 5: Dynamic Window Resizing Stress Inside PDP');
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);

      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p) p.click();
      });
      await page.waitForTimeout(400);

      // Scroll inside PDP
      await page.evaluate(() => {
        document.getElementById('atelierPDP').scrollIntoView({ block: 'start' });
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(800);

      // Resize width moderately (1440 -> 1200) keeping position inside PDP
      await page.setViewportSize({ width: 1200, height: 900 });
      await page.waitForTimeout(400);

      const resizeInsideResult = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const pdp = document.getElementById('atelierPDP');
        const rect = pdp.getBoundingClientRect();
        const isInside = rect.top <= 80 && rect.bottom > 0;
        return {
          isInside,
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(window.getComputedStyle(h).opacity)
        };
      });

      recordResult(
        'Header remains hidden when resized while staying within PDP',
        resizeInsideResult.isInside && resizeInsideResult.hidden && resizeInsideResult.opacity === 0,
        `isInside: ${resizeInsideResult.isInside}, hidden: ${resizeInsideResult.hidden}, opacity: ${resizeInsideResult.opacity}`
      );

      // Now scroll to top
      await page.evaluate(() => {
        window.scrollTo(0, 0);
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(800);

      const topAfterResize = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        return {
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(window.getComputedStyle(h).opacity)
        };
      });

      recordResult(
        'Header restores cleanly to top: 0 after resize when scrolling back to page top',
        !topAfterResize.hidden && topAfterResize.opacity === 1,
        `hidden: ${topAfterResize.hidden}, opacity: ${topAfterResize.opacity}`
      );

      await context.close();
    }

    // -------------------------------------------------------------
    // SUITE 6: HORIZONTAL SCRUB TO PDP TRANSITION (#productStory -> #atelierPDP)
    // -------------------------------------------------------------
    console.log('\n>>> SUITE 6: Smooth Transition from #productStory Slides to #atelierPDP');
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);

      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p) p.click();
      });
      await page.waitForTimeout(500);

      // Scroll deep into #productStory to reach Slide 005
      const slide5ClickResult = await page.evaluate(async () => {
        const ps = document.getElementById('productStory');
        const psTop = window.scrollY + ps.getBoundingClientRect().top;
        window.scrollTo(0, psTop + 3000);
        await new Promise(r => setTimeout(r, 400));

        const slide5 = ps.querySelector('.product-slide:nth-child(5)');
        const view5Btn = slide5 ? slide5.querySelector('[data-view-piece], .product-action') : null;
        if (!view5Btn) return { found: false };

        view5Btn.click();

        // Wait for smooth scroll animation to settle
        await new Promise(resolve => {
          let lastY = window.scrollY;
          let settledTicks = 0;
          const interval = setInterval(() => {
            if (Math.abs(window.scrollY - lastY) < 2) {
              settledTicks++;
              if (settledTicks >= 4) {
                clearInterval(interval);
                resolve();
              }
            } else {
              lastY = window.scrollY;
              settledTicks = 0;
            }
          }, 100);
        });

        // Additional buffer for CSS header transition
        await new Promise(r => setTimeout(r, 400));

        const h = document.getElementById('siteHeader');
        const s = document.querySelector('.piece-switcher');
        const pdp = document.getElementById('atelierPDP');
        const activeTitle = pdp ? pdp.querySelector('.atelier-buy-module [data-piece-title]') : null;

        return {
          found: true,
          headerHidden: h.classList.contains('header--hidden'),
          headerOpacity: parseFloat(window.getComputedStyle(h).opacity),
          headerBottom: Math.round(h.getBoundingClientRect().bottom),
          switcherRectTop: Math.round(s.getBoundingClientRect().top),
          pdpRectTop: Math.round(pdp.getBoundingClientRect().top),
          activeTitleText: activeTitle ? activeTitle.textContent.trim() : null
        };
      });

      recordResult(
        'Slide 005 "View" click lands accurately on #atelierPDP and activates "The Silas Shirt"',
        slide5ClickResult.found && slide5ClickResult.activeTitleText === 'The Silas Shirt',
        `activePiece: "${slide5ClickResult.activeTitleText}"`
      );

      recordResult(
        'Slide 005 "View" click triggers header hide (opacity 0, off-screen)',
        slide5ClickResult.found && slide5ClickResult.headerHidden && slide5ClickResult.headerOpacity === 0 && slide5ClickResult.headerBottom <= 0,
        `hidden: ${slide5ClickResult.headerHidden}, opacity: ${slide5ClickResult.headerOpacity}, bottom: ${slide5ClickResult.headerBottom}px`
      );

      recordResult(
        'Slide 005 "View" click places piece switcher cleanly at viewport top (rect.top === 0)',
        slide5ClickResult.found && slide5ClickResult.switcherRectTop === 0,
        `switcherRectTop: ${slide5ClickResult.switcherRectTop}px, pdpRectTop: ${slide5ClickResult.pdpRectTop}px`
      );

      await context.close();
    }

    // -------------------------------------------------------------
    // SUITE 7: BIDIRECTIONAL RESTORATION STRESS (Multi-round Alternating Scroll)
    // -------------------------------------------------------------
    console.log('\n>>> SUITE 7: Bidirectional Restoration Stress (Multi-round Alternating Scroll)');
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);

      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p) p.click();
      });
      await page.waitForTimeout(400);

      const roundTripResult = await page.evaluate(async () => {
        const header = document.getElementById('siteHeader');
        const check = window.__checkPDP || (() => {});
        const pdp = document.getElementById('atelierPDP');
        const footer = document.querySelector('footer');
        const story = document.getElementById('productStory');

        const log = [];

        for (let round = 1; round <= 3; round++) {
          // 1. Scroll into PDP
          pdp.scrollIntoView({ block: 'start' });
          check();
          await new Promise(r => setTimeout(r, 750));
          const pdpRound = {
            hidden: header.classList.contains('header--hidden'),
            opacity: parseFloat(window.getComputedStyle(header).opacity),
            pointerEvents: window.getComputedStyle(header).pointerEvents
          };

          // 2. Scroll UP to #productStory
          story.scrollIntoView({ block: 'start' });
          check();
          await new Promise(r => setTimeout(r, 750));
          const upRound = {
            hidden: header.classList.contains('header--hidden'),
            opacity: parseFloat(window.getComputedStyle(header).opacity),
            pointerEvents: window.getComputedStyle(header).pointerEvents
          };

          // 3. Scroll back down into PDP
          pdp.scrollIntoView({ block: 'center' });
          check();
          await new Promise(r => setTimeout(r, 750));
          const pdpRound2 = {
            hidden: header.classList.contains('header--hidden'),
            opacity: parseFloat(window.getComputedStyle(header).opacity),
            pointerEvents: window.getComputedStyle(header).pointerEvents
          };

          // 4. Scroll DOWN to footer
          footer.scrollIntoView({ block: 'start' });
          check();
          await new Promise(r => setTimeout(r, 750));
          const downRound = {
            hidden: header.classList.contains('header--hidden'),
            opacity: parseFloat(window.getComputedStyle(header).opacity),
            pointerEvents: window.getComputedStyle(header).pointerEvents
          };

          log.push({ round, pdpRound, upRound, pdpRound2, downRound });
        }

        return log;
      });

      let allRoundsPassed = true;
      for (const r of roundTripResult) {
        if (!r.pdpRound.hidden || r.pdpRound.opacity !== 0) allRoundsPassed = false;
        if (r.upRound.hidden || r.upRound.opacity !== 1 || r.upRound.pointerEvents !== 'auto') allRoundsPassed = false;
        if (!r.pdpRound2.hidden || r.pdpRound2.opacity !== 0) allRoundsPassed = false;
        if (r.downRound.hidden || r.downRound.opacity !== 1 || r.downRound.pointerEvents !== 'auto') allRoundsPassed = false;
      }

      recordResult(
        '3 full round-trips (PDP -> #productStory -> PDP -> Footer) maintain 100% state precision',
        allRoundsPassed,
        `All 3 rounds verified bidirectional restoration without state leakage.`
      );

      await context.close();
    }

    // -------------------------------------------------------------
    // SUITE 8: MOUSE WHEEL SCROLL EVENT TRANSIENT HARMONY
    // -------------------------------------------------------------
    console.log('\n>>> SUITE 8: Mouse Wheel Event Scrub Across Boundary');
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);

      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p) p.click();
      });
      await page.waitForTimeout(400);

      // Position mouse and wheel down into PDP
      await page.evaluate(() => {
        const pdp = document.getElementById('atelierPDP');
        window.scrollTo(0, pdp.getBoundingClientRect().top + window.scrollY - 300);
      });
      await page.waitForTimeout(300);

      // Perform real mouse wheel actions down into PDP
      await page.mouse.move(700, 450);
      for (let i = 0; i < 8; i++) {
        await page.mouse.wheel(0, 100);
        await page.waitForTimeout(50);
      }
      await page.waitForTimeout(750);

      const wheelInsideResult = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const s = document.querySelector('.piece-switcher');
        const pdp = document.getElementById('atelierPDP');
        const rect = pdp.getBoundingClientRect();
        return {
          isInside: rect.top <= 80 && rect.bottom > 0,
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(window.getComputedStyle(h).opacity),
          switcherRectTop: Math.round(s.getBoundingClientRect().top)
        };
      });

      recordResult(
        'Native mouse wheel scroll into PDP triggers header hide and sticky top-0',
        wheelInsideResult.isInside && wheelInsideResult.hidden && wheelInsideResult.opacity === 0 && wheelInsideResult.switcherRectTop === 0,
        `isInside: ${wheelInsideResult.isInside}, hidden: ${wheelInsideResult.hidden}, switcherTop: ${wheelInsideResult.switcherRectTop}px`
      );

      // Now wheel back up out of PDP
      for (let i = 0; i < 12; i++) {
        await page.mouse.wheel(0, -100);
        await page.waitForTimeout(50);
      }
      await page.waitForTimeout(750);

      const wheelUpResult = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        const pdp = document.getElementById('atelierPDP');
        const rect = pdp.getBoundingClientRect();
        return {
          isAbove: rect.top > 80,
          hidden: h.classList.contains('header--hidden'),
          opacity: parseFloat(window.getComputedStyle(h).opacity),
          pointerEvents: window.getComputedStyle(h).pointerEvents
        };
      });

      recordResult(
        'Native mouse wheel scroll up out of PDP restores header cleanly',
        wheelUpResult.isAbove && !wheelUpResult.hidden && wheelUpResult.opacity === 1 && wheelUpResult.pointerEvents === 'auto',
        `isAbove: ${wheelUpResult.isAbove}, hidden: ${wheelUpResult.hidden}, opacity: ${wheelUpResult.opacity}`
      );

      await context.close();
    }

    // -------------------------------------------------------------
    // SUITE 9: W3C ARIA & POINTER SAFETY AUDIT IN HIDDEN STATE
    // -------------------------------------------------------------
    console.log('\n>>> SUITE 9: W3C ARIA & Pointer-Events Safety Audit in Hidden State');
    {
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);

      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p) p.click();
      });
      await page.waitForTimeout(400);

      // Scroll inside PDP
      await page.evaluate(() => {
        document.getElementById('atelierPDP').scrollIntoView({ block: 'start' });
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(800);

      const ariaAudit = await page.evaluate(() => {
        const h = document.getElementById('siteHeader');
        return {
          ariaHidden: h.getAttribute('aria-hidden'),
          pointerEvents: window.getComputedStyle(h).pointerEvents,
          transform: window.getComputedStyle(h).transform,
          opacity: parseFloat(window.getComputedStyle(h).opacity)
        };
      });

      recordResult(
        'Header sets aria-hidden="true" when hidden to protect screen readers',
        ariaAudit.ariaHidden === 'true',
        `aria-hidden: "${ariaAudit.ariaHidden}"`
      );

      recordResult(
        'Header completely disables pointer-events in computed style',
        ariaAudit.pointerEvents === 'none',
        `pointer-events: "${ariaAudit.pointerEvents}"`
      );

      await context.close();
    }

    // -------------------------------------------------------------
    // SUITE 10: MOBILE HORIZONTAL SWITCHER TOUCH CONFORMANCE
    // -------------------------------------------------------------
    console.log('\n>>> SUITE 10: Mobile Horizontal Switcher Touch Conformance');
    {
      const context = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true
      });
      const page = await context.newPage();
      await page.goto(`http://localhost:${PORT}/site/index.html`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1000);

      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p) p.click();
      });
      await page.waitForTimeout(400);

      await page.evaluate(() => {
        document.getElementById('atelierPDP').scrollIntoView({ block: 'start' });
        if (window.__checkPDP) window.__checkPDP();
      });
      await page.waitForTimeout(800);

      const mobileAudit = await page.evaluate(() => {
        const switcher = document.querySelector('.piece-switcher');
        const btns = Array.from(switcher.querySelectorAll('button[data-piece-select]'));
        const sRect = switcher.getBoundingClientRect();
        return {
          switcherRectTop: Math.round(sRect.top),
          buttonCount: btns.length,
          allButtonsVisible: btns.length === 5,
          firstButtonText: btns[0] ? btns[0].textContent.trim() : null,
          lastButtonText: btns[4] ? btns[4].textContent.trim() : null
        };
      });

      recordResult(
        'Mobile viewport (< 768px) keeps piece-switcher sticky at rect.top === 0',
        mobileAudit.switcherRectTop === 0,
        `switcherRectTop: ${mobileAudit.switcherRectTop}px`
      );

      recordResult(
        'Mobile piece-switcher contains all 5 collection pieces with complete touch access',
        mobileAudit.allButtonsVisible && mobileAudit.firstButtonText.includes('001') && mobileAudit.lastButtonText.includes('005'),
        `buttons: ${mobileAudit.buttonCount}, first: "${mobileAudit.firstButtonText}", last: "${mobileAudit.lastButtonText}"`
      );

      await context.close();
    }

  } finally {
    await browser.close();
    server.close();
  }

  // Summary
  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.filter(r => !r.passed).length;

  console.log('\n================================================================');
  console.log(`CHALLENGE RESULTS: ${passedCount} PASSED, ${failedCount} FAILED (TOTAL: ${results.length})`);
  console.log('================================================================');

  if (failedCount > 0) {
    console.error(`\nFAILED TESTS (${failedCount}):`);
    results.filter(r => !r.passed).forEach(r => console.error(`  - ${r.name}: ${r.detail}`));
    process.exit(1);
  } else {
    console.log('\nVERDICT: All empirical challenge tests PASSED with zero failures.');
    process.exit(0);
  }
}

runEmpiricalStressSuite().catch(err => {
  console.error('Stress test harness execution error:', err);
  process.exit(1);
});
