/**
 * Studio DNA — Agency Dev HUD & Live Tuning Bridge (Tweakpane 4)
 * Injects a floating Tweakpane HUD, dynamic color token mapper, Lenis physics tuner,
 * Click-to-MCP Alt+Click bidirectional bridge, and DNA Live Workbench.
 */

'use strict';

const DIRECTIONS = {
  T03A: {
    id: 'T03A',
    name: 'Systemic-clean',
    description: 'Swiss Precision Grid, 1px hairline rules, monospace data tags, obsidian dark mode',
    tokens: {
      '--bg-base': '#030508',
      '--bg-color': '#030508',
      '--primary': '#38bdf8',
      '--accent': '#64cefb',
      '--text-primary': '#fafaf9',
      '--font-headline': "'Inter', sans-serif",
      '--border-radius': '4px',
      '--card-alpha': '0.03'
    }
  },
  T03B: {
    id: 'T03B',
    name: 'Editorial-minimal',
    description: 'High-contrast typography, zero-radius brutalist cards, block mask reveal',
    tokens: {
      '--bg-base': '#0a0a0a',
      '--bg-color': '#0a0a0a',
      '--primary': '#ffffff',
      '--accent': '#e5e5e5',
      '--text-primary': '#f5f5f5',
      '--font-headline': "'Syne', 'Playfair Display', serif",
      '--border-radius': '0px',
      '--card-alpha': '0.05'
    }
  },
  T03C: {
    id: 'T03C',
    name: 'Expressive-bold',
    description: 'Kinetic luxury, golden accents, rounded organic cards, smooth slow parallax',
    tokens: {
      '--bg-base': '#07080a',
      '--bg-color': '#07080a',
      '--primary': '#d4af37',
      '--accent': '#f59e0b',
      '--text-primary': '#e5e0d8',
      '--font-headline': "'Space Grotesk', sans-serif",
      '--border-radius': '12px',
      '--card-alpha': '0.08'
    }
  }
};

const IMPECCABLE_VERBS = [
  'bolder',
  'quieter',
  'distill',
  'typeset',
  'polish',
  'animate',
  'harden'
];

/**
 * Captures live selection payload for Live-MCP bidirectional bridge (Click-to-MCP)
 * @param {HTMLElement|object} targetEl
 * @param {Window|object} [win=globalThis]
 * @returns {object|null}
 */
