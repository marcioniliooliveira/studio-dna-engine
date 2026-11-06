---
name: Imobiliária Silvio Iwata
description: Portal Imobiliário Premium & Flagship Showcase (Maringá / PR)
colors:
  bg-sand: "#F4F1E8"
  bg-forest: "#0B2A1A"
  brand-primary: "#055227"
  brand-deep: "#005023"
  accent-lime: "#A6C83A"
  text-ink: "#0D0F14"
  text-white: "#FFFFFF"
  text-muted: "#6B7A6E"
  border-soft: "rgba(5, 82, 39, 0.12)"
  border-dark: "rgba(255, 255, 255, 0.10)"
  surface-card: "#FFFFFF"
  badge-exclusive: "#E8F3E8"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.brand-primary}"
    textColor: "{colors.text-white}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.brand-deep}"
  badge-status:
    backgroundColor: "{colors.accent-lime}"
    textColor: "{colors.bg-forest}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

## Overview

O Design System da Silvio Iwata materializa a autoridade de 45+ anos da maior imobiliária de Maringá através de uma estética editorial refinada, inspirada em arquitetura contemporânea e fotografia cinematográfica em golden hour. O contraste deliberado entre o Marfim Arquitetônico (`#F4F1E8`) e o Verde Floresta Noturno (`#0B2A1A`) cria ritmo visual entre vitrines solares e imersões técnicas profundas.

## Colors

- **`bg-sand` (`#F4F1E8`):** Marfim base acolhedor e luminoso para seções de conteúdo, catálogo e fichas técnicas.
- **`bg-forest` (`#0B2A1A`):** Verde noturno profundo para a Hero cinematográfica, Drawer em tela cheia e áreas de destaque institucional.
- **`brand-primary` (`#055227`):** Verde institucional clássico da Silvio Iwata para botões principais, ícones de marca e títulos de prestígio.
- **`brand-deep` (`#005023`):** Tom escuro de apoio para hover states e contornos.
- **`accent-lime` (`#A6C83A`):** Lima vibrante para badges de "Lançamento", micro-indicadores e tags ativas.
- **`text-ink` (`#0D0F14`):** Tipografia de alto contraste sobre fundos claros.
- **`text-white` (`#FFFFFF`):** Tipografia pura sobre verde escuro e fotografias escuras.
- **`text-muted` (`#6B7A6E`):** Metadados, legendas e textos de apoio.

## Typography

- **Display / Títulos:** `Instrument Serif` (Italic editorial). Confere elegância atemporal, prestígio cinematográfico e ressonância com grandes publicações arquitetônicas. Usado em manchetes, nomes de empreendimentos emblemáticos e números de destaque.
- **Interface & Textos:** `DM Sans` (pesos 400, 500, 600, 700). Clareza geométrica moderna com excelente legibilidade para dados de imóveis, filtros de busca, tabelas de metragem e interface.

## Layout

- **Header Flutuante (Floating Pill):** Barra de navegação em cápsula com efeito vidro fosco (*frosted glass*), mantendo a navegação discreta e acessível.
- **Hero Cinematográfica:** Fundo panorâmico imersivo de Maringá em golden hour, com cápsula de busca multi-parâmetro ancorada no primeiro fold com atalho `/`.
- **Stage Flagships (Split 50/50 Alternado):** Galeria de renders em alta resolução acompanhada de painel técnico com fichas editoriais e numeração de abas.
- **Vitrine em Grid Curado:** Cartões de imóveis limpos, respiro amplo, fotografia em proporção 4:3 ou 16:9 e metadados organizados em linha.

## Elevation & Depth

- Sombras sutis e difusas em cards sobre marfim (`0 10px 30px -10px rgba(11, 42, 26, 0.08)`).
- Bordas translúcidas finas (`border-soft` de 1px) sobre fundo claro e `border-dark` sobre verde floresta.
- Efeito *backdrop-filter: blur(16px)* em elementos flutuantes (header pill e dropdowns de busca).

## Shapes

- Raio de curvatura suave em cards e contêineres (`rounded.md` de 8px e `rounded.lg` de 16px).
- Cápsulas completas (`rounded.pill` de 9999px) para botões de ação (CTAs), badges de status e campos de busca rápida.

## Components

- **Cápsula de Busca Integrada:** Inputs rápidos de `Comprar / Alugar`, tipo de imóvel e localização, com trigger de tecla `/` para digitação direta do código de referência.
- **Cards de Imóveis:** Imagem em destaque com tag de status no canto superior esquerdo, valor em tipografia marcante, metragem (`m²`), suítes e vagas de garagem em linha de ícones sutis.
- **Stage Split:** Apresentação 50/50 com render arquitetônico à esquerda e especificações técnicas com citação editorial à direita.
- **Drawer de Navegação:** Menu expansivo em tela cheia com tipografia ampla e categorias claras.

## Do's and Don'ts

### Do's
- Mantenha sempre o contraste rigoroso entre o marfim `#F4F1E8` e o verde floresta `#0B2A1A`.
- Use `Instrument Serif` em itálico com moderação e elegância para títulos e declarações de prestígio.
- Destaque imagens reais dos empreendimentos com enquadramento arquitetônico limpo.
- Mantenha o contato via WhatsApp direto e evidente em toda a navegação.

### Don'ts
- **NUNCA** utilizar paletas escuras genéricas ou tokens legados como `#02040A` ou `#00F0FF` (tokens FlashTech expurgados).
- Não polua a interface com pop-ups agressivos ou formulários de múltiplos passos antes do WhatsApp.
- Não utilize fontes sem serifa genéricas para títulos institucionais de prestígio.
- Não crie layouts densos e sobrecarregados estilo portal de classificados populares dos anos 2000.
