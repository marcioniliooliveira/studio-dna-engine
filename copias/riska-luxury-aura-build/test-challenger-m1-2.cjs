const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SITE_DIR = path.join(__dirname, 'site');
const PORT = 8094;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4'
};

function createServer() {
  return http.createServer((req, res) => {
    let cleanUrl = decodeURIComponent(req.url.split('?')[0]);
    if (cleanUrl === '/' || cleanUrl === '') cleanUrl = '/index.html';
    const filePath = path.join(SITE_DIR, cleanUrl.replace(/^\//, ''));

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + req.url);
    }
  });
}

async function runEmpiricalChallenge() {
  const server = createServer();
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`[CHALLENGE SERVER] Running at http://localhost:${PORT}/`);

  const browser = await chromium.launch({ headless: true });
  const results = {
    passed: [],
    failed: []
  };

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      results.passed.push(message);
    } else {
      console.error(`  [FAIL] ${message}`);
      results.failed.push(message);
    }
  }

  const viewports = [
    { width: 1920, height: 1080, name: '1080p Ultra (1920x1080)' },
    { width: 1440, height: 900, name: '1440x900 Standard' },
    { width: 1366, height: 768, name: '1366x768 Laptop' },
    { width: 1280, height: 800, name: '1280x800 Compact' }
  ];

  try {
    for (const vp of viewports) {
      console.log(`\n======================================================================`);
      console.log(`CHALLENGE SUITE: Viewport ${vp.name}`);
      console.log(`======================================================================`);

      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height }
      });

      const pageErrors = [];
      page.on('pageerror', err => pageErrors.push(err.message));
      page.on('console', msg => {
        if (msg.type() === 'error') pageErrors.push(msg.text());
      });

      await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });

      // Dismiss sitePreloader
      await page.evaluate(() => {
        const p = document.getElementById('sitePreloader');
        if (p) p.click();
      });
      await page.waitForFunction(() => {
        const p = document.getElementById('sitePreloader');
        return !p || p.style.display === 'none' || p.classList.contains('is-dismissed');
      }, { timeout: 10000 });
      await page.waitForTimeout(400);

      // Section 1: Initial Dimensions & Zero Horizontal Overflow at scrollY = 0
      console.log(`\n--- [${vp.name}] Check 1: Initial Zero Horizontal Overflow & .pin-spacer Geometry ---`);
      const initialMetrics = await page.evaluate(() => {
        const doc = document.documentElement;
        const body = document.body;
        const ps = document.getElementById('productStory');
        const pinSpacer = ps ? ps.parentElement : null;
        const isPinSpacer = pinSpacer && pinSpacer.classList.contains('pin-spacer');

        return {
          windowInnerWidth: window.innerWidth,
          docScrollWidth: doc.scrollWidth,
          docClientWidth: doc.clientWidth,
          bodyScrollWidth: body.scrollWidth,
          bodyClientWidth: body.clientWidth,
          isPinSpacer,
          pinSpacerWidth: pinSpacer ? pinSpacer.getBoundingClientRect().width : null,
          pinSpacerStyle: pinSpacer ? pinSpacer.getAttribute('style') : null,
          psWidth: ps ? ps.getBoundingClientRect().width : null,
          psClientWidth: ps ? ps.clientWidth : null,
          psClasses: ps ? ps.className : null
        };
      });

      assert(
        initialMetrics.docScrollWidth === initialMetrics.docClientWidth,
        `[${vp.name}] Zero horizontal document overflow at scrollY=0 (scrollWidth: ${initialMetrics.docScrollWidth} === clientWidth: ${initialMetrics.docClientWidth})`
      );
      assert(
        initialMetrics.docScrollWidth === vp.width,
        `[${vp.name}] Document width matches target viewport width (expected: ${vp.width}, got: ${initialMetrics.docScrollWidth})`
      );
      assert(
        initialMetrics.isPinSpacer === true,
        `[${vp.name}] #productStory is wrapped in GSAP .pin-spacer`
      );
      assert(
        Math.abs(initialMetrics.pinSpacerWidth - vp.width) <= 1,
        `[${vp.name}] .pin-spacer width matches viewport width (expected: ${vp.width}, got: ${initialMetrics.pinSpacerWidth})`
      );
      assert(
        Math.abs(initialMetrics.psWidth - vp.width) <= 1,
        `[${vp.name}] #productStory width matches viewport width (expected: ${vp.width}, got: ${initialMetrics.psWidth})`
      );

      // Section 2: Horizontal Overflow & Geometry across the Entire Scroll Journey
      console.log(`\n--- [${vp.name}] Check 2: Zero Horizontal Overflow Across Full Scrub Path ---`);
      const journeyResult = await page.evaluate(async () => {
        const ps = document.getElementById('productStory');
        const stInstance = ScrollTrigger.getAll().find(st => st.vars && st.vars.trigger === ps);
        if (!stInstance) return { error: 'No ScrollTrigger instance found for #productStory' };

        const start = stInstance.start;
        const end = stInstance.end;
        const doc = document.documentElement;

        const checkPoints = [
          { name: 'Before pin (-200px)', y: Math.max(0, start - 200) },
          { name: 'Pin Start (Slide 1 enter)', y: start },
          { name: 'Slide 1 -> 2 (25% progress)', y: start + (end - start) * 0.25 },
          { name: 'Slide 2 -> 3 (50% progress)', y: start + (end - start) * 0.50 },
          { name: 'Slide 3 -> 4 (75% progress)', y: start + (end - start) * 0.75 },
          { name: 'Slide 5 Active Pin (90% progress)', y: start + (end - start) * 0.90 },
          { name: 'Slide 5 Resting Hold (98% progress)', y: start + (end - start) * 0.98 },
          { name: 'Unpin Boundary (100% progress)', y: end },
          { name: 'Just Past Unpin (+50px into PDP)', y: end + 50 },
          { name: 'Deep in Atelier PDP (+500px)', y: end + 500 }
        ];

        const samples = [];
        for (const pt of checkPoints) {
          window.scrollTo(0, pt.y);
          // Wait for RAF and scrub settling
          await new Promise(r => setTimeout(r, 120));

          const pinSpacer = ps ? ps.parentElement : null;
          const psRect = ps ? ps.getBoundingClientRect() : null;
          const pinSpacerRect = pinSpacer ? pinSpacer.getBoundingClientRect() : null;

          samples.push({
            name: pt.name,
            scrollY: window.scrollY,
            scrollX: window.scrollX,
            scrollWidth: doc.scrollWidth,
            clientWidth: doc.clientWidth,
            overflowDelta: doc.scrollWidth - doc.clientWidth,
            pinSpacerWidth: pinSpacerRect ? pinSpacerRect.width : null,
            psWidth: psRect ? psRect.width : null,
            progress: stInstance.progress.toFixed(4)
          });
        }
        return { samples };
      });

      for (const sample of journeyResult.samples) {
        assert(
          sample.overflowDelta === 0,
          `[${vp.name}] Zero overflow at ${sample.name} (scrollWidth: ${sample.scrollWidth}, clientWidth: ${sample.clientWidth}, delta: ${sample.overflowDelta}px)`
        );
        assert(
          sample.scrollX === 0,
          `[${vp.name}] Zero horizontal scroll drift at ${sample.name} (scrollX: ${sample.scrollX})`
        );
        assert(
          Math.abs(sample.pinSpacerWidth - vp.width) <= 1,
          `[${vp.name}] .pin-spacer width remains ${vp.width}px at ${sample.name} (got: ${sample.pinSpacerWidth})`
        );
      }

      // Section 3: Slide 005 Docking, Resting Hold & Unpin Transition Accuracy
      console.log(`\n--- [${vp.name}] Check 3: Slide 005 Unpin Transition & Gap Telemetry ---`);
      const transitionTelemetry = await page.evaluate(async () => {
        const ps = document.getElementById('productStory');
        const pdp = document.getElementById('atelierPDP');
        const slides = document.querySelectorAll('.product-slide');
        const slide5 = slides[4];
        const st = ScrollTrigger.getAll().find(s => s.vars && s.vars.trigger === ps);

        const end = st.end;
        // Test 5 precise steps around unpin boundary
        const boundaryDeltas = [-50, -20, 0, 20, 50];
        const stepResults = [];

        for (const delta of boundaryDeltas) {
          window.scrollTo(0, end + delta);
          await new Promise(r => setTimeout(r, 200));

          const s5Rect = slide5.getBoundingClientRect();
          const pdpRect = pdp.getBoundingClientRect();
          const psRect = ps.getBoundingClientRect();

          stepResults.push({
            delta,
            scrollY: window.scrollY,
            progress: st.progress,
            isActive: st.isActive,
            slide5Left: Math.round(s5Rect.left * 10) / 10,
            pdpTop: Math.round(pdpRect.top * 10) / 10,
            psTop: Math.round(psRect.top * 10) / 10,
            expectedPdpTop: Math.round((window.innerHeight - delta) * 10) / 10,
            innerHeight: window.innerHeight
          });
        }
        return { stepResults };
      });

      const unpinStep = transitionTelemetry.stepResults.find(s => s.delta === 0);
      console.log(`  Telemetry at unpin (delta=0):`, unpinStep);

      assert(
        Math.abs(unpinStep.slide5Left) <= 1.0,
        `[${vp.name}] Slide 005 is stationary and docked at left=0px at unpin (got: ${unpinStep.slide5Left}px)`
      );
      assert(
        Math.abs(unpinStep.pdpTop - vp.height) <= 2.0,
        `[${vp.name}] #atelierPDP enters flush with bottom of viewport at unpin (expected: ${vp.height}px, got: ${unpinStep.pdpTop}px)`
      );
      assert(
        Math.abs(unpinStep.psTop) <= 1.0,
        `[${vp.name}] #productStory top is 0px at unpin boundary (got: ${unpinStep.psTop}px)`
      );

      // Verify linear, monotonic entry of #atelierPDP after unpin
      const post20 = transitionTelemetry.stepResults.find(s => s.delta === 20);
      const post50 = transitionTelemetry.stepResults.find(s => s.delta === 50);
      assert(
        Math.abs((unpinStep.pdpTop - post20.pdpTop) - 20) <= 2,
        `[${vp.name}] Monotonic vertical advancement of #atelierPDP post-unpin (+20px scroll moved PDP by ${(unpinStep.pdpTop - post20.pdpTop).toFixed(1)}px)`
      );
      assert(
        Math.abs((unpinStep.pdpTop - post50.pdpTop) - 50) <= 2,
        `[${vp.name}] Monotonic vertical advancement of #atelierPDP post-unpin (+50px scroll moved PDP by ${(unpinStep.pdpTop - post50.pdpTop).toFixed(1)}px)`
      );

      // Section 4: Adversarial Stress Test - High Velocity Continuous Scrubbing
      console.log(`\n--- [${vp.name}] Check 4: High-Velocity Forward Scrubbing (500px/frame assault) ---`);
      const fastScrubResult = await page.evaluate(async () => {
        const ps = document.getElementById('productStory');
        const st = ScrollTrigger.getAll().find(s => s.vars && s.vars.trigger === ps);
        const start = st.start;
        const end = st.end;

        // Start at top, scroll past the whole pin in huge jumps of 500px
        let cur = 0;
        const target = end + 800;
        while (cur < target) {
          cur += 500;
          window.scrollTo(0, cur);
          await new Promise(r => setTimeout(r, 16)); // ~60fps assault
        }
        // Let scrub settling finish
        await new Promise(r => setTimeout(r, 350));

        const doc = document.documentElement;
        const pdp = document.getElementById('atelierPDP');
        const pdpRect = pdp.getBoundingClientRect();

        return {
          finalScrollY: window.scrollY,
          overflowDelta: doc.scrollWidth - doc.clientWidth,
          scrollX: window.scrollX,
          pdpTop: pdpRect.top,
          isProgressOne: st.progress === 1,
          timelineProgress: st.animation.progress()
        };
      });

      assert(
        fastScrubResult.overflowDelta === 0,
        `[${vp.name}] Zero overflow after high-velocity forward scrub assault (delta: ${fastScrubResult.overflowDelta}px)`
      );
      assert(
        fastScrubResult.scrollX === 0,
        `[${vp.name}] Zero horizontal drift after high-velocity forward scrub assault (scrollX: ${fastScrubResult.scrollX})`
      );
      assert(
        fastScrubResult.isProgressOne === true,
        `[${vp.name}] ScrollTrigger cleanly completed to progress 1.0 (got: ${fastScrubResult.isProgressOne})`
      );
      assert(
        Math.abs(fastScrubResult.timelineProgress - 1.0) <= 0.001,
        `[${vp.name}] Timeline animation cleanly reached progress 1.0 (got: ${fastScrubResult.timelineProgress})`
      );

      // Section 5: Adversarial Stress Test - Rapid Boundary Oscillation (Whip back-and-forth)
      console.log(`\n--- [${vp.name}] Check 5: Rapid Bidirectional Scrub Oscillation (+-150px across unpin boundary) ---`);
      const oscillationResult = await page.evaluate(async () => {
        const ps = document.getElementById('productStory');
        const slides = document.querySelectorAll('.product-slide');
        const slide5 = slides[4];
        const pdp = document.getElementById('atelierPDP');
        const st = ScrollTrigger.getAll().find(s => s.vars && s.vars.trigger === ps);
        const end = st.end;

        // Vigorously whip back and forth across unpin 16 times
        for (let i = 0; i < 16; i++) {
          const targetY = (i % 2 === 0) ? (end - 150) : (end + 150);
          window.scrollTo(0, targetY);
          await new Promise(r => setTimeout(r, 25));
        }

        // Return precisely to unpin boundary
        window.scrollTo(0, end);
        await new Promise(r => setTimeout(r, 400)); // let scrub 0.8 settle

        const doc = document.documentElement;
        const s5Rect = slide5.getBoundingClientRect();
        const pdpRect = pdp.getBoundingClientRect();
        const psRect = ps.getBoundingClientRect();

        return {
          scrollY: window.scrollY,
          overflowDelta: doc.scrollWidth - doc.clientWidth,
          scrollX: window.scrollX,
          slide5Left: Math.round(s5Rect.left * 10) / 10,
          pdpTop: Math.round(pdpRect.top * 10) / 10,
          psTop: Math.round(psRect.top * 10) / 10,
          innerHeight: window.innerHeight,
          progress: st.progress
        };
      });

      console.log(`  Oscillation settling result:`, oscillationResult);

      assert(
        oscillationResult.overflowDelta === 0,
        `[${vp.name}] Zero overflow after rapid bidirectional oscillation (delta: ${oscillationResult.overflowDelta}px)`
      );
      assert(
        oscillationResult.scrollX === 0,
        `[${vp.name}] Zero horizontal drift after oscillation (scrollX: ${oscillationResult.scrollX})`
      );
      assert(
        Math.abs(oscillationResult.slide5Left) <= 1.0,
        `[${vp.name}] Slide 005 returns cleanly to left=0.0px after whip oscillation (got: ${oscillationResult.slide5Left}px)`
      );
      assert(
        Math.abs(oscillationResult.pdpTop - vp.height) <= 2.0,
        `[${vp.name}] #atelierPDP returns cleanly to viewport boundary (got: ${oscillationResult.pdpTop}px, expected: ${vp.height}px)`
      );

      // Section 6: Instant Programmatic Teleportation & Reverse Scrub
      console.log(`\n--- [${vp.name}] Check 6: Instant Programmatic Teleportation & Reverse Scrub ---`);
      const reverseResult = await page.evaluate(async () => {
        const ps = document.getElementById('productStory');
        const slides = document.querySelectorAll('.product-slide');
        const slide1 = slides[0];
        const st = ScrollTrigger.getAll().find(s => s.vars && s.vars.trigger === ps);

        // Teleport deep past unpin into PDP
        window.scrollTo(0, st.end + 2000);
        await new Promise(r => setTimeout(r, 200));

        // Now reverse scrub all the way back to start
        window.scrollTo(0, st.start);
        await new Promise(r => setTimeout(r, 400));

        const doc = document.documentElement;
        const s1Rect = slide1.getBoundingClientRect();

        return {
          scrollY: window.scrollY,
          overflowDelta: doc.scrollWidth - doc.clientWidth,
          slide1Left: Math.round(s1Rect.left * 10) / 10,
          progress: st.progress
        };
      });

      assert(
        reverseResult.overflowDelta === 0,
        `[${vp.name}] Zero overflow after reverse scrub teleportation (delta: ${reverseResult.overflowDelta}px)`
      );
      assert(
        Math.abs(reverseResult.slide1Left) <= 1.0,
        `[${vp.name}] Slide 001 returns cleanly to left=0.0px upon reverse scrub to start (got: ${reverseResult.slide1Left}px)`
      );
      assert(
        reverseResult.progress === 0,
        `[${vp.name}] ScrollTrigger progress returns to 0 on reverse scrub (got: ${reverseResult.progress})`
      );

      // Check for console/page errors during run
      assert(
        pageErrors.length === 0,
        `[${vp.name}] Zero page/console errors during all stress tests (found: ${pageErrors.length}${pageErrors.length ? ': ' + pageErrors.join('; ') : ''})`
      );

      await page.close();
    }

    // Section 7: Dynamic Viewport Resize Stress Test (e.g. 1920 -> 1440 -> 1366 -> 1280 -> 1920 mid-scroll)
    console.log(`\n======================================================================`);
    console.log(`CHALLENGE SUITE: Dynamic Viewport Resize Stress Testing`);
    console.log(`======================================================================`);

    const resizePage = await browser.newPage({
      viewport: { width: 1920, height: 1080 }
    });
    await resizePage.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'domcontentloaded' });
    await resizePage.evaluate(() => {
      const p = document.getElementById('sitePreloader');
      if (p) p.click();
    });
    await resizePage.waitForFunction(() => {
      const p = document.getElementById('sitePreloader');
      return !p || p.style.display === 'none' || p.classList.contains('is-dismissed');
    }, { timeout: 10000 });
    await resizePage.waitForTimeout(400);

    // Scroll halfway into productStory at 1920x1080
    await resizePage.evaluate(() => {
      const ps = document.getElementById('productStory');
      const st = ScrollTrigger.getAll().find(s => s.vars && s.vars.trigger === ps);
      window.scrollTo(0, st.start + (st.end - st.start) * 0.5);
    });
    await resizePage.waitForTimeout(200);

    const resizeSequences = [
      { width: 1440, height: 900, name: '1920 -> 1440x900' },
      { width: 1366, height: 768, name: '1440 -> 1366x768' },
      { width: 1280, height: 800, name: '1366 -> 1280x800' },
      { width: 1920, height: 1080, name: '1280 -> 1920x1080' }
    ];

    for (const step of resizeSequences) {
      console.log(`\n--- Dynamic Resize: ${step.name} ---`);
      await resizePage.setViewportSize({ width: step.width, height: step.height });
      // Trigger resize event & ScrollTrigger refresh
      await resizePage.evaluate(() => {
        window.dispatchEvent(new Event('resize'));
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.refresh();
        }
      });
      await resizePage.waitForTimeout(300);

      const resizeMetrics = await resizePage.evaluate(() => {
        const doc = document.documentElement;
        const ps = document.getElementById('productStory');
        const pinSpacer = ps ? ps.parentElement : null;
        const pinSpacerRect = pinSpacer ? pinSpacer.getBoundingClientRect() : null;

        return {
          windowInnerWidth: window.innerWidth,
          docScrollWidth: doc.scrollWidth,
          docClientWidth: doc.clientWidth,
          overflowDelta: doc.scrollWidth - doc.clientWidth,
          pinSpacerWidth: pinSpacerRect ? pinSpacerRect.width : null,
          pinSpacerStyle: pinSpacer ? pinSpacer.getAttribute('style') : null
        };
      });

      assert(
        resizeMetrics.overflowDelta === 0,
        `[Resize ${step.name}] Zero horizontal document overflow after dynamic resize (scrollWidth: ${resizeMetrics.docScrollWidth}, clientWidth: ${resizeMetrics.docClientWidth})`
      );
      assert(
        Math.abs(resizeMetrics.pinSpacerWidth - step.width) <= 1,
        `[Resize ${step.name}] .pin-spacer width re-calibrated dynamically to ${step.width}px (got: ${resizeMetrics.pinSpacerWidth}px)`
      );
    }

    await resizePage.close();

  } finally {
    await browser.close();
    server.close();
  }

  console.log(`\n======================================================================`);
  console.log(`CHALLENGE SUMMARY: ${results.passed.length} passed, ${results.failed.length} failed`);
  console.log(`======================================================================\n`);

  if (results.failed.length > 0) {
    process.exit(1);
  }
}

runEmpiricalChallenge().catch(err => {
  console.error('[CHALLENGE RUNNER FATAL ERROR]', err);
  process.exit(1);
});
