#!/usr/bin/env node
/**
 * scripts/extract-interactive-react-appui.js
 *
 * Studio DNA Engine v3.0 — Full Interactive React Extractor & JSX Decompiler (Default + Sorbet)
 *
 * Extracts the complete interactive Webpack React runtime (300 Default + 300 Sorbet components),
 * full Tailwind v4 CSS bundle, theme preset tables, and AST-decompiled .jsx / .sorbet.jsx
 * source files from the public preview showcase at https://pro.reactbits.dev/docs/app-ui.
 *
 * Outputs inside reactbitspremium-appui/:
 *   - theme/app-ui-full-tailwind.css
 *   - runtime/appui-interactive-runtime.js
 *   - index.html (Master Interactive 300-Component Playground)
 *   - <category>/<slug>/<slug>.jsx
 *   - <category>/<slug>/<slug>.sorbet.jsx
 *   - <category>/<slug>/capsule.html (Live Interactive React Capsule with Default/Sorbet & Theme Bar)
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const {
  extractSyncDependencies,
  decompileDefaultModule,
  decompileSorbetCategoryModule
} = require('./lib/webpack-jsx-decompiler');

const TARGET_URL = 'https://pro.reactbits.dev/docs/app-ui/ai-chat';
const OUTPUT_DIR = path.resolve(__dirname, '../reactbitspremium-appui');
const THEME_DIR = path.join(OUTPUT_DIR, 'theme');
const RUNTIME_DIR = path.join(OUTPUT_DIR, 'runtime');

const ALL_CATEGORIES = [
  'ai-chat', 'prompt-input', 'agent-activity', 'tool-calls', 'agent-approval', 'agent-plan', 'ai-usage',
  'app-shell', 'app-sidebar', 'command-menu', 'navbar', 'mobile',
  'card', 'data-table', 'dashboard', 'analytics', 'list', 'filtering', 'file-manager', 'monitoring',
  'empty-state', 'settings-form', 'forms', 'app-dialog', 'notifications', 'onboarding', 'paywall',
  'authentication', 'kanban', 'wizard', 'billing',
  'comments', 'scheduling', 'integrations', 'editor', 'feedback', 'support', 'chat'
];

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Cleans local /_next/static/media font rules and prepends Google Fonts + font variables.
 */
function buildFullTailwindCss(cssChunks) {
  const fontHeader = `/* React Bits Pro — Full Tailwind v4 + Theme Scope + Sorbet CSS */
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;450;500;600;700&family=IBM+Plex+Sans:wght@400;450;500;600;700&family=Inter:wght@400;450;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Literata:opsz,wght@7..72,400;7..72,500;7..72,600&family=Manrope:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&display=swap');

:root {
  --font-geist-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-inter: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-manrope: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --font-plex-sans: "IBM Plex Sans", ui-sans-serif, system-ui, sans-serif;
  --font-literata: "Literata", ui-serif, Georgia, serif;
  --font-nunito: "Nunito", ui-sans-serif, system-ui, sans-serif;
  --font-jetbrains-mono: "JetBrains Mono", ui-monospace, monospace;
}
`;

  const cleaned = cssChunks
    .map(chunk => {
      // Remove Next.js local woff2 @font-face rules so zero 404 requests occur locally
      return chunk.replace(/@font-face\s*\{[^}]*\/_next\/static\/media\/[^}]*\}/g, '');
    })
    .join('\n\n');

  return `${fontHeader}\n${cleaned}\n`;
}

/**
 * Generates the self-contained Webpack React interactive runtime bundle.
 */
