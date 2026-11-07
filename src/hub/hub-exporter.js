/**
 * Studio-to-Hub Exporter
 * Empacota componentes certificados (React TSX + Hub GenUI Spec + Tokens + Runtime Contract + Certificado SHA-256)
 * prontos para consumo direto pelo Hub Agent.
 */

const crypto = require('node:crypto');
const { CleanRoomCompiler } = require('../generators/clean-room-compiler');
const { HubTokenAndAssetBridge } = require('./token-and-asset-bridge');

class StudioToHubExporter {
  constructor() {
    this.compiler = new CleanRoomCompiler();
    this.tokenBridge = new HubTokenAndAssetBridge();
  }

  /**
   * Gera um pacote completo e assinado para o Hub Agent
   * @param {{
   *   dna: any,
   *   certificationRecord: any,
   *   adoptionDecision: any,
   *   svgAssets?: Record<string, string>
   * }} input
   */
  exportComponentBundle(input) {
    const { dna, certificationRecord, adoptionDecision, svgAssets = {} } = input;
    if (!dna) {
      throw new Error('StudioToHubExporter: ComponentDNA obrigatório');
    }
    const verdict = certificationRecord?.verdict || certificationRecord?.overallVerdict;
    const certId = certificationRecord?.certificateId || certificationRecord?.certificationId;

    if (!certificationRecord || verdict !== 'CERTIFIED') {
      throw new Error('StudioToHubExporter: Apenas componentes CERTIFIED podem ser exportados para o Hub');
    }
    if (!adoptionDecision || adoptionDecision.decision === 'REJECT') {
      throw new Error('StudioToHubExporter: Componente sem decisão de adoção ativa');
    }

    const reactTsx = this.compiler.compileToReact({ dna });
    const genUiSpec = this.compiler.compileToHubGenUISpec({ dna });
    const hubTokens = this.tokenBridge.mapTokensToHubVariables(dna);

    const sanitizedAssets = {};
    for (const [assetName, rawSvg] of Object.entries(svgAssets)) {
      sanitizedAssets[assetName] = this.tokenBridge.sanitizeSvgAsset(rawSvg);
    }

    const compId = dna.componentId || dna.identity?.id || dna.identity?.componentId || 'unknown-component';

    const bundlePayload = JSON.stringify({
      componentId: compId,
      archetypeRef: genUiSpec.archetypeRef,
      reactTsx,
      genUiSpec,
      hubTokens: hubTokens.variables,
      sanitizedAssets,
      certificationId: certId
    });

    const bundleHash = `sha256:${crypto.createHash('sha256').update(bundlePayload).digest('hex')}`;

    return {
      bundleVersion: 'hub.bundle.v1',
      componentId: compId,
      archetypeRef: genUiSpec.archetypeRef,
      adoptionMode: adoptionDecision.decision,
      reactTsx,
      genUiSpec,
      hubTokens,
      sanitizedAssets,
      runtimeContract: genUiSpec.runtimeBinding,
      certification: {
        certificationId: certId,
        overallVerdict: verdict,
        bundleHash
      }
    };
  }
}

module.exports = { StudioToHubExporter };
