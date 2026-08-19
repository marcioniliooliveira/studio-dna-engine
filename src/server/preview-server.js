const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { loadConfig } = require('../config');
const { generateTailwindConfig } = require('../generators/tailwind-generator');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.md': 'text/markdown; charset=utf-8'
};

function startPreviewServer(options = {}) {
  const config = loadConfig(options);
  const copiasDir = path.resolve(config.outputDir || path.join(process.cwd(), 'copias'));
  const port = options.port || config.previewPort || 4000;

  if (!fs.existsSync(copiasDir)) {
    fs.mkdirSync(copiasDir, { recursive: true });
  }

  const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // API: Iniciar Extração
    if (pathname === '/api/extract' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          const data = JSON.parse(body || '{}');
          if (!data.url) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'URL é obrigatória' }));
            return;
          }

          // Executa em segundo plano
          const { runPipeline } = require('../../index');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Extração iniciada em segundo plano' }));

          runPipeline({
            url: data.url,
            mode: data.mode || 'all',
            headless: true
          }).catch(err => {
            console.error('Erro na extração via Web:', err);
          });
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }

    // API: Obter Dados de um Site
    if (pathname.startsWith('/api/site/')) {
      const siteSlug = pathname.replace('/api/site/', '');
      const sitePath = path.join(copiasDir, siteSlug);

      if (!fs.existsSync(sitePath)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Site não encontrado' }));
        return;
      }

      let siteType = null;
      let dna = null;
      let uiUx = null;
      let masterSpec = null;

      try {
        if (fs.existsSync(path.join(sitePath, 'SITE_TYPE.json'))) {
          siteType = JSON.parse(fs.readFileSync(path.join(sitePath, 'SITE_TYPE.json'), 'utf8'));
        }
        if (fs.existsSync(path.join(sitePath, 'design-system', 'design_dna.json'))) {
          dna = JSON.parse(fs.readFileSync(path.join(sitePath, 'design-system', 'design_dna.json'), 'utf8'));
        }
        if (fs.existsSync(path.join(sitePath, 'ui-ux', 'ui_ux_features.json'))) {
          uiUx = JSON.parse(fs.readFileSync(path.join(sitePath, 'ui-ux', 'ui_ux_features.json'), 'utf8'));
        }
        if (fs.existsSync(path.join(sitePath, 'MASTER_SPEC.md'))) {
          masterSpec = fs.readFileSync(path.join(sitePath, 'MASTER_SPEC.md'), 'utf8');
        }
      } catch (e) {}

      const tailwindConfig = dna ? generateTailwindConfig(dna) : '';

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        siteSlug,
        siteType,
        dna,
        uiUx,
        masterSpec,
        tailwindConfig
      }));
      return;
    }

    // Dashboard Principal (SPA Interativo)
    if (pathname === '/' || pathname === '/index.html') {
      const sites = fs.readdirSync(copiasDir, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

      const html = `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Studio DNA - AI Web Design Inspector</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: #101726;
      --card-hover: #162033;
      --border: #1e293b;
      --border-focus: #38bdf8;
      --text: #f8fafc;
      --text-muted: #94a3b8;
      --accent: #38bdf8;
      --accent-gradient: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
      --success: #10b981;
      --purple: #a855f7;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background: rgba(16, 23, 38, 0.8);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 16px 24px;
    }
    .header-inner {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      font-size: 1.25rem;
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 32px 24px;
      flex: 1;
      width: 100%;
    }
    /* Hero & Input */
    .hero-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 36px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .hero-card h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .hero-card p {
      color: var(--text-muted);
      font-size: 0.95rem;
      margin-bottom: 20px;
    }
    .input-group {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .url-input {
      flex: 1;
      min-width: 280px;
      background: #0b111e;
      border: 1px solid var(--border);
      color: #fff;
      padding: 14px 18px;
      border-radius: 10px;
      font-size: 1rem;
      font-family: inherit;
      transition: all 0.2s;
    }
    .url-input:focus {
      outline: none;
      border-color: var(--border-focus);
      box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15);
    }
    .btn-extract {
      background: var(--accent-gradient);
      color: #000;
      font-weight: 700;
      border: none;
      padding: 14px 28px;
      border-radius: 10px;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: opacity 0.2s, transform 0.1s;
    }
    .btn-extract:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    /* Grid de Sites */
    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sites-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 20px;
    }
    .site-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 22px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .site-card:hover {
      border-color: var(--accent);
      background: var(--card-hover);
      transform: translateY(-2px);
    }
    .site-card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }
    .site-card h3 {
      font-size: 1.15rem;
      font-weight: 700;
      color: #fff;
    }
    .badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 20px;
      background: #0284c7;
      color: #fff;
    }
    .badge-dna { background: #7c3aed; }
    .site-card-actions {
      display: flex;
      gap: 8px;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
    }
    .btn-card {
      font-size: 0.85rem;
      font-weight: 600;
      padding: 8px 14px;
      border-radius: 6px;
      text-decoration: none;
      background: #1e293b;
      color: var(--text);
      transition: background 0.2s;
    }
    .btn-card:hover { background: #334155; }
    /* Modal / Inspector */
    .modal-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.8);
      backdrop-filter: blur(8px);
      z-index: 100;
      align-items: center;
      justify-content: center;
      padding: 24px;
    }
    .modal-content {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 20px;
      width: 100%;
      max-width: 1000px;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7);
    }
    .modal-header {
      padding: 20px 28px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .modal-header h2 { font-size: 1.3rem; font-weight: 700; }
    .btn-close {
      background: transparent;
      border: none;
      color: var(--text-muted);
      font-size: 1.5rem;
      cursor: pointer;
    }
    .tabs {
      display: flex;
      background: #0b111e;
      border-bottom: 1px solid var(--border);
      padding: 0 28px;
      gap: 24px;
    }
    .tab-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 16px 0;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      position: relative;
      font-family: inherit;
    }
    .tab-btn.active {
      color: var(--accent);
    }
    .tab-btn.active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--accent);
    }
    .modal-body {
      padding: 28px;
      overflow-y: auto;
      flex: 1;
    }
    .tab-pane { display: none; }
    .tab-pane.active { display: block; }
    .code-box {
      background: #070a11;
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 18px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      overflow-x: auto;
      max-height: 400px;
      position: relative;
    }
    .btn-copy {
      position: absolute;
      top: 12px;
      right: 12px;
      background: var(--accent);
      color: #000;
      font-weight: 700;
      border: none;
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 0.8rem;
      cursor: pointer;
    }
    .colors-preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
      margin-top: 14px;
    }
    .swatch {
      background: #1e293b;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    .swatch-color { height: 60px; width: 100%; }
    .swatch-info { padding: 8px 10px; font-size: 0.75rem; }
    .swatch-name { font-weight: 600; color: #fff; display: block; word-break: break-all; }
  </style>
</head>
<body>

  <header>
    <div class="header-inner">
      <div class="logo">⚡ Studio DNA Pro</div>
      <div style="font-size: 0.85rem; color: var(--text-muted);">AI Web Design & Reverse Engineering Engine</div>
    </div>
  </header>

  <div class="container">
    <!-- Hero / Extractor Form -->
    <div class="hero-card">
      <h2>🚀 Inspecionar Novo Site de Alto Nível</h2>
      <p>Extraia Design Tokens, Shaders GLSL, Timelines GSAP e gere o Master Prompt para IAs (Cursor / Claude / v0).</p>
      
      <div class="input-group">
        <input type="text" id="targetUrl" class="url-input" placeholder="https://site-premiado.com" />
        <button id="btnStartExtract" class="btn-extract" onclick="handleExtract()">
          <span>⚡ Extrair DNA & Mecânicas</span>
        </button>
      </div>
      <div id="extractStatus" style="margin-top: 12px; font-size: 0.85rem; color: var(--accent); display: none;">
        ⏳ Extração iniciada no servidor! O resultado aparecerá na lista em instantes...
      </div>
    </div>

    <!-- Sites Grid -->
    <div class="section-title">
      <span>Projetos & Referências Extraídas (${sites.length})</span>
    </div>

    <div class="sites-grid">
      ${sites.length === 0 ? '<p style="color: var(--text-muted);">Nenhum site inspecionado ainda. Cole uma URL acima!</p>' : ''}
      ${sites.map(s => `
        <div class="site-card" onclick="openSiteModal('${s}')">
          <div>
            <div class="site-card-top">
              <h3>${s}</h3>
              <span class="badge">Inspecionado</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-muted); font-family: monospace;">copias/${s}</p>
          </div>
          <div class="site-card-actions" onclick="event.stopPropagation()">
            <button class="btn-card" onclick="openSiteModal('${s}')">🤖 Ver Prompts & DNA</button>
            <a href="/${s}/site/index.html" target="_blank" class="btn-card">🌐 Ver Clone</a>
          </div>
        </div>
      `).join('')}
    </div>
  </div>

  <!-- Modal Inspector -->
  <div id="siteModal" class="modal-overlay" onclick="closeModal(event)">
    <div class="modal-content" onclick="event.stopPropagation()">
      <div class="modal-header">
        <h2 id="modalTitle">Site Details</h2>
        <button class="btn-close" onclick="closeModal()">&times;</button>
      </div>
      <div class="tabs">
        <button class="tab-btn active" onclick="switchTab('tab-prompts')">🤖 AI Master Prompts</button>
        <button class="tab-btn" onclick="switchTab('tab-tokens')">🎨 Design Tokens & Tailwind</button>
        <button class="tab-btn" onclick="switchTab('tab-animations')">⚡ GSAP & Micro-Interações</button>
        <button class="tab-btn" onclick="switchTab('tab-shaders')">🔮 Shaders & 3D WebGL</button>
      </div>
      <div class="modal-body">
        
        <!-- Tab 1: AI Prompts -->
        <div id="tab-prompts" class="tab-pane active">
          <p style="color: var(--text-muted); margin-bottom: 12px;">Copie este prompt estruturado e cole diretamente no <strong>Cursor</strong>, <strong>Claude</strong> ou <strong>v0</strong> para recriar o site:</p>
          <div class="code-box">
            <button class="btn-copy" onclick="copyToClipboard('specContent')">📋 Copiar Prompt</button>
            <pre id="specContent">Carregando...</pre>
          </div>
        </div>

        <!-- Tab 2: Design Tokens & Tailwind -->
        <div id="tab-tokens" class="tab-pane">
          <h4 style="margin-bottom: 8px;">Paleta de Cores Identificada:</h4>
          <div id="colorSwatches" class="colors-preview-grid"></div>

          <h4 style="margin-top: 24px; margin-bottom: 8px;">Tailwind CSS Config Gerado:</h4>
          <div class="code-box">
            <button class="btn-copy" onclick="copyToClipboard('tailwindCode')">📋 Copiar Config</button>
            <pre id="tailwindCode">Carregando...</pre>
          </div>
        </div>

        <!-- Tab 3: GSAP & Animações -->
        <div id="tab-animations" class="tab-pane">
          <h4 style="margin-bottom: 8px;">Particularidades de UI/UX & Efeitos:</h4>
          <div class="code-box">
            <pre id="uiUxJson">Carregando...</pre>
          </div>
        </div>

        <!-- Tab 4: Shaders WebGL -->
        <div id="tab-shaders" class="tab-pane">
          <h4 style="margin-bottom: 8px;">Shaders GLSL (Fragment & Vertex) Interceptados:</h4>
          <div class="code-box">
            <pre id="shadersContent">Nenhum shader capturado ou Three.js não utilizado nesta página.</pre>
          </div>
        </div>

      </div>
    </div>
  </div>

  <script>
    async function handleExtract() {
      const urlInput = document.getElementById('targetUrl');
      const url = urlInput.value.trim();
      if (!url) return alert('Por favor, digite uma URL válida!');

      const btn = document.getElementById('btnStartExtract');
      const status = document.getElementById('extractStatus');
      btn.disabled = true;
      btn.innerText = '⏳ Inspecionando...';
      status.style.display = 'block';

      try {
        const res = await fetch('/api/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url, mode: 'all' })
        });
        const data = await res.json();
        if (data.success) {
          setTimeout(() => {
            window.location.reload();
          }, 8000);
        }
      } catch (err) {
        alert('Erro ao iniciar extração: ' + err.message);
        btn.disabled = false;
        btn.innerText = '⚡ Extrair DNA & Mecânicas';
      }
    }

    async function openSiteModal(siteSlug) {
      document.getElementById('modalTitle').innerText = 'Inspecionando: ' + siteSlug;
      document.getElementById('siteModal').style.display = 'flex';

      try {
        const res = await fetch('/api/site/' + siteSlug);
        const data = await res.json();

        document.getElementById('specContent').innerText = data.masterSpec || 'Sem especificação gerada.';
        document.getElementById('tailwindCode').innerText = data.tailwindConfig || '// Sem variáveis de cores detectadas.';
        document.getElementById('uiUxJson').innerText = JSON.stringify(data.uiUx, null, 2);

        // Cores
        const swatchesContainer = document.getElementById('colorSwatches');
        swatchesContainer.innerHTML = '';
        if (data.dna && data.dna.colors && data.dna.colors.variables) {
          Object.entries(data.dna.colors.variables).forEach(([key, val]) => {
            const div = document.createElement('div');
            div.className = 'swatch';
            div.innerHTML = \`
              <div class="swatch-color" style="background-color: \${val};"></div>
              <div class="swatch-info">
                <span class="swatch-name">\${key}</span>
                <span style="color: var(--text-muted); font-family: monospace;">\${val}</span>
              </div>
            \`;
            swatchesContainer.appendChild(div);
          });
        }

        // Shaders
        const shadersBox = document.getElementById('shadersContent');
        if (data.uiUx && data.uiUx.webglCanvas && data.uiUx.webglCanvas.shaders && data.uiUx.webglCanvas.shaders.length > 0) {
          shadersBox.innerText = data.uiUx.webglCanvas.shaders.map((s, i) => \`// SHADER \${i+1} (\${s.type.toUpperCase()})\n\${s.source}\`).join('\\n\\n// ====================================\\n\\n');
        } else {
          shadersBox.innerText = 'Nenhum shader WebGL/GLSL capturado nesta página.';
        }

      } catch (err) {
        console.error('Falha ao carregar dados do site:', err);
      }
    }

    function closeModal(e) {
      document.getElementById('siteModal').style.display = 'none';
    }

    function switchTab(tabId) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    }

    function copyToClipboard(elementId) {
      const text = document.getElementById(elementId).innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert('Copiado para a área de transferência com sucesso!');
      });
    }
  </script>
</body>
</html>`;

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }

    // Servir Arquivos Estáticos
    const filePath = path.join(copiasDir, pathname);

    if (!filePath.startsWith(copiasDir)) {
      res.writeHead(403);
      res.end('Access Denied');
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
    }
  });

  server.listen(port, () => {
    console.log(`\n👁️  [STUDIO DNA PRO] Servidor rodando em: \x1b[36mhttp://localhost:${port}\x1b[0m`);
    console.log(`📁  Servindo pasta: ${copiasDir}\n`);
  });

  return server;
}

module.exports = {
  startPreviewServer
};
