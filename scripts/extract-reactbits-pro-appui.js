#!/usr/bin/env node
/**
 * scripts/extract-reactbits-pro-appui.js
 *
 * Studio DNA Engine v3.0 — React Bits Pro Application UI Mass Scraper & Decompiler
 *
 * Extracts public live-rendered UI block previews from https://pro.reactbits.dev/docs/app-ui,
 * resolves runtime-obfuscated atomic CSS rules (.rb* / .rbp-*), theme variables (--rb-*),
 * DOM anatomy, interactive primitives, and JEV 2.0 kinetic contracts without bypassing paywalls.
 *
 * Outputs to: reactbitspremium-appui/
 *   - theme/app-ui-theme.css
 *   - theme/theming-docs.json
 *   - <category>/<slug>/{capsule.html, component.css, decompiled-spec.json, README.md}
 *   - CATALOG.json
 *   - INDEX.md
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');
const { classifyKineticContract } = require('../src/motion/jev-classifier');

const BASE_URL = 'https://pro.reactbits.dev';
const APP_UI_ROOT = `${BASE_URL}/docs/app-ui`;
const THEMING_URL = `${APP_UI_ROOT}/theming`;
const OUTPUT_DIR = path.resolve(__dirname, '../reactbitspremium-appui');
const CONCURRENCY = 4;

const CANONICAL_CATEGORIES = [
  { slug: 'ai-chat', title: 'AI Chat', domain: 'AI & Agent Surfaces', expected: 9 },
  { slug: 'prompt-input', title: 'Prompt Input', domain: 'AI & Agent Surfaces', expected: 7 },
  { slug: 'agent-activity', title: 'Agent Activity', domain: 'AI & Agent Surfaces', expected: 7 },
  { slug: 'tool-calls', title: 'Tool Calls', domain: 'AI & Agent Surfaces', expected: 6 },
  { slug: 'agent-approval', title: 'Agent Approval', domain: 'AI & Agent Surfaces', expected: 6 },
  { slug: 'agent-plan', title: 'Agent Plan', domain: 'AI & Agent Surfaces', expected: 6 },
  { slug: 'ai-usage', title: 'AI Usage', domain: 'AI & Agent Surfaces', expected: 8 },
  { slug: 'app-shell', title: 'App Shell', domain: 'App Chrome & Navigation', expected: 9 },
  { slug: 'app-sidebar', title: 'App Sidebar', domain: 'App Chrome & Navigation', expected: 7 },
  { slug: 'command-menu', title: 'Command Menu', domain: 'App Chrome & Navigation', expected: 6 },
  { slug: 'navbar', title: 'Navbar', domain: 'App Chrome & Navigation', expected: 14 },
  { slug: 'mobile', title: 'Mobile', domain: 'App Chrome & Navigation', expected: 5 },
  { slug: 'card', title: 'Cards', domain: 'Data, Dashboards & Monitoring', expected: 11 },
  { slug: 'data-table', title: 'Data Table', domain: 'Data, Dashboards & Monitoring', expected: 8 },
  { slug: 'dashboard', title: 'Dashboard', domain: 'Data, Dashboards & Monitoring', expected: 14 },
  { slug: 'analytics', title: 'Analytics', domain: 'Data, Dashboards & Monitoring', expected: 16 },
  { slug: 'list', title: 'List', domain: 'Data, Dashboards & Monitoring', expected: 12 },
  { slug: 'filtering', title: 'Filtering', domain: 'Data, Dashboards & Monitoring', expected: 9 },
  { slug: 'file-manager', title: 'File Manager', domain: 'Data, Dashboards & Monitoring', expected: 4 },
  { slug: 'monitoring', title: 'Monitoring', domain: 'Data, Dashboards & Monitoring', expected: 10 },
  { slug: 'empty-state', title: 'Empty State', domain: 'Forms, Modals, Auth & Workflows', expected: 5 },
  { slug: 'settings-form', title: 'Settings Form', domain: 'Forms, Modals, Auth & Workflows', expected: 6 },
  { slug: 'forms', title: 'Forms', domain: 'Forms, Modals, Auth & Workflows', expected: 12 },
  { slug: 'app-dialog', title: 'App Dialog', domain: 'Forms, Modals, Auth & Workflows', expected: 7 },
  { slug: 'notifications', title: 'Notifications', domain: 'Forms, Modals, Auth & Workflows', expected: 6 },
  { slug: 'onboarding', title: 'Onboarding', domain: 'Forms, Modals, Auth & Workflows', expected: 7 },
  { slug: 'paywall', title: 'Paywall', domain: 'Forms, Modals, Auth & Workflows', expected: 7 },
  { slug: 'authentication', title: 'Authentication', domain: 'Forms, Modals, Auth & Workflows', expected: 14 },
  { slug: 'kanban', title: 'Kanban', domain: 'Forms, Modals, Auth & Workflows', expected: 6 },
  { slug: 'wizard', title: 'Wizard', domain: 'Forms, Modals, Auth & Workflows', expected: 7 },
  { slug: 'billing', title: 'Billing', domain: 'Forms, Modals, Auth & Workflows', expected: 8 },
  { slug: 'comments', title: 'Comments', domain: 'Collaboration, Content & Support', expected: 6 },
  { slug: 'scheduling', title: 'Scheduling', domain: 'Collaboration, Content & Support', expected: 7 },
  { slug: 'integrations', title: 'Integrations', domain: 'Collaboration, Content & Support', expected: 6 },
  { slug: 'editor', title: 'Editor', domain: 'Collaboration, Content & Support', expected: 5 },
  { slug: 'feedback', title: 'Feedback', domain: 'Collaboration, Content & Support', expected: 6 },
  { slug: 'support', title: 'Support', domain: 'Collaboration, Content & Support', expected: 5 },
  { slug: 'chat', title: 'Chat', domain: 'Collaboration, Content & Support', expected: 6 }
];

function parseArgs(argv = process.argv.slice(2)) {
  const opts = { categories: null, concurrency: CONCURRENCY };
  for (const arg of argv) {
    if (arg.startsWith('--categories=')) {
      opts.categories = arg
        .slice('--categories='.length)
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
    } else if (arg.startsWith('--concurrency=')) {
      const n = parseInt(arg.slice('--concurrency='.length), 10);
      if (Number.isFinite(n) && n >= 1 && n <= 8) opts.concurrency = n;
    }
  }
  return opts;
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Checks whether a navigation response or page content hit an access block or anti-bot gate.
 */
