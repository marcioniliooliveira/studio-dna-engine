/**
 * src/cdp/semantic-skeleton-normalizer.js
 * 
 * Semantic Skeleton Normalizer
 * Requirement R1 — CDP Semantic Decompiler & Sanitizer Pipeline
 * 
 * Normalizes cloned DOM:
 * 1. Unmasks SplitText fragmented lines/words/chars into clean semantic markup.
 * 2. Removes full-screen preloader curtain traps that freeze content display.
 * 3. Neutralizes hostile overflow: hidden / clip on sticky scroll ancestors.
 * 4. Localizes remote CDN assets (images, fonts, 3D models, importmaps) to relative paths.
 * 5. Configures video streaming attributes (playsinline, muted, preload).
 */

'use strict';

const cheerio = require('cheerio');
const path = require('node:path');

const PRELOADER_SELECTORS = [
  '.preloader',
  '.page-loader',
  '.loading-screen',
  '.loader-curtain',
  '.curtain',
  '.page-transition-curtain',
  '.preloader-screen',
  '.loader-wrapper',
  '[data-preloader]',
  '[data-curtain]'
];

const SPLIT_TEXT_CLASSES = [
  'split-line',
  'split-word',
  'split-char',
  'line-wrapper',
  'char-wrapper',
  'word-wrapper',
  'split-parent',
  'split-child'
];

