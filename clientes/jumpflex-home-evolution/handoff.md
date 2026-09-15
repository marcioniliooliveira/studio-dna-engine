# Jumpflex Home Evolution — Handoff de Produto, Design e Engenharia

> **Escopo:** somente o projeto Jumpflex Home Evolution.
> **Status do projeto:** `experimental` — este status é herdado do repositório e não representa aprovação de produção.
> **Última atualização:** 14 de setembro de 2026.
> **Canvas de trabalho (Jornada Completa 01-07):** `.kombai/canvas/jumpflex-home-journey.canvas`
> **Canvas de exploração da marca:** `.kombai/canvas/jumpflex-com-home.canvas`
> **Clone fiel de referência de mercado:** `.kombai/canvas/ACON24 home — faithful canvas clone.html`
> **Regra de isolamento:** este documento não altera `AGENTS.md`, `PROJECT_STATUS.md`, `HANDOFF.md`, outros clientes ou referências em `copias/`.

---

## 1. Propósito deste handoff

Este documento é a fonte de contexto local para a evolução da experiência Jumpflex. Ele existe para que qualquer pessoa ou agente possa continuar o projeto sem depender da conversa anterior, de memória informal ou de decisões implícitas.

O projeto evolui a partir da jornada completa estruturada no canvas `.kombai/canvas/jumpflex-home-journey.canvas`, integrando em 7 passos as necessidades de dois públicos:

1. **Varejo / B2C:** famílias escolhendo um trampolim para casa.
2. **Atacado / B2B:** parques, escolas, academias, hotéis, revendedores e compradores de múltiplas unidades.

A experiência equilibra desejo, clareza de produto e velocidade de compra. A cinematografia é parte da identidade, nunca uma barreira para o CTA, a leitura, o scroll ou o checkout.

---

## 2. Evidências e grau de confiança

| Item | Classificação | Evidência local |
|---|---|---|
| 01 — Hero aprovada em português | **observed** | `.kombai/canvas/jumpflex-home-journey.canvas#var_7a47e15710d1` |
| 02 — Transição scroll para produtos | **observed** | `.kombai/canvas/jumpflex-home-journey.canvas#var_b9f8748b1348` |
| 03 — Rail FLEX HERO MEGA | **observed** | `.kombai/canvas/jumpflex-home-journey.canvas#var_092a219c2804` |
| 04 — Comparação de produtos | **observed** | `.kombai/canvas/jumpflex-home-journey.canvas#var_47a45989be71` |
| 05 — Prova social e garantia | **observed** | `.kombai/canvas/jumpflex-home-journey.canvas#var_e0299567d1d9` |
| 06 — Entrada B2B e cotação | **observed** | `.kombai/canvas/jumpflex-home-journey.canvas#var_64e488c7896b` |
| 07 — FAQ e footer | **observed** | `.kombai/canvas/jumpflex-home-journey.canvas#var_8440816dee7e` |
| A composição aprovada é hero escura, centralizada, com headline display e CTA lime | **observed** | Nó `#var_7a47e15710d1` renderizado |
| A animação preferida é scroll-driven com telemetria reversível | **observed** | Nó `#var_b9f8748b1348` (scroll progress 48%, sem pin bloqueante) |
| O projeto atende varejo e atacado com funis paralelos | **documented** | Seções 01, 04 e 06 com CTAs dedicados (`VIEW RANGE` e `BUY IN QUANTITY`) |
| A hero não deve exibir preço | **documented** | Preços mantidos exclusivamente nas coleções e na matriz |
| Tokens finais de marca, copy aprovada e preços em reais/dólar | **unverified** | Slots marcados como `[PENDENTE]` no canvas |
| Licenciamento definitivo das imagens de fundo e stock | **unverified** | A base usa mídia de referência; validar antes de produção |
| Implementação final no diretório de runtime `clientes/` | **unverified** | Canvas e handoff consolidados; código de produção em validação |
| Aprovação para produção | **unverified** | O repositório permanece em maturidade `experimental` |