async function assertNotBlocked(page, response, url) {
  if (response) {
    const status = response.status();
    if (status === 403 || status === 429) {
      throw new Error(`ACCESS_BLOCKED: HTTP ${status} received for ${url}`);
    }
  }
  const blockedReason = await page.evaluate(() => {
    const title = (document.title || '').toLowerCase();
    const text = (document.body?.innerText || '').slice(0, 1500).toLowerCase();
    if (
      title.includes('just a moment') ||
      title.includes('attention required') ||
      text.includes('verify you are human') ||
      text.includes('cf-turnstile') ||
      document.querySelector('iframe[src*="challenges.cloudflare.com"], .g-recaptcha, .h-captcha')
    ) {
      return 'CAPTCHA or anti-bot verification challenge detected';
    }
    return null;
  });
  if (blockedReason) {
    throw new Error(`ACCESS_BLOCKED: ${blockedReason} at ${url}`);
  }
}

/**
 * Discovers categories dynamically from /docs/app-ui and merges with CANONICAL_CATEGORIES.
 */
async function discoverCategories(page) {
  const res = await page.goto(APP_UI_ROOT, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await assertNotBlocked(page, res, APP_UI_ROOT);
  await page.waitForTimeout(1800);

  const discovered = await page.evaluate(() => {
    const map = new Map();
    const links = Array.from(document.querySelectorAll('a[href^="/docs/app-ui/"]'));
    for (const a of links) {
      const rawHref = a.getAttribute('href') || '';
      const cleanPath = rawHref.split('?')[0].split('#')[0];
      const parts = cleanPath.split('/').filter(Boolean);
      // Expect ['docs', 'app-ui', '<category>']
      if (parts.length !== 3) continue;
      const slug = parts[2];
      if (slug === 'theming') continue;
      const text = (a.innerText || '').trim();
      const lines = text.split('\n').map(s => s.trim()).filter(Boolean);
      if (!map.has(slug)) {
        map.set(slug, { slug, title: lines[0] || slug });
      }
    }
    return Array.from(map.values());
  });

  const canonicalMap = new Map(CANONICAL_CATEGORIES.map(c => [c.slug, { ...c }]));
  for (const item of discovered) {
    if (!canonicalMap.has(item.slug)) {
      canonicalMap.set(item.slug, {
        slug: item.slug,
        title: item.title,
        domain: 'Additional Category',
        expected: null
      });
    }
  }
  return Array.from(canonicalMap.values());
}

/**
 * Extracts theming documentation and base CSS layers from /docs/app-ui/theming.
 */
async function extractThemeSystem(page, themeDir) {
  ensureDir(themeDir);
  const res = await page.goto(THEMING_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await assertNotBlocked(page, res, THEMING_URL);
  await page.waitForTimeout(2000);

  const themeData = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const text = (main?.innerText || '').trim();
    const codeBlocks = Array.from(main.querySelectorAll('pre code, pre')).map(el => el.innerText.trim());
    const uniqueCodeBlocks = Array.from(new Set(codeBlocks)).filter(t => t.length > 0);

    const baseBlocks = [];
    const keyframeBlocks = [];
    const propertyBlocks = [];
    const themeScopeBlocks = [];
    const rbpBlocks = [];

    for (const sheet of Array.from(document.styleSheets)) {
      let rules;
      try {
        rules = Array.from(sheet.cssRules || []);
      } catch {
        continue;
      }
      for (const r of rules) {
        const txt = r.cssText || '';
        if (txt.startsWith('@layer properties') || txt.startsWith('@layer theme') || txt.startsWith('@layer base')) {
          baseBlocks.push(txt);
        } else if (r.type === 7 || txt.startsWith('@keyframes')) {
          keyframeBlocks.push(txt);
        } else if (txt.startsWith('@property')) {
          propertyBlocks.push(txt);
        } else if (
          r.type === 1 &&
          /(:root|\.dark|rb-theme-scope|block-scale-preview)/.test(r.selectorText || '')
        ) {
          themeScopeBlocks.push(txt);
        } else if (r.type === 1 && /\.rbp-/.test(r.selectorText || '')) {
          rbpBlocks.push(txt);
        }
      }
    }

    return {
      url: location.href,
      title: document.title,
      docText: text,
      codeBlocks: uniqueCodeBlocks,
      css: {
        baseBlocks: Array.from(new Set(baseBlocks)),
        propertyBlocks: Array.from(new Set(propertyBlocks)),
        themeScopeBlocks: Array.from(new Set(themeScopeBlocks)),
        rbpBlocks: Array.from(new Set(rbpBlocks)),
        keyframeBlocks: Array.from(new Set(keyframeBlocks))
      }
    };
  });

  const themeCssParts = [
    '/* React Bits Pro Application UI — Extracted Theme & Base Layers */',
    '/* Source: https://pro.reactbits.dev/docs/app-ui/theming */',
    '',
    '/* --- @property declarations --- */',
    ...themeData.css.propertyBlocks,
    '',
    '/* --- Base Tailwind v4 Layers (properties, theme, base) --- */',
    ...themeData.css.baseBlocks,
    '',
    '/* --- Theme Scope & Radius Ladder (:root, .dark, .rb-theme-scope) --- */',
    ...themeData.css.themeScopeBlocks,
    '',
    '/* --- Scoped Primitives (.rbp-*) --- */',
    ...themeData.css.rbpBlocks,
    '',
    '/* --- Global Keyframes --- */',
    ...themeData.css.keyframeBlocks,
    ''
  ];

  fs.writeFileSync(path.join(themeDir, 'app-ui-theme.css'), themeCssParts.join('\n'), 'utf8');
  fs.writeFileSync(
    path.join(themeDir, 'theming-docs.json'),
    JSON.stringify(
      {
        extractedAt: new Date().toISOString(),
        url: themeData.url,
        title: themeData.title,
        docText: themeData.docText,
        codeBlocks: themeData.codeBlocks
      },
      null,
      2
    ),
    'utf8'
  );

  return themeData;
}

