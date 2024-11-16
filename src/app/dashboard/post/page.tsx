"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PostTypeStep from "@/components/post-generator/post-type-step";
import SubjectStep from "@/components/post-generator/subject-step";
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
  });

  const steps = [
    {
      title: "Type de Post",
      component: PostTypeStep,
    },
    {
      title: "Sujet",
      component: SubjectStep,
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="p-4 sm:p-6 border-gradient">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold">Créer un post</h1>
            <span className="text-sm text-muted-foreground">
              Étape {currentStep} sur {steps.length}
            </span>
          </div>
          <div className="relative">
            <div className="overflow-hidden h-2 mb-4 flex rounded bg-secondary">
              <div
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
                className="transition-all duration-500 ease-in-out bg-primary"
              />
            </div>
          </div>
        </div>

        <CurrentStepComponent postData={postData} setPostData={setPostData} />

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
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
    </div>
  );
}