# HANDOFF.md — DNA Lock System
> **Studio DNA Engine · Session 2026-08-25**
> Autor: FlashTech via Antigravity IDE
> Commit: `feat: implementa sistema DNA Lock v1 — extrator automático, skill de enforcement e caso 03 D2C`

---

## 📋 Sumário Executivo

Nesta sessão foi diagnosticado e resolvido um problema estrutural de **ambiguidade semântica** que causava o ciclo:

```
Prompt com referência → AI Slop → Correção → Cópia Quebrada → Loop
```

A solução não foi melhorar o prompting manual — foi **eliminar a ambiguidade antes do prompt chegar à IA**, via um sistema de 3 camadas chamado **DNA Lock**.

---

## 🔍 Diagnóstico — Root Cause Analysis

### O Problema

Ao tentar criar projetos usando tokens e estrutura de referência, a IA alternava entre dois falhas:

1. **AI Slop**: ignora a referência e gera output genérico
2. **Cópia Quebrada**: após correção, replica mecanicamente a estrutura sem adaptar lógica

### As 4 Falhas Estruturais Identificadas

| Camada | Falha | Efeito Observado |
|--------|-------|-----------------|
| **Semântica** | Token sem justificativa vinculada | IA substitui `#00F0FF` por "qualquer cyan bonito" |
| **Hierarquia** | Múltiplas fontes sem P0/P1/P2 | Agente usa suas próprias regras sobre as do projeto |
| **Memória** | MEMORY.md sem decisões por projeto | Cada sessão recomeça do zero |
| **Prompt** | Domínio + implementação num único passo | IA colapsa constraints sob pressão de coerência |

### O Ciclo de Corrective Overfitting

Sem saber *o que especificamente* estava errado, a IA corrige tudo simultaneamente ao receber feedback — domínio, estilo, estrutura — quebrando o que já estava correto.

**Solução**: tornar o domínio de invariância **explícito e verificável** em vez de implícito no contexto.

---

## 🏗️ O Sistema DNA Lock — Arquitetura

```
┌─────────────────────────────────────────────────────────┐
│  CAMADA 1: dna-extractor.js (scripts/)                  │
│  Lê HTML/CSS → classifica tokens P0/P1/P2               │
│  Cruza com ESTRUTURA_ANALITICA.md                       │
│  Gera DNA.md automaticamente                            │
├─────────────────────────────────────────────────────────┤
│  CAMADA 2: DNA.md (por projeto)                         │
│  Declara invariantes e variáveis explicitamente         │
│  Vincula cada token à sua justificativa de negócio      │
│  Define hierarquia P0 > P1 > P2 > P3                    │
├─────────────────────────────────────────────────────────┤
│  CAMADA 3: dna-lock skill (.agents/skills/dna-lock/)    │
│  Enforcement no agente                                  │
│  Força declaração de invariantes antes de qualquer código│
│  Protocolo de override consciente com confirmação       │
└─────────────────────────────────────────────────────────┘
```

### Hierarquia de Decisão

```
P0 (DNA.md do projeto)     → INEGOCIÁVEL
P1 (ESTRUTURA_ANALITICA)   → Metodologia de conversão FlashTech
P2 (frontend-specialist)   → Preferências do agente
P3 (preferência estética)  → Mais baixa prioridade
```

**Conflito entre camadas → camada MAIS ALTA sempre vence.**

---

## 📦 Arquivos Criados/Modificados

### Novos Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `scripts/dna-extractor.js` | CLI para extração e auditoria de tokens |
| `clientes/flashtech-caso-03-d2c/DNA.md` | Lock do caso 03 D2C |
| `.agents/skills/dna-lock/SKILL.md` | Skill de enforcement para agentes |
| `clientes/flashtech-caso-03-d2c/site/index.html` | Rebuild D2C — APEX product page |
| `clientes/flashtech-caso-03-d2c/site/index.html.bak` | Backup do clone Ciao Energy original |
| `HANDOFF.md` | Este documento |

### Arquivos Modificados

