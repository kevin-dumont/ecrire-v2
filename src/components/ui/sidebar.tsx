import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

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
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 border-r border-border/40 bg-background/80 backdrop-blur-xl feature-card">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center px-6 border-b border-border/40">
          <Link href="/dashboard" className="text-lg font-semibold" onClick={onNavigate}>
            LinkedPost
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link key={item.name} href={item.href} className="block mb-4" onClick={onNavigate}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="lg"
                  className="w-full justify-start gap-4 rounded-lg"
                >
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-expect-error */}
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/40 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              handleSignOut();
              onNavigate?.();
            }}
          >
            <LogOut className="h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </aside>
  );
}