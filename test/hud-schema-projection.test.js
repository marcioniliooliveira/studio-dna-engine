const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { projectHudFromDnaIr, generateHudMarkup, injectDnaHud } = require('../src/generators/hud-projector.js');

const OPXY_DNA_PATH = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'dna-ir.json');
const opxyDna = JSON.parse(fs.readFileSync(OPXY_DNA_PATH, 'utf8'));

test('HUD Projector: injects projected HUD and runtime into HTML document', () => {
  const baseHtml = '<!DOCTYPE html><html><head></head><body><div id="hero"><h1>OP-XY</h1></div></body></html>';
  const injected = injectDnaHud(baseHtml, opxyDna);

  assert.ok(injected.includes('id="dna-tuning-hud"'), 'Must inject HUD panel');
  assert.ok(injected.includes('id="dna-hud-styles"'), 'Must inject HUD styles');
  assert.ok(injected.includes('id="dna-hud-runtime"'), 'Must inject runtime listener');
  assert.ok(injected.endsWith('</body></html>'), 'Must preserve valid HTML closing tags');

  // Second injection must be idempotent (no duplicate HUD)
  const twice = injectDnaHud(injected, opxyDna);
  const matches = (twice.match(/id="dna-tuning-hud"/g) || []).length;
  assert.equal(matches, 1, 'Injection must be strictly idempotent');
});

test('HUD Projector: generates semantic, glassmorphic markup from Framework-Neutral DNA IR', () => {
  const result = projectHudFromDnaIr(opxyDna);

  assert.ok(result.html, 'Must return generated HTML markup');
  assert.ok(result.css, 'Must return accompanying glassmorphic stylesheet');
  assert.ok(result.controlsCount >= 8, `Expected at least 8 controls, got ${result.controlsCount}`);

  // Must group controls into logical lenses/categories
  assert.ok(result.html.includes('data-lens="typography"'), 'Must contain typography lens section');
  assert.ok(result.html.includes('data-lens="surface"'), 'Must contain surface lens section');
  assert.ok(result.html.includes('data-lens="content"'), 'Must contain content lens section');

  // Must attach data attributes for adapters, targets and parameters
  assert.ok(result.html.includes('data-param-id="hero.typography.primary"'));
  assert.ok(result.html.includes('data-adapter="css"'));
  assert.ok(result.html.includes('data-target=":root"'));
  assert.ok(result.html.includes('data-property="--sans"'));

  // Color controls must be properly projected
  assert.ok(result.html.includes('type="color"'), 'Must project ColorHex to color inputs');
  assert.ok(result.html.includes('data-param-id="hero.surface.ambientDarkness"'));

  // Number/Range controls must have min/max/step bounds
  assert.ok(result.html.includes('type="range"'), 'Must project numeric parameters to range sliders');
  assert.ok(result.html.includes('data-param-id="motion.cameraGlidingDamp"'));

  // Audio frequency controls
  assert.ok(result.html.includes('data-param-id="audio.keyFeedback.baseFrequency"'));
  assert.ok(result.html.includes('data-adapter="audio"'));

  // Must include glassmorphic styling tokens
  assert.ok(result.css.includes('backdrop-filter: blur('));
  assert.ok(result.css.includes('border: 1px solid rgba('));
});

test('HUD Projector: respects mutability flags and flags invariants as locked', () => {
  const mockDna = {
    schemaVersion: '0.1.0',
    experienceId: 'test-exp',
    sourceUrl: 'https://example.com',
    targetSegment: 'test',
    confidenceScore: 0.99,
    sections: [
      {
        id: 'hero',
        role: 'hero',
        domSelector: '#hero',
        geometry: { height: '100vh', stage: 'canvas', camera: 'ortho' },
        children: ['title'],
        mutability: { copy: 'locked', typography: 'high' }
      }
    ],
    parameters: [
      {
        id: 'hero.title.lockedText',
        category: 'content',
        type: 'StringText',
        value: 'Locked Brand Name',
        mutability: 'immutable',
        confidence: 1.0,
        origin: { source: 'static-analysis', method: 'brand' }
      },
      {
        id: 'hero.title.size',
        category: 'typography',
        type: 'NumberRange',
        value: 48,
        mutability: 'mutable',
        confidence: 0.95,
        bounds: { min: 24, max: 72, step: 2, unit: 'px' },
        origin: { source: 'static-analysis', method: 'css' }
      }
    ],
    bindings: [
      {
        paramId: 'hero.title.lockedText',
        adapter: 'dom',
        target: '#hero h1',
        property: 'textContent'
      },
      {
        paramId: 'hero.title.size',
        adapter: 'css',
        target: '#hero h1',
        property: 'font-size'
      }
    ],
    constraints: [],
    invariants: ['hero.title.lockedText must never change']
  };

  const result = projectHudFromDnaIr(mockDna);

  // The locked parameter must be rendered disabled with locked indicator
  assert.ok(result.html.includes('disabled'), 'Locked parameters must be disabled in UI');
  assert.ok(result.html.includes('data-locked="true"'), 'Locked parameters must have data-locked="true"');
  assert.ok(result.html.includes('badge-locked') || result.html.includes('is-locked'), 'Must display locked badge');
});

test('HUD Projector: rejects invalid DNA IR without parameters or bindings', () => {
  assert.throws(() => projectHudFromDnaIr(null), /DNA IR object required/);
  assert.throws(() => projectHudFromDnaIr({}), /parameters array required/);
});
