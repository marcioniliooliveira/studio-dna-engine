const https = require('https');
const fs = require('fs');

const query = `[out:json][timeout:30];
(
  way["highway"~"primary|secondary|tertiary|trunk"](-23.445,-51.955,-23.405,-51.915);
  way["leisure"="park"](-23.445,-51.955,-23.405,-51.915);
);
out geom;`;

const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);

console.log('Consultando Overpass API para Maringá (Centro, Zonas 01, 02, 03, Novo Centro)...');

const req = https.get(url, { headers: { 'User-Agent': 'StudioDNA/2.0 (maringa-carto-test)' } }, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status HTTP:', res.statusCode);
    if (res.statusCode === 200) {
      try {
        const json = JSON.parse(data);
        console.log('✅ Elementos OSM retornados:', json.elements ? json.elements.length : 0);
        fs.writeFileSync('scripts/maringa_osm_raw.json', data);
        console.log('Arquivo salvo em scripts/maringa_osm_raw.json');
      } catch (err) {
        console.error('Erro ao parsear JSON:', err.message);
      }
    } else {
      console.error('Resposta não-200:', data.slice(0, 300));
    }
  });
});

req.on('error', err => {
  console.error('Erro de conexão com Overpass:', err.message);
});
