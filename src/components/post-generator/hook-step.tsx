"use client";

import { useState } from "react";
import { PostData } from "@/app/dashboard/post/page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";

interface HookStepProps {
  postData: PostData;
  setPostData: (data: PostData) => void;
  hooks: string[];
  onGenerateHooks: () => Promise<void>;
  isGenerating: boolean;
  isInitialLoad: boolean;
}

export default function HookStep({
  postData,
  setPostData,
  hooks,
  onGenerateHooks,
  isGenerating,
  isInitialLoad,
}: HookStepProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;
  const hooksPerPage = 5;

  const handleGenerateMore = () => {
    if (attempts < maxAttempts) {
      onGenerateHooks();
      setAttempts(attempts + 1);
    }
  };

  const startIndex = currentPage * hooksPerPage;
  const currentHooks = hooks.slice(startIndex, startIndex + hooksPerPage);
  const totalPages = Math.ceil(hooks.length / hooksPerPage);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">
          Choisissez votre accroche
        </h2>
        <p className="text-muted-foreground mb-6">
          Sélectionnez l&apos;accroche qui captera le mieux l&apos;attention de
          votre audience
        </p>
      </div>

      {isInitialLoad && isGenerating ? (
        <div className="flex justify-center items-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : hooks.length > 0 ? (
        <div className="relative">
          <div className={`space-y-4 ${isGenerating ? "opacity-50" : ""}`}>
            {currentHooks.map((hook, index) => (
              <Card
                key={index}
                className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                  postData.selectedHook === hook
                    ? "border-primary ring-2 ring-primary ring-opacity-50"
                    : ""
                }`}
                onClick={() => setPostData({ ...postData, selectedHook: hook })}
              >
                <p>
                  {hook.split("\n").map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </p>
              </Card>
            ))}
          </div>

          {isGenerating && (
            <div className="absolute inset-0 flex justify-center items-center">
              <RefreshCw className="h-8 w-8 animate-spin text-white" />
            </div>
          )}

          {totalPages > 1 && (
            <div
              className={`flex justify-between items-center mt-4 ${
                isGenerating ? "opacity-50" : ""
              }`}
            >
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
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Impossible de générer des accroches. Veuillez réessayer.
          </p>
          <Button
            onClick={handleGenerateMore}
            disabled={isGenerating || attempts >= maxAttempts}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
            />
            Réessayer ({maxAttempts - attempts} restantes)
          </Button>
        </div>
      )}

      {!isInitialLoad && (
        <div className="flex justify-center mt-4">
          <Button
            variant="outline"
            onClick={handleGenerateMore}
            disabled={isGenerating || attempts >= maxAttempts}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
            />
            Générer de nouvelles accroches ({maxAttempts - attempts} restantes)
          </Button>
        </div>
      )}

      {attempts >= maxAttempts && (
        <p className="text-muted-foreground mb-4 text-sm text-center">
          Vous avez atteint le nombre maximum de tentatives.
        </p>
      )}
    </div>
  );
}
