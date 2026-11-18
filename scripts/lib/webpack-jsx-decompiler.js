/**
 * scripts/lib/webpack-jsx-decompiler.js
 *
 * AST-based Webpack React module slicer and JSX decompiler using Acorn.
 * Converts compiled Next.js/Webpack React component modules (Default & Sorbet)
 * back into readable ES/JSX source with resolved hooks, Motion, Hugeicons, and SVG icon paths.
 */

'use strict';

const acorn = require('acorn');
const walk = require('acorn-walk');

const KNOWN_RUNTIME_MODULES = {
  '95155': 'jsx-runtime',
  '12115': 'react',
  '59248': 'react-dom/client',
  '22728': '@hugeicons/react',
  '39551': 'motion/react:motion',
  '47962': 'motion/react:AnimatePresence',
  '50969': 'motion/react:useReducedMotion',
  '4670': 'd3-shape:curveMonotoneX',
  '40144': 'd3-shape:area',
  '44439': 'd3-shape:arc',
  '46667': 'd3-shape:line',
  '67133': 'd3-shape:pie',
  '70255': 'd3-shape:stack',
  '62859': 'd3-shape:stackOffsetExpand',
  '34177': 'd3-shape:stackOrderNone',
  '50098': 'd3-shape:stackOrderAscending',
  '19543': 'shiki',
  '34419': 'shiki:codeToTokens',
  '7775': 'node:buffer'
};

/**
 * Extracts icon array literal from a Hugeicons webpack icon module string.
 */
function extractIconPayload(iconModSource) {
  if (!iconModSource) return null;
  const idx = iconModSource.indexOf('[[');
  if (idx === -1) return null;
  const endIdx = iconModSource.lastIndexOf(']]');
  if (endIdx === -1 || endIdx < idx) return null;
  return iconModSource.slice(idx, endIdx + 2);
}

/**
 * Parses a Webpack module function string `(e,t,r)=>{...}` and returns its AST body + param names.
 */
function parseWebpackModule(fnStr) {
  const wrapped = `(${fnStr})`;
  const ast = acorn.parse(wrapped, { ecmaVersion: 'latest' });
  const fnNode = ast.body[0]?.expression;
  if (!fnNode || (fnNode.type !== 'ArrowFunctionExpression' && fnNode.type !== 'FunctionExpression')) {
    throw new Error('Expected Webpack module wrapper function');
  }
  return {
    wrapped,
    fnNode,
    modParam: fnNode.params[0]?.name || 'e',
    exportsParam: fnNode.params[1]?.name || 't',
    reqParam: fnNode.params[2]?.name || 'r',
    statements: fnNode.body.type === 'BlockStatement' ? fnNode.body.body : []
  };
}

/**
 * Collects all synchronous `reqParam(id)` dependency module IDs from a module AST.
 */
function extractSyncDependencies(fnStr) {
  try {
    const { fnNode, reqParam } = parseWebpackModule(fnStr);
    const deps = new Set();
    walk.simple(fnNode.body, {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          node.callee.name === reqParam &&
          node.arguments.length === 1 &&
          node.arguments[0].type === 'Literal' &&
          (typeof node.arguments[0].value === 'number' || typeof node.arguments[0].value === 'string')
        ) {
          deps.add(String(node.arguments[0].value));
        }
      }
    });
    return Array.from(deps);
  } catch {
    return [];
  }
}

/**
 * Finds the binding name of a statement (`var x = ...` or `function x() {}` or `let a = ..., b = ...`).
 */
function getDeclaredNames(stmt) {
  const names = [];
  if (stmt.type === 'FunctionDeclaration' && stmt.id) {
    names.push(stmt.id.name);
  } else if (stmt.type === 'ClassDeclaration' && stmt.id) {
    names.push(stmt.id.name);
  } else if (stmt.type === 'VariableDeclaration') {
    for (const decl of stmt.declarations) {
      walkPatternNames(decl.id, names);
    }
  }
  return names;
}

