const { canonicalize } = require('./canonical-json');
const { ROLES } = require('./reference-candidate-contract');
const { SCORE_NAMES, compareOrdinal, validateReferenceQualification } = require('./reference-qualification');

const BENEFIT_AXES = SCORE_NAMES.filter(name => name !== 'risk');

function selectParetoCandidates(input) {
  canonicalize(input);
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('Pareto selection input must be an object');
  if (Object.keys(input).sort(compareOrdinal).join(',') !== 'maxCandidates,qualifications,requiredRoles') {
    throw new TypeError('Pareto selection input contains unknown or missing fields');
  }
  const { qualifications, requiredRoles, maxCandidates } = input;
  if (!Array.isArray(qualifications)) throw new TypeError('qualifications must be an array');
  if (!Array.isArray(requiredRoles) || requiredRoles.length === 0 || requiredRoles.some(role => !ROLES.includes(role))) {
    throw new TypeError('requiredRoles must be a non-empty array of known roles');
  }
  if (new Set(requiredRoles).size !== requiredRoles.length) throw new TypeError('requiredRoles must not contain duplicates');
  if (!Number.isInteger(maxCandidates) || maxCandidates < 1 || maxCandidates > 5) {
    throw new TypeError('maxCandidates must be an integer from 1 through 5');
  }

  const validated = qualifications.map(validateReferenceQualification);
  const candidateIds = new Set();
  for (const qualification of validated) {
    if (candidateIds.has(qualification.candidateId)) throw new TypeError(`duplicate qualification candidateId: ${qualification.candidateId}`);
    candidateIds.add(qualification.candidateId);
  }

  const roles = [...requiredRoles].sort(compareOrdinal);
  const contributors = validated.filter(qualification => qualification.roles.some(role => roles.includes(role)));
  const byRole = Object.fromEntries(roles.map(role => {
    const contenders = contributors.filter(qualification => qualification.roles.includes(role));
    const nonDominated = contenders
      .filter(candidate => !contenders.some(other => other !== candidate && dominates(other, candidate)))
      .map(candidate => candidate.candidateId)
      .sort(compareOrdinal);
    return [role, nonDominated];
  }));
  const missingRoles = roles.filter(role => byRole[role].length === 0);
  if (missingRoles.length > 0) throw new Error(`Cannot retain coverage: no candidates for required roles ${missingRoles.join(', ')}`);

  const selection = coverageSelection(byRole, roles, maxCandidates);
  if (!selection) throw new Error(`Cannot retain coverage for required roles within maxCandidates cap of ${maxCandidates}`);
  return { requiredRoles: roles, candidateIds: selection, byRole };
}

function dominates(left, right) {
  let strictlyBetter = false;
  for (const axis of BENEFIT_AXES) {
    if (left.scores[axis].value < right.scores[axis].value) return false;
    if (left.scores[axis].value > right.scores[axis].value) strictlyBetter = true;
  }
  if (left.scores.risk.value > right.scores.risk.value) return false;
  return strictlyBetter || left.scores.risk.value < right.scores.risk.value;
}

function coverageSelection(byRole, roles, maxCandidates) {
  const candidates = [...new Set(roles.flatMap(role => byRole[role]))].sort(compareOrdinal);
  if (candidates.length <= maxCandidates) return candidates;
  for (let size = 1; size <= Math.min(maxCandidates, candidates.length); size += 1) {
    const selection = firstCoveringCombination(candidates, size, roles, byRole);
    if (selection) return selection;
  }
  return null;
}

function firstCoveringCombination(candidates, size, roles, byRole, start = 0, selected = []) {
  if (selected.length === size) {
    return roles.every(role => selected.some(candidateId => byRole[role].includes(candidateId))) ? selected : null;
  }
  for (let index = start; index <= candidates.length - (size - selected.length); index += 1) {
    const match = firstCoveringCombination(candidates, size, roles, byRole, index + 1, [...selected, candidates[index]]);
    if (match) return match;
  }
  return null;
}

module.exports = { selectParetoCandidates };