**Protocolo de verdade:** runtime, testes e artefatos imutáveis prevalecem sobre este documento. Nenhum item marcado `unverified` pode ser tratado como requisito entregue.

---

## 3. Decisões aprovadas

### 3.1 Direção visual

- Base visual: **Family joy / Family reveal**.
- Hero full-bleed, escura e centralizada.
- Headline de alto impacto em fonte display condensada.
- `JOY.` destacado em verde-lima.
- Sale bar vermelha no topo.
- Header escuro/translúcido com navegação Jumpflex.
- Azul elétrico usado como detalhe, sombra deslocada, linha, progresso ou overlay.
- Geometria esportiva premium: bordas retas, alto contraste, overlays e composição editorial.
- A hero precisa manter leitura mesmo quando a imagem falhar, atrasar ou for substituída.

### 3.2 Mensagem e CTAs

CTA primário da experiência:

```text
VIEW RANGE
```

CTA secundário de menor peso visual:

```text
BUY IN QUANTITY / GET A BULK QUOTE
```

A hero não deve inventar ou antecipar preço. O encaminhamento de varejo acontece pela faixa de produtos; o encaminhamento B2B acontece por cotação e, posteriormente, por carrinho de volume.

### 3.3 Produtos

A comparação deve usar três linhas distintas:

- **FLEX™** — posicionamento de uso cotidiano/família.
- **HERO™** — posicionamento de mais ar, diversão e performance.
- **MEGA™** — posicionamento de maior escala e dias de maior uso.

Esses posicionamentos são direção de conteúdo, não claims técnicos finais. Copy oficial, especificações, preços, garantia e provas devem vir do cliente.

### 3.4 Preço e prova

- Hero: sem preço.
- Cards/coleções: poderão exibir `From $X`, preço anterior, economia, parcelamento e condição de volume somente após aprovação dos dados.
- Reviews, quantidade de avaliações, garantia, segurança, durabilidade, MOQ, margem e descontos não podem ser inventados.
- Enquanto os dados não existirem, usar placeholders explicitamente marcados como conteúdo pendente, nunca texto que pareça uma afirmação real.

### 3.5 Motion

A linguagem de movimento deve combinar:

- bounce de palavras da headline;
- stagger de headline, copy, CTAs, badge e tabs;
- parallax suave da imagem;
- entrada scale/rotation do badge promocional;
- indicador/progresso `01 / 04`;
- tabs FLEX™ / HERO™ / MEGA™ entrando de baixo;
- transição scroll-driven entre hero e comparação de produtos;
- microinterações de hover/foco nos CTAs e tabs.

---

## 4. Regras invioláveis

Estas regras devem ser tratadas como contratos de projeto. Uma implementação que as viola violará a direção aprovada, mesmo que visualmente atraente.

### 4.1 Isolamento de contexto

1. O projeto Jumpflex deve permanecer isolado em `clientes/jumpflex-home-evolution/` e no canvas `.kombai/canvas/jumpflex-home-evolution.canvas`.
2. `copias/` é evidência de referência e não deve ser modificada.
3. Não reutilizar tokens, copy, imagens, patches ou decisões de outro cliente como default global.
4. Não modificar `AGENTS.md`, `PROJECT_STATUS.md`, `HANDOFF.md` ou documentação geral para acomodar decisões específicas de Jumpflex.
5. Qualquer novo token deve viver no contexto Jumpflex, não no tema global do repositório.

### 4.2 Experiência de compra

1. `VIEW RANGE` deve estar visível e clicável no primeiro estado.
2. O CTA secundário B2B deve estar acessível sem esperar o fim da animação.
3. Nenhuma animação pode prender o visitante em uma sequência obrigatória.
4. Nenhuma informação essencial pode depender de hover, cursor, áudio ou movimento.
5. A hero deve estabilizar rapidamente e permitir scroll reverso.
6. Texto, CTA e navegação devem aparecer antes de depender de mídia remota.
7. O caminho para escolher FLEX™, HERO™ ou MEGA™ deve ser compreensível sem assistir à animação.

