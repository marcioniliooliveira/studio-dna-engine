const fs = require('fs');
const path = require('path');

function getAllFiles(dir, matchRegex, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'fixtures') {
        getAllFiles(fullPath, matchRegex, fileList);
      }
    } else if (matchRegex.test(entry.name)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const scripts = pkg.scripts || {};

// All test files
const testFiles = [
  ...getAllFiles('test', /\.(test|spec)\.(js|ts|mjs|cjs)$/),
  ...getAllFiles('tests', /\.(test|spec)\.(js|ts|mjs|cjs)$/),
  ...getAllFiles('src', /\.(test|spec)\.(js|ts|mjs|cjs)$/)
];

// Scripts analysis
const ciTestScripts = Object.entries(scripts).filter(([k, v]) => k.startsWith('test') || k === 'test');

const inventory = [];
const ciMapRows = ['TestFile,Runner,InDefaultTest,InTestAll,InAnyNpmScript,MatchingScripts,DeclaredTestsCount,SkippedCount,TodoCount'];

for (const tf of testFiles) {
  const normPath = tf.replace(/\\/g, '/');
  const content = fs.readFileSync(tf, 'utf8');

  // Detect runner
  let runner = 'node:test';
  if (content.includes("from 'vitest'") || content.includes('require(\'vitest\')') || tf.includes('__tests__')) {
    runner = 'vitest';
  } else if (content.includes('@playwright/test') || normPath.startsWith('tests/e2e')) {
    runner = 'playwright';
  }

  // Count tests and skips
  const testMatches = content.match(/\b(it|test)\s*\(/g) || [];
  const skipMatches = content.match(/\b(it|test)\.skip\s*\(/g) || [];
  const todoMatches = content.match(/\b(it|test)\.todo\s*\(/g) || [];
  
  // Check which scripts execute this test
  const matchingScripts = [];
  for (const [scriptName, scriptCmd] of ciTestScripts) {
    // Check if script directly names or globs this file
    const relFromTest = normPath.replace(/^test\//, '');
    const filename = path.basename(normPath);
    if (scriptCmd.includes(normPath) || scriptCmd.includes(filename)) {
      matchingScripts.push(scriptName);
    } else if (normPath.startsWith('test/e2e/') && scriptCmd.includes('test/e2e/*.test.js')) {
      matchingScripts.push(scriptName);
    } else if (normPath.startsWith('test/components/') && scriptCmd.includes('test/components/*.test.js')) {
      matchingScripts.push(scriptName);
    } else if (normPath.startsWith('test/') && !normPath.slice(5).includes('/') && scriptCmd.includes('test/*.test.js')) {
      matchingScripts.push(scriptName);
    }
  }

  const inDefaultTest = matchingScripts.includes('test');
  const inTestAll = matchingScripts.includes('test:all');
  const inAnyNpm = matchingScripts.length > 0;

  inventory.push({
    file: normPath,
    runner,
    total_tests_declared: testMatches.length,
    skipped_tests: skipMatches.length,
    todo_tests: todoMatches.length,
    in_default_npm_test: inDefaultTest,
    in_test_all: inTestAll,
    matching_scripts: matchingScripts,
    is_orphaned: !inAnyNpm
  });

  ciMapRows.push(`"${normPath}","${runner}",${inDefaultTest},${inTestAll},${inAnyNpm},"${matchingScripts.join(';')}",${testMatches.length},${skipMatches.length},${todoMatches.length}`);
}

const orphaned = inventory.filter(i => i.is_orphaned);
const unlinkedFromTestAll = inventory.filter(i => !i.in_test_all);

fs.writeFileSync('test-inventory.json', JSON.stringify({
  timestamp: new Date().toISOString(),
  total_test_files: inventory.length,
  total_declared_tests: inventory.reduce((acc, i) => acc + i.total_tests_declared, 0),
  total_skipped: inventory.reduce((acc, i) => acc + i.skipped_tests, 0),
  total_todo: inventory.reduce((acc, i) => acc + i.todo_tests, 0),
  in_npm_test_count: inventory.filter(i => i.in_default_npm_test).length,
  in_test_all_count: inventory.filter(i => i.in_test_all).length,
  orphaned_files_count: orphaned.length,
  inventory
}, null, 2), 'utf8');

fs.writeFileSync('test-discovery.json', JSON.stringify({
  timestamp: new Date().toISOString(),
  ci_test_scripts: ciTestScripts.map(([name, cmd]) => ({ name, cmd })),
  discovered_test_files_count: inventory.length,
  discovered_files: inventory.map(i => ({ file: i.file, runner: i.runner, matching_scripts: i.matching_scripts }))
}, null, 2), 'utf8');

fs.writeFileSync('ci-coverage-map.csv', ciMapRows.join('\n'), 'utf8');

fs.writeFileSync('orphaned-suites.json', JSON.stringify({
  timestamp: new Date().toISOString(),
  description: 'Suítes de teste que não são executadas por nenhum script npm do package.json',
  count: orphaned.length,
  orphaned_files: orphaned.map(o => o.file),
  unlinked_from_test_all_count: unlinkedFromTestAll.length,
  unlinked_from_test_all: unlinkedFromTestAll.map(u => ({ file: u.file, covered_in_other_scripts: u.matching_scripts }))
}, null, 2), 'utf8');

console.log(`Discovered ${inventory.length} test files with ${inventory.reduce((a, b) => a + b.total_tests_declared, 0)} declared tests.`);
console.log(`Covered by 'npm run test:all': ${inventory.filter(i => i.in_test_all).length}`);
console.log(`Orphaned from ALL npm scripts: ${orphaned.length}`);
console.log(`Not in 'test:all' but in other scripts: ${unlinkedFromTestAll.length - orphaned.length}`);
