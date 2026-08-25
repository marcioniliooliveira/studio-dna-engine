const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { loadConfig } = require('../config');
const { generateTailwindConfig } = require('../generators/tailwind-generator');
const { createClientProject } = require('../generators/client-factory');
const { runBoxDiffLinter } = require('../../scripts/box-diff-linter');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.wasm': 'application/wasm',
  '.md': 'text/markdown; charset=utf-8'
};

function startPreviewServer(options = {}) {
  const config = loadConfig(options);
  const rootDir = process.cwd();
  const copiasDir = path.resolve(config.outputDir || path.join(rootDir, 'copias'));
  const clientesDir = path.resolve(path.join(rootDir, 'clientes'));
  const vaultDir = path.resolve(path.join(rootDir, 'design-vault'));
  const port = options.port || config.previewPort || 4000;

  if (!fs.existsSync(copiasDir)) fs.mkdirSync(copiasDir, { recursive: true });
  if (!fs.existsSync(clientesDir)) fs.mkdirSync(clientesDir, { recursive: true });

  const server = http.createServer(async (req, res) => {
    // Tratamento de Preflight CORS (OPTIONS)
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Access-Control-Max-Age': '86400'
      });
      res.end();
      return;
    }

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
          const { runPipeline } = require('../../index');
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, message: 'Extração iniciada em segundo plano' }));
          runPipeline({ url: data.url, mode: data.mode || 'all', headless: true }).catch(console.error);
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }

    // API: Criar Projeto de Cliente (One-Shot Factory)
    if (pathname === '/api/client/create' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          const data = JSON.parse(body || '{}');
          if (!data.brandName) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Nome da marca é obrigatório' }));
            return;
          }
          const result = createClientProject({
            brandName: data.brandName,
            refSlug: data.refSlug || 'storeyarchitecture-co-uk',
            brandSpec: {
              niche: data.niche,
              toneOfVoice: data.toneOfVoice,
              whatsapp: data.whatsapp
            }
          });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, result }));
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: e.message }));
        }
      });
      return;
    }

    // API: Executar Quality Gate Playwright
    if (pathname.startsWith('/api/audit/') && req.method === 'POST') {
      const targetSlug = pathname.replace('/api/audit/', '');
      try {
        const audit = await runBoxDiffLinter(targetSlug, port + 10);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, audit }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
      return;
    }

    // API: Design Vault Data
    if (pathname === '/api/vault') {
      let easings = null;
      let typography = null;
      try {
        if (fs.existsSync(path.join(vaultDir, '01-motion-physics/easings.json'))) {
          easings = JSON.parse(fs.readFileSync(path.join(vaultDir, '01-motion-physics/easings.json'), 'utf8'));
        }
        if (fs.existsSync(path.join(vaultDir, '04-typography/curated-pairings.json'))) {
          typography = JSON.parse(fs.readFileSync(path.join(vaultDir, '04-typography/curated-pairings.json'), 'utf8'));
        }
      } catch (e) {}
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ easings, typography }));
      return;
    }

    // API: Obter Dados de um Site
    if (pathname.startsWith('/api/site/')) {
      const siteSlug = pathname.replace('/api/site/', '');
      let sitePath = path.join(copiasDir, siteSlug);
      if (!fs.existsSync(sitePath)) sitePath = path.join(clientesDir, siteSlug);

      if (!fs.existsSync(sitePath)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Site não encontrado' }));
        return;
      }

      let siteType = null;
      let dna = null;
      let uiUx = null;
      let masterSpec = null;
      let linterReport = null;

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
        if (fs.existsSync(path.join(sitePath, 'linter-report.json'))) {
          linterReport = JSON.parse(fs.readFileSync(path.join(sitePath, 'linter-report.json'), 'utf8'));
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
        linterReport,
        tailwindConfig
      }));
      return;
    }

    // Dashboard Principal (SPA Interativo Studio DNA PRO)
    if (pathname === '/' || pathname === '/index.html') {
      const copias = fs.existsSync(copiasDir) ? fs.readdirSync(copiasDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name) : [];
      const clientes = fs.existsSync(clientesDir) ? fs.readdirSync(clientesDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name) : [];

      const html = `<!DOCTYPE html>
<html lang="pt-BR" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Studio DNA — Awwwards Engine & Client Production Hub</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #07090e;
      --card-bg: #0e131f;
      --card-hover: #141c2e;
      --border: #1c2638;
      --border-focus: #38bdf8;
      --text: #f8fafc;
      --text-muted: #8e9eb5;
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
      background: rgba(14, 19, 31, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 50;
      padding: 16px 32px;
    }
    .header-inner {
      max-width: 1440px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 800;
      font-size: 1.3rem;
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .nav-tabs {
      display: flex;
      gap: 8px;
      background: #090d15;
      padding: 4px;
      border-radius: 12px;
      border: 1px solid var(--border);
    }
    .nav-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .nav-btn.active, .nav-btn:hover {
      background: var(--card-bg);
      color: #fff;
      border: 1px solid var(--border);
    }
    .nav-btn.active {
      color: var(--accent);
      border-color: rgba(56, 189, 248, 0.3);
    }
    .container {
      max-width: 1440px;
      margin: 0 auto;
      padding: 32px;
      flex: 1;
      width: 100%;
    }
    .view-section { display: none; }
    .view-section.active { display: block; animation: fadeIn 0.3s ease; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

    .grid-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
      transition: all 0.2s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card:hover {
      border-color: rgba(56, 189, 248, 0.4);
      background: var(--card-hover);
      transform: translateY(-2px);
    }
    .card h3 { font-size: 1.2rem; margin-bottom: 6px; }
    .card p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 16px; }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 700;
      background: rgba(56, 189, 248, 0.1);
      color: var(--accent);
      border: 1px solid rgba(56, 189, 248, 0.2);
    }
    .badge-success {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success);
      border-color: rgba(16, 185, 129, 0.2);
    }
    .btn {
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: none;
      transition: all 0.2s;
    }
    .btn-primary {
      background: var(--accent-gradient);
      color: #000;
      font-weight: 700;
    }
    .btn-secondary {
      background: #182235;
      color: #fff;
      border: 1px solid var(--border);
    }
    .btn-secondary:hover { background: #223049; }
    .form-panel {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 32px;
    }
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }
    .input-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .input-field label { font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }
    .input-field input, .input-field select {
      background: #07090e;
      border: 1px solid var(--border);
      color: #fff;
      padding: 12px 16px;
      border-radius: 8px;
      font-family: inherit;
      font-size: 0.95rem;
    }
    .input-field input:focus, .input-field select:focus {
      outline: none;
      border-color: var(--border-focus);
    }
    pre {
      background: #05070a;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid var(--border);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      overflow-x: auto;
      color: #38bdf8;
    }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <div class="logo">
        <span>🌐</span> Studio DNA PRO <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 500;">v2.0 • Awwwards Engine</span>
      </div>
      <div class="nav-tabs">
        <button class="nav-btn active" onclick="showTab('tab-clients')">🏢 Projetos de Clientes</button>
        <button class="nav-btn" onclick="showTab('tab-vault')">🧬 Design Vault</button>
        <button class="nav-btn" onclick="showTab('tab-clones')">📦 Esqueletos & Cópias</button>
        <button class="nav-btn" onclick="showTab('tab-extractor')">⚡ Deep Scraper</button>
      </div>
    </div>
  </header>

  <main class="container">
    <!-- VIEW 1: PROJETOS DE CLIENTES (ONE-SHOT FACTORY) -->
    <section id="tab-clients" class="view-section active">
      <div class="form-panel">
        <h2 style="margin-bottom: 8px; font-size: 1.4rem;">🏭 Fábrica de Clientes One-Shot (ICM Engine)</h2>
        <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 24px;">Gere um novo site desacoplado para um cliente aplicando um esqueleto de referência do Vault em menos de 1 segundo.</p>
        
        <div class="form-grid">
          <div class="input-field">
            <label>Nome da Marca / Cliente</label>
            <input type="text" id="clientBrandName" placeholder="Ex: Negocia Bem Imobiliária">
          </div>
          <div class="input-field">
            <label>Esqueleto de Referência</label>
            <select id="clientRefSelect">
              ${copias.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
          <div class="input-field">
            <label>Nicho de Atuação</label>
            <input type="text" id="clientNiche" placeholder="Ex: Imobiliária & Financiamento Caixa">
          </div>
          <div class="input-field">
            <label>WhatsApp de Conversão</label>
            <input type="text" id="clientWhatsapp" placeholder="Ex: 5544999999999">
          </div>
        </div>

        <button class="btn btn-primary" onclick="generateClientProject()">✨ Gerar Projeto do Cliente One-Shot</button>
      </div>

      <h3 style="font-size: 1.2rem; margin-bottom: 12px;">📁 Projetos de Clientes Ativos (${clientes.length})</h3>
      <div class="grid-cards">
        ${clientes.map(cl => `
          <div class="card">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span class="badge badge-success">● Produção Isolada</span>
                <span style="font-size: 0.78rem; color: var(--text-muted);">ICM Ready</span>
              </div>
              <h3>${cl}</h3>
              <p>Projeto de cliente desacoplado, sem peso de scraper, pronto para deploy no Vercel ou CDN.</p>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 16px;">
              <a href="/clientes/${cl}/site/index.html" target="_blank" class="btn btn-primary" style="flex: 1;">👁️ Abrir Site</a>
              <button onclick="runAudit('${cl}')" class="btn btn-secondary">🛡️ Auditar</button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- VIEW 2: DESIGN VAULT -->
    <section id="tab-vault" class="view-section">
      <div style="margin-bottom: 24px;">
        <h2 style="font-size: 1.4rem; margin-bottom: 6px;">🧬 Awwwards Design DNA Vault</h2>
        <p style="color: var(--text-muted);">Banco de inteligência permanente com física de movimento, 3D e tipografia cinematográfica.</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <div class="form-panel">
          <h3 style="margin-bottom: 12px;">🎡 Física 3D & Curvas de Easing</h3>
          <pre><code>// Curvas Cúbicas de Desaceleração:
--ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);
--ease-smooth: cubic-bezier(0.25, 1, 0.5, 1);
--ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);

