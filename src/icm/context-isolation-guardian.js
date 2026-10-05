/**
 * ICM Context Isolation Guardian
 * Impede que agentes compiladores leiam copias/ e detecta vazamento de nomes proprietários.
 */

class ContextIsolationGuardian {
  constructor() {
    this.forbiddenTokens = new Set();
  }

  registerProtectedSourceIdentifiers(identifiers = []) {
    identifiers.forEach((id) => this.forbiddenTokens.add(id.toLowerCase()));
  }

  assertCompilerSandboxed(requestedPath = '') {
    const normalized = requestedPath.replace(/\\/g, '/');
    if (normalized.includes('/copias/')) {
      throw new Error(
        `[ICM VIOLATION]: Tentativa ilegal de acesso direto a 'copias/' pelo compilador. ` +
        `O compilador deve receber exclusivamente a representação intermediária ComponentDNA.`
      );
    }
  }

  auditSynthesizedOutput(fileContent = '') {
    const contentLower = fileContent.toLowerCase();
    const detected = [];

    this.forbiddenTokens.forEach((token) => {
      if (contentLower.includes(token)) {
        detected.push(token);
      }
    });

    return {
      safe: detected.length === 0,
      detectedTokens: detected
    };
  }
}

module.exports = { ContextIsolationGuardian };
