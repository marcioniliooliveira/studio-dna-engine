const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const fs = require('fs');

describe('Universal UI/UX Effect Registry & Dynamic Projection', () => {
  const registryModulePath = path.resolve(__dirname, '../src/registry/effect-registry.js');
  
  it('Registry Module exists and exports required methods', () => {
    assert.ok(fs.existsSync(registryModulePath), 'src/registry/effect-registry.js must exist');
    const registry = require(registryModulePath);
    assert.equal(typeof registry.registerEffect, 'function');
    assert.equal(typeof registry.getEffect, 'function');
    assert.equal(typeof registry.listByCategory, 'function');
    assert.equal(typeof registry.generateCompositeSvgDefs, 'function');
    assert.equal(typeof registry.generateCompositeStyles, 'function');
  });

  it('Rejects invalid effect specs missing required schema fields', () => {
    const registry = require(registryModulePath);
    assert.throws(() => {
      registry.registerEffect(null);
    }, /Effect spec must be an object/);

    assert.throws(() => {
      registry.registerEffect({ name: 'No ID' });
    }, /Effect spec requires id, name and category/);
  });

  it('Loads canonical pre-registered effects: morph-text, gooey-droplets, and classic-slide', () => {
    const registry = require(registryModulePath);
    const morph = registry.getEffect('morph-text');
    assert.ok(morph, 'morph-text must be registered');
    assert.equal(morph.category, 'typography-transition');
    assert.ok(Array.isArray(morph.prerequisites?.svgFilters), 'morph-text must declare svgFilters');

    const gooey = registry.getEffect('gooey-droplets');
    assert.ok(gooey, 'gooey-droplets must be registered');

    const classic = registry.getEffect('classic-slide');
    assert.ok(classic, 'classic-slide must be registered');

    const transitions = registry.listByCategory('typography-transition');
    assert.ok(transitions.length >= 3, 'Must list at least 3 transitions');
  });

  it('Generates composite deduplicated SVG Defs for active effects', () => {
    const registry = require(registryModulePath);
    const svgDefs = registry.generateCompositeSvgDefs(['morph-text', 'gooey-droplets']);
    assert.ok(svgDefs.includes('id="dna-morph-filter"'), 'Must include morph filter');
    assert.ok(svgDefs.includes('id="dna-gooey-filter"'), 'Must include gooey filter');
    assert.ok(svgDefs.includes('feColorMatrix'), 'Must include feColorMatrix');
    assert.ok(svgDefs.includes('feComposite'), 'Must include feComposite atop');
  });

  it('HUD Projector dynamically queries registry to project transition options and tunable sliders', () => {
    const { projectHudFromDnaIr } = require('../src/generators/hud-projector');
    const mockDnaIr = {
      schemaVersion: '0.1.0',
      experienceId: 'OP–XY Test',
      parameters: [
        {
          id: 'strip.motion.transitionStyle',
          category: 'motion',
          type: 'StringText',
          value: 'morph',
          mutability: 'mutable'
        }
      ],
      bindings: [
        {
          paramId: 'strip.motion.transitionStyle',
          adapter: 'dom',
          target: '#strip',
          property: 'data-transition-style'
        }
      ],
      effects: ['morph-text', 'gooey-droplets', 'classic-slide']
    };

    const projected = projectHudFromDnaIr(mockDnaIr);
    assert.ok(projected.html.includes('id="dna-transition-style-select"'), 'Must render transition select');
    assert.ok(projected.html.includes('value="morph"'), 'Must render morph option');
    assert.ok(projected.html.includes('value="gooey"'), 'Must render gooey option');
    assert.ok(projected.html.includes('value="classic"'), 'Must render classic option');
    assert.ok(projected.html.includes('data-effect-controls="morph-text"'), 'Must render dynamic tunable controls for morph effect');
  });
});
