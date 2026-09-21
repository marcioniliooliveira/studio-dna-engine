# 🏢 `clientes/` — Multi-Tenant Workspace & Scope Isolation

> **Propósito:** Armazenar os sites e landing pages finais de cada cliente. Cada subdiretório representa um projeto comercial totalmente independente.

---

## 🛡️ Regras de Isolamento de Escopo (ICM Scope Boundary)

1. **Isolamento Total de Contexto:** Cada subpasta dentro de `clientes/` é um mundo isolado.
   * **NUNCA** herde ou misture tokens de cores, slogans, logos ou propostas de valor de um cliente em outro.
   * Exemplo: Tokens da FlashTech (#02040A, #00F0FF) **NÃO** pertencem ao Caso 01 PulseMed (#120824, #E8FF54).
2. **Fonte da Verdade Local:** O arquivo `brand-spec.json` ou `DNA.md` dentro da pasta do cliente é a autoridade suprema para cores, fontes e copywriting.
3. **Imutabilidade Estrutural:** O `site/index.html` de cada cliente é derivado de um esqueleto de referência em `copias/`, preservando a física de animação sem "AI Slop".

---

## 📁 Estrutura Obrigatória de Cada Cliente

Cada cliente deve conter:
```
clientes/<slug-do-cliente>/
├── README.md             ← Manifesto de Escopo (Nicho, Referência, Proposta de Valor)
├── brand-spec.json       ← Dicionário de Dados (Paleta, Tipografia, Métricas, Copy)
└── site/
    └── index.html        ← Site final pronto para produção/preview
```

---

## 🗂️ Índice de Clientes Ativos

| Diretório | Marca | Nicho | Esqueleto Base | Paleta P0 |
| :--- | :--- | :--- | :--- | :--- |
| [`caso-01-healthtech/`](file:///c:/Users/wd/Documents/playwright-scraper/clientes/caso-01-healthtech/) | PulseMed | Telemedicina & Agendamento | `copias/urbi-ae` | `#120824` (Deep Purple) / `#E8FF54` (Neon Lime) |
| [`flashtech-caso-03-d2c/`](file:///c:/Users/wd/Documents/playwright-scraper/clientes/flashtech-caso-03-d2c/) | APEX Wireless | D2C Hardware Premium | `copias/ciao-energy` | `#02040A` (Obsidiana) / `#00F0FF` (Cyan Neon) |
| [`flashtech-caso-02-ecommerce/`](file:///c:/Users/wd/Documents/playwright-scraper/clientes/flashtech-caso-02-ecommerce/) | NorthTrail | E-commerce Outdoor | `copias/...` | `#ea580c` (Trail Orange) / `#f5f1e8` (Sand) |
