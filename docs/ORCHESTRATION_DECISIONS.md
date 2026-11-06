# Orquestração de baixo custo — decisões em linguagem simples

## Objetivo

Produzir sites reference-driven com qualidade comprovável, usando o modelo caro somente onde raciocínio arquitetural realmente muda o resultado. O restante deve ser executado por modelos econômicos ou código determinístico.

## Papéis

| Parte | O que faz | Por que |
|---|---|---|
| GPT-5.6 Sol | Gera uma versão completa do plano de execução | É onde raciocínio global e trade-offs têm maior valor |
| Orquestrador em Node.js | Valida o plano, controla estado, budgets, retries e aprovações | Regras de controle não precisam consumir tokens |
| Gemini 3.7 Flash | Executa uma tarefa delimitada por vez | Código, leitura e correções consomem muitos tokens, mas não exigem Sol em cada passo |
| Scripts e gates | Extraem, constroem, comparam e verificam | Resultado determinístico é mais barato e confiável que julgamento de modelo |
| Criador | Aprova direção visual e exceções | Preferência estética e mudança de escopo não devem ser inferidas silenciosamente |

## Decisões

### 1. Sol compila o blueprint; ele não é o orquestrador

O Sol recebe contexto congelado e devolve um DAG JSON em uma chamada. Ele não executa ferramentas e não participa do loop normal.

**Por quê:** impede que o modelo mais caro seja chamado a cada erro ou ferramenta.

**Proteção de qualidade:** o blueprint é validado antes de qualquer execução. Uma falha sistêmica pode gerar uma nova versão do plano apenas após autorização humana e usando somente o delta da falha.

### 2. O orquestrador é código determinístico

O Node.js controla estados, dependências, caminhos permitidos, budgets, tentativas e promoção.

**Por quê:** essas decisões são regras, não problemas criativos. Código é reproduzível e não cobra tokens.

### 3. DAG e lifecycle são responsabilidades diferentes

O DAG descreve as tarefas de um run. XState descreve o ciclo de vida do run: planejamento, execução, verificação, reparo, aprovação e intervenção humana.

**Por quê:** um plano pode mudar de conteúdo sem mudar as regras de segurança do produto.

### 4. JSON compacto somente na fronteira dos modelos

Payloads enviados aos modelos usam chaves compactas. Dentro do código, os nomes permanecem legíveis.

**Por quê:** reduz tokens sem transformar a base de código em abreviações difíceis de manter.

### 5. Contexto é entregue progressivamente

O executor recebe primeiro hashes, símbolos, imports e pequenos trechos. Arquivos completos são entregues somente quando o nó autoriza e solicita.

**Por quê:** a maior economia vem de não reenviar arquivos e logs, não de abreviar algumas chaves JSON.

**Proteção de qualidade:** minificação nunca altera o arquivo original. Para JavaScript, o sistema usa AST e depois fornece trechos exatos quando necessário.

### 6. Cada nó recebe apenas suas ferramentas

O blueprint declara IDs de ferramentas. O registry resolve apenas essas definições para a chamada atual.

**Por quê:** schemas MCP grandes também contam como tokens e ferramentas irrelevantes aumentam decisões erradas.

### 7. Retries são limitados e orientados por evidência

Cada nó possui budget e máximo de tentativas. Erros recebem fingerprint; repetir o mesmo erro interrompe o loop.

**Por quê:** retry sem informação nova é custo sem aprendizado.

### 8. Verificação não pertence ao executor

O executor entrega um resultado candidato. Scripts e gates independentes decidem se ele passa.

**Por quê:** o mesmo modelo que criou uma alteração não deve certificar sozinho que ela está correta.

### 9. Golden visual target e runtime baseline não são a mesma coisa

O visual target registra a direção aprovada. O runtime baseline registra pixels produzidos pelo navegador.

**Por quê:** uma imagem conceitual pode conter detalhes impossíveis de implementar; regressão estrita deve comparar renderizações reais.

### 10. Custo é evidência do run

Cada chamada registra modelo, tokens, cache, retries, latência e custo conhecido ou estimado.

**Por quê:** a economia esperada de 50–75% é uma hipótese até ser medida em tarefas reais.

## O que não faremos na primeira versão

- Não chamar Sol dentro de loops automáticos.
- Não permitir que modelos escolham cliente, referência ou promoção.
- Não carregar o Vault inteiro ou todos os clientes.
- Não remover comentários e whitespace cegamente de código executável.
- Não habilitar ferramentas fora da allow-list do nó.
- Não adicionar filas distribuídas antes de existir concorrência real.
- Não chamar um resultado de `verified` sem os gates exigidos.

## Meta inicial mensurável

O primeiro objetivo é reduzir em pelo menos 50% o custo de modelos, mantendo a mesma taxa de aprovação nos gates e sem aumentar correções humanas. A meta de 70–80% só será adotada depois de dados de runs reais.
