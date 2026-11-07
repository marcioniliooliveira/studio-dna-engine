'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  lintStrictDesignTokens,
  calculateDeltaE,
  extractBrandPalette,
  isDivisibleBy4
} = require('../src/compiler/strict-token-linter');

const mockBrandSpec = {
  theme: {
    bgBase: '#02040A',
    accent: '#00F0FF',
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    surface: '#0B132B'
  },
  tokensP0: {
    brandPrimary: { hex: '#00F0FF', role: 'CTA Accent' },
    bgDark: { hex: '#02040A', role: 'Dark Base' },
    textWhite: { hex: '#FFFFFF', role: 'Primary Text' }
  }
};

test('calculateDeltaE computes perceptual color difference accurately', () => {
  // Identical colors
  const dEIdentical = calculateDeltaE('#00F0FF', '#00F0FF');
  assert.equal(dEIdentical, 0);

  // Near-identical color (value drift, Delta E < 2.0)
  const dENear = calculateDeltaE('#00F0FF', '#00EEFC');
  assert.ok(dENear < 2.0, `Expected Delta E < 2.0, got ${dENear}`);

  // Distinct color (Delta E >= 2.0)
  const dEDistinct = calculateDeltaE('#00F0FF', '#8B5CF6');
  assert.ok(dEDistinct >= 2.0, `Expected Delta E >= 2.0, got ${dEDistinct}`);
});

test('isDivisibleBy4 validates 4px spacing grid values', () => {
  assert.equal(isDivisibleBy4(0), true);
  assert.equal(isDivisibleBy4(4), true);
  assert.equal(isDivisibleBy4(8), true);
  assert.equal(isDivisibleBy4(16), true);
  assert.equal(isDivisibleBy4(24), true);
  assert.equal(isDivisibleBy4(32), true);

  assert.equal(isDivisibleBy4(19), false);
  assert.equal(isDivisibleBy4(13), false);
  assert.equal(isDivisibleBy4(7), false);
  assert.equal(isDivisibleBy4(15), false);
  assert.equal(isDivisibleBy4(1), false);
});

test('lintStrictDesignTokens blocks arbitrary Tailwind classes', () => {
  const htmlWithArbitraryClasses = `
    <div class="flex items-center p-[19px] bg-[#8b5cf6] w-[347px] z-[9999]">
      <span class="m-[15px] gap-[13px]">Hero Content</span>
    </div>
  `;

  const result = lintStrictDesignTokens(htmlWithArbitraryClasses, { brandSpec: mockBrandSpec });

  assert.equal(result.valid, false);
  assert.ok(result.violations.length >= 4, `Expected at least 4 violations, got ${result.violations.length}`);

  const types = result.violations.map(v => v.type);
  assert.ok(types.includes('arbitrary-class'), 'Should flag arbitrary-class');

  const arbitraryTokens = result.violations.map(v => v.raw);
  assert.ok(arbitraryTokens.includes('p-[19px]'));
  assert.ok(arbitraryTokens.includes('bg-[#8b5cf6]'));
  assert.ok(arbitraryTokens.includes('w-[347px]'));
  assert.ok(arbitraryTokens.includes('z-[9999]'));
});

test('lintStrictDesignTokens allows compliant Tailwind classes and standard tokens', () => {
  const compliantHtml = `
    <div class="flex items-center p-4 m-2 gap-4 w-full z-10 text-white">
      <span class="p-6">Valid layout</span>
    </div>
  `;

  const result = lintStrictDesignTokens(compliantHtml, { brandSpec: mockBrandSpec });
  assert.equal(result.valid, true);
  assert.equal(result.violations.length, 0);
});

