# Especificação de Design — Demonstrações Imobiliárias para Integri e Silvio Iwata

Data: 2026-09-21  
Estado: proposta escrita para revisão do usuário  
Escopo: duas demonstrações offline, independentes e orientadas à geração de reuniões

## 1. Objetivo

Criar duas experiências demonstrativas distintas para apresentar a leads imobiliários por múltiplas frentes de contato. Cada experiência deve comunicar valor em uma navegação inicial completa, elevar percepção de autoridade e reduzir fricção no caminho entre descoberta do imóvel e pedido de contato.

As demonstrações não são sites de produção, não terão backend e não devem sugerir que imagens, imóveis, métricas ou disponibilidade demonstrativos são dados confirmados.

O resultado deve ser inspirado nas referências escolhidas, mas não um clone de branding, copy, assets ou dados.

## 2. Decisões já aprovadas

- Dois projetos separados: `clientes/integrii-imoveis/` e `clientes/silvio-iwata-imobiliaria/`.
- Conteúdo demonstrativo, com placeholders visuais coerentes e identificáveis como demonstração quando necessário.
- Sem assets fornecidos como autorizados; nenhum asset das referências será reutilizado como conteúdo do cliente.
- Fontes serão locais e licenciadas; quando isso não for possível, será usado fallback do sistema sem dependência remota.
- Sem tokens ou identidade FlashTech.
- Logos atuais dos leads serão mantidos.
- A identidade cromática própria de cada lead será preservada como fonte de verdade visual.
- Integri: referência dominante 21 Oaks, com reprodução quase literal da estrutura do hero e adaptação consciente do conteúdo.
- Silvio Iwata: composição aproximadamente 50/50 entre Aircenter e 21 Oaks.
- Narrativa linear, com autoplay mantido no hero quando fizer sentido.
- CTA direcionado a três intenções: comprar, alugar e investir.
- CTA leva a uma tela intermediária, não diretamente a WhatsApp ou telefone.
- Tela intermediária é somente template visual nesta fase, sem backend.
- Primeira versão deve funcionar offline com assets locais.
- QA obrigatório em desktop de 1440px, mobile e largura intermediária.

## 3. Fonte de verdade e isolamento

### 3.1 Cliente Integri

Entradas permitidas:

- `clientes/integrii-imoveis/DNA.md`
- `clientes/integrii-imoveis/brand-spec.json`
- conteúdo público observado em `https://integriimoveis.com.br/`, usado apenas como referência de posicionamento e categorias

Direção observada: catálogo imobiliário regional com busca por compra, rural, localização, tipo, valor e características do imóvel; destaques de venda; atendimento e localização em Paiçandu.

### 3.2 Cliente Silvio Iwata

Entradas permitidas:

- `clientes/silvio-iwata-imobiliaria/DNA.md`
- `clientes/silvio-iwata-imobiliaria/brand-spec.json`
- conteúdo público observado em `https://silvioiwata.com.br/`, usado apenas como referência de posicionamento e categorias

Direção observada: imobiliária estabelecida em Maringá, com venda, locação, lançamentos, institucional, catálogo de empreendimentos, amenities, histórico empresarial e múltiplos canais de atendimento.

### 3.3 Referências imutáveis

`copias/` permanece somente leitura. Nenhum arquivo de `copias/21oaks-org/` ou `copias/aircenter-space/` será editado. Os clientes receberão derivados isolados.

## 4. Sistema visual

### 4.1 Integri

Preservar como base de identidade:

- azul naval observado no DNA do cliente;
- neutros compatíveis com o azul naval;
- Poppins para corpo e interface;
- Plus Jakarta Sans para display, se a leitura visual confirmar ganho de hierarquia;
- JetBrains Mono somente para dados técnicos, caso não quebre o caráter imobiliário regional.

Não importar a paleta lilás, o wordmark ou a copy de 21 Oaks. SVGs e escolhas de composição da referência podem ser derivados apenas quando não carregarem identidade específica do site original.

### 4.2 Silvio Iwata

Preservar como base de identidade:

- verde institucional profundo;
- verde-lima como acento secundário, sem convertê-lo automaticamente em CTA;
- Plus Jakarta Sans para display;
- Inter para corpo e interface;
- JetBrains Mono apenas para preço, metragem e dados comparativos quando houver benefício de leitura.

Não importar o preto/lilás de 21 Oaks nem a identidade textual ou visual do Aircenter.

### 4.3 Regra de tokens

