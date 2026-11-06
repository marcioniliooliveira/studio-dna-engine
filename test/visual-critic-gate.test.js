/**
 * test/visual-critic-gate.test.js
 *
 * Studio DNA Engine v3.0 — Level 3 Pareto Visual Oracle Quality Gate (TASK-V3-07)
 * Tests:
 * 1. shouldInvokeVisualCritic (fatal deterministic blocks and score < 90 gating)
 * 2. evaluateParetoVisualGate auditor segregation (POLICY_SELF_CERTIFICATION_FORBIDDEN)
 * 3. 70/30 Pareto weighting calculation (0.70 * S_det + 0.30 * S_vis)
 * 4. Strict gate criteria: rejection on score < 3, average < 4.0, critical findings, or finalScore < 88.0
 * 5. Successful approval when all criteria are met
 * 6. Transparent alias mapping for legacy Portuguese dimension names
 */

'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  REQUIRED_DIMENSIONS,
  shouldInvokeVisualCritic,
  evaluateParetoVisualGate
} = require('../src/qa/visual-critic-gate.js');

test('TASK-V3-07: REQUIRED_DIMENSIONS contains all 7 canonical dimensions', () => {
  const expected = [
    'hierarchyAndFocus',
    'layoutAndComposition',
    'typographyAndReadability',
    'colorAndContrast',
    'assetAnd3DCohesion',
    'contextualOriginality',
    'motionAndInteractionClarity'
  ];

  assert.equal(REQUIRED_DIMENSIONS.length, 7);
  for (const dim of expected) {
    assert.ok(REQUIRED_DIMENSIONS.includes(dim), `Must include canonical dimension "${dim}"`);
  }
});

test('TASK-V3-07: shouldInvokeVisualCritic rejects missing report, zeroToleranceFailed or score < 90', () => {
  // Missing or null report
  assert.equal(shouldInvokeVisualCritic(null).eligible, false);
  assert.equal(shouldInvokeVisualCritic(undefined).eligible, false);
  assert.equal(shouldInvokeVisualCritic('invalid').eligible, false);

  // Fatal zero tolerance failure (AABB overlap, bleed, console errors, P0)
  const fatalReport = {
    deterministicScore: 98,
    zeroToleranceFailed: true,
    findings: [{ ruleId: 'aabb-overlap', severity: 'critical' }]
  };
  const fatalResult = shouldInvokeVisualCritic(fatalReport);
  assert.equal(fatalResult.eligible, false);
  assert.match(fatalResult.reason, /Bloqueio Fatal Determinístico/i);

  // Score < 90 (Pareto token economy: don't spend vision tokens on flawed builds)
  const lowScoreReport = {
    deterministicScore: 88,
    zeroToleranceFailed: false
  };
  const lowResult = shouldInvokeVisualCritic(lowScoreReport);
  assert.equal(lowResult.eligible, false);
  assert.match(lowResult.reason, /Score determinístico insuficiente \(88\/100 < 90\)/i);

  // Eligible when deterministic score >= 90 and zeroToleranceFailed is false
  const eligibleReport = {
    deterministicScore: 92,
    zeroToleranceFailed: false
  };
  const eligibleResult = shouldInvokeVisualCritic(eligibleReport);
  assert.equal(eligibleResult.eligible, true);
});

test('TASK-V3-07: evaluateParetoVisualGate enforces auditor segregation (POLICY_SELF_CERTIFICATION_FORBIDDEN)', () => {
  const technicalReport = { deterministicScore: 95, zeroToleranceFailed: false };
  const visualCritique = {
    dimensionScores: {
      hierarchyAndFocus: 5,
      layoutAndComposition: 5,
      typographyAndReadability: 5,
      colorAndContrast: 5,
      assetAnd3DCohesion: 5,
      contextualOriginality: 5,
      motionAndInteractionClarity: 5
    }
  };

  // Missing criticActorId
  assert.throws(
    () => evaluateParetoVisualGate({
      technicalReport,
      visualCritique,
      builderActorId: 'agent-builder-01',
      criticActorId: null
    }),
    /POLICY_SELF_CERTIFICATION_FORBIDDEN/
  );

  // criticActorId same as builderActorId (self-certification forbidden)
  assert.throws(
    () => evaluateParetoVisualGate({
      technicalReport,
      visualCritique,
      builderActorId: 'agent-ui-builder',
      criticActorId: 'agent-ui-builder'
    }),
    /POLICY_SELF_CERTIFICATION_FORBIDDEN/
  );
});