test('lintStrictDesignTokens detects color drift when Delta E < 2.0 and suggests replacement', () => {
  // #00EEFC is near #00F0FF (Delta E < 2.0)
  const cssWithDrift = `
    .button-accent {
      background-color: #00EEFC;
      color: #FFFFFF;
    }
  `;

  const result = lintStrictDesignTokens(cssWithDrift, { brandSpec: mockBrandSpec });
  assert.equal(result.valid, false);

  const driftViolation = result.violations.find(v => v.type === 'color-drift');
  assert.ok(driftViolation, 'Should detect color-drift violation');
  assert.ok(driftViolation.deltaE < 2.0, `Delta E should be < 2.0, got ${driftViolation.deltaE}`);
  assert.match(driftViolation.suggestion, /#00F0FF|accent|brandPrimary/i);
});

test('lintStrictDesignTokens blocks unauthorized color when Delta E >= 2.0', () => {
  // #8B5CF6 (purple) is far from cyan #00F0FF and dark #02040A
  const cssWithUnauthorized = `
    .card-banner {
      background-color: #8B5CF6;
      color: #FFFFFF;
    }
  `;

  const result = lintStrictDesignTokens(cssWithUnauthorized, { brandSpec: mockBrandSpec });
  assert.equal(result.valid, false);

  const unauthViolation = result.violations.find(v => v.type === 'unauthorized-color');
  assert.ok(unauthViolation, 'Should detect unauthorized-color violation');
  assert.ok(unauthViolation.deltaE >= 2.0, `Delta E should be >= 2.0, got ${unauthViolation.deltaE}`);
  assert.ok(unauthViolation.nearestToken, 'Should point to nearest palette token');
});

test('lintStrictDesignTokens enforces 4px scale on CSS margin, padding, gap', () => {
  const cssOffScale = `
    .bad-box {
      padding: 19px;
      margin-top: 13px;
      gap: 7px;
    }
  `;

  const result = lintStrictDesignTokens(cssOffScale, { brandSpec: mockBrandSpec });
  assert.equal(result.valid, false);

  const offScaleViolations = result.violations.filter(v => v.type === 'off-scale');
  assert.ok(offScaleViolations.length >= 3, `Expected at least 3 off-scale violations, got ${offScaleViolations.length}`);
});

test('lintStrictDesignTokens handles JSX and inline styles', () => {
  const jsxCode = `
    export function Hero() {
      return (
        <section className="p-[19px] bg-[#00eefc]" style={{ marginTop: '15px' }}>
          <h1>Title</h1>
        </section>
      );
    }
  `;

  const result = lintStrictDesignTokens(jsxCode, { brandSpec: mockBrandSpec });
  assert.equal(result.valid, false);
  assert.ok(result.violations.length >= 2);
});

test('lintStrictDesignTokens executes in under 80ms', () => {
  const largeSample = `
    <div class="flex flex-col p-4 m-8 gap-4 bg-slate-900 text-white">
      ${Array.from({ length: 50 }, (_, i) => `
        <div class="p-2 m-2 gap-2 border border-slate-700">
          <p class="text-sm">Item ${i}</p>
        </div>
      `).join('\n')}
    </div>
  `;

  const start = performance.now();
  const result = lintStrictDesignTokens(largeSample, { brandSpec: mockBrandSpec });
  const duration = performance.now() - start;

  assert.equal(result.valid, true);
  assert.ok(duration < 80, `Execution took ${duration.toFixed(2)}ms, expected < 80ms`);
});

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

test('ide-pre-tool-hook blocks writes to copias/ with exit 2', () => {
  const hookScript = path.resolve(__dirname, '../scripts/ide-pre-tool-hook.js');
  const input = JSON.stringify({
    tool_name: 'Write',
    tool_input: { file_path: 'copias/urbi-ae/index.html' }
  });

  const res = spawnSync(process.execPath, [hookScript], {
    input,
    encoding: 'utf-8'
  });

  assert.equal(res.status, 2, 'Should exit with code 2 on copias write');
  assert.match(res.stderr, /POLICY_READONLY_COPIAS/);
});

test('ide-pre-tool-hook blocks cross-client access with exit 2', () => {
  const hookScript = path.resolve(__dirname, '../scripts/ide-pre-tool-hook.js');
  const contract = {
    clientScope: 'client-alpha',
    readAllowlist: ['clientes/client-alpha/**'],
    writeAllowlist: ['clientes/client-alpha/**'],
    allowedTools: ['Write']
  };

  const input = JSON.stringify({
    tool_name: 'Write',
    tool_input: { file_path: 'clientes/client-beta/index.html' },
    contract
  });

  const res = spawnSync(process.execPath, [hookScript], {
    input,
    encoding: 'utf-8'
  });

  assert.equal(res.status, 2, 'Should exit with code 2 on cross-client path');
  assert.match(res.stderr, /POLICY_CROSS_CLIENT_PATH/);
});

test('ide-pre-tool-hook approves compliant operations with exit 0 and {}', () => {
  const hookScript = path.resolve(__dirname, '../scripts/ide-pre-tool-hook.js');
  const contract = {
    clientScope: 'client-alpha',
    readAllowlist: ['clientes/client-alpha/**'],
    writeAllowlist: ['clientes/client-alpha/site/**'],
    allowedTools: ['Write']
  };

  const input = JSON.stringify({
    tool_name: 'Write',
    tool_input: { file_path: 'clientes/client-alpha/site/index.html' },
    contract
  });

  const res = spawnSync(process.execPath, [hookScript], {
    input,
    encoding: 'utf-8'
  });

  assert.equal(res.status, 0, 'Should exit with code 0 on allowed path');
  assert.match(res.stdout, /\{\}/);
});

test('ide-post-edit-hook detects violations in modified files and exits with code 2 in < 80ms', () => {
  const hookScript = path.resolve(__dirname, '../scripts/ide-post-edit-hook.js');
  const tempFile = path.resolve(__dirname, 'temp-bad-edit.html');

  fs.writeFileSync(tempFile, `
    <div class="p-[19px] bg-[#8b5cf6]">
      <p style="margin-top: 13px;">Bad tokens</p>
    </div>
  `, 'utf-8');

  try {
    const start = performance.now();
    const res = spawnSync(process.execPath, [hookScript, tempFile], {
      encoding: 'utf-8'
    });
    const duration = performance.now() - start;

    assert.equal(res.status, 2, 'Should exit with code 2 when design tokens fail');
    assert.match(res.stderr, /p-\[19px\]|arbitrary-class|off-scale/i);
    assert.ok(duration < 2500, `Execution took ${duration.toFixed(2)}ms (including process spawn)`);
  } finally {
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  }
});

test('ide-post-edit-hook approves clean files with exit 0 and {}', () => {
  const hookScript = path.resolve(__dirname, '../scripts/ide-post-edit-hook.js');
  const tempFile = path.resolve(__dirname, 'temp-good-edit.html');

  fs.writeFileSync(tempFile, `
    <div class="p-4 m-2 flex gap-4">
      <p style="margin-top: 16px;">Compliant tokens</p>
    </div>
  `, 'utf-8');

  try {
    const res = spawnSync(process.execPath, [hookScript, tempFile], {
      encoding: 'utf-8'
    });

    assert.equal(res.status, 0, 'Should exit with code 0 when clean');
    assert.match(res.stdout, /\{\}/);
  } finally {
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  }
});
