import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../ui/Button";
import { CreditCard } from "lucide-react";

export function PaymentMethodCard() {
  const [selectedMethod, setSelectedMethod] = useState("card");

  return (
    <Card className="col-span-full lg:col-span-3">
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
        <CardDescription>Add a new payment method to your account.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Method Picker Tabs */}
        <div className="grid grid-cols-3 gap-2">
          {["card", "paypal", "apple"].map(method => (
            <button
              key={method}
              type="button"
              onClick={() => setSelectedMethod(method)}
              className={`flex flex-col items-center justify-center rounded-lg border p-3 text-xs capitalize transition-all ${
                selectedMethod === method
                  ? "border-primary bg-primary/5 font-semibold text-foreground ring-1 ring-primary"
                  : "border-border text-muted-foreground hover:bg-accent/40"
              }`}
            >
              <CreditCard className="mb-1 h-4 w-4" />
              <span>{method}</span>
            </button>
          ))}
        </div>

        {/* Form Inputs */}
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Name on the card</label>
            <input
              type="text"
              placeholder="First and last name"
              className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">Card number</label>
            <input
              type="text"
              placeholder="•••• •••• •••• ••••"
              className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Month</label>
              <select className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Year</label>
              <select className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
                {Array.from({ length: 8 }, (_, i) => (
                  <option key={i} value={2026 + i}>{2026 + i}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">CVC</label>
              <input
                type="text"
                placeholder="CVC"
                className="w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full text-xs">Continue</Button>
      </CardFooter>
    </Card>
  );
}