| Arquivo | Mudança |
|---------|---------|
| `.agents/agent/frontend-specialist.md` | `+dna-lock` no frontmatter `skills:` |
| `.agents/memory/MEMORY.md` | Decisões do DNA Lock e caso 03 persistidas |

---

## 🛠️ Como Usar o DNA Extractor

### Gerar DNA.md para um novo projeto

```bash
node scripts/dna-extractor.js \
  --project clientes/<projeto> \
  --ref clientes/flashtech-caso-02-ecommerce \
  --metodologia "path/to/ESTRUTURA_ANALITICA.md" \
  --dossie 3
```

**Output**: `clientes/<projeto>/DNA.md` gerado automaticamente.

### Auditar HTML contra tokens P0

```bash
node scripts/dna-extractor.js --audit clientes/<projeto>/site/index.html
```

**Output esperado**: `✅ 0 violações de P0 tokens detectadas.`

### Validar projeto existente (DNA.md já existe)

```bash
node scripts/dna-extractor.js --validate --project clientes/<projeto>
```

### Override consciente (alterar P0 com razão explícita)

```bash
node scripts/dna-extractor.js --project clientes/<projeto> --override-dna
# Permite regenerar DNA.md sobrescrevendo o existente
```

---

## 🧬 Tokens P0 Canônicos FlashTech

Estes são os invariantes de identidade da marca. **Nunca alterar sem DNA Override aprovado.**

| Token | Hex | Papel | Justificativa |
|-------|-----|-------|---------------|
| `obsidian` | `#02040A` | Background base | Von Restorff: alto contraste para isolamento do CTA |
| `cyan` | `#00F0FF` | CTA exclusivo | Von Restorff: grava conversão na memória curto prazo |
| `blue` | `#0072FF` | Gradiente mid | Identidade do span `#64CEFB→#0072FF→#00F0FF` |
| `cyanLight` | `#64CEFB` | Gradiente start | Identidade FlashTech — início do gradiente de marca |

**Regra crítica**: o gradiente FlashTech aparece **SOMENTE** no CTA primário e na seção de garantia. Em nenhum outro elemento.

---

## 🧪 TESTES PARA EXECUTAR — Backlog de Otimização

> Este é o backlog de testes e melhorias identificados durante o desenvolvimento.
> Execute em ordem de prioridade.

---

### 🔴 PRIORIDADE ALTA — Detecção de Tokens

#### TESTE-D01: Detecção de CSS Variables Aninhadas

**Problema**: o extrator resolve `--ft-cyan: #00F0FF` mas **não resolve** variáveis que referenciam outras variáveis:

```css
/* Caso problemático — não detectado atualmente */
:root {
  --color-primary: #00F0FF;
  --cta-color: var(--color-primary); /* ← não resolvido */
}
```

**Teste**:
1. Criar HTML com `--cta-color: var(--color-primary)` onde `--color-primary: #00F0FF`
2. Rodar: `node scripts/dna-extractor.js --audit <arquivo>`
3. **Esperado atual**: reporta `#00F0FF` como ausente (falso negativo)
4. **Esperado após fix**: resolve a cadeia de variáveis e detecta `#00F0FF`

**Fix sugerido**: implementar multi-pass resolution no `extractTokensFromHTML` — percorrer o `cssVarMap` e resolver referências `var(--x)` recursivamente.

---

#### TESTE-D02: Detecção em Tailwind Config (JavaScript)

**Problema**: tokens definidos no bloco `tailwind.config = { theme: { colors: { flashtech: { cyan: '#00F0FF' } } } }` não são capturados pelo regex atual de CSS vars.

**Teste**:
```html
<script>
  tailwind.config = {
    theme: { extend: { colors: { flashtech: { cyan: '#00F0FF', obsidian: '#02040A' } } } }
  }
</script>
```
1. Rodar: `node scripts/dna-extractor.js --audit <arquivo>`
2. **Esperado atual**: pode não detectar (depende do regex de colorFreq)
3. **Verificar**: se hits include `#00F0FF` e `#02040A`

