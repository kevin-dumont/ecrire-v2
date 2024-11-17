"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { PenLine, Settings, Menu, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  const navigation = [
    {
      name: "Nouveau Post",
      href: "/dashboard/post",
      icon: PenLine,
    },
    {
      name: "Paramètres",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 border-b border-border/40 bg-background/80 backdrop-blur-xl z-50 px-4 flex items-center justify-between feature-card">
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="h-5 w-5 stroke-[1.5] text-muted-foreground" onClick={() => setIsOpen(true)} />
        </Button>
        <span className="text-base font-semibold">LinkedPost</span>
        <div className="w-9" /> {/* Spacer pour centrer le titre */}
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="left" 
          className="p-0 w-64 border-r border-border/40 bg-background/80 backdrop-blur-xl feature-card"
        >
          <div className="h-full bg-transparent">
            <div className="h-14 border-b border-border/40 px-6 flex items-center">
              <span className="text-base font-semibold">LinkedPost</span>
            </div>
            <nav className="flex-1 py-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Button
                    key={item.name}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "relative w-full h-10 rounded-none justify-start",
                      isActive ? "bg-primary/10 hover:bg-primary/20" : "hover:bg-primary/5"
                    )}
                    onClick={() => {
                      window.location.href = item.href;
                      setIsOpen(false);
                    }}
                  >
                    <Icon className="absolute left-4 h-5 w-5 stroke-[1.5] text-muted-foreground" />
                    <span className="ml-14 text-muted-foreground">
                      {item.name}
                    </span>
                  </Button>
                );
              })}
            </nav>
            <div className="border-t border-border/40">
              <Button
                variant="ghost"
                className="relative w-full h-10 rounded-none justify-start hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  handleSignOut();
                  setIsOpen(false);
                }}
              >
                <LogOut className="absolute left-4 h-5 w-5 stroke-[1.5]" />
                <span className="ml-14">Déconnexion</span>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          navigation={navigation}
          pathname={pathname}
          handleSignOut={handleSignOut}
        />
      </div>

      {/* Main content */}
      <main className="md:pl-14 pt-14 md:pt-0">
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
}