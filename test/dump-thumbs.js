const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:4000/');
  const dir = 'copias/habitsupps-com/site/assets/vendor/cdn.sanity.io/files/iuz0iuzl/production';
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const frameBase64 = await page.evaluate(async (filename) => {
      const v = document.createElement('video');
      v.src = '/copias/habitsupps-com/site/assets/vendor/cdn.sanity.io/files/iuz0iuzl/production/' + filename;
      v.crossOrigin = 'anonymous';
      v.muted = true;
      document.body.appendChild(v);
      await new Promise(r => v.onloadedmetadata = r);
      v.currentTime = 1.0;
      await new Promise(r => v.onseeked = r);
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(v, 0, 0, 200, 200);
      const data = canvas.toDataURL('image/png').split(',')[1];
      v.remove();
      return data;
    }, f);
    fs.writeFileSync(`scratch/habit-thumb-${i}.png`, Buffer.from(frameBase64, 'base64'));
    console.log(`Video ${i}: ${f}`);
  }
  await browser.close();
})();
