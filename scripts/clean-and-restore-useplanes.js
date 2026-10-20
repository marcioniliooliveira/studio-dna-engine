const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

console.log('🚀 [Pipeline Sanitizer] Iniciando extração, saneamento do DOM e restauração funcional...');

// 1. Carregar HTML bruto capturado da página viva
const liveHtmlPath = path.resolve(__dirname, '../live-full-page-hydrated.html');
const propsHtmlPath = path.resolve(__dirname, '../props-tab-dump.html');
const openedChatHtmlPath = path.resolve(__dirname, '../opened-chat-dump.html');
const streamedChatHtmlPath = path.resolve(__dirname, '../streamed-chat-dump.html');

if (!fs.existsSync(liveHtmlPath)) {
  throw new Error('Arquivo live-full-page-hydrated.html não encontrado!');
}

const rawHtml = fs.readFileSync(liveHtmlPath, 'utf8');
const propsHtml = fs.existsSync(propsHtmlPath) ? fs.readFileSync(propsHtmlPath, 'utf8') : '';
const openedChatHtml = fs.existsSync(openedChatHtmlPath) ? fs.readFileSync(openedChatHtmlPath, 'utf8') : '';
const streamedChatHtml = fs.existsSync(streamedChatHtmlPath) ? fs.readFileSync(streamedChatHtmlPath, 'utf8') : '';

const $ = cheerio.load(rawHtml);

// 2. Limpeza de scripts de hidratação externa / telemetria (Next.js SSR Hydration Strip)
$('script').each((i, el) => {
  const src = $(el).attr('src') || '';
  const text = $(el).text() || '';

  // Remove scripts de analytics, beacon e telemetria
  if (
    src.includes('cloudflareinsights') ||
    src.includes('google') ||
    src.includes('doubleclick') ||
    src.includes('analytics') ||
    $(el).attr('data-sdkn')?.includes('analytics') ||
    src.endsWith('/script.js') ||
    text.includes('cloudflareinsights') ||
    src.includes('turbopack') ||
    src.includes('_next/static/immutable/chunks') // Remove hydration chunks que quebram sem server
  ) {
    $(el).remove();
  }
});

// Remove tags noscript e announcers de rota do Next.js
$('next-route-announcer').remove();
$('link[rel="preload"][as="script"]').remove();

// 3. Normalizar caminhos de stylesheets e fontes locais
$('link[rel="stylesheet"]').each((i, el) => {
  let href = $(el).attr('href');
  if (href && href.startsWith('/_next/')) {
    $(el).attr('href', './assets' + href);
  }
});

$('link[rel="preload"][as="font"]').each((i, el) => {
  let href = $(el).attr('href');
  if (href && href.startsWith('/_next/')) {
    $(el).attr('href', './assets' + href);
  }
});

// Imagens com caminhos relativos
$('img').each((i, el) => {
  let src = $(el).attr('src');
  if (src && src.startsWith('/') && !src.startsWith('//')) {
    $(el).attr('src', 'https://useplanes.com' + src);
  }
});

// Normalizar estilos inline com URLs relativas (ex: mask-image logo.svg)
$('*[style*="/logo.svg"]').each((i, el) => {
  let st = $(el).attr('style') || '';
  st = st.replace(/\/logo\.svg/g, './assets/logo.svg');
  $(el).attr('style', st);
});

