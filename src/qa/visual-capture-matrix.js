/**
 * src/qa/visual-capture-matrix.js
 * 
 * Studio DNA PRO v3.0 — Low-Spec Visual Capture Matrix (Workers: 1)
 * 
 * Architecture:
 * - Single-Worker Chromium page reuse across canonical viewports x color schemes x states
 * - Zero parallel page allocations (<150MB total RAM)
 * - Deterministic time freezing (reduced-motion, seeded PRNG, fixed clock, CDP animation pause)
 * - Console error & page error monitoring with instant zero-tolerance failure
 * - Immutable SHA-256 bindings for rendered HTML and screenshot frames
 */

'use strict';

const crypto = require('node:crypto');

// Standard v2.6 viewports (preserved for backward compatibility)
const VIEWPORTS = [
  { id: 'desktop', width: 1440, height: 900 },
  { id: 'tablet_landscape', width: 1024, height: 768 },
  { id: 'tablet_portrait', width: 768, height: 1024 },
  { id: 'mobile', width: 390, height: 844 }
];

// Canonical Pareto v3 viewports (Task 7 / TASK-V3-06)
const CANONICAL_VIEWPORTS = [
  { id: 'desktop', width: 1440, height: 900 },
  { id: 'tablet', width: 768, height: 1024 },
  { id: 'mobile', width: 390, height: 844 }
];

const CANONICAL_COLOR_SCHEMES = ['light', 'dark'];

const CAPTURE_STATES = [
  'top',
  'middle',
  'bottom',
  'menu-open',
  'focus',
  'reduced-motion'
];

const CANONICAL_STATES = [
  'fold-0',
  'mid-scroll',
  'bottom',
  'hover',
  'focus'
];

/**
 * Freezes deterministic time, animations and PRNG on the page
 * @param {object} page Playwright Page
 * @param {object} [cdpSession] Optional CDP Session
 */
async function freezeDeterministicTime(page, cdpSession = null) {
  if (!page) return;

  // 1. Force prefers-reduced-motion: reduce
  if (typeof page.emulateMedia === 'function') {
    await page.emulateMedia({ reducedMotion: 'reduce' });
  }

  // 2. Freeze JS Clock, Math.random seed and CSS/Web Animations
  if (typeof page.evaluate === 'function') {
    await page.evaluate(() => {
      // Deterministic PRNG seed (Park-Miller LCG)
      let s = 123456789;
      Math.random = () => {
        s = (s * 1664525 + 1013904223) % 4294967296;
        return s / 4294967296;
      };

      // Fixed timestamp (2026-11-05T00:00:00.000Z)
      const FIXED_TIME = 1793836800000;
      Date.now = () => FIXED_TIME;

      // Pause document Web Animations if available
      if (typeof document.getAnimations === 'function') {
        const anims = document.getAnimations();
        for (const anim of anims) {
          try {
            anim.pause();
            anim.currentTime = 0;
          } catch (_) {}
        }
      }
    }).catch(() => {});
  }

  // 3. CDP Animation freeze if available
  if (cdpSession && typeof cdpSession.send === 'function') {
    try {
      await cdpSession.send('Animation.setPlaybackRate', { playbackRate: 0 });
    } catch (_) {}
  }
}

/**
 * Executes visual capture matrix using a single page instance.
 * Supports standard v2.6 mode (4 viewports x 6 states) and canonical Pareto v3 mode.
 * 
 * @param {object} page Playwright Page object or MockPage
 * @param {object} [options={}]
 * @param {boolean} [options.canonical=false] Use canonical Pareto v3 matrix (3 VP x 2 schemes x states)
 * @param {Array<object>} [options.viewports] Custom viewports override
 * @param {Array<string>} [options.colorSchemes] Custom color schemes override
 * @param {Array<string>} [options.states] Custom states override
 * @param {string} [options.url] Target URL to inspect
 * @param {object} [options.cdpSession] CDP session for animation freezing
 * @param {Function} [options.onCapture] Callback for each captured frame
 * @returns {Promise<{ url: string, htmlSha256: string, totalCaptures: number, timestamp: string, captures: Array<object>, consoleErrors: Array<string>, pageErrors: Array<string>, zeroToleranceFailed: boolean, matrixMode: string }>}
 */
