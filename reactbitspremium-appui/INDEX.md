# React Bits Pro — Application UI Extracted Corpus

> **Source:** [https://pro.reactbits.dev/docs/app-ui](https://pro.reactbits.dev/docs/app-ui)  
> **Extracted At:** 2026-11-18T06:38:59.297Z  
> **Total Categories:** 38 | **Mounted Blocks:** 300/300

## Global Theme & Tokens
- [`theme/app-ui-theme.css`](./theme/app-ui-theme.css) — Extracted `@layer properties`, `@layer theme`, `@layer base`, `--rb-*` radius ladder, `.rb-theme-scope`, `.rbp-*`, and `@keyframes`
- [`theme/theming-docs.json`](./theme/theming-docs.json) — Extracted theming guide & token formulas
- [`CATALOG.json`](./CATALOG.json) — Full machine-readable catalog, DOM telemetry, and CSS declaration histograms

## Categories Summary

| Domain | Category | Extracted | Path |
| :--- | :--- | :---: | :--- |
| AI & Agent Surfaces | **AI Chat** | 9/9 | [`ai-chat/`](#category-ai-chat) |
| AI & Agent Surfaces | **Prompt Input** | 7/7 | [`prompt-input/`](#category-prompt-input) |
| AI & Agent Surfaces | **Agent Activity** | 7/7 | [`agent-activity/`](#category-agent-activity) |
| AI & Agent Surfaces | **Tool Calls** | 6/6 | [`tool-calls/`](#category-tool-calls) |
| AI & Agent Surfaces | **Agent Approval** | 6/6 | [`agent-approval/`](#category-agent-approval) |
| AI & Agent Surfaces | **Agent Plan** | 6/6 | [`agent-plan/`](#category-agent-plan) |
| AI & Agent Surfaces | **AI Usage** | 8/8 | [`ai-usage/`](#category-ai-usage) |
| App Chrome & Navigation | **App Shell** | 9/9 | [`app-shell/`](#category-app-shell) |
| App Chrome & Navigation | **App Sidebar** | 7/7 | [`app-sidebar/`](#category-app-sidebar) |
| App Chrome & Navigation | **Command Menu** | 6/6 | [`command-menu/`](#category-command-menu) |
| App Chrome & Navigation | **Navbar** | 14/14 | [`navbar/`](#category-navbar) |
| App Chrome & Navigation | **Mobile** | 5/5 | [`mobile/`](#category-mobile) |
| Data, Dashboards & Monitoring | **Cards** | 11/11 | [`card/`](#category-card) |
| Data, Dashboards & Monitoring | **Data Table** | 8/8 | [`data-table/`](#category-data-table) |
| Data, Dashboards & Monitoring | **Dashboard** | 14/14 | [`dashboard/`](#category-dashboard) |
| Data, Dashboards & Monitoring | **Analytics** | 16/16 | [`analytics/`](#category-analytics) |
| Data, Dashboards & Monitoring | **List** | 12/12 | [`list/`](#category-list) |
| Data, Dashboards & Monitoring | **Filtering** | 9/9 | [`filtering/`](#category-filtering) |
| Data, Dashboards & Monitoring | **File Manager** | 4/4 | [`file-manager/`](#category-file-manager) |
| Data, Dashboards & Monitoring | **Monitoring** | 10/10 | [`monitoring/`](#category-monitoring) |
| Forms, Modals, Auth & Workflows | **Empty State** | 5/5 | [`empty-state/`](#category-empty-state) |
| Forms, Modals, Auth & Workflows | **Settings Form** | 6/6 | [`settings-form/`](#category-settings-form) |
| Forms, Modals, Auth & Workflows | **Forms** | 12/12 | [`forms/`](#category-forms) |
| Forms, Modals, Auth & Workflows | **App Dialog** | 7/7 | [`app-dialog/`](#category-app-dialog) |
| Forms, Modals, Auth & Workflows | **Notifications** | 6/6 | [`notifications/`](#category-notifications) |
| Forms, Modals, Auth & Workflows | **Onboarding** | 7/7 | [`onboarding/`](#category-onboarding) |
| Forms, Modals, Auth & Workflows | **Paywall** | 7/7 | [`paywall/`](#category-paywall) |
| Forms, Modals, Auth & Workflows | **Authentication** | 14/14 | [`authentication/`](#category-authentication) |
| Forms, Modals, Auth & Workflows | **Kanban** | 6/6 | [`kanban/`](#category-kanban) |
| Forms, Modals, Auth & Workflows | **Wizard** | 7/7 | [`wizard/`](#category-wizard) |
| Forms, Modals, Auth & Workflows | **Billing** | 8/8 | [`billing/`](#category-billing) |
| Collaboration, Content & Support | **Comments** | 6/6 | [`comments/`](#category-comments) |
| Collaboration, Content & Support | **Scheduling** | 7/7 | [`scheduling/`](#category-scheduling) |
| Collaboration, Content & Support | **Integrations** | 6/6 | [`integrations/`](#category-integrations) |
| Collaboration, Content & Support | **Editor** | 5/5 | [`editor/`](#category-editor) |
| Collaboration, Content & Support | **Feedback** | 6/6 | [`feedback/`](#category-feedback) |
| Collaboration, Content & Support | **Support** | 5/5 | [`support/`](#category-support) |
| Collaboration, Content & Support | **Chat** | 6/6 | [`chat/`](#category-chat) |

<a id="category-ai-chat"></a>
### AI Chat (`ai-chat/`) — AI & Agent Surfaces

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **ai-chat-1** | Full chat with tool calls and sources | 57 | 185 | [`capsule.html`](./ai-chat/ai-chat-1/capsule.html) · [`component.css`](./ai-chat/ai-chat-1/component.css) · [`decompiled-spec.json`](./ai-chat/ai-chat-1/decompiled-spec.json) · [`README.md`](./ai-chat/ai-chat-1/README.md) |
| **ai-chat-2** | Chat with a code and document panel | 78 | 198 | [`capsule.html`](./ai-chat/ai-chat-2/capsule.html) · [`component.css`](./ai-chat/ai-chat-2/component.css) · [`decompiled-spec.json`](./ai-chat/ai-chat-2/decompiled-spec.json) · [`README.md`](./ai-chat/ai-chat-2/README.md) |
| **ai-chat-3** | Compact assistant panel with prompts | 35 | 135 | [`capsule.html`](./ai-chat/ai-chat-3/capsule.html) · [`component.css`](./ai-chat/ai-chat-3/component.css) · [`decompiled-spec.json`](./ai-chat/ai-chat-3/decompiled-spec.json) · [`README.md`](./ai-chat/ai-chat-3/README.md) |
| **ai-chat-4** | Chat with a model picker and token meter | 55 | 161 | [`capsule.html`](./ai-chat/ai-chat-4/capsule.html) · [`component.css`](./ai-chat/ai-chat-4/component.css) · [`decompiled-spec.json`](./ai-chat/ai-chat-4/decompiled-spec.json) · [`README.md`](./ai-chat/ai-chat-4/README.md) |
| **ai-chat-5** | Chat that asks approval before actions | 63 | 184 | [`capsule.html`](./ai-chat/ai-chat-5/capsule.html) · [`component.css`](./ai-chat/ai-chat-5/component.css) · [`decompiled-spec.json`](./ai-chat/ai-chat-5/decompiled-spec.json) · [`README.md`](./ai-chat/ai-chat-5/README.md) |
| **ai-chat-6** | Multi-agent chat with handoffs | 147 | 183 | [`capsule.html`](./ai-chat/ai-chat-6/capsule.html) · [`component.css`](./ai-chat/ai-chat-6/component.css) · [`decompiled-spec.json`](./ai-chat/ai-chat-6/decompiled-spec.json) · [`README.md`](./ai-chat/ai-chat-6/README.md) |
| **ai-chat-7** | Chat with pinned sources and citations | 171 | 181 | [`capsule.html`](./ai-chat/ai-chat-7/capsule.html) · [`component.css`](./ai-chat/ai-chat-7/component.css) · [`decompiled-spec.json`](./ai-chat/ai-chat-7/decompiled-spec.json) · [`README.md`](./ai-chat/ai-chat-7/README.md) |
| **ai-chat-8** | Voice composer with a live transcript | 76 | 131 | [`capsule.html`](./ai-chat/ai-chat-8/capsule.html) · [`component.css`](./ai-chat/ai-chat-8/component.css) · [`decompiled-spec.json`](./ai-chat/ai-chat-8/decompiled-spec.json) · [`README.md`](./ai-chat/ai-chat-8/README.md) |
| **ai-chat-9** | Model picker with cost and effort control | 41 | 134 | [`capsule.html`](./ai-chat/ai-chat-9/capsule.html) · [`component.css`](./ai-chat/ai-chat-9/component.css) · [`decompiled-spec.json`](./ai-chat/ai-chat-9/decompiled-spec.json) · [`README.md`](./ai-chat/ai-chat-9/README.md) |

<a id="category-prompt-input"></a>
### Prompt Input (`prompt-input/`) — AI & Agent Surfaces

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **prompt-input-1** | Composer with slash commands and files | 48 | 152 | [`capsule.html`](./prompt-input/prompt-input-1/capsule.html) · [`component.css`](./prompt-input/prompt-input-1/component.css) · [`decompiled-spec.json`](./prompt-input/prompt-input-1/decompiled-spec.json) · [`README.md`](./prompt-input/prompt-input-1/README.md) |
| **prompt-input-2** | Prompt box with model and tool toggles | 24 | 126 | [`capsule.html`](./prompt-input/prompt-input-2/capsule.html) · [`component.css`](./prompt-input/prompt-input-2/component.css) · [`decompiled-spec.json`](./prompt-input/prompt-input-2/decompiled-spec.json) · [`README.md`](./prompt-input/prompt-input-2/README.md) |
| **prompt-input-3** | Prompt launcher with suggestion chips | 38 | 125 | [`capsule.html`](./prompt-input/prompt-input-3/capsule.html) · [`component.css`](./prompt-input/prompt-input-3/component.css) · [`decompiled-spec.json`](./prompt-input/prompt-input-3/decompiled-spec.json) · [`README.md`](./prompt-input/prompt-input-3/README.md) |
| **prompt-input-4** | Prompt template editor with variables | 31 | 139 | [`capsule.html`](./prompt-input/prompt-input-4/capsule.html) · [`component.css`](./prompt-input/prompt-input-4/component.css) · [`decompiled-spec.json`](./prompt-input/prompt-input-4/decompiled-spec.json) · [`README.md`](./prompt-input/prompt-input-4/README.md) |
| **prompt-input-5** | Prompt input with file uploads | 69 | 176 | [`capsule.html`](./prompt-input/prompt-input-5/capsule.html) · [`component.css`](./prompt-input/prompt-input-5/component.css) · [`decompiled-spec.json`](./prompt-input/prompt-input-5/decompiled-spec.json) · [`README.md`](./prompt-input/prompt-input-5/README.md) |
| **prompt-input-6** | Prompt bar with @ mentions | 42 | 142 | [`capsule.html`](./prompt-input/prompt-input-6/capsule.html) · [`component.css`](./prompt-input/prompt-input-6/component.css) · [`decompiled-spec.json`](./prompt-input/prompt-input-6/decompiled-spec.json) · [`README.md`](./prompt-input/prompt-input-6/README.md) |
| **prompt-input-7** | Prompt with ask, agent and edit modes | 33 | 150 | [`capsule.html`](./prompt-input/prompt-input-7/capsule.html) · [`component.css`](./prompt-input/prompt-input-7/component.css) · [`decompiled-spec.json`](./prompt-input/prompt-input-7/decompiled-spec.json) · [`README.md`](./prompt-input/prompt-input-7/README.md) |

<a id="category-agent-activity"></a>
### Agent Activity (`agent-activity/`) — AI & Agent Surfaces

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **agent-activity-1** | Live activity stream with step status | 85 | 117 | [`capsule.html`](./agent-activity/agent-activity-1/capsule.html) · [`component.css`](./agent-activity/agent-activity-1/component.css) · [`decompiled-spec.json`](./agent-activity/agent-activity-1/decompiled-spec.json) · [`README.md`](./agent-activity/agent-activity-1/README.md) |
| **agent-activity-2** | Collapsible run timeline with sub-steps | 120 | 109 | [`capsule.html`](./agent-activity/agent-activity-2/capsule.html) · [`component.css`](./agent-activity/agent-activity-2/component.css) · [`decompiled-spec.json`](./agent-activity/agent-activity-2/decompiled-spec.json) · [`README.md`](./agent-activity/agent-activity-2/README.md) |
| **agent-activity-3** | Compact agent status rail | 56 | 131 | [`capsule.html`](./agent-activity/agent-activity-3/capsule.html) · [`component.css`](./agent-activity/agent-activity-3/component.css) · [`decompiled-spec.json`](./agent-activity/agent-activity-3/decompiled-spec.json) · [`README.md`](./agent-activity/agent-activity-3/README.md) |
| **agent-activity-4** | Run history table with re-run actions | 527 | 147 | [`capsule.html`](./agent-activity/agent-activity-4/capsule.html) · [`component.css`](./agent-activity/agent-activity-4/component.css) · [`decompiled-spec.json`](./agent-activity/agent-activity-4/decompiled-spec.json) · [`README.md`](./agent-activity/agent-activity-4/README.md) |
| **agent-activity-5** | Terminal-style log stream | 134 | 141 | [`capsule.html`](./agent-activity/agent-activity-5/capsule.html) · [`component.css`](./agent-activity/agent-activity-5/component.css) · [`decompiled-spec.json`](./agent-activity/agent-activity-5/decompiled-spec.json) · [`README.md`](./agent-activity/agent-activity-5/README.md) |
| **agent-activity-6** | Parallel agent lanes with throughput | 81 | 104 | [`capsule.html`](./agent-activity/agent-activity-6/capsule.html) · [`component.css`](./agent-activity/agent-activity-6/component.css) · [`decompiled-spec.json`](./agent-activity/agent-activity-6/decompiled-spec.json) · [`README.md`](./agent-activity/agent-activity-6/README.md) |
| **agent-activity-7** | Run detail with inputs and errors | 79 | 138 | [`capsule.html`](./agent-activity/agent-activity-7/capsule.html) · [`component.css`](./agent-activity/agent-activity-7/component.css) · [`decompiled-spec.json`](./agent-activity/agent-activity-7/decompiled-spec.json) · [`README.md`](./agent-activity/agent-activity-7/README.md) |

<a id="category-tool-calls"></a>
### Tool Calls (`tool-calls/`) — AI & Agent Surfaces

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **tool-calls-1** | Tool call card with arguments and result | 145 | 149 | [`capsule.html`](./tool-calls/tool-calls-1/capsule.html) · [`component.css`](./tool-calls/tool-calls-1/component.css) · [`decompiled-spec.json`](./tool-calls/tool-calls-1/decompiled-spec.json) · [`README.md`](./tool-calls/tool-calls-1/README.md) |
| **tool-calls-2** | Tool call list with retry states | 163 | 176 | [`capsule.html`](./tool-calls/tool-calls-2/capsule.html) · [`component.css`](./tool-calls/tool-calls-2/component.css) · [`decompiled-spec.json`](./tool-calls/tool-calls-2/decompiled-spec.json) · [`README.md`](./tool-calls/tool-calls-2/README.md) |
| **tool-calls-3** | File edit result as a diff | 142 | 117 | [`capsule.html`](./tool-calls/tool-calls-3/capsule.html) · [`component.css`](./tool-calls/tool-calls-3/component.css) · [`decompiled-spec.json`](./tool-calls/tool-calls-3/decompiled-spec.json) · [`README.md`](./tool-calls/tool-calls-3/README.md) |
| **tool-calls-4** | Web search result with source cards | 97 | 95 | [`capsule.html`](./tool-calls/tool-calls-4/capsule.html) · [`component.css`](./tool-calls/tool-calls-4/component.css) · [`decompiled-spec.json`](./tool-calls/tool-calls-4/decompiled-spec.json) · [`README.md`](./tool-calls/tool-calls-4/README.md) |
| **tool-calls-5** | Code run card with output tabs | 34 | 142 | [`capsule.html`](./tool-calls/tool-calls-5/capsule.html) · [`component.css`](./tool-calls/tool-calls-5/component.css) · [`decompiled-spec.json`](./tool-calls/tool-calls-5/decompiled-spec.json) · [`README.md`](./tool-calls/tool-calls-5/README.md) |
| **tool-calls-6** | Tool permission toggles | 88 | 180 | [`capsule.html`](./tool-calls/tool-calls-6/capsule.html) · [`component.css`](./tool-calls/tool-calls-6/component.css) · [`decompiled-spec.json`](./tool-calls/tool-calls-6/decompiled-spec.json) · [`README.md`](./tool-calls/tool-calls-6/README.md) |

<a id="category-agent-approval"></a>
### Agent Approval (`agent-approval/`) — AI & Agent Surfaces

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **agent-approval-1** | Inline approval for a destructive action | 32 | 153 | [`capsule.html`](./agent-approval/agent-approval-1/capsule.html) · [`component.css`](./agent-approval/agent-approval-1/component.css) · [`decompiled-spec.json`](./agent-approval/agent-approval-1/decompiled-spec.json) · [`README.md`](./agent-approval/agent-approval-1/README.md) |
| **agent-approval-2** | Approval dialog with a diff preview | 47 | 155 | [`capsule.html`](./agent-approval/agent-approval-2/capsule.html) · [`component.css`](./agent-approval/agent-approval-2/component.css) · [`decompiled-spec.json`](./agent-approval/agent-approval-2/decompiled-spec.json) · [`README.md`](./agent-approval/agent-approval-2/README.md) |
| **agent-approval-3** | Batch approval queue with risk badges | 82 | 158 | [`capsule.html`](./agent-approval/agent-approval-3/capsule.html) · [`component.css`](./agent-approval/agent-approval-3/component.css) · [`decompiled-spec.json`](./agent-approval/agent-approval-3/decompiled-spec.json) · [`README.md`](./agent-approval/agent-approval-3/README.md) |
| **agent-approval-4** | Permission request with itemized scopes | 54 | 171 | [`capsule.html`](./agent-approval/agent-approval-4/capsule.html) · [`component.css`](./agent-approval/agent-approval-4/component.css) · [`decompiled-spec.json`](./agent-approval/agent-approval-4/decompiled-spec.json) · [`README.md`](./agent-approval/agent-approval-4/README.md) |
| **agent-approval-5** | Approval banner with a cost estimate | 35 | 144 | [`capsule.html`](./agent-approval/agent-approval-5/capsule.html) · [`component.css`](./agent-approval/agent-approval-5/component.css) · [`decompiled-spec.json`](./agent-approval/agent-approval-5/decompiled-spec.json) · [`README.md`](./agent-approval/agent-approval-5/README.md) |
| **agent-approval-6** | Audit list of past approvals | 98 | 182 | [`capsule.html`](./agent-approval/agent-approval-6/capsule.html) · [`component.css`](./agent-approval/agent-approval-6/component.css) · [`decompiled-spec.json`](./agent-approval/agent-approval-6/decompiled-spec.json) · [`README.md`](./agent-approval/agent-approval-6/README.md) |

<a id="category-agent-plan"></a>
### Agent Plan (`agent-plan/`) — AI & Agent Surfaces

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **agent-plan-1** | Task plan checklist with live status | 74 | 156 | [`capsule.html`](./agent-plan/agent-plan-1/capsule.html) · [`component.css`](./agent-plan/agent-plan-1/component.css) · [`decompiled-spec.json`](./agent-plan/agent-plan-1/decompiled-spec.json) · [`README.md`](./agent-plan/agent-plan-1/README.md) |
| **agent-plan-2** | Editable plan before execution | 171 | 175 | [`capsule.html`](./agent-plan/agent-plan-2/capsule.html) · [`component.css`](./agent-plan/agent-plan-2/component.css) · [`decompiled-spec.json`](./agent-plan/agent-plan-2/decompiled-spec.json) · [`README.md`](./agent-plan/agent-plan-2/README.md) |
| **agent-plan-3** | Plan tree with nested subtasks | 101 | 141 | [`capsule.html`](./agent-plan/agent-plan-3/capsule.html) · [`component.css`](./agent-plan/agent-plan-3/component.css) · [`decompiled-spec.json`](./agent-plan/agent-plan-3/decompiled-spec.json) · [`README.md`](./agent-plan/agent-plan-3/README.md) |
| **agent-plan-4** | Plan versus actual comparison | 88 | 122 | [`capsule.html`](./agent-plan/agent-plan-4/capsule.html) · [`component.css`](./agent-plan/agent-plan-4/component.css) · [`decompiled-spec.json`](./agent-plan/agent-plan-4/decompiled-spec.json) · [`README.md`](./agent-plan/agent-plan-4/README.md) |
| **agent-plan-5** | Todo board for agent work | 139 | 91 | [`capsule.html`](./agent-plan/agent-plan-5/capsule.html) · [`component.css`](./agent-plan/agent-plan-5/component.css) · [`decompiled-spec.json`](./agent-plan/agent-plan-5/decompiled-spec.json) · [`README.md`](./agent-plan/agent-plan-5/README.md) |
| **agent-plan-6** | Plan summary with steps and cost | 68 | 151 | [`capsule.html`](./agent-plan/agent-plan-6/capsule.html) · [`component.css`](./agent-plan/agent-plan-6/component.css) · [`decompiled-spec.json`](./agent-plan/agent-plan-6/decompiled-spec.json) · [`README.md`](./agent-plan/agent-plan-6/README.md) |

<a id="category-ai-usage"></a>
### AI Usage (`ai-usage/`) — AI & Agent Surfaces

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **ai-usage-1** | Token usage chart with a range switch | 69 | 117 | [`capsule.html`](./ai-usage/ai-usage-1/capsule.html) · [`component.css`](./ai-usage/ai-usage-1/component.css) · [`decompiled-spec.json`](./ai-usage/ai-usage-1/decompiled-spec.json) · [`README.md`](./ai-usage/ai-usage-1/README.md) |
| **ai-usage-2** | Spend by model table with share bars | 176 | 132 | [`capsule.html`](./ai-usage/ai-usage-2/capsule.html) · [`component.css`](./ai-usage/ai-usage-2/component.css) · [`decompiled-spec.json`](./ai-usage/ai-usage-2/decompiled-spec.json) · [`README.md`](./ai-usage/ai-usage-2/README.md) |
| **ai-usage-3** | Rate limit meters per window | 57 | 142 | [`capsule.html`](./ai-usage/ai-usage-3/capsule.html) · [`component.css`](./ai-usage/ai-usage-3/component.css) · [`decompiled-spec.json`](./ai-usage/ai-usage-3/decompiled-spec.json) · [`README.md`](./ai-usage/ai-usage-3/README.md) |
| **ai-usage-4** | Per-seat usage list with spend caps | 118 | 166 | [`capsule.html`](./ai-usage/ai-usage-4/capsule.html) · [`component.css`](./ai-usage/ai-usage-4/component.css) · [`decompiled-spec.json`](./ai-usage/ai-usage-4/decompiled-spec.json) · [`README.md`](./ai-usage/ai-usage-4/README.md) |
| **ai-usage-5** | Budget settings with a monthly cap | 50 | 156 | [`capsule.html`](./ai-usage/ai-usage-5/capsule.html) · [`component.css`](./ai-usage/ai-usage-5/component.css) · [`decompiled-spec.json`](./ai-usage/ai-usage-5/decompiled-spec.json) · [`README.md`](./ai-usage/ai-usage-5/README.md) |
| **ai-usage-6** | Overage notice with an upgrade picker | 71 | 162 | [`capsule.html`](./ai-usage/ai-usage-6/capsule.html) · [`component.css`](./ai-usage/ai-usage-6/component.css) · [`decompiled-spec.json`](./ai-usage/ai-usage-6/decompiled-spec.json) · [`README.md`](./ai-usage/ai-usage-6/README.md) |
| **ai-usage-7** | Request log with tokens, latency and cost | 195 | 138 | [`capsule.html`](./ai-usage/ai-usage-7/capsule.html) · [`component.css`](./ai-usage/ai-usage-7/component.css) · [`decompiled-spec.json`](./ai-usage/ai-usage-7/decompiled-spec.json) · [`README.md`](./ai-usage/ai-usage-7/README.md) |
| **ai-usage-8** | Compact plan usage widget | 59 | 121 | [`capsule.html`](./ai-usage/ai-usage-8/capsule.html) · [`component.css`](./ai-usage/ai-usage-8/component.css) · [`decompiled-spec.json`](./ai-usage/ai-usage-8/decompiled-spec.json) · [`README.md`](./ai-usage/ai-usage-8/README.md) |

<a id="category-app-shell"></a>
### App Shell (`app-shell/`) — App Chrome & Navigation

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **app-shell-1** | Sidebar app with an overview screen | 523 | 254 | [`capsule.html`](./app-shell/app-shell-1/capsule.html) · [`component.css`](./app-shell/app-shell-1/component.css) · [`decompiled-spec.json`](./app-shell/app-shell-1/decompiled-spec.json) · [`README.md`](./app-shell/app-shell-1/README.md) |
| **app-shell-2** | Icon rail with a swapping nav pane | 265 | 172 | [`capsule.html`](./app-shell/app-shell-2/capsule.html) · [`component.css`](./app-shell/app-shell-2/component.css) · [`decompiled-spec.json`](./app-shell/app-shell-2/decompiled-spec.json) · [`README.md`](./app-shell/app-shell-2/README.md) |
| **app-shell-3** | Top bar above a collapsible sidebar | 617 | 267 | [`capsule.html`](./app-shell/app-shell-3/capsule.html) · [`component.css`](./app-shell/app-shell-3/component.css) · [`decompiled-spec.json`](./app-shell/app-shell-3/decompiled-spec.json) · [`README.md`](./app-shell/app-shell-3/README.md) |
| **app-shell-4** | Three columns with a context panel | 791 | 242 | [`capsule.html`](./app-shell/app-shell-4/capsule.html) · [`component.css`](./app-shell/app-shell-4/component.css) · [`decompiled-spec.json`](./app-shell/app-shell-4/decompiled-spec.json) · [`README.md`](./app-shell/app-shell-4/README.md) |
| **app-shell-5** | Triage frame with list and reading panes | 233 | 235 | [`capsule.html`](./app-shell/app-shell-5/capsule.html) · [`component.css`](./app-shell/app-shell-5/component.css) · [`decompiled-spec.json`](./app-shell/app-shell-5/decompiled-spec.json) · [`README.md`](./app-shell/app-shell-5/README.md) |
| **app-shell-6** | Document workspace with a file tree | 192 | 171 | [`capsule.html`](./app-shell/app-shell-6/capsule.html) · [`component.css`](./app-shell/app-shell-6/component.css) · [`decompiled-spec.json`](./app-shell/app-shell-6/decompiled-spec.json) · [`README.md`](./app-shell/app-shell-6/README.md) |
| **app-shell-7** | Frame with org and project switchers | 413 | 258 | [`capsule.html`](./app-shell/app-shell-7/capsule.html) · [`component.css`](./app-shell/app-shell-7/component.css) · [`decompiled-spec.json`](./app-shell/app-shell-7/decompiled-spec.json) · [`README.md`](./app-shell/app-shell-7/README.md) |
| **app-shell-8** | Frame that adapts from tab bar to sidebar | 642 | 289 | [`capsule.html`](./app-shell/app-shell-8/capsule.html) · [`component.css`](./app-shell/app-shell-8/component.css) · [`decompiled-spec.json`](./app-shell/app-shell-8/decompiled-spec.json) · [`README.md`](./app-shell/app-shell-8/README.md) |
| **app-shell-9** | AI chat frame with thread history | 237 | 211 | [`capsule.html`](./app-shell/app-shell-9/capsule.html) · [`component.css`](./app-shell/app-shell-9/component.css) · [`decompiled-spec.json`](./app-shell/app-shell-9/decompiled-spec.json) · [`README.md`](./app-shell/app-shell-9/README.md) |

<a id="category-app-sidebar"></a>
### App Sidebar (`app-sidebar/`) — App Chrome & Navigation

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **app-sidebar-1** | Collapsible sidebar with grouped sections | 124 | 128 | [`capsule.html`](./app-sidebar/app-sidebar-1/capsule.html) · [`component.css`](./app-sidebar/app-sidebar-1/component.css) · [`decompiled-spec.json`](./app-sidebar/app-sidebar-1/decompiled-spec.json) · [`README.md`](./app-sidebar/app-sidebar-1/README.md) |
| **app-sidebar-2** | Icon rail with hover flyouts | 84 | 72 | [`capsule.html`](./app-sidebar/app-sidebar-2/capsule.html) · [`component.css`](./app-sidebar/app-sidebar-2/component.css) · [`decompiled-spec.json`](./app-sidebar/app-sidebar-2/decompiled-spec.json) · [`README.md`](./app-sidebar/app-sidebar-2/README.md) |
| **app-sidebar-3** | Sidebar with a workspace switcher | 121 | 162 | [`capsule.html`](./app-sidebar/app-sidebar-3/capsule.html) · [`component.css`](./app-sidebar/app-sidebar-3/component.css) · [`decompiled-spec.json`](./app-sidebar/app-sidebar-3/decompiled-spec.json) · [`README.md`](./app-sidebar/app-sidebar-3/README.md) |
| **app-sidebar-4** | Icon rail with a secondary panel | 115 | 156 | [`capsule.html`](./app-sidebar/app-sidebar-4/capsule.html) · [`component.css`](./app-sidebar/app-sidebar-4/component.css) · [`decompiled-spec.json`](./app-sidebar/app-sidebar-4/decompiled-spec.json) · [`README.md`](./app-sidebar/app-sidebar-4/README.md) |
| **app-sidebar-5** | Sidebar with a nested tree | 243 | 164 | [`capsule.html`](./app-sidebar/app-sidebar-5/capsule.html) · [`component.css`](./app-sidebar/app-sidebar-5/component.css) · [`decompiled-spec.json`](./app-sidebar/app-sidebar-5/decompiled-spec.json) · [`README.md`](./app-sidebar/app-sidebar-5/README.md) |
| **app-sidebar-6** | Mobile navigation drawer | 123 | 125 | [`capsule.html`](./app-sidebar/app-sidebar-6/capsule.html) · [`component.css`](./app-sidebar/app-sidebar-6/component.css) · [`decompiled-spec.json`](./app-sidebar/app-sidebar-6/decompiled-spec.json) · [`README.md`](./app-sidebar/app-sidebar-6/README.md) |
| **app-sidebar-7** | Full app shell with sidebar and header | 139 | 119 | [`capsule.html`](./app-sidebar/app-sidebar-7/capsule.html) · [`component.css`](./app-sidebar/app-sidebar-7/component.css) · [`decompiled-spec.json`](./app-sidebar/app-sidebar-7/decompiled-spec.json) · [`README.md`](./app-sidebar/app-sidebar-7/README.md) |

<a id="category-command-menu"></a>
### Command Menu (`command-menu/`) — App Chrome & Navigation

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **command-menu-1** | Command palette with grouped results | 125 | 164 | [`capsule.html`](./command-menu/command-menu-1/capsule.html) · [`component.css`](./command-menu/command-menu-1/component.css) · [`decompiled-spec.json`](./command-menu/command-menu-1/decompiled-spec.json) · [`README.md`](./command-menu/command-menu-1/README.md) |
| **command-menu-2** | Command menu with nested pages | 79 | 157 | [`capsule.html`](./command-menu/command-menu-2/capsule.html) · [`component.css`](./command-menu/command-menu-2/component.css) · [`decompiled-spec.json`](./command-menu/command-menu-2/decompiled-spec.json) · [`README.md`](./command-menu/command-menu-2/README.md) |
| **command-menu-3** | Search palette with inline previews | 142 | 204 | [`capsule.html`](./command-menu/command-menu-3/capsule.html) · [`component.css`](./command-menu/command-menu-3/component.css) · [`decompiled-spec.json`](./command-menu/command-menu-3/decompiled-spec.json) · [`README.md`](./command-menu/command-menu-3/README.md) |
| **command-menu-4** | Action menu that collects arguments | 42 | 204 | [`capsule.html`](./command-menu/command-menu-4/capsule.html) · [`component.css`](./command-menu/command-menu-4/component.css) · [`decompiled-spec.json`](./command-menu/command-menu-4/decompiled-spec.json) · [`README.md`](./command-menu/command-menu-4/README.md) |
| **command-menu-5** | Command palette with an AI fallback | 48 | 175 | [`capsule.html`](./command-menu/command-menu-5/capsule.html) · [`component.css`](./command-menu/command-menu-5/component.css) · [`decompiled-spec.json`](./command-menu/command-menu-5/decompiled-spec.json) · [`README.md`](./command-menu/command-menu-5/README.md) |
| **command-menu-6** | Compact command popover | 91 | 158 | [`capsule.html`](./command-menu/command-menu-6/capsule.html) · [`component.css`](./command-menu/command-menu-6/component.css) · [`decompiled-spec.json`](./command-menu/command-menu-6/decompiled-spec.json) · [`README.md`](./command-menu/command-menu-6/README.md) |

<a id="category-navbar"></a>
### Navbar (`navbar/`) — App Chrome & Navigation

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **navbar-1** | Project header with sliding tab underline | 76 | 167 | [`capsule.html`](./navbar/navbar-1/capsule.html) · [`component.css`](./navbar/navbar-1/component.css) · [`decompiled-spec.json`](./navbar/navbar-1/decompiled-spec.json) · [`README.md`](./navbar/navbar-1/README.md) |
| **navbar-2** | Breadcrumb toolbar with filter chips | 77 | 117 | [`capsule.html`](./navbar/navbar-2/capsule.html) · [`component.css`](./navbar/navbar-2/component.css) · [`decompiled-spec.json`](./navbar/navbar-2/decompiled-spec.json) · [`README.md`](./navbar/navbar-2/README.md) |
| **navbar-3** | Workspace switcher bar | 61 | 134 | [`capsule.html`](./navbar/navbar-3/capsule.html) · [`component.css`](./navbar/navbar-3/component.css) · [`decompiled-spec.json`](./navbar/navbar-3/decompiled-spec.json) · [`README.md`](./navbar/navbar-3/README.md) |
| **navbar-4** | Marketing header with dropdown panels | 38 | 130 | [`capsule.html`](./navbar/navbar-4/capsule.html) · [`component.css`](./navbar/navbar-4/component.css) · [`decompiled-spec.json`](./navbar/navbar-4/decompiled-spec.json) · [`README.md`](./navbar/navbar-4/README.md) |
| **navbar-5** | Mega menu header with link columns | 45 | 135 | [`capsule.html`](./navbar/navbar-5/capsule.html) · [`component.css`](./navbar/navbar-5/component.css) · [`decompiled-spec.json`](./navbar/navbar-5/decompiled-spec.json) · [`README.md`](./navbar/navbar-5/README.md) |
| **navbar-6** | App bar with search and notifications | 65 | 169 | [`capsule.html`](./navbar/navbar-6/capsule.html) · [`component.css`](./navbar/navbar-6/component.css) · [`decompiled-spec.json`](./navbar/navbar-6/decompiled-spec.json) · [`README.md`](./navbar/navbar-6/README.md) |
| **navbar-7** | Two-tier dashboard header | 66 | 195 | [`capsule.html`](./navbar/navbar-7/capsule.html) · [`component.css`](./navbar/navbar-7/component.css) · [`decompiled-spec.json`](./navbar/navbar-7/decompiled-spec.json) · [`README.md`](./navbar/navbar-7/README.md) |
| **navbar-8** | Tab bar with an animated pill | 78 | 148 | [`capsule.html`](./navbar/navbar-8/capsule.html) · [`component.css`](./navbar/navbar-8/component.css) · [`decompiled-spec.json`](./navbar/navbar-8/decompiled-spec.json) · [`README.md`](./navbar/navbar-8/README.md) |
| **navbar-9** | Store navbar with a mini cart | 56 | 118 | [`capsule.html`](./navbar/navbar-9/capsule.html) · [`component.css`](./navbar/navbar-9/component.css) · [`decompiled-spec.json`](./navbar/navbar-9/decompiled-spec.json) · [`README.md`](./navbar/navbar-9/README.md) |
| **navbar-10** | Docs header with version and search | 97 | 161 | [`capsule.html`](./navbar/navbar-10/capsule.html) · [`component.css`](./navbar/navbar-10/component.css) · [`decompiled-spec.json`](./navbar/navbar-10/decompiled-spec.json) · [`README.md`](./navbar/navbar-10/README.md) |
| **navbar-11** | Editor toolbar with presence avatars | 45 | 123 | [`capsule.html`](./navbar/navbar-11/capsule.html) · [`component.css`](./navbar/navbar-11/component.css) · [`decompiled-spec.json`](./navbar/navbar-11/decompiled-spec.json) · [`README.md`](./navbar/navbar-11/README.md) |
| **navbar-12** | Floating navbar that lifts on scroll | 38 | 125 | [`capsule.html`](./navbar/navbar-12/capsule.html) · [`component.css`](./navbar/navbar-12/component.css) · [`decompiled-spec.json`](./navbar/navbar-12/decompiled-spec.json) · [`README.md`](./navbar/navbar-12/README.md) |
| **navbar-13** | Centered logo navbar with overlay menu | 62 | 125 | [`capsule.html`](./navbar/navbar-13/capsule.html) · [`component.css`](./navbar/navbar-13/component.css) · [`decompiled-spec.json`](./navbar/navbar-13/decompiled-spec.json) · [`README.md`](./navbar/navbar-13/README.md) |
| **navbar-14** | Article header with reading progress | 60 | 106 | [`capsule.html`](./navbar/navbar-14/capsule.html) · [`component.css`](./navbar/navbar-14/component.css) · [`decompiled-spec.json`](./navbar/navbar-14/decompiled-spec.json) · [`README.md`](./navbar/navbar-14/README.md) |

<a id="category-mobile"></a>
### Mobile (`mobile/`) — App Chrome & Navigation

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **mobile-1** | Five-tab bottom bar with badges | 125 | 116 | [`capsule.html`](./mobile/mobile-1/capsule.html) · [`component.css`](./mobile/mobile-1/component.css) · [`decompiled-spec.json`](./mobile/mobile-1/decompiled-spec.json) · [`README.md`](./mobile/mobile-1/README.md) |
| **mobile-2** | Action button that fans out actions | 87 | 127 | [`capsule.html`](./mobile/mobile-2/capsule.html) · [`component.css`](./mobile/mobile-2/component.css) · [`decompiled-spec.json`](./mobile/mobile-2/decompiled-spec.json) · [`README.md`](./mobile/mobile-2/README.md) |
| **mobile-3** | Dock that morphs into a search field | 81 | 94 | [`capsule.html`](./mobile/mobile-3/capsule.html) · [`component.css`](./mobile/mobile-3/component.css) · [`decompiled-spec.json`](./mobile/mobile-3/decompiled-spec.json) · [`README.md`](./mobile/mobile-3/README.md) |
| **mobile-4** | Bottom bar with a navigation sheet | 104 | 89 | [`capsule.html`](./mobile/mobile-4/capsule.html) · [`component.css`](./mobile/mobile-4/component.css) · [`decompiled-spec.json`](./mobile/mobile-4/decompiled-spec.json) · [`README.md`](./mobile/mobile-4/README.md) |
| **mobile-5** | Top bar with a full-screen menu | 132 | 135 | [`capsule.html`](./mobile/mobile-5/capsule.html) · [`component.css`](./mobile/mobile-5/component.css) · [`decompiled-spec.json`](./mobile/mobile-5/decompiled-spec.json) · [`README.md`](./mobile/mobile-5/README.md) |

<a id="category-card"></a>
### Cards (`card/`) — Data, Dashboards & Monitoring

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **card-1** | Member cards with stats and connect | 68 | 113 | [`capsule.html`](./card/card-1/capsule.html) · [`component.css`](./card/card-1/component.css) · [`decompiled-spec.json`](./card/card-1/decompiled-spec.json) · [`README.md`](./card/card-1/README.md) |
| **card-2** | Integration rows with connect switches | 77 | 98 | [`capsule.html`](./card/card-2/capsule.html) · [`component.css`](./card/card-2/component.css) · [`decompiled-spec.json`](./card/card-2/decompiled-spec.json) · [`README.md`](./card/card-2/README.md) |
| **card-3** | Onboarding columns you tick off | 36 | 120 | [`capsule.html`](./card/card-3/capsule.html) · [`component.css`](./card/card-3/component.css) · [`decompiled-spec.json`](./card/card-3/decompiled-spec.json) · [`README.md`](./card/card-3/README.md) |
| **card-4** | Agenda cards with an RSVP row | 140 | 109 | [`capsule.html`](./card/card-4/capsule.html) · [`component.css`](./card/card-4/component.css) · [`decompiled-spec.json`](./card/card-4/decompiled-spec.json) · [`README.md`](./card/card-4/README.md) |
| **card-5** | Plan cards with price and checklist | 111 | 127 | [`capsule.html`](./card/card-5/capsule.html) · [`component.css`](./card/card-5/component.css) · [`decompiled-spec.json`](./card/card-5/decompiled-spec.json) · [`README.md`](./card/card-5/README.md) |
| **card-6** | Account metrics with a date range | 99 | 118 | [`capsule.html`](./card/card-6/capsule.html) · [`component.css`](./card/card-6/component.css) · [`decompiled-spec.json`](./card/card-6/decompiled-spec.json) · [`README.md`](./card/card-6/README.md) |
| **card-7** | Changelog cards with bookmarks | 110 | 100 | [`capsule.html`](./card/card-7/capsule.html) · [`component.css`](./card/card-7/component.css) · [`decompiled-spec.json`](./card/card-7/decompiled-spec.json) · [`README.md`](./card/card-7/README.md) |
| **card-8** | Selectable file tiles with a toolbar | 139 | 133 | [`capsule.html`](./card/card-8/capsule.html) · [`component.css`](./card/card-8/component.css) · [`decompiled-spec.json`](./card/card-8/decompiled-spec.json) · [`README.md`](./card/card-8/README.md) |
| **card-9** | Profile card with stats and follow | 38 | 125 | [`capsule.html`](./card/card-9/capsule.html) · [`component.css`](./card/card-9/component.css) · [`decompiled-spec.json`](./card/card-9/decompiled-spec.json) · [`README.md`](./card/card-9/README.md) |
| **card-10** | Balance card with recent activity | 60 | 110 | [`capsule.html`](./card/card-10/capsule.html) · [`component.css`](./card/card-10/component.css) · [`decompiled-spec.json`](./card/card-10/decompiled-spec.json) · [`README.md`](./card/card-10/README.md) |
| **card-11** | Invoice card with a PDF download | 46 | 106 | [`capsule.html`](./card/card-11/capsule.html) · [`component.css`](./card/card-11/component.css) · [`decompiled-spec.json`](./card/card-11/decompiled-spec.json) · [`README.md`](./card/card-11/README.md) |

<a id="category-data-table"></a>
### Data Table (`data-table/`) — Data, Dashboards & Monitoring

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **data-table-1** | Table with filters and column toggles | 295 | 223 | [`capsule.html`](./data-table/data-table-1/capsule.html) · [`component.css`](./data-table/data-table-1/component.css) · [`decompiled-spec.json`](./data-table/data-table-1/decompiled-spec.json) · [`README.md`](./data-table/data-table-1/README.md) |
| **data-table-2** | Table with bulk actions and pagination | 230 | 201 | [`capsule.html`](./data-table/data-table-2/capsule.html) · [`component.css`](./data-table/data-table-2/component.css) · [`decompiled-spec.json`](./data-table/data-table-2/decompiled-spec.json) · [`README.md`](./data-table/data-table-2/README.md) |
| **data-table-3** | Table with inline cell editing | 221 | 134 | [`capsule.html`](./data-table/data-table-3/capsule.html) · [`component.css`](./data-table/data-table-3/component.css) · [`decompiled-spec.json`](./data-table/data-table-3/decompiled-spec.json) · [`README.md`](./data-table/data-table-3/README.md) |
| **data-table-4** | Table with expandable rows | 179 | 183 | [`capsule.html`](./data-table/data-table-4/capsule.html) · [`component.css`](./data-table/data-table-4/component.css) · [`decompiled-spec.json`](./data-table/data-table-4/decompiled-spec.json) · [`README.md`](./data-table/data-table-4/README.md) |
| **data-table-5** | Table with grouped rows and density | 148 | 133 | [`capsule.html`](./data-table/data-table-5/capsule.html) · [`component.css`](./data-table/data-table-5/component.css) · [`decompiled-spec.json`](./data-table/data-table-5/decompiled-spec.json) · [`README.md`](./data-table/data-table-5/README.md) |
| **data-table-6** | Table with a synced detail panel | 164 | 201 | [`capsule.html`](./data-table/data-table-6/capsule.html) · [`component.css`](./data-table/data-table-6/component.css) · [`decompiled-spec.json`](./data-table/data-table-6/decompiled-spec.json) · [`README.md`](./data-table/data-table-6/README.md) |
| **data-table-7** | Table empty, loading and error states | 131 | 128 | [`capsule.html`](./data-table/data-table-7/capsule.html) · [`component.css`](./data-table/data-table-7/component.css) · [`decompiled-spec.json`](./data-table/data-table-7/decompiled-spec.json) · [`README.md`](./data-table/data-table-7/README.md) |
| **data-table-8** | Wide table with a sticky first column | 286 | 160 | [`capsule.html`](./data-table/data-table-8/capsule.html) · [`component.css`](./data-table/data-table-8/component.css) · [`decompiled-spec.json`](./data-table/data-table-8/decompiled-spec.json) · [`README.md`](./data-table/data-table-8/README.md) |

<a id="category-dashboard"></a>
### Dashboard (`dashboard/`) — Data, Dashboards & Monitoring

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **dashboard-1** | Metric cards with sparklines | 101 | 128 | [`capsule.html`](./dashboard/dashboard-1/capsule.html) · [`component.css`](./dashboard/dashboard-1/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-1/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-1/README.md) |
| **dashboard-2** | Chart panel with a breakdown table | 110 | 140 | [`capsule.html`](./dashboard/dashboard-2/capsule.html) · [`component.css`](./dashboard/dashboard-2/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-2/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-2/README.md) |
| **dashboard-3** | Widget grid with mixed card sizes | 167 | 144 | [`capsule.html`](./dashboard/dashboard-3/capsule.html) · [`component.css`](./dashboard/dashboard-3/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-3/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-3/README.md) |
| **dashboard-4** | Operations board with incidents | 215 | 173 | [`capsule.html`](./dashboard/dashboard-4/capsule.html) · [`component.css`](./dashboard/dashboard-4/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-4/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-4/README.md) |
| **dashboard-5** | Usage dashboard with quota meters | 95 | 133 | [`capsule.html`](./dashboard/dashboard-5/capsule.html) · [`component.css`](./dashboard/dashboard-5/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-5/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-5/README.md) |
| **dashboard-6** | Analytics overview with comparison mode | 155 | 158 | [`capsule.html`](./dashboard/dashboard-6/capsule.html) · [`component.css`](./dashboard/dashboard-6/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-6/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-6/README.md) |
| **dashboard-7** | Dashboard loading and empty states | 68 | 127 | [`capsule.html`](./dashboard/dashboard-7/capsule.html) · [`component.css`](./dashboard/dashboard-7/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-7/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-7/README.md) |
| **dashboard-8** | Module board with progress rings | 584 | 264 | [`capsule.html`](./dashboard/dashboard-8/capsule.html) · [`component.css`](./dashboard/dashboard-8/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-8/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-8/README.md) |
| **dashboard-9** | Weekly worklog grid by person | 517 | 220 | [`capsule.html`](./dashboard/dashboard-9/capsule.html) · [`component.css`](./dashboard/dashboard-9/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-9/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-9/README.md) |
| **dashboard-10** | Metric explorer with one large chart | 236 | 179 | [`capsule.html`](./dashboard/dashboard-10/capsule.html) · [`component.css`](./dashboard/dashboard-10/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-10/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-10/README.md) |
| **dashboard-11** | Staffing board with a demand chart | 438 | 234 | [`capsule.html`](./dashboard/dashboard-11/capsule.html) · [`component.css`](./dashboard/dashboard-11/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-11/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-11/README.md) |
| **dashboard-12** | Payout desk with a pace chart | 348 | 234 | [`capsule.html`](./dashboard/dashboard-12/capsule.html) · [`component.css`](./dashboard/dashboard-12/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-12/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-12/README.md) |
| **dashboard-13** | Quarterly scorecard of objectives | 263 | 166 | [`capsule.html`](./dashboard/dashboard-13/capsule.html) · [`component.css`](./dashboard/dashboard-13/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-13/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-13/README.md) |
| **dashboard-14** | Service board with a detail view | 247 | 225 | [`capsule.html`](./dashboard/dashboard-14/capsule.html) · [`component.css`](./dashboard/dashboard-14/component.css) · [`decompiled-spec.json`](./dashboard/dashboard-14/decompiled-spec.json) · [`README.md`](./dashboard/dashboard-14/README.md) |

<a id="category-analytics"></a>
### Analytics (`analytics/`) — Data, Dashboards & Monitoring

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **analytics-1** | Metric strip with scrubbable sparklines | 76 | 122 | [`capsule.html`](./analytics/analytics-1/capsule.html) · [`component.css`](./analytics/analytics-1/component.css) · [`decompiled-spec.json`](./analytics/analytics-1/decompiled-spec.json) · [`README.md`](./analytics/analytics-1/README.md) |
| **analytics-2** | Area chart with a crosshair | 30 | 113 | [`capsule.html`](./analytics/analytics-2/capsule.html) · [`component.css`](./analytics/analytics-2/component.css) · [`decompiled-spec.json`](./analytics/analytics-2/decompiled-spec.json) · [`README.md`](./analytics/analytics-2/README.md) |
| **analytics-3** | Grouped bar chart with a tooltip | 38 | 96 | [`capsule.html`](./analytics/analytics-3/capsule.html) · [`component.css`](./analytics/analytics-3/component.css) · [`decompiled-spec.json`](./analytics/analytics-3/decompiled-spec.json) · [`README.md`](./analytics/analytics-3/README.md) |
| **analytics-4** | Stacked area chart with totals | 51 | 94 | [`capsule.html`](./analytics/analytics-4/capsule.html) · [`component.css`](./analytics/analytics-4/component.css) · [`decompiled-spec.json`](./analytics/analytics-4/decompiled-spec.json) · [`README.md`](./analytics/analytics-4/README.md) |
| **analytics-5** | Donut chart with a live center total | 58 | 132 | [`capsule.html`](./analytics/analytics-5/capsule.html) · [`component.css`](./analytics/analytics-5/component.css) · [`decompiled-spec.json`](./analytics/analytics-5/decompiled-spec.json) · [`README.md`](./analytics/analytics-5/README.md) |
| **analytics-6** | Ranked sources with sparklines | 129 | 145 | [`capsule.html`](./analytics/analytics-6/capsule.html) · [`component.css`](./analytics/analytics-6/component.css) · [`decompiled-spec.json`](./analytics/analytics-6/decompiled-spec.json) · [`README.md`](./analytics/analytics-6/README.md) |
| **analytics-7** | Sparkline cards with a detail panel | 102 | 135 | [`capsule.html`](./analytics/analytics-7/capsule.html) · [`component.css`](./analytics/analytics-7/component.css) · [`decompiled-spec.json`](./analytics/analytics-7/decompiled-spec.json) · [`README.md`](./analytics/analytics-7/README.md) |
| **analytics-8** | Conversion funnel with drop-off | 80 | 130 | [`capsule.html`](./analytics/analytics-8/capsule.html) · [`component.css`](./analytics/analytics-8/component.css) · [`decompiled-spec.json`](./analytics/analytics-8/decompiled-spec.json) · [`README.md`](./analytics/analytics-8/README.md) |
| **analytics-9** | Activity heatmap with tooltips | 231 | 124 | [`capsule.html`](./analytics/analytics-9/capsule.html) · [`component.css`](./analytics/analytics-9/component.css) · [`decompiled-spec.json`](./analytics/analytics-9/decompiled-spec.json) · [`README.md`](./analytics/analytics-9/README.md) |
| **analytics-10** | Radial goal gauges | 54 | 132 | [`capsule.html`](./analytics/analytics-10/capsule.html) · [`component.css`](./analytics/analytics-10/component.css) · [`decompiled-spec.json`](./analytics/analytics-10/decompiled-spec.json) · [`README.md`](./analytics/analytics-10/README.md) |
| **analytics-11** | Cohort retention matrix | 248 | 124 | [`capsule.html`](./analytics/analytics-11/capsule.html) · [`component.css`](./analytics/analytics-11/component.css) · [`decompiled-spec.json`](./analytics/analytics-11/decompiled-spec.json) · [`README.md`](./analytics/analytics-11/README.md) |
| **analytics-12** | Sortable horizontal bar ranking | 99 | 155 | [`capsule.html`](./analytics/analytics-12/capsule.html) · [`component.css`](./analytics/analytics-12/component.css) · [`decompiled-spec.json`](./analytics/analytics-12/decompiled-spec.json) · [`README.md`](./analytics/analytics-12/README.md) |
| **analytics-13** | Candlestick chart with volume | 208 | 142 | [`capsule.html`](./analytics/analytics-13/capsule.html) · [`component.css`](./analytics/analytics-13/component.css) · [`decompiled-spec.json`](./analytics/analytics-13/decompiled-spec.json) · [`README.md`](./analytics/analytics-13/README.md) |
| **analytics-14** | Scatter plot with quadrants | 92 | 135 | [`capsule.html`](./analytics/analytics-14/capsule.html) · [`component.css`](./analytics/analytics-14/component.css) · [`decompiled-spec.json`](./analytics/analytics-14/decompiled-spec.json) · [`README.md`](./analytics/analytics-14/README.md) |
| **analytics-15** | Bullet charts with targets | 131 | 166 | [`capsule.html`](./analytics/analytics-15/capsule.html) · [`component.css`](./analytics/analytics-15/component.css) · [`decompiled-spec.json`](./analytics/analytics-15/decompiled-spec.json) · [`README.md`](./analytics/analytics-15/README.md) |
| **analytics-16** | Bars with a trend line | 60 | 167 | [`capsule.html`](./analytics/analytics-16/capsule.html) · [`component.css`](./analytics/analytics-16/component.css) · [`decompiled-spec.json`](./analytics/analytics-16/decompiled-spec.json) · [`README.md`](./analytics/analytics-16/README.md) |

<a id="category-list"></a>
### List (`list/`) — Data, Dashboards & Monitoring

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **list-1** | Metric rows that expand to explain | 97 | 140 | [`capsule.html`](./list/list-1/capsule.html) · [`component.css`](./list/list-1/component.css) · [`decompiled-spec.json`](./list/list-1/decompiled-spec.json) · [`README.md`](./list/list-1/README.md) |
| **list-2** | Ranked spend list with a period switch | 108 | 153 | [`capsule.html`](./list/list-2/capsule.html) · [`component.css`](./list/list-2/component.css) · [`decompiled-spec.json`](./list/list-2/decompiled-spec.json) · [`README.md`](./list/list-2/README.md) |
| **list-3** | Security event feed with filters | 194 | 152 | [`capsule.html`](./list/list-3/capsule.html) · [`component.css`](./list/list-3/component.css) · [`decompiled-spec.json`](./list/list-3/decompiled-spec.json) · [`README.md`](./list/list-3/README.md) |
| **list-4** | Reorderable publishing queue | 155 | 115 | [`capsule.html`](./list/list-4/capsule.html) · [`component.css`](./list/list-4/component.css) · [`decompiled-spec.json`](./list/list-4/decompiled-spec.json) · [`README.md`](./list/list-4/README.md) |
| **list-5** | Asset library with bulk actions | 297 | 192 | [`capsule.html`](./list/list-5/capsule.html) · [`component.css`](./list/list-5/component.css) · [`decompiled-spec.json`](./list/list-5/decompiled-spec.json) · [`README.md`](./list/list-5/README.md) |
| **list-6** | Webhook delivery log with payloads | 280 | 179 | [`capsule.html`](./list/list-6/capsule.html) · [`component.css`](./list/list-6/component.css) · [`decompiled-spec.json`](./list/list-6/decompiled-spec.json) · [`README.md`](./list/list-6/README.md) |
| **list-7** | Supplier directory with search | 305 | 190 | [`capsule.html`](./list/list-7/capsule.html) · [`component.css`](./list/list-7/component.css) · [`decompiled-spec.json`](./list/list-7/decompiled-spec.json) · [`README.md`](./list/list-7/README.md) |
| **list-8** | Inbox with archive, snooze and undo | 230 | 157 | [`capsule.html`](./list/list-8/capsule.html) · [`component.css`](./list/list-8/component.css) · [`decompiled-spec.json`](./list/list-8/decompiled-spec.json) · [`README.md`](./list/list-8/README.md) |
| **list-9** | Contact list with an alphabet rail | 498 | 157 | [`capsule.html`](./list/list-9/capsule.html) · [`component.css`](./list/list-9/component.css) · [`decompiled-spec.json`](./list/list-9/decompiled-spec.json) · [`README.md`](./list/list-9/README.md) |
| **list-10** | Runbook checklist with progress | 127 | 148 | [`capsule.html`](./list/list-10/capsule.html) · [`component.css`](./list/list-10/component.css) · [`decompiled-spec.json`](./list/list-10/decompiled-spec.json) · [`README.md`](./list/list-10/README.md) |
| **list-11** | Support leaderboard with rank changes | 229 | 142 | [`capsule.html`](./list/list-11/capsule.html) · [`component.css`](./list/list-11/component.css) · [`decompiled-spec.json`](./list/list-11/decompiled-spec.json) · [`README.md`](./list/list-11/README.md) |
| **list-12** | File tree with keyboard navigation | 136 | 122 | [`capsule.html`](./list/list-12/capsule.html) · [`component.css`](./list/list-12/component.css) · [`decompiled-spec.json`](./list/list-12/decompiled-spec.json) · [`README.md`](./list/list-12/README.md) |

<a id="category-filtering"></a>
### Filtering (`filtering/`) — Data, Dashboards & Monitoring

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **filtering-1** | Faceted product filters with swatches | 284 | 207 | [`capsule.html`](./filtering/filtering-1/capsule.html) · [`component.css`](./filtering/filtering-1/component.css) · [`decompiled-spec.json`](./filtering/filtering-1/decompiled-spec.json) · [`README.md`](./filtering/filtering-1/README.md) |
| **filtering-2** | Filter drawer with a live count | 132 | 210 | [`capsule.html`](./filtering/filtering-2/capsule.html) · [`component.css`](./filtering/filtering-2/component.css) · [`decompiled-spec.json`](./filtering/filtering-2/decompiled-spec.json) · [`README.md`](./filtering/filtering-2/README.md) |
| **filtering-3** | Query builder driving a live table | 265 | 232 | [`capsule.html`](./filtering/filtering-3/capsule.html) · [`component.css`](./filtering/filtering-3/component.css) · [`decompiled-spec.json`](./filtering/filtering-3/decompiled-spec.json) · [`README.md`](./filtering/filtering-3/README.md) |
| **filtering-4** | Log explorer with a volume chart | 338 | 206 | [`capsule.html`](./filtering/filtering-4/capsule.html) · [`component.css`](./filtering/filtering-4/component.css) · [`decompiled-spec.json`](./filtering/filtering-4/decompiled-spec.json) · [`README.md`](./filtering/filtering-4/README.md) |
| **filtering-5** | Property search filters | 855 | 205 | [`capsule.html`](./filtering/filtering-5/capsule.html) · [`component.css`](./filtering/filtering-5/component.css) · [`decompiled-spec.json`](./filtering/filtering-5/decompiled-spec.json) · [`README.md`](./filtering/filtering-5/README.md) |
| **filtering-6** | Candidate search by skills and pay | 428 | 268 | [`capsule.html`](./filtering/filtering-6/capsule.html) · [`component.css`](./filtering/filtering-6/component.css) · [`decompiled-spec.json`](./filtering/filtering-6/decompiled-spec.json) · [`README.md`](./filtering/filtering-6/README.md) |
| **filtering-7** | Facet bar over an asset grid | 315 | 161 | [`capsule.html`](./filtering/filtering-7/capsule.html) · [`component.css`](./filtering/filtering-7/component.css) · [`decompiled-spec.json`](./filtering/filtering-7/decompiled-spec.json) · [`README.md`](./filtering/filtering-7/README.md) |
| **filtering-8** | Flight filters with time ranges | 474 | 231 | [`capsule.html`](./filtering/filtering-8/capsule.html) · [`component.css`](./filtering/filtering-8/component.css) · [`decompiled-spec.json`](./filtering/filtering-8/decompiled-spec.json) · [`README.md`](./filtering/filtering-8/README.md) |
| **filtering-9** | Cuisine pills with rating filters | 323 | 187 | [`capsule.html`](./filtering/filtering-9/capsule.html) · [`component.css`](./filtering/filtering-9/component.css) · [`decompiled-spec.json`](./filtering/filtering-9/decompiled-spec.json) · [`README.md`](./filtering/filtering-9/README.md) |

<a id="category-file-manager"></a>
### File Manager (`file-manager/`) — Data, Dashboards & Monitoring

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **file-manager-1** | Drive explorer with a folder tree | 521 | 292 | [`capsule.html`](./file-manager/file-manager-1/capsule.html) · [`component.css`](./file-manager/file-manager-1/component.css) · [`decompiled-spec.json`](./file-manager/file-manager-1/decompiled-spec.json) · [`README.md`](./file-manager/file-manager-1/README.md) |
| **file-manager-2** | Asset grid with type filters | 193 | 184 | [`capsule.html`](./file-manager/file-manager-2/capsule.html) · [`component.css`](./file-manager/file-manager-2/component.css) · [`decompiled-spec.json`](./file-manager/file-manager-2/decompiled-spec.json) · [`README.md`](./file-manager/file-manager-2/README.md) |
| **file-manager-3** | File browser with a detail panel | 160 | 183 | [`capsule.html`](./file-manager/file-manager-3/capsule.html) · [`component.css`](./file-manager/file-manager-3/component.css) · [`decompiled-spec.json`](./file-manager/file-manager-3/decompiled-spec.json) · [`README.md`](./file-manager/file-manager-3/README.md) |
| **file-manager-4** | Upload manager with per-file progress | 113 | 172 | [`capsule.html`](./file-manager/file-manager-4/capsule.html) · [`component.css`](./file-manager/file-manager-4/component.css) · [`decompiled-spec.json`](./file-manager/file-manager-4/decompiled-spec.json) · [`README.md`](./file-manager/file-manager-4/README.md) |

<a id="category-monitoring"></a>
### Monitoring (`monitoring/`) — Data, Dashboards & Monitoring

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **monitoring-1** | Platform health with an incident feed | 129 | 197 | [`capsule.html`](./monitoring/monitoring-1/capsule.html) · [`component.css`](./monitoring/monitoring-1/component.css) · [`decompiled-spec.json`](./monitoring/monitoring-1/decompiled-spec.json) · [`README.md`](./monitoring/monitoring-1/README.md) |
| **monitoring-2** | Live metric stream with a threshold | 63 | 164 | [`capsule.html`](./monitoring/monitoring-2/capsule.html) · [`component.css`](./monitoring/monitoring-2/component.css) · [`decompiled-spec.json`](./monitoring/monitoring-2/decompiled-spec.json) · [`README.md`](./monitoring/monitoring-2/README.md) |
| **monitoring-3** | Incident detail with a response timeline | 147 | 200 | [`capsule.html`](./monitoring/monitoring-3/capsule.html) · [`component.css`](./monitoring/monitoring-3/component.css) · [`decompiled-spec.json`](./monitoring/monitoring-3/decompiled-spec.json) · [`README.md`](./monitoring/monitoring-3/README.md) |
| **monitoring-4** | Alert inbox with silencing | 177 | 212 | [`capsule.html`](./monitoring/monitoring-4/capsule.html) · [`component.css`](./monitoring/monitoring-4/component.css) · [`decompiled-spec.json`](./monitoring/monitoring-4/decompiled-spec.json) · [`README.md`](./monitoring/monitoring-4/README.md) |
| **monitoring-5** | Live log tail with level filters | 203 | 219 | [`capsule.html`](./monitoring/monitoring-5/capsule.html) · [`component.css`](./monitoring/monitoring-5/component.css) · [`decompiled-spec.json`](./monitoring/monitoring-5/decompiled-spec.json) · [`README.md`](./monitoring/monitoring-5/README.md) |
| **monitoring-6** | Uptime grid with daily status bars | 644 | 154 | [`capsule.html`](./monitoring/monitoring-6/capsule.html) · [`component.css`](./monitoring/monitoring-6/component.css) · [`decompiled-spec.json`](./monitoring/monitoring-6/decompiled-spec.json) · [`README.md`](./monitoring/monitoring-6/README.md) |
| **monitoring-7** | Fleet table with utilization meters | 322 | 220 | [`capsule.html`](./monitoring/monitoring-7/capsule.html) · [`component.css`](./monitoring/monitoring-7/component.css) · [`decompiled-spec.json`](./monitoring/monitoring-7/decompiled-spec.json) · [`README.md`](./monitoring/monitoring-7/README.md) |
| **monitoring-8** | Response times with a latency histogram | 187 | 154 | [`capsule.html`](./monitoring/monitoring-8/capsule.html) · [`component.css`](./monitoring/monitoring-8/component.css) · [`decompiled-spec.json`](./monitoring/monitoring-8/decompiled-spec.json) · [`README.md`](./monitoring/monitoring-8/README.md) |
| **monitoring-9** | Live run queue grouped by state | 367 | 223 | [`capsule.html`](./monitoring/monitoring-9/capsule.html) · [`component.css`](./monitoring/monitoring-9/component.css) · [`decompiled-spec.json`](./monitoring/monitoring-9/decompiled-spec.json) · [`README.md`](./monitoring/monitoring-9/README.md) |
| **monitoring-10** | Error budgets with a burn-down chart | 116 | 165 | [`capsule.html`](./monitoring/monitoring-10/capsule.html) · [`component.css`](./monitoring/monitoring-10/component.css) · [`decompiled-spec.json`](./monitoring/monitoring-10/decompiled-spec.json) · [`README.md`](./monitoring/monitoring-10/README.md) |

<a id="category-empty-state"></a>
### Empty State (`empty-state/`) — Forms, Modals, Auth & Workflows

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **empty-state-1** | First-run workspace with starting paths | 79 | 146 | [`capsule.html`](./empty-state/empty-state-1/capsule.html) · [`component.css`](./empty-state/empty-state-1/component.css) · [`decompiled-spec.json`](./empty-state/empty-state-1/decompiled-spec.json) · [`README.md`](./empty-state/empty-state-1/README.md) |
| **empty-state-2** | No results with suggested searches | 65 | 163 | [`capsule.html`](./empty-state/empty-state-2/capsule.html) · [`component.css`](./empty-state/empty-state-2/component.css) · [`decompiled-spec.json`](./empty-state/empty-state-2/decompiled-spec.json) · [`README.md`](./empty-state/empty-state-2/README.md) |
| **empty-state-3** | All caught up summary | 48 | 98 | [`capsule.html`](./empty-state/empty-state-3/capsule.html) · [`component.css`](./empty-state/empty-state-3/component.css) · [`decompiled-spec.json`](./empty-state/empty-state-3/decompiled-spec.json) · [`README.md`](./empty-state/empty-state-3/README.md) |
| **empty-state-4** | Load failure with a retry | 36 | 124 | [`capsule.html`](./empty-state/empty-state-4/capsule.html) · [`component.css`](./empty-state/empty-state-4/component.css) · [`decompiled-spec.json`](./empty-state/empty-state-4/decompiled-spec.json) · [`README.md`](./empty-state/empty-state-4/README.md) |
| **empty-state-5** | Empty folder dropzone | 37 | 126 | [`capsule.html`](./empty-state/empty-state-5/capsule.html) · [`component.css`](./empty-state/empty-state-5/component.css) · [`decompiled-spec.json`](./empty-state/empty-state-5/decompiled-spec.json) · [`README.md`](./empty-state/empty-state-5/README.md) |

<a id="category-settings-form"></a>
### Settings Form (`settings-form/`) — Forms, Modals, Auth & Workflows

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **settings-form-1** | Settings page with a sticky save bar | 113 | 243 | [`capsule.html`](./settings-form/settings-form-1/capsule.html) · [`component.css`](./settings-form/settings-form-1/component.css) · [`decompiled-spec.json`](./settings-form/settings-form-1/decompiled-spec.json) · [`README.md`](./settings-form/settings-form-1/README.md) |
| **settings-form-2** | Profile form with avatar upload | 87 | 219 | [`capsule.html`](./settings-form/settings-form-2/capsule.html) · [`component.css`](./settings-form/settings-form-2/component.css) · [`decompiled-spec.json`](./settings-form/settings-form-2/decompiled-spec.json) · [`README.md`](./settings-form/settings-form-2/README.md) |
| **settings-form-3** | Preferences with switches and radios | 98 | 231 | [`capsule.html`](./settings-form/settings-form-3/capsule.html) · [`component.css`](./settings-form/settings-form-3/component.css) · [`decompiled-spec.json`](./settings-form/settings-form-3/decompiled-spec.json) · [`README.md`](./settings-form/settings-form-3/README.md) |
| **settings-form-4** | Team members with role selects | 160 | 203 | [`capsule.html`](./settings-form/settings-form-4/capsule.html) · [`component.css`](./settings-form/settings-form-4/component.css) · [`decompiled-spec.json`](./settings-form/settings-form-4/decompiled-spec.json) · [`README.md`](./settings-form/settings-form-4/README.md) |
| **settings-form-5** | API keys with reveal and rotate | 112 | 194 | [`capsule.html`](./settings-form/settings-form-5/capsule.html) · [`component.css`](./settings-form/settings-form-5/component.css) · [`decompiled-spec.json`](./settings-form/settings-form-5/decompiled-spec.json) · [`README.md`](./settings-form/settings-form-5/README.md) |
| **settings-form-6** | Danger zone with confirmations | 58 | 181 | [`capsule.html`](./settings-form/settings-form-6/capsule.html) · [`component.css`](./settings-form/settings-form-6/component.css) · [`decompiled-spec.json`](./settings-form/settings-form-6/decompiled-spec.json) · [`README.md`](./settings-form/settings-form-6/README.md) |

<a id="category-forms"></a>
### Forms (`forms/`) — Forms, Modals, Auth & Workflows

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **forms-1** | Record form with a completion meter | 152 | 252 | [`capsule.html`](./forms/forms-1/capsule.html) · [`component.css`](./forms/forms-1/component.css) · [`decompiled-spec.json`](./forms/forms-1/decompiled-spec.json) · [`README.md`](./forms/forms-1/README.md) |
| **forms-2** | Two-column form with radio cards | 174 | 217 | [`capsule.html`](./forms/forms-2/capsule.html) · [`component.css`](./forms/forms-2/component.css) · [`decompiled-spec.json`](./forms/forms-2/decompiled-spec.json) · [`README.md`](./forms/forms-2/README.md) |
| **forms-3** | Booking form with a line items table | 272 | 230 | [`capsule.html`](./forms/forms-3/capsule.html) · [`component.css`](./forms/forms-3/component.css) · [`decompiled-spec.json`](./forms/forms-3/decompiled-spec.json) · [`README.md`](./forms/forms-3/README.md) |
| **forms-4** | Inline edit property panel | 145 | 148 | [`capsule.html`](./forms/forms-4/capsule.html) · [`component.css`](./forms/forms-4/component.css) · [`decompiled-spec.json`](./forms/forms-4/decompiled-spec.json) · [`README.md`](./forms/forms-4/README.md) |
| **forms-5** | Provisioning form with live checks | 133 | 231 | [`capsule.html`](./forms/forms-5/capsule.html) · [`component.css`](./forms/forms-5/component.css) · [`decompiled-spec.json`](./forms/forms-5/decompiled-spec.json) · [`README.md`](./forms/forms-5/README.md) |
| **forms-6** | Checkout form with an order summary | 224 | 238 | [`capsule.html`](./forms/forms-6/capsule.html) · [`component.css`](./forms/forms-6/component.css) · [`decompiled-spec.json`](./forms/forms-6/decompiled-spec.json) · [`README.md`](./forms/forms-6/README.md) |
| **forms-7** | Application form with a dropzone | 130 | 273 | [`capsule.html`](./forms/forms-7/capsule.html) · [`component.css`](./forms/forms-7/component.css) · [`decompiled-spec.json`](./forms/forms-7/decompiled-spec.json) · [`README.md`](./forms/forms-7/README.md) |
| **forms-8** | Rule builder with a live test | 146 | 210 | [`capsule.html`](./forms/forms-8/capsule.html) · [`component.css`](./forms/forms-8/component.css) · [`decompiled-spec.json`](./forms/forms-8/decompiled-spec.json) · [`README.md`](./forms/forms-8/README.md) |
| **forms-9** | Opening hours with per-day intervals | 368 | 213 | [`capsule.html`](./forms/forms-9/capsule.html) · [`component.css`](./forms/forms-9/component.css) · [`decompiled-spec.json`](./forms/forms-9/decompiled-spec.json) · [`README.md`](./forms/forms-9/README.md) |
| **forms-10** | Guest survey with a 0 to 10 scale | 173 | 236 | [`capsule.html`](./forms/forms-10/capsule.html) · [`component.css`](./forms/forms-10/component.css) · [`decompiled-spec.json`](./forms/forms-10/decompiled-spec.json) · [`README.md`](./forms/forms-10/README.md) |
| **forms-11** | Create environment dialog | 69 | 264 | [`capsule.html`](./forms/forms-11/capsule.html) · [`component.css`](./forms/forms-11/component.css) · [`decompiled-spec.json`](./forms/forms-11/decompiled-spec.json) · [`README.md`](./forms/forms-11/README.md) |
| **forms-12** | Quote review with a premium summary | 130 | 164 | [`capsule.html`](./forms/forms-12/capsule.html) · [`component.css`](./forms/forms-12/component.css) · [`decompiled-spec.json`](./forms/forms-12/decompiled-spec.json) · [`README.md`](./forms/forms-12/README.md) |

<a id="category-app-dialog"></a>
### App Dialog (`app-dialog/`) — Forms, Modals, Auth & Workflows

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **app-dialog-1** | Standard dialog with a footer | 57 | 164 | [`capsule.html`](./app-dialog/app-dialog-1/capsule.html) · [`component.css`](./app-dialog/app-dialog-1/component.css) · [`decompiled-spec.json`](./app-dialog/app-dialog-1/decompiled-spec.json) · [`README.md`](./app-dialog/app-dialog-1/README.md) |
| **app-dialog-2** | Delete confirmation by typing the name | 40 | 195 | [`capsule.html`](./app-dialog/app-dialog-2/capsule.html) · [`component.css`](./app-dialog/app-dialog-2/component.css) · [`decompiled-spec.json`](./app-dialog/app-dialog-2/decompiled-spec.json) · [`README.md`](./app-dialog/app-dialog-2/README.md) |
| **app-dialog-3** | Form dialog with validation | 44 | 208 | [`capsule.html`](./app-dialog/app-dialog-3/capsule.html) · [`component.css`](./app-dialog/app-dialog-3/component.css) · [`decompiled-spec.json`](./app-dialog/app-dialog-3/decompiled-spec.json) · [`README.md`](./app-dialog/app-dialog-3/README.md) |
| **app-dialog-4** | Multi-step dialog with progress | 40 | 202 | [`capsule.html`](./app-dialog/app-dialog-4/capsule.html) · [`component.css`](./app-dialog/app-dialog-4/component.css) · [`decompiled-spec.json`](./app-dialog/app-dialog-4/decompiled-spec.json) · [`README.md`](./app-dialog/app-dialog-4/README.md) |
| **app-dialog-5** | Side drawer with an unsaved guard | 48 | 251 | [`capsule.html`](./app-dialog/app-dialog-5/capsule.html) · [`component.css`](./app-dialog/app-dialog-5/component.css) · [`decompiled-spec.json`](./app-dialog/app-dialog-5/decompiled-spec.json) · [`README.md`](./app-dialog/app-dialog-5/README.md) |
| **app-dialog-6** | Detail sheet with metadata | 77 | 176 | [`capsule.html`](./app-dialog/app-dialog-6/capsule.html) · [`component.css`](./app-dialog/app-dialog-6/component.css) · [`decompiled-spec.json`](./app-dialog/app-dialog-6/decompiled-spec.json) · [`README.md`](./app-dialog/app-dialog-6/README.md) |
| **app-dialog-7** | Menus, submenus and shortcuts | 58 | 134 | [`capsule.html`](./app-dialog/app-dialog-7/capsule.html) · [`component.css`](./app-dialog/app-dialog-7/component.css) · [`decompiled-spec.json`](./app-dialog/app-dialog-7/decompiled-spec.json) · [`README.md`](./app-dialog/app-dialog-7/README.md) |

<a id="category-notifications"></a>
### Notifications (`notifications/`) — Forms, Modals, Auth & Workflows

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **notifications-1** | Notification center grouped by day | 202 | 161 | [`capsule.html`](./notifications/notifications-1/capsule.html) · [`component.css`](./notifications/notifications-1/component.css) · [`decompiled-spec.json`](./notifications/notifications-1/decompiled-spec.json) · [`README.md`](./notifications/notifications-1/README.md) |
| **notifications-2** | Toast stack that expands on hover | 32 | 101 | [`capsule.html`](./notifications/notifications-2/capsule.html) · [`component.css`](./notifications/notifications-2/component.css) · [`decompiled-spec.json`](./notifications/notifications-2/decompiled-spec.json) · [`README.md`](./notifications/notifications-2/README.md) |
| **notifications-3** | Delivery preferences with quiet hours | 173 | 183 | [`capsule.html`](./notifications/notifications-3/capsule.html) · [`component.css`](./notifications/notifications-3/component.css) · [`decompiled-spec.json`](./notifications/notifications-3/decompiled-spec.json) · [`README.md`](./notifications/notifications-3/README.md) |
| **notifications-4** | Activity inbox with a detail pane | 100 | 177 | [`capsule.html`](./notifications/notifications-4/capsule.html) · [`component.css`](./notifications/notifications-4/component.css) · [`decompiled-spec.json`](./notifications/notifications-4/decompiled-spec.json) · [`README.md`](./notifications/notifications-4/README.md) |
| **notifications-5** | Inline banners for every status | 99 | 151 | [`capsule.html`](./notifications/notifications-5/capsule.html) · [`component.css`](./notifications/notifications-5/component.css) · [`decompiled-spec.json`](./notifications/notifications-5/decompiled-spec.json) · [`README.md`](./notifications/notifications-5/README.md) |
| **notifications-6** | Bell with a notifications popover | 29 | 106 | [`capsule.html`](./notifications/notifications-6/capsule.html) · [`component.css`](./notifications/notifications-6/component.css) · [`decompiled-spec.json`](./notifications/notifications-6/decompiled-spec.json) · [`README.md`](./notifications/notifications-6/README.md) |

<a id="category-onboarding"></a>
### Onboarding (`onboarding/`) — Forms, Modals, Auth & Workflows

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **onboarding-1** | Profile setup with a live preview | 60 | 206 | [`capsule.html`](./onboarding/onboarding-1/capsule.html) · [`component.css`](./onboarding/onboarding-1/component.css) · [`decompiled-spec.json`](./onboarding/onboarding-1/decompiled-spec.json) · [`README.md`](./onboarding/onboarding-1/README.md) |
| **onboarding-2** | Six-step vertical stepper | 65 | 157 | [`capsule.html`](./onboarding/onboarding-2/capsule.html) · [`component.css`](./onboarding/onboarding-2/component.css) · [`decompiled-spec.json`](./onboarding/onboarding-2/decompiled-spec.json) · [`README.md`](./onboarding/onboarding-2/README.md) |
| **onboarding-3** | Getting started checklist with progress | 82 | 139 | [`capsule.html`](./onboarding/onboarding-3/capsule.html) · [`component.css`](./onboarding/onboarding-3/component.css) · [`decompiled-spec.json`](./onboarding/onboarding-3/decompiled-spec.json) · [`README.md`](./onboarding/onboarding-3/README.md) |
| **onboarding-4** | Use case picker with option tiles | 46 | 160 | [`capsule.html`](./onboarding/onboarding-4/capsule.html) · [`component.css`](./onboarding/onboarding-4/component.css) · [`decompiled-spec.json`](./onboarding/onboarding-4/decompiled-spec.json) · [`README.md`](./onboarding/onboarding-4/README.md) |
| **onboarding-5** | Invite teammates with role selects | 55 | 168 | [`capsule.html`](./onboarding/onboarding-5/capsule.html) · [`component.css`](./onboarding/onboarding-5/component.css) · [`decompiled-spec.json`](./onboarding/onboarding-5/decompiled-spec.json) · [`README.md`](./onboarding/onboarding-5/README.md) |
| **onboarding-6** | Setup complete summary with next steps | 28 | 107 | [`capsule.html`](./onboarding/onboarding-6/capsule.html) · [`component.css`](./onboarding/onboarding-6/component.css) · [`decompiled-spec.json`](./onboarding/onboarding-6/decompiled-spec.json) · [`README.md`](./onboarding/onboarding-6/README.md) |
| **onboarding-7** | Top stepper with a workspace form | 61 | 213 | [`capsule.html`](./onboarding/onboarding-7/capsule.html) · [`component.css`](./onboarding/onboarding-7/component.css) · [`decompiled-spec.json`](./onboarding/onboarding-7/decompiled-spec.json) · [`README.md`](./onboarding/onboarding-7/README.md) |

<a id="category-paywall"></a>
### Paywall (`paywall/`) — Forms, Modals, Auth & Workflows

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **paywall-1** | Article lock with a membership card | 35 | 119 | [`capsule.html`](./paywall/paywall-1/capsule.html) · [`component.css`](./paywall/paywall-1/component.css) · [`decompiled-spec.json`](./paywall/paywall-1/decompiled-spec.json) · [`README.md`](./paywall/paywall-1/README.md) |
| **paywall-2** | Feature gate dialog | 46 | 155 | [`capsule.html`](./paywall/paywall-2/capsule.html) · [`component.css`](./paywall/paywall-2/component.css) · [`decompiled-spec.json`](./paywall/paywall-2/decompiled-spec.json) · [`README.md`](./paywall/paywall-2/README.md) |
| **paywall-3** | Three-plan comparison with a toggle | 88 | 171 | [`capsule.html`](./paywall/paywall-3/capsule.html) · [`component.css`](./paywall/paywall-3/component.css) · [`decompiled-spec.json`](./paywall/paywall-3/decompiled-spec.json) · [`README.md`](./paywall/paywall-3/README.md) |
| **paywall-4** | Usage cap notice with meters | 40 | 114 | [`capsule.html`](./paywall/paywall-4/capsule.html) · [`component.css`](./paywall/paywall-4/component.css) · [`decompiled-spec.json`](./paywall/paywall-4/decompiled-spec.json) · [`README.md`](./paywall/paywall-4/README.md) |
| **paywall-5** | Trial expired reactivation card | 36 | 105 | [`capsule.html`](./paywall/paywall-5/capsule.html) · [`component.css`](./paywall/paywall-5/component.css) · [`decompiled-spec.json`](./paywall/paywall-5/decompiled-spec.json) · [`README.md`](./paywall/paywall-5/README.md) |
| **paywall-6** | Metered reads counter | 23 | 135 | [`capsule.html`](./paywall/paywall-6/capsule.html) · [`component.css`](./paywall/paywall-6/component.css) · [`decompiled-spec.json`](./paywall/paywall-6/decompiled-spec.json) · [`README.md`](./paywall/paywall-6/README.md) |
| **paywall-7** | Seat gate that asks the admins | 43 | 142 | [`capsule.html`](./paywall/paywall-7/capsule.html) · [`component.css`](./paywall/paywall-7/component.css) · [`decompiled-spec.json`](./paywall/paywall-7/decompiled-spec.json) · [`README.md`](./paywall/paywall-7/README.md) |

<a id="category-authentication"></a>
### Authentication (`authentication/`) — Forms, Modals, Auth & Workflows

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **authentication-1** | Sign-in card with provider buttons | 55 | 192 | [`capsule.html`](./authentication/authentication-1/capsule.html) · [`component.css`](./authentication/authentication-1/component.css) · [`decompiled-spec.json`](./authentication/authentication-1/decompiled-spec.json) · [`README.md`](./authentication/authentication-1/README.md) |
| **authentication-2** | Provider-first sign-in with SSO | 46 | 152 | [`capsule.html`](./authentication/authentication-2/capsule.html) · [`component.css`](./authentication/authentication-2/component.css) · [`decompiled-spec.json`](./authentication/authentication-2/decompiled-spec.json) · [`README.md`](./authentication/authentication-2/README.md) |
| **authentication-3** | Split sign-in with a customer quote | 82 | 187 | [`capsule.html`](./authentication/authentication-3/capsule.html) · [`component.css`](./authentication/authentication-3/component.css) · [`decompiled-spec.json`](./authentication/authentication-3/decompiled-spec.json) · [`README.md`](./authentication/authentication-3/README.md) |
| **authentication-4** | Two-step email then password | 24 | 142 | [`capsule.html`](./authentication/authentication-4/capsule.html) · [`component.css`](./authentication/authentication-4/component.css) · [`decompiled-spec.json`](./authentication/authentication-4/decompiled-spec.json) · [`README.md`](./authentication/authentication-4/README.md) |
| **authentication-5** | Magic link sent confirmation | 39 | 114 | [`capsule.html`](./authentication/authentication-5/capsule.html) · [`component.css`](./authentication/authentication-5/component.css) · [`decompiled-spec.json`](./authentication/authentication-5/decompiled-spec.json) · [`README.md`](./authentication/authentication-5/README.md) |
| **authentication-6** | Six-digit code entry | 41 | 153 | [`capsule.html`](./authentication/authentication-6/capsule.html) · [`component.css`](./authentication/authentication-6/component.css) · [`decompiled-spec.json`](./authentication/authentication-6/decompiled-spec.json) · [`README.md`](./authentication/authentication-6/README.md) |
| **authentication-7** | Sign-up with a password strength meter | 61 | 186 | [`capsule.html`](./authentication/authentication-7/capsule.html) · [`component.css`](./authentication/authentication-7/component.css) · [`decompiled-spec.json`](./authentication/authentication-7/decompiled-spec.json) · [`README.md`](./authentication/authentication-7/README.md) |
| **authentication-8** | Enterprise SSO by email domain | 76 | 160 | [`capsule.html`](./authentication/authentication-8/capsule.html) · [`component.css`](./authentication/authentication-8/component.css) · [`decompiled-spec.json`](./authentication/authentication-8/decompiled-spec.json) · [`README.md`](./authentication/authentication-8/README.md) |
| **authentication-9** | Passkey sign-in with fallbacks | 70 | 133 | [`capsule.html`](./authentication/authentication-9/capsule.html) · [`component.css`](./authentication/authentication-9/component.css) · [`decompiled-spec.json`](./authentication/authentication-9/decompiled-spec.json) · [`README.md`](./authentication/authentication-9/README.md) |
| **authentication-10** | Account chooser | 55 | 119 | [`capsule.html`](./authentication/authentication-10/capsule.html) · [`component.css`](./authentication/authentication-10/component.css) · [`decompiled-spec.json`](./authentication/authentication-10/decompiled-spec.json) · [`README.md`](./authentication/authentication-10/README.md) |
| **authentication-11** | Workspace picker with invitations | 93 | 182 | [`capsule.html`](./authentication/authentication-11/capsule.html) · [`component.css`](./authentication/authentication-11/component.css) · [`decompiled-spec.json`](./authentication/authentication-11/decompiled-spec.json) · [`README.md`](./authentication/authentication-11/README.md) |
| **authentication-12** | Invitation acceptance screen | 95 | 190 | [`capsule.html`](./authentication/authentication-12/capsule.html) · [`component.css`](./authentication/authentication-12/component.css) · [`decompiled-spec.json`](./authentication/authentication-12/decompiled-spec.json) · [`README.md`](./authentication/authentication-12/README.md) |
| **authentication-13** | Password reset with session list | 91 | 192 | [`capsule.html`](./authentication/authentication-13/capsule.html) · [`component.css`](./authentication/authentication-13/component.css) · [`decompiled-spec.json`](./authentication/authentication-13/decompiled-spec.json) · [`README.md`](./authentication/authentication-13/README.md) |
| **authentication-14** | Sign-in approval challenge | 61 | 121 | [`capsule.html`](./authentication/authentication-14/capsule.html) · [`component.css`](./authentication/authentication-14/component.css) · [`decompiled-spec.json`](./authentication/authentication-14/decompiled-spec.json) · [`README.md`](./authentication/authentication-14/README.md) |

<a id="category-kanban"></a>
### Kanban (`kanban/`) — Forms, Modals, Auth & Workflows

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **kanban-1** | Drag and drop board with WIP limits | 287 | 126 | [`capsule.html`](./kanban/kanban-1/capsule.html) · [`component.css`](./kanban/kanban-1/component.css) · [`decompiled-spec.json`](./kanban/kanban-1/decompiled-spec.json) · [`README.md`](./kanban/kanban-1/README.md) |
| **kanban-2** | Swimlane board with collapsible lanes | 225 | 149 | [`capsule.html`](./kanban/kanban-2/capsule.html) · [`component.css`](./kanban/kanban-2/component.css) · [`decompiled-spec.json`](./kanban/kanban-2/decompiled-spec.json) · [`README.md`](./kanban/kanban-2/README.md) |
| **kanban-3** | Regroupable board by status or owner | 194 | 135 | [`capsule.html`](./kanban/kanban-3/capsule.html) · [`component.css`](./kanban/kanban-3/component.css) · [`decompiled-spec.json`](./kanban/kanban-3/decompiled-spec.json) · [`README.md`](./kanban/kanban-3/README.md) |
| **kanban-4** | Board with a card detail side panel | 215 | 165 | [`capsule.html`](./kanban/kanban-4/capsule.html) · [`component.css`](./kanban/kanban-4/component.css) · [`decompiled-spec.json`](./kanban/kanban-4/decompiled-spec.json) · [`README.md`](./kanban/kanban-4/README.md) |
| **kanban-5** | Sprint board with capacity meters | 231 | 137 | [`capsule.html`](./kanban/kanban-5/capsule.html) · [`component.css`](./kanban/kanban-5/component.css) · [`decompiled-spec.json`](./kanban/kanban-5/decompiled-spec.json) · [`README.md`](./kanban/kanban-5/README.md) |
| **kanban-6** | Compact task board for small screens | 293 | 153 | [`capsule.html`](./kanban/kanban-6/capsule.html) · [`component.css`](./kanban/kanban-6/component.css) · [`decompiled-spec.json`](./kanban/kanban-6/decompiled-spec.json) · [`README.md`](./kanban/kanban-6/README.md) |

<a id="category-wizard"></a>
### Wizard (`wizard/`) — Forms, Modals, Auth & Workflows

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **wizard-1** | Card wizard with a two-column form | 81 | 182 | [`capsule.html`](./wizard/wizard-1/capsule.html) · [`component.css`](./wizard/wizard-1/component.css) · [`decompiled-spec.json`](./wizard/wizard-1/decompiled-spec.json) · [`README.md`](./wizard/wizard-1/README.md) |
| **wizard-2** | Full-screen wizard with a progress bar | 128 | 211 | [`capsule.html`](./wizard/wizard-2/capsule.html) · [`component.css`](./wizard/wizard-2/component.css) · [`decompiled-spec.json`](./wizard/wizard-2/decompiled-spec.json) · [`README.md`](./wizard/wizard-2/README.md) |
| **wizard-3** | Plan step with an invoice preview | 106 | 165 | [`capsule.html`](./wizard/wizard-3/capsule.html) · [`component.css`](./wizard/wizard-3/component.css) · [`decompiled-spec.json`](./wizard/wizard-3/decompiled-spec.json) · [`README.md`](./wizard/wizard-3/README.md) |
| **wizard-4** | Service picker with a live summary | 164 | 176 | [`capsule.html`](./wizard/wizard-4/capsule.html) · [`component.css`](./wizard/wizard-4/component.css) · [`decompiled-spec.json`](./wizard/wizard-4/decompiled-spec.json) · [`README.md`](./wizard/wizard-4/README.md) |
| **wizard-5** | Review and confirm step | 99 | 154 | [`capsule.html`](./wizard/wizard-5/capsule.html) · [`component.css`](./wizard/wizard-5/component.css) · [`decompiled-spec.json`](./wizard/wizard-5/decompiled-spec.json) · [`README.md`](./wizard/wizard-5/README.md) |
| **wizard-6** | Running step with per-task states | 66 | 120 | [`capsule.html`](./wizard/wizard-6/capsule.html) · [`component.css`](./wizard/wizard-6/component.css) · [`decompiled-spec.json`](./wizard/wizard-6/decompiled-spec.json) · [`README.md`](./wizard/wizard-6/README.md) |
| **wizard-7** | Modal wizard with one question per step | 46 | 143 | [`capsule.html`](./wizard/wizard-7/capsule.html) · [`component.css`](./wizard/wizard-7/component.css) · [`decompiled-spec.json`](./wizard/wizard-7/decompiled-spec.json) · [`README.md`](./wizard/wizard-7/README.md) |

<a id="category-billing"></a>
### Billing (`billing/`) — Forms, Modals, Auth & Workflows

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **billing-1** | Billing overview with an invoice ledger | 262 | 227 | [`capsule.html`](./billing/billing-1/capsule.html) · [`component.css`](./billing/billing-1/component.css) · [`decompiled-spec.json`](./billing/billing-1/decompiled-spec.json) · [`README.md`](./billing/billing-1/README.md) |
| **billing-2** | Plan manager with entitlement cards | 270 | 188 | [`capsule.html`](./billing/billing-2/capsule.html) · [`component.css`](./billing/billing-2/component.css) · [`decompiled-spec.json`](./billing/billing-2/decompiled-spec.json) · [`README.md`](./billing/billing-2/README.md) |
| **billing-3** | New invoice wizard | 154 | 218 | [`capsule.html`](./billing/billing-3/capsule.html) · [`component.css`](./billing/billing-3/component.css) · [`decompiled-spec.json`](./billing/billing-3/decompiled-spec.json) · [`README.md`](./billing/billing-3/README.md) |
| **billing-4** | Failed payment recovery queue | 355 | 216 | [`capsule.html`](./billing/billing-4/capsule.html) · [`component.css`](./billing/billing-4/component.css) · [`decompiled-spec.json`](./billing/billing-4/decompiled-spec.json) · [`README.md`](./billing/billing-4/README.md) |
| **billing-5** | Change plan with a proration preview | 121 | 190 | [`capsule.html`](./billing/billing-5/capsule.html) · [`component.css`](./billing/billing-5/component.css) · [`decompiled-spec.json`](./billing/billing-5/decompiled-spec.json) · [`README.md`](./billing/billing-5/README.md) |
| **billing-6** | Payment methods and billing contacts | 143 | 172 | [`capsule.html`](./billing/billing-6/capsule.html) · [`component.css`](./billing/billing-6/component.css) · [`decompiled-spec.json`](./billing/billing-6/decompiled-spec.json) · [`README.md`](./billing/billing-6/README.md) |
| **billing-7** | Usage and overage with allowances | 111 | 177 | [`capsule.html`](./billing/billing-7/capsule.html) · [`component.css`](./billing/billing-7/component.css) · [`decompiled-spec.json`](./billing/billing-7/decompiled-spec.json) · [`README.md`](./billing/billing-7/README.md) |
| **billing-8** | Invoice detail with a timeline | 176 | 178 | [`capsule.html`](./billing/billing-8/capsule.html) · [`component.css`](./billing/billing-8/component.css) · [`decompiled-spec.json`](./billing/billing-8/decompiled-spec.json) · [`README.md`](./billing/billing-8/README.md) |

<a id="category-comments"></a>
### Comments (`comments/`) — Collaboration, Content & Support

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **comments-1** | Threaded comments with reactions | 115 | 197 | [`capsule.html`](./comments/comments-1/capsule.html) · [`component.css`](./comments/comments-1/component.css) · [`decompiled-spec.json`](./comments/comments-1/decompiled-spec.json) · [`README.md`](./comments/comments-1/README.md) |
| **comments-2** | Inline annotations with a comments rail | 88 | 159 | [`capsule.html`](./comments/comments-2/capsule.html) · [`component.css`](./comments/comments-2/component.css) · [`decompiled-spec.json`](./comments/comments-2/decompiled-spec.json) · [`README.md`](./comments/comments-2/README.md) |
| **comments-3** | Code review thread with a diff | 87 | 188 | [`capsule.html`](./comments/comments-3/capsule.html) · [`component.css`](./comments/comments-3/component.css) · [`decompiled-spec.json`](./comments/comments-3/decompiled-spec.json) · [`README.md`](./comments/comments-3/README.md) |
| **comments-4** | Comment composer with @ mentions | 125 | 206 | [`capsule.html`](./comments/comments-4/capsule.html) · [`component.css`](./comments/comments-4/component.css) · [`decompiled-spec.json`](./comments/comments-4/decompiled-spec.json) · [`README.md`](./comments/comments-4/README.md) |
| **comments-5** | Comment inbox with resolve actions | 95 | 143 | [`capsule.html`](./comments/comments-5/capsule.html) · [`component.css`](./comments/comments-5/component.css) · [`decompiled-spec.json`](./comments/comments-5/decompiled-spec.json) · [`README.md`](./comments/comments-5/README.md) |
| **comments-6** | Canvas pins linked to a notes rail | 89 | 222 | [`capsule.html`](./comments/comments-6/capsule.html) · [`component.css`](./comments/comments-6/component.css) · [`decompiled-spec.json`](./comments/comments-6/decompiled-spec.json) · [`README.md`](./comments/comments-6/README.md) |

<a id="category-scheduling"></a>
### Scheduling (`scheduling/`) — Collaboration, Content & Support

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **scheduling-1** | Month calendar beside a day agenda | 232 | 181 | [`capsule.html`](./scheduling/scheduling-1/capsule.html) · [`component.css`](./scheduling/scheduling-1/component.css) · [`decompiled-spec.json`](./scheduling/scheduling-1/decompiled-spec.json) · [`README.md`](./scheduling/scheduling-1/README.md) |
| **scheduling-2** | Compact time range picker | 53 | 171 | [`capsule.html`](./scheduling/scheduling-2/capsule.html) · [`component.css`](./scheduling/scheduling-2/component.css) · [`decompiled-spec.json`](./scheduling/scheduling-2/decompiled-spec.json) · [`README.md`](./scheduling/scheduling-2/README.md) |
| **scheduling-3** | New schedule form with attendees | 78 | 225 | [`capsule.html`](./scheduling/scheduling-3/capsule.html) · [`component.css`](./scheduling/scheduling-3/component.css) · [`decompiled-spec.json`](./scheduling/scheduling-3/decompiled-spec.json) · [`README.md`](./scheduling/scheduling-3/README.md) |
| **scheduling-4** | Deadline picker with quick presets | 142 | 170 | [`capsule.html`](./scheduling/scheduling-4/capsule.html) · [`component.css`](./scheduling/scheduling-4/component.css) · [`decompiled-spec.json`](./scheduling/scheduling-4/decompiled-spec.json) · [`README.md`](./scheduling/scheduling-4/README.md) |
| **scheduling-5** | Weekly availability editor | 336 | 168 | [`capsule.html`](./scheduling/scheduling-5/capsule.html) · [`component.css`](./scheduling/scheduling-5/component.css) · [`decompiled-spec.json`](./scheduling/scheduling-5/decompiled-spec.json) · [`README.md`](./scheduling/scheduling-5/README.md) |
| **scheduling-6** | Week timeline with an hour rail | 173 | 183 | [`capsule.html`](./scheduling/scheduling-6/capsule.html) · [`component.css`](./scheduling/scheduling-6/component.css) · [`decompiled-spec.json`](./scheduling/scheduling-6/decompiled-spec.json) · [`README.md`](./scheduling/scheduling-6/README.md) |
| **scheduling-7** | Booking page with a time slot grid | 95 | 155 | [`capsule.html`](./scheduling/scheduling-7/capsule.html) · [`component.css`](./scheduling/scheduling-7/component.css) · [`decompiled-spec.json`](./scheduling/scheduling-7/decompiled-spec.json) · [`README.md`](./scheduling/scheduling-7/README.md) |

<a id="category-integrations"></a>
### Integrations (`integrations/`) — Collaboration, Content & Support

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **integrations-1** | Integration marketplace grid | 137 | 175 | [`capsule.html`](./integrations/integrations-1/capsule.html) · [`component.css`](./integrations/integrations-1/component.css) · [`decompiled-spec.json`](./integrations/integrations-1/decompiled-spec.json) · [`README.md`](./integrations/integrations-1/README.md) |
| **integrations-2** | Connection detail with scopes | 93 | 166 | [`capsule.html`](./integrations/integrations-2/capsule.html) · [`component.css`](./integrations/integrations-2/component.css) · [`decompiled-spec.json`](./integrations/integrations-2/decompiled-spec.json) · [`README.md`](./integrations/integrations-2/README.md) |
| **integrations-3** | API key table with row actions | 195 | 200 | [`capsule.html`](./integrations/integrations-3/capsule.html) · [`component.css`](./integrations/integrations-3/component.css) · [`decompiled-spec.json`](./integrations/integrations-3/decompiled-spec.json) · [`README.md`](./integrations/integrations-3/README.md) |
| **integrations-4** | Webhooks with a delivery log | 103 | 165 | [`capsule.html`](./integrations/integrations-4/capsule.html) · [`component.css`](./integrations/integrations-4/component.css) · [`decompiled-spec.json`](./integrations/integrations-4/decompiled-spec.json) · [`README.md`](./integrations/integrations-4/README.md) |
| **integrations-5** | OAuth consent screen | 57 | 142 | [`capsule.html`](./integrations/integrations-5/capsule.html) · [`component.css`](./integrations/integrations-5/component.css) · [`decompiled-spec.json`](./integrations/integrations-5/decompiled-spec.json) · [`README.md`](./integrations/integrations-5/README.md) |
| **integrations-6** | Sync status with per-source progress | 145 | 153 | [`capsule.html`](./integrations/integrations-6/capsule.html) · [`component.css`](./integrations/integrations-6/component.css) · [`decompiled-spec.json`](./integrations/integrations-6/decompiled-spec.json) · [`README.md`](./integrations/integrations-6/README.md) |

<a id="category-editor"></a>
### Editor (`editor/`) — Collaboration, Content & Support

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **editor-1** | Rich text editor with a toolbar | 64 | 142 | [`capsule.html`](./editor/editor-1/capsule.html) · [`component.css`](./editor/editor-1/component.css) · [`decompiled-spec.json`](./editor/editor-1/decompiled-spec.json) · [`README.md`](./editor/editor-1/README.md) |
| **editor-2** | Markdown with write and preview modes | 76 | 130 | [`capsule.html`](./editor/editor-2/capsule.html) · [`component.css`](./editor/editor-2/component.css) · [`decompiled-spec.json`](./editor/editor-2/decompiled-spec.json) · [`README.md`](./editor/editor-2/README.md) |
| **editor-3** | Code editor with tabs and a minimap | 438 | 157 | [`capsule.html`](./editor/editor-3/capsule.html) · [`component.css`](./editor/editor-3/component.css) · [`decompiled-spec.json`](./editor/editor-3/decompiled-spec.json) · [`README.md`](./editor/editor-3/README.md) |
| **editor-4** | Suggestion review side panel | 95 | 152 | [`capsule.html`](./editor/editor-4/capsule.html) · [`component.css`](./editor/editor-4/component.css) · [`decompiled-spec.json`](./editor/editor-4/decompiled-spec.json) · [`README.md`](./editor/editor-4/README.md) |
| **editor-5** | Long document reader with an outline | 71 | 137 | [`capsule.html`](./editor/editor-5/capsule.html) · [`component.css`](./editor/editor-5/component.css) · [`decompiled-spec.json`](./editor/editor-5/decompiled-spec.json) · [`README.md`](./editor/editor-5/README.md) |

<a id="category-feedback"></a>
### Feedback (`feedback/`) — Collaboration, Content & Support

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **feedback-1** | In-app feedback widget with screenshots | 45 | 164 | [`capsule.html`](./feedback/feedback-1/capsule.html) · [`component.css`](./feedback/feedback-1/component.css) · [`decompiled-spec.json`](./feedback/feedback-1/decompiled-spec.json) · [`README.md`](./feedback/feedback-1/README.md) |
| **feedback-2** | Eleven-point recommendation survey | 41 | 176 | [`capsule.html`](./feedback/feedback-2/capsule.html) · [`component.css`](./feedback/feedback-2/component.css) · [`decompiled-spec.json`](./feedback/feedback-2/decompiled-spec.json) · [`README.md`](./feedback/feedback-2/README.md) |
| **feedback-3** | Star rating with reason chips | 42 | 155 | [`capsule.html`](./feedback/feedback-3/capsule.html) · [`component.css`](./feedback/feedback-3/component.css) · [`decompiled-spec.json`](./feedback/feedback-3/decompiled-spec.json) · [`README.md`](./feedback/feedback-3/README.md) |
| **feedback-4** | Feature request board with votes | 113 | 191 | [`capsule.html`](./feedback/feedback-4/capsule.html) · [`component.css`](./feedback/feedback-4/component.css) · [`decompiled-spec.json`](./feedback/feedback-4/decompiled-spec.json) · [`README.md`](./feedback/feedback-4/README.md) |
| **feedback-5** | Feedback triage inbox | 160 | 189 | [`capsule.html`](./feedback/feedback-5/capsule.html) · [`component.css`](./feedback/feedback-5/component.css) · [`decompiled-spec.json`](./feedback/feedback-5/decompiled-spec.json) · [`README.md`](./feedback/feedback-5/README.md) |
| **feedback-6** | Insights with sentiment and themes | 169 | 149 | [`capsule.html`](./feedback/feedback-6/capsule.html) · [`component.css`](./feedback/feedback-6/component.css) · [`decompiled-spec.json`](./feedback/feedback-6/decompiled-spec.json) · [`README.md`](./feedback/feedback-6/README.md) |

<a id="category-support"></a>
### Support (`support/`) — Collaboration, Content & Support

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **support-1** | Help center home with search | 96 | 165 | [`capsule.html`](./support/support-1/capsule.html) · [`component.css`](./support/support-1/component.css) · [`decompiled-spec.json`](./support/support-1/decompiled-spec.json) · [`README.md`](./support/support-1/README.md) |
| **support-2** | Ticket form with article suggestions | 109 | 234 | [`capsule.html`](./support/support-2/capsule.html) · [`component.css`](./support/support-2/component.css) · [`decompiled-spec.json`](./support/support-2/decompiled-spec.json) · [`README.md`](./support/support-2/README.md) |
| **support-3** | Ticket thread with a timeline | 122 | 183 | [`capsule.html`](./support/support-3/capsule.html) · [`component.css`](./support/support-3/component.css) · [`decompiled-spec.json`](./support/support-3/decompiled-spec.json) · [`README.md`](./support/support-3/README.md) |
| **support-4** | Support chat with a human handoff | 58 | 183 | [`capsule.html`](./support/support-4/capsule.html) · [`component.css`](./support/support-4/component.css) · [`decompiled-spec.json`](./support/support-4/decompiled-spec.json) · [`README.md`](./support/support-4/README.md) |
| **support-5** | Request list with status pills | 121 | 193 | [`capsule.html`](./support/support-5/capsule.html) · [`component.css`](./support/support-5/component.css) · [`decompiled-spec.json`](./support/support-5/decompiled-spec.json) · [`README.md`](./support/support-5/README.md) |

<a id="category-chat"></a>
### Chat (`chat/`) — Collaboration, Content & Support

| Block | Description | DOM Nodes | Classes | Artifacts |
| :--- | :--- | :---: | :---: | :--- |
| **chat-1** | Team channels with threads | 147 | 214 | [`capsule.html`](./chat/chat-1/capsule.html) · [`component.css`](./chat/chat-1/component.css) · [`decompiled-spec.json`](./chat/chat-1/decompiled-spec.json) · [`README.md`](./chat/chat-1/README.md) |
| **chat-2** | Direct messages with read receipts | 133 | 204 | [`capsule.html`](./chat/chat-2/capsule.html) · [`component.css`](./chat/chat-2/component.css) · [`decompiled-spec.json`](./chat/chat-2/decompiled-spec.json) · [`README.md`](./chat/chat-2/README.md) |
| **chat-3** | Social thread with nested replies | 90 | 154 | [`capsule.html`](./chat/chat-3/capsule.html) · [`component.css`](./chat/chat-3/component.css) · [`decompiled-spec.json`](./chat/chat-3/decompiled-spec.json) · [`README.md`](./chat/chat-3/README.md) |
| **chat-4** | Support chat widget with a rating | 79 | 178 | [`capsule.html`](./chat/chat-4/capsule.html) · [`component.css`](./chat/chat-4/component.css) · [`decompiled-spec.json`](./chat/chat-4/decompiled-spec.json) · [`README.md`](./chat/chat-4/README.md) |
| **chat-5** | Group chat with attachments | 138 | 194 | [`capsule.html`](./chat/chat-5/capsule.html) · [`component.css`](./chat/chat-5/component.css) · [`decompiled-spec.json`](./chat/chat-5/decompiled-spec.json) · [`README.md`](./chat/chat-5/README.md) |
| **chat-6** | Live stream chat with badges | 115 | 186 | [`capsule.html`](./chat/chat-6/capsule.html) · [`component.css`](./chat/chat-6/component.css) · [`decompiled-spec.json`](./chat/chat-6/decompiled-spec.json) · [`README.md`](./chat/chat-6/README.md) |
