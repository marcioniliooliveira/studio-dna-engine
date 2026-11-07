const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../../..');
const pkgJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));

console.log('=== CHECKING package.json SCRIPTS ===\n');

for (const [scriptName, scriptCmd] of Object.entries(pkgJson.scripts)) {
  console.log(`Script: "${scriptName}" -> "${scriptCmd}"`);
  
  // Extract potential file targets in the command
  const tokens = scriptCmd.split(/\s+/);
  const referencedFiles = [];
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i].replace(/[;&|]/g, '');
    if (token.includes('/') || token.includes('\\') || token.endsWith('.js') || token.endsWith('.ts') || token.endsWith('.mjs')) {
      if (!token.startsWith('-') && !token.startsWith('http') && token !== 'npx') {
        referencedFiles.push(token);
      }
    }
  }

  for (const ref of referencedFiles) {
    if (ref.includes('*')) {
      console.log(`   [GLOB] ${ref}`);
    } else {
      const exists = fs.existsSync(path.join(rootDir, ref));
      console.log(`   [FILE] ${ref} -> ${exists ? 'EXISTS' : 'MISSING / NON-EXISTENT ❌'}`);
    }
  }
}
