const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SITE_DIR = path.join(__dirname, 'site');
const PORT = 8096;

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

async function runAdversarialHarness() {
  const server = createServer();
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Adversarial Test Server active at http://localhost:${PORT}/`);

  const browser = await chromium.launch({ headless: true });
  const results = { passed: [], failed: [] };

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      results.passed.push(message);
    } else {
      console.error(`  [FAIL] ${message}`);
      results.failed.push(message);
    }
  }

  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1800);

    // =========================================================================
    // Probe 1: Sub-pixel Pin Release Boundary Coordinates & Drop Analysis
    // =========================================================================
    console.log('\n--- Probe 1: Pin Release Boundary & Sub-Pixel Telemetry (1440x900) ---');

    const stInfo = await page.evaluate(() => {
      const ps = document.getElementById('productStory');
      const st = ScrollTrigger.getAll().find(s => s.vars && s.vars.trigger === ps);
      return {
        start: st.start,
        end: st.end,
        totalTravel: st.end - st.start
      };
    });
    console.log(`  ScrollTrigger Start: ${stInfo.start}, End: ${stInfo.end}, Distance: ${stInfo.totalTravel}px`);

    // Pre-scroll near the end of pin and let scrub settle
    await page.evaluate((y) => window.scrollTo(0, y), stInfo.end - 100);
    await page.waitForTimeout(800);

    const deltas = [-50, -25, -15, -10.5, -5.25, -2, -1, -0.5, 0, 0.5, 1, 2, 5.25, 10.5, 15, 25, 50];

    for (const d of deltas) {
      const targetY = stInfo.end + d;
      await page.evaluate((y) => window.scrollTo(0, y), targetY);
      await page.waitForTimeout(100);

      const m = await page.evaluate(() => {
        const ps = document.getElementById('productStory');
        const inner = ps ? ps.firstElementChild : null;
        const pdp = document.getElementById('atelierPDP');
        const track = document.getElementById('productTrack');
        const slide5 = track ? track.querySelector('.product-slide:nth-child(5)') : null;
        const st = ScrollTrigger.getAll().find(s => s.vars && s.vars.trigger === ps);

        const psR = ps.getBoundingClientRect();
        const innerR = inner.getBoundingClientRect();
        const pdpR = pdp.getBoundingClientRect();
        const s5R = slide5.getBoundingClientRect();

        return {
          scrollY: window.scrollY,
          stProgress: st.progress,
          stActive: st.isActive,
          psTop: psR.top,
          psBottom: psR.bottom,
          innerTop: innerR.top,
          slide5Left: s5R.left,
          pdpTop: pdpR.top,
          viewportHeight: window.innerHeight,
          gap: Math.abs(psR.bottom - pdpR.top)
        };
      });

      const dStr = d >= 0 ? `+${d}` : `${d}`;

      // 1. Slide 005 stationary check
      const slideStationary = Math.abs(m.slide5Left) < 0.2;
      assert(slideStationary, `delta=${dStr}: Slide 005 is stationary at 0.0px (got: ${m.slide5Left.toFixed(2)}px)`);

      // 2. stickyTop 0px drop check
      if (d <= 0) {
        assert(Math.abs(m.innerTop) < 0.2, `delta=${dStr}: innerTop is pinned at 0.0px (got: ${m.innerTop.toFixed(2)}px)`);
      } else {
        assert(m.innerTop <= 0.05, `delta=${dStr}: innerTop does not drop down into viewport (innerTop <= 0, got: ${m.innerTop.toFixed(2)}px)`);
        assert(Math.abs(m.innerTop - (-d)) < 1.0, `delta=${dStr}: innerTop moves up 1:1 with unpinned scroll (expected: ${-d}px, got: ${m.innerTop.toFixed(2)}px)`);
      }

      // 3. pdpTop matches window.innerHeight - delta
      if (d === 0) {
        assert(Math.abs(m.pdpTop - m.viewportHeight) < 0.5, `delta=0: pdpTop matches window.innerHeight exactly (${m.viewportHeight}px, got: ${m.pdpTop.toFixed(2)}px)`);
      } else if (d > 0) {
        const expectedPdp = m.viewportHeight - d;
        assert(Math.abs(m.pdpTop - expectedPdp) < 1.0, `delta=${dStr}: pdpTop matches innerHeight - delta (${expectedPdp}px, got: ${m.pdpTop.toFixed(2)}px)`);
      } else {
        const expectedPdp = m.viewportHeight - d;
        assert(Math.abs(m.pdpTop - expectedPdp) < 1.0, `delta=${dStr}: pdpTop is below viewport by -delta (${expectedPdp}px, got: ${m.pdpTop.toFixed(2)}px)`);
      }

      // 4. Section abutment at and after pin release
      if (d >= 0) {
        assert(m.gap < 0.5, `delta=${dStr}: Zero gap between #productStory bottom and #atelierPDP top (gap: ${m.gap.toFixed(3)}px)`);
      } else {
        const expectedGap = Math.abs(d);
        assert(Math.abs(m.gap - expectedGap) < 1.0, `delta=${dStr}: Distance to #atelierPDP top matches remaining pinned scroll distance (${expectedGap}px, got: ${m.gap.toFixed(3)}px)`);
      }
    }

    // =========================================================================
    // Probe 2: Multi-Resolution Viewport Invariance Check
    // =========================================================================
    console.log('\n--- Probe 2: Multi-Resolution Responsiveness & Pin-Spacer Integrity ---');

    const testResolutions = [
      { name: 'Desktop Ultra FHD', width: 1920, height: 1080 },
      { name: 'MacBook Standard', width: 1440, height: 900 },
      { name: 'Laptop Low-Height', width: 1366, height: 768 },
      { name: 'Compact 16:10', width: 1280, height: 800 },
      { name: 'QHD High-Res', width: 2560, height: 1440 }
    ];

    for (const res of testResolutions) {
      await page.setViewportSize({ width: res.width, height: res.height });
      await page.evaluate(() => ScrollTrigger.refresh());
      await page.waitForTimeout(300);

      const resMetrics = await page.evaluate(() => {
        const ps = document.getElementById('productStory');
        const st = ScrollTrigger.getAll().find(s => s.vars && s.vars.trigger === ps);
        const pinSpacer = ps.parentElement;

        return {
          stEnd: st.end,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          pinSpacerWidth: pinSpacer.getBoundingClientRect().width,
          windowWidth: window.innerWidth,
          windowHeight: window.innerHeight
        };
      });

      assert(resMetrics.scrollWidth === resMetrics.clientWidth, `${res.name} (${res.width}x${res.height}): Zero horizontal document overflow (scrollWidth === clientWidth: ${resMetrics.scrollWidth}px)`);
      assert(Math.abs(resMetrics.pinSpacerWidth - resMetrics.windowWidth) < 1.0, `${res.name}: PinSpacer width matches viewport width (${resMetrics.windowWidth}px, got: ${resMetrics.pinSpacerWidth.toFixed(1)}px)`);

      // Test pin release at delta = 0 for this resolution
      await page.evaluate((y) => window.scrollTo(0, y), resMetrics.stEnd);
      await page.waitForTimeout(150);

      const unpinCheck = await page.evaluate(() => {
        const ps = document.getElementById('productStory');
        const inner = ps.firstElementChild;
        const pdp = document.getElementById('atelierPDP');
        const track = document.getElementById('productTrack');
        const slide5 = track ? track.querySelector('.product-slide:nth-child(5)') : null;

        return {
          innerTop: inner.getBoundingClientRect().top,
          slide5Left: slide5.getBoundingClientRect().left,
          pdpTop: pdp.getBoundingClientRect().top,
          psBottom: ps.getBoundingClientRect().bottom,
          innerHeight: window.innerHeight
        };
      });

      assert(Math.abs(unpinCheck.innerTop) < 0.5, `${res.name}: At delta=0, innerTop is 0.0px (got: ${unpinCheck.innerTop.toFixed(2)}px)`);
      assert(Math.abs(unpinCheck.slide5Left) < 0.5, `${res.name}: At delta=0, Slide 005 is stationary at 0.0px (got: ${unpinCheck.slide5Left.toFixed(2)}px)`);
      assert(Math.abs(unpinCheck.pdpTop - unpinCheck.innerHeight) < 1.0, `${res.name}: At delta=0, pdpTop matches window.innerHeight (${unpinCheck.innerHeight}px, got: ${unpinCheck.pdpTop.toFixed(2)}px)`);
      assert(Math.abs(unpinCheck.psBottom - unpinCheck.pdpTop) < 0.5, `${res.name}: At delta=0, #productStory bottom perfectly abuts #atelierPDP top (diff: ${Math.abs(unpinCheck.psBottom - unpinCheck.pdpTop).toFixed(3)}px)`);
    }

    // =========================================================================
    // Probe 3: Scrub Settling & Resting Hold Phase Width
    // =========================================================================
    console.log('\n--- Probe 3: Scrub Settling & Resting Hold Stability ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => ScrollTrigger.refresh());
    await page.waitForTimeout(300);

    const holdInfo = await page.evaluate(() => {
      const ps = document.getElementById('productStory');
      const track = document.getElementById('productTrack');
      const st = ScrollTrigger.getAll().find(s => s.vars && s.vars.trigger === ps);

      const totalDistance = track.scrollWidth - window.innerWidth;
      const holdDistance = Math.round(window.innerHeight * 0.35);

      return {
        stStart: st.start,
        stEnd: st.end,
        totalDistance,
        holdDistance,
        travelRatio: totalDistance / (totalDistance + holdDistance)
      };
    });

    console.log(`  Track totalDistance: ${holdInfo.totalDistance}px, holdDistance: ${holdInfo.holdDistance}px, travelRatio: ${holdInfo.travelRatio.toFixed(4)}`);

    // Sample across the hold zone: 25%, 50%, 75%, 100% of the hold buffer
    const holdFractions = [0.25, 0.50, 0.75, 1.0];
    for (const frac of holdFractions) {
      const scrollY = (holdInfo.stEnd - holdInfo.holdDistance) + (holdInfo.holdDistance * frac);
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(100);

      const holdMetrics = await page.evaluate(() => {
        const track = document.getElementById('productTrack');
        const slide5 = track.querySelector('.product-slide:nth-child(5)');
        const counter = document.getElementById('productCounter').textContent.trim();
        const ps = document.getElementById('productStory');
        const st = ScrollTrigger.getAll().find(s => s.vars && s.vars.trigger === ps);

        return {
          slide5Left: slide5.getBoundingClientRect().left,
          counter,
          stProgress: st.progress,
          stActive: st.isActive
        };
      });

      assert(Math.abs(holdMetrics.slide5Left) < 0.2, `Hold buffer ${(frac * 100)}%: Slide 005 rests stationary at 0.0px (got: ${holdMetrics.slide5Left.toFixed(2)}px)`);
      assert(holdMetrics.counter === '05 / 05', `Hold buffer ${(frac * 100)}%: Counter indicates final slide "05 / 05" (got: "${holdMetrics.counter}")`);
      assert(holdMetrics.stActive === (frac < 1.0 ? true : false), `Hold buffer ${(frac * 100)}%: ScrollTrigger active status matches pin state (active: ${holdMetrics.stActive})`);
    }

    // =========================================================================
    // Probe 4: Bidirectional Reversibility & Hysteresis Test
    // =========================================================================
    console.log('\n--- Probe 4: Bidirectional Scroll & Pin Reversibility ---');

    // Scroll forward deep into #atelierPDP
    await page.evaluate((y) => window.scrollTo(0, y), holdInfo.stEnd + 150);
    await page.waitForTimeout(150);

    // Scroll backwards through boundary: +150 -> +50 -> +25 -> 0 -> -25 -> -50
    const reverseDeltas = [50, 25, 0, -25, -50];
    for (const d of reverseDeltas) {
      const y = holdInfo.stEnd + d;
      await page.evaluate((currY) => window.scrollTo(0, currY), y);
      await page.waitForTimeout(100);

      const revMetrics = await page.evaluate(() => {
        const ps = document.getElementById('productStory');
        const inner = ps.firstElementChild;
        const track = document.getElementById('productTrack');
        const slide5 = track.querySelector('.product-slide:nth-child(5)');
        const pdp = document.getElementById('atelierPDP');
        const st = ScrollTrigger.getAll().find(s => s.vars && s.vars.trigger === ps);

        return {
          innerTop: inner.getBoundingClientRect().top,
          slide5Left: slide5.getBoundingClientRect().left,
          pdpTop: pdp.getBoundingClientRect().top,
          stActive: st.isActive,
          innerHeight: window.innerHeight
        };
      });

      const dStr = d >= 0 ? `+${d}` : `${d}`;
      if (d <= 0) {
        assert(Math.abs(revMetrics.innerTop) < 0.5, `Reverse scroll delta=${dStr}: Pin re-engages cleanly with innerTop 0.0px (got: ${revMetrics.innerTop.toFixed(2)}px)`);
        assert(Math.abs(revMetrics.slide5Left) < 0.5, `Reverse scroll delta=${dStr}: Slide 005 remains centered at 0.0px (got: ${revMetrics.slide5Left.toFixed(2)}px)`);
      } else {
        assert(revMetrics.innerTop <= 0.05, `Reverse scroll delta=${dStr}: innerTop has zero drop (got: ${revMetrics.innerTop.toFixed(2)}px)`);
      }
    }

    // =========================================================================
    // Probe 5: Programmatic Slide 005 "View" Button Click Execution
    // =========================================================================
    console.log('\n--- Probe 5: Programmatic Slide 005 "View" CTA Navigation ---');

    // Reset to mid-pin (Slide 005)
    await page.evaluate((y) => window.scrollTo(0, y), holdInfo.stEnd - 100);
    await page.waitForTimeout(150);

    const clickRes = await page.evaluate(async () => {
      const slide5 = document.querySelector('#productStory .product-slide:nth-child(5)');
      const viewBtn = slide5 ? slide5.querySelector('.product-action') : null;
      if (!viewBtn) return { error: 'Slide 5 View button not found' };

      viewBtn.click();
      // Wait for smooth scroll or scrollIntoView completion
      await new Promise(r => setTimeout(r, 1200));

      const pdp = document.getElementById('atelierPDP');
      const activePieceTitle = document.querySelector('.piece-title') ? document.querySelector('.piece-title').textContent.trim() : '';

      return {
        pdpTop: pdp.getBoundingClientRect().top,
        activePieceTitle
      };
    });

    assert(!clickRes.error, 'Slide 5 View button exists and was clicked');
    assert(Math.abs(clickRes.pdpTop) <= 2.0, `Clicking View on Slide 005 scrolls directly to #atelierPDP top (pdpTop <= 2px, got: ${clickRes.pdpTop.toFixed(2)}px)`);
    assert(clickRes.activePieceTitle === 'The Silas Shirt', `Active piece in Atelier PDP is "The Silas Shirt" (got: "${clickRes.activePieceTitle}")`);

    // =========================================================================
    // Probe 6: High-Velocity Rapid Scrub Stress Test
    // =========================================================================
    console.log('\n--- Probe 6: High-Velocity Rapid Scrub Stress Test ---');

    // Rapid jump across the boundary in both directions 5 times with 0ms delay
    let rapidJumpsOk = true;
    for (let i = 0; i < 5; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), holdInfo.stEnd - 500);
      await page.evaluate((y) => window.scrollTo(0, y), holdInfo.stEnd + 500);
    }
    await page.waitForTimeout(300);

    const postStressMetrics = await page.evaluate((endY) => {
      window.scrollTo(0, endY);
      return new Promise(r => setTimeout(() => {
        const ps = document.getElementById('productStory');
        const inner = ps.firstElementChild;
        const pdp = document.getElementById('atelierPDP');
        const track = document.getElementById('productTrack');
        const slide5 = track.querySelector('.product-slide:nth-child(5)');

        r({
          innerTop: inner.getBoundingClientRect().top,
          slide5Left: slide5.getBoundingClientRect().left,
          pdpTop: pdp.getBoundingClientRect().top,
          windowHeight: window.innerHeight
        });
      }, 200));
    }, holdInfo.stEnd);

    assert(Math.abs(postStressMetrics.innerTop) < 0.5, `Post rapid-scrub stress at delta=0: innerTop remains 0.0px (got: ${postStressMetrics.innerTop.toFixed(2)}px)`);
    assert(Math.abs(postStressMetrics.slide5Left) < 0.5, `Post rapid-scrub stress at delta=0: Slide 005 remains 0.0px (got: ${postStressMetrics.slide5Left.toFixed(2)}px)`);
    assert(Math.abs(postStressMetrics.pdpTop - postStressMetrics.windowHeight) < 1.0, `Post rapid-scrub stress at delta=0: pdpTop aligns with innerHeight (got: ${postStressMetrics.pdpTop.toFixed(2)}px)`);

    await page.close();
  } catch (err) {
    console.error('Probe execution fatal error:', err);
    results.failed.push('Fatal execution error: ' + err.message);
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n=======================================');
  console.log(`ADVERSARIAL HARNESS SUMMARY: ${results.passed.length} passed, ${results.failed.length} failed`);
  console.log('=======================================');

  if (results.failed.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAdversarialHarness();
