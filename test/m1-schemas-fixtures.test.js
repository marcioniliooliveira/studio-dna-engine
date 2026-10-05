/**
 * Milestone M1 Verification Test Suite
 * Validates Canonical IR Schemas & Reference Fixtures
 * 
 * Verifies:
 * 1. AJV Draft 2020-12 compilation of all 4 canonical schemas in schemas/ (0 errors, strict mode).
 * 2. Complete validation of all 3 reference fixtures (Planes AI Chat, Arc Agent Run, Beautiful UI Approval Card)
 *    against schemas/component_dna.v1.schema.json.
 * 3. Complete validation of design-vault ConversationalShell against schemas/component_archetype.v1.schema.json.
 * 4. Structural, epistemological, anatomical, and state machine integrity across all fixtures.
 * 5. Strict rejection of non-compliant instances by schemas (negative testing).
 */

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Ajv2020 = require('ajv/dist/2020');
const addFormats = require('ajv-formats');

function createAjvInstance(options = {}) {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: true,
    ...options
  });
  addFormats(ajv);
  return ajv;
}

const ROOT_DIR = path.resolve(__dirname, '..');
const SCHEMAS_DIR = path.join(ROOT_DIR, 'schemas');
const COPIAS_DIR = path.join(ROOT_DIR, 'copias');
const VAULT_DIR = path.join(ROOT_DIR, 'design-vault');

describe('Milestone M1: Canonical IR Schemas Compilation (AJV Draft 2020-12)', () => {
  const ajv = createAjvInstance();

  const schemaFiles = [
    {
      name: 'component_dna.v1.schema.json',
      title: 'ComponentDNA',
      expectedId: 'https://studiodna.engine/schemas/component_dna.v1.json'
    },
    {
      name: 'component_archetype.v1.schema.json',
      title: 'ComponentArchetype',
      expectedId: 'https://studiodna.engine/schemas/component_archetype.v1.json'
    },
    {
      name: 'component_certification.v1.schema.json',
      title: 'CertificationRecord',
      expectedId: 'https://studiodna.engine/schemas/component_certification.v1.json'
    },
    {
      name: 'reference_manifest.v1.schema.json',
      title: 'ReferenceManifest',
      expectedId: 'https://studiodna.engine/schemas/reference_manifest.v1.json'
    }
  ];

  for (const { name, title, expectedId } of schemaFiles) {
    it(`should compile ${name} with strict Draft 2020-12 compliance and 0 errors`, () => {
      const fullPath = path.join(SCHEMAS_DIR, name);
      assert.ok(fs.existsSync(fullPath), `Schema file ${name} must exist`);

      const raw = fs.readFileSync(fullPath, 'utf8');
      const schema = JSON.parse(raw);

      assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
      assert.equal(schema.$id, expectedId);
      assert.equal(schema.title, title);

      let validateFn;
      assert.doesNotThrow(() => {
        validateFn = ajv.compile(schema);
      }, `Schema ${name} must compile cleanly without throwing`);

      assert.equal(typeof validateFn, 'function', `Compiled output for ${name} must be a validation function`);
    });
  }
});

