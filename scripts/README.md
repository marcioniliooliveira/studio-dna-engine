# ⚙️ `scripts/` — Utilitários de Qualidade, Sintaxe e Build da Engine

> **Propósito:** Ferramentas genéricas de verificação, auditoria, sanitização e empacotamento do **Studio DNA Engine**. Scripts artesanais para clientes individuais não pertencem a este diretório e devem viver no workspace do respectivo cliente.

## 🛠️ Scripts Mantidos

| Script | Função |
| :--- | :--- |
| `audit-syntax.js` | Validação sintática AST/Node dos arquivos do repositório (`npm run lint`) |
| `box-diff-linter.js` | Linter visual e dimensional de layout (`npm run audit`) |
| `detect-antipatterns-browser.js` | Detector de antipadrões executado no Chromium pelo `ImpeccableGate` |
| `detect-antipatterns.mjs` | CLI de varredura de antipadrões (`node scripts/detect-antipatterns.mjs`) |
| `dna-extractor.js` | Extrator/auditor de tokens P0/P1 via `--project` / `--audit` |
| `export-community.js` | Empacotador da distribuição Community Open Source |
| `normalize-all-copies.js` | Normalização em lote de cópias em `copias/` (`npm run normalize`) |
| `run-low-spec-gate.js` | Quality Gate para hardware de baixo desempenho (`npm run test:low-spec`) |
| `run-scrutiny-test.js` | Runner de escrutínio profundo (`npm run audit:scrutiny`) |
| `run-unified-gate.js` | Runner do `UnifiedQualityGate` (`npm run audit:unified`) |
| `cleanup-scratch.js` | Higienização de temporários locais (`npm run clean:scratch`) |
| `ide-pre-tool-hook.js` / `ide-post-edit-hook.js` | Hooks de validação estrita de tokens |
| `compare-execution-cost.js` | Comparativo de telemetria de custo de execução |
| `extract-capsule-spike.js` / `audit-scalex.js` / `build-scalex-runtime.js` / `scalex-ast-transformer.js` / `build-and-certify-pilot.js` | Motores auxiliares referenciados por suítes de contrato/regressão em `test/` |
