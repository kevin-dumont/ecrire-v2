"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PostConfigurationStep from "@/components/post-generator/post-configuration-step";
import HookStep from "@/components/post-generator/hook-step";
import BodyStep from "@/components/post-generator/body-step";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { generateHooks } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { PostPreview } from "@/components/post-generator/post-preview";

const MAX_VISIBLE_CHARS = 300;

export type PostData = {
  type: "TOFU" | "MOFU" | "BOFU" | null;
  ideas: string;
  selectedHook: string;
  selectedBody: string;
  tone: string;
};

const steps = [
  {
    title: "Configuration du Post",
    component: PostConfigurationStep,
    validate: (data: PostData) => data.type && data.ideas && data.tone,
  },
  {
    title: "Accroche",
    component: HookStep,
    validate: (data: PostData) => data.selectedHook !== "",
  },
  {
    title: "Corps du Post",
    component: BodyStep,
    validate: (data: PostData) => data.selectedBody !== "",
  },
];

export default function PostGeneratorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [postData, setPostData] = useState<PostData>({
    type: null,
    ideas: "",
    selectedHook: "",
    selectedBody: "",
    tone: "normal",
  });

  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [hookState, setHookState] = useState({
    hooks: [] as string[],
    isGenerating: false,
    isInitialLoad: true,
  });

  const { toast } = useToast();

  useEffect(() => {
    const currentValidation = steps[currentStep - 1].validate;
    setIsNextEnabled(!!currentValidation(postData));
  }, [postData, currentStep]);

  const generateNewHooks = useCallback(async () => {
    if (!postData.type || !postData.ideas) {
      toast({
        title: "Information manquante",
        description: "Veuillez d'abord remplir le type et les idées du post.",
        variant: "destructive",
      });
      return;
    }

    setHookState((prevState) => ({ ...prevState, isGenerating: true }));

    try {
      const result = await generateHooks(postData.type, postData.ideas);

      if (result.error) {
        throw new Error(result.error);
      }
      if (result.hooks && result.hooks.length > 0) {
        setHookState((prevState) => ({
          ...prevState,
          hooks: [...prevState.hooks, ...result.hooks],
        }));
      }
    } catch (error) {
      console.error("Error generating hooks:", error);
      toast({
        title: "Erreur",
        description:
          "Impossible de générer de nouvelles accroches. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setHookState((prevState) => ({
        ...prevState,
        isGenerating: false,
        isInitialLoad: false,
      }));
    }
  }, [postData.type, postData.ideas, toast]);

  useEffect(() => {
    if (currentStep === 2 && hookState.hooks.length === 0) {
      generateNewHooks();
    }
  }, [currentStep, hookState.hooks.length, generateNewHooks]);

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

          <CurrentStepComponent
            postData={postData}
            setPostData={setPostData}
            hooks={hookState.hooks}
            onGenerateHooks={generateNewHooks}
            isGenerating={hookState.isGenerating}
            isInitialLoad={hookState.isInitialLoad}
          />

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

        {currentStep > 2 && (
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
