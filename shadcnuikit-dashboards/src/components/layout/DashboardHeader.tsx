import React from "react";
import { Search, Bell, Sun, Moon, PanelLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";

interface DashboardHeaderProps {
  title?: string;
  breadcrumb?: string[];
  onToggleSidebar?: () => void;
  onToggleTheme?: () => void;
  isDark?: boolean;
}

export function DashboardHeader({
  title = "Overview",
  breadcrumb = ["Dashboards", "Classic Dashboard"],
  onToggleSidebar,
  onToggleTheme,
  isDark = false
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-border/60 bg-background/95 backdrop-blur px-6">
      {/* Left: Sidebar Toggle + Breadcrumb */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <PanelLeft className="h-4 w-4" />
          </Button>
        )}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {breadcrumb.map((item, idx) => (
            <React.Fragment key={item}>
              {idx > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}
              <span className={idx === breadcrumb.length - 1 ? "font-medium text-foreground" : ""}>
                {item}
              </span>
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Search, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="hidden sm:flex h-8 gap-2 text-xs text-muted-foreground">
          <Search className="h-3.5 w-3.5" />
          <span>Quick search...</span>
          <kbd className="rounded border bg-muted px-1.5 text-[10px] font-mono">⌘K</kbd>
        </Button>

        <Button variant="ghost" size="icon" className="relative h-8 w-8 text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-background" />
        </Button>

        {onToggleTheme && (
          <Button variant="ghost" size="icon" onClick={onToggleTheme} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        )}

        <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary cursor-pointer">
          TB
        </div>
      </div>
    </header>
  );
}
