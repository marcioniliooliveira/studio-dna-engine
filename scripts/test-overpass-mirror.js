const https = require('https');
const fs = require('fs');

const query = `[out:json][timeout:25];
(
  way["highway"~"primary|secondary"](-23.435,-51.945,-23.415,-51.925);
  way["leisure"="park"](-23.435,-51.945,-23.415,-51.925);
);
out geom;`;

// Using reliable alternative mirror: kumi.systems
const url = 'https://overpass.kumi.systems/api/interpreter?data=' + encodeURIComponent(query);

console.log('Testando mirror alternativo kumi.systems...');
const req = https.get(url, { headers: { 'User-Agent': 'StudioDNA/2.0' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status HTTP:', res.statusCode);
    if (res.statusCode === 200) {
      const json = JSON.parse(data);
      console.log('✅ Sucesso! Elementos retornados:', json.elements ? json.elements.length : 0);
      fs.writeFileSync('scripts/maringa_osm_sample.json', data);
    } else {
      console.log('Status não-200:', res.statusCode, data.slice(0, 100));
    }
  });
});

req.on('error', e => console.error('Erro:', e.message));
