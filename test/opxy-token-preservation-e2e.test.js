const { test } = require('node:test');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');

test('Token Preservation Contract: Engine dynamic color change applies ONLY within #engines section and restores active tokens upon exit', { timeout: 90000 }, async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  try {
    // 1. Navigate and wait for 3D readiness
    await page.goto('http://127.0.0.1:4000/clientes/opxy-tuning-lab/site/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.OPXY && window.OPXY.ready === true, { timeout: 25000 });

    // Skip intro film
    await page.evaluate(() => {
      if (window.OPXY && typeof window.OPXY.skipFilm === 'function') {
        window.OPXY.skipFilm();
      }
    });
    await page.waitForTimeout(500);

    // 2. Apply Aura preset (matching user tokens)
    await page.evaluate(() => {
      window.OPXY_APPLY_PRESET('aura');
    });
    await page.waitForTimeout(600);

    // Capture baseline token colors for Step 1 (key-22) and Step 16 (key-37)
    const tokenColors = await page.evaluate(() => {
      let step1 = null, step16 = null;
      window.OPXY.controls['key-22'].traverse(o => {
        if (o.isMesh && /base|cap/i.test(o.name) && o.material?.color) {
          step1 = { r: +o.material.color.r.toFixed(3), g: +o.material.color.g.toFixed(3), b: +o.material.color.b.toFixed(3) };
        }
      });
      window.OPXY.controls['key-37'].traverse(o => {
        if (o.isMesh && /base|cap/i.test(o.name) && o.material?.color) {
          step16 = { r: +o.material.color.r.toFixed(3), g: +o.material.color.g.toFixed(3), b: +o.material.color.b.toFixed(3) };
        }
      });
      return { step1, step16 };
    });

    assert.ok(tokenColors.step1, 'Baseline token color for step 1 must exist');
    assert.ok(tokenColors.step16, 'Baseline token color for step 16 must exist');
    assert.ok(tokenColors.step16.b > 0.5, 'Aura preset step 16 should carry electric blue/violet accent');

    // 3. Scroll into #engines and activate engine 3 (hardsync, orange)
    await page.evaluate(async () => {
      const eng = document.getElementById('engines');
      window.lenis.scrollTo(eng.offsetTop + 200, { immediate: true });
      await new Promise(r => setTimeout(r, 400));
      window.OPXY_PAGE.measure();
      window.setEngine(3, false);
    });
    await page.waitForTimeout(600);

    const enginesState = await page.evaluate(() => {
      let step1 = null, step16 = null;
      window.OPXY.controls['key-22'].traverse(o => {
        if (o.isMesh && /base|cap/i.test(o.name) && o.material?.color) {
          step1 = { r: +o.material.color.r.toFixed(3), g: +o.material.color.g.toFixed(3), b: +o.material.color.b.toFixed(3) };
        }
      });
      window.OPXY.controls['key-37'].traverse(o => {
        if (o.isMesh && /base|cap/i.test(o.name) && o.material?.color) {
          step16 = { r: +o.material.color.r.toFixed(3), g: +o.material.color.g.toFixed(3), b: +o.material.color.b.toFixed(3) };
        }
      });
      return {
        beat: window.OPXY_PAGE.beat,
        glowActive: window.OPXY._engineGlowActive,
        emissiveIntensity: window.OPXY.display?.emissiveIntensity,
        step1,
        step16
      };
    });

    assert.equal(enginesState.beat, 'engines', 'Beat must be engines');
    assert.equal(enginesState.glowActive, true, 'Engine glow must be active while in #engines');

    // 4. Scroll OUT forward to #seq
    await page.evaluate(async () => {
      const seq = document.getElementById('seq');
      window.lenis.scrollTo(seq.offsetTop + 100, { immediate: true });
      await new Promise(r => setTimeout(r, 400));
      window.OPXY_PAGE.measure();
    });
    await page.waitForTimeout(600);

    const seqState = await page.evaluate(() => {
      let step1 = null, step16 = null;
      window.OPXY.controls['key-22'].traverse(o => {
        if (o.isMesh && /base|cap/i.test(o.name) && o.material?.color) {
          step1 = { r: +o.material.color.r.toFixed(3), g: +o.material.color.g.toFixed(3), b: +o.material.color.b.toFixed(3) };
        }
      });
      window.OPXY.controls['key-37'].traverse(o => {
        if (o.isMesh && /base|cap/i.test(o.name) && o.material?.color) {
          step16 = { r: +o.material.color.r.toFixed(3), g: +o.material.color.g.toFixed(3), b: +o.material.color.b.toFixed(3) };
        }
      });
      return {
        beat: window.OPXY_PAGE.beat,
        glowActive: window.OPXY._engineGlowActive,
        step1,
        step16
      };
    });

    assert.equal(seqState.beat, 'seq', 'Beat must be seq');
    assert.equal(seqState.glowActive, false, 'Engine glow must be deactivated after leaving #engines');
    assert.deepEqual(seqState.step1, tokenColors.step1, 'Step 1 color must be restored to exact token color in #seq');
    assert.deepEqual(seqState.step16, tokenColors.step16, 'Step 16 color must be restored to exact token color in #seq');

    // 5. Scroll OUT backwards to #macro (above engines)
    await page.evaluate(async () => {
      const macro = document.getElementById('macro');
      window.lenis.scrollTo(macro.offsetTop + 100, { immediate: true });
      await new Promise(r => setTimeout(r, 400));
      window.OPXY_PAGE.measure();
    });
    await page.waitForTimeout(600);

    const macroState = await page.evaluate(() => {
      let step1 = null, step16 = null;
      window.OPXY.controls['key-22'].traverse(o => {
        if (o.isMesh && /base|cap/i.test(o.name) && o.material?.color) {
          step1 = { r: +o.material.color.r.toFixed(3), g: +o.material.color.g.toFixed(3), b: +o.material.color.b.toFixed(3) };
        }
      });
      window.OPXY.controls['key-37'].traverse(o => {
        if (o.isMesh && /base|cap/i.test(o.name) && o.material?.color) {
          step16 = { r: +o.material.color.r.toFixed(3), g: +o.material.color.g.toFixed(3), b: +o.material.color.b.toFixed(3) };
        }
      });
      return {
        beat: window.OPXY_PAGE.beat,
        glowActive: window.OPXY._engineGlowActive,
        step1,
        step16
      };
    });

    assert.equal(macroState.beat, 'macro', 'Beat must be macro');
    assert.equal(macroState.glowActive, false, 'Engine glow must remain deactivated in #macro');
    assert.deepEqual(macroState.step1, tokenColors.step1, 'Step 1 color must be restored to exact token color in #macro');
    assert.deepEqual(macroState.step16, tokenColors.step16, 'Step 16 color must be restored to exact token color in #macro');

  } finally {
    await browser.close();
  }
});
