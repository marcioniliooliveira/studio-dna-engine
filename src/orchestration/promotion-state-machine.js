'use strict';

const crypto = require('node:crypto');

class PromotionError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'PromotionError';
    this.code = code;
  }
}

function normalizeSha256(hash) {
  if (typeof hash !== 'string') return null;
  const trimmed = hash.trim().toLowerCase();
  const hexPart = trimmed.startsWith('sha256:') ? trimmed.slice(7) : trimmed;
  if (!/^[0-9a-f]{64}$/.test(hexPart)) return null;
  return `sha256:${hexPart}`;
}

const VALID_STATES = new Set(['experimental', 'candidate', 'verified', 'production']);
const HUMAN_ROLES = new Set(['human_brand_owner', 'human_art_director']);

class PromotionStateMachine {
  constructor(initialState = 'experimental', options = {}) {
    if (!VALID_STATES.has(initialState)) {
      throw new PromotionError(`Invalid initial state: ${initialState}`, 'INVALID_STATE');
    }
    this._state = initialState;
    this._artifactSha256 = options.artifactSha256 ? normalizeSha256(options.artifactSha256) : null;
    this._history = Array.isArray(options.history) ? [...options.history] : [];
    this._metadata = options.metadata || {};
    this._ledger = options.ledger || null;
    this._runId = options.runId || null;
  }

  getState() {
    return this._state;
  }

  getArtifactSha256() {
    return this._artifactSha256;
  }

  getHistory() {
    return [...this._history];
  }

  getMetadata() {
    return { ...this._metadata };
  }

  _transition(toState, details = {}) {
    const event = {
      from: this._state,
      to: toState,
      timestamp: new Date().toISOString(),
      artifactSha256: this._artifactSha256,
      ...details
    };
    this._history.push(event);
    this._state = toState;
    if (this._ledger && this._runId) {
      this._ledger.appendEvent(this._runId, { type: 'PROMOTION_TRANSITION', ...event });
    }
  }

  promoteToCandidate({ artifact, artifactSha256, metadata, actorId, actorRole } = {}) {
    if (this._state !== 'experimental') {
      throw new PromotionError(
        `Invalid transition: cannot promote to candidate from state "${this._state}"`,
        'INVALID_TRANSITION'
      );
    }

    if (!artifactSha256 || typeof artifactSha256 !== 'string') {
      throw new PromotionError('artifactSha256 is required to promote to candidate', 'INVALID_SHA256');
    }

    const normalized = normalizeSha256(artifactSha256);
    if (!normalized) {
      throw new PromotionError(`Invalid SHA-256 format: "${artifactSha256}"`, 'INVALID_SHA256');
    }

    if (artifact !== undefined) {
      const buffer = typeof artifact === 'string' ? Buffer.from(artifact, 'utf8') : Buffer.from(artifact);
      const computed = 'sha256:' + crypto.createHash('sha256').update(buffer).digest('hex');
      if (computed !== normalized) {
        throw new PromotionError(
          `Artifact content hash (${computed}) does not match declared artifactSha256 (${normalized})`,
          'ARTIFACT_SHA256_MISMATCH'
        );
      }
    }

    this._artifactSha256 = normalized;
    if (metadata && typeof metadata === 'object') {
      this._metadata = { ...this._metadata, ...metadata };
    }

    this._transition('candidate', { actorId, actorRole, metadata });
    return this._state;
  }

