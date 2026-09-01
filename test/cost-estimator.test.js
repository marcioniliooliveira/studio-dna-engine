const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const assert = require('node:assert/strict');
const { estimateCost } = require('../src/execution/cost-estimator');

const rateCard = require('../config/model-rates.json');
const repositoryRoot = path.resolve(__dirname, '..');
const compareScript = path.join(repositoryRoot, 'scripts', 'compare-execution-cost.js');

function usage(overrides = {}) {
  return {
    model: 'gemini-3.7-flash', service: 'standard', inputTokens: 1_000_000,
    cachedTokens: 100_000, outputTokens: 1_000_000, cacheWriteTokens: 50_000, ...overrides
  };
}

test('selects Gemini standard rates by effective date and retains rate provenance', () => {
  const before = estimateCost(usage(), rateCard, '2026-12-31T23:59:59.999Z');
  const after = estimateCost(usage(), rateCard, '2027-01-01T00:00:00.000Z');

  assert.deepEqual(before.usage, usage());
  assert.equal(before.model, 'gemini-3.7-flash');
  assert.equal(before.service, 'standard');
  assert.equal(before.rateVersion, 'gemini-3.7-flash-standard-2026');
  assert.equal(before.usd, 4.4575);
  assert.equal(after.rateVersion, 'gemini-3.7-flash-standard-2027');
  assert.equal(after.usd, 8.915);
  assert.equal(before.estimated, true);
  assert.equal(after.estimated, true);
});

test('accounts for Sol input, output, cache reads, and cache writes on its own dated card', () => {
  const result = estimateCost({
    model: 'gpt-5.6-sol', service: 'ide', inputTokens: 1_000_000,
    cachedTokens: 200_000, outputTokens: 1_000_000, cacheWriteTokens: 100_000
  }, rateCard, '2026-09-01T00:00:00.000Z');

  assert.equal(result.rateVersion, 'gpt-5.6-sol-ide-2026');
  assert.equal(result.usd, 12.85);
});

for (const [field, value] of [['inputTokens', null], ['cachedTokens', undefined], ['outputTokens', null], ['cacheWriteTokens', undefined]]) {
  test(`returns an unknown cost when ${field} is unknown`, () => {
    const result = estimateCost(usage({ [field]: value }), rateCard, '2026-09-01T00:00:00.000Z');
    assert.equal(result.usd, null);
    assert.equal(result.estimated, false);
    assert.deepEqual(result.usage, usage({ [field]: value }));
  });
}

test('compares only ledgers with equal task and gate sets and suppresses savings for unknown costs', (t) => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'cost-comparison-'));
  t.after(() => fs.rmSync(temporary, { recursive: true, force: true }));
  const baseline = path.join(temporary, 'baseline.json');
  const candidate = path.join(temporary, 'candidate.json');
  const blueprint = { nodes: [{ id: 'build', gates: ['runtime', 'visual'] }] };
  const fingerprint = crypto.createHash('sha256').update(JSON.stringify([{ id: 'build', gates: ['runtime', 'visual'] }])).digest('hex');
  fs.writeFileSync(baseline, JSON.stringify({ taskGateFingerprint: fingerprint, blueprint, costs: [{ nid: 'build', usd: 2, try: 2 }], events: [{ type: 'TASK_PASSED', data: { nodeId: 'build' } }] }));
  fs.writeFileSync(candidate, JSON.stringify({ taskGateFingerprint: fingerprint, blueprint, costs: [{ nid: 'build', usd: null, try: 1 }], events: [{ type: 'TASK_PASSED', data: { nodeId: 'build' } }, { type: 'HUMAN_INTERVENTION', data: {} }] }));

  const comparison = spawnSync(process.execPath, [compareScript, baseline, candidate], { cwd: repositoryRoot, encoding: 'utf8' });

  assert.equal(comparison.status, 0, comparison.stderr);
  const report = JSON.parse(comparison.stdout);
  assert.equal(report.comparable, true);
  assert.equal(report.baseline.totalKnownUsd, 2);
  assert.equal(report.candidate.unknownCalls, 1);
  assert.equal(report.baseline.retries, 1);
  assert.equal(report.candidate.humanInterventions, 1);
  assert.equal(Object.hasOwn(report, 'savingsPercent'), false);
});

test('refuses ledgers that do not prove equal task and gate sets', (t) => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'cost-comparison-'));
  t.after(() => fs.rmSync(temporary, { recursive: true, force: true }));
  const first = path.join(temporary, 'first.json');
  const second = path.join(temporary, 'second.json');
  fs.writeFileSync(first, JSON.stringify({ taskGateFingerprint: 'a'.repeat(64), costs: [], events: [] }));
  fs.writeFileSync(second, JSON.stringify({ taskGateFingerprint: 'b'.repeat(64), costs: [], events: [] }));

  const comparison = spawnSync(process.execPath, [compareScript, first, second], { cwd: repositoryRoot, encoding: 'utf8' });

  assert.equal(comparison.status, 2);
  assert.match(comparison.stderr, /COST_COMPARISON_INCOMPARABLE/);
});