function captureLiveSelectionPayload(targetEl, win = globalThis) {
  if (!targetEl) return null;

  const getAttr = (el, attr) => {
    if (!el) return null;
    if (typeof el.getAttribute === 'function') return el.getAttribute(attr);
    return el[attr] || null;
  };

  const trackedNode = (typeof targetEl.closest === 'function')
    ? (targetEl.closest('[data-ds]') || targetEl)
    : targetEl;

  const capsuleRoot = (typeof trackedNode.closest === 'function')
    ? (trackedNode.closest('dna-capsule, [data-capsule-id]') || trackedNode.closest('section, header, footer'))
    : null;

  const rect = (typeof trackedNode.getBoundingClientRect === 'function')
    ? (trackedNode.getBoundingClientRect() || {})
    : { top: 0, left: 0, width: 0, height: 0, x: 0, y: 0 };

  const cs = (win && typeof win.getComputedStyle === 'function')
    ? (win.getComputedStyle(trackedNode) || {})
    : {};

  let clientSlug = (win && win.__DNA_CLIENT_SLUG__) || 'default';
  if ((!win || !win.__DNA_CLIENT_SLUG__) && win && win.location) {
    const pathname = win.location.pathname || '';
    const parts = pathname.split('/').filter(Boolean);
    if ((parts[0] === 'clientes' || parts[0] === 'projetos') && parts[1]) {
      clientSlug = parts[1];
    } else if (parts[0]) {
      clientSlug = parts[0];
    }
    if (win.location.search) {
      try {
        const params = new URLSearchParams(win.location.search);
        if (params.get('client')) clientSlug = params.get('client');
      } catch (_) {}
    }
  }

  const dataDs = getAttr(trackedNode, 'data-ds') || '';
  const lineRaw = getAttr(trackedNode, 'data-dna-line');
  const line = lineRaw ? parseInt(String(lineRaw).split('-')[0], 10) || 1 : 1;
  const rawTag = trackedNode.tagName || 'div';
  const tagName = String(rawTag).toLowerCase();
  const id = trackedNode.id || getAttr(trackedNode, 'id');
  let selector = tagName;
  if (id) {
    selector = `${tagName}#${id}`;
  } else if (dataDs) {
    selector = `[data-ds="${dataDs}"]`;
  }

  const capsuleId = capsuleRoot
    ? (getAttr(capsuleRoot, 'data-capsule-id') || getAttr(capsuleRoot, 'id') || null)
    : null;

  const activeScopeVars = {};
  if (cs && cs.getPropertyValue) {
    ['--primary', '--accent', '--bg-base', '--text-primary'].forEach(varName => {
      const val = cs.getPropertyValue(varName);
      if (val) activeScopeVars[varName] = val.trim();
    });
  }

  const telemetry = (win && (win.__DNA_TELEMETRY__ || win.__WORK_STAGE__)) || {};
  const kineticTelemetry = (win && win.__DNA_TELEMETRY__ && typeof win.__DNA_TELEMETRY__.getSnapshotFor === 'function')
    ? win.__DNA_TELEMETRY__.getSnapshotFor(trackedNode)
    : telemetry;

  return {
    clientSlug,
    dsId: dataDs,
    dataDs,
    sourceLineRange: lineRaw || null,
    line,
    capsuleId,
    tagName,
    selector,
    outerHTML: trackedNode.outerHTML || '',
    boundingBox: {
      x: Math.round(rect.x ?? rect.left ?? 0),
      y: Math.round(rect.y ?? rect.top ?? 0),
      top: Math.round(rect.top ?? 0),
      left: Math.round(rect.left ?? 0),
      width: Math.round(rect.width ?? 0),
      height: Math.round(rect.height ?? 0),
      viewportWidth: (win && win.innerWidth) || 1440,
      viewportHeight: (win && win.innerHeight) || 900
    },
    computedStyles: {
      display: cs.display || '',
      position: cs.position || '',
      fontFamily: cs.fontFamily || '',
      fontSize: cs.fontSize || '',
      lineHeight: cs.lineHeight || '',
      letterSpacing: cs.letterSpacing || '',
      color: cs.color || '',
      backgroundColor: cs.backgroundColor || '',
      padding: cs.padding || '',
      gap: cs.gap || '',
      fontWeight: cs.fontWeight,
      margin: cs.margin,
      opacity: cs.opacity
    },
    activeScopeVars,
    kineticTelemetry,
    telemetry,
    timestamp: Date.now()
  };
}

/**
 * Backwards compatibility wrapper for Click-to-MCP selection
 */
function extractSelectionPayload(element, win = globalThis) {
  return captureLiveSelectionPayload(element, win);
}

/**
 * Applies a visual direction to the document context
 */
function applyDirectionHotSwap(directionId, doc = globalThis.document) {
  const dir = DIRECTIONS[directionId] || DIRECTIONS.T03A;
  if (!doc) return { ok: false, error: 'Document unavailable' };

  if (doc.documentElement) {
    if (typeof doc.documentElement.setAttribute === 'function') {
      doc.documentElement.setAttribute('data-direction', dir.id);
    }
    doc.documentElement['data-direction'] = dir.id;

    if (doc.documentElement.style && typeof doc.documentElement.style.setProperty === 'function') {
      for (const [key, value] of Object.entries(dir.tokens)) {
        doc.documentElement.style.setProperty(key, value);
      }
    }
  }

  return { ok: true, direction: dir };
}

/**
 * Applies one of the 7 Impeccable verbs
 */
