import React, { useState } from "react";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Bot, Send, Sparkles, Paperclip, Mic } from "lucide-react";

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hello! I am your AI workspace assistant. How can I assist you with your dashboard analytics, revenue metrics, or code tasks today?" },
    { sender: "user", text: "Can you summarize the highest grossing product from last week's sales report?" },
    { sender: "assistant", text: "According to the Sales Dashboard, **Smart Watch V2** generated $42,600 across 142 units, followed by **Sports Shoes** at $28,440 (316 units sold)." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: "assistant",
        text: `Here is the latest insight regarding "${userMsg}": all systems are currently operational with 99.98% uptime and positive ROI across all acquisition channels.`
      }]);
    }, 600);
  };

  return (
    <DashboardShell activePath="/dashboard/apps/ai-chat" breadcrumb={["AI Apps", "AI Chat"]}>
      <Card className="flex flex-col h-[calc(100vh-140px)] shadow-md">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold">AI Assistant PRO</CardTitle>
              <span className="text-[11px] text-emerald-500 font-medium">● Connected to Gemini 2.0 / GPT-4o</span>
            </div>
          </div>
          <select className="rounded-md border border-input bg-background px-2.5 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring">
            <option value="gpt-4o">GPT-4o (High Performance)</option>
            <option value="claude-3-5">Claude 3.5 Sonnet</option>
            <option value="gemini-flash">Gemini 1.5 Flash</option>
          </select>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              {m.sender === "assistant" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
                  m.sender === "user"
                    ? "bg-primary text-primary-foreground font-medium rounded-tr-none"
                    : "bg-muted text-foreground border border-border/50 rounded-tl-none"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter className="border-t border-border/60 p-4">
          <form onSubmit={handleSend} className="flex w-full items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Paperclip className="h-4 w-4" />
            </Button>
            <input
              type="text"
              placeholder="Ask anything about metrics, team performance, or code..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 rounded-lg border border-input bg-background px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Mic className="h-4 w-4" />
            </Button>
            <Button type="submit" size="sm" className="h-9 px-4 gap-1.5 text-xs">
              <Send className="h-3.5 w-3.5" />
              <span>Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </DashboardShell>
  );
}
