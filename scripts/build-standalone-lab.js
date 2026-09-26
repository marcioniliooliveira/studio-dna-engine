const fs = require('fs');
const path = require('path');

const srcHtml = fs.readFileSync(path.join(__dirname, '..', 'copias', 'op-xy-76-aura-build', 'site', 'template-content.html'), 'utf8');

// 1. Extract Head & Styles
const headEndIdx = srcHtml.indexOf('</head>');
let headContent = srcHtml.substring(0, headEndIdx);

// 2. Extract Body up to the end of #strip
const bodyStartIdx = srcHtml.indexOf('<body');
const stripMarker = '</section>';
const stripIdx = srcHtml.indexOf('id="strip"');
const stripEndIdx = srcHtml.indexOf(stripMarker, stripIdx) + stripMarker.length;

let bodyBefore = srcHtml.substring(0, stripEndIdx);
bodyBefore += '\n  </main>\n';

// 3. Extract the script section (importmap + module script)
const importmapIdx = srcHtml.indexOf('<script type="importmap">');
let scriptsBlock = srcHtml.substring(importmapIdx);

// Let's modify the module script to adapt to only 'hero' and 'strip'
let moduleScript = scriptsBlock;

// In module script:
// 1. Ensure beats only contains 'hero' and 'strip'
moduleScript = moduleScript.replace(
  "const beats = ['hero', 'strip', 'macro', 'engines', 'seq', 'connect', 'flip', 'close'];",
  "const beats = ['hero', 'strip'];"
);
moduleScript = moduleScript.replace(
  "const st = OPXY.state, S = OPXY.stations, prog = PAGE.prog, beats = ['hero', 'strip', 'macro', 'engines', 'seq', 'connect', 'flip', 'close'];",
  "const st = OPXY.state, S = OPXY.stations, prog = PAGE.prog, beats = ['hero', 'strip'];"
);

// 2. Guard buildSequencer and buildEngines so they don't error out when elements aren't present
moduleScript = moduleScript.replace(
  "buildSequencer();\n  buildEngines();",
  "if ($('#seqGrid')) buildSequencer();\n  if ($('#engStrip')) buildEngines();"
);

// 3. Guard wirePorts
moduleScript = moduleScript.replace(
  "STACK.els = $$('#strip .stack b'); PORTS.els = $$('#connect .port'); wireStack(); wirePorts();",
  () => "STACK.els = $$('#strip .stack b'); if ($('#connect')) { PORTS.els = $$('#connect .port'); wirePorts(); } wireStack();"
);

// 3.1 Ensure canvas is always visible across both hero and strip
moduleScript = moduleScript.replace(
  "if (OPXY.quality === 0) { document.documentElement.classList.toggle('away', b !== 'hero'); }",
  "// canvas stays visible across hero and strip"
);
moduleScript = moduleScript.replace(
  "let quality = softGL ? 0 : 2;",
  "let quality = 2;"
);

// 4. Ensure local model URL is preferred
const originalModelUrl = "const MODEL_URL = (function(){ var d = document.getElementById('cdn'); var h = ['ht','tps:','//','cdn','.js','delivr','.net','/gh/'].join(''); return h + d.dataset.r + '@' + d.dataset.t + '/' + d.dataset.p + '/opxy.glb'; })();";
const newModelUrl = "const MODEL_URL = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'file:') ? './assets/models/opxy.glb' : (function(){ var d = document.getElementById('cdn'); var h = ['ht','tps:','//','cdn','.js','delivr','.net','/gh/'].join(''); return h + d.dataset.r + '@' + d.dataset.t + '/' + d.dataset.p + '/opxy.glb'; })();";
moduleScript = moduleScript.replace(originalModelUrl, newModelUrl);

// 5. Expose accent material updater in Three.js
const matHook = `
  mats.forEach(tuneMaterial);
  window.__OPXY_MATS = mats;
  window.OPXY_UPDATE_ACCENT = function(hexColor) {
    if (!window.THREE) return;
    const col = new THREE.Color(hexColor);
    mats.forEach(m => {
      if (m.name && (/record/i.test(m.name) || /rec/i.test(m.name))) {
        m.color.copy(col);
        if (m.emissive) m.emissive.copy(col).multiplyScalar(0.3);
        m.needsUpdate = true;
      }
    });
    window.OPXY?.dirty?.();
  };
`;
moduleScript = moduleScript.replace('mats.forEach(tuneMaterial);', matHook);

