const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

describe('Jumpflex Home Evolution - Visual Assets & Integration Contract', () => {
  const rootDir = path.resolve('clientes/jumpflex-home-evolution');
  const siteDir = path.join(rootDir, 'site');
  const htmlPath = path.join(siteDir, 'index.html');
  const standaloneHtmlPath = path.join(rootDir, 'JumpPlay — Family Reveal & Kinetic Range.html');

  const requiredAssets = [
    'family-trampoline-hero.jpg',
    'jumpplay-compact-bg.jpg',
    'jumpplay-master-bg.jpg',
    'jumpplay-arena-bg.jpg',
    'jumpflex-flex-bg.jpg',
    'jumpflex-hero-bg.jpg',
    'jumpflex-mega-bg.jpg',
    'jumpplay-anatomy-topdown.jpg'
  ];

  test('Workspace directories exist', () => {
    assert.ok(fs.existsSync(rootDir), 'clientes/jumpflex-home-evolution must exist');
    assert.ok(fs.existsSync(siteDir), 'clientes/jumpflex-home-evolution/site must exist');
    assert.ok(fs.existsSync(htmlPath), 'site/index.html must exist');
    assert.ok(fs.existsSync(standaloneHtmlPath), 'Standalone JumpPlay HTML must exist');
  });

  test('All visual assets exist in root and site/ with valid JPEG headers', () => {
    for (const file of requiredAssets) {
      const rootFile = path.join(rootDir, file);
      const siteFile = path.join(siteDir, file);

      assert.ok(fs.existsSync(rootFile), `Root asset ${file} must exist`);
      assert.ok(fs.existsSync(siteFile), `Site asset ${file} must exist`);

      const bufRoot = fs.readFileSync(rootFile);
      const bufSite = fs.readFileSync(siteFile);

      assert.ok(bufRoot.length > 50000, `Asset ${file} must be > 50KB`);
      assert.equal(bufRoot.length, bufSite.length, `Asset ${file} must have matching byte size in root and site/`);

      // Verify JPEG magic bytes (FF D8)
      assert.equal(bufRoot[0], 0xff, `${file} must be valid JPEG`);
      assert.equal(bufRoot[1], 0xd8, `${file} must be valid JPEG`);
    }
  });

  test('site/index.html integrates local visual assets without external image dependencies', () => {
    const html = fs.readFileSync(htmlPath, 'utf8');

    // Hero image
    assert.ok(html.includes('src="family-trampoline-hero.jpg"'), 'Hero must use local family-trampoline-hero.jpg');

    // Product cards background images
    assert.ok(html.includes("url('jumpplay-compact-bg.jpg')"), 'Card Compact must use jumpplay-compact-bg.jpg');
    assert.ok(html.includes("url('jumpplay-master-bg.jpg')"), 'Card Master must use jumpplay-master-bg.jpg');
    assert.ok(html.includes("url('jumpplay-arena-bg.jpg')"), 'Card Arena must use jumpplay-arena-bg.jpg');

    // Local anatomy blueprint image
    assert.ok(html.includes('src="jumpplay-anatomy-topdown.jpg"'), 'Sticky stage must use local jumpplay-anatomy-topdown.jpg');

    // Dynamic cart JS models
    assert.ok(html.includes("img: 'jumpplay-compact-bg.jpg'"), 'Cart model Compact must bind jumpplay-compact-bg.jpg');
    assert.ok(html.includes("img: 'jumpplay-master-bg.jpg'"), 'Cart model Master must bind jumpplay-master-bg.jpg');
    assert.ok(html.includes("img: 'jumpplay-arena-bg.jpg'"), 'Cart model Arena must bind jumpplay-arena-bg.jpg');
  });

  test('Standalone JumpPlay HTML also maintains visual asset integrity', () => {
    const standaloneHtml = fs.readFileSync(standaloneHtmlPath, 'utf8');
    assert.ok(standaloneHtml.includes('src="family-trampoline-hero.jpg"'));
    assert.ok(standaloneHtml.includes("url('jumpplay-compact-bg.jpg')"));
    assert.ok(standaloneHtml.includes("url('jumpplay-master-bg.jpg')"));
    assert.ok(standaloneHtml.includes("url('jumpplay-arena-bg.jpg')"));
    assert.ok(standaloneHtml.includes('src="jumpplay-anatomy-topdown.jpg"'));
  });

  test('Section ordering: #depoimentos must be immediately after #especificacoes and above #cotacao-b2b', () => {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const idxEsp = html.indexOf('id="especificacoes"');
    const idxDep = html.indexOf('id="depoimentos"');
    const idxCot = html.indexOf('id="cotacao-b2b"');

    assert.ok(idxEsp > 0, '#especificacoes must exist');
    assert.ok(idxDep > 0, '#depoimentos must exist');
    assert.ok(idxCot > 0, '#cotacao-b2b must exist');
    assert.ok(idxEsp < idxDep, '#especificacoes must precede #depoimentos');
    assert.ok(idxDep < idxCot, '#depoimentos must precede #cotacao-b2b');
  });

  test('Whimsical Jelly animation is applied directly to site text reveal without separate sections', () => {
    const html = fs.readFileSync(htmlPath, 'utf8');

    // Verified: No separate artificial toy hello box
    assert.ok(!html.includes('id="whimsicalHello"'), 'Must NOT replicate prompt blindly as a separate hello box');
    assert.ok(!html.includes('id="kinetic-playground"'), 'Must NOT have a separate playground section');

    // Scale milestones in keyframes extracted from the prompt
    assert.ok(html.includes('scale(1.15, 0.75)'), 'Keyframes must include scale(1.15, 0.75)');
    assert.ok(html.includes('scale(0.88, 1.18)'), 'Keyframes must include scale(0.88, 1.18)');
    assert.ok(html.includes('scale(1.06, 0.95)'), 'Keyframes must include scale(1.06, 0.95)');
    assert.ok(html.includes('transform-origin: center bottom'), 'Must use transform-origin: center bottom');
    assert.ok(html.includes('calc(var(--char-idx, 0) * 60ms)'), 'Must use 60ms stagger delay per character');

    // Fixed widths for characters to prevent reflow
    assert.ok(html.includes('0.58em') || html.includes('0.62em'), 'Characters must have fixed width metric preventing reflow');
    assert.ok(html.includes('0.32em'), 'Period character must have fixed width metric preventing reflow');

    // Applied to real site text in Hero Title
    assert.ok(html.includes('aria-label="Mais alegria. Mais altura."'), 'Hero title must have shared accessible label');
    assert.ok(html.includes('class="jf-word kinetic-word'), 'Hero title must integrate kinetic-word reveal');

    // Reduced motion support
    assert.ok(html.includes('@media (prefers-reduced-motion: reduce)'), 'Must include prefers-reduced-motion media query');
  });

  test('21st.dev Community Themes system is integrated with 5 theme presets', () => {
    const html = fs.readFileSync(htmlPath, 'utf8');

    const themes = ['kinetic-volt', 'cyberpunk', 'rose-pine', 'tokyo-night', 'supabase-emerald'];
    for (const t of themes) {
      assert.ok(html.includes(`[data-theme="${t}"]`), `CSS must define [data-theme="${t}"]`);
      assert.ok(html.includes(`data-theme-target="${t}"`), `Markup must have button with data-theme-target="${t}"`);
    }

    assert.ok(html.includes('id="floating-theme-dock"'), 'Floating theme dock must exist');
    assert.ok(html.includes('initThemesAndKineticEngine'), 'Controller JS must exist');
  });

  test('No AI Slop audit: banned puffery words and unverified claims are removed', () => {
    const html = fs.readFileSync(htmlPath, 'utf8');

    assert.equal((html.match(/robustez/gi) || []).length, 0, 'Banned word "robustez" must be 0');
    assert.equal((html.match(/robusta/gi) || []).length, 0, 'Banned word "robusta" must be 0');
    assert.equal((html.match(/1\.400\+/gi) || []).length, 0, 'Unverified statistic "1.400+" must be 0');
    assert.equal((html.match(/★/g) || []).length, 0, 'Unicode star characters must be replaced by inline SVGs');
  });
});

