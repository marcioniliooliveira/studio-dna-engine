/**
 * src/cdp/kinetic-timeline-interceptor.js
 * 
 * Kinetic Timeline Interceptor
 * Requirement R1 — CDP Semantic Decompiler & Sanitizer Pipeline
 * 
 * Interfaces directly with the Chrome DevTools Protocol (CDP) session:
 * 1. Coordinates Animation, DOM, CSS, Performance, and DOMDebugger domains.
 * 2. Captures CSS Animations, CSSTransitions, and WebAnimations with sub-pixel box models and easing.
 * 3. Supports deterministic time seeking via Animation.seekAnimations.
 * 4. Integrates RuntimeHookInjector for in-memory GSAP and WebGL camera extraction.
 * 5. Integrates TrackerSanitizer for 3-tier tracker elimination.
 * 6. Emits structured KineticTimelineIR conforming strictly to PROJECT.md contracts.
 */

'use strict';

const { TrackerSanitizer } = require('./tracker-sanitizer');
const { RuntimeHookInjector } = require('./runtime-hook-injector');

class KineticTimelineInterceptor {
  constructor(options = {}) {
    this.options = options;
    this.page = options.page || null;
    this.cdpSession = options.cdpSession || null;
    this.trackerSanitizer = options.trackerSanitizer || new TrackerSanitizer();
    this.capturedAnimations = new Map();
    this.performanceMetrics = {};
    this.activeDomains = new Set();
    this._animationCreatedHandler = null;
    this._animationStartedHandler = null;
    this._animationCanceledHandler = null;
  }

  /**
   * Attaches to a Playwright Page or CDP Session and enables required domains
   */
  async attach(pageOrSession) {
    if (!pageOrSession) {
      throw new Error('KineticTimelineInterceptor.attach requires a Playwright Page or CDPSession');
    }

    if (typeof pageOrSession.send === 'function') {
      // Direct CDPSession
      this.cdpSession = pageOrSession;
    } else if (pageOrSession.context && typeof pageOrSession.context().newCDPSession === 'function') {
      // Playwright Page
      this.page = pageOrSession;
      this.cdpSession = await pageOrSession.context().newCDPSession(pageOrSession);
    } else {
      this.page = pageOrSession;
    }

    // Initialize TrackerSanitizer with CDP
    if (this.cdpSession) {
      await this.trackerSanitizer.attachToCdp(this.cdpSession);
    }

    // Pre-inject runtime hooks for GSAP, RAF, and WebGL
    if (this.page || this.cdpSession) {
      await RuntimeHookInjector.inject(this.page, this.cdpSession);
      if (this.page) {
        await this.trackerSanitizer.injectStubs(this.page);
      }
    }

    // Enable coordinated CDP domains
    if (this.cdpSession && typeof this.cdpSession.send === 'function') {
      await this._enableCdpDomains();
      this._bindCdpAnimationListeners();
    }

    return this;
  }

  /**
   * Enables Animation, DOM, CSS, Performance, and DOMDebugger domains via CDP
   */
  async _enableCdpDomains() {
    const domains = ['Animation', 'DOM', 'CSS', 'Performance'];
    for (const domain of domains) {
      try {
        await this.cdpSession.send(`${domain}.enable`);
        this.activeDomains.add(domain);
      } catch (err) {
        // Log domain enablement issue if any
      }
    }

    try {
      await this.cdpSession.send('DOMDebugger.enable');
      this.activeDomains.add('DOMDebugger');
    } catch (e) {
      // DOMDebugger is optional
    }
  }

