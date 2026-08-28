# Estágio 03: Composição de Conteúdo & Anti-Slop (`03-slot-composition`)

> **Responsável:** Copywriter / Redator Semântico  
> **Tipo:** Geração Semântica Parametrizada

---

## 📥 1. Contrato de Entrada (Inputs)
- `clientes/<client-slug>/brand-spec.json`
- `design-vault/<selected-ref-slug>/content-slots.json`

## 🚫 2. Contexto Proibido (Forbidden Context)
- NUNCA ler referências brutas fora do escopo selecionado.
- NUNCA copiar textos de outros clientes.

## ⚙️ 3. Processo
1. Para cada slot em `content-slots.json`, redigir o texto correspondente alinhado ao nicho do cliente.
2. Respeitar o **orçamento de comprimento ($\pm 15\%$)** em relação ao texto original da referência.
3. Garantir 0 resíduos da marca clonada original (nomes, cidades, slogans, domínios).

## 🔍 4. Checkpoint & Auditoria
- Validação determinística anti-slop: busca por "Lorem ipsum", "Placeholder", marcas antigas e strings vazias.

## 📤 5. Contrato de Saída (Outputs)
- `clientes/<client-slug>/content-slots.json`

## ✅ 6. Definition of Done (DoD)
- 100% dos slots mapeados preenchidos sem resíduos e com budget de comprimento atendido.
