# Guia de Isolamento de Workspace (Ferramenta vs. Clientes)

Este repositório contém **apenas o motor (`studio-dna-engine`)**, seus testes e o catálogo base (`design-vault/`). Artefatos produzidos pelo uso diário da ferramenta — scrapes (`copias/`), entregas de clientes (`clientes/`), banco SQLite (`data/`) e relatórios visuais (`qa-reports/`) — devem residir **em um diretório de workspace externo**, evitando poluir o Git ou misturar scripts artesanais com o núcleo da ferramenta.

---

## 1. Inicializar um workspace externo limpo

Crie ou inicialize uma pasta dedicada aos seus projetos (fora da pasta do motor):

```bash
node bin/cli.js --init-workspace ../studio-dna-projects
```

Isso cria a estrutura isolada:

```text
studio-dna-projects/
  copias/
  clientes/
  data/
  qa-reports/
  studio-dna.workspace.json
```

---

## 2. Configurar via variável de ambiente (recomendado para sessão)

No PowerShell (Windows):

```powershell
$env:STUDIO_DNA_WORKSPACE = "C:\Users\wd\Documents\studio-dna-projects"
```

Ou no Bash/macOS/Linux:

```bash
export STUDIO_DNA_WORKSPACE="$HOME/Documents/studio-dna-projects"
```

Com `STUDIO_DNA_WORKSPACE` ativo, todos os comandos (`scrape`, `--preview`, `client-factory`, APIs `/api/v2/*` e `/api/v3/*`) leem e gravam exclusivamente dentro desse diretório, enquanto o `design-vault/` da engine continua acessível em modo leitura como referência padrão.

---

## 3. Passar explicitamente por CLI (`--workspace <dir>`)

Sem depender de variável de ambiente, passe `--workspace`:

```bash
# Clonar e extrair DNA + UI/UX gravando no workspace externo
node bin/cli.js https://exemplo.com --workspace ../studio-dna-projects

# Abrir o dashboard / preview server apontando para o workspace externo
node bin/cli.js --preview --port 4000 --workspace ../studio-dna-projects

# Criar um projeto de cliente isolado a partir de uma cópia no workspace externo
node src/generators/client-factory.js --brand "Minha Marca" --ref exemplo-com --workspace ../studio-dna-projects
```

---

## 4. Regras de higiene do repositório da ferramenta

1. **Nunca crie scripts one-off de cliente em `scripts/`:** automações pontuais de um cliente pertencem à pasta do próprio cliente dentro do workspace externo.
2. **Nunca salve `.html`, `qa-reports/` ou exports de canvas na raiz do repositório.**
3. **Verifique antes de qualquer commit no motor:** `git status --short` não deve listar pastas de clientes, scrapes ou bancos locais.
