const fs = require('fs');

const html = fs.readFileSync('copias/op-xy-76-aura-build/site/template-content.html', 'utf8');

// Find all occurrences of TextureLoader, RGBELoader, Audio, AudioContext, load(
const matches = [];
const patterns = [
  /TextureLoader/gi,
  /RGBELoader/gi,
  /EXRLoader/gi,
  /CubeTextureLoader/gi,
  /\.load\s*\(/gi,
  /new Audio/gi,
  /AudioContext/gi,
  /fetch\s*\(/gi,
  /draco/gi,
  /dracoLoader/gi,
  /\.setDecoderPath/gi,
  /supabase/gi,
  /hoirqrkdgbmvpwutwuwj/gi
];

patterns.forEach(p => {
  const m = [...html.matchAll(p)];
  console.log(`${p.source}: count=${m.length}`);
});

// Let's inspect where .load( is used
const loadMatches = [...html.matchAll(/([a-zA-Z0-9_$.]+)\.load\s*\(([^)]+)\)/g)];
console.log('\n--- .load() calls:');
loadMatches.forEach(m => console.log(`${m[1]}.load(${m[2].trim()})`));

// Let's inspect all fetch calls
const fetchMatches = [...html.matchAll(/fetch\s*\(([^)]+)\)/g)];
console.log('\n--- fetch() calls:');
fetchMatches.forEach(m => console.log(`fetch(${m[1].trim()})`));

// Let's check audio or sound
const soundMatches = [...html.matchAll(/(?:play|sound|audio|synth|sample|tone|beep)[\s\S]{0,50}\.mp3|\.wav|\.ogg/gi)];
console.log('\n--- Audio files:');
soundMatches.forEach(m => console.log(m[0]));
