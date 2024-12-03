import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function MobileHeader({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 h-14 border-b border-border/50 bg-background/80 backdrop-blur-xl z-50 px-4 flex items-center justify-between feature-card">
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Menu
          className="h-5 w-5 stroke-[1.5] text-muted-foreground"
          onClick={() => setIsOpen(true)}
        />
      </Button>
      <span className="text-white font-semibold">LinkedPost</span>
      <div className="w-9" />
    </div>
  );
}
