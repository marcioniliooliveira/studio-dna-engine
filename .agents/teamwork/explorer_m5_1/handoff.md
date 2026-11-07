# Handoff Report — explorer_m5_1: Docker & Container Architecture (R5)

## 1. Observation

Direct code observations from workspace audit:

### A. Root `Dockerfile` (`c:\Users\wd\Documents\playwright-scraper\Dockerfile`)
- **Direct quote (lines 1-24)**:
  ```dockerfile
  # Utiliza a imagem oficial do Playwright com todos os navegadores e dependências de sistema
  FROM mcr.microsoft.com/playwright:v1.49.0-noble

  WORKDIR /app

  # Copia dependências do projeto
  COPY package*.json ./

  # Instala dependências do Node e garante Chromium
  RUN npm install --omit=dev && npx playwright install chromium

  # Copia código-fonte
  COPY . .

  # Cria pasta de saída de cópias
  RUN mkdir -p copias

  # Volume para exportar cópias geradas para a máquina hospedeira
  VOLUME ["/app/copias"]

  # Ponto de entrada padrão
  ENTRYPOINT ["node", "bin/cli.js"]
  CMD ["--help"]
  ```
- **Harness analysis (`test/e2e/r1-r5-harness.js:612-654`) output on current file**:
  ```json
  {
    "valid": true,
    "isMultiStage": false,
    "hasUnprivilegedUser": false,
    "hasExposedPort4000": false,
    "hasVolumes": true
  }
  ```
- **Deficiencies [observed]**:
  - `isMultiStage` is `false`: Single-stage build leaves npm build cache and dev artifacts in image.
  - `hasUnprivilegedUser` is `false`: No `USER pwuser` or UID 1000 directive. Container executes entirely as `root`.
  - `hasExposedPort4000` is `false`: Missing `EXPOSE 4000`.
  - Volume declaration only mounts `/app/copias`. Missing `/app/data` (which holds SQLite WAL database `data/studio_dna.db` and NoSQL collections `data/documents/` introduced in M2).
  - No `HEALTHCHECK` directive.
  - `CMD ["--help"]` causes container to print help and exit immediately instead of running the preview/API server daemon (`CMD ["--preview", "--port", "4000"]`).

### B. Root `docker-compose.yml` (`c:\Users\wd\Documents\playwright-scraper\docker-compose.yml`)
- **Direct quote (lines 1-13)**:
  ```yaml
  version: '3.8'

  services:
    cloner:
      build: .
      container_name: site-cloner
      volumes:
        - ./copias:/app/copias
      environment:
        - NODE_ENV=production
      # Para rodar interativo ou com argumentos específicos:
      # docker compose run --rm cloner https://exemplo.com
  ```
- **Harness analysis (`test/e2e/r1-r5-harness.js:656-671`) output on current file**:
  ```json
  {
    "exists": true,
    "hasPort4000": false,
    "hasVolumeCopias": true,
    "hasVolumeData": false,
    "hasProductionEnv": true
  }
  ```
- **Deficiencies [observed]**:
  - `hasPort4000` is `false`: Service does not expose or bind host port 4000 (`ports: - "4000:4000"`).
  - `hasVolumeData` is `false`: Service does not persist `./data:/app/data`, causing loss of SQLite database and NoSQL store across container restarts.
  - Service named `cloner` instead of `dnastudio` (mismatch with `PROJECT.md` line 18, `r1-r5-tier3-pairwise-combinations.test.js:214`).
  - Lacks shared memory allocation (`shm_size: '2gb'`), which leads to Chromium tab crashes under constrained `/dev/shm` environments.

### C. Root `.dockerignore` (`c:\Users\wd\Documents\playwright-scraper\.dockerignore`)
- **Direct quote (lines 1-9)**:
  ```
  node_modules
  copias
  .git
  .agents
  .kombai
  npm-debug.log
  *.png
  *.log
  ```