### 4.3 Implementação de movimento

1. GSAP deve ser a única autoridade de animação nos elementos que ele controla.
2. Não misturar CSS transitions nos mesmos elementos animados por GSAP.
3. Priorizar `transform`, `opacity` e `autoAlpha`; não animar `width`, `height`, `top`, `left`, `margin` ou `padding` para criar movimento.
4. Usar `ScrollTrigger` somente quando houver uma relação clara entre scroll e conteúdo.
5. Respeitar `prefers-reduced-motion` com fallback estático ou entrada mínima.
6. Pausar loops quando `document.hidden === true`.
7. Destruir/reverter timelines e triggers quando houver teardown de rota ou componente.
8. Não enviar `GSDevTools`, markers ou instrumentação de desenvolvimento para produção.

### 4.4 Conteúdo e claims

1. Não inventar preço, desconto, avaliação, garantia, certificação, segurança, durabilidade, entrega ou disponibilidade.
2. Não usar os números observados na referência como dados atuais sem aprovação.
3. Placeholders devem ser explícitos e removíveis; não podem parecer copy final.
4. Copy final deve ser isolada em dados/slots para troca sem reescrever a estrutura visual.
5. Atribuição de stock image deve permanecer no alt/documentação enquanto o asset não for substituído por material aprovado.

### 4.5 Qualidade e promoção

1. O status permanece `experimental` até gates executáveis comprovarem o artefato.
2. Não chamar a implementação de `complete`, `fixed`, `validated`, `100%`, `zero errors` ou `production-ready` sem evidência fresca.
3. Preview, QA e produção devem avaliar o mesmo artefato imutável.
4. Material de engenharia deve usar branch dedicada e diff isolado.
5. Mudanças de comportamento devem ter teste de regressão falhando antes da alteração, quando a implementação entrar no código.
6. A revisão visual deve cobrir desktop, mobile, reduced motion, mídia indisponível, teclado e foco.

---

## 5. Escopo funcional

### Dentro do escopo inicial

- Hero Jumpflex baseada no canvas aprovado.
- Sale bar e header responsivos.
- Headline cinética com fallback acessível.
- CTA `VIEW RANGE`.
- CTA `BUY IN QUANTITY / GET A BULK QUOTE`.
- Navegação para comparação FLEX™ / HERO™ / MEGA™.
- Cards comparativos de produto.
- Reviews e garantia como slots pendentes até aprovação.
- Página de coleção por linha.
- Página de produto com preço, parcelamento, entrega, garantia e `Buy now` quando os dados existirem.
- Landing page B2B com formulário curto de cotação.
- Instrumentação dos eventos de conversão definidos neste documento.

### Fora do escopo inicial

- Área de revendedor com login.
- Margem sugerida e materiais comerciais autenticados.
- Carrinho B2B completo com regras de desconto e frete em tempo real.
- Integração de pagamento real.
- Claims legais ou certificações sem fonte oficial.
- Reescrita ou normalização das referências em `copias/`.
- Alterações no pipeline global para atender somente Jumpflex.
- Uso de IA para gerar assets finais sem aprovação explícita.

---

## 6. Arquitetura visual aprovada

```text
Jumpflex Home Evolution
├── SaleBar
│   ├── campanha promocional
│   ├── mensagem de oferta aprovada
│   └── countdown somente se houver data real
├── Header
│   ├── logo Jumpflex
│   ├── navegação de produto/suporte
│   ├── busca/carrinho acessíveis
│   └── menu mobile
├── KineticHero
│   ├── mídia full-bleed com overlay
│   ├── eyebrow
│   ├── headline split por palavras
│   ├── copy curta
│   ├── View range
│   ├── Bulk quote
│   ├── badge promocional
│   ├── progress indicator
│   └── countdown opcional
├── ProductRangeRail
│   ├── FLEX™
│   ├── HERO™
│   └── MEGA™
├── ProductComparison
│   ├── público/uso
│   ├── benefício aprovado
│   ├── preço/parcelamento aprovados
│   ├── Buy now
│   └── volume/bulk quote
├── SocialProof
│   ├── reviews aprovados
│   └── garantia aprovada
├── B2BEntry
│   ├── segmentos atendidos
│   ├── quantidade
│   └── formulário de cotação
└── FAQ / Footer
```

