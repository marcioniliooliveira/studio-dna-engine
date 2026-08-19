# ⚡ Studio DNA - AI Web Design & Reverse Engineering Engine

> **Motor de Engenharia Reversa de Web Design, Extração de Design Tokens, Shaders GLSL e Compilação de Prompts para IAs (Cursor, Claude, v0).**

Este repositório é uma ferramenta interna de alta performance para desenvolvedores e *Vibe Coders* extraírem a "fórmula visual" de sites de padrão mundial (*Awwwards, Godly, Linear, Apple*) e transformá-la em código limpo, componentes Tailwind e instruções estruturadas para Inteligências Artificiais.

---

## 🚀 Como Começar em 2 Minutos

### 1. Instalação Automática (1 Clique)

* **Windows:** Dê um duplo-clique no arquivo `setup.bat` (ele instala o Node, dependências e baixa o Chromium do Playwright automaticamente).
* **Linux / macOS:** Execute no terminal:
  ```bash
  chmod +x setup.sh && ./setup.sh
  ```
* **Instalação Manual:**
  ```bash
  npm install
  npx playwright install --with-deps chromium
  ```

---

### 2. Formas de Usar a Ferramenta

#### 🌐 Modo A: Dashboard Visual Interativo (Recomendado)
A melhor experiência visual com visualizador de Shaders, paleta de cores e botão de 1 clique para copiar prompts para o Cursor/Claude:
```bash
npm run preview
```
Abra o navegador em: **`http://localhost:4000`**

---

#### 💻 Modo B: Linha de Comando (Terminal / CLI)
Para extrair um site direto pelo terminal:
```bash
# Modo Interativo com perguntas:
npm start

# Extração direta de uma URL:
node bin/cli.js https://exemplo.com

# Extração com navegador visível na tela (Debug / Headed):
node bin/cli.js https://exemplo.com --headed

# Extrair apenas animações e micro-interações:
node bin/cli.js https://exemplo.com --mode ui
```

---

#### 🐳 Modo C: Execução via Docker (Zero Instalação Local)
```bash
docker compose run --rm cloner https://exemplo.com
```

---

## ✅ O Que Essa Ferramenta FAZ (Capacidades)

1. **🔬 Detecção Inteligente de Frameworks:**
   - Identifica se o site é React, Next.js, Vue, Nuxt, Webflow, Framer, WordPress, Astro ou Gatsby e ajusta o modo de extração automaticamente.

2. **🎨 Extração de Design DNA & Tokens:**
   - Mapeia variáveis CSS (`:root`), cores Hex/RGB/HSL, escala tipográfica computada, pesos de fonte e hierarquia de seções.
   - Gera automaticamente o arquivo `tailwind.config.js` correspondente.

3. **🔮 Intercepção de Shaders GLSL & WebGL 3D (Three.js):**
   - Captura o código-fonte de todos os **Vertex Shaders** e **Fragment Shaders (.glsl)** que passam pela GPU.

4. **⚡ Desconstrução de Animações GSAP & ScrollTrigger:**
   - Extrai as curvas de aceleração (`ease`), durações (`duration`), atrasos (`stagger`) e gera snippets JavaScript limpos e reutilizáveis.

5. **🎯 Mapeamento de Micro-Interações & Física:**
   - Detecta e cria receitas para botões magnéticos (*Magnetic Buttons*), efeitos de holofote (*Spotlight Cards*), rotação 3D (*Tilt Cards*) e *Lenis Smooth Scroll*.

6. **🤖 Compilação do `MASTER_SPEC.md` para IAs:**
   - Gera um manual completo e estruturado pronto para você colar no **Cursor**, **Claude** ou **v0**, permitindo que a IA recrie o site idêntico com máxima fidelidade estética.

---

## ❌ O Que Essa Ferramenta NÃO FAZ (Limitações Reais)

Para evitar expectativas incorretas sobre a engenharia reversa de navegadores:

1. **🚫 Não extrai Lógica de Backend, Banco de Dados ou APIs Privadas:**
   - A ferramenta roda no navegador (frontend). Ela não tem acesso ao código Node.js/Python do servidor, regras de banco de dados (Postgres/Supabase) ou chaves secretas do Stripe.
   - *O que fazer:* A IA usa o `MASTER_SPEC.md` para **escrever um backend novo** correspondente.

2. **🚫 Não descompila nomes de variáveis originais de React minificado:**
   - O código compilado de produção de SPAs chega ofuscado (`function a(b,c){...}`). A ferramenta não tenta adivinhar os nomes de variáveis locais originais do desenvolvedor.
   - *O que fazer:* Ela extrai o comportamento visual e gera snippets **novos, limpos e legíveis**.

3. **🚫 Não quebra senhas ou telas de login sem autenticação:**
   - Se o design estiver atrás de um login restrito (ex: Dashboard interna do Notion), você precisa rodar no modo `--headed` para fazer o login manualmente ou passar os cookies de sessão no `cloner.config.json`.

4. **🚫 Não descompila binários WebAssembly (WASM):**
   - Se a física do site estiver compilada em binário C++/Rust (.wasm), ela captura apenas os shaders e texturas enviadas para o Canvas, não o código-fonte C++.

---

## 📁 Estrutura das Cópias Geradas (`./copias/`)

Ao rodar a extração em um site (ex: `https://site-referencia.com`), a pasta de saída fica organizada assim:

```text
copias/site-referencia/
├── SITE_TYPE.json                  # Diagnóstico de tecnologia e framework
├── MASTER_SPEC.md                  # Prompt Mestre estruturado para IAs
├── site/                           # Clone HTML, CSS, fontes e mídias originais
│   ├── index.html
│   └── assets/
├── design-system/                  # Design Tokens & Styleguide Visual
│   ├── design_dna.json
│   └── design-system.html
└── ui-ux/                          # Animações e Shaders extraídos
    ├── ui_ux_features.json
    ├── shaders/                    # Código GLSL dos Vertex e Fragment Shaders
    └── snippets/                   # Código limpo de GSAP, ScrollTrigger e Micro-interações
```

---

## 📄 Licença & Uso

**Uso Interno & Proprietário (Privado).**  
Proibida a redistribuição pública do código-fonte sem autorização.
