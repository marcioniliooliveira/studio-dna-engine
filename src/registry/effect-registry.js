/**
 * STUDIO DNA ENGINE — Universal UI/UX Effect & Component Registry
 * Standardized registry for declarative micro-interactions, shaders, SVG filters,
 * and component libraries (VengeanceUI, Aceternity, MagicUI, Shadcn).
 */

const fs = require('fs');
const path = require('path');

class EffectRegistry {
  constructor() {
    this.effects = new Map();
    this._preloadCanonicalEffects();
  }

  _preloadCanonicalEffects() {
    const effectsDir = path.resolve(__dirname, 'effects');
    if (fs.existsSync(effectsDir)) {
      const files = fs.readdirSync(effectsDir).filter(f => f.endsWith('.json'));
      files.forEach(file => {
        try {
          const content = fs.readFileSync(path.join(effectsDir, file), 'utf8');
          const spec = JSON.parse(content);
          this.registerEffect(spec);
        } catch (e) {
          console.warn(`[EffectRegistry] Failed to preload effect file "${file}":`, e.message);
        }
      });
    }
  }

  /**
   * Registers a new UI/UX effect specification
   * @param {Object} spec
   * @returns {Object} registered spec
   */
  registerEffect(spec) {
    if (!spec || typeof spec !== 'object') {
      throw new Error('Effect spec must be an object');
    }
    if (!spec.id || !spec.name || !spec.category) {
      throw new Error('Effect spec requires id, name and category');
    }
    this.effects.set(spec.id, spec);
    return spec;
  }

  /**
   * Gets an effect by ID
   * @param {string} id
   * @returns {Object|null}
   */
  getEffect(id) {
    return this.effects.get(id) || null;
  }

  /**
   * Lists all effects matching a category
   * @param {string} category
   * @returns {Array<Object>}
   */
  listByCategory(category) {
    const result = [];
    for (const effect of this.effects.values()) {
      if (!category || effect.category === category) {
        result.push(effect);
      }
    }
    return result;
  }

  /**
   * Generates deduplicated composite SVG <filter> definitions
   * @param {Array<string>} [effectIds] - Optional filter for specific IDs
   * @returns {string} XML markup containing <filter> tags
   */
  generateCompositeSvgDefs(effectIds = null) {
    const filterMap = new Map();
    const targetEffects = effectIds
      ? effectIds.map(id => this.getEffect(id)).filter(Boolean)
      : Array.from(this.effects.values());

    targetEffects.forEach(eff => {
      const filters = eff.prerequisites?.svgFilters || [];
      filters.forEach(f => {
        if (f.id && f.markup && !filterMap.has(f.id)) {
          filterMap.set(f.id, f.markup);
        }
      });
    });

    return Array.from(filterMap.values()).join('\n    ');
  }

  /**
   * Generates composite CSS variable defaults and classes
   * @param {Array<string>} [effectIds]
   * @returns {string} CSS definitions
   */
  generateCompositeStyles(effectIds = null) {
    const targetEffects = effectIds
      ? effectIds.map(id => this.getEffect(id)).filter(Boolean)
      : Array.from(this.effects.values());

    const rootVars = [];
    targetEffects.forEach(eff => {
      const tokens = eff.prerequisites?.cssTokens || {};
      for (const [k, v] of Object.entries(tokens)) {
        rootVars.push(`  ${k}: ${v};`);
      }
    });

    return rootVars.length ? `:root {\n${rootVars.join('\n')}\n}` : '';
  }
}

// Export singleton instance + class
const defaultRegistry = new EffectRegistry();

module.exports = defaultRegistry;
module.exports.EffectRegistry = EffectRegistry;
