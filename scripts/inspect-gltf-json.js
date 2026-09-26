const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'copias', 'op-xy-76-aura-build', 'site', 'assets', 'models', 'opxy-gltf-structure.json');
if (fs.existsSync(jsonPath)) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  console.log('Nodes count:', data.nodes ? data.nodes.length : 0);
  console.log('Materials count:', data.materials ? data.materials.length : 0);
  if (data.materials) {
    console.log('Material names:', data.materials.map(m => m.name));
  }
  if (data.nodes) {
    const key39Nodes = data.nodes.filter(n => n.name && n.name.includes('key-39'));
    console.log('key-39 nodes:', key39Nodes);
  }
}
