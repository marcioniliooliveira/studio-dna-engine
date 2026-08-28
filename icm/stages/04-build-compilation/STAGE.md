# Estágio 04: Compilação Determinística (`04-build-compilation`)

> **Responsável:** Compilador de Build (Node.js / AST Injector)  
> **Tipo:** Transmutação Mecânica Determinística

---

## 📥 1. Contrato de Entrada (Inputs)
- `design-vault/<selected-ref-slug>/skeleton.html`
- `clientes/<client-slug>/content-slots.json`
- `clientes/<client-slug>/brand-spec.json`

## 🚫 2. Contexto Proibido (Forbidden Context)
- NUNCA permitir que a IA reescreva o HTML arbitrariamente.
- A mutação DEVE ser estritamente mecânica via AST/Cheerio ou substituição de tokens.

## ⚙️ 3. Processo
1. Carregar o `skeleton.html`.
2. Injetar as cores da marca (CSS variables/Tailwind).
3. Substituir deterministicamente cada slot pelo texto de `content-slots.json`.
4. Injetar metatags SEO e links de WhatsApp/CTA.
5. Salvar o artefato gerado em `clientes/<client-slug>/site/index.html`.

## 🔍 4. Checkpoint & Auditoria
- Validar se o arquivo `index.html` resultante possui tamanho condizente e sintaxe HTML válida.

## 📤 5. Contrato de Saída (Outputs)
- `clientes/<client-slug>/site/index.html`

## ✅ 6. Definition of Done (DoD)
- Arquivo `index.html` gerado e servível pelo Preview Server em menos de 500ms.
