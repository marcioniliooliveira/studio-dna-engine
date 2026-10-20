const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsDir = path.resolve('clientes/negocia-bem/site/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const assets = [
  // S02: Propósito & Jornada (3 imagens distintas)
  { name: 's02-casa-propria.webp', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fm=webp&w=1200&q=82' },
  { name: 's02-investimento.webp', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fm=webp&w=1200&q=82' },
  { name: 's02-aluguel.webp', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fm=webp&w=1200&q=82' },

  // Oportunidades (Desktop & Mobile)
  { name: 'oportunidades-casas-main.webp', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fm=webp&w=1000&q=82' },
  { name: 'oportunidades-casas-accent.webp', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fm=webp&w=700&q=82' },
  { name: 'oportunidades-terrenos-main.webp', url: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fm=webp&w=1000&q=82' },
  { name: 'oportunidades-terrenos-accent.webp', url: 'https://images.unsplash.com/photo-1524813686514-a57563d77d4f?auto=format&fm=webp&w=700&q=82' },
  { name: 'oportunidades-aluguel-main.webp', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fm=webp&w=1000&q=82' },
  { name: 'oportunidades-aluguel-accent.webp', url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fm=webp&w=700&q=82' },

  // Perto de Tudo (Sessão 04 - Centro e laterais da conexão metropolitana Maringá/Paiçandu)
  { name: 'perto-de-tudo-center.webp', url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fm=webp&w=1000&q=82' },
  { name: 'perto-de-tudo-side-1.webp', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fm=webp&w=700&q=82' },
  { name: 'perto-de-tudo-side-2.webp', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fm=webp&w=700&q=82' },

  // Footer
  { name: 'footer-night-house.webp', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fm=webp&w=1200&q=82' },

  // Hero Poster
  { name: 'hero-poster.webp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fm=webp&w=1400&q=82' }
];

function download(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(assetsDir, item.name);
    const file = fs.createWriteStream(dest);

    https.get(item.url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, redirectRes => {
          redirectRes.pipe(file);
          file.on('finish', () => { file.close(); resolve(dest); });
        }).on('error', err => { fs.unlink(dest, () => {}); reject(err); });
      } else if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => { file.close(); resolve(dest); });
      } else {
        reject(new Error(`Status ${res.statusCode} for ${item.url}`));
      }
    }).on('error', err => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function run() {
  console.log('Downloading curated regional assets into', assetsDir);
  for (const a of assets) {
    try {
      const dest = await download(a);
      const size = fs.statSync(dest).size;
      console.log(`[OK] ${a.name} (${Math.round(size / 1024)} KB)`);
    } catch (e) {
      console.error(`[ERR] ${a.name}:`, e.message);
    }
  }
}

run();
