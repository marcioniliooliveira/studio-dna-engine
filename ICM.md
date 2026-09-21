# ICM — Interpretable Context Methodology

> **Versão:** 2.0  
> **Status:** Governança Operacional Ativa  
> **Propósito:** Definir e isolar o contexto operacional de agentes de IA e pipelines determinísticos, garantindo que nenhum estágio consuma o repositório inteiro ou contamine clientes com dados de terceiros.

---

## 🧭 1. Princípios Fundamentais

1. **ICM é Roteamento de Contexto, não o Motor de Build:**
   - ICM governa **o que a IA pode ler, planejar e produzir**.
   - A transmutação física e o scraping são executados por scripts e compiladores determinísticos.

2. **Isolamento Absoluto de Clientes (Zero Cross-Contamination):**
   - Um agente atuando em `clientes/cliente-A/` está terminantemente proibido de ler `clientes/cliente-B/`.
   - Cores, tokens, copywriting, assets e patches nunca são promovidos a padrões globais sem curadoria formal.

3. **Leitura Estrita e Seletiva (Least-Privilege Context):**
   - O agente nunca deve carregar a pasta `copias/` inteira ou o `design-vault/` inteiro.
   - Cada estágio declara formalmente:
     - `Inputs` permitidos
     - `Forbidden Context` bloqueado
     - `Process` executável
     - `Checkpoint` de revisão
     - `Audit` automatizado
     - `Outputs` produzidos
     - `Definition of Done` (DoD)

---

## 🔄 2. Os 5 Estágios Canônicos do Ciclo ICM

```
[01: Reference Selection] ──> [02: Brand Spec] ──> [03: Slot Composition] ──> [04: Deterministic Build] ──> [05: Quality Gate]
```

### Estágio 01: Seleção de Referência (`01-reference-selection`)
- **Objetivo:** Analisar o briefing do cliente e selecionar a referência estrutural no Vault mais adequada.
- **Inputs:** `briefing.json` ou formulário de requisitos do cliente; `design-vault/INDEX.json`.
- **Forbidden Context:** Arquivos de código de outros clientes, pastas brutas não selecionadas em `copias/`.
- **Outputs:** `reference-selection.json` (apontando slug da referência principal e compatibilidade).
- **DoD:** Referência selecionada com justificativa técnica e compatibilidade $\ge 85\%$.

### Estágio 02: Especificação de Marca & DNA Lock (`02-brand-spec`)
- **Objetivo:** Definir os tokens visuais, voz da marca e regras invariantes (P0) e customizáveis (P1).
- **Inputs:** `reference-selection.json`, `briefing.json`, `design-vault/<ref-slug>/tokens.json`.
- **Forbidden Context:** `DNA.md` ou `brand-spec.json` de outros clientes.
- **Outputs:** `clientes/<client-slug>/brand-spec.json` e `DNA.md`.
- **DoD:** Paleta com contraste WCAG AA, tipografia definida e regras P0 declaradas.

### Estágio 03: Composição de Conteúdo & Anti-Slop (`03-slot-composition`)
- **Objetivo:** Redigir os textos de todos os slots respeitando os limites semânticos e orçamentários do layout.
- **Inputs:** `brand-spec.json`, `design-vault/<ref-slug>/content-slots.json`.
- **Forbidden Context:** HTML bruto de cópias não selecionadas, referências fora do projeto.
- **Outputs:** `clientes/<client-slug>/content-slots.json`.
- **DoD:** Zero resíduos da marca original, zero placeholders/lorem, comprimento de texto dentro de $\pm 15\%$ do original.

### Estágio 04: Compilação Determinística (`04-build-compilation`)
- **Objetivo:** Montar o artefato do site mecanicamente via injeção AST e substituição de slots.
- **Inputs:** `design-vault/<ref-slug>/skeleton.html`, `clientes/<client-slug>/content-slots.json`, `brand-spec.json`.
- **Forbidden Context:** Código TypeScript/JavaScript arbitrário não homologado.
- **Outputs:** `clientes/<client-slug>/site/index.html` e assets compilados.
- **DoD:** Build executado em $<500\text{ms}$ com saída 100% idempotente e hash reproduzível.

### Estágio 05: Quality Gate & Auditoria (`05-quality-gate`)
- **Objetivo:** Validar visual, console, rede e aderência ao DNA em navegador headless.
- **Inputs:** `clientes/<client-slug>/site/index.html`, `DNA.md`.
- **Forbidden Context:** Nenhum (validação do artefato estático final).
- **Outputs:** `clientes/<client-slug>/linter-report.json`.
- **DoD:** 0 erros de JavaScript no console, 0 imagens quebradas (404), 0 violações de tokens P0.

---

## 🛡️ 3. Regras de Prevenção de AI Slop

1. **Length Budget:** Toda copy gerada por IA deve estar entre $85\%$ e $115\%$ do tamanho do slot de referência original para evitar quebra de layout/flexbox/grid.
2. **Residual Check:** Scripts determinísticos devem buscar palavras-chave e domínios da marca clonada original antes de liberar o artefato.
3. **Deterministic Replacement:** A injeção de dados no HTML é feita por AST (Cheerio) e substituição de tokens, nunca por reescrita livre de arquivos HTML de 10.000 linhas por LLMs.
