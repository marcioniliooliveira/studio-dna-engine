const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, '..', 'copias', 'op-xy-76-aura-build', 'site', 'template-content.html');
const indexPath = path.join(__dirname, '..', 'copias', 'op-xy-76-aura-build', 'site', 'index.html');

let content = fs.readFileSync(templatePath, 'utf8');

// Ensure doctype
if (!content.trim().toLowerCase().startsWith('<!doctype html>')) {
  content = '<!DOCTYPE html>\n' + content;
}

// Ensure the local model is preferred or pointed to local assets
content = content.replace(
  /const MODEL_URL = [^;]+;/,
  "const MODEL_URL = (location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.protocol === 'file:') ? './assets/models/opxy.glb' : (function(){ var d = document.getElementById('cdn'); var h = ['ht','tps:','//','cdn','.js','delivr','.net','/gh/'].join(''); return h + d.dataset.r + '@' + d.dataset.t + '/' + d.dataset.p + '/opxy.glb'; })();"
);

// Also copy opxy.glb to assets/ as well just in case relative paths differ
const baseAssets = path.join(__dirname, '..', 'copias', 'op-xy-76-aura-build', 'site', 'assets');
const glbSource = path.join(baseAssets, 'models', 'opxy.glb');
const glbRoot = path.join(baseAssets, 'opxy.glb');
if (fs.existsSync(glbSource) && !fs.existsSync(glbRoot)) {
  fs.copyFileSync(glbSource, glbRoot);
}

fs.writeFileSync(indexPath, content, 'utf8');
console.log('Successfully promoted template-content.html to index.html! File size:', fs.statSync(indexPath).size);
