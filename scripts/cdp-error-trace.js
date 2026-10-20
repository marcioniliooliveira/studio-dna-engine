const { chromium } = require('playwright');

async function findErrorSource(url) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Ativa CDP
  const client = await page.context().newCDPSession(page);
  await client.send('Runtime.enable');

  client.on('Runtime.exceptionThrown', params => {
    const details = params.exceptionDetails;
    console.log(`\n🚨 CDP EXCEPTION in ${url}:`);
    console.log(`   Message: ${details.text} ${details.exception?.description || ''}`);
    console.log(`   URL: ${details.url}`);
    console.log(`   Line: ${details.lineNumber}, Col: ${details.columnNumber}`);
    if (details.stackTrace) {
      console.log(`   Stack:`, JSON.stringify(details.stackTrace.callFrames, null, 2));
    }
  });

  await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 }).catch(e => console.log('Navigation timeout/err:', e.message));
  await page.waitForTimeout(1000);
  await browser.close();
}

async function run() {
  await findErrorSource('http://localhost:4000/copias/21oaks-org/site/index.html');
  await findErrorSource('http://localhost:4000/copias/aircenter-space/site/index.html');
}

run();
