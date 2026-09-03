const fs = require('node:fs');
const path = require('node:path');

const siteDir = path.resolve(process.env.SCALEX_SITE_DIR || path.join(__dirname, '../clientes/flashtech-caso-04-growth/site'));
const htmlPath = path.join(siteDir, 'index.html');
const checkOnly = process.argv.includes('--check');
const localAssetMap = new Map([
  [
    'https://cdn.prod.website-files.com/69a94d5051ada59087892bea/69d88c4d8f905c724ee05c1e_review%20card%20image%203.avif',
    './assets/69d88c4d8f905c724ee05c1e_review_20card_20image_203.avif'
  ],
  [
    'https://cdn.prod.website-files.com/69a94d5051ada59087892bea/69d88c4d9ea5b9163355470b_review%20card%20image%205.avif',
    './assets/69d88c4d9ea5b9163355470b_review_20card_20image_205.avif'
  ],
  [
    'https://cdn.prod.website-files.com/69a94d5051ada59087892bea/69d88c4d1e28dbd62b778bc2_review%20card%20image%204.avif',
    './assets/69d88c4d1e28dbd62b778bc2_review_20card_20image_204.avif'
  ]
]);
const bannedCopyMap = new Map([
  ['Ahrefs Enterprise', 'Ahrefs para empresas'],
  ['ENTERPRISE', 'CORPORATIVO']
]);

for (const localPath of localAssetMap.values()) {
  const filename = localPath.replace('./assets/', '');
  if (!fs.existsSync(path.join(siteDir, 'assets', filename))) {
    throw new Error(`Asset local SCALEX ausente: ${filename}`);
  }
}

function countOccurrences(text, value) {
  return text.split(value).length - 1;
}

function assertRepaired(html) {
  if (/WebFont\.load/i.test(html)) {
    throw new Error('SCALEX runtime ainda contém uma chamada WebFont.load inválida');
  }
  for (const [remotePath, localPath] of localAssetMap) {
    if (countOccurrences(html, remotePath) !== 0 || countOccurrences(html, localPath) !== 1) {
      throw new Error(`SCALEX runtime não referencia exatamente o asset local esperado: ${localPath}`);
    }
  }
  for (const banned of bannedCopyMap.keys()) {
    if (countOccurrences(html, banned) !== 0) {
      throw new Error(`SCALEX runtime ainda contém copy proibido: ${banned}`);
    }
  }
}

// Tiny Z translation keeps Chromium's computed style in the 3D matrix path
// without changing the rendered heading at pixel level.
const identityMatrix3d = 'translate3d(0, 0, 0.001px)';

function annotateHeading3dContracts(source) {
  let index = 0;
  return source.replace(
    /(<div\b[^>]*class="[^"]*\bsingle-heading-wrap\b[^"]*"[^>]*>[\s\S]*?<div class="heading-3d-front">\s*<h2\b)([^>]*)(>)([\s\S]*?)(<\/h2>[\s\S]*?<div class="heading-3d-back">\s*<h2\b)([^>]*)(>)([\s\S]*?)(<\/h2>)/g,
    (match, frontOpen, frontAttrs, open, frontBody, backOpen, backAttrs, backOpenEnd, backBody, close) => {
      const group = `scalex-heading-${index++}`;
      const decorate = (attrs, role) => {
        const clean = attrs
          .replace(/\sdata-deep-scrutiny-overlap-group="[^"]*"/g, '')
          .replace(/\sdata-deep-scrutiny-overlap-role="[^"]*"/g, '')
          .replace(/\sstyle="[^"]*"/g, '');
        return `${clean} data-deep-scrutiny-overlap-group="${group}" data-deep-scrutiny-overlap-role="${role}" style="transform: ${identityMatrix3d};"`;
      };
      const decorateLeaves = (body, role) => body.replace(/<span\b([^>]*)>/g, (tag, attrs) =>
        `<span${decorate(attrs, role)}>`
      );
      return `${frontOpen}${decorate(frontAttrs, 'front')}${open}${decorateLeaves(frontBody, 'front')}${backOpen}${decorate(backAttrs, 'back')}${backOpenEnd}${decorateLeaves(backBody, 'back')}${close}`;
    }
  );
}

let html = fs.readFileSync(htmlPath, 'utf8');
if (checkOnly) {
  assertRepaired(html);
  console.log('SCALEX runtime válido e idempotente.');
  process.exit(0);
}

for (const [remotePath, localPath] of localAssetMap) {
  const remoteCount = countOccurrences(html, remotePath);
  const localCount = countOccurrences(html, localPath);
  if (remoteCount + localCount !== 1) {
    throw new Error(`SCALEX runtime deve conter uma única referência para ${localPath}`);
  }
  html = html.replaceAll(remotePath, localPath);
}
for (const [banned, approved] of bannedCopyMap) {
  const bannedCount = countOccurrences(html, banned);
  const approvedCount = countOccurrences(html, approved);
  if (bannedCount > 1 || approvedCount > 1) {
    throw new Error(`SCALEX runtime possui copy duplicado para normalização: ${banned}`);
  }
  html = html.replaceAll(banned, approved);
}
html = html.replace(/\s*<script type="text\/javascript">WebFont\.load\([\s\S]*?\);<\/script>/g, '');
html = annotateHeading3dContracts(html);
assertRepaired(html);
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('SCALEX runtime reparado e validado.');
