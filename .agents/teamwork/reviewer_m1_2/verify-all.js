const Ajv = require('ajv/dist/2020');
const addFormats = require('ajv-formats');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', '..', '..');

const warnings = [];
const ajv = new Ajv({
  allErrors: true,
  strict: true,
  logger: {
    log: console.log,
    warn: (msg) => { warnings.push(msg); console.warn('WARN:', msg); },
    error: console.error
  }
});
addFormats(ajv);

const schemaFiles = [
  'schemas/component_dna.v1.schema.json',
  'schemas/component_archetype.v1.schema.json',
  'schemas/component_certification.v1.schema.json',
  'schemas/reference_manifest.v1.schema.json'
];

console.log('--- 1. AJV DRAFT 2020-12 COMPILATION ---');
const compiledValidators = {};
for (const file of schemaFiles) {
  const fullPath = path.join(ROOT_DIR, file);
  const schema = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  compiledValidators[file] = ajv.compile(schema);
  console.log(`OK: Compiled ${file} ($id: ${schema.$id}, title: ${schema.title})`);
}
console.log(`AJV Warnings count: ${warnings.length}`);

console.log('\n--- 2. CANONICAL FIXTURES VALIDATION ---');
const dnaValidator = compiledValidators['schemas/component_dna.v1.schema.json'];
const fixtures = [
  'copias/planes/chat/dna.json',
  'copias/arc/agent-run/dna.json',
  'copias/beautiful-ui/approval-card/dna.json'
];

for (const fix of fixtures) {
  const fullPath = path.join(ROOT_DIR, fix);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const valid = dnaValidator(data);
  console.log(`Validation of ${fix}: ${valid ? 'PASS' : 'FAIL'}`);
  if (!valid) {
    console.error('Errors:', dnaValidator.errors);
  }
}

console.log('\n--- 3. ARCHETYPE VALIDATION ---');
const archValidator = compiledValidators['schemas/component_archetype.v1.schema.json'];
const archPath = path.join(ROOT_DIR, 'design-vault/components/archetypes/ConversationalShell.archetype.json');
const archData = JSON.parse(fs.readFileSync(archPath, 'utf8'));
const archValid = archValidator(archData);
console.log(`Validation of ConversationalShell.archetype.json: ${archValid ? 'PASS' : 'FAIL'}`);
if (!archValid) {
  console.error('Errors:', archValidator.errors);
}

console.log('\n--- 4. ADVERSARIAL STRESS TESTING ---');
// Test 4.1: Corrupted epistemology
const arcData = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, 'copias/arc/agent-run/dna.json'), 'utf8'));
const corruptedEpistemology = { ...arcData, epistemology: { ...arcData.epistemology, rogueKey: 'FABRICATED' } };
const validEpist = dnaValidator(corruptedEpistemology);
console.log(`Corrupted epistemology rejection (expect false): ${validEpist === false ? 'PASS (rejected)' : 'FAIL (allowed)'}`);

// Test 4.2: Malformed corpusHash
const corruptedHash = { ...arcData, provenance: { ...arcData.provenance, corpusHash: '123' } };
const validHash = dnaValidator(corruptedHash);
console.log(`Malformed SHA-256 hash rejection (expect false): ${validHash === false ? 'PASS (rejected)' : 'FAIL (allowed)'}`);

// Test 4.3: Missing required subcomponents in anatomy
const brokenAnatomy = { ...arcData, anatomy: { rootRole: 'ChatShell' } };
const validAnat = dnaValidator(brokenAnatomy);
console.log(`Missing subcomponents rejection (expect false): ${validAnat === false ? 'PASS (rejected)' : 'FAIL (allowed)'}`);

// Test 4.4: Additional properties at root of ComponentDNA
const injectedPayload = { ...arcData, rogueRootField: 'backdoor' };
const validInjected = dnaValidator(injectedPayload);
console.log(`Injected root field validation result: ${validInjected} (schema additionalProperties is ${validInjected ? 'permissive' : 'strict'})`);

// Test 4.5: Negative duration in motion dynamics
const negDuration = JSON.parse(JSON.stringify(arcData));
negDuration.motionDynamics.transitions[0].durationMs = -100;
const validNegDuration = dnaValidator(negDuration);
console.log(`Negative durationMs validation result: ${validNegDuration} (minimum: 0 constraint check)`);

console.log('\nVerification run complete.');
