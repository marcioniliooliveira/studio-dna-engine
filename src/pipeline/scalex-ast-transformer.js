/**
 * src/pipeline/scalex-ast-transformer.js
 * 
 * Compilador Semântico Canônico AST DOM (Cheerio) para SCALEX Growth & SEO (Caso 04)
 * 
 * Executa as alterações estruturadas orientadas pelo Princípio de Pareto (80/20) e
 * blinda contra os 5 pontos cegos:
 * 1. Altura base estável para scroll trigger do Floating Dock
 * 2. Exit-intent omnidirecional
 * 3. Atributos data-scalex-compiled e data-wf-ignore para isolamento de runtime Webflow
 * 4. A11y com visibility: hidden/visible e max-height calibrado (140px)
 * 5. Toast fora do fluxo (position: fixed, zero CLS)
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function transformScalexSite() {
  const root = path.resolve(__dirname, '../../');
  const clientDir = path.join(root, 'clientes', 'flashtech-caso-04-growth');
  const htmlPath = path.join(clientDir, 'site', 'index.html');
  const slotsPath = path.join(clientDir, 'content-slots.json');

  if (!fs.existsSync(htmlPath)) {
    throw new Error(`Arquivo alvo não encontrado: ${htmlPath}`);
  }

  const rawHtml = fs.readFileSync(htmlPath, 'utf8');
  const slots = fs.existsSync(slotsPath) ? JSON.parse(fs.readFileSync(slotsPath, 'utf8')) : {};

  const $ = cheerio.load(rawHtml, { decodeEntities: false });

  // ---------------------------------------------------------------------------
  // 1. ISOLAMENTO E BADGES DE AUTORIDADE (P1)
  // ---------------------------------------------------------------------------
  // Remover TODOS os badges anteriores em todo o documento para garantir idempotência global
  $('.scalex-authority-badges').remove();

  const resultHeadings = $('.section.result .section-headings-wrapper').first();
  if (resultHeadings.length > 0) {
    const badgesHtml = `
<div class="scalex-authority-badges" data-scalex-compiled="true" data-wf-ignore="" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin: 28px 0 36px 0;">
  <div class="scalex-badge" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 197, 82, 0.08); border: 1px solid rgba(255, 197, 82, 0.25); border-radius: 999px; padding: 8px 18px; color: #FFFFFF; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
    <span style="color: #FFC552;">✦</span> Core Web Vitals Specialist
  </div>
  <div class="scalex-badge" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 197, 82, 0.08); border: 1px solid rgba(255, 197, 82, 0.25); border-radius: 999px; padding: 8px 18px; color: #FFFFFF; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
    <span style="color: #FFC552;">✦</span> Google Partner Premier
  </div>
  <div class="scalex-badge" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(255, 197, 82, 0.08); border: 1px solid rgba(255, 197, 82, 0.25); border-radius: 999px; padding: 8px 18px; color: #FFFFFF; font-size: 12px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;">
    <span style="color: #FFC552;">✦</span> Data Attribution Certified
  </div>
</div>`;
    resultHeadings.append(badgesHtml);
  }

  // ---------------------------------------------------------------------------
  // 2. ESTEIRA DE BLOG MARQUEE (P1)
  // ---------------------------------------------------------------------------
  const blogArticles = [
    'Como Escalar Tráfego Orgânico B2B com Clusters Semânticos',
    'Core Web Vitals: Reduzindo o LCP para menos de 0.8s',
    'SEO Programático &amp; Indexação de Aplicações JavaScript',
    'Auditoria Forense de CRO: Da Visita ao Pipeline Qualificado'
  ];

  $('.footer-marquee .footer-marquee-image-wrapper').each((idx, el) => {
    const article = blogArticles[idx % blogArticles.length];
    $(el).html(`
      <div class="footer-marquee-text" data-scalex-compiled="true" data-wf-ignore="" style="font-family: Anton, sans-serif; font-size: clamp(3rem, 6vw, 6.5rem); color: #FFC552; text-transform: uppercase; padding: 0 40px; display: inline-block; white-space: nowrap; line-height: 0.95;">
        ${article} <span style="color: rgba(255,255,255,0.3); font-size: 0.7em; margin: 0 20px;">✦</span>
      </div>
    `);
  });

  // ---------------------------------------------------------------------------
  // 3. HOVER REVEAL NOS SERVIÇOS COM A11Y E MAX-HEIGHT CALIBRADO (P3)
  // ---------------------------------------------------------------------------
  // Subtítulo em português
  $('.section-sub-heading.service').text('Acelere o alcance do seu site e atraia o público ideal com engenharia de dados e SEO técnico.');

  const serviceDetails = [
    {
      stack: 'Moz Pro API, Ahrefs Enterprise, Pitchbox',
      entregaveis: 'Backlinks Tier 1, Matriz Editorial de Autoridade',
      impacto: '+240% em Domain Rating e aceleração de rankings.'
    },
    {
      stack: 'Clearscope, Surfer SEO, Semrush, Search Console API',
      entregaveis: 'Clusters Temáticos Pillar/Cluster, Mapeamento NLP',
      impacto: '+320% de visibilidade no Top 3 do Google em 90 dias.'
    },
    {
      stack: 'Lighthouse CI, Chrome DevTools, Screaming Frog, Cloudflare',
      entregaveis: 'Redução LCP &lt; 0.8s, Zero CLS, Schema.org Completo',
      impacto: '100% Core Web Vitals aprovados no relatório CrUX.'
    },
    {
      stack: 'Microsoft Clarity, Google Analytics 4, BigQuery, Hotjar B2B',
      entregaveis: 'Mapeamento de Fricção de Funil, Testes A/B de Copy &amp; CTA',
      impacto: '+42% na taxa média de conversão em leads qualificados.'
    }
  ];

  $('.service-card').each((idx, el) => {
    const headingsWrap = $(el).find('.service-card-headings-wrapper');
    headingsWrap.find('.service-hover-reveal').remove(); // Idempotência

    const details = serviceDetails[idx] || serviceDetails[0];
    const revealHtml = `
<div class="service-hover-reveal" data-scalex-compiled="true" data-wf-ignore="">
  <div class="service-reveal-item"><strong style="color: #FFC552;">Stack:</strong> ${details.stack}</div>
  <div class="service-reveal-item"><strong style="color: #FFC552;">Entregáveis:</strong> ${details.entregaveis}</div>
  <div class="service-reveal-item"><strong style="color: #FFC552;">Impacto Médio:</strong> ${details.impacto}</div>
</div>`;
    headingsWrap.append(revealHtml);
  });

  // Injetar CSS de hover com visibility e max-height calibrado em 140px
  $('#scalex-service-hover-style').remove();
  $('head').append(`
<style id="scalex-service-hover-style" data-scalex-compiled="true">
  .service-hover-reveal {
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    visibility: hidden;
    transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease, visibility 0.25s ease;
    margin-top: 0;
    font-size: 13px;
    line-height: 1.6;
    color: #A0A5B5;
  }
  .service-card:hover .service-hover-reveal,
  .service-card:focus-within .service-hover-reveal {
    max-height: 140px;
    opacity: 1;
    visibility: visible;
    margin-top: 12px;
  }
  .service-reveal-item {
    margin-bottom: 4px;
  }
</style>
`);

  // ---------------------------------------------------------------------------
  // 4. PLANOS DE ACELERAÇÃO B2B (P4)
  // ---------------------------------------------------------------------------
  const planConfigs = [
    {
      name: 'Tração',
      priceDisplay: 'SOB MEDIDA',
      sub: 'Focado em Estruturação &amp; Tração',
      desc: 'Para operações em fase de tração acelerando indexação e primeiras posições.'
    },
    {
      name: 'Escala',
      priceDisplay: 'SOB MEDIDA',
      sub: 'Focado em Escala &amp; Domínio de Busca',
      desc: 'Para empresas consolidadas com múltiplos clusters que buscam liderança de mercado.'
    },
    {
      name: 'Corporativo',
      priceDisplay: 'ENTERPRISE',
      sub: 'Squad Dedicado &amp; SLA Corporativo',
      desc: 'Para líderes setoriais e grandes e-commerces que exigem equipe sênior dedicada.'
    }
  ];

  $('.pricing-tab-pane').each((idx, pane) => {
    const config = planConfigs[idx] || planConfigs[0];
    $(pane).find('.pricing-text').html(`
      <span style="font-size: 2.2rem; font-family: Anton, sans-serif; color: #FFC552;">${config.priceDisplay}</span>
      <span class="small" style="font-size: 0.9rem; font-family: Inter, sans-serif; color: #A0A5B5; display: block; margin-top: 4px;">${config.sub}</span>
    `);
    $(pane).find('.pricing-card-short-description').html(config.desc);

    const btnWrap = $(pane).find('.pricing-card-btn-wrapper');
    btnWrap.html(`
      <a href="#contact" data-plan="${config.name}" data-scalex-compiled="true" class="primary-btn w-inline-block scalex-plan-cta" style="transform-style: preserve-3d; text-decoration: none;">
        <div class="primary-btn-bg"><img loading="eager" src="https://cdn.prod.website-files.com/69a94d5051ada59087892bea/69abf03bd757f4d4cf82b2b8_primary%20btn%20bg.avif" alt="primary btn bg" class="primary-btn-bg-image"></div>
        <div class="primary-btn-gradient"></div>
        <div class="primary-btn-texts-wrapper">
          <div class="primary-btn-text is-default" style="transform-style: preserve-3d; filter: blur(0px);">Qualificar Operação (${config.name})</div>
          <div class="primary-btn-text is-absolute" style="transform-style: preserve-3d; filter: blur(5px);">Qualificar Operação (${config.name})</div>
        </div>
      </a>
    `);
  });

  // ---------------------------------------------------------------------------
  // 5. FORMULÁRIO DE CONTATO & TOAST FIXO (P4)
  // ---------------------------------------------------------------------------
  const contactForm = $('#wf-form-SCALEX---Contact-Form');
  if (contactForm.length > 0) {
    contactForm.find('#name').attr('placeholder', 'Nome Completo ou Empresa');
    contactForm.find('#Email').attr('placeholder', 'E-mail Corporativo');
    contactForm.find('#Subject').attr('placeholder', 'URL do Seu Site');

    // Injetar select se não existir
    if (contactForm.find('#scalex-plan-select').length === 0) {
      const selectHtml = `
<select id="scalex-plan-select" name="Plan" data-scalex-compiled="true" data-wf-ignore="" class="contact-form-input-field w-input" style="transform-style: preserve-3d; background: #0B0D11; color: #fff; cursor: pointer; border: 1px solid #283042; margin-bottom: 12px;">
  <option value="Tração">Plano Desejado: Tração (Estruturação Inicial)</option>
  <option value="Escala" selected>Plano Desejado: Escala (Aceleração &amp; Domínio)</option>
  <option value="Corporativo">Plano Desejado: Corporativo (Squad Dedicado)</option>
  <option value="Auditoria">Auditoria Diagnóstica Pontual</option>
</select>`;
      contactForm.find('#Message').before(selectHtml);
    }

    contactForm.find('#Message').attr('placeholder', 'Descreva seu principal gargalo de crescimento (tráfego, conversão, SEO)...');
    contactForm.find('.submit-btn-text.is-default').text('Solicitar Diagnóstico Gratuito');
    contactForm.find('.submit-btn-text.is-absolute').text('Solicitar Diagnóstico Gratuito');
  }

  // Toast flutuante com position: fixed (fora do fluxo, zero CLS)
  $('#scalex-toast').remove();
  $('body').append(`
<div id="scalex-toast" data-scalex-compiled="true" data-wf-ignore="" style="display: none; position: fixed !important; top: 24px; right: 24px; z-index: 10000; pointer-events: none; background: #121620; border: 1px solid #FFC552; border-radius: 10px; padding: 16px 24px; box-shadow: 0 16px 40px rgba(0,0,0,0.6); color: #fff; font-family: Inter, sans-serif; font-size: 14px; max-width: 380px; align-items: center; gap: 12px;">
  <span style="color: #FFC552; font-size: 20px;">✓</span>
  <div>
    <strong style="display: block; color: #fff; margin-bottom: 2px;">Diagnóstico Solicitado!</strong>
    <span style="color: #A0A5B5; font-size: 13px;">Nossa equipe entrará em contato em até 2 horas úteis.</span>
  </div>
</div>
`);

  // ---------------------------------------------------------------------------
  // 6. FLOATING DOCK NÃO-BLOQUEANTE (P2)
  // ---------------------------------------------------------------------------
  $('#scalex-audit-modal').remove();
  $('body').append(`
<div id="scalex-audit-modal" data-scalex-compiled="true" data-wf-ignore="" style="display: none; position: fixed; bottom: 24px; right: 24px; width: 380px; max-width: calc(100vw - 48px); z-index: 9999; flex-direction: column; background: transparent; padding: 0; margin: 0; box-sizing: border-box;">
  <div style="position: relative; width: 100%; background: #121620; border: 1px solid #283042; border-top: 3px solid #FFC552; border-radius: 14px; padding: 22px 24px; box-shadow: 0 16px 48px rgba(0,0,0,0.7); text-align: left; box-sizing: border-box;">
    <button id="scalex-modal-close" style="position: absolute; top: 14px; right: 14px; background: transparent; border: none; color: #8C93A8; font-size: 22px; cursor: pointer; line-height: 1; padding: 4px 8px; border-radius: 4px; transition: color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#8C93A8'" aria-label="Fechar">✕</button>
    <div style="display: inline-flex; align-items: center; gap: 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #FFC552; font-weight: 700; margin-bottom: 6px;">
      <span>✦</span> DIAGNÓSTICO RÁPIDO (30 MIN)
    </div>
    <h4 style="font-size: 19px; color: #fff; font-family: Anton, sans-serif; text-transform: uppercase; margin: 0 0 6px 0; letter-spacing: 0.5px;">Agendar Sessão de Growth</h4>
    <p style="font-size: 13px; color: #A0A5B5; line-height: 1.4; margin: 0 0 14px 0;">Descubra os gargalos de SEO e CRO da sua empresa com nossos consultores seniores.</p>
    
    <div style="margin-bottom: 12px;">
      <label style="display: block; font-size: 11px; text-transform: uppercase; color: #8C93A8; margin-bottom: 6px; font-weight: 600;">Selecione o Horário Disponível:</label>
      <div style="display: flex; gap: 6px;" id="scalex-time-slots">
        <button type="button" class="time-slot-btn" data-slot="Amanhã 14h" style="flex: 1; padding: 8px 4px; font-size: 11px; font-weight: 600; border-radius: 6px; border: 1px solid #FFC552; background: rgba(255, 197, 82, 0.15); color: #FFC552; cursor: pointer; text-align: center;">Amanhã 14h</button>
        <button type="button" class="time-slot-btn" data-slot="Quinta 10h30" style="flex: 1; padding: 8px 4px; font-size: 11px; font-weight: 600; border-radius: 6px; border: 1px solid #283042; background: #0B0D11; color: #A0A5B5; cursor: pointer; text-align: center;">Quinta 10h30</button>
        <button type="button" class="time-slot-btn" data-slot="Sexta 16h" style="flex: 1; padding: 8px 4px; font-size: 11px; font-weight: 600; border-radius: 6px; border: 1px solid #283042; background: #0B0D11; color: #A0A5B5; cursor: pointer; text-align: center;">Sexta 16h</button>
      </div>
    </div>

    <form id="scalex-dock-form" style="display: flex; flex-direction: column; gap: 10px;">
      <input type="text" id="scalex-dock-site" placeholder="URL do seu site (ex: empresa.com.br)" required="" style="width: 100%; padding: 11px 14px; border-radius: 8px; border: 1px solid #283042; background: #0B0D11; color: #fff; font-size: 13px; box-sizing: border-box;">
      <input type="email" id="scalex-dock-email" placeholder="Seu e-mail corporativo" required="" style="width: 100%; padding: 11px 14px; border-radius: 8px; border: 1px solid #283042; background: #0B0D11; color: #fff; font-size: 13px; box-sizing: border-box;">
      <button type="submit" id="scalex-dock-submit" style="width: 100%; padding: 13px; border-radius: 8px; border: none; background: #FFC552; color: #0B0D11; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.8px; cursor: pointer; transition: background 0.2s;">Confirmar Diagnóstico</button>
    </form>
    <div id="scalex-dock-feedback" style="display: none; color: #10B981; font-size: 13px; font-weight: 600; text-align: center; margin-top: 10px;">✓ Horário reservado! Entraremos em contato.</div>
  </div>
</div>
`);

  // ---------------------------------------------------------------------------
  // 7. SCRIPT CLIENT-SIDE BLINDADO (Anti-Pontos Cegos)
  // ---------------------------------------------------------------------------
  $('#scalex-runtime-script').remove();
  $('body').append(`
<script id="scalex-runtime-script" data-scalex-compiled="true">
  (function() {
    document.addEventListener("DOMContentLoaded", function() {
      // --- P2: FLOATING DOCK COM ALTURA BASE ESTÁVEL (Ponto Cego 1) ---
      var dock = document.getElementById('scalex-audit-modal');
      var closeBtn = document.getElementById('scalex-modal-close');
      var dismissed = false;

      // Captura da altura estável no DOMContentLoaded para imunidade contra P3
      var baselineHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollDebounceTimer = null;

      function openDock() {
        if (dismissed || sessionStorage.getItem('scalex_popup_seen')) return;
        dock.style.display = 'flex';
      }

      function closeDock() {
        dock.style.display = 'none';
        dismissed = true;
        sessionStorage.setItem('scalex_popup_seen', 'true');
      }

      if (closeBtn) closeBtn.addEventListener('click', closeDock);

      // Gatilho de scroll com debounce de 200ms
      window.addEventListener('scroll', function() {
        if (scrollDebounceTimer) return;
        scrollDebounceTimer = setTimeout(function() {
          scrollDebounceTimer = null;
          var targetH = baselineHeight > 0 ? baselineHeight : (document.documentElement.scrollHeight - window.innerHeight);
          if (targetH > 0 && (window.scrollY / targetH) >= 0.6) {
            openDock();
          }
        }, 200);
      }, { passive: true });

      // Ponto Cego 2: Exit-Intent Omnidirecional (cobre topo e bordas laterais)
      document.addEventListener('mouseleave', function(e) {
        openDock();
      });

      // Time slots selector mockup
      var slotBtns = document.querySelectorAll('.time-slot-btn');
      slotBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          slotBtns.forEach(function(b) {
            b.style.border = '1px solid #283042';
            b.style.background = '#0B0D11';
            b.style.color = '#A0A5B5';
          });
          btn.style.border = '1px solid #FFC552';
          btn.style.background = 'rgba(255, 197, 82, 0.15)';
          btn.style.color = '#FFC552';
        });
      });

      // Dock form submit mockup
      var dockForm = document.getElementById('scalex-dock-form');
      var dockFeedback = document.getElementById('scalex-dock-feedback');
      var dockSubmit = document.getElementById('scalex-dock-submit');
      if (dockForm) {
        dockForm.addEventListener('submit', function(e) {
          e.preventDefault();
          dockSubmit.disabled = true;
          dockSubmit.textContent = 'Enviando...';
          setTimeout(function() {
            dockForm.style.display = 'none';
            dockFeedback.style.display = 'block';
            setTimeout(closeDock, 2000);
          }, 600);
        });
      }

      // --- HERO PARALLAX SUAVE (Item 2A Sem Glow) ---
      var hero = document.querySelector('.section.hero');
      var heroImg = document.querySelector('.hero-image-move');
      if (hero && heroImg && window.innerWidth > 991) {
        hero.addEventListener('mousemove', function(e) {
          var rect = hero.getBoundingClientRect();
          var x = (e.clientX - rect.left) / rect.width - 0.5;
          var y = (e.clientY - rect.top) / rect.height - 0.5;
          heroImg.style.transform = 'translate3d(' + (x * 20) + 'px, ' + (y * 20) + 'px, 0)';
        });
        hero.addEventListener('mouseleave', function() {
          heroImg.style.transform = 'translate3d(0, 0, 0)';
          heroImg.style.transition = 'transform 0.4s ease-out';
        });
        hero.addEventListener('mouseenter', function() {
          heroImg.style.transition = 'transform 0.08s ease-out';
        });
      }

      // --- P4: PRICING PLAN SELECTION SYNC ---
      var planButtons = document.querySelectorAll('.scalex-plan-cta');
      var planSelect = document.getElementById('scalex-plan-select');
      planButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var selectedPlan = btn.getAttribute('data-plan');
          if (planSelect && selectedPlan) {
            planSelect.value = selectedPlan;
          }
        });
      });

      // --- P4: FORMULÁRIO DE CONTATO COM TOAST FORA DO FLUXO (Ponto Cego 5) ---
      var contactForm = document.getElementById('wf-form-SCALEX---Contact-Form');
      var toast = document.getElementById('scalex-toast');
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          var submitBtn = contactForm.querySelector('.submit-btn');
          if (submitBtn) {
            submitBtn.style.pointerEvents = 'none';
            submitBtn.style.opacity = '0.7';
          }

          setTimeout(function() {
            if (submitBtn) {
              submitBtn.style.pointerEvents = 'auto';
              submitBtn.style.opacity = '1';
            }
            if (toast) {
              toast.style.display = 'flex';
              setTimeout(function() {
                toast.style.display = 'none';
              }, 4000);
            }
            contactForm.reset();
          }, 600);
        });
      }

      // --- PROGRESSIVE COUNTUP STATS (Item 4A Sem Glow) ---
      var statCards = document.querySelectorAll('.about-card');
      var animated = false;
      if ('IntersectionObserver' in window && statCards.length > 0) {
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting && !animated) {
              animated = true;
              var counters = [
                { target: 17, suffix: '+' },
                { target: 50, suffix: '+' },
                { target: 1200, suffix: '+' },
                { target: 80, suffix: '%' }
              ];
              counters.forEach(function(item) {
                var startTime = performance.now();
                var duration = 1200;
                function step(now) {
                  var progress = Math.min((now - startTime) / duration, 1);
                  if (progress < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
              });
            }
          });
        }, { threshold: 0.2 });
        observer.observe(statCards[0]);
      }
    });
  })();
</script>
`);

  // Salvar o arquivo compilado
  fs.writeFileSync(htmlPath, $.html(), 'utf8');
  return {
    success: true,
    htmlPath,
    bytes: fs.statSync(htmlPath).size
  };
}

if (require.main === module) {
  try {
    const res = transformScalexSite();
    console.log(`✅ Compilação Semântica Canônica Realizada!`);
    console.log(`- Arquivo: ${res.htmlPath}`);
    console.log(`- Tamanho: ${res.bytes} bytes`);
  } catch (err) {
    console.error(`❌ Erro na compilação:`, err.message);
    process.exit(1);
  }
}

module.exports = { transformScalexSite };
