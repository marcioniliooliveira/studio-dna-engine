const { z } = require('zod');
const { canonicalize, hashCanonical } = require('./canonical-json');
const { ROLES } = require('./reference-candidate-contract');
const { compareOrdinal } = require('./reference-qualification');
const { validateReferencePromotion } = require('./reference-promotion-gate');

const SHA256 = /^sha256:[a-f0-9]{64}$/;
const RolesSchema = z.array(z.enum(ROLES)).min(1).meta({ uniqueItems: true }).refine(roles => new Set(roles).size === roles.length && roles.every((role, index) => index === 0 || compareOrdinal(roles[index - 1], role) < 0), { message: 'roles must be unique and canonically ordered' });
const SourceSchema = z.object({ candidateId: z.string().min(1), promotionHash: z.string().regex(SHA256), roles: RolesSchema }).strict();
const AssignmentSchema = z.object({ candidateId: z.string().min(1), roles: RolesSchema }).strict();
const ReferencePortfolioSchema = z.object({
  schemaVersion: z.literal(2), contractKind: z.literal('reference-portfolio'), clientScope: z.string().min(1),
  requiredRoles: RolesSchema,
  sources: z.array(SourceSchema).min(1).max(5).refine(sources => new Set(sources.map(source => source.candidateId)).size === sources.length, { message: 'sources must not repeat candidates' }),
  portfolioHash: z.string().regex(SHA256)
}).strict();

function sourceOrder(left, right) { return compareOrdinal(left.candidateId, right.candidateId) || compareOrdinal(left.promotionHash, right.promotionHash); }

// JSON Schema is structural only; source-to-promotion authorization requires trusted runtime context.
function validateReferencePortfolio(input, options = {}) {
  canonicalize(input);
  const portfolio = ReferencePortfolioSchema.parse(input);
  const sorted = [...portfolio.sources].sort(sourceOrder);
  if (portfolio.sources.some((source, index) => source !== sorted[index])) throw new TypeError('sources must use canonical order');
  const required = new Set(portfolio.requiredRoles);
  if (!Array.isArray(options.promotions) || options.promotions.length === 0) throw new TypeError('trusted promotions are required to authorize a portfolio');
  const promotionsByCandidate = new Map();
  for (const promotion of options.promotions.map(promotion => validateReferencePromotion(promotion, options))) {
    if (promotionsByCandidate.has(promotion.candidateId)) throw new TypeError('trusted promotions must not repeat candidates');
    promotionsByCandidate.set(promotion.candidateId, promotion);
  }
  const covered = new Set();
  for (const source of portfolio.sources) {
    const promotion = promotionsByCandidate.get(source.candidateId);
    if (!promotion || promotion.promotionHash !== source.promotionHash) throw new TypeError('source is not authorized by a trusted promotion');
    if (promotion.clientScope !== portfolio.clientScope && promotion.clientScope !== 'global') throw new TypeError('trusted promotion client scope is not allowed');
    for (const role of source.roles) {
    if (!required.has(role)) throw new TypeError('source roles must be required by the portfolio');
    if (!promotion.roles.includes(role)) throw new TypeError('source roles must be authorized by the trusted promotion');
    if (covered.has(role)) throw new TypeError('portfolio must not assign a role more than once');
    covered.add(role);
    }
  }
  if (covered.size !== required.size) throw new TypeError('portfolio does not cover every required role');
  const { portfolioHash, ...withoutHash } = portfolio;
  if (portfolioHash !== hashCanonical(withoutHash)) throw new TypeError('portfolioHash does not match portfolio content');
  return portfolio;
}

function buildReferencePortfolio(input, options = {}) {
  canonicalize(input);
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('portfolio input must be an object');
  if (Object.keys(input).sort(compareOrdinal).join(',') !== 'assignments,clientScope,promotions,requiredRoles') throw new TypeError('portfolio input contains unknown or missing fields');
  const clientScope = z.string().min(1).parse(input.clientScope);
  const requiredRoles = RolesSchema.parse([...input.requiredRoles].sort(compareOrdinal));
  if (!Array.isArray(input.promotions)) throw new TypeError('promotions must be an array');
  if (!Array.isArray(input.assignments)) throw new TypeError('assignments must be an array');
  const promotionsByCandidate = new Map();
  for (const rawPromotion of input.promotions) {
    const promotion = validateReferencePromotion(rawPromotion, options);
    if (promotion.clientScope !== clientScope && promotion.clientScope !== 'global') throw new TypeError('promotion client scope is not allowed');
    if (promotionsByCandidate.has(promotion.candidateId)) throw new TypeError('promotions must not repeat candidates');
    promotionsByCandidate.set(promotion.candidateId, promotion);
  }
  const seenCandidates = new Set();
  const sources = input.assignments.map(rawAssignment => {
    const assignment = AssignmentSchema.parse(rawAssignment);
    const promotion = promotionsByCandidate.get(assignment.candidateId);
    if (!promotion) throw new TypeError('assignment candidate is not promoted');
    if (seenCandidates.has(assignment.candidateId)) throw new TypeError('assignments must not repeat candidates');
    seenCandidates.add(assignment.candidateId);
    return { candidateId: assignment.candidateId, promotionHash: promotion.promotionHash, roles: assignment.roles };
  }).sort(sourceOrder);
  const portfolio = { schemaVersion: 2, contractKind: 'reference-portfolio', clientScope, requiredRoles, sources };
  portfolio.portfolioHash = hashCanonical(portfolio);
  return validateReferencePortfolio(portfolio, { promotions: input.promotions, trustedPublicKeys: options.trustedPublicKeys });
}

function generateReferencePortfolioJsonSchema() { return z.toJSONSchema(ReferencePortfolioSchema); }

module.exports = { ReferencePortfolioSchema, buildReferencePortfolio, validateReferencePortfolio, generateReferencePortfolioJsonSchema };
