const { chromium } = require('playwright');
const fs = require('fs');

async function testCDP() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const client = await context.newCDPSession(page);
  await client.send('Runtime.enable');
  await client.send('Debugger.enable');

  client.on('Runtime.exceptionThrown', async (params) => {
    console.log('*** CDP EXCEPTION ***');
    console.log('Text:', params.exceptionDetails.text);
    console.log('LineNumber:', params.exceptionDetails.lineNumber);
    console.log('ColumnNumber:', params.exceptionDetails.columnNumber);
    try {
      const src = await client.send('Debugger.getScriptSource', { scriptId: params.exceptionDetails.scriptId });
      const lines = src.scriptSource.split('\n');
      console.log('Failing line content:');
      console.log(lines[params.exceptionDetails.lineNumber]);
    } catch(e) {
      console.log('Could not get script source:', e.message);
    }
  });

  const html = fs.readFileSync('clientes/opxy-tuning-lab/site/index.html', 'utf8');
  await page.setContent(html);
  await page.waitForTimeout(1000);

  await browser.close();
}

testCDP();
