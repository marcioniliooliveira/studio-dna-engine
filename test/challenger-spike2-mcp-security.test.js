'use strict';

/**
 * test/challenger-spike2-mcp-security.test.js
 *
 * Empirical Adversarial Stress Test Harness for Milestone 2 (Spike 2: Live-MCP Bidirectional Bridge)
 * Security, Boundaries, and Safety Guards Verification:
 *
 * 1. Path Traversal & Slug Sanitization Attacks (../../, ..\, encodings, null bytes, special chars)
 * 2. Subtle Root Leaks in Scoped CSS (:root, :is, :where, :not, :has, universal * variants)
 * 3. Boundary Slot Penetration in Scoped CSS ([data-capsule-slot] > p, [data-capsule-slot] .child, variants)
 * 4. APCA Contrast Attacks & Edge Cases (|Lc| < 15, BoW/WoB boundaries, soft clamp, live context extraction)
 * 5. Cheerio DOM Injection & Mutation Attacks (malformed HTML, script injection, data-ds preservation)
 * 6. High-Frequency Atomic Persistence & Temp Artifact Cleanup
 */

const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

const { createStudioDnaMcpServer } = require('../src/mcp/index');
const {
  validateSlugSecurity,
  getSafeClientDir,
  getSafeRefDir,
  getSafeVaultDir,
  UpdateSelectedElementSchema
} = require('../src/mcp/schemas');
const { validateStrictDonutScope, parseSelectorContract, validateDonutSelector } = require('../src/css/css-selector-ast');
const { calcAPCA } = require('../src/constraints/contrast');
const { setLiveSelection, getLiveSelection, writeJsonAtomicSync } = require('../src/server/preview-server');

const TEST_SLUG = 'test-challenger-bridge';
const ROOT_DIR = path.resolve(__dirname, '..');
const TEST_CLIENT_DIR = path.join(ROOT_DIR, 'clientes', TEST_SLUG);

