const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

const match = html.match(/<script type="module">([\s\S]*?)<\/script>/i);
if (!match) {
  console.log('No module script found!');
  process.exit(1);
}

const code = match[1];
console.log('Total script length:', code.length);

// Let's search for camera poses, sections, scroll triggers, etc.
const keywords = ['hero', 'strip', 'macro', 'POSES', 'poses', 'ScrollTrigger', 'camera', 'Scroll', 'lenis', 'Lenis'];
keywords.forEach(kw => {
  const matches = [...code.matchAll(new RegExp(`\\b${kw}\\b`, 'gi'))];
  console.log(`Keyword "${kw}": found ${matches.length} times`);
});

// Let's search for camera track or poses definition
const lines = code.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('camera') || l.includes('ScrollTrigger') || l.includes('hero') || l.includes('strip')) {
    if (l.length < 150) {
      console.log(`L${idx + 1}: ${l}`);
    } else {
      console.log(`L${idx + 1}: ${l.substring(0, 150)}...`);
    }
  }
});
