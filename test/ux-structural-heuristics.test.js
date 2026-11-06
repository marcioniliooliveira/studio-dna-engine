'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { UXStructuralHeuristics } = require('../src/qa/ux-structural-heuristics');
const { AISlopAstHygiene } = require('../src/qa/aislop-ast-hygiene');

// ─── SUITE 1: Gestalt Proximity Heuristic ──────────────────────────────────────

test('UXStructuralHeuristics: Gestalt Proximity - fails when G_outer < 0.35 * P_inner (P_inner >= 24px)', () => {
  const badHtml = `
    <div class="card-grid" style="display: grid; gap: 4px;">
      <div class="card" style="padding: 32px; border-radius: 8px;">Card 1</div>
      <div class="card" style="padding: 32px; border-radius: 8px;">Card 2</div>
    </div>
  `;
  // P_inner = 32px >= 24px. Required G_outer >= 0.35 * 32 = 11.2px. Actual = 4px.
  const report = UXStructuralHeuristics.audit(badHtml);
  assert.equal(report.passed, false);
  const violation = report.violations.find(v => v.ruleId === 'gestalt-card-proximity');
  assert.ok(violation, 'Must detect gestalt-card-proximity violation');
});

test('UXStructuralHeuristics: Gestalt Proximity - passes when G_outer >= 0.35 * P_inner', () => {
  const goodHtml = `
    <div class="card-grid" style="display: grid; gap: 16px;">
      <div class="card" style="padding: 32px; border-radius: 8px;">Card 1</div>
      <div class="card" style="padding: 32px; border-radius: 8px;">Card 2</div>
    </div>
  `;
  // P_inner = 32px, G_outer = 16px >= 11.2px -> OK.
  const report = UXStructuralHeuristics.audit(goodHtml);
  const violation = report.violations.find(v => v.ruleId === 'gestalt-card-proximity');
  assert.equal(violation, undefined, 'Should pass when gap satisfies proximity ratio');
});

test('UXStructuralHeuristics: Gestalt Heading Rhythm - fails when M_top < 1.25 * M_bottom', () => {
  const badHtml = `
    <section>
      <div class="prev-block">Previous content</div>
      <h2 style="margin-top: 10px; margin-bottom: 20px;">Section Title</h2>
      <p>Introductory paragraph for this section.</p>
    </section>
  `;
  // M_top = 10px, M_bottom = 20px. Required M_top >= 1.25 * 20 = 25px.
  const report = UXStructuralHeuristics.audit(badHtml);
  assert.equal(report.passed, false);
  const violation = report.violations.find(v => v.ruleId === 'gestalt-heading-rhythm');
  assert.ok(violation, 'Must detect gestalt-heading-rhythm when title binds closer to previous block');
});

test('UXStructuralHeuristics: Gestalt Heading Rhythm - passes when M_top >= 1.25 * M_bottom', () => {
  const goodHtml = `
    <section>
      <div class="prev-block">Previous content</div>
      <h2 style="margin-top: 32px; margin-bottom: 16px;">Section Title</h2>
      <p>Introductory paragraph for this section.</p>
    </section>
  `;
  // M_top = 32px >= 1.25 * 16 = 20px -> OK.
  const report = UXStructuralHeuristics.audit(goodHtml);
  const violation = report.violations.find(v => v.ruleId === 'gestalt-heading-rhythm');
  assert.equal(violation, undefined);
});

// ─── SUITE 2: Monotonic Typography Scale ───────────────────────────────────────

test('UXStructuralHeuristics: Monotonic Scale - fails when H2 >= H1 or H3 >= H2 or P >= H3', () => {
  const badHtml = `
    <style>
      h1 { font-size: 28px; }
      h2 { font-size: 32px; } /* Inverted: H2 > H1 */
      h3 { font-size: 20px; }
      p { font-size: 16px; }
    </style>
    <h1>Title</h1>
    <h2>Subtitle</h2>
  `;
  const report = UXStructuralHeuristics.audit(badHtml);
  assert.equal(report.passed, false);
  const violation = report.violations.find(v => v.ruleId === 'monotonic-type-scale');
  assert.ok(violation, 'Must detect inverted typography scale where H2 >= H1');
});

test('UXStructuralHeuristics: Monotonic Scale - passes when H1 > H2 > H3 > P', () => {
  const goodHtml = `
    <style>
      h1 { font-size: 48px; }
      h2 { font-size: 32px; }
      h3 { font-size: 24px; }
      p { font-size: 16px; }
    </style>
    <h1>Title</h1>
    <h2>Subtitle</h2>
    <h3>Section Header</h3>
    <p>Body copy</p>
  `;
  const report = UXStructuralHeuristics.audit(goodHtml);
  const violation = report.violations.find(v => v.ruleId === 'monotonic-type-scale');
  assert.equal(violation, undefined);
});

// ─── SUITE 3: Card Soup Index (CSI) ────────────────────────────────────────────

test('UXStructuralHeuristics: Card Soup Index - fails on >= 3 consecutive homogeneous bordered card sections', () => {
  const soupHtml = `
    <main>
      <section class="section-1">
        <div class="grid">
          <div class="card rounded-xl border border-gray-200">Card A</div>
          <div class="card rounded-xl border border-gray-200">Card B</div>
        </div>
      </section>
      <section class="section-2">
        <div class="grid">
          <div class="card rounded-lg border border-slate-300">Card C</div>
          <div class="card rounded-lg border border-slate-300">Card D</div>
        </div>
      </section>
      <section class="section-3">
        <div class="grid">
          <div class="card rounded-2xl border border-zinc-200">Card E</div>
          <div class="card rounded-2xl border border-zinc-200">Card F</div>
        </div>
      </section>
    </main>
  `;
  const report = UXStructuralHeuristics.audit(soupHtml);
  assert.equal(report.passed, false);
  const violation = report.violations.find(v => v.ruleId === 'card-soup-index');
  assert.ok(violation, 'Must flag 3 consecutive homogeneous card grid sections as Card Soup');
});