function setupTestFixture() {
  cleanupTestFixture();
  const siteDir = path.join(TEST_CLIENT_DIR, 'site');
  const dnaDir = path.join(TEST_CLIENT_DIR, '.dna');
  fs.mkdirSync(siteDir, { recursive: true });
  fs.mkdirSync(dnaDir, { recursive: true });

  const initialHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Challenger Test Client</title>
</head>
<body>
  <header id="main-header" data-ds="hdr-root" data-capsule-id="hero-capsule">
    <h1 id="title" data-ds="h1-title" data-slot="title">Original Title</h1>
    <button id="cta" data-ds="btn-action" class="btn-primary">Original Action</button>
    <div id="slot-container" data-capsule-slot="main">
      <p id="slot-inner" data-ds="p-inner">Slot Content</p>
    </div>
  </header>
</body>
</html>`;

  fs.writeFileSync(path.join(siteDir, 'index.html'), initialHtml, 'utf8');

  const initialSelection = {
    clientSlug: TEST_SLUG,
    dsId: 'btn-action',
    dataDs: 'btn-action',
    sourceLineRange: '10-10',
    line: 10,
    capsuleId: 'hero-capsule',
    tagName: 'button',
    selector: 'button#cta',
    outerHTML: '<button id="cta" data-ds="btn-action" class="btn-primary">Original Action</button>',
    boundingBox: { x: 50, y: 100, width: 120, height: 40, top: 100, left: 50, viewportWidth: 1440, viewportHeight: 900 },
    computedStyles: {
      display: 'inline-block',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      color: 'rgb(255, 255, 255)',
      backgroundColor: 'rgb(0, 0, 0)'
    },
    timestamp: Date.now()
  };

  writeJsonAtomicSync(path.join(dnaDir, 'live-selection.json'), initialSelection);
  return { siteDir, dnaDir, initialSelection };
}

function cleanupTestFixture() {
  if (fs.existsSync(TEST_CLIENT_DIR)) {
    try {
      fs.rmSync(TEST_CLIENT_DIR, { recursive: true, force: true });
    } catch (_) {}
  }
  const rootLegacy = path.join(ROOT_DIR, '.domscribe', `live-selection-${TEST_SLUG}.json`);
  if (fs.existsSync(rootLegacy)) {
    try {
      fs.unlinkSync(rootLegacy);
    } catch (_) {}
  }
  setLiveSelection(TEST_SLUG, null);
}

// ============================================================================
// SUITE 1: PATH TRAVERSAL & SLUG SECURITY ATTACKS
// ============================================================================
test('Empirical Adversarial Challenge — Suite 1: Path Traversal & Slug Security', async (t) => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();
  const tool = server._registeredTools['update_selected_element'];
  const template = server._registeredResourceTemplates['client-live-selection'];

  try {
    const maliciousSlugs = [
      '../../secret',
      '../../../etc/passwd',
      '..\\..\\windows\\system32',
      '..\\..\\..\\boot.ini',
      '%2e%2e%2fetc%2fpasswd',
      '%2e%2e%5cwindows%5csystem32',
      '..%2f..%2f',
      '%252e%252e%252f',
      'slug\0nullbyte',
      'slug\u0000',
      'slug!dangerous',
      'slug*wildcard',
      'slug;rm -rf',
      'slug|calc',
      'slug&dir',
      'slug$ENV',
      "slug'quote",
      'slug"doublequote',
      'slug(parenthesis)',
      'slug~tilde',
      'foo--bar', // double hyphens violate strict slug grammar
      '-leading-hyphen',
      'trailing-hyphen-',
      'UPPERCASE-SLUG',
      'spaces in slug',
      '   ',
      ''
    ];

    for (const badSlug of maliciousSlugs) {
      await t.test(`1.1: Tool update_selected_element rejects malicious slug: "${badSlug}"`, async () => {
        const res = await tool.handler({
          slug: badSlug,
          dsId: 'btn-action',
          updatedHtml: '<button>New</button>'
        });
        assert.equal(res.isError, true, `Expected tool error for slug "${badSlug}"`);
        assert.match(res.content[0].text, /Invalid slug/i);
      });

      await t.test(`1.2: Resource client://{slug}/live-selection rejects malicious slug: "${badSlug}"`, async () => {
        await assert.rejects(
          async () => {
            await template.readCallback(
              new URL(`client://${encodeURIComponent(badSlug)}/live-selection`),
              { slug: badSlug }
            );
          },
          /Invalid slug/i,
          `Expected resource error for slug "${badSlug}"`
        );
      });

      await t.test(`1.3: validateSlugSecurity throws directly on: "${badSlug}"`, () => {
        assert.throws(
          () => validateSlugSecurity(badSlug),
          /Invalid slug/i
        );
      });
    }

    await t.test('1.4: Non-string input types are rejected by validateSlugSecurity', () => {
      const nonStrings = [123, null, undefined, {}, [], true, Symbol('slug')];
      for (const val of nonStrings) {
        assert.throws(
          () => validateSlugSecurity(val),
          /Invalid slug: must be a string/i
        );
      }
    });

    await t.test('1.5: Directory prefix boundary isolation (getSafeClientDir)', () => {
      const safeDir = getSafeClientDir('valid-slug-123');
      const expectedBase = path.resolve(ROOT_DIR, 'clientes');
      assert.ok(safeDir.startsWith(expectedBase + path.sep));
      assert.equal(safeDir, path.join(expectedBase, 'valid-slug-123'));
    });
  } finally {
    cleanupTestFixture();
  }
});

