const fs = require('fs');
const path = require('path');

/**
 * Motor de Geração de Prompts com Fronteiras Rígidas (Boundary-Enforced Prompting)
 * Garante que a IA atue estritamente no Estágio 03 do ICM sem gerar AI Slop e sem corromper código.
 */

/**
 * @typedef {Object} BrandSpec
 * @property {string} targetBrandName Nome da nova marca / cliente
 * @property {string} niche Ramo de atuação / nicho (ex: "SaaS de Automação Logística")
 * @property {string} toneOfVoice Tom de voz (ex: "Corporativo, inovador, futurista")
 * @property {string} [primaryColor] Cor primária desejada em Hex (ex: "#00E5FF")
 * @property {string} [secondaryColor] Cor secundária em Hex (ex: "#0F172A")
 * @property {string} [specialInstructions] Instruções adicionais específicas
 */

/**
 * Gera o arquivo prompt.md com fronteiras rígidas para o Estágio 03
 * @param {Object} params
 * @param {string} params.outputDir Diretório do estágio 03 (ex: copias/site/03-translation)
 * @param {Object} params.semanticManifest JSON com textos e tokens originais extraídos no Estágio 02
 * @param {BrandSpec} params.brandSpec Especificações da nova marca
 */
function generateTranslationPrompt({ outputDir, semanticManifest, brandSpec }) {
  fs.mkdirSync(outputDir, { recursive: true });

  const inputJsonString = JSON.stringify(semanticManifest, null, 2);

  const promptContent = `# ESTÁGIO 03 (ICM): TRADUÇÃO E DESCARACTERIZAÇÃO SEMÂNTICA

> **PAPEL DO AGENTE:** Você é um Motor de Redação Publicitária e Descaracterização Semântica de Alta Precisão.
> Sua única função é reescrever os textos e valores de tokens de design mantendo 100% da integridade estrutural das chaves.

---

## 🎯 BRIEFING DA NOVA MARCA
- **Nome da Marca:** ${brandSpec.targetBrandName}
- **Nicho de Mercado:** ${brandSpec.niche}
- **Tom de Voz:** ${brandSpec.toneOfVoice}
${brandSpec.primaryColor ? `- **Cor Primária Sugerida:** ${brandSpec.primaryColor}` : ''}
${brandSpec.secondaryColor ? `- **Cor Secundária Sugerida:** ${brandSpec.secondaryColor}` : ''}
${brandSpec.specialInstructions ? `- **Instruções Adicionais:** ${brandSpec.specialInstructions}` : ''}

---

## 🛑 REGRAS RESTRITIVAS INVIOLÁVEIS (ZERO AI SLOP)

1. **PROIBIÇÃO TOTAL DE CÓDIGO:**
   - NÃO retorne código HTML, JavaScript, TypeScript, CSS ou blocos de componentes React.
   - NÃO adicione explicações introdutórias ("Aqui está o seu JSON...") nem notas de rodapé.

2. **BLOQUEIO DE ESQUEMA JSON (SCHEMA LOCK):**
   - Responda ESTRITAMENTE com um único bloco de código JSON válido (\`\`\`json ... \`\`\`).
   - TODAS as chaves originais (\`id\`, \`key\`, \`section\`, \`type\`, etc.) DEVEM ser preservadas exatamente como na entrada.

3. **PRESERVAÇÃO GEOMÉTRICA DE CARACTERES (LENGTH RULE):**
   - Para cada título (\`headline\`) e subtítulo, mantenha o comprimento do texto com **variação máxima de ±15%** em relação ao original.
   - *Motivo:* Textos muito longos ou muito curtos quebram a geometria calculada de animações GSAP e o layout visual.

4. **SUBSTITUIÇÃO TOTAL DE MARCA:**
   - Nenhuma menção à marca ou produto do site de referência original deve sobrar no JSON final.

---

## 📥 DADOS DE ENTRADA (MANIFESTO SEMÂNTICO ORIGINAL)

\`\`\`json
${inputJsonString}
\`\`\`

---

## 📤 SUA RESPOSTA:
Retorne única e exclusivamente o bloco JSON preenchido com a nova copy e tokens.
`;

  const promptPath = path.join(outputDir, 'prompt.md');
  const inputManifestPath = path.join(outputDir, 'input_strings.json');

  fs.writeFileSync(promptPath, promptContent, 'utf-8');
  fs.writeFileSync(inputManifestPath, inputJsonString, 'utf-8');

  console.log(`📝 [Prompt-Engine] Prompt blindado gerado com sucesso em: ${promptPath}`);
  return { promptPath, inputManifestPath };
}

/**
 * Valida a resposta da IA para garantir conformidade antes de passar para o Injetor (Estágio 04)
 * @param {string} rawAiResponse Texto cru devolvido pela IA
 * @param {Object} originalManifest Manifesto original para comparação de chaves
 * @returns {{ valid: boolean; data?: Object; errors: string[] }}
 */
function validateAiTranslationResponse(rawAiResponse, originalManifest) {
  const errors = [];
  let parsedJson = null;

  try {
    const jsonMatch = rawAiResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, rawAiResponse];
    const jsonStr = (jsonMatch[1] || rawAiResponse).trim();
    parsedJson = JSON.parse(jsonStr);
  } catch (e) {
    errors.push(`Falha ao fazer parse do JSON retornado pela IA: ${e.message}`);
    return { valid: false, errors };
  }

  // Verifica chaves de topo
  const originalKeys = Object.keys(originalManifest);
  for (const k of originalKeys) {
    if (!(k in parsedJson)) {
      errors.push(`Chave obrigatória ausente no retorno da IA: "${k}"`);
    }
  }

  return {
    valid: errors.length === 0,
    data: parsedJson,
    errors
  };
}

module.exports = {
  generateTranslationPrompt,
  validateAiTranslationResponse
};
