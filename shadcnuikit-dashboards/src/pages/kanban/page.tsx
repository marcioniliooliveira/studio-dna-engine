import React, { useState } from "react";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "../../components/ui/Button";

export default function KanbanPage() {
  const [columns] = useState([
    {
      id: "backlog",
      title: "Backlog",
      tasks: [
        { id: "1", title: "Refactor Auth Provider", tag: "Security", priority: "High" },
        { id: "2", title: "Setup S3 bucket uploads", tag: "DevOps", priority: "Medium" }
      ]
    },
    {
      id: "in-progress",
      title: "In Progress",
      tasks: [
        { id: "3", title: "Implement AI Chat Streaming", tag: "AI/ML", priority: "High" },
        { id: "4", title: "Fix billing calculation edge case", tag: "Bug", priority: "Urgent" }
      ]
    },
    {
      id: "review",
      title: "Under Review",
      tasks: [
        { id: "5", title: "Dark mode contrast audit", tag: "Design", priority: "Low" }
      ]
    },
    {
      id: "done",
      title: "Completed",
      tasks: [
        { id: "6", title: "Add Stripe Webhook listener", tag: "Billing", priority: "Done" },
        { id: "7", title: "Launch v2.0 Dashboard UI", tag: "Release", priority: "Done" }
      ]
    }
  ]);

  return (
    <DashboardShell activePath="/dashboard/apps/kanban" breadcrumb={["Apps", "Kanban"]}>
      <div className="flex items-center justify-between pb-2">
        <div>
          <h1 className="text-xl font-bold text-foreground">Project Sprint Board</h1>
          <p className="text-xs text-muted-foreground">Manage and track issues across development stages.</p>
        </div>
        <Button size="sm" className="h-8 gap-1.5 text-xs">
          <Plus className="h-3.5 w-3.5" />
          <span>New Task</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map(col => (
          <div key={col.id} className="flex flex-col gap-3 rounded-xl bg-muted/40 p-3 border border-border/50">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-foreground uppercase tracking-wider">{col.title} ({col.tasks.length})</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="space-y-2.5">
              {col.tasks.map(task => (
                <Card key={task.id} className="cursor-grab hover:shadow-md transition-shadow">
                  <CardContent className="p-3.5 space-y-2">
                    <span className="text-xs font-medium text-foreground block">{task.title}</span>
                    <div className="flex items-center justify-between pt-1">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{task.tag}</Badge>
                      <span className="text-[10px] text-muted-foreground font-semibold">{task.priority}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
}
