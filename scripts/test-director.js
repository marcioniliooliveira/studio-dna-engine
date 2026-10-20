const fs = require('fs');
const html = fs.readFileSync('scripts/server-served.html', 'utf8');

const start = html.indexOf('<script id="universal-scroll-director">');
const end = html.indexOf('</script>', start);
const code = html.substring(start, end);

// Let's test this code with node or Acorn
try {
  const vm = require('vm');
  new vm.Script(code.replace('<script id="universal-scroll-director">', ''), { filename: 'director.js' });
  console.log('Director script parses cleanly in VM!');
} catch (err) {
  console.error('Director script error:', err.message);
}
