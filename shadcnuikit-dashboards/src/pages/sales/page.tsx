import React from "react";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { DollarSign, ShoppingBag, ArrowUpRight, TrendingUp } from "lucide-react";

export default function SalesDashboardPage() {
  const products = [
    { name: "Sports Shoes", sold: "316 items", revenue: "$28,440" },
    { name: "Black T-Shirt", sold: "274 items", revenue: "$8,220" },
    { name: "Wireless Headphones", sold: "189 items", revenue: "$24,570" },
    { name: "Smart Watch V2", sold: "142 items", revenue: "$42,600" }
  ];

  return (
    <DashboardShell activePath="/dashboard/sales" breadcrumb={["Dashboards", "Sales"]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Balance" value="$103,045" change="+3.6%" icon={<DollarSign className="h-4 w-4" />} />
        <MetricCard title="Total Income" value="$78,000" change="+2.5%" icon={<ArrowUpRight className="h-4 w-4" />} />
        <MetricCard title="Total Expense" value="$15,010" change="+6.0%" isPositive={false} icon={<TrendingUp className="h-4 w-4" />} />
        <MetricCard title="Sales Tax" value="$9,090" change="+5.0%" icon={<ShoppingBag className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
            <CardDescription>Top-selling products and gross volume.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {products.map(p => (
              <div key={p.name} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                <div>
                  <div className="text-xs font-semibold text-foreground">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">{p.sold} sold</div>
                </div>
                <div className="text-xs font-bold text-foreground">{p.revenue}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Track Order Status</CardTitle>
            <CardDescription>Live fulfillment and delivery progression.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">New Orders</span>
              <span className="font-bold text-foreground">43 orders (35%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "35%" }} />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">In Progress</span>
              <span className="font-bold text-foreground">12 orders (10%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "10%" }} />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Delivered</span>
              <span className="font-bold text-foreground">68 orders (55%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "55%" }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
