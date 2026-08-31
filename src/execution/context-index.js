const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const acorn = require('acorn');
const walk = require('acorn-walk');

function contextError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function sha256(source) {
  return crypto.createHash('sha256').update(source).digest('hex');
}

function parseSource(source, relativePath) {
  const options = {
    ecmaVersion: 'latest',
    locations: true,
    onComment: []
  };
  try {
    const ast = acorn.parse(source, { ...options, sourceType: 'module' });
    walk.full(ast, () => {});
    return { ast, comments: options.onComment };
  } catch (moduleError) {
    const scriptOptions = { ...options, onComment: [] };
    try {
      const ast = acorn.parse(source, { ...scriptOptions, sourceType: 'script' });
      walk.full(ast, () => {});
      return { ast, comments: scriptOptions.onComment };
    } catch {
      throw contextError('CONTEXT_PARSE_FAILED', `Unable to parse allowed context file: ${relativePath}`);
    }
  }
}

function functionSignature(source, node) {
  const prefix = node.async ? 'async function' : 'function';
  const name = node.id?.name || '<anonymous>';
  const params = node.params.map((param) => source.slice(param.start, param.end)).join(', ');
  return `${prefix} ${name}(${params})`;
}

function classSignature(node) {
  return `class ${node.id?.name || '<anonymous>'}${node.superClass ? ' extends …' : ''}`;
}

function leadingCommentStart(source, comments, nodeStart) {
  const preceding = comments.filter((comment) => comment.end <= nodeStart).at(-1);
  if (!preceding || !/^\s*$/.test(source.slice(preceding.end, nodeStart))) return nodeStart;
  return preceding.start;
}

function symbolFromDeclaration(source, comments, declaration, exported) {
  if (declaration.type === 'FunctionDeclaration' && declaration.id) {
    return {
      name: declaration.id.name,
      kind: 'function',
      async: declaration.async,
      signature: functionSignature(source, declaration),
      start: declaration.start,
      end: declaration.end,
      sliceStart: leadingCommentStart(source, comments, declaration.start),
      startLine: declaration.loc.start.line,
      endLine: declaration.loc.end.line,
      exported
    };
  }
  if (declaration.type === 'ClassDeclaration' && declaration.id) {
    return {
      name: declaration.id.name,
      kind: 'class',
      async: false,
      signature: classSignature(declaration),
      start: declaration.start,
      end: declaration.end,
      sliceStart: leadingCommentStart(source, comments, declaration.start),
      startLine: declaration.loc.start.line,
      endLine: declaration.loc.end.line,
      exported
    };
  }
  if (declaration.type === 'VariableDeclaration') {
    return declaration.declarations
      .filter((entry) => entry.id.type === 'Identifier')
      .map((entry) => ({
        name: entry.id.name,
        kind: declaration.kind,
        async: false,
        signature: `${declaration.kind} ${entry.id.name}`,
        start: declaration.start,
        end: declaration.end,
        sliceStart: leadingCommentStart(source, comments, declaration.start),
        startLine: declaration.loc.start.line,
        endLine: declaration.loc.end.line,
        exported
      }));
  }
  return [];
}