test('TASK-V3-07: evaluateParetoVisualGate fails fast with finalParetoScore = 0 if technicalReport is ineligible', () => {
  const technicalReport = {
    deterministicScore: 85,
    zeroToleranceFailed: false,
    findings: [{ ruleId: 'gestalt-proximity-fail' }]
  };
  const visualCritique = {
    dimensionScores: {
      hierarchyAndFocus: 5,
      layoutAndComposition: 5,
      typographyAndReadability: 5,
      colorAndContrast: 5,
      assetAnd3DCohesion: 5,
      contextualOriginality: 5,
      motionAndInteractionClarity: 5
    }
  };

  const result = evaluateParetoVisualGate({
    technicalReport,
    visualCritique,
    builderActorId: 'agent-ui-builder',
    criticActorId: 'agent-visual-critic'
  });

  assert.equal(result.passed, false);
  assert.equal(result.finalParetoScore, 0);
  assert.equal(result.visualScoreNormalized, 0);
  assert.equal(result.deterministicScore, 85);
  assert.match(result.blockingReason, /Score determinístico insuficiente/i);
});

test('TASK-V3-07: evaluateParetoVisualGate calculates exact 70/30 weighting and passes when score >= 88.0', () => {
  const technicalReport = {
    deterministicScore: 94,
    zeroToleranceFailed: false,
    regionCropPairs: [
      { id: 'crop-hero-cta', actual: 'crop1.png', expected: 'crop2.png' },
      { id: 'crop-nav-blur', actual: 'crop3.png', expected: 'crop4.png' }
    ]
  };

  // All 5s -> average = 5.0 -> visualScoreNormalized = 100
  // finalParetoScore = 0.70 * 94 + 0.30 * 100 = 65.8 + 30.0 = 95.80
  const visualCritique = {
    dimensionScores: {
      hierarchyAndFocus: 5,
      layoutAndComposition: 5,
      typographyAndReadability: 5,
      colorAndContrast: 5,
      assetAnd3DCohesion: 5,
      contextualOriginality: 5,
      motionAndInteractionClarity: 5
    },
    findings: []
  };

  const result = evaluateParetoVisualGate({
    technicalReport,
    visualCritique,
    builderActorId: 'agent-ui-builder',
    criticActorId: 'agent-visual-critic'
  });

  assert.equal(result.passed, true);
  assert.equal(result.deterministicScore, 94);
  assert.equal(result.averageDimensionScore, 5.0);
  assert.equal(result.visualScoreNormalized, 100);
  assert.equal(result.finalParetoScore, 95.8);
  assert.equal(result.regionCropsAudited, 2);
  assert.equal(result.criticalFindingsCount, 0);
  assert.equal(result.lowDimensions.length, 0);
});

