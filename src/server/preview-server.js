const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { loadConfig } = require('../config');
const { generateTailwindConfig } = require('../generators/tailwind-generator');
const { createClientProject } = require('../generators/client-factory');
const { runBoxDiffLinter } = require('../../scripts/box-diff-linter');
const {
  resolveStaticPath,
  assertSafeExternalUrl,
  assertSafeSlug,
  parseByteRange,
  readJsonBody,
  isMutationAuthorized
} = require('./security');

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
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'video/ogg',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.wasm': 'application/wasm',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8'
};

/**
 * Faz download assíncrono de asset remoto e salva em disco (Self-Healing)
 */
async function fetchAndSaveRemoteAsset(remoteUrl, localDestPath, options = {}) {
  const validateUrl = options.validateUrl || assertSafeExternalUrl;
  const maxBytes = options.maxBytes || 25 * 1024 * 1024;
  const maxRedirects = options.maxRedirects ?? 3;
  const redirectCount = options.redirectCount || 0;
  let validatedUrl;
  try {
    validatedUrl = await validateUrl(remoteUrl);
  } catch (error) {
    return false;
  }

  return new Promise((resolve) => {
    try {
      const u = validatedUrl instanceof URL ? validatedUrl : new URL(remoteUrl);
      const client = u.protocol === 'https:' ? https : http;
      let file = null;
      let settled = false;
      const req = client.get(u, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
          'Accept': '*/*'
        }
      }, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const declaredSize = Number(res.headers['content-length'] || 0);
          if (declaredSize > maxBytes) {
            settled = true;
            res.resume();
            fs.unlink(localDestPath, () => resolve(false));
            return;
          }
          fs.mkdirSync(path.dirname(localDestPath), { recursive: true });
          file = fs.createWriteStream(localDestPath);
          let received = 0;
          res.on('data', (chunk) => {
            received += chunk.length;
            if (received <= maxBytes || settled) return;
            settled = true;
            res.unpipe(file);
            res.destroy();
            file.once('close', () => fs.unlink(localDestPath, () => resolve(false)));
            file.destroy();
          });
          res.pipe(file);
          file.on('finish', () => {
            if (settled) return;
            settled = true;
            file.close(() => {
              console.log(`✨ [Self-Healing Proxy] Asset baixado e curado: ${path.basename(localDestPath)} <- ${remoteUrl}`);
              resolve(true);
            });
          });
        } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          if (redirectCount >= maxRedirects) {
            settled = true;
            res.resume();
            fs.unlink(localDestPath, () => resolve(false));
            return;
          }
          settled = true;
          res.resume();
          const redirectUrl = new URL(res.headers.location, remoteUrl).href;
          fs.unlink(localDestPath, () => {
            fetchAndSaveRemoteAsset(redirectUrl, localDestPath, {
              ...options,
              redirectCount: redirectCount + 1
            }).then(resolve);
          });
        } else {
          settled = true;
          fs.unlink(localDestPath, () => {});
          resolve(false);
        }
      });
      req.on('error', () => {
        if (settled) return;
        settled = true;
        if (file) file.destroy();
        fs.unlink(localDestPath, () => {});
        resolve(false);
      });
      req.setTimeout(10000, () => {
        if (settled) return;
        settled = true;
        req.destroy();
        if (file) file.destroy();
        fs.unlink(localDestPath, () => {});
        resolve(false);
      });
    } catch (e) {
      resolve(false);
    }
  });
}

/**
 * Transmite arquivos estáticos com suporte completo a Range Requests (HTTP 206) e CORS
 */
function streamFileWithRange(req, res, filePath, contentType) {
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  const baseHeaders = {
    'Content-Type': contentType,
    'Cross-Origin-Resource-Policy': 'same-origin',
    'Accept-Ranges': 'bytes'
  };

  if (range) {
    const parsedRange = parseByteRange(range, fileSize);
    if (!parsedRange) {
      res.writeHead(416, {
        'Content-Range': `bytes */${fileSize}`
      });
      return res.end();
    }

    const { start, end } = parsedRange;

    const chunksize = (end - start) + 1;
    const stream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      ...baseHeaders,
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Content-Length': chunksize
    });
    stream.pipe(res);
  } else {
    res.writeHead(200, {
      ...baseHeaders,
      'Content-Length': fileSize
    });
    fs.createReadStream(filePath).pipe(res);
  }
}