test('UXStructuralHeuristics: Card Soup Index - passes when interleaved with editorial, full-bleed, or WorkStage', () => {
  const goodHtml = `
    <main>
      <section class="section-1">
        <div class="grid">
          <div class="card rounded-xl border border-gray-200">Card A</div>
        </div>
      </section>
      <section class="editorial-flow full-bleed">
        <p class="text-4xl font-serif">Big editorial statement breaking the card repetition.</p>
      </section>
      <section class="section-3">
        <div class="grid">
          <div class="card rounded-xl border border-gray-200">Card B</div>
        </div>
      </section>
    </main>
  `;
  const report = UXStructuralHeuristics.audit(goodHtml);
  const violation = report.violations.find(v => v.ruleId === 'card-soup-index');
  assert.equal(violation, undefined, 'Interleaving editorial section must reset Card Soup counter');
});

// ─── SUITE 4: FSM State Completeness ───────────────────────────────────────────

test('UXStructuralHeuristics: FSM Completeness - fails when form or dynamic list misses required states', () => {
  const badHtml = `
    <form id="contactForm" data-fsm-target="contact">
      <div data-fsm-state="idle">Idle Form</div>
      <div data-fsm-state="loading">Loading...</div>
      <!-- missing empty, error, success -->
    </form>
  `;
  const report = UXStructuralHeuristics.audit(badHtml);
  assert.equal(report.passed, false);
  const violation = report.violations.find(v => v.ruleId === 'fsm-state-completeness');
  assert.ok(violation, 'Must detect missing FSM states [empty, error, success]');
  assert.ok(violation.detail.includes('empty'));
  assert.ok(violation.detail.includes('error'));
  assert.ok(violation.detail.includes('success'));
});

test('UXStructuralHeuristics: FSM Completeness - passes when idle, loading, empty, error, success are present', () => {
  const goodHtml = `
    <div data-slot-repeat="catalog_items" data-fsm-target="catalog">
      <div data-fsm-state="idle">List Items</div>
      <div data-fsm-state="loading">Skeleton loader...</div>
      <div data-fsm-state="empty">No items found</div>
      <div data-fsm-state="error" aria-live="assertive">Failed to load items</div>
      <div data-fsm-state="success" aria-live="polite">Items updated successfully</div>
    </div>
  `;
  const report = UXStructuralHeuristics.audit(goodHtml);
  const violation = report.violations.find(v => v.ruleId === 'fsm-state-completeness');
  assert.equal(violation, undefined);
});

// ─── SUITE 5: AI-Slop AST Hygiene ──────────────────────────────────────────────

test('AISlopAstHygiene: blocks empty catch blocks', () => {
  const badJs = `
    function calculateTotal() {
      try {
        riskyOperation();
      } catch (e) {
      }
    }
  `;
  const report = AISlopAstHygiene.auditSource(badJs, 'component.js');
  assert.equal(report.passed, false);
  const violation = report.violations.find(v => v.ruleId === 'empty-catch-block');
  assert.ok(violation, 'Must flag empty catch block');
});

test('AISlopAstHygiene: blocks truncation comments', () => {
  const badJs = `
    function renderSection() {
      // ... rest of code
      return true;
    }
  `;
  const report = AISlopAstHygiene.auditSource(badJs, 'section.js');
  assert.equal(report.passed, false);
  const violation = report.violations.find(v => v.ruleId === 'truncation-comment');
  assert.ok(violation, 'Must flag truncation comment // ... rest of code');
});

test('AISlopAstHygiene: blocks duplicate inline SVGs (>= 3 identical)', () => {
  const svg = `<svg viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>`;
  const html = `
    <div>
      ${svg}
      ${svg}
      ${svg}
    </div>
  `;
  const report = AISlopAstHygiene.auditHtml(html);
  assert.equal(report.passed, false);
  const violation = report.violations.find(v => v.ruleId === 'duplicate-inline-svg');
  assert.ok(violation, 'Must flag >= 3 identical inline SVGs');
});

test('AISlopAstHygiene: blocks cyclomatic complexity > 15', () => {
  const highComplexityJs = `
    function complexDecision(a, b, c, d, e, f, g, h) {
      if (a === 1) return 1;
      if (a === 2) return 2;
      if (b === 1) return 3;
      if (b === 2) return 4;
      if (c === 1) return 5;
      if (c === 2) return 6;
      if (d === 1) return 7;
      if (d === 2) return 8;
      if (e === 1) return 9;
      if (e === 2) return 10;
      if (f === 1) return 11;
      if (f === 2) return 12;
      if (g === 1) return 13;
      if (g === 2) return 14;
      if (h === 1) return 15;
      if (h === 2) return 16;
      return 0;
    }
  `;
  const report = AISlopAstHygiene.auditSource(highComplexityJs, 'logic.js');
  assert.equal(report.passed, false);
  const violation = report.violations.find(v => v.ruleId === 'cyclomatic-complexity');
  assert.ok(violation, 'Must flag cyclomatic complexity > 15');
});
