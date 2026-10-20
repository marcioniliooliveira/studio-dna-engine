const { z } = require('zod');

/**
 * Registers interactive guided prompts onto the McpServer.
 * 
 * @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server
 */
function registerPrompts(server) {
  // 1. new_client_onboarding
  server.prompt(
    'new_client_onboarding',
    'Interactive guided flow for onboarding a new client website project from a reference skeleton',
    {
      brandName: z.string().describe('Nome da marca do cliente'),
      refSlug: z.string().optional().describe('Slug da referência no acervo (default: storeyarchitecture-co-uk)'),
      niche: z.string().optional().describe('Nicho de mercado do cliente'),
      toneOfVoice: z.string().optional().describe('Tom de voz do design e copy'),
      whatsapp: z.string().optional().describe('Número de WhatsApp para conversão')
    },
    async (args = {}) => {
      const brandName = args.brandName || 'Nova Marca';
      const refSlug = args.refSlug || 'storeyarchitecture-co-uk';
      const niche = args.niche || 'Geral / Premium';
      const toneOfVoice = args.toneOfVoice || 'Editorial Minimalist';
      const whatsapp = args.whatsapp || '';

      const systemInstructions = [
        'Você é o Agente Especialista em Onboarding e Transmutação de Clientes do Studio DNA Engine.',
        'Sua diretriz suprema é garantir fidelidade visual, isolamento ICM estrito (nenhuma alteração em copias/) e integridade determinística de layout.'
      ].join(' ');

      const userWorkflow = [
        `Objetivo: Criar e validar o projeto de produção para a marca "${brandName}".`,
        '',
        'Parâmetros Iniciais de Onboarding:',
        `- Nome da Marca: ${brandName}`,
        `- Referência Base: ${refSlug}`,
        `- Nicho de Mercado: ${niche}`,
        `- Tom de Voz: ${toneOfVoice}`,
        whatsapp ? `- WhatsApp / Contato: ${whatsapp}` : null,
        '',
        'Siga a sequência determinística ICM:',
        `1. Executar a tool \`create_client_project\` com brandName="${brandName}" e refSlug="${refSlug}".`,
        `2. Inspecionar o recurso \`client://{clientSlug}/slots\` para verificar os campos de copy necessários.`,
        `3. Atualizar o \`brand-spec.json\` via \`patch_brand_spec\` com nicho="${niche}", tom="${toneOfVoice}"${whatsapp ? `, whatsapp="${whatsapp}"` : ''}.`,
        '4. Executar a tool `transmute_client_site` para aplicar a transmutação determinística.',
        '5. Executar `run_unified_quality_gate` e `run_impeccable_gate` para garantir 0 erros de runtime e 0 anti-padrões visuais.'
      ].filter(Boolean).join('\n');

      return {
        description: 'Interactive guided flow for onboarding a new client website project from a reference skeleton',
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `[SYSTEM INSTRUCTIONS]\n${systemInstructions}\n\n[USER ONBOARDING PROMPT]\n${userWorkflow}`
            }
          }
        ]
      };
    }
  );

  // 2. fix_quality_gate_failure
  server.prompt(
    'fix_quality_gate_failure',
    'Interactive guided flow for investigating and resolving quality gate violations',
    {
      clientSlug: z.string().describe('Slug do cliente com falha de qualidade'),
      gateName: z.string().optional().describe('Nome do gate com falha (console, network, structural, antiSlop, impeccable, saliency)'),
      gateFailed: z.string().optional().describe('Alias para gateName'),
      errorDetails: z.string().optional().describe('Detalhes ou mensagem de erro observada'),
      failureDetails: z.string().optional().describe('Alias para errorDetails')
    },
    async (args = {}) => {
      const clientSlug = args.clientSlug || 'cliente-alvo';
      const gate = args.gateName || args.gateFailed || 'unknown';
      const details = args.errorDetails || args.failureDetails || 'Nenhum detalhe adicional fornecido';

      const systemInstructions = [
        'Você é o Agente Especialista em Triagem e Correção Cirúrgica de Quality Gates do Studio DNA Engine.',
        `Diretriz de Isolamento: Apenas repare defeitos em clientes/${clientSlug}/. Nunca altere referências em copias/.`,
        'Obedeça ao contrato de verdade: evidências frescas de execução são obrigatórias para atestar a correção.'
      ].join(' ');

      const userWorkflow = [
        `O cliente "${clientSlug}" apresentou falha no gate: "${gate}".`,
        `Detalhes da falha observada: ${details}`,
        '',
        'Protocolo de Reparo Cirúrgico:',
        `1. Ler o relatório completo em \`client://${clientSlug}/audit\`.`,
        `2. Se a falha for antiSlop: inspecionar \`client://${clientSlug}/slots\`, substituir resíduos ou metalinguagem e reexecutar \`transmute_client_site\`.`,
        '3. Se a falha for impeccable: remover dark-glows radioativos, desinchar nested-cards e trocar fontes proibidas por pares de `vault://typography`.',
        '4. Se a falha for saliency: aumentar contraste do CTA principal e reduzir saturação de halos periféricos.',
        '5. Executar `run_unified_quality_gate` para validar a reparação com evidências frescas.'
      ].join('\n');

      return {
        description: 'Interactive guided flow for investigating and resolving quality gate violations',
        messages: [
          {
            role: 'user',
            content: {
              type: 'text',
              text: `[SYSTEM INSTRUCTIONS]\n${systemInstructions}\n\n[REMEDIATION WORKFLOW]\n${userWorkflow}`
            }
          }
        ]
      };
    }
  );
}

module.exports = {
  registerPrompts
};
