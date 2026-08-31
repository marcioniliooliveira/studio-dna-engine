const { assign, createActor, createMachine } = require('xstate');
const { assertSafeSlug } = require('../server/security');

const MAX_REPAIR_ATTEMPTS = 2;
const machineInitialContexts = new WeakMap();
const WORKFLOW_STATES = new Set([
  'draft', 'context_ready', 'planning', 'tasks_ready', 'executing', 'verifying',
  'repairing', 'candidate', 'awaiting_final_approval', 'human_intervention', 'failed', 'verified'
]);
const PROMOTED_STATES = new Set(['candidate', 'awaiting_final_approval', 'verified']);

function isPlainObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function isArtifactRef(value) {
  return isPlainObject(value) && typeof value.id === 'string' && value.id.length > 0 &&
    typeof value.sha256 === 'string' && /^[a-f0-9]{64}$/.test(value.sha256) && value.id === value.sha256 &&
    typeof value.runId === 'string' && typeof value.clientId === 'string' &&
    typeof value.type === 'string' && /^[a-z0-9-]+$/.test(value.type) &&
    typeof value.relativePath === 'string' &&
    value.relativePath === `${value.clientId}/${value.runId}/artifacts/${value.type}/${value.sha256}.json`;
}

function isBoundArtifactRef(value, context) {
  return isArtifactRef(value) && value.runId === context.runId && value.clientId === context.clientId;
}

function isFullQaEvidence(value, context) {
  if (!isPlainObject(value) || !isPlainObject(context) ||
    typeof value.artifactSha256 !== 'string' || !/^[a-f0-9]{64}$/.test(value.artifactSha256) ||
    !isBoundArtifactRef(value.reportArtifact, context) || value.reportArtifact.type !== 'qa-report' ||
    value.status !== 'candidate' || !isPlainObject(value.gates)) return false;

  const { antiSlop, console: consoleGate, network, structural } = value.gates;
  return isPlainObject(antiSlop) && antiSlop.passed === true &&
    isPlainObject(consoleGate) && consoleGate.passed === true && consoleGate.errorsCount === 0 &&
    isPlainObject(network) && network.passed === true && network.failedRequestsCount === 0 &&
    isPlainObject(structural) && structural.passed === true && structural.brokenImagesCount === 0;
}

function isBlockingEvidence(value) {
  return isPlainObject(value) && typeof value.reportId === 'string' && value.reportId.length > 0 &&
    value.status === 'failed';
}

function validateInitialContext(initialContext) {
  if (!isPlainObject(initialContext) || typeof initialContext.runId !== 'string' ||
    typeof initialContext.clientId !== 'string' || !Number.isInteger(initialContext.planVersion) ||
    initialContext.planVersion < 1 || !Number.isInteger(initialContext.attempts) || initialContext.attempts < 0) {
    throw new TypeError('initialContext must contain durable run, client, plan version, and attempt fields');
  }
  assertSafeSlug(initialContext.runId);
  assertSafeSlug(initialContext.clientId);

  if (initialContext.candidateArtifact !== null && !isBoundArtifactRef(initialContext.candidateArtifact, initialContext)) {
    throw new TypeError('initialContext candidateArtifact must be null or an immutable artifact reference');
  }

  if (initialContext.blockingEvidence !== null && !isPlainObject(initialContext.blockingEvidence)) {
    throw new TypeError('initialContext blockingEvidence must be null or persisted evidence');
  }

  if (initialContext.qaEvidence !== undefined && initialContext.qaEvidence !== null && !isFullQaEvidence(initialContext.qaEvidence, initialContext)) {
    throw new TypeError('initialContext qaEvidence must be null or valid full-QA evidence');
  }
}

function normalizedInitialContext(initialContext) {
  return { ...initialContext, qaEvidence: initialContext.qaEvidence ?? null };
}

function snapshotError(message) {
  return new TypeError(`workflow snapshot is invalid: ${message}`);
}

