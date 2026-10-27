# Relatório R00 — Baseline e Reprodutibilidade do Repositório

> **Run ID:** `audit-20261023-eixo-a-foundation`  
> **Status:** `observed`  
> **Data de Coleta:** 2026-10-23T16:02:42Z  
> **Branch de Análise:** `integration/v2-dna-orchestrator`  
> **Commit SHA:** `3c4aabf5b470ed275a95ff8a731fce9d6ea37b19`  

---

## 1. Pergunta Empírica

> O sistema é instalável e executável a partir de um commit limpo?

## 2. Metodologia e Ambiente de Execução

A investigação foi conduzida em um worktree git isolado (`.worktrees/audit-v2-orchestrator`), desacoplado de branches de trabalho e processos locais, a partir de um checkout estritamente limpo do commit canônico `3c4aabf5b470ed275a95ff8a731fce9d6ea37b19`.

### 2.1 Especificações do Ambiente Controlado (`environment.json`)

| Parâmetro | Valor Medido | Status |
|---|---|---|
| **Sistema Operacional** | Windows 11 (`win32 10.0.26200`, `x64`) | `observed` |
| **CPU** | Intel(R) Core(TM) 7 240H (16 vCPUs lógicas) | `observed` |
| **Memória RAM** | 33.97 GB Total / 4.32 GB Livre | `observed` |
| **Runtime Node.js** | `v22.23.3` | `observed` |
| **Runtime npm** | `10.9.9` | `observed` |
| **Engine V8** | `12.4.254.21-node.57` | `observed` |
| **Suporte Nativo a `node:sqlite`** | `true` (módulo nativo operacional) | `observed` |
| **Working Tree Clean** | `true` (0 arquivos modificados no checkout inicial) | `observed` |

---

## 3. Resultados da Instalação (`install.log`)

Comando executado: `npm ci` a partir do lockfile versionado.

- **Duração da Instalação:** 26 segundos.
- **Pacotes Adicionados:** 222 pacotes.
- **Pacotes Auditados:** 223 pacotes.
- **Integridade Criptográfica do Lockfile:**
  - `package-lock.json` SHA-256: `3c5c55e478e25509127ef9cc2320c4e2728784c8947b735530de6239df3f1a5b`
- **Conclusão de Instalação:** `reproduzível` em ambiente Windows com Node v22.23.3.

---

## 4. Auditoria de Vulnerabilidades de Dependências (`dependency-audit.json`)

A auditoria via `npm audit --json` identificou **9 vulnerabilidades** no grafo de dependências:

| Pacote | Severidade | Vetor / Origem | Impacto no Studio DNA |
|---|---|---|---|
| `proxy-addr` | **CRITICAL** | `proxy-addr` | Spoofing de endereço IP em servidores HTTP |
| `@modelcontextprotocol/sdk` | **HIGH** | `@modelcontextprotocol/sdk` | Falha de validação no transporte MCP |
| `fast-uri` | **HIGH** | `fast-uri` | ReDoS em parsing de URIs |
| `undici` | **HIGH** | `undici` | Vazamento de cabeçalhos e proxy tunneling |
| `hono` | **MODERATE** | `hono` | Roteamento em servidores de borda |
| `ip-address` | **MODERATE** | `ip-address` | Parsing de IPv6 |
| `qs` | **MODERATE** | `qs` | DoS em parsing de query strings aninhadas |
| `uuid` | **MODERATE** | `uuid@9.0.1` | Depreciação e suporte de versão |
| `@react-three/drei` | **MODERATE** | dependência transitiva de `uuid` | Renderização 3D |

---

## 5. Análise de Divergência entre Branches (`branches.json`)

A inspeção topológica do repositório identificou 16 branches (locais e remotas).
- `origin/integration/v2-dna-orchestrator` (`3c4aabf`) é a branch que acumulou as maiores suítes de teste (Milestones 1-5, stress de hardware, v2.5 e v2.6).
- Branches como `feature/clone-op-xy-76-aura` divergiram no commit `6392797` e acumularam modificações locais de clientes e extractors que **ainda não foram fundidas** na branch principal.

---

## 6. Evidências Vinculadas

- Artefatos arquivados em: `artifacts/empirical-audit/audit-20261023-eixo-a-foundation/`
  - `environment.json`
  - `branches.json`
  - `dependency-audit.json`
  - `baseline-summary.json`
  - `checksums.sha256`