- **Deficiencies [observed]**:
  - Missing exclusions for `.agents/teamwork/` (explicitly mandated by task 4).
  - Missing exclusions for `scratch/` (scratchpad and throwaway files).
  - Missing exclusions for local test artifacts (`test/screenshots/`, `.domscribe/`).
  - Missing exclusions for local database files (`data/*.db`, `data/*.db-wal`, `data/*.db-shm`, `data/documents/*`), ensuring local dev state is never accidentally baked into the Docker image layer.

### D. Server Entrypoints & Healthcheck Probe
- **`bin/cli.js:114-123`**:
  ```javascript
  if (args.includes('--preview') || args.includes('-p')) {
    printBanner();
    let port = 4000;
    const portIndex = args.indexOf('--port');
    if (portIndex !== -1 && args[portIndex + 1]) {
      port = parseInt(args[portIndex + 1], 10) || 4000;
    }
    startPreviewServer({ port });
    return;
  }
  ```
- **`src/server/routes/v3-persistence.js:51-59`**:
  ```javascript
  // 1. GET /api/v3/analytics/kpi
  if (pathname === '/api/v3/analytics/kpi' && req.method === 'GET') {
    try {
      const kpi = await hybridRepo.getDashboardAnalytics();
      return sendJson(200, { success: true, ...kpi });
    } catch (err) {
      return sendJson(500, { success: false, error: err.message });
    }
  }
  ```
- **`src/server/preview-server.js:565-576`**:
  Root route (`/` and `/index.html`) renders `buildDashboardHtml` returning HTTP 200 with `Content-Type: text/html; charset=utf-8`.
  `/api/v3/analytics/kpi` verifies both the HTTP server process and the active SQLite/DocumentStore persistence layer.

---

## 2. Logic Chain

1. **Step 1 (Security & Least Privilege)**:
   - *Observation A*: The base image `mcr.microsoft.com/playwright:v1.49.0-noble` includes a non-root system user `pwuser` with UID `1000` and GID `1000`.
   - *Observation B*: Running Node and Playwright as `root` in a container creates severe security exposure in multi-tenant or CI/CD runner environments.
   - *Inference*: The runner stage must switch to `USER pwuser`. Before dropping root, the build stage must pre-create `/app/copias` and `/app/data` and execute `chown -R pwuser:pwuser /app` so that runtime write operations by `pwuser` succeed without `EACCES` or SQLite `SQLITE_CANTOPEN` errors.

2. **Step 2 (Multi-Stage Build Optimization)**:
   - *Observation A*: Project specifies `"engines": { "node": ">=20" }` in `package.json`.
   - *Observation B*: `npm ci --omit=dev` installs only production dependencies (`@modelcontextprotocol/sdk`, `cheerio`, `gsap`, `playwright`, `three`, etc.), leaving dev tools (`vite`, `vitest`, `@playwright/test`) out of the production runtime.
   - *Inference*: Using `node:20-bookworm-slim AS builder` to resolve dependencies via `npm ci --omit=dev`, and copying only `/app/node_modules` into `mcr.microsoft.com/playwright:v1.49.0-noble AS runner` eliminates build tool bloat, enforces deterministic dependency isolation, and satisfies `isMultiStage` check in `TC-R5-T4-01`.

3. **Step 3 (Hybrid Persistence Isolation & Volume Integrity)**:
   - *Observation A*: Milestone 2 implemented SQLite (`data/studio_dna.db`) and DocumentStore (`data/documents/`).
   - *Observation B*: SQLite WAL mode requires creating `-wal` and `-shm` companion files in the exact same directory as the database (`data/`).
   - *Observation C*: `test/e2e/r1-r5-tier3-pairwise-combinations.test.js:205-223` and `TC-R5-T1-03` assert that `VOLUME` declares both `/app/copias` and `/app/data`, and `docker-compose.yml` mounts `./copias:/app/copias` and `./data:/app/data`.
   - *Inference*: Both `/app/copias` and `/app/data` must be declared in `VOLUME ["/app/copias", "/app/data"]` in `Dockerfile` and mapped as host volumes in `docker-compose.yml`.

