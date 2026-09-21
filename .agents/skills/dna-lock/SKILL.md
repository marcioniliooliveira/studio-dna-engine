---
name: dna-lock
description: DNA Lock enforcement for client projects. Reads the project's DNA.md or brand-spec.json before any code generation, declares client invariants aloud, and enforces conscious override protocol. Use whenever a DNA.md or brand-spec.json exists in the project.
when_to_use: "Whenever creating or modifying any client project that has a DNA.md or brand-spec.json file. MANDATORY before writing any HTML, CSS, or component code."
allowed-tools: Read, Write, Edit, Glob, Bash
---

# DNA Lock — Enforcement Protocol

> **Core Rule:** A local `DNA.md` or `brand-spec.json` file is the single source of truth for a client project.
> It overrides all agent preferences, general design tendencies, and cross-project biases.
> **NO CODE before project DNA is declared.**

---

## ACTIVATION CHECK (Run Every Time)

Before writing any code for a project, run this check:

```
1. Does a DNA.md or brand-spec.json exist in the project root (clientes/<projeto>/)?
   YES → Read it entirely, extract the client-specific tokens/rules, and proceed to PROTOCOL
   NO  → Check if the project is derived from a reference in copias/
         Run: node scripts/dna-extractor.js --project <path> (or create brand-spec.json)
```

---

## MANDATORY PROTOCOL (3 Steps)

### Step 1: DECLARE INVARIANTS (out loud, in your response)

After reading the project's local `DNA.md` or `brand-spec.json`, you MUST declare before any code:

```markdown
🔒 **DNA Lock Ativo — [Client / Project Name]**

**P0 Invariantes do Projeto (extraídos do manifesto local):**
- Background Base: [Token local, ex: #120824 ou #02040A]
- CTA Primário: [Token local, ex: #E8FF54 ou gradiente específico]
- Tipografia: [Headings font] + [Body/Data font]
- Regra de Conversão / Funil: [Ex: 3 Chunks de Miller / Zero Links Externos]

**P1 Variáveis deste projeto:**
- [Lista de cores secundárias e tokens específicos do brand-spec.json]

**Checklist P0 confirmada: ✅**
Iniciando implementação cirúrgica...
```

If you skip this declaration → **PROTOCOL VIOLATION. Stop and declare first.**

### Step 2: WRITE CODE UNDER CONSTRAINTS

While implementing:

- Every CSS color must map to the declared project P0 or P1 token.
- Never import or inject tokens from OTHER clients (e.g., do not inject FlashTech tokens into HealthMed/PulseMed).
- CTAs must strictly use the project's declared CTA token.
- Background sections must match the declared project base token.

### Step 3: SELF-AUDIT BEFORE DELIVERY

Before outputting final code, do a mental scan against the project's local spec:

```
✅ Base background matches project spec?
✅ CTA color and typography match project spec?
✅ No external/cross-client tokens or styles leaked?
✅ Structure matches reference skeleton without AI Slop?
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
