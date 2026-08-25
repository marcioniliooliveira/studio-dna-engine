const { ADVANCED_PRELOAD_SNIFFER_SCRIPT } = require('./advanced-asset-interceptor');

/**
 * Script de inicialização injetado na página antes de carregar o DOM.
 * Intercepta chamadas de compilação de Shaders WebGL, Canvas Contexts e Blobs efêmeros.
 */
const WEBGL_INTERCEPTOR_SCRIPT = ADVANCED_PRELOAD_SNIFFER_SCRIPT;

module.exports = {
  WEBGL_INTERCEPTOR_SCRIPT,
  ADVANCED_PRELOAD_SNIFFER_SCRIPT
};
