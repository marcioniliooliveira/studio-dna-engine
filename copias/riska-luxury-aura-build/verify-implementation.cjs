const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SITE_DIR = path.join(__dirname, 'site');
const PORT = 8089;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.ttf': 'font/ttf',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4'
};

function createServer() {
  return http.createServer((req, res) => {
    let cleanUrl = decodeURIComponent(req.url.split('?')[0]);
    if (cleanUrl === '/' || cleanUrl === '') cleanUrl = '/index.html';
    const filePath = path.join(SITE_DIR, cleanUrl.replace(/^\//, ''));

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found: ' + req.url);
    }
  });
}

async function runTests() {
  const server = createServer();
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`Test server running at http://localhost:${PORT}/`);

  const browser = await chromium.launch({ headless: true });
  const results = {
    passed: [],
    failed: []
  };

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      results.passed.push(message);
    } else {
      console.error(`  [FAIL] ${message}`);
      results.failed.push(message);
    }
  }

  try {
    console.log('\n--- Test 1: Desktop Initial Load, Typography & Preloader ---');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const failedRequests = [];
    page.on('response', response => {
      if (response.status() >= 400 && response.url().includes('localhost')) {
        failedRequests.push({ url: response.url(), status: response.status() });
      }
    });

    await page.goto(`http://localhost:${PORT}/index.html`);

    // Check preloader presence immediately
    const preloaderExists = await page.$('#sitePreloader');
    assert(!!preloaderExists, 'Preloader element exists in DOM');

    // Wait for preloader to complete and dismiss
    console.log('  Waiting for preloader to dismiss cleanly...');
    await page.waitForFunction(() => {
      const p = document.getElementById('sitePreloader');
      return p && (p.classList.contains('is-dismissed') || window.getComputedStyle(p).display === 'none');
    }, { timeout: 5000 });

    const preloaderDismissed = await page.evaluate(() => {
      const p = document.getElementById('sitePreloader');
      return p && (window.getComputedStyle(p).display === 'none' || p.classList.contains('is-dismissed'));
    });
    assert(preloaderDismissed, 'Preloader dismissed cleanly after animation');

    // Check body scroll unlock
    const bodyScrollUnlocked = await page.evaluate(() => {
      return document.body.style.overflow !== 'hidden' && !document.body.classList.contains('is-preloading');
    });
    assert(bodyScrollUnlocked, 'Body scroll is unlocked after preloader dismisses');

    // Check zero 404s for local assets
    assert(failedRequests.length === 0, `Zero local 404 errors (failed: ${JSON.stringify(failedRequests)})`);

    // Check typography font-family computed styles
    const heroTitleFont = await page.evaluate(() => {
      const el = document.getElementById('heroTitle');
      return window.getComputedStyle(el).fontFamily;
    });
    assert(heroTitleFont.toLowerCase().includes('gagkline'), `Hero title uses Gagkline font (computed: "${heroTitleFont}")`);

    const heroEmFont = await page.evaluate(() => {
      const el = document.querySelector('#heroTitle em');
      return window.getComputedStyle(el).fontFamily;
    });
    assert(heroEmFont.toLowerCase().includes('gagkline'), `Hero italic line uses Gagkline font (computed: "${heroEmFont}")`);

    const heroKickerFont = await page.evaluate(() => {
      const el = document.querySelector('#top .font-kicker');
      return el ? window.getComputedStyle(el).fontFamily : '';
    });
    assert(heroKickerFont.toLowerCase().includes('satoshi'), `Hero kicker uses Satoshi font (computed: "${heroKickerFont}")`);

    const heroDescFont = await page.evaluate(() => {
      const el = document.querySelector('#top .font-body-editorial');
      return el ? window.getComputedStyle(el).fontFamily : '';
    });
    assert(heroDescFont.toLowerCase().includes('satoshi'), `Hero description uses Satoshi font (computed: "${heroDescFont}")`);

    // Check line-height on hero title
    const heroTitleLineHeight = await page.evaluate(() => {
      const el = document.getElementById('heroTitle');
      const style = window.getComputedStyle(el);
      return {
        lineHeight: style.lineHeight,
        fontSize: style.fontSize,
        ratio: parseFloat(style.lineHeight) / parseFloat(style.fontSize)
      };
    });
    assert(heroTitleLineHeight.ratio >= 0.95, `Hero line-height is unclipped (ratio: ${heroTitleLineHeight.ratio.toFixed(2)}, lineHeight: ${heroTitleLineHeight.lineHeight}, fontSize: ${heroTitleLineHeight.fontSize})`);

    // Check unclipped masks on letter stems
    const maskOverflow = await page.evaluate(() => {
      const masks = Array.from(document.querySelectorAll('#heroTitle .word-mask'));
      return masks.every(m => window.getComputedStyle(m).overflow === 'visible');
    });
    assert(maskOverflow, 'Word masks have overflow: visible to eliminate letter stem clipping');

    // Check subtle vertical gradient shade
    const gradientOverlay = await page.$('#top .bg-gradient-to-t');
    assert(!!gradientOverlay, 'Subtle vertical gradient overlay exists over hero video');

    // Check video element
    const videoAttributes = await page.evaluate(() => {
      const v = document.querySelector('#top video');
      return v ? { playsinline: v.hasAttribute('playsinline'), muted: v.muted, autoplay: v.autoplay, loop: v.loop, preload: v.getAttribute('preload') } : null;
    });
    assert(videoAttributes && videoAttributes.muted && videoAttributes.loop && videoAttributes.preload === 'auto', 'Background video configured with muted, loop and preload="auto"');

    // Requirement R2: Section #story Typography & Unclipped Reveal Alignment
    const storyTypography = await page.evaluate(() => {
      const title = document.getElementById('storyTitle');
      const titleStyle = title ? window.getComputedStyle(title) : null;
      const em = title ? title.querySelector('em') : null;
      const emStyle = em ? window.getComputedStyle(em) : null;
      const markers = document.querySelector('#story .font-kicker');
      const markersStyle = markers ? window.getComputedStyle(markers) : null;
      const copy = document.querySelector('#story .reveal-copy');
      const copyStyle = copy ? window.getComputedStyle(copy) : null;
      const masks = Array.from(document.querySelectorAll('#storyTitle .word-mask'));
      const allMasksVisible = masks.length > 0 && masks.every(m => window.getComputedStyle(m).overflow === 'visible');

      return {
        titleFont: titleStyle ? titleStyle.fontFamily : '',
        emFont: emStyle ? emStyle.fontFamily : '',
        emColor: emStyle ? emStyle.color : '',
        markersFont: markersStyle ? markersStyle.fontFamily : '',
        copyFont: copyStyle ? copyStyle.fontFamily : '',
        masksCount: masks.length,
        allMasksVisible
      };
    });
    assert(storyTypography.titleFont.toLowerCase().includes('gagkline'), `#story main heading uses Gagkline font (computed: "${storyTypography.titleFont}")`);
    assert(storyTypography.emFont.toLowerCase().includes('gagkline'), `#story accented phrase uses Gagkline Italic font (computed: "${storyTypography.emFont}")`);
    assert(storyTypography.emColor.includes('213, 53, 39') || storyTypography.emColor === 'rgb(213, 53, 39)', `#story accented phrase is crimson #d53527 (computed: "${storyTypography.emColor}")`);
    assert(storyTypography.markersFont.toLowerCase().includes('satoshi'), `#story markers use Satoshi font (computed: "${storyTypography.markersFont}")`);
    assert(storyTypography.copyFont.toLowerCase().includes('satoshi'), `#story editorial copy uses Satoshi font (computed: "${storyTypography.copyFont}")`);
    assert(storyTypography.allMasksVisible, `#story split-text word masks maintain overflow: visible (checked ${storyTypography.masksCount} masks)`);

    // Requirement R1: Hero button elimination check
    const staticHeroScrollBtn = await page.$('#top .hero-content-wrapper a[href="#story"], #top .hero-content-wrapper a.magnetic');
    assert(!staticHeroScrollBtn, 'Physical static "Scroll ↓" button is removed from hero content grid');

    // Dead CSS purge check
    const indexHtmlRaw = fs.readFileSync(path.join(SITE_DIR, 'index.html'), 'utf8');
    assert(!indexHtmlRaw.includes('.hero-content-wrapper a.magnetic'), 'Dead CSS selector .hero-content-wrapper a.magnetic is completely purged from index.html');

    console.log('\n--- Test 2: Preloader Scroll & Key Isolation Resilience ---');
    // Open a fresh page to test interaction blocking during preloader
    const preloaderTestPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await preloaderTestPage.goto(`http://localhost:${PORT}/index.html`);

    // Attempt wheel scroll while preloader is active
    await preloaderTestPage.mouse.wheel(0, 1200);
    await preloaderTestPage.waitForTimeout(100);

    const scrollYDuringPreload = await preloaderTestPage.evaluate(() => window.scrollY);
    assert(scrollYDuringPreload === 0, `Page remains pinned at scrollY 0 during preloader (got: ${scrollYDuringPreload})`);

    // Attempt Tab key while preloader is active
    await preloaderTestPage.keyboard.press('Tab');
    const focusedDuringPreload = await preloaderTestPage.evaluate(() => {
      const active = document.activeElement;
      return active ? active.tagName : '';
    });
    assert(focusedDuringPreload !== 'A', `Tab key does not leak focus to background links during preloader (active: "${focusedDuringPreload}")`);

    // Wait for preloader to dismiss
    await preloaderTestPage.waitForFunction(() => {
      const p = document.getElementById('sitePreloader');
      return p && (p.classList.contains('is-dismissed') || window.getComputedStyle(p).display === 'none');
    }, { timeout: 5000 });

    const scrollYAfterDismiss = await preloaderTestPage.evaluate(() => window.scrollY);
    assert(scrollYAfterDismiss === 0, `Page remains at scrollY 0 immediately upon preloader unveiling (got: ${scrollYAfterDismiss})`);

    // Verify user can scroll normally after dismiss
    await preloaderTestPage.mouse.wheel(0, 500);
    await preloaderTestPage.waitForTimeout(300);
    const scrollYPostDismiss = await preloaderTestPage.evaluate(() => window.scrollY);
    assert(scrollYPostDismiss > 0, `User can scroll normally after preloader dismisses (scrollY: ${scrollYPostDismiss})`);
    await preloaderTestPage.close();

    console.log('\n--- Test 3: Responsive Viewport Calibration & Non-Collision ---');
    const viewportsToTest = [
      { name: 'Desktop Ultra (1920x1080)', width: 1920, height: 1080 },
      { name: 'Desktop Standard (1440x900)', width: 1440, height: 900 },
      { name: 'Laptop Low-Height (1366x768)', width: 1366, height: 768 },
      { name: 'Tablet Landscape (1024x768)', width: 1024, height: 768 },
      { name: 'Tablet Portrait (768x1024)', width: 768, height: 1024 },
      { name: 'Mobile Standard (390x844)', width: 390, height: 844 },
      { name: 'Mobile Compact (375x667)', width: 375, height: 667 },
      { name: 'Low-Height Window (1280x450)', width: 1280, height: 450 },
      { name: 'Mobile Landscape (667x375)', width: 667, height: 375 },
      { name: 'Mobile Short Height (375x500)', width: 375, height: 500 }
    ];

    for (const vp of viewportsToTest) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.waitForTimeout(200);

      const metrics = await page.evaluate(() => {
        const header = document.getElementById('siteHeader');
        const heroTitle = document.getElementById('heroTitle');
        const heroContent = document.querySelector('.hero-content-wrapper') || heroTitle.parentElement;
        const headerRect = header.getBoundingClientRect();
        const titleRect = heroTitle.getBoundingClientRect();
        const contentRect = heroContent.getBoundingClientRect();
        const scrollBtn = document.querySelector('#top a[href="#story"]');
        const scrollBtnRect = scrollBtn ? scrollBtn.getBoundingClientRect() : null;
        return {
          headerBottom: headerRect.bottom,
          titleTop: titleRect.top,
          contentTop: contentRect.top,
          contentBottom: contentRect.bottom,
          scrollBtnBottom: scrollBtnRect ? scrollBtnRect.bottom : contentRect.bottom,
          viewportHeight: window.innerHeight,
          viewportWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth
        };
      });

      const clearSpace = metrics.contentTop - metrics.headerBottom;
      const bottomClearance = metrics.viewportHeight - metrics.contentBottom;
      assert(clearSpace > 15, `${vp.name}: Ample clear space below sticky header (${clearSpace.toFixed(0)}px space)`);
      assert(bottomClearance >= 0 || metrics.scrollBtnBottom <= metrics.viewportHeight, `${vp.name}: Zero vertical truncation of hero copy/button (bottom clearance: ${bottomClearance.toFixed(0)}px)`);
      assert(metrics.scrollWidth <= metrics.clientWidth + 2, `${vp.name}: Zero horizontal overflow (scrollWidth: ${metrics.scrollWidth}, clientWidth: ${metrics.clientWidth})`);

      const storyMasksUnclipped = await page.evaluate(() => {
        const masks = Array.from(document.querySelectorAll('#storyTitle .word-mask'));
        return masks.length > 0 && masks.every(m => window.getComputedStyle(m).overflow === 'visible');
      });
      assert(storyMasksUnclipped, `${vp.name}: #story word masks maintain overflow: visible (unclipped)`);
    }

    console.log('\n--- Test 4: Interactive Custom Cursor Behavior & Overlay Safety ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    // Move mouse over hero area
    await page.mouse.move(700, 450);
    await page.waitForTimeout(250);

    const cursorActive = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      const h = document.getElementById('top');
      return c && c.classList.contains('is-active') && h.classList.contains('has-custom-cursor');
    });
    assert(cursorActive, 'Custom cursor expands into active pill over hero and sets has-custom-cursor class');

    const cursorText = await page.evaluate(() => {
      const c = document.getElementById('customCursorCircle') || document.getElementById('heroCursorPill');
      return c ? c.textContent.trim().replace(/\s+/g, ' ') : '';
    });
    assert(cursorText.includes('Scroll ↓'), `Cursor displays "Scroll ↓" circular tracking label on hero (got: "${cursorText}")`);

    // Ensure circular cursor has refined circular ring dimensions (~72px to 84px diameter)
    const pillMetrics = await page.evaluate(() => {
      const p = document.getElementById('customCursorCircle') || document.getElementById('heroCursorPill');
      if (!p) return { width: 0, height: 0, opacity: '0' };
      const r = p.getBoundingClientRect();
      const style = window.getComputedStyle(p);
      return {
        width: r.width,
        height: r.height,
        opacity: style.opacity,
        borderRadius: style.borderRadius
      };
    });
    assert(pillMetrics.width >= 72 && pillMetrics.width <= 85, `Cursor circular ring diameter is in 72-84px range (width: ${pillMetrics.width.toFixed(1)}px, height: ${pillMetrics.height.toFixed(1)}px)`);
    assert(Math.abs(pillMetrics.width - pillMetrics.height) <= 1.5, `Cursor maintains 1:1 circular aspect ratio`);
    assert(parseFloat(pillMetrics.opacity) >= 0.8, `Cursor ring is visibly opaque when active (opacity: ${pillMetrics.opacity})`);

    // Ensure cursor label fits within circular boundaries with ample breathing room
    const labelFitMetrics = await page.evaluate(() => {
      const label = document.getElementById('customCursorLabel');
      const circle = document.getElementById('customCursorCircle');
      if (!label || !circle) return { scrollFits: false, exploreFits: false };
      const circleRect = circle.getBoundingClientRect();
      const scrollRect = label.getBoundingClientRect();
      const scrollFits = scrollRect.width < circleRect.width - 16;
      label.textContent = 'Explore ↗';
      const exploreRect = label.getBoundingClientRect();
      const exploreFits = exploreRect.width < circleRect.width - 16;
      label.textContent = 'Scroll ↓';
      return { scrollFits, exploreFits, scrollWidth: scrollRect.width, exploreWidth: exploreRect.width };
    });
    assert(labelFitMetrics.scrollFits, `Cursor label "Scroll ↓" fits inside ring with margin (width: ${labelFitMetrics.scrollWidth.toFixed(1)}px < 64px)`);
    assert(labelFitMetrics.exploreFits, `Cursor label "Explore ↗" fits inside ring with margin (width: ${labelFitMetrics.exploreWidth.toFixed(1)}px < 64px)`);

    // Ensure cursor provides tactile press feedback on pointerdown
    await page.mouse.down();
    await page.waitForTimeout(100);
    const cursorPressed = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      const pill = document.getElementById('heroCursorPill');
      const style = window.getComputedStyle(pill);
      return c && c.classList.contains('is-pressed') && style.transform.includes('0.92');
    });
    assert(cursorPressed, 'Cursor provides tactile press feedback (scale 0.92) on pointerdown');

    // Adversarial verification: pointercancel releases pressed state
    await page.evaluate(() => {
      window.dispatchEvent(new PointerEvent('pointercancel'));
    });
    await page.waitForTimeout(50);
    const cursorReleasedOnCancel = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      return c && !c.classList.contains('is-pressed');
    });
    assert(cursorReleasedOnCancel, 'Cursor releases pressed state on pointercancel');

    // Adversarial verification: window blur releases pressed state
    await page.mouse.down();
    await page.waitForTimeout(50);
    await page.evaluate(() => {
      window.dispatchEvent(new Event('blur'));
    });
    await page.waitForTimeout(50);
    const cursorReleasedOnBlur = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      return c && !c.classList.contains('is-pressed');
    });
    assert(cursorReleasedOnBlur, 'Cursor releases pressed state on window blur');
    await page.mouse.up();
    await page.waitForTimeout(100);

    // Adversarial verification: pointerType: "touch" on desktop does not activate custom cursor
    await page.evaluate(() => {
      window.dispatchEvent(new PointerEvent('pointermove', {
        bubbles: true,
        cancelable: true,
        clientX: 400,
        clientY: 300,
        pointerType: 'touch'
      }));
    });
    await page.waitForTimeout(100);
    const cursorInactiveOnTouchPointer = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      const hasActive = c ? c.classList.contains('is-active') : false;
      return { ok: c && !hasActive, className: c ? c.className : 'null', hasActive };
    });
    assert(cursorInactiveOnTouchPointer.ok, `Touch pointer event (pointerType: "touch") leaves custom cursor inactive (hasActive: ${cursorInactiveOnTouchPointer.hasActive}, classes: "${cursorInactiveOnTouchPointer.className}")`);

    // Hover over interactive element inside hero to verify cursor adapts/mutes
    const navLogo = await page.$('#siteHeader a[href="#top"], #siteHeader a');
    if (navLogo) {
      const box = await navLogo.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(200);
        const cursorInactiveOverLogo = await page.evaluate(() => {
          const c = document.getElementById('customCursor') || document.getElementById('heroCursor');
          return c && !c.classList.contains('is-active');
        });
        assert(cursorInactiveOverLogo, 'Cursor safely deactivates over header interactive links');
      }
    }

    // Move mouse to header (should deactivate hero cursor)
    await page.mouse.move(500, 40);
    await page.waitForTimeout(200);
    const cursorInactiveOverHeader = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      return c && !c.classList.contains('is-active');
    });
    assert(cursorInactiveOverHeader, 'Cursor deactivates when pointer is over siteHeader');

    // Test cursor deactivation when menuOverlay is opened
    await page.click('#menuButton');
    await page.waitForTimeout(1000); // full menu entrance transition (0.85s)
    await page.mouse.move(600, 400);
    await page.waitForTimeout(200);

    const cursorInactiveOverMenu = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      return c && !c.classList.contains('is-active');
    });
    assert(cursorInactiveOverMenu, 'Cursor safely deactivates when full-screen menu overlay is active');

    // Close menu
    const menuCloseBtn = await page.$('#menuClose');
    if (menuCloseBtn) {
      await menuCloseBtn.click();
      await page.waitForTimeout(1000); // full menu exit transition (0.75s)
    }

    // Test cursor deactivation on wheel scroll down without mouse movement
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.mouse.move(700, 450); // hover inside hero
    await page.waitForTimeout(200);
    const cursorActiveBeforeWheel = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      return c && c.classList.contains('is-active');
    });
    assert(cursorActiveBeforeWheel, 'Cursor is active over hero prior to scroll');

    // Wheel down into Story/Editorial section
    await page.mouse.wheel(0, 2000);
    await page.waitForTimeout(400);

    const cursorDeactivatedOnScroll = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      const pill = document.getElementById('heroCursorPill');
      const opacity = parseFloat(window.getComputedStyle(pill).opacity);
      return c && !c.classList.contains('is-active') && opacity < 0.1;
    });
    assert(cursorDeactivatedOnScroll, 'Cursor safely deactivates when scrolling away from hero without mouse movement');

    // Wheel back up into hero
    await page.mouse.wheel(0, -2000);
    await page.waitForTimeout(400);

    const cursorReactivatedOnScrollUp = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      return c && c.classList.contains('is-active');
    });
    assert(cursorReactivatedOnScrollUp, 'Cursor smoothly reactivates when scrolling back into hero under pointer');

    // Test mouse leaving document viewport
    await page.evaluate(() => {
      document.dispatchEvent(new Event('mouseleave'));
    });
    await page.waitForTimeout(300);
    const cursorInactiveOnMouseLeave = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      const label = document.getElementById('customCursorLabel');
      return {
        inactive: c && !c.classList.contains('is-active'),
        labelText: label ? label.textContent.trim() : ''
      };
    });
    assert(cursorInactiveOnMouseLeave.inactive, 'Cursor immediately deactivates when pointer leaves document');
    assert(cursorInactiveOnMouseLeave.labelText === 'Scroll ↓', 'Cursor label cleanly resets to "Scroll ↓" on deactivation');

    // Test mouse re-entry into hero area at a distant coordinate
    await page.mouse.move(900, 600);
    await page.waitForTimeout(250);
    const cursorReentryActive = await page.evaluate(() => {
      const c = document.getElementById('heroCursor');
      return c && c.classList.contains('is-active');
    });
    assert(cursorReentryActive, 'Cursor cleanly reactivates upon re-entering document viewport');

    console.log('\n--- Test 5: Direct Collection Trigger, Text Selection & History Safety ---');
    // Scroll back to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    // Test text selection protection: dragging mouse across hero text should NOT trigger scroll to #collection
    const heroDesc = await page.$('#top p.reveal-copy');
    if (heroDesc) {
      const descBox = await heroDesc.boundingBox();
      if (descBox) {
        await page.mouse.move(descBox.x + 10, descBox.y + descBox.height / 2);
        await page.mouse.down();
        await page.mouse.move(descBox.x + descBox.width - 10, descBox.y + descBox.height / 2, { steps: 5 });
        await page.mouse.up();
        await page.waitForTimeout(300);

        const scrollAfterSelect = await page.evaluate(() => window.scrollY);
        assert(scrollAfterSelect < 100, `Text selection on hero copy does not trigger collection jump (scrollY: ${scrollAfterSelect})`);
        await page.evaluate(() => window.getSelection().removeAllRanges());
      }
    }

    const historyLengthBefore = await page.evaluate(() => window.history.length);

    // Click multiple times on empty hero area
    for (let i = 0; i < 4; i++) {
      await page.mouse.click(350, 400);
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(600);

    const hashAfterHeroClick = await page.evaluate(() => window.location.hash);
    const scrollPos = await page.evaluate(() => window.scrollY);
    const historyLengthAfter = await page.evaluate(() => window.history.length);

    assert(hashAfterHeroClick === '#story' || hashAfterHeroClick === '#collection' || scrollPos > 100, `Clicking hero navigates directly to #story / #collection (hash: "${hashAfterHeroClick}", scrollY: ${scrollPos})`);
    assert(historyLengthAfter - historyLengthBefore <= 1, `Multi-clicking hero does not flood browser history with duplicate entries (delta: ${historyLengthAfter - historyLengthBefore})`);

    // Verify hero click smooth scroll targets #story
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.mouse.click(350, 400);
    await page.waitForTimeout(600);
    const hashAfterHeroTrigger = await page.evaluate(() => window.location.hash);
    const scrollPosStory = await page.evaluate(() => window.scrollY);
    assert(hashAfterHeroTrigger === '#story' || scrollPosStory > 100, `Hero click smoothly navigates to #story (hash: "${hashAfterHeroTrigger}", scrollY: ${scrollPosStory})`);

    const storyHeaderClearance = await page.evaluate(() => {
      const header = document.getElementById('siteHeader');
      const marker = document.querySelector('#story .font-kicker');
      if (!header || !marker) return { clearance: 0, ok: false };
      const headerRect = header.getBoundingClientRect();
      const markerRect = marker.getBoundingClientRect();
      return {
        clearance: markerRect.top - headerRect.bottom,
        ok: markerRect.top >= headerRect.bottom + 10
      };
    });
    assert(storyHeaderClearance.ok, `Hero click navigation preserves ample clear space below sticky header without obscuring #story markers (${storyHeaderClearance.clearance.toFixed(0)}px clearance)`);

    // Adversarial verification: prefers-reduced-motion hero click
    const rmPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await rmPage.emulateMedia({ reducedMotion: 'reduce' });
    await rmPage.goto(`http://localhost:${PORT}/index.html`);
    await rmPage.waitForFunction(() => {
      const p = document.getElementById('sitePreloader');
      return p && (p.classList.contains('is-dismissed') || window.getComputedStyle(p).display === 'none');
    });
    await rmPage.mouse.click(400, 400);
    await rmPage.waitForTimeout(300);
    const rmHash = await rmPage.evaluate(() => window.location.hash);
    const rmScroll = await rmPage.evaluate(() => window.scrollY);
    assert(rmHash === '#story' || rmScroll > 100, `Hero click with prefers-reduced-motion immediately jumps to #story without errors (hash: "${rmHash}", scrollY: ${rmScroll})`);
    await rmPage.close();

    console.log('\n--- Test 5b: Deep Link URL Hash Preservation ---');
    const deepLinkPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await deepLinkPage.goto(`http://localhost:${PORT}/index.html#collection`);
    await deepLinkPage.waitForFunction(() => {
      const p = document.getElementById('sitePreloader');
      return p && (p.classList.contains('is-dismissed') || window.getComputedStyle(p).display === 'none');
    }, { timeout: 6000 });
    await deepLinkPage.waitForTimeout(600);
    const deepLinkScrollY = await deepLinkPage.evaluate(() => window.scrollY);
    const deepLinkHash = await deepLinkPage.evaluate(() => window.location.hash);
    assert(deepLinkHash === '#collection', `Deep link hash preserved in URL (got: "${deepLinkHash}")`);
    assert(deepLinkScrollY > 1000, `Deep link navigates to target section after preloader unveils (scrollY: ${deepLinkScrollY})`);
    await deepLinkPage.close();

    console.log('\n--- Test 6: Touch Devices (Disabled Cursor & Zero Interference) ---');
    const touchContext = await browser.newContext({
      hasTouch: true,
      isMobile: true,
      viewport: { width: 390, height: 844 }
    });
    const touchPage = await touchContext.newPage();
    await touchPage.goto(`http://localhost:${PORT}/index.html`);

    await touchPage.waitForFunction(() => {
      const p = document.getElementById('sitePreloader');
      return p && (p.classList.contains('is-dismissed') || window.getComputedStyle(p).display === 'none');
    }, { timeout: 5000 });

    const cursorHiddenOnTouch = await touchPage.evaluate(() => {
      const c = document.getElementById('heroCursor');
      return !c || window.getComputedStyle(c).display === 'none';
    });
    assert(cursorHiddenOnTouch, 'Custom cursor is completely disabled on touch devices');

    console.log('\n--- Test 7: Standalone Component Verification (All Sections) ---');
    const sectionsToTest = [
      { file: 'sections/01_main-1.html', name: '01_main-1.html' },
      { file: 'sections/00_siteHeader.html', name: '00_siteHeader.html' },
      { file: 'sections/02_footer-2.html', name: '02_footer-2.html' },
      { file: 'sections/03_nav-3.html', name: '03_nav-3.html' }
    ];

    for (const sec of sectionsToTest) {
      const sectionErrors = [];
      const sectionFailedRequests = [];
      const sectionPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      sectionPage.on('console', msg => {
        if (msg.type() === 'error') sectionErrors.push(`Console error: ${msg.text()}`);
      });
      sectionPage.on('pageerror', err => {
        sectionErrors.push(`Page error: ${err.message}`);
      });
      sectionPage.on('response', response => {
        if (response.status() >= 400 && response.url().includes('localhost')) {
          sectionFailedRequests.push({ url: response.url(), status: response.status() });
        }
      });

      await sectionPage.goto(`http://localhost:${PORT}/${sec.file}`);
      await sectionPage.waitForTimeout(800);

      assert(sectionFailedRequests.length === 0, `Standalone ${sec.name} zero local 404s (failed: ${JSON.stringify(sectionFailedRequests)})`);
      assert(sectionErrors.length === 0, `Standalone ${sec.name} zero runtime/console errors (errors: ${JSON.stringify(sectionErrors)})`);

      if (sec.file.includes('01_main-1.html')) {
        const sectionTitleFont = await sectionPage.evaluate(() => {
          const el = document.getElementById('heroTitle');
          return el ? window.getComputedStyle(el).fontFamily : '';
        });
        assert(sectionTitleFont.toLowerCase().includes('gagkline'), `Standalone 01_main-1.html hero title uses Gagkline font (computed: "${sectionTitleFont}")`);

        const sectionKickerFont = await sectionPage.evaluate(() => {
          const el = document.querySelector('#top .font-kicker');
          return el ? window.getComputedStyle(el).fontFamily : '';
        });
        assert(sectionKickerFont.toLowerCase().includes('satoshi'), `Standalone 01_main-1.html kicker uses Satoshi font (computed: "${sectionKickerFont}")`);

        const standaloneStoryMetrics = await sectionPage.evaluate(() => {
          const title = document.getElementById('storyTitle');
          const em = title ? title.querySelector('em') : null;
          const mask = title ? title.querySelector('.word-mask') : null;
          return {
            titleFont: title ? window.getComputedStyle(title).fontFamily : '',
            emFont: em ? window.getComputedStyle(em).fontFamily : '',
            emColor: em ? window.getComputedStyle(em).color : '',
            maskOverflow: mask ? window.getComputedStyle(mask).overflow : ''
          };
        });
        assert(standaloneStoryMetrics.titleFont.toLowerCase().includes('gagkline'), `Standalone 01_main-1.html #story heading uses Gagkline font (computed: "${standaloneStoryMetrics.titleFont}")`);
        assert(standaloneStoryMetrics.emFont.toLowerCase().includes('gagkline'), `Standalone 01_main-1.html #story accented phrase uses Gagkline Italic font (computed: "${standaloneStoryMetrics.emFont}")`);
        assert(standaloneStoryMetrics.emColor.includes('213, 53, 39'), `Standalone 01_main-1.html #story accented phrase is crimson #d53527 (computed: "${standaloneStoryMetrics.emColor}")`);
        assert(standaloneStoryMetrics.maskOverflow === 'visible', `Standalone 01_main-1.html #story word masks maintain overflow: visible`);
      }

      await sectionPage.close();
    }

    console.log('\n--- Test 8: Zero Regressions Across All Existing Sections ---');
    const sectionsStatus = await page.evaluate(() => {
      const ids = ['top', 'story', 'editorial', 'journal', 'collection'];
      return ids.map(id => {
        const el = document.getElementById(id);
        return {
          id,
          exists: !!el,
          hasChildren: el ? el.children.length > 0 : false
        };
      });
    });

    for (const sec of sectionsStatus) {
      assert(sec.exists && sec.hasChildren, `Section #${sec.id} intact and fully populated`);
    }

    console.log('\n--- Test 9: Poeza Bride Line-Masked Text Reveal & Dual Accessible Layer ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);

    const poezaSections = ['top', 'story', 'editorial', 'journal', 'collection'];
    for (const secId of poezaSections) {
      const revealData = await page.evaluate((id) => {
        const sec = document.getElementById(id);
        if (!sec) return { exists: false };
        const heading = sec.querySelector('h1, h2');
        if (!heading) return { exists: true, hasHeading: false };
        
        // Check for accessible screen reader layer
        const srSpan = heading.querySelector('.sr-only, [data-sr-text], span[style*="clip"]');
        const srText = srSpan ? srSpan.textContent.trim() : '';

        // Check for visual masked line/word layer
        const visualLayer = heading.querySelector('[aria-hidden="true"], .visual-reveal-layer');
        const masks = Array.from(heading.querySelectorAll('.line-mask, .word-mask'));
        const revealWords = Array.from(heading.querySelectorAll('.reveal-word, .reveal-line'));
        
        // Check unclipped letters (overflow visible or ample line-height)
        const allMasksUnclipped = masks.length > 0 && masks.every(m => {
          const style = window.getComputedStyle(m);
          return style.overflow === 'visible' || parseFloat(style.lineHeight) >= parseFloat(style.fontSize);
        });

        const computedFont = window.getComputedStyle(heading).fontFamily;
        const em = heading.querySelector('em');
        const emFont = em ? window.getComputedStyle(em).fontFamily : '';

        return {
          exists: true,
          hasHeading: true,
          hasSrLayer: !!srSpan && srText.length > 0,
          srText,
          hasVisualLayer: !!visualLayer || masks.length > 0,
          masksCount: masks.length,
          revealWordsCount: revealWords.length,
          allMasksUnclipped,
          computedFont,
          emFont
        };
      }, secId);

      assert(revealData.exists && revealData.hasHeading, `Section #${secId} contains a primary heading for text reveal`);
      assert(revealData.hasSrLayer, `Section #${secId} heading includes accessible unsegmented text for screen readers (text: "${revealData.srText}")`);
      assert(revealData.hasVisualLayer && revealData.masksCount > 0, `Section #${secId} heading includes visual masked lines/words (${revealData.masksCount} masks, ${revealData.revealWordsCount} words)`);
      assert(revealData.allMasksUnclipped, `Section #${secId} heading masks maintain zero ascender/descender clipping`);
      assert(revealData.computedFont.toLowerCase().includes('gagkline'), `Section #${secId} heading uses Gagkline font (computed: "${revealData.computedFont}")`);
      if (revealData.emFont) {
        assert(revealData.emFont.toLowerCase().includes('gagkline'), `Section #${secId} italic accent uses Gagkline font (computed: "${revealData.emFont}")`);
      }
    }

    console.log('\n--- Test 10: Maison Alaïa 50%/50% Asynchronous Dual-Grid & #productStory Preservation (#collection) ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => {
      const col = document.getElementById('collection');
      if (col) col.scrollIntoView();
    });
    await page.waitForTimeout(400);

    const productStoryData = await page.evaluate(() => {
      const col = document.getElementById('collection');
      if (!col) return null;
      const ps = col.querySelector('#productStory');
      if (!ps) return { exists: false };
      const slides = Array.from(ps.querySelectorAll('.product-slide'));
      const viewButtons = Array.from(ps.querySelectorAll('[data-view-piece], .product-action'));
      const counter = ps.querySelector('#productCounter');
      const track = ps.querySelector('#productTrack');
      const progress = ps.querySelector('#productProgress');

      const pdp = col.querySelector('#atelierPDP, [data-is-alaia-subsection="true"]');
      const isImmediatelyFollowing = ps.nextElementSibling === pdp || (pdp && !!(ps.compareDocumentPosition(pdp) & Node.DOCUMENT_POSITION_FOLLOWING));

      return {
        exists: true,
        slidesCount: slides.length,
        viewButtonsCount: viewButtons.length,
        hasCounter: !!counter,
        hasTrack: !!track,
        hasProgress: !!progress,
        hasPdpSubsection: !!pdp,
        pdpIsSubsectionAttr: pdp ? pdp.getAttribute('data-is-alaia-subsection') : null,
        isImmediatelyFollowing: !!isImmediatelyFollowing
      };
    });

    assert(!!productStoryData && productStoryData.exists, 'Section #collection preserves horizontal #productStory track');
    assert(productStoryData.slidesCount === 5, `Horizontal #productStory track preserves all 5 product slides (found: ${productStoryData.slidesCount})`);
    assert(productStoryData.viewButtonsCount >= 5, `Horizontal #productStory slides each contain a View button (found: ${productStoryData.viewButtonsCount})`);
    assert(productStoryData.hasCounter && productStoryData.hasTrack && productStoryData.hasProgress, 'Horizontal #productStory includes counter, track, and progress bar');
    assert(productStoryData.hasPdpSubsection && productStoryData.pdpIsSubsectionAttr === 'true', 'Maison Alaïa PDP is structured as dedicated subsection (#atelierPDP) with data-is-alaia-subsection="true"');
    assert(productStoryData.isImmediatelyFollowing, 'Subsection #atelierPDP coexists immediately following #productStory within #collection');

    const alaiaGridData = await page.evaluate(() => {
      const col = document.getElementById('collection');
      if (!col) return null;
      const grid = col.querySelector('.alaia-dual-grid, [data-is-alaia-grid="true"]');
      if (!grid) return { hasGrid: false };
      
      const gridRect = grid.getBoundingClientRect();
      const leftCol = grid.querySelector('.alaia-col-left, [data-is-sticky-image="true"]');
      const rightCol = grid.querySelector('.alaia-col-right, .alaia-scroll-column');
      
      if (!leftCol || !rightCol) return { hasGrid: true, hasCols: false };

      const leftRect = leftCol.getBoundingClientRect();
      const rightRect = rightCol.getBoundingClientRect();
      const leftWidthRatio = leftRect.width / gridRect.width;
      const rightWidthRatio = rightRect.width / gridRect.width;

      const isStickyImage = leftCol.hasAttribute('data-is-sticky-image') || leftCol.querySelector('[data-is-sticky-image="true"]');
      const leftImg = leftCol.querySelector('img');

      const img02 = rightCol.querySelector('[data-image-index="2"], .alaia-image-02, img:nth-of-type(1)');
      const buyModule = rightCol.querySelector('.atelier-buy-module, [data-module="buy"]');
      const pieceTitle = buyModule ? buyModule.querySelector('.piece-title, [data-piece-title]') : null;
      const piecePrice = buyModule ? buyModule.querySelector('.piece-price, [data-piece-price]') : null;
      const swatches = buyModule ? Array.from(buyModule.querySelectorAll('.fabric-swatch, [data-swatch]')) : [];
      const activeSwatch = buyModule ? buyModule.querySelector('.fabric-swatch.is-active, [data-swatch].is-active, .fabric-swatch[aria-checked="true"]') : null;
      const activeSwatchRing = activeSwatch ? window.getComputedStyle(activeSwatch).boxShadow || window.getComputedStyle(activeSwatch).borderColor : '';
      const sizePills = buyModule ? Array.from(buyModule.querySelectorAll('.size-pill, [data-size]')) : [];
      const acquireBtn = buyModule ? buyModule.querySelector('.acquire-cta, button[data-action="acquire"]') : null;

      const macroImages = Array.from(rightCol.querySelectorAll('[data-image-index="3"], [data-image-index="4"], .alaia-macro-image'));
      const accordions = Array.from(rightCol.querySelectorAll('.atelier-accordion, [data-accordion]'));
      const switcherItems = Array.from(col.querySelectorAll('.piece-switcher button, [data-piece-select]'));

      return {
        hasGrid: true,
        hasCols: true,
        gridWidth: gridRect.width,
        leftWidthRatio,
        rightWidthRatio,
        isStickyImage: !!isStickyImage,
        hasLeftImg: !!leftImg && !!leftImg.getAttribute('src'),
        hasImg02: !!img02,
        hasBuyModule: !!buyModule,
        hasPieceTitle: !!pieceTitle,
        pieceTitleText: pieceTitle ? pieceTitle.textContent.trim() : '',
        pieceTitleFont: pieceTitle ? window.getComputedStyle(pieceTitle).fontFamily : '',
        hasPiecePrice: !!piecePrice,
        piecePriceText: piecePrice ? piecePrice.textContent.trim() : '',
        swatchesCount: swatches.length,
        hasActiveSwatch: !!activeSwatch,
        activeSwatchRing,
        sizePillsCount: sizePills.length,
        hasAcquireBtn: !!acquireBtn,
        macroImagesCount: macroImages.length,
        accordionsCount: accordions.length,
        switcherCount: switcherItems.length
      };
    });

    assert(!!alaiaGridData && alaiaGridData.hasGrid, 'Section #collection features Alaïa dual-grid container');
    assert(alaiaGridData.hasCols, 'Alaïa dual-grid contains left pinned column and right scrolling column');
    assert(Math.abs(alaiaGridData.leftWidthRatio - 0.5) <= 0.05, `Desktop layout is 50%/50% split (left: ${(alaiaGridData.leftWidthRatio * 100).toFixed(1)}%, right: ${(alaiaGridData.rightWidthRatio * 100).toFixed(1)}%)`);
    assert(alaiaGridData.isStickyImage && alaiaGridData.hasLeftImg, 'Left column features pinned master lookbook image with data-is-sticky-image="true"');
    assert(alaiaGridData.hasImg02, 'Right column includes secondary lookbook Image 02');
    assert(alaiaGridData.hasBuyModule, 'Right column includes Atelier Buy Module');
    assert(alaiaGridData.hasPieceTitle && alaiaGridData.pieceTitleFont.toLowerCase().includes('gagkline'), `Atelier buy module uses Gagkline font for piece title (computed: "${alaiaGridData.pieceTitleFont}")`);
    assert(alaiaGridData.hasPiecePrice && alaiaGridData.piecePriceText.includes('$'), `Atelier buy module displays price (got: "${alaiaGridData.piecePriceText}")`);
    assert(alaiaGridData.swatchesCount >= 3, `Atelier buy module features fabric/color swatches (found: ${alaiaGridData.swatchesCount})`);
    assert(alaiaGridData.hasActiveSwatch, 'Atelier buy module highlights active fabric swatch with crimson ring');
    assert(alaiaGridData.sizePillsCount >= 4, `Atelier buy module provides size selector pills (found: ${alaiaGridData.sizePillsCount})`);
    assert(alaiaGridData.hasAcquireBtn, 'Atelier buy module features primary "Acquire Piece" CTA button');
    assert(alaiaGridData.macroImagesCount >= 2, `Right column features macro fabric & pedestal still-life images (found: ${alaiaGridData.macroImagesCount})`);
    assert(alaiaGridData.accordionsCount >= 3, `Right column features GSAP details accordions (found: ${alaiaGridData.accordionsCount})`);
    assert(alaiaGridData.switcherCount >= 5, `Interactive piece switcher supports all 5 collection pieces (found: ${alaiaGridData.switcherCount})`);

    console.log('  Testing #productStory "View" button triggers Alaïa PDP piece selection...');
    const viewBtnResult = await page.evaluate(async () => {
      const viewBtn = document.querySelector('#productStory [data-view-piece="2"], #productStory .product-slide:nth-child(2) .product-action');
      if (!viewBtn) return { clicked: false, error: 'no view button' };
      viewBtn.click();
      await new Promise(r => setTimeout(r, 200));

      const col = document.getElementById('collection');
      const title = col.querySelector('.piece-title, [data-piece-title]');
      const price = col.querySelector('.piece-price, [data-piece-price]');
      const mainImg = col.querySelector('.alaia-col-left img, [data-is-sticky-image="true"] img');
      const activeBtn = col.querySelector('.piece-switcher button.is-active, [data-piece-select="2"].is-active');

      return {
        clicked: true,
        title: title ? title.textContent.trim() : '',
        price: price ? price.textContent.trim() : '',
        imgSrc: mainImg ? mainImg.getAttribute('src') : '',
        hasActiveBtn: !!activeBtn
      };
    });

    assert(viewBtnResult && viewBtnResult.clicked, 'Slide 002 "View" button successfully clicked');
    assert(viewBtnResult && (viewBtnResult.title || '').includes('Le Monde Blazer'), `Slide "View" button updates active piece to "Le Monde Blazer" (got: "${viewBtnResult ? viewBtnResult.title : ''}")`);
    assert(viewBtnResult && (viewBtnResult.price || '').includes('$3,650'), `Slide "View" button updates price to "$3,650" (got: "${viewBtnResult ? viewBtnResult.price : ''}")`);
    assert(viewBtnResult && (viewBtnResult.imgSrc || '').includes('806e135e'), `Slide "View" button updates pinned image src to 806e135e (src: "${viewBtnResult && viewBtnResult.imgSrc ? viewBtnResult.imgSrc.substring(0, 50) : ''}...")`);
    assert(viewBtnResult && viewBtnResult.hasActiveBtn, 'Slide "View" button highlights corresponding piece switcher button');

    console.log('  Testing interactive piece switching in #atelierPDP switcher...');
    const switchResult = await page.evaluate(async () => {
      const col = document.getElementById('collection');
      const switcherBtn = col.querySelector('[data-piece-select="3"], .piece-switcher button:nth-child(3)');
      if (!switcherBtn) return { switched: false, error: 'no button' };
      switcherBtn.click();
      await new Promise(r => setTimeout(r, 200));
      
      const title = col.querySelector('.piece-title, [data-piece-title]');
      const price = col.querySelector('.piece-price, [data-piece-price]');
      const mainImg = col.querySelector('.alaia-col-left img, [data-is-sticky-image="true"] img');
      return {
        switched: true,
        title: title ? title.textContent.trim() : '',
        price: price ? price.textContent.trim() : '',
        imgSrc: mainImg ? mainImg.getAttribute('src') : ''
      };
    });
    assert(switchResult && switchResult.switched && (switchResult.title || '').includes('The Blake Trouser'), `Interactive switcher updates active piece to "The Blake Trouser" (got: "${switchResult ? switchResult.title : ''}")`);
    assert(switchResult && (switchResult.price || '').includes('$2,950'), `Interactive switcher updates price to "$2,950" (got: "${switchResult ? switchResult.price : ''}")`);
    assert(switchResult && (switchResult.imgSrc || '').includes('6dbbbbe0'), `Interactive switcher updates pinned image src without reload (src: "${switchResult && switchResult.imgSrc ? switchResult.imgSrc.substring(0, 50) : ''}...")`);

    console.log('\n--- Test 11: Alaïa Mobile Responsiveness & Sticky Action Bar (< 1024px) ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);

    const mobileData = await page.evaluate(() => {
      const col = document.getElementById('collection');
      if (!col) return { exists: false };
      
      const carousel = col.querySelector('.pdp-mobile-carousel, [data-mobile-carousel="true"]');
      const stickyBar = document.querySelector('.mobile-sticky-action-bar, [data-mobile-sticky-bar="true"]');
      const barStyle = stickyBar ? window.getComputedStyle(stickyBar) : null;
      const barVisible = stickyBar ? barStyle.display !== 'none' && (barStyle.position === 'fixed' || barStyle.position === 'sticky') : false;
      const barTitle = stickyBar ? stickyBar.querySelector('.sticky-piece-title') : null;
      const barPrice = stickyBar ? stickyBar.querySelector('.sticky-piece-price') : null;
      const barCta = stickyBar ? stickyBar.querySelector('button') : null;

      return {
        exists: true,
        hasCarousel: !!carousel,
        hasStickyBar: !!stickyBar,
        barVisible,
        barTitleText: barTitle ? barTitle.textContent.trim() : '',
        barPriceText: barPrice ? barPrice.textContent.trim() : '',
        hasBarCta: !!barCta,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      };
    });

    assert(mobileData.exists && mobileData.hasCarousel, 'Mobile viewport cleanly collapses collection images into swipe carousel');
    assert(mobileData.barVisible, 'Mobile viewport displays sticky bottom purchase action bar (position: fixed/sticky)');
    assert(mobileData.barTitleText.length > 0 && mobileData.barPriceText.includes('$'), `Sticky bottom bar displays piece title and price (title: "${mobileData.barTitleText}", price: "${mobileData.barPriceText}")`);
    assert(mobileData.hasBarCta, 'Sticky bottom bar provides immediate purchase CTA button');
    assert(mobileData.scrollWidth <= mobileData.clientWidth + 2, `Zero horizontal overflow on mobile viewports (scrollWidth: ${mobileData.scrollWidth}, clientWidth: ${mobileData.clientWidth})`);

    console.log('\n--- Test 12: Accordion Accessibility (ARIA Expanded/Controls/Region) & Toggling ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.evaluate(() => {
      const pdp = document.getElementById('atelierPDP');
      if (pdp) pdp.scrollIntoView();
    });
    await page.waitForTimeout(300);

    const accordionData = await page.evaluate(async () => {
      const accs = Array.from(document.querySelectorAll('.atelier-accordion'));
      const initial = accs.map(acc => {
        const btn = acc.querySelector('.atelier-accordion-header');
        const body = acc.querySelector('.atelier-accordion-body');
        return {
          hasAriaExpanded: btn ? btn.hasAttribute('aria-expanded') : false,
          ariaExpanded: btn ? btn.getAttribute('aria-expanded') : null,
          hasAriaControls: btn ? btn.hasAttribute('aria-controls') : false,
          hasRoleRegion: body ? body.getAttribute('role') === 'region' : false,
          bodyId: body ? body.id : null
        };
      });

      // Click first accordion header
      const firstBtn = accs[0] ? accs[0].querySelector('.atelier-accordion-header') : null;
      if (firstBtn) firstBtn.click();
      await new Promise(r => setTimeout(r, 400));

      const afterClick = accs.map(acc => {
        const btn = acc.querySelector('.atelier-accordion-header');
        const body = acc.querySelector('.atelier-accordion-body');
        return {
          isOpen: acc.classList.contains('is-open'),
          ariaExpanded: btn ? btn.getAttribute('aria-expanded') : null,
          bodyHeight: body ? body.getBoundingClientRect().height : 0
        };
      });

      return { initial, afterClick };
    });

    assert(accordionData.initial.every(a => a.hasAriaExpanded && a.ariaExpanded === 'false'), 'All accordion headers initial aria-expanded="false"');
    assert(accordionData.initial.every(a => a.hasAriaControls && a.hasRoleRegion), 'All accordions have aria-controls and role="region"');
    assert(accordionData.afterClick[0].isOpen && accordionData.afterClick[0].ariaExpanded === 'true', 'Accordion toggle updates class is-open and aria-expanded="true"');
    assert(accordionData.afterClick[0].bodyHeight > 30, `Accordion body expands smoothly with content visible (height: ${accordionData.afterClick[0].bodyHeight.toFixed(0)}px)`);

    console.log('\n--- Test 13: Size Selector Pills ARIA Pressed Accessibility & Interaction ---');
    const sizePillData = await page.evaluate(async () => {
      const pills = Array.from(document.querySelectorAll('.size-pill'));
      const initialStates = pills.map(p => ({
        size: p.getAttribute('data-size'),
        ariaPressed: p.getAttribute('aria-pressed'),
        isActive: p.classList.contains('is-active')
      }));

      // Click FR 38 (3rd pill)
      if (pills[2]) pills[2].click();
      await new Promise(r => setTimeout(r, 100));

      const afterClickStates = pills.map(p => ({
        size: p.getAttribute('data-size'),
        ariaPressed: p.getAttribute('aria-pressed'),
        isActive: p.classList.contains('is-active')
      }));

      return { initialStates, afterClickStates };
    });

    assert(sizePillData.initialStates[0].ariaPressed === 'true' && sizePillData.initialStates.slice(1).every(p => p.ariaPressed === 'false'), 'Size pills initialize with first pill aria-pressed="true" and others "false"');
    assert(sizePillData.afterClickStates[2].ariaPressed === 'true' && sizePillData.afterClickStates[0].ariaPressed === 'false', 'Selecting new size pill updates aria-pressed and deactivates prior pill');

    console.log('\n--- Test 14: Mobile Sticky Action Bar CTA Click & Smooth Scroll ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => {
      const pdp = document.getElementById('atelierPDP');
      if (pdp) pdp.scrollIntoView();
    });
    await page.waitForTimeout(400);

    const mobileCtaClickData = await page.evaluate(async () => {
      const stickyBar = document.querySelector('.mobile-sticky-action-bar');
      const cta = stickyBar ? stickyBar.querySelector('button') : null;
      const buyModule = document.querySelector('.atelier-buy-module');
      if (!cta || !buyModule) return { success: false };

      cta.click();
      await new Promise(r => setTimeout(r, 600));

      const buyRect = buyModule.getBoundingClientRect();
      return {
        success: true,
        buyModuleVisible: buyRect.top < window.innerHeight && buyRect.bottom > 0,
        buyRectTop: buyRect.top
      };
    });

    assert(mobileCtaClickData.success && mobileCtaClickData.buyModuleVisible, `Mobile sticky action bar CTA smoothly scrolls user to Atelier buy module (rect top: ${mobileCtaClickData.buyRectTop ? mobileCtaClickData.buyRectTop.toFixed(0) : ''}px)`);

    console.log('\n--- Test 15: Global Consistency of Dual-Layer Text Reveal on #newsletterTitle ---');
    const nlTitleData = await page.evaluate(() => {
      const nl = document.getElementById('newsletterTitle');
      if (!nl) return { exists: false };
      const srOnly = nl.querySelector('.sr-only');
      const visualLayer = nl.querySelector('.visual-reveal-layer');
      const masks = Array.from(nl.querySelectorAll('.line-mask, .word-mask'));
      const words = Array.from(nl.querySelectorAll('.reveal-word, .reveal-line'));
      const font = window.getComputedStyle(nl).fontFamily;
      const allMasksUnclipped = masks.length > 0 && masks.every(m => window.getComputedStyle(m).overflow === 'visible');

      return {
        exists: true,
        hasSrOnly: !!srOnly,
        srText: srOnly ? srOnly.textContent.trim() : '',
        hasVisualLayer: !!visualLayer,
        masksCount: masks.length,
        wordsCount: words.length,
        font,
        allMasksUnclipped
      };
    });

    assert(nlTitleData.exists && nlTitleData.hasSrOnly, `Newsletter title includes accessible unsegmented text for screen readers (text: "${nlTitleData.srText}")`);
    assert(nlTitleData.hasVisualLayer && nlTitleData.masksCount >= 4, `Newsletter title includes visual masked lines/words (${nlTitleData.masksCount} masks, ${nlTitleData.wordsCount} words)`);
    assert(nlTitleData.allMasksUnclipped, 'Newsletter title masks maintain zero ascender/descender clipping (overflow: visible)');
    assert(nlTitleData.font.toLowerCase().includes('gagkline'), `Newsletter title uses Gagkline font (computed: "${nlTitleData.font}")`);

    console.log('\n--- Test 16: Slide 005 Active-Pin Smooth Scroll Target Accuracy ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    const pinScrollResult = await page.evaluate(async () => {
      const ps = document.getElementById('productStory');
      if (!ps) return { success: false, error: 'no productStory' };

      const psTop = window.scrollY + ps.getBoundingClientRect().top;
      // Scroll 3000px deep into #productStory to trigger horizontal scrub to slide 5
      window.scrollTo(0, psTop + 3000);
      await new Promise(r => setTimeout(r, 400));

      const slide5 = ps.querySelector('.product-slide:nth-child(5)');
      const viewBtn = slide5 ? slide5.querySelector('[data-view-piece], .product-action') : null;
      if (!viewBtn) return { success: false, error: 'no viewBtn' };

      viewBtn.click();
      // Wait for smooth scroll animation to settle
      await new Promise(r => setTimeout(r, 1000));

      const pdp = document.getElementById('atelierPDP');
      const rect = pdp ? pdp.getBoundingClientRect() : null;
      const activeTitle = pdp ? pdp.querySelector('.piece-title') : null;

      return {
        success: true,
        pdpTop: rect ? rect.top : null,
        pdpInView: rect ? (rect.top <= 120 && rect.bottom > 120) : false,
        activeTitleText: activeTitle ? activeTitle.textContent.trim() : ''
      };
    });

    assert(pinScrollResult.success && pinScrollResult.pdpInView, `Clicking View on Slide 005 during active pinning lands accurately on #atelierPDP (pdpTop: ${pinScrollResult.pdpTop ? pinScrollResult.pdpTop.toFixed(0) : ''}px, active piece: "${pinScrollResult.activeTitleText}")`);

    console.log('\n--- Test 17: W3C ARIA Conformance for Switcher & Swatches (Radio/Radiogroup & Dynamic aria-pressed) ---');
    const ariaConformanceData = await page.evaluate(async () => {
      const col = document.getElementById('collection');
      const switcherGroup = col.querySelector('.piece-switcher div[role="group"]');
      const switcherBtns = Array.from(col.querySelectorAll('.piece-switcher button'));
      const swatchesGroup = col.querySelector('.swatches-group div[role="radiogroup"]');
      const swatches = Array.from(col.querySelectorAll('.fabric-swatch'));

      // Reset to piece 1 to test initial piece state
      if (switcherBtns[0]) switcherBtns[0].click();
      await new Promise(r => setTimeout(r, 100));

      const initialSwitcher = switcherBtns.map(b => ({
        text: b.textContent.trim(),
        ariaPressed: b.getAttribute('aria-pressed')
      }));

      // Switch to piece 3
      if (switcherBtns[2]) switcherBtns[2].click();
      await new Promise(r => setTimeout(r, 150));

      const afterSwitchSwitcher = switcherBtns.map(b => ({
        text: b.textContent.trim(),
        ariaPressed: b.getAttribute('aria-pressed')
      }));

      const initialSwatches = swatches.map(s => ({
        name: s.getAttribute('data-swatch'),
        role: s.getAttribute('role'),
        checked: s.getAttribute('aria-checked')
      }));

      // Click 2nd swatch ("Ink")
      if (swatches[1]) swatches[1].click();
      await new Promise(r => setTimeout(r, 100));

      const afterClickSwatches = swatches.map(s => ({
        name: s.getAttribute('data-swatch'),
        role: s.getAttribute('role'),
        checked: s.getAttribute('aria-checked')
      }));

      // Switch back to piece 1 for clean state
      if (switcherBtns[0]) switcherBtns[0].click();
      await new Promise(r => setTimeout(r, 100));

      return {
        hasSwitcherGroup: !!switcherGroup,
        initialSwitcher,
        afterSwitchSwitcher,
        hasSwatchesRadiogroup: !!swatchesGroup,
        initialSwatches,
        afterClickSwatches
      };
    });

    assert(ariaConformanceData.hasSwitcherGroup, 'Piece switcher container defines role="group" and aria-label');
    assert(ariaConformanceData.initialSwitcher[0].ariaPressed === 'true' && ariaConformanceData.initialSwitcher.slice(1).every(b => b.ariaPressed === 'false'), 'Piece switcher initializes with first piece aria-pressed="true" and others "false"');
    assert(ariaConformanceData.afterSwitchSwitcher[2].ariaPressed === 'true' && ariaConformanceData.afterSwitchSwitcher[0].ariaPressed === 'false', 'Selecting new piece updates aria-pressed="true" on new piece and "false" on prior');
    assert(ariaConformanceData.hasSwatchesRadiogroup, 'Colorway swatches container defines role="radiogroup" with aria-labelledby');
    assert(ariaConformanceData.initialSwatches.every(s => s.role === 'radio'), 'All fabric swatches declare semantic role="radio"');
    assert(ariaConformanceData.initialSwatches[0].checked === 'true' && ariaConformanceData.initialSwatches.slice(1).every(s => s.checked === 'false'), 'Swatches initialize with first swatch aria-checked="true"');
    assert(ariaConformanceData.afterClickSwatches[1].checked === 'true' && ariaConformanceData.afterClickSwatches[0].checked === 'false', 'Selecting another swatch updates aria-checked dynamically');

    console.log('\n--- Test 18: WCAG 2.4.4 Contextual Descriptive Labels on #productStory "View" Buttons ---');
    const viewButtonLabels = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('#productStory [data-view-piece]'));
      return btns.map(b => ({
        piece: b.getAttribute('data-view-piece'),
        ariaLabel: b.getAttribute('aria-label') || '',
        text: b.textContent.trim()
      }));
    });

    assert(viewButtonLabels.length === 5, 'Found all 5 product slide View buttons');
    assert(viewButtonLabels.every(b => b.ariaLabel.length > 5 && b.ariaLabel.toLowerCase().includes('view') && b.ariaLabel.toLowerCase().includes('atelier')), 'All 5 View buttons contain descriptive aria-label attributes including garment context');
    assert(viewButtonLabels[0].ariaLabel.includes('The Blaise Cape'), 'Slide 001 View button specifies "The Blaise Cape"');
    assert(viewButtonLabels[1].ariaLabel.includes('Le Monde Blazer'), 'Slide 002 View button specifies "Le Monde Blazer"');
    assert(viewButtonLabels[2].ariaLabel.includes('The Blake Trouser'), 'Slide 003 View button specifies "The Blake Trouser"');
    assert(viewButtonLabels[3].ariaLabel.includes('The Arlo Coat'), 'Slide 004 View button specifies "The Arlo Coat"');
    assert(viewButtonLabels[4].ariaLabel.includes('The Silas Shirt'), 'Slide 005 View button specifies "The Silas Shirt"');

    console.log('\n--- Test 19: Keyboard Focus-Visible Styling Across Interactive Controls ---');
    const focusVisibleStyles = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      let foundFocusVisible = false;
      let focusRules = [];

      for (const sheet of styleSheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.selectorText && rule.selectorText.includes(':focus-visible')) {
              foundFocusVisible = true;
              focusRules.push({
                selector: rule.selectorText,
                cssText: rule.cssText
              });
            }
          }
        } catch (e) {}
      }

      return { foundFocusVisible, focusRules };
    });

    assert(focusVisibleStyles.foundFocusVisible, 'Stylesheet includes explicit :focus-visible rules for keyboard navigation');
    assert(focusVisibleStyles.focusRules.some(r => r.cssText.includes('213, 53, 39') || r.cssText.includes('#d53527')), 'Focus-visible styles apply high-contrast atelier crimson (#d53527) outline');

    console.log('\n--- Test 20: prefers-reduced-motion Programmatic Scroll Conformance ---');
    const rmTestPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await rmTestPage.emulateMedia({ reducedMotion: 'reduce' });
    await rmTestPage.goto(`http://localhost:${PORT}/index.html`);
    await rmTestPage.waitForTimeout(600);

    const rmScrollResults = await rmTestPage.evaluate(async () => {
      let slideScrollOptions = null;
      let mobileCtaScrollOptions = null;

      const originalScrollIntoView = Element.prototype.scrollIntoView;
      Element.prototype.scrollIntoView = function(opts) {
        if (!slideScrollOptions) {
          slideScrollOptions = opts;
        } else {
          mobileCtaScrollOptions = opts;
        }
        return originalScrollIntoView.apply(this, arguments);
      };

      const viewBtn = document.querySelector('#productStory [data-view-piece="2"]');
      if (viewBtn) viewBtn.click();
      await new Promise(r => setTimeout(r, 100));

      const mobileCta = document.querySelector('.mobile-sticky-action-bar button');
      if (mobileCta) mobileCta.click();
      await new Promise(r => setTimeout(r, 100));

      Element.prototype.scrollIntoView = originalScrollIntoView;
      return { slideScrollOptions, mobileCtaScrollOptions };
    });

    assert(rmScrollResults.slideScrollOptions && rmScrollResults.slideScrollOptions.behavior === 'auto', 'Slide View click uses instant jump ("auto") scroll behavior when prefers-reduced-motion is active');
    assert(rmScrollResults.mobileCtaScrollOptions && rmScrollResults.mobileCtaScrollOptions.behavior === 'auto', 'Mobile sticky bar CTA uses instant jump ("auto") scroll behavior when prefers-reduced-motion is active');

    console.log('\n--- Test 21: CTA Feedback Price-Rollback Race Condition Immunity ---');
    const ctaRaceTest = await page.evaluate(async () => {
      const col = document.getElementById('collection');
      const acquireBtn = col.querySelector('.acquire-cta');
      const piece1Btn = col.querySelector('[data-piece-select="1"]');
      const piece2Btn = col.querySelector('[data-piece-select="2"]');

      // Select piece 1 ($4,800)
      piece1Btn.click();
      await new Promise(r => setTimeout(r, 80));

      // Click Acquire CTA
      acquireBtn.click();

      // Within 250ms, switch to piece 2 ($3,650)
      await new Promise(r => setTimeout(r, 250));
      piece2Btn.click();

      // Wait 2600ms for original timeout to lapse
      await new Promise(r => setTimeout(r, 2600));

      const finalCtaText = acquireBtn.textContent.trim();
      const hasFeedbackRed = acquireBtn.classList.contains('bg-[#d53527]');

      return { finalCtaText, hasFeedbackRed };
    });

    assert(ctaRaceTest.finalCtaText.includes('$3,650'), `CTA feedback price does not roll back to stale $4,800 on rapid piece switch (got: "${ctaRaceTest.finalCtaText}")`);
    assert(!ctaRaceTest.hasFeedbackRed, 'CTA feedback background cleanly returns to standard state');

    console.log('\n--- Test 22: Mobile Touch Carousel Alt-Text Parity & Scroll Position Reset ---');
    await page.setViewportSize({ width: 390, height: 844 });
    const mobileSyncTest = await page.evaluate(async () => {
      const col = document.getElementById('collection');
      const carousel = col.querySelector('.pdp-mobile-carousel');

      // Scroll deep into carousel
      if (carousel) carousel.scrollLeft = 400;
      await new Promise(r => setTimeout(r, 80));

      // Switch to piece 3 ("The Blake Trouser")
      const piece3Btn = col.querySelector('[data-piece-select="3"]');
      if (piece3Btn) piece3Btn.click();
      await new Promise(r => setTimeout(r, 150));

      const m01 = col.querySelector('#mobileImg01');
      const m02 = col.querySelector('#mobileImg02');
      const stickyBar = document.querySelector('.mobile-sticky-action-bar');
      const stickyCta = stickyBar ? stickyBar.querySelector('button') : null;

      return {
        carouselScrollLeft: carousel ? carousel.scrollLeft : null,
        alt01: m01 ? m01.getAttribute('alt') : '',
        alt02: m02 ? m02.getAttribute('alt') : '',
        stickyCtaAriaLabel: stickyCta ? stickyCta.getAttribute('aria-label') : ''
      };
    });

    assert(mobileSyncTest.carouselScrollLeft === 0, `Mobile touch carousel resets scroll position to slide 1 on piece switch (got: ${mobileSyncTest.carouselScrollLeft})`);
    assert(mobileSyncTest.alt01.includes('The Blake Trouser'), `Mobile image 01 alt text synchronizes with selected piece (got: "${mobileSyncTest.alt01}")`);
    assert(mobileSyncTest.alt02.includes('The Blake Trouser'), `Mobile image 02 alt text synchronizes with selected piece (got: "${mobileSyncTest.alt02}")`);
    assert(mobileSyncTest.stickyCtaAriaLabel.includes('The Blake Trouser'), `Mobile sticky bar CTA aria-label synchronizes with selected piece (got: "${mobileSyncTest.stickyCtaAriaLabel}")`);

    console.log('\n--- Test 23: W3C WAI-ARIA APG Radio Group Keyboard Navigation & Roving Tabindex ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    const radioNavTest = await page.evaluate(async () => {
      const swatches = Array.from(document.querySelectorAll('.fabric-swatch'));
      if (swatches.length < 2) return { success: false };

      // Reset to piece 1 and swatch 0
      const piece1Btn = document.querySelector('[data-piece-select="1"]');
      if (piece1Btn) piece1Btn.click();
      if (swatches[0]) swatches[0].click();
      await new Promise(r => setTimeout(r, 100));

      const initialTabs = swatches.map(s => s.getAttribute('tabindex'));
      const initialChecked = swatches.map(s => s.getAttribute('aria-checked'));

      // Dispatch ArrowRight on swatch 0
      swatches[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
      await new Promise(r => setTimeout(r, 80));

      const afterRightTabs = swatches.map(s => s.getAttribute('tabindex'));
      const afterRightChecked = swatches.map(s => s.getAttribute('aria-checked'));

      // Dispatch ArrowLeft on swatch 1
      swatches[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
      await new Promise(r => setTimeout(r, 80));

      const afterLeftTabs = swatches.map(s => s.getAttribute('tabindex'));
      const afterLeftChecked = swatches.map(s => s.getAttribute('aria-checked'));

      return {
        initialTabs,
        initialChecked,
        afterRightTabs,
        afterRightChecked,
        afterLeftTabs,
        afterLeftChecked
      };
    });

    assert(radioNavTest.initialTabs[0] === '0' && radioNavTest.initialTabs.slice(1).every(t => t === '-1'), 'Fabric swatches initialize with roving tabindex (active=0, inactive=-1)');
    assert(radioNavTest.afterRightChecked[1] === 'true' && radioNavTest.afterRightTabs[1] === '0', 'ArrowRight moves focus and aria-checked to next fabric swatch');
    assert(radioNavTest.afterLeftChecked[0] === 'true' && radioNavTest.afterLeftTabs[0] === '0', 'ArrowLeft moves focus and aria-checked back to prior fabric swatch');

    console.log('\n--- Test 24: Accordion Panel Screen Reader Visibility & Zero Leaked Focus ---');
    const syncAndA11yTest = await page.evaluate(async () => {
      const col = document.getElementById('collection');
      const accordions = Array.from(col.querySelectorAll('.atelier-accordion'));

      // Check second accordion (Materials & Origin) which starts collapsed
      const closedBody = accordions[1].querySelector('.atelier-accordion-body');
      const closedVis = closedBody ? window.getComputedStyle(closedBody).visibility : null;

      // Open second accordion
      const secondHeader = accordions[1].querySelector('.atelier-accordion-header');
      if (secondHeader) secondHeader.click();
      await new Promise(r => setTimeout(r, 200));

      const openVis = closedBody ? window.getComputedStyle(closedBody).visibility : null;

      // Close it back for clean DOM state
      if (secondHeader) secondHeader.click();
      await new Promise(r => setTimeout(r, 100));

      // Reset first accordion if still open from Test 12
      const firstHeader = accordions[0].querySelector('.atelier-accordion-header');
      if (accordions[0].classList.contains('is-open') && firstHeader) firstHeader.click();
      await new Promise(r => setTimeout(r, 100));

      return {
        closedVis,
        openVis
      };
    });

    assert(syncAndA11yTest.closedVis === 'hidden', 'Collapsed accordion panels have visibility: hidden preventing phantom keyboard focus');
    assert(syncAndA11yTest.openVis === 'visible', 'Expanded accordion panels transition visibility: visible for full content accessibility');

    await rmTestPage.close();
    await touchContext.close();
    await page.close();

  } catch (err) {
    console.error('Fatal test error:', err);
    results.failed.push('Fatal execution error: ' + err.message);
  } finally {
    await browser.close();
    server.close();
  }

  console.log('\n=======================================');
  console.log(`SUMMARY: ${results.passed.length} passed, ${results.failed.length} failed`);
  console.log('=======================================');

  if (results.failed.length > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTests();
