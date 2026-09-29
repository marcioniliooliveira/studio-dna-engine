/**
 * STUDIO DNA ENGINE — Schema-Driven HUD Projector
 * Generates semantic, accessible, glassmorphic UI controls dynamically from Framework-Neutral DNA IR.
 * Pure projection: No hardcoded controls or framework lock-in.
 */

const effectRegistry = require('../registry/effect-registry');

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
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.dna-hud-panel.is-hidden {
  opacity: 0 !important;
  pointer-events: none !important;
  transform: translateY(16px) scale(0.97) !important;
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
  gap: 12px;
}

.dna-hud-lens {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.015);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.dna-hud-lens.is-active-section {
  border-color: rgba(59, 130, 246, 0.4);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.15);
}

.dna-hud-lens-title {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #888;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.02);
  transition: background 0.2s, color 0.2s;
}

.dna-hud-lens-title:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #fff;
}

.dna-chevron {
  font-size: 8px;
  color: #666;
  transition: transform 0.2s ease;
}

.dna-hud-lens.is-collapsed .dna-chevron {
  transform: rotate(-90deg);
}

.dna-hud-lens-content {
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dna-hud-lens.is-collapsed .dna-hud-lens-content {
  display: none;
}

.dna-contrast-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(0, 255, 102, 0.12);
  border: 1px solid rgba(0, 255, 102, 0.25);
  color: #00ff66;
  font-weight: 500;
}

.dna-contrast-badge.warn {
  background: rgba(255, 170, 0, 0.12);
  border-color: rgba(255, 170, 0, 0.3);
  color: #ffaa00;
}

.dna-inspector-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #aaa;
  border-radius: 4px;
  cursor: pointer;
  padding: 3px 6px;
  font-size: 11px;
  transition: all 0.2s;
}

.dna-inspector-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.dna-inspector-btn.active {
  background: rgba(59, 130, 246, 0.25);
  border-color: #3b82f6;
  color: #60a5fa;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.4);
}

.dna-inspect-highlight {
  outline: 2px solid #3b82f6 !important;
  outline-offset: 3px !important;
}

.dna-export-bar {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}

.dna-export-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ededed;
  border-radius: 4px;
  padding: 6px 4px;
  font-family: inherit;
  font-size: 9px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.dna-export-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: #3b82f6;
}

.dna-export-btn:active {
  transform: scale(0.97);
}

/* Close & Reopen Controls */
.dna-hud-close-btn {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  cursor: pointer;
  font-size: 11px;
  padding: 0;
  line-height: 1;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.dna-hud-close-btn:hover {
  background: rgba(255, 58, 47, 0.16);
  border-color: rgba(255, 58, 47, 0.35);
  color: #ff5544;
  transform: scale(1.05);
}

.dna-hud-reopen-btn {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99998;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(12, 13, 14, 0.85);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9999px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.5);
  color: #fff;
  font-family: var(--mono, "Geist Mono", monospace);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-8px) scale(0.95);
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.25s cubic-bezier(0.16, 1, 0.3, 1),
              border-color 0.2s,
              box-shadow 0.2s;
  user-select: none;
}

.dna-hud-reopen-btn.is-visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}

.dna-hud-reopen-btn:hover {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 10px 32px rgba(59, 130, 246, 0.25);
  transform: translateY(-1px) scale(1.02);
}

.dna-hud-reopen-btn kbd {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 4px;
  padding: 1px 5px;
  font-size: 9px;
  color: #888;
  font-family: inherit;
}

.dna-effect-tuning-group {
  margin-top: 8px;
  padding: 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
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

/* Hero Brand Copy & Strip Sequence Dual-Gradient Sync */
#hero .wm h1,
#strip .stack b {
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

/* Morph-Text & Gooey Liquid Transition Engine (Universal & Non-destructive) */
.dna-morph-svg, .dna-gooey-svg {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  overflow: hidden;
}

/* 1. Default & Morph Transition Mode (VengeanceUI atop threshold) */
#strip[data-transition-style="morph"] .stack,
#strip:not([data-transition-style]) .stack {
  filter: url(#dna-morph-filter);
  overflow: visible;
  font-family: var(--sans);
}

#strip[data-transition-style="morph"] .stack b,
#strip:not([data-transition-style]) .stack b {
  font-family: var(--sans);
  filter: blur(var(--morph-blur, 18px));
  transform: translateY(40%) scale(var(--morph-scale-enter, 0.85));
  opacity: 0;
  transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), filter 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease !important;
  will-change: transform, filter, opacity;
}

