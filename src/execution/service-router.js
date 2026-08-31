const { createGeminiApiAdapter } = require('./gemini-api-adapter');
const { createGeminiIdeAdapter } = require('./gemini-ide-adapter');

function selectService(node) {
  if (!node || node.kind === 'fix' || node.kind === 'render' || (Array.isArray(node.dependencies) && node.dependencies.length > 0)) {
    return 'standard';
  }
  if ((node.kind !== 'extract' && node.kind !== 'verify') || node.needsInput === true
    || node.nonInteractive !== true || node.humanApprovalEdge === true) {
    return 'standard';
  }
  return node.service === 'batch' || node.service === 'flex' ? node.service : 'standard';
}

function createExecutionAdapters({
  environment = process.env, toolCatalog, exchangeDir, Gemini, createGeminiApiAdapter: apiFactory = createGeminiApiAdapter,
  createGeminiIdeAdapter: ideFactory = createGeminiIdeAdapter
} = {}) {
  const apiKey = environment.GEMINI_API_KEY;
  if (typeof apiKey !== 'string' || apiKey.length === 0) {
    return Object.freeze({ default: ideFactory({ exchangeDir }) });
  }
  const GoogleGenAI = Gemini || require('@google/genai').GoogleGenAI;
  const client = new GoogleGenAI({ apiKey });
  function forNode(node) {
    return apiFactory({ client, toolCatalog, service: selectService(node) });
  }
  return Object.freeze({ default: forNode(null), forNode });
}

module.exports = { selectService, createExecutionAdapters };
