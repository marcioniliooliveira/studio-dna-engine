# Relatório Técnico & Handoff de Engenharia: SCALEX Growth & SEO
**Cliente:** `flashtech-caso-04-growth`  
**Referência Canônica:** `copias/acilav-webflow-io`  
**Data:** 01 de Setembro de 2026  
**Status do Pipeline:** `VERIFIED / PRODUCTION-CANDIDATE` (55/55 testes gerais + 6/6 testes de componentes)

---

## 1. Resumo Executivo

Este documento consolida a investigação forense, as correções arquiteturais e as evidências executáveis da transmutação do caso de estudo **SCALEX** (agência de consultoria de Growth, SEO técnico e CRO).

A partir de testes visuais no Google Chrome real que revelaram vazamentos da marca original (*Acilav*), corte de texto e travamento de animações, a engenharia realizou uma intervenção profunda no motor universal ([`src/pipeline/transmuter.js`](file:///c:/Users/wd/Documents/playwright-scraper/src/pipeline/transmuter.js)), eliminou scripts artesanais e blindou a suíte de testes de componentes independentes.

---

## 2. Autópsia das 4 Falhas Visuais Descobertas e Soluções Canônicas

### 🔍 Falha 1: Logotipo "ACILAV" no Topo da Navbar
* **Causa Raiz:** O esqueleto original não utilizava texto para a marca, e sim um arquivo vetorial embutido em tag `<img>` (`nav logo.avif`). Como o transmuter original procurava classes como `.brand-name` e `.logo-text`, o elemento `<img>` permaneceu intocado. O linter de imagem apenas checava se o arquivo carregava (`status 200`), sendo cego para os caracteres desenhados na imagem.
* **Solução Canônica:** A tag `<img>` dentro de `.brand-logo-wrapper` foi substituída por um componente tipográfico nativo `SCALEX` em fonte Anton bold, com cor `#0B0D11` de alto contraste sobre o fundo branco da Hero.

### 🔍 Falha 2: Hero Display Cortado ("GROWTH DE ALTA CONVERS")
* **Causa Raiz:** A frase em português *"DE ALTA CONVERSÃO"* possui 17 caracteres (contra palavras curtas do original em inglês). No desktop (1440px), o container com `overflow: clip` e tamanho de fonte desproporcional empurrava as letras `Ã` e `O` para fora do viewport.
* **Solução Canônica:** Aplicação de `white-space: nowrap !important` e escala tipográfica com clamp responsivo refinado:  
  `font-size: clamp(2rem, 5.8vw, 7.5rem) !important; letter-spacing: -0.02em;`  
  A palavra inteira agora se acomoda confortavelmente com espaçamento perfeitamente balanceado em relação à ilustração central.

### 🔍 Falha 3: Título da Seção Sobre em Inglês e 4 Cards Numéricos Idênticos
* **Causa Raiz:** 
  1. O título institucional possuía a classe `.about-heading`. O transmuter tentava injetar o texto buscando `#about .section-heading`, falhando silenciosamente.
  2. O teste anterior usava `children().remove()` para inspecionar o texto; como o GSAP SplitText quebra o texto em `divs` e `spans` filhos, a remoção apagou todo o texto, fazendo o teste inspecionar uma string vazia e aprovar falsamente o texto em inglês.
  3. Os 4 cards numéricos receberam o mesmo texto genérico porque o seletor `.about-card-text` não iterava por índice.
* **Solução Canônica:**
  1. Mapeamento direto de `.about-heading` com o copy institucional em português (*"Somos uma consultoria de Growth & SEO orientada a dados..."*).
  2. Distribuição de 4 métricas distintas para os números 17+, 50+, 1200+ e 80% (Anos de Experiência, Operações Aceleradas, Palavras no Top 3 e Taxa de Retenção).
  3. O teste de idioma foi reescrito para avaliar `document.body.innerText` no Chromium real, recompondo qualquer SplitText.

### 🔍 Falha 4: Ticker Colossal no Rodapé e Serviços 03 e 04 em Inglês
* **Causa Raiz:**
  1. A esteira `.footer-marquee` repetia a imagem `footer marquee image.avif` em tamanho de 300px exibindo o nome *ACILAV*.
  2. Os serviços 03 e 04 possuíam marcação duplicada para desktop e mobile (`.hide-desktop`) que não estava mapeada.
  3. Links de rodapé (*Style guide, Licence, Changelog*) vazavam nomes de template.
* **Solução Canônica:**
  1. As imagens da esteira foram substituídas por blocos tipográficos dinâmicos da marca **SCALEX** em fonte Anton dourada (`#FFC552`) de 14vw.
  2. Mapeamento completo dos 4 cards de serviço com títulos, descrições e bullets técnicos em português.
  3. Tradução dos links de rodapé para termos institucionais (*Termos de Uso, Privacidade, Compliance*).

---

## 3. Evidências de Runtime & Homologação Automatizada

### Suíte de Componentes Independentes (`npm run test:components`)
Executada em ambiente Chromium com isolamento de contexto:

```text
✔ Component: Insight cards maintain clean rest state (opacity: 0) and reveal on hover (4411.7508ms)
✔ Component: Form security intercepts payload and blocks external legacy endpoints (3393.7867ms)
✔ Component: 3D Cylinder Headings maintain W3C geometry and do not disappear after scroll (4137.8144ms)
✔ Component: Full corpus lexical scan and brand isolation proves zero untranslated leaks (3232.7844ms)
✔ Component: Modal opens in viewport and close button dismisses it cleanly (3096.5195ms)
✔ Component: Pricing tabs switch active state reactively on click (3608.2491ms)
ℹ tests 6 | pass 6 | fail 0 | duration_ms 26052.1183
```

### Suíte Geral de Regressão (`npm test`)
```text
ℹ tests 55 | pass 55 | fail 0 | duration_ms 15244.1219
```

---

## 4. Integração com o Kombai: Arquivos de Canvas Gerados

Para permitir refinamentos visuais de altíssimo nível (micro-espaçamentos, balanceamento óptico e paletas) sem risco de corromper a engenharia, criamos o exportador canônico [`src/generators/kombai-exporter.js`](file:///c:/Users/wd/Documents/playwright-scraper/src/generators/kombai-exporter.js).

Arquivos prontos no diretório `clientes/flashtech-caso-04-growth/kombai-canvas/`:
1. **`Scalex — Sessao 01_ Hero e Navbar.html`**: Canvas isolado da Hero, Navbar e logos de parceiros.
2. **`Scalex — Sessao 02_ Sobre e Metricas.html`**: Canvas da seção Sobre com os 4 cards de estatísticas.
3. **`Scalex — Canvas Completo.html`**: Landing page integral envelopada para o canvas do Kombai.

---

## 5. Prompt Mestre para o Kombai Design Canvas

Quando for importar ou refinar qualquer um desses arquivos no Kombai (ou passar para uma ferramenta de AI Canvas), utilize o prompt rigoroso abaixo para garantir fidelidade de 100% à engenharia estabelecida:

```markdown
### PROMPT DE REFINAMENTO VISUAL NO KOMBAI CANVAS

Você é o Especialista de Design System e UI Engineering da SCALEX.
Seu objetivo é refinar visualmente esta seção exportada no Kombai Canvas, respeitando rigorosamente as restrições arquiteturais abaixo:

1. IDENTIDADE E TIPOGRAFIA:
- Títulos de Display e Logotipo: Usar estritamente a fonte "Anton", sans-serif, em caixa alta (uppercase).
- Textos de Apoio, Parágrafos e Metas: Usar estritamente a fonte "Inter", sans-serif.
- Cor da Marca no Topo (Fundo Branco da Hero): Texto #0B0D11 (preto profundo).
- Cor de Destaque / Acentos: Dourado #FFC552 e Dark Surface #121620.

2. PRESERVAÇÃO ARQUITETURAL W3C (CRÍTICO):
- NUNCA adicione "!important" na propriedade "transform", pois isso quebra a física de rolagem 3D em JavaScript.
- Mantenha a regra "white-space: nowrap" no título "DE ALTA CONVERSÃO" para evitar quebra de linha.
- Não altere as classes semânticas (.brand-logo-text, .hero-display-text-1, .about-card-text).

3. DIRETRIZES DE REFINAMENTO:
- Otimize o equilíbrio óptico entre o título "GROWTH DE ALTA CONVERSÃO" e a ilustração do foguete central.
- Ajuste os paddings dos cards de métricas (17+, 50+, 1200+, 80%) para garantir legibilidade máxima em telas de 1440px e 390px (mobile).
- Garanta que todos os botões mantenham raio de borda consistente e hover states refinados sem sobrescrever z-index.
```

---

## 6. Próximos Passos Recomendados

1. **Refinamento:** Importar `clientes/flashtech-caso-04-growth/kombai-canvas/` no Kombai para eventuais polimentos visuais.
2. **Ciclo Reverso:** Caso altere tokens ou cores no Kombai, atualizar o `brand-spec.json` e rodar:
   ```bash
   npm run transmute -- --client flashtech-caso-04-growth
   npm run test:components
   ```
3. **Deploy:** O artefato em `clientes/flashtech-caso-04-growth/site/index.html` está pronto e validado para publicação.
