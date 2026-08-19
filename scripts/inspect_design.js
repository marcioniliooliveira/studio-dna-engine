const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  // Mudamos para headless: false para você VER o navegador abrindo e testar se funciona
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  try {
    console.log('1. Bloqueando mídias pesadas para acelerar...');
    // Bloqueia imagens e fontes para o site carregar em 2 segundos
    await page.route('**/*.{png,jpg,jpeg,gif,webp,woff,woff2,ttf}', route => route.abort());

    console.log('2. Abrindo o site...');
    // Entra no site e espera apenas o HTML básico carregar (domcontentloaded)
    await page.goto('https://grotesk-zero-45.aura.build/', { 
      waitUntil: 'domcontentloaded', 
      timeout: 20000 
    });

    console.log('3. Analisando estrutura de scripts e CSS...');

    const designSystem = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
      const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
      
      // Tenta pegar o elemento principal do texto
      const heroElement = document.querySelector('h1') || document.querySelector('main') || document.body;
      const computed = window.getComputedStyle(heroElement);

      return {
        heroFont: computed.fontFamily,
        detectedScripts: scripts,
        detectedCSS: stylesheets
      };
    });

    // Salva o arquivo local
    fs.writeFileSync('design_dna.json', JSON.stringify(designSystem, null, 2));
    console.log('\n✅ SUCESSO! O arquivo design_dna.json foi criado.');

  } catch (error) {
    console.error('❌ Ocorreu um erro:', error.message);
  } finally {
    console.log('Fechando o navegador...');
    await browser.close();
  }
})();

