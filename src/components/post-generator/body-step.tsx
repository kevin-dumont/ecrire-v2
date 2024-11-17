"use client";

import { useState } from "react";
import { PostData } from "@/app/dashboard/post/page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Copy, Check } from "lucide-react";
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
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateNewBodies = async () => {
    if (!postData.type || !postData.ideas || !postData.selectedHook) {
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
    } catch {
      toast({
        title: "Erreur",
        description:
          "Impossible de générer de nouveaux contenus. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    const fullPost = `${postData.selectedHook}\n\n${postData.selectedBody}`;
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
        <h2 className="text-lg font-semibold mb-2">Contenu du post</h2>
        <p className="text-muted-foreground mb-6">
          Choisissez et personnalisez le contenu de votre post
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
              className={`mr-2 h-5 w-5 stroke-[1.5] ${isGenerating ? "animate-spin" : ""}`}
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

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={generateNewBodies}
              disabled={isGenerating}
            >
              <RefreshCw
                className={`mr-2 h-5 w-5 stroke-[1.5] ${isGenerating ? "animate-spin" : ""}`}
              />
              Générer de nouveaux contenus
            </Button>

            <Button
              variant="default"
              onClick={copyToClipboard}
              disabled={!postData.selectedHook || !postData.selectedBody}
              className="button-gradient"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-5 w-5 stroke-[1.5]" /> Copié !
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-5 w-5 stroke-[1.5]" /> Copier le post
                </>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}