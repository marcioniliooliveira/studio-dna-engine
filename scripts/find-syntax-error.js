const fs = require('fs');

const html = fs.readFileSync('copias/op-xy-76-aura-build/site/index.html', 'utf8');
const scripts = [...html.matchAll(/<script([\s\S]*?)<\/script>/gi)];

scripts.forEach((s, idx) => {
  const full = s[0];
  const openTag = full.substring(0, full.indexOf('>') + 1);
  const content = s[1];
  console.log('Script ' + idx + ': tag=' + openTag + ' length=' + content.length);
});

// Let's check which script has an "Illegal return statement"
// In ES modules (<script type="module">), a return statement OUTSIDE any function is an Illegal return statement!
const moduleScripts = scripts.filter(s => s[0].includes('type="module"'));
console.log('\nModule scripts count: ' + moduleScripts.length);

moduleScripts.forEach((s, mi) => {
  const code = s[1];
  // Parse with acorn or babel or check top-level returns
  console.log('Module script ' + mi + ' length: ' + code.length);
  // Check our replacement in promote-template.js:
  // We replaced MODEL_URL!
  // Did we put a return statement in top-level?
  const modelUrlMatch = code.match(/const MODEL_URL = [^;]+;/);
  if (modelUrlMatch) {
    console.log('MODEL_URL in code:');
    console.log(modelUrlMatch[0]);
  }
});
