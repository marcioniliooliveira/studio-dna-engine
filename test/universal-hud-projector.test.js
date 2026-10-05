const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('Universal DNA Tuning HUD (Shadow DOM & Auto-Discovery Suite)', () => {
  const autoDiscoveryPath = path.resolve(__dirname, '../src/generators/hud-auto-discovery.js');
  const hudComponentPath = path.resolve(__dirname, '../src/dev/universal-hud-component.js');

  it('1. Auto-Discovery Module exists and extracts CSS variables into typed buckets', () => {
    assert.ok(fs.existsSync(autoDiscoveryPath), 'src/generators/hud-auto-discovery.js must exist');
    const { extractCssTokensFromText } = require(autoDiscoveryPath);
    assert.equal(typeof extractCssTokensFromText, 'function');

    const sampleCss = `
      :root {
        --brand-primary: #00ffaa;
        --brand-dark: #0a0a0c;
        --spacing-hero: 48px;
        --lenis-duration: 1.2s;
        --font-main: 'Geist', sans-serif;
        --card-alpha: 0.15;
      }
    `;

    const tokens = extractCssTokensFromText(sampleCss);
    assert.ok(tokens.colors.some(c => c.prop === '--brand-primary' && c.value === '#00ffaa'), 'Must classify hex as color');
    assert.ok(tokens.colors.some(c => c.prop === '--brand-dark'), 'Must classify dark hex as color');
    assert.ok(tokens.numbers.some(n => n.prop === '--spacing-hero' && n.unit === 'px'), 'Must classify px as numeric');
    assert.ok(tokens.numbers.some(n => n.prop === '--lenis-duration' && n.unit === 's'), 'Must classify seconds as numeric');
    assert.ok(tokens.numbers.some(n => n.prop === '--card-alpha'), 'Must classify float as numeric');
    assert.ok(tokens.fonts.some(f => f.prop === '--font-main'), 'Must classify font family');
  });

  it('2. Universal HUD Component generates Web Component script with Shadow DOM isolation', () => {
    assert.ok(fs.existsSync(hudComponentPath), 'src/dev/universal-hud-component.js must exist');
    const { generateUniversalHudScript, getShadowDomStyles } = require(hudComponentPath);
    assert.equal(typeof generateUniversalHudScript, 'function');
    assert.equal(typeof getShadowDomStyles, 'function');

    const script = generateUniversalHudScript({
      clientSlug: 'more-nutrition-tuning-lab',
      title: 'More Nutrition — Live Tuning Studio',
      effects: ['canvas-scroll-scrubber']
    });

    assert.ok(script.includes('customElements.define'), 'Must register custom element');
    assert.ok(script.includes('attachShadow'), 'Must use attachShadow');
    assert.ok(script.includes('<studio-dna-hud'), 'Must declare studio-dna-hud');
    assert.ok(script.includes('data-effect-controls="canvas-scroll-scrubber"'), 'Must bind registered 3D canvas scrubber controls');

    const styles = getShadowDomStyles();
    assert.ok(styles.includes(':host'), 'Shadow styles must target :host');
    assert.ok(styles.includes('backdrop-filter: blur('), 'Must include glassmorphism');
  });

  it('3. Injects Universal HUD into document without global CSS contamination', () => {
    const { injectUniversalHud } = require('../src/generators/hud-projector.js');
    assert.equal(typeof injectUniversalHud, 'function');

    const baseHtml = '<!DOCTYPE html><html><head><title>Test</title></head><body><div id="app">Content</div></body></html>';
    const result = injectUniversalHud(baseHtml, {
      clientSlug: 'test-lab',
      title: 'Test Lab'
    });

    assert.ok(result.includes('<studio-dna-hud'), 'Must inject <studio-dna-hud>');
    assert.ok(result.includes('id="studio-dna-universal-hud-script"'), 'Must inject script');
    // Global page must not have .dna-hud-panel polluting the head styles
    assert.ok(!result.includes('<style id="dna-hud-styles">'), 'Must not pollute global head with HUD panel styles');
  });

  it('4. Preview server handles POST /api/save-dna-mutation and writes to client brand-spec.json', async () => {
    const { saveDnaMutation } = require('../src/server/preview-server.js');
    assert.equal(typeof saveDnaMutation, 'function');

    const tempSlug = 'tmp-hud-test-client-' + Date.now();
    const tempDir = path.resolve(__dirname, `../clientes/${tempSlug}`);
    fs.mkdirSync(tempDir, { recursive: true });

    try {
      const payload = {
        slug: tempSlug,
        theme: {
          primary: '#ff3a2f',
          bgBase: '#111213'
        },
        typography: {
          primary: 'Syne'
        },
        effects: {
          'sequence.scrubSmoothness': 1.5
        }
      };

      const result = await saveDnaMutation(payload);
      assert.equal(result.success, true);

      const savedSpecPath = path.join(tempDir, 'brand-spec.json');
      assert.ok(fs.existsSync(savedSpecPath), 'brand-spec.json must be written to disk');
      const savedData = JSON.parse(fs.readFileSync(savedSpecPath, 'utf8'));
      assert.equal(savedData.theme?.primary, '#ff3a2f');
      assert.equal(savedData.typography?.primary, 'Syne');
      assert.equal(savedData.effects?.['sequence.scrubSmoothness'], 1.5);
    } finally {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }
  });
});
