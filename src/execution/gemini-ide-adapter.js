const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const path = require('node:path');
const { TaskResultWire } = require('../orchestration/contracts');
const { assertSafeSlug } = require('../server/security');

const PACKAGE_KEYS = ['v', 'rid', 'cid', 'nid', 'k', 'ni', 'in', 'p', 'out', 'tl', 'g', 'b'];

function exchangeError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function sha256(contents) {
  return crypto.createHash('sha256').update(contents).digest('hex');
}

function exchangePaths(exchangeDir, runId, nodeId) {
  const rid = assertSafeSlug(runId);
  const nid = assertSafeSlug(nodeId);
  const directory = path.resolve(exchangeDir, rid, nid);
  const root = path.resolve(exchangeDir);
  if (!directory.startsWith(root + path.sep)) {
    throw exchangeError('TASK_EXCHANGE_SCOPE_INVALID', 'Task exchange path escapes its root');
  }
  return {
    directory,
    packagePath: path.join(directory, 'task-package.json'),
    manifestPath: path.join(directory, 'task-package.manifest.json'),
    resultPath: path.join(directory, 'task-result.json')
  };
}

function compactPackage(taskPackage) {
  if (!taskPackage || typeof taskPackage !== 'object' || Array.isArray(taskPackage)) {
    throw exchangeError('TASK_PACKAGE_INVALID', 'Task package must be an object');
  }
  const packageForExchange = {};
  for (const key of PACKAGE_KEYS) {
    if (!Object.hasOwn(taskPackage, key)) {
      throw exchangeError('TASK_PACKAGE_INVALID', `Task package is missing ${key}`);
    }
    packageForExchange[key] = structuredClone(taskPackage[key]);
  }
  if (Object.hasOwn(taskPackage, 'ctx')) {
    const context = taskPackage.ctx;
    if (!context || typeof context !== 'object' || Array.isArray(context)
      || Object.keys(context).length !== 1 || typeof context.summary !== 'string') {
      throw exchangeError('TASK_PACKAGE_CONTEXT_INVALID', 'Task package context must contain only a summary');
    }
    packageForExchange.ctx = { summary: context.summary };
  }
  try {
    assertSafeSlug(packageForExchange.rid);
    assertSafeSlug(packageForExchange.cid);
    assertSafeSlug(packageForExchange.nid);
  } catch {
    throw exchangeError('TASK_PACKAGE_SCOPE_INVALID', 'Task package has an unsafe scope');
  }
  return packageForExchange;
}

async function writeAtomically(filePath, contents) {
  const temporaryPath = `${filePath}.${crypto.randomUUID()}.tmp`;
  await fs.writeFile(temporaryPath, contents, { encoding: 'utf8', flag: 'wx' });
  await fs.rename(temporaryPath, filePath);
}

function bindingFor(serialized) {
  return { sha: sha256(serialized), nonce: crypto.randomUUID() };
}

function validBinding(binding) {
  return binding && typeof binding === 'object' && !Array.isArray(binding)
    && Object.keys(binding).length === 2 && /^[a-f0-9]{64}$/.test(binding.sha)
    && typeof binding.nonce === 'string' && /^[0-9a-f]{8}-[0-9a-f-]{27}$/.test(binding.nonce);
}

async function readExport(paths) {
  let manifestSerialized;
  let serialized;
  try {
    [manifestSerialized, serialized] = await Promise.all([
      fs.readFile(paths.manifestPath, 'utf8'),
      fs.readFile(paths.packagePath, 'utf8')
    ]);
  } catch {
    throw exchangeError('TASK_PACKAGE_BINDING_MISMATCH', 'Task package binding is unavailable');
  }
  let manifest;
  try {
    manifest = JSON.parse(manifestSerialized);
  } catch {
    throw exchangeError('TASK_PACKAGE_BINDING_MISMATCH', 'Task package manifest is not valid JSON');
  }
  if (!manifest || manifest.v !== 1 || !validBinding(manifest.binding) || manifest.package !== 'task-package.json'
    || Object.keys(manifest).length !== 3 || manifest.binding.sha !== sha256(serialized)) {
    throw exchangeError('TASK_PACKAGE_BINDING_MISMATCH', 'Task package no longer matches its exported binding');
  }
  try {
    return { taskPackage: JSON.parse(serialized), binding: manifest.binding };
  } catch {
    throw exchangeError('TASK_PACKAGE_BINDING_MISMATCH', 'Task package binding is not valid JSON');
  }
}