Os tokens da referência descrevem comportamento, proporção, ritmo e hierarquia. Os tokens do lead descrevem identidade. Em conflito, a identidade do lead vence, exceto quando o elemento for explicitamente uma mecânica estrutural da referência, como uma máscara, barra de progresso ou sticky narrative.

## 5. Arquitetura de experiência

Cada cliente terá uma landing estática autocontida:

```text
cliente/
├── DNA.md
├── brand-spec.json
├── content-slots.json
├── composition-spec.json
└── site/
    ├── index.html
    └── assets/
```

O conteúdo demonstrativo será separado da mecânica sempre que o formato atual permitir. A intenção é que textos, imagens, categorias e destinos possam ser trocados sem reescrever o motor de transição.

O primeiro ciclo não introduzirá framework novo, backend, CMS, API imobiliária ou integração de CRM.

## 6. Experiência da Integri

### 6.1 Hero

O hero deverá manter a lógica de 21 Oaks:

1. imagem de imóvel em tela cheia;
2. título e descrição contextual;
3. thumbnails de imóveis/categorias;
4. troca automática;
5. troca manual por thumbnail;
6. barra de progressão sincronizada;
7. transição circular para a próxima imagem;
8. CTA correspondente à intenção atual;
9. encaminhamento para a seção ou tela intermediária correta.

Estados demonstrativos:

| Estado | Intenção | CTA | Destino |
|---|---|---|---|
| 0 | Comprar | Encontrar um imóvel | catálogo de compra |
| 1 | Alugar | Ver opções para alugar | catálogo de locação |
| 2 | Investir | Conversar sobre oportunidades | tela de contato |

### 6.2 Mecânica de referência a preservar

O implementador deverá estudar e, quando possível, derivar a mecânica destes pontos da referência:

- `copias/21oaks-org/site/index.html:1445` — estrutura do hero, thumbnails, tooltips e SVGs;
- `copias/21oaks-org/site/index.html:301-318` — máscara radial/circular do hero;
- `copias/21oaks-org/site/index.html:2838-2860` — estado das zonas e tooltips;
- `copias/21oaks-org/site/index.html:2980-3005` — estado do slide ativo;
- `copias/21oaks-org/site/index.html:3040-3115` — preload, `clipPath` circular e timeline de troca;
- `copias/21oaks-org/site/index.html:3125-3160` — interação de thumbnails e autoplay;
- `copias/21oaks-org/site/index.html:3564-3618` — progressão e autoplay do slider;
- `copias/21oaks-org/site/index.html:3194-3260` — Lenis e sincronização com ScrollTrigger.

Os números de linha são referências de investigação do checkout atual, não contratos imutáveis; qualquer divergência após edição deve ser registrada no plano de implementação.

### 6.3 Demais seções

Preservar a lógica de descoberta imobiliária, recriando conteúdo não relacionado:

- diferenciais regionais;
- imóveis em destaque;
- tipos de negociação;
- imóveis rurais, quando aplicável;
- mapa estático de Maringá e região, com Paiçandu destacado quando fizer sentido para a Integri;
- CTA intermediário;
- rodapé com dados demonstrativos coesos.

Não reproduzir testimonials estudantis, campus, dormitórios ou amenities sem tradução real para imóveis.

## 7. Experiência da Silvio Iwata

### 7.1 Hero

O hero inicial utilizará uma imagem local demonstrativa de casa ou empreendimento. O objetivo imediato é preservar o comportamento fluido do Aircenter enquanto o conteúdo imobiliário é substituído.

Preservar:

- seção full-height;
- sticky layers;
- parallax de imagem;
- reveal de texto e imagem;
- transição conectada entre seções;
- mudança de tema quando contribuir para a narrativa;
- progressão de conteúdo quando houver mais de um estado.

Pontos de investigação da referência:

- `copias/aircenter-space/site/index.html:306-401` — hero, sticky, parallax e background;
- `copias/aircenter-space/site/index.html:404-503` — reveal e transição da seção narrativa;
- `copias/aircenter-space/site/index.html:506-641` — conteúdo sequencial, counter e progress bar;
- `copias/aircenter-space/site/index.html:903-975` — mapa e sticky map;
- `copias/aircenter-space/site/index.html:1242-1326` — slider final e progressão;
- atributos `data-plugin="parallax"`, `data-plugin="reveal"`, `data-plugin="cursor"` e `data-content-animation-*` — contratos comportamentais a mapear antes da adaptação.

### 7.2 Sequência narrativa

