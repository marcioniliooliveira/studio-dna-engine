/**
 * Motion Reverse Engineering Engine
 * Observa transições no DOM a 60fps e ajusta matematicamente curvas Bezier e molas físicas.
 */

class MotionReverseEngine {
  /**
   * Identifica se uma sequência temporal se aproxima mais de uma mola (com oscilação/overshoot)
   * ou de uma curva cúbica de Bezier.
   * @param {Array<{timeMs: number, value: number}>} samples
   * @returns {'spring' | 'cubic-bezier'}
   */
  classifyDynamic(samples) {
    if (!Array.isArray(samples) || samples.length === 0) return 'cubic-bezier';
    const hasOvershoot = samples.some((s) => s.value > 1.01 || s.value < -0.01);
    return hasOvershoot ? 'spring' : 'cubic-bezier';
  }

  /**
   * Resolução analítica aproximada dos parâmetros da equação de mola amortecida:
   * x(t) = 1 - e^(-zeta * w0 * t) * cos(wd * t)
   * @param {Array<{timeMs: number, value: number}>} samples
   */
  fitSpring(samples) {
    if (!Array.isArray(samples) || samples.length === 0) {
      return { stiffness: 180, damping: 20, mass: 1, initialVelocity: 0 };
    }

    let maxVal = 0;
    let timePeak = 0;
    for (const s of samples) {
      if (s.value > maxVal) {
        maxVal = s.value;
        timePeak = s.timeMs / 1000; // segundos
      }
    }

    if (maxVal <= 1.0 || timePeak <= 0) {
      return { stiffness: 180, damping: 20, mass: 1, initialVelocity: 0 };
    }

    const overshoot = maxVal - 1.0;
    const lnOvershoot = Math.log(Math.max(0.001, overshoot));
    const zeta = Math.sqrt(Math.pow(lnOvershoot, 2) / (Math.PI ** 2 + Math.pow(lnOvershoot, 2)));
    const wd = Math.PI / timePeak;
    const w0 = wd / Math.max(0.01, Math.sqrt(Math.max(0.01, 1 - zeta ** 2)));

    const mass = 1.0;
    const stiffness = Math.round(mass * w0 ** 2);
    const damping = Math.round(2 * mass * zeta * w0);

    return {
      stiffness: Math.max(10, Math.min(1000, stiffness)),
      damping: Math.max(1, Math.min(100, damping)),
      mass,
      initialVelocity: 0
    };
  }

  /**
   * Regressão para estimar x1, y1, x2, y2 de cubic-bezier(x1, y1, x2, y2)
   * @param {Array<{timeMs: number, value: number}>} samples
   */
  fitBezier(samples) {
    let bestError = Infinity;
    let bestBezier = { x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0 };

    const candidates = [
      { x1: 0.0, y1: 0.0, x2: 0.2, y2: 1.0 }, // ease-out
      { x1: 0.4, y1: 0.0, x2: 0.2, y2: 1.0 }, // standard / smooth
      { x1: 0.16, y1: 1.0, x2: 0.3, y2: 1.0 }, // snappy / modern UI
      { x1: 0.25, y1: 0.1, x2: 0.25, y2: 1.0 } // default ease
    ];

    const maxTime = samples[samples.length - 1]?.timeMs || 1;

    for (const cand of candidates) {
      let currentError = 0;
      for (const s of samples) {
        const t = Math.max(0, Math.min(1, s.timeMs / maxTime));
        const bezierVal = this.evaluateCubicBezier(cand, t);
        currentError += Math.pow(bezierVal - s.value, 2);
      }

      if (currentError < bestError) {
        bestError = currentError;
        bestBezier = cand;
      }
    }

    return bestBezier;
  }

  evaluateCubicBezier(p, t) {
    const cy = 3 * p.y1;
    const by = 3 * (p.y2 - p.y1) - cy;
    const ay = 1 - cy - by;
    return ((ay * t + by) * t + cy) * t;
  }
}

module.exports = { MotionReverseEngine };
