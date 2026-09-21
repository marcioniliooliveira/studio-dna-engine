# 🏛️ Design OS — Dissecação Anatômica de Referência: `Urbi.ae` ➔ `Caso 01 • HealthTech`

> **Objetivo:** Estabelecer um ambiente hermético de engenharia reversa e alinhamento de design. Dissecamos cada uma das 12 seções brutas extraídas de `copias/urbi-ae/site/sections/` para distinguir rigorosamente:
> 1. **KEEP (Mecânica & Cinética de Valor):** Grids, física de scroll (Lenis), curvas de easing, gatilhos GSAP, tipografia responsiva e micro-interações.
> 2. **EJECT (Resíduos de Domínio da Referência):** Metáforas de GPS, tráfego de frotas, satélites, mapas de estradas e logística urbana que pertencem à Urbi.
> 3. **TRANSMUTE (Metáfora Médica & Proposta de Valor):** Componentes equivalentes para Telemedicina, Agendamento em 3 Chunks (Lei de Miller), Prescrição Digital ICP-Brasil e Conformidade CFM/LGPD.

---

## 🗺️ Matriz Geral de Dissecação (12 Seções do Esqueleto Bruto)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ SEÇÃO BRUTA           │ DOMÍNIO URBI (ORIGINAL)       │ TRANSMUTAÇÃO HEALTHTECH (NOVO)           │
├───────────────────────┼───────────────────────────────┼──────────────────────────────────────────┤
│ 00_s-hero.html        │ Geo-Platform & Navegação      │ Telemedicina 24h & 3 Chunks de Miller    │
│ 01_section.html       │ Clientes Governamentais / KSA │ Certificações Médicas & CFM / LGPD / AAA │
│ 02_section.html       │ Manifesto Geoespacial         │ Manifesto de Acolhimento & Teleconsulta  │
│ 03_section.html       │ Indoor Maps, APIs, SDKs       │ 01 Especialista, 02 Grade Horários, 03 Wpp│
│ 04_section.html       │ Urbi Atlas (Painel de Mapas)  │ Sala de Consulta Virtual & Vídeo WebRTC  │
│ 05_section.html       │ CityLens (Visão Computacional)│ Prescrição Digital ICP-Brasil & Laudos   │
│ 06_section.html       │ On-Premises Data Security     │ Prontuário Criptografado & Nuvem Hospital│
│ 07_section.html       │ Indústrias Atendidas          │ Especialidades Médicas do Corpo Clínico  │
│ 08_cases.html         │ Casos de Otimização de Frota  │ Jornadas Clínicas & Histórias de Pacientes│
│ 09_contact.html       │ Formulário de Vendas B2B      │ Triagem Imediata & Agendamento Instantâneo│
│ 10_section.html       │ Cobertura Global de Satélite  │ Métricas Clínicas de Performance (CrUX)  │
│ 11_section.html       │ Rodapé Corporativo Urbi       │ Rodapé Regulatório (CFM, LGPD, Suporte)  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔬 Dissecação Seção a Seção

### 📍 Seção 00 — Hero Principal (`00_s-hero.html`)

#### 1. Diagnóstico do Original (Urbi.ae)
* **Tag:** `Geo-intelligence platform`
* **Headline:** *"Precision Data for Enhanced Navigation"*
* **Metáfora dos Cards Flutuantes (`#text-1`, `#text-2`, `#text-3`):**
  - Card 1: `5,5M kilometers length of roads`
  - Card 2: `65M monthly active users in 172 633 cities`
  - Card 3: `7,8M companies profiles in 19 countries`
* **Background:** Vídeo com visualização de malha viária 3D e tráfego noturno.

#### 2. Mecânica & Física a PRESERVAR (KEEP)
* **Escala do Viewport:** `1.058vw` no desktop com transição fluida para breakpoints mobile.
* **Efeito SplitText:** Revelação de texto linha a linha com máscara (`.line-mask`) acionada via GSAP.
* **Gatilho de Scroll dos Cards:** Cards laterais que iniciam invisíveis (`visibility: hidden`) e animam suavemente com ScrollTrigger.
* **Botão de Ação Primária:** `.btn-yellow` com container de seta giratória 3D no hover.

#### 3. O que DEVE ser EXPURGADO (EJECT)
* Textos e estatísticas sobre estradas, frotas, cidades mapeadas e satélites.
* Logo vetorial da Urbi no topo e links corporativos da indústria de transporte.

#### 4. Transmutação de Metáfora Médica (TRANSMUTE)
* **Tag:** `📍 Telemedicina & Agendamento em 3 Chunks`
* **Headline:** `Atendimento Médico em Alta Definição e 3 Etapas`
* **Cards Flutuantes de Alta Confiança Médica:**
  - Card 1: `0.78s` — *LCP auditado em conexão 4G móvel (Zero Espera)*
  - Card 2: `-48%` — *Redução de abandono com divisão em 3 Chunks (Lei de Miller)*
  - Card 3: `99.4%` — *Índice de acolhimento e satisfação dos pacientes*
