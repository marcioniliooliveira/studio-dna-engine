'use strict';

/**
 * UX Structural Heuristics & Gestalt Law Analyzer (TASK-V3-04)
 * 
 * Fusion of Laith0003/ux-skill and wpgaurav/design-slop:
 * 1. Gestalt Proximity:
 *    - In card grids: G_outer >= 0.35 * P_inner when P_inner >= 24px
 *    - In headings: M_top >= 1.25 * M_bottom relative to introductory text
 * 2. Monotonic Typography Scale: size(H1) > size(H2) > size(H3) > size(P)
 * 3. Card Soup Index (CSI): flags >= 3 consecutive homogeneous bordered card sections
 * 4. FSM State Completeness: requires [idle, loading, empty, error, success] on forms and repeated slots
 */

const cheerio = require('cheerio');

const TAILWIND_SPACING_MAP = {
  '0': 0,
  '0.5': 2,
  '1': 4,
  '1.5': 6,
  '2': 8,
  '2.5': 10,
  '3': 12,
  '3.5': 14,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '9': 36,
  '10': 40,
  '11': 44,
  '12': 48,
  '14': 56,
  '16': 64,
  '20': 80,
  '24': 96
};

const TAILWIND_FONT_SIZE_MAP = {
  'xs': 12,
  'sm': 14,
  'base': 16,
  'lg': 18,
  'xl': 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
  '8xl': 96,
  '9xl': 128
};

const REQUIRED_FSM_STATES = ['idle', 'loading', 'empty', 'error', 'success'];

class UXStructuralHeuristics {
  /**
   * Run full suite of UX structural heuristics.
   * @param {string} htmlContent
   * @param {object} [options={}]
   * @returns {{ passed: boolean, violations: Array<{ ruleId: string, message: string, detail?: string, selector?: string }> }}
   */
  static audit(htmlContent, options = {}) {
    if (!htmlContent || typeof htmlContent !== 'string') {
      return { passed: true, violations: [] };
    }

    const $ = cheerio.load(htmlContent, { decodeEntities: false });
    const violations = [];

    // 1. Gestalt Proximity (Card grids & Heading rhythm)
    this.checkGestaltProximity($, violations);

    // 2. Monotonic Typography Scale
    this.checkMonotonicTypeScale($, violations);

    // 3. Card Soup Index (CSI)
    this.checkCardSoupIndex($, violations);

    // 4. FSM State Completeness
    this.checkFsmStateCompleteness($, violations);

    return {
      passed: violations.length === 0,
      violations
    };
  }

