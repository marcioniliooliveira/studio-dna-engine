const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function checkScripts() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const html = fs.readFileSync(path.join(__dirname, '..', 'clientes', 'opxy-tuning-lab', 'site', 'index.html'), 'utf8');
  const scripts = [...html.matchAll(/<script([\s\S]*?)<\/script>/gi)];

  console.log(`Found ${scripts.length} script tags.`);

  for (let i = 0; i < scripts.length; i++) {
    const tag = scripts[i][0];
    const content = scripts[i][1];
    const isModule = tag.includes('type="module"');
    const isImportMap = tag.includes('type="importmap"');
    if (isImportMap) continue;

    try {
      if (isModule) {
        // Module syntax test
        await page.addScriptTag({ content, type: 'module' });
      } else {
        await page.addScriptTag({ content });
      }
      console.log(`Script ${i} (length: ${content.length}): OK`);
    } catch (err) {
      console.error(`Script ${i} (length: ${content.length}): FAILED WITH ERROR:`, err.message);
    }
  }

  await browser.close();
}

checkScripts();