function buildInteractiveRuntimeJs(closureIds, allModulesMap, metaPayload) {
  const moduleEntries = [];
  for (const id of closureIds) {
    const fnStr = allModulesMap[id];
    if (!fnStr) continue;
    moduleEntries.push(`  ${JSON.stringify(id)}: ${fnStr}`);
  }

  return `/**
 * React Bits Pro — Application UI Interactive Runtime (300 Default + 300 Sorbet)
 * Self-contained Webpack module runner + Theme Presets + Toolbar Controller.
 */
(function (global) {
  'use strict';

  if (typeof global.process === 'undefined') {
    global.process = { env: { NODE_ENV: 'production' } };
  }

  var __rbModules = {
${moduleEntries.join(',\n')}
  };

  var __rbCache = {};

  function __rbRequire(moduleId) {
    var cached = __rbCache[moduleId];
    if (cached !== undefined) return cached.exports;
    var factory = __rbModules[moduleId];
    if (!factory) {
      throw new Error('ReactBits Runtime: missing module ' + moduleId);
    }
    var module = (__rbCache[moduleId] = { exports: {} });
    factory.call(module.exports, module, module.exports, __rbRequire);
    return module.exports;
  }

  __rbRequire.m = __rbModules;
  __rbRequire.c = __rbCache;
  __rbRequire.g = global;
  __rbRequire.o = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
  __rbRequire.d = function (exports, definition) {
    for (var key in definition) {
      if (__rbRequire.o(definition, key) && !__rbRequire.o(exports, key)) {
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
  __rbRequire.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };
  __rbRequire.n = function (mod) {
    var getter = mod && mod.__esModule ? function () { return mod['default']; } : function () { return mod; };
    __rbRequire.d(getter, { a: getter });
    return getter;
  };
  __rbRequire.e = function (chunkId) {
    if (__rbModules[chunkId]) return Promise.resolve();
    // Optional lazy WASM chunks (e.g. Shiki grammar) remain pending safely without throwing
    return new Promise(function () {});
  };

  var React = __rbRequire(12115);
  var ReactDOMClient = __rbRequire(59248);
  var ThemePresets = __rbRequire(68539);
  var StyleDefs = __rbRequire(76748);

  var META = ${JSON.stringify(metaPayload)};
  var roots = new WeakMap();

  class CapsuleErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
      return { error: error };
    }
    render() {
      if (this.state.error) {
        return React.createElement(
          'div',
          { className: 'p-6 text-sm text-red-600 dark:text-red-400 font-mono' },
          'Component render error: ' + (this.state.error && this.state.error.message ? this.state.error.message : String(this.state.error))
        );
      }
      return this.props.children;
    }
  }

  function resolveComponent(slug, style) {
    var info = META.slugs[slug];
    if (!info) return null;
    if (style === 'sorbet') {
      var sorbetModId = META.sorbetCategories[info.category];
      if (sorbetModId) {
        var mod = __rbRequire(sorbetModId);
        if (mod && mod.components && mod.components[slug]) {
          return {
            Component: mod.components[slug],
            minHeight: (mod.heights && mod.heights[slug]) || info.sorbetMinHeight || info.minHeight
          };
        }
      }
    }
    var defMod = __rbRequire(info.modId);
    return {
      Component: defMod && defMod.default ? defMod.default : defMod,
      minHeight: info.minHeight || 640
    };
  }

  function applyTheme(opts) {
    opts = opts || {};
    var style = opts.style === 'sorbet' ? 'sorbet' : 'default';
    var mode = opts.mode === 'dark' ? 'dark' : 'light';
    var rootEl = document.documentElement;
    rootEl.classList.toggle('dark', mode === 'dark');
    rootEl.style.colorScheme = mode;

    var presetObj = null;
    if (opts.preset && opts.preset !== 'custom') {
      presetObj = ThemePresets.GE.find(function (p) { return p.id === opts.preset; }) || null;
    }

    var radius = opts.radius !== undefined && opts.radius !== null
      ? Number(opts.radius)
      : (presetObj ? presetObj.radius : 10);
    var baseId = opts.base || (presetObj ? presetObj.base : 'neutral');
    var accentId = opts.accent || (presetObj ? presetObj.accent : 'default');
    var fontId = opts.font || (presetObj ? presetObj.font : 'default');

    var setProp = function (k, v) {
      if (v === null || v === undefined) rootEl.style.removeProperty(k);
      else rootEl.style.setProperty(k, v);
    };

    setProp('--rb-radius', radius === 10 ? null : radius + 'px');

    var baseObj = ThemePresets.lN(baseId);
    var isDefaultBase = baseId === 'neutral';
    for (var i = 0; i < ThemePresets.Un.length; i++) {
      var step = ThemePresets.Un[i];
      setProp('--rb-n-' + step, isDefaultBase ? null : baseObj.ramp[step]);
    }

    var styleDef = StyleDefs.dF(style);
    if (accentId === 'default') {
      if (style === 'sorbet') {
        setProp('--rb-accent', mode === 'dark' ? styleDef.accent.dark : styleDef.accent.light);
        setProp('--rb-accent-fg', mode === 'dark' ? styleDef.accent.darkForeground : styleDef.accent.lightForeground);
      } else {
        setProp('--rb-accent', null);
        setProp('--rb-accent-fg', null);
      }
    } else {
      var acc = ThemePresets.Qx(accentId);
      setProp('--rb-accent', mode === 'dark' ? acc.dark : acc.light);
      setProp('--rb-accent-fg', mode === 'dark' ? acc.darkForeground : acc.lightForeground);
    }

    var fontObj = ThemePresets.Qr({ font: fontId, style: style });
    var fontStack = fontObj && fontObj.exportStack ? fontObj.exportStack : null;
    setProp('--rb-font-sans', fontStack);
    document.body.style.fontFamily = fontStack || 'var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif)';
  }

  function mount(slug, containerEl, opts) {
    opts = opts || {};
    var style = opts.style === 'sorbet' ? 'sorbet' : 'default';
    var resolved = resolveComponent(slug, style);
    if (!resolved || !resolved.Component) {
      throw new Error('Component not found: ' + slug);
    }

    containerEl.style.minHeight = resolved.minHeight + 'px';
    if (containerEl.parentElement && containerEl.parentElement.tagName === 'DNA-CAPSULE') {
      containerEl.parentElement.style.minHeight = resolved.minHeight + 'px';
    }

    var root = roots.get(containerEl);
    if (!root) {
      root = ReactDOMClient.createRoot(containerEl);
      roots.set(containerEl, root);
    }

    root.render(
      React.createElement(
        CapsuleErrorBoundary,
        { key: slug + ':' + style },
        React.createElement(resolved.Component, null)
      )
    );
    return resolved;
  }

  function loadStateFromParams() {
    var stored = {};
    try {
      stored = JSON.parse(localStorage.getItem('rb-appui-capsule-state') || '{}');
    } catch (e) {}
    var sp = new URLSearchParams(window.location.search);
    return {
      style: sp.get('style') || stored.style || 'default',
      mode: sp.get('mode') || stored.mode || 'light',
      preset: sp.get('preset') || stored.preset || 'default',
      radius: sp.has('radius') ? Number(sp.get('radius')) : (stored.radius !== undefined ? Number(stored.radius) : 10),
      accent: sp.get('accent') || stored.accent || 'default',
      base: sp.get('base') || stored.base || 'neutral'
    };
  }

  function saveState(state) {
    try {
      localStorage.setItem('rb-appui-capsule-state', JSON.stringify(state));
    } catch (e) {}
  }

  function mountToolbar(slug, stageContainer, toolbarContainer) {
    var state = loadStateFromParams();

    function sync() {
      applyTheme(state);
      mount(slug, stageContainer, { style: state.style });
      saveState(state);
      renderToolbar();
    }

    function renderToolbar() {
      if (!toolbarContainer) return;
      var info = META.slugs[slug] || {};
      var styleBtn = function (val, label) {
        var active = state.style === val;
        return '<button type="button" data-rb-act="style" data-val="' + val + '" class="rb-tb-btn ' + (active ? 'rb-tb-active' : '') + '">' + label + '</button>';
      };
      var modeBtn = function (val, label) {
        var active = state.mode === val;
        return '<button type="button" data-rb-act="mode" data-val="' + val + '" class="rb-tb-btn ' + (active ? 'rb-tb-active' : '') + '">' + label + '</button>';
      };
      var selectOpts = function (items, cur) {
        return items.map(function (it) {
          return '<option value="' + it.id + '"' + (it.id === cur ? ' selected' : '') + '>' + it.label + '</option>';
        }).join('');
      };

      toolbarContainer.innerHTML =
        '<div class="rb-tb-inner">' +
          '<a href="../../index.html" class="rb-tb-back">← All 300 Blocks</a>' +
          '<span class="rb-tb-title"><strong>' + slug + '</strong> <span class="rb-tb-cat">' + (info.category || '') + '</span></span>' +
          '<div class="rb-tb-group">' + styleBtn('default', 'Default') + styleBtn('sorbet', 'Sorbet') + '</div>' +
          '<div class="rb-tb-group">' + modeBtn('light', 'Light') + modeBtn('dark', 'Dark') + '</div>' +
          '<label class="rb-tb-field">Preset <select data-rb-sel="preset">' +
            selectOpts(ThemePresets.GE.map(function (p) { return { id: p.id, label: p.label }; }).concat([{ id: 'custom', label: 'Custom' }]), state.preset) +
          '</select></label>' +
          '<label class="rb-tb-field">Radius <select data-rb-sel="radius">' +
            ThemePresets.DB.map(function (r) { return '<option value="' + r.value + '"' + (r.value === state.radius ? ' selected' : '') + '>' + r.label + ' (' + r.value + 'px)</option>'; }).join('') +
          '</select></label>' +
          '<label class="rb-tb-field">Accent <select data-rb-sel="accent">' +
            selectOpts(ThemePresets.F9.map(function (a) { return { id: a.id, label: a.label }; }), state.accent) +
          '</select></label>' +
          '<label class="rb-tb-field">Base <select data-rb-sel="base">' +
            selectOpts(ThemePresets.Sl.map(function (b) { return { id: b.id, label: b.label }; }), state.base) +
          '</select></label>' +
          '<a href="./' + (state.style === 'sorbet' ? slug + '.sorbet.jsx' : slug + '.jsx') + '" target="_blank" class="rb-tb-link">View .jsx</a>' +
        '</div>';

      toolbarContainer.querySelectorAll('[data-rb-act]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var act = btn.getAttribute('data-rb-act');
          var val = btn.getAttribute('data-val');
          state[act] = val;
          sync();
        });
      });

      toolbarContainer.querySelectorAll('[data-rb-sel]').forEach(function (sel) {
        sel.addEventListener('change', function () {
          var key = sel.getAttribute('data-rb-sel');
          if (key === 'preset') {
            state.preset = sel.value;
            var p = ThemePresets.GE.find(function (x) { return x.id === sel.value; });
            if (p) {
              state.radius = p.radius;
              state.base = p.base;
              state.accent = p.accent;
            }
          } else if (key === 'radius') {
            state.radius = Number(sel.value);
            state.preset = 'custom';
          } else {
            state[key] = sel.value;
            state.preset = 'custom';
          }
          sync();
        });
      });
    }

    sync();
    return {
      getState: function () { return Object.assign({}, state); },
      setState: function (patch) { Object.assign(state, patch); sync(); }
    };
  }

  global.ReactBitsAppUI = {
    mount: mount,
    applyTheme: applyTheme,
    mountToolbar: mountToolbar,
    getMetadata: function (slug) { return META.slugs[slug] || null; },
    listSlugs: function () { return Object.keys(META.slugs); },
    presets: ThemePresets,
    styles: StyleDefs
  };
})(window);
`;
}