/**
 * Formats CSS rules grouped by their at-rule context (@layer, @media, @supports).
 */
function formatDecompiledCss(matchedRules, keyframesList) {
  const groups = new Map();
  const seen = new Set();

  for (const rule of matchedRules) {
    const ctxKey = (rule.ctx || []).join(' || ');
    const dedupKey = `${ctxKey}::${rule.cssText}`;
    if (seen.has(dedupKey)) continue;
    seen.add(dedupKey);
    if (!groups.has(ctxKey)) {
      groups.set(ctxKey, { ctx: rule.ctx || [], rules: [] });
    }
    groups.get(ctxKey).rules.push(rule.cssText);
  }

  const out = [];
  for (const group of groups.values()) {
    const body = group.rules.join('\n');
    if (group.ctx.length === 0) {
      out.push(body);
    } else {
      let wrapped = body;
      for (let i = group.ctx.length - 1; i >= 0; i--) {
        wrapped = `${group.ctx[i]} {\n  ${wrapped.split('\n').join('\n  ')}\n}`;
      }
      out.push(wrapped);
    }
  }

  if (keyframesList.length > 0) {
    out.push('', '/* --- Component Keyframes --- */');
    const seenKf = new Set();
    for (const kf of keyframesList) {
      if (seenKf.has(kf.cssText)) continue;
      seenKf.add(kf.cssText);
      out.push(kf.cssText);
    }
  }

  return out.join('\n');
}

/**
 * Extracts CSS declarations inside `{ ... }` from a rule's cssText.
 */
function extractDeclarations(cssText) {
  const first = cssText.indexOf('{');
  const last = cssText.lastIndexOf('}');
  if (first === -1 || last === -1 || last <= first) return '';
  return cssText.slice(first + 1, last).trim();
}

/**
 * Extracts design tokens, colors, easings, and keyframe references from CSS + inline styles.
 */
function analyzeTokens(cssText, previewHtml) {
  const combined = `${cssText}\n${previewHtml}`;
  const matchUnique = (regex) => Array.from(new Set(combined.match(regex) || [])).sort();

  const allVars = matchUnique(/--[a-zA-Z0-9_-]+/g);
  return {
    rbVars: allVars.filter(v => v.startsWith('--rb-')),
    scVars: allVars.filter(v => v.startsWith('--sc-')),
    colorVars: allVars.filter(v => v.startsWith('--color-')),
    twVars: allVars.filter(v => v.startsWith('--tw-')),
    otherVars: allVars.filter(
      v => !v.startsWith('--rb-') && !v.startsWith('--sc-') && !v.startsWith('--color-') && !v.startsWith('--tw-')
    ),
    oklchColors: matchUnique(/oklch\([^)]+\)/g),
    cubicBeziers: matchUnique(/cubic-bezier\([^)]+\)/g),
    durations: matchUnique(/\b\d+(?:\.\d+)?m?s\b/g)
  };
}

/**
 * Computes JEV 2.0 motion contract safely, normalizing ms durations if needed.
 */
function computeMotionContract(slug, cssText, previewHtml) {
  // jev-classifier matches /(\d+(?:\.\d+)?)s/; pass clean transition/animation lines first if present
  const motionLines = cssText
    .split('\n')
    .filter(line => /transition|animation|cubic-bezier|transform|keyframes/i.test(line))
    .join('\n');

  let contract = null;
  try {
    contract = classifyKineticContract({
      styles: motionLines || cssText,
      domHtml: previewHtml,
      capsuleSlug: slug
    });
  } catch (err) {
    contract = { error: err.message };
  }
  return contract;
}

/**
 * Builds standalone capsule.html for a component.
 */