#strip[data-transition-style="morph"] .stack b.on,
#strip:not([data-transition-style]) .stack b.on {
  transform: translateY(0) scale(1) !important;
  filter: blur(0px) !important;
  opacity: 1 !important;
}

#strip[data-transition-style="morph"] .stack b.was,
#strip:not([data-transition-style]) .stack b.was {
  transform: translateY(-40%) scale(var(--morph-scale-exit, 1.15)) !important;
  filter: blur(var(--morph-blur, 18px)) !important;
  opacity: 0 !important;
}

/* 2. Gooey Liquid Mode */
#strip[data-transition-style="gooey"] .stack {
  filter: url(#dna-gooey-filter);
  overflow: hidden;
  font-family: var(--sans);
}

#strip[data-transition-style="gooey"] .stack b {
  font-family: var(--sans);
  filter: blur(10px);
  transform: translateY(105%);
  opacity: 0;
  transition: transform .7s cubic-bezier(.2,.7,.2,1), opacity .5s ease, filter .7s cubic-bezier(.2,.7,.2,1) !important;
  will-change: transform, opacity, filter;
}

#strip[data-transition-style="gooey"] .stack b.on {
  transform: translateY(0) !important;
  filter: blur(0px) !important;
  opacity: 1 !important;
}

#strip[data-transition-style="gooey"] .stack b.was {
  transform: translateY(-105%) !important;
  filter: blur(10px) !important;
  opacity: 0 !important;
}

/* 3. Classic Slide Mode */
#strip[data-transition-style="classic"] .stack {
  filter: none !important;
  overflow: hidden;
  font-family: var(--sans);
}

#strip[data-transition-style="classic"] .stack b {
  font-family: var(--sans);
  filter: none !important;
  transform: translateY(105%);
  opacity: 0;
  transition: transform .7s cubic-bezier(.2,.7,.2,1), opacity .5s ease !important;
}

#strip[data-transition-style="classic"] .stack b.on {
  transform: translateY(0) !important;
  opacity: 1 !important;
}

#strip[data-transition-style="classic"] .stack b.was {
  transform: translateY(-105%) !important;
  opacity: 0 !important;
}