test('TASK-V3-07: evaluateParetoVisualGate rejects if any dimension < 3, average < 4.0, or critical finding exists', () => {
  const technicalReport = {
    deterministicScore: 96,
    zeroToleranceFailed: false
  };

  // 1. Rejection due to dimension score < 3
  const lowDimCritique = {
    dimensionScores: {
      hierarchyAndFocus: 2, // < 3
      layoutAndComposition: 5,
      typographyAndReadability: 5,
      colorAndContrast: 5,
      assetAnd3DCohesion: 5,
      contextualOriginality: 5,
      motionAndInteractionClarity: 5
    }
  };
  const lowDimResult = evaluateParetoVisualGate({
    technicalReport,
    visualCritique: lowDimCritique,
    builderActorId: 'builder',
    criticActorId: 'critic'
  });
  assert.equal(lowDimResult.passed, false, 'Must fail when a dimension is < 3');
  assert.ok(lowDimResult.lowDimensions.some(d => d.includes('hierarchyAndFocus=2')));

  // 2. Rejection due to average score < 4.0
  const lowAvgCritique = {
    dimensionScores: {
      hierarchyAndFocus: 3,
      layoutAndComposition: 3,
      typographyAndReadability: 4,
      colorAndContrast: 4,
      assetAnd3DCohesion: 3,
      contextualOriginality: 3,
      motionAndInteractionClarity: 4
    }
  };
  // sum = 24 / 7 = 3.43 (< 4.0)
  const lowAvgResult = evaluateParetoVisualGate({
    technicalReport,
    visualCritique: lowAvgCritique,
    builderActorId: 'builder',
    criticActorId: 'critic'
  });
  assert.equal(lowAvgResult.passed, false, 'Must fail when averageDimensionScore < 4.0');
  assert.ok(lowAvgResult.averageDimensionScore < 4.0);

  // 3. Rejection due to critical finding
  const critFindingCritique = {
    dimensionScores: {
      hierarchyAndFocus: 5,
      layoutAndComposition: 4,
      typographyAndReadability: 4,
      colorAndContrast: 4,
      assetAnd3DCohesion: 4,
      contextualOriginality: 4,
      motionAndInteractionClarity: 4
    },
    findings: [
      { id: 'f1', severity: 'critical', rationale: 'Severe chromatic aberration on main brand logo' }
    ]
  };
  const critResult = evaluateParetoVisualGate({
    technicalReport,
    visualCritique: critFindingCritique,
    builderActorId: 'builder',
    criticActorId: 'critic'
  });
  assert.equal(critResult.passed, false, 'Must fail when critical findings exist');
  assert.equal(critResult.criticalFindingsCount, 1);

  // 4. Rejection due to finalParetoScore < 88.0 even if other checks pass
  // detScore = 90, visual average = 4.0 -> visualScoreNormalized = 80
  // final = 0.70 * 90 + 0.30 * 80 = 63.0 + 24.0 = 87.0 (< 88.0)
  const borderReport = { deterministicScore: 90, zeroToleranceFailed: false };
  const borderCritique = {
    dimensionScores: {
      hierarchyAndFocus: 4,
      layoutAndComposition: 4,
      typographyAndReadability: 4,
      colorAndContrast: 4,
      assetAnd3DCohesion: 4,
      contextualOriginality: 4,
      motionAndInteractionClarity: 4
    }
  };
  const borderResult = evaluateParetoVisualGate({
    technicalReport: borderReport,
    visualCritique: borderCritique,
    builderActorId: 'builder',
    criticActorId: 'critic'
  });
  assert.equal(borderResult.finalParetoScore, 87.0);
  assert.equal(borderResult.passed, false, 'Must fail when finalParetoScore is 87.0 (< 88.0)');
});

test('TASK-V3-07: evaluateParetoVisualGate supports transparent alias mapping from legacy Portuguese dimensions', () => {
  const technicalReport = {
    deterministicScore: 95,
    zeroToleranceFailed: false
  };

  const legacyPortugueseCritique = {
    dimensionScores: {
      hierarquia: 5,
      composicao: 5,
      tipografia: 4,
      cor: 5,
      assets: 4,
      originalidade_contextual: 4,
      movimento: 5
    }
  };

  const result = evaluateParetoVisualGate({
    technicalReport,
    visualCritique: legacyPortugueseCritique,
    builderActorId: 'builder-actor',
    criticActorId: 'critic-actor'
  });

  // sum = 32 / 7 = 4.57 -> normalized = (4.5714 / 5) * 100 = 91.43
  // final = 0.70 * 95 + 0.30 * 91.43 = 66.5 + 27.43 = 93.93 >= 88.0
  assert.equal(result.passed, true);
  assert.equal(result.lowDimensions.length, 0);
  assert.ok(result.finalParetoScore >= 88.0);
});

test('TASK-V3-07: schemas/visual-critique.schema.json defines canonical 7 dimensions, findings, and region crops', () => {
  const fs = require('node:fs');
  const path = require('node:path');

  const schemaPath = path.resolve(__dirname, '../schemas/visual-critique.schema.json');
  assert.ok(fs.existsSync(schemaPath), 'Schema file must exist');

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  assert.equal(schema.$schema, 'https://json-schema.org/draft/2020-12/schema');
  assert.ok(schema.required.includes('dimensionScores'));
  assert.ok(schema.required.includes('rationale'));

  const dimScoresRequired = schema.properties.dimensionScores.required;
  for (const dim of REQUIRED_DIMENSIONS) {
    assert.ok(dimScoresRequired.includes(dim), `Schema must require dimension "${dim}"`);
  }

  assert.ok(schema.properties.findings, 'Must define findings property');
  assert.ok(schema.properties.regionCropPairs, 'Must define regionCropPairs property');
  assert.ok(schema.properties.rationale, 'Must define rationale property');
});

