const { test } = require('node:test');
const assert = require('node:assert/strict');

const {
  PRESETS,
  compute16StepGradient,
  resolvePreset,
  applyGradientToStepKeys
} = require('../src/constraints/dual-gradient-sync.js');

test('Dual-Gradient Engine: computes monotonic 16-step gradient array for any palette', () => {
  // Swiss Grayscale (dark charcoal to steel off-white)
  const swissSteps = compute16StepGradient('#111213', '#dce4ec');
  assert.equal(swissSteps.length, 16, 'Must generate exactly 16 steps');
  
  // First step must be dark
  assert.ok(swissSteps[0].luminance < swissSteps[15].luminance, 'Steps must progress from dark to light');
  
  // Every step must have valid hex, RGB values, and luminance
  swissSteps.forEach((step, idx) => {
    assert.match(step.hex, /^#[0-9a-fA-F]{6}$/, `Step ${idx} must be valid hex`);
    assert.ok(typeof step.r === 'number' && step.r >= 0 && step.r <= 1);
    assert.ok(typeof step.g === 'number' && step.g >= 0 && step.g <= 1);
    assert.ok(typeof step.b === 'number' && step.b >= 0 && step.b <= 1);
  });
});

test('Dual-Gradient Engine: provides official presets with complete design tokens & typography', () => {
  const expectedPresets = ['swiss', 'berlin', 'braun', 'tokyo', 'aura'];
  
  expectedPresets.forEach(id => {
    const preset = resolvePreset(id);
    assert.ok(preset, `Preset ${id} must exist`);
    assert.equal(preset.id, id);
    assert.ok(preset.name, `Preset ${id} must have a name`);
    assert.ok(preset.fonts && preset.fonts.sans, `Preset ${id} must specify sans font`);
    assert.ok(preset.fonts && preset.fonts.mono, `Preset ${id} must specify mono font`);
    assert.ok(preset.colors['--bg'], `Preset ${id} must specify --bg`);
    assert.ok(preset.colors['--rec'], `Preset ${id} must specify --rec accent`);
    assert.ok(preset.gradient && preset.gradient.startHex && preset.gradient.endHex);
    assert.equal(preset.gradient.steps.length, 16, `Preset ${id} must have 16 calculated gradient steps`);
    assert.ok(preset.textGradient && preset.textGradient.startHex && preset.textGradient.endHex, `Preset ${id} must have textGradient`);
  });

  // Verify unique typographic identities per preset
  assert.equal(PRESETS.swiss.fonts.sans, 'Geist');
  assert.equal(PRESETS.berlin.fonts.sans, 'Chakra Petch');
  assert.equal(PRESETS.braun.fonts.sans, 'Plus Jakarta Sans');
  assert.equal(PRESETS.tokyo.fonts.sans, 'Syne');
  assert.equal(PRESETS.aura.fonts.sans, 'Inter', 'Aura preset must use Inter from the asset');
});

test('Dual-Gradient Engine: maps gradient steps strictly to step keys without touching LED cavities', () => {
  const mockControls = {};
  for (let i = 1; i <= 16; i++) {
    const keyId = `key-${21 + i}`;
    const stepMat = { name: `Grayscale step ${String(i).padStart(2, '0')}`, color: { r: 0.1, g: 0.1, b: 0.1, setRGB(r, g, b) { this.r = r; this.g = g; this.b = b; } } };
    const ledMat = { name: 'Soft white LED', color: { r: 0.9, g: 0.9, b: 0.9, setRGB(r, g, b) { this.r = r; this.g = g; this.b = b; } } };

    mockControls[keyId] = {
      userData: { id: keyId },
      traverse: (cb) => {
        cb({ isMesh: true, name: `Step_${i}_base`, material: stepMat });
        cb({ isMesh: true, name: `Step_${i}_cap`, material: stepMat });
        cb({ isMesh: true, name: `Step_${i}_LED_cavity`, material: ledMat });
      }
    };
  }

  const gradientSteps = compute16StepGradient('#051a0d', '#00ff66'); // Berlin Phosphor Emerald
  const updatedCount = applyGradientToStepKeys(mockControls, gradientSteps);

  assert.equal(updatedCount, 16, 'Must update all 16 step controls');

  // Verify that base/cap were updated with the gradient color
  for (let i = 1; i <= 16; i++) {
    const keyId = `key-${21 + i}`;
    const control = mockControls[keyId];
    let baseColor = null;
    let ledColor = null;

    control.traverse(o => {
      if (o.name.includes('base')) baseColor = o.material.color;
      if (o.name.includes('LED_cavity')) ledColor = o.material.color;
    });

    const expectedStep = gradientSteps[i - 1];
    assert.equal(Number(baseColor.r.toFixed(3)), Number(expectedStep.r.toFixed(3)), `Key ${keyId} base red must match gradient`);
    assert.equal(Number(baseColor.g.toFixed(3)), Number(expectedStep.g.toFixed(3)), `Key ${keyId} base green must match gradient`);

    // LED cavity must remain completely untouched
    assert.equal(ledColor.r, 0.9, 'LED cavity red must NOT be overwritten');
    assert.equal(ledColor.g, 0.9, 'LED cavity green must NOT be overwritten');
  }
});