function buildCapsuleHtml(comp, motionContract) {
  const innerClasses = (comp.previewClasses || [])
    .filter(Boolean)
    .join(' ');
  const reducedMotionRule =
    motionContract?.fsmContract?.reducedMotionRule ||
    `@media (prefers-reduced-motion: reduce) {\n  [data-capsule-id="${comp.slug}"] * {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(comp.slug)} — ${escapeHtml(comp.categoryTitle)} | React Bits Pro App UI Capsule</title>
  <link rel="stylesheet" href="../../theme/app-ui-theme.css" />
  <link rel="stylesheet" href="./component.css" />
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: var(--color-neutral-100, #f5f5f5);
      color: var(--color-neutral-900, #171717);
      font-family: var(--font-sans, ui-sans-serif, system-ui, sans-serif);
    }
    .capsule-stage {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      overflow: auto;
    }
    dna-capsule {
      display: block;
      width: ${escapeHtml(comp.nativeWidth)};
      min-height: ${escapeHtml(comp.nativeHeight)};
      background: var(--color-white, #ffffff);
      border-radius: var(--rb-r-xl, 12px);
      overflow: hidden;
      box-shadow: 0 10px 30px -12px rgb(0 0 0 / 0.12);
    }
    .capsule-viewport-root {
      width: ${escapeHtml(comp.nativeWidth)};
      min-height: ${escapeHtml(comp.nativeHeight)};
      position: relative;
    }
    ${reducedMotionRule}
  </style>
</head>
<body>
  <div class="capsule-stage">
    <dna-capsule data-capsule-id="${escapeHtml(comp.slug)}" data-category="${escapeHtml(comp.category)}" class="rb-theme-scope">
      <div class="${escapeHtml(innerClasses)} capsule-viewport-root" style="width: ${escapeHtml(comp.nativeWidth)}; min-height: ${escapeHtml(comp.nativeHeight)};">
        ${comp.previewHtml}
      </div>
    </dna-capsule>
  </div>
</body>
</html>
`;
}

/**
 * Builds component README.md summarizing decompiled classes, anatomy, tokens, and motion.
 */
function buildComponentReadme(spec) {
  const { anatomy, tokensUsed, decompiledClasses, motionContract } = spec;
  const classEntries = Object.entries(decompiledClasses).slice(0, 80);
  const tax = motionContract?.taxonomy || {};

  return `# ${spec.slug}

> **Category:** ${spec.categoryTitle} (\`${spec.category}\`)  
> **Domain:** ${spec.domain}  
> **Source:** [${spec.sourceUrl}](${spec.sourceUrl})  
> **Native Viewport:** \`${spec.nativeDimensions.width} × ${spec.nativeDimensions.height}\`

${spec.description || '_No description provided._'}

---

## 1. Structural & Interactive Anatomy

| Metric | Observed Value |
| :--- | :--- |
| **DOM Elements** | ${anatomy.nodeCount} |
| **Max DOM Depth** | ${anatomy.maxDepth} |
| **Atomic/Scoped Classes** | ${spec.usedClassCount} |
| **Buttons** | ${anatomy.interactive.buttons} |
| **Inputs / Textareas / Selects** | ${anatomy.interactive.inputs} / ${anatomy.interactive.textareas} / ${anatomy.interactive.selects} |
| **Tables / Dialogs / Links** | ${anatomy.interactive.tables} / ${anatomy.interactive.dialogs} / ${anatomy.interactive.links} |
| **SVGs / Canvases** | ${anatomy.interactive.svgs} / ${anatomy.interactive.canvases} |
| **ARIA Roles** | ${anatomy.interactive.roles.length ? anatomy.interactive.roles.map(r => `\`${r}\``).join(', ') : 'None'} |

### Visible Headings & Interactive Labels
${anatomy.headingsAndLabels.length ? anatomy.headingsAndLabels.slice(0, 25).map(t => `- \`${t.replace(/`/g, "'")}\``).join('\n') : '- _None captured_'}

---

## 2. Design Tokens & Motion Contract (JEV 2.0)

- **\`--rb-*\` Theme Tokens:** ${tokensUsed.rbVars.length ? tokensUsed.rbVars.map(v => `\`${v}\``).join(', ') : 'Uses inherited theme defaults'}
- **\`--sc-*\` Scoped Tokens:** ${tokensUsed.scVars.length ? tokensUsed.scVars.map(v => `\`${v}\``).join(', ') : 'None'}
- **Easing Curves:** ${tokensUsed.cubicBeziers.length ? tokensUsed.cubicBeziers.map(c => `\`${c}\``).join(', ') : 'Standard CSS / Inherited'}
- **JEV 2.0 Classification:** Archetype \`${tax.archetype || 'n/a'}\` | Trigger \`${tax.trigger || 'n/a'}\` | Regime \`${tax.physicalRegime || 'n/a'}\`

---

## 3. Decompiled CSS Classes (Sample ${classEntries.length} of ${Object.keys(decompiledClasses).length})

| Class | Context | Declarations |
| :--- | :--- | :--- |
${classEntries
  .map(([cls, rules]) => {
    const first = rules[0] || {};
    const ctxStr = first.context?.length ? first.context.join(' › ') : 'base';
    const decl = (first.declarations || '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').slice(0, 140);
    return `| \`${cls}\` | \`${ctxStr}\` | \`${decl}\` |`;
  })
  .join('\n')}
