/**
 * Studio DNA Engine — Procedural Clay Mock
 * Renderizador 3D paramétrico ultra-leve em Canvas 2D
 * Simula um frasco/embalagem 3D rotativo com iluminação realista e rótulo projetado
 */

class ProceduralClayMock {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.brandColor = options.brandColor || '#335C30';
    this.labelColor = options.labelColor || '#FFFFFF';
    this.labelText = options.labelText || 'STUDIO DNA';
    this.capFinish = options.capFinish || 'matte'; // 'matte' | 'metallic' | 'glass'
    this.rotationAngle = options.rotationAngle || 0; // 0..360 graus
    this.dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
  }

  setProps(props = {}) {
    if (props.brandColor) this.brandColor = props.brandColor;
    if (props.labelColor) this.labelColor = props.labelColor;
    if (props.labelText) this.labelText = props.labelText;
    if (props.capFinish) this.capFinish = props.capFinish;
    if (typeof props.rotationAngle === 'number') this.rotationAngle = props.rotationAngle;
  }

  render(bounds) {
    const { ctx, canvas } = this;
    const { drawX, drawY, targetWidth, targetHeight } = bounds;

    ctx.save();

    // 1. Sombra de Contato de Chão (Soft Ambient Contact Shadow)
    ctx.beginPath();
    const shadowX = drawX + targetWidth / 2;
    const shadowY = drawY + targetHeight - targetHeight * 0.04;
    const shadowRadiusX = targetWidth * 0.38;
    const shadowRadiusY = targetHeight * 0.05;
    const shadowGrad = ctx.createRadialGradient(
      shadowX, shadowY, 0,
      shadowX, shadowY, shadowRadiusX
    );
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.28)');
    shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.12)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = shadowGrad;
    ctx.ellipse(shadowX, shadowY, shadowRadiusX, shadowRadiusY, 0, 0, Math.PI * 2);
    ctx.fill();

    // Dimensões do corpo do produto
    const bodyW = targetWidth * 0.55;
    const bodyH = targetHeight * 0.72;
    const bodyX = drawX + (targetWidth - bodyW) / 2;
    const bodyY = drawY + targetHeight * 0.22;
    const cornerRadius = bodyW * 0.08;

    // 2. Corpo do Produto (Cilíndrico com Gradiente de Curvatura 3D)
    const bodyGrad = ctx.createLinearGradient(bodyX, 0, bodyX + bodyW, 0);
    // Simula curvatura esférica/cilíndrica de luz
    bodyGrad.addColorStop(0.0, this.adjustBrightness(this.brandColor, -35));
    bodyGrad.addColorStop(0.18, this.adjustBrightness(this.brandColor, 15)); // Luz de reflexo
    bodyGrad.addColorStop(0.40, this.brandColor);
    bodyGrad.addColorStop(0.85, this.adjustBrightness(this.brandColor, -25));
    bodyGrad.addColorStop(1.0, this.adjustBrightness(this.brandColor, -45));

    this.roundRect(ctx, bodyX, bodyY, bodyW, bodyH, cornerRadius);
    ctx.fillStyle = bodyGrad;
    ctx.fill();

    // 3. Rótulo Frontal com Projeção Cilíndrica
    const labelH = bodyH * 0.52;
    const labelY = bodyY + bodyH * 0.22;
    const labelW = bodyW * 0.94;
    const labelX = bodyX + (bodyW - labelW) / 2;

    const labelGrad = ctx.createLinearGradient(labelX, 0, labelX + labelW, 0);
    labelGrad.addColorStop(0.0, this.adjustBrightness(this.labelColor, -20));
    labelGrad.addColorStop(0.2, this.adjustBrightness(this.labelColor, 5));
    labelGrad.addColorStop(0.5, this.labelColor);
    labelGrad.addColorStop(0.85, this.adjustBrightness(this.labelColor, -15));
    labelGrad.addColorStop(1.0, this.adjustBrightness(this.labelColor, -30));

    this.roundRect(ctx, labelX, labelY, labelW, labelH, cornerRadius * 0.6);
    ctx.fillStyle = labelGrad;
    ctx.fill();

    // 4. Tipografia Dinâmica Estampada (Move-se conforme o ângulo de rotação)
    ctx.save();
    // Clip ao rótulo para não vazar
    this.roundRect(ctx, labelX, labelY, labelW, labelH, cornerRadius * 0.6);
    ctx.clip();

    ctx.fillStyle = this.adjustBrightness(this.brandColor, -40);
    ctx.font = `bold ${Math.round(bodyW * 0.12)}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Deslocamento X proporcional ao ângulo de rotação (efeito de carrossel no cilindro)
    const angleRad = (this.rotationAngle % 360) * (Math.PI / 180);
    const textOffsetX = Math.sin(angleRad) * (labelW * 0.42);
    const textScaleX = Math.cos(angleRad); // Encurtamento de perspectiva

    ctx.save();
    ctx.translate(labelX + labelW / 2 + textOffsetX, labelY + labelH * 0.45);
    ctx.scale(Math.max(0.1, Math.abs(textScaleX)), 1);
    if (textScaleX >= -0.2) {
      ctx.fillText(this.labelText, 0, 0);
    }
    ctx.restore();

    // Subtítulo descritivo
    ctx.font = `600 ${Math.round(bodyW * 0.055)}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.save();
    ctx.translate(labelX + labelW / 2 + textOffsetX * 0.8, labelY + labelH * 0.72);
    ctx.scale(Math.max(0.1, Math.abs(textScaleX)), 1);
    if (textScaleX >= -0.2) {
      ctx.fillText('DESIGN DNA • VERIFIED', 0, 0);
    }
    ctx.restore();
    ctx.restore();

    // 5. Tampa / Fechamento Superior (Cap)
    const capW = bodyW * 0.92;
    const capH = bodyH * 0.18;
    const capX = bodyX + (bodyW - capW) / 2;
    const capY = bodyY - capH * 0.85;

    const capGrad = ctx.createLinearGradient(capX, 0, capX + capW, 0);
    if (this.capFinish === 'metallic') {
      capGrad.addColorStop(0.0, '#777');
      capGrad.addColorStop(0.2, '#EEE');
      capGrad.addColorStop(0.4, '#BBB');
      capGrad.addColorStop(0.7, '#FFF');
      capGrad.addColorStop(1.0, '#555');
    } else if (this.capFinish === 'glass') {
      capGrad.addColorStop(0.0, 'rgba(255,255,255,0.4)');
      capGrad.addColorStop(0.3, 'rgba(255,255,255,0.9)');
      capGrad.addColorStop(0.7, 'rgba(200,230,255,0.6)');
      capGrad.addColorStop(1.0, 'rgba(255,255,255,0.3)');
    } else {
      // Matte finish
      capGrad.addColorStop(0.0, '#D5D5D5');
      capGrad.addColorStop(0.25, '#FFFFFF');
      capGrad.addColorStop(0.75, '#EEEEEE');
      capGrad.addColorStop(1.0, '#BBBBBB');
    }

    this.roundRect(ctx, capX, capY, capW, capH, cornerRadius * 0.5);
    ctx.fillStyle = capGrad;
    ctx.fill();

    ctx.restore();
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  adjustBrightness(hex, percent) {
    let num = parseInt(hex.replace('#', ''), 16);
    if (isNaN(num)) num = 0x335C30;
    let r = (num >> 16) + percent;
    let g = ((num >> 8) & 0x00FF) + percent;
    let b = (num & 0x0000FF) + percent;
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}

module.exports = {
  ProceduralClayMock
};
