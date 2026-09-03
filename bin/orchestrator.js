#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { ExecutionLedger } = require('../src/orchestration/execution-ledger');
const { validateBlueprint } = require('../src/orchestration/blueprint');

function args(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const item = argv[i];
    if (item.startsWith('--')) out[item.slice(2)] = argv[++i];
    else out._.push(item);
  }
  return out;
}
function required(value, name) { if (!value) throw new Error(`--${name} is required`); return path.resolve(value); }
function inputHash(blueprint) { return `sha256:${crypto.createHash('sha256').update(JSON.stringify(blueprint)).digest('hex')}`; }
function loadBlueprint(filename) { return validateBlueprint(JSON.parse(fs.readFileSync(filename, 'utf8'))); }
function saveLedger(filename, ledger) { ledger.save(filename); console.log(JSON.stringify({ ledgerPath: filename }, null, 2)); }

function main(argv = process.argv.slice(2)) {
  const parsed = args(argv);
  const command = parsed._[0];
  const ledgerPath = path.resolve(parsed.ledger || 'EXECUTION_LEDGER.json');
  if (!['start', 'inspect', 'resume', 'approve'].includes(command)) throw new Error('command must be start, inspect, resume or approve');
  if (command === 'inspect') { console.log(ExecutionLedger.load(ledgerPath).serialize()); return; }
  if (command === 'start') {
    const blueprint = loadBlueprint(required(parsed.blueprint, 'blueprint'));
    const ledger = fs.existsSync(ledgerPath) ? ExecutionLedger.load(ledgerPath) : new ExecutionLedger();
    if (!ledger.getRun(blueprint.runId)) ledger.createRun({ runId: blueprint.runId, taskId: `workflow:${blueprint.runId}`, model: parsed.model || 'gemini-3.7-flash', inputTokens: 0, outputTokens: 0, retries: 0, status: 'planned', gates: {}, artifactHash: 'pending', inputHash: inputHash(blueprint) });
    const planPath = `${ledgerPath}.blueprint.json`;
    fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
    fs.writeFileSync(planPath, JSON.stringify(blueprint, null, 2));
    saveLedger(ledgerPath, ledger); return;
  }
  const ledger = ExecutionLedger.load(ledgerPath);
  const runId = parsed.run || [...JSON.parse(ledger.serialize()).runs].at(-1)?.runId;
  if (!runId) throw new Error('--run is required when ledger has no runs');
  const run = ledger.getRun(runId);
  if (!run) throw new Error(`unknown run: ${runId}`);
  if (command === 'approve') ledger.updateRun(runId, { status: 'approved' });
  if (command === 'resume') { if (!['planned', 'paused', 'failed'].includes(run.status)) throw new Error(`run cannot resume from ${run.status}`); ledger.updateRun(runId, { status: 'running' }); }
  saveLedger(ledgerPath, ledger);
}

if (require.main === module) { try { main(); } catch (error) { console.error(`orchestrator: ${error.message}`); process.exitCode = 1; } }
module.exports = { main };
