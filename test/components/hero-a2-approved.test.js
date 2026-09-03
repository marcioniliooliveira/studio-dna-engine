/**
 * test/components/hero-a2-approved.test.js
 * 
 * Regressão Direcionada e Contrato Visual A2: SCALEX Hero
 * Implementa todos os checks P0 definidos em a2-reference-contract.json e a2-visual-acceptance.json:
 * - Golden SHA-256
 * - Hooks semânticos [data-a2-*] exatamente 1 vez
 * - Textos e cópias declaradas
 * - Cores e tokens (#F8F8F6, #0B0D11, #4A4A4A, #FFC552)
 * - Retângulos e zonas normalizadas no viewport de referência (1586x992)
 * - Não-interseção do foguete com conteúdo de conversão (headline, copy, primary-cta)
 * - Responsividade desktop (1440x900) e mobile (375x812) sem overflow
 * - Suporte a prefers-reduced-motion
 */

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { chromium } = require('playwright');

const SITE_PATH = path.resolve(__dirname, '../../clientes/flashtech-caso-04-growth/site/index.html');
const GOLDEN_PATH = path.resolve(__dirname, '../../clientes/flashtech-caso-04-growth/design/goldens/hero-a2-approved-v1.png');
const EXPECTED_GOLDEN_SHA256 = '8F3EA1C9EADAECF67381CCB26EF3A0FFC25BE575B15722642DC39FAD0E870695';

test('A2 Hero Contract: P0 Golden integrity and Semantic Hooks presence', async () => {
  // 1. Validar SHA-256 do Golden de Referência
  assert.ok(fs.existsSync(GOLDEN_PATH), 'Golden hero-a2-approved-v1.png deve existir');
  const goldenBytes = fs.readFileSync(GOLDEN_PATH);
  const goldenSha = crypto.createHash('sha256').update(goldenBytes).digest('hex').toUpperCase();
  assert.equal(goldenSha, EXPECTED_GOLDEN_SHA256, 'SHA-256 do Golden deve ser idêntico ao contrato');

  // 2. Carregar a página no Chromium
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1586, height: 992 } });
  await page.goto('file:///' + SITE_PATH.replace(/\\/g, '/'));
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(600);

  // 3. Validar Hooks Semânticos Exatamente Uma Vez
  const hooks = [
    'data-a2-hero',
    'data-a2-brand',
    'data-a2-headline',
    'data-a2-copy',
    'data-a2-primary-cta',
    'data-a2-rocket',
    'data-a2-trajectory'
  ];

  for (const hook of hooks) {
    const count = await page.locator(`[${hook}]`).count();
    assert.equal(count, 1, `O hook [${hook}] deve existir exatamente 1 vez no DOM (encontrado: ${count})`);
  }

  // 4. Validar Cópias Declaradas P0
  const brandText = await page.locator('[data-a2-brand]').innerText();
  assert.ok(brandText.includes('SCALEX'), 'Brand deve conter SCALEX');

  const headlineText = await page.locator('[data-a2-headline]').innerText();
  assert.ok(headlineText.includes('GROWTH DE ALTA'), 'Headline deve conter GROWTH DE ALTA');
  assert.ok(headlineText.includes('CONVERSÃO'), 'Headline deve conter CONVERSÃO');

  const copyText = await page.locator('[data-a2-copy]').innerText();
  assert.equal(
    copyText.trim().replace(/\s+/g, ' '),
    'Acelere tráfego orgânico, leads qualificados e receita previsível com engenharia de dados e SEO técnico.',
    'Copy de apoio deve coincidir com o contrato aprovado'
  );

  const primaryCtaText = await page.locator('[data-a2-primary-cta]').innerText();
  assert.ok(
    primaryCtaText.toUpperCase().includes('AGENDAR SESSÃO ESTRATÉGICA'),
    'CTA Primário deve ser AGENDAR SESSÃO ESTRATÉGICA'
  );

  const trajectoryText = await page.locator('[data-a2-trajectory]').innerText();
  assert.ok(trajectoryText.includes('TRAJETÓRIA') || trajectoryText.includes('ESCALA'), 'Trajetória deve conter rótulos de escala');
  assert.ok(trajectoryText.includes('CONVERSÃO') || trajectoryText.includes('RESULTADO'), 'Trajetória deve conter rótulos de resultado');

  // 5. Validar Tokens de Cores P0
  const colors = await page.evaluate(() => {
    const hero = document.querySelector('[data-a2-hero]');
    const headline = document.querySelector('[data-a2-headline]');
    const copy = document.querySelector('[data-a2-copy]');
    const cta = document.querySelector('[data-a2-primary-cta]');

    function rgbToHex(rgb) {
      if (!rgb || rgb === 'transparent') return '';
      const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!match) return rgb;
      const hex = (x) => ('0' + parseInt(x).toString(16)).slice(-2).toUpperCase();
      return '#' + hex(match[1]) + hex(match[2]) + hex(match[3]);
    }

    return {
      heroBg: rgbToHex(window.getComputedStyle(hero).backgroundColor) || rgbToHex(window.getComputedStyle(document.body).backgroundColor),
      headlineColor: rgbToHex(window.getComputedStyle(headline).color),
      copyColor: rgbToHex(window.getComputedStyle(copy).color),
      ctaBg: rgbToHex(window.getComputedStyle(cta).backgroundColor),
      ctaColor: rgbToHex(window.getComputedStyle(cta).color)
    };
  });

  assert.equal(colors.heroBg, '#F8F8F6', 'Fundo da hero deve ser #F8F8F6');
  assert.equal(colors.headlineColor, '#0B0D11', 'Cor do título deve ser #0B0D11 (ink)');
  assert.equal(colors.copyColor, '#4A4A4A', 'Cor da copy deve ser #4A4A4A (muted)');
  assert.equal(colors.ctaBg, '#FFC552', 'Fundo do CTA deve ser #FFC552 (accent)');
  assert.equal(colors.ctaColor, '#0B0D11', 'Texto do CTA deve ser #0B0D11 (ink)');

  await browser.close();
});

