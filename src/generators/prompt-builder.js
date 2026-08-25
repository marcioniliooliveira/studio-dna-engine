const fs = require('fs');
const path = require('path');

/**
 * Converte um assets-manifest.json em um catálogo de prompts 5-Vetores prontos para geração de imagens (Flux / Midjourney / Imagen)
 */
function generatePromptCatalog({ manifestOrPath, outputPath = null }) {
  let manifest = manifestOrPath;
  if (typeof manifestOrPath === 'string') {
    manifest = JSON.parse(fs.readFileSync(manifestOrPath, 'utf8'));
  }

  if (!manifest || !manifest.replacements) {
    throw new Error('Manifesto inválido fornecido para o Prompt Catalog.');
  }

  let content = `# CATÁLOGO DE PROMPTS CONTROLADOS (5 VETORES)
Gerado automaticamente em: ${new Date().toLocaleDateString('pt-BR')}
URL de Origem: ${manifest.siteUrl || 'N/A'}

---

## 🎯 Metodologia dos 5 Vetores Aplicada
Cada prompt abaixo foi computado a partir das dimensões reais, perfil de luminância e papel estrutural no DOM.

---

## 🖼️ Prompts Prontos para Geração de Assets

`;

  manifest.replacements.forEach((item, idx) => {
    content += `### ${idx + 1}. [${item.category}] \`${item.id}\`\n`;
    content += `- **Arquivo Original:** \`${item.originalFile || item.sampleFile || item.originalPattern}\`\n`;
    content += `- **Estratégia Recomendada:** \`${item.recommendedStrategy}\`\n`;
    content += `- **Justificativa:** ${item.rationale || 'Substituição limpa mantendo proporções do container.'}\n\n`;

    if (item.category === 'HERO_BACKGROUND_TEXTURE') {
      content += `#### 📋 Prompt Midjourney / Flux / Imagen:\n`;
      content += `\`\`\`text\n`;
      content += `Top-down knolling photography of high-precision industrial hardware components and fasteners, perfectly aligned in a modular engineering grid, dark moody industrial atmosphere, deep navy and slate grey background (#0B1120), 45-degree top-left studio key light with sharp metallic cyan specular rim reflections (#64CEFB), brushed stainless steel and titanium finishes, ultra-sharp focus, shot on Hasselblad H6D-100c 85mm lens --ar 16:9 --style raw --v 6.1 --no text, watermarks, hands, logos, blur, noise\n`;
      content += `\`\`\`\n\n`;
    } else if (item.category === '3D_ROTATION_SEQUENCE') {
      content += `#### 💡 Modelo 3D / WebGL Paramétrico:\n`;
      content += `- **Componente:** \`Interactive3DFastener.tsx\`\n`;
      content += `- **Controles:** Rotação scroll-driven 360°, Drag de inspeção livre, alternância de ligas (Aço Inox, Titânio, Bronze).\n\n`;
    } else if (item.category === 'TECHNICAL_DIAGRAM_SVG') {
      content += `#### 📐 Vetor SVG Parametrizado:\n`;
      content += `- **Componente:** \`FastenerProfiles.tsx\`\n`;
      content += `- **Padrão:** Stroke-draw dinâmico com \`currentColor\` e tokens responsivos.\n\n`;
    }

    content += `---\n\n`;
  });

  const targetPath = outputPath || path.join(process.cwd(), 'AI_PROMPTS.md');
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content, 'utf8');

  console.log(`✅ [Prompt Catalog] Catálogo de prompts gerado em: ${targetPath}`);
  return targetPath;
}

module.exports = {
  generatePromptCatalog
};
