const fs = require('fs');

const content = fs.readFileSync('copias/masters-residence-dviga/masters.html', 'utf8');
const slice = content.slice(810000, 840000);

const imgRegex = /(https?:\/\/[^\s"'<>]+\.(?:svg|png|jpg|webp))/gi;
const matches = slice.match(imgRegex) || [];
console.log('Unique images in Masters map section:', [...new Set(matches)]);

// Let's also check aircenter location section
if (fs.existsSync('copias/aircenter-space/aircenter-space.html')) {
  const airContent = fs.readFileSync('copias/aircenter-space/aircenter-space.html', 'utf8');
  const locIdx = airContent.indexOf('location');
  if (locIdx !== -1) {
    const airSlice = airContent.slice(locIdx - 500, locIdx + 5000);
    const airImgs = airSlice.match(/(?:src|href)=["']([^"']+\.(?:svg|png|jpg|webp))["']/gi) || [];
    console.log('Air Center location images/links:', [...new Set(airImgs)]);
    // check if iframe or mapbox or leaflet
    if (airSlice.includes('mapbox')) console.log('Air Center uses Mapbox');
    if (airSlice.includes('leaflet')) console.log('Air Center uses Leaflet');
    if (airSlice.includes('google.com/maps')) console.log('Air Center uses Google Maps');
    if (airSlice.includes('<svg')) console.log('Air Center uses inline SVG map');
  }
}
