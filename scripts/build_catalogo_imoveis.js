const fs = require('fs');
const path = require('path');

// 1. Carregar dataset autêntico
const dataPath = path.resolve(__dirname, '../studio-dna-engine/clientes/negocia-bem/site/js/negociabem-data.js');
const { featured, gridProperties: gridProps } = require(dataPath);

console.log('Building catalogo-imoveis.html (Versão Final: Atelier Territorial + Monolith In-Image Overlay)...');

const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR" class="dark scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Negocia Bem — Catálogo Territorial de Imóveis & Oportunidades</title>
  <meta name="description" content="Catálogo exclusivo de imóveis residenciais, loteamentos e assessoria de venda em Paiçandu e Região Metropolitana de Maringá. Negocia Bem — CRECI 9314-J.">

  <!-- Fontes Google Oficiais (Apenas Inter e Plus Jakarta Sans) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              green: '#3E9B67',
              'green-light': '#4EBA7E',
              'green-dark': '#2E7A4F',
              dark: '#0D1117',
              slate: '#161B22',
              card: '#12161C'
            }
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            display: ['"Plus Jakarta Sans"', 'sans-serif']
          }
        }
      }
    }
  </script>

  <!-- Lucide Icons & GSAP -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

  <style>
    :root {
      --bg: #0D1117;
      --card-bg: #12161C;
      --card-inner: #161B22;
      --green: #3E9B67;
      --green-light: #4EBA7E;
      --green-dark: #2E7A4F;
      --line: rgba(255, 255, 255, 0.12);
      --line-subtle: rgba(255, 255, 255, 0.06);
    }

    * {
      border-radius: 0px !important;
    }

    body {
      background-color: var(--bg);
      color: #E6EDF3;
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
    }

    h1, h2, h3, h4, .font-display {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    /* BARRA DE CONTROLE CONTEXTUAL (SEM HEADER DUPLICADO) */
    .catalog-control-bar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: rgba(13, 17, 23, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--line);
      padding: 12px 24px;
    }

    /* BOTÕES VAZADOS COM HOVER SÓLIDO E ZERO GLOW */
    .btn-vazado,
    .card-whatsapp-btn,
    .search-submit-btn,
    .category-tab-btn {
      border: 1px solid var(--green) !important;
      background: rgba(62, 155, 103, 0.08) !important;
      color: var(--green-light) !important;
      font-family: 'Inter', sans-serif !important;
      border-radius: 0px !important;
      box-shadow: none !important;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .btn-vazado:hover,
    .card-whatsapp-btn:hover,
    .search-submit-btn:hover,
    .category-tab-btn:hover,
    .category-tab-btn.active {
      background: var(--green) !important;
      color: #0D1117 !important;
      border-color: var(--green) !important;
      box-shadow: none !important;
      transform: translateY(-1px);
    }

    /* BARRA DE BUSCA EM ARDÓSIA NEUTRA (ZERO GLOW) */
    .catalog-search-bar {
      background: rgba(18, 22, 28, 0.95);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 16px 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px;
      width: 100%;
      max-width: 1280px;
      margin: 0 auto;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.75);
      border-radius: 0px !important;
    }

    /* APRESENTAÇÃO HÍBRIDA: ATELIER TERRITORIAL COM MONOLITH IN-IMAGE */
    .featured-presentation-section {
      background-color: #0D1117;
      border-bottom: 1px solid var(--line);
      padding: 48px 0 64px 0;
    }

    .presentation-main-photo-wrap {
      position: relative;
      width: 100%;
      height: 520px;
      overflow: hidden;
      background-color: #161B22;
      border: 1px solid var(--line);
    }

    .presentation-main-photo-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: opacity 0.4s ease;
    }

    /* MONOLITH TEXT OVERLAY DENTRO DA IMAGEM */
    .monolith-text-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 36px 28px 24px 28px;
      background: linear-gradient(to top, rgba(13, 17, 23, 0.96) 0%, rgba(13, 17, 23, 0.72) 60%, transparent 100%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 12px;
      z-index: 20;
      pointer-events: none;
    }

    @media (min-width: 768px) {
      .monolith-text-overlay {
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
      }
    }

    /* BADGES DE STATUS NOS CARDS E DOSSIÊ */
    .badge-comprar {
      display: inline-block;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      background: rgba(62, 155, 103, 0.2);
      color: #4EBA7E;
      border: 1px solid rgba(62, 155, 103, 0.5);
      padding: 4px 10px;
      border-radius: 0px !important;
    }

    /* MINIATURAS INTERATIVAS DO DOSSIÊ */
    .presentation-thumb {
      width: 68px;
      height: 50px;
      flex-shrink: 0;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.15);
      transition: all 0.25s ease;
      opacity: 0.65;
    }

    .presentation-thumb.active,
    .presentation-thumb:hover {
      opacity: 1;
      border-color: var(--green-light);
      box-shadow: none !important;
    }

    .presentation-thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* BENTO GRID DE 8 CARDS EM 3 LINHAS */
    .catalog-section {
      background-color: #0B0E14;
      padding: 64px 0 80px 0;
    }

    .aura-bento-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }

    .aura-bento-card {
      background-color: var(--card-bg);
      border: 1px solid var(--line);
      display: flex;
      flex-direction: column;
      position: relative;
      transition: border-color 0.3s ease, transform 0.3s ease;
      border-radius: 0px !important;
      overflow: hidden;
    }

    .aura-bento-card:hover {
      border-color: rgba(62, 155, 103, 0.6) !important;
      transform: translateY(-2px);
    }

    .aura-bento-card.is-selected-card {
      border-color: var(--green-light) !important;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6) !important;
    }

    .bento-hero-card {
      grid-column: span 2;
    }

    .bento-companion-card {
      grid-column: span 1;
    }

    @media (max-width: 1024px) {
      .aura-bento-grid {
        grid-template-columns: 1fr;
      }
      .bento-hero-card,
      .bento-companion-card {
        grid-column: span 1;
      }
    }

    /* HOVER SINCRONIZADO POR LINHA HORIZONTAL */
    .card-drawer-extra {
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      transform: translateY(-4px);
      transition: max-height 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .aura-bento-card.is-row-hovered .card-drawer-extra,
    .aura-bento-card:hover .card-drawer-extra {
      max-height: 160px;
      opacity: 1;
      transform: translateY(0);
    }

    /* MÓDULOS DE CONVERSÃO ESPECIALIZADOS (VENDA E INVESTIMENTO) */
    .conversion-block {
      background: #12161C;
      border: 1px solid var(--line);
      padding: 40px;
      position: relative;
    }
  </style>
</head>
<body class="selection:bg-[#3E9B67] selection:text-[#0D1117]">

  <!-- ==========================================================================
       1. BARRA DE CONTROLE CONTEXTUAL (SEM HEADER DUPLICADO)
       ========================================================================== -->
  <nav class="catalog-control-bar" aria-label="Navegação Contextual do Catálogo">
    <div class="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      
      <!-- Retorno à Home & Credencial Imobiliária -->
      <div class="flex items-center gap-6">
        <a href="index.html#inicio" class="text-xs font-bold tracking-widest text-white/80 hover:text-[#4EBA7E] transition-colors flex items-center gap-2">
          <i data-lucide="arrow-left" class="w-4 h-4"></i>
          <span>VOLTAR PARA O INÍCIO</span>
        </a>
        <div class="h-4 w-px bg-white/20 hidden sm:block"></div>
        <div class="text-[11px] font-medium tracking-wider text-white/50 hidden sm:flex items-center gap-2">
          <span class="w-2 h-2 bg-[#3E9B67] inline-block"></span>
          <span>NEGOCIA BEM · CRECI 9314-J · PAIÇANDU & MARINGÁ</span>
        </div>
      </div>

      <!-- Abas de Finalidade & WhatsApp CTA -->
      <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
        <button type="button" class="category-tab-btn active px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase">
          COMPRAR CASAS
        </button>
        <button type="button" onclick="location.href='#investimento-lotes'" class="category-tab-btn px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase text-white/70">
          INVESTIR EM LOTES
        </button>
        <button type="button" onclick="location.href='#venda-imovel'" class="category-tab-btn px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase text-white/70">
          VENDER MEU IMÓVEL
        </button>
        <a href="https://wa.me/554438016654?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20as%20oportunidades%20da%20Negocia%20Bem" target="_blank" rel="noreferrer" class="btn-vazado px-4 py-1.5 text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5">
          <span>FALAR NO WHATSAPP</span>
          <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
        </a>
      </div>

    </div>
  </nav>

  <!-- ==========================================================================
       2. BARRA DE BUSCA EM ARDÓSIA NEUTRA (ZERO GLOW)
       ========================================================================== -->
  <section class="bg-[#0D1117] pt-8 pb-4 px-6" aria-label="Filtros de Oportunidades">
    <div class="catalog-search-bar" id="main-catalog-search">
      <div class="flex items-center gap-2 flex-1 min-w-[240px] bg-black/40 border border-white/10 px-3.5 py-3">
        <i data-lucide="search" class="w-4 h-4 text-white/60"></i>
        <input type="text" id="filter-keyword" placeholder="Bairro ou cidade (ex: Jardim América, Paiçandu, Maringá)" class="w-full bg-transparent text-xs text-white placeholder-white/40 focus:outline-none font-['Inter']">
      </div>

      <div class="flex items-center gap-2 min-w-[180px] bg-black/40 border border-white/10 px-3.5 py-3">
        <i data-lucide="home" class="w-4 h-4 text-white/60"></i>
        <select id="filter-type" class="w-full bg-transparent text-xs text-white focus:outline-none font-['Inter'] cursor-pointer">
          <option value="todos" class="bg-[#161B22] text-white">Todos os Tipos</option>
          <option value="comprar" class="bg-[#161B22] text-white" selected>Comprar Casas</option>
          <option value="alugar" class="bg-[#161B22] text-white">Alugar Imóveis</option>
          <option value="investir" class="bg-[#161B22] text-white">Investir em Lotes</option>
        </select>
      </div>

      <div class="flex items-center gap-2 min-w-[180px] bg-black/40 border border-white/10 px-3.5 py-3">
        <i data-lucide="banknote" class="w-4 h-4 text-white/60"></i>
        <select id="filter-price" class="w-full bg-transparent text-xs text-white focus:outline-none font-['Inter'] cursor-pointer">
          <option value="todas" class="bg-[#161B22] text-white">Faixa de Preço</option>
          <option value="ate-250k" class="bg-[#161B22] text-white">Até R$ 250.000</option>
          <option value="250k-350k" class="bg-[#161B22] text-white">R$ 250.000 a R$ 350.000</option>
          <option value="acima-350k" class="bg-[#161B22] text-white">Acima de R$ 350.000</option>
        </select>
      </div>

      <button type="button" onclick="location.href='#catalogo-grid'" class="search-submit-btn px-6 py-3 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
        <span>FILTRAR OPORTUNIDADES</span>
        <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
      </button>
    </div>
  </section>

  <!-- ==========================================================================
       3. APRESENTAÇÃO FINAL UNIFICADA: ATELIER TERRITORIAL COM MONOLITH IN-IMAGE
       ========================================================================== -->
  <section class="featured-presentation-section" id="imovel-destaque" aria-label="Apresentação Principal do Imóvel Escolhido">
    <div class="max-w-[1440px] mx-auto px-6">

      <!-- Cabeçalho do Dossiê -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-white/10 pb-5">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#4EBA7E] mb-1.5 font-['Inter']">
            <span class="w-2 h-2 bg-[#3E9B67] inline-block"></span>
            DOSSIÊ ARQUITETÔNICO & DECISÃO TERRITORIAL
          </div>
          <p class="text-xs text-white/50 font-['Inter']">
            Análise de infraestrutura, cálculo de financiamento habitacional e fotografias em alta resolução.
          </p>
        </div>
        <div class="text-xs text-white/40 font-['Inter'] flex items-center gap-2">
          <i data-lucide="check-circle-2" class="w-4 h-4 text-[#3E9B67]"></i>
          <span>Disponibilidade confirmada hoje pelo corretor responsável</span>
        </div>
      </div>

      <!-- Grid Split do Atelier Territorial com Monolith In-Image (62% Imagem / 38% Decisão) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- COLUNA DA ESQUERDA: FOTO PRINCIPAL COM TEXTO MONOLITH DENTRO DA IMAGEM (7 Colunas) -->
        <div class="lg:col-span-7 flex flex-col gap-4">
          <div class="presentation-main-photo-wrap" id="presentation-main-photo-container">
            <img id="dossier-main-img" src="${featured.photos[0]}" alt="${featured.title}">
            
            <!-- OVERLAY MONOLITH COM TEXTO DENTRO DA IMAGEM -->
            <div class="monolith-text-overlay" id="dossier-monolith-overlay">
              <div class="pointer-events-auto">
                <span class="badge-comprar mb-2" id="dossier-badge">COMPRAR</span>
                <h2 class="text-2xl lg:text-3xl font-extrabold tracking-tight text-white mb-1" id="dossier-title">
                  ${featured.title}
                </h2>
                <p class="text-xs text-white/80 flex items-center gap-1.5" id="dossier-subtitle">
                  <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#4EBA7E]"></i>
                  <span>${featured.bairro}, ${featured.cidade} · ${featured.distanciaMaringa}</span>
                </p>
              </div>

              <div class="text-left md:text-right pointer-events-auto">
                <span class="text-[10px] uppercase tracking-widest text-white/60 block font-['Inter']">PREÇO DE REFERÊNCIA</span>
                <span class="text-2xl lg:text-3xl font-extrabold text-[#4EBA7E] font-display" id="dossier-price">
                  ${featured.preco}
                </span>
              </div>
            </div>
          </div>

          <!-- Miniaturas Interativas do Imóvel Principal -->
          <div class="flex items-center gap-2.5 overflow-x-auto pb-2" id="dossier-thumbnails-track">
            ${featured.photos.map((p, idx) => `
              <div class="presentation-thumb ${idx === 0 ? 'active' : ''}" onclick="changeFeaturedPhoto(${idx})" data-idx="${idx}" title="Ver foto ${idx + 1}">
                <img src="${p}" alt="Foto ${idx + 1}">
              </div>
            `).join('')}
          </div>
        </div>

        <!-- COLUNA DA DIREITA: DOSSIÊ DE DECISÃO TERRITORIAL & FINANCIAMENTO CAIXA (5 Colunas) -->
        <div class="lg:col-span-5 flex flex-col gap-5">
          
          <!-- Card de Simulação Habitacional Caixa / MCMV -->
          <div class="bg-[#12161C] border border-white/12 p-6 atelier-decision-dossier financial-simulation-card" id="dossier-financing-card">
            <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div class="flex items-center gap-2">
                <i data-lucide="landmark" class="w-4 h-4 text-[#4EBA7E]"></i>
                <span class="text-xs font-bold uppercase tracking-wider text-white">SIMULAÇÃO CAIXA ECONÔMICA</span>
              </div>
              <span class="text-[10px] font-semibold text-[#4EBA7E] bg-[#3E9B67]/10 px-2.5 py-1 border border-[#3E9B67]/30">
                ${featured.tagMcmv}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-4">
              <div class="bg-black/30 p-3 border border-white/5">
                <span class="text-[10px] text-white/50 block font-['Inter']">PARCELA ESTIMADA</span>
                <span class="text-lg font-bold text-[#4EBA7E]" id="dossier-caixa-parcela">${featured.simulacao.parcela}</span>
              </div>
              <div class="bg-black/30 p-3 border border-white/5">
                <span class="text-[10px] text-white/50 block font-['Inter']">ENTRADA FACILITADA</span>
                <span class="text-lg font-bold text-white" id="dossier-caixa-entrada">${featured.simulacao.entrada}</span>
              </div>
            </div>

            <div class="text-[11px] text-white/70 space-y-1.5 mb-5 font-['Inter']">
              <div class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-[#3E9B67]"></i>
                <span>Possibilidade de usar FGTS integral como entrada</span>
              </div>
              <div class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-[#3E9B67]"></i>
                <span>Subsídio habitacional Minha Casa Minha Vida</span>
              </div>
              <div class="flex items-center gap-2">
                <i data-lucide="check" class="w-3.5 h-3.5 text-[#3E9B67]"></i>
                <span>Assessoria jurídica e aprovação bancária sem custo</span>
              </div>
            </div>

            <a href="https://wa.me/554438016654?text=Ol%C3%A1!%20Gostaria%20de%20simular%20o%20financiamento%20Caixa%20para%20o%20im%C3%B3vel%20${encodeURIComponent(featured.title)}%20(C%C3%B3d%20${featured.id})" target="_blank" rel="noreferrer" id="dossier-whatsapp-cta" class="btn-vazado w-full py-3.5 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2">
              <span>SOLICITAR SIMULAÇÃO CAIXA ↗</span>
              <i data-lucide="send" class="w-3.5 h-3.5"></i>
            </a>
          </div>

          <!-- Métricas Arquitetônicas & Inteligência Territorial -->
          <div class="bg-[#12161C] border border-white/12 p-6" id="dossier-metrics-card">
            <h3 class="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <i data-lucide="ruler" class="w-4 h-4 text-[#4EBA7E]"></i>
              <span>ESPECIFICAÇÕES TÉCNICAS DO IMÓVEL</span>
            </h3>

            <div class="grid grid-cols-2 gap-3 text-xs mb-5 font-['Inter']">
              <div class="border-b border-white/5 pb-2">
                <span class="text-white/40 block text-[10px]">ÁREA CONSTRUÍDA</span>
                <span class="font-semibold text-white" id="dossier-area">${featured.areaConstruida}</span>
              </div>
              <div class="border-b border-white/5 pb-2">
                <span class="text-white/40 block text-[10px]">DORMITÓRIOS</span>
                <span class="font-semibold text-white" id="dossier-quartos">${featured.quartos} (${featured.suites})</span>
              </div>
              <div class="border-b border-white/5 pb-2">
                <span class="text-white/40 block text-[10px]">VAGAS DE GARAGEM</span>
                <span class="font-semibold text-white" id="dossier-vagas">${featured.vagas}</span>
              </div>
              <div class="border-b border-white/5 pb-2">
                <span class="text-white/40 block text-[10px]">LOCALIZAÇÃO</span>
                <span class="font-semibold text-white" id="dossier-bairro">${featured.bairro}, ${featured.cidade}</span>
              </div>
            </div>

            <!-- Diferenciais Arquitetônicos -->
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-white/50 block mb-2 font-['Inter']">DIFERENCIAIS CONSTRUTIVOS</span>
              <div class="flex flex-wrap gap-1.5" id="dossier-differentials-box">
                ${featured.diferenciais.map(d => `
                  <span class="text-[11px] bg-black/40 text-white/80 border border-white/10 px-2.5 py-1">
                    ${d}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </section>

  <!-- ==========================================================================
       4. BENTO GRID DE 8 IMÓVEIS EM EXATAMENTE 3 FILEIRAS (#catalogo-grid)
       ========================================================================== -->
  <section class="catalog-section" id="catalogo-grid" aria-label="Catálogo Territorial de Oportunidades">
    <div class="max-w-[1440px] mx-auto px-6">
      
      <!-- Cabeçalho do Catálogo -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-white/10 pb-5">
        <div>
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#4EBA7E] mb-1.5 font-['Inter']">
            <span class="w-2 h-2 bg-[#3E9B67] inline-block"></span>
            CATÁLOGO TERRITORIAL (8 IMÓVEIS SELECIONADOS)
          </div>
          <h3 class="text-2xl font-bold tracking-tight text-white font-display">
            Imóveis com Inteligência Territorial no Paraná
          </h3>
        </div>
        <div class="text-xs text-white/50 font-['Inter']">
          Organizado em 3 fileiras geométricas completas · Clique em qualquer card para carregar o dossiê principal
        </div>
      </div>

      <!-- Bento Grid (3 Linhas: Linha 1 = 2 cards; Linha 2 = 3 cards; Linha 3 = 3 cards) -->
      <div class="aura-bento-grid">
        ${gridProps.map((p, index) => {
          let rowIndex = 1;
          let spanClass = 'bento-companion-card';
          if (index === 0) {
            rowIndex = 1;
            spanClass = 'bento-hero-card';
          } else if (index === 1) {
            rowIndex = 1;
            spanClass = 'bento-companion-card';
          } else if (index >= 2 && index <= 4) {
            rowIndex = 2;
            spanClass = 'bento-companion-card';
          } else {
            rowIndex = 3;
            spanClass = 'bento-companion-card';
          }

          const photoJson = JSON.stringify(p.photos).replace(/"/g, '&quot;');
          const isSelected = p.id === featured.id;

          return `
            <article class="aura-bento-card ${spanClass} ${isSelected ? 'is-selected-card' : ''}" 
                     id="card-${p.id}" 
                     data-property-id="${p.id}"
                     data-row-index="${rowIndex}"
                     data-photos="${photoJson}"
                     data-photo-index="0">
              
              <!-- Galeria Interativa com Troca de Fotos e Badge Estrito -->
              <div class="relative w-full ${index === 0 ? 'h-72 sm:h-80' : 'h-64'} bg-[#161B22] overflow-hidden">
                <img src="${p.photos[0]}" 
                     alt="${p.title}" 
                     class="w-full h-full object-cover transition-opacity duration-300 card-main-image cursor-pointer"
                     onclick="selectPropertyForPresentation('${p.id}')">

                <!-- Badge Superior Esquerdo (Estritamente COMPRAR, ALUGAR ou INVESTIR) -->
                <div class="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                  <span class="badge-comprar">${p.category}</span>
                </div>

                <!-- Controles de Navegação de Fotos nos Cards -->
                <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-center justify-between z-10">
                  <div class="flex items-center gap-1.5 bg-black/60 px-2 py-1 text-[11px] font-bold text-white/90">
                    <span class="card-photo-counter font-['Inter']">1 / ${p.photos.length}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <button type="button" 
                            onclick="event.stopPropagation(); changeCardPhoto('${p.id}', -1)" 
                            class="w-7 h-7 bg-black/60 hover:bg-[#3E9B67] hover:text-[#0D1117] text-white flex items-center justify-center transition-colors text-sm font-bold"
                            aria-label="Foto anterior">‹</button>
                    <button type="button" 
                            onclick="event.stopPropagation(); changeCardPhoto('${p.id}', 1)" 
                            class="w-7 h-7 bg-black/60 hover:bg-[#3E9B67] hover:text-[#0D1117] text-white flex items-center justify-center transition-colors text-sm font-bold"
                            aria-label="Próxima foto">›</button>
                  </div>
                </div>
              </div>

              <!-- Informações do Card -->
              <div class="p-5 flex-1 flex flex-col justify-between cursor-pointer" onclick="selectPropertyForPresentation('${p.id}')">
                <div>
                  <div class="flex items-baseline justify-between gap-2 mb-1.5">
                    <span class="text-lg font-extrabold text-[#4EBA7E] font-display">${p.preco}</span>
                    <span class="text-[10px] text-white/40 uppercase tracking-wider font-['Inter']">CÓD. ${p.id}</span>
                  </div>
                  <h4 class="text-base font-bold text-white mb-1.5 hover:text-[#4EBA7E] transition-colors">${p.title}</h4>
                  <p class="text-xs text-white/60 mb-3 flex items-center gap-1 font-['Inter']">
                    <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#3E9B67]"></i>
                    <span>${p.bairro}, ${p.cidade} · ${p.distanciaMaringa}</span>
                  </p>
                </div>

                <!-- Gaveta Extra com Hover Sincronizado por Linha Horizontal -->
                <div class="card-drawer-extra border-t border-white/10 pt-3 mt-1">
                  <div class="grid grid-cols-3 gap-2 text-[11px] text-white/70 mb-3 font-['Inter']">
                    <div>
                      <span class="text-white/40 block text-[9px]">ÁREA</span>
                      <span class="font-semibold text-white">${p.areaConstruida || p.area}</span>
                    </div>
                    <div>
                      <span class="text-white/40 block text-[9px]">QUARTOS</span>
                      <span class="font-semibold text-white">${p.quartos}</span>
                    </div>
                    <div>
                      <span class="text-white/40 block text-[9px]">SUÍTE</span>
                      <span class="font-semibold text-white">${p.suitesNum > 0 ? 'Sim' : 'Não'}</span>
                    </div>
                  </div>
                  
                  <div class="text-[11px] text-[#4EBA7E] mb-3 font-semibold font-['Inter'] flex items-center gap-1">
                    <i data-lucide="check" class="w-3 h-3"></i>
                    <span>Parcela Caixa aprox: ${p.simulacao ? p.simulacao.parcela : 'Sob consulta'}</span>
                  </div>

                  <button type="button" 
                          onclick="event.stopPropagation(); selectPropertyForPresentation('${p.id}')"
                          class="card-whatsapp-btn text-xs font-bold tracking-wider uppercase py-2.5 w-full flex items-center justify-center gap-1.5">
                    <span>EXPLORAR NO DOSSIÊ ↑</span>
                    <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </div>

            </article>
          `;
        }).join('')}
      </div>

    </div>
  </section>

  <!-- ==========================================================================
       5. MÓDULOS DE CONVERSÃO: VENDA COM AVALIAÇÃO REAL & INVESTIMENTO EM LOTES
       ========================================================================== -->
  <section class="bg-[#0D1117] py-16 border-t border-white/10 px-6" id="secoes-especializadas" aria-label="Módulos Especializados">
    <div class="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <!-- Bloco A: Venda seu Imóvel com Avaliação Real -->
      <div class="conversion-block" id="venda-imovel">
        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4EBA7E] mb-3 font-['Inter']">
          <i data-lucide="trending-up" class="w-4 h-4 text-[#3E9B67]"></i>
          <span>PROPRIETÁRIOS & VENDEDORES</span>
        </div>
        <h3 class="text-2xl font-bold text-white mb-3 font-display">
          Venda seu Imóvel com Avaliação Real e Assessoria Jurídica
        </h3>
        <p class="text-xs text-white/60 mb-6 font-['Inter'] leading-relaxed">
          Sem falsas promessas de preço inflado. Nossa equipe técnica realiza vistoria detalhada, análise mercadológica de Maringá e Paiçandu e fotografia profissional, garantindo liquidez ágil e proteção contratual total.
        </p>
        <div class="flex items-center gap-4 flex-wrap">
          <a href="https://wa.me/554438016654?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20uma%20Avalia%C3%A7%C3%A3o%20Real%20para%20vender%20meu%20im%C3%B3vel" target="_blank" rel="noreferrer" class="btn-vazado px-5 py-3 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
            <span>SOLICITAR AVALIAÇÃO REAL NO WHATSAPP</span>
            <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>

      <!-- Bloco B: Investimento em Loteamentos -->
      <div class="conversion-block" id="investimento-lotes">
        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#4EBA7E] mb-3 font-['Inter']">
          <i data-lucide="layers" class="w-4 h-4 text-[#3E9B67]"></i>
          <span>INVESTIDORES TERRITORIAIS</span>
        </div>
        <h3 class="text-2xl font-bold text-white mb-3 font-display">
          Loteamentos Planejados a 15 Minutos de Maringá
        </h3>
        <p class="text-xs text-white/60 mb-6 font-['Inter'] leading-relaxed">
          Terrenos com infraestrutura completa (asfalto, saneamento e rede elétrica pronta para construir) e alto potencial de valorização metropolitana. Condições facilitadas de entrada com parcelamento direto.
        </p>
        <div class="flex items-center gap-4 flex-wrap">
          <a href="https://wa.me/554438016654?text=Ol%C3%A1!%20Tenho%20interesse%20em%20investir%20em%20lotes%20urbanizados%20na%20regi%C3%A3o%20de%20Maring%C3%A1" target="_blank" rel="noreferrer" class="btn-vazado px-5 py-3 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
            <span>CONSULTAR LOTES DISPONÍVEIS</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>

    </div>
  </section>

  <!-- ==========================================================================
       6. RODAPÉ DE CRÉDITO & SEGURANÇA JURÍDICA
       ========================================================================== -->
  <footer class="bg-black py-8 border-t border-white/10 px-6 text-center text-xs text-white/40 font-['Inter']">
    <div class="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <strong class="text-white font-bold">NEGOCIA BEM IMOBILIÁRIA</strong> · CRECI 9314-J
      </div>
      <div>
        Atendimento especializado em Paiçandu e Região Metropolitana de Maringá - PR
      </div>
      <div>
        © 2026 Negocia Bem. Todos os direitos reservados.
      </div>
    </div>
  </footer>

  <!-- ==========================================================================
       7. MOTOR JAVASCRIPT: SINCRONIZAÇÃO DINÂMICA & HOVER POR LINHA
       ========================================================================== -->
  <script>
    // Inicialização de Ícones
    lucide.createIcons();

    // Dataset em memória para chaveamento instantâneo
    const PROPERTY_DB = ${JSON.stringify(gridProps)};
    const FEATURED_INITIAL = ${JSON.stringify(featured)};

    // Estado da Apresentação Principal
    let currentPresentationProperty = FEATURED_INITIAL;

    // ==========================================================================
    // A. TROCA DE FOTO NA APRESENTAÇÃO PRINCIPAL (PRESERVANDO OVERLAY MONOLITH)
    // ==========================================================================
    function changeFeaturedPhoto(photoIndex) {
      if (!currentPresentationProperty || !currentPresentationProperty.photos) return;
      const targetPhoto = currentPresentationProperty.photos[photoIndex];
      const mainImg = document.getElementById('dossier-main-img');
      if (!mainImg || !targetPhoto) return;

      mainImg.style.opacity = '0.4';
      setTimeout(() => {
        mainImg.src = targetPhoto;
        mainImg.style.opacity = '1';
      }, 150);

      const thumbs = document.querySelectorAll('#dossier-thumbnails-track .presentation-thumb');
      thumbs.forEach((t, idx) => {
        if (idx === photoIndex) t.classList.add('active');
        else t.classList.remove('active');
      });
    }

    // ==========================================================================
    // B. SELEÇÃO DINÂMICA DE IMÓVEL VIA CLIQUE NO CARD DO CATÁLOGO
    // ==========================================================================
    function selectPropertyForPresentation(propertyId) {
      const prop = PROPERTY_DB.find(p => p.id === propertyId);
      if (!prop) return;

      currentPresentationProperty = prop;

      // 1. Atualizar Imagem e Overlay Monolith dentro da foto
      const mainImg = document.getElementById('dossier-main-img');
      if (mainImg && prop.photos && prop.photos.length > 0) {
        mainImg.src = prop.photos[0];
      }

      const badgeEl = document.getElementById('dossier-badge');
      if (badgeEl) badgeEl.textContent = (prop.badge || prop.category || 'COMPRAR').toUpperCase();

      const titleEl = document.getElementById('dossier-title');
      if (titleEl) titleEl.textContent = prop.title;

      const subtitleEl = document.getElementById('dossier-subtitle');
      if (subtitleEl) {
        const loc = (prop.bairro ? prop.bairro + ', ' : '') + (prop.cidade || '') + (prop.distanciaMaringa ? ' · ' + prop.distanciaMaringa : '');
        subtitleEl.innerHTML = '<i data-lucide=\"map-pin\" class=\"w-3.5 h-3.5 text-[#4EBA7E]\"></i> <span>' + loc + '</span>';
      }

      const priceEl = document.getElementById('dossier-price');
      if (priceEl) priceEl.textContent = prop.preco || prop.price || 'Sob Consulta';

      // 2. Atualizar Dossiê de Financiamento Caixa
      const parcelaEl = document.getElementById('dossier-caixa-parcela');
      if (parcelaEl) parcelaEl.textContent = (prop.simulacao && prop.simulacao.parcela) ? prop.simulacao.parcela : 'Financiamento Caixa';

      const entradaEl = document.getElementById('dossier-caixa-entrada');
      if (entradaEl) entradaEl.textContent = (prop.simulacao && prop.simulacao.entrada) ? prop.simulacao.entrada : 'Consulte condições';

      // 3. Atualizar Especificações
      const areaEl = document.getElementById('dossier-area');
      if (areaEl) areaEl.textContent = prop.areaConstruida || prop.area || 'Sob consulta';

      const quartosEl = document.getElementById('dossier-quartos');
      if (quartosEl) {
        const q = prop.quartos || '3 dormitórios';
        const s = (prop.suitesNum > 0) ? ' (1 suíte)' : '';
        quartosEl.textContent = q + s;
      }

      const vagasEl = document.getElementById('dossier-vagas');
      if (vagasEl) vagasEl.textContent = prop.vagas || '2 vagas';

      const bairroEl = document.getElementById('dossier-bairro');
      if (bairroEl) bairroEl.textContent = (prop.bairro ? prop.bairro + ', ' : '') + (prop.cidade || 'Região Metropolitana');

      // 4. Atualizar Diferenciais
      const diffBox = document.getElementById('dossier-differentials-box');
      if (diffBox) {
        const diffs = prop.diferenciais || FEATURED_INITIAL.diferenciais || [
          'Varanda gourmet com churrasqueira',
          'Porcelanato retificado polido',
          'Pé direito elevado na sala'
        ];
        diffBox.innerHTML = diffs.map(d => '<span class=\"text-[11px] bg-black/40 text-white/80 border border-white/10 px-2.5 py-1\">' + d + '</span>').join('');
      }

      // 5. Atualizar Miniaturas
      const track = document.getElementById('dossier-thumbnails-track');
      if (track && prop.photos) {
        track.innerHTML = prop.photos.map((p, idx) => 
          '<div class=\"presentation-thumb ' + (idx === 0 ? 'active' : '') + '\" onclick=\"changeFeaturedPhoto(' + idx + ')\" data-idx=\"' + idx + '\" title=\"Ver foto ' + (idx + 1) + '\">' +
          '<img src=\"' + p + '\" alt=\"Foto ' + (idx + 1) + '\">' +
          '</div>'
        ).join('');
      }

      // 6. Atualizar CTA WhatsApp com mensagem personalizada
      const wppCta = document.getElementById('dossier-whatsapp-cta');
      if (wppCta) {
        wppCta.href = 'https://wa.me/554438016654?text=' + encodeURIComponent('Olá! Tenho interesse no imóvel ' + prop.title + ' (Cód. ' + prop.id + ') no valor de ' + (prop.preco || prop.price));
      }

      // 7. Destacar card ativo no Bento Grid
      document.querySelectorAll('.aura-bento-card').forEach(c => c.classList.remove('is-selected-card'));
      const activeCard = document.getElementById('card-' + propertyId);
      if (activeCard) activeCard.classList.add('is-selected-card');

      // Re-executar ícones Lucide
      lucide.createIcons();

      // Rolar suavemente até o Dossiê
      const dest = document.getElementById('imovel-destaque');
      if (dest) {
        const topPos = dest.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: topPos, behavior: 'smooth' });
      }
    }

    // ==========================================================================
    // C. TROCA DE FOTOS NOS CARDS DO CATÁLOGO
    // ==========================================================================
    function changeCardPhoto(propertyId, delta) {
      const card = document.getElementById('card-' + propertyId);
      if (!card) return;

      const photosAttr = card.getAttribute('data-photos');
      if (!photosAttr) return;

      try {
        const photos = JSON.parse(photosAttr);
        let currentIndex = parseInt(card.getAttribute('data-photo-index') || '0', 10);
        let nextIndex = currentIndex + delta;

        if (nextIndex < 0) nextIndex = photos.length - 1;
        if (nextIndex >= photos.length) nextIndex = 0;

        card.setAttribute('data-photo-index', nextIndex);

        const imgEl = card.querySelector('.card-main-image');
        if (imgEl) {
          imgEl.style.opacity = '0.3';
          setTimeout(() => {
            imgEl.src = photos[nextIndex];
            imgEl.style.opacity = '1';
          }, 120);
        }

        const counterEl = card.querySelector('.card-photo-counter');
        if (counterEl) {
          counterEl.textContent = (nextIndex + 1) + ' / ' + photos.length;
        }
      } catch (err) {
        console.error('Erro ao alternar fotos do card:', err);
      }
    }

    // ==========================================================================
    // D. HOVER SINCRONIZADO POR LINHA HORIZONTAL
    // ==========================================================================
    function initSynchronizedRowHover() {
      const cards = document.querySelectorAll('.aura-bento-card[data-row-index]');
      if (!cards.length) return;

      cards.forEach(card => {
        const rowIndex = card.getAttribute('data-row-index');
        if (!rowIndex) return;

        card.addEventListener('mouseenter', () => {
          const rowCards = document.querySelectorAll('.aura-bento-card[data-row-index="' + rowIndex + '"]');
          rowCards.forEach(c => c.classList.add('is-row-hovered'));
        });

        card.addEventListener('mouseleave', () => {
          const rowCards = document.querySelectorAll('.aura-bento-card[data-row-index="' + rowIndex + '"]');
          rowCards.forEach(c => c.classList.remove('is-row-hovered'));
        });
      });
    }
    initSynchronizedRowHover();
  </script>
</body>
</html>
`;

// Caminhos de saída
const targetPath = path.resolve(__dirname, '../studio-dna-engine/clientes/negocia-bem/site/catalogo-imoveis.html');
const mirrorPath = path.resolve(__dirname, '../studio-dna-engine/clientes/negociabem/site/catalogo-imoveis.html');

fs.writeFileSync(targetPath, htmlContent, 'utf8');
console.log(`Written to: ${targetPath} (Size: ${htmlContent.length} bytes)`);

// Espelhar arquivo
fs.writeFileSync(mirrorPath, htmlContent, 'utf8');
console.log(`Mirrored to: ${mirrorPath}`);
console.log('Build completed successfully!');
