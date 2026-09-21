# Estágio 05: Quality Gate & Auditoria (`05-quality-gate`)

> **Responsável:** Auditor de QA / Verifier Independente  
> **Tipo:** Validação Executável em Headless Browser

---

## 📥 1. Contrato de Entrada (Inputs)
- `clientes/<client-slug>/site/index.html` (servido via Preview Server)
- `clientes/<client-slug>/DNA.md`

## 🚫 2. Contexto Proibido (Forbidden Context)
- NUNCA confiar em autodeclaração de sucesso do agente de build. A auditoria deve rodar comandos reais.

## ⚙️ 3. Processo
1. Iniciar ou consultar o Preview Server em `http://127.0.0.1:4000/clientes/<client-slug>/site/index.html`.
2. Executar o linter Playwright (`node scripts/box-diff-linter.js clientes/<client-slug>`).
3. Avaliar logs de console (erros de JS) e requisições de rede (404 de imagens/assets).
4. Gerar o relatório de auditoria `linter-report.json`.

## 🔍 4. Checkpoint & Auditoria
- Se houver qualquer erro de runtime ou imagem faltando, o build permanece em estado `failed`.

## 📤 5. Contrato de Saída (Outputs)
- `clientes/<client-slug>/linter-report.json`

## ✅ 6. Definition of Done (DoD)
- `jsErrors === 0`, `brokenImages === 0` e evidência gravada em `linter-report.json`.
