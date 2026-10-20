const fs = require('fs');
const path = require('path');

const srcHtml = fs.readFileSync(path.join(__dirname, '..', 'copias', 'op-xy-76-aura-build', 'site', 'template-content.html'), 'utf8');

// 1. Find head and start of body up to the end of #strip
const stripMarker = '</section>';
const stripIdx = srcHtml.indexOf('id="strip"');
const stripEnd = srcHtml.indexOf(stripMarker, stripIdx) + stripMarker.length;

let bodyBefore = srcHtml.substring(0, stripEnd);

// 2. Close <main id="page">
bodyBefore += '\n  </main>\n';

// 3. Find importmap and scripts
const importmapIdx = srcHtml.indexOf('<script type="importmap">');
const scriptsBlock = srcHtml.substring(importmapIdx);

console.log('Body before length:', bodyBefore.length);
console.log('Scripts block length:', scriptsBlock.length);
