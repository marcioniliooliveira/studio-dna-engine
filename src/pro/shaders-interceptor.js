/**
 * Script de inicialização injetado na página antes de carregar o DOM.
 * Intercepta chamadas de compilação de Shaders WebGL (Three.js, Pixi, OGL, WebGL puro).
 */
const WEBGL_INTERCEPTOR_SCRIPT = `
(function() {
  window.__EXTRACTED_SHADERS__ = window.__EXTRACTED_SHADERS__ || [];
  
  if (typeof WebGLRenderingContext !== 'undefined') {
    const originalShaderSource = WebGLRenderingContext.prototype.shaderSource;
    WebGLRenderingContext.prototype.shaderSource = function(shader, source) {
      try {
        const gl = this;
        const shaderType = gl.getShaderParameter(shader, gl.SHADER_TYPE);
        const typeStr = shaderType === gl.VERTEX_SHADER ? 'vertex' : shaderType === gl.FRAGMENT_SHADER ? 'fragment' : 'unknown';
        
        if (source && source.length > 30) {
          window.__EXTRACTED_SHADERS__.push({
            type: typeStr,
            source: source,
            timestamp: Date.now()
          });
        }
      } catch (e) {}
      return originalShaderSource.apply(this, arguments);
    };
  }

  if (typeof WebGL2RenderingContext !== 'undefined') {
    const originalShaderSource2 = WebGL2RenderingContext.prototype.shaderSource;
    WebGL2RenderingContext.prototype.shaderSource = function(shader, source) {
      try {
        const gl = this;
        const shaderType = gl.getShaderParameter(shader, gl.SHADER_TYPE);
        const typeStr = shaderType === gl.VERTEX_SHADER ? 'vertex' : shaderType === gl.FRAGMENT_SHADER ? 'fragment' : 'unknown';
        
        if (source && source.length > 30) {
          window.__EXTRACTED_SHADERS__.push({
            type: typeStr,
            source: source,
            timestamp: Date.now()
          });
        }
      } catch (e) {}
      return originalShaderSource2.apply(this, arguments);
    };
  }
})();
`;

module.exports = {
  WEBGL_INTERCEPTOR_SCRIPT
};
