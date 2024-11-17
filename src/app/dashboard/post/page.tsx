"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PostConfigurationStep from "@/components/post-generator/post-configuration-step";
import HookStep from "@/components/post-generator/hook-step";
import BodyStep from "@/components/post-generator/body-step";
import ConclusionStep from "@/components/post-generator/conclusion-step";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type PostData = {
  type: "TOFU" | "MOFU" | "BOFU" | null;
  subject: string;
  ideas: string;
  selectedHook: string;
  selectedBody: string;
  selectedConclusion: string;
  tone: string;
};

export default function PostGeneratorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [postData, setPostData] = useState<PostData>({
    type: null,
    subject: "",
    ideas: "",
    selectedHook: "",
    selectedBody: "",
    selectedConclusion: "",
    tone: "normal",
  });

  const steps = [
    {
      title: "Configuration du Post",
      component: PostConfigurationStep,
    },
    {
      title: "Accroche",
      component: HookStep,
    },
    {
      title: "Corps du Post",
      component: BodyStep,
    },
    {
      title: "Conclusion",
      component: ConclusionStep,
    },
  ];

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

  return (
    <div className="w-full max-w-full px-2 py-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="flex-1 p-4 sm:p-6 border-gradient">
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

          <CurrentStepComponent postData={postData} setPostData={setPostData} />

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
              disabled={currentStep === steps.length}
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

        <div className="hidden lg:flex flex-col gap-2 flex-[0.75]">
          <h2 className="text-lg font-semibold">Aperçu</h2>
          <Card className="p-4">
            <h2 className="text-md font-semibold">Accroche</h2>
            <p className="text-sm text-muted-foreground">
              {postData.selectedHook || "Pas d'accroche sélectionnée"}
            </p>
          </Card>
          <Card className="p-4">
            <h2 className="text-md font-semibold">Corps</h2>
            <p className="text-sm text-muted-foreground">
              {postData.selectedBody || "Pas de corps sélectionné"}
            </p>
          </Card>
          <Card className="p-4">
            <h2 className="text-md font-semibold">Conclusion</h2>
            <p className="text-sm text-muted-foreground">
              {postData.selectedConclusion || "Pas de conclusion sélectionnée"}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
