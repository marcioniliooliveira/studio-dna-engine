const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'copias', 'op-xy-76-aura-build', 'site', 'assets');
const destDir = path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'site', 'assets');

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    const parent = path.dirname(dest);
    if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

copyRecursive(srcDir, destDir);
console.log('Successfully copied assets to:', destDir);

// Verify files in dest
const modelsDir = path.join(destDir, 'models');
const dracoDir = path.join(destDir, 'draco');
console.log('Assets exists:', fs.existsSync(destDir));
console.log('Models exists:', fs.existsSync(modelsDir));
console.log('Draco exists:', fs.existsSync(dracoDir));
if (fs.existsSync(modelsDir)) {
  console.log('Model files:', fs.readdirSync(modelsDir));
}
