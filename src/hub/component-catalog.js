/**
 * Hub Component Catalog
 * Catálogo centralizado que indexa e disponibiliza todos os 8 arquétipos canônicos do Design Vault
 * e os 4 fixtures de referência (ComponentDNA), materializando seus artefatos React TSX e Hub GenUI v1.
 */

const fs = require('node:fs');
const path = require('node:path');
const { CleanRoomCompiler } = require('../generators/clean-room-compiler');
const { UnifiedCRPQualityGates } = require('../qa/unified-crp-quality-gates');
const { ReferenceAdoptionRegistry } = require('./adoption-registry');
const { StudioToHubExporter } = require('./hub-exporter');

const ROOT_DIR = path.resolve(__dirname, '../..');
const ARCHETYPES_DIR = path.join(ROOT_DIR, 'design-vault/components/archetypes');
const SYNTHESIZED_DIR = path.join(ROOT_DIR, 'design-vault/components/synthesized');

const REFERENCE_FIXTURES = [
  { id: 'planes-ai-chat-01', archetypeId: 'ConversationalShell', path: 'copias/planes/chat/dna.json' },
  { id: 'arc-agent-run-01', archetypeId: 'ExecutionTimeline', path: 'copias/arc/agent-run/dna.json' },
  { id: 'bui-approval-card-01', archetypeId: 'ApprovalGate', path: 'copias/beautiful-ui/approval-card/dna.json' },
  { id: 'carolinaraulino-draggable-widget-grid', archetypeId: 'DraggableWidgetGrid', path: 'copias/21st-dev/draggable-widget-grid/dna.json' }
];

class HubComponentCatalog {
  constructor() {
    this.compiler = new CleanRoomCompiler();
    this.gates = new UnifiedCRPQualityGates();
    this.registry = new ReferenceAdoptionRegistry();
    this.exporter = new StudioToHubExporter();
  }

  /**
   * Lista todos os 8 arquétipos canônicos disponíveis no Design Vault
   */
  listArchetypes() {
    if (!fs.existsSync(ARCHETYPES_DIR)) return [];
    const files = fs.readdirSync(ARCHETYPES_DIR).filter((f) => f.endsWith('.archetype.json'));
    return files.map((file) => {
      const fullPath = path.join(ARCHETYPES_DIR, file);
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
      return {
        archetypeId: data.archetypeId,
        purpose: data.purpose || data.description,
        states: data.stateContract?.states || data.canonicalStates || [],
        slots: (data.canonicalAnatomy?.slots || data.mandatorySlots || []).map((s) =>
          typeof s === 'string' ? s : s.name || s.role
        ),
        filePath: fullPath,
        raw: data
      };
    });
  }

  /**
   * Lista todas as 4 referências de ComponentDNA capturadas
   */
  listReferenceFixtures() {
    return REFERENCE_FIXTURES.map((ref) => {
      const fullPath = path.join(ROOT_DIR, ref.path);
      const exists = fs.existsSync(fullPath);
      const dna = exists ? JSON.parse(fs.readFileSync(fullPath, 'utf-8')) : null;
      return {
        ...ref,
        fullPath,
        exists,
        dna
      };
    });
  }

  /**
   * Materializa todos os 8 componentes canônicos em design-vault/components/synthesized/
   * gerando .tsx, .genui.json e catalog-manifest.json prontos para importação direta.
   */
  materializeAllToDisk() {
    fs.mkdirSync(SYNTHESIZED_DIR, { recursive: true });
    const archetypes = this.listArchetypes();
    const fixtures = this.listReferenceFixtures();
    const manifestEntries = [];

    for (const arch of archetypes) {
      const matchingFixture = fixtures.find((f) => f.archetypeId === arch.archetypeId && f.dna);
      const dnaSource = matchingFixture
        ? {
            ...matchingFixture.dna,
            identity: {
              ...matchingFixture.dna.identity,
              semanticName: arch.archetypeId,
              suggestedArchetype: arch.archetypeId
            }
          }
        : {
            identity: {
              id: `vault-${arch.archetypeId.toLowerCase()}`,
              semanticName: arch.archetypeId,
              suggestedArchetype: arch.archetypeId
            },
            provenance: { corpusHash: 'vault-canonical-seed' },
            tokens: {
              colorRoles: {
                surface: '#09090b',
                cellSurface: '#18181b',
                dragActiveRing: '#6366f1',
                dropPlaceholder: 'rgba(99, 102, 241, 0.12)'
              },
              radius: '16px'
            },
            stateMachine: {
              initialState: arch.states[0] || 'idle',
              states: arch.states.length > 0 ? arch.states : ['idle', 'active']
            },
            anatomy: {
              rootRole: `${arch.archetypeId}Root`,
              subcomponents: arch.slots.map((slot) => ({ role: slot, optional: false }))
            },
            accessibilityContract: {
              ariaRole: arch.raw.accessibilityStandard?.ariaRole || arch.raw.accessibilityContract?.role || 'region'
            }
          };

      const tsxCode = this.compiler.compileToReact({ dna: dnaSource });
      const genUiSpec = this.compiler.compileToHubGenUISpec({ dna: dnaSource });

      const tsxPath = path.join(SYNTHESIZED_DIR, `${arch.archetypeId}.tsx`);
      const genUiPath = path.join(SYNTHESIZED_DIR, `${arch.archetypeId}.genui.json`);

      fs.writeFileSync(tsxPath, tsxCode, 'utf-8');
      fs.writeFileSync(genUiPath, JSON.stringify(genUiSpec, null, 2), 'utf-8');

      manifestEntries.push({
        archetypeId: arch.archetypeId,
        sourceDnaId: dnaSource.identity?.id || dnaSource.identity?.componentId,
        statesCount: (dnaSource.stateMachine?.states || []).length,
        slotsCount: arch.slots.length,
        tsxFile: `design-vault/components/synthesized/${arch.archetypeId}.tsx`,
        genUiFile: `design-vault/components/synthesized/${arch.archetypeId}.genui.json`
      });
    }

    const manifestPath = path.join(SYNTHESIZED_DIR, 'catalog-manifest.json');
    const manifest = {
      catalogVersion: '1.0.0',
      generatedAt: new Date().toISOString(),
      totalComponents: manifestEntries.length,
      components: manifestEntries
    };
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');

    return manifest;
  }

  /**
   * Recupera um componente completo pelo archetypeId (ex: 'DraggableWidgetGrid', 'ApprovalGate')
   */
  getComponent(archetypeId) {
    const tsxPath = path.join(SYNTHESIZED_DIR, `${archetypeId}.tsx`);
    const genUiPath = path.join(SYNTHESIZED_DIR, `${archetypeId}.genui.json`);
    if (!fs.existsSync(tsxPath) || !fs.existsSync(genUiPath)) {
      this.materializeAllToDisk();
    }
    if (!fs.existsSync(tsxPath)) {
      throw new Error(`HubComponentCatalog: Componente ${archetypeId} não encontrado`);
    }
    return {
      archetypeId,
      tsxPath,
      genUiPath,
      reactTsx: fs.readFileSync(tsxPath, 'utf-8'),
      genUiSpec: JSON.parse(fs.readFileSync(genUiPath, 'utf-8'))
    };
  }
}

module.exports = { HubComponentCatalog };
