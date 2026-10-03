# Memory Index

## Project Conventions
- [project] Always create a new dedicated branch for major code changes → project-conventions.md
- [project] Playwright cloning conventions for high-fidelity layouts → project-conventions.md
- [project] Always create dual versions (HTML static + Next.js) when copying websites → project-conventions.md

## Interpretable Context Methodology (ICM) & Client Isolation
- [project] ICM significa Interpretable Context Methodology; não confundir com o pipeline de transmutação → strategic-alignment.md
- [icm] **Scope Isolation:** Cada pasta em `clientes/` é um ambiente 100% isolado. NUNCA cruzar cores, tokens ou copy entre clientes.
- [icm] **Esqueletos Read-Only:** A pasta `copias/` contém os clones brutos de alta fidelidade intocáveis. Nunca altere um arquivo em `copias/` diretamente.
- [icm] **Transmutação Determinística:** Usar scripts de transmutação em `scripts/` orientados por `brand-spec.json` para evitar AI Slop ao adaptar esqueletos de 10MB.
- [icm] **DNA Lock Per-Client:** As regras de P0/P1 devem ser lidas exclusivamente do `DNA.md` ou `brand-spec.json` da pasta do cliente ativo.

## Strategic Direction
- [project] Produto-alvo: infraestrutura reference-driven para sites premium, não um clonador genérico → strategic-alignment.md
- [project] IA planeja em schemas; compiladores constroem; gates independentes comprovam o resultado → strategic-alignment.md
- [project] Caminho comercial: uso interno → serviço produtizado → beta de agências → SaaS/API/marketplace → strategic-alignment.md
- [project] Retomar esta visão após segurança, reprodutibilidade, ICM/Vault e piloto serem validados → strategic-alignment.md

## Diretório de Clientes Ativos
- [caso-01-healthtech] **PulseMed** (`clientes/caso-01-healthtech/`): Base `#120824`, CTA `#E8FF54`, ref `copias/urbi-ae`.
- [caso-03-d2c] **APEX Wireless** (`clientes/flashtech-caso-03-d2c/`): Base `#02040A`, CTA `#00F0FF`, ref `copias/ciao-energy`.
- [caso-02-ecommerce] **NorthTrail** (`clientes/flashtech-caso-02-ecommerce/`): Tokens `trail.orange=#ea580c`, `sand.100=#f5f1e8`.
- [marcionilio-oliveira] **Marcionilio Oliveira** (`clientes/marcionilio-oliveira/`): Base `#262220`, Marfim `#FAF9F6`, ref `copias/khanhnguyen-design`.
- [opxy-tuning-lab] **OP-XY Tuning Lab** (`clientes/opxy-tuning-lab/`): Synth 8-beat scroll lab, dual-gradient backdrop/step sync, ref `copias/op-xy-76-aura-build`.
- [caso-04-growth] **SCALEX Digital** (`clientes/flashtech-caso-04-growth/`): Base `#F8F8F6`, CTA `#FFC552`, ref `copias/acilav-webflow-io`.
- [negocia-bem] **Negocia Bem** (`clientes/negocia-bem/`): Imobiliária Paiçandu & Maringá, ref `copias/elyse-residence-dev-webflow-io`.
- [caso-apex-barbearia] **Apex Barbearia** (`clientes/apex-barbearia/`): Base `#0A0A0A`, CTA `#C8A97E`, ref `copias/barbershop-landing-51-aura-build`.
- [portfolio-webdev] **Web Developer Portfolio Reference** (ref `copias/likova-space/`): Referência pura mantida 100% intacta.
- [ref-21oaks] **21Oaks Reference** (`copias/21oaks-org/`): Referência pura com reveals funcionais restaurados via SplitText nativo universal.
- [ref-aircenter] **AIR Center Reference** (`copias/aircenter-space/`): Referência pura com 3D ribbon e matriz de mobilidade.
- [jumpflex-home-evolution] **Jumpflex Home Evolution** (`clientes/jumpflex-home-evolution/`): Design System Kinetic Toybox (`#2976C7`, `#FF562D`, `#181B2D`), DNA Live Tuning HUD adaptado, simulador de quintal ABNT, física de molas de Hooke e dual-funnel B2C/B2B.

