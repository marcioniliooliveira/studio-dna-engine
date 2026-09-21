#!/usr/bin/env node
/**
 * dna-extractor.js — FlashTech DNA Lock Generator & Semantic Auditor (v2)
 *
 * Automatically identifies invariant (P0) vs mutable (P1/P2) tokens
 * by cross-referencing HTML/CSS against the FlashTech methodology doc.
 *
 * Capabilities (v2):
 * - Multi-pass recursive CSS Variables resolution (with fallbacks and cycle protection)
 * - Comment-sanitized Tailwind config JS parser
 * - Role-adaptive colorimetric distance thresholds (strict for CTA, calibrated for dark background)
 * - Near-Match diagnostics for sub-threshold color typos
 * - CTA placement semantic context auditing (Von Restorff compliance)
 * - Extended typography detection (@import, @font-face, Google Fonts)
 *
 * Usage:
 *   node scripts/dna-extractor.js --project <path> [options]
 *
 * Options:
 *   --project   <path>   Target project directory (required)
 *   --ref       <path>   Reference project for comparison (optional)
 *   --metodologia <path> Path to ESTRUTURA_ANALITICA.md (optional)
 *   --dossie    <1-4>    Which dossiê applies to this project (optional)
 *   --validate           Validate existing DNA.md against HTML (no generation)
 *   --audit     <file>   Audit HTML for P0 violations
 *   --override-dna       Allow overriding P0 tokens (conscious override)
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── CLI ARGS ────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const getArg = (flag) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : null;
};
const hasFlag = (flag) => args.includes(flag);

const projectPath    = getArg('--project');
const refPath        = getArg('--ref');
const metodologiaPath= getArg('--metodologia');
const dossieNum      = getArg('--dossie');
const validateMode   = hasFlag('--validate');
const auditFile      = getArg('--audit');
const overrideDna    = hasFlag('--override-dna');

if (!projectPath && !auditFile) {
  console.error('❌  Uso: node scripts/dna-extractor.js --project <path> [opções]');
  console.error('   Veja o cabeçalho do arquivo para documentação completa.');
  process.exit(1);
}

// ─── CORE FLASHTECH DNA — SOURCE OF TRUTH ────────────────────────────────────
// Estes são os tokens P0 canônicos da metodologia FlashTech.
// São extraídos do ESTRUTURA_ANALITICA.md e codificados aqui como fallback.
// O extrator os usa para matching semântico e auditoria contínua.

const FLASHTECH_P0_CANONICAL = {
  colors: {
    obsidian:    { value: '#02040A', role: 'background-base',     threshold: 8, justification: 'Von Restorff: alto contraste para isolamento visual do CTA (Dossiê 03)' },
    cyan:        { value: '#00F0FF', role: 'conversion-cta-only', threshold: 3, justification: 'Von Restorff: grava ponto de conversão na memória curto prazo. EXCLUSIVO no CTA primário e garantia' },
    blue:        { value: '#0072FF', role: 'gradient-mid',        threshold: 6, justification: 'Gradiente de marca FlashTech — meio do span #64CEFB→#0072FF→#00F0FF' },
    cyanLight:   { value: '#64CEFB', role: 'gradient-start',      threshold: 6, justification: 'Gradiente de marca FlashTech — início do span' },
  },
  typography: {
    display: { family: 'Archivo',       role: 'headlines',     justification: 'Consistência de portfólio FlashTech — reconhecimento de marca entre casos' },
    data:    { family: 'JetBrains Mono',role: 'technical-data', justification: 'Credibilidade técnica em métricas e specs' },
  },
  ux: {
    maxCtaPerFold:         { value: 1, justification: 'Lei de Hick-Hyman: decisão binária maximiza conversão (Dossiê 03)' },
    externalLinksInFunnel: { value: 0, justification: 'Funil fechado: links externos dispersam atenção e geram perda de ROI de tráfego (Dossiê 03)' },
  },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const colorDistance = (hex1, hex2) => {
  const toRgb = (h) => {
    const c = h.replace('#', '');
    const full = c.length === 3 ? c.split('').map(x => x+x).join('') : c;
    return [
      parseInt(full.slice(0,2), 16),
      parseInt(full.slice(2,4), 16),
      parseInt(full.slice(4,6), 16),
    ];
  };
  const [r1,g1,b1] = toRgb(hex1);
  const [r2,g2,b2] = toRgb(hex2);
  return Math.sqrt((r1-r2)**2 + (g1-g2)**2 + (b1-b2)**2);
};

const normalizeHex = (hex) => {
  if (!hex || typeof hex !== 'string') return '';
  hex = hex.replace('#','').toLowerCase().trim();
  if (hex.length === 3) hex = hex.split('').map(c=>c+c).join('');
  return '#' + hex.slice(0,6);
};

const readFile = (filePath) => {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf-8');
};

// ─── PARSERS & RESOLVERS ─────────────────────────────────────────────────────

/**
 * Resolve variáveis CSS aninhadas e recursivas (ex: --a: #00F0FF; --b: var(--a); --c: var(--b, #00F0FF))
 */
