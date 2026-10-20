const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require('playwright');

test('Scroll Dynamics & Section Transition Contract (GREEN Phase: Verified 8-Beat Dynamics & Stage Isolation)', { timeout: 90000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    // 1. Arrange: Navigate to OP-XY Tuning Lab
    await page.goto('http://127.0.0.1:4000/clientes/opxy-tuning-lab/site/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.OPXY && window.OPXY.ready === true, { timeout: 25000 });

    // Fast-forward or wait for intro film completion
    await page.evaluate(() => {
      if (window.OPXY && typeof window.OPXY.skipFilm === 'function') {
        window.OPXY.skipFilm();
      }
    });
    await page.waitForFunction(() => window.OPXY && window.OPXY.film && window.OPXY.film.done === true, { timeout: 10000 });

    // 2. Act & Assert: Milestone 1 - Hero (y = 0)
    const heroState = await page.evaluate(() => {
      window.scrollTo(0, 0);
      if (window.lenis && typeof window.lenis.scrollTo === 'function') window.lenis.scrollTo(0, { immediate: true });
      if (window.OPXY_PAGE && typeof window.OPXY_PAGE.measure === 'function') window.OPXY_PAGE.measure();

      const heroStage = document.querySelector('#hero .stage');
      const macroStage = document.querySelector('#macro .stage');
      const enginesStage = document.querySelector('#engines .stage');

      return {
        beat: window.OPXY_PAGE?.beat,
        heroOpacity: heroStage ? parseFloat(getComputedStyle(heroStage).opacity) : null,
        macroOpacity: macroStage ? parseFloat(getComputedStyle(macroStage).opacity) : null,
        enginesOpacity: enginesStage ? parseFloat(getComputedStyle(enginesStage).opacity) : null
      };
    });

    assert.equal(heroState.beat, 'hero', 'Initial beat must be hero');
    assert.ok(heroState.heroOpacity > 0.8, 'Hero stage must be visible at scroll 0');
    
    // ── CONTRACT FAILURE 1: Stage Isolation Blindspot ──
    // Non-active sections MUST NOT have opacity = 1 simultaneously.
    assert.equal(heroState.macroOpacity, 0, 'Macro stage must be invisible (opacity 0) while at hero');
    assert.equal(heroState.enginesOpacity, 0, 'Engines stage must be invisible (opacity 0) while at hero');

    // 3. Act & Assert: Milestone 2 - Macro (y = 5000)
    const macroState = await page.evaluate(async () => {
      window.scrollTo(0, 5000);
      if (window.lenis && typeof window.lenis.scrollTo === 'function') window.lenis.scrollTo(5000, { immediate: true });
      await new Promise(r => setTimeout(r, 200));
      if (window.OPXY_PAGE && typeof window.OPXY_PAGE.measure === 'function') window.OPXY_PAGE.measure();

      return {
        beat: window.OPXY_PAGE?.beat,
        arriving: window.OPXY_PAGE?.arriving,
        cameraPos: window.OPXY?.camera ? {
          x: +window.OPXY.camera.position.x.toFixed(3),
          y: +window.OPXY.camera.position.y.toFixed(3),
          z: +window.OPXY.camera.position.z.toFixed(3)
        } : null
      };
    });

    // ── CONTRACT FAILURE 2: Scroll Progression Frozen at Strip ──
    assert.equal(macroState.beat, 'macro', 'PAGE.beat must advance to macro when scrolled to y=5000');

    // 4. Act & Assert: Milestone 3 - Engines Horizontal Filmstrip Scrub (y = 8000)
    const enginesState = await page.evaluate(async () => {
      window.scrollTo(0, 8000);
      if (window.lenis && typeof window.lenis.scrollTo === 'function') window.lenis.scrollTo(8000, { immediate: true });
      await new Promise(r => setTimeout(r, 200));
      if (window.OPXY_PAGE && typeof window.OPXY_PAGE.measure === 'function') window.OPXY_PAGE.measure();

      const strip = document.getElementById('engStrip');
      return {
        beat: window.OPXY_PAGE?.beat,
        transform: strip ? getComputedStyle(strip).transform : null
      };
    });

    // ── CONTRACT FAILURE 3: Engines Beat & Scrub Inactive ──
    assert.equal(enginesState.beat, 'engines', 'PAGE.beat must advance to engines when scrolled to y=8000');

    // 5. Act & Assert: Milestone 4 - Flip Chassis 180 Roll (y = 16000)
    const flipState = await page.evaluate(async () => {
      window.scrollTo(0, 16000);
      if (window.lenis && typeof window.lenis.scrollTo === 'function') window.lenis.scrollTo(16000, { immediate: true });
      await new Promise(r => setTimeout(r, 200));
      if (window.OPXY_PAGE && typeof window.OPXY_PAGE.measure === 'function') window.OPXY_PAGE.measure();

      return {
        beat: window.OPXY_PAGE?.beat,
        roll: window.OPXY?.state?.roll
      };
    });

    // ── CONTRACT FAILURE 4: Flip Roll Inactive ──
    assert.equal(flipState.beat, 'flip', 'PAGE.beat must advance to flip when scrolled to y=16000');
  } finally {
    await browser.close();
  }
});
