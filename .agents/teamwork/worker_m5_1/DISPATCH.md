# Task Assignment: Milestone 5 Implementation Worker (worker_m5_1)

## Mission
Implement Milestone 5 (Requirement R5: DevOps Pipeline with Docker & GitHub Actions):
1. Root `Dockerfile`: Multi-stage production container with unprivileged `USER pwuser`, `VOLUME ["/app/copias", "/app/data"]`, `EXPOSE 4000`, healthcheck, and `CMD ["--preview", "--port", "4000"]`.
2. Root `docker-compose.yml`: Service with `ports: - "4000:4000"`, `volumes: - ./copias:/app/copias, - ./data:/app/data`, `shm_size: '2gb'`, and `NODE_ENV=production`.
3. Root `.dockerignore`: Complete exclusions for `node_modules`, `copias`, `data`, `.git`, `.agents`, `.agents/teamwork/`, `scratch`, test dumps, and media.
4. Root `.github/workflows/ci.yml`: 3-job workflow (`lint` -> `test` -> `docker-build`) with Playwright Chromium install/deps and container smoke test.
5. `test/fixtures/context-index/package.json`: Add `{"type": "module"}` to isolate ESM test fixtures from CommonJS project root, achieving 100% syntax check on `npm run lint`.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Owned Files
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`
- `.github/workflows/ci.yml`
- `test/fixtures/context-index/package.json`

## Reference Files to Read
- `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\ORIGINAL_REQUEST.md`
- `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\orchestrator\PROJECT.md`
- `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m5_1\handoff.md` (Docker & container blueprint)
- `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m5_2\handoff.md` & `proposed_ci.yml` (CI/CD blueprint)
- `c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\explorer_m5_3\handoff.md` (DevOps test harness invariants)

## Verification Commands
After implementing all 5 files, execute:
1. `node scripts/audit-syntax.js` (must pass 100%, 0 errors)
2. `node -e "const h = require('./test/e2e/r1-r5-harness.js'); console.log('Dockerfile:', h.parseAndValidateDockerfile()); console.log('Compose:', h.validateDockerCompose()); console.log('DockerIgnore:', h.validateDockerIgnore()); console.log('CI:', h.validateCiWorkflow());"`
3. `npm run test:milestones`
4. `node --test test/e2e/r1-r5-tier1-feature-coverage.test.js`
5. `node --test test/e2e/r1-r5-tier2-boundary-corner.test.js`
6. `node --test test/e2e/r1-r5-tier3-pairwise-combinations.test.js`
7. `node --test test/e2e/r1-r5-tier4-realworld-scenarios.test.js`
8. `git status --porcelain` (confirm `copias/` and `clientes/` are pristine!)
9. Commit changes to `integration/staging-consolidated-v3` with message:
   `feat(devops): implement production multi-stage dockerfile, docker-compose, and github actions ci/cd (F21-F23)`

## Output
Write your detailed handoff report to:
`c:\Users\wd\Documents\playwright-scraper\.agents\teamwork\worker_m5_1\handoff.md`
and notify the orchestrator via `send_message`.
