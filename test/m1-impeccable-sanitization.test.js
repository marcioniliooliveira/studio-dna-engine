const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');
const cheerio = require('cheerio');

const execFileAsync = promisify(execFile);
const { runImpeccableGate, ImpeccableGate, ZERO_TOLERANCE_RULES } = require('../src/qa/impeccable-gate');
const { UnifiedQualityGate } = require('../src/qa/unified-quality-gate');

const CLIENT_JUMPPLAY_PATH = path.resolve(__dirname, '../clientes/jumpflex-home-evolution/JumpPlay — Family Reveal & Kinetic Range.html');
const ROOT_JUMPPLAY_PATH = path.resolve(__dirname, '../JumpPlay — Family Reveal & Kinetic Range.html');
const CLI_PATH = path.resolve(__dirname, '../scripts/detect-antipatterns.mjs');

// ─── SUITE 1: Falsifiability & Adversarial Fixture Detections ─────────────────

test('ImpeccableGate: detects intentional nested-cards in adversarial fixture', async () => {
  const badHtml = `<!DOCTYPE html>
<html>
<head><title>Bad Cards</title></head>
<body>
  <div class="card rounded-2xl bg-[#0f1f2e] border border-white/10 p-6 shadow-lg">
    <h2>Main Card Title</h2>
    <div class="inner-card rounded-xl bg-[#081421] border border-white/20 p-4 shadow-md">
      <p>This is a nested card inside parent card container.</p>
    </div>
  </div>
</body>
</html>`;

  const report = await runImpeccableGate(badHtml, { staticOnly: true });
  assert.equal(report.passed, false, 'Gate must fail when nested-cards are present');
  const hasNestedCards = report.violations.some(v => v.includes('nested-cards'));
  assert.equal(hasNestedCards, true, 'Violation list must explicitly flag nested-cards');
});

test('ImpeccableGate: detects intentional overused-font in adversarial fixture', async () => {
  const badHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Bad Font</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet"/>
</head>
<body style="font-family: 'Space Grotesk', sans-serif;">
  <h1>Heading in overused font</h1>
</body>
</html>`;

  const report = await runImpeccableGate(badHtml, { staticOnly: true });
  assert.equal(report.passed, false, 'Gate must fail when overused font is present');
  const hasOverusedFont = report.violations.some(v => v.includes('overused-font'));
  assert.equal(hasOverusedFont, true, 'Violation list must explicitly flag overused-font');
});

test('ImpeccableGate: detects intentional dark-glow in adversarial fixture', async () => {
  const badHtml = `<!DOCTYPE html>
<html>
<head><title>Bad Glow</title></head>
<body class="bg-black text-white">
  <div class="shadow-[10px_10px_0px_#1677FF] p-6 rounded">
    <p>Hard chromatic drop shadow on dark background</p>
  </div>
</body>
</html>`;

  const report = await runImpeccableGate(badHtml, { staticOnly: true });
  assert.equal(report.passed, false, 'Gate must fail when chromatic halo/glow is present');
  const hasDarkGlow = report.violations.some(v => v.includes('dark-glow'));
  assert.equal(hasDarkGlow, true, 'Violation list must explicitly flag dark-glow');
});

test('ImpeccableGate: detects intentional pulsing-dot in adversarial fixture', async () => {
  const badHtml = `<!DOCTYPE html>
<html>
<head><title>Bad Pulse</title></head>
<body>
  <div>
    <span class="w-2 h-2 rounded-full bg-lime-400 animate-ping inline-block"></span>
    <span>Live telemetry indicator</span>
  </div>
</body>
</html>`;

  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['pulsing-dot'] });
  assert.equal(report.passed, false, 'Gate must fail when pulsing-dot is configured in zero tolerance');
  const hasPulsingDot = report.violations.some(v => v.includes('pulsing-dot'));
  assert.equal(hasPulsingDot, true);
});

test('ImpeccableGate: passes clean artisanal fixture without false positives', async () => {
  const cleanHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Clean Artisanal Site</title>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@500;700&family=Bebas+Neue&family=JetBrains+Mono&display=swap" rel="stylesheet"/>
  <style>
    body { font-family: 'Manrope', sans-serif; background: #070f17; color: #f8fafc; }
    h1 { font-family: 'Bebas Neue', sans-serif; }
    .code { font-family: 'JetBrains Mono', monospace; }
  </style>
</head>
<body>
  <header><h1>JumpPlay Precision</h1></header>
  <main>
    <section>
      <div class="rounded-2xl border border-white/10 bg-[#0c1a28] p-6">
        <h2>Engenharia de Salto</h2>
        <p>Curvas de amortecimento analíticas e materiais industriais.</p>
      </div>
    </section>
  </main>
</body>
</html>`;

  const report = await runImpeccableGate(cleanHtml);
  assert.equal(report.passed, true);
  assert.equal(report.violations.length, 0);
  assert.equal(report.summary.zeroToleranceViolations, 0);
});

