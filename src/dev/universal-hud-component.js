/**
 * STUDIO DNA ENGINE — Universal HUD Web Component
 * High-performance, glassmorphic live tuning interface encapsulated in Shadow DOM.
 * Total style isolation (zero bleed), dynamic token auto-discovery, element inspector,
 * and bidirectional workspace persistence.
 */

const effectRegistry = require('../registry/effect-registry');
const { loadDesignPresets } = require('../presets/preset-manager');

/**
 * Returns the CSS styles scoped strictly to the Shadow Root
 */
function getShadowDomStyles() {
  return `
:host {
  all: initial;
  display: block;
  position: fixed;
  z-index: 2147483647;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Geist Mono", monospace;
  font-size: 11px;
  line-height: 1.4;
  color: #ededed;
  user-select: none;
  -webkit-font-smoothing: antialiased;
}

*, *::before, *::after {
  box-sizing: border-box;
}

.dna-hud-panel {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 360px;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  overflow-x: hidden;
  background: rgba(12, 13, 14, 0.82);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 12px;
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.dna-hud-panel.is-hidden {
  opacity: 0 !important;
  pointer-events: none !important;
  transform: translateY(16px) scale(0.96) !important;
}

/* Header */
.dna-hud-header {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
}

.dna-hud-title {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 600;
  color: #999;
  display: flex;
  align-items: center;
  gap: 8px;
}

.live-dot {
  width: 6px;
  height: 6px;
  background: #00ffaa;
  border-radius: 50%;
  box-shadow: 0 0 8px #00ffaa;
  animation: pulse-dot 2s infinite ease-in-out;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

.dna-contrast-badge {
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(0, 255, 170, 0.12);
  color: #00ffaa;
  border: 1px solid rgba(0, 255, 170, 0.3);
  letter-spacing: 0.04em;
}

.dna-hud-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dna-icon-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ededed;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 11px;
  line-height: 1;
  transition: all 0.2s ease;
}

.dna-icon-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
}

.dna-icon-btn.is-active {
  background: #00ffaa;
  color: #0c0d0e;
  border-color: #00ffaa;
}

/* Lenses & Accordions */
.dna-hud-body {
  padding: 10px 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dna-hud-lens {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  overflow: hidden;
}

.dna-hud-lens-title {
  padding: 10px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: #bbb;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.015);
  transition: background 0.2s;
}

.dna-hud-lens-title:hover {
  background: rgba(255, 255, 255, 0.04);
}

.dna-chevron {
  font-size: 9px;
  color: #666;
  transition: transform 0.2s ease;
}

.dna-hud-lens.is-collapsed .dna-chevron {
  transform: rotate(-90deg);
}

.dna-hud-lens-content {
  padding: 10px 12px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}

.dna-hud-lens.is-collapsed .dna-hud-lens-content {
  display: none;
}

/* Controls */
.dna-control-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dna-control-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 10px;
  color: #aaa;
}

.dna-control-input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dna-hud-range {
  flex: 1;
  appearance: none;
  -webkit-appearance: none;
  height: 4px;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.dna-hud-range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  background: #00ffaa;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 255, 170, 0.5);
  transition: transform 0.1s;
}

.dna-hud-range::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}

.dna-val-display {
  font-size: 10px;
  color: #00ffaa;
  min-width: 44px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.dna-hud-select, .dna-hud-text {
  width: 100%;
  padding: 6px 8px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  color: #ededed;
  font-family: inherit;
  font-size: 11px;
  outline: none;
  transition: border-color 0.2s;
}

.dna-hud-select:focus, .dna-hud-text:focus {
  border-color: #00ffaa;
}

.dna-color-picker-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dna-hud-color-btn {
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  cursor: pointer;
  background: transparent;
}

/* Stage & Presets Custom Controls */
.dna-segmented-wrap {
  display: flex;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  padding: 2px;
  gap: 2px;
}

.dna-seg-btn {
  flex: 1;
  background: transparent;
  border: none;
  border-radius: 4px;
  padding: 5px 6px;
  font-family: inherit;
  font-size: 10px;
  font-weight: 500;
  color: #888;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.dna-seg-btn:hover {
  color: #ededed;
  background: rgba(255, 255, 255, 0.04);
}

.dna-seg-btn.is-active {
  background: rgba(0, 255, 170, 0.18);
  color: #00ffaa;
  font-weight: 600;
  border: 1px solid rgba(0, 255, 170, 0.35);
  box-shadow: 0 0 10px rgba(0, 255, 170, 0.15);
}

.dna-preset-badge {
  font-size: 9px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  color: #ccc;
  letter-spacing: 0.04em;
}

.dna-sub-box {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Floating Reopen Button */
.dna-hud-reopen-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background: rgba(12, 13, 14, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  color: #ededed;
  font-family: inherit;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  transition: all 0.25s ease;
  z-index: 2147483646;
}

.dna-hud-reopen-btn:hover {
  background: rgba(25, 27, 30, 0.95);
  border-color: #00ffaa;
  transform: translateY(-2px);
}

.dna-hud-reopen-btn.is-hidden {
  opacity: 0 !important;
  pointer-events: none !important;
  transform: scale(0.9) !important;
}

kbd {
  background: rgba(255, 255, 255, 0.1);
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 9px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* Action Buttons */
.dna-export-bar {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dna-export-btn {
  width: 100%;
  padding: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 6px;
  color: #ededed;
  font-family: inherit;
  font-size: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
}

.dna-export-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #00ffaa;
  color: #00ffaa;
}

.dna-export-btn.btn-save-disk {
  background: rgba(0, 255, 170, 0.12);
  border-color: #00ffaa;
  color: #00ffaa;
}

.dna-export-btn.btn-save-disk:hover {
  background: #00ffaa;
  color: #0c0d0e;
}
  `.trim();
}