A composição deve preservar prioridade visual: hero e CTA primeiro; detalhes de preço/prova em seguida; jornada B2B disponível, mas sem dominar o caminho B2C.

---

## 7. Contratos de dados e slots

Os dados abaixo devem ser tratados como contrato esperado, não como valores finais:

```js
const jumpflexContent = {
  hero: {
    eyebrow: 'PENDING_APPROVED_COPY',
    title: ['MORE', 'JOY.', 'MORE', 'AIR.'],
    description: 'PENDING_APPROVED_COPY',
    primaryCta: 'VIEW RANGE',
    secondaryCta: 'BUY IN QUANTITY / GET A BULK QUOTE'
  },
  products: [
    {
      id: 'flex',
      name: 'FLEX™',
      positioning: 'PENDING_APPROVED_COPY',
      priceFrom: 'PENDING_APPROVED_PRICE',
      previousPrice: 'PENDING_APPROVED_PRICE',
      savings: 'PENDING_APPROVED_OFFER',
      monthlyPayment: 'PENDING_APPROVED_PAYMENT',
      reviews: 'PENDING_APPROVED_REVIEWS',
      warranty: 'PENDING_APPROVED_WARRANTY'
    },
    {
      id: 'hero',
      name: 'HERO™',
      positioning: 'PENDING_APPROVED_COPY'
    },
    {
      id: 'mega',
      name: 'MEGA™',
      positioning: 'PENDING_APPROVED_COPY'
    }
  ],
  bulk: {
    businessType: 'PENDING_FIELD_CONFIG',
    quantity: 'PENDING_FIELD_CONFIG',
    region: 'PENDING_FIELD_CONFIG',
    timeline: 'PENDING_FIELD_CONFIG',
    contact: 'PENDING_FIELD_CONFIG'
  }
};
```

Regras do contrato:

- IDs de produto são estáveis: `flex`, `hero`, `mega`.
- Preço e claims não podem ser fallback silencioso.
- Um slot pendente deve gerar estado visível de conteúdo incompleto durante desenvolvimento ou bloquear promoção, conforme o gate aplicável.
- O formulário B2B deve permitir tipo de negócio, quantidade estimada, região, prazo e contato.
- Copy final deve poder ser substituída sem alterar a timeline ou a geometria do layout.

---

## 8. Interações e acessibilidade

### Hero

- CTA primário e secundário com foco visível.
- Links com destinos semânticos: coleção, produto ou cotação.
- Headline animada deve manter texto acessível em ordem natural.
- A imagem precisa ter alt descritivo e atribuição quando for stock.
- Badge, countdown e progresso são complementares e não devem carregar a mensagem principal.

### Product range

- Tabs/cards devem ser acionáveis por mouse, teclado e toque.
- Estado ativo deve ser comunicável por cor, texto e atributo acessível.
- No mobile, o rail pode rolar horizontalmente, mas deve indicar que há conteúdo adicional.
- Cada linha deve oferecer caminho para `View range` e volume.

### B2B

- Labels persistentes nos campos.
- Mensagens de erro específicas e não destrutivas.
- Validação no cliente sem substituir validação no servidor.
- Estado de envio, sucesso e falha explicitamente comunicados.
- Nenhuma informação essencial deve aparecer apenas em tooltip.

---

## 9. Instrumentação obrigatória

Eventos mínimos:

