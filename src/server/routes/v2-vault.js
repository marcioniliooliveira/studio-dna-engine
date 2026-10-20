/**
 * src/server/routes/v2-vault.js
 * 
 * Endpoints V2 para o Design Vault Dinâmico e Gestão de Tokens DTCG
 */

const fs = require('fs');
const path = require('path');
const { assertSafeSlug } = require('../security');

async function handleV2Vault(req, res, pathname, opts = {}) {
  const rootDir = opts.rootDir || process.cwd();
  const vaultDir = opts.vaultDir || path.join(rootDir, 'design-vault');

  // 1. GET /api/v2/vault/references
  if (pathname === '/api/v2/vault/references' && req.method === 'GET') {
    if (!fs.existsSync(vaultDir)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ references: [] }));
      return true;
    }

    const items = fs.readdirSync(vaultDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && !d.name.startsWith('.'))
      .map(d => {
        const itemDir = path.join(vaultDir, d.name);
        let hasTokens = fs.existsSync(path.join(itemDir, 'tokens.json'));
        let hasCard = fs.existsSync(path.join(itemDir, 'REFERENCE_CARD.md'));
        let hasSkeleton = fs.existsSync(path.join(itemDir, 'skeleton.html'));

        return {
          slug: d.name,
          title: d.name.replace(/[-_]/g, ' ').toUpperCase(),
          hasTokens,
          hasCard,
          hasSkeleton,
          path: itemDir
        };
      });

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: items.length, references: items }));
    return true;
  }

  // 2. GET /api/v2/vault/tokens/:slug
  if (pathname.startsWith('/api/v2/vault/tokens/') && req.method === 'GET') {
    try {
      const slug = assertSafeSlug(pathname.replace('/api/v2/vault/tokens/', '').trim());
      const tokensFile = path.join(vaultDir, slug, 'tokens.json');

      if (fs.existsSync(tokensFile)) {
        const tokens = JSON.parse(fs.readFileSync(tokensFile, 'utf8'));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, slug, tokens }));
        return true;
      }

      // Fallback para as regras globais de governança se for "governance"
      if (slug === 'governance') {
        const rulesPath = path.join(vaultDir, '00-governance', 'anti-slop-rules.json');
        if (fs.existsSync(rulesPath)) {
          const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, slug: 'governance', rules }));
          return true;
        }
      }

      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `Tokens não encontrados para a referência: ${slug}` }));
      return true;
    } catch (err) {
      res.writeHead(err.statusCode || 400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return true;
    }
  }

  return false;
}

module.exports = { handleV2Vault };
