const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const siteHtmlPath = path.join(rootDir, 'clientes', 'opxy-tuning-lab', 'site', 'index.html');
const { injectDnaHud } = require(path.join(rootDir, 'src', 'generators', 'hud-projector.js'));

describe('Morph-Text Transition Engine (VengeanceUI Specification)', () => {

  test('SVG Defs: #dna-morph-filter exists with feColorMatrix threshold (25 -9) and feComposite atop', () => {
    const html = fs.readFileSync(siteHtmlPath, 'utf8');
    
    // Check for morph filter definition
    assert.match(html, /<filter\s+id=["']dna-morph-filter["']/i, 'SVG must contain <filter id="dna-morph-filter">');
    
    // Check for feColorMatrix threshold values: 25 -9
    assert.match(html, /values=["']1\s+0\s+0\s+0\s+0\s+0\s+1\s+0\s+0\s+0\s+0\s+0\s+1\s+0\s+0\s+0\s+0\s+0\s+25\s+-9["']/i, 
      'feColorMatrix must specify threshold matrix with 25 alpha factor and -9 offset');
      
    // Check for feComposite atop operator
    assert.match(html, /<feComposite[^>]+operator=["']atop["']/i,
      'feComposite must use operator="atop" to preserve original source graphics, fonts, and colors');
  });

  test('CSS Specification: data-transition-style="morph" applies morph filter and scale/blur transforms', () => {
    const html = fs.readFileSync(siteHtmlPath, 'utf8');
    
    // Container filter
    assert.match(html, /#strip\[data-transition-style=["']?morph["']?\]\s*\.stack[\s\S]*?filter:\s*url\(#dna-morph-filter\)/i,
      'CSS must apply url(#dna-morph-filter) to .stack under data-transition-style="morph"');

    // Key transforms: scale and blur
    assert.match(html, /#strip\[data-transition-style=["']?morph["']?\]\s*\.stack\s+b[\s\S]*?transform:[\s\S]*?scale\(/i,
      'CSS must define scale transform for entering words');

    assert.match(html, /#strip\[data-transition-style=["']?morph["']?\]\s*\.stack\s+b\.on[\s\S]*?transform:\s*translateY\(0\)\s+scale\(1\)/i,
      'Active word (.on) must resolve to scale(1) and translateY(0)');

    assert.match(html, /#strip\[data-transition-style=["']?morph["']?\]\s*\.stack\s+b\.was[\s\S]*?scale\(/i,
      'Past word (.was) must dissolve with outward scale expand');
  });

  test('HUD Projector: exposes transition style switcher and injects #dna-morph-filter dynamically', () => {
    const mockHtml = '<!DOCTYPE html><html><head></head><body><section id="strip"><div class="stack"><b>sample.</b></div></section></body></html>';
    const mockIr = {
      schemaVersion: '0.1.0',
      specimen: 'test-specimen',
      capabilities: { typography: { active: true, confidence: 1.0 } },
      sections: [{ id: 'strip', role: 'kinetic-strip', title: 'Strip Section', mutability: 'mutable' }],
      parameters: [
        { id: 'strip.motion.transitionStyle', category: 'motion', type: 'Enum', value: 'morph', mutability: 'mutable' }
      ],
      bindings: [
        { paramId: 'strip.motion.transitionStyle', adapter: 'dom', target: '#strip', property: 'dataset.transitionStyle' }
      ],
      constraints: [],
      invariants: []
    };

    const projected = injectDnaHud(mockHtml, mockIr);
    assert.match(projected, /id=["']dna-morph-filter["']/, 'HUD Projector must inject #dna-morph-filter into HTML');
    assert.match(projected, /OPXY_SET_TRANSITION_STYLE/, 'HUD Projector must expose OPXY_SET_TRANSITION_STYLE runtime helper');
  });

  test('Font Neutrality: morph text uses CSS font variables and does not hardcode Space Grotesk', () => {
    const html = fs.readFileSync(siteHtmlPath, 'utf8');
    
    // Ensure font-family on #strip .stack uses var(--sans) or typography tokens
    assert.match(html, /#strip\s*\.stack[\s\S]*?var\(--sans\)|#strip[\s\S]*?var\(--sans\)/i,
      'Strip stack must inherit or reference var(--sans) for universal font preset switching');
  });

  test('Gradient Synchronization: #strip .stack b follows the hero dual-gradient using background-clip: text and --brand-grad variables', () => {
    const html = fs.readFileSync(siteHtmlPath, 'utf8');
    
    assert.match(html, /#strip\s+\.stack\s+b[\s\S]*?background-clip:\s*text/i,
      '#strip .stack b must have background-clip: text');
    assert.match(html, /#strip\s+\.stack\s+b[\s\S]*?var\(--brand-grad-start/i,
      '#strip .stack b must reference --brand-grad-start for hero dual-gradient synchronization');
  });

});
