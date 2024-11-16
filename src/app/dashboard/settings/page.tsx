import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Paramètres</h1>
        
        <div className="grid gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Paramètres du compte
            </h2>
            <p className="text-muted-foreground">
              Cette section sera bientôt disponible...
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}