describe('Milestone M1: Canonical Reference Fixtures Validation', () => {
  const ajv = createAjvInstance();
  const dnaSchemaPath = path.join(SCHEMAS_DIR, 'component_dna.v1.schema.json');
  const dnaSchema = JSON.parse(fs.readFileSync(dnaSchemaPath, 'utf8'));
  const validateDna = ajv.compile(dnaSchema);

  describe('Fixture 1: Planes AI Chat (copias/planes/chat/dna.json)', () => {
    const fixturePath = path.join(COPIAS_DIR, 'planes', 'chat', 'dna.json');

    it('should exist and parse as valid JSON', () => {
      assert.ok(fs.existsSync(fixturePath), 'Fixture path must exist');
      const raw = fs.readFileSync(fixturePath, 'utf8');
      assert.doesNotThrow(() => JSON.parse(raw));
    });

    it('should validate 100% against component_dna.v1.schema.json with 0 errors', () => {
      const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
      const isValid = validateDna(fixture);
      assert.ok(isValid, `Planes AI Chat must validate: ${JSON.stringify(validateDna.errors)}`);
      assert.equal(validateDna.errors, null);
    });

    it('should contain required identity, anatomy, stateMachine, and motion parameters', () => {
      const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
      assert.equal(fixture.dnaVersion, '1.0.0');
      assert.equal(fixture.identity.id, 'planes-ai-chat-01');
      assert.equal(fixture.identity.suggestedArchetype, 'ConversationalShell');
      assert.equal(fixture.anatomy.rootRole, 'ChatShell');
      assert.equal(fixture.stateMachine.states.length, 5);
      assert.ok(fixture.stateMachine.states.includes('idle_empty'));
      assert.ok(fixture.stateMachine.states.includes('streaming_response'));

      const transition = fixture.motionDynamics.transitions[0];
      assert.equal(transition.curveType, 'spring');
      assert.ok(transition.curveParams.stiffness > 0);
      assert.ok(transition.curveParams.damping > 0);
      assert.equal(transition.curveParams.mass, 1);
    });
  });

  describe('Fixture 2: Arc Agent Run (copias/arc/agent-run/dna.json)', () => {
    const fixturePath = path.join(COPIAS_DIR, 'arc', 'agent-run', 'dna.json');

    it('should exist and parse as valid JSON', () => {
      assert.ok(fs.existsSync(fixturePath), 'Fixture path must exist');
      const raw = fs.readFileSync(fixturePath, 'utf8');
      assert.doesNotThrow(() => JSON.parse(raw));
    });

    it('should validate 100% against component_dna.v1.schema.json with 0 errors', () => {
      const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
      const isValid = validateDna(fixture);
      assert.ok(isValid, `Arc Agent Run must validate: ${JSON.stringify(validateDna.errors)}`);
      assert.equal(validateDna.errors, null);
    });

    it('should conform to Arc Agent Run requirements (arc-agent-run-01, ConversationalShell, 5 states)', () => {
      const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
      assert.equal(fixture.dnaVersion, '1.0.0');
      assert.equal(fixture.identity.id, 'arc-agent-run-01');
      assert.equal(fixture.identity.semanticName, 'AgentExecutionShell');
      assert.equal(fixture.identity.suggestedArchetype, 'ConversationalShell');

      // Provenance
      assert.equal(fixture.provenance.sourceProvider, 'arc');
      assert.match(fixture.provenance.corpusHash, /^[a-f0-9]{64}$/);
      assert.equal(fixture.provenance.licensePolicy, 'REFERENCE_ONLY');

      // Epistemology
      assert.equal(fixture.epistemology.anatomy, 'OBSERVED');
      assert.equal(fixture.epistemology['stateMachine.states'], 'OBSERVED');
      assert.equal(fixture.epistemology.accessibilityContract, 'DERIVED');
      assert.equal(fixture.epistemologicalConfidence.confidenceLevel, 'OBSERVED');

      // Anatomy
      assert.equal(fixture.anatomy.rootRole, 'ChatShell');
      const subRoles = fixture.anatomy.subcomponents.map((s) => s.role);
      assert.ok(subRoles.includes('MessageStreamViewport'));
      assert.ok(subRoles.includes('ComposerDock'));

      // Relative Geometry Constraints
      assert.ok(Array.isArray(fixture.geometryConstraints.relations));
      assert.ok(fixture.geometryConstraints.relations.length > 0);
      assert.ok(Array.isArray(fixture.relativeGeometryConstraints));

      // State Machine (5 states matching conversational flows)
      assert.equal(fixture.stateMachine.states.length, 5);
      assert.deepEqual(fixture.stateMachine.states, [
        'idle_empty',
        'typing_with_content',
        'submitting',
        'streaming_response',
        'interrupted_error'
      ]);
      assert.equal(fixture.stateMachine.initialState, 'idle_empty');
      assert.ok(fixture.stateMachine.transitions.length >= 4);

      // Motion dynamics
      const springTransition = fixture.motionDynamics.transitions.find((t) => t.curveType === 'spring');
      assert.ok(springTransition, 'Must specify spring motion dynamics');
      assert.equal(springTransition.curveParams.stiffness, 240);
      assert.equal(springTransition.curveParams.damping, 20);
      assert.equal(springTransition.curveParams.mass, 1);
    });
  });

  describe('Fixture 3: Beautiful UI Approval Card (copias/beautiful-ui/approval-card/dna.json)', () => {
    const fixturePath = path.join(COPIAS_DIR, 'beautiful-ui', 'approval-card', 'dna.json');

    it('should exist and parse as valid JSON', () => {
      assert.ok(fs.existsSync(fixturePath), 'Fixture path must exist');
      const raw = fs.readFileSync(fixturePath, 'utf8');
      assert.doesNotThrow(() => JSON.parse(raw));
    });

    it('should validate 100% against component_dna.v1.schema.json with 0 errors', () => {
      const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
      const isValid = validateDna(fixture);
      assert.ok(isValid, `Beautiful UI Approval Card must validate: ${JSON.stringify(validateDna.errors)}`);
      assert.equal(validateDna.errors, null);
    });

    it('should conform to Beautiful UI Approval Card requirements (bui-approval-card-01, ApprovalGate, 4 states)', () => {
      const fixture = JSON.parse(fs.readFileSync(fixturePath, 'utf8'));
      assert.equal(fixture.dnaVersion, '1.0.0');
      assert.equal(fixture.identity.id, 'bui-approval-card-01');
      assert.equal(fixture.identity.semanticName, 'ActionApprovalCard');
      assert.equal(fixture.identity.suggestedArchetype, 'ApprovalGate');

      // Provenance
      assert.equal(fixture.provenance.sourceProvider, 'beautiful-ui');
      assert.match(fixture.provenance.corpusHash, /^[a-f0-9]{64}$/);
      assert.equal(fixture.provenance.licensePolicy, 'REFERENCE_ONLY');

      // Epistemology
      assert.equal(fixture.epistemology.anatomy, 'OBSERVED');
      assert.equal(fixture.epistemology['stateMachine.states'], 'OBSERVED');
      assert.equal(fixture.epistemology.accessibilityContract, 'DERIVED');
      assert.equal(fixture.epistemologicalConfidence.confidenceLevel, 'OBSERVED');

      // Anatomy: Card header, diff viewer, action buttons
      assert.equal(fixture.anatomy.rootRole, 'ApprovalCardRoot');
      const subRoles = fixture.anatomy.subcomponents.map((s) => s.role);
      assert.ok(subRoles.includes('ToolSummaryHeader'), 'Must contain header');
      assert.ok(subRoles.includes('ActionDiffViewer'), 'Must contain diff viewer');
      assert.ok(subRoles.includes('ActionDecisionCluster'), 'Must contain action buttons cluster');

      // State Machine (pending_review, inspecting_diff, approved, rejected)
      assert.deepEqual(fixture.stateMachine.states, [
        'pending_review',
        'inspecting_diff',
        'approved',
        'rejected'
      ]);
      assert.equal(fixture.stateMachine.initialState, 'pending_review');
      assert.ok(fixture.stateMachine.transitions.length >= 4);

      // Motion dynamics
      const springTransition = fixture.motionDynamics.transitions.find((t) => t.curveType === 'spring');
      assert.ok(springTransition, 'Must specify spring motion dynamics');
      assert.equal(springTransition.curveParams.stiffness, 260);
      assert.equal(springTransition.curveParams.damping, 22);
      assert.equal(springTransition.curveParams.mass, 1);

      // Accessibility contract
      assert.equal(fixture.accessibilityContract.ariaRole, 'alertdialog');
      assert.equal(fixture.accessibilityContract.focusManagement, 'trap');
    });
  });
});

