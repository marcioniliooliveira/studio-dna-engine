import React, { useState } from "react";
import {
  LayoutDashboard,
  BadgeDollarSign,
  Users,
  BarChart3,
  Gauge,
  BrainCircuit,
  FolderDot,
  Coins,
  Building2,
  Wallet,
  Kanban,
  FileText,
  MessageSquare,
  Share2,
  Workflow,
  Mail,
  CheckSquare,
  ListTodo,
  Calendar,
  KeyRound,
  Bot,
  Sparkles,
  Image,
  Volume2,
  UserCheck,
  UserCircle,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  LogOut,
  Settings
} from "lucide-react";
import { Badge } from "../ui/Badge";

interface AppSidebarProps {
  activePath?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function AppSidebar({ activePath = "/dashboard/default", isCollapsed = false }: AppSidebarProps) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    dashboards: true,
    apps: true,
    aiApps: true,
    pages: false
  });

  const toggleGroup = (key: string) => {
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navGroups = [
    {
      id: "dashboards",
      label: "Dashboards",
      items: [
        { label: "Classic Dashboard", href: "/dashboard/default", icon: LayoutDashboard },
        { label: "Sales", href: "/dashboard/sales", icon: BadgeDollarSign },
        { label: "HR", href: "/dashboard/hr", icon: Users, badge: "New" },
        { label: "CRM", href: "/dashboard/crm", icon: BarChart3 },
        { label: "Website Analytics", href: "/dashboard/website-analytics", icon: Gauge },
        { label: "AI Analytics", href: "/dashboard/ai-analytics", icon: BrainCircuit },
        { label: "File Manager", href: "/dashboard/file-manager", icon: FolderDot },
        { label: "Crypto", href: "/dashboard/crypto", icon: Coins },
        { label: "Hospital Management", href: "/dashboard/hospital-management", icon: Building2 },
        { label: "Finance Dashboard", href: "/dashboard/finance", icon: Wallet }
      ]
    },
    {
      id: "apps",
      label: "Apps",
      items: [
        { label: "Kanban", href: "/dashboard/apps/kanban", icon: Kanban },
        { label: "Notes", href: "/dashboard/apps/notes", icon: FileText },
        { label: "Chats", href: "/dashboard/apps/chat", icon: MessageSquare },
        { label: "Social Media", href: "/dashboard/apps/social-media", icon: Share2 },
        { label: "Workflow Automation", href: "/dashboard/workflow-automation", icon: Workflow },
        { label: "Mail", href: "/dashboard/apps/mail", icon: Mail },
        { label: "Tasks", href: "/dashboard/apps/tasks", icon: ListTodo },
        { label: "Calendar", href: "/dashboard/apps/calendar", icon: Calendar },
        { label: "Api Keys", href: "/dashboard/apps/api-keys", icon: KeyRound }
      ]
    },
    {
      id: "aiApps",
      label: "AI Apps",
      items: [
        { label: "AI Chat", href: "/dashboard/apps/ai-chat", icon: Bot, badge: "Popular" },
        { label: "AI Chat V2", href: "/dashboard/apps/ai-chat-v2", icon: Sparkles },
        { label: "Image Generator", href: "/dashboard/apps/ai-image-generator", icon: Image },
        { label: "Text to Speech", href: "/dashboard/apps/text-to-speech", icon: Volume2 }
      ]
    }
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-14 items-center justify-between border-b border-border/50 px-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm shadow-sm">
            ⌘
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-tight text-foreground">Shadcn UI Kit</span>
              <span className="text-[11px] text-muted-foreground">Admin Suite PRO</span>
            </div>
          )}
        </div>
      </div>

      {/* Search Input Button */}
      {!isCollapsed && (
        <div className="px-3 pt-3">
          <div className="relative flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-input bg-background/50 pl-8 pr-12 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              readOnly
            />
            <kbd className="absolute right-2 top-1.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>
      )}

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {navGroups.map(group => (
          <div key={group.id} className="space-y-1">
            {!isCollapsed && (
              <button
                onClick={() => toggleGroup(group.id)}
                className="flex w-full items-center justify-between px-2 py-1 text-[11px] font-medium tracking-wider text-muted-foreground uppercase hover:text-foreground"
              >
                <span>{group.label}</span>
                {openGroups[group.id] ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            )}

            {(isCollapsed || openGroups[group.id]) && (
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activePath === item.href;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      title={isCollapsed ? item.label : undefined}
                      className={`flex items-center gap-3 rounded-md px-2.5 py-2 text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      } ${isCollapsed ? "justify-center px-0" : ""}`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && (
                        <div className="flex flex-1 items-center justify-between">
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <Badge variant="success" className="text-[10px] px-1.5 py-0">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User Footer Profile */}
      <div className="border-t border-border/50 p-3">
        <div className="flex items-center gap-3 rounded-md p-1.5 hover:bg-accent/50 transition-colors">
          <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-xs text-primary">
            TB
          </div>
          {!isCollapsed && (
            <div className="flex flex-1 flex-col overflow-hidden">
              <span className="text-xs font-medium text-foreground truncate">Toby Belhome</span>
              <span className="text-[11px] text-muted-foreground truncate">contact@bundui.io</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