  promoteToVerified({ technicalReport, visualCritique, actorId, actorRole } = {}) {
    if (this._state !== 'candidate') {
      throw new PromotionError(
        `Invalid transition: cannot promote to verified from state "${this._state}"`,
        'INVALID_TRANSITION'
      );
    }

    if (!this._artifactSha256) {
      throw new PromotionError('Candidate has no registered artifactSha256', 'INVALID_SHA256');
    }

    // 1. Technical Report integrity and status
    if (!technicalReport || typeof technicalReport !== 'object') {
      throw new PromotionError('technicalReport is required to promote to verified', 'VERIFICATION_GATE_FAILED');
    }
    const techSha = normalizeSha256(technicalReport.artifactSha256);
    if (!techSha || techSha !== this._artifactSha256) {
      throw new PromotionError(
        `Technical report SHA (${techSha}) does not match candidate artifactSha256 (${this._artifactSha256})`,
        'ARTIFACT_SHA256_MISMATCH'
      );
    }
    if (technicalReport.status === 'failed' || technicalReport.passed === false) {
      throw new PromotionError('Technical report status indicates failure', 'VERIFICATION_GATE_FAILED');
    }
    if (Array.isArray(technicalReport.criticalFailures) && technicalReport.criticalFailures.length > 0) {
      throw new PromotionError(
        `Technical report contains critical failures: ${technicalReport.criticalFailures.join(', ')}`,
        'VERIFICATION_GATE_FAILED'
      );
    }

    // 2. Visual Critique integrity and status
    if (!visualCritique || typeof visualCritique !== 'object') {
      throw new PromotionError('visualCritique is required to promote to verified', 'VERIFICATION_GATE_FAILED');
    }
    const visSha = normalizeSha256(visualCritique.artifactSha256);
    if (!visSha || visSha !== this._artifactSha256) {
      throw new PromotionError(
        `Visual critique SHA (${visSha}) does not match candidate artifactSha256 (${this._artifactSha256})`,
        'ARTIFACT_SHA256_MISMATCH'
      );
    }
    if (visualCritique.approved === false || visualCritique.status === 'rejected') {
      throw new PromotionError('Visual critique rejected candidate artifact', 'VERIFICATION_GATE_FAILED');
    }
    if (Array.isArray(visualCritique.criticalFailures) && visualCritique.criticalFailures.length > 0) {
      throw new PromotionError(
        `Visual critique contains critical failures: ${visualCritique.criticalFailures.join(', ')}`,
        'VERIFICATION_GATE_FAILED'
      );
    }

    this._transition('verified', { actorId, actorRole, technicalReport, visualCritique });
    return this._state;
  }

  promoteToProduction({ humanApprovals, actorRole, actorId } = {}) {
    if (this._state !== 'verified') {
      throw new PromotionError(
        `Invalid transition: cannot promote to production from state "${this._state}"`,
        'INVALID_TRANSITION'
      );
    }

    if (!actorRole || !HUMAN_ROLES.has(actorRole)) {
      throw new PromotionError(
        `Role "${actorRole}" is not authorized to promote to production. Only human_brand_owner or human_art_director may promote`,
        'UNAUTHORIZED_PROMOTION_ROLE'
      );
    }

    if (!humanApprovals || typeof humanApprovals !== 'object') {
      throw new PromotionError('humanApprovals is required to promote to production', 'HUMAN_APPROVAL_MISSING');
    }

    const humanSha = normalizeSha256(humanApprovals.artifactSha256);
    if (!humanSha || humanSha !== this._artifactSha256) {
      throw new PromotionError(
        `Human approvals SHA (${humanSha}) does not match verified artifactSha256 (${this._artifactSha256})`,
        'ARTIFACT_SHA256_MISMATCH'
      );
    }

    const approvalsSource = humanApprovals.approvals || humanApprovals.gates || humanApprovals;
    const requiredGates = ['H01', 'H02', 'H03'];

    for (const gate of requiredGates) {
      const gateEntry = approvalsSource[gate];
      if (!gateEntry) {
        throw new PromotionError(`Mandatory human approval gate "${gate}" is missing`, 'HUMAN_APPROVAL_MISSING');
      }
      const isApproved = gateEntry === true || gateEntry.approved === true || gateEntry.status === 'approved';
      if (!isApproved) {
        throw new PromotionError(`Mandatory human approval gate "${gate}" is unapproved`, 'HUMAN_APPROVAL_MISSING');
      }
    }

    this._transition('production', { actorId, actorRole, humanApprovals });
    return this._state;
  }
}

module.exports = {
  PromotionStateMachine,
  PromotionError,
  normalizeSha256
};