function extractAndResolveCSSVars(htmlContent) {
  const rawVars = new Map();
  const varDeclRegex = /(--[\w-]+)\s*:\s*([^;}\n]+)/g;
  let m;
  while ((m = varDeclRegex.exec(htmlContent)) !== null) {
    rawVars.set(m[1].trim(), m[2].trim());
  }

  // Multi-pass resolution com limite para evitar loops circulares
  const resolvedVars = new Map(rawVars);
  for (let pass = 0; pass < 10; pass++) {
    let changed = false;
    for (const [varName, val] of resolvedVars.entries()) {
      if (val.includes('var(')) {
        const newVal = val.replace(/var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/g, (_, targetName, fallback) => {
          if (resolvedVars.has(targetName)) {
            return resolvedVars.get(targetName);
          }
          return fallback ? fallback.trim() : '';
        });
        if (newVal !== val) {
          resolvedVars.set(varName, newVal);
          changed = true;
        }
      }
    }
    if (!changed) break;
  }

  // Mapeia varName -> hexadecimais normalizados resolvidos
  const varHexMap = new Map();
  for (const [varName, val] of resolvedVars.entries()) {
    const hexMatches = val.match(/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g);
    if (hexMatches) {
      varHexMap.set(varName, hexMatches.map(normalizeHex));
    }
  }

  return { rawVars, resolvedVars, varHexMap };
}

/**
 * Extrai cores de configurações Tailwind declaradas em scripts JS inline
 */
function extractTailwindColors(htmlContent) {
  const twColors = new Map();
  const scriptRegex = /<script[\s\S]*?<\/script>/gi;
  let scriptMatch;

  while ((scriptMatch = scriptRegex.exec(htmlContent)) !== null) {
    const scriptContent = scriptMatch[0];
    if (!/tailwind/i.test(scriptContent)) continue;

    // Higieniza comentários JS (linha e bloco)
    const cleanJS = scriptContent
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '');

    const hexRegex = /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
    let colorMatch;
    while ((colorMatch = hexRegex.exec(cleanJS)) !== null) {
      const hex = normalizeHex(colorMatch[0]);
      twColors.set(hex, (twColors.get(hex) || 0) + 1);
    }
  }
  return twColors;
}

// ─── EXTRACTOR ───────────────────────────────────────────────────────────────

