const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const dir = path.resolve('copias/habitsupps-com/site/assets/vendor/cdn.sanity.io/files/iuz0iuzl/production');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mp4'));

  for (const f of files) {
    const fileUrl = `http://127.0.0.1:4000/copias/habitsupps-com/site/assets/vendor/cdn.sanity.io/files/iuz0iuzl/production/${f}`;
    await page.goto('about:blank');
    await page.setContent(`<!DOCTYPE html><html><body><video id="v" src="${fileUrl}" preload="metadata"></video></body></html>`);
    const info = await page.evaluate(async () => {
      const v = document.getElementById('v');
      return new Promise((resolve) => {
        if (v.readyState >= 1) {
          resolve({ duration: v.duration, width: v.videoWidth, height: v.videoHeight });
        } else {
          v.onloadedmetadata = () => {
            resolve({ duration: v.duration, width: v.videoWidth, height: v.videoHeight });
          };
          v.onerror = (e) => resolve({ error: 'error loading video', code: v.error ? v.error.code : null });
          setTimeout(() => resolve({ timeout: true, readyState: v.readyState }), 4000);
        }
      });
    });
    console.log(JSON.stringify({ file: f, info }));
  }
  await browser.close();
})();
