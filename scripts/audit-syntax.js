const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const res = path.resolve(dir, f.name);
    if (f.isDirectory() && f.name !== 'node_modules' && f.name !== '.git') {
      results = results.concat(walk(res));
    } else if (f.isFile() && f.name.endsWith('.js')) {
      results.push(res);
    }
  }
  return results;
}

const targetDirs = ['src', 'icm', 'scripts', 'test', 'bin'];
const files = targetDirs.flatMap(d => walk(path.resolve(__dirname, '..', d)));

let ok = 0;
let errors = [];

for (const file of files) {
  try {
    execSync(`node --check "${file}"`, { stdio: 'pipe' });
    ok++;
  } catch (err) {
    errors.push({ file, error: err.message });
  }
}

console.log(JSON.stringify({
  totalChecked: files.length,
  passed: ok,
  failed: errors.length,
  errors
}, null, 2));
