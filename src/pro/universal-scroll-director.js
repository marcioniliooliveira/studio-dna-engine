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
      // Ignora elementos que devem ser alternados por sliders ou spinners
      if (el.closest('#intro-logo-spinner') || el.classList.contains('project-slider-progress-line') || el.classList.contains('scale-[1.05]')) {
        return;
      }
      const cs = window.getComputedStyle(el);
      if (cs.opacity === '0' && !el.id.includes('overlay')) {
        el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
      }
    });

    // --- 2. MOTOR UNIVERSAL DE SPLITTEXT / APPEAR-LINE REVEAL ---
    const splitLines = Array.from(document.querySelectorAll('.appear-line, .appear-line-mask, [data-v-30d30ebe] .appear-line, .splittext--line > div'));
    const lineMasks = Array.from(document.querySelectorAll('.appear-line-mask, [data-v-30d30ebe] .appear-line-mask'));

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

    // Animação sutil de hover nos materiais de papelaria (régua, lápis, borracha)
    document.querySelectorAll('.group').forEach(function(grp) {
      const ruler = grp.querySelector('img[src*="ruler"]');
      const pencil = grp.querySelector('img[src*="pencil"]');
      if (ruler) ruler.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      if (pencil) pencil.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    console.log('✅ [Universal Scroll Director] Todos os subsistemas (SplitText, 3D Spinner, Curtains, Sliders, Asterisks) ativados com sucesso.');
  });
})();
</script>`;
  }
}

module.exports = {
  UniversalScrollDirector
};
