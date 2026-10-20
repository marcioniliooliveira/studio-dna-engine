/**
 * Studio DNA Engine — Shadcn UI Kit Dashboards Packager
 * 
 * Packages the complete structure and UI of https://shadcnuikit.com/dashboard/default
 * and associated dashboards (Sales, CRM, AI Analytics, Kanban, AI Chat) into
 * a modern, production-ready React / Next.js + TypeScript + Tailwind CSS component library.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCE_CLONE = path.join(ROOT_DIR, 'copias/shadcnuikit-dashboard/shadcnuikit-com');
const TARGET_DIR = path.join(ROOT_DIR, 'shadcnuikit-dashboards');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    ensureDir(dest);
    fs.readdirSync(src).forEach(child => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

async function run() {
  console.log('🚀 Iniciando empacotamento do Shadcn UI Kit Dashboards...');
  console.log(`📁 Diretório de Destino: ${TARGET_DIR}`);

  ensureDir(TARGET_DIR);

  // 1. Copy Live Clone to live-preview/
  const previewDir = path.join(TARGET_DIR, 'live-preview');
  console.log('📦 Copiando snapshot live do site para live-preview/...');
  copyRecursive(path.join(SOURCE_CLONE, 'site'), previewDir);

  // 2. Setup src/ directory structure
  ensureDir(path.join(TARGET_DIR, 'src/components/layout'));
  ensureDir(path.join(TARGET_DIR, 'src/components/ui'));
  ensureDir(path.join(TARGET_DIR, 'src/components/dashboard'));
  ensureDir(path.join(TARGET_DIR, 'src/components/sales'));
  ensureDir(path.join(TARGET_DIR, 'src/components/crm'));
  ensureDir(path.join(TARGET_DIR, 'src/components/ai-analytics'));
  ensureDir(path.join(TARGET_DIR, 'src/pages/default'));
  ensureDir(path.join(TARGET_DIR, 'src/pages/sales'));
  ensureDir(path.join(TARGET_DIR, 'src/pages/crm'));
  ensureDir(path.join(TARGET_DIR, 'src/pages/ai-analytics'));
  ensureDir(path.join(TARGET_DIR, 'src/pages/kanban'));
  ensureDir(path.join(TARGET_DIR, 'src/pages/ai-chat'));
  ensureDir(path.join(TARGET_DIR, 'src/styles'));

  console.log('✨ Criando Design Tokens & Configurações...');

  // globals.css
  const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.75rem;

    /* Sidebar Variables */
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;

    /* Chart Colors */
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;

    /* Dark Sidebar Variables */
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;

    /* Dark Chart Colors */
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/styles/globals.css'), globalsCss, 'utf8');

  // tailwind.config.js
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/styles/tailwind.config.js'), tailwindConfig, 'utf8');

  console.log('🧱 Gerando Primitivos Shadcn UI (Card, Button, Badge, Avatar, Input, Table)...');

  // ui/Card.tsx
  const cardTsx = `import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight text-base md:text-lg", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/ui/Card.tsx'), cardTsx, 'utf8');

  // ui/Button.tsx
  const buttonTsx = `import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer";
    
    const variants = {
      default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
      outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
    };

    const sizes = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-10 rounded-md px-8",
      icon: "h-9 w-9",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/ui/Button.tsx'), buttonTsx, 'utf8');

  // ui/Badge.tsx
  const badgeTsx = `import * as React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
    outline: "text-foreground",
    success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/ui/Badge.tsx'), badgeTsx, 'utf8');

  // ui/Avatar.tsx
  const avatarTsx = `import * as React from "react";

