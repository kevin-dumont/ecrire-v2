"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PostPreview } from "@/components/post-generator/post-preview";
import { PostProvider, usePostContext } from "@/contexts/PostContext";

const MAX_VISIBLE_CHARS = 300;

function PostGeneratorContent() {
  const { postData, currentStep, setCurrentStep, isNextEnabled, steps } =
    usePostContext();
  const [isExpanded, setIsExpanded] = useState(false);

  const CurrentStepComponent = steps[currentStep - 1].component;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getDisplayText = () => {
    const fullText = `${
      postData.selectedHook || "Votre accroche apparaîtra ici..."
    }${postData.selectedBody ? "\n\n" + postData.selectedBody : ""}`;

    if (!isExpanded && fullText.length > MAX_VISIBLE_CHARS) {
      return fullText.slice(0, MAX_VISIBLE_CHARS);
    }

    return fullText;
  };

  const shouldShowSeeMore = () => {
    const fullText = `${postData.selectedHook || ""}${
      postData.selectedBody ? "\n\n" + postData.selectedBody : ""
    }`;
    return fullText.length > MAX_VISIBLE_CHARS;
  };

  return (
    <div className="w-full max-w-full p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="flex-1 p-4 sm:p-6">
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
              <h1 className="text-2xl font-bold">Créer un post</h1>
              <span className="text-sm text-muted-foreground">
                Étape {currentStep} sur {steps.length}
              </span>
            </div>
            <div className="relative">
              <div className="overflow-hidden h-2 mb-2 flex rounded bg-secondary">
                <div
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  className="transition-all duration-500 ease-in-out bg-primary"
                />
              </div>
            </div>
          </div>

          <CurrentStepComponent />

          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-14">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentStep === 1}
              className="order-1 sm:order-none"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Retour
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isNextEnabled || currentStep === steps.length}
              className="order-0 sm:order-none"
            >
              {currentStep === steps.length ? (
                "Terminer"
              ) : (
                <>
                  Suivant <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </Card>

        {currentStep > 3 && (
          <PostPreview
            getDisplayText={getDisplayText}
            isExpanded={isExpanded}
            postData={postData}
            setIsExpanded={setIsExpanded}
            shouldShowSeeMore={shouldShowSeeMore}
          />
        )}
      </div>
    </div>
  );
}

export default function PostGeneratorPage() {
  return (
    <PostProvider>
      <PostGeneratorContent />
    </PostProvider>
  );
}
