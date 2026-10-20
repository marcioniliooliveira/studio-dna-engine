const { z } = require('zod');
const path = require('path');
const fs = require('fs');

/**
 * Validates that a slug contains only safe characters and prevents path traversal.
 * Allowed: a-z, 0-9, hyphens.
 */
function validateSlugSecurity(slug) {
  if (typeof slug !== 'string') {
    throw new Error('Invalid slug: must be a string');
  }
const clean = slug.trim();
  if (!clean || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(clean)) {
    throw new Error(`Invalid slug "${slug}": must be lowercase alphanumeric with hyphens, with no path traversal characters`);
  }
  return clean;
}

/**
 * Validates external URLs for the Playwright scraper, strictly preventing SSRF attacks
 * against private networks, localhost, link-local metadata endpoints, and non-HTTP protocols.
 */
function validateScrapeUrlSecurity(urlStr) {
  let parsed;
  try {
    parsed = new URL(urlStr);
  } catch (err) {
    throw new Error(`Invalid URL: ${err.message}`);
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`Invalid protocol "${parsed.protocol}": Only http: and https: are permitted.`);
  }

  const hostname = parsed.hostname.toLowerCase();

  // Banned local/loopback and metadata hostnames
  const bannedHostnames = ['localhost', '127.0.0.1', '::1', '0.0.0.0'];
  if (bannedHostnames.includes(hostname)) {
    throw new Error(`SSRF violation: Access to local or loopback address is forbidden (${hostname})`);
  }

  // Banned private IP ranges (RFC 1918 + RFC 3927 Link-Local / Cloud Metadata)
  const isPrivateIp = (
    /^10\./.test(hostname) ||
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
    /^192\.168\./.test(hostname) ||
    /^169\.254\./.test(hostname) || // AWS / GCP / Azure metadata endpoint
    /\.(local|internal|lan)$/.test(hostname)
  );

  if (isPrivateIp) {
    throw new Error(`SSRF violation: Access to private network address is forbidden (${hostname})`);
  }

  return parsed.href;
}

const ROOT_DIR = path.resolve(__dirname, '../../');

function getSafeClientDir(slug) {
  const safeSlug = validateSlugSecurity(slug);
  const targetDir = path.resolve(ROOT_DIR, 'clientes', safeSlug);
  const expectedPrefix = path.resolve(ROOT_DIR, 'clientes');
  if (!targetDir.startsWith(expectedPrefix + path.sep)) {
    throw new Error(`Path traversal violation for client slug: ${slug}`);
  }
  return targetDir;
}

function getSafeRefDir(slug) {
  const safeSlug = validateSlugSecurity(slug);
  const targetDir = path.resolve(ROOT_DIR, 'copias', safeSlug);
  const expectedPrefix = path.resolve(ROOT_DIR, 'copias');
  if (!targetDir.startsWith(expectedPrefix + path.sep)) {
    throw new Error(`Path traversal violation for ref slug: ${slug}`);
  }
  return targetDir;
}

function getSafeVaultDir(subpath = '') {
  const targetDir = path.resolve(ROOT_DIR, 'design-vault', subpath);
  const expectedPrefix = path.resolve(ROOT_DIR, 'design-vault');
  if (targetDir !== expectedPrefix && !targetDir.startsWith(expectedPrefix + path.sep)) {
    throw new Error(`Path traversal violation for vault path: ${subpath}`);
  }
  return targetDir;
}

// Schemas Zod para as Tools
const ScrapeAndExtractSchema = {
  url: z.string().url().describe('URL do site de referência a ser dissecado'),
  mode: z.enum(['all', 'clone', 'dna', 'ui']).default('all').describe('Modo de extração')
};

const InspectReferenceSchema = {
  refSlug: z.string().describe('Slug da referência em copias/ (ex: likova-space, azimuteresidencial-com-br)')
};

const CreateClientSchema = {
  brandName: z.string().min(2).describe('Nome da marca do cliente (Ex: Negocia Bem Imobiliária)'),
  refSlug: z.string().default('storeyarchitecture-co-uk').describe('Nome da referência no acervo'),
  niche: z.string().optional().describe('Nicho de mercado do cliente'),
  toneOfVoice: z.string().optional().describe('Tom de voz do design e copy'),
  whatsapp: z.string().optional().describe('Número de WhatsApp para conversão')
};

const TransmuteClientSchema = {
  clientSlug: z.string().describe('Slug do cliente em clientes/ (ex: negocia-bem, jumpflex-home-evolution)'),
  enforceAntiSlop: z.boolean().default(true).describe('Garante 0% de placeholders e metalinguagem no HTML gerado'),
  injectSeo: z.boolean().default(true).describe('Injeta meta tags, OpenGraph e JSON-LD Schema canônico')
};

const CompileDualstackSchema = {
  clientSlug: z.string().describe('Slug do cliente em clientes/'),
  target: z.enum(['static', 'nextjs-rsc']).default('static').describe('Alvo de compilação: static (HTML5/CSS scoped) ou nextjs-rsc (App Router)')
};

const InjectSlotsSchema = {
  skeletonPath: z.string().describe('Caminho do arquivo skeleton.html'),
  contentSlotsPath: z.string().describe('Caminho do arquivo content-slots.json'),
  outputPath: z.string().describe('Caminho de destino do index.html gerado')
};

const PatchBrandSpecSchema = {
  clientSlug: z.string().describe('Slug do cliente em clientes/'),
  updates: z.record(z.string(), z.any()).describe('Objeto de atualizações para mesclar no brand-spec.json')
};

const UnifiedQualityGateSchema = {
  clientSlug: z.string().describe('Slug do cliente ou da referência a ser auditada'),
  timeoutMs: z.number().default(15000).describe('Timeout máximo da auditoria em milissegundos')
};

const ImpeccableGateSchema = {
  clientSlug: z.string().describe('Slug do cliente cujo index.html será auditado contra anti-patterns visuais')
};

const BoxDiffLinterSchema = {
  siteSlug: z.string().describe('Nome da pasta do site (ex: negociabem-imobiliaria ou negocia-bem)')
};

const VisualSaliencySchema = {
  clientSlug: z.string().describe('Slug do cliente para análise ocular de saliência visual e contraste')
};

const QueryVaultSchema = {
  category: z.enum(['all', 'easings', 'typography', 'components']).default('all').describe('Categoria do Design Vault a consultar')
};

module.exports = {
  validateSlugSecurity,
  validateScrapeUrlSecurity,
  getSafeClientDir,
  getSafeRefDir,
  getSafeVaultDir,
  ROOT_DIR,
  ScrapeAndExtractSchema,
  InspectReferenceSchema,
  CreateClientSchema,
  TransmuteClientSchema,
  CompileDualstackSchema,
  InjectSlotsSchema,
  PatchBrandSpecSchema,
  UnifiedQualityGateSchema,
  ImpeccableGateSchema,
  BoxDiffLinterSchema,
  VisualSaliencySchema,
  QueryVaultSchema
};