async function captureVisualMatrix(page, options = {}) {
  if (!page) {
    throw new Error('Page instance is required for captureVisualMatrix');
  }

  const url = options.url || 'http://localhost:4000';
  const isCanonical = Boolean(options.canonical);

  const viewports = options.viewports || (isCanonical ? CANONICAL_VIEWPORTS : VIEWPORTS);
  const colorSchemes = options.colorSchemes || (isCanonical ? CANONICAL_COLOR_SCHEMES : [null]);
  const states = options.states || (isCanonical ? CANONICAL_STATES : CAPTURE_STATES);

  const consoleErrors = [];
  const pageErrors = [];

  // Register error listeners
  if (typeof page.on === 'function') {
    page.on('console', (msg) => {
      try {
        const type = typeof msg.type === 'function' ? msg.type() : msg.type;
        const text = typeof msg.text === 'function' ? msg.text() : String(msg);
        if (type === 'error') {
          consoleErrors.push(text);
        }
      } catch (_) {}
    });

    page.on('pageerror', (err) => {
      try {
        const msg = err?.message || String(err);
        pageErrors.push(msg);
      } catch (_) {}
    });
  }

  // Freeze deterministic time
  await freezeDeterministicTime(page, options.cdpSession);

  // Compute rendered HTML SHA-256
  let html = '';
  if (typeof page.content === 'function') {
    try {
      html = await page.content();
    } catch (_) {
      html = '';
    }
  } else if (typeof options.html === 'string') {
    html = options.html;
  }
  const htmlSha256 = crypto.createHash('sha256').update(html || 'empty').digest('hex');

  const captures = [];

  for (const vp of viewports) {
    // 1. Resize single page viewport in memory
    if (typeof page.setViewportSize === 'function') {
      await page.setViewportSize({ width: vp.width, height: vp.height });
    }

    for (const scheme of colorSchemes) {
      if (scheme && typeof page.emulateMedia === 'function') {
        await page.emulateMedia({ colorScheme: scheme });
      }

      for (const state of states) {
        // 2. Apply deterministic state
        await applyState(page, state, vp);

        // 3. Capture frame buffer
        let buffer;
        if (typeof page.screenshot === 'function') {
          buffer = await page.screenshot({ type: 'png' });
        } else {
          buffer = Buffer.from(`mock_screenshot_${vp.id}_${scheme || 'default'}_${state}_${url}`);
        }

        const hash = crypto.createHash('sha256').update(buffer).digest('hex');
        const captureId = scheme
          ? `capture_${vp.id}_${scheme}_${state}`
          : `capture_${vp.id}_${state}`;

        const entry = {
          id: captureId,
          viewport: vp,
          colorScheme: scheme || 'default',
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
  }

  const zeroToleranceFailed = consoleErrors.length > 0 || pageErrors.length > 0;

  return {
    url,
    htmlSha256,
    totalCaptures: captures.length,
    timestamp: new Date().toISOString(),
    captures,
    consoleErrors,
    pageErrors,
    zeroToleranceFailed,
    matrixMode: isCanonical ? 'canonical-pareto-v3' : 'standard-v2.6'
  };
}

/**
 * Convenience helper to run canonical Pareto v3 visual matrix
 */
async function captureCanonicalVisualMatrix(page, options = {}) {
  return captureVisualMatrix(page, { ...options, canonical: true });
}

async function applyState(page, state, vp) {
  if (typeof page.evaluate !== 'function') return;

  switch (state) {
    case 'top':
    case 'fold-0':
      await page.evaluate(() => window.scrollTo(0, 0));
      break;

    case 'middle':
    case 'mid-scroll':
      await page.evaluate(() => {
        const maxScroll = (document.body ? document.body.scrollHeight : 1000) - window.innerHeight;
        window.scrollTo(0, Math.max(0, maxScroll * 0.5));
      });
      break;

    case 'bottom':
      await page.evaluate(() => {
        const bottomY = document.body ? document.body.scrollHeight : 1000;
        window.scrollTo(0, bottomY);
      });
      break;

    case 'hover':
      await page.evaluate(() => {
        const primaryCta = document.querySelector('button.primary, a.cta, [data-kinetic-slot="cta"], button, a[href]');
        if (primaryCta) {
          primaryCta.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
          primaryCta.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        }
      });
      break;

    case 'focus':
      await page.evaluate(() => {
        const firstInputOrBtn = document.querySelector('input:not([type="hidden"]), select, textarea, button, a[href]');
        if (firstInputOrBtn && typeof firstInputOrBtn.focus === 'function') {
          firstInputOrBtn.focus();
        }
      });
      break;

    case 'menu-open':
      await page.evaluate(() => {
        const menuBtn = document.querySelector('[data-menu-toggle], button.menu, nav button');
        if (menuBtn && typeof menuBtn.click === 'function') {
          menuBtn.click();
        } else {
          document.body?.setAttribute('data-menu-state', 'open');
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
  CANONICAL_VIEWPORTS,
  CANONICAL_COLOR_SCHEMES,
  CAPTURE_STATES,
  CANONICAL_STATES,
  freezeDeterministicTime,
  captureVisualMatrix,
  captureCanonicalVisualMatrix
};
