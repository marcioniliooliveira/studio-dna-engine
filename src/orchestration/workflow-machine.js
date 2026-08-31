const { assign, createActor, createMachine } = require('xstate');

const MAX_REPAIR_ATTEMPTS = 2;

function isPlainObject(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function isArtifactRef(value) {
  return isPlainObject(value) && typeof value.id === 'string' && value.id.length > 0 &&
    typeof value.sha256 === 'string' && /^[a-f0-9]{64}$/.test(value.sha256);
}

function isFullQaEvidence(value) {
  if (!isPlainObject(value) || typeof value.reportId !== 'string' || value.reportId.length === 0 ||
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

  if (initialContext.candidateArtifact !== null && !isArtifactRef(initialContext.candidateArtifact)) {
    throw new TypeError('initialContext candidateArtifact must be null or an immutable artifact reference');
  }

  if (initialContext.blockingEvidence !== null && !isPlainObject(initialContext.blockingEvidence)) {
    throw new TypeError('initialContext blockingEvidence must be null or persisted evidence');
  }
}

function createWorkflowMachine(initialContext) {
  validateInitialContext(initialContext);

  return createMachine({
    id: 'persisted-workflow',
    initial: 'draft',
    context: { ...initialContext },
    on: {
      WORKFLOW_FAILED: {
        target: '.failed'
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
            guard: ({ event }) => isArtifactRef(event.candidateArtifact),
            target: 'verifying',
            actions: assign({
              candidateArtifact: ({ event }) => event.candidateArtifact,
              blockingEvidence: () => null
            })
          }
        }
      },
      verifying: {
        on: {
          FULL_QA_PASSED: {
            guard: ({ context, event }) => isArtifactRef(context.candidateArtifact) && isFullQaEvidence(event.evidence),
            target: 'candidate'
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
}

function createWorkflowActor(machine, snapshot) {
  if (!machine || typeof machine.transition !== 'function') {
    throw new TypeError('machine must be an XState workflow machine');
  }
  return createActor(machine, snapshot === undefined ? undefined : { snapshot });
}

module.exports = {
  createWorkflowMachine,
  createWorkflowActor
};