describe('Milestone M1: Design Vault Archetype Validation', () => {
  const ajv = createAjvInstance();
  const archSchemaPath = path.join(SCHEMAS_DIR, 'component_archetype.v1.schema.json');
  const archSchema = JSON.parse(fs.readFileSync(archSchemaPath, 'utf8'));
  const validateArch = ajv.compile(archSchema);

  it('should validate design-vault ConversationalShell.archetype.json with 0 errors', () => {
    const archPath = path.join(VAULT_DIR, 'components', 'archetypes', 'ConversationalShell.archetype.json');
    assert.ok(fs.existsSync(archPath), 'ConversationalShell.archetype.json must exist');

    const archetype = JSON.parse(fs.readFileSync(archPath, 'utf8'));
    const isValid = validateArch(archetype);
    assert.ok(isValid, `ConversationalShell archetype must validate: ${JSON.stringify(validateArch.errors)}`);
    assert.equal(validateArch.errors, null);

    assert.equal(archetype.archetypeId, 'ConversationalShell');
    assert.equal(archetype.canonicalAnatomy.rootRole, 'ShellContainer');
    assert.ok(archetype.confidenceScore >= 0.9);
    assert.ok(archetype.knownImplementations.length >= 2);
  });
});

describe('Milestone M1: Epistemological and Schema Enforcement (Negative Tests)', () => {
  const ajv = createAjvInstance();
  const dnaSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'component_dna.v1.schema.json'), 'utf8'));
  const validateDna = ajv.compile(dnaSchema);

  const validSample = JSON.parse(fs.readFileSync(path.join(COPIAS_DIR, 'arc', 'agent-run', 'dna.json'), 'utf8'));

  it('should reject a ComponentDNA instance with invalid dnaVersion', () => {
    const invalid = { ...validSample, dnaVersion: '2.0.0' };
    const isValid = validateDna(invalid);
    assert.equal(isValid, false);
    assert.ok(validateDna.errors.some((e) => e.instancePath.includes('dnaVersion')));
  });

  it('should reject a ComponentDNA instance missing required epistemology', () => {
    const invalid = { ...validSample };
    delete invalid.epistemology;
    const isValid = validateDna(invalid);
    assert.equal(isValid, false);
    assert.ok(validateDna.errors.some((e) => e.params.missingProperty === 'epistemology'));
  });

  it('should reject a ComponentDNA instance with invalid epistemology confidence level', () => {
    const invalid = {
      ...validSample,
      epistemology: {
        ...validSample.epistemology,
        anatomy: 'UNVALIDATED_GUESS' // not in enum [OBSERVED, DERIVED, INFERRED, UNKNOWN]
      }
    };
    const isValid = validateDna(invalid);
    assert.equal(isValid, false);
    assert.ok(validateDna.errors.some((e) => e.instancePath.includes('epistemology')));
  });

  it('should reject a ComponentDNA instance with invalid licensePolicy', () => {
    const invalid = {
      ...validSample,
      provenance: {
        ...validSample.provenance,
        licensePolicy: 'PIRATED_COPY'
      }
    };
    const isValid = validateDna(invalid);
    assert.equal(isValid, false);
    assert.ok(validateDna.errors.some((e) => e.instancePath.includes('licensePolicy')));
  });

  it('should reject a ComponentDNA instance with non-hex corpusHash', () => {
    const invalid = {
      ...validSample,
      provenance: {
        ...validSample.provenance,
        corpusHash: 'not-a-valid-sha256-hash'
      }
    };
    const isValid = validateDna(invalid);
    assert.equal(isValid, false);
    assert.ok(validateDna.errors.some((e) => e.instancePath.includes('corpusHash')));
  });

  it('should reject a ComponentDNA instance with invalid focusManagement', () => {
    const invalid = {
      ...validSample,
      accessibilityContract: {
        ...validSample.accessibilityContract,
        focusManagement: 'uncontrolled' // not in enum [roving-tabindex, trap, natural]
      }
    };
    const isValid = validateDna(invalid);
    assert.equal(isValid, false);
    assert.ok(validateDna.errors.some((e) => e.instancePath.includes('focusManagement')));
  });
});
