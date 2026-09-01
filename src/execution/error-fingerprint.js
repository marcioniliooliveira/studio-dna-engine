const crypto = require('node:crypto');

function sha256(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
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

function normalizedFiles(files) {
  if (!Array.isArray(files)) return [];
  return [...new Set(files.map((file) => normalizeText(file).trim()).filter(Boolean))].sort();
}

function normalizeEvidence(evidence = {}) {
  return {
    gate: normalizeText(evidence.gate || 'unknown').trim(),
    files: normalizedFiles(evidence.files),
    message: normalizeText(evidence.message || evidence.summary || '').trim()
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
  return normalizeText(log).split('\n')
    .map((line) => line.trim())
    .filter((line) => line && terms.some((term) => line.toLowerCase().includes(term)))
    .slice(0, 39);
}

function createFailureDelta(evidence = {}) {
  const normalized = normalizeEvidence(evidence);
  const summaryLines = [normalized.message, ...relevantLogLines(evidence.log, normalized)]
    .filter((line, index, lines) => line && lines.indexOf(line) === index)
    .slice(0, 40);
  return {
    fp: fingerprintFailure(evidence),
    gate: normalized.gate,
    files: normalized.files,
    diffHash: sha256(normalizeText(evidence.diff || '')),
    summary: summaryLines.join('\n')
  };
}

module.exports = { fingerprintFailure, createFailureDelta };
