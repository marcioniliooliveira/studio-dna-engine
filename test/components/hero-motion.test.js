const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { chromium } = require('playwright');

const sitePath = 'file:///' + path.resolve(__dirname, '../../clientes/flashtech-caso-04-growth/site/index.html').replace(/\\/g, '/');

test('Hero Motion: Masked character reveal for Anton headline with overflow: hidden word masks', async (t) => {
  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(sitePath);
  await page.waitForTimeout(400);

  const evaluation = await page.evaluate(() => {
    const h1 = document.querySelector('.hero-display-text-1');
    const h2 = document.querySelector('.hero-display-text-2');
    const word1 = h1.querySelector('.gsap_split_word');
    const word2 = h2.querySelector('.gsap_split_word');
    const chars1 = h1.querySelectorAll('.gsap_split_char');
    const chars2 = h2.querySelectorAll('.gsap_split_char');

    return {
      word1Overflow: window.getComputedStyle(word1).overflow,
      word2Overflow: window.getComputedStyle(word2).overflow,
      char1Opacity: window.getComputedStyle(chars1[0]).opacity,
      char1Transform: window.getComputedStyle(chars1[0]).transform,
      char2Opacity: window.getComputedStyle(chars2[0]).opacity,
      h1Text: h1.innerText.trim(),
      h2Text: h2.innerText.trim()
    };
  });

  assert.equal(evaluation.h1Text, 'GROWTH', 'Headline Anton copy must be preserved');
  assert.equal(evaluation.h2Text, 'DE ALTA CONVERSÃO', 'Subheadline Anton copy must be preserved');
  assert.equal(evaluation.word1Overflow, 'hidden', 'Word wrapper must mask overflowing characters');
  assert.equal(evaluation.word2Overflow, 'hidden', 'Word wrapper must mask overflowing characters');
  assert.equal(evaluation.char1Opacity, '1', 'Character 1 must be fully revealed');
  assert.equal(evaluation.char2Opacity, '1', 'Character 2 must be fully revealed');
  assert.notEqual(evaluation.char1Transform, '', 'Character 1 must have valid transform computed');
});

test('Hero Motion: Scroll-driven orbit rotation is desktop-only, transform-only, and safe on mobile', async (t) => {
  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());

  // 1. Desktop evaluation
  const pageDesktop = await browser.newPage();
  await pageDesktop.setViewportSize({ width: 1440, height: 900 });
  await pageDesktop.goto(sitePath);
  await pageDesktop.waitForTimeout(300);

  const desktopInit = await pageDesktop.evaluate(() => {
    const areas = document.querySelectorAll('.hero-orbit-area');
    const p1 = document.querySelector('.hero-orbit-path._01');
    const p2 = document.querySelector('.hero-orbit-path._02');
    return {
      areaDisplays: Array.from(areas).map(a => window.getComputedStyle(a).display),
      p1Transform: window.getComputedStyle(p1).transform,
      p2Transform: window.getComputedStyle(p2).transform
    };
  });

  assert.deepEqual(desktopInit.areaDisplays, ['flex', 'flex'], 'Orbit areas must be visible on desktop');

  // Scroll down 350px
  await pageDesktop.evaluate(() => window.scrollTo(0, 350));
  await pageDesktop.waitForTimeout(200);

  const desktopScrolled = await pageDesktop.evaluate(() => {
    const p1 = document.querySelector('.hero-orbit-path._01');
    const p2 = document.querySelector('.hero-orbit-path._02');
    return {
      p1Transform: window.getComputedStyle(p1).transform,
      p2Transform: window.getComputedStyle(p2).transform
    };
  });

  assert.match(desktopScrolled.p1Transform, /matrix/i, 'Orbit 1 must rotate on scroll');
  assert.match(desktopScrolled.p2Transform, /matrix/i, 'Orbit 2 must rotate on scroll');
  assert.notEqual(desktopScrolled.p1Transform, desktopScrolled.p2Transform, 'Orbits must rotate in opposing directions');

  // 2. Mobile evaluation (390px)
  const pageMobile = await browser.newPage();
  await pageMobile.setViewportSize({ width: 390, height: 844 });
  await pageMobile.goto(sitePath);
  await pageMobile.waitForTimeout(300);

  const mobileMetrics = await pageMobile.evaluate(() => {
    const areas = document.querySelectorAll('.hero-orbit-area');
    return {
      areaDisplays: Array.from(areas).map(a => window.getComputedStyle(a).display),
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  });

  assert.deepEqual(mobileMetrics.areaDisplays, ['none', 'none'], 'Orbit areas must be hidden on mobile');
  assert.equal(mobileMetrics.hasOverflow, false, 'Mobile viewport must not have horizontal bleed');
});

test('Hero Motion: Desktop illustration parallax operates via transform-only and respects reduced motion', async (t) => {
  const browser = await chromium.launch({ headless: true });
  t.after(() => browser.close());

  // 1. Fine pointer desktop
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(sitePath);
  await page.waitForTimeout(300);

  await page.mouse.move(800, 350);
  await page.waitForTimeout(150);

  const movedParallax = await page.evaluate(() => {
    const img = document.querySelector('.hero-image-move');
    return window.getComputedStyle(img).transform;
  });

  assert.match(movedParallax, /matrix/i, 'Illustration must translate on pointer move');

  // 2. Reduced motion context
  const reducedContext = await browser.newContext({ reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.setViewportSize({ width: 1440, height: 900 });
  await reducedPage.goto(sitePath);
  await reducedPage.waitForTimeout(300);

  await reducedPage.evaluate(() => window.scrollTo(0, 300));
  await reducedPage.mouse.move(800, 350);
  await reducedPage.waitForTimeout(150);

  const reducedMetrics = await reducedPage.evaluate(() => {
    const p1 = document.querySelector('.hero-orbit-path._01');
    const img = document.querySelector('.hero-image-move');
    const chars = document.querySelectorAll('.hero-display-text-1 .gsap_split_char');
    return {
      p1Transform: window.getComputedStyle(p1).transform,
      imgTransform: window.getComputedStyle(img).transform,
      char0Opacity: window.getComputedStyle(chars[0]).opacity,
      char0Transform: window.getComputedStyle(chars[0]).transform
    };
  });

  assert.equal(reducedMetrics.p1Transform, 'none', 'Continuous orbit rotation must be disabled in reduced-motion');
  assert.equal(reducedMetrics.imgTransform, 'none', 'Illustration parallax must be disabled in reduced-motion');
  assert.equal(reducedMetrics.char0Opacity, '1', 'Hero headline characters must remain readable in reduced-motion');
  assert.equal(reducedMetrics.char0Transform, 'none', 'Hero headline characters must avoid translation in reduced-motion');
});
