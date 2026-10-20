const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'site', 'index.html'), 'utf8');

const scripts = [...html.matchAll(/<script([\s\S]*?)<\/script>/gi)];

scripts.forEach((s, idx) => {
  const code = s[1];
  // Let's use Acorn or Esprima or Babel parser if available in node_modules, or acorn
  try {
    const acorn = require('acorn');
    const isModule = s[0].includes('type="module"');
    acorn.parse(code, { ecmaVersion: 2022, sourceType: isModule ? 'module' : 'script' });
    console.log(`Script ${idx} (${isModule ? 'module' : 'script'}): PARSE SUCCESS!`);
  } catch (err) {
    console.log(`Script ${idx}: PARSE ERROR -> ${err.message} at line ${err.loc ? err.loc.line : '?'}:${err.loc ? err.loc.column : '?'}`);
    const lines = code.split('\n');
    if (err.loc && err.loc.line) {
      console.log('Context line:', lines[err.loc.line - 1]);
    }
  }
});
