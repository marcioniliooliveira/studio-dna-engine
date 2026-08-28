# /client-delivery — Fluxo Canônico de Produção de Sites de Clientes

Este workflow rege a criação desacoplada de sites para clientes finais. A ICM (Interpretable Context Methodology) controla quais instruções e referências cada estágio pode ler; a transformação do site é executada pelo pipeline determinístico de transmutação.

---

## 🎯 Protocolo de Execução em 4 Fases

### Fase 1: Seleção de Esqueleto no Vault
- Identifique a referência do acervo (`copias/` ou `design-vault/`) que melhor se adapta ao posicionamento do cliente.
- Exemplo: `storeyarchitecture-co-uk` (para marcas que exigem autoridade, elegância e sobriedade).

### Fase 2: Geração da Pasta do Cliente
- Execute o gerador de projetos:
  ```bash
  node src/generators/client-factory.js --brand "Nome do Cliente" --ref "storeyarchitecture-co-uk"
  ```
- Isso cria a pasta isolada em `clientes/<nome-do-cliente>/`.

### Fase 3: Redação & Injeção de Slots
- Preencha o briefing em `clientes/<nome-do-cliente>/brand-spec.json`.
- A IA gera o arquivo `content-slots.json` com a nova copy (respeitando a regra de $\pm 15\%$ de comprimento).
- O `slot-injector.js` mescla mecanicamente o conteúdo em menos de 100ms.

### Fase 4: Quality Gate & Validação
- Execute o linter Playwright:
  ```bash
  node scripts/box-diff-linter.js clientes/<nome-do-cliente>
  ```
- Verifique se:
  - `JS Errors === 0`
  - `Broken Images === 0`
  - `Preview ativo em http://127.0.0.1:4000/clientes/<nome-do-cliente>/site/index.html`

---

## 📦 Entregável
A pasta `clientes/<nome-do-cliente>/` só pode ser considerada pronta para deploy depois que os gates obrigatórios registrarem evidência de aprovação no artefato de produção.