* **CTAs:**
  - Primário: `Agendar Consulta Agora` (Direciona para o Chunk 01)
  - Secundário: `Conhecer Especialidades` (Com ícone play para tour da plataforma)

---

### 🏛️ Seção 01 — Credenciais & Validação Social (`01_section.html`)

#### 1. Diagnóstico do Original (Urbi.ae)
* **Headline:** `TRUSTED BY`
* **Logos:** Ministérios da Arábia Saudita, RTA Dubai, NEOM, 7x Logistics.

#### 2. Mecânica a PRESERVAR (KEEP)
* Layout em grid horizontal de logos com filtro grayscale e iluminação no hover (`.logos-clients-wrap`).
* Efeito de opacidade suave e texto em caixa alta `text-15-caps opacity-50`.

#### 3. O que DEVE ser EXPURGADO (EJECT)
* Logos de autoridades de trânsito e órgãos municipais do Oriente Médio.

#### 4. Transmutação de Metáfora Médica (TRANSMUTE)
* **Headline:** `CONFORMIDADE MÉDICA & PADRÕES DE SEGURANÇA AUDITADOS`
* **Selos de Autoridade Substitutos:**
  - **CFM:** *Resolução CFM nº 2.314/2022 (Telemedicina Ética)*
  - **ICP-Brasil:** *Prescrição Digital com Chave Criptográfica ICP*
  - **LGPD Saúde:** *Criptografia de Dados Sensíveis de Pacientes*
  - **WCAG 2.2 AAA:** *Acessibilidade Universal de Alto Contraste para Idosos*
  - **CrUX Google:** *Estabilidade Visual CLS 0.000 e LCP Sub-Segundo*

---

### 📖 Seção 02 — Manifesto Institucional (`02_section.html`)

#### 1. Diagnóstico do Original (Urbi.ae)
* **Texto com Destaque Amarelo (`.yellow-span`):**
  *"Urbi empowers governments, businesses, and residents with the most accurate and up-to-date spatial data..."*
* **Subtexto:** Plataforma de integração geoespacial para desafios de mobilidade.

#### 2. Mecânica a PRESERVAR (KEEP)
* Efeito de leitura cinematográfica com spans em destaque de cor neon contrastante (`.yellow-span`).
* Ritmo tipográfico centralizado com largura contida (`.div-624`) para máxima legibilidade.

#### 3. Transmutação de Metáfora Médica (TRANSMUTE)
* **Manifesto Clínico:**  
  *"A PulseMed conecta <span class="yellow-span">pacientes, especialistas e famílias</span> com a mais segura plataforma de telemedicina em alta definição, garantindo consultas humanizadas e agendamento instantâneo sem burocracia."*
* **Subtexto:**  
  *"Nossa infraestrutura médica integra teleconsulta em tempo real, prescrição digital ICP-Brasil e seleção de horários sem paralisia de escolha (Lei de Miller)."*

---

### 🧩 Seção 03 — Os 3 Chunks de Conversão (`03_section.html`)

#### 1. Diagnóstico do Original (Urbi.ae)
* **Headline:** `How we can help?`
* **Cards Originais:**
  - Card 1: `Indoor in venues` (Navegação interna em shopping centers com mapas 3D)
  - Card 2: `APIs and SDKs` (Bibliotecas para desenvolvedores de mapas)
  - Card 3: `Collaboration` (Compartilhamento de dados geoespaciais em equipe)

#### 2. Mecânica a PRESERVAR (KEEP)
* Disposição em cards largos com bordas sutis e animações interativas em Lottie/SVG.
* Transição de hover e elevação de card.

#### 3. O que DEVE ser EXPURGADO (EJECT)
* Animações Lottie com rotas de GPS internas em aeroportos e shoppings.
* Linguagem técnica de desenvolvedor de SDK de mapas.

#### 4. Transmutação de Metáfora Médica (TRANSMUTE — A Lei de Miller em Ação)
* **Headline:** `Como cuidamos da sua saúde em 3 etapas lineares?`
* **Card 01 — Chunk 1:**
  - **Título:** `01 / Escolha do Especialista`
  - **Cópia:** *Filtragem rápida por corpo clínico verificado, tempo de resposta e avaliação real de pacientes.*
* **Card 02 — Chunk 2:**
  - **Título:** `02 / Grade de Horários Zero CLS`
  - **Cópia:** *Seleção visual de datas e horários sem saltos na tela, com reserva dimensional em CSS.*
* **Card 03 — Chunk 3:**
  - **Título:** `03 / Confirmação Instantânea em Túnel Seguro`
  - **Cópia:** *Receba o link seguro da sala de consulta criptografada direto no seu WhatsApp em segundos.*

---

### 🖥️ Seção 04 & 05 — Demonstração da Plataforma (`04_section.html` & `05_section.html`)

#### 1. Diagnóstico do Original (Urbi.ae)
* **Urbi Atlas & CityLens:** Visualizadores de dados urbanos, análise de tráfego e dashboards de mapas.

