import React from "react";
import { Card, CardContent } from "../ui/Card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  subtext?: string;
  icon?: React.ReactNode;
  sparklineData?: number[];
}

export function MetricCard({
  title,
  value,
  change,
  isPositive = true,
  subtext = "from last month",
  icon,
  sparklineData = [20, 35, 25, 45, 30, 55, 60]
}: MetricCardProps) {
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const points = sparklineData
    .map((v, i) => {
      const x = (i / (sparklineData.length - 1)) * 100;
      const y = 30 - ((v - min) / (max - min || 1)) * 25;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{value}</span>
          {/* Mini Sparkline SVG */}
          <div className="w-16 h-8 overflow-hidden">
            <svg viewBox="0 0 100 35" className="w-full h-full overflow-visible">
              <polyline
                fill="none"
                stroke={isPositive ? "#10b981" : "#ef4444"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            </svg>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className={`inline-flex items-center font-semibold ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
            {isPositive ? <TrendingUp className="mr-0.5 h-3.5 w-3.5" /> : <TrendingDown className="mr-0.5 h-3.5 w-3.5" />}
            {change}
          </span>
          <span className="text-muted-foreground">{subtext}</span>
        </div>
      </CardContent>
    </Card>
  );
}
