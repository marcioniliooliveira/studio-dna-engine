const { z } = require('zod');
const { assertSafeSlug } = require('../server/security');

const BudgetWire = z.object({
  it: z.number().int().positive(),
  ot: z.number().int().positive(),
  usd: z.number().positive(),
  try: z.number().int().min(1).max(3)
}).strict();

const NodeWire = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  k: z.enum(['extract', 'render', 'build', 'fix', 'verify']),
  dep: z.array(z.string()),
  in: z.array(z.string()),
  out: z.array(z.string()).min(1),
  p: z.array(z.string()).min(1),
  ni: z.boolean(),
  x: z.boolean(),
  svc: z.enum(['standard', 'batch', 'flex']),
  ha: z.boolean(),
  tl: z.array(z.string()).max(8),
  b: BudgetWire,
  g: z.array(z.string()).min(1)
}).strict();

const RunBudgetWire = z.object({
  usd: z.number().positive(),
  sol: z.literal(1),
  rp: z.number().int().min(0).max(1)
}).strict();

const BlueprintWire = z.object({
  v: z.literal(1),
  rid: z.string(),
  cid: z.string(),
  ctx: z.array(z.object({
    id: z.string(),
    sha: z.string().length(64),
    p: z.string()
  }).strict()).min(1),
  nd: z.array(NodeWire).min(1),
  b: RunBudgetWire
}).strict();

const TaskResultWire = z.object({
  v: z.literal(1),
  rid: z.string(),
  cid: z.string(),
  nid: z.string(),
  st: z.enum(['ok', 'err', 'blocked']),
  art: z.array(z.object({ id: z.string(), sha: z.string().length(64) }).strict()),
  chg: z.array(z.string()),
  use: z.object({
    it: z.number().int().nonnegative().nullable(),
    ct: z.number().int().nonnegative().nullable(),
    ot: z.number().int().nonnegative().nullable()
  }).strict(),
  err: z.object({ code: z.string(), msg: z.string() }).strict().nullable()
}).strict();

const CostEventWire = z.object({
  v: z.literal(1),
  rid: z.string(),
  nid: z.string(),
  m: z.string(),
  svc: z.enum(['standard', 'batch', 'flex', 'ide']),
  it: z.number().int().nonnegative().nullable(),
  ct: z.number().int().nonnegative().nullable(),
  ot: z.number().int().nonnegative().nullable(),
  ms: z.number().int().nonnegative(),
  try: z.number().int().positive(),
  usd: z.number().nonnegative().nullable(),
  est: z.boolean()
}).strict();

function parseBlueprintWire(input) {
  const wire = BlueprintWire.parse(input);
  assertSafeSlug(wire.rid);
  assertSafeSlug(wire.cid);

  return {
    version: wire.v,
    runId: wire.rid,
    clientId: wire.cid,
    context: wire.ctx.map(({ id, sha, p }) => ({ id, sha256: sha, path: p })),
    nodes: wire.nd.map((node) => ({
      id: node.id,
      kind: node.k,
      dependencies: node.dep,
      inputs: node.in,
      outputs: node.out,
      paths: node.p,
      needsInput: node.ni,
      nonInteractive: node.x,
      service: node.svc,
      humanApprovalEdge: node.ha,
      toolLabels: node.tl,
      budget: {
        maxInputTokens: node.b.it,
        maxOutputTokens: node.b.ot,
        maxUsd: node.b.usd,
        maxAttempts: node.b.try
      },
      gates: node.g
    })),
    budget: {
      maxUsd: wire.b.usd,
      maxSolCalls: wire.b.sol,
      maxReplans: wire.b.rp
    }
  };
}

const blueprintWireJsonSchema = z.toJSONSchema(BlueprintWire);

module.exports = {
  BlueprintWire,
  TaskResultWire,
  CostEventWire,
  parseBlueprintWire,
  blueprintWireJsonSchema
};
