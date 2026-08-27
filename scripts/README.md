# ⚙️ `scripts/` — Motores de Transmutação e Auditoria ICM

> **Propósito:** Scripts determinísticos de automação, transmutação cirúrgica e auditoria de design tokens.

---

## 🎯 Por que usamos scripts determinísticos em vez de reescrita por IA?

Esqueletos extraídos por scraping (Webflow, Next.js, Framer) contêm entre **500KB e 10MB** de código com 50.000+ linhas, incluindo:
- Animações Lenis e GSAP ScrollTrigger
- Grids complexos e classes de viewport responsivo
- SVGs inline e estruturas de micro-interações

Quando um LLM tenta reescrever um arquivo desse tamanho em uma resposta de chat, ele é forçado por limites de tokens a descartar 95% do código, gerando **AI Slop** (páginas simplórias, quebradas e sem vida).

Os scripts desta pasta resolvem isso operando como **ferramentas de precisão cirúrgica**:
1. Lêem o esqueleto bruto em `copias/`.
2. Lêem o dicionário de marca (`brand-spec.json` ou `DNA.md`).
3. Realizam substituição exata de strings e seletores DOM.
4. Gravam o resultado em `clientes/<nome>/site/index.html` mantendo 100% da física original.

---

## 🛠️ Catálogo de Scripts

| Script | Função | Comando de Exemplo |
| :--- | :--- | :--- |
| `apply-icm-urbi-healthtech.js` | Transmuta o clone do Urbi.ae para a HealthTech PulseMed | `node scripts/apply-icm-urbi-healthtech.js` |
| `apply-icm-healthmed.js` | Versão estendida de transmutação médica | `node scripts/apply-icm-healthmed.js` |
| `dna-extractor.js` | Extrai e audita tokens P0/P1 contra um arquivo HTML | `node scripts/dna-extractor.js --audit clientes/caso-01-healthtech/site/index.html` |
| `capture-hydrated.js` | Script de Playwright para captura de DOM hidratado | `node scripts/capture-hydrated.js` |
| `box-diff-linter.js` | Linter visual e dimensional de layout | `node scripts/box-diff-linter.js` |