function validateSnapshot(machine, snapshot) {
  const expected = machineInitialContexts.get(machine);
  if (!expected) throw new TypeError('machine must be created by createWorkflowMachine');
  if (!isPlainObject(snapshot) || typeof snapshot.value !== 'string' || !isPlainObject(snapshot.context)) {
    throw snapshotError('state and context are required');
  }
  if (!WORKFLOW_STATES.has(snapshot.value)) throw snapshotError('state is not a legal workflow state');

  const context = snapshot.context;
  if (context.runId !== expected.runId || context.clientId !== expected.clientId ||
    !Number.isInteger(context.planVersion) || context.planVersion !== expected.planVersion ||
    !Number.isInteger(context.attempts) || context.attempts < 0 || context.attempts > MAX_REPAIR_ATTEMPTS ||
    !Object.hasOwn(context, 'candidateArtifact') || !Object.hasOwn(context, 'blockingEvidence') || !Object.hasOwn(context, 'qaEvidence')) {
    throw snapshotError('context does not match the run identity or durable fields');
  }

  if (context.candidateArtifact !== null && !isBoundArtifactRef(context.candidateArtifact, context)) {
    throw snapshotError('candidate artifact is not an immutable artifact for this run and client');
  }
  if (context.qaEvidence !== null && (!isFullQaEvidence(context.qaEvidence, context) || !isBoundArtifactRef(context.candidateArtifact, context) ||
    context.qaEvidence.artifactSha256 !== context.candidateArtifact.sha256)) {
    throw snapshotError('QA proof is incomplete or does not bind to the candidate artifact');
  }
  if (context.blockingEvidence !== null && !isPlainObject(context.blockingEvidence)) {
    throw snapshotError('blocking evidence is malformed');
  }
  if (PROMOTED_STATES.has(snapshot.value) && (!isBoundArtifactRef(context.candidateArtifact, context) ||
    !isFullQaEvidence(context.qaEvidence, context) || context.qaEvidence.artifactSha256 !== context.candidateArtifact.sha256)) {
    throw snapshotError('promoted state lacks an artifact-bound QA proof');
  }
}

function createWorkflowMachine(initialContext) {
  validateInitialContext(initialContext);
  const context = normalizedInitialContext(initialContext);

  const machine = createMachine({
    id: 'persisted-workflow',
    initial: 'draft',
    context,
    on: {
      WORKFLOW_FAILED: {
        target: '.failed'
      },
      HUMAN_INTERVENTION_REQUIRED: {
        guard: ({ event }) => isBlockingEvidence(event.evidence),
        target: '.human_intervention',
        actions: assign({
          blockingEvidence: ({ event }) => event.evidence
        })
      }
    },
    states: {
      draft: {
        on: {
          CONTEXT_FROZEN: 'context_ready'
        }
      },
      context_ready: {
        on: {
          PLAN_REQUESTED: 'planning'
        }
      },
      planning: {
        on: {
          BLUEPRINT_ACCEPTED: 'tasks_ready'
        }
      },
      tasks_ready: {
        on: {
          EXECUTION_STARTED: 'executing'
        }
      },
      executing: {
        on: {
          EXECUTION_COMPLETED: {
            guard: ({ context: currentContext, event }) => isBoundArtifactRef(event.candidateArtifact, currentContext),
            target: 'verifying',
            actions: assign({
              candidateArtifact: ({ event }) => event.candidateArtifact,
              blockingEvidence: () => null,
              qaEvidence: () => null
            })
          }
        }
      },
      verifying: {
        on: {
          FULL_QA_PASSED: {
            guard: ({ context: currentContext, event }) => isBoundArtifactRef(currentContext.candidateArtifact, currentContext) &&
              isFullQaEvidence(event.evidence, currentContext) && event.evidence.artifactSha256 === currentContext.candidateArtifact.sha256,
            target: 'candidate',
            actions: assign({
              qaEvidence: ({ event }) => event.evidence
            })
          },
          QA_BLOCKED: [
            {
              guard: ({ context, event }) => context.attempts < MAX_REPAIR_ATTEMPTS && isBlockingEvidence(event.evidence),
              target: 'repairing',
              actions: assign({
                attempts: ({ context }) => context.attempts + 1,
                blockingEvidence: ({ event }) => event.evidence
              })
            },
            {
              guard: ({ event }) => isBlockingEvidence(event.evidence),
              target: 'human_intervention',
              actions: assign({
                blockingEvidence: ({ event }) => event.evidence
              })
            }
          ]
        }
      },
      repairing: {
        on: {
          REPAIR_COMPLETED: 'executing'
        }
      },
      candidate: {
        on: {
          FINAL_APPROVAL_REQUESTED: 'awaiting_final_approval'
        }
      },
      awaiting_final_approval: {
        on: {
          FINAL_APPROVED: 'verified'
        }
      },
      human_intervention: {
        type: 'final'
      },
      failed: {
        type: 'final'
      },
      verified: {
        type: 'final'
      }
    }
  });
  machineInitialContexts.set(machine, context);
  return machine;
}

function createWorkflowActor(machine, snapshot) {
  if (!machine || typeof machine.transition !== 'function') {
    throw new TypeError('machine must be an XState workflow machine');
  }
  if (snapshot !== undefined) validateSnapshot(machine, snapshot);
  return createActor(machine, snapshot === undefined ? undefined : { snapshot });
}

module.exports = {
  createWorkflowMachine,
  createWorkflowActor
};
