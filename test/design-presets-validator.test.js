const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// FASE RED: O módulo de presets ainda será validado e exportado
const {
  loadDesignPresets,
  getPresetById,
  generatePresetCssTokens
} = require('../src/presets/preset-manager');

test('Design Presets Matrix - Schema & Integrity Validation', async (t) => {
  await t.test('loads canonical presets JSON with exactly the 3 defined archetypes', () => {
    const presets = loadDesignPresets();
    assert.ok(Array.isArray(presets));
    assert.equal(presets.length, 3);

    const ids = presets.map(p => p.id);
    assert.ok(ids.includes('kinetic-pop'), 'Must have kinetic-pop');
    assert.ok(ids.includes('modern-apothecary'), 'Must have modern-apothecary');
    assert.ok(ids.includes('tactile-botanical'), 'Must have tactile-botanical');
  });

  await t.test('each preset contains complete typography, color, motion and stage token contracts', () => {
    const presets = loadDesignPresets();

    for (const p of presets) {
      assert.ok(p.id, 'Preset must have an id');
      assert.ok(p.name, 'Preset must have a name');
      assert.ok(p.archetype, 'Preset must describe its archetype');

      // Cores obrigatórias
      assert.ok(p.colors.background, `${p.id} missing background color`);
      assert.ok(p.colors.primary, `${p.id} missing primary color`);
      assert.ok(p.colors.accent, `${p.id} missing accent color`);
      assert.ok(p.colors.surface, `${p.id} missing surface color`);

      // Tipografia
      assert.ok(p.typography.family, `${p.id} missing font family`);
      assert.ok(p.typography.tracking, `${p.id} missing font tracking`);
      assert.ok(p.typography.headingWeight, `${p.id} missing heading weight`);

      // Física de Movimento
      assert.ok(typeof p.motion.scrub === 'number', `${p.id} missing motion scrub`);
      assert.ok(p.motion.ease, `${p.id} missing motion ease`);
      assert.ok(p.motion.doodleStyle, `${p.id} missing doodle style`);

      // Palco Padrão
      assert.ok(p.stageDefaults.defaultMode, `${p.id} missing default stage mode`);
    }
  });

  await t.test('generates valid CSS custom properties string for client injection', () => {
    const css = generatePresetCssTokens('modern-apothecary');
    assert.ok(css.includes('--dna-bg:'), 'Must generate --dna-bg');
    assert.ok(css.includes('--dna-primary:'), 'Must generate --dna-primary');
    assert.ok(css.includes('--dna-font-heading:'), 'Must generate --dna-font-heading');
    assert.ok(css.includes('--dna-motion-scrub:'), 'Must generate --dna-motion-scrub');
  });
});