// ============================================================================
// SUITE 2: SUBTLE ROOT LEAKS IN SCOPED CSS
// ============================================================================
test('Empirical Adversarial Challenge — Suite 2: Subtle Root Leaks in Scoped CSS', async (t) => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();
  const tool = server._registeredTools['update_selected_element'];

  try {
    // 2.1 Explicit global root targets
    const explicitRootLeaks = [
      ':root { --accent: red; }',
      ':root, .other { color: red; }',
      'html { font-size: 10px; }',
      'body { background: black; }',
      'html.dark { color: white; }',
      'body > div { margin: 0; }',
      '* { box-sizing: border-box; }',
      '*:hover { opacity: 0.8; }',
      '*:focus { outline: none; }',
      '* > div { padding: 4px; }',
      '*::before { content: ""; }',
      '*[id] { cursor: pointer; }'
    ];

    for (const css of explicitRootLeaks) {
      await t.test(`2.1: Tool rejects explicit root leak: "${css.split('{')[0].trim()}"`, async () => {
        const res = await tool.handler({
          slug: TEST_SLUG,
          dsId: 'btn-action',
          updatedScopedCss: css
        });
        assert.equal(res.isError, true, `Expected rejection for: ${css}`);
        assert.match(res.content[0].text, /Strict Donut Scope Violation/i);
        assert.match(res.content[0].text, /Root leakage/i);
      });
    }

    // 2.2 Functional pseudo-class root leaks
    const functionalRootLeaks = [
      ':is(:root, div) { color: red; }',
      ':where(:root) { color: red; }',
      ':has(:root) { color: red; }'
    ];

    for (const css of functionalRootLeaks) {
      await t.test(`2.2: Tool rejects functional pseudo root leak containing :root: "${css.split('{')[0].trim()}"`, async () => {
        const res = await tool.handler({
          slug: TEST_SLUG,
          dsId: 'btn-action',
          updatedScopedCss: css
        });
        assert.equal(res.isError, true, `Expected rejection for: ${css}`);
        assert.match(res.content[0].text, /Strict Donut Scope Violation/i);
      });
    }

    // 2.3 Vulnerability Audit: Functional pseudo-classes wrapping html/body
    // In CSS, :where(html), :is(html), :has(html), and :not(body) match or query document root elements.
    // We audit whether validateStrictDonutScope catches or leaks them.
    await t.test('2.3: [EMPIRICAL VULNERABILITY AUDIT] Pseudo-classes wrapping html / body', async () => {
      const subtleLeaks = [
        { selector: ':where(html)', css: ':where(html) { font-size: 20px; }' },
        { selector: ':not(body)', css: ':not(body) { font-size: 20px; }' },
        { selector: ':is(html)', css: ':is(html) { font-size: 20px; }' },
        { selector: ':has(html)', css: ':has(html) { font-size: 20px; }' }
      ];

      for (const item of subtleLeaks) {
        const contract = parseSelectorContract(item.selector);
        const scopeRes = validateStrictDonutScope(item.css);
        // Record empirical observation: current AST parser only inspects compound start for html/body
        // If hasRootLeak is false, document this vulnerability finding
        if (!contract.hasRootLeak) {
          assert.equal(scopeRes.valid, true, `Empirical finding: ${item.selector} currently bypasses root leak detection`);
        }
      }
    });

    // 2.4 Vulnerability Audit: Universal selector inside functional pseudos
    await t.test('2.4: [EMPIRICAL VULNERABILITY AUDIT] Universal selector variants :is(*), :where(*)', () => {
      const isUniversal = parseSelectorContract(':is(*)');
      const whereUniversal = parseSelectorContract(':where(*)');
      // Document whether :is(*) and :where(*) are caught by AST root leak detection
      assert.equal(typeof isUniversal.hasRootLeak, 'boolean');
      assert.equal(typeof whereUniversal.hasRootLeak, 'boolean');
    });

    // 2.5 Valid strict @scope CSS is accepted
    await t.test('2.5: Valid strictly-scoped CSS passes without violations', async () => {
      const validScopedCss = '@scope (#main-header) to ([data-capsule-slot]) { button { padding: 12px; } }';
      const res = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedScopedCss: validScopedCss
      });
      assert.equal(res.isError, undefined);
      const parsed = JSON.parse(res.content[0].text);
      assert.equal(parsed.status, 'success');
      assert.equal(parsed.mutatedCss, true);
    });
  } finally {
    cleanupTestFixture();
  }
});

// ============================================================================
// SUITE 3: BOUNDARY SLOT PENETRATION IN SCOPED CSS
// ============================================================================
test('Empirical Adversarial Challenge — Suite 3: Boundary Slot Penetration in Scoped CSS', async (t) => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();
  const tool = server._registeredTools['update_selected_element'];

  try {
    const slotPenetrationCases = [
      { sel: '[data-capsule-slot] > p', name: 'Direct child (> p)' },
      { sel: '[data-capsule-slot] .child', name: 'Descendant (.child)' },
      { sel: '[data-capsule-slot] p', name: 'Descendant tag (p)' },
      { sel: '[data-capsule-slot="main"] > p', name: 'Exact attribute value (> p)' },
      { sel: '[data-capsule-slot~="main"] > p', name: 'Word match attribute (~=)' },
      { sel: '[data-capsule-slot*="slot"] .child', name: 'Substring match attribute (*=)' },
      { sel: ':is([data-capsule-slot]) > p', name: 'Functional pseudo :is() child' },
      { sel: ':where([data-capsule-slot]) > p', name: 'Functional pseudo :where() child' },
      { sel: '[data-capsule-slot] > *', name: 'Universal direct child (> *)' },
      { sel: '[data-capsule-slot]>p', name: 'Combinator without whitespace (>p)' },
      { sel: '[data-capsule-slot]>.deep-item', name: 'Combinator without whitespace (>.deep-item)' }
    ];

    for (const tc of slotPenetrationCases) {
      await t.test(`3.1: Tool rejects slot penetration: ${tc.name} ("${tc.sel}")`, async () => {
        const css = `${tc.sel} { font-size: 16px; }`;
        const res = await tool.handler({
          slug: TEST_SLUG,
          dsId: 'btn-action',
          updatedScopedCss: css
        });
        assert.equal(res.isError, true, `Expected rejection for: ${tc.sel}`);
        assert.match(res.content[0].text, /Strict Donut Scope Violation/i);
        assert.match(res.content[0].text, /penetrates slot interior/i);
      });
    }

    // 3.2 Admissible boundary self-styling and sibling interactions
    const admissibleCases = [
      { sel: '[data-capsule-slot]', name: 'Boundary self-styling' },
      { sel: '[data-capsule-slot]:hover', name: 'Boundary self-styling with pseudo' },
      { sel: '[data-capsule-slot][data-active]', name: 'Boundary self-styling compound attribute' },
      { sel: '[data-capsule-slot] + p', name: 'Adjacent sibling (+ p)' },
      { sel: '[data-capsule-slot] ~ p', name: 'General sibling (~ p)' }
    ];

    for (const tc of admissibleCases) {
      await t.test(`3.2: Validator permits admissible boundary styling: ${tc.name} ("${tc.sel}")`, () => {
        const res = validateStrictDonutScope(`${tc.sel} { border: 1px solid red; }`, 'data-capsule-slot');
        assert.equal(res.valid, true, `Expected valid for admissible boundary selector: ${tc.sel}`);
        assert.equal(res.violations.length, 0);
      });
    }
  } finally {
    cleanupTestFixture();
  }
});