test('A2 Hero Contract: Normalized 1586x992 Zone Metrics & Non-Intersection', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1586, height: 992 } });
  await page.goto('file:///' + SITE_PATH.replace(/\\/g, '/'));
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(600);

  const measurements = await page.evaluate(() => {
    const W = 1586;
    const H = 992;

    function getNorm(sel) {
      const el = document.querySelector(sel);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        x: r.left / W,
        y: r.top / H,
        width: r.width / W,
        height: r.height / H,
        raw: { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height }
      };
    }

    return {
      navbar: getNorm('nav.section.navbar'),
      headline: getNorm('[data-a2-headline]'),
      supportingCopy: getNorm('[data-a2-copy]'),
      primaryCta: getNorm('[data-a2-primary-cta]'),
      trajectory: getNorm('[data-a2-trajectory]'),
      rocket: getNorm('[data-a2-rocket]')
    };
  });

  const zones = [
    { id: 'navbar', target: { x: 0.028, y: 0.03, width: 0.948, height: 0.07 }, tol: 0.025, rect: measurements.navbar },
    { id: 'headline', target: { x: 0.069, y: 0.25, width: 0.47, height: 0.42 }, tol: 0.035, rect: measurements.headline },
    { id: 'supporting-copy', target: { x: 0.071, y: 0.70, width: 0.34, height: 0.10 }, tol: 0.035, rect: measurements.supportingCopy },
    { id: 'primary-cta', target: { x: 0.071, y: 0.833, width: 0.282, height: 0.072 }, tol: 0.035, rect: measurements.primaryCta },
    { id: 'trajectory', target: { x: 0.63, y: 0.145, width: 0.09, height: 0.75 }, tol: 0.04, rect: measurements.trajectory },
    { id: 'rocket', target: { x: 0.665, y: 0, width: 0.335, height: 1.0 }, tol: 0.04, rect: measurements.rocket }
  ];

  for (const z of zones) {
    assert.ok(z.rect, `Zona ${z.id} deve ser encontrada`);
    assert.ok(
      Math.abs(z.rect.x - z.target.x) <= z.tol,
      `Zona ${z.id} x=${z.rect.x.toFixed(3)} fora da tolerância (alvo: ${z.target.x} ± ${z.tol})`
    );
    assert.ok(
      Math.abs(z.rect.y - z.target.y) <= z.tol,
      `Zona ${z.id} y=${z.rect.y.toFixed(3)} fora da tolerância (alvo: ${z.target.y} ± ${z.tol})`
    );
    assert.ok(
      Math.abs(z.rect.width - z.target.width) <= z.tol,
      `Zona ${z.id} width=${z.rect.width.toFixed(3)} fora da tolerância (alvo: ${z.target.width} ± ${z.tol})`
    );
    assert.ok(
      Math.abs(z.rect.height - z.target.height) <= z.tol,
      `Zona ${z.id} height=${z.rect.height.toFixed(3)} fora da tolerância (alvo: ${z.target.height} ± ${z.tol})`
    );
  }

  // Validar Não-Interseção do Foguete com conteúdo de conversão
  function intersects(a, b) {
    return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
  }

  const rocketRaw = measurements.rocket.raw;
  assert.ok(!intersects(rocketRaw, measurements.headline.raw), 'Foguete NUNCA deve interceptar o título');
  assert.ok(!intersects(rocketRaw, measurements.supportingCopy.raw), 'Foguete NUNCA deve interceptar o texto de apoio');
  assert.ok(!intersects(rocketRaw, measurements.primaryCta.raw), 'Foguete NUNCA deve interceptar o CTA');

  // Não-interseção entre os blocos de conteúdo
  assert.ok(!intersects(measurements.headline.raw, measurements.supportingCopy.raw), 'Headline não deve interceptar copy');
  assert.ok(!intersects(measurements.supportingCopy.raw, measurements.primaryCta.raw), 'Copy não deve interceptar CTA');
  if (measurements.navbar) {
    assert.ok(!intersects(measurements.navbar.raw, measurements.headline.raw), 'Navbar não deve interceptar headline');
  }

  // Alinhamento à esquerda da coluna de conversão
  const ctaLeft = measurements.primaryCta.x;
  const headlineLeft = measurements.headline.x;
  assert.ok(Math.abs(ctaLeft - headlineLeft) < 0.02, 'CTA primário deve alinhar à esquerda do título');

  // Trajetória entre conversão e foguete
  assert.ok(
    measurements.trajectory.x >= measurements.headline.x + measurements.headline.width - 0.05,
    'Trajetória deve ficar à direita do conteúdo de conversão'
  );

  await browser.close();
});

