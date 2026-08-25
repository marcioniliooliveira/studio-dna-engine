---
name: dna-lock
description: DNA Lock enforcement for FlashTech projects. Reads DNA.md before any code generation, declares invariants aloud, and enforces conscious override protocol. Use whenever a DNA.md exists in the project.
when_to_use: "Whenever creating or modifying any project that has a DNA.md file. MANDATORY before writing any HTML, CSS, or component code."
allowed-tools: Read, Write, Edit, Glob, Bash
---

# DNA Lock — Enforcement Protocol

> **Core Rule:** A DNA.md file is the single source of truth for a project.
> It overrides all agent preferences, design tendencies, and aesthetic choices.
> **NO CODE before DNA is declared.**

---

## ACTIVATION CHECK (Run Every Time)

Before writing any code for a project, run this check:

```
1. Does a DNA.md exist in the project root?
   YES → Read it entirely, then proceed to PROTOCOL
   NO  → Ask user: "Devo gerar o DNA.md primeiro?"
         Run: node scripts/dna-extractor.js --project <path>
```

---

## MANDATORY PROTOCOL (3 Steps)

### Step 1: DECLARE INVARIANTS (out loud, in your response)

After reading DNA.md, you MUST declare before any code:

```markdown
🔒 **DNA Lock Ativo — [Project Name]**

**P0 Invariantes confirmados:**
- Background: #02040A (obsidiana)
- CTA único: #00F0FF / gradiente #64CEFB→#0072FF→#00F0FF
- Tipografia: Archivo (display) + JetBrains Mono (dados)
- Max 1 CTA por fold (Lei de Hick)
- 0 links externos no funil

**P1 Variáveis deste projeto:**
- [lista do DNA.md]

**Checklist P0 completa: ✅**
Iniciando implementação...
```

If you skip this declaration → **PROTOCOL VIOLATION. Stop and declare first.**

### Step 2: WRITE CODE UNDER CONSTRAINTS

While implementing:

- Every CSS color must map to a P0 or declared P1 token
- Never introduce new primary colors without declaring them as P1 first
- CTAs must use the exact P0 gradient — never approximate with "similar cyan"
- Background sections must use `#02040A` — no "dark alternatives"

### Step 3: SELF-AUDIT BEFORE DELIVERY

Before outputting the final code, do a mental P0 scan:

```
✅ #02040A present as base background?
✅ #00F0FF / gradient applied ONLY to CTA and guarantee?
✅ Archivo loaded in <head>?
✅ JetBrains Mono loaded in <head>?
✅ Only 1 primary CTA per fold?
✅ No external links in funnel body?
```

If ANY check fails → fix before outputting.

---

## OVERRIDE PROTOCOL (Conscious Mutation)

When a valid reason exists to change a P0 token:

**You MUST NOT silently change P0 tokens.**

Instead:
1. Stop before the change
2. Output: `⚠️ OVERRIDE DNA P0 [tokenName]: [explicit business reason]`
3. Wait for explicit user confirmation
4. Only after confirmation → apply change AND update DNA.md accordingly

**Example valid override:**
```
⚠️ OVERRIDE DNA P0 [obsidian-background]:
O produto é branco/clean — fundo preto reduz percepção de valor.
Proposta: substituir #02040A por #F8F8F5 (creme premium).
Aguardando confirmação para prosseguir e atualizar DNA.md.
```

**Invalid override (NEVER do this):**
```
❌ Silently using #1a1a2e instead of #02040A
❌ "Adjusting" the CTA color to "a similar cyan"
❌ Adding a secondary CTA "for better UX" without declaration
```

---

## CORRECTIVE SURGERY PROTOCOL

When a correction is requested, **operate surgically, not globally.**

Wrong: "I'll redo the page with the correct colors."
Right:
```
🔧 Correção cirúrgica:
- Problema identificado: CTA usando #00ccff (P0 violado)
- Token correto: #00F0FF + gradiente completo
- Escopo da correção: apenas seletores .btn-cta e .guarantee-cta
- Tudo mais: intocado
```

This prevents the **Slop → Correction → Broken Copy** cycle.

---

## DNA.md MAINTENANCE

After any approved change (including overrides):

```bash
# Validate current HTML against DNA
node scripts/dna-extractor.js --audit <project>/site/index.html

# Expected output: ✅ 0 violações de P0 tokens
```

If violations remain → iterate surgically until audit passes.

---

## RELATED COMMANDS

```bash
# Generate DNA.md for a new project
node scripts/dna-extractor.js --project <path> --dossie <1-4>

# Validate without regenerating
node scripts/dna-extractor.js --validate --project <path>

# Audit specific HTML file
node scripts/dna-extractor.js --audit <path/to/index.html>
```