class SemanticSkeletonNormalizer {
  /**
   * Normalizes an HTML string using Cheerio AST operations
   */
  static normalizeHtml(htmlContent, options = {}) {
    if (!htmlContent || typeof htmlContent !== 'string') {
      return {
        html: '',
        report: {
          unmaskedSplitTextCount: 0,
          removedPreloadersCount: 0,
          neutralizedOverflowCount: 0,
          localizedAssetsCount: 0,
          configuredVideosCount: 0
        }
      };
    }

    const $ = cheerio.load(htmlContent, { decodeEntities: false });

    let unmaskedSplitTextCount = 0;
    let removedPreloadersCount = 0;
    let neutralizedOverflowCount = 0;
    let localizedAssetsCount = 0;
    let configuredVideosCount = 0;

    // -------------------------------------------------------------
    // 1. Unmask SplitText Lines, Words & Characters
    // -------------------------------------------------------------
    const splitSelector = SPLIT_TEXT_CLASSES.map(cls => `.${cls}`).join(', ') + ', [data-split-text]';
    const processedSplitParents = new Set();

    $(splitSelector).each((_, elem) => {
      const $elem = $(elem);
      const $parent = $elem.closest('h1, h2, h3, h4, h5, h6, p, [data-kinetic-slot], blockquote');
      
      const targetContainer = $parent.length > 0 ? $parent : $elem.parent();
      const rawTarget = targetContainer[0];

      if (rawTarget && !processedSplitParents.has(rawTarget)) {
        processedSplitParents.add(rawTarget);

        // Intelligently extract reconstructed text
        let cleanText = '';
        const $words = targetContainer.find('.split-word, .word-wrapper, .word');
        if ($words.length > 0) {
          const wordsList = [];
          $words.each((__, w) => {
            const $chars = $(w).find('.split-char, .char-wrapper, .char');
            if ($chars.length > 0) {
              let wText = '';
              $chars.each((___, c) => {
                wText += $(c).text().trim();
              });
              if (wText) wordsList.push(wText);
            } else {
              const wt = $(w).text().trim();
              if (wt) wordsList.push(wt);
            }
          });
          cleanText = wordsList.join(' ');
        } else {
          const $chars = targetContainer.find('.split-char, .char-wrapper, .char');
          if ($chars.length > 0) {
            let chText = '';
            $chars.each((__, c) => {
              const raw = $(c).text();
              chText += raw === ' ' ? ' ' : raw.trim();
            });
            cleanText = chText.replace(/\s+/g, ' ').trim();
          } else {
            cleanText = targetContainer.text().replace(/\s+/g, ' ').trim();
          }
        }

        if (cleanText) {
          targetContainer.empty();
          targetContainer.text(cleanText);

          // Clear masking and hostile inline styles
          const currentStyle = targetContainer.attr('style') || '';
          const cleanedStyle = currentStyle
            .replace(/clip-path:[^;]+;?/gi, '')
            .replace(/overflow:\s*(hidden|clip);?/gi, '')
            .replace(/opacity:\s*0(\.0+)?;?/gi, 'opacity: 1;')
            .replace(/visibility:\s*hidden;?/gi, 'visibility: visible;')
            .trim();

          if (cleanedStyle) {
            targetContainer.attr('style', cleanedStyle);
          } else {
            targetContainer.removeAttr('style');
          }

          unmaskedSplitTextCount++;
        }
      }
    });

    // -------------------------------------------------------------
    // 2. Remove Preloader Curtain Traps
    // -------------------------------------------------------------
    for (const selector of PRELOADER_SELECTORS) {
      $(selector).each((_, elem) => {
        $(elem).remove();
        removedPreloadersCount++;
      });
    }

    // Check fixed full-screen overlay curtains
    $('div, section').each((_, elem) => {
      const $elem = $(elem);
      const style = ($elem.attr('style') || '').toLowerCase();
      const isFixed = style.includes('position: fixed') || style.includes('position:fixed');
      const isFullScreen = (
        (style.includes('inset: 0') || style.includes('inset:0')) ||
        (style.includes('width: 100vw') && style.includes('height: 100vh')) ||
        (style.includes('width: 100%') && style.includes('height: 100%'))
      );
      const hasHighZ = /z-index:\s*(999|9999|10000|\d{4,})/i.test(style);

      const isContentStage = $elem.is('[data-kinetic-stage], .kinetic-stage, main, header, footer');

      if (isFixed && isFullScreen && hasHighZ && !isContentStage) {
        $elem.remove();
        removedPreloadersCount++;
      }
    });

    // -------------------------------------------------------------
    // 3. Neutralize Hostile overflow: hidden on Sticky Ancestors
    // -------------------------------------------------------------
    const stickySelector = '[style*="sticky"], .sticky, [data-sticky], [data-scroll-section], [data-kinetic-stage], .kinetic-stage, .canvas-stage-wrapper';

    $(stickySelector).each((_, elem) => {
      let current = $(elem).parent();
      while (current.length > 0 && current[0].tagName !== 'html') {
        const style = current.attr('style') || '';
        if (/overflow(-[xy])?:\s*(hidden|clip)/i.test(style)) {
          const neutralized = style
            .replace(/overflow:\s*(hidden|clip)/gi, 'overflow: visible')
            .replace(/overflow-x:\s*(hidden|clip)/gi, 'overflow-x: visible')
            .replace(/overflow-y:\s*(hidden|clip)/gi, 'overflow-y: visible');
          current.attr('style', neutralized);
          neutralizedOverflowCount++;
        }

        const classes = (current.attr('class') || '').split(/\s+/);
        if (classes.includes('overflow-hidden')) {
          current.removeClass('overflow-hidden');
          current.addClass('overflow-visible');
          neutralizedOverflowCount++;
        }

        current = current.parent();
      }
    });

    // -------------------------------------------------------------
    // 4. Localize Remote CDN Assets to Relative Paths
    // -------------------------------------------------------------
    const assetPrefix = options.assetPrefix || './assets/';

    function localizeUrl(url) {
      if (!url || typeof url !== 'string') return url;
      if (url.startsWith('data:') || url.startsWith('blob:') || url.startsWith('#') || url.startsWith('javascript:')) {
        return url;
      }
      if (/^https?:\/\/|^\/\//i.test(url)) {
        try {
          const parsed = new URL(url.startsWith('//') ? 'https:' + url : url);
          const baseName = path.basename(parsed.pathname) || 'asset';
          return `${assetPrefix}${baseName}`;
        } catch (e) {
          const sanitized = url.split('/').pop().split('?')[0] || 'asset';
          return `${assetPrefix}${sanitized}`;
        }
      }
      return url;
    }

    // Localize img src & srcset
    $('img').each((_, elem) => {
      const $elem = $(elem);
      const src = $elem.attr('src');
      if (src && /^https?:\/\/|^\/\//i.test(src)) {
        $elem.attr('src', localizeUrl(src));
        localizedAssetsCount++;
      }

      const srcset = $elem.attr('srcset');
      if (srcset && (srcset.includes('http://') || srcset.includes('https://'))) {
        const localizedSrcset = srcset.split(',').map(entry => {
          const parts = entry.trim().split(/\s+/);
          parts[0] = localizeUrl(parts[0]);
          return parts.join(' ');
        }).join(', ');
        $elem.attr('srcset', localizedSrcset);
        localizedAssetsCount++;
      }
    });

    // Localize link stylesheet and font hrefs
    $('link[rel="stylesheet"], link[rel="preload"]').each((_, elem) => {
      const $elem = $(elem);
      const href = $elem.attr('href');
      if (href && /^https?:\/\/|^\/\//i.test(href)) {
        $elem.attr('href', localizeUrl(href));
        localizedAssetsCount++;
      }
    });

    // Localize <script type="importmap">
    $('script[type="importmap"]').each((_, elem) => {
      const $elem = $(elem);
      const content = $elem.html();
      try {
        const parsed = JSON.parse(content.trim());
        if (parsed.imports && typeof parsed.imports === 'object') {
          for (const [key, val] of Object.entries(parsed.imports)) {
            if (typeof val === 'string' && /^https?:\/\/|^\/\//i.test(val)) {
              parsed.imports[key] = `./assets/vendor/${path.basename(val)}`;
              localizedAssetsCount++;
            }
          }
          $elem.text(JSON.stringify(parsed, null, 2));
        }
      } catch (e) {}
    });

    // Localize inline style background-image urls
    $('[style*="url("]').each((_, elem) => {
      const $elem = $(elem);
      const style = $elem.attr('style') || '';
      const rewritten = style.replace(/url\((['"]?)(https?:\/\/[^)'"]+)\1\)/gi, (match, quote, remoteUrl) => {
        localizedAssetsCount++;
        return `url(${quote}${localizeUrl(remoteUrl)}${quote})`;
      });
      $elem.attr('style', rewritten);
    });

    // -------------------------------------------------------------
    // 5. Configure Video Streaming Attributes
    // -------------------------------------------------------------
    $('video').each((_, elem) => {
      const $elem = $(elem);
      $elem.attr('playsinline', '');
      $elem.attr('muted', '');
      if (!$elem.attr('preload')) {
        $elem.attr('preload', 'metadata');
      }

      const src = $elem.attr('src');
      if (src && /^https?:\/\/|^\/\//i.test(src)) {
        $elem.attr('src', localizeUrl(src));
        localizedAssetsCount++;
      }

      $elem.find('source').each((__, sElem) => {
        const $sElem = $(sElem);
        const sSrc = $sElem.attr('src');
        if (sSrc && /^https?:\/\/|^\/\//i.test(sSrc)) {
          $sElem.attr('src', localizeUrl(sSrc));
          localizedAssetsCount++;
        }
      });

      configuredVideosCount++;
    });

    return {
      html: $.html(),
      report: {
        unmaskedSplitTextCount,
        removedPreloadersCount,
        neutralizedOverflowCount,
        localizedAssetsCount,
        configuredVideosCount
      }
    };
  }

  /**
   * Normalizes an active page within a browser session
   */
  static async normalizePage(page, options = {}) {
    if (!page || typeof page.content !== 'function') {
      return { html: '', report: {} };
    }

    const currentHtml = await page.content();
    const result = SemanticSkeletonNormalizer.normalizeHtml(currentHtml, options);
    
    await page.evaluate(() => {
      const preloaders = document.querySelectorAll('.preloader, .page-loader, .curtain, [data-preloader]');
      preloaders.forEach(el => el.remove());

      const stickyEls = document.querySelectorAll('[style*="sticky"], .sticky, [data-sticky]');
      stickyEls.forEach(el => {
        let parent = el.parentElement;
        while (parent && parent !== document.documentElement) {
          const computed = window.getComputedStyle(parent);
          if (computed.overflow === 'hidden' || computed.overflowX === 'hidden' || computed.overflowY === 'hidden') {
            parent.style.overflow = 'visible';
          }
          parent = parent.parentElement;
        }
      });

      const videos = document.querySelectorAll('video');
      videos.forEach(v => {
        v.playsInline = true;
        v.muted = true;
      });
    }).catch(() => {});

    return result;
  }

  /**
   * Precompiles text elements into static SplitText wrappers (.gsap_split_word, .gsap_split_char)
   */
  static precompileSplitText(htmlContent, selector = '.hero-display-text-1, .hero-display-text-2, [data-split-chars]') {
    if (!htmlContent || typeof htmlContent !== 'string') return htmlContent;
    const $ = cheerio.load(htmlContent, { decodeEntities: false });

    $(selector).each((_, elem) => {
      const $elem = $(elem);
      if ($elem.find('.gsap_split_char').length > 0) return;
      const text = $elem.text().trim();
      if (!text) return;

      const words = text.split(/\s+/);
      const wordsHtml = words.map(word => {
        const charsHtml = Array.from(word).map(c =>
          `<span class="gsap_split_char" style="display: inline-block; opacity: 1;">${c}</span>`
        ).join('');
        return `<span class="gsap_split_word" style="overflow: hidden; display: inline-block;">${charsHtml}</span>`;
      }).join(' ');

      $elem.html(wordsHtml);
    });

    return $.html();
  }
}

module.exports = {
  SemanticSkeletonNormalizer
};
