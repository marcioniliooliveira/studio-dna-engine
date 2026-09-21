# 🔒 DNA LOCK — FlashTech integrii-imoveis
> **Dossiê 3: Produto Único D2C High-Ticket**
> Gerado por: `node scripts/dna-extractor.js --project C:\Users\USER\Documents\scraper e extracor\studio-dna-engine\clientes\integrii-imoveis`
> Gerado em: 2026-09-21T13:28:09.526Z

---

## ⚠️ COMO USAR ESTE ARQUIVO

Este é o **único documento de autoridade** do projeto. Toda IA, agente ou desenvolvedor
que trabalhar neste projeto DEVE:

1. **Ler este arquivo INTEIRO** antes de escrever qualquer linha de código
2. **Listar verbalmente os P0 invariantes** antes de começar
3. **Declarar explicitamente** qualquer intenção de alterar um P0:
   `⚠️ OVERRIDE DNA P0 [tokenName]: [razão explícita do negócio]`
4. **Aguardar confirmação explícita do usuário** antes de executar um override

Se não existe DNA.md no projeto → rode `node scripts/dna-extractor.js --project <path>`

---

## HIERARQUIA DE DECISÃO

```
P0 (este arquivo)  → INEGOCIÁVEL
P1 (ESTRUTURA_ANALITICA.md §Dossiê 3)  → Metodologia de conversão
P2 (frontend-specialist.md)  → Preferências do agente
P3 (preferência estética da sessão)  → Mais baixa prioridade
```

**Conflito entre camadas → a camada MAIS ALTA sempre vence.**

---

## 🔴 P0 — INVARIANTES (NUNCA alterar sem override explícito aprovado pelo usuário)

### Cores P0 Identificadas no Projeto

| Hex | Token FlashTech | Papel | Justificativa de Negócio |
|-----|-----------------|-------|--------------------------|
| `#02040a` | obsidian | background-base | Von Restorff: alto contraste para isolamento visual do CTA (Dossiê 03) |
| `#00f0ff` | cyan | conversion-cta-only | Von Restorff: grava ponto de conversão na memória curto prazo. EXCLUSIVO no CTA primário e garantia |
| `#0072ff` | blue | gradient-mid | Gradiente de marca FlashTech — meio do span #64CEFB→#0072FF→#00F0FF |
| `#64cefb` | cyanLight | gradient-start | Gradiente de marca FlashTech — início do span |

### Cores P0 Ausentes no HTML (adicionar obrigatoriamente)

| Hex | Token | Papel | Status |
|-----|-------|-------|--------|
_Todos os tokens P0 estão presentes ✅_

### Tipografia P0

| Família | Papel | Justificativa |
|---------|-------|---------------|
| Archivo | Display / Headlines | Consistência de portfólio FlashTech — reconhecimento de marca entre casos |
| JetBrains Mono | Dados técnicos / métricas | Credibilidade técnica em métricas e specs |

### Regras de UX P0 (Lei de Hick + Funil Fechado)

| Regra | Valor | Justificativa |
|-------|-------|---------------|
| CTA máximo por fold | **1** | Lei de Hick-Hyman: decisão binária maximiza conversão (Dossiê 03) |
| Links externos no funil | **0** | Funil fechado: links externos dispersam atenção e geram perda de ROI de tráfego (Dossiê 03) |

---

## 🟡 P1 — VARIÁVEIS DE MARCA (adaptável, sem sobrepor P0)

### Paleta Secundária Identificada

| Hex | Frequência | Observação |
|-----|------------|------------|
| `#00233a` | freq:12 | Variável de marca do cliente — não pode sobrepor P0 |
| `#003358` | freq:4 | Variável de marca do cliente — não pode sobrepor P0 |
| `#264458` | freq:3 | Variável de marca do cliente — não pode sobrepor P0 |
| `#080d14` | freq:3 | Variável de marca do cliente — não pode sobrepor P0 |
| `#0e1825` | freq:4 | Variável de marca do cliente — não pode sobrepor P0 |
| `#7a90a8` | freq:17 | Variável de marca do cliente — não pode sobrepor P0 |
| `#a8bcce` | freq:3 | Variável de marca do cliente — não pode sobrepor P0 |
| `#dce8f0` | freq:5 | Variável de marca do cliente — não pode sobrepor P0 |

### Tipografia P1 (fontes do cliente)

- `Plus Jakarta Sans`
- `Poppins`
- `inherit`

---

## 🟢 P2 — CONTEÚDO (sempre variável, sem restrição)

- Copy: headline, subheadline, bullets de benefício, depoimentos
- Imagens, mockups, vídeos do produto, modelos 3D (.glb)
- Ícones e micro-ilustrações
- Estrutura de seções (a ordem pode mudar, as regras de conversão não)

---

## ESTRUTURA DE SEÇÕES — Dossiê 3 (Storytelling Técnico Progressivo)

Ordem recomendada pelo Dossiê 3:

```
1. Hero → Promessa Central + Prova Imediata
2. Mecanismo → Raio-X do produto (sem vídeo pesado)
3. Comparativo → Nós vs Soluções Convencionais
4. Garantia + Checkout → Segundo (e último) CTA
5. Footer → Mínimo, sem links de fuga
```

---

## CHECKLIST PRÉ-CÓDIGO (completar antes de escrever qualquer HTML)

- [ ] Li e internalizei todos os tokens P0 acima
- [ ] Confirmei que nenhuma cor P1 sobrepõe uma cor P0
- [ ] A estrutura de seções segue o Storytelling Progressivo acima
- [ ] Máximo 1 CTA por fold está planejado no layout
- [ ] Fontes Archivo + JetBrains Mono estão no `<head>`
- [ ] Background base é `#02040A` (obsidiana)
- [ ] Gradiente `#64CEFB → #0072FF → #00F0FF` está reservado APENAS para CTA e garantia
- [ ] Nenhum link externo no body da página (funil fechado)

---

## AUDITORIA CONTÍNUA

Para validar o HTML contra este DNA a qualquer momento:

```bash
node scripts/dna-extractor.js --audit C:\Users\USER\Documents\scraper e extracor\studio-dna-engine\clientes\integrii-imoveis/site/index.html
```

Saída esperada: `✅ 0 violações de P0 tokens`
