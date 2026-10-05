const test = require('node:test');
const assert = require('node:assert/strict');
const { isAllowedAssetUrl, isModernAssetExtension } = require('../src/core/cloner');

test('isAllowedAssetUrl allows essential media and 3D CDNs', () => {
  // Sanity CDN (used by HabitSupps for 3D character GIFs and product media)
  assert.equal(
    isAllowedAssetUrl(
      'https://cdn.sanity.io/images/iuz0iuzl/production/5b0d53ac00d7f197f5db23d5d80be01a9fbbff5f-500x327.gif',
      'www.habitsupps.com'
    ),
    true,
    'Sanity image/gif CDN should be allowed'
  );

  assert.equal(
    isAllowedAssetUrl(
      'https://cdn.sanity.io/files/iuz0iuzl/production/556dcceca85f3682957e4f9aff6f3cb020cce4df.mp4',
      'www.habitsupps.com'
    ),
    true,
    'Sanity video CDN should be allowed'
  );

  // Vercel app assets (used by MoreNutrition for scripts, css and canvas frame sequence)
  assert.equal(
    isAllowedAssetUrl(
      'https://morematcha.vercel.app/scripts/app.js',
      'more-nutrition.webflow.io'
    ),
    true,
    'Vercel scripts should be allowed'
  );

  assert.equal(
    isAllowedAssetUrl(
      'https://morematcha.vercel.app/img/seq_0_50.webp',
      'more-nutrition.webflow.io'
    ),
    true,
    'Vercel canvas sequence images should be allowed'
  );

  // Dropbox user content (used for video testimonials)
  assert.equal(
    isAllowedAssetUrl(
      'https://www.dl.dropboxusercontent.com/scl/fi/sn5g0ke38hntd7qchzhn3/test.mp4',
      'more-nutrition.webflow.io'
    ),
    true,
    'Dropbox media CDN should be allowed'
  );
});

test('isAllowedAssetUrl strictly blocks analytics and telemetry', () => {
  assert.equal(
    isAllowedAssetUrl('https://www.google-analytics.com/analytics.js', 'www.habitsupps.com'),
    false
  );
  assert.equal(
    isAllowedAssetUrl('https://connect.facebook.net/en_US/fbevents.js', 'more-nutrition.webflow.io'),
    false
  );
  assert.equal(
    isAllowedAssetUrl('https://cloud.umami.is/script.js', 'more-nutrition.webflow.io'),
    false
  );
});

test('isModernAssetExtension identifies modern interactive and 3D asset formats', () => {
  assert.equal(isModernAssetExtension('.glb'), true);
  assert.equal(isModernAssetExtension('.gltf'), true);
  assert.equal(isModernAssetExtension('.webp'), true);
  assert.equal(isModernAssetExtension('.mp4'), true);
});
