const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const path = require('node:path');

function isWithinRoot(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative));
}

function invalidManifest(message) {
  return new Error(`Local runtime manifest is invalid: ${message}`);
}

function runtimeRecords(manifest) {
  if (manifest && typeof manifest === 'object' && !Array.isArray(manifest)) {
    if (Object.hasOwn(manifest, 'runtimeAssets')) {
      if (!Array.isArray(manifest.runtimeAssets)) {
        throw invalidManifest('runtimeAssets must be an array');
      }
      return manifest.runtimeAssets;
    }
    return [manifest];
  }
  throw invalidManifest('expected one runtime record or a runtimeAssets array');
}

function validateRecord(record, index) {
  if (!record || typeof record !== 'object' || Array.isArray(record)) {
    throw invalidManifest(`record ${index} must be an object`);
  }

  for (const field of ['path', 'upstreamUrl', 'version', 'sha256']) {
    if (typeof record[field] !== 'string' || record[field].trim() === '') {
      throw invalidManifest(`record ${index} has no valid ${field}`);
    }
  }

  if (!/^[a-f0-9]{64}$/i.test(record.sha256)) {
    throw invalidManifest(`record ${index} has an invalid sha256`);
  }

  try {
    const url = new URL(record.upstreamUrl);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new Error('unsupported protocol');
  } catch {
    throw invalidManifest(`record ${index} has an invalid upstreamUrl`);
  }

  const sourcePath = record.path;
  if (
    path.posix.isAbsolute(sourcePath) ||
    path.win32.isAbsolute(sourcePath) ||
    /^[a-z]:/i.test(sourcePath) ||
    sourcePath.includes('\\') ||
    sourcePath.includes(':') ||
    sourcePath.split('/').includes('..')
  ) {
    throw invalidManifest(`record ${index} path is outside the active client root`);
  }
}

async function resolveExistingPathWithinRoot(root, candidate, missingMessage) {
  const resolvedCandidate = path.resolve(candidate);
  if (!isWithinRoot(root, resolvedCandidate)) {
    throw invalidManifest('path is outside the active client root');
  }

  let realPath;
  try {
    realPath = await fs.realpath(resolvedCandidate);
  } catch (error) {
    if (error && error.code === 'ENOENT') throw invalidManifest(missingMessage);
    throw error;
  }

  if (!isWithinRoot(root, realPath)) {
    throw invalidManifest('path resolves outside the active client root');
  }
  return realPath;
}

async function validateLocalRuntimeManifest({ clientRoot, manifestPath }) {
  if (typeof clientRoot !== 'string' || clientRoot.length === 0 || typeof manifestPath !== 'string' || manifestPath.length === 0) {
    throw invalidManifest('clientRoot and manifestPath are required');
  }

  const activeClientRoot = await fs.realpath(path.resolve(clientRoot));
  const resolvedManifestPath = await resolveExistingPathWithinRoot(
    activeClientRoot,
    manifestPath,
    'manifest file is missing'
  );

  let manifest;
  try {
    manifest = JSON.parse(await fs.readFile(resolvedManifestPath, 'utf8'));
  } catch (error) {
    if (error instanceof SyntaxError) throw invalidManifest('manifest JSON cannot be parsed');
    throw error;
  }

  const records = runtimeRecords(manifest);
  if (records.length === 0) throw invalidManifest('runtimeAssets cannot be empty');

  const files = [];
  for (const [index, record] of records.entries()) {
    validateRecord(record, index);
    const filePath = await resolveExistingPathWithinRoot(
      activeClientRoot,
      path.resolve(activeClientRoot, record.path),
      `record ${index} file is missing`
    );
    const contents = await fs.readFile(filePath);
    const actualHash = crypto.createHash('sha256').update(contents).digest('hex');
    if (actualHash.toLowerCase() !== record.sha256.toLowerCase()) {
      throw invalidManifest(`record ${index} hash mismatch for ${record.path}`);
    }
    files.push({ path: record.path, sha256: record.sha256 });
  }

  return { files };
}

function exactAllowedUrls(allowedUrls) {
  if (allowedUrls === undefined) return new Set();
  if (!Array.isArray(allowedUrls)) {
    throw new TypeError('allowedUrls must be an array of exact URLs');
  }

  const exactUrls = new Set();
  for (const allowedUrl of allowedUrls) {
    if (typeof allowedUrl !== 'string' || allowedUrl.length === 0 || allowedUrl.includes('*')) {
      throw new TypeError('allowedUrls must contain exact URLs without wildcards');
    }
    new URL(allowedUrl);
    if (exactUrls.has(allowedUrl)) {
      throw new TypeError(`allowedUrls must not repeat ${allowedUrl}`);
    }
    exactUrls.add(allowedUrl);
  }
  return exactUrls;
}

function installNoRemoteRuntimeGuard(page, origin, { allowedUrls } = {}) {
  const trustedOrigin = new URL(origin).origin;
  const allowedUrlSet = exactAllowedUrls(allowedUrls);
  const blockedUrls = [];

  page.route('**/*', route => {
    const request = route.request();
    const resourceType = request.resourceType();
    const requestUrl = request.url();
    if (
      (resourceType === 'script' || resourceType === 'stylesheet') &&
      new URL(requestUrl).origin !== trustedOrigin
    ) {
      blockedUrls.push(requestUrl);
      return route.abort();
    }
    return route.continue();
  });

  return {
    blockedUrls,
    assertClean() {
      const unexpectedUrls = blockedUrls.filter(url => !allowedUrlSet.has(url));
      const observedUrls = new Set(blockedUrls);
      const staleAllowedUrls = [...allowedUrlSet].filter(url => !observedUrls.has(url));
      if (unexpectedUrls.length > 0 || staleAllowedUrls.length > 0) {
        const diagnostics = [];
        if (unexpectedUrls.length > 0) {
          diagnostics.push(`Unexpected blocked off-origin runtime requests: ${unexpectedUrls.join(', ')}`);
        }
        if (staleAllowedUrls.length > 0) {
          diagnostics.push(`Stale allowed off-origin runtime requests: ${staleAllowedUrls.join(', ')}`);
        }
        throw new Error(diagnostics.join('. '));
      }
    }
  };
}

module.exports = {
  installNoRemoteRuntimeGuard,
  validateLocalRuntimeManifest
};