test('A2 Hero Contract: Responsive Mobile (375x812) and Reduced Motion', async () => {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Mobile (375x812)
  const mobilePage = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await mobilePage.goto('file:///' + SITE_PATH.replace(/\\/g, '/'));
  await mobilePage.waitForLoadState('domcontentloaded');
  await mobilePage.waitForTimeout(500);

  const mobileMetrics = await mobilePage.evaluate(() => {
    const scrollW = document.documentElement.scrollWidth;
    const clientW = document.documentElement.clientWidth;
    const headline = document.querySelector('[data-a2-headline]').getBoundingClientRect();
    const copy = document.querySelector('[data-a2-copy]').getBoundingClientRect();
    const cta = document.querySelector('[data-a2-primary-cta]').getBoundingClientRect();
    const rocket = document.querySelector('[data-a2-rocket]').getBoundingClientRect();

    return {
      noOverflow: scrollW <= clientW,
      scrollW,
      clientW,
      headlineBottom: headline.bottom,
      copyTop: copy.top,
      copyBottom: copy.bottom,
      ctaTop: cta.top,
      ctaBottom: cta.bottom,
      rocketTop: rocket.top
    };
  });

  assert.ok(mobileMetrics.noOverflow, `Mobile não deve ter overflow horizontal (${mobileMetrics.scrollW} > ${mobileMetrics.clientW})`);
  assert.ok(mobileMetrics.copyTop >= mobileMetrics.headlineBottom - 5, 'Copy deve vir abaixo da headline');
  assert.ok(mobileMetrics.ctaTop >= mobileMetrics.copyBottom - 5, 'CTA deve vir abaixo da copy');
  assert.ok(mobileMetrics.rocketTop >= mobileMetrics.ctaBottom - 10, 'Foguete deve ser empilhado abaixo do CTA no mobile');
  await mobilePage.close();

  // 2. Reduced Motion Check
  const rmPage = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce'
  });
  await rmPage.goto('file:///' + SITE_PATH.replace(/\\/g, '/'));
  await rmPage.waitForLoadState('domcontentloaded');
  await rmPage.waitForTimeout(500);

  const rmVisibility = await rmPage.evaluate(() => {
    const headline = document.querySelector('[data-a2-headline]');
    const copy = document.querySelector('[data-a2-copy]');
    const cta = document.querySelector('[data-a2-primary-cta]');
    const rocket = document.querySelector('[data-a2-rocket]');

    function isVis(el) {
      if (!el) return false;
      const s = window.getComputedStyle(el);
      return s.display !== 'none' && s.visibility !== 'hidden' && parseFloat(s.opacity) > 0.5;
    }

    return {
      headline: isVis(headline),
      copy: isVis(copy),
      cta: isVis(cta),
      rocket: isVis(rocket)
    };
  });

  assert.ok(rmVisibility.headline, 'Headline visível com reduced-motion');
  assert.ok(rmVisibility.copy, 'Copy visível com reduced-motion');
  assert.ok(rmVisibility.cta, 'CTA visível com reduced-motion');
  assert.ok(rmVisibility.rocket, 'Foguete visível com reduced-motion');

  await rmPage.close();
  await browser.close();
});

