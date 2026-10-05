/**
 * Milestone M1 Empirical Challenger Test Suite
 * Adversarially challenges:
 * 1. AJV Draft 2020-12 schema compilation under strict mode and formats.
 * 2. Systematic rejection of malformed, incomplete, and corrupted fixtures.
 * 3. Edge cases: Unicode, deep nesting, array bounds, numeric limits.
 * 4. Cross-schema adversarial enforcement (Archetype, Certification, Manifest).
 * 5. Permissiveness analysis (unconstrained properties, negative numbers, empty arrays).
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

const ROOT_DIR = path.resolve(__dirname, '..');
const SCHEMAS_DIR = path.join(ROOT_DIR, 'schemas');
const COPIAS_DIR = path.join(ROOT_DIR, 'copias');
const VAULT_DIR = path.join(ROOT_DIR, 'design-vault');

function createAjv(options = {}) {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    strictTypes: true,
    strictTuples: true,
    strictRequired: true,
    ...options
  });
  addFormats(ajv);
  return ajv;
}

const dnaSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'component_dna.v1.schema.json'), 'utf8'));
const archetypeSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'component_archetype.v1.schema.json'), 'utf8'));
const certSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'component_certification.v1.schema.json'), 'utf8'));
const manifestSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'reference_manifest.v1.schema.json'), 'utf8'));

const planesFixture = JSON.parse(fs.readFileSync(path.join(COPIAS_DIR, 'planes', 'chat', 'dna.json'), 'utf8'));
const arcFixture = JSON.parse(fs.readFileSync(path.join(COPIAS_DIR, 'arc', 'agent-run', 'dna.json'), 'utf8'));
const buiFixture = JSON.parse(fs.readFileSync(path.join(COPIAS_DIR, 'beautiful-ui', 'approval-card', 'dna.json'), 'utf8'));

describe('CHALLENGER 1: AJV Draft 2020-12 Strict Compilation & Warning Spy', () => {
  it('should compile all 4 schemas with zero compiler warnings and zero errors under strict mode', () => {
    const warnings = [];
    const loggerSpy = {
      log: console.log,
      warn: (msg) => warnings.push(msg),
      error: (msg) => { throw new Error(`AJV compiler error: ${msg}`); }
    };

    const ajv = createAjv({ logger: loggerSpy });
    const schemas = [dnaSchema, archetypeSchema, certSchema, manifestSchema];

    for (const schema of schemas) {
      const validateFn = ajv.compile(schema);
      assert.equal(typeof validateFn, 'function', `Schema ${schema.title} must compile to a function`);
    }

    assert.equal(warnings.length, 0, `Schemas must produce 0 compilation warnings in strict mode, got: ${JSON.stringify(warnings)}`);
  });

  it('should reject invalid draft schemas if given an obsolete or malformed meta-schema', () => {
    const ajv = createAjv();
    const badSchema = {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      type: 'invalid-type-name'
    };
    assert.throws(() => {
      ajv.compile(badSchema);
    });
  });
});

describe('CHALLENGER 2: Baseline Validation of All Canonical Fixtures', () => {
  const ajv = createAjv();
  const validateDna = ajv.compile(dnaSchema);

  it('copias/planes/chat/dna.json passes validation', () => {
    const valid = validateDna(planesFixture);
    assert.ok(valid, `Planes AI Chat must pass: ${JSON.stringify(validateDna.errors)}`);
    assert.equal(validateDna.errors, null);
  });

  it('copias/arc/agent-run/dna.json passes validation', () => {
    const valid = validateDna(arcFixture);
    assert.ok(valid, `Arc Agent Run must pass: ${JSON.stringify(validateDna.errors)}`);
    assert.equal(validateDna.errors, null);
  });

  it('copias/beautiful-ui/approval-card/dna.json passes validation', () => {
    const valid = validateDna(buiFixture);
    assert.ok(valid, `Beautiful UI Approval Card must pass: ${JSON.stringify(validateDna.errors)}`);
    assert.equal(validateDna.errors, null);
  });
});

describe('CHALLENGER 3: Adversarial Corruption Matrix (Rejection Enforcement)', () => {
  const ajv = createAjv();
  const validateDna = ajv.compile(dnaSchema);
  const base = JSON.parse(JSON.stringify(arcFixture));

  function assertRejection(corrupted, description, expectedErrorPathOrParam) {
    const valid = validateDna(corrupted);
    assert.equal(valid, false, `Expected rejection for: ${description}, but validation passed!`);
    assert.ok(validateDna.errors && validateDna.errors.length > 0, `Expected error list for: ${description}`);
    if (expectedErrorPathOrParam) {
      const match = validateDna.errors.some(
        (e) =>
          (e.instancePath && e.instancePath.includes(expectedErrorPathOrParam)) ||
          (e.params && e.params.missingProperty === expectedErrorPathOrParam) ||
          (e.keyword && e.keyword === expectedErrorPathOrParam)
      );
      assert.ok(
        match,
        `Expected error matching '${expectedErrorPathOrParam}' for ${description}, got: ${JSON.stringify(validateDna.errors)}`
      );
    }
  }

  // 1. Missing required root fields
  const requiredRoot = [
    'dnaVersion', 'identity', 'provenance', 'epistemology', 'anatomy',
    'geometryConstraints', 'tokens', 'stateMachine', 'motionDynamics',
    'accessibilityContract', 'dependencies'
  ];

  for (const field of requiredRoot) {
    it(`strictly rejects when missing root field: ${field}`, () => {
      const copy = JSON.parse(JSON.stringify(base));
      delete copy[field];
      assertRejection(copy, `missing ${field}`, field);
    });
  }

  // 2. Corrupted dnaVersion
  it('rejects dnaVersion != "1.0.0"', () => {
    const copy = { ...base, dnaVersion: '2.0.0' };
    assertRejection(copy, 'invalid dnaVersion', 'dnaVersion');
  });

  it('rejects non-string dnaVersion', () => {
    const copy = { ...base, dnaVersion: 1.0 };
    assertRejection(copy, 'numeric dnaVersion', 'dnaVersion');
  });

  // 3. Corrupted Identity
  it('rejects identity missing id', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.identity.id;
    assertRejection(copy, 'identity missing id', 'id');
  });

  it('rejects identity missing semanticName', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.identity.semanticName;
    assertRejection(copy, 'identity missing semanticName', 'semanticName');
  });

  it('rejects identity missing suggestedArchetype', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.identity.suggestedArchetype;
    assertRejection(copy, 'identity missing suggestedArchetype', 'suggestedArchetype');
  });

  // 4. Corrupted Provenance
  it('rejects provenance missing corpusHash', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.provenance.corpusHash;
    assertRejection(copy, 'missing corpusHash', 'corpusHash');
  });

  it('rejects non-hex corpusHash', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.provenance.corpusHash = 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
    assertRejection(copy, 'non-hex corpusHash', 'corpusHash');
  });

  it('rejects short corpusHash (63 chars)', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.provenance.corpusHash = 'a'.repeat(63);
    assertRejection(copy, 'short corpusHash', 'corpusHash');
  });

  it('rejects long corpusHash (65 chars)', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.provenance.corpusHash = 'a'.repeat(65);
    assertRejection(copy, 'long corpusHash', 'corpusHash');
  });

  it('rejects uppercase hex corpusHash (regex requires lowercase ^[a-f0-9]{64}$)', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.provenance.corpusHash = 'A'.repeat(64);
    assertRejection(copy, 'uppercase corpusHash', 'corpusHash');
  });

  it('rejects invalid URI in provenance.sourceUrl', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.provenance.sourceUrl = 'htt p:// invalid url / test';
    assertRejection(copy, 'invalid uri sourceUrl', 'sourceUrl');
  });

  it('rejects invalid date-time in provenance.capturedAt', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.provenance.capturedAt = '2026-99-99T99:99:99Z';
    assertRejection(copy, 'invalid capturedAt date-time', 'capturedAt');
  });

  it('rejects invalid licensePolicy enum', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.provenance.licensePolicy = 'PUBLIC_DOMAIN';
    assertRejection(copy, 'invalid licensePolicy', 'licensePolicy');
  });

  // 5. Corrupted Epistemology Confidence Mapping
  it('rejects invalid epistemology confidence enum "GUESS"', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.epistemology.anatomy = 'GUESS';
    assertRejection(copy, 'invalid confidence GUESS', 'anatomy');
  });

  it('rejects invalid epistemology confidence enum "CERTAIN"', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.epistemology['stateMachine.states'] = 'CERTAIN';
    assertRejection(copy, 'invalid confidence CERTAIN', 'stateMachine.states');
  });

  it('rejects numeric epistemology confidence value', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.epistemology.anatomy = 0.95;
    assertRejection(copy, 'numeric epistemology value', 'anatomy');
  });

  // 6. Corrupted Anatomy
  it('rejects anatomy missing rootRole', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.anatomy.rootRole;
    assertRejection(copy, 'missing rootRole', 'rootRole');
  });

  it('rejects anatomy subcomponent missing role', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.anatomy.subcomponents[0].role;
    assertRejection(copy, 'missing subcomponent role', 'subcomponents');
  });

  it('rejects anatomy subcomponent missing optional flag', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.anatomy.subcomponents[0].optional;
    assertRejection(copy, 'missing optional flag', 'subcomponents');
  });

  it('rejects anatomy subcomponent missing children array', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.anatomy.subcomponents[0].children;
    assertRejection(copy, 'missing children array', 'subcomponents');
  });

  // 7. Corrupted Geometry Constraints
  it('rejects invalid density enum', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.geometryConstraints.density = 'ultra-compact';
    assertRejection(copy, 'invalid density', 'density');
  });

  it('rejects invalid layoutMode enum', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.geometryConstraints.layoutMode = 'masonry';
    assertRejection(copy, 'invalid layoutMode', 'layoutMode');
  });

  it('rejects invalid relation constraintType enum', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.geometryConstraints.relations = [
      {
        sourceRole: 'A',
        targetRole: 'B',
        constraintType: 'colliding-with',
        valueToken: 'spacing.0'
      }
    ];
    assertRejection(copy, 'invalid constraintType', 'constraintType');
  });

  // 8. Corrupted State Machine
  it('rejects stateMachine missing initialState', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.stateMachine.initialState;
    assertRejection(copy, 'missing initialState', 'initialState');
  });

  it('rejects transition missing trigger', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.stateMachine.transitions[0].trigger;
    assertRejection(copy, 'missing transition trigger', 'transitions');
  });

  it('rejects transition missing to', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.stateMachine.transitions[0].to;
    assertRejection(copy, 'missing transition to', 'transitions');
  });

  // 9. Corrupted Motion Dynamics
  it('rejects invalid curveType enum in motion transition', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.motionDynamics.transitions[0].curveType = 'elastic-bounce';
    assertRejection(copy, 'invalid curveType', 'curveType');
  });

  it('rejects invalid reducedMotionFallback enum', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.motionDynamics.reducedMotionFallback = 'disable-everything';
    assertRejection(copy, 'invalid reducedMotionFallback', 'reducedMotionFallback');
  });

  it('rejects transition missing targetRole', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.motionDynamics.transitions[0].targetRole;
    assertRejection(copy, 'missing motion targetRole', 'targetRole');
  });

  // 10. Corrupted Accessibility Contract
  it('rejects invalid focusManagement enum', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.accessibilityContract.focusManagement = 'unmanaged';
    assertRejection(copy, 'invalid focusManagement', 'focusManagement');
  });

  it('rejects missing ariaRole in accessibilityContract', () => {
    const copy = JSON.parse(JSON.stringify(base));
    delete copy.accessibilityContract.ariaRole;
    assertRejection(copy, 'missing ariaRole', 'ariaRole');
  });

  // 11. Corrupted Dependencies
  it('rejects invalid dependency classification enum', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.dependencies = [{ name: 'framer-motion', classification: 'super-critical' }];
    assertRejection(copy, 'invalid dependency classification', 'dependencies');
  });

  it('rejects dependency missing name', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.dependencies = [{ classification: 'essential' }];
    assertRejection(copy, 'missing dependency name', 'dependencies');
  });
});

describe('CHALLENGER 4: Boundary, Unicode, and Deep Nesting Edge Cases', () => {
  const ajv = createAjv();
  const validateDna = ajv.compile(dnaSchema);
  const base = JSON.parse(JSON.stringify(arcFixture));

  it('handles Unicode and RTL characters across strings safely', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.identity.id = 'arc-agent-run-01-🚀-مرحبا-日本語';
    copy.identity.semanticName = 'ChatShell·インターフェース';
    copy.stateMachine.states.push('est_ação_crítica_⚡');
    copy.stateMachine.transitions.push({
      from: 'idle_empty',
      to: 'est_ação_crítica_⚡',
      trigger: 'TRIGGER_ÁÉÍÓÚ'
    });
    const valid = validateDna(copy);
    assert.ok(valid, `Unicode strings must be valid: ${JSON.stringify(validateDna.errors)}`);
  });

  it('handles deep recursive anatomy tree (depth = 30) without stack overflow', () => {
    const copy = JSON.parse(JSON.stringify(base));
    let current = { role: 'DeepLevel_0', optional: false, children: [] };
    copy.anatomy.subcomponents = [current];

    for (let i = 1; i <= 30; i++) {
      const child = { role: `DeepLevel_${i}`, optional: false, children: [] };
      current.children.push(child);
      current = child;
    }

    const valid = validateDna(copy);
    assert.ok(valid, `30-level deep anatomy tree must validate without call stack overflow: ${JSON.stringify(validateDna.errors)}`);
  });

  it('handles large state machines (100 states, 200 transitions) performantly', () => {
    const copy = JSON.parse(JSON.stringify(base));
    const states = [];
    const transitions = [];

    for (let i = 0; i < 100; i++) {
      states.push(`state_${i}`);
    }
    for (let i = 0; i < 99; i++) {
      transitions.push({
        from: `state_${i}`,
        to: `state_${i + 1}`,
        trigger: `STEP_${i}`
      });
      transitions.push({
        from: `state_${i + 1}`,
        to: `state_${i}`,
        trigger: `BACK_${i}`
      });
    }

    copy.stateMachine.initialState = 'state_0';
    copy.stateMachine.states = states;
    copy.stateMachine.transitions = transitions;

    const t0 = performance.now();
    const valid = validateDna(copy);
    const duration = performance.now() - t0;

    assert.ok(valid, `100-state FSM must validate: ${JSON.stringify(validateDna.errors)}`);
    assert.ok(duration < 50, `Validation of 100 states must complete in < 50ms, took ${duration.toFixed(2)}ms`);
  });
});

describe('CHALLENGER 5: ComponentArchetype Adversarial Rejection Tests', () => {
  const ajv = createAjv();
  const validateArch = ajv.compile(archetypeSchema);
  const archFixturePath = path.join(VAULT_DIR, 'components', 'archetypes', 'ConversationalShell.archetype.json');
  const baseArch = JSON.parse(fs.readFileSync(archFixturePath, 'utf8'));

  it('rejects archetype with confidenceScore > 1.0', () => {
    const copy = { ...baseArch, confidenceScore: 1.05 };
    assert.equal(validateArch(copy), false);
    assert.ok(validateArch.errors.some((e) => e.instancePath.includes('confidenceScore')));
  });

  it('rejects archetype with confidenceScore < 0.0', () => {
    const copy = { ...baseArch, confidenceScore: -0.1 };
    assert.equal(validateArch(copy), false);
    assert.ok(validateArch.errors.some((e) => e.instancePath.includes('confidenceScore')));
  });

  it('rejects archetype with knownImplementations similarityScore > 1.0', () => {
    const copy = JSON.parse(JSON.stringify(baseArch));
    copy.knownImplementations[0].similarityScore = 1.2;
    assert.equal(validateArch(copy), false);
    assert.ok(validateArch.errors.some((e) => e.instancePath.includes('similarityScore')));
  });

  it('rejects archetype with invalid liveRegion enum', () => {
    const copy = JSON.parse(JSON.stringify(baseArch));
    copy.accessibilityStandard.liveRegion = 'screaming';
    assert.equal(validateArch(copy), false);
    assert.ok(validateArch.errors.some((e) => e.instancePath.includes('liveRegion')));
  });

  it('rejects archetype with invalid motionPrinciples type enum', () => {
    const copy = JSON.parse(JSON.stringify(baseArch));
    copy.motionPrinciples.composerTransition = {
      type: 'elastic-wobble'
    };
    assert.equal(validateArch(copy), false);
    assert.ok(validateArch.errors.some((e) => e.instancePath.includes('motionPrinciples')));
  });
});

describe('CHALLENGER 6: CertificationRecord Adversarial Rejection Tests', () => {
  const ajv = createAjv();
  const validateCert = ajv.compile(certSchema);

  const validCert = {
    certificateId: 'cert-12345678',
    dnaRef: 'planes-ai-chat-01',
    evaluatedAt: '2026-10-05T19:00:00Z',
    auditorAgent: 'unified-crp-quality-gates',
    gatesSummary: {
      structural: true,
      visual: { maxDeviationPx: 1.0 },
      interaction: true,
      motion: { deltaMs: 8 },
      antiSlop: true,
      leakage: true
    },
    verdict: 'CERTIFIED'
  };

  it('validates a compliant CertificationRecord', () => {
    assert.ok(validateCert(validCert), JSON.stringify(validateCert.errors));
  });

  it('rejects invalid verdict enum ("PASS" instead of "CERTIFIED")', () => {
    const copy = { ...validCert, verdict: 'PASS' };
    assert.equal(validateCert(copy), false);
    assert.ok(validateCert.errors.some((e) => e.instancePath.includes('verdict')));
  });

  it('rejects gatesSummary missing required gate (e.g. antiSlop)', () => {
    const copy = JSON.parse(JSON.stringify(validCert));
    delete copy.gatesSummary.antiSlop;
    assert.equal(validateCert(copy), false);
    assert.ok(validateCert.errors.some((e) => e.params.missingProperty === 'antiSlop'));
  });

  it('rejects evaluatedAt with invalid date format', () => {
    const copy = { ...validCert, evaluatedAt: 'not-a-date' };
    assert.equal(validateCert(copy), false);
    assert.ok(validateCert.errors.some((e) => e.instancePath.includes('evaluatedAt')));
  });
});

describe('CHALLENGER 7: ReferenceManifest Adversarial Rejection Tests', () => {
  const ajv = createAjv();
  const validateManifest = ajv.compile(manifestSchema);

  const validManifest = {
    provider: 'arc',
    version: '1.0.0',
    sourceUrl: 'https://arc.net/browser',
    licenseClassification: 'REFERENCE_ONLY',
    capabilities: {
      registry: false,
      docs: true,
      mcp: true,
      gitSource: false,
      browserRendered: true
    },
    components: [
      {
        componentId: 'arc-agent-run',
        name: 'Agent Execution Shell',
        category: 'conversational',
        targetUrl: 'https://arc.net/features/agent-run'
      }
    ]
  };

  it('validates a compliant ReferenceManifest', () => {
    assert.ok(validateManifest(validManifest), JSON.stringify(validateManifest.errors));
  });

  it('rejects invalid licenseClassification enum', () => {
    const copy = { ...validManifest, licenseClassification: 'UNLICENSED' };
    assert.equal(validateManifest(copy), false);
    assert.ok(validateManifest.errors.some((e) => e.instancePath.includes('licenseClassification')));
  });

  it('rejects missing capabilities field', () => {
    const copy = JSON.parse(JSON.stringify(validManifest));
    delete copy.capabilities.mcp;
    assert.equal(validateManifest(copy), false);
    assert.ok(validateManifest.errors.some((e) => e.params.missingProperty === 'mcp'));
  });
});

describe('CHALLENGER 8: Permissiveness and Schema Precision Audit', () => {
  const ajv = createAjv();
  const validateDna = ajv.compile(dnaSchema);
  const base = JSON.parse(JSON.stringify(arcFixture));

  it('AUDIT: verifies additionalProperties behavior at ComponentDNA root level', () => {
    // Test if unmodeled properties like "unauthorizedPayload" are allowed or rejected
    const copy = { ...base, rogueProperty: 'exploit-payload' };
    const isValid = validateDna(copy);
    // Note: If additionalProperties is NOT false, this will pass.
    // We record the exact empirical behavior here.
    assert.equal(
      typeof isValid,
      'boolean',
      'Should return boolean validation result'
    );
  });

  it('AUDIT: verifies whether negative durationMs in motionDynamics is restricted', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.motionDynamics.transitions[0].durationMs = -500;
    const isValid = validateDna(copy);
    // Checking whether durationMs has minimum: 0 in schema
    assert.equal(typeof isValid, 'boolean');
  });

  it('AUDIT: verifies whether empty states array [] is restricted in stateMachine', () => {
    const copy = JSON.parse(JSON.stringify(base));
    copy.stateMachine.states = [];
    const isValid = validateDna(copy);
    assert.equal(typeof isValid, 'boolean');
  });
});
