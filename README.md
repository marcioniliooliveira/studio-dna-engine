# 🌐 Studio DNA PRO — Awwwards Engine & Client Production Hub

> **Motor experimental de engenharia reversa, extração de Design DNA e transmutação determinística orientado por ICM (Interpretable Context Methodology).**

Este repositório pesquisa como dissecar referências web complexas e transformá-las em **estruturas reutilizáveis e verificáveis**. Metas como ausência de erros, performance e prevenção de AI slop são quality gates a serem comprovados; não são garantias do estado atual. Consulte [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) antes de usar o projeto em produção.

---

## ⚡ Guia Rápido de Instalação (Para Colegas de Equipe)

### 1. Clonar o Repositório e Instalar Dependências
```bash
git clone https://github.com/SEU_USUARIO/studio-dna-engine.git
cd studio-dna-engine
npm install
npm run setup
```

### 2. Iniciar o Dashboard Visual Local
```bash
npm start
```
Acesse no seu navegador: **`http://127.0.0.1:4000/`**

---

## 🏗️ Pipeline de Transmutação (Como a Metodologia Funciona)

ICM organiza o contexto e os contratos usados pelos agentes. O pipeline abaixo descreve a transformação de referências e é uma responsabilidade separada.

O fluxo de trabalho é estritamente desacoplado em 5 fases para garantir que IAs nunca degradem o design original:

```
copias/<referencia>/
├── 01-raw/                 # Clone bruto capturado pelo Playwright (HTML, CSS, Shaders)
├── 02-skeleton/            # Tokens numéricos (Hex, Gaps, Radii) e Esqueleto com Slots
├── 03-semantic-bridge/     # Redação da nova marca com Length Rule (±15%) estrita
├── 04-assembly/            # Montagem determinística via Injetor Mecânico (0 tokens no código)
└── 05-production/          # Export limpo para Next.js 15, Vite ou Edge CDN
```

---

## 🚀 Comandos Principais do Terminal

### 1. Criar um Novo Site de Cliente a Partir de um Esqueleto (One-Shot)
```bash
npm run client -- --brand "Nome do Cliente" --ref "storeyarchitecture-co-uk"
```
* Cria a pasta isolada em `clientes/<nome-do-cliente>/`.
* Copia os assets e esqueleto da referência escolhida.
* Gera um `package.json` de produção limpo, pronto para deploy.

### 2. Disparar o Quality Gate & Bounding Box Linter (Playwright)
```bash
npm run audit clientes/negocia-bem-imobiliaria
```
* Audita o site em browser headless.
* Valida se a contagem de erros JS é **0**.
* Valida se 100% das imagens têm `naturalWidth > 0`.
* Valida coordenadas de bounding box e integridade visual.

### 3. Fazer Scraping Profundo de uma Nova Referência
```bash
npm run scrape https://site-awwwards-exemplo.com
```

---

## 🧬 Design Vault (`design-vault/`)

Banco de inteligência permanente com fórmulas matemáticas e física de movimento:
* `01-motion-physics/`: Matriz de curvas cúbicas cinematográficas (`cubic-bezier(0.16, 1, 0.3, 1)`).
* `02-3d-experiments/`: Motores procedurais 3D (como o anel cilíndrico do Storey).
* `04-typography/`: Pares tipográficos suíços e neo-brutalistas com tracking negativo e fórmulas de `clamp()`.

---

## 🤝 Como Contribuir no GitHub

1. Crie uma branch para o novo site de referência ou cliente:
   ```bash
   git checkout -b feature/novo-esqueleto-ou-cliente
   ```
2. Após capturar ou refinar, rode o Quality Gate:
   ```bash
   npm run audit <nome-da-pasta>
   ```
3. Faça o commit e envie o Pull Request:
   ```bash
   git add .
   git commit -m "feat: adiciona esqueleto e design tokens para [Marca]"
   git push origin feature/novo-esqueleto-ou-cliente
   ```