// Anel 3D Cilíndrico Paramétrico:
perspective: 132vw;
transform: rotateY(i * 45deg) translateZ(44vw);</code></pre>
        </div>
        <div class="form-panel">
          <h3 style="margin-bottom: 12px;">📐 Pares Tipográficos de Elite</h3>
          <pre><code>// Swiss Minimalist (Storey Style):
Heading: "New Grotesk", clamp(2.5rem, 6vw, 6.5rem)
Tracking: -0.035em | Line-Height: 0.95
Body: "New Grotesk", 400 | Line-Height: 1.5
Accent: "New Grotesk Mono", uppercase</code></pre>
        </div>
      </div>
    </section>

    <!-- VIEW 3: ESQUELETOS & CÓPIAS -->
    <section id="tab-clones" class="view-section">
      <h2 style="font-size: 1.4rem; margin-bottom: 6px;">📦 Esqueletos & Referências Clonadas (${copias.length})</h2>
      <p style="color: var(--text-muted); margin-bottom: 20px;">Sites de referência raspados com assets normalizados e esqueleto estrutural extraído.</p>
      
      <div class="grid-cards">
        ${copias.map(c => `
          <div class="card">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span class="badge">Esqueleto Base</span>
                <span style="font-size: 0.78rem; color: var(--text-muted);">Stage 01/02</span>
              </div>
              <h3>${c}</h3>
              <p>DNA estrutural, classes de layout e assets descaracterizados prontos para uso em novos clientes.</p>
            </div>
            <div style="display: flex; gap: 8px; margin-top: 16px;">
              <a href="/${c}/site/index.html" target="_blank" class="btn btn-primary" style="flex: 1;">👁️ Ver Clone</a>
              <button onclick="runAudit('${c}')" class="btn btn-secondary">🛡️ Quality Gate</button>
            </div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- VIEW 4: DEEP SCRAPER -->
    <section id="tab-extractor" class="view-section">
      <div class="form-panel">
        <h2 style="font-size: 1.4rem; margin-bottom: 8px;">⚡ Novo Scraping Profundo de Referência</h2>
        <p style="color: var(--text-muted); margin-bottom: 20px;">Insira a URL de um site do Awwwards/Godly para dissecar o DOM, WebGL, shaders e GSAP.</p>
        
        <div style="display: flex; gap: 12px;">
          <input type="url" id="extractUrl" placeholder="https://exemplo-site-awwwards.com" style="flex: 1; background: #07090e; border: 1px solid var(--border); color: #fff; padding: 14px; border-radius: 8px;">
          <button class="btn btn-primary" onclick="startDeepExtract()">🚀 Iniciar Extração</button>
        </div>
      </div>
    </section>
  </main>

  <script>
    function showTab(tabId) {
      document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
      event.target.classList.add('active');
    }

    async function generateClientProject() {
      const brandName = document.getElementById('clientBrandName').value.trim();
      const refSlug = document.getElementById('clientRefSelect').value;
      const niche = document.getElementById('clientNiche').value.trim();
      const whatsapp = document.getElementById('clientWhatsapp').value.trim();

      if (!brandName) return alert('Por favor, digite o nome da marca do cliente.');

      try {
        const res = await fetch('/api/client/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ brandName, refSlug, niche, whatsapp })
        });
        const data = await res.json();
        if (data.success) {
          alert('🎉 Projeto do cliente criado com sucesso! Abrindo o site...');
          window.location.reload();
        } else {
          alert('Erro: ' + data.error);
        }
      } catch (err) {
        alert('Falha na comunicação: ' + err.message);
      }
    }

    async function runAudit(slug) {
      alert('🛡️ Iniciando auditoria Playwright para: ' + slug + '... Aguarde alguns segundos.');
      try {
        const res = await fetch('/api/audit/' + slug, { method: 'POST' });
        const data = await res.json();
        if (data.success && data.audit) {
          const a = data.audit;
          alert(\`📊 RESULTADO DO QUALITY GATE:\\n- Status: \${a.auditPassed ? '✅ APROVADO (100% LIMPO)' : '❌ REPROVADO'}\\n- JS Errors: \${a.jsErrors.length}\\n- Imagens Quebradas: \${a.imagesSummary.broken.length}\\n- Imagens Válidas: \${a.imagesSummary.valid}\`);
        }
      } catch (e) {
        alert('Erro ao rodar auditoria: ' + e.message);
      }
    }

    async function startDeepExtract() {
      const url = document.getElementById('extractUrl').value.trim();
      if (!url) return alert('Digite a URL');
      try {
        const res = await fetch('/api/extract', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url })
        });
        alert('⚡ Extração iniciada em segundo plano! A página atualizará em instantes.');
        setTimeout(() => window.location.reload(), 10000);
      } catch (e) {
        alert('Erro: ' + e.message);
      }
    }
  </script>
</body>
</html>`;

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }

    // Servir Arquivos Estáticos com Fallbacks Inteligentes (suporta copias/ e clientes/)
    let filePath = path.join(copiasDir, pathname);

    if (pathname.startsWith('/clientes/')) {
      filePath = path.join(rootDir, pathname);
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      const referer = req.headers.referer || '';
      let refererSiteSlug = '';
      if (referer) {
        try {
          const refUrl = new URL(referer);
          const refParts = refUrl.pathname.split('/').filter(Boolean);
          if (refParts[0] === 'clientes' && refParts[1]) {
            refererSiteSlug = path.join('clientes', refParts[1]);
          } else if (refParts[0]) {
            refererSiteSlug = refParts[0];
          }
        } catch (e) {}
      }

      const cleanPath = pathname.replace(/^\/+/, '');
      const candidates = [];

      if (refererSiteSlug) {
        candidates.push(
          path.join(rootDir, refererSiteSlug, 'site', cleanPath),
          path.join(rootDir, refererSiteSlug, 'site', 'assets', cleanPath),
          path.join(copiasDir, refererSiteSlug, 'site', cleanPath),
          path.join(copiasDir, refererSiteSlug, 'site', 'assets', cleanPath)
        );
      }

      const parts = pathname.split('/').filter(Boolean);
      if (parts.length > 0) {
        const siteSlug = parts[0];
        const siteSubPath = parts.slice(1).join('/');
        
        candidates.push(
          path.join(copiasDir, siteSlug, 'site', siteSubPath),
          path.join(copiasDir, siteSlug, 'site', 'assets', siteSubPath),
          path.join(clientesDir, siteSlug, 'site', siteSubPath),
          path.join(clientesDir, siteSlug, 'site', 'assets', siteSubPath)
        );
      }

      const allSites = [
        ...(fs.existsSync(copiasDir) ? fs.readdirSync(copiasDir).map(d => path.join(copiasDir, d)) : []),
        ...(fs.existsSync(clientesDir) ? fs.readdirSync(clientesDir).map(d => path.join(clientesDir, d)) : [])
      ];

      for (const siteDir of allSites) {
        candidates.push(
          path.join(siteDir, 'site', cleanPath),
          path.join(siteDir, 'site', 'assets', cleanPath),
          path.join(siteDir, 'site', 'assets', cleanPath.replace(/^assets\//, ''))
        );
      }

      for (const cand of candidates) {
        if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
          filePath = cand;
          break;
        }
      }
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Cross-Origin-Resource-Policy': 'cross-origin'
      });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404, { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      });
      res.end('404 Not Found');
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log(`\n👁️  [STUDIO DNA PRO v2.0] Servidor rodando em: \x1b[36mhttp://127.0.0.1:${port}\x1b[0m e \x1b[36mhttp://localhost:${port}\x1b[0m`);
    console.log(`📁  Servindo: ${copiasDir} e ${clientesDir}\n`);
  });

  return server;
}

module.exports = {
  startPreviewServer
};
