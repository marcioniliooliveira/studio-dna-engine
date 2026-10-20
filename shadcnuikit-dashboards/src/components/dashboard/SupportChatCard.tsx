import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { Button } from "../ui/Button";
import { Send } from "lucide-react";

export function SupportChatCard() {
  const [messages, setMessages] = useState([
    { sender: "Sofia Davis", text: "Hi, how can I help you today?", isSelf: false },
    { sender: "You", text: "Hey, I'm having trouble with my account.", isSelf: true },
    { sender: "Sofia Davis", text: "What seems to be the problem?", isSelf: false },
    { sender: "You", text: "I can't log in.", isSelf: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: "You", text: input, isSelf: true }]);
    setInput("");
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-border/40">
        <Avatar fallback="SD" />
        <div className="flex flex-col">
          <CardTitle className="text-sm">Sofia Davis</CardTitle>
          <CardDescription className="text-xs">m@example.com · Online</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 py-4 overflow-y-auto max-h-[220px]">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.isSelf ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-xs ${
                m.isSelf ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="pt-2 border-t border-border/40">
        <form onSubmit={handleSend} className="flex w-full items-center gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 rounded-md border border-input bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <Button type="submit" size="sm" className="h-8 px-3 gap-1">
            <Send className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
