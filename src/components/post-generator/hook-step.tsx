"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { usePostContext } from "@/contexts/PostContext";
import { StepHeader } from "@/components/post-generator/step-header";
import { PrevButton } from "./ui/prev-button";
import { NextButton } from "./ui/next-button";
import { cx } from "class-variance-authority";
import { usePagination } from "@/hooks/usePagination";
import { Paginate } from "@/components/ui/Paginate";

const maxAttempts = 3;
const hooksPerPage = 5;

export default function HookStep() {
  const {
    postData,
    setPostData,
    hookState: { hooks, isGenerating, isInitialLoad },
    generateNewHooks,
  } = usePostContext();

  const [attempts, setAttempts] = useState(0);

  const paginate = usePagination({
    items: hooks,
    itemsPerPage: hooksPerPage,
  });

  const handleGenerateMore = async () => {
    if (attempts < maxAttempts) {
      await generateNewHooks();
      setAttempts(attempts + 1);
      paginate.goToLastPage();
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
            {paginate.currentItems.map((hook, index) => (
              <Card
                key={index}
                className={cx(
                  "p-4 cursor-pointer transition-all hover:shadow-md",
                  {
                    "border-primary ring-2 ring-primary ring-opacity-50":
                      postData.selectedHook === hook,
                  }
                )}
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

          <Paginate {...paginate} />
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
              className={cx("h-4 w-4", { "animate-spin": isGenerating })}
            />
            Générer à nouveau ({maxAttempts - attempts} essais restants)
          </Button>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <PrevButton />
        <NextButton validateStep={() => !!postData.selectedHook} />
      </div>
    </Card>
  );
}
