const fs = require('node:fs');
const path = require('node:path');
const { hashCanonical } = require('./canonical-json');
const { validateReferenceCandidate } = require('./reference-candidate-contract');

function readRegistry(registryPath) {
  if (!fs.existsSync(registryPath)) return [];
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  if (!Array.isArray(registry)) throw new TypeError('Reference candidate registry must be an array');
  return registry;
}

function writeRegistryAtomically(registryPath, registry) {
  const directory = path.dirname(registryPath);
  fs.mkdirSync(directory, { recursive: true });
  const temporaryPath = path.join(
    directory,
    `.${path.basename(registryPath)}.${process.pid}.${cryptoRandomSuffix()}.tmp`
  );
  try {
    fs.writeFileSync(temporaryPath, `${JSON.stringify(registry, null, 2)}\n`, 'utf8');
    fs.renameSync(temporaryPath, registryPath);
  } finally {
    if (fs.existsSync(temporaryPath)) fs.rmSync(temporaryPath, { force: true });
  }
}

function cryptoRandomSuffix() {
  return require('node:crypto').randomBytes(8).toString('hex');
}

function registeredAt(now) {
  const value = now === undefined ? new Date() : now;
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) throw new TypeError('now must be an ISO date or Date');
  return date.toISOString();
}

function registerReferenceCandidate({ registryPath, candidate, now }) {
  if (typeof registryPath !== 'string' || registryPath.length === 0) {
    throw new TypeError('registryPath is required');
  }
  const validatedCandidate = validateReferenceCandidate(candidate);
  const registry = readRegistry(registryPath);
  if (registry.some(entry => entry.candidateId === validatedCandidate.candidateId)) {
    throw new Error(`Reference candidate already registered: ${validatedCandidate.candidateId}`);
  }

  const registered = {
    ...validatedCandidate,
    lifecycle: 'quarantined',
    registeredAt: registeredAt(now),
    candidateHash: hashCanonical(validatedCandidate)
  };
  writeRegistryAtomically(registryPath, [...registry, registered]);
  return registered;
}

function listReferenceCandidates({ registryPath, clientScope, candidateIds, lifecycle } = {}) {
  if (typeof registryPath !== 'string' || registryPath.length === 0) {
    throw new TypeError('registryPath is required');
  }
  if (typeof clientScope !== 'string' || clientScope.length === 0) {
    throw new TypeError('clientScope is required');
  }
  if (candidateIds !== undefined && (!Array.isArray(candidateIds) || candidateIds.some(id => typeof id !== 'string'))) {
    throw new TypeError('candidateIds must be an array of strings');
  }

  const wantedIds = candidateIds && new Set(candidateIds);
  return readRegistry(registryPath)
    .filter(candidate => candidate.clientScope === clientScope || candidate.clientScope === 'global')
    .filter(candidate => !wantedIds || wantedIds.has(candidate.candidateId))
    .filter(candidate => lifecycle === undefined || candidate.lifecycle === lifecycle)
    .sort((left, right) => left.candidateId.localeCompare(right.candidateId));
}

module.exports = { registerReferenceCandidate, listReferenceCandidates };
