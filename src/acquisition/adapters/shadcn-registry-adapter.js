/**
 * Universal Shadcn Registry Adapter (Canal #1 de Aquisição)
 * Processa endpoints compatíveis com shadcn registry (ex: 21st.dev/r/<author>/<component>)
 * e converte metadados, dependências e estrutura em evidência bruta normalizada.
 */

const crypto = require('node:crypto');

class ShadcnRegistryAdapter {
  /**
   * Extrai provider, autor e slug a partir de uma URL ou comando npx shadcn
   * @param {string} inputCommandOrUrl
   */
  parseRegistryInput(inputCommandOrUrl = '') {
    const urlMatch = inputCommandOrUrl.match(/https?:\/\/[^\s"']+/);
    const targetUrl = urlMatch ? urlMatch[0] : inputCommandOrUrl.trim();

    const parsed = new URL(targetUrl);
    const segments = parsed.pathname.split('/').filter(Boolean);
    const componentSlug = segments[segments.length - 1] || 'unknown-component';
    const authorOrNamespace = segments.length >= 2 ? segments[segments.length - 2] : parsed.hostname;

    return {
      provider: parsed.hostname.replace(/^www\./, ''),
      namespace: authorOrNamespace,
      componentId: `${authorOrNamespace}-${componentSlug}`,
      slug: componentSlug,
      registryUrl: targetUrl
    };
  }

  /**
   * Transforma o payload JSON do registry em manifesto de evidência com hash SHA-256
   * @param {string} inputCommandOrUrl
   * @param {object} registryPayload
   */
  ingestRegistryPayload(inputCommandOrUrl, registryPayload = {}) {
    const meta = this.parseRegistryInput(inputCommandOrUrl);
    const canonicalString = JSON.stringify({
      name: registryPayload.name || meta.slug,
      type: registryPayload.type || 'registry:ui',
      dependencies: registryPayload.dependencies || [],
      registryDependencies: registryPayload.registryDependencies || []
    });

    const corpusHash = crypto.createHash('sha256').update(canonicalString).digest('hex');

    return {
      acquisitionChannel: 'REGISTRY_OFFICIAL',
      provider: meta.provider,
      namespace: meta.namespace,
      componentId: meta.componentId,
      slug: meta.slug,
      registryUrl: meta.registryUrl,
      corpusHash,
      licensePolicy: 'REFERENCE_ONLY',
      observedDependencies: (registryPayload.dependencies || []).map((dep) => ({
        name: dep,
        classification: ['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'].includes(dep)
          ? 'replaceable'
          : 'vendor-specific'
      }))
    };
  }
}

module.exports = { ShadcnRegistryAdapter };
