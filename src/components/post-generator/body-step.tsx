"use client";

import { useState } from "react";
import { PostData } from "@/app/dashboard/post/page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  RefreshCw,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface BodyStepProps {
  postData: PostData;
  setPostData: (data: PostData) => void;
  bodies: string[];
  onGenerateBodies: () => Promise<void>;
  isBodyGenerating: boolean;
  isBodyInitialized: boolean;
}

export default function BodyStep({
  postData,
  setPostData,
  bodies,
  onGenerateBodies,
  isBodyGenerating,
  isBodyInitialized,
}: BodyStepProps) {
  const [copied, setCopied] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;
  const bodiesPerPage = 3;
  const { toast } = useToast();

  const startIndex = currentPage * bodiesPerPage;
  const currentBodies = bodies.slice(startIndex, startIndex + bodiesPerPage);
  const totalPages = Math.ceil(bodies.length / bodiesPerPage);

  const handleGenerateMore = () => {
    if (attempts < maxAttempts) {
      onGenerateBodies();
      setAttempts(attempts + 1);
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

      {isBodyInitialized && isBodyGenerating ? (
        <div className="absolute inset-0 flex justify-center items-center">
          <RefreshCw className="h-8 w-8 animate-spin text-white mr-3" />
          Génération des contenus en cours...
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {currentBodies.map((body, index) => (
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

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
              >
                <ChevronLeft className="h-4 w-4" />
                Précédent
              </Button>

              <span className="text-sm text-muted-foreground">
                Page {currentPage + 1} sur {totalPages}
              </span>

              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
                }
                disabled={currentPage === totalPages - 1}
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={handleGenerateMore}
              disabled={isBodyGenerating || attempts >= maxAttempts}
            >
              <RefreshCw
                className={`mr-2 h-5 w-5 stroke-[1.5] ${
                  isBodyGenerating ? "animate-spin" : ""
                }`}
              />
              Générer de nouveaux contenus ({maxAttempts - attempts} restantes)
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

      {attempts >= maxAttempts && (
        <p className="text-muted-foreground mb-4 text-sm text-center">
          Vous avez atteint le nombre maximum de tentatives.
        </p>
      )}
    </div>
  );
}
