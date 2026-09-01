const { isDeepStrictEqual } = require('node:util');
const { fingerprintFailure } = require('./error-fingerprint');

function previousFingerprintSet(previousFingerprints) {
  if (!Array.isArray(previousFingerprints)) return new Set();
  return new Set(previousFingerprints.map((entry) => typeof entry === 'string' ? entry : entry?.fp).filter(Boolean));
}

function isArtifactRef(ref, { runId, clientId, type }) {
  return ref && typeof ref === 'object' && !Array.isArray(ref)
    && ref.id === ref.sha256 && /^[a-f0-9]{64}$/.test(ref.sha256)
    && ref.runId === runId && ref.clientId === clientId && ref.type === type
    && ref.relativePath === `${clientId}/${runId}/artifacts/${type}/${ref.sha256}.json`;
}

function hasVerifierVerdict(stored) {
  const value = stored?.value;
  return value && typeof value === 'object' && !Array.isArray(value)
    && (typeof value.passed === 'boolean' || value.status === 'failed' || (value.gates && typeof value.gates === 'object'));
}

function hasNewArtifactProvenance({ runId, evidence, fingerprint, artifactRegistry }) {
  if (typeof runId !== 'string' || evidence?.runId !== runId || evidence?.fingerprint !== fingerprint
    || typeof artifactRegistry?.read !== 'function') return false;
  const verifierArtifact = evidence.verifierArtifact;
  const failureArtifact = evidence.failureArtifact;
  const clientId = failureArtifact?.clientId;
  if (!isArtifactRef(failureArtifact, { runId, clientId, type: 'failure-delta' })
    || !isArtifactRef(verifierArtifact, { runId, clientId, type: verifierArtifact?.type })
    || !['qa-report', 'verification'].includes(verifierArtifact.type)
    || evidence.failureDelta?.fp !== fingerprint) return false;

  try {
    const verifierStored = artifactRegistry.read(verifierArtifact);
    const failureStored = artifactRegistry.read(failureArtifact);
    return hasVerifierVerdict(verifierStored)
      && Array.isArray(failureStored?.sources)
      && failureStored.sources.some((source) => isDeepStrictEqual(source, verifierArtifact))
      && failureStored?.value?.runId === runId
      && failureStored.value.fingerprint === fingerprint
      && isDeepStrictEqual(failureStored.value.verifierArtifact, verifierArtifact)
      && isDeepStrictEqual(failureStored.value.delta, evidence.failureDelta);
  } catch {
    return false;
  }
}

function decideRepair({ runId, node, attempts, previousFingerprints, evidence, remainingBudget, artifactRegistry }) {
  const fingerprint = fingerprintFailure(evidence);
  if (previousFingerprintSet(previousFingerprints).has(fingerprint)) return 'human_intervention';
  if (!hasNewArtifactProvenance({ runId, evidence, fingerprint, artifactRegistry })) return 'human_intervention';

  const maxAttempts = node?.budget?.maxAttempts;
  if (!Number.isInteger(attempts) || attempts < 0
    || !Number.isInteger(maxAttempts) || maxAttempts < 1
    || attempts >= maxAttempts) return 'human_intervention';

  const maxUsd = node?.budget?.maxUsd;
  if (!Number.isFinite(remainingBudget) || remainingBudget < 0
    || !Number.isFinite(maxUsd) || maxUsd <= 0
    || remainingBudget < maxUsd) return 'budget_blocked';
  return 'retry';
}

module.exports = { decideRepair };
