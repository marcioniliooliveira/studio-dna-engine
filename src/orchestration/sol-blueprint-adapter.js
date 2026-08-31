const { parseBlueprintWire, blueprintWireJsonSchema } = require('./contracts');
const { validateBlueprint } = require('./blueprint-validator');

const DEFAULT_MODEL = 'gpt-5.6-sol';

class BlueprintOutputError extends Error {
  constructor(cause) {
    super('Sol returned an invalid blueprint output');
    this.name = 'BlueprintOutputError';
    this.code = 'BLUEPRINT_OUTPUT_INVALID';
    this.cause = cause;
  }
}

function outputText(response) {
  if (typeof response === 'string') return response;
  if (typeof response?.output_text === 'string') return response.output_text;

  const content = response?.output?.flatMap((item) => item.content || []) || [];
  const text = content.find((item) => item.type === 'output_text')?.text;
  if (typeof text === 'string') return text;

  throw new TypeError('Response does not contain output text');
}

function defaultPolicy(blueprint, runBudget) {
  return {
    allowedTools: new Set(blueprint.nodes.flatMap((node) => node.toolLabels)),
    allowedGates: new Set(blueprint.nodes.flatMap((node) => node.gates)),
    runBudgetUsd: runBudget.usd
  };
}

function createSolBlueprintAdapter({
  responsesClient,
  model = DEFAULT_MODEL,
  staticInstructions,
  blueprintPolicy,
  recordUsage
}) {
  if (!responsesClient || typeof responsesClient.create !== 'function') {
    throw new TypeError('responsesClient.create must be a function');
  }
  if (typeof staticInstructions !== 'string') {
    throw new TypeError('staticInstructions must be a string');
  }
  if (recordUsage !== undefined && typeof recordUsage !== 'function') {
    throw new TypeError('recordUsage must be a function');
  }

  return {
    async plan({ runId, clientId, contextManifest, runBudget }) {
      const dynamicInput = { rid: runId, cid: clientId, ctx: contextManifest, b: runBudget };
      const response = await responsesClient.create({
        model,
        input: [
          { role: 'developer', content: staticInstructions },
          { role: 'user', content: JSON.stringify(dynamicInput) }
        ],
        text: {
          format: {
            type: 'json_schema',
            name: 'blueprint_wire',
            strict: true,
            schema: blueprintWireJsonSchema
          }
        }
      });

      if (recordUsage) await recordUsage({ runId, clientId, model, usage: response.usage });

      try {
        const blueprint = parseBlueprintWire(JSON.parse(outputText(response)));
        return validateBlueprint(blueprint, blueprintPolicy || defaultPolicy(blueprint, runBudget));
      } catch (error) {
        throw new BlueprintOutputError(error);
      }
    }
  };
}

module.exports = { BlueprintOutputError, createSolBlueprintAdapter };
