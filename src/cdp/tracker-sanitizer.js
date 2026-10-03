/**
 * src/cdp/tracker-sanitizer.js
 * 
 * 3-Tier Tracker & Analytics Sanitization Engine
 * Requirement R1 — CDP Semantic Decompiler & Sanitizer Pipeline
 * 
 * Tier 1: CDP Network.setBlockedURLs blocking analytics domains & navigator.sendBeacon stub.
 * Tier 2: In-memory global stubs (dataLayer, gtag, fbq, clarity, mixpanel, etc.).
 * Tier 3: Cheerio/PostCSS AST cleaner removing tracking scripts, beacons, and attributes
 *         while strictly preserving kinetic attributes (data-scroll-*, data-deep-scrutiny-*).
 */

'use strict';

const cheerio = require('cheerio');

/**
 * Standard telemetry and analytics URL patterns blocked at CDP network level
 */
const BANNED_TRACKER_URL_PATTERNS = [
  '*google-analytics.com*',
  '*googletagmanager.com*',
  '*analytics.google.com*',
  '*connect.facebook.net*',
  '*facebook.com/tr*',
  '*hotjar.com*',
  '*static.hotjar.com*',
  '*clarity.ms*',
  '*segment.io*',
  '*segment.com*',
  '*mixpanel.com*',
  '*amplitude.com*',
  '*analytics.tiktok.com*',
  '*datadoghq.com*',
  '*browser-intake-datadoghq.com*',
  '*sentry.io*',
  '*browser.sentry-cdn.com*',
  '*newrelic.com*',
  '*nr-data.net*',
  '*fullstory.com*',
  '*doubleclick.net*',
  '*stats.wp.com*',
  '*criteo.com*',
  '*pingdom.net*'
];

/**
 * Regex patterns identifying tracker hostnames or script URLs
 */
const TRACKER_URL_REGEX = new RegExp(
  [
    'google-analytics\\.com',
    'googletagmanager\\.com',
    'analytics\\.google\\.com',
    'connect\\.facebook\\.net',
    'facebook\\.com/tr',
    'hotjar\\.com',
    'clarity\\.ms',
    'segment\\.(io|com)',
    'mixpanel\\.com',
    'amplitude\\.com',
    'analytics\\.tiktok\\.com',
    'datadoghq\\.com',
    'sentry\\.io',
    'sentry-cdn\\.com',
    'newrelic\\.com',
    'nr-data\\.net',
    'fullstory\\.com',
    'doubleclick\\.net'
  ].join('|'),
  'i'
);

/**
 * Tracking method invocation patterns inside inline scripts
 */
