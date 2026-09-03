const fs = require('fs');
const path = require('path');

const baseDir = path.resolve('test/fixtures/deep-scrutiny-negatives');
if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });

// 1. Fixture: Sticky Broken
const stickyDir = path.join(baseDir, 'negative-sticky-broken');
if (!fs.existsSync(stickyDir)) fs.mkdirSync(stickyDir, { recursive: true });
fs.writeFileSync(path.join(stickyDir, 'index.html'), `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Negative Test: Sticky Broken</title>
  <style>
    .ancestor-container { overflow-x: hidden; height: 1000px; }
    .sticky-box { position: sticky; top: 20px; height: 100px; background: red; }
  </style>
</head>
<body>
  <div class="ancestor-container">
    <div class="sticky-box">Elemento Sticky Quebrado</div>
  </div>
</body>
</html>
`.trim());

// 2. Fixture: AABB Overlap
const aabbDir = path.join(baseDir, 'negative-aabb-overlap');
if (!fs.existsSync(aabbDir)) fs.mkdirSync(aabbDir, { recursive: true });
fs.writeFileSync(path.join(aabbDir, 'index.html'), `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Negative Test: AABB Overlap</title>
  <style>
    .nav-link { position: relative; width: 200px; height: 50px; display: block; }
    .nav-link-text { position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 1; visibility: visible; }
  </style>
</head>
<body>
  <div class="nav-link">
    <div class="nav-link-text is-default">Texto Primário</div>
    <div class="nav-link-text is-absolute">Texto Secundário Sobreposto</div>
  </div>
</body>
</html>
`.trim());

// 3. Fixture: Click Hijack
const clickDir = path.join(baseDir, 'negative-click-hijack');
if (!fs.existsSync(clickDir)) fs.mkdirSync(clickDir, { recursive: true });
fs.writeFileSync(path.join(clickDir, 'index.html'), `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Negative Test: Click Hijack</title>
  <style>
    .btn-wrapper { position: relative; width: 200px; height: 50px; display: inline-block; }
    .primary-btn { display: block; width: 100%; height: 100%; background: blue; color: white; }
    .hijack-layer { position: absolute; inset: 0; z-index: 999; background: rgba(0,0,0,0); pointer-events: auto; }
  </style>
</head>
<body>
  <div class="btn-wrapper">
    <a href="#contact" class="primary-btn">Falar com Especialista</a>
    <div class="hijack-layer" id="intruder-div"></div>
  </div>
</body>
</html>
`.trim());

// 4. Fixture: Language Leak
const langDir = path.join(baseDir, 'negative-language-leak');
if (!fs.existsSync(langDir)) fs.mkdirSync(langDir, { recursive: true });
fs.writeFileSync(path.join(langDir, 'index.html'), `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Negative Test: Language Leak</title>
</head>
<body>
  <h1>Consultoria de Growth</h1>
  <p>Somos uma results-driven agência focada em tráfego.</p>
</body>
</html>
`.trim());

// 5. Fixture: Layout Bleed
const bleedDir = path.join(baseDir, 'negative-layout-bleed');
if (!fs.existsSync(bleedDir)) fs.mkdirSync(bleedDir, { recursive: true });
fs.writeFileSync(path.join(bleedDir, 'index.html'), `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Negative Test: Layout Bleed</title>
  <style>
    body { margin: 0; }
    .bleeding-wide-box { width: 900px; height: 100px; background: orange; }
  </style>
</head>
<body>
  <div class="bleeding-wide-box">Caixa larga que quebra a tela no mobile</div>
</body>
</html>
`.trim());

console.log('✅ 5 Fixtures Negativas com Defeitos Intencionais Criadas com Sucesso!');
