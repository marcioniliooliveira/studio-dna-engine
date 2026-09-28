/**
 * STUDIO DNA ENGINE — Schema-Driven HUD Projector
 * Generates semantic, accessible, glassmorphic UI controls dynamically from Framework-Neutral DNA IR.
 * Pure projection: No hardcoded controls or framework lock-in.
 */

const CATEGORY_METADATA = {
  typography: { label: 'Typography & Hierarchy', icon: 'Aa' },
  surface: { label: 'Surface & Lighting', icon: '✦' },
  content: { label: 'Copy & Messaging', icon: '¶' },
  motion: { label: 'Kinetic & Camera Motion', icon: '⏱' },
  audio: { label: 'Acoustic Feedback', icon: '♫' },
  layout: { label: 'Layout & Spatial Rig', icon: '◫' }
};

const DEFAULT_FONT_OPTIONS = [
  'Geist',
  'Geist Mono',
  'Chakra Petch',
  'Plus Jakarta Sans',
  'Inter',
  'JetBrains Mono',
  'IBM Plex Mono',
  'Space Mono',
  'Space Grotesk',
  'Outfit',
  'Syne'
];

/**
 * Escapes HTML attributes safely
 */
function escapeAttr(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Generates the glassmorphic CSS stylesheet for the HUD
 */
function getGlassmorphicStyles() {
  return `
/* Studio DNA Engine — HUD Projector Glassmorphic Styles */
.dna-hud-panel {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 360px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  background: rgba(12, 13, 14, 0.78);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  font-family: var(--mono, "Geist Mono", monospace);
  color: #ededed;
  z-index: 99999;
  font-size: 11px;
  line-height: 1.4;
  user-select: none;
}

.dna-hud-header {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
}

.dna-hud-title {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 600;
  color: #888888;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dna-hud-title .live-dot {
  width: 6px;
  height: 6px;
  background: #00ff66;
  border-radius: 50%;
  box-shadow: 0 0 8px #00ff66;
}

.dna-hud-body {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dna-hud-lens {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dna-hud-lens-title {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #666;
  display: flex;
  align-items: center;
  gap: 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding-bottom: 4px;
}

.dna-control-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dna-control-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dna-param-label {
  color: #bbb;
  font-size: 10px;
}

.dna-badge-locked {
  display: inline-block;
  font-size: 9px;
  padding: 1px 4px;
  background: rgba(255, 58, 47, 0.12);
  color: #ff5544;
  border-radius: 3px;
  border: 1px solid rgba(255, 58, 47, 0.25);
}

.dna-control-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dna-hud-select, .dna-hud-text {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  padding: 6px 8px;
  font-family: inherit;
  font-size: 11px;
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}

.dna-hud-select:focus, .dna-hud-text:focus {
  border-color: #3b82f6;
  background: rgba(255, 255, 255, 0.07);
}

.dna-hud-select:disabled, .dna-hud-text:disabled, .dna-hud-range:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.dna-color-picker-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.dna-hud-color-btn {
  -webkit-appearance: none;
  appearance: none;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: none;
  cursor: pointer;
  padding: 0;
}
.dna-hud-color-btn::-webkit-color-swatch-wrapper { padding: 0; }
.dna-hud-color-btn::-webkit-color-swatch { border: none; border-radius: 3px; }

.dna-hud-range {
  flex: 1;
  accent-color: #ededed;
  cursor: pointer;
}

.dna-val-display {
  font-size: 10px;
  color: #888;
  min-width: 38px;
  text-align: right;
}

/* Presets Grid */
.dna-preset-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  margin-bottom: 6px;
}

.dna-preset-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 6px 8px;
  color: #ededed;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-family: inherit;
  font-size: 10px;
  text-align: left;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dna-preset-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.dna-preset-btn.active {
  background: rgba(255, 255, 255, 0.12);
  border-color: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
}

.dna-preset-hdr {
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  font-size: 10px;
}

.dna-preset-sub {
  font-size: 9px;
  color: #888;
}

.dna-preset-swatch {
  height: 3px;
  border-radius: 2px;
  width: 100%;
  margin-top: 3px;
}

/* Hero Brand Copy Dual-Gradient Sync */
#hero .wm h1 {
  background: linear-gradient(135deg, var(--brand-grad-start, #555960), var(--brand-grad-end, #ffffff)) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
  color: transparent !important;
}
#hero .wm h1 span {
  -webkit-text-fill-color: transparent !important;
  color: transparent !important;
}

/* Gooey Liquid Text Reveal Engine (Non-destructive, Vengeance UI inspired) */
.dna-gooey-svg {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  overflow: hidden;
}

#strip .stack {
  filter: url(#dna-gooey-filter);
}

#strip .stack b {
  filter: blur(10px);
  transition: transform .7s cubic-bezier(.2,.7,.2,1), opacity .5s ease, filter .7s cubic-bezier(.2,.7,.2,1) !important;
  will-change: transform, opacity, filter;
}

#strip .stack b.on {
  filter: blur(0px) !important;
}

#strip .stack b.was {
  filter: blur(10px) !important;
}

.dna-gooey-reveal {
  filter: url(#dna-gooey-filter);
  opacity: 0.3;
  transform: translateY(12px);
  transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform, filter;
}

.dna-gooey-reveal.dna-revealed {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
}
`;
}

/**
 * Projects dynamic controls from a framework-neutral DNA IR object
 * @param {Object} dnaIr - Valid DNA IR structure
 * @param {Object} options - Configuration overrides
 * @returns {{ html: string, css: string, controlsCount: number }}
 */
function projectHudFromDnaIr(dnaIr, options = {}) {
  if (!dnaIr || typeof dnaIr !== 'object') {
    throw new Error('DNA IR object required for HUD projection');
  }
  if (!Array.isArray(dnaIr.parameters)) {
    throw new Error('Invalid DNA IR: parameters array required');
  }

  const bindings = Array.isArray(dnaIr.bindings) ? dnaIr.bindings : [];
  const bindingMap = new Map();
  bindings.forEach(b => {
    bindingMap.set(b.paramId, b);
  });

  // Group parameters by category
  const categories = new Map();
  let controlsCount = 0;

  dnaIr.parameters.forEach(param => {
    const cat = param.category || 'general';
    if (!categories.has(cat)) {
      categories.set(cat, []);
    }
    categories.get(cat).push(param);
  });

  const lensSections = [];

  for (const [catKey, params] of categories.entries()) {
    const meta = CATEGORY_METADATA[catKey] || { label: catKey.toUpperCase(), icon: '•' };
    const controlRows = [];

    params.forEach(param => {
      const binding = bindingMap.get(param.id) || { adapter: 'generic', target: 'window', property: param.id };
      const isLocked = param.mutability === 'immutable';
      const disabledAttr = isLocked ? 'disabled' : '';
      const lockedData = isLocked ? 'data-locked="true"' : 'data-locked="false"';
      const paramId = escapeAttr(param.id);
      const adapter = escapeAttr(binding.adapter);
      const target = escapeAttr(binding.target);
      const prop = escapeAttr(binding.property);

      let controlHtml = '';

      switch (param.type) {
        case 'FontSpec': {
          const currentFam = (param.value && param.value.family) || 'Geist';
          const optionsList = DEFAULT_FONT_OPTIONS.includes(currentFam)
            ? DEFAULT_FONT_OPTIONS
            : [currentFam, ...DEFAULT_FONT_OPTIONS];

          const optsHtml = optionsList
            .map(opt => `<option value="${escapeAttr(opt)}" ${opt === currentFam ? 'selected' : ''}>${escapeAttr(opt)}</option>`)
            .join('\n');

          controlHtml = `
            <select class="dna-hud-select"
              data-param-id="${paramId}"
              data-adapter="${adapter}"
              data-target="${target}"
              data-property="${prop}"
              ${lockedData}
              ${disabledAttr}>
              ${optsHtml}
            </select>
          `;
          break;
        }

        case 'ColorHex': {
          const currentHex = String(param.value || '#000000');
          controlHtml = `
            <div class="dna-color-picker-wrap">
              <input type="color" class="dna-hud-color-btn"
                value="${escapeAttr(currentHex)}"
                data-param-id="${paramId}"
                data-adapter="${adapter}"
                data-target="${target}"
                data-property="${prop}"
                ${lockedData}
                ${disabledAttr}>
              <input type="text" class="dna-hud-text"
                value="${escapeAttr(currentHex)}"
                data-param-id="${paramId}"
                data-adapter="${adapter}"
                data-target="${target}"
                data-property="${prop}"
                ${lockedData}
                ${disabledAttr}>
            </div>
          `;
          break;
        }

        case 'ColorGradient': {
          // Dynamic gradient tone multiplier control
          const currentMultiplier = (param.value && typeof param.value === 'object' && param.value.toneRange)
            ? param.value.toneRange[1]
            : 0.31;
          controlHtml = `
            <div class="dna-control-input-group">
              <input type="range" class="dna-hud-range"
                min="0.01" max="1.0" step="0.01"
                value="${currentMultiplier}"
                data-param-id="${paramId}"
                data-adapter="${adapter}"
                data-target="${target}"
                data-property="${prop}"
                ${lockedData}
                ${disabledAttr}>
              <span class="dna-val-display" id="val-${paramId}">${currentMultiplier}</span>
            </div>
          `;
          break;
        }

        case 'NumberRange':
        case 'FrequencyHz': {
          const bounds = param.bounds || {};
          const isFreq = param.type === 'FrequencyHz';
          const min = bounds.min !== undefined ? bounds.min : (isFreq ? 100 : 0);
          const max = bounds.max !== undefined ? bounds.max : (isFreq ? 2000 : 1.0);
          const step = bounds.step !== undefined ? bounds.step : (isFreq ? 10 : 0.01);
          const unit = bounds.unit || (isFreq ? 'Hz' : '');
          const currentVal = typeof param.value === 'number' ? param.value : min;

          controlHtml = `
            <div class="dna-control-input-group">
              <input type="range" class="dna-hud-range"
                min="${min}" max="${max}" step="${step}"
                value="${currentVal}"
                data-param-id="${paramId}"
                data-adapter="${adapter}"
                data-target="${target}"
                data-property="${prop}"
                ${lockedData}
                ${disabledAttr}>
              <span class="dna-val-display" id="val-${paramId}">${currentVal}${unit}</span>
            </div>
          `;
          break;
        }

        case 'StringText': {
          const currentText = String(param.value || '');
          controlHtml = `
            <input type="text" class="dna-hud-text"
              value="${escapeAttr(currentText)}"
              data-param-id="${paramId}"
              data-adapter="${adapter}"
              data-target="${target}"
              data-property="${prop}"
              ${lockedData}
              ${disabledAttr}>
          `;
          break;
        }

        default: {
          // Generic fallback control
          controlHtml = `
            <input type="text" class="dna-hud-text"
              value="${escapeAttr(JSON.stringify(param.value))}"
              data-param-id="${paramId}"
              data-adapter="${adapter}"
              data-target="${target}"
              data-property="${prop}"
              ${lockedData}
              ${disabledAttr}>
          `;
          break;
        }
      }

      const lockedBadge = isLocked ? '<span class="dna-badge-locked is-locked">LOCKED</span>' : '';

      controlRows.push(`
        <div class="dna-control-row">
          <div class="dna-control-header">
            <span class="dna-param-label">${escapeAttr(param.id)}</span>
            ${lockedBadge}
          </div>
          ${controlHtml}
        </div>
      `);
      controlsCount++;
    });

    lensSections.push(`
      <div class="dna-hud-lens" data-lens="${escapeAttr(catKey)}">
        <div class="dna-hud-lens-title">
          <span>${meta.icon}</span>
          <span>${escapeAttr(meta.label)}</span>
        </div>
        ${controlRows.join('\n')}
      </div>
    `);
  }

  const presetsSection = `
    <div class="dna-hud-lens" data-lens="presets">
      <div class="dna-hud-lens-title">
        <span>🎛️</span>
        <span>Design Presets</span>
      </div>
      <div class="dna-preset-grid">
        <button type="button" class="dna-preset-btn active" data-preset="swiss">
          <div class="dna-preset-hdr"><span>🇨🇭</span><span>Swiss Alpine</span></div>
          <div class="dna-preset-sub">OP–XY · Geist</div>
          <div class="dna-preset-swatch" style="background: linear-gradient(90deg, #101112, #c2cad4);"></div>
        </button>
        <button type="button" class="dna-preset-btn" data-preset="berlin">
          <div class="dna-preset-hdr"><span>🇩🇪</span><span>Berlin Steel</span></div>
          <div class="dna-preset-sub">KRONOS–8 · JetBrains</div>
          <div class="dna-preset-swatch" style="background: linear-gradient(90deg, #09140d, #4ee884);"></div>
        </button>
        <button type="button" class="dna-preset-btn" data-preset="braun">
          <div class="dna-preset-hdr"><span>🇩🇪</span><span>Braun Heritage</span></div>
          <div class="dna-preset-sub">MODUL–01 · Plus Jakarta</div>
          <div class="dna-preset-swatch" style="background: linear-gradient(90deg, #161310, #e8a964);"></div>
        </button>
        <button type="button" class="dna-preset-btn" data-preset="tokyo">
          <div class="dna-preset-hdr"><span>🇯🇵</span><span>Tokyo Neo</span></div>
          <div class="dna-preset-sub">AETHEL–XY · Syne</div>
          <div class="dna-preset-swatch" style="background: linear-gradient(90deg, #070f1a, #00e5ff);"></div>
        </button>
        <button type="button" class="dna-preset-btn" data-preset="aura">
          <div class="dna-preset-hdr"><span>🇸🇪</span><span>Aura Precision</span></div>
          <div class="dna-preset-sub">AURA–XY · Inter</div>
          <div class="dna-preset-swatch" style="background: linear-gradient(90deg, #0c0f17, #60a5fa);"></div>
        </button>
      </div>
    </div>
  `;

  const expId = escapeAttr(dnaIr.experienceId || 'DNA Experience');

  const html = `
<div id="dna-tuning-hud" class="dna-hud-panel" data-experience="${expId}">
  <div class="dna-hud-header">
    <div class="dna-hud-title">
      <span class="live-dot"></span>
      <span>${expId} — DNA HUD</span>
    </div>
    <span style="color: #666; font-size: 10px;">v${escapeAttr(dnaIr.schemaVersion || '0.1.0')}</span>
  </div>
  <div class="dna-hud-body">
    ${presetsSection}
    ${lensSections.join('\n')}
  </div>
</div>
  `.trim();

  return {
    html,
    css: getGlassmorphicStyles(),
    controlsCount
  };
}

/**
 * Injects the projected HUD and its runtime listener into an HTML string
 * @param {string} html - Target HTML content
 * @param {Object} dnaIr - Framework-neutral DNA IR object
 * @returns {string} Injected HTML
 */
function injectDnaHud(html, dnaIr) {
  if (!html || typeof html !== 'string') return html;

  // If already present, clean existing HUD elements first for idempotent re-projection
  html = html.replace(/<style id="dna-hud-styles">[\s\S]*?<\/style>\s*/gi, '');
  html = html.replace(/<svg id="dna-gooey-svg"[\s\S]*?<\/svg>\s*/gi, '');
  html = html.replace(/<div id="dna-tuning-hud"[\s\S]*?<script id="dna-hud-runtime">[\s\S]*?<\/script>\s*/gi, '');
  html = html.replace(/(?:<div class="dna-hud-lens"[\s\S]*?<\/div>\s*)+/gi, '');
  html = html.replace(/<div id="dna-tuning-hud"[\s\S]*?<\/div>\s*<\/div>\s*/gi, '');
  html = html.replace(/<script id="dna-hud-runtime">[\s\S]*?<\/script>\s*/gi, '');

  // Ensure high-fidelity web fonts are available for distinct preset typography
  const fontsLink = '<link rel="stylesheet" id="dna-web-fonts" href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Geist+Mono:wght@400;600&family=Geist:wght@400;600;700&family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Space+Grotesk:wght@500;700&family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap">';
  if (!html.includes('id="dna-web-fonts"')) {
    html = html.includes('</head>')
      ? html.replace('</head>', fontsLink + '\n</head>')
      : fontsLink + '\n' + html;
  }

  const projected = projectHudFromDnaIr(dnaIr);
  const runtimePayload = `
<style id="dna-hud-styles">
${projected.css}
</style>
<svg id="dna-gooey-svg" class="dna-gooey-svg" style="position: absolute; width: 0; height: 0; pointer-events: none; overflow: hidden;" aria-hidden="true">
  <defs>
    <filter id="dna-gooey-filter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140" result="gooey" />
      <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
    </filter>
  </defs>
</svg>
${projected.html}
<script id="dna-hud-runtime">
(function() {
  const hud = document.getElementById('dna-tuning-hud');
  if (!hud) return;

  const PRESET_CONFIGS = {
    swiss: {
      fonts: { sans: 'Geist', mono: 'Geist Mono' },
      colors: {
        '--bg': '#0c0d0e',
        '--surface': '#151618',
        '--surface-raised': '#1c1e22',
        '--border': 'rgba(255, 255, 255, 0.08)',
        '--fg': '#e2e4e8',
        '--fg-dim': '#8b8f97',
        '--rec': '#ff3a2f',
        '--status-lens': '#00ffaa'
      },
      gradient: { startHex: '#121314', endHex: '#c0c8d2' },
      textGradient: { start: '#555960', end: '#ffffff' },
      copy: {
        brand: 'OP–XY',
        price: '$2,299',
        claim: 'a synthesizer, a sampler and a sequencer. one instrument, all black.',
        specs: 'four rows · 68 keys · one grayscale'
      }
    },
    berlin: {
      fonts: { sans: 'Chakra Petch', mono: 'JetBrains Mono' },
      colors: {
        '--bg': '#070809',
        '--surface': '#0e1012',
        '--surface-raised': '#15191c',
        '--border': 'rgba(0, 255, 102, 0.12)',
        '--fg': '#dce8e0',
        '--fg-dim': '#768c7e',
        '--rec': '#00ff66',
        '--status-lens': '#00ff66'
      },
      gradient: { startHex: '#09140d', endHex: '#4ee884' },
      textGradient: { start: '#00ff66', end: '#dcfce7' },
      copy: {
        brand: 'KRONOS–8',
        price: '€2,450',
        claim: 'sixteen raw analog tracks. forged in dark steel, engineered for the floor.',
        specs: '68 microswitches · zero latency · phosphor display'
      }
    },
    braun: {
      fonts: { sans: 'Plus Jakarta Sans', mono: 'IBM Plex Mono' },
      colors: {
        '--bg': '#131211',
        '--surface': '#1c1a18',
        '--surface-raised': '#262320',
        '--border': 'rgba(235, 215, 195, 0.10)',
        '--fg': '#f2ece2',
        '--fg-dim': '#a1978a',
        '--rec': '#e8590c',
        '--status-lens': '#f59f00'
      },
      gradient: { startHex: '#161310', endHex: '#e8a964' },
      textGradient: { start: '#e8590c', end: '#fef08a' },
      copy: {
        brand: 'MODUL–01',
        price: '$1,950',
        claim: 'order, clarity and restraint. an honest instrument for timeless sound design.',
        specs: '68 precision contacts · matte chassis · tactile feedback'
      }
    },
    tokyo: {
      fonts: { sans: 'Syne', mono: 'Space Mono' },
      colors: {
        '--bg': '#090b10',
        '--surface': '#10141d',
        '--surface-raised': '#18202f',
        '--border': 'rgba(0, 229, 255, 0.12)',
        '--fg': '#e2e9f5',
        '--fg-dim': '#7e90b0',
        '--rec': '#00e5ff',
        '--status-lens': '#00e5ff'
      },
      gradient: { startHex: '#070f1a', endHex: '#00e5ff' },
      textGradient: { start: '#00e5ff', end: '#38bdf8' },
      copy: {
        brand: 'AETHEL–XY',
        price: '¥348,000',
        claim: 'physical modeling meets generative sequencing. precision in every touch.',
        specs: '68 micro-actuated keys · haptic feedback · dual neural dsp'
      }
    },
    aura: {
      fonts: { sans: 'Inter', mono: 'Geist Mono' },
      colors: {
        '--bg': '#0a0c10',
        '--surface': '#12151c',
        '--surface-raised': '#1a1f29',
        '--border': 'rgba(99, 102, 241, 0.14)',
        '--fg': '#e2e8f0',
        '--fg-dim': '#818cf8',
        '--rec': '#6366f1',
        '--status-lens': '#38bdf8'
      },
      gradient: { startHex: '#0c0f17', endHex: '#60a5fa' },
      textGradient: { start: '#818cf8', end: '#ffffff' },
      copy: {
        brand: 'AURA–XY',
        price: '$2,199',
        claim: 'sculpted from raw aluminum. twenty-four voices in an ethereal sonic field.',
        specs: '68 magnetic switches · ultra-low jitter · titanium casing'
      }
    }
  };

  function parseHex(h) {
    let c = h.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const n = parseInt(c, 16);
    return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
  }

  function get16Steps(startH, endH) {
    const c1 = parseHex(startH), c2 = parseHex(endH);
    const arr = [];
    for (let i = 0; i < 16; i++) {
      const t = i / 15;
      const u = Math.pow(t, 1.3);
      arr.push({
        r: c1.r + (c2.r - c1.r) * u,
        g: c1.g + (c2.g - c1.g) * u,
        b: c1.b + (c2.b - c1.b) * u
      });
    }
    return arr;
  }

  function applyPreset(key) {
    const cfg = PRESET_CONFIGS[key] || PRESET_CONFIGS.swiss;
    const steps = get16Steps(cfg.gradient.startHex, cfg.gradient.endHex);

    // 1. Sincroniza Three.js Backdrop Bars
    if (window.OPXY && Array.isArray(window.OPXY.bars)) {
      window.OPXY.bars.forEach((b, i) => {
        if (b.material && b.material.color) {
          const s = steps[i];
          b.userData.toneR = s.r;
          b.userData.toneG = s.g;
          b.userData.toneB = s.b;
          b.material.color.setRGB(s.r, s.g, s.b);
        }
      });
    }

    // 2. Sincroniza Three.js Sequencer Step Buttons (key-22..37) preservando LEDs e Física
    if (window.OPXY && window.OPXY.controls) {
      for (let i = 0; i < 16; i++) {
        const kId = 'key-' + (22 + i);
        const c = window.OPXY.controls[kId];
        const s = steps[i];
        if (c && s) {
          c.traverse(o => {
            if (o.isMesh && o.material) {
              const isStep = /base|cap/i.test(o.name) || /Grayscale step/i.test(o.material.name || '');
              const isLed = /LED|cavity/i.test(o.name) || /Soft white LED/i.test(o.material.name || '');
              if (isStep && !isLed) {
                if (o.material.color && typeof o.material.color.setRGB === 'function') {
                  o.material.color.setRGB(s.r, s.g, s.b);
                }
              }
            }
          });
        }
      }
    }

    // 3. Sincroniza Hardware Accent Color
    if (typeof window.OPXY_UPDATE_ACCENT === 'function') {
      window.OPXY_UPDATE_ACCENT(cfg.colors['--rec']);
    } else if (window.OPXY && window.OPXY.controls && window.OPXY.controls['key-39']) {
      const recC = parseHex(cfg.colors['--rec']);
      window.OPXY.controls['key-39'].traverse(o => {
        if (o.isMesh && o.material && o.material.color && !/LED/i.test(o.name)) {
          o.material.color.setRGB(recC.r, recC.g, recC.b);
        }
      });
    }

    // 4. Sincroniza CSS Variables, Fontes & Gradiente do Brand Copy
    const root = document.documentElement;
    root.style.setProperty('--sans', cfg.fonts.sans);
    root.style.setProperty('--mono', cfg.fonts.mono);
    if (cfg.textGradient) {
      root.style.setProperty('--brand-grad-start', cfg.textGradient.start);
      root.style.setProperty('--brand-grad-end', cfg.textGradient.end);
    }
    for (const [vKey, vVal] of Object.entries(cfg.colors)) {
      root.style.setProperty(vKey, vVal);
      if (vKey === '--bg') document.body.style.backgroundColor = vVal;
    }

    // 5. Sincroniza DOM Copy
    document.querySelectorAll('#hero .wm h1, #nav .wm, #hero h1').forEach(el => {
      el.textContent = cfg.copy.brand;
    });
    const claimEl = document.querySelector('#hero .claim');
    if (claimEl) claimEl.textContent = cfg.copy.claim;
    const specsEl = document.querySelector('#strip .specs');
    if (specsEl) specsEl.textContent = cfg.copy.specs;

    // 6. Atualiza UI dos botões de preset no HUD
    hud.querySelectorAll('.dna-preset-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-preset') === key);
    });

    // 7. Sincroniza selects de tipografia no HUD
    const fontSelect = hud.querySelector('[data-param-id="hero.typography.primary"]');
    if (fontSelect) fontSelect.value = cfg.fonts.sans;
    const monoSelect = hud.querySelector('[data-param-id="hero.typography.technical"]');
    if (monoSelect) monoSelect.value = cfg.fonts.mono;

    if (window.OPXY && typeof window.OPXY.dirty === 'function') {
      window.OPXY.dirty();
    }
  }

  window.OPXY_APPLY_PRESET = applyPreset;

  hud.querySelectorAll('.dna-preset-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const preset = this.getAttribute('data-preset');
      applyPreset(preset);
    });
  });

  hud.addEventListener('input', function(e) {
    const target = e.target;
    const paramId = target.getAttribute('data-param-id');
    const adapter = target.getAttribute('data-adapter');
    const prop = target.getAttribute('data-property');
    const val = target.value;

    const valDisplay = document.getElementById('val-' + paramId);
    if (valDisplay) valDisplay.textContent = val;

    if (adapter === 'css') {
      document.documentElement.style.setProperty(prop, val);
    } else if (adapter === 'three') {
      if (window.OPXY && window.OPXY.backdrop && window.OPXY.backdrop.bars) {
        if (prop === 'toneMultiplier') {
          const mult = parseFloat(val);
          window.OPXY.backdrop.bars.forEach((b, idx) => {
            if (b.material && b.material.color) {
              const base = 0.01 + (idx / 16) * 0.30;
              b.material.color.setScalar(base * mult);
            }
          });
        }
      }
    } else if (adapter === 'dom') {
      const sel = target.getAttribute('data-target');
      if (sel) {
        const el = document.querySelector(sel);
        if (el) el.textContent = val;
      }
    }
  });

  hud.addEventListener('change', function(e) {
    const target = e.target;
    const adapter = target.getAttribute('data-adapter');
    const prop = target.getAttribute('data-property');
    const val = target.value;
    if (adapter === 'css') {
      document.documentElement.style.setProperty(prop, val);
    }
  });

  // 8. Gooey Reveal Observer para os demais textos da página
  if ('IntersectionObserver' in window) {
    const gooeyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('dna-revealed');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.dna-gooey-reveal, #hero .claim, #engines h2, #seq h2, #close h2').forEach(el => {
      el.classList.add('dna-gooey-reveal');
      gooeyObserver.observe(el);
    });
  }
})();
</script>
`;

  return html.includes('</body>')
    ? html.replace('</body>', runtimePayload + '\n</body>')
    : html + runtimePayload;
}

module.exports = {
  projectHudFromDnaIr,
  generateHudMarkup: projectHudFromDnaIr,
  getGlassmorphicStyles,
  injectDnaHud
};
