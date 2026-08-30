const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('node:child_process');
const cheerio = require('cheerio');

const rootDir = path.resolve(__dirname, '..');
const vaultIndexPath = path.join(rootDir, 'design-vault/INDEX.json');

function normalizeAssetReference(reference) {
  const withoutDescriptor = reference.trim().replace(/\s+\d+(?:\.\d+)?[wx]$/, '');
  const withoutQuery = withoutDescriptor.split(/[?#]/, 1)[0];
  return decodeURIComponent(withoutQuery).replace(/^\.?\//, '');
}

function collectLocalAssetReferences(html) {
  const $ = cheerio.load(html);
  const references = new Set();
  const addReference = reference => {
    if (/^\.?\/assets\//.test(reference.trim())) {
      references.add(normalizeAssetReference(reference));
    }
  };

  $('*').each((_, element) => {
    for (const [name, value] of Object.entries(element.attribs || {})) {
      if (name === 'srcset') {
        value.split(',').forEach(addReference);
      } else {
        addReference(value);
      }

      for (const match of value.matchAll(/url\(\s*(?:["']([^"']+)["']|([^\s)]+))\s*\)/g)) {
        addReference(match[1] || match[2]);
      }
    }
  });

  $('style, script').each((_, element) => {
    const content = $(element).html() || '';
    for (const match of content.matchAll(/(["'])(\.?\/assets\/.*?)\1/g)) {
      addReference(match[2]);
    }
    for (const match of content.matchAll(/url\(\s*(?:["']([^"']+)["']|([^\s)]+))\s*\)/g)) {
      addReference(match[1] || match[2]);
    }
  });

  return [...references].sort();
}

test('Design Vault INDEX.json exists and contains required tiers', () => {
  assert.ok(fs.existsSync(vaultIndexPath), 'design-vault/INDEX.json deve existir');
  const indexData = JSON.parse(fs.readFileSync(vaultIndexPath, 'utf8'));

  assert.ok(indexData.vaultTiers, 'Deve declarar vaultTiers');
  assert.ok(Array.isArray(indexData.patterns), 'patterns deve ser um array');
  assert.ok(Array.isArray(indexData.templates), 'templates deve ser um array');
});

test('Design Vault all declared patterns exist on disk', () => {
  const indexData = JSON.parse(fs.readFileSync(vaultIndexPath, 'utf8'));

  for (const pattern of indexData.patterns) {
    const fullPath = path.join(rootDir, pattern.path);
    assert.ok(fs.existsSync(fullPath), `Arquivo de pattern deve existir: ${pattern.path}`);
  }
});

test('Design Vault templates contain their declared artifacts', () => {
  const indexData = JSON.parse(fs.readFileSync(vaultIndexPath, 'utf8'));

  for (const tpl of indexData.templates) {
    const tplDir = path.join(rootDir, tpl.path);
    assert.ok(fs.existsSync(tplDir), `Diretório do template deve existir: ${tpl.path}`);

    for (const [key, relativeFile] of Object.entries(tpl.artifacts)) {
      const artifactPath = path.join(tplDir, relativeFile);
      assert.ok(fs.existsSync(artifactPath), `Artefato ${key} (${relativeFile}) deve existir em ${tpl.path}`);
    }
  }
});

test('Design Vault declared artifacts are not ignored by Git', () => {
  const indexData = JSON.parse(fs.readFileSync(vaultIndexPath, 'utf8'));

  for (const tpl of indexData.templates) {
    for (const [key, relativeFile] of Object.entries(tpl.artifacts)) {
      const artifactPath = path.posix.join(tpl.path.replace(/\\/g, '/'), relativeFile);
      const result = spawnSync('git', ['check-ignore', '--quiet', '--', artifactPath], {
        cwd: rootDir
      });

      assert.notEqual(
        result.status,
        0,
        `Artefato ${key} (${artifactPath}) declarado pelo Vault não pode ser ignorado pelo Git`
      );
    }
  }
});

test('Elyse template closes and versions every local asset reference', () => {
  const templateDir = path.join(rootDir, 'design-vault/elyse-residence-dev-webflow-io');
  const skeleton = fs.readFileSync(path.join(templateDir, 'skeleton.html'), 'utf8');
  const references = collectLocalAssetReferences(skeleton);

  assert.ok(references.length >= 50, 'O teste deve cobrir atributos, srcset, CSS e scripts do template');

  for (const reference of references) {
    const absolutePath = path.join(templateDir, reference);
    assert.ok(fs.existsSync(absolutePath), `Asset local do skeleton deve existir: ${reference}`);

    const repositoryPath = path.posix.join(
      'design-vault/elyse-residence-dev-webflow-io',
      reference.replace(/\\/g, '/')
    );
    const result = spawnSync('git', ['check-ignore', '--quiet', '--', repositoryPath], {
      cwd: rootDir
    });
    assert.notEqual(result.status, 0, `Asset local do skeleton não pode ser ignorado: ${repositoryPath}`);
  }
});
