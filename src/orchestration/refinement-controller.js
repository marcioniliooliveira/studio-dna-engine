/**
 * src/orchestration/refinement-controller.js
 *
 * Studio DNA Engine v3.0 — Bounded Visual Refinement Controller (TASK-V3-07)
 *
 * Invariants:
 * - Trava estrita de 3 tentativas: attempt >= 3 (ou attempt > 3) bloqueia a transição e emite human_review_required.
 * - Converte violações dos Níveis 1, 2 e 3 em planos de correção cirúrgicos (patch-plan.json).
 * - Cada entrada de patch contém { dataDs, line, selector, viewport, measuredDelta, nearestTokenSuggestion }.
 * - Invalidação mandatória de certificados anteriores ('visual-critic', 'visual-regression', 'unified-quality-gate').
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const MAX_REFINEMENT_ATTEMPTS = 3;

/**
 * Deriva sugestão de token semântico com base na propriedade e delta medido
 */
function deriveTokenSuggestion(propOrFinding, delta) {
  const text = String(propOrFinding || '').toLowerCase();

  if (text.includes('font-size') || text.includes('font') || text.includes('tipografia')) {
    if (typeof delta === 'number') {
      if (delta < -16) return '--font-size-hero';
      if (delta < 0) return '--font-size-title';
      return '--font-size-body';
    }
    return '--font-size-base';
  }

  if (text.includes('contrast') || text.includes('apca') || text.includes('color') || text.includes('cor')) {
    return '--color-text-high-contrast';
  }

  if (text.includes('padding') || text.includes('pad')) {
    return 'p-4';
  }

  if (text.includes('gap') || text.includes('spacing') || text.includes('margin')) {
    return '--spacing-section-gap';
  }

  if (text.includes('border-radius') || text.includes('rounded')) {
    return '--radius-card-surface';
  }

  if (text.includes('motion') || text.includes('movimento') || text.includes('spring')) {
    return '--spring-damping-snappy';
  }

  return '--token-semantic-default';
}

/**
 * Analisa e normaliza um finding (objeto estruturado ou string) em patch cirúrgico
 */