function parseResult(serialized, expectedBinding) {
  let raw;
  try {
    raw = JSON.parse(serialized);
  } catch {
    throw exchangeError('TASK_RESULT_INVALID', 'Task result must be valid JSON');
  }
  if (!raw || raw.v !== 1 || !validBinding(raw.binding) || !Object.hasOwn(raw, 'result')
    || Object.keys(raw).length !== 3) {
    throw exchangeError('TASK_RESULT_INVALID', 'Task result envelope is invalid');
  }
  if (raw.binding.sha !== expectedBinding.sha || raw.binding.nonce !== expectedBinding.nonce) {
    throw exchangeError('TASK_RESULT_BINDING_MISMATCH', 'Task result is bound to a different export generation');
  }
  try {
    return TaskResultWire.parse(raw.result);
  } catch {
    throw exchangeError('TASK_RESULT_INVALID', 'Task result does not match TaskResultWire');
  }
}

function usageFor(result) {
  return {
    inputTokens: result.use.it,
    outputTokens: result.use.ot,
    usd: null,
    estimated: false
  };
}

function assertResultScope(result, taskPackage) {
  const outputs = new Set(taskPackage.out);
  if (!Array.isArray(taskPackage.out) || result.art.some((artifact) => !outputs.has(artifact.id))) {
    throw exchangeError('TASK_RESULT_ARTIFACT_SCOPE_VIOLATION', 'Task result contains an undeclared artifact');
  }
  const allowedPaths = new Set(taskPackage.p);
  if (!Array.isArray(taskPackage.p) || result.chg.some((changedPath) => !allowedPaths.has(changedPath))) {
    throw exchangeError('TASK_RESULT_CHANGE_SCOPE_VIOLATION', 'Task result changes a path outside the task scope');
  }
}

function createGeminiIdeAdapter({ exchangeDir, now = Date.now } = {}) {
  if (typeof exchangeDir !== 'string' || exchangeDir.length === 0 || typeof now !== 'function') {
    throw new TypeError('exchangeDir and now are required');
  }
  const root = path.resolve(exchangeDir);
  const exportedAt = new Map();

  async function execute(taskPackage) {
    const compact = compactPackage(taskPackage);
    const paths = exchangePaths(root, compact.rid, compact.nid);
    const serialized = JSON.stringify(compact);
    const binding = bindingFor(serialized);
    await fs.mkdir(paths.directory, { recursive: true });
    await writeAtomically(paths.packagePath, serialized);
    await writeAtomically(paths.manifestPath, JSON.stringify({ v: 1, binding, package: 'task-package.json' }));
    exportedAt.set(`${compact.rid}/${compact.nid}`, now());
    return { status: 'awaiting_external_result', packagePath: paths.packagePath };
  }

  async function collectResult(runId, nodeId) {
    const paths = exchangePaths(root, runId, nodeId);
    const exported = await readExport(paths);
    let serialized;
    try {
      serialized = await fs.readFile(paths.resultPath, 'utf8');
    } catch {
      throw exchangeError('TASK_RESULT_INVALID', 'Task result is unavailable');
    }
    const result = parseResult(serialized, exported.binding);
    const taskPackage = exported.taskPackage;
    if (result.rid !== taskPackage.rid || result.cid !== taskPackage.cid || result.nid !== taskPackage.nid
      || result.rid !== runId || result.nid !== nodeId) {
      throw exchangeError('TASK_RESULT_SCOPE_MISMATCH', 'Task result does not belong to the exported task package');
    }
    assertResultScope(result, taskPackage);
    const startedAt = exportedAt.get(`${runId}/${nodeId}`);
    const elapsed = Number.isFinite(startedAt) ? Math.max(0, now() - startedAt) : 0;
    const usage = usageFor(result);
    return {
      result,
      usage,
      costEvent: {
        v: 1, rid: result.rid, nid: result.nid, m: 'gemini-ide', svc: 'ide',
        it: result.use.it, ct: result.use.ct, ot: result.use.ot,
        ms: elapsed, try: 1, usd: usage.usd, est: usage.estimated
      }
    };
  }

  return Object.freeze({ identity: 'gemini-ide', execute, collectResult });
}

module.exports = { createGeminiIdeAdapter };
