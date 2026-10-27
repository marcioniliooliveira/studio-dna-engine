# 🔒 DNA LOCK — Imobiliária Silvio Iwata (Maringá / PR)
> **Dossiê: Portal Imobiliário Premium & Flagship Showcase**  
> **Status:** 100% Autêntico — Tokens FlashTech expurgados  
> **Fontes de Verdade:** Identidade Silvio Iwata + Referências Alinhadas (`mellem.ca`, `azimuteresidencial.com.br`, `dviga.marketing/masters-en`)

---

## ⚠️ PROTOCOLO DE AUTORIDADE DO CLIENTE

Este é o **único documento de autoridade** deste projeto. Todo agente, IA ou desenvolvedor que operar em `clientes/silvio-iwata-imobiliaria/` DEVE:

1. **Declarar verbalmente os invariantes P0** antes de gerar qualquer código (`dna-lock`).
2. **Nunca injetar tokens externos ou de outros clientes** (ex: proibição estrita de tokens FlashTech como `#02040A` ou `#00F0FF`).
3. **Respeitar a paleta autêntica** da Silvio Iwata e a tipografia editorial acordada.
4. Qualquer proposta de alteração de P0 exige declaração explícita prévia:
   `⚠️ OVERRIDE DNA P0 [tokenName]: [justificativa explícita de negócio]`

---

## 🔴 P0 — INVARIANTES INEGOCIÁVEIS DO PROJETO

### 1. Paleta de Cores P0 (Identidade Autêntica Silvio Iwata)

| Token | Hex | Papel | Justificativa |
|---|---|---|---|
| `bg-sand` | `#F4F1E8` | Background Base Claro | Marfim arquitetônico acolhedor e sofisticado para o catálogo e seções de conteúdo. |
| `bg-forest` | `#0B2A1A` | Base Profunda / Hero / Drawer | Verde floresta noturno profundo. Usado na Hero panorâmica, Drawer de navegação e painel técnico. |
| `brand-primary` | `#055227` | Verde Institucional | Cor histórica da Silvio Iwata. Usada em elementos de marca, botões de ação e títulos de prestígio. |
| `brand-deep` | `#005023` | Verde Escuro de Apoio | Tom escuro para hover states, bordas de cards e superfícies de destaque. |
| `accent-lime` | `#A6C83A` | Acento Vibrante | Lima / Chartreuse para badges de 'Lançamento', chips de status ativos e indicadores de foco. |
| `text-ink` | `#0D0F14` | Tipografia sobre Fundo Claro | Alto contraste e legibilidade máxima em textos de catálogo e fichas técnicas. |
| `text-white` | `#FFFFFF` | Tipografia sobre Fundo Escuro | Texto puro sobre o verde floresta profundo (`#0B2A1A`). |
| `text-muted` | `#6B7A6E` | Textos de Apoio / Metadados | Verde-cinza equilibrado para metadados, legendas e subtítulos. |

### 2. Tipografia P0

| Família | Papel | Estilo Chave | Justificativa |
|---|---|---|---|
| `Instrument Serif` | Display / Títulos de Destaque | Regular + Italic Editorial | Confere o prestígio cinematográfico da referência Azimute (`azimuteresidencial.com.br`). |
| `DM Sans` | Interface, Body, Filtros e Dados | 400, 500, 600, 700 | Clareza geométrica contemporânea inspirada na Mellem (`mellem.ca`) e Masters (`dviga.marketing`). |

### 3. Regras de UX & Conversão Imobiliária P0

| Regra | Valor | Justificativa de Negócio |
|---|---|---|
| **Cápsula de Busca** | Multi-parâmetro (`Comprar/Alugar`, `Tipo`, `Bairro`, `Código`) | Busca sem atrito no primeiro fold com atalho `/` para busca direta de código do imóvel. |
| **Drawer Expansivo** | Navegação em tela cheia categorizada | Organização calma e espaçosa (`mellem.ca`), sem sobrecarga visual de menus suspensos tradicionais. |
| **Stage Split 50/50** | Galeria + Painel Técnico para Lançamentos | Formato de alto impacto (`dviga.marketing`) para valorização dos edifícios emblemáticos de Maringá. |
| **Conversão Direta** | WhatsApp e Consultor Especialista CRECI | Contato direto sem formulários longos e burocráticos. |

---

## 🟡 P1 — VARIÁVEIS DE COMPOSIÇÃO E SUPORTE

- `border-soft`: `rgba(5, 82, 39, 0.12)` (bordas delicadas sobre marfim)
- `border-dark`: `rgba(255, 255, 255, 0.10)` (linhas sutis sobre floresta profunda)
- `surface-card`: `#FFFFFF` (superfície limpa de cards de imóveis)
- `badge-exclusive`: `#E8F3E8` com texto `#055227`

---

## 🟢 P2 — CONTEÚDO E IMÓVEIS (Dinâmico)

- Relação de empreendimentos: *Lithos Residencial*, *La Vie*, *Reserva do Porto*, *Forte de Arundel*.
- Bairros de Maringá: *Zona 01*, *Zona 03*, *Novo Centro*, *Gleba Palhano*, *Jardim Aclimação*.
- Dados técnicos: Metragem (`m²`), suítes, vagas de garagem, fotos dos ambientes.

---

## 📐 ESTRUTURA DE SEÇÕES DO PORTAL (Arquitetura Aprovada)

```
1. [HEADER]           → Floating Pill Nav + Botão Drawer Expansivo + CTA WhatsApp
2. [HERO SECTION]     → Panorama Maringá (Pôr do Sol Catedral) + Instrument Serif + Cápsula de Busca (#0B2A1A)
3. [FLAGSHIPS STAGE]  → Split 50/50 Alternado Masters (Galeria de Renders + Ficha Editorial com Watermark)
4. [VITRINE IMÓVEIS]  → Grid Curado (Venda / Locação) com Cards Minimalistas e Badges de Status
5. [BAIRROS GUIA]     → Mapeamento Visual dos Bairros Mais Valorizados de Maringá
6. [AUTORIDADE]       → 45+ Anos de História, Credenciais CRECI e Volume Transacionado
7. [ATENDIMENTO]      → Canal Direto com Corretores Especialistas
8. [FOOTER]           → Dados Institucionais, Unidades Físicas em Maringá e Links Regulatórios
```

---

## ✅ CHECKLIST PRÉ-CÓDIGO (Validação Obrigatória)

- [x] Tokens FlashTech (`#02040A`, `#00F0FF`, `Archivo`, etc.) 100% purgados deste projeto.
- [x] P0 Backgrounds são `#F4F1E8` (marfim) e `#0B2A1A` (verde floresta profundo).
- [x] Tipografia é `Instrument Serif` + `DM Sans`.
- [x] Estrutura é a de um portal imobiliário premium de Maringá, não landing page D2C genérica.
