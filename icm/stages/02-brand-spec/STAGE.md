# Estágio 02: Especificação de Marca & DNA Lock (`02-brand-spec`)

> **Responsável:** Designer / Frontend Specialist  
> **Tipo:** Design DNA & Definição de Invariantes

---

## 📥 1. Contrato de Entrada (Inputs)
- `clientes/<client-slug>/reference-selection.json`
- `design-vault/<selected-ref-slug>/tokens.json`
- `design-vault/<selected-ref-slug>/brand-spec.template.json`

## 🚫 2. Contexto Proibido (Forbidden Context)
- NUNCA ler `DNA.md` ou `brand-spec.json` de outros clientes.
- NUNCA misturar paletas de cores entre clientes.

## ⚙️ 3. Processo
1. Definir os tokens de marca do cliente (Nome, Nicho, Paleta de Cores, Tipografia, WhatsApp/CTA).
2. Declarar explicitamente as regras **P0 (Invariantes)** de layout e as regras **P1 (Variáveis)** de customização.
3. Gerar a documentação de DNA Lock no formato padrão.

## 🔍 4. Checkpoint & Auditoria
- Validar contraste WCAG AA entre a cor de texto e cor de fundo.
- Validar se o arquivo `brand-spec.json` possui todos os campos obrigatórios.

## 📤 5. Contrato de Saída (Outputs)
- `clientes/<client-slug>/brand-spec.json`
- `clientes/<client-slug>/DNA.md`

## ✅ 6. Definition of Done (DoD)
- Arquivos `brand-spec.json` e `DNA.md` criados e em conformidade com o schema ICM.