`;
}

/**
 * Scrapes a single category page: mounts every virtualized preview via scrollIntoView,
 * captures its DOM + anatomy, and resolves all .rb* / .rbp-* rules from the same page session.
 */
async function scrapeCategory(page, category) {
  const url = `${APP_UI_ROOT}/${category.slug}`;
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 35000 });
  await assertNotBlocked(page, res, url);

  await page.waitForSelector('a[data-card-link="true"]', { timeout: 20000 });
  await page.waitForTimeout(1000);

  const pageResult = await page.evaluate(async () => {
    const links = Array.from(document.querySelectorAll('a[data-card-link="true"]'));
    const cards = [];
    const allPageClasses = new Set();

    function computeMaxDepth(root) {
      let maxD = 0;
      const stack = [{ el: root, d: 0 }];
      while (stack.length > 0) {
        const { el, d } = stack.pop();
        if (d > maxD) maxD = d;
        const children = el.children;
        for (let i = 0; i < children.length; i++) {
          stack.push({ el: children[i], d: d + 1 });
        }
      }
      return maxD;
    }

    for (const a of links) {
      const card = a.closest('.group') || a.closest('div.rounded-xl') || a.parentElement?.parentElement?.parentElement;
      if (!card) continue;

      card.scrollIntoView({ block: 'center' });

      let preview = null;
      const deadline = Date.now() + 3000;
      while (Date.now() < deadline) {
        preview = card.querySelector('.block-scale-preview');
        if (preview && preview.innerHTML && preview.innerHTML.length > 100) {
          break;
        }
        await new Promise(r => setTimeout(r, 120));
      }

      const slug = (a.innerText || '').trim();
      const href = a.getAttribute('href') || '';
      const descEl = card.querySelector('div.p-3 > p') || card.querySelector('p');
      const description = descEl ? descEl.innerText.trim() : '';

      if (!preview || !preview.innerHTML || preview.innerHTML.length <= 50) {
        cards.push({ slug, href, description, mounted: false });
        continue;
      }

      const nativeWidth = preview.style.width || '1280px';
      const nativeHeight = preview.style.height || '720px';
      const previewClasses = Array.from(preview.classList || []);

      const elements = [preview, ...preview.querySelectorAll('*')];
      const usedSet = new Set();
      for (const el of elements) {
        for (const cls of Array.from(el.classList || [])) {
          usedSet.add(cls);
          allPageClasses.add(cls);
        }
      }

      const rootChild = preview.firstElementChild || preview;
      const cs = getComputedStyle(rootChild);
      const computedSample = {
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        borderRadius: cs.borderRadius,
        display: cs.display,
        gridTemplateColumns: cs.gridTemplateColumns,
        flexDirection: cs.flexDirection,
        gap: cs.gap,
        padding: cs.padding
      };

      const roles = Array.from(
        new Set(
          Array.from(preview.querySelectorAll('[role]'))
            .map(el => el.getAttribute('role'))
            .filter(Boolean)
        )
      );
      const ariaLabels = Array.from(
        new Set(
          Array.from(preview.querySelectorAll('[aria-label]'))
            .map(el => el.getAttribute('aria-label'))
            .filter(Boolean)
        )
      ).slice(0, 30);

      const dataAttributes = Array.from(
        new Set(
          elements.flatMap(el =>
            Array.from(el.attributes || [])
              .map(at => at.name)
              .filter(n => n.startsWith('data-'))
          )
        )
      ).slice(0, 30);

      const inputTypes = Array.from(
        new Set(
          Array.from(preview.querySelectorAll('input'))
            .map(el => el.getAttribute('type') || 'text')
        )
      );
      const placeholders = Array.from(
        new Set(
          Array.from(preview.querySelectorAll('input[placeholder], textarea[placeholder]'))
            .map(el => el.getAttribute('placeholder'))
            .filter(Boolean)
        )
      ).slice(0, 15);

      const labelCandidates = Array.from(
        preview.querySelectorAll('h1, h2, h3, h4, button, label, th, [role="tab"], [data-slot]')
      )
        .map(el => (el.innerText || '').replace(/\s+/g, ' ').trim())
        .filter(t => t.length > 0 && t.length <= 90);
      const headingsAndLabels = Array.from(new Set(labelCandidates)).slice(0, 40);

      cards.push({
        slug,
        href,
        description,
        mounted: true,
        nativeWidth,
        nativeHeight,
        previewClasses,
        previewHtml: preview.innerHTML,
        usedClasses: Array.from(usedSet),
        anatomy: {
          nodeCount: elements.length - 1,
          maxDepth: computeMaxDepth(preview),
          interactive: {
            buttons: preview.querySelectorAll('button, [role="button"]').length,
            inputs: preview.querySelectorAll('input').length,
            textareas: preview.querySelectorAll('textarea').length,
            selects: preview.querySelectorAll('select, [role="combobox"], [role="listbox"]').length,
            checkboxesOrRadios: preview.querySelectorAll('input[type="checkbox"], input[type="radio"], [role="checkbox"], [role="radio"], [role="switch"]').length,
            dialogs: preview.querySelectorAll('dialog, [role="dialog"], [role="alertdialog"]').length,
            tables: preview.querySelectorAll('table, [role="table"], [role="grid"]').length,
            svgs: preview.querySelectorAll('svg').length,
            canvases: preview.querySelectorAll('canvas').length,
            links: preview.querySelectorAll('a[href]').length,
            roles,
            ariaLabels,
            dataAttributes,
            inputTypes,
            placeholders
          },
          headingsAndLabels,
          computedSample
        }
      });
    }

    // Collect all style rules and keyframes from THIS page's stylesheets
    const classRuleIndex = {};
    const keyframesByName = {};

    function unescapeCssClass(raw) {
      return raw.replace(/\\(.)/g, '$1');
    }

    function extractSubjectClasses(selectorText) {
      if (!selectorText) return [];
      // Strip pseudo-class arguments like :is(...), :where(...), :not(...), :has(...) so parent modifiers don't pollute class keys
      let cleaned = '';
      let depth = 0;
      for (let i = 0; i < selectorText.length; i++) {
        const ch = selectorText[i];
        if (ch === '(') {
          depth++;
        } else if (ch === ')') {
          if (depth > 0) depth--;
        } else if (depth === 0) {
          cleaned += ch;
        }
      }
      const matches = cleaned.match(/\.((?:[a-zA-Z0-9_-]|\\.)+)/g) || [];
      return matches.map(m => unescapeCssClass(m.slice(1)));
    }

    function walkRules(rules, ctx = []) {
      for (const r of Array.from(rules || [])) {
        if (r.type === 1) {
          const sel = r.selectorText || '';
          const subjects = extractSubjectClasses(sel);
          let matchedAny = false;
          for (const cls of subjects) {
            if (allPageClasses.has(cls)) {
              if (!classRuleIndex[cls]) classRuleIndex[cls] = [];
              classRuleIndex[cls].push({ ctx: ctx.slice(), cssText: r.cssText });
              matchedAny = true;
            }
          }
          // Fallback for :is(.rbp-...) or nested pseudo selectors where class is inside :where(...)
          if (!matchedAny && /\.rbp-/.test(sel)) {
            const inner = sel.match(/\.rbp-[a-zA-Z0-9_-]+/g) || [];
            for (const m of inner) {
              const cls = m.slice(1);
              if (allPageClasses.has(cls)) {
                if (!classRuleIndex[cls]) classRuleIndex[cls] = [];
                classRuleIndex[cls].push({ ctx: ctx.slice(), cssText: r.cssText });
              }
            }
          }
        } else if (r.type === 7) {
          keyframesByName[r.name] = r.cssText;
        } else if (r.cssRules) {
          const braceIdx = r.cssText.indexOf('{');
          const hdr = braceIdx > 0 ? r.cssText.slice(0, braceIdx).trim() : '';
          walkRules(r.cssRules, hdr ? [...ctx, hdr] : ctx);
        }
      }
    }

    for (const sheet of Array.from(document.styleSheets)) {
      try {
        walkRules(sheet.cssRules);
      } catch {
        // Ignore cross-origin sheets if any
      }
    }

    return {
      categoryTitle: document.querySelector('h1')?.innerText?.trim() || '',
      cards,
      classRuleIndex,
      keyframesByName
    };
  });

  return pageResult;
}

/**
 * Processes scraped cards for one category, generating all 4 files per component.
 */
function writeCategoryArtifacts(category, pageResult) {
  const categoryTitle = pageResult.categoryTitle || category.title;
  const { cards, classRuleIndex, keyframesByName } = pageResult;
  const extractedCards = [];

  for (const card of cards) {
    if (!card.mounted) {
      extractedCards.push({
        slug: card.slug,
        category: category.slug,
        categoryTitle,
        domain: category.domain,
        mounted: false,
        description: card.description
      });
      continue;
    }

    const compDir = path.join(OUTPUT_DIR, category.slug, card.slug);
    ensureDir(compDir);

    const matchedRules = [];
    const decompiledClasses = {};

    for (const cls of card.usedClasses.slice().sort()) {
      const entries = classRuleIndex[cls] || [];
      const seenCls = new Set();
      const normalizedEntries = [];
      for (const e of entries) {
        const key = `${(e.ctx || []).join('|')}::${e.cssText}`;
        if (seenCls.has(key)) continue;
        seenCls.add(key);
        matchedRules.push(e);
        normalizedEntries.push({
          context: e.ctx || [],
          declarations: extractDeclarations(e.cssText),
          cssText: e.cssText
        });
      }
      if (normalizedEntries.length > 0) {
        decompiledClasses[cls] = normalizedEntries;
      }
    }

    // Resolve referenced keyframes
    const joinedCssProbe = matchedRules.map(r => r.cssText).join('\n');
    const referencedKeyframes = [];
    for (const [kfName, kfCss] of Object.entries(keyframesByName)) {
      const kfRegex = new RegExp(`\\b${kfName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
      if (kfRegex.test(joinedCssProbe)) {
        referencedKeyframes.push({ name: kfName, cssText: kfCss });
      }
    }

    const componentCss = formatDecompiledCss(matchedRules, referencedKeyframes);
    const tokensUsed = analyzeTokens(componentCss, card.previewHtml);
    const motionContract = computeMotionContract(card.slug, componentCss, card.previewHtml);

    const spec = {
      schemaVersion: '1.0.0',
      slug: card.slug,
      category: category.slug,
      categoryTitle,
      domain: category.domain,
      description: card.description,
      sourceUrl: `${BASE_URL}${card.href.split('?')[0]}`,
      nativeDimensions: {
        width: card.nativeWidth,
        height: card.nativeHeight
      },
      usedClassCount: card.usedClasses.length,
      decompiledClassCount: Object.keys(decompiledClasses).length,
      anatomy: card.anatomy,
      tokensUsed,
      keyframes: referencedKeyframes.map(k => k.name),
      decompiledClasses,
      motionContract: motionContract.motionContract || motionContract
    };

    const compPayload = {
      ...card,
      category: category.slug,
      categoryTitle
    };
    const capsuleHtml = buildCapsuleHtml(compPayload, motionContract);
    const readmeMd = buildComponentReadme(spec);

    fs.writeFileSync(path.join(compDir, 'capsule.html'), capsuleHtml, 'utf8');
    fs.writeFileSync(path.join(compDir, 'component.css'), componentCss, 'utf8');
    fs.writeFileSync(path.join(compDir, 'decompiled-spec.json'), JSON.stringify(spec, null, 2), 'utf8');
    fs.writeFileSync(path.join(compDir, 'README.md'), readmeMd, 'utf8');

    extractedCards.push({
      slug: card.slug,
      category: category.slug,
      categoryTitle,
      domain: category.domain,
      mounted: true,
      description: card.description,
      sourceUrl: spec.sourceUrl,
      nativeDimensions: spec.nativeDimensions,
      usedClassCount: spec.usedClassCount,
      decompiledClassCount: spec.decompiledClassCount,
      anatomySummary: {
        nodeCount: card.anatomy.nodeCount,
        maxDepth: card.anatomy.maxDepth,
        buttons: card.anatomy.interactive.buttons,
        inputs: card.anatomy.interactive.inputs,
        tables: card.anatomy.interactive.tables,
        svgs: card.anatomy.interactive.svgs,
        canvases: card.anatomy.interactive.canvases,
        roles: card.anatomy.interactive.roles,
        headingsAndLabels: card.anatomy.headingsAndLabels.slice(0, 12)
      },
      tokensUsed,
      keyframes: spec.keyframes,
      archetype: motionContract?.taxonomy?.archetype || null,
      trigger: motionContract?.taxonomy?.trigger || null,
      decompiledSample: Object.fromEntries(
        Object.entries(decompiledClasses)
          .slice(0, 12)
          .map(([k, v]) => [k, v.map(x => x.declarations).join('; ')])
      )
    });
  }

  return extractedCards;
}

