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
    bindingPath: path.join(directory, 'task-package.sha256'),
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

async function readBinding(paths) {
  let expected;
  let serialized;
  try {
    [expected, serialized] = await Promise.all([
      fs.readFile(paths.bindingPath, 'utf8'),
      fs.readFile(paths.packagePath, 'utf8')
    ]);
  } catch {
    throw exchangeError('TASK_PACKAGE_BINDING_MISMATCH', 'Task package binding is unavailable');
  }
  if (!/^[a-f0-9]{64}$/.test(expected.trim()) || expected.trim() !== sha256(serialized)) {
    throw exchangeError('TASK_PACKAGE_BINDING_MISMATCH', 'Task package no longer matches its exported binding');
  }
  try {
    return JSON.parse(serialized);
  } catch {
    throw exchangeError('TASK_PACKAGE_BINDING_MISMATCH', 'Task package binding is not valid JSON');
  }
}

function parseResult(serialized) {
  let raw;
  try {
    raw = JSON.parse(serialized);
  } catch {
    throw exchangeError('TASK_RESULT_INVALID', 'Task result must be valid JSON');
  }
  try {
    return TaskResultWire.parse(raw);
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
    await fs.mkdir(paths.directory, { recursive: true });
    await writeAtomically(paths.packagePath, serialized);
    await writeAtomically(paths.bindingPath, sha256(serialized));
    exportedAt.set(`${compact.rid}/${compact.nid}`, now());
    return { status: 'awaiting_external_result', packagePath: paths.packagePath };
  }

  async function collectResult(runId, nodeId) {
    const paths = exchangePaths(root, runId, nodeId);
    const taskPackage = await readBinding(paths);
    let serialized;
    try {
      serialized = await fs.readFile(paths.resultPath, 'utf8');
    } catch {
      throw exchangeError('TASK_RESULT_INVALID', 'Task result is unavailable');
    }
    const result = parseResult(serialized);
    if (result.rid !== taskPackage.rid || result.cid !== taskPackage.cid || result.nid !== taskPackage.nid
      || result.rid !== runId || result.nid !== nodeId) {
      throw exchangeError('TASK_RESULT_SCOPE_MISMATCH', 'Task result does not belong to the exported task package');
    }
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