**Fix sugerido**: adicionar extração específica de blocos `tailwind.config` via regex `colors:\s*\{([\s\S]*?)\}` com busca de hex dentro.

---

#### TESTE-D03: Tolerância de Distância de Cor (Threshold 15)

**Problema**: threshold de distância Euclidiana RGB de 15 pode causar falsos positivos com cores próximas mas semanticamente diferentes.

**Teste de limiar**:
```
#00F0FF (P0 cyan)     vs   #00E8FF → distância ~8  → deve ser P0 match? Talvez falso positivo.
#00F0FF               vs   #00D0FF → distância ~20  → deve ser P1 (diferente intencional)
#02040A (P0 obsidian) vs   #030610 → distância ~5   → deve ser P0 match ✓
```

**Como executar**:
```bash
node -e "
const d = (h1,h2) => {
  const t = h => { const c=h.replace('#',''); return [parseInt(c.slice(0,2),16),parseInt(c.slice(2,4),16),parseInt(c.slice(4,6),16)]; };
  const [r1,g1,b1]=t(h1); const [r2,g2,b2]=t(h2);
  return Math.sqrt((r1-r2)**2+(g1-g2)**2+(b1-b2)**2).toFixed(2);
};
console.log('#00F0FF vs #00E8FF:', d('#00F0FF','#00E8FF'));
console.log('#00F0FF vs #00D0FF:', d('#00F0FF','#00D0FF'));
console.log('#00F0FF vs #00CCFF:', d('#00F0FF','#00CCFF'));
console.log('#02040A vs #030610:', d('#02040A','#030610'));
"
```

**Decisão a tomar**: ajustar threshold por token (cores escuras toleram mais, cores de conversão toleram menos).

---

#### TESTE-D04: Detecção de CTA Count por Fold

**Problema**: a contagem de CTAs no extrator usa regex simplificado e pode não detectar CTAs implícitos (elementos `<a>` sem classe explícita que funcionam como CTA primário).

**Teste**:
```html
<!-- CTA via classe explícita — detectado -->
<a class="btn-cta" href="#">Comprar</a>

<!-- CTA via atributo data — não detectado atualmente -->
<a data-role="cta" href="#">Comprar</a>

<!-- CTA via botão submit — parcialmente detectado -->
<button type="submit">Comprar</button>
```

**Como testar**: criar HTML com os 3 padrões, auditar, verificar `ctaCount` reportado.

---

#### TESTE-D05: Fontes via `@import` e CSS externo

**Problema**: fontes carregadas via `@import url(...)` no CSS não são detectadas pela regex `family=([A-Za-z+]+)` que busca apenas no Google Fonts URL format.

**Teste**:
```html
<style>
  @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@900');
</style>
```

**Verificar**: se `Archivo` aparece no set de fontes detectadas.

---

### 🟡 PRIORIDADE MÉDIA — Qualidade do DNA.md Gerado

#### TESTE-G01: DNA.md com Projeto Sem HTML

**Cenário**: novo projeto sem index.html ainda criado.

```bash
mkdir -p clientes/test-vazio/site
node scripts/dna-extractor.js --project clientes/test-vazio --dossie 3
```

**Esperado**: DNA.md gerado com apenas P0 canônicos marcados como `⚠️ AUSENTE`, sem crash.
**Verificar**: o aviso "Nenhum index.html encontrado" é exibido corretamente.

---

#### TESTE-G02: Regeneração com `--override-dna` Preserva Backup

```bash
# Gerar initial
node scripts/dna-extractor.js --project clientes/flashtech-caso-03-d2c --dossie 3
# Regenerar com override
node scripts/dna-extractor.js --project clientes/flashtech-caso-03-d2c --dossie 3 --override-dna
```

**Verificar**: `DNA.md.bak` foi criado antes da sobrescrita.

---

#### TESTE-G03: Compatibilidade com Caso 02 (E-commerce)

```bash
node scripts/dna-extractor.js \
  --project clientes/flashtech-caso-02-ecommerce \
  --dossie 2

node scripts/dna-extractor.js --audit clientes/flashtech-caso-02-ecommerce/site/index.html
```

