const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
const css = styleMatch[1];
const idx = css.indexOf('#strip{');
if (idx !== -1) {
  console.log(css.substring(idx, idx + 200));
} else {
  // search for #strip in css
  const allStrip = [...css.matchAll(/#strip[^{]*\{[^}]*\}/g)].map(m => m[0]);
  console.log('Matches:', allStrip);
}