function buildDashboardHtml(copias, clientes) {
  const copiasCards = copias.map(function(c) {
    return '<div class="card">' +
      '<div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
          '<span class="badge">Esqueleto Base</span>' +
          '<span style="font-size:0.78rem;color:var(--text-muted)">Stage 01/02</span>' +
        '</div>' +
        '<h3>' + c + '</h3>' +
        '<p>DNA estrutural, classes de layout e assets descaracterizados prontos para uso em novos clientes.</p>' +
      '</div>' +
      '<div style="display:flex;gap:8px;margin-top:16px">' +
        '<a href="/' + c + '/site/index.html" target="_blank" class="btn btn-primary" style="flex:1">&#128065;&#65039; Ver Clone</a>' +
        '<button onclick="runAudit(\'' + c + '\')" class="btn btn-secondary">&#128737;&#65039; Quality Gate</button>' +
      '</div>' +
    '</div>';
  }).join('');

  const clientesCards = clientes.map(function(cl) {
    return '<div class="card">' +
      '<div>' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
          '<span class="badge">&#9679; Experimental</span>' +
          '<span style="font-size:0.78rem;color:var(--text-muted)">Gates pendentes</span>' +
        '</div>' +
        '<h3>' + cl + '</h3>' +
        '<p>Artefato de cliente em validação. Consulte o relatório de qualidade antes de promover para produção.</p>' +
      '</div>' +
      '<div style="display:flex;gap:8px;margin-top:16px">' +
        '<a href="/clientes/' + cl + '/site/index.html" target="_blank" class="btn btn-primary" style="flex:1">&#128065;&#65039; Abrir Site</a>' +
        '<button onclick="runAudit(\'' + cl + '\')" class="btn btn-secondary">&#128737;&#65039; Auditar</button>' +
      '</div>' +
    '</div>';
  }).join('');

  const clientesOptions = copias.map(function(c) {
    return '<option value="' + c + '">' + c + '</option>';
  }).join('');

  return '<!DOCTYPE html>\n' +
'<html lang="pt-BR" class="dark">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>Studio DNA &mdash; Awwwards Engine &amp; Client Production Hub</title>\n' +
'  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
'  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
'  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">\n' +
'  <style>\n' +
'    :root {\n' +
'      --bg: #030508;\n' +
'      --bg-card: rgba(255,255,255,0.02);\n' +
'      --bg-card-hover: rgba(255,255,255,0.04);\n' +
'      --border: rgba(255,255,255,0.07);\n' +
'      --border-focus: rgba(56,189,248,0.4);\n' +
'      --text: #fafaf9;\n' +
'      --text-muted: #71717a;\n' +
'      --accent: #38bdf8;\n' +
'      --accent-gradient: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);\n' +
'      --success: #10b981;\n' +
'    }\n' +
'    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n' +
'    html, body { background: var(--bg); color: var(--text); font-family: "Inter", sans-serif; min-height: 100vh; }\n' +
'    header { border-bottom: 1px solid var(--border); padding: 0 32px; position: sticky; top: 0; background: rgba(3,5,8,0.9); backdrop-filter: blur(12px); z-index: 100; }\n' +
'    .header-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; max-width: 1400px; margin: 0 auto; }\n' +
'    .logo { font-weight: 800; font-size: 1.05rem; display: flex; align-items: center; gap: 8px; }\n' +
'    .nav-tabs { display: flex; gap: 4px; }\n' +
'    .nav-btn { background: none; border: none; color: var(--text-muted); padding: 8px 16px; border-radius: 8px; cursor: pointer; font-family: inherit; font-size: 0.88rem; font-weight: 500; transition: all 0.15s; }\n' +
'    .nav-btn:hover, .nav-btn.active { background: rgba(255,255,255,0.06); color: var(--text); }\n' +
'    .container { max-width: 1400px; margin: 0 auto; padding: 40px 32px; }\n' +
'    .view-section { display: none; }\n' +
'    .view-section.active { display: block; }\n' +
'    .grid-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; margin-top: 20px; }\n' +
'    .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 24px; transition: all 0.2s; display: flex; flex-direction: column; justify-content: space-between; }\n' +
'    .card:hover { border-color: rgba(56,189,248,0.4); background: var(--bg-card-hover); transform: translateY(-2px); }\n' +
'    .card h3 { font-size: 1.2rem; margin-bottom: 6px; }\n' +
'    .card p { font-size: 0.88rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 16px; }\n' +
'    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; background: rgba(56,189,248,0.1); color: var(--accent); border: 1px solid rgba(56,189,248,0.2); }\n' +
'    .badge-success { background: rgba(16,185,129,0.1); color: var(--success); border-color: rgba(16,185,129,0.2); }\n' +
'    .btn { padding: 10px 18px; border-radius: 8px; font-weight: 600; font-size: 0.9rem; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: none; transition: all 0.2s; font-family: inherit; }\n' +
'    .btn-primary { background: var(--accent-gradient); color: #000; font-weight: 700; }\n' +
'    .btn-secondary { background: #182235; color: #fff; border: 1px solid var(--border); }\n' +
'    .btn-secondary:hover { background: #223049; }\n' +
'    .form-panel { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 28px; margin-bottom: 32px; }\n' +
'    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 20px; }\n' +
'    .input-field { display: flex; flex-direction: column; gap: 6px; }\n' +
'    .input-field label { font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }\n' +
'    .input-field input, .input-field select { background: #07090e; border: 1px solid var(--border); color: #fff; padding: 12px 16px; border-radius: 8px; font-family: inherit; font-size: 0.95rem; }\n' +
'    .input-field input:focus, .input-field select:focus { outline: none; border-color: var(--border-focus); }\n' +
'    pre { background: #05070a; padding: 16px; border-radius: 8px; border: 1px solid var(--border); font-family: "JetBrains Mono", monospace; font-size: 0.85rem; overflow-x: auto; color: #38bdf8; }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <header>\n' +
'    <div class="header-inner">\n' +
'      <div class="logo"><span>&#127760;</span> Studio DNA PRO <span style="font-size:0.75rem;color:var(--text-muted);font-weight:500">v2.0 &bull; Awwwards Engine</span></div>\n' +
'      <div class="nav-tabs">\n' +
'        <button class="nav-btn active" onclick="showTab(\'tab-clients\')">&#127970; Projetos de Clientes</button>\n' +
'        <button class="nav-btn" onclick="showTab(\'tab-vault\')">&#129516; Design Vault</button>\n' +
'        <button class="nav-btn" onclick="showTab(\'tab-clones\')">&#128230; Esqueletos &amp; Copias</button>\n' +
'        <button class="nav-btn" onclick="showTab(\'tab-extractor\')">&#9889; Deep Scraper</button>\n' +
'      </div>\n' +
'    </div>\n' +
'  </header>\n' +
'\n' +
'  <main class="container">\n' +
'    <section id="tab-clients" class="view-section active">\n' +
'      <div class="form-panel">\n' +
'        <h2 style="margin-bottom:8px;font-size:1.4rem">&#127981; Pipeline de Transmutacao de Clientes</h2>\n' +
'        <p style="color:var(--text-muted);font-size:0.92rem;margin-bottom:24px">Gere um artefato experimental a partir de uma referencia; validacao e promocao sao etapas separadas.</p>\n' +
'        <div class="form-grid">\n' +
'          <div class="input-field"><label>Nome da Marca / Cliente</label><input type="text" id="clientBrandName" placeholder="Ex: Negocia Bem Imobiliaria"></div>\n' +
'          <div class="input-field"><label>Esqueleto de Referencia</label><select id="clientRefSelect">' + clientesOptions + '</select></div>\n' +
'          <div class="input-field"><label>Nicho de Atuacao</label><input type="text" id="clientNiche" placeholder="Ex: Imobiliaria &amp; Financiamento Caixa"></div>\n' +
'          <div class="input-field"><label>WhatsApp de Conversao</label><input type="text" id="clientWhatsapp" placeholder="Ex: 5544999999999"></div>\n' +
'        </div>\n' +
'        <button class="btn btn-primary" onclick="generateClientProject()">&#10024; Gerar Projeto do Cliente One-Shot</button>\n' +
'      </div>\n' +
'      <h3 style="font-size:1.2rem;margin-bottom:12px">&#128193; Projetos de Clientes Ativos (' + clientes.length + ')</h3>\n' +
'      <div class="grid-cards">' + clientesCards + '</div>\n' +
'    </section>\n' +
'\n' +
'    <section id="tab-vault" class="view-section">\n' +
'      <div style="margin-bottom:24px"><h2 style="font-size:1.4rem;margin-bottom:6px">&#129516; Awwwards Design DNA Vault</h2><p style="color:var(--text-muted)">Banco de inteligencia permanente com fisica de movimento, 3D e tipografia cinematografica.</p></div>\n' +
'      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">\n' +
'        <div class="form-panel"><h3 style="margin-bottom:12px">&#127905; Fisica 3D &amp; Curvas de Easing</h3>' +
'<pre><code>--ease-snappy: cubic-bezier(0.16, 1, 0.3, 1);\n--ease-smooth: cubic-bezier(0.25, 1, 0.5, 1);\n--ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);\n\nperspective: 132vw;\ntransform: rotateY(i*45deg) translateZ(44vw);</code></pre></div>\n' +
'        <div class="form-panel"><h3 style="margin-bottom:12px">&#128208; Pares Tipograficos de Elite</h3>' +
'<pre><code>Heading: "New Grotesk", clamp(2.5rem, 6vw, 6.5rem)\nTracking: -0.035em | Line-Height: 0.95\nBody: "New Grotesk", 400 | Line-Height: 1.5\nAccent: "New Grotesk Mono", uppercase</code></pre></div>\n' +
'      </div>\n' +
'    </section>\n' +
'\n' +
'    <section id="tab-clones" class="view-section">\n' +
'      <h2 style="font-size:1.4rem;margin-bottom:6px">&#128230; Esqueletos &amp; Referencias Clonadas (' + copias.length + ')</h2>\n' +
'      <p style="color:var(--text-muted);margin-bottom:20px">Sites de referencia raspados com assets normalizados e esqueleto estrutural extraido.</p>\n' +
'      <div class="grid-cards">' + copiasCards + '</div>\n' +
'    </section>\n' +
'\n' +
'    <section id="tab-extractor" class="view-section">\n' +
'      <div class="form-panel">\n' +
'        <h2 style="font-size:1.4rem;margin-bottom:8px">&#9889; Novo Scraping Profundo de Referencia</h2>\n' +
'        <p style="color:var(--text-muted);margin-bottom:20px">Insira a URL de um site do Awwwards/Godly para dissecar o DOM, WebGL, shaders e GSAP.</p>\n' +
'        <div style="display:flex;gap:12px">\n' +
'          <input type="url" id="extractUrl" placeholder="https://exemplo-site-awwwards.com" style="flex:1;background:#07090e;border:1px solid var(--border);color:#fff;padding:14px;border-radius:8px;font-family:inherit">\n' +
'          <button class="btn btn-primary" onclick="startDeepExtract()">&#128640; Iniciar Extracao</button>\n' +
'        </div>\n' +
'      </div>\n' +
'    </section>\n' +
'  </main>\n' +
'\n' +
'  <script>\n' +
'    function showTab(tabId) {\n' +
'      document.querySelectorAll(".view-section").forEach(function(s) { s.classList.remove("active"); });\n' +
'      document.querySelectorAll(".nav-btn").forEach(function(b) { b.classList.remove("active"); });\n' +
'      document.getElementById(tabId).classList.add("active");\n' +
'      event.target.classList.add("active");\n' +
'    }\n' +
'    async function generateClientProject() {\n' +
'      var brandName = document.getElementById("clientBrandName").value.trim();\n' +
'      var refSlug = document.getElementById("clientRefSelect").value;\n' +
'      var niche = document.getElementById("clientNiche").value.trim();\n' +
'      var whatsapp = document.getElementById("clientWhatsapp").value.trim();\n' +
'      if (!brandName) return alert("Por favor, digite o nome da marca do cliente.");\n' +
'      try {\n' +
'        var res = await fetch("/api/client/create", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ brandName: brandName, refSlug: refSlug, niche: niche, whatsapp: whatsapp }) });\n' +
'        var data = await res.json();\n' +
'        if (data.success) { alert("Projeto do cliente criado com sucesso!"); window.location.reload(); }\n' +
'        else { alert("Erro: " + data.error); }\n' +
'      } catch (err) { alert("Falha na comunicacao: " + err.message); }\n' +
'    }\n' +
'    async function runAudit(slug) {\n' +
'      alert("Iniciando auditoria Playwright para: " + slug + "... Aguarde alguns segundos.");\n' +
'      try {\n' +
'        var res = await fetch("/api/audit/" + slug, { method: "POST" });\n' +
'        var data = await res.json();\n' +
'        if (data.success && data.audit) {\n' +
'          var a = data.audit;\n' +
'          alert("RESULTADO DO QUALITY GATE:\\nStatus: " + (a.auditPassed ? "APROVADO" : "REPROVADO") + "\\nJS Errors: " + a.jsErrors.length + "\\nImagens Quebradas: " + a.imagesSummary.broken.length + "\\nImagens Validas: " + a.imagesSummary.valid);\n' +
'        }\n' +
'      } catch (e) { alert("Erro ao rodar auditoria: " + e.message); }\n' +
'    }\n' +
'    async function startDeepExtract() {\n' +
'      var url = document.getElementById("extractUrl").value.trim();\n' +
'      if (!url) return alert("Digite a URL");\n' +
'      try {\n' +
'        await fetch("/api/extract", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: url }) });\n' +
'        alert("Extracao iniciada em segundo plano! A pagina atualizara em instantes.");\n' +
'        setTimeout(function() { window.location.reload(); }, 10000);\n' +
'      } catch (e) { alert("Erro: " + e.message); }\n' +
'    }\n' +
'  </script>\n' +
'</body>\n' +
'</html>';
}