// ─── SUITE 2: CLI Runner Verification (scripts/detect-antipatterns.mjs) ─────────

test('CLI: scripts/detect-antipatterns.mjs fails on deliberate adversarial input', async () => {
  const os = require('os');
  const tempFixturePath = path.join(os.tmpdir(), `adversarial-fixture-${process.pid}.html`);
  fs.writeFileSync(tempFixturePath, `<!DOCTYPE html>
<html>
<head>
  <title>Adversarial Test</title>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500&display=swap" rel="stylesheet"/>
</head>
<body style="font-family: 'Space Grotesk', sans-serif;">
  <div class="animate-ping">Pulsing</div>
</body>
</html>`, 'utf8');

  try {
    await assert.rejects(
      execFileAsync(process.execPath, [CLI_PATH, '--json', tempFixturePath]),
      (err) => {
        assert.equal(err.code, 2);
        assert.match(err.stdout, /overused-font/);
        return true;
      }
    );
  } finally {
    if (fs.existsSync(tempFixturePath)) fs.unlinkSync(tempFixturePath);
  }
});

test('CLI: scripts/detect-antipatterns.mjs exits 0 on sanitized root JumpPlay file', async () => {
  const { stdout } = await execFileAsync(process.execPath, [CLI_PATH, '--json', ROOT_JUMPPLAY_PATH]);
  const jsonStart = stdout.indexOf('[');
  assert.ok(jsonStart >= 0, 'CLI output must contain JSON findings array');
  const findings = JSON.parse(stdout.slice(jsonStart));
  const critical = findings.filter(f => ZERO_TOLERANCE_RULES.includes(f.antipattern || f.id));
  assert.equal(critical.length, 0, 'Root JumpPlay must have 0 critical antipatterns in CLI');
});

test('CLI: scripts/detect-antipatterns.mjs exits 0 on sanitized client JumpPlay file', async () => {
  const { stdout } = await execFileAsync(process.execPath, [CLI_PATH, '--json', CLIENT_JUMPPLAY_PATH]);
  const jsonStart = stdout.indexOf('[');
  assert.ok(jsonStart >= 0, 'CLI output must contain JSON findings array');
  const findings = JSON.parse(stdout.slice(jsonStart));
  const critical = findings.filter(f => ZERO_TOLERANCE_RULES.includes(f.antipattern || f.id));
  assert.equal(critical.length, 0, 'Client JumpPlay must have 0 critical antipatterns in CLI');
});

// ─── SUITE 3: Full Sanitization of Client JumpPlay Active Screen ──────────────

test('Sanitized Client JumpPlay: achieves strictly 0 zero-tolerance violations in browser', async () => {
  const report = await runImpeccableGate(CLIENT_JUMPPLAY_PATH);
  assert.equal(report.passed, true, 'Client JumpPlay screen must pass Impeccable gate');
  assert.equal(report.violations.length, 0, `Expected 0 violations but got: ${JSON.stringify(report.violations)}`);
  assert.equal(report.summary.zeroToleranceViolations, 0);

  // Assert individual zero tolerance categories
  assert.equal(report.summary.breakdown['dark-glow'] || 0, 0, 'Must have 0 dark-glow violations');
  assert.equal(report.summary.breakdown['nested-cards'] || 0, 0, 'Must have 0 nested-cards violations');
  assert.equal(report.summary.breakdown['overused-font'] || 0, 0, 'Must have 0 overused-font violations');
  assert.equal(report.summary.breakdown['bounce-easing'] || 0, 0, 'Must have 0 bounce-easing violations');
  assert.equal(report.summary.breakdown['pulsing-dot'] || 0, 0, 'Must have 0 pulsing-dot violations');
});

