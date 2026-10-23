const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SITE_DIR = path.join(__dirname, 'site');
const PORT = 8091;

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

async function runAdversarialProbes() {
  const server = createServer();
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Probe server running at http://localhost:${PORT}/`);

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
    await page.goto(`http://localhost:${PORT}/index.html`);
    await page.waitForTimeout(1000);

    // PROBE 1: CTA Timeout Race Condition
    console.log('\n--- Probe 1: CTA Button Feedback Race Condition on Rapid Piece Switch ---');
    const ctaRaceResult = await page.evaluate(async () => {
      const col = document.getElementById('collection');
      const acquireBtn = col.querySelector('.acquire-cta');
      const piece1Btn = col.querySelector('[data-piece-select="1"]');
      const piece2Btn = col.querySelector('[data-piece-select="2"]');

      // Click Piece 1
      piece1Btn.click();
      await new Promise(r => setTimeout(r, 100));

      // Click Acquire CTA on Piece 1 ($4,800)
      acquireBtn.click();
      const textDuringFeedback = acquireBtn.textContent.trim();

      // Within 300ms, switch to Piece 2 ($3,650)
      await new Promise(r => setTimeout(r, 300));
      piece2Btn.click();

      // Wait 2600ms for the original 2400ms setTimeout to fire
      await new Promise(r => setTimeout(r, 2600));

      const textAfterTimeout = acquireBtn.textContent.trim();
      const isRed = acquireBtn.classList.contains('bg-[#d53527]');

      return {
        textDuringFeedback,
        textAfterTimeout,
        isRed
      };
    });

    console.log('  textDuringFeedback:', ctaRaceResult.textDuringFeedback);
    console.log('  textAfterTimeout:', ctaRaceResult.textAfterTimeout);
    assert(ctaRaceResult.textAfterTimeout.includes('$3,650'), `CTA button correctly reflects Piece 2 price ($3,650) after timeout (got: "${ctaRaceResult.textAfterTimeout}")`);
    assert(!ctaRaceResult.isRed, 'CTA button does not remain stuck with feedback red background');

    // PROBE 2: Mobile Carousel Alt Attributes Parity on Piece Switch
    console.log('\n--- Probe 2: Mobile Carousel Image Alt Text Parity on Piece Switch ---');
    const mobileAltResult = await page.evaluate(async () => {
      const col = document.getElementById('collection');
      const piece2Btn = col.querySelector('[data-piece-select="2"]');
      piece2Btn.click();
      await new Promise(r => setTimeout(r, 150));

      const m01 = col.querySelector('#mobileImg01');
      const m02 = col.querySelector('#mobileImg02');
      const m03 = col.querySelector('#mobileImg03');
      const m04 = col.querySelector('#mobileImg04');

      return {
        alt01: m01 ? m01.getAttribute('alt') : null,
        alt02: m02 ? m02.getAttribute('alt') : null,
        alt03: m03 ? m03.getAttribute('alt') : null,
        alt04: m04 ? m04.getAttribute('alt') : null
      };
    });

    console.log('  Mobile alts for Piece 2:', mobileAltResult);
    assert(mobileAltResult.alt01 && mobileAltResult.alt01.includes('Le Monde Blazer'), `mobileImg01 alt updated to "Le Monde Blazer" (got: "${mobileAltResult.alt01}")`);
    assert(mobileAltResult.alt02 && mobileAltResult.alt02.includes('Le Monde Blazer'), `mobileImg02 alt updated to "Le Monde Blazer" (got: "${mobileAltResult.alt02}")`);

    // PROBE 3: Mobile Touch Carousel Scroll Reset on Piece Switch
    console.log('\n--- Probe 3: Mobile Touch Carousel Scroll Reset on Piece Switch ---');
    await page.setViewportSize({ width: 390, height: 844 });
    const carouselResetResult = await page.evaluate(async () => {
      const col = document.getElementById('collection');
      const carousel = col.querySelector('.pdp-mobile-carousel');
      if (!carousel) return { hasCarousel: false };

      // Manually scroll to slide 3
      carousel.scrollLeft = 500;
      await new Promise(r => setTimeout(r, 100));
      const scrolledLeft = carousel.scrollLeft;

      // Now switch piece to 3
      const piece3Btn = col.querySelector('[data-piece-select="3"]');
      if (piece3Btn) piece3Btn.click();
      await new Promise(r => setTimeout(r, 300));

      return {
        hasCarousel: true,
        scrolledLeft,
        finalLeft: carousel.scrollLeft
      };
    });

    console.log('  Carousel scroll result:', carouselResetResult);
    assert(carouselResetResult.finalLeft === 0, `Mobile carousel scroll resets to 0 on piece switch (got: ${carouselResetResult.finalLeft})`);

    // PROBE 4: W3C Radio Group Arrow Key Navigation & Roving Tabindex on Swatches
    console.log('\n--- Probe 4: Fabric Swatches Radio Group Keyboard Arrow Navigation ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    const radioKeyResult = await page.evaluate(async () => {
      const swatches = Array.from(document.querySelectorAll('.fabric-swatch'));
      if (swatches.length < 2) return { hasSwatches: false };

      // Reset to first swatch
      swatches[0].click();
      swatches[0].focus();
      await new Promise(r => setTimeout(r, 50));

      const tabIndicesInitial = swatches.map(s => s.getAttribute('tabindex'));
      
      // Dispatch ArrowRight
      swatches[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      await new Promise(r => setTimeout(r, 100));

      const activeAfterRight = swatches.map(s => ({
        checked: s.getAttribute('aria-checked'),
        isActive: s.classList.contains('is-active'),
        tabindex: s.getAttribute('tabindex'),
        isFocused: document.activeElement === s
      }));

      return {
        hasSwatches: true,
        tabIndicesInitial,
        activeAfterRight
      };
    });

    console.log('  Radio key navigation result:', radioKeyResult);
    assert(radioKeyResult.activeAfterRight && radioKeyResult.activeAfterRight[1].checked === 'true', 'ArrowRight activates next radio swatch (Ink)');

    await page.close();
  } catch (err) {
    console.error('Fatal probe error:', err);
    results.failed.push('Fatal probe error: ' + err.message);
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n=======================================');
  console.log(`PROBE SUMMARY: ${results.passed.length} passed, ${results.failed.length} failed`);
  console.log('=======================================');
}

runAdversarialProbes();
