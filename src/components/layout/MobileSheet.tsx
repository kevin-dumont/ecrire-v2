import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MobileSheet({
  isOpen,
  setIsOpen,
  navigation,
  pathname,
  handleSignOut,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navigation: { name: string; href: string; icon: any }[];
  pathname: string;
  handleSignOut: () => void;
}) {
  return (
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
                    isActive
                      ? "bg-primary/10 hover:bg-primary/20"
                      : "hover:bg-primary/5"
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
  );
}