#### 2. Mecânica a PRESERVAR (KEEP)
* Estrutura em abas dinâmicas (`.tabs-menu-atlas`) com transição de conteúdo animada via JS.
* Molduras escuras simulando telas de software de alta performance.

#### 3. Transmutação de Metáfora Médica (TRANSMUTE)
* **Nome do Módulo:** `Ambiente Clínico de Telemedicina de Alta Definição`
* **As 3 Abas Clínicas:**
  - **Aba 01 — Vídeo Consulta P2P:** *Transmissão médica em tempo real sem instalação de apps, direto no navegador com áudio cristalino.*
  - **Aba 02 — Prontuário em Nuvem Unificado:** *Histórico clínico e exames anexados protegidos por criptografia de ponta.*
  - **Aba 03 — Prescrição Digital ICP-Brasil:** *Receitas médicas e atestados com QR Code de validação farmacêutica nacional.*

---

### 🛡️ Seção 06 — Privacidade & Segurança de Dados (`06_section.html`)

#### 1. Diagnóstico do Original (Urbi.ae)
* **Título:** `Keep Your Data In-House with Urbi On-Premises`
* **Propósito Original:** Instalação de servidores locais para dados de inteligência militar e municipal.

#### 2. Mecânica a PRESERVAR (KEEP)
* Layout de alta credibilidade e contraste focado em segurança de infraestrutura.

#### 3. Transmutação de Metáfora Médica (TRANSMUTE)
* **Título:** `Privacidade Absoluta e Conformidade Estrita CFM & LGPD`
* **Pilar de Segurança:**  
  *Zero persistência de dados de saúde no localStorage do navegador do paciente. A triagem inicial trafega em túnel seguro tipado com Zod direto para a infraestrutura hospitalar.*

---

### 🏥 Seção 07 — Especialidades Médicas (`07_section.html`)

#### 1. Diagnóstico do Original (Urbi.ae)
* **Título:** `We Support All Industries`
* **Itens Originais:** *Logistics, Government, Energy, Health, Businesses.*

#### 2. Transmutação de Metáfora Médica (TRANSMUTE)
* **Título:** `Corpo Clínico & Especialidades Atendidas`
* **Grid de Especialidades:**
  1. **Clínica Geral & Pronto Atendimento 24h** (Triagem imediata)
  2. **Cardiologia Digital** (Acompanhamento e tele-eletrocardiograma)
  3. **Pediatria Integrada** (Acolhimento humanizado infantil)
  4. **Dermatologia Clínica** (Análise de lesões via imagens em alta resolução)
  5. **Psiquiatria & Saúde Mental** (Sessões protegidas com sigilo absoluto)

---

### 📊 Seção 08 — Casos Clínicos & Jornadas (`08_cases.html`)

#### 1. Diagnóstico do Original (Urbi.ae)
* **Título:** `Case studies`
* **Itens:** Otimização de tempo de entrega para frotas de delivery no Oriente Médio.

#### 2. Transmutação de Metáfora Médica (TRANSMUTE)
* **Título:** `Jornadas Clínicas Humanizadas`
* **Casos de Uso Reais:**
  - *Caso 01:* Atendimento pediátrico emergencial às 23h sem deslocamento hospitalar.
  - *Caso 02:* Emissão de receita controlada com QR Code ICP-Brasil para paciente em viagem.
  - *Caso 03:* Acompanhamento cardiológico contínuo com histórico compartilhado.

---

### 📝 Seção 09 & 10 — Agendamento Instantâneo & Footer (`09_contact.html` & `11_section.html`)

#### 1. Diagnóstico do Original (Urbi.ae)
* Formulário de contato comercial B2B para contratação de planos de geolocalização corporativa.

#### 2. Transmutação de Metáfora Médica (TRANSMUTE)
* **Formulário de Agendamento em 3 Etapas:**
  - Campo 1: Seleção de Especialidade / Sintoma
  - Campo 2: Data & Horário Preferencial
  - Campo 3: WhatsApp para envio da confirmação e link da consulta
* **Botão CTA:** `Confirmar Agendamento Instantâneo`
* **Rodapé:** Declarações regulatórias do Conselho Federal de Medicina, Termos de Teleconsulta e Política de Privacidade LGPD.

---

## 💬 Perguntas de Alinhamento para o Usuário

Antes de fixarmos as regras deste Design OS para a transmutação final:

1. **Abordagem das Ilustrações/Lotties da Seção 03:**  
   No esqueleto original, a Urbi usava SVGs de rotas internas. Deseja que mantenhamos os containers com **ícones médicos vetoriais limpos** (estilo Lucide/Plus Jakarta) em alta resolução?
2. **Vídeo de Background do Hero:**  
   Deseja manter o loop cinematográfico original de partículas escuras ou prefere um gradiente atmosférico fluido em CSS com física acelerada por GPU?
3. **Fluxo do Botão CTA:**  
   O clique no botão do Hero deve rolar suavemente via Lenis para a Seção 03 (Os 3 Chunks) ou abrir direto a gaveta de agendamento na Seção 09?
