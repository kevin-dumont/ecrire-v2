"use client";

import { useState } from "react";
import { usePostContext } from "@/contexts/PostContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const maxAttempts = 3;
const bodiesPerPage = 3;

export default function BodyStep() {
  const {
    postData,
    setPostData,
    bodyState: { bodies, isInitialLoad, isGenerating },
    generateNewBodies,
    currentStep,
    setCurrentStep,
  } = usePostContext();
  const [currentPage, setCurrentPage] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const startIndex = currentPage * bodiesPerPage;
  const currentBodies = bodies.slice(startIndex, startIndex + bodiesPerPage);
  const totalPages = Math.ceil(bodies.length / bodiesPerPage);

  const handleGenerateMore = async () => {
    if (attempts < maxAttempts) {
      await generateNewBodies();
      setAttempts(attempts + 1);
      setCurrentPage(totalPages);
    }
  };

  const handleNext = () => {
    if (postData.selectedBody) {
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
              {currentBodies.map((body, index) => (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    postData.selectedBody === body
                      ? "border-primary ring-2 ring-primary ring-opacity-50"
                      : ""
                  }`}
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

            {totalPages > 1 && (
              <Pagination className="my-4">
                <PaginationContent>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={index === currentPage}
                        onClick={() => setCurrentPage(index)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </PaginationContent>
              </Pagination>
            )}
          </div>

          <div className="flex justify-center mt-5">
            <Button
              variant="outline"
              onClick={handleGenerateMore}
              disabled={isGenerating || attempts >= maxAttempts}
            >
              <RefreshCw
                className={`mr-2 h-5 w-5 stroke-[1.5] ${
                  isGenerating ? "animate-spin" : ""
                }`}
              />
              Générer à nouveau ({maxAttempts - attempts} essais restants)
            </Button>
          </div>

          <div className="flex justify-between mt-10">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Retour
            </Button>

            <Button
              variant="default"
              onClick={handleNext}
              disabled={!postData.selectedBody}
              className="button-gradient"
            >
              Suivant
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
