# EXECUTION_AND_EVIDENCE_INDEX — Studio DNA Engine
**Índice Completo de Execuções, Comandos, Provas e Cadeia de Custódia**

> **Campanha:** Antigravity Teamwork Truth Campaign  
> **Run ID:** `audit-20261023-eixo-a-foundation`  
> **Commit Auditado:** `3c4aabf5b470ed275a95ff8a731fce9d6ea37b19`  
> **Diretório Canônico de Artefatos:** `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/`  

---

## 1. Registro Cronológico de Comandos Executados

| Seq | Timestamp (UTC) | Comando Sanitizado Executado | Cwd | Exit Code | Artefato Gerado | SHA-256 do Artefato |
|---|---|---|---|---|---|---|
| **01** | 2026-10-23T15:58:48Z | `npm ci` | `.worktrees/audit-v2-orchestrator` | `0` | `install.log` | `(preservado no worktree)` |
| **02** | 2026-10-23T16:00:42Z | `node audit/report-generators/generate-r00-baseline.js` | `.worktrees/audit-v2-orchestrator` | `0` | `environment.json` | `64352137784657d030d0fee9c89a6d41a84c5fb5459d3f49b9c1d5186e8fbe51` |
| **03** | 2026-10-23T16:01:17Z | `npm audit --json` | `.worktrees/audit-v2-orchestrator` | `1` *(advisories)* | `dependency-audit.json` | `26ad79f6cc6a9483b1ffc42d3ee7dee264c96e834f452dcacd221ff2ec0a2bf0` |
| **04** | 2026-10-23T16:02:42Z | `node audit/report-generators/generate-r00-baseline.js` | `.worktrees/audit-v2-orchestrator` | `0` | `baseline-summary.json` | `cbb5678eb12e9ae705ca60113f9829910e527d499fe16f6b0fca305e5520970a` |
| **05** | 2026-10-23T16:03:17Z | `node audit/report-generators/generate-r01-inventory.js` | `.worktrees/audit-v2-orchestrator` | `0` | `test-inventory.json` | `e3505cbe0dd2d4a2b978c4cf5b248eb4bb0d540ecbf669ffc891636c738e68cf` |
| **06** | 2026-10-23T16:03:18Z | `node audit/report-generators/generate-r01-inventory.js` | `.worktrees/audit-v2-orchestrator` | `0` | `test-discovery.json` | `051ea973b0222a0ceb3149e29ee87fa1dc553cb7d29fc2f558a74e5ce6c944f3` |
| **07** | 2026-10-23T16:03:19Z | `node audit/report-generators/generate-r01-inventory.js` | `.worktrees/audit-v2-orchestrator` | `0` | `ci-coverage-map.csv` | `0a340c21fe6fe118a8047915309da5490bc892797e8825c040854bb6fb8c8b4b` |
| **08** | 2026-10-23T16:03:20Z | `node audit/report-generators/generate-r01-inventory.js` | `.worktrees/audit-v2-orchestrator` | `0` | `orphaned-suites.json` | `a3ba72583ec6aa8b9c8da4c8e763a812328df8c512cf14dd0616b343ae74cba0` |
| **09** | 2026-10-23T16:03:44Z | `npm test` (`npm run test:all`) | `.worktrees/audit-v2-orchestrator` | `1` *(fail)* | `task-99.log` | `(falha fatal em copias/useplanes-com)` |
| **10** | 2026-10-23T16:08:26Z | `node --test test/m1-cdp-decompiler.test.js` | `.worktrees/audit-v2-orchestrator` | `0` | `(stdout TAP 11 tests ok)` | `(integrado)` |
| **11** | 2026-10-23T16:08:38Z | `node --test test/m2-kinetic-trajectory.test.js` | `.worktrees/audit-v2-orchestrator` | `0` | `(stdout TAP 22 tests ok)` | `(integrado)` |
| **12** | 2026-10-23T16:08:47Z | `node --test test/m3-assets3d-pipeline.test.js` | `.worktrees/audit-v2-orchestrator` | `0` | `(stdout TAP 16 tests ok)` | `(integrado)` |
| **13** | 2026-10-23T16:09:00Z | `node --test test/m4-compiler-dualstack.test.js` | `.worktrees/audit-v2-orchestrator` | `0` | `(stdout TAP 30 tests ok)` | `(integrado)` |
| **14** | 2026-10-23T16:10:01Z | `node --experimental-test-coverage --test test/task-contract*.test.js` | `.worktrees/audit-v2-orchestrator` | `0` | `(coverage report 81.07% lines)` | `(integrado)` |
| **15** | 2026-10-23T16:10:37Z | `node audit/report-generators/run-r02-mutation-and-flakiness.js` | `.worktrees/audit-v2-orchestrator` | `0` | `mutation-report.json` | `fc2ab151950d8b76c8c4bc6ecb75e1a17c24a686b24d7328b9d99d300eb0bead` |
| **16** | 2026-10-23T16:10:41Z | `node audit/report-generators/run-r02-mutation-and-flakiness.js` | `.worktrees/audit-v2-orchestrator` | `0` | `surviving-mutants.json` | `ab0a3c26027a4d334e3a47d25e0a0a55239e2469d71c43aa1ea4e18342416f00` |
| **17** | 2026-10-23T16:10:42Z | `node audit/report-generators/run-r02-mutation-and-flakiness.js` | `.worktrees/audit-v2-orchestrator` | `0` | `flakiness.csv` | `1004a3f4e1950e16c9dc8e75e9b867c4ecdd77a5ddc95579ff1ff91bfa3c675c` |
| **18** | 2026-10-23T16:14:03Z | `node audit/report-generators/run-r03-adversarial-security.js` | `.worktrees/audit-v2-orchestrator` | `0` | `security-findings.json` | `8390b144fcb2b93df90f3cfa5d48107936a297e682705aa7968ee413491e847c` |
| **19** | 2026-10-23T16:14:04Z | `node audit/report-generators/run-r03-adversarial-security.js` | `.worktrees/audit-v2-orchestrator` | `0` | `policy-decisions.jsonl` | `df0e80df965ca965e6d01d4a04d3d2c0b49fc21356e9fe9a66ca7a5a8f4c7816` |
| **20** | 2026-10-23T16:14:05Z | `node audit/report-generators/run-r03-adversarial-security.js` | `.worktrees/audit-v2-orchestrator` | `0` | `race-report.json` | `d6e87f2ff7071db98a002ebc8397a5cf2b047ae37fa5da1978ae325ca78924b1` |
| **21** | 2026-10-23T16:14:06Z | `node audit/report-generators/run-r03-adversarial-security.js` | `.worktrees/audit-v2-orchestrator` | `0` | `approval-audit.jsonl` | `b349b1ff19cbddca04dd31a5fae5f73c52e697d02fc74b48bc2973957eb6a33b` |
| **22** | 2026-10-23T16:14:50Z | `node audit/report-generators/package-artifacts.js` | `.worktrees/audit-v2-orchestrator` | `0` | `manifest.json` | `5c84d62b9f3320c291dd819ea2b528be63737ec3ebaa4d6935ba186064f7b605` |

---

## 2. Mapa de Localização de Evidências

Todos os arquivos acima residem fisicamente em:  
`artifacts/empirical-audit/audit-20261023-eixo-a-foundation/`  
com conferência unificada em `checksums.sha256`.
