/**
 * src/server/routes/v2-review.js
 * 
 * Endpoints V2 para o Review Console e Aprovação de Golden (`human-decision.json`)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { assertSafeSlug, readJsonBody } = require('../security');

async function handleV2Review(req, res, pathname, opts = {}) {
  const rootDir = opts.rootDir || process.cwd();
  const clientesDir = opts.clientesDir || path.join(rootDir, 'clientes');

  // 1. GET /api/v2/directions/:clientSlug
  if (pathname.startsWith('/api/v2/directions/') && req.method === 'GET') {
    try {
      const slug = assertSafeSlug(pathname.replace('/api/v2/directions/', '').trim());
      const clientDir = path.join(clientesDir, slug);

      if (!fs.existsSync(clientDir)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Cliente não encontrado: ${slug}` }));
        return true;
      }

      // Direções Visuais Geradas A/B/C
      const directions = [
        {
          directionId: 'A',
          name: 'Technical Precision (Swiss Grid)',
          description: 'Grid milimétrico de 12 colunas, linhas finas de 1px, tipografia mono em tags, dark mode profundo.',
          palette: { bg: '#030508', accent: '#38bdf8', text: '#fafaf9' },
          motion: 'Lenis inertial + Snappy easing (cubic-bezier(0.16, 1, 0.3, 1))',
          previewUrl: `/clientes/${slug}/site/index.html?direction=A`
        },
        {
          directionId: 'B',
          name: 'Editorial Brutalist',
          description: 'Tipografia display gigante com tracking negativo extremo, alto contraste preto e branco duro, ausência de cantos arredondados.',
          palette: { bg: '#0a0a0a', accent: '#f5f5f5', text: '#ffffff' },
          motion: 'SplitText unmasking com reveal de máscara vertical em blocos',
          previewUrl: `/clientes/${slug}/site/index.html?direction=B`
        },
        {
          directionId: 'C',
          name: 'Kinetic Luxury',
          description: 'Mídia full-bleed com gradação de cor cinematográfica, serifas finas, glassmorphism sutil e transições lentas de 1200ms.',
          palette: { bg: '#07080a', accent: '#d4af37', text: '#e5e0d8' },
          motion: 'Parallax sutil em 3 camadas no hero + fade-in escalonado',
          previewUrl: `/clientes/${slug}/site/index.html?direction=C`
        }
      ];

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, clientSlug: slug, directions }));
      return true;
    } catch (err) {
      res.writeHead(err.statusCode || 400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return true;
    }
  }

  // 2. POST /api/v2/decisions
  if (pathname === '/api/v2/decisions' && req.method === 'POST') {
    try {
      const data = await readJsonBody(req, { limitBytes: opts.maxBodyBytes || 1024 * 1024 });
      const slug = assertSafeSlug(data.clientSlug);
      const targetDir = path.join(clientesDir, slug);

      if (!fs.existsSync(targetDir)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `Cliente não encontrado: ${slug}` }));
        return true;
      }

      const decisionRecord = {
        schemaVersion: 2,
        contractKind: 'human-decision',
        decisionId: `dec-${Date.now()}`,
        clientSlug: slug,
        selectedDirection: data.selectedDirection || 'A',
        approver: data.approver || 'human-architect',
        timestamp: new Date().toISOString(),
        signedPayloadSha256: crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex'),
        status: 'approved-frozen'
      };

      const decisionPath = path.join(targetDir, 'human-decision.json');
      fs.writeFileSync(decisionPath, JSON.stringify(decisionRecord, null, 2), 'utf8');

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: `Direção ${decisionRecord.selectedDirection} aprovada e congelada como Golden`,
        decision: decisionRecord
      }));
      return true;
    } catch (err) {
      res.writeHead(err.statusCode || 500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return true;
    }
  }

  return false;
}

module.exports = { handleV2Review };