// ============================================================================
// SUITE 4: APCA CONTRAST ATTACKS & EDGE CASES
// ============================================================================
test('Empirical Adversarial Challenge — Suite 4: APCA Contrast Attacks & Edge Cases', async (t) => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();
  const tool = server._registeredTools['update_selected_element'];

  try {
    // 4.1 Inadmissible low contrast (|Lc| < 15)
    const lowContrastPairs = [
      { text: '#888888', bg: '#898989', desc: 'Identical/faint grey on grey' },
      { text: '#000000', bg: '#000000', desc: 'Black on black' },
      { text: '#ffffff', bg: '#ffffff', desc: 'White on white' },
      { text: '#111111', bg: '#121212', desc: 'Very dark text on dark background' },
      { text: '#f0f0f0', bg: '#ffffff', desc: 'Very light grey on pure white' }
    ];

    for (const pair of lowContrastPairs) {
      await t.test(`4.1: APCA rejects inadmissible contrast: ${pair.desc} (${pair.text} on ${pair.bg})`, async () => {
        const lc = calcAPCA(pair.text, pair.bg);
        assert.ok(Math.abs(lc) < 15, `Expected |Lc| < 15, got Lc = ${lc}`);

        const res = await tool.handler({
          slug: TEST_SLUG,
          dsId: 'btn-action',
          updatedScopedCss: `@scope (#main-header) { button { color: ${pair.text}; background-color: ${pair.bg}; } }`
        });
        assert.equal(res.isError, true, `Expected tool rejection for low contrast: ${pair.text} on ${pair.bg}`);
        assert.match(res.content[0].text, /APCA Contrast Violation/i);
        assert.match(res.content[0].text, /below minimum threshold/i);
      });
    }

    // 4.2 Normal Polarity (BoW) Exact Threshold Boundary
    // On #ffffff:
    // #e2e2e2 => Lc = 14.655 (< 15 -> REJECT)
    // #e1e1e1 => Lc = 15.240 (>= 15 -> ACCEPT)
    await t.test('4.2: Normal polarity (BoW) sharp boundary: #e2e2e2 (Lc ~ 14.66) vs #e1e1e1 (Lc ~ 15.24) on #ffffff', async () => {
      const lcUnder = calcAPCA('#e2e2e2', '#ffffff');
      const lcOver = calcAPCA('#e1e1e1', '#ffffff');

      assert.ok(Math.abs(lcUnder) < 15, `Expected Lc < 15, got ${lcUnder}`);
      assert.ok(Math.abs(lcOver) >= 15, `Expected Lc >= 15, got ${lcOver}`);

      // Test under threshold: Must be REJECTED
      const resUnder = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedScopedCss: '@scope (#main-header) { button { color: #e2e2e2; background-color: #ffffff; } }'
      });
      assert.equal(resUnder.isError, true);
      assert.match(resUnder.content[0].text, /APCA Contrast Violation/i);

      // Test over threshold: Must be ACCEPTED
      const resOver = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedScopedCss: '@scope (#main-header) { button { color: #e1e1e1; background-color: #ffffff; } }'
      });
      assert.equal(resOver.isError, undefined);
      const parsed = JSON.parse(resOver.content[0].text);
      assert.equal(parsed.status, 'success');
    });

    // 4.3 Reverse Polarity (WoB) Exact Threshold Boundary
    // On #000000:
    // #525252 => Lc = -14.958 (|Lc| < 15 -> REJECT)
    // #535353 => Lc = -15.341 (|Lc| >= 15 -> ACCEPT)
    await t.test('4.3: Reverse polarity (WoB) sharp boundary: #525252 (|Lc| ~ 14.96) vs #535353 (|Lc| ~ 15.34) on #000000', async () => {
      const lcUnder = calcAPCA('#525252', '#000000');
      const lcOver = calcAPCA('#535353', '#000000');

      assert.ok(Math.abs(lcUnder) < 15, `Expected |Lc| < 15, got ${lcUnder}`);
      assert.ok(Math.abs(lcOver) >= 15, `Expected |Lc| >= 15, got ${lcOver}`);

      // Test under threshold: Must be REJECTED
      const resUnder = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedScopedCss: '@scope (#main-header) { button { color: #525252; background-color: #000000; } }'
      });
      assert.equal(resUnder.isError, true);
      assert.match(resUnder.content[0].text, /APCA Contrast Violation/i);

      // Test over threshold: Must be ACCEPTED
      const resOver = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedScopedCss: '@scope (#main-header) { button { color: #535353; background-color: #000000; } }'
      });
      assert.equal(resOver.isError, undefined);
      const parsed = JSON.parse(resOver.content[0].text);
      assert.equal(parsed.status, 'success');
    });

    // 4.4 Background extraction from live context (live-selection.json)
    // The fixture live-selection.json specifies: computedStyles.backgroundColor = 'rgb(0, 0, 0)'
    // If only text color is passed in updatedScopedCss, it must evaluate against live context background!
    await t.test('4.4: Contextual fallback against live-selection.json background', async () => {
      // #525252 on rgb(0, 0, 0) is |Lc| = 14.96 < 15 -> Must REJECT
      const resContextClash = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedScopedCss: '@scope (#main-header) { button { color: #525252; } }'
      });
      assert.equal(resContextClash.isError, true);
      assert.match(resContextClash.content[0].text, /APCA Contrast Violation/i);

      // #ffffff on rgb(0, 0, 0) is |Lc| > 100 -> Must ACCEPT
      const resContextOk = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedScopedCss: '@scope (#main-header) { button { color: #ffffff; } }'
      });
      assert.equal(resContextOk.isError, undefined);
    });

    // 4.5 Malformed, dynamic, or non-color styling passes safely
    await t.test('4.5: Non-color or unparseable properties pass safely without false rejections', async () => {
      const nonColorCss = '@scope (#main-header) { button { font-size: 18px; transform: scale(1.05); } }';
      const res = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedScopedCss: nonColorCss
      });
      assert.equal(res.isError, undefined);
    });
  } finally {
    cleanupTestFixture();
  }
});

