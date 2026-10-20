const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // 1. Crop pure building photo from masters_split_zorge_v2.jpg (Left 50%)
  const zorgePath = path.resolve('clientes/silvio-iwata-imobiliaria/mockups/masters_split_zorge_v2.jpg').replace(/\\/g, '/');
  
  await page.goto('file:///' + zorgePath);
  
  const cropLeft50 = await page.evaluate(async () => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(img.naturalWidth / 2);
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.95);
  });

  const zorgeCleanBuffer = Buffer.from(cropLeft50.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
  fs.writeFileSync('clientes/silvio-iwata-imobiliaria/site/assets/palco-lithos-clean.jpg', zorgeCleanBuffer);
  console.log('✅ palco-lithos-clean.jpg saved (size:', zorgeCleanBuffer.length, 'bytes)');

  // 2. Crop individual card photos from secao_04_capsula_azimute.jpg
  // The catalog grid has 6 cards arranged in 3 columns x 2 rows
  const azimuteCatalogPath = path.resolve('clientes/silvio-iwata-imobiliaria/mockups/secao_04_capsula_azimute.jpg').replace(/\\/g, '/');
  await page.goto('file:///' + azimuteCatalogPath);

  const cardCrops = await page.evaluate(async () => {
    const img = document.querySelector('img');
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    
    // In secao_04_capsula_azimute (1376x768):
    // Header/filters take the top ~160px.
    // Row 1 cards: y ~ 180 to 450
    // Row 2 cards: y ~ 470 to 730
    // Col 1: x ~ 80 to 460
    // Col 2: x ~ 490 to 870
    // Col 3: x ~ 900 to 1280
    // Let's sample the image portion of the cards (top part of each card)
    const cardDefs = [
      { name: 'card-clarina', x: 80, y: 180, w: 370, h: 220 },
      { name: 'card-luxras', x: 490, y: 180, w: 370, h: 220 },
      { name: 'card-terraces', x: 900, y: 180, w: 370, h: 220 },
      { name: 'card-horizon', x: 80, y: 460, w: 370, h: 220 },
      { name: 'card-villa', x: 490, y: 460, w: 370, h: 220 },
      { name: 'card-duplex', x: 900, y: 460, w: 370, h: 220 }
    ];

    const results = [];
    for (const c of cardDefs) {
      const canvas = document.createElement('canvas');
      canvas.width = c.w;
      canvas.height = c.h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, c.x, c.y, c.w, c.h, 0, 0, c.w, c.h);
      results.push({ name: c.name, data: canvas.toDataURL('image/jpeg', 0.92) });
    }
    return results;
  });

  for (const c of cardCrops) {
    const buf = Buffer.from(c.data.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
    fs.writeFileSync(`clientes/silvio-iwata-imobiliaria/site/assets/${c.name}.jpg`, buf);
    console.log(`✅ ${c.name}.jpg saved (size: ${buf.length} bytes)`);
  }

  await browser.close();
}

main().catch(console.error);
