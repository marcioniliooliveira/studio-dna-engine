# 🔒 DNA LOCK — Escritório de Contabilidade São Paulo (Maringá / PR)
> **Dossiê:** Portal Contábil Consultivo, Inteligência Tributária & Presença Digital Flagship  
> **Status:** 100% Autêntico — Alinhado Diretamente à Referência Central Manning Elliott (`manningelliott.com`)  
> **Fontes de Verdade:** Identidade Escritório São Paulo + Arquitetura e Tokens de Manning Elliott (`manningelliott.com`)

---

## ⚠️ PROTOCOLO DE AUTORIDADE DO CLIENTE

Este é o **único documento de autoridade** deste projeto. Todo agente, IA ou desenvolvedor que operar em `clientes/escritorio-sao-paulo/` DEVE:

1. **Declarar verbalmente os invariantes P0** antes de gerar qualquer código (`dna-lock`).
2. **Nunca injetar layouts ou estilos genéricos de SaaS moderno**: O padrão estético absoluto do projeto é a **elegância editorial clássica de alta consultoria da Manning Elliott**.
3. **Respeitar os dados legais e históricos verídicos**: CNPJ `79.152.401/0001-17`, Registro `CRC-PR PR-000834/O`, Fundação em **1967 (57 anos)**, sede na **Zona 07 de Maringá - PR**.

---

## 🔴 P0 — INVARIANTES DE DESIGN & ARQUITETURA (Referência Manning Elliott)

### 1. Paleta de Cores P0 (Extraída Diretamente de `manningelliott.com`)

| Token | Hex | Papel no Layout | Justificativa |
|---|---|---|---|
| `color-linen` | `#F0F0EE` | Fundo Base Hero / Papel Linen | Textura quente de linho/papel sofisticado que define a identidade visual da Manning Elliott. |
| `color-navy` | `#041E42` | Azul Noturno / Texto Principal | Tipografia nobre de altíssimo contraste para títulos, corpo de texto e logo. |
| `color-blue` | `#0084D4` | Azul Cerúleo Vibrante | Faixa superior (`secondary-header`), sublinhados animados e acentos de destaque. |
| `color-white` | `#FFFFFF` | Branco Puro | Fundo do header principal e dropdowns do mega-menu. |
| `color-muted` | `#6B758C` | Ardósia Suave | Subtítulos editoriais, metadados de artigos e microcopy. |
| `color-border` | `#E2E4E8` | Linhas Divisórias Delicadas | Separação sutil de colunas e bordas de cards. |

---

### 2. Tipografia P0 (Equivalente Exato das Fontes Proprietárias)

| Família Google Fonts | Fonte Original Manning Elliott | Papel | Pesos |
|---|---|---|---|
| `Newsreader` (Editorial Serif) | `ABC Arizona Flare` | Headlines Display `h1.xl` e Títulos de Mega-Menu | 300, 400, 500, Italic |
| `Inter` (Neo-grotesk) | `Suisse Int'l Book/Bold` | Interface, Navegação, Textos Corridos e Links | 400, 500, 600, 700 |
| `DM Mono` (Monospace) | `Suisse Int'l Mono` | Barra de Credenciais, Eyebrow, Tags e Placeholder de Busca | 400, 500 |

---

### 3. Anatomia do Header P0

- **Altura Total Fixa:** `110px` (`position: fixed; top: 0; width: 100%`).
- **Faixa Superior (`.secondary-header`):**
  - Altura: `32px` | Cor: `#0084D4` (Azul Cerúleo).
  - Conteúdo: Credenciais mono à esquerda (`CRC-PR PR-000834/O • CNPJ 79.152.401/0001-17 • Maringá - PR`) e links em maiúsculas mono à direita (`Sobre Nós`, `Contato`, `Portal do Cliente`).
- **Barra Principal (`#inner-header`):**
  - Altura: `78px` | Cor: `#FFFFFF` com borda inferior `1px solid #E2E4E8`.
  - Logo tipográfico autêntico à esquerda (`SP` + `ESCRITÓRIO SÃO PAULO`).
  - Navegação horizontal com 5 itens estruturados (`People`, `Services`, `Industries`, `Thinking`, `Careers & About`).
  - Sublinhado animado com abertura a partir do cursor (`.hover-underline-animation`).
  - Campo de busca minimalista em formato de pílula à direita (`SEARCH`).
- **Mega-Menu Grid de 12 Colunas:**
  - Dropdown com largura total da página (`width: 100%`).
  - Coluna 1 (4/12): Título gigante em Serif `Newsreader` (`38px`), subtítulo poético em `#6B758C` e link `View All →`.
  - Colunas 2 e 3 (4/12 cada): Listas limpas de sub-serviços com subtítulos em caixa alta mono, links em negrito e descrições refinadas.

---

### 4. Anatomia da Hero P0 (Manning Elliott Stacking Hero)

- Fundo linho `#F0F0EE` preenchendo a viewport (`calc(100vh - 110px)`).
- Eyebrow em caixa alta mono (`Escritório de Contabilidade São Paulo llp`).
- Headline monumental `h1.xl` com linhas encadeadas (`.line-wrapper > .indent`) em serif editorial `Newsreader` (`54px` a `128px`):
  *"Muito mais que contabilidade."*
- Faixa de métricas de prestígio em 4 colunas com números em serif (`57+ Anos`, `CRC-PR Oficial`, `5.0 ★ Google`, `100% Humano`).