**Esperado**: 
- P0 matches: `#02040A`, `#00F0FF` (presentes como tokens FlashTech no Tailwind config)
- P1 candidates: `#ea580c` (trail.orange — variável de marca NorthTrail)
- 0 violações ou lista de violações válidas e explicadas

**Atenção**: o caso 02 tem dois sistemas de cor coexistindo (FlashTech + NorthTrail). O extrator deve classificar corretamente sem falsos P0 violations.

---

#### TESTE-G04: Detecção de Metodologia por Dossiê

```bash
# Testar extração correta do dossiê certo
node scripts/dna-extractor.js \
  --project clientes/flashtech-caso-03-d2c \
  --metodologia "C:/Users/USER/Documents/flashtech/portifolio flashtech/ESTRUTURA_ANALITICA_METODOLOGIAS_CONVERSAO.md" \
  --dossie 3
```

**Verificar no DNA.md gerado**: a seção de metodologia contém apenas o Dossiê 03, não informações dos outros dossiês.

---

### 🟢 PRIORIDADE BAIXA — Expansão de Funcionalidades

#### TESTE-E01: Modo Watch (Auditoria Contínua)

**Feature não implementada**: modo `--watch` que audita automaticamente ao salvar o arquivo.

```bash
# Feature proposta (não existe ainda)
node scripts/dna-extractor.js --watch clientes/flashtech-caso-03-d2c/site/index.html
```

**Implementação sugerida**: usar `fs.watch()` ou `chokidar` para detectar mudanças e re-auditar automaticamente.

---

#### TESTE-E02: Relatório de CTA Placement

**Feature não implementada**: o auditor verifica *se* os tokens P0 existem, mas não verifica *onde* estão aplicados.

**Caso problemático que passa na auditoria atual**:
```css
/* #00F0FF no background de um hero — VIOLA A SEMÂNTICA mas passa no audit */
.hero { background: #00F0FF; }
/* #00F0FF no CTA — correto */
.btn-cta { background: #00F0FF; }
```

**Melhoria**: auditar se `#00F0FF` aparece em contexto de CTA (seletores `.btn`, `.cta`, `button`) e reportar se for encontrado em outros contextos.

---

#### TESTE-E03: Integração com Preview Server

**Feature**: ao abrir o preview no browser, exibir overlay de auditoria DNA ao vivo.

**Implementação sugerida**: 
1. O `preview-server.js` injeta um script de auditoria no HTML servido
2. O script coleta cores computadas via `getComputedStyle()` (resolve CSS vars no browser)
3. Compara com P0 canônicos e exibe badge de status

**Vantagem sobre o extrator atual**: resolve `var(--ft-cyan)` no contexto real do browser, eliminando o problema de detecção de CSS vars aninhadas (TESTE-D01).

---

#### TESTE-E04: Multi-Projeto Batch Audit

```bash
# Feature proposta
node scripts/dna-extractor.js --audit-all clientes/
```

**Output esperado**:
```
📊 Relatório Multi-Projeto
├── flashtech-caso-02-ecommerce: ⚠️ 2 violações
├── flashtech-caso-03-d2c: ✅ 0 violações
└── negocia-bem: ❌ DNA.md não encontrado
```

---

## 🎯 Prompt de Handoff — Para Usar em Nova Sessão

> **Copie e cole este prompt no início de qualquer nova sessão de trabalho no Studio DNA Engine para restaurar o contexto completo.**

