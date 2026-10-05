const http = require('http');
const assert = require('assert');

http.get('http://127.0.0.1:4000/clientes/more-nutrition-tuning-lab/site/index.html', (res) => {
  console.log('HTTP Status:', res.statusCode);
  assert.equal(res.statusCode, 200);

  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const hasHud = data.includes('<studio-dna-hud');
    const hasScript = data.includes('id="studio-dna-universal-hud-script"');
    console.log('Contains studio-dna-hud:', hasHud);
    console.log('Contains universal-hud-script:', hasScript);
    assert.ok(hasHud, 'Page must contain <studio-dna-hud>');
    assert.ok(hasScript, 'Page must contain HUD script');
    console.log('Live HTTP test passed successfully!');
    process.exit(0);
  });
}).on('error', (err) => {
  console.error('Error connecting to preview server:', err.message);
  process.exit(1);
});