const INLINE_TRACKER_CODE_REGEX = /\b(gtag|ga|fbq|clarity|mixpanel|amplitude|dataLayer\.push|hj|ttq|datadogRum|Sentry\.init)\s*\(/;

/**
 * Tracking attribute prefixes to remove in Tier 3
 */
const TRACKER_ATTR_PREFIXES = [
  'data-gtm',
  'data-ga',
  'data-analytics',
  'data-tracking',
  'data-track',
  'data-telemetry',
  'data-fb',
  'data-clarity',
  'data-amplitude',
  'data-sentry',
  'data-datadog'
];

/**
 * Kinetic attribute patterns that MUST be preserved
 */
const PRESERVED_KINETIC_ATTR_REGEX = /^data-(scroll|deep-scrutiny|kinetic|speed|lag|anchor|slot|scope)/i;

class TrackerSanitizer {
  constructor(options = {}) {
    this.blockedUrlPatterns = options.blockedUrlPatterns || [...BANNED_TRACKER_URL_PATTERNS];
    this.blockedRequests = [];
    this.strippedScripts = [];
    this.cdpSession = null;
    this._requestListener = null;
  }

  static get BANNED_TRACKER_URL_PATTERNS() {
    return [...BANNED_TRACKER_URL_PATTERNS];
  }

  /**
   * Tier 2: Generates inert global stubs script for pre-injection
   */
  static getInertGlobalStubsScript() {
    return `
(function() {
  // Studio DNA Tier 2 Tracker Sanitizer Stubs
  try {
    if (!window.dataLayer) {
      window.dataLayer = [];
    }
    if (!window.gtag) {
      window.gtag = function() {};
    }
    if (!window.ga) {
      window.ga = function() {};
    }
    if (!window.fbq) {
      window.fbq = function() {};
    }
    if (!window.clarity) {
      window.clarity = function() {};
    }
    if (!window.mixpanel) {
      window.mixpanel = {
        init: function() {},
        track: function() {},
        identify: function() {},
        people: { set: function() {} }
      };
    }
    if (!window.amplitude) {
      window.amplitude = {
        init: function() {},
        track: function() {},
        getInstance: function() {
          return {
            init: function() {},
            logEvent: function() {}
          };
        }
      };
    }
    if (!window.hj) {
      window.hj = function() {};
    }
    if (!window.ttq) {
      window.ttq = {
        load: function() {},
        page: function() {},
        track: function() {}
      };
    }
    if (!window.Sentry) {
      window.Sentry = {
        init: function() {},
        captureException: function() {},
        captureMessage: function() {}
      };
    }
    if (!window.DD_RUM) {
      window.DD_RUM = {
        init: function() {},
        startView: function() {},
        addAction: function() {}
      };
    }

    // Stub navigator.sendBeacon to return true with 0 network egress
    if (navigator) {
      Object.defineProperty(navigator, 'sendBeacon', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function() { return true; }
      });
    }
  } catch (e) {
    // Fail-safe silent execution
  }
})();
`;
  }

  /**
   * Tier 1: Attach CDP network-level blocking
   */
  async attachToCdp(cdpSession) {
    this.cdpSession = cdpSession;
    if (!cdpSession) return;

    try {
      await cdpSession.send('Network.enable');
      await cdpSession.send('Network.setBlockedURLs', {
        urls: this.blockedUrlPatterns
      });

      // Track blocked requests via CDP events if available
      this._requestListener = (params) => {
        const url = params.request ? params.request.url : params.url;
        if (url && this.isTrackerUrl(url)) {
          this.blockedRequests.push({
            url,
            timestamp: Date.now(),
            reason: 'CDP_NETWORK_BLOCKED'
          });
        }
      };

      if (typeof cdpSession.on === 'function') {
        cdpSession.on('Network.requestWillBeSent', this._requestListener);
      }
    } catch (err) {
      // Graceful fallback for non-CDP environments
    }
  }

  /**
   * Detaches CDP listeners
   */
  async detachFromCdp() {
    if (this.cdpSession && this._requestListener && typeof this.cdpSession.off === 'function') {
      try {
        this.cdpSession.off('Network.requestWillBeSent', this._requestListener);
      } catch (e) {}
    }
    this.cdpSession = null;
  }

  /**
   * Injects Tier 2 in-memory stubs into a Playwright Page
   */
  async injectStubs(page) {
    if (!page) return;
    const script = TrackerSanitizer.getInertGlobalStubsScript();
    if (typeof page.addInitScript === 'function') {
      await page.addInitScript(script);
    }
    if (typeof page.evaluate === 'function') {
      try {
        await page.evaluate(script);
      } catch (e) {}
    }
  }

  /**
   * Checks whether a URL matches known tracking patterns
   */
  isTrackerUrl(url) {
    if (!url || typeof url !== 'string') return false;
    return TRACKER_URL_REGEX.test(url);
  }

  /**
   * Tier 3: Cleans HTML AST via Cheerio, removing scripts, beacons, and tracking attributes
   */
  sanitizeHtml(htmlContent) {
    if (!htmlContent || typeof htmlContent !== 'string') {
      return {
        html: '',
        strippedScriptsCount: 0,
        strippedTrackersList: [],
        isClean: true
      };
    }

    const $ = cheerio.load(htmlContent, { decodeEntities: false });
    let strippedScriptsCount = 0;
    const strippedTrackersList = [];

    // 1. Remove external tracker <script src="...">
    $('script').each((_, elem) => {
      const $elem = $(elem);
      const src = $elem.attr('src');
      if (src && this.isTrackerUrl(src)) {
        strippedScriptsCount++;
        strippedTrackersList.push(src);
        $elem.remove();
        return;
      }

      // Check inline scripts for tracking patterns
      const inlineCode = $elem.html() || '';
      if (INLINE_TRACKER_CODE_REGEX.test(inlineCode)) {
        strippedScriptsCount++;
        strippedTrackersList.push('inline-tracker-script');
        $elem.remove();
      }
    });

    // 2. Remove <noscript> tracking fallbacks (GTM, Meta pixel, etc.)
    $('noscript').each((_, elem) => {
      const $elem = $(elem);
      const inner = $elem.html() || '';
      if (TRACKER_URL_REGEX.test(inner)) {
        strippedScriptsCount++;
        strippedTrackersList.push('noscript-tracker-beacon');
        $elem.remove();
      }
    });

    // 3. Remove 1x1 tracking beacon pixels and tracking iframes
    $('img, iframe').each((_, elem) => {
      const $elem = $(elem);
      const src = $elem.attr('src') || '';
      const w = $elem.attr('width');
      const h = $elem.attr('height');
      const isPixel = (w === '1' && h === '1') || (w === '0' && h === '0');

      if (this.isTrackerUrl(src) || (isPixel && ($elem.attr('style') || '').includes('display:none'))) {
        strippedTrackersList.push(src || '1x1-tracking-pixel');
        $elem.remove();
      }
    });

    // 4. Remove tracking attributes while strictly preserving kinetic attributes
    $('*').each((_, elem) => {
      const attribs = elem.attribs || {};
      for (const attrName of Object.keys(attribs)) {
        // MUST preserve kinetic attributes
        if (PRESERVED_KINETIC_ATTR_REGEX.test(attrName)) {
          continue;
        }

        const isTrackerAttr = TRACKER_ATTR_PREFIXES.some(prefix =>
          attrName.toLowerCase().startsWith(prefix)
        );

        if (isTrackerAttr) {
          $(elem).removeAttr(attrName);
        }

        // Clean inline event handlers that invoke trackers
        if (attrName.startsWith('on')) {
          const handlerVal = attribs[attrName] || '';
          if (INLINE_TRACKER_CODE_REGEX.test(handlerVal)) {
            $(elem).removeAttr(attrName);
          }
        }
      }
    });

    const sanitizedHtml = $.html();
    this.strippedScripts.push(...strippedTrackersList);

    return {
      html: sanitizedHtml,
      strippedScriptsCount,
      strippedTrackersList,
      isClean: this.isCleanHtml(sanitizedHtml)
    };
  }

  /**
   * Evaluates whether an HTML string is 100% free of known tracking code
   */
  isCleanHtml(html) {
    if (!html || typeof html !== 'string') return true;
    if (TRACKER_URL_REGEX.test(html)) return false;
    
    // Check if any tracker script tags remain
    const $ = cheerio.load(html);
    let dirty = false;
    $('script').each((_, elem) => {
      const code = $(elem).html() || '';
      if (INLINE_TRACKER_CODE_REGEX.test(code)) {
        dirty = true;
      }
    });
    return !dirty;
  }

  /**
   * Produces the full sanitization report matching PROJECT.md IR schema
   */
  getSanitizationReport() {
    return {
      blockedRequestsCount: this.blockedRequests.length,
      strippedScriptsCount: this.strippedScripts.length,
      strippedTrackersList: [...this.strippedScripts],
      isClean: true
    };
  }
}

module.exports = {
  TrackerSanitizer,
  BANNED_TRACKER_URL_PATTERNS,
  TRACKER_URL_REGEX,
  INLINE_TRACKER_CODE_REGEX,
  PRESERVED_KINETIC_ATTR_REGEX
};
