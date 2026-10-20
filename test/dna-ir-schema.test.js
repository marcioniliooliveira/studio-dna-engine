const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { validateDnaIr, validateCapabilityGraph } = require('../icm/_core/contracts.js');

test('DNA IR Schema: core schema files exist and are valid JSON', () => {
  const schemaDir = path.join(__dirname, '..', 'icm', '_core');
  const requiredSchemas = [
    'dna-ir.schema.json',
    'capability.schema.json',
    'constraint.schema.json',
    'mutation.schema.json'
  ];

  for (const file of requiredSchemas) {
    const fullPath = path.join(schemaDir, file);
    assert.equal(fs.existsSync(fullPath), true, `Schema file ${file} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert.doesNotThrow(() => JSON.parse(content), `Schema ${file} must be valid JSON`);
    const schema = JSON.parse(content);
    assert.equal(typeof schema.$schema, 'string', `${file} must declare $schema`);
    assert.equal(typeof schema.title, 'string', `${file} must declare title`);
  }
});

test('DNA IR Schema: validates a compliant agnostic DNA IR object', () => {
  const sampleIr = {
    schemaVersion: '0.1.0',
    specimen: 'test-specimen',
    capabilities: {
      layout: { active: true, confidence: 1.0 },
      typography: { active: true, confidence: 0.95 },
      motion: { active: true, confidence: 0.9 },
      webgl: { active: false, confidence: 1.0 },
      audio: { active: false, confidence: 1.0 },
      editorial: { active: true, confidence: 0.85 }
    },
    sections: [
      {
        id: 'hero',
        role: 'hero-editorial',
        domSelector: '#hero',
        mutability: {
          copy: 'high',
          typography: 'high',
          palette: 'medium',
          layout: 'low'
        }
      }
    ],
    parameters: [
      {
        id: 'hero.typography.primary',
        category: 'typography',
        type: 'FontSpec',
        value: { family: 'Inter', fallback: 'sans-serif' },
        mutability: 'mutable',
        confidence: 0.95,
        origin: {
          source: 'static-analysis',
          method: 'css-extraction'
        }
      }
    ],
    bindings: [
      {
        paramId: 'hero.typography.primary',
        adapter: 'css',
        target: ':root',
        property: '--sans'
      }
    ],
    constraints: [
      {
        id: 'c-typography-safearea',
        type: 'adaptive',
        source: 'hero.typography.primary',
        target: 'hero.layout.safeArea',
        rule: 'text-fit-containment'
      }
    ],
    invariants: [
      {
        id: 'inv-high-contrast',
        description: 'Maintain minimum contrast ratio of 4.5:1 between text and ground'
      }
    ]
  };

  const result = validateDnaIr(sampleIr);
  assert.equal(result.valid, true, `Compliant DNA IR must be valid: ${result.error || ''}`);
});

test('DNA IR Schema: rejects DNA IR with technology-specific coupling in canonical parameters', () => {
  const coupledIr = {
    schemaVersion: '0.1.0',
    specimen: 'coupled-specimen',
    capabilities: {},
    sections: [],
    parameters: [
      {
        id: 'hero.threejs.material.roughness', // VIOLATION: "threejs" in canonical parameter ID
        category: 'surface',
        type: 'NumberRange',
        value: 0.5,
        mutability: 'mutable'
      }
    ],
    bindings: [],
    constraints: [],
    invariants: []
  };

  const result = validateDnaIr(coupledIr);
  assert.equal(result.valid, false, 'Should reject technology-specific terms in canonical parameter IDs');
  assert.match(result.error, /framework-neutral/i);
});

test('DNA IR Schema: rejects DNA IR missing required core fields', () => {
  const invalidIr = {
    schemaVersion: '0.1.0'
    // missing specimen, capabilities, sections, parameters, bindings, constraints, invariants
  };

  const result = validateDnaIr(invalidIr);
  assert.equal(result.valid, false, 'Should reject DNA IR missing required core fields');
  assert.equal(typeof result.error, 'string');
});

test('Capability Graph: validates active capabilities and confidence bounds', () => {
  const validCapabilities = {
    layout: { active: true, confidence: 1.0 },
    typography: { active: true, confidence: 0.95 },
    webgl: { active: true, confidence: 0.98 }
  };
  assert.equal(validateCapabilityGraph(validCapabilities).valid, true);

  const invalidBounds = {
    layout: { active: true, confidence: 1.5 } // confidence > 1.0 is invalid
  };
  assert.equal(validateCapabilityGraph(invalidBounds).valid, false);
});

test('Deliverable B: OP-XY Hero + Strip Canonical DNA IR exists and passes validation', () => {
  const clientIrPath = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'dna-ir.json');
  const vaultIrPath = path.join(__dirname, '..', 'design-vault', 'op-xy-76-aura-build', 'dna-ir.json');

  assert.equal(fs.existsSync(clientIrPath), true, 'clientes/opxy-tuning-lab/dna-ir.json must exist');
  assert.equal(fs.existsSync(vaultIrPath), true, 'design-vault/op-xy-76-aura-build/dna-ir.json must exist');

  const clientContent = JSON.parse(fs.readFileSync(clientIrPath, 'utf8'));
  const vaultContent = JSON.parse(fs.readFileSync(vaultIrPath, 'utf8'));

  const clientResult = validateDnaIr(clientContent);
  assert.equal(clientResult.valid, true, `Client DNA IR must be valid: ${clientResult.error || ''}`);

  const vaultResult = validateDnaIr(vaultContent);
  assert.equal(vaultResult.valid, true, `Vault DNA IR must be valid: ${vaultResult.error || ''}`);

  // Check that OP-XY mapping strictly covers Hero and Strip
  const sectionIds = clientContent.sections.map(s => s.id);
  assert.equal(sectionIds.includes('hero'), true, 'Must map hero section');
  assert.equal(sectionIds.includes('strip'), true, 'Must map strip section');

  // Check that hardware 3D and audio capabilities are declared
  assert.equal(clientContent.capabilities.webgl?.active, true, 'OP-XY must declare webgl capability');
  assert.equal(clientContent.capabilities.audio?.active, true, 'OP-XY must declare audio capability');

  // Check bindings exist for both CSS and 3D
  const adapters = new Set(clientContent.bindings.map(b => b.adapter));
  assert.equal(adapters.has('css'), true, 'Must have css bindings');
  assert.equal(adapters.has('three'), true, 'Must have three.js adapter bindings');
  assert.equal(adapters.has('audio'), true, 'Must have audio adapter bindings');
});
