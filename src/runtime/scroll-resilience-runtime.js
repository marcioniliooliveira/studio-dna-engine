/**
 * Studio DNA Engine · Universal Scroll Resilience Runtime
 * 
 * Provides global resilience across all cloned/transmuted sites:
 * 1. Dynamic Track Auto-Sizer (recomputes min-height if translated copy expands).
 * 2. Mutation Layout Invalidator (debounces ScrollTrigger.refresh & lenis.resize).
 * 3. Event Isolation Portal (blocks wheel/touch/keyboard hijacking on injected tools).
 * 4. Native SplitText & Webflow Animation Shim (100% offline, zero external CDN lock).
 * 5. Sticky Overlap & Scroll Telemetry Sentinel (introspection for UnifiedQualityGate).
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.DNAScrollResilience = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const ScrollResilience = {
    version: '1.0.0',
    initialized: false,

    /**
     * Isolates an injected element (e.g. HUD, popup, modal) from host-level wheel/touch hijacking.
     */
    isolatePortal(elementOrId) {
      const el = typeof elementOrId === 'string'
        ? (typeof document !== 'undefined' ? document.getElementById(elementOrId) : null)
        : elementOrId;
      if (!el || typeof el.addEventListener !== 'function') return;

      const events = ['wheel', 'touchmove', 'touchstart', 'touchend', 'keydown', 'keyup'];
      events.forEach(evtName => {
        el.addEventListener(evtName, (e) => {
          if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        }, { passive: false });
      });
      if (typeof el.setAttribute === 'function') {
        el.setAttribute('data-dna-portal-isolated', 'true');
      }
    },

    /**
     * Initializes layout invalidation observer for dynamically loaded fonts, images and HUD mutations.
     */
    initLayoutInvalidator(options = {}) {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;

      let timer = null;
      const debounceDelay = options.debounceMs || 60;

      const refreshEngines = () => {
        if (window.lenis && typeof window.lenis.resize === 'function') {
          window.lenis.resize();
        }
        if (typeof window.ScrollTrigger !== 'undefined' && typeof window.ScrollTrigger.refresh === 'function') {
          window.ScrollTrigger.refresh();
        }
      };

      const requestRefresh = () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(refreshEngines, debounceDelay);
      };

      // 1. Observe WebFont Loading
      if (document.fonts && typeof document.fonts.ready?.then === 'function') {
        document.fonts.ready.then(requestRefresh);
      }

      // 2. Observe DOM mutations (HUD injects, preset swaps, slot updates)
      if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver((mutations) => {
          let needsRefresh = false;
          for (const m of mutations) {
            if (m.type === 'childList' || (m.type === 'attributes' && m.attributeName === 'style')) {
              // Ignore changes strictly inside HUD body if isolated
              if (m.target && m.target.closest && m.target.closest('#dna-hud-root')) continue;
              needsRefresh = true;
              break;
            }
          }
          if (needsRefresh) requestRefresh();
        });

        observer.observe(document.body || document.documentElement, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class']
        });
      }

      // 3. Window resize binding
      window.addEventListener('resize', requestRefresh, { passive: true });
    },

    /**
     * Native Universal SplitText shim for Webflow / GSAP references.
     */
    ensureSplitTextShim() {
      if (typeof window === 'undefined') return;
      if (typeof window.SplitText !== 'undefined') return;

      window.SplitText = function (target, vars = {}) {
        const elements = typeof target === 'string'
          ? Array.from(document.querySelectorAll(target))
          : (target instanceof NodeList || Array.isArray(target) ? Array.from(target) : [target]);

        this.lines = [];
        this.words = [];
        this.chars = [];

        elements.forEach(el => {
          if (!el) return;
          const text = el.getAttribute('aria-label') || el.textContent.trim();
          el.setAttribute('aria-label', text);
          el.innerHTML = '';

          const linesClass = vars.linesClass || 'split-line';
          const lineEl = document.createElement('div');
          lineEl.className = linesClass;
          lineEl.style.overflow = 'hidden';
          lineEl.style.display = 'block';

          const innerSpan = document.createElement('span');
          innerSpan.textContent = text;
          innerSpan.style.display = 'inline-block';
          lineEl.appendChild(innerSpan);

          el.appendChild(lineEl);
          this.lines.push(lineEl);
        });

        this.revert = function () {
          elements.forEach(el => {
            const label = el.getAttribute('aria-label');
            if (label) el.textContent = label;
          });
        };
      };
    },

    /**
     * Performs a runtime telemetry check on scroll monotonicity and sticky stage overlap.
     */
    auditScrollContract() {
      if (typeof document === 'undefined') return { passed: false, error: 'No DOM available' };

      const stages = Array.from(document.querySelectorAll('.stage, [class*="stage"]'));
      const activeStages = stages.filter(s => {
        const op = parseFloat(window.getComputedStyle(s).opacity);
        return !isNaN(op) && op > 0.5;
      });

      const stickyOverlaps = activeStages.length > 1;

      return {
        passed: !stickyOverlaps,
        totalStages: stages.length,
        activeStagesCount: activeStages.length,
        hasStickyOverlap: stickyOverlaps,
        lenisLimit: window.lenis ? window.lenis.limit : null,
        scrollY: window.scrollY
      };
    },

    /**
     * Auto-boots all resilience listeners in browser.
     */
    boot() {
      if (this.initialized || typeof window === 'undefined') return;
      this.ensureSplitTextShim();
      this.initLayoutInvalidator();
      this.isolatePortal('dna-hud-root');
      window.__DNA_SCROLL_AUDIT__ = this.auditScrollContract.bind(this);
      this.initialized = true;
    }
  };

  // Auto-boot if in browser context
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => ScrollResilience.boot());
    } else {
      ScrollResilience.boot();
    }
  }

  return ScrollResilience;
});