function asArray(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function buildRecord(source, relativePath) {
  const { ast, comments } = parseSource(source, relativePath);
  const imports = [];
  const symbols = [];
  const exportedNames = new Set();

  for (const statement of ast.body) {
    if (statement.type === 'ImportDeclaration') {
      imports.push({
        source: statement.source.value,
        specifiers: statement.specifiers.map((specifier) => specifier.local.name)
      });
      continue;
    }

    if (statement.type === 'ExportNamedDeclaration') {
      if (statement.declaration) {
        const entries = asArray(symbolFromDeclaration(source, comments, statement.declaration, true));
        entries.forEach((entry) => { entry.sliceStart = leadingCommentStart(source, comments, statement.start); });
        entries.forEach((entry) => exportedNames.add(entry.name));
        symbols.push(...entries);
      }
      for (const specifier of statement.specifiers) exportedNames.add(specifier.exported.name);
      continue;
    }

    if (statement.type === 'ExportDefaultDeclaration') {
      const declaration = statement.declaration;
      const entries = asArray(symbolFromDeclaration(source, comments, declaration, true));
      entries.forEach((entry) => { entry.sliceStart = leadingCommentStart(source, comments, statement.start); });
      entries.forEach((entry) => exportedNames.add(entry.name));
      symbols.push(...entries);
      continue;
    }

    symbols.push(...asArray(symbolFromDeclaration(source, comments, statement, false)));
  }

  const publicSymbols = symbols.map(({ start, end, sliceStart, exported, ...summary }) => summary);
  return {
    sha256: sha256(source),
    source,
    symbols,
    summary: Object.freeze({
      path: relativePath,
      sha256: sha256(source),
      imports: Object.freeze(imports.map((entry) => Object.freeze({ ...entry, specifiers: Object.freeze([...entry.specifiers]) }))),
      exports: Object.freeze([...exportedNames].map((name) => Object.freeze({ name }))),
      symbols: Object.freeze(publicSymbols.map((entry) => Object.freeze({ ...entry })))
    })
  };
}

function createContextIndex({ projectRoot, allowedPaths }) {
  if (typeof projectRoot !== 'string' || !Array.isArray(allowedPaths)) {
    throw new TypeError('projectRoot and allowedPaths are required');
  }
  const root = path.resolve(projectRoot);
  const allowed = new Set(allowedPaths);
  const records = new Map();

  function resolveAllowedPath(relativePath) {
    if (
      typeof relativePath !== 'string' || relativePath.length === 0 || path.isAbsolute(relativePath)
      || relativePath.includes('\\') || relativePath.split('/').some((segment) => !segment || segment === '.' || segment === '..')
      || !allowed.has(relativePath)
    ) {
      throw contextError('CONTEXT_PATH_UNAUTHORIZED', 'Context path is not allow-listed');
    }
    const absolutePath = path.resolve(root, ...relativePath.split('/'));
    if (path.relative(root, absolutePath).startsWith('..') || path.relative(root, absolutePath) === '') {
      throw contextError('CONTEXT_PATH_UNAUTHORIZED', 'Context path escapes project root');
    }
    return absolutePath;
  }

  function indexFile(relativePath) {
    const absolutePath = resolveAllowedPath(relativePath);
    let source;
    try {
      source = fs.readFileSync(absolutePath, 'utf8');
    } catch {
      throw contextError('CONTEXT_READ_FAILED', `Unable to read allowed context file: ${relativePath}`);
    }
    const currentHash = sha256(source);
    const cached = records.get(relativePath);
    if (cached?.sha256 === currentHash) return cached.summary;
    const record = buildRecord(source, relativePath);
    records.set(relativePath, record);
    return record.summary;
  }

  function currentRecord(relativePath) {
    indexFile(relativePath);
    return records.get(relativePath);
  }

  function getSummary(relativePath) {
    return currentRecord(relativePath).summary;
  }

  function readSymbol(relativePath, symbol) {
    const record = currentRecord(relativePath);
    const entry = record.symbols.find((candidate) => candidate.name === symbol);
    if (!entry) throw contextError('CONTEXT_SYMBOL_NOT_FOUND', `Symbol is not indexed: ${symbol}`);
    return record.source.slice(entry.sliceStart, entry.end);
  }

  function readLines(relativePath, start, end) {
    const record = currentRecord(relativePath);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start) {
      throw contextError('CONTEXT_LINE_RANGE_INVALID', 'Context line range is invalid');
    }
    const lines = record.source.split(/\r?\n/);
    const lineCount = lines.at(-1) === '' ? lines.length - 1 : lines.length;
    if (end > lineCount) throw contextError('CONTEXT_LINE_RANGE_INVALID', 'Context line range exceeds file bounds');
    return lines.slice(start - 1, end).join('\n');
  }

  return { indexFile, getSummary, readSymbol, readLines };
}

module.exports = { createContextIndex };
