const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'site', 'index.html'), 'utf8');

// Find all <script> blocks and parse them with Acorn or esprima or basic regex
const scripts = [...html.matchAll(/<script([\s\S]*?)<\/script>/gi)];
scripts.forEach((s, idx) => {
  const content = s[1];
  console.log(`Checking script ${idx}... length ${content.length}`);
  // Check if there is a 'return' at top level
  // Let's write script content to a temp file and syntax check with node
  const tempFile = path.join(__dirname, `temp-script-${idx}.js`);
  // If it's a module
  const isModule = s[0].includes('type="module"');
  fs.writeFileSync(tempFile, content, 'utf8');
  try {
    const vm = require('vm');
    new vm.Script(content, { filename: `script-${idx}.js` });
    console.log(`  -> Script ${idx}: SYNTAX OK!`);
  } catch (err) {
    console.error(`  -> Script ${idx}: SYNTAX ERROR:`, err.message);
  }
  try { fs.unlinkSync(tempFile); } catch(e){}
});