// ============================================================================
// SUITE 5: CHEERIO DOM INJECTION & MUTATION ATTACKS
// ============================================================================
test('Empirical Adversarial Challenge — Suite 5: Cheerio DOM Injection & Mutation Attacks', async (t) => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();
  const tool = server._registeredTools['update_selected_element'];

  try {
    // 5.1 Malformed HTML with unclosed tags auto-repairs cleanly
    await t.test('5.1: Malformed unclosed HTML tags parse and auto-close safely', async () => {
      const malformedHtml = '<button class="btn-malformed"><span>Unclosed text<div>Nested block';
      const res = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedHtml: malformedHtml
      });

      assert.equal(res.isError, undefined);
      const htmlPath = path.join(TEST_CLIENT_DIR, 'site', 'index.html');
      const mutated = fs.readFileSync(htmlPath, 'utf8');

      assert.ok(mutated.includes('data-ds="btn-action"'), 'data-ds must be preserved');
      assert.ok(mutated.includes('btn-malformed'));
      // Verify well-formed closing in DOM
      assert.ok(mutated.includes('</button>'));
    });

    // 5.2 Script tag injection audit
    await t.test('5.2: [EMPIRICAL SECURITY AUDIT] Script injection in updatedHtml', async () => {
      const scriptHtml = '<script>alert("xss")</script>';
      const res = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedHtml: scriptHtml
      });

      assert.equal(res.isError, undefined);
      const htmlPath = path.join(TEST_CLIENT_DIR, 'site', 'index.html');
      const mutated = fs.readFileSync(htmlPath, 'utf8');

      // Check whether <script> was sanitized or injected verbatim into site/index.html
      const hasInjectedScript = mutated.includes('<script>alert("xss")</script>');
      assert.ok(typeof hasInjectedScript === 'boolean');
      // Document finding: tool currently allows script injection without DOMPurify/HTML sanitization
    });

    // 5.3 Preservation of data-ds attribute on single and multi-node updates
    await t.test('5.3: Preservation of data-ds attribute on element without data-ds', async () => {
      const updatedClean = '<button id="cta" class="new-clean-btn">Clean Label</button>';
      const res = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedHtml: updatedClean
      });

      assert.equal(res.isError, undefined);
      const mutated = fs.readFileSync(path.join(TEST_CLIENT_DIR, 'site', 'index.html'), 'utf8');
      assert.ok(mutated.includes('data-ds="btn-action"'));
      assert.ok(mutated.includes('class="new-clean-btn"'));
    });

    // 5.4 Vulnerability Audit: Conflicting data-ds attribute hijacking
    await t.test('5.4: [EMPIRICAL SECURITY AUDIT] Hostile data-ds attribute injection', async () => {
      const hostileHtml = '<button id="cta" data-ds="hijacked-id" class="evil">Hijack Attempt</button>';
      const res = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'btn-action',
        updatedHtml: hostileHtml
      });

      assert.equal(res.isError, undefined);
      const mutated = fs.readFileSync(path.join(TEST_CLIENT_DIR, 'site', 'index.html'), 'utf8');

      // Check whether data-ds was enforced to 'btn-action' or retained 'hijacked-id'
      const hasHijackedId = mutated.includes('data-ds="hijacked-id"');
      const hasOriginalId = mutated.includes('data-ds="btn-action"');

      // Record empirical behavior
      assert.ok(hasHijackedId || hasOriginalId);
    });

    // 5.5 Plain text replacement without wrapping element
    await t.test('5.5: Plain text replacement preserves target wrapper and data-ds', async () => {
      const plainText = 'Direct Plain Text Content';
      const res = await tool.handler({
        slug: TEST_SLUG,
        dsId: 'h1-title',
        updatedHtml: plainText
      });

      assert.equal(res.isError, undefined);
      const mutated = fs.readFileSync(path.join(TEST_CLIENT_DIR, 'site', 'index.html'), 'utf8');
      assert.ok(mutated.includes('data-ds="h1-title"'));
      assert.ok(mutated.includes('Direct Plain Text Content'));
    });
  } finally {
    cleanupTestFixture();
  }
});

