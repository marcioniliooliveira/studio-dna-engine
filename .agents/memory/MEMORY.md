# Memory Index

## Project
- [project] Always create a new dedicated branch for major code changes → project-conventions.md
- [project] Playwright cloning conventions for high-fidelity layouts → project-conventions.md
- [project] Always create dual versions (HTML static + Next.js) when copying websites → project-conventions.md

## DNA Lock System (2026-08-25)
- [dna-lock] System has 3 layers: dna-extractor.js (script) + DNA.md (per-project lock) + dna-lock skill (agent enforcement)
- [dna-lock] P0 FlashTech canonical tokens: #02040A (obsidian/base), #00F0FF (CTA-only/Von Restorff), #0072FF (gradient-mid), #64CEFB (gradient-start)
- [dna-lock] CTA rule: #00F0FF + gradient EXCLUSIVO para CTA primário e garantia. Nunca aplicar em outros elementos.
- [dna-lock] Funil fechado (Dossiê 03): 0 links externos no body. CDNs no <head> são permitidos.
- [dna-lock] Correções são CIRÚRGICAS: declarar qual token falhou, corrigir só aquele escopo.
- [dna-lock] Override consciente: declare ⚠️ OVERRIDE DNA P0 [token]: [razão] e aguarde confirmação antes de aplicar.

## Caso 03 — D2C (2026-08-25)
- [caso-03] Produto fictício: APEX (fone wireless premium para desenvolvedores e criadores)
- [caso-03] Backup do clone Ciao Energy original em: clientes/flashtech-caso-03-d2c/site/index.html.bak
- [caso-03] DNA.md gerado em: clientes/flashtech-caso-03-d2c/DNA.md
- [caso-03] Auditoria: node scripts/dna-extractor.js --audit clientes/flashtech-caso-03-d2c/site/index.html → saída: ✅ 0 violações
- [caso-03] Paleta P1 (marca APEX): --apex-silver #C0C8D4, --apex-graphite #1A1D26, --apex-surface #0D0F17

## Caso 02 — E-commerce (referência)
- [caso-02] Tokens: trail.orange=#ea580c, sand.100=#f5f1e8 são P1 do NorthTrail — não são FlashTech P0
- [caso-02] flashtech.cyan, flashtech.blue, flashtech.obsidian estão no Tailwind config mas como tokens de referência