/**
 * Generates the complete client-side Web Component script
 * @param {Object} options
 * @returns {string} JavaScript snippet
 */
function generateUniversalHudScript(options = {}) {
  const {
    clientSlug = 'default',
    title = 'Studio DNA — Live Tuning Studio',
    effects = ['canvas-scroll-scrubber'],
    tokens = { colors: [], numbers: [], fonts: [] }
  } = options;

  let presets = [];
  try {
    presets = loadDesignPresets();
  } catch(e) {
    presets = [];
  }

  const styles = getShadowDomStyles();
  const effectsJson = JSON.stringify(effects);
  const initialTokensJson = JSON.stringify(tokens);
  const presetsJson = JSON.stringify(presets);

  return `
(function() {
  if (customElements.get('studio-dna-hud')) return;

  class StudioDnaHud extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.slug = "${clientSlug}";
      this.experienceTitle = "${title}";
      this.activeEffects = ${effectsJson};
      this.initialTokens = ${initialTokensJson};
      this.presets = ${presetsJson};
      this.currentPresetId = 'kinetic-pop';
      this.stageMode = 'clay';
      this.inspecting = false;
      this.inspectorBox = null;
      this.clayMock = null;
    }

    connectedCallback() {
      this.render();
      this.bindEvents();
      this.autoDiscoverHostTokens();
      this.setupElementInspector();
      this.initStageRuntime();
    }

    render() {
      const styles = document.createElement('style');
      styles.textContent = \`${styles}\`;

      const wrapper = document.createElement('div');
      wrapper.innerHTML = \`
        <div id="dna-tuning-hud" class="dna-hud-panel" data-experience="\${this.experienceTitle}">
          <div class="dna-hud-header">
            <div class="dna-hud-title">
              <span class="live-dot"></span>
              <span>\${this.experienceTitle}</span>
              <span id="dna-contrast-badge" class="dna-contrast-badge">APCA Lc 85 ✓</span>
            </div>
            <div class="dna-hud-actions">
              <button type="button" id="dna-inspect-btn" class="dna-icon-btn" title="Ativar Mira / Click-to-Tune">🎯</button>
              <button type="button" id="dna-hud-close-btn" class="dna-icon-btn" title="Minimizar (Atalho: H)">✕</button>
            </div>
          </div>
          <div class="dna-hud-body">
            <!-- 0. Lente de Presets & Stage Studio -->
            <div class="dna-hud-lens" data-lens="presets-stage">
              <div class="dna-hud-lens-title">
                <span>🎭 Presets &amp; Stage Studio</span>
                <span class="dna-chevron">▼</span>
              </div>
              <div class="dna-hud-lens-content" id="dna-lens-stage-content">
                <div class="dna-control-row">
                  <div class="dna-control-header">
                    <span>Design Preset (Macro Vibe)</span>
                  </div>
                  <select id="dna-select-preset" class="dna-hud-select">
                    <option value="kinetic-pop" selected>Kinetic Pop Nutrition (Original More)</option>
                    <option value="modern-apothecary">Modern Clinical Apothecary (Habit)</option>
                    <option value="tactile-botanical">Tactile Clean Botanical (Luxury)</option>
                  </select>
                </div>

                <div class="dna-control-row">
                  <div class="dna-control-header">
                    <span>Asset Central (Palco 3D / Vídeo)</span>
                  </div>
                  <div class="dna-segmented-wrap" id="dna-stage-mode-seg">
                    <button type="button" class="dna-seg-btn is-active" data-mode="clay">Clay 3D Mock</button>
                    <button type="button" class="dna-seg-btn" data-mode="sequence">WebP Sequence</button>
                    <button type="button" class="dna-seg-btn" data-mode="video">Smart Video</button>
                  </div>
                </div>

                <div class="dna-sub-box" id="dna-clay-controls">
                  <div style="font-size: 9px; font-weight: 600; color: #00ffaa; text-transform: uppercase;">✦ Customização Clay 3D (Placeholder)</div>
                  <div class="dna-control-row">
                    <div class="dna-control-header"><span>Rótulo / Nome da Marca</span></div>
                    <input type="text" id="dna-clay-label-text" class="dna-hud-text" value="STUDIO DNA">
                  </div>
                  <div style="display: flex; gap: 8px;">
                    <div class="dna-control-row" style="flex: 1;">
                      <div class="dna-control-header"><span>Cor do Corpo</span></div>
                      <div class="dna-color-picker-wrap">
                        <input type="color" id="dna-clay-color-body" class="dna-hud-color-btn" value="#335C30">
                        <span style="font-size: 9px; font-family: monospace;" id="val-clay-body">#335C30</span>
                      </div>
                    </div>
                    <div class="dna-control-row" style="flex: 1;">
                      <div class="dna-control-header"><span>Cor do Rótulo</span></div>
                      <div class="dna-color-picker-wrap">
                        <input type="color" id="dna-clay-color-label" class="dna-hud-color-btn" value="#FFFFFF">
                        <span style="font-size: 9px; font-family: monospace;" id="val-clay-label">#FFFFFF</span>
                      </div>
                    </div>
                  </div>
                  <div class="dna-control-row">
                    <div class="dna-control-header"><span>Acabamento da Tampa</span></div>
                    <select id="dna-clay-cap-finish" class="dna-hud-select">
                      <option value="matte" selected>Matte (Fosco Premium)</option>
                      <option value="metallic">Metallic (Alumínio Escovado)</option>
                      <option value="glass">Glass (Translúcido / Farmácia)</option>
                    </select>
                  </div>
                </div>

                <div class="dna-sub-box">
                  <div style="font-size: 9px; font-weight: 600; color: #bbb; text-transform: uppercase;">📐 Calibração Geométrica &amp; Safe-Zone</div>
                  <div class="dna-control-row">
                    <div class="dna-control-header">
                      <span>Safe-Zone Altura Máx.</span>
                      <span class="dna-val-display" id="val-stage-safe-height">58%</span>
                    </div>
                    <input type="range" id="dna-range-safe-height" class="dna-hud-range" min="40" max="75" step="1" value="58">
                  </div>
                  <div class="dna-control-row">
                    <div class="dna-control-header">
                      <span>Ancoragem Vertical (Y-Offset)</span>
                      <span class="dna-val-display" id="val-stage-y-anchor">0px</span>
                    </div>
                    <input type="range" id="dna-range-y-anchor" class="dna-hud-range" min="-80" max="80" step="5" value="0">
                  </div>
                  <div class="dna-control-row">
                    <div class="dna-control-header">
                      <span>Inércia de Scroll (Scrub)</span>
                      <span class="dna-val-display" id="val-stage-scrub">0.7s</span>
                    </div>
                    <input type="range" id="dna-range-scrub" class="dna-hud-range" min="0.1" max="2.0" step="0.1" value="0.7">
                  </div>
                  <div class="dna-control-row">
                    <div class="dna-control-header">
                      <span>Contenção de Máscara (Raio)</span>
                      <span class="dna-val-display" id="val-stage-mask">70%</span>
                    </div>
                    <input type="range" id="dna-range-mask" class="dna-hud-range" min="40" max="100" step="2" value="70">
                  </div>
                </div>
              </div>
            </div>

            <!-- 1. Lente de Cores & Superfície -->
            <div class="dna-hud-lens" data-lens="colors">
              <div class="dna-hud-lens-title">
                <span>🎨 Cores &amp; Tokens (:root)</span>
                <span class="dna-chevron">▼</span>
              </div>
              <div class="dna-hud-lens-content" id="dna-lens-colors-content">
                <div style="font-size: 9px; color: #888;">Escaneando propriedades CSS...</div>
              </div>
            </div>

            <!-- 2. Lente de Tipografia -->
            <div class="dna-hud-lens" data-lens="typography">
              <div class="dna-hud-lens-title">
                <span>Aa Tipografia &amp; Hierarquia</span>
                <span class="dna-chevron">▼</span>
              </div>
              <div class="dna-hud-lens-content" id="dna-lens-typography-content">
                <div style="font-size: 9px; color: #888;">Escaneando fontes ativas...</div>
              </div>
            </div>

            <!-- 3. Lente de Efeitos 3D & Animações -->
            <div class="dna-hud-lens" data-lens="effects">
              <div class="dna-hud-lens-title">
                <span>🎞️ Efeitos 3D &amp; Scroll Physics</span>
                <span class="dna-chevron">▼</span>
              </div>
              <div class="dna-hud-lens-content" id="dna-lens-effects-content">
                \${this.renderEffectsMarkup()}
              </div>
            </div>

            <!-- 4. Lente de Persistência & Dev-to-Code -->
            <div class="dna-hud-lens" data-lens="export">
              <div class="dna-hud-lens-title">
                <span>💾 Workspace &amp; Exportação</span>
                <span class="dna-chevron">▼</span>
              </div>
              <div class="dna-hud-lens-content">
                <div class="dna-export-bar">
                  <button type="button" id="dna-btn-save-disk" class="dna-export-btn btn-save-disk">💾 Gravar no Cliente (Disk)</button>
                  <button type="button" id="dna-btn-copy-css" class="dna-export-btn">📋 Copiar Tokens CSS (:root)</button>
                  <button type="button" id="dna-btn-copy-json" class="dna-export-btn">📄 Copiar Brand Spec (JSON)</button>
                </div>
                <div id="dna-export-status" style="font-size: 9px; color: #00ffaa; min-height: 12px; margin-top: 4px;"></div>
              </div>
            </div>
          </div>
        </div>

        <button type="button" id="dna-hud-reopen-btn" class="dna-hud-reopen-btn is-hidden" title="Abrir Live HUD (Atalho: H)">
          <span class="live-dot"></span>
          <span>🎛️ DNA HUD</span>
          <kbd>H</kbd>
        </button>
      \`;

      this.shadowRoot.appendChild(styles);
      this.shadowRoot.appendChild(wrapper);
    }

    renderEffectsMarkup() {
      let html = '';
      if (this.activeEffects.includes('canvas-scroll-scrubber')) {
        html += \`
          <div class="dna-control-row" data-effect-controls="canvas-scroll-scrubber">
            <div class="dna-control-header">
              <span>360° Sequence Scrub Smoothness</span>
            </div>
            <div class="dna-control-input-group">
              <input type="range" class="dna-hud-range" min="0.1" max="2.5" step="0.1" value="1.0"
                oninput="const d = this.getRootNode().getElementById('val-seq-scrub'); if(d) d.textContent = this.value; window.DNA_SCRUB_SMOOTH = parseFloat(this.value);">
              <span class="dna-val-display" id="val-seq-scrub">1.0</span>
            </div>
          </div>
        \`;
      }
      return html || '<div style="font-size:9px;color:#888;">Nenhum efeito ativo.</div>';
    }

    bindEvents() {
      const root = this.shadowRoot;
      const hud = root.getElementById('dna-tuning-hud');
      const reopenBtn = root.getElementById('dna-hud-reopen-btn');
      const closeBtn = root.getElementById('dna-hud-close-btn');

      // Toggle HUD visibility
      const toggle = () => {
        const isHidden = hud.classList.toggle('is-hidden');
        reopenBtn.classList.toggle('is-hidden', !isHidden);
      };

      closeBtn.onclick = toggle;
      reopenBtn.onclick = toggle;

      window.addEventListener('keydown', (e) => {
        if ((e.key === 'h' || e.key === 'H') && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
          toggle();
        }
      });

      // Accordion folding
      root.querySelectorAll('.dna-hud-lens-title').forEach(header => {
        header.onclick = () => {
          header.parentElement.classList.toggle('is-collapsed');
        };
      });

      // Presets Selector
      const presetSelect = root.getElementById('dna-select-preset');
      if (presetSelect) {
        presetSelect.onchange = (e) => this.applyPreset(e.target.value);
      }

      // Stage Asset Mode Buttons
      root.querySelectorAll('#dna-stage-mode-seg .dna-seg-btn').forEach(btn => {
        btn.onclick = () => {
          root.querySelectorAll('#dna-stage-mode-seg .dna-seg-btn').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          this.setStageMode(btn.dataset.mode);
        };
      });

      // Clay Customizer Inputs
      const bodyColorInput = root.getElementById('dna-clay-color-body');
      const labelColorInput = root.getElementById('dna-clay-color-label');
      const labelTextInput = root.getElementById('dna-clay-label-text');
      const capFinishSelect = root.getElementById('dna-clay-cap-finish');

      if (bodyColorInput) {
        bodyColorInput.oninput = (e) => {
          root.getElementById('val-clay-body').textContent = e.target.value;
          this.updateClayMock({ brandColor: e.target.value });
        };
      }
      if (labelColorInput) {
        labelColorInput.oninput = (e) => {
          root.getElementById('val-clay-label').textContent = e.target.value;
          this.updateClayMock({ labelColor: e.target.value });
        };
      }
      if (labelTextInput) {
        labelTextInput.oninput = (e) => {
          this.updateClayMock({ labelText: e.target.value });
        };
      }
      if (capFinishSelect) {
        capFinishSelect.onchange = (e) => {
          this.updateClayMock({ capFinish: e.target.value });
        };
      }

      // Safe-Zone & Physics Sliders
      const safeHeightRange = root.getElementById('dna-range-safe-height');
      if (safeHeightRange) {
        safeHeightRange.oninput = (e) => {
          root.getElementById('val-stage-safe-height').textContent = e.target.value + '%';
          this.updateStageParam('safeHeight', parseFloat(e.target.value));
        };
      }

      const yAnchorRange = root.getElementById('dna-range-y-anchor');
      if (yAnchorRange) {
        yAnchorRange.oninput = (e) => {
          root.getElementById('val-stage-y-anchor').textContent = e.target.value + 'px';
          this.updateStageParam('yAnchor', parseFloat(e.target.value));
        };
      }

      const scrubRange = root.getElementById('dna-range-scrub');
      if (scrubRange) {
        scrubRange.oninput = (e) => {
          root.getElementById('val-stage-scrub').textContent = e.target.value + 's';
          this.updateStageParam('scrub', parseFloat(e.target.value));
        };
      }

      const maskRange = root.getElementById('dna-range-mask');
      if (maskRange) {
        maskRange.oninput = (e) => {
          root.getElementById('val-stage-mask').textContent = e.target.value + '%';
          this.updateStageParam('mask', parseFloat(e.target.value));
        };
      }

      // Export Buttons
      root.getElementById('dna-btn-copy-css').onclick = () => this.copyCssTokens();
      root.getElementById('dna-btn-save-disk').onclick = () => this.saveToWorkspace();
    }

    autoDiscoverHostTokens() {
      const root = this.shadowRoot;
      const colorsContent = root.getElementById('dna-lens-colors-content');
      const typographyContent = root.getElementById('dna-lens-typography-content');

      const discoveredColors = [];
      const discoveredFonts = [];

      try {
        const sheets = Array.from(document.styleSheets);
        sheets.forEach(sheet => {
          try {
            const rules = Array.from(sheet.cssRules || []);
            rules.forEach(rule => {
              if (rule.selectorText === ':root' || rule.selectorText === 'html' || rule.selectorText === 'body') {
                const style = rule.style;
                for (let i = 0; i < style.length; i++) {
                  const prop = style[i];
                  if (prop.startsWith('--')) {
                    const val = style.getPropertyValue(prop).trim();
                    if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(val) || /^rgba?/i.test(val)) {
                      discoveredColors.push({ prop, val });
                    } else if (/(font|family|sans|mono)/i.test(prop)) {
                      discoveredFonts.push({ prop, val });
                    }
                  }
                }
              }
            });
          } catch(e) {}
        });
      } catch(e) {}

      // Fallbacks
      if (discoveredColors.length === 0) {
        discoveredColors.push(
          { prop: '--bg-primary', val: '#0c0d0e' },
          { prop: '--accent', val: '#00ffaa' },
          { prop: '--text-main', val: '#ededed' }
        );
      }

      // Render Colors
      colorsContent.innerHTML = '';
      discoveredColors.forEach(item => {
        const row = document.createElement('div');
        row.className = 'dna-control-row';
        row.innerHTML = \`
          <div class="dna-control-header">
            <span>\${item.prop}</span>
          </div>
          <div class="dna-color-picker-wrap">
            <input type="color" class="dna-hud-color-btn" value="\${item.val.startsWith('#') ? item.val : '#00ffaa'}">
            <input type="text" class="dna-hud-text" value="\${item.val}">
          </div>
        \`;

        const colorInput = row.querySelector('.dna-hud-color-btn');
        const textInput = row.querySelector('.dna-hud-text');

        colorInput.oninput = (e) => {
          textInput.value = e.target.value;
          document.documentElement.style.setProperty(item.prop, e.target.value);
        };
        textInput.onchange = (e) => {
          colorInput.value = e.target.value;
          document.documentElement.style.setProperty(item.prop, e.target.value);
        };

        colorsContent.appendChild(row);
      });

      // Render Fonts
      typographyContent.innerHTML = '';
      discoveredFonts.forEach(item => {
        const row = document.createElement('div');
        row.className = 'dna-control-row';
        row.innerHTML = \`
          <div class="dna-control-header">
            <span>\${item.prop}</span>
          </div>
          <input type="text" class="dna-hud-text" value="\${item.val}">
        \`;
        row.querySelector('.dna-hud-text').onchange = (e) => {
          document.documentElement.style.setProperty(item.prop, e.target.value);
        };
        typographyContent.appendChild(row);
      });
    }

    setupElementInspector() {
      const btn = this.shadowRoot.getElementById('dna-inspect-btn');
      btn.onclick = () => {
        this.inspecting = !this.inspecting;
        btn.classList.toggle('is-active', this.inspecting);
        document.body.style.cursor = this.inspecting ? 'crosshair' : '';
      };

      document.addEventListener('click', (e) => {
        if (!this.inspecting) return;
        if (e.target.closest('studio-dna-hud')) return;

        e.preventDefault();
        e.stopPropagation();

        this.inspecting = false;
        btn.classList.remove('is-active');
        document.body.style.cursor = '';

        const target = e.target;
        const text = target.innerText;
        const color = window.getComputedStyle(target).color;
        console.log('🎯 [Click-to-Tune] Elemento inspecionado:', target, { text, color });

        const status = this.shadowRoot.getElementById('dna-export-status');
        if (status) {
          status.textContent = '🎯 Inspecionado: <' + target.tagName.toLowerCase() + '> (' + (target.className ? '.' + target.className.split(' ')[0] : 'id=' + target.id) + ')';
          setTimeout(() => { status.textContent = ''; }, 3000);
        }
      }, true);
    }

    async saveToWorkspace() {
      const status = this.shadowRoot.getElementById('dna-export-status');
      status.textContent = '⏳ Salvando no disco...';

      const mutations = {
        slug: this.slug,
        theme: {},
        effects: {}
      };

      this.shadowRoot.querySelectorAll('#dna-lens-colors-content .dna-control-row').forEach(row => {
        const prop = row.querySelector('.dna-control-header span')?.textContent;
        const val = row.querySelector('.dna-hud-text')?.value;
        if (prop && val) mutations.theme[prop] = val;
      });

      try {
        const res = await fetch('/api/save-dna-mutation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mutations)
        });
        const data = await res.json();
        if (data.success) {
          status.textContent = '✓ Gravado com sucesso no brand-spec.json!';
          setTimeout(() => { status.textContent = ''; }, 3500);
        } else {
          status.textContent = '❌ Erro ao salvar: ' + (data.error || 'Falha de gravação');
        }
      } catch(err) {
        status.textContent = '❌ Erro de conexão com o servidor local.';
      }
    }

    copyCssTokens() {
      let css = ':root {\\n';
      this.shadowRoot.querySelectorAll('#dna-lens-colors-content .dna-control-row').forEach(row => {
        const prop = row.querySelector('.dna-control-header span')?.textContent;
        const val = row.querySelector('.dna-hud-text')?.value;
        if (prop && val) css += '  ' + prop + ': ' + val + ';\\n';
      });
      css += '}';

      navigator.clipboard.writeText(css).then(() => {
        const status = this.shadowRoot.getElementById('dna-export-status');
        status.textContent = '✓ Tokens CSS copiados para a área de transferência!';
        setTimeout(() => { status.textContent = ''; }, 3000);
      });
    }

    applyPreset(presetId) {
      const preset = this.presets.find(p => p.id === presetId);
      if (!preset) return;
      this.currentPresetId = presetId;

      // 1. Injeta propriedades customizadas no :root do host (DNA + Aliases Legados)
      const rootStyle = document.documentElement.style;
      rootStyle.setProperty('--dna-bg', preset.colors.background);
      rootStyle.setProperty('--dna-surface', preset.colors.surface);
      rootStyle.setProperty('--dna-primary', preset.colors.primary);
      rootStyle.setProperty('--dna-primary-hover', preset.colors.primary);
      rootStyle.setProperty('--dna-accent', preset.colors.accent);
      rootStyle.setProperty('--dna-text', preset.colors.text);
      rootStyle.setProperty('--dna-text-muted', preset.colors.muted || '#6B7280');

      // Aliases para compatibilidade universal com clones do Webflow / More Nutrition
      rootStyle.setProperty('--dark-green', preset.colors.primary);
      rootStyle.setProperty('--bg-pale', preset.colors.background);
      rootStyle.setProperty('--bg-light', preset.colors.surface);
      rootStyle.setProperty('--text-color', preset.colors.text);
      rootStyle.setProperty('--accent', preset.colors.accent);
      rootStyle.setProperty('--bg-primary', preset.colors.background);
      rootStyle.setProperty('--primary-color', preset.colors.primary);

      // 2. Aplica cores e fontes diretamente no body e elementos principais
      document.body.style.backgroundColor = preset.colors.background;
      document.body.style.color = preset.colors.text;

      // 3. Tipografia & Tracking
      if (preset.typography) {
        rootStyle.setProperty('--dna-font-headline', preset.typography.family);
        rootStyle.setProperty('--dna-font-body', preset.typography.bodyFamily || preset.typography.family);
        rootStyle.setProperty('--dna-tracking', preset.typography.tracking);

        document.querySelectorAll('h1, h2, h3, .hero-headline, .section-title, .narrative-title').forEach(el => {
          el.style.fontFamily = preset.typography.family;
          el.style.letterSpacing = preset.typography.tracking;
          el.style.color = preset.colors.text;
        });
      }

      // 4. Efeitos e Cores em Componentes do Host
      document.querySelectorAll('.site-header').forEach(el => {
        el.style.backgroundColor = preset.colors.background;
      });
      document.querySelectorAll('.bento-card, .review-card, .product-card, .retail-strip, .site-footer').forEach(el => {
        el.style.backgroundColor = preset.colors.surface;
        el.style.color = preset.colors.text;
      });
      document.querySelectorAll('.btn-primary, .marquee-container').forEach(el => {
        el.style.backgroundColor = preset.colors.primary;
      });
      document.querySelectorAll('.metric-pill, .location-badge').forEach(el => {
        el.style.backgroundColor = preset.colors.surface;
        el.style.borderColor = 'rgba(0,0,0,0.1)';
        el.style.color = preset.colors.text;
      });
      document.querySelectorAll('.narrative-phase-badge, .bento-pill, .section-label, .hero-tagline').forEach(el => {
        el.style.color = preset.colors.primary;
      });

      // 5. Atualiza Modo do Palco (Stage Mode)
      if (preset.stageDefaults && preset.stageDefaults.defaultMode) {
        this.setStageMode(preset.stageDefaults.defaultMode);
        this.shadowRoot.querySelectorAll('#dna-stage-mode-seg .dna-seg-btn').forEach(btn => {
          btn.classList.toggle('is-active', btn.dataset.mode === preset.stageDefaults.defaultMode);
        });
      }

      // 6. Atualiza Física de Scroll
      if (preset.motion) {
        window.DNA_SCRUB_SMOOTH = preset.motion.scrub;
        const sSlider = this.shadowRoot.getElementById('dna-range-scrub');
        const sVal = this.shadowRoot.getElementById('val-stage-scrub');
        if (sSlider) sSlider.value = preset.motion.scrub;
        if (sVal) sVal.textContent = preset.motion.scrub + 's';
      }

      // 7. Atualiza Clay Mock se ativo
      if (preset.stageDefaults && preset.stageDefaults.clayProps) {
        const cp = preset.stageDefaults.clayProps;
        this.updateClayMock({
          brandColor: cp.brandColor,
          labelText: cp.labelText,
          capFinish: cp.capFinish
        });
        const cBody = this.shadowRoot.getElementById('dna-clay-color-body');
        if (cBody) { cBody.value = cp.brandColor; this.shadowRoot.getElementById('val-clay-body').textContent = cp.brandColor; }
        const cLabel = this.shadowRoot.getElementById('dna-clay-label-text');
        if (cLabel) cLabel.value = cp.labelText;
        const cCap = this.shadowRoot.getElementById('dna-clay-cap-finish');
        if (cCap) cCap.value = cp.capFinish;
      }

      // 8. Sincroniza controles de Cores na Lente 1 do HUD
      this.shadowRoot.querySelectorAll('#dna-lens-colors-content .dna-control-row').forEach(row => {
        const prop = row.querySelector('.dna-control-header span')?.textContent;
        const colorInput = row.querySelector('.dna-hud-color-btn');
        const textInput = row.querySelector('.dna-hud-text');
        if (!prop || !colorInput || !textInput) return;

        let newVal = null;
        if (prop === '--dna-bg' || prop === '--bg-pale' || prop === '--bg-primary') newVal = preset.colors.background;
        else if (prop === '--dna-surface' || prop === '--bg-light') newVal = preset.colors.surface;
        else if (prop === '--dna-primary' || prop === '--dark-green' || prop === '--primary-color') newVal = preset.colors.primary;
        else if (prop === '--dna-accent' || prop === '--accent') newVal = preset.colors.accent;
        else if (prop === '--dna-text' || prop === '--text-color') newVal = preset.colors.text;

        if (newVal) {
          colorInput.value = newVal;
          textInput.value = newVal;
        }
      });

      // 9. Feedback visual no HUD
      const status = this.shadowRoot.getElementById('dna-export-status');
      if (status) {
        status.textContent = '✓ Preset Ativo: ' + preset.name;
        setTimeout(() => { status.textContent = ''; }, 3000);
      }
    }

    initStageRuntime() {
      const canvas = document.querySelector('[data-sequence-canvas]');
      if (!canvas) return;

      this.stageCanvas = canvas;
      this.stageCtx = canvas.getContext('2d');
      this.stageSafeHeight = 0.58;
      this.stageYAnchor = 0;
      this.stageMaskRadius = 70;

      // Cria elemento de vídeo oculto para o modo 'video' (Habit Supps)
      let stageVideo = document.getElementById('dna-stage-video-element');
      if (!stageVideo) {
        stageVideo = document.createElement('video');
        stageVideo.id = 'dna-stage-video-element';
        stageVideo.src = '/copias/habitsupps-com/site/assets/vendor/cdn.sanity.io/files/iuz0iuzl/production/556dcceca85f3682957e4f9aff6f3cb020cce4df.mp4';
        stageVideo.preload = 'auto';
        stageVideo.muted = true;
        stageVideo.playsInline = true;
        stageVideo.crossOrigin = 'anonymous';
        stageVideo.style.display = 'none';
        document.body.appendChild(stageVideo);
      }
      this.stageVideo = stageVideo;

      // Estado do Clay Mock
      this.clayState = {
        brandColor: '#335C30',
        labelColor: '#FFFFFF',
        labelText: 'MORE MATCHA',
        capFinish: 'matte',
        rotationAngle: 0
      };

      // Hook de scroll para rotação sincronizada
      window.addEventListener('scroll', () => {
        if (this.stageMode === 'sequence') return;
        this.renderStageFrame();
      }, { passive: true });

      // Render inicial
      this.renderStageFrame();
    }

    setStageMode(mode) {
      this.stageMode = mode;
      const clayBox = this.shadowRoot.getElementById('dna-clay-controls');
      if (clayBox) {
        clayBox.style.display = (mode === 'clay') ? 'flex' : 'none';
      }
      this.renderStageFrame();
    }

    updateClayMock(props) {
      Object.assign(this.clayState, props);
      if (this.stageMode === 'clay') {
        this.renderStageFrame();
      }
    }

    updateStageParam(param, val) {
      if (param === 'safeHeight') this.stageSafeHeight = val / 100;
      if (param === 'yAnchor') this.stageYAnchor = val;
      if (param === 'mask') this.stageMaskRadius = val;
      if (param === 'scrub') window.DNA_SCRUB_SMOOTH = val;

      const sticky = document.querySelector('[data-sequence-stage]') || document.querySelector('.sequence-sticky');
      if (sticky) {
        const maskVal = 'radial-gradient(ellipse ' + this.stageMaskRadius + '% 65% at 50% 62%, black 60%, transparent 100%)';
        sticky.style.maskImage = maskVal;
        sticky.style.webkitMaskImage = maskVal;
      }

      this.renderStageFrame();
    }

    renderStageFrame() {
      if (!this.stageCanvas || this.stageMode === 'sequence') return;

      const canvas = this.stageCanvas;
      const ctx = this.stageCtx;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const trigger = document.querySelector('[data-sequence-trigger]');
      let progress = 0;
      if (trigger) {
        const rect = trigger.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total > 0) {
          progress = Math.max(0, Math.min(1, -rect.top / total));
        }
      }

      const viewW = canvas.width / dpr;
      const viewH = canvas.height / dpr;
      ctx.clearRect(0, 0, viewW, viewH);

      const targetH = Math.round(viewH * (this.stageSafeHeight || 0.58));
      const targetW = targetH;
      const drawX = Math.round((viewW - targetW) / 2);
      const drawY = Math.round(viewH - targetH - (viewH * 0.08) + (this.stageYAnchor || 0));

      if (this.stageMode === 'clay') {
        this.drawProceduralClay(ctx, {
          drawX,
          drawY,
          targetWidth: targetW,
          targetHeight: targetH,
          brandColor: this.clayState.brandColor,
          labelColor: this.clayState.labelColor,
          labelText: this.clayState.labelText,
          capFinish: this.clayState.capFinish,
          rotationAngle: progress * 360
        });
      } else if (this.stageMode === 'video' && this.stageVideo) {
        if (this.stageVideo.duration) {
          this.stageVideo.currentTime = progress * this.stageVideo.duration;
          try {
            ctx.drawImage(this.stageVideo, drawX, drawY, targetW, targetH);
          } catch(e) {}
        }
      }
    }

    drawProceduralClay(ctx, bounds) {
      const { drawX, drawY, targetWidth, targetHeight, brandColor, labelColor, labelText, capFinish, rotationAngle } = bounds;

      ctx.save();
      // Sombra
      ctx.beginPath();
      const shadowX = drawX + targetWidth / 2;
      const shadowY = drawY + targetHeight - targetHeight * 0.04;
      const sRadiusX = targetWidth * 0.38;
      const sRadiusY = targetHeight * 0.05;
      const sGrad = ctx.createRadialGradient(shadowX, shadowY, 0, shadowX, shadowY, sRadiusX);
      sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.28)');
      sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sGrad;
      ctx.ellipse(shadowX, shadowY, sRadiusX, sRadiusY, 0, 0, Math.PI * 2);
      ctx.fill();

      // Corpo
      const bodyW = targetWidth * 0.55;
      const bodyH = targetHeight * 0.72;
      const bodyX = drawX + (targetWidth - bodyW) / 2;
      const bodyY = drawY + targetHeight * 0.22;
      const radius = bodyW * 0.08;

      ctx.fillStyle = brandColor;
      this.drawRoundRect(ctx, bodyX, bodyY, bodyW, bodyH, radius);
      ctx.fill();

      const bodyGrad = ctx.createLinearGradient(bodyX, 0, bodyX + bodyW, 0);
      bodyGrad.addColorStop(0.0, 'rgba(0,0,0,0.35)');
      bodyGrad.addColorStop(0.2, 'rgba(255,255,255,0.22)');
      bodyGrad.addColorStop(0.5, 'rgba(255,255,255,0.0)');
      bodyGrad.addColorStop(0.85, 'rgba(0,0,0,0.25)');
      bodyGrad.addColorStop(1.0, 'rgba(0,0,0,0.48)');
      ctx.fillStyle = bodyGrad;
      this.drawRoundRect(ctx, bodyX, bodyY, bodyW, bodyH, radius);
      ctx.fill();

      // Rótulo
      const labelH = bodyH * 0.52;
      const labelY = bodyY + bodyH * 0.22;
      const labelW = bodyW * 0.94;
      const labelX = bodyX + (bodyW - labelW) / 2;

      ctx.fillStyle = labelColor;
      this.drawRoundRect(ctx, labelX, labelY, labelW, labelH, radius * 0.6);
      ctx.fill();

      // Texto no rótulo
      ctx.save();
      this.drawRoundRect(ctx, labelX, labelY, labelW, labelH, radius * 0.6);
      ctx.clip();
      ctx.fillStyle = brandColor;
      ctx.font = 'bold ' + Math.round(bodyW * 0.12) + 'px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const angleRad = (rotationAngle % 360) * (Math.PI / 180);
      const textOffsetX = Math.sin(angleRad) * (labelW * 0.42);
      ctx.translate(labelX + labelW / 2 + textOffsetX, labelY + labelH * 0.45);
      ctx.fillText(labelText, 0, 0);
      ctx.restore();

      // Tampa
      const capW = bodyW * 0.92;
      const capH = bodyH * 0.18;
      const capX = bodyX + (bodyW - capW) / 2;
      const capY = bodyY - capH * 0.85;
      const capGrad = ctx.createLinearGradient(capX, 0, capX + capW, 0);
      if (capFinish === 'metallic') {
        capGrad.addColorStop(0, '#555'); capGrad.addColorStop(0.5, '#FFF'); capGrad.addColorStop(1, '#444');
      } else if (capFinish === 'glass') {
        capGrad.addColorStop(0, 'rgba(200,230,255,0.4)'); capGrad.addColorStop(0.5, 'rgba(255,255,255,0.85)'); capGrad.addColorStop(1, 'rgba(150,200,255,0.3)');
      } else {
        capGrad.addColorStop(0, '#CCC'); capGrad.addColorStop(0.5, '#FFF'); capGrad.addColorStop(1, '#AAA');
      }
      ctx.fillStyle = capGrad;
      this.drawRoundRect(ctx, capX, capY, capW, capH, radius * 0.5);
      ctx.fill();

      ctx.restore();
    }

    drawRoundRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }
  }

  // Web Component <studio-dna-hud>
  customElements.define('studio-dna-hud', StudioDnaHud);

  // Auto-injeta a tag <studio-dna-hud> se não existir no documento
  if (!document.querySelector('studio-dna-hud')) {
    const hudTag = document.createElement('studio-dna-hud');
    document.body.appendChild(hudTag);
  }
})();
  `.trim();
}

module.exports = {
  getShadowDomStyles,
  generateUniversalHudScript
};
