const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

// Find all elements with id
const idMatches = [...html.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
console.log('Unique IDs:', [...new Set(idMatches)]);

// Find all section tags or main tags
const sections = [...html.matchAll(/<(section|header|nav|main|footer|article)[^>]*>/gi)].map(m => m[0]);
console.log('Sections/Containers count:', sections.length);
console.log(sections);

// Let's find any text resembling the user's screenshots:
// "a synthesizer, a sampler", "perform.", "four rows", "68 keys", "OP-XY"
const phrases = ['synthesizer', 'sampler', 'perform', 'four rows', '68 keys', 'one grayscale', 'OP-XY', 'OP–XY', 'sound', 'engines', 'sequencer', 'specs'];
phrases.forEach(p => {
  const idx = html.indexOf(p);
  console.log(`Phrase "${p}": found at index ${idx}`);
  if (idx !== -1) {
    console.log(`  Context:`, html.substring(Math.max(0, idx - 80), Math.min(html.length, idx + 120)).replace(/\n/g, ' '));
  }
});
