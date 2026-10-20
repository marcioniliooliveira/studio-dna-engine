/**
 * Studio DNA — Agency Dev HUD & Live Tuning Bridge (Tweakpane 4)
 * Injects a floating Tweakpane HUD, dynamic color token mapper, Lenis physics tuner, and disk persistence.
 */

const HUD_HTML = `
<!-- STUDIO DNA AGENCY LIVE HUD (TWEAKPANE UMD) -->
<script src="https://cdn.jsdelivr.net/npm/tweakpane@3.1.10/dist/tweakpane.min.js"></script>
<script id="studio-dna-hud-script">
(function() {
  function initHud() {
    if (typeof Tweakpane === 'undefined') return;

    const pane = new Tweakpane.Pane({
      title: '🎛️ Studio DNA · Live Tuning HUD',
      expanded: false
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
      primaryColor: '#38bdf8',
      accentColor: '#64cefb',
      bgColor: '#080807',
      textColor: '#fafaf9',
      cardAlpha: 0.03,
      lenisDuration: 1.2,
      splitTextUnhide: true
    };

    // 1. Aba de Cores & Design Tokens
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
        el.style.backgroundColor = \`rgba(255, 255, 255, \${ev.value})\`;
      });
    });

    // 2. Aba de Física & Animação
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

    // 3. Ações & Persistência
    const fActions = pane.addFolder({ title: '💾 Ações & Exportação' });

    const btnSaveDisk = fActions.addButton({ title: '💾 Salvar Brand Spec' });
    btnSaveDisk.on('click', async () => {
      const pathname = window.location.pathname;
      const parts = pathname.split('/').filter(Boolean);
      const slug = parts[0] || 'default';

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
        // Fallback para Clipboard
        const css = \`:root {
  --primary: \${PARAMS.primaryColor};
  --accent: \${PARAMS.accentColor};
  --bg-base: \${PARAMS.bgColor};
  --text-primary: \${PARAMS.textColor};
}\`;
        navigator.clipboard.writeText(css);
        alert('Tokens CSS copiados para a área de transferência (Servidor de API offline).');
      }
    });

    const btnCopyCss = fActions.addButton({ title: '📋 Copiar Tokens CSS' });
    btnCopyCss.on('click', () => {
      const css = \`:root {
  --primary: \${PARAMS.primaryColor};
  --accent: \${PARAMS.accentColor};
  --bg-base: \${PARAMS.bgColor};
  --text-primary: \${PARAMS.textColor};
}\`;
      navigator.clipboard.writeText(css);
      alert('Tokens CSS copiados para a área de transferência!');
    });
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initHud);
  } else {
    initHud();
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
  injectDevHud
};
