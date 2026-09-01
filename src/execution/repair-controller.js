const { fingerprintFailure } = require('./error-fingerprint');

function previousFingerprintSet(previousFingerprints) {
  if (!Array.isArray(previousFingerprints)) return new Set();
  return new Set(previousFingerprints.map((entry) => typeof entry === 'string' ? entry : entry?.fp).filter(Boolean));
}

function hasNewArtifact(evidence) {
  const artifact = evidence?.newArtifact || evidence?.verifierArtifact || evidence?.artifactRef;
  const hash = artifact?.sha || artifact?.sha256;
  return Boolean(
    artifact && typeof artifact === 'object' && typeof artifact.id === 'string' && artifact.id.length > 0 &&
    typeof hash === 'string' && /^[a-f0-9]{64}$/.test(hash)
  );
}

function decideRepair({ node, attempts, previousFingerprints, evidence, remainingBudget }) {
  const fingerprint = fingerprintFailure(evidence);
  if (previousFingerprintSet(previousFingerprints).has(fingerprint)) return 'human_intervention';
  if (!hasNewArtifact(evidence)) return 'human_intervention';
  if (!Number.isInteger(attempts) || attempts < 0 || attempts >= node?.budget?.maxAttempts) return 'human_intervention';
  if (!Number.isFinite(remainingBudget) || remainingBudget < node?.budget?.maxUsd) return 'budget_blocked';
  return 'retry';
}

module.exports = { decideRepair };