test('Sanitized Client JumpPlay: DOM verification of flattened #cotacao-b2b', () => {
  const html = fs.readFileSync(CLIENT_JUMPPLAY_PATH, 'utf8');
  const $ = cheerio.load(html);

  // 1. #bulk is flattened (no outer p-[1px] wrapper)
  const bulk = $('#bulk');
  assert.ok(bulk.length > 0, '#bulk container must exist');
  assert.ok(!bulk.hasClass('p-[1px]'), '#bulk must not have p-[1px] double-bezel wrapper');

  // 2. Step 1 segment select has no p-[1px] wrapper
  const select = $('#b2bSegment');
  assert.ok(select.length > 0, '#b2bSegment select must exist');
  const selectParent = select.parent();
  assert.ok(!selectParent.hasClass('p-[1px]'), 'Select must not be wrapped in p-[1px] card shell');

  // 3. Step 2 model buttons have no p-[1px] wrapper or inner card divs
  $('.model-opt').each((_, el) => {
    const $btn = $(el);
    assert.ok(!$btn.hasClass('p-[1px]'), 'Model button must not have p-[1px] wrapper');
    const innerCard = $btn.find('div.bg-\\[\\#0d1e2e\\], div.bg-\\[\\#0f2010\\]');
    assert.equal(innerCard.length, 0, 'Model button must not contain nested card div');
  });

  // 4. Input fields have no p-[1px] wrappers
  $('#cepInput, #cityStateInput, #contactName, #contactDoc, #contactPhone, #contactEmail').each((_, el) => {
    const $inp = $(el);
    const parent = $inp.parent();
    assert.ok(!parent.hasClass('p-[1px]'), `Input #${$inp.attr('id')} must not be enclosed in p-[1px] card shell`);
  });

  // 5. No animate-ping in sale bar
  const saleBar = $('#sale-bar');
  assert.ok(saleBar.length > 0, '#sale-bar must exist');
  assert.equal(saleBar.find('.animate-ping').length, 0, '#sale-bar must not contain animate-ping pulsing dot');
});

// ─── SUITE 4: Full Sanitization of Root JumpPlay Screen ───────────────────────

test('Sanitized Root JumpPlay: achieves strictly 0 zero-tolerance violations in browser', async () => {
  const report = await runImpeccableGate(ROOT_JUMPPLAY_PATH);
  assert.equal(report.passed, true, 'Root JumpPlay screen must pass Impeccable gate');
  assert.equal(report.violations.length, 0, `Expected 0 violations but got: ${JSON.stringify(report.violations)}`);
  assert.equal(report.summary.zeroToleranceViolations, 0);

  // Assert individual zero tolerance categories
  assert.equal(report.summary.breakdown['dark-glow'] || 0, 0, 'Must have 0 dark-glow violations');
  assert.equal(report.summary.breakdown['nested-cards'] || 0, 0, 'Must have 0 nested-cards violations');
  assert.equal(report.summary.breakdown['overused-font'] || 0, 0, 'Must have 0 overused-font violations');
  assert.equal(report.summary.breakdown['bounce-easing'] || 0, 0, 'Must have 0 bounce-easing violations');
  assert.equal(report.summary.breakdown['pulsing-dot'] || 0, 0, 'Must have 0 pulsing-dot violations');
});

test('Sanitized Root JumpPlay: DOM verification of fonts, shadows, and flat hierarchy', () => {
  const html = fs.readFileSync(ROOT_JUMPPLAY_PATH, 'utf8');

  // 1. No Space Grotesk or Plus Jakarta Sans
  assert.ok(!html.includes('Space Grotesk'), 'Root HTML must not contain Space Grotesk');
  assert.ok(!html.includes('Plus Jakarta Sans'), 'Root HTML must not contain Plus Jakarta Sans');

  // 2. No hard neon #1677FF drop shadows
  assert.ok(!html.includes('shadow-[10px_10px_0px_#1677FF]'), 'Must eliminate 10px #1677FF shadow');
  assert.ok(!html.includes('shadow-[8px_8px_0px_#1677FF]'), 'Must eliminate 8px #1677FF shadow');
  assert.ok(!html.includes('shadow-[5px_5px_0px_#1677FF]'), 'Must eliminate 5px #1677FF shadow');
  assert.ok(!html.includes('shadow-[3px_3px_0px_#1677FF]'), 'Must eliminate 3px #1677FF shadow');
  assert.ok(!html.includes('shadow-[2px_2px_0px_#1677FF]'), 'Must eliminate 2px #1677FF shadow');

  // 3. No animate-ping pulsing dots
  assert.ok(!html.includes('animate-ping'), 'Root HTML must not contain animate-ping');

  // 4. No radioactive radial halo in spotlight-card::before
  assert.ok(!html.includes('radial-gradient(600px circle at var(--mouse-x) var(--mouse-y)'), 'Must eliminate radioactive spotlight halo');
});

