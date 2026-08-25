const fs = require('fs');
const path = require('path');

/**
 * Analisa os assets de um site clonado ou capturado e gera o ASSETS_MANIFEST.json
 * Mapeando cada asset proprietário para sua estratégia ideal de substituição limpa (3D, IA, SVG procedural)
 */
function generateAssetManifest({ siteDir, siteUrl = '', outputPath = null }) {
  const assetsDir = path.join(siteDir, 'assets');
  const manifest = {
    generatedAt: new Date().toISOString(),
    siteUrl,
    summary: {
      totalAssetsFound: 0,
      imageSequencesDetected: 0,
      heroBackgroundsDetected: 0,
      technicalSvgsDetected: 0,
      brandAssetsDetected: 0
    },
    replacements: []
  };

  if (!fs.existsSync(siteDir)) {
    throw new Error(`Diretório do site não encontrado: ${siteDir}`);
  }

  // 1. Detectar sequências de imagens numéricas (Flipbooks / 360 Spinners como 67052_00000.webp)
  const allFiles = [];
  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else {
        allFiles.push({
          fullPath,
          fileName: entry.name,
          relPath: path.relative(siteDir, fullPath).replace(/\\/g, '/')
        });
      }
    }
  }
  scanDir(siteDir);

  // Agrupar arquivos por padrão de sequência (prefix_00000.ext)
  const sequenceGroups = {};
  const singleAssets = [];

  for (const file of allFiles) {
    const match = file.fileName.match(/^([a-zA-Z0-9_\-]+?)_?(\d{4,5})\.(webp|png|jpg|jpeg)$/i);
    if (match) {
      const prefix = match[1];
      if (!sequenceGroups[prefix]) sequenceGroups[prefix] = [];
      sequenceGroups[prefix].push(file);
    } else {
      singleAssets.push(file);
    }
  }

  // 2. Mapear Grupos de Sequência -> Estratégia: 3D Canvas / Three.js
  for (const [prefix, files] of Object.entries(sequenceGroups)) {
    if (files.length >= 5) {
      manifest.summary.imageSequencesDetected++;
      manifest.replacements.push({
        id: `sequence_${prefix}`,
        category: "3D_ROTATION_SEQUENCE",
        detectedFramesCount: files.length,
        originalPattern: `${prefix}_XXXXX.webp`,
        sampleFile: files[0].relPath,
        recommendedStrategy: "THREEJS_PROCEDURAL_OR_GLTF",
        rationale: "Substituição por modelo 3D em tempo real amarrado ao scroll (Zero copyright, 60 FPS e iluminação customizável)",
        componentSuggestion: "Interactive3DViewer.tsx",
        cleanParameters: {
          material: "stainless_steel_or_titanium",
          rotationAxis: "Y",
          scrollDriven: true,
          interactiveMouseTilt: true
        }
      });
    } else {
      // Menos de 5 frames: trata como imagens normais
      singleAssets.push(...files);
    }
  }

  // 3. Mapear Imagens Individuais e SVGs
  for (const file of singleAssets) {
    const ext = path.extname(file.fileName).toLowerCase();
    const name = file.fileName.toLowerCase();

    // Knolling / Backgrounds de grande escala
    if (name.includes('knolling') || name.includes('texture') || name.includes('banner') || name.includes('cover') || name.includes('hero')) {
      manifest.summary.heroBackgroundsDetected++;
      manifest.replacements.push({
        id: `bg_${path.parse(name).name}`,
        category: "HERO_BACKGROUND_TEXTURE",
        originalFile: file.relPath,
        recommendedStrategy: "AI_GENERATED_IMAGE_OR_PROCEDURAL_CSS",
        rationale: "Substituir por fotografia gerada por IA com a mesma proporção e paleta, ou canvas procedural",
        suggestedAiPrompt: `Top-down knolling photography of modern industrial technology components, studio lighting, deep metallic tones, dark cyan accents, clean composition, 16:9 ratio, ultra-detailed.`
      });
    }
    // Ícones e Perfis Técnicos (SVGs)
    else if (ext === '.svg') {
      if (name.includes('logo')) {
        manifest.summary.brandAssetsDetected++;
        manifest.replacements.push({
          id: `brand_${path.parse(name).name}`,
          category: "BRAND_LOGO",
          originalFile: file.relPath,
          recommendedStrategy: "CUSTOM_COMPANY_BRANDING",
          rationale: "Substituir pelo logotipo da sua empresa mantendo o container e animações de entrada"
        });
      } else {
        manifest.summary.technicalSvgsDetected++;
        manifest.replacements.push({
          id: `icon_${path.parse(name).name}`,
          category: "TECHNICAL_DIAGRAM_SVG",
          originalFile: file.relPath,
          recommendedStrategy: "CLEAN_LUCIDE_OR_PROCEDURAL_SVG",
          rationale: "Replicar os traços geométricos em SVG limpo e parametrizado com suporte a temas dark/light"
        });
      }
    }
  }

  manifest.summary.totalAssetsFound = manifest.replacements.length;

  const targetPath = outputPath || path.join(siteDir, 'assets-manifest.json');
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, JSON.stringify(manifest, null, 2), 'utf8');

  console.log(`✅ [Asset Manifest Generator] Manifesto gerado com sucesso em: ${targetPath}`);
  return manifest;
}

module.exports = {
  generateAssetManifest
};