/**
 * Generates global CATALOG.json and INDEX.md across all extracted categories and components.
 */
function writeMasterCatalogAndIndex(categories, allComponents, globalStats) {
  const catalog = {
    schemaVersion: '1.0.0',
    source: APP_UI_ROOT,
    extractedAt: new Date().toISOString(),
    totals: {
      categories: categories.length,
      totalBlocks: allComponents.length,
      mountedBlocks: allComponents.filter(c => c.mounted).length,
      failedBlocks: allComponents.filter(c => !c.mounted).length,
      uniqueDeclarationPatterns: Object.keys(globalStats.declarationHistogram).length
    },
    declarationHistogramTop100: Object.entries(globalStats.declarationHistogram)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100)
      .map(([declaration, count]) => ({ declaration, count })),
    rbTokenHistogram: Object.entries(globalStats.rbTokenHistogram)
      .sort((a, b) => b[1] - a[1])
      .map(([token, count]) => ({ token, count })),
    archetypeHistogram: Object.entries(globalStats.archetypeHistogram)
      .sort((a, b) => b[1] - a[1])
      .map(([archetype, count]) => ({ archetype, count })),
    roleHistogram: Object.entries(globalStats.roleHistogram)
      .sort((a, b) => b[1] - a[1])
      .map(([role, count]) => ({ role, count })),
    categories: categories.map(cat => ({
      slug: cat.slug,
      title: cat.title,
      domain: cat.domain,
      blockCount: allComponents.filter(c => c.category === cat.slug).length,
      mountedCount: allComponents.filter(c => c.category === cat.slug && c.mounted).length
    })),
    components: allComponents
  };

  fs.writeFileSync(path.join(OUTPUT_DIR, 'CATALOG.json'), JSON.stringify(catalog, null, 2), 'utf8');

  // Generate INDEX.md
  const lines = [
    `# React Bits Pro — Application UI Extracted Corpus`,
    ``,
    `> **Source:** [${APP_UI_ROOT}](${APP_UI_ROOT})  `,
    `> **Extracted At:** ${catalog.extractedAt}  `,
    `> **Total Categories:** ${catalog.totals.categories} | **Mounted Blocks:** ${catalog.totals.mountedBlocks}/${catalog.totals.totalBlocks}`,
    ``,
    `## Global Theme & Tokens`,
    `- [\`theme/app-ui-theme.css\`](./theme/app-ui-theme.css) — Extracted \`@layer properties\`, \`@layer theme\`, \`@layer base\`, \`--rb-*\` radius ladder, \`.rb-theme-scope\`, \`.rbp-*\`, and \`@keyframes\``,
    `- [\`theme/theming-docs.json\`](./theme/theming-docs.json) — Extracted theming guide & token formulas`,
    `- [\`CATALOG.json\`](./CATALOG.json) — Full machine-readable catalog, DOM telemetry, and CSS declaration histograms`,
    ``,
    `## Categories Summary`,
    ``,
    `| Domain | Category | Extracted | Path |`,
    `| :--- | :--- | :---: | :--- |`
  ];

  for (const cat of catalog.categories) {
    lines.push(`| ${cat.domain} | **${cat.title}** | ${cat.mountedCount}/${cat.blockCount} | [\`${cat.slug}/\`](#category-${cat.slug}) |`);
  }

  lines.push(``);

  for (const cat of catalog.categories) {
    lines.push(`<a id="category-${cat.slug}"></a>`);
    lines.push(`### ${cat.title} (\`${cat.slug}/\`) — ${cat.domain}`);
    lines.push(``);
    lines.push(`| Block | Description | DOM Nodes | Classes | Artifacts |`);
    lines.push(`| :--- | :--- | :---: | :---: | :--- |`);

    const items = allComponents.filter(c => c.category === cat.slug);
    for (const item of items) {
      if (!item.mounted) {
        lines.push(`| \`${item.slug}\` | ${item.description || '—'} | 0 | 0 | _unmounted_ |`);
        continue;
      }
      const relBase = `./${cat.slug}/${item.slug}`;
      const artifacts = [
        `[\`capsule.html\`](${relBase}/capsule.html)`,
        `[\`component.css\`](${relBase}/component.css)`,
        `[\`decompiled-spec.json\`](${relBase}/decompiled-spec.json)`,
        `[\`README.md\`](${relBase}/README.md)`
      ].join(' · ');
      const desc = (item.description || '—').replace(/\|/g, '\\|');
      lines.push(
        `| **${item.slug}** | ${desc} | ${item.anatomySummary.nodeCount} | ${item.decompiledClassCount} | ${artifacts} |`
      );
    }
    lines.push(``);
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'INDEX.md'), lines.join('\n'), 'utf8');
}

