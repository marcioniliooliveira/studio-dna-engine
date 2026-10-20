import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Download } from "lucide-react";

export function ExerciseChart() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const activityData = [
    { target: 45, current: 62 },
    { target: 45, current: 50 },
    { target: 45, current: 35 },
    { target: 45, current: 75 },
    { target: 45, current: 80 },
    { target: 45, current: 95 },
    { target: 45, current: 60 }
  ];

  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Exercise Minutes</CardTitle>
          <CardDescription>Your exercise minutes are ahead of where you normally are.</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs">
          <Download className="h-3.5 w-3.5" />
          <span>Export</span>
        </Button>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[200px] flex items-end justify-between gap-3">
          {activityData.map((d, i) => (
            <div key={days[i]} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full flex items-end justify-center gap-1 h-36">
                <div
                  className="w-1/2 bg-muted rounded-t-sm"
                  style={{ height: `${(d.target / 100) * 100}%` }}
                  title="Target"
                />
                <div
                  className="w-1/2 bg-emerald-500 rounded-t-sm"
                  style={{ height: `${(d.current / 100) * 100}%` }}
                  title="Current"
                />
              </div>
              <span className="text-[11px] text-muted-foreground">{days[i]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