  /**
   * 1. Gestalt Proximity Laws:
   * - Outer gap vs Inner padding: G_outer >= 0.35 * P_inner (when P_inner >= 24px)
   * - Heading Rhythm: M_top >= 1.25 * M_bottom
   */
  static checkGestaltProximity($, violations) {
    // A. Card Grid Proximity
    $('div, section, ul').each((_, container) => {
      const $c = $(container);
      const style = $c.attr('style') || '';
      const classes = $c.attr('class') || '';

      const isGridOrFlex = /display\s*:\s*(?:grid|flex)/i.test(style) || /\b(?:grid|flex)\b/i.test(classes);
      if (!isGridOrFlex) return;

      // Extract gap (G_outer)
      let gap = null;
      const gapStyleMatch = style.match(/(?:column-)?gap\s*:\s*([0-9.]+)\s*px/i);
      if (gapStyleMatch) {
        gap = parseFloat(gapStyleMatch[1]);
      } else {
        const twGapMatch = classes.match(/\bgap-(?:x-)?([0-9.]+)\b/);
        if (twGapMatch && TAILWIND_SPACING_MAP[twGapMatch[1]] !== undefined) {
          gap = TAILWIND_SPACING_MAP[twGapMatch[1]];
        }
      }

      if (gap === null) return;

      // Look at immediate card-like children
      const children = $c.children().toArray();
      if (children.length < 2) return;

      for (const child of children) {
        const $child = $(child);
        const childStyle = $child.attr('style') || '';
        const childClass = $child.attr('class') || '';

        // Extract padding (P_inner)
        let padding = null;
        const padStyleMatch = childStyle.match(/(?:^|;)\s*padding\s*:\s*([0-9.]+)\s*px/i);
        if (padStyleMatch) {
          padding = parseFloat(padStyleMatch[1]);
        } else {
          const twPadMatch = childClass.match(/\bp-([0-9.]+)\b/);
          if (twPadMatch && TAILWIND_SPACING_MAP[twPadMatch[1]] !== undefined) {
            padding = TAILWIND_SPACING_MAP[twPadMatch[1]];
          }
        }

        if (padding !== null && padding >= 24) {
          const minRequiredGap = 0.35 * padding;
          if (gap < minRequiredGap) {
            violations.push({
              ruleId: 'gestalt-card-proximity',
              message: `Gestalt proximity violation: outer card gap (${gap}px) is less than 0.35 * inner padding (${padding}px, min required: ${minRequiredGap.toFixed(1)}px)`,
              detail: `Card gap=${gap}px, padding=${padding}px`,
              selector: child.tagName + (child.attribs.class ? '.' + child.attribs.class.split(' ')[0] : '')
            });
            break;
          }
        }
      }
    });

    // B. Heading Rhythm Proximity (M_top >= 1.25 * M_bottom)
    $('h1, h2, h3, h4, h5, h6').each((_, el) => {
      const $el = $(el);
      const style = $el.attr('style') || '';
      const classes = $el.attr('class') || '';

      // Only check if heading has a following paragraph or description
      const nextElem = $el.next();
      if (!nextElem.length || !['p', 'div', 'span'].includes(nextElem.get(0).tagName.toLowerCase())) {
        return;
      }

      // Only check if heading has previous content in the same container
      const prevElem = $el.prev();
      if (!prevElem.length) {
        return;
      }

      let mTop = null;
      let mBottom = null;

      // Check inline styles
      const mTopMatch = style.match(/margin-top\s*:\s*([0-9.]+)\s*px/i);
      if (mTopMatch) mTop = parseFloat(mTopMatch[1]);

      const mBottomMatch = style.match(/margin-bottom\s*:\s*([0-9.]+)\s*px/i);
      if (mBottomMatch) mBottom = parseFloat(mBottomMatch[1]);

      // Check Tailwind classes
      if (mTop === null) {
        const twMtMatch = classes.match(/\bmt-([0-9.]+)\b/);
        if (twMtMatch && TAILWIND_SPACING_MAP[twMtMatch[1]] !== undefined) {
          mTop = TAILWIND_SPACING_MAP[twMtMatch[1]];
        }
      }
      if (mBottom === null) {
        const twMbMatch = classes.match(/\bmb-([0-9.]+)\b/);
        if (twMbMatch && TAILWIND_SPACING_MAP[twMbMatch[1]] !== undefined) {
          mBottom = TAILWIND_SPACING_MAP[twMbMatch[1]];
        }
      }

      if (mTop !== null && mBottom !== null && mBottom > 0) {
        const requiredMTop = 1.25 * mBottom;
        if (mTop < requiredMTop) {
          violations.push({
            ruleId: 'gestalt-heading-rhythm',
            message: `Gestalt heading rhythm violation: heading margin-top (${mTop}px) < 1.25 * margin-bottom (${mBottom}px, min required: ${requiredMTop.toFixed(1)}px)`,
            detail: `Heading binds visually closer to preceding block than to the copy it introduces`,
            selector: el.tagName
          });
        }
      }
    });
  }

  /**
   * 2. Monotonic Typography Scale: size(H1) > size(H2) > size(H3) > size(P)
   */
  static checkMonotonicTypeScale($, violations) {
    const styleText = $('style').text() + ' ' + ($('head style').text() || '');
    
    // Helper to extract font-size for a tag from CSS or classes
    const getTagSize = (tag) => {
      // 1. Try CSS rule: e.g. h1 { font-size: 48px; }
      const regex = new RegExp(`(?:^|\\s|,|})${tag}\\s*\\{[^}]*font-size\\s*:\\s*([0-9.]+)\\s*px`, 'i');
      const match = styleText.match(regex);
      if (match) return parseFloat(match[1]);

      // 2. Try inline style on first element of that tag
      const $el = $(tag).first();
      if ($el.length) {
        const inline = $el.attr('style') || '';
        const inMatch = inline.match(/font-size\s*:\s*([0-9.]+)\s*px/i);
        if (inMatch) return parseFloat(inMatch[1]);

        const cls = $el.attr('class') || '';
        const twMatch = cls.match(/\btext-(xs|sm|base|lg|[2-9]xl)\b/);
        if (twMatch && TAILWIND_FONT_SIZE_MAP[twMatch[1]]) {
          return TAILWIND_FONT_SIZE_MAP[twMatch[1]];
        }
      }
      return null;
    };

    const sH1 = getTagSize('h1');
    const sH2 = getTagSize('h2');
    const sH3 = getTagSize('h3');
    const sP = getTagSize('p');

    if (sH1 !== null && sH2 !== null && sH2 >= sH1) {
      violations.push({
        ruleId: 'monotonic-type-scale',
        message: `Inverted typography hierarchy: H2 (${sH2}px) >= H1 (${sH1}px)`,
        detail: `Expected size(H1) > size(H2)`
      });
    }

    if (sH2 !== null && sH3 !== null && sH3 >= sH2) {
      violations.push({
        ruleId: 'monotonic-type-scale',
        message: `Inverted typography hierarchy: H3 (${sH3}px) >= H2 (${sH2}px)`,
        detail: `Expected size(H2) > size(H3)`
      });
    }

    if (sH3 !== null && sP !== null && sP >= sH3) {
      violations.push({
        ruleId: 'monotonic-type-scale',
        message: `Inverted typography hierarchy: P (${sP}px) >= H3 (${sH3}px)`,
        detail: `Expected size(H3) > size(P)`
      });
    }
  }

