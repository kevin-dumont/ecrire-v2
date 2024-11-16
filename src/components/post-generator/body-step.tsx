"use client";

import { useState } from "react";
import { PostData } from "@/app/dashboard/post/page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { generateBody } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

interface BodyStepProps {
  postData: PostData;
  setPostData: (data: PostData) => void;
}

export default function BodyStep({ postData, setPostData }: BodyStepProps) {
  const [bodies, setBodies] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateNewBodies = async () => {
    if (!postData.type || !postData.subject || !postData.selectedHook) {
      toast({
        title: "Information manquante",
        description: "Veuillez d'abord sélectionner une accroche.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateBody(postData);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.bodies) {
        setBodies(result.bodies);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer de nouveaux contenus. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Contenu principal</h2>
        <p className="text-muted-foreground mb-6">
          Choisissez et personnalisez le corps de votre post
        </p>
      </div>

      {bodies.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Cliquez sur le bouton ci-dessous pour générer le contenu
          </p>
          <Button
            onClick={generateNewBodies}
            disabled={isGenerating}
            className="button-gradient"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
            />
            Générer le contenu
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {bodies.map((body, index) => (
              <Card
                key={index}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  postData.selectedBody === body
                    ? "border-primary ring-2 ring-primary ring-opacity-50"
                    : ""
                }`}
                onClick={() => setPostData({ ...postData, selectedBody: body })}
              >
                <Textarea
                  value={body}
                  readOnly
                  className="min-h-[200px] resize-none border-none focus-visible:ring-0"
                />
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={generateNewBodies}
              disabled={isGenerating}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
              />
              Générer de nouveaux contenus
            </Button>
          </div>
        </>
      )}
    </div>
  );
}