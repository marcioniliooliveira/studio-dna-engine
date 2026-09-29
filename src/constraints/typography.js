/**
 * C1 Constraint: Typography ↔ SafeArea Containment
 * Computes bounding box metrics and compensates font size / wrap balance when content threatens container safe area.
 */
function resolveTypographySafeArea(text, fontSizePx = 36, containerWidthPx = 320, maxCh = 22) {
  if (typeof text !== 'string') text = '';
  
  const charCount = text.length;
  // In typical sans-serif proportional fonts, 1ch average width ~ 0.55em to 0.6em
  const approxChPx = fontSizePx * 0.58;
  const singleLineWidth = charCount * approxChPx;
  
  // Theoretical number of lines needed given maxCh
  const linesNeeded = Math.ceil(charCount / maxCh);
  const totalHeight = linesNeeded * (fontSizePx * 1.25);
  
  // Max lines before overflowing standard hero safe area (typically 3-4 lines max)
  const maxSafeLines = 4;
  const isOverflowing = linesNeeded > maxSafeLines || (charCount > maxCh && singleLineWidth > containerWidthPx * maxSafeLines);

  if (isOverflowing || charCount > maxCh * 2) {
    // Calculate compensated font size down to minimum safe scale (14px)
    const compressionRatio = Math.min(1.0, (maxCh * maxSafeLines) / Math.max(1, charCount));
    const rawCompensated = Math.floor(fontSizePx * Math.pow(compressionRatio, 0.65));
    const compensatedFontSizePx = Math.max(14, rawCompensated);

    return {
      compensated: true,
      originalFontSizePx: fontSizePx,
      compensatedFontSizePx,
      linesNeeded,
      recommendedWrap: 'balance',
      overflowRisk: 'mitigated'
    };
  }

  return {
    compensated: false,
    originalFontSizePx: fontSizePx,
    compensatedFontSizePx: fontSizePx,
    linesNeeded,
    recommendedWrap: 'normal',
    overflowRisk: 'none'
  };
}

module.exports = { resolveTypographySafeArea };
