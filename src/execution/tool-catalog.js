const SAFE_TOOL_IDS = new Set([
  'context.summary',
  'context.symbol',
  'context.lines',
  'patch.apply',
  'test.focused',
  'qa.core'
]);

function toolError(code, message) {
  const error = new Error(message);
  error.code = code;
  return error;
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function assertSchema(schema) {
  if (!schema || schema.type !== 'object' || !schema.properties || Array.isArray(schema.properties)
    || schema.additionalProperties !== false) {
    throw toolError('TOOL_SCHEMA_INVALID', 'Tool input schema must be a strict object JSON schema');
  }
  if (schema.required !== undefined && (!Array.isArray(schema.required)
    || !schema.required.every((key) => typeof key === 'string' && Object.hasOwn(schema.properties, key)))) {
    throw toolError('TOOL_SCHEMA_INVALID', 'Tool schema required fields must be declared properties');
  }
}

function assertDefinition(definition) {
  if (!definition || !SAFE_TOOL_IDS.has(definition.id)) {
    throw toolError('TOOL_ID_UNSAFE', 'Tool ID is not in the fixed safe catalog');
  }
  if (typeof definition.description !== 'string' || definition.description.length === 0
    || typeof definition.handler !== 'function') {
    throw toolError('TOOL_DEFINITION_INVALID', 'Tool definitions require a description and local handler');
  }
  assertSchema(definition.inputSchema);
}

function isSafePath(value) {
  return typeof value === 'string'
    && value.length > 0
    && !value.includes('\\')
    && !value.startsWith('/')
    && !value.split('/').includes('..');
}

function validateValue(value, schema) {
  if (!schema || typeof schema !== 'object') return true;
  if (schema.enum && (!Array.isArray(schema.enum) || !schema.enum.includes(value))) return false;
  if (schema.type === 'string') {
    return typeof value === 'string'
      && (schema.minLength === undefined || value.length >= schema.minLength)
      && (schema.maxLength === undefined || value.length <= schema.maxLength)
      && (schema.pattern === undefined || new RegExp(schema.pattern).test(value));
  }
  if (schema.type === 'integer') return Number.isInteger(value);
  if (schema.type === 'number') return typeof value === 'number' && Number.isFinite(value);
  if (schema.type === 'boolean') return typeof value === 'boolean';
  if (schema.type === 'array') return Array.isArray(value) && value.every((item) => validateValue(item, schema.items));
  if (schema.type === 'object') return validateArguments(value, schema);
  return false;
}

function validateArguments(args, schema) {
  if (!args || typeof args !== 'object' || Array.isArray(args)) return false;
  const properties = schema.properties;
  const required = schema.required || [];
  if (required.some((key) => !Object.hasOwn(args, key))) return false;
  if (schema.additionalProperties === false && Object.keys(args).some((key) => !Object.hasOwn(properties, key))) return false;
  return Object.entries(args).every(([key, value]) => !Object.hasOwn(properties, key) || validateValue(value, properties[key]));
}

function scopedPaths(args) {
  const values = [];
  for (const key of ['path', 'file', 'relativePath', 'targetPath']) {
    if (Object.hasOwn(args, key)) values.push(args[key]);
  }
  if (Object.hasOwn(args, 'paths')) values.push(...args.paths);
  return values;
}

function assertScope(toolId, args, taskScope) {
  const toolIds = taskScope && (taskScope.toolIds || taskScope.tl);
  const allowedPaths = taskScope && (taskScope.allowedPaths || taskScope.p);
  if (!Array.isArray(toolIds) || !toolIds.includes(toolId)) {
    throw toolError('TOOL_UNDECLARED', 'Tool is not declared by the active task package');
  }
  if (!Array.isArray(allowedPaths)) {
    throw toolError('TOOL_SCOPE_INVALID', 'Task scope must declare allowed paths');
  }
  const allowed = new Set(allowedPaths);
  for (const candidate of scopedPaths(args)) {
    if (!isSafePath(candidate) || !allowed.has(candidate)) {
      throw toolError('TOOL_PATH_FORBIDDEN', 'Tool path is outside the active task scope');
    }
  }
}

function createToolCatalog(definitions) {
  if (!Array.isArray(definitions)) throw toolError('TOOL_CATALOG_INVALID', 'Tool definitions must be an array');
  const registry = new Map();
  for (const definition of definitions) {
    assertDefinition(definition);
    if (registry.has(definition.id)) throw toolError('TOOL_DUPLICATE_ID', 'Tool IDs must be unique');
    registry.set(definition.id, {
      id: definition.id,
      description: definition.description,
      inputSchema: cloneJson(definition.inputSchema),
      handler: definition.handler
    });
  }

  function resolve(toolIds) {
    if (!Array.isArray(toolIds) || new Set(toolIds).size !== toolIds.length) {
      throw toolError('TOOL_RESOLUTION_INVALID', 'Requested tool IDs must be a unique array');
    }
    return toolIds.slice().sort().map((toolId) => {
      const definition = registry.get(toolId);
      if (!definition) throw toolError('TOOL_UNKNOWN', 'Tool is not registered');
      return Object.freeze({ v: 1, id: definition.id, description: definition.description, inputSchema: cloneJson(definition.inputSchema) });
    });
  }

  async function invoke(toolId, args, taskScope) {
    const definition = registry.get(toolId);
    if (!definition) throw toolError('TOOL_UNKNOWN', 'Tool is not registered');
    if (!validateArguments(args, definition.inputSchema)) {
      throw toolError('TOOL_ARGUMENTS_INVALID', 'Tool arguments do not match the declared schema');
    }
    assertScope(toolId, args, taskScope);
    return definition.handler(args, taskScope);
  }

  return Object.freeze({
    resolve,
    invoke,
    definitionBytes(toolIds) {
      return Buffer.byteLength(JSON.stringify(resolve(toolIds)), 'utf8');
    }
  });
}

module.exports = { createToolCatalog };
