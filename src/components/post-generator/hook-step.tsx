"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { usePostContext } from "@/contexts/PostContext";
import { StepHeader } from "@/components/post-generator/step-header";

export default function HookStep() {
  const {
    postData,
    setPostData,
    hookState: { hooks, isGenerating, isInitialLoad },
    generateNewHooks,
    currentStep,
    setCurrentStep,
  } = usePostContext();

  const [currentPage, setCurrentPage] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;
  const hooksPerPage = 5;

  const handleGenerateMore = async () => {
    if (attempts < maxAttempts) {
      await generateNewHooks();
      setAttempts(attempts + 1);
      setCurrentPage(totalPages);
    }
  };

  const startIndex = currentPage * hooksPerPage;
  const currentHooks = hooks.slice(startIndex, startIndex + hooksPerPage);
  const totalPages = Math.ceil(hooks.length / hooksPerPage);

  const handleNext = () => {
    if (postData.selectedHook) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className="p-8">
      {isInitialLoad && isGenerating ? (
        <div className="flex justify-center items-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mr-3" />
          Génération des accroches en cours...
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

          {isGenerating && !isInitialLoad && (
            <div className="absolute inset-0 flex justify-center items-center bg-white dark:bg-black bg-opacity-70">
              <RefreshCw className="h-8 w-8 animate-spin text-primary" />
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

      <div className="flex justify-between mt-4">
        <Button onClick={handleBack} disabled={currentStep === 1}>
          Retour
        </Button>
        <Button onClick={handleNext} disabled={!postData.selectedHook}>
          Suivant
        </Button>
      </div>
    </Card>
  );
}