// 4. Garantir que as pupilas da esfera (Orb) tenham estilos e coordenadas exatas
const previewContainer = $('div.h-\\[600px\\]');
if (previewContainer.length) {
  // Configurar container do Chat Orb para ter transição e IDs previsíveis
  const orbBtn = previewContainer.find('button[aria-label="Open chat"]');
  if (orbBtn.length) {
    orbBtn.attr('id', 'orb-button');
    const shellBorder = orbBtn.find('div.absolute.inset-\\[2px\\]');
    if (shellBorder.length) {
      shellBorder.attr('id', 'orb-shell-border');
    }

    // Identificar a esfera 64px e suas pupilas
    const sphere = orbBtn.find('div.rounded-full[style*="radial-gradient"]');
    if (sphere.length) {
      sphere.attr('id', 'orb-sphere-face');
      const eyeContainer = sphere.children('div.absolute.inset-0');
      eyeContainer.attr('id', 'orb-pupils-container');
      const pupils = eyeContainer.find('span.bg-zinc-950');
      if (pupils.length >= 2) {
        $(pupils[0])
          .addClass('orb-eye-pupil')
          .attr('style', 'width: 10.88px; height: 10.88px; border-radius: 64px; left: 17.28px; top: 23.04px; transform: scaleY(1); transition: transform 0.08s ease;');
        $(pupils[1])
          .addClass('orb-eye-pupil')
          .attr('style', 'width: 10.88px; height: 10.88px; border-radius: 64px; left: 35.84px; top: 23.04px; transform: scaleY(1); transition: transform 0.08s ease;');
      }
    }
  }

  // Teaser bubble
  const teaser = previewContainer.find('button:contains("Hi there!")');
  if (teaser.length) {
    teaser.attr('id', 'orb-teaser-bubble');
    teaser.attr('style', 'transform-origin: 100% 100% 0px; transition: opacity 0.3s ease, transform 0.3s ease;');
  }
}

// 5. Injetar o painel de Props no DOM da seção #usage (para alternância fluida de abas)
const usageSection = $('section#usage');
if (usageSection.length && propsHtml) {
  const tabList = usageSection.find('[role="tablist"]');
  const usageTab = tabList.find('[role="tab"]').first();
  const propsTab = tabList.find('[role="tab"]').last();

  usageTab.attr('id', 'tab-btn-usage').attr('aria-selected', 'true');
  propsTab.attr('id', 'tab-btn-props').attr('aria-selected', 'false');

  const usagePanel = usageSection.find('[role="tabpanel"]');
  usagePanel.attr('id', 'tab-panel-usage');

  // Adicionar o painel de props se ainda não existir
  if (!usageSection.find('#tab-panel-props').length) {
    const $propsPanel = $(propsHtml);
    $propsPanel.attr('id', 'tab-panel-props').addClass('hidden');
    usageSection.find('.flex.flex-col.gap-5').append($propsPanel);
  }
}

// 5.1 Identificar e marcar o botão de tema desktop original com id #theme-toggle-btn
const themeButtons = $('button[aria-label="Toggle theme"]');
if (themeButtons.length > 1) {
  // O segundo botão é o botão do dock desktop da useplanes
  $(themeButtons[themeButtons.length - 1]).attr('id', 'theme-toggle-btn');
} else if (themeButtons.length === 1) {
  $(themeButtons[0]).attr('id', 'theme-toggle-btn');
}

// 6. Injetar folha de estilos de recuperação e transições elásticas do pipeline
$('head').append(`
  <style id="pipeline-recovered-interactions-css">
    /* Universal cursor reset */
    html, body, a, button, [role="button"] {
      cursor: auto;
    }
    button, a, [role="tab"] {
      cursor: pointer !important;
    }

    /* Suave animação de respiro do Orb em repouso */
    @keyframes orbBreath {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-3px); }
    }
    #orb-sphere-face {
      animation: orbBreath 3.2s ease-in-out infinite;
    }

    /* Animação suave para transição de abertura e fechamento */
    .orb-morph-transition {
      transition: width 0.42s cubic-bezier(0.2, 0.9, 0.3, 1.1),
                  height 0.42s cubic-bezier(0.2, 0.9, 0.3, 1.1),
                  border-radius 0.38s ease,
                  box-shadow 0.38s ease,
                  transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1.1),
                  opacity 0.25s ease;
      will-change: width, height, border-radius, transform, opacity;
    }

    /* Scrollbar personalizada */
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(150, 150, 150, 0.25);
      border-radius: 999px;
    }
  </style>
`);

