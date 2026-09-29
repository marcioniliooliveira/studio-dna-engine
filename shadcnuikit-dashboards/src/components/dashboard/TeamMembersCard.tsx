import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Avatar } from "../ui/Avatar";

export function TeamMembersCard() {
  const members = [
    { name: "Toby Belhome", email: "contact@bundui.io", role: "Owner", initials: "TB" },
    { name: "Jackson Lee", email: "pre@example.com", role: "Developer", initials: "JL" },
    { name: "Hally Gray", email: "hally@site.com", role: "Viewer", initials: "HG" },
    { name: "Sofia Davis", email: "m@example.com", role: "Billing", initials: "SD" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Manage workspace collaborators and access roles.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.map(member => (
          <div key={member.email} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar fallback={member.initials} />
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none text-foreground">{member.name}</span>
                <span className="text-xs text-muted-foreground mt-1">{member.email}</span>
              </div>
            </div>
            <select
              defaultValue={member.role}
              className="rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            >
              <option value="Owner">Owner</option>
              <option value="Developer">Developer</option>
              <option value="Billing">Billing</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
