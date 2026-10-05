## 2026-10-04T20:32:50Z
You are worker_m2_2, the Zag/XState FSM Form Primitives & Validation Worker.
Working directory: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m2_2
Workspace root: C:\Users\wd\Documents\playwright-scraper
Authoritative Request: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md (specifically read ## 2026-10-04T20:14:18Z, Requirement R2)
Project Scope: C:\Users\wd\Documents\playwright-scraper\PROJECT.md
Survey References:
- C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_survey_2_2\handoff.md
- C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\spec_miner_survey_2_3\handoff.md
Dispatch file: C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m2_2\DISPATCH.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Exclusive Write Ownership:
- src/fsm/core/machine.js
- src/fsm/core/connect.js
- src/forms/b2b-quote-machine.js
- src/forms/checkout-machine.js
- src/forms/masks.js
- src/forms/draft-storage.js
- test/m2-fsm-forms.test.js

Your task:
1. Implement pure vanilla JS micro-FSM engine in src/fsm/core/machine.js (states, context, events, guards, actions, subscriptions).
2. Implement Zag-style DOM accessibility connector in src/fsm/core/connect.js (aria-invalid, aria-busy, disabled, data-state, alert roles).
3. Implement JumpPlay B2B quote flow & checkout machines in src/forms/b2b-quote-machine.js and src/forms/checkout-machine.js (states: idle, validating, submitting, error, success; latency feedback).
4. Implement adaptive input masks and modulo 11 validation in src/forms/masks.js (dynamic CNPJ/CPF modulo 11, dynamic phone, CEP, BRL currency, caret tracking).
5. Implement localStorage draft persistence in src/forms/draft-storage.js with 24h TTL and auto-cleanup.
6. Create test/m2-fsm-forms.test.js and verify all tests pass via node --test test/m2-fsm-forms.test.js.
7. Write your handoff report to C:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m2_2\handoff.md following the Handoff Protocol.
When done, send a message to parent notifying that your work is complete.
