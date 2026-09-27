import React from "react";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Bot, Cpu, Zap, DollarSign } from "lucide-react";

export default function AIAnalyticsDashboardPage() {
  const models = [
    { name: "GPT-4o", requests: "1.2M", cost: "$142.50", latency: "380ms", share: 45 },
    { name: "Claude 3.5 Sonnet", requests: "850K", cost: "$88.20", latency: "420ms", share: 32 },
    { name: "DeepSeek R1", requests: "420K", cost: "$12.10", latency: "650ms", share: 15 },
    { name: "Gemini 1.5 Flash", requests: "310K", cost: "$3.00", latency: "210ms", share: 8 }
  ];

  return (
    <DashboardShell activePath="/dashboard/ai-analytics" breadcrumb={["Dashboards", "AI Analytics"]}>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">AI Analytics & LLM Observability</h1>
        <p className="text-xs text-muted-foreground">Monitor token consumption, prompt latency, and model cost attribution.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Volume"
          value="2,450,230"
          change="+14.2%"
          subtext="tokens generated"
          icon={<Cpu className="h-4 w-4" />}
          sparklineData={[40, 50, 65, 70, 85, 90, 110]}
        />
        <MetricCard
          title="Total Interactions"
          value="14,302"
          change="+8.6%"
          subtext="user prompts"
          icon={<Bot className="h-4 w-4" />}
          sparklineData={[20, 28, 35, 42, 50, 58, 64]}
        />
        <MetricCard
          title="Estimated Cost"
          value="$245.80"
          change="-5.4%"
          isPositive={false}
          subtext="this billing cycle"
          icon={<DollarSign className="h-4 w-4" />}
          sparklineData={[50, 48, 45, 42, 40, 38, 35]}
        />
        <MetricCard
          title="Cache Hit Rate"
          value="68.4%"
          change="+12.0%"
          subtext="of 80% target"
          icon={<Zap className="h-4 w-4" />}
          sparklineData={[30, 35, 42, 50, 58, 62, 68]}
        />
      </div>

      {/* Model Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage by Model</CardTitle>
            <CardDescription>Breakdown of requests, cost and latency across active LLMs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {models.map(m => (
              <div key={m.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">{m.name}</span>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span>{m.requests} reqs</span>
                    <span className="font-medium text-foreground">{m.cost}</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${m.share}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cache & Efficiency</CardTitle>
            <CardDescription>Prompt caching performance and inference savings.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center py-8 space-y-4">
            <div className="relative flex items-center justify-center h-32 w-32 rounded-full border-8 border-emerald-500/20 border-t-emerald-500">
              <span className="text-2xl font-bold text-foreground">68.4%</span>
            </div>
            <p className="text-xs text-center text-muted-foreground max-w-xs">
              Prompt caching saved approximately <span className="font-semibold text-foreground">$128.40</span> in token expenditure this month.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
