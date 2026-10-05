/**
 * Unified CRP Quality Gates
 * Executa os gates multidimensionais para certificação de fidelidade e pureza clean-room.
 */

class UnifiedCRPQualityGates {
  /**
   * Gate 1: Box-Diff Linter (Tolerância Dimensional <= 2px)
   * @param {{width: number, height: number}} observedRect
   * @param {{width: number, height: number}} synthesizedRect
   */
  evaluateBoxDiff(observedRect, synthesizedRect) {
    if (!observedRect || !synthesizedRect) {
      return { gate: 'BOX_DIFF_GEOMETRY', passed: false, metric: 'Missing rects', details: 'Dados geométricos ausentes' };
    }

    const deltaW = Math.abs(observedRect.width - synthesizedRect.width);
    const deltaH = Math.abs(observedRect.height - synthesizedRect.height);
    const maxDelta = Math.max(deltaW, deltaH);

    return {
      gate: 'BOX_DIFF_GEOMETRY',
      passed: maxDelta <= 2.0,
      metric: `Max deviation: ${maxDelta.toFixed(2)}px (Threshold: <= 2.0px)`,
      details: maxDelta <= 2.0 ? 'Conforme' : `Divergência dimensional excede o limite: deltaW=${deltaW}, deltaH=${deltaH}`
    };
  }

  /**
   * Gate 2: Motion Timing Tolerance (Tolerância <= 16ms / 1 frame a 60fps)
   * @param {number} observedDurationMs
   * @param {number} synthesizedDurationMs
   */
  evaluateMotionTiming(observedDurationMs, synthesizedDurationMs) {
    const diff = Math.abs(observedDurationMs - synthesizedDurationMs);

    return {
      gate: 'MOTION_TIMING_EQUIVALENCE',
      passed: diff <= 16.0,
      metric: `Timing delta: ${diff.toFixed(1)}ms (Threshold: <= 16.0ms)`,
      details: diff <= 16.0 ? 'Conforme' : `Duração difere em mais de 1 frame de 60fps (${diff}ms)`
    };
  }

  /**
   * Gate 3: Anti-Slop Purity Linter
   * @param {string} generatedSource
   */
  evaluateAntiSlop(generatedSource = '') {
    const forbiddenPatterns = [
      /useplanes/gi,
      /beautiful-?ui/gi,
      /lorem ipsum/gi,
      /TODO: implement/gi,
      /mockData/gi,
      /style=\{\{/g // Proibição de inline styles soltos
    ];

    const violations = [];
    for (const pat of forbiddenPatterns) {
      if (pat.test(generatedSource)) {
        violations.push(`Padrão proibido detectado: ${pat}`);
      }
    }

    return {
      gate: 'ANTI_SLOP_PURITY',
      passed: violations.length === 0,
      metric: `Violações: ${violations.length}`,
      details: violations.length === 0 ? 'Conforme' : violations.join('; ')
    };
  }

  /**
   * Gate 4: Clean-Room Leakage Gate (Verificação de Vazamento de Código Upstream)
   * @param {string} generatedSource
   * @param {string[]} rawReferenceSnippets
   */
  evaluateCleanRoomLeakage(generatedSource = '', rawReferenceSnippets = []) {
    let leakedLines = 0;
    for (const line of rawReferenceSnippets) {
      const cleanLine = line.trim();
      if (cleanLine.length > 25 && generatedSource.includes(cleanLine)) {
        leakedLines++;
      }
    }

    return {
      gate: 'CLEAN_ROOM_LEAKAGE',
      passed: leakedLines === 0,
      metric: `Linhas proprietárias coincidentes: ${leakedLines}`,
      details: leakedLines === 0 ? 'Conforme' : 'Detecção de código copiado da referência não autorizada'
    };
  }

  /**
   * Emissão do Registro de Certificação Consolidado
   */
  issueCertificationRecord(dnaRef, reports = []) {
    const allPassed = reports.length > 0 && reports.every((r) => r.passed);
    const summary = {};
    reports.forEach((r) => {
      summary[r.gate] = r.passed;
    });

    return {
      certificateId: `cert-${Date.now().toString(36)}`,
      dnaRef,
      evaluatedAt: new Date().toISOString(),
      auditorAgent: 'EvidenceAuditor',
      gatesSummary: summary,
      verdict: allPassed ? 'CERTIFIED' : 'REJECTED'
    };
  }
}

module.exports = { UnifiedCRPQualityGates };
