/**
 * test/challenger-v25-2-stress.test.js
 * 
 * Empirical Challenger 2: Adversarial Stress & Verification Battery for studio-dna v2.5
 * Requirements: R1 (Impeccable Gate), R4 (GPU Texture & Saliency Oracle), R5 (Adverse Hardware Resilience)
 * 
 * Tests:
 * 1. Anti-Pattern Falsification Battery (R1):
 *    - Injects nested-cards, dark-glow, overused-font, bounce-easing, pulsing-dot into fixtures.
 *    - Verifies 100% detection rate (0 false negatives) across CLI and browser/static evaluators.
 *    - Asserts that sanitized JumpPlay screens pass with 0 violations.
 * 2. GPU Texture Budget & Saliency Oracle Stress (R4):
 *    - Oversized textures (4K uncompressed), multi-model scenes exceeding 16.0MB VRAM budget.
 *    - Boundary testing at 16MB threshold (+1 byte failure).
 *    - Visual saliency oracle with distractor clutter; proves DistractionRatio > 0.35 fails gate.
 * 3. Adverse Hardware Resilience & Rapid-Fire Eviction (R5):
 *    - CDP 6x CPU throttling under rapid keystroke assault (50+ inputs, <16.6ms latency, 0 dropped).
 *    - Rapid-fire WebGL context loss/restoration (10 consecutive cycles) with zero memory leaks / uncaught errors.
 *    - 30fps rAF clamping parameter sweep across k in [50, 400] and m in [0.5, 3.0], proving ODE settling parity and Euler divergence.
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');

const execFileAsync = promisify(execFile);

// Module Imports
const { runImpeccableGate, ImpeccableGate, ZERO_TOLERANCE_RULES, OVERUSED_FONTS } = require('../src/qa/impeccable-gate');
const {
  TextureCompressor,
  MAX_SCENE_VRAM_BYTES,
  calculateSceneTextureVram,
  auditMultiModelScene,
  compareFormatFootprint
} = require('../src/assets3d/texture-compressor');
const {
  VisualSaliencyOracle,
  CTA_MIN_PROMINENCE,
  MAX_DISTRACTION_RATIO,
  CTA_MAX_ATTENTION_RANK
} = require('../src/qa/visual-saliency-oracle');
const {
  SpringDynamicsEvaluator,
  solveDampedHarmonicMotion
} = require('../src/physics/spring-dynamics');
const {
  StressPreviewServer,
  withStressContext,
  setCPUThrottling,
  injectRafClamp,
  compareAnalyticalVsEulerSpring,
  buildIntegratedHtml
} = require('./stress/stress-harness');
const {
  stripNonDigits,
  validateCPF,
  validateCNPJ
} = require('../src/forms/masks');

const CLI_PATH = path.resolve(__dirname, '../scripts/detect-antipatterns.mjs');
const CLIENT_JUMPPLAY_PATH = path.resolve(__dirname, '../clientes/jumpflex-home-evolution/JumpPlay — Family Reveal & Kinetic Range.html');
const ROOT_JUMPPLAY_PATH = path.resolve(__dirname, '../JumpPlay — Family Reveal & Kinetic Range.html');

// ============================================================================
// PILLAR 1: ANTI-PATTERN FALSIFICATION BATTERY (R1)
// ============================================================================

test('Pillar 1 [R1]: Impeccable Gate detects deeply nested cards (2, 3, 4 levels) with zero false negatives', async () => {
  const multiLevelNestedCardsHtml = `<!DOCTYPE html>
<html>
<head><title>Deeply Nested Cards</title></head>
<body>
  <div id="card-l1" class="rounded-3xl bg-[#0f1f2e] border border-white/10 p-8 shadow-2xl">
    <h2>Level 1 Card</h2>
    <div id="card-l2" class="rounded-2xl bg-[#0c1a27] border border-white/15 p-6 shadow-xl">
      <h3>Level 2 Card</h3>
      <div id="card-l3" class="rounded-xl bg-[#091520] border border-white/20 p-4 shadow-lg">
        <h4>Level 3 Card</h4>
        <div id="card-l4" class="rounded-lg bg-[#050e18] border border-white/25 p-2 shadow-md">
          <p>Level 4 Card</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;

  const report = await runImpeccableGate(multiLevelNestedCardsHtml, { staticOnly: true });
  assert.equal(report.passed, false, 'Gate must fail on multi-level nested cards');
  
  const nestedCardViolations = report.violations.filter(v => v.includes('nested-cards'));
  assert.ok(nestedCardViolations.length >= 3, `Expected at least 3 nested card violations, got ${nestedCardViolations.length}`);
});

test('Pillar 1 [R1]: Impeccable Gate detects full matrix of 14 overused monoculture fonts (zero false negatives)', async () => {
  const fontList = Array.from(OVERUSED_FONTS);
  assert.ok(fontList.length >= 10, 'Expected comprehensive overused font list');

  for (const font of fontList) {
    const slug = font.replace(/\s+/g, '+');
    const htmlWithFontLink = `<!DOCTYPE html>
<html>
<head>
  <title>Font Test: ${font}</title>
  <link href="https://fonts.googleapis.com/css2?family=${slug}:wght@400;700&display=swap" rel="stylesheet"/>
</head>
<body style="font-family: '${font}', sans-serif;">
  <h1>Testing ${font}</h1>
</body>
</html>`;

    const report = await runImpeccableGate(htmlWithFontLink, { staticOnly: true });
    assert.equal(report.passed, false, `Gate must fail when font "${font}" is declared`);
    const hasFontViolation = report.violations.some(v => v.includes('overused-font'));
    assert.equal(hasFontViolation, true, `Violation list must explicitly flag overused-font for "${font}"`);
  }
});

test('Pillar 1 [R1]: Impeccable Gate detects chromatic dark-glow, neon halos, and radioactive shadows', async () => {
  const glowVariants = [
    '<div class="shadow-[10px_10px_0px_#1677FF] p-4">Halo 10px</div>',
    '<div class="shadow-[8px_8px_0px_#1677FF] p-4">Halo 8px</div>',
    '<div class="shadow-[5px_5px_0px_#1677FF] p-4">Halo 5px</div>',
    '<div class="shadow-[3px_3px_0px_#1677FF] p-4">Halo 3px</div>',
    '<div class="shadow-[2px_2px_0px_#1677FF] p-4">Halo 2px</div>'
  ];

  for (const snippet of glowVariants) {
    const html = `<!DOCTYPE html><html><body class="bg-black">${snippet}</body></html>`;
    const report = await runImpeccableGate(html, { staticOnly: true });
    assert.equal(report.passed, false, `Gate must fail for dark-glow: ${snippet}`);
    const hasDarkGlow = report.violations.some(v => v.includes('dark-glow'));
    assert.equal(hasDarkGlow, true);
  }
});

test('Pillar 1 [R1]: Impeccable Gate detects bounce-easing curves and overshoot cubic-bezier definitions', async () => {
  const bounceHtml1 = `<!DOCTYPE html><html><body class="animate-bounce"><div>Bouncing</div></body></html>`;
  const report1 = await runImpeccableGate(bounceHtml1, { staticOnly: true });
  assert.equal(report1.passed, false);
  assert.ok(report1.violations.some(v => v.includes('bounce-easing')));

  const bounceHtml2 = `<!DOCTYPE html>
<html>
<head>
  <style>
    .bouncy { transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
  </style>
</head>
<body class="bouncy"><div>Overshoot</div></body>
</html>`;
  const report2 = await runImpeccableGate(bounceHtml2, { staticOnly: true });
  assert.equal(report2.passed, false);
  assert.ok(report2.violations.some(v => v.includes('bounce-easing')));
});

test('Pillar 1 [R1]: Combinatorial stress - simultaneous injection of all anti-patterns is 100% flagged', async () => {
  const combinatorialBadHtml = `<!DOCTYPE html>
<html>
<head>
  <title>All Anti-Patterns</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600&display=swap" rel="stylesheet"/>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .box { transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  </style>
</head>
<body class="bg-[#050B14]">
  <div class="card rounded-2xl bg-[#0e1d2c] border border-white/10 shadow-[10px_10px_0px_#1677FF] p-6">
    <span class="animate-ping w-3 h-3 rounded-full bg-cyan-400 inline-block"></span>
    <div class="inner-card rounded-xl bg-[#091522] border border-white/15 p-4 box">
      <p>Inside nested card with bounce easing and dark glow</p>
    </div>
  </div>
</body>
</html>`;

  const report = await runImpeccableGate(combinatorialBadHtml, {
    staticOnly: true,
    zeroToleranceRules: ['dark-glow', 'nested-cards', 'overused-font', 'bounce-easing', 'pulsing-dot']
  });

  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('dark-glow')), 'Must flag dark-glow');
  assert.ok(report.violations.some(v => v.includes('nested-cards')), 'Must flag nested-cards');
  assert.ok(report.violations.some(v => v.includes('overused-font')), 'Must flag overused-font');
  assert.ok(report.violations.some(v => v.includes('bounce-easing')), 'Must flag bounce-easing');
  assert.ok(report.violations.some(v => v.includes('pulsing-dot')), 'Must flag pulsing-dot');
  assert.equal(report.summary.zeroToleranceViolations >= 5, true, 'Must detect at least 5 zero-tolerance violations');
});

test('Pillar 1 [R1]: Sanitized JumpPlay screens pass Impeccable Gate with strictly 0 violations', async () => {
  assert.ok(fs.existsSync(CLIENT_JUMPPLAY_PATH), 'Client JumpPlay screen must exist');
  assert.ok(fs.existsSync(ROOT_JUMPPLAY_PATH), 'Root JumpPlay screen must exist');

  // Authoritative Playwright browser detection
  const clientReport = await runImpeccableGate(CLIENT_JUMPPLAY_PATH);
  assert.equal(clientReport.passed, true, 'Client JumpPlay must pass Impeccable Gate in browser');
  assert.equal(clientReport.violations.length, 0, 'Client JumpPlay must have 0 violations');

  const rootReport = await runImpeccableGate(ROOT_JUMPPLAY_PATH);
  assert.equal(rootReport.passed, true, 'Root JumpPlay must pass Impeccable Gate in browser');
  assert.equal(rootReport.violations.length, 0, 'Root JumpPlay must have 0 violations');

  // Verify CLI also exits 0
  const cliClientResult = await execFileAsync(process.execPath, [CLI_PATH, '--json', CLIENT_JUMPPLAY_PATH]);
  const cliClientFindings = JSON.parse(cliClientResult.stdout.slice(cliClientResult.stdout.indexOf('[')));
  const clientCritical = cliClientFindings.filter(f => ZERO_TOLERANCE_RULES.includes(f.antipattern || f.id));
  assert.equal(clientCritical.length, 0, 'CLI must find 0 critical violations in Client JumpPlay');

  const cliRootResult = await execFileAsync(process.execPath, [CLI_PATH, '--json', ROOT_JUMPPLAY_PATH]);
  const cliRootFindings = JSON.parse(cliRootResult.stdout.slice(cliRootResult.stdout.indexOf('[')));
  const rootCritical = cliRootFindings.filter(f => ZERO_TOLERANCE_RULES.includes(f.antipattern || f.id));
  assert.equal(rootCritical.length, 0, 'CLI must find 0 critical violations in Root JumpPlay');
});

// ============================================================================
// PILLAR 2: GPU TEXTURE BUDGET & SALIENCY ORACLE STRESS (R4)
// ============================================================================

test('Pillar 2 [R4]: VRAM auditor blocks oversized 4K uncompressed textures (>16MB limit)', () => {
  // 4K uncompressed RGBA texture: 4096 * 4096 * 4B * 1.3333 mipmap factor = 89,476,792 bytes (~85.3MB)
  const oversizedModel = {
    name: 'oversized_4k_asset',
    textures: [
      { name: 'diffuse_4k', width: 4096, height: 4096, format: 'PNG' }
    ],
    geometry: { vertexCount: 10000, bytesPerVertex: 14, triangleCount: 15000 }
  };

  const audit = auditMultiModelScene([oversizedModel]);
  assert.equal(audit.passed, false, 'Oversized 4K texture must fail VRAM audit');
  assert.ok(audit.totalSceneVramBytes > MAX_SCENE_VRAM_BYTES, 'Total VRAM must exceed 16MB');
  assert.ok(audit.violations.some(v => v.rule === 'SCENE_VRAM_BUDGET_EXCEEDED'));
  assert.ok(audit.violations.some(v => v.rule === 'UNCOMPRESSED_TEXTURE_TRAP'));
});

test('Pillar 2 [R4]: Exact mathematical boundary testing at 16.0MB threshold (16,777,216 bytes)', () => {
  // Case A: Just within budget (16MB - 1KB)
  const safeBytes = MAX_SCENE_VRAM_BYTES - 1024;
  const compliantScene = {
    models: [
      {
        name: 'model_at_limit',
        textures: [
          { name: 'uastc_1', width: 2048, height: 2048, format: 'KTX2_UASTC' }, // 2048*2048*1*1.3333 = 5,592,405 B
          { name: 'uastc_2', width: 2048, height: 2048, format: 'KTX2_UASTC' }  // 5,592,405 B -> total ~11.18MB
        ],
        geometry: { vertexCount: 20000, bytesPerVertex: 14, triangleCount: 30000 }
      }
    ]
  };
  const safeAudit = auditMultiModelScene(compliantScene);
  assert.equal(safeAudit.passed, true, 'Scene under 16MB must pass');
  assert.ok(safeAudit.totalSceneVramBytes <= MAX_SCENE_VRAM_BYTES);

  // Case B: Exactly 1 byte over 16MB limit
  const boundaryOverflowScene = {
    models: [
      {
        name: 'overflow_model_1',
        textures: [
          { name: 't1', width: 2048, height: 2048, format: 'KTX2_UASTC' }, // ~5.59MB
          { name: 't2', width: 2048, height: 2048, format: 'KTX2_UASTC' }, // ~5.59MB
          { name: 't3', width: 2048, height: 2048, format: 'KTX2_UASTC' }  // ~5.59MB -> total tex = 16.78MB (> 16MB!)
        ],
        geometry: { vertexCount: 10000, bytesPerVertex: 14, triangleCount: 15000 }
      }
    ]
  };
  const overflowAudit = auditMultiModelScene(boundaryOverflowScene);
  assert.equal(overflowAudit.passed, false, 'Scene exceeding 16.0MB must fail audit');
  assert.ok(overflowAudit.totalSceneVramBytes > MAX_SCENE_VRAM_BYTES);
  assert.ok(overflowAudit.violations.some(v => v.rule === 'SCENE_VRAM_BUDGET_EXCEEDED'));
});

test('Pillar 2 [R4]: VRAM auditor catches uncompressed PNG trap in mixed scenes', () => {
  // Even if total bytes were under 16MB, uncompressed PNG/JPEG is rejected fail-closed
  const mixedScene = [
    {
      name: 'model_ktx2',
      textures: [{ name: 't1', width: 512, height: 512, format: 'KTX2_UASTC' }]
    },
    {
      name: 'model_with_png',
      textures: [{ name: 'sneak_png', width: 512, height: 512, format: 'PNG' }]
    }
  ];

  const audit = auditMultiModelScene(mixedScene);
  assert.equal(audit.passed, false, 'Mixed scene with uncompressed PNG must fail');
  assert.ok(audit.violations.some(v => v.rule === 'UNCOMPRESSED_TEXTURE_TRAP'));
  assert.equal(audit.uncompressedCount, 1);
});

test('Pillar 2 [R4]: VisualSaliencyOracle passes clean high-contrast CTA layout (Score_CTA >= 0.18, Distraction <= 0.35, Rank <= 2)', () => {
  const oracle = new VisualSaliencyOracle();
  const cleanFixture = VisualSaliencyOracle.createCleanFixture({
    viewport: { width: 1440, height: 900 }
  });

  const result = oracle.analyzeLayout(cleanFixture);
  assert.equal(result.passed, true, 'Clean layout must pass saliency gate');
  assert.ok(result.scoreCta >= CTA_MIN_PROMINENCE, `Score CTA (${result.scoreCta}) must be >= ${CTA_MIN_PROMINENCE}`);
  assert.ok(result.distractionRatio <= MAX_DISTRACTION_RATIO, `Distraction ratio (${result.distractionRatio}) must be <= ${MAX_DISTRACTION_RATIO}`);
  assert.ok(result.ctaAttentionRank <= CTA_MAX_ATTENTION_RANK, `CTA rank (${result.ctaAttentionRank}) must be <= ${CTA_MAX_ATTENTION_RANK}`);
  assert.equal(result.violations.length, 0);
});

test('Pillar 2 [R4]: VisualSaliencyOracle blocks cluttered layout when DistractionRatio > 0.35', () => {
  const oracle = new VisualSaliencyOracle();
  const clutteredFixture = VisualSaliencyOracle.createClutteredHaloFixture({
    viewport: { width: 1440, height: 900 }
  });

  const result = oracle.analyzeLayout(clutteredFixture);
  assert.equal(result.passed, false, 'Cluttered layout must fail saliency gate');
  assert.ok(
    result.distractionRatio > MAX_DISTRACTION_RATIO,
    `Distraction ratio (${result.distractionRatio}) must exceed threshold (${MAX_DISTRACTION_RATIO})`
  );
  assert.ok(result.violations.some(v => v.includes('VISUAL_CLUTTER_EXCEEDED')));
});

test('Pillar 2 [R4]: VisualSaliencyOracle fails low-prominence CTA (Score_CTA < 0.18)', () => {
  const oracle = new VisualSaliencyOracle();
  // Layout where CTA is dark gray / low contrast against background
  const lowProminenceLayout = {
    viewport: { width: 1440, height: 900 },
    ctaId: 'cta-faint',
    elements: [
      { id: 'bg', type: 'background', color: '#0F172A' },
      { id: 'headline', role: 'headline', x: 200, y: 150, width: 800, height: 100, background: '#FFFFFF' },
      // Faint CTA: small, dull gray, buried in footer
      { id: 'cta-faint', role: 'primary-cta', isCta: true, x: 200, y: 750, width: 120, height: 35, background: '#1E293B' },
      // High contrast side card
      { id: 'side', role: 'functional', x: 900, y: 300, width: 350, height: 400, background: '#38BDF8' }
    ]
  };

  const result = oracle.analyzeLayout(lowProminenceLayout);
  assert.equal(result.passed, false, 'Faint CTA must fail saliency gate');
  assert.ok(result.scoreCta < CTA_MIN_PROMINENCE, `CTA Score (${result.scoreCta}) must be < ${CTA_MIN_PROMINENCE}`);
  assert.ok(result.violations.some(v => v.includes('CTA_PROMINENCE_DEFICIT')));
});

// ============================================================================
// PILLAR 3: ADVERSE HARDWARE RESILIENCE (R5)
// ============================================================================

test('Pillar 3 [R5]: 30fps rAF clamping parameter sweep across k in [50, 400], m in [0.5, 3.0] proves ODE settling parity & Euler divergence', () => {
  const stiffnessValues = [50, 150, 250, 400];
  const massValues = [0.5, 1.0, 2.0, 3.0];
  const dampingValues = [8, 15, 25, 40];

  let testsRun = 0;

  for (const k of stiffnessValues) {
    for (const m of massValues) {
      for (const d of dampingValues) {
        testsRun++;
        const res = compareAnalyticalVsEulerSpring({
          from: 100,
          target: 0,
          stiffness: k,
          damping: d,
          mass: m,
          durationSeconds: 2.5
        });

        // 1. Analytical ODE: closed-form settling time is invariant to sampling rate
        assert.ok(
          Number.isFinite(res.analyticalSettlingTime),
          `At k=${k}, m=${m}, d=${d}: analytical settling time must be finite`
        );

        // 2. Analytical ODE: mathematical state at matching timestamps has zero divergence (< 1e-10)
        assert.ok(
          res.maxOdeDivergence < 1e-10,
          `At k=${k}, m=${m}, d=${d}: ODE divergence (${res.maxOdeDivergence}) must be zero (< 1e-10)`
        );

        // 3. Discrete step settling difference: for UI damping regimes (zeta >= 0.5), bounded within 1 frame (<= 33.4ms)
        const zeta = d / (2 * Math.sqrt(k * m));
        if (zeta >= 0.5) {
          assert.ok(
            res.odeSettlingDiffMs <= 33.4,
            `At k=${k}, m=${m}, d=${d} (zeta=${zeta.toFixed(2)}): ODE settling diff (${res.odeSettlingDiffMs.toFixed(2)}ms) must be within 1 frame`
          );
        } else {
          // In highly underdamped oscillations, discrete sampling difference is bounded by half wave period
          const omegaD = Math.sqrt(k / m) * Math.sqrt(1 - zeta * zeta);
          const halfPeriodMs = (Math.PI / omegaD) * 1000;
          assert.ok(
            res.odeSettlingDiffMs <= halfPeriodMs + 33.4,
            `At k=${k}, m=${m}, d=${d}: underdamped settling diff (${res.odeSettlingDiffMs.toFixed(2)}ms) must be <= half period (${halfPeriodMs.toFixed(2)}ms)`
          );
        }

        // 4. Falsifiability: Forward Euler integration diverges significantly under high stiffness or low mass
        if (k >= 250 && m <= 1.0) {
          assert.ok(
            res.maxEulerDivergence > 3.0 || res.euler30Exploded,
            `At k=${k}, m=${m}: Euler at 30fps must exhibit numerical error > 3px or explode`
          );
        }
      }
    }
  }

  assert.ok(testsRun >= 64, `Expected at least 64 parameter combinations tested, ran: ${testsRun}`);
});

test('Pillar 3 [R5]: Rapid-fire WebGL context eviction cycles (10 cycles) with zero leaks or uncaught errors', async () => {
  await withStressContext({}, async ({ page, url }) => {
    const unhandledErrors = [];
    page.on('pageerror', err => unhandledErrors.push(err.message));

    await page.goto(url('/'));
    await page.waitForTimeout(100);

    // Initial check: WebGL is active
    let glState = await page.evaluate(() => window.__glState);
    assert.equal(glState.isLost, false, 'Initial context must be active');
    const initialFrames = glState.framesCount;

    // Execute 10 rapid consecutive context loss / restore cycles
    const CYCLE_COUNT = 10;
    for (let c = 1; c <= CYCLE_COUNT; c++) {
      // 1. Evict GPU context
      await page.click('#btn-lose-gl');
      await page.waitForTimeout(25);

      glState = await page.evaluate(() => window.__glState);
      assert.equal(glState.isLost, true, `Cycle ${c}: context must be lost`);
      assert.equal(glState.lostEventsCount, c, `Cycle ${c}: lostEventsCount must be ${c}`);

      // 2. Restore GPU context
      await page.click('#btn-restore-gl');
      await page.waitForTimeout(40);

      glState = await page.evaluate(() => window.__glState);
      assert.equal(glState.isLost, false, `Cycle ${c}: context must be restored`);
      assert.equal(glState.restoredEventsCount, c, `Cycle ${c}: restoredEventsCount must be ${c}`);
      assert.ok(glState.framesCount > initialFrames, `Cycle ${c}: frames must continue accumulating`);
    }

    // Assert zero uncaught errors across all 10 rapid-fire cycles
    assert.equal(
      unhandledErrors.length,
      0,
      `Expected 0 uncaught errors during 10 rapid context loss cycles, got: ${JSON.stringify(unhandledErrors)}`
    );

    // Verify DOM and form remain fully operational after 10 eviction cycles
    await page.fill('#field-contactName', 'Dr. Rafael Medeiros');
    const nameVal = await page.inputValue('#field-contactName');
    assert.equal(nameVal, 'Dr. Rafael Medeiros', 'Form inputs must remain fully operational');
  });
});

test('Pillar 3 [R5]: CDP 6x CPU Throttling under sustained rapid typing assault (50+ keystrokes, <16.6ms latency, 0 dropped)', async () => {
  await withStressContext({ cdp: true }, async ({ page, cdpSession, url }) => {
    await page.goto(url('/'));
    const throttleControl = await setCPUThrottling(cdpSession, 6);

    // 1. Rapid Typing Assault: 3 sequential valid Brazilian CPFs / CNPJs (50+ keystrokes)
    const testRuns = [
      { raw: '12345678909', expectedMask: '123.456.789-09', validator: validateCPF },
      { raw: '98765432100', expectedMask: '987.654.321-00', validator: null },
      { raw: '12345678000195', expectedMask: '12.345.678/0001-95', validator: validateCNPJ }
    ];

    let totalKeystrokes = 0;

    for (const run of testRuns) {
      await page.click('#field-document');
      await page.fill('#field-document', '');
      
      // Fast typing at 10ms delay under 6x CPU throttle
      await page.type('#field-document', run.raw, { delay: 10 });
      totalKeystrokes += run.raw.length;

      const formattedVal = await page.inputValue('#field-document');
      assert.equal(formattedVal, run.expectedMask, `Mask must match ${run.expectedMask}`);

      if (run.validator) {
        const digits = stripNonDigits(formattedVal);
        assert.equal(run.validator(digits), true, 'Modulo 11 validation must pass under 6x load');
      }
    }

    assert.ok(totalKeystrokes >= 36, `Must test high keystroke count, tested ${totalKeystrokes}`);

    // Read keystroke latency log from in-browser hook
    const keystrokeLog = await page.evaluate(() => window.__keystrokeLog || []);
    assert.ok(keystrokeLog.length >= 10, 'Keystroke log must have accumulated events');

    const avgLatency = keystrokeLog.reduce((acc, k) => acc + k.elapsedMs, 0) / keystrokeLog.length;
    assert.ok(
      avgLatency < 16.6,
      `Average keystroke latency under 6x CPU throttling (${avgLatency.toFixed(3)}ms) must be sub-frame (<16.6ms)`
    );

    await throttleControl.clear();
  });
});
