import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/Button";

export function RecentPaymentsTable() {
  const payments = [
    { customer: "Kenneth Thompson", email: "ken99@yahoo.com", amount: "$316.00", status: "success" },
    { customer: "Abraham Lincoln", email: "abe45@gmail.com", amount: "$242.00", status: "success" },
    { customer: "Monserrat Bender", email: "monse77@gmail.com", amount: "$837.00", status: "processing" },
    { customer: "Silas Adams", email: "silas22@gmail.com", amount: "$874.00", status: "success" },
    { customer: "Carmella John", email: "carmella@hotmail.com", amount: "$721.00", status: "failed" }
  ];

  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Latest Payments</CardTitle>
          <CardDescription>See recent payments from your customers here.</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="h-8 text-xs">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border/60 text-muted-foreground">
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium hidden md:table-cell">Email</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Amount</th>
                <th className="pb-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {payments.map(p => (
                <tr key={p.email} className="hover:bg-accent/40 transition-colors">
                  <td className="py-3 font-medium text-foreground">{p.customer}</td>
                  <td className="py-3 text-muted-foreground hidden md:table-cell">{p.email}</td>
                  <td className="py-3">
                    <Badge variant={p.status === "success" ? "success" : p.status === "failed" ? "destructive" : "secondary"}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-3 font-semibold text-right text-foreground">{p.amount}</td>
                  <td className="py-3 text-center">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