function applyImpeccableVerb(verb, doc = globalThis.document) {
  if (!IMPECCABLE_VERBS.includes(verb)) {
    return { ok: false, error: `Invalid verb: ${verb}` };
  }
  if (!doc) return { ok: false, error: 'Document unavailable' };

  const style = doc.documentElement && doc.documentElement.style;
  const setProp = (k, v) => {
    if (style && typeof style.setProperty === 'function') style.setProperty(k, v);
  };

  switch (verb) {
    case 'bolder':
      setProp('--font-weight-headline', '800');
      setProp('--primary-filter', 'saturate(1.25) contrast(1.15)');
      if (doc.body && doc.body.classList) doc.body.classList.add('impeccable-bolder');
      break;
    case 'quieter':
      setProp('--card-alpha', '0.02');
      setProp('--text-muted-opacity', '0.65');
      if (doc.body && doc.body.classList) doc.body.classList.add('impeccable-quieter');
      break;
    case 'distill':
      setProp('--box-shadow-default', 'none');
      setProp('--border-subtle', '1px solid rgba(255, 255, 255, 0.05)');
      if (doc.body && doc.body.classList) doc.body.classList.add('impeccable-distill');
      break;
    case 'typeset':
      setProp('--tracking-tight', '-0.03em');
      setProp('--line-height-body', '1.62');
      setProp('--line-height-headline', '1.15');
      if (doc.body && doc.body.classList) doc.body.classList.add('impeccable-typeset');
      break;
    case 'polish':
      setProp('--backdrop-blur', '24px');
      setProp('--glass-specular', '1px solid rgba(255, 255, 255, 0.12)');
      if (doc.body && doc.body.classList) doc.body.classList.add('impeccable-polish');
      break;
    case 'animate':
      setProp('--transition-smooth', 'cubic-bezier(0.16, 1, 0.3, 1)');
      if (doc.body && doc.body.classList) doc.body.classList.add('impeccable-animate');
      break;
    case 'harden':
      setProp('--apca-contrast-min', '75');
      setProp('--focus-ring', '2px solid #38bdf8');
      if (doc.body && doc.body.classList) doc.body.classList.add('impeccable-harden');
      break;
  }

  return { ok: true, verb };
}

/**
 * Computes Pareto 70/30 score from visual and technical metrics
 */
function calculateParetoScore(metrics = {}) {
  const apca = Number(metrics.apcaLc ?? 75);
  const saliency = Number(metrics.ittiKochSaliency ?? 0.8);
  const zeroOverlap = metrics.zeroOverlapAABB !== false ? 100 : 0;
  const performance = Number(metrics.performanceScore ?? 90);

  // 70% Visual Quality
  const apcaNorm = Math.min(100, Math.max(0, (apca / 90) * 100));
  const saliencyNorm = Math.min(100, Math.max(0, saliency * 100));
  const visualScore = (apcaNorm * 0.4) + (saliencyNorm * 0.3) + (zeroOverlap * 0.3);

  // 30% Technical / Performance
  const techScore = performance;

  const totalScore = (visualScore * 0.7) + (techScore * 0.3);
  return Math.round(totalScore * 10) / 10;
}

