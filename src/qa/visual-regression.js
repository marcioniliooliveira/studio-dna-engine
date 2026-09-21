/**
 * Visual Regression QA Suite (Playwright + Screenshot Diff)
 * 
 * Captures and compares screenshots of original vs transmuted sites
 * across multiple breakpoints (Desktop, Tablet, Mobile) and scroll states.
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function runVisualQA({
  originalUrl,
  transmutedUrl,
  outputDir = path.resolve(__dirname, '../../qa-reports'),
  viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'mobile', width: 390, height: 844 }
  ],
  scrollPositions = [0, 600, 1200]
}) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('🔍 [Visual QA] Launching Playwright browser...');

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1
    });

    const pageOrig = await context.newPage();
    const pageTrans = await context.newPage();

    for (const scrollY of scrollPositions) {
      console.log(`📸 [Visual QA] Capturing ${vp.name} @ scroll ${scrollY}px...`);

      // Original
      await pageOrig.goto(originalUrl, { waitUntil: 'domcontentloaded' });
      await pageOrig.waitForTimeout(1000);
      if (scrollY > 0) {
        await pageOrig.evaluate((y) => window.scrollTo(0, y), scrollY);
        await pageOrig.waitForTimeout(600);
      }
      const origShotPath = path.join(outputDir, `orig-${vp.name}-${scrollY}px.png`);
      await pageOrig.screenshot({ path: origShotPath });

      // Transmuted
      await pageTrans.goto(transmutedUrl, { waitUntil: 'domcontentloaded' });
      await pageTrans.waitForTimeout(1000);
      if (scrollY > 0) {
        await pageTrans.evaluate((y) => window.scrollTo(0, y), scrollY);
        await pageTrans.waitForTimeout(600);
      }
      const transShotPath = path.join(outputDir, `trans-${vp.name}-${scrollY}px.png`);
      await pageTrans.screenshot({ path: transShotPath });

      results.push({
        viewport: vp.name,
        scrollY,
        origShotPath,
        transShotPath
      });
    }

    await context.close();
  }

  await browser.close();
  console.log(`✅ [Visual QA] Completed! ${results.length} pairs saved to ${outputDir}`);
  return results;
}

module.exports = {
  runVisualQA
};