// ─── SUITE 5: UnifiedQualityGate Tier 4 Integration Contract ──────────────────

test('UnifiedQualityGate: cleanly exports and incorporates Tier 4 Impeccable Gate', () => {
  assert.equal(typeof UnifiedQualityGate.auditSite, 'function');
  assert.equal(typeof runImpeccableGate, 'function');
  assert.deepEqual(ZERO_TOLERANCE_RULES, ['dark-glow', 'nested-cards', 'overused-font', 'bounce-easing']);
});

// ─── SUITE 6: Craft-Floor Anti-Patterns & Artistic Waivers (TASK-V3-04) ──────

test('ImpeccableGate Craft-Floor: detects untinted-gray-black', async () => {
  const badHtml = `
    <html>
      <body style="background-color: #000000; color: #ffffff;">
        <div style="background: rgb(0, 0, 0);">Untinted black surface</div>
      </body>
    </html>
  `;
  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['untinted-gray-black'] });
  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('untinted-gray-black')));
});

test('ImpeccableGate Craft-Floor: detects muddy-opacity-gradient (fading to transparent)', async () => {
  const badHtml = `
    <html>
      <body>
        <div style="background: linear-gradient(180deg, #1e293b, transparent);">Muddy gradient</div>
      </body>
    </html>
  `;
  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['muddy-opacity-gradient'] });
  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('muddy-opacity-gradient')));
});

test('ImpeccableGate Craft-Floor: detects side-tab-accent-stripe on rounded cards', async () => {
  const badHtml = `
    <html>
      <body>
        <div class="card rounded-xl" style="border-left: 4px solid #3b82f6; border-radius: 12px;">
          Card with accent stripe
        </div>
      </body>
    </html>
  `;
  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['side-tab-accent-stripe'] });
  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('side-tab-accent-stripe')));
});

test('ImpeccableGate Craft-Floor: detects thick-card-border (>= 2px on rounded card)', async () => {
  const badHtml = `
    <html>
      <body>
        <div class="card rounded-2xl" style="border-width: 3px; border-radius: 16px;">
          Thick bordered card
        </div>
      </body>
    </html>
  `;
  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['thick-card-border'] });
  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('thick-card-border')));
});

test('ImpeccableGate Craft-Floor: detects icon-tile-stack in >= 3 columns', async () => {
  const badHtml = `
    <html>
      <body>
        <div class="grid grid-cols-3">
          <div class="col">
            <div class="icon-box rounded-lg bg-blue-500 p-3"><svg></svg></div>
            <h3>Feature 1</h3>
            <p>Description</p>
          </div>
          <div class="col">
            <div class="icon-box rounded-lg bg-green-500 p-3"><svg></svg></div>
            <h3>Feature 2</h3>
            <p>Description</p>
          </div>
          <div class="col">
            <div class="icon-box rounded-lg bg-red-500 p-3"><svg></svg></div>
            <h3>Feature 3</h3>
            <p>Description</p>
          </div>
        </div>
      </body>
    </html>
  `;
  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['icon-tile-stack'] });
  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('icon-tile-stack')));
});

test('ImpeccableGate Craft-Floor: detects numbered-section-kicker (01 /, 02 —)', async () => {
  const badHtml = `
    <html>
      <body>
        <span class="kicker">01 / OVERVIEW</span>
        <h2>Section Headline</h2>
      </body>
    </html>
  `;
  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['numbered-section-kicker'] });
  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('numbered-section-kicker')));
});

test('ImpeccableGate Craft-Floor: detects em-dash-overuse (> 2 em-dashes in single copy block)', async () => {
  const badHtml = `
    <html>
      <body>
        <p>This is revolutionary — not just fast — but unprecedented — for every user.</p>
      </body>
    </html>
  `;
  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['em-dash-overuse'] });
  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('em-dash-overuse')));
});

