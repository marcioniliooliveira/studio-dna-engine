const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '../copias/northtrail-adventure-59-aura-build/site/index.html');
let content = fs.readFileSync(filePath, 'utf8');

// Remove o script de firewall do Aura
content = content.replace(/<script id="aura-supabase-token-firewall">[\s\S]*?<\/script>/i, '');

// Garante DOCTYPE
if (!content.trim().startsWith('<!DOCTYPE html>')) {
  content = '<!DOCTYPE html>\n' + content.trim();
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ index.html de Northtrail sanitizado com sucesso! Tamanho:', content.length);