  /**
   * Binds event handlers for CDP Animation domain events
   */
  _bindCdpAnimationListeners() {
    if (!this.cdpSession || typeof this.cdpSession.on !== 'function') return;

    this._animationCreatedHandler = (params) => {
      if (params && params.id) {
        if (!this.capturedAnimations.has(params.id)) {
          this.capturedAnimations.set(params.id, {
            id: params.id,
            targetSelector: 'unknown',
            type: 'WebAnimation',
            durationMs: 0,
            delayMs: 0,
            easing: 'linear',
            keyframes: []
          });
        }
      }
    };

    this._animationStartedHandler = async (params) => {
      if (!params || !params.animation) return;
      const anim = params.animation;
      const source = anim.source || {};

      let targetSelector = 'unknown';
      if (source.backendNodeId && this.activeDomains.has('DOM')) {
        try {
          const desc = await this.cdpSession.send('DOM.describeNode', {
            backendNodeId: source.backendNodeId
          });
          if (desc && desc.node) {
            targetSelector = this._buildSelectorFromNode(desc.node);
          }
        } catch (e) {}
      }

      // Format keyframes
      const keyframes = [];
      if (source.keyframesRule && Array.isArray(source.keyframesRule.keyframes)) {
        for (const kf of source.keyframesRule.keyframes) {
          const props = {};
          if (kf.style && Array.isArray(kf.style.cssProperties)) {
            for (const p of kf.style.cssProperties) {
              props[p.name] = p.value;
            }
          }
          keyframes.push({
            offset: parseFloat(kf.offset) || 0,
            properties: props
          });
        }
      }

      // Map animation type
      let animType = 'WebAnimation';
      if (anim.type === 'CSSAnimation') animType = 'CSSAnimation';
      else if (anim.type === 'CSSTransition') animType = 'CSSTransition';

      this.capturedAnimations.set(anim.id, {
        id: anim.id,
        targetSelector,
        type: animType,
        durationMs: Math.round(source.duration || 0),
        delayMs: Math.round(source.delay || 0),
        easing: source.easing || 'linear',
        keyframes
      });
    };

    this._animationCanceledHandler = (params) => {
      // Keep record in map for historical telemetry
    };

    this.cdpSession.on('Animation.animationCreated', this._animationCreatedHandler);
    this.cdpSession.on('Animation.animationStarted', this._animationStartedHandler);
    this.cdpSession.on('Animation.animationCanceled', this._animationCanceledHandler);
  }

  /**
   * Helper: Builds a CSS selector from a CDP DOM Node descriptor
   */
  _buildSelectorFromNode(node) {
    if (!node) return 'unknown';
    const attrs = {};
    if (Array.isArray(node.attributes)) {
      for (let i = 0; i < node.attributes.length; i += 2) {
        attrs[node.attributes[i]] = node.attributes[i + 1];
      }
    }

    if (attrs.id) return `#${attrs.id}`;
    if (attrs['data-kinetic-slot']) return `[data-kinetic-slot="${attrs['data-kinetic-slot']}"]`;
    if (attrs.class) {
      const firstClass = attrs.class.trim().split(/\s+/)[0];
      if (firstClass) return `.${firstClass}`;
    }
    return (node.nodeName || 'unknown').toLowerCase();
  }

  /**
   * Seeks active animations to a specific time offset via CDP Animation.seekAnimations
   */
  async seekAnimations(animationIds, currentTimeMs) {
    if (!this.cdpSession) {
      throw new Error('CDP session not connected');
    }
    const ids = Array.isArray(animationIds) ? animationIds : [animationIds];
    return await this.cdpSession.send('Animation.seekAnimations', {
      animations: ids,
      currentTime: currentTimeMs
    });
  }

  /**
   * Reads performance metrics from the CDP Performance domain
   */
  async getPerformanceMetrics() {
    if (!this.cdpSession || !this.activeDomains.has('Performance')) {
      return {};
    }
    try {
      const res = await this.cdpSession.send('Performance.getMetrics');
      if (res && Array.isArray(res.metrics)) {
        const map = {};
        for (const m of res.metrics) {
          map[m.name] = m.value;
        }
        this.performanceMetrics = map;
        return map;
      }
    } catch (e) {}
    return {};
  }

  /**
   * Captures sub-pixel box model for a specific selector via DOM domain
   */
  async getBoxModel(selector) {
    if (!this.cdpSession || !this.activeDomains.has('DOM')) return null;
    try {
      const doc = await this.cdpSession.send('DOM.getDocument');
      const node = await this.cdpSession.send('DOM.querySelector', {
        nodeId: doc.root.nodeId,
        selector
      });
      if (node && node.nodeId) {
        const box = await this.cdpSession.send('DOM.getBoxModel', {
          nodeId: node.nodeId
        });
        return box.model;
      }
    } catch (e) {}
    return null;
  }

