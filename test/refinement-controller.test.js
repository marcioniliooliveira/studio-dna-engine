/**
 * test/refinement-controller.test.js
 *
 * Studio DNA Engine v3.0 — Bounded Visual Refinement Controller (TASK-V3-07)
 * Tests:
 * 1. Structured surgical patch plan creation containing { dataDs, line, selector, viewport, measuredDelta, nearestTokenSuggestion }
 * 2. Strict 3-attempt bounded refinement cycle (attempt <= 3)
 * 3. Immediate hard-stop with human_review_required on attempt 3 completion or attempt > 3
 * 4. Invalidation of prior QA gate certificates on new refinement actions
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  MAX_REFINEMENT_ATTEMPTS,
  planRefinement,
  generatePatchPlan
} = require('../src/orchestration/refinement-controller.js');

test('TASK-V3-07: MAX_REFINEMENT_ATTEMPTS is strictly 3', () => {
  assert.equal(MAX_REFINEMENT_ATTEMPTS, 3, 'Refinement controller must cap automated attempts at exactly 3');
});

test('TASK-V3-07: generatePatchPlan formats surgical patch entries with dataDs, line, selector, viewport, measuredDelta, nearestTokenSuggestion', () => {
  // Case 1: Structured finding objects
  const structuredFindings = [
    {
      dataDs: '8f3a19c2',
      line: 42,
      selector: "[data-ds='8f3a19c2'] .hero-title",
      viewport: '1440x900',
      measuredDelta: -24.0,
      nearestTokenSuggestion: '--font-size-hero'
    },
    {
      dataDs: 'c1d2e3f4',
      line: 88,
      selector: "[data-ds='c1d2e3f4'] .cta-button",
      viewport: '390x844',
      measuredDelta: { property: 'padding', deltaPx: 6.0 },
      nearestTokenSuggestion: 'p-4'
    }
  ];

  const plan = generatePatchPlan(structuredFindings);
  assert.ok(plan && typeof plan === 'object');
  assert.ok(Array.isArray(plan.patches), 'Must return patches array');
  assert.equal(plan.patches.length, 2);

  const firstPatch = plan.patches[0];
  assert.equal(firstPatch.dataDs, '8f3a19c2');
  assert.equal(firstPatch.line, 42);
  assert.equal(firstPatch.selector, "[data-ds='8f3a19c2'] .hero-title");
  assert.equal(firstPatch.viewport, '1440x900');
  assert.equal(firstPatch.measuredDelta, -24.0);
  assert.equal(firstPatch.nearestTokenSuggestion, '--font-size-hero');

  // Case 2: String findings parsed into surgical structure
  const stringFindings = [
    "Linha 42 ([data-ds='8f3a19c2'] .hero-title): Spec esperava font-size=72px, DOM computou 48px (Delta=-24.0px).",
    "APCA contrast score Lc 42 < 60 at viewport 390x844"
  ];

  const parsedPlan = generatePatchPlan(stringFindings);
  assert.equal(parsedPlan.patches.length, 2);

  const parsedFirst = parsedPlan.patches[0];
  assert.equal(parsedFirst.dataDs, '8f3a19c2');
  assert.equal(parsedFirst.line, 42);
  assert.ok(parsedFirst.selector.includes('.hero-title'));
  assert.equal(parsedFirst.measuredDelta, -24.0);
  assert.ok(parsedFirst.nearestTokenSuggestion.length > 0);

  const parsedSecond = parsedPlan.patches[1];
  assert.equal(parsedSecond.viewport, '390x844');
  assert.ok(parsedSecond.nearestTokenSuggestion.includes('contrast') || parsedSecond.nearestTokenSuggestion.includes('APCA') || parsedSecond.nearestTokenSuggestion.length > 0);
});

test('TASK-V3-07: planRefinement includes surgical patch plan in task and invalidates prior certificates', () => {
  const findings = [
    {
      dataDs: '8f3a19c2',
      line: 42,
      selector: "[data-ds='8f3a19c2'] .hero-title",
      viewport: '1440x900',
      measuredDelta: -24.0,
      nearestTokenSuggestion: '--font-size-hero'
    }
  ];

  const result = planRefinement({ attempt: 1, findings, priorArtifactHash: 'hash-abc-123' });
  assert.equal(result.action, 'refinement_task');
  assert.equal(result.attempt, 2);
  assert.equal(result.maxAttempts, 3);
  assert.ok(Array.isArray(result.invalidatedGates));
  assert.ok(result.invalidatedGates.includes('visual-critic'));
  assert.ok(result.invalidatedGates.includes('visual-regression'));

  // Must include surgical patch plan
  assert.ok(result.patchPlan, 'Must generate patchPlan inside refinement task');
  assert.equal(result.patchPlan.patches.length, 1);
  assert.equal(result.patchPlan.patches[0].dataDs, '8f3a19c2');
  assert.equal(result.patchPlan.patches[0].line, 42);
});

test('TASK-V3-07: planRefinement enforces 3-attempt bound and halts with human_review_required on attempt 3 or greater', () => {
  const findings = ['APCA contrast score Lc 42 < 60', 'Tipografia overflow at 390px'];

  // Attempt 1 -> Generates refinement task for attempt 2
  const plan1 = planRefinement({ attempt: 1, findings, priorArtifactHash: 'sha-001' });
  assert.equal(plan1.action, 'refinement_task');
  assert.equal(plan1.attempt, 2);

  // Attempt 2 -> Generates refinement task for attempt 3
  const plan2 = planRefinement({ attempt: 2, findings, priorArtifactHash: 'sha-002' });
  assert.equal(plan2.action, 'refinement_task');
  assert.equal(plan2.attempt, 3);

  // Attempt 3 -> HARD STOP: automated attempts exhausted, must escalate to human
  const plan3 = planRefinement({ attempt: 3, findings, priorArtifactHash: 'sha-003' });
  assert.equal(plan3.action, 'human_review_required');
  assert.equal(plan3.attempt, 3);
  assert.match(plan3.reason, /Automated refinement limit \(3 attempts\) reached/i);
  assert.equal(plan3.unresolvedFindings.length, 2);

  // Attempt > 3 (e.g. 4) -> Guaranteed hard block
  const plan4 = planRefinement({ attempt: 4, findings, priorArtifactHash: 'sha-004' });
  assert.equal(plan4.action, 'human_review_required');
  assert.equal(plan4.attempt, 4);
});
