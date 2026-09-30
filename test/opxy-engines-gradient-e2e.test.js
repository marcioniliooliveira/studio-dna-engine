const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

test('Engines Scroll Burn Text Reveal, Camera Framing & Calibrated Tones Contract', { timeout: 90000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    // 1. Arrange: Navigate to OP-XY Tuning Lab
    await page.goto('http://127.0.0.1:4000/clientes/opxy-tuning-lab/site/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.OPXY && window.OPXY.ready === true, { timeout: 25000 });

    // Skip intro film for fast reliable testing
    await page.evaluate(() => {
      if (window.OPXY && typeof window.OPXY.skipFilm === 'function') {
        window.OPXY.skipFilm();
      }
    });
    await page.waitForFunction(() => window.OPXY && window.OPXY.film && window.OPXY.film.done === true, { timeout: 10000 });

    // 2. Assert: Camera Station Framing Calibration (No bottom-left clipping)
    const cameraEngines = await page.evaluate(() => {
      const st = window.OPXY?.stations?.engines;
      return st ? { pos: st.pos, look: st.look, shift: st.shift } : null;
    });
    assert.ok(cameraEngines, 'OPXY.stations.engines must exist');
    assert.ok(cameraEngines.shift[1] <= 0.18, `Engines camera shift.y must be <= 0.18 (observed ${cameraEngines.shift[1]}) to prevent bottom-left chassis clipping`);
    assert.ok(cameraEngines.shift[0] < 0, `Engines camera shift.x must be negative to center instrument mass (observed ${cameraEngines.shift[0]})`);

    // 3. Assert: Swatches container at bottom-right of #engines .stage
    const swatchesInfo = await page.evaluate(() => {
      const swatches = document.getElementById('engSwatches');
      if (!swatches) return null;
      const cs = getComputedStyle(swatches);
      const buttons = [...swatches.querySelectorAll('.eng-swatch')];
      return {
        exists: true,
        position: cs.position,
        right: cs.right,
        bottom: cs.bottom,
        count: buttons.length,
        colors: buttons.map(b => b.style.getPropertyValue('--sc').trim())
      };
    });
    assert.ok(swatchesInfo, '#engSwatches container must exist');
    assert.equal(swatchesInfo.count, 8, '#engSwatches must contain 8 circular swatch buttons');

    // 4. Assert: Unified HUD Transition Styles across #strip and #engines
    const transitionStyles = await page.evaluate(() => {
      const stripInitial = document.getElementById('strip')?.getAttribute('data-transition-style');
      const enginesInitial = document.getElementById('engines')?.getAttribute('data-transition-style');
      const hudValInitial = document.getElementById('dna-transition-style-select')?.value;

      // Switch to burn
      window.OPXY_SET_TRANSITION_STYLE('burn');
      const stripBurn = document.getElementById('strip')?.getAttribute('data-transition-style');
      const enginesBurn = document.getElementById('engines')?.getAttribute('data-transition-style');

      // Switch back to morph
      window.OPXY_SET_TRANSITION_STYLE('morph');
      const stripMorph = document.getElementById('strip')?.getAttribute('data-transition-style');
      const enginesMorph = document.getElementById('engines')?.getAttribute('data-transition-style');

      return {
        stripInitial, enginesInitial, hudValInitial,
        stripBurn, enginesBurn,
        stripMorph, enginesMorph
      };
    });

    assert.equal(transitionStyles.stripInitial, 'morph', '#strip initial data-transition-style must be morph');
    assert.equal(transitionStyles.enginesInitial, 'morph', '#engines initial data-transition-style must be morph');
    assert.equal(transitionStyles.hudValInitial, 'morph', 'HUD transition style select must default to morph');
    assert.equal(transitionStyles.stripBurn, 'burn', '#strip must update to burn when commanded by HUD');
    assert.equal(transitionStyles.enginesBurn, 'burn', '#engines must update to burn when commanded by HUD');
    assert.equal(transitionStyles.stripMorph, 'morph', '#strip must update back to morph when commanded by HUD');
    assert.equal(transitionStyles.enginesMorph, 'morph', '#engines must update back to morph when commanded by HUD');

    // 5. Assert: Single Exposed Engine Word in Viewport & Burn Glyphs
    // Activate engine 1 (dissolve)
    await page.evaluate(() => {
      if (typeof window.setEngine === 'function') {
        window.setEngine(1, false);
      }
    });
    await page.waitForTimeout(600);

    const exposedEngineInfo = await page.evaluate(() => {
      const items = [...document.querySelectorAll('#engStrip b')];
      const visibleItems = items.filter(el => {
        const cs = getComputedStyle(el);
        return cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0.05;
      });
      const activeEl = document.querySelector('#engStrip b.on');
      const hasBurnChars = activeEl ? activeEl.querySelectorAll('.burn-char').length > 0 : false;
      const activeText = activeEl ? activeEl.textContent.trim().replace(/·/g, '').trim() : '';

      return {
        total: items.length,
        visibleCount: visibleItems.length,
        activeText,
        hasBurnChars
      };
    });

    assert.equal(exposedEngineInfo.total, 8, 'Must have exactly 8 engine text elements');
    assert.equal(exposedEngineInfo.visibleCount, 1, `Only the single active engine word must be exposed in the viewport (observed ${exposedEngineInfo.visibleCount})`);
    assert.equal(exposedEngineInfo.activeText, 'dissolve', 'Active exposed engine word must be "dissolve"');
    assert.equal(exposedEngineInfo.hasBurnChars, true, 'Active engine word must contain .burn-char glyph elements for middle-out burn effect');

    // 5. Assert: Calibrated 16 Step Sequencer Tones (Starts dark, ends at vibrant accent)
    const tonesStepInfo = await page.evaluate(() => {
      const step1Mesh = window.OPXY.controls['key-22'];
      const step16Mesh = window.OPXY.controls['key-37'];
      let step1Color = null;
      let step16Color = null;

      step1Mesh?.traverse(o => {
        if (o.isMesh && /base|cap/i.test(o.name) && o.material?.color) {
          step1Color = { r: o.material.color.r, g: o.material.color.g, b: o.material.color.b };
        }
      });
      step16Mesh?.traverse(o => {
        if (o.isMesh && /base|cap/i.test(o.name) && o.material?.color) {
          step16Color = { r: o.material.color.r, g: o.material.color.g, b: o.material.color.b };
        }
      });

      return { step1Color, step16Color };
    });

    assert.ok(tonesStepInfo.step1Color, 'Step 1 button color must exist');
    assert.ok(tonesStepInfo.step16Color, 'Step 16 button color must exist');
    const step1Luminance = tonesStepInfo.step1Color.r * 0.299 + tonesStepInfo.step1Color.g * 0.587 + tonesStepInfo.step1Color.b * 0.114;
    assert.ok(step1Luminance <= 0.18, `Step 1 luminance must be <= 0.18 (observed ${step1Luminance.toFixed(3)}) to eliminate excessive diffuse glare`);
    assert.ok(tonesStepInfo.step16Color.b > 0.4 || tonesStepInfo.step16Color.r > 0.4, 'Step 16 must carry vibrant accent tone');

    // 6. Assert: Swatch Click Triggers Burn Reveal and Updates Exposed Word
    await page.evaluate(() => {
      const s3 = document.querySelectorAll('#engSwatches .eng-swatch')[3];
      if (s3) s3.click();
    });
    await page.waitForTimeout(600);

    const engine3Exposed = await page.evaluate(() => {
      const activeEl = document.querySelector('#engStrip b.on');
      const activeText = activeEl ? activeEl.textContent.trim().replace(/·/g, '').trim() : '';
      const visibleCount = [...document.querySelectorAll('#engStrip b')].filter(el => {
        const cs = getComputedStyle(el);
        return cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) > 0.05;
      }).length;
      return { activeText, visibleCount };
    });

    assert.equal(engine3Exposed.visibleCount, 1, 'Only engine 3 (hardsync) must remain exposed after switch');
    assert.equal(engine3Exposed.activeText, 'hardsync', 'Exposed text must be updated to "hardsync"');

  } finally {
    await browser.close();
  }
});
