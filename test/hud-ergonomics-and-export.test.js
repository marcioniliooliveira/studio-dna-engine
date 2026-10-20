const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { projectHudFromDnaIr, injectDnaHud, getGlassmorphicStyles } = require('../src/generators/hud-projector');

describe('HUD Ergonomics, Dev-to-Code Export & Visual Inspector Suite', () => {
  const sampleDnaIr = {
    schemaVersion: '0.1.0',
    experienceId: 'OP–XY Lab',
    parameters: [
      {
        id: 'hero.typography.primary',
        category: 'typography',
        type: 'FontSpec',
        value: { family: 'Geist' },
        mutability: 'mutable'
      },
      {
        id: 'hero.surface.ambientDarkness',
        category: 'surface',
        type: 'ColorHex',
        value: '#0c0d0e',
        mutability: 'mutable'
      }
    ],
    bindings: [
      {
        paramId: 'hero.typography.primary',
        adapter: 'css',
        target: ':root',
        property: '--sans'
      },
      {
        paramId: 'hero.surface.ambientDarkness',
        adapter: 'css',
        target: ':root',
        property: '--bg'
      }
    ],
    effects: ['morph-text', 'gooey-droplets', 'classic-slide']
  };

  it('Generates accordion-compatible lens markup with collapsible chevron and content wrappers', () => {
    const projected = projectHudFromDnaIr(sampleDnaIr);
    assert.ok(projected.html.includes('class="dna-chevron"'), 'Must include chevron indicator');
    assert.ok(projected.html.includes('class="dna-hud-lens-content"'), 'Must wrap rows in content container');
  });

  it('Includes keyboard shortcut, panel hide and accordion CSS rules in glassmorphic styles', () => {
    const css = getGlassmorphicStyles();
    assert.ok(css.includes('.dna-hud-panel.is-hidden'), 'Must define .is-hidden rule');
    assert.ok(css.includes('.dna-hud-lens.is-collapsed .dna-hud-lens-content'), 'Must define collapsed accordion rule');
    assert.ok(css.includes('.dna-contrast-badge'), 'Must define contrast badge styles');
    assert.ok(css.includes('.dna-inspector-btn'), 'Must define inspector styles');
    assert.ok(css.includes('.dna-export-btn'), 'Must define export button styles');
  });

  it('Injects header inspector button, APCA badge and export drawer into the HUD', () => {
    const projected = projectHudFromDnaIr(sampleDnaIr);
    assert.ok(projected.html.includes('id="dna-inspect-btn"'), 'Must render inspector crosshair button');
    assert.ok(projected.html.includes('id="dna-contrast-badge"'), 'Must render APCA contrast badge');
    assert.ok(projected.html.includes('id="dna-btn-copy-css"'), 'Must render copy CSS tokens button');
    assert.ok(projected.html.includes('id="dna-btn-export-spec"'), 'Must render export spec JSON button');
    assert.ok(projected.html.includes('id="dna-btn-reset-preset"'), 'Must render reset preset button');
  });

  it('injectDnaHud purges legacy prototype HUD nodes and injects clean canonical HUD', () => {
    const dirtyHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test Page</title>
        <style id="studio-dna-live-hud-styles">.legacy-hud { display: block; }</style>
      </head>
      <body>
        <div id="dna-hud-root"><div class="tabs">Legacy Tabs</div></div>
        <section id="hero"><h1>OP–XY</h1></section>
        <script id="studio-dna-live-hud-logic">console.log('legacy');</script>
      </body>
      </html>
    `;

    const injected = injectDnaHud(dirtyHtml, sampleDnaIr);
    assert.ok(!injected.includes('id="dna-hud-root"'), 'Legacy #dna-hud-root must be expunged');
    assert.ok(!injected.includes('id="studio-dna-live-hud-styles"'), 'Legacy styles must be expunged');
    assert.ok(!injected.includes('id="studio-dna-live-hud-logic"'), 'Legacy logic must be expunged');
    assert.ok(injected.includes('id="dna-tuning-hud"'), 'Canonical HUD must be injected');
    assert.ok(injected.includes('id="dna-btn-copy-css"'), 'Export drawer must be injected');
  });

  it('Provides explicit close button (✕) and floating reopen pill button with shortcut sync', () => {
    const projected = projectHudFromDnaIr(sampleDnaIr);
    assert.ok(projected.html.includes('id="dna-hud-close-btn"'), 'Must render explicit close button in header');
    assert.ok(projected.html.includes('id="dna-hud-reopen-btn"'), 'Must render floating reopen trigger pill');
    
    const css = getGlassmorphicStyles();
    assert.ok(css.includes('.dna-hud-close-btn'), 'Must define close button styles');
    assert.ok(css.includes('.dna-hud-reopen-btn'), 'Must define floating reopen pill styles');
  });
});
