const fs = require('fs');

const airContent = fs.readFileSync('copias/aircenter-space/aircenter-space.html', 'utf8');
const locIdx = airContent.indexOf('location');
console.log('Location index:', locIdx);

const mapIdx = airContent.indexOf('id="map"', locIdx - 1000);
console.log('id="map" index:', mapIdx);

const start = mapIdx !== -1 ? mapIdx : locIdx;
console.log('Slice around map:\n', airContent.slice(start - 200, start + 1500));