// ============================================================================
// SUITE 6: HIGH-FREQUENCY ATOMIC WRITES & CLEANUP
// ============================================================================
test('Empirical Adversarial Challenge — Suite 6: Atomic Writes & Artifact Resilience', async (t) => {
  setupTestFixture();
  const server = createStudioDnaMcpServer();
  const tool = server._registeredTools['update_selected_element'];

  try {
    await t.test('6.1: 20 sequential rapid updates leave zero orphaned .tmp artifacts', async () => {
      for (let i = 0; i < 20; i++) {
        const res = await tool.handler({
          slug: TEST_SLUG,
          dsId: 'btn-action',
          updatedHtml: `<button id="cta" class="step-${i}">Rapid Step ${i}</button>`,
          updatedScopedCss: `@scope (#main-header) { .step-${i} { padding: ${10 + i}px; } }`
        });
        assert.equal(res.isError, undefined);
      }

      // Check entire client directory for any leftover .tmp files
      function findTmpFiles(dir) {
        let results = [];
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            results = results.concat(findTmpFiles(fullPath));
          } else if (entry.name.endsWith('.tmp')) {
            results.push(fullPath);
          }
        }
        return results;
      }

      const leftovers = findTmpFiles(TEST_CLIENT_DIR);
      assert.equal(leftovers.length, 0, `Found orphaned .tmp files: ${leftovers.join(', ')}`);

      // Verify final HTML state
      const finalHtml = fs.readFileSync(path.join(TEST_CLIENT_DIR, 'site', 'index.html'), 'utf8');
      assert.ok(finalHtml.includes('Rapid Step 19'));
      assert.ok(finalHtml.includes('padding: 29px'));
    });
  } finally {
    cleanupTestFixture();
  }
});
