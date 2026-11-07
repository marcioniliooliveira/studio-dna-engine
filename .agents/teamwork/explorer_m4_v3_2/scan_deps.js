const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../../..');
const dirs = ['src', 'bin', 'scripts', 'test'];
const packages = new Map();

function scanFile(filePath) {
  if (!/\.(js|jsx|ts|tsx|mjs|cjs)$/.test(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');

  // match require('pkg') or require("pkg")
  const requireRegex = /require\s*\(\s*['"]([^'.\/][^'"]*)['"]\s*\)/g;
  let match;
  while ((match = requireRegex.exec(content)) !== null) {
    let pkg = match[1];
    if (pkg.startsWith('@')) {
      pkg = pkg.split('/').slice(0, 2).join('/');
    } else {
      pkg = pkg.split('/')[0];
    }
    if (!packages.has(pkg)) packages.set(pkg, new Set());
    packages.get(pkg).add(filePath);
  }

  // match import ... from 'pkg' or import 'pkg'
  const importRegex = /import\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"]([^'.\/][^'"]*)['"]/g;
  while ((match = importRegex.exec(content)) !== null) {
    let pkg = match[1];
    if (pkg.startsWith('@')) {
      pkg = pkg.split('/').slice(0, 2).join('/');
    } else {
      pkg = pkg.split('/')[0];
    }
    if (!packages.has(pkg)) packages.set(pkg, new Set());
    packages.get(pkg).add(filePath);
  }
}

function walkDir(dir) {
  const fullDirPath = path.join(rootDir, dir);
  if (!fs.existsSync(fullDirPath)) return;
  const entries = fs.readdirSync(fullDirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(fullDirPath, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git') {
        walkDir(path.relative(rootDir, fullPath));
      }
    } else {
      scanFile(fullPath);
    }
  }
}

for (const d of dirs) walkDir(d);

console.log('=== EXTERNAL / BUILT-IN PACKAGES FOUND ===');
const pkgJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const declaredDeps = Object.keys(pkgJson.dependencies || {});
const declaredDevDeps = Object.keys(pkgJson.devDependencies || {});
const allDeclared = new Set([...declaredDeps, ...declaredDevDeps]);

console.log('\n--- DECLARED IN package.json (dependencies) ---');
for (const dep of declaredDeps) {
  const files = packages.get(dep);
  if (files) {
    console.log(`[USED] ${dep} (found in ${files.size} files):`);
    for (const f of [...files].slice(0, 4)) {
      console.log(`    ${path.relative(rootDir, f)}`);
    }
    if (files.size > 4) console.log(`    ... and ${files.size - 4} more files`);
  } else {
    console.log(`[UNUSED / NO MATCH] ${dep}`);
  }
}

console.log('\n--- DECLARED IN package.json (devDependencies) ---');
for (const dep of declaredDevDeps) {
  const files = packages.get(dep);
  if (files) {
    console.log(`[USED] ${dep} (found in ${files.size} files):`);
    for (const f of [...files].slice(0, 4)) {
      console.log(`    ${path.relative(rootDir, f)}`);
    }
    if (files.size > 4) console.log(`    ... and ${files.size - 4} more files`);
  } else {
    console.log(`[UNUSED / NO MATCH] ${dep}`);
  }
}

console.log('\n--- UNDECLARED THIRD-PARTY PACKAGES REFERENCED IN CODE ---');
const nodeBuiltins = new Set([
  'assert', 'async_hooks', 'buffer', 'child_process', 'cluster', 'console',
  'constants', 'crypto', 'dgram', 'diagnostics_channel', 'dns', 'domain',
  'events', 'fs', 'http', 'http2', 'https', 'inspector', 'module', 'net',
  'os', 'path', 'perf_hooks', 'process', 'punycode', 'querystring', 'readline',
  'repl', 'stream', 'string_decoder', 'sys', 'timers', 'tls', 'trace_events',
  'tty', 'url', 'util', 'v8', 'vm', 'wasi', 'worker_threads', 'zlib',
  'node:assert', 'node:buffer', 'node:child_process', 'node:crypto', 'node:dns',
  'node:events', 'node:fs', 'node:http', 'node:https', 'node:net', 'node:os',
  'node:path', 'node:process', 'node:stream', 'node:test', 'node:url', 'node:util',
  'node:sqlite', 'node:worker_threads', 'node:zlib', 'node:module'
]);

for (const [pkg, files] of [...packages.entries()].sort()) {
  if (!allDeclared.has(pkg) && !nodeBuiltins.has(pkg) && !pkg.startsWith('node:')) {
    console.log(`[UNDECLARED] ${pkg} (found in ${files.size} files):`);
    for (const f of [...files].slice(0, 3)) {
      console.log(`    ${path.relative(rootDir, f)}`);
    }
  }
}