```text
hero_view_range_clicked
hero_bulk_quote_clicked
product_line_selected { line: flex|hero|mega }
buy_now_started { line, model }
checkout_reached { line, model }
bulk_form_started
bulk_form_completed
bulk_form_submitted
```

Regras:

- Eventos não podem interromper navegação ou compra.
- Payload não deve incluir dados pessoais desnecessários.
- Os nomes dos eventos devem permanecer estáveis após a primeira implementação.
- A instrumentação deve ser testável em ambiente local sem depender de analytics externo real.

---

## 10. Critérios de aceitação por etapa

### Etapa A — base visual

- [ ] O artefato reproduz a base aprovada do canvas.
- [ ] Tokens Jumpflex ficam isolados no projeto.
- [ ] Hero, header, sale bar, CTA e rail aparecem em desktop e mobile.
- [ ] Mídia indisponível não remove texto nem CTAs.

### Etapa B — motion

- [ ] Headline entra com bounce/stagger sem layout thrash.
- [ ] Parallax usa `transform` e responde ao scroll reverso.
- [ ] Badge e tabs entram sem esconder o caminho de compra.
- [ ] Reduced motion entrega estado estático legível.
- [ ] Loops pausam quando a aba fica oculta.

### Etapa C — produto e conteúdo

- [ ] FLEX™, HERO™ e MEGA™ são comparáveis.
- [ ] Preços, reviews, garantia e oferta vêm de slots aprovados.
- [ ] Nenhum placeholder passa silenciosamente para publicação.
- [ ] `Buy now` e bulk quote possuem destinos claros.

### Etapa D — B2B

- [ ] Formulário possui campos de negócio, quantidade, região, prazo e contato.
- [ ] Estados de erro, envio e sucesso estão acessíveis.
- [ ] O fluxo inicial capta lead sem exigir área de revendedor.
- [ ] O carrinho B2B fica preparado como evolução, não como dependência da primeira versão.

### Etapa E — QA e promoção

- [ ] Mesmo artefato é usado em preview e QA.
- [ ] Playwright cobre desktop/mobile e interações principais.
- [ ] Console, rede, estrutura, acessibilidade e anti-slop são avaliados.
- [ ] Screenshot dourado é produzido para a base aprovada.
- [ ] Status só avança mediante evidência registrada.

---

## 11. Próximos passos detalhados

### Passo 1 — congelar a base de design

1. Tratar a jornada de 7 nós em `.kombai/canvas/jumpflex-home-journey.canvas` (com nó de hero `var_7a47e15710d1`) como referência visual canônica de trabalho.
2. Não editar o nó original de exploração para resolver necessidades da implementação.
3. Registrar qualquer mudança de layout como nova versão no canvas dedicado.
4. Definir a primeira tela de implementação como a hero aprovada (`var_7a47e15710d1`), expandindo subsequentemente pelos nós 02 a 07.

**Saída:** versão de design identificada e imutável para comparação.

### Passo 2 — criar o pacote de contexto local

1. Criar o diretório isolado `clientes/jumpflex-home-evolution/`.
2. Adicionar `README.md` com manifesto de escopo.
3. Adicionar `brand-spec.json` somente com tokens aprovados ou marcados como provisórios.
4. Adicionar `content-slots.json` para headline, CTAs, produto, reviews, garantia e B2B.
5. Adicionar `composition-spec.json` com a anatomia da hero e da faixa de produtos.
6. Adicionar `build-manifest.json` somente quando houver artefato gerado e hash.

**Saída:** contexto Jumpflex nomeado, estreito e reproduzível.

### Passo 3 — preparar implementação da hero

1. Escolher Vanilla JS como runtime de UI do artefato final, conforme preferência do projeto.
2. Separar tokens, estrutura HTML, estilos e controlador GSAP.
3. Encapsular a headline como palavras acessíveis, sem destruir o texto original.
4. Carregar texto/CTA a partir de slots, sem hardcode espalhado.
5. Implementar fallback de imagem e estado reduced-motion.
6. Garantir que CTAs existam antes da entrada de mídia.

