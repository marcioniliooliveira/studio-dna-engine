/**
 * Negocia Bem — Central Real Estate Dataset
 * Authoritative data source for authentic Negocia Bem properties in Paiçandu and Maringá.
 * Hosted on official CDN: www.encontraimoveis.com.br
 * 
 * Compatible with Node.js (module.exports) and Browser (window.NEGOCIA_BEM_DATA).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  }
  if (typeof root !== 'undefined') {
    root.NEGOCIA_BEM_DATA = factory();
  }
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const CDN_BASE = 'https://www.encontraimoveis.com.br/img';

  const featured = {
    id: 'NB-105455',
    codigo: 'NB-105455',
    title: 'Casa Contemporânea Jardim América',
    subtitle: 'Espaço, Conforto e Acabamento Superior',
    badge: 'COMPRAR',
    tagMcmv: 'MCMV & FGTS',
    category: 'comprar',
    bairro: 'Jardim América',
    cidade: 'Paiçandu / Região de Maringá',
    endereco: 'Rua Florianópolis, Jardim América, Paiçandu - PR',
    preco: 'R$ 350.000',
    precoNum: 350000,
    areaConstruida: '70,49 m²',
    areaTerreno: '150 m²',
    area: '70,49 m²',
    quartos: '3 dormitórios',
    quartosNum: 3,
    suites: '1 suíte master',
    suitesNum: 1,
    banheiros: '2 banheiros com nicho',
    banheirosNum: 2,
    vagas: '2 vagas',
    vagasNum: 2,
    distanciaMaringa: 'A 12 min da Catedral de Maringá',
    distanciaCentro: '5 min do centro comercial de Paiçandu',
    simulacao: {
      entrada: 'A partir de R$ 35.000 (FGTS / MCMV)',
      parcela: 'Aprox. R$ 1.450 / mês (Caixa)',
      taxa: 'Juros reduzidos Caixa Econômica Federal',
      subsidio: 'Subsídio MCMV de até R$ 55.000',
      sistema: 'Tabela SAC (parcelas decrescentes)'
    },
    diferenciais: [
      'Varanda gourmet com churrasqueira',
      'Porcelanato retificado polido',
      'Pé direito elevado na sala',
      'Infraestrutura pronta para ar-condicionado',
      'Aceita veículo como entrada',
      'Banheiros com nicho embutido e louças premium'
    ],
    desc: 'Casa com 3 quartos, sendo 1 suíte, no Jardim América. Excelente oportunidade para quem busca uma casa funcional, confortável e com ambientes bem distribuídos. O imóvel possui aproximadamente 70,49 m² de área construída, com uma planta pensada para aproveitar bem cada espaço. São 3 dormitórios, sendo 1 suíte, proporcionando maior privacidade e conforto ao casal, além de banheiro social. A casa conta ainda com sala de estar, cozinha independente, área de serviço e varanda gourmet. Localizada no Jardim América, frente para a Rua Florianópolis, a 12 min de Maringá.',
    photos: [
      `${CDN_BASE}/im20-000105455.jpg`, // Fachada moderna
      `${CDN_BASE}/im21-000105455.jpg`, // Sala ampla
      `${CDN_BASE}/im22-000105455.jpg`, // Cozinha independente
      `${CDN_BASE}/im23-000105455.jpg`, // Suíte casal
      `${CDN_BASE}/im24-000105455.jpg`, // Banheiro suíte com nicho
      `${CDN_BASE}/im25-000105455.jpg`, // Dormitório 2
      `${CDN_BASE}/im26-000105455.jpg`, // Varanda gourmet
      `${CDN_BASE}/im27-000105455.jpg`  // Área de serviço e quintal
    ],
    photoCaptions: [
      'Fachada moderna contemporânea com detalhe ripado e iluminação pontual',
      'Sala ampla e integrada com pé direito elevado e luz natural',
      'Cozinha independente com revestimento cerâmico até o teto',
      'Suíte de casal aconchegante com piso porcelanato e vista livre',
      'Banheiro da suíte com nicho em granito embutido e metais nobres',
      'Segundo dormitório versátil (quarto de filhos ou home-office)',
      'Varanda gourmet equipada com churrasqueira a carvão e pia',
      'Área de serviço coberta e quintal privativo gramado'
    ]
  };

  const gridProperties = [
    {
      id: 'NB-106504',
      codigo: 'NB-106504',
      title: 'Casa Nova Jardim Itaipu',
      badge: 'COMPRAR',
      category: 'comprar',
      bairro: 'Jardim Itaipu',
      cidade: 'Paiçandu / PR',
      preco: 'R$ 240.000',
      precoNum: 240000,
      area: '54 m²',
      areaConstruida: '54 m²',
      areaTerreno: '125 m²',
      quartos: '2 dormitórios',
      quartosNum: 2,
      suites: '0',
      suitesNum: 0,
      banheiros: '1 banheiro social',
      banheirosNum: 1,
      vagas: '1 vaga',
      vagasNum: 1,
      distanciaMaringa: '14 min de Maringá',
      isHero: true,
      gridSpan: 'col-span-1 md:col-span-2',
      simulacao: {
        entrada: 'A partir de R$ 24.000 (MCMV)',
        parcela: 'Aprox. R$ 980 / mês',
        taxa: 'Taxa MCMV Faixa 1/2'
      },
      desc: 'Excelente imóvel novo no Jardim Itaipu em Paiçandu. Imóvel enquadrado no programa Minha Casa Minha Vida, ideal para o primeiro imóvel com acabamento de primeira linha.',
      photos: [
        `${CDN_BASE}/im20-000106504.jpg`,
        `${CDN_BASE}/im21-000106504.jpg`,
        `${CDN_BASE}/im22-000106504.jpg`,
        `${CDN_BASE}/im23-000106504.jpg`,
        `${CDN_BASE}/im24-000106504.jpg`,
        `${CDN_BASE}/im25-000106504.jpg`,
        `${CDN_BASE}/im26-000106504.jpg`
      ]
    },
    {
      id: 'NB-106160',
      codigo: 'NB-106160',
      title: 'Casa Térrea Jardim Monte Cristo',
      badge: 'COMPRAR',
      category: 'comprar',
      bairro: 'Jardim Monte Cristo',
      cidade: 'Paiçandu / PR',
      preco: 'R$ 250.000',
      precoNum: 250000,
      area: '74 m²',
      areaConstruida: '74 m²',
      areaTerreno: '150 m²',
      quartos: '3 dormitórios',
      quartosNum: 3,
      suites: '0',
      suitesNum: 0,
      banheiros: '1 banheiro social',
      banheirosNum: 1,
      vagas: '2 vagas',
      vagasNum: 2,
      distanciaMaringa: '13 min de Maringá',
      isCompanion: true,
      gridSpan: 'col-span-1',
      simulacao: {
        entrada: 'A partir de R$ 25.000',
        parcela: 'Aprox. R$ 1.050 / mês',
        taxa: 'MCMV Caixa Econômica'
      },
      desc: 'Residência térrea com 3 quartos no Jardim Monte Cristo em Paiçandu. Quintal nos fundos, sala espaçosa e excelente incidência de sol.',
      photos: [
        `${CDN_BASE}/im20-000106160.jpg`,
        `${CDN_BASE}/im21-000106160.jpg`,
        `${CDN_BASE}/im22-000106160.jpg`,
        `${CDN_BASE}/im23-000106160.jpg`,
        `${CDN_BASE}/im24-000106160.jpg`,
        `${CDN_BASE}/im25-000106160.jpg`,
        `${CDN_BASE}/im26-000106160.jpg`,
        `${CDN_BASE}/im27-000106160.jpg`
      ]
    },
    {
      id: 'NB-107432',
      codigo: 'NB-107432',
      title: 'Casa Planejada Jardim Capital',
      badge: 'COMPRAR',
      category: 'comprar',
      bairro: 'Jardim Capital',
      cidade: 'Paiçandu / PR',
      preco: 'R$ 235.000',
      precoNum: 235000,
      area: '68 m²',
      areaConstruida: '68 m²',
      areaTerreno: '130 m²',
      quartos: '2 dormitórios',
      quartosNum: 2,
      suites: '0',
      suitesNum: 0,
      banheiros: '1 banheiro social',
      banheirosNum: 1,
      vagas: '2 vagas',
      vagasNum: 2,
      distanciaMaringa: '11 min de Maringá',
      gridSpan: 'col-span-1',
      simulacao: {
        entrada: 'A partir de R$ 23.500',
        parcela: 'Aprox. R$ 950 / mês',
        taxa: 'Caixa Habitação'
      },
      desc: 'Casa moderna no Jardim Capital, ótima localização com fácil acesso às principais avenidas de Paiçandu e a 11 min de Maringá.',
      photos: [
        `${CDN_BASE}/im20-000107432.jpg`,
        `${CDN_BASE}/im21-000107432.jpg`,
        `${CDN_BASE}/im22-000107432.jpg`,
        `${CDN_BASE}/im23-000107432.jpg`,
        `${CDN_BASE}/im24-000107432.jpg`,
        `${CDN_BASE}/im25-000107432.jpg`,
        `${CDN_BASE}/im26-000107432.jpg`,
        `${CDN_BASE}/im27-000107432.jpg`
      ]
    },
    {
      id: 'NB-107426',
      codigo: 'NB-107426',
      title: 'Residencial Jardim Dona Marcelina',
      badge: 'COMPRAR',
      category: 'comprar',
      bairro: 'Jardim Dona Marcelina',
      cidade: 'Paiçandu / PR',
      preco: 'R$ 595.000',
      precoNum: 595000,
      area: '140 m²',
      areaConstruida: '140 m²',
      areaTerreno: '250 m²',
      quartos: '3 dormitórios',
      quartosNum: 3,
      suites: '1 suíte com closet',
      suitesNum: 1,
      banheiros: '3 banheiros',
      banheirosNum: 3,
      vagas: '2 vagas cobertas',
      vagasNum: 2,
      distanciaMaringa: '10 min de Maringá',
      gridSpan: 'col-span-1',
      simulacao: {
        entrada: 'Consulte condições personalizadas',
        parcela: 'Financiamento SBPE Caixa',
        taxa: 'Taxas especiais de mercado'
      },
      desc: 'Imóvel de alto padrão no Jardim Dona Marcelina. Espaço gourmet completo, piscina privativa com cascata, suíte com closet e acabamento refinado.',
      photos: [
        `${CDN_BASE}/im20-000107426.jpg`,
        `${CDN_BASE}/im21-000107426.jpg`,
        `${CDN_BASE}/im22-000107426.jpg`,
        `${CDN_BASE}/im23-000107426.jpg`,
        `${CDN_BASE}/im24-000107426.jpg`,
        `${CDN_BASE}/im25-000107426.jpg`,
        `${CDN_BASE}/im26-000107426.jpg`,
        `${CDN_BASE}/im27-000107426.jpg`
      ]
    },
    {
      id: 'NB-103543',
      codigo: 'NB-103543',
      title: 'Sobrado Conforto Jardim Maziero',
      badge: 'COMPRAR',
      category: 'comprar',
      bairro: 'Jardim Maziero',
      cidade: 'Paiçandu / PR',
      preco: 'R$ 340.000',
      precoNum: 340000,
      area: '110 m²',
      areaConstruida: '110 m²',
      areaTerreno: '150 m²',
      quartos: '3 dormitórios',
      quartosNum: 3,
      suites: '1 suíte master',
      suitesNum: 1,
      banheiros: '2 banheiros + lavabo',
      banheirosNum: 2,
      vagas: '2 vagas',
      vagasNum: 2,
      distanciaMaringa: '12 min de Maringá',
      gridSpan: 'col-span-1',
      simulacao: {
        entrada: 'A partir de R$ 34.000',
        parcela: 'Aprox. R$ 1.420 / mês',
        taxa: 'Caixa Econômica Federal'
      },
      desc: 'Amplo sobrado no Jardim Maziero, contando com 3 dormitórios (1 suíte) com sacada panorâmica, sala de estar e jantar integradas e área gourmet.',
      photos: [
        `${CDN_BASE}/im20-000103543.jpg`,
        `${CDN_BASE}/im21-000103543.jpg`,
        `${CDN_BASE}/im22-000103543.jpg`,
        `${CDN_BASE}/im23-000103543.jpg`,
        `${CDN_BASE}/im24-000103543.jpg`,
        `${CDN_BASE}/im25-000103543.jpg`,
        `${CDN_BASE}/im26-000103543.jpg`
      ]
    },
    {
      id: 'NB-106918',
      codigo: 'NB-106918',
      title: 'Casa Residencial Jardim São Miguel',
      badge: 'ALUGAR',
      category: 'alugar',
      bairro: 'Jardim São Miguel',
      cidade: 'Maringá / PR (Próximo ao Catuaí)',
      preco: 'R$ 2.200 / mês',
      precoNum: 2200,
      area: '90 m²',
      areaConstruida: '90 m²',
      areaTerreno: '180 m²',
      quartos: '3 dormitórios',
      quartosNum: 3,
      suites: '1 suíte',
      suitesNum: 1,
      banheiros: '2 banheiros',
      banheirosNum: 2,
      vagas: '2 vagas',
      vagasNum: 2,
      distanciaMaringa: 'Zona Sul de Maringá (Próximo ao Catuaí Shopping)',
      gridSpan: 'col-span-1',
      simulacao: {
        entrada: 'Sem fiador (Seguro Fiança / CredPago)',
        parcela: 'Aluguel mensal R$ 2.200',
        taxa: 'Contrato digital sem burocracia'
      },
      desc: 'Locação residencial no Jardim São Miguel em Maringá, região privilegiada próxima ao Shopping Catuaí, faculdades e principais eixos comerciais.',
      photos: [
        `${CDN_BASE}/im20-000106918.jpg`,
        `${CDN_BASE}/im21-000106918.jpg`,
        `${CDN_BASE}/im22-000106918.jpg`,
        `${CDN_BASE}/im23-000106918.jpg`,
        `${CDN_BASE}/im24-000106918.jpg`,
        `${CDN_BASE}/im25-000106918.jpg`,
        `${CDN_BASE}/im26-000106918.jpg`
      ]
    },
    {
      id: 'NB-106892',
      codigo: 'NB-106892',
      title: 'Casa Conforto Jardim Laranjeiras 2',
      badge: 'ALUGAR',
      category: 'alugar',
      bairro: 'Jardim Laranjeiras 2',
      cidade: 'Paiçandu / PR',
      preco: 'R$ 1.450 / mês',
      precoNum: 1450,
      area: '70 m²',
      areaConstruida: '70 m²',
      areaTerreno: '150 m²',
      quartos: '2 dormitórios',
      quartosNum: 2,
      suites: '0',
      suitesNum: 0,
      banheiros: '1 banheiro social',
      banheirosNum: 1,
      vagas: '1 vaga coberta',
      vagasNum: 1,
      distanciaMaringa: '14 min de Maringá',
      gridSpan: 'col-span-1',
      simulacao: {
        entrada: 'Locação facilitada sem caução',
        parcela: 'Aluguel mensal R$ 1.450',
        taxa: 'Aprovação expressa em 24h'
      },
      desc: 'Casa aconchegante para alugar no Jardim Laranjeiras 2 em Paiçandu. Imóvel muito seguro, com quintal privativo, cozinha com bancada e fácil manutenção.',
      photos: [
        `${CDN_BASE}/im20-000106892.jpg`,
        `${CDN_BASE}/im21-000106892.jpg`,
        `${CDN_BASE}/im22-000106892.jpg`,
        `${CDN_BASE}/im23-000106892.jpg`,
        `${CDN_BASE}/im24-000106892.jpg`,
        `${CDN_BASE}/im25-000106892.jpg`,
        `${CDN_BASE}/im26-000106892.jpg`
      ]
    },
    {
      id: 'NB-87865',
      codigo: 'NB-87865',
      title: 'Lote Condomínio Mandijuba II',
      badge: 'INVESTIR',
      category: 'terrenos',
      bairro: 'Condomínio Mandijuba II',
      cidade: 'Eixo PR-323 / Rio Ivaí',
      preco: 'R$ 115.000',
      precoNum: 115000,
      area: '300 m² (12x25)',
      areaConstruida: '0 m²',
      areaTerreno: '300 m²',
      quartos: 'Terreno p/ construir',
      quartosNum: 0,
      suites: '0',
      suitesNum: 0,
      banheiros: '0',
      banheirosNum: 0,
      vagas: 'Espaço amplo',
      vagasNum: 0,
      distanciaMaringa: 'Acesso direto pela rodovia duplicada PR-323',
      gridSpan: 'col-span-1',
      simulacao: {
        entrada: 'Entrada a partir de R$ 15.000',
        parcela: 'Parcelamento direto em até 60x',
        taxa: 'Sem comprovação bancária complexa'
      },
      desc: 'Terreno plano em condomínio de lazer e moradia Mandijuba II no eixo da PR-323 próximo ao Rio Ivaí. Lote de 300 m² (12x25m), liberado para construir, infraestrutura completa.',
      photos: [
        `${CDN_BASE}/im20-000087865.jpg`,
        `${CDN_BASE}/im21-000087865.jpg`,
        `${CDN_BASE}/im22-000087865.jpg`,
        `${CDN_BASE}/im23-000087865.jpg`
      ]
    }
  ];

  const NEGOCIA_BEM_DATA = {
    featured: featured,
    gridProperties: gridProperties,
    
    // Helper accessors
    getById: function (id) {
      if (featured.id === id || featured.codigo === id) return featured;
      return gridProperties.find(p => p.id === id || p.codigo === id) || null;
    },
    
    getByCategory: function (cat) {
      if (!cat || cat === 'todos') return [featured, ...gridProperties];
      const lower = cat.toLowerCase();
      return gridProperties.filter(p => p.category.toLowerCase() === lower);
    },
    
    getAll: function () {
      return [featured, ...gridProperties];
    }
  };

  return NEGOCIA_BEM_DATA;
});
