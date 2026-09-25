const fs = require('fs');
const path = require('path');

const glbPath = path.join(__dirname, '..', 'copias', 'op-xy-76-aura-build', 'site', 'assets', 'models', 'opxy.glb');
const buffer = fs.readFileSync(glbPath);

// GLB Header: magic (4), version (4), length (4)
const magic = buffer.toString('utf8', 0, 4);
const version = buffer.readUInt32LE(4);
const length = buffer.readUInt32LE(8);

console.log(`GLB Magic: ${magic}, Version: ${version}, Total Length: ${length} bytes`);

// Chunk 0 (JSON)
const chunk0Length = buffer.readUInt32LE(12);
const chunk0Type = buffer.toString('utf8', 16, 20);
console.log(`Chunk 0: Type=${chunk0Type}, Length=${chunk0Length}`);

const jsonStr = buffer.toString('utf8', 20, 20 + chunk0Length);
const gltf = JSON.parse(jsonStr);

console.log('\n--- GLTF Structure Summary ---');
console.log('Asset metadata:', gltf.asset);
console.log('Scene count:', gltf.scenes?.length);
console.log('Nodes count:', gltf.nodes?.length);
console.log('Meshes count:', gltf.meshes?.length);
console.log('Materials count:', gltf.materials?.length);
console.log('Textures count:', gltf.textures?.length || 0);
console.log('Images count:', gltf.images?.length || 0);
console.log('Animations count:', gltf.animations?.length || 0);
console.log('Cameras count:', gltf.cameras?.length || 0);

console.log('\n--- Materials:');
gltf.materials?.forEach((m, i) => {
  console.log(`  [${i}] ${m.name} (pbrMetallicRoughness: baseColor=${JSON.stringify(m.pbrMetallicRoughness?.baseColorFactor)}, metallic=${m.pbrMetallicRoughness?.metallicFactor}, roughness=${m.pbrMetallicRoughness?.roughnessFactor})`);
});

console.log('\n--- Control Nodes (named CONTROL | ...):');
const controlNodes = gltf.nodes?.filter(n => n.name && n.name.includes('CONTROL')) || [];
console.log(`Found ${controlNodes.length} control nodes:`);
controlNodes.slice(0, 20).forEach(n => console.log(`  - ${n.name}`));
if (controlNodes.length > 20) console.log(`  ... and ${controlNodes.length - 20} more`);

// Save parsed gltf json structure for reference
const jsonOutPath = path.join(__dirname, '..', 'copias', 'op-xy-76-aura-build', 'site', 'assets', 'models', 'opxy-gltf-structure.json');
fs.writeFileSync(jsonOutPath, JSON.stringify(gltf, null, 2), 'utf8');
console.log(`\nGLTF structure JSON saved to ${jsonOutPath}`);
