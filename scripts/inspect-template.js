const fs = require('fs');

const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');
console.log('HTML Length:', html.length);

// Search for canvas
const hasCanvas = html.includes('id="cv"') || html.includes('<canvas');
console.log('Has canvas:', hasCanvas);
const canvasMatches = [...html.matchAll(/<canvas[\s\S]*?<\/canvas>|<canvas[^>]*>/gi)].map(m => m[0]);
console.log('Canvas tags:', canvasMatches);

// Search for scripts
const scripts = [...html.matchAll(/<script([\s\S]*?)<\/script>/gi)];
console.log('Script count:', scripts.length);

scripts.forEach((match, i) => {
  const content = match[1];
  const tagOpen = match[0].substring(0, match[0].indexOf('>') + 1);
  console.log(`Script ${i}: tag=${tagOpen}, length=${content.length}`);
  if (content.toLowerCase().includes('three') || content.toLowerCase().includes('gltf') || content.toLowerCase().includes('canvas') || content.toLowerCase().includes('scene')) {
    console.log(`  -> Script ${i} matches 3D keywords! Snippet:`, content.substring(0, 300).replace(/\n/g, ' '));
  }
});

// Search for glb, gltf, obj, fbx, three, r186, etc.
const keywords = ['glb', 'gltf', 'obj', 'fbx', 'three', 'r186', 'buffergeometry', 'mesh', 'scene', 'camera', 'renderer'];
keywords.forEach(kw => {
  const regex = new RegExp(`[\\w/.:-]*${kw}[\\w/.:-]*`, 'gi');
  const matches = [...html.matchAll(regex)].map(m => m[0]);
  const unique = [...new Set(matches)].slice(0, 10);
  console.log(`Keyword '${kw}': count=${matches.length}, samples:`, unique);
});