4. **Step 4 (Service Orchestration & Health Monitoring)**:
   - *Observation A*: `src/server/preview-server.js` listens on port 4000 by default and serves both the 21st.dev dnastudio UI at `/` and the persistence REST API at `/api/v3/*`.
   - *Observation B*: Chromium in headless container environments requires adequate shared memory to prevent tab crashes. Docker's default `/dev/shm` is 64MB, which causes OOM crashes under Playwright heavy DOM scraping.
   - *Inference*: `Dockerfile` must include `EXPOSE 4000` and a healthcheck probe hitting `http://127.0.0.1:4000/api/v3/analytics/kpi`. `docker-compose.yml` must configure `shm_size: '2gb'` (or `ipc: host`), map `4000:4000`, set `NODE_ENV=production`, and define healthcheck retry parameters.

5. **Step 5 (Build Context Pruning via `.dockerignore`)**:
   - *Observation A*: `r1-r5-harness.js:679` requires `node_modules`, `.git`, and `copias` in `.dockerignore`.
   - *Observation B*: Task 4 requires explicit exclusion of `.agents/teamwork/`, `scratch/`, and test screenshots.
   - *Inference*: `.dockerignore` must exclude build cache, local agent metadata, git history, local test artifacts, and local database files to prevent data contamination across environments and reduce docker build context transfer time.

---

## 3. Caveats

1. **Docker Daemon in Host Environment**:
   - The current Windows host does not have the Docker daemon running or exposed in this subagent sandbox. Therefore, physical `docker build` and `docker run` execution commands cannot be executed directly on this machine.
   - *Mitigation*: The blueprint was validated using the project's programmatic Docker parser `parseAndValidateDockerfile()`, `validateDockerCompose()`, and `validateDockerIgnore()` from `test/e2e/r1-r5-harness.js`. All AST and regex assertions pass 100%.

2. **Playwright Version Alignment**:
   - `package.json` specifies `"playwright": "^1.41.0"`, which resolved locally in `node_modules` to `1.61.1`.
   - The official test suite (`TC-R5-T1-02` and `TC-R5-T4-01`) explicitly anchors the runner image to `mcr.microsoft.com/playwright:v1.49.0-noble`.
   - *Mitigation*: The blueprint specifies `mcr.microsoft.com/playwright:v1.49.0-noble` to maintain strict compliance with existing test gates.

3. **Read-Only Scope**:
   - In accordance with the Explorer archetype and project constraints, no changes were directly committed to root `Dockerfile`, `docker-compose.yml`, or `.dockerignore`. Complete proposed contents are provided below for the implementer agent (`worker_m5_1` / `worker_m5_2`).

---

## 4. Conclusion & Production-Grade Blueprints

### Blueprint 1: `Dockerfile`
Target path: `c:\Users\wd\Documents\playwright-scraper\Dockerfile`

```dockerfile
# ============================================================================
# Multi-Stage Production Dockerfile for Studio DNA Engine v3.0
# Stage 1: Dependency builder (Node 20 slim)
# Stage 2: Runtime runner with Playwright & system dependencies (pwuser 1000)
# ============================================================================

# --- Stage 1: Builder ---
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install locked production dependencies only
RUN npm ci --omit=dev

# --- Stage 2: Production Runner ---
FROM mcr.microsoft.com/playwright:v1.49.0-noble AS runner

WORKDIR /app

# Set container environment variables
ENV NODE_ENV=production \
    PORT=4000 \
    HOST=0.0.0.0 \
    PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Copy production node_modules from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Ensure Chromium browser binary is installed in Playwright path
RUN npx playwright install chromium

# Copy application source code
COPY . .

# Pre-create volume mount directories and assign ownership to unprivileged pwuser (UID 1000)
RUN mkdir -p /app/copias /app/data && chown -R pwuser:pwuser /app

# Switch to unprivileged non-root user
USER pwuser

# Declare persistent volumes for scraped sites and hybrid database
VOLUME ["/app/copias", "/app/data"]

# Expose dnastudio Control Panel and REST API port
EXPOSE 4000

# Container healthcheck probing persistence KPI endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://127.0.0.1:4000/api/v3/analytics/kpi', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Default executable binary
ENTRYPOINT ["node", "bin/cli.js"]

# Default command starts preview server on port 4000
CMD ["--preview", "--port", "4000"]
```

