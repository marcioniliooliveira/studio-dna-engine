const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function inspectScripts(relPath) {
  const htmlPath = path.resolve(relPath);
  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html);

  console.log(`\nAnalyzing scripts in ${relPath}:`);
  $('script').each((i, el) => {
    const src = $(el).attr('src');
    const type = $(el).attr('type');
    if (src) {
      console.log(`[Script ${i}] External: ${src} (type: ${type || 'text/javascript'})`);
      if (src.startsWith('./') || src.startsWith('/assets')) {
        const localPath = path.resolve(path.dirname(htmlPath), src);
        if (fs.existsSync(localPath)) {
          const js = fs.readFileSync(localPath, 'utf8');
          if (/\bexport\b/.test(js)) {
            console.log(`   🚨 FOUND 'export' in local file: ${src}`);
          }
        }
      }
    } else {
      const inline = $(el).html() || '';
      if (/\bexport\b/.test(inline)) {
        console.log(`   🚨 FOUND 'export' in inline script ${i}!`);
        console.log(inline.slice(0, 200));
      }
    }
  });
}

inspectScripts('copias/21oaks-org/site/index.html');
inspectScripts('copias/aircenter-space/site/index.html');