// 7. Injetar o Script Motor de Restauração de Funcionalidades (Universal Client Engine)
$('body').append(`
  <script id="pipeline-client-engine">
    (function() {
      'use strict';
      console.log('⚡ [Studio DNA Engine] Inicializando funcionalidades vivas do site...');

      // ==========================================
      // 1. TEMA CLARO / ESCURO (Dark / Light Mode)
      // ==========================================
      function toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      }

      // Conectar botões de tema
      document.querySelectorAll('button[aria-label="Toggle theme"], button[aria-label*="theme" i]').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
      });

      // ==========================================
      // 2. ALTERNÂNCIA DE ABAS (Usage vs Props)
      // ==========================================
      const tabUsage = document.getElementById('tab-btn-usage');
      const tabProps = document.getElementById('tab-btn-props');
      const panelUsage = document.getElementById('tab-panel-usage');
      const panelProps = document.getElementById('tab-panel-props');

      function switchTab(toProps) {
        if (!tabUsage || !tabProps || !panelUsage || !panelProps) return;
        if (toProps) {
          tabProps.setAttribute('aria-selected', 'true');
          tabProps.classList.remove('text-foreground/55');
          tabProps.classList.add('text-foreground');
          tabProps.innerHTML = '<span class="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-neutral-800"></span><span class="relative z-10">Props</span>';

          tabUsage.setAttribute('aria-selected', 'false');
          tabUsage.classList.remove('text-foreground');
          tabUsage.classList.add('text-foreground/55');
          tabUsage.innerHTML = '<span class="relative z-10">Usage</span>';

          panelUsage.classList.add('hidden');
          panelProps.classList.remove('hidden');
        } else {
          tabUsage.setAttribute('aria-selected', 'true');
          tabUsage.classList.remove('text-foreground/55');
          tabUsage.classList.add('text-foreground');
          tabUsage.innerHTML = '<span class="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-neutral-800"></span><span class="relative z-10">Usage</span>';

          tabProps.setAttribute('aria-selected', 'false');
          tabProps.classList.remove('text-foreground');
          tabProps.classList.add('text-foreground/55');
          tabProps.innerHTML = '<span class="relative z-10">Props</span>';

          panelProps.classList.add('hidden');
          panelUsage.classList.remove('hidden');
        }
      }

      if (tabUsage) tabUsage.addEventListener('click', () => switchTab(false));
      if (tabProps) tabProps.addEventListener('click', () => switchTab(true));

      // ==========================================
      // 3. BOTÕES DE CÓPIA (Copy to Clipboard)
      // ==========================================
      document.querySelectorAll('button[aria-label="Copy"], button[aria-label*="copy" i]').forEach(btn => {
        btn.addEventListener('click', async (e) => {
          e.stopPropagation();
          const pre = btn.closest('.relative')?.querySelector('pre');
          const textToCopy = pre ? pre.innerText.trim() : 'npx shadcn add @useplanes/chat-orb';
          try {
            await navigator.clipboard.writeText(textToCopy);
            const originalHtml = btn.innerHTML;
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-emerald-500" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
              btn.innerHTML = originalHtml;
            }, 1800);
          } catch (err) {}
        });
      });

      // ==========================================
      // 4. SIDEBAR TOGGLE (Desktop & Mobile)
      // ==========================================
      const sidebar = document.querySelector('aside');
      const sidebarToggles = document.querySelectorAll('button[aria-label="Open navigation"], button[aria-label="Toggle Sidebar"]');
      let sidebarOpen = window.innerWidth >= 768;

      sidebarToggles.forEach(btn => {
        btn.addEventListener('click', () => {
          sidebarOpen = !sidebarOpen;
          if (sidebar) {
            sidebar.style.display = sidebarOpen ? 'block' : 'none';
          }
        });
      });

      // ==========================================
      // 5. CHAT ORB (Eye Tracking, Blinking & Morph)
      // ==========================================
      const previewArea = document.querySelector('div.h-\\\\\[600px\\\\\\], div[class*="h-[600px]"]');
      if (!previewArea) return;

      const orbBtn = document.getElementById('orb-button') || previewArea.querySelector('button[aria-label="Open chat"]');
      const pupils = document.querySelectorAll('.orb-eye-pupil');
      const eyeContainer = document.getElementById('orb-pupils-container');
      const teaser = document.getElementById('orb-teaser-bubble') || previewArea.querySelector('button:has-text("Hi there!")');
      const orbHost = orbBtn ? orbBtn.parentElement : null;

      let isChatOpen = false;
      let targetX = 0, targetY = 0;
      let currentX = 0, currentY = 0;

      // Tracking dos olhos via mouse (Pointermove + Lerp Physics)
      window.addEventListener('pointermove', (e) => {
        if (isChatOpen || !orbBtn) return;
        const rect = orbBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.hypot(dx, dy);

        if (dist > 350) {
          targetX = 0;
          targetY = 0;
          return;
        }

        const factor = Math.min(1, dist / 80);
        targetX = (dx / (dist || 1)) * factor * 6.5;
        targetY = (dy / (dist || 1)) * factor * 6.5;
      }, { passive: true });

      function eyeLoop() {
        if (!isChatOpen && eyeContainer) {
          currentX += (targetX - currentX) * 0.16;
          currentY += (targetY - currentY) * 0.16;
          eyeContainer.style.transform = \`translate(\${currentX.toFixed(2)}px, \${currentY.toFixed(2)}px)\`;
        }
        requestAnimationFrame(eyeLoop);
      }
      requestAnimationFrame(eyeLoop);

      // Ciclo natural de piscada com probabilidade de double-blink
      function blink(cb) {
        pupils.forEach(p => p.style.transform = 'scaleY(0.08)');
        setTimeout(() => {
          pupils.forEach(p => p.style.transform = 'scaleY(1)');
          if (cb) cb();
        }, 110);
      }

      function scheduleBlink() {
        const delay = 2200 + Math.random() * 2600;
        setTimeout(() => {
          blink(() => {
            if (Math.random() < 0.22) {
              setTimeout(() => blink(scheduleBlink), 160);
            } else {
              scheduleBlink();
            }
          });
        }, delay);
      }
      scheduleBlink();

      // Teaser click
      if (teaser) {
        teaser.addEventListener('click', () => {
          openFullChat();
        });
      }

      // Template do Chat Dialog (Morfologia expandida da useplanes)
      const dialogHtml = \`
        <div id="live-chat-dialog" tabindex="-1" role="dialog" aria-label="Assistant" class="relative h-[560px] outline-none w-[380px] max-w-[90vw] max-h-full transition-all duration-300 ease-out opacity-0 scale-95">
          <div class="absolute inset-0 border border-zinc-200 bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950" style="border-radius: 28px;"></div>
          <div class="relative flex h-full flex-col overflow-hidden" style="border-radius: 28px;">
            <div class="relative flex max-h-[80svh] flex-col overflow-hidden border-zinc-200 dark:border-zinc-800 h-full max-h-none w-full max-w-none rounded-none border-0 bg-transparent backdrop-blur-none dark:bg-transparent">
              
              <!-- Header com Mini Orb Face -->
              <div class="flex items-center justify-between gap-3 border-b border-zinc-200/70 dark:border-zinc-800/70 px-5 py-4">
                <div class="flex min-w-0 items-center gap-3">
                  <div class="relative shrink-0 rounded-full" style="width: 36px; height: 36px; background: radial-gradient(circle at 38% 32%, #ffffff 0%, #f4f4f5 28%, #d4d4d8 62%, #a1a1aa 100%); box-shadow: rgba(0,0,0,0.18) -2.16px -2.88px 6.48px inset, rgba(255,255,255,0.9) 1.08px 1.44px 3.6px inset;">
                    <div id="mini-pupils-box" class="absolute inset-0">
                      <span class="orb-mini-pupil absolute block bg-zinc-950" style="width: 6.12px; height: 6.12px; border-radius: 36px; left: 9.72px; top: 12.96px; transition: transform 0.08s;"></span>
                      <span class="orb-mini-pupil absolute block bg-zinc-950" style="width: 6.12px; height: 6.12px; border-radius: 36px; left: 20.16px; top: 12.96px; transition: transform 0.08s;"></span>
                    </div>
                  </div>
                  <div class="min-w-0">
                    <h3 class="truncate text-base font-semibold tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">Assistant</h3>
                    <p class="mt-0.5 truncate text-sm text-zinc-500 dark:text-zinc-400">Typically replies instantly</p>
                  </div>
                </div>
                <div class="flex shrink-0 items-center gap-1">
                  <button id="btn-dialog-reset" type="button" aria-label="New chat" class="inline-flex size-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors hover:bg-zinc-900/5 dark:hover:bg-zinc-100/5 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
                  </button>
                  <button id="btn-dialog-close" type="button" aria-label="Close chat" class="inline-flex size-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors hover:bg-zinc-900/5 dark:hover:bg-zinc-100/5 hover:text-zinc-900 dark:hover:text-zinc-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                  </button>
                </div>
              </div>

              <!-- Log de Mensagens com scroll -->
              <div class="relative min-h-0 flex-1">
                <div id="live-chat-log" role="log" aria-live="polite" class="h-full overflow-y-auto overscroll-contain px-5 py-5 custom-scrollbar">
                  <!-- Empty State Inicial -->
                  <div id="live-empty-state" class="flex h-full flex-col items-center justify-center px-4 text-center">
                    <span class="flex size-12 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h2"></path><path d="M16 19h-2"></path><path d="M2 12v-2"></path><path d="M2 16v5.286a.71.71 0 0 0 1.212.502l1.149-1.149"></path><path d="M20 19a2 2 0 0 0 2-2v-1"></path><path d="M22 10v2"></path><path d="M22 6V5a2 2 0 0 0-2-2"></path><path d="M4 3a2 2 0 0 0-2 2v1"></path><path d="M8 19h2"></path><path d="M8 3h2"></path></svg>
                    </span>
                    <h4 class="mt-4 text-xl font-semibold tracking-[-0.01em] text-zinc-900 dark:text-zinc-100">Let's build something.</h4>
                    <p class="mt-1.5 max-w-[18rem] text-sm leading-6 text-zinc-500 dark:text-zinc-400">Press send to start the conversation.</p>
                  </div>
                  <!-- Mensagens adicionadas dinamicamente -->
                  <div id="live-chat-messages" class="space-y-6 hidden"></div>
                </div>
              </div>

              <!-- Composer de Prompt -->
              <div class="relative z-30 px-3 pb-3 pt-1">
                <div class="relative w-full max-w-none">
                  <div class="relative rounded-[19px] border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur">
                    <textarea id="live-chat-input" rows="2" placeholder="Message the assistant..." class="block max-h-[140px] w-full resize-none bg-transparent px-4 pb-2 pt-3.5 text-[15px] leading-6 text-zinc-900 dark:text-zinc-100 outline-none placeholder:text-zinc-500/60 dark:placeholder:text-zinc-400/60">When I save a setting it feels laggy, because I wait for the server before the UI updates. How do people make it feel instant?</textarea>
                    <div class="flex items-center justify-between gap-2 px-2.5 pb-2.5 pt-1">
                      <div class="flex min-w-0 flex-1 items-center gap-1">
                        <button type="button" aria-label="Add attachments" class="inline-flex size-8 items-center justify-center rounded-lg text-zinc-500 dark:text-zinc-400 hover:bg-zinc-900/5 dark:hover:bg-zinc-100/5 hover:text-zinc-900 dark:hover:text-zinc-100">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"></path></svg>
                        </button>
                        <span class="inline-flex h-8 items-center gap-1 rounded-lg px-2 text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
                          Claude Opus 4.8
                        </span>
                      </div>
                      <button id="live-btn-send" type="button" aria-label="Send message" class="relative inline-flex size-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 transition active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      \`;

      function openFullChat() {
        if (isChatOpen || !orbHost) return;
        isChatOpen = true;

        if (teaser) teaser.style.display = 'none';
        if (orbBtn) orbBtn.style.display = 'none';

        let dialogEl = document.getElementById('live-chat-dialog');
        if (!dialogEl) {
          const temp = document.createElement('div');
          temp.innerHTML = dialogHtml.trim();
          dialogEl = temp.firstElementChild;
          orbHost.appendChild(dialogEl);
          initDialogEvents(dialogEl);
        }

        dialogEl.style.display = 'block';
        setTimeout(() => {
          dialogEl.classList.remove('opacity-0', 'scale-95');
          dialogEl.classList.add('opacity-100', 'scale-100');
        }, 20);
      }

      function closeFullChat() {
        if (!isChatOpen) return;
        isChatOpen = false;

        const dialogEl = document.getElementById('live-chat-dialog');
        if (dialogEl) {
          dialogEl.classList.add('opacity-0', 'scale-95');
          dialogEl.classList.remove('opacity-100', 'scale-100');
          setTimeout(() => {
            dialogEl.style.display = 'none';
            if (orbBtn) orbBtn.style.display = 'flex';
          }, 250);
        }
      }

      function initDialogEvents(dialog) {
        dialog.querySelector('#btn-dialog-close').addEventListener('click', closeFullChat);
        dialog.querySelector('#btn-dialog-reset').addEventListener('click', () => {
          const msgList = dialog.querySelector('#live-chat-messages');
          const emptySt = dialog.querySelector('#live-empty-state');
          msgList.innerHTML = '';
          msgList.classList.add('hidden');
          emptySt.classList.remove('hidden');
        });

        const input = dialog.querySelector('#live-chat-input');
        const sendBtn = dialog.querySelector('#live-btn-send');
        const msgList = dialog.querySelector('#live-chat-messages');
        const emptySt = dialog.querySelector('#live-empty-state');
        const chatLog = dialog.querySelector('#live-chat-log');

        function sendMsg() {
          const text = input.value.trim();
          if (!text) return;
          input.value = '';

          emptySt.classList.add('hidden');
          msgList.classList.remove('hidden');

          const userBubble = document.createElement('div');
          userBubble.className = 'flex justify-end';
          userBubble.innerHTML = \`<p class="max-w-[85%] rounded-2xl rounded-br-md bg-zinc-100 dark:bg-zinc-800 px-4 py-2.5 text-[15px] leading-6 text-zinc-900 dark:text-zinc-100">\${text.replace(/</g, '&lt;')}</p>\`;
          msgList.appendChild(userBubble);
          chatLog.scrollTop = chatLog.scrollHeight;

          setTimeout(() => {
            const aiResponse = document.createElement('div');
            aiResponse.className = 'space-y-2.5';
            aiResponse.innerHTML = \`
              <div class="w-full max-w-none">
                <button type="button" class="btn-live-trace flex items-center gap-2 py-1 text-left text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition text-[13px] font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4 shrink-0"><path d="M12 18V5"></path><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"></path><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"></path><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"></path><path d="M18 18a4 4 0 0 0 2-7.464"></path><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"></path><path d="M6 18a4 4 0 0 1-2-7.464"></path><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"></path></svg>
                  <span>Thought for 2s</span>
                  <svg class="trace-chevron size-3.5 transition-transform" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"></path></svg>
                </button>
                <div class="trace-steps-panel hidden pl-6 pt-1 space-y-1">
                  <div class="flex gap-2.5 text-[13px] leading-6 text-zinc-500 dark:text-zinc-400">
                    <span class="mt-[7px] size-1.5 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800"></span>
                    <span>Analyze incoming prompt and optimistic state requirements.</span>
                  </div>
                  <div class="flex gap-2.5 text-[13px] leading-6 text-zinc-500 dark:text-zinc-400">
                    <span class="mt-[7px] size-1.5 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800"></span>
                    <span>Update UI immediately, send network request in the background.</span>
                  </div>
                </div>
              </div>
              <div class="relative">
                <p class="text-[15px] leading-7 text-zinc-900 dark:text-zinc-100">
                  Update the UI immediately and send the request in the background. That is an optimistic update: you assume success, render the new state right away, and only reconcile once the server responds. The interaction feels instant because you stop waiting on the network for the common case.
                </p>
              </div>
            \`;

            msgList.appendChild(aiResponse);
            chatLog.scrollTop = chatLog.scrollHeight;

            const traceBtn = aiResponse.querySelector('.btn-live-trace');
            const tracePanel = aiResponse.querySelector('.trace-steps-panel');
            const traceChev = aiResponse.querySelector('.trace-chevron');
            traceBtn.addEventListener('click', () => {
              const isClosed = tracePanel.classList.contains('hidden');
              tracePanel.classList.toggle('hidden', !isClosed);
              traceChev.style.transform = isClosed ? 'rotate(180deg)' : 'rotate(0deg)';
            });
          }, 600);
        }

        sendBtn.addEventListener('click', sendMsg);
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMsg();
          }
        });
      }

      if (orbBtn) {
        orbBtn.addEventListener('click', openFullChat);
      }

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isChatOpen) {
          closeFullChat();
        }
      });

    })();
  </script>
`);

// 8. Escrever de volta no caminho canônico copias/useplanes-com/site/index.html
const outputPath = path.resolve(__dirname, '../copias/useplanes-com/site/index.html');
fs.writeFileSync(outputPath, $.html(), 'utf8');
console.log(`✅ [Pipeline Sanitizer] DOM saneado e salvo com sucesso em: ${outputPath}`);
console.log(`📊 Tamanho final do HTML estrutural: ${fs.statSync(outputPath).size} bytes`);
