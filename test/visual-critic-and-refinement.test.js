/**
 * test/visual-critic-and-refinement.test.js
 * 
 * Studio DNA PRO v2.6 — Unit Test Suite
 * Feature: Low-Spec Visual Capture Matrix, 7-Dimension Critic Gate & Refinement Controller (TASK-C3)
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const {
  VIEWPORTS,
  CAPTURE_STATES,
  captureVisualMatrix
} = require('../src/qa/visual-capture-matrix.js');

const {
  REQUIRED_DIMENSIONS,
  evaluateVisualCritique
} = require('../src/qa/visual-critic-gate.js');

const {
  MAX_REFINEMENT_ATTEMPTS,
  planRefinement
} = require('../src/orchestration/refinement-controller.js');

// Mock page object for deterministic, zero-RAM unit tests
function createMockPage() {
  const resizeHistory = [];
  const evalHistory = [];

  return {
    resizeHistory,
    evalHistory,
    async setViewportSize(size) {
      resizeHistory.push(size);
    },
    async evaluate(fn) {
      evalHistory.push(fn.toString());
    },
    async screenshot() {
      const stateIndex = evalHistory.length;
      return Buffer.from(`mock_frame_${stateIndex}_${resizeHistory.length}`);
    }
  };
}

function createValidCritique(manifest) {
  const primaryCapture = manifest.captures[0];
  const dimensions = {};

  for (const dim of REQUIRED_DIMENSIONS) {
    dimensions[dim] = {
      score: 5,
      critical: false,
      rationale: `Exemplary adherence to ${dim} specifications with clean compositional harmony`,
      region: { x: 100, y: 150, width: 400, height: 250 },
      screenshotId: primaryCapture.id,
      screenshotHash: primaryCapture.hash
    };
  }

  return {
    schemaVersion: '2.0.0',
    timestamp: new Date().toISOString(),
    overallScore: 5.0,
    approved: true,
    dimensions
  };
}

test('TASK-C3: captureVisualMatrix reuses single page across 4 viewports x 6 states (24 captures)', async () => {
  const mockPage = createMockPage();
  const manifest = await captureVisualMatrix(mockPage, { url: 'http://localhost:4000/test' });

  assert.equal(manifest.totalCaptures, 24, 'Must capture exactly 4 viewports * 6 states = 24 entries');
  assert.equal(manifest.captures.length, 24);
  assert.equal(mockPage.resizeHistory.length, 4, 'Must resize single page 4 times without creating new pages');

  // Verify SHA-256 binding
  for (const cap of manifest.captures) {
    assert.match(cap.hash, /^[a-f0-9]{64}$/, 'Each capture must have valid SHA-256 hash');
  }
});

test('TASK-C3: evaluateVisualCritique approves fully compliant 7-dimension critique', () => {
  const dummyManifest = {
    captures: [
      { id: 'capture_desktop_top', hash: 'a'.repeat(64) }
    ]
  };

  const critique = createValidCritique(dummyManifest);
  const result = evaluateVisualCritique({
    captureManifest: dummyManifest,
    critique
  });

  assert.equal(result.approved, true, 'Fully compliant critique must be approved');
  assert.equal(result.overallScore, 5.0);
  assert.equal(result.violations.length, 0);
  assert.equal(result.criticalFailures.length, 0);
});

test('TASK-C3: evaluateVisualCritique rejects missing dimensions or divergent screenshot hashes', () => {
  const dummyManifest = {
    captures: [
      { id: 'capture_desktop_top', hash: 'a'.repeat(64) }
    ]
  };

  // Critique missing 'movimento' and with tampered hash
  const badCritique = createValidCritique(dummyManifest);
  delete badCritique.dimensions.movimento;
  badCritique.dimensions.tipografia.screenshotHash = 'b'.repeat(64);

  const result = evaluateVisualCritique({
    captureManifest: dummyManifest,
    critique: badCritique
  });

  assert.equal(result.approved, false, 'Must reject critique with missing dimension and altered hash');
  assert.ok(result.violations.some(v => v.toLowerCase().includes("missing mandatory dimension 'movimento'")));
  assert.ok(result.violations.some(v => v.includes('divergent screenshotHash')));
});

test('TASK-C3: evaluateVisualCritique flags critical failure if any dimension has critical: true or score < 3', () => {
  const dummyManifest = {
    captures: [{ id: 'capture_desktop_top', hash: 'a'.repeat(64) }]
  };

  const criticalCritique = createValidCritique(dummyManifest);
  criticalCritique.dimensions.hierarquia.score = 2;
  criticalCritique.dimensions.hierarquia.critical = true;

  const result = evaluateVisualCritique({
    captureManifest: dummyManifest,
    critique: criticalCritique
  });

  assert.equal(result.approved, false);
  assert.ok(result.criticalFailures.length > 0);
});

test('TASK-C3: planRefinement plans up to 3 attempts and strictly halts on attempt 3 with human_review_required', () => {
  const findings = ['APCA contrast score Lc 42 < 60', 'Tipografia overflow at 390px'];

  // Attempt 1 -> Generates refinement task
  const plan1 = planRefinement({ attempt: 1, findings, priorArtifactHash: 'hash123' });
  assert.equal(plan1.action, 'refinement_task');
  assert.equal(plan1.attempt, 2);
  assert.equal(plan1.tasks.length, 2);
  assert.ok(plan1.invalidatedGates.includes('visual-critic'));

  // Attempt 2 -> Generates refinement task
  const plan2 = planRefinement({ attempt: 2, findings, priorArtifactHash: 'hash123' });
  assert.equal(plan2.action, 'refinement_task');
  assert.equal(plan2.attempt, 3);

  // Attempt 3 -> HARD STOP: human_review_required
  const plan3 = planRefinement({ attempt: 3, findings, priorArtifactHash: 'hash123' });
  assert.equal(plan3.action, 'human_review_required', 'Must trigger hard stop after 3 failed attempts');
  assert.equal(plan3.attempt, 3);
  assert.ok(plan3.reason.includes('Automated refinement limit'));
  assert.equal(plan3.unresolvedFindings.length, 2);
});
