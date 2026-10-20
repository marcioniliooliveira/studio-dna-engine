const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

// Find where main #page ends or where the script starts
const stripEnd = html.indexOf('</section>', html.indexOf('id="strip"')) + '</section>'.length;
console.log('Strip end index:', stripEnd);
console.log('Snippet around strip end:');
console.log(html.substring(stripEnd - 50, stripEnd + 200));

// Find script tags after stripEnd
const scriptsAfter = [...html.substring(stripEnd).matchAll(/<script[\s\S]*?<\/script>/gi)].map(m => m[0]);
console.log('Scripts after strip count:', scriptsAfter.length);
scriptsAfter.forEach((s, i) => {
  console.log(`Script ${i}: tag=${s.substring(0, 60)}, length=${s.length}`);
});