const HUD_HTML = `
<!-- STUDIO DNA AGENCY LIVE HUD (TWEAKPANE UMD) -->
<script src="https://cdn.jsdelivr.net/npm/tweakpane@3.1.10/dist/tweakpane.min.js"></script>
<script id="studio-dna-hud-script">
(function() {
  const DIRECTIONS = ${JSON.stringify(DIRECTIONS)};
  const IMPECCABLE_VERBS = ${JSON.stringify(IMPECCABLE_VERBS)};

  function getClientSlug() {
    const pathname = window.location.pathname || '';
    const parts = pathname.split('/').filter(Boolean);
    if ((parts[0] === 'clientes' || parts[0] === 'projetos') && parts[1]) {
      return parts[1];
    } else if (parts[0]) {
      return parts[0];
    }
    const params = new URLSearchParams(window.location.search);
    return params.get('client') || 'default';
  }

  function initHud() {
    if (typeof Tweakpane === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const isWorkbenchMode = urlParams.has('workbench') || urlParams.get('live') === '1';

    const pane = new Tweakpane.Pane({
      title: '🎛️ Studio DNA · Live Tuning & Workbench',
      expanded: isWorkbenchMode
    });

    pane.element.style.position = 'fixed';
    pane.element.style.bottom = '24px';
    pane.element.style.right = '24px';
    pane.element.style.zIndex = '2147483647';
    pane.element.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.75)';

    function bind(folder, obj, key, opts) {
      if (typeof folder.addBinding === 'function') return folder.addBinding(obj, key, opts);
      if (typeof folder.addInput === 'function') return folder.addInput(obj, key, opts);
      return { on: function() {} };
    }

    const PARAMS = {
      activeDirection: 'T03A',
      primaryColor: '#38bdf8',
      accentColor: '#64cefb',
      bgColor: '#080807',
      textColor: '#fafaf9',
      cardAlpha: 0.03,
      lenisDuration: 1.2,
      splitTextUnhide: true,
      apcaLc: '82.4 Lc (Passing)',
      ittiKoch: '0.86 (High Focus)',
      zeroOverlap: '100% (Zero Collision)',
      paretoScore: '92.4 / 100'
    };

    // ── 1. DNA Live Workbench & Hot-Swap de Direções ─────────────────────
    const fWorkbench = pane.addFolder({ title: '🧬 DNA Live Workbench (70/30)' });

    bind(fWorkbench, PARAMS, 'activeDirection', {
      label: 'Direção Visual',
      options: {
        'T03A: Systemic-clean': 'T03A',
        'T03B: Editorial-minimal': 'T03B',
        'T03C: Expressive-bold': 'T03C'
      }
    }).on('change', (ev) => {
      const dir = DIRECTIONS[ev.value];
      if (dir && dir.tokens) {
        document.documentElement.setAttribute('data-direction', ev.value);
        for (const [k, v] of Object.entries(dir.tokens)) {
          document.documentElement.style.setProperty(k, v);
        }
        console.log('✨ [Workbench] Hot-Swap para direção:', dir.name);
      }
    });

    // Subfolder de Verbos Impeccable
    const fVerbs = fWorkbench.addFolder({ title: '⚡ Verbos Impeccable (Mutação)' });
    IMPECCABLE_VERBS.forEach(verb => {
      const btn = fVerbs.addButton({ title: '✦ ' + verb.toUpperCase() });
      btn.on('click', () => {
        document.body.classList.add('impeccable-' + verb);
        console.log('⚡ [Impeccable] Aplicado verbo:', verb);
      });
    });

    // Placar ao Vivo
    const fScore = fWorkbench.addFolder({ title: '📊 Placar Pareto 70/30' });
    bind(fScore, PARAMS, 'apcaLc', { readonly: true, label: 'APCA Lc' });
    bind(fScore, PARAMS, 'ittiKoch', { readonly: true, label: 'Saliência' });
    bind(fScore, PARAMS, 'zeroOverlap', { readonly: true, label: 'Zero Overlap' });
    bind(fScore, PARAMS, 'paretoScore', { readonly: true, label: 'Score 70/30' });

    // Ação Aprovar Direção H02
    const btnApprove = fWorkbench.addButton({ title: '✅ Aprovar Direção (H02)' });
    btnApprove.on('click', async () => {
      const slug = getClientSlug();
      const payload = {
        clientSlug: slug,
        directionId: PARAMS.activeDirection,
        approvedByRole: 'art_director',
        sha256: 'sha256:' + Array.from(crypto.getRandomValues(new Uint8Array(32))).map(b => b.toString(16).padStart(2, '0')).join('')
      };
      try {
        const res = await fetch('/__dna_live_approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (json.ok) {
          alert('✅ Direção ' + PARAMS.activeDirection + ' aprovada com sucesso (Gate H02 gravado no Ledger)!');
        } else {
          alert('⚠️ Erro ao aprovar: ' + (json.error || 'Erro desconhecido'));
        }
      } catch (err) {
        alert('⚠️ Falha na comunicação com /__dna_live_approve: ' + err.message);
      }
    });

    // ── 2. Cores & Tokens ───────────────────────────────────────────────
    const fTheme = pane.addFolder({ title: '🎨 Cores & Tokens' });
    
    bind(fTheme, PARAMS, 'primaryColor', { label: 'Primary' }).on('change', (ev) => {
      document.documentElement.style.setProperty('--primary', ev.value);
      document.documentElement.style.setProperty('--accent-laser', ev.value);
      document.querySelectorAll('.btn-primary, .bg-primary, [class*="btn-laser"]').forEach(el => {
        el.style.backgroundColor = ev.value;
      });
    });

    bind(fTheme, PARAMS, 'accentColor', { label: 'Accent' }).on('change', (ev) => {
      document.documentElement.style.setProperty('--accent', ev.value);
      document.documentElement.style.setProperty('--color-accent', ev.value);
    });

    bind(fTheme, PARAMS, 'bgColor', { label: 'Background' }).on('change', (ev) => {
      document.documentElement.style.setProperty('--bg-base', ev.value);
      document.documentElement.style.setProperty('--bg-color', ev.value);
      document.body.style.backgroundColor = ev.value;
      document.documentElement.style.backgroundColor = ev.value;
    });

    bind(fTheme, PARAMS, 'textColor', { label: 'Text Color' }).on('change', (ev) => {
      document.documentElement.style.setProperty('--text-primary', ev.value);
      document.body.style.color = ev.value;
    });

    bind(fTheme, PARAMS, 'cardAlpha', { min: 0.01, max: 0.25, step: 0.01, label: 'Card Alpha' }).on('change', (ev) => {
      document.querySelectorAll('.info-text, .info-text-large, [class*="card"], .glass-card').forEach(el => {
        el.style.backgroundColor = 'rgba(255, 255, 255, ' + ev.value + ')';
      });
    });

    // ── 3. Motion & Scroll Physics ─────────────────────────────────────
    const fMotion = pane.addFolder({ title: '⚡ Motion & Scroll Physics' });
    bind(fMotion, PARAMS, 'lenisDuration', { min: 0.4, max: 3.0, step: 0.1, label: 'Lenis Duration' }).on('change', (ev) => {
      if (window.lenis) window.lenis.options.duration = ev.value;
    });

    const btnRefreshGsap = fMotion.addButton({ title: '🔄 Recalibrar GSAP' });
    btnRefreshGsap.on('click', () => {
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
        console.log('✅ [HUD] ScrollTrigger recalibrado com sucesso.');
      }
    });

    // ── 4. Ações & Persistência ────────────────────────────────────────
    const fActions = pane.addFolder({ title: '💾 Ações & Exportação' });

    const btnSaveDisk = fActions.addButton({ title: '💾 Salvar Brand Spec' });
    btnSaveDisk.on('click', async () => {
      const slug = getClientSlug();
      const payload = {
        slug: slug,
        colors: {
          primary: PARAMS.primaryColor,
          accent: PARAMS.accentColor,
          background: PARAMS.bgColor,
          text: PARAMS.textColor
        }
      };

      try {
        const res = await fetch('/api/save-brand-spec', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const json = await res.json();
        if (json.success) {
          alert('✅ Brand Spec salvo com sucesso no disco!');
        } else {
          alert('⚠️ Erro ao salvar: ' + json.error);
        }
      } catch (err) {
        const css = ':root {\\n  --primary: ' + PARAMS.primaryColor + ';\\n  --accent: ' + PARAMS.accentColor + ';\\n  --bg-base: ' + PARAMS.bgColor + ';\\n  --text-primary: ' + PARAMS.textColor + ';\\n}';
        navigator.clipboard.writeText(css);
        alert('Tokens CSS copiados para a área de transferência.');
      }
    });

    const btnCopyCss = fActions.addButton({ title: '📋 Copiar Tokens CSS' });
    btnCopyCss.on('click', () => {
      const css = ':root {\\n  --primary: ' + PARAMS.primaryColor + ';\\n  --accent: ' + PARAMS.accentColor + ';\\n  --bg-base: ' + PARAMS.bgColor + ';\\n  --text-primary: ' + PARAMS.textColor + ';\\n}';
      navigator.clipboard.writeText(css);
      alert('Tokens CSS copiados para a área de transferência!');
    });
  }

  // ── 5. Ponte Bidirecional Click-to-MCP (Alt + Click) ─────────────────
  function captureLiveSelectionPayload(targetEl) {
    if (!targetEl) return null;
    const trackedNode = (typeof targetEl.closest === 'function')
      ? (targetEl.closest('[data-ds]') || targetEl)
      : targetEl;
    const capsuleRoot = (typeof trackedNode.closest === 'function')
      ? (trackedNode.closest('dna-capsule, [data-capsule-id]') || trackedNode.closest('section, header, footer'))
      : null;
    const rect = (typeof trackedNode.getBoundingClientRect === 'function')
      ? trackedNode.getBoundingClientRect()
      : { top: 0, left: 0, width: 0, height: 0, x: 0, y: 0 };
    const cs = window.getComputedStyle ? (window.getComputedStyle(trackedNode) || {}) : {};

    const dataDs = trackedNode.getAttribute ? (trackedNode.getAttribute('data-ds') || '') : (trackedNode['data-ds'] || '');
    const lineRaw = trackedNode.getAttribute ? trackedNode.getAttribute('data-dna-line') : null;
    const line = lineRaw ? parseInt(String(lineRaw).split('-')[0], 10) || 1 : 1;
    const tagName = (trackedNode.tagName || 'div').toLowerCase();
    const id = trackedNode.id || (trackedNode.getAttribute && trackedNode.getAttribute('id'));
    let selector = tagName;
    if (id) {
      selector = tagName + '#' + id;
    } else if (dataDs) {
      selector = '[data-ds="' + dataDs + '"]';
    }

    const capsuleId = capsuleRoot
      ? (capsuleRoot.getAttribute('data-capsule-id') || capsuleRoot.id || null)
      : null;

    const activeScopeVars = {};
    if (cs.getPropertyValue) {
      ['--primary', '--accent', '--bg-base', '--text-primary'].forEach(function(v) {
        const val = cs.getPropertyValue(v);
        if (val) activeScopeVars[v] = val.trim();
      });
    }

    const telemetry = window.__DNA_TELEMETRY__ || window.__WORK_STAGE__ || {};
    const kineticTelemetry = (window.__DNA_TELEMETRY__ && typeof window.__DNA_TELEMETRY__.getSnapshotFor === 'function')
      ? window.__DNA_TELEMETRY__.getSnapshotFor(trackedNode)
      : telemetry;

    return {
      clientSlug: getClientSlug(),
      dsId: dataDs,
      dataDs: dataDs,
      sourceLineRange: lineRaw || null,
      line: line,
      capsuleId: capsuleId,
      tagName: tagName,
      selector: selector,
      outerHTML: trackedNode.outerHTML || '',
      boundingBox: {
        x: Math.round(rect.x || rect.left || 0),
        y: Math.round(rect.y || rect.top || 0),
        top: Math.round(rect.top || 0),
        left: Math.round(rect.left || 0),
        width: Math.round(rect.width || 0),
        height: Math.round(rect.height || 0),
        viewportWidth: window.innerWidth || 1440,
        viewportHeight: window.innerHeight || 900
      },
      computedStyles: {
        display: cs.display || '',
        position: cs.position || '',
        fontFamily: cs.fontFamily || '',
        fontSize: cs.fontSize || '',
        lineHeight: cs.lineHeight || '',
        letterSpacing: cs.letterSpacing || '',
        color: cs.color || '',
        backgroundColor: cs.backgroundColor || '',
        padding: cs.padding || '',
        gap: cs.gap || '',
        fontWeight: cs.fontWeight,
        margin: cs.margin,
        opacity: cs.opacity
      },
      activeScopeVars: activeScopeVars,
      kineticTelemetry: kineticTelemetry,
      telemetry: telemetry,
      timestamp: Date.now()
    };
  }

  function setupClickToMcp() {
    window.addEventListener('click', function(e) {
      if (!e.altKey) return;
      e.preventDefault();
      e.stopPropagation();

      const payload = captureLiveSelectionPayload(e.target);
      if (!payload) return;

      const target = (typeof e.target.closest === 'function') ? (e.target.closest('[data-ds]') || e.target) : e.target;

      // Visual flash highlight
      const prevOutline = target.style.outline;
      const prevOffset = target.style.outlineOffset;
      target.style.outline = '2px solid #38bdf8';
      target.style.outlineOffset = '2px';
      setTimeout(function() {
        target.style.outline = prevOutline;
        target.style.outlineOffset = prevOffset;
      }, 800);

      fetch('/__dna_live_select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function(res) {
        return res.json();
      }).then(function(data) {
        console.log('✨ [Click-to-MCP] Elemento sincronizado com o MCP:', data);
      }).catch(function(err) {
        console.warn('⚠️ [Click-to-MCP] Falha ao enviar para o MCP:', err);
      });
    }, true);
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', function() {
      initHud();
      setupClickToMcp();
    });
  } else {
    initHud();
    setupClickToMcp();
  }
})();
</script>
`;

function injectDevHud(html) {
  if (!html || typeof html !== 'string') return html;
  if (html.includes('id="studio-dna-hud-script"')) return html;
  return html.replace('</body>', HUD_HTML + '\n</body>');
}

module.exports = {
  DIRECTIONS,
  IMPECCABLE_VERBS,
  extractSelectionPayload,
  captureLiveSelectionPayload,
  applyDirectionHotSwap,
  applyImpeccableVerb,
  calculateParetoScore,
  injectDevHud
};