function walkPatternNames(pattern, out) {
  if (!pattern) return;
  if (pattern.type === 'Identifier') out.push(pattern.name);
  else if (pattern.type === 'ObjectPattern') {
    for (const prop of pattern.properties) {
      walkPatternNames(prop.type === 'RestElement' ? prop.argument : prop.value, out);
    }
  } else if (pattern.type === 'ArrayPattern') {
    for (const el of pattern.elements) walkPatternNames(el, out);
  } else if (pattern.type === 'AssignmentPattern') {
    walkPatternNames(pattern.left, out);
  } else if (pattern.type === 'RestElement') {
    walkPatternNames(pattern.argument, out);
  }
}

/**
 * Collects free identifier names referenced inside an AST subtree.
 */
function collectReferencedIdentifiers(node) {
  const refs = new Set();
  walk.ancestor(node, {
    Identifier(idNode, ancestors) {
      const parent = ancestors[ancestors.length - 2];
      if (!parent) return;
      if (parent.type === 'MemberExpression' && parent.property === idNode && !parent.computed) return;
      if (parent.type === 'Property' && parent.key === idNode && !parent.computed) return;
      if (parent.type === 'MethodDefinition' && parent.key === idNode && !parent.computed) return;
      if (parent.type === 'LabeledStatement' && parent.label === idNode) return;
      refs.add(idNode.name);
    }
  });
  return refs;
}

/**
 * Checks whether a node is `(0, obj.prop)` (Webpack indirect member call) or `obj.prop`.
 */
function unwrapIndirectMember(node) {
  if (
    node &&
    node.type === 'SequenceExpression' &&
    node.expressions.length === 2 &&
    node.expressions[0].type === 'Literal' &&
    node.expressions[0].value === 0 &&
    node.expressions[1].type === 'MemberExpression'
  ) {
    return node.expressions[1];
  }
  if (node && node.type === 'MemberExpression') {
    return node;
  }
  return null;
}

function escapeJsxAttrString(str) {
  if (!str.includes('"') && !str.includes('\n') && !str.includes('\r')) {
    return `"${str}"`;
  }
  return `{${JSON.stringify(str)}}`;
}

function escapeJsxText(str) {
  if (str.length === 0) return '';
  if (/^\s|\s$/.test(str) || /[{<>}]/.test(str) || str.includes('\n')) {
    return `{${JSON.stringify(str)}}`;
  }
  return str;
}

function isValidJsxAttrName(name) {
  return /^[a-zA-Z_$][a-zA-Z0-9_$-]*$/.test(name);
}

function isWebpackMetaCall(expr, reqParam) {
  return (
    expr &&
    expr.type === 'CallExpression' &&
    expr.callee.type === 'MemberExpression' &&
    expr.callee.object.name === reqParam &&
    (expr.callee.property.name === 'r' || expr.callee.property.name === 'd')
  );
}

function extractWebpackExports(statements, reqParam) {
  const exportsMap = {};
  for (const stmt of statements) {
    if (stmt.type !== 'ExpressionStatement') continue;
    const exprs =
      stmt.expression.type === 'SequenceExpression'
        ? stmt.expression.expressions
        : [stmt.expression];
    for (const expr of exprs) {
      if (
        isWebpackMetaCall(expr, reqParam) &&
        expr.callee.property.name === 'd' &&
        expr.arguments[1]?.type === 'ObjectExpression'
      ) {
        for (const p of expr.arguments[1].properties) {
          const key = p.key.name || p.key.value;
          if (key && p.value.type === 'ArrowFunctionExpression' && p.value.body.type === 'Identifier') {
            exportsMap[key] = p.value.body.name;
          }
        }
      }
    }
  }
  return exportsMap;
}

/**
 * Decompiles an AST module (or sliced Sorbet component) into readable React/JSX source.
 */
