const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

// Esse arquivo testa o contrato de palco (Safe-Zone, Bounds e Remapping)
// FASE RED: O módulo ainda não existe ou será importado do arquivo a ser criado
const {
  calculateSafeZone,
  remapProgressAngle,
  createStageManifest
} = require('../src/stage/stage-slot-adapter');
const { ProceduralClayMock } = require('../src/stage/procedural-clay-mock');

test('Stage Slot Adapter - Safe-Zone Geometry Calculations', async (t) => {
  await t.test('calculates correct dimensions and positioning for 1:1 square asset', () => {
    const canvasW = 1200;
    const canvasH = 1000;
    const dpr = 1;
    const maxRatio = 0.58; // Máximo de 58% da altura
    const bottomMargin = 0.08; // 8% de respiro no rodapé

    const bounds = calculateSafeZone({
      canvasWidth: canvasW,
      canvasHeight: canvasH,
      dpr,
      assetWidth: 1500,
      assetHeight: 1500,
      maxHeightRatio: maxRatio,
      bottomMarginRatio: bottomMargin
    });

    // Altura deve ser exatamente 58% de 1000 = 580
    assert.equal(bounds.targetHeight, 580);
    // Aspect ratio 1:1 -> largura = 580
    assert.equal(bounds.targetWidth, 580);
    // Centralizado no eixo X: (1200 - 580) / 2 = 310
    assert.equal(bounds.drawX, 310);
    // Ancorado na base: 1000 - 580 - (1000 * 0.08) = 1000 - 580 - 80 = 340
    assert.equal(bounds.drawY, 340);
    // Margem superior livre deve ser no mínimo 34% (340px)
    assert.ok(bounds.drawY >= 340, 'Top clearance must be respected for headings');
  });

  await t.test('handles high DPR scaling correctly without subpixel overflow', () => {
    const bounds = calculateSafeZone({
      canvasWidth: 1600,
      canvasHeight: 900,
      dpr: 2,
      assetWidth: 1920,
      assetHeight: 1920,
      maxHeightRatio: 0.60,
      bottomMarginRatio: 0.05
    });

    // Coordenadas devem ser inteiros arredondados
    assert.equal(Number.isInteger(bounds.drawX), true);
    assert.equal(Number.isInteger(bounds.drawY), true);
    assert.equal(Number.isInteger(bounds.targetWidth), true);
    assert.equal(Number.isInteger(bounds.targetHeight), true);
  });
});

test('Stage Slot Adapter - Narrative Phase Remapper', async (t) => {
  await t.test('remaps linear scroll progress (0..1) to 4 narrative stages with easing bounds', () => {
    // Progress 0.0 -> Início (0s)
    const t0 = remapProgressAngle(0.0, 10.0);
    assert.equal(t0, 0.0);

    // Progress 0.25 -> Card 1 concluído / Card 2 iniciando (~2.5s)
    const t25 = remapProgressAngle(0.25, 10.0);
    assert.equal(Math.round(t25 * 10) / 10, 2.5);

    // Progress 0.50 -> Card 2 concluído / Card 3 (~5.0s)
    const t50 = remapProgressAngle(0.50, 10.0);
    assert.equal(Math.round(t50 * 10) / 10, 5.0);

    // Progress 0.75 -> Card 3 concluído / Card 4 (~7.5s)
    const t75 = remapProgressAngle(0.75, 10.0);
    assert.equal(Math.round(t75 * 10) / 10, 7.5);

    // Progress 1.0 -> Clímax final (9.8s a 10s)
    const t100 = remapProgressAngle(1.0, 10.0);
    assert.ok(t100 >= 9.8 && t100 <= 10.0);
  });
});

test('Stage Slot Adapter - Manifest Validator', async (t) => {
  await t.test('generates valid stage manifest with fallback defaults', () => {
    const manifest = createStageManifest({
      slug: 'habit-capsule',
      mode: 'clay',
      brandColor: '#38E1C2',
      labelText: 'STRESS RELIEF'
    });

    assert.equal(manifest.slug, 'habit-capsule');
    assert.equal(manifest.mode, 'clay');
    assert.equal(manifest.brandColor, '#38E1C2');
    assert.equal(manifest.labelText, 'STRESS RELIEF');
    assert.equal(manifest.safeZone.maxHeightRatio, 0.58);
  });
});

test('Procedural Clay Mock - Lifecycle & State Manipulation', async (t) => {
  await t.test('updates brand color, label and rotation smoothly', () => {
    // Mock simples de canvas 2d
    const dummyCtx = {
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      quadraticCurveTo: () => {},
      closePath: () => {},
      fill: () => {},
      clip: () => {},
      translate: () => {},
      scale: () => {},
      fillText: () => {},
      ellipse: () => {},
      createLinearGradient: () => ({ addColorStop: () => {} }),
      createRadialGradient: () => ({ addColorStop: () => {} })
    };
    const dummyCanvas = { getContext: () => dummyCtx, width: 800, height: 800 };

    const mock = new ProceduralClayMock(dummyCanvas, {
      brandColor: '#1C2A20',
      labelText: 'INITIAL'
    });

    assert.equal(mock.brandColor, '#1C2A20');
    assert.equal(mock.labelText, 'INITIAL');

    mock.setProps({
      brandColor: '#FF6B6B',
      labelText: 'UPDATED BRAND',
      rotationAngle: 180
    });

    assert.equal(mock.brandColor, '#FF6B6B');
    assert.equal(mock.labelText, 'UPDATED BRAND');
    assert.equal(mock.rotationAngle, 180);

    // Render sem estourar
    assert.doesNotThrow(() => {
      mock.render({
        drawX: 200,
        drawY: 200,
        targetWidth: 400,
        targetHeight: 500
      });
    });
  });
});
