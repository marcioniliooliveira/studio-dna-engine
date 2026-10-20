const fs = require('fs');
const path = require('path');
const https = require('https');

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(true));
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      resolve(false);
    });
  });
}

async function main() {
  const siteDir = path.resolve(__dirname, '../copias/likova-space/site');
  const indexPath = path.join(siteDir, 'index.html');
  const html = fs.readFileSync(indexPath, 'utf8');

  // 1. Flatten / ensure assets/assets are also at assets/
  const nestedAssets = path.join(siteDir, 'assets', 'assets');
  const targetAssets = path.join(siteDir, 'assets');
  if (fs.existsSync(nestedAssets)) {
    const subdirs = fs.readdirSync(nestedAssets);
    for (const sub of subdirs) {
      const srcSub = path.join(nestedAssets, sub);
      const destSub = path.join(targetAssets, sub);
      if (!fs.existsSync(destSub)) {
        fs.cpSync(srcSub, destSub, { recursive: true });
        console.log(`Copied ${sub} to site/assets/${sub}`);
      }
    }
  }

  // 2. Extract all asset URLs
  const regex = /\/assets\/[a-zA-Z0-9_\-\.\/\%]+/g;
  const rawMatches = html.match(regex) || [];
  const uniqueUrls = Array.from(new Set(rawMatches.map(u => u.split('?')[0])));
  console.log(`Found ${uniqueUrls.length} unique asset paths in HTML.`);

  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const relUrl of uniqueUrls) {
    let raw = relUrl.replace(/%3F.*/i, '').replace(/%23.*/i, '').split('?')[0].split('&')[0];
    let cleanRel = decodeURIComponent(raw);
    cleanRel = cleanRel.startsWith('/') ? cleanRel.slice(1) : cleanRel;
    if (cleanRel.startsWith('assets/assets/')) {
      cleanRel = cleanRel.replace('assets/assets/', 'assets/');
    }
    cleanRel = cleanRel.replace(/[?#].*$/, '');
    const p1 = path.join(siteDir, cleanRel);
    const p2 = path.join(siteDir, 'assets', cleanRel);

    if (fs.existsSync(p1) && fs.existsSync(p2)) {
      skipped++;
      continue;
    }

    const fullUrl = `https://likova.space/${encodeURI(cleanRel)}`;
    process.stdout.write(`Downloading: ${cleanRel}... `);
    const ok = await downloadFile(fullUrl, p1);
    if (ok) {
      const p2Dir = path.dirname(p2);
      if (!fs.existsSync(p2Dir)) fs.mkdirSync(p2Dir, { recursive: true });
      fs.copyFileSync(p1, p2);
      downloaded++;
      console.log('OK');
    } else {
      failed++;
      console.log('FAILED (404/network)');
    }
  }

  console.log(`\nDone! Downloaded: ${downloaded}, Skipped existing: ${skipped}, Failed: ${failed}`);

  // 3. Fix data-barba="wrapper" on body
  let fixedHtml = html;
  if (!fixedHtml.includes('data-barba="wrapper"')) {
    fixedHtml = fixedHtml.replace(/<body([^>]*)>/i, '<body$1 data-barba="wrapper">');
    console.log('Added data-barba="wrapper" to body tag.');
  }

  // 4. Provide dummy sw.js so serviceWorker registration doesn't 404
  const swPath = path.join(siteDir, 'sw.js');
  if (!fs.existsSync(swPath)) {
    fs.writeFileSync(swPath, '// Likova Service Worker stub\nself.addEventListener("install", () => self.skipWaiting());\nself.addEventListener("activate", () => self.clients.claim());\n');
    console.log('Created sw.js stub.');
  }

  fs.writeFileSync(indexPath, fixedHtml);
}

main().catch(console.error);
