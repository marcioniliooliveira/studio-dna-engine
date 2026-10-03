/**
 * src/cdp/runtime-hook-injector.js
 * 
 * In-Memory Kinetic Hook Injector
 * Requirement R1 — CDP Semantic Decompiler & Sanitizer Pipeline
 * 
 * Pre-injects into the page context:
 * 1. RequestAnimationFrame (RAF) timestamp delta, frame count, FPS estimation, and jitter measurement.
 * 2. GSAP timeline & ScrollTrigger hooks (extracts tween targets, durations, eases, trigger bounds).
 * 3. Three.js WebGLRenderer hook (extracts camera FOV, world position, target vector, and quaternion).
 */

'use strict';

class RuntimeHookInjector {
  /**
   * Generates the self-executing JavaScript code to be injected at document start
   */
  static getHookInjectionScript() {
    return `
(function() {
  if (window.__STUDIO_DNA_HOOKS_INSTALLED__) return;
  window.__STUDIO_DNA_HOOKS_INSTALLED__ = true;

  window.__KINETIC_HOOK_DATA__ = {
    raf: {
      frameCount: 0,
      deltas: [],
      averageDelta: 16.67,
      fps: 60.0,
      jitter: 0.0,
      minDelta: 999999,
      maxDelta: 0
    },
    gsap: {
      timelines: [],
      scrollTriggers: [],
      tweens: []
    },
    webgl: {
      rendersCount: 0,
      canvasSelector: 'canvas',
      cameraFov: 45,
      cameraSamples: []
    }
  };

  const hookData = window.__KINETIC_HOOK_DATA__;

  // -------------------------------------------------------------
  // 1. RAF Monkey-Patch: Records frame delta, jitter, and frame rate
  // -------------------------------------------------------------
  let lastRafTimestamp = null;
  const originalRaf = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : null;
  if (originalRaf) {
    window.requestAnimationFrame = function(callback) {
      return originalRaf(function(timestamp) {
        if (lastRafTimestamp !== null) {
          const delta = timestamp - lastRafTimestamp;
          if (delta > 0 && delta < 1000) {
            hookData.raf.frameCount++;
            if (hookData.raf.deltas.length < 300) {
              hookData.raf.deltas.push(delta);
            }
            if (delta < hookData.raf.minDelta) hookData.raf.minDelta = delta;
            if (delta > hookData.raf.maxDelta) hookData.raf.maxDelta = delta;

            const sum = hookData.raf.deltas.reduce((a, b) => a + b, 0);
            hookData.raf.averageDelta = sum / hookData.raf.deltas.length;
            hookData.raf.fps = Number((1000 / hookData.raf.averageDelta).toFixed(2));

            const idealDelta = 1000 / 60; // 16.6667ms
            const jitterSum = hookData.raf.deltas.reduce((acc, d) => acc + Math.abs(d - idealDelta), 0);
            hookData.raf.jitter = Number((jitterSum / hookData.raf.deltas.length).toFixed(3));
          }
        }
        lastRafTimestamp = timestamp;
        try {
          return callback(timestamp);
        } catch (err) {
          throw err;
        }
      });
    };
  }

  // Helper: Resolves DOM or Three element to a valid CSS or named selector
  function resolveTargetSelector(target) {
    if (!target) return 'unknown';
    if (typeof target === 'string') return target;
    if (target.nodeType === 1) { // DOM Element
      if (target.id) return '#' + target.id;
      if (target.getAttribute && target.getAttribute('data-kinetic-slot')) {
        return '[data-kinetic-slot="' + target.getAttribute('data-kinetic-slot') + '"]';
      }
      if (target.className && typeof target.className === 'string') {
        const firstClass = target.className.trim().split(/\\s+/)[0];
        if (firstClass) return '.' + firstClass;
      }
      return target.tagName.toLowerCase();
    }
    if (target.isObject3D) {
      return target.name || 'THREE.Object3D';
    }
    return String(target.constructor ? target.constructor.name : 'Object');
  }

  // -------------------------------------------------------------
  // 2. GSAP & ScrollTrigger Hook
  // -------------------------------------------------------------
  function harvestGsapData(gsap) {
    try {
      if (!gsap) return;

      if (gsap.globalTimeline && typeof gsap.globalTimeline.getChildren === 'function') {
        const children = gsap.globalTimeline.getChildren(true, true, true);
        hookData.gsap.tweens = [];
        for (const tween of children) {
          if (tween && typeof tween.duration === 'function') {
            const targets = tween.targets ? tween.targets() : (tween.target ? [tween.target] : []);
            const targetSelector = targets.length > 0 ? resolveTargetSelector(targets[0]) : 'unknown';
            const ease = (tween._ease && tween._ease.name) ? tween._ease.name : 'power1.out';
            const vars = tween.vars ? { ...tween.vars } : {};
            delete vars.target;
            delete vars.targets;
            delete vars.parent;
            delete vars.scrollTrigger;

            hookData.gsap.tweens.push({
              targetSelector,
              duration: tween.duration() || 0,
              ease,
              vars
            });
          }
        }
      }

      const ST = window.ScrollTrigger || (gsap.plugins && gsap.plugins.scrollTrigger);
      if (ST && typeof ST.getAll === 'function') {
        const triggers = ST.getAll();
        hookData.gsap.scrollTriggers = [];
        for (const st of triggers) {
          const triggerSelector = st.trigger ? resolveTargetSelector(st.trigger) : undefined;
          hookData.gsap.scrollTriggers.push({
            triggerSelector,
            startBound: String(st.start || 'top top'),
            endBound: String(st.end || 'bottom bottom'),
            scrub: st.vars && st.vars.scrub !== undefined ? st.vars.scrub : false,
            pin: st.vars && st.vars.pin !== undefined ? st.vars.pin : false
          });
        }
      }
    } catch (e) {}
  }

  window.__HARVEST_GSAP_DATA__ = function() {
    harvestGsapData(window.gsap);
  };

  function hookGsapInstance(gsap) {
    if (!gsap) return;
    if (gsap.ticker && typeof gsap.ticker.add === 'function') {
      try {
        gsap.ticker.add(() => harvestGsapData(gsap));
      } catch (e) {}
    }
  }

  let _gsap = window.gsap;
  if (_gsap) {
    hookGsapInstance(_gsap);
  }
  try {
    Object.defineProperty(window, 'gsap', {
      configurable: true,
      enumerable: true,
      get: () => _gsap,
      set: (val) => {
        _gsap = val;
        hookGsapInstance(val);
      }
    });
  } catch (e) {}

  // -------------------------------------------------------------
  // 3. Three.js WebGLRenderer hook: Camera trajectory sniffer
  // -------------------------------------------------------------
  function hookThreeRenderer(rendererClass) {
    if (!rendererClass || !rendererClass.prototype) return;
    let _origRender = rendererClass.prototype.render;

    try {
      Object.defineProperty(rendererClass.prototype, 'render', {
        configurable: true,
        enumerable: true,
        get: function() {
          return function(scene, camera) {
            try {
              hookData.webgl.rendersCount++;
              const canvas = this.domElement;
              const canvasSelector = canvas ? (canvas.id ? '#' + canvas.id : (canvas.className ? '.' + canvas.className.split(/\\s+/)[0] : 'canvas')) : 'canvas';
              hookData.webgl.canvasSelector = canvasSelector;

              const fov = camera ? (camera.fov || (camera.isPerspectiveCamera ? 45 : (camera.isOrthographicCamera ? 0 : 45))) : 45;
              hookData.webgl.cameraFov = fov;

              const docEl = document.documentElement;
              const scrollHeight = (docEl ? docEl.scrollHeight : 1000) - (window.innerHeight || 800);
              const scrollProgress = scrollHeight > 0 ? Math.min(1, Math.max(0, (window.scrollY || 0) / scrollHeight)) : 0;

              const pos = camera && camera.position ? [camera.position.x, camera.position.y, camera.position.z] : [0, 0, 0];
              let target = [0, 0, 0];
              if (camera && camera.target) {
                target = [camera.target.x, camera.target.y, camera.target.z];
              } else if (camera && camera.matrixWorld) {
                const e = camera.matrixWorld.elements || camera.matrixWorld;
                if (e && e.length >= 16) {
                  target = [pos[0] - e[8], pos[1] - e[9], pos[2] - e[10]];
                }
              }

              const quat = camera && camera.quaternion ? [camera.quaternion.x, camera.quaternion.y, camera.quaternion.z, camera.quaternion.w] : [0, 0, 0, 1];

              if (hookData.webgl.cameraSamples.length < 180) {
                hookData.webgl.cameraSamples.push({
                  canvasSelector,
                  cameraFov: fov,
                  scrollProgress: Number(scrollProgress.toFixed(4)),
                  position: pos,
                  target: target,
                  quaternion: quat
                });
              }
            } catch (e) {}

            if (typeof _origRender === 'function') {
              return _origRender.apply(this, arguments);
            }
          };
        },
        set: function(fn) {
          _origRender = fn;
        }
      });
    } catch (e) {
      if (rendererClass.prototype.render) {
        const fallbackRender = rendererClass.prototype.render;
        rendererClass.prototype.render = function(scene, camera) {
          try {
            hookData.webgl.rendersCount++;
          } catch (err) {}
          return fallbackRender.apply(this, arguments);
        };
      }
    }
  }

  function hookThree(three) {
    if (!three) return;
    if (three.WebGLRenderer) {
      hookThreeRenderer(three.WebGLRenderer);
    }
    let _renderer = three.WebGLRenderer;
    try {
      Object.defineProperty(three, 'WebGLRenderer', {
        configurable: true,
        enumerable: true,
        get: () => _renderer,
        set: (cls) => {
          _renderer = cls;
          hookThreeRenderer(cls);
        }
      });
    } catch (e) {}
  }

  let _three = window.THREE;
  if (_three) {
    hookThree(_three);
  }
  try {
    Object.defineProperty(window, 'THREE', {
      configurable: true,
      enumerable: true,
      get: () => _three,
      set: (val) => {
        _three = val;
        hookThree(val);
      }
    });
  } catch (e) {}
})();
`;
  }

