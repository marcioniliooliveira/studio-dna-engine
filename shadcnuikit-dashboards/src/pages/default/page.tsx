import React from "react";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { RevenueChart } from "../../components/dashboard/RevenueChart";
import { ExerciseChart } from "../../components/dashboard/ExerciseChart";
import { TeamMembersCard } from "../../components/dashboard/TeamMembersCard";
import { SupportChatCard } from "../../components/dashboard/SupportChatCard";
import { RecentPaymentsTable } from "../../components/dashboard/RecentPaymentsTable";
import { PaymentMethodCard } from "../../components/dashboard/PaymentMethodCard";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { Button } from "../../components/ui/Button";

export default function ClassicDashboardPage() {
  return (
    <DashboardShell activePath="/dashboard/default" breadcrumb={["Dashboards", "Classic Dashboard"]}>
      {/* Promo banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 md:p-6 shadow-sm">
        <div>
          <h2 className="text-base md:text-lg font-bold text-foreground">Get This Template</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Download the full source code. Every dashboard and app view in this kit is included.
          </p>
        </div>
        <Button className="whitespace-nowrap text-xs shadow">Download Template</Button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1%"
          isPositive={true}
          icon={<DollarSign className="h-4 w-4" />}
          sparklineData={[30, 40, 35, 50, 48, 65, 75]}
        />
        <MetricCard
          title="Subscriptions"
          value="+2,350"
          change="+180.1%"
          isPositive={true}
          icon={<Users className="h-4 w-4" />}
          sparklineData={[15, 25, 30, 45, 60, 80, 95]}
        />
        <MetricCard
          title="Sales"
          value="+12,234"
          change="+19.0%"
          isPositive={true}
          icon={<CreditCard className="h-4 w-4" />}
          sparklineData={[40, 35, 50, 45, 60, 55, 70]}
        />
        <MetricCard
          title="Active Now"
          value="+573"
          change="+201"
          subtext="since last hour"
          isPositive={true}
          icon={<Activity className="h-4 w-4" />}
          sparklineData={[20, 25, 30, 28, 35, 40, 50]}
        />
      </div>

      {/* Charts & Interactive Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <RevenueChart />
        <ExerciseChart />
      </div>

      {/* Secondary Row: Team, Support Chat, Payment Method */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TeamMembersCard />
        <SupportChatCard />
        <PaymentMethodCard />
      </div>

      {/* Recent Payments Table */}
      <div className="grid grid-cols-1 gap-6">
        <RecentPaymentsTable />
      </div>
    </DashboardShell>
  );
}
