/**
 * Studio DNA Engine — Stage Slot Adapter
 * Contrato e controlador universal para o palco de produtos (Clay / Sequence / Video)
 */

/**
 * Calcula a geometria de Safe-Zone para impedir colisões verticais com cabeçalhos/cards
 */
function calculateSafeZone({
  canvasWidth,
  canvasHeight,
  dpr = 1,
  assetWidth = 1000,
  assetHeight = 1000,
  maxHeightRatio = 0.58,
  bottomMarginRatio = 0.08
}) {
  const viewW = canvasWidth / dpr;
  const viewH = canvasHeight / dpr;

  // 1. Limita a altura do asset ao teto permitido
  const targetH = Math.round(viewH * maxHeightRatio);
  const aspect = assetWidth / assetHeight;
  const targetW = Math.round(targetH * aspect);

  // 2. Centraliza no eixo X
  const drawX = Math.round((viewW - targetW) / 2);

  // 3. Ancoragem na base com respiro inferior (preserva margem de topo para títulos)
  const bottomOffset = Math.round(viewH * bottomMarginRatio);
  const drawY = Math.round(viewH - targetH - bottomOffset);

  return {
    viewWidth: viewW,
    viewHeight: viewH,
    targetWidth: targetW,
    targetHeight: targetH,
    drawX,
    drawY,
    aspectRatio: aspect,
    topClearance: drawY
  };
}

/**
 * Mapeia o progresso linear do scroll (0.0 a 1.0) aos 4 momentos narrativos
 * evitando rotações cegas em momentos de leitura dos cards
 */
function remapProgressAngle(progress, duration = 10.0) {
  const p = Math.max(0, Math.min(1, progress));

  if (p < 0.25) {
    // Card 1: Entrada frontal e giro inicial suave
    const local = p / 0.25;
    return local * (duration * 0.25);
  } else if (p < 0.50) {
    // Card 2: Exibição lateral / ingredientes
    const local = (p - 0.25) / 0.25;
    return (duration * 0.25) + local * (duration * 0.25);
  } else if (p < 0.75) {
    // Card 3: Rotação posterior
    const local = (p - 0.50) / 0.25;
    return (duration * 0.50) + local * (duration * 0.25);
  } else {
    // Card 4 & Clímax: Retorno para a pose heróica
    const local = (p - 0.75) / 0.25;
    return (duration * 0.75) + local * (duration * 0.23);
  }
}

/**
 * Cria manifesto de configuração validado para o palco
 */
function createStageManifest(options = {}) {
  return {
    slug: options.slug || 'default-stage',
    mode: options.mode || 'clay', // 'clay' | 'sequence' | 'video'
    src: options.src || '',
    brandColor: options.brandColor || '#335C30',
    labelText: options.labelText || 'DNA STAGE',
    labelColor: options.labelColor || '#FFFFFF',
    safeZone: {
      maxHeightRatio: options.maxHeightRatio || 0.58,
      bottomMarginRatio: options.bottomMarginRatio || 0.08
    },
    motion: {
      scrub: options.scrub ?? 0.7,
      snap: options.snap || 'frame'
    }
  };
}

module.exports = {
  calculateSafeZone,
  remapProgressAngle,
  createStageManifest
};