function decompileStatementsToJsx({
  wrapped,
  statements,
  reqParam,
  exportExprNode,
  exportName,
  allModulesMap,
  componentSlug
}) {
  const importMap = new Map(); // varName -> { depId, kind }
  const nonImportStatements = [];
  const reactHooksUsed = new Set();
  const motionFeaturesUsed = new Set();
  const d3ImportsUsed = new Map();
  const iconsUsed = new Map(); // depId -> iconVarName
  let usesHugeicons = false;

  // 1. Identify reqParam(id) bindings and skip r.r(t) / r.d(t, ...) boilerplate (including SequenceExpressions)
  for (const stmt of statements) {
    if (stmt.type === 'ExpressionStatement') {
      const exprs =
        stmt.expression.type === 'SequenceExpression'
          ? stmt.expression.expressions
          : [stmt.expression];
      const kept = exprs.filter(ex => !isWebpackMetaCall(ex, reqParam));
      if (kept.length === 0) continue;
      if (kept.length !== exprs.length) {
        nonImportStatements.push({
          type: 'ExpressionStatement',
          start: kept[0].start,
          end: kept[kept.length - 1].end,
          expression:
            kept.length === 1
              ? kept[0]
              : {
                  type: 'SequenceExpression',
                  start: kept[0].start,
                  end: kept[kept.length - 1].end,
                  expressions: kept
                }
        });
        continue;
      }
    }

    if (stmt.type === 'VariableDeclaration') {
      const keptDecls = [];
      for (const decl of stmt.declarations) {
        if (
          decl.id.type === 'Identifier' &&
          decl.init &&
          decl.init.type === 'CallExpression' &&
          decl.init.callee.type === 'Identifier' &&
          decl.init.callee.name === reqParam &&
          decl.init.arguments.length === 1 &&
          decl.init.arguments[0].type === 'Literal'
        ) {
          const depId = String(decl.init.arguments[0].value);
          importMap.set(decl.id.name, { depId, kind: KNOWN_RUNTIME_MODULES[depId] || 'module' });
          continue;
        }
        // Also handle `var s = r.n(l)`
        if (
          decl.id.type === 'Identifier' &&
          decl.init &&
          decl.init.type === 'CallExpression' &&
          decl.init.callee.type === 'MemberExpression' &&
          decl.init.callee.object.name === reqParam &&
          decl.init.callee.property.name === 'n' &&
          decl.init.arguments[0]?.type === 'Identifier' &&
          importMap.has(decl.init.arguments[0].name)
        ) {
          importMap.set(decl.id.name, importMap.get(decl.init.arguments[0].name));
          continue;
        }
        keptDecls.push(decl);
      }
      if (keptDecls.length === 0) continue;
      if (keptDecls.length !== stmt.declarations.length) {
        // Clone partial variable declaration
        nonImportStatements.push({
          ...stmt,
          declarations: keptDecls
        });
        continue;
      }
    }

    nonImportStatements.push(stmt);
  }

  function isJsxRuntimeMember(member, expectedNames) {
    if (!member || member.type !== 'MemberExpression' || member.object.type !== 'Identifier') return false;
    const imp = importMap.get(member.object.name);
    if (!imp || imp.kind !== 'jsx-runtime') return false;
    return expectedNames.includes(member.property.name);
  }

  function resolveKnownMember(member) {
    if (!member || member.type !== 'MemberExpression' || member.object.type !== 'Identifier') return null;
    const imp = importMap.get(member.object.name);
    if (!imp) return null;
    const prop = member.property.name;

    if (imp.kind === 'react') {
      if (prop === 'default') return 'React';
      reactHooksUsed.add(prop);
      return prop;
    }
    if (imp.kind === '@hugeicons/react' && prop === 'n') {
      usesHugeicons = true;
      return 'HugeiconsIcon';
    }
    if (imp.kind === 'motion/react:motion' && prop === 'P') {
      motionFeaturesUsed.add('motion');
      return 'motion';
    }
    if (imp.kind === 'motion/react:AnimatePresence' && prop === 'N') {
      motionFeaturesUsed.add('AnimatePresence');
      return 'AnimatePresence';
    }
    if (imp.kind === 'motion/react:useReducedMotion' && prop === 'I') {
      motionFeaturesUsed.add('useReducedMotion');
      return 'useReducedMotion';
    }
    if (imp.kind && imp.kind.startsWith('d3-shape:') && prop === 'A') {
      const fnName = imp.kind.split(':')[1];
      d3ImportsUsed.set(fnName, fnName);
      return fnName;
    }
    if (imp.kind === 'module') {
      const payload = extractIconPayload(allModulesMap[imp.depId]);
      if (payload && prop === 'A') {
        const iconName = `Icon_${imp.depId}`;
        if (!iconsUsed.has(imp.depId)) {
          iconsUsed.set(imp.depId, { name: iconName, payload });
        }
        return iconName;
      }
    }
    return null;
  }

  function transformTag(tagNode) {
    if (tagNode.type === 'Literal' && typeof tagNode.value === 'string') {
      return tagNode.value;
    }
    const member = unwrapIndirectMember(tagNode);
    if (member) {
      if (isJsxRuntimeMember(member, ['Fragment'])) {
        return '';
      }
      const resolved = resolveKnownMember(member);
      if (resolved) return resolved;
      // Check nested like o.P.div -> motion.div
      if (member.object.type === 'MemberExpression') {
        const baseResolved = resolveKnownMember(member.object);
        if (baseResolved) return `${baseResolved}.${member.property.name}`;
      }
    }
    return transformNode(tagNode);
  }

  function transformJsxCall(callNode, indent = 0) {
    const [tagNode, propsNode, keyNode] = callNode.arguments;
    const tagName = transformTag(tagNode);
    const isFragment = tagName === '';

    let childrenProp = null;
    const attrParts = [];

    if (keyNode) {
      attrParts.push(`key={${transformNode(keyNode, indent)}}`);
    }

    if (propsNode && propsNode.type === 'ObjectExpression') {
      for (const prop of propsNode.properties) {
        if (prop.type === 'SpreadElement') {
          attrParts.push(`{...${transformNode(prop.argument, indent)}}`);
          continue;
        }
        const keyName =
          prop.key.type === 'Identifier'
            ? prop.key.name
            : prop.key.type === 'Literal'
              ? String(prop.key.value)
              : null;

        if (!keyName || prop.computed) {
          // Computed property in props -> spread single object
          attrParts.push(`{...{ [${transformNode(prop.key, indent)}]: ${transformNode(prop.value, indent)} }}`);
          continue;
        }

        if (keyName === 'children') {
          childrenProp = prop.value;
          continue;
        }

        const attrKey = isValidJsxAttrName(keyName) ? keyName : null;
        if (!attrKey) {
          attrParts.push(`{...{ ${JSON.stringify(keyName)}: ${transformNode(prop.value, indent)} }}`);
          continue;
        }

        if (prop.value.type === 'Literal' && typeof prop.value.value === 'string') {
          attrParts.push(`${attrKey}=${escapeJsxAttrString(prop.value.value)}`);
        } else if (
          prop.value.type === 'UnaryExpression' &&
          prop.value.operator === '!' &&
          prop.value.argument.type === 'Literal' &&
          prop.value.argument.value === 0
        ) {
          attrParts.push(attrKey);
        } else if (prop.value.type === 'Literal' && prop.value.value === true) {
          attrParts.push(attrKey);
        } else {
          attrParts.push(`${attrKey}={${transformNode(prop.value, indent)}}`);
        }
      }
    } else if (propsNode) {
      attrParts.push(`{...${transformNode(propsNode, indent)}}`);
    }

    const attrsStr = attrParts.length > 0 ? ' ' + attrParts.join(' ') : '';
    const openTag = isFragment ? (attrParts.length > 0 ? `<React.Fragment${attrsStr}>` : '<>') : `<${tagName}${attrsStr}`;
    const closeTag = isFragment ? (attrParts.length > 0 ? '</React.Fragment>' : '</>') : `</${tagName}>`;

    if (isFragment && attrParts.length > 0) {
      reactHooksUsed.add('default');
    }

    if (!childrenProp) {
      return isFragment ? `${openTag}${closeTag}` : `${openTag} />`;
    }

    const pad = '  '.repeat(indent);
    const childPad = '  '.repeat(indent + 1);

    function renderChild(cNode) {
      const m = cNode.type === 'CallExpression' ? unwrapIndirectMember(cNode.callee) : null;
      if (m && isJsxRuntimeMember(m, ['jsx', 'jsxs', 'jsxDEV'])) {
        return transformJsxCall(cNode, indent + 1);
      }
      if (cNode.type === 'Literal' && typeof cNode.value === 'string') {
        return escapeJsxText(cNode.value);
      }
      if (cNode.type === 'Literal' && (typeof cNode.value === 'number' || typeof cNode.value === 'boolean')) {
        return String(cNode.value);
      }
      return `{${transformNode(cNode, indent + 1)}}`;
    }

    let renderedChildren = [];
    if (childrenProp.type === 'ArrayExpression') {
      renderedChildren = childrenProp.elements.filter(Boolean).map(renderChild);
    } else {
      renderedChildren = [renderChild(childrenProp)];
    }

    const singleInline =
      renderedChildren.length === 1 &&
      !renderedChildren[0].includes('\n') &&
      renderedChildren[0].length < 80;

    if (singleInline) {
      return `${isFragment ? openTag : `${openTag}>`}${renderedChildren[0]}${closeTag}`;
    }

    const body = renderedChildren.map(ch => `${childPad}${ch}`).join('\n');
    return `${isFragment ? openTag : `${openTag}>`}\n${body}\n${pad}${closeTag}`;
  }

  function needsParensForJsx(parent, child) {
    if (!parent) return false;
    return parent.type === 'ReturnStatement' || parent.type === 'ArrowFunctionExpression';
  }

  function transformNode(node, indent = 0, parent = null) {
    if (!node) return '';

    // 1. Convert !0 -> true, !1 -> false
    if (
      node.type === 'UnaryExpression' &&
      node.operator === '!' &&
      node.argument.type === 'Literal' &&
      (node.argument.value === 0 || node.argument.value === 1)
    ) {
      return node.argument.value === 0 ? 'true' : 'false';
    }

    // 2. Convert void 0 -> undefined
    if (
      node.type === 'UnaryExpression' &&
      node.operator === 'void' &&
      node.argument.type === 'Literal' &&
      node.argument.value === 0
    ) {
      return 'undefined';
    }

    // 3. CallExpression: JSX calls or indirect module calls `(0, n.useState)(...)`
    if (node.type === 'CallExpression') {
      const calleeMember = unwrapIndirectMember(node.callee);
      if (calleeMember && isJsxRuntimeMember(calleeMember, ['jsx', 'jsxs', 'jsxDEV'])) {
        const jsxOut = transformJsxCall(node, indent);
        if (needsParensForJsx(parent, node) && jsxOut.includes('\n')) {
          return `(\n${'  '.repeat(indent + 1)}${jsxOut.replace(/\n/g, `\n${'  '.repeat(indent + 1)}`)}\n${'  '.repeat(indent)})`;
        }
        return jsxOut;
      }
      if (calleeMember) {
        const resolved = resolveKnownMember(calleeMember);
        if (resolved) {
          const args = node.arguments.map(a => transformNode(a, indent, node)).join(', ');
          return `${resolved}(${args})`;
        }
      }
    }

    // 4. MemberExpression matching React/Motion/Icon/D3
    if (node.type === 'MemberExpression') {
      const resolved = resolveKnownMember(node);
      if (resolved) return resolved;
      if (node.object.type === 'MemberExpression') {
        const baseResolved = resolveKnownMember(node.object);
        if (baseResolved) return `${baseResolved}.${node.property.name}`;
      }
    }

    // 5. ReturnStatement formatting when returning JSX
    if (node.type === 'ReturnStatement' && node.argument) {
      const argStr = transformNode(node.argument, indent, node);
      return `return ${argStr};`;
    }

    // 6. BlockStatement formatting (line-by-line statements)
    if (node.type === 'BlockStatement') {
      if (node.body.length === 0) return '{}';
      const innerPad = '  '.repeat(indent + 1);
      const outerPad = '  '.repeat(indent);
      const lines = node.body.map(st => `${innerPad}${transformNode(st, indent + 1, node)}`);
      return `{\n${lines.join('\n')}\n${outerPad}}`;
    }

    // 7. Generic top-down splice preserving exact original syntax for all other AST nodes
    const children = getDirectChildNodes(node);
    if (children.length === 0) {
      return wrapped.slice(node.start, node.end);
    }

    // Sort children by start offset
    children.sort((a, b) => a.start - b.start);
    let out = '';
    let cursor = node.start;
    for (const ch of children) {
      if (ch.start < cursor) continue;
      out += wrapped.slice(cursor, ch.start);
      out += transformNode(ch, indent, node);
      cursor = ch.end;
    }
    out += wrapped.slice(cursor, node.end);
    return out;
  }

  // Transform all kept top-level statements
  const bodyChunks = [];
  for (const stmt of nonImportStatements) {
    if (stmt.type === 'VariableDeclaration' && stmt.declarations.some(d => !d.init)) {
      // Regular VariableDeclaration slice handled cleanly
      const parts = stmt.declarations.map(d => {
        const idStr = wrapped.slice(d.id.start, d.id.end);
        return d.init ? `${idStr} = ${transformNode(d.init, 0, d)}` : idStr;
      });
      bodyChunks.push(`${stmt.kind} ${parts.join(', ')};`);
    } else if (stmt.type === 'VariableDeclaration') {
      const parts = stmt.declarations.map(d => {
        const idStr = wrapped.slice(d.id.start, d.id.end);
        return d.init ? `${idStr} = ${transformNode(d.init, 0, d)}` : idStr;
      });
      bodyChunks.push(`${stmt.kind} ${parts.join(',\n  ')};`);
    } else {
      bodyChunks.push(transformNode(stmt, 0, null));
    }
  }

  // If Sorbet component was an inline expression inside components map (`"ai-chat-9": function() { ... }`), emit it cleanly
  let exportLine = '';
  if (exportExprNode) {
    if (exportExprNode.type === 'Identifier') {
      exportLine = `export default ${exportExprNode.name};`;
    } else {
      const compBody = transformNode(exportExprNode, 0, null);
      const cleanName = componentSlug.replace(/[^a-zA-Z0-9]/g, '_') + '_Component';
      if (exportExprNode.type === 'FunctionExpression' && !exportExprNode.id) {
        exportLine = `export default ${compBody.replace(/^function\s*\(/, `function ${cleanName}(`)}`;
      } else {
        exportLine = `const ${cleanName} = ${compBody};\nexport default ${cleanName};`;
      }
    }
  } else if (exportName) {
    exportLine = `export default ${exportName};`;
  }

  // Build ES Import Header
  const importLines = [];
  const hookList = Array.from(reactHooksUsed).filter(h => h !== 'default').sort();
  if (hookList.length > 0 || reactHooksUsed.has('default')) {
    const namedPart = hookList.length > 0 ? `{ ${hookList.join(', ')} }` : '';
    importLines.push(
      namedPart ? `import React, ${namedPart} from 'react';` : `import React from 'react';`
    );
  } else {
    importLines.push(`import React from 'react';`);
  }

  if (usesHugeicons) {
    importLines.push(`import { HugeiconsIcon } from '@hugeicons/react';`);
  }
  if (motionFeaturesUsed.size > 0) {
    importLines.push(`import { ${Array.from(motionFeaturesUsed).sort().join(', ')} } from 'motion/react';`);
  }
  if (d3ImportsUsed.size > 0) {
    importLines.push(`import { ${Array.from(d3ImportsUsed.keys()).sort().join(', ')} } from 'd3-shape';`);
  }

  const iconDecls = Array.from(iconsUsed.values()).map(
    ic => `const ${ic.name} = ${ic.payload};`
  );

  const headerComment = `/**\n * React Bits Pro — Application UI (${componentSlug})\n * Decompiled interactive React source with original un-obfuscated Tailwind v4 classes.\n */\n`;

  return {
    code: [
      headerComment,
      importLines.join('\n'),
      iconDecls.length > 0 ? '\n' + iconDecls.join('\n') : '',
      '\n' + bodyChunks.join('\n\n'),
      exportLine ? '\n\n' + exportLine + '\n' : '\n'
    ]
      .filter(Boolean)
      .join('\n'),
    meta: {
      hooksUsed: hookList,
      usesMotion: motionFeaturesUsed.size > 0,
      usesD3Shape: d3ImportsUsed.size > 0,
      iconCount: iconsUsed.size
    }
  };
}

/**
 * Returns direct child AST nodes of any Estree node for lossless top-down splicing.
 */
function getDirectChildNodes(node) {
  const list = [];
  for (const [k, v] of Object.entries(node)) {
    if (k === 'type' || k === 'start' || k === 'end' || k === 'loc' || k === 'range') continue;
    if (Array.isArray(v)) {
      for (const item of v) {
        if (item && typeof item.type === 'string') list.push(item);
      }
    } else if (v && typeof v.type === 'string') {
      list.push(v);
    }
  }
  return list;
}

/**
 * Decompiles a standalone Default Webpack module into JSX source + metadata.
 */
function decompileDefaultModule(fnStr, allModulesMap, componentSlug) {
  const { wrapped, reqParam, statements } = parseWebpackModule(fnStr);
  const exportsMap = extractWebpackExports(statements, reqParam);
  const exportName = exportsMap.default || null;

  return decompileStatementsToJsx({
    wrapped,
    statements,
    reqParam,
    exportName,
    allModulesMap,
    componentSlug
  });
}

/**
 * Extracts and decompiles every individual slug inside a Sorbet category module (`components: () => ...`).
 */
function decompileSorbetCategoryModule(fnStr, allModulesMap) {
  const { wrapped, reqParam, statements } = parseWebpackModule(fnStr);
  const exportsMap = extractWebpackExports(statements, reqParam);
  const componentsVarName = exportsMap.components || null;

  if (!componentsVarName) {
    throw new Error('Could not locate Sorbet components export binding');
  }

  let componentsObjNode = null;
  const heightsVarName = exportsMap.heights || null;

  // Split multi-declarator VariableDeclarations into individual atomic entries so slicing
  // drops componentsVarName/heightsVarName and unrelated sibling components cleanly.
  const atomicItems = [];
  for (const stmt of statements) {
    if (stmt.type === 'VariableDeclaration') {
      for (const decl of stmt.declarations) {
        if (
          decl.id.type === 'Identifier' &&
          decl.id.name === componentsVarName &&
          decl.init?.type === 'ObjectExpression'
        ) {
          componentsObjNode = decl.init;
          continue;
        }
        if (decl.id.type === 'Identifier' && decl.id.name === heightsVarName) {
          continue;
        }
        atomicItems.push({
          type: 'VariableDeclaration',
          kind: stmt.kind,
          start: decl.start,
          end: decl.end,
          declarations: [decl]
        });
      }
    } else {
      atomicItems.push(stmt);
    }
  }

  // Build top-level declaration index: declaredName -> { stmtIdx, stmt, refs }
  const topDecls = [];
  const nameToStmtIdx = new Map();

  atomicItems.forEach((stmt, idx) => {
    const names = getDeclaredNames(stmt);
    const refs = collectReferencedIdentifiers(stmt);
    topDecls.push({ idx, stmt, names, refs });

    for (const n of names) {
      nameToStmtIdx.set(n, idx);
    }
  });

  if (!componentsObjNode) {
    throw new Error(`Could not locate ObjectExpression for ${componentsVarName}`);
  }

  const results = {};

  for (const prop of componentsObjNode.properties) {
    const slug = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value;
    if (!slug) continue;

    // BFS over top-level declarations reachable from prop.value
    const neededStmtIndices = new Set();
    const queue = Array.from(collectReferencedIdentifiers(prop.value));

    while (queue.length > 0) {
      const sym = queue.shift();
      const sIdx = nameToStmtIdx.get(sym);
      if (sIdx === undefined || neededStmtIndices.has(sIdx)) continue;
      const entry = topDecls[sIdx];
      neededStmtIndices.add(sIdx);
      for (const r of entry.refs) {
        if (nameToStmtIdx.has(r) && !neededStmtIndices.has(nameToStmtIdx.get(r))) {
          queue.push(r);
        }
      }
    }

    const slicedStatements = Array.from(neededStmtIndices)
      .sort((a, b) => a - b)
      .map(i => topDecls[i].stmt);

    // If prop.value is an identifier whose declaration was included, export it; else pass expression directly
    const isDirectId = prop.value.type === 'Identifier';
    const decompiled = decompileStatementsToJsx({
      wrapped,
      statements: slicedStatements,
      reqParam,
      exportExprNode: isDirectId ? null : prop.value,
      exportName: isDirectId ? prop.value.name : null,
      allModulesMap,
      componentSlug: `${slug} (Sorbet)`
    });

    results[slug] = decompiled;
  }

  return results;
}

module.exports = {
  extractSyncDependencies,
  decompileDefaultModule,
  decompileSorbetCategoryModule
};
