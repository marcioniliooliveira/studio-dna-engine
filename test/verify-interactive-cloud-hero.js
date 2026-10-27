const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const assert = require('assert');

(async () => {
  console.log('[Test] Launching Chromium to verify interactive-cloud-hero.html...');
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--use-gl=angle',
      '--use-angle=d3d11',
      '--enable-webgl',
      '--ignore-gpu-blocklist'
    ]
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  const consoleErrors = [];
  const consoleWarnings = [];
  const consoleLogs = [];

  page.on('console', (msg) => {
    const text = msg.text();
    const type = msg.type();
    if (type === 'error') {
      consoleErrors.push(text);
      console.error(`  [Browser Error] ${text}`);
    } else if (type === 'warning') {
      consoleWarnings.push(text);
      console.warn(`  [Browser Warn] ${text}`);
    } else {
      consoleLogs.push(text);
      console.log(`  [Browser Log] ${text}`);
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
    console.error(`  [Page Uncaught Error] ${err.message}`);
  });

  const htmlPath = path.resolve(__dirname, 'interactive-cloud-hero.html');
  const fileUrl = `file://${htmlPath.replace(/\\/g, '/')}`;

  console.log(`[Test] Navigating to ${fileUrl}...`);
  await page.goto(fileUrl, { waitUntil: 'load', timeout: 30000 });

  // 1. Verify DOM elements exist
  console.log('[Test] Verifying DOM elements...');
  await page.waitForSelector('#canvas-container canvas', { timeout: 10000 });
  await page.waitForSelector('h1', { timeout: 10000 });

  const heading1 = await page.locator('h1').first().textContent();
  const heading2 = await page.locator('h1').nth(1).textContent();
  const primaryBtn = await page.locator('#btn-primary').textContent();
  const secondaryBtn = await page.locator('#btn-secondary').textContent();

  console.log(`  Heading Line 1: "${heading1.trim()}"`);
  console.log(`  Heading Line 2: "${heading2.trim()}"`);
  console.log(`  Primary Button: "${primaryBtn.trim()}"`);
  console.log(`  Secondary Button: "${secondaryBtn.trim()}"`);

  assert.strictEqual(heading1.trim(), 'Launch Your', 'Line 1 text matches');
  assert.strictEqual(heading2.trim(), 'Workflow Into Orbit', 'Line 2 text matches');
  assert.strictEqual(primaryBtn.trim(), 'Get Started for Free', 'Primary CTA matches');
  assert.strictEqual(secondaryBtn.trim(), 'Explore Features', 'Secondary CTA matches');

  // 2. Let the simulation and render loop run for 2.5 seconds to settle and profile FPS
  console.log('[Test] Running simulation loop for 2.5 seconds...');
  await page.waitForTimeout(2500);

  // 3. Read window.__interactiveCloudHero diagnostics
  const diagnostics = await page.evaluate(() => {
    const d = window.__interactiveCloudHero;
    if (!d) return null;
    return {
      initialized: d.initialized,
      clusterCount: d.clusterCount,
      puffCount: d.puffCount,
      projectileCount: d.projectileCount,
      fps: d.fps,
      frameCount: d.frameCount,
      lastDelta: d.lastDelta,
      projectilePositions: d.getProjectilePositions ? d.getProjectilePositions() : null,
      puffsSample: d.getPuffSample ? d.getPuffSample() : null
    };
  });

  console.log('[Test] Engine Diagnostics:', JSON.stringify(diagnostics, null, 2));

  assert(diagnostics, 'window.__interactiveCloudHero is defined');
  assert.strictEqual(diagnostics.clusterCount, 5, '5 independent cloud clusters');
  assert.strictEqual(diagnostics.puffCount, 112, '112 total cloud puffs across 5 clusters');
  assert.strictEqual(diagnostics.projectileCount, 4, '4 high-speed projectiles');
  assert(diagnostics.frameCount >= 100, `Rendered frames (${diagnostics.frameCount}) should be >= 100`);
  assert(diagnostics.fps >= 55, `FPS (${diagnostics.fps}) maintains 60 FPS target (>= 55)`);

  // 4. Verify projectile positions & wake dynamics
  if (diagnostics.projectilePositions) {
    diagnostics.projectilePositions.forEach((pos, i) => {
      assert(pos.length === 3, `Projectile ${i} has 3 coordinates`);
      pos.forEach((coord, axis) => {
        assert(!isNaN(coord) && isFinite(coord), `Projectile ${i} axis ${axis} is valid finite number: ${coord}`);
      });
    });
  }

  // 5. Verify cloud puff samples
  if (diagnostics.puffsSample) {
    diagnostics.puffsSample.forEach((p) => {
      p.base.forEach((val) => assert(!isNaN(val) && isFinite(val)));
      p.disp.forEach((val) => assert(!isNaN(val) && isFinite(val)));
      p.vel.forEach((val) => assert(!isNaN(val) && isFinite(val)));
    });
  }

  // 6. Capture high-fidelity visual screenshot
  const screenshotPath = path.resolve(__dirname, 'interactive-cloud-hero-screenshot.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log(`[Test] Visual screenshot captured at: ${screenshotPath}`);
  assert(fs.existsSync(screenshotPath), 'Screenshot file exists on disk');

  // 7. Verify zero errors and zero warnings
  console.log(`[Test] Total console errors: ${consoleErrors.length}`);
  console.log(`[Test] Total console warnings: ${consoleWarnings.length}`);
  assert.strictEqual(consoleErrors.length, 0, `Expected 0 console errors, got: ${JSON.stringify(consoleErrors)}`);
  assert.strictEqual(consoleWarnings.length, 0, `Expected 0 console warnings, got: ${JSON.stringify(consoleWarnings)}`);

  await browser.close();
  console.log('\n========================================');
  console.log('✅ ALL VERIFICATIONS PASSED SUCCESSFULLY!');
  console.log('========================================\n');
})().catch((err) => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
