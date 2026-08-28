# Estágio 01: Seleção de Referência Estrutural (`01-reference-selection`)

> **Responsável:** Planejador / Agente de Arquitetura  
> **Tipo:** Análise e Curadoria

---

## 📥 1. Contrato de Entrada (Inputs)
- `clientes/<client-slug>/briefing.json` (ou dados fornecidos pelo usuário).
- `design-vault/INDEX.json` (catálogo pesquisável de referências certificadas).

## 🚫 2. Contexto Proibido (Forbidden Context)
- NUNCA ler pastas de outros clientes (`clientes/*`).
- NUNCA ler o código JavaScript bruto de modelos não selecionados em `copias/*`.

## ⚙️ 3. Processo
1. Comparar os requisitos de layout do cliente (Hero, seções editoriais, densidade visual, tom de voz) com as fichas técnicas (`REFERENCE_CARD.md`) do Vault.
2. Calcular o score de compatibilidade ($\ge 85\%$).
3. Selecionar o `selectedRefSlug` dominante (ex: `elyse-residence-dev-webflow-io`).

## 🔍 4. Checkpoint & Auditoria
- A referência escolhida deve possuir esqueleto homologado no `design-vault/`.
- O usuário deve aprovar a referência antes do avanço para a marca.

## 📤 5. Contrato de Saída (Outputs)
- `clientes/<client-slug>/reference-selection.json`

## ✅ 6. Definition of Done (DoD)
- Arquivo `reference-selection.json` gerado e válido com `selectedRefSlug` e `compatibilityScore`.
