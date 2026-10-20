const fs = require('fs');
const path = require('path');

function analyzeFile(name, relativePath) {
  const filePath = path.resolve(relativePath);
  if (!fs.existsSync(filePath)) {
    console.log(`[!] File not found: ${filePath}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  console.log(`\n======================================================`);
  console.log(`🔬 DIAGNÓSTICO PROFUNDO DE REVEALS: ${name}`);
  console.log(`======================================================`);

  // 1. Webflow IX2 / IX3
  const wIds = content.match(/data-w-id="[^"]+"/g) || [];
  console.log(`1. Webflow Interaction IDs (data-w-id): ${wIds.length}`);

  // 2. Custom Data Attributes for animations
  const dataAnims = content.match(/data-anim="[^"]+"/g) || [];
  const dataReveals = content.match(/data-reveal[a-zA-Z0-9-_]*(=["'][^"']*["'])?/g) || [];
  const dataScribbles = content.match(/data-scribble(=["'][^"']*["'])?/g) || [];
  const dataSplides = content.match(/data-splide/g) || [];
  const dataScrolls = content.match(/data-scroll[a-zA-Z0-9-_]*(=["'][^"']*["'])?/g) || [];
  console.log(`2. Data Attributes de Animação:`);
  console.log(`   - data-anim: ${dataAnims.length}`);
  console.log(`   - data-reveal: ${dataReveals.length}`);
  console.log(`   - data-scribble: ${dataScribbles.length}`);
  console.log(`   - data-scroll: ${dataScrolls.length}`);
  console.log(`   - data-splide: ${dataSplides.length}`);

  // 3. Classes comuns de Reveal / Hide
  const revealClasses = content.match(/class="[^"]*(reveal|fade|slide|mask|hidden|invisible|is-active|clip)[^"]*"/gi) || [];
  console.log(`3. Classes HTML com termos de animação/reveal: ${revealClasses.length}`);

  // 4. SplitText / Spans de quebra de texto
  const lineSplits = content.match(/class="[^"]*(line|word|char|split)[^"]*"/gi) || [];
  console.log(`4. Possíveis nós de SplitText (.line, .word, .char): ${lineSplits.length}`);

  // 5. CSS Keyframes e Regras de Opacity/Transform/Clip-path
  const keyframes = content.match(/@keyframes\s+([a-zA-Z0-9-_]+)/g) || [];
  console.log(`5. Keyframes CSS declarados no HTML: ${keyframes.map(k => k.replace('@keyframes ', '')).join(', ') || 'Nenhum'}`);

  // 6. Scripts vinculados
  const scripts = content.match(/<script[^>]*src=["']([^"']+)["'][^>]*>/gi) || [];
  console.log(`6. Scripts externos no HTML:`);
  scripts.forEach(s => {
    const src = (s.match(/src=["']([^"']+)["']/) || [])[1];
    console.log(`   - ${src}`);
  });

  // 7. Verificação de inline JS com GSAP, ScrollTrigger, Lenis, IntersectionObserver
  const hasGsap = /gsap\./i.test(content) || /ScrollTrigger/i.test(content);
  const hasLenis = /Lenis/i.test(content);
  const hasObserver = /IntersectionObserver/i.test(content);
  console.log(`7. Motores JS presentes no arquivo:`);
  console.log(`   - GSAP / ScrollTrigger: ${hasGsap}`);
  console.log(`   - Lenis: ${hasLenis}`);
  console.log(`   - IntersectionObserver: ${hasObserver}`);

  // 8. Universal Unlock / Scroll Director interferência
  const hasUnlock = content.includes('id="universal-unlock-css"');
  const hasDirector = content.includes('id="universal-scroll-director"');
  console.log(`8. Mecanismos de Fallback / Desbloqueio injetados:`);
  console.log(`   - universal-unlock-css: ${hasUnlock}`);
  console.log(`   - universal-scroll-director: ${hasDirector}`);

  // 9. Elementos mascarados com opacity: 0 ou clip-path
  const inlineHidden = content.match(/style="[^"]*(opacity:\s*0|visibility:\s*hidden|transform:\s*translate|clip-path)[^"]*"/gi) || [];
  console.log(`9. Elementos com opacidade 0 ou transform inline: ${inlineHidden.length}`);
}

analyzeFile('AIR Center (copias/aircenter-space)', 'copias/aircenter-space/site/index.html');
analyzeFile('21Oaks (copias/21oaks-org)', 'copias/21oaks-org/site/index.html');
