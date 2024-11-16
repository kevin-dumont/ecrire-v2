import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PenSquare } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord</h1>
        
        <div className="grid gap-6">
          <Card className="p-6 feature-card">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Créer un nouveau post
                </h2>
                <p className="text-muted-foreground">
                  Générez un post LinkedIn professionnel en quelques étapes
                </p>
              </div>
              <Link href="/dashboard/post">
                <Button className="button-gradient">
                  <PenSquare className="mr-2 h-4 w-4" />
                  Nouveau post
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}