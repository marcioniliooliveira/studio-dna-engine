const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const {
  MutationResolver,
  computeLocalityScore,
  validateMutationBudget
} = require('../src/pipeline/resolver.js');
const { TransactionManager } = require('../src/pipeline/transaction-manager.js');

const OPXY_DNA_PATH = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'dna-ir.json');
const getFreshDna = () => JSON.parse(fs.readFileSync(OPXY_DNA_PATH, 'utf8'));

test('Mutation Budget: enforces limits on changed parameters and touched sections', () => {
  const budget = {
    maxChangedParams: 3,
    maxSectionsTouched: 1
  };

  // Valid proposal (2 params, 1 section)
  const validProposal = [
    { paramId: 'hero.surface.ambientDarkness', targetValue: '#121314', section: 'hero' },
    { paramId: 'hero.surface.backdrop.toneGradient', targetValue: { toneRange: [0.02, 0.4] }, section: 'hero' }
  ];
  const validCheck = validateMutationBudget(validProposal, budget);
  assert.equal(validCheck.valid, true);

  // Exceeds maxChangedParams (4 params > max 3)
  const tooManyParams = [
    { paramId: 'p1', section: 'hero' },
    { paramId: 'p2', section: 'hero' },
    { paramId: 'p3', section: 'hero' },
    { paramId: 'p4', section: 'hero' }
  ];
  const paramCheck = validateMutationBudget(tooManyParams, budget);
  assert.equal(paramCheck.valid, false);
  assert.equal(paramCheck.code, 'BUDGET_EXCEEDED');
  assert.match(paramCheck.reason, /maxChangedParams/i);

  // Exceeds maxSectionsTouched (2 sections > max 1)
  const multiSection = [
    { paramId: 'hero.surface.ambientDarkness', section: 'hero' },
    { paramId: 'strip.copy.headline', section: 'strip' }
  ];
  const sectionCheck = validateMutationBudget(multiSection, budget);
  assert.equal(sectionCheck.valid, false);
  assert.equal(sectionCheck.code, 'BUDGET_EXCEEDED');
  assert.match(sectionCheck.reason, /maxSectionsTouched/i);
});

test('Edit Locality Score: computes blast radius metric and flags diffuse edits', () => {
  const totalNodes = 10;
  
  // Local edit affecting only 2 nodes (80% locality score)
  const localScore = computeLocalityScore(2, totalNodes);
  assert.equal(localScore.score, 0.80);
  assert.equal(localScore.isLocal, true);

  // Diffuse edit affecting 6 nodes (40% locality score -> fails >= 0.70 threshold)
  const diffuseScore = computeLocalityScore(6, totalNodes);
  assert.equal(diffuseScore.score, 0.40);
  assert.equal(diffuseScore.isLocal, false);
});

test('TransactionManager: executes valid mutation transaction and records cryptographic audit trail', () => {
  const tm = new TransactionManager(getFreshDna());
  const initialHash = tm.getLatestStateHash();
  assert.ok(initialHash && initialHash.length === 64, 'Initial hash must be valid SHA-256');

  const mutationPayload = {
    targetSection: 'hero',
    deltas: [
      {
        paramId: 'hero.surface.ambientDarkness',
        value: '#151617'
      }
    ]
  };

  const receipt = tm.commitTransaction(mutationPayload);
  assert.equal(receipt.status, 'committed');
  assert.ok(receipt.transactionId, 'Must generate transaction ID');
  assert.equal(receipt.parentHash, initialHash, 'Parent hash must match previous state hash');
  assert.notEqual(receipt.currentHash, initialHash, 'Current hash must differ after mutation');

  // Verify state updated
  const currentState = tm.getState();
  const updatedParam = currentState.parameters.find(p => p.id === 'hero.surface.ambientDarkness');
  assert.equal(updatedParam.value, '#151617');
});

test('TransactionManager: rolls back automatically when a constraint gate fails', () => {
  const tm = new TransactionManager(getFreshDna());
  const initialHash = tm.getLatestStateHash();

  // Pure white glare background on black anodized hardware violates C2 contrast constraint
  const invalidGlareMutation = {
    targetSection: 'hero',
    deltas: [
      {
        paramId: 'hero.surface.ambientDarkness',
        value: '#ffffff'
      }
    ]
  };

  const receipt = tm.commitTransaction(invalidGlareMutation);
  assert.equal(receipt.status, 'rolled_back');
  assert.ok(receipt.error, 'Must provide error diagnostics');
  assert.match(receipt.error, /contrast/i);

  // State must remain completely unchanged (atomic rollback)
  assert.equal(tm.getLatestStateHash(), initialHash, 'State hash must remain identical after rollback');
  const currentState = tm.getState();
  const param = currentState.parameters.find(p => p.id === 'hero.surface.ambientDarkness');
  assert.equal(param.value, '#0c0d0e', 'Parameter value must be untouched');
});

test('TransactionManager: rolls back automatically when an invariant is violated', () => {
  const tm = new TransactionManager(getFreshDna());
  const initialHash = tm.getLatestStateHash();

  // Attempting to modify an invariant/locked parameter or property
  const invariantMutation = {
    targetSection: 'hero',
    deltas: [
      {
        paramId: 'hero.copy.brand',
        value: 'Arbitrary Cheap Clone Name'
      }
    ],
    invariants: ['hero.copy.brand must never be altered']
  };

  const receipt = tm.commitTransaction(invariantMutation);
  assert.equal(receipt.status, 'rolled_back');
  assert.match(receipt.error, /invariant/i);
  assert.equal(tm.getLatestStateHash(), initialHash);
});
