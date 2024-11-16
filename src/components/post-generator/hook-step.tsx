"use client";

import { useState, useEffect } from "react";
import { PostData } from "@/app/dashboard/post/page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { generateHooks } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

interface HookStepProps {
  postData: PostData;
  setPostData: (data: PostData) => void;
}

export default function HookStep({ postData, setPostData }: HookStepProps) {
  const [hooks, setHooks] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateNewHooks = async () => {
    if (!postData.type || !postData.subject) {
      toast({
        title: "Information manquante",
        description: "Veuillez d'abord remplir le type et le sujet du post.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateHooks(postData.type, postData.subject);
      
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.hooks && result.hooks.length > 0) {
        setHooks(result.hooks);
      }
    } catch (error) {
      console.error("Error generating hooks:", error);
      toast({
        title: "Erreur",
        description: "Impossible de générer de nouvelles accroches. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (postData.type && postData.subject) {
      generateNewHooks();
    }
  }, [postData.type, postData.subject]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">
          Choisissez votre accroche
        </h2>
        <p className="text-muted-foreground mb-6">
          Sélectionnez l'accroche qui captera le mieux l'attention de votre
          audience
        </p>
      </div>

      {isGenerating ? (
        <div className="flex justify-center items-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : hooks.length > 0 ? (
        <>
          <div className="space-y-4">
            {hooks.map((hook, index) => (
              <Card
                key={index}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  postData.selectedHook === hook
                    ? "border-primary ring-2 ring-primary ring-opacity-50"
                    : ""
                }`}
                onClick={() => setPostData({ ...postData, selectedHook: hook })}
              >
                <p>{hook}</p>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={generateNewHooks}
              disabled={isGenerating}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
              />
              Générer de nouvelles accroches
            </Button>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Impossible de générer des accroches. Veuillez réessayer.
          </p>
          <Button onClick={generateNewHooks} disabled={isGenerating}>
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
            />
            Réessayer
          </Button>
        </div>
      )}
    </div>
  );
}