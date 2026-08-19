const fs = require('fs');
const path = require('path');

/**
 * Compila o arquivo MASTER_SPEC.md com especificações completas de IA
 */
function generateMasterSpec({ url, siteName, siteInfo, dna, uiUxData, outputPath }) {
  let modeNotice = '';
  if (siteInfo.cloneMode === 'DNA_ONLY') {
    modeNotice = `> ⚠️ **ATENÇÃO (MODO DNA EXTRACTOR)**: Este site foi identificado como **${siteInfo.framework}**. O HTML capturado não contém o DOM completo pois é renderizado via JavaScript no cliente. Utilize os dados de **Design DNA (cores, tipografia, seções)** e os **Snippets de UI/UX** para recriar o site do zero com componentes modernos.\n`;
  } else if (siteInfo.cloneMode === 'STRUCTURED_CLONE') {
    modeNotice = `> ℹ️ **NOTA**: Este site foi identificado como **${siteInfo.framework}**. O HTML clonado reflete a estrutura renderizada no servidor. Algumas interações dinâmicas requerem os snippets da pasta \`ui-ux/\`.\n`;
  }

  let content = `# MASTER DESIGN & DEV SPEC: ${siteName.toUpperCase()}
Data de Extração: ${new Date().toLocaleDateString('pt-BR')}
URL de Origem: ${url}

${modeNotice}
---

## 0. Identificação do Site
- **Framework / Plataforma**: ${siteInfo.framework}
- **Tipo de Renderização**: ${siteInfo.siteType}
- **Modo de Clonagem Aplicado**: ${siteInfo.cloneMode}
- **Capacidade / Fidelidade do Clone**: ~${siteInfo.cloneCapacity}%
${siteInfo.warning ? `- **Aviso**: ${siteInfo.warning}\n` : ''}
---

## 🎨 1. Design Tokens & Cores

\`\`\`css
`;
  if (dna && dna.colors && dna.colors.variables && Object.keys(dna.colors.variables).length > 0) {
    Object.entries(dna.colors.variables).forEach(([key, val]) => {
      content += `${key}: ${val};\n`;
    });
  } else {
    content += `/* Variáveis padrão da página */\n--background: #000000;\n--foreground: #ffffff;\n`;
  }
  content += `\`\`\`

---

## 🔤 2. Tipografia & Hierarquia Textual

`;
  if (dna && dna.typography) {
    Object.entries(dna.typography).forEach(([tag, info]) => {
      content += `- **${tag.toUpperCase()}**: Font: \`${info.fontFamily}\` | Size: \`${info.fontSize}\` | Weight: \`${info.fontWeight}\`\n`;
    });
  }

  content += `
---

## 🧩 3. Seções & Estrutura Mapeada
`;
  if (dna && dna.sections) {
    dna.sections.forEach((sec, idx) => {
      content += `${idx + 1}. **<${sec.tag}>** (id: \`${sec.id}\`) - Altura aprox: \`${sec.approxHeight}px\`\n`;
      if (sec.summaryText) content += `   *Resumo:* "${sec.summaryText.slice(0, 80)}..."\n`;
    });
  }

  content += `
---

## ⚡ 4. Particularidades UI/UX & Animações Extraídas

- **GSAP / ScrollTrigger**: ${uiUxData && uiUxData.gsap && uiUxData.gsap.detected ? 'DETECTADO ✅' : 'Não detectado'}
- **Lenis Smooth Scroll**: ${uiUxData && uiUxData.lenis && uiUxData.lenis.detected ? 'DETECTADO ✅' : 'Não detectado'}
- **Canvas / WebGL / Shaders**: ${uiUxData && uiUxData.webglCanvas && uiUxData.webglCanvas.canvasCount > 0 ? `${uiUxData.webglCanvas.canvasCount} Canvas encontrado(s) ✅` : 'Nenhum'}
- **Micro-interações (Magnetic/Spotlight/Tilt)**: ${uiUxData && uiUxData.microInteractions && (uiUxData.microInteractions.spotlightElements.length || uiUxData.microInteractions.magneticButtons.length) ? 'DETECTADO ✅' : 'Standard'}

---

## 🤖 Guia de Orientação para Agentes de IA

Para recriar um site novo ou componente baseado nesta referência:
1. Consulte a tabela de identificação (seção 0) para entender as limitações de fidelidade.
2. Aplique a paleta de cores e tipografia descritas nas seções 1 e 2.
3. Monte a estrutura semântica conforme a lista de seções na seção 3.
4. Importe os snippets da pasta \`ui-ux/snippets/\` para adicionar as animações de ponta e interações.
`;

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, 'utf8');
  return outputPath;
}

module.exports = {
  generateMasterSpec
};
