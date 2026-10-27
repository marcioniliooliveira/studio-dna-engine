const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');

test('interactive-cloud-hero.html exists and contains complete standalone implementation', () => {
  const htmlPath = path.resolve(__dirname, 'interactive-cloud-hero.html');
  assert(fs.existsSync(htmlPath), 'interactive-cloud-hero.html file exists');

  const content = fs.readFileSync(htmlPath, 'utf8');

  // Verify CDN dependencies
  assert(content.includes('three.min.js'), 'Includes Three.js r128 CDN');
  assert(content.includes('OrbitControls.js'), 'Includes OrbitControls CDN');
  assert(content.includes('cdn.tailwindcss.com'), 'Includes Tailwind CSS CDN');

  // Verify inlined physics, math, and layout engines
  assert(content.includes('function computeProjectileWake'), 'Inlines computeProjectileWake');
  assert(content.includes('function applySpringRelaxation'), 'Inlines applySpringRelaxation');
  assert(content.includes('function calculateProjectileTrajectory'), 'Inlines calculateProjectileTrajectory');
  assert(content.includes('function generateCloudClusterSegments'), 'Inlines generateCloudClusterSegments');
  assert(content.includes('const DEFAULT_CLUSTERS ='), 'Defines 5 default clusters');

  // Verify 21st.dev UI Elements
  assert(content.includes('Launch Your'), 'Contains Line 1 headline');
  assert(content.includes('Workflow Into Orbit'), 'Contains Line 2 headline');
  assert(content.includes('Trusted by forward-thinking teams.'), 'Contains trust badge text');
  assert(content.includes('Get Started for Free'), 'Contains primary CTA');
  assert(content.includes('Explore Features'), 'Contains secondary CTA');
  assert(content.includes('hero-gradient-line1'), 'Contains headline 1 gradient styling');
  assert(content.includes('hero-gradient-line2'), 'Contains headline 2 gradient styling');

  // Verify diagnostic exposure
  assert(content.includes('window.__interactiveCloudHero ='), 'Exposes diagnostic registry on window');
});

test('interactive-cloud-hero-screenshot.png exists from browser verification', () => {
  const screenshotPath = path.resolve(__dirname, 'interactive-cloud-hero-screenshot.png');
  assert(fs.existsSync(screenshotPath), 'Screenshot exists on disk');
  const stats = fs.statSync(screenshotPath);
  assert(stats.size > 10000, `Screenshot size (${stats.size} bytes) indicates valid captured image`);
});
