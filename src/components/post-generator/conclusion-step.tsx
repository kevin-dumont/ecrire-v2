"use client";

import { useState } from "react";
import { PostData } from "@/app/dashboard/post/page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Copy, Check } from "lucide-react";
import { generateConclusions } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

interface ConclusionStepProps {
  postData: PostData;
  setPostData: (data: PostData) => void;
}

export default function ConclusionStep({
  postData,
  setPostData,
}: ConclusionStepProps) {
  const [conclusions, setConclusions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateNewConclusions = async () => {
    if (!postData.type || !postData.selectedBody) {
      toast({
        title: "Information manquante",
        description: "Veuillez d'abord sélectionner le corps du post.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateConclusions(postData);
      if (result.error) {
        throw new Error(result.error);
      }
      if (result.conclusions) {
        setConclusions(result.conclusions);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de générer de nouvelles conclusions. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    const fullPost = `${postData.selectedHook}\n\n${postData.selectedBody}\n\n${postData.selectedConclusion}`;
    await navigator.clipboard.writeText(fullPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Post copié !",
      description: "Le contenu a été copié dans le presse-papier.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">
          Conclusion et Call-to-Action
        </h2>
        <p className="text-muted-foreground mb-6">
          Finalisez votre post avec une conclusion engageante
        </p>
      </div>

      {conclusions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Cliquez sur le bouton ci-dessous pour générer des conclusions
          </p>
          <Button
            onClick={generateNewConclusions}
            disabled={isGenerating}
            className="button-gradient"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
            />
            Générer des conclusions
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {conclusions.map((conclusion, index) => (
              <Card
                key={index}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  postData.selectedConclusion === conclusion
                    ? "border-primary ring-2 ring-primary ring-opacity-50"
                    : ""
                }`}
                onClick={() =>
                  setPostData({ ...postData, selectedConclusion: conclusion })
                }
              >
                <p>{conclusion}</p>
              </Card>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={generateNewConclusions}
              disabled={isGenerating}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
              />
              Générer de nouvelles conclusions
            </Button>

            <Button
              variant="default"
              onClick={copyToClipboard}
              disabled={
                !postData.selectedHook ||
                !postData.selectedBody ||
                !postData.selectedConclusion
              }
              className="button-gradient"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copié !
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copier le post
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}