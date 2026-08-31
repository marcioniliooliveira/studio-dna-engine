const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { assertSafeSlug } = require('../server/security');

function artifactError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function jsonSafeError() {
  return new TypeError('Artifact content must contain only JSON-safe values');
}

function assertJsonSafe(value, ancestors = new Set()) {
  if (value === null || typeof value === 'string' || typeof value === 'boolean') return;
  if (typeof value === 'number') {
    if (Number.isFinite(value)) return;
    throw jsonSafeError();
  }
  if (typeof value !== 'object') throw jsonSafeError();
  if (ancestors.has(value)) throw jsonSafeError();

  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      if (Object.getOwnPropertySymbols(value).length > 0) throw jsonSafeError();
      for (let index = 0; index < value.length; index += 1) {
        if (!Object.hasOwn(value, index)) throw jsonSafeError();
        const descriptor = Object.getOwnPropertyDescriptor(value, String(index));
        if (!descriptor.enumerable || !Object.hasOwn(descriptor, 'value')) throw jsonSafeError();
        assertJsonSafe(descriptor.value, ancestors);
      }
      const ownNames = Object.getOwnPropertyNames(value);
      if (ownNames.length !== value.length + 1 || ownNames.some((key) => key !== 'length' && (!/^(0|[1-9]\d*)$/.test(key) || Number(key) >= value.length))) {
        throw jsonSafeError();
      }
      return;
    }

    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) throw jsonSafeError();
    if (Object.getOwnPropertySymbols(value).length > 0) throw jsonSafeError();
    for (const key of Object.keys(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (!descriptor.enumerable || !Object.hasOwn(descriptor, 'value')) throw jsonSafeError();
      assertJsonSafe(value[key], ancestors);
    }
    if (Object.getOwnPropertyNames(value).length !== Object.keys(value).length) throw jsonSafeError();
  } finally {
    ancestors.delete(value);
  }
}

function sortJson(value) {
  if (Array.isArray(value)) return value.map(sortJson);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortJson(value[key])]));
  }
  return value;
}

function canonicalJson(value) {
  assertJsonSafe(value);
  return JSON.stringify(sortJson(value));
}

function sha256(content) {
  return crypto.createHash('sha256').update(content).digest('hex');
}

function createArtifactRegistry({ rootDir, now = Date.now }) {
  let temporaryFileCount = 0;

  function assertContained(realPath) {
    const realRoot = fs.realpathSync(rootDir);
    const prefix = realRoot.endsWith(path.sep) ? realRoot : `${realRoot}${path.sep}`;
    if (realPath !== realRoot && !realPath.startsWith(prefix)) {
      throw artifactError('ARTIFACT_PATH_ESCAPE', 'Artifact path resolves outside the registry root');
    }
  }

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
    const root = path.resolve(rootDir);
    const artifactPath = path.resolve(root, ...reference.relativePath.split('/'));
    const prefix = root.endsWith(path.sep) ? root : `${root}${path.sep}`;
    if (!artifactPath.startsWith(prefix)) {
      throw artifactError('ARTIFACT_PATH_ESCAPE', 'Artifact path escapes the registry root');
    }
    return artifactPath;
  }

  function assertArtifactDirectory(destination) {
    fs.mkdirSync(rootDir, { recursive: true });
    let current = path.resolve(rootDir);
    const segments = path.relative(current, path.dirname(destination)).split(path.sep).filter(Boolean);
    assertContained(fs.realpathSync(current));
    for (const segment of segments) {
      current = path.join(current, segment);
      if (!fs.existsSync(current)) fs.mkdirSync(current);
      assertContained(fs.realpathSync(current));
    }
  }

  function readStored(destination) {
    assertContained(fs.realpathSync(path.dirname(destination)));
    if (fs.lstatSync(destination).isSymbolicLink()) {
      throw artifactError('ARTIFACT_PATH_ESCAPE', 'Artifact file must not be a symbolic link');
    }
    let descriptor;
    try {
      descriptor = fs.openSync(destination, fs.constants.O_RDONLY | fs.constants.O_NOFOLLOW);
      return fs.readFileSync(descriptor, 'utf8');
    } finally {
      if (descriptor !== undefined) fs.closeSync(descriptor);
    }
  }

  function verify(reference) {
    const ref = assertReference(reference);
    const artifactPath = pathFor(ref);
    let stored;
    try {
      stored = readStored(artifactPath);
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

    assertArtifactDirectory(destination);
    if (fs.existsSync(destination)) {
      verify(ref);
      return ref;
    }
    const temporary = path.join(
      path.dirname(destination),
      `.${digest}.${process.pid}.${now()}.${temporaryFileCount += 1}.tmp`
    );
    try {
      assertArtifactDirectory(destination);
      const descriptor = fs.openSync(
        temporary,
        fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_EXCL | fs.constants.O_NOFOLLOW,
        0o600
      );
      try {
        fs.writeFileSync(descriptor, content, 'utf8');
      } finally {
        fs.closeSync(descriptor);
      }
      try {
        assertArtifactDirectory(destination);
        fs.linkSync(temporary, destination);
      } catch (error) {
        if (error.code !== 'EEXIST') throw error;
        verify(ref);
        return ref;
      }
    } finally {
      assertArtifactDirectory(destination);
      if (fs.existsSync(temporary)) fs.rmSync(temporary, { force: true });
    }

    verify(ref);
    return ref;
  }

  return { putJson, read: verify, verify };
}

module.exports = { createArtifactRegistry };