  /**
   * Injects the hook into a Playwright Page and/or CDP Session
   */
  static async inject(page, cdpSession) {
    const script = RuntimeHookInjector.getHookInjectionScript();

    if (page && typeof page.addInitScript === 'function') {
      await page.addInitScript(script);
    }

    if (cdpSession && typeof cdpSession.send === 'function') {
      try {
        await cdpSession.send('Page.addScriptToEvaluateOnNewDocument', {
          source: script
        });
      } catch (e) {
        // Handled by page.addInitScript
      }
    }
  }

  /**
   * Extracts telemetry collected by the injected hooks in the page context
   */
  static async extractCapturedData(page) {
    if (!page || typeof page.evaluate !== 'function') {
      return {
        raf: { frameCount: 0, deltas: [], averageDelta: 16.67, fps: 60.0, jitter: 0.0 },
        gsap: { timelines: [], scrollTriggers: [], tweens: [] },
        webgl: { rendersCount: 0, canvasSelector: 'canvas', cameraFov: 45, cameraSamples: [] }
      };
    }

    return await page.evaluate(() => {
      if (typeof window.__HARVEST_GSAP_DATA__ === 'function') {
        window.__HARVEST_GSAP_DATA__();
      }
      const data = window.__KINETIC_HOOK_DATA__ || {};
      return {
        raf: data.raf || { frameCount: 0, deltas: [], averageDelta: 16.67, fps: 60.0, jitter: 0.0 },
        gsap: data.gsap || { timelines: [], scrollTriggers: [], tweens: [] },
        webgl: data.webgl || { rendersCount: 0, canvasSelector: 'canvas', cameraFov: 45, cameraSamples: [] }
      };
    });
  }
}

module.exports = {
  RuntimeHookInjector
};
