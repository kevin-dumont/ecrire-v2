"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { PenLine, Settings } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileSheet from "@/components/layout/MobileSheet";
import Sidebar from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
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
      <MobileHeader setIsOpen={setIsOpen} />
      <MobileSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navigation={navigation}
        pathname={pathname}
        handleSignOut={handleSignOut}
      />

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          navigation={navigation}
          pathname={pathname}
          handleSignOut={handleSignOut}
        />
      </div>

      {/* Main content */}
      <main className="md:pl-14 pt-14 md:pt-0">{children}</main>
    </div>
  );
}
