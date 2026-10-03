/**
 * test/kinetic-telemetry-extractor.test.js
 * 
 * Test suite for KineticTelemetryExtractor and TypeSafeJury
 * Proves empirically the deterministic telemetry extraction and decision schema.
 */

'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const { KineticTelemetryExtractor } = require('../src/qa/kinetic-telemetry-extractor');
const {
  EffortMetric,
  MotionQuality,
  validateLayoutDecision,
  evaluateWithJury
} = require('../src/evaluators/typesafe-jury');

const fixturesRoot = path.resolve(__dirname, 'fixtures/deep-scrutiny-negatives');

test('TypeSafe Jury: validateLayoutDecision strictly validates schema boundaries', () => {
  const validDecision = {
    architectural_effort: 'HIGH_COMPLEXITY',
    kinetic_flow: 'PERFECT',
    taste_rating: 92,
    should_mutate_parameters: false,
    is_production_ready: true
  };
  assert.equal(validateLayoutDecision(validDecision), true);

  // Out of bounds taste_rating
  assert.throws(() => {
    validateLayoutDecision({ ...validDecision, taste_rating: 150 });
  }, /taste_rating must be a number between 0 and 100/);

  // Invalid enum value
  assert.throws(() => {
    validateLayoutDecision({ ...validDecision, architectural_effort: 'SUPER_COMPLEX' });
  }, /Invalid architectural_effort/);

  // Inconsistent production ready flag
  assert.throws(() => {
    validateLayoutDecision({
      architectural_effort: 'STRUCTURALLY_FLAWED',
      kinetic_flow: 'OVERLAPPING',
      taste_rating: 40,
      should_mutate_parameters: false,
      is_production_ready: true
    });
  }, /Inconsistency: is_production_ready requires/);
});

test('Kinetic Telemetry: detects structural flaw and AABB text collisions on negative fixture', async () => {
  const siteDir = path.join(fixturesRoot, 'negative-aabb-overlap');

  const result = await KineticTelemetryExtractor.captureTelemetry({
    siteDir,
    viewports: [{ name: 'desktop', width: 1440, height: 900 }],
    scrollRange: { start: 0, end: 500, step: 100 },
    selectors: {
      a: '.nav-link-text.is-default',
      b: '.nav-link-text.is-absolute'
    },
    headless: true
  });

  assert.ok(result.timelines.desktop.length > 0, 'Must capture desktop frames');
  assert.ok(result.summary.maxOverlapArea > 20, 'Must calculate overlap area > 20px²');
  assert.equal(result.decision.kinetic_flow, 'OVERLAPPING', 'Must flag OVERLAPPING kinetic flow');
  assert.equal(result.decision.architectural_effort, 'STRUCTURALLY_FLAWED', 'Must flag STRUCTURALLY_FLAWED effort');
  assert.equal(result.decision.is_production_ready, false, 'Must not be production ready');

  // Verify through TypeSafe Jury
  const juryVerdict = evaluateWithJury(result);
  assert.equal(juryVerdict.architectural_effort, 'STRUCTURALLY_FLAWED');
  assert.equal(juryVerdict.is_production_ready, false);
});

test('Kinetic Telemetry: validates compliant 3D front/back pair and rates as production ready', async () => {
  const siteDir = path.join(fixturesRoot, 'allowed-3d-front-back-overlap');

  const result = await KineticTelemetryExtractor.captureTelemetry({
    siteDir,
    viewports: [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'mobile', width: 390, height: 844 }
    ],
    scrollRange: { start: 0, end: 400, step: 100 },
    selectors: {
      a: '.front',
      b: '.back'
    },
    headless: true
  });

  assert.ok(result.timelines.desktop.length > 0, 'Must capture desktop timeline');
  assert.ok(result.timelines.mobile.length > 0, 'Must capture mobile timeline');
  assert.equal(result.summary.overlappingFramesCount, 0, 'Compliant 3D elements should not cause collisions');
  assert.equal(result.decision.kinetic_flow, 'PERFECT', 'Kinetic flow must be PERFECT');
  assert.equal(result.decision.architectural_effort, 'HIGH_COMPLEXITY', 'Effort must be HIGH_COMPLEXITY');
  assert.ok(result.decision.taste_rating >= 85, 'Taste rating must be >= 85');
  assert.equal(result.decision.is_production_ready, true, 'Must be production ready');

  const juryVerdict = evaluateWithJury(result);
  assert.equal(juryVerdict.is_production_ready, true);
  assert.equal(juryVerdict.kinetic_flow, 'PERFECT');
});

test('Kinetic Telemetry: evaluates live client production site across desktop and mobile', async () => {
  const siteDir = path.resolve(__dirname, '../clientes/piloto-elyse-luxe/site');

  const result = await KineticTelemetryExtractor.captureTelemetry({
    siteDir,
    viewports: [
      { name: 'desktop', width: 1440, height: 900 },
      { name: 'mobile', width: 390, height: 844 }
    ],
    scrollRange: { start: 0, end: 500, step: 100 },
    selectors: {
      a: '[data-hero="title"]',
      b: '[data-hero="subtitle"]'
    },
    headless: true
  });

  assert.ok(result.timelines.desktop.length > 0, 'Must capture desktop timeline');
  assert.ok(result.timelines.mobile.length > 0, 'Must capture mobile timeline');
  assert.equal(result.summary.overlappingFramesCount, 0, 'Hero elements must not collide');
  assert.equal(result.decision.kinetic_flow, 'PERFECT', 'Kinetic flow must be PERFECT');
  assert.equal(result.decision.architectural_effort, 'HIGH_COMPLEXITY', 'Effort should be HIGH_COMPLEXITY');
  assert.ok(result.decision.taste_rating >= 85, 'Taste rating should be >= 85');
  assert.equal(result.decision.is_production_ready, true, 'Live production site hero must be production ready');

  const juryVerdict = evaluateWithJury(result);
  assert.equal(juryVerdict.is_production_ready, true);
  assert.equal(juryVerdict.kinetic_flow, 'PERFECT');
});
