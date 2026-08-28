---
type: project
created: 2026-08-28
updated: 2026-08-28
---

# Alinhamento Estratégico — Studio DNA PRO

## Estado e momento de revisão

- Estado atual: protótipo R&D promissor, classificado como `experimental`.
- Não declarar o produto `production-ready` antes de segurança, reprodutibilidade e gates reais.
- Reavaliar esta visão depois da conclusão do plano de transformação e da certificação do primeiro piloto.
- Comparações de mercado e preços envelhecem; validar novamente antes de decisões comerciais.

## Visão do produto

Construir uma infraestrutura de engenharia de design que transforme referências web complexas em sistemas reutilizáveis, governados e verificáveis. O objetivo é permitir que vibe coders, freelancers e agências produzam experiências premium sem dominar manualmente todas as especialidades envolvidas em motion, layouts editoriais, assets, responsividade e performance.

Posicionamento pretendido:

> Reference-driven design infrastructure for premium websites.

Promessa comercial preferida:

> Transformar referências de alto nível em sites originais, brand-safe e production-verified.

## O que o produto não deve ser

- Não competir como mais um gerador full-stack generalista.
- Não prometer clonagem perfeita de qualquer URL.
- Não depender de IA reescrevendo HTMLs grandes livremente.
- Não vender cópias reconhecíveis de marcas ou experiências de terceiros.
- Não afirmar que especialistas deixam de ser necessários para casos inéditos.
- Não ampliar motores universais com patches particulares por cliente.

## Tese técnica

O sistema deve combinar:

1. Captura real e imutável do runtime.
2. Extração explicável de estrutura, tokens, motion, assets e semântica.
3. Vault de evidências, patterns e templates certificados.
4. Seleção de referências por compatibilidade com o cliente.
5. Planejamento da IA em schemas e specs revisáveis.
6. Compilação determinística do artefato.
7. QA independente sobre o mesmo artefato de preview e produção.

A IA atua como analista, curadora e planejadora. Scripts e compiladores executam mudanças mecânicas. Gates independentes determinam o estado do build.

## ICM

ICM significa **Interpretable Context Methodology**. Sua função é organizar como agentes trabalham por meio de contexto seletivo, arquivos legíveis, ownership explícito, routing determinístico, memória persistente e contratos de estágio.

ICM não é o nome do mecanismo de adaptação de sites. Esse mecanismo deve ser tratado separadamente como pipeline determinístico de transmutação ou adaptação de referências.

Cada estágio ICM deve declarar:

- Inputs obrigatórios.
- Contexto permitido e proibido.
- Processo.
- Checkpoints humanos.
- Auditoria.
- Outputs.
- Definition of Done.

## Vault

Separar três responsabilidades:

- **Evidence Vault:** scrapes, assets, screenshots e manifests imutáveis.
- **Pattern Vault:** conhecimento destilado, contratos, compatibilidade e exemplos.
- **Production Template Vault:** skeletons certificados, schemas, dependências, goldens e testes.

O agente nunca deve receber o Vault inteiro. Cada estágio carrega apenas o índice e as referências explicitamente selecionadas.

Modelo recomendado de composição:

- 70–80% de uma referência estrutural dominante.
- 20–30% de patterns complementares compatíveis.
- Nenhuma mistura livre de múltiplas referências.

## Anti-slop

AI slop deve ser avaliado em cinco dimensões:

1. Fidelidade estrutural.
2. Completude semântica e remoção da referência original.
3. Aderência e singularidade do DNA da marca.
4. Integridade de motion, acessibilidade e experiência.
5. Provenance e verificação de todas as transformações.

O build deve bloquear resíduos de marca, placeholders, lorem, idioma incorreto, slots vazios, tokens de outros clientes, assets incompatíveis e violações estruturais.

## Honestidade dos agentes

- Precisão tem prioridade sobre concordância com o usuário.
- Runtime e testes prevalecem sobre documentação.
- Diferenciar observado, inferido, documentado e não verificado.
- Não usar “resolvido”, “validado”, “100%”, “zero erros” ou “produção” sem evidência executada.
- Separar builder de verifier/reviewer sempre que a mudança for relevante.
- Toda afirmação importante deve possuir claim, evidence e status.
- Discordância fundamentada é esperada; negatividade performática também deve ser evitada.

## Mercado e diferenciação

- Clonagem por URL já é oferecida por concorrentes; não é um moat suficiente.
- Builders generalistas têm vantagem em UX, hosting, integrações e distribuição.
- O diferencial potencial é a combinação de runtime complexo, motion, contexto interpretável, patterns certificados, transformação determinística, anti-slop e QA verificável.
- O moat deve surgir da ontologia de design, adapters, contratos, dataset de falhas, goldens e histórico de builds — não do scraper, prompts ou MCP isoladamente.

## Público e modelo comercial

Público inicial:

- Freelancers premium.
- Agências pequenas e médias.
- Desenvolvedores criativos e vibe coders com capacidade de revisão.

Sequência comercial preferida:

1. Ferramenta interna de produção.
2. Serviço produtizado para clientes.
3. Beta assistido para agências.
4. Assinatura profissional.
5. API e marketplace somente após estabilidade e repetibilidade.

Evitar inicialmente usuários totalmente leigos, SaaS barato generalista e promessa de suporte a qualquer site.

## Teste de viabilidade econômica

A variável principal é o tempo de exceção humana, não apenas o custo de tokens.

Medir:

- Tempo para certificar uma referência.
- Reutilizações pagas por referência.
- Percentual de builds sem intervenção em código.
- Tempo até o primeiro resultado aceitável.
- Tempo de QA manual e suporte.
- Taxa de falha por slop e regressões entre clientes.
- Custo total e margem por build.

Se cada referência exigir engenharia exclusiva e for usada uma vez, o produto permanece uma agência customizada. A plataforma surge quando uma referência certificada gera múltiplos clientes com baixa intervenção.

## Condição para retomar a visão

Depois das alterações e validações, comparar o resultado contra este documento e responder:

1. O caminho dourado é reproduzível a partir de clone limpo?
2. O agente opera com contexto isolado e interpretável?
3. O Vault orienta sem contaminar ou produzir média estética?
4. Anti-slop e produção são estados comprovados por gates?
5. Uma referência certificada pode atender múltiplos clientes com baixa intervenção?
6. A proposta continua diferenciada frente ao mercado atualizado?
