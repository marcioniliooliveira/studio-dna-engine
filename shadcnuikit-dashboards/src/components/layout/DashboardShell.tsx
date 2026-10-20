import React, { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardShellProps {
  children: React.ReactNode;
  activePath?: string;
  breadcrumb?: string[];
}

export function DashboardShell({ children, activePath = "/dashboard/default", breadcrumb }: DashboardShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <AppSidebar activePath={activePath} isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />

      {/* Content wrapper */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? "ml-16" : "ml-64"}`}>
        <DashboardHeader
          breadcrumb={breadcrumb}
          onToggleSidebar={() => setIsCollapsed(!isCollapsed)}
          onToggleTheme={toggleTheme}
          isDark={isDark}
        />
        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