async function saveDnaMutation(payload = {}, options = {}) {
  const rootDir = options.rootDir || path.resolve(__dirname, '../..');
  const clientesDir = options.clientesDir || path.resolve(rootDir, 'clientes');

  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be a valid JSON object');
  }

  const slug = assertSafeSlug(payload.slug);
  const targetDir = path.join(clientesDir, slug);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const specPath = path.join(targetDir, 'brand-spec.json');
  let spec = {};
  if (fs.existsSync(specPath)) {
    try {
      spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
    } catch (e) {
      spec = {};
    }
  }

  if (payload.theme) {
    spec.theme = Object.assign(spec.theme || {}, payload.theme);
  }
  if (payload.colors) {
    spec.colors = Object.assign(spec.colors || {}, payload.colors);
    spec.theme = Object.assign(spec.theme || {}, payload.colors);
  }
  if (payload.typography) {
    spec.typography = Object.assign(spec.typography || {}, payload.typography);
  }
  if (payload.effects) {
    spec.effects = Object.assign(spec.effects || {}, payload.effects);
  }
  if (payload.content) {
    spec.content = Object.assign(spec.content || {}, payload.content);
  }

  fs.writeFileSync(specPath, JSON.stringify(spec, null, 2), 'utf8');
  return { success: true, specPath, spec };
}

