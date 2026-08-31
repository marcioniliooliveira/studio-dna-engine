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
  for (const child of Object.values(schema.properties)) {
    if (child && child.type === 'object') assertSchema(child);
    if (child && child.type === 'array' && child.items && child.items.type === 'object') assertSchema(child.items);
  }
}

function schemaAtPath(schema, selector) {
  let current = schema;
  for (const segment of selector.split('.')) {
    if (!current || current.type !== 'object' || !Object.hasOwn(current.properties, segment)) return null;
    current = current.properties[segment];
  }
  return current;
}

function collectPathBearingSelectors(schema, prefix = []) {
  return Object.entries(schema.properties).flatMap(([key, child]) => {
    const selector = [...prefix, key];
    const nested = child && child.type === 'object'
      ? collectPathBearingSelectors(child, selector)
      : [];
    return (/(path|file)/i.test(key) ? [selector.join('.')] : []).concat(nested);
  });
}

function assertPathFields(schema, pathFields) {
  if (!Array.isArray(pathFields) || pathFields.length === 0 || new Set(pathFields).size !== pathFields.length
    || !pathFields.every((selector) => typeof selector === 'string' && selector.length > 0)) {
    throw toolError('TOOL_PATH_SCHEMA_INVALID', 'Tools require unique declared path fields');
  }
  for (const selector of pathFields) {
    const field = schemaAtPath(schema, selector);
    const isString = field && field.type === 'string';
    const isStringArray = field && field.type === 'array' && field.items && field.items.type === 'string';
    if (!isString && !isStringArray) {
      throw toolError('TOOL_PATH_SCHEMA_INVALID', 'Declared path fields must resolve to string values');
    }
  }
  const declared = new Set(pathFields);
  if (collectPathBearingSelectors(schema).some((selector) => !declared.has(selector))) {
    throw toolError('TOOL_PATH_SCHEMA_INVALID', 'Path-bearing schema properties require explicit path metadata');
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
  assertPathFields(definition.inputSchema, definition.pathFields);
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

function scopedPaths(args, pathFields) {
  const values = [];
  for (const selector of pathFields) {
    let value = args;
    for (const segment of selector.split('.')) value = value[segment];
    if (Array.isArray(value)) values.push(...value);
    else values.push(value);
  }
  return values;
}

function assertDeclared(toolId, taskScope) {
  const toolIds = taskScope && (taskScope.toolIds || taskScope.tl);
  if (!Array.isArray(toolIds) || !toolIds.includes(toolId)) {
    throw toolError('TOOL_UNDECLARED', 'Tool is not declared by the active task package');
  }
}

function assertScope(toolId, args, taskScope, pathFields) {
  assertDeclared(toolId, taskScope);
  const allowedPaths = taskScope && (taskScope.allowedPaths || taskScope.p);
  if (!Array.isArray(allowedPaths)) {
    throw toolError('TOOL_SCOPE_INVALID', 'Task scope must declare allowed paths');
  }
  const allowed = new Set(allowedPaths);
  for (const candidate of scopedPaths(args, pathFields)) {
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
      pathFields: [...definition.pathFields],
      handler: definition.handler
    });
  }

  function resolve(toolIds, taskScope) {
    if (!Array.isArray(toolIds) || new Set(toolIds).size !== toolIds.length) {
      throw toolError('TOOL_RESOLUTION_INVALID', 'Requested tool IDs must be a unique array');
    }
    return toolIds.slice().sort().map((toolId) => {
      const definition = registry.get(toolId);
      if (!definition) throw toolError('TOOL_UNKNOWN', 'Tool is not registered');
      assertDeclared(toolId, taskScope);
      return Object.freeze({ v: 1, id: definition.id, description: definition.description, inputSchema: cloneJson(definition.inputSchema) });
    });
  }

  async function invoke(toolId, args, taskScope) {
    const definition = registry.get(toolId);
    if (!definition) throw toolError('TOOL_UNKNOWN', 'Tool is not registered');
    if (!validateArguments(args, definition.inputSchema)) {
      throw toolError('TOOL_ARGUMENTS_INVALID', 'Tool arguments do not match the declared schema');
    }
    assertScope(toolId, args, taskScope, definition.pathFields);
    return definition.handler(args, taskScope);
  }

  return Object.freeze({
    resolve,
    invoke,
    definitionBytes(toolIds, taskScope) {
      return Buffer.byteLength(JSON.stringify(resolve(toolIds, taskScope)), 'utf8');
    }
  });
}

module.exports = { createToolCatalog };