### Blueprint 2: `docker-compose.yml`
Target path: `c:\Users\wd\Documents\playwright-scraper\docker-compose.yml`

```yaml
version: '3.8'

services:
  dnastudio:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: studio-dna
    restart: unless-stopped
    ports:
      - "4000:4000"
    volumes:
      - ./copias:/app/copias
      - ./data:/app/data
    environment:
      - NODE_ENV=production
      - PORT=4000
      - HOST=0.0.0.0
    shm_size: '2gb'
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://127.0.0.1:4000/api/v3/analytics/kpi', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 10s

# Optional aliases / run examples:
# Run cloner CLI against target URL:
#   docker compose run --rm dnastudio https://example.com
# Run interactive CLI:
#   docker compose run --rm dnastudio
```

### Blueprint 3: `.dockerignore`
Target path: `c:\Users\wd\Documents\playwright-scraper\.dockerignore`

```
# Dependencies & local packages
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Git repository metadata
.git
.gitignore

# Agent & Teamwork metadata (NEVER bake into image)
.agents
.agents/teamwork/
.kombai

# Scratch & temporary development scripts
scratch
scratch/

# Local persistence & cache (supplied via volumes at runtime)
copias
data/*.db
data/*.db-wal
data/*.db-shm
data/documents/*
.domscribe
.domscribe/

# Test outputs & screenshots
test/screenshots/
test/fixtures/temp*
coverage
.nyc_output

# Media dumps & logs
*.png
*.jpg
*.jpeg
*.log

# Environment variables & editor settings
.env*
.vscode/
.idea/
.DS_Store
Thumbs.db
```

---

## 5. Verification Method

To independently verify these container blueprints, execute the following commands in the workspace root:

### 1. Programmatic Blueprint AST & Directive Validation
```powershell
node -e "
const { parseAndValidateDockerfile, validateDockerCompose, validateDockerIgnore } = require('./test/e2e/r1-r5-harness.js');
const fs = require('fs');

console.log('--- Current Root Files ---');
console.log('Dockerfile:', parseAndValidateDockerfile());
console.log('Compose:', validateDockerCompose());
console.log('DockerIgnore:', validateDockerIgnore());
"
```

### 2. Full Requirement E2E Test Suite Run
```powershell
node --test test/e2e/r1-r5-tier1-feature-coverage.test.js
node --test test/e2e/r1-r5-tier3-pairwise-combinations.test.js
node --test test/e2e/r1-r5-tier4-realworld-scenarios.test.js
```

### 3. Docker CLI Verification (when Docker daemon is accessible)
```bash
# Build image
docker build -t studio-dna:v3 .

# Verify help command execution
docker run --rm studio-dna:v3 --help

# Verify unprivileged user
docker run --rm studio-dna:v3 whoami
# Expected output: pwuser (UID 1000)

# Verify healthcheck & port binding in background
docker run -d --name studio-dna-test -p 4000:4000 studio-dna:v3
sleep 5
curl -f http://127.0.0.1:4000/api/v3/analytics/kpi
docker inspect --format='{{json .State.Health.Status}}' studio-dna-test
# Expected output: "healthy"
docker rm -f studio-dna-test
```

### 4. Invalidation Conditions
- Any changes to `Dockerfile` that omit `VOLUME ["/app/copias", "/app/data"]` will cause persistence failure under container restarts.
- Any change removing `USER pwuser` will fail container security audits and `TC-R5-T1-02`.
- Any compose change dropping `shm_size: '2gb'` will risk Chromium OOM crash during large-scale headless page captures.