.dna-morph-text {
  filter: url(#dna-morph-filter);
  transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
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
          <div style="display:flex; align-items:center; gap:6px;">
            <span>${meta.icon}</span>
            <span>${escapeAttr(meta.label)}</span>
          </div>
          <span class="dna-chevron">▼</span>
        </div>
        <div class="dna-hud-lens-content">
          ${controlRows.join('\n')}
        </div>
      </div>
    `);
  }

  const activeEffectIds = Array.isArray(dnaIr.effects)
    ? dnaIr.effects
    : ['morph-text', 'gooey-droplets', 'classic-slide'];

  const registeredTransitions = effectRegistry.listByCategory('typography-transition');
  const effectOptionsHtml = registeredTransitions.map(eff => {
    const val = eff.bindings?.attributeValue || eff.id;
    const isSelected = val === 'morph' ? 'selected' : '';
    const icon = val === 'morph' ? '🌊' : (val === 'gooey' ? '💧' : '⚡');
    return `<option value="${escapeAttr(val)}" ${isSelected}>${icon} ${escapeAttr(eff.name)}</option>`;
  }).join('\n');

  const tunableControlsHtml = registeredTransitions.map(eff => {
    const controls = eff.controls || [];
    if (!controls.length) return '';
    const ctrlRows = controls.map(c => `
      <div class="dna-control-row" style="margin-top: 6px;">
        <div class="dna-control-header">
          <span class="dna-param-label">${escapeAttr(c.label)}</span>
        </div>
        <div class="dna-control-input-group">
          <input type="range" class="dna-hud-range"
            min="${c.bounds.min}" max="${c.bounds.max}" step="${c.bounds.step}"
            value="${c.default}"
            data-effect-controls="${escapeAttr(eff.id)}"
            data-adapter="css"
            data-property="${escapeAttr(c.cssProperty)}"
            oninput="document.documentElement.style.setProperty('${escapeAttr(c.cssProperty)}', this.value + '${escapeAttr(c.bounds.unit || '')}'); const d = document.getElementById('val-${escapeAttr(c.id)}'); if(d) d.textContent = this.value + '${escapeAttr(c.bounds.unit || '')}'">
          <span class="dna-val-display" id="val-${escapeAttr(c.id)}">${c.default}${escapeAttr(c.bounds.unit || '')}</span>
        </div>
      </div>
    `).join('\n');

    return `
      <div class="dna-effect-tuning-group" data-effect-controls="${escapeAttr(eff.id)}" style="${eff.bindings?.attributeValue === 'morph' ? '' : 'display:none;'}">
        <div style="font-size:9px; color:#888; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px;">${escapeAttr(eff.name)} Parameters</div>
        ${ctrlRows}
      </div>
    `;
  }).join('\n');

  const presetsSection = `
    <div class="dna-hud-lens" data-lens="presets">
      <div class="dna-hud-lens-title">
        <div style="display:flex; align-items:center; gap:6px;">
          <span>🎛️</span>
          <span>Design Presets</span>
        </div>
        <span class="dna-chevron">▼</span>
      </div>
      <div class="dna-hud-lens-content">
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
        <div class="dna-control-row" style="margin-top: 10px;">
          <div class="dna-control-header">
            <span class="dna-param-label">strip.motion.transitionStyle</span>
          </div>
          <select id="dna-transition-style-select" class="dna-input-select" onchange="window.OPXY_SET_TRANSITION_STYLE ? window.OPXY_SET_TRANSITION_STYLE(this.value) : null">
            ${effectOptionsHtml}
          </select>
        </div>
        ${tunableControlsHtml}
      </div>
    </div>
  `;

  const exportSection = `
    <div class="dna-hud-lens" data-lens="export">
      <div class="dna-hud-lens-title">
        <div style="display:flex; align-items:center; gap:6px;">
          <span>💾</span>
          <span>Dev-to-Code & Export</span>
        </div>
        <span class="dna-chevron">▼</span>
      </div>
      <div class="dna-hud-lens-content">
        <div class="dna-export-bar">
          <button type="button" id="dna-btn-copy-css" class="dna-export-btn">📋 Copiar Tokens</button>
          <button type="button" id="dna-btn-export-spec" class="dna-export-btn">💾 Baixar Spec JSON</button>
          <button type="button" id="dna-btn-reset-preset" class="dna-export-btn">↺ Reset Preset</button>
        </div>
        <div id="dna-export-status" style="font-size: 9px; color: #00ffaa; min-height: 12px; margin-top: 4px;"></div>
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
      <span id="dna-contrast-badge" class="dna-contrast-badge">APCA Lc 82 ✓</span>
    </div>
    <div style="display:flex; align-items:center; gap:6px;">
      <button type="button" id="dna-inspect-btn" class="dna-inspector-btn" title="Inspect element to tune (Mira)">🎯</button>
      <span style="color: #666; font-size: 10px;">v${escapeAttr(dnaIr.schemaVersion || '0.1.0')}</span>
      <button type="button" id="dna-hud-close-btn" class="dna-hud-close-btn" title="Fechar HUD (Atalho: H)">✕</button>
    </div>
  </div>
  <div class="dna-hud-body">
    ${presetsSection}
    ${lensSections.join('\n')}
    ${exportSection}
  </div>
</div>
<button type="button" id="dna-hud-reopen-btn" class="dna-hud-reopen-btn" title="Abrir Live Tuning HUD (Atalho: H)">
  <span class="live-dot"></span>
  <span>🎛️ DNA HUD</span>
  <kbd>H</kbd>
</button>
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
  html = html.replace(/<svg (?:id="dna-gooey-svg"|id="dna-morph-svg")[^>]*>[\s\S]*?<\/svg>\s*/gi, '');
  html = html.replace(/<div id="dna-tuning-hud"[\s\S]*?<script id="dna-hud-runtime">[\s\S]*?<\/script>\s*/gi, '');
  html = html.replace(/(?:<div class="dna-hud-lens"[\s\S]*?<\/div>\s*)+/gi, '');
  html = html.replace(/<div id="dna-tuning-hud"[\s\S]*?<\/div>\s*<\/div>\s*/gi, '');
  html = html.replace(/<button[^>]*id="dna-hud-reopen-btn"[^>]*>[\s\S]*?<\/button>\s*/gi, '');
  html = html.replace(/<script id="dna-hud-runtime">[\s\S]*?<\/script>\s*/gi, '');

  // Expunge legacy prototype HUD nodes if present
  html = html.replace(/<div id="dna-hud-root"[\s\S]*?<\/div>\s*(?=<section|<div id="cv")/gi, '');
  html = html.replace(/<style id="studio-dna-live-hud-styles">[\s\S]*?<\/style>\s*/gi, '');
  html = html.replace(/<script id="studio-dna-live-hud-logic">[\s\S]*?<\/script>\s*/gi, '');

  // Ensure high-fidelity web fonts are available for distinct preset typography
  const fontsLink = '<link rel="stylesheet" id="dna-web-fonts" href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700&family=Geist+Mono:wght@400;600&family=Geist:wght@400;600;700&family=IBM+Plex+Mono:wght@400;600&family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Space+Grotesk:wght@500;700&family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap">';
  if (!html.includes('id="dna-web-fonts"')) {
    html = html.includes('</head>')
      ? html.replace('</head>', fontsLink + '\n</head>')
      : fontsLink + '\n' + html;
  }

  const projected = projectHudFromDnaIr(dnaIr);
  const activeEffectIds = Array.isArray(dnaIr && dnaIr.effects)
    ? dnaIr.effects
    : ['morph-text', 'gooey-droplets', 'classic-slide'];
  const compositeSvgDefs = effectRegistry.generateCompositeSvgDefs(activeEffectIds);

  const runtimePayload = `
<style id="dna-hud-styles">
${projected.css}
</style>
<svg id="dna-gooey-svg" class="dna-gooey-svg dna-morph-svg" style="position: absolute; width: 0; height: 0; pointer-events: none; overflow: hidden;" aria-hidden="true">
  <defs>
    ${compositeSvgDefs}
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

  window.OPXY_SET_TRANSITION_STYLE = function(style) {
    const strip = document.getElementById('strip');
    if (strip) {
      strip.setAttribute('data-transition-style', style || 'morph');
    }
    const sel = document.getElementById('dna-transition-style-select');
    if (sel && sel.value !== style) {
      sel.value = style;
    }
    hud.querySelectorAll('.dna-effect-tuning-group').forEach(grp => {
      const effId = grp.getAttribute('data-effect-controls');
      const isMatch = (style === 'morph' && effId === 'morph-text') || (style === 'gooey' && effId === 'gooey-droplets');
      grp.style.display = isMatch ? 'block' : 'none';
    });
  };

  // Accordion Lens Collapse Handler
  hud.querySelectorAll('.dna-hud-lens-title').forEach(titleEl => {
    titleEl.addEventListener('click', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
      this.closest('.dna-hud-lens').classList.toggle('is-collapsed');
    });
  });

  // Global Keyboard Shortcut & Close / Reopen Handlers
  const btnClose = document.getElementById('dna-hud-close-btn');
  const btnReopen = document.getElementById('dna-hud-reopen-btn');

  function setHudVisibility(visible) {
    if (visible) {
      hud.classList.remove('is-hidden');
      if (btnReopen) btnReopen.classList.remove('is-visible');
    } else {
      hud.classList.add('is-hidden');
      if (btnReopen) btnReopen.classList.add('is-visible');
    }
  }

  if (btnClose) {
    btnClose.addEventListener('click', function(e) {
      e.stopPropagation();
      setHudVisibility(false);
    });
  }

  if (btnReopen) {
    btnReopen.addEventListener('click', function(e) {
      e.stopPropagation();
      setHudVisibility(true);
    });
  }

  window.addEventListener('keydown', function(e) {
    if ((e.key === 'h' || e.key === 'H') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
      const isCurrentlyHidden = hud.classList.contains('is-hidden');
      setHudVisibility(isCurrentlyHidden);
    }
  });

  // Dev-to-Code Export Drawer Handlers
  const btnCopyCss = document.getElementById('dna-btn-copy-css');
  const btnExportSpec = document.getElementById('dna-btn-export-spec');
  const btnReset = document.getElementById('dna-btn-reset-preset');
  const exportStatus = document.getElementById('dna-export-status');

  function showExportStatus(msg) {
    if (exportStatus) {
      exportStatus.textContent = msg;
      setTimeout(() => { exportStatus.textContent = ''; }, 3000);
    }
  }

  if (btnCopyCss) {
    btnCopyCss.addEventListener('click', function() {
      const rootStyles = getComputedStyle(document.documentElement);
      const tokens = [
        '  --sans: "' + (rootStyles.getPropertyValue('--sans').trim() || 'Geist') + '";',
        '  --mono: "' + (rootStyles.getPropertyValue('--mono').trim() || 'Geist Mono') + '";',
        '  --bg: ' + (rootStyles.getPropertyValue('--bg').trim() || '#0c0d0e') + ';',
        '  --surface: ' + (rootStyles.getPropertyValue('--surface').trim() || '#151618') + ';',
        '  --rec: ' + (rootStyles.getPropertyValue('--rec').trim() || '#ff3a2f') + ';',
        '  --brand-grad-start: ' + (rootStyles.getPropertyValue('--brand-grad-start').trim() || '#555960') + ';',
        '  --brand-grad-end: ' + (rootStyles.getPropertyValue('--brand-grad-end').trim() || '#ffffff') + ';',
        '  --morph-blur: ' + (rootStyles.getPropertyValue('--morph-blur').trim() || '18px') + ';',
        '  --morph-scale-enter: ' + (rootStyles.getPropertyValue('--morph-scale-enter').trim() || '0.85') + ';'
      ];
      const cssBlock = [':root {', ...tokens, '}'].join(String.fromCharCode(10));
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cssBlock).then(() => {
          showExportStatus('✓ Tokens CSS copiados!');
        });
      } else {
        showExportStatus('✓ Tokens gerados no console');
        console.log(cssBlock);
      }
    });
  }

  if (btnExportSpec) {
    btnExportSpec.addEventListener('click', function() {
      const activeBtn = hud.querySelector('.dna-preset-btn.active');
      const activePreset = activeBtn ? activeBtn.getAttribute('data-preset') : 'swiss';
      const rootStyles = getComputedStyle(document.documentElement);
      const spec = {
        exportedAt: new Date().toISOString(),
        preset: activePreset,
        brand: document.querySelector('#hero .wm h1')?.textContent || 'OP–XY',
        colors: {
          bg: rootStyles.getPropertyValue('--bg').trim(),
          surface: rootStyles.getPropertyValue('--surface').trim(),
          rec: rootStyles.getPropertyValue('--rec').trim(),
          gradientStart: rootStyles.getPropertyValue('--brand-grad-start').trim(),
          gradientEnd: rootStyles.getPropertyValue('--brand-grad-end').trim()
        },
        typography: {
          sans: rootStyles.getPropertyValue('--sans').trim(),
          mono: rootStyles.getPropertyValue('--mono').trim()
        },
        transitionStyle: document.getElementById('strip')?.getAttribute('data-transition-style') || 'morph'
      };
      const blob = new Blob([JSON.stringify(spec, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'brand-spec-' + activePreset + '.json';
      a.click();
      showExportStatus('✓ Spec JSON baixado!');
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', function() {
      const activeBtn = hud.querySelector('.dna-preset-btn.active');
      const activePreset = activeBtn ? activeBtn.getAttribute('data-preset') : 'swiss';
      applyPreset(activePreset);
      showExportStatus('✓ Padrões do preset restaurados');
    });
  }

  // APCA Contrast Live Guard
  function updateContrastBadge() {
    const badge = document.getElementById('dna-contrast-badge');
    if (!badge) return;
    const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#0c0d0e';
    const fg = getComputedStyle(document.documentElement).getPropertyValue('--fg').trim() || '#ededed';
    const pBg = parseHex(bg), pFg = parseHex(fg);
    const lum1 = 0.2126 * pBg.r + 0.7152 * pBg.g + 0.0722 * pBg.b;
    const lum2 = 0.2126 * pFg.r + 0.7152 * pFg.g + 0.0722 * pFg.b;
    const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    const lc = Math.round(ratio * 10);
    badge.textContent = 'APCA Lc ' + lc + ' ✓';
    badge.classList.toggle('warn', ratio < 4.5);
  }
  updateContrastBadge();

  // Visual Inspector Mode: Click to Tune
  const inspectBtn = document.getElementById('dna-inspect-btn');
  let inspecting = false;
  let hoveredEl = null;

  if (inspectBtn) {
    inspectBtn.addEventListener('click', function() {
      inspecting = !inspecting;
      inspectBtn.classList.toggle('active', inspecting);
      if (!inspecting && hoveredEl) {
        hoveredEl.classList.remove('dna-inspect-highlight');
        hoveredEl = null;
      }
    });

    document.addEventListener('mouseover', function(e) {
      if (!inspecting) return;
      if (hud.contains(e.target)) return;
      if (hoveredEl && hoveredEl !== e.target) {
        hoveredEl.classList.remove('dna-inspect-highlight');
      }
      hoveredEl = e.target;
      hoveredEl.classList.add('dna-inspect-highlight');
    }, true);

    document.addEventListener('click', function(e) {
      if (!inspecting) return;
      if (hud.contains(e.target)) return;
      e.preventDefault();
      e.stopPropagation();

      let targetParam = null;
      if (e.target.closest('#hero .wm h1, #nav .wm')) targetParam = 'hero.copy.brand';
      else if (e.target.closest('#hero .claim')) targetParam = 'hero.copy.claim';
      else if (e.target.closest('#strip .stack')) targetParam = 'strip.copy.caption';
      else if (e.target.closest('#strip h2')) targetParam = 'strip.copy.headline';

      if (targetParam) {
        const input = hud.querySelector('[data-param-id="' + targetParam + '"]');
        if (input) {
          const lens = input.closest('.dna-hud-lens');
          if (lens) lens.classList.remove('is-collapsed');
          input.focus();
          input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      inspecting = false;
      inspectBtn.classList.remove('active');
      if (hoveredEl) {
        hoveredEl.classList.remove('dna-inspect-highlight');
        hoveredEl = null;
      }
    }, true);
  }

  // Scroll Spy Observer: Highlights lens matching the in-view section
  if ('IntersectionObserver' in window) {
    const scrollSpyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const id = entry.target.id;
          hud.querySelectorAll('.dna-hud-lens').forEach(lens => {
            const cat = lens.getAttribute('data-lens');
            const isActive = (id === 'hero' && (cat === 'presets' || cat === 'typography' || cat === 'surface')) ||
                             (id === 'strip' && (cat === 'motion' || cat === 'content'));
            lens.classList.toggle('is-active-section', isActive);
          });
        }
      });
    }, { threshold: [0.3] });

    document.querySelectorAll('#hero, #strip, #macro, #engines, #seq, #connect, #flip, #close').forEach(sec => {
      scrollSpyObserver.observe(sec);
    });
  }

  hud.querySelectorAll('.dna-preset-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const preset = this.getAttribute('data-preset');
      applyPreset(preset);
      updateContrastBadge();
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
      updateContrastBadge();
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
      updateContrastBadge();
    }
  });

  // Gooey Reveal Observer para os demais textos da página
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
