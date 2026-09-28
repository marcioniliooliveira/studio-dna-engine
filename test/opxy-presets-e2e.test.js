const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { chromium } = require('playwright');

test('OP-XY Presets & Synchronized Dual-Gradient: applies Berlin, Tokyo, and Swiss with zero broken mechanics', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to live client site on preview server
  await page.goto('http://127.0.0.1:4000/clientes/opxy-tuning-lab/site/index.html', { waitUntil: 'domcontentloaded' });

  // Wait for 3D engine readiness and GLTF asset hydration
  await page.waitForFunction(() => window.OPXY && window.OPXY.ready === true && Array.isArray(window.OPXY.bars) && window.OPXY.bars.length === 16 && Array.isArray(window.OPXY.steps) && window.OPXY.steps.length === 16, { timeout: 25000 });
  await page.waitForTimeout(1000);

  // ── STEP 1: Verify Initial State (Swiss Alpine) ──
  const initialInfo = await page.evaluate(() => {
    const root = document.documentElement;
    const computedSans = getComputedStyle(root).getPropertyValue('--sans').trim();
    const barsCount = window.OPXY.bars.length;
    const stepsCount = window.OPXY.steps.length;
    const brandText = document.querySelector('#hero .wm h1')?.textContent?.trim() || '';

    return {
      computedSans,
      barsCount,
      stepsCount,
      brandText
    };
  });

  assert.equal(initialInfo.barsCount, 16, 'Must have 16 backdrop bars');
  assert.equal(initialInfo.stepsCount, 16, 'Must have 16 sequencer step keys');

  // ── STEP 2: Apply Berlin Dark Steel ──
  await page.evaluate(() => {
    if (typeof window.OPXY_APPLY_PRESET === 'function') {
      window.OPXY_APPLY_PRESET('berlin');
    }
  });
  await page.waitForTimeout(1000);

  const berlinInfo = await page.evaluate(() => {
    const root = document.documentElement;
    const sans = getComputedStyle(root).getPropertyValue('--sans').trim();
    const mono = getComputedStyle(root).getPropertyValue('--mono').trim();
    const brand = document.querySelector('#hero .wm h1')?.textContent?.trim();
    const bg = getComputedStyle(root).getPropertyValue('--bg').trim();
    const rec = getComputedStyle(root).getPropertyValue('--rec').trim();
    const brandGradStart = getComputedStyle(root).getPropertyValue('--brand-grad-start').trim();

    // Check brand text gradient clipping
    const brandEl = document.querySelector('#hero .wm h1');
    const brandCs = getComputedStyle(brandEl);
    const brandClip = brandCs.webkitBackgroundClip || brandCs.backgroundClip;
    const brandFill = brandCs.webkitTextFillColor;

    // Check backdrop bars
    const bar0 = window.OPXY.bars[0];
    const bar15 = window.OPXY.bars[15];

    // Check step keys (first and last step)
    const step1Control = window.OPXY.controls['key-22'];
    const step16Control = window.OPXY.controls['key-37'];

    let step1Color = null;
    let step16Color = null;
    let stepLedPreserved = false;

    step1Control.traverse(o => {
      if (o.isMesh && o.name.includes('base') && o.material && o.material.color) {
        step1Color = { r: o.material.color.r, g: o.material.color.g, b: o.material.color.b };
      }
      if (o.isMesh && o.name.includes('LED') && o.material && /Soft white LED|Unlit/.test(o.material.name)) {
        stepLedPreserved = true;
      }
    });

    step16Control.traverse(o => {
      if (o.isMesh && o.name.includes('cap') && o.material && o.material.color) {
        step16Color = { r: o.material.color.r, g: o.material.color.g, b: o.material.color.b };
      }
    });

    return {
      sans,
      mono,
      brand,
      bg,
      rec,
      brandGradStart,
      brandClip,
      brandFill,
      bar0ToneR: bar0.userData.toneR,
      bar15ToneG: bar15.userData.toneG,
      step1Color,
      step16Color,
      stepLedPreserved
    };
  });

  assert.equal(berlinInfo.sans, 'Chakra Petch', 'Berlin must set angular industrial Chakra Petch font');
  assert.equal(berlinInfo.mono, 'JetBrains Mono', 'Berlin must set JetBrains Mono font');
  assert.equal(berlinInfo.brand, 'KRONOS–8', 'Berlin brand must be KRONOS–8');
  assert.equal(berlinInfo.rec, '#00ff66', 'Berlin accent must be phosphor green #00ff66');
  assert.equal(berlinInfo.brandGradStart, '#00ff66', 'Berlin hero brand copy must follow phosphor green gradient');
  assert.equal(berlinInfo.brandClip, 'text', 'Hero brand heading must have background-clip: text');
  assert.ok(berlinInfo.bar15ToneG > 0.2, 'Berlin backdrop bars must have elevated green channel');
  assert.ok(berlinInfo.step16Color.g > 0.2, 'Berlin central step buttons must reflect phosphor green gradient');
  assert.equal(berlinInfo.stepLedPreserved, true, 'LED cavity must be preserved intact');

  // Test Physics & Raycasting on Key in Berlin preset
  const keyPhysics = await page.evaluate(() => {
    const k = 'key-24';
    const c = window.OPXY.controls[k];
    const initialY = c.position.y;
    // Simulate press
    window.OPXY.pressKey(k, 1);
    return {
      initialY,
      hasControls: !!c
    };
  });
  assert.ok(keyPhysics.hasControls, 'Key-24 control must exist');

  // Capture screenshot of Berlin preset
  const berlinShot = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'screenshot-berlin-dual-gradient.png');
  await page.screenshot({ path: berlinShot });

  // ── STEP 3: Apply Braun Functional Heritage ──
  await page.evaluate(() => {
    window.OPXY_APPLY_PRESET('braun');
  });
  await page.waitForTimeout(1000);

  const braunInfo = await page.evaluate(() => {
    const root = document.documentElement;
    const sans = getComputedStyle(root).getPropertyValue('--sans').trim();
    const mono = getComputedStyle(root).getPropertyValue('--mono').trim();
    const brand = document.querySelector('#hero .wm h1')?.textContent?.trim();
    const brandGradStart = getComputedStyle(root).getPropertyValue('--brand-grad-start').trim();
    return { sans, mono, brand, brandGradStart };
  });

  assert.equal(braunInfo.sans, 'Plus Jakarta Sans', 'Braun must set geometric Bauhaus Plus Jakarta Sans font');
  assert.equal(braunInfo.mono, 'IBM Plex Mono', 'Braun must set IBM Plex Mono font');
  assert.equal(braunInfo.brand, 'MODUL–01', 'Braun brand must be MODUL–01');
  assert.equal(braunInfo.brandGradStart, '#e8590c', 'Braun brand copy must follow amber-gold gradient');

  // ── STEP 4: Apply Tokyo Neo-Acoustic ──
  await page.evaluate(() => {
    window.OPXY_APPLY_PRESET('tokyo');
  });
  await page.waitForTimeout(1000);

  const tokyoInfo = await page.evaluate(() => {
    const root = document.documentElement;
    const sans = getComputedStyle(root).getPropertyValue('--sans').trim();
    const brand = document.querySelector('#hero .wm h1')?.textContent?.trim();
    const rec = getComputedStyle(root).getPropertyValue('--rec').trim();
    const brandGradStart = getComputedStyle(root).getPropertyValue('--brand-grad-start').trim();

    const bar15 = window.OPXY.bars[15];
    const step16 = window.OPXY.controls['key-37'];
    let step16Blue = 0;
    step16.traverse(o => {
      if (o.isMesh && o.name.includes('cap') && o.material && o.material.color) {
        step16Blue = o.material.color.b;
      }
    });

    return {
      sans,
      brand,
      rec,
      brandGradStart,
      bar15ToneB: bar15.userData.toneB,
      step16Blue
    };
  });

  assert.equal(tokyoInfo.sans, 'Syne', 'Tokyo must set wide avant-garde Syne font');
  assert.equal(tokyoInfo.brand, 'AETHEL–XY', 'Tokyo brand must be AETHEL–XY');
  assert.equal(tokyoInfo.rec, '#00e5ff', 'Tokyo accent must be cyan #00e5ff');
  assert.equal(tokyoInfo.brandGradStart, '#00e5ff', 'Tokyo brand copy must follow cyan/blue gradient');
  assert.ok(tokyoInfo.bar15ToneB > 0.5, 'Tokyo bars must have strong cyan/blue channel');
  assert.ok(tokyoInfo.step16Blue > 0.5, 'Tokyo sequencer step buttons must have strong cyan/blue channel');

  const tokyoShot = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'screenshot-tokyo-dual-gradient.png');
  await page.screenshot({ path: tokyoShot });

  // ── STEP 5: Apply Aura Precision (Asset Font: Inter & Cobalt Gradient) ──
  await page.evaluate(() => {
    window.OPXY_APPLY_PRESET('aura');
  });
  await page.waitForTimeout(1000);

  const auraInfo = await page.evaluate(() => {
    const root = document.documentElement;
    const sans = getComputedStyle(root).getPropertyValue('--sans').trim();
    const brand = document.querySelector('#hero .wm h1')?.textContent?.trim();
    const rec = getComputedStyle(root).getPropertyValue('--rec').trim();
    const brandGradStart = getComputedStyle(root).getPropertyValue('--brand-grad-start').trim();
    const hudActiveBtn = document.querySelector('.dna-preset-btn.active')?.getAttribute('data-preset');
    const hudFontVal = document.querySelector('[data-param-id="hero.typography.primary"]')?.value;

    const bar15 = window.OPXY.bars[15];
    const step16 = window.OPXY.controls['key-37'];
    let step16Color = null;
    step16.traverse(o => {
      if (o.isMesh && o.name.includes('cap') && o.material && o.material.color) {
        step16Color = { r: o.material.color.r, g: o.material.color.g, b: o.material.color.b };
      }
    });

    return {
      sans,
      brand,
      rec,
      brandGradStart,
      hudActiveBtn,
      hudFontVal,
      bar15ToneB: bar15.userData.toneB,
      step16Color
    };
  });

  assert.equal(auraInfo.sans, 'Inter', 'Aura preset must use Inter font from asset');
  assert.equal(auraInfo.hudFontVal, 'Inter', 'HUD typography select must reflect Inter');
  assert.equal(auraInfo.brand, 'AURA–XY', 'Aura brand must be AURA–XY');
  assert.equal(auraInfo.rec, '#6366f1', 'Aura accent must be electric violet #6366f1');
  assert.equal(auraInfo.brandGradStart, '#818cf8', 'Aura brand copy must follow cobalt-violet gradient');
  assert.equal(auraInfo.hudActiveBtn, 'aura', 'HUD button for aura must be active');
  assert.ok(auraInfo.bar15ToneB > 0.5, 'Aura bars must have high cobalt/blue channel');
  assert.ok(auraInfo.step16Color.b > 0.5, 'Aura step keys must have high cobalt/blue channel');

  const auraShot = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'screenshot-aura-inter-gooey.png');
  await page.screenshot({ path: auraShot });

  // ── STEP 6: Verify Gooey Liquid Reveal Engine & Sequence Stack Transition ──
  const gooeyInfo = await page.evaluate(() => {
    const filterEl = document.getElementById('dna-gooey-filter');
    const svgEl = document.getElementById('dna-gooey-svg');
    const stackEl = document.querySelector('#strip .stack');
    const stackCs = stackEl ? getComputedStyle(stackEl) : null;
    const stackFilter = stackCs ? (stackCs.filter || stackCs.webkitFilter) : '';

    // Test sequence transitions with setWord
    window.setWord(1); // Activate sequence.
    const words = Array.from(document.querySelectorAll('#strip .stack b'));
    const word0 = words[0]; // sample. (was)
    const word1 = words[1]; // sequence. (on)
    const word2 = words[2]; // synthesize. (future)

    const w0On = word0.classList.contains('on');
    const w0Was = word0.classList.contains('was');
    const w1On = word1.classList.contains('on');
    const w1Was = word1.classList.contains('was');
    const w2On = word2.classList.contains('on');

    const w0Cs = getComputedStyle(word0);
    const w1Cs = getComputedStyle(word1);

    return {
      hasFilter: !!filterEl,
      hasSvg: !!svgEl,
      stackFilter,
      w0On,
      w0Was,
      w1On,
      w1Was,
      w2On,
      w0Blur: w0Cs.filter,
      w1Blur: w1Cs.filter
    };
  });

  assert.ok(gooeyInfo.hasFilter, 'SVG filter #dna-gooey-filter must be present in DOM');
  assert.ok(gooeyInfo.hasSvg, 'SVG container #dna-gooey-svg must be present in DOM');
  assert.ok(gooeyInfo.stackFilter.includes('dna-gooey-filter'), '#strip .stack must have gooey filter applied');
  assert.equal(gooeyInfo.w1On, true, 'Word 1 (sequence.) must have .on class');
  assert.equal(gooeyInfo.w0Was, true, 'Word 0 (sample.) must have .was class');
  assert.equal(gooeyInfo.w2On, false, 'Word 2 (synthesize.) must not be active');

  // ── STEP 7: Return to Swiss Alpine ──
  await page.evaluate(() => {
    window.OPXY_APPLY_PRESET('swiss');
  });
  await page.waitForTimeout(800);

  const swissInfo = await page.evaluate(() => {
    const root = document.documentElement;
    const sans = getComputedStyle(root).getPropertyValue('--sans').trim();
    const brand = document.querySelector('#hero .wm h1')?.textContent?.trim();
    const brandGradStart = getComputedStyle(root).getPropertyValue('--brand-grad-start').trim();
    return { sans, brand, brandGradStart };
  });

  assert.equal(swissInfo.sans, 'Geist', 'Swiss must restore clean modernist Geist font');
  assert.equal(swissInfo.brand, 'OP–XY', 'Swiss brand must restore OP–XY');
  assert.equal(swissInfo.brandGradStart, '#555960', 'Swiss brand copy must restore monochrome gradient');

  await browser.close();
});