1. autoridade e posicionamento em Maringá;
2. imagem de impacto de imóvel/empreendimento;
3. compra, locação e investimento;
4. lançamentos e amenities;
5. localização em Maringá e região;
6. prova institucional e histórico;
7. tela intermediária de contato.

### 7.3 Conteúdo a recriar

Conteúdo de 21 Oaks não relacionado ao setor será substituído por:

- experiência de morar;
- atributos dos empreendimentos;
- localização e mobilidade;
- áreas comuns;
- flexibilidade para diferentes perfis de comprador;
- decisão entre morar, alugar ou investir.

O histórico público “desde 1976” poderá ser usado como elemento institucional demonstrativo, sem transformar a demonstração em promessa não comprovada.

## 8. Tela intermediária de contato

Cada intenção selecionada abrirá uma tela intermediária dentro do mesmo site.

Exemplo de conteúdo:

```text
Você está buscando comprar um imóvel em Maringá.
Conte o que procura e prepare uma conversa com nossa equipe.

[Nome]
[E-mail ou WhatsApp]
[Região/interesse]
[Mensagem]

[Solicitar atendimento]
```

Nesta fase:

- não haverá envio real;
- não haverá API;
- não haverá backend;
- o botão poderá exibir confirmação local ou uma instrução de próximo passo;
- a ação poderá apontar para um destino preparado, mas qualquer contato real permanecerá desabilitado;
- a tela deve parecer pronta para integração, mas não pode afirmar que enviou um lead.

## 9. Dados demonstrativos

Os registros demonstrativos deverão usar um schema comum:

```json
{
  "id": "demo-001",
  "intent": "buy",
  "title": "Casa demonstrativa em região valorizada",
  "location": "Maringá e região",
  "propertyType": "Casa",
  "area": "120 m²",
  "bedrooms": "3",
  "bathrooms": "2",
  "parking": "2 vagas",
  "price": "Sob consulta",
  "availability": "Demonstrativo",
  "image": "assets/properties/demo-001.webp"
}
```

Não usar preços, endereços, metragem, disponibilidade, depoimentos ou métricas de performance que não estejam claramente classificados como demonstrativos ou observados em fonte pública.

## 10. Responsividade e degradação

- Desktop: preservar a experiência completa de motion.
- Tablet/intermediário: reduzir sobreposição e densidade, mantendo a narrativa.
- Mobile: substituir o reveal circular pesado por transição leve de opacidade/clip quando necessário; manter ordem, CTA e legibilidade.
- `prefers-reduced-motion`: desativar autoplay e reduzir transforms/reveals.
- Falha de asset: mostrar estado visual honesto; não fabricar resposta de sucesso.
- Falha de funcionalidade de formulário: declarar “demonstração” ou “próximo passo não conectado”.

## 11. Critérios de aceitação

### Conteúdo e identidade

- Nenhum texto ou marca residual das referências.
- Nenhum token FlashTech.
- Logos e paletas corretos para cada lead.
- Placeholders reconhecíveis como demonstrativos.
- Copy específica para compra, aluguel e investimento.

### Interação

- Hero alterna automaticamente.
- Clique manual funciona.
- Progress bar acompanha o estado atual.
- CTA muda com o estado atual.
- Reveal circular funciona no desktop da Integri.
- Silvio mantém transições de seção fluídas.
- Mobile não fica bloqueado por Lenis, GSAP ou estados de loading.

### Operação

- Os dois sites funcionam offline.
- Nenhuma dependência obrigatória de Vimeo, CDN ou fonte remota.
- Navegação completa funciona em 1440px, mobile e largura intermediária.
- Nenhum erro de JavaScript, asset quebrado ou destino morto nos fluxos principais.
- O processo de teste deve distinguir claramente demonstração, fallback e sucesso real.

## 12. Fora de escopo

- Backend de leads.
- Integração com WhatsApp, CRM, RD Station, Analytics ou calendário.
- Catálogo sincronizado em tempo real.
- Mapa interativo.
- Produção de fotos ou vídeos reais.
- Alteração direta das referências em `copias/`.
- Promoção para `verified` ou `production`.

## 13. Risco principal

O risco mais grave é a demonstração parecer uma oferta imobiliária real sem ter dados, assets ou disponibilidade autorizados. Para evitar isso, cada asset e registro será local, demonstrativo e coerente com o contexto da seção; a tela intermediária nunca afirmará que um contato foi enviado.

## 14. Gate seguinte

Esta especificação precisa ser revisada pelo usuário antes da criação do plano de implementação. Alterações de identidade, escopo, dados ou comportamento devem ser feitas aqui antes de editar os sites.
