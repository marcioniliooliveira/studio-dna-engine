import React from "react";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Users, BarChart3, DollarSign, Target } from "lucide-react";

export default function CRMDashboardPage() {
  const pipeline = [
    { stage: "Lead", deals: 235, value: "$420,500", pct: 38 },
    { stage: "Qualified", deals: 146, value: "$267,800", pct: 24 },
    { stage: "Proposal", deals: 84, value: "$192,400", pct: 18 },
    { stage: "Negotiation", deals: 42, value: "$110,000", pct: 12 },
    { stage: "Won", deals: 31, value: "$85,200", pct: 8 }
  ];

  return (
    <DashboardShell activePath="/dashboard/crm" breadcrumb={["Dashboards", "CRM"]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Customers" value="1,890" change="+10.4%" icon={<Users className="h-4 w-4" />} />
        <MetricCard title="Total Deals" value="1,300" change="-0.8%" isPositive={false} icon={<BarChart3 className="h-4 w-4" />} />
        <MetricCard title="Pipeline Revenue" value="$435,578" change="+20.1%" icon={<DollarSign className="h-4 w-4" />} />
        <MetricCard title="Target Progress" value="82%" change="+5.2%" icon={<Target className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Active opportunities distributed by stage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pipeline.map(p => (
              <div key={p.stage} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-foreground">{p.stage}</span>
                  <span className="text-muted-foreground">{p.deals} deals · {p.value} ({p.pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${p.pct * 2}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
            <CardDescription>Acquisition channels breakdown.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { source: "Social Media", pct: 42, color: "bg-blue-500" },
              { source: "Organic Search", pct: 28, color: "bg-emerald-500" },
              { source: "Referral", pct: 18, color: "bg-purple-500" },
              { source: "Direct", pct: 12, color: "bg-amber-500" }
            ].map(s => (
              <div key={s.source} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                  <span className="text-muted-foreground">{s.source}</span>
                </div>
                <span className="font-bold text-foreground">{s.pct}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