/**
 * Generates interactive capsule.html for a specific component.
 */
function buildInteractiveCapsuleHtml(slug, category, categoryTitle, description, minHeight) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(slug)} — ${escapeHtml(categoryTitle)} | Interactive React Capsule</title>
  <link rel="stylesheet" href="../../theme/app-ui-full-tailwind.css" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      min-height: 100%;
      background: var(--color-neutral-100, #f5f5f5);
      color: var(--color-neutral-900, #171717);
      font-family: var(--rb-font-sans, var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif));
    }
    html.dark, html.dark body {
      background: #050505;
      color: #f5f5f5;
    }
    #rb-toolbar {
      position: sticky;
      top: 0;
      z-index: 60;
      background: color-mix(in oklab, var(--color-neutral-50, #fafafa) 90%, transparent);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(23, 23, 23, 0.1);
      padding: 8px 16px;
      font-size: 12px;
      font-family: ui-sans-serif, system-ui, sans-serif;
    }
    html.dark #rb-toolbar {
      background: rgba(18, 18, 18, 0.9);
      border-bottom-color: rgba(245, 245, 245, 0.12);
      color: #f5f5f5;
    }
    .rb-tb-inner {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
    }
    .rb-tb-back, .rb-tb-link {
      color: inherit;
      text-decoration: none;
      padding: 4px 8px;
      border-radius: 6px;
      border: 1px solid rgba(128,128,128,0.25);
      font-weight: 500;
    }
    .rb-tb-back:hover, .rb-tb-link:hover { background: rgba(128,128,128,0.12); }
    .rb-tb-title { margin-right: auto; display: inline-flex; align-items: center; gap: 6px; }
    .rb-tb-cat { opacity: 0.6; }
    .rb-tb-group {
      display: inline-flex;
      padding: 2px;
      border-radius: 7px;
      background: rgba(128,128,128,0.12);
      gap: 2px;
    }
    .rb-tb-btn {
      border: 0;
      background: transparent;
      color: inherit;
      padding: 3px 9px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
    }
    .rb-tb-btn.rb-tb-active {
      background: #ffffff;
      color: #171717;
      box-shadow: 0 1px 2px rgba(0,0,0,0.12);
    }
    html.dark .rb-tb-btn.rb-tb-active {
      background: #2e2e2e;
      color: #ffffff;
    }
    .rb-tb-field {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      opacity: 0.9;
    }
    .rb-tb-field select {
      border: 1px solid rgba(128,128,128,0.28);
      border-radius: 6px;
      background: transparent;
      color: inherit;
      padding: 3px 6px;
      font-size: 12px;
    }
    html.dark .rb-tb-field select option { background: #171717; color: #f5f5f5; }
    .capsule-stage {
      min-height: calc(100vh - 50px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      overflow: auto;
    }
    dna-capsule {
      display: block;
      width: 1280px;
      min-height: ${minHeight}px;
      background: var(--color-white, #ffffff);
      border-radius: var(--rb-r-xl, 12px);
      overflow: visible;
      box-shadow: 0 10px 30px -12px rgb(0 0 0 / 0.14);
      border: 1px solid rgba(128,128,128,0.16);
    }
    html.dark dna-capsule {
      background: var(--color-neutral-950, #0a0a0a);
    }
    #capsule-root {
      width: 1280px;
      min-height: ${minHeight}px;
      position: relative;
      border-radius: inherit;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <div id="rb-toolbar"></div>
  <div class="capsule-stage">
    <dna-capsule data-capsule-id="${escapeHtml(slug)}" data-category="${escapeHtml(category)}" class="rb-theme-scope">
      <div id="capsule-root" class="block-scale-preview rb-theme-scope" aria-description="${escapeHtml(description)}"></div>
    </dna-capsule>
  </div>
  <script src="../../runtime/appui-interactive-runtime.js"></script>
  <script>
    window.ReactBitsAppUI.mountToolbar(${JSON.stringify(slug)}, document.getElementById('capsule-root'), document.getElementById('rb-toolbar'));
  </script>
</body>
</html>
`;
}

/**
 * Generates the master interactive playground at reactbitspremium-appui/index.html.
 */
function buildMasterPlaygroundHtml(catalogData) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>React Bits Pro — Application UI Interactive Playground (300 Blocks)</title>
  <link rel="stylesheet" href="./theme/app-ui-full-tailwind.css" />
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      overflow: hidden;
      font-family: var(--font-geist-sans, ui-sans-serif, system-ui, sans-serif);
      background: #f5f5f5;
      color: #171717;
    }
    html.dark, html.dark body { background: #0a0a0a; color: #f5f5f5; }
    .pg-shell { display: flex; height: 100vh; width: 100vw; }
    .pg-sidebar {
      width: 290px;
      flex: 0 0 290px;
      border-right: 1px solid rgba(128,128,128,0.2);
      display: flex;
      flex-direction: column;
      background: #ffffff;
    }
    html.dark .pg-sidebar { background: #111111; }
    .pg-side-head { padding: 12px; border-bottom: 1px solid rgba(128,128,128,0.18); }
    .pg-side-title { font-size: 13px; font-weight: 600; margin-bottom: 8px; display: flex; justify-content: space-between; }
    .pg-search {
      width: 100%;
      padding: 6px 10px;
      border-radius: 8px;
      border: 1px solid rgba(128,128,128,0.28);
      background: transparent;
      color: inherit;
      font-size: 12px;
      outline: none;
    }
    .pg-list { flex: 1; overflow-y: auto; padding: 8px; }
    .pg-cat-btn {
      width: 100%;
      text-align: left;
      padding: 6px 8px;
      border: 0;
      background: transparent;
      color: inherit;
      font-size: 12px;
      font-weight: 600;
      opacity: 0.72;
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
    }
    .pg-item-btn {
      width: 100%;
      text-align: left;
      padding: 6px 10px;
      border: 0;
      border-radius: 6px;
      background: transparent;
      color: inherit;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .pg-item-btn:hover { background: rgba(128,128,128,0.1); }
    .pg-item-btn.active { background: #171717; color: #ffffff; }
    html.dark .pg-item-btn.active { background: #f5f5f5; color: #171717; }
    .pg-item-desc { font-size: 11px; opacity: 0.68; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .pg-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
    .pg-topbar {
      padding: 10px 16px;
      border-bottom: 1px solid rgba(128,128,128,0.2);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      background: #ffffff;
      font-size: 12px;
    }
    html.dark .pg-topbar { background: #111111; }
    .pg-seg {
      display: inline-flex;
      background: rgba(128,128,128,0.14);
      padding: 2px;
      border-radius: 7px;
      gap: 2px;
    }
    .pg-seg button {
      border: 0;
      background: transparent;
      color: inherit;
      padding: 4px 10px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
    }
    .pg-seg button.active { background: #ffffff; color: #171717; box-shadow: 0 1px 2px rgba(0,0,0,0.12); }
    html.dark .pg-seg button.active { background: #2c2c2c; color: #ffffff; }
    .pg-select {
      border: 1px solid rgba(128,128,128,0.28);
      border-radius: 6px;
      background: transparent;
      color: inherit;
      padding: 4px 8px;
      font-size: 12px;
    }
    html.dark .pg-select option { background: #171717; color: #f5f5f5; }
    .pg-stage {
      flex: 1;
      overflow: auto;
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }
    .pg-card-frame {
      width: 1280px;
      background: var(--color-white, #ffffff);
      border-radius: var(--rb-r-xl, 12px);
      border: 1px solid rgba(128,128,128,0.2);
      box-shadow: 0 12px 36px -14px rgba(0,0,0,0.18);
      overflow: hidden;
    }
    html.dark .pg-card-frame { background: #0a0a0a; }
    .pg-code-wrap {
      width: 100%;
      max-width: 1100px;
      background: #141414;
      color: #e5e5e5;
      border-radius: 10px;
      padding: 16px;
      font-family: var(--font-jetbrains-mono, monospace);
      font-size: 12px;
      line-height: 1.55;
      overflow: auto;
      white-space: pre;
    }
  </style>
</head>
<body>
  <div class="pg-shell">
    <aside class="pg-sidebar">
      <div class="pg-side-head">
        <div class="pg-side-title"><span>React Bits App UI</span><span id="pg-count">300</span></div>
        <input id="pg-search" class="pg-search" type="search" placeholder="Search 300 blocks..." />
      </div>
      <div id="pg-list" class="pg-list"></div>
    </aside>
    <main class="pg-main">
      <header class="pg-topbar">
        <strong id="pg-cur-title" style="margin-right:auto">ai-chat-9</strong>
        <div class="pg-seg" id="seg-view">
          <button type="button" data-view="preview" class="active">Live Interactive</button>
          <button type="button" data-view="code">Decompiled .jsx</button>
        </div>
        <div class="pg-seg" id="seg-style">
          <button type="button" data-style="default" class="active">Default</button>
          <button type="button" data-style="sorbet">Sorbet</button>
        </div>
        <div class="pg-seg" id="seg-mode">
          <button type="button" data-mode="light" class="active">Light</button>
          <button type="button" data-mode="dark">Dark</button>
        </div>
        <select id="sel-preset" class="pg-select">
          <option value="default">Preset: Default</option>
          <option value="product">Preset: Product</option>
          <option value="console">Preset: Console</option>
          <option value="editorial">Preset: Editorial</option>
          <option value="soft">Preset: Soft</option>
          <option value="terminal">Preset: Terminal</option>
        </select>
        <a id="pg-open-capsule" href="./ai-chat/ai-chat-9/capsule.html" target="_blank" style="color:inherit;text-decoration:none;border:1px solid rgba(128,128,128,0.3);padding:4px 8px;border-radius:6px">Open Capsule ↗</a>
      </header>
      <div class="pg-stage">
        <div id="pg-preview-box" class="pg-card-frame block-scale-preview rb-theme-scope">
          <div id="pg-mount" style="width:1280px;min-height:720px;position:relative"></div>
        </div>
        <pre id="pg-code-box" class="pg-code-wrap" style="display:none"></pre>
      </div>
    </main>
  </div>

  <script src="./runtime/appui-interactive-runtime.js"></script>
  <script>
    (function () {
      var CATALOG = ${JSON.stringify(catalogData)};
      var state = {
        slug: new URLSearchParams(location.search).get('slug') || 'ai-chat-9',
        view: 'preview',
        style: 'default',
        mode: 'light',
        preset: 'default',
        query: ''
      };

      var listEl = document.getElementById('pg-list');
      var mountEl = document.getElementById('pg-mount');
      var previewBox = document.getElementById('pg-preview-box');
      var codeBox = document.getElementById('pg-code-box');
      var titleEl = document.getElementById('pg-cur-title');
      var openCapEl = document.getElementById('pg-open-capsule');
      var countEl = document.getElementById('pg-count');

      function findBlock(slug) {
        return CATALOG.find(function (b) { return b.slug === slug; }) || CATALOG[0];
      }

      function renderSidebar() {
        var q = state.query.trim().toLowerCase();
        var filtered = q
          ? CATALOG.filter(function (b) {
              return b.slug.includes(q) || b.category.includes(q) || (b.description || '').toLowerCase().includes(q);
            })
          : CATALOG;
        countEl.textContent = filtered.length + '/' + CATALOG.length;
        var grouped = {};
        filtered.forEach(function (b) {
          if (!grouped[b.category]) grouped[b.category] = [];
          grouped[b.category].push(b);
        });
        var html = '';
        Object.keys(grouped).forEach(function (cat) {
          html += '<div class="pg-cat-btn"><span>' + cat + '</span><span>' + grouped[cat].length + '</span></div>';
          grouped[cat].forEach(function (b) {
            html += '<button type="button" class="pg-item-btn ' + (b.slug === state.slug ? 'active' : '') + '" data-slug="' + b.slug + '">' +
              '<span>' + b.slug + '</span><span class="pg-item-desc">' + (b.description || '') + '</span></button>';
          });
        });
        listEl.innerHTML = html;
        listEl.querySelectorAll('[data-slug]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            state.slug = btn.getAttribute('data-slug');
            renderActive();
            renderSidebar();
          });
        });
      }

      function renderActive() {
        var b = findBlock(state.slug);
        state.slug = b.slug;
        titleEl.textContent = b.slug + ' — ' + b.description;
        openCapEl.href = './' + b.category + '/' + b.slug + '/capsule.html?style=' + state.style + '&mode=' + state.mode + '&preset=' + state.preset;
        window.ReactBitsAppUI.applyTheme({ style: state.style, mode: state.mode, preset: state.preset });

        if (state.view === 'preview') {
          previewBox.style.display = '';
          codeBox.style.display = 'none';
          window.ReactBitsAppUI.mount(b.slug, mountEl, { style: state.style });
        } else {
          previewBox.style.display = 'none';
          codeBox.style.display = '';
          var file = state.style === 'sorbet' ? b.slug + '.sorbet.jsx' : b.slug + '.jsx';
          codeBox.textContent = 'Loading ' + file + '...';
          fetch('./' + b.category + '/' + b.slug + '/' + file)
            .then(function (r) { return r.text(); })
            .then(function (t) { codeBox.textContent = t; })
            .catch(function (err) { codeBox.textContent = 'Failed to load: ' + err.message; });
        }
      }

      document.getElementById('pg-search').addEventListener('input', function (e) {
        state.query = e.target.value;
        renderSidebar();
      });

      document.getElementById('seg-view').addEventListener('click', function (e) {
        var v = e.target.getAttribute('data-view');
        if (!v) return;
        state.view = v;
        this.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-view') === v); });
        renderActive();
      });

      document.getElementById('seg-style').addEventListener('click', function (e) {
        var v = e.target.getAttribute('data-style');
        if (!v) return;
        state.style = v;
        this.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-style') === v); });
        renderActive();
      });

      document.getElementById('seg-mode').addEventListener('click', function (e) {
        var v = e.target.getAttribute('data-mode');
        if (!v) return;
        state.mode = v;
        this.querySelectorAll('button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-mode') === v); });
        renderActive();
      });

      document.getElementById('sel-preset').addEventListener('change', function (e) {
        state.preset = e.target.value;
        renderActive();
      });

      renderSidebar();
      renderActive();
    })();
  </script>
</body>
</html>
`;
}

async function run() {
  ensureDir(THEME_DIR);
  ensureDir(RUNTIME_DIR);

  console.log('🚀 Studio DNA — Interactive React App UI Extractor & AST Decompiler');
  console.log(`🌐 Loading ${TARGET_URL}...`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const capturedCss = [];
  page.on('response', async (res) => {
    const u = res.url();
    if (u.includes('/_next/static/css/') && res.status() === 200) {
      try {
        capturedCss.push({ url: u, text: await res.text() });
      } catch {}
    }
  });

  try {
    const res = await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 45000 });
    if (res && (res.status() === 403 || res.status() === 429)) {
      throw new Error(`ACCESS_BLOCKED: HTTP ${res.status()}`);
    }
    await page.waitForTimeout(3000);

    console.log(`🎨 Captured ${capturedCss.length} CSS stylesheets. Preloading all 38 Sorbet modules...`);

    const bundleData = await page.evaluate(async (categories) => {
      let wpRequire = null;
      window.webpackChunk_N_E.push([[999999], {}, (r) => { wpRequire = r; }]);

      const mod24009 = wpRequire(24009);
      await Promise.all(categories.map(c => mod24009.i_('sorbet', c)));

      const defaultSlugs = {};
      for (const [id, fn] of Object.entries(wpRequire.m)) {
        const code = fn.toString();
        if (!code.includes('slug:"') || !code.includes('minHeight:')) continue;
        const varToMod = {};
        for (const m of code.matchAll(/([a-zA-Z0-9_$]+)\s*=\s*[a-zA-Z0-9_$]+\((\d+)\)/g)) {
          varToMod[m[1]] = m[2];
        }
        for (const m of code.matchAll(/\{slug:"([a-z0-9-]+)",component:([a-zA-Z0-9_$]+)\.default,minHeight:(\d+)\}/g)) {
          const slug = m[1];
          const modId = varToMod[m[2]];
          if (modId) {
            defaultSlugs[slug] = { modId, minHeight: Number(m[3]) };
          }
        }
      }

      const sorbetCategories = {};
      const sorbetHeights = {};
      const m24009Str = wpRequire.m[24009].toString();
      for (const cat of categories) {
        const re = new RegExp(`(?:"${cat}"|\\b${cat}):\\(\\)\\s*=>.*?r\\.bind\\(r,(\\d+)\\)`);
        const match = m24009Str.match(re);
        if (match) {
          sorbetCategories[cat] = match[1];
          const loaded = wpRequire(Number(match[1]));
          if (loaded && loaded.heights) {
            Object.assign(sorbetHeights, loaded.heights);
          }
        }
      }

      const allModulesMap = {};
      for (const [id, fn] of Object.entries(wpRequire.m)) {
        allModulesMap[id] = fn.toString();
      }

      return {
        defaultSlugs,
        sorbetCategories,
        sorbetHeights,
        allModulesMap
      };
    }, ALL_CATEGORIES);

    await browser.close();

    const defaultCount = Object.keys(bundleData.defaultSlugs).length;
    const sorbetCatCount = Object.keys(bundleData.sorbetCategories).length;
    console.log(`📦 Mapped ${defaultCount} Default modules and ${sorbetCatCount} Sorbet category modules.`);
    if (defaultCount < 300 || sorbetCatCount < 38) {
      throw new Error(`Incomplete extraction: default=${defaultCount}, sorbetCategories=${sorbetCatCount}`);
    }

    // 1. Write full Tailwind v4 stylesheet
    const fullCss = buildFullTailwindCss(capturedCss.map(c => c.text));
    fs.writeFileSync(path.join(THEME_DIR, 'app-ui-full-tailwind.css'), fullCss, 'utf8');
    console.log(`✅ Wrote theme/app-ui-full-tailwind.css (${(fullCss.length / 1024).toFixed(1)} KB)`);

    // 2. Compute exact AST transitive closure across Default + Sorbet + React + Motion + Themes
    const roots = [
      '12115', '59248', '95155', '22728', '68539', '76748',
      ...Object.values(bundleData.defaultSlugs).map(x => x.modId),
      ...Object.values(bundleData.sorbetCategories)
    ];
    const visited = new Set();
    const queue = roots.slice();
    while (queue.length > 0) {
      const id = String(queue.shift());
      if (visited.has(id) || !bundleData.allModulesMap[id]) continue;
      visited.add(id);
      const deps = extractSyncDependencies(bundleData.allModulesMap[id]);
      for (const dep of deps) {
        if (!visited.has(dep) && bundleData.allModulesMap[dep]) {
          queue.push(dep);
        }
      }
    }
    const closureIds = Array.from(visited).sort((a, b) => Number(a) - Number(b));
    console.log(`🔗 Transitive closure resolved: ${closureIds.length} Webpack modules.`);

    // 3. Load existing CATALOG.json to get canonical category + description mapping
    const catalogPath = path.join(OUTPUT_DIR, 'CATALOG.json');
    const existingCatalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    const catalogBySlug = new Map(existingCatalog.components.map(c => [c.slug, c]));

    const runtimeSlugsMeta = {};
    for (const [slug, info] of Object.entries(bundleData.defaultSlugs)) {
      const catEntry = catalogBySlug.get(slug);
      const category = catEntry ? catEntry.category : slug.replace(/-\d+$/, '');
      runtimeSlugsMeta[slug] = {
        category,
        categoryTitle: catEntry ? catEntry.categoryTitle : category,
        description: catEntry ? catEntry.description : '',
        modId: info.modId,
        minHeight: info.minHeight,
        sorbetMinHeight: bundleData.sorbetHeights[slug] || info.minHeight
      };
    }

    // 4. Write interactive runtime bundle
    const runtimeJs = buildInteractiveRuntimeJs(closureIds, bundleData.allModulesMap, {
      slugs: runtimeSlugsMeta,
      sorbetCategories: bundleData.sorbetCategories
    });
    fs.writeFileSync(path.join(RUNTIME_DIR, 'appui-interactive-runtime.js'), runtimeJs, 'utf8');
    console.log(`✅ Wrote runtime/appui-interactive-runtime.js (${(runtimeJs.length / 1024 / 1024).toFixed(2)} MB)`);

    // 5. Decompile all 300 Sorbet blocks grouped by category first
    console.log('🧬 AST-Decompiling all 300 Sorbet components...');
    const sorbetDecompiledBySlug = {};
    for (const [cat, modId] of Object.entries(bundleData.sorbetCategories)) {
      const catDecompiled = decompileSorbetCategoryModule(
        bundleData.allModulesMap[modId],
        bundleData.allModulesMap
      );
      Object.assign(sorbetDecompiledBySlug, catDecompiled);
    }
    console.log(`✅ Decompiled ${Object.keys(sorbetDecompiledBySlug).length} Sorbet components.`);

    // 6. Decompile all 300 Default blocks and write .jsx, .sorbet.jsx, interactive capsule.html, updated spec/README
    console.log('🧬 AST-Decompiling all 300 Default components & updating capsules...');
    let decompiledOk = 0;
    const playgroundCatalog = [];

    for (const comp of existingCatalog.components) {
      const slug = comp.slug;
      const meta = runtimeSlugsMeta[slug];
      if (!meta) continue;

      const compDir = path.join(OUTPUT_DIR, comp.category, slug);
      ensureDir(compDir);

      const defResult = decompileDefaultModule(
        bundleData.allModulesMap[meta.modId],
        bundleData.allModulesMap,
        slug
      );
      const sorbetResult = sorbetDecompiledBySlug[slug];

      fs.writeFileSync(path.join(compDir, `${slug}.jsx`), defResult.code, 'utf8');
      if (sorbetResult) {
        fs.writeFileSync(path.join(compDir, `${slug}.sorbet.jsx`), sorbetResult.code, 'utf8');
      }

      const capsuleHtml = buildInteractiveCapsuleHtml(
        slug,
        comp.category,
        comp.categoryTitle,
        comp.description,
        meta.minHeight
      );
      fs.writeFileSync(path.join(compDir, 'capsule.html'), capsuleHtml, 'utf8');

      // Update decompiled-spec.json
      const specPath = path.join(compDir, 'decompiled-spec.json');
      if (fs.existsSync(specPath)) {
        const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
        spec.interactiveRuntime = {
          webpackModuleId: meta.modId,
          sorbetModuleId: bundleData.sorbetCategories[comp.category] || null,
          defaultMinHeight: meta.minHeight,
          sorbetMinHeight: meta.sorbetMinHeight,
          hooksUsed: defResult.meta.hooksUsed,
          usesMotion: defResult.meta.usesMotion,
          usesD3Shape: defResult.meta.usesD3Shape,
          iconCount: defResult.meta.iconCount,
          files: {
            defaultJsx: `${slug}.jsx`,
            sorbetJsx: sorbetResult ? `${slug}.sorbet.jsx` : null,
            capsuleHtml: 'capsule.html'
          }
        };
        fs.writeFileSync(specPath, JSON.stringify(spec, null, 2), 'utf8');
      }

      // Update README.md header/files section if needed
      const readmePath = path.join(compDir, 'README.md');
      if (fs.existsSync(readmePath)) {
        let md = fs.readFileSync(readmePath, 'utf8');
        if (!md.includes('## 0. Interactive React Source')) {
          const section = [
            `## 0. Interactive React Source & Runtime`,
            `- **Default Source:** [\`${slug}.jsx\`](./${slug}.jsx) (minHeight: \`${meta.minHeight}px\`, hooks: ${defResult.meta.hooksUsed.map(h => `\`${h}\``).join(', ') || 'none'})`,
            sorbetResult ? `- **Sorbet Source:** [\`${slug}.sorbet.jsx\`](./${slug}.sorbet.jsx) (minHeight: \`${meta.sorbetMinHeight}px\`)` : '',
            `- **Interactive Capsule:** [\`capsule.html\`](./capsule.html)`,
            '',
            '---',
            ''
          ]
            .filter(Boolean)
            .join('\n');
          md = md.replace('## 1. Structural & Interactive Anatomy', `${section}\n## 1. Structural & Interactive Anatomy`);
          fs.writeFileSync(readmePath, md, 'utf8');
        }
      }

      comp.interactiveRuntime = {
        webpackModuleId: meta.modId,
        defaultMinHeight: meta.minHeight,
        sorbetMinHeight: meta.sorbetMinHeight,
        hooksUsed: defResult.meta.hooksUsed,
        usesMotion: defResult.meta.usesMotion,
        usesD3Shape: defResult.meta.usesD3Shape
      };

      playgroundCatalog.push({
        slug,
        category: comp.category,
        categoryTitle: comp.categoryTitle,
        description: comp.description,
        minHeight: meta.minHeight
      });

      decompiledOk++;
    }

    // Update CATALOG.json & write Master Playground index.html
    existingCatalog.interactiveRuntimeReady = true;
    existingCatalog.interactiveCount = decompiledOk;
    fs.writeFileSync(catalogPath, JSON.stringify(existingCatalog, null, 2), 'utf8');

    const indexHtml = buildMasterPlaygroundHtml(playgroundCatalog);
    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexHtml, 'utf8');

    console.log(`\n🎉 Done! Decompiled ${decompiledOk}/300 interactive components (Default + Sorbet).`);
    console.log(`🌐 Playground: ${path.join(OUTPUT_DIR, 'index.html')}`);
    console.log(`⚡ Runtime:    ${path.join(RUNTIME_DIR, 'appui-interactive-runtime.js')}`);
  } finally {
    await browser.close().catch(() => {});
  }
}

run().catch(err => {
  console.error('\n❌ Extraction failed:', err);
  process.exit(1);
});