async function run() {
  const opts = parseArgs();
  ensureDir(OUTPUT_DIR);
  const themeDir = path.join(OUTPUT_DIR, 'theme');

  console.log('🚀 Studio DNA — React Bits Pro Application UI Mass Scraper & Decompiler');
  console.log(`📁 Output Directory: ${OUTPUT_DIR}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light'
  });

  try {
    const setupPage = await context.newPage();
    console.log('🔍 Discovering Application UI categories...');
    let categories = await discoverCategories(setupPage);
    if (opts.categories && opts.categories.length > 0) {
      const filterSet = new Set(opts.categories);
      categories = categories.filter(c => filterSet.has(c.slug));
    }
    console.log(`📚 Categories queued: ${categories.length}`);

    console.log('🎨 Extracting global theme & base CSS layers (/docs/app-ui/theming)...');
    await extractThemeSystem(setupPage, themeDir);
    await setupPage.close();

    // Global histograms built incrementally while avoiding storing massive raw maps
    const declarationHistogram = {};
    const rbTokenHistogram = {};
    const archetypeHistogram = {};
    const roleHistogram = {};
    const allComponents = [];

    // Worker pool with fixed concurrency
    const workerCount = Math.min(opts.concurrency, Math.max(1, categories.length));
    const queue = categories.slice();
    let processedCount = 0;

    async function worker(workerId) {
      const page = await context.newPage();
      try {
        while (queue.length > 0) {
          const cat = queue.shift();
          if (!cat) break;
          const idx = ++processedCount;
          console.log(`[Worker ${workerId}] (${idx}/${categories.length}) Scraping ${cat.slug}...`);

          const pageResult = await scrapeCategory(page, cat);

          // Update global declaration histogram from this page
          const seenPerClass = new Set();
          for (const [cls, rules] of Object.entries(pageResult.classRuleIndex)) {
            if (seenPerClass.has(cls)) continue;
            seenPerClass.add(cls);
            for (const r of rules) {
              const decl = extractDeclarations(r.cssText);
              if (decl) {
                declarationHistogram[decl] = (declarationHistogram[decl] || 0) + 1;
              }
            }
          }

          const extractedCards = writeCategoryArtifacts(cat, pageResult);
          for (const c of extractedCards) {
            allComponents.push(c);
            if (!c.mounted) continue;
            for (const tok of c.tokensUsed.rbVars) {
              rbTokenHistogram[tok] = (rbTokenHistogram[tok] || 0) + 1;
            }
            if (c.archetype) {
              archetypeHistogram[c.archetype] = (archetypeHistogram[c.archetype] || 0) + 1;
            }
            for (const role of c.anatomySummary.roles || []) {
              roleHistogram[role] = (roleHistogram[role] || 0) + 1;
            }
          }

          const mounted = extractedCards.filter(x => x.mounted).length;
          console.log(
            `[Worker ${workerId}] ✅ ${cat.slug}: ${mounted}/${extractedCards.length} blocks extracted.`
          );
        }
      } finally {
        await page.close();
      }
    }

    await Promise.all(Array.from({ length: workerCount }, (_, i) => worker(i + 1)));

    // Sort components deterministically by category order and slug
    const catOrder = new Map(categories.map((c, i) => [c.slug, i]));
    allComponents.sort((a, b) => {
      const ca = catOrder.get(a.category) ?? 999;
      const cb = catOrder.get(b.category) ?? 999;
      if (ca !== cb) return ca - cb;
      return a.slug.localeCompare(b.slug, undefined, { numeric: true });
    });

    writeMasterCatalogAndIndex(categories, allComponents, {
      declarationHistogram,
      rbTokenHistogram,
      archetypeHistogram,
      roleHistogram
    });

    const mountedTotal = allComponents.filter(c => c.mounted).length;
    console.log(`\n🎉 Extraction complete! Mounted ${mountedTotal}/${allComponents.length} blocks across ${categories.length} categories.`);
    console.log(`📑 Catalog: ${path.join(OUTPUT_DIR, 'CATALOG.json')}`);
    console.log(`📑 Index:   ${path.join(OUTPUT_DIR, 'INDEX.md')}`);

    if (allComponents.length > 0 && mountedTotal / allComponents.length < 0.8) {
      throw new Error(
        `MOUNT_THRESHOLD_FAILED: Only ${mountedTotal}/${allComponents.length} blocks mounted (< 80%).`
      );
    }
  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('\n❌ Extraction failed:', err);
  process.exit(1);
});