// 4. Create the Live Tuning HUD Component HTML & CSS & JS
const HUD_COMPONENT = `
<!-- ========================================================================= -->
<!-- STUDIO DNA · LIVE TUNING HUD & DIRECTION PRESET ENGINE                   -->
<!-- ========================================================================= -->
<style id="studio-dna-live-hud-styles">
  #dna-hud-root {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    font-family: var(--mono, "Geist Mono", monospace);
    font-size: 11px;
    color: var(--fg, #e2e4e8);
    user-select: none;
    -webkit-font-smoothing: antialiased;
  }
  #dna-hud-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    background: rgba(12, 13, 14, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 999px;
    backdrop-filter: blur(16px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }
  #dna-hud-toggle:hover {
    border-color: rgba(255, 255, 255, 0.35);
    transform: translateY(-2px);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.75);
  }
  #dna-hud-toggle .hud-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--rec, #ff3a2f);
    box-shadow: 0 0 10px var(--rec, #ff3a2f);
    transition: background 0.3s, box-shadow 0.3s;
  }
  #dna-hud-toggle .hud-title {
    font-weight: 500;
    letter-spacing: 0.05em;
    color: #fff;
  }
  #dna-hud-toggle .hud-badge {
    font-size: 9px;
    padding: 2px 7px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    color: var(--fg-dim, #8b8f97);
  }

  /* PANEL */
  #dna-hud-panel {
    display: none;
    position: absolute;
    bottom: 52px;
    right: 0;
    width: 380px;
    max-height: 84vh;
    background: rgba(14, 15, 17, 0.94);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 14px;
    backdrop-filter: blur(24px);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.85);
    flex-direction: column;
    overflow: hidden;
    animation: dnaFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  #dna-hud-panel.open {
    display: flex;
  }
  @keyframes dnaFadeIn {
    from { opacity: 0; transform: translateY(12px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  /* HEADER */
  .hud-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.02);
  }
  .hud-header h2 {
    margin: 0;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hud-close-btn {
    background: none;
    border: none;
    color: var(--fg-dim, #8b8f97);
    font-size: 16px;
    line-height: 1;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
  }
  .hud-close-btn:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }

  /* TABS */
  .hud-tabs {
    display: flex;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(0, 0, 0, 0.2);
  }
  .hud-tab-btn {
    flex: 1;
    padding: 9px 8px;
    background: none;
    border: none;
    color: var(--fg-dim, #8b8f97);
    font-family: inherit;
    font-size: 10px;
    letter-spacing: 0.04em;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.15s;
  }
  .hud-tab-btn:hover {
    color: #fff;
  }
  .hud-tab-btn.active {
    color: #fff;
    border-bottom-color: var(--rec, #ff3a2f);
    background: rgba(255, 255, 255, 0.03);
  }

  /* BODY */
  .hud-body {
    padding: 16px;
    overflow-y: auto;
    max-height: 60vh;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .hud-tab-content {
    display: none;
    flex-direction: column;
    gap: 14px;
  }
  .hud-tab-content.active {
    display: flex;
  }

  /* PRESET CARDS */
  .preset-card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .preset-card:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
  .preset-card.active {
    border-color: var(--rec, #ff3a2f);
    background: rgba(255, 255, 255, 0.07);
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.4);
  }
  .preset-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .preset-name {
    font-weight: 600;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .preset-swatches {
    display: flex;
    gap: 4px;
  }
  .preset-swatch {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
  .preset-desc {
    font-size: 10px;
    color: var(--fg-dim, #8b8f97);
    line-height: 1.4;
  }

  /* FIELDS */
  .hud-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .hud-label {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: var(--fg-dim, #8b8f97);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .hud-input-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .hud-color-box {
    width: 28px;
    height: 28px;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    cursor: pointer;
    background: none;
    outline: none;
  }
  .hud-color-box::-webkit-color-swatch-wrapper { padding: 0; }
  .hud-color-box::-webkit-color-swatch { border: none; border-radius: 5px; }
  .hud-text-input, .hud-textarea {
    flex: 1;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 6px 10px;
    color: #fff;
    font-family: inherit;
    font-size: 11px;
    outline: none;
    transition: border-color 0.2s;
  }
  .hud-textarea {
    min-height: 48px;
    resize: vertical;
    line-height: 1.4;
  }
  .hud-text-input:focus, .hud-textarea:focus {
    border-color: var(--rec, #ff3a2f);
  }
  .hud-slider {
    flex: 1;
    height: 4px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
  }

  /* ACTIONS */
  .hud-actions {
    display: flex;
    gap: 8px;
    margin-top: 4px;
  }
  .hud-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 9px 12px;
    border-radius: 6px;
    font-family: inherit;
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: none;
  }
  .hud-btn-primary {
    background: var(--rec, #ff3a2f);
    color: #fff;
  }
  .hud-btn-primary:hover {
    filter: brightness(1.15);
  }
  .hud-btn-secondary {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
  .hud-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.14);
  }
  .hud-toast {
    font-size: 10px;
    text-align: center;
    color: #00ffaa;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .hud-toast.show {
    opacity: 1;
  }
</style>

<div id="dna-hud-root">
  <div id="dna-hud-toggle">
    <div class="hud-dot"></div>
    <span class="hud-title">Studio DNA · Live Tuning HUD</span>
    <span class="hud-badge" id="hud-active-preset-badge">OP–XY</span>
  </div>

  <div id="dna-hud-panel">
    <div class="hud-header">
      <h2><span class="hud-dot"></span> Live Tuning Lab</h2>
      <button class="hud-close-btn" id="dna-hud-close">✕</button>
    </div>

    <div class="hud-tabs">
      <button class="hud-tab-btn active" data-tab="presets">Presets</button>
      <button class="hud-tab-btn" data-tab="colors">Cores &amp; Tokens</button>
      <button class="hud-tab-btn" data-tab="copy">Copy &amp; Textos</button>
      <button class="hud-tab-btn" data-tab="export">Exportar</button>
    </div>

    <div class="hud-body">
      <!-- TAB 1: PRESETS -->
      <div class="hud-tab-content active" id="tab-presets">
        <div class="preset-card active" data-preset="swiss">
          <div class="preset-top">
            <span class="preset-name">🇨🇭 Swiss Industrial Brutalism</span>
            <div class="preset-swatches">
              <span class="preset-swatch" style="background:#0c0d0e"></span>
              <span class="preset-swatch" style="background:#e2e4e8"></span>
              <span class="preset-swatch" style="background:#ff3a2f"></span>
            </div>
          </div>
          <p class="preset-desc">Original OP–XY. Preto fosco alpino cirúrgico, contraste ultra-alto, foco analítico e 1 ponto de gravação vermelho.</p>
        </div>

        <div class="preset-card" data-preset="berlin">
          <div class="preset-top">
            <span class="preset-name">🇩🇪 Berlin Dark Steel</span>
            <div class="preset-swatches">
              <span class="preset-swatch" style="background:#070809"></span>
              <span class="preset-swatch" style="background:#dce8e0"></span>
              <span class="preset-swatch" style="background:#00ff66"></span>
            </div>
          </div>
          <p class="preset-desc">KRONOS–8. Aço escovado industrial, acústica de clube, microswitches táteis com sinal verde fósforo cyber.</p>
        </div>

        <div class="preset-card" data-preset="braun">
          <div class="preset-top">
            <span class="preset-name">📻 Braun Functional Heritage</span>
            <div class="preset-swatches">
              <span class="preset-swatch" style="background:#131211"></span>
              <span class="preset-swatch" style="background:#f2ece2"></span>
              <span class="preset-swatch" style="background:#e8590c"></span>
            </div>
          </div>
          <p class="preset-desc">MODUL–01. Dieter Rams &amp; Bauhaus. Grafite tátil acetinado, tipografia creme/osso e acento laranja ocre industrial.</p>
        </div>

        <div class="preset-card" data-preset="tokyo">
          <div class="preset-top">
            <span class="preset-name">🇯🇵 Tokyo Neo-Acoustic</span>
            <div class="preset-swatches">
              <span class="preset-swatch" style="background:#090b10"></span>
              <span class="preset-swatch" style="background:#e2e9f5"></span>
              <span class="preset-swatch" style="background:#00e5ff"></span>
            </div>
          </div>
          <p class="preset-desc">AETHEL–XY. Akihabara de precisão, matriz neural de alta velocidade, acabamento obsidiana com acento ciano elétrico.</p>
        </div>
      </div>

      <!-- TAB 2: CORES -->
      <div class="hud-tab-content" id="tab-colors">
        <div class="hud-field">
          <div class="hud-label"><span>Acento / Record Key (--rec)</span><span id="val-rec">#ff3a2f</span></div>
          <div class="hud-input-row">
            <input type="color" class="hud-color-box" id="pick-rec" value="#ff3a2f">
            <input type="text" class="hud-text-input" id="text-rec" value="#ff3a2f">
          </div>
        </div>

        <div class="hud-field">
          <div class="hud-label"><span>Fundo Principal (--bg)</span><span id="val-bg">#0c0d0e</span></div>
          <div class="hud-input-row">
            <input type="color" class="hud-color-box" id="pick-bg" value="#0c0d0e">
            <input type="text" class="hud-text-input" id="text-bg" value="#0c0d0e">
          </div>
        </div>

        <div class="hud-field">
          <div class="hud-label"><span>Superfície de Componentes (--surface)</span><span id="val-surface">#141517</span></div>
          <div class="hud-input-row">
            <input type="color" class="hud-color-box" id="pick-surface" value="#141517">
            <input type="text" class="hud-text-input" id="text-surface" value="#141517">
          </div>
        </div>

        <div class="hud-field">
          <div class="hud-label"><span>Texto Primário (--fg)</span><span id="val-fg">#e2e4e8</span></div>
          <div class="hud-input-row">
            <input type="color" class="hud-color-box" id="pick-fg" value="#e2e4e8">
            <input type="text" class="hud-text-input" id="text-fg" value="#e2e4e8">
          </div>
        </div>

        <div class="hud-field">
          <div class="hud-label"><span>Texto Secundário (--fg-dim)</span><span id="val-fg-dim">#8b8f97</span></div>
          <div class="hud-input-row">
            <input type="color" class="hud-color-box" id="pick-fg-dim" value="#8b8f97">
            <input type="text" class="hud-text-input" id="text-fg-dim" value="#8b8f97">
          </div>
        </div>

        <div class="hud-field">
          <div class="hud-label"><span>Bordas Técnicas Opacidade</span><span id="val-border">0.08</span></div>
          <div class="hud-input-row">
            <input type="range" class="hud-slider" id="slider-border" min="0.02" max="0.35" step="0.01" value="0.08">
          </div>
        </div>
      </div>

      <!-- TAB 3: COPY & TEXTOS -->
      <div class="hud-tab-content" id="tab-copy">
        <div class="hud-field">
          <div class="hud-label"><span>Nome do Instrumento / Marca</span></div>
          <input type="text" class="hud-text-input" id="edit-brand" value="OP–XY">
        </div>

        <div class="hud-field">
          <div class="hud-label"><span>Preço / CTA no Menu</span></div>
          <input type="text" class="hud-text-input" id="edit-price" value="$2,299">
        </div>

        <div class="hud-field">
          <div class="hud-label"><span>Sub-categorias Hero (separadas por ponto)</span></div>
          <input type="text" class="hud-text-input" id="edit-sub" value="portable synthesizer · sampler · sequencer">
        </div>

        <div class="hud-field">
          <div class="hud-label"><span>Claim Hero (Headline principal)</span></div>
          <textarea class="hud-textarea" id="edit-claim">a synthesizer, a sampler and a sequencer. one instrument, all black.</textarea>
        </div>

        <div class="hud-field">
          <div class="hud-label"><span>Palavra 4 da Seção Perform</span></div>
          <input type="text" class="hud-text-input" id="edit-word4" value="perform.">
        </div>

        <div class="hud-field">
          <div class="hud-label"><span>Ficha Técnica Resumida</span></div>
          <input type="text" class="hud-text-input" id="edit-specs" value="four rows · 68 keys · one grayscale">
        </div>

        <div class="hud-field">
          <div class="hud-label"><span>Descrição da Grade / Seção</span></div>
          <textarea class="hud-textarea" id="edit-desc">the whole instrument is a grid. one row of instruments, one row of steps, and a two-octave keyboard under your fingers. the display keeps everything in grayscale, so the red means one thing: record.</textarea>
        </div>
      </div>

      <!-- TAB 4: EXPORTAR -->
      <div class="hud-tab-content" id="tab-export">
        <div class="hud-field">
          <div class="hud-label"><span>Especificação Gerada (brand-spec.json)</span></div>
          <textarea class="hud-textarea" id="export-json-view" style="min-height: 140px; font-size: 10px;" readonly></textarea>
        </div>
        <div class="hud-actions">
          <button class="hud-btn hud-btn-primary" id="btn-copy-spec">📋 Copiar JSON</button>
          <button class="hud-btn hud-btn-secondary" id="btn-download-spec">💾 Baixar Arquivo</button>
        </div>
        <div class="hud-toast" id="hud-toast">Especificação copiada com sucesso!</div>
      </div>
    </div>
  </div>
</div>

<script id="studio-dna-live-hud-logic">
(function() {
  const PRESETS = {
    swiss: {
      id: 'swiss',
      name: 'Swiss Industrial Brutalism',
      badge: 'OP–XY',
      colors: {
        '--bg': '#0c0d0e',
        '--surface': '#141517',
        '--surface-raised': '#1c1d20',
        '--border': 'rgba(255, 255, 255, 0.08)',
        '--border-strong': 'rgba(255, 255, 255, 0.18)',
        '--fg': '#e2e4e8',
        '--fg-dim': '#8b8f97',
        '--fg-muted': '#52565e',
        '--rec': '#ff3a2f',
        '--rec-dim': 'rgba(255, 58, 47, 0.22)',
        '--status-lens': '#00ffaa'
      },
      copy: {
        brand: 'OP–XY',
        price: '$2,299',
        claim: 'a synthesizer, a sampler and a sequencer. one instrument, all black.',
        sub: 'portable synthesizer · sampler · sequencer',
        word4: 'perform.',
        specs: 'four rows · 68 keys · one grayscale',
        desc: 'the whole instrument is a grid. one row of instruments, one row of steps, and a two-octave keyboard under your fingers. the display keeps everything in grayscale, so the red means one thing: record.'
      }
    },
    berlin: {
      id: 'berlin',
      name: 'Berlin Dark Steel',
      badge: 'KRONOS–8',
      colors: {
        '--bg': '#070809',
        '--surface': '#0e1012',
        '--surface-raised': '#15191c',
        '--border': 'rgba(0, 255, 102, 0.12)',
        '--border-strong': 'rgba(0, 255, 102, 0.28)',
        '--fg': '#dce8e0',
        '--fg-dim': '#768c7e',
        '--fg-muted': '#45574c',
        '--rec': '#00ff66',
        '--rec-dim': 'rgba(0, 255, 102, 0.24)',
        '--status-lens': '#00ff66'
      },
      copy: {
        brand: 'KRONOS–8',
        price: '€2,450',
        claim: 'sixteen raw analog tracks. forged in dark steel, engineered for the floor.',
        sub: 'precision analog workstation · dual dsp core',
        word4: 'trigger.',
        specs: '68 microswitches · zero latency · phosphor display',
        desc: 'every tactile response is calibrated for club acoustics. velocity-sensitive mechanical pads, dedicated macro pots, and a discrete analog filter path behind every voice.'
      }
    },
    braun: {
      id: 'braun',
      name: 'Braun Functional Heritage',
      badge: 'MODUL–01',
      colors: {
        '--bg': '#131211',
        '--surface': '#1c1a18',
        '--surface-raised': '#262320',
        '--border': 'rgba(235, 215, 195, 0.10)',
        '--border-strong': 'rgba(235, 215, 195, 0.22)',
        '--fg': '#f2ece2',
        '--fg-dim': '#a1978a',
        '--fg-muted': '#5c554c',
        '--rec': '#e8590c',
        '--rec-dim': 'rgba(232, 89, 12, 0.24)',
        '--status-lens': '#f59f00'
      },
      copy: {
        brand: 'MODUL–01',
        price: '$1,950',
        claim: 'order, clarity and restraint. an honest instrument for timeless sound design.',
        sub: 'electroacoustic sound system · intuitive composition',
        word4: 'articulate.',
        specs: '68 precision contacts · matte chassis · tactile feedback',
        desc: 'form derived strictly from acoustic purpose. tactile mechanical switches grouped by functional hierarchy, with a high-contrast monochrome interface for zero distraction.'
      }
    },
    tokyo: {
      id: 'tokyo',
      name: 'Tokyo Neo-Acoustic',
      badge: 'AETHEL–XY',
      colors: {
        '--bg': '#090b10',
        '--surface': '#10141d',
        '--surface-raised': '#18202f',
        '--border': 'rgba(0, 229, 255, 0.12)',
        '--border-strong': 'rgba(0, 229, 255, 0.28)',
        '--fg': '#e2e9f5',
        '--fg-dim': '#7e90b0',
        '--fg-muted': '#4a5770',
        '--rec': '#00e5ff',
        '--rec-dim': 'rgba(0, 229, 255, 0.25)',
        '--status-lens': '#00e5ff'
      },
      copy: {
        brand: 'AETHEL–XY',
        price: '¥348,000',
        claim: 'physical modeling meets generative sequencing. precision in every touch.',
        sub: 'neural polyphonic engine · multi-timbral studio',
        word4: 'compose.',
        specs: '68 micro-actuated keys · haptic feedback · dual neural dsp',
        desc: 'designed for fluid real-time improvisation. high-speed scanning matrix captures subtle finger velocity and polyphonic aftertouch across all sixty-eight keys.'
      }
    }
  };

  let activePresetKey = 'swiss';
  const root = document.documentElement;

  // DOM Elements
  const toggleBtn = document.getElementById('dna-hud-toggle');
  const panel = document.getElementById('dna-hud-panel');
  const closeBtn = document.getElementById('dna-hud-close');
  const badge = document.getElementById('hud-active-preset-badge');

  // Open/Close
  toggleBtn.addEventListener('click', () => {
    panel.classList.toggle('open');
  });
  closeBtn.addEventListener('click', () => {
    panel.classList.remove('open');
  });

  // Tabs
  const tabBtns = document.querySelectorAll('.hud-tab-btn');
  const tabContents = document.querySelectorAll('.hud-tab-content');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
      if (btn.dataset.tab === 'export') updateExportSpec();
    });
  });

  // Helpers
  function hexToRgba(hex, alpha) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return 'rgba(' + [(num >> 16) & 255, (num >> 8) & 255, num & 255].join(', ') + ', ' + alpha + ')';
  }

  // Update 3D Hardware Accent
  function update3DAccent(hex) {
    if (typeof window.OPXY_UPDATE_ACCENT === 'function') {
      window.OPXY_UPDATE_ACCENT(hex);
    }
  }

  // Apply Colors
  function applyColor(key, val) {
    root.style.setProperty(key, val);
    if (key === '--bg') {
      document.body.style.backgroundColor = val;
    }
    if (key === '--rec') {
      root.style.setProperty('--rec-dim', hexToRgba(val, 0.22));
      update3DAccent(val);
      document.querySelectorAll('.hud-dot').forEach(d => {
        d.style.background = val;
        d.style.boxShadow = '0 0 10px ' + val;
      });
    }
    updateExportSpec();
  }

  // Bind Color Inputs
  function bindColorField(name, cssVar) {
    const picker = document.getElementById('pick-' + name);
    const text = document.getElementById('text-' + name);
    const label = document.getElementById('val-' + name);
    if (!picker || !text) return;

    picker.addEventListener('input', (e) => {
      const v = e.target.value;
      text.value = v;
      if (label) label.textContent = v;
      applyColor(cssVar, v);
    });
    text.addEventListener('input', (e) => {
      const v = e.target.value;
      if (/^#[0-9a-fA-F]{6}$/.test(v)) {
        picker.value = v;
        if (label) label.textContent = v;
        applyColor(cssVar, v);
      }
    });
  }

  bindColorField('rec', '--rec');
  bindColorField('bg', '--bg');
  bindColorField('surface', '--surface');
  bindColorField('fg', '--fg');
  bindColorField('fg-dim', '--fg-dim');

  // Border Slider
  const sliderBorder = document.getElementById('slider-border');
  if (sliderBorder) {
    sliderBorder.addEventListener('input', (e) => {
      const a = e.target.value;
      document.getElementById('val-border').textContent = a;
      root.style.setProperty('--border', 'rgba(255, 255, 255, ' + a + ')');
      updateExportSpec();
    });
  }

  // Apply Copy
  function applyCopyData(copy) {
    // 1. Brand name in nav & hero
    const navBrand = document.querySelector('#nav .wm');
    if (navBrand) navBrand.textContent = copy.brand;

    const heroH1 = document.querySelector('#hero .wm h1');
    if (heroH1) {
      heroH1.setAttribute('aria-label', copy.brand);
      heroH1.innerHTML = copy.brand.split('').map(char => '<span>' + char + '</span>').join('');
    }

    // 2. Price in nav
    const priceEl = document.querySelector('#nav .btn .price');
    if (priceEl) priceEl.textContent = copy.price;

    // 3. Subtitle / Categories
    const subContainer = document.querySelector('#hero .wm .k');
    if (subContainer) {
      const parts = copy.sub.split('·').map(s => s.trim()).filter(Boolean);
      subContainer.innerHTML = parts.map(p => '<span>' + p + '</span>').join(' ');
    }

    // 4. Claim lines
    const claimEl = document.querySelector('#hero .claim');
    if (claimEl) {
      const words = copy.claim.split(' ');
      const chunkSize = Math.ceil(words.length / 3);
      const l1 = words.slice(0, chunkSize).join(' ');
      const l2 = words.slice(chunkSize, chunkSize * 2).join(' ');
      const l3 = words.slice(chunkSize * 2).join(' ');
      claimEl.innerHTML = '<span class="l"><span>' + l1 + '</span></span>' +
                          '<span class="l"><span>' + l2 + '</span></span>' +
                          '<span class="l"><span>' + l3 + '</span></span>';
    }

    // 5. Word 4 in Strip stack
    const stackWords = document.querySelectorAll('#strip .stack b');
    if (stackWords.length >= 4) {
      stackWords[3].textContent = copy.word4;
    }

    // 6. Specs tag
    const specsEl = document.querySelector('#strip .cap .k');
    if (specsEl) specsEl.textContent = copy.specs;

    // 7. Description
    const descEl = document.querySelector('#strip .cap p');
    if (descEl) descEl.textContent = copy.desc;

    // Document title
    document.title = copy.brand + ' · ' + copy.sub;
  }

  // Bind Copy Inputs
  function bindCopyInput(id, callback) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      callback(el.value);
      updateExportSpec();
    });
  }

  bindCopyInput('edit-brand', (v) => {
    const navBrand = document.querySelector('#nav .wm');
    if (navBrand) navBrand.textContent = v;
    const heroH1 = document.querySelector('#hero .wm h1');
    if (heroH1) {
      heroH1.setAttribute('aria-label', v);
      heroH1.innerHTML = v.split('').map(char => '<span>' + char + '</span>').join('');
    }
    badge.textContent = v;
  });

  bindCopyInput('edit-price', (v) => {
    const priceEl = document.querySelector('#nav .btn .price');
    if (priceEl) priceEl.textContent = v;
  });

  bindCopyInput('edit-sub', (v) => {
    const subContainer = document.querySelector('#hero .wm .k');
    if (subContainer) {
      const parts = v.split('·').map(s => s.trim()).filter(Boolean);
      subContainer.innerHTML = parts.map(p => '<span>' + p + '</span>').join(' ');
    }
  });

  bindCopyInput('edit-claim', (v) => {
    const claimEl = document.querySelector('#hero .claim');
    if (claimEl) {
      const words = v.split(' ');
      const chunkSize = Math.ceil(words.length / 3);
      const l1 = words.slice(0, chunkSize).join(' ');
      const l2 = words.slice(chunkSize, chunkSize * 2).join(' ');
      const l3 = words.slice(chunkSize * 2).join(' ');
      claimEl.innerHTML = '<span class="l"><span>' + l1 + '</span></span>' +
                          '<span class="l"><span>' + l2 + '</span></span>' +
                          '<span class="l"><span>' + l3 + '</span></span>';
    }
  });

  bindCopyInput('edit-word4', (v) => {
    const stackWords = document.querySelectorAll('#strip .stack b');
    if (stackWords.length >= 4) stackWords[3].textContent = v;
  });

  bindCopyInput('edit-specs', (v) => {
    const specsEl = document.querySelector('#strip .cap .k');
    if (specsEl) specsEl.textContent = v;
  });

  bindCopyInput('edit-desc', (v) => {
    const descEl = document.querySelector('#strip .cap p');
    if (descEl) descEl.textContent = v;
  });

  // Apply Preset
  function applyPreset(key) {
    const preset = PRESETS[key];
    if (!preset) return;
    activePresetKey = key;

    // Update preset cards UI
    document.querySelectorAll('.preset-card').forEach(c => {
      c.classList.toggle('active', c.dataset.preset === key);
    });

    // Update badge
    badge.textContent = preset.badge;

    // Apply Colors
    Object.entries(preset.colors).forEach(([k, v]) => {
      root.style.setProperty(k, v);
    });
    document.body.style.backgroundColor = preset.colors['--bg'];

    // Update Color Pickers
    const updatePicker = (id, hex) => {
      const p = document.getElementById('pick-' + id);
      const t = document.getElementById('text-' + id);
      const l = document.getElementById('val-' + id);
      if (p) p.value = hex;
      if (t) t.value = hex;
      if (l) l.textContent = hex;
    };
    updatePicker('rec', preset.colors['--rec']);
    updatePicker('bg', preset.colors['--bg']);
    updatePicker('surface', preset.colors['--surface']);
    updatePicker('fg', preset.colors['--fg']);
    updatePicker('fg-dim', preset.colors['--fg-dim']);

    // Update 3D hardware record color
    update3DAccent(preset.colors['--rec']);

    // Apply Copy
    applyCopyData(preset.copy);

    // Update Copy Inputs
    document.getElementById('edit-brand').value = preset.copy.brand;
    document.getElementById('edit-price').value = preset.copy.price;
    document.getElementById('edit-sub').value = preset.copy.sub;
    document.getElementById('edit-claim').value = preset.copy.claim;
    document.getElementById('edit-word4').value = preset.copy.word4;
    document.getElementById('edit-specs').value = preset.copy.specs;
    document.getElementById('edit-desc').value = preset.copy.desc;

    // Update Export JSON
    updateExportSpec();
  }

  // Preset Clicks
  document.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('click', () => {
      applyPreset(card.dataset.preset);
    });
  });

  // Export JSON Builder
  function updateExportSpec() {
    const view = document.getElementById('export-json-view');
    if (!view) return;

    const brand = document.getElementById('edit-brand').value;
    const rec = document.getElementById('text-rec').value;
    const bg = document.getElementById('text-bg').value;
    const surface = document.getElementById('text-surface').value;
    const fg = document.getElementById('text-fg').value;
    const fgDim = document.getElementById('text-fg-dim').value;

    const spec = {
      "$schema": "https://studio-dna-engine.dev/schemas/brand-spec.json",
      "meta": {
        "slug": brand.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        "brandName": brand,
        "basePreset": activePresetKey,
        "extractedAt": new Date().toISOString()
      },
      "colors": {
        "--bg": bg,
        "--surface": surface,
        "--fg": fg,
        "--fg-dim": fgDim,
        "--rec": rec,
        "--rec-dim": hexToRgba(rec, 0.22)
      },
      "copy": {
        "brand": brand,
        "price": document.getElementById('edit-price').value,
        "categories": document.getElementById('edit-sub').value,
        "heroClaim": document.getElementById('edit-claim').value,
        "performWord": document.getElementById('edit-word4').value,
        "specs": document.getElementById('edit-specs').value,
        "description": document.getElementById('edit-desc').value
      }
    };

    view.value = JSON.stringify(spec, null, 2);
  }

  // Copy Spec Action
  const copyBtn = document.getElementById('btn-copy-spec');
  const toast = document.getElementById('hud-toast');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      updateExportSpec();
      const txt = document.getElementById('export-json-view').value;
      navigator.clipboard.writeText(txt).then(() => {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2500);
      });
    });
  }

  // Download Spec Action
  const dlBtn = document.getElementById('btn-download-spec');
  if (dlBtn) {
    dlBtn.addEventListener('click', () => {
      updateExportSpec();
      const txt = document.getElementById('export-json-view').value;
      const blob = new Blob([txt], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (document.getElementById('edit-brand').value || 'brand') + '-spec.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // Initialize
  updateExportSpec();
})();
</script>
`;

// Insert HUD before closing body
const fullStandaloneHtml = bodyBefore + '\n' + HUD_COMPONENT + '\n' + moduleScript;

// Output paths
const clientSiteDir = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'site');
const clientRootDir = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab');
const rootFile = path.join(__dirname, '..', 'OP-XY — Hero to Strip Live Tuning Lab.html');

if (!fs.existsSync(clientSiteDir)) fs.mkdirSync(clientSiteDir, { recursive: true });

fs.writeFileSync(path.join(clientSiteDir, 'index.html'), fullStandaloneHtml, 'utf8');
fs.writeFileSync(path.join(clientRootDir, 'index.html'), fullStandaloneHtml, 'utf8');
fs.writeFileSync(rootFile, fullStandaloneHtml, 'utf8');

console.log('Successfully written standalone files:');
console.log('1.', path.join(clientSiteDir, 'index.html'), 'Size:', fs.statSync(path.join(clientSiteDir, 'index.html')).size);
console.log('2.', path.join(clientRootDir, 'index.html'), 'Size:', fs.statSync(path.join(clientRootDir, 'index.html')).size);
console.log('3.', rootFile, 'Size:', fs.statSync(rootFile).size);
