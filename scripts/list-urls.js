const fs = require('fs');

const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

const regex = /https:\/\/[^'"`\s)]+supabase\.co[^'"`\s)]+/g;
const matches = html.match(regex) || [];
const unique = [...new Set(matches)];

console.log('Supabase URLs found (count =', unique.length, '):');
unique.forEach((u, i) => console.log(`${i + 1}: ${u}`));

// Also find any other external URLs in images, links, or styles
const allUrls = html.match(/https?:\/\/[^'"`\s)<>]+/g) || [];
const domains = {};
allUrls.forEach(u => {
  try {
    const d = new URL(u).origin;
    domains[d] = (domains[d] || 0) + 1;
  } catch(e) {}
});
console.log('\nAll external domains found in template:');
console.log(domains);
