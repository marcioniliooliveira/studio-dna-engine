const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
if (styleMatch) {
  const css = styleMatch[1];
  const terms = ['.beat', '#hero', '#strip', '.stage', '.claim', '.wm', '.stack', '.cap', '#nav', '#cv'];
  terms.forEach(t => {
    const idx = css.indexOf(t);
    console.log(`Term "${t}": found at ${idx}`);
    if (idx !== -1) {
      console.log(`  Snippet:`, css.substring(idx, idx + 250).replace(/\n/g, ' '));
    }
  });
}
