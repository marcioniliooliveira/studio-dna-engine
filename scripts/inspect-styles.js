const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

const styleMatches = [...html.matchAll(/<style[\s\S]*?<\/style>/gi)].map(m => m[0]);
console.log('Style tags count:', styleMatches.length);
styleMatches.forEach((s, i) => {
  console.log(`Style ${i}: length ${s.length}, snippet:`, s.substring(0, 150).replace(/\n/g, ' '));
});

// Let's check external link rel="stylesheet"
const linkMatches = [...html.matchAll(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi)].map(m => m[0]);
console.log('Stylesheet links:', linkMatches);
