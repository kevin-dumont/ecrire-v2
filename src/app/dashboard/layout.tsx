"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { PenSquare, Settings, Menu } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
      icon: PenSquare,
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
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border/40 bg-background/80 backdrop-blur-xl z-50 px-4 flex items-center justify-between">
        <span className="text-lg font-semibold">LinkedPost</span>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <div className="h-full bg-background">
              <Sidebar
                navigation={navigation}
                pathname={pathname}
                handleSignOut={handleSignOut}
                onNavigate={() => setIsOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          navigation={navigation}
          pathname={pathname}
          handleSignOut={handleSignOut}
        />
      </div>

      {/* Main content */}
      <main className="md:pl-64 pt-16 md:pt-0">
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
}