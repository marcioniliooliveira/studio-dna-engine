/**
 * Test Suite: Negocia Bem Real Property Dataset Integrity
 * Verifies NEGOCIA_BEM_DATA schema, authentic CDN photo links,
 * mirror synchronization, and 8-card grid constraint.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('🧪 Starting Negocia Bem Dataset Unit Tests...\n');

let passCount = 0;
let failCount = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ✗ ${name}`);
    console.error(`    Error: ${err.message}`);
    failCount++;
  }
}

const file1Path = path.resolve(__dirname, '../studio-dna-engine/clientes/negocia-bem/site/js/negociabem-data.js');
const file2Path = path.resolve(__dirname, '../studio-dna-engine/clientes/negociabem/site/js/negociabem-data.js');

// Test 1: Primary file exists
test('Primary dataset file exists at studio-dna-engine/clientes/negocia-bem/site/js/negociabem-data.js', () => {
  assert.strictEqual(fs.existsSync(file1Path), true, `File missing at ${file1Path}`);
});

// Test 2: Mirror file exists
test('Mirror dataset file exists at studio-dna-engine/clientes/negociabem/site/js/negociabem-data.js', () => {
  assert.strictEqual(fs.existsSync(file2Path), true, `File missing at ${file2Path}`);
});

// Test 3: Files are identical in content
test('Primary and mirror files have identical contents', () => {
  assert.strictEqual(fs.existsSync(file1Path), true);
  assert.strictEqual(fs.existsSync(file2Path), true);
  const content1 = fs.readFileSync(file1Path, 'utf8');
  const content2 = fs.readFileSync(file2Path, 'utf8');
  assert.strictEqual(content1, content2, 'Primary and mirror contents differ');
});

// Load the dataset
let data;
test('Dataset loads and exports NEGOCIA_BEM_DATA successfully', () => {
  delete require.cache[require.resolve(file1Path)];
  const exported = require(file1Path);
  data = exported.NEGOCIA_BEM_DATA || exported;
  assert.ok(data, 'Export is null or undefined');
  assert.strictEqual(typeof data, 'object', 'Export is not an object');
});

// Test 4: Browser environment compatibility (window.NEGOCIA_BEM_DATA)
test('Dataset supports window.NEGOCIA_BEM_DATA in browser environments', () => {
  const content = fs.readFileSync(file1Path, 'utf8');
  assert.ok(
    content.includes('window.NEGOCIA_BEM_DATA') || content.includes('root.NEGOCIA_BEM_DATA'),
    'File does not provide window.NEGOCIA_BEM_DATA browser export'
  );

  const vm = require('vm');
  const context = { window: {} };
  context.window = context; // standard browser self-reference
  vm.createContext(context);
  vm.runInContext(content, context);
  assert.ok(context.NEGOCIA_BEM_DATA, 'Failed to assign window.NEGOCIA_BEM_DATA in browser VM');
  assert.strictEqual(context.NEGOCIA_BEM_DATA.featured.id, 'NB-105455');
});

// Test 5: Featured property completeness
test('Featured property (NB-105455) has all required decision & architectural data', () => {
  assert.ok(data.featured, 'Featured property is missing');
  const f = data.featured;
  assert.strictEqual(f.id, 'NB-105455', 'Incorrect featured ID');
  assert.strictEqual(f.title, 'Casa Contemporânea Jardim América', 'Incorrect featured title');
  assert.strictEqual(f.bairro, 'Jardim América', 'Incorrect featured bairro');
  assert.ok(f.cidade && f.cidade.includes('Paiçandu'), 'Featured cidade must include Paiçandu');
  assert.strictEqual(f.preco, 'R$ 350.000', 'Incorrect featured preco');
  assert.strictEqual(f.areaConstruida, '70,49 m²', 'Incorrect areaConstruida');
  assert.strictEqual(f.areaTerreno, '150 m²', 'Incorrect areaTerreno');
  assert.ok(f.quartos && f.quartos.includes('3'), 'Featured must have 3 quartos');
  assert.ok(f.suites && f.suites.includes('1'), 'Featured must have 1 suíte');
  assert.ok(f.banheiros && f.banheiros.includes('2'), 'Featured must have 2 banheiros');
  assert.ok(f.vagas && f.vagas.includes('2'), 'Featured must have 2 vagas');
  assert.ok(f.distanciaMaringa && f.distanciaMaringa.includes('12 min'), 'Featured must specify 12 min de Maringá');
  assert.ok(f.desc && f.desc.length > 100, 'Featured description must be rich and authentic (>100 chars)');
});

// Test 6: Featured property simulation data
test('Featured property contains valid Caixa / MCMV financing simulation', () => {
  const f = data.featured;
  assert.ok(f.simulacao, 'Simulation object missing');
  assert.ok(f.simulacao.entrada && f.simulacao.entrada.includes('35.000'), 'Simulation missing entry value');
  assert.ok(f.simulacao.parcela && f.simulacao.parcela.includes('1.450'), 'Simulation missing parcel value');
  assert.ok(f.simulacao.taxa, 'Simulation missing interest/tax information');
});

// Test 7: Featured property differentials
test('Featured property contains differentials list', () => {
  const f = data.featured;
  assert.ok(Array.isArray(f.diferenciais), 'Diferenciais must be an array');
  assert.ok(f.diferenciais.length >= 4, 'Must have at least 4 differentials');
  assert.ok(f.diferenciais.some(d => d.toLowerCase().includes('gourmet') || d.toLowerCase().includes('churrasqueira')));
});

// Test 8: Featured property photos
test('Featured property has at least 6 authentic CDN photos (expected 8)', () => {
  const f = data.featured;
  assert.ok(Array.isArray(f.photos), 'Featured photos must be an array');
  assert.ok(f.photos.length >= 6, `Featured has only ${f.photos.length} photos, expected >= 6`);
  assert.strictEqual(f.photos.length, 8, 'Featured should have 8 photos as specified in brief');
  f.photos.forEach((photoUrl, idx) => {
    assert.ok(photoUrl.startsWith('https://www.encontraimoveis.com.br/img/'), `Photo ${idx} URL invalid: ${photoUrl}`);
    assert.ok(photoUrl.includes('000105455'), `Photo ${idx} must reference property 105455`);
  });
});

// Test 9: Grid Properties count constraint (EXACTLY 8 properties = 3 rows)
test('Grid properties array contains EXACTLY 8 properties (3 complete rows)', () => {
  assert.ok(Array.isArray(data.gridProperties), 'gridProperties must be an array');
  assert.strictEqual(data.gridProperties.length, 8, `gridProperties must have EXACTLY 8 items, got ${data.gridProperties.length}`);
});

// Test 10: Every grid property schema & photo validation
test('Every grid property has valid required fields, valid category, and >= 3 CDN photos', () => {
  const validCategories = ['comprar', 'alugar', 'terrenos'];
  const validBadges = ['COMPRAR', 'ALUGAR', 'INVESTIR'];

  data.gridProperties.forEach((prop, index) => {
    assert.ok(prop.id && prop.id.startsWith('NB-'), `Prop #${index} invalid ID: ${prop.id}`);
    assert.ok(prop.title && prop.title.length > 0, `Prop #${index} missing title`);
    assert.ok(prop.bairro && prop.bairro.length > 0, `Prop #${index} missing bairro`);
    assert.ok(prop.cidade && prop.cidade.length > 0, `Prop #${index} missing cidade`);
    assert.ok(prop.preco && prop.preco.length > 0, `Prop #${index} missing preco`);
    assert.ok(prop.area && prop.area.length > 0, `Prop #${index} missing area`);
    assert.ok(validCategories.includes(prop.category.toLowerCase()), `Prop #${index} invalid category: ${prop.category}`);
    if (prop.badge) {
      assert.ok(validBadges.includes(prop.badge.toUpperCase()), `Prop #${index} invalid badge: ${prop.badge}`);
    }
    assert.ok(Array.isArray(prop.photos), `Prop #${index} photos is not an array`);
    assert.ok(prop.photos.length >= 3, `Prop #${index} (${prop.id}) has ${prop.photos.length} photos, expected >= 3`);
    prop.photos.forEach((pUrl, pIdx) => {
      assert.ok(pUrl.startsWith('https://www.encontraimoveis.com.br/img/'), `Prop #${index} photo #${pIdx} invalid CDN: ${pUrl}`);
    });
  });
});

// Test 11: Specific required properties in grid
test('Grid includes the 8 specified properties in the exact design sequence', () => {
  const ids = data.gridProperties.map(p => p.id);
  assert.strictEqual(ids[0], 'NB-106504', 'Row 1 Hero card must be NB-106504');
  assert.strictEqual(ids[1], 'NB-106160', 'Row 1 Companion card must be NB-106160');
  assert.strictEqual(ids[2], 'NB-107432', 'Row 2 card 1 must be NB-107432');
  assert.strictEqual(ids[3], 'NB-107426', 'Row 2 card 2 must be NB-107426');
  assert.strictEqual(ids[4], 'NB-103543', 'Row 2 card 3 must be NB-103543');
  assert.strictEqual(ids[5], 'NB-106918', 'Row 3 card 1 must be NB-106918');
  assert.strictEqual(ids[6], 'NB-106892', 'Row 3 card 2 must be NB-106892');
  assert.strictEqual(ids[7], 'NB-87865', 'Row 3 card 3 must be NB-87865');
});

// Summary
console.log('\n----------------------------------------');
console.log(`Results: ${passCount} passed, ${failCount} failed`);
console.log('----------------------------------------\n');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 All dataset tests passed successfully!');
  process.exit(0);
}