export function Avatar({ src, alt, fallback, className = "" }: { src?: string; alt?: string; fallback: string; className?: string }) {
  const [error, setError] = React.useState(false);
  return (
    <div className={\`relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border/50 bg-muted items-center justify-center font-medium text-xs text-muted-foreground \${className}\`}>
      {src && !error ? (
        <img src={src} alt={alt || "Avatar"} onError={() => setError(true)} className="aspect-square h-full w-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/ui/Avatar.tsx'), avatarTsx, 'utf8');

  console.log('🏛️ Gerando Shell de Layout & Sidebar (AppSidebar, DashboardHeader, DashboardShell)...');

  // layout/AppSidebar.tsx
  const appSidebarTsx = `import React, { useState } from "react";
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
      className={\`fixed inset-y-0 left-0 z-30 flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 \${
        isCollapsed ? "w-16" : "w-64"
      }\`}
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
                      className={\`flex items-center gap-3 rounded-md px-2.5 py-2 text-xs font-medium transition-colors \${
                        isActive
                          ? "bg-accent text-accent-foreground font-semibold"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      } \${isCollapsed ? "justify-center px-0" : ""}\`}
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
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/layout/AppSidebar.tsx'), appSidebarTsx, 'utf8');

  // layout/DashboardHeader.tsx
  const dashboardHeaderTsx = `import React from "react";
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
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/layout/DashboardHeader.tsx'), dashboardHeaderTsx, 'utf8');

  // layout/DashboardShell.tsx
  const dashboardShellTsx = `import React, { useState } from "react";
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
      <div className={\`flex-1 flex flex-col transition-all duration-300 \${isCollapsed ? "ml-16" : "ml-64"}\`}>
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
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/layout/DashboardShell.tsx'), dashboardShellTsx, 'utf8');

  console.log('📊 Gerando Widgets do Dashboard Principal (MetricCard, RevenueChart, ExerciseChart, TeamMembers, RecentPayments, PaymentMethod, SupportChat)...');

  // dashboard/MetricCard.tsx
  const metricCardTsx = `import React from "react";
import { Card, CardContent } from "../ui/Card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  subtext?: string;
  icon?: React.ReactNode;
  sparklineData?: number[];
}

export function MetricCard({
  title,
  value,
  change,
  isPositive = true,
  subtext = "from last month",
  icon,
  sparklineData = [20, 35, 25, 45, 30, 55, 60]
}: MetricCardProps) {
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const points = sparklineData
    .map((v, i) => {
      const x = (i / (sparklineData.length - 1)) * 100;
      const y = 30 - ((v - min) / (max - min || 1)) * 25;
      return \`\${x},\${y}\`;
    })
    .join(" ");

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</span>
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{value}</span>
          {/* Mini Sparkline SVG */}
          <div className="w-16 h-8 overflow-hidden">
            <svg viewBox="0 0 100 35" className="w-full h-full overflow-visible">
              <polyline
                fill="none"
                stroke={isPositive ? "#10b981" : "#ef4444"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            </svg>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs">
          <span className={\`inline-flex items-center font-semibold \${isPositive ? "text-emerald-500" : "text-rose-500"}\`}>
            {isPositive ? <TrendingUp className="mr-0.5 h-3.5 w-3.5" /> : <TrendingDown className="mr-0.5 h-3.5 w-3.5" />}
            {change}
          </span>
          <span className="text-muted-foreground">{subtext}</span>
        </div>
      </CardContent>
    </Card>
  );
}
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/dashboard/MetricCard.tsx'), metricCardTsx, 'utf8');

  // dashboard/RevenueChart.tsx
  const revenueChartTsx = `import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/Card";

export function RevenueChart() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = [12000, 19000, 15000, 28000, 24000, 34000, 31000, 42000, 39000, 48000, 45000, 52000];
  const max = Math.max(...data);

  return (
    <Card className="col-span-full lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>Monthly performance comparing income & projections</CardDescription>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="text-muted-foreground">Revenue ($)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] flex items-end gap-2 md:gap-4 pt-4">
          {data.map((val, idx) => {
            const heightPct = Math.round((val / max) * 100);
            return (
              <div key={months[idx]} className="flex-1 flex flex-col items-center gap-2 group relative">
                <div
                  className="w-full bg-primary/20 group-hover:bg-primary transition-all duration-300 rounded-t-sm"
                  style={{ height: \`\${heightPct}%\` }}
                />
                <span className="text-[11px] text-muted-foreground">{months[idx]}</span>
                {/* Tooltip on hover */}
                <div className="absolute -top-8 bg-foreground text-background text-[10px] font-medium py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  $\${val.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/dashboard/RevenueChart.tsx'), revenueChartTsx, 'utf8');

  // dashboard/ExerciseChart.tsx
  const exerciseChartTsx = `import React from "react";
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
                  style={{ height: \`\${(d.target / 100) * 100}%\` }}
                  title="Target"
                />
                <div
                  className="w-1/2 bg-emerald-500 rounded-t-sm"
                  style={{ height: \`\${(d.current / 100) * 100}%\` }}
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
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/dashboard/ExerciseChart.tsx'), exerciseChartTsx, 'utf8');

  // dashboard/TeamMembersCard.tsx
  const teamMembersCardTsx = `import React from "react";
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
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/dashboard/TeamMembersCard.tsx'), teamMembersCardTsx, 'utf8');

  // dashboard/SupportChatCard.tsx
  const supportChatCardTsx = `import React, { useState } from "react";
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
          <div key={idx} className={\`flex \${m.isSelf ? "justify-end" : "justify-start"}\`}>
            <div
              className={\`max-w-[80%] rounded-lg px-3 py-2 text-xs \${
                m.isSelf ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }\`}
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
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/dashboard/SupportChatCard.tsx'), supportChatCardTsx, 'utf8');

  // dashboard/RecentPaymentsTable.tsx
  const recentPaymentsTableTsx = `import React from "react";
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
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/dashboard/RecentPaymentsTable.tsx'), recentPaymentsTableTsx, 'utf8');

  // dashboard/PaymentMethodCard.tsx
  const paymentMethodCardTsx = `import React, { useState } from "react";
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
              className={\`flex flex-col items-center justify-center rounded-lg border p-3 text-xs capitalize transition-all \${
                selectedMethod === method
                  ? "border-primary bg-primary/5 font-semibold text-foreground ring-1 ring-primary"
                  : "border-border text-muted-foreground hover:bg-accent/40"
              }\`}
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
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/components/dashboard/PaymentMethodCard.tsx'), paymentMethodCardTsx, 'utf8');

  console.log('📑 Gerando Páginas dos Dashboards (Default, Sales, CRM, AI Analytics, Kanban, AI Chat)...');

  // pages/default/page.tsx (Classic Dashboard)
  const defaultPageTsx = `import React from "react";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { RevenueChart } from "../../components/dashboard/RevenueChart";
import { ExerciseChart } from "../../components/dashboard/ExerciseChart";
import { TeamMembersCard } from "../../components/dashboard/TeamMembersCard";
import { SupportChatCard } from "../../components/dashboard/SupportChatCard";
import { RecentPaymentsTable } from "../../components/dashboard/RecentPaymentsTable";
import { PaymentMethodCard } from "../../components/dashboard/PaymentMethodCard";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { Button } from "../../components/ui/Button";

export default function ClassicDashboardPage() {
  return (
    <DashboardShell activePath="/dashboard/default" breadcrumb={["Dashboards", "Classic Dashboard"]}>
      {/* Promo banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-4 md:p-6 shadow-sm">
        <div>
          <h2 className="text-base md:text-lg font-bold text-foreground">Get This Template</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Download the full source code. Every dashboard and app view in this kit is included.
          </p>
        </div>
        <Button className="whitespace-nowrap text-xs shadow">Download Template</Button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1%"
          isPositive={true}
          icon={<DollarSign className="h-4 w-4" />}
          sparklineData={[30, 40, 35, 50, 48, 65, 75]}
        />
        <MetricCard
          title="Subscriptions"
          value="+2,350"
          change="+180.1%"
          isPositive={true}
          icon={<Users className="h-4 w-4" />}
          sparklineData={[15, 25, 30, 45, 60, 80, 95]}
        />
        <MetricCard
          title="Sales"
          value="+12,234"
          change="+19.0%"
          isPositive={true}
          icon={<CreditCard className="h-4 w-4" />}
          sparklineData={[40, 35, 50, 45, 60, 55, 70]}
        />
        <MetricCard
          title="Active Now"
          value="+573"
          change="+201"
          subtext="since last hour"
          isPositive={true}
          icon={<Activity className="h-4 w-4" />}
          sparklineData={[20, 25, 30, 28, 35, 40, 50]}
        />
      </div>

      {/* Charts & Interactive Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <RevenueChart />
        <ExerciseChart />
      </div>

      {/* Secondary Row: Team, Support Chat, Payment Method */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TeamMembersCard />
        <SupportChatCard />
        <PaymentMethodCard />
      </div>

      {/* Recent Payments Table */}
      <div className="grid grid-cols-1 gap-6">
        <RecentPaymentsTable />
      </div>
    </DashboardShell>
  );
}
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/pages/default/page.tsx'), defaultPageTsx, 'utf8');

  // pages/ai-analytics/page.tsx
  const aiAnalyticsPageTsx = `import React from "react";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Bot, Cpu, Zap, DollarSign } from "lucide-react";

export default function AIAnalyticsDashboardPage() {
  const models = [
    { name: "GPT-4o", requests: "1.2M", cost: "$142.50", latency: "380ms", share: 45 },
    { name: "Claude 3.5 Sonnet", requests: "850K", cost: "$88.20", latency: "420ms", share: 32 },
    { name: "DeepSeek R1", requests: "420K", cost: "$12.10", latency: "650ms", share: 15 },
    { name: "Gemini 1.5 Flash", requests: "310K", cost: "$3.00", latency: "210ms", share: 8 }
  ];

  return (
    <DashboardShell activePath="/dashboard/ai-analytics" breadcrumb={["Dashboards", "AI Analytics"]}>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">AI Analytics & LLM Observability</h1>
        <p className="text-xs text-muted-foreground">Monitor token consumption, prompt latency, and model cost attribution.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Volume"
          value="2,450,230"
          change="+14.2%"
          subtext="tokens generated"
          icon={<Cpu className="h-4 w-4" />}
          sparklineData={[40, 50, 65, 70, 85, 90, 110]}
        />
        <MetricCard
          title="Total Interactions"
          value="14,302"
          change="+8.6%"
          subtext="user prompts"
          icon={<Bot className="h-4 w-4" />}
          sparklineData={[20, 28, 35, 42, 50, 58, 64]}
        />
        <MetricCard
          title="Estimated Cost"
          value="$245.80"
          change="-5.4%"
          isPositive={false}
          subtext="this billing cycle"
          icon={<DollarSign className="h-4 w-4" />}
          sparklineData={[50, 48, 45, 42, 40, 38, 35]}
        />
        <MetricCard
          title="Cache Hit Rate"
          value="68.4%"
          change="+12.0%"
          subtext="of 80% target"
          icon={<Zap className="h-4 w-4" />}
          sparklineData={[30, 35, 42, 50, 58, 62, 68]}
        />
      </div>

      {/* Model Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage by Model</CardTitle>
            <CardDescription>Breakdown of requests, cost and latency across active LLMs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {models.map(m => (
              <div key={m.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">{m.name}</span>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span>{m.requests} reqs</span>
                    <span className="font-medium text-foreground">{m.cost}</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: \`\${m.share}%\` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cache & Efficiency</CardTitle>
            <CardDescription>Prompt caching performance and inference savings.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center py-8 space-y-4">
            <div className="relative flex items-center justify-center h-32 w-32 rounded-full border-8 border-emerald-500/20 border-t-emerald-500">
              <span className="text-2xl font-bold text-foreground">68.4%</span>
            </div>
            <p className="text-xs text-center text-muted-foreground max-w-xs">
              Prompt caching saved approximately <span className="font-semibold text-foreground">$128.40</span> in token expenditure this month.
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/pages/ai-analytics/page.tsx'), aiAnalyticsPageTsx, 'utf8');

  // pages/sales/page.tsx
  const salesPageTsx = `import React from "react";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { DollarSign, ShoppingBag, ArrowUpRight, TrendingUp } from "lucide-react";

export default function SalesDashboardPage() {
  const products = [
    { name: "Sports Shoes", sold: "316 items", revenue: "$28,440" },
    { name: "Black T-Shirt", sold: "274 items", revenue: "$8,220" },
    { name: "Wireless Headphones", sold: "189 items", revenue: "$24,570" },
    { name: "Smart Watch V2", sold: "142 items", revenue: "$42,600" }
  ];

  return (
    <DashboardShell activePath="/dashboard/sales" breadcrumb={["Dashboards", "Sales"]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Balance" value="$103,045" change="+3.6%" icon={<DollarSign className="h-4 w-4" />} />
        <MetricCard title="Total Income" value="$78,000" change="+2.5%" icon={<ArrowUpRight className="h-4 w-4" />} />
        <MetricCard title="Total Expense" value="$15,010" change="+6.0%" isPositive={false} icon={<TrendingUp className="h-4 w-4" />} />
        <MetricCard title="Sales Tax" value="$9,090" change="+5.0%" icon={<ShoppingBag className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
            <CardDescription>Top-selling products and gross volume.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {products.map(p => (
              <div key={p.name} className="flex items-center justify-between py-2 border-b border-border/40 last:border-0">
                <div>
                  <div className="text-xs font-semibold text-foreground">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">{p.sold} sold</div>
                </div>
                <div className="text-xs font-bold text-foreground">{p.revenue}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Track Order Status</CardTitle>
            <CardDescription>Live fulfillment and delivery progression.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">New Orders</span>
              <span className="font-bold text-foreground">43 orders (35%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "35%" }} />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">In Progress</span>
              <span className="font-bold text-foreground">12 orders (10%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "10%" }} />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Delivered</span>
              <span className="font-bold text-foreground">68 orders (55%)</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "55%" }} />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/pages/sales/page.tsx'), salesPageTsx, 'utf8');

  // pages/crm/page.tsx
  const crmPageTsx = `import React from "react";
import { DashboardShell } from "../../components/layout/DashboardShell";
import { MetricCard } from "../../components/dashboard/MetricCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../components/ui/Card";
import { Users, BarChart3, DollarSign, Target } from "lucide-react";

export default function CRMDashboardPage() {
  const pipeline = [
    { stage: "Lead", deals: 235, value: "$420,500", pct: 38 },
    { stage: "Qualified", deals: 146, value: "$267,800", pct: 24 },
    { stage: "Proposal", deals: 84, value: "$192,400", pct: 18 },
    { stage: "Negotiation", deals: 42, value: "$110,000", pct: 12 },
    { stage: "Won", deals: 31, value: "$85,200", pct: 8 }
  ];

  return (
    <DashboardShell activePath="/dashboard/crm" breadcrumb={["Dashboards", "CRM"]}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Customers" value="1,890" change="+10.4%" icon={<Users className="h-4 w-4" />} />
        <MetricCard title="Total Deals" value="1,300" change="-0.8%" isPositive={false} icon={<BarChart3 className="h-4 w-4" />} />
        <MetricCard title="Pipeline Revenue" value="$435,578" change="+20.1%" icon={<DollarSign className="h-4 w-4" />} />
        <MetricCard title="Target Progress" value="82%" change="+5.2%" icon={<Target className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <CardDescription>Active opportunities distributed by stage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pipeline.map(p => (
              <div key={p.stage} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-foreground">{p.stage}</span>
                  <span className="text-muted-foreground">{p.deals} deals · {p.value} ({p.pct}%)</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: \`\${p.pct * 2}%\` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Leads by Source</CardTitle>
            <CardDescription>Acquisition channels breakdown.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { source: "Social Media", pct: 42, color: "bg-blue-500" },
              { source: "Organic Search", pct: 28, color: "bg-emerald-500" },
              { source: "Referral", pct: 18, color: "bg-purple-500" },
              { source: "Direct", pct: 12, color: "bg-amber-500" }
            ].map(s => (
              <div key={s.source} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className={\`h-2.5 w-2.5 rounded-full \${s.color}\`} />
                  <span className="text-muted-foreground">{s.source}</span>
                </div>
                <span className="font-bold text-foreground">{s.pct}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/pages/crm/page.tsx'), crmPageTsx, 'utf8');

  // pages/kanban/page.tsx
  const kanbanPageTsx = `import React, { useState } from "react";
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
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/pages/kanban/page.tsx'), kanbanPageTsx, 'utf8');

  // pages/ai-chat/page.tsx
  const aiChatPageTsx = `import React, { useState } from "react";
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
        text: \`Here is the latest insight regarding "\${userMsg}": all systems are currently operational with 99.98% uptime and positive ROI across all acquisition channels.\`
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
            <div key={idx} className={\`flex gap-3 \${m.sender === "user" ? "justify-end" : "justify-start"}\`}>
              {m.sender === "assistant" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div
                className={\`max-w-[75%] rounded-xl px-4 py-3 text-xs leading-relaxed \${
                  m.sender === "user"
                    ? "bg-primary text-primary-foreground font-medium rounded-tr-none"
                    : "bg-muted text-foreground border border-border/50 rounded-tl-none"
                }\`}
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
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'src/pages/ai-chat/page.tsx'), aiChatPageTsx, 'utf8');

  // package.json
  const packageJson = {
    name: "shadcnuikit-dashboards",
    version: "2.0.0",
    description: "Complete UI structure and components from https://shadcnuikit.com/dashboard/default (Classic, Sales, CRM, AI Analytics, Kanban, AI Chat)",
    private: true,
    scripts: {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    dependencies: {
      "clsx": "^2.1.0",
      "lucide-react": "^0.344.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "tailwind-merge": "^2.2.1"
    },
    devDependencies: {
      "@types/node": "^20.11.24",
      "@types/react": "^18.2.61",
      "@types/react-dom": "^18.2.19",
      "autoprefixer": "^10.4.18",
      "postcss": "^8.4.35",
      "tailwindcss": "^3.4.1",
      "typescript": "^5.3.3"
    }
  };
  fs.writeFileSync(path.join(TARGET_DIR, 'package.json'), JSON.stringify(packageJson, null, 2), 'utf8');

  // INDEX.md
  const indexMd = `# 💎 Shadcn UI Kit Dashboards PRO

> **Referência Oficial**: [https://shadcnuikit.com/dashboard/default](https://shadcnuikit.com/dashboard/default)  
> **Conteúdo**: Estrutura completa de Layout, UI Primitives, Widgets e 5 Dashboards Especializados + 2 Apps (Kanban e AI Chat).  
> **Localização**: \`shadcnuikit-dashboards/\`

---

## 📁 Estrutura do Pacote

\`\`\`
shadcnuikit-dashboards/
├── live-preview/              # Snapshot standalone offline completo clonado do site oficial
│   ├── index.html             # HTML com DOM hidratado
│   ├── styles/                # CSS compilado e inline
│   └── assets/                # Imagens, logos e vetores
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppSidebar.tsx          # Sidebar expansível/colapsável com grupos, busca ⌘K e badges
│   │   │   ├── DashboardHeader.tsx     # Header com breadcrumbs, quick search, tema e perfil
│   │   │   └── DashboardShell.tsx      # Container universal com suporte a Dark/Light mode
│   │   ├── ui/                         # Primitivos Shadcn UI puros
│   │   │   ├── Card.tsx                # Card, CardHeader, CardTitle, CardDescription, CardContent
│   │   │   ├── Button.tsx              # Button com variants (default, destructive, outline, ghost)
│   │   │   ├── Badge.tsx               # Badge de status (default, success, destructive, secondary)
│   │   │   └── Avatar.tsx              # Avatar com fallback automático
│   │   └── dashboard/                  # Widgets especializados do Dashboard Default
│   │       ├── MetricCard.tsx          # Card KPI com valor, percentual e micro-sparkline SVG
│   │       ├── RevenueChart.tsx        # Gráfico de receita mensal interativo com tooltips
│   │       ├── ExerciseChart.tsx       # Gráfico de barras duplas de atividade física
│   │       ├── TeamMembersCard.tsx     # Card de gestão de equipe com papéis de acesso
│   │       ├── SupportChatCard.tsx     # Widget de chat integrado no dashboard
│   │       ├── RecentPaymentsTable.tsx # Tabela de transações com status e ações
│   │       └── PaymentMethodCard.tsx   # Gerenciador de cartão, PayPal e Apple Pay
│   ├── pages/
│   │   ├── default/page.tsx   # Classic Dashboard (Total Revenue, Subscriptions, Sales, Active Now)
│   │   ├── sales/page.tsx     # Sales Dashboard (Balance, Income, Best Selling, Order Tracking)
│   │   ├── crm/page.tsx       # CRM Dashboard (Deals, Pipeline Funnel, Leads by Source)
│   │   ├── ai-analytics/page.tsx # AI Analytics (Token volume, Model usage, Cost, Cache rate)
│   │   ├── kanban/page.tsx    # Kanban App (Sprint board com colunas e prioridades)
│   │   └── ai-chat/page.tsx   # AI Chat App (Interface conversacional multi-turn com modelos)
│   └── styles/
│       ├── globals.css        # Variáveis completas Shadcn UI (Light + Dark)
│       └── tailwind.config.js # Configuração do Tailwind com sistema de design tokens
├── package.json               # Dependências peer e scripts
└── INDEX.md                   # Documentação detalhada deste pacote
\`\`\`

---

## 📊 Dashboards Incluídos

| Dashboard | Rota no Kit | Descrição | Principais Widgets |
| --- | --- | --- | --- |
| **Classic Dashboard** | [\`src/pages/default/page.tsx\`](./src/pages/default/page.tsx) | O dashboard principal de \`shadcnuikit.com/dashboard/default\` | 4 KPI Cards, Revenue Chart, Exercise Activity, Team Roster, Support Chat, Recent Payments Table, Payment Method Tabs |
| **Sales Dashboard** | [\`src/pages/sales/page.tsx\`](./src/pages/sales/page.tsx) | Foco em faturamento, despesas e vendas de produtos | Total Balance, Income, Expense, Tax, Best Selling Products, Order Status Tracker |
| **CRM Dashboard** | [\`src/pages/crm/page.tsx\`](./src/pages/crm/page.tsx) | Pipeline comercial e gestão de oportunidades | Customers, Deals, Pipeline Funnel (Lead, Qualified, Proposal, Won), Leads by Source |
| **AI Analytics** | [\`src/pages/ai-analytics/page.tsx\`](./src/pages/ai-analytics/page.tsx) | Observabilidade de tokens e custos de IA | Token Volume, Interactions, Cost, Cache Hit Rate, Model Usage Breakdown (GPT-4o, Claude 3.5, DeepSeek) |
| **Kanban App** | [\`src/pages/kanban/page.tsx\`](./src/pages/kanban/page.tsx) | Gestão de tarefas ágeis | Colunas Backlog, In Progress, Review, Done com badges de prioridade |
| **AI Chat App** | [\`src/pages/ai-chat/page.tsx\`](./src/pages/ai-chat/page.tsx) | Assistente inteligente integrado | Conversação multi-turn, seletor de modelos, upload de anexo e input por voz |

---

## 🚀 Como Executar ou Integrar no seu Projeto

1. **Instale as dependências**:
\`\`\`bash
npm install lucide-react clsx tailwind-merge
\`\`\`

2. **Copie a pasta de componentes**:
Copie \`src/components/\` e \`src/styles/\` para o seu projeto Next.js ou React.

3. **Visualize o clone ao vivo**:
Abra \`live-preview/index.html\` diretamente no seu navegador para ver o clone exato e responsivo extraído do site ao vivo!
`;
  fs.writeFileSync(path.join(TARGET_DIR, 'INDEX.md'), indexMd, 'utf8');

  console.log('\n✅ Shadcn UI Kit Dashboards empacotado com sucesso!');
  console.log(`📑 Documentação: ${path.join(TARGET_DIR, 'INDEX.md')}`);
}

run().catch(err => {
  console.error('❌ Erro no empacotamento:', err);
  process.exit(1);
});