test('A2 Hero Contract: navbar CTA remains painted and interactive above the reference rocket overlap', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1586, height: 992 } });
  await page.goto('file:///' + SITE_PATH.replace(/\\/g, '/'));
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(600);

  const result = await page.evaluate(() => {
    const normalize = value => value.replace(/\s+/g, ' ').trim().toUpperCase();
    const isVisible = element => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0.5 && rect.width > 0 && rect.height > 0;
    };
    const cta = Array.from(document.querySelectorAll('a, button'))
      .find(element => normalize(element.innerText || '') === 'FALAR COM ESPECIALISTA' && isVisible(element));
    const rocket = document.querySelector('[data-a2-rocket]');
    if (!cta || !rocket) return null;
    const ctaRect = cta.getBoundingClientRect();
    const rocketRect = rocket.getBoundingClientRect();
    const style = getComputedStyle(cta);
    const opaqueDecorativeLayer = Array.from(cta.querySelectorAll('.primary-btn-bg, .primary-btn-gradient, img'))
      .some(element => {
        const layer = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return layer.display !== 'none' && layer.visibility !== 'hidden' && Number(layer.opacity) > 0.01 && rect.width > 0 && rect.height > 0;
      });
    const hitTarget = document.elementFromPoint(
      ctaRect.left + (ctaRect.width / 2),
      ctaRect.top + (ctaRect.height / 2)
    );
    const intersects = !(
      ctaRect.right <= rocketRect.left ||
      ctaRect.left >= rocketRect.right ||
      ctaRect.bottom <= rocketRect.top ||
      ctaRect.top >= rocketRect.bottom
    );
    return {
      backgroundColor: style.backgroundColor,
      color: style.color,
      intersects,
      opaqueDecorativeLayer,
      ctaIsTopHitTarget: hitTarget === cta || cta.contains(hitTarget),
      ctaRect,
      rocketRect
    };
  });

  await browser.close();

  assert.ok(result, 'CTA da navbar deve existir com o texto canônico');
  assert.equal(result.backgroundColor, 'rgb(255, 197, 82)', 'CTA da navbar deve usar #FFC552');
  assert.equal(result.color, 'rgb(11, 13, 17)', 'Texto do CTA da navbar deve usar #0B0D11');
  assert.equal(result.opaqueDecorativeLayer, false, 'CTA da navbar não pode ter imagem ou gradiente escuro sobre o preenchimento âmbar');
  assert.equal(result.intersects, true, 'A sobreposição geométrica da referência deve estar presente');
  assert.equal(result.ctaIsTopHitTarget, true, 'CTA da navbar deve permanecer acima do foguete e receber pointer input');
});

test('A2 Hero Contract: critical hero content is visible at DOM-ready without legacy animation timing', async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('file:///' + SITE_PATH.replace(/\\/g, '/'), { waitUntil: 'domcontentloaded' });

  const visibility = await page.evaluate(() => {
    const selectors = ['[data-a2-headline]', '[data-a2-copy]', '[data-a2-primary-cta]'];
    return Object.fromEntries(selectors.map(selector => {
      const element = document.querySelector(selector);
      const style = getComputedStyle(element);
      return [selector, {
        display: style.display,
        visibility: style.visibility,
        opacity: Number(style.opacity),
        width: element.getBoundingClientRect().width,
        height: element.getBoundingClientRect().height
      }];
    }));
  });
  await browser.close();

  for (const [selector, state] of Object.entries(visibility)) {
    assert.notEqual(state.display, 'none', `${selector} não pode ser display:none no DOM-ready`);
    assert.notEqual(state.visibility, 'hidden', `${selector} não pode depender de reveal legado para ficar visível`);
    assert.ok(state.opacity > 0.5, `${selector} deve iniciar opaco no DOM-ready`);
    assert.ok(state.width > 0 && state.height > 0, `${selector} deve ocupar área visível no DOM-ready`);
  }
});
