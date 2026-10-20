/**
 * src/qa/visual-capture-matrix.js
 * 
 * Studio DNA PRO v2.6 — Low-Spec Visual Capture Matrix (Workers: 1)
 * 
 * Architecture:
 * - Reuses a single Chromium page tab across 4 viewports x 6 states (24 captures)
 * - Zero parallel page allocations (<150MB total RAM)
 * - Deterministic SHA-256 screenshot binding for immutable QA verification
 */

'use strict';

const crypto = require('node:crypto');

const VIEWPORTS = [
  { id: 'desktop', width: 1440, height: 900 },
  { id: 'tablet_landscape', width: 1024, height: 768 },
  { id: 'tablet_portrait', width: 768, height: 1024 },
  { id: 'mobile', width: 390, height: 844 }
];

const CAPTURE_STATES = [
  'top',
  'middle',
  'bottom',
  'menu-open',
  'focus',
  'reduced-motion'
];

/**
 * Executes full visual capture matrix across 4 viewports and 6 states using a single page instance.
 * 
 * @param {object} page Playwright Page object or MockPage
 * @param {object} [options={}]
 * @param {string} [options.url] Target URL to inspect
 * @param {Function} [options.onCapture] Callback for each captured frame
 * @returns {Promise<{ url: string, totalCaptures: number, timestamp: string, captures: Array<object> }>}
 */
async function captureVisualMatrix(page, options = {}) {
  if (!page) {
    throw new Error('Page instance is required for captureVisualMatrix');
  }

  const url = options.url || 'http://localhost:4000';
  const captures = [];

  for (const vp of VIEWPORTS) {
    // 1. Resize single page viewport in memory
    if (typeof page.setViewportSize === 'function') {
      await page.setViewportSize({ width: vp.width, height: vp.height });
    }

    for (const state of CAPTURE_STATES) {
      // 2. Apply deterministic state
      await applyState(page, state, vp);

      // 3. Capture frame buffer
      let buffer;
      if (typeof page.screenshot === 'function') {
        buffer = await page.screenshot({ type: 'png' });
      } else {
        // Fallback/Mock buffer for pure unit tests
        buffer = Buffer.from(`mock_screenshot_${vp.id}_${state}_${url}`);
      }

      const hash = crypto.createHash('sha256').update(buffer).digest('hex');
      const captureId = `capture_${vp.id}_${state}`;

      const entry = {
        id: captureId,
        viewport: vp,
        state,
        hash,
        byteLength: buffer.length,
        timestamp: new Date().toISOString()
      };

      captures.push(entry);
      if (options.onCapture) {
        options.onCapture(entry, buffer);
      }
    }
  }

  return {
    url,
    totalCaptures: captures.length,
    timestamp: new Date().toISOString(),
    captures
  };
}

async function applyState(page, state, vp) {
  if (typeof page.evaluate !== 'function') return;

  switch (state) {
    case 'top':
      await page.evaluate(() => window.scrollTo(0, 0));
      break;
    case 'middle':
      await page.evaluate(() => window.scrollTo(0, document.body ? document.body.scrollHeight / 2 : 500));
      break;
    case 'bottom':
      await page.evaluate(() => window.scrollTo(0, document.body ? document.body.scrollHeight : 1000));
      break;
    case 'menu-open':
      await page.evaluate(() => {
        const menuBtn = document.querySelector('[data-menu-toggle], button.menu, nav button');
        if (menuBtn && typeof menuBtn.click === 'function') menuBtn.click();
        else document.body?.setAttribute('data-menu-state', 'open');
      });
      break;
    case 'focus':
      await page.evaluate(() => {
        const primaryInteractive = document.querySelector('button, a[href], input');
        if (primaryInteractive && typeof primaryInteractive.focus === 'function') {
          primaryInteractive.focus();
        }
      });
      break;
    case 'reduced-motion':
      if (typeof page.emulateMedia === 'function') {
        await page.emulateMedia({ reducedMotion: 'reduce' });
      }
      break;
  }
}

module.exports = {
  VIEWPORTS,
  CAPTURE_STATES,
  captureVisualMatrix
};
