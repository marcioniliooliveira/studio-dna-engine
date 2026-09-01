#!/usr/bin/env node
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

function comparisonError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function readJson(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); } catch { throw comparisonError('COST_LEDGER_INVALID', `Cannot read JSON ledger: ${filePath}`); }
}

function readJsonLines(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, 'utf8').trim();
  if (!text) return [];
  try { return text.split('\n').map((line) => JSON.parse(line)); } catch { throw comparisonError('COST_LEDGER_INVALID', `Cannot read JSONL ledger: ${filePath}`); }
}

function canonicalTaskGates(blueprint) {
  if (!Array.isArray(blueprint?.nodes) || blueprint.nodes.length === 0) return null;
  const tasks = blueprint.nodes.map((node) => {
    if (typeof node?.id !== 'string' || !Array.isArray(node.gates)) return null;
    return { id: node.id, gates: [...node.gates].sort() };
  });
  if (tasks.some((task) => task === null)) return null;
  return tasks.sort((left, right) => left.id.localeCompare(right.id));
}

function fingerprintFor(blueprint) {
  const tasks = canonicalTaskGates(blueprint);
  return tasks === null ? null : crypto.createHash('sha256').update(JSON.stringify(tasks)).digest('hex');
}

function normalizeEvents(entries) {
  return Array.isArray(entries) ? entries.map((entry) => ({ ...entry, ...(entry?.data && typeof entry.data === 'object' ? { data: entry.data } : {}) })) : [];
}

function normalizeCosts(entries) {
  return Array.isArray(entries) ? entries.map((entry) => (entry && Object.hasOwn(entry, 'usd') ? entry : entry?.data)) : [];
}

function readLedger(location) {
  const resolved = path.resolve(location);
  let ledger;
  if (fs.statSync(resolved).isDirectory()) {
    const events = normalizeEvents(readJsonLines(path.join(resolved, 'events.jsonl')));
    ledger = { events, costs: normalizeCosts(readJsonLines(path.join(resolved, 'costs.jsonl'))) };
  } else {
    ledger = readJson(resolved);
  }
  if (!ledger || typeof ledger !== 'object') throw comparisonError('COST_LEDGER_INVALID', 'Ledger must be an object');
  const events = normalizeEvents(ledger.events);
  const costs = normalizeCosts(ledger.costs);
  const blueprint = ledger.blueprint || events.find((event) => event?.type === 'BLUEPRINT_ACCEPTED')?.data?.blueprint;
  const fingerprint = fingerprintFor(blueprint);
  if (!fingerprint || (ledger.taskGateFingerprint !== undefined && ledger.taskGateFingerprint !== fingerprint)) {
    throw comparisonError('COST_COMPARISON_INCOMPARABLE', 'Ledger does not prove its task and gate set');
  }
  return { blueprint, fingerprint, events, costs };
}

function metrics(ledger) {
  const knownCosts = ledger.costs.filter((cost) => Number.isFinite(cost?.usd));
  const unknownCalls = ledger.costs.length - knownCosts.length;
  const passed = new Set(ledger.events.filter((event) => event?.type === 'TASK_PASSED').map((event) => event.data?.nodeId));
  const taskGates = canonicalTaskGates(ledger.blueprint);
  const gateTotal = taskGates.reduce((total, task) => total + task.gates.length, 0);
  const gatesPassed = taskGates.reduce((total, task) => total + (passed.has(task.id) ? task.gates.length : 0), 0);
  return {
    totalKnownUsd: Number(knownCosts.reduce((total, cost) => total + cost.usd, 0).toFixed(6)),
    unknownCalls,
    retries: ledger.costs.reduce((total, cost) => total + Math.max(0, (Number.isInteger(cost?.try) ? cost.try : 1) - 1), 0),
    gatePassRate: gateTotal === 0 ? null : Number((gatesPassed / gateTotal).toFixed(6)),
    humanInterventions: ledger.events.filter((event) => /^HUMAN_/.test(event?.type || '')).length
  };
}

function compare(baselineLedger, candidateLedger) {
  if (baselineLedger.fingerprint !== candidateLedger.fingerprint) {
    throw comparisonError('COST_COMPARISON_INCOMPARABLE', 'Ledgers have different task or gate sets');
  }
  const baseline = metrics(baselineLedger);
  const candidate = metrics(candidateLedger);
  const report = { comparable: true, taskGateFingerprint: baselineLedger.fingerprint, baseline, candidate };
  if (baseline.unknownCalls === 0 && candidate.unknownCalls === 0 && baseline.totalKnownUsd !== 0) {
    report.savingsPercent = Number((((baseline.totalKnownUsd - candidate.totalKnownUsd) / baseline.totalKnownUsd) * 100).toFixed(6));
  }
  return report;
}

function main(args) {
  if (args.length !== 2) throw comparisonError('COST_COMPARISON_ARGUMENTS', 'Usage: compare-execution-cost <baseline-ledger> <candidate-ledger>');
  return compare(readLedger(args[0]), readLedger(args[1]));
}

if (require.main === module) {
  try {
    process.stdout.write(`${JSON.stringify(main(process.argv.slice(2)))}\n`);
  } catch (error) {
    process.stderr.write(`${error.code || 'COST_COMPARISON_FAILED'}: ${error.message}\n`);
    process.exitCode = 2;
  }
}

module.exports = { canonicalTaskGates, fingerprintFor, readLedger, compare, main };
