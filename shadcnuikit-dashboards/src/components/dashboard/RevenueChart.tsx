import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";

export function RevenueChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = [12000, 19000, 15000, 28000, 24000, 34000, 31000, 42000, 39000, 48000, 45000, 52000];
  const max = Math.max(...data);

  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly performance comparing income & projections</CardDescription>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">Revenue ($)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] flex items-end gap-2 md:gap-4 pt-4">
          {data.map((val, idx) => {
            const heightPct = Math.round((val / max) * 100);
            return (
              <div key={months[idx]} className="flex-1 flex flex-col items-center gap-2 group relative">
                <div
                  className="w-full bg-primary/20 group-hover:bg-primary transition-all duration-300 rounded-t-sm"
                  style={{ height: `${heightPct}%` }}
                />
                <span className="text-[11px] text-muted-foreground">{months[idx]}</span>
                {/* Tooltip on hover */}
                <div className="absolute -top-8 bg-foreground text-background text-[10px] font-medium py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  $${val.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
