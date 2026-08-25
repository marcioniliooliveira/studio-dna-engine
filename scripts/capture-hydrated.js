const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureHydratedSite(url, siteSlug) {
  console.log(`🚀 Capturando DOM hidratado de: ${url}...`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 15000 });
  } catch (e) {
    console.log('Navegação inicial concluída com aviso:', e.message);
  }
  await page.waitForTimeout(3000);

  // Se houver iframe de preview (como no Aura.build), extrai o HTML real do site de dentro do iframe
  const iframeContent = await page.evaluate(() => {
    const iframe = document.querySelector('iframe[title="HTML Preview"]') || document.querySelector('iframe');
    if (iframe && iframe.srcdoc) {
      return iframe.srcdoc;
    }
    return null;
  });

  let fullHtml = iframeContent || (await page.content());

  // Remove bundle de roteador que quebra em subcaminhos locais
  fullHtml = fullHtml.replace(/<script[^>]*src="[^"]*index-[^"]*\.js"[^>]*><\/script>/gi, '');
  fullHtml = fullHtml.replace(/<script>[\s\S]*?location\.hostname[\s\S]*?<\/script>/gi, '');

  const siteDir = path.resolve(__dirname, `../copias/${siteSlug}/site`);
  if (!fs.existsSync(siteDir)) fs.mkdirSync(siteDir, { recursive: true });

  const destFile = path.join(siteDir, 'index.html');
  fs.writeFileSync(destFile, fullHtml, 'utf8');

  console.log(`✅ HTML do site Northtrail extraído com sucesso em: ${destFile} (Tamanho: ${fullHtml.length} bytes)`);
  await browser.close();
}

if (require.main === module) {
  const url = process.argv[2] || 'https://northtrail-adventure-59.aura.build/';
  const slug = process.argv[3] || 'northtrail-adventure-59-aura-build';
  captureHydratedSite(url, slug).catch(console.error);
}

module.exports = { captureHydratedSite };
