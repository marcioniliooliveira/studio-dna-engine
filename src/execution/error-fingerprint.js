const crypto = require('node:crypto');

const FIELD_LIMITS = Object.freeze({ maxBytes: 4096, maxChars: 2048, maxLines: 4 });
const LOG_LIMITS = Object.freeze({ maxBytes: 65536, maxChars: 32768, maxLines: 400 });
const DIFF_LIMITS = Object.freeze({ maxBytes: 32768, maxChars: 16384, maxLines: 200 });
const SUMMARY_LIMITS = Object.freeze({ maxBytes: 16384, maxChars: 8192, maxLines: 40 });

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function boundRawText(value, { maxBytes, maxChars, maxLines }) {
  let bounded = String(value ?? '').slice(0, maxChars);
  const bytes = Buffer.from(bounded, 'utf8');
  if (bytes.length > maxBytes) bounded = bytes.subarray(0, maxBytes).toString('utf8').replace(/\uFFFD$/u, '');
  return bounded.split(/\r\n?|\n/).slice(0, maxLines).join('\n');
}

function redactSecrets(value) {
  return value
    .replace(/-----BEGIN [^-\r\n]*PRIVATE KEY-----[\s\S]*?(?:-----END [^-\r\n]*PRIVATE KEY-----|$)/gi, '<redacted>')
    .replace(/\b(Bearer)\s+[A-Za-z0-9._~+\/-]+={0,2}/gi, '$1 <redacted>')
    .replace(/\b((?:api[_-]?key|access[_-]?token|auth(?:orization)?|client[_-]?secret|password|passwd|secret|token)\s*[:=]\s*)(?:"[^"]*"|'[^']*'|[^\s,;]+)/gi, '$1<redacted>')
    .replace(/\b(?:sk|ghp|github_pat|AIza)[-_A-Za-z0-9]{12,}\b/g, '<redacted>')
    .replace(/(https?:\/\/)[^\s/@:]+:[^\s/@]+@/gi, '$1<redacted>@');
}

function normalizeText(value) {
  return String(value ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/\\/g, '/')
    .replace(/\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z\b/g, '<timestamp>')
    .replace(/\bhttps?:\/\/(localhost|127\.0\.0\.1):\d{2,5}/g, 'http://$1:<port>')
    .replace(/\b(localhost|127\.0\.0\.1):\d{2,5}\b/g, '$1:<port>')
    .replace(/(?:[A-Za-z]:)?(?:\/[^\s:]+)*\/(?=clientes\/)/g, '');
}

function boundedNormalized(value, limits) {
  return normalizeText(redactSecrets(boundRawText(value, limits)));
}

function normalizedFiles(files) {
  if (!Array.isArray(files)) return [];
  return [...new Set(files.slice(0, 20).map((file) => boundedNormalized(file, FIELD_LIMITS).trim()).filter(Boolean))].sort();
}

function normalizeEvidence(evidence = {}) {
  return {
    gate: boundedNormalized(evidence.gate || 'unknown', FIELD_LIMITS).trim(),
    files: normalizedFiles(evidence.files),
    message: boundedNormalized(evidence.message || evidence.summary || '', FIELD_LIMITS).trim()
  };
}

function fingerprintFailure(evidence) {
  return sha256(JSON.stringify(normalizeEvidence(evidence)));
}

function relevantLogLines(log, normalized) {
  const fileTokens = normalized.files.flatMap((file) => [file, file.split('/').at(-1)]).filter(Boolean);
  const terms = [normalized.gate, ...fileTokens, 'error', 'exception', 'failed', 'diff']
    .map((term) => term.toLowerCase())
    .filter(Boolean);
  return boundedNormalized(log, LOG_LIMITS).split('\n')
    .map((line) => line.trim())
    .filter((line) => line && terms.some((term) => line.toLowerCase().includes(term)))
    .slice(0, 39);
}

function createFailureDelta(evidence = {}) {
  const normalized = normalizeEvidence(evidence);
  const summaryLines = [normalized.message, ...relevantLogLines(evidence.log, normalized)]
    .filter((line, index, lines) => line && lines.indexOf(line) === index)
    .slice(0, 40);
  const summary = boundedNormalized(summaryLines.join('\n'), SUMMARY_LIMITS).trim();
  return {
    fp: sha256(JSON.stringify(normalized)),
    gate: normalized.gate,
    files: normalized.files,
    diffHash: sha256(boundedNormalized(evidence.diff || '', DIFF_LIMITS)),
    summary
  };
}

module.exports = { fingerprintFailure, createFailureDelta };