function parseSurgicalFinding(finding) {
  if (finding && typeof finding === 'object') {
    const dataDs = finding.dataDs || (finding.selector ? extractDataDs(finding.selector) : 'unknown');
    const line = Number.isInteger(finding.line) ? finding.line : (finding.startLine || 1);
    const selector = finding.selector || (dataDs !== 'unknown' ? `[data-ds='${dataDs}']` : 'body');
    const viewport = finding.viewport || '1440x900';
    const measuredDelta = finding.measuredDelta !== undefined ? finding.measuredDelta : (finding.deltaPx || 0);
    const nearestTokenSuggestion = finding.nearestTokenSuggestion || deriveTokenSuggestion(selector + ' ' + (finding.message || ''), measuredDelta);

    return {
      dataDs,
      line,
      selector,
      viewport,
      measuredDelta,
      nearestTokenSuggestion
    };
  }

  const raw = String(finding || '');
  const lineMatch = raw.match(/(?:linha|line)\s+(\d+)/i);
  const line = lineMatch ? parseInt(lineMatch[1], 10) : 1;

  const dataDsMatch = raw.match(/\[data-ds=['"]?([a-f0-9]{8})['"]?\]/i) || raw.match(/data-ds=['"]?([a-f0-9]{8})['"]?/i);
  const dataDs = dataDsMatch ? dataDsMatch[1] : 'unknown';

  const selectorMatch = raw.match(/(\[data-ds=[^\]]+\]\s*[^:\)]+)/i);
  const selector = selectorMatch ? selectorMatch[1].trim() : (dataDs !== 'unknown' ? `[data-ds='${dataDs}']` : 'body');

  const viewportMatch = raw.match(/(?:viewport\s+|at\s+)(\d{3,4}x\d{3,4}|\d{3,4}px)/i);
  const viewport = viewportMatch ? viewportMatch[1] : '1440x900';

  const deltaMatch = raw.match(/(?:delta\s*=\s*|deltapx\s*[:=]\s*)([-+]?[0-9]*\.?[0-9]+)/i);
  const measuredDelta = deltaMatch ? parseFloat(deltaMatch[1]) : 0;

  const nearestTokenSuggestion = deriveTokenSuggestion(raw, measuredDelta);

  return {
    dataDs,
    line,
    selector,
    viewport,
    measuredDelta,
    nearestTokenSuggestion
  };
}

function extractDataDs(selectorStr) {
  const m = String(selectorStr || '').match(/\[data-ds=['"]?([a-f0-9]{8})['"]?\]/i);
  return m ? m[1] : 'unknown';
}

/**
 * Converte as violações dos Níveis 1, 2 e 3 em um plano de correção cirúrgico (patch-plan.json)
 */
function generatePatchPlan(findings = [], options = {}) {
  const patches = (findings || []).map(f => parseSurgicalFinding(f));

  return {
    schemaVersion: '3.0.0',
    generatedAt: new Date().toISOString(),
    targetArtifact: options.targetArtifact || options.priorArtifactHash || null,
    totalPatches: patches.length,
    patches
  };
}

/**
 * Persiste o plano de patch cirúrgico em arquivo patch-plan.json
 */
function writePatchPlan(outputDirOrPath, patchPlan) {
  let targetPath = outputDirOrPath;
  if (!targetPath.endsWith('.json')) {
    targetPath = path.join(outputDirOrPath, 'patch-plan.json');
  }

  const parentDir = path.dirname(targetPath);
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }

  fs.writeFileSync(targetPath, JSON.stringify(patchPlan, null, 2), 'utf8');
  return targetPath;
}

/**
 * Deriva orientação textual para remediação
 */
function deriveRemedyGuidance(finding) {
  const fLower = (typeof finding === 'string' ? finding : finding?.message || JSON.stringify(finding || {})).toLowerCase();
  if (fLower.includes('contrast') || fLower.includes('apca')) {
    return 'Adjust typography color or apply optimal scrim layer opacity to satisfy APCA threshold';
  }
  if (fLower.includes('tipografia') || fLower.includes('font')) {
    return 'Re-scale fluid clamp boundaries or adjust font-weight to prevent overflow';
  }
  if (fLower.includes('movimento') || fLower.includes('motion')) {
    return 'Review spring physics damping or Catmull-Rom knots to eliminate kinetic jitter';
  }
  return 'Review section tokens and visual layout rules to remediate flagged defect';
}

/**
 * Planeja o próximo ciclo de refinamento ou escala para revisão humana
 *
 * @param {object} params
 * @param {number} params.attempt Tentativa atual (1-based)
 * @param {Array<string|object>} params.findings Violações verificadas dos Níveis 1, 2 ou 3
 * @param {string} [params.priorArtifactHash] SHA-256 do artefato sendo refinado
 * @param {string} [params.outputDir] Diretório opcional para gravação do patch-plan.json
 * @returns {object} RefinementTask ou HumanReviewRequired
 */
function planRefinement({ attempt = 1, findings = [], priorArtifactHash, outputDir }) {
  const normalizedFindings = (findings || []).map(f =>
    typeof f === 'string' ? f : f.message || JSON.stringify(f)
  );

  // Limite estrito de no máximo 3 tentativas de auto-refinamento
  if (attempt >= MAX_REFINEMENT_ATTEMPTS) {
    return {
      action: 'human_review_required',
      attempt,
      maxAttempts: MAX_REFINEMENT_ATTEMPTS,
      reason: `Automated refinement limit (${MAX_REFINEMENT_ATTEMPTS} attempts) reached without meeting quality threshold`,
      targetHash: priorArtifactHash,
      unresolvedFindings: normalizedFindings
    };
  }

  // Gera plano de correção cirúrgico estruturado
  const patchPlan = generatePatchPlan(findings, { priorArtifactHash });

  if (outputDir && typeof outputDir === 'string') {
    try {
      writePatchPlan(outputDir, patchPlan);
    } catch {
      // Non-fatal if output directory cannot be written synchronously
    }
  }

  // Formata tarefas acionáveis para o builder agent
  const tasks = normalizedFindings.map((finding, idx) => ({
    id: `remedy_task_${attempt}_${idx + 1}`,
    finding,
    patch: patchPlan.patches[idx] || null,
    suggestedFix: deriveRemedyGuidance(finding)
  }));

  return {
    action: 'refinement_task',
    attempt: attempt + 1,
    maxAttempts: MAX_REFINEMENT_ATTEMPTS,
    targetHash: priorArtifactHash,
    invalidatedGates: [
      'visual-critic',
      'visual-regression',
      'unified-quality-gate'
    ],
    patchPlan,
    tasks
  };
}

module.exports = {
  MAX_REFINEMENT_ATTEMPTS,
  parseSurgicalFinding,
  generatePatchPlan,
  writePatchPlan,
  deriveRemedyGuidance,
  deriveTokenSuggestion,
  planRefinement
};