```
Contexto de sessão — Studio DNA Engine (2026-08-25)

Projeto: studio-dna-engine — motor de análise e recriação de websites para portfólio FlashTech.

## Sistema DNA Lock (implementado hoje)

Criamos um sistema de 3 camadas para resolver o problema de ambiguidade semântica
que causava o ciclo: AI Slop → Correção → Cópia Quebrada.

### Camada 1: scripts/dna-extractor.js
CLI que extrai tokens de HTML/CSS, cruza com ESTRUTURA_ANALITICA.md e gera DNA.md.

Comandos principais:
- Gerar: node scripts/dna-extractor.js --project <path> --dossie 3
- Auditar: node scripts/dna-extractor.js --audit <path/index.html>
- Validar: node scripts/dna-extractor.js --validate --project <path>

### Camada 2: DNA.md (por projeto em clientes/<nome>/DNA.md)
Arquivo de lock que declara:
- P0 INVARIANTES: tokens imutáveis sem override explícito aprovado
- P1 VARIÁVEIS: adaptáveis por projeto sem sobrepor P0
- P2 CONTEÚDO: sempre variável
- Hierarquia: P0 > P1 > frontend-specialist > preferência estética

### Camada 3: .agents/skills/dna-lock/SKILL.md
Skill ativa no frontend-specialist. Antes de qualquer código:
1. Lê o DNA.md do projeto
2. Declara os invariantes P0 em voz alta na resposta
3. Executa checklist antes de gerar código
4. Override P0 = declare "⚠️ OVERRIDE DNA P0 [token]: [razão]" + aguarda confirmação

## Tokens P0 FlashTech Canônicos (nunca mudar sem DNA Override)
- #02040A → obsidian (background base)
- #00F0FF → cyan (Von Restorff — EXCLUSIVO no CTA e garantia)
- #0072FF → blue (gradiente mid)
- #64CEFB → cyanLight (gradiente start)
- Tipografia: Archivo (display) + JetBrains Mono (dados)
- Max 1 CTA por fold (Lei de Hick)
- 0 links externos no funil (Dossiê 03)

## Caso 03 D2C — Status
- Produto: APEX (fone wireless premium para desenvolvedores)
- Auditoria: ✅ 0 violações P0
- Backup original: site/index.html.bak (clone Ciao Energy)
- Paleta P1: --apex-silver #C0C8D4, --apex-graphite #1A1D26

## Backlog de Testes Pendentes
Ver HANDOFF.md — seção "Testes para Executar".
Prioritários: TESTE-D01 (CSS vars aninhadas) e TESTE-D03 (threshold de distância).

## Como Continuar
1. Ler .agents/memory/MEMORY.md
2. Verificar DNA.md do projeto antes de qualquer código
3. Rodar audit antes de qualquer entrega: node scripts/dna-extractor.js --audit <html>
4. Consultar HANDOFF.md para backlog de melhorias
```

---

## 📊 Estado Final da Auditoria

```
Projeto: clientes/flashtech-caso-03-d2c/site/index.html

🔍 Auditando...

✅  0 violações de P0 tokens detectadas.

📋 Cores P1 detectadas:
  #c0c8d4 (freq: 1) — apex-silver
  #1a1d26 (freq: 1) — apex-graphite
  #0d0f17 (freq: 1) — apex-surface

Tokens P0 confirmados:
  ✅ #02040a → obsidian (background base)
  ✅ #00f0ff → cyan (Von Restorff CTA)
  ✅ #0072ff → blue (gradiente mid)
  ✅ #64cefb → cyanLight (gradiente start)
  ✅ 0 links externos no funil
```

---

## 🔗 Referências

- [`ESTRUTURA_ANALITICA_METODOLOGIAS_CONVERSAO.md`](../../../flashtech/portifolio%20flashtech/ESTRUTURA_ANALITICA_METODOLOGIAS_CONVERSAO.md) — Metodologia FlashTech
- [`scripts/dna-extractor.js`](scripts/dna-extractor.js) — Extrator de tokens
- [`.agents/skills/dna-lock/SKILL.md`](.agents/skills/dna-lock/SKILL.md) — Skill de enforcement
- [`clientes/flashtech-caso-03-d2c/DNA.md`](clientes/flashtech-caso-03-d2c/DNA.md) — Lock do caso 03
- [`.agents/memory/MEMORY.md`](.agents/memory/MEMORY.md) — Memória persistente

---

*Gerado em 2026-08-25 · Studio DNA Engine · FlashTech*