  /**
   * Extracts and compiles the complete KineticTimelineIR conforming to PROJECT.md
   */
  async extractKineticTimelineIR(sourceUrl = '') {
    const url = sourceUrl || (this.page ? this.page.url() : 'about:blank');

    // 1. Resolve Viewport & DPR
    let viewport = { width: 1440, height: 900, dpr: 1 };
    if (this.page) {
      try {
        const vp = this.page.viewportSize();
        const dpr = await this.page.evaluate(() => window.devicePixelRatio || 1);
        if (vp) {
          viewport = { width: vp.width, height: vp.height, dpr: dpr || 1 };
        }
      } catch (e) {}
    }

    // 2. Resolve CSS Animations (combine CDP captured events with in-page WAAPI inspection)
    const cssAnimations = Array.from(this.capturedAnimations.values());

    if (this.page) {
      try {
        const docAnimations = await this.page.evaluate(() => {
          if (typeof document.getAnimations !== 'function') return [];
          return document.getAnimations().map((anim, idx) => {
            const effect = anim.effect;
            const target = effect ? effect.target : null;
            let targetSelector = 'unknown';
            if (target) {
              if (target.id) targetSelector = '#' + target.id;
              else if (target.className && typeof target.className === 'string') {
                const first = target.className.trim().split(/\s+/)[0];
                targetSelector = first ? '.' + first : target.tagName.toLowerCase();
              } else if (target.tagName) {
                targetSelector = target.tagName.toLowerCase();
              }
            }

            const timing = effect && typeof effect.getTiming === 'function' ? effect.getTiming() : {};
            const keyframes = effect && typeof effect.getKeyframes === 'function' ? effect.getKeyframes() : [];

            let type = 'WebAnimation';
            if (anim.constructor && anim.constructor.name === 'CSSAnimation') type = 'CSSAnimation';
            else if (anim.constructor && anim.constructor.name === 'CSSTransition') type = 'CSSTransition';

            return {
              id: anim.id || `waapi-anim-${idx}`,
              targetSelector,
              type,
              durationMs: Math.round(timing.duration || 0),
              delayMs: Math.round(timing.delay || 0),
              easing: String(timing.easing || 'linear'),
              keyframes: keyframes.map(kf => ({
                offset: kf.offset !== null && kf.offset !== undefined ? Number(kf.offset) : 0,
                properties: { ...kf }
              }))
            };
          });
        });

        for (const anim of docAnimations) {
          if (!cssAnimations.some(existing => existing.id === anim.id || existing.targetSelector === anim.targetSelector)) {
            cssAnimations.push(anim);
          }
        }
      } catch (e) {}
    }

    // 3. Extract GSAP and WebGL telemetry from RuntimeHookInjector
    const runtimeData = this.page ? await RuntimeHookInjector.extractCapturedData(this.page) : {
      gsap: { timelines: [], scrollTriggers: [], tweens: [] },
      webgl: { rendersCount: 0, canvasSelector: 'canvas', cameraFov: 45, cameraSamples: [] }
    };

    // Construct gsapTimelines format per contract
    const gsapTimelines = [];
    if (runtimeData.gsap.scrollTriggers && runtimeData.gsap.scrollTriggers.length > 0) {
      for (const st of runtimeData.gsap.scrollTriggers) {
        gsapTimelines.push({
          triggerSelector: st.triggerSelector,
          startBound: st.startBound,
          endBound: st.endBound,
          scrub: st.scrub,
          pin: st.pin,
          tweens: runtimeData.gsap.tweens || []
        });
      }
    } else if (runtimeData.gsap.tweens && runtimeData.gsap.tweens.length > 0) {
      gsapTimelines.push({
        scrub: false,
        pin: false,
        tweens: runtimeData.gsap.tweens
      });
    }

    // Construct webglRenders format per contract
    const webglRenders = [];
    if (runtimeData.webgl && (runtimeData.webgl.cameraSamples.length > 0 || runtimeData.webgl.rendersCount > 0)) {
      webglRenders.push({
        canvasSelector: runtimeData.webgl.canvasSelector || 'canvas',
        cameraFov: runtimeData.webgl.cameraFov || 45,
        cameraTrajectorySamples: runtimeData.webgl.cameraSamples || []
      });
    }

    // 4. Collect Sanitization Report
    const sanitizationReport = this.trackerSanitizer.getSanitizationReport();

    // 5. Emit complete KineticTimelineIR
    const ir = {
      sourceUrl: url,
      viewport,
      cssAnimations,
      gsapTimelines,
      webglRenders,
      sanitizationReport: {
        blockedRequestsCount: sanitizationReport.blockedRequestsCount,
        strippedScriptsCount: sanitizationReport.strippedScriptsCount,
        isClean: sanitizationReport.isClean
      }
    };

    return ir;
  }

  /**
   * Detaches CDP session and unbinds listeners
   */
  async detach() {
    if (this.cdpSession && typeof this.cdpSession.off === 'function') {
      try {
        if (this._animationCreatedHandler) this.cdpSession.off('Animation.animationCreated', this._animationCreatedHandler);
        if (this._animationStartedHandler) this.cdpSession.off('Animation.animationStarted', this._animationStartedHandler);
        if (this._animationCanceledHandler) this.cdpSession.off('Animation.animationCanceled', this._animationCanceledHandler);
      } catch (e) {}
    }

    await this.trackerSanitizer.detachFromCdp();

    if (this.cdpSession && typeof this.cdpSession.detach === 'function') {
      try {
        await this.cdpSession.detach();
      } catch (e) {}
    }

    this.cdpSession = null;
    this.page = null;
  }
}

module.exports = {
  KineticTimelineInterceptor
};
