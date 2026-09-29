const fs = require('fs');

const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

// Find all occurrences of opxy or glb
const lines = html.split('\n');
console.log('Total lines:', lines.length);

lines.forEach((line, idx) => {
  if (line.includes('opxy') || line.includes('.glb') || line.includes('GLTF') || line.includes('DRACO')) {
    console.log(`Line ${idx + 1}: ${line.trim().substring(0, 200)}`);
  }
});

// Let's inspect the context around GLTFLoader in Script 5
const script5Match = html.match(/<script type="module">([\s\S]*?)<\/script>/i);
if (script5Match) {
  const code = script5Match[1];
  console.log('\n--- Script 5 Length:', code.length);
  
  // Find where .load is called on loader
  const loadCalls = [...code.matchAll(/loader[\s\S]{0,100}\.load\([\s\S]{0,300}\)/gi)];
  loadCalls.forEach((m, i) => console.log(`Load call ${i}:`, m[0]));

  // Find all URLs / paths in code
  const urlMatches = [...code.matchAll(/['"`]([^'"`]*?\.(?:glb|gltf|bin|png|jpg|jpeg|hdr|exr|webp|svg|wasm))['"`]/gi)];
  console.log('\n--- Model/Image/Data URLs found in Script 5:');
  const uniqueUrls = [...new Set(urlMatches.map(m => m[1]))];
  console.log(uniqueUrls);
  
  // Also look for draco path
  const dracoMatches = [...code.matchAll(/setDecoderPath\(['"`]([^'"`]+)['"`]\)/gi)];
  console.log('Draco path:', dracoMatches.map(m => m[1]));
}