function startPreviewServer(options = {}) {
  const opts = typeof options === 'number' ? { port: options } : (options || {});
  const config = loadConfig(opts);
  const rootDir = path.resolve(opts.rootDir || process.cwd());
  const copiasDir = path.resolve(opts.outputDir || (opts.rootDir ? path.join(rootDir, 'copias') : config.outputDir) || path.join(rootDir, 'copias'));
  const clientesDir = path.resolve(opts.clientesDir || path.join(rootDir, 'clientes'));
  const vaultDir = path.resolve(path.join(rootDir, 'design-vault'));
  const port = opts.port ?? config.previewPort ?? 4000;
  const mutationOptions = {
    enabled: opts.enableMutations === true,
    token: opts.mutationToken
  };

  if (!fs.existsSync(copiasDir)) fs.mkdirSync(copiasDir, { recursive: true });
  if (!fs.existsSync(clientesDir)) fs.mkdirSync(clientesDir, { recursive: true });

  const server = http.createServer(async (req, res) => {
    // CORS preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Allow': 'GET, POST, OPTIONS',
        'Cross-Origin-Resource-Policy': 'same-origin'
      });
      res.end();
      return;
    }

    let pathname;
    try {
      const rawPathname = String(req.url || '/').split('?')[0];
      pathname = decodeURIComponent(rawPathname);
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('400 Bad Request');
      return;
    }

    if (pathname.startsWith('/api/') && req.method !== 'GET' && !isMutationAuthorized(req, mutationOptions)) {
      res.writeHead(403, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: 'Mutation APIs are disabled or unauthorized' }));
      return;
    }

    // ── API: Iniciar Extração ──────────────────────────────────────────────
    if (pathname === '/api/extract' && req.method === 'POST') {
      try {
        const data = await readJsonBody(req, { limitBytes: opts.maxBodyBytes });
        if (!data.url) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'URL e obrigatoria' }));
          return;
        }
        const safeUrl = await assertSafeExternalUrl(data.url);
        const { runPipeline } = require('../../index');
        res.writeHead(202, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Extracao iniciada em segundo plano' }));
        runPipeline({ url: safeUrl.href, mode: data.mode || 'all', headless: true }).catch(console.error);
      } catch (error) {
        res.writeHead(error.statusCode || 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
      return;
    }

    // ── API: Criar Projeto de Cliente ─────────────────────────────────────
    if (pathname === '/api/client/create' && req.method === 'POST') {
      try {
        const data = await readJsonBody(req, { limitBytes: opts.maxBodyBytes });
        if (!data.brandName) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Nome da marca e obrigatorio' }));
          return;
        }
        const refSlug = assertSafeSlug(data.refSlug || 'storeyarchitecture-co-uk');
        const result = createClientProject({
          brandName: data.brandName,
          refSlug,
          brandSpec: { niche: data.niche, toneOfVoice: data.toneOfVoice, whatsapp: data.whatsapp }
        });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, result }));
      } catch (error) {
        res.writeHead(error.statusCode || 500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
      return;
    }

    // ── API: Quality Gate ─────────────────────────────────────────────────
    if (pathname.startsWith('/api/audit/') && req.method === 'POST') {
      try {
        const targetSlug = assertSafeSlug(pathname.replace('/api/audit/', ''));
        const audit = await runBoxDiffLinter(targetSlug, port + 10);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, audit }));
      } catch (e) {
        res.writeHead(e.statusCode || 500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
      return;
    }

    // ── API: Design Vault Data ────────────────────────────────────────────
    if (pathname === '/api/vault') {
      let easings = null;
      let typography = null;
      try {
        const easingsPath = path.join(vaultDir, '01-motion-physics/easings.json');
        const typographyPath = path.join(vaultDir, '04-typography/curated-pairings.json');
        if (fs.existsSync(easingsPath)) easings = JSON.parse(fs.readFileSync(easingsPath, 'utf8'));
        if (fs.existsSync(typographyPath)) typography = JSON.parse(fs.readFileSync(typographyPath, 'utf8'));
      } catch (e) {}
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ easings, typography }));
      return;
    }

    // ── API: Dados de um Site ─────────────────────────────────────────────
    if (pathname.startsWith('/api/site/')) {
      let siteSlug;
      try {
        siteSlug = assertSafeSlug(pathname.replace('/api/site/', ''));
      } catch (error) {
        res.writeHead(error.statusCode || 400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
        return;
      }
      let sitePath = path.join(copiasDir, siteSlug);
      if (!fs.existsSync(sitePath)) sitePath = path.join(clientesDir, siteSlug);
      if (!fs.existsSync(sitePath)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Site nao encontrado' }));
        return;
      }
      let siteType = null, dna = null, uiUx = null, masterSpec = null, linterReport = null;
      try {
        if (fs.existsSync(path.join(sitePath, 'SITE_TYPE.json'))) siteType = JSON.parse(fs.readFileSync(path.join(sitePath, 'SITE_TYPE.json'), 'utf8'));
        if (fs.existsSync(path.join(sitePath, 'design-system', 'design_dna.json'))) dna = JSON.parse(fs.readFileSync(path.join(sitePath, 'design-system', 'design_dna.json'), 'utf8'));
        if (fs.existsSync(path.join(sitePath, 'ui-ux', 'ui_ux_features.json'))) uiUx = JSON.parse(fs.readFileSync(path.join(sitePath, 'ui-ux', 'ui_ux_features.json'), 'utf8'));
        if (fs.existsSync(path.join(sitePath, 'MASTER_SPEC.md'))) masterSpec = fs.readFileSync(path.join(sitePath, 'MASTER_SPEC.md'), 'utf8');
        if (fs.existsSync(path.join(sitePath, 'linter-report.json'))) linterReport = JSON.parse(fs.readFileSync(path.join(sitePath, 'linter-report.json'), 'utf8'));
      } catch (e) {}
      const tailwindConfig = dna ? generateTailwindConfig(dna) : '';
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ siteSlug, siteType, dna, uiUx, masterSpec, linterReport, tailwindConfig }));
      return;
    }

    // ── Dashboard Principal ───────────────────────────────────────────────
    if (pathname === '/' || pathname === '/index.html') {
      const copias = fs.existsSync(copiasDir)
        ? fs.readdirSync(copiasDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
        : [];
      const clientes = fs.existsSync(clientesDir)
        ? fs.readdirSync(clientesDir, { withFileTypes: true }).filter(d => d.isDirectory()).map(d => d.name)
        : [];
      const html = buildDashboardHtml(copias, clientes);
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }

    // ── API: Salvar Brand Spec do Dev HUD (Tweakpane) ─────────────────────
    if (pathname === '/api/save-brand-spec' && req.method === 'POST') {
      try {
        const data = await readJsonBody(req, { limitBytes: opts.maxBodyBytes });
        const slug = assertSafeSlug(data.slug);
        const targetDir = path.join(clientesDir, slug);
        if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
        const specPath = path.join(targetDir, 'brand-spec.json');
        let spec = {};
        if (fs.existsSync(specPath)) {
          try { spec = JSON.parse(fs.readFileSync(specPath, 'utf8')); } catch(e) {}
        }
        spec.colors = Object.assign(spec.colors || {}, data.colors || {});
        fs.writeFileSync(specPath, JSON.stringify(spec, null, 2), 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, specPath }));
      } catch (error) {
        res.writeHead(error.statusCode || 500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
      return;
    }

    // ── API: Salvar DNA Mutation do Universal HUD (Shadow DOM) ───────────
    if (pathname === '/api/save-dna-mutation' && req.method === 'POST') {
      try {
        const data = await readJsonBody(req, { limitBytes: opts.maxBodyBytes });
        const result = await saveDnaMutation(data, { clientesDir, rootDir });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (error) {
        res.writeHead(error.statusCode || 500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: error.message }));
      }
      return;
    }

    // ── Servir Arquivos Estáticos & Self-Healing Proxy ───────────────────
    let filePath;
    try {
      filePath = resolveStaticPath({ rootDir, copiasDir, clientesDir, pathname });
    } catch (error) {
      res.writeHead(error.statusCode || 400, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('400 Bad Request');
      return;
    }

    const referer = req.headers.referer || '';
    let refererSiteSlug = '';
    if (referer) {
      try {
        const refUrl = new URL(referer);
        const refParts = refUrl.pathname.split('/').filter(Boolean);
        if ((refParts[0] === 'clientes' || refParts[0] === 'projetos') && refParts[1]) {
          refererSiteSlug = path.join(refParts[0], refParts[1]);
        } else if (refParts[0]) {
          refererSiteSlug = refParts[0];
        }
      } catch (e) {}
    }

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      const cleanPath = pathname.replace(/^\/+/, '');
      const candidates = [];

      if (refererSiteSlug) {
        candidates.push(
          path.join(rootDir, refererSiteSlug, 'site', cleanPath),
          path.join(rootDir, refererSiteSlug, 'site', 'assets', cleanPath),
          path.join(rootDir, refererSiteSlug, 'site', 'assets', path.basename(cleanPath)),
          path.join(copiasDir, refererSiteSlug, 'site', cleanPath),
          path.join(copiasDir, refererSiteSlug, 'site', 'assets', cleanPath),
          path.join(copiasDir, refererSiteSlug, 'site', 'assets', path.basename(cleanPath))
        );
      }

      for (const cand of candidates) {
        if (fs.existsSync(cand) && fs.statSync(cand).isFile()) {
          filePath = cand;
          break;
        }
      }
    }

    // ── Self-Healing 404 Interceptor: Se não existir no disco, busca na origem ──
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      let targetSiteDir = null;
      if (refererSiteSlug) {
        targetSiteDir = path.join(rootDir, refererSiteSlug);
      } else {
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length > 0) {
          if (parts[0] === 'clientes' && parts[1]) {
            targetSiteDir = path.join(clientesDir, parts[1]);
          } else if (fs.existsSync(path.join(copiasDir, parts[0]))) {
            targetSiteDir = path.join(copiasDir, parts[0]);
          }
        }
      }

      if (targetSiteDir && fs.existsSync(targetSiteDir)) {
        let originUrl = '';
        try {
          const specPath = path.join(targetSiteDir, 'MASTER_SPEC.md');
          if (fs.existsSync(specPath)) {
            const specText = fs.readFileSync(specPath, 'utf8');
            const match = specText.match(/URL de Origem:\s*(https?:\/\/[^\s\n\r]+)/i);
            if (match) originUrl = match[1].trim();
          }
          if (!originUrl) {
            const stPath = path.join(targetSiteDir, 'SITE_TYPE.json');
            if (fs.existsSync(stPath)) {
              const st = JSON.parse(fs.readFileSync(stPath, 'utf8'));
              originUrl = st.url || '';
            }
          }
        } catch (e) {}

        const cleanReqPath = pathname.replace(/^\/+/, '');
        const baseFile = path.basename(cleanReqPath);
        const assetCandidates = [];

        // 1. Trata caminhos com CDN do Webflow direto
        if (cleanReqPath.includes('cdn.prod.website-files.com')) {
          const cdnSub = cleanReqPath.slice(cleanReqPath.indexOf('cdn.prod.website-files.com') + 'cdn.prod.website-files.com'.length);
          assetCandidates.push(`https://cdn.prod.website-files.com${cdnSub}`);
        } else if (/^[0-9a-f]{24}\//.test(cleanReqPath)) {
          assetCandidates.push(`https://cdn.prod.website-files.com/${cleanReqPath}`);
        }

        // 2. Extrai Webflow site ID de MASTER_SPEC.md ou index.html se existir
        let webflowSiteId = '';
        try {
          const specPath = path.join(targetSiteDir, 'MASTER_SPEC.md');
          if (fs.existsSync(specPath)) {
            const specText = fs.readFileSync(specPath, 'utf8');
            const m = specText.match(/cdn\.prod\.website-files\.com\/([0-9a-f]{24})/i);
            if (m) webflowSiteId = m[1];
          }
          if (!webflowSiteId) {
            const indexPath = path.join(targetSiteDir, 'site', 'index.html');
            if (fs.existsSync(indexPath)) {
              const htmlSample = fs.readFileSync(indexPath, 'utf8').slice(0, 20000);
              const m = htmlSample.match(/cdn\.prod\.website-files\.com\/([0-9a-f]{24})/i);
              if (m) webflowSiteId = m[1];
            }
          }
        } catch (e) {}

        if (webflowSiteId && baseFile) {
          assetCandidates.push(`https://cdn.prod.website-files.com/${webflowSiteId}/${encodeURIComponent(baseFile)}`);
        }

        // 3. URLs relativas à origem
        if (originUrl) {
          try {
            const originObj = new URL(originUrl);
            const subAssetPath = cleanReqPath.replace(/^[^/]+\/(site\/)?(assets\/)?/, '');
            assetCandidates.push(
              new URL(subAssetPath, originObj.origin).href,
              new URL(cleanReqPath, originObj.origin).href
            );
          } catch (e) {}
        }

        for (const remoteUrl of assetCandidates) {
          const fileName = path.basename(new URL(remoteUrl).pathname) || 'asset';
          const localSavePath = path.join(targetSiteDir, 'site', 'assets', decodeURIComponent(fileName));
          const downloaded = await fetchAndSaveRemoteAsset(remoteUrl, localSavePath);
          if (downloaded && fs.existsSync(localSavePath)) {
            filePath = localSavePath;
            break;
          }
        }
      }
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      if (ext === '.html') {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cross-Origin-Resource-Policy': 'same-origin'
        });
        let content = fs.readFileSync(filePath, 'utf8');
        try {
          delete require.cache[require.resolve('../pro/universal-asset-normalizer')];
          const { UniversalAssetNormalizer } = require('../pro/universal-asset-normalizer');
          content = UniversalAssetNormalizer.applyUniversalFixes(content);
        } catch(e) {}
        try {
          delete require.cache[require.resolve('../generators/hud-projector')];
          delete require.cache[require.resolve('../dev/universal-hud-component')];
          try { delete require.cache[require.resolve('../presets/preset-manager')]; } catch(e) {}
          const { injectDnaHud, injectUniversalHud } = require('../generators/hud-projector');
          const clientRoot = path.dirname(path.dirname(filePath));
          const clientSlug = path.basename(clientRoot);
          const dnaPath = path.join(clientRoot, 'dna-ir.json');
          const brandPath = path.join(clientRoot, 'brand-spec.json');
          let clientOptions = {
            clientSlug,
            title: `${clientSlug} — Universal HUD`
          };
          if (fs.existsSync(brandPath)) {
            try { clientOptions.brandSpec = JSON.parse(fs.readFileSync(brandPath, 'utf8')); } catch(e) {}
          } else if (fs.existsSync(dnaPath)) {
            try { clientOptions.brandSpec = JSON.parse(fs.readFileSync(dnaPath, 'utf8')); } catch(e) {}
          }
          content = injectUniversalHud(content, clientOptions);
        } catch(e) {}
        res.end(content);
        return;
      }

      // Serve com suporte a Streaming HTTP 206 (Range) para mídias e assets estáticos
      streamFileWithRange(req, res, filePath, contentType);
    } else {
      // Self-healing fallback para Service Worker ausente
      if (pathname.endsWith('/sw.js') || pathname === '/sw.js') {
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        res.end('self.addEventListener("install", () => self.skipWaiting()); self.addEventListener("activate", () => self.clients.claim());');
        return;
      }
      // Self-healing fallback para Webpack dynamic chunks que não puderam ser baixados
      if (pathname.endsWith('.js') && (pathname.includes('chunk') || pathname.includes('achunk'))) {
        res.writeHead(200, { 'Content-Type': 'application/javascript; charset=utf-8' });
        res.end('(self.webpackChunk=self.webpackChunk||[]).push([[],{}]);');
        return;
      }
      res.writeHead(404, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      res.end('404 Not Found');
    }
  });

  const host = opts.host || '127.0.0.1';
  server.listen(port, host, () => {
    if (opts.silent) return;
    const activePort = server.address().port;
    console.log('\n👁️  [STUDIO DNA PRO v2.0] Servidor rodando em: \x1b[36mhttp://127.0.0.1:' + activePort + '\x1b[0m e \x1b[36mhttp://localhost:' + activePort + '\x1b[0m');
    console.log('📁  Servindo: ' + copiasDir + ' e ' + clientesDir + '\n');
  });

  return server;
}

module.exports = {
  startPreviewServer,
  fetchAndSaveRemoteAsset,
  saveDnaMutation
};
