"use client";

import { useState } from "react";
import { usePostContext } from "@/contexts/PostContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { NextButton } from "./ui/next-button";
import { PrevButton } from "./ui/prev-button";
import { cx } from "class-variance-authority";
import { usePagination } from "@/hooks/usePagination";
import { Paginate } from "@/components/ui/Paginate";

const maxAttempts = 3;
const bodiesPerPage = 3;

export default function BodyStep() {
  const {
    postData,
    setPostData,
    bodyState: { bodies, isInitialLoad, isGenerating },
    generateNewBodies,
  } = usePostContext();

  const [attempts, setAttempts] = useState(0);

  const paginate = usePagination({
    items: bodies,
    itemsPerPage: bodiesPerPage,
  });

  const handleGenerateMore = async () => {
    if (attempts < maxAttempts) {
      await generateNewBodies();
      setAttempts(attempts + 1);
      paginate.goToLastPage();
    }
  };

  return (
    <Card className="p-8">
      {isInitialLoad && isGenerating ? (
        <div className="flex justify-center items-center py-8">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mr-3" />
          Génération des contenus en cours...
        </div>
      ) : (
        <>
          <div className="relative">
            <div
              className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${
                isGenerating ? "opacity-50" : ""
              }`}
            >
              {paginate.currentItems.map((body, index) => (
                <Card
                  key={index}
                  className={cx(
                    "p-4 cursor-pointer transition-all hover:shadow-md",
                    {
                      "border-primary ring-2 ring-primary ring-opacity-50":
                        postData.selectedBody === body,
                    }
                  )}
                  onClick={() =>
                    setPostData({ ...postData, selectedBody: body })
                  }
                >
                  <Textarea
                    value={body}
                    readOnly
                    className="min-h-[200px] resize-none border-none focus-visible:ring-0"
                  />
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

          <div className="flex justify-center mt-5">
            <Button
              variant="outline"
              onClick={handleGenerateMore}
              disabled={isGenerating || attempts >= maxAttempts}
            >
              <RefreshCw
                className={cx("h-5 w-5 stroke-[1.5]", {
                  "animate-spin": isGenerating,
                })}
              />
              Générer à nouveau ({maxAttempts - attempts} essais restants)
            </Button>
          </div>

          <div className="flex justify-between mt-10">
            <PrevButton />
            <NextButton validateStep={() => !!postData.selectedBody} />
          </div>
        </>
      )}
    </Card>
  );
}