**Saída:** hero funcional, responsiva e independente da referência externa.

### Passo 4 — implementar transição para produtos

1. Criar rail de FLEX™, HERO™ e MEGA™ após a hero.
2. Definir estado ativo por teclado, toque e mouse.
3. Usar stagger curto na entrada, sem pin obrigatório para concluir compra.
4. Criar âncoras semânticas para cada coleção.
5. Deixar preço/prova em slots controlados.

**Saída:** visitante entende as três linhas e consegue avançar para uma coleção.

### Passo 5 — implementar caminho B2B inicial

1. Criar CTA secundário da hero apontando para a seção/página de cotação.
2. Criar formulário com tipo de negócio, quantidade, região, prazo e contato.
3. Adicionar estados de validação, envio, sucesso e falha.
4. Registrar eventos de início, conclusão e envio.
5. Documentar carrinho B2B e área de revendedor como fases posteriores.

**Saída:** captação B2B simples sem bloquear o varejo.

### Passo 6 — adicionar conteúdo aprovado

1. Substituir placeholders somente por dados fornecidos pelo cliente.
2. Validar preço, desconto, parcelamento, reviews, garantia, MOQ e claims.
3. Registrar fonte e data de cada claim sensível.
4. Rodar anti-slop para confirmar que nenhum placeholder/meta-texto permanece.

**Saída:** conteúdo comercial rastreável e apto a QA.

### Passo 7 — QA independente

1. Escrever testes de regressão antes de alterar comportamento de produção.
2. Rodar auditoria de sintaxe JavaScript.
3. Rodar Playwright em viewport desktop e mobile.
4. Testar clique dos dois CTAs antes e durante a animação.
5. Testar reduced motion, teclado, foco, scroll reverso e mídia indisponível.
6. Verificar console, requests, imagens quebradas, links e formulário.
7. Capturar screenshot dourado do mesmo artefato auditado.
8. Registrar resultado no relatório local do cliente.

**Saída:** evidência independente para decidir promoção de status.

### Passo 8 — promoção controlada

1. Manter o cliente em `experimental` até todos os gates passarem.
2. Promover para `candidate` somente com inputs completos, build determinístico e manifesto com hash.
3. Promover para `verified` somente após gates de segurança, runtime, semântica, DNA, visual e acessibilidade.
4. Nunca declarar `production` sem reprodução em checkout limpo e revisão independente.

**Saída:** status calculado por evidência, não por descrição.

---

## 12. Riscos e decisões de contenção

| Risco | Contenção obrigatória |
|---|---|
| Animação esconde CTA ou texto | CTA renderizado no estado inicial; timeline não bloqueante |
| Headline quebra em diferentes viewport | palavras controladas, clamp, `white-space`/wrapping testado e fallback mobile |
| Mídia externa falha | background/placeholder local ou estado visual com overlay e texto preservado |
| Claims inventados | slots pendentes, fonte obrigatória e gate anti-slop |
| B2B domina o varejo | CTA secundário visualmente menor e seção B2B separada |
| GSAP e CSS disputam estado | GSAP como autoridade única dos elementos animados |
| Contexto Jumpflex vaza para outros clientes | arquivos isolados em `clientes/jumpflex-home-evolution/` e sem alteração global |
| Design aprovado diverge na implementação | screenshot dourado e comparação contra `var_7a47e15710d1` |
| Referência externa vira dependência de produção | remover iframe e externalizar assets antes de promoção |

---

## 13. Definição de pronto deste handoff

Este handoff está pronto como documento de transição quando:

- as decisões aprovadas estão registradas;
- as regras invioláveis estão explícitas;
- o escopo e os não-objetivos estão separados;
- os dados não aprovados estão marcados como `unverified`;
- os próximos passos têm saídas verificáveis;
- o contexto está isolado do restante do repositório.

Isso **não** significa que o site Jumpflex esteja pronto, validado ou aprovado para produção. A implementação ainda depende dos passos e gates descritos acima.
