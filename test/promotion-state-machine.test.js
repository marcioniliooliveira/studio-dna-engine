'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {
  PromotionStateMachine,
  PromotionError
} = require('../src/orchestration/promotion-state-machine');

const validSha = 'sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef';
const differentSha = 'sha256:fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210';

test('initial state is experimental', () => {
  const fsm = new PromotionStateMachine();
  assert.equal(fsm.getState(), 'experimental');
});

test('promotes experimental to candidate with valid SHA-256', () => {
  const fsm = new PromotionStateMachine();
  fsm.promoteToCandidate({
    artifactSha256: validSha,
    metadata: { clientScope: 'silvio-iwata', runId: 'run-1' }
  });

  assert.equal(fsm.getState(), 'candidate');
  assert.equal(fsm.getArtifactSha256(), validSha);
});

test('validates artifact buffer/string integrity when provided to candidate promotion', () => {
  const fsm = new PromotionStateMachine();
  const content = '<html><body>Studio DNA Test</body></html>';
  const computedSha = 'sha256:' + crypto.createHash('sha256').update(content).digest('hex');

  fsm.promoteToCandidate({
    artifact: content,
    artifactSha256: computedSha
  });

  assert.equal(fsm.getState(), 'candidate');

  const fsmFail = new PromotionStateMachine();
  assert.throws(() => {
    fsmFail.promoteToCandidate({
      artifact: content,
      artifactSha256: validSha // mismatched
    });
  }, (err) => err.code === 'ARTIFACT_SHA256_MISMATCH');
});

test('rejects candidate promotion with invalid sha format', () => {
  const fsm = new PromotionStateMachine();
  assert.throws(() => {
    fsm.promoteToCandidate({ artifactSha256: 'not-a-hash' });
  }, (err) => err.code === 'INVALID_SHA256');
});

test('promotes candidate to verified when technicalReport and visualCritique match SHA and pass gates', () => {
  const fsm = new PromotionStateMachine();
  fsm.promoteToCandidate({ artifactSha256: validSha });

  const technicalReport = {
    artifactSha256: validSha,
    status: 'passed',
    score: 95,
    criticalFailures: []
  };

  const visualCritique = {
    artifactSha256: validSha,
    approved: true,
    overallScore: 4.5,
    criticalFailures: []
  };

  fsm.promoteToVerified({ technicalReport, visualCritique });
  assert.equal(fsm.getState(), 'verified');
});

test('rejects promotion to verified if SHA-256 does not match between reports and candidate', () => {
  const fsm = new PromotionStateMachine();
  fsm.promoteToCandidate({ artifactSha256: validSha });

  // Technical report sha mismatch
  assert.throws(() => {
    fsm.promoteToVerified({
      technicalReport: { artifactSha256: differentSha, status: 'passed' },
      visualCritique: { artifactSha256: validSha, approved: true }
    });
  }, (err) => err.code === 'ARTIFACT_SHA256_MISMATCH');

  // Visual critique sha mismatch
  assert.throws(() => {
    fsm.promoteToVerified({
      technicalReport: { artifactSha256: validSha, status: 'passed' },
      visualCritique: { artifactSha256: differentSha, approved: true }
    });
  }, (err) => err.code === 'ARTIFACT_SHA256_MISMATCH');
});

test('rejects promotion to verified if reports report failure or zero-tolerance violations', () => {
  const fsm = new PromotionStateMachine();
  fsm.promoteToCandidate({ artifactSha256: validSha });

  // Technical report failed
  assert.throws(() => {
    fsm.promoteToVerified({
      technicalReport: { artifactSha256: validSha, status: 'failed', criticalFailures: ['AABB_overlap > 0'] },
      visualCritique: { artifactSha256: validSha, approved: true }
    });
  }, (err) => err.code === 'VERIFICATION_GATE_FAILED');

  // Visual critique not approved
  assert.throws(() => {
    fsm.promoteToVerified({
      technicalReport: { artifactSha256: validSha, status: 'passed', criticalFailures: [] },
      visualCritique: { artifactSha256: validSha, approved: false, criticalFailures: ['Contrast too low'] }
    });
  }, (err) => err.code === 'VERIFICATION_GATE_FAILED');
});

test('promotes verified to production only with valid human approvals (H01, H02, H03) and authorized human role', () => {
  const fsm = new PromotionStateMachine();
  fsm.promoteToCandidate({ artifactSha256: validSha });
  fsm.promoteToVerified({
    technicalReport: { artifactSha256: validSha, status: 'passed', criticalFailures: [] },
    visualCritique: { artifactSha256: validSha, approved: true, criticalFailures: [] }
  });

  const humanApprovals = {
    artifactSha256: validSha,
    approvals: {
      H01: { approved: true, actorId: 'human-art-director', timestamp: new Date().toISOString() },
      H02: { approved: true, actorId: 'human-brand-owner', timestamp: new Date().toISOString() },
      H03: { approved: true, actorId: 'human-art-director', timestamp: new Date().toISOString() }
    }
  };

  // AI agent cannot promote to production
  assert.throws(() => {
    fsm.promoteToProduction({
      humanApprovals,
      actorRole: 'implementation_agent',
      actorId: 'agent-1'
    });
  }, (err) => err.code === 'UNAUTHORIZED_PROMOTION_ROLE');

  // Authorized human role can promote
  fsm.promoteToProduction({
    humanApprovals,
    actorRole: 'human_art_director',
    actorId: 'human-art-director'
  });

  assert.equal(fsm.getState(), 'production');
});

test('rejects promotion to production if any human gate (H01, H02, H03) is missing or unapproved', () => {
  const fsm = new PromotionStateMachine();
  fsm.promoteToCandidate({ artifactSha256: validSha });
  fsm.promoteToVerified({
    technicalReport: { artifactSha256: validSha, status: 'passed', criticalFailures: [] },
    visualCritique: { artifactSha256: validSha, approved: true, criticalFailures: [] }
  });

  // Missing H03
  const missingH03 = {
    artifactSha256: validSha,
    approvals: {
      H01: { approved: true },
      H02: { approved: true }
    }
  };

  assert.throws(() => {
    fsm.promoteToProduction({
      humanApprovals: missingH03,
      actorRole: 'human_brand_owner',
      actorId: 'brand-owner'
    });
  }, (err) => err.code === 'HUMAN_APPROVAL_MISSING');

  // H02 unapproved
  const unapprovedH02 = {
    artifactSha256: validSha,
    approvals: {
      H01: { approved: true },
      H02: { approved: false },
      H03: { approved: true }
    }
  };

  assert.throws(() => {
    fsm.promoteToProduction({
      humanApprovals: unapprovedH02,
      actorRole: 'human_brand_owner',
      actorId: 'brand-owner'
    });
  }, (err) => err.code === 'HUMAN_APPROVAL_MISSING');
});

test('blocks invalid state skipping in FSM', () => {
  const fsm = new PromotionStateMachine();
  assert.equal(fsm.getState(), 'experimental');

  assert.throws(() => {
    fsm.promoteToVerified({ technicalReport: {}, visualCritique: {} });
  }, (err) => err.code === 'INVALID_TRANSITION');

  assert.throws(() => {
    fsm.promoteToProduction({ humanApprovals: {}, actorRole: 'human_art_director' });
  }, (err) => err.code === 'INVALID_TRANSITION');
});