test('ImpeccableGate Craft-Floor: detects aphoristic-cadence (PT & EN)', async () => {
  const badPtHtml = `
    <html>
      <body>
        <p>Não é apenas um software, é uma revolução completa.</p>
      </body>
    </html>
  `;
  const reportPt = await runImpeccableGate(badPtHtml, { staticOnly: true, zeroToleranceRules: ['aphoristic-cadence'] });
  assert.equal(reportPt.passed, false);
  assert.ok(reportPt.violations.some(v => v.includes('aphoristic-cadence')));

  const badEnHtml = `
    <html>
      <body>
        <p>It's not just a tool, it's the future of engineering.</p>
      </body>
    </html>
  `;
  const reportEn = await runImpeccableGate(badEnHtml, { staticOnly: true, zeroToleranceRules: ['aphoristic-cadence'] });
  assert.equal(reportEn.passed, false);
  assert.ok(reportEn.violations.some(v => v.includes('aphoristic-cadence')));
});

test('ImpeccableGate Craft-Floor: detects fabricated-stat-tile without source', async () => {
  const badHtml = `
    <html>
      <body>
        <div class="stat-tile">
          <span class="value text-4xl">+247%</span>
          <span class="label">Conversion increase</span>
        </div>
      </body>
    </html>
  `;
  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['fabricated-stat-tile'] });
  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('fabricated-stat-tile')));
});

test('ImpeccableGate Craft-Floor: detects excessive-line-length (p without max-width <= 75ch)', async () => {
  const badHtml = `
    <html>
      <body>
        <p>
          Este é um parágrafo longo com muito texto explicativo que se estende por mais de oitenta caracteres consecutivos sem nenhuma restrição de largura máxima definida por classe ou estilo inline na página.
        </p>
      </body>
    </html>
  `;
  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['excessive-line-length'] });
  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('excessive-line-length')));
});

test('ImpeccableGate Craft-Floor: detects missing-tabular-nums on prices', async () => {
  const badHtml = `
    <html>
      <body>
        <span class="price font-bold text-2xl">R$ 1.499,00</span>
      </body>
    </html>
  `;
  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['missing-tabular-nums'] });
  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('missing-tabular-nums')));
});

test('ImpeccableGate Craft-Floor: detects sub-44px-touch-target', async () => {
  const badHtml = `
    <html>
      <body>
        <button style="width: 32px; height: 32px;">X</button>
      </body>
    </html>
  `;
  const report = await runImpeccableGate(badHtml, { staticOnly: true, zeroToleranceRules: ['sub-44px-touch-target'] });
  assert.equal(report.passed, false);
  assert.ok(report.violations.some(v => v.includes('sub-44px-touch-target')));
});

test('ImpeccableGate Waivers: artisticWaiver suppresses rule on matching data-ds element', async () => {
  const html = `
    <html>
      <body>
        <div data-ds="8f3a19c2" class="card rounded-2xl" style="border-width: 3px; border-radius: 16px;">
          Brutalist card intentional in kinetic stage
        </div>
      </body>
    </html>
  `;
  const waivers = [
    {
      dataDs: '8f3a19c2',
      ruleId: 'thick-card-border',
      reason: 'Brutalist accent card intentional in kinetic stage',
      approvedByRole: 'composition_agent'
    }
  ];

  const report = await runImpeccableGate(html, {
    staticOnly: true,
    surfaceMode: 'Persuade',
    artisticWaivers: waivers,
    zeroToleranceRules: ['thick-card-border']
  });

  assert.equal(report.passed, true, 'Gate should pass because thick-card-border has approved waiver');
  assert.equal(report.violations.length, 0);
  assert.equal(report.appliedWaivers?.length, 1);
  assert.equal(report.appliedWaivers[0].ruleId, 'thick-card-border');
});

test('ImpeccableGate Waivers: rejects waiver with unauthorized role', async () => {
  const html = `
    <html>
      <body>
        <div data-ds="8f3a19c2" class="card rounded-2xl" style="border-width: 3px; border-radius: 16px;">
          Unauthorized waived card
        </div>
      </body>
    </html>
  `;
  const invalidWaivers = [
    {
      dataDs: '8f3a19c2',
      ruleId: 'thick-card-border',
      reason: 'Trying to bypass rule without authority',
      approvedByRole: 'implementation_agent' // NOT composition_agent or human_art_director!
    }
  ];

  const report = await runImpeccableGate(html, {
    staticOnly: true,
    surfaceMode: 'Persuade',
    artisticWaivers: invalidWaivers,
    zeroToleranceRules: ['thick-card-border']
  });

  assert.equal(report.passed, false, 'Gate must reject waiver signed by unauthorized role');
  assert.ok(report.violations.some(v => v.includes('thick-card-border')));
});
