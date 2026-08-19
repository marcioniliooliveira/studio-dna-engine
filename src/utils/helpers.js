/**
 * Helper para extrair nome sanitizado do site a partir da URL
 */
function getSiteSlug(rawUrl) {
  try {
    const urlObj = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
    return urlObj.hostname.replace(/[^a-zA-Z0-9]/g, '-').replace(/^www-/, '');
  } catch (e) {
    return 'site-' + Date.now();
  }
}

/**
 * Garante que a URL possui protocolo http/https
 */
function normalizeUrl(url) {
  let normalized = url ? url.trim() : '';
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = 'https://' + normalized;
  }
  return normalized;
}

module.exports = {
  getSiteSlug,
  normalizeUrl
};
