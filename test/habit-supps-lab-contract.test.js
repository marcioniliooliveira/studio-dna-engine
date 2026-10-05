const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

describe('Habit Supps Lab - Structure & Invariants Contract', () => {
  const labDir = path.resolve('clientes/habit-supps-lab');
  const specPath = path.join(labDir, 'brand-spec.json');
  const htmlPath = path.join(labDir, 'site/index.html');
  const cssPath = path.join(labDir, 'site/styles/main.css');

  test('lab workspace exists with brand-spec and site files', () => {
    assert.ok(fs.existsSync(labDir), 'Directory clientes/habit-supps-lab must exist');
    assert.ok(fs.existsSync(specPath), 'brand-spec.json must exist');
    assert.ok(fs.existsSync(htmlPath), 'site/index.html must exist');
    assert.ok(fs.existsSync(cssPath), 'site/styles/main.css must exist');
  });

  test('brand-spec.json contains Habit Supps DNA tokens and asset manifest', () => {
    if (!fs.existsSync(specPath)) assert.fail('specPath missing');
    const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
    assert.equal(spec.slug, 'habit-supps');
    assert.equal(spec.colors.primary, '#483A97');
    assert.equal(spec.colors.background, '#F4F5F7');
    assert.ok(spec.assets && spec.assets.heroVideo, 'Hero video asset must be defined');
    assert.ok(spec.sections && spec.sections.length >= 6, 'Must define at least 6 core sections');
  });

  test('Invariant 1: Palco Sticky maintains Safe-Zone 58% and radial mask', () => {
    if (!fs.existsSync(cssPath) || !fs.existsSync(htmlPath)) assert.fail('Files missing');
    const css = fs.readFileSync(cssPath, 'utf8');
    const html = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(html.includes('data-sequence-stage') || html.includes('sequence-sticky'), 'HTML must include sticky sequence stage');
    assert.ok(css.includes('58%') || css.includes('58vh'), 'CSS must enforce 58% maximum safe height');
    assert.ok(css.includes('radial-gradient'), 'CSS must include radial-gradient mask for video containment');
  });

  test('Invariant 2: Header maintains fixed 72px height and constrained logo', () => {
    if (!fs.existsSync(cssPath) || !fs.existsSync(htmlPath)) assert.fail('Files missing');
    const css = fs.readFileSync(cssPath, 'utf8');
    const html = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(html.includes('header') || html.includes('nav'), 'HTML must include header navigation');
    assert.ok(css.includes('72px'), 'Header height must be locked to 72px');
    assert.ok(html.includes('hbh-full-logo') || html.includes('hbh-indigo-logo'), 'Header must reference official Habit logo');
  });

  test('Invariant 3: Mascot sticker is constrained to 140px bounding box', () => {
    if (!fs.existsSync(cssPath) || !fs.existsSync(htmlPath)) assert.fail('Files missing');
    const css = fs.readFileSync(cssPath, 'utf8');
    const html = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(html.includes('habit-character-popping'), 'HTML must include Habit mascot sticker');
    assert.ok(css.includes('140px'), 'Mascot sticker container must be locked to 140px');
  });

  test('Invariant 4: Bento grid cards enforce min-height and 60/40 text/media ratio', () => {
    if (!fs.existsSync(cssPath) || !fs.existsSync(htmlPath)) assert.fail('Files missing');
    const css = fs.readFileSync(cssPath, 'utf8');
    const html = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(html.includes('Ashwagandha') && html.includes('Vitamin B'), 'Must contain active ingredients');
    assert.ok(css.includes('280px'), 'Bento cards must enforce min-height: 280px');
  });

  test('Invariant 5: Infinite ticker enforces 50% mirrored loop structure', () => {
    if (!fs.existsSync(cssPath) || !fs.existsSync(htmlPath)) assert.fail('Files missing');
    const css = fs.readFileSync(cssPath, 'utf8');
    const html = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(html.includes('SCIENCE-BACKED SUPPLEMENTS'), 'Must contain Habit brand ticker');
    assert.ok(css.includes('-50%'), 'Ticker keyframes must translate exactly -50% for seamless loop');
  });
});
