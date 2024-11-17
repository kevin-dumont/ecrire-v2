"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import PostConfigurationStep from "@/components/post-generator/post-configuration-step";
import HookStep from "@/components/post-generator/hook-step";
import BodyStep from "@/components/post-generator/body-step";
import { ArrowLeft, ArrowRight, ThumbsUp, MessageCircle, Repeat2, Send, Eye, EyeOff } from "lucide-react";
import { generateHooks } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    const fullText = `${postData.selectedHook || "Votre accroche apparaîtra ici..."}${
      postData.selectedBody ? "\n\n" + postData.selectedBody : ""
    }`;
    
    if (!isExpanded && fullText.length > MAX_VISIBLE_CHARS) {
      return fullText.slice(0, MAX_VISIBLE_CHARS);
    }
    
    return fullText;
  };

  const shouldShowSeeMore = () => {
    const fullText = `${postData.selectedHook || ""}${postData.selectedBody ? "\n\n" + postData.selectedBody : ""}`;
    return fullText.length > MAX_VISIBLE_CHARS;
  };

  return (
    <div className="w-full max-w-full p-4">
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

        <div className="hidden lg:flex flex-col gap-2 flex-[0.75]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Aperçu</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2"
            >
              {isExpanded ? (
                <>
                  <EyeOff className="h-4 w-4 stroke-[1.5]" />
                  Version pliée
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 stroke-[1.5]" />
                  Version dépliée
                </>
              )}
            </Button>
          </div>
          <Card className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 border border-zinc-200 dark:border-zinc-700">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold text-[15px]">John Doe</h3>
                    <span className="text-sm text-muted-foreground">• 1er</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Digital Marketing Expert</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <span>1j</span>
                    <span>•</span>
                    <span>Modifié</span>
                    <span>•</span>
                    <svg className="w-3 h-3 text-muted-foreground" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.5 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 2.5C9.72589 4.37247 10.7514 6.83247 11 9.4C11.0002 10.2676 10.8502 11.1303 10.5547 11.9547C10.2592 12.7791 9.82281 13.5533 9.26395 14.2447" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 2.5C6.27411 4.37247 5.24864 6.83247 5 9.4C4.99976 10.2676 5.14978 11.1303 5.44531 11.9547C5.74084 12.7791 6.17719 13.5533 6.73605 14.2447" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div className={cn(
                "whitespace-pre-wrap text-[14px] leading-[1.4]",
                !isExpanded && "relative"
              )}>
                {postData.selectedHook || postData.selectedBody ? (
                  <>
                    <div>{getDisplayText()}</div>
                    {shouldShowSeeMore() && !isExpanded && (
                      <div className="absolute bottom-0 left-0 w-full">
                        <div className="relative">
                          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background to-transparent" />
                          <button
                            onClick={() => setIsExpanded(true)}
                            className="relative z-10 text-primary hover:underline text-[14px] font-medium"
                          >
                            ...voir plus
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-muted-foreground">Votre post apparaîtra ici...</div>
                )}
              </div>

              <div className="relative aspect-[1.91/1] w-full rounded-lg overflow-hidden bg-muted">
                <Image
                  src="https://images.unsplash.com/photo-1579403124614-197f69d8187b"
                  alt="Post image"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <ThumbsUp className="h-4 w-4 stroke-[1.5]" />
                  <span>24</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <span>8 commentaires</span>
                  <span>•</span>
                  <span>3 partages</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/40">
                <Button variant="ghost" className="flex-1 text-muted-foreground hover:text-foreground">
                  <ThumbsUp className="mr-2 h-5 w-5 stroke-[1.5]" />
                  J'aime
                </Button>
                <Button variant="ghost" className="flex-1 text-muted-foreground hover:text-foreground">
                  <MessageCircle className="mr-2 h-5 w-5 stroke-[1.5]" />
                  Commenter
                </Button>
                <Button variant="ghost" className="flex-1 text-muted-foreground hover:text-foreground">
                  <Repeat2 className="mr-2 h-5 w-5 stroke-[1.5]" />
                  Partager
                </Button>
                <Button variant="ghost" className="flex-1 text-muted-foreground hover:text-foreground">
                  <Send className="mr-2 h-5 w-5 stroke-[1.5]" />
                  Envoyer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}