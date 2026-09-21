/**
 * UniversalScrollDirector
 * Motor Universal de Orquestração Cinematográfica, Revelação de Assets e Interações 60FPS.
 * 
 * Suporta:
 * 1. Un-clipping de SplitText e Linhas Mascaradas (appear-line / appear-line-mask)
 * 2. Desbloqueio e Transição de Cortinas de Revelação (Overlay Curtains / bg-secondary z-10)
 * 3. 3D Cylindrical Project Spinner & Interactive Carousel (#intro-logo-spinner)
 * 4. Sliders Automáticos e Interativos com Barras de Progresso (Hero & Testimonials)
 * 5. Distribuição Angular e Rotação Contínua/Scroll de Ícones Radiais (Asteriscos de 8 Lâminas)
 * 6. Hover Badges Magnéticos e Micro-Interações (Explore Project, Lápis, Régua, Paperclip)
 * 7. Image Sequence Canvas (60FPS com zero-lag interpolation)
 * 8. Failsafe de Hidratação SSR / Nuxt / Next.js com Mocks de Rede
 */
class UniversalScrollDirector {
  /**
   * Gera o bloco de script para injeção no final do <body>
   * @param {Object} [options]
   * @returns {string} Código HTML com a tag <script>
   */
  static generateScript(options = {}) {
    return `<script id="universal-scroll-director">
(function() {
  'use strict';
  console.log('🎬 [Universal Scroll Director] Inicializando motor de animação, revelação de assets e 3D...');

  // --- 0. MOCK DE REDE ANTI-CRASH PARA HIDRATAÇÃO NUXT / SSR ---
  if (typeof window !== 'undefined' && window.fetch) {
    const origFetch = window.fetch;
    window.fetch = function(input, init) {
      const urlStr = typeof input === 'string' ? input : (input && input.url ? input.url : '');
      if (urlStr.includes('/builds/meta/') || urlStr.includes('/_nuxt/builds/meta/')) {
        return Promise.resolve(new Response(JSON.stringify({
          id: "1b74772f-a27f-43d9-b862-c09e2209223a",
          timestamp: 1786356888430,
          matcher: { static: {}, wildcard: {}, dynamic: {} },
          prerendered: ["/"]
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      return origFetch.apply(this, arguments).catch(function(err) {
        if (urlStr.includes('/_nuxt/') || urlStr.includes('/api/') || urlStr.includes('/_vercel/')) {
          return Promise.resolve(new Response('{}', { status: 200, headers: { 'Content-Type': 'application/json' } }));
        }
        throw err;
      });
    };
  }

  function onReady(fn) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(fn, 10);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  onReady(function() {
    // --- 1. DESBLOQUEIO IMEDIATO DE HERO, NAVBAR E ROOT SSR CONTAINERS ---
    document.querySelectorAll('.opacity-0').forEach(function(el) {
      // Ignora elementos que devem ser alternados por sliders, carrosséis ou abas
      if (el.closest('#intro-logo-spinner') || el.closest('.amenities-slide-box') || el.closest('.splide') || el.classList.contains('project-slider-progress-line') || el.classList.contains('scale-[1.05]')) {
        return;
      }
      const cs = window.getComputedStyle(el);
      if (cs.opacity === '0' && !el.id.includes('overlay')) {
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
      }
    });

    // --- 2. MOTOR UNIVERSAL DE SPLITTEXT / APPEAR-LINE REVEAL ---
    const splitLines = Array.from(document.querySelectorAll('.appear-line, .appear-line-mask, [data-v-30d30ebe] .appear-line, .splittext--line > div')).filter(function(el) {
      return !el.closest('.amenities-slide-box:not(.is-first)');
    });
    const lineMasks = Array.from(document.querySelectorAll('.appear-line-mask, [data-v-30d30ebe] .appear-line-mask')).filter(function(el) {
      return !el.closest('.amenities-slide-box:not(.is-first)');
    });

    lineMasks.forEach(function(mask) {
      mask.style.overflow = 'visible';
      mask.style.display = 'block';
    });

    splitLines.forEach(function(line, idx) {
      line.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ' + ((idx % 6) * 0.08) + 's, opacity 0.8s ease ' + ((idx % 6) * 0.08) + 's';
      line.style.transform = 'translateY(0px)';
      line.style.opacity = '1';
      line.style.visibility = 'visible';
      line.style.display = 'block';
    });

    // Restaura textos que possam estar em aria-label mas vazios nos spans internos
    document.querySelectorAll('[aria-label][data-v-30d30ebe]').forEach(function(container) {
      const label = container.getAttribute('aria-label');
      if (label && (!container.innerText || container.innerText.trim() === '')) {
        const line = container.querySelector('.appear-line');
        if (line) line.textContent = label;
      }
    });

    // --- 3. REVELAÇÃO CINEMATOGRÁFICA DE CORTINAS SOBRE IMAGENS (OVERLAY CURTAINS) ---
    // Procura divs com bg-secondary e z-10 cobrindo imagens de serviços e projetos
    const curtainOverlays = Array.from(document.querySelectorAll('div.bg-secondary.z-10, div[class*="bg-secondary"][class*="z-10"], div[class*="bg-black"][class*="z-10"]'));
    curtainOverlays.forEach(function(curtain) {
      // Verifica se é uma cortina sobreposta a uma imagem
      const parent = curtain.parentElement;
      if (parent && (parent.querySelector('img') || parent.classList.contains('overflow-hidden') || parent.classList.contains('aspect-[5/3]'))) {
        curtain.style.transition = 'transform 1.1s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.8s ease';
        curtain.style.transformOrigin = 'top';
        curtain.style.pointerEvents = 'none';

        const observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              curtain.style.transform = 'translateY(-101%)';
              curtain.style.opacity = '0';
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });

        observer.observe(parent);
      }
    });

    // --- 4. MOTOR 3D CILÍNDRICO PROCEDURAL (#intro-logo-spinner) ---
    const spinnerContainer = document.getElementById('intro-logo-spinner');
    if (spinnerContainer) {
      const squares = Array.from(spinnerContainer.querySelectorAll('[data-spinner-square]'));
      const count = squares.length || 8;
      const angleStep = 360 / count;
      const radius = window.innerWidth > 640 ? (window.innerWidth * 0.48) : (window.innerWidth * 0.7);

      spinnerContainer.style.transformStyle = 'preserve-3d';
      spinnerContainer.style.position = 'relative';

      squares.forEach(function(sq, i) {
        const angle = i * angleStep;
        sq.style.position = 'absolute';
        sq.style.left = '50%';
        sq.style.top = '50%';
        sq.style.margin = '-' + (sq.offsetHeight / 2) + 'px 0 0 -' + (sq.offsetWidth / 2) + 'px';
        sq.style.transformOrigin = 'center center';
        sq.style.transform = 'rotateY(' + angle + 'deg) translateZ(' + radius + 'px)';
        sq.style.opacity = '1';
        sq.style.transition = 'opacity 0.5s ease, filter 0.5s ease, transform 0.3s ease-out';
        sq.style.pointerEvents = 'auto';

        // Revela imagem interna
        const innerImgWrapper = sq.firstElementChild;
        if (innerImgWrapper) {
          innerImgWrapper.style.opacity = '1';
          innerImgWrapper.style.visibility = 'visible';
        }
      });

      let currentRotation = 0;
      let targetRotation = 0;
      let isDragging = false;
      let startX = 0;
      let autoSpinSpeed = 0.15;

      function updateSpinnerTransform() {
        currentRotation += (targetRotation - currentRotation) * 0.08;
        spinnerContainer.style.transform = 'rotateX(-5deg) rotateY(' + currentRotation + 'deg)';

        // Aplica foco e iluminação dinâmica nos itens voltados para a frente
        squares.forEach(function(sq, i) {
          const itemAngle = (i * angleStep + currentRotation) % 360;
          const normalizedAngle = (itemAngle + 360) % 360;
          const distToFront = Math.min(normalizedAngle, 360 - normalizedAngle);
          const brightness = Math.max(0.35, 1 - (distToFront / 180) * 0.7);
          sq.style.filter = 'brightness(' + brightness + ')';
          sq.style.zIndex = Math.round(100 - distToFront);
        });
      }

      // Interação por Scroll
      window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset || window.scrollY || 0;
        targetRotation = scrollY * 0.22;
      }, { passive: true });

      // Interação por Mouse Drag
      const spinnerParent = spinnerContainer.parentElement || spinnerContainer;
      spinnerParent.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
      });
      window.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        const delta = e.clientX - startX;
        targetRotation += delta * 0.35;
        startX = e.clientX;
      });
      window.addEventListener('mouseup', function() { isDragging = false; });

      // Touch para mobile
      spinnerParent.addEventListener('touchstart', function(e) {
        if (e.touches && e.touches[0]) {
          isDragging = true;
          startX = e.touches[0].clientX;
        }
      }, { passive: true });
      window.addEventListener('touchmove', function(e) {
        if (!isDragging || !e.touches || !e.touches[0]) return;
        const delta = e.touches[0].clientX - startX;
        targetRotation += delta * 0.45;
        startX = e.touches[0].clientX;
      }, { passive: true });
      window.addEventListener('touchend', function() { isDragging = false; });

      // Loop de Rotação 60FPS
      function spinnerLoop() {
        if (!isDragging) {
          targetRotation += autoSpinSpeed;
        }
        updateSpinnerTransform();
        requestAnimationFrame(spinnerLoop);
      }
      requestAnimationFrame(spinnerLoop);
    }

    // --- 5. DISTRIBUIÇÃO ANGULAR E ROTAÇÃO DE ÍCONES RADIAIS (ASTERISCOS DE 8 LÂMINAS) ---
    document.querySelectorAll('.relative').forEach(function(container) {
      const blades = Array.from(container.children).filter(function(c) {
        return c.classList.contains('origin-bottom') && c.classList.contains('absolute');
      });
      if (blades.length === 8) {
        blades.forEach(function(blade, bIdx) {
          const deg = bIdx * 45;
          blade.style.transform = 'translateX(-50%) rotate(' + deg + 'deg)';
          blade.style.transformOrigin = 'bottom center';
        });
        container.style.transition = 'transform 0.2s linear';
        container.classList.add('radial-asterisk-active');
      }
    });

    // Rotação sutil dos asteriscos sincronizada com scroll
    window.addEventListener('scroll', function() {
      const scrollY = window.pageYOffset || window.scrollY || 0;
      document.querySelectorAll('.radial-asterisk-active').forEach(function(ast) {
        ast.style.transform = 'rotate(' + (scrollY * 0.15) + 'deg)';
      });
    }, { passive: true });

    // --- 6. MOTOR DE SLIDERS COM AUTOPLAY E ABAS INTERATIVAS (HERO & DEPOIMENTOS) ---
    
    // A) Hero Slider (4 Imagens de Fundo)
    const heroImageContainers = Array.from(document.querySelectorAll('.w-full.h-full.relative > .w-full.h-full.absolute.top-0.left-0'));
    const heroProgressBars = Array.from(document.querySelectorAll('.project-slider-progress-line'));

    if (heroImageContainers.length >= 2 && heroProgressBars.length >= 2) {
      let activeHeroIndex = 0;
      let heroTimer = null;
      const heroSlideDuration = 5500; // 5.5s

      function setHeroSlide(index) {
        activeHeroIndex = index % heroImageContainers.length;

        heroImageContainers.forEach(function(imgWrap, i) {
          imgWrap.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
          if (i === activeHeroIndex) {
            imgWrap.style.opacity = '1';
            imgWrap.style.transform = 'scale(1.0)';
            imgWrap.classList.remove('opacity-0');
          } else {
            imgWrap.style.opacity = '0';
            imgWrap.style.transform = 'scale(1.05)';
          }
        });

        heroProgressBars.forEach(function(barWrap, i) {
          const fill = barWrap.querySelector('.bg-primary');
          if (!fill) return;
          fill.style.transition = 'none';
          if (i < activeHeroIndex) {
            fill.style.transform = 'scaleX(1)';
          } else if (i === activeHeroIndex) {
            fill.style.transform = 'scaleX(0)';
            setTimeout(function() {
              fill.style.transition = 'transform ' + (heroSlideDuration / 1000) + 's linear';
              fill.style.transform = 'scaleX(1)';
            }, 30);
          } else {
            fill.style.transform = 'scaleX(0)';
          }
        });
      }

      heroProgressBars.forEach(function(barWrap, i) {
        const parentBtn = barWrap.closest('.cursor-pointer') || barWrap;
        parentBtn.addEventListener('click', function() {
          clearInterval(heroTimer);
          setHeroSlide(i);
          heroTimer = setInterval(function() {
            setHeroSlide((activeHeroIndex + 1) % heroImageContainers.length);
          }, heroSlideDuration);
        });
      });

      setHeroSlide(0);
      heroTimer = setInterval(function() {
        setHeroSlide((activeHeroIndex + 1) % heroImageContainers.length);
      }, heroSlideDuration);
    }

    // B) Testimonials Slider (4 Depoimentos e Clientes)
    const testimonialSection = document.querySelector('[class*="aspect-[16/12]"]')?.closest('.layout-grid') || document.querySelector('[class*="-mt-[5vw]"]')?.parentElement;
    if (testimonialSection) {
      const testImages = Array.from(testimonialSection.querySelectorAll('[class*="aspect-[16/12]"] [class*="absolute"]'));
      const testAvatars = Array.from(testimonialSection.querySelectorAll('[class*="aspect-square"] [class*="absolute"]'));
      const testProgressBars = Array.from(testimonialSection.querySelectorAll('.cursor-pointer .bg-primary'));
      const testQuotes = Array.from(testimonialSection.querySelectorAll('.invisible.pointer-events-none > div'));
      const mainQuoteLine = testimonialSection.querySelector('[aria-label*="Storey brought"]')?.closest('.appear-line-mask')?.parentElement || testimonialSection.querySelector('.appear-line')?.parentElement;

      if (testImages.length >= 2) {
        let activeTestIndex = 0;
        let testTimer = null;
        const testDuration = 6000;

        function setTestimonial(idx) {
          activeTestIndex = idx % testImages.length;

          testImages.forEach(function(img, i) {
            img.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            if (i === activeTestIndex) {
              img.style.opacity = '1';
              img.style.transform = 'scale(1)';
            } else {
              img.style.opacity = '0';
              img.style.transform = 'scale(1.05)';
            }
          });

          testAvatars.forEach(function(av, i) {
            av.style.transition = 'opacity 0.6s ease';
            av.style.opacity = i === activeTestIndex ? '1' : '0';
          });

          testProgressBars.forEach(function(bar, i) {
            bar.style.transition = 'none';
            if (i < activeTestIndex) {
              bar.style.transform = 'scaleX(1)';
            } else if (i === activeTestIndex) {
              bar.style.transform = 'scaleX(0)';
              setTimeout(function() {
                bar.style.transition = 'transform ' + (testDuration / 1000) + 's linear';
                bar.style.transform = 'scaleX(1)';
              }, 30);
            } else {
              bar.style.transform = 'scaleX(0)';
            }
          });

          // Atualiza texto do depoimento
          if (testQuotes[activeTestIndex] && mainQuoteLine) {
            const newText = testQuotes[activeTestIndex].innerText.trim();
            const targetLine = testimonialSection.querySelector('.appear-line');
            if (targetLine) {
              targetLine.style.opacity = '0';
              targetLine.style.transform = 'translateY(10px)';
              setTimeout(function() {
                targetLine.textContent = newText;
                targetLine.style.opacity = '1';
                targetLine.style.transform = 'translateY(0)';
              }, 250);
            }
          }
        }

        const barContainers = Array.from(testimonialSection.querySelectorAll('[class*="cursor-pointer"]')).filter(function(el) {
          return el.querySelector('.bg-primary') || el.querySelector('.bg-primary\\/30');
        });
        barContainers.forEach(function(container, i) {
          container.addEventListener('click', function() {
            clearInterval(testTimer);
            setTestimonial(i);
            testTimer = setInterval(function() {
              setTestimonial((activeTestIndex + 1) % testImages.length);
            }, testDuration);
          });
        });

        setTestimonial(0);
        testTimer = setInterval(function() {
          setTestimonial((activeTestIndex + 1) % testImages.length);
        }, testDuration);
      }
    }

    // --- 7. HOVER BADGES INTERATIVOS & MICRO-INTERAÇÕES ---
    document.querySelectorAll('a[href*="/projects/"]').forEach(function(link) {
      const badge = link.querySelector('.bg-primary.w-fit.h-fit');
      if (badge) {
        badge.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        link.addEventListener('mouseenter', function() {
          badge.style.opacity = '1';
          badge.style.transform = 'scale(1.05)';
        });
        link.addEventListener('mouseleave', function() {
          badge.style.opacity = '0';
          badge.style.transform = 'scale(0.95)';
        });
      }
    });

    // --- 8. STACKING CARDS & METRIC STATS SLIDERS (15+ / 30+ SEM SOBREPOSIÇÃO) ---
    const stackingCards = Array.from(document.querySelectorAll('[data-stacking-cards-item]'));
    if (stackingCards.length > 1) {
      let activeCardIdx = 0;
      function renderStackingCard(idx) {
        activeCardIdx = (idx + stackingCards.length) % stackingCards.length;
        stackingCards.forEach(function(c, i) {
          c.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
          if (i === activeCardIdx) {
            c.style.opacity = '1';
            c.style.visibility = 'visible';
            c.style.transform = 'translateY(0px)';
            c.style.position = 'relative';
            c.style.pointerEvents = 'auto';
          } else {
            c.style.opacity = '0';
            c.style.visibility = 'hidden';
            c.style.transform = 'translateY(15px)';
            c.style.position = 'absolute';
            c.style.pointerEvents = 'none';
          }
        });

        // Atualiza indicadores numéricos como 01/02
        const navLines = document.querySelectorAll('.problem_stats_line, .problem_stats_navigation');
        navLines.forEach(function(nl) {
          const spans = nl.querySelectorAll('span, div');
          if (spans.length >= 2) {
            spans[0].textContent = String(activeCardIdx + 1).padStart(2, '0');
          }
        });
      }

      renderStackingCard(0);
      let cardTimer = setInterval(function() {
        renderStackingCard(activeCardIdx + 1);
      }, 4500);

      // Conecta botões/setas de navegação
      document.querySelectorAll('.problems_home_stats button, .problems_home_stats a, [class*="stats_nav"], .problems_stats_navigation').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          clearInterval(cardTimer);
          renderStackingCard(activeCardIdx + 1);
          cardTimer = setInterval(function() {
            renderStackingCard(activeCardIdx + 1);
          }, 4500);
        });
      });
    }

    // --- 9. SCROLL-LINKED TEXT HIGHLIGHT REVEAL ([data-highlight-text]) ---
    document.querySelectorAll('[data-highlight-text]').forEach(function(container) {
      if (container.dataset.highlightActivated) return;
      container.dataset.highlightActivated = 'true';
      const text = container.innerText.trim();
      const words = text.split(/\\s+/);
      container.innerHTML = '';
      const wordSpans = words.map(function(w) {
        const span = document.createElement('span');
        span.textContent = w + ' ';
        span.style.display = 'inline';
        span.style.transition = 'color 0.35s ease, opacity 0.35s ease';
        span.style.color = '#71717a';
        span.style.opacity = '0.35';
        container.appendChild(span);
        return span;
      });

      function updateTextHighlight() {
        const rect = container.getBoundingClientRect();
        const winH = window.innerHeight;
        const progress = Math.min(Math.max((winH * 0.85 - rect.top) / (rect.height + winH * 0.35), 0), 1);
        const activeCount = Math.floor(progress * wordSpans.length);

        wordSpans.forEach(function(sp, i) {
          if (i <= activeCount) {
            sp.style.color = '#fafaf9';
            sp.style.opacity = '1';
          } else {
            sp.style.color = '#71717a';
            sp.style.opacity = '0.35';
          }
        });
      }

      window.addEventListener('scroll', updateTextHighlight, { passive: true });
      updateTextHighlight();
    });

    // --- 10. GAP SECTION / KINETIC IMAGE CAROUSEL & LETTER SCRUB ---
    const gapSection = document.querySelector('.gap_home_wrap, [class*="gap_wrap"]');
    if (gapSection) {
      const gapImages = Array.from(gapSection.querySelectorAll('.gap_home_image, [class*="gap_image"]'));
      if (gapImages.length > 1) {
        let gapIdx = 0;
        gapImages.forEach(function(img, i) {
          img.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
          img.style.opacity = i === 0 ? '1' : '0';
        });
        setInterval(function() {
          gapImages.forEach(function(img) { img.style.opacity = '0'; });
          gapIdx = (gapIdx + 1) % gapImages.length;
          gapImages[gapIdx].style.opacity = '1';
        }, 900);
      }
    }

    // --- 12. MOTOR UNIVERSAL DE REVELAÇÃO WEBFLOW (data-anim="split", data-anim="element", data-anim="stagger", data-anim="slideUp-once") ---
    if (typeof gsap !== 'undefined') {
      // 12.1 Data-anim split
      document.querySelectorAll('[data-anim="split"]').forEach(function(el) {
        if (el.closest('.amenities-slide-box')) return;
        try {
          if (typeof SplitText !== 'undefined') {
            const cleanText = el.getAttribute('aria-label') || el.textContent.trim();
            el.innerHTML = cleanText;
            const st = new SplitText(el, { type: 'lines', linesClass: 'split-line', mask: 'lines' });
            if (st.lines && st.lines.length > 0) {
              const triggerEl = el.closest('section, .wrap') || el;
              gsap.from(st.lines, {
                y: '100%',
                opacity: 0,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: triggerEl,
                  start: 'top 90%',
                  once: true
                }
              });
            }
          }
        } catch(e) {}
      });

      // 12.2 Data-anim element e slideUp-once
      document.querySelectorAll('[data-anim="element"], [data-anim="slideUp-once"]').forEach(function(el) {
        if (el.closest('.amenities-slide-box')) return;
        const triggerEl = el.closest('section, .wrap') || el;
        gsap.fromTo(el, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: triggerEl,
              start: 'top 90%',
              once: true
            }
          }
        );
      });

      // 12.3 Data-anim stagger
      document.querySelectorAll('[data-anim="stagger"]').forEach(function(el) {
        const children = Array.from(el.children).filter(function(child) {
          return !child.hasAttribute('data-dropdown-list') && !child.classList.contains('faq-dropdown-list');
        });
        if (children.length > 0) {
          const triggerEl = el.closest('section, .wrap') || el;
          gsap.fromTo(children,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: triggerEl,
                start: 'top 90%',
                once: true
              }
            }
          );
        }
      });
      // 12.4 Data-anim img-overlay
      document.querySelectorAll('[data-anim="img-overlay"]').forEach(function(el) {
        gsap.to(el, {
          yPercent: -100,
          duration: 1.1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: 'top 80%',
            once: true
          }
        });
      });

      // 12.5 Data-anim img-paralax / img-parallax (Parallax de imagens Webflow)
      document.querySelectorAll('[data-anim="img-paralax"], [data-anim="img-parallax"]').forEach(function(el) {
        gsap.fromTo(el,
          { yPercent: -10, scale: 1.1 },
          {
            yPercent: 10,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section, .wrap') || el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      });

      // 12.6 FAQ Dropdown Hover & Click Engine
      document.querySelectorAll('.faq [data-dropdown]').forEach(function(dropdown) {
        dropdown.addEventListener('mouseenter', function() {
          dropdown.classList.add('is-active');
        });
        dropdown.addEventListener('mouseleave', function() {
          dropdown.classList.remove('is-active');
        });
        dropdown.addEventListener('click', function() {
          dropdown.classList.toggle('is-active');
        });
      });
    }

    console.log('✅ [Universal Scroll Director] Todos os subsistemas (SplitText, 3D Spinner, Curtains, Sliders, Highlights, Stacking Cards, Accordions, Webflow Reveals) ativados com sucesso.');
  });
})();
</script>`;
  }
}

module.exports = {
  UniversalScrollDirector
};
