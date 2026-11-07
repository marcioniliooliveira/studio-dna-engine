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

function symbolFromDeclaration(source, comments, declaration, exported, fallbackName) {
  if (declaration.type === 'FunctionDeclaration' && (declaration.id || fallbackName)) {
    return {
      name: declaration.id?.name || fallbackName,
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
  if (declaration.type === 'ClassDeclaration' && (declaration.id || fallbackName)) {
    return {
      name: declaration.id?.name || fallbackName,
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

function requireImport(declaration) {
  const imports = [];
  for (const entry of declaration.declarations) {
    const call = entry.init;
    if (
      call?.type !== 'CallExpression' || call.callee.type !== 'Identifier' || call.callee.name !== 'require'
      || call.arguments.length !== 1 || call.arguments[0].type !== 'Literal' || typeof call.arguments[0].value !== 'string'
    ) continue;
    let specifiers = [];
    if (entry.id.type === 'Identifier') specifiers = [entry.id.name];
    if (entry.id.type === 'ObjectPattern') {
      specifiers = entry.id.properties
        .filter((property) => property.type === 'Property' && property.value.type === 'Identifier')
        .map((property) => property.value.name);
    }
    if (specifiers.length > 0) imports.push({ source: call.arguments[0].value, specifiers });
  }
  return imports;
}

function commonJsExportAction(statement) {
  if (statement.type !== 'ExpressionStatement' || statement.expression.type !== 'AssignmentExpression') return null;
  const { left, right } = statement.expression;
  const isModuleExportsReference = right.type === 'MemberExpression' && !right.computed
    && right.object.type === 'Identifier' && right.object.name === 'module'
    && right.property.type === 'Identifier' && right.property.name === 'exports';
  if (left.type === 'Identifier' && left.name === 'exports') {
    return { type: isModuleExportsReference ? 'alias-restore' : 'alias-break', names: [] };
  }
  if (left.type !== 'MemberExpression' || left.computed) return null;
  const property = left.property.type === 'Identifier' ? left.property.name : null;
  const isModuleExports = left.object.type === 'Identifier' && left.object.name === 'module' && property === 'exports';
  const isExportsProperty = left.object.type === 'Identifier' && left.object.name === 'exports' && property;
  const isModuleExportsProperty = left.object.type === 'MemberExpression' && !left.object.computed
    && left.object.object.type === 'Identifier' && left.object.object.name === 'module'
    && left.object.property.type === 'Identifier' && left.object.property.name === 'exports' && property;
  if (isExportsProperty) return { type: 'property', names: [property], throughExportsAlias: true };
  if (isModuleExportsProperty) return { type: 'property', names: [property], throughExportsAlias: false };
  if (!isModuleExports) return null;
  if (right.type === 'ObjectExpression') {
    return {
      type: 'replace',
      names: right.properties
      .filter((property) => property.type === 'Property' && !property.computed)
      .map((property) => property.key.type === 'Identifier' ? property.key.name : property.key.value)
      .filter((name) => typeof name === 'string')
    };
  }
  return { type: 'replace', names: ['default'] };
}

function commonJsAssignmentSymbol(source, comments, statement, name) {
  return {
    name,
    kind: 'assignment',
    async: false,
    signature: `CommonJS export ${name}`,
    start: statement.start,
    end: statement.end,
    sliceStart: leadingCommentStart(source, comments, statement.start),
    startLine: statement.loc.start.line,
    endLine: statement.loc.end.line,
    exported: true
  };
}

function asArray(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function buildRecord(source, relativePath) {
  const { ast, comments } = parseSource(source, relativePath);
  const imports = [];
  const symbols = [];
  const exportedNames = new Set();
  const commonJsExportedNames = new Set();
  let exportsAliasActive = true;

  for (const statement of ast.body) {
    if (statement.type === 'ImportDeclaration') {
      imports.push({
        source: statement.source.value,
        specifiers: statement.specifiers.map((specifier) => specifier.local.name)
      });
      continue;
    }

    if (statement.type === 'VariableDeclaration') imports.push(...requireImport(statement));

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
      const entries = asArray(symbolFromDeclaration(source, comments, declaration, true, 'default'));
      if (entries.length === 0) {
        entries.push({
          name: 'default', kind: 'default', async: false, signature: 'default export',
          start: declaration.start, end: declaration.end,
          sliceStart: leadingCommentStart(source, comments, statement.start),
          startLine: declaration.loc.start.line, endLine: declaration.loc.end.line, exported: true
        });
      }
      entries.forEach((entry) => { entry.sliceStart = leadingCommentStart(source, comments, statement.start); });
      exportedNames.add('default');
      symbols.push(...entries);
      continue;
    }

    const commonJsAction = commonJsExportAction(statement);
    if (commonJsAction?.type === 'replace') {
      commonJsExportedNames.clear();
      exportsAliasActive = false;
    }
    if (commonJsAction?.type === 'alias-restore') exportsAliasActive = true;
    if (commonJsAction?.type === 'alias-break') exportsAliasActive = false;
    if (commonJsAction && (!commonJsAction.throughExportsAlias || exportsAliasActive)) {
      for (const name of commonJsAction.names) {
        commonJsExportedNames.add(name);
      const existing = symbols.find((entry) => entry.name === name);
      if (existing) existing.exported = true;
      else symbols.push(commonJsAssignmentSymbol(source, comments, statement, name));
      }
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
      exports: Object.freeze([...new Set([...exportedNames, ...commonJsExportedNames])].map((name) => Object.freeze({ name }))),
      symbols: Object.freeze(publicSymbols.map((entry) => Object.freeze({ ...entry })))
    })
  };
}

function createContextIndex({ projectRoot, allowedPaths }) {
  if (typeof projectRoot !== 'string' || !Array.isArray(allowedPaths)) {
    throw new TypeError('projectRoot and allowedPaths are required');
  }
  let root;
  try {
    root = fs.realpathSync(projectRoot);
  } catch {
    throw new TypeError('projectRoot must be an existing directory');
  }
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
    const pathSegments = relativePath.split('/');
    const absolutePath = path.resolve(root, ...pathSegments);
    const relativeToRoot = path.relative(root, absolutePath);
    if (relativeToRoot === '' || relativeToRoot === '..' || relativeToRoot.startsWith(`..${path.sep}`) || path.isAbsolute(relativeToRoot)) {
      throw contextError('CONTEXT_PATH_UNAUTHORIZED', 'Context path escapes project root');
    }
    let currentPath = root;
    for (const segment of pathSegments) {
      currentPath = path.join(currentPath, segment);
      try {
        if (fs.lstatSync(currentPath).isSymbolicLink()) {
          throw contextError('CONTEXT_PATH_UNAUTHORIZED', 'Context path contains a symlink or junction');
        }
      } catch (error) {
        if (error.code === 'CONTEXT_PATH_UNAUTHORIZED') throw error;
        break;
      }
    }
    try {
      const realTarget = fs.realpathSync(absolutePath);
      const targetRelative = path.relative(root, realTarget);
      if (targetRelative === '..' || targetRelative.startsWith(`..${path.sep}`) || path.isAbsolute(targetRelative)) {
        throw contextError('CONTEXT_PATH_UNAUTHORIZED', 'Context path resolves outside project root');
      }
    } catch (error) {
      if (error.code === 'CONTEXT_PATH_UNAUTHORIZED') throw error;
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
