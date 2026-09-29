# 💎 Shadcn UI Kit Dashboards PRO

> **Referência Oficial**: [https://shadcnuikit.com/dashboard/default](https://shadcnuikit.com/dashboard/default)  
> **Conteúdo**: Estrutura completa de Layout, UI Primitives, Widgets e 5 Dashboards Especializados + 2 Apps (Kanban e AI Chat).  
> **Localização**: `shadcnuikit-dashboards/`

---

## 📁 Estrutura do Pacote

```
shadcnuikit-dashboards/
├── live-preview/              # Snapshot standalone offline completo clonado do site oficial
│   ├── index.html             # HTML com DOM hidratado
│   ├── styles/                # CSS compilado e inline
│   └── assets/                # Imagens, logos e vetores
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppSidebar.tsx          # Sidebar expansível/colapsável com grupos, busca ⌘K e badges
│   │   │   ├── DashboardHeader.tsx     # Header com breadcrumbs, quick search, tema e perfil
│   │   │   └── DashboardShell.tsx      # Container universal com suporte a Dark/Light mode
│   │   ├── ui/                         # Primitivos Shadcn UI puros
│   │   │   ├── Card.tsx                # Card, CardHeader, CardTitle, CardDescription, CardContent
│   │   │   ├── Button.tsx              # Button com variants (default, destructive, outline, ghost)
│   │   │   ├── Badge.tsx               # Badge de status (default, success, destructive, secondary)
│   │   │   └── Avatar.tsx              # Avatar com fallback automático
│   │   └── dashboard/                  # Widgets especializados do Dashboard Default
│   │       ├── MetricCard.tsx          # Card KPI com valor, percentual e micro-sparkline SVG
│   │       ├── RevenueChart.tsx        # Gráfico de receita mensal interativo com tooltips
│   │       ├── ExerciseChart.tsx       # Gráfico de barras duplas de atividade física
│   │       ├── TeamMembersCard.tsx     # Card de gestão de equipe com papéis de acesso
│   │       ├── SupportChatCard.tsx     # Widget de chat integrado no dashboard
│   │       ├── RecentPaymentsTable.tsx # Tabela de transações com status e ações
│   │       └── PaymentMethodCard.tsx   # Gerenciador de cartão, PayPal e Apple Pay
│   ├── pages/
│   │   ├── default/page.tsx   # Classic Dashboard (Total Revenue, Subscriptions, Sales, Active Now)
│   │   ├── sales/page.tsx     # Sales Dashboard (Balance, Income, Best Selling, Order Tracking)
│   │   ├── crm/page.tsx       # CRM Dashboard (Deals, Pipeline Funnel, Leads by Source)
│   │   ├── ai-analytics/page.tsx # AI Analytics (Token volume, Model usage, Cost, Cache rate)
│   │   ├── kanban/page.tsx    # Kanban App (Sprint board com colunas e prioridades)
│   │   └── ai-chat/page.tsx   # AI Chat App (Interface conversacional multi-turn com modelos)
│   └── styles/
│       ├── globals.css        # Variáveis completas Shadcn UI (Light + Dark)
│       └── tailwind.config.js # Configuração do Tailwind com sistema de design tokens
├── package.json               # Dependências peer e scripts
└── INDEX.md                   # Documentação detalhada deste pacote
```

---

## 📊 Dashboards Incluídos

| Dashboard | Rota no Kit | Descrição | Principais Widgets |
| --- | --- | --- | --- |
| **Classic Dashboard** | [`src/pages/default/page.tsx`](./src/pages/default/page.tsx) | O dashboard principal de `shadcnuikit.com/dashboard/default` | 4 KPI Cards, Revenue Chart, Exercise Activity, Team Roster, Support Chat, Recent Payments Table, Payment Method Tabs |
| **Sales Dashboard** | [`src/pages/sales/page.tsx`](./src/pages/sales/page.tsx) | Foco em faturamento, despesas e vendas de produtos | Total Balance, Income, Expense, Tax, Best Selling Products, Order Status Tracker |
| **CRM Dashboard** | [`src/pages/crm/page.tsx`](./src/pages/crm/page.tsx) | Pipeline comercial e gestão de oportunidades | Customers, Deals, Pipeline Funnel (Lead, Qualified, Proposal, Won), Leads by Source |
| **AI Analytics** | [`src/pages/ai-analytics/page.tsx`](./src/pages/ai-analytics/page.tsx) | Observabilidade de tokens e custos de IA | Token Volume, Interactions, Cost, Cache Hit Rate, Model Usage Breakdown (GPT-4o, Claude 3.5, DeepSeek) |
| **Kanban App** | [`src/pages/kanban/page.tsx`](./src/pages/kanban/page.tsx) | Gestão de tarefas ágeis | Colunas Backlog, In Progress, Review, Done com badges de prioridade |
| **AI Chat App** | [`src/pages/ai-chat/page.tsx`](./src/pages/ai-chat/page.tsx) | Assistente inteligente integrado | Conversação multi-turn, seletor de modelos, upload de anexo e input por voz |

---

## 🚀 Como Executar ou Integrar no seu Projeto

1. **Instale as dependências**:
```bash
npm install lucide-react clsx tailwind-merge
```

2. **Copie a pasta de componentes**:
Copie `src/components/` e `src/styles/` para o seu projeto Next.js ou React.

3. **Visualize o clone ao vivo**:
Abra `live-preview/index.html` diretamente no seu navegador para ver o clone exato e responsivo extraído do site ao vivo!
