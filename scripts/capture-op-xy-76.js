const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const URL = 'https://op-xy-76.aura.build/';
const OUT = path.resolve(process.cwd(), 'copias', 'op-xy-76-aura-build');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  console.log('🔄 Navigating to', URL);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });

  console.log('⏳ Waiting for editor hydration...');
  await page.waitForFunction(() => {
    const root = document.getElementById('root');
    return root && root.innerHTML.length > 500;
  }, { timeout: 30000 });

  console.log('⏳ Waiting for preview iframe...');
  await page.waitForSelector('iframe[title="HTML Preview"]', { timeout: 15000 });
  await page.waitForTimeout(3000);

  const iframeHandle = await page.$('iframe[title="HTML Preview"]');
  const frame = await iframeHandle.contentFrame();

  if (!frame) {
    console.log('❌ Could not access iframe content frame');
    await browser.close();
    return;
  }

  console.log('✅ Accessed preview iframe!');
  await frame.waitForTimeout(3000);

  // Scroll through iframe to trigger lazy loads
  await frame.evaluate(() => {
    return new Promise(resolve => {
      const totalHeight = document.documentElement.scrollHeight;
      let currentScroll = 0;
      const step = 500;
      const interval = setInterval(() => {
        currentScroll += step;
        window.scrollTo(0, currentScroll);
        if (currentScroll >= totalHeight) {
          clearInterval(interval);
          window.scrollTo(0, 0);
          setTimeout(resolve, 1000);
        }
      }, 200);
    });
  });

  await frame.waitForTimeout(2000);

  const iframeData = await frame.evaluate(() => {
    const sections = [];
    document.querySelectorAll('section, [id], main, header, footer, nav').forEach((s, i) => {
      if (i > 60) return;
      const rect = s.getBoundingClientRect();
      if (rect.height < 10) return;
      sections.push({
        index: i, tag: s.tagName, id: s.id || null,
        className: (typeof s.className === 'string' ? s.className : '').substring(0, 400),
        textPreview: (s.textContent || '').substring(0, 500).trim(),
        childCount: s.children.length,
        rect: { top: Math.round(rect.top + window.scrollY), height: Math.round(rect.height), width: Math.round(rect.width) }
      });
    });

    const images = [];
    document.querySelectorAll('img').forEach(el => {
      images.push({ src: el.src?.substring(0, 250), alt: el.alt, w: el.naturalWidth, h: el.naturalHeight });
    });

    const videos = [];
    document.querySelectorAll('video').forEach(el => {
      const sources = Array.from(el.querySelectorAll('source')).map(s => s.src);
      videos.push({ src: el.src || sources[0], poster: el.poster, sources });
    });

    const canvases = [];
    document.querySelectorAll('canvas').forEach(c => {
      canvases.push({ width: c.width, height: c.height, className: c.className?.substring?.(0, 100), dataEngine: c.getAttribute('data-engine') });
    });

    const headings = [];
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      const text = (h.textContent || '').trim();
      if (text) headings.push({ level: h.tagName, text: text.substring(0, 300) });
    });

    const paragraphs = [];
    document.querySelectorAll('p').forEach(p => {
      const text = (p.textContent || '').trim();
      if (text.length > 10) paragraphs.push(text.substring(0, 500));
    });

    const navLinks = [];
    document.querySelectorAll('a').forEach(a => {
      const text = (a.textContent || '').trim();
      if (text) navLinks.push({ text: text.substring(0, 100), href: a.href || a.getAttribute('href') });
    });

    const buttons = [];
    document.querySelectorAll('button, [role="button"]').forEach(b => {
      const text = (b.textContent || '').trim();
      if (text) buttons.push({ tag: b.tagName, text: text.substring(0, 100) });
    });

    const cssVars = {};
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText?.includes(':root')) {
              for (let k = 0; k < rule.style.length; k++) {
                if (rule.style[k].startsWith('--')) {
                  cssVars[rule.style[k]] = rule.style.getPropertyValue(rule.style[k]).trim();
                }
              }
            }
          }
        } catch(e) {}
      }
    } catch(e) {}

    const hasGSAP = !!(window.gsap || window.ScrollTrigger);
    const hasLenis = !!(window.Lenis || document.querySelector('.lenis'));
    const hasThree = !!(window.THREE || document.querySelector('canvas[data-engine]'));
    const bodyCS = getComputedStyle(document.body);

    return {
      title: document.title,
      scrollHeight: document.documentElement.scrollHeight,
      sections, images, videos, canvases, headings,
      paragraphs: paragraphs.slice(0, 40),
      navLinks: navLinks.slice(0, 30),
      buttons: buttons.slice(0, 30),
      cssVars, hasGSAP, hasLenis, hasThree,
      bodyBg: bodyCS.backgroundColor,
      bodyColor: bodyCS.color,
      bodyFont: bodyCS.fontFamily,
      htmlClasses: document.documentElement.className,
      bodyClasses: document.body.className
    };
  });

  console.log('\n📊 TEMPLATE Analysis (inside iframe):');
  console.log(`  Scroll height: ${iframeData.scrollHeight}px`);
  console.log(`  Sections: ${iframeData.sections.length}`);
  console.log(`  Images: ${iframeData.images.length}`);
  console.log(`  Videos: ${iframeData.videos.length}`);
  console.log(`  Canvas: ${iframeData.canvases.length}`);
  console.log(`  Headings: ${iframeData.headings.length}`);
  console.log(`  Paragraphs: ${iframeData.paragraphs.length}`);
  console.log(`  Links: ${iframeData.navLinks.length}`);
  console.log(`  Buttons: ${iframeData.buttons.length}`);
  console.log(`  GSAP: ${iframeData.hasGSAP} | Lenis: ${iframeData.hasLenis} | Three.js: ${iframeData.hasThree}`);
  console.log(`  Body BG: ${iframeData.bodyBg}`);
  console.log(`  Body Color: ${iframeData.bodyColor}`);
  console.log(`  Body Font: ${iframeData.bodyFont}`);

  console.log('\n📑 Headings:');
  iframeData.headings.forEach(h => console.log(`  ${h.level}: ${h.text}`));

  console.log('\n📄 Paragraphs:');
  iframeData.paragraphs.forEach((p, i) => console.log(`  [${i}]: ${p.substring(0, 150)}`));

  console.log('\n🔗 Links:');
  iframeData.navLinks.forEach(l => console.log(`  ${l.text.substring(0, 50)} → ${l.href}`));

  console.log('\n🖼️ Images:');
  iframeData.images.forEach(i => console.log(`  ${i.w}x${i.h} ${i.alt || ''} → ${i.src?.substring(0, 120)}`));

  console.log('\n🎬 Videos:');
  iframeData.videos.forEach(v => console.log(`  ${v.src?.substring(0, 120)}`));

  console.log('\n🖥️ Canvas:');
  iframeData.canvases.forEach(c => console.log(`  ${c.width}x${c.height} engine=${c.dataEngine}`));

  console.log('\n🎨 CSS Variables:');
  Object.entries(iframeData.cssVars).forEach(([k, v]) => console.log(`  ${k}: ${v}`));

  console.log('\n🔘 Buttons:');
  iframeData.buttons.forEach(b => console.log(`  [${b.tag}] ${b.text}`));

  console.log('\n📐 Sections:');
  iframeData.sections.forEach(s => {
    console.log(`  [${s.index}] <${s.tag}> id="${s.id || ''}" y=${s.rect.top} h=${s.rect.height}px children=${s.childCount}`);
    console.log(`    class: ${s.className.substring(0, 120)}`);
    console.log(`    text: ${s.textPreview.substring(0, 120)}`);
  });

  const iframeHTML = await frame.content();
  fs.writeFileSync(path.join(OUT, 'site', 'template-content.html'), iframeHTML, 'utf8');
  console.log(`\n💾 Template HTML saved (${(iframeHTML.length / 1024).toFixed(0)} KB)`);

  fs.writeFileSync(path.join(OUT, 'template-analysis.json'), JSON.stringify(iframeData, null, 2), 'utf8');

  const screenshotsDir = path.join(OUT, 'screenshots');
  fs.mkdirSync(screenshotsDir, { recursive: true });

  await frame.evaluate(() => window.scrollTo(0, 0));
  await frame.waitForTimeout(500);
  await page.screenshot({ path: path.join(screenshotsDir, '01-hero.png'), fullPage: false });
  console.log('📸 Hero screenshot');

  const totalHeight = iframeData.scrollHeight;
  const step = 1080;
  let shotIndex = 2;

  for (let y = step; y < Math.min(totalHeight, step * 15); y += step) {
    await frame.evaluate(scrollY => window.scrollTo(0, scrollY), y);
    await frame.waitForTimeout(800);
    await page.screenshot({
      path: path.join(screenshotsDir, `${String(shotIndex).padStart(2, '0')}-scroll-${y}.png`),
      fullPage: false
    });
    console.log(`📸 Screenshot at scroll ${y}px`);
    shotIndex++;
  }

  await browser.close();
  console.log('\n✅ Template capture complete!');
})();