  /**
   * 3. Card Soup Index (CSI): flags >= 3 consecutive homogeneous bordered card sections
   */
  static checkCardSoupIndex($, violations) {
    const sections = $('main > section, body > section, section').toArray();
    let consecutiveCardSections = 0;

    for (const sec of sections) {
      const $sec = $(sec);
      const classes = $sec.attr('class') || '';
      const text = $sec.text() || '';

      // Check if section is editorial, full-bleed, hero, or WorkStage
      const isEditorial = /\b(?:editorial|full-bleed|hero|breakout|story|kinetic-stage|WorkStage)\b/i.test(classes) ||
        $sec.is('[data-stage], [data-kinetic-stage], [data-hero]');

      if (isEditorial) {
        consecutiveCardSections = 0;
        continue;
      }

      // Check if section contains a homogeneous card grid
      const cards = $sec.find('[class*="rounded-"][class*="border"], [class*="border"][class*="card"]');
      const hasCardGrid = cards.length >= 2;

      if (hasCardGrid) {
        consecutiveCardSections++;
        if (consecutiveCardSections >= 3) {
          violations.push({
            ruleId: 'card-soup-index',
            message: `Card Soup Index violation: 3 or more consecutive sections with homogeneous bordered card grids detected without editorial relief or kinetic stage`,
            detail: `Section #${consecutiveCardSections} in sequence contains repeating card grids`,
            selector: sec.tagName + (sec.attribs.class ? '.' + sec.attribs.class.split(' ')[0] : '')
          });
          break; // Stop after flagging
        }
      } else {
        // Not a card grid: reset counter
        consecutiveCardSections = 0;
      }
    }
  }

  /**
   * 4. FSM State Completeness: requires [idle, loading, empty, error, success] on forms and repeated slots
   */
  static checkFsmStateCompleteness($, violations) {
    $('form, [data-slot-repeat], [data-fsm-target]').each((_, el) => {
      const $el = $(el);
      const targetId = $el.attr('id') || $el.attr('data-fsm-target') || $el.attr('data-slot-repeat') || el.tagName;

      // Collect states declared in children or attributes
      const declaredStates = new Set();
      
      $el.find('[data-fsm-state]').each((_, s) => {
        const stateName = $(s).attr('data-fsm-state');
        if (stateName) declaredStates.add(stateName.toLowerCase());
      });

      const explicitStatesAttr = $el.attr('data-fsm-states');
      if (explicitStatesAttr) {
        explicitStatesAttr.split(',').forEach(s => declaredStates.add(s.trim().toLowerCase()));
      }

      const missing = REQUIRED_FSM_STATES.filter(s => !declaredStates.has(s));

      if (missing.length > 0) {
        violations.push({
          ruleId: 'fsm-state-completeness',
          message: `FSM state completeness failure on <${targetId}>: missing required states [${missing.join(', ')}]`,
          detail: `Expected all 5 states: ${REQUIRED_FSM_STATES.join(', ')}. Missing: ${missing.join(', ')}`,
          selector: el.tagName + (el.attribs.id ? '#' + el.attribs.id : '')
        });
      }
    });
  }
}

module.exports = {
  UXStructuralHeuristics,
  REQUIRED_FSM_STATES,
  TAILWIND_SPACING_MAP,
  TAILWIND_FONT_SIZE_MAP
};
