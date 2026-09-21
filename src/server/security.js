const crypto = require('node:crypto');
const dns = require('node:dns').promises;
const net = require('node:net');
const path = require('node:path');

function unsafePath(message = 'Unsafe path') {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
}

function decodePathname(pathname) {
  try {
    let decoded = String(pathname || '/');
    for (let index = 0; index < 3; index += 1) {
      const next = decodeURIComponent(decoded);
      if (next === decoded) break;
      decoded = next;
    }
    return decoded;
  } catch (error) {
    throw unsafePath('Unsafe path encoding');
  }
}

function resolveWithin(baseDir, relativePath) {
  const base = path.resolve(baseDir);
  const target = path.resolve(base, relativePath || '.');
  const prefix = base.endsWith(path.sep) ? base : base + path.sep;

  if (target !== base && !target.startsWith(prefix)) {
    throw unsafePath();
  }

  return target;
}

function resolveStaticPath({ rootDir, copiasDir, clientesDir, pathname }) {
  const decoded = decodePathname(pathname).replace(/\\/g, '/');
  if (decoded.includes('\0')) throw unsafePath();

  const segments = decoded.split('/').filter(Boolean);
  if (segments.some(segment => segment === '.' || segment === '..')) {
    throw unsafePath();
  }

  if (segments[0] === 'clientes') {
    if (!segments[1]) throw unsafePath('Unsafe client path');
    const clientRoot = resolveWithin(clientesDir, segments[1]);
    return resolveWithin(clientRoot, segments.slice(2).join(path.sep));
  }

  if (segments[0] === 'projetos') {
    if (!segments[1]) throw unsafePath('Unsafe project path');
    const projectRoot = resolveWithin(path.join(rootDir, 'projetos'), segments[1]);
    return resolveWithin(projectRoot, segments.slice(2).join(path.sep));
  }

  if (segments[0] === 'copias') {
    return resolveWithin(copiasDir, segments.slice(1).join(path.sep));
  }

  return resolveWithin(copiasDir, segments.join(path.sep));
}

function isPrivateOrLocalIp(address) {
  const normalized = String(address || '').toLowerCase().replace(/^\[|\]$/g, '');
  const family = net.isIP(normalized);

  if (family === 4) {
    const octets = normalized.split('.').map(Number);
    const [a, b] = octets;
    return a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 198 && (b === 18 || b === 19)) ||
      a >= 224;
  }

  if (family === 6) {
    if (normalized === '::' || normalized === '::1') return true;
    if (normalized.startsWith('fc') || normalized.startsWith('fd') || normalized.startsWith('fe8') || normalized.startsWith('fe9') || normalized.startsWith('fea') || normalized.startsWith('feb')) return true;
    if (normalized.startsWith('::ffff:')) {
      return isPrivateOrLocalIp(normalized.slice('::ffff:'.length));
    }
  }

  return false;
}

async function assertSafeExternalUrl(rawUrl, options = {}) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch (error) {
    const invalid = new Error('Invalid external URL');
    invalid.statusCode = 400;
    throw invalid;
  }

  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password) {
    const invalid = new Error('External URL must use http or https without credentials');
    invalid.statusCode = 400;
    throw invalid;
  }

  const hostname = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (hostname === 'localhost' || hostname.endsWith('.localhost') || isPrivateOrLocalIp(hostname)) {
    const blocked = new Error('Private or local network targets are not allowed');
    blocked.statusCode = 403;
    throw blocked;
  }

  const lookup = options.lookup || ((host) => dns.lookup(host, { all: true, verbatim: true }));
  const addresses = await lookup(hostname);
  const results = Array.isArray(addresses) ? addresses : [addresses];
  if (results.length === 0 || results.some(result => {
    const address = result.address || result;
    return net.isIP(address) === 0 || isPrivateOrLocalIp(address);
  })) {
    const blocked = new Error('Private or local network targets are not allowed');
    blocked.statusCode = 403;
    throw blocked;
  }

  return parsed;
}

async function readJsonBody(req, options = {}) {
  const limitBytes = options.limitBytes || 64 * 1024;
  const chunks = [];
  let received = 0;

  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    received += buffer.length;
    if (received > limitBytes) {
      const tooLarge = new Error('Request body exceeds the allowed size');
      tooLarge.statusCode = 413;
      throw tooLarge;
    }
    chunks.push(buffer);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
  } catch (error) {
    const invalid = new Error('Invalid JSON body');
    invalid.statusCode = 400;
    throw invalid;
  }
}

function assertSafeSlug(value) {
  const slug = String(value || '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    const error = new Error('Unsafe slug');
    error.statusCode = 400;
    throw error;
  }
  return slug;
}

function parseByteRange(header, fileSize) {
  if (!Number.isSafeInteger(fileSize) || fileSize <= 0 || typeof header !== 'string') return null;
  const match = header.match(/^bytes=(\d*)-(\d*)$/);
  if (!match || (!match[1] && !match[2])) return null;

  if (!match[1]) {
    const suffixLength = Number(match[2]);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) return null;
    return {
      start: Math.max(fileSize - suffixLength, 0),
      end: fileSize - 1
    };
  }

  const start = Number(match[1]);
  const end = match[2] ? Number(match[2]) : fileSize - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start < 0 || start >= fileSize || end < start) {
    return null;
  }

  return { start, end: Math.min(end, fileSize - 1) };
}

function isMutationAuthorized(req, options = {}) {
  if (!options.enabled || !options.token) return false;
  const header = req.headers && req.headers.authorization;
  if (typeof header !== 'string' || !header.startsWith('Bearer ')) return false;

  const supplied = Buffer.from(header.slice('Bearer '.length));
  const expected = Buffer.from(String(options.token));
  return supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);
}

module.exports = {
  resolveStaticPath,
  assertSafeExternalUrl,
  assertSafeSlug,
  parseByteRange,
  readJsonBody,
  isMutationAuthorized,
  isPrivateOrLocalIp
};
