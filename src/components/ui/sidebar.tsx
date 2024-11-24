"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "../ThemeSwitcher";

interface SidebarProps {
  navigation: { name: string; href: string; icon: React.ComponentType }[];
  pathname: string;
  handleSignOut: () => void;
  onNavigate?: () => void;
}

export default function Sidebar({
  navigation,
  pathname,
  handleSignOut,
  onNavigate,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen border-r border-border bg-background/80 backdrop-blur-xl transition-all duration-300 z-50",
        isExpanded ? "w-64" : "w-14 hover:w-64 group"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-full flex-col">
        <div className="h-14 border-b border-border">
          <div className="h-full px-4 flex items-center">
            <Link
              href="/dashboard"
              className={cn(
                "ml-[2px] text-lg font-semibold transition-opacity duration-300",
                !isExpanded && "opacity-0 group-hover:opacity-100"
              )}
              onClick={onNavigate}
            >
              LinkedPost
            </Link>
          </div>
        </div>

        <nav className="flex-1 py-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.name} href={item.href} onClick={onNavigate}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "relative w-full h-14 rounded-none justify-start",
                    isActive
                      ? "bg-primary/10 hover:bg-primary/20"
                      : "hover:bg-primary/5"
                  )}
                >
                  <Icon className="absolute left-4 h-5 w-5 stroke-[1.5] text-muted-foreground" />
                  <span
                    className={cn(
                      "absolute left-14 transition-opacity duration-300 text-muted-foreground",
                      !isExpanded && "opacity-0 group-hover:opacity-100"
                    )}
                  >
                    {item.name}
                  </span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border">
          <Button
            variant="ghost"
            className={cn(
              "relative w-full h-14 rounded-none justify-start hover:bg-primary/5",
              "text-muted-foreground hover:text-foreground"
            )}
            onClick={() => {
              handleSignOut();
              onNavigate?.();
            }}
          >
            <LogOut className="absolute left-4 h-5 w-5 stroke-[1.5]" />
            <span
              className={cn(
                "absolute left-14 transition-opacity duration-300",
                !isExpanded && "opacity-0 group-hover:opacity-100"
              )}
            >
              Déconnexion
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
