# CONTEXT.md — Guia de Isolamento de Contexto & Roteamento ICM

> **Aplicação:** Obrigatório para todos os agentes e scripts do Studio DNA Engine.

---

## 🎯 Regras Globais de Isolamento de Contexto

1. **Escopo Per-Client:**
   - Ao trabalhar em um cliente (ex: `clientes/caso-01-healthtech/`), o agente deve carregar APENAS arquivos dentro dessa pasta específica.
   - NUNCA ler ou citar dados de `clientes/flashtech-caso-03-d2c/` ou outros clientes simultaneamente.

2. **Esqueletos Read-Only (`copias/` e `design-vault/`):**
   - As pastas `copias/` são referências brutas e imutáveis. Nunca altere um arquivo em `copias/` diretamente.
   - O `design-vault/` contém modelos certificados parametrizados. Use-os como base de transmutação mecânica.

3. **Carga Sob Demanda (Least-Privilege):**
   - NUNCA use ferramentas de listagem de diretório aberta para ler o workspace inteiro de uma vez.
   - Utilize as ferramentas e utilitários de `icm/_core/context-router.js` para resolver os caminhos exatos necessários para o estágio ativo.
