# Orchestrator workflow implementation

## Goal
Execute a validated, client-scoped DAG through bounded provider-neutral tasks while recording evidence and cost metadata in the execution ledger.

## Tasks
- [ ] Validate compact blueprint schemas, acyclicity, budgets and client scope.
- [ ] Execute ready DAG nodes once dependencies pass; stop on fatal/repeated failures.
- [ ] Normalize task packages/results for Gemini IDE or API adapters.
- [ ] Run independent verifier gates and persist outcomes.
- [ ] Verify the integrated workflow with focused and repository-wide tests.

## Done when
- A valid blueprint executes deterministically with bounded retries.
- Invalid DAGs, budgets and cross-client scopes fail before execution.
- Every task and result is recorded in the ledger.
- Provider adapters remain replaceable and no architect call is placed in the execution loop.
