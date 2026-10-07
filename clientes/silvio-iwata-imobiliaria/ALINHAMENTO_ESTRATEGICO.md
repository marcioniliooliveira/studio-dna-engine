# Dossiê de Alinhamento Estratégico & Visual — Silvio Iwata

> **Cliente:** Imobiliária Silvio Iwata (Maringá / PR)  
> **Status:** Alinhamento Front-End Aprovado  
> **Metodologia:** Interpretable Context Methodology (ICM) — Isolamento Estrito de Cliente

---

## 1. Visão Geral da Transformação

A Silvio Iwata é uma das maiores e mais tradicionais imobiliárias de Maringá e região. O objetivo desta transmutação front-end é substituir a interface legada (pesada, fragmentada e visualmente datada) por uma experiência digital de alto padrão internacional, combinando:

1. **UX & Navegação Calm / Editorial (`mellem.ca`):**
   - Floating pill header com micro-blur e elevação suave.
   - Drawer / Mega-menu arquitetônico em tela cheia com categorização inteligente (`Lançamentos`, `Comprar`, `Alugar`, `Bairros`, `Institucional`).
   - Serenidade visual, ausência de ruído e tipografia generosa.

2. **Hero Panorâmica Atmosférica (`azimuteresidencial.com.br`):**
   - Fotografia cinematográfica em Golden Hour do skyline de Maringá com a Catedral Basílica em destaque.
   - Tipografia de alto contraste com destaque editorial (`Instrument Serif` em itálico e `DM Sans`).
   - Cápsula de busca inteligente imobiliária unificada em verde escuro profundo (`#0B2A1A`), eliminando accents desconexos e preservando a imersão fotográfica.

3. **Stage de Lançamentos Flagship Split 50/50 (`dviga.marketing/masters-en`):**
   - Vitrine de grandes empreendimentos em layout split 50/50 alternado.
   - De um lado: Galeria de renders com abas de ambientes (`01 Fachada`, `02 Living`, `03 Lazer`).
   - Do outro lado: Painel técnico escuro texturizado com watermark arquitetônico sutil, ficha técnica (`m²`, suítes, vagas, bairro) e CTA direto para atendimento exclusivo.

4. **Biblioteca de Componentes (Clean-Room / Caminho B - Arc UI):**
   - Reconstrução de comportamentos inspirados no Arc UI (Tabs, Modais, Drawers, Floating Pills, Badges) sobre fundação limpa (Radix/Tailwind), sem dependência proprietária.

---

## 2. Mapa de Seções do Portal (Estrutura Real Imobiliária)

Diferente do funil D2C monofolha, a Silvio Iwata opera com arquitetura imobiliária especializada:

1. **Header Flutuante + Drawer Expansivo:** Acesso rápido a busca, canais e categorias.
2. **Hero Panorâmica Maringá:** Proposta de valor + Cápsula de busca multi-critério (Finalidade, Tipo, Bairro, Código).
3. **Vitrine Flagships (Masters Split Stage):** Destaque curado dos 3 principais lançamentos de Maringá (Lithos, La Vie, Reserva do Porto).
4. **Catálogo de Imóveis em Destaque:** Grid minimalista com filtros rápidos (Venda / Locação), fotos em proporção editorial e tags de status.
5. **Mapeamento de Bairros de Maringá:** Guia visual dos bairros mais desejados (Zona 01, Novo Centro, Gleba Palhano, Zona Sul).
6. **Autoridade & Tradição Regional:** 45+ anos em Maringá, rede credenciada CRECI, volume de intermediação e depoimentos de proprietários e compradores.
7. **Canal de Atendimento Especializado:** Falar com consultor via WhatsApp / Agendar visita personalizada.
8. **Footer Institucional:** Links regulatórios, CRECI, unidades físicas em Maringá e canais de contato.

---

## 3. Galeria Completa de Mockups & Ativos Criados

Localizados no diretório de evidências do cliente (`clientes/silvio-iwata-imobiliaria/mockups/`):
- `header_drawer_lancamentos.jpg`: Header flutuante em pílula + Drawer aberto em tela cheia exibindo lançamentos e categorias (Mellem UX).
- `hero_smart_search_v1.jpg`: Exploração inicial da Hero com busca inteligente.
- `hero_azimute_maringa_v2.jpg`: Exploração da Hero atmosférica inspirada na Azimute Residencial sobre Maringá.
- `hero_maringa_tokens_unified.jpg`: Versão consolidada da Hero com iluminação fotográfica natural e cápsula de busca unificada com os tokens do Header (`#0B2A1A`).
- `vitrine_lancamentos_grid.jpg`: Grade de lançamentos imobiliários com cards de alta definição.
- `masters_split_showcase.jpg`: Primeira iteração do palco split 50/50 (Dviga Masters).
- `masters_split_refined.jpg`: Segunda iteração de refinamento tipográfico.
- `masters_split_zorge_v2.jpg`: Base visual aprovada pelo usuário.
- `masters_split_zorge_v4.jpg`: Versão consolidada fiel — título `L I T H O S` ampliado no topo esquerdo com estrutura `1 — 4` e `EM OBRAS · 62%` preservada, pills limpas `[02 LA VIE]` e `[03 RESERVA DO PORTO]` no topo direito sem texto extra, espaço negativo central preservado, terço inferior com `LIVING GOURMET & SKY POOL` e texto em 2 linhas, e alinhamento horizontal side-by-side dos dados (`240 – 380 M²...`) e CTA (`CONHECER EMPREENDIMENTO →`) na base.
- `ref-user-zorge9-style.png`: Screenshot de referência do Zorge Nº 9 (estilo de tipografia e espaço) fornecido pelo usuário.
- `ref-user-zorge9-lobby.png`: Screenshot de referência do Zorge Nº 9 (slide de lobby demonstrando posicionamento de título e parágrafo inferior) fornecido pelo usuário.
- `ref-user-aircenter-progress.png`: Screenshot de referência do Air Center (`aircenter.space`) fornecido pelo usuário.
- `ref-user-split-1.png` e `ref-user-split-2.png`: Screenshots de referência do split stage da Dviga.



---

## 4. Diretrizes de Implementação Técnica do Stage Flagship

1. **Apresentação de Imagens (Padrão `skecher-ui/image-glide`):**
   - Na implementação front-end (`npx shadcn@latest add CoDesign-Spa27/skecher-ui/image-glide`), a área da fotografia na esquerda exibirá o render principal sem poluição. A fita de miniaturas dos outros ângulos/ambientes permanece oculta e desliza suavemente em glide apenas no `:hover` da imagem.
2. **Carregamento & Transição (Padrão `aircenter.space`):**
   - Ao interagir com o botão de ação / ver mais (`CONHECER EMPREENDIMENTO →`), a próxima seção deve transicionar de forma cinematográfica com scroll inercial / carregamento dinâmico sem corte brusco.
3. **Equilíbrio Espacial & Anti Text-Heavy:**
   - O painel direito prioriza o espaço negativo, o nome do empreendimento com espaçamento generoso (`L I T H O S`), metadados horizontais sintéticos e zero efeito de glow artificial.


