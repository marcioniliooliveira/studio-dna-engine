# Memory Index

## Project Conventions

- [project] Always create a new dedicated branch for major code changes → project-conventions.md
- [project] Playwright cloning conventions for high-fidelity layouts → project-conventions.md
- [project] Always create dual versions (HTML static + Next.js) when copying websites → project-conventions.md

## Interpretable Context Methodology (ICM) & Client Isolation

- [project] ICM significa Interpretable Context Methodology; não confundir com o pipeline de transmutação → strategic-alignment.md
- [icm] **Scope Isolation:** Cada pasta em `clientes/` é um ambiente 100% isolado. NUNCA cruzar cores, tokens ou copy entre clientes.
- [icm] **Esqueletos Read-Only:** A pasta `copias/` contém os clones brutos de alta fidelidade intocáveis. Nunca altere um arquivo em `copias/` diretamente.
- [icm] **Transmutação Determinística & Zero Tailored Scripts:** A IA planeja exclusivamente em schemas declarativos (`brand-spec.json`, `composition-spec.json`). A compilação é 100% executada pelo compilador universal (`src/pipeline/transmuter.js`). NUNCA criar scripts particulares/ad-hoc por cliente (`transmute-<cliente>.js`).
- [icm] **DNA Lock Per-Client:** As regras de P0/P1 devem ser lidas exclusivamente do `DNA.md` ou `brand-spec.json` da pasta do cliente ativo.

## Strategic Direction

- [project] Produto-alvo: infraestrutura reference-driven para sites premium, não um clonador genérico → strategic-alignment.md
- [project] IA planeja em schemas; compiladores constroem; gates independentes comprovam o resultado → strategic-alignment.md
- [project] Caminho comercial: uso interno → serviço produtizado → beta de agências → SaaS/API/marketplace → strategic-alignment.md
- [project] Retomar esta visão após segurança, reprodutibilidade, ICM/Vault e piloto serem validados → strategic-alignment.md

## Diretório de Clientes e Referências

- [caso-01-healthtech] **PulseMed** (`clientes/caso-01-healthtech/`): Base `#120824`, CTA `#E8FF54`, ref `copias/urbi-ae`.
- [caso-03-d2c] **APEX Wireless** (`clientes/flashtech-caso-03-d2c/`): Base `#02040A`, CTA `#00F0FF`, ref `copias/ciao-energy`.
- [caso-02-ecommerce] **NorthTrail** (`clientes/flashtech-caso-02-ecommerce/`): Tokens `trail.orange=#ea580c`, `sand.100=#f5f1e8`.
- [caso-apex-barbearia] **Apex Barbearia** (`clientes/apex-barbearia/`): Base `#0A0A0A`, CTA `#C8A97E`, Maringá - PR (2 Unidades), ref `copias/barbershop-landing-51-aura-build`.
- [portfolio-webdev] **Web Developer Portfolio Reference** (ref `copias/likova-space/`): Referência pura mantida 100% intacta; transmutação será alinhada futuramente.
- [ref-21oaks] **21Oaks Reference** (`copias/21oaks-org/`): Referência pura com reveals funcionais restaurados via SplitText nativo universal e proteção de tweens GSAP.
- [ref-aircenter] **AIR Center Reference** (`copias/aircenter-space/`): Referência pura com DOM completo (146KB), 3D ribbon, matriz de mobilidade e popovers técnicos operando com 0 erros de console.
- [lead-silvio-iwata] **Silvio Iwata Imobiliária** (`clientes/silvio-iwata-imobiliaria/`): Lead imobiliário Maringá. Aguardando sessão de alinhamento com o usuário para definir narrativa, posicionamento e seleção de componentes.
- [lead-integrii] **Integrii Imóveis** (`clientes/integrii-imoveis/`): Lead imobiliário Urbano/Agro. Aguardando sessão de alinhamento com o usuário para definir cisão de marca, tokens e componentes.
