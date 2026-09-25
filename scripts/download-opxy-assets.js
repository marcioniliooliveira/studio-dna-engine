const fs = require('fs');
const path = require('path');
const https = require('https');

const BASE_DIR = path.join(__dirname, '..', 'copias', 'op-xy-76-aura-build', 'site', 'assets');

const ASSETS = [
  // 3D Model
  {
    url: 'https://cdn.jsdelivr.net/gh/VanhDc/aura-assets@opxy-v1/opxy/opxy.glb',
    dest: path.join(BASE_DIR, 'models', 'opxy.glb')
  },
  // Draco Decoders
  {
    url: 'https://cdn.jsdelivr.net/npm/three@0.186.0/examples/jsm/libs/draco/gltf/draco_decoder.js',
    dest: path.join(BASE_DIR, 'draco', 'draco_decoder.js')
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/three@0.186.0/examples/jsm/libs/draco/gltf/draco_decoder.wasm',
    dest: path.join(BASE_DIR, 'draco', 'draco_decoder.wasm')
  },
  {
    url: 'https://cdn.jsdelivr.net/npm/three@0.186.0/examples/jsm/libs/draco/gltf/draco_wasm_wrapper.js',
    dest: path.join(BASE_DIR, 'draco', 'draco_wasm_wrapper.js')
  },
  // Product Photos
  {
    url: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
    dest: path.join(BASE_DIR, 'images', 'product-detail-01.jpg')
  },
  {
    url: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg',
    dest: path.join(BASE_DIR, 'images', 'product-detail-02.jpg')
  },
  {
    url: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg',
    dest: path.join(BASE_DIR, 'images', 'product-detail-03.jpg')
  },
  {
    url: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp',
    dest: path.join(BASE_DIR, 'images', 'product-detail-04.webp')
  },
  {
    url: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/30104e3c-5eea-4b93-93e9-5313698a7156_1600w.webp',
    dest: path.join(BASE_DIR, 'images', 'product-detail-05.webp')
  },
  // OG Preview Image
  {
    url: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/preview-images/op-xy-76.png',
    dest: path.join(BASE_DIR, 'images', 'og-preview.png')
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const file = fs.createWriteStream(dest);

    function get(u) {
      https.get(u, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return get(res.headers.location);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`Failed to download ${u}: HTTP ${res.statusCode}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            const stat = fs.statSync(dest);
            resolve({ dest, size: stat.size });
          });
        });
      }).on('error', (err) => {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(err);
      });
    }

    get(url);
  });
}

async function main() {
  console.log(`Starting asset downloads for OP-XY 76... (${ASSETS.length} assets)\n`);
  const results = [];

  for (const asset of ASSETS) {
    process.stdout.write(`Downloading ${path.basename(asset.dest)} from ${asset.url}... `);
    try {
      const res = await downloadFile(asset.url, asset.dest);
      const sizeKB = (res.size / 1024).toFixed(1);
      console.log(`OK (${sizeKB} KB)`);
      results.push({ url: asset.url, dest: asset.dest, size: res.size, status: 'success' });
    } catch (err) {
      console.log(`FAILED: ${err.message}`);
      results.push({ url: asset.url, dest: asset.dest, error: err.message, status: 'failed' });
    }
  }

  // Also write manifest
  const manifestPath = path.join(__dirname, '..', 'copias', 'op-xy-76-aura-build', 'downloaded-assets-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nManifest written to ${manifestPath}`);
}

main().catch(console.error);
