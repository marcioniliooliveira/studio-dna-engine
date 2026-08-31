const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { assertSafeSlug } = require('../server/security');

function artifactError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function sortJson(value) {
  if (Array.isArray(value)) return value.map(sortJson);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortJson(value[key])]));
  }
  return value;
}

function canonicalJson(value) {
  const serialized = JSON.stringify(value);
  if (typeof serialized !== 'string') {
    throw new TypeError('Artifact content must be JSON serializable');
  }
  return JSON.stringify(sortJson(JSON.parse(serialized)));
}

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function createArtifactRegistry({ rootDir, now = Date.now }) {
  let temporaryFileCount = 0;

  function assertReference(ref) {
    const clientId = assertSafeSlug(ref && ref.clientId);
    const runId = assertSafeSlug(ref && ref.runId);
    const type = assertSafeSlug(ref && ref.type);
    const hash = String(ref && ref.sha256 || '');
    if (!/^[a-f0-9]{64}$/.test(hash)) {
      throw artifactError('ARTIFACT_INVALID_REFERENCE', 'Artifact reference has an invalid SHA-256');
    }

    const relativePath = path.posix.join(clientId, runId, 'artifacts', type, `${hash}.json`);
    if (ref.relativePath !== relativePath) {
      throw artifactError('ARTIFACT_CLIENT_MISMATCH', 'Artifact reference does not belong to its client');
    }
    return { clientId, runId, type, sha256: hash, relativePath };
  }

  function pathFor(reference) {
    return path.resolve(rootDir, ...reference.relativePath.split('/'));
  }

  function verify(reference) {
    const ref = assertReference(reference);
    const artifactPath = pathFor(ref);
    let stored;
    try {
      stored = fs.readFileSync(artifactPath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw artifactError('ARTIFACT_NOT_FOUND', 'Artifact does not exist');
      }
      throw error;
    }

    if (sha256(stored) !== ref.sha256) {
      throw artifactError('ARTIFACT_HASH_MISMATCH', 'Artifact contents do not match its SHA-256');
    }
    return JSON.parse(stored);
  }

  function putJson({ runId, clientId, type, value, sources }) {
    const safeRunId = assertSafeSlug(runId);
    const safeClientId = assertSafeSlug(clientId);
    const safeType = assertSafeSlug(type);
    const content = canonicalJson({ sources, value });
    const digest = sha256(content);
    const relativePath = path.posix.join(safeClientId, safeRunId, 'artifacts', safeType, `${digest}.json`);
    const ref = { id: digest, sha256: digest, runId: safeRunId, clientId: safeClientId, type: safeType, relativePath };
    const destination = pathFor(ref);

    if (fs.existsSync(destination)) {
      verify(ref);
      return ref;
    }

    fs.mkdirSync(path.dirname(destination), { recursive: true });
    const temporary = path.join(
      path.dirname(destination),
      `.${digest}.${process.pid}.${now()}.${temporaryFileCount += 1}.tmp`
    );
    try {
      fs.writeFileSync(temporary, content, { encoding: 'utf8', flag: 'wx' });
      if (fs.existsSync(destination)) {
        verify(ref);
        return ref;
      }
      fs.renameSync(temporary, destination);
    } finally {
      if (fs.existsSync(temporary)) fs.rmSync(temporary, { force: true });
    }

    verify(ref);
    return ref;
  }

  return { putJson, read: verify, verify };
}

module.exports = { createArtifactRegistry };
