const fs = require('fs');
const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

const match = html.match(/const \$\$ = [^;]+;/);
if (match) {
  console.log('$$ definition:', match[0]);
} else {
  const match2 = html.match(/function \$\$[^}]+}/);
  console.log('$$ function:', match2 ? match2[0] : 'not found');
}