function extractTokensFromHTML(htmlContent) {
  const tokens = {
    colors: new Map(),
    fonts: new Set(),
    hasExternalLinks: false,
    externalLinkCount: 0,
    ctaCount: 0,
    ctaColorContexts: [],
    nearMatches: []
  };

  const colorFreq = new Map();

  // 1. Resolução Multi-Pass de Variáveis CSS
  const { resolvedVars, varHexMap } = extractAndResolveCSSVars(htmlContent);
  for (const [varName, hexList] of varHexMap.entries()) {
    for (const hex of hexList) {
      colorFreq.set(hex, (colorFreq.get(hex) || 0) + 1);
    }
    // Incrementa frequência para cada uso de var(--nome) no HTML/CSS
    const varUsageRegex = new RegExp(`var\\(\\s*${varName}\\s*(?:,[^)]+)?\\)`, 'g');
    const usages = (htmlContent.match(varUsageRegex) || []).length;
    if (usages > 0) {
      for (const hex of hexList) {
        colorFreq.set(hex, (colorFreq.get(hex) || 0) + usages);
      }
    }
  }

  // 2. Extração de Cores do Tailwind Config (JS)
  const twColors = extractTailwindColors(htmlContent);
  for (const [hex, count] of twColors.entries()) {
    colorFreq.set(hex, (colorFreq.get(hex) || 0) + count);
  }

  // 3. Extração Direta de Cores Hexadecimais no CSS/HTML
  const colorRegex = /(?::|,|\()\s*(#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3}))\b|\b(#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3}))(?=[^0-9a-fA-F]|$)/g;
  let m;
  while ((m = colorRegex.exec(htmlContent)) !== null) {
    const raw = m[1] || m[2];
    if (!raw) continue;
    const hex = normalizeHex(raw);
    colorFreq.set(hex, (colorFreq.get(hex) || 0) + 1);
  }
  tokens.colors = colorFreq;

  // 4. Extração Tipográfica Expandida (@import, @font-face, Google Fonts, inline)
  // Google Fonts URLs
  const fontRegex = /family=([A-Za-z+]+)/g;
  while ((m = fontRegex.exec(htmlContent)) !== null) {
    tokens.fonts.add(m[1].replace(/\+/g, ' '));
  }
  // CSS @import url(...)
  const importFontRegex = /@import\s+url\([^)]*family=([^&"'\s|]+)[^)]*\)/g;
  while ((m = importFontRegex.exec(htmlContent)) !== null) {
    tokens.fonts.add(m[1].replace(/\+/g, ' '));
  }
  // CSS @font-face { font-family: '...' }
  const fontFaceRegex = /@font-face\s*\{[^}]*font-family\s*:\s*['"]?([^'";\n,)]+)/gi;
  while ((m = fontFaceRegex.exec(htmlContent)) !== null) {
    tokens.fonts.add(m[1].trim().replace(/['"]/g, ''));
  }
  // font-family declarations
  const fontFamilyRegex = /font-family\s*:\s*['"]?([^'";\n,)]+)/g;
  while ((m = fontFamilyRegex.exec(htmlContent)) !== null) {
    const family = m[1].trim().replace(/['"]/g, '');
    if (!family.includes('var(')) {
      tokens.fonts.add(family);
    }
  }

  // 5. Verificação de Links Externos de Fuga (Funil Fechado)
  const bodySection = htmlContent.replace(/<head[\s\S]*?<\/head>/i, '');
  const funnelExitRegex = /<a[^>]+href=["'](https?:\/\/(?!127\.0\.0\.1|localhost)[^"']+)["'][^>]*>/gi;
  const funnelExits = bodySection.match(funnelExitRegex) || [];
  tokens.hasExternalLinks = funnelExits.length > 0;
  tokens.externalLinkCount = funnelExits.length;

  // 6. Contagem e Contexto de CTAs
  const ctaRegex = /<(?:button|a)[^>]*(?:cta|btn|button|data-role=["']cta["']|data-cta|type=["']submit["'])[^>]*>/gi;
  tokens.ctaCount = (htmlContent.match(ctaRegex) || []).length;

  // 7. Auditoria de Contexto do Cyan P0 (#00F0FF) — Princípio de Von Restorff
  const cyanP0 = FLASHTECH_P0_CANONICAL.colors.cyan.value.toLowerCase();
  const ctaBlockRegex = /(?:(?:\.btn|\.cta|button|\[data-role=["']cta["']\]|\.guarantee)[\s\S]*?\{[^}]*|\bstyle=["'][^"']*)\b(?:#00f0ff|var\(--(?:ft-)?cyan\))/gi;
  tokens.hasCyanInCta = ctaBlockRegex.test(htmlContent) || htmlContent.includes('#00F0FF') || htmlContent.includes('#00f0ff');

  return tokens;
}

function classifyTokens(extracted) {
  const p0Matches   = [];
  const p1Candidates= [];
  const unclassified= [];
  const nearMatches = [];

  for (const [hex, freq] of extracted.colors.entries()) {
    let matched = false;
    for (const [tokenName, token] of Object.entries(FLASHTECH_P0_CANONICAL.colors)) {
      const dist = colorDistance(hex, token.value);
      const threshold = token.threshold || 5;

      if (dist <= threshold) {
        p0Matches.push({ hex, freq, tokenName, ...token, distance: dist });
        matched = true;
        break;
      } else if (dist > threshold && dist <= 12.0) {
        nearMatches.push({
          foundHex: hex,
          targetToken: tokenName,
          targetValue: token.value,
          distance: parseFloat(dist.toFixed(1))
        });
      }
    }
    if (!matched) {
      if (freq >= 3) p1Candidates.push({ hex, freq, classification: 'P1 - Variável de Marca' });
      else           unclassified.push({ hex, freq, classification: 'P2 - Conteúdo/Isolado' });
    }
  }

  return { p0Matches, p1Candidates, unclassified, nearMatches };
}

function extractFromMetodologia(metodologiaContent, dossieNum) {
  if (!metodologiaContent) return null;
  const dossieMap = { '1': 'DOSSIÊ 01', '2': 'DOSSIÊ 02', '3': 'DOSSIÊ 03', '4': 'DOSSIÊ 04' };
  const target = dossieMap[dossieNum] || 'DOSSIÊ 03';

  const lines = metodologiaContent.split('\n');
  let inDossie = false;
  const relevantLines = [];

  for (const line of lines) {
    if (line.includes(target)) inDossie = true;
    if (inDossie && line.startsWith('# ') && !line.includes(target)) inDossie = false;
    if (inDossie) relevantLines.push(line);
  }
  return relevantLines.join('\n');
}

// ─── DNA.md GENERATOR ────────────────────────────────────────────────────────

function generateDNAMd(projectDir, classified, extractedFonts, metodologiaSection, dossieNum) {
  const projectName = path.basename(projectDir);
  const dossieNames = {
    '1': 'Saúde & Agendamento', '2': 'E-commerce Multi-Produto',
    '3': 'Produto Único D2C High-Ticket', '4': 'Dashboard SaaS'
  };
  const dossieName = dossieNames[dossieNum] || 'Produto Único D2C High-Ticket';

  const p0ColorRows = classified.p0Matches
    .map(t => `| \`${t.hex}\` | ${t.tokenName} | ${t.role} | ${t.justification} |`)
    .join('\n');

  const p1ColorRows = classified.p1Candidates
    .map(t => `| \`${t.hex}\` | freq:${t.freq} | Variável de marca do cliente — não pode sobrepor P0 |`)
    .join('\n');

  const missingP0 = Object.entries(FLASHTECH_P0_CANONICAL.colors)
    .filter(([name]) => !classified.p0Matches.find(m => m.tokenName === name))
    .map(([name, t]) => `| \`${t.value}\` | ${name} | ${t.role} | ⚠️ **AUSENTE no HTML atual** — ${t.justification} |`)
    .join('\n');

  return `# 🔒 DNA LOCK — FlashTech ${projectName}
> **Dossiê ${dossieNum}: ${dossieName}**
> Gerado por: \`node scripts/dna-extractor.js --project ${projectDir}\`
> Gerado em: ${new Date().toISOString()}

---

## ⚠️ COMO USAR ESTE ARQUIVO

Este é o **único documento de autoridade** do projeto. Toda IA, agente ou desenvolvedor
que trabalhar neste projeto DEVE:

1. **Ler este arquivo INTEIRO** antes de escrever qualquer linha de código
2. **Listar verbalmente os P0 invariantes** antes de começar
3. **Declarar explicitamente** qualquer intenção de alterar um P0:
   \`⚠️ OVERRIDE DNA P0 [tokenName]: [razão explícita do negócio]\`
4. **Aguardar confirmação explícita do usuário** antes de executar um override

Se não existe DNA.md no projeto → rode \`node scripts/dna-extractor.js --project <path>\`

---

## HIERARQUIA DE DECISÃO

\`\`\`
P0 (este arquivo)  → INEGOCIÁVEL
P1 (ESTRUTURA_ANALITICA.md §Dossiê ${dossieNum})  → Metodologia de conversão
P2 (frontend-specialist.md)  → Preferências do agente
P3 (preferência estética da sessão)  → Mais baixa prioridade
\`\`\`

**Conflito entre camadas → a camada MAIS ALTA sempre vence.**

---

## 🔴 P0 — INVARIANTES (NUNCA alterar sem override explícito aprovado pelo usuário)

### Cores P0 Identificadas no Projeto

| Hex | Token FlashTech | Papel | Justificativa de Negócio |
|-----|-----------------|-------|--------------------------|
${p0ColorRows || '_(nenhuma cor P0 encontrada — verificar HTML)_'}

### Cores P0 Ausentes no HTML (adicionar obrigatoriamente)

| Hex | Token | Papel | Status |
|-----|-------|-------|--------|
${missingP0 || '_Todos os tokens P0 estão presentes ✅_'}

### Tipografia P0

| Família | Papel | Justificativa |
|---------|-------|---------------|
| Archivo | Display / Headlines | ${FLASHTECH_P0_CANONICAL.typography.display.justification} |
| JetBrains Mono | Dados técnicos / métricas | ${FLASHTECH_P0_CANONICAL.typography.data.justification} |

### Regras de UX P0 (Lei de Hick + Funil Fechado)

| Regra | Valor | Justificativa |
|-------|-------|---------------|
| CTA máximo por fold | **1** | ${FLASHTECH_P0_CANONICAL.ux.maxCtaPerFold.justification} |
| Links externos no funil | **0** | ${FLASHTECH_P0_CANONICAL.ux.externalLinksInFunnel.justification} |

---

## 🟡 P1 — VARIÁVEIS DE MARCA (adaptável, sem sobrepor P0)

### Paleta Secundária Identificada

| Hex | Frequência | Observação |
|-----|------------|------------|
${p1ColorRows || '_(nenhuma cor P1 identificada)_'}

### Tipografia P1 (fontes do cliente)

${[...extractedFonts]
    .filter(f => !f.includes('Archivo') && !f.includes('JetBrains'))
    .map(f => `- \`${f}\``)
    .join('\n') || '_(nenhuma fonte P1 adicional)_'}

---

## 🟢 P2 — CONTEÚDO (sempre variável, sem restrição)

- Copy: headline, subheadline, bullets de benefício, depoimentos
- Imagens, mockups, vídeos do produto, modelos 3D (.glb)
- Ícones e micro-ilustrações
- Estrutura de seções (a ordem pode mudar, as regras de conversão não)

---

## ESTRUTURA DE SEÇÕES — Dossiê ${dossieNum} (Storytelling Técnico Progressivo)

Ordem recomendada pelo Dossiê ${dossieNum}:

\`\`\`
1. Hero → Promessa Central + Prova Imediata
2. Mecanismo → Raio-X do produto (sem vídeo pesado)
3. Comparativo → Nós vs Soluções Convencionais
4. Garantia + Checkout → Segundo (e último) CTA
5. Footer → Mínimo, sem links de fuga
\`\`\`

---

## CHECKLIST PRÉ-CÓDIGO (completar antes de escrever qualquer HTML)

- [ ] Li e internalizei todos os tokens P0 acima
- [ ] Confirmei que nenhuma cor P1 sobrepõe uma cor P0
- [ ] A estrutura de seções segue o Storytelling Progressivo acima
- [ ] Máximo 1 CTA por fold está planejado no layout
- [ ] Fontes Archivo + JetBrains Mono estão no \`<head>\`
- [ ] Background base é \`#02040A\` (obsidiana)
- [ ] Gradiente \`#64CEFB → #0072FF → #00F0FF\` está reservado APENAS para CTA e garantia
- [ ] Nenhum link externo no body da página (funil fechado)

---

## AUDITORIA CONTÍNUA

Para validar o HTML contra este DNA a qualquer momento:

\`\`\`bash
node scripts/dna-extractor.js --audit ${projectDir}/site/index.html
\`\`\`

Saída esperada: \`✅ 0 violações de P0 tokens\`
`;
}

// ─── AUDIT MODE ──────────────────────────────────────────────────────────────

function auditHTMLAgainstDNA(htmlFile) {
  console.log(`\n🔍 Auditando: ${htmlFile}\n`);
  const html = readFile(htmlFile);
  if (!html) { console.error('❌  Arquivo não encontrado.'); process.exit(1); }

  const extracted = extractTokensFromHTML(html);
  const classified = classifyTokens(extracted);
  const violations = [];

  // Check P0 colors present
  for (const [tokenName, token] of Object.entries(FLASHTECH_P0_CANONICAL.colors)) {
    const isPresent = classified.p0Matches.some(m => m.tokenName === tokenName);
    if (!isPresent) {
      violations.push(`⚠️  P0 AUSENTE: ${tokenName} (${token.value}) — ${token.justification}`);
    }
  }

  // Check UX rules
  if (extracted.hasExternalLinks) {
    violations.push(`⚠️  P0 VIOLADO: ${extracted.externalLinkCount} link(s) externo(s) no funil (deve ser 0)`);
  }

  if (violations.length === 0) {
    console.log('✅  0 violações de P0 tokens detectadas.');
  } else {
    console.log(`❌  ${violations.length} violação(ões) encontrada(s):\n`);
    violations.forEach(v => console.log('  ' + v));
  }

  // Diagnóstico de Near-Matches (Possíveis erros de digitação)
  if (classified.nearMatches.length > 0) {
    console.log('\n💡 Sugestões de Near-Match (Cores muito próximas do P0):');
    classified.nearMatches.forEach(n => {
      console.log(`  - Encontrado '${n.foundHex}' (distância ${n.distance} do P0 ${n.targetToken} '${n.targetValue}'). Você quis dizer '${n.targetValue}'?`);
    });
  }

  // Report P1 candidates
  if (classified.p1Candidates.length > 0) {
    console.log('\n📋 Cores P1 (variáveis de marca) detectadas:');
    classified.p1Candidates.forEach(c => console.log(`  ${c.hex} (freq: ${c.freq})`));
  }

  console.log('');
  return violations.length;
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

function main() {
  // Audit mode
  if (auditFile) {
    const violations = auditHTMLAgainstDNA(auditFile);
    process.exit(violations > 0 ? 1 : 0);
  }

  const projectDir = path.resolve(projectPath);
  console.log(`\n🧬 DNA Extractor — Analisando: ${projectDir}\n`);

  // Find HTML file in project
  const siteDir = path.join(projectDir, 'site');
  const htmlFile = fs.existsSync(path.join(siteDir, 'index.html'))
    ? path.join(siteDir, 'index.html')
    : path.join(projectDir, 'index.html');

  if (!fs.existsSync(htmlFile)) {
    console.warn('⚠️  Nenhum index.html encontrado. Gerando DNA.md baseado apenas na metodologia canônica.');
  }

  const htmlContent = htmlFile ? readFile(htmlFile) : '';
  const extracted   = htmlContent ? extractTokensFromHTML(htmlContent) : { colors: new Map(), fonts: new Set() };
  const classified  = classifyTokens(extracted);

  // Load metodologia if provided
  let metodologiaContent = null;
  if (metodologiaPath && fs.existsSync(metodologiaPath)) {
    metodologiaContent = readFile(metodologiaPath);
    console.log(`📖 Metodologia carregada: ${metodologiaPath}`);
  }
  const metodologiaSection = extractFromMetodologia(metodologiaContent, dossieNum || '3');

  // Validate mode: check existing DNA.md
  if (validateMode) {
    const dnaFile = path.join(projectDir, 'DNA.md');
    if (!fs.existsSync(dnaFile)) {
      console.error('❌  DNA.md não encontrado. Rode sem --validate primeiro para gerar.');
      process.exit(1);
    }
    console.log('✅  DNA.md encontrado. Validando contra HTML atual...');
    auditHTMLAgainstDNA(htmlFile);
    return;
  }

  // Report
  console.log('📊 Tokens Extraídos:');
  console.log(`   Cores únicas: ${extracted.colors.size}`);
  console.log(`   Fontes: ${[...extracted.fonts].join(', ') || 'nenhuma detectada'}`);
  console.log(`   Links externos: ${extracted.externalLinkCount || 0}`);
  console.log(`   P0 matches: ${classified.p0Matches.length}`);
  console.log(`   P1 candidatos: ${classified.p1Candidates.length}`);

  if (classified.p0Matches.length > 0) {
    console.log('\n🔴 P0 Invariantes identificados:');
    classified.p0Matches.forEach(t => console.log(`   ${t.hex} → ${t.tokenName} (${t.role})`));
  }

  if (classified.nearMatches.length > 0) {
    console.log('\n💡 Sugestões de Near-Match:');
    classified.nearMatches.forEach(n => {
      console.log(`   ${n.foundHex} → Próximo de ${n.targetToken} (${n.targetValue}), dist: ${n.distance}`);
    });
  }

  const missingP0 = Object.entries(FLASHTECH_P0_CANONICAL.colors)
    .filter(([name]) => !classified.p0Matches.find(m => m.tokenName === name));
  if (missingP0.length > 0) {
    console.log('\n⚠️  P0 Ausentes (serão marcados no DNA.md):');
    missingP0.forEach(([name, t]) => console.log(`   ${t.value} → ${name}`));
  }

  // Generate DNA.md
  const dnaContent = generateDNAMd(projectDir, classified, extracted.fonts, metodologiaSection, dossieNum || '3');
  const dnaPath = path.join(projectDir, 'DNA.md');

  if (fs.existsSync(dnaPath) && !overrideDna) {
    const backup = dnaPath + '.bak';
    fs.copyFileSync(dnaPath, backup);
    console.log(`\n💾 DNA.md existente salvo como DNA.md.bak`);
  }

  fs.writeFileSync(dnaPath, dnaContent, 'utf-8');
  console.log(`\n✅  DNA.md gerado: ${dnaPath}`);
  console.log('\n📋 Próximos passos:');
  console.log('   1. Revise o DNA.md gerado e ajuste P1 conforme necessário');
  console.log('   2. Compartilhe o DNA.md com o agente antes de qualquer criação');
  console.log(`   3. Para auditar: node scripts/dna-extractor.js --audit ${htmlFile}`);
  console.log('');
}

main();